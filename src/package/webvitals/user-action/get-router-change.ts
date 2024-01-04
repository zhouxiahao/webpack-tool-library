const wr = (type: keyof History) => {
  const orig = history[type];
  return function (this: unknown) {
    const rv = orig.apply(this, arguments);
    const e = new Event(type);
    window.dispatchEvent(e);
    return rv;
  };
};

export const wrHistory = (): void => {
  history.pushState = wr('pushState');
  history.replaceState = wr('replaceState');
};

export const proxyHistory = (handler: Function): void => {
  // 添加对replaceState的监听
  window.addEventListener('replaceState', (e) => handler(e), true);
  // 添加对 pushState 的监听
  window.addEventListener('pushState', (e) => handler(e), true);
};

export const proxyHash = (handler: Function): void => {
  window.addEventListener('hashchange', (e) => handler(e));
  window.addEventListener('popstate', (e) => handler(e));
};
