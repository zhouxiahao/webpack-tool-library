import MetricsStore from './store';
export interface PerformanceEntryHandler {
    (entry: any): void;
}
export declare const observe: (type: string, callback: PerformanceEntryHandler) => PerformanceObserver | undefined;
export declare const getFP: () => PerformanceEntry | undefined;
export declare const getFCP: () => PerformanceEntry | undefined;
export declare const getLCP: (entryHandler: PerformanceEntryHandler) => PerformanceObserver | undefined;
export declare const getFID: (entryHandler: PerformanceEntryHandler) => PerformanceObserver | undefined;
export interface LayoutShift extends PerformanceEntry {
    value: number;
    hadRecentInput: boolean;
}
export declare const getCLS: (entryHandler: PerformanceEntryHandler) => PerformanceObserver | undefined;
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
export declare const getResourceFlow: (resourceFlow: Array<ResourceFlowTiming>) => PerformanceObserver | undefined;
export default class WebVitals {
    private engineInstance;
    metrics: MetricsStore;
    constructor(engineInstance: any);
    initFP: () => void;
    initFCP: () => void;
    initLCP: () => void;
    initFID: () => void;
    initCLS: () => void;
    initNavigationTiming: () => void;
    initResourceFlow: () => void;
}
