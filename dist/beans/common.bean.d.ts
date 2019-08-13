export declare type SignerOptions = {
    readonly service: string;
    readonly region: string;
    readonly endpoint: string;
    readonly method: 'POST' | 'PUT' | 'GET' | 'PATCH' | 'DELETE';
    readonly contentType: string;
    readonly credentials: AwsCredentials;
    readonly body: any;
    headers: {
        [key: string]: string;
    };
};
export declare type AwsCredentials = {
    accessKeyId: string;
    secretAccessKey: string;
    sessonToken: string;
};
