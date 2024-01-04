export declare enum metricsName {
    PI = "page-information",
    OI = "origin-information",
    RCR = "router-change-record",
    CBR = "click-behavior-record",
    CDR = "custom-define-record",
    HT = "http-record"
}
export interface IMetrics {
    [prop: string | number]: any;
}
export default class userMetricsStore {
    state: Map<metricsName | string, IMetrics>;
    constructor();
    set(key: metricsName | string, value: IMetrics): void;
    add(key: metricsName | string, value: IMetrics): void;
    get(key: metricsName | string): IMetrics | undefined;
    has(key: metricsName | string): boolean;
    clear(): void;
    getValues(): IMetrics;
}
