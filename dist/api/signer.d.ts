import { SignerOptions } from '../beans/common.bean';
export declare function signRequest(opts: SignerOptions): {
    host: string;
    method: "POST" | "PUT" | "GET" | "PATCH" | "DELETE";
    path: string;
    body: any;
    headers: {
        'Content-Type': string;
        'Host': string;
        'Content-Length': number;
        'X-Amz-Security-Token': string;
        'X-Amz-Date': string;
    };
};
