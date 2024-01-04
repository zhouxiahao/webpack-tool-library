export const afterLoad = (callback: any) => {
  // NOTE: document有readyState属性来描述document的loading状态，readyState的改变会触发readystatechange事件.
  // loading
  // 文档仍然在加载
  // interactive
  // 文档结束加载并且被解析，但是像图片，样式，frame之类的子资源仍在加载
  // complete
  // 文档和子资源已经结束加载，该状态表明将要触发load事件。
  if (document.readyState === 'complete') {
    setTimeout(callback);
  } else {
    window.addEventListener('pageshow', callback, {
      once: true,
      capture: true,
    });
  }
};
