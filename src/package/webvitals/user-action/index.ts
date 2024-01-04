import UserMetricsStore, { metricsName, type IMetrics } from './store';
import BehaviorStore, { type behaviorStack } from './behavior-store';
import getPageInfo, { PageInformation, getExtends, getOriginInfo, type OriginInformation } from './get-page-info';
import { wrHistory, proxyHash, proxyHistory } from './get-router-change';
import type { customAnalyticsData } from './type';
import { afterLoad } from '../utils/web-api';
import { proxyXmlHttp, type httpMetrics } from '../http/proxy-xml-http';
import { proxyFetch } from '../http/proxy-fetch';
export default class UserVitals {
  // private engineInstance: engineInstance;

  public metrics: UserMetricsStore;
  public customHandler: Function;
  public breadcrumbs: BehaviorStore;
  // 最大行为追踪记录数
  public maxBehaviorRecords: number;

  // 允许捕获 click 事件的 DOM 标签 eg: button div img canvas
  clickMountList: Array<string>;

  // constructor(engineInstance: EngineInstance) {
  constructor(
    options = {
      maxBehaviorRecords: 100,
    },
  ) {
    // this.engineInstance = engineInstance;
    const { maxBehaviorRecords } = options;
    this.metrics = new UserMetricsStore();
    this.maxBehaviorRecords = maxBehaviorRecords;
    // 初始化行为追踪记录
    this.breadcrumbs = new BehaviorStore({ maxBehaviorRecords });
    // 初始化用户自定义事件捕获
    this.customHandler = this.initCustomerHandler();
    this.clickMountList = ['button'].map((x) => x.toLowerCase());
    // 重写事件
    wrHistory();
    this.initPageInfo();
    // 初始化路由跳转获取
    this.initRouterChange();
    this.initOriginInfo();
    this.initPV();
    this.initClickHandler(this.clickMountList);
    this.initHttpHandler();
  }

  initCustomerHandler = (): Function => {
    const handler = (options: customAnalyticsData) => {
      this.metrics.add(metricsName.CDR, options);
      this.userSendHandler(options);
      this.breadcrumbs.push({
        category: metricsName.CDR,
        data: options,
        ...getExtends(),
      });
    };
    return handler;
  };

  initPageInfo = (): void => {
    const info: PageInformation = getPageInfo();
    const metrics = info as IMetrics;
    this.metrics.set(metricsName.PI, metrics);
  };

  // 检测路由改变
  initRouterChange = (): void => {
    const handler = (e: Event) => {
      const metrics = {
        jumpType: e.type,
        timestamp: new Date().getTime(),
        pageInfo: getPageInfo(),
      } as IMetrics;
      // 看情况上报页面跳转的信息
      this.metrics.add(metricsName.RCR, metrics);
      delete metrics.pageInfo;
      // 行为记录追踪
      const behavior = {
        category: metricsName.RCR,
        data: metrics,
        ...getExtends(),
      } as behaviorStack;
      this.breadcrumbs.push(behavior);

      proxyHash(handler);
      proxyHistory(handler);
    };
  };
  // 上报入口
  userSendHandler(data: unknown) {}
  initPV = (): void => {
    const handler = () => {
      const metrics = {
        timestamp: new Date().getTime(),
        pageInfo: getPageInfo(),
        originInformation: getOriginInfo(),
      } as IMetrics;
      this.userSendHandler(metrics);
    };
    afterLoad(() => {
      handler();
    });
  };

  initOriginInfo = (): void => {
    const info: OriginInformation = getOriginInfo();
    const metrics = info as IMetrics;
    this.metrics.set(metricsName.OI, metrics);
  };

  initClickHandler = (mountList: Array<string>): void => {
    // TODO: 不够完善，特定ID的button按钮点击上报功能
    const handler = (e: MouseEvent | any) => {
      let target = e.path?.find((x: Element) => mountList.includes(x.tagName?.toLowerCase()));
      target = target || (mountList.includes(e.target.tagName?.toLowerCase()) ? e.target : undefined);
      if (!target) return;

      const metrics = {
        tagInfo: {
          id: target.id,
          classList: Array.from(target.classList),
          tagName: target.tagName,
          text: target.textContent,
        },
        timestamp: new Date().getTime(),
        pageInfo: getPageInfo(),
      } as IMetrics;

      this.metrics.add(metricsName.CBR, metrics);

      delete metrics.pageInfo;
      // 行为记录追踪
      const behavior = {
        category: metricsName.CBR,
        data: metrics,
        ...getExtends(),
      } as behaviorStack;
      this.breadcrumbs.push(behavior);
    };

    window.addEventListener(
      'click',
      (e) => {
        console.log('上报');
        handler(e);
      },
      true,
    );
  };

  initHttpHandler = (): void => {
    const loadHandler = (metrics: httpMetrics) => {
      if (metrics.status < 400) {
        // 过滤正常请求的 请求体 和 响应体
        delete metrics.response;
        delete metrics.body;
      }

      this.metrics.add(metricsName.HT, metrics);
      this.breadcrumbs.push({
        category: metricsName.HT,
        data: metrics,
        ...getExtends(),
      });
    };

    proxyXmlHttp(null, loadHandler);
    proxyFetch(null, loadHandler);
  };
}
