import { expect } from 'chai';
import {signRequest} from '../../src/api/signer';

describe('Should be able to calculate aws signature for given service', () => {
    it('Sample test', () => {
        const signedRequest = signRequest({
            service: 'execute-api',
            region: 'us-east-1',
            endpoint: 'http://localhost/foo/bar?q=foo',
            method: 'PUT',
            contentType: 'application/json',
            body: {
                sample: 'sampleJsonBody'
            },
            headers: {
                'x-api-key': 'wkjfnkw8efwnef'
            },
            credentials: {
                accessKeyId: 'foo',
                secretAccessKey: 'bar',
                sessonToken: 'foobar'
            }
        });
        expect(signedRequest['headers']['Authorization']).not.to.be.undefined;
    });
});