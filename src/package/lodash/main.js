(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["webvitals"] = factory();
	else
		root["webvitals"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([  
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getCLS = exports.getFID = exports.getLCP = exports.getFCP = exports.getFP = exports.observe = exports.afterLoad = void 0;
var store_1 = __importStar(__webpack_require__(1));
var afterLoad = function afterLoad(callback) {
  if (document.readyState === 'complete') {
    setTimeout(callback);
  } else {
    window.addEventListener('pageshow', callback, {
      once: true,
      capture: true
    });
  }
};
exports.afterLoad = afterLoad;
var observe = function observe(type, callback) {
  var _a;
  // PerformanceObserver.supportedEntryTypes:
  // returns ["element", "event", "first-input", "largest-contentful-paint", "layout-shift", "longtask", "mark", "measure", "navigation", "paint", "resource"] in Chrome 89
  if ((_a = PerformanceObserver.supportedEntryTypes) === null || _a === void 0 ? void 0 : _a.includes(type)) {
    var ob = new PerformanceObserver(function (l) {
      return l.getEntries().map(callback);
    });
    ob.observe({
      type: type,
      buffered: true
    });
    return ob;
  }
  return undefined;
};
exports.observe = observe;
var getFP = function getFP() {
  var entry = performance.getEntriesByName('first-paint')[0];
  return entry;
};
exports.getFP = getFP;
var getFCP = function getFCP() {
  var entry = performance.getEntriesByName('first-contentful-paint')[0];
  return entry;
};
exports.getFCP = getFCP;
var getLCP = function getLCP(entryHandler) {
  return (0, exports.observe)('largest-contentful-paint', entryHandler);
};
exports.getLCP = getLCP;
// 获取 FID
var getFID = function getFID(entryHandler) {
  return (0, exports.observe)('first-input', entryHandler);
};
exports.getFID = getFID;
// 获取 CLS
var getCLS = function getCLS(entryHandler) {
  return (0, exports.observe)('layout-shift', entryHandler);
};
exports.getCLS = getCLS;
// 获取NT
var getNavigationTiming = function getNavigationTiming() {
  var resolveNavigationTiming = function resolveNavigationTiming(entry) {
    var domainLookupStart = entry.domainLookupStart,
      domainLookupEnd = entry.domainLookupEnd,
      connectStart = entry.connectStart,
      connectEnd = entry.connectEnd,
      secureConnectionStart = entry.secureConnectionStart,
      requestStart = entry.requestStart,
      responseStart = entry.responseStart,
      responseEnd = entry.responseEnd,
      domInteractive = entry.domInteractive,
      domContentLoadedEventEnd = entry.domContentLoadedEventEnd,
      loadEventStart = entry.loadEventStart,
      fetchStart = entry.fetchStart;
    return {
      FP: responseEnd - fetchStart,
      TTI: domInteractive - fetchStart,
      DomReady: domContentLoadedEventEnd - fetchStart,
      Load: loadEventStart - fetchStart,
      FirstByte: responseStart - domainLookupStart,
      DNS: domainLookupEnd - domainLookupStart,
      TCP: connectEnd - connectStart,
      SSL: secureConnectionStart ? connectEnd - secureConnectionStart : 0,
      TTFB: responseStart - requestStart,
      Trans: responseEnd - responseStart,
      DomParse: domInteractive - responseEnd,
      Res: loadEventStart - domContentLoadedEventEnd
    };
  };
  var navigation =
  // W3C Level2  PerformanceNavigationTiming
  // 使用了High-Resolution Time，时间精度可以达毫秒的小数点好几位。
  performance.getEntriesByType('navigation').length > 0 ? performance.getEntriesByType('navigation')[0] : performance.timing; // W3C Level1  (目前兼容性高，仍然可使用，未来可能被废弃)。
  return resolveNavigationTiming(navigation);
};
var WebVitals1 = /** @class */function () {
  function WebVitals1(engineInstance) {
    var _this = this;
    // 初始化 FP 的获取以及返回
    this.initFP = function () {
      var entry = (0, exports.getFP)();
      var metrics = {
        startTime: entry === null || entry === void 0 ? void 0 : entry.startTime.toFixed(2),
        entry: entry
      };
      _this.metrics.set(store_1.metricsName.FP, metrics);
    };
    this.initFCP = function () {
      var entry = (0, exports.getFCP)();
      var metrics = {
        startTime: entry === null || entry === void 0 ? void 0 : entry.startTime.toFixed(2),
        entry: entry
      };
      _this.metrics.set(store_1.metricsName.FCP, metrics);
    };
    this.initLCP = function () {
      var entryHandler = function entryHandler(entry) {
        var metrics = {
          startTime: entry === null || entry === void 0 ? void 0 : entry.startTime.toFixed(2),
          entry: entry
        };
        _this.metrics.set(store_1.metricsName.LCP, metrics);
      };
      (0, exports.getLCP)(entryHandler);
    };
    this.initFID = function () {
      var entryHandler = function entryHandler(entry) {
        var metrics = {
          delay: entry.processingStart - entry.startTime,
          entry: entry
        };
        _this.metrics.set(store_1.metricsName.FID, metrics);
      };
      (0, exports.getFID)(entryHandler);
    };
    this.initCLS = function () {
      var clsValue = 0;
      var clsEntries = [];
      var sessionValue = 0;
      var sessionEntries = [];
      var entryHandler = function entryHandler(entry) {
        // NOTE: entry.value: 布局偏移分数，计算方式为影响分数（已移动的视口的分数）乘以距离分数（作为视口的分数移动的距离）。
        if (!entry.hadRecentInput) {
          // NOTE: 如果 lastInputTime 过去小于 500 毫秒，则返回 true 。
          // NOTE: 返回最近排除输入的时间（用户输入将排除此条目作为 CLS 分数的贡献者），或者 0 如果未发生排除输入。
          var firstSessionEntry = sessionEntries[0];
          var lastSessionEntry = sessionEntries[sessionEntries.length - 1];
          if (sessionValue && entry.startTime - lastSessionEntry.startTime < 1000 && entry.startTime - firstSessionEntry.startTime < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }
          // 如果当前会话值大于当前CLS值，那么更新CLS及其相关条目
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            clsEntries = sessionEntries;
            // 记录CLS到Map里
            var metrics = {
              entry: entry,
              clsValue: clsValue,
              clsEntries: clsEntries
            };
            _this.metrics.set(store_1.metricsName.CLS, metrics);
          }
        }
      };
      (0, exports.getCLS)(entryHandler);
    };
    this.initNavigationTiming = function () {
      var navigationTiming = getNavigationTiming();
      var metrics = navigationTiming;
      _this.metrics.set(store_1.metricsName.NT, metrics);
    };
    this.initResourceFlow = function () {};
    this.engineInstance = engineInstance;
    this.metrics = new store_1["default"]();
    this.initLCP();
    this.initCLS();
    // this.initResourceFlow();
    (0, exports.afterLoad)(function () {
      _this.initNavigationTiming();
      _this.initFP();
      _this.initFCP();
      _this.initFID();
    });
  }
  return WebVitals1;
}();
exports["default"] = WebVitals1;

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.metricsName = void 0;
var metricsName;
(function (metricsName) {
  metricsName["FP"] = "first-paint";
  metricsName["FCP"] = "first-contentful-paint";
  metricsName["LCP"] = "largest-contentful-paint";
  metricsName["FID"] = "first-input-delay";
  metricsName["CLS"] = "cumulative-layout-shift";
  metricsName["NT"] = "navigation-timing";
  metricsName["RF"] = "resource-flow";
})(metricsName || (exports.metricsName = metricsName = {}));
// Map 数据暂存
var metricsStore = /** @class */function () {
  function metricsStore() {
    this.state = new Map();
  }
  metricsStore.prototype.set = function (key, value) {
    this.state.set(key, value);
  };
  metricsStore.prototype.add = function (key, value) {
    var keyValue = this.state.get(key);
    this.state.set(key, keyValue ? keyValue.concat([value]) : [value]);
  };
  metricsStore.prototype.get = function (key) {
    return this.state.get(key);
  };
  metricsStore.prototype.has = function (key) {
    return this.state.has(key);
  };
  metricsStore.prototype.clear = function () {
    this.state.clear();
  };
  metricsStore.prototype.getValues = function () {
    // Map => 对象
    return Object.fromEntries(this.state);
  };
  return metricsStore;
}();
exports["default"] = metricsStore;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});