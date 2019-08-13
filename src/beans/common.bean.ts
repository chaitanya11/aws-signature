export type SignerOptions = {
    readonly service: string;
    readonly region: string;
    readonly endpoint: string;
    readonly method: 'POST' | 'PUT' | 'GET' | 'PATCH' | 'DELETE'; // @referance https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
    readonly contentType: string;
    readonly credentials: AwsCredentials;
    readonly body: any;
    headers: {[key: string]: string};
};

export type AwsCredentials = {
    accessKeyId: string;
    secretAccessKey: string;
    sessonToken: string;
};