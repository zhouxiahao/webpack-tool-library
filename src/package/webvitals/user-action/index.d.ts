import UserMetricsStore from './store';
import BehaviorStore from './behavior-store';
export default class UserVitals {
    metrics: UserMetricsStore;
    customHandler: Function;
    breadcrumbs: BehaviorStore;
    maxBehaviorRecords: number;
    clickMountList: Array<string>;
    constructor(options?: {
        maxBehaviorRecords: number;
    });
    initCustomerHandler: () => Function;
    initPageInfo: () => void;
    initRouterChange: () => void;
    userSendHandler(data: unknown): void;
    initPV: () => void;
    initOriginInfo: () => void;
    initClickHandler: (mountList: Array<string>) => void;
    initHttpHandler: () => void;
}
