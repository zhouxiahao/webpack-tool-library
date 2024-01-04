export interface httpMetrics {
    method: string;
    url: string | URL;
    body: Document | XMLHttpRequestBodyInit | null | undefined | ReadableStream;
    requestTime: number;
    responseTime: number;
    status: number;
    statusText: string;
    response?: any;
}
export declare const proxyXmlHttp: (sendHandler: Function | null | undefined, loadHandler: Function) => void;
