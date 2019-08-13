# aws-signature

This project serves utility functions to calculate aws version 4 signature to do AWS_IAM authorisation.


## Installation
```npm i aws-signature -S```


## How to import
````
import {signRequest} from aws-signature

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

const headers = signedRequest['headers']; // contains signature headers
````