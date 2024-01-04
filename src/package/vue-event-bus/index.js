var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
function Vue() {
  var vm = this;
  vm._events = Object.create(null);
}
Vue.prototype.$on = function (event, fn) {
  var vm = this;
  if (Array.isArray(event)) {
    for (var i = 0; i < event.length; i++) {
      vm.$on(event[i], fn);
    }
  } else {
    (vm._events[event] || (vm._events[event] = [])).push(fn);
  }
};
Vue.prototype.$emit = function (event) {
  var vm = this;
  var handlers = vm._events[event];
  if (handlers) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.log(args);
    for (var i = 0, len = handlers.length; i < len; i++) {
      var fn = handlers[i];
      fn.call.apply(fn, __spreadArray([null], args, false));
    }
  }
};
Vue.prototype.$off = function (event, fn) {
  var vm = this;
  if (!arguments) {
    vm._events = Object.create(null); // 什么参数都不传，置空当前事件总栈
  }
  if (Array.isArray(event)) {
    for (var i_1 = 0; i_1 < event.length; i_1++) {
      vm.$off(event[i_1], fn);
    }
    return;
  }
  var cbs = vm._events[event];
  if (!cbs) return;
  if (!fn) {
    vm._events[event] = null;
  }
  var cb;
  var i = cbs.length;
  while (i--) {
    cb = cbs[i];
    if (cb === fn) {
      cbs.splice(i, 1);
      break;
    }
  }
};
// NOTE: 第一次实现，没有考虑emit传参问题

const eventBus = new Vue();

const firstFn = (evt) => {
  console.log(evt, '第一次on');
};

eventBus.$on(['sayHello', 'sayName'], firstFn);

const secondFn = (evt) => {
  console.log(evt, '第二次on');
};
eventBus.$on('sayHello', secondFn);

eventBus.$emit('sayHello', '你是谁?');

eventBus.$off('sayHello', secondFn);

eventBus.$emit('sayHello', '你是谁?');
