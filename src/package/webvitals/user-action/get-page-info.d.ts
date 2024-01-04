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
declare const getPageInfo: () => PageInformation;
export declare const getExtends: () => {
    page: string;
    timestamp: number | string;
};
export interface OriginInformation {
    referrer: string;
    type: number | string;
}
export declare const getOriginInfo: () => OriginInformation;
export default getPageInfo;
