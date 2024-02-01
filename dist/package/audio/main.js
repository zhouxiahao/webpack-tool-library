/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["audio"] = factory();
	else
		root["audio"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/package/audio/index.ts":
/*!************************************!*\
  !*** ./src/package/audio/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nvar player_1 = __webpack_require__(/*! ./player */ \"./src/package/audio/player.ts\");\nexports[\"default\"] = {\n  Player: player_1.Player\n};\n\n//# sourceURL=webpack://audio/./src/package/audio/index.ts?");

/***/ }),

/***/ "./src/package/audio/player.ts":
/*!*************************************!*\
  !*** ./src/package/audio/player.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.Player = void 0;\nvar Player = /** @class */function () {\n  function Player() {\n    this.mediaStream = new MediaStream();\n    this.audioElement = document.createElement('audio');\n    this.mediaStream = new MediaStream();\n    document.body.append(this.audioElement);\n  }\n  Player.getInstance = function () {\n    if (!this.instance) {\n      this.instance = new Player();\n    }\n    return Player.instance;\n  };\n  Player.prototype.setMute = function (mute) {\n    if (this.audioElement) {\n      this.audioElement.muted = mute;\n    }\n  };\n  Player.prototype.getMute = function () {\n    return this.audioElement.muted;\n  };\n  Player.prototype.setStream = function (stream) {\n    this.mediaStream = stream;\n    this.audioElement.srcObject = stream;\n    this.audioElement.autoplay = true;\n    this.audioElement.play();\n  };\n  Player.prototype.setTrack = function (track) {\n    if (!this.audioElement.srcObject) {\n      this.audioElement.srcObject = this.mediaStream;\n    }\n    this.mediaStream.addTrack(track);\n    this.audioElement.autoplay = true;\n  };\n  // workaround sound for browsers with restrictive play policies;\n  Player.prototype.playWorkaroundSound = function () {\n    this.audioElement.play();\n  };\n  return Player;\n}();\nexports.Player = Player;\n\n//# sourceURL=webpack://audio/./src/package/audio/player.ts?");

/***/ })

/******/ 	});
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/package/audio/index.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});