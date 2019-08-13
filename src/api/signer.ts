import crypto from 'crypto';
import { URL } from 'url';
import {SignerOptions} from '../beans/common.bean';

/**
 * Calculates hmac signature for a given string with a given key and encoding.
 * @param key
 * @param str
 * @param encoding
 */
function hmac(key, str, encoding?) {
    return crypto.createHmac('sha256', key).update(str, 'utf8').digest(encoding);
}

/**
 * Calculates hash of string with specific encoding.
 * @param str
 * @param encoding
 */
function hash(str, encoding) {
    return crypto.createHash('sha256').update(str, 'utf8').digest(encoding);
}

/**
 * Calculates aws signature version 4
 * @param service
 * @param region
 * @param endpoint
 * @param body
 * @param headers
 */
export function signRequest(opts: SignerOptions) {
    const [accessKeyId, secretKey, sessionToken] = [
        opts.credentials.accessKeyId,
        opts.credentials.secretAccessKey,
        opts.credentials.sessonToken
    ];
    let [service, region, endpoint, method, contentType, body, headers] = [
        opts.service,
        opts.region,
        opts.endpoint,
        opts.method,
        opts.contentType,
        opts.body,
        opts.headers,
    ];
    const datetime = (new Date()).toISOString().replace(/[:\-]|\.\d{3}/g, '');
    const date = datetime.substr(0, 8);
    const kDate = hmac('AWS4' + secretKey, date);
    const kRegion = hmac(kDate, region);
    const kService = hmac(kRegion, service);
    const kSigning = hmac(kService, 'aws4_request');
    body = JSON.stringify(body);
    const url = new URL(endpoint);

    const request = {
        host: url.hostname,
        method: method,
        path: url.pathname,
        body: body,
        headers: {
            'Content-Type': contentType,
            'Host': url.hostname,
            'Content-Length': Buffer.byteLength(body),
            'X-Amz-Security-Token': sessionToken,
            'X-Amz-Date': datetime,
            ...headers
        }
    };
    console.log(`Request object after modifying is ${JSON.stringify(request)}`);

    const canonicalHeaders = Object.keys(request.headers)
        .sort(function(a, b) { return a.toLowerCase() < b.toLowerCase() ? -1 : 1; })
        .map(function(k) { return k.toLowerCase() + ':' + request.headers[k]; })
        .join('\n');
    console.log(`Canonical headers is ${canonicalHeaders}`);
    const signedHeaders = Object.keys(request.headers)
        .map(function(k) { return k.toLowerCase(); })
        .sort()
        .join(';');
    console.log(`Signed headers is ${signedHeaders}`);

    const canonicalString = [
        request.method,
        request.path, '',
        canonicalHeaders, '',
        signedHeaders,
        hash(request.body, 'hex'),
    ].join('\n');

    const credentialString = [ date, region, service, 'aws4_request' ].join('/');
    console.log(`Canonical string is ${canonicalString}`);
    const stringToSign = [
        'AWS4-HMAC-SHA256',
        datetime,
        credentialString,
        hash(canonicalString, 'hex')
    ] .join('\n');
    console.log(`String to sign is ${stringToSign}`);
    request.headers['Authorization'] = [
        'AWS4-HMAC-SHA256 Credential=' + accessKeyId + '/' + credentialString,
        'SignedHeaders=' + signedHeaders,
        'Signature=' + hmac(kSigning, stringToSign, 'hex')
    ].join(', ');
    console.log(`Authorization header is ${request.headers['Authorization']}`);
    return request;
}