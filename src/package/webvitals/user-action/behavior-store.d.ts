import { metricsName } from './store';
export interface behaviorRecordsOptions {
    maxBehaviorRecords: number;
}
export interface behaviorStack {
    category: metricsName;
    page: string;
    timestamp: number | string;
    data: object;
}
export default class behaviorStore {
    private state;
    private maxBehaviorRecords;
    constructor(options: behaviorRecordsOptions);
    push(value: behaviorStack): void;
    shift(): behaviorStack | undefined;
    get(): behaviorStack[];
    clear(): void;
    length(): number;
}
