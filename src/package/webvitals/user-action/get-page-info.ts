export interface PageInformation {
  host: string;
  hostname: string;
  href: string;
  protocol: string;
  origin: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  title: string;
  language: string;
  userAgent?: string;
  winScreen: string;
  docScreen: string;
}

const getPageInfo = (): PageInformation => {
  const { host, hostname, href, protocol, origin, port, pathname, search, hash } = window.location;
  const { width, height } = window.screen;
  const { language, userAgent } = navigator;

  return {
    host,
    hostname,
    href,
    protocol,
    origin,
    port,
    pathname,
    search,
    hash,
    title: document.title,
    language: language.substr(0, 2),
    userAgent,
    winScreen: `${width}x${height}`,
    docScreen: `${document.documentElement.clientWidth || document.body.clientWidth}x${
      document.documentElement.clientHeight || document.body.clientHeight
    }`,
  };
};

export const getExtends = (): { page: string; timestamp: number | string } => {
  return {
    page: getPageInfo().pathname,
    timestamp: new Date().getTime(),
  };
};

export interface OriginInformation {
  referrer: string;
  type: number | string;
}

export const getOriginInfo = (): OriginInformation => {
  return {
    referrer: document.referrer,
    type: (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type,
  };
};

export default getPageInfo;
