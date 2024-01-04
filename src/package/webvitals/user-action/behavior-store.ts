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

// 暂存用户的行为记录追踪
export default class behaviorStore {
  private state: Array<behaviorStack>;

  // 记录的最大数量
  private maxBehaviorRecords: number;

  constructor(options: behaviorRecordsOptions) {
    const { maxBehaviorRecords } = options;
    this.maxBehaviorRecords = maxBehaviorRecords;
    this.state = [];
  }

  push(value: behaviorStack) {
    if (this.length() === this.maxBehaviorRecords) {
      this.shift();
    }
    this.state.push(value);
  }

  shift() {
    return this.state.shift();
  }

  get() {
    return this.state;
  }

  clear() {
    this.state = [];
  }

  length() {
    return this.state.length;
  }
}
