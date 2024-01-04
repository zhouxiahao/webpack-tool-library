import MetricsStore, { metricsName, IMetrics } from './store';
import { afterLoad } from '../utils/web-api';
export interface PerformanceEntryHandler {
  (entry: any): void;
}

export const observe = (type: string, callback: PerformanceEntryHandler): PerformanceObserver | undefined => {
  // PerformanceObserver.supportedEntryTypes:
  // returns ["element", "event", "first-input", "largest-contentful-paint", "layout-shift", "longtask", "mark", "measure", "navigation", "paint", "resource"] in Chrome 89
  if (PerformanceObserver.supportedEntryTypes?.includes(type)) {
    const ob: PerformanceObserver = new PerformanceObserver((l) => l.getEntries().map(callback));

    ob.observe({ type, buffered: true });
    return ob;
  }

  return undefined;
};

export const getFP = (): PerformanceEntry | undefined => {
  const [entry] = performance.getEntriesByName('first-paint');
  return entry;
};

export const getFCP = (): PerformanceEntry | undefined => {
  const [entry] = performance.getEntriesByName('first-contentful-paint');
  return entry;
};

export const getLCP = (entryHandler: PerformanceEntryHandler): PerformanceObserver | undefined => {
  return observe('largest-contentful-paint', entryHandler);
};

// 获取 FID
export const getFID = (entryHandler: PerformanceEntryHandler): PerformanceObserver | undefined => {
  return observe('first-input', entryHandler);
};

export interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

// 获取 CLS
export const getCLS = (entryHandler: PerformanceEntryHandler): PerformanceObserver | undefined => {
  return observe('layout-shift', entryHandler);
};

export interface MPerformanceNavigationTiming {
  FP?: number;
  TTI?: number;
  DomReady?: number;
  Load?: number;
  FirstByte?: number;
  DNS?: number;
  TCP?: number;
  SSL?: number;
  TTFB?: number;
  Trans?: number;
  DomParse?: number;
  Res?: number;
}
// 获取NT
const getNavigationTiming = (): MPerformanceNavigationTiming | undefined => {
  const resolveNavigationTiming = (entry: PerformanceNavigationTiming): MPerformanceNavigationTiming => {
    const {
      domainLookupStart,
      domainLookupEnd,
      connectStart,
      connectEnd,
      secureConnectionStart,
      requestStart,
      responseStart,
      responseEnd,
      domInteractive,
      domContentLoadedEventEnd,
      loadEventStart,
      fetchStart,
    } = entry;

    return {
      FP: responseEnd - fetchStart,
      TTI: domInteractive - fetchStart,
      DomReady: domContentLoadedEventEnd - fetchStart,
      Load: loadEventStart - fetchStart,
      FirstByte: responseStart - domainLookupStart,
      DNS: domainLookupEnd - domainLookupStart,
      TCP: connectEnd - connectStart,
      SSL: secureConnectionStart ? connectEnd - secureConnectionStart : 0,
      TTFB: responseStart - requestStart,
      Trans: responseEnd - responseStart,
      DomParse: domInteractive - responseEnd,
      Res: loadEventStart - domContentLoadedEventEnd,
    };
  };

  const navigation =
    // W3C Level2  PerformanceNavigationTiming
    // 使用了High-Resolution Time，时间精度可以达毫秒的小数点好几位。
    performance.getEntriesByType('navigation').length > 0
      ? performance.getEntriesByType('navigation')[0]
      : performance.timing; // W3C Level1  (目前兼容性高，仍然可使用，未来可能被废弃)。
  return resolveNavigationTiming(navigation as PerformanceNavigationTiming);
};

// 获取RF
export interface ResourceFlowTiming {
  name: string;
  transferSize: number;
  initiatorType: string;
  startTime: number;
  responseEnd: number;
  dnsLookup: number;
  initialConnect: number;
  ssl: number;
  request: number;
  ttfb: number;
  contentDownload: number;
}

export const getResourceFlow = (resourceFlow: Array<ResourceFlowTiming>): PerformanceObserver | undefined => {
  const entryHandler = (entry: PerformanceResourceTiming) => {
    const {
      name,
      transferSize,
      initiatorType,
      startTime,
      responseEnd,
      domainLookupEnd,
      domainLookupStart,
      connectStart,
      connectEnd,
      secureConnectionStart,
      responseStart,
      requestStart,
    } = entry;

    resourceFlow.push({
      // name 资源地址
      name,
      // transferSize 传输大小
      transferSize,
      // initiatorType 资源类型
      initiatorType,
      // startTime 开始时间
      startTime,
      // responseEnd 结束时间
      responseEnd,
      // 贴近 Chrome 的近似分析方案，受到跨域资源影响
      dnsLookup: domainLookupEnd - domainLookupStart,
      initialConnect: connectEnd - connectStart,
      ssl: connectEnd - secureConnectionStart,
      request: responseStart - requestStart,
      ttfb: responseStart - requestStart,
      contentDownload: responseStart - requestStart,
    });
  };

  return observe('resource', entryHandler);
};

export default class WebVitals {
  // TODO: 工程实例这个如何定义，概念是什么？
  // private engineInstance: EngineInstance;
  private engineInstance;
  public metrics: MetricsStore;

  constructor(engineInstance: any) {
    this.engineInstance = engineInstance;
    this.metrics = new MetricsStore();
    this.initLCP();
    this.initCLS();
    // this.initResourceFlow();

    afterLoad(() => {
      this.initNavigationTiming();
      this.initFP();
      this.initFCP();
      this.initFID();
    });
  }

  // 初始化 FP 的获取以及返回
  initFP = (): void => {
    const entry = getFP();
    const metrics = {
      startTime: entry?.startTime.toFixed(2),
      entry,
    } as IMetrics;
    this.metrics.set(metricsName.FP, metrics);
  };

  initFCP = (): void => {
    const entry = getFCP();
    const metrics = {
      startTime: entry?.startTime.toFixed(2),
      entry,
    } as IMetrics;
    this.metrics.set(metricsName.FCP, metrics);
  };

  initLCP = (): void => {
    const entryHandler = (entry: PerformanceEntry) => {
      const metrics = {
        startTime: entry?.startTime.toFixed(2),
        entry,
      } as IMetrics;
      this.metrics.set(metricsName.LCP, metrics);
    };
    getLCP(entryHandler);
  };

  initFID = (): void => {
    const entryHandler = (entry: PerformanceEventTiming) => {
      const metrics = {
        delay: entry.processingStart - entry.startTime,
        entry,
      } as IMetrics;
      this.metrics.set(metricsName.FID, metrics);
    };
    getFID(entryHandler);
  };

  initCLS = (): void => {
    let clsValue = 0;
    let clsEntries = [];

    let sessionValue = 0;
    let sessionEntries: Array<LayoutShift> = [];

    const entryHandler = (entry: LayoutShift) => {
      // NOTE: entry.value: 布局偏移分数，计算方式为影响分数（已移动的视口的分数）乘以距离分数（作为视口的分数移动的距离）。
      if (!entry.hadRecentInput) {
        // NOTE: 如果 lastInputTime 过去小于 500 毫秒，则返回 true 。
        // NOTE: 返回最近排除输入的时间（用户输入将排除此条目作为 CLS 分数的贡献者），或者 0 如果未发生排除输入。
        const firstSessionEntry = sessionEntries[0];
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

        if (
          sessionValue &&
          entry.startTime - lastSessionEntry.startTime < 1000 &&
          entry.startTime - firstSessionEntry.startTime < 5000
        ) {
          sessionValue += entry.value;
          sessionEntries.push(entry);
        } else {
          sessionValue = entry.value;
          sessionEntries = [entry];
        }

        // 如果当前会话值大于当前CLS值，那么更新CLS及其相关条目
        if (sessionValue > clsValue) {
          clsValue = sessionValue;
          clsEntries = sessionEntries;

          // 记录CLS到Map里
          const metrics = {
            entry,
            clsValue,
            clsEntries,
          } as IMetrics;
          this.metrics.set(metricsName.CLS, metrics);
        }
      }
    };
    getCLS(entryHandler);
  };

  initNavigationTiming = (): void => {
    const navigationTiming = getNavigationTiming();
    const metrics = navigationTiming as IMetrics;
    this.metrics.set(metricsName.NT, metrics);
  };

  initResourceFlow = (): void => {
    const resourceFlow: Array<ResourceFlowTiming> = [];
    const resObserve = getResourceFlow(resourceFlow);

    const stopListening = () => {
      if (resObserve) {
        resObserve.disconnect();
      }

      const metrics = resourceFlow as IMetrics;
      this.metrics.set(metricsName.RF, metrics);
    };
    // 当一条会话历史记录被执行的时候将会触发页面显示 (pageshow) 事件。(这包括了后退/前进按钮操作，同时也会在 onload 事件触发后初始化页面时触发)
    window.addEventListener('pageshow', stopListening, { once: true, capture: true });
  };
}
