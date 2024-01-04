function Vue(this: any) {
  const vm = this;
  vm._events = Object.create(null);
}

Vue.prototype.$on = function (event: string | Array<string>, fn: Function) {
  const vm = this;
  if (Array.isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      vm.$on(event[i], fn);
    }
  } else {
    (vm._events[event] || (vm._events[event] = [])).push(fn);
  }
};

Vue.prototype.$emit = function (event: string) {
  const vm = this;
  const handlers = vm._events[event];
  if (handlers) {
    const args = Array.prototype.slice.call(arguments, 1);
    console.log(args);
    for (let i = 0, len = handlers.length; i < len; i++) {
      const fn = handlers[i];
      fn.call(null, ...args);
    }
  }
};

Vue.prototype.$off = function (event: string | Array<string>, fn?: Function) {
  const vm = this;
  if (!arguments) {
    vm._events = Object.create(null); // 什么参数都不传，置空当前事件总栈
  }

  if (Array.isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      vm.$off(event[i], fn);
    }
    return;
  }

  const cbs = vm._events[event];

  if (!cbs) return;

  if (!fn) {
    vm._events[event] = null;
  }

  let cb;
  let i = cbs.length;

  while (i--) {
    cb = cbs[i];
    if (cb === fn) {
      cbs.splice(i, 1);
      break;
    }
  }
};
// NOTE: 第一次实现，没有考虑emit传参问题
