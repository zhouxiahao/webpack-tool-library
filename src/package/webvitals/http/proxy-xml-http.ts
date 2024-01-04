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

export const proxyXmlHttp = (sendHandler: Function | null | undefined, loadHandler: Function) => {
  if ('XMLHttpRequest' in window && typeof window.XMLHttpRequest === 'function') {
    const oXMLHttpRequest = window.XMLHttpRequest;
    if (!(window as any).oXMLHttpRequest) {
      // oXMLHttpRequest 为原生的 XMLHttpRequest，可以用以 SDK 进行数据上报，区分业务
      (window as any).oXMLHttpRequest = oXMLHttpRequest;
    }

    (window as any).XMLHttpRequest = function () {
      const xhr = new oXMLHttpRequest();
      const { open, send } = xhr;
      let metrics = {} as httpMetrics;

      xhr.open = (method, url) => {
        metrics.method = method;
        metrics.url = url;
        open.call(xhr, method, url, true);
      };

      xhr.send = (body) => {
        metrics.body = body || '';
        metrics.requestTime = new Date().getTime();

        if (typeof sendHandler === 'function') sendHandler(xhr);

        send.call(xhr, body);
      };

      xhr.addEventListener('loadend', () => {
        const { status, statusText, response } = xhr;
        metrics = {
          ...metrics,
          status,
          statusText,
          response,
          responseTime: new Date().getTime(),
        };

        if (typeof loadHandler === 'function') loadHandler(metrics);
      });

      return xhr;
    };
  }
};
