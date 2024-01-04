import { httpMetrics } from './proxy-xml-http';

export const proxyFetch = (sendHandler: Function | null | undefined, loadHandler: Function) => {
  if ('fetch' in window && typeof window.fetch === 'function') {
    const oFetch = window.fetch;
    if (!(window as any).oFetch) {
      (window as any).oFetch = oFetch;
    }

    (window as any).fetch = async (input: any, init: RequestInit) => {
      if (typeof sendHandler === 'function') sendHandler(init);
      let metrics = {} as httpMetrics;

      metrics.method = init?.method || '';
      metrics.url = (input && typeof input !== 'string' ? input?.url : input) || '';
      metrics.body = init?.body || '';
      metrics.requestTime = new Date().getTime();

      return oFetch.call(window, input, init).then(async (response) => {
        const res = response.clone();
        metrics = {
          ...metrics,
          status: res.status,
          statusText: res.statusText,
          response: await res.text(),
          responseTime: new Date().getTime(),
        };

        if (typeof loadHandler === 'function') loadHandler(metrics);
        return response;
      });
    };
  }
};
