/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(12);
} else {}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isWindows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isMacintosh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isLinux; });
/* unused harmony export isNative */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isWeb; });
/* unused harmony export isIOS */
/* unused harmony export globals */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return setImmediate; });
/* unused harmony export OS */
/* unused harmony export isLittleEndian */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var LANGUAGE_DEFAULT = 'en';
var _isWindows = false;
var _isMacintosh = false;
var _isLinux = false;
var _isNative = false;
var _isWeb = false;
var _isIOS = false;
var _locale = undefined;
var _language = LANGUAGE_DEFAULT;
var _translationsConfigFile = undefined;
var _userAgent = undefined;
var isElectronRenderer = typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.electron !== 'undefined' && process.type === 'renderer'; // OS detection

if (typeof navigator === 'object' && !isElectronRenderer) {
  _userAgent = navigator.userAgent;
  _isWindows = _userAgent.indexOf('Windows') >= 0;
  _isMacintosh = _userAgent.indexOf('Macintosh') >= 0;
  _isIOS = (_userAgent.indexOf('Macintosh') >= 0 || _userAgent.indexOf('iPad') >= 0 || _userAgent.indexOf('iPhone') >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
  _isLinux = _userAgent.indexOf('Linux') >= 0;
  _isWeb = true;
  _locale = navigator.language;
  _language = _locale;
} else if (typeof process === 'object') {
  _isWindows = process.platform === 'win32';
  _isMacintosh = process.platform === 'darwin';
  _isLinux = process.platform === 'linux';
  _locale = LANGUAGE_DEFAULT;
  _language = LANGUAGE_DEFAULT;
  var rawNlsConfig = Object({"NODE_ENV":"production","PUBLIC_URL":"","WDS_SOCKET_HOST":undefined,"WDS_SOCKET_PATH":undefined,"WDS_SOCKET_PORT":undefined,"FAST_REFRESH":false})['VSCODE_NLS_CONFIG'];

  if (rawNlsConfig) {
    try {
      var nlsConfig = JSON.parse(rawNlsConfig);
      var resolved = nlsConfig.availableLanguages['*'];
      _locale = nlsConfig.locale; // VSCode's default language is 'en'

      _language = resolved ? resolved : LANGUAGE_DEFAULT;
      _translationsConfigFile = nlsConfig._translationsConfigFile;
    } catch (e) {}
  }

  _isNative = true;
}

var _platform = 0
/* Web */
;

if (_isMacintosh) {
  _platform = 1
  /* Mac */
  ;
} else if (_isWindows) {
  _platform = 3
  /* Windows */
  ;
} else if (_isLinux) {
  _platform = 2
  /* Linux */
  ;
}

var isWindows = _isWindows;
var isMacintosh = _isMacintosh;
var isLinux = _isLinux;
var isNative = _isNative;
var isWeb = _isWeb;
var isIOS = _isIOS;

var _globals = typeof self === 'object' ? self : typeof global === 'object' ? global : {};

var globals = _globals;
var setImmediate = function defineSetImmediate() {
  if (globals.setImmediate) {
    return globals.setImmediate.bind(globals);
  }

  if (typeof globals.postMessage === 'function' && !globals.importScripts) {
    var pending = [];
    globals.addEventListener('message', function (e) {
      if (e.data && e.data.vscodeSetImmediateId) {
        for (var i = 0, len = pending.length; i < len; i++) {
          var candidate = pending[i];

          if (candidate.id === e.data.vscodeSetImmediateId) {
            pending.splice(i, 1);
            candidate.callback();
            return;
          }
        }
      }
    });
    var lastId = 0;
    return function (callback) {
      var myId = ++lastId;
      pending.push({
        id: myId,
        callback: callback
      });
      globals.postMessage({
        vscodeSetImmediateId: myId
      }, '*');
    };
  }

  if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
    return process.nextTick.bind(process);
  }

  var _promise = Promise.resolve();

  return function (callback) {
    return _promise.then(callback);
  };
}();
var OS = _isMacintosh || _isIOS ? 2
/* Macintosh */
: _isWindows ? 1
/* Windows */
: 3
/* Linux */
;
var _isLittleEndian = true;
var _isLittleEndianComputed = false;
function isLittleEndian() {
  if (!_isLittleEndianComputed) {
    _isLittleEndianComputed = true;
    var test = new Uint8Array(2);
    test[0] = 1;
    test[1] = 2;
    var view = new Uint16Array(test.buffer);
    _isLittleEndian = view[0] === (2 << 8) + 1;
  }

  return _isLittleEndian;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8), __webpack_require__(19)))

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cwd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return env; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return platform; });
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var safeProcess = typeof process === 'undefined' ? {
  cwd: function cwd() {
    return '/';
  },
  env: Object.create(null),

  get platform() {
    return _platform__WEBPACK_IMPORTED_MODULE_0__[/* isWindows */ "d"] ? 'win32' : _platform__WEBPACK_IMPORTED_MODULE_0__[/* isMacintosh */ "b"] ? 'darwin' : 'linux';
  },

  nextTick: function nextTick(callback) {
    return Object(_platform__WEBPACK_IMPORTED_MODULE_0__[/* setImmediate */ "e"])(callback);
  }
} : process;
var cwd = safeProcess.cwd;
var env = safeProcess.env;
var platform = safeProcess.platform;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _scripts_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scripts_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _scripts_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".wiki_app__NMiJh{height:100%;flex-direction:column;align-items:center;justify-content:center}\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"app": "wiki_app__NMiJh"
};
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _scripts_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scripts_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _scripts_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".scroll_app__2rt-o{height:100%;align-items:stretch;justify-content:flex-start;padding:16px;padding-right:25px;border-width:1px}\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"app": "scroll_app__2rt-o"
};
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(14);
} else {}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _gallery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
var _module,_module$hot;(_module=module)===null||_module===void 0?void 0:(_module$hot=_module.hot)===null||_module$hot===void 0?void 0:_module$hot.accept();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule); // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v17.0.1
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var l = __webpack_require__(13),
    n = 60103,
    p = 60106;

exports.Fragment = 60107;
exports.StrictMode = 60108;
exports.Profiler = 60114;
var q = 60109,
    r = 60110,
    t = 60112;
exports.Suspense = 60113;
var u = 60115,
    v = 60116;

if ("function" === typeof Symbol && Symbol["for"]) {
  var w = Symbol["for"];
  n = w("react.element");
  p = w("react.portal");
  exports.Fragment = w("react.fragment");
  exports.StrictMode = w("react.strict_mode");
  exports.Profiler = w("react.profiler");
  q = w("react.provider");
  r = w("react.context");
  t = w("react.forward_ref");
  exports.Suspense = w("react.suspense");
  u = w("react.memo");
  v = w("react.lazy");
}

var x = "function" === typeof Symbol && Symbol.iterator;

function y(a) {
  if (null === a || "object" !== typeof a) return null;
  a = x && a[x] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}

function z(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  }

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var A = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
},
    B = {};

function C(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B;
  this.updater = c || A;
}

C.prototype.isReactComponent = {};

C.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(z(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};

C.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function D() {}

D.prototype = C.prototype;

function E(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B;
  this.updater = c || A;
}

var F = E.prototype = new D();
F.constructor = E;
l(F, C.prototype);
F.isPureReactComponent = !0;
var G = {
  current: null
},
    H = Object.prototype.hasOwnProperty,
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, c) {
  var e,
      d = {},
      k = null,
      h = null;
  if (null != b) for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) {
    H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
  }
  var g = arguments.length - 2;
  if (1 === g) d.children = c;else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++) {
      f[m] = arguments[m + 2];
    }

    d.children = f;
  }
  if (a && a.defaultProps) for (e in g = a.defaultProps, g) {
    void 0 === d[e] && (d[e] = g[e]);
  }
  return {
    $$typeof: n,
    type: a,
    key: k,
    ref: h,
    props: d,
    _owner: G.current
  };
}

function K(a, b) {
  return {
    $$typeof: n,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function L(a) {
  return "object" === typeof a && null !== a && a.$$typeof === n;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + a.replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var M = /\/+/g;

function N(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}

function O(a, b, c, e, d) {
  var k = typeof a;
  if ("undefined" === k || "boolean" === k) a = null;
  var h = !1;
  if (null === a) h = !0;else switch (k) {
    case "string":
    case "number":
      h = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case n:
        case p:
          h = !0;
      }

  }
  if (h) return h = a, d = d(h), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function (a) {
    return a;
  })) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
  h = 0;
  e = "" === e ? "." : e + ":";
  if (Array.isArray(a)) for (var g = 0; g < a.length; g++) {
    k = a[g];
    var f = e + N(k, g);
    h += O(k, b, c, f, d);
  } else if (f = y(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) {
    k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
  } else if ("object" === k) throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
  return h;
}

function P(a, b, c) {
  if (null == a) return a;
  var e = [],
      d = 0;
  O(a, e, "", "", function (a) {
    return b.call(c, a, d++);
  });
  return e;
}

function Q(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    a._status = 0;
    a._result = b;
    b.then(function (b) {
      0 === a._status && (b = b["default"], a._status = 1, a._result = b);
    }, function (b) {
      0 === a._status && (a._status = 2, a._result = b);
    });
  }

  if (1 === a._status) return a._result;
  throw a._result;
}

var R = {
  current: null
};

function S() {
  var a = R.current;
  if (null === a) throw Error(z(321));
  return a;
}

var T = {
  ReactCurrentDispatcher: R,
  ReactCurrentBatchConfig: {
    transition: 0
  },
  ReactCurrentOwner: G,
  IsSomeRendererActing: {
    current: !1
  },
  assign: l
};
exports.Children = {
  map: P,
  forEach: function forEach(a, b, c) {
    P(a, function () {
      b.apply(this, arguments);
    }, c);
  },
  count: function count(a) {
    var b = 0;
    P(a, function () {
      b++;
    });
    return b;
  },
  toArray: function toArray(a) {
    return P(a, function (a) {
      return a;
    }) || [];
  },
  only: function only(a) {
    if (!L(a)) throw Error(z(143));
    return a;
  }
};
exports.Component = C;
exports.PureComponent = E;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;

exports.cloneElement = function (a, b, c) {
  if (null === a || void 0 === a) throw Error(z(267, a));
  var e = l({}, a.props),
      d = a.key,
      k = a.ref,
      h = a._owner;

  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = G.current);
    void 0 !== b.key && (d = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;

    for (f in b) {
      H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
  }

  var f = arguments.length - 2;
  if (1 === f) e.children = c;else if (1 < f) {
    g = Array(f);

    for (var m = 0; m < f; m++) {
      g[m] = arguments[m + 2];
    }

    e.children = g;
  }
  return {
    $$typeof: n,
    type: a.type,
    key: d,
    ref: k,
    props: e,
    _owner: h
  };
};

exports.createContext = function (a, b) {
  void 0 === b && (b = null);
  a = {
    $$typeof: r,
    _calculateChangedBits: b,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  a.Provider = {
    $$typeof: q,
    _context: a
  };
  return a.Consumer = a;
};

exports.createElement = J;

exports.createFactory = function (a) {
  var b = J.bind(null, a);
  b.type = a;
  return b;
};

exports.createRef = function () {
  return {
    current: null
  };
};

exports.forwardRef = function (a) {
  return {
    $$typeof: t,
    render: a
  };
};

exports.isValidElement = L;

exports.lazy = function (a) {
  return {
    $$typeof: v,
    _payload: {
      _status: -1,
      _result: a
    },
    _init: Q
  };
};

exports.memo = function (a, b) {
  return {
    $$typeof: u,
    type: a,
    compare: void 0 === b ? null : b
  };
};

exports.useCallback = function (a, b) {
  return S().useCallback(a, b);
};

exports.useContext = function (a, b) {
  return S().useContext(a, b);
};

exports.useDebugValue = function () {};

exports.useEffect = function (a, b) {
  return S().useEffect(a, b);
};

exports.useImperativeHandle = function (a, b, c) {
  return S().useImperativeHandle(a, b, c);
};

exports.useLayoutEffect = function (a, b) {
  return S().useLayoutEffect(a, b);
};

exports.useMemo = function (a, b) {
  return S().useMemo(a, b);
};

exports.useReducer = function (a, b, c) {
  return S().useReducer(a, b, c);
};

exports.useRef = function (a) {
  return S().useRef(a);
};

exports.useState = function (a) {
  return S().useState(a);
};

exports.version = "17.0.1";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/** @license React v0.26.1
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = function $$$reconciler($$$hostConfig) {
  var exports = {};
  'use strict';

  var aa = __webpack_require__(16),
      ba = __webpack_require__(0),
      m = __webpack_require__(17);

  function q(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
      b += "&args[]=" + encodeURIComponent(arguments[c]);
    }

    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }

  var ca = ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      da = 60103,
      ea = 60106,
      fa = 60107,
      ha = 60108,
      ia = 60114,
      ja = 60109,
      ka = 60110,
      la = 60112,
      ma = 60113,
      na = 60120,
      oa = 60115,
      pa = 60116,
      qa = 60121,
      ra = 60129,
      sa = 60130,
      ta = 60131;

  if ("function" === typeof Symbol && Symbol["for"]) {
    var r = Symbol["for"];
    da = r("react.element");
    ea = r("react.portal");
    fa = r("react.fragment");
    ha = r("react.strict_mode");
    ia = r("react.profiler");
    ja = r("react.provider");
    ka = r("react.context");
    la = r("react.forward_ref");
    ma = r("react.suspense");
    na = r("react.suspense_list");
    oa = r("react.memo");
    pa = r("react.lazy");
    qa = r("react.block");
    r("react.scope");
    ra = r("react.debug_trace_mode");
    sa = r("react.offscreen");
    ta = r("react.legacy_hidden");
  }

  var ua = "function" === typeof Symbol && Symbol.iterator;

  function va(a) {
    if (null === a || "object" !== typeof a) return null;
    a = ua && a[ua] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }

  function wa(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;

    switch (a) {
      case fa:
        return "Fragment";

      case ea:
        return "Portal";

      case ia:
        return "Profiler";

      case ha:
        return "StrictMode";

      case ma:
        return "Suspense";

      case na:
        return "SuspenseList";
    }

    if ("object" === typeof a) switch (a.$$typeof) {
      case ka:
        return (a.displayName || "Context") + ".Consumer";

      case ja:
        return (a._context.displayName || "Context") + ".Provider";

      case la:
        var b = a.render;
        b = b.displayName || b.name || "";
        return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");

      case oa:
        return wa(a.type);

      case qa:
        return wa(a._render);

      case pa:
        b = a._payload;
        a = a._init;

        try {
          return wa(a(b));
        } catch (c) {}

    }
    return null;
  }

  function xa(a) {
    var b = a,
        c = a;
    if (a.alternate) for (; b["return"];) {
      b = b["return"];
    } else {
      a = b;

      do {
        b = a, 0 !== (b.flags & 1026) && (c = b["return"]), a = b["return"];
      } while (a);
    }
    return 3 === b.tag ? c : null;
  }

  function ya(a) {
    if (xa(a) !== a) throw Error(q(188));
  }

  function za(a) {
    var b = a.alternate;

    if (!b) {
      b = xa(a);
      if (null === b) throw Error(q(188));
      return b !== a ? null : a;
    }

    for (var c = a, d = b;;) {
      var e = c["return"];
      if (null === e) break;
      var f = e.alternate;

      if (null === f) {
        d = e["return"];

        if (null !== d) {
          c = d;
          continue;
        }

        break;
      }

      if (e.child === f.child) {
        for (f = e.child; f;) {
          if (f === c) return ya(e), a;
          if (f === d) return ya(e), b;
          f = f.sibling;
        }

        throw Error(q(188));
      }

      if (c["return"] !== d["return"]) c = e, d = f;else {
        for (var g = !1, h = e.child; h;) {
          if (h === c) {
            g = !0;
            c = e;
            d = f;
            break;
          }

          if (h === d) {
            g = !0;
            d = e;
            c = f;
            break;
          }

          h = h.sibling;
        }

        if (!g) {
          for (h = f.child; h;) {
            if (h === c) {
              g = !0;
              c = f;
              d = e;
              break;
            }

            if (h === d) {
              g = !0;
              d = f;
              c = e;
              break;
            }

            h = h.sibling;
          }

          if (!g) throw Error(q(189));
        }
      }
      if (c.alternate !== d) throw Error(q(190));
    }

    if (3 !== c.tag) throw Error(q(188));
    return c.stateNode.current === c ? a : b;
  }

  function Aa(a) {
    a = za(a);
    if (!a) return null;

    for (var b = a;;) {
      if (5 === b.tag || 6 === b.tag) return b;
      if (b.child) b.child["return"] = b, b = b.child;else {
        if (b === a) break;

        for (; !b.sibling;) {
          if (!b["return"] || b["return"] === a) return null;
          b = b["return"];
        }

        b.sibling["return"] = b["return"];
        b = b.sibling;
      }
    }

    return null;
  }

  function Ba(a) {
    a = za(a);
    if (!a) return null;

    for (var b = a;;) {
      if (5 === b.tag || 6 === b.tag) return b;
      if (b.child && 4 !== b.tag) b.child["return"] = b, b = b.child;else {
        if (b === a) break;

        for (; !b.sibling;) {
          if (!b["return"] || b["return"] === a) return null;
          b = b["return"];
        }

        b.sibling["return"] = b["return"];
        b = b.sibling;
      }
    }

    return null;
  }

  function Ca(a, b) {
    for (var c = a.alternate; null !== b;) {
      if (b === a || b === c) return !0;
      b = b["return"];
    }

    return !1;
  }

  var Da = $$$hostConfig.getPublicInstance,
      Ea = $$$hostConfig.getRootHostContext,
      Fa = $$$hostConfig.getChildHostContext,
      Ga = $$$hostConfig.prepareForCommit,
      Ha = $$$hostConfig.resetAfterCommit,
      Ia = $$$hostConfig.createInstance,
      Ja = $$$hostConfig.appendInitialChild,
      Ka = $$$hostConfig.finalizeInitialChildren,
      La = $$$hostConfig.prepareUpdate,
      Ma = $$$hostConfig.shouldSetTextContent,
      Na = $$$hostConfig.createTextInstance,
      Pa = $$$hostConfig.scheduleTimeout,
      Qa = $$$hostConfig.cancelTimeout,
      Ra = $$$hostConfig.noTimeout,
      Sa = $$$hostConfig.isPrimaryRenderer,
      Ta = $$$hostConfig.supportsMutation,
      Ua = $$$hostConfig.supportsPersistence,
      Va = $$$hostConfig.supportsHydration,
      Wa = $$$hostConfig.getInstanceFromNode,
      Xa = $$$hostConfig.makeOpaqueHydratingObject,
      Ya = $$$hostConfig.makeClientId,
      Za = $$$hostConfig.beforeActiveInstanceBlur,
      $a = $$$hostConfig.afterActiveInstanceBlur,
      ab = $$$hostConfig.preparePortalMount,
      bb = $$$hostConfig.supportsTestSelectors,
      cb = $$$hostConfig.findFiberRoot,
      db = $$$hostConfig.getBoundingRect,
      eb = $$$hostConfig.getTextContent,
      fb = $$$hostConfig.isHiddenSubtree,
      gb = $$$hostConfig.matchAccessibilityRole,
      hb = $$$hostConfig.setFocusIfFocusable,
      ib = $$$hostConfig.setupIntersectionObserver,
      jb = $$$hostConfig.appendChild,
      kb = $$$hostConfig.appendChildToContainer,
      lb = $$$hostConfig.commitTextUpdate,
      mb = $$$hostConfig.commitMount,
      nb = $$$hostConfig.commitUpdate,
      ob = $$$hostConfig.insertBefore,
      pb = $$$hostConfig.insertInContainerBefore,
      qb = $$$hostConfig.removeChild,
      rb = $$$hostConfig.removeChildFromContainer,
      sb = $$$hostConfig.resetTextContent,
      tb = $$$hostConfig.hideInstance,
      ub = $$$hostConfig.hideTextInstance,
      vb = $$$hostConfig.unhideInstance,
      wb = $$$hostConfig.unhideTextInstance,
      xb = $$$hostConfig.clearContainer,
      yb = $$$hostConfig.cloneInstance,
      zb = $$$hostConfig.createContainerChildSet,
      Ab = $$$hostConfig.appendChildToContainerChildSet,
      Bb = $$$hostConfig.finalizeContainerChildren,
      Cb = $$$hostConfig.replaceContainerChildren,
      Db = $$$hostConfig.cloneHiddenInstance,
      Eb = $$$hostConfig.cloneHiddenTextInstance,
      Fb = $$$hostConfig.canHydrateInstance,
      Gb = $$$hostConfig.canHydrateTextInstance,
      Hb = $$$hostConfig.isSuspenseInstancePending,
      Ib = $$$hostConfig.isSuspenseInstanceFallback,
      Jb = $$$hostConfig.getNextHydratableSibling,
      Kb = $$$hostConfig.getFirstHydratableChild,
      Lb = $$$hostConfig.hydrateInstance,
      Mb = $$$hostConfig.hydrateTextInstance,
      Nb = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,
      Ob = $$$hostConfig.commitHydratedContainer,
      Pb = $$$hostConfig.commitHydratedSuspenseInstance,
      Qb;

  function Rb(a) {
    if (void 0 === Qb) try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      Qb = b && b[1] || "";
    }
    return "\n" + Qb + a;
  }

  var Sb = !1;

  function Tb(a, b) {
    if (!a || Sb) return "";
    Sb = !0;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;

    try {
      if (b) {
        if (b = function b() {
          throw Error();
        }, Object.defineProperty(b.prototype, "props", {
          set: function set() {
            throw Error();
          }
        }), "object" === typeof Reflect && Reflect.construct) {
          try {
            Reflect.construct(b, []);
          } catch (k) {
            var d = k;
          }

          Reflect.construct(a, [], b);
        } else {
          try {
            b.call();
          } catch (k) {
            d = k;
          }

          a.call(b.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (k) {
          d = k;
        }

        a();
      }
    } catch (k) {
      if (k && d && "string" === typeof k.stack) {
        for (var e = k.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) {
          h--;
        }

        for (; 1 <= g && 0 <= h; g--, h--) {
          if (e[g] !== f[h]) {
            if (1 !== g || 1 !== h) {
              do {
                if (g--, h--, 0 > h || e[g] !== f[h]) return "\n" + e[g].replace(" at new ", " at ");
              } while (1 <= g && 0 <= h);
            }

            break;
          }
        }
      }
    } finally {
      Sb = !1, Error.prepareStackTrace = c;
    }

    return (a = a ? a.displayName || a.name : "") ? Rb(a) : "";
  }

  var Ub = [],
      Vb = -1;

  function Wb(a) {
    return {
      current: a
    };
  }

  function z(a) {
    0 > Vb || (a.current = Ub[Vb], Ub[Vb] = null, Vb--);
  }

  function A(a, b) {
    Vb++;
    Ub[Vb] = a.current;
    a.current = b;
  }

  var Xb = {},
      B = Wb(Xb),
      D = Wb(!1),
      Yb = Xb;

  function Zb(a, b) {
    var c = a.type.contextTypes;
    if (!c) return Xb;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
    var e = {},
        f;

    for (f in c) {
      e[f] = b[f];
    }

    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }

  function E(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }

  function $b() {
    z(D);
    z(B);
  }

  function ac(a, b, c) {
    if (B.current !== Xb) throw Error(q(168));
    A(B, b);
    A(D, c);
  }

  function bc(a, b, c) {
    var d = a.stateNode;
    a = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();

    for (var e in d) {
      if (!(e in a)) throw Error(q(108, wa(b) || "Unknown", e));
    }

    return aa({}, c, d);
  }

  function cc(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Xb;
    Yb = B.current;
    A(B, a);
    A(D, D.current);
    return !0;
  }

  function dc(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(q(169));
    c ? (a = bc(a, b, Yb), d.__reactInternalMemoizedMergedChildContext = a, z(D), z(B), A(B, a)) : z(D);
    A(D, c);
  }

  var ec = null,
      fc = null,
      gc = m.unstable_now;
  gc();
  var hc = 0,
      F = 8;

  function ic(a) {
    if (0 !== (1 & a)) return F = 15, 1;
    if (0 !== (2 & a)) return F = 14, 2;
    if (0 !== (4 & a)) return F = 13, 4;
    var b = 24 & a;
    if (0 !== b) return F = 12, b;
    if (0 !== (a & 32)) return F = 11, 32;
    b = 192 & a;
    if (0 !== b) return F = 10, b;
    if (0 !== (a & 256)) return F = 9, 256;
    b = 3584 & a;
    if (0 !== b) return F = 8, b;
    if (0 !== (a & 4096)) return F = 7, 4096;
    b = 4186112 & a;
    if (0 !== b) return F = 6, b;
    b = 62914560 & a;
    if (0 !== b) return F = 5, b;
    if (a & 67108864) return F = 4, 67108864;
    if (0 !== (a & 134217728)) return F = 3, 134217728;
    b = 805306368 & a;
    if (0 !== b) return F = 2, b;
    if (0 !== (1073741824 & a)) return F = 1, 1073741824;
    F = 8;
    return a;
  }

  function jc(a) {
    switch (a) {
      case 99:
        return 15;

      case 98:
        return 10;

      case 97:
      case 96:
        return 8;

      case 95:
        return 2;

      default:
        return 0;
    }
  }

  function kc(a) {
    switch (a) {
      case 15:
      case 14:
        return 99;

      case 13:
      case 12:
      case 11:
      case 10:
        return 98;

      case 9:
      case 8:
      case 7:
      case 6:
      case 4:
      case 5:
        return 97;

      case 3:
      case 2:
      case 1:
        return 95;

      case 0:
        return 90;

      default:
        throw Error(q(358, a));
    }
  }

  function lc(a, b) {
    var c = a.pendingLanes;
    if (0 === c) return F = 0;
    var d = 0,
        e = 0,
        f = a.expiredLanes,
        g = a.suspendedLanes,
        h = a.pingedLanes;
    if (0 !== f) d = f, e = F = 15;else if (f = c & 134217727, 0 !== f) {
      var k = f & ~g;
      0 !== k ? (d = ic(k), e = F) : (h &= f, 0 !== h && (d = ic(h), e = F));
    } else f = c & ~g, 0 !== f ? (d = ic(f), e = F) : 0 !== h && (d = ic(h), e = F);
    if (0 === d) return 0;
    d = 31 - mc(d);
    d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;

    if (0 !== b && b !== d && 0 === (b & g)) {
      ic(b);
      if (e <= F) return b;
      F = e;
    }

    b = a.entangledLanes;
    if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) {
      c = 31 - mc(b), e = 1 << c, d |= a[c], b &= ~e;
    }
    return d;
  }

  function nc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }

  function oc(a, b) {
    switch (a) {
      case 15:
        return 1;

      case 14:
        return 2;

      case 12:
        return a = pc(24 & ~b), 0 === a ? oc(10, b) : a;

      case 10:
        return a = pc(192 & ~b), 0 === a ? oc(8, b) : a;

      case 8:
        return a = pc(3584 & ~b), 0 === a && (a = pc(4186112 & ~b), 0 === a && (a = 512)), a;

      case 2:
        return b = pc(805306368 & ~b), 0 === b && (b = 268435456), b;
    }

    throw Error(q(358, a));
  }

  function pc(a) {
    return a & -a;
  }

  function qc(a) {
    for (var b = [], c = 0; 31 > c; c++) {
      b.push(a);
    }

    return b;
  }

  function rc(a, b, c) {
    a.pendingLanes |= b;
    var d = b - 1;
    a.suspendedLanes &= d;
    a.pingedLanes &= d;
    a = a.eventTimes;
    b = 31 - mc(b);
    a[b] = c;
  }

  var mc = Math.clz32 ? Math.clz32 : sc,
      tc = Math.log,
      uc = Math.LN2;

  function sc(a) {
    return 0 === a ? 32 : 31 - (tc(a) / uc | 0) | 0;
  }

  var vc = m.unstable_runWithPriority,
      wc = m.unstable_scheduleCallback,
      xc = m.unstable_cancelCallback,
      yc = m.unstable_shouldYield,
      zc = m.unstable_requestPaint,
      Ac = m.unstable_now,
      Bc = m.unstable_getCurrentPriorityLevel,
      Cc = m.unstable_ImmediatePriority,
      Dc = m.unstable_UserBlockingPriority,
      Ec = m.unstable_NormalPriority,
      Fc = m.unstable_LowPriority,
      Gc = m.unstable_IdlePriority,
      Hc = {},
      Ic = void 0 !== zc ? zc : function () {},
      Jc = null,
      Kc = null,
      Lc = !1,
      Mc = Ac(),
      G = 1E4 > Mc ? Ac : function () {
    return Ac() - Mc;
  };

  function Nc() {
    switch (Bc()) {
      case Cc:
        return 99;

      case Dc:
        return 98;

      case Ec:
        return 97;

      case Fc:
        return 96;

      case Gc:
        return 95;

      default:
        throw Error(q(332));
    }
  }

  function Oc(a) {
    switch (a) {
      case 99:
        return Cc;

      case 98:
        return Dc;

      case 97:
        return Ec;

      case 96:
        return Fc;

      case 95:
        return Gc;

      default:
        throw Error(q(332));
    }
  }

  function Pc(a, b) {
    a = Oc(a);
    return vc(a, b);
  }

  function Qc(a, b, c) {
    a = Oc(a);
    return wc(a, b, c);
  }

  function H() {
    if (null !== Kc) {
      var a = Kc;
      Kc = null;
      xc(a);
    }

    Rc();
  }

  function Rc() {
    if (!Lc && null !== Jc) {
      Lc = !0;
      var a = 0;

      try {
        var b = Jc;
        Pc(99, function () {
          for (; a < b.length; a++) {
            var c = b[a];

            do {
              c = c(!0);
            } while (null !== c);
          }
        });
        Jc = null;
      } catch (c) {
        throw null !== Jc && (Jc = Jc.slice(a + 1)), wc(Cc, H), c;
      } finally {
        Lc = !1;
      }
    }
  }

  var Sc = ca.ReactCurrentBatchConfig;

  function Tc(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }

  var I = "function" === typeof Object.is ? Object.is : Tc,
      Uc = Object.prototype.hasOwnProperty;

  function Vc(a, b) {
    if (I(a, b)) return !0;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
    var c = Object.keys(a),
        d = Object.keys(b);
    if (c.length !== d.length) return !1;

    for (d = 0; d < c.length; d++) {
      if (!Uc.call(b, c[d]) || !I(a[c[d]], b[c[d]])) return !1;
    }

    return !0;
  }

  function Wc(a) {
    switch (a.tag) {
      case 5:
        return Rb(a.type);

      case 16:
        return Rb("Lazy");

      case 13:
        return Rb("Suspense");

      case 19:
        return Rb("SuspenseList");

      case 0:
      case 2:
      case 15:
        return a = Tb(a.type, !1), a;

      case 11:
        return a = Tb(a.type.render, !1), a;

      case 22:
        return a = Tb(a.type._render, !1), a;

      case 1:
        return a = Tb(a.type, !0), a;

      default:
        return "";
    }
  }

  function Xc(a, b) {
    if (a && a.defaultProps) {
      b = aa({}, b);
      a = a.defaultProps;

      for (var c in a) {
        void 0 === b[c] && (b[c] = a[c]);
      }

      return b;
    }

    return b;
  }

  var Yc = Wb(null),
      Zc = null,
      $c = null,
      ad = null;

  function bd() {
    ad = $c = Zc = null;
  }

  function cd(a, b) {
    a = a.type._context;
    Sa ? (A(Yc, a._currentValue), a._currentValue = b) : (A(Yc, a._currentValue2), a._currentValue2 = b);
  }

  function dd(a) {
    var b = Yc.current;
    z(Yc);
    a = a.type._context;
    Sa ? a._currentValue = b : a._currentValue2 = b;
  }

  function ed(a, b) {
    for (; null !== a;) {
      var c = a.alternate;
      if ((a.childLanes & b) === b) {
        if (null === c || (c.childLanes & b) === b) break;else c.childLanes |= b;
      } else a.childLanes |= b, null !== c && (c.childLanes |= b);
      a = a["return"];
    }
  }

  function fd(a, b) {
    Zc = a;
    ad = $c = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (gd = !0), a.firstContext = null);
  }

  function J(a, b) {
    if (ad !== a && !1 !== b && 0 !== b) {
      if ("number" !== typeof b || 1073741823 === b) ad = a, b = 1073741823;
      b = {
        context: a,
        observedBits: b,
        next: null
      };

      if (null === $c) {
        if (null === Zc) throw Error(q(308));
        $c = b;
        Zc.dependencies = {
          lanes: 0,
          firstContext: b,
          responders: null
        };
      } else $c = $c.next = b;
    }

    return Sa ? a._currentValue : a._currentValue2;
  }

  var hd = !1;

  function id(a) {
    a.updateQueue = {
      baseState: a.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null
      },
      effects: null
    };
  }

  function jd(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = {
      baseState: a.baseState,
      firstBaseUpdate: a.firstBaseUpdate,
      lastBaseUpdate: a.lastBaseUpdate,
      shared: a.shared,
      effects: a.effects
    });
  }

  function kd(a, b) {
    return {
      eventTime: a,
      lane: b,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }

  function md(a, b) {
    a = a.updateQueue;

    if (null !== a) {
      a = a.shared;
      var c = a.pending;
      null === c ? b.next = b : (b.next = c.next, c.next = b);
      a.pending = b;
    }
  }

  function nd(a, b) {
    var c = a.updateQueue,
        d = a.alternate;

    if (null !== d && (d = d.updateQueue, c === d)) {
      var e = null,
          f = null;
      c = c.firstBaseUpdate;

      if (null !== c) {
        do {
          var g = {
            eventTime: c.eventTime,
            lane: c.lane,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          };
          null === f ? e = f = g : f = f.next = g;
          c = c.next;
        } while (null !== c);

        null === f ? e = f = b : f = f.next = b;
      } else e = f = b;

      c = {
        baseState: d.baseState,
        firstBaseUpdate: e,
        lastBaseUpdate: f,
        shared: d.shared,
        effects: d.effects
      };
      a.updateQueue = c;
      return;
    }

    a = c.lastBaseUpdate;
    null === a ? c.firstBaseUpdate = b : a.next = b;
    c.lastBaseUpdate = b;
  }

  function od(a, b, c, d) {
    var e = a.updateQueue;
    hd = !1;
    var f = e.firstBaseUpdate,
        g = e.lastBaseUpdate,
        h = e.shared.pending;

    if (null !== h) {
      e.shared.pending = null;
      var k = h,
          l = k.next;
      k.next = null;
      null === g ? f = l : g.next = l;
      g = k;
      var n = a.alternate;

      if (null !== n) {
        n = n.updateQueue;
        var t = n.lastBaseUpdate;
        t !== g && (null === t ? n.firstBaseUpdate = l : t.next = l, n.lastBaseUpdate = k);
      }
    }

    if (null !== f) {
      t = e.baseState;
      g = 0;
      n = l = k = null;

      do {
        h = f.lane;
        var p = f.eventTime;

        if ((d & h) === h) {
          null !== n && (n = n.next = {
            eventTime: p,
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          });

          a: {
            var y = a,
                x = f;
            h = b;
            p = c;

            switch (x.tag) {
              case 1:
                y = x.payload;

                if ("function" === typeof y) {
                  t = y.call(p, t, h);
                  break a;
                }

                t = y;
                break a;

              case 3:
                y.flags = y.flags & -4097 | 64;

              case 0:
                y = x.payload;
                h = "function" === typeof y ? y.call(p, t, h) : y;
                if (null === h || void 0 === h) break a;
                t = aa({}, t, h);
                break a;

              case 2:
                hd = !0;
            }
          }

          null !== f.callback && (a.flags |= 32, h = e.effects, null === h ? e.effects = [f] : h.push(f));
        } else p = {
          eventTime: p,
          lane: h,
          tag: f.tag,
          payload: f.payload,
          callback: f.callback,
          next: null
        }, null === n ? (l = n = p, k = t) : n = n.next = p, g |= h;

        f = f.next;
        if (null === f) if (h = e.shared.pending, null === h) break;else f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
      } while (1);

      null === n && (k = t);
      e.baseState = k;
      e.firstBaseUpdate = l;
      e.lastBaseUpdate = n;
      pd |= g;
      a.lanes = g;
      a.memoizedState = t;
    }
  }

  function qd(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a) for (b = 0; b < a.length; b++) {
      var d = a[b],
          e = d.callback;

      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e) throw Error(q(191, e));
        e.call(d);
      }
    }
  }

  var rd = new ba.Component().refs;

  function sd(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : aa({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }

  var vd = {
    isMounted: function isMounted(a) {
      return (a = a._reactInternals) ? xa(a) === a : !1;
    },
    enqueueSetState: function enqueueSetState(a, b, c) {
      a = a._reactInternals;
      var d = K(),
          e = td(a),
          f = kd(d, e);
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      md(a, f);
      ud(a, e, d);
    },
    enqueueReplaceState: function enqueueReplaceState(a, b, c) {
      a = a._reactInternals;
      var d = K(),
          e = td(a),
          f = kd(d, e);
      f.tag = 1;
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      md(a, f);
      ud(a, e, d);
    },
    enqueueForceUpdate: function enqueueForceUpdate(a, b) {
      a = a._reactInternals;
      var c = K(),
          d = td(a),
          e = kd(c, d);
      e.tag = 2;
      void 0 !== b && null !== b && (e.callback = b);
      md(a, e);
      ud(a, d, c);
    }
  };

  function wd(a, b, c, d, e, f, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Vc(c, d) || !Vc(e, f) : !0;
  }

  function xd(a, b, c) {
    var d = !1,
        e = Xb;
    var f = b.contextType;
    "object" === typeof f && null !== f ? f = J(f) : (e = E(b) ? Yb : B.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Zb(a, e) : Xb);
    b = new b(c, f);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = vd;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
    return b;
  }

  function yd(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && vd.enqueueReplaceState(b, b.state, null);
  }

  function zd(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = rd;
    id(a);
    var f = b.contextType;
    "object" === typeof f && null !== f ? e.context = J(f) : (f = E(b) ? Yb : B.current, e.context = Zb(a, f));
    od(a, c, e, d);
    e.state = a.memoizedState;
    f = b.getDerivedStateFromProps;
    "function" === typeof f && (sd(a, b, f, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && vd.enqueueReplaceState(e, e.state, null), od(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4);
  }

  var Ad = Array.isArray;

  function Bd(a, b, c) {
    a = c.ref;

    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;

        if (c) {
          if (1 !== c.tag) throw Error(q(309));
          var d = c.stateNode;
        }

        if (!d) throw Error(q(147, a));
        var e = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;

        b = function b(a) {
          var b = d.refs;
          b === rd && (b = d.refs = {});
          null === a ? delete b[e] : b[e] = a;
        };

        b._stringRef = e;
        return b;
      }

      if ("string" !== typeof a) throw Error(q(284));
      if (!c._owner) throw Error(q(290, a));
    }

    return a;
  }

  function Cd(a, b) {
    if ("textarea" !== a.type) throw Error(q(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
  }

  function Dd(a) {
    function b(b, c) {
      if (a) {
        var d = b.lastEffect;
        null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
        c.nextEffect = null;
        c.flags = 8;
      }
    }

    function c(c, d) {
      if (!a) return null;

      for (; null !== d;) {
        b(c, d), d = d.sibling;
      }

      return null;
    }

    function d(a, b) {
      for (a = new Map(); null !== b;) {
        null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
      }

      return a;
    }

    function e(a, b) {
      a = Ed(a, b);
      a.index = 0;
      a.sibling = null;
      return a;
    }

    function f(b, c, d) {
      b.index = d;
      if (!a) return c;
      d = b.alternate;
      if (null !== d) return d = d.index, d < c ? (b.flags = 2, c) : d;
      b.flags = 2;
      return c;
    }

    function g(b) {
      a && null === b.alternate && (b.flags = 2);
      return b;
    }

    function h(a, b, c, d) {
      if (null === b || 6 !== b.tag) return b = Fd(c, a.mode, d), b["return"] = a, b;
      b = e(b, c);
      b["return"] = a;
      return b;
    }

    function k(a, b, c, d) {
      if (null !== b && b.elementType === c.type) return d = e(b, c.props), d.ref = Bd(a, b, c), d["return"] = a, d;
      d = Gd(c.type, c.key, c.props, null, a.mode, d);
      d.ref = Bd(a, b, c);
      d["return"] = a;
      return d;
    }

    function l(a, b, c, d) {
      if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Hd(c, a.mode, d), b["return"] = a, b;
      b = e(b, c.children || []);
      b["return"] = a;
      return b;
    }

    function n(a, b, c, d, f) {
      if (null === b || 7 !== b.tag) return b = Id(c, a.mode, d, f), b["return"] = a, b;
      b = e(b, c);
      b["return"] = a;
      return b;
    }

    function t(a, b, c) {
      if ("string" === typeof b || "number" === typeof b) return b = Fd("" + b, a.mode, c), b["return"] = a, b;

      if ("object" === typeof b && null !== b) {
        switch (b.$$typeof) {
          case da:
            return c = Gd(b.type, b.key, b.props, null, a.mode, c), c.ref = Bd(a, null, b), c["return"] = a, c;

          case ea:
            return b = Hd(b, a.mode, c), b["return"] = a, b;
        }

        if (Ad(b) || va(b)) return b = Id(b, a.mode, c, null), b["return"] = a, b;
        Cd(a, b);
      }

      return null;
    }

    function p(a, b, c, d) {
      var e = null !== b ? b.key : null;
      if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);

      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case da:
            return c.key === e ? c.type === fa ? n(a, b, c.props.children, d, e) : k(a, b, c, d) : null;

          case ea:
            return c.key === e ? l(a, b, c, d) : null;
        }

        if (Ad(c) || va(c)) return null !== e ? null : n(a, b, c, d, null);
        Cd(a, c);
      }

      return null;
    }

    function y(a, b, c, d, e) {
      if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);

      if ("object" === typeof d && null !== d) {
        switch (d.$$typeof) {
          case da:
            return a = a.get(null === d.key ? c : d.key) || null, d.type === fa ? n(b, a, d.props.children, e, d.key) : k(b, a, d, e);

          case ea:
            return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
        }

        if (Ad(d) || va(d)) return a = a.get(c) || null, n(b, a, d, e, null);
        Cd(b, d);
      }

      return null;
    }

    function x(e, g, h, k) {
      for (var l = null, v = null, u = g, C = g = 0, n = null; null !== u && C < h.length; C++) {
        u.index > C ? (n = u, u = null) : n = u.sibling;
        var w = p(e, u, h[C], k);

        if (null === w) {
          null === u && (u = n);
          break;
        }

        a && u && null === w.alternate && b(e, u);
        g = f(w, g, C);
        null === v ? l = w : v.sibling = w;
        v = w;
        u = n;
      }

      if (C === h.length) return c(e, u), l;

      if (null === u) {
        for (; C < h.length; C++) {
          u = t(e, h[C], k), null !== u && (g = f(u, g, C), null === v ? l = u : v.sibling = u, v = u);
        }

        return l;
      }

      for (u = d(e, u); C < h.length; C++) {
        n = y(u, e, C, h[C], k), null !== n && (a && null !== n.alternate && u["delete"](null === n.key ? C : n.key), g = f(n, g, C), null === v ? l = n : v.sibling = n, v = n);
      }

      a && u.forEach(function (a) {
        return b(e, a);
      });
      return l;
    }

    function Y(e, g, h, k) {
      var l = va(h);
      if ("function" !== typeof l) throw Error(q(150));
      h = l.call(h);
      if (null == h) throw Error(q(151));

      for (var u = l = null, v = g, n = g = 0, C = null, w = h.next(); null !== v && !w.done; n++, w = h.next()) {
        v.index > n ? (C = v, v = null) : C = v.sibling;
        var x = p(e, v, w.value, k);

        if (null === x) {
          null === v && (v = C);
          break;
        }

        a && v && null === x.alternate && b(e, v);
        g = f(x, g, n);
        null === u ? l = x : u.sibling = x;
        u = x;
        v = C;
      }

      if (w.done) return c(e, v), l;

      if (null === v) {
        for (; !w.done; n++, w = h.next()) {
          w = t(e, w.value, k), null !== w && (g = f(w, g, n), null === u ? l = w : u.sibling = w, u = w);
        }

        return l;
      }

      for (v = d(e, v); !w.done; n++, w = h.next()) {
        w = y(v, e, n, w.value, k), null !== w && (a && null !== w.alternate && v["delete"](null === w.key ? n : w.key), g = f(w, g, n), null === u ? l = w : u.sibling = w, u = w);
      }

      a && v.forEach(function (a) {
        return b(e, a);
      });
      return l;
    }

    return function (a, d, f, h) {
      var k = "object" === typeof f && null !== f && f.type === fa && null === f.key;
      k && (f = f.props.children);
      var l = "object" === typeof f && null !== f;
      if (l) switch (f.$$typeof) {
        case da:
          a: {
            l = f.key;

            for (k = d; null !== k;) {
              if (k.key === l) {
                switch (k.tag) {
                  case 7:
                    if (f.type === fa) {
                      c(a, k.sibling);
                      d = e(k, f.props.children);
                      d["return"] = a;
                      a = d;
                      break a;
                    }

                    break;

                  default:
                    if (k.elementType === f.type) {
                      c(a, k.sibling);
                      d = e(k, f.props);
                      d.ref = Bd(a, k, f);
                      d["return"] = a;
                      a = d;
                      break a;
                    }

                }

                c(a, k);
                break;
              } else b(a, k);

              k = k.sibling;
            }

            f.type === fa ? (d = Id(f.props.children, a.mode, h, f.key), d["return"] = a, a = d) : (h = Gd(f.type, f.key, f.props, null, a.mode, h), h.ref = Bd(a, d, f), h["return"] = a, a = h);
          }

          return g(a);

        case ea:
          a: {
            for (k = f.key; null !== d;) {
              if (d.key === k) {
                if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                  c(a, d.sibling);
                  d = e(d, f.children || []);
                  d["return"] = a;
                  a = d;
                  break a;
                } else {
                  c(a, d);
                  break;
                }
              } else b(a, d);
              d = d.sibling;
            }

            d = Hd(f, a.mode, h);
            d["return"] = a;
            a = d;
          }

          return g(a);
      }
      if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d["return"] = a, a = d) : (c(a, d), d = Fd(f, a.mode, h), d["return"] = a, a = d), g(a);
      if (Ad(f)) return x(a, d, f, h);
      if (va(f)) return Y(a, d, f, h);
      l && Cd(a, f);
      if ("undefined" === typeof f && !k) switch (a.tag) {
        case 1:
        case 22:
        case 0:
        case 11:
        case 15:
          throw Error(q(152, wa(a.type) || "Component"));
      }
      return c(a, d);
    };
  }

  var Jd = Dd(!0),
      Kd = Dd(!1),
      Ld = {},
      L = Wb(Ld),
      Md = Wb(Ld),
      Nd = Wb(Ld);

  function Od(a) {
    if (a === Ld) throw Error(q(174));
    return a;
  }

  function Pd(a, b) {
    A(Nd, b);
    A(Md, a);
    A(L, Ld);
    a = Ea(b);
    z(L);
    A(L, a);
  }

  function Qd() {
    z(L);
    z(Md);
    z(Nd);
  }

  function Rd(a) {
    var b = Od(Nd.current),
        c = Od(L.current);
    b = Fa(c, a.type, b);
    c !== b && (A(Md, a), A(L, b));
  }

  function Sd(a) {
    Md.current === a && (z(L), z(Md));
  }

  var M = Wb(0);

  function Td(a) {
    for (var b = a; null !== b;) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || Hb(c) || Ib(c))) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 64)) return b;
      } else if (null !== b.child) {
        b.child["return"] = b;
        b = b.child;
        continue;
      }

      if (b === a) break;

      for (; null === b.sibling;) {
        if (null === b["return"] || b["return"] === a) return null;
        b = b["return"];
      }

      b.sibling["return"] = b["return"];
      b = b.sibling;
    }

    return null;
  }

  var Ud = null,
      Vd = null,
      Wd = !1;

  function Xd(a, b) {
    var c = Yd(5, null, null, 0);
    c.elementType = "DELETED";
    c.type = "DELETED";
    c.stateNode = b;
    c["return"] = a;
    c.flags = 8;
    null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
  }

  function Zd(a, b) {
    switch (a.tag) {
      case 5:
        return b = Fb(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;

      case 6:
        return b = Gb(b, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;

      case 13:
        return !1;

      default:
        return !1;
    }
  }

  function $d(a) {
    if (Wd) {
      var b = Vd;

      if (b) {
        var c = b;

        if (!Zd(a, b)) {
          b = Jb(c);

          if (!b || !Zd(a, b)) {
            a.flags = a.flags & -1025 | 2;
            Wd = !1;
            Ud = a;
            return;
          }

          Xd(Ud, c);
        }

        Ud = a;
        Vd = Kb(b);
      } else a.flags = a.flags & -1025 | 2, Wd = !1, Ud = a;
    }
  }

  function ae(a) {
    for (a = a["return"]; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) {
      a = a["return"];
    }

    Ud = a;
  }

  function be(a) {
    if (!Va || a !== Ud) return !1;
    if (!Wd) return ae(a), Wd = !0, !1;
    var b = a.type;
    if (5 !== a.tag || "head" !== b && "body" !== b && !Ma(b, a.memoizedProps)) for (b = Vd; b;) {
      Xd(a, b), b = Jb(b);
    }
    ae(a);

    if (13 === a.tag) {
      if (!Va) throw Error(q(316));
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(q(317));
      Vd = Nb(a);
    } else Vd = Ud ? Jb(a.stateNode) : null;

    return !0;
  }

  function ce() {
    Va && (Vd = Ud = null, Wd = !1);
  }

  var de = [];

  function ee() {
    for (var a = 0; a < de.length; a++) {
      var b = de[a];
      Sa ? b._workInProgressVersionPrimary = null : b._workInProgressVersionSecondary = null;
    }

    de.length = 0;
  }

  var fe = ca.ReactCurrentDispatcher,
      ge = ca.ReactCurrentBatchConfig,
      he = 0,
      N = null,
      O = null,
      P = null,
      ie = !1,
      je = !1;

  function Q() {
    throw Error(q(321));
  }

  function ke(a, b) {
    if (null === b) return !1;

    for (var c = 0; c < b.length && c < a.length; c++) {
      if (!I(a[c], b[c])) return !1;
    }

    return !0;
  }

  function le(a, b, c, d, e, f) {
    he = f;
    N = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    fe.current = null === a || null === a.memoizedState ? me : ne;
    a = c(d, e);

    if (je) {
      f = 0;

      do {
        je = !1;
        if (!(25 > f)) throw Error(q(301));
        f += 1;
        P = O = null;
        b.updateQueue = null;
        fe.current = oe;
        a = c(d, e);
      } while (je);
    }

    fe.current = pe;
    b = null !== O && null !== O.next;
    he = 0;
    P = O = N = null;
    ie = !1;
    if (b) throw Error(q(300));
    return a;
  }

  function qe() {
    var a = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    null === P ? N.memoizedState = P = a : P = P.next = a;
    return P;
  }

  function re() {
    if (null === O) {
      var a = N.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = O.next;

    var b = null === P ? N.memoizedState : P.next;
    if (null !== b) P = b, O = a;else {
      if (null === a) throw Error(q(310));
      O = a;
      a = {
        memoizedState: O.memoizedState,
        baseState: O.baseState,
        baseQueue: O.baseQueue,
        queue: O.queue,
        next: null
      };
      null === P ? N.memoizedState = P = a : P = P.next = a;
    }
    return P;
  }

  function se(a, b) {
    return "function" === typeof b ? b(a) : b;
  }

  function te(a) {
    var b = re(),
        c = b.queue;
    if (null === c) throw Error(q(311));
    c.lastRenderedReducer = a;
    var d = O,
        e = d.baseQueue,
        f = c.pending;

    if (null !== f) {
      if (null !== e) {
        var g = e.next;
        e.next = f.next;
        f.next = g;
      }

      d.baseQueue = e = f;
      c.pending = null;
    }

    if (null !== e) {
      e = e.next;
      d = d.baseState;
      var h = g = f = null,
          k = e;

      do {
        var l = k.lane;
        if ((he & l) === l) null !== h && (h = h.next = {
          lane: 0,
          action: k.action,
          eagerReducer: k.eagerReducer,
          eagerState: k.eagerState,
          next: null
        }), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);else {
          var n = {
            lane: l,
            action: k.action,
            eagerReducer: k.eagerReducer,
            eagerState: k.eagerState,
            next: null
          };
          null === h ? (g = h = n, f = d) : h = h.next = n;
          N.lanes |= l;
          pd |= l;
        }
        k = k.next;
      } while (null !== k && k !== e);

      null === h ? f = d : h.next = g;
      I(d, b.memoizedState) || (gd = !0);
      b.memoizedState = d;
      b.baseState = f;
      b.baseQueue = h;
      c.lastRenderedState = d;
    }

    return [b.memoizedState, c.dispatch];
  }

  function ue(a) {
    var b = re(),
        c = b.queue;
    if (null === c) throw Error(q(311));
    c.lastRenderedReducer = a;
    var d = c.dispatch,
        e = c.pending,
        f = b.memoizedState;

    if (null !== e) {
      c.pending = null;
      var g = e = e.next;

      do {
        f = a(f, g.action), g = g.next;
      } while (g !== e);

      I(f, b.memoizedState) || (gd = !0);
      b.memoizedState = f;
      null === b.baseQueue && (b.baseState = f);
      c.lastRenderedState = f;
    }

    return [f, d];
  }

  function ve(a, b, c) {
    var d = b._getVersion;
    d = d(b._source);
    var e = Sa ? b._workInProgressVersionPrimary : b._workInProgressVersionSecondary;
    if (null !== e) a = e === d;else if (a = a.mutableReadLanes, a = (he & a) === a) Sa ? b._workInProgressVersionPrimary = d : b._workInProgressVersionSecondary = d, de.push(b);
    if (a) return c(b._source);
    de.push(b);
    throw Error(q(350));
  }

  function we(a, b, c, d) {
    var e = R;
    if (null === e) throw Error(q(349));
    var f = b._getVersion,
        g = f(b._source),
        h = fe.current,
        k = h.useState(function () {
      return ve(e, b, c);
    }),
        l = k[1],
        n = k[0];
    k = P;
    var t = a.memoizedState,
        p = t.refs,
        y = p.getSnapshot,
        x = t.source;
    t = t.subscribe;
    var Y = N;
    a.memoizedState = {
      refs: p,
      source: b,
      subscribe: d
    };
    h.useEffect(function () {
      p.getSnapshot = c;
      p.setSnapshot = l;
      var a = f(b._source);

      if (!I(g, a)) {
        a = c(b._source);
        I(n, a) || (l(a), a = td(Y), e.mutableReadLanes |= a & e.pendingLanes);
        a = e.mutableReadLanes;
        e.entangledLanes |= a;

        for (var d = e.entanglements, h = a; 0 < h;) {
          var k = 31 - mc(h),
              t = 1 << k;
          d[k] |= a;
          h &= ~t;
        }
      }
    }, [c, b, d]);
    h.useEffect(function () {
      return d(b._source, function () {
        var a = p.getSnapshot,
            c = p.setSnapshot;

        try {
          c(a(b._source));
          var d = td(Y);
          e.mutableReadLanes |= d & e.pendingLanes;
        } catch (Oa) {
          c(function () {
            throw Oa;
          });
        }
      });
    }, [b, d]);
    I(y, c) && I(x, b) && I(t, d) || (a = {
      pending: null,
      dispatch: null,
      lastRenderedReducer: se,
      lastRenderedState: n
    }, a.dispatch = l = xe.bind(null, N, a), k.queue = a, k.baseQueue = null, n = ve(e, b, c), k.memoizedState = k.baseState = n);
    return n;
  }

  function ye(a, b, c) {
    var d = re();
    return we(d, a, b, c);
  }

  function ze(a) {
    var b = qe();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = b.queue = {
      pending: null,
      dispatch: null,
      lastRenderedReducer: se,
      lastRenderedState: a
    };
    a = a.dispatch = xe.bind(null, N, a);
    return [b.memoizedState, a];
  }

  function Ae(a, b, c, d) {
    a = {
      tag: a,
      create: b,
      destroy: c,
      deps: d,
      next: null
    };
    b = N.updateQueue;
    null === b ? (b = {
      lastEffect: null
    }, N.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }

  function Be(a) {
    var b = qe();
    a = {
      current: a
    };
    return b.memoizedState = a;
  }

  function Ce() {
    return re().memoizedState;
  }

  function De(a, b, c, d) {
    var e = qe();
    N.flags |= a;
    e.memoizedState = Ae(1 | b, c, void 0, void 0 === d ? null : d);
  }

  function Ee(a, b, c, d) {
    var e = re();
    d = void 0 === d ? null : d;
    var f = void 0;

    if (null !== O) {
      var g = O.memoizedState;
      f = g.destroy;

      if (null !== d && ke(d, g.deps)) {
        Ae(b, c, f, d);
        return;
      }
    }

    N.flags |= a;
    e.memoizedState = Ae(1 | b, c, f, d);
  }

  function Fe(a, b) {
    return De(516, 4, a, b);
  }

  function Ge(a, b) {
    return Ee(516, 4, a, b);
  }

  function He(a, b) {
    return Ee(4, 2, a, b);
  }

  function Ie(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function () {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
      b.current = null;
    };
  }

  function Je(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return Ee(4, 2, Ie.bind(null, b, a), c);
  }

  function Ke() {}

  function Le(a, b) {
    var c = re();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && ke(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }

  function Me(a, b) {
    var c = re();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && ke(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }

  function Ne(a, b) {
    var c = Nc();
    Pc(98 > c ? 98 : c, function () {
      a(!0);
    });
    Pc(97 < c ? 97 : c, function () {
      var c = ge.transition;
      ge.transition = 1;

      try {
        a(!1), b();
      } finally {
        ge.transition = c;
      }
    });
  }

  function xe(a, b, c) {
    var d = K(),
        e = td(a),
        f = {
      lane: e,
      action: c,
      eagerReducer: null,
      eagerState: null,
      next: null
    },
        g = b.pending;
    null === g ? f.next = f : (f.next = g.next, g.next = f);
    b.pending = f;
    g = a.alternate;
    if (a === N || null !== g && g === N) je = ie = !0;else {
      if (0 === a.lanes && (null === g || 0 === g.lanes) && (g = b.lastRenderedReducer, null !== g)) try {
        var h = b.lastRenderedState,
            k = g(h, c);
        f.eagerReducer = g;
        f.eagerState = k;
        if (I(k, h)) return;
      } catch (l) {} finally {}
      ud(a, e, d);
    }
  }

  var pe = {
    readContext: J,
    useCallback: Q,
    useContext: Q,
    useEffect: Q,
    useImperativeHandle: Q,
    useLayoutEffect: Q,
    useMemo: Q,
    useReducer: Q,
    useRef: Q,
    useState: Q,
    useDebugValue: Q,
    useDeferredValue: Q,
    useTransition: Q,
    useMutableSource: Q,
    useOpaqueIdentifier: Q,
    unstable_isNewReconciler: !1
  },
      me = {
    readContext: J,
    useCallback: function useCallback(a, b) {
      qe().memoizedState = [a, void 0 === b ? null : b];
      return a;
    },
    useContext: J,
    useEffect: Fe,
    useImperativeHandle: function useImperativeHandle(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return De(4, 2, Ie.bind(null, b, a), c);
    },
    useLayoutEffect: function useLayoutEffect(a, b) {
      return De(4, 2, a, b);
    },
    useMemo: function useMemo(a, b) {
      var c = qe();
      b = void 0 === b ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    },
    useReducer: function useReducer(a, b, c) {
      var d = qe();
      b = void 0 !== c ? c(b) : b;
      d.memoizedState = d.baseState = b;
      a = d.queue = {
        pending: null,
        dispatch: null,
        lastRenderedReducer: a,
        lastRenderedState: b
      };
      a = a.dispatch = xe.bind(null, N, a);
      return [d.memoizedState, a];
    },
    useRef: Be,
    useState: ze,
    useDebugValue: Ke,
    useDeferredValue: function useDeferredValue(a) {
      var b = ze(a),
          c = b[0],
          d = b[1];
      Fe(function () {
        var b = ge.transition;
        ge.transition = 1;

        try {
          d(a);
        } finally {
          ge.transition = b;
        }
      }, [a]);
      return c;
    },
    useTransition: function useTransition() {
      var a = ze(!1),
          b = a[0];
      a = Ne.bind(null, a[1]);
      Be(a);
      return [a, b];
    },
    useMutableSource: function useMutableSource(a, b, c) {
      var d = qe();
      d.memoizedState = {
        refs: {
          getSnapshot: b,
          setSnapshot: null
        },
        source: a,
        subscribe: c
      };
      return we(d, a, b, c);
    },
    useOpaqueIdentifier: function useOpaqueIdentifier() {
      if (Wd) {
        var a = !1,
            b = Xa(function () {
          a || (a = !0, c(Ya()));
          throw Error(q(355));
        }),
            c = ze(b)[1];
        0 === (N.mode & 2) && (N.flags |= 516, Ae(5, function () {
          c(Ya());
        }, void 0, null));
        return b;
      }

      b = Ya();
      ze(b);
      return b;
    },
    unstable_isNewReconciler: !1
  },
      ne = {
    readContext: J,
    useCallback: Le,
    useContext: J,
    useEffect: Ge,
    useImperativeHandle: Je,
    useLayoutEffect: He,
    useMemo: Me,
    useReducer: te,
    useRef: Ce,
    useState: function useState() {
      return te(se);
    },
    useDebugValue: Ke,
    useDeferredValue: function useDeferredValue(a) {
      var b = te(se),
          c = b[0],
          d = b[1];
      Ge(function () {
        var b = ge.transition;
        ge.transition = 1;

        try {
          d(a);
        } finally {
          ge.transition = b;
        }
      }, [a]);
      return c;
    },
    useTransition: function useTransition() {
      var a = te(se)[0];
      return [Ce().current, a];
    },
    useMutableSource: ye,
    useOpaqueIdentifier: function useOpaqueIdentifier() {
      return te(se)[0];
    },
    unstable_isNewReconciler: !1
  },
      oe = {
    readContext: J,
    useCallback: Le,
    useContext: J,
    useEffect: Ge,
    useImperativeHandle: Je,
    useLayoutEffect: He,
    useMemo: Me,
    useReducer: ue,
    useRef: Ce,
    useState: function useState() {
      return ue(se);
    },
    useDebugValue: Ke,
    useDeferredValue: function useDeferredValue(a) {
      var b = ue(se),
          c = b[0],
          d = b[1];
      Ge(function () {
        var b = ge.transition;
        ge.transition = 1;

        try {
          d(a);
        } finally {
          ge.transition = b;
        }
      }, [a]);
      return c;
    },
    useTransition: function useTransition() {
      var a = ue(se)[0];
      return [Ce().current, a];
    },
    useMutableSource: ye,
    useOpaqueIdentifier: function useOpaqueIdentifier() {
      return ue(se)[0];
    },
    unstable_isNewReconciler: !1
  },
      Oe = ca.ReactCurrentOwner,
      gd = !1;

  function S(a, b, c, d) {
    b.child = null === a ? Kd(b, null, c, d) : Jd(b, a.child, c, d);
  }

  function Pe(a, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    fd(b, e);
    d = le(a, b, c, d, f, e);
    if (null !== a && !gd) return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, Re(a, b, e);
    b.flags |= 1;
    S(a, b, d, e);
    return b.child;
  }

  function Se(a, b, c, d, e, f) {
    if (null === a) {
      var g = c.type;
      if ("function" === typeof g && !Te(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, Ue(a, b, g, d, e, f);
      a = Gd(c.type, null, d, b, b.mode, f);
      a.ref = b.ref;
      a["return"] = b;
      return b.child = a;
    }

    g = a.child;
    if (0 === (e & f) && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : Vc, c(e, d) && a.ref === b.ref)) return Re(a, b, f);
    b.flags |= 1;
    a = Ed(g, d);
    a.ref = b.ref;
    a["return"] = b;
    return b.child = a;
  }

  function Ue(a, b, c, d, e, f) {
    if (null !== a && Vc(a.memoizedProps, d) && a.ref === b.ref) if (gd = !1, 0 !== (f & e)) 0 !== (a.flags & 16384) && (gd = !0);else return b.lanes = a.lanes, Re(a, b, f);
    return Ve(a, b, c, d, f);
  }

  function We(a, b, c) {
    var d = b.pendingProps,
        e = d.children,
        f = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode || "unstable-defer-without-hiding" === d.mode) {
      if (0 === (b.mode & 4)) b.memoizedState = {
        baseLanes: 0
      }, Xe(b, c);else if (0 !== (c & 1073741824)) b.memoizedState = {
        baseLanes: 0
      }, Xe(b, null !== f ? f.baseLanes : c);else return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
        baseLanes: a
      }, Xe(b, a), null;
    } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, Xe(b, d);
    S(a, b, e, c);
    return b.child;
  }

  function Ye(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 128;
  }

  function Ve(a, b, c, d, e) {
    var f = E(c) ? Yb : B.current;
    f = Zb(b, f);
    fd(b, e);
    c = le(a, b, c, d, f, e);
    if (null !== a && !gd) return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, Re(a, b, e);
    b.flags |= 1;
    S(a, b, c, e);
    return b.child;
  }

  function Ze(a, b, c, d, e) {
    if (E(c)) {
      var f = !0;
      cc(b);
    } else f = !1;

    fd(b, e);
    if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), xd(b, c, d), zd(b, c, d, e), d = !0;else if (null === a) {
      var g = b.stateNode,
          h = b.memoizedProps;
      g.props = h;
      var k = g.context,
          l = c.contextType;
      "object" === typeof l && null !== l ? l = J(l) : (l = E(c) ? Yb : B.current, l = Zb(b, l));
      var n = c.getDerivedStateFromProps,
          t = "function" === typeof n || "function" === typeof g.getSnapshotBeforeUpdate;
      t || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && yd(b, g, d, l);
      hd = !1;
      var p = b.memoizedState;
      g.state = p;
      od(b, d, g, e);
      k = b.memoizedState;
      h !== d || p !== k || D.current || hd ? ("function" === typeof n && (sd(b, c, n, d), k = b.memoizedState), (h = hd || wd(b, c, h, d, p, k, l)) ? (t || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4)) : ("function" === typeof g.componentDidMount && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4), d = !1);
    } else {
      g = b.stateNode;
      jd(a, b);
      h = b.memoizedProps;
      l = b.type === b.elementType ? h : Xc(b.type, h);
      g.props = l;
      t = b.pendingProps;
      p = g.context;
      k = c.contextType;
      "object" === typeof k && null !== k ? k = J(k) : (k = E(c) ? Yb : B.current, k = Zb(b, k));
      var y = c.getDerivedStateFromProps;
      (n = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== t || p !== k) && yd(b, g, d, k);
      hd = !1;
      p = b.memoizedState;
      g.state = p;
      od(b, d, g, e);
      var x = b.memoizedState;
      h !== t || p !== x || D.current || hd ? ("function" === typeof y && (sd(b, c, y, d), x = b.memoizedState), (l = hd || wd(b, c, l, d, p, x, k)) ? (n || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, x, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, x, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), d = !1);
    }
    return $e(a, b, c, d, f, e);
  }

  function $e(a, b, c, d, e, f) {
    Ye(a, b);
    var g = 0 !== (b.flags & 64);
    if (!d && !g) return e && dc(b, c, !1), Re(a, b, f);
    d = b.stateNode;
    Oe.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = Jd(b, a.child, null, f), b.child = Jd(b, null, h, f)) : S(a, b, h, f);
    b.memoizedState = d.state;
    e && dc(b, c, !0);
    return b.child;
  }

  function af(a) {
    var b = a.stateNode;
    b.pendingContext ? ac(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ac(a, b.context, !1);
    Pd(a, b.containerInfo);
  }

  var bf = {
    dehydrated: null,
    retryLane: 0
  };

  function cf(a, b, c) {
    var d = b.pendingProps,
        e = M.current,
        f = !1,
        g;
    (g = 0 !== (b.flags & 64)) || (g = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
    g ? (f = !0, b.flags &= -65) : null !== a && null === a.memoizedState || void 0 === d.fallback || !0 === d.unstable_avoidThisFallback || (e |= 1);
    A(M, e & 1);

    if (null === a) {
      void 0 !== d.fallback && $d(b);
      a = d.children;
      e = d.fallback;
      if (f) return a = df(b, a, e, c), b.child.memoizedState = {
        baseLanes: c
      }, b.memoizedState = bf, a;
      if ("number" === typeof d.unstable_expectedLoadTime) return a = df(b, a, e, c), b.child.memoizedState = {
        baseLanes: c
      }, b.memoizedState = bf, b.lanes = 33554432, a;
      c = ef({
        mode: "visible",
        children: a
      }, b.mode, c, null);
      c["return"] = b;
      return b.child = c;
    }

    if (null !== a.memoizedState) {
      if (f) return d = ff(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? {
        baseLanes: c
      } : {
        baseLanes: e.baseLanes | c
      }, f.childLanes = a.childLanes & ~c, b.memoizedState = bf, d;
      c = gf(a, b, d.children, c);
      b.memoizedState = null;
      return c;
    }

    if (f) return d = ff(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? {
      baseLanes: c
    } : {
      baseLanes: e.baseLanes | c
    }, f.childLanes = a.childLanes & ~c, b.memoizedState = bf, d;
    c = gf(a, b, d.children, c);
    b.memoizedState = null;
    return c;
  }

  function df(a, b, c, d) {
    var e = a.mode,
        f = a.child;
    b = {
      mode: "hidden",
      children: b
    };
    0 === (e & 2) && null !== f ? (f.childLanes = 0, f.pendingProps = b) : f = ef(b, e, 0, null);
    c = Id(c, e, d, null);
    f["return"] = a;
    c["return"] = a;
    f.sibling = c;
    a.child = f;
    return c;
  }

  function gf(a, b, c, d) {
    var e = a.child;
    a = e.sibling;
    c = Ed(e, {
      mode: "visible",
      children: c
    });
    0 === (b.mode & 2) && (c.lanes = d);
    c["return"] = b;
    c.sibling = null;
    null !== a && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a);
    return b.child = c;
  }

  function ff(a, b, c, d, e) {
    var f = b.mode,
        g = a.child;
    a = g.sibling;
    var h = {
      mode: "hidden",
      children: c
    };
    0 === (f & 2) && b.child !== g ? (c = b.child, c.childLanes = 0, c.pendingProps = h, g = c.lastEffect, null !== g ? (b.firstEffect = c.firstEffect, b.lastEffect = g, g.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Ed(g, h);
    null !== a ? d = Ed(a, d) : (d = Id(d, f, e, null), d.flags |= 2);
    d["return"] = b;
    c["return"] = b;
    c.sibling = d;
    b.child = c;
    return d;
  }

  function hf(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    ed(a["return"], b);
  }

  function jf(a, b, c, d, e, f) {
    var g = a.memoizedState;
    null === g ? a.memoizedState = {
      isBackwards: b,
      rendering: null,
      renderingStartTime: 0,
      last: d,
      tail: c,
      tailMode: e,
      lastEffect: f
    } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailMode = e, g.lastEffect = f);
  }

  function kf(a, b, c) {
    var d = b.pendingProps,
        e = d.revealOrder,
        f = d.tail;
    S(a, b, d.children, c);
    d = M.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 64;else {
      if (null !== a && 0 !== (a.flags & 64)) a: for (a = b.child; null !== a;) {
        if (13 === a.tag) null !== a.memoizedState && hf(a, c);else if (19 === a.tag) hf(a, c);else if (null !== a.child) {
          a.child["return"] = a;
          a = a.child;
          continue;
        }
        if (a === b) break a;

        for (; null === a.sibling;) {
          if (null === a["return"] || a["return"] === b) break a;
          a = a["return"];
        }

        a.sibling["return"] = a["return"];
        a = a.sibling;
      }
      d &= 1;
    }
    A(M, d);
    if (0 === (b.mode & 2)) b.memoizedState = null;else switch (e) {
      case "forwards":
        c = b.child;

        for (e = null; null !== c;) {
          a = c.alternate, null !== a && null === Td(a) && (e = c), c = c.sibling;
        }

        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        jf(b, !1, e, c, f, b.lastEffect);
        break;

      case "backwards":
        c = null;
        e = b.child;

        for (b.child = null; null !== e;) {
          a = e.alternate;

          if (null !== a && null === Td(a)) {
            b.child = e;
            break;
          }

          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }

        jf(b, !0, c, null, f, b.lastEffect);
        break;

      case "together":
        jf(b, !1, null, null, void 0, b.lastEffect);
        break;

      default:
        b.memoizedState = null;
    }
    return b.child;
  }

  function Re(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    pd |= b.lanes;

    if (0 !== (c & b.childLanes)) {
      if (null !== a && b.child !== a.child) throw Error(q(153));

      if (null !== b.child) {
        a = b.child;
        c = Ed(a, a.pendingProps);
        b.child = c;

        for (c["return"] = b; null !== a.sibling;) {
          a = a.sibling, c = c.sibling = Ed(a, a.pendingProps), c["return"] = b;
        }

        c.sibling = null;
      }

      return b.child;
    }

    return null;
  }

  function lf(a) {
    a.flags |= 4;
  }

  var _mf, nf, of, pf;

  if (Ta) _mf = function mf(a, b) {
    for (var c = b.child; null !== c;) {
      if (5 === c.tag || 6 === c.tag) Ja(a, c.stateNode);else if (4 !== c.tag && null !== c.child) {
        c.child["return"] = c;
        c = c.child;
        continue;
      }
      if (c === b) break;

      for (; null === c.sibling;) {
        if (null === c["return"] || c["return"] === b) return;
        c = c["return"];
      }

      c.sibling["return"] = c["return"];
      c = c.sibling;
    }
  }, nf = function nf() {}, of = function of(a, b, c, d, e) {
    a = a.memoizedProps;

    if (a !== d) {
      var f = b.stateNode,
          g = Od(L.current);
      c = La(f, c, a, d, e, g);
      (b.updateQueue = c) && lf(b);
    }
  }, pf = function pf(a, b, c, d) {
    c !== d && lf(b);
  };else if (Ua) {
    _mf = function mf(a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = Db(f, e.type, e.memoizedProps, e));
          Ja(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = Eb(f, e.memoizedProps, e)), Ja(a, f);else if (4 !== e.tag) {
          if (13 === e.tag && 0 !== (e.flags & 4) && (f = null !== e.memoizedState)) {
            var g = e.child;

            if (null !== g && (null !== g.child && (g.child["return"] = g, _mf(a, g, !0, f)), f = g.sibling, null !== f)) {
              f["return"] = e;
              e = f;
              continue;
            }
          }

          if (null !== e.child) {
            e.child["return"] = e;
            e = e.child;
            continue;
          }
        }

        if (e === b) break;

        for (; null === e.sibling;) {
          if (null === e["return"] || e["return"] === b) return;
          e = e["return"];
        }

        e.sibling["return"] = e["return"];
        e = e.sibling;
      }
    };

    var qf = function qf(a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = Db(f, e.type, e.memoizedProps, e));
          Ab(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = Eb(f, e.memoizedProps, e)), Ab(a, f);else if (4 !== e.tag) {
          if (13 === e.tag && 0 !== (e.flags & 4) && (f = null !== e.memoizedState)) {
            var g = e.child;

            if (null !== g && (null !== g.child && (g.child["return"] = g, qf(a, g, !0, f)), f = g.sibling, null !== f)) {
              f["return"] = e;
              e = f;
              continue;
            }
          }

          if (null !== e.child) {
            e.child["return"] = e;
            e = e.child;
            continue;
          }
        }

        if (e === b) break;

        for (; null === e.sibling;) {
          if (null === e["return"] || e["return"] === b) return;
          e = e["return"];
        }

        e.sibling["return"] = e["return"];
        e = e.sibling;
      }
    };

    nf = function nf(a) {
      var b = a.stateNode;

      if (null !== a.firstEffect) {
        var c = b.containerInfo,
            d = zb(c);
        qf(d, a, !1, !1);
        b.pendingChildren = d;
        lf(a);
        Bb(c, d);
      }
    };

    of = function of(a, b, c, d, e) {
      var f = a.stateNode,
          g = a.memoizedProps;
      if ((a = null === b.firstEffect) && g === d) b.stateNode = f;else {
        var h = b.stateNode,
            k = Od(L.current),
            l = null;
        g !== d && (l = La(h, c, g, d, e, k));
        a && null === l ? b.stateNode = f : (f = yb(f, l, c, g, d, b, a, h), Ka(f, c, d, e, k) && lf(b), b.stateNode = f, a ? lf(b) : _mf(f, b, !1, !1));
      }
    };

    pf = function pf(a, b, c, d) {
      c !== d ? (a = Od(Nd.current), c = Od(L.current), b.stateNode = Na(d, a, c, b), lf(b)) : b.stateNode = a.stateNode;
    };
  } else nf = function nf() {}, of = function of() {}, pf = function pf() {};

  function rf(a, b) {
    if (!Wd) switch (a.tailMode) {
      case "hidden":
        b = a.tail;

        for (var c = null; null !== b;) {
          null !== b.alternate && (c = b), b = b.sibling;
        }

        null === c ? a.tail = null : c.sibling = null;
        break;

      case "collapsed":
        c = a.tail;

        for (var d = null; null !== c;) {
          null !== c.alternate && (d = c), c = c.sibling;
        }

        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
  }

  function sf(a, b, c) {
    var d = b.pendingProps;

    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return null;

      case 1:
        return E(b.type) && $b(), null;

      case 3:
        Qd();
        z(D);
        z(B);
        ee();
        d = b.stateNode;
        d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
        if (null === a || null === a.child) be(b) ? lf(b) : d.hydrate || (b.flags |= 256);
        nf(b);
        return null;

      case 5:
        Sd(b);
        var e = Od(Nd.current);
        c = b.type;
        if (null !== a && null != b.stateNode) of(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);else {
          if (!d) {
            if (null === b.stateNode) throw Error(q(166));
            return null;
          }

          a = Od(L.current);

          if (be(b)) {
            if (!Va) throw Error(q(175));
            a = Lb(b.stateNode, b.type, b.memoizedProps, e, a, b);
            b.updateQueue = a;
            null !== a && lf(b);
          } else {
            var f = Ia(c, d, e, a, b);

            _mf(f, b, !1, !1);

            b.stateNode = f;
            Ka(f, c, d, e, a) && lf(b);
          }

          null !== b.ref && (b.flags |= 128);
        }
        return null;

      case 6:
        if (a && null != b.stateNode) pf(a, b, a.memoizedProps, d);else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(q(166));
          a = Od(Nd.current);
          e = Od(L.current);

          if (be(b)) {
            if (!Va) throw Error(q(176));
            Mb(b.stateNode, b.memoizedProps, b) && lf(b);
          } else b.stateNode = Na(d, a, e, b);
        }
        return null;

      case 13:
        z(M);
        d = b.memoizedState;
        if (0 !== (b.flags & 64)) return b.lanes = c, b;
        d = null !== d;
        e = !1;
        null === a ? void 0 !== b.memoizedProps.fallback && be(b) : e = null !== a.memoizedState;
        if (d && !e && 0 !== (b.mode & 2)) if (null === a && !0 !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (M.current & 1)) 0 === T && (T = 3);else {
          if (0 === T || 3 === T) T = 4;
          null === R || 0 === (pd & 134217727) && 0 === (tf & 134217727) || uf(R, U);
        }
        Ua && d && (b.flags |= 4);
        Ta && (d || e) && (b.flags |= 4);
        return null;

      case 4:
        return Qd(), nf(b), null === a && ab(b.stateNode.containerInfo), null;

      case 10:
        return dd(b), null;

      case 17:
        return E(b.type) && $b(), null;

      case 19:
        z(M);
        d = b.memoizedState;
        if (null === d) return null;
        e = 0 !== (b.flags & 64);
        f = d.rendering;
        if (null === f) {
          if (e) rf(d, !1);else {
            if (0 !== T || null !== a && 0 !== (a.flags & 64)) for (a = b.child; null !== a;) {
              f = Td(a);

              if (null !== f) {
                b.flags |= 64;
                rf(d, !1);
                a = f.updateQueue;
                null !== a && (b.updateQueue = a, b.flags |= 4);
                null === d.lastEffect && (b.firstEffect = null);
                b.lastEffect = d.lastEffect;
                a = c;

                for (d = b.child; null !== d;) {
                  e = d, c = a, e.flags &= 2, e.nextEffect = null, e.firstEffect = null, e.lastEffect = null, f = e.alternate, null === f ? (e.childLanes = 0, e.lanes = c, e.child = null, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = f.childLanes, e.lanes = f.lanes, e.child = f.child, e.memoizedProps = f.memoizedProps, e.memoizedState = f.memoizedState, e.updateQueue = f.updateQueue, e.type = f.type, c = f.dependencies, e.dependencies = null === c ? null : {
                    lanes: c.lanes,
                    firstContext: c.firstContext
                  }), d = d.sibling;
                }

                A(M, M.current & 1 | 2);
                return b.child;
              }

              a = a.sibling;
            }
            null !== d.tail && G() > vf && (b.flags |= 64, e = !0, rf(d, !1), b.lanes = 33554432);
          }
        } else {
          if (!e) if (a = Td(f), null !== a) {
            if (b.flags |= 64, e = !0, a = a.updateQueue, null !== a && (b.updateQueue = a, b.flags |= 4), rf(d, !0), null === d.tail && "hidden" === d.tailMode && !f.alternate && !Wd) return b = b.lastEffect = d.lastEffect, null !== b && (b.nextEffect = null), null;
          } else 2 * G() - d.renderingStartTime > vf && 1073741824 !== c && (b.flags |= 64, e = !0, rf(d, !1), b.lanes = 33554432);
          d.isBackwards ? (f.sibling = b.child, b.child = f) : (a = d.last, null !== a ? a.sibling = f : b.child = f, d.last = f);
        }
        return null !== d.tail ? (a = d.tail, d.rendering = a, d.tail = a.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = G(), a.sibling = null, b = M.current, A(M, e ? b & 1 | 2 : b & 1), a) : null;

      case 23:
      case 24:
        return wf(), null !== a && null !== a.memoizedState !== (null !== b.memoizedState) && "unstable-defer-without-hiding" !== d.mode && (b.flags |= 4), null;
    }

    throw Error(q(156, b.tag));
  }

  function xf(a) {
    switch (a.tag) {
      case 1:
        E(a.type) && $b();
        var b = a.flags;
        return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;

      case 3:
        Qd();
        z(D);
        z(B);
        ee();
        b = a.flags;
        if (0 !== (b & 64)) throw Error(q(285));
        a.flags = b & -4097 | 64;
        return a;

      case 5:
        return Sd(a), null;

      case 13:
        return z(M), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;

      case 19:
        return z(M), null;

      case 4:
        return Qd(), null;

      case 10:
        return dd(a), null;

      case 23:
      case 24:
        return wf(), null;

      default:
        return null;
    }
  }

  function yf(a, b) {
    try {
      var c = "",
          d = b;

      do {
        c += Wc(d), d = d["return"];
      } while (d);

      var e = c;
    } catch (f) {
      e = "\nError generating stack: " + f.message + "\n" + f.stack;
    }

    return {
      value: a,
      source: b,
      stack: e
    };
  }

  function zf(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function () {
        throw c;
      });
    }
  }

  var Af = "function" === typeof WeakMap ? WeakMap : Map;

  function Bf(a, b, c) {
    c = kd(-1, c);
    c.tag = 3;
    c.payload = {
      element: null
    };
    var d = b.value;

    c.callback = function () {
      Cf || (Cf = !0, Df = d);
      zf(a, b);
    };

    return c;
  }

  function Ef(a, b, c) {
    c = kd(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;

    if ("function" === typeof d) {
      var e = b.value;

      c.payload = function () {
        zf(a, b);
        return d(e);
      };
    }

    var f = a.stateNode;
    null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
      "function" !== typeof d && (null === Ff ? Ff = new Set([this]) : Ff.add(this), zf(a, b));
      var c = b.stack;
      this.componentDidCatch(b.value, {
        componentStack: null !== c ? c : ""
      });
    });
    return c;
  }

  var Gf = "function" === typeof WeakSet ? WeakSet : Set;

  function Hf(a) {
    var b = a.ref;
    if (null !== b) if ("function" === typeof b) try {
      b(null);
    } catch (c) {
      If(a, c);
    } else b.current = null;
  }

  function Jf(a, b) {
    switch (b.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        return;

      case 1:
        if (b.flags & 256 && null !== a) {
          var c = a.memoizedProps,
              d = a.memoizedState;
          a = b.stateNode;
          b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : Xc(b.type, c), d);
          a.__reactInternalSnapshotBeforeUpdate = b;
        }

        return;

      case 3:
        Ta && b.flags & 256 && xb(b.stateNode.containerInfo);
        return;

      case 5:
      case 6:
      case 4:
      case 17:
        return;
    }

    throw Error(q(163));
  }

  function Kf(a, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;

    if (null !== b) {
      var c = b = b.next;

      do {
        if ((c.tag & a) === a) {
          var d = c.destroy;
          c.destroy = void 0;
          void 0 !== d && d();
        }

        c = c.next;
      } while (c !== b);
    }
  }

  function Lf(a, b, c) {
    switch (c.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        b = c.updateQueue;
        b = null !== b ? b.lastEffect : null;

        if (null !== b) {
          a = b = b.next;

          do {
            if (3 === (a.tag & 3)) {
              var d = a.create;
              a.destroy = d();
            }

            a = a.next;
          } while (a !== b);
        }

        b = c.updateQueue;
        b = null !== b ? b.lastEffect : null;

        if (null !== b) {
          a = b = b.next;

          do {
            var e = a;
            d = e.next;
            e = e.tag;
            0 !== (e & 4) && 0 !== (e & 1) && (Mf(c, a), Nf(c, a));
            a = d;
          } while (a !== b);
        }

        return;

      case 1:
        a = c.stateNode;
        c.flags & 4 && (null === b ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : Xc(c.type, b.memoizedProps), a.componentDidUpdate(d, b.memoizedState, a.__reactInternalSnapshotBeforeUpdate)));
        b = c.updateQueue;
        null !== b && qd(c, b, a);
        return;

      case 3:
        b = c.updateQueue;

        if (null !== b) {
          a = null;
          if (null !== c.child) switch (c.child.tag) {
            case 5:
              a = Da(c.child.stateNode);
              break;

            case 1:
              a = c.child.stateNode;
          }
          qd(c, b, a);
        }

        return;

      case 5:
        a = c.stateNode;
        null === b && c.flags & 4 && mb(a, c.type, c.memoizedProps, c);
        return;

      case 6:
        return;

      case 4:
        return;

      case 12:
        return;

      case 13:
        Va && null === c.memoizedState && (c = c.alternate, null !== c && (c = c.memoizedState, null !== c && (c = c.dehydrated, null !== c && Pb(c))));
        return;

      case 19:
      case 17:
      case 20:
      case 21:
      case 23:
      case 24:
        return;
    }

    throw Error(q(163));
  }

  function Of(a, b) {
    if (Ta) for (var c = a;;) {
      if (5 === c.tag) {
        var d = c.stateNode;
        b ? tb(d) : vb(c.stateNode, c.memoizedProps);
      } else if (6 === c.tag) d = c.stateNode, b ? ub(d) : wb(d, c.memoizedProps);else if ((23 !== c.tag && 24 !== c.tag || null === c.memoizedState || c === a) && null !== c.child) {
        c.child["return"] = c;
        c = c.child;
        continue;
      }

      if (c === a) break;

      for (; null === c.sibling;) {
        if (null === c["return"] || c["return"] === a) return;
        c = c["return"];
      }

      c.sibling["return"] = c["return"];
      c = c.sibling;
    }
  }

  function Pf(a, b) {
    if (fc && "function" === typeof fc.onCommitFiberUnmount) try {
      fc.onCommitFiberUnmount(ec, b);
    } catch (f) {}

    switch (b.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        a = b.updateQueue;

        if (null !== a && (a = a.lastEffect, null !== a)) {
          var c = a = a.next;

          do {
            var d = c,
                e = d.destroy;
            d = d.tag;
            if (void 0 !== e) if (0 !== (d & 4)) Mf(b, c);else {
              d = b;

              try {
                e();
              } catch (f) {
                If(d, f);
              }
            }
            c = c.next;
          } while (c !== a);
        }

        break;

      case 1:
        Hf(b);
        a = b.stateNode;
        if ("function" === typeof a.componentWillUnmount) try {
          a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
        } catch (f) {
          If(b, f);
        }
        break;

      case 5:
        Hf(b);
        break;

      case 4:
        Ta ? Qf(a, b) : Ua && Ua && (b = b.stateNode.containerInfo, a = zb(b), Cb(b, a));
    }
  }

  function Rf(a, b) {
    for (var c = b;;) {
      if (Pf(a, c), null === c.child || Ta && 4 === c.tag) {
        if (c === b) break;

        for (; null === c.sibling;) {
          if (null === c["return"] || c["return"] === b) return;
          c = c["return"];
        }

        c.sibling["return"] = c["return"];
        c = c.sibling;
      } else c.child["return"] = c, c = c.child;
    }
  }

  function Sf(a) {
    a.alternate = null;
    a.child = null;
    a.dependencies = null;
    a.firstEffect = null;
    a.lastEffect = null;
    a.memoizedProps = null;
    a.memoizedState = null;
    a.pendingProps = null;
    a["return"] = null;
    a.updateQueue = null;
  }

  function Tf(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }

  function Uf(a) {
    if (Ta) {
      a: {
        for (var b = a["return"]; null !== b;) {
          if (Tf(b)) break a;
          b = b["return"];
        }

        throw Error(q(160));
      }

      var c = b;
      b = c.stateNode;

      switch (c.tag) {
        case 5:
          var d = !1;
          break;

        case 3:
          b = b.containerInfo;
          d = !0;
          break;

        case 4:
          b = b.containerInfo;
          d = !0;
          break;

        default:
          throw Error(q(161));
      }

      c.flags & 16 && (sb(b), c.flags &= -17);

      a: b: for (c = a;;) {
        for (; null === c.sibling;) {
          if (null === c["return"] || Tf(c["return"])) {
            c = null;
            break a;
          }

          c = c["return"];
        }

        c.sibling["return"] = c["return"];

        for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag;) {
          if (c.flags & 2) continue b;
          if (null === c.child || 4 === c.tag) continue b;else c.child["return"] = c, c = c.child;
        }

        if (!(c.flags & 2)) {
          c = c.stateNode;
          break a;
        }
      }

      d ? Vf(a, c, b) : Wf(a, c, b);
    }
  }

  function Vf(a, b, c) {
    var d = a.tag,
        e = 5 === d || 6 === d;
    if (e) a = e ? a.stateNode : a.stateNode.instance, b ? pb(c, a, b) : kb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Vf(a, b, c), a = a.sibling; null !== a;) {
      Vf(a, b, c), a = a.sibling;
    }
  }

  function Wf(a, b, c) {
    var d = a.tag,
        e = 5 === d || 6 === d;
    if (e) a = e ? a.stateNode : a.stateNode.instance, b ? ob(c, a, b) : jb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Wf(a, b, c), a = a.sibling; null !== a;) {
      Wf(a, b, c), a = a.sibling;
    }
  }

  function Qf(a, b) {
    for (var c = b, d = !1, e, f;;) {
      if (!d) {
        d = c["return"];

        a: for (;;) {
          if (null === d) throw Error(q(160));
          e = d.stateNode;

          switch (d.tag) {
            case 5:
              f = !1;
              break a;

            case 3:
              e = e.containerInfo;
              f = !0;
              break a;

            case 4:
              e = e.containerInfo;
              f = !0;
              break a;
          }

          d = d["return"];
        }

        d = !0;
      }

      if (5 === c.tag || 6 === c.tag) Rf(a, c), f ? rb(e, c.stateNode) : qb(e, c.stateNode);else if (4 === c.tag) {
        if (null !== c.child) {
          e = c.stateNode.containerInfo;
          f = !0;
          c.child["return"] = c;
          c = c.child;
          continue;
        }
      } else if (Pf(a, c), null !== c.child) {
        c.child["return"] = c;
        c = c.child;
        continue;
      }
      if (c === b) break;

      for (; null === c.sibling;) {
        if (null === c["return"] || c["return"] === b) return;
        c = c["return"];
        4 === c.tag && (d = !1);
      }

      c.sibling["return"] = c["return"];
      c = c.sibling;
    }
  }

  function Xf(a, b) {
    if (Ta) {
      switch (b.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          Kf(3, b);
          return;

        case 1:
          return;

        case 5:
          var c = b.stateNode;

          if (null != c) {
            var d = b.memoizedProps;
            a = null !== a ? a.memoizedProps : d;
            var e = b.type,
                f = b.updateQueue;
            b.updateQueue = null;
            null !== f && nb(c, f, e, a, d, b);
          }

          return;

        case 6:
          if (null === b.stateNode) throw Error(q(162));
          c = b.memoizedProps;
          lb(b.stateNode, null !== a ? a.memoizedProps : c, c);
          return;

        case 3:
          Va && (b = b.stateNode, b.hydrate && (b.hydrate = !1, Ob(b.containerInfo)));
          return;

        case 12:
          return;

        case 13:
          Yf(b);
          Zf(b);
          return;

        case 19:
          Zf(b);
          return;

        case 17:
          return;

        case 23:
        case 24:
          Of(b, null !== b.memoizedState);
          return;
      }

      throw Error(q(163));
    }

    switch (b.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        Kf(3, b);
        return;

      case 12:
        return;

      case 13:
        Yf(b);
        Zf(b);
        return;

      case 19:
        Zf(b);
        return;

      case 3:
        Va && (c = b.stateNode, c.hydrate && (c.hydrate = !1, Ob(c.containerInfo)));
        break;

      case 23:
      case 24:
        return;
    }

    a: if (Ua) {
      switch (b.tag) {
        case 1:
        case 5:
        case 6:
        case 20:
          break a;

        case 3:
        case 4:
          b = b.stateNode;
          Cb(b.containerInfo, b.pendingChildren);
          break a;
      }

      throw Error(q(163));
    }
  }

  function Yf(a) {
    null !== a.memoizedState && ($f = G(), Ta && Of(a.child, !0));
  }

  function Zf(a) {
    var b = a.updateQueue;

    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Gf());
      b.forEach(function (b) {
        var d = ag.bind(null, a, b);
        c.has(b) || (c.add(b), b.then(d, d));
      });
    }
  }

  function bg(a, b) {
    return null !== a && (a = a.memoizedState, null === a || null !== a.dehydrated) ? (b = b.memoizedState, null !== b && null === b.dehydrated) : !1;
  }

  var cg = 0,
      dg = 1,
      eg = 2,
      fg = 3,
      gg = 4;

  if ("function" === typeof Symbol && Symbol["for"]) {
    var hg = Symbol["for"];
    cg = hg("selector.component");
    dg = hg("selector.has_pseudo_class");
    eg = hg("selector.role");
    fg = hg("selector.test_id");
    gg = hg("selector.text");
  }

  function ig(a) {
    var b = Wa(a);

    if (null != b) {
      if ("string" !== typeof b.memoizedProps["data-testname"]) throw Error(q(364));
      return b;
    }

    a = cb(a);
    if (null === a) throw Error(q(362));
    return a.stateNode.current;
  }

  function jg(a, b) {
    switch (b.$$typeof) {
      case cg:
        if (a.type === b.value) return !0;
        break;

      case dg:
        a: {
          b = b.value;
          a = [a, 0];

          for (var c = 0; c < a.length;) {
            var d = a[c++],
                e = a[c++],
                f = b[e];

            if (5 !== d.tag || !fb(d)) {
              for (; null != f && jg(d, f);) {
                e++, f = b[e];
              }

              if (e === b.length) {
                b = !0;
                break a;
              } else for (d = d.child; null !== d;) {
                a.push(d, e), d = d.sibling;
              }
            }
          }

          b = !1;
        }

        return b;

      case eg:
        if (5 === a.tag && gb(a.stateNode, b.value)) return !0;
        break;

      case gg:
        if (5 === a.tag || 6 === a.tag) if (a = eb(a), null !== a && 0 <= a.indexOf(b.value)) return !0;
        break;

      case fg:
        if (5 === a.tag && (a = a.memoizedProps["data-testname"], "string" === typeof a && a.toLowerCase() === b.value.toLowerCase())) return !0;
        break;

      default:
        throw Error(q(365, b));
    }

    return !1;
  }

  function kg(a) {
    switch (a.$$typeof) {
      case cg:
        return "<" + (wa(a.value) || "Unknown") + ">";

      case dg:
        return ":has(" + (kg(a) || "") + ")";

      case eg:
        return '[role="' + a.value + '"]';

      case gg:
        return '"' + a.value + '"';

      case fg:
        return '[data-testname="' + a.value + '"]';

      default:
        throw Error(q(365, a));
    }
  }

  function lg(a, b) {
    var c = [];
    a = [a, 0];

    for (var d = 0; d < a.length;) {
      var e = a[d++],
          f = a[d++],
          g = b[f];

      if (5 !== e.tag || !fb(e)) {
        for (; null != g && jg(e, g);) {
          f++, g = b[f];
        }

        if (f === b.length) c.push(e);else for (e = e.child; null !== e;) {
          a.push(e, f), e = e.sibling;
        }
      }
    }

    return c;
  }

  function mg(a, b) {
    if (!bb) throw Error(q(363));
    a = ig(a);
    a = lg(a, b);
    b = [];
    a = Array.from(a);

    for (var c = 0; c < a.length;) {
      var d = a[c++];
      if (5 === d.tag) fb(d) || b.push(d.stateNode);else for (d = d.child; null !== d;) {
        a.push(d), d = d.sibling;
      }
    }

    return b;
  }

  var ng = null;

  function og(a) {
    if (null === ng) try {
      var b = ("require" + Math.random()).slice(0, 7);
      ng = (module && module[b]).call(module, "timers").setImmediate;
    } catch (c) {
      ng = function ng(a) {
        var b = new MessageChannel();
        b.port1.onmessage = a;
        b.port2.postMessage(void 0);
      };
    }
    return ng(a);
  }

  var pg = Math.ceil,
      qg = ca.ReactCurrentDispatcher,
      rg = ca.ReactCurrentOwner,
      sg = ca.IsSomeRendererActing,
      V = 0,
      R = null,
      W = null,
      U = 0,
      tg = 0,
      ug = Wb(0),
      T = 0,
      vg = null,
      wg = 0,
      pd = 0,
      tf = 0,
      xg = 0,
      yg = null,
      $f = 0,
      vf = Infinity;

  function zg() {
    vf = G() + 500;
  }

  var X = null,
      Cf = !1,
      Df = null,
      Ff = null,
      Ag = !1,
      Bg = null,
      Cg = 90,
      Dg = [],
      Eg = [],
      Fg = null,
      Gg = 0,
      Hg = null,
      Ig = -1,
      Jg = 0,
      Kg = 0,
      Lg = null,
      Mg = !1;

  function K() {
    return 0 !== (V & 48) ? G() : -1 !== Ig ? Ig : Ig = G();
  }

  function td(a) {
    a = a.mode;
    if (0 === (a & 2)) return 1;
    if (0 === (a & 4)) return 99 === Nc() ? 1 : 2;
    0 === Jg && (Jg = wg);

    if (0 !== Sc.transition) {
      0 !== Kg && (Kg = null !== yg ? yg.pendingLanes : 0);
      a = Jg;
      var b = 4186112 & ~Kg;
      b &= -b;
      0 === b && (a = 4186112 & ~a, b = a & -a, 0 === b && (b = 8192));
      return b;
    }

    a = Nc();
    0 !== (V & 4) && 98 === a ? a = oc(12, Jg) : (a = jc(a), a = oc(a, Jg));
    return a;
  }

  function ud(a, b, c) {
    if (50 < Gg) throw Gg = 0, Hg = null, Error(q(185));
    a = Ng(a, b);
    if (null === a) return null;
    rc(a, b, c);
    a === R && (tf |= b, 4 === T && uf(a, U));
    var d = Nc();
    1 === b ? 0 !== (V & 8) && 0 === (V & 48) ? Og(a) : (Z(a, c), 0 === V && (zg(), H())) : (0 === (V & 4) || 98 !== d && 99 !== d || (null === Fg ? Fg = new Set([a]) : Fg.add(a)), Z(a, c));
    yg = a;
  }

  function Ng(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;

    for (a = a["return"]; null !== a;) {
      a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a["return"];
    }

    return 3 === c.tag ? c.stateNode : null;
  }

  function Z(a, b) {
    for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f = a.expirationTimes, g = a.pendingLanes; 0 < g;) {
      var h = 31 - mc(g),
          k = 1 << h,
          l = f[h];

      if (-1 === l) {
        if (0 === (k & d) || 0 !== (k & e)) {
          l = b;
          ic(k);
          var n = F;
          f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5E3 : -1;
        }
      } else l <= b && (a.expiredLanes |= k);

      g &= ~k;
    }

    d = lc(a, a === R ? U : 0);
    b = F;
    if (0 === d) null !== c && (c !== Hc && xc(c), a.callbackNode = null, a.callbackPriority = 0);else {
      if (null !== c) {
        if (a.callbackPriority === b) return;
        c !== Hc && xc(c);
      }

      15 === b ? (c = Og.bind(null, a), null === Jc ? (Jc = [c], Kc = wc(Cc, Rc)) : Jc.push(c), c = Hc) : 14 === b ? c = Qc(99, Og.bind(null, a)) : (c = kc(b), c = Qc(c, Pg.bind(null, a)));
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }

  function Pg(a) {
    Ig = -1;
    Kg = Jg = 0;
    if (0 !== (V & 48)) throw Error(q(327));
    var b = a.callbackNode;
    if (Qg() && a.callbackNode !== b) return null;
    var c = lc(a, a === R ? U : 0);
    if (0 === c) return null;
    var d = c;
    var e = V;
    V |= 16;
    var f = Rg();
    if (R !== a || U !== d) zg(), Sg(a, d);

    do {
      try {
        Tg();
        break;
      } catch (h) {
        Ug(a, h);
      }
    } while (1);

    bd();
    qg.current = f;
    V = e;
    null !== W ? d = 0 : (R = null, U = 0, d = T);
    if (0 !== (wg & tf)) Sg(a, 0);else if (0 !== d) {
      2 === d && (V |= 64, a.hydrate && (a.hydrate = !1, xb(a.containerInfo)), c = nc(a), 0 !== c && (d = Vg(a, c)));
      if (1 === d) throw b = vg, Sg(a, 0), uf(a, c), Z(a, G()), b;
      a.finishedWork = a.current.alternate;
      a.finishedLanes = c;

      switch (d) {
        case 0:
        case 1:
          throw Error(q(345));

        case 2:
          Zg(a);
          break;

        case 3:
          uf(a, c);

          if ((c & 62914560) === c && (d = $f + 500 - G(), 10 < d)) {
            if (0 !== lc(a, 0)) break;
            e = a.suspendedLanes;

            if ((e & c) !== c) {
              K();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }

            a.timeoutHandle = Pa(Zg.bind(null, a), d);
            break;
          }

          Zg(a);
          break;

        case 4:
          uf(a, c);
          if ((c & 4186112) === c) break;
          d = a.eventTimes;

          for (e = -1; 0 < c;) {
            var g = 31 - mc(c);
            f = 1 << g;
            g = d[g];
            g > e && (e = g);
            c &= ~f;
          }

          c = e;
          c = G() - c;
          c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3E3 > c ? 3E3 : 4320 > c ? 4320 : 1960 * pg(c / 1960)) - c;

          if (10 < c) {
            a.timeoutHandle = Pa(Zg.bind(null, a), c);
            break;
          }

          Zg(a);
          break;

        case 5:
          Zg(a);
          break;

        default:
          throw Error(q(329));
      }
    }
    Z(a, G());
    return a.callbackNode === b ? Pg.bind(null, a) : null;
  }

  function uf(a, b) {
    b &= ~xg;
    b &= ~tf;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;

    for (a = a.expirationTimes; 0 < b;) {
      var c = 31 - mc(b),
          d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }

  function Og(a) {
    if (0 !== (V & 48)) throw Error(q(327));
    Qg();

    if (a === R && 0 !== (a.expiredLanes & U)) {
      var b = U;
      var c = Vg(a, b);
      0 !== (wg & tf) && (b = lc(a, b), c = Vg(a, b));
    } else b = lc(a, 0), c = Vg(a, b);

    0 !== a.tag && 2 === c && (V |= 64, a.hydrate && (a.hydrate = !1, xb(a.containerInfo)), b = nc(a), 0 !== b && (c = Vg(a, b)));
    if (1 === c) throw c = vg, Sg(a, 0), uf(a, b), Z(a, G()), c;
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Zg(a);
    Z(a, G());
    return null;
  }

  function $g() {
    if (null !== Fg) {
      var a = Fg;
      Fg = null;
      a.forEach(function (a) {
        a.expiredLanes |= 24 & a.pendingLanes;
        Z(a, G());
      });
    }

    H();
  }

  function ah(a, b) {
    var c = V;
    V |= 1;

    try {
      return a(b);
    } finally {
      V = c, 0 === V && (zg(), H());
    }
  }

  function bh(a, b) {
    var c = V;
    if (0 !== (c & 48)) return a(b);
    V |= 1;

    try {
      if (a) return Pc(99, a.bind(null, b));
    } finally {
      V = c, H();
    }
  }

  function Xe(a, b) {
    A(ug, tg);
    tg |= b;
    wg |= b;
  }

  function wf() {
    tg = ug.current;
    z(ug);
  }

  function Sg(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    c !== Ra && (a.timeoutHandle = Ra, Qa(c));
    if (null !== W) for (c = W["return"]; null !== c;) {
      var d = c;

      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && $b();
          break;

        case 3:
          Qd();
          z(D);
          z(B);
          ee();
          break;

        case 5:
          Sd(d);
          break;

        case 4:
          Qd();
          break;

        case 13:
          z(M);
          break;

        case 19:
          z(M);
          break;

        case 10:
          dd(d);
          break;

        case 23:
        case 24:
          wf();
      }

      c = c["return"];
    }
    R = a;
    W = Ed(a.current, null);
    U = tg = wg = b;
    T = 0;
    vg = null;
    xg = tf = pd = 0;
  }

  function Ug(a, b) {
    do {
      var c = W;

      try {
        bd();
        fe.current = pe;

        if (ie) {
          for (var d = N.memoizedState; null !== d;) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }

          ie = !1;
        }

        he = 0;
        P = O = N = null;
        je = !1;
        rg.current = null;

        if (null === c || null === c["return"]) {
          T = 1;
          vg = b;
          W = null;
          break;
        }

        a: {
          var f = a,
              g = c["return"],
              h = c,
              k = b;
          b = U;
          h.flags |= 2048;
          h.firstEffect = h.lastEffect = null;

          if (null !== k && "object" === typeof k && "function" === typeof k.then) {
            var l = k;

            if (0 === (h.mode & 2)) {
              var n = h.alternate;
              n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
            }

            var t = 0 !== (M.current & 1),
                p = g;

            do {
              var y;

              if (y = 13 === p.tag) {
                var x = p.memoizedState;
                if (null !== x) y = null !== x.dehydrated ? !0 : !1;else {
                  var Y = p.memoizedProps;
                  y = void 0 === Y.fallback ? !1 : !0 !== Y.unstable_avoidThisFallback ? !0 : t ? !1 : !0;
                }
              }

              if (y) {
                var u = p.updateQueue;

                if (null === u) {
                  var v = new Set();
                  v.add(l);
                  p.updateQueue = v;
                } else u.add(l);

                if (0 === (p.mode & 2)) {
                  p.flags |= 64;
                  h.flags |= 16384;
                  h.flags &= -2981;
                  if (1 === h.tag) if (null === h.alternate) h.tag = 17;else {
                    var C = kd(-1, 1);
                    C.tag = 2;
                    md(h, C);
                  }
                  h.lanes |= 1;
                  break a;
                }

                k = void 0;
                h = b;
                var Oa = f.pingCache;
                null === Oa ? (Oa = f.pingCache = new Af(), k = new Set(), Oa.set(l, k)) : (k = Oa.get(l), void 0 === k && (k = new Set(), Oa.set(l, k)));

                if (!k.has(h)) {
                  k.add(h);
                  var Qe = ch.bind(null, f, l, h);
                  l.then(Qe, Qe);
                }

                p.flags |= 4096;
                p.lanes = b;
                break a;
              }

              p = p["return"];
            } while (null !== p);

            k = Error((wa(h.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
          }

          5 !== T && (T = 2);
          k = yf(k, h);
          p = g;

          do {
            switch (p.tag) {
              case 3:
                f = k;
                p.flags |= 4096;
                b &= -b;
                p.lanes |= b;
                var Wg = Bf(p, f, b);
                nd(p, Wg);
                break a;

              case 1:
                f = k;
                var Xg = p.type,
                    ld = p.stateNode;

                if (0 === (p.flags & 64) && ("function" === typeof Xg.getDerivedStateFromError || null !== ld && "function" === typeof ld.componentDidCatch && (null === Ff || !Ff.has(ld)))) {
                  p.flags |= 4096;
                  b &= -b;
                  p.lanes |= b;
                  var Yg = Ef(p, f, b);
                  nd(p, Yg);
                  break a;
                }

            }

            p = p["return"];
          } while (null !== p);
        }

        dh(c);
      } catch (w) {
        b = w;
        W === c && null !== c && (W = c = c["return"]);
        continue;
      }

      break;
    } while (1);
  }

  function Rg() {
    var a = qg.current;
    qg.current = pe;
    return null === a ? pe : a;
  }

  function Vg(a, b) {
    var c = V;
    V |= 16;
    var d = Rg();
    R === a && U === b || Sg(a, b);

    do {
      try {
        eh();
        break;
      } catch (e) {
        Ug(a, e);
      }
    } while (1);

    bd();
    V = c;
    qg.current = d;
    if (null !== W) throw Error(q(261));
    R = null;
    U = 0;
    return T;
  }

  function eh() {
    for (; null !== W;) {
      fh(W);
    }
  }

  function Tg() {
    for (; null !== W && !yc();) {
      fh(W);
    }
  }

  function fh(a) {
    var b = gh(a.alternate, a, tg);
    a.memoizedProps = a.pendingProps;
    null === b ? dh(a) : W = b;
    rg.current = null;
  }

  function dh(a) {
    var b = a;

    do {
      var c = b.alternate;
      a = b["return"];

      if (0 === (b.flags & 2048)) {
        c = sf(c, b, tg);

        if (null !== c) {
          W = c;
          return;
        }

        c = b;

        if (24 !== c.tag && 23 !== c.tag || null === c.memoizedState || 0 !== (tg & 1073741824) || 0 === (c.mode & 4)) {
          for (var d = 0, e = c.child; null !== e;) {
            d |= e.lanes | e.childLanes, e = e.sibling;
          }

          c.childLanes = d;
        }

        null !== a && 0 === (a.flags & 2048) && (null === a.firstEffect && (a.firstEffect = b.firstEffect), null !== b.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (null !== a.lastEffect ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
      } else {
        c = xf(b);

        if (null !== c) {
          c.flags &= 2047;
          W = c;
          return;
        }

        null !== a && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
      }

      b = b.sibling;

      if (null !== b) {
        W = b;
        return;
      }

      W = b = a;
    } while (null !== b);

    0 === T && (T = 5);
  }

  function Zg(a) {
    var b = Nc();
    Pc(99, hh.bind(null, a, b));
    return null;
  }

  function hh(a, b) {
    do {
      Qg();
    } while (null !== Bg);

    if (0 !== (V & 48)) throw Error(q(327));
    var c = a.finishedWork;
    if (null === c) return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current) throw Error(q(177));
    a.callbackNode = null;
    var d = c.lanes | c.childLanes,
        e = d,
        f = a.pendingLanes & ~e;
    a.pendingLanes = e;
    a.suspendedLanes = 0;
    a.pingedLanes = 0;
    a.expiredLanes &= e;
    a.mutableReadLanes &= e;
    a.entangledLanes &= e;
    e = a.entanglements;

    for (var g = a.eventTimes, h = a.expirationTimes; 0 < f;) {
      var k = 31 - mc(f),
          l = 1 << k;
      e[k] = 0;
      g[k] = -1;
      h[k] = -1;
      f &= ~l;
    }

    null !== Fg && 0 === (d & 24) && Fg.has(a) && Fg["delete"](a);
    a === R && (W = R = null, U = 0);
    1 < c.flags ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;

    if (null !== d) {
      e = V;
      V |= 32;
      rg.current = null;
      Lg = Ga(a.containerInfo);
      Mg = !1;
      X = d;

      do {
        try {
          ih();
        } catch (v) {
          if (null === X) throw Error(q(330));
          If(X, v);
          X = X.nextEffect;
        }
      } while (null !== X);

      Lg = null;
      X = d;

      do {
        try {
          for (g = a; null !== X;) {
            var n = X.flags;
            n & 16 && Ta && sb(X.stateNode);

            if (n & 128) {
              var t = X.alternate;

              if (null !== t) {
                var p = t.ref;
                null !== p && ("function" === typeof p ? p(null) : p.current = null);
              }
            }

            switch (n & 1038) {
              case 2:
                Uf(X);
                X.flags &= -3;
                break;

              case 6:
                Uf(X);
                X.flags &= -3;
                Xf(X.alternate, X);
                break;

              case 1024:
                X.flags &= -1025;
                break;

              case 1028:
                X.flags &= -1025;
                Xf(X.alternate, X);
                break;

              case 4:
                Xf(X.alternate, X);
                break;

              case 8:
                h = g;
                f = X;
                Ta ? Qf(h, f) : Rf(h, f);
                var y = f.alternate;
                Sf(f);
                null !== y && Sf(y);
            }

            X = X.nextEffect;
          }
        } catch (v) {
          if (null === X) throw Error(q(330));
          If(X, v);
          X = X.nextEffect;
        }
      } while (null !== X);

      Mg && $a();
      Ha(a.containerInfo);
      a.current = c;
      X = d;

      do {
        try {
          for (n = a; null !== X;) {
            var x = X.flags;
            x & 36 && Lf(n, X.alternate, X);

            if (x & 128) {
              t = void 0;
              var Y = X.ref;

              if (null !== Y) {
                var u = X.stateNode;

                switch (X.tag) {
                  case 5:
                    t = Da(u);
                    break;

                  default:
                    t = u;
                }

                "function" === typeof Y ? Y(t) : Y.current = t;
              }
            }

            X = X.nextEffect;
          }
        } catch (v) {
          if (null === X) throw Error(q(330));
          If(X, v);
          X = X.nextEffect;
        }
      } while (null !== X);

      X = null;
      Ic();
      V = e;
    } else a.current = c;

    if (Ag) Ag = !1, Bg = a, Cg = b;else for (X = d; null !== X;) {
      b = X.nextEffect, X.nextEffect = null, X.flags & 8 && (x = X, x.sibling = null, x.stateNode = null), X = b;
    }
    d = a.pendingLanes;
    0 === d && (Ff = null);
    1 === d ? a === Hg ? Gg++ : (Gg = 0, Hg = a) : Gg = 0;
    c = c.stateNode;
    if (fc && "function" === typeof fc.onCommitFiberRoot) try {
      fc.onCommitFiberRoot(ec, c, void 0, 64 === (c.current.flags & 64));
    } catch (v) {}
    Z(a, G());
    if (Cf) throw Cf = !1, a = Df, Df = null, a;
    if (0 !== (V & 8)) return null;
    H();
    return null;
  }

  function ih() {
    for (; null !== X;) {
      var a = X.alternate;
      Mg || null === Lg || (0 !== (X.flags & 8) ? Ca(X, Lg) && (Mg = !0, Za()) : 13 === X.tag && bg(a, X) && Ca(X, Lg) && (Mg = !0, Za()));
      var b = X.flags;
      0 !== (b & 256) && Jf(a, X);
      0 === (b & 512) || Ag || (Ag = !0, Qc(97, function () {
        Qg();
        return null;
      }));
      X = X.nextEffect;
    }
  }

  function Qg() {
    if (90 !== Cg) {
      var a = 97 < Cg ? 97 : Cg;
      Cg = 90;
      return Pc(a, jh);
    }

    return !1;
  }

  function Nf(a, b) {
    Dg.push(b, a);
    Ag || (Ag = !0, Qc(97, function () {
      Qg();
      return null;
    }));
  }

  function Mf(a, b) {
    Eg.push(b, a);
    Ag || (Ag = !0, Qc(97, function () {
      Qg();
      return null;
    }));
  }

  function jh() {
    if (null === Bg) return !1;
    var a = Bg;
    Bg = null;
    if (0 !== (V & 48)) throw Error(q(331));
    var b = V;
    V |= 32;
    var c = Eg;
    Eg = [];

    for (var d = 0; d < c.length; d += 2) {
      var e = c[d],
          f = c[d + 1],
          g = e.destroy;
      e.destroy = void 0;
      if ("function" === typeof g) try {
        g();
      } catch (k) {
        if (null === f) throw Error(q(330));
        If(f, k);
      }
    }

    c = Dg;
    Dg = [];

    for (d = 0; d < c.length; d += 2) {
      e = c[d];
      f = c[d + 1];

      try {
        var h = e.create;
        e.destroy = h();
      } catch (k) {
        if (null === f) throw Error(q(330));
        If(f, k);
      }
    }

    for (h = a.current.firstEffect; null !== h;) {
      a = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a;
    }

    V = b;
    H();
    return !0;
  }

  function kh(a, b, c) {
    b = yf(c, b);
    b = Bf(a, b, 1);
    md(a, b);
    b = K();
    a = Ng(a, 1);
    null !== a && (rc(a, 1, b), Z(a, b));
  }

  function If(a, b) {
    if (3 === a.tag) kh(a, a, b);else for (var c = a["return"]; null !== c;) {
      if (3 === c.tag) {
        kh(c, a, b);
        break;
      } else if (1 === c.tag) {
        var d = c.stateNode;

        if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ff || !Ff.has(d))) {
          a = yf(b, a);
          var e = Ef(c, a, 1);
          md(c, e);
          e = K();
          c = Ng(c, 1);
          if (null !== c) rc(c, 1, e), Z(c, e);else if ("function" === typeof d.componentDidCatch && (null === Ff || !Ff.has(d))) try {
            d.componentDidCatch(b, a);
          } catch (f) {}
          break;
        }
      }

      c = c["return"];
    }
  }

  function ch(a, b, c) {
    var d = a.pingCache;
    null !== d && d["delete"](b);
    b = K();
    a.pingedLanes |= a.suspendedLanes & c;
    R === a && (U & c) === c && (4 === T || 3 === T && (U & 62914560) === U && 500 > G() - $f ? Sg(a, 0) : xg |= c);
    Z(a, b);
  }

  function ag(a, b) {
    var c = a.stateNode;
    null !== c && c["delete"](b);
    b = 0;
    0 === b && (b = a.mode, 0 === (b & 2) ? b = 1 : 0 === (b & 4) ? b = 99 === Nc() ? 1 : 2 : (0 === Jg && (Jg = wg), b = pc(62914560 & ~Jg), 0 === b && (b = 4194304)));
    c = K();
    a = Ng(a, b);
    null !== a && (rc(a, b, c), Z(a, c));
  }

  var gh;

  gh = function gh(a, b, c) {
    var d = b.lanes;
    if (null !== a) {
      if (a.memoizedProps !== b.pendingProps || D.current) gd = !0;else if (0 !== (c & d)) gd = 0 !== (a.flags & 16384) ? !0 : !1;else {
        gd = !1;

        switch (b.tag) {
          case 3:
            af(b);
            ce();
            break;

          case 5:
            Rd(b);
            break;

          case 1:
            E(b.type) && cc(b);
            break;

          case 4:
            Pd(b, b.stateNode.containerInfo);
            break;

          case 10:
            cd(b, b.memoizedProps.value);
            break;

          case 13:
            if (null !== b.memoizedState) {
              if (0 !== (c & b.child.childLanes)) return cf(a, b, c);
              A(M, M.current & 1);
              b = Re(a, b, c);
              return null !== b ? b.sibling : null;
            }

            A(M, M.current & 1);
            break;

          case 19:
            d = 0 !== (c & b.childLanes);

            if (0 !== (a.flags & 64)) {
              if (d) return kf(a, b, c);
              b.flags |= 64;
            }

            var e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            A(M, M.current);
            if (d) break;else return null;

          case 23:
          case 24:
            return b.lanes = 0, We(a, b, c);
        }

        return Re(a, b, c);
      }
    } else gd = !1;
    b.lanes = 0;

    switch (b.tag) {
      case 2:
        d = b.type;
        null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
        a = b.pendingProps;
        e = Zb(b, B.current);
        fd(b, c);
        e = le(null, b, d, a, e, c);
        b.flags |= 1;

        if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
          b.tag = 1;
          b.memoizedState = null;
          b.updateQueue = null;

          if (E(d)) {
            var f = !0;
            cc(b);
          } else f = !1;

          b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
          id(b);
          var g = d.getDerivedStateFromProps;
          "function" === typeof g && sd(b, d, g, a);
          e.updater = vd;
          b.stateNode = e;
          e._reactInternals = b;
          zd(b, d, a, c);
          b = $e(null, b, d, !0, f, c);
        } else b.tag = 0, S(null, b, e, c), b = b.child;

        return b;

      case 16:
        e = b.elementType;

        a: {
          null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
          a = b.pendingProps;
          f = e._init;
          e = f(e._payload);
          b.type = e;
          f = b.tag = lh(e);
          a = Xc(e, a);

          switch (f) {
            case 0:
              b = Ve(null, b, e, a, c);
              break a;

            case 1:
              b = Ze(null, b, e, a, c);
              break a;

            case 11:
              b = Pe(null, b, e, a, c);
              break a;

            case 14:
              b = Se(null, b, e, Xc(e.type, a), d, c);
              break a;
          }

          throw Error(q(306, e, ""));
        }

        return b;

      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Xc(d, e), Ve(a, b, d, e, c);

      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Xc(d, e), Ze(a, b, d, e, c);

      case 3:
        af(b);
        d = b.updateQueue;
        if (null === a || null === d) throw Error(q(282));
        d = b.pendingProps;
        e = b.memoizedState;
        e = null !== e ? e.element : null;
        jd(a, b);
        od(b, d, null, c);
        d = b.memoizedState.element;
        if (d === e) ce(), b = Re(a, b, c);else {
          e = b.stateNode;
          if (f = e.hydrate) Va ? (Vd = Kb(b.stateNode.containerInfo), Ud = b, f = Wd = !0) : f = !1;

          if (f) {
            if (Va && (a = e.mutableSourceEagerHydrationData, null != a)) for (e = 0; e < a.length; e += 2) {
              f = a[e], g = a[e + 1], Sa ? f._workInProgressVersionPrimary = g : f._workInProgressVersionSecondary = g, de.push(f);
            }
            c = Kd(b, null, d, c);

            for (b.child = c; c;) {
              c.flags = c.flags & -3 | 1024, c = c.sibling;
            }
          } else S(a, b, d, c), ce();

          b = b.child;
        }
        return b;

      case 5:
        return Rd(b), null === a && $d(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ma(d, e) ? g = null : null !== f && Ma(d, f) && (b.flags |= 16), Ye(a, b), S(a, b, g, c), b.child;

      case 6:
        return null === a && $d(b), null;

      case 13:
        return cf(a, b, c);

      case 4:
        return Pd(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Jd(b, null, d, c) : S(a, b, d, c), b.child;

      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Xc(d, e), Pe(a, b, d, e, c);

      case 7:
        return S(a, b, b.pendingProps, c), b.child;

      case 8:
        return S(a, b, b.pendingProps.children, c), b.child;

      case 12:
        return S(a, b, b.pendingProps.children, c), b.child;

      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          g = b.memoizedProps;
          f = e.value;
          cd(b, f);

          if (null !== g) {
            var h = g.value;
            f = I(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0;

            if (0 === f) {
              if (g.children === e.children && !D.current) {
                b = Re(a, b, c);
                break a;
              }
            } else for (h = b.child, null !== h && (h["return"] = b); null !== h;) {
              var k = h.dependencies;

              if (null !== k) {
                g = h.child;

                for (var l = k.firstContext; null !== l;) {
                  if (l.context === d && 0 !== (l.observedBits & f)) {
                    1 === h.tag && (l = kd(-1, c & -c), l.tag = 2, md(h, l));
                    h.lanes |= c;
                    l = h.alternate;
                    null !== l && (l.lanes |= c);
                    ed(h["return"], c);
                    k.lanes |= c;
                    break;
                  }

                  l = l.next;
                }
              } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;

              if (null !== g) g["return"] = h;else for (g = h; null !== g;) {
                if (g === b) {
                  g = null;
                  break;
                }

                h = g.sibling;

                if (null !== h) {
                  h["return"] = g["return"];
                  g = h;
                  break;
                }

                g = g["return"];
              }
              h = g;
            }
          }

          S(a, b, e.children, c);
          b = b.child;
        }

        return b;

      case 9:
        return e = b.type, f = b.pendingProps, d = f.children, fd(b, c), e = J(e, f.unstable_observedBits), d = d(e), b.flags |= 1, S(a, b, d, c), b.child;

      case 14:
        return e = b.type, f = Xc(e, b.pendingProps), f = Xc(e.type, f), Se(a, b, e, f, d, c);

      case 15:
        return Ue(a, b, b.type, b.pendingProps, d, c);

      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Xc(d, e), null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, E(d) ? (a = !0, cc(b)) : a = !1, fd(b, c), xd(b, d, e), zd(b, d, e, c), $e(null, b, d, !0, a, c);

      case 19:
        return kf(a, b, c);

      case 23:
        return We(a, b, c);

      case 24:
        return We(a, b, c);
    }

    throw Error(q(156, b.tag));
  };

  var mh = {
    current: !1
  },
      nh = m.unstable_flushAllWithoutAsserting,
      oh = "function" === typeof nh;

  function ph() {
    if (void 0 !== nh) return nh();

    for (var a = !1; Qg();) {
      a = !0;
    }

    return a;
  }

  function qh(a) {
    try {
      ph(), og(function () {
        ph() ? qh(a) : a();
      });
    } catch (b) {
      a(b);
    }
  }

  var rh = 0,
      sh = !1;

  function th(a, b, c, d) {
    this.tag = a;
    this.key = c;
    this.sibling = this.child = this["return"] = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.flags = 0;
    this.lastEffect = this.firstEffect = this.nextEffect = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }

  function Yd(a, b, c, d) {
    return new th(a, b, c, d);
  }

  function Te(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }

  function lh(a) {
    if ("function" === typeof a) return Te(a) ? 1 : 0;

    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === la) return 11;
      if (a === oa) return 14;
    }

    return 2;
  }

  function Ed(a, b) {
    var c = a.alternate;
    null === c ? (c = Yd(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
    c.childLanes = a.childLanes;
    c.lanes = a.lanes;
    c.child = a.child;
    c.memoizedProps = a.memoizedProps;
    c.memoizedState = a.memoizedState;
    c.updateQueue = a.updateQueue;
    b = a.dependencies;
    c.dependencies = null === b ? null : {
      lanes: b.lanes,
      firstContext: b.firstContext
    };
    c.sibling = a.sibling;
    c.index = a.index;
    c.ref = a.ref;
    return c;
  }

  function Gd(a, b, c, d, e, f) {
    var g = 2;
    d = a;
    if ("function" === typeof a) Te(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
      case fa:
        return Id(c.children, e, f, b);

      case ra:
        g = 8;
        e |= 16;
        break;

      case ha:
        g = 8;
        e |= 1;
        break;

      case ia:
        return a = Yd(12, c, b, e | 8), a.elementType = ia, a.type = ia, a.lanes = f, a;

      case ma:
        return a = Yd(13, c, b, e), a.type = ma, a.elementType = ma, a.lanes = f, a;

      case na:
        return a = Yd(19, c, b, e), a.elementType = na, a.lanes = f, a;

      case sa:
        return ef(c, e, f, b);

      case ta:
        return a = Yd(24, c, b, e), a.elementType = ta, a.lanes = f, a;

      default:
        if ("object" === typeof a && null !== a) switch (a.$$typeof) {
          case ja:
            g = 10;
            break a;

          case ka:
            g = 9;
            break a;

          case la:
            g = 11;
            break a;

          case oa:
            g = 14;
            break a;

          case pa:
            g = 16;
            d = null;
            break a;

          case qa:
            g = 22;
            break a;
        }
        throw Error(q(130, null == a ? a : typeof a, ""));
    }
    b = Yd(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f;
    return b;
  }

  function Id(a, b, c, d) {
    a = Yd(7, a, d, b);
    a.lanes = c;
    return a;
  }

  function ef(a, b, c, d) {
    a = Yd(23, a, d, b);
    a.elementType = sa;
    a.lanes = c;
    return a;
  }

  function Fd(a, b, c) {
    a = Yd(6, a, null, b);
    a.lanes = c;
    return a;
  }

  function Hd(a, b, c) {
    b = Yd(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = {
      containerInfo: a.containerInfo,
      pendingChildren: null,
      implementation: a.implementation
    };
    return b;
  }

  function uh(a, b, c) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = Ra;
    this.pendingContext = this.context = null;
    this.hydrate = c;
    this.callbackNode = null;
    this.callbackPriority = 0;
    this.eventTimes = qc(0);
    this.expirationTimes = qc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = qc(0);
    Va && (this.mutableSourceEagerHydrationData = null);
  }

  function vh(a) {
    var b = a._reactInternals;

    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(q(188));
      throw Error(q(268, Object.keys(a)));
    }

    a = Aa(b);
    return null === a ? null : a.stateNode;
  }

  function wh(a, b) {
    a = a.memoizedState;

    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }

  function xh(a, b) {
    wh(a, b);
    (a = a.alternate) && wh(a, b);
  }

  function yh(a) {
    a = Aa(a);
    return null === a ? null : a.stateNode;
  }

  function zh() {
    return null;
  }

  exports.IsThisRendererActing = mh;

  exports.act = function (a) {
    function b() {
      rh--;
      sg.current = c;
      mh.current = d;
    }

    !1 === sh && (sh = !0, console.error("act(...) is not supported in production builds of React, and might not behave as expected."));
    rh++;
    var c = sg.current,
        d = mh.current;
    sg.current = !0;
    mh.current = !0;

    try {
      var e = ah(a);
    } catch (f) {
      throw b(), f;
    }

    if (null !== e && "object" === typeof e && "function" === typeof e.then) return {
      then: function then(a, d) {
        e.then(function () {
          1 < rh || !0 === oh && !0 === c ? (b(), a()) : qh(function (c) {
            b();
            c ? d(c) : a();
          });
        }, function (a) {
          b();
          d(a);
        });
      }
    };

    try {
      1 !== rh || !1 !== oh && !1 !== c || ph(), b();
    } catch (f) {
      throw b(), f;
    }

    return {
      then: function then(a) {
        a();
      }
    };
  };

  exports.attemptContinuousHydration = function (a) {
    if (13 === a.tag) {
      var b = K();
      ud(a, 67108864, b);
      xh(a, 67108864);
    }
  };

  exports.attemptHydrationAtCurrentPriority = function (a) {
    if (13 === a.tag) {
      var b = K(),
          c = td(a);
      ud(a, c, b);
      xh(a, c);
    }
  };

  exports.attemptSynchronousHydration = function (a) {
    switch (a.tag) {
      case 3:
        var b = a.stateNode;

        if (b.hydrate) {
          var c = ic(b.pendingLanes);
          b.expiredLanes |= c & b.pendingLanes;
          Z(b, G());
          0 === (V & 48) && (zg(), H());
        }

        break;

      case 13:
        var d = K();
        bh(function () {
          return ud(a, 1, d);
        });
        xh(a, 4);
    }
  };

  exports.attemptUserBlockingHydration = function (a) {
    if (13 === a.tag) {
      var b = K();
      ud(a, 4, b);
      xh(a, 4);
    }
  };

  exports.batchedEventUpdates = function (a, b) {
    var c = V;
    V |= 2;

    try {
      return a(b);
    } finally {
      V = c, 0 === V && (zg(), H());
    }
  };

  exports.batchedUpdates = ah;

  exports.createComponentSelector = function (a) {
    return {
      $$typeof: cg,
      value: a
    };
  };

  exports.createContainer = function (a, b, c) {
    a = new uh(a, b, c);
    b = Yd(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
    a.current = b;
    b.stateNode = a;
    id(b);
    return a;
  };

  exports.createHasPsuedoClassSelector = function (a) {
    return {
      $$typeof: dg,
      value: a
    };
  };

  exports.createPortal = function (a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: ea,
      key: null == d ? null : "" + d,
      children: a,
      containerInfo: b,
      implementation: c
    };
  };

  exports.createRoleSelector = function (a) {
    return {
      $$typeof: eg,
      value: a
    };
  };

  exports.createTestNameSelector = function (a) {
    return {
      $$typeof: fg,
      value: a
    };
  };

  exports.createTextSelector = function (a) {
    return {
      $$typeof: gg,
      value: a
    };
  };

  exports.deferredUpdates = function (a) {
    return Pc(97, a);
  };

  exports.discreteUpdates = function (a, b, c, d, e) {
    var f = V;
    V |= 4;

    try {
      return Pc(98, a.bind(null, b, c, d, e));
    } finally {
      V = f, 0 === V && (zg(), H());
    }
  };

  exports.findAllNodes = mg;

  exports.findBoundingRects = function (a, b) {
    if (!bb) throw Error(q(363));
    b = mg(a, b);
    a = [];

    for (var c = 0; c < b.length; c++) {
      a.push(db(b[c]));
    }

    for (b = a.length - 1; 0 < b; b--) {
      c = a[b];

      for (var d = c.x, e = d + c.width, f = c.y, g = f + c.height, h = b - 1; 0 <= h; h--) {
        if (b !== h) {
          var k = a[h],
              l = k.x,
              n = l + k.width,
              t = k.y,
              p = t + k.height;

          if (d >= l && f >= t && e <= n && g <= p) {
            a.splice(b, 1);
            break;
          } else if (!(d !== l || c.width !== k.width || p < f || t > g)) {
            t > f && (k.height += t - f, k.y = f);
            p < g && (k.height = g - t);
            a.splice(b, 1);
            break;
          } else if (!(f !== t || c.height !== k.height || n < d || l > e)) {
            l > d && (k.width += l - d, k.x = d);
            n < e && (k.width = e - l);
            a.splice(b, 1);
            break;
          }
        }
      }
    }

    return a;
  };

  exports.findHostInstance = vh;

  exports.findHostInstanceWithNoPortals = function (a) {
    a = Ba(a);
    return null === a ? null : 20 === a.tag ? a.stateNode.instance : a.stateNode;
  };

  exports.findHostInstanceWithWarning = function (a) {
    return vh(a);
  };

  exports.flushControlled = function (a) {
    var b = V;
    V |= 1;

    try {
      Pc(99, a);
    } finally {
      V = b, 0 === V && (zg(), H());
    }
  };

  exports.flushDiscreteUpdates = function () {
    0 === (V & 49) && ($g(), Qg());
  };

  exports.flushPassiveEffects = Qg;
  exports.flushSync = bh;

  exports.focusWithin = function (a, b) {
    if (!bb) throw Error(q(363));
    a = ig(a);
    b = lg(a, b);
    b = Array.from(b);

    for (a = 0; a < b.length;) {
      var c = b[a++];

      if (!fb(c)) {
        if (5 === c.tag && hb(c.stateNode)) return !0;

        for (c = c.child; null !== c;) {
          b.push(c), c = c.sibling;
        }
      }
    }

    return !1;
  };

  exports.getCurrentUpdateLanePriority = function () {
    return hc;
  };

  exports.getFindAllNodesFailureDescription = function (a, b) {
    if (!bb) throw Error(q(363));
    var c = 0,
        d = [];
    a = [ig(a), 0];

    for (var e = 0; e < a.length;) {
      var f = a[e++],
          g = a[e++],
          h = b[g];
      if (5 !== f.tag || !fb(f)) if (jg(f, h) && (d.push(kg(h)), g++, g > c && (c = g)), g < b.length) for (f = f.child; null !== f;) {
        a.push(f, g), f = f.sibling;
      }
    }

    if (c < b.length) {
      for (a = []; c < b.length; c++) {
        a.push(kg(b[c]));
      }

      return "findAllNodes was able to match part of the selector:\n  " + (d.join(" > ") + "\n\nNo matching component was found for:\n  ") + a.join(" > ");
    }

    return null;
  };

  exports.getPublicRootInstance = function (a) {
    a = a.current;
    if (!a.child) return null;

    switch (a.child.tag) {
      case 5:
        return Da(a.child.stateNode);

      default:
        return a.child.stateNode;
    }
  };

  exports.injectIntoDevTools = function (a) {
    a = {
      bundleType: a.bundleType,
      version: a.version,
      rendererPackageName: a.rendererPackageName,
      rendererConfig: a.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: ca.ReactCurrentDispatcher,
      findHostInstanceByFiber: yh,
      findFiberByHostInstance: a.findFiberByHostInstance || zh,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null
    };
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) a = !1;else {
      var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!b.isDisabled && b.supportsFiber) try {
        ec = b.inject(a), fc = b;
      } catch (c) {}
      a = !0;
    }
    return a;
  };

  exports.observeVisibleRects = function (a, b, c, d) {
    if (!bb) throw Error(q(363));
    a = mg(a, b);
    var e = ib(a, c, d).disconnect;
    return {
      disconnect: function disconnect() {
        e();
      }
    };
  };

  exports.registerMutableSourceForHydration = function (a, b) {
    var c = b._getVersion;
    c = c(b._source);
    null == a.mutableSourceEagerHydrationData ? a.mutableSourceEagerHydrationData = [b, c] : a.mutableSourceEagerHydrationData.push(b, c);
  };

  exports.runWithPriority = function (a, b) {
    var c = hc;

    try {
      return hc = a, b();
    } finally {
      hc = c;
    }
  };

  exports.shouldSuspend = function () {
    return !1;
  };

  exports.unbatchedUpdates = function (a, b) {
    var c = V;
    V &= -2;
    V |= 8;

    try {
      return a(b);
    } finally {
      V = c, 0 === V && (zg(), H());
    }
  };

  exports.updateContainer = function (a, b, c, d) {
    var e = b.current,
        f = K(),
        g = td(e);

    a: if (c) {
      c = c._reactInternals;

      b: {
        if (xa(c) !== c || 1 !== c.tag) throw Error(q(170));
        var h = c;

        do {
          switch (h.tag) {
            case 3:
              h = h.stateNode.context;
              break b;

            case 1:
              if (E(h.type)) {
                h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                break b;
              }

          }

          h = h["return"];
        } while (null !== h);

        throw Error(q(171));
      }

      if (1 === c.tag) {
        var k = c.type;

        if (E(k)) {
          c = bc(c, k, h);
          break a;
        }
      }

      c = h;
    } else c = Xb;

    null === b.context ? b.context = c : b.pendingContext = c;
    b = kd(f, g);
    b.payload = {
      element: a
    };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    md(e, b);
    ud(e, g, f);
    return g;
  };

  return exports;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(15)(module)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(18);
} else {}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.20.1
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var _f, g, h, k;

if ("object" === typeof performance && "function" === typeof performance.now) {
  var l = performance;

  exports.unstable_now = function () {
    return l.now();
  };
} else {
  var p = Date,
      q = p.now();

  exports.unstable_now = function () {
    return p.now() - q;
  };
}

if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var t = null,
      u = null,
      w = function w() {
    if (null !== t) try {
      var a = exports.unstable_now();
      t(!0, a);
      t = null;
    } catch (b) {
      throw setTimeout(w, 0), b;
    }
  };

  _f = function f(a) {
    null !== t ? setTimeout(_f, 0, a) : (t = a, setTimeout(w, 0));
  };

  g = function g(a, b) {
    u = setTimeout(a, b);
  };

  h = function h() {
    clearTimeout(u);
  };

  exports.unstable_shouldYield = function () {
    return !1;
  };

  k = exports.unstable_forceFrameRate = function () {};
} else {
  var x = window.setTimeout,
      y = window.clearTimeout;

  if ("undefined" !== typeof console) {
    var z = window.cancelAnimationFrame;
    "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    "function" !== typeof z && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
  }

  var A = !1,
      B = null,
      C = -1,
      D = 5,
      E = 0;

  exports.unstable_shouldYield = function () {
    return exports.unstable_now() >= E;
  };

  k = function k() {};

  exports.unstable_forceFrameRate = function (a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a ? Math.floor(1E3 / a) : 5;
  };

  var F = new MessageChannel(),
      G = F.port2;

  F.port1.onmessage = function () {
    if (null !== B) {
      var a = exports.unstable_now();
      E = a + D;

      try {
        B(!0, a) ? G.postMessage(null) : (A = !1, B = null);
      } catch (b) {
        throw G.postMessage(null), b;
      }
    } else A = !1;
  };

  _f = function _f(a) {
    B = a;
    A || (A = !0, G.postMessage(null));
  };

  g = function g(a, b) {
    C = x(function () {
      a(exports.unstable_now());
    }, b);
  };

  h = function h() {
    y(C);
    C = -1;
  };
}

function H(a, b) {
  var c = a.length;
  a.push(b);

  a: for (;;) {
    var d = c - 1 >>> 1,
        e = a[d];
    if (void 0 !== e && 0 < I(e, b)) a[d] = b, a[c] = e, c = d;else break a;
  }
}

function J(a) {
  a = a[0];
  return void 0 === a ? null : a;
}

function K(a) {
  var b = a[0];

  if (void 0 !== b) {
    var c = a.pop();

    if (c !== b) {
      a[0] = c;

      a: for (var d = 0, e = a.length; d < e;) {
        var m = 2 * (d + 1) - 1,
            n = a[m],
            v = m + 1,
            r = a[v];
        if (void 0 !== n && 0 > I(n, c)) void 0 !== r && 0 > I(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);else if (void 0 !== r && 0 > I(r, c)) a[d] = r, a[v] = c, d = v;else break a;
      }
    }

    return b;
  }

  return null;
}

function I(a, b) {
  var c = a.sortIndex - b.sortIndex;
  return 0 !== c ? c : a.id - b.id;
}

var L = [],
    M = [],
    N = 1,
    O = null,
    P = 3,
    Q = !1,
    R = !1,
    S = !1;

function T(a) {
  for (var b = J(M); null !== b;) {
    if (null === b.callback) K(M);else if (b.startTime <= a) K(M), b.sortIndex = b.expirationTime, H(L, b);else break;
    b = J(M);
  }
}

function U(a) {
  S = !1;
  T(a);
  if (!R) if (null !== J(L)) R = !0, _f(V);else {
    var b = J(M);
    null !== b && g(U, b.startTime - a);
  }
}

function V(a, b) {
  R = !1;
  S && (S = !1, h());
  Q = !0;
  var c = P;

  try {
    T(b);

    for (O = J(L); null !== O && (!(O.expirationTime > b) || a && !exports.unstable_shouldYield());) {
      var d = O.callback;

      if ("function" === typeof d) {
        O.callback = null;
        P = O.priorityLevel;
        var e = d(O.expirationTime <= b);
        b = exports.unstable_now();
        "function" === typeof e ? O.callback = e : O === J(L) && K(L);
        T(b);
      } else K(L);

      O = J(L);
    }

    if (null !== O) var m = !0;else {
      var n = J(M);
      null !== n && g(U, n.startTime - b);
      m = !1;
    }
    return m;
  } finally {
    O = null, P = c, Q = !1;
  }
}

var W = k;
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;

exports.unstable_cancelCallback = function (a) {
  a.callback = null;
};

exports.unstable_continueExecution = function () {
  R || Q || (R = !0, _f(V));
};

exports.unstable_getCurrentPriorityLevel = function () {
  return P;
};

exports.unstable_getFirstCallbackNode = function () {
  return J(L);
};

exports.unstable_next = function (a) {
  switch (P) {
    case 1:
    case 2:
    case 3:
      var b = 3;
      break;

    default:
      b = P;
  }

  var c = P;
  P = b;

  try {
    return a();
  } finally {
    P = c;
  }
};

exports.unstable_pauseExecution = function () {};

exports.unstable_requestPaint = W;

exports.unstable_runWithPriority = function (a, b) {
  switch (a) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;

    default:
      a = 3;
  }

  var c = P;
  P = a;

  try {
    return b();
  } finally {
    P = c;
  }
};

exports.unstable_scheduleCallback = function (a, b, c) {
  var d = exports.unstable_now();
  "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;

  switch (a) {
    case 1:
      var e = -1;
      break;

    case 2:
      e = 250;
      break;

    case 5:
      e = 1073741823;
      break;

    case 4:
      e = 1E4;
      break;

    default:
      e = 5E3;
  }

  e = c + e;
  a = {
    id: N++,
    callback: b,
    priorityLevel: a,
    startTime: c,
    expirationTime: e,
    sortIndex: -1
  };
  c > d ? (a.sortIndex = c, H(M, a), null === J(L) && a === J(M) && (S ? h() : S = !0, g(U, c - d))) : (a.sortIndex = e, H(L, a), R || Q || (R = !0, _f(V)));
  return a;
};

exports.unstable_wrapCallback = function (a) {
  var b = P;
  return function () {
    var c = P;
    P = b;

    try {
      return a.apply(this, arguments);
    } finally {
      P = c;
    }
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : undefined);

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper.js



function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);

// EXTERNAL MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/node_modules/react-reconciler/index.js
var react_reconciler = __webpack_require__(9);

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/renderer/diffing.js
var deepDiffProps = {
  style: 1,
  layout: 1,
  stateStyles: 2
};
function diffProperties(lastRawProps, nextRawProps, deepDiffing) {
  if (deepDiffing === void 0) {
    deepDiffing = 0;
  }

  if (lastRawProps == nextRawProps) return null;
  var updatePayload = null;
  var lastProps = lastRawProps;
  var nextProps = nextRawProps;
  var propKey;

  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
      continue;
    }

    var prop = null;
    var depth = deepDiffing > 0 ? deepDiffing : deepDiffProps[propKey] || 0;

    if (depth > 0) {
      prop = diffProperties(lastProps[propKey], null, depth - 1);
      if (!prop) continue;
    } // For all other deleted properties we add it to the queue. We use
    // the whitelist in the commit phase instead.


    (updatePayload = updatePayload || []).push(propKey, prop);
  }

  for (propKey in nextProps) {
    var nextProp = nextProps[propKey];
    var lastProp = lastProps != null ? lastProps[propKey] : undefined;

    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
      continue;
    }

    var prop = nextProp;
    var depth = deepDiffing > 0 ? deepDiffing : deepDiffProps[propKey] || 0;

    if (depth > 0) {
      prop = diffProperties(lastProp, nextProp, depth - 1);
      if (!prop) continue;
    }

    (updatePayload = updatePayload || []).push(propKey, prop);
  }

  return updatePayload;
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/renderer/renderer.js


var renderer_hostContext = {};
var childContext = {};

function applyDiffedUpdate(writeTo, updatePayload, depth) {
  if (depth === void 0) {
    depth = 0;
  }

  if (!updatePayload) return false;

  if (Array.isArray(updatePayload)) {
    for (var index = 0; index < updatePayload.length; index += 2) {
      var attr = updatePayload[index];
      var value = updatePayload[index + 1];
      if (depth > 0) applyDiffedUpdate(writeTo[attr], value, depth - 1);else writeTo[attr] = value != null ? value + '' : null;
    }

    return updatePayload.length > 0;
  } else {
    for (var attr in updatePayload) {
      if (Object.prototype.hasOwnProperty.call(updatePayload, attr)) {
        var value = updatePayload[attr];
        writeTo[attr] = value != null ? value + '' : null;
      }
    }

    return true;
  }
}

function applyUpdate(instance, updatePayload, isAfterMount) {
  var updateAfterMount = false;

  for (var index = 0; index < updatePayload.length; index += 2) {
    var attr = updatePayload[index];
    var value = updatePayload[index + 1];
    if (attr === 'children') continue;
    if (attr === 'key') continue;
    if (attr === 'ref') continue;

    if (attr === 'layout') {
      if (applyDiffedUpdate(instance.Inline, value)) {
        instance.ResolveStyle();
        instance.ScheduleLayout();
        instance.ApplyLayoutStyles();
      }

      continue;
    }

    if (!isAfterMount && (attr === 'style' || attr === 'stateStyles')) {
      updateAfterMount = true;
      continue;
    }

    if (attr === 'stateStyles') {
      // TODO:
      // if (applyDiffedUpdate(instance.StateStyles, value, 1)) {
      //   instance.ResolveStyle();
      // }
      continue;
    }

    if (attr === 'style') {
      if (applyDiffedUpdate(instance.Inline, value)) {
        instance.ResolveStyle();
      }

      continue;
    }

    if (typeof attr !== 'string') {
      throw new Error('Component attributes must be string.');
    }

    if (attr.substring(0, 2) === 'on') {
      Unity.setEventListener(instance, attr, Callback(value));
    } else {
      Unity.setProperty(instance, attr, value);
    }
  }

  return updateAfterMount;
}

var hostConfig = {
  getRootHostContext: function getRootHostContext(rootContainerInstance) {
    return renderer_hostContext;
  },
  getChildHostContext: function getChildHostContext(parentHostContext, type, rootContainerInstance) {
    return childContext;
  },
  getPublicInstance: function getPublicInstance(instance) {
    return instance;
  },
  prepareForCommit: function prepareForCommit(containerInfo) {
    return null;
  },
  resetAfterCommit: function resetAfterCommit(containerInfo) {
    return null;
  },
  clearContainer: function clearContainer() {
    return null;
  },
  now: Date.now,
  supportsHydration: false,
  supportsPersistence: false,
  isPrimaryRenderer: true,
  createInstance: function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    var _a;

    if (type === 'text') {
      var text = props.children === true ? '' : Array.isArray(props.children) ? props.children.join('') : ((_a = props.children) === null || _a === void 0 ? void 0 : _a.toString()) || '';
      return Unity.createElement(type, text, rootContainerInstance);
    }

    return Unity.createElement(type, null, rootContainerInstance);
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return Unity.createText(text, rootContainerInstance);
  },
  appendInitialChild: Unity.appendChild,
  finalizeInitialChildren: function finalizeInitialChildren(instance, type, props, rootContainerInstance, hostContext) {
    var propsToUpdate = [];
    var keys = Object.keys(props);

    for (var index = 0; index < keys.length; index++) {
      var key = keys[index];
      var value = props[key];
      propsToUpdate.push(key, value);
    }

    return applyUpdate(instance, propsToUpdate, false);
  },
  // Some attributes like style need to be changed only after mount
  commitMount: function commitMount(instance, type, newProps, internalInstanceHandle) {
    var props = [];
    if ('style' in newProps) props.push('style', newProps.style);
    if ('stateStyles' in newProps) props.push('stateStyles', diffProperties({}, newProps.stateStyles, 1));
    applyUpdate(instance, props, true);
  },
  shouldSetTextContent: function shouldSetTextContent(type, props) {
    return type === 'text';
  },
  shouldDeprioritizeSubtree: function shouldDeprioritizeSubtree(type, props) {
    return false;
  },
  // -------------------
  //     Mutation
  // -------------------
  supportsMutation: true,
  prepareUpdate: function prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, hostContext) {
    return diffProperties(oldProps, newProps);
  },
  commitUpdate: function commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    applyUpdate(instance, updatePayload, true);
  },
  resetTextContent: function resetTextContent(instance) {
    console.log('resetTextContent');
  },
  commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
    Unity.setText(textInstance, newText);
  },
  appendChild: Unity.appendChild,
  appendChildToContainer: Unity.appendChildToContainer,
  insertBefore: Unity.insertBefore,
  insertInContainerBefore: Unity.insertBefore,
  removeChild: Unity.removeChild,
  removeChildFromContainer: Unity.removeChild,
  // -------------------
  //     Scheduling
  // -------------------
  scheduleDeferredCallback: function scheduleDeferredCallback(callback, options) {
    return UnityScheduler.setTimeout(callback, (options === null || options === void 0 ? void 0 : options.timeout) || 0);
  },
  cancelDeferredCallback: function cancelDeferredCallback(callBackID) {
    UnityScheduler.clearTimeout(callBackID);
  },
  noTimeout: -1,
  setTimeout: function setTimeout(callback, timeout) {
    return UnityScheduler.setTimeout(callback, timeout);
  },
  clearTimeout: function clearTimeout(handle) {
    UnityScheduler.clearTimeout(handle);
  }
};
var ReactUnityReconciler = react_reconciler(hostConfig);
var hostRoot;
var ReactUnity = {
  render: function render(element, hostContainer, callback) {
    if (!hostContainer) hostContainer = RootContainer;

    if (!hostRoot) {
      hostRoot = ReactUnityReconciler.createContainer(hostContainer, false, false);
    }

    return ReactUnityReconciler.updateContainer(element, hostRoot, null, callback);
  }
};
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/animation/animation.js
function startAnimation(options) {
  var onStart = options.onStart;
  var loop = options.loop;
  var loopMode = options.loopMode;
  var loopCount = 0;
  var normal = true;
  var intervalTime = options.interval == null ? 20 : options.interval || 0;
  var currentDefer;

  var start = function start() {
    if (onStart) {
      options.onStart();
      onStart = null;
    }

    var startTime = Date.now();
    var t = 0;
    loopCount++;
    var from = options.from || 0;
    var to = options.to;
    if (to == null) to = 1;
    var easing = options.easing;
    var interval = currentDefer = setInterval(function () {
      var timeDiff = Date.now() - startTime;
      t = Math.min(timeDiff / options.duration, 1);
      var e = easing ? easing(t) : t;
      if (!normal) e = 1 - e;
      options.onTick(e * (to - from));

      if (t >= 1) {
        clearInterval(interval);
        currentDefer = null;

        if (loop == true || loopCount < loop) {
          if (loopMode === 'ping-pong') normal = !normal;
          start();
        } else {
          options.onEnd && options.onEnd();
        }
      }
    }, intervalTime);
  };

  if (options.delay != null) currentDefer = setTimeout(start, options.delay);else start();
  return function () {
    return currentDefer && clearInterval(currentDefer);
  };
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/animation/easing.js
// https://gist.github.com/gre/1650294
var easing = {
  // no easing, no acceleration
  linear: function linear(t) {
    return t;
  },
  // accelerating from zero velocity
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },
  // decelerating to zero velocity
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function easeInOutQuad(t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },
  // decelerating to zero velocity
  easeOutCubic: function easeOutCubic(t) {
    return --t * t * t + 1;
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function easeInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function easeInOutQuart(t) {
    return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  // accelerating from zero velocity
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function easeInOutQuint(t) {
    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/components/dropdown/dropdown-item.js
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();



var DropdownItem =
/** @class */
function (_super) {
  __extends(DropdownItem, _super);

  function DropdownItem(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    return _this;
  }

  DropdownItem.prototype.render = function () {
    return this.props.children;
  };

  return DropdownItem;
}(react["Component"]);


// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/components/components.js
var ImageFitMode;

(function (ImageFitMode) {
  ImageFitMode[ImageFitMode["Center"] = 0] = "Center";
  ImageFitMode[ImageFitMode["CenterCrop"] = 1] = "CenterCrop";
  ImageFitMode[ImageFitMode["CenterInside"] = 2] = "CenterInside";
  ImageFitMode[ImageFitMode["FitCenter"] = 3] = "FitCenter";
  ImageFitMode[ImageFitMode["FitStart"] = 4] = "FitStart";
  ImageFitMode[ImageFitMode["FitEnd"] = 5] = "FitEnd";
  ImageFitMode[ImageFitMode["Fill"] = 6] = "Fill";
})(ImageFitMode || (ImageFitMode = {}));
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/components/events.js
var InputButton;

(function (InputButton) {
  InputButton[InputButton["Left"] = 0] = "Left";
  InputButton[InputButton["Right"] = 1] = "Right";
  InputButton[InputButton["Middle"] = 2] = "Middle";
})(InputButton || (InputButton = {}));

var FramePressState;

(function (FramePressState) {
  FramePressState[FramePressState["Pressed"] = 0] = "Pressed";
  FramePressState[FramePressState["Released"] = 1] = "Released";
  FramePressState[FramePressState["PressedAndReleased"] = 2] = "PressedAndReleased";
  FramePressState[FramePressState["NotChanged"] = 3] = "NotChanged";
})(FramePressState || (FramePressState = {}));

var MoveDirection;

(function (MoveDirection) {
  MoveDirection[MoveDirection["Left"] = 0] = "Left";
  MoveDirection[MoveDirection["Up"] = 1] = "Up";
  MoveDirection[MoveDirection["Right"] = 2] = "Right";
  MoveDirection[MoveDirection["Down"] = 3] = "Down";
  MoveDirection[MoveDirection["None"] = 4] = "None";
})(MoveDirection || (MoveDirection = {}));
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/components/input.js
var TouchScreenKeyboardType;

(function (TouchScreenKeyboardType) {
  TouchScreenKeyboardType[TouchScreenKeyboardType["Default"] = 0] = "Default";
  TouchScreenKeyboardType[TouchScreenKeyboardType["ASCIICapable"] = 1] = "ASCIICapable";
  TouchScreenKeyboardType[TouchScreenKeyboardType["NumbersAndPunctuation"] = 2] = "NumbersAndPunctuation";
  TouchScreenKeyboardType[TouchScreenKeyboardType["URL"] = 3] = "URL";
  TouchScreenKeyboardType[TouchScreenKeyboardType["NumberPad"] = 4] = "NumberPad";
  TouchScreenKeyboardType[TouchScreenKeyboardType["PhonePad"] = 5] = "PhonePad";
  TouchScreenKeyboardType[TouchScreenKeyboardType["NamePhonePad"] = 6] = "NamePhonePad";
  TouchScreenKeyboardType[TouchScreenKeyboardType["EmailAddress"] = 7] = "EmailAddress";
  TouchScreenKeyboardType[TouchScreenKeyboardType["NintendoNetworkAccount"] = 8] = "NintendoNetworkAccount";
  TouchScreenKeyboardType[TouchScreenKeyboardType["Social"] = 9] = "Social";
  TouchScreenKeyboardType[TouchScreenKeyboardType["Search"] = 10] = "Search";
  TouchScreenKeyboardType[TouchScreenKeyboardType["DecimalPad"] = 11] = "DecimalPad";
})(TouchScreenKeyboardType || (TouchScreenKeyboardType = {}));

var ContentType;

(function (ContentType) {
  ContentType[ContentType["Standard"] = 0] = "Standard";
  ContentType[ContentType["Autocorrected"] = 1] = "Autocorrected";
  ContentType[ContentType["IntegerNumber"] = 2] = "IntegerNumber";
  ContentType[ContentType["DecimalNumber"] = 3] = "DecimalNumber";
  ContentType[ContentType["Alphanumeric"] = 4] = "Alphanumeric";
  ContentType[ContentType["Name"] = 5] = "Name";
  ContentType[ContentType["EmailAddress"] = 6] = "EmailAddress";
  ContentType[ContentType["Password"] = 7] = "Password";
  ContentType[ContentType["Pin"] = 8] = "Pin";
  ContentType[ContentType["Custom"] = 9] = "Custom";
})(ContentType || (ContentType = {}));

var CharacterValidation;

(function (CharacterValidation) {
  CharacterValidation[CharacterValidation["None"] = 0] = "None";
  CharacterValidation[CharacterValidation["Digit"] = 1] = "Digit";
  CharacterValidation[CharacterValidation["Integer"] = 2] = "Integer";
  CharacterValidation[CharacterValidation["Decimal"] = 3] = "Decimal";
  CharacterValidation[CharacterValidation["Alphanumeric"] = 4] = "Alphanumeric";
  CharacterValidation[CharacterValidation["Name"] = 5] = "Name";
  CharacterValidation[CharacterValidation["Regex"] = 6] = "Regex";
  CharacterValidation[CharacterValidation["EmailAddress"] = 7] = "EmailAddress";
  CharacterValidation[CharacterValidation["CustomValidator"] = 8] = "CustomValidator";
})(CharacterValidation || (CharacterValidation = {}));

var LineType;

(function (LineType) {
  LineType[LineType["SingleLine"] = 0] = "SingleLine";
  LineType[LineType["MultiLineSubmit"] = 1] = "MultiLineSubmit";
  LineType[LineType["MultiLineNewline"] = 2] = "MultiLineNewline";
})(LineType || (LineType = {}));
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/components/styles.js

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/components/styles-enums.js
var FontWeight;

(function (FontWeight) {
  FontWeight[FontWeight["Thin"] = 100] = "Thin";
  FontWeight[FontWeight["ExtraLight"] = 200] = "ExtraLight";
  FontWeight[FontWeight["Light"] = 300] = "Light";
  FontWeight[FontWeight["Regular"] = 400] = "Regular";
  FontWeight[FontWeight["Medium"] = 500] = "Medium";
  FontWeight[FontWeight["SemiBold"] = 600] = "SemiBold";
  FontWeight[FontWeight["Bold"] = 700] = "Bold";
  FontWeight[FontWeight["Heavy"] = 800] = "Heavy";
  FontWeight[FontWeight["Black"] = 900] = "Black";
})(FontWeight || (FontWeight = {}));

var FontStyles;

(function (FontStyles) {
  FontStyles[FontStyles["Normal"] = 0] = "Normal";
  FontStyles[FontStyles["Bold"] = 1] = "Bold";
  FontStyles[FontStyles["Italic"] = 2] = "Italic";
  FontStyles[FontStyles["Underline"] = 4] = "Underline";
  FontStyles[FontStyles["LowerCase"] = 8] = "LowerCase";
  FontStyles[FontStyles["UpperCase"] = 16] = "UpperCase";
  FontStyles[FontStyles["SmallCaps"] = 32] = "SmallCaps";
  FontStyles[FontStyles["Strikethrough"] = 64] = "Strikethrough";
  FontStyles[FontStyles["Superscript"] = 128] = "Superscript";
  FontStyles[FontStyles["Subscript"] = 256] = "Subscript";
  FontStyles[FontStyles["Highlight"] = 512] = "Highlight";
})(FontStyles || (FontStyles = {}));

var TextOverflowModes;

(function (TextOverflowModes) {
  TextOverflowModes[TextOverflowModes["Overflow"] = 0] = "Overflow";
  TextOverflowModes[TextOverflowModes["Ellipsis"] = 1] = "Ellipsis"; // Masking = 2,

  TextOverflowModes[TextOverflowModes["Truncate"] = 3] = "Truncate"; // ScrollRect = 4,
  // Page = 5,

  /** @experimental */

  TextOverflowModes[TextOverflowModes["Linked"] = 6] = "Linked";
})(TextOverflowModes || (TextOverflowModes = {}));

var InteractionType;

(function (InteractionType) {
  InteractionType[InteractionType["WhenVisible"] = 0] = "WhenVisible";
  InteractionType[InteractionType["Always"] = 1] = "Always";
  InteractionType[InteractionType["Ignore"] = 2] = "Ignore";
  InteractionType[InteractionType["Block"] = 3] = "Block";
})(InteractionType || (InteractionType = {}));

var CursorType;

(function (CursorType) {
  CursorType["Auto"] = "auto";
  CursorType["Default"] = "default";
  CursorType["None"] = "none";
  CursorType["ContextMenu"] = "context-menu";
  CursorType["Help"] = "help";
  CursorType["Pointer"] = "pointer";
  CursorType["Progress"] = "progress";
  CursorType["Wait"] = "wait";
  CursorType["Cell"] = "cell";
  CursorType["Crosshair"] = "crosshair";
  CursorType["Text"] = "text";
  CursorType["VerticalText"] = "vertical-text";
  CursorType["Alias"] = "alias";
  CursorType["Copy"] = "copy";
  CursorType["Move"] = "move";
  CursorType["NoDrop"] = "no-drop";
  CursorType["NotAllowed"] = "not-allowed";
  CursorType["EResize"] = "e-resize";
  CursorType["NResize"] = "n-resize";
  CursorType["NeResize"] = "ne-resize";
  CursorType["NwResize"] = "nw-resize";
  CursorType["SResize"] = "s-resize";
  CursorType["SeResize"] = "se-resize";
  CursorType["SwResize"] = "sw-resize";
  CursorType["WResize"] = "w-resize";
  CursorType["EwResize"] = "ew-resize";
  CursorType["NsResize"] = "ns-resize";
  CursorType["NeswResize"] = "nesw-resize";
  CursorType["NwseResize"] = "nwse-resize";
  CursorType["ColResize"] = "col-resize";
  CursorType["RowResize"] = "row-resize";
  CursorType["AllScroll"] = "all-scroll";
  CursorType["ZoomIn"] = "zoom-in";
  CursorType["ZoomOut"] = "zoom-out";
  CursorType["Grab"] = "grab";
  CursorType["Grabbing"] = "grabbing";
})(CursorType || (CursorType = {}));
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/components/yoga.js

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/components/yoga-enums.js
var FlexDirection;

(function (FlexDirection) {
  FlexDirection[FlexDirection["Column"] = 0] = "Column";
  FlexDirection[FlexDirection["ColumnReverse"] = 1] = "ColumnReverse";
  FlexDirection[FlexDirection["Row"] = 2] = "Row";
  FlexDirection[FlexDirection["RowReverse"] = 3] = "RowReverse";
})(FlexDirection || (FlexDirection = {}));

var YogaAlign;

(function (YogaAlign) {
  YogaAlign[YogaAlign["Auto"] = 0] = "Auto";
  YogaAlign[YogaAlign["FlexStart"] = 1] = "FlexStart";
  YogaAlign[YogaAlign["Center"] = 2] = "Center";
  YogaAlign[YogaAlign["FlexEnd"] = 3] = "FlexEnd";
  YogaAlign[YogaAlign["Stretch"] = 4] = "Stretch";
  YogaAlign[YogaAlign["Baseline"] = 5] = "Baseline";
  YogaAlign[YogaAlign["SpaceBetween"] = 6] = "SpaceBetween";
  YogaAlign[YogaAlign["SpaceAround"] = 7] = "SpaceAround";
})(YogaAlign || (YogaAlign = {}));

var YogaJustify;

(function (YogaJustify) {
  YogaJustify[YogaJustify["FlexStart"] = 0] = "FlexStart";
  YogaJustify[YogaJustify["Center"] = 1] = "Center";
  YogaJustify[YogaJustify["FlexEnd"] = 2] = "FlexEnd";
  YogaJustify[YogaJustify["SpaceBetween"] = 3] = "SpaceBetween";
  YogaJustify[YogaJustify["SpaceAround"] = 4] = "SpaceAround";
})(YogaJustify || (YogaJustify = {}));

var Display;

(function (Display) {
  Display[Display["Flex"] = 0] = "Flex";
  Display[Display["None"] = 1] = "None";
})(Display || (Display = {}));

var Wrap;

(function (Wrap) {
  Wrap[Wrap["NoWrap"] = 0] = "NoWrap";
  Wrap[Wrap["Wrap"] = 1] = "Wrap";
  Wrap[Wrap["WrapReverse"] = 2] = "WrapReverse";
})(Wrap || (Wrap = {}));

var PositionType;

(function (PositionType) {
  PositionType[PositionType["Relative"] = 0] = "Relative";
  PositionType[PositionType["Absolute"] = 1] = "Absolute";
})(PositionType || (PositionType = {}));

var Overflow;

(function (Overflow) {
  Overflow[Overflow["Visible"] = 0] = "Visible";
  Overflow[Overflow["Hidden"] = 1] = "Hidden";
  Overflow[Overflow["Scroll"] = 2] = "Scroll";
})(Overflow || (Overflow = {}));

var Direction;

(function (Direction) {
  Direction[Direction["Inherit"] = 0] = "Inherit";
  Direction[Direction["LTR"] = 1] = "LTR";
  Direction[Direction["RTL"] = 2] = "RTL";
})(Direction || (Direction = {}));
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/components/index.js







// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/helpers/common-layouts.js

var transparentColor = new Color(0, 0, 0, 0);
var fullScreen = {
  PositionType: PositionType.Absolute,
  Top: YogaValue.Point(-5000),
  Right: YogaValue.Point(-5000),
  Bottom: YogaValue.Point(-5000),
  Left: YogaValue.Point(-5000)
};
var fullCover = {
  PositionType: PositionType.Absolute,
  Top: YogaValue.Point(0),
  Right: YogaValue.Point(0),
  Bottom: YogaValue.Point(0),
  Left: YogaValue.Point(0)
};
var dropdownBottom = {
  PositionType: PositionType.Absolute,
  Top: YogaValue.Percent(100),
  Left: YogaValue.Point(0),
  MinWidth: YogaValue.Percent(100)
};
var dropdownTop = {
  PositionType: PositionType.Absolute,
  Bottom: YogaValue.Percent(100),
  Left: YogaValue.Point(0),
  MinWidth: YogaValue.Percent(100)
};
var bottomEdge = {
  PositionType: PositionType.Absolute,
  Left: YogaValue.Point(0),
  Right: YogaValue.Point(0),
  Bottom: YogaValue.Point(0),
  Height: YogaValue.Point(0)
};
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/components/dropdown/dropdown.js
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





var dropdownMenuStyle = {
  boxShadow: '0 3 7 6 black 5'
};
var dropdownButtonStyle = {
  backgroundColor: Color.white,
  borderRadius: 0
};
var dropdownBackdropStyle = {
  backgroundColor: transparentColor,
  cursor: CursorType.Default
};
function Dropdown(_a) {
  var _b;

  var _c = _a.autoClose,
      autoClose = _c === void 0 ? true : _c,
      onChange = _a.onChange,
      name = _a.name,
      layout = _a.layout,
      children = _a.children,
      otherProps = __rest(_a, ["autoClose", "onChange", "name", "layout", "children"]);

  var childrenArray = react["Children"].toArray(children);
  var nonItems = childrenArray.filter(function (x) {
    return (x === null || x === void 0 ? void 0 : x.type) !== DropdownItem;
  });
  var items = childrenArray.filter(function (x) {
    return (x === null || x === void 0 ? void 0 : x.type) === DropdownItem;
  });

  var _d = react["useState"](false),
      opened = _d[0],
      setOpened = _d[1];

  var _e = react["useState"](-1),
      selectedIndex = _e[0],
      setSelectedIndex = _e[1];

  var selectedItem = items[selectedIndex];

  var toggle = function toggle() {
    return setOpened(function (st) {
      return !st;
    });
  };

  var close = function close() {
    return setOpened(false);
  };

  var handleChildClick = function handleChildClick(ind, value) {
    onChange === null || onChange === void 0 ? void 0 : onChange(value, ind);
    if (autoClose) close();
    setSelectedIndex(ind);
  };

  return react["createElement"]("view", {
    name: name || '<Dropdown>'
  }, react["createElement"]("button", __assign({
    name: "<Dropdown Trigger>",
    onClick: toggle,
    layout: __assign({
      FlexDirection: 'Column',
      AlignItems: 'Stretch'
    }, layout)
  }, otherProps), selectedIndex < 0 ? nonItems : ((_b = selectedItem.props) === null || _b === void 0 ? void 0 : _b.triggerTemplate) || selectedItem, opened && react["createElement"]("view", {
    layout: bottomEdge,
    style: {
      zOrder: 1000
    }
  }, react["createElement"]("button", {
    name: "<Dropdown Backdrop>",
    onClick: close,
    layout: fullScreen,
    style: dropdownBackdropStyle
  }), react["createElement"]("view", {
    name: "<Dropdown Menu>",
    layout: dropdownBottom,
    style: dropdownMenuStyle
  }, items.map(function (x, i) {
    return react["createElement"]("button", {
      key: i,
      style: dropdownButtonStyle,
      onClick: function onClick() {
        return handleChildClick(i, x.props.value);
      }
    }, x);
  })))));
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/components/dropdown/index.js


// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/components/radio/radio.js
var radio_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var radio_assign = undefined && undefined.__assign || function () {
  radio_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return radio_assign.apply(this, arguments);
};

var radio_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};



var radio_Radio =
/** @class */
function (_super) {
  radio_extends(Radio, _super);

  function Radio() {
    return _super !== null && _super.apply(this, arguments) || this;
  } // static contextType: React.ContextType<RadioContext>;


  Radio.prototype.render = function () {
    var _this = this;

    var _a = this.context.radioGroup,
        selectedValue = _a.selectedValue,
        onChange = _a.onChange;
    var optional = {};

    if (selectedValue !== undefined) {
      optional.checked = this.props.value === selectedValue;
    }

    if (typeof onChange === 'function') {
      optional.onChange = onChange.bind(null, this.props.value);
    }

    return react["createElement"]("button", {
      name: "[Radio]",
      onClick: function onClick() {
        return optional.onChange(_this.props.value);
      }
    });
  };

  return Radio;
}(react["Component"]);



var radio_RadioGroup =
/** @class */
function (_super) {
  radio_extends(RadioGroup, _super);

  function RadioGroup() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  RadioGroup.prototype.getChildContext = function () {
    var _a = this.props,
        selectedValue = _a.selectedValue,
        onChange = _a.onChange;
    return {
      radioGroup: {
        selectedValue: selectedValue,
        onChange: onChange
      }
    };
  };

  RadioGroup.prototype.render = function () {
    var _a = this.props,
        name = _a.name,
        selectedValue = _a.selectedValue,
        onChange = _a.onChange,
        children = _a.children,
        rest = radio_rest(_a, ["name", "selectedValue", "onChange", "children"]);

    return react["createElement"]("view", radio_assign({
      name: name || '<RadioGroup>'
    }, rest), children);
  };

  return RadioGroup;
}(react["Component"]);


// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/components/tooltip/tooltip.js
var tooltip_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var tooltip_assign = undefined && undefined.__assign || function () {
  tooltip_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return tooltip_assign.apply(this, arguments);
};

var tooltip_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};




var tooltip_Tooltip =
/** @class */
function (_super) {
  tooltip_extends(Tooltip, _super);

  function Tooltip(props) {
    var _this = _super.call(this, props) || this;

    _this.toggle = function () {
      return _this.setState(function (st) {
        return {
          opened: !st.opened
        };
      });
    };

    _this.open = function () {
      return _this.setState({
        opened: true
      });
    };

    _this.close = function () {
      return _this.setState({
        opened: false
      });
    };

    _this.state = {
      opened: false
    };
    return _this;
  }

  Tooltip.prototype.render = function () {
    var _a, _b;

    var _c = this.props,
        tooltipContent = _c.tooltipContent,
        position = _c.position,
        offset = _c.offset,
        otherProps = tooltip_rest(_c, ["tooltipContent", "position", "offset"]);

    var containerProp = Tooltip.containerPositionProp[position];
    var childProp = Tooltip.childPositionProp[position];
    return react["createElement"]("view", tooltip_assign({}, otherProps, {
      onPointerEnter: this.open,
      onPointerExit: this.close
    }), this.props.children, this.state.opened && tooltipContent && react["createElement"]("view", {
      layout: (_a = {
        PositionType: PositionType.Absolute
      }, _a[containerProp] = Tooltip.yogaZeroPercent, _a)
    }, react["createElement"]("view", {
      name: "<Tooltip>",
      layout: (_b = {
        PositionType: PositionType.Absolute
      }, _b[childProp] = offset, _b),
      style: {
        zOrder: 1003
      }
    }, tooltipContent)));
  };

  Tooltip.defaultProps = {
    position: 'bottom',
    offset: 10
  };
  Tooltip.containerPositionProp = {
    top: 'Top',
    bottom: 'Bottom',
    left: 'Left',
    right: 'Right'
  };
  Tooltip.childPositionProp = {
    top: 'Bottom',
    bottom: 'Top',
    left: 'Right',
    right: 'Left'
  };
  Tooltip.yogaZeroPercent = YogaValue.Point(0);
  return Tooltip;
}(react["Component"]);


// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/values/asset-reference.js
var AssetReferenceType;

(function (AssetReferenceType) {
  AssetReferenceType[AssetReferenceType["None"] = 0] = "None";
  AssetReferenceType[AssetReferenceType["File"] = 1] = "File";
  AssetReferenceType[AssetReferenceType["Url"] = 2] = "Url";
  AssetReferenceType[AssetReferenceType["Resource"] = 3] = "Resource";
  AssetReferenceType[AssetReferenceType["NamedAsset"] = 4] = "NamedAsset";
  AssetReferenceType[AssetReferenceType["Procedural"] = 5] = "Procedural";
})(AssetReferenceType || (AssetReferenceType = {}));
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/values/color.js

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/values/enum.js

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/values/values.js
var TextAnchor;

(function (TextAnchor) {
  TextAnchor[TextAnchor["UpperLeft"] = 0] = "UpperLeft";
  TextAnchor[TextAnchor["UpperCenter"] = 1] = "UpperCenter";
  TextAnchor[TextAnchor["UpperRight"] = 2] = "UpperRight";
  TextAnchor[TextAnchor["MiddleLeft"] = 3] = "MiddleLeft";
  TextAnchor[TextAnchor["MiddleCenter"] = 4] = "MiddleCenter";
  TextAnchor[TextAnchor["MiddleRight"] = 5] = "MiddleRight";
  TextAnchor[TextAnchor["LowerLeft"] = 6] = "LowerLeft";
  TextAnchor[TextAnchor["LowerCenter"] = 7] = "LowerCenter";
  TextAnchor[TextAnchor["LowerRight"] = 8] = "LowerRight";
})(TextAnchor || (TextAnchor = {}));
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/values/index.js




// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/asset-reference.js

var asset = {
  none: null,
  url: function url(_url) {
    return {
      type: AssetReferenceType.Url,
      value: _url
    };
  },
  file: function file(path) {
    return {
      type: AssetReferenceType.File,
      value: path
    };
  },
  resource: function resource(path) {
    return {
      type: AssetReferenceType.Resource,
      value: path
    };
  },
  named: function named(name) {
    return {
      type: AssetReferenceType.NamedAsset,
      value: name
    };
  },
  procedural: function procedural(value) {
    return {
      type: AssetReferenceType.Procedural,
      value: value
    };
  }
};
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/tester/test-view.js

var TestView = react["forwardRef"](function (props, ref) {
  return react["createElement"]("view", {
    ref: ref
  }, props.children);
});
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/src/tester/tester.js



function testRender(element) {
  return new Promise(function (resolve) {
    var ref = react["createRef"]();
    ReactUnity.render(react["createElement"](TestView, {
      ref: ref
    }, element), null, function () {
      resolve(ref.current);
    });
  });
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/native/context.js

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/native/native.js

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/native/index.js


// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/renderer.js

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/jsx.js

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/models/environment.js

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/renderer/dist/index.js














// CONCATENATED MODULE: ./src/gallery/monaco/language.ts
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /* eslint-disable no-useless-escape */var conf={wordPattern:/(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,comments:{lineComment:'//',blockComment:['/*','*/']},brackets:[['{','}'],['[',']'],['(',')']],onEnterRules:[{// e.g. /** | */
beforeText:/^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,afterText:/^\s*\*\/$/,action:{indentAction:2,appendText:' * '}},{// e.g. /** ...|
beforeText:/^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,action:{indentAction:0,appendText:' * '}},{// e.g.  * ...|
beforeText:/^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,action:{indentAction:0,appendText:'* '}},{// e.g.  */|
beforeText:/^(\t|(\ \ ))*\ \*\/\s*$/,action:{indentAction:0,removeText:1}}],autoClosingPairs:[{open:'{',close:'}'},{open:'[',close:']'},{open:'(',close:')'},{open:'"',close:'"',notIn:['string']},{open:'\'',close:'\'',notIn:['string','comment']},{open:'`',close:'`',notIn:['string','comment']},{open:"/**",close:" */",notIn:["string"]}],folding:{markers:{start:new RegExp("^\\s*//\\s*#?region\\b"),end:new RegExp("^\\s*//\\s*#?endregion\\b")}}};var language_language={// Set defaultToken to invalid to see what you do not tokenize yet
defaultToken:'invalid',tokenPostfix:'.ts',keywords:['abstract','as','break','case','catch','class','continue','const','constructor','debugger','declare','default','delete','do','else','enum','export','extends','false','finally','for','from','function','get','if','implements','import','in','infer','instanceof','interface','is','keyof','let','module','namespace','never','new','null','package','private','protected','public','readonly','require','global','return','set','static','super','switch','symbol','this','throw','true','try','type','typeof','unique','var','void','while','with','yield','async','await','of'],typeKeywords:['any','boolean','number','object','string','undefined'],operators:['<=','>=','==','!=','===','!==','=>','+','-','**','*','/','%','++','--','<<','</','>>','>>>','&','|','^','!','~','&&','||','??','?',':','=','+=','-=','*=','**=','/=','%=','<<=','>>=','>>>=','&=','|=','^=','@'],// we include these common regular expressions
symbols:/[=><!~?:&|+\-*\/\^%]+/,escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,digits:/\d+(_+\d+)*/,octaldigits:/[0-7]+(_+[0-7]+)*/,binarydigits:/[0-1]+(_+[0-1]+)*/,hexdigits:/[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,regexpctl:/[(){}\[\]\$\^|\-*+?\.]/,regexpesc:/\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,// The main tokenizer for our languages
tokenizer:{root:[[/[{}]/,'delimiter.bracket'],{include:'common'}],common:[// identifiers and keywords
[/[a-z_$][\w$]*/,{cases:{'@typeKeywords':'keyword','@keywords':'keyword','@default':'identifier'}}],[/[A-Z][\w\$]*/,'type.identifier'],// to show class names nicely
// [/[A-Z][\w\$]*/, 'identifier'],
// whitespace
{include:'@whitespace'},// regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
[/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/,{token:'regexp',bracket:'@open',next:'@regexp'}],// delimiters and operators
[/[()\[\]]/,'@brackets'],[/[<>](?!@symbols)/,'@brackets'],[/!(?=([^=]|$))/,'delimiter'],[/@symbols/,{cases:{'@operators':'delimiter','@default':''}}],// numbers
[/(@digits)[eE]([\-+]?(@digits))?/,'number.float'],[/(@digits)\.(@digits)([eE][\-+]?(@digits))?/,'number.float'],[/0[xX](@hexdigits)n?/,'number.hex'],[/0[oO]?(@octaldigits)n?/,'number.octal'],[/0[bB](@binarydigits)n?/,'number.binary'],[/(@digits)n?/,'number'],// delimiter: after number because of .\d floats
[/[;,.]/,'delimiter'],// strings
[/"([^"\\]|\\.)*$/,'string.invalid'],// non-teminated string
[/'([^'\\]|\\.)*$/,'string.invalid'],// non-teminated string
[/"/,'string','@string_double'],[/'/,'string','@string_single'],[/`/,'string','@string_backtick']],whitespace:[[/[ \t\r\n]+/,''],[/\/\*\*(?!\/)/,'comment.doc','@jsdoc'],[/\/\*/,'comment','@comment'],[/\/\/.*$/,'comment']],comment:[[/[^\/*]+/,'comment'],[/\*\//,'comment','@pop'],[/[\/*]/,'comment']],jsdoc:[[/[^\/*]+/,'comment.doc'],[/\*\//,'comment.doc','@pop'],[/[\/*]/,'comment.doc']],// We match regular expression quite precisely
regexp:[[/(\{)(\d+(?:,\d*)?)(\})/,['regexp.escape.control','regexp.escape.control','regexp.escape.control']],[/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/,['regexp.escape.control',{token:'regexp.escape.control',next:'@regexrange'}]],[/(\()(\?:|\?=|\?!)/,['regexp.escape.control','regexp.escape.control']],[/[()]/,'regexp.escape.control'],[/@regexpctl/,'regexp.escape.control'],[/[^\\\/]/,'regexp'],[/@regexpesc/,'regexp.escape'],[/\\\./,'regexp.invalid'],[/(\/)([gimsuy]*)/,[{token:'regexp',bracket:'@close',next:'@pop'},'keyword.other']]],regexrange:[[/-/,'regexp.escape.control'],[/\^/,'regexp.invalid'],[/@regexpesc/,'regexp.escape'],[/[^\]]/,'regexp'],[/\]/,{token:'regexp.escape.control',next:'@pop',bracket:'@close'}]],string_double:[[/[^\\"]+/,'string'],[/@escapes/,'string.escape'],[/\\./,'string.escape.invalid'],[/"/,'string','@pop']],string_single:[[/[^\\']+/,'string'],[/@escapes/,'string.escape'],[/\\./,'string.escape.invalid'],[/'/,'string','@pop']],string_backtick:[[/\$\{/,{token:'delimiter.bracket',next:'@bracketCounting'}],[/[^\\`$]+/,'string'],[/@escapes/,'string.escape'],[/\\./,'string.escape.invalid'],[/`/,'string','@pop']],bracketCounting:[[/\{/,'delimiter.bracket','@bracketCounting'],[/\}/,'delimiter.bracket','@pop'],{include:'common'}]}};
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/common/core/token.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var token_Token = /*#__PURE__*/function () {
  function Token(offset, type, language) {
    _classCallCheck(this, Token);

    this.offset = offset | 0; // @perf

    this.type = type;
    this.language = language;
  }

  _createClass(Token, [{
    key: "toString",
    value: function toString() {
      return '(' + this.offset + ', ' + this.type + ')';
    }
  }]);

  return Token;
}();
var token_TokenizationResult = function TokenizationResult(tokens, endState) {
  _classCallCheck(this, TokenizationResult);

  this.tokens = tokens;
  this.endState = endState;
};
var token_TokenizationResult2 = function TokenizationResult2(tokens, endState) {
  _classCallCheck(this, TokenizationResult2);

  this.tokens = tokens;
  this.endState = endState;
};
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// EXTERNAL MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/platform.js
var platform = __webpack_require__(2);

// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/construct.js


function construct_construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    construct_construct = Reflect.construct;
  } else {
    construct_construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return construct_construct.apply(null, arguments);
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js




function wrapNativeSuper_wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  wrapNativeSuper_wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct_construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return wrapNativeSuper_wrapNativeSuper(Class);
}
// EXTERNAL MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/process.js
var process = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/path.js





/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// NOTE: VSCode's copy of nodejs path library to be usable in common (non-node) namespace
// Copied from: https://github.com/nodejs/node/blob/v12.8.1/lib/path.js

/**
 * Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var CHAR_UPPERCASE_A = 65;
/* A */

var CHAR_LOWERCASE_A = 97;
/* a */

var CHAR_UPPERCASE_Z = 90;
/* Z */

var CHAR_LOWERCASE_Z = 122;
/* z */

var CHAR_DOT = 46;
/* . */

var CHAR_FORWARD_SLASH = 47;
/* / */

var CHAR_BACKWARD_SLASH = 92;
/* \ */

var CHAR_COLON = 58;
/* : */

var CHAR_QUESTION_MARK = 63;
/* ? */

var path_ErrorInvalidArgType = /*#__PURE__*/function (_Error) {
  _inherits(ErrorInvalidArgType, _Error);

  var _super = _createSuper(ErrorInvalidArgType);

  function ErrorInvalidArgType(name, expected, actual) {
    var _this;

    _classCallCheck(this, ErrorInvalidArgType);

    // determiner: 'must be' or 'must not be'
    var determiner;

    if (typeof expected === 'string' && expected.indexOf('not ') === 0) {
      determiner = 'must not be';
      expected = expected.replace(/^not /, '');
    } else {
      determiner = 'must be';
    }

    var type = name.indexOf('.') !== -1 ? 'property' : 'argument';
    var msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " of type ").concat(expected);
    msg += ". Received type ".concat(typeof actual);
    _this = _super.call(this, msg);
    _this.code = 'ERR_INVALID_ARG_TYPE';
    return _this;
  }

  return ErrorInvalidArgType;
}( /*#__PURE__*/wrapNativeSuper_wrapNativeSuper(Error));

function validateString(value, name) {
  if (typeof value !== 'string') {
    throw new path_ErrorInvalidArgType(name, 'string', value);
  }
}

function isPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
}

function isPosixPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH;
}

function isWindowsDeviceRoot(code) {
  return code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z || code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z;
} // Resolves . and .. elements in a path with directory names


function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code = 0;

  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) {
      code = path.charCodeAt(i);
    } else if (isPathSeparator(code)) {
      break;
    } else {
      code = CHAR_FORWARD_SLASH;
    }

    if (isPathSeparator(code)) {
      if (lastSlash === i - 1 || dots === 1) {// NOOP
      } else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT || res.charCodeAt(res.length - 2) !== CHAR_DOT) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf(separator);

            if (lastSlashIndex === -1) {
              res = '';
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }

            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length !== 0) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }

        if (allowAboveRoot) {
          res += res.length > 0 ? "".concat(separator, "..") : '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += "".concat(separator).concat(path.slice(lastSlash + 1, i));
        } else {
          res = path.slice(lastSlash + 1, i);
        }

        lastSegmentLength = i - lastSlash - 1;
      }

      lastSlash = i;
      dots = 0;
    } else if (code === CHAR_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }

  return res;
}

function _format(sep, pathObject) {
  if (pathObject === null || typeof pathObject !== 'object') {
    throw new path_ErrorInvalidArgType('pathObject', 'Object', pathObject);
  }

  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || "".concat(pathObject.name || '').concat(pathObject.ext || '');

  if (!dir) {
    return base;
  }

  return dir === pathObject.root ? "".concat(dir).concat(base) : "".concat(dir).concat(sep).concat(base);
}

var win32 = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedDevice = '';
    var resolvedTail = '';
    var resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1; i--) {
      var path = void 0;

      if (i >= 0) {
        path = i < 0 || arguments.length <= i ? undefined : arguments[i];
        validateString(path, 'path'); // Skip empty entries

        if (path.length === 0) {
          continue;
        }
      } else if (resolvedDevice.length === 0) {
        path = process["a" /* cwd */]();
      } else {
        // Windows has the concept of drive-specific current working
        // directories. If we've resolved a drive letter but not yet an
        // absolute path, get cwd for that drive, or the process cwd if
        // the drive cwd is not available. We're sure the device is not
        // a UNC path at this points, because UNC paths are always absolute.
        path = process["b" /* env */]["=".concat(resolvedDevice)] || process["a" /* cwd */](); // Verify that a cwd was found and that it actually points
        // to our drive. If not, default to the drive's root.

        if (path === undefined || path.slice(0, 2).toLowerCase() !== resolvedDevice.toLowerCase() && path.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
          path = "".concat(resolvedDevice, "\\");
        }
      }

      var len = path.length;
      var rootEnd = 0;
      var device = '';
      var isAbsolute = false;
      var code = path.charCodeAt(0); // Try to match a root

      if (len === 1) {
        if (isPathSeparator(code)) {
          // `path` contains just a path separator
          rootEnd = 1;
          isAbsolute = true;
        }
      } else if (isPathSeparator(code)) {
        // Possible UNC root
        // If we started with a separator, we know we at least have an
        // absolute path of some kind (UNC or otherwise)
        isAbsolute = true;

        if (isPathSeparator(path.charCodeAt(1))) {
          // Matched double path separator at beginning
          var j = 2;
          var last = j; // Match 1 or more non-path separators

          while (j < len && !isPathSeparator(path.charCodeAt(j))) {
            j++;
          }

          if (j < len && j !== last) {
            var firstPart = path.slice(last, j); // Matched!

            last = j; // Match 1 or more path separators

            while (j < len && isPathSeparator(path.charCodeAt(j))) {
              j++;
            }

            if (j < len && j !== last) {
              // Matched!
              last = j; // Match 1 or more non-path separators

              while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                j++;
              }

              if (j === len || j !== last) {
                // We matched a UNC root
                device = "\\\\".concat(firstPart, "\\").concat(path.slice(last, j));
                rootEnd = j;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
        // Possible device root
        device = path.slice(0, 2);
        rootEnd = 2;

        if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
          // Treat separator following drive name as an absolute path
          // indicator
          isAbsolute = true;
          rootEnd = 3;
        }
      }

      if (device.length > 0) {
        if (resolvedDevice.length > 0) {
          if (device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            // This path points to another device so it is not applicable
            continue;
          }
        } else {
          resolvedDevice = device;
        }
      }

      if (resolvedAbsolute) {
        if (resolvedDevice.length > 0) {
          break;
        }
      } else {
        resolvedTail = "".concat(path.slice(rootEnd), "\\").concat(resolvedTail);
        resolvedAbsolute = isAbsolute;

        if (isAbsolute && resolvedDevice.length > 0) {
          break;
        }
      }
    } // At this point the path should be resolved to a full absolute path,
    // but handle relative paths to be safe (might happen when process.cwd()
    // fails)
    // Normalize the tail path


    resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, '\\', isPathSeparator);
    return resolvedAbsolute ? "".concat(resolvedDevice, "\\").concat(resolvedTail) : "".concat(resolvedDevice).concat(resolvedTail) || '.';
  },
  normalize: function normalize(path) {
    validateString(path, 'path');
    var len = path.length;

    if (len === 0) {
      return '.';
    }

    var rootEnd = 0;
    var device;
    var isAbsolute = false;
    var code = path.charCodeAt(0); // Try to match a root

    if (len === 1) {
      // `path` contains just a single char, exit early to avoid
      // unnecessary work
      return isPosixPathSeparator(code) ? '\\' : path;
    }

    if (isPathSeparator(code)) {
      // Possible UNC root
      // If we started with a separator, we know we at least have an absolute
      // path of some kind (UNC or otherwise)
      isAbsolute = true;

      if (isPathSeparator(path.charCodeAt(1))) {
        // Matched double path separator at beginning
        var j = 2;
        var last = j; // Match 1 or more non-path separators

        while (j < len && !isPathSeparator(path.charCodeAt(j))) {
          j++;
        }

        if (j < len && j !== last) {
          var firstPart = path.slice(last, j); // Matched!

          last = j; // Match 1 or more path separators

          while (j < len && isPathSeparator(path.charCodeAt(j))) {
            j++;
          }

          if (j < len && j !== last) {
            // Matched!
            last = j; // Match 1 or more non-path separators

            while (j < len && !isPathSeparator(path.charCodeAt(j))) {
              j++;
            }

            if (j === len) {
              // We matched a UNC root only
              // Return the normalized version of the UNC root since there
              // is nothing left to process
              return "\\\\".concat(firstPart, "\\").concat(path.slice(last), "\\");
            }

            if (j !== last) {
              // We matched a UNC root with leftovers
              device = "\\\\".concat(firstPart, "\\").concat(path.slice(last, j));
              rootEnd = j;
            }
          }
        }
      } else {
        rootEnd = 1;
      }
    } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
      // Possible device root
      device = path.slice(0, 2);
      rootEnd = 2;

      if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
        // Treat separator following drive name as an absolute path
        // indicator
        isAbsolute = true;
        rootEnd = 3;
      }
    }

    var tail = rootEnd < len ? normalizeString(path.slice(rootEnd), !isAbsolute, '\\', isPathSeparator) : '';

    if (tail.length === 0 && !isAbsolute) {
      tail = '.';
    }

    if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
      tail += '\\';
    }

    if (device === undefined) {
      return isAbsolute ? "\\".concat(tail) : tail;
    }

    return isAbsolute ? "".concat(device, "\\").concat(tail) : "".concat(device).concat(tail);
  },
  isAbsolute: function isAbsolute(path) {
    validateString(path, 'path');
    var len = path.length;

    if (len === 0) {
      return false;
    }

    var code = path.charCodeAt(0);
    return isPathSeparator(code) || // Possible device root
    len > 2 && isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON && isPathSeparator(path.charCodeAt(2));
  },
  join: function join() {
    if (arguments.length === 0) {
      return '.';
    }

    var joined;
    var firstPart;

    for (var i = 0; i < arguments.length; ++i) {
      var arg = i < 0 || arguments.length <= i ? undefined : arguments[i];
      validateString(arg, 'path');

      if (arg.length > 0) {
        if (joined === undefined) {
          joined = firstPart = arg;
        } else {
          joined += "\\".concat(arg);
        }
      }
    }

    if (joined === undefined) {
      return '.';
    } // Make sure that the joined path doesn't start with two slashes, because
    // normalize() will mistake it for an UNC path then.
    //
    // This step is skipped when it is very clear that the user actually
    // intended to point at an UNC path. This is assumed when the first
    // non-empty string arguments starts with exactly two slashes followed by
    // at least one more non-slash character.
    //
    // Note that for normalize() to treat a path as an UNC path it needs to
    // have at least 2 components, so we don't filter for that here.
    // This means that the user can use join to construct UNC paths from
    // a server name and a share name; for example:
    //   path.join('//server', 'share') -> '\\\\server\\share\\')


    var needsReplace = true;
    var slashCount = 0;

    if (typeof firstPart === 'string' && isPathSeparator(firstPart.charCodeAt(0))) {
      ++slashCount;
      var firstLen = firstPart.length;

      if (firstLen > 1 && isPathSeparator(firstPart.charCodeAt(1))) {
        ++slashCount;

        if (firstLen > 2) {
          if (isPathSeparator(firstPart.charCodeAt(2))) {
            ++slashCount;
          } else {
            // We matched a UNC path in the first part
            needsReplace = false;
          }
        }
      }
    }

    if (needsReplace) {
      // Find any more consecutive slashes we need to replace
      while (slashCount < joined.length && isPathSeparator(joined.charCodeAt(slashCount))) {
        slashCount++;
      } // Replace the slashes if needed


      if (slashCount >= 2) {
        joined = "\\".concat(joined.slice(slashCount));
      }
    }

    return win32.normalize(joined);
  },
  // It will solve the relative path from `from` to `to`, for instance:
  //  from = 'C:\\orandea\\test\\aaa'
  //  to = 'C:\\orandea\\impl\\bbb'
  // The output of the function should be: '..\\..\\impl\\bbb'
  relative: function relative(from, to) {
    validateString(from, 'from');
    validateString(to, 'to');

    if (from === to) {
      return '';
    }

    var fromOrig = win32.resolve(from);
    var toOrig = win32.resolve(to);

    if (fromOrig === toOrig) {
      return '';
    }

    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();

    if (from === to) {
      return '';
    } // Trim any leading backslashes


    var fromStart = 0;

    while (fromStart < from.length && from.charCodeAt(fromStart) === CHAR_BACKWARD_SLASH) {
      fromStart++;
    } // Trim trailing backslashes (applicable to UNC paths only)


    var fromEnd = from.length;

    while (fromEnd - 1 > fromStart && from.charCodeAt(fromEnd - 1) === CHAR_BACKWARD_SLASH) {
      fromEnd--;
    }

    var fromLen = fromEnd - fromStart; // Trim any leading backslashes

    var toStart = 0;

    while (toStart < to.length && to.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
      toStart++;
    } // Trim trailing backslashes (applicable to UNC paths only)


    var toEnd = to.length;

    while (toEnd - 1 > toStart && to.charCodeAt(toEnd - 1) === CHAR_BACKWARD_SLASH) {
      toEnd--;
    }

    var toLen = toEnd - toStart; // Compare paths to find the longest common path from root

    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;

    for (; i < length; i++) {
      var fromCode = from.charCodeAt(fromStart + i);

      if (fromCode !== to.charCodeAt(toStart + i)) {
        break;
      } else if (fromCode === CHAR_BACKWARD_SLASH) {
        lastCommonSep = i;
      }
    } // We found a mismatch before the first common path separator was seen, so
    // return the original `to`.


    if (i !== length) {
      if (lastCommonSep === -1) {
        return toOrig;
      }
    } else {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
          // We get here if `from` is the exact base path for `to`.
          // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
          return toOrig.slice(toStart + i + 1);
        }

        if (i === 2) {
          // We get here if `from` is the device root.
          // For example: from='C:\\'; to='C:\\foo'
          return toOrig.slice(toStart + i);
        }
      }

      if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
          // We get here if `to` is the exact base path for `from`.
          // For example: from='C:\\foo\\bar'; to='C:\\foo'
          lastCommonSep = i;
        } else if (i === 2) {
          // We get here if `to` is the device root.
          // For example: from='C:\\foo\\bar'; to='C:\\'
          lastCommonSep = 3;
        }
      }

      if (lastCommonSep === -1) {
        lastCommonSep = 0;
      }
    }

    var out = ''; // Generate the relative path based on the path difference between `to` and
    // `from`

    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
        out += out.length === 0 ? '..' : '\\..';
      }
    }

    toStart += lastCommonSep; // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts

    if (out.length > 0) {
      return "".concat(out).concat(toOrig.slice(toStart, toEnd));
    }

    if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
      ++toStart;
    }

    return toOrig.slice(toStart, toEnd);
  },
  toNamespacedPath: function toNamespacedPath(path) {
    // Note: this will *probably* throw somewhere.
    if (typeof path !== 'string') {
      return path;
    }

    if (path.length === 0) {
      return '';
    }

    var resolvedPath = win32.resolve(path);

    if (resolvedPath.length <= 2) {
      return path;
    }

    if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
      // Possible UNC root
      if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
        var code = resolvedPath.charCodeAt(2);

        if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
          // Matched non-long UNC root, convert the path to a long UNC path
          return "\\\\?\\UNC\\".concat(resolvedPath.slice(2));
        }
      }
    } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0)) && resolvedPath.charCodeAt(1) === CHAR_COLON && resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
      // Matched device root, convert the path to a long UNC path
      return "\\\\?\\".concat(resolvedPath);
    }

    return path;
  },
  dirname: function dirname(path) {
    validateString(path, 'path');
    var len = path.length;

    if (len === 0) {
      return '.';
    }

    var rootEnd = -1;
    var offset = 0;
    var code = path.charCodeAt(0);

    if (len === 1) {
      // `path` contains just a path separator, exit early to avoid
      // unnecessary work or a dot.
      return isPathSeparator(code) ? path : '.';
    } // Try to match a root


    if (isPathSeparator(code)) {
      // Possible UNC root
      rootEnd = offset = 1;

      if (isPathSeparator(path.charCodeAt(1))) {
        // Matched double path separator at beginning
        var j = 2;
        var last = j; // Match 1 or more non-path separators

        while (j < len && !isPathSeparator(path.charCodeAt(j))) {
          j++;
        }

        if (j < len && j !== last) {
          // Matched!
          last = j; // Match 1 or more path separators

          while (j < len && isPathSeparator(path.charCodeAt(j))) {
            j++;
          }

          if (j < len && j !== last) {
            // Matched!
            last = j; // Match 1 or more non-path separators

            while (j < len && !isPathSeparator(path.charCodeAt(j))) {
              j++;
            }

            if (j === len) {
              // We matched a UNC root only
              return path;
            }

            if (j !== last) {
              // We matched a UNC root with leftovers
              // Offset by 1 to include the separator after the UNC root to
              // treat it as a "normal root" on top of a (UNC) root
              rootEnd = offset = j + 1;
            }
          }
        }
      } // Possible device root

    } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
      rootEnd = len > 2 && isPathSeparator(path.charCodeAt(2)) ? 3 : 2;
      offset = rootEnd;
    }

    var end = -1;
    var matchedSlash = true;

    for (var i = len - 1; i >= offset; --i) {
      if (isPathSeparator(path.charCodeAt(i))) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) {
      if (rootEnd === -1) {
        return '.';
      }

      end = rootEnd;
    }

    return path.slice(0, end);
  },
  basename: function basename(path, ext) {
    if (ext !== undefined) {
      validateString(ext, 'ext');
    }

    validateString(path, 'path');
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i; // Check for a drive letter prefix so as not to mistake the following
    // path separator as an extra separator at the end of the path that can be
    // disregarded

    if (path.length >= 2 && isWindowsDeviceRoot(path.charCodeAt(0)) && path.charCodeAt(1) === CHAR_COLON) {
      start = 2;
    }

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext === path) {
        return '';
      }

      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;

      for (i = path.length - 1; i >= start; --i) {
        var code = path.charCodeAt(i);

        if (isPathSeparator(code)) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }

          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) {
        end = firstNonSlashEnd;
      } else if (end === -1) {
        end = path.length;
      }

      return path.slice(start, end);
    }

    for (i = path.length - 1; i >= start; --i) {
      if (isPathSeparator(path.charCodeAt(i))) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // path component
        matchedSlash = false;
        end = i + 1;
      }
    }

    if (end === -1) {
      return '';
    }

    return path.slice(start, end);
  },
  extname: function extname(path) {
    validateString(path, 'path');
    var start = 0;
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true; // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find

    var preDotState = 0; // Check for a drive letter prefix so as not to mistake the following
    // path separator as an extra separator at the end of the path that can be
    // disregarded

    if (path.length >= 2 && path.charCodeAt(1) === CHAR_COLON && isWindowsDeviceRoot(path.charCodeAt(0))) {
      start = startPart = 2;
    }

    for (var i = path.length - 1; i >= start; --i) {
      var code = path.charCodeAt(i);

      if (isPathSeparator(code)) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }

        continue;
      }

      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }

      if (code === CHAR_DOT) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) {
          startDot = i;
        } else if (preDotState !== 1) {
          preDotState = 1;
        }
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }

    return path.slice(startDot, end);
  },
  format: _format.bind(null, '\\'),
  parse: function parse(path) {
    validateString(path, 'path');
    var ret = {
      root: '',
      dir: '',
      base: '',
      ext: '',
      name: ''
    };

    if (path.length === 0) {
      return ret;
    }

    var len = path.length;
    var rootEnd = 0;
    var code = path.charCodeAt(0);

    if (len === 1) {
      if (isPathSeparator(code)) {
        // `path` contains just a path separator, exit early to avoid
        // unnecessary work
        ret.root = ret.dir = path;
        return ret;
      }

      ret.base = ret.name = path;
      return ret;
    } // Try to match a root


    if (isPathSeparator(code)) {
      // Possible UNC root
      rootEnd = 1;

      if (isPathSeparator(path.charCodeAt(1))) {
        // Matched double path separator at beginning
        var j = 2;
        var last = j; // Match 1 or more non-path separators

        while (j < len && !isPathSeparator(path.charCodeAt(j))) {
          j++;
        }

        if (j < len && j !== last) {
          // Matched!
          last = j; // Match 1 or more path separators

          while (j < len && isPathSeparator(path.charCodeAt(j))) {
            j++;
          }

          if (j < len && j !== last) {
            // Matched!
            last = j; // Match 1 or more non-path separators

            while (j < len && !isPathSeparator(path.charCodeAt(j))) {
              j++;
            }

            if (j === len) {
              // We matched a UNC root only
              rootEnd = j;
            } else if (j !== last) {
              // We matched a UNC root with leftovers
              rootEnd = j + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
      // Possible device root
      if (len <= 2) {
        // `path` contains just a drive root, exit early to avoid
        // unnecessary work
        ret.root = ret.dir = path;
        return ret;
      }

      rootEnd = 2;

      if (isPathSeparator(path.charCodeAt(2))) {
        if (len === 3) {
          // `path` contains just a drive root, exit early to avoid
          // unnecessary work
          ret.root = ret.dir = path;
          return ret;
        }

        rootEnd = 3;
      }
    }

    if (rootEnd > 0) {
      ret.root = path.slice(0, rootEnd);
    }

    var startDot = -1;
    var startPart = rootEnd;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1; // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find

    var preDotState = 0; // Get non-dir info

    for (; i >= rootEnd; --i) {
      code = path.charCodeAt(i);

      if (isPathSeparator(code)) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }

        continue;
      }

      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }

      if (code === CHAR_DOT) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) {
          startDot = i;
        } else if (preDotState !== 1) {
          preDotState = 1;
        }
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (end !== -1) {
      if (startDot === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        ret.base = ret.name = path.slice(startPart, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
        ret.ext = path.slice(startDot, end);
      }
    } // If the directory is the root, use the entire root as the `dir` including
    // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
    // trailing slash (`C:\abc\def` -> `C:\abc`).


    if (startPart > 0 && startPart !== rootEnd) {
      ret.dir = path.slice(0, startPart - 1);
    } else {
      ret.dir = ret.root;
    }

    return ret;
  },
  sep: '\\',
  delimiter: ';',
  win32: null,
  posix: null
};
var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? i < 0 || arguments.length <= i ? undefined : arguments[i] : process["a" /* cwd */]();
      validateString(path, 'path'); // Skip empty entries

      if (path.length === 0) {
        continue;
      }

      resolvedPath = "".concat(path, "/").concat(resolvedPath);
      resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    } // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    // Normalize the path


    resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, '/', isPosixPathSeparator);

    if (resolvedAbsolute) {
      return "/".concat(resolvedPath);
    }

    return resolvedPath.length > 0 ? resolvedPath : '.';
  },
  normalize: function normalize(path) {
    validateString(path, 'path');

    if (path.length === 0) {
      return '.';
    }

    var isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    var trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH; // Normalize the path

    path = normalizeString(path, !isAbsolute, '/', isPosixPathSeparator);

    if (path.length === 0) {
      if (isAbsolute) {
        return '/';
      }

      return trailingSeparator ? './' : '.';
    }

    if (trailingSeparator) {
      path += '/';
    }

    return isAbsolute ? "/".concat(path) : path;
  },
  isAbsolute: function isAbsolute(path) {
    validateString(path, 'path');
    return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH;
  },
  join: function join() {
    if (arguments.length === 0) {
      return '.';
    }

    var joined;

    for (var i = 0; i < arguments.length; ++i) {
      var arg = i < 0 || arguments.length <= i ? undefined : arguments[i];
      validateString(arg, 'path');

      if (arg.length > 0) {
        if (joined === undefined) {
          joined = arg;
        } else {
          joined += "/".concat(arg);
        }
      }
    }

    if (joined === undefined) {
      return '.';
    }

    return posix.normalize(joined);
  },
  relative: function relative(from, to) {
    validateString(from, 'from');
    validateString(to, 'to');

    if (from === to) {
      return '';
    } // Trim leading forward slashes.


    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) {
      return '';
    }

    var fromStart = 1;
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;
    var toStart = 1;
    var toLen = to.length - toStart; // Compare paths to find the longest common path from root

    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;

    for (; i < length; i++) {
      var fromCode = from.charCodeAt(fromStart + i);

      if (fromCode !== to.charCodeAt(toStart + i)) {
        break;
      } else if (fromCode === CHAR_FORWARD_SLASH) {
        lastCommonSep = i;
      }
    }

    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
          // We get here if `from` is the exact base path for `to`.
          // For example: from='/foo/bar'; to='/foo/bar/baz'
          return to.slice(toStart + i + 1);
        }

        if (i === 0) {
          // We get here if `from` is the root
          // For example: from='/'; to='/foo'
          return to.slice(toStart + i);
        }
      } else if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
          // We get here if `to` is the exact base path for `from`.
          // For example: from='/foo/bar/baz'; to='/foo/bar'
          lastCommonSep = i;
        } else if (i === 0) {
          // We get here if `to` is the root.
          // For example: from='/foo/bar'; to='/'
          lastCommonSep = 0;
        }
      }
    }

    var out = ''; // Generate the relative path based on the path difference between `to`
    // and `from`.

    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
        out += out.length === 0 ? '..' : '/..';
      }
    } // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts.


    return "".concat(out).concat(to.slice(toStart + lastCommonSep));
  },
  toNamespacedPath: function toNamespacedPath(path) {
    // Non-op on posix systems
    return path;
  },
  dirname: function dirname(path) {
    validateString(path, 'path');

    if (path.length === 0) {
      return '.';
    }

    var hasRoot = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    var end = -1;
    var matchedSlash = true;

    for (var i = path.length - 1; i >= 1; --i) {
      if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) {
      return hasRoot ? '/' : '.';
    }

    if (hasRoot && end === 1) {
      return '//';
    }

    return path.slice(0, end);
  },
  basename: function basename(path, ext) {
    if (ext !== undefined) {
      validateString(ext, 'ext');
    }

    validateString(path, 'path');
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext === path) {
        return '';
      }

      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;

      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);

        if (code === CHAR_FORWARD_SLASH) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }

          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) {
        end = firstNonSlashEnd;
      } else if (end === -1) {
        end = path.length;
      }

      return path.slice(start, end);
    }

    for (i = path.length - 1; i >= 0; --i) {
      if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // path component
        matchedSlash = false;
        end = i + 1;
      }
    }

    if (end === -1) {
      return '';
    }

    return path.slice(start, end);
  },
  extname: function extname(path) {
    validateString(path, 'path');
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true; // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find

    var preDotState = 0;

    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);

      if (code === CHAR_FORWARD_SLASH) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }

        continue;
      }

      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }

      if (code === CHAR_DOT) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) {
          startDot = i;
        } else if (preDotState !== 1) {
          preDotState = 1;
        }
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }

    return path.slice(startDot, end);
  },
  format: _format.bind(null, '/'),
  parse: function parse(path) {
    validateString(path, 'path');
    var ret = {
      root: '',
      dir: '',
      base: '',
      ext: '',
      name: ''
    };

    if (path.length === 0) {
      return ret;
    }

    var isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    var start;

    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }

    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1; // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find

    var preDotState = 0; // Get non-dir info

    for (; i >= start; --i) {
      var code = path.charCodeAt(i);

      if (code === CHAR_FORWARD_SLASH) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }

        continue;
      }

      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }

      if (code === CHAR_DOT) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) {
          startDot = i;
        } else if (preDotState !== 1) {
          preDotState = 1;
        }
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (end !== -1) {
      var _start = startPart === 0 && isAbsolute ? 1 : startPart;

      if (startDot === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        ret.base = ret.name = path.slice(_start, end);
      } else {
        ret.name = path.slice(_start, startDot);
        ret.base = path.slice(_start, end);
        ret.ext = path.slice(startDot, end);
      }
    }

    if (startPart > 0) {
      ret.dir = path.slice(0, startPart - 1);
    } else if (isAbsolute) {
      ret.dir = '/';
    }

    return ret;
  },
  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};
posix.win32 = win32.win32 = win32;
posix.posix = win32.posix = posix;
var normalize = process["c" /* platform */] === 'win32' ? win32.normalize : posix.normalize;
var path_resolve = process["c" /* platform */] === 'win32' ? win32.resolve : posix.resolve;
var relative = process["c" /* platform */] === 'win32' ? win32.relative : posix.relative;
var dirname = process["c" /* platform */] === 'win32' ? win32.dirname : posix.dirname;
var path_basename = process["c" /* platform */] === 'win32' ? win32.basename : posix.basename;
var extname = process["c" /* platform */] === 'win32' ? win32.extname : posix.extname;
var sep = process["c" /* platform */] === 'win32' ? win32.sep : posix.sep;
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/uri.js






var _encodeTable;

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var _schemePattern = /^\w[\w\d+.-]*$/;
var _singleSlashStart = /^\//;
var _doubleSlashStart = /^\/\//;

function _validateUri(ret, _strict) {
  // scheme, must be set
  if (!ret.scheme && _strict) {
    throw new Error("[UriError]: Scheme is missing: {scheme: \"\", authority: \"".concat(ret.authority, "\", path: \"").concat(ret.path, "\", query: \"").concat(ret.query, "\", fragment: \"").concat(ret.fragment, "\"}"));
  } // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
  // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )


  if (ret.scheme && !_schemePattern.test(ret.scheme)) {
    throw new Error('[UriError]: Scheme contains illegal characters.');
  } // path, http://tools.ietf.org/html/rfc3986#section-3.3
  // If a URI contains an authority component, then the path component
  // must either be empty or begin with a slash ("/") character.  If a URI
  // does not contain an authority component, then the path cannot begin
  // with two slash characters ("//").


  if (ret.path) {
    if (ret.authority) {
      if (!_singleSlashStart.test(ret.path)) {
        throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
      }
    } else {
      if (_doubleSlashStart.test(ret.path)) {
        throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
      }
    }
  }
} // for a while we allowed uris *without* schemes and this is the migration
// for them, e.g. an uri without scheme and without strict-mode warns and falls
// back to the file-scheme. that should cause the least carnage and still be a
// clear warning


function _schemeFix(scheme, _strict) {
  if (!scheme && !_strict) {
    return 'file';
  }

  return scheme;
} // implements a bit of https://tools.ietf.org/html/rfc3986#section-5


function _referenceResolution(scheme, path) {
  // the slash-character is our 'default base' as we don't
  // support constructing URIs relative to other URIs. This
  // also means that we alter and potentially break paths.
  // see https://tools.ietf.org/html/rfc3986#section-5.1.4
  switch (scheme) {
    case 'https':
    case 'http':
    case 'file':
      if (!path) {
        path = _slash;
      } else if (path[0] !== _slash) {
        path = _slash + path;
      }

      break;
  }

  return path;
}

var uri_empty = '';
var _slash = '/';
var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
/**
 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component parts
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 * ```txt
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 * ```
 */

var uri_URI = /*#__PURE__*/function () {
  /**
   * @internal
   */
  function URI(schemeOrData, authority, path, query, fragment) {
    var _strict = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    _classCallCheck(this, URI);

    if (typeof schemeOrData === 'object') {
      this.scheme = schemeOrData.scheme || uri_empty;
      this.authority = schemeOrData.authority || uri_empty;
      this.path = schemeOrData.path || uri_empty;
      this.query = schemeOrData.query || uri_empty;
      this.fragment = schemeOrData.fragment || uri_empty; // no validation because it's this URI
      // that creates uri components.
      // _validateUri(this);
    } else {
      this.scheme = _schemeFix(schemeOrData, _strict);
      this.authority = authority || uri_empty;
      this.path = _referenceResolution(this.scheme, path || uri_empty);
      this.query = query || uri_empty;
      this.fragment = fragment || uri_empty;

      _validateUri(this, _strict);
    }
  }

  _createClass(URI, [{
    key: "with",
    // ---- modify to new -------------------------
    value: function _with(change) {
      if (!change) {
        return this;
      }

      var scheme = change.scheme,
          authority = change.authority,
          path = change.path,
          query = change.query,
          fragment = change.fragment;

      if (scheme === undefined) {
        scheme = this.scheme;
      } else if (scheme === null) {
        scheme = uri_empty;
      }

      if (authority === undefined) {
        authority = this.authority;
      } else if (authority === null) {
        authority = uri_empty;
      }

      if (path === undefined) {
        path = this.path;
      } else if (path === null) {
        path = uri_empty;
      }

      if (query === undefined) {
        query = this.query;
      } else if (query === null) {
        query = uri_empty;
      }

      if (fragment === undefined) {
        fragment = this.fragment;
      } else if (fragment === null) {
        fragment = uri_empty;
      }

      if (scheme === this.scheme && authority === this.authority && path === this.path && query === this.query && fragment === this.fragment) {
        return this;
      }

      return new uri_Uri(scheme, authority, path, query, fragment);
    } // ---- parse & validate ------------------------

    /**
     * Creates a new URI from a string, e.g. `http://www.msft.com/some/path`,
     * `file:///usr/home`, or `scheme:with/path`.
     *
     * @param value A string which represents an URI (see `URI#toString`).
     */

  }, {
    key: "toString",
    // ---- printing/externalize ---------------------------

    /**
     * Creates a string representation for this URI. It's guaranteed that calling
     * `URI.parse` with the result of this function creates an URI which is equal
     * to this URI.
     *
     * * The result shall *not* be used for display purposes but for externalization or transport.
     * * The result will be encoded using the percentage encoding and encoding happens mostly
     * ignore the scheme-specific encoding rules.
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    value: function toString() {
      var skipEncoding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return _asFormatted(this, skipEncoding);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this;
    }
  }, {
    key: "fsPath",
    // ---- filesystem path -----------------------

    /**
     * Returns a string representing the corresponding file system path of this URI.
     * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
     * platform specific path separator.
     *
     * * Will *not* validate the path for invalid characters and semantics.
     * * Will *not* look at the scheme of this URI.
     * * The result shall *not* be used for display purposes but for accessing a file on disk.
     *
     *
     * The *difference* to `URI#path` is the use of the platform specific separator and the handling
     * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
     *
     * ```ts
        const u = URI.parse('file://server/c$/folder/file.txt')
        u.authority === 'server'
        u.path === '/shares/c$/file.txt'
        u.fsPath === '\\server\c$\folder\file.txt'
    ```
     *
     * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
     * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
     * with URIs that represent files on disk (`file` scheme).
     */
    get: function get() {
      // if (this.scheme !== 'file') {
      // 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
      // }
      return uriToFsPath(this, false);
    }
  }], [{
    key: "isUri",
    value: function isUri(thing) {
      if (thing instanceof URI) {
        return true;
      }

      if (!thing) {
        return false;
      }

      return typeof thing.authority === 'string' && typeof thing.fragment === 'string' && typeof thing.path === 'string' && typeof thing.query === 'string' && typeof thing.scheme === 'string' && typeof thing.fsPath === 'function' && typeof thing["with"] === 'function' && typeof thing.toString === 'function';
    }
  }, {
    key: "parse",
    value: function parse(value) {
      var _strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var match = _regexp.exec(value);

      if (!match) {
        return new uri_Uri(uri_empty, uri_empty, uri_empty, uri_empty, uri_empty);
      }

      return new uri_Uri(match[2] || uri_empty, percentDecode(match[4] || uri_empty), percentDecode(match[5] || uri_empty), percentDecode(match[7] || uri_empty), percentDecode(match[9] || uri_empty), _strict);
    }
    /**
     * Creates a new URI from a file system path, e.g. `c:\my\files`,
     * `/usr/home`, or `\\server\share\some\path`.
     *
     * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
     * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
     * `URI.parse('file://' + path)` because the path might contain characters that are
     * interpreted (# and ?). See the following sample:
     * ```ts
    const good = URI.file('/coding/c#/project1');
    good.scheme === 'file';
    good.path === '/coding/c#/project1';
    good.fragment === '';
    const bad = URI.parse('file://' + '/coding/c#/project1');
    bad.scheme === 'file';
    bad.path === '/coding/c'; // path is now broken
    bad.fragment === '/project1';
    ```
     *
     * @param path A file system path (see `URI#fsPath`)
     */

  }, {
    key: "file",
    value: function file(path) {
      var authority = uri_empty; // normalize to fwd-slashes on windows,
      // on other systems bwd-slashes are valid
      // filename character, eg /f\oo/ba\r.txt

      if (platform["d" /* isWindows */]) {
        path = path.replace(/\\/g, _slash);
      } // check for authority as used in UNC shares
      // or use the path as given


      if (path[0] === _slash && path[1] === _slash) {
        var idx = path.indexOf(_slash, 2);

        if (idx === -1) {
          authority = path.substring(2);
          path = _slash;
        } else {
          authority = path.substring(2, idx);
          path = path.substring(idx) || _slash;
        }
      }

      return new uri_Uri('file', authority, path, uri_empty, uri_empty);
    }
  }, {
    key: "from",
    value: function from(components) {
      return new uri_Uri(components.scheme, components.authority, components.path, components.query, components.fragment);
    }
    /**
     * Join a URI path with path fragments and normalizes the resulting path.
     *
     * @param uri The input URI.
     * @param pathFragment The path fragment to add to the URI path.
     * @returns The resulting URI.
     */

  }, {
    key: "joinPath",
    value: function joinPath(uri) {
      if (!uri.path) {
        throw new Error("[UriError]: cannot call joinPaths on URI without path");
      }

      var newPath;

      for (var _len = arguments.length, pathFragment = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        pathFragment[_key - 1] = arguments[_key];
      }

      if (platform["d" /* isWindows */] && uri.scheme === 'file') {
        var _paths$win;

        newPath = URI.file((_paths$win = win32).join.apply(_paths$win, [uriToFsPath(uri, true)].concat(pathFragment))).path;
      } else {
        var _paths$posix;

        newPath = (_paths$posix = posix).join.apply(_paths$posix, [uri.path].concat(pathFragment));
      }

      return uri["with"]({
        path: newPath
      });
    }
  }, {
    key: "revive",
    value: function revive(data) {
      if (!data) {
        return data;
      } else if (data instanceof URI) {
        return data;
      } else {
        var result = new uri_Uri(data);
        result._formatted = data.external;
        result._fsPath = data._sep === _pathSepMarker ? data.fsPath : null;
        return result;
      }
    }
  }]);

  return URI;
}();

var _pathSepMarker = platform["d" /* isWindows */] ? 1 : undefined; // This class exists so that URI is compatibile with vscode.Uri (API).


var uri_Uri = /*#__PURE__*/function (_URI) {
  _inherits(Uri, _URI);

  var _super = _createSuper(Uri);

  function Uri() {
    var _this;

    _classCallCheck(this, Uri);

    _this = _super.apply(this, arguments);
    _this._formatted = null;
    _this._fsPath = null;
    return _this;
  }

  _createClass(Uri, [{
    key: "toString",
    value: function toString() {
      var skipEncoding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!skipEncoding) {
        if (!this._formatted) {
          this._formatted = _asFormatted(this, false);
        }

        return this._formatted;
      } else {
        // we don't cache that
        return _asFormatted(this, true);
      }
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var res = {
        $mid: 1
      }; // cached state

      if (this._fsPath) {
        res.fsPath = this._fsPath;
        res._sep = _pathSepMarker;
      }

      if (this._formatted) {
        res.external = this._formatted;
      } // uri components


      if (this.path) {
        res.path = this.path;
      }

      if (this.scheme) {
        res.scheme = this.scheme;
      }

      if (this.authority) {
        res.authority = this.authority;
      }

      if (this.query) {
        res.query = this.query;
      }

      if (this.fragment) {
        res.fragment = this.fragment;
      }

      return res;
    }
  }, {
    key: "fsPath",
    get: function get() {
      if (!this._fsPath) {
        this._fsPath = uriToFsPath(this, false);
      }

      return this._fsPath;
    }
  }]);

  return Uri;
}(uri_URI); // reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2


var encodeTable = (_encodeTable = {}, _defineProperty(_encodeTable, 58
/* Colon */
, '%3A'), _defineProperty(_encodeTable, 47
/* Slash */
, '%2F'), _defineProperty(_encodeTable, 63
/* QuestionMark */
, '%3F'), _defineProperty(_encodeTable, 35
/* Hash */
, '%23'), _defineProperty(_encodeTable, 91
/* OpenSquareBracket */
, '%5B'), _defineProperty(_encodeTable, 93
/* CloseSquareBracket */
, '%5D'), _defineProperty(_encodeTable, 64
/* AtSign */
, '%40'), _defineProperty(_encodeTable, 33
/* ExclamationMark */
, '%21'), _defineProperty(_encodeTable, 36
/* DollarSign */
, '%24'), _defineProperty(_encodeTable, 38
/* Ampersand */
, '%26'), _defineProperty(_encodeTable, 39
/* SingleQuote */
, '%27'), _defineProperty(_encodeTable, 40
/* OpenParen */
, '%28'), _defineProperty(_encodeTable, 41
/* CloseParen */
, '%29'), _defineProperty(_encodeTable, 42
/* Asterisk */
, '%2A'), _defineProperty(_encodeTable, 43
/* Plus */
, '%2B'), _defineProperty(_encodeTable, 44
/* Comma */
, '%2C'), _defineProperty(_encodeTable, 59
/* Semicolon */
, '%3B'), _defineProperty(_encodeTable, 61
/* Equals */
, '%3D'), _defineProperty(_encodeTable, 32
/* Space */
, '%20'), _encodeTable);

function encodeURIComponentFast(uriComponent, allowSlash) {
  var res = undefined;
  var nativeEncodePos = -1;

  for (var pos = 0; pos < uriComponent.length; pos++) {
    var code = uriComponent.charCodeAt(pos); // unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3

    if (code >= 97
    /* a */
    && code <= 122
    /* z */
    || code >= 65
    /* A */
    && code <= 90
    /* Z */
    || code >= 48
    /* Digit0 */
    && code <= 57
    /* Digit9 */
    || code === 45
    /* Dash */
    || code === 46
    /* Period */
    || code === 95
    /* Underline */
    || code === 126
    /* Tilde */
    || allowSlash && code === 47
    /* Slash */
    ) {
      // check if we are delaying native encode
      if (nativeEncodePos !== -1) {
        res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
        nativeEncodePos = -1;
      } // check if we write into a new string (by default we try to return the param)


      if (res !== undefined) {
        res += uriComponent.charAt(pos);
      }
    } else {
      // encoding needed, we need to allocate a new string
      if (res === undefined) {
        res = uriComponent.substr(0, pos);
      } // check with default table first


      var escaped = encodeTable[code];

      if (escaped !== undefined) {
        // check if we are delaying native encode
        if (nativeEncodePos !== -1) {
          res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
          nativeEncodePos = -1;
        } // append escaped variant to result


        res += escaped;
      } else if (nativeEncodePos === -1) {
        // use native encode only when needed
        nativeEncodePos = pos;
      }
    }
  }

  if (nativeEncodePos !== -1) {
    res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
  }

  return res !== undefined ? res : uriComponent;
}

function encodeURIComponentMinimal(path) {
  var res = undefined;

  for (var pos = 0; pos < path.length; pos++) {
    var code = path.charCodeAt(pos);

    if (code === 35
    /* Hash */
    || code === 63
    /* QuestionMark */
    ) {
        if (res === undefined) {
          res = path.substr(0, pos);
        }

        res += encodeTable[code];
      } else {
      if (res !== undefined) {
        res += path[pos];
      }
    }
  }

  return res !== undefined ? res : path;
}
/**
 * Compute `fsPath` for the given uri
 */


function uriToFsPath(uri, keepDriveLetterCasing) {
  var value;

  if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') {
    // unc path: file://shares/c$/far/boo
    value = "//".concat(uri.authority).concat(uri.path);
  } else if (uri.path.charCodeAt(0) === 47
  /* Slash */
  && (uri.path.charCodeAt(1) >= 65
  /* A */
  && uri.path.charCodeAt(1) <= 90
  /* Z */
  || uri.path.charCodeAt(1) >= 97
  /* a */
  && uri.path.charCodeAt(1) <= 122
  /* z */
  ) && uri.path.charCodeAt(2) === 58
  /* Colon */
  ) {
      if (!keepDriveLetterCasing) {
        // windows drive letter: file:///c:/far/boo
        value = uri.path[1].toLowerCase() + uri.path.substr(2);
      } else {
        value = uri.path.substr(1);
      }
    } else {
    // other path
    value = uri.path;
  }

  if (platform["d" /* isWindows */]) {
    value = value.replace(/\//g, '\\');
  }

  return value;
}
/**
 * Create the external version of a uri
 */

function _asFormatted(uri, skipEncoding) {
  var encoder = !skipEncoding ? encodeURIComponentFast : encodeURIComponentMinimal;
  var res = '';
  var scheme = uri.scheme,
      authority = uri.authority,
      path = uri.path,
      query = uri.query,
      fragment = uri.fragment;

  if (scheme) {
    res += scheme;
    res += ':';
  }

  if (authority || scheme === 'file') {
    res += _slash;
    res += _slash;
  }

  if (authority) {
    var idx = authority.indexOf('@');

    if (idx !== -1) {
      // <user>@<auth>
      var userinfo = authority.substr(0, idx);
      authority = authority.substr(idx + 1);
      idx = userinfo.indexOf(':');

      if (idx === -1) {
        res += encoder(userinfo, false);
      } else {
        // <user>:<pass>@<auth>
        res += encoder(userinfo.substr(0, idx), false);
        res += ':';
        res += encoder(userinfo.substr(idx + 1), false);
      }

      res += '@';
    }

    authority = authority.toLowerCase();
    idx = authority.indexOf(':');

    if (idx === -1) {
      res += encoder(authority, false);
    } else {
      // <auth>:<port>
      res += encoder(authority.substr(0, idx), false);
      res += authority.substr(idx);
    }
  }

  if (path) {
    // lower-case windows drive letters in /C:/fff or C:/fff
    if (path.length >= 3 && path.charCodeAt(0) === 47
    /* Slash */
    && path.charCodeAt(2) === 58
    /* Colon */
    ) {
        var code = path.charCodeAt(1);

        if (code >= 65
        /* A */
        && code <= 90
        /* Z */
        ) {
            path = "/".concat(String.fromCharCode(code + 32), ":").concat(path.substr(3)); // "/c:".length === 3
          }
      } else if (path.length >= 2 && path.charCodeAt(1) === 58
    /* Colon */
    ) {
        var _code = path.charCodeAt(0);

        if (_code >= 65
        /* A */
        && _code <= 90
        /* Z */
        ) {
            path = "".concat(String.fromCharCode(_code + 32), ":").concat(path.substr(2)); // "/c:".length === 3
          }
      } // encode the rest of the path


    res += encoder(path, true);
  }

  if (query) {
    res += '?';
    res += encoder(query, false);
  }

  if (fragment) {
    res += '#';
    res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
  }

  return res;
} // --- decode


function decodeURIComponentGraceful(str) {
  try {
    return decodeURIComponent(str);
  } catch (_a) {
    if (str.length > 3) {
      return str.substr(0, 3) + decodeURIComponentGraceful(str.substr(3));
    } else {
      return str;
    }
  }
}

var _rEncodedAsHex = /(%[0-9A-Za-z][0-9A-Za-z])+/g;

function percentDecode(str) {
  if (!str.match(_rEncodedAsHex)) {
    return str;
  }

  return str.replace(_rEncodedAsHex, function (match) {
    return decodeURIComponentGraceful(match);
  });
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/common/core/position.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * A position in the editor.
 */
var position_Position = /*#__PURE__*/function () {
  function Position(lineNumber, column) {
    _classCallCheck(this, Position);

    this.lineNumber = lineNumber;
    this.column = column;
  }
  /**
   * Create a new position from this position.
   *
   * @param newLineNumber new line number
   * @param newColumn new column
   */


  _createClass(Position, [{
    key: "with",
    value: function _with() {
      var newLineNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.lineNumber;
      var newColumn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.column;

      if (newLineNumber === this.lineNumber && newColumn === this.column) {
        return this;
      } else {
        return new Position(newLineNumber, newColumn);
      }
    }
    /**
     * Derive a new position from this position.
     *
     * @param deltaLineNumber line number delta
     * @param deltaColumn column delta
     */

  }, {
    key: "delta",
    value: function delta() {
      var deltaLineNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var deltaColumn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this["with"](this.lineNumber + deltaLineNumber, this.column + deltaColumn);
    }
    /**
     * Test if this position equals other position
     */

  }, {
    key: "equals",
    value: function equals(other) {
      return Position.equals(this, other);
    }
    /**
     * Test if position `a` equals position `b`
     */

  }, {
    key: "isBefore",

    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be false.
     */
    value: function isBefore(other) {
      return Position.isBefore(this, other);
    }
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be false.
     */

  }, {
    key: "isBeforeOrEqual",

    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be true.
     */
    value: function isBeforeOrEqual(other) {
      return Position.isBeforeOrEqual(this, other);
    }
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be true.
     */

  }, {
    key: "clone",

    /**
     * Clone this position.
     */
    value: function clone() {
      return new Position(this.lineNumber, this.column);
    }
    /**
     * Convert to a human-readable representation.
     */

  }, {
    key: "toString",
    value: function toString() {
      return '(' + this.lineNumber + ',' + this.column + ')';
    } // ---

    /**
     * Create a `Position` from an `IPosition`.
     */

  }], [{
    key: "equals",
    value: function equals(a, b) {
      if (!a && !b) {
        return true;
      }

      return !!a && !!b && a.lineNumber === b.lineNumber && a.column === b.column;
    }
  }, {
    key: "isBefore",
    value: function isBefore(a, b) {
      if (a.lineNumber < b.lineNumber) {
        return true;
      }

      if (b.lineNumber < a.lineNumber) {
        return false;
      }

      return a.column < b.column;
    }
  }, {
    key: "isBeforeOrEqual",
    value: function isBeforeOrEqual(a, b) {
      if (a.lineNumber < b.lineNumber) {
        return true;
      }

      if (b.lineNumber < a.lineNumber) {
        return false;
      }

      return a.column <= b.column;
    }
    /**
     * A function that compares positions, useful for sorting
     */

  }, {
    key: "compare",
    value: function compare(a, b) {
      var aLineNumber = a.lineNumber | 0;
      var bLineNumber = b.lineNumber | 0;

      if (aLineNumber === bLineNumber) {
        var aColumn = a.column | 0;
        var bColumn = b.column | 0;
        return aColumn - bColumn;
      }

      return aLineNumber - bLineNumber;
    }
  }, {
    key: "lift",
    value: function lift(pos) {
      return new Position(pos.lineNumber, pos.column);
    }
    /**
     * Test if `obj` is an `IPosition`.
     */

  }, {
    key: "isIPosition",
    value: function isIPosition(obj) {
      return obj && typeof obj.lineNumber === 'number' && typeof obj.column === 'number';
    }
  }]);

  return Position;
}();
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/common/core/range.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * A range in the editor. (startLineNumber,startColumn) is <= (endLineNumber,endColumn)
 */

var range_Range = /*#__PURE__*/function () {
  function Range(startLineNumber, startColumn, endLineNumber, endColumn) {
    _classCallCheck(this, Range);

    if (startLineNumber > endLineNumber || startLineNumber === endLineNumber && startColumn > endColumn) {
      this.startLineNumber = endLineNumber;
      this.startColumn = endColumn;
      this.endLineNumber = startLineNumber;
      this.endColumn = startColumn;
    } else {
      this.startLineNumber = startLineNumber;
      this.startColumn = startColumn;
      this.endLineNumber = endLineNumber;
      this.endColumn = endColumn;
    }
  }
  /**
   * Test if this range is empty.
   */


  _createClass(Range, [{
    key: "isEmpty",
    value: function isEmpty() {
      return Range.isEmpty(this);
    }
    /**
     * Test if `range` is empty.
     */

  }, {
    key: "containsPosition",

    /**
     * Test if position is in this range. If the position is at the edges, will return true.
     */
    value: function containsPosition(position) {
      return Range.containsPosition(this, position);
    }
    /**
     * Test if `position` is in `range`. If the position is at the edges, will return true.
     */

  }, {
    key: "containsRange",

    /**
     * Test if range is in this range. If the range is equal to this range, will return true.
     */
    value: function containsRange(range) {
      return Range.containsRange(this, range);
    }
    /**
     * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
     */

  }, {
    key: "strictContainsRange",

    /**
     * Test if `range` is strictly in this range. `range` must start after and end before this range for the result to be true.
     */
    value: function strictContainsRange(range) {
      return Range.strictContainsRange(this, range);
    }
    /**
     * Test if `otherRange` is strinctly in `range` (must start after, and end before). If the ranges are equal, will return false.
     */

  }, {
    key: "plusRange",

    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */
    value: function plusRange(range) {
      return Range.plusRange(this, range);
    }
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */

  }, {
    key: "intersectRanges",

    /**
     * A intersection of the two ranges.
     */
    value: function intersectRanges(range) {
      return Range.intersectRanges(this, range);
    }
    /**
     * A intersection of the two ranges.
     */

  }, {
    key: "equalsRange",

    /**
     * Test if this range equals other.
     */
    value: function equalsRange(other) {
      return Range.equalsRange(this, other);
    }
    /**
     * Test if range `a` equals `b`.
     */

  }, {
    key: "getEndPosition",

    /**
     * Return the end position (which will be after or equal to the start position)
     */
    value: function getEndPosition() {
      return Range.getEndPosition(this);
    }
    /**
     * Return the end position (which will be after or equal to the start position)
     */

  }, {
    key: "getStartPosition",

    /**
     * Return the start position (which will be before or equal to the end position)
     */
    value: function getStartPosition() {
      return Range.getStartPosition(this);
    }
    /**
     * Return the start position (which will be before or equal to the end position)
     */

  }, {
    key: "toString",

    /**
     * Transform to a user presentable string representation.
     */
    value: function toString() {
      return '[' + this.startLineNumber + ',' + this.startColumn + ' -> ' + this.endLineNumber + ',' + this.endColumn + ']';
    }
    /**
     * Create a new range using this range's start position, and using endLineNumber and endColumn as the end position.
     */

  }, {
    key: "setEndPosition",
    value: function setEndPosition(endLineNumber, endColumn) {
      return new Range(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
    }
    /**
     * Create a new range using this range's end position, and using startLineNumber and startColumn as the start position.
     */

  }, {
    key: "setStartPosition",
    value: function setStartPosition(startLineNumber, startColumn) {
      return new Range(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
    }
    /**
     * Create a new empty range using this range's start position.
     */

  }, {
    key: "collapseToStart",
    value: function collapseToStart() {
      return Range.collapseToStart(this);
    }
    /**
     * Create a new empty range using this range's start position.
     */

  }], [{
    key: "isEmpty",
    value: function isEmpty(range) {
      return range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn;
    }
  }, {
    key: "containsPosition",
    value: function containsPosition(range, position) {
      if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) {
        return false;
      }

      if (position.lineNumber === range.startLineNumber && position.column < range.startColumn) {
        return false;
      }

      if (position.lineNumber === range.endLineNumber && position.column > range.endColumn) {
        return false;
      }

      return true;
    }
  }, {
    key: "containsRange",
    value: function containsRange(range, otherRange) {
      if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
        return false;
      }

      if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
        return false;
      }

      if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn < range.startColumn) {
        return false;
      }

      if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn > range.endColumn) {
        return false;
      }

      return true;
    }
  }, {
    key: "strictContainsRange",
    value: function strictContainsRange(range, otherRange) {
      if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
        return false;
      }

      if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
        return false;
      }

      if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn <= range.startColumn) {
        return false;
      }

      if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn >= range.endColumn) {
        return false;
      }

      return true;
    }
  }, {
    key: "plusRange",
    value: function plusRange(a, b) {
      var startLineNumber;
      var startColumn;
      var endLineNumber;
      var endColumn;

      if (b.startLineNumber < a.startLineNumber) {
        startLineNumber = b.startLineNumber;
        startColumn = b.startColumn;
      } else if (b.startLineNumber === a.startLineNumber) {
        startLineNumber = b.startLineNumber;
        startColumn = Math.min(b.startColumn, a.startColumn);
      } else {
        startLineNumber = a.startLineNumber;
        startColumn = a.startColumn;
      }

      if (b.endLineNumber > a.endLineNumber) {
        endLineNumber = b.endLineNumber;
        endColumn = b.endColumn;
      } else if (b.endLineNumber === a.endLineNumber) {
        endLineNumber = b.endLineNumber;
        endColumn = Math.max(b.endColumn, a.endColumn);
      } else {
        endLineNumber = a.endLineNumber;
        endColumn = a.endColumn;
      }

      return new Range(startLineNumber, startColumn, endLineNumber, endColumn);
    }
  }, {
    key: "intersectRanges",
    value: function intersectRanges(a, b) {
      var resultStartLineNumber = a.startLineNumber;
      var resultStartColumn = a.startColumn;
      var resultEndLineNumber = a.endLineNumber;
      var resultEndColumn = a.endColumn;
      var otherStartLineNumber = b.startLineNumber;
      var otherStartColumn = b.startColumn;
      var otherEndLineNumber = b.endLineNumber;
      var otherEndColumn = b.endColumn;

      if (resultStartLineNumber < otherStartLineNumber) {
        resultStartLineNumber = otherStartLineNumber;
        resultStartColumn = otherStartColumn;
      } else if (resultStartLineNumber === otherStartLineNumber) {
        resultStartColumn = Math.max(resultStartColumn, otherStartColumn);
      }

      if (resultEndLineNumber > otherEndLineNumber) {
        resultEndLineNumber = otherEndLineNumber;
        resultEndColumn = otherEndColumn;
      } else if (resultEndLineNumber === otherEndLineNumber) {
        resultEndColumn = Math.min(resultEndColumn, otherEndColumn);
      } // Check if selection is now empty


      if (resultStartLineNumber > resultEndLineNumber) {
        return null;
      }

      if (resultStartLineNumber === resultEndLineNumber && resultStartColumn > resultEndColumn) {
        return null;
      }

      return new Range(resultStartLineNumber, resultStartColumn, resultEndLineNumber, resultEndColumn);
    }
  }, {
    key: "equalsRange",
    value: function equalsRange(a, b) {
      return !!a && !!b && a.startLineNumber === b.startLineNumber && a.startColumn === b.startColumn && a.endLineNumber === b.endLineNumber && a.endColumn === b.endColumn;
    }
  }, {
    key: "getEndPosition",
    value: function getEndPosition(range) {
      return new position_Position(range.endLineNumber, range.endColumn);
    }
  }, {
    key: "getStartPosition",
    value: function getStartPosition(range) {
      return new position_Position(range.startLineNumber, range.startColumn);
    }
  }, {
    key: "collapseToStart",
    value: function collapseToStart(range) {
      return new Range(range.startLineNumber, range.startColumn, range.startLineNumber, range.startColumn);
    } // ---

  }, {
    key: "fromPositions",
    value: function fromPositions(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start;
      return new Range(start.lineNumber, start.column, end.lineNumber, end.column);
    }
  }, {
    key: "lift",
    value: function lift(range) {
      if (!range) {
        return null;
      }

      return new Range(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
    }
    /**
     * Test if `obj` is an `IRange`.
     */

  }, {
    key: "isIRange",
    value: function isIRange(obj) {
      return obj && typeof obj.startLineNumber === 'number' && typeof obj.startColumn === 'number' && typeof obj.endLineNumber === 'number' && typeof obj.endColumn === 'number';
    }
    /**
     * Test if the two ranges are touching in any way.
     */

  }, {
    key: "areIntersectingOrTouching",
    value: function areIntersectingOrTouching(a, b) {
      // Check if `a` is before `b`
      if (a.endLineNumber < b.startLineNumber || a.endLineNumber === b.startLineNumber && a.endColumn < b.startColumn) {
        return false;
      } // Check if `b` is before `a`


      if (b.endLineNumber < a.startLineNumber || b.endLineNumber === a.startLineNumber && b.endColumn < a.startColumn) {
        return false;
      } // These ranges must intersect


      return true;
    }
    /**
     * Test if the two ranges are intersecting. If the ranges are touching it returns true.
     */

  }, {
    key: "areIntersecting",
    value: function areIntersecting(a, b) {
      // Check if `a` is before `b`
      if (a.endLineNumber < b.startLineNumber || a.endLineNumber === b.startLineNumber && a.endColumn <= b.startColumn) {
        return false;
      } // Check if `b` is before `a`


      if (b.endLineNumber < a.startLineNumber || b.endLineNumber === a.startLineNumber && b.endColumn <= a.startColumn) {
        return false;
      } // These ranges must intersect


      return true;
    }
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the startPosition and then on the endPosition
     */

  }, {
    key: "compareRangesUsingStarts",
    value: function compareRangesUsingStarts(a, b) {
      if (a && b) {
        var aStartLineNumber = a.startLineNumber | 0;
        var bStartLineNumber = b.startLineNumber | 0;

        if (aStartLineNumber === bStartLineNumber) {
          var aStartColumn = a.startColumn | 0;
          var bStartColumn = b.startColumn | 0;

          if (aStartColumn === bStartColumn) {
            var aEndLineNumber = a.endLineNumber | 0;
            var bEndLineNumber = b.endLineNumber | 0;

            if (aEndLineNumber === bEndLineNumber) {
              var aEndColumn = a.endColumn | 0;
              var bEndColumn = b.endColumn | 0;
              return aEndColumn - bEndColumn;
            }

            return aEndLineNumber - bEndLineNumber;
          }

          return aStartColumn - bStartColumn;
        }

        return aStartLineNumber - bStartLineNumber;
      }

      var aExists = a ? 1 : 0;
      var bExists = b ? 1 : 0;
      return aExists - bExists;
    }
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the endPosition and then on the startPosition
     */

  }, {
    key: "compareRangesUsingEnds",
    value: function compareRangesUsingEnds(a, b) {
      if (a.endLineNumber === b.endLineNumber) {
        if (a.endColumn === b.endColumn) {
          if (a.startLineNumber === b.startLineNumber) {
            return a.startColumn - b.startColumn;
          }

          return a.startLineNumber - b.startLineNumber;
        }

        return a.endColumn - b.endColumn;
      }

      return a.endLineNumber - b.endLineNumber;
    }
    /**
     * Test if the range spans multiple lines.
     */

  }, {
    key: "spansMultipleLines",
    value: function spansMultipleLines(range) {
      return range.endLineNumber > range.startLineNumber;
    }
  }]);

  return Range;
}();
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/superPropBase.js

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/get.js

function get_get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    get_get = Reflect.get;
  } else {
    get_get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return get_get(target, property, receiver || target);
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/errors.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Avoid circular dependency on EventEmitter by implementing a subset of the interface.
var errors_ErrorHandler = /*#__PURE__*/function () {
  function ErrorHandler() {
    _classCallCheck(this, ErrorHandler);

    this.listeners = [];

    this.unexpectedErrorHandler = function (e) {
      setTimeout(function () {
        if (e.stack) {
          throw new Error(e.message + '\n\n' + e.stack);
        }

        throw e;
      }, 0);
    };
  }

  _createClass(ErrorHandler, [{
    key: "emit",
    value: function emit(e) {
      this.listeners.forEach(function (listener) {
        listener(e);
      });
    }
  }, {
    key: "onUnexpectedError",
    value: function onUnexpectedError(e) {
      this.unexpectedErrorHandler(e);
      this.emit(e);
    } // For external errors, we don't want the listeners to be called

  }, {
    key: "onUnexpectedExternalError",
    value: function onUnexpectedExternalError(e) {
      this.unexpectedErrorHandler(e);
    }
  }]);

  return ErrorHandler;
}();
var errorHandler = new errors_ErrorHandler();
function onUnexpectedError(e) {
  // ignore errors from cancelled promises
  if (!isPromiseCanceledError(e)) {
    errorHandler.onUnexpectedError(e);
  }

  return undefined;
}
function onUnexpectedExternalError(e) {
  // ignore errors from cancelled promises
  if (!isPromiseCanceledError(e)) {
    errorHandler.onUnexpectedExternalError(e);
  }

  return undefined;
}
function transformErrorForSerialization(error) {
  if (error instanceof Error) {
    var name = error.name,
        message = error.message;
    var stack = error.stacktrace || error.stack;
    return {
      $isError: true,
      name: name,
      message: message,
      stack: stack
    };
  } // return as is


  return error;
}
var canceledName = 'Canceled';
/**
 * Checks if the given error is a promise in canceled state
 */

function isPromiseCanceledError(error) {
  return error instanceof Error && error.name === canceledName && error.message === canceledName;
}
/**
 * Returns an error that signals cancellation.
 */

function canceled() {
  var error = new Error(canceledName);
  error.name = error.message;
  return error;
}
function illegalArgument(name) {
  if (name) {
    return new Error("Illegal argument: ".concat(name));
  } else {
    return new Error('Illegal argument');
  }
}
function illegalState(name) {
  if (name) {
    return new Error("Illegal state: ".concat(name));
  } else {
    return new Error('Illegal state');
  }
}
// EXTERNAL MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/iterator.js




/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var iterator_Iterable;

(function (Iterable) {
  var _marked = /*#__PURE__*/regenerator_default.a.mark(single),
      _marked2 = /*#__PURE__*/regenerator_default.a.mark(filter),
      _marked3 = /*#__PURE__*/regenerator_default.a.mark(map),
      _marked4 = /*#__PURE__*/regenerator_default.a.mark(concat);

  function is(thing) {
    return thing && typeof thing === 'object' && typeof thing[Symbol.iterator] === 'function';
  }

  Iterable.is = is;

  var _empty = Object.freeze([]);

  function empty() {
    return _empty;
  }

  Iterable.empty = empty;

  function single(element) {
    return regenerator_default.a.wrap(function single$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return element;

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  }

  Iterable.single = single;

  function from(iterable) {
    return iterable || _empty;
  }

  Iterable.from = from;

  function first(iterable) {
    return iterable[Symbol.iterator]().next().value;
  }

  Iterable.first = first;

  function some(iterable, predicate) {
    var _iterator = _createForOfIteratorHelper(iterable),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var element = _step.value;

        if (predicate(element)) {
          return true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return false;
  }

  Iterable.some = some;

  function filter(iterable, predicate) {
    var _iterator2, _step2, element;

    return regenerator_default.a.wrap(function filter$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _iterator2 = _createForOfIteratorHelper(iterable);
            _context2.prev = 1;

            _iterator2.s();

          case 3:
            if ((_step2 = _iterator2.n()).done) {
              _context2.next = 10;
              break;
            }

            element = _step2.value;

            if (!predicate(element)) {
              _context2.next = 8;
              break;
            }

            _context2.next = 8;
            return element;

          case 8:
            _context2.next = 3;
            break;

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);

            _iterator2.e(_context2.t0);

          case 15:
            _context2.prev = 15;

            _iterator2.f();

            return _context2.finish(15);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _marked2, null, [[1, 12, 15, 18]]);
  }

  Iterable.filter = filter;

  function map(iterable, fn) {
    var _iterator3, _step3, element;

    return regenerator_default.a.wrap(function map$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _iterator3 = _createForOfIteratorHelper(iterable);
            _context3.prev = 1;

            _iterator3.s();

          case 3:
            if ((_step3 = _iterator3.n()).done) {
              _context3.next = 9;
              break;
            }

            element = _step3.value;
            _context3.next = 7;
            return fn(element);

          case 7:
            _context3.next = 3;
            break;

          case 9:
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);

            _iterator3.e(_context3.t0);

          case 14:
            _context3.prev = 14;

            _iterator3.f();

            return _context3.finish(14);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _marked3, null, [[1, 11, 14, 17]]);
  }

  Iterable.map = map;

  function concat() {
    var _len,
        iterables,
        _key,
        _i,
        _iterables,
        iterable,
        _iterator4,
        _step4,
        element,
        _args4 = arguments;

    return regenerator_default.a.wrap(function concat$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            for (_len = _args4.length, iterables = new Array(_len), _key = 0; _key < _len; _key++) {
              iterables[_key] = _args4[_key];
            }

            _i = 0, _iterables = iterables;

          case 2:
            if (!(_i < _iterables.length)) {
              _context4.next = 24;
              break;
            }

            iterable = _iterables[_i];
            _iterator4 = _createForOfIteratorHelper(iterable);
            _context4.prev = 5;

            _iterator4.s();

          case 7:
            if ((_step4 = _iterator4.n()).done) {
              _context4.next = 13;
              break;
            }

            element = _step4.value;
            _context4.next = 11;
            return element;

          case 11:
            _context4.next = 7;
            break;

          case 13:
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](5);

            _iterator4.e(_context4.t0);

          case 18:
            _context4.prev = 18;

            _iterator4.f();

            return _context4.finish(18);

          case 21:
            _i++;
            _context4.next = 2;
            break;

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _marked4, null, [[5, 15, 18, 21]]);
  }

  Iterable.concat = concat;
  /**
   * Consumes `atMost` elements from iterable and returns the consumed elements,
   * and an iterable for the rest of the elements.
   */

  function consume(iterable) {
    var atMost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.POSITIVE_INFINITY;
    var consumed = [];

    if (atMost === 0) {
      return [consumed, iterable];
    }

    var iterator = iterable[Symbol.iterator]();

    for (var i = 0; i < atMost; i++) {
      var next = iterator.next();

      if (next.done) {
        return [consumed, Iterable.empty()];
      }

      consumed.push(next.value);
    }

    return [consumed, _defineProperty({}, Symbol.iterator, function () {
      return iterator;
    })];
  }

  Iterable.consume = consume;
})(iterator_Iterable || (iterator_Iterable = {}));
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/lifecycle.js







/**
 * Enables logging of potentially leaked disposables.
 *
 * A disposable is considered leaked if it is not disposed or not registered as the child of
 * another disposable. This tracking is very simple an only works for classes that either
 * extend Disposable or use a DisposableStore. This means there are a lot of false positives.
 */

var TRACK_DISPOSABLES = false;
var __is_disposable_tracked__ = '__is_disposable_tracked__';

function markTracked(x) {
  if (!TRACK_DISPOSABLES) {
    return;
  }

  if (x && x !== lifecycle_Disposable.None) {
    try {
      x[__is_disposable_tracked__] = true;
    } catch (_a) {// noop
    }
  }
}

function trackDisposable(x) {
  if (!TRACK_DISPOSABLES) {
    return x;
  }

  var stack = new Error('Potentially leaked disposable').stack;
  setTimeout(function () {
    if (!x[__is_disposable_tracked__]) {
      console.log(stack);
    }
  }, 3000);
  return x;
}

var lifecycle_MultiDisposeError = /*#__PURE__*/function (_Error) {
  _inherits(MultiDisposeError, _Error);

  var _super = _createSuper(MultiDisposeError);

  function MultiDisposeError(errors) {
    var _this;

    _classCallCheck(this, MultiDisposeError);

    _this = _super.call(this, "Encounter errors while disposing of store. Errors: [".concat(errors.join(', '), "]"));
    _this.errors = errors;
    return _this;
  }

  return MultiDisposeError;
}( /*#__PURE__*/wrapNativeSuper_wrapNativeSuper(Error));
function isDisposable(thing) {
  return typeof thing.dispose === 'function' && thing.dispose.length === 0;
}

function _dispose(arg) {
  if (iterator_Iterable.is(arg)) {
    var errors = [];

    var _iterator = _createForOfIteratorHelper(arg),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var d = _step.value;

        if (d) {
          markTracked(d);

          try {
            d.dispose();
          } catch (e) {
            errors.push(e);
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (errors.length === 1) {
      throw errors[0];
    } else if (errors.length > 1) {
      throw new lifecycle_MultiDisposeError(errors);
    }

    return Array.isArray(arg) ? [] : arg;
  } else if (arg) {
    markTracked(arg);
    arg.dispose();
    return arg;
  }
}


function combinedDisposable() {
  for (var _len = arguments.length, disposables = new Array(_len), _key = 0; _key < _len; _key++) {
    disposables[_key] = arguments[_key];
  }

  disposables.forEach(markTracked);
  return trackDisposable({
    dispose: function dispose() {
      return _dispose(disposables);
    }
  });
}
function toDisposable(fn) {
  var self = trackDisposable({
    dispose: function dispose() {
      markTracked(self);
      fn();
    }
  });
  return self;
}
var lifecycle_DisposableStore = /*#__PURE__*/function () {
  function DisposableStore() {
    _classCallCheck(this, DisposableStore);

    this._toDispose = new Set();
    this._isDisposed = false;
  }
  /**
   * Dispose of all registered disposables and mark this object as disposed.
   *
   * Any future disposables added to this object will be disposed of on `add`.
   */


  _createClass(DisposableStore, [{
    key: "dispose",
    value: function dispose() {
      if (this._isDisposed) {
        return;
      }

      markTracked(this);
      this._isDisposed = true;
      this.clear();
    }
    /**
     * Dispose of all registered disposables but do not mark this object as disposed.
     */

  }, {
    key: "clear",
    value: function clear() {
      try {
        _dispose(this._toDispose.values());
      } finally {
        this._toDispose.clear();
      }
    }
  }, {
    key: "add",
    value: function add(t) {
      if (!t) {
        return t;
      }

      if (t === this) {
        throw new Error('Cannot register a disposable on itself!');
      }

      markTracked(t);

      if (this._isDisposed) {
        if (!DisposableStore.DISABLE_DISPOSED_WARNING) {
          console.warn(new Error('Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!').stack);
        }
      } else {
        this._toDispose.add(t);
      }

      return t;
    }
  }]);

  return DisposableStore;
}();
lifecycle_DisposableStore.DISABLE_DISPOSED_WARNING = false;
var lifecycle_Disposable = /*#__PURE__*/function () {
  function Disposable() {
    _classCallCheck(this, Disposable);

    this._store = new lifecycle_DisposableStore();
    trackDisposable(this);
  }

  _createClass(Disposable, [{
    key: "dispose",
    value: function dispose() {
      markTracked(this);

      this._store.dispose();
    }
  }, {
    key: "_register",
    value: function _register(t) {
      if (t === this) {
        throw new Error('Cannot register a disposable on itself!');
      }

      return this._store.add(t);
    }
  }]);

  return Disposable;
}();
lifecycle_Disposable.None = Object.freeze({
  dispose: function dispose() {}
});
/**
 * Manages the lifecycle of a disposable value that may be changed.
 *
 * This ensures that when the disposable value is changed, the previously held disposable is disposed of. You can
 * also register a `MutableDisposable` on a `Disposable` to ensure it is automatically cleaned up.
 */

var lifecycle_MutableDisposable = /*#__PURE__*/function () {
  function MutableDisposable() {
    _classCallCheck(this, MutableDisposable);

    this._isDisposed = false;
    trackDisposable(this);
  }

  _createClass(MutableDisposable, [{
    key: "clear",
    value: function clear() {
      this.value = undefined;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._isDisposed = true;
      markTracked(this);

      if (this._value) {
        this._value.dispose();
      }

      this._value = undefined;
    }
  }, {
    key: "value",
    get: function get() {
      return this._isDisposed ? undefined : this._value;
    },
    set: function set(value) {
      if (this._isDisposed || value === this._value) {
        return;
      }

      if (this._value) {
        this._value.dispose();
      }

      if (value) {
        markTracked(value);
      }

      this._value = value;
    }
  }]);

  return MutableDisposable;
}();
var lifecycle_ImmortalReference = /*#__PURE__*/function () {
  function ImmortalReference(object) {
    _classCallCheck(this, ImmortalReference);

    this.object = object;
  }

  _createClass(ImmortalReference, [{
    key: "dispose",
    value: function dispose() {}
  }]);

  return ImmortalReference;
}();
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/linkedList.js




/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var linkedList_Node = function Node(element) {
  _classCallCheck(this, Node);

  this.element = element;
  this.next = Node.Undefined;
  this.prev = Node.Undefined;
};

linkedList_Node.Undefined = new linkedList_Node(undefined);
var linkedList_LinkedList = /*#__PURE__*/function () {
  function LinkedList() {
    _classCallCheck(this, LinkedList);

    this._first = linkedList_Node.Undefined;
    this._last = linkedList_Node.Undefined;
    this._size = 0;
  }

  _createClass(LinkedList, [{
    key: "isEmpty",
    value: function isEmpty() {
      return this._first === linkedList_Node.Undefined;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._first = linkedList_Node.Undefined;
      this._last = linkedList_Node.Undefined;
      this._size = 0;
    }
  }, {
    key: "unshift",
    value: function unshift(element) {
      return this._insert(element, false);
    }
  }, {
    key: "push",
    value: function push(element) {
      return this._insert(element, true);
    }
  }, {
    key: "_insert",
    value: function _insert(element, atTheEnd) {
      var _this = this;

      var newNode = new linkedList_Node(element);

      if (this._first === linkedList_Node.Undefined) {
        this._first = newNode;
        this._last = newNode;
      } else if (atTheEnd) {
        // push
        var oldLast = this._last;
        this._last = newNode;
        newNode.prev = oldLast;
        oldLast.next = newNode;
      } else {
        // unshift
        var oldFirst = this._first;
        this._first = newNode;
        newNode.next = oldFirst;
        oldFirst.prev = newNode;
      }

      this._size += 1;
      var didRemove = false;
      return function () {
        if (!didRemove) {
          didRemove = true;

          _this._remove(newNode);
        }
      };
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this._first === linkedList_Node.Undefined) {
        return undefined;
      } else {
        var res = this._first.element;

        this._remove(this._first);

        return res;
      }
    }
  }, {
    key: "pop",
    value: function pop() {
      if (this._last === linkedList_Node.Undefined) {
        return undefined;
      } else {
        var res = this._last.element;

        this._remove(this._last);

        return res;
      }
    }
  }, {
    key: "_remove",
    value: function _remove(node) {
      if (node.prev !== linkedList_Node.Undefined && node.next !== linkedList_Node.Undefined) {
        // middle
        var anchor = node.prev;
        anchor.next = node.next;
        node.next.prev = anchor;
      } else if (node.prev === linkedList_Node.Undefined && node.next === linkedList_Node.Undefined) {
        // only node
        this._first = linkedList_Node.Undefined;
        this._last = linkedList_Node.Undefined;
      } else if (node.next === linkedList_Node.Undefined) {
        // last
        this._last = this._last.prev;
        this._last.next = linkedList_Node.Undefined;
      } else if (node.prev === linkedList_Node.Undefined) {
        // first
        this._first = this._first.next;
        this._first.prev = linkedList_Node.Undefined;
      } // done


      this._size -= 1;
    }
  }, {
    key: Symbol.iterator,
    value: /*#__PURE__*/regenerator_default.a.mark(function value() {
      var node;
      return regenerator_default.a.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              node = this._first;

            case 1:
              if (!(node !== linkedList_Node.Undefined)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return node.element;

            case 4:
              node = node.next;
              _context.next = 1;
              break;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }, {
    key: "toArray",
    value: function toArray() {
      var result = [];

      for (var node = this._first; node !== linkedList_Node.Undefined; node = node.next) {
        result.push(node.element);
      }

      return result;
    }
  }, {
    key: "size",
    get: function get() {
      return this._size;
    }
  }]);

  return LinkedList;
}();
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/event.js










/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



var event_Event;

(function (Event) {
  Event.None = function () {
    return lifecycle_Disposable.None;
  };
  /**
   * Given an event, returns another event which only fires once.
   */


  function _once(event) {
    return function (listener) {
      var thisArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var disposables = arguments.length > 2 ? arguments[2] : undefined;
      // we need this, in case the event fires during the listener call
      var didFire = false;
      var result;
      result = event(function (e) {
        if (didFire) {
          return;
        } else if (result) {
          result.dispose();
        } else {
          didFire = true;
        }

        return listener.call(thisArgs, e);
      }, null, disposables);

      if (didFire) {
        result.dispose();
      }

      return result;
    };
  }

  Event.once = _once;
  /**
   * Given an event and a `map` function, returns another event which maps each element
   * through the mapping function.
   */

  function _map(event, map) {
    return snapshot(function (listener) {
      var thisArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var disposables = arguments.length > 2 ? arguments[2] : undefined;
      return event(function (i) {
        return listener.call(thisArgs, map(i));
      }, null, disposables);
    });
  }

  Event.map = _map;
  /**
   * Given an event and an `each` function, returns another identical event and calls
   * the `each` function per each element.
   */

  function _forEach(event, each) {
    return snapshot(function (listener) {
      var thisArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var disposables = arguments.length > 2 ? arguments[2] : undefined;
      return event(function (i) {
        each(i);
        listener.call(thisArgs, i);
      }, null, disposables);
    });
  }

  Event.forEach = _forEach;

  function _filter(event, filter) {
    return snapshot(function (listener) {
      var thisArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var disposables = arguments.length > 2 ? arguments[2] : undefined;
      return event(function (e) {
        return filter(e) && listener.call(thisArgs, e);
      }, null, disposables);
    });
  }

  Event.filter = _filter;
  /**
   * Given an event, returns the same event but typed as `Event<void>`.
   */

  function signal(event) {
    return event;
  }

  Event.signal = signal;

  function any() {
    for (var _len = arguments.length, events = new Array(_len), _key = 0; _key < _len; _key++) {
      events[_key] = arguments[_key];
    }

    return function (listener) {
      var thisArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var disposables = arguments.length > 2 ? arguments[2] : undefined;
      return combinedDisposable.apply(void 0, _toConsumableArray(events.map(function (event) {
        return event(function (e) {
          return listener.call(thisArgs, e);
        }, null, disposables);
      })));
    };
  }

  Event.any = any;
  /**
   * Given an event and a `merge` function, returns another event which maps each element
   * and the cumulative result through the `merge` function. Similar to `map`, but with memory.
   */

  function _reduce(event, merge, initial) {
    var output = initial;
    return _map(event, function (e) {
      output = merge(output, e);
      return output;
    });
  }

  Event.reduce = _reduce;
  /**
   * Given a chain of event processing functions (filter, map, etc), each
   * function will be invoked per event & per listener. Snapshotting an event
   * chain allows each function to be invoked just once per event.
   */

  function snapshot(event) {
    var listener;
    var emitter = new event_Emitter({
      onFirstListenerAdd: function onFirstListenerAdd() {
        listener = event(emitter.fire, emitter);
      },
      onLastListenerRemove: function onLastListenerRemove() {
        listener.dispose();
      }
    });
    return emitter.event;
  }

  Event.snapshot = snapshot;

  function _debounce(event, merge) {
    var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var leading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var leakWarningThreshold = arguments.length > 4 ? arguments[4] : undefined;
    var subscription;
    var output = undefined;
    var handle = undefined;
    var numDebouncedCalls = 0;
    var emitter = new event_Emitter({
      leakWarningThreshold: leakWarningThreshold,
      onFirstListenerAdd: function onFirstListenerAdd() {
        subscription = event(function (cur) {
          numDebouncedCalls++;
          output = merge(output, cur);

          if (leading && !handle) {
            emitter.fire(output);
            output = undefined;
          }

          clearTimeout(handle);
          handle = setTimeout(function () {
            var _output = output;
            output = undefined;
            handle = undefined;

            if (!leading || numDebouncedCalls > 1) {
              emitter.fire(_output);
            }

            numDebouncedCalls = 0;
          }, delay);
        });
      },
      onLastListenerRemove: function onLastListenerRemove() {
        subscription.dispose();
      }
    });
    return emitter.event;
  }

  Event.debounce = _debounce;
  /**
   * Given an event, it returns another event which fires only once and as soon as
   * the input event emits. The event data is the number of millis it took for the
   * event to fire.
   */

  function stopwatch(event) {
    var start = new Date().getTime();
    return _map(_once(event), function (_) {
      return new Date().getTime() - start;
    });
  }

  Event.stopwatch = stopwatch;
  /**
   * Given an event, it returns another event which fires only when the event
   * element changes.
   */

  function _latch(event) {
    var firstCall = true;
    var cache;
    return _filter(event, function (value) {
      var shouldEmit = firstCall || value !== cache;
      firstCall = false;
      cache = value;
      return shouldEmit;
    });
  }

  Event.latch = _latch;
  /**
   * Buffers the provided event until a first listener comes
   * along, at which point fire all the events at once and
   * pipe the event from then on.
   *
   * ```typescript
   * const emitter = new Emitter<number>();
   * const event = emitter.event;
   * const bufferedEvent = buffer(event);
   *
   * emitter.fire(1);
   * emitter.fire(2);
   * emitter.fire(3);
   * // nothing...
   *
   * const listener = bufferedEvent(num => console.log(num));
   * // 1, 2, 3
   *
   * emitter.fire(4);
   * // 4
   * ```
   */

  function buffer(event) {
    var nextTick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _buffer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var buffer = _buffer.slice();

    var listener = event(function (e) {
      if (buffer) {
        buffer.push(e);
      } else {
        emitter.fire(e);
      }
    });

    var flush = function flush() {
      if (buffer) {
        buffer.forEach(function (e) {
          return emitter.fire(e);
        });
      }

      buffer = null;
    };

    var emitter = new event_Emitter({
      onFirstListenerAdd: function onFirstListenerAdd() {
        if (!listener) {
          listener = event(function (e) {
            return emitter.fire(e);
          });
        }
      },
      onFirstListenerDidAdd: function onFirstListenerDidAdd() {
        if (buffer) {
          if (nextTick) {
            setTimeout(flush);
          } else {
            flush();
          }
        }
      },
      onLastListenerRemove: function onLastListenerRemove() {
        if (listener) {
          listener.dispose();
        }

        listener = null;
      }
    });
    return emitter.event;
  }

  Event.buffer = buffer;

  var ChainableEvent = /*#__PURE__*/function () {
    function ChainableEvent(event) {
      _classCallCheck(this, ChainableEvent);

      this.event = event;
    }

    _createClass(ChainableEvent, [{
      key: "map",
      value: function map(fn) {
        return new ChainableEvent(_map(this.event, fn));
      }
    }, {
      key: "forEach",
      value: function forEach(fn) {
        return new ChainableEvent(_forEach(this.event, fn));
      }
    }, {
      key: "filter",
      value: function filter(fn) {
        return new ChainableEvent(_filter(this.event, fn));
      }
    }, {
      key: "reduce",
      value: function reduce(merge, initial) {
        return new ChainableEvent(_reduce(this.event, merge, initial));
      }
    }, {
      key: "latch",
      value: function latch() {
        return new ChainableEvent(_latch(this.event));
      }
    }, {
      key: "debounce",
      value: function debounce(merge) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var leading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var leakWarningThreshold = arguments.length > 3 ? arguments[3] : undefined;
        return new ChainableEvent(_debounce(this.event, merge, delay, leading, leakWarningThreshold));
      }
    }, {
      key: "on",
      value: function on(listener, thisArgs, disposables) {
        return this.event(listener, thisArgs, disposables);
      }
    }, {
      key: "once",
      value: function once(listener, thisArgs, disposables) {
        return _once(this.event)(listener, thisArgs, disposables);
      }
    }]);

    return ChainableEvent;
  }();

  function chain(event) {
    return new ChainableEvent(event);
  }

  Event.chain = chain;

  function fromNodeEventEmitter(emitter, eventName) {
    var map = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (id) {
      return id;
    };

    var fn = function fn() {
      return result.fire(map.apply(void 0, arguments));
    };

    var onFirstListenerAdd = function onFirstListenerAdd() {
      return emitter.on(eventName, fn);
    };

    var onLastListenerRemove = function onLastListenerRemove() {
      return emitter.removeListener(eventName, fn);
    };

    var result = new event_Emitter({
      onFirstListenerAdd: onFirstListenerAdd,
      onLastListenerRemove: onLastListenerRemove
    });
    return result.event;
  }

  Event.fromNodeEventEmitter = fromNodeEventEmitter;

  function fromDOMEventEmitter(emitter, eventName) {
    var map = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (id) {
      return id;
    };

    var fn = function fn() {
      return result.fire(map.apply(void 0, arguments));
    };

    var onFirstListenerAdd = function onFirstListenerAdd() {
      return emitter.addEventListener(eventName, fn);
    };

    var onLastListenerRemove = function onLastListenerRemove() {
      return emitter.removeEventListener(eventName, fn);
    };

    var result = new event_Emitter({
      onFirstListenerAdd: onFirstListenerAdd,
      onLastListenerRemove: onLastListenerRemove
    });
    return result.event;
  }

  Event.fromDOMEventEmitter = fromDOMEventEmitter;

  function fromPromise(promise) {
    var emitter = new event_Emitter();
    var shouldEmit = false;
    promise.then(undefined, function () {
      return null;
    }).then(function () {
      if (!shouldEmit) {
        setTimeout(function () {
          return emitter.fire(undefined);
        }, 0);
      } else {
        emitter.fire(undefined);
      }
    });
    shouldEmit = true;
    return emitter.event;
  }

  Event.fromPromise = fromPromise;

  function toPromise(event) {
    return new Promise(function (c) {
      return _once(event)(c);
    });
  }

  Event.toPromise = toPromise;
})(event_Event || (event_Event = {}));

var _globalLeakWarningThreshold = -1;

var event_LeakageMonitor = /*#__PURE__*/function () {
  function LeakageMonitor(customThreshold) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.random().toString(18).slice(2, 5);

    _classCallCheck(this, LeakageMonitor);

    this.customThreshold = customThreshold;
    this.name = name;
    this._warnCountdown = 0;
  }

  _createClass(LeakageMonitor, [{
    key: "dispose",
    value: function dispose() {
      if (this._stacks) {
        this._stacks.clear();
      }
    }
  }, {
    key: "check",
    value: function check(listenerCount) {
      var _this = this;

      var threshold = _globalLeakWarningThreshold;

      if (typeof this.customThreshold === 'number') {
        threshold = this.customThreshold;
      }

      if (threshold <= 0 || listenerCount < threshold) {
        return undefined;
      }

      if (!this._stacks) {
        this._stacks = new Map();
      }

      var stack = new Error().stack.split('\n').slice(3).join('\n');
      var count = this._stacks.get(stack) || 0;

      this._stacks.set(stack, count + 1);

      this._warnCountdown -= 1;

      if (this._warnCountdown <= 0) {
        // only warn on first exceed and then every time the limit
        // is exceeded by 50% again
        this._warnCountdown = threshold * 0.5; // find most frequent listener and print warning

        var topStack;
        var topCount = 0;

        var _iterator = _createForOfIteratorHelper(this._stacks),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
                _stack = _step$value[0],
                _count = _step$value[1];

            if (!topStack || topCount < _count) {
              topStack = _stack;
              topCount = _count;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        console.warn("[".concat(this.name, "] potential listener LEAK detected, having ").concat(listenerCount, " listeners already. MOST frequent listener (").concat(topCount, "):"));
        console.warn(topStack);
      }

      return function () {
        var count = _this._stacks.get(stack) || 0;

        _this._stacks.set(stack, count - 1);
      };
    }
  }]);

  return LeakageMonitor;
}();
/**
 * The Emitter can be used to expose an Event to the public
 * to fire it from the insides.
 * Sample:
    class Document {

        private readonly _onDidChange = new Emitter<(value:string)=>any>();

        public onDidChange = this._onDidChange.event;

        // getter-style
        // get onDidChange(): Event<(value:string)=>any> {
        // 	return this._onDidChange.event;
        // }

        private _doIt() {
            //...
            this._onDidChange.fire(value);
        }
    }
 */


var event_Emitter = /*#__PURE__*/function () {
  function Emitter(options) {
    _classCallCheck(this, Emitter);

    this._disposed = false;
    this._options = options;
    this._leakageMon = _globalLeakWarningThreshold > 0 ? new event_LeakageMonitor(this._options && this._options.leakWarningThreshold) : undefined;
  }
  /**
   * For the public to allow to subscribe
   * to events from this Emitter
   */


  _createClass(Emitter, [{
    key: "fire",

    /**
     * To be kept private to fire an event to
     * subscribers
     */
    value: function fire(event) {
      if (this._listeners) {
        // put all [listener,event]-pairs into delivery queue
        // then emit all event. an inner/nested event might be
        // the driver of this
        if (!this._deliveryQueue) {
          this._deliveryQueue = new linkedList_LinkedList();
        }

        var _iterator2 = _createForOfIteratorHelper(this._listeners),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _listener = _step2.value;

            this._deliveryQueue.push([_listener, event]);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        while (this._deliveryQueue.size > 0) {
          var _this$_deliveryQueue$ = this._deliveryQueue.shift(),
              _this$_deliveryQueue$2 = _slicedToArray(_this$_deliveryQueue$, 2),
              listener = _this$_deliveryQueue$2[0],
              _event = _this$_deliveryQueue$2[1];

          try {
            if (typeof listener === 'function') {
              listener.call(undefined, _event);
            } else {
              listener[0].call(listener[1], _event);
            }
          } catch (e) {
            onUnexpectedError(e);
          }
        }
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this._listeners) {
        this._listeners.clear();
      }

      if (this._deliveryQueue) {
        this._deliveryQueue.clear();
      }

      if (this._leakageMon) {
        this._leakageMon.dispose();
      }

      this._disposed = true;
    }
  }, {
    key: "event",
    get: function get() {
      var _this2 = this;

      if (!this._event) {
        this._event = function (listener, thisArgs, disposables) {
          if (!_this2._listeners) {
            _this2._listeners = new linkedList_LinkedList();
          }

          var firstListener = _this2._listeners.isEmpty();

          if (firstListener && _this2._options && _this2._options.onFirstListenerAdd) {
            _this2._options.onFirstListenerAdd(_this2);
          }

          var remove = _this2._listeners.push(!thisArgs ? listener : [listener, thisArgs]);

          if (firstListener && _this2._options && _this2._options.onFirstListenerDidAdd) {
            _this2._options.onFirstListenerDidAdd(_this2);
          }

          if (_this2._options && _this2._options.onListenerDidAdd) {
            _this2._options.onListenerDidAdd(_this2, listener, thisArgs);
          } // check and record this emitter for potential leakage


          var removeMonitor;

          if (_this2._leakageMon) {
            removeMonitor = _this2._leakageMon.check(_this2._listeners.size);
          }

          var result;
          result = {
            dispose: function dispose() {
              if (removeMonitor) {
                removeMonitor();
              }

              result.dispose = Emitter._noop;

              if (!_this2._disposed) {
                remove();

                if (_this2._options && _this2._options.onLastListenerRemove) {
                  var hasListeners = _this2._listeners && !_this2._listeners.isEmpty();

                  if (!hasListeners) {
                    _this2._options.onLastListenerRemove(_this2);
                  }
                }
              }
            }
          };

          if (disposables instanceof lifecycle_DisposableStore) {
            disposables.add(result);
          } else if (Array.isArray(disposables)) {
            disposables.push(result);
          }

          return result;
        };
      }

      return this._event;
    }
  }]);

  return Emitter;
}();

event_Emitter._noop = function () {};

var event_PauseableEmitter = /*#__PURE__*/function (_Emitter) {
  _inherits(PauseableEmitter, _Emitter);

  var _super = _createSuper(PauseableEmitter);

  function PauseableEmitter(options) {
    var _this3;

    _classCallCheck(this, PauseableEmitter);

    _this3 = _super.call(this, options);
    _this3._isPaused = 0;
    _this3._eventQueue = new linkedList_LinkedList();
    _this3._mergeFn = options && options.merge;
    return _this3;
  }

  _createClass(PauseableEmitter, [{
    key: "pause",
    value: function pause() {
      this._isPaused++;
    }
  }, {
    key: "resume",
    value: function resume() {
      if (this._isPaused !== 0 && --this._isPaused === 0) {
        if (this._mergeFn) {
          // use the merge function to create a single composite
          // event. make a copy in case firing pauses this emitter
          var events = this._eventQueue.toArray();

          this._eventQueue.clear();

          get_get(_getPrototypeOf(PauseableEmitter.prototype), "fire", this).call(this, this._mergeFn(events));
        } else {
          // no merging, fire each event individually and test
          // that this emitter isn't paused halfway through
          while (!this._isPaused && this._eventQueue.size !== 0) {
            get_get(_getPrototypeOf(PauseableEmitter.prototype), "fire", this).call(this, this._eventQueue.shift());
          }
        }
      }
    }
  }, {
    key: "fire",
    value: function fire(event) {
      if (this._listeners) {
        if (this._isPaused !== 0) {
          this._eventQueue.push(event);
        } else {
          get_get(_getPrototypeOf(PauseableEmitter.prototype), "fire", this).call(this, event);
        }
      }
    }
  }]);

  return PauseableEmitter;
}(event_Emitter);
/**
 * The EventBufferer is useful in situations in which you want
 * to delay firing your events during some code.
 * You can wrap that code and be sure that the event will not
 * be fired during that wrap.
 *
 * ```
 * const emitter: Emitter;
 * const delayer = new EventDelayer();
 * const delayedEvent = delayer.wrapEvent(emitter.event);
 *
 * delayedEvent(console.log);
 *
 * delayer.bufferEvents(() => {
 *   emitter.fire(); // event will not be fired yet
 * });
 *
 * // event will only be fired at this point
 * ```
 */

var event_EventBufferer = /*#__PURE__*/function () {
  function EventBufferer() {
    _classCallCheck(this, EventBufferer);

    this.buffers = [];
  }

  _createClass(EventBufferer, [{
    key: "wrapEvent",
    value: function wrapEvent(event) {
      var _this4 = this;

      return function (listener, thisArgs, disposables) {
        return event(function (i) {
          var buffer = _this4.buffers[_this4.buffers.length - 1];

          if (buffer) {
            buffer.push(function () {
              return listener.call(thisArgs, i);
            });
          } else {
            listener.call(thisArgs, i);
          }
        }, undefined, disposables);
      };
    }
  }, {
    key: "bufferEvents",
    value: function bufferEvents(fn) {
      var buffer = [];
      this.buffers.push(buffer);
      var r = fn();
      this.buffers.pop();
      buffer.forEach(function (flush) {
        return flush();
      });
      return r;
    }
  }]);

  return EventBufferer;
}();
/**
 * A Relay is an event forwarder which functions as a replugabble event pipe.
 * Once created, you can connect an input event to it and it will simply forward
 * events from that input event through its own `event` property. The `input`
 * can be changed at any point in time.
 */

var event_Relay = /*#__PURE__*/function () {
  function Relay() {
    var _this5 = this;

    _classCallCheck(this, Relay);

    this.listening = false;
    this.inputEvent = event_Event.None;
    this.inputEventListener = lifecycle_Disposable.None;
    this.emitter = new event_Emitter({
      onFirstListenerDidAdd: function onFirstListenerDidAdd() {
        _this5.listening = true;
        _this5.inputEventListener = _this5.inputEvent(_this5.emitter.fire, _this5.emitter);
      },
      onLastListenerRemove: function onLastListenerRemove() {
        _this5.listening = false;

        _this5.inputEventListener.dispose();
      }
    });
    this.event = this.emitter.event;
  }

  _createClass(Relay, [{
    key: "dispose",
    value: function dispose() {
      this.inputEventListener.dispose();
      this.emitter.dispose();
    }
  }, {
    key: "input",
    set: function set(event) {
      this.inputEvent = event;

      if (this.listening) {
        this.inputEventListener.dispose();
        this.inputEventListener = event(this.emitter.fire, this.emitter);
      }
    }
  }]);

  return Relay;
}();
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/arrays.js



/**
 * Returns the last element of an array.
 * @param array The array.
 * @param n Which element from the end (default is zero).
 */
function tail(array) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return array[array.length - (1 + n)];
}
function tail2(arr) {
  if (arr.length === 0) {
    throw new Error('Invalid tail call');
  }

  return [arr.slice(0, arr.length - 1), arr[arr.length - 1]];
}
function equals(one, other) {
  var itemEquals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (a, b) {
    return a === b;
  };

  if (one === other) {
    return true;
  }

  if (!one || !other) {
    return false;
  }

  if (one.length !== other.length) {
    return false;
  }

  for (var i = 0, len = one.length; i < len; i++) {
    if (!itemEquals(one[i], other[i])) {
      return false;
    }
  }

  return true;
}
function binarySearch(array, key, comparator) {
  var low = 0,
      high = array.length - 1;

  while (low <= high) {
    var mid = (low + high) / 2 | 0;
    var comp = comparator(array[mid], key);

    if (comp < 0) {
      low = mid + 1;
    } else if (comp > 0) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return -(low + 1);
}
/**
 * Takes a sorted array and a function p. The array is sorted in such a way that all elements where p(x) is false
 * are located before all elements where p(x) is true.
 * @returns the least x for which p(x) is true or array.length if no element fullfills the given function.
 */

function findFirstInSorted(array, p) {
  var low = 0,
      high = array.length;

  if (high === 0) {
    return 0; // no children
  }

  while (low < high) {
    var mid = Math.floor((low + high) / 2);

    if (p(array[mid])) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}
/**
 * Like `Array#sort` but always stable. Usually runs a little slower `than Array#sort`
 * so only use this when actually needing stable sort.
 */

function mergeSort(data, compare) {
  _sort(data, compare, 0, data.length - 1, []);

  return data;
}

function _merge(a, compare, lo, mid, hi, aux) {
  var leftIdx = lo,
      rightIdx = mid + 1;

  for (var i = lo; i <= hi; i++) {
    aux[i] = a[i];
  }

  for (var _i = lo; _i <= hi; _i++) {
    if (leftIdx > mid) {
      // left side consumed
      a[_i] = aux[rightIdx++];
    } else if (rightIdx > hi) {
      // right side consumed
      a[_i] = aux[leftIdx++];
    } else if (compare(aux[rightIdx], aux[leftIdx]) < 0) {
      // right element is less -> comes first
      a[_i] = aux[rightIdx++];
    } else {
      // left element comes first (less or equal)
      a[_i] = aux[leftIdx++];
    }
  }
}

function _sort(a, compare, lo, hi, aux) {
  if (hi <= lo) {
    return;
  }

  var mid = lo + (hi - lo) / 2 | 0;

  _sort(a, compare, lo, mid, aux);

  _sort(a, compare, mid + 1, hi, aux);

  if (compare(a[mid], a[mid + 1]) <= 0) {
    // left and right are sorted and if the last-left element is less
    // or equals than the first-right element there is nothing else
    // to do
    return;
  }

  _merge(a, compare, lo, mid, hi, aux);
}

function groupBy(data, compare) {
  var result = [];
  var currentGroup = undefined;

  var _iterator = _createForOfIteratorHelper(mergeSort(data.slice(0), compare)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;

      if (!currentGroup || compare(currentGroup[0], element) !== 0) {
        currentGroup = [element];
        result.push(currentGroup);
      } else {
        currentGroup.push(element);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}
/**
 * @returns New array with all falsy values removed. The original array IS NOT modified.
 */

function coalesce(array) {
  return array.filter(function (e) {
    return !!e;
  });
}
/**
 * @returns false if the provided object is an array and not empty.
 */

function isFalsyOrEmpty(obj) {
  return !Array.isArray(obj) || obj.length === 0;
}
function isNonEmptyArray(obj) {
  return Array.isArray(obj) && obj.length > 0;
}
/**
 * Removes duplicates from the given array. The optional keyFn allows to specify
 * how elements are checked for equalness by returning a unique string for each.
 */

function distinct(array, keyFn) {
  if (!keyFn) {
    return array.filter(function (element, position) {
      return array.indexOf(element) === position;
    });
  }

  var seen = Object.create(null);
  return array.filter(function (elem) {
    var key = keyFn(elem);

    if (seen[key]) {
      return false;
    }

    seen[key] = true;
    return true;
  });
}
function distinctES6(array) {
  var seen = new Set();
  return array.filter(function (element) {
    if (seen.has(element)) {
      return false;
    }

    seen.add(element);
    return true;
  });
}
/**
 * @deprecated ES6: use `Array.findIndex`
 */

function firstIndex(array, fn) {
  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    if (fn(element)) {
      return i;
    }
  }

  return -1;
}
function arrays_first(array, fn) {
  var notFoundValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var index = firstIndex(array, fn);
  return index < 0 ? notFoundValue : array[index];
}
function firstOrDefault(array, notFoundValue) {
  return array.length > 0 ? array[0] : notFoundValue;
}
function flatten(arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray(arr));
}
function arrays_range(arg, to) {
  var from = typeof to === 'number' ? arg : 0;

  if (typeof to === 'number') {
    from = arg;
  } else {
    from = 0;
    to = arg;
  }

  var result = [];

  if (from <= to) {
    for (var i = from; i < to; i++) {
      result.push(i);
    }
  } else {
    for (var _i2 = from; _i2 > to; _i2--) {
      result.push(_i2);
    }
  }

  return result;
}
/**
 * Insert `insertArr` inside `target` at `insertIndex`.
 * Please don't touch unless you understand https://jsperf.com/inserting-an-array-within-an-array
 */

function arrayInsert(target, insertIndex, insertArr) {
  var before = target.slice(0, insertIndex);
  var after = target.slice(insertIndex);
  return before.concat(insertArr, after);
}
/**
 * Pushes an element to the start of the array, if found.
 */

function pushToStart(arr, value) {
  var index = arr.indexOf(value);

  if (index > -1) {
    arr.splice(index, 1);
    arr.unshift(value);
  }
}
/**
 * Pushes an element to the end of the array, if found.
 */

function pushToEnd(arr, value) {
  var index = arr.indexOf(value);

  if (index > -1) {
    arr.splice(index, 1);
    arr.push(value);
  }
}
function asArray(x) {
  return Array.isArray(x) ? x : [x];
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/strings.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function isFalsyOrWhitespace(str) {
  if (!str || typeof str !== 'string') {
    return true;
  }

  return str.trim().length === 0;
}
/**
 * @deprecated ES6: use `String.padStart`
 */

function pad(n, l) {
  var _char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';

  var str = '' + n;
  var r = [str];

  for (var i = str.length; i < l; i++) {
    r.push(_char);
  }

  return r.reverse().join('');
}
var _formatRegexp = /{(\d+)}/g;
/**
 * Helper to produce a string with a variable number of arguments. Insert variable segments
 * into the string using the {n} notation where N is the index of the argument following the string.
 * @param value string to which formatting is applied
 * @param args replacements for {n}-entries
 */

function format(value) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args.length === 0) {
    return value;
  }

  return value.replace(_formatRegexp, function (match, group) {
    var idx = parseInt(group, 10);
    return isNaN(idx) || idx < 0 || idx >= args.length ? match : args[idx];
  });
}
/**
 * Converts HTML characters inside the string to use entities instead. Makes the string safe from
 * being used e.g. in HTMLElement.innerHTML.
 */

function strings_escape(html) {
  return html.replace(/[<>&]/g, function (match) {
    switch (match) {
      case '<':
        return '&lt;';

      case '>':
        return '&gt;';

      case '&':
        return '&amp;';

      default:
        return match;
    }
  });
}
/**
 * Escapes regular expression characters in a given string
 */

function escapeRegExpCharacters(value) {
  return value.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&');
}
/**
 * Removes all occurrences of needle from the beginning and end of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim (default is a blank)
 */

function trim(haystack) {
  var needle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
  var trimmed = ltrim(haystack, needle);
  return rtrim(trimmed, needle);
}
/**
 * Removes all occurrences of needle from the beginning of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */

function ltrim(haystack, needle) {
  if (!haystack || !needle) {
    return haystack;
  }

  var needleLen = needle.length;

  if (needleLen === 0 || haystack.length === 0) {
    return haystack;
  }

  var offset = 0;

  while (haystack.indexOf(needle, offset) === offset) {
    offset = offset + needleLen;
  }

  return haystack.substring(offset);
}
/**
 * Removes all occurrences of needle from the end of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */

function rtrim(haystack, needle) {
  if (!haystack || !needle) {
    return haystack;
  }

  var needleLen = needle.length,
      haystackLen = haystack.length;

  if (needleLen === 0 || haystackLen === 0) {
    return haystack;
  }

  var offset = haystackLen,
      idx = -1;

  while (true) {
    idx = haystack.lastIndexOf(needle, offset - 1);

    if (idx === -1 || idx + needleLen !== offset) {
      break;
    }

    if (idx === 0) {
      return '';
    }

    offset = idx;
  }

  return haystack.substring(0, offset);
}
function convertSimple2RegExpPattern(pattern) {
  return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
}
function stripWildcards(pattern) {
  return pattern.replace(/\*/g, '');
}
/**
 * @deprecated ES6: use `String.startsWith`
 */

function startsWith(haystack, needle) {
  if (haystack.length < needle.length) {
    return false;
  }

  if (haystack === needle) {
    return true;
  }

  for (var i = 0; i < needle.length; i++) {
    if (haystack[i] !== needle[i]) {
      return false;
    }
  }

  return true;
}
/**
 * @deprecated ES6: use `String.endsWith`
 */

function endsWith(haystack, needle) {
  var diff = haystack.length - needle.length;

  if (diff > 0) {
    return haystack.indexOf(needle, diff) === diff;
  } else if (diff === 0) {
    return haystack === needle;
  } else {
    return false;
  }
}
function createRegExp(searchString, isRegex) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!searchString) {
    throw new Error('Cannot create regex from empty string');
  }

  if (!isRegex) {
    searchString = escapeRegExpCharacters(searchString);
  }

  if (options.wholeWord) {
    if (!/\B/.test(searchString.charAt(0))) {
      searchString = '\\b' + searchString;
    }

    if (!/\B/.test(searchString.charAt(searchString.length - 1))) {
      searchString = searchString + '\\b';
    }
  }

  var modifiers = '';

  if (options.global) {
    modifiers += 'g';
  }

  if (!options.matchCase) {
    modifiers += 'i';
  }

  if (options.multiline) {
    modifiers += 'm';
  }

  if (options.unicode) {
    modifiers += 'u';
  }

  return new RegExp(searchString, modifiers);
}
function regExpLeadsToEndlessLoop(regexp) {
  // Exit early if it's one of these special cases which are meant to match
  // against an empty string
  if (regexp.source === '^' || regexp.source === '^$' || regexp.source === '$' || regexp.source === '^\\s*$') {
    return false;
  } // We check against an empty string. If the regular expression doesn't advance
  // (e.g. ends in an endless loop) it will match an empty string.


  var match = regexp.exec('');
  return !!(match && regexp.lastIndex === 0);
}
function regExpFlags(regexp) {
  return (regexp.global ? 'g' : '') + (regexp.ignoreCase ? 'i' : '') + (regexp.multiline ? 'm' : '') + (regexp
  /* standalone editor compilation */
  .unicode ? 'u' : '');
}
/**
 * Returns first index of the string that is not whitespace.
 * If string is empty or contains only whitespaces, returns -1
 */

function firstNonWhitespaceIndex(str) {
  for (var i = 0, len = str.length; i < len; i++) {
    var chCode = str.charCodeAt(i);

    if (chCode !== 32
    /* Space */
    && chCode !== 9
    /* Tab */
    ) {
        return i;
      }
  }

  return -1;
}
/**
 * Returns the leading whitespace of the string.
 * If the string contains only whitespaces, returns entire string
 */

function getLeadingWhitespace(str) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : str.length;

  for (var i = start; i < end; i++) {
    var chCode = str.charCodeAt(i);

    if (chCode !== 32
    /* Space */
    && chCode !== 9
    /* Tab */
    ) {
        return str.substring(start, i);
      }
  }

  return str.substring(start, end);
}
/**
 * Returns last index of the string that is not whitespace.
 * If string is empty or contains only whitespaces, returns -1
 */

function lastNonWhitespaceIndex(str) {
  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : str.length - 1;

  for (var i = startIndex; i >= 0; i--) {
    var chCode = str.charCodeAt(i);

    if (chCode !== 32
    /* Space */
    && chCode !== 9
    /* Tab */
    ) {
        return i;
      }
  }

  return -1;
}
function strings_compare(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}
function compareSubstring(a, b) {
  var aStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var aEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : a.length;
  var bStart = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var bEnd = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : b.length;

  for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
    var codeA = a.charCodeAt(aStart);
    var codeB = b.charCodeAt(bStart);

    if (codeA < codeB) {
      return -1;
    } else if (codeA > codeB) {
      return 1;
    }
  }

  var aLen = aEnd - aStart;
  var bLen = bEnd - bStart;

  if (aLen < bLen) {
    return -1;
  } else if (aLen > bLen) {
    return 1;
  }

  return 0;
}
function compareIgnoreCase(a, b) {
  return compareSubstringIgnoreCase(a, b, 0, a.length, 0, b.length);
}
function compareSubstringIgnoreCase(a, b) {
  var aStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var aEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : a.length;
  var bStart = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var bEnd = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : b.length;

  for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
    var codeA = a.charCodeAt(aStart);
    var codeB = b.charCodeAt(bStart);

    if (codeA === codeB) {
      // equal
      continue;
    }

    var diff = codeA - codeB;

    if (diff === 32 && isUpperAsciiLetter(codeB)) {
      //codeB =[65-90] && codeA =[97-122]
      continue;
    } else if (diff === -32 && isUpperAsciiLetter(codeA)) {
      //codeB =[97-122] && codeA =[65-90]
      continue;
    }

    if (isLowerAsciiLetter(codeA) && isLowerAsciiLetter(codeB)) {
      //
      return diff;
    } else {
      return compareSubstring(a.toLowerCase(), b.toLowerCase(), aStart, aEnd, bStart, bEnd);
    }
  }

  var aLen = aEnd - aStart;
  var bLen = bEnd - bStart;

  if (aLen < bLen) {
    return -1;
  } else if (aLen > bLen) {
    return 1;
  }

  return 0;
}
function isLowerAsciiLetter(code) {
  return code >= 97
  /* a */
  && code <= 122
  /* z */
  ;
}
function isUpperAsciiLetter(code) {
  return code >= 65
  /* A */
  && code <= 90
  /* Z */
  ;
}

function isAsciiLetter(code) {
  return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
}

function equalsIgnoreCase(a, b) {
  return a.length === b.length && doEqualsIgnoreCase(a, b);
}

function doEqualsIgnoreCase(a, b) {
  var stopAt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : a.length;

  for (var i = 0; i < stopAt; i++) {
    var codeA = a.charCodeAt(i);
    var codeB = b.charCodeAt(i);

    if (codeA === codeB) {
      continue;
    } // a-z A-Z


    if (isAsciiLetter(codeA) && isAsciiLetter(codeB)) {
      var diff = Math.abs(codeA - codeB);

      if (diff !== 0 && diff !== 32) {
        return false;
      }
    } // Any other charcode
    else {
        if (String.fromCharCode(codeA).toLowerCase() !== String.fromCharCode(codeB).toLowerCase()) {
          return false;
        }
      }
  }

  return true;
}

function startsWithIgnoreCase(str, candidate) {
  var candidateLength = candidate.length;

  if (candidate.length > str.length) {
    return false;
  }

  return doEqualsIgnoreCase(str, candidate, candidateLength);
}
/**
 * @returns the length of the common prefix of the two strings.
 */

function commonPrefixLength(a, b) {
  var i,
      len = Math.min(a.length, b.length);

  for (i = 0; i < len; i++) {
    if (a.charCodeAt(i) !== b.charCodeAt(i)) {
      return i;
    }
  }

  return len;
}
/**
 * @returns the length of the common suffix of the two strings.
 */

function commonSuffixLength(a, b) {
  var i,
      len = Math.min(a.length, b.length);
  var aLastIndex = a.length - 1;
  var bLastIndex = b.length - 1;

  for (i = 0; i < len; i++) {
    if (a.charCodeAt(aLastIndex - i) !== b.charCodeAt(bLastIndex - i)) {
      return i;
    }
  }

  return len;
}
/**
 * See http://en.wikipedia.org/wiki/Surrogate_pair
 */

function isHighSurrogate(charCode) {
  return 0xD800 <= charCode && charCode <= 0xDBFF;
}
/**
 * See http://en.wikipedia.org/wiki/Surrogate_pair
 */

function isLowSurrogate(charCode) {
  return 0xDC00 <= charCode && charCode <= 0xDFFF;
}
/**
 * See http://en.wikipedia.org/wiki/Surrogate_pair
 */

function computeCodePoint(highSurrogate, lowSurrogate) {
  return (highSurrogate - 0xD800 << 10) + (lowSurrogate - 0xDC00) + 0x10000;
}
/**
 * get the code point that begins at offset `offset`
 */

function getNextCodePoint(str, len, offset) {
  var charCode = str.charCodeAt(offset);

  if (isHighSurrogate(charCode) && offset + 1 < len) {
    var nextCharCode = str.charCodeAt(offset + 1);

    if (isLowSurrogate(nextCharCode)) {
      return computeCodePoint(charCode, nextCharCode);
    }
  }

  return charCode;
}
/**
 * get the code point that ends right before offset `offset`
 */

function getPrevCodePoint(str, offset) {
  var charCode = str.charCodeAt(offset - 1);

  if (isLowSurrogate(charCode) && offset > 1) {
    var prevCharCode = str.charCodeAt(offset - 2);

    if (isHighSurrogate(prevCharCode)) {
      return computeCodePoint(prevCharCode, charCode);
    }
  }

  return charCode;
}

function nextCharLength(str, offset) {
  var graphemeBreakTree = strings_GraphemeBreakTree.getInstance();
  var initialOffset = offset;
  var len = str.length;
  var initialCodePoint = getNextCodePoint(str, len, offset);
  offset += initialCodePoint >= 65536
  /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */
  ? 2 : 1;
  var graphemeBreakType = graphemeBreakTree.getGraphemeBreakType(initialCodePoint);

  while (offset < len) {
    var nextCodePoint = getNextCodePoint(str, len, offset);
    var nextGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(nextCodePoint);

    if (breakBetweenGraphemeBreakType(graphemeBreakType, nextGraphemeBreakType)) {
      break;
    }

    offset += nextCodePoint >= 65536
    /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */
    ? 2 : 1;
    graphemeBreakType = nextGraphemeBreakType;
  }

  return offset - initialOffset;
}
function prevCharLength(str, offset) {
  var graphemeBreakTree = strings_GraphemeBreakTree.getInstance();
  var initialOffset = offset;
  var initialCodePoint = getPrevCodePoint(str, offset);
  offset -= initialCodePoint >= 65536
  /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */
  ? 2 : 1;
  var graphemeBreakType = graphemeBreakTree.getGraphemeBreakType(initialCodePoint);

  while (offset > 0) {
    var prevCodePoint = getPrevCodePoint(str, offset);
    var prevGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(prevCodePoint);

    if (breakBetweenGraphemeBreakType(prevGraphemeBreakType, graphemeBreakType)) {
      break;
    }

    offset -= prevCodePoint >= 65536
    /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */
    ? 2 : 1;
    graphemeBreakType = prevGraphemeBreakType;
  }

  return initialOffset - offset;
}
/**
 * A manual decoding of a UTF8 string.
 * Use only in environments which do not offer native conversion methods!
 */

function decodeUTF8(buffer) {
  // https://en.wikipedia.org/wiki/UTF-8
  var len = buffer.byteLength;
  var result = [];
  var offset = 0;

  while (offset < len) {
    var v0 = buffer[offset];
    var codePoint = void 0;

    if (v0 >= 240 && offset + 3 < len) {
      // 4 bytes
      codePoint = (buffer[offset++] & 7) << 18 >>> 0 | (buffer[offset++] & 63) << 12 >>> 0 | (buffer[offset++] & 63) << 6 >>> 0 | (buffer[offset++] & 63) << 0 >>> 0;
    } else if (v0 >= 224 && offset + 2 < len) {
      // 3 bytes
      codePoint = (buffer[offset++] & 15) << 12 >>> 0 | (buffer[offset++] & 63) << 6 >>> 0 | (buffer[offset++] & 63) << 0 >>> 0;
    } else if (v0 >= 192 && offset + 1 < len) {
      // 2 bytes
      codePoint = (buffer[offset++] & 31) << 6 >>> 0 | (buffer[offset++] & 63) << 0 >>> 0;
    } else {
      // 1 byte
      codePoint = buffer[offset++];
    }

    if (codePoint >= 0 && codePoint <= 0xD7FF || codePoint >= 0xE000 && codePoint <= 0xFFFF) {
      // Basic Multilingual Plane
      result.push(String.fromCharCode(codePoint));
    } else if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
      // Supplementary Planes
      var uPrime = codePoint - 0x10000;
      var w1 = 0xD800 + ((uPrime & 1047552) >>> 10);
      var w2 = 0xDC00 + ((uPrime & 1023) >>> 0);
      result.push(String.fromCharCode(w1));
      result.push(String.fromCharCode(w2));
    } else {
      // illegal code point
      result.push(String.fromCharCode(0xFFFD));
    }
  }

  return result.join('');
}
/**
 * Generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-rtl-test.js
 */

var CONTAINS_RTL = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
/**
 * Returns true if `str` contains any Unicode character that is classified as "R" or "AL".
 */

function containsRTL(str) {
  return CONTAINS_RTL.test(str);
}
/**
 * Generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-emoji-test.js
 */

var CONTAINS_EMOJI = /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD00-\uDDFF\uDE70-\uDE73\uDE78-\uDE82\uDE90-\uDE95])/;
function containsEmoji(str) {
  return CONTAINS_EMOJI.test(str);
}
var IS_BASIC_ASCII = /^[\t\n\r\x20-\x7E]*$/;
/**
 * Returns true if `str` contains only basic ASCII characters in the range 32 - 126 (including 32 and 126) or \n, \r, \t
 */

function isBasicASCII(str) {
  return IS_BASIC_ASCII.test(str);
}
var UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/; // LINE SEPARATOR (LS) or PARAGRAPH SEPARATOR (PS)

/**
 * Returns true if `str` contains unusual line terminators, like LS or PS
 */

function containsUnusualLineTerminators(str) {
  return UNUSUAL_LINE_TERMINATORS.test(str);
}
function containsFullWidthCharacter(str) {
  for (var i = 0, len = str.length; i < len; i++) {
    if (isFullWidthCharacter(str.charCodeAt(i))) {
      return true;
    }
  }

  return false;
}
function isFullWidthCharacter(charCode) {
  // Do a cheap trick to better support wrapping of wide characters, treat them as 2 columns
  // http://jrgraphix.net/research/unicode_blocks.php
  //          2E80 — 2EFF   CJK Radicals Supplement
  //          2F00 — 2FDF   Kangxi Radicals
  //          2FF0 — 2FFF   Ideographic Description Characters
  //          3000 — 303F   CJK Symbols and Punctuation
  //          3040 — 309F   Hiragana
  //          30A0 — 30FF   Katakana
  //          3100 — 312F   Bopomofo
  //          3130 — 318F   Hangul Compatibility Jamo
  //          3190 — 319F   Kanbun
  //          31A0 — 31BF   Bopomofo Extended
  //          31F0 — 31FF   Katakana Phonetic Extensions
  //          3200 — 32FF   Enclosed CJK Letters and Months
  //          3300 — 33FF   CJK Compatibility
  //          3400 — 4DBF   CJK Unified Ideographs Extension A
  //          4DC0 — 4DFF   Yijing Hexagram Symbols
  //          4E00 — 9FFF   CJK Unified Ideographs
  //          A000 — A48F   Yi Syllables
  //          A490 — A4CF   Yi Radicals
  //          AC00 — D7AF   Hangul Syllables
  // [IGNORE] D800 — DB7F   High Surrogates
  // [IGNORE] DB80 — DBFF   High Private Use Surrogates
  // [IGNORE] DC00 — DFFF   Low Surrogates
  // [IGNORE] E000 — F8FF   Private Use Area
  //          F900 — FAFF   CJK Compatibility Ideographs
  // [IGNORE] FB00 — FB4F   Alphabetic Presentation Forms
  // [IGNORE] FB50 — FDFF   Arabic Presentation Forms-A
  // [IGNORE] FE00 — FE0F   Variation Selectors
  // [IGNORE] FE20 — FE2F   Combining Half Marks
  // [IGNORE] FE30 — FE4F   CJK Compatibility Forms
  // [IGNORE] FE50 — FE6F   Small Form Variants
  // [IGNORE] FE70 — FEFF   Arabic Presentation Forms-B
  //          FF00 — FFEF   Halfwidth and Fullwidth Forms
  //               [https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms]
  //               of which FF01 - FF5E fullwidth ASCII of 21 to 7E
  // [IGNORE]    and FF65 - FFDC halfwidth of Katakana and Hangul
  // [IGNORE] FFF0 — FFFF   Specials
  charCode = +charCode; // @perf

  return charCode >= 0x2E80 && charCode <= 0xD7AF || charCode >= 0xF900 && charCode <= 0xFAFF || charCode >= 0xFF01 && charCode <= 0xFF5E;
}
/**
 * A fast function (therefore imprecise) to check if code points are emojis.
 * Generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-emoji-test.js
 */

function isEmojiImprecise(x) {
  return x >= 0x1F1E6 && x <= 0x1F1FF || x >= 9728 && x <= 10175 || x >= 127744 && x <= 128591 || x >= 128640 && x <= 128764 || x >= 128992 && x <= 129003 || x >= 129280 && x <= 129535 || x >= 129648 && x <= 129651 || x >= 129656 && x <= 129666 || x >= 129680 && x <= 129685;
} // -- UTF-8 BOM

var UTF8_BOM_CHARACTER = String.fromCharCode(65279
/* UTF8_BOM */
);
function startsWithUTF8BOM(str) {
  return !!(str && str.length > 0 && str.charCodeAt(0) === 65279
  /* UTF8_BOM */
  );
}
function containsUppercaseCharacter(target) {
  var ignoreEscapedChars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!target) {
    return false;
  }

  if (ignoreEscapedChars) {
    target = target.replace(/\\./g, '');
  }

  return target.toLowerCase() !== target;
}
/**
 * Produces 'a'-'z', followed by 'A'-'Z'... followed by 'a'-'z', etc.
 */

function singleLetterHash(n) {
  var LETTERS_CNT = 90
  /* Z */
  - 65
  /* A */
  + 1;
  n = n % (2 * LETTERS_CNT);

  if (n < LETTERS_CNT) {
    return String.fromCharCode(97
    /* a */
    + n);
  }

  return String.fromCharCode(65
  /* A */
  + n - LETTERS_CNT);
} //#region Unicode Grapheme Break

function getGraphemeBreakType(codePoint) {
  var graphemeBreakTree = strings_GraphemeBreakTree.getInstance();
  return graphemeBreakTree.getGraphemeBreakType(codePoint);
}
function breakBetweenGraphemeBreakType(breakTypeA, breakTypeB) {
  // http://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundary_Rules
  // !!! Let's make the common case a bit faster
  if (breakTypeA === 0
  /* Other */
  ) {
      // see https://www.unicode.org/Public/13.0.0/ucd/auxiliary/GraphemeBreakTest-13.0.0d10.html#table
      return breakTypeB !== 5
      /* Extend */
      && breakTypeB !== 7
      /* SpacingMark */
      ;
    } // Do not break between a CR and LF. Otherwise, break before and after controls.
  // GB3                                        CR × LF
  // GB4                       (Control | CR | LF) ÷
  // GB5                                           ÷ (Control | CR | LF)


  if (breakTypeA === 2
  /* CR */
  ) {
      if (breakTypeB === 3
      /* LF */
      ) {
          return false; // GB3
        }
    }

  if (breakTypeA === 4
  /* Control */
  || breakTypeA === 2
  /* CR */
  || breakTypeA === 3
  /* LF */
  ) {
      return true; // GB4
    }

  if (breakTypeB === 4
  /* Control */
  || breakTypeB === 2
  /* CR */
  || breakTypeB === 3
  /* LF */
  ) {
      return true; // GB5
    } // Do not break Hangul syllable sequences.
  // GB6                                         L × (L | V | LV | LVT)
  // GB7                                  (LV | V) × (V | T)
  // GB8                                 (LVT | T) × T


  if (breakTypeA === 8
  /* L */
  ) {
      if (breakTypeB === 8
      /* L */
      || breakTypeB === 9
      /* V */
      || breakTypeB === 11
      /* LV */
      || breakTypeB === 12
      /* LVT */
      ) {
          return false; // GB6
        }
    }

  if (breakTypeA === 11
  /* LV */
  || breakTypeA === 9
  /* V */
  ) {
      if (breakTypeB === 9
      /* V */
      || breakTypeB === 10
      /* T */
      ) {
          return false; // GB7
        }
    }

  if (breakTypeA === 12
  /* LVT */
  || breakTypeA === 10
  /* T */
  ) {
      if (breakTypeB === 10
      /* T */
      ) {
          return false; // GB8
        }
    } // Do not break before extending characters or ZWJ.
  // GB9                                           × (Extend | ZWJ)


  if (breakTypeB === 5
  /* Extend */
  || breakTypeB === 13
  /* ZWJ */
  ) {
      return false; // GB9
    } // The GB9a and GB9b rules only apply to extended grapheme clusters:
  // Do not break before SpacingMarks, or after Prepend characters.
  // GB9a                                          × SpacingMark
  // GB9b                                  Prepend ×


  if (breakTypeB === 7
  /* SpacingMark */
  ) {
      return false; // GB9a
    }

  if (breakTypeA === 1
  /* Prepend */
  ) {
      return false; // GB9b
    } // Do not break within emoji modifier sequences or emoji zwj sequences.
  // GB11    \p{Extended_Pictographic} Extend* ZWJ × \p{Extended_Pictographic}


  if (breakTypeA === 13
  /* ZWJ */
  && breakTypeB === 14
  /* Extended_Pictographic */
  ) {
      // Note: we are not implementing the rule entirely here to avoid introducing states
      return false; // GB11
    } // GB12                          sot (RI RI)* RI × RI
  // GB13                        [^RI] (RI RI)* RI × RI


  if (breakTypeA === 6
  /* Regional_Indicator */
  && breakTypeB === 6
  /* Regional_Indicator */
  ) {
      // Note: we are not implementing the rule entirely here to avoid introducing states
      return false; // GB12 & GB13
    } // GB999                                     Any ÷ Any


  return true;
}

var strings_GraphemeBreakTree = /*#__PURE__*/function () {
  function GraphemeBreakTree() {
    _classCallCheck(this, GraphemeBreakTree);

    this._data = getGraphemeBreakRawData();
  }

  _createClass(GraphemeBreakTree, [{
    key: "getGraphemeBreakType",
    value: function getGraphemeBreakType(codePoint) {
      // !!! Let's make 7bit ASCII a bit faster: 0..31
      if (codePoint < 32) {
        if (codePoint === 10
        /* LineFeed */
        ) {
            return 3
            /* LF */
            ;
          }

        if (codePoint === 13
        /* CarriageReturn */
        ) {
            return 2
            /* CR */
            ;
          }

        return 4
        /* Control */
        ;
      } // !!! Let's make 7bit ASCII a bit faster: 32..126


      if (codePoint < 127) {
        return 0
        /* Other */
        ;
      }

      var data = this._data;
      var nodeCount = data.length / 3;
      var nodeIndex = 1;

      while (nodeIndex <= nodeCount) {
        if (codePoint < data[3 * nodeIndex]) {
          // go left
          nodeIndex = 2 * nodeIndex;
        } else if (codePoint > data[3 * nodeIndex + 1]) {
          // go right
          nodeIndex = 2 * nodeIndex + 1;
        } else {
          // hit
          return data[3 * nodeIndex + 2];
        }
      }

      return 0
      /* Other */
      ;
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!GraphemeBreakTree._INSTANCE) {
        GraphemeBreakTree._INSTANCE = new GraphemeBreakTree();
      }

      return GraphemeBreakTree._INSTANCE;
    }
  }]);

  return GraphemeBreakTree;
}();

strings_GraphemeBreakTree._INSTANCE = null;

function getGraphemeBreakRawData() {
  // generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-grapheme-break.js
  return JSON.parse('[0,0,0,51592,51592,11,44424,44424,11,72251,72254,5,7150,7150,7,48008,48008,11,55176,55176,11,128420,128420,14,3276,3277,5,9979,9980,14,46216,46216,11,49800,49800,11,53384,53384,11,70726,70726,5,122915,122916,5,129320,129327,14,2558,2558,5,5906,5908,5,9762,9763,14,43360,43388,8,45320,45320,11,47112,47112,11,48904,48904,11,50696,50696,11,52488,52488,11,54280,54280,11,70082,70083,1,71350,71350,7,73111,73111,5,127892,127893,14,128726,128727,14,129473,129474,14,2027,2035,5,2901,2902,5,3784,3789,5,6754,6754,5,8418,8420,5,9877,9877,14,11088,11088,14,44008,44008,5,44872,44872,11,45768,45768,11,46664,46664,11,47560,47560,11,48456,48456,11,49352,49352,11,50248,50248,11,51144,51144,11,52040,52040,11,52936,52936,11,53832,53832,11,54728,54728,11,69811,69814,5,70459,70460,5,71096,71099,7,71998,71998,5,72874,72880,5,119149,119149,7,127374,127374,14,128335,128335,14,128482,128482,14,128765,128767,14,129399,129400,14,129680,129685,14,1476,1477,5,2377,2380,7,2759,2760,5,3137,3140,7,3458,3459,7,4153,4154,5,6432,6434,5,6978,6978,5,7675,7679,5,9723,9726,14,9823,9823,14,9919,9923,14,10035,10036,14,42736,42737,5,43596,43596,5,44200,44200,11,44648,44648,11,45096,45096,11,45544,45544,11,45992,45992,11,46440,46440,11,46888,46888,11,47336,47336,11,47784,47784,11,48232,48232,11,48680,48680,11,49128,49128,11,49576,49576,11,50024,50024,11,50472,50472,11,50920,50920,11,51368,51368,11,51816,51816,11,52264,52264,11,52712,52712,11,53160,53160,11,53608,53608,11,54056,54056,11,54504,54504,11,54952,54952,11,68108,68111,5,69933,69940,5,70197,70197,7,70498,70499,7,70845,70845,5,71229,71229,5,71727,71735,5,72154,72155,5,72344,72345,5,73023,73029,5,94095,94098,5,121403,121452,5,126981,127182,14,127538,127546,14,127990,127990,14,128391,128391,14,128445,128449,14,128500,128505,14,128752,128752,14,129160,129167,14,129356,129356,14,129432,129442,14,129648,129651,14,129751,131069,14,173,173,4,1757,1757,1,2274,2274,1,2494,2494,5,2641,2641,5,2876,2876,5,3014,3016,7,3262,3262,7,3393,3396,5,3570,3571,7,3968,3972,5,4228,4228,7,6086,6086,5,6679,6680,5,6912,6915,5,7080,7081,5,7380,7392,5,8252,8252,14,9096,9096,14,9748,9749,14,9784,9786,14,9833,9850,14,9890,9894,14,9938,9938,14,9999,9999,14,10085,10087,14,12349,12349,14,43136,43137,7,43454,43456,7,43755,43755,7,44088,44088,11,44312,44312,11,44536,44536,11,44760,44760,11,44984,44984,11,45208,45208,11,45432,45432,11,45656,45656,11,45880,45880,11,46104,46104,11,46328,46328,11,46552,46552,11,46776,46776,11,47000,47000,11,47224,47224,11,47448,47448,11,47672,47672,11,47896,47896,11,48120,48120,11,48344,48344,11,48568,48568,11,48792,48792,11,49016,49016,11,49240,49240,11,49464,49464,11,49688,49688,11,49912,49912,11,50136,50136,11,50360,50360,11,50584,50584,11,50808,50808,11,51032,51032,11,51256,51256,11,51480,51480,11,51704,51704,11,51928,51928,11,52152,52152,11,52376,52376,11,52600,52600,11,52824,52824,11,53048,53048,11,53272,53272,11,53496,53496,11,53720,53720,11,53944,53944,11,54168,54168,11,54392,54392,11,54616,54616,11,54840,54840,11,55064,55064,11,65438,65439,5,69633,69633,5,69837,69837,1,70018,70018,7,70188,70190,7,70368,70370,7,70465,70468,7,70712,70719,5,70835,70840,5,70850,70851,5,71132,71133,5,71340,71340,7,71458,71461,5,71985,71989,7,72002,72002,7,72193,72202,5,72281,72283,5,72766,72766,7,72885,72886,5,73104,73105,5,92912,92916,5,113824,113827,4,119173,119179,5,121505,121519,5,125136,125142,5,127279,127279,14,127489,127490,14,127570,127743,14,127900,127901,14,128254,128254,14,128369,128370,14,128400,128400,14,128425,128432,14,128468,128475,14,128489,128494,14,128715,128720,14,128745,128745,14,128759,128760,14,129004,129023,14,129296,129304,14,129340,129342,14,129388,129392,14,129404,129407,14,129454,129455,14,129485,129487,14,129659,129663,14,129719,129727,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2363,2363,7,2402,2403,5,2507,2508,7,2622,2624,7,2691,2691,7,2786,2787,5,2881,2884,5,3006,3006,5,3072,3072,5,3170,3171,5,3267,3268,7,3330,3331,7,3406,3406,1,3538,3540,5,3655,3662,5,3897,3897,5,4038,4038,5,4184,4185,5,4352,4447,8,6068,6069,5,6155,6157,5,6448,6449,7,6742,6742,5,6783,6783,5,6966,6970,5,7042,7042,7,7143,7143,7,7212,7219,5,7412,7412,5,8206,8207,4,8294,8303,4,8596,8601,14,9410,9410,14,9742,9742,14,9757,9757,14,9770,9770,14,9794,9794,14,9828,9828,14,9855,9855,14,9882,9882,14,9900,9903,14,9929,9933,14,9963,9967,14,9987,9988,14,10006,10006,14,10062,10062,14,10175,10175,14,11744,11775,5,42607,42607,5,43043,43044,7,43263,43263,5,43444,43445,7,43569,43570,5,43698,43700,5,43766,43766,5,44032,44032,11,44144,44144,11,44256,44256,11,44368,44368,11,44480,44480,11,44592,44592,11,44704,44704,11,44816,44816,11,44928,44928,11,45040,45040,11,45152,45152,11,45264,45264,11,45376,45376,11,45488,45488,11,45600,45600,11,45712,45712,11,45824,45824,11,45936,45936,11,46048,46048,11,46160,46160,11,46272,46272,11,46384,46384,11,46496,46496,11,46608,46608,11,46720,46720,11,46832,46832,11,46944,46944,11,47056,47056,11,47168,47168,11,47280,47280,11,47392,47392,11,47504,47504,11,47616,47616,11,47728,47728,11,47840,47840,11,47952,47952,11,48064,48064,11,48176,48176,11,48288,48288,11,48400,48400,11,48512,48512,11,48624,48624,11,48736,48736,11,48848,48848,11,48960,48960,11,49072,49072,11,49184,49184,11,49296,49296,11,49408,49408,11,49520,49520,11,49632,49632,11,49744,49744,11,49856,49856,11,49968,49968,11,50080,50080,11,50192,50192,11,50304,50304,11,50416,50416,11,50528,50528,11,50640,50640,11,50752,50752,11,50864,50864,11,50976,50976,11,51088,51088,11,51200,51200,11,51312,51312,11,51424,51424,11,51536,51536,11,51648,51648,11,51760,51760,11,51872,51872,11,51984,51984,11,52096,52096,11,52208,52208,11,52320,52320,11,52432,52432,11,52544,52544,11,52656,52656,11,52768,52768,11,52880,52880,11,52992,52992,11,53104,53104,11,53216,53216,11,53328,53328,11,53440,53440,11,53552,53552,11,53664,53664,11,53776,53776,11,53888,53888,11,54000,54000,11,54112,54112,11,54224,54224,11,54336,54336,11,54448,54448,11,54560,54560,11,54672,54672,11,54784,54784,11,54896,54896,11,55008,55008,11,55120,55120,11,64286,64286,5,66272,66272,5,68900,68903,5,69762,69762,7,69817,69818,5,69927,69931,5,70003,70003,5,70070,70078,5,70094,70094,7,70194,70195,7,70206,70206,5,70400,70401,5,70463,70463,7,70475,70477,7,70512,70516,5,70722,70724,5,70832,70832,5,70842,70842,5,70847,70848,5,71088,71089,7,71102,71102,7,71219,71226,5,71231,71232,5,71342,71343,7,71453,71455,5,71463,71467,5,71737,71738,5,71995,71996,5,72000,72000,7,72145,72147,7,72160,72160,5,72249,72249,7,72273,72278,5,72330,72342,5,72752,72758,5,72850,72871,5,72882,72883,5,73018,73018,5,73031,73031,5,73109,73109,5,73461,73462,7,94031,94031,5,94192,94193,7,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,126976,126979,14,127184,127231,14,127344,127345,14,127405,127461,14,127514,127514,14,127561,127567,14,127778,127779,14,127896,127896,14,127985,127986,14,127995,127999,5,128326,128328,14,128360,128366,14,128378,128378,14,128394,128397,14,128405,128406,14,128422,128423,14,128435,128443,14,128453,128464,14,128479,128480,14,128484,128487,14,128496,128498,14,128640,128709,14,128723,128724,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129096,129103,14,129292,129292,14,129311,129311,14,129329,129330,14,129344,129349,14,129360,129374,14,129394,129394,14,129402,129402,14,129413,129425,14,129445,129450,14,129466,129471,14,129483,129483,14,129511,129535,14,129653,129655,14,129667,129670,14,129705,129711,14,129731,129743,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2307,2307,7,2366,2368,7,2382,2383,7,2434,2435,7,2497,2500,5,2519,2519,5,2563,2563,7,2631,2632,5,2677,2677,5,2750,2752,7,2763,2764,7,2817,2817,5,2879,2879,5,2891,2892,7,2914,2915,5,3008,3008,5,3021,3021,5,3076,3076,5,3146,3149,5,3202,3203,7,3264,3265,7,3271,3272,7,3298,3299,5,3390,3390,5,3402,3404,7,3426,3427,5,3535,3535,5,3544,3550,7,3635,3635,7,3763,3763,7,3893,3893,5,3953,3966,5,3981,3991,5,4145,4145,7,4157,4158,5,4209,4212,5,4237,4237,5,4520,4607,10,5970,5971,5,6071,6077,5,6089,6099,5,6277,6278,5,6439,6440,5,6451,6456,7,6683,6683,5,6744,6750,5,6765,6770,7,6846,6846,5,6964,6964,5,6972,6972,5,7019,7027,5,7074,7077,5,7083,7085,5,7146,7148,7,7154,7155,7,7222,7223,5,7394,7400,5,7416,7417,5,8204,8204,5,8233,8233,4,8288,8292,4,8413,8416,5,8482,8482,14,8986,8987,14,9193,9203,14,9654,9654,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9775,14,9792,9792,14,9800,9811,14,9825,9826,14,9831,9831,14,9852,9853,14,9872,9873,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9936,9936,14,9941,9960,14,9974,9974,14,9982,9985,14,9992,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10145,10145,14,11013,11015,14,11503,11505,5,12334,12335,5,12951,12951,14,42612,42621,5,43014,43014,5,43047,43047,7,43204,43205,5,43335,43345,5,43395,43395,7,43450,43451,7,43561,43566,5,43573,43574,5,43644,43644,5,43710,43711,5,43758,43759,7,44005,44005,5,44012,44012,7,44060,44060,11,44116,44116,11,44172,44172,11,44228,44228,11,44284,44284,11,44340,44340,11,44396,44396,11,44452,44452,11,44508,44508,11,44564,44564,11,44620,44620,11,44676,44676,11,44732,44732,11,44788,44788,11,44844,44844,11,44900,44900,11,44956,44956,11,45012,45012,11,45068,45068,11,45124,45124,11,45180,45180,11,45236,45236,11,45292,45292,11,45348,45348,11,45404,45404,11,45460,45460,11,45516,45516,11,45572,45572,11,45628,45628,11,45684,45684,11,45740,45740,11,45796,45796,11,45852,45852,11,45908,45908,11,45964,45964,11,46020,46020,11,46076,46076,11,46132,46132,11,46188,46188,11,46244,46244,11,46300,46300,11,46356,46356,11,46412,46412,11,46468,46468,11,46524,46524,11,46580,46580,11,46636,46636,11,46692,46692,11,46748,46748,11,46804,46804,11,46860,46860,11,46916,46916,11,46972,46972,11,47028,47028,11,47084,47084,11,47140,47140,11,47196,47196,11,47252,47252,11,47308,47308,11,47364,47364,11,47420,47420,11,47476,47476,11,47532,47532,11,47588,47588,11,47644,47644,11,47700,47700,11,47756,47756,11,47812,47812,11,47868,47868,11,47924,47924,11,47980,47980,11,48036,48036,11,48092,48092,11,48148,48148,11,48204,48204,11,48260,48260,11,48316,48316,11,48372,48372,11,48428,48428,11,48484,48484,11,48540,48540,11,48596,48596,11,48652,48652,11,48708,48708,11,48764,48764,11,48820,48820,11,48876,48876,11,48932,48932,11,48988,48988,11,49044,49044,11,49100,49100,11,49156,49156,11,49212,49212,11,49268,49268,11,49324,49324,11,49380,49380,11,49436,49436,11,49492,49492,11,49548,49548,11,49604,49604,11,49660,49660,11,49716,49716,11,49772,49772,11,49828,49828,11,49884,49884,11,49940,49940,11,49996,49996,11,50052,50052,11,50108,50108,11,50164,50164,11,50220,50220,11,50276,50276,11,50332,50332,11,50388,50388,11,50444,50444,11,50500,50500,11,50556,50556,11,50612,50612,11,50668,50668,11,50724,50724,11,50780,50780,11,50836,50836,11,50892,50892,11,50948,50948,11,51004,51004,11,51060,51060,11,51116,51116,11,51172,51172,11,51228,51228,11,51284,51284,11,51340,51340,11,51396,51396,11,51452,51452,11,51508,51508,11,51564,51564,11,51620,51620,11,51676,51676,11,51732,51732,11,51788,51788,11,51844,51844,11,51900,51900,11,51956,51956,11,52012,52012,11,52068,52068,11,52124,52124,11,52180,52180,11,52236,52236,11,52292,52292,11,52348,52348,11,52404,52404,11,52460,52460,11,52516,52516,11,52572,52572,11,52628,52628,11,52684,52684,11,52740,52740,11,52796,52796,11,52852,52852,11,52908,52908,11,52964,52964,11,53020,53020,11,53076,53076,11,53132,53132,11,53188,53188,11,53244,53244,11,53300,53300,11,53356,53356,11,53412,53412,11,53468,53468,11,53524,53524,11,53580,53580,11,53636,53636,11,53692,53692,11,53748,53748,11,53804,53804,11,53860,53860,11,53916,53916,11,53972,53972,11,54028,54028,11,54084,54084,11,54140,54140,11,54196,54196,11,54252,54252,11,54308,54308,11,54364,54364,11,54420,54420,11,54476,54476,11,54532,54532,11,54588,54588,11,54644,54644,11,54700,54700,11,54756,54756,11,54812,54812,11,54868,54868,11,54924,54924,11,54980,54980,11,55036,55036,11,55092,55092,11,55148,55148,11,55216,55238,9,65056,65071,5,65529,65531,4,68097,68099,5,68159,68159,5,69446,69456,5,69688,69702,5,69808,69810,7,69815,69816,7,69821,69821,1,69888,69890,5,69932,69932,7,69957,69958,7,70016,70017,5,70067,70069,7,70079,70080,7,70089,70092,5,70095,70095,5,70191,70193,5,70196,70196,5,70198,70199,5,70367,70367,5,70371,70378,5,70402,70403,7,70462,70462,5,70464,70464,5,70471,70472,7,70487,70487,5,70502,70508,5,70709,70711,7,70720,70721,7,70725,70725,7,70750,70750,5,70833,70834,7,70841,70841,7,70843,70844,7,70846,70846,7,70849,70849,7,71087,71087,5,71090,71093,5,71100,71101,5,71103,71104,5,71216,71218,7,71227,71228,7,71230,71230,7,71339,71339,5,71341,71341,5,71344,71349,5,71351,71351,5,71456,71457,7,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123628,123631,5,125252,125258,5,126980,126980,14,127183,127183,14,127245,127247,14,127340,127343,14,127358,127359,14,127377,127386,14,127462,127487,6,127491,127503,14,127535,127535,14,127548,127551,14,127568,127569,14,127744,127777,14,127780,127891,14,127894,127895,14,127897,127899,14,127902,127984,14,127987,127989,14,127991,127994,14,128000,128253,14,128255,128317,14,128329,128334,14,128336,128359,14,128367,128368,14,128371,128377,14,128379,128390,14,128392,128393,14,128398,128399,14,128401,128404,14,128407,128419,14,128421,128421,14,128424,128424,14,128433,128434,14,128444,128444,14,128450,128452,14,128465,128467,14,128476,128478,14,128481,128481,14,128483,128483,14,128488,128488,14,128495,128495,14,128499,128499,14,128506,128591,14,128710,128714,14,128721,128722,14,128725,128725,14,128728,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129664,129666,14,129671,129679,14,129686,129704,14,129712,129718,14,129728,129730,14,129744,129750,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2259,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3134,3136,5,3142,3144,5,3157,3158,5,3201,3201,5,3260,3260,5,3263,3263,5,3266,3266,5,3270,3270,5,3274,3275,7,3285,3286,5,3328,3329,5,3387,3388,5,3391,3392,7,3398,3400,7,3405,3405,5,3415,3415,5,3457,3457,5,3530,3530,5,3536,3537,7,3542,3542,5,3551,3551,5,3633,3633,5,3636,3642,5,3761,3761,5,3764,3772,5,3864,3865,5,3895,3895,5,3902,3903,7,3967,3967,7,3974,3975,5,3993,4028,5,4141,4144,5,4146,4151,5,4155,4156,7,4182,4183,7,4190,4192,5,4226,4226,5,4229,4230,5,4253,4253,5,4448,4519,9,4957,4959,5,5938,5940,5,6002,6003,5,6070,6070,7,6078,6085,7,6087,6088,7,6109,6109,5,6158,6158,4,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6848,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7673,5,8203,8203,4,8205,8205,13,8232,8232,4,8234,8238,4,8265,8265,14,8293,8293,4,8400,8412,5,8417,8417,5,8421,8432,5,8505,8505,14,8617,8618,14,9000,9000,14,9167,9167,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9776,9783,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9935,14,9937,9937,14,9939,9940,14,9961,9962,14,9968,9973,14,9975,9978,14,9981,9981,14,9986,9986,14,9989,9989,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10084,14,10133,10135,14,10160,10160,14,10548,10549,14,11035,11036,14,11093,11093,14,11647,11647,5,12330,12333,5,12336,12336,14,12441,12442,5,12953,12953,14,42608,42610,5,42654,42655,5,43010,43010,5,43019,43019,5,43045,43046,5,43052,43052,5,43188,43203,7,43232,43249,5,43302,43309,5,43346,43347,7,43392,43394,5,43443,43443,5,43446,43449,5,43452,43453,5,43493,43493,5,43567,43568,7,43571,43572,7,43587,43587,5,43597,43597,7,43696,43696,5,43703,43704,5,43713,43713,5,43756,43757,5,43765,43765,7,44003,44004,7,44006,44007,7,44009,44010,7,44013,44013,5,44033,44059,12,44061,44087,12,44089,44115,12,44117,44143,12,44145,44171,12,44173,44199,12,44201,44227,12,44229,44255,12,44257,44283,12,44285,44311,12,44313,44339,12,44341,44367,12,44369,44395,12,44397,44423,12,44425,44451,12,44453,44479,12,44481,44507,12,44509,44535,12,44537,44563,12,44565,44591,12,44593,44619,12,44621,44647,12,44649,44675,12,44677,44703,12,44705,44731,12,44733,44759,12,44761,44787,12,44789,44815,12,44817,44843,12,44845,44871,12,44873,44899,12,44901,44927,12,44929,44955,12,44957,44983,12,44985,45011,12,45013,45039,12,45041,45067,12,45069,45095,12,45097,45123,12,45125,45151,12,45153,45179,12,45181,45207,12,45209,45235,12,45237,45263,12,45265,45291,12,45293,45319,12,45321,45347,12,45349,45375,12,45377,45403,12,45405,45431,12,45433,45459,12,45461,45487,12,45489,45515,12,45517,45543,12,45545,45571,12,45573,45599,12,45601,45627,12,45629,45655,12,45657,45683,12,45685,45711,12,45713,45739,12,45741,45767,12,45769,45795,12,45797,45823,12,45825,45851,12,45853,45879,12,45881,45907,12,45909,45935,12,45937,45963,12,45965,45991,12,45993,46019,12,46021,46047,12,46049,46075,12,46077,46103,12,46105,46131,12,46133,46159,12,46161,46187,12,46189,46215,12,46217,46243,12,46245,46271,12,46273,46299,12,46301,46327,12,46329,46355,12,46357,46383,12,46385,46411,12,46413,46439,12,46441,46467,12,46469,46495,12,46497,46523,12,46525,46551,12,46553,46579,12,46581,46607,12,46609,46635,12,46637,46663,12,46665,46691,12,46693,46719,12,46721,46747,12,46749,46775,12,46777,46803,12,46805,46831,12,46833,46859,12,46861,46887,12,46889,46915,12,46917,46943,12,46945,46971,12,46973,46999,12,47001,47027,12,47029,47055,12,47057,47083,12,47085,47111,12,47113,47139,12,47141,47167,12,47169,47195,12,47197,47223,12,47225,47251,12,47253,47279,12,47281,47307,12,47309,47335,12,47337,47363,12,47365,47391,12,47393,47419,12,47421,47447,12,47449,47475,12,47477,47503,12,47505,47531,12,47533,47559,12,47561,47587,12,47589,47615,12,47617,47643,12,47645,47671,12,47673,47699,12,47701,47727,12,47729,47755,12,47757,47783,12,47785,47811,12,47813,47839,12,47841,47867,12,47869,47895,12,47897,47923,12,47925,47951,12,47953,47979,12,47981,48007,12,48009,48035,12,48037,48063,12,48065,48091,12,48093,48119,12,48121,48147,12,48149,48175,12,48177,48203,12,48205,48231,12,48233,48259,12,48261,48287,12,48289,48315,12,48317,48343,12,48345,48371,12,48373,48399,12,48401,48427,12,48429,48455,12,48457,48483,12,48485,48511,12,48513,48539,12,48541,48567,12,48569,48595,12,48597,48623,12,48625,48651,12,48653,48679,12,48681,48707,12,48709,48735,12,48737,48763,12,48765,48791,12,48793,48819,12,48821,48847,12,48849,48875,12,48877,48903,12,48905,48931,12,48933,48959,12,48961,48987,12,48989,49015,12,49017,49043,12,49045,49071,12,49073,49099,12,49101,49127,12,49129,49155,12,49157,49183,12,49185,49211,12,49213,49239,12,49241,49267,12,49269,49295,12,49297,49323,12,49325,49351,12,49353,49379,12,49381,49407,12,49409,49435,12,49437,49463,12,49465,49491,12,49493,49519,12,49521,49547,12,49549,49575,12,49577,49603,12,49605,49631,12,49633,49659,12,49661,49687,12,49689,49715,12,49717,49743,12,49745,49771,12,49773,49799,12,49801,49827,12,49829,49855,12,49857,49883,12,49885,49911,12,49913,49939,12,49941,49967,12,49969,49995,12,49997,50023,12,50025,50051,12,50053,50079,12,50081,50107,12,50109,50135,12,50137,50163,12,50165,50191,12,50193,50219,12,50221,50247,12,50249,50275,12,50277,50303,12,50305,50331,12,50333,50359,12,50361,50387,12,50389,50415,12,50417,50443,12,50445,50471,12,50473,50499,12,50501,50527,12,50529,50555,12,50557,50583,12,50585,50611,12,50613,50639,12,50641,50667,12,50669,50695,12,50697,50723,12,50725,50751,12,50753,50779,12,50781,50807,12,50809,50835,12,50837,50863,12,50865,50891,12,50893,50919,12,50921,50947,12,50949,50975,12,50977,51003,12,51005,51031,12,51033,51059,12,51061,51087,12,51089,51115,12,51117,51143,12,51145,51171,12,51173,51199,12,51201,51227,12,51229,51255,12,51257,51283,12,51285,51311,12,51313,51339,12,51341,51367,12,51369,51395,12,51397,51423,12,51425,51451,12,51453,51479,12,51481,51507,12,51509,51535,12,51537,51563,12,51565,51591,12,51593,51619,12,51621,51647,12,51649,51675,12,51677,51703,12,51705,51731,12,51733,51759,12,51761,51787,12,51789,51815,12,51817,51843,12,51845,51871,12,51873,51899,12,51901,51927,12,51929,51955,12,51957,51983,12,51985,52011,12,52013,52039,12,52041,52067,12,52069,52095,12,52097,52123,12,52125,52151,12,52153,52179,12,52181,52207,12,52209,52235,12,52237,52263,12,52265,52291,12,52293,52319,12,52321,52347,12,52349,52375,12,52377,52403,12,52405,52431,12,52433,52459,12,52461,52487,12,52489,52515,12,52517,52543,12,52545,52571,12,52573,52599,12,52601,52627,12,52629,52655,12,52657,52683,12,52685,52711,12,52713,52739,12,52741,52767,12,52769,52795,12,52797,52823,12,52825,52851,12,52853,52879,12,52881,52907,12,52909,52935,12,52937,52963,12,52965,52991,12,52993,53019,12,53021,53047,12,53049,53075,12,53077,53103,12,53105,53131,12,53133,53159,12,53161,53187,12,53189,53215,12,53217,53243,12,53245,53271,12,53273,53299,12,53301,53327,12,53329,53355,12,53357,53383,12,53385,53411,12,53413,53439,12,53441,53467,12,53469,53495,12,53497,53523,12,53525,53551,12,53553,53579,12,53581,53607,12,53609,53635,12,53637,53663,12,53665,53691,12,53693,53719,12,53721,53747,12,53749,53775,12,53777,53803,12,53805,53831,12,53833,53859,12,53861,53887,12,53889,53915,12,53917,53943,12,53945,53971,12,53973,53999,12,54001,54027,12,54029,54055,12,54057,54083,12,54085,54111,12,54113,54139,12,54141,54167,12,54169,54195,12,54197,54223,12,54225,54251,12,54253,54279,12,54281,54307,12,54309,54335,12,54337,54363,12,54365,54391,12,54393,54419,12,54421,54447,12,54449,54475,12,54477,54503,12,54505,54531,12,54533,54559,12,54561,54587,12,54589,54615,12,54617,54643,12,54645,54671,12,54673,54699,12,54701,54727,12,54729,54755,12,54757,54783,12,54785,54811,12,54813,54839,12,54841,54867,12,54869,54895,12,54897,54923,12,54925,54951,12,54953,54979,12,54981,55007,12,55009,55035,12,55037,55063,12,55065,55091,12,55093,55119,12,55121,55147,12,55149,55175,12,55177,55203,12,55243,55291,10,65024,65039,5,65279,65279,4,65520,65528,4,66045,66045,5,66422,66426,5,68101,68102,5,68152,68154,5,68325,68326,5,69291,69292,5,69632,69632,7,69634,69634,7,69759,69761,5]');
} //#endregion
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/extpath.js


/**
 * Takes a Windows OS path and changes backward slashes to forward slashes.
 * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
 * Using it on a Linux or MaxOS path might change it.
 */

function toSlashes(osPath) {
  return osPath.replace(/[\\/]/g, posix.sep);
}
function isEqualOrParent(path, candidate, ignoreCase) {
  var separator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : sep;

  if (path === candidate) {
    return true;
  }

  if (!path || !candidate) {
    return false;
  }

  if (candidate.length > path.length) {
    return false;
  }

  if (ignoreCase) {
    var beginsWith = startsWithIgnoreCase(path, candidate);

    if (!beginsWith) {
      return false;
    }

    if (candidate.length === path.length) {
      return true; // same path, different casing
    }

    var sepOffset = candidate.length;

    if (candidate.charAt(candidate.length - 1) === separator) {
      sepOffset--; // adjust the expected sep offset in case our candidate already ends in separator character
    }

    return path.charAt(sepOffset) === separator;
  }

  if (candidate.charAt(candidate.length - 1) !== separator) {
    candidate += separator;
  }

  return path.indexOf(candidate) === 0;
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/network.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var Schemas;

(function (Schemas) {
  /**
   * A schema that is used for models that exist in memory
   * only and that have no correspondence on a server or such.
   */
  Schemas.inMemory = 'inmemory';
  /**
   * A schema that is used for setting files
   */

  Schemas.vscode = 'vscode';
  /**
   * A schema that is used for internal private files
   */

  Schemas.internal = 'private';
  /**
   * A walk-through document.
   */

  Schemas.walkThrough = 'walkThrough';
  /**
   * An embedded code snippet.
   */

  Schemas.walkThroughSnippet = 'walkThroughSnippet';
  Schemas.http = 'http';
  Schemas.https = 'https';
  Schemas.file = 'file';
  Schemas.mailto = 'mailto';
  Schemas.untitled = 'untitled';
  Schemas.data = 'data';
  Schemas.command = 'command';
  Schemas.vscodeRemote = 'vscode-remote';
  Schemas.vscodeRemoteResource = 'vscode-remote-resource';
  Schemas.userData = 'vscode-userdata';
  Schemas.vscodeCustomEditor = 'vscode-custom-editor';
  Schemas.vscodeNotebook = 'vscode-notebook';
  Schemas.vscodeNotebookCell = 'vscode-notebook-cell';
  Schemas.vscodeSettings = 'vscode-settings';
  Schemas.webviewPanel = 'webview-panel';
  /**
   * Scheme used for loading the wrapper html and script in webviews.
   */

  Schemas.vscodeWebview = 'vscode-webview';
  /**
   * Scheme used for loading resources inside of webviews.
   */

  Schemas.vscodeWebviewResource = 'vscode-webview-resource';
  /**
   * Scheme used for extension pages
   */

  Schemas.extension = 'extension';
})(Schemas || (Schemas = {}));

var network_RemoteAuthoritiesImpl = /*#__PURE__*/function () {
  function RemoteAuthoritiesImpl() {
    _classCallCheck(this, RemoteAuthoritiesImpl);

    this._hosts = Object.create(null);
    this._ports = Object.create(null);
    this._connectionTokens = Object.create(null);
    this._preferredWebSchema = 'http';
    this._delegate = null;
  }

  _createClass(RemoteAuthoritiesImpl, [{
    key: "setPreferredWebSchema",
    value: function setPreferredWebSchema(schema) {
      this._preferredWebSchema = schema;
    }
  }, {
    key: "rewrite",
    value: function rewrite(uri) {
      if (this._delegate) {
        return this._delegate(uri);
      }

      var authority = uri.authority;
      var host = this._hosts[authority];

      if (host && host.indexOf(':') !== -1) {
        host = "[".concat(host, "]");
      }

      var port = this._ports[authority];
      var connectionToken = this._connectionTokens[authority];
      var query = "path=".concat(encodeURIComponent(uri.path));

      if (typeof connectionToken === 'string') {
        query += "&tkn=".concat(encodeURIComponent(connectionToken));
      }

      return uri_URI.from({
        scheme: platform["c" /* isWeb */] ? this._preferredWebSchema : Schemas.vscodeRemoteResource,
        authority: "".concat(host, ":").concat(port),
        path: "/vscode-remote-resource",
        query: query
      });
    }
  }]);

  return RemoteAuthoritiesImpl;
}();

var RemoteAuthorities = new network_RemoteAuthoritiesImpl();
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/map.js











/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/




var map_StringIterator = /*#__PURE__*/function () {
  function StringIterator() {
    _classCallCheck(this, StringIterator);

    this._value = '';
    this._pos = 0;
  }

  _createClass(StringIterator, [{
    key: "reset",
    value: function reset(key) {
      this._value = key;
      this._pos = 0;
      return this;
    }
  }, {
    key: "next",
    value: function next() {
      this._pos += 1;
      return this;
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      return this._pos < this._value.length - 1;
    }
  }, {
    key: "cmp",
    value: function cmp(a) {
      var aCode = a.charCodeAt(0);

      var thisCode = this._value.charCodeAt(this._pos);

      return aCode - thisCode;
    }
  }, {
    key: "value",
    value: function value() {
      return this._value[this._pos];
    }
  }]);

  return StringIterator;
}();
var map_PathIterator = /*#__PURE__*/function () {
  function PathIterator() {
    var _splitOnBackslash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var _caseSensitive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, PathIterator);

    this._splitOnBackslash = _splitOnBackslash;
    this._caseSensitive = _caseSensitive;
  }

  _createClass(PathIterator, [{
    key: "reset",
    value: function reset(key) {
      this._value = key.replace(/\\$|\/$/, '');
      this._from = 0;
      this._to = 0;
      return this.next();
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      return this._to < this._value.length;
    }
  }, {
    key: "next",
    value: function next() {
      // this._data = key.split(/[\\/]/).filter(s => !!s);
      this._from = this._to;
      var justSeps = true;

      for (; this._to < this._value.length; this._to++) {
        var ch = this._value.charCodeAt(this._to);

        if (ch === 47
        /* Slash */
        || this._splitOnBackslash && ch === 92
        /* Backslash */
        ) {
            if (justSeps) {
              this._from++;
            } else {
              break;
            }
          } else {
          justSeps = false;
        }
      }

      return this;
    }
  }, {
    key: "cmp",
    value: function cmp(a) {
      return this._caseSensitive ? compareSubstring(a, this._value, 0, a.length, this._from, this._to) : compareSubstringIgnoreCase(a, this._value, 0, a.length, this._from, this._to);
    }
  }, {
    key: "value",
    value: function value() {
      return this._value.substring(this._from, this._to);
    }
  }]);

  return PathIterator;
}();
var map_UriIterator = /*#__PURE__*/function () {
  function UriIterator() {
    _classCallCheck(this, UriIterator);

    this._states = [];
    this._stateIdx = 0;
  }

  _createClass(UriIterator, [{
    key: "reset",
    value: function reset(key) {
      this._value = key;
      this._states = [];

      if (this._value.scheme) {
        this._states.push(1
        /* Scheme */
        );
      }

      if (this._value.authority) {
        this._states.push(2
        /* Authority */
        );
      }

      if (this._value.path) {
        //todo@jrieken the case-sensitive logic is copied form `resources.ts#hasToIgnoreCase`
        // which cannot be used because it depends on this
        var caseSensitive = key.scheme === Schemas.file && platform["a" /* isLinux */];
        this._pathIterator = new map_PathIterator(false, caseSensitive);

        this._pathIterator.reset(key.path);

        if (this._pathIterator.value()) {
          this._states.push(3
          /* Path */
          );
        }
      }

      if (this._value.query) {
        this._states.push(4
        /* Query */
        );
      }

      if (this._value.fragment) {
        this._states.push(5
        /* Fragment */
        );
      }

      this._stateIdx = 0;
      return this;
    }
  }, {
    key: "next",
    value: function next() {
      if (this._states[this._stateIdx] === 3
      /* Path */
      && this._pathIterator.hasNext()) {
        this._pathIterator.next();
      } else {
        this._stateIdx += 1;
      }

      return this;
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      return this._states[this._stateIdx] === 3
      /* Path */
      && this._pathIterator.hasNext() || this._stateIdx < this._states.length - 1;
    }
  }, {
    key: "cmp",
    value: function cmp(a) {
      if (this._states[this._stateIdx] === 1
      /* Scheme */
      ) {
          return strings_compare(a, this._value.scheme);
        } else if (this._states[this._stateIdx] === 2
      /* Authority */
      ) {
          return compareSubstringIgnoreCase(a, this._value.authority);
        } else if (this._states[this._stateIdx] === 3
      /* Path */
      ) {
          return this._pathIterator.cmp(a);
        } else if (this._states[this._stateIdx] === 4
      /* Query */
      ) {
          return strings_compare(a, this._value.query);
        } else if (this._states[this._stateIdx] === 5
      /* Fragment */
      ) {
          return strings_compare(a, this._value.fragment);
        }

      throw new Error();
    }
  }, {
    key: "value",
    value: function value() {
      if (this._states[this._stateIdx] === 1
      /* Scheme */
      ) {
          return this._value.scheme;
        } else if (this._states[this._stateIdx] === 2
      /* Authority */
      ) {
          return this._value.authority;
        } else if (this._states[this._stateIdx] === 3
      /* Path */
      ) {
          return this._pathIterator.value();
        } else if (this._states[this._stateIdx] === 4
      /* Query */
      ) {
          return this._value.query;
        } else if (this._states[this._stateIdx] === 5
      /* Fragment */
      ) {
          return this._value.fragment;
        }

      throw new Error();
    }
  }]);

  return UriIterator;
}();

var map_TernarySearchTreeNode = function TernarySearchTreeNode() {
  _classCallCheck(this, TernarySearchTreeNode);
};

var map_TernarySearchTree = /*#__PURE__*/function () {
  function TernarySearchTree(segments) {
    _classCallCheck(this, TernarySearchTree);

    this._iter = segments;
  }

  _createClass(TernarySearchTree, [{
    key: "clear",
    value: function clear() {
      this._root = undefined;
    }
  }, {
    key: "set",
    value: function set(key, element) {
      var iter = this._iter.reset(key);

      var node;

      if (!this._root) {
        this._root = new map_TernarySearchTreeNode();
        this._root.segment = iter.value();
      }

      node = this._root;

      while (true) {
        var val = iter.cmp(node.segment);

        if (val > 0) {
          // left
          if (!node.left) {
            node.left = new map_TernarySearchTreeNode();
            node.left.segment = iter.value();
          }

          node = node.left;
        } else if (val < 0) {
          // right
          if (!node.right) {
            node.right = new map_TernarySearchTreeNode();
            node.right.segment = iter.value();
          }

          node = node.right;
        } else if (iter.hasNext()) {
          // mid
          iter.next();

          if (!node.mid) {
            node.mid = new map_TernarySearchTreeNode();
            node.mid.segment = iter.value();
          }

          node = node.mid;
        } else {
          break;
        }
      }

      var oldElement = node.value;
      node.value = element;
      node.key = key;
      return oldElement;
    }
  }, {
    key: "get",
    value: function get(key) {
      var iter = this._iter.reset(key);

      var node = this._root;

      while (node) {
        var val = iter.cmp(node.segment);

        if (val > 0) {
          // left
          node = node.left;
        } else if (val < 0) {
          // right
          node = node.right;
        } else if (iter.hasNext()) {
          // mid
          iter.next();
          node = node.mid;
        } else {
          break;
        }
      }

      return node ? node.value : undefined;
    }
  }, {
    key: "findSubstr",
    value: function findSubstr(key) {
      var iter = this._iter.reset(key);

      var node = this._root;
      var candidate = undefined;

      while (node) {
        var val = iter.cmp(node.segment);

        if (val > 0) {
          // left
          node = node.left;
        } else if (val < 0) {
          // right
          node = node.right;
        } else if (iter.hasNext()) {
          // mid
          iter.next();
          candidate = node.value || candidate;
          node = node.mid;
        } else {
          break;
        }
      }

      return node && node.value || candidate;
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      this._forEach(this._root, callback);
    }
  }, {
    key: "_forEach",
    value: function _forEach(node, callback) {
      if (node) {
        // left
        this._forEach(node.left, callback); // node


        if (node.value) {
          // callback(node.value, this._iter.join(parts));
          callback(node.value, node.key);
        } // mid


        this._forEach(node.mid, callback); // right


        this._forEach(node.right, callback);
      }
    }
  }], [{
    key: "forUris",
    value: function forUris() {
      return new TernarySearchTree(new map_UriIterator());
    }
  }, {
    key: "forStrings",
    value: function forStrings() {
      return new TernarySearchTree(new map_StringIterator());
    }
  }]);

  return TernarySearchTree;
}();
var map_ResourceMap = /*#__PURE__*/function () {
  function ResourceMap(mapOrKeyFn, toKey) {
    _classCallCheck(this, ResourceMap);

    this[Symbol.toStringTag] = 'ResourceMap';

    if (mapOrKeyFn instanceof ResourceMap) {
      this.map = new Map(mapOrKeyFn.map);
      this.toKey = toKey !== null && toKey !== void 0 ? toKey : ResourceMap.defaultToKey;
    } else {
      this.map = new Map();
      this.toKey = mapOrKeyFn !== null && mapOrKeyFn !== void 0 ? mapOrKeyFn : ResourceMap.defaultToKey;
    }
  }

  _createClass(ResourceMap, [{
    key: "set",
    value: function set(resource, value) {
      this.map.set(this.toKey(resource), value);
      return this;
    }
  }, {
    key: "get",
    value: function get(resource) {
      return this.map.get(this.toKey(resource));
    }
  }, {
    key: "has",
    value: function has(resource) {
      return this.map.has(this.toKey(resource));
    }
  }, {
    key: "clear",
    value: function clear() {
      this.map.clear();
    }
  }, {
    key: "delete",
    value: function _delete(resource) {
      return this.map["delete"](this.toKey(resource));
    }
  }, {
    key: "forEach",
    value: function forEach(clb, thisArg) {
      if (typeof thisArg !== 'undefined') {
        clb = clb.bind(thisArg);
      }

      var _iterator = _createForOfIteratorHelper(this.map),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              index = _step$value[0],
              value = _step$value[1];

          clb(value, uri_URI.parse(index), this);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "values",
    value: function values() {
      return this.map.values();
    }
  }, {
    key: "keys",
    value: /*#__PURE__*/regenerator_default.a.mark(function keys() {
      var _iterator2, _step2, key;

      return regenerator_default.a.wrap(function keys$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator2 = _createForOfIteratorHelper(this.map.keys());
              _context.prev = 1;

              _iterator2.s();

            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context.next = 9;
                break;
              }

              key = _step2.value;
              _context.next = 7;
              return uri_URI.parse(key);

            case 7:
              _context.next = 3;
              break;

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

              _iterator2.e(_context.t0);

            case 14:
              _context.prev = 14;

              _iterator2.f();

              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, keys, this, [[1, 11, 14, 17]]);
    })
  }, {
    key: "entries",
    value: /*#__PURE__*/regenerator_default.a.mark(function entries() {
      var _iterator3, _step3, tuple;

      return regenerator_default.a.wrap(function entries$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iterator3 = _createForOfIteratorHelper(this.map.entries());
              _context2.prev = 1;

              _iterator3.s();

            case 3:
              if ((_step3 = _iterator3.n()).done) {
                _context2.next = 9;
                break;
              }

              tuple = _step3.value;
              _context2.next = 7;
              return [uri_URI.parse(tuple[0]), tuple[1]];

            case 7:
              _context2.next = 3;
              break;

            case 9:
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);

              _iterator3.e(_context2.t0);

            case 14:
              _context2.prev = 14;

              _iterator3.f();

              return _context2.finish(14);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, entries, this, [[1, 11, 14, 17]]);
    })
  }, {
    key: Symbol.iterator,
    value: /*#__PURE__*/regenerator_default.a.mark(function value() {
      var _iterator4, _step4, item;

      return regenerator_default.a.wrap(function value$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _iterator4 = _createForOfIteratorHelper(this.map);
              _context3.prev = 1;

              _iterator4.s();

            case 3:
              if ((_step4 = _iterator4.n()).done) {
                _context3.next = 9;
                break;
              }

              item = _step4.value;
              _context3.next = 7;
              return [uri_URI.parse(item[0]), item[1]];

            case 7:
              _context3.next = 3;
              break;

            case 9:
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);

              _iterator4.e(_context3.t0);

            case 14:
              _context3.prev = 14;

              _iterator4.f();

              return _context3.finish(14);

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, value, this, [[1, 11, 14, 17]]);
    })
  }, {
    key: "size",
    get: function get() {
      return this.map.size;
    }
  }]);

  return ResourceMap;
}();

map_ResourceMap.defaultToKey = function (resource) {
  return resource.toString();
};

var map_LinkedMap = /*#__PURE__*/function () {
  function LinkedMap() {
    _classCallCheck(this, LinkedMap);

    this[Symbol.toStringTag] = 'LinkedMap';
    this._map = new Map();
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
    this._state = 0;
  }

  _createClass(LinkedMap, [{
    key: "clear",
    value: function clear() {
      this._map.clear();

      this._head = undefined;
      this._tail = undefined;
      this._size = 0;
      this._state++;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return !this._head && !this._tail;
    }
  }, {
    key: "has",
    value: function has(key) {
      return this._map.has(key);
    }
  }, {
    key: "get",
    value: function get(key)
    /* None */
    {
      var touch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var item = this._map.get(key);

      if (!item) {
        return undefined;
      }

      if (touch !== 0
      /* None */
      ) {
          this.touch(item, touch);
        }

      return item.value;
    }
  }, {
    key: "set",
    value: function set(key, value)
    /* None */
    {
      var touch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var item = this._map.get(key);

      if (item) {
        item.value = value;

        if (touch !== 0
        /* None */
        ) {
            this.touch(item, touch);
          }
      } else {
        item = {
          key: key,
          value: value,
          next: undefined,
          previous: undefined
        };

        switch (touch) {
          case 0
          /* None */
          :
            this.addItemLast(item);
            break;

          case 1
          /* AsOld */
          :
            this.addItemFirst(item);
            break;

          case 2
          /* AsNew */
          :
            this.addItemLast(item);
            break;

          default:
            this.addItemLast(item);
            break;
        }

        this._map.set(key, item);

        this._size++;
      }

      return this;
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      return !!this.remove(key);
    }
  }, {
    key: "remove",
    value: function remove(key) {
      var item = this._map.get(key);

      if (!item) {
        return undefined;
      }

      this._map["delete"](key);

      this.removeItem(item);
      this._size--;
      return item.value;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (!this._head && !this._tail) {
        return undefined;
      }

      if (!this._head || !this._tail) {
        throw new Error('Invalid list');
      }

      var item = this._head;

      this._map["delete"](item.key);

      this.removeItem(item);
      this._size--;
      return item.value;
    }
  }, {
    key: "forEach",
    value: function forEach(callbackfn, thisArg) {
      var state = this._state;
      var current = this._head;

      while (current) {
        if (thisArg) {
          callbackfn.bind(thisArg)(current.value, current.key, this);
        } else {
          callbackfn(current.value, current.key, this);
        }

        if (this._state !== state) {
          throw new Error("LinkedMap got modified during iteration.");
        }

        current = current.next;
      }
    }
  }, {
    key: "keys",
    value: function keys() {
      var _iterator5;

      var map = this;
      var state = this._state;
      var current = this._head;
      var iterator = (_iterator5 = {}, _defineProperty(_iterator5, Symbol.iterator, function () {
        return iterator;
      }), _defineProperty(_iterator5, "next", function next() {
        if (map._state !== state) {
          throw new Error("LinkedMap got modified during iteration.");
        }

        if (current) {
          var result = {
            value: current.key,
            done: false
          };
          current = current.next;
          return result;
        } else {
          return {
            value: undefined,
            done: true
          };
        }
      }), _iterator5);
      return iterator;
    }
  }, {
    key: "values",
    value: function values() {
      var _iterator6;

      var map = this;
      var state = this._state;
      var current = this._head;
      var iterator = (_iterator6 = {}, _defineProperty(_iterator6, Symbol.iterator, function () {
        return iterator;
      }), _defineProperty(_iterator6, "next", function next() {
        if (map._state !== state) {
          throw new Error("LinkedMap got modified during iteration.");
        }

        if (current) {
          var result = {
            value: current.value,
            done: false
          };
          current = current.next;
          return result;
        } else {
          return {
            value: undefined,
            done: true
          };
        }
      }), _iterator6);
      return iterator;
    }
  }, {
    key: "entries",
    value: function entries() {
      var _iterator7;

      var map = this;
      var state = this._state;
      var current = this._head;
      var iterator = (_iterator7 = {}, _defineProperty(_iterator7, Symbol.iterator, function () {
        return iterator;
      }), _defineProperty(_iterator7, "next", function next() {
        if (map._state !== state) {
          throw new Error("LinkedMap got modified during iteration.");
        }

        if (current) {
          var result = {
            value: [current.key, current.value],
            done: false
          };
          current = current.next;
          return result;
        } else {
          return {
            value: undefined,
            done: true
          };
        }
      }), _iterator7);
      return iterator;
    }
  }, {
    key: Symbol.iterator,
    value: function value() {
      return this.entries();
    }
  }, {
    key: "trimOld",
    value: function trimOld(newSize) {
      if (newSize >= this.size) {
        return;
      }

      if (newSize === 0) {
        this.clear();
        return;
      }

      var current = this._head;
      var currentSize = this.size;

      while (current && currentSize > newSize) {
        this._map["delete"](current.key);

        current = current.next;
        currentSize--;
      }

      this._head = current;
      this._size = currentSize;

      if (current) {
        current.previous = undefined;
      }

      this._state++;
    }
  }, {
    key: "addItemFirst",
    value: function addItemFirst(item) {
      // First time Insert
      if (!this._head && !this._tail) {
        this._tail = item;
      } else if (!this._head) {
        throw new Error('Invalid list');
      } else {
        item.next = this._head;
        this._head.previous = item;
      }

      this._head = item;
      this._state++;
    }
  }, {
    key: "addItemLast",
    value: function addItemLast(item) {
      // First time Insert
      if (!this._head && !this._tail) {
        this._head = item;
      } else if (!this._tail) {
        throw new Error('Invalid list');
      } else {
        item.previous = this._tail;
        this._tail.next = item;
      }

      this._tail = item;
      this._state++;
    }
  }, {
    key: "removeItem",
    value: function removeItem(item) {
      if (item === this._head && item === this._tail) {
        this._head = undefined;
        this._tail = undefined;
      } else if (item === this._head) {
        // This can only happend if size === 1 which is handle
        // by the case above.
        if (!item.next) {
          throw new Error('Invalid list');
        }

        item.next.previous = undefined;
        this._head = item.next;
      } else if (item === this._tail) {
        // This can only happend if size === 1 which is handle
        // by the case above.
        if (!item.previous) {
          throw new Error('Invalid list');
        }

        item.previous.next = undefined;
        this._tail = item.previous;
      } else {
        var next = item.next;
        var previous = item.previous;

        if (!next || !previous) {
          throw new Error('Invalid list');
        }

        next.previous = previous;
        previous.next = next;
      }

      item.next = undefined;
      item.previous = undefined;
      this._state++;
    }
  }, {
    key: "touch",
    value: function touch(item, _touch) {
      if (!this._head || !this._tail) {
        throw new Error('Invalid list');
      }

      if (_touch !== 1
      /* AsOld */
      && _touch !== 2
      /* AsNew */
      ) {
          return;
        }

      if (_touch === 1
      /* AsOld */
      ) {
          if (item === this._head) {
            return;
          }

          var next = item.next;
          var previous = item.previous; // Unlink the item

          if (item === this._tail) {
            // previous must be defined since item was not head but is tail
            // So there are more than on item in the map
            previous.next = undefined;
            this._tail = previous;
          } else {
            // Both next and previous are not undefined since item was neither head nor tail.
            next.previous = previous;
            previous.next = next;
          } // Insert the node at head


          item.previous = undefined;
          item.next = this._head;
          this._head.previous = item;
          this._head = item;
          this._state++;
        } else if (_touch === 2
      /* AsNew */
      ) {
          if (item === this._tail) {
            return;
          }

          var _next = item.next;
          var _previous = item.previous; // Unlink the item.

          if (item === this._head) {
            // next must be defined since item was not tail but is head
            // So there are more than on item in the map
            _next.previous = undefined;
            this._head = _next;
          } else {
            // Both next and previous are not undefined since item was neither head nor tail.
            _next.previous = _previous;
            _previous.next = _next;
          }

          item.next = undefined;
          item.previous = this._tail;
          this._tail.next = item;
          this._tail = item;
          this._state++;
        }
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = [];
      this.forEach(function (value, key) {
        data.push([key, value]);
      });
      return data;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(data) {
      this.clear();

      var _iterator8 = _createForOfIteratorHelper(data),
          _step5;

      try {
        for (_iterator8.s(); !(_step5 = _iterator8.n()).done;) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              key = _step5$value[0],
              _value = _step5$value[1];

          this.set(key, _value);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  }, {
    key: "size",
    get: function get() {
      return this._size;
    }
  }, {
    key: "first",
    get: function get() {
      var _a;

      return (_a = this._head) === null || _a === void 0 ? void 0 : _a.value;
    }
  }, {
    key: "last",
    get: function get() {
      var _a;

      return (_a = this._tail) === null || _a === void 0 ? void 0 : _a.value;
    }
  }]);

  return LinkedMap;
}();
var map_LRUCache = /*#__PURE__*/function (_LinkedMap) {
  _inherits(LRUCache, _LinkedMap);

  var _super = _createSuper(LRUCache);

  function LRUCache(limit) {
    var _this;

    var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, LRUCache);

    _this = _super.call(this);
    _this._limit = limit;
    _this._ratio = Math.min(Math.max(0, ratio), 1);
    return _this;
  }

  _createClass(LRUCache, [{
    key: "get",
    value: function get(key)
    /* AsNew */
    {
      var touch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      return get_get(_getPrototypeOf(LRUCache.prototype), "get", this).call(this, key, touch);
    }
  }, {
    key: "peek",
    value: function peek(key) {
      return get_get(_getPrototypeOf(LRUCache.prototype), "get", this).call(this, key, 0
      /* None */
      );
    }
  }, {
    key: "set",
    value: function set(key, value) {
      get_get(_getPrototypeOf(LRUCache.prototype), "set", this).call(this, key, value, 2
      /* AsNew */
      );

      this.checkTrim();
      return this;
    }
  }, {
    key: "checkTrim",
    value: function checkTrim() {
      if (this.size > this._limit) {
        this.trimOld(Math.round(this._limit * this._ratio));
      }
    }
  }, {
    key: "limit",
    get: function get() {
      return this._limit;
    },
    set: function set(limit) {
      this._limit = limit;
      this.checkTrim();
    }
  }]);

  return LRUCache;
}(map_LinkedMap);
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/cancellation.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var shortcutEvent = Object.freeze(function (callback, context) {
  var handle = setTimeout(callback.bind(context), 0);
  return {
    dispose: function dispose() {
      clearTimeout(handle);
    }
  };
});
var cancellation_CancellationToken;

(function (CancellationToken) {
  function isCancellationToken(thing) {
    if (thing === CancellationToken.None || thing === CancellationToken.Cancelled) {
      return true;
    }

    if (thing instanceof cancellation_MutableToken) {
      return true;
    }

    if (!thing || typeof thing !== 'object') {
      return false;
    }

    return typeof thing.isCancellationRequested === 'boolean' && typeof thing.onCancellationRequested === 'function';
  }

  CancellationToken.isCancellationToken = isCancellationToken;
  CancellationToken.None = Object.freeze({
    isCancellationRequested: false,
    onCancellationRequested: event_Event.None
  });
  CancellationToken.Cancelled = Object.freeze({
    isCancellationRequested: true,
    onCancellationRequested: shortcutEvent
  });
})(cancellation_CancellationToken || (cancellation_CancellationToken = {}));

var cancellation_MutableToken = /*#__PURE__*/function () {
  function MutableToken() {
    _classCallCheck(this, MutableToken);

    this._isCancelled = false;
    this._emitter = null;
  }

  _createClass(MutableToken, [{
    key: "cancel",
    value: function cancel() {
      if (!this._isCancelled) {
        this._isCancelled = true;

        if (this._emitter) {
          this._emitter.fire(undefined);

          this.dispose();
        }
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this._emitter) {
        this._emitter.dispose();

        this._emitter = null;
      }
    }
  }, {
    key: "isCancellationRequested",
    get: function get() {
      return this._isCancelled;
    }
  }, {
    key: "onCancellationRequested",
    get: function get() {
      if (this._isCancelled) {
        return shortcutEvent;
      }

      if (!this._emitter) {
        this._emitter = new event_Emitter();
      }

      return this._emitter.event;
    }
  }]);

  return MutableToken;
}();

var cancellation_CancellationTokenSource = /*#__PURE__*/function () {
  function CancellationTokenSource(parent) {
    _classCallCheck(this, CancellationTokenSource);

    this._token = undefined;
    this._parentListener = undefined;
    this._parentListener = parent && parent.onCancellationRequested(this.cancel, this);
  }

  _createClass(CancellationTokenSource, [{
    key: "cancel",
    value: function cancel() {
      if (!this._token) {
        // save an object by returning the default
        // cancelled token when cancellation happens
        // before someone asks for the token
        this._token = cancellation_CancellationToken.Cancelled;
      } else if (this._token instanceof cancellation_MutableToken) {
        // actually cancel
        this._token.cancel();
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var cancel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (cancel) {
        this.cancel();
      }

      if (this._parentListener) {
        this._parentListener.dispose();
      }

      if (!this._token) {
        // ensure to initialize with an empty token if we had none
        this._token = cancellation_CancellationToken.None;
      } else if (this._token instanceof cancellation_MutableToken) {
        // actually dispose
        this._token.dispose();
      }
    }
  }, {
    key: "token",
    get: function get() {
      if (!this._token) {
        // be lazy and create the token only when
        // actually needed
        this._token = new cancellation_MutableToken();
      }

      return this._token;
    }
  }]);

  return CancellationTokenSource;
}();
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/async.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



function isThenable(obj) {
  return obj && typeof obj.then === 'function';
}
function createCancelablePromise(callback) {
  var source = new cancellation_CancellationTokenSource();
  var thenable = callback(source.token);
  var promise = new Promise(function (resolve, reject) {
    source.token.onCancellationRequested(function () {
      reject(canceled());
    });
    Promise.resolve(thenable).then(function (value) {
      source.dispose();
      resolve(value);
    }, function (err) {
      source.dispose();
      reject(err);
    });
  });
  return new ( /*#__PURE__*/function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "cancel",
      value: function cancel() {
        source.cancel();
      }
    }, {
      key: "then",
      value: function then(resolve, reject) {
        return promise.then(resolve, reject);
      }
    }, {
      key: "catch",
      value: function _catch(reject) {
        return this.then(undefined, reject);
      }
    }, {
      key: "finally",
      value: function _finally(onfinally) {
        return promise["finally"](onfinally);
      }
    }]);

    return _class;
  }())();
}
function raceCancellation(promise, token, defaultValue) {
  return Promise.race([promise, new Promise(function (resolve) {
    return token.onCancellationRequested(function () {
      return resolve(defaultValue);
    });
  })]);
}
/**
 * A helper to delay execution of a task that is being requested often.
 *
 * Following the throttler, now imagine the mail man wants to optimize the number of
 * trips proactively. The trip itself can be long, so he decides not to make the trip
 * as soon as a letter is submitted. Instead he waits a while, in case more
 * letters are submitted. After said waiting period, if no letters were submitted, he
 * decides to make the trip. Imagine that N more letters were submitted after the first
 * one, all within a short period of time between each other. Even though N+1
 * submissions occurred, only 1 delivery was made.
 *
 * The delayer offers this behavior via the trigger() method, into which both the task
 * to be executed and the waiting period (delay) must be passed in as arguments. Following
 * the example:
 *
 * 		const delayer = new Delayer(WAITING_PERIOD);
 * 		const letters = [];
 *
 * 		function letterReceived(l) {
 * 			letters.push(l);
 * 			delayer.trigger(() => { return makeTheTrip(); });
 * 		}
 */

var async_Delayer = /*#__PURE__*/function () {
  function Delayer(defaultDelay) {
    _classCallCheck(this, Delayer);

    this.defaultDelay = defaultDelay;
    this.timeout = null;
    this.completionPromise = null;
    this.doResolve = null;
    this.doReject = null;
    this.task = null;
  }

  _createClass(Delayer, [{
    key: "trigger",
    value: function trigger(task) {
      var _this = this;

      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultDelay;
      this.task = task;
      this.cancelTimeout();

      if (!this.completionPromise) {
        this.completionPromise = new Promise(function (c, e) {
          _this.doResolve = c;
          _this.doReject = e;
        }).then(function () {
          _this.completionPromise = null;
          _this.doResolve = null;

          if (_this.task) {
            var _task = _this.task;
            _this.task = null;
            return _task();
          }

          return undefined;
        });
      }

      this.timeout = setTimeout(function () {
        _this.timeout = null;

        if (_this.doResolve) {
          _this.doResolve(null);
        }
      }, delay);
      return this.completionPromise;
    }
  }, {
    key: "isTriggered",
    value: function isTriggered() {
      return this.timeout !== null;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.cancelTimeout();

      if (this.completionPromise) {
        if (this.doReject) {
          this.doReject(canceled());
        }

        this.completionPromise = null;
      }
    }
  }, {
    key: "cancelTimeout",
    value: function cancelTimeout() {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.cancelTimeout();
    }
  }]);

  return Delayer;
}();
function async_timeout(millis, token) {
  if (!token) {
    return createCancelablePromise(function (token) {
      return async_timeout(millis, token);
    });
  }

  return new Promise(function (resolve, reject) {
    var handle = setTimeout(resolve, millis);
    token.onCancellationRequested(function () {
      clearTimeout(handle);
      reject(canceled());
    });
  });
}
function disposableTimeout(handler) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var timer = setTimeout(handler, timeout);
  return toDisposable(function () {
    return clearTimeout(timer);
  });
}
function async_first(promiseFactories) {
  var shouldStop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (t) {
    return !!t;
  };
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var index = 0;
  var len = promiseFactories.length;

  var loop = function loop() {
    if (index >= len) {
      return Promise.resolve(defaultValue);
    }

    var factory = promiseFactories[index++];
    var promise = Promise.resolve(factory());
    return promise.then(function (result) {
      if (shouldStop(result)) {
        return Promise.resolve(result);
      }

      return loop();
    });
  };

  return loop();
}
var async_TimeoutTimer = /*#__PURE__*/function () {
  function TimeoutTimer(runner, timeout) {
    _classCallCheck(this, TimeoutTimer);

    this._token = -1;

    if (typeof runner === 'function' && typeof timeout === 'number') {
      this.setIfNotSet(runner, timeout);
    }
  }

  _createClass(TimeoutTimer, [{
    key: "dispose",
    value: function dispose() {
      this.cancel();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this._token !== -1) {
        clearTimeout(this._token);
        this._token = -1;
      }
    }
  }, {
    key: "cancelAndSet",
    value: function cancelAndSet(runner, timeout) {
      var _this2 = this;

      this.cancel();
      this._token = setTimeout(function () {
        _this2._token = -1;
        runner();
      }, timeout);
    }
  }, {
    key: "setIfNotSet",
    value: function setIfNotSet(runner, timeout) {
      var _this3 = this;

      if (this._token !== -1) {
        // timer is already set
        return;
      }

      this._token = setTimeout(function () {
        _this3._token = -1;
        runner();
      }, timeout);
    }
  }]);

  return TimeoutTimer;
}();
var async_IntervalTimer = /*#__PURE__*/function () {
  function IntervalTimer() {
    _classCallCheck(this, IntervalTimer);

    this._token = -1;
  }

  _createClass(IntervalTimer, [{
    key: "dispose",
    value: function dispose() {
      this.cancel();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this._token !== -1) {
        clearInterval(this._token);
        this._token = -1;
      }
    }
  }, {
    key: "cancelAndSet",
    value: function cancelAndSet(runner, interval) {
      this.cancel();
      this._token = setInterval(function () {
        runner();
      }, interval);
    }
  }]);

  return IntervalTimer;
}();
var async_RunOnceScheduler = /*#__PURE__*/function () {
  function RunOnceScheduler(runner, timeout) {
    _classCallCheck(this, RunOnceScheduler);

    this.timeoutToken = -1;
    this.runner = runner;
    this.timeout = timeout;
    this.timeoutHandler = this.onTimeout.bind(this);
  }
  /**
   * Dispose RunOnceScheduler
   */


  _createClass(RunOnceScheduler, [{
    key: "dispose",
    value: function dispose() {
      this.cancel();
      this.runner = null;
    }
    /**
     * Cancel current scheduled runner (if any).
     */

  }, {
    key: "cancel",
    value: function cancel() {
      if (this.isScheduled()) {
        clearTimeout(this.timeoutToken);
        this.timeoutToken = -1;
      }
    }
    /**
     * Cancel previous runner (if any) & schedule a new runner.
     */

  }, {
    key: "schedule",
    value: function schedule() {
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeout;
      this.cancel();
      this.timeoutToken = setTimeout(this.timeoutHandler, delay);
    }
    /**
     * Returns true if scheduled.
     */

  }, {
    key: "isScheduled",
    value: function isScheduled() {
      return this.timeoutToken !== -1;
    }
  }, {
    key: "onTimeout",
    value: function onTimeout() {
      this.timeoutToken = -1;

      if (this.runner) {
        this.doRun();
      }
    }
  }, {
    key: "doRun",
    value: function doRun() {
      if (this.runner) {
        this.runner();
      }
    }
  }]);

  return RunOnceScheduler;
}();
/**
 * Execute the callback the next time the browser is idle
 */

var runWhenIdle;

(function () {
  if (typeof requestIdleCallback !== 'function' || typeof cancelIdleCallback !== 'function') {
    var dummyIdle = Object.freeze({
      didTimeout: true,
      timeRemaining: function timeRemaining() {
        return 15;
      }
    });

    runWhenIdle = function runWhenIdle(runner) {
      var handle = setTimeout(function () {
        return runner(dummyIdle);
      });
      var disposed = false;
      return {
        dispose: function dispose() {
          if (disposed) {
            return;
          }

          disposed = true;
          clearTimeout(handle);
        }
      };
    };
  } else {
    runWhenIdle = function runWhenIdle(runner, timeout) {
      var handle = requestIdleCallback(runner, typeof timeout === 'number' ? {
        timeout: timeout
      } : undefined);
      var disposed = false;
      return {
        dispose: function dispose() {
          if (disposed) {
            return;
          }

          disposed = true;
          cancelIdleCallback(handle);
        }
      };
    };
  }
})();
/**
 * An implementation of the "idle-until-urgent"-strategy as introduced
 * here: https://philipwalton.com/articles/idle-until-urgent/
 */


var async_IdleValue = /*#__PURE__*/function () {
  function IdleValue(executor) {
    var _this4 = this;

    _classCallCheck(this, IdleValue);

    this._didRun = false;

    this._executor = function () {
      try {
        _this4._value = executor();
      } catch (err) {
        _this4._error = err;
      } finally {
        _this4._didRun = true;
      }
    };

    this._handle = runWhenIdle(function () {
      return _this4._executor();
    });
  }

  _createClass(IdleValue, [{
    key: "dispose",
    value: function dispose() {
      this._handle.dispose();
    }
  }, {
    key: "value",
    get: function get() {
      if (!this._didRun) {
        this._handle.dispose();

        this._executor();
      }

      if (this._error) {
        throw this._error;
      }

      return this._value;
    }
  }]);

  return IdleValue;
}(); //#endregion
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/glob.js


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/






var GLOBSTAR = '**';
var GLOB_SPLIT = '/';
var PATH_REGEX = '[/\\\\]'; // any slash or backslash

var NO_PATH_REGEX = '[^/\\\\]'; // any non-slash and non-backslash

var ALL_FORWARD_SLASHES = /\//g;

function starsToRegExp(starCount) {
  switch (starCount) {
    case 0:
      return '';

    case 1:
      return "".concat(NO_PATH_REGEX, "*?");
    // 1 star matches any number of characters except path separator (/ and \) - non greedy (?)

    default:
      // Matches:  (Path Sep OR Path Val followed by Path Sep OR Path Sep followed by Path Val) 0-many times
      // Group is non capturing because we don't need to capture at all (?:...)
      // Overall we use non-greedy matching because it could be that we match too much
      return "(?:".concat(PATH_REGEX, "|").concat(NO_PATH_REGEX, "+").concat(PATH_REGEX, "|").concat(PATH_REGEX).concat(NO_PATH_REGEX, "+)*?");
  }
}

function splitGlobAware(pattern, splitChar) {
  if (!pattern) {
    return [];
  }

  var segments = [];
  var inBraces = false;
  var inBrackets = false;
  var curVal = '';

  var _iterator = _createForOfIteratorHelper(pattern),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _char = _step.value;

      switch (_char) {
        case splitChar:
          if (!inBraces && !inBrackets) {
            segments.push(curVal);
            curVal = '';
            continue;
          }

          break;

        case '{':
          inBraces = true;
          break;

        case '}':
          inBraces = false;
          break;

        case '[':
          inBrackets = true;
          break;

        case ']':
          inBrackets = false;
          break;
      }

      curVal += _char;
    } // Tail

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (curVal) {
    segments.push(curVal);
  }

  return segments;
}

function parseRegExp(pattern) {
  if (!pattern) {
    return '';
  }

  var regEx = ''; // Split up into segments for each slash found

  var segments = splitGlobAware(pattern, GLOB_SPLIT); // Special case where we only have globstars

  if (segments.every(function (s) {
    return s === GLOBSTAR;
  })) {
    regEx = '.*';
  } // Build regex over segments
  else {
      var previousSegmentWasGlobStar = false;
      segments.forEach(function (segment, index) {
        // Globstar is special
        if (segment === GLOBSTAR) {
          // if we have more than one globstar after another, just ignore it
          if (!previousSegmentWasGlobStar) {
            regEx += starsToRegExp(2);
            previousSegmentWasGlobStar = true;
          }

          return;
        } // States


        var inBraces = false;
        var braceVal = '';
        var inBrackets = false;
        var bracketVal = '';

        var _iterator2 = _createForOfIteratorHelper(segment),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _char2 = _step2.value;

            // Support brace expansion
            if (_char2 !== '}' && inBraces) {
              braceVal += _char2;
              continue;
            } // Support brackets


            if (inBrackets && (_char2 !== ']' || !bracketVal)
            /* ] is literally only allowed as first character in brackets to match it */
            ) {
                var res = void 0; // range operator

                if (_char2 === '-') {
                  res = _char2;
                } // negation operator (only valid on first index in bracket)
                else if ((_char2 === '^' || _char2 === '!') && !bracketVal) {
                    res = '^';
                  } // glob split matching is not allowed within character ranges
                  // see http://man7.org/linux/man-pages/man7/glob.7.html
                  else if (_char2 === GLOB_SPLIT) {
                      res = '';
                    } // anything else gets escaped
                    else {
                        res = escapeRegExpCharacters(_char2);
                      }

                bracketVal += res;
                continue;
              }

            switch (_char2) {
              case '{':
                inBraces = true;
                continue;

              case '[':
                inBrackets = true;
                continue;

              case '}':
                var choices = splitGlobAware(braceVal, ','); // Converts {foo,bar} => [foo|bar]

                var braceRegExp = "(?:".concat(choices.map(function (c) {
                  return parseRegExp(c);
                }).join('|'), ")");
                regEx += braceRegExp;
                inBraces = false;
                braceVal = '';
                break;

              case ']':
                regEx += '[' + bracketVal + ']';
                inBrackets = false;
                bracketVal = '';
                break;

              case '?':
                regEx += NO_PATH_REGEX; // 1 ? matches any single character except path separator (/ and \)

                continue;

              case '*':
                regEx += starsToRegExp(1);
                continue;

              default:
                regEx += escapeRegExpCharacters(_char2);
            }
          } // Tail: Add the slash we had split on if there is more to come and the remaining pattern is not a globstar
          // For example if pattern: some/**/*.js we want the "/" after some to be included in the RegEx to prevent
          // a folder called "something" to match as well.
          // However, if pattern: some/**, we tolerate that we also match on "something" because our globstar behaviour
          // is to match 0-N segments.

        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (index < segments.length - 1 && (segments[index + 1] !== GLOBSTAR || index + 2 < segments.length)) {
          regEx += PATH_REGEX;
        } // reset state


        previousSegmentWasGlobStar = false;
      });
    }

  return regEx;
} // regexes to check for trival glob patterns that just check for String#endsWith


var T1 = /^\*\*\/\*\.[\w\.-]+$/; // **/*.something

var T2 = /^\*\*\/([\w\.-]+)\/?$/; // **/something

var T3 = /^{\*\*\/[\*\.]?[\w\.-]+\/?(,\*\*\/[\*\.]?[\w\.-]+\/?)*}$/; // {**/*.something,**/*.else} or {**/package.json,**/project.json}

var T3_2 = /^{\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?(,\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?)*}$/; // Like T3, with optional trailing /**

var T4 = /^\*\*((\/[\w\.-]+)+)\/?$/; // **/something/else

var T5 = /^([\w\.-]+(\/[\w\.-]+)*)\/?$/; // something/else

var CACHE = new map_LRUCache(10000); // bounded to 10000 elements

var FALSE = function FALSE() {
  return false;
};

var NULL = function NULL() {
  return null;
};

function parsePattern(arg1, options) {
  if (!arg1) {
    return NULL;
  } // Handle IRelativePattern


  var pattern;

  if (typeof arg1 !== 'string') {
    pattern = arg1.pattern;
  } else {
    pattern = arg1;
  } // Whitespace trimming


  pattern = pattern.trim(); // Check cache

  var patternKey = "".concat(pattern, "_").concat(!!options.trimForExclusions);
  var parsedPattern = CACHE.get(patternKey);

  if (parsedPattern) {
    return wrapRelativePattern(parsedPattern, arg1);
  } // Check for Trivias


  var match;

  if (T1.test(pattern)) {
    // common pattern: **/*.txt just need endsWith check
    var base = pattern.substr(4); // '**/*'.length === 4

    parsedPattern = function parsedPattern(path, basename) {
      return typeof path === 'string' && path.endsWith(base) ? pattern : null;
    };
  } else if (match = T2.exec(trimForExclusions(pattern, options))) {
    // common pattern: **/some.txt just need basename check
    parsedPattern = trivia2(match[1], pattern);
  } else if ((options.trimForExclusions ? T3_2 : T3).test(pattern)) {
    // repetition of common patterns (see above) {**/*.txt,**/*.png}
    parsedPattern = trivia3(pattern, options);
  } else if (match = T4.exec(trimForExclusions(pattern, options))) {
    // common pattern: **/something/else just need endsWith check
    parsedPattern = trivia4and5(match[1].substr(1), pattern, true);
  } else if (match = T5.exec(trimForExclusions(pattern, options))) {
    // common pattern: something/else just need equals check
    parsedPattern = trivia4and5(match[1], pattern, false);
  } // Otherwise convert to pattern
  else {
      parsedPattern = toRegExp(pattern);
    } // Cache


  CACHE.set(patternKey, parsedPattern);
  return wrapRelativePattern(parsedPattern, arg1);
}

function wrapRelativePattern(parsedPattern, arg2) {
  if (typeof arg2 === 'string') {
    return parsedPattern;
  }

  return function (path, basename) {
    if (!isEqualOrParent(path, arg2.base)) {
      return null;
    }

    return parsedPattern(relative(arg2.base, path), basename);
  };
}

function trimForExclusions(pattern, options) {
  return options.trimForExclusions && pattern.endsWith('/**') ? pattern.substr(0, pattern.length - 2) : pattern; // dropping **, tailing / is dropped later
} // common pattern: **/some.txt just need basename check


function trivia2(base, originalPattern) {
  var slashBase = "/".concat(base);
  var backslashBase = "\\".concat(base);

  var parsedPattern = function parsedPattern(path, basename) {
    if (typeof path !== 'string') {
      return null;
    }

    if (basename) {
      return basename === base ? originalPattern : null;
    }

    return path === base || path.endsWith(slashBase) || path.endsWith(backslashBase) ? originalPattern : null;
  };

  var basenames = [base];
  parsedPattern.basenames = basenames;
  parsedPattern.patterns = [originalPattern];
  parsedPattern.allBasenames = basenames;
  return parsedPattern;
} // repetition of common patterns (see above) {**/*.txt,**/*.png}


function trivia3(pattern, options) {
  var parsedPatterns = aggregateBasenameMatches(pattern.slice(1, -1).split(',').map(function (pattern) {
    return parsePattern(pattern, options);
  }).filter(function (pattern) {
    return pattern !== NULL;
  }), pattern);
  var n = parsedPatterns.length;

  if (!n) {
    return NULL;
  }

  if (n === 1) {
    return parsedPatterns[0];
  }

  var parsedPattern = function parsedPattern(path, basename) {
    for (var i = 0, _n = parsedPatterns.length; i < _n; i++) {
      if (parsedPatterns[i](path, basename)) {
        return pattern;
      }
    }

    return null;
  };

  var withBasenames = arrays_first(parsedPatterns, function (pattern) {
    return !!pattern.allBasenames;
  });

  if (withBasenames) {
    parsedPattern.allBasenames = withBasenames.allBasenames;
  }

  var allPaths = parsedPatterns.reduce(function (all, current) {
    return current.allPaths ? all.concat(current.allPaths) : all;
  }, []);

  if (allPaths.length) {
    parsedPattern.allPaths = allPaths;
  }

  return parsedPattern;
} // common patterns: **/something/else just need endsWith check, something/else just needs and equals check


function trivia4and5(path, pattern, matchPathEnds) {
  var nativePath = sep !== posix.sep ? path.replace(ALL_FORWARD_SLASHES, sep) : path;
  var nativePathEnd = sep + nativePath;
  var parsedPattern = matchPathEnds ? function (path, basename) {
    return typeof path === 'string' && (path === nativePath || path.endsWith(nativePathEnd)) ? pattern : null;
  } : function (path, basename) {
    return typeof path === 'string' && path === nativePath ? pattern : null;
  };
  parsedPattern.allPaths = [(matchPathEnds ? '*/' : './') + path];
  return parsedPattern;
}

function toRegExp(pattern) {
  try {
    var regExp = new RegExp("^".concat(parseRegExp(pattern), "$"));
    return function (path) {
      regExp.lastIndex = 0; // reset RegExp to its initial state to reuse it!

      return typeof path === 'string' && regExp.test(path) ? pattern : null;
    };
  } catch (error) {
    return NULL;
  }
}

function glob_match(arg1, path, hasSibling) {
  if (!arg1 || typeof path !== 'string') {
    return false;
  }

  return parse(arg1)(path, undefined, hasSibling);
}
function parse(arg1) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!arg1) {
    return FALSE;
  } // Glob with String


  if (typeof arg1 === 'string' || isRelativePattern(arg1)) {
    var parsedPattern = parsePattern(arg1, options);

    if (parsedPattern === NULL) {
      return FALSE;
    }

    var resultPattern = function resultPattern(path, basename) {
      return !!parsedPattern(path, basename);
    };

    if (parsedPattern.allBasenames) {
      resultPattern.allBasenames = parsedPattern.allBasenames;
    }

    if (parsedPattern.allPaths) {
      resultPattern.allPaths = parsedPattern.allPaths;
    }

    return resultPattern;
  } // Glob with Expression


  return parsedExpression(arg1, options);
}
function isRelativePattern(obj) {
  var rp = obj;
  return rp && typeof rp.base === 'string' && typeof rp.pattern === 'string';
}

function parsedExpression(expression, options) {
  var parsedPatterns = aggregateBasenameMatches(Object.getOwnPropertyNames(expression).map(function (pattern) {
    return parseExpressionPattern(pattern, expression[pattern], options);
  }).filter(function (pattern) {
    return pattern !== NULL;
  }));
  var n = parsedPatterns.length;

  if (!n) {
    return NULL;
  }

  if (!parsedPatterns.some(function (parsedPattern) {
    return !!parsedPattern.requiresSiblings;
  })) {
    if (n === 1) {
      return parsedPatterns[0];
    }

    var _resultExpression = function _resultExpression(path, basename) {
      for (var i = 0, _n2 = parsedPatterns.length; i < _n2; i++) {
        // Pattern matches path
        var result = parsedPatterns[i](path, basename);

        if (result) {
          return result;
        }
      }

      return null;
    };

    var _withBasenames = arrays_first(parsedPatterns, function (pattern) {
      return !!pattern.allBasenames;
    });

    if (_withBasenames) {
      _resultExpression.allBasenames = _withBasenames.allBasenames;
    }

    var _allPaths = parsedPatterns.reduce(function (all, current) {
      return current.allPaths ? all.concat(current.allPaths) : all;
    }, []);

    if (_allPaths.length) {
      _resultExpression.allPaths = _allPaths;
    }

    return _resultExpression;
  }

  var resultExpression = function resultExpression(path, basename, hasSibling) {
    var name = undefined;

    for (var i = 0, _n3 = parsedPatterns.length; i < _n3; i++) {
      // Pattern matches path
      var parsedPattern = parsedPatterns[i];

      if (parsedPattern.requiresSiblings && hasSibling) {
        if (!basename) {
          basename = path_basename(path);
        }

        if (!name) {
          name = basename.substr(0, basename.length - extname(path).length);
        }
      }

      var result = parsedPattern(path, basename, name, hasSibling);

      if (result) {
        return result;
      }
    }

    return null;
  };

  var withBasenames = arrays_first(parsedPatterns, function (pattern) {
    return !!pattern.allBasenames;
  });

  if (withBasenames) {
    resultExpression.allBasenames = withBasenames.allBasenames;
  }

  var allPaths = parsedPatterns.reduce(function (all, current) {
    return current.allPaths ? all.concat(current.allPaths) : all;
  }, []);

  if (allPaths.length) {
    resultExpression.allPaths = allPaths;
  }

  return resultExpression;
}

function parseExpressionPattern(pattern, value, options) {
  if (value === false) {
    return NULL; // pattern is disabled
  }

  var parsedPattern = parsePattern(pattern, options);

  if (parsedPattern === NULL) {
    return NULL;
  } // Expression Pattern is <boolean>


  if (typeof value === 'boolean') {
    return parsedPattern;
  } // Expression Pattern is <SiblingClause>


  if (value) {
    var when = value.when;

    if (typeof when === 'string') {
      var result = function result(path, basename, name, hasSibling) {
        if (!hasSibling || !parsedPattern(path, basename)) {
          return null;
        }

        var clausePattern = when.replace('$(basename)', name);
        var matched = hasSibling(clausePattern);
        return isThenable(matched) ? matched.then(function (m) {
          return m ? pattern : null;
        }) : matched ? pattern : null;
      };

      result.requiresSiblings = true;
      return result;
    }
  } // Expression is Anything


  return parsedPattern;
}

function aggregateBasenameMatches(parsedPatterns, result) {
  var basenamePatterns = parsedPatterns.filter(function (parsedPattern) {
    return !!parsedPattern.basenames;
  });

  if (basenamePatterns.length < 2) {
    return parsedPatterns;
  }

  var basenames = basenamePatterns.reduce(function (all, current) {
    var basenames = current.basenames;
    return basenames ? all.concat(basenames) : all;
  }, []);
  var patterns;

  if (result) {
    patterns = [];

    for (var i = 0, n = basenames.length; i < n; i++) {
      patterns.push(result);
    }
  } else {
    patterns = basenamePatterns.reduce(function (all, current) {
      var patterns = current.patterns;
      return patterns ? all.concat(patterns) : all;
    }, []);
  }

  var aggregate = function aggregate(path, basename) {
    if (typeof path !== 'string') {
      return null;
    }

    if (!basename) {
      var _i;

      for (_i = path.length; _i > 0; _i--) {
        var ch = path.charCodeAt(_i - 1);

        if (ch === 47
        /* Slash */
        || ch === 92
        /* Backslash */
        ) {
            break;
          }
      }

      basename = path.substr(_i);
    }

    var index = basenames.indexOf(basename);
    return index !== -1 ? patterns[index] : null;
  };

  aggregate.basenames = basenames;
  aggregate.patterns = patterns;
  aggregate.allBasenames = basenames;
  var aggregatedPatterns = parsedPatterns.filter(function (parsedPattern) {
    return !parsedPattern.basenames;
  });
  aggregatedPatterns.push(aggregate);
  return aggregatedPatterns;
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/common/modes/languageSelector.js


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


function score(selector, candidateUri, candidateLanguage, candidateIsSynchronized) {
  if (Array.isArray(selector)) {
    // array -> take max individual value
    var ret = 0;

    var _iterator = _createForOfIteratorHelper(selector),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var filter = _step.value;
        var value = score(filter, candidateUri, candidateLanguage, candidateIsSynchronized);

        if (value === 10) {
          return value; // already at the highest
        }

        if (value > ret) {
          ret = value;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return ret;
  } else if (typeof selector === 'string') {
    if (!candidateIsSynchronized) {
      return 0;
    } // short-hand notion, desugars to
    // 'fooLang' -> { language: 'fooLang'}
    // '*' -> { language: '*' }


    if (selector === '*') {
      return 5;
    } else if (selector === candidateLanguage) {
      return 10;
    } else {
      return 0;
    }
  } else if (selector) {
    // filter -> select accordingly, use defaults for scheme
    var language = selector.language,
        pattern = selector.pattern,
        scheme = selector.scheme,
        hasAccessToAllModels = selector.hasAccessToAllModels;

    if (!candidateIsSynchronized && !hasAccessToAllModels) {
      return 0;
    }

    var _ret = 0;

    if (scheme) {
      if (scheme === candidateUri.scheme) {
        _ret = 10;
      } else if (scheme === '*') {
        _ret = 5;
      } else {
        return 0;
      }
    }

    if (language) {
      if (language === candidateLanguage) {
        _ret = 10;
      } else if (language === '*') {
        _ret = Math.max(_ret, 5);
      } else {
        return 0;
      }
    }

    if (pattern) {
      var normalizedPattern;

      if (typeof pattern === 'string') {
        normalizedPattern = pattern;
      } else {
        // Since this pattern has a `base` property, we need
        // to normalize this path first before passing it on
        // because we will compare it against `Uri.fsPath`
        // which uses platform specific separators.
        // Refs: https://github.com/microsoft/vscode/issues/99938
        normalizedPattern = Object.assign(Object.assign({}, pattern), {
          base: normalize(pattern.base)
        });
      }

      if (normalizedPattern === candidateUri.fsPath || glob_match(normalizedPattern, candidateUri.fsPath)) {
        _ret = 10;
      } else {
        return 0;
      }
    }

    return _ret;
  } else {
    return 0;
  }
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/platform/instantiation/common/instantiation.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// ------ internal util
var _util;

(function (_util) {
  _util.serviceIds = new Map();
  _util.DI_TARGET = '$di$target';
  _util.DI_DEPENDENCIES = '$di$dependencies';

  function getServiceDependencies(ctor) {
    return ctor[_util.DI_DEPENDENCIES] || [];
  }

  _util.getServiceDependencies = getServiceDependencies;
})(_util || (_util = {}));

var IInstantiationService = createDecorator('instantiationService');

function storeServiceDependency(id, target, index, optional) {
  if (target[_util.DI_TARGET] === target) {
    target[_util.DI_DEPENDENCIES].push({
      id: id,
      index: index,
      optional: optional
    });
  } else {
    target[_util.DI_DEPENDENCIES] = [{
      id: id,
      index: index,
      optional: optional
    }];
    target[_util.DI_TARGET] = target;
  }
}
/**
 * The *only* valid way to create a {{ServiceIdentifier}}.
 */


function createDecorator(serviceId) {
  if (_util.serviceIds.has(serviceId)) {
    return _util.serviceIds.get(serviceId);
  }

  var id = function id(target, key, index) {
    if (arguments.length !== 3) {
      throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
    }

    storeServiceDependency(id, target, index, false);
  };

  id.toString = function () {
    return serviceId;
  };

  _util.serviceIds.set(serviceId, id);

  return id;
}
/**
 * Mark a service dependency as optional.
 */

function instantiation_optional(serviceIdentifier) {
  return function (target, key, index) {
    if (arguments.length !== 3) {
      throw new Error('@optional-decorator can only be used to decorate a parameter');
    }

    storeServiceDependency(serviceIdentifier, target, index, true);
  };
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/common/services/modelService.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var IModelService = createDecorator('modelService');
function shouldSynchronizeModel(model) {
  return !model.isTooLargeForSyncing() && !model.isForSimpleWidget;
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/common/modes/languageFeatureRegistry.js




/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/





function isExclusive(selector) {
  if (typeof selector === 'string') {
    return false;
  } else if (Array.isArray(selector)) {
    return selector.every(isExclusive);
  } else {
    return !!selector.exclusive;
  }
}

var languageFeatureRegistry_LanguageFeatureRegistry = /*#__PURE__*/function () {
  function LanguageFeatureRegistry() {
    _classCallCheck(this, LanguageFeatureRegistry);

    this._clock = 0;
    this._entries = [];
    this._onDidChange = new event_Emitter();
  }

  _createClass(LanguageFeatureRegistry, [{
    key: "register",
    value: function register(selector, provider) {
      var _this = this;

      var entry = {
        selector: selector,
        provider: provider,
        _score: -1,
        _time: this._clock++
      };

      this._entries.push(entry);

      this._lastCandidate = undefined;

      this._onDidChange.fire(this._entries.length);

      return toDisposable(function () {
        if (entry) {
          var idx = _this._entries.indexOf(entry);

          if (idx >= 0) {
            _this._entries.splice(idx, 1);

            _this._lastCandidate = undefined;

            _this._onDidChange.fire(_this._entries.length);

            entry = undefined;
          }
        }
      });
    }
  }, {
    key: "has",
    value: function has(model) {
      return this.all(model).length > 0;
    }
  }, {
    key: "all",
    value: function all(model) {
      if (!model) {
        return [];
      }

      this._updateScores(model);

      var result = []; // from registry

      var _iterator = _createForOfIteratorHelper(this._entries),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;

          if (entry._score > 0) {
            result.push(entry.provider);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result;
    }
  }, {
    key: "ordered",
    value: function ordered(model) {
      var result = [];

      this._orderedForEach(model, function (entry) {
        return result.push(entry.provider);
      });

      return result;
    }
  }, {
    key: "orderedGroups",
    value: function orderedGroups(model) {
      var result = [];
      var lastBucket;
      var lastBucketScore;

      this._orderedForEach(model, function (entry) {
        if (lastBucket && lastBucketScore === entry._score) {
          lastBucket.push(entry.provider);
        } else {
          lastBucketScore = entry._score;
          lastBucket = [entry.provider];
          result.push(lastBucket);
        }
      });

      return result;
    }
  }, {
    key: "_orderedForEach",
    value: function _orderedForEach(model, callback) {
      if (!model) {
        return;
      }

      this._updateScores(model);

      var _iterator2 = _createForOfIteratorHelper(this._entries),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var entry = _step2.value;

          if (entry._score > 0) {
            callback(entry);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "_updateScores",
    value: function _updateScores(model) {
      var candidate = {
        uri: model.uri.toString(),
        language: model.getLanguageIdentifier().language
      };

      if (this._lastCandidate && this._lastCandidate.language === candidate.language && this._lastCandidate.uri === candidate.uri) {
        // nothing has changed
        return;
      }

      this._lastCandidate = candidate;

      var _iterator3 = _createForOfIteratorHelper(this._entries),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var entry = _step3.value;
          entry._score = score(entry.selector, model.uri, model.getLanguageIdentifier().language, shouldSynchronizeModel(model));

          if (isExclusive(entry.selector) && entry._score > 0) {
            // support for one exclusive selector that overwrites
            // any other selector
            var _iterator4 = _createForOfIteratorHelper(this._entries),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _entry = _step4.value;
                _entry._score = 0;
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            entry._score = 1000;
            break;
          }
        } // needs sorting

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this._entries.sort(LanguageFeatureRegistry._compareByScoreAndTime);
    }
  }, {
    key: "onDidChange",
    get: function get() {
      return this._onDidChange.event;
    }
  }], [{
    key: "_compareByScoreAndTime",
    value: function _compareByScoreAndTime(a, b) {
      if (a._score < b._score) {
        return 1;
      } else if (a._score > b._score) {
        return -1;
      } else if (a._time < b._time) {
        return 1;
      } else if (a._time > b._time) {
        return -1;
      } else {
        return 0;
      }
    }
  }]);

  return LanguageFeatureRegistry;
}();
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/common/modes/tokenizationRegistry.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var tokenizationRegistry_TokenizationRegistryImpl = /*#__PURE__*/function () {
  function TokenizationRegistryImpl() {
    _classCallCheck(this, TokenizationRegistryImpl);

    this._map = new Map();
    this._promises = new Map();
    this._onDidChange = new event_Emitter();
    this.onDidChange = this._onDidChange.event;
    this._colorMap = null;
  }

  _createClass(TokenizationRegistryImpl, [{
    key: "fire",
    value: function fire(languages) {
      this._onDidChange.fire({
        changedLanguages: languages,
        changedColorMap: false
      });
    }
  }, {
    key: "register",
    value: function register(language, support) {
      var _this = this;

      this._map.set(language, support);

      this.fire([language]);
      return toDisposable(function () {
        if (_this._map.get(language) !== support) {
          return;
        }

        _this._map["delete"](language);

        _this.fire([language]);
      });
    }
  }, {
    key: "registerPromise",
    value: function registerPromise(language, supportPromise) {
      var _this2 = this;

      var registration = null;
      var isDisposed = false;

      this._promises.set(language, supportPromise.then(function (support) {
        _this2._promises["delete"](language);

        if (isDisposed || !support) {
          return;
        }

        registration = _this2.register(language, support);
      }));

      return toDisposable(function () {
        isDisposed = true;

        if (registration) {
          registration.dispose();
        }
      });
    }
  }, {
    key: "getPromise",
    value: function getPromise(language) {
      var _this3 = this;

      var support = this.get(language);

      if (support) {
        return Promise.resolve(support);
      }

      var promise = this._promises.get(language);

      if (promise) {
        return promise.then(function (_) {
          return _this3.get(language);
        });
      }

      return null;
    }
  }, {
    key: "get",
    value: function get(language) {
      return this._map.get(language) || null;
    }
  }, {
    key: "setColorMap",
    value: function setColorMap(colorMap) {
      this._colorMap = colorMap;

      this._onDidChange.fire({
        changedLanguages: Array.from(this._map.keys()),
        changedColorMap: true
      });
    }
  }, {
    key: "getColorMap",
    value: function getColorMap() {
      return this._colorMap;
    }
  }, {
    key: "getDefaultBackground",
    value: function getDefaultBackground() {
      if (this._colorMap && this._colorMap.length > 2
      /* DefaultBackground */
      ) {
          return this._colorMap[2
          /* DefaultBackground */
          ];
        }

      return null;
    }
  }]);

  return TokenizationRegistryImpl;
}();
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/filters.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

 // Combined filters

/**
 * @returns A filter which combines the provided set
 * of filters with an or. The *first* filters that
 * matches defined the return value of the returned
 * filter.
 */

function or() {
  for (var _len = arguments.length, filter = new Array(_len), _key = 0; _key < _len; _key++) {
    filter[_key] = arguments[_key];
  }

  return function (word, wordToMatchAgainst) {
    for (var i = 0, len = filter.length; i < len; i++) {
      var match = filter[i](word, wordToMatchAgainst);

      if (match) {
        return match;
      }
    }

    return null;
  };
}
var matchesPrefix = _matchesPrefix.bind(undefined, true);

function _matchesPrefix(ignoreCase, word, wordToMatchAgainst) {
  if (!wordToMatchAgainst || wordToMatchAgainst.length < word.length) {
    return null;
  }

  var matches;

  if (ignoreCase) {
    matches = startsWithIgnoreCase(wordToMatchAgainst, word);
  } else {
    matches = wordToMatchAgainst.indexOf(word) === 0;
  }

  if (!matches) {
    return null;
  }

  return word.length > 0 ? [{
    start: 0,
    end: word.length
  }] : [];
} // Contiguous Substring


function matchesContiguousSubString(word, wordToMatchAgainst) {
  var index = wordToMatchAgainst.toLowerCase().indexOf(word.toLowerCase());

  if (index === -1) {
    return null;
  }

  return [{
    start: index,
    end: index + word.length
  }];
} // Substring

function matchesSubString(word, wordToMatchAgainst) {
  return _matchesSubString(word.toLowerCase(), wordToMatchAgainst.toLowerCase(), 0, 0);
}

function _matchesSubString(word, wordToMatchAgainst, i, j) {
  if (i === word.length) {
    return [];
  } else if (j === wordToMatchAgainst.length) {
    return null;
  } else {
    if (word[i] === wordToMatchAgainst[j]) {
      var result = null;

      if (result = _matchesSubString(word, wordToMatchAgainst, i + 1, j + 1)) {
        return join({
          start: j,
          end: j + 1
        }, result);
      }

      return null;
    }

    return _matchesSubString(word, wordToMatchAgainst, i, j + 1);
  }
} // CamelCase


function isLower(code) {
  return 97
  /* a */
  <= code && code <= 122
  /* z */
  ;
}

function isUpper(code) {
  return 65
  /* A */
  <= code && code <= 90
  /* Z */
  ;
}

function isNumber(code) {
  return 48
  /* Digit0 */
  <= code && code <= 57
  /* Digit9 */
  ;
}

function isWhitespace(code) {
  return code === 32
  /* Space */
  || code === 9
  /* Tab */
  || code === 10
  /* LineFeed */
  || code === 13
  /* CarriageReturn */
  ;
}

var wordSeparators = new Set();
'`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?'.split('').forEach(function (s) {
  return wordSeparators.add(s.charCodeAt(0));
});

function isWordSeparator(code) {
  return isWhitespace(code) || wordSeparators.has(code);
}

function charactersMatch(codeA, codeB) {
  return codeA === codeB || isWordSeparator(codeA) && isWordSeparator(codeB);
}

function isAlphanumeric(code) {
  return isLower(code) || isUpper(code) || isNumber(code);
}

function join(head, tail) {
  if (tail.length === 0) {
    tail = [head];
  } else if (head.end === tail[0].start) {
    tail[0].start = head.start;
  } else {
    tail.unshift(head);
  }

  return tail;
}

function nextAnchor(camelCaseWord, start) {
  for (var i = start; i < camelCaseWord.length; i++) {
    var c = camelCaseWord.charCodeAt(i);

    if (isUpper(c) || isNumber(c) || i > 0 && !isAlphanumeric(camelCaseWord.charCodeAt(i - 1))) {
      return i;
    }
  }

  return camelCaseWord.length;
}

function _matchesCamelCase(word, camelCaseWord, i, j) {
  if (i === word.length) {
    return [];
  } else if (j === camelCaseWord.length) {
    return null;
  } else if (word[i] !== camelCaseWord[j].toLowerCase()) {
    return null;
  } else {
    var result = null;
    var nextUpperIndex = j + 1;
    result = _matchesCamelCase(word, camelCaseWord, i + 1, j + 1);

    while (!result && (nextUpperIndex = nextAnchor(camelCaseWord, nextUpperIndex)) < camelCaseWord.length) {
      result = _matchesCamelCase(word, camelCaseWord, i + 1, nextUpperIndex);
      nextUpperIndex++;
    }

    return result === null ? null : join({
      start: j,
      end: j + 1
    }, result);
  }
} // Heuristic to avoid computing camel case matcher for words that don't
// look like camelCaseWords.


function analyzeCamelCaseWord(word) {
  var upper = 0,
      lower = 0,
      alpha = 0,
      numeric = 0,
      code = 0;

  for (var i = 0; i < word.length; i++) {
    code = word.charCodeAt(i);

    if (isUpper(code)) {
      upper++;
    }

    if (isLower(code)) {
      lower++;
    }

    if (isAlphanumeric(code)) {
      alpha++;
    }

    if (isNumber(code)) {
      numeric++;
    }
  }

  var upperPercent = upper / word.length;
  var lowerPercent = lower / word.length;
  var alphaPercent = alpha / word.length;
  var numericPercent = numeric / word.length;
  return {
    upperPercent: upperPercent,
    lowerPercent: lowerPercent,
    alphaPercent: alphaPercent,
    numericPercent: numericPercent
  };
}

function isUpperCaseWord(analysis) {
  var upperPercent = analysis.upperPercent,
      lowerPercent = analysis.lowerPercent;
  return lowerPercent === 0 && upperPercent > 0.6;
}

function isCamelCaseWord(analysis) {
  var upperPercent = analysis.upperPercent,
      lowerPercent = analysis.lowerPercent,
      alphaPercent = analysis.alphaPercent,
      numericPercent = analysis.numericPercent;
  return lowerPercent > 0.2 && upperPercent < 0.8 && alphaPercent > 0.6 && numericPercent < 0.2;
} // Heuristic to avoid computing camel case matcher for words that don't
// look like camel case patterns.


function isCamelCasePattern(word) {
  var upper = 0,
      lower = 0,
      code = 0,
      whitespace = 0;

  for (var i = 0; i < word.length; i++) {
    code = word.charCodeAt(i);

    if (isUpper(code)) {
      upper++;
    }

    if (isLower(code)) {
      lower++;
    }

    if (isWhitespace(code)) {
      whitespace++;
    }
  }

  if ((upper === 0 || lower === 0) && whitespace === 0) {
    return word.length <= 30;
  } else {
    return upper <= 5;
  }
}

function matchesCamelCase(word, camelCaseWord) {
  if (!camelCaseWord) {
    return null;
  }

  camelCaseWord = camelCaseWord.trim();

  if (camelCaseWord.length === 0) {
    return null;
  }

  if (!isCamelCasePattern(word)) {
    return null;
  }

  if (camelCaseWord.length > 60) {
    return null;
  }

  var analysis = analyzeCamelCaseWord(camelCaseWord);

  if (!isCamelCaseWord(analysis)) {
    if (!isUpperCaseWord(analysis)) {
      return null;
    }

    camelCaseWord = camelCaseWord.toLowerCase();
  }

  var result = null;
  var i = 0;
  word = word.toLowerCase();

  while (i < camelCaseWord.length && (result = _matchesCamelCase(word, camelCaseWord, 0, i)) === null) {
    i = nextAnchor(camelCaseWord, i + 1);
  }

  return result;
} // Matches beginning of words supporting non-ASCII languages
// If `contiguous` is true then matches word with beginnings of the words in the target. E.g. "pul" will match "Git: Pull"
// Otherwise also matches sub string of the word with beginnings of the words in the target. E.g. "gp" or "g p" will match "Git: Pull"
// Useful in cases where the target is words (e.g. command labels)

function matchesWords(word, target) {
  var contiguous = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!target || target.length === 0) {
    return null;
  }

  var result = null;
  var i = 0;
  word = word.toLowerCase();
  target = target.toLowerCase();

  while (i < target.length && (result = _matchesWords(word, target, 0, i, contiguous)) === null) {
    i = nextWord(target, i + 1);
  }

  return result;
}

function _matchesWords(word, target, i, j, contiguous) {
  if (i === word.length) {
    return [];
  } else if (j === target.length) {
    return null;
  } else if (!charactersMatch(word.charCodeAt(i), target.charCodeAt(j))) {
    return null;
  } else {
    var result = null;
    var nextWordIndex = j + 1;
    result = _matchesWords(word, target, i + 1, j + 1, contiguous);

    if (!contiguous) {
      while (!result && (nextWordIndex = nextWord(target, nextWordIndex)) < target.length) {
        result = _matchesWords(word, target, i + 1, nextWordIndex, contiguous);
        nextWordIndex++;
      }
    }

    return result === null ? null : join({
      start: j,
      end: j + 1
    }, result);
  }
}

function nextWord(word, start) {
  for (var i = start; i < word.length; i++) {
    if (isWordSeparator(word.charCodeAt(i)) || i > 0 && isWordSeparator(word.charCodeAt(i - 1))) {
      return i;
    }
  }

  return word.length;
} // Fuzzy


var fuzzyContiguousFilter = or(matchesPrefix, matchesCamelCase, matchesContiguousSubString);
var fuzzySeparateFilter = or(matchesPrefix, matchesCamelCase, matchesSubString);
var fuzzyRegExpCache = new map_LRUCache(10000); // bounded to 10000 elements

function matchesFuzzy(word, wordToMatchAgainst) {
  var enableSeparateSubstringMatching = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (typeof word !== 'string' || typeof wordToMatchAgainst !== 'string') {
    return null; // return early for invalid input
  } // Form RegExp for wildcard matches


  var regexp = fuzzyRegExpCache.get(word);

  if (!regexp) {
    regexp = new RegExp(convertSimple2RegExpPattern(word), 'i');
    fuzzyRegExpCache.set(word, regexp);
  } // RegExp Filter


  var match = regexp.exec(wordToMatchAgainst);

  if (match) {
    return [{
      start: match.index,
      end: match.index + match[0].length
    }];
  } // Default Filter


  return enableSeparateSubstringMatching ? fuzzySeparateFilter(word, wordToMatchAgainst) : fuzzyContiguousFilter(word, wordToMatchAgainst);
}
function anyScore(pattern, lowPattern, _patternPos, word, lowWord, _wordPos) {
  var result = fuzzyScore(pattern, lowPattern, 0, word, lowWord, 0, true);

  if (result) {
    return result;
  }

  var matches = 0;
  var score = 0;
  var idx = _wordPos;

  for (var patternPos = 0; patternPos < lowPattern.length && patternPos < _maxLen; ++patternPos) {
    var wordPos = lowWord.indexOf(lowPattern.charAt(patternPos), idx);

    if (wordPos >= 0) {
      score += 1;
      matches += Math.pow(2, wordPos);
      idx = wordPos + 1;
    } else if (matches !== 0) {
      // once we have started matching things
      // we need to match the remaining pattern
      // characters
      break;
    }
  }

  return [score, matches, _wordPos];
} //#region --- fuzzyScore ---

function createMatches(score) {
  if (typeof score === 'undefined') {
    return [];
  }

  var matches = score[1].toString(2);
  var wordStart = score[2];
  var res = [];

  for (var pos = wordStart; pos < _maxLen; pos++) {
    if (matches[matches.length - (pos + 1)] === '1') {
      var last = res[res.length - 1];

      if (last && last.end === pos) {
        last.end = pos + 1;
      } else {
        res.push({
          start: pos,
          end: pos + 1
        });
      }
    }
  }

  return res;
}
var _maxLen = 128;

function initTable() {
  var table = [];
  var row = [0];

  for (var i = 1; i <= _maxLen; i++) {
    row.push(-i);
  }

  for (var _i = 0; _i <= _maxLen; _i++) {
    var thisRow = row.slice(0);
    thisRow[0] = -_i;
    table.push(thisRow);
  }

  return table;
}

var _table = initTable();

var _scores = initTable();

var _arrows = initTable();

var _debug = false;

function printTable(table, pattern, patternLen, word, wordLen) {
  function pad(s, n) {
    var pad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';

    while (s.length < n) {
      s = pad + s;
    }

    return s;
  }

  var ret = " |   |".concat(word.split('').map(function (c) {
    return pad(c, 3);
  }).join('|'), "\n");

  for (var i = 0; i <= patternLen; i++) {
    if (i === 0) {
      ret += ' |';
    } else {
      ret += "".concat(pattern[i - 1], "|");
    }

    ret += table[i].slice(0, wordLen + 1).map(function (n) {
      return pad(n.toString(), 3);
    }).join('|') + '\n';
  }

  return ret;
}

function printTables(pattern, patternStart, word, wordStart) {
  pattern = pattern.substr(patternStart);
  word = word.substr(wordStart);
  console.log(printTable(_table, pattern, pattern.length, word, word.length));
  console.log(printTable(_arrows, pattern, pattern.length, word, word.length));
  console.log(printTable(_scores, pattern, pattern.length, word, word.length));
}

function isSeparatorAtPos(value, index) {
  if (index < 0 || index >= value.length) {
    return false;
  }

  var code = value.charCodeAt(index);

  switch (code) {
    case 95
    /* Underline */
    :
    case 45
    /* Dash */
    :
    case 46
    /* Period */
    :
    case 32
    /* Space */
    :
    case 47
    /* Slash */
    :
    case 92
    /* Backslash */
    :
    case 39
    /* SingleQuote */
    :
    case 34
    /* DoubleQuote */
    :
    case 58
    /* Colon */
    :
    case 36
    /* DollarSign */
    :
      return true;

    default:
      return false;
  }
}

function isWhitespaceAtPos(value, index) {
  if (index < 0 || index >= value.length) {
    return false;
  }

  var code = value.charCodeAt(index);

  switch (code) {
    case 32
    /* Space */
    :
    case 9
    /* Tab */
    :
      return true;

    default:
      return false;
  }
}

function isUpperCaseAtPos(pos, word, wordLow) {
  return word[pos] !== wordLow[pos];
}

function isPatternInWord(patternLow, patternPos, patternLen, wordLow, wordPos, wordLen) {
  while (patternPos < patternLen && wordPos < wordLen) {
    if (patternLow[patternPos] === wordLow[wordPos]) {
      patternPos += 1;
    }

    wordPos += 1;
  }

  return patternPos === patternLen; // pattern must be exhausted
}
var FuzzyScore;

(function (FuzzyScore) {
  /**
   * No matches and value `-100`
   */
  FuzzyScore.Default = Object.freeze([-100, 0, 0]);

  function isDefault(score) {
    return !score || score[0] === -100 && score[1] === 0 && score[2] === 0;
  }

  FuzzyScore.isDefault = isDefault;
})(FuzzyScore || (FuzzyScore = {}));

function fuzzyScore(pattern, patternLow, patternStart, word, wordLow, wordStart, firstMatchCanBeWeak) {
  var patternLen = pattern.length > _maxLen ? _maxLen : pattern.length;
  var wordLen = word.length > _maxLen ? _maxLen : word.length;

  if (patternStart >= patternLen || wordStart >= wordLen || patternLen - patternStart > wordLen - wordStart) {
    return undefined;
  } // Run a simple check if the characters of pattern occur
  // (in order) at all in word. If that isn't the case we
  // stop because no match will be possible


  if (!isPatternInWord(patternLow, patternStart, patternLen, wordLow, wordStart, wordLen)) {
    return undefined;
  }

  var row = 1;
  var column = 1;
  var patternPos = patternStart;
  var wordPos = wordStart;
  var hasStrongFirstMatch = false; // There will be a match, fill in tables

  for (row = 1, patternPos = patternStart; patternPos < patternLen; row++, patternPos++) {
    for (column = 1, wordPos = wordStart; wordPos < wordLen; column++, wordPos++) {
      var score = _doScore(pattern, patternLow, patternPos, patternStart, word, wordLow, wordPos);

      if (patternPos === patternStart && score > 1) {
        hasStrongFirstMatch = true;
      }

      _scores[row][column] = score;
      var diag = _table[row - 1][column - 1] + (score > 1 ? 1 : score);
      var top = _table[row - 1][column] + -1;
      var left = _table[row][column - 1] + -1;

      if (left >= top) {
        // left or diag
        if (left > diag) {
          _table[row][column] = left;
          _arrows[row][column] = 4
          /* Left */
          ;
        } else if (left === diag) {
          _table[row][column] = left;
          _arrows[row][column] = 4
          /* Left */
          | 2
          /* Diag */
          ;
        } else {
          _table[row][column] = diag;
          _arrows[row][column] = 2
          /* Diag */
          ;
        }
      } else {
        // top or diag
        if (top > diag) {
          _table[row][column] = top;
          _arrows[row][column] = 1
          /* Top */
          ;
        } else if (top === diag) {
          _table[row][column] = top;
          _arrows[row][column] = 1
          /* Top */
          | 2
          /* Diag */
          ;
        } else {
          _table[row][column] = diag;
          _arrows[row][column] = 2
          /* Diag */
          ;
        }
      }
    }
  }

  if (_debug) {
    printTables(pattern, patternStart, word, wordStart);
  }

  if (!hasStrongFirstMatch && !firstMatchCanBeWeak) {
    return undefined;
  }

  _matchesCount = 0;
  _topScore = -100;
  _wordStart = wordStart;
  _firstMatchCanBeWeak = firstMatchCanBeWeak;

  _findAllMatches2(row - 1, column - 1, patternLen === wordLen ? 1 : 0, 0, false);

  if (_matchesCount === 0) {
    return undefined;
  }

  return [_topScore, _topMatch2, wordStart];
}

function _doScore(pattern, patternLow, patternPos, patternStart, word, wordLow, wordPos) {
  if (patternLow[patternPos] !== wordLow[wordPos]) {
    return -1;
  }

  if (wordPos === patternPos - patternStart) {
    // common prefix: `foobar <-> foobaz`
    //                            ^^^^^
    if (pattern[patternPos] === word[wordPos]) {
      return 7;
    } else {
      return 5;
    }
  } else if (isUpperCaseAtPos(wordPos, word, wordLow) && (wordPos === 0 || !isUpperCaseAtPos(wordPos - 1, word, wordLow))) {
    // hitting upper-case: `foo <-> forOthers`
    //                              ^^ ^
    if (pattern[patternPos] === word[wordPos]) {
      return 7;
    } else {
      return 5;
    }
  } else if (isSeparatorAtPos(wordLow, wordPos) && (wordPos === 0 || !isSeparatorAtPos(wordLow, wordPos - 1))) {
    // hitting a separator: `. <-> foo.bar`
    //                                ^
    return 5;
  } else if (isSeparatorAtPos(wordLow, wordPos - 1) || isWhitespaceAtPos(wordLow, wordPos - 1)) {
    // post separator: `foo <-> bar_foo`
    //                              ^^^
    return 5;
  } else {
    return 1;
  }
}

var _matchesCount = 0;
var _topMatch2 = 0;
var _topScore = 0;
var _wordStart = 0;
var _firstMatchCanBeWeak = false;

function _findAllMatches2(row, column, total, matches, lastMatched) {
  if (_matchesCount >= 10 || total < -25) {
    // stop when having already 10 results, or
    // when a potential alignment as already 5 gaps
    return;
  }

  var simpleMatchCount = 0;

  while (row > 0 && column > 0) {
    var score = _scores[row][column];
    var arrow = _arrows[row][column];

    if (arrow === 4
    /* Left */
    ) {
        // left -> no match, skip a word character
        column -= 1;

        if (lastMatched) {
          total -= 5; // new gap penalty
        } else if (matches !== 0) {
          total -= 1; // gap penalty after first match
        }

        lastMatched = false;
        simpleMatchCount = 0;
      } else if (arrow & 2
    /* Diag */
    ) {
        if (arrow & 4
        /* Left */
        ) {
            // left
            _findAllMatches2(row, column - 1, matches !== 0 ? total - 1 : total, // gap penalty after first match
            matches, lastMatched);
          } // diag


        total += score;
        row -= 1;
        column -= 1;
        lastMatched = true; // match -> set a 1 at the word pos

        matches += Math.pow(2, column + _wordStart); // count simple matches and boost a row of
        // simple matches when they yield in a
        // strong match.

        if (score === 1) {
          simpleMatchCount += 1;

          if (row === 0 && !_firstMatchCanBeWeak) {
            // when the first match is a weak
            // match we discard it
            return undefined;
          }
        } else {
          // boost
          total += 1 + simpleMatchCount * (score - 1);
          simpleMatchCount = 0;
        }
      } else {
      return undefined;
    }
  }

  total -= column >= 3 ? 9 : column * 3; // late start penalty
  // dynamically keep track of the current top score
  // and insert the current best score at head, the rest at tail

  _matchesCount += 1;

  if (total > _topScore) {
    _topScore = total;
    _topMatch2 = matches;
  }
} //#endregion
//#region --- graceful ---


function fuzzyScoreGracefulAggressive(pattern, lowPattern, patternPos, word, lowWord, wordPos, firstMatchCanBeWeak) {
  return fuzzyScoreWithPermutations(pattern, lowPattern, patternPos, word, lowWord, wordPos, true, firstMatchCanBeWeak);
}

function fuzzyScoreWithPermutations(pattern, lowPattern, patternPos, word, lowWord, wordPos, aggressive, firstMatchCanBeWeak) {
  var top = fuzzyScore(pattern, lowPattern, patternPos, word, lowWord, wordPos, firstMatchCanBeWeak);

  if (top && !aggressive) {
    // when using the original pattern yield a result we`
    // return it unless we are aggressive and try to find
    // a better alignment, e.g. `cno` -> `^co^ns^ole` or `^c^o^nsole`.
    return top;
  }

  if (pattern.length >= 3) {
    // When the pattern is long enough then try a few (max 7)
    // permutations of the pattern to find a better match. The
    // permutations only swap neighbouring characters, e.g
    // `cnoso` becomes `conso`, `cnsoo`, `cnoos`.
    var tries = Math.min(7, pattern.length - 1);

    for (var movingPatternPos = patternPos + 1; movingPatternPos < tries; movingPatternPos++) {
      var newPattern = nextTypoPermutation(pattern, movingPatternPos);

      if (newPattern) {
        var candidate = fuzzyScore(newPattern, newPattern.toLowerCase(), patternPos, word, lowWord, wordPos, firstMatchCanBeWeak);

        if (candidate) {
          candidate[0] -= 3; // permutation penalty

          if (!top || candidate[0] > top[0]) {
            top = candidate;
          }
        }
      }
    }
  }

  return top;
}

function nextTypoPermutation(pattern, patternPos) {
  if (patternPos + 1 >= pattern.length) {
    return undefined;
  }

  var swap1 = pattern[patternPos];
  var swap2 = pattern[patternPos + 1];

  if (swap1 === swap2) {
    return undefined;
  }

  return pattern.slice(0, patternPos) + swap2 + swap1 + pattern.slice(patternPos + 2);
} //#endregion
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/codicon.js


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var codiconStartMarker = '$(';
function parseCodicons(text) {
  var firstCodiconIndex = text.indexOf(codiconStartMarker);

  if (firstCodiconIndex === -1) {
    return {
      text: text
    }; // return early if the word does not include an codicon
  }

  return doParseCodicons(text, firstCodiconIndex);
}

function doParseCodicons(text, firstCodiconIndex) {
  var codiconOffsets = [];
  var textWithoutCodicons = '';

  function appendChars(chars) {
    if (chars) {
      textWithoutCodicons += chars;

      var _iterator = _createForOfIteratorHelper(chars),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ = _step.value;
          codiconOffsets.push(codiconsOffset); // make sure to fill in codicon offsets
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }

  var currentCodiconStart = -1;
  var currentCodiconValue = '';
  var codiconsOffset = 0;

  var _char;

  var nextChar;
  var offset = firstCodiconIndex;
  var length = text.length; // Append all characters until the first codicon

  appendChars(text.substr(0, firstCodiconIndex)); // example: $(file-symlink-file) my cool $(other-codicon) entry

  while (offset < length) {
    _char = text[offset];
    nextChar = text[offset + 1]; // beginning of codicon: some value $( <--

    if (_char === codiconStartMarker[0] && nextChar === codiconStartMarker[1]) {
      currentCodiconStart = offset; // if we had a previous potential codicon value without
      // the closing ')', it was actually not an codicon and
      // so we have to add it to the actual value

      appendChars(currentCodiconValue);
      currentCodiconValue = codiconStartMarker;
      offset++; // jump over '('
    } // end of codicon: some value $(some-codicon) <--
    else if (_char === ')' && currentCodiconStart !== -1) {
        var currentCodiconLength = offset - currentCodiconStart + 1; // +1 to include the closing ')'

        codiconsOffset += currentCodiconLength;
        currentCodiconStart = -1;
        currentCodiconValue = '';
      } // within codicon
      else if (currentCodiconStart !== -1) {
          // Make sure this is a real codicon name
          if (/^[a-z0-9\-]$/i.test(_char)) {
            currentCodiconValue += _char;
          } else {
            // This is not a real codicon, treat it as text
            appendChars(currentCodiconValue);
            currentCodiconStart = -1;
            currentCodiconValue = '';
          }
        } // any value outside of codicons
        else {
            appendChars(_char);
          }

    offset++;
  } // if we had a previous potential codicon value without
  // the closing ')', it was actually not an codicon and
  // so we have to add it to the actual value


  appendChars(currentCodiconValue);
  return {
    text: textWithoutCodicons,
    codiconOffsets: codiconOffsets
  };
}

function matchesFuzzyCodiconAware(query, target) {
  var enableSeparateSubstringMatching = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var text = target.text,
      codiconOffsets = target.codiconOffsets; // Return early if there are no codicon markers in the word to match against

  if (!codiconOffsets || codiconOffsets.length === 0) {
    return matchesFuzzy(query, text, enableSeparateSubstringMatching);
  } // Trim the word to match against because it could have leading
  // whitespace now if the word started with an codicon


  var wordToMatchAgainstWithoutCodiconsTrimmed = ltrim(text, ' ');
  var leadingWhitespaceOffset = text.length - wordToMatchAgainstWithoutCodiconsTrimmed.length; // match on value without codicons

  var matches = matchesFuzzy(query, wordToMatchAgainstWithoutCodiconsTrimmed, enableSeparateSubstringMatching); // Map matches back to offsets with codicons and trimming

  if (matches) {
    var _iterator2 = _createForOfIteratorHelper(matches),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var match = _step2.value;
        var codiconOffset = codiconOffsets[match.start + leadingWhitespaceOffset]
        /* codicon offsets at index */
        + leadingWhitespaceOffset
        /* overall leading whitespace offset */
        ;
        match.start += codiconOffset;
        match.end += codiconOffset;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return matches;
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/base/common/codicons.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



var codicons_Registry = /*#__PURE__*/function () {
  function Registry() {
    _classCallCheck(this, Registry);

    this._icons = new Map();
    this._onDidRegister = new event_Emitter();
  }

  _createClass(Registry, [{
    key: "add",
    value: function add(icon) {
      if (!this._icons.has(icon.id)) {
        this._icons.set(icon.id, icon);

        this._onDidRegister.fire(icon);
      } else {
        console.error("Duplicate registration of codicon ".concat(icon.id));
      }
    }
  }, {
    key: "get",
    value: function get(id) {
      return this._icons.get(id);
    }
  }, {
    key: "all",
    get: function get() {
      return this._icons.values();
    }
  }, {
    key: "onDidRegister",
    get: function get() {
      return this._onDidRegister.event;
    }
  }]);

  return Registry;
}();

var _registry = new codicons_Registry();

var iconRegistry = _registry;
function registerIcon(id, def, description) {
  return new codicons_Codicon(id, def);
}
var codicons_Codicon = /*#__PURE__*/function () {
  function Codicon(id, definition, description) {
    _classCallCheck(this, Codicon);

    this.id = id;
    this.definition = definition;
    this.description = description;

    _registry.add(this);
  }

  _createClass(Codicon, [{
    key: "classNames",
    get: function get() {
      return 'codicon codicon-' + this.id;
    }
  }, {
    key: "cssSelector",
    get: function get() {
      return '.codicon.codicon-' + this.id;
    }
  }]);

  return Codicon;
}();

(function (Codicon) {
  // built-in icons, with image name
  Codicon.add = new Codicon('add', {
    character: '\\ea60'
  });
  Codicon.plus = new Codicon('plus', {
    character: '\\ea60'
  });
  Codicon.gistNew = new Codicon('gist-new', {
    character: '\\ea60'
  });
  Codicon.repoCreate = new Codicon('repo-create', {
    character: '\\ea60'
  });
  Codicon.lightbulb = new Codicon('lightbulb', {
    character: '\\ea61'
  });
  Codicon.lightBulb = new Codicon('light-bulb', {
    character: '\\ea61'
  });
  Codicon.repo = new Codicon('repo', {
    character: '\\ea62'
  });
  Codicon.repoDelete = new Codicon('repo-delete', {
    character: '\\ea62'
  });
  Codicon.gistFork = new Codicon('gist-fork', {
    character: '\\ea63'
  });
  Codicon.repoForked = new Codicon('repo-forked', {
    character: '\\ea63'
  });
  Codicon.gitPullRequest = new Codicon('git-pull-request', {
    character: '\\ea64'
  });
  Codicon.gitPullRequestAbandoned = new Codicon('git-pull-request-abandoned', {
    character: '\\ea64'
  });
  Codicon.recordKeys = new Codicon('record-keys', {
    character: '\\ea65'
  });
  Codicon.keyboard = new Codicon('keyboard', {
    character: '\\ea65'
  });
  Codicon.tag = new Codicon('tag', {
    character: '\\ea66'
  });
  Codicon.tagAdd = new Codicon('tag-add', {
    character: '\\ea66'
  });
  Codicon.tagRemove = new Codicon('tag-remove', {
    character: '\\ea66'
  });
  Codicon.person = new Codicon('person', {
    character: '\\ea67'
  });
  Codicon.personAdd = new Codicon('person-add', {
    character: '\\ea67'
  });
  Codicon.personFollow = new Codicon('person-follow', {
    character: '\\ea67'
  });
  Codicon.personOutline = new Codicon('person-outline', {
    character: '\\ea67'
  });
  Codicon.personFilled = new Codicon('person-filled', {
    character: '\\ea67'
  });
  Codicon.gitBranch = new Codicon('git-branch', {
    character: '\\ea68'
  });
  Codicon.gitBranchCreate = new Codicon('git-branch-create', {
    character: '\\ea68'
  });
  Codicon.gitBranchDelete = new Codicon('git-branch-delete', {
    character: '\\ea68'
  });
  Codicon.sourceControl = new Codicon('source-control', {
    character: '\\ea68'
  });
  Codicon.mirror = new Codicon('mirror', {
    character: '\\ea69'
  });
  Codicon.mirrorPublic = new Codicon('mirror-public', {
    character: '\\ea69'
  });
  Codicon.star = new Codicon('star', {
    character: '\\ea6a'
  });
  Codicon.starAdd = new Codicon('star-add', {
    character: '\\ea6a'
  });
  Codicon.starDelete = new Codicon('star-delete', {
    character: '\\ea6a'
  });
  Codicon.starEmpty = new Codicon('star-empty', {
    character: '\\ea6a'
  });
  Codicon.comment = new Codicon('comment', {
    character: '\\ea6b'
  });
  Codicon.commentAdd = new Codicon('comment-add', {
    character: '\\ea6b'
  });
  Codicon.alert = new Codicon('alert', {
    character: '\\ea6c'
  });
  Codicon.warning = new Codicon('warning', {
    character: '\\ea6c'
  });
  Codicon.search = new Codicon('search', {
    character: '\\ea6d'
  });
  Codicon.searchSave = new Codicon('search-save', {
    character: '\\ea6d'
  });
  Codicon.logOut = new Codicon('log-out', {
    character: '\\ea6e'
  });
  Codicon.signOut = new Codicon('sign-out', {
    character: '\\ea6e'
  });
  Codicon.logIn = new Codicon('log-in', {
    character: '\\ea6f'
  });
  Codicon.signIn = new Codicon('sign-in', {
    character: '\\ea6f'
  });
  Codicon.eye = new Codicon('eye', {
    character: '\\ea70'
  });
  Codicon.eyeUnwatch = new Codicon('eye-unwatch', {
    character: '\\ea70'
  });
  Codicon.eyeWatch = new Codicon('eye-watch', {
    character: '\\ea70'
  });
  Codicon.circleFilled = new Codicon('circle-filled', {
    character: '\\ea71'
  });
  Codicon.primitiveDot = new Codicon('primitive-dot', {
    character: '\\ea71'
  });
  Codicon.closeDirty = new Codicon('close-dirty', {
    character: '\\ea71'
  });
  Codicon.debugBreakpoint = new Codicon('debug-breakpoint', {
    character: '\\ea71'
  });
  Codicon.debugBreakpointDisabled = new Codicon('debug-breakpoint-disabled', {
    character: '\\ea71'
  });
  Codicon.debugHint = new Codicon('debug-hint', {
    character: '\\ea71'
  });
  Codicon.primitiveSquare = new Codicon('primitive-square', {
    character: '\\ea72'
  });
  Codicon.edit = new Codicon('edit', {
    character: '\\ea73'
  });
  Codicon.pencil = new Codicon('pencil', {
    character: '\\ea73'
  });
  Codicon.info = new Codicon('info', {
    character: '\\ea74'
  });
  Codicon.issueOpened = new Codicon('issue-opened', {
    character: '\\ea74'
  });
  Codicon.gistPrivate = new Codicon('gist-private', {
    character: '\\ea75'
  });
  Codicon.gitForkPrivate = new Codicon('git-fork-private', {
    character: '\\ea75'
  });
  Codicon.lock = new Codicon('lock', {
    character: '\\ea75'
  });
  Codicon.mirrorPrivate = new Codicon('mirror-private', {
    character: '\\ea75'
  });
  Codicon.close = new Codicon('close', {
    character: '\\ea76'
  });
  Codicon.removeClose = new Codicon('remove-close', {
    character: '\\ea76'
  });
  Codicon.x = new Codicon('x', {
    character: '\\ea76'
  });
  Codicon.repoSync = new Codicon('repo-sync', {
    character: '\\ea77'
  });
  Codicon.sync = new Codicon('sync', {
    character: '\\ea77'
  });
  Codicon.clone = new Codicon('clone', {
    character: '\\ea78'
  });
  Codicon.desktopDownload = new Codicon('desktop-download', {
    character: '\\ea78'
  });
  Codicon.beaker = new Codicon('beaker', {
    character: '\\ea79'
  });
  Codicon.microscope = new Codicon('microscope', {
    character: '\\ea79'
  });
  Codicon.vm = new Codicon('vm', {
    character: '\\ea7a'
  });
  Codicon.deviceDesktop = new Codicon('device-desktop', {
    character: '\\ea7a'
  });
  Codicon.file = new Codicon('file', {
    character: '\\ea7b'
  });
  Codicon.fileText = new Codicon('file-text', {
    character: '\\ea7b'
  });
  Codicon.more = new Codicon('more', {
    character: '\\ea7c'
  });
  Codicon.ellipsis = new Codicon('ellipsis', {
    character: '\\ea7c'
  });
  Codicon.kebabHorizontal = new Codicon('kebab-horizontal', {
    character: '\\ea7c'
  });
  Codicon.mailReply = new Codicon('mail-reply', {
    character: '\\ea7d'
  });
  Codicon.reply = new Codicon('reply', {
    character: '\\ea7d'
  });
  Codicon.organization = new Codicon('organization', {
    character: '\\ea7e'
  });
  Codicon.organizationFilled = new Codicon('organization-filled', {
    character: '\\ea7e'
  });
  Codicon.organizationOutline = new Codicon('organization-outline', {
    character: '\\ea7e'
  });
  Codicon.newFile = new Codicon('new-file', {
    character: '\\ea7f'
  });
  Codicon.fileAdd = new Codicon('file-add', {
    character: '\\ea7f'
  });
  Codicon.newFolder = new Codicon('new-folder', {
    character: '\\ea80'
  });
  Codicon.fileDirectoryCreate = new Codicon('file-directory-create', {
    character: '\\ea80'
  });
  Codicon.trash = new Codicon('trash', {
    character: '\\ea81'
  });
  Codicon.trashcan = new Codicon('trashcan', {
    character: '\\ea81'
  });
  Codicon.history = new Codicon('history', {
    character: '\\ea82'
  });
  Codicon.clock = new Codicon('clock', {
    character: '\\ea82'
  });
  Codicon.folder = new Codicon('folder', {
    character: '\\ea83'
  });
  Codicon.fileDirectory = new Codicon('file-directory', {
    character: '\\ea83'
  });
  Codicon.symbolFolder = new Codicon('symbol-folder', {
    character: '\\ea83'
  });
  Codicon.logoGithub = new Codicon('logo-github', {
    character: '\\ea84'
  });
  Codicon.markGithub = new Codicon('mark-github', {
    character: '\\ea84'
  });
  Codicon.github = new Codicon('github', {
    character: '\\ea84'
  });
  Codicon.terminal = new Codicon('terminal', {
    character: '\\ea85'
  });
  Codicon.console = new Codicon('console', {
    character: '\\ea85'
  });
  Codicon.repl = new Codicon('repl', {
    character: '\\ea85'
  });
  Codicon.zap = new Codicon('zap', {
    character: '\\ea86'
  });
  Codicon.symbolEvent = new Codicon('symbol-event', {
    character: '\\ea86'
  });
  Codicon.error = new Codicon('error', {
    character: '\\ea87'
  });
  Codicon.stop = new Codicon('stop', {
    character: '\\ea87'
  });
  Codicon.variable = new Codicon('variable', {
    character: '\\ea88'
  });
  Codicon.symbolVariable = new Codicon('symbol-variable', {
    character: '\\ea88'
  });
  Codicon.array = new Codicon('array', {
    character: '\\ea8a'
  });
  Codicon.symbolArray = new Codicon('symbol-array', {
    character: '\\ea8a'
  });
  Codicon.symbolModule = new Codicon('symbol-module', {
    character: '\\ea8b'
  });
  Codicon.symbolPackage = new Codicon('symbol-package', {
    character: '\\ea8b'
  });
  Codicon.symbolNamespace = new Codicon('symbol-namespace', {
    character: '\\ea8b'
  });
  Codicon.symbolObject = new Codicon('symbol-object', {
    character: '\\ea8b'
  });
  Codicon.symbolMethod = new Codicon('symbol-method', {
    character: '\\ea8c'
  });
  Codicon.symbolFunction = new Codicon('symbol-function', {
    character: '\\ea8c'
  });
  Codicon.symbolConstructor = new Codicon('symbol-constructor', {
    character: '\\ea8c'
  });
  Codicon.symbolBoolean = new Codicon('symbol-boolean', {
    character: '\\ea8f'
  });
  Codicon.symbolNull = new Codicon('symbol-null', {
    character: '\\ea8f'
  });
  Codicon.symbolNumeric = new Codicon('symbol-numeric', {
    character: '\\ea90'
  });
  Codicon.symbolNumber = new Codicon('symbol-number', {
    character: '\\ea90'
  });
  Codicon.symbolStructure = new Codicon('symbol-structure', {
    character: '\\ea91'
  });
  Codicon.symbolStruct = new Codicon('symbol-struct', {
    character: '\\ea91'
  });
  Codicon.symbolParameter = new Codicon('symbol-parameter', {
    character: '\\ea92'
  });
  Codicon.symbolTypeParameter = new Codicon('symbol-type-parameter', {
    character: '\\ea92'
  });
  Codicon.symbolKey = new Codicon('symbol-key', {
    character: '\\ea93'
  });
  Codicon.symbolText = new Codicon('symbol-text', {
    character: '\\ea93'
  });
  Codicon.symbolReference = new Codicon('symbol-reference', {
    character: '\\ea94'
  });
  Codicon.goToFile = new Codicon('go-to-file', {
    character: '\\ea94'
  });
  Codicon.symbolEnum = new Codicon('symbol-enum', {
    character: '\\ea95'
  });
  Codicon.symbolValue = new Codicon('symbol-value', {
    character: '\\ea95'
  });
  Codicon.symbolRuler = new Codicon('symbol-ruler', {
    character: '\\ea96'
  });
  Codicon.symbolUnit = new Codicon('symbol-unit', {
    character: '\\ea96'
  });
  Codicon.activateBreakpoints = new Codicon('activate-breakpoints', {
    character: '\\ea97'
  });
  Codicon.archive = new Codicon('archive', {
    character: '\\ea98'
  });
  Codicon.arrowBoth = new Codicon('arrow-both', {
    character: '\\ea99'
  });
  Codicon.arrowDown = new Codicon('arrow-down', {
    character: '\\ea9a'
  });
  Codicon.arrowLeft = new Codicon('arrow-left', {
    character: '\\ea9b'
  });
  Codicon.arrowRight = new Codicon('arrow-right', {
    character: '\\ea9c'
  });
  Codicon.arrowSmallDown = new Codicon('arrow-small-down', {
    character: '\\ea9d'
  });
  Codicon.arrowSmallLeft = new Codicon('arrow-small-left', {
    character: '\\ea9e'
  });
  Codicon.arrowSmallRight = new Codicon('arrow-small-right', {
    character: '\\ea9f'
  });
  Codicon.arrowSmallUp = new Codicon('arrow-small-up', {
    character: '\\eaa0'
  });
  Codicon.arrowUp = new Codicon('arrow-up', {
    character: '\\eaa1'
  });
  Codicon.bell = new Codicon('bell', {
    character: '\\eaa2'
  });
  Codicon.bold = new Codicon('bold', {
    character: '\\eaa3'
  });
  Codicon.book = new Codicon('book', {
    character: '\\eaa4'
  });
  Codicon.bookmark = new Codicon('bookmark', {
    character: '\\eaa5'
  });
  Codicon.debugBreakpointConditionalUnverified = new Codicon('debug-breakpoint-conditional-unverified', {
    character: '\\eaa6'
  });
  Codicon.debugBreakpointConditional = new Codicon('debug-breakpoint-conditional', {
    character: '\\eaa7'
  });
  Codicon.debugBreakpointConditionalDisabled = new Codicon('debug-breakpoint-conditional-disabled', {
    character: '\\eaa7'
  });
  Codicon.debugBreakpointDataUnverified = new Codicon('debug-breakpoint-data-unverified', {
    character: '\\eaa8'
  });
  Codicon.debugBreakpointData = new Codicon('debug-breakpoint-data', {
    character: '\\eaa9'
  });
  Codicon.debugBreakpointDataDisabled = new Codicon('debug-breakpoint-data-disabled', {
    character: '\\eaa9'
  });
  Codicon.debugBreakpointLogUnverified = new Codicon('debug-breakpoint-log-unverified', {
    character: '\\eaaa'
  });
  Codicon.debugBreakpointLog = new Codicon('debug-breakpoint-log', {
    character: '\\eaab'
  });
  Codicon.debugBreakpointLogDisabled = new Codicon('debug-breakpoint-log-disabled', {
    character: '\\eaab'
  });
  Codicon.briefcase = new Codicon('briefcase', {
    character: '\\eaac'
  });
  Codicon.broadcast = new Codicon('broadcast', {
    character: '\\eaad'
  });
  Codicon.browser = new Codicon('browser', {
    character: '\\eaae'
  });
  Codicon.bug = new Codicon('bug', {
    character: '\\eaaf'
  });
  Codicon.calendar = new Codicon('calendar', {
    character: '\\eab0'
  });
  Codicon.caseSensitive = new Codicon('case-sensitive', {
    character: '\\eab1'
  });
  Codicon.check = new Codicon('check', {
    character: '\\eab2'
  });
  Codicon.checklist = new Codicon('checklist', {
    character: '\\eab3'
  });
  Codicon.chevronDown = new Codicon('chevron-down', {
    character: '\\eab4'
  });
  Codicon.chevronLeft = new Codicon('chevron-left', {
    character: '\\eab5'
  });
  Codicon.chevronRight = new Codicon('chevron-right', {
    character: '\\eab6'
  });
  Codicon.chevronUp = new Codicon('chevron-up', {
    character: '\\eab7'
  });
  Codicon.chromeClose = new Codicon('chrome-close', {
    character: '\\eab8'
  });
  Codicon.chromeMaximize = new Codicon('chrome-maximize', {
    character: '\\eab9'
  });
  Codicon.chromeMinimize = new Codicon('chrome-minimize', {
    character: '\\eaba'
  });
  Codicon.chromeRestore = new Codicon('chrome-restore', {
    character: '\\eabb'
  });
  Codicon.circleOutline = new Codicon('circle-outline', {
    character: '\\eabc'
  });
  Codicon.debugBreakpointUnverified = new Codicon('debug-breakpoint-unverified', {
    character: '\\eabc'
  });
  Codicon.circleSlash = new Codicon('circle-slash', {
    character: '\\eabd'
  });
  Codicon.circuitBoard = new Codicon('circuit-board', {
    character: '\\eabe'
  });
  Codicon.clearAll = new Codicon('clear-all', {
    character: '\\eabf'
  });
  Codicon.clippy = new Codicon('clippy', {
    character: '\\eac0'
  });
  Codicon.closeAll = new Codicon('close-all', {
    character: '\\eac1'
  });
  Codicon.cloudDownload = new Codicon('cloud-download', {
    character: '\\eac2'
  });
  Codicon.cloudUpload = new Codicon('cloud-upload', {
    character: '\\eac3'
  });
  Codicon.code = new Codicon('code', {
    character: '\\eac4'
  });
  Codicon.collapseAll = new Codicon('collapse-all', {
    character: '\\eac5'
  });
  Codicon.colorMode = new Codicon('color-mode', {
    character: '\\eac6'
  });
  Codicon.commentDiscussion = new Codicon('comment-discussion', {
    character: '\\eac7'
  });
  Codicon.compareChanges = new Codicon('compare-changes', {
    character: '\\eafd'
  });
  Codicon.creditCard = new Codicon('credit-card', {
    character: '\\eac9'
  });
  Codicon.dash = new Codicon('dash', {
    character: '\\eacc'
  });
  Codicon.dashboard = new Codicon('dashboard', {
    character: '\\eacd'
  });
  Codicon.database = new Codicon('database', {
    character: '\\eace'
  });
  Codicon.debugContinue = new Codicon('debug-continue', {
    character: '\\eacf'
  });
  Codicon.debugDisconnect = new Codicon('debug-disconnect', {
    character: '\\ead0'
  });
  Codicon.debugPause = new Codicon('debug-pause', {
    character: '\\ead1'
  });
  Codicon.debugRestart = new Codicon('debug-restart', {
    character: '\\ead2'
  });
  Codicon.debugStart = new Codicon('debug-start', {
    character: '\\ead3'
  });
  Codicon.debugStepInto = new Codicon('debug-step-into', {
    character: '\\ead4'
  });
  Codicon.debugStepOut = new Codicon('debug-step-out', {
    character: '\\ead5'
  });
  Codicon.debugStepOver = new Codicon('debug-step-over', {
    character: '\\ead6'
  });
  Codicon.debugStop = new Codicon('debug-stop', {
    character: '\\ead7'
  });
  Codicon.debug = new Codicon('debug', {
    character: '\\ead8'
  });
  Codicon.deviceCameraVideo = new Codicon('device-camera-video', {
    character: '\\ead9'
  });
  Codicon.deviceCamera = new Codicon('device-camera', {
    character: '\\eada'
  });
  Codicon.deviceMobile = new Codicon('device-mobile', {
    character: '\\eadb'
  });
  Codicon.diffAdded = new Codicon('diff-added', {
    character: '\\eadc'
  });
  Codicon.diffIgnored = new Codicon('diff-ignored', {
    character: '\\eadd'
  });
  Codicon.diffModified = new Codicon('diff-modified', {
    character: '\\eade'
  });
  Codicon.diffRemoved = new Codicon('diff-removed', {
    character: '\\eadf'
  });
  Codicon.diffRenamed = new Codicon('diff-renamed', {
    character: '\\eae0'
  });
  Codicon.diff = new Codicon('diff', {
    character: '\\eae1'
  });
  Codicon.discard = new Codicon('discard', {
    character: '\\eae2'
  });
  Codicon.editorLayout = new Codicon('editor-layout', {
    character: '\\eae3'
  });
  Codicon.emptyWindow = new Codicon('empty-window', {
    character: '\\eae4'
  });
  Codicon.exclude = new Codicon('exclude', {
    character: '\\eae5'
  });
  Codicon.extensions = new Codicon('extensions', {
    character: '\\eae6'
  });
  Codicon.eyeClosed = new Codicon('eye-closed', {
    character: '\\eae7'
  });
  Codicon.fileBinary = new Codicon('file-binary', {
    character: '\\eae8'
  });
  Codicon.fileCode = new Codicon('file-code', {
    character: '\\eae9'
  });
  Codicon.fileMedia = new Codicon('file-media', {
    character: '\\eaea'
  });
  Codicon.filePdf = new Codicon('file-pdf', {
    character: '\\eaeb'
  });
  Codicon.fileSubmodule = new Codicon('file-submodule', {
    character: '\\eaec'
  });
  Codicon.fileSymlinkDirectory = new Codicon('file-symlink-directory', {
    character: '\\eaed'
  });
  Codicon.fileSymlinkFile = new Codicon('file-symlink-file', {
    character: '\\eaee'
  });
  Codicon.fileZip = new Codicon('file-zip', {
    character: '\\eaef'
  });
  Codicon.files = new Codicon('files', {
    character: '\\eaf0'
  });
  Codicon.filter = new Codicon('filter', {
    character: '\\eaf1'
  });
  Codicon.flame = new Codicon('flame', {
    character: '\\eaf2'
  });
  Codicon.foldDown = new Codicon('fold-down', {
    character: '\\eaf3'
  });
  Codicon.foldUp = new Codicon('fold-up', {
    character: '\\eaf4'
  });
  Codicon.fold = new Codicon('fold', {
    character: '\\eaf5'
  });
  Codicon.folderActive = new Codicon('folder-active', {
    character: '\\eaf6'
  });
  Codicon.folderOpened = new Codicon('folder-opened', {
    character: '\\eaf7'
  });
  Codicon.gear = new Codicon('gear', {
    character: '\\eaf8'
  });
  Codicon.gift = new Codicon('gift', {
    character: '\\eaf9'
  });
  Codicon.gistSecret = new Codicon('gist-secret', {
    character: '\\eafa'
  });
  Codicon.gist = new Codicon('gist', {
    character: '\\eafb'
  });
  Codicon.gitCommit = new Codicon('git-commit', {
    character: '\\eafc'
  });
  Codicon.gitCompare = new Codicon('git-compare', {
    character: '\\eafd'
  });
  Codicon.gitMerge = new Codicon('git-merge', {
    character: '\\eafe'
  });
  Codicon.githubAction = new Codicon('github-action', {
    character: '\\eaff'
  });
  Codicon.githubAlt = new Codicon('github-alt', {
    character: '\\eb00'
  });
  Codicon.globe = new Codicon('globe', {
    character: '\\eb01'
  });
  Codicon.grabber = new Codicon('grabber', {
    character: '\\eb02'
  });
  Codicon.graph = new Codicon('graph', {
    character: '\\eb03'
  });
  Codicon.gripper = new Codicon('gripper', {
    character: '\\eb04'
  });
  Codicon.heart = new Codicon('heart', {
    character: '\\eb05'
  });
  Codicon.home = new Codicon('home', {
    character: '\\eb06'
  });
  Codicon.horizontalRule = new Codicon('horizontal-rule', {
    character: '\\eb07'
  });
  Codicon.hubot = new Codicon('hubot', {
    character: '\\eb08'
  });
  Codicon.inbox = new Codicon('inbox', {
    character: '\\eb09'
  });
  Codicon.issueClosed = new Codicon('issue-closed', {
    character: '\\eb0a'
  });
  Codicon.issueReopened = new Codicon('issue-reopened', {
    character: '\\eb0b'
  });
  Codicon.issues = new Codicon('issues', {
    character: '\\eb0c'
  });
  Codicon.italic = new Codicon('italic', {
    character: '\\eb0d'
  });
  Codicon.jersey = new Codicon('jersey', {
    character: '\\eb0e'
  });
  Codicon.json = new Codicon('json', {
    character: '\\eb0f'
  });
  Codicon.kebabVertical = new Codicon('kebab-vertical', {
    character: '\\eb10'
  });
  Codicon.key = new Codicon('key', {
    character: '\\eb11'
  });
  Codicon.law = new Codicon('law', {
    character: '\\eb12'
  });
  Codicon.lightbulbAutofix = new Codicon('lightbulb-autofix', {
    character: '\\eb13'
  });
  Codicon.linkExternal = new Codicon('link-external', {
    character: '\\eb14'
  });
  Codicon.link = new Codicon('link', {
    character: '\\eb15'
  });
  Codicon.listOrdered = new Codicon('list-ordered', {
    character: '\\eb16'
  });
  Codicon.listUnordered = new Codicon('list-unordered', {
    character: '\\eb17'
  });
  Codicon.liveShare = new Codicon('live-share', {
    character: '\\eb18'
  });
  Codicon.loading = new Codicon('loading', {
    character: '\\eb19'
  });
  Codicon.location = new Codicon('location', {
    character: '\\eb1a'
  });
  Codicon.mailRead = new Codicon('mail-read', {
    character: '\\eb1b'
  });
  Codicon.mail = new Codicon('mail', {
    character: '\\eb1c'
  });
  Codicon.markdown = new Codicon('markdown', {
    character: '\\eb1d'
  });
  Codicon.megaphone = new Codicon('megaphone', {
    character: '\\eb1e'
  });
  Codicon.mention = new Codicon('mention', {
    character: '\\eb1f'
  });
  Codicon.milestone = new Codicon('milestone', {
    character: '\\eb20'
  });
  Codicon.mortarBoard = new Codicon('mortar-board', {
    character: '\\eb21'
  });
  Codicon.move = new Codicon('move', {
    character: '\\eb22'
  });
  Codicon.multipleWindows = new Codicon('multiple-windows', {
    character: '\\eb23'
  });
  Codicon.mute = new Codicon('mute', {
    character: '\\eb24'
  });
  Codicon.noNewline = new Codicon('no-newline', {
    character: '\\eb25'
  });
  Codicon.note = new Codicon('note', {
    character: '\\eb26'
  });
  Codicon.octoface = new Codicon('octoface', {
    character: '\\eb27'
  });
  Codicon.openPreview = new Codicon('open-preview', {
    character: '\\eb28'
  });
  Codicon.package_ = new Codicon('package', {
    character: '\\eb29'
  });
  Codicon.paintcan = new Codicon('paintcan', {
    character: '\\eb2a'
  });
  Codicon.pin = new Codicon('pin', {
    character: '\\eb2b'
  });
  Codicon.play = new Codicon('play', {
    character: '\\eb2c'
  });
  Codicon.run = new Codicon('run', {
    character: '\\eb2c'
  });
  Codicon.plug = new Codicon('plug', {
    character: '\\eb2d'
  });
  Codicon.preserveCase = new Codicon('preserve-case', {
    character: '\\eb2e'
  });
  Codicon.preview = new Codicon('preview', {
    character: '\\eb2f'
  });
  Codicon.project = new Codicon('project', {
    character: '\\eb30'
  });
  Codicon.pulse = new Codicon('pulse', {
    character: '\\eb31'
  });
  Codicon.question = new Codicon('question', {
    character: '\\eb32'
  });
  Codicon.quote = new Codicon('quote', {
    character: '\\eb33'
  });
  Codicon.radioTower = new Codicon('radio-tower', {
    character: '\\eb34'
  });
  Codicon.reactions = new Codicon('reactions', {
    character: '\\eb35'
  });
  Codicon.references = new Codicon('references', {
    character: '\\eb36'
  });
  Codicon.refresh = new Codicon('refresh', {
    character: '\\eb37'
  });
  Codicon.regex = new Codicon('regex', {
    character: '\\eb38'
  });
  Codicon.remoteExplorer = new Codicon('remote-explorer', {
    character: '\\eb39'
  });
  Codicon.remote = new Codicon('remote', {
    character: '\\eb3a'
  });
  Codicon.remove = new Codicon('remove', {
    character: '\\eb3b'
  });
  Codicon.replaceAll = new Codicon('replace-all', {
    character: '\\eb3c'
  });
  Codicon.replace = new Codicon('replace', {
    character: '\\eb3d'
  });
  Codicon.repoClone = new Codicon('repo-clone', {
    character: '\\eb3e'
  });
  Codicon.repoForcePush = new Codicon('repo-force-push', {
    character: '\\eb3f'
  });
  Codicon.repoPull = new Codicon('repo-pull', {
    character: '\\eb40'
  });
  Codicon.repoPush = new Codicon('repo-push', {
    character: '\\eb41'
  });
  Codicon.report = new Codicon('report', {
    character: '\\eb42'
  });
  Codicon.requestChanges = new Codicon('request-changes', {
    character: '\\eb43'
  });
  Codicon.rocket = new Codicon('rocket', {
    character: '\\eb44'
  });
  Codicon.rootFolderOpened = new Codicon('root-folder-opened', {
    character: '\\eb45'
  });
  Codicon.rootFolder = new Codicon('root-folder', {
    character: '\\eb46'
  });
  Codicon.rss = new Codicon('rss', {
    character: '\\eb47'
  });
  Codicon.ruby = new Codicon('ruby', {
    character: '\\eb48'
  });
  Codicon.saveAll = new Codicon('save-all', {
    character: '\\eb49'
  });
  Codicon.saveAs = new Codicon('save-as', {
    character: '\\eb4a'
  });
  Codicon.save = new Codicon('save', {
    character: '\\eb4b'
  });
  Codicon.screenFull = new Codicon('screen-full', {
    character: '\\eb4c'
  });
  Codicon.screenNormal = new Codicon('screen-normal', {
    character: '\\eb4d'
  });
  Codicon.searchStop = new Codicon('search-stop', {
    character: '\\eb4e'
  });
  Codicon.server = new Codicon('server', {
    character: '\\eb50'
  });
  Codicon.settingsGear = new Codicon('settings-gear', {
    character: '\\eb51'
  });
  Codicon.settings = new Codicon('settings', {
    character: '\\eb52'
  });
  Codicon.shield = new Codicon('shield', {
    character: '\\eb53'
  });
  Codicon.smiley = new Codicon('smiley', {
    character: '\\eb54'
  });
  Codicon.sortPrecedence = new Codicon('sort-precedence', {
    character: '\\eb55'
  });
  Codicon.splitHorizontal = new Codicon('split-horizontal', {
    character: '\\eb56'
  });
  Codicon.splitVertical = new Codicon('split-vertical', {
    character: '\\eb57'
  });
  Codicon.squirrel = new Codicon('squirrel', {
    character: '\\eb58'
  });
  Codicon.starFull = new Codicon('star-full', {
    character: '\\eb59'
  });
  Codicon.starHalf = new Codicon('star-half', {
    character: '\\eb5a'
  });
  Codicon.symbolClass = new Codicon('symbol-class', {
    character: '\\eb5b'
  });
  Codicon.symbolColor = new Codicon('symbol-color', {
    character: '\\eb5c'
  });
  Codicon.symbolConstant = new Codicon('symbol-constant', {
    character: '\\eb5d'
  });
  Codicon.symbolEnumMember = new Codicon('symbol-enum-member', {
    character: '\\eb5e'
  });
  Codicon.symbolField = new Codicon('symbol-field', {
    character: '\\eb5f'
  });
  Codicon.symbolFile = new Codicon('symbol-file', {
    character: '\\eb60'
  });
  Codicon.symbolInterface = new Codicon('symbol-interface', {
    character: '\\eb61'
  });
  Codicon.symbolKeyword = new Codicon('symbol-keyword', {
    character: '\\eb62'
  });
  Codicon.symbolMisc = new Codicon('symbol-misc', {
    character: '\\eb63'
  });
  Codicon.symbolOperator = new Codicon('symbol-operator', {
    character: '\\eb64'
  });
  Codicon.symbolProperty = new Codicon('symbol-property', {
    character: '\\eb65'
  });
  Codicon.wrench = new Codicon('wrench', {
    character: '\\eb65'
  });
  Codicon.wrenchSubaction = new Codicon('wrench-subaction', {
    character: '\\eb65'
  });
  Codicon.symbolSnippet = new Codicon('symbol-snippet', {
    character: '\\eb66'
  });
  Codicon.tasklist = new Codicon('tasklist', {
    character: '\\eb67'
  });
  Codicon.telescope = new Codicon('telescope', {
    character: '\\eb68'
  });
  Codicon.textSize = new Codicon('text-size', {
    character: '\\eb69'
  });
  Codicon.threeBars = new Codicon('three-bars', {
    character: '\\eb6a'
  });
  Codicon.thumbsdown = new Codicon('thumbsdown', {
    character: '\\eb6b'
  });
  Codicon.thumbsup = new Codicon('thumbsup', {
    character: '\\eb6c'
  });
  Codicon.tools = new Codicon('tools', {
    character: '\\eb6d'
  });
  Codicon.triangleDown = new Codicon('triangle-down', {
    character: '\\eb6e'
  });
  Codicon.triangleLeft = new Codicon('triangle-left', {
    character: '\\eb6f'
  });
  Codicon.triangleRight = new Codicon('triangle-right', {
    character: '\\eb70'
  });
  Codicon.triangleUp = new Codicon('triangle-up', {
    character: '\\eb71'
  });
  Codicon.twitter = new Codicon('twitter', {
    character: '\\eb72'
  });
  Codicon.unfold = new Codicon('unfold', {
    character: '\\eb73'
  });
  Codicon.unlock = new Codicon('unlock', {
    character: '\\eb74'
  });
  Codicon.unmute = new Codicon('unmute', {
    character: '\\eb75'
  });
  Codicon.unverified = new Codicon('unverified', {
    character: '\\eb76'
  });
  Codicon.verified = new Codicon('verified', {
    character: '\\eb77'
  });
  Codicon.versions = new Codicon('versions', {
    character: '\\eb78'
  });
  Codicon.vmActive = new Codicon('vm-active', {
    character: '\\eb79'
  });
  Codicon.vmOutline = new Codicon('vm-outline', {
    character: '\\eb7a'
  });
  Codicon.vmRunning = new Codicon('vm-running', {
    character: '\\eb7b'
  });
  Codicon.watch = new Codicon('watch', {
    character: '\\eb7c'
  });
  Codicon.whitespace = new Codicon('whitespace', {
    character: '\\eb7d'
  });
  Codicon.wholeWord = new Codicon('whole-word', {
    character: '\\eb7e'
  });
  Codicon.window = new Codicon('window', {
    character: '\\eb7f'
  });
  Codicon.wordWrap = new Codicon('word-wrap', {
    character: '\\eb80'
  });
  Codicon.zoomIn = new Codicon('zoom-in', {
    character: '\\eb81'
  });
  Codicon.zoomOut = new Codicon('zoom-out', {
    character: '\\eb82'
  });
  Codicon.listFilter = new Codicon('list-filter', {
    character: '\\eb83'
  });
  Codicon.listFlat = new Codicon('list-flat', {
    character: '\\eb84'
  });
  Codicon.listSelection = new Codicon('list-selection', {
    character: '\\eb85'
  });
  Codicon.selection = new Codicon('selection', {
    character: '\\eb85'
  });
  Codicon.listTree = new Codicon('list-tree', {
    character: '\\eb86'
  });
  Codicon.debugBreakpointFunctionUnverified = new Codicon('debug-breakpoint-function-unverified', {
    character: '\\eb87'
  });
  Codicon.debugBreakpointFunction = new Codicon('debug-breakpoint-function', {
    character: '\\eb88'
  });
  Codicon.debugBreakpointFunctionDisabled = new Codicon('debug-breakpoint-function-disabled', {
    character: '\\eb88'
  });
  Codicon.debugStackframeActive = new Codicon('debug-stackframe-active', {
    character: '\\eb89'
  });
  Codicon.debugStackframeDot = new Codicon('debug-stackframe-dot', {
    character: '\\eb8a'
  });
  Codicon.debugStackframe = new Codicon('debug-stackframe', {
    character: '\\eb8b'
  });
  Codicon.debugStackframeFocused = new Codicon('debug-stackframe-focused', {
    character: '\\eb8b'
  });
  Codicon.debugBreakpointUnsupported = new Codicon('debug-breakpoint-unsupported', {
    character: '\\eb8c'
  });
  Codicon.symbolString = new Codicon('symbol-string', {
    character: '\\eb8d'
  });
  Codicon.debugReverseContinue = new Codicon('debug-reverse-continue', {
    character: '\\eb8e'
  });
  Codicon.debugStepBack = new Codicon('debug-step-back', {
    character: '\\eb8f'
  });
  Codicon.debugRestartFrame = new Codicon('debug-restart-frame', {
    character: '\\eb90'
  });
  Codicon.callIncoming = new Codicon('call-incoming', {
    character: '\\eb92'
  });
  Codicon.callOutgoing = new Codicon('call-outgoing', {
    character: '\\eb93'
  });
  Codicon.menu = new Codicon('menu', {
    character: '\\eb94'
  });
  Codicon.expandAll = new Codicon('expand-all', {
    character: '\\eb95'
  });
  Codicon.feedback = new Codicon('feedback', {
    character: '\\eb96'
  });
  Codicon.groupByRefType = new Codicon('group-by-ref-type', {
    character: '\\eb97'
  });
  Codicon.ungroupByRefType = new Codicon('ungroup-by-ref-type', {
    character: '\\eb98'
  });
  Codicon.account = new Codicon('account', {
    character: '\\eb99'
  });
  Codicon.bellDot = new Codicon('bell-dot', {
    character: '\\eb9a'
  });
  Codicon.debugConsole = new Codicon('debug-console', {
    character: '\\eb9b'
  });
  Codicon.library = new Codicon('library', {
    character: '\\eb9c'
  });
  Codicon.output = new Codicon('output', {
    character: '\\eb9d'
  });
  Codicon.runAll = new Codicon('run-all', {
    character: '\\eb9e'
  });
  Codicon.syncIgnored = new Codicon('sync-ignored', {
    character: '\\eb9f'
  });
  Codicon.pinned = new Codicon('pinned', {
    character: '\\eba0'
  });
  Codicon.githubInverted = new Codicon('github-inverted', {
    character: '\\eba1'
  });
  Codicon.debugAlt = new Codicon('debug-alt', {
    character: '\\eb91'
  });
  Codicon.serverProcess = new Codicon('server-process', {
    character: '\\eba2'
  });
  Codicon.serverEnvironment = new Codicon('server-environment', {
    character: '\\eba3'
  });
  Codicon.pass = new Codicon('pass', {
    character: '\\eba4'
  });
  Codicon.stopCircle = new Codicon('stop-circle', {
    character: '\\eba5'
  });
  Codicon.playCircle = new Codicon('play-circle', {
    character: '\\eba6'
  });
  Codicon.record = new Codicon('record', {
    character: '\\eba7'
  });
  Codicon.debugAltSmall = new Codicon('debug-alt-small', {
    character: '\\eba8'
  });
  Codicon.vmConnect = new Codicon('vm-connect', {
    character: '\\eba9'
  });
  Codicon.cloud = new Codicon('cloud', {
    character: '\\ebaa'
  });
  Codicon.merge = new Codicon('merge', {
    character: '\\ebab'
  });
})(codicons_Codicon || (codicons_Codicon = {}));

var escapeCodiconsRegex = /(\\)?\$\([a-z0-9\-]+?(?:~[a-z0-9\-]*?)?\)/gi;
function escapeCodicons(text) {
  return text.replace(escapeCodiconsRegex, function (match, escaped) {
    return escaped ? match : "\\".concat(match);
  });
}
var markdownEscapedCodiconsRegex = /\\\$\([a-z0-9\-]+?(?:~[a-z0-9\-]*?)?\)/gi;
function markdownEscapeEscapedCodicons(text) {
  // Need to add an extra \ for escaping in markdown
  return text.replace(markdownEscapedCodiconsRegex, function (match) {
    return "\\".concat(match);
  });
}
var renderCodiconsRegex = /(\\)?\$\((([a-z0-9\-]+?)(?:~([a-z0-9\-]*?))?)\)/gi;
/**
 * @deprecated Use `renderCodiconsAsElement` instead
 */

function renderCodicons(text) {
  return text.replace(renderCodiconsRegex, function (_, escaped, codicon, name, animation) {
    // If the class for codicons is changed, it should also be updated in src\vs\base\browser\markdownRenderer.ts
    return escaped ? "$(".concat(codicon, ")") : "<span class=\"codicon codicon-".concat(name).concat(animation ? " codicon-animation-".concat(animation) : '', "\"></span>");
  });
}
var stripCodiconsRegex = /(\s)?(\\)?\$\([a-z0-9\-]+?(?:~[a-z0-9\-]*?)?\)(\s)?/gi;
function stripCodicons(text) {
  if (text.indexOf(codiconStartMarker) === -1) {
    return text;
  }

  return text.replace(stripCodiconsRegex, function (match, preWhitespace, escaped, postWhitespace) {
    return escaped ? match : preWhitespace || postWhitespace || '';
  });
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/common/modes.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/





/**
 * @internal
 */

var modes_LanguageIdentifier = function LanguageIdentifier(language, id) {
  _classCallCheck(this, LanguageIdentifier);

  this.language = language;
  this.id = id;
};
/**
 * @internal
 */

var modes_TokenMetadata = /*#__PURE__*/function () {
  function TokenMetadata() {
    _classCallCheck(this, TokenMetadata);
  }

  _createClass(TokenMetadata, null, [{
    key: "getLanguageId",
    value: function getLanguageId(metadata) {
      return (metadata & 255
      /* LANGUAGEID_MASK */
      ) >>> 0
      /* LANGUAGEID_OFFSET */
      ;
    }
  }, {
    key: "getTokenType",
    value: function getTokenType(metadata) {
      return (metadata & 1792
      /* TOKEN_TYPE_MASK */
      ) >>> 8
      /* TOKEN_TYPE_OFFSET */
      ;
    }
  }, {
    key: "getFontStyle",
    value: function getFontStyle(metadata) {
      return (metadata & 14336
      /* FONT_STYLE_MASK */
      ) >>> 11
      /* FONT_STYLE_OFFSET */
      ;
    }
  }, {
    key: "getForeground",
    value: function getForeground(metadata) {
      return (metadata & 8372224
      /* FOREGROUND_MASK */
      ) >>> 14
      /* FOREGROUND_OFFSET */
      ;
    }
  }, {
    key: "getBackground",
    value: function getBackground(metadata) {
      return (metadata & 4286578688
      /* BACKGROUND_MASK */
      ) >>> 23
      /* BACKGROUND_OFFSET */
      ;
    }
  }, {
    key: "getClassNameFromMetadata",
    value: function getClassNameFromMetadata(metadata) {
      var foreground = this.getForeground(metadata);
      var className = 'mtk' + foreground;
      var fontStyle = this.getFontStyle(metadata);

      if (fontStyle & 1
      /* Italic */
      ) {
          className += ' mtki';
        }

      if (fontStyle & 2
      /* Bold */
      ) {
          className += ' mtkb';
        }

      if (fontStyle & 4
      /* Underline */
      ) {
          className += ' mtku';
        }

      return className;
    }
  }, {
    key: "getInlineStyleFromMetadata",
    value: function getInlineStyleFromMetadata(metadata, colorMap) {
      var foreground = this.getForeground(metadata);
      var fontStyle = this.getFontStyle(metadata);
      var result = "color: ".concat(colorMap[foreground], ";");

      if (fontStyle & 1
      /* Italic */
      ) {
          result += 'font-style: italic;';
        }

      if (fontStyle & 2
      /* Bold */
      ) {
          result += 'font-weight: bold;';
        }

      if (fontStyle & 4
      /* Underline */
      ) {
          result += 'text-decoration: underline;';
        }

      return result;
    }
  }]);

  return TokenMetadata;
}();
/**
 * @internal
 */

var completionKindToCssClass = function () {
  var data = Object.create(null);
  data[0
  /* Method */
  ] = 'symbol-method';
  data[1
  /* Function */
  ] = 'symbol-function';
  data[2
  /* Constructor */
  ] = 'symbol-constructor';
  data[3
  /* Field */
  ] = 'symbol-field';
  data[4
  /* Variable */
  ] = 'symbol-variable';
  data[5
  /* Class */
  ] = 'symbol-class';
  data[6
  /* Struct */
  ] = 'symbol-struct';
  data[7
  /* Interface */
  ] = 'symbol-interface';
  data[8
  /* Module */
  ] = 'symbol-module';
  data[9
  /* Property */
  ] = 'symbol-property';
  data[10
  /* Event */
  ] = 'symbol-event';
  data[11
  /* Operator */
  ] = 'symbol-operator';
  data[12
  /* Unit */
  ] = 'symbol-unit';
  data[13
  /* Value */
  ] = 'symbol-value';
  data[14
  /* Constant */
  ] = 'symbol-constant';
  data[15
  /* Enum */
  ] = 'symbol-enum';
  data[16
  /* EnumMember */
  ] = 'symbol-enum-member';
  data[17
  /* Keyword */
  ] = 'symbol-keyword';
  data[27
  /* Snippet */
  ] = 'symbol-snippet';
  data[18
  /* Text */
  ] = 'symbol-text';
  data[19
  /* Color */
  ] = 'symbol-color';
  data[20
  /* File */
  ] = 'symbol-file';
  data[21
  /* Reference */
  ] = 'symbol-reference';
  data[22
  /* Customcolor */
  ] = 'symbol-customcolor';
  data[23
  /* Folder */
  ] = 'symbol-folder';
  data[24
  /* TypeParameter */
  ] = 'symbol-type-parameter';
  data[25
  /* User */
  ] = 'account';
  data[26
  /* Issue */
  ] = 'issues';
  return function (kind) {
    var name = data[kind];
    var codicon = name && iconRegistry.get(name);

    if (!codicon) {
      console.info('No codicon found for CompletionItemKind ' + kind);
      codicon = codicons_Codicon.symbolProperty;
    }

    return codicon.classNames;
  };
}();
/**
 * @internal
 */

var completionKindFromString = function () {
  var data = Object.create(null);
  data['method'] = 0
  /* Method */
  ;
  data['function'] = 1
  /* Function */
  ;
  data['constructor'] = 2
  /* Constructor */
  ;
  data['field'] = 3
  /* Field */
  ;
  data['variable'] = 4
  /* Variable */
  ;
  data['class'] = 5
  /* Class */
  ;
  data['struct'] = 6
  /* Struct */
  ;
  data['interface'] = 7
  /* Interface */
  ;
  data['module'] = 8
  /* Module */
  ;
  data['property'] = 9
  /* Property */
  ;
  data['event'] = 10
  /* Event */
  ;
  data['operator'] = 11
  /* Operator */
  ;
  data['unit'] = 12
  /* Unit */
  ;
  data['value'] = 13
  /* Value */
  ;
  data['constant'] = 14
  /* Constant */
  ;
  data['enum'] = 15
  /* Enum */
  ;
  data['enum-member'] = 16
  /* EnumMember */
  ;
  data['enumMember'] = 16
  /* EnumMember */
  ;
  data['keyword'] = 17
  /* Keyword */
  ;
  data['snippet'] = 27
  /* Snippet */
  ;
  data['text'] = 18
  /* Text */
  ;
  data['color'] = 19
  /* Color */
  ;
  data['file'] = 20
  /* File */
  ;
  data['reference'] = 21
  /* Reference */
  ;
  data['customcolor'] = 22
  /* Customcolor */
  ;
  data['folder'] = 23
  /* Folder */
  ;
  data['type-parameter'] = 24
  /* TypeParameter */
  ;
  data['typeParameter'] = 24
  /* TypeParameter */
  ;
  data['account'] = 25
  /* User */
  ;
  data['issue'] = 26
  /* Issue */
  ;
  return function (value, strict) {
    var res = data[value];

    if (typeof res === 'undefined' && !strict) {
      res = 9
      /* Property */
      ;
    }

    return res;
  };
}();
var SignatureHelpTriggerKind;

(function (SignatureHelpTriggerKind) {
  SignatureHelpTriggerKind[SignatureHelpTriggerKind["Invoke"] = 1] = "Invoke";
  SignatureHelpTriggerKind[SignatureHelpTriggerKind["TriggerCharacter"] = 2] = "TriggerCharacter";
  SignatureHelpTriggerKind[SignatureHelpTriggerKind["ContentChange"] = 3] = "ContentChange";
})(SignatureHelpTriggerKind || (SignatureHelpTriggerKind = {}));
/**
 * A document highlight kind.
 */


var DocumentHighlightKind;

(function (DocumentHighlightKind) {
  /**
   * A textual occurrence.
   */
  DocumentHighlightKind[DocumentHighlightKind["Text"] = 0] = "Text";
  /**
   * Read-access of a symbol, like reading a variable.
   */

  DocumentHighlightKind[DocumentHighlightKind["Read"] = 1] = "Read";
  /**
   * Write-access of a symbol, like writing to a variable.
   */

  DocumentHighlightKind[DocumentHighlightKind["Write"] = 2] = "Write";
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * @internal
 */


function isLocationLink(thing) {
  return thing && uri_URI.isUri(thing.uri) && range_Range.isIRange(thing.range) && (range_Range.isIRange(thing.originSelectionRange) || range_Range.isIRange(thing.targetSelectionRange));
}
/**
 * @internal
 */

var modes_SymbolKinds;

(function (SymbolKinds) {
  var byName = new Map();
  byName.set('file', 0
  /* File */
  );
  byName.set('module', 1
  /* Module */
  );
  byName.set('namespace', 2
  /* Namespace */
  );
  byName.set('package', 3
  /* Package */
  );
  byName.set('class', 4
  /* Class */
  );
  byName.set('method', 5
  /* Method */
  );
  byName.set('property', 6
  /* Property */
  );
  byName.set('field', 7
  /* Field */
  );
  byName.set('constructor', 8
  /* Constructor */
  );
  byName.set('enum', 9
  /* Enum */
  );
  byName.set('interface', 10
  /* Interface */
  );
  byName.set('function', 11
  /* Function */
  );
  byName.set('variable', 12
  /* Variable */
  );
  byName.set('constant', 13
  /* Constant */
  );
  byName.set('string', 14
  /* String */
  );
  byName.set('number', 15
  /* Number */
  );
  byName.set('boolean', 16
  /* Boolean */
  );
  byName.set('array', 17
  /* Array */
  );
  byName.set('object', 18
  /* Object */
  );
  byName.set('key', 19
  /* Key */
  );
  byName.set('null', 20
  /* Null */
  );
  byName.set('enum-member', 21
  /* EnumMember */
  );
  byName.set('struct', 22
  /* Struct */
  );
  byName.set('event', 23
  /* Event */
  );
  byName.set('operator', 24
  /* Operator */
  );
  byName.set('type-parameter', 25
  /* TypeParameter */
  );
  var byKind = new Map();
  byKind.set(0
  /* File */
  , 'file');
  byKind.set(1
  /* Module */
  , 'module');
  byKind.set(2
  /* Namespace */
  , 'namespace');
  byKind.set(3
  /* Package */
  , 'package');
  byKind.set(4
  /* Class */
  , 'class');
  byKind.set(5
  /* Method */
  , 'method');
  byKind.set(6
  /* Property */
  , 'property');
  byKind.set(7
  /* Field */
  , 'field');
  byKind.set(8
  /* Constructor */
  , 'constructor');
  byKind.set(9
  /* Enum */
  , 'enum');
  byKind.set(10
  /* Interface */
  , 'interface');
  byKind.set(11
  /* Function */
  , 'function');
  byKind.set(12
  /* Variable */
  , 'variable');
  byKind.set(13
  /* Constant */
  , 'constant');
  byKind.set(14
  /* String */
  , 'string');
  byKind.set(15
  /* Number */
  , 'number');
  byKind.set(16
  /* Boolean */
  , 'boolean');
  byKind.set(17
  /* Array */
  , 'array');
  byKind.set(18
  /* Object */
  , 'object');
  byKind.set(19
  /* Key */
  , 'key');
  byKind.set(20
  /* Null */
  , 'null');
  byKind.set(21
  /* EnumMember */
  , 'enum-member');
  byKind.set(22
  /* Struct */
  , 'struct');
  byKind.set(23
  /* Event */
  , 'event');
  byKind.set(24
  /* Operator */
  , 'operator');
  byKind.set(25
  /* TypeParameter */
  , 'type-parameter');
  /**
   * @internal
   */

  function fromString(value) {
    return byName.get(value);
  }

  SymbolKinds.fromString = fromString;
  /**
   * @internal
   */

  function toString(kind) {
    return byKind.get(kind);
  }

  SymbolKinds.toString = toString;
  /**
   * @internal
   */

  function toCssClassName(kind, inline) {
    var symbolName = byKind.get(kind);
    var codicon = symbolName && iconRegistry.get('symbol-' + symbolName);

    if (!codicon) {
      console.info('No codicon found for SymbolKind ' + kind);
      codicon = codicons_Codicon.symbolProperty;
    }

    return "".concat(inline ? 'inline' : 'block', " ").concat(codicon.classNames);
  }

  SymbolKinds.toCssClassName = toCssClassName;
})(modes_SymbolKinds || (modes_SymbolKinds = {}));

var modes_FoldingRangeKind =
/**
 * Creates a new [FoldingRangeKind](#FoldingRangeKind).
 *
 * @param value of the kind.
 */
function FoldingRangeKind(value) {
  _classCallCheck(this, FoldingRangeKind);

  this.value = value;
};
/**
 * Kind for folding range representing a comment. The value of the kind is 'comment'.
 */

modes_FoldingRangeKind.Comment = new modes_FoldingRangeKind('comment');
/**
 * Kind for folding range representing a import. The value of the kind is 'imports'.
 */

modes_FoldingRangeKind.Imports = new modes_FoldingRangeKind('imports');
/**
 * Kind for folding range representing regions (for example marked by `#region`, `#endregion`).
 * The value of the kind is 'region'.
 */

modes_FoldingRangeKind.Region = new modes_FoldingRangeKind('region'); // --- feature registries ------

/**
 * @internal
 */

var ReferenceProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var RenameProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var CompletionProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var SignatureHelpProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var HoverProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var DocumentSymbolProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var DocumentHighlightProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var OnTypeRenameProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var DefinitionProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var DeclarationProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var ImplementationProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var TypeDefinitionProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var CodeLensProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var CodeActionProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var DocumentFormattingEditProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var DocumentRangeFormattingEditProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var OnTypeFormattingEditProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var LinkProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var ColorProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var SelectionRangeRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var FoldingRangeProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var DocumentSemanticTokensProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var DocumentRangeSemanticTokensProviderRegistry = new languageFeatureRegistry_LanguageFeatureRegistry();
/**
 * @internal
 */

var TokenizationRegistry = new tokenizationRegistry_TokenizationRegistryImpl();
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/common/modes/nullMode.js



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



var nullMode_NullStateImpl = /*#__PURE__*/function () {
  function NullStateImpl() {
    _classCallCheck(this, NullStateImpl);
  }

  _createClass(NullStateImpl, [{
    key: "clone",
    value: function clone() {
      return this;
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this === other;
    }
  }]);

  return NullStateImpl;
}();

var NULL_STATE = new nullMode_NullStateImpl();
var NULL_MODE_ID = 'vs.editor.nullMode';
var NULL_LANGUAGE_IDENTIFIER = new modes_LanguageIdentifier(NULL_MODE_ID, 0
/* Null */
);
function nullTokenize(modeId, buffer, state, deltaOffset) {
  return new token_TokenizationResult([new token_Token(deltaOffset, '', modeId)], state);
}
function nullTokenize2(languageId, buffer, state, deltaOffset) {
  var tokens = new Uint32Array(2);
  tokens[0] = deltaOffset;
  tokens[1] = (languageId << 0
  /* LANGUAGEID_OFFSET */
  | 0
  /* Other */
  << 8
  /* TOKEN_TYPE_OFFSET */
  | 0
  /* None */
  << 11
  /* FONT_STYLE_OFFSET */
  | 1
  /* DefaultForeground */
  << 14
  /* FOREGROUND_OFFSET */
  | 2
  /* DefaultBackground */
  << 23
  /* BACKGROUND_OFFSET */
  ) >>> 0;
  return new token_TokenizationResult2(tokens, state === null ? NULL_STATE : state);
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/standalone/common/monarch/monarchCommon.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function isFuzzyActionArr(what) {
  return Array.isArray(what);
}
function isFuzzyAction(what) {
  return !isFuzzyActionArr(what);
}
function isString(what) {
  return typeof what === 'string';
}
function isIAction(what) {
  return !isString(what);
} // Small helper functions

/**
 * Is a string null, undefined, or empty?
 */

function monarchCommon_empty(s) {
  return s ? false : true;
}
/**
 * Puts a string to lower case if 'ignoreCase' is set.
 */

function fixCase(lexer, str) {
  return lexer.ignoreCase && str ? str.toLowerCase() : str;
}
/**
 * Ensures there are no bad characters in a CSS token class.
 */

function sanitize(s) {
  return s.replace(/[&<>'"_]/g, '-'); // used on all output token CSS classes
} // Logging

/**
 * Logs a message.
 */

function log(lexer, msg) {
  console.log("".concat(lexer.languageId, ": ").concat(msg));
} // Throwing errors

function createError(lexer, msg) {
  return new Error("".concat(lexer.languageId, ": ").concat(msg));
} // Helper functions for rule finding and substitution

/**
 * substituteMatches is used on lexer strings and can substitutes predefined patterns:
 * 		$$  => $
 * 		$#  => id
 * 		$n  => matched entry n
 * 		@attr => contents of lexer[attr]
 *
 * See documentation for more info
 */

function substituteMatches(lexer, str, id, matches, state) {
  var re = /\$((\$)|(#)|(\d\d?)|[sS](\d\d?)|@(\w+))/g;
  var stateMatches = null;
  return str.replace(re, function (full, sub, dollar, hash, n, s, attr, ofs, total) {
    if (!monarchCommon_empty(dollar)) {
      return '$'; // $$
    }

    if (!monarchCommon_empty(hash)) {
      return fixCase(lexer, id); // default $#
    }

    if (!monarchCommon_empty(n) && n < matches.length) {
      return fixCase(lexer, matches[n]); // $n
    }

    if (!monarchCommon_empty(attr) && lexer && typeof lexer[attr] === 'string') {
      return lexer[attr]; //@attribute
    }

    if (stateMatches === null) {
      // split state on demand
      stateMatches = state.split('.');
      stateMatches.unshift(state);
    }

    if (!monarchCommon_empty(s) && s < stateMatches.length) {
      return fixCase(lexer, stateMatches[s]); //$Sn
    }

    return '';
  });
}
/**
 * Find the tokenizer rules for a specific state (i.e. next action)
 */

function findRules(lexer, inState) {
  var state = inState;

  while (state && state.length > 0) {
    var rules = lexer.tokenizer[state];

    if (rules) {
      return rules;
    }

    var idx = state.lastIndexOf('.');

    if (idx < 0) {
      state = null; // no further parent
    } else {
      state = state.substr(0, idx);
    }
  }

  return null;
}
/**
 * Is a certain state defined? In contrast to 'findRules' this works on a ILexerMin.
 * This is used during compilation where we may know the defined states
 * but not yet whether the corresponding rules are correct.
 */

function stateExists(lexer, inState) {
  var state = inState;

  while (state && state.length > 0) {
    var exist = lexer.stateNames[state];

    if (exist) {
      return true;
    }

    var idx = state.lastIndexOf('.');

    if (idx < 0) {
      state = null; // no further parent
    } else {
      state = state.substr(0, idx);
    }
  }

  return false;
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/standalone/common/monarch/monarchLexer.js




/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/




var CACHE_STACK_DEPTH = 5;
/**
 * Reuse the same stack elements up to a certain depth.
 */

var monarchLexer_MonarchStackElementFactory = /*#__PURE__*/function () {
  function MonarchStackElementFactory(maxCacheDepth) {
    _classCallCheck(this, MonarchStackElementFactory);

    this._maxCacheDepth = maxCacheDepth;
    this._entries = Object.create(null);
  }

  _createClass(MonarchStackElementFactory, [{
    key: "create",
    value: function create(parent, state) {
      if (parent !== null && parent.depth >= this._maxCacheDepth) {
        // no caching above a certain depth
        return new monarchLexer_MonarchStackElement(parent, state);
      }

      var stackElementId = monarchLexer_MonarchStackElement.getStackElementId(parent);

      if (stackElementId.length > 0) {
        stackElementId += '|';
      }

      stackElementId += state;
      var result = this._entries[stackElementId];

      if (result) {
        return result;
      }

      result = new monarchLexer_MonarchStackElement(parent, state);
      this._entries[stackElementId] = result;
      return result;
    }
  }], [{
    key: "create",
    value: function create(parent, state) {
      return this._INSTANCE.create(parent, state);
    }
  }]);

  return MonarchStackElementFactory;
}();

monarchLexer_MonarchStackElementFactory._INSTANCE = new monarchLexer_MonarchStackElementFactory(CACHE_STACK_DEPTH);

var monarchLexer_MonarchStackElement = /*#__PURE__*/function () {
  function MonarchStackElement(parent, state) {
    _classCallCheck(this, MonarchStackElement);

    this.parent = parent;
    this.state = state;
    this.depth = (this.parent ? this.parent.depth : 0) + 1;
  }

  _createClass(MonarchStackElement, [{
    key: "equals",
    value: function equals(other) {
      return MonarchStackElement._equals(this, other);
    }
  }, {
    key: "push",
    value: function push(state) {
      return monarchLexer_MonarchStackElementFactory.create(this, state);
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.parent;
    }
  }, {
    key: "popall",
    value: function popall() {
      var result = this;

      while (result.parent) {
        result = result.parent;
      }

      return result;
    }
  }, {
    key: "switchTo",
    value: function switchTo(state) {
      return monarchLexer_MonarchStackElementFactory.create(this.parent, state);
    }
  }], [{
    key: "getStackElementId",
    value: function getStackElementId(element) {
      var result = '';

      while (element !== null) {
        if (result.length > 0) {
          result += '|';
        }

        result += element.state;
        element = element.parent;
      }

      return result;
    }
  }, {
    key: "_equals",
    value: function _equals(a, b) {
      while (a !== null && b !== null) {
        if (a === b) {
          return true;
        }

        if (a.state !== b.state) {
          return false;
        }

        a = a.parent;
        b = b.parent;
      }

      if (a === null && b === null) {
        return true;
      }

      return false;
    }
  }]);

  return MonarchStackElement;
}();

var monarchLexer_EmbeddedModeData = /*#__PURE__*/function () {
  function EmbeddedModeData(modeId, state) {
    _classCallCheck(this, EmbeddedModeData);

    this.modeId = modeId;
    this.state = state;
  }

  _createClass(EmbeddedModeData, [{
    key: "equals",
    value: function equals(other) {
      return this.modeId === other.modeId && this.state.equals(other.state);
    }
  }, {
    key: "clone",
    value: function clone() {
      var stateClone = this.state.clone(); // save an object

      if (stateClone === this.state) {
        return this;
      }

      return new EmbeddedModeData(this.modeId, this.state);
    }
  }]);

  return EmbeddedModeData;
}();
/**
 * Reuse the same line states up to a certain depth.
 */


var monarchLexer_MonarchLineStateFactory = /*#__PURE__*/function () {
  function MonarchLineStateFactory(maxCacheDepth) {
    _classCallCheck(this, MonarchLineStateFactory);

    this._maxCacheDepth = maxCacheDepth;
    this._entries = Object.create(null);
  }

  _createClass(MonarchLineStateFactory, [{
    key: "create",
    value: function create(stack, embeddedModeData) {
      if (embeddedModeData !== null) {
        // no caching when embedding
        return new monarchLexer_MonarchLineState(stack, embeddedModeData);
      }

      if (stack !== null && stack.depth >= this._maxCacheDepth) {
        // no caching above a certain depth
        return new monarchLexer_MonarchLineState(stack, embeddedModeData);
      }

      var stackElementId = monarchLexer_MonarchStackElement.getStackElementId(stack);
      var result = this._entries[stackElementId];

      if (result) {
        return result;
      }

      result = new monarchLexer_MonarchLineState(stack, null);
      this._entries[stackElementId] = result;
      return result;
    }
  }], [{
    key: "create",
    value: function create(stack, embeddedModeData) {
      return this._INSTANCE.create(stack, embeddedModeData);
    }
  }]);

  return MonarchLineStateFactory;
}();

monarchLexer_MonarchLineStateFactory._INSTANCE = new monarchLexer_MonarchLineStateFactory(CACHE_STACK_DEPTH);

var monarchLexer_MonarchLineState = /*#__PURE__*/function () {
  function MonarchLineState(stack, embeddedModeData) {
    _classCallCheck(this, MonarchLineState);

    this.stack = stack;
    this.embeddedModeData = embeddedModeData;
  }

  _createClass(MonarchLineState, [{
    key: "clone",
    value: function clone() {
      var embeddedModeDataClone = this.embeddedModeData ? this.embeddedModeData.clone() : null; // save an object

      if (embeddedModeDataClone === this.embeddedModeData) {
        return this;
      }

      return monarchLexer_MonarchLineStateFactory.create(this.stack, this.embeddedModeData);
    }
  }, {
    key: "equals",
    value: function equals(other) {
      if (!(other instanceof MonarchLineState)) {
        return false;
      }

      if (!this.stack.equals(other.stack)) {
        return false;
      }

      if (this.embeddedModeData === null && other.embeddedModeData === null) {
        return true;
      }

      if (this.embeddedModeData === null || other.embeddedModeData === null) {
        return false;
      }

      return this.embeddedModeData.equals(other.embeddedModeData);
    }
  }]);

  return MonarchLineState;
}();

var monarchLexer_MonarchClassicTokensCollector = /*#__PURE__*/function () {
  function MonarchClassicTokensCollector() {
    _classCallCheck(this, MonarchClassicTokensCollector);

    this._tokens = [];
    this._language = null;
    this._lastTokenType = null;
    this._lastTokenLanguage = null;
  }

  _createClass(MonarchClassicTokensCollector, [{
    key: "enterMode",
    value: function enterMode(startOffset, modeId) {
      this._language = modeId;
    }
  }, {
    key: "emit",
    value: function emit(startOffset, type) {
      if (this._lastTokenType === type && this._lastTokenLanguage === this._language) {
        return;
      }

      this._lastTokenType = type;
      this._lastTokenLanguage = this._language;

      this._tokens.push(new token_Token(startOffset, type, this._language));
    }
  }, {
    key: "nestedModeTokenize",
    value: function nestedModeTokenize(embeddedModeLine, embeddedModeData, offsetDelta) {
      var nestedModeId = embeddedModeData.modeId;
      var embeddedModeState = embeddedModeData.state;
      var nestedModeTokenizationSupport = TokenizationRegistry.get(nestedModeId);

      if (!nestedModeTokenizationSupport) {
        this.enterMode(offsetDelta, nestedModeId);
        this.emit(offsetDelta, '');
        return embeddedModeState;
      }

      var nestedResult = nestedModeTokenizationSupport.tokenize(embeddedModeLine, embeddedModeState, offsetDelta);
      this._tokens = this._tokens.concat(nestedResult.tokens);
      this._lastTokenType = null;
      this._lastTokenLanguage = null;
      this._language = null;
      return nestedResult.endState;
    }
  }, {
    key: "finalize",
    value: function finalize(endState) {
      return new token_TokenizationResult(this._tokens, endState);
    }
  }]);

  return MonarchClassicTokensCollector;
}();

var monarchLexer_MonarchModernTokensCollector = /*#__PURE__*/function () {
  function MonarchModernTokensCollector(modeService, theme) {
    _classCallCheck(this, MonarchModernTokensCollector);

    this._modeService = modeService;
    this._theme = theme;
    this._prependTokens = null;
    this._tokens = [];
    this._currentLanguageId = 0
    /* Null */
    ;
    this._lastTokenMetadata = 0;
  }

  _createClass(MonarchModernTokensCollector, [{
    key: "enterMode",
    value: function enterMode(startOffset, modeId) {
      this._currentLanguageId = this._modeService.getLanguageIdentifier(modeId).id;
    }
  }, {
    key: "emit",
    value: function emit(startOffset, type) {
      var metadata = this._theme.match(this._currentLanguageId, type);

      if (this._lastTokenMetadata === metadata) {
        return;
      }

      this._lastTokenMetadata = metadata;

      this._tokens.push(startOffset);

      this._tokens.push(metadata);
    }
  }, {
    key: "nestedModeTokenize",
    value: function nestedModeTokenize(embeddedModeLine, embeddedModeData, offsetDelta) {
      var nestedModeId = embeddedModeData.modeId;
      var embeddedModeState = embeddedModeData.state;
      var nestedModeTokenizationSupport = TokenizationRegistry.get(nestedModeId);

      if (!nestedModeTokenizationSupport) {
        this.enterMode(offsetDelta, nestedModeId);
        this.emit(offsetDelta, '');
        return embeddedModeState;
      }

      var nestedResult = nestedModeTokenizationSupport.tokenize2(embeddedModeLine, embeddedModeState, offsetDelta);
      this._prependTokens = MonarchModernTokensCollector._merge(this._prependTokens, this._tokens, nestedResult.tokens);
      this._tokens = [];
      this._currentLanguageId = 0;
      this._lastTokenMetadata = 0;
      return nestedResult.endState;
    }
  }, {
    key: "finalize",
    value: function finalize(endState) {
      return new token_TokenizationResult2(MonarchModernTokensCollector._merge(this._prependTokens, this._tokens, null), endState);
    }
  }], [{
    key: "_merge",
    value: function _merge(a, b, c) {
      var aLen = a !== null ? a.length : 0;
      var bLen = b.length;
      var cLen = c !== null ? c.length : 0;

      if (aLen === 0 && bLen === 0 && cLen === 0) {
        return new Uint32Array(0);
      }

      if (aLen === 0 && bLen === 0) {
        return c;
      }

      if (bLen === 0 && cLen === 0) {
        return a;
      }

      var result = new Uint32Array(aLen + bLen + cLen);

      if (a !== null) {
        result.set(a);
      }

      for (var i = 0; i < bLen; i++) {
        result[aLen + i] = b[i];
      }

      if (c !== null) {
        result.set(c, aLen + bLen);
      }

      return result;
    }
  }]);

  return MonarchModernTokensCollector;
}();

var monarchLexer_MonarchTokenizer = /*#__PURE__*/function () {
  function MonarchTokenizer(modeService, standaloneThemeService, modeId, lexer) {
    var _this = this;

    _classCallCheck(this, MonarchTokenizer);

    this._modeService = modeService;
    this._standaloneThemeService = standaloneThemeService;
    this._modeId = modeId;
    this._lexer = lexer;
    this._embeddedModes = Object.create(null);
    this.embeddedLoaded = Promise.resolve(undefined); // Set up listening for embedded modes

    var emitting = false;
    this._tokenizationRegistryListener = TokenizationRegistry.onDidChange(function (e) {
      if (emitting) {
        return;
      }

      var isOneOfMyEmbeddedModes = false;

      for (var i = 0, len = e.changedLanguages.length; i < len; i++) {
        var language = e.changedLanguages[i];

        if (_this._embeddedModes[language]) {
          isOneOfMyEmbeddedModes = true;
          break;
        }
      }

      if (isOneOfMyEmbeddedModes) {
        emitting = true;
        TokenizationRegistry.fire([_this._modeId]);
        emitting = false;
      }
    });
  }

  _createClass(MonarchTokenizer, [{
    key: "dispose",
    value: function dispose() {
      this._tokenizationRegistryListener.dispose();
    }
  }, {
    key: "getLoadStatus",
    value: function getLoadStatus() {
      var promises = [];

      for (var nestedModeId in this._embeddedModes) {
        var tokenizationSupport = TokenizationRegistry.get(nestedModeId);

        if (tokenizationSupport) {
          // The nested mode is already loaded
          if (tokenizationSupport instanceof MonarchTokenizer) {
            var nestedModeStatus = tokenizationSupport.getLoadStatus();

            if (nestedModeStatus.loaded === false) {
              promises.push(nestedModeStatus.promise);
            }
          }

          continue;
        }

        var tokenizationSupportPromise = TokenizationRegistry.getPromise(nestedModeId);

        if (tokenizationSupportPromise) {
          // The nested mode is in the process of being loaded
          promises.push(tokenizationSupportPromise);
        }
      }

      if (promises.length === 0) {
        return {
          loaded: true
        };
      }

      return {
        loaded: false,
        promise: Promise.all(promises).then(function (_) {
          return undefined;
        })
      };
    }
  }, {
    key: "getInitialState",
    value: function getInitialState() {
      var rootState = monarchLexer_MonarchStackElementFactory.create(null, this._lexer.start);
      return monarchLexer_MonarchLineStateFactory.create(rootState, null);
    }
  }, {
    key: "tokenize",
    value: function tokenize(line, lineState, offsetDelta) {
      var tokensCollector = new monarchLexer_MonarchClassicTokensCollector();

      var endLineState = this._tokenize(line, lineState, offsetDelta, tokensCollector);

      return tokensCollector.finalize(endLineState);
    }
  }, {
    key: "tokenize2",
    value: function tokenize2(line, lineState, offsetDelta) {
      var tokensCollector = new monarchLexer_MonarchModernTokensCollector(this._modeService, this._standaloneThemeService.getColorTheme().tokenTheme);

      var endLineState = this._tokenize(line, lineState, offsetDelta, tokensCollector);

      return tokensCollector.finalize(endLineState);
    }
  }, {
    key: "_tokenize",
    value: function _tokenize(line, lineState, offsetDelta, collector) {
      if (lineState.embeddedModeData) {
        return this._nestedTokenize(line, lineState, offsetDelta, collector);
      } else {
        return this._myTokenize(line, lineState, offsetDelta, collector);
      }
    }
  }, {
    key: "_findLeavingNestedModeOffset",
    value: function _findLeavingNestedModeOffset(line, state) {
      var rules = this._lexer.tokenizer[state.stack.state];

      if (!rules) {
        rules = findRules(this._lexer, state.stack.state); // do parent matching

        if (!rules) {
          throw createError(this._lexer, 'tokenizer state is not defined: ' + state.stack.state);
        }
      }

      var popOffset = -1;
      var hasEmbeddedPopRule = false;

      var _iterator = _createForOfIteratorHelper(rules),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rule = _step.value;

          if (!isIAction(rule.action) || rule.action.nextEmbedded !== '@pop') {
            continue;
          }

          hasEmbeddedPopRule = true;
          var regex = rule.regex;
          var regexSource = rule.regex.source;

          if (regexSource.substr(0, 4) === '^(?:' && regexSource.substr(regexSource.length - 1, 1) === ')') {
            var flags = (regex.ignoreCase ? 'i' : '') + (regex.unicode ? 'u' : '');
            regex = new RegExp(regexSource.substr(4, regexSource.length - 5), flags);
          }

          var result = line.search(regex);

          if (result === -1 || result !== 0 && rule.matchOnlyAtLineStart) {
            continue;
          }

          if (popOffset === -1 || result < popOffset) {
            popOffset = result;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (!hasEmbeddedPopRule) {
        throw createError(this._lexer, 'no rule containing nextEmbedded: "@pop" in tokenizer embedded state: ' + state.stack.state);
      }

      return popOffset;
    }
  }, {
    key: "_nestedTokenize",
    value: function _nestedTokenize(line, lineState, offsetDelta, tokensCollector) {
      var popOffset = this._findLeavingNestedModeOffset(line, lineState);

      if (popOffset === -1) {
        // tokenization will not leave nested mode
        var nestedEndState = tokensCollector.nestedModeTokenize(line, lineState.embeddedModeData, offsetDelta);
        return monarchLexer_MonarchLineStateFactory.create(lineState.stack, new monarchLexer_EmbeddedModeData(lineState.embeddedModeData.modeId, nestedEndState));
      }

      var nestedModeLine = line.substring(0, popOffset);

      if (nestedModeLine.length > 0) {
        // tokenize with the nested mode
        tokensCollector.nestedModeTokenize(nestedModeLine, lineState.embeddedModeData, offsetDelta);
      }

      var restOfTheLine = line.substring(popOffset);
      return this._myTokenize(restOfTheLine, lineState, offsetDelta + popOffset, tokensCollector);
    }
  }, {
    key: "_safeRuleName",
    value: function _safeRuleName(rule) {
      if (rule) {
        return rule.name;
      }

      return '(unknown)';
    }
  }, {
    key: "_myTokenize",
    value: function _myTokenize(line, lineState, offsetDelta, tokensCollector) {
      var _this2 = this;

      tokensCollector.enterMode(offsetDelta, this._modeId);
      var lineLength = line.length;
      var embeddedModeData = lineState.embeddedModeData;
      var stack = lineState.stack;
      var pos = 0;
      var groupMatching = null; // See https://github.com/Microsoft/monaco-editor/issues/1235:
      // Evaluate rules at least once for an empty line

      var forceEvaluation = true;

      while (forceEvaluation || pos < lineLength) {
        var pos0 = pos;
        var stackLen0 = stack.depth;
        var groupLen0 = groupMatching ? groupMatching.groups.length : 0;
        var state = stack.state;
        var matches = null;
        var matched = null;
        var action = null;
        var rule = null;
        var enteringEmbeddedMode = null; // check if we need to process group matches first

        if (groupMatching) {
          matches = groupMatching.matches;
          var groupEntry = groupMatching.groups.shift();
          matched = groupEntry.matched;
          action = groupEntry.action;
          rule = groupMatching.rule; // cleanup if necessary

          if (groupMatching.groups.length === 0) {
            groupMatching = null;
          }
        } else {
          // otherwise we match on the token stream
          if (!forceEvaluation && pos >= lineLength) {
            // nothing to do
            break;
          }

          forceEvaluation = false; // get the rules for this state

          var rules = this._lexer.tokenizer[state];

          if (!rules) {
            rules = findRules(this._lexer, state); // do parent matching

            if (!rules) {
              throw createError(this._lexer, 'tokenizer state is not defined: ' + state);
            }
          } // try each rule until we match


          var restOfLine = line.substr(pos);

          var _iterator2 = _createForOfIteratorHelper(rules),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _rule = _step2.value;

              if (pos === 0 || !_rule.matchOnlyAtLineStart) {
                matches = restOfLine.match(_rule.regex);

                if (matches) {
                  matched = matches[0];
                  action = _rule.action;
                  break;
                }
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } // We matched 'rule' with 'matches' and 'action'


        if (!matches) {
          matches = [''];
          matched = '';
        }

        if (!action) {
          // bad: we didn't match anything, and there is no action to take
          // we need to advance the stream or we get progress trouble
          if (pos < lineLength) {
            matches = [line.charAt(pos)];
            matched = matches[0];
          }

          action = this._lexer.defaultToken;
        }

        if (matched === null) {
          // should never happen, needed for strict null checking
          break;
        } // advance stream


        pos += matched.length; // maybe call action function (used for 'cases')

        while (isFuzzyAction(action) && isIAction(action) && action.test) {
          action = action.test(matched, matches, state, pos === lineLength);
        }

        var result = null; // set the result: either a string or an array of actions

        if (typeof action === 'string' || Array.isArray(action)) {
          result = action;
        } else if (action.group) {
          result = action.group;
        } else if (action.token !== null && action.token !== undefined) {
          // do $n replacements?
          if (action.tokenSubst) {
            result = substituteMatches(this._lexer, action.token, matched, matches, state);
          } else {
            result = action.token;
          } // enter embedded mode?


          if (action.nextEmbedded) {
            if (action.nextEmbedded === '@pop') {
              if (!embeddedModeData) {
                throw createError(this._lexer, 'cannot pop embedded mode if not inside one');
              }

              embeddedModeData = null;
            } else if (embeddedModeData) {
              throw createError(this._lexer, 'cannot enter embedded mode from within an embedded mode');
            } else {
              enteringEmbeddedMode = substituteMatches(this._lexer, action.nextEmbedded, matched, matches, state);
            }
          } // state transformations


          if (action.goBack) {
            // back up the stream..
            pos = Math.max(0, pos - action.goBack);
          }

          if (action.switchTo && typeof action.switchTo === 'string') {
            var nextState = substituteMatches(this._lexer, action.switchTo, matched, matches, state); // switch state without a push...

            if (nextState[0] === '@') {
              nextState = nextState.substr(1); // peel off starting '@'
            }

            if (!findRules(this._lexer, nextState)) {
              throw createError(this._lexer, 'trying to switch to a state \'' + nextState + '\' that is undefined in rule: ' + this._safeRuleName(rule));
            } else {
              stack = stack.switchTo(nextState);
            }
          } else if (action.transform && typeof action.transform === 'function') {
            throw createError(this._lexer, 'action.transform not supported');
          } else if (action.next) {
            if (action.next === '@push') {
              if (stack.depth >= this._lexer.maxStack) {
                throw createError(this._lexer, 'maximum tokenizer stack size reached: [' + stack.state + ',' + stack.parent.state + ',...]');
              } else {
                stack = stack.push(state);
              }
            } else if (action.next === '@pop') {
              if (stack.depth <= 1) {
                throw createError(this._lexer, 'trying to pop an empty stack in rule: ' + this._safeRuleName(rule));
              } else {
                stack = stack.pop();
              }
            } else if (action.next === '@popall') {
              stack = stack.popall();
            } else {
              var _nextState = substituteMatches(this._lexer, action.next, matched, matches, state);

              if (_nextState[0] === '@') {
                _nextState = _nextState.substr(1); // peel off starting '@'
              }

              if (!findRules(this._lexer, _nextState)) {
                throw createError(this._lexer, 'trying to set a next state \'' + _nextState + '\' that is undefined in rule: ' + this._safeRuleName(rule));
              } else {
                stack = stack.push(_nextState);
              }
            }
          }

          if (action.log && typeof action.log === 'string') {
            log(this._lexer, this._lexer.languageId + ': ' + substituteMatches(this._lexer, action.log, matched, matches, state));
          }
        } // check result


        if (result === null) {
          throw createError(this._lexer, 'lexer rule has no well-defined action in rule: ' + this._safeRuleName(rule));
        }

        var computeNewStateForEmbeddedMode = function computeNewStateForEmbeddedMode(enteringEmbeddedMode) {
          // substitute language alias to known modes to support syntax highlighting
          var enteringEmbeddedModeId = _this2._modeService.getModeIdForLanguageName(enteringEmbeddedMode);

          if (enteringEmbeddedModeId) {
            enteringEmbeddedMode = enteringEmbeddedModeId;
          }

          var embeddedModeData = _this2._getNestedEmbeddedModeData(enteringEmbeddedMode);

          if (pos < lineLength) {
            // there is content from the embedded mode on this line
            var _restOfLine = line.substr(pos);

            return _this2._nestedTokenize(_restOfLine, monarchLexer_MonarchLineStateFactory.create(stack, embeddedModeData), offsetDelta + pos, tokensCollector);
          } else {
            return monarchLexer_MonarchLineStateFactory.create(stack, embeddedModeData);
          }
        }; // is the result a group match?


        if (Array.isArray(result)) {
          if (groupMatching && groupMatching.groups.length > 0) {
            throw createError(this._lexer, 'groups cannot be nested: ' + this._safeRuleName(rule));
          }

          if (matches.length !== result.length + 1) {
            throw createError(this._lexer, 'matched number of groups does not match the number of actions in rule: ' + this._safeRuleName(rule));
          }

          var totalLen = 0;

          for (var i = 1; i < matches.length; i++) {
            totalLen += matches[i].length;
          }

          if (totalLen !== matched.length) {
            throw createError(this._lexer, 'with groups, all characters should be matched in consecutive groups in rule: ' + this._safeRuleName(rule));
          }

          groupMatching = {
            rule: rule,
            matches: matches,
            groups: []
          };

          for (var _i = 0; _i < result.length; _i++) {
            groupMatching.groups[_i] = {
              action: result[_i],
              matched: matches[_i + 1]
            };
          }

          pos -= matched.length; // call recursively to initiate first result match

          continue;
        } else {
          // regular result
          // check for '@rematch'
          if (result === '@rematch') {
            pos -= matched.length;
            matched = ''; // better set the next state too..

            matches = null;
            result = ''; // Even though `@rematch` was specified, if `nextEmbedded` also specified,
            // a state transition should occur.

            if (enteringEmbeddedMode !== null) {
              return computeNewStateForEmbeddedMode(enteringEmbeddedMode);
            }
          } // check progress


          if (matched.length === 0) {
            if (lineLength === 0 || stackLen0 !== stack.depth || state !== stack.state || (!groupMatching ? 0 : groupMatching.groups.length) !== groupLen0) {
              continue;
            } else {
              throw createError(this._lexer, 'no progress in tokenizer in rule: ' + this._safeRuleName(rule));
            }
          } // return the result (and check for brace matching)
          // todo: for efficiency we could pre-sanitize tokenPostfix and substitutions


          var tokenType = null;

          if (isString(result) && result.indexOf('@brackets') === 0) {
            var rest = result.substr('@brackets'.length);
            var bracket = findBracket(this._lexer, matched);

            if (!bracket) {
              throw createError(this._lexer, '@brackets token returned but no bracket defined as: ' + matched);
            }

            tokenType = sanitize(bracket.token + rest);
          } else {
            var token = result === '' ? '' : result + this._lexer.tokenPostfix;
            tokenType = sanitize(token);
          }

          tokensCollector.emit(pos0 + offsetDelta, tokenType);
        }

        if (enteringEmbeddedMode !== null) {
          return computeNewStateForEmbeddedMode(enteringEmbeddedMode);
        }
      }

      return monarchLexer_MonarchLineStateFactory.create(stack, embeddedModeData);
    }
  }, {
    key: "_getNestedEmbeddedModeData",
    value: function _getNestedEmbeddedModeData(mimetypeOrModeId) {
      var nestedModeId = this._locateMode(mimetypeOrModeId);

      if (nestedModeId) {
        var tokenizationSupport = TokenizationRegistry.get(nestedModeId);

        if (tokenizationSupport) {
          return new monarchLexer_EmbeddedModeData(nestedModeId, tokenizationSupport.getInitialState());
        }
      }

      return new monarchLexer_EmbeddedModeData(nestedModeId || NULL_MODE_ID, NULL_STATE);
    }
  }, {
    key: "_locateMode",
    value: function _locateMode(mimetypeOrModeId) {
      if (!mimetypeOrModeId || !this._modeService.isRegisteredMode(mimetypeOrModeId)) {
        return null;
      }

      if (mimetypeOrModeId === this._modeId) {
        // embedding myself...
        return mimetypeOrModeId;
      }

      var modeId = this._modeService.getModeId(mimetypeOrModeId);

      if (modeId) {
        // Fire mode loading event
        this._modeService.triggerMode(modeId);

        this._embeddedModes[modeId] = true;
      }

      return modeId;
    }
  }]);

  return MonarchTokenizer;
}();
/**
 * Searches for a bracket in the 'brackets' attribute that matches the input.
 */

function findBracket(lexer, matched) {
  if (!matched) {
    return null;
  }

  matched = fixCase(lexer, matched);
  var brackets = lexer.brackets;

  var _iterator3 = _createForOfIteratorHelper(brackets),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var bracket = _step3.value;

      if (bracket.open === matched) {
        return {
          token: bracket.token,
          bracketType: 1
          /* Open */

        };
      } else if (bracket.close === matched) {
        return {
          token: bracket.token,
          bracketType: -1
          /* Close */

        };
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return null;
}

function createTokenizationSupport(modeService, standaloneThemeService, modeId, lexer) {
  return new monarchLexer_MonarchTokenizer(modeService, standaloneThemeService, modeId, lexer);
}
// CONCATENATED MODULE: ./node_modules/monaco-editor-core/esm/vs/editor/standalone/common/monarch/monarchCompile.js




/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/*
 * This module only exports 'compile' which compiles a JSON language definition
 * into a typed and checked ILexer definition.
 */

/*
 * Type helpers
 *
 * Note: this is just for sanity checks on the JSON description which is
 * helpful for the programmer. No checks are done anymore once the lexer is
 * already 'compiled and checked'.
 *
 */

function isArrayOf(elemType, obj) {
  if (!obj) {
    return false;
  }

  if (!Array.isArray(obj)) {
    return false;
  }

  var _iterator = _createForOfIteratorHelper(obj),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var el = _step.value;

      if (!elemType(el)) {
        return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}

function bool(prop, defValue) {
  if (typeof prop === 'boolean') {
    return prop;
  }

  return defValue;
}

function string(prop, defValue) {
  if (typeof prop === 'string') {
    return prop;
  }

  return defValue;
}

function arrayToHash(array) {
  var result = {};

  var _iterator2 = _createForOfIteratorHelper(array),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var e = _step2.value;
      result[e] = true;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return result;
}

function createKeywordMatcher(arr) {
  var caseInsensitive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (caseInsensitive) {
    arr = arr.map(function (x) {
      return x.toLowerCase();
    });
  }

  var hash = arrayToHash(arr);

  if (caseInsensitive) {
    return function (word) {
      return hash[word.toLowerCase()] !== undefined && hash.hasOwnProperty(word.toLowerCase());
    };
  } else {
    return function (word) {
      return hash[word] !== undefined && hash.hasOwnProperty(word);
    };
  }
} // Lexer helpers

/**
 * Compiles a regular expression string, adding the 'i' flag if 'ignoreCase' is set, and the 'u' flag if 'unicode' is set.
 * Also replaces @\w+ or sequences with the content of the specified attribute
 */


function compileRegExp(lexer, str) {
  var n = 0;

  while (str.indexOf('@') >= 0 && n < 5) {
    // at most 5 expansions
    n++;
    str = str.replace(/@(\w+)/g, function (s, attr) {
      var sub = '';

      if (typeof lexer[attr] === 'string') {
        sub = lexer[attr];
      } else if (lexer[attr] && lexer[attr] instanceof RegExp) {
        sub = lexer[attr].source;
      } else {
        if (lexer[attr] === undefined) {
          throw createError(lexer, 'language definition does not contain attribute \'' + attr + '\', used at: ' + str);
        } else {
          throw createError(lexer, 'attribute reference \'' + attr + '\' must be a string, used at: ' + str);
        }
      }

      return monarchCommon_empty(sub) ? '' : '(?:' + sub + ')';
    });
  }

  var flags = (lexer.ignoreCase ? 'i' : '') + (lexer.unicode ? 'u' : '');
  return new RegExp(str, flags);
}
/**
 * Compiles guard functions for case matches.
 * This compiles 'cases' attributes into efficient match functions.
 *
 */


function selectScrutinee(id, matches, state, num) {
  if (num < 0) {
    return id;
  }

  if (num < matches.length) {
    return matches[num];
  }

  if (num >= 100) {
    num = num - 100;
    var parts = state.split('.');
    parts.unshift(state);

    if (num < parts.length) {
      return parts[num];
    }
  }

  return null;
}

function createGuard(lexer, ruleName, tkey, val) {
  // get the scrutinee and pattern
  var scrut = -1; // -1: $!, 0-99: $n, 100+n: $Sn

  var oppat = tkey;
  var matches = tkey.match(/^\$(([sS]?)(\d\d?)|#)(.*)$/);

  if (matches) {
    if (matches[3]) {
      // if digits
      scrut = parseInt(matches[3]);

      if (matches[2]) {
        scrut = scrut + 100; // if [sS] present
      }
    }

    oppat = matches[4];
  } // get operator


  var op = '~';
  var pat = oppat;

  if (!oppat || oppat.length === 0) {
    op = '!=';
    pat = '';
  } else if (/^\w*$/.test(pat)) {
    // just a word
    op = '==';
  } else {
    matches = oppat.match(/^(@|!@|~|!~|==|!=)(.*)$/);

    if (matches) {
      op = matches[1];
      pat = matches[2];
    }
  } // set the tester function


  var tester; // special case a regexp that matches just words

  if ((op === '~' || op === '!~') && /^(\w|\|)*$/.test(pat)) {
    var inWords = createKeywordMatcher(pat.split('|'), lexer.ignoreCase);

    tester = function tester(s) {
      return op === '~' ? inWords(s) : !inWords(s);
    };
  } else if (op === '@' || op === '!@') {
    var words = lexer[pat];

    if (!words) {
      throw createError(lexer, 'the @ match target \'' + pat + '\' is not defined, in rule: ' + ruleName);
    }

    if (!isArrayOf(function (elem) {
      return typeof elem === 'string';
    }, words)) {
      throw createError(lexer, 'the @ match target \'' + pat + '\' must be an array of strings, in rule: ' + ruleName);
    }

    var _inWords = createKeywordMatcher(words, lexer.ignoreCase);

    tester = function tester(s) {
      return op === '@' ? _inWords(s) : !_inWords(s);
    };
  } else if (op === '~' || op === '!~') {
    if (pat.indexOf('$') < 0) {
      // precompile regular expression
      var re = compileRegExp(lexer, '^' + pat + '$');

      tester = function tester(s) {
        return op === '~' ? re.test(s) : !re.test(s);
      };
    } else {
      tester = function tester(s, id, matches, state) {
        var re = compileRegExp(lexer, '^' + substituteMatches(lexer, pat, id, matches, state) + '$');
        return re.test(s);
      };
    }
  } else {
    // if (op==='==' || op==='!=') {
    if (pat.indexOf('$') < 0) {
      var patx = fixCase(lexer, pat);

      tester = function tester(s) {
        return op === '==' ? s === patx : s !== patx;
      };
    } else {
      var _patx = fixCase(lexer, pat);

      tester = function tester(s, id, matches, state, eos) {
        var patexp = substituteMatches(lexer, _patx, id, matches, state);
        return op === '==' ? s === patexp : s !== patexp;
      };
    }
  } // return the branch object


  if (scrut === -1) {
    return {
      name: tkey,
      value: val,
      test: function test(id, matches, state, eos) {
        return tester(id, id, matches, state, eos);
      }
    };
  } else {
    return {
      name: tkey,
      value: val,
      test: function test(id, matches, state, eos) {
        var scrutinee = selectScrutinee(id, matches, state, scrut);
        return tester(!scrutinee ? '' : scrutinee, id, matches, state, eos);
      }
    };
  }
}
/**
 * Compiles an action: i.e. optimize regular expressions and case matches
 * and do many sanity checks.
 *
 * This is called only during compilation but if the lexer definition
 * contains user functions as actions (which is usually not allowed), then this
 * may be called during lexing. It is important therefore to compile common cases efficiently
 */


function compileAction(lexer, ruleName, action) {
  if (!action) {
    return {
      token: ''
    };
  } else if (typeof action === 'string') {
    return action; // { token: action };
  } else if (action.token || action.token === '') {
    if (typeof action.token !== 'string') {
      throw createError(lexer, 'a \'token\' attribute must be of type string, in rule: ' + ruleName);
    } else {
      // only copy specific typed fields (only happens once during compile Lexer)
      var newAction = {
        token: action.token
      };

      if (action.token.indexOf('$') >= 0) {
        newAction.tokenSubst = true;
      }

      if (typeof action.bracket === 'string') {
        if (action.bracket === '@open') {
          newAction.bracket = 1
          /* Open */
          ;
        } else if (action.bracket === '@close') {
          newAction.bracket = -1
          /* Close */
          ;
        } else {
          throw createError(lexer, 'a \'bracket\' attribute must be either \'@open\' or \'@close\', in rule: ' + ruleName);
        }
      }

      if (action.next) {
        if (typeof action.next !== 'string') {
          throw createError(lexer, 'the next state must be a string value in rule: ' + ruleName);
        } else {
          var next = action.next;

          if (!/^(@pop|@push|@popall)$/.test(next)) {
            if (next[0] === '@') {
              next = next.substr(1); // peel off starting @ sign
            }

            if (next.indexOf('$') < 0) {
              // no dollar substitution, we can check if the state exists
              if (!stateExists(lexer, substituteMatches(lexer, next, '', [], ''))) {
                throw createError(lexer, 'the next state \'' + action.next + '\' is not defined in rule: ' + ruleName);
              }
            }
          }

          newAction.next = next;
        }
      }

      if (typeof action.goBack === 'number') {
        newAction.goBack = action.goBack;
      }

      if (typeof action.switchTo === 'string') {
        newAction.switchTo = action.switchTo;
      }

      if (typeof action.log === 'string') {
        newAction.log = action.log;
      }

      if (typeof action.nextEmbedded === 'string') {
        newAction.nextEmbedded = action.nextEmbedded;
        lexer.usesEmbedded = true;
      }

      return newAction;
    }
  } else if (Array.isArray(action)) {
    var results = [];

    for (var i = 0, len = action.length; i < len; i++) {
      results[i] = compileAction(lexer, ruleName, action[i]);
    }

    return {
      group: results
    };
  } else if (action.cases) {
    // build an array of test cases
    var cases = []; // for each case, push a test function and result value

    for (var tkey in action.cases) {
      if (action.cases.hasOwnProperty(tkey)) {
        var val = compileAction(lexer, ruleName, action.cases[tkey]); // what kind of case

        if (tkey === '@default' || tkey === '@' || tkey === '') {
          cases.push({
            test: undefined,
            value: val,
            name: tkey
          });
        } else if (tkey === '@eos') {
          cases.push({
            test: function test(id, matches, state, eos) {
              return eos;
            },
            value: val,
            name: tkey
          });
        } else {
          cases.push(createGuard(lexer, ruleName, tkey, val)); // call separate function to avoid local variable capture
        }
      }
    } // create a matching function


    var def = lexer.defaultToken;
    return {
      test: function test(id, matches, state, eos) {
        var _iterator3 = _createForOfIteratorHelper(cases),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _case = _step3.value;

            var didmatch = !_case.test || _case.test(id, matches, state, eos);

            if (didmatch) {
              return _case.value;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return def;
      }
    };
  } else {
    throw createError(lexer, 'an action must be a string, an object with a \'token\' or \'cases\' attribute, or an array of actions; in rule: ' + ruleName);
  }
}
/**
 * Helper class for creating matching rules
 */


var monarchCompile_Rule = /*#__PURE__*/function () {
  function Rule(name) {
    _classCallCheck(this, Rule);

    this.regex = new RegExp('');
    this.action = {
      token: ''
    };
    this.matchOnlyAtLineStart = false;
    this.name = '';
    this.name = name;
  }

  _createClass(Rule, [{
    key: "setRegex",
    value: function setRegex(lexer, re) {
      var sregex;

      if (typeof re === 'string') {
        sregex = re;
      } else if (re instanceof RegExp) {
        sregex = re.source;
      } else {
        throw createError(lexer, 'rules must start with a match string or regular expression: ' + this.name);
      }

      this.matchOnlyAtLineStart = sregex.length > 0 && sregex[0] === '^';
      this.name = this.name + ': ' + sregex;
      this.regex = compileRegExp(lexer, '^(?:' + (this.matchOnlyAtLineStart ? sregex.substr(1) : sregex) + ')');
    }
  }, {
    key: "setAction",
    value: function setAction(lexer, act) {
      this.action = compileAction(lexer, this.name, act);
    }
  }]);

  return Rule;
}();
/**
 * Compiles a json description function into json where all regular expressions,
 * case matches etc, are compiled and all include rules are expanded.
 * We also compile the bracket definitions, supply defaults, and do many sanity checks.
 * If the 'jsonStrict' parameter is 'false', we allow at certain locations
 * regular expression objects and functions that get called during lexing.
 * (Currently we have no samples that need this so perhaps we should always have
 * jsonStrict to true).
 */


function compile(languageId, json) {
  if (!json || typeof json !== 'object') {
    throw new Error('Monarch: expecting a language definition object');
  } // Create our lexer


  var lexer = {};
  lexer.languageId = languageId;
  lexer.noThrow = false; // raise exceptions during compilation

  lexer.maxStack = 100; // Set standard fields: be defensive about types

  lexer.start = typeof json.start === 'string' ? json.start : null;
  lexer.ignoreCase = bool(json.ignoreCase, false);
  lexer.unicode = bool(json.unicode, false);
  lexer.tokenPostfix = string(json.tokenPostfix, '.' + lexer.languageId);
  lexer.defaultToken = string(json.defaultToken, 'source');
  lexer.usesEmbedded = false; // becomes true if we find a nextEmbedded action
  // For calling compileAction later on

  var lexerMin = json;
  lexerMin.languageId = languageId;
  lexerMin.ignoreCase = lexer.ignoreCase;
  lexerMin.unicode = lexer.unicode;
  lexerMin.noThrow = lexer.noThrow;
  lexerMin.usesEmbedded = lexer.usesEmbedded;
  lexerMin.stateNames = json.tokenizer;
  lexerMin.defaultToken = lexer.defaultToken; // Compile an array of rules into newrules where RegExp objects are created.

  function addRules(state, newrules, rules) {
    var _iterator4 = _createForOfIteratorHelper(rules),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var rule = _step4.value;
        var include = rule.include;

        if (include) {
          if (typeof include !== 'string') {
            throw createError(lexer, 'an \'include\' attribute must be a string at: ' + state);
          }

          if (include[0] === '@') {
            include = include.substr(1); // peel off starting @
          }

          if (!json.tokenizer[include]) {
            throw createError(lexer, 'include target \'' + include + '\' is not defined at: ' + state);
          }

          addRules(state + '.' + include, newrules, json.tokenizer[include]);
        } else {
          var newrule = new monarchCompile_Rule(state); // Set up new rule attributes

          if (Array.isArray(rule) && rule.length >= 1 && rule.length <= 3) {
            newrule.setRegex(lexerMin, rule[0]);

            if (rule.length >= 3) {
              if (typeof rule[1] === 'string') {
                newrule.setAction(lexerMin, {
                  token: rule[1],
                  next: rule[2]
                });
              } else if (typeof rule[1] === 'object') {
                var rule1 = rule[1];
                rule1.next = rule[2];
                newrule.setAction(lexerMin, rule1);
              } else {
                throw createError(lexer, 'a next state as the last element of a rule can only be given if the action is either an object or a string, at: ' + state);
              }
            } else {
              newrule.setAction(lexerMin, rule[1]);
            }
          } else {
            if (!rule.regex) {
              throw createError(lexer, 'a rule must either be an array, or an object with a \'regex\' or \'include\' field at: ' + state);
            }

            if (rule.name) {
              if (typeof rule.name === 'string') {
                newrule.name = rule.name;
              }
            }

            if (rule.matchOnlyAtStart) {
              newrule.matchOnlyAtLineStart = bool(rule.matchOnlyAtLineStart, false);
            }

            newrule.setRegex(lexerMin, rule.regex);
            newrule.setAction(lexerMin, rule.action);
          }

          newrules.push(newrule);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  } // compile the tokenizer rules


  if (!json.tokenizer || typeof json.tokenizer !== 'object') {
    throw createError(lexer, 'a language definition must define the \'tokenizer\' attribute as an object');
  }

  lexer.tokenizer = [];

  for (var key in json.tokenizer) {
    if (json.tokenizer.hasOwnProperty(key)) {
      if (!lexer.start) {
        lexer.start = key;
      }

      var rules = json.tokenizer[key];
      lexer.tokenizer[key] = new Array();
      addRules('tokenizer.' + key, lexer.tokenizer[key], rules);
    }
  }

  lexer.usesEmbedded = lexerMin.usesEmbedded; // can be set during compileAction
  // Set simple brackets

  if (json.brackets) {
    if (!Array.isArray(json.brackets)) {
      throw createError(lexer, 'the \'brackets\' attribute must be defined as an array');
    }
  } else {
    json.brackets = [{
      open: '{',
      close: '}',
      token: 'delimiter.curly'
    }, {
      open: '[',
      close: ']',
      token: 'delimiter.square'
    }, {
      open: '(',
      close: ')',
      token: 'delimiter.parenthesis'
    }, {
      open: '<',
      close: '>',
      token: 'delimiter.angle'
    }];
  }

  var brackets = [];

  var _iterator5 = _createForOfIteratorHelper(json.brackets),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var el = _step5.value;
      var desc = el;

      if (desc && Array.isArray(desc) && desc.length === 3) {
        desc = {
          token: desc[2],
          open: desc[0],
          close: desc[1]
        };
      }

      if (desc.open === desc.close) {
        throw createError(lexer, 'open and close brackets in a \'brackets\' attribute must be different: ' + desc.open + '\n hint: use the \'bracket\' attribute if matching on equal brackets is required.');
      }

      if (typeof desc.open === 'string' && typeof desc.token === 'string' && typeof desc.close === 'string') {
        brackets.push({
          token: desc.token + lexer.tokenPostfix,
          open: fixCase(lexer, desc.open),
          close: fixCase(lexer, desc.close)
        });
      } else {
        throw createError(lexer, 'every element in the \'brackets\' array must be a \'{open,close,token}\' object or array');
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  lexer.brackets = brackets; // Disable throw so the syntax highlighter goes, no matter what

  lexer.noThrow = true;
  return lexer;
}
// CONCATENATED MODULE: ./src/gallery/monaco/tokenizer.ts
var tokenizer_languageId='typescript';var tokenizer_lexer=compile(tokenizer_languageId,language_language);var tokenizer=createTokenizationSupport('','',tokenizer_languageId,tokenizer_lexer);function tokenize(text){var lines=text.split(/\r\n|\r|\n/);var result=[];var state=tokenizer.getInitialState();for(var i=0,len=lines.length;i<len;i++){var line=lines[i];var tokenizationResult=tokenizer.tokenize(line,state,0);result[i]=tokenizationResult.tokens;state=tokenizationResult.endState;}return[lines,result];}function tokenizer_escape(code){return fixLineWrapOpportunity(code.replace('<','<<b></b>'));}function fixLineWrapOpportunity(code){return code.replace(/=/g,"=\u200B");}var specialNames=[''];var specialNameColor='';var identifierType='identifier.ts';var typeColors={'':null,'keyword.ts':'blue','literal.ts':'blue','number.ts':'blue','string.ts':'red','Keyword':'#16410A','regexp.ts':'purple','template.ts':'red','type.identifier.ts':'#16410A'};function colorizeRichtext(lines,lineTokens){var sb=[];for(var lineIndex=0;lineIndex<lines.length;lineIndex++){var line=lines[lineIndex];var tokens=lineTokens[lineIndex];var ind=0;for(var index=0;index<tokens.length;index++){var token=tokens[index];var nextToken=tokens[index+1];var start=token.offset;var end=(nextToken===null||nextToken===void 0?void 0:nextToken.offset)||line.length;var tok=line.substr(start,end-start);var text=tokenizer_escape(tok);if(start>ind){sb.push(tokenizer_escape(line.substr(ind,start-ind)));}if(token.type===identifierType&&specialNames.includes(tok))text="<color=".concat(specialNameColor,">").concat(text,"</color>");var color=typeColors[token.type];if(color){text="<color=".concat(color,">").concat(text,"</color>");}sb.push(text);ind=end;}if(ind<line.length){sb.push(tokenizer_escape(line.substring(ind)));}if(lineIndex<lines.length-1)sb.push('\n');}return sb.join('');}
// CONCATENATED MODULE: ./src/gallery/editor.tsx
var editor_TextEditor=function TextEditor(_ref){var text=_ref.text;var richText=colorizeRichtext.apply(void 0,_toConsumableArray(tokenize(text)));return/*#__PURE__*/react["createElement"]("view",{style:{font:NamedAssets.RobotoMono},layout:{FlexGrow:1,FlexShrink:0}},/*#__PURE__*/react["createElement"]("input",{readonly:true,lineType:LineType.MultiLineNewline,webSupport:true,layout:{PositionType:PositionType.Absolute,Height:'100%',Width:'100%',FlexShrink:0,Padding:11},style:{backgroundColor:'transparent',font:NamedAssets.RobotoMono,fontColor:'transparent'},value:fixLineWrapOpportunity(text)}),/*#__PURE__*/react["createElement"]("input",{richText:true,readonly:true,lineType:LineType.MultiLineNewline,layout:{FlexShrink:0,Padding:10,BorderWidth:1},style:{backgroundColor:0.94,borderColor:0.8,font:NamedAssets.RobotoMono,interaction:InteractionType.Ignore},value:richText}));};
// CONCATENATED MODULE: ./src/gallery/gallery.tsx
var shadow='0 8 10 10 black 10';var gallery_App=/*#__PURE__*/function(_React$Component){_inherits(App,_React$Component);var _super=_createSuper(App);function App(props){var _this;_classCallCheck(this,App);_this=_super.call(this,props);_this.state={};return _this;}_createClass(App,[{key:"render",value:function render(){var _ref,_this2=this;var selectedSample=this.state.selectedSample;var allSamples=(_ref=[]).concat.apply(_ref,[this.props.samples].concat(_toConsumableArray(this.props.samples.map(function(x){return x.children||[];}))));var selected=allSamples.find(function(x){return x.name===selectedSample;});var homePage=function homePage(){return/*#__PURE__*/react["createElement"]("view",{layout:{Padding:20}},"This page exists to demonstrate features of React Unity. Everything on this page is built with React Unity. You can navigate the examples using the left panel.");};var drawButtonForSample=function drawButtonForSample(sample){var depth=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var key=arguments.length>2?arguments[2]:undefined;return/*#__PURE__*/react["createElement"]("view",{key:key},/*#__PURE__*/react["createElement"]("button",{layout:{PaddingHorizontal:20,PaddingVertical:16,PaddingLeft:20+depth*16,JustifyContent:YogaJustify.FlexStart},style:{backgroundColor:selected===sample?0.7:'transparent',borderRadius:0,borderColor:Color.black},stateStyles:{hover:{backgroundColor:0.8}},onClick:function onClick(){return!sample.children&&_this2.setState({selectedSample:sample.name});}},sample.name),!!sample.children&&/*#__PURE__*/react["createElement"]("view",null,sample.children.map(function(x,i){return drawButtonForSample(x,depth+1,"".concat(key,"_").concat(i));})));};var SelectedComponent=(selected===null||selected===void 0?void 0:selected.render)||homePage;return/*#__PURE__*/react["createElement"]("view",{layout:{Height:'100%',AlignItems:'Stretch',JustifyContent:'FlexStart',FlexDirection:FlexDirection.Column},style:{backgroundColor:'#fafafa'}},/*#__PURE__*/react["createElement"]("view",{name:"<Header>",style:{backgroundColor:'#2e9151',fontColor:Color.white,boxShadow:shadow,zOrder:1},layout:{AlignItems:'Center',JustifyContent:'SpaceBetween',FlexDirection:FlexDirection.Row,Wrap:Wrap.Wrap,FlexShrink:0,PaddingVertical:20,PaddingHorizontal:40}},/*#__PURE__*/react["createElement"]("view",{style:{fontStyle:FontStyles.Bold,fontSize:26}},"React Unity"),/*#__PURE__*/react["createElement"]("view",{layout:{FlexGrow:1}}),/*#__PURE__*/react["createElement"]("anchor",{url:"https://github.com/KurtGokhan/react-unity"},"Github")),/*#__PURE__*/react["createElement"]("view",{layout:{FlexGrow:1,FlexShrink:1,FlexDirection:FlexDirection.Row,AlignItems:'Stretch'}},/*#__PURE__*/react["createElement"]("scroll",{name:"<Sidebar>",layout:{AlignItems:'Stretch',JustifyContent:'FlexStart',FlexDirection:FlexDirection.Column,Wrap:Wrap.NoWrap,FlexShrink:0,Width:250,PaddingVertical:20},style:{backgroundColor:'#dadada',boxShadow:shadow}},this.props.samples.map(function(x,i){return drawButtonForSample(x,0,"".concat(i));})),/*#__PURE__*/react["createElement"]("scroll",{layout:{FlexGrow:1,FlexShrink:1,FlexDirection:'Column',AlignItems:'Stretch',JustifyContent:'FlexStart',Padding:20}},/*#__PURE__*/react["createElement"]("view",{layout:{FlexGrow:(selected===null||selected===void 0?void 0:selected.sourceCode)?0:1,FlexShrink:0,FlexDirection:'Column',AlignItems:'Stretch',JustifyContent:'FlexStart',Height:250}},/*#__PURE__*/react["createElement"](SelectedComponent,null)),(selected===null||selected===void 0?void 0:selected.sourceCode)&&/*#__PURE__*/react["createElement"]("view",{layout:{MarginTop:20}},"Source Code:",/*#__PURE__*/react["createElement"](editor_TextEditor,{text:selected.sourceCode})),!(selected===null||selected===void 0?void 0:selected.sourceCode)&&!!((selected===null||selected===void 0?void 0:selected.source)||(selected===null||selected===void 0?void 0:selected.wiki))&&/*#__PURE__*/react["createElement"]("view",{layout:{PositionType:PositionType.Absolute,Right:20,Top:20,PaddingHorizontal:30,PaddingVertical:20},style:{backgroundColor:[0.1803922,0.5686275,0.3176471,1],borderRadius:5,boxShadow:shadow,fontColor:[1,1,1,1],fontSize:24}},!!selected.source&&/*#__PURE__*/react["createElement"]("anchor",{url:selected.source},"Source"),!!selected.wiki&&/*#__PURE__*/react["createElement"]("anchor",{url:selected.wiki},"Wiki")))));}}]);return App;}(react["Component"]);var gallery_SampleGallery=function SampleGallery(samples){return/*#__PURE__*/react["createElement"](gallery_App,{samples:samples});};var gallery_renderGallery=function renderGallery(samples){return ReactUnity.render(/*#__PURE__*/react["createElement"](gallery_App,{samples:samples}));};/* harmony default export */ var gallery = (gallery_renderGallery);
// CONCATENATED MODULE: ./src/assets/lorem.ts
var lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam placerat orci sit amet molestie. Mauris vitae vulputate enim. Nullam maximus maximus libero eu bibendum. Cras quis sapien nibh. Aenean eu sapien justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus et sollicitudin massa. Pellentesque vulputate consequat leo, mattis facilisis leo convallis ac. Donec at malesuada nibh, nec elementum quam. Suspendisse leo nulla, congue sit amet lacus in, facilisis auctor odio. In placerat magna at eleifend luctus. Morbi est odio, finibus eget efficitur pharetra, maximus non urna.\n\nMaecenas et ex arcu. Donec maximus leo ac lacus ornare, quis efficitur dui bibendum. Suspendisse sit amet sodales enim, nec venenatis nisl. Vestibulum non iaculis tortor, et sodales ipsum. Sed tempus leo sit amet laoreet efficitur. Pellentesque eleifend volutpat turpis, eu facilisis sem ultrices eu. Proin nec orci tempor, luctus purus eget, sagittis enim. Integer massa magna, elementum id sapien vel, egestas rutrum elit. Nullam non pulvinar nulla. Donec dolor lacus, interdum id nunc nec, euismod pharetra sapien.\n\nProin viverra libero odio, in ultrices magna tempus quis. In vestibulum lacus non varius tincidunt. Mauris fringilla eu massa ac dictum. Aliquam ex tellus, luctus congue lorem eget, interdum sagittis tellus. Ut sagittis, felis sit amet viverra eleifend, orci quam ornare dui, a condimentum odio nisi sed enim. Phasellus malesuada, arcu quis condimentum euismod, risus ligula vehicula felis, ac venenatis nunc ipsum vel leo. Sed nec ex quis est vestibulum dignissim in tincidunt lacus. Sed eu luctus mauris. Nunc rhoncus fermentum dapibus. Vivamus lacinia mollis orci sed placerat. Integer ante libero, fermentum at risus ut, pretium fermentum lacus. Ut tempor ex mauris, sit amet blandit nisi fringilla id. Sed quam tellus, lacinia a tellus ac, ultrices vestibulum elit.\n\nClass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed venenatis pharetra dolor, vel dictum quam tristique non. Duis malesuada gravida urna vel ultrices. Integer fringilla arcu sit amet lacus hendrerit, quis lacinia quam rutrum. Donec rhoncus sagittis urna. Aenean consectetur pulvinar libero. Integer aliquam porta mi, at sodales metus cursus nec. Duis vel maximus erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sit amet fermentum nisl. In rutrum nibh a ultricies condimentum. Fusce finibus, mauris quis finibus viverra, felis ipsum euismod augue, vel malesuada urna ligula sit amet est.\n\n";/* harmony default export */ var assets_lorem = (lorem);
// CONCATENATED MODULE: ./src/text-columns/index.tsx
var text_columns_App=/*#__PURE__*/function(_React$Component){_inherits(App,_React$Component);var _super=_createSuper(App);function App(props){var _this;_classCallCheck(this,App);_this=_super.call(this,props);_this.scrollLayout={FlexDirection:FlexDirection.Column,Wrap:Wrap.Wrap,AlignItems:YogaAlign.FlexStart,Padding:20,PaddingRight:0};_this.separatorLayout={layout:{Height:YogaValue.Percent(4)},style:{backgroundColor:Color.gray,cursor:CursorType.RowResize}};_this.textProps={layout:{MaxWidth:300,MarginRight:40,FlexShrink:1,FlexGrow:1,FlexBasis:YogaValue.Percent(60)},style:{textOverflow:'Linked'}};_this.dragSeparator=function(ev){_this.setState(function(state){return{ratio:state.ratio-ev.delta.y/1000};});};_this.state={ratio:0.5};return _this;}_createClass(App,[{key:"render",value:function render(){return/*#__PURE__*/react["createElement"](react["Fragment"],null,/*#__PURE__*/react["createElement"]("view",{layout:{Height:YogaValue.Percent(96*this.state.ratio),PositionType:PositionType.Absolute,Top:0,Left:0,Right:0}},/*#__PURE__*/react["createElement"]("scroll",{layout:this.scrollLayout},/*#__PURE__*/react["createElement"]("text",this.textProps,assets_lorem))),/*#__PURE__*/react["createElement"]("view",{layout:{PositionType:PositionType.Absolute,Top:YogaValue.Percent(96*this.state.ratio),Left:0,Right:0}},/*#__PURE__*/react["createElement"]("button",Object.assign({onDrag:this.dragSeparator},this.separatorLayout))),/*#__PURE__*/react["createElement"]("view",{layout:{Height:YogaValue.Percent(96*(1-this.state.ratio)),PositionType:PositionType.Absolute,Bottom:0,Left:0,Right:0}},/*#__PURE__*/react["createElement"]("scroll",{layout:this.scrollLayout},/*#__PURE__*/react["createElement"]("text",this.textProps,assets_lorem))));}}]);return App;}(react["Component"]);
// CONCATENATED MODULE: ./src/anim/index.tsx
var anim_App=/*#__PURE__*/function(_React$Component){_inherits(App,_React$Component);var _super=_createSuper(App);function App(props){var _this;_classCallCheck(this,App);_this=_super.call(this,props);_this.clearAnimation=void 0;_this.state={val:0};_this.clearAnimation=startAnimation({duration:1000,onTick:function onTick(val){return _this.setState({val:val});},easing:easing.easeInOutQuint,delay:500,loop:true,loopMode:'ping-pong'});return _this;}_createClass(App,[{key:"componentWillUnmount",value:function componentWillUnmount(){var _this$clearAnimation;(_this$clearAnimation=this.clearAnimation)===null||_this$clearAnimation===void 0?void 0:_this$clearAnimation.call(this);}},{key:"render",value:function render(){var val=this.state.val;return/*#__PURE__*/react["createElement"]("view",{layout:{FlexDirection:FlexDirection.Row,Height:YogaValue.Percent(100),AlignItems:YogaAlign.Stretch,JustifyContent:YogaJustify.SpaceAround}},/*#__PURE__*/react["createElement"]("view",{layout:{Margin:50,BorderWidth:1,Width:300,FlexDirection:FlexDirection.Column,AlignItems:YogaAlign.Center,JustifyContent:YogaJustify.SpaceAround},style:{backgroundColor:Color.white,borderColor:Color.black,borderRadius:val*100}},/*#__PURE__*/react["createElement"]("button",{layout:{Width:Math.round((val*150+130)/2)*2}},"Width"),/*#__PURE__*/react["createElement"]("button",{style:{backgroundColor:[Color.red,val,Color.yellow]}},"Color"),/*#__PURE__*/react["createElement"]("button",{style:{rotate:180*val}},"Rotate"),/*#__PURE__*/react["createElement"]("button",{style:{boxShadow:"1 1 ".concat(14*val," ").concat(8*val," black ").concat(4+6*val),scale:1.2+val*0.1,backgroundColor:0.97}},"Shadow")),/*#__PURE__*/react["createElement"]("view",{layout:{Margin:50,Width:300,FlexDirection:FlexDirection.Column,AlignItems:YogaAlign.Center,JustifyContent:YogaJustify.SpaceAround,BorderWidth:val*10+2},style:{backgroundColor:Color.white,borderColor:[Color.red,val,Color.green]}},/*#__PURE__*/react["createElement"]("button",{layout:{PositionType:PositionType.Absolute,Top:50+val*150}},"Position"),/*#__PURE__*/react["createElement"]("button",{style:{fontSize:Math.round(val*24+12),textOverflow:TextOverflowModes.Truncate},layout:{PaddingHorizontal:30}},"Font size"),/*#__PURE__*/react["createElement"]("button",{style:{scale:val*2}},"Scale"),/*#__PURE__*/react["createElement"]("button",{style:{translate:[Math.random()*10,Math.random()*10]}},"Noise")));}}]);return App;}(react["Component"]);
// EXTERNAL MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(4);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-6-1!D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/resolve-url-loader??ref--6-oneOf-6-2!D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-6-3!./src/wiki/index.module.scss
var index_module = __webpack_require__(6);

// CONCATENATED MODULE: ./src/wiki/index.module.scss

            

var index_module_options = {};

index_module_options.insert = "head";
index_module_options.singleton = false;

var update = injectStylesIntoStyleTag_default()(index_module["a" /* default */], index_module_options);



/* harmony default export */ var wiki_index_module = (index_module["a" /* default */].locals || {});
// CONCATENATED MODULE: ./src/wiki/anchor.tsx
function anchor_App(){return/*#__PURE__*/react["createElement"]("view",{className:wiki_index_module.app},/*#__PURE__*/react["createElement"]("anchor",{url:"https://www.google.com/",openInThisTab:true},"Open Google in this tab"),/*#__PURE__*/react["createElement"]("anchor",{url:"https://www.google.com/"},"Open Google in new tab"),/*#__PURE__*/react["createElement"]("anchor",{url:"https://www.google.com/",style:{cursor:CursorType.NotAllowed},onPointerDown:function onPointerDown(e){return e.Use();}},"Cancel event"));}
// CONCATENATED MODULE: ./src/wiki/button.tsx
function button_App(){return/*#__PURE__*/react["createElement"]("view",{className:wiki_index_module.app},/*#__PURE__*/react["createElement"]("button",{onClick:function onClick(){return console.log('Clicked');}},"Click me!"));}
// CONCATENATED MODULE: ./src/wiki/dropdown.tsx
function dropdown_App(){var triggerTemplate=/*#__PURE__*/react["createElement"]("view",{style:{fontColor:'green'}},"Option 1");return/*#__PURE__*/react["createElement"]("view",{className:wiki_index_module.app},/*#__PURE__*/react["createElement"](Dropdown,{onChange:function onChange(val){return console.log(val);},layout:{Width:250}},"Select an option",/*#__PURE__*/react["createElement"](DropdownItem,{value:5,triggerTemplate:triggerTemplate},"Option 1"),/*#__PURE__*/react["createElement"](DropdownItem,{value:10},"Option 2"),/*#__PURE__*/react["createElement"](DropdownItem,{value:15},"Option With Long Name")));}
// CONCATENATED MODULE: ./src/wiki/image.tsx
function image_App(){return/*#__PURE__*/react["createElement"]("view",{className:wiki_index_module.app},/*#__PURE__*/react["createElement"]("image",{source:NamedAssets["delete"]}));}
// CONCATENATED MODULE: ./src/wiki/input.tsx
function input_App(){return/*#__PURE__*/react["createElement"]("view",{className:wiki_index_module.app},/*#__PURE__*/react["createElement"]("input",{placeholder:"Write something!",style:{backgroundColor:0.9}}));}
// EXTERNAL MODULE: D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-6-1!D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/resolve-url-loader??ref--6-oneOf-6-2!D:/Documents/UnityProjects/packages/reactunity/scripts/node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-6-3!./src/wiki/scroll/index.module.scss
var scroll_index_module = __webpack_require__(7);

// CONCATENATED MODULE: ./src/wiki/scroll/index.module.scss

            

var scroll_index_module_options = {};

scroll_index_module_options.insert = "head";
scroll_index_module_options.singleton = false;

var index_module_update = injectStylesIntoStyleTag_default()(scroll_index_module["a" /* default */], scroll_index_module_options);



/* harmony default export */ var wiki_scroll_index_module = (scroll_index_module["a" /* default */].locals || {});
// CONCATENATED MODULE: ./src/wiki/scroll/index.tsx
function scroll_App(){return/*#__PURE__*/react["createElement"]("scroll",{className:wiki_scroll_index_module.app},[assets_lorem,assets_lorem,assets_lorem]);}
// CONCATENATED MODULE: ./src/wiki/text.tsx
function text_App(){return/*#__PURE__*/react["createElement"]("text",null,"Hello world!");}
// CONCATENATED MODULE: ./src/wiki/toggle.tsx
function toggle_App(){return/*#__PURE__*/react["createElement"]("view",{className:wiki_index_module.app,layout:{FlexDirection:'Row'}},/*#__PURE__*/react["createElement"]("toggle",null)," Toggle me!");}
// CONCATENATED MODULE: ./src/wiki/tooltip.tsx
function tooltip_App(){var tooltipContent=/*#__PURE__*/react["createElement"]("view",{layout:{Padding:10},style:{backgroundColor:new Color(0.4,0.4,0.4),fontColor:'white'}},"Cool tooltip");return/*#__PURE__*/react["createElement"]("view",{className:wiki_index_module.app},/*#__PURE__*/react["createElement"](tooltip_Tooltip,{tooltipContent:tooltipContent,position:"bottom",offset:20},"Hover to see cool tooltip."));}
// CONCATENATED MODULE: ./src/wiki/view.tsx
var view_App=function App(){return/*#__PURE__*/react["createElement"]("view",{className:wiki_index_module.app},"Hello world!");};
// CONCATENATED MODULE: ./src/todo-mvc/utils.ts
var utils_Utils=/*#__PURE__*/function(){function Utils(){_classCallCheck(this,Utils);}_createClass(Utils,null,[{key:"uuid",value:function uuid(){/*jshint bitwise:false */var i,random;var uuid='';for(i=0;i<32;i++){random=Math.random()*16|0;if(i===8||i===12||i===16||i===20){uuid+='-';}uuid+=(i===12?4:i===16?random&(3|8):random).toString(16);}return uuid;}},{key:"pluralize",value:function pluralize(count,word){return count===1?word:word+'s';}},{key:"store",value:function store(namespace,data){if(data){return localStorage.setItem(namespace,JSON.stringify(data));}var store=localStorage.getItem(namespace);return store&&JSON.parse(store)||[];}},{key:"extend",value:function extend(){var newObj={};for(var i=0;i<arguments.length;i++){var obj=i<0||arguments.length<=i?undefined:arguments[i];for(var key in obj){if(obj.hasOwnProperty(key)){newObj[key]=obj[key];}}}return newObj;}}]);return Utils;}();
// CONCATENATED MODULE: ./src/todo-mvc/todoModel.ts
// Generic "model" object. You can use whatever
// framework you want. For this application it
// may not even be worth separating this logic
// out, but we do this to demonstrate one way to
// separate out parts of your application.
var todoModel_TodoModel=/*#__PURE__*/function(){function TodoModel(key){_classCallCheck(this,TodoModel);this.key=void 0;this.todos=void 0;this.onChanges=void 0;this.key=key;this.todos=utils_Utils.store(key);this.onChanges=[];}_createClass(TodoModel,[{key:"subscribe",value:function subscribe(onChange){this.onChanges.push(onChange);}},{key:"inform",value:function inform(){utils_Utils.store(this.key,this.todos);this.onChanges.forEach(function(cb){cb();});}},{key:"addTodo",value:function addTodo(title){this.todos=this.todos.concat({id:utils_Utils.uuid(),title:title,completed:false});this.inform();}},{key:"toggleAll",value:function toggleAll(checked){// Note: It's usually better to use immutable data structures since they're
// easier to reason about and React works very well with them. That's why
// we use map(), filter() and reduce() everywhere instead of mutating the
// array or todo items themselves.
this.todos=this.todos.map(function(todo){return utils_Utils.extend({},todo,{completed:checked});});this.inform();}},{key:"toggle",value:function toggle(todoToToggle){this.todos=this.todos.map(function(todo){return todo!==todoToToggle?todo:utils_Utils.extend({},todo,{completed:!todo.completed});});this.inform();}},{key:"destroy",value:function destroy(todo){this.todos=this.todos.filter(function(candidate){return candidate!==todo;});this.inform();}},{key:"save",value:function save(todoToSave,text){this.todos=this.todos.map(function(todo){return todo!==todoToSave?todo:utils_Utils.extend({},todo,{title:text});});this.inform();}},{key:"clearCompleted",value:function clearCompleted(){this.todos=this.todos.filter(function(todo){return!todo.completed;});this.inform();}}]);return TodoModel;}();
// CONCATENATED MODULE: ./src/todo-mvc/constants.ts
var ALL_TODOS='all';var ACTIVE_TODOS='active';var COMPLETED_TODOS='completed';var ENTER_KEY=13;var ESCAPE_KEY=27;
// CONCATENATED MODULE: ./src/todo-mvc/footer.tsx
var footer_TodoFooter=/*#__PURE__*/function(_React$Component){_inherits(TodoFooter,_React$Component);var _super=_createSuper(TodoFooter);function TodoFooter(){_classCallCheck(this,TodoFooter);return _super.apply(this,arguments);}_createClass(TodoFooter,[{key:"render",value:function render(){var _this=this;var activeTodoWord=utils_Utils.pluralize(this.props.count,'item');var clearButton=/*#__PURE__*/react["createElement"]("button",{style:{hidden:this.props.completedCount===0},layout:{Width:150},onClick:this.props.onClearCompleted},"Clear completed");var nowShowing=this.props.nowShowing;var TabButton=function TabButton(props){return/*#__PURE__*/react["createElement"]("button",{onClick:function onClick(){return _this.props.onSwitch(props.id);},layout:{BorderWidth:1,MarginHorizontal:5,PaddingHorizontal:7,PaddingVertical:3},style:{backgroundColor:props.id===nowShowing?'#cecece':'transparent',borderColor:['#af2f2f',0.2]}},props.children);};return/*#__PURE__*/react["createElement"]("view",{name:"Footer",style:{fontSize:14,borderColor:'#cecece'},layout:{BorderTopWidth:2,FlexDirection:FlexDirection.Row,JustifyContent:YogaJustify.SpaceBetween,AlignItems:YogaAlign.Center,PaddingHorizontal:16,PaddingVertical:4}},/*#__PURE__*/react["createElement"]("view",{layout:{Width:150}},"<b>".concat(this.props.count,"</b> ").concat(activeTodoWord," left")),/*#__PURE__*/react["createElement"]("view",{layout:{FlexDirection:'Row'}},/*#__PURE__*/react["createElement"](TabButton,{id:ALL_TODOS},"All"),/*#__PURE__*/react["createElement"](TabButton,{id:ACTIVE_TODOS},"Active"),/*#__PURE__*/react["createElement"](TabButton,{id:COMPLETED_TODOS},"Completed")),clearButton);}}]);return TodoFooter;}(react["Component"]);
// CONCATENATED MODULE: ./src/todo-mvc/todoItem.tsx
var todoItem_TodoItem=/*#__PURE__*/function(_React$Component){_inherits(TodoItem,_React$Component);var _super=_createSuper(TodoItem);function TodoItem(props){var _this;_classCallCheck(this,TodoItem);_this=_super.call(this,props);_this.state=void 0;_this.editField=void 0;_this.setHover=function(x){return _this.setState({hovered:x});};_this.pointerEnter=function(){return _this.setHover(true);};_this.pointerExit=function(){return _this.setHover(false);};_this.state={editText:_this.props.todo.title,hovered:false};return _this;}_createClass(TodoItem,[{key:"handleSubmit",value:function handleSubmit(){var val=this.state.editText.trim();if(val){this.props.onSave(val);this.setState({editText:val});}else{this.props.onDestroy();}}},{key:"handleEdit",value:function handleEdit(){this.props.onEdit();this.setState({editText:this.props.todo.title});}},{key:"shouldComponentUpdate",value:function shouldComponentUpdate(nextProps,nextState){return nextProps.todo!==this.props.todo||nextProps.editing!==this.props.editing||nextState.editText!==this.state.editText||nextState.hovered!==this.state.hovered;}},{key:"render",value:function render(){var completed=this.props.todo.completed;return/*#__PURE__*/react["createElement"]("view",{name:"<TodoItem>",onPointerEnter:this.pointerEnter,onPointerExit:this.pointerExit,layout:{FlexDirection:FlexDirection.Row,AlignItems:YogaAlign.Center,BorderBottomWidth:1},style:{borderColor:'#dedede',fontStyle:completed?'Strikethrough':null,opacity:completed?0.4:1}},/*#__PURE__*/react["createElement"]("view",{layout:{FlexGrow:1,FlexShrink:1,Padding:16,PaddingLeft:64}},this.props.todo.title),/*#__PURE__*/react["createElement"]("input",{layout:{Display:Display.None},ref:this.editField}),/*#__PURE__*/react["createElement"]("toggle",{onChange:this.props.onToggle,value:this.props.todo.completed,layout:{PositionType:PositionType.Absolute,Left:8,Top:'50%'},style:{translate:[0,-0.5],translateRelative:true}}),/*#__PURE__*/react["createElement"]("button",{onClick:this.props.onDestroy,style:{backgroundColor:'clear',fontColor:'#cc9a9a',hidden:!this.state.hovered,interaction:InteractionType.Always},layout:{MarginRight:20}},"\xD7"));}}]);return TodoItem;}(react["Component"]);
// CONCATENATED MODULE: ./src/todo-mvc/index.tsx
var todo_mvc_TodoApp=/*#__PURE__*/function(_React$Component){_inherits(TodoApp,_React$Component);var _super=_createSuper(TodoApp);function TodoApp(props){var _this;_classCallCheck(this,TodoApp);_this=_super.call(this,props);_this.state=void 0;_this.newTodoField=/*#__PURE__*/react["createRef"]();_this.selectAllToggle=/*#__PURE__*/react["createRef"]();_this.pageLayout={AlignSelf:YogaAlign.Center,Width:'100%',MaxWidth:640,FlexShrink:1,Padding:30};_this.headerStyle={fontColor:[1,0.5235849,0.5235849,1],fontSize:100};_this.headerLayout={PaddingBottom:20,AlignSelf:YogaAlign.Center,MinWidth:'auto',MinHeight:'auto'};_this.setShowing=function(nowShowing){return _this.setState(function(state){return{nowShowing:nowShowing};});};_this.headerInputStyle={borderColor:'#cecece',zOrder:1,backgroundColor:[1,1,1,1],boxShadow:'0 8 10 10 black 10'};_this.toggleAll=function(checked){_this.state.model.toggleAll(checked);};var model=new todoModel_TodoModel('react-todos');model.subscribe(function(){return _this.setState({model:model});});_this.state={nowShowing:ALL_TODOS,editing:null,model:model};return _this;}_createClass(TodoApp,[{key:"addTodo",value:function addTodo(val){var _this2=this;if(val){this.state.model.addTodo(val);this.newTodoField.current.Value='';setTimeout(function(){return _this2.newTodoField.current.Focus();},0);}}},{key:"toggle",value:function toggle(todoToToggle){this.state.model.toggle(todoToToggle);}},{key:"destroy",value:function destroy(todo){this.state.model.destroy(todo);}},{key:"edit",value:function edit(todo){this.setState({editing:todo.id});}},{key:"save",value:function save(todoToSave,text){this.state.model.save(todoToSave,text);this.setState({editing:null});}},{key:"cancel",value:function cancel(){this.setState({editing:null});}},{key:"clearCompleted",value:function clearCompleted(){this.state.model.clearCompleted();}},{key:"render",value:function render(){var _this3=this;var footer;var main;var todos=this.state.model.todos;var shownTodos=todos.filter(function(todo){switch(_this3.state.nowShowing){case ACTIVE_TODOS:return!todo.completed;case COMPLETED_TODOS:return todo.completed;default:return true;}});var todoItems=shownTodos.map(function(todo){return/*#__PURE__*/react["createElement"](todoItem_TodoItem,{key:todo.id,todo:todo,onToggle:_this3.toggle.bind(_this3,todo),onDestroy:_this3.destroy.bind(_this3,todo),onEdit:_this3.edit.bind(_this3,todo),editing:_this3.state.editing===todo.id,onSave:_this3.save.bind(_this3,todo),onCancel:function onCancel(e){return _this3.cancel();}});});var activeTodoCount=todos.filter(function(x){return!x.completed;}).length;var completedCount=todos.length-activeTodoCount;if(activeTodoCount||completedCount){footer=/*#__PURE__*/react["createElement"](footer_TodoFooter,{count:activeTodoCount,completedCount:completedCount,nowShowing:this.state.nowShowing,onSwitch:this.setShowing,onClearCompleted:function onClearCompleted(e){return _this3.clearCompleted();}});}if(todos.length){main=/*#__PURE__*/react["createElement"]("scroll",{name:"<Main>"},todoItems);}return/*#__PURE__*/react["createElement"]("view",{layout:this.pageLayout,style:{font:NamedAssets.font}},/*#__PURE__*/react["createElement"]("view",{style:this.headerStyle,layout:this.headerLayout},"todos"),/*#__PURE__*/react["createElement"]("view",{style:{backgroundColor:'white',boxShadow:'6 6 22 22 black 16'},layout:{FlexShrink:1}},/*#__PURE__*/react["createElement"]("view",{name:"Header",layout:{FlexDirection:FlexDirection.Row,AlignItems:YogaAlign.Center,BorderBottomWidth:2},style:this.headerInputStyle},/*#__PURE__*/react["createElement"]("input",{layout:{Padding:16,PaddingLeft:64,FlexGrow:1},style:{borderRadius:0},ref:this.newTodoField,placeholder:"What needs to be done?",onSubmit:function onSubmit(value){return _this3.addTodo(value);}}),/*#__PURE__*/react["createElement"]("toggle",{ref:this.selectAllToggle,onChange:this.toggleAll,value:activeTodoCount===0&&completedCount>0,layout:{PositionType:PositionType.Absolute,Left:8,Top:'50%'},style:{translate:[0,-0.5],translateRelative:true}})),main,footer));}}]);return TodoApp;}(react["Component"]);
// CONCATENATED MODULE: ./node_modules/raw-loader/dist/cjs.js!./src/wiki/view.tsx
/* harmony default export */ var view = ("import * as React from 'react';\nimport style from './index.module.scss';\n\nexport const App = () =>\n  <view className={style.app}>\n    Hello world!\n  </view>;\n");
// CONCATENATED MODULE: ./node_modules/raw-loader/dist/cjs.js!./src/wiki/anchor.tsx
/* harmony default export */ var wiki_anchor = ("import * as React from 'react';\nimport style from './index.module.scss';\nimport { CursorType } from '@reactunity/renderer';\n\nexport function App() {\n  return <view className={style.app}>\n    <anchor url=\"https://www.google.com/\" openInThisTab>Open Google in this tab</anchor>\n    <anchor url=\"https://www.google.com/\">Open Google in new tab</anchor>\n    <anchor url=\"https://www.google.com/\" style={{ cursor: CursorType.NotAllowed }} onPointerDown={(e) => e.Use()}>Cancel event</anchor>\n  </view>;\n}\n");
// CONCATENATED MODULE: ./node_modules/raw-loader/dist/cjs.js!./src/wiki/button.tsx
/* harmony default export */ var wiki_button = ("import * as React from 'react';\nimport style from './index.module.scss';\n\nexport function App() {\n  return <view className={style.app}>\n    <button onClick={() => console.log('Clicked')}>\n      Click me!\n    </button>\n  </view>;\n}\n");
// CONCATENATED MODULE: ./node_modules/raw-loader/dist/cjs.js!./src/wiki/dropdown.tsx
/* harmony default export */ var dropdown = ("import * as React from 'react';\nimport style from './index.module.scss';\nimport { Dropdown, DropdownItem } from '@reactunity/renderer';\n\nexport function App() {\n  const triggerTemplate = <view style={{ fontColor: 'green' }}>Option 1</view>;\n\n  return <view className={style.app}>\n    <Dropdown onChange={val => console.log(val)} layout={{ Width: 250 }}>\n      Select an option\n\n      <DropdownItem value={5} triggerTemplate={triggerTemplate}>Option 1</DropdownItem>\n      <DropdownItem value={10}>Option 2</DropdownItem>\n      <DropdownItem value={15}>Option With Long Name</DropdownItem>\n    </Dropdown>\n  </view>;\n}\n");
// CONCATENATED MODULE: ./node_modules/raw-loader/dist/cjs.js!./src/wiki/image.tsx
/* harmony default export */ var wiki_image = ("import * as React from 'react';\nimport style from './index.module.scss';\n\nexport function App() {\n  return <view className={style.app}>\n    <image source={NamedAssets.delete} />\n  </view>;\n}\n");
// CONCATENATED MODULE: ./node_modules/raw-loader/dist/cjs.js!./src/wiki/input.tsx
/* harmony default export */ var input = ("import * as React from 'react';\nimport style from './index.module.scss';\n\nexport function App() {\n  return <view className={style.app}>\n    <input placeholder=\"Write something!\" style={{ backgroundColor: 0.9 }} />\n  </view>;\n}\n");
// CONCATENATED MODULE: ./node_modules/raw-loader/dist/cjs.js!./src/wiki/scroll/index.tsx
/* harmony default export */ var wiki_scroll = ("import * as React from 'react';\nimport lorem from '../../assets/lorem';\nimport style from './index.module.scss';\n\nexport function App() {\n  return <scroll className={style.app}>\n    {[lorem, lorem, lorem]}\n  </scroll>;\n}\n");
// CONCATENATED MODULE: ./node_modules/raw-loader/dist/cjs.js!./src/wiki/text.tsx
/* harmony default export */ var wiki_text = ("import * as React from 'react';\n\nexport function App() {\n  return <text>Hello world!</text>;\n}\n");
// CONCATENATED MODULE: ./node_modules/raw-loader/dist/cjs.js!./src/wiki/toggle.tsx
/* harmony default export */ var wiki_toggle = ("import * as React from 'react';\nimport style from './index.module.scss';\n\nexport function App() {\n  return <view className={style.app} layout={{ FlexDirection: 'Row' }}>\n    <toggle /> Toggle me!\n  </view>;\n}\n");
// CONCATENATED MODULE: ./node_modules/raw-loader/dist/cjs.js!./src/wiki/tooltip.tsx
/* harmony default export */ var tooltip = ("import * as React from 'react';\nimport style from './index.module.scss';\nimport { Tooltip } from '@reactunity/renderer';\n\nexport function App() {\n  const tooltipContent =\n    <view layout={{ Padding: 10 }} style={{ backgroundColor: new Color(0.4, 0.4, 0.4), fontColor: 'white' }}>\n      Cool tooltip\n    </view>;\n\n  return <view className={style.app}>\n    <Tooltip tooltipContent={tooltipContent} position='bottom' offset={20}>\n      Hover to see cool tooltip.\n    </Tooltip>\n  </view>;\n}\n");
// CONCATENATED MODULE: ./src/gallery/index.ts
/* eslint import/no-webpack-loader-syntax: off */var wikiPages=[{name:'View',render:view_App,sourceCode:view},{name:'Scroll',render:scroll_App,sourceCode:wiki_scroll},{name:'Button',render:button_App,sourceCode:wiki_button},{name:'Image',render:image_App,sourceCode:wiki_image},{name:'Input',render:input_App,sourceCode:input},{name:'Anchor',render:anchor_App,sourceCode:wiki_anchor},{name:'Text',render:text_App,sourceCode:wiki_text},{name:'Toggle',render:toggle_App,sourceCode:wiki_toggle},{name:'Tooltip',render:tooltip_App,sourceCode:tooltip},{name:'Dropdown',render:dropdown_App,sourceCode:dropdown}];gallery([{name:'Components',render:function render(){return gallery_SampleGallery(wikiPages);},children:wikiPages},{name:'Animation',render:anim_App,source:'https://github.com/ReactUnity/full-sample/blob/master/react/src/anim/index.tsx'},{name:'Text Columns',render:text_columns_App,source:'https://github.com/ReactUnity/full-sample/blob/master/react/src/text-columns/index.tsx'},{name:'Todo App',render:todo_mvc_TodoApp,source:'https://github.com/ReactUnity/full-sample/blob/master/react/src/todo-mvc/index.tsx'}]);

/***/ })
/******/ ]);