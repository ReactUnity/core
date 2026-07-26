/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/noSourceMaps.js":
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__("../node_modules/hoist-non-react-statics/node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above

  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }
  return targetComponent;
}
module.exports = hoistNonReactStatics;

/***/ }),

/***/ "../node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var b = "function" === typeof Symbol && Symbol["for"],
  c = b ? Symbol["for"]("react.element") : 60103,
  d = b ? Symbol["for"]("react.portal") : 60106,
  e = b ? Symbol["for"]("react.fragment") : 60107,
  f = b ? Symbol["for"]("react.strict_mode") : 60108,
  g = b ? Symbol["for"]("react.profiler") : 60114,
  h = b ? Symbol["for"]("react.provider") : 60109,
  k = b ? Symbol["for"]("react.context") : 60110,
  l = b ? Symbol["for"]("react.async_mode") : 60111,
  m = b ? Symbol["for"]("react.concurrent_mode") : 60111,
  n = b ? Symbol["for"]("react.forward_ref") : 60112,
  p = b ? Symbol["for"]("react.suspense") : 60113,
  q = b ? Symbol["for"]("react.suspense_list") : 60120,
  r = b ? Symbol["for"]("react.memo") : 60115,
  t = b ? Symbol["for"]("react.lazy") : 60116,
  v = b ? Symbol["for"]("react.block") : 60121,
  w = b ? Symbol["for"]("react.fundamental") : 60117,
  x = b ? Symbol["for"]("react.responder") : 60118,
  y = b ? Symbol["for"]("react.scope") : 60119;
function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m;
}
exports.AsyncMode = l;
exports.ConcurrentMode = m;
exports.ContextConsumer = k;
exports.ContextProvider = h;
exports.Element = c;
exports.ForwardRef = n;
exports.Fragment = e;
exports.Lazy = t;
exports.Memo = r;
exports.Portal = d;
exports.Profiler = g;
exports.StrictMode = f;
exports.Suspense = p;
exports.isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};
exports.isConcurrentMode = A;
exports.isContextConsumer = function (a) {
  return z(a) === k;
};
exports.isContextProvider = function (a) {
  return z(a) === h;
};
exports.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};
exports.isForwardRef = function (a) {
  return z(a) === n;
};
exports.isFragment = function (a) {
  return z(a) === e;
};
exports.isLazy = function (a) {
  return z(a) === t;
};
exports.isMemo = function (a) {
  return z(a) === r;
};
exports.isPortal = function (a) {
  return z(a) === d;
};
exports.isProfiler = function (a) {
  return z(a) === g;
};
exports.isStrictMode = function (a) {
  return z(a) === f;
};
exports.isSuspense = function (a) {
  return z(a) === p;
};
exports.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
exports.typeOf = z;

/***/ }),

/***/ "../node_modules/hoist-non-react-statics/node_modules/react-is/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("../node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js");
} else {}

/***/ }),

/***/ "../node_modules/react-is/cjs/react-is.production.min.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var b = Symbol["for"]("react.element"),
  c = Symbol["for"]("react.portal"),
  d = Symbol["for"]("react.fragment"),
  e = Symbol["for"]("react.strict_mode"),
  f = Symbol["for"]("react.profiler"),
  g = Symbol["for"]("react.provider"),
  h = Symbol["for"]("react.context"),
  k = Symbol["for"]("react.server_context"),
  l = Symbol["for"]("react.forward_ref"),
  m = Symbol["for"]("react.suspense"),
  n = Symbol["for"]("react.suspense_list"),
  p = Symbol["for"]("react.memo"),
  q = Symbol["for"]("react.lazy"),
  t = Symbol["for"]("react.offscreen"),
  u;
u = Symbol["for"]("react.module.reference");
function v(a) {
  if ("object" === typeof a && null !== a) {
    var r = a.$$typeof;
    switch (r) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case m:
          case n:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case h:
              case l:
              case q:
              case p:
              case g:
                return a;
              default:
                return r;
            }
        }
      case c:
        return r;
    }
  }
}
__webpack_unused_export__ = h;
__webpack_unused_export__ = g;
__webpack_unused_export__ = b;
__webpack_unused_export__ = l;
__webpack_unused_export__ = d;
__webpack_unused_export__ = q;
__webpack_unused_export__ = p;
__webpack_unused_export__ = c;
__webpack_unused_export__ = f;
__webpack_unused_export__ = e;
__webpack_unused_export__ = m;
__webpack_unused_export__ = n;
__webpack_unused_export__ = function () {
  return !1;
};
__webpack_unused_export__ = function () {
  return !1;
};
__webpack_unused_export__ = function (a) {
  return v(a) === h;
};
__webpack_unused_export__ = function (a) {
  return v(a) === g;
};
__webpack_unused_export__ = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};
__webpack_unused_export__ = function (a) {
  return v(a) === l;
};
__webpack_unused_export__ = function (a) {
  return v(a) === d;
};
__webpack_unused_export__ = function (a) {
  return v(a) === q;
};
__webpack_unused_export__ = function (a) {
  return v(a) === p;
};
__webpack_unused_export__ = function (a) {
  return v(a) === c;
};
__webpack_unused_export__ = function (a) {
  return v(a) === f;
};
__webpack_unused_export__ = function (a) {
  return v(a) === e;
};
__webpack_unused_export__ = function (a) {
  return v(a) === m;
};
__webpack_unused_export__ = function (a) {
  return v(a) === n;
};
__webpack_unused_export__ = function (a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === e || a === m || a === n || a === t || "object" === typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l || a.$$typeof === u || void 0 !== a.getModuleId) ? !0 : !1;
};
__webpack_unused_export__ = v;

/***/ }),

/***/ "../node_modules/react-is/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  /* unused reexport */ __webpack_require__("../node_modules/react-is/cjs/react-is.production.min.js");
} else {}

/***/ }),

/***/ "../node_modules/scheduler/cjs/scheduler.production.min.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function f(a, b) {
  var c = a.length;
  a.push(b);
  a: for (; 0 < c;) {
    var d = c - 1 >>> 1,
      e = a[d];
    if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;else break a;
  }
}
function h(a) {
  return 0 === a.length ? null : a[0];
}
function k(a) {
  if (0 === a.length) return null;
  var b = a[0],
    c = a.pop();
  if (c !== b) {
    a[0] = c;
    a: for (var d = 0, e = a.length, w = e >>> 1; d < w;) {
      var m = 2 * (d + 1) - 1,
        C = a[m],
        n = m + 1,
        x = a[n];
      if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;else break a;
    }
  }
  return b;
}
function g(a, b) {
  var c = a.sortIndex - b.sortIndex;
  return 0 !== c ? c : a.id - b.id;
}
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
var r = [],
  t = [],
  u = 1,
  v = null,
  y = 3,
  z = !1,
  A = !1,
  B = !1,
  D = "function" === typeof setTimeout ? setTimeout : null,
  E = "function" === typeof clearTimeout ? clearTimeout : null,
  F = "undefined" !== typeof setImmediate ? setImmediate : null;
"undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
function G(a) {
  for (var b = h(t); null !== b;) {
    if (null === b.callback) k(t);else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);else break;
    b = h(t);
  }
}
function H(a) {
  B = !1;
  G(a);
  if (!A) if (null !== h(r)) A = !0, I(J);else {
    var b = h(t);
    null !== b && K(H, b.startTime - a);
  }
}
function J(a, b) {
  A = !1;
  B && (B = !1, E(L), L = -1);
  z = !0;
  var c = y;
  try {
    G(b);
    for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M());) {
      var d = v.callback;
      if ("function" === typeof d) {
        v.callback = null;
        y = v.priorityLevel;
        var e = d(v.expirationTime <= b);
        b = exports.unstable_now();
        "function" === typeof e ? v.callback = e : v === h(r) && k(r);
        G(b);
      } else k(r);
      v = h(r);
    }
    if (null !== v) var w = !0;else {
      var m = h(t);
      null !== m && K(H, m.startTime - b);
      w = !1;
    }
    return w;
  } finally {
    v = null, y = c, z = !1;
  }
}
var N = !1,
  O = null,
  L = -1,
  P = 5,
  Q = -1;
function M() {
  return exports.unstable_now() - Q < P ? !1 : !0;
}
function R() {
  if (null !== O) {
    var a = exports.unstable_now();
    Q = a;
    var b = !0;
    try {
      b = O(!0, a);
    } finally {
      b ? S() : (N = !1, O = null);
    }
  } else N = !1;
}
var S;
if ("function" === typeof F) S = function S() {
  F(R);
};else if ("undefined" !== typeof MessageChannel) {
  var T = new MessageChannel(),
    U = T.port2;
  T.port1.onmessage = R;
  S = function S() {
    U.postMessage(null);
  };
} else S = function S() {
  D(R, 0);
};
function I(a) {
  O = a;
  N || (N = !0, S());
}
function K(a, b) {
  L = D(function () {
    a(exports.unstable_now());
  }, b);
}
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
  A || z || (A = !0, I(J));
};
exports.unstable_forceFrameRate = function (a) {
  0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1E3 / a) : 5;
};
exports.unstable_getCurrentPriorityLevel = function () {
  return y;
};
exports.unstable_getFirstCallbackNode = function () {
  return h(r);
};
exports.unstable_next = function (a) {
  switch (y) {
    case 1:
    case 2:
    case 3:
      var b = 3;
      break;
    default:
      b = y;
  }
  var c = y;
  y = b;
  try {
    return a();
  } finally {
    y = c;
  }
};
exports.unstable_pauseExecution = function () {};
exports.unstable_requestPaint = function () {};
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
  var c = y;
  y = a;
  try {
    return b();
  } finally {
    y = c;
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
    id: u++,
    callback: b,
    priorityLevel: a,
    startTime: c,
    expirationTime: e,
    sortIndex: -1
  };
  c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = !0, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = !0, I(J)));
  return a;
};
exports.unstable_shouldYield = M;
exports.unstable_wrapCallback = function (a) {
  var b = y;
  return function () {
    var c = y;
    y = b;
    try {
      return a.apply(this, arguments);
    } finally {
      y = c;
    }
  };
};

/***/ }),

/***/ "../node_modules/scheduler/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("../node_modules/scheduler/cjs/scheduler.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.unstable_batchedUpdates = exports.render = exports.flushSync = exports.batchedUpdates = exports.Renderer = void 0;
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/helpers/dictionary-watcher.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/helpers/hooks/use-globals.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/helpers/hooks/use-reactive-value.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/helpers/icons.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/environment/index.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/generated/index.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/properties/index.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/renderer.js"), exports);
var renderer_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/renderer.js");
Object.defineProperty(exports, "Renderer", ({
  enumerable: true,
  get: function get() {
    return renderer_1.Renderer;
  }
}));
Object.defineProperty(exports, "batchedUpdates", ({
  enumerable: true,
  get: function get() {
    return renderer_1.batchedUpdates;
  }
}));
Object.defineProperty(exports, "flushSync", ({
  enumerable: true,
  get: function get() {
    return renderer_1.flushSync;
  }
}));
Object.defineProperty(exports, "render", ({
  enumerable: true,
  get: function get() {
    return renderer_1.render;
  }
}));
Object.defineProperty(exports, "unstable_batchedUpdates", ({
  enumerable: true,
  get: function get() {
    return renderer_1.batchedUpdates;
  }
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/helpers/dictionary-watcher.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
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
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createDictionaryWatcher = void 0;
var react_1 = __webpack_require__("./node_modules/react/index.js");
var shim_1 = __webpack_require__("./node_modules/use-sync-external-store/shim/index.js");
var with_selector_1 = __webpack_require__("./node_modules/use-sync-external-store/with-selector.js");
/**
 * Creates a context that updates its value when the values in the dictionary change
 * @param dictionary The dictionary to be watched. Must implement the EventDictionary type in the C#
 * @param displayName A displayName to identify this context easier in case of problems
 */
function createDictionaryWatcher(dictionary, displayName) {
  var ctx = (0, react_1.createContext)(undefined);
  if (displayName) ctx.displayName = displayName;
  var createSubscriber = function createSubscriber(fields, isEqual) {
    var snapshot = __assign({}, dictionary);
    return {
      subscribe: function subscribe(onStoreChange) {
        snapshot = __assign({}, dictionary);
        var remove = dictionary === null || dictionary === void 0 ? void 0 : dictionary.AddListener(function () {
          var prev = snapshot;
          snapshot = __assign({}, dictionary);
          if (!fields) onStoreChange();else {
            var it = fields.values();
            for (var field = it.next().value; field; field = it.next().value) {
              if (isEqual ? !isEqual(prev[field], snapshot[field]) : prev[field] !== snapshot[field]) {
                onStoreChange();
                break;
              }
            }
          }
        });
        if (!remove) {
          if (displayName) console.warn("".concat(displayName, " dictionary does not provide a change listener"));else console.warn('The dictionary does not provide a change listener');
        }
        return function () {
          return remove === null || remove === void 0 ? void 0 : remove();
        };
      },
      getSnapshot: function getSnapshot() {
        return snapshot;
      }
    };
  };
  var defaultSubscriber = createSubscriber();
  var Provider = function GlobalsProvider(_a) {
    var children = _a.children;
    var value = (0, shim_1.useSyncExternalStore)(defaultSubscriber.subscribe, defaultSubscriber.getSnapshot, defaultSubscriber.getSnapshot);
    return (0, react_1.createElement)(ctx.Provider, {
      value: value
    }, children);
  };
  function useDictionaryContext() {
    var context = (0, react_1.useContext)(ctx);
    if (context === undefined) {
      if (displayName) throw new Error("".concat(displayName, ".useContext must be used within a ").concat(displayName, ".Provider"));else throw new Error('useContext must be used within a provider');
    }
    return context;
  }
  function useValue(subscribeToAllFields, fieldEqual) {
    if (subscribeToAllFields === void 0) {
      subscribeToAllFields = false;
    }
    var fields = (0, react_1.useMemo)(function () {
      return new Set();
    }, []);
    var fieldsRef = (0, react_1.useRef)(fields);
    var _a = (0, react_1.useState)(false),
      allFieldsSubscribed = _a[0],
      setAllFieldsSubscribed = _a[1];
    subscribeToAllFields || (subscribeToAllFields = allFieldsSubscribed);
    var subscriber = (0, react_1.useMemo)(function () {
      return subscribeToAllFields ? defaultSubscriber : createSubscriber(fieldsRef.current, fieldEqual);
    }, [subscribeToAllFields, fieldEqual]);
    var value = (0, shim_1.useSyncExternalStore)(subscriber.subscribe, subscriber.getSnapshot, subscriber.getSnapshot);
    var proxy = new Proxy(value, {
      get: function get(target, p, receiver) {
        fields.add(p);
        return value[p];
      },
      ownKeys: function ownKeys(target) {
        if (!allFieldsSubscribed) setAllFieldsSubscribed(true);
        return Reflect.ownKeys(target);
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, p) {
        fields.add(p);
        return __assign(__assign({}, Reflect.getOwnPropertyDescriptor(target, p)), {
          value: value[p]
        });
      }
    });
    return proxy;
  }
  function useSelector(selector, isEqual) {
    return (0, with_selector_1.useSyncExternalStoreWithSelector)(defaultSubscriber.subscribe, defaultSubscriber.getSnapshot, defaultSubscriber.getSnapshot, selector, isEqual);
  }
  return {
    context: ctx,
    Provider: Provider,
    useValue: useValue,
    useContext: useDictionaryContext,
    useSelector: useSelector
  };
}
exports.createDictionaryWatcher = createDictionaryWatcher;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/helpers/hooks/use-globals.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GlobalsProvider = exports.useGlobalsSelector = exports.useGlobalsContext = exports.useGlobals = void 0;
var dictionary_watcher_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/helpers/dictionary-watcher.js");
var globalsWatcher = (0, dictionary_watcher_1.createDictionaryWatcher)(Globals, 'globalsContext');
exports.useGlobals = globalsWatcher.useValue;
exports.useGlobalsContext = globalsWatcher.useContext;
exports.useGlobalsSelector = globalsWatcher.useSelector;
exports.GlobalsProvider = globalsWatcher.Provider;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/helpers/hooks/use-reactive-value.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useReactiveValue = void 0;
var react_1 = __webpack_require__("./node_modules/react/index.js");
var shim_1 = __webpack_require__("./node_modules/use-sync-external-store/shim/index.js");
function createSubscriber(obj, isEqual) {
  var isReactive = obj && typeof obj === 'object' && 'Value' in obj;
  var snapshot = isReactive ? obj.Value : undefined;
  return {
    subscribe: function subscribe(onStoreChange) {
      snapshot = isReactive ? obj.Value : undefined;
      var remove = isReactive && typeof obj.AddListener === 'function' && (obj === null || obj === void 0 ? void 0 : obj.AddListener(function () {
        var prev = snapshot;
        snapshot = isReactive ? obj.Value : undefined;
        if (typeof isEqual !== 'function' || !isEqual(prev, snapshot)) {
          onStoreChange();
        }
      }));
      if (isReactive && typeof remove !== 'function') console.warn('The reactive value does not provide a change listener');
      return function () {
        return remove === null || remove === void 0 ? void 0 : remove();
      };
    },
    getSnapshot: function getSnapshot() {
      return snapshot;
    }
  };
}
function useReactiveValue(obj, isEqual) {
  var sb = (0, react_1.useMemo)(function () {
    return createSubscriber(obj, isEqual);
  }, [obj, isEqual]);
  return (0, shim_1.useSyncExternalStore)(sb.subscribe, sb.getSnapshot, sb.getSnapshot);
}
exports.useReactiveValue = useReactiveValue;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/helpers/icons.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
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
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.icon = void 0;
var React = __webpack_require__("./node_modules/react/index.js");
var componentCache = {};
exports.icon = new Proxy({}, {
  get: function get(target, key) {
    if (typeof key === 'symbol') return target[key];
    var icon = key.replace(/^_/, '');
    var cmp = componentCache[icon];
    if (cmp) return cmp;
    cmp = function NamedIcon(props, ref) {
      return React.createElement('icon', __assign(__assign({
        name: "<icon ".concat(icon, ">")
      }, props), {
        ref: ref
      }), icon);
    };
    cmp = React.forwardRef(cmp);
    componentCache[icon] = cmp;
    return cmp;
  }
});

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/environment/dom/global.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/environment/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/environment/dom/global.js");
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/environment/interop.js"), exports);

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/environment/interop.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/generated/editor.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


//
// Types in assemblies: UnityEditor.CoreModule
// Generated 18/02/2023 03:04:17
//
/* eslint-disable */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/generated/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/generated/editor.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/generated/react.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/generated/system.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/generated/tests.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/generated/unity.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/generated/yoga.js"), exports);

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/generated/react.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


//
// Types in assemblies: ReactUnity, ReactUnity.Editor, ReactUnity.UGUI, ReactUnity.UIToolkit
// Generated 19/02/2023 03:24:44
//
/* eslint-disable */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/generated/system.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


//
// Types in assemblies: mscorlib, System.Core, System
// Generated 18/02/2023 03:04:19
//
/* eslint-disable */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/generated/tests.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


//
// Types in assemblies: nunit.framework
// Generated 18/02/2023 03:04:19
//
/* eslint-disable */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/generated/unity.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


//
// Types in assemblies: UnityEngine.CoreModule, Unity.InputSystem, UnityEngine.AudioModule, UnityEngine.UIModule, UnityEngine.TextRenderingModule, UnityEngine.AnimationModule, UnityEngine.IMGUIModule, UnityEngine.UnityAnalyticsModule, UnityEngine.ParticleSystemModule, UnityEngine.PhysicsModule, UnityEngine.InputLegacyModule, UnityEngine.AIModule, UnityEngine.UI, UnityEngine.VideoModule, UnityEngine.TestRunner, UnityEngine.TextCoreFontEngineModule, UnityEngine.TextCoreTextEngineModule, UnityEngine.UIElementsModule, UnityEngine.XRModule
// Generated 18/02/2023 03:04:15
//
/* eslint-disable */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/generated/yoga.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


//
// Types in assemblies: Facebook.Yoga
// Generated 18/02/2023 03:04:17
//
/* eslint-disable */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/properties/common.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/properties/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/properties/common.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/properties/style.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/properties/styles.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/properties/styles-enums.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/properties/values.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/properties/yoga.js"), exports);
__exportStar(__webpack_require__("./node_modules/@reactunity/renderer/dist/src/models/properties/yoga-enums.js"), exports);

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/properties/style.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/properties/styles-enums.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/properties/styles.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/properties/values.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/properties/yoga-enums.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/properties/yoga.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/models/renderer.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/async/callbacks.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
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
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CallbacksRepo = void 0;
var objects_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/async/objects.js");
var CallbacksRepo = /** @class */function (_super) {
  __extends(CallbacksRepo, _super);
  function CallbacksRepo() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.call = function (ind, args) {
      var cb = _this.getObject(ind);
      var argsAsList = args;
      var argsAsArray = args;
      if (typeof argsAsArray.Length === 'number') {
        // C# Array
        args = [];
        var length = argsAsArray.Length;
        for (var index = 0; index < length; index++) {
          args.push(argsAsArray.GetValue(index));
        }
      } else if (typeof argsAsList.Count === 'number') {
        // C# List
        args = [];
        var length = argsAsList.Count;
        for (var index = 0; index < length; index++) {
          args.push(argsAsList[index]);
        }
      } else if (typeof argsAsList.Count === 'function') {
        // C# IList
        args = [];
        var length = argsAsList.Count();
        for (var index = 0; index < length; index++) {
          args.push(argsAsArray.GetValue(index));
        }
      }
      return cb.apply(null, args);
    };
    return _this;
  }
  return CallbacksRepo;
}(objects_1.ObjectsRepo);
exports.CallbacksRepo = CallbacksRepo;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/async/objects.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ObjectsRepo = void 0;
var ObjectsRepo = /** @class */function () {
  function ObjectsRepo() {
    var _this = this;
    this.indices = [{}];
    this.objects = new WeakMap();
    this.setObject = function (index, item) {
      var it = _this.indices[index];
      if (!it) {
        it = _this.indices[index] = {};
      }
      _this.objects.set(it, item);
    };
    this.addObject = function (item) {
      if (!item) return -1;
      var it = {};
      var ind = _this.indices.length;
      _this.indices.push(it);
      _this.objects.set(it, item);
      return ind;
    };
    this.getObject = function (index) {
      if (index < 0) return undefined;
      var it = _this.indices[index];
      return _this.objects.get(it);
    };
  }
  return ObjectsRepo;
}();
exports.ObjectsRepo = ObjectsRepo;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/async/reconciler.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
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
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.asyncReconciler = void 0;
var Reconciler = __webpack_require__("./node_modules/react-reconciler/index.js");
var constants_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/constants.js");
var diffing_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/diffing.js");
var subcontexts_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/subcontexts/index.js");
var serializer_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/async/serializer.js");
var refId = 0;
var ctxMap = new Map();
var updateSubContext = function updateSubContext(instance) {
  var rend = subcontexts_1.subContextRenderers[instance.type];
  var root = instance === null || instance === void 0 ? void 0 : instance.root;
  var cur = instance;
  while (cur && !root) {
    root = cur.root;
    cur = cur.parent;
  }
  if (!root) return;
  var content = rend(root.subContext.node);
  if (instance.type === 'richtext') {
    // instance.hostContext.commands.push(['x', { r: root.refId, c: content }]);
    instance.hostContext.commands.push([6, root.refId, content]);
  } else if (instance.type === 'svg') {
    // instance.hostContext.commands.push(['u', { r: root.refId, t: 'svg', ...convertPropsToSerializable({ innerContent: content }) }]);
    instance.hostContext.commands.push([5, root.refId, 'svg', (0, serializer_1.convertPropsToSerializable)({
      innerContent: content
    })]);
  }
};
var hostConfig = __assign(__assign({}, constants_1.commonReconciler), {
  getRootHostContext: function getRootHostContext(rootContainer) {
    var context = rootContainer.context;
    if (rootContainer.refId < 0) {
      refId++;
      rootContainer.context.SetRef(refId, rootContainer.component);
      rootContainer.refId = refId;
    }
    var existing = ctxMap.get(context);
    if (existing) return existing;
    var commands = rootContainer.commands;
    var flushCommands = function flushCommands() {
      var serialized = JSON.stringify(commands);
      commands.length = 0;
      return serialized;
    };
    var fireEventByRef = function fireEventByRef(ind, args) {
      return serializer_1.callbacksRepo.call(ind, args);
    };
    var getObjectRef = function getObjectRef(ind) {
      return serializer_1.objectsRepo.getObject(ind);
    };
    var getEventAsObjectRef = function getEventAsObjectRef(ind) {
      return serializer_1.callbacksRepo.getObject(ind);
    };
    context.BindCommands(flushCommands, fireEventByRef, getObjectRef, getEventAsObjectRef);
    var ctx = {
      context: context,
      commands: commands,
      refId: rootContainer.refId,
      type: 'native'
    };
    ctxMap.set(context, ctx);
    return ctx;
  },
  getChildHostContext: function getChildHostContext(parentCtx, type) {
    if (type === 'richtext' && parentCtx.type === 'native') return {
      type: 'richtext',
      hostContext: parentCtx,
      node: null,
      parent: null,
      root: null
    };
    if (type === 'svg' && parentCtx.type === 'native') return {
      type: 'svg',
      hostContext: parentCtx,
      node: null,
      parent: null,
      root: null
    };
    return parentCtx;
  },
  getPublicInstance: function getPublicInstance(instance) {
    if (instance.type === 'native') return instance.context.GetRef(instance.refId, instance.commands.length > 0);
    return null;
  },
  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  supportsMicrotasks: true,
  supportsTestSelectors: false,
  isPrimaryRenderer: true,
  warnsIfNotActing: true,
  prepareForCommit: function prepareForCommit() {
    return null;
  },
  resetAfterCommit: function resetAfterCommit() {},
  shouldDeprioritizeSubtree: function shouldDeprioritizeSubtree() {
    return false;
  },
  clearContainer: function clearContainer(container) {
    UnityBridge.clearContainer(container);
  },
  createInstance: function createInstance(type, props, rootContainer, ctx, internalHandle) {
    var aProps = (0, constants_1.getAllowedProps)(props, type);
    if (ctx.type === 'native') {
      refId++;
      // ctx.commands.push(['c', { t: type, r: refId, k: stringizePoolKey(props.pool), ...convertPropsToSerializable(aProps) }]);
      ctx.commands.push([0, refId, type, (0, serializer_1.convertPropsToSerializable)(aProps), (0, constants_1.stringizePoolKey)(props.pool)]);
      if (rootContainer.fiberCache) rootContainer.fiberCache.setObject(refId, internalHandle);
      var res = __assign(__assign({}, ctx), {
        refId: refId
      });
      if (type === 'richtext') {
        res.subContext = {
          type: 'richtext',
          node: {
            tag: '',
            children: [],
            attributes: aProps
          },
          root: res,
          hostContext: res,
          parent: null
        };
      }
      if (type === 'svg') {
        res.subContext = {
          type: 'svg',
          node: {
            tag: '',
            children: [],
            attributes: aProps
          },
          root: res,
          hostContext: res,
          parent: null
        };
      }
      return res;
    } else if (ctx.type === 'richtext' || ctx.type === 'svg') {
      return __assign(__assign({}, ctx), {
        node: {
          tag: type,
          children: [],
          attributes: aProps
        }
      });
    }
  },
  createTextInstance: function createTextInstance(text, rootContainer, ctx, internalHandle) {
    if (ctx.type === 'native') {
      refId++;
      // ctx.commands.push(['t', { r: refId, c: text }]);
      ctx.commands.push([1, refId, text]);
      if (rootContainer.fiberCache) rootContainer.fiberCache.setObject(refId, internalHandle);
      return __assign(__assign({}, ctx), {
        refId: refId
      });
    } else if (ctx.type === 'richtext' || ctx.type === 'svg') {
      return __assign(__assign({}, ctx), {
        node: {
          text: text
        }
      });
    }
  },
  appendInitialChild: function appendInitialChild(parent, child) {
    if (!child) return;
    if (parent.type === 'native' && parent.subContext) parent = parent.subContext;
    if (parent.type === 'native' && child.type === 'native') {
      // parent.commands.push(['a', { p: parent.refId, c: child.refId }]);
      parent.commands.push([2, parent.refId, child.refId]);
    } else if (parent.type === 'richtext' && child.type === 'richtext' || parent.type === 'svg' && child.type === 'svg') {
      if ('children' in parent.node) parent.node.children.push(child.node);
      child.root = parent.root;
      child.parent = parent;
      updateSubContext(child);
    }
  },
  finalizeInitialChildren: function finalizeInitialChildren() {
    return false;
  },
  commitMount: function commitMount(instance) {},
  shouldSetTextContent: function shouldSetTextContent(type) {
    return constants_1.textTypes[type];
  },
  // -------------------
  //     Mutation
  // -------------------
  prepareUpdate: function prepareUpdate(instance, type, oldProps, newProps) {
    return (0, diffing_1.diffProperties)(oldProps, newProps);
  },
  commitUpdate: function commitUpdate(instance, updatePayload, type) {
    var props = (0, constants_1.getAllowedProps)(updatePayload, type);
    if (instance.type === 'native') {
      // instance.commands.push(['u', { r: instance.refId, t: type, ...convertPropsToSerializable(props) }]);
      instance.commands.push([5, instance.refId, type, (0, serializer_1.convertPropsToSerializable)(props)]);
    } else if (instance.type === 'richtext' || instance.type === 'svg') {
      if ('attributes' in instance.node) instance.node.attributes = __assign(__assign({}, instance.node.attributes), props);
      updateSubContext(instance);
    }
  },
  commitTextUpdate: function commitTextUpdate(instance, oldText, newText) {
    if (instance.type === 'native') {
      // instance.commands.push(['x', { r: instance.refId, c: newText }]);
      instance.commands.push([6, instance.refId, newText]);
    } else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node = {
        text: newText
      };
      updateSubContext(instance);
    }
  },
  appendChild: function appendChild(parent, child) {
    if (!child) return;
    if (parent.type === 'native' && parent.subContext) parent = parent.subContext;
    if (parent.type === 'native' && child.type === 'native') {
      // child.commands.push(['a', { p: parent.refId, c: child.refId }]);
      child.commands.push([2, parent.refId, child.refId]);
    } else if (parent.type === 'richtext' && child.type === 'richtext' || parent.type === 'svg' && child.type === 'svg') {
      if ('children' in parent.node) parent.node.children.push(child.node);
      child.root = parent.root;
      child.parent = parent;
      updateSubContext(child);
    }
  },
  appendChildToContainer: function appendChildToContainer(parent, child) {
    if (child.type === 'native')
      // child.commands.push(['a', { p: parent.refId, c: child.refId }]);
      child.commands.push([2, parent.refId, child.refId]);
  },
  insertBefore: function insertBefore(parent, child, beforeChild) {
    if (!child) return;
    if (parent.type === 'native' && parent.subContext) parent = parent.subContext;
    if (parent.type === 'native' && child.type === 'native' && beforeChild.type === 'native') {
      // child.commands.push(['i', { p: parent.refId, c: child.refId, i: beforeChild.refId }]);
      child.commands.push([4, parent.refId, child.refId, beforeChild.refId]);
    } else if (parent.type === 'richtext' && child.type === 'richtext' && beforeChild.type === 'richtext' || parent.type === 'svg' && child.type === 'svg' && beforeChild.type === 'svg') {
      if ('children' in parent.node) {
        var index = parent.node.children.indexOf(beforeChild.node);
        if (index >= 0) parent.node.children.splice(index, 0, child.node);else parent.node.children.push(child.node);
      }
      child.root = parent.root;
      child.parent = parent;
      updateSubContext(child);
    }
  },
  insertInContainerBefore: function insertInContainerBefore(parent, child, beforeChild) {
    if (child.type === 'native' && beforeChild.type === 'native')
      // child.commands.push(['i', { p: parent.refId, c: child.refId, i: beforeChild.refId }]);
      child.commands.push([4, parent.refId, child.refId, beforeChild.refId]);
  },
  removeChild: function removeChild(parent, child) {
    if (!child) return;
    if (parent.type === 'native' && parent.subContext) parent = parent.subContext;
    if (parent.type === 'native' && child.type === 'native') {
      // child.commands.push(['r', { p: parent.refId, c: child.refId }]);
      child.commands.push([3, parent.refId, child.refId]);
    } else if (parent.type === 'richtext' && child.type === 'richtext' || parent.type === 'svg' && child.type === 'svg') {
      if ('children' in parent.node) {
        var index = parent.node.children.indexOf(child.node);
        if (index >= 0) parent.node.children.splice(index, 1);
      }
      updateSubContext(parent);
    }
  },
  removeChildFromContainer: function removeChildFromContainer(parent, child) {
    if (child.type === 'native')
      // child.commands.push(['r', { p: parent.refId, c: child.refId }]);
      child.commands.push([3, parent.refId, child.refId]);
  },
  resetTextContent: function resetTextContent() {},
  preparePortalMount: function preparePortalMount() {},
  detachDeletedInstance: function detachDeletedInstance() {},
  // Required for Suspense
  hideInstance: function hideInstance(instance) {
    if (instance.type === 'native') {
      // instance.commands.push(['h', { r: instance.refId, h: true }]);
      instance.commands.push([7, instance.refId, true]);
    } else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = true;
      updateSubContext(instance);
    }
  },
  hideTextInstance: function hideTextInstance(instance) {
    if (instance.type === 'native') {
      // instance.commands.push(['h', { r: instance.refId, h: true }]);
      instance.commands.push([7, instance.refId, true]);
    } else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = true;
      updateSubContext(instance);
    }
  },
  unhideInstance: function unhideInstance(instance) {
    if (instance.type === 'native') {
      // instance.commands.push(['h', { r: instance.refId, h: false }]);
      instance.commands.push([7, instance.refId, false]);
    } else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = false;
      updateSubContext(instance);
    }
  },
  unhideTextInstance: function unhideTextInstance(instance) {
    if (instance.type === 'native') {
      // instance.commands.push(['h', { r: instance.refId, h: false }]);
      instance.commands.push([7, instance.refId, false]);
    } else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = false;
      updateSubContext(instance);
    }
  }
});
exports.asyncReconciler = Reconciler(hostConfig);

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/async/serializer.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.convertPropsToSerializable = exports.objectsRepo = exports.callbacksRepo = void 0;
var callbacks_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/async/callbacks.js");
var objects_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/async/objects.js");
exports.callbacksRepo = new callbacks_1.CallbacksRepo();
exports.objectsRepo = new objects_1.ObjectsRepo();
// Separates properties in 3 categories: regular props, callbacks and non-serializable objects
function convertPropsToSerializable(props) {
  var res = {};
  for (var key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      var value = props[key];
      if (value == null) {
        (res.p || (res.p = {}))[key] = null;
      } else if (key === 'style') {
        (res.p || (res.p = {}))[key] = convertPropsToSerializable(value);
      } else if (key[0] === 'o' && key[1] === 'n' && typeof value === 'function') {
        var ind = exports.callbacksRepo.addObject(value);
        (res.e || (res.e = {}))[key] = ind;
      } else if (typeof value === 'object' || typeof value === 'function') {
        var ind = exports.objectsRepo.addObject(value);
        (res.o || (res.o = {}))[key] = ind;
      } else {
        (res.p || (res.p = {}))[key] = value;
      }
    }
  }
  return res;
}
exports.convertPropsToSerializable = convertPropsToSerializable;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/constants.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isDevelopment = exports.commonReconciler = exports.getAllowedProps = exports.stringizePoolKey = exports.textTypes = exports.eventPriorities = exports.hideClass = void 0;
var constants_1 = __webpack_require__("./node_modules/react-reconciler/constants.js");
var diffing_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/diffing.js");
exports.hideClass = 'react-unity__renderer__hidden';
exports.eventPriorities = {
  discrete: constants_1.DiscreteEventPriority,
  continuous: constants_1.ContinuousEventPriority,
  "default": constants_1.DefaultEventPriority,
  idle: constants_1.IdleEventPriority
};
exports.textTypes = {
  text: true,
  icon: true,
  style: true,
  script: true
};
function stringizePoolKey(key) {
  switch (typeof key) {
    case 'string':
      return key;
    case 'boolean':
      return key ? 'default' : '';
    case 'number':
      return key.toString();
    case 'undefined':
      return null;
    default:
      return '';
  }
}
exports.stringizePoolKey = stringizePoolKey;
function getAllowedProps(props, type) {
  var children = props.children,
    tag = props.tag,
    pool = props.pool,
    rest = __rest(props, ["children", "tag", "pool"]);
  if (exports.textTypes[type] && 'children' in props) {
    rest.children = !children || typeof children === 'boolean' ? null : Array.isArray(children) ? children.join('') : children + '';
  }
  if (typeof props.style === 'string') rest[diffing_1.styleStringSymbol] = props.style;
  return rest;
}
exports.getAllowedProps = getAllowedProps;
exports.commonReconciler = {
  // -------------------
  //     Scheduling
  // -------------------
  now: Date.now,
  getCurrentEventPriority: function getCurrentEventPriority() {
    return UnityBridge.CurrentEventPriority || exports.eventPriorities["default"];
  },
  noTimeout: -1,
  scheduleTimeout: function scheduleTimeout(callback, delay) {
    return setTimeout(callback, delay);
  },
  scheduleMicrotask: typeof queueMicrotask === 'function' ? queueMicrotask : function (callback) {
    return Promise.resolve(null).then(callback)["catch"](function (error) {
      return setTimeout(function () {
        throw error;
      }, 0);
    });
  },
  cancelTimeout: function cancelTimeout(handle) {
    return clearTimeout(handle);
  },
  beforeActiveInstanceBlur: function beforeActiveInstanceBlur() {},
  afterActiveInstanceBlur: function afterActiveInstanceBlur() {},
  getInstanceFromNode: function getInstanceFromNode(node) {
    return undefined;
  },
  getInstanceFromScope: function getInstanceFromScope(scopeInstance) {
    return undefined;
  },
  prepareScopeUpdate: function prepareScopeUpdate(scopeInstance, instance) {}
};
exports.isDevelopment = "production" === 'development';

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/diffing.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.diffProperties = exports.styleStringSymbol = void 0;
exports.styleStringSymbol = '__style_as_string__';
var propDepths = {
  style: 1,
  data: 1,
  custom: 1
};
function diffProperties(lastProps, nextProps, deepDiffing) {
  if (deepDiffing === void 0) {
    deepDiffing = 0;
  }
  if (lastProps === nextProps) return null;
  var updatePayload = null;
  var propKey;
  for (propKey in lastProps) {
    // This loop is for removing properties that existed in the previous properties, but not on current
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
      continue;
    }
    var prop = null;
    // If style existed in the previous properties as string, set it to null
    if (propKey === 'style' && typeof lastProps.style === 'string') {
      (updatePayload = updatePayload || {})[exports.styleStringSymbol] = null;
    } else {
      var depth = deepDiffing > 0 ? deepDiffing : propDepths[propKey] || 0;
      if (depth > 0) {
        prop = diffProperties(lastProps[propKey], {}, depth - 1);
        if (!prop) continue;
      }
      // For all other deleted properties we add it to the queue. We use
      // the whitelist in the commit phase instead.
      (updatePayload = updatePayload || {})[propKey] = prop;
    }
  }
  for (propKey in nextProps) {
    // This loop is for finding difference between current properties and previous properties
    var nextProp = nextProps[propKey];
    var lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
      continue;
    }
    var prop = nextProp;
    if (propKey === 'style') {
      var prevWasString = typeof lastProp === 'string';
      var curIsString = typeof prop === 'string';
      if (prevWasString !== curIsString) {
        (updatePayload = updatePayload || {})[exports.styleStringSymbol] = typeof prop === 'string' ? prop : null;
        if (curIsString) {
          // Current style is string while previous is object, so revert all changes from the previous one
          prop = diffProperties(lastProp, {}, 0);
          if (!prop) continue;
        }
      } else {
        if (curIsString) {
          // Both styles are string, style does not need changing
          continue;
        } else {
          // Both styles are object, take the difference
          prop = diffProperties(lastProp, nextProp, 0);
          if (!prop) continue;
        }
      }
    } else {
      var depth = deepDiffing > 0 ? deepDiffing : propDepths[propKey] || 0;
      if (depth > 0) {
        prop = diffProperties(lastProp, nextProp, depth - 1);
        if (!prop) continue;
      }
    }
    (updatePayload = updatePayload || {})[propKey] = prop;
  }
  return updatePayload;
}
exports.diffProperties = diffProperties;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/renderer.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.flushSync = exports.batchedUpdates = exports.Renderer = exports.render = void 0;
var react_1 = __webpack_require__("./node_modules/react/index.js");
var constants_1 = __webpack_require__("./node_modules/react-reconciler/constants.js");
var version_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/version.js");
var default_view_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/views/default-view.js");
var objects_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/async/objects.js");
var reconciler_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/async/reconciler.js");
var constants_2 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/constants.js");
var reconciler_2 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/sync/reconciler.js");
var containerMap = new Map();
var renderCount = 0;
function _render(element, options) {
  if (options === void 0) {
    options = {};
  }
  renderCount++;
  var hostContainer = (options === null || options === void 0 ? void 0 : options.hostContainer) || HostContainer;
  var cacheKey = hostContainer.InstanceId >= 0 ? hostContainer.InstanceId : hostContainer;
  var isAsync = !(options === null || options === void 0 ? void 0 : options.disableBatchRendering);
  var _a = containerMap.get(cacheKey) || {},
    hostRoot = _a.hostRoot,
    asyncJobCallback = _a.asyncJobCallback;
  var findFiberByHostInstance = function findFiberByHostInstance() {
    return null;
  };
  if (!hostRoot) {
    var mode = (options === null || options === void 0 ? void 0 : options.mode) === 'legacy' ? constants_1.LegacyRoot : constants_1.ConcurrentRoot;
    if (isAsync) {
      var fiberCache_1 = constants_2.isDevelopment ? new objects_1.ObjectsRepo() : null;
      if (constants_2.isDevelopment) {
        findFiberByHostInstance = function findFiberByHostInstance(instance) {
          return !instance ? null : fiberCache_1.getObject(instance.refId);
        };
      }
      var scheduled_1 = false;
      var commands_1 = [];
      commands_1.push = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!scheduled_1) {
          scheduled_1 = true;
          Promise.resolve().then(function () {
            asyncJobCallback();
            scheduled_1 = false;
          });
        }
        return Array.prototype.push.apply(commands_1, args);
      };
      var hostContainerInstance_1 = {
        type: 'native',
        commands: commands_1,
        component: hostContainer,
        context: hostContainer.Context,
        refId: hostContainer.RefId,
        fiberCache: fiberCache_1
      };
      asyncJobCallback = function asyncJobCallback() {
        if (!commands_1.length) return;
        var serialized = JSON.stringify(commands_1);
        commands_1.length = 0;
        hostContainerInstance_1.context.FlushCommands(serialized);
      };
      hostRoot = reconciler_1.asyncReconciler.createContainer(hostContainerInstance_1, mode, null, false, undefined, '', function (error) {
        return console.error(error);
      }, null);
    } else {
      hostRoot = reconciler_2.syncReconciler.createContainer(hostContainer, mode, null, false, undefined, '', function (error) {
        return console.error(error);
      }, null);
    }
    containerMap.set(cacheKey, {
      hostRoot: hostRoot,
      asyncJobCallback: asyncJobCallback
    });
  }
  var shouldWrapWithHelpers = !(options === null || options === void 0 ? void 0 : options.disableHelpers);
  if (shouldWrapWithHelpers) {
    var viewWrapperProps = {
      withHelpers: !(options === null || options === void 0 ? void 0 : options.disableHelpers),
      renderCount: renderCount
    };
    element = (0, react_1.createElement)(default_view_1.DefaultView, viewWrapperProps, element);
  }
  var rc = isAsync ? reconciler_1.asyncReconciler : reconciler_2.syncReconciler;
  rc.updateContainer(element, hostRoot, null);
  rc.injectIntoDevTools({
    bundleType: constants_2.isDevelopment ? 1 : 0,
    version: version_1.version,
    rendererPackageName: '@reactunity/renderer',
    rendererConfig: {
      isAsync: isAsync
    },
    findFiberByHostInstance: findFiberByHostInstance
  });
  return rc;
}
exports.render = _render;
/**
 * @deprecated Instead, import `render` directly from `@reactunity/renderer`
 */
exports.Renderer = {
  render: function render(element, options) {
    if (options === void 0) {
      options = {};
    }
    return _render(element, options);
  }
};
exports.batchedUpdates = reconciler_1.asyncReconciler.batchedUpdates;
exports.flushSync = reconciler_1.asyncReconciler.flushSync;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/subcontexts/index.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.subContextRenderers = void 0;
var richtext_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/subcontexts/richtext.js");
var svg_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/subcontexts/svg.js");
exports.subContextRenderers = {
  richtext: richtext_1.stringifyRichText,
  svg: svg_1.stringifySVG
};

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/subcontexts/richtext.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.stringifyRichText = exports.parametrizeValue = void 0;
function parametrizeValue(value) {
  if (typeof value === 'number') return value + '';
  value = value + '';
  if (value.includes(' ') || value.includes('-')) return '"' + value + '"';
  return value;
}
exports.parametrizeValue = parametrizeValue;
function stringifyRichText(node) {
  var _a, _b, _c;
  if (node.hidden) return '';
  if ('text' in node) return node.text;
  var acc = [];
  var tag = node.tag;
  if (tag) {
    acc.push('<');
    acc.push(tag);
    if (((_a = node.attributes) === null || _a === void 0 ? void 0 : _a.value) != null) {
      var value = (_b = node.attributes) === null || _b === void 0 ? void 0 : _b.value;
      acc.push('=');
      acc.push(parametrizeValue(value));
    }
    for (var key in node.attributes) {
      if (key === 'value') continue;
      if (Object.prototype.hasOwnProperty.call(node.attributes, key)) {
        var value = node.attributes[key];
        if (value != null) {
          acc.push(' ');
          acc.push(key);
          acc.push('=');
          acc.push(parametrizeValue(value));
        }
      }
    }
    acc.push('>');
  }
  if (((_c = node.children) === null || _c === void 0 ? void 0 : _c.length) > 0) {
    for (var _i = 0, _d = node.children; _i < _d.length; _i++) {
      var child = _d[_i];
      acc.push(stringifyRichText(child));
    }
    if (tag) {
      acc.push('</');
      acc.push(tag);
      acc.push('>');
    }
  }
  return acc.join('');
}
exports.stringifyRichText = stringifyRichText;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/subcontexts/svg.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.stringifySVG = exports.stringifyStyle = void 0;
function kebabize(str) {
  return str.split('').map(function (letter, idx) {
    return letter.toUpperCase() === letter ? "".concat(idx !== 0 ? '-' : '').concat(letter.toLowerCase()) : letter;
  }).join('');
}
;
function stringifyStyle(style) {
  if (typeof style === 'string') return style;
  var acc = [];
  for (var key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      var element = style[key];
      if (element != null) {
        acc.push(kebabize(key));
        acc.push(':');
        acc.push(element);
        acc.push(';');
      }
    }
  }
  return acc.join('');
}
exports.stringifyStyle = stringifyStyle;
function stringifySVG(node) {
  var _a;
  if (node.hidden) return '';
  if ('text' in node) return node.text;
  var acc = [];
  var tag = node.tag;
  if (tag) {
    acc.push('<');
    acc.push(tag);
    for (var key in node.attributes) {
      if (Object.prototype.hasOwnProperty.call(node.attributes, key)) {
        var element = node.attributes[key];
        if (key === 'style') element = stringifyStyle(element);
        if (element != null) {
          acc.push(' ');
          acc.push(kebabize(key));
          acc.push('="');
          acc.push(element);
          acc.push('"');
        }
      }
    }
  }
  if (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
    if (tag) acc.push('>');
    for (var _i = 0, _b = node.children; _i < _b.length; _i++) {
      var child = _b[_i];
      acc.push(stringifySVG(child));
    }
    if (tag) {
      acc.push('</');
      acc.push(tag);
      acc.push('>');
    }
  } else {
    if (tag) acc.push(' />');
  }
  return acc.join('');
}
exports.stringifySVG = stringifySVG;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/renderer/sync/reconciler.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
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
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.syncReconciler = void 0;
var Reconciler = __webpack_require__("./node_modules/react-reconciler/index.js");
var constants_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/constants.js");
var diffing_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/renderer/diffing.js");
var hostContext = {};
var childContext = {};
var hostConfig = __assign(__assign({}, constants_1.commonReconciler), {
  getRootHostContext: function getRootHostContext() {
    return hostContext;
  },
  getChildHostContext: function getChildHostContext() {
    return childContext;
  },
  getPublicInstance: function getPublicInstance(instance) {
    return instance;
  },
  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  supportsMicrotasks: true,
  supportsTestSelectors: false,
  isPrimaryRenderer: true,
  warnsIfNotActing: true,
  prepareForCommit: function prepareForCommit() {
    return null;
  },
  resetAfterCommit: function resetAfterCommit() {},
  clearContainer: function clearContainer(container) {
    return UnityBridge.clearContainer(container);
  },
  shouldDeprioritizeSubtree: function shouldDeprioritizeSubtree() {
    return false;
  },
  createInstance: function createInstance(type, props, rootContainerInstance) {
    var aProps = (0, constants_1.getAllowedProps)(props, type);
    var children = aProps.children || null;
    delete aProps.children;
    return UnityBridge.createElement(props.tag || type, children, rootContainerInstance, aProps, (0, constants_1.stringizePoolKey)(props.pool));
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance) {
    return UnityBridge.createText(text, rootContainerInstance);
  },
  appendInitialChild: function appendInitialChild(parent, child) {
    UnityBridge.appendChild(parent, child);
  },
  finalizeInitialChildren: function finalizeInitialChildren() {
    return false;
  },
  commitMount: function commitMount() {},
  shouldSetTextContent: function shouldSetTextContent(type) {
    return constants_1.textTypes[type];
  },
  // -------------------
  //     Mutation
  // -------------------
  prepareUpdate: function prepareUpdate(instance, type, oldProps, newProps) {
    return (0, diffing_1.diffProperties)(oldProps, newProps);
  },
  commitUpdate: function commitUpdate(instance, updatePayload, type) {
    UnityBridge.applyUpdate(instance, (0, constants_1.getAllowedProps)(updatePayload, type), type);
  },
  commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
    UnityBridge.setText(textInstance, newText);
  },
  appendChild: function appendChild(parent, child) {
    return UnityBridge.appendChild(parent, child);
  },
  appendChildToContainer: function appendChildToContainer(parent, child) {
    return UnityBridge.appendChildToContainer(parent, child);
  },
  insertBefore: function insertBefore(parent, child, beforeChild) {
    return UnityBridge.insertBefore(parent, child, beforeChild);
  },
  insertInContainerBefore: function insertInContainerBefore(parent, child, beforeChild) {
    return UnityBridge.insertBefore(parent, child, beforeChild);
  },
  removeChild: function removeChild(parent, child) {
    return UnityBridge.removeChild(parent, child);
  },
  removeChildFromContainer: function removeChildFromContainer(parent, child) {
    return UnityBridge.removeChild(parent, child);
  },
  resetTextContent: function resetTextContent() {},
  preparePortalMount: function preparePortalMount() {},
  detachDeletedInstance: function detachDeletedInstance() {},
  // Required for Suspense
  hideInstance: function hideInstance(instance) {
    instance.ClassList.Add(constants_1.hideClass);
  },
  hideTextInstance: function hideTextInstance(instance) {
    instance.ClassList.Add(constants_1.hideClass);
  },
  unhideInstance: function unhideInstance(instance) {
    instance.ClassList.Remove(constants_1.hideClass);
  },
  unhideTextInstance: function unhideTextInstance(instance) {
    instance.ClassList.Remove(constants_1.hideClass);
  }
});
exports.syncReconciler = Reconciler(hostConfig);

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/version.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.version = void 0;
exports.version = '0.16.1';

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/views/default-view.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DefaultView = void 0;
var jsx_runtime_1 = __webpack_require__("./node_modules/react/jsx-runtime.js");
var error_boundary_1 = __webpack_require__("./node_modules/@reactunity/renderer/dist/src/views/error-boundary.js");
function DefaultView(_a) {
  var children = _a.children,
    withHelpers = _a.withHelpers,
    renderCount = _a.renderCount;
  return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {
    children: !withHelpers ? children : (0, jsx_runtime_1.jsx)(error_boundary_1.ErrorBoundary, {
      children: children
    }, renderCount)
  });
}
exports.DefaultView = DefaultView;

/***/ }),

/***/ "./node_modules/@reactunity/renderer/dist/src/views/error-boundary.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
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
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ErrorBoundary = void 0;
var jsx_runtime_1 = __webpack_require__("./node_modules/react/jsx-runtime.js");
var React = __webpack_require__("./node_modules/react/index.js");
var ErrorBoundary = /** @class */function (_super) {
  __extends(ErrorBoundary, _super);
  function ErrorBoundary(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      hasError: false,
      error: null
    };
    return _this;
  }
  ErrorBoundary.getDerivedStateFromError = function (error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error: error
    };
  };
  ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  };
  ErrorBoundary.prototype.render = function () {
    var _a, _b;
    if (this.state.hasError) {
      return (0, jsx_runtime_1.jsxs)("view", {
        id: '__react-unity-error-boundary',
        style: {
          color: 'crimson',
          padding: 20,
          fontSize: 16
        },
        children: [(0, jsx_runtime_1.jsx)("view", {
          style: {
            marginBottom: '12px'
          },
          children: ((_a = this.state.error) === null || _a === void 0 ? void 0 : _a.message) || ''
        }), (0, jsx_runtime_1.jsx)("view", {
          children: ((_b = this.state.error) === null || _b === void 0 ? void 0 : _b.stack) || ''
        })]
      });
    }
    return this.props.children;
  };
  return ErrorBoundary;
}(React.Component);
exports.ErrorBoundary = ErrorBoundary;

/***/ }),

/***/ "./node_modules/react-reconciler/cjs/react-reconciler-constants.production.min.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react-reconciler-constants.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


exports.ConcurrentRoot = 1;
exports.ContinuousEventPriority = 4;
exports.DefaultEventPriority = 16;
exports.DiscreteEventPriority = 1;
exports.IdleEventPriority = 536870912;
exports.LegacyRoot = 0;

/***/ }),

/***/ "./node_modules/react-reconciler/cjs/react-reconciler.production.min.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @license React
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
  var aa = __webpack_require__("./node_modules/react/index.js"),
    ba = __webpack_require__("../node_modules/scheduler/index.js"),
    ca = Object.assign;
  function m(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
      b += "&args[]=" + encodeURIComponent(arguments[c]);
    }
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    ea = Symbol["for"]("react.element"),
    fa = Symbol["for"]("react.portal"),
    ha = Symbol["for"]("react.fragment"),
    ia = Symbol["for"]("react.strict_mode"),
    ja = Symbol["for"]("react.profiler"),
    ka = Symbol["for"]("react.provider"),
    la = Symbol["for"]("react.context"),
    ma = Symbol["for"]("react.forward_ref"),
    na = Symbol["for"]("react.suspense"),
    oa = Symbol["for"]("react.suspense_list"),
    pa = Symbol["for"]("react.memo"),
    qa = Symbol["for"]("react.lazy");
  Symbol["for"]("react.scope");
  Symbol["for"]("react.debug_trace_mode");
  var ra = Symbol["for"]("react.offscreen");
  Symbol["for"]("react.legacy_hidden");
  Symbol["for"]("react.cache");
  Symbol["for"]("react.tracing_marker");
  var sa = Symbol.iterator;
  function ta(a) {
    if (null === a || "object" !== typeof a) return null;
    a = sa && a[sa] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  function ua(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch (a) {
      case ha:
        return "Fragment";
      case fa:
        return "Portal";
      case ja:
        return "Profiler";
      case ia:
        return "StrictMode";
      case na:
        return "Suspense";
      case oa:
        return "SuspenseList";
    }
    if ("object" === typeof a) switch (a.$$typeof) {
      case la:
        return (a.displayName || "Context") + ".Consumer";
      case ka:
        return (a._context.displayName || "Context") + ".Provider";
      case ma:
        var b = a.render;
        a = a.displayName;
        a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case pa:
        return b = a.displayName || null, null !== b ? b : ua(a.type) || "Memo";
      case qa:
        b = a._payload;
        a = a._init;
        try {
          return ua(a(b));
        } catch (c) {}
    }
    return null;
  }
  function va(a) {
    var b = a.type;
    switch (a.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b.displayName || "Context") + ".Consumer";
      case 10:
        return (b._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ua(b);
      case 8:
        return b === ia ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b) return b.displayName || b.name || null;
        if ("string" === typeof b) return b;
    }
    return null;
  }
  function wa(a) {
    var b = a,
      c = a;
    if (a.alternate) for (; b["return"];) {
      b = b["return"];
    } else {
      a = b;
      do {
        b = a, 0 !== (b.flags & 4098) && (c = b["return"]), a = b["return"];
      } while (a);
    }
    return 3 === b.tag ? c : null;
  }
  function xa(a) {
    if (wa(a) !== a) throw Error(m(188));
  }
  function ya(a) {
    var b = a.alternate;
    if (!b) {
      b = wa(a);
      if (null === b) throw Error(m(188));
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
          if (f === c) return xa(e), a;
          if (f === d) return xa(e), b;
          f = f.sibling;
        }
        throw Error(m(188));
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
          if (!g) throw Error(m(189));
        }
      }
      if (c.alternate !== d) throw Error(m(190));
    }
    if (3 !== c.tag) throw Error(m(188));
    return c.stateNode.current === c ? a : b;
  }
  function Aa(a) {
    a = ya(a);
    return null !== a ? Ba(a) : null;
  }
  function Ba(a) {
    if (5 === a.tag || 6 === a.tag) return a;
    for (a = a.child; null !== a;) {
      var b = Ba(a);
      if (null !== b) return b;
      a = a.sibling;
    }
    return null;
  }
  function Ca(a) {
    if (5 === a.tag || 6 === a.tag) return a;
    for (a = a.child; null !== a;) {
      if (4 !== a.tag) {
        var b = Ca(a);
        if (null !== b) return b;
      }
      a = a.sibling;
    }
    return null;
  }
  var Da = Array.isArray,
    Ea = $$$hostConfig.getPublicInstance,
    Fa = $$$hostConfig.getRootHostContext,
    Ga = $$$hostConfig.getChildHostContext,
    Ha = $$$hostConfig.prepareForCommit,
    Ia = $$$hostConfig.resetAfterCommit,
    Ja = $$$hostConfig.createInstance,
    Ka = $$$hostConfig.appendInitialChild,
    La = $$$hostConfig.finalizeInitialChildren,
    Ma = $$$hostConfig.prepareUpdate,
    Na = $$$hostConfig.shouldSetTextContent,
    Oa = $$$hostConfig.createTextInstance,
    Pa = $$$hostConfig.scheduleTimeout,
    Qa = $$$hostConfig.cancelTimeout,
    Ra = $$$hostConfig.noTimeout,
    Sa = $$$hostConfig.isPrimaryRenderer,
    Ta = $$$hostConfig.supportsMutation,
    Ua = $$$hostConfig.supportsPersistence,
    Va = $$$hostConfig.supportsHydration,
    Wa = $$$hostConfig.getInstanceFromNode,
    Xa = $$$hostConfig.preparePortalMount,
    Ya = $$$hostConfig.getCurrentEventPriority,
    Za = $$$hostConfig.detachDeletedInstance,
    $a = $$$hostConfig.supportsMicrotasks,
    ab = $$$hostConfig.scheduleMicrotask,
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
    Eb = $$$hostConfig.cloneHiddenInstance,
    Fb = $$$hostConfig.cloneHiddenTextInstance,
    Gb = $$$hostConfig.canHydrateInstance,
    Hb = $$$hostConfig.canHydrateTextInstance,
    Ib = $$$hostConfig.canHydrateSuspenseInstance,
    Jb = $$$hostConfig.isSuspenseInstancePending,
    Kb = $$$hostConfig.isSuspenseInstanceFallback,
    Lb = $$$hostConfig.getSuspenseInstanceFallbackErrorDetails,
    Mb = $$$hostConfig.registerSuspenseInstanceRetry,
    Nb = $$$hostConfig.getNextHydratableSibling,
    Ob = $$$hostConfig.getFirstHydratableChild,
    Pb = $$$hostConfig.getFirstHydratableChildWithinContainer,
    Qb = $$$hostConfig.getFirstHydratableChildWithinSuspenseInstance,
    Rb = $$$hostConfig.hydrateInstance,
    Sb = $$$hostConfig.hydrateTextInstance,
    Tb = $$$hostConfig.hydrateSuspenseInstance,
    Ub = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,
    Vb = $$$hostConfig.commitHydratedContainer,
    Wb = $$$hostConfig.commitHydratedSuspenseInstance,
    Xb = $$$hostConfig.clearSuspenseBoundary,
    Yb = $$$hostConfig.clearSuspenseBoundaryFromContainer,
    Zb = $$$hostConfig.shouldDeleteUnhydratedTailInstances,
    $b = $$$hostConfig.didNotMatchHydratedContainerTextInstance,
    ac = $$$hostConfig.didNotMatchHydratedTextInstance,
    bc;
  function cc(a) {
    if (void 0 === bc) try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      bc = b && b[1] || "";
    }
    return "\n" + bc + a;
  }
  var dc = !1;
  function ec(a, b) {
    if (!a || dc) return "";
    dc = !0;
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
          } catch (l) {
            var d = l;
          }
          Reflect.construct(a, [], b);
        } else {
          try {
            b.call();
          } catch (l) {
            d = l;
          }
          a.call(b.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (l) {
          d = l;
        }
        a();
      }
    } catch (l) {
      if (l && d && "string" === typeof l.stack) {
        for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) {
          h--;
        }
        for (; 1 <= g && 0 <= h; g--, h--) {
          if (e[g] !== f[h]) {
            if (1 !== g || 1 !== h) {
              do {
                if (g--, h--, 0 > h || e[g] !== f[h]) {
                  var k = "\n" + e[g].replace(" at new ", " at ");
                  a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                  return k;
                }
              } while (1 <= g && 0 <= h);
            }
            break;
          }
        }
      }
    } finally {
      dc = !1, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? cc(a) : "";
  }
  var fc = Object.prototype.hasOwnProperty,
    gc = [],
    hc = -1;
  function ic(a) {
    return {
      current: a
    };
  }
  function q(a) {
    0 > hc || (a.current = gc[hc], gc[hc] = null, hc--);
  }
  function v(a, b) {
    hc++;
    gc[hc] = a.current;
    a.current = b;
  }
  var jc = {},
    x = ic(jc),
    z = ic(!1),
    kc = jc;
  function lc(a, b) {
    var c = a.type.contextTypes;
    if (!c) return jc;
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
  function A(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }
  function mc() {
    q(z);
    q(x);
  }
  function nc(a, b, c) {
    if (x.current !== jc) throw Error(m(168));
    v(x, b);
    v(z, c);
  }
  function oc(a, b, c) {
    var d = a.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();
    for (var e in d) {
      if (!(e in b)) throw Error(m(108, va(a) || "Unknown", e));
    }
    return ca({}, c, d);
  }
  function pc(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || jc;
    kc = x.current;
    v(x, a);
    v(z, z.current);
    return !0;
  }
  function rc(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(m(169));
    c ? (a = oc(a, b, kc), d.__reactInternalMemoizedMergedChildContext = a, q(z), q(x), v(x, a)) : q(z);
    v(z, c);
  }
  var tc = Math.clz32 ? Math.clz32 : sc,
    uc = Math.log,
    vc = Math.LN2;
  function sc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (uc(a) / vc | 0) | 0;
  }
  var wc = 64,
    xc = 4194304;
  function yc(a) {
    switch (a & -a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a;
    }
  }
  function zc(a, b) {
    var c = a.pendingLanes;
    if (0 === c) return 0;
    var d = 0,
      e = a.suspendedLanes,
      f = a.pingedLanes,
      g = c & 268435455;
    if (0 !== g) {
      var h = g & ~e;
      0 !== h ? d = yc(h) : (f &= g, 0 !== f && (d = yc(f)));
    } else g = c & ~e, 0 !== g ? d = yc(g) : 0 !== f && (d = yc(f));
    if (0 === d) return 0;
    if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
    0 !== (d & 4) && (d |= c & 16);
    b = a.entangledLanes;
    if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) {
      c = 31 - tc(b), e = 1 << c, d |= a[c], b &= ~e;
    }
    return d;
  }
  function Ac(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 4:
        return b + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return b + 5E3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Bc(a, b) {
    for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f;) {
      var g = 31 - tc(f),
        h = 1 << g,
        k = e[g];
      if (-1 === k) {
        if (0 === (h & c) || 0 !== (h & d)) e[g] = Ac(h, b);
      } else k <= b && (a.expiredLanes |= h);
      f &= ~h;
    }
  }
  function Cc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function Dc() {
    var a = wc;
    wc <<= 1;
    0 === (wc & 4194240) && (wc = 64);
    return a;
  }
  function Ec(a) {
    for (var b = [], c = 0; 31 > c; c++) {
      b.push(a);
    }
    return b;
  }
  function Fc(a, b, c) {
    a.pendingLanes |= b;
    536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
    a = a.eventTimes;
    b = 31 - tc(b);
    a[b] = c;
  }
  function Gc(a, b) {
    var c = a.pendingLanes & ~b;
    a.pendingLanes = b;
    a.suspendedLanes = 0;
    a.pingedLanes = 0;
    a.expiredLanes &= b;
    a.mutableReadLanes &= b;
    a.entangledLanes &= b;
    b = a.entanglements;
    var d = a.eventTimes;
    for (a = a.expirationTimes; 0 < c;) {
      var e = 31 - tc(c),
        f = 1 << e;
      b[e] = 0;
      d[e] = -1;
      a[e] = -1;
      c &= ~f;
    }
  }
  function Hc(a, b) {
    var c = a.entangledLanes |= b;
    for (a = a.entanglements; c;) {
      var d = 31 - tc(c),
        e = 1 << d;
      e & b | a[d] & b && (a[d] |= b);
      c &= ~e;
    }
  }
  var C = 0;
  function Ic(a) {
    a &= -a;
    return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Jc = ba.unstable_scheduleCallback,
    Kc = ba.unstable_cancelCallback,
    Lc = ba.unstable_shouldYield,
    Mc = ba.unstable_requestPaint,
    D = ba.unstable_now,
    Nc = ba.unstable_ImmediatePriority,
    Oc = ba.unstable_UserBlockingPriority,
    Pc = ba.unstable_NormalPriority,
    Qc = ba.unstable_IdlePriority,
    Rc = null,
    Sc = null;
  function Tc(a) {
    if (Sc && "function" === typeof Sc.onCommitFiberRoot) try {
      Sc.onCommitFiberRoot(Rc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {}
  }
  function Uc(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var Vc = "function" === typeof Object.is ? Object.is : Uc,
    Wc = null,
    Xc = !1,
    Yc = !1;
  function Zc(a) {
    null === Wc ? Wc = [a] : Wc.push(a);
  }
  function $c(a) {
    Xc = !0;
    Zc(a);
  }
  function ad() {
    if (!Yc && null !== Wc) {
      Yc = !0;
      var a = 0,
        b = C;
      try {
        var c = Wc;
        for (C = 1; a < c.length; a++) {
          var d = c[a];
          do {
            d = d(!0);
          } while (null !== d);
        }
        Wc = null;
        Xc = !1;
      } catch (e) {
        throw null !== Wc && (Wc = Wc.slice(a + 1)), Jc(Nc, ad), e;
      } finally {
        C = b, Yc = !1;
      }
    }
    return null;
  }
  var bd = [],
    cd = 0,
    dd = null,
    ed = 0,
    fd = [],
    gd = 0,
    hd = null,
    id = 1,
    jd = "";
  function kd(a, b) {
    bd[cd++] = ed;
    bd[cd++] = dd;
    dd = a;
    ed = b;
  }
  function ld(a, b, c) {
    fd[gd++] = id;
    fd[gd++] = jd;
    fd[gd++] = hd;
    hd = a;
    var d = id;
    a = jd;
    var e = 32 - tc(d) - 1;
    d &= ~(1 << e);
    c += 1;
    var f = 32 - tc(b) + e;
    if (30 < f) {
      var g = e - e % 5;
      f = (d & (1 << g) - 1).toString(32);
      d >>= g;
      e -= g;
      id = 1 << 32 - tc(b) + e | c << e | d;
      jd = f + a;
    } else id = 1 << f | c << e | d, jd = a;
  }
  function md(a) {
    null !== a["return"] && (kd(a, 1), ld(a, 1, 0));
  }
  function nd(a) {
    for (; a === dd;) {
      dd = bd[--cd], bd[cd] = null, ed = bd[--cd], bd[cd] = null;
    }
    for (; a === hd;) {
      hd = fd[--gd], fd[gd] = null, jd = fd[--gd], fd[gd] = null, id = fd[--gd], fd[gd] = null;
    }
  }
  var od = null,
    pd = null,
    F = !1,
    qd = !1,
    rd = null;
  function sd(a, b) {
    var c = td(5, null, null, 0);
    c.elementType = "DELETED";
    c.stateNode = b;
    c["return"] = a;
    b = a.deletions;
    null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
  }
  function ud(a, b) {
    switch (a.tag) {
      case 5:
        return b = Gb(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, od = a, pd = Ob(b), !0) : !1;
      case 6:
        return b = Hb(b, a.pendingProps), null !== b ? (a.stateNode = b, od = a, pd = null, !0) : !1;
      case 13:
        b = Ib(b);
        if (null !== b) {
          var c = null !== hd ? {
            id: id,
            overflow: jd
          } : null;
          a.memoizedState = {
            dehydrated: b,
            treeContext: c,
            retryLane: 1073741824
          };
          c = td(18, null, null, 0);
          c.stateNode = b;
          c["return"] = a;
          a.child = c;
          od = a;
          pd = null;
          return !0;
        }
        return !1;
      default:
        return !1;
    }
  }
  function vd(a) {
    return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
  }
  function wd(a) {
    if (F) {
      var b = pd;
      if (b) {
        var c = b;
        if (!ud(a, b)) {
          if (vd(a)) throw Error(m(418));
          b = Nb(c);
          var d = od;
          b && ud(a, b) ? sd(d, c) : (a.flags = a.flags & -4097 | 2, F = !1, od = a);
        }
      } else {
        if (vd(a)) throw Error(m(418));
        a.flags = a.flags & -4097 | 2;
        F = !1;
        od = a;
      }
    }
  }
  function xd(a) {
    for (a = a["return"]; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) {
      a = a["return"];
    }
    od = a;
  }
  function yd(a) {
    if (!Va || a !== od) return !1;
    if (!F) return xd(a), F = !0, !1;
    if (3 !== a.tag && (5 !== a.tag || Zb(a.type) && !Na(a.type, a.memoizedProps))) {
      var b = pd;
      if (b) {
        if (vd(a)) throw zd(), Error(m(418));
        for (; b;) {
          sd(a, b), b = Nb(b);
        }
      }
    }
    xd(a);
    if (13 === a.tag) {
      if (!Va) throw Error(m(316));
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(m(317));
      pd = Ub(a);
    } else pd = od ? Nb(a.stateNode) : null;
    return !0;
  }
  function zd() {
    for (var a = pd; a;) {
      a = Nb(a);
    }
  }
  function Ad() {
    Va && (pd = od = null, qd = F = !1);
  }
  function Bd(a) {
    null === rd ? rd = [a] : rd.push(a);
  }
  var Cd = da.ReactCurrentBatchConfig;
  function Dd(a, b) {
    if (Vc(a, b)) return !0;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
    var c = Object.keys(a),
      d = Object.keys(b);
    if (c.length !== d.length) return !1;
    for (d = 0; d < c.length; d++) {
      var e = c[d];
      if (!fc.call(b, e) || !Vc(a[e], b[e])) return !1;
    }
    return !0;
  }
  function Ed(a) {
    switch (a.tag) {
      case 5:
        return cc(a.type);
      case 16:
        return cc("Lazy");
      case 13:
        return cc("Suspense");
      case 19:
        return cc("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = ec(a.type, !1), a;
      case 11:
        return a = ec(a.type.render, !1), a;
      case 1:
        return a = ec(a.type, !0), a;
      default:
        return "";
    }
  }
  function Fd(a, b) {
    if (a && a.defaultProps) {
      b = ca({}, b);
      a = a.defaultProps;
      for (var c in a) {
        void 0 === b[c] && (b[c] = a[c]);
      }
      return b;
    }
    return b;
  }
  var Gd = ic(null),
    Hd = null,
    Id = null,
    Jd = null;
  function Kd() {
    Jd = Id = Hd = null;
  }
  function Ld(a, b, c) {
    Sa ? (v(Gd, b._currentValue), b._currentValue = c) : (v(Gd, b._currentValue2), b._currentValue2 = c);
  }
  function Md(a) {
    var b = Gd.current;
    q(Gd);
    Sa ? a._currentValue = b : a._currentValue2 = b;
  }
  function Nd(a, b, c) {
    for (; null !== a;) {
      var d = a.alternate;
      (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
      if (a === c) break;
      a = a["return"];
    }
  }
  function Od(a, b) {
    Hd = a;
    Jd = Id = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (G = !0), a.firstContext = null);
  }
  function Pd(a) {
    var b = Sa ? a._currentValue : a._currentValue2;
    if (Jd !== a) if (a = {
      context: a,
      memoizedValue: b,
      next: null
    }, null === Id) {
      if (null === Hd) throw Error(m(308));
      Id = a;
      Hd.dependencies = {
        lanes: 0,
        firstContext: a
      };
    } else Id = Id.next = a;
    return b;
  }
  var Qd = null;
  function Rd(a) {
    null === Qd ? Qd = [a] : Qd.push(a);
  }
  function Sd(a, b, c, d) {
    var e = b.interleaved;
    null === e ? (c.next = c, Rd(b)) : (c.next = e.next, e.next = c);
    b.interleaved = c;
    return Td(a, d);
  }
  function Td(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;
    for (a = a["return"]; null !== a;) {
      a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a["return"];
    }
    return 3 === c.tag ? c.stateNode : null;
  }
  var Ud = !1;
  function Vd(a) {
    a.updateQueue = {
      baseState: a.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: 0
      },
      effects: null
    };
  }
  function Wd(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = {
      baseState: a.baseState,
      firstBaseUpdate: a.firstBaseUpdate,
      lastBaseUpdate: a.lastBaseUpdate,
      shared: a.shared,
      effects: a.effects
    });
  }
  function Xd(a, b) {
    return {
      eventTime: a,
      lane: b,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function Yd(a, b, c) {
    var d = a.updateQueue;
    if (null === d) return null;
    d = d.shared;
    if (0 !== (H & 2)) {
      var e = d.pending;
      null === e ? b.next = b : (b.next = e.next, e.next = b);
      d.pending = b;
      return Td(a, c);
    }
    e = d.interleaved;
    null === e ? (b.next = b, Rd(d)) : (b.next = e.next, e.next = b);
    d.interleaved = b;
    return Td(a, c);
  }
  function Zd(a, b, c) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Hc(a, c);
    }
  }
  function $d(a, b) {
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
  function ae(a, b, c, d) {
    var e = a.updateQueue;
    Ud = !1;
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
      null !== n && (n = n.updateQueue, h = n.lastBaseUpdate, h !== g && (null === h ? n.firstBaseUpdate = l : h.next = l, n.lastBaseUpdate = k));
    }
    if (null !== f) {
      var t = e.baseState;
      g = 0;
      n = l = k = null;
      h = f;
      do {
        var p = h.lane,
          B = h.eventTime;
        if ((d & p) === p) {
          null !== n && (n = n.next = {
            eventTime: B,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          a: {
            var w = a,
              Z = h;
            p = b;
            B = c;
            switch (Z.tag) {
              case 1:
                w = Z.payload;
                if ("function" === typeof w) {
                  t = w.call(B, t, p);
                  break a;
                }
                t = w;
                break a;
              case 3:
                w.flags = w.flags & -65537 | 128;
              case 0:
                w = Z.payload;
                p = "function" === typeof w ? w.call(B, t, p) : w;
                if (null === p || void 0 === p) break a;
                t = ca({}, t, p);
                break a;
              case 2:
                Ud = !0;
            }
          }
          null !== h.callback && 0 !== h.lane && (a.flags |= 64, p = e.effects, null === p ? e.effects = [h] : p.push(h));
        } else B = {
          eventTime: B,
          lane: p,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        }, null === n ? (l = n = B, k = t) : n = n.next = B, g |= p;
        h = h.next;
        if (null === h) if (h = e.shared.pending, null === h) break;else p = h, h = p.next, p.next = null, e.lastBaseUpdate = p, e.shared.pending = null;
      } while (1);
      null === n && (k = t);
      e.baseState = k;
      e.firstBaseUpdate = l;
      e.lastBaseUpdate = n;
      b = e.shared.interleaved;
      if (null !== b) {
        e = b;
        do {
          g |= e.lane, e = e.next;
        } while (e !== b);
      } else null === f && (e.shared.lanes = 0);
      be |= g;
      a.lanes = g;
      a.memoizedState = t;
    }
  }
  function ce(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a) for (b = 0; b < a.length; b++) {
      var d = a[b],
        e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e) throw Error(m(191, e));
        e.call(d);
      }
    }
  }
  var de = new aa.Component().refs;
  function ee(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : ca({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }
  var he = {
    isMounted: function isMounted(a) {
      return (a = a._reactInternals) ? wa(a) === a : !1;
    },
    enqueueSetState: function enqueueSetState(a, b, c) {
      a = a._reactInternals;
      var d = I(),
        e = fe(a),
        f = Xd(d, e);
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      b = Yd(a, f, e);
      null !== b && (ge(b, a, e, d), Zd(b, a, e));
    },
    enqueueReplaceState: function enqueueReplaceState(a, b, c) {
      a = a._reactInternals;
      var d = I(),
        e = fe(a),
        f = Xd(d, e);
      f.tag = 1;
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      b = Yd(a, f, e);
      null !== b && (ge(b, a, e, d), Zd(b, a, e));
    },
    enqueueForceUpdate: function enqueueForceUpdate(a, b) {
      a = a._reactInternals;
      var c = I(),
        d = fe(a),
        e = Xd(c, d);
      e.tag = 2;
      void 0 !== b && null !== b && (e.callback = b);
      b = Yd(a, e, d);
      null !== b && (ge(b, a, d, c), Zd(b, a, d));
    }
  };
  function ie(a, b, c, d, e, f, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Dd(c, d) || !Dd(e, f) : !0;
  }
  function je(a, b, c) {
    var d = !1,
      e = jc;
    var f = b.contextType;
    "object" === typeof f && null !== f ? f = Pd(f) : (e = A(b) ? kc : x.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? lc(a, e) : jc);
    b = new b(c, f);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = he;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
    return b;
  }
  function ke(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && he.enqueueReplaceState(b, b.state, null);
  }
  function le(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = de;
    Vd(a);
    var f = b.contextType;
    "object" === typeof f && null !== f ? e.context = Pd(f) : (f = A(b) ? kc : x.current, e.context = lc(a, f));
    e.state = a.memoizedState;
    f = b.getDerivedStateFromProps;
    "function" === typeof f && (ee(a, b, f, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && he.enqueueReplaceState(e, e.state, null), ae(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4194308);
  }
  function me(a, b, c) {
    a = c.ref;
    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;
        if (c) {
          if (1 !== c.tag) throw Error(m(309));
          var d = c.stateNode;
        }
        if (!d) throw Error(m(147, a));
        var e = d,
          f = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
        b = function b(a) {
          var b = e.refs;
          b === de && (b = e.refs = {});
          null === a ? delete b[f] : b[f] = a;
        };
        b._stringRef = f;
        return b;
      }
      if ("string" !== typeof a) throw Error(m(284));
      if (!c._owner) throw Error(m(290, a));
    }
    return a;
  }
  function ne(a, b) {
    a = Object.prototype.toString.call(b);
    throw Error(m(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
  }
  function oe(a) {
    var b = a._init;
    return b(a._payload);
  }
  function pe(a) {
    function b(b, c) {
      if (a) {
        var d = b.deletions;
        null === d ? (b.deletions = [c], b.flags |= 16) : d.push(c);
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
      a = qe(a, b);
      a.index = 0;
      a.sibling = null;
      return a;
    }
    function f(b, c, d) {
      b.index = d;
      if (!a) return b.flags |= 1048576, c;
      d = b.alternate;
      if (null !== d) return d = d.index, d < c ? (b.flags |= 2, c) : d;
      b.flags |= 2;
      return c;
    }
    function g(b) {
      a && null === b.alternate && (b.flags |= 2);
      return b;
    }
    function h(a, b, c, d) {
      if (null === b || 6 !== b.tag) return b = re(c, a.mode, d), b["return"] = a, b;
      b = e(b, c);
      b["return"] = a;
      return b;
    }
    function k(a, b, c, d) {
      var f = c.type;
      if (f === ha) return n(a, b, c.props.children, d, c.key);
      if (null !== b && (b.elementType === f || "object" === typeof f && null !== f && f.$$typeof === qa && oe(f) === b.type)) return d = e(b, c.props), d.ref = me(a, b, c), d["return"] = a, d;
      d = se(c.type, c.key, c.props, null, a.mode, d);
      d.ref = me(a, b, c);
      d["return"] = a;
      return d;
    }
    function l(a, b, c, d) {
      if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = te(c, a.mode, d), b["return"] = a, b;
      b = e(b, c.children || []);
      b["return"] = a;
      return b;
    }
    function n(a, b, c, d, f) {
      if (null === b || 7 !== b.tag) return b = ue(c, a.mode, d, f), b["return"] = a, b;
      b = e(b, c);
      b["return"] = a;
      return b;
    }
    function t(a, b, c) {
      if ("string" === typeof b && "" !== b || "number" === typeof b) return b = re("" + b, a.mode, c), b["return"] = a, b;
      if ("object" === typeof b && null !== b) {
        switch (b.$$typeof) {
          case ea:
            return c = se(b.type, b.key, b.props, null, a.mode, c), c.ref = me(a, null, b), c["return"] = a, c;
          case fa:
            return b = te(b, a.mode, c), b["return"] = a, b;
          case qa:
            var d = b._init;
            return t(a, d(b._payload), c);
        }
        if (Da(b) || ta(b)) return b = ue(b, a.mode, c, null), b["return"] = a, b;
        ne(a, b);
      }
      return null;
    }
    function p(a, b, c, d) {
      var e = null !== b ? b.key : null;
      if ("string" === typeof c && "" !== c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);
      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case ea:
            return c.key === e ? k(a, b, c, d) : null;
          case fa:
            return c.key === e ? l(a, b, c, d) : null;
          case qa:
            return e = c._init, p(a, b, e(c._payload), d);
        }
        if (Da(c) || ta(c)) return null !== e ? null : n(a, b, c, d, null);
        ne(a, c);
      }
      return null;
    }
    function B(a, b, c, d, e) {
      if ("string" === typeof d && "" !== d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);
      if ("object" === typeof d && null !== d) {
        switch (d.$$typeof) {
          case ea:
            return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);
          case fa:
            return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
          case qa:
            var f = d._init;
            return B(a, b, c, f(d._payload), e);
        }
        if (Da(d) || ta(d)) return a = a.get(c) || null, n(b, a, d, e, null);
        ne(b, d);
      }
      return null;
    }
    function w(e, g, h, k) {
      for (var l = null, n = null, r = g, u = g = 0, E = null; null !== r && u < h.length; u++) {
        r.index > u ? (E = r, r = null) : E = r.sibling;
        var y = p(e, r, h[u], k);
        if (null === y) {
          null === r && (r = E);
          break;
        }
        a && r && null === y.alternate && b(e, r);
        g = f(y, g, u);
        null === n ? l = y : n.sibling = y;
        n = y;
        r = E;
      }
      if (u === h.length) return c(e, r), F && kd(e, u), l;
      if (null === r) {
        for (; u < h.length; u++) {
          r = t(e, h[u], k), null !== r && (g = f(r, g, u), null === n ? l = r : n.sibling = r, n = r);
        }
        F && kd(e, u);
        return l;
      }
      for (r = d(e, r); u < h.length; u++) {
        E = B(r, e, u, h[u], k), null !== E && (a && null !== E.alternate && r["delete"](null === E.key ? u : E.key), g = f(E, g, u), null === n ? l = E : n.sibling = E, n = E);
      }
      a && r.forEach(function (a) {
        return b(e, a);
      });
      F && kd(e, u);
      return l;
    }
    function Z(e, g, h, k) {
      var l = ta(h);
      if ("function" !== typeof l) throw Error(m(150));
      h = l.call(h);
      if (null == h) throw Error(m(151));
      for (var n = l = null, r = g, u = g = 0, E = null, y = h.next(); null !== r && !y.done; u++, y = h.next()) {
        r.index > u ? (E = r, r = null) : E = r.sibling;
        var w = p(e, r, y.value, k);
        if (null === w) {
          null === r && (r = E);
          break;
        }
        a && r && null === w.alternate && b(e, r);
        g = f(w, g, u);
        null === n ? l = w : n.sibling = w;
        n = w;
        r = E;
      }
      if (y.done) return c(e, r), F && kd(e, u), l;
      if (null === r) {
        for (; !y.done; u++, y = h.next()) {
          y = t(e, y.value, k), null !== y && (g = f(y, g, u), null === n ? l = y : n.sibling = y, n = y);
        }
        F && kd(e, u);
        return l;
      }
      for (r = d(e, r); !y.done; u++, y = h.next()) {
        y = B(r, e, u, y.value, k), null !== y && (a && null !== y.alternate && r["delete"](null === y.key ? u : y.key), g = f(y, g, u), null === n ? l = y : n.sibling = y, n = y);
      }
      a && r.forEach(function (a) {
        return b(e, a);
      });
      F && kd(e, u);
      return l;
    }
    function za(a, d, f, h) {
      "object" === typeof f && null !== f && f.type === ha && null === f.key && (f = f.props.children);
      if ("object" === typeof f && null !== f) {
        switch (f.$$typeof) {
          case ea:
            a: {
              for (var k = f.key, l = d; null !== l;) {
                if (l.key === k) {
                  k = f.type;
                  if (k === ha) {
                    if (7 === l.tag) {
                      c(a, l.sibling);
                      d = e(l, f.props.children);
                      d["return"] = a;
                      a = d;
                      break a;
                    }
                  } else if (l.elementType === k || "object" === typeof k && null !== k && k.$$typeof === qa && oe(k) === l.type) {
                    c(a, l.sibling);
                    d = e(l, f.props);
                    d.ref = me(a, l, f);
                    d["return"] = a;
                    a = d;
                    break a;
                  }
                  c(a, l);
                  break;
                } else b(a, l);
                l = l.sibling;
              }
              f.type === ha ? (d = ue(f.props.children, a.mode, h, f.key), d["return"] = a, a = d) : (h = se(f.type, f.key, f.props, null, a.mode, h), h.ref = me(a, d, f), h["return"] = a, a = h);
            }
            return g(a);
          case fa:
            a: {
              for (l = f.key; null !== d;) {
                if (d.key === l) {
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
              d = te(f, a.mode, h);
              d["return"] = a;
              a = d;
            }
            return g(a);
          case qa:
            return l = f._init, za(a, d, l(f._payload), h);
        }
        if (Da(f)) return w(a, d, f, h);
        if (ta(f)) return Z(a, d, f, h);
        ne(a, f);
      }
      return "string" === typeof f && "" !== f || "number" === typeof f ? (f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d["return"] = a, a = d) : (c(a, d), d = re(f, a.mode, h), d["return"] = a, a = d), g(a)) : c(a, d);
    }
    return za;
  }
  var ve = pe(!0),
    we = pe(!1),
    xe = {},
    ye = ic(xe),
    ze = ic(xe),
    Ae = ic(xe);
  function Be(a) {
    if (a === xe) throw Error(m(174));
    return a;
  }
  function Ce(a, b) {
    v(Ae, b);
    v(ze, a);
    v(ye, xe);
    a = Fa(b);
    q(ye);
    v(ye, a);
  }
  function De() {
    q(ye);
    q(ze);
    q(Ae);
  }
  function Ee(a) {
    var b = Be(Ae.current),
      c = Be(ye.current);
    b = Ga(c, a.type, b);
    c !== b && (v(ze, a), v(ye, b));
  }
  function Fe(a) {
    ze.current === a && (q(ye), q(ze));
  }
  var J = ic(0);
  function Ge(a) {
    for (var b = a; null !== b;) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || Jb(c) || Kb(c))) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 128)) return b;
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
  var He = [];
  function Ie() {
    for (var a = 0; a < He.length; a++) {
      var b = He[a];
      Sa ? b._workInProgressVersionPrimary = null : b._workInProgressVersionSecondary = null;
    }
    He.length = 0;
  }
  var Je = da.ReactCurrentDispatcher,
    Ke = da.ReactCurrentBatchConfig,
    Le = 0,
    K = null,
    L = null,
    M = null,
    Me = !1,
    Ne = !1,
    Oe = 0,
    Pe = 0;
  function N() {
    throw Error(m(321));
  }
  function Qe(a, b) {
    if (null === b) return !1;
    for (var c = 0; c < b.length && c < a.length; c++) {
      if (!Vc(a[c], b[c])) return !1;
    }
    return !0;
  }
  function Re(a, b, c, d, e, f) {
    Le = f;
    K = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Je.current = null === a || null === a.memoizedState ? Se : Te;
    a = c(d, e);
    if (Ne) {
      f = 0;
      do {
        Ne = !1;
        Oe = 0;
        if (25 <= f) throw Error(m(301));
        f += 1;
        M = L = null;
        b.updateQueue = null;
        Je.current = Ue;
        a = c(d, e);
      } while (Ne);
    }
    Je.current = Ve;
    b = null !== L && null !== L.next;
    Le = 0;
    M = L = K = null;
    Me = !1;
    if (b) throw Error(m(300));
    return a;
  }
  function We() {
    var a = 0 !== Oe;
    Oe = 0;
    return a;
  }
  function Xe() {
    var a = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    null === M ? K.memoizedState = M = a : M = M.next = a;
    return M;
  }
  function Ye() {
    if (null === L) {
      var a = K.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = L.next;
    var b = null === M ? K.memoizedState : M.next;
    if (null !== b) M = b, L = a;else {
      if (null === a) throw Error(m(310));
      L = a;
      a = {
        memoizedState: L.memoizedState,
        baseState: L.baseState,
        baseQueue: L.baseQueue,
        queue: L.queue,
        next: null
      };
      null === M ? K.memoizedState = M = a : M = M.next = a;
    }
    return M;
  }
  function Ze(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function $e(a) {
    var b = Ye(),
      c = b.queue;
    if (null === c) throw Error(m(311));
    c.lastRenderedReducer = a;
    var d = L,
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
      f = e.next;
      d = d.baseState;
      var h = g = null,
        k = null,
        l = f;
      do {
        var n = l.lane;
        if ((Le & n) === n) null !== k && (k = k.next = {
          lane: 0,
          action: l.action,
          hasEagerState: l.hasEagerState,
          eagerState: l.eagerState,
          next: null
        }), d = l.hasEagerState ? l.eagerState : a(d, l.action);else {
          var t = {
            lane: n,
            action: l.action,
            hasEagerState: l.hasEagerState,
            eagerState: l.eagerState,
            next: null
          };
          null === k ? (h = k = t, g = d) : k = k.next = t;
          K.lanes |= n;
          be |= n;
        }
        l = l.next;
      } while (null !== l && l !== f);
      null === k ? g = d : k.next = h;
      Vc(d, b.memoizedState) || (G = !0);
      b.memoizedState = d;
      b.baseState = g;
      b.baseQueue = k;
      c.lastRenderedState = d;
    }
    a = c.interleaved;
    if (null !== a) {
      e = a;
      do {
        f = e.lane, K.lanes |= f, be |= f, e = e.next;
      } while (e !== a);
    } else null === e && (c.lanes = 0);
    return [b.memoizedState, c.dispatch];
  }
  function af(a) {
    var b = Ye(),
      c = b.queue;
    if (null === c) throw Error(m(311));
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
      Vc(f, b.memoizedState) || (G = !0);
      b.memoizedState = f;
      null === b.baseQueue && (b.baseState = f);
      c.lastRenderedState = f;
    }
    return [f, d];
  }
  function bf() {}
  function cf(a, b) {
    var c = K,
      d = Ye(),
      e = b(),
      f = !Vc(d.memoizedState, e);
    f && (d.memoizedState = e, G = !0);
    d = d.queue;
    df(ef.bind(null, c, d, a), [a]);
    if (d.getSnapshot !== b || f || null !== M && M.memoizedState.tag & 1) {
      c.flags |= 2048;
      ff(9, gf.bind(null, c, d, e, b), void 0, null);
      if (null === O) throw Error(m(349));
      0 !== (Le & 30) || hf(c, b, e);
    }
    return e;
  }
  function hf(a, b, c) {
    a.flags |= 16384;
    a = {
      getSnapshot: b,
      value: c
    };
    b = K.updateQueue;
    null === b ? (b = {
      lastEffect: null,
      stores: null
    }, K.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
  }
  function gf(a, b, c, d) {
    b.value = c;
    b.getSnapshot = d;
    jf(b) && kf(a);
  }
  function ef(a, b, c) {
    return c(function () {
      jf(b) && kf(a);
    });
  }
  function jf(a) {
    var b = a.getSnapshot;
    a = a.value;
    try {
      var c = b();
      return !Vc(a, c);
    } catch (d) {
      return !0;
    }
  }
  function kf(a) {
    var b = Td(a, 1);
    null !== b && ge(b, a, 1, -1);
  }
  function lf(a) {
    var b = Xe();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ze,
      lastRenderedState: a
    };
    b.queue = a;
    a = a.dispatch = mf.bind(null, K, a);
    return [b.memoizedState, a];
  }
  function ff(a, b, c, d) {
    a = {
      tag: a,
      create: b,
      destroy: c,
      deps: d,
      next: null
    };
    b = K.updateQueue;
    null === b ? (b = {
      lastEffect: null,
      stores: null
    }, K.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }
  function nf() {
    return Ye().memoizedState;
  }
  function of(a, b, c, d) {
    var e = Xe();
    K.flags |= a;
    e.memoizedState = ff(1 | b, c, void 0, void 0 === d ? null : d);
  }
  function pf(a, b, c, d) {
    var e = Ye();
    d = void 0 === d ? null : d;
    var f = void 0;
    if (null !== L) {
      var g = L.memoizedState;
      f = g.destroy;
      if (null !== d && Qe(d, g.deps)) {
        e.memoizedState = ff(b, c, f, d);
        return;
      }
    }
    K.flags |= a;
    e.memoizedState = ff(1 | b, c, f, d);
  }
  function qf(a, b) {
    return of(8390656, 8, a, b);
  }
  function df(a, b) {
    return pf(2048, 8, a, b);
  }
  function rf(a, b) {
    return pf(4, 2, a, b);
  }
  function sf(a, b) {
    return pf(4, 4, a, b);
  }
  function tf(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function () {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
      b.current = null;
    };
  }
  function uf(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return pf(4, 4, tf.bind(null, b, a), c);
  }
  function vf() {}
  function wf(a, b) {
    var c = Ye();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Qe(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }
  function xf(a, b) {
    var c = Ye();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Qe(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }
  function yf(a, b, c) {
    if (0 === (Le & 21)) return a.baseState && (a.baseState = !1, G = !0), a.memoizedState = c;
    Vc(c, b) || (c = Dc(), K.lanes |= c, be |= c, a.baseState = !0);
    return b;
  }
  function zf(a, b) {
    var c = C;
    C = 0 !== c && 4 > c ? c : 4;
    a(!0);
    var d = Ke.transition;
    Ke.transition = {};
    try {
      a(!1), b();
    } finally {
      C = c, Ke.transition = d;
    }
  }
  function Af() {
    return Ye().memoizedState;
  }
  function Bf(a, b, c) {
    var d = fe(a);
    c = {
      lane: d,
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Cf(a)) Df(b, c);else if (c = Sd(a, b, c, d), null !== c) {
      var e = I();
      ge(c, a, d, e);
      Ef(c, b, d);
    }
  }
  function mf(a, b, c) {
    var d = fe(a),
      e = {
        lane: d,
        action: c,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
    if (Cf(a)) Df(b, e);else {
      var f = a.alternate;
      if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
        var g = b.lastRenderedState,
          h = f(g, c);
        e.hasEagerState = !0;
        e.eagerState = h;
        if (Vc(h, g)) {
          var k = b.interleaved;
          null === k ? (e.next = e, Rd(b)) : (e.next = k.next, k.next = e);
          b.interleaved = e;
          return;
        }
      } catch (l) {} finally {}
      c = Sd(a, b, e, d);
      null !== c && (e = I(), ge(c, a, d, e), Ef(c, b, d));
    }
  }
  function Cf(a) {
    var b = a.alternate;
    return a === K || null !== b && b === K;
  }
  function Df(a, b) {
    Ne = Me = !0;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
  function Ef(a, b, c) {
    if (0 !== (c & 4194240)) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Hc(a, c);
    }
  }
  var Ve = {
      readContext: Pd,
      useCallback: N,
      useContext: N,
      useEffect: N,
      useImperativeHandle: N,
      useInsertionEffect: N,
      useLayoutEffect: N,
      useMemo: N,
      useReducer: N,
      useRef: N,
      useState: N,
      useDebugValue: N,
      useDeferredValue: N,
      useTransition: N,
      useMutableSource: N,
      useSyncExternalStore: N,
      useId: N,
      unstable_isNewReconciler: !1
    },
    Se = {
      readContext: Pd,
      useCallback: function useCallback(a, b) {
        Xe().memoizedState = [a, void 0 === b ? null : b];
        return a;
      },
      useContext: Pd,
      useEffect: qf,
      useImperativeHandle: function useImperativeHandle(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return of(4194308, 4, tf.bind(null, b, a), c);
      },
      useLayoutEffect: function useLayoutEffect(a, b) {
        return of(4194308, 4, a, b);
      },
      useInsertionEffect: function useInsertionEffect(a, b) {
        return of(4, 2, a, b);
      },
      useMemo: function useMemo(a, b) {
        var c = Xe();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      },
      useReducer: function useReducer(a, b, c) {
        var d = Xe();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: a,
          lastRenderedState: b
        };
        d.queue = a;
        a = a.dispatch = Bf.bind(null, K, a);
        return [d.memoizedState, a];
      },
      useRef: function useRef(a) {
        var b = Xe();
        a = {
          current: a
        };
        return b.memoizedState = a;
      },
      useState: lf,
      useDebugValue: vf,
      useDeferredValue: function useDeferredValue(a) {
        return Xe().memoizedState = a;
      },
      useTransition: function useTransition() {
        var a = lf(!1),
          b = a[0];
        a = zf.bind(null, a[1]);
        Xe().memoizedState = a;
        return [b, a];
      },
      useMutableSource: function useMutableSource() {},
      useSyncExternalStore: function useSyncExternalStore(a, b, c) {
        var d = K,
          e = Xe();
        if (F) {
          if (void 0 === c) throw Error(m(407));
          c = c();
        } else {
          c = b();
          if (null === O) throw Error(m(349));
          0 !== (Le & 30) || hf(d, b, c);
        }
        e.memoizedState = c;
        var f = {
          value: c,
          getSnapshot: b
        };
        e.queue = f;
        qf(ef.bind(null, d, f, a), [a]);
        d.flags |= 2048;
        ff(9, gf.bind(null, d, f, c, b), void 0, null);
        return c;
      },
      useId: function useId() {
        var a = Xe(),
          b = O.identifierPrefix;
        if (F) {
          var c = jd;
          var d = id;
          c = (d & ~(1 << 32 - tc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Oe++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else c = Pe++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      },
      unstable_isNewReconciler: !1
    },
    Te = {
      readContext: Pd,
      useCallback: wf,
      useContext: Pd,
      useEffect: df,
      useImperativeHandle: uf,
      useInsertionEffect: rf,
      useLayoutEffect: sf,
      useMemo: xf,
      useReducer: $e,
      useRef: nf,
      useState: function useState() {
        return $e(Ze);
      },
      useDebugValue: vf,
      useDeferredValue: function useDeferredValue(a) {
        var b = Ye();
        return yf(b, L.memoizedState, a);
      },
      useTransition: function useTransition() {
        var a = $e(Ze)[0],
          b = Ye().memoizedState;
        return [a, b];
      },
      useMutableSource: bf,
      useSyncExternalStore: cf,
      useId: Af,
      unstable_isNewReconciler: !1
    },
    Ue = {
      readContext: Pd,
      useCallback: wf,
      useContext: Pd,
      useEffect: df,
      useImperativeHandle: uf,
      useInsertionEffect: rf,
      useLayoutEffect: sf,
      useMemo: xf,
      useReducer: af,
      useRef: nf,
      useState: function useState() {
        return af(Ze);
      },
      useDebugValue: vf,
      useDeferredValue: function useDeferredValue(a) {
        var b = Ye();
        return null === L ? b.memoizedState = a : yf(b, L.memoizedState, a);
      },
      useTransition: function useTransition() {
        var a = af(Ze)[0],
          b = Ye().memoizedState;
        return [a, b];
      },
      useMutableSource: bf,
      useSyncExternalStore: cf,
      useId: Af,
      unstable_isNewReconciler: !1
    };
  function Ff(a, b) {
    try {
      var c = "",
        d = b;
      do {
        c += Ed(d), d = d["return"];
      } while (d);
      var e = c;
    } catch (f) {
      e = "\nError generating stack: " + f.message + "\n" + f.stack;
    }
    return {
      value: a,
      source: b,
      stack: e,
      digest: null
    };
  }
  function Gf(a, b, c) {
    return {
      value: a,
      source: null,
      stack: null != c ? c : null,
      digest: null != b ? b : null
    };
  }
  function Hf(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function () {
        throw c;
      });
    }
  }
  var If = "function" === typeof WeakMap ? WeakMap : Map;
  function Jf(a, b, c) {
    c = Xd(-1, c);
    c.tag = 3;
    c.payload = {
      element: null
    };
    var d = b.value;
    c.callback = function () {
      Kf || (Kf = !0, Lf = d);
      Hf(a, b);
    };
    return c;
  }
  function Mf(a, b, c) {
    c = Xd(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;
    if ("function" === typeof d) {
      var e = b.value;
      c.payload = function () {
        return d(e);
      };
      c.callback = function () {
        Hf(a, b);
      };
    }
    var f = a.stateNode;
    null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
      Hf(a, b);
      "function" !== typeof d && (null === Nf ? Nf = new Set([this]) : Nf.add(this));
      var c = b.stack;
      this.componentDidCatch(b.value, {
        componentStack: null !== c ? c : ""
      });
    });
    return c;
  }
  function Of(a, b, c) {
    var d = a.pingCache;
    if (null === d) {
      d = a.pingCache = new If();
      var e = new Set();
      d.set(b, e);
    } else e = d.get(b), void 0 === e && (e = new Set(), d.set(b, e));
    e.has(c) || (e.add(c), a = Pf.bind(null, a, b, c), b.then(a, a));
  }
  function Qf(a) {
    do {
      var b;
      if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;
      if (b) return a;
      a = a["return"];
    } while (null !== a);
    return null;
  }
  function Rf(a, b, c, d, e) {
    if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = Xd(-1, 1), b.tag = 2, Yd(c, b, 1))), c.lanes |= 1), a;
    a.flags |= 65536;
    a.lanes = e;
    return a;
  }
  var Sf = da.ReactCurrentOwner,
    G = !1;
  function P(a, b, c, d) {
    b.child = null === a ? we(b, null, c, d) : ve(b, a.child, c, d);
  }
  function Tf(a, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    Od(b, e);
    d = Re(a, b, c, d, f, e);
    c = We();
    if (null !== a && !G) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Uf(a, b, e);
    F && c && md(b);
    b.flags |= 1;
    P(a, b, d, e);
    return b.child;
  }
  function Vf(a, b, c, d, e) {
    if (null === a) {
      var f = c.type;
      if ("function" === typeof f && !Wf(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, Xf(a, b, f, d, e);
      a = se(c.type, null, d, b, b.mode, e);
      a.ref = b.ref;
      a["return"] = b;
      return b.child = a;
    }
    f = a.child;
    if (0 === (a.lanes & e)) {
      var g = f.memoizedProps;
      c = c.compare;
      c = null !== c ? c : Dd;
      if (c(g, d) && a.ref === b.ref) return Uf(a, b, e);
    }
    b.flags |= 1;
    a = qe(f, d);
    a.ref = b.ref;
    a["return"] = b;
    return b.child = a;
  }
  function Xf(a, b, c, d, e) {
    if (null !== a) {
      var f = a.memoizedProps;
      if (Dd(f, d) && a.ref === b.ref) if (G = !1, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (G = !0);else return b.lanes = a.lanes, Uf(a, b, e);
    }
    return Yf(a, b, c, d, e);
  }
  function Zf(a, b, c) {
    var d = b.pendingProps,
      e = d.children,
      f = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode) {
      if (0 === (b.mode & 1)) b.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, v($f, ag), ag |= c;else {
        if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
          baseLanes: a,
          cachePool: null,
          transitions: null
        }, b.updateQueue = null, v($f, ag), ag |= a, null;
        b.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        };
        d = null !== f ? f.baseLanes : c;
        v($f, ag);
        ag |= d;
      }
    } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, v($f, ag), ag |= d;
    P(a, b, e, c);
    return b.child;
  }
  function bg(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
  }
  function Yf(a, b, c, d, e) {
    var f = A(c) ? kc : x.current;
    f = lc(b, f);
    Od(b, e);
    c = Re(a, b, c, d, f, e);
    d = We();
    if (null !== a && !G) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Uf(a, b, e);
    F && d && md(b);
    b.flags |= 1;
    P(a, b, c, e);
    return b.child;
  }
  function cg(a, b, c, d, e) {
    if (A(c)) {
      var f = !0;
      pc(b);
    } else f = !1;
    Od(b, e);
    if (null === b.stateNode) dg(a, b), je(b, c, d), le(b, c, d, e), d = !0;else if (null === a) {
      var g = b.stateNode,
        h = b.memoizedProps;
      g.props = h;
      var k = g.context,
        l = c.contextType;
      "object" === typeof l && null !== l ? l = Pd(l) : (l = A(c) ? kc : x.current, l = lc(b, l));
      var n = c.getDerivedStateFromProps,
        t = "function" === typeof n || "function" === typeof g.getSnapshotBeforeUpdate;
      t || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && ke(b, g, d, l);
      Ud = !1;
      var p = b.memoizedState;
      g.state = p;
      ae(b, d, g, e);
      k = b.memoizedState;
      h !== d || p !== k || z.current || Ud ? ("function" === typeof n && (ee(b, c, n, d), k = b.memoizedState), (h = Ud || ie(b, c, h, d, p, k, l)) ? (t || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = !1);
    } else {
      g = b.stateNode;
      Wd(a, b);
      h = b.memoizedProps;
      l = b.type === b.elementType ? h : Fd(b.type, h);
      g.props = l;
      t = b.pendingProps;
      p = g.context;
      k = c.contextType;
      "object" === typeof k && null !== k ? k = Pd(k) : (k = A(c) ? kc : x.current, k = lc(b, k));
      var B = c.getDerivedStateFromProps;
      (n = "function" === typeof B || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== t || p !== k) && ke(b, g, d, k);
      Ud = !1;
      p = b.memoizedState;
      g.state = p;
      ae(b, d, g, e);
      var w = b.memoizedState;
      h !== t || p !== w || z.current || Ud ? ("function" === typeof B && (ee(b, c, B, d), w = b.memoizedState), (l = Ud || ie(b, c, l, d, p, w, k) || !1) ? (n || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, w, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, w, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = w), g.props = d, g.state = w, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 1024), d = !1);
    }
    return eg(a, b, c, d, f, e);
  }
  function eg(a, b, c, d, e, f) {
    bg(a, b);
    var g = 0 !== (b.flags & 128);
    if (!d && !g) return e && rc(b, c, !1), Uf(a, b, f);
    d = b.stateNode;
    Sf.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = ve(b, a.child, null, f), b.child = ve(b, null, h, f)) : P(a, b, h, f);
    b.memoizedState = d.state;
    e && rc(b, c, !0);
    return b.child;
  }
  function fg(a) {
    var b = a.stateNode;
    b.pendingContext ? nc(a, b.pendingContext, b.pendingContext !== b.context) : b.context && nc(a, b.context, !1);
    Ce(a, b.containerInfo);
  }
  function gg(a, b, c, d, e) {
    Ad();
    Bd(e);
    b.flags |= 256;
    P(a, b, c, d);
    return b.child;
  }
  var hg = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
  };
  function ig(a) {
    return {
      baseLanes: a,
      cachePool: null,
      transitions: null
    };
  }
  function jg(a, b, c) {
    var d = b.pendingProps,
      e = J.current,
      f = !1,
      g = 0 !== (b.flags & 128),
      h;
    (h = g) || (h = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
    if (h) f = !0, b.flags &= -129;else if (null === a || null !== a.memoizedState) e |= 1;
    v(J, e & 1);
    if (null === a) {
      wd(b);
      a = b.memoizedState;
      if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : Kb(a) ? b.lanes = 8 : b.lanes = 1073741824, null;
      g = d.children;
      a = d.fallback;
      return f ? (d = b.mode, f = b.child, g = {
        mode: "hidden",
        children: g
      }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = kg(g, d, 0, null), a = ue(a, d, c, null), f["return"] = b, a["return"] = b, f.sibling = a, b.child = f, b.child.memoizedState = ig(c), b.memoizedState = hg, a) : lg(b, g);
    }
    e = a.memoizedState;
    if (null !== e && (h = e.dehydrated, null !== h)) return mg(a, b, g, d, h, e, c);
    if (f) {
      f = d.fallback;
      g = b.mode;
      e = a.child;
      h = e.sibling;
      var k = {
        mode: "hidden",
        children: d.children
      };
      0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = qe(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
      null !== h ? f = qe(h, f) : (f = ue(f, g, c, null), f.flags |= 2);
      f["return"] = b;
      d["return"] = b;
      d.sibling = f;
      b.child = d;
      d = f;
      f = b.child;
      g = a.child.memoizedState;
      g = null === g ? ig(c) : {
        baseLanes: g.baseLanes | c,
        cachePool: null,
        transitions: g.transitions
      };
      f.memoizedState = g;
      f.childLanes = a.childLanes & ~c;
      b.memoizedState = hg;
      return d;
    }
    f = a.child;
    a = f.sibling;
    d = qe(f, {
      mode: "visible",
      children: d.children
    });
    0 === (b.mode & 1) && (d.lanes = c);
    d["return"] = b;
    d.sibling = null;
    null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
    b.child = d;
    b.memoizedState = null;
    return d;
  }
  function lg(a, b) {
    b = kg({
      mode: "visible",
      children: b
    }, a.mode, 0, null);
    b["return"] = a;
    return a.child = b;
  }
  function ng(a, b, c, d) {
    null !== d && Bd(d);
    ve(b, a.child, null, c);
    a = lg(b, b.pendingProps.children);
    a.flags |= 2;
    b.memoizedState = null;
    return a;
  }
  function mg(a, b, c, d, e, f, g) {
    if (c) {
      if (b.flags & 256) return b.flags &= -257, d = Gf(Error(m(422))), ng(a, b, g, d);
      if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
      f = d.fallback;
      e = b.mode;
      d = kg({
        mode: "visible",
        children: d.children
      }, e, 0, null);
      f = ue(f, e, g, null);
      f.flags |= 2;
      d["return"] = b;
      f["return"] = b;
      d.sibling = f;
      b.child = d;
      0 !== (b.mode & 1) && ve(b, a.child, null, g);
      b.child.memoizedState = ig(g);
      b.memoizedState = hg;
      return f;
    }
    if (0 === (b.mode & 1)) return ng(a, b, g, null);
    if (Kb(e)) return d = Lb(e).digest, f = Error(m(419)), d = Gf(f, d, void 0), ng(a, b, g, d);
    c = 0 !== (g & a.childLanes);
    if (G || c) {
      d = O;
      if (null !== d) {
        switch (g & -g) {
          case 4:
            e = 2;
            break;
          case 16:
            e = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            e = 32;
            break;
          case 536870912:
            e = 268435456;
            break;
          default:
            e = 0;
        }
        e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
        0 !== e && e !== f.retryLane && (f.retryLane = e, Td(a, e), ge(d, a, e, -1));
      }
      og();
      d = Gf(Error(m(421)));
      return ng(a, b, g, d);
    }
    if (Jb(e)) return b.flags |= 128, b.child = a.child, b = pg.bind(null, a), Mb(e, b), null;
    a = f.treeContext;
    Va && (pd = Qb(e), od = b, F = !0, rd = null, qd = !1, null !== a && (fd[gd++] = id, fd[gd++] = jd, fd[gd++] = hd, id = a.id, jd = a.overflow, hd = b));
    b = lg(b, d.children);
    b.flags |= 4096;
    return b;
  }
  function qg(a, b, c) {
    a.lanes |= b;
    var d = a.alternate;
    null !== d && (d.lanes |= b);
    Nd(a["return"], b, c);
  }
  function rg(a, b, c, d, e) {
    var f = a.memoizedState;
    null === f ? a.memoizedState = {
      isBackwards: b,
      rendering: null,
      renderingStartTime: 0,
      last: d,
      tail: c,
      tailMode: e
    } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
  }
  function sg(a, b, c) {
    var d = b.pendingProps,
      e = d.revealOrder,
      f = d.tail;
    P(a, b, d.children, c);
    d = J.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;else {
      if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a;) {
        if (13 === a.tag) null !== a.memoizedState && qg(a, c, b);else if (19 === a.tag) qg(a, c, b);else if (null !== a.child) {
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
    v(J, d);
    if (0 === (b.mode & 1)) b.memoizedState = null;else switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c;) {
          a = c.alternate, null !== a && null === Ge(a) && (e = c), c = c.sibling;
        }
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        rg(b, !1, e, c, f);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e;) {
          a = e.alternate;
          if (null !== a && null === Ge(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        rg(b, !0, c, null, f);
        break;
      case "together":
        rg(b, !1, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
    return b.child;
  }
  function dg(a, b) {
    0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Uf(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    be |= b.lanes;
    if (0 === (c & b.childLanes)) return null;
    if (null !== a && b.child !== a.child) throw Error(m(153));
    if (null !== b.child) {
      a = b.child;
      c = qe(a, a.pendingProps);
      b.child = c;
      for (c["return"] = b; null !== a.sibling;) {
        a = a.sibling, c = c.sibling = qe(a, a.pendingProps), c["return"] = b;
      }
      c.sibling = null;
    }
    return b.child;
  }
  function tg(a, b, c) {
    switch (b.tag) {
      case 3:
        fg(b);
        Ad();
        break;
      case 5:
        Ee(b);
        break;
      case 1:
        A(b.type) && pc(b);
        break;
      case 4:
        Ce(b, b.stateNode.containerInfo);
        break;
      case 10:
        Ld(b, b.type._context, b.memoizedProps.value);
        break;
      case 13:
        var d = b.memoizedState;
        if (null !== d) {
          if (null !== d.dehydrated) return v(J, J.current & 1), b.flags |= 128, null;
          if (0 !== (c & b.child.childLanes)) return jg(a, b, c);
          v(J, J.current & 1);
          a = Uf(a, b, c);
          return null !== a ? a.sibling : null;
        }
        v(J, J.current & 1);
        break;
      case 19:
        d = 0 !== (c & b.childLanes);
        if (0 !== (a.flags & 128)) {
          if (d) return sg(a, b, c);
          b.flags |= 128;
        }
        var e = b.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        v(J, J.current);
        if (d) break;else return null;
      case 22:
      case 23:
        return b.lanes = 0, Zf(a, b, c);
    }
    return Uf(a, b, c);
  }
  function ug(a) {
    a.flags |= 4;
  }
  function vg(a, b) {
    if (null !== a && a.child === b.child) return !0;
    if (0 !== (b.flags & 16)) return !1;
    for (a = b.child; null !== a;) {
      if (0 !== (a.flags & 12854) || 0 !== (a.subtreeFlags & 12854)) return !1;
      a = a.sibling;
    }
    return !0;
  }
  var _wg, xg, yg, zg;
  if (Ta) _wg = function wg(a, b) {
    for (var c = b.child; null !== c;) {
      if (5 === c.tag || 6 === c.tag) Ka(a, c.stateNode);else if (4 !== c.tag && null !== c.child) {
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
  }, xg = function xg() {}, yg = function yg(a, b, c, d, e) {
    a = a.memoizedProps;
    if (a !== d) {
      var f = b.stateNode,
        g = Be(ye.current);
      c = Ma(f, c, a, d, e, g);
      (b.updateQueue = c) && ug(b);
    }
  }, zg = function zg(a, b, c, d) {
    c !== d && ug(b);
  };else if (Ua) {
    _wg = function wg(a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = Eb(f, e.type, e.memoizedProps, e));
          Ka(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = Fb(f, e.memoizedProps, e)), Ka(a, f);else if (4 !== e.tag) if (22 === e.tag && null !== e.memoizedState) f = e.child, null !== f && (f["return"] = e), _wg(a, e, !0, !0);else if (null !== e.child) {
          e.child["return"] = e;
          e = e.child;
          continue;
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
    var Ag = function Ag(a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = Eb(f, e.type, e.memoizedProps, e));
          Ab(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = Fb(f, e.memoizedProps, e)), Ab(a, f);else if (4 !== e.tag) if (22 === e.tag && null !== e.memoizedState) f = e.child, null !== f && (f["return"] = e), Ag(a, e, !0, !0);else if (null !== e.child) {
          e.child["return"] = e;
          e = e.child;
          continue;
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
    xg = function xg(a, b) {
      var c = b.stateNode;
      if (!vg(a, b)) {
        a = c.containerInfo;
        var d = zb(a);
        Ag(d, b, !1, !1);
        c.pendingChildren = d;
        ug(b);
        Bb(a, d);
      }
    };
    yg = function yg(a, b, c, d, e) {
      var f = a.stateNode,
        g = a.memoizedProps;
      if ((a = vg(a, b)) && g === d) b.stateNode = f;else {
        var h = b.stateNode,
          k = Be(ye.current),
          l = null;
        g !== d && (l = Ma(h, c, g, d, e, k));
        a && null === l ? b.stateNode = f : (f = yb(f, l, c, g, d, b, a, h), La(f, c, d, e, k) && ug(b), b.stateNode = f, a ? ug(b) : _wg(f, b, !1, !1));
      }
    };
    zg = function zg(a, b, c, d) {
      c !== d ? (a = Be(Ae.current), c = Be(ye.current), b.stateNode = Oa(d, a, c, b), ug(b)) : b.stateNode = a.stateNode;
    };
  } else xg = function xg() {}, yg = function yg() {}, zg = function zg() {};
  function Bg(a, b) {
    if (!F) switch (a.tailMode) {
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
  function Q(a) {
    var b = null !== a.alternate && a.alternate.child === a.child,
      c = 0,
      d = 0;
    if (b) for (var e = a.child; null !== e;) {
      c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e["return"] = a, e = e.sibling;
    } else for (e = a.child; null !== e;) {
      c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e["return"] = a, e = e.sibling;
    }
    a.subtreeFlags |= d;
    a.childLanes = c;
    return b;
  }
  function Cg(a, b, c) {
    var d = b.pendingProps;
    nd(b);
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
        return Q(b), null;
      case 1:
        return A(b.type) && mc(), Q(b), null;
      case 3:
        c = b.stateNode;
        De();
        q(z);
        q(x);
        Ie();
        c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null);
        if (null === a || null === a.child) yd(b) ? ug(b) : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== rd && (Dg(rd), rd = null));
        xg(a, b);
        Q(b);
        return null;
      case 5:
        Fe(b);
        c = Be(Ae.current);
        var e = b.type;
        if (null !== a && null != b.stateNode) yg(a, b, e, d, c), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);else {
          if (!d) {
            if (null === b.stateNode) throw Error(m(166));
            Q(b);
            return null;
          }
          a = Be(ye.current);
          if (yd(b)) {
            if (!Va) throw Error(m(175));
            a = Rb(b.stateNode, b.type, b.memoizedProps, c, a, b, !qd);
            b.updateQueue = a;
            null !== a && ug(b);
          } else {
            var f = Ja(e, d, c, a, b);
            _wg(f, b, !1, !1);
            b.stateNode = f;
            La(f, e, d, c, a) && ug(b);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        Q(b);
        return null;
      case 6:
        if (a && null != b.stateNode) zg(a, b, a.memoizedProps, d);else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(m(166));
          a = Be(Ae.current);
          c = Be(ye.current);
          if (yd(b)) {
            if (!Va) throw Error(m(176));
            a = b.stateNode;
            c = b.memoizedProps;
            if (d = Sb(a, c, b, !qd)) if (e = od, null !== e) switch (e.tag) {
              case 3:
                $b(e.stateNode.containerInfo, a, c, 0 !== (e.mode & 1));
                break;
              case 5:
                ac(e.type, e.memoizedProps, e.stateNode, a, c, 0 !== (e.mode & 1));
            }
            d && ug(b);
          } else b.stateNode = Oa(d, a, c, b);
        }
        Q(b);
        return null;
      case 13:
        q(J);
        d = b.memoizedState;
        if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
          if (F && null !== pd && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) zd(), Ad(), b.flags |= 98560, e = !1;else if (e = yd(b), null !== d && null !== d.dehydrated) {
            if (null === a) {
              if (!e) throw Error(m(318));
              if (!Va) throw Error(m(344));
              e = b.memoizedState;
              e = null !== e ? e.dehydrated : null;
              if (!e) throw Error(m(317));
              Tb(e, b);
            } else Ad(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            Q(b);
            e = !1;
          } else null !== rd && (Dg(rd), rd = null), e = !0;
          if (!e) return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128)) return b.lanes = c, b;
        c = null !== d;
        c !== (null !== a && null !== a.memoizedState) && c && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (J.current & 1) ? 0 === R && (R = 3) : og()));
        null !== b.updateQueue && (b.flags |= 4);
        Q(b);
        return null;
      case 4:
        return De(), xg(a, b), null === a && Xa(b.stateNode.containerInfo), Q(b), null;
      case 10:
        return Md(b.type._context), Q(b), null;
      case 17:
        return A(b.type) && mc(), Q(b), null;
      case 19:
        q(J);
        e = b.memoizedState;
        if (null === e) return Q(b), null;
        d = 0 !== (b.flags & 128);
        f = e.rendering;
        if (null === f) {
          if (d) Bg(e, !1);else {
            if (0 !== R || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a;) {
              f = Ge(a);
              if (null !== f) {
                b.flags |= 128;
                Bg(e, !1);
                a = f.updateQueue;
                null !== a && (b.updateQueue = a, b.flags |= 4);
                b.subtreeFlags = 0;
                a = c;
                for (c = b.child; null !== c;) {
                  d = c, e = a, d.flags &= 14680066, f = d.alternate, null === f ? (d.childLanes = 0, d.lanes = e, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = f.childLanes, d.lanes = f.lanes, d.child = f.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = f.memoizedProps, d.memoizedState = f.memoizedState, d.updateQueue = f.updateQueue, d.type = f.type, e = f.dependencies, d.dependencies = null === e ? null : {
                    lanes: e.lanes,
                    firstContext: e.firstContext
                  }), c = c.sibling;
                }
                v(J, J.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
            null !== e.tail && D() > Eg && (b.flags |= 128, d = !0, Bg(e, !1), b.lanes = 4194304);
          }
        } else {
          if (!d) if (a = Ge(f), null !== a) {
            if (b.flags |= 128, d = !0, a = a.updateQueue, null !== a && (b.updateQueue = a, b.flags |= 4), Bg(e, !0), null === e.tail && "hidden" === e.tailMode && !f.alternate && !F) return Q(b), null;
          } else 2 * D() - e.renderingStartTime > Eg && 1073741824 !== c && (b.flags |= 128, d = !0, Bg(e, !1), b.lanes = 4194304);
          e.isBackwards ? (f.sibling = b.child, b.child = f) : (a = e.last, null !== a ? a.sibling = f : b.child = f, e.last = f);
        }
        if (null !== e.tail) return b = e.tail, e.rendering = b, e.tail = b.sibling, e.renderingStartTime = D(), b.sibling = null, a = J.current, v(J, d ? a & 1 | 2 : a & 1), b;
        Q(b);
        return null;
      case 22:
      case 23:
        return Fg(), c = null !== b.memoizedState, null !== a && null !== a.memoizedState !== c && (b.flags |= 8192), c && 0 !== (b.mode & 1) ? 0 !== (ag & 1073741824) && (Q(b), Ta && b.subtreeFlags & 6 && (b.flags |= 8192)) : Q(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(m(156, b.tag));
  }
  function Gg(a, b) {
    nd(b);
    switch (b.tag) {
      case 1:
        return A(b.type) && mc(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 3:
        return De(), q(z), q(x), Ie(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
      case 5:
        return Fe(b), null;
      case 13:
        q(J);
        a = b.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          if (null === b.alternate) throw Error(m(340));
          Ad();
        }
        a = b.flags;
        return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 19:
        return q(J), null;
      case 4:
        return De(), null;
      case 10:
        return Md(b.type._context), null;
      case 22:
      case 23:
        return Fg(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Hg = !1,
    S = !1,
    Ig = "function" === typeof WeakSet ? WeakSet : Set,
    T = null;
  function Jg(a, b) {
    var c = a.ref;
    if (null !== c) if ("function" === typeof c) try {
      c(null);
    } catch (d) {
      U(a, b, d);
    } else c.current = null;
  }
  function Kg(a, b, c) {
    try {
      c();
    } catch (d) {
      U(a, b, d);
    }
  }
  var Lg = !1;
  function Mg(a, b) {
    Ha(a.containerInfo);
    for (T = b; null !== T;) {
      if (a = T, b = a.child, 0 !== (a.subtreeFlags & 1028) && null !== b) b["return"] = a, T = b;else for (; null !== T;) {
        a = T;
        try {
          var c = a.alternate;
          if (0 !== (a.flags & 1024)) switch (a.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (null !== c) {
                var d = c.memoizedProps,
                  e = c.memoizedState,
                  f = a.stateNode,
                  g = f.getSnapshotBeforeUpdate(a.elementType === a.type ? d : Fd(a.type, d), e);
                f.__reactInternalSnapshotBeforeUpdate = g;
              }
              break;
            case 3:
              Ta && xb(a.stateNode.containerInfo);
              break;
            case 5:
            case 6:
            case 4:
            case 17:
              break;
            default:
              throw Error(m(163));
          }
        } catch (h) {
          U(a, a["return"], h);
        }
        b = a.sibling;
        if (null !== b) {
          b["return"] = a["return"];
          T = b;
          break;
        }
        T = a["return"];
      }
    }
    c = Lg;
    Lg = !1;
    return c;
  }
  function Ng(a, b, c) {
    var d = b.updateQueue;
    d = null !== d ? d.lastEffect : null;
    if (null !== d) {
      var e = d = d.next;
      do {
        if ((e.tag & a) === a) {
          var f = e.destroy;
          e.destroy = void 0;
          void 0 !== f && Kg(b, c, f);
        }
        e = e.next;
      } while (e !== d);
    }
  }
  function Og(a, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;
    if (null !== b) {
      var c = b = b.next;
      do {
        if ((c.tag & a) === a) {
          var d = c.create;
          c.destroy = d();
        }
        c = c.next;
      } while (c !== b);
    }
  }
  function Pg(a) {
    var b = a.ref;
    if (null !== b) {
      var c = a.stateNode;
      switch (a.tag) {
        case 5:
          a = Ea(c);
          break;
        default:
          a = c;
      }
      "function" === typeof b ? b(a) : b.current = a;
    }
  }
  function Qg(a) {
    var b = a.alternate;
    null !== b && (a.alternate = null, Qg(b));
    a.child = null;
    a.deletions = null;
    a.sibling = null;
    5 === a.tag && (b = a.stateNode, null !== b && Za(b));
    a.stateNode = null;
    a["return"] = null;
    a.dependencies = null;
    a.memoizedProps = null;
    a.memoizedState = null;
    a.pendingProps = null;
    a.stateNode = null;
    a.updateQueue = null;
  }
  function Rg(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }
  function Sg(a) {
    a: for (;;) {
      for (; null === a.sibling;) {
        if (null === a["return"] || Rg(a["return"])) return null;
        a = a["return"];
      }
      a.sibling["return"] = a["return"];
      for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
        if (a.flags & 2) continue a;
        if (null === a.child || 4 === a.tag) continue a;else a.child["return"] = a, a = a.child;
      }
      if (!(a.flags & 2)) return a.stateNode;
    }
  }
  function Tg(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? pb(c, a, b) : kb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Tg(a, b, c), a = a.sibling; null !== a;) {
      Tg(a, b, c), a = a.sibling;
    }
  }
  function Ug(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? ob(c, a, b) : jb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Ug(a, b, c), a = a.sibling; null !== a;) {
      Ug(a, b, c), a = a.sibling;
    }
  }
  var V = null,
    Vg = !1;
  function Wg(a, b, c) {
    for (c = c.child; null !== c;) {
      Xg(a, b, c), c = c.sibling;
    }
  }
  function Xg(a, b, c) {
    if (Sc && "function" === typeof Sc.onCommitFiberUnmount) try {
      Sc.onCommitFiberUnmount(Rc, c);
    } catch (h) {}
    switch (c.tag) {
      case 5:
        S || Jg(c, b);
      case 6:
        if (Ta) {
          var d = V,
            e = Vg;
          V = null;
          Wg(a, b, c);
          V = d;
          Vg = e;
          null !== V && (Vg ? rb(V, c.stateNode) : qb(V, c.stateNode));
        } else Wg(a, b, c);
        break;
      case 18:
        Ta && null !== V && (Vg ? Yb(V, c.stateNode) : Xb(V, c.stateNode));
        break;
      case 4:
        Ta ? (d = V, e = Vg, V = c.stateNode.containerInfo, Vg = !0, Wg(a, b, c), V = d, Vg = e) : (Ua && (d = c.stateNode.containerInfo, e = zb(d), Cb(d, e)), Wg(a, b, c));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!S && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
          e = d = d.next;
          do {
            var f = e,
              g = f.destroy;
            f = f.tag;
            void 0 !== g && (0 !== (f & 2) ? Kg(c, b, g) : 0 !== (f & 4) && Kg(c, b, g));
            e = e.next;
          } while (e !== d);
        }
        Wg(a, b, c);
        break;
      case 1:
        if (!S && (Jg(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          U(c, b, h);
        }
        Wg(a, b, c);
        break;
      case 21:
        Wg(a, b, c);
        break;
      case 22:
        c.mode & 1 ? (S = (d = S) || null !== c.memoizedState, Wg(a, b, c), S = d) : Wg(a, b, c);
        break;
      default:
        Wg(a, b, c);
    }
  }
  function Yg(a) {
    var b = a.updateQueue;
    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Ig());
      b.forEach(function (b) {
        var d = Zg.bind(null, a, b);
        c.has(b) || (c.add(b), b.then(d, d));
      });
    }
  }
  function $g(a, b) {
    var c = b.deletions;
    if (null !== c) for (var d = 0; d < c.length; d++) {
      var e = c[d];
      try {
        var f = a,
          g = b;
        if (Ta) {
          var h = g;
          a: for (; null !== h;) {
            switch (h.tag) {
              case 5:
                V = h.stateNode;
                Vg = !1;
                break a;
              case 3:
                V = h.stateNode.containerInfo;
                Vg = !0;
                break a;
              case 4:
                V = h.stateNode.containerInfo;
                Vg = !0;
                break a;
            }
            h = h["return"];
          }
          if (null === V) throw Error(m(160));
          Xg(f, g, e);
          V = null;
          Vg = !1;
        } else Xg(f, g, e);
        var k = e.alternate;
        null !== k && (k["return"] = null);
        e["return"] = null;
      } catch (l) {
        U(e, b, l);
      }
    }
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b;) {
      ah(b, a), b = b.sibling;
    }
  }
  function ah(a, b) {
    var c = a.alternate,
      d = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        $g(b, a);
        bh(a);
        if (d & 4) {
          try {
            Ng(3, a, a["return"]), Og(3, a);
          } catch (p) {
            U(a, a["return"], p);
          }
          try {
            Ng(5, a, a["return"]);
          } catch (p) {
            U(a, a["return"], p);
          }
        }
        break;
      case 1:
        $g(b, a);
        bh(a);
        d & 512 && null !== c && Jg(c, c["return"]);
        break;
      case 5:
        $g(b, a);
        bh(a);
        d & 512 && null !== c && Jg(c, c["return"]);
        if (Ta) {
          if (a.flags & 32) {
            var e = a.stateNode;
            try {
              sb(e);
            } catch (p) {
              U(a, a["return"], p);
            }
          }
          if (d & 4 && (e = a.stateNode, null != e)) {
            var f = a.memoizedProps;
            c = null !== c ? c.memoizedProps : f;
            d = a.type;
            b = a.updateQueue;
            a.updateQueue = null;
            if (null !== b) try {
              nb(e, b, d, c, f, a);
            } catch (p) {
              U(a, a["return"], p);
            }
          }
        }
        break;
      case 6:
        $g(b, a);
        bh(a);
        if (d & 4 && Ta) {
          if (null === a.stateNode) throw Error(m(162));
          e = a.stateNode;
          f = a.memoizedProps;
          c = null !== c ? c.memoizedProps : f;
          try {
            lb(e, c, f);
          } catch (p) {
            U(a, a["return"], p);
          }
        }
        break;
      case 3:
        $g(b, a);
        bh(a);
        if (d & 4) {
          if (Ta && Va && null !== c && c.memoizedState.isDehydrated) try {
            Vb(b.containerInfo);
          } catch (p) {
            U(a, a["return"], p);
          }
          if (Ua) {
            e = b.containerInfo;
            f = b.pendingChildren;
            try {
              Cb(e, f);
            } catch (p) {
              U(a, a["return"], p);
            }
          }
        }
        break;
      case 4:
        $g(b, a);
        bh(a);
        if (d & 4 && Ua) {
          f = a.stateNode;
          e = f.containerInfo;
          f = f.pendingChildren;
          try {
            Cb(e, f);
          } catch (p) {
            U(a, a["return"], p);
          }
        }
        break;
      case 13:
        $g(b, a);
        bh(a);
        e = a.child;
        e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (ch = D()));
        d & 4 && Yg(a);
        break;
      case 22:
        var g = null !== c && null !== c.memoizedState;
        a.mode & 1 ? (S = (c = S) || g, $g(b, a), S = c) : $g(b, a);
        bh(a);
        if (d & 8192) {
          c = null !== a.memoizedState;
          if ((a.stateNode.isHidden = c) && !g && 0 !== (a.mode & 1)) for (T = a, d = a.child; null !== d;) {
            for (b = T = d; null !== T;) {
              g = T;
              var h = g.child;
              switch (g.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ng(4, g, g["return"]);
                  break;
                case 1:
                  Jg(g, g["return"]);
                  var k = g.stateNode;
                  if ("function" === typeof k.componentWillUnmount) {
                    var l = g,
                      n = g["return"];
                    try {
                      var t = l;
                      k.props = t.memoizedProps;
                      k.state = t.memoizedState;
                      k.componentWillUnmount();
                    } catch (p) {
                      U(l, n, p);
                    }
                  }
                  break;
                case 5:
                  Jg(g, g["return"]);
                  break;
                case 22:
                  if (null !== g.memoizedState) {
                    dh(b);
                    continue;
                  }
              }
              null !== h ? (h["return"] = g, T = h) : dh(b);
            }
            d = d.sibling;
          }
          if (Ta) a: if (d = null, Ta) for (b = a;;) {
            if (5 === b.tag) {
              if (null === d) {
                d = b;
                try {
                  e = b.stateNode, c ? tb(e) : vb(b.stateNode, b.memoizedProps);
                } catch (p) {
                  U(a, a["return"], p);
                }
              }
            } else if (6 === b.tag) {
              if (null === d) try {
                f = b.stateNode, c ? ub(f) : wb(f, b.memoizedProps);
              } catch (p) {
                U(a, a["return"], p);
              }
            } else if ((22 !== b.tag && 23 !== b.tag || null === b.memoizedState || b === a) && null !== b.child) {
              b.child["return"] = b;
              b = b.child;
              continue;
            }
            if (b === a) break a;
            for (; null === b.sibling;) {
              if (null === b["return"] || b["return"] === a) break a;
              d === b && (d = null);
              b = b["return"];
            }
            d === b && (d = null);
            b.sibling["return"] = b["return"];
            b = b.sibling;
          }
        }
        break;
      case 19:
        $g(b, a);
        bh(a);
        d & 4 && Yg(a);
        break;
      case 21:
        break;
      default:
        $g(b, a), bh(a);
    }
  }
  function bh(a) {
    var b = a.flags;
    if (b & 2) {
      try {
        if (Ta) {
          b: {
            for (var c = a["return"]; null !== c;) {
              if (Rg(c)) {
                var d = c;
                break b;
              }
              c = c["return"];
            }
            throw Error(m(160));
          }
          switch (d.tag) {
            case 5:
              var e = d.stateNode;
              d.flags & 32 && (sb(e), d.flags &= -33);
              var f = Sg(a);
              Ug(a, f, e);
              break;
            case 3:
            case 4:
              var g = d.stateNode.containerInfo,
                h = Sg(a);
              Tg(a, h, g);
              break;
            default:
              throw Error(m(161));
          }
        }
      } catch (k) {
        U(a, a["return"], k);
      }
      a.flags &= -3;
    }
    b & 4096 && (a.flags &= -4097);
  }
  function eh(a, b, c) {
    T = a;
    fh(a, b, c);
  }
  function fh(a, b, c) {
    for (var d = 0 !== (a.mode & 1); null !== T;) {
      var e = T,
        f = e.child;
      if (22 === e.tag && d) {
        var g = null !== e.memoizedState || Hg;
        if (!g) {
          var h = e.alternate,
            k = null !== h && null !== h.memoizedState || S;
          h = Hg;
          var l = S;
          Hg = g;
          if ((S = k) && !l) for (T = e; null !== T;) {
            g = T, k = g.child, 22 === g.tag && null !== g.memoizedState ? gh(e) : null !== k ? (k["return"] = g, T = k) : gh(e);
          }
          for (; null !== f;) {
            T = f, fh(f, b, c), f = f.sibling;
          }
          T = e;
          Hg = h;
          S = l;
        }
        hh(a, b, c);
      } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f["return"] = e, T = f) : hh(a, b, c);
    }
  }
  function hh(a) {
    for (; null !== T;) {
      var b = T;
      if (0 !== (b.flags & 8772)) {
        var c = b.alternate;
        try {
          if (0 !== (b.flags & 8772)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              S || Og(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !S) if (null === c) d.componentDidMount();else {
                var e = b.elementType === b.type ? c.memoizedProps : Fd(b.type, c.memoizedProps);
                d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var f = b.updateQueue;
              null !== f && ce(b, f, d);
              break;
            case 3:
              var g = b.updateQueue;
              if (null !== g) {
                c = null;
                if (null !== b.child) switch (b.child.tag) {
                  case 5:
                    c = Ea(b.child.stateNode);
                    break;
                  case 1:
                    c = b.child.stateNode;
                }
                ce(b, g, c);
              }
              break;
            case 5:
              var h = b.stateNode;
              null === c && b.flags & 4 && mb(h, b.type, b.memoizedProps, b);
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (Va && null === b.memoizedState) {
                var k = b.alternate;
                if (null !== k) {
                  var l = k.memoizedState;
                  if (null !== l) {
                    var n = l.dehydrated;
                    null !== n && Wb(n);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(m(163));
          }
          S || b.flags & 512 && Pg(b);
        } catch (t) {
          U(b, b["return"], t);
        }
      }
      if (b === a) {
        T = null;
        break;
      }
      c = b.sibling;
      if (null !== c) {
        c["return"] = b["return"];
        T = c;
        break;
      }
      T = b["return"];
    }
  }
  function dh(a) {
    for (; null !== T;) {
      var b = T;
      if (b === a) {
        T = null;
        break;
      }
      var c = b.sibling;
      if (null !== c) {
        c["return"] = b["return"];
        T = c;
        break;
      }
      T = b["return"];
    }
  }
  function gh(a) {
    for (; null !== T;) {
      var b = T;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c = b["return"];
            try {
              Og(4, b);
            } catch (k) {
              U(b, c, k);
            }
            break;
          case 1:
            var d = b.stateNode;
            if ("function" === typeof d.componentDidMount) {
              var e = b["return"];
              try {
                d.componentDidMount();
              } catch (k) {
                U(b, e, k);
              }
            }
            var f = b["return"];
            try {
              Pg(b);
            } catch (k) {
              U(b, f, k);
            }
            break;
          case 5:
            var g = b["return"];
            try {
              Pg(b);
            } catch (k) {
              U(b, g, k);
            }
        }
      } catch (k) {
        U(b, b["return"], k);
      }
      if (b === a) {
        T = null;
        break;
      }
      var h = b.sibling;
      if (null !== h) {
        h["return"] = b["return"];
        T = h;
        break;
      }
      T = b["return"];
    }
  }
  var ih = 0,
    jh = 1,
    kh = 2,
    lh = 3,
    mh = 4;
  if ("function" === typeof Symbol && Symbol["for"]) {
    var nh = Symbol["for"];
    ih = nh("selector.component");
    jh = nh("selector.has_pseudo_class");
    kh = nh("selector.role");
    lh = nh("selector.test_id");
    mh = nh("selector.text");
  }
  function oh(a) {
    var b = Wa(a);
    if (null != b) {
      if ("string" !== typeof b.memoizedProps["data-testname"]) throw Error(m(364));
      return b;
    }
    a = cb(a);
    if (null === a) throw Error(m(362));
    return a.stateNode.current;
  }
  function ph(a, b) {
    switch (b.$$typeof) {
      case ih:
        if (a.type === b.value) return !0;
        break;
      case jh:
        a: {
          b = b.value;
          a = [a, 0];
          for (var c = 0; c < a.length;) {
            var d = a[c++],
              e = a[c++],
              f = b[e];
            if (5 !== d.tag || !fb(d)) {
              for (; null != f && ph(d, f);) {
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
      case kh:
        if (5 === a.tag && gb(a.stateNode, b.value)) return !0;
        break;
      case mh:
        if (5 === a.tag || 6 === a.tag) if (a = eb(a), null !== a && 0 <= a.indexOf(b.value)) return !0;
        break;
      case lh:
        if (5 === a.tag && (a = a.memoizedProps["data-testname"], "string" === typeof a && a.toLowerCase() === b.value.toLowerCase())) return !0;
        break;
      default:
        throw Error(m(365));
    }
    return !1;
  }
  function qh(a) {
    switch (a.$$typeof) {
      case ih:
        return "<" + (ua(a.value) || "Unknown") + ">";
      case jh:
        return ":has(" + (qh(a) || "") + ")";
      case kh:
        return '[role="' + a.value + '"]';
      case mh:
        return '"' + a.value + '"';
      case lh:
        return '[data-testname="' + a.value + '"]';
      default:
        throw Error(m(365));
    }
  }
  function rh(a, b) {
    var c = [];
    a = [a, 0];
    for (var d = 0; d < a.length;) {
      var e = a[d++],
        f = a[d++],
        g = b[f];
      if (5 !== e.tag || !fb(e)) {
        for (; null != g && ph(e, g);) {
          f++, g = b[f];
        }
        if (f === b.length) c.push(e);else for (e = e.child; null !== e;) {
          a.push(e, f), e = e.sibling;
        }
      }
    }
    return c;
  }
  function sh(a, b) {
    if (!bb) throw Error(m(363));
    a = oh(a);
    a = rh(a, b);
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
  var th = Math.ceil,
    uh = da.ReactCurrentDispatcher,
    vh = da.ReactCurrentOwner,
    W = da.ReactCurrentBatchConfig,
    H = 0,
    O = null,
    X = null,
    Y = 0,
    ag = 0,
    $f = ic(0),
    R = 0,
    wh = null,
    be = 0,
    xh = 0,
    yh = 0,
    zh = null,
    Ah = null,
    ch = 0,
    Eg = Infinity,
    Bh = null;
  function Ch() {
    Eg = D() + 500;
  }
  var Kf = !1,
    Lf = null,
    Nf = null,
    Dh = !1,
    Eh = null,
    Fh = 0,
    Gh = 0,
    Hh = null,
    Ih = -1,
    Jh = 0;
  function I() {
    return 0 !== (H & 6) ? D() : -1 !== Ih ? Ih : Ih = D();
  }
  function fe(a) {
    if (0 === (a.mode & 1)) return 1;
    if (0 !== (H & 2) && 0 !== Y) return Y & -Y;
    if (null !== Cd.transition) return 0 === Jh && (Jh = Dc()), Jh;
    a = C;
    return 0 !== a ? a : Ya();
  }
  function ge(a, b, c, d) {
    if (50 < Gh) throw Gh = 0, Hh = null, Error(m(185));
    Fc(a, c, d);
    if (0 === (H & 2) || a !== O) a === O && (0 === (H & 2) && (xh |= c), 4 === R && Kh(a, Y)), Lh(a, d), 1 === c && 0 === H && 0 === (b.mode & 1) && (Ch(), Xc && ad());
  }
  function Lh(a, b) {
    var c = a.callbackNode;
    Bc(a, b);
    var d = zc(a, a === O ? Y : 0);
    if (0 === d) null !== c && Kc(c), a.callbackNode = null, a.callbackPriority = 0;else if (b = d & -d, a.callbackPriority !== b) {
      null != c && Kc(c);
      if (1 === b) 0 === a.tag ? $c(Mh.bind(null, a)) : Zc(Mh.bind(null, a)), $a ? ab(function () {
        0 === (H & 6) && ad();
      }) : Jc(Nc, ad), c = null;else {
        switch (Ic(d)) {
          case 1:
            c = Nc;
            break;
          case 4:
            c = Oc;
            break;
          case 16:
            c = Pc;
            break;
          case 536870912:
            c = Qc;
            break;
          default:
            c = Pc;
        }
        c = Nh(c, Oh.bind(null, a));
      }
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }
  function Oh(a, b) {
    Ih = -1;
    Jh = 0;
    if (0 !== (H & 6)) throw Error(m(327));
    var c = a.callbackNode;
    if (Ph() && a.callbackNode !== c) return null;
    var d = zc(a, a === O ? Y : 0);
    if (0 === d) return null;
    if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Qh(a, d);else {
      b = d;
      var e = H;
      H |= 2;
      var f = Rh();
      if (O !== a || Y !== b) Bh = null, Ch(), Sh(a, b);
      do {
        try {
          Th();
          break;
        } catch (h) {
          Uh(a, h);
        }
      } while (1);
      Kd();
      uh.current = f;
      H = e;
      null !== X ? b = 0 : (O = null, Y = 0, b = R);
    }
    if (0 !== b) {
      2 === b && (e = Cc(a), 0 !== e && (d = e, b = Vh(a, e)));
      if (1 === b) throw c = wh, Sh(a, 0), Kh(a, d), Lh(a, D()), c;
      if (6 === b) Kh(a, d);else {
        e = a.current.alternate;
        if (0 === (d & 30) && !Wh(e) && (b = Qh(a, d), 2 === b && (f = Cc(a), 0 !== f && (d = f, b = Vh(a, f))), 1 === b)) throw c = wh, Sh(a, 0), Kh(a, d), Lh(a, D()), c;
        a.finishedWork = e;
        a.finishedLanes = d;
        switch (b) {
          case 0:
          case 1:
            throw Error(m(345));
          case 2:
            Xh(a, Ah, Bh);
            break;
          case 3:
            Kh(a, d);
            if ((d & 130023424) === d && (b = ch + 500 - D(), 10 < b)) {
              if (0 !== zc(a, 0)) break;
              e = a.suspendedLanes;
              if ((e & d) !== d) {
                I();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }
              a.timeoutHandle = Pa(Xh.bind(null, a, Ah, Bh), b);
              break;
            }
            Xh(a, Ah, Bh);
            break;
          case 4:
            Kh(a, d);
            if ((d & 4194240) === d) break;
            b = a.eventTimes;
            for (e = -1; 0 < d;) {
              var g = 31 - tc(d);
              f = 1 << g;
              g = b[g];
              g > e && (e = g);
              d &= ~f;
            }
            d = e;
            d = D() - d;
            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * th(d / 1960)) - d;
            if (10 < d) {
              a.timeoutHandle = Pa(Xh.bind(null, a, Ah, Bh), d);
              break;
            }
            Xh(a, Ah, Bh);
            break;
          case 5:
            Xh(a, Ah, Bh);
            break;
          default:
            throw Error(m(329));
        }
      }
    }
    Lh(a, D());
    return a.callbackNode === c ? Oh.bind(null, a) : null;
  }
  function Vh(a, b) {
    var c = zh;
    a.current.memoizedState.isDehydrated && (Sh(a, b).flags |= 256);
    a = Qh(a, b);
    2 !== a && (b = Ah, Ah = c, null !== b && Dg(b));
    return a;
  }
  function Dg(a) {
    null === Ah ? Ah = a : Ah.push.apply(Ah, a);
  }
  function Wh(a) {
    for (var b = a;;) {
      if (b.flags & 16384) {
        var c = b.updateQueue;
        if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
          var e = c[d],
            f = e.getSnapshot;
          e = e.value;
          try {
            if (!Vc(f(), e)) return !1;
          } catch (g) {
            return !1;
          }
        }
      }
      c = b.child;
      if (b.subtreeFlags & 16384 && null !== c) c["return"] = b, b = c;else {
        if (b === a) break;
        for (; null === b.sibling;) {
          if (null === b["return"] || b["return"] === a) return !0;
          b = b["return"];
        }
        b.sibling["return"] = b["return"];
        b = b.sibling;
      }
    }
    return !0;
  }
  function Kh(a, b) {
    b &= ~yh;
    b &= ~xh;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;
    for (a = a.expirationTimes; 0 < b;) {
      var c = 31 - tc(b),
        d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }
  function Mh(a) {
    if (0 !== (H & 6)) throw Error(m(327));
    Ph();
    var b = zc(a, 0);
    if (0 === (b & 1)) return Lh(a, D()), null;
    var c = Qh(a, b);
    if (0 !== a.tag && 2 === c) {
      var d = Cc(a);
      0 !== d && (b = d, c = Vh(a, d));
    }
    if (1 === c) throw c = wh, Sh(a, 0), Kh(a, b), Lh(a, D()), c;
    if (6 === c) throw Error(m(345));
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Xh(a, Ah, Bh);
    Lh(a, D());
    return null;
  }
  function Yh(a) {
    null !== Eh && 0 === Eh.tag && 0 === (H & 6) && Ph();
    var b = H;
    H |= 1;
    var c = W.transition,
      d = C;
    try {
      if (W.transition = null, C = 1, a) return a();
    } finally {
      C = d, W.transition = c, H = b, 0 === (H & 6) && ad();
    }
  }
  function Fg() {
    ag = $f.current;
    q($f);
  }
  function Sh(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    c !== Ra && (a.timeoutHandle = Ra, Qa(c));
    if (null !== X) for (c = X["return"]; null !== c;) {
      var d = c;
      nd(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && mc();
          break;
        case 3:
          De();
          q(z);
          q(x);
          Ie();
          break;
        case 5:
          Fe(d);
          break;
        case 4:
          De();
          break;
        case 13:
          q(J);
          break;
        case 19:
          q(J);
          break;
        case 10:
          Md(d.type._context);
          break;
        case 22:
        case 23:
          Fg();
      }
      c = c["return"];
    }
    O = a;
    X = a = qe(a.current, null);
    Y = ag = b;
    R = 0;
    wh = null;
    yh = xh = be = 0;
    Ah = zh = null;
    if (null !== Qd) {
      for (b = 0; b < Qd.length; b++) {
        if (c = Qd[b], d = c.interleaved, null !== d) {
          c.interleaved = null;
          var e = d.next,
            f = c.pending;
          if (null !== f) {
            var g = f.next;
            f.next = e;
            d.next = g;
          }
          c.pending = d;
        }
      }
      Qd = null;
    }
    return a;
  }
  function Uh(a, b) {
    do {
      var c = X;
      try {
        Kd();
        Je.current = Ve;
        if (Me) {
          for (var d = K.memoizedState; null !== d;) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }
          Me = !1;
        }
        Le = 0;
        M = L = K = null;
        Ne = !1;
        Oe = 0;
        vh.current = null;
        if (null === c || null === c["return"]) {
          R = 1;
          wh = b;
          X = null;
          break;
        }
        a: {
          var f = a,
            g = c["return"],
            h = c,
            k = b;
          b = Y;
          h.flags |= 32768;
          if (null !== k && "object" === typeof k && "function" === typeof k.then) {
            var l = k,
              n = h,
              t = n.tag;
            if (0 === (n.mode & 1) && (0 === t || 11 === t || 15 === t)) {
              var p = n.alternate;
              p ? (n.updateQueue = p.updateQueue, n.memoizedState = p.memoizedState, n.lanes = p.lanes) : (n.updateQueue = null, n.memoizedState = null);
            }
            var B = Qf(g);
            if (null !== B) {
              B.flags &= -257;
              Rf(B, g, h, f, b);
              B.mode & 1 && Of(f, l, b);
              b = B;
              k = l;
              var w = b.updateQueue;
              if (null === w) {
                var Z = new Set();
                Z.add(k);
                b.updateQueue = Z;
              } else w.add(k);
              break a;
            } else {
              if (0 === (b & 1)) {
                Of(f, l, b);
                og();
                break a;
              }
              k = Error(m(426));
            }
          } else if (F && h.mode & 1) {
            var za = Qf(g);
            if (null !== za) {
              0 === (za.flags & 65536) && (za.flags |= 256);
              Rf(za, g, h, f, b);
              Bd(Ff(k, h));
              break a;
            }
          }
          f = k = Ff(k, h);
          4 !== R && (R = 2);
          null === zh ? zh = [f] : zh.push(f);
          f = g;
          do {
            switch (f.tag) {
              case 3:
                f.flags |= 65536;
                b &= -b;
                f.lanes |= b;
                var E = Jf(f, k, b);
                $d(f, E);
                break a;
              case 1:
                h = k;
                var r = f.type,
                  u = f.stateNode;
                if (0 === (f.flags & 128) && ("function" === typeof r.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Nf || !Nf.has(u)))) {
                  f.flags |= 65536;
                  b &= -b;
                  f.lanes |= b;
                  var Db = Mf(f, h, b);
                  $d(f, Db);
                  break a;
                }
            }
            f = f["return"];
          } while (null !== f);
        }
        Zh(c);
      } catch (qc) {
        b = qc;
        X === c && null !== c && (X = c = c["return"]);
        continue;
      }
      break;
    } while (1);
  }
  function Rh() {
    var a = uh.current;
    uh.current = Ve;
    return null === a ? Ve : a;
  }
  function og() {
    if (0 === R || 3 === R || 2 === R) R = 4;
    null === O || 0 === (be & 268435455) && 0 === (xh & 268435455) || Kh(O, Y);
  }
  function Qh(a, b) {
    var c = H;
    H |= 2;
    var d = Rh();
    if (O !== a || Y !== b) Bh = null, Sh(a, b);
    do {
      try {
        $h();
        break;
      } catch (e) {
        Uh(a, e);
      }
    } while (1);
    Kd();
    H = c;
    uh.current = d;
    if (null !== X) throw Error(m(261));
    O = null;
    Y = 0;
    return R;
  }
  function $h() {
    for (; null !== X;) {
      ai(X);
    }
  }
  function Th() {
    for (; null !== X && !Lc();) {
      ai(X);
    }
  }
  function ai(a) {
    var b = bi(a.alternate, a, ag);
    a.memoizedProps = a.pendingProps;
    null === b ? Zh(a) : X = b;
    vh.current = null;
  }
  function Zh(a) {
    var b = a;
    do {
      var c = b.alternate;
      a = b["return"];
      if (0 === (b.flags & 32768)) {
        if (c = Cg(c, b, ag), null !== c) {
          X = c;
          return;
        }
      } else {
        c = Gg(c, b);
        if (null !== c) {
          c.flags &= 32767;
          X = c;
          return;
        }
        if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;else {
          R = 6;
          X = null;
          return;
        }
      }
      b = b.sibling;
      if (null !== b) {
        X = b;
        return;
      }
      X = b = a;
    } while (null !== b);
    0 === R && (R = 5);
  }
  function Xh(a, b, c) {
    var d = C,
      e = W.transition;
    try {
      W.transition = null, C = 1, ci(a, b, c, d);
    } finally {
      W.transition = e, C = d;
    }
    return null;
  }
  function ci(a, b, c, d) {
    do {
      Ph();
    } while (null !== Eh);
    if (0 !== (H & 6)) throw Error(m(327));
    c = a.finishedWork;
    var e = a.finishedLanes;
    if (null === c) return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current) throw Error(m(177));
    a.callbackNode = null;
    a.callbackPriority = 0;
    var f = c.lanes | c.childLanes;
    Gc(a, f);
    a === O && (X = O = null, Y = 0);
    0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || Dh || (Dh = !0, Nh(Pc, function () {
      Ph();
      return null;
    }));
    f = 0 !== (c.flags & 15990);
    if (0 !== (c.subtreeFlags & 15990) || f) {
      f = W.transition;
      W.transition = null;
      var g = C;
      C = 1;
      var h = H;
      H |= 4;
      vh.current = null;
      Mg(a, c);
      ah(c, a);
      Ia(a.containerInfo);
      a.current = c;
      eh(c, a, e);
      Mc();
      H = h;
      C = g;
      W.transition = f;
    } else a.current = c;
    Dh && (Dh = !1, Eh = a, Fh = e);
    f = a.pendingLanes;
    0 === f && (Nf = null);
    Tc(c.stateNode, d);
    Lh(a, D());
    if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) {
      e = b[c], d(e.value, {
        componentStack: e.stack,
        digest: e.digest
      });
    }
    if (Kf) throw Kf = !1, a = Lf, Lf = null, a;
    0 !== (Fh & 1) && 0 !== a.tag && Ph();
    f = a.pendingLanes;
    0 !== (f & 1) ? a === Hh ? Gh++ : (Gh = 0, Hh = a) : Gh = 0;
    ad();
    return null;
  }
  function Ph() {
    if (null !== Eh) {
      var a = Ic(Fh),
        b = W.transition,
        c = C;
      try {
        W.transition = null;
        C = 16 > a ? 16 : a;
        if (null === Eh) var d = !1;else {
          a = Eh;
          Eh = null;
          Fh = 0;
          if (0 !== (H & 6)) throw Error(m(331));
          var e = H;
          H |= 4;
          for (T = a.current; null !== T;) {
            var f = T,
              g = f.child;
            if (0 !== (T.flags & 16)) {
              var h = f.deletions;
              if (null !== h) {
                for (var k = 0; k < h.length; k++) {
                  var l = h[k];
                  for (T = l; null !== T;) {
                    var n = T;
                    switch (n.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ng(8, n, f);
                    }
                    var t = n.child;
                    if (null !== t) t["return"] = n, T = t;else for (; null !== T;) {
                      n = T;
                      var p = n.sibling,
                        B = n["return"];
                      Qg(n);
                      if (n === l) {
                        T = null;
                        break;
                      }
                      if (null !== p) {
                        p["return"] = B;
                        T = p;
                        break;
                      }
                      T = B;
                    }
                  }
                }
                var w = f.alternate;
                if (null !== w) {
                  var Z = w.child;
                  if (null !== Z) {
                    w.child = null;
                    do {
                      var za = Z.sibling;
                      Z.sibling = null;
                      Z = za;
                    } while (null !== Z);
                  }
                }
                T = f;
              }
            }
            if (0 !== (f.subtreeFlags & 2064) && null !== g) g["return"] = f, T = g;else b: for (; null !== T;) {
              f = T;
              if (0 !== (f.flags & 2048)) switch (f.tag) {
                case 0:
                case 11:
                case 15:
                  Ng(9, f, f["return"]);
              }
              var E = f.sibling;
              if (null !== E) {
                E["return"] = f["return"];
                T = E;
                break b;
              }
              T = f["return"];
            }
          }
          var r = a.current;
          for (T = r; null !== T;) {
            g = T;
            var u = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== u) u["return"] = g, T = u;else b: for (g = r; null !== T;) {
              h = T;
              if (0 !== (h.flags & 2048)) try {
                switch (h.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Og(9, h);
                }
              } catch (qc) {
                U(h, h["return"], qc);
              }
              if (h === g) {
                T = null;
                break b;
              }
              var Db = h.sibling;
              if (null !== Db) {
                Db["return"] = h["return"];
                T = Db;
                break b;
              }
              T = h["return"];
            }
          }
          H = e;
          ad();
          if (Sc && "function" === typeof Sc.onPostCommitFiberRoot) try {
            Sc.onPostCommitFiberRoot(Rc, a);
          } catch (qc) {}
          d = !0;
        }
        return d;
      } finally {
        C = c, W.transition = b;
      }
    }
    return !1;
  }
  function di(a, b, c) {
    b = Ff(c, b);
    b = Jf(a, b, 1);
    a = Yd(a, b, 1);
    b = I();
    null !== a && (Fc(a, 1, b), Lh(a, b));
  }
  function U(a, b, c) {
    if (3 === a.tag) di(a, a, c);else for (; null !== b;) {
      if (3 === b.tag) {
        di(b, a, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Nf || !Nf.has(d))) {
          a = Ff(c, a);
          a = Mf(b, a, 1);
          b = Yd(b, a, 1);
          a = I();
          null !== b && (Fc(b, 1, a), Lh(b, a));
          break;
        }
      }
      b = b["return"];
    }
  }
  function Pf(a, b, c) {
    var d = a.pingCache;
    null !== d && d["delete"](b);
    b = I();
    a.pingedLanes |= a.suspendedLanes & c;
    O === a && (Y & c) === c && (4 === R || 3 === R && (Y & 130023424) === Y && 500 > D() - ch ? Sh(a, 0) : yh |= c);
    Lh(a, b);
  }
  function ei(a, b) {
    0 === b && (0 === (a.mode & 1) ? b = 1 : (b = xc, xc <<= 1, 0 === (xc & 130023424) && (xc = 4194304)));
    var c = I();
    a = Td(a, b);
    null !== a && (Fc(a, b, c), Lh(a, c));
  }
  function pg(a) {
    var b = a.memoizedState,
      c = 0;
    null !== b && (c = b.retryLane);
    ei(a, c);
  }
  function Zg(a, b) {
    var c = 0;
    switch (a.tag) {
      case 13:
        var d = a.stateNode;
        var e = a.memoizedState;
        null !== e && (c = e.retryLane);
        break;
      case 19:
        d = a.stateNode;
        break;
      default:
        throw Error(m(314));
    }
    null !== d && d["delete"](b);
    ei(a, c);
  }
  var bi;
  bi = function bi(a, b, c) {
    if (null !== a) {
      if (a.memoizedProps !== b.pendingProps || z.current) G = !0;else {
        if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return G = !1, tg(a, b, c);
        G = 0 !== (a.flags & 131072) ? !0 : !1;
      }
    } else G = !1, F && 0 !== (b.flags & 1048576) && ld(b, ed, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d = b.type;
        dg(a, b);
        a = b.pendingProps;
        var e = lc(b, x.current);
        Od(b, c);
        e = Re(null, b, d, a, e, c);
        var f = We();
        b.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, A(d) ? (f = !0, pc(b)) : f = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, Vd(b), e.updater = he, b.stateNode = e, e._reactInternals = b, le(b, d, a, c), b = eg(null, b, d, !0, f, c)) : (b.tag = 0, F && f && md(b), P(null, b, e, c), b = b.child);
        return b;
      case 16:
        d = b.elementType;
        a: {
          dg(a, b);
          a = b.pendingProps;
          e = d._init;
          d = e(d._payload);
          b.type = d;
          e = b.tag = fi(d);
          a = Fd(d, a);
          switch (e) {
            case 0:
              b = Yf(null, b, d, a, c);
              break a;
            case 1:
              b = cg(null, b, d, a, c);
              break a;
            case 11:
              b = Tf(null, b, d, a, c);
              break a;
            case 14:
              b = Vf(null, b, d, Fd(d.type, a), c);
              break a;
          }
          throw Error(m(306, d, ""));
        }
        return b;
      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), Yf(a, b, d, e, c);
      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), cg(a, b, d, e, c);
      case 3:
        a: {
          fg(b);
          if (null === a) throw Error(m(387));
          d = b.pendingProps;
          f = b.memoizedState;
          e = f.element;
          Wd(a, b);
          ae(b, d, null, c);
          var g = b.memoizedState;
          d = g.element;
          if (Va && f.isDehydrated) {
            if (f = {
              element: d,
              isDehydrated: !1,
              cache: g.cache,
              pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
              transitions: g.transitions
            }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
              e = Ff(Error(m(423)), b);
              b = gg(a, b, d, c, e);
              break a;
            } else if (d !== e) {
              e = Ff(Error(m(424)), b);
              b = gg(a, b, d, c, e);
              break a;
            } else for (Va && (pd = Pb(b.stateNode.containerInfo), od = b, F = !0, rd = null, qd = !1), c = we(b, null, d, c), b.child = c; c;) {
              c.flags = c.flags & -3 | 4096, c = c.sibling;
            }
          } else {
            Ad();
            if (d === e) {
              b = Uf(a, b, c);
              break a;
            }
            P(a, b, d, c);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ee(b), null === a && wd(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Na(d, e) ? g = null : null !== f && Na(d, f) && (b.flags |= 32), bg(a, b), P(a, b, g, c), b.child;
      case 6:
        return null === a && wd(b), null;
      case 13:
        return jg(a, b, c);
      case 4:
        return Ce(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = ve(b, null, d, c) : P(a, b, d, c), b.child;
      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), Tf(a, b, d, e, c);
      case 7:
        return P(a, b, b.pendingProps, c), b.child;
      case 8:
        return P(a, b, b.pendingProps.children, c), b.child;
      case 12:
        return P(a, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          f = b.memoizedProps;
          g = e.value;
          Ld(b, d, g);
          if (null !== f) if (Vc(f.value, g)) {
            if (f.children === e.children && !z.current) {
              b = Uf(a, b, c);
              break a;
            }
          } else for (f = b.child, null !== f && (f["return"] = b); null !== f;) {
            var h = f.dependencies;
            if (null !== h) {
              g = f.child;
              for (var k = h.firstContext; null !== k;) {
                if (k.context === d) {
                  if (1 === f.tag) {
                    k = Xd(-1, c & -c);
                    k.tag = 2;
                    var l = f.updateQueue;
                    if (null !== l) {
                      l = l.shared;
                      var n = l.pending;
                      null === n ? k.next = k : (k.next = n.next, n.next = k);
                      l.pending = k;
                    }
                  }
                  f.lanes |= c;
                  k = f.alternate;
                  null !== k && (k.lanes |= c);
                  Nd(f["return"], c, b);
                  h.lanes |= c;
                  break;
                }
                k = k.next;
              }
            } else if (10 === f.tag) g = f.type === b.type ? null : f.child;else if (18 === f.tag) {
              g = f["return"];
              if (null === g) throw Error(m(341));
              g.lanes |= c;
              h = g.alternate;
              null !== h && (h.lanes |= c);
              Nd(g, c, b);
              g = f.sibling;
            } else g = f.child;
            if (null !== g) g["return"] = f;else for (g = f; null !== g;) {
              if (g === b) {
                g = null;
                break;
              }
              f = g.sibling;
              if (null !== f) {
                f["return"] = g["return"];
                g = f;
                break;
              }
              g = g["return"];
            }
            f = g;
          }
          P(a, b, e.children, c);
          b = b.child;
        }
        return b;
      case 9:
        return e = b.type, d = b.pendingProps.children, Od(b, c), e = Pd(e), d = d(e), b.flags |= 1, P(a, b, d, c), b.child;
      case 14:
        return d = b.type, e = Fd(d, b.pendingProps), e = Fd(d.type, e), Vf(a, b, d, e, c);
      case 15:
        return Xf(a, b, b.type, b.pendingProps, c);
      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), dg(a, b), b.tag = 1, A(d) ? (a = !0, pc(b)) : a = !1, Od(b, c), je(b, d, e), le(b, d, e, c), eg(null, b, d, !0, a, c);
      case 19:
        return sg(a, b, c);
      case 22:
        return Zf(a, b, c);
    }
    throw Error(m(156, b.tag));
  };
  function Nh(a, b) {
    return Jc(a, b);
  }
  function gi(a, b, c, d) {
    this.tag = a;
    this.key = c;
    this.sibling = this.child = this["return"] = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function td(a, b, c, d) {
    return new gi(a, b, c, d);
  }
  function Wf(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }
  function fi(a) {
    if ("function" === typeof a) return Wf(a) ? 1 : 0;
    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === ma) return 11;
      if (a === pa) return 14;
    }
    return 2;
  }
  function qe(a, b) {
    var c = a.alternate;
    null === c ? (c = td(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
    c.flags = a.flags & 14680064;
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
  function se(a, b, c, d, e, f) {
    var g = 2;
    d = a;
    if ("function" === typeof a) Wf(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
      case ha:
        return ue(c.children, e, f, b);
      case ia:
        g = 8;
        e |= 8;
        break;
      case ja:
        return a = td(12, c, b, e | 2), a.elementType = ja, a.lanes = f, a;
      case na:
        return a = td(13, c, b, e), a.elementType = na, a.lanes = f, a;
      case oa:
        return a = td(19, c, b, e), a.elementType = oa, a.lanes = f, a;
      case ra:
        return kg(c, e, f, b);
      default:
        if ("object" === typeof a && null !== a) switch (a.$$typeof) {
          case ka:
            g = 10;
            break a;
          case la:
            g = 9;
            break a;
          case ma:
            g = 11;
            break a;
          case pa:
            g = 14;
            break a;
          case qa:
            g = 16;
            d = null;
            break a;
        }
        throw Error(m(130, null == a ? a : typeof a, ""));
    }
    b = td(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f;
    return b;
  }
  function ue(a, b, c, d) {
    a = td(7, a, d, b);
    a.lanes = c;
    return a;
  }
  function kg(a, b, c, d) {
    a = td(22, a, d, b);
    a.elementType = ra;
    a.lanes = c;
    a.stateNode = {
      isHidden: !1
    };
    return a;
  }
  function re(a, b, c) {
    a = td(6, a, null, b);
    a.lanes = c;
    return a;
  }
  function te(a, b, c) {
    b = td(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = {
      containerInfo: a.containerInfo,
      pendingChildren: null,
      implementation: a.implementation
    };
    return b;
  }
  function hi(a, b, c, d, e) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = Ra;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = Ec(0);
    this.expirationTimes = Ec(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = Ec(0);
    this.identifierPrefix = d;
    this.onRecoverableError = e;
    Va && (this.mutableSourceEagerHydrationData = null);
  }
  function ii(a, b, c, d, e, f, g, h, k) {
    a = new hi(a, b, c, h, k);
    1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;
    f = td(3, null, null, b);
    a.current = f;
    f.stateNode = a;
    f.memoizedState = {
      element: d,
      isDehydrated: c,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null
    };
    Vd(f);
    return a;
  }
  function ji(a) {
    if (!a) return jc;
    a = a._reactInternals;
    a: {
      if (wa(a) !== a || 1 !== a.tag) throw Error(m(170));
      var b = a;
      do {
        switch (b.tag) {
          case 3:
            b = b.stateNode.context;
            break a;
          case 1:
            if (A(b.type)) {
              b = b.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b = b["return"];
      } while (null !== b);
      throw Error(m(171));
    }
    if (1 === a.tag) {
      var c = a.type;
      if (A(c)) return oc(a, c, b);
    }
    return b;
  }
  function ki(a) {
    var b = a._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(m(188));
      a = Object.keys(a).join(",");
      throw Error(m(268, a));
    }
    a = Aa(b);
    return null === a ? null : a.stateNode;
  }
  function li(a, b) {
    a = a.memoizedState;
    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }
  function mi(a, b) {
    li(a, b);
    (a = a.alternate) && li(a, b);
  }
  function ni(a) {
    a = Aa(a);
    return null === a ? null : a.stateNode;
  }
  function oi() {
    return null;
  }
  exports.attemptContinuousHydration = function (a) {
    if (13 === a.tag) {
      var b = Td(a, 134217728);
      if (null !== b) {
        var c = I();
        ge(b, a, 134217728, c);
      }
      mi(a, 134217728);
    }
  };
  exports.attemptDiscreteHydration = function (a) {
    if (13 === a.tag) {
      var b = Td(a, 1);
      if (null !== b) {
        var c = I();
        ge(b, a, 1, c);
      }
      mi(a, 1);
    }
  };
  exports.attemptHydrationAtCurrentPriority = function (a) {
    if (13 === a.tag) {
      var b = fe(a),
        c = Td(a, b);
      if (null !== c) {
        var d = I();
        ge(c, a, b, d);
      }
      mi(a, b);
    }
  };
  exports.attemptSynchronousHydration = function (a) {
    switch (a.tag) {
      case 3:
        var b = a.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c = yc(b.pendingLanes);
          0 !== c && (Hc(b, c | 1), Lh(b, D()), 0 === (H & 6) && (Ch(), ad()));
        }
        break;
      case 13:
        Yh(function () {
          var b = Td(a, 1);
          if (null !== b) {
            var c = I();
            ge(b, a, 1, c);
          }
        }), mi(a, 1);
    }
  };
  exports.batchedUpdates = function (a, b) {
    var c = H;
    H |= 1;
    try {
      return a(b);
    } finally {
      H = c, 0 === H && (Ch(), Xc && ad());
    }
  };
  exports.createComponentSelector = function (a) {
    return {
      $$typeof: ih,
      value: a
    };
  };
  exports.createContainer = function (a, b, c, d, e, f, g) {
    return ii(a, b, !1, null, c, d, e, f, g);
  };
  exports.createHasPseudoClassSelector = function (a) {
    return {
      $$typeof: jh,
      value: a
    };
  };
  exports.createHydrationContainer = function (a, b, c, d, e, f, g, h, k) {
    a = ii(c, d, !0, a, e, f, g, h, k);
    a.context = ji(null);
    c = a.current;
    d = I();
    e = fe(c);
    f = Xd(d, e);
    f.callback = void 0 !== b && null !== b ? b : null;
    Yd(c, f, e);
    a.current.lanes = e;
    Fc(a, e, d);
    Lh(a, d);
    return a;
  };
  exports.createPortal = function (a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: fa,
      key: null == d ? null : "" + d,
      children: a,
      containerInfo: b,
      implementation: c
    };
  };
  exports.createRoleSelector = function (a) {
    return {
      $$typeof: kh,
      value: a
    };
  };
  exports.createTestNameSelector = function (a) {
    return {
      $$typeof: lh,
      value: a
    };
  };
  exports.createTextSelector = function (a) {
    return {
      $$typeof: mh,
      value: a
    };
  };
  exports.deferredUpdates = function (a) {
    var b = C,
      c = W.transition;
    try {
      return W.transition = null, C = 16, a();
    } finally {
      C = b, W.transition = c;
    }
  };
  exports.discreteUpdates = function (a, b, c, d, e) {
    var f = C,
      g = W.transition;
    try {
      return W.transition = null, C = 1, a(b, c, d, e);
    } finally {
      C = f, W.transition = g, 0 === H && Ch();
    }
  };
  exports.findAllNodes = sh;
  exports.findBoundingRects = function (a, b) {
    if (!bb) throw Error(m(363));
    b = sh(a, b);
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
  exports.findHostInstance = ki;
  exports.findHostInstanceWithNoPortals = function (a) {
    a = ya(a);
    a = null !== a ? Ca(a) : null;
    return null === a ? null : a.stateNode;
  };
  exports.findHostInstanceWithWarning = function (a) {
    return ki(a);
  };
  exports.flushControlled = function (a) {
    var b = H;
    H |= 1;
    var c = W.transition,
      d = C;
    try {
      W.transition = null, C = 1, a();
    } finally {
      C = d, W.transition = c, H = b, 0 === H && (Ch(), ad());
    }
  };
  exports.flushPassiveEffects = Ph;
  exports.flushSync = Yh;
  exports.focusWithin = function (a, b) {
    if (!bb) throw Error(m(363));
    a = oh(a);
    b = rh(a, b);
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
  exports.getCurrentUpdatePriority = function () {
    return C;
  };
  exports.getFindAllNodesFailureDescription = function (a, b) {
    if (!bb) throw Error(m(363));
    var c = 0,
      d = [];
    a = [oh(a), 0];
    for (var e = 0; e < a.length;) {
      var f = a[e++],
        g = a[e++],
        h = b[g];
      if (5 !== f.tag || !fb(f)) if (ph(f, h) && (d.push(qh(h)), g++, g > c && (c = g)), g < b.length) for (f = f.child; null !== f;) {
        a.push(f, g), f = f.sibling;
      }
    }
    if (c < b.length) {
      for (a = []; c < b.length; c++) {
        a.push(qh(b[c]));
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
        return Ea(a.child.stateNode);
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
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: da.ReactCurrentDispatcher,
      findHostInstanceByFiber: ni,
      findFiberByHostInstance: a.findFiberByHostInstance || oi,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.2.0"
    };
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) a = !1;else {
      var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (b.isDisabled || !b.supportsFiber) a = !0;else {
        try {
          Rc = b.inject(a), Sc = b;
        } catch (c) {}
        a = b.checkDCE ? !0 : !1;
      }
    }
    return a;
  };
  exports.isAlreadyRendering = function () {
    return !1;
  };
  exports.observeVisibleRects = function (a, b, c, d) {
    if (!bb) throw Error(m(363));
    a = sh(a, b);
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
    var c = C;
    try {
      return C = a, b();
    } finally {
      C = c;
    }
  };
  exports.shouldError = function () {
    return null;
  };
  exports.shouldSuspend = function () {
    return !1;
  };
  exports.updateContainer = function (a, b, c, d) {
    var e = b.current,
      f = I(),
      g = fe(e);
    c = ji(c);
    null === b.context ? b.context = c : b.pendingContext = c;
    b = Xd(f, g);
    b.payload = {
      element: a
    };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    a = Yd(e, b, g);
    null !== a && (ge(a, e, g, f), Zd(a, e, g));
    return g;
  };
  return exports;
};

/***/ }),

/***/ "./node_modules/react-reconciler/constants.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/react-reconciler/cjs/react-reconciler-constants.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/react-reconciler/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/react-reconciler/cjs/react-reconciler.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/react/cjs/react-jsx-runtime.production.min.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var f = __webpack_require__("./node_modules/react/index.js"),
  k = Symbol["for"]("react.element"),
  l = Symbol["for"]("react.fragment"),
  m = Object.prototype.hasOwnProperty,
  n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  p = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function q(c, a, g) {
  var b,
    d = {},
    e = null,
    h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) {
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  }
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) {
    void 0 === d[b] && (d[b] = a[b]);
  }
  return {
    $$typeof: k,
    type: c,
    key: e,
    ref: h,
    props: d,
    _owner: n.current
  };
}
exports.Fragment = l;
exports.jsx = q;
exports.jsxs = q;

/***/ }),

/***/ "./node_modules/react/cjs/react.production.min.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var l = Symbol["for"]("react.element"),
  n = Symbol["for"]("react.portal"),
  p = Symbol["for"]("react.fragment"),
  q = Symbol["for"]("react.strict_mode"),
  r = Symbol["for"]("react.profiler"),
  t = Symbol["for"]("react.provider"),
  u = Symbol["for"]("react.context"),
  v = Symbol["for"]("react.forward_ref"),
  w = Symbol["for"]("react.suspense"),
  x = Symbol["for"]("react.memo"),
  y = Symbol["for"]("react.lazy"),
  z = Symbol.iterator;
function A(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z && a[z] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B = {
    isMounted: function isMounted() {
      return !1;
    },
    enqueueForceUpdate: function enqueueForceUpdate() {},
    enqueueReplaceState: function enqueueReplaceState() {},
    enqueueSetState: function enqueueSetState() {}
  },
  C = Object.assign,
  D = {};
function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = e || B;
}
E.prototype.isReactComponent = {};
E.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {}
F.prototype = E.prototype;
function G(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = e || B;
}
var H = G.prototype = new F();
H.constructor = G;
C(H, E.prototype);
H.isPureReactComponent = !0;
var I = Array.isArray,
  J = Object.prototype.hasOwnProperty,
  K = {
    current: null
  },
  L = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function M(a, b, e) {
  var d,
    c = {},
    k = null,
    h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) {
    J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
  }
  var g = arguments.length - 2;
  if (1 === g) c.children = e;else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++) {
      f[m] = arguments[m + 2];
    }
    c.children = f;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) {
    void 0 === c[d] && (c[d] = g[d]);
  }
  return {
    $$typeof: l,
    type: a,
    key: k,
    ref: h,
    props: c,
    _owner: K.current
  };
}
function N(a, b) {
  return {
    $$typeof: l,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}
function O(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l;
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
var P = /\/+/g;
function Q(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R(a, b, e, d, c) {
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
        case l:
        case n:
          h = !0;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function (a) {
    return a;
  })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I(a)) for (var g = 0; g < a.length; g++) {
    k = a[g];
    var f = d + Q(k, g);
    h += R(k, b, e, f, c);
  } else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) {
    k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
  } else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S(a, b, e) {
  if (null == a) return a;
  var d = [],
    c = 0;
  R(a, d, "", "", function (a) {
    return b.call(e, a, c++);
  });
  return d;
}
function T(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function (b) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
    }, function (b) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result["default"];
  throw a._result;
}
var U = {
    current: null
  },
  V = {
    transition: null
  },
  W = {
    ReactCurrentDispatcher: U,
    ReactCurrentBatchConfig: V,
    ReactCurrentOwner: K
  };
exports.Children = {
  map: S,
  forEach: function forEach(a, b, e) {
    S(a, function () {
      b.apply(this, arguments);
    }, e);
  },
  count: function count(a) {
    var b = 0;
    S(a, function () {
      b++;
    });
    return b;
  },
  toArray: function toArray(a) {
    return S(a, function (a) {
      return a;
    }) || [];
  },
  only: function only(a) {
    if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  }
};
exports.Component = E;
exports.Fragment = p;
exports.Profiler = r;
exports.PureComponent = G;
exports.StrictMode = q;
exports.Suspense = w;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
exports.cloneElement = function (a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C({}, a.props),
    c = a.key,
    k = a.ref,
    h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = K.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f in b) {
      J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    g = Array(f);
    for (var m = 0; m < f; m++) {
      g[m] = arguments[m + 2];
    }
    d.children = g;
  }
  return {
    $$typeof: l,
    type: a.type,
    key: c,
    ref: k,
    props: d,
    _owner: h
  };
};
exports.createContext = function (a) {
  a = {
    $$typeof: u,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
    _defaultValue: null,
    _globalName: null
  };
  a.Provider = {
    $$typeof: t,
    _context: a
  };
  return a.Consumer = a;
};
exports.createElement = M;
exports.createFactory = function (a) {
  var b = M.bind(null, a);
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
    $$typeof: v,
    render: a
  };
};
exports.isValidElement = O;
exports.lazy = function (a) {
  return {
    $$typeof: y,
    _payload: {
      _status: -1,
      _result: a
    },
    _init: T
  };
};
exports.memo = function (a, b) {
  return {
    $$typeof: x,
    type: a,
    compare: void 0 === b ? null : b
  };
};
exports.startTransition = function (a) {
  var b = V.transition;
  V.transition = {};
  try {
    a();
  } finally {
    V.transition = b;
  }
};
exports.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
exports.useCallback = function (a, b) {
  return U.current.useCallback(a, b);
};
exports.useContext = function (a) {
  return U.current.useContext(a);
};
exports.useDebugValue = function () {};
exports.useDeferredValue = function (a) {
  return U.current.useDeferredValue(a);
};
exports.useEffect = function (a, b) {
  return U.current.useEffect(a, b);
};
exports.useId = function () {
  return U.current.useId();
};
exports.useImperativeHandle = function (a, b, e) {
  return U.current.useImperativeHandle(a, b, e);
};
exports.useInsertionEffect = function (a, b) {
  return U.current.useInsertionEffect(a, b);
};
exports.useLayoutEffect = function (a, b) {
  return U.current.useLayoutEffect(a, b);
};
exports.useMemo = function (a, b) {
  return U.current.useMemo(a, b);
};
exports.useReducer = function (a, b, e) {
  return U.current.useReducer(a, b, e);
};
exports.useRef = function (a) {
  return U.current.useRef(a);
};
exports.useState = function (a) {
  return U.current.useState(a);
};
exports.useSyncExternalStore = function (a, b, e) {
  return U.current.useSyncExternalStore(a, b, e);
};
exports.useTransition = function () {
  return U.current.useTransition();
};
exports.version = "18.2.0";

/***/ }),

/***/ "./node_modules/react/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/react/cjs/react.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var e = __webpack_require__("./node_modules/react/index.js");
function h(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var k = "function" === typeof Object.is ? Object.is : h,
  l = e.useState,
  m = e.useEffect,
  n = e.useLayoutEffect,
  p = e.useDebugValue;
function q(a, b) {
  var d = b(),
    f = l({
      inst: {
        value: d,
        getSnapshot: b
      }
    }),
    c = f[0].inst,
    g = f[1];
  n(function () {
    c.value = d;
    c.getSnapshot = b;
    r(c) && g({
      inst: c
    });
  }, [a, d, b]);
  m(function () {
    r(c) && g({
      inst: c
    });
    return a(function () {
      r(c) && g({
        inst: c
      });
    });
  }, [a]);
  p(d);
  return d;
}
function r(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var d = b();
    return !k(a, d);
  } catch (f) {
    return !0;
  }
}
function t(a, b) {
  return b();
}
var u = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t : q;
exports.useSyncExternalStore = void 0 !== e.useSyncExternalStore ? e.useSyncExternalStore : u;

/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.min.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var h = __webpack_require__("./node_modules/react/index.js"),
  n = __webpack_require__("./node_modules/use-sync-external-store/shim/index.js");
function p(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var q = "function" === typeof Object.is ? Object.is : p,
  r = n.useSyncExternalStore,
  t = h.useRef,
  u = h.useEffect,
  v = h.useMemo,
  w = h.useDebugValue;
exports.useSyncExternalStoreWithSelector = function (a, b, e, l, g) {
  var c = t(null);
  if (null === c.current) {
    var f = {
      hasValue: !1,
      value: null
    };
    c.current = f;
  } else f = c.current;
  c = v(function () {
    function a(a) {
      if (!c) {
        c = !0;
        d = a;
        a = l(a);
        if (void 0 !== g && f.hasValue) {
          var b = f.value;
          if (g(b, a)) return k = b;
        }
        return k = a;
      }
      b = k;
      if (q(d, a)) return b;
      var e = l(a);
      if (void 0 !== g && g(b, e)) return b;
      d = a;
      return k = e;
    }
    var c = !1,
      d,
      k,
      m = void 0 === e ? null : e;
    return [function () {
      return a(b());
    }, null === m ? void 0 : function () {
      return a(m());
    }];
  }, [b, e, l, g]);
  var d = r(a, c[0], c[1]);
  u(function () {
    f.hasValue = !0;
    f.value = d;
  }, [d]);
  w(d);
  return d;
};

/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.production.min.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var g = __webpack_require__("./node_modules/react/index.js");
function n(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var p = "function" === typeof Object.is ? Object.is : n,
  q = g.useSyncExternalStore,
  r = g.useRef,
  t = g.useEffect,
  u = g.useMemo,
  v = g.useDebugValue;
exports.useSyncExternalStoreWithSelector = function (a, b, e, l, h) {
  var c = r(null);
  if (null === c.current) {
    var f = {
      hasValue: !1,
      value: null
    };
    c.current = f;
  } else f = c.current;
  c = u(function () {
    function a(a) {
      if (!c) {
        c = !0;
        d = a;
        a = l(a);
        if (void 0 !== h && f.hasValue) {
          var b = f.value;
          if (h(b, a)) return k = b;
        }
        return k = a;
      }
      b = k;
      if (p(d, a)) return b;
      var e = l(a);
      if (void 0 !== h && h(b, e)) return b;
      d = a;
      return k = e;
    }
    var c = !1,
      d,
      k,
      m = void 0 === e ? null : e;
    return [function () {
      return a(b());
    }, null === m ? void 0 : function () {
      return a(m());
    }];
  }, [b, e, l, h]);
  var d = q(a, c[0], c[1]);
  t(function () {
    f.hasValue = !0;
    f.value = d;
  }, [d]);
  v(d);
  return d;
};

/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/with-selector.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/use-sync-external-store/with-selector.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.production.min.js");
} else {}

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/index.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./src/inventory/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.inventory_host__UCXnh{position:absolute;left:10px;top:10px;width:380px;height:500px;overflow:hidden;border-radius:10px}.inventory_border__s9lfm{border-width:10px;border-color:#adadad;border-radius:10px;pointer-events:none;width:100%;height:100%;position:absolute}.inventory_frame__V3ron{padding:10px;flex-grow:1;max-height:100%;flex-direction:column;width:390px}.inventory_items__XwhLG{flex-direction:row;flex-wrap:wrap;padding:4px;background-color:#adadad}.inventory_itemSlot__69\\+HS{margin:4px;border-radius:4px;flex:0;width:80px;padding:5px;height:80px;background-color:#cacaca;border-width:2px;border-color:#9c9c9c;box-shadow:1px 1px 5px 5px 5px #000}.inventory_itemSlot__69\\+HS:hover{background-color:#ddd}.inventory_item__RGSof image{object-fit:fill}`, ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": `inventory_host__UCXnh`,
	"border": `inventory_border__s9lfm`,
	"frame": `inventory_frame__V3ron`,
	"items": `inventory_items__XwhLG`,
	"itemSlot": `inventory_itemSlot__69+HS`,
	"item": `inventory_item__RGSof`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
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
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
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
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/@reactunity/renderer/dist/index.js
var dist = __webpack_require__("./node_modules/@reactunity/renderer/dist/index.js");
// EXTERNAL MODULE: ./node_modules/use-sync-external-store/shim/index.js
var shim = __webpack_require__("./node_modules/use-sync-external-store/shim/index.js");
// EXTERNAL MODULE: ./node_modules/use-sync-external-store/shim/with-selector.js
var with_selector = __webpack_require__("./node_modules/use-sync-external-store/shim/with-selector.js");
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
;// CONCATENATED MODULE: ./node_modules/react-redux/es/components/Context.js

var ContextKey = Symbol["for"]("react-redux-context");
var gT = typeof globalThis !== "undefined" ? globalThis : /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
{};
function getContext() {
  var _gT$ContextKey;
  if (!react.createContext) return {};
  var contextMap = (_gT$ContextKey = gT[ContextKey]) != null ? _gT$ContextKey : gT[ContextKey] = new Map();
  var realContext = contextMap.get(react.createContext);
  if (!realContext) {
    realContext = react.createContext(null);
    if (false) {}
    contextMap.set(react.createContext, realContext);
  }
  return realContext;
}
var Context_ReactReduxContext = /*#__PURE__*/getContext();
/* harmony default export */ const Context = ((/* unused pure expression or super */ null && (Context_ReactReduxContext)));
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useReduxContext.js



/**
 * Hook factory, which creates a `useReduxContext` hook bound to a given context. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useReduxContext` hook bound to the specified context.
 */
function createReduxContextHook() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Context_ReactReduxContext;
  return function useReduxContext() {
    var contextValue = (0,react.useContext)(context);
    if (false) {}
    return contextValue;
  };
}
/**
 * A hook to access the value of the `ReactReduxContext`. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @returns {any} the value of the `ReactReduxContext`
 *
 * @example
 *
 * import React from 'react'
 * import { useReduxContext } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */

var useReduxContext_useReduxContext = /*#__PURE__*/createReduxContextHook();
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/useSyncExternalStore.js
var useSyncExternalStore_notInitialized = function notInitialized() {
  throw new Error('uSES not initialized!');
};
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useSelector.js





var useSyncExternalStoreWithSelector = useSyncExternalStore_notInitialized;
var initializeUseSelector = function initializeUseSelector(fn) {
  useSyncExternalStoreWithSelector = fn;
};
var refEquality = function refEquality(a, b) {
  return a === b;
};
/**
 * Hook factory, which creates a `useSelector` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useSelector` hook bound to the specified context.
 */

function createSelectorHook() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Context_ReactReduxContext;
  var useReduxContext = context === Context_ReactReduxContext ? useReduxContext_useReduxContext : createReduxContextHook(context);
  return function useSelector(selector) {
    var equalityFnOrOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _ref = typeof equalityFnOrOptions === 'function' ? {
        equalityFn: equalityFnOrOptions
      } : equalityFnOrOptions,
      _ref$equalityFn = _ref.equalityFn,
      equalityFn = _ref$equalityFn === void 0 ? refEquality : _ref$equalityFn,
      _ref$stabilityCheck = _ref.stabilityCheck,
      stabilityCheck = _ref$stabilityCheck === void 0 ? undefined : _ref$stabilityCheck,
      _ref$noopCheck = _ref.noopCheck,
      noopCheck = _ref$noopCheck === void 0 ? undefined : _ref$noopCheck;
    if (false) {}
    var _useReduxContext = useReduxContext(),
      store = _useReduxContext.store,
      subscription = _useReduxContext.subscription,
      getServerState = _useReduxContext.getServerState,
      globalStabilityCheck = _useReduxContext.stabilityCheck,
      globalNoopCheck = _useReduxContext.noopCheck;
    var firstRun = (0,react.useRef)(true);
    var wrappedSelector = (0,react.useCallback)(_defineProperty({}, selector.name, function (state) {
      var selected = selector(state);
      if (false) { var finalNoopCheck, toCompare, finalStabilityCheck; }
      return selected;
    })[selector.name], [selector, globalStabilityCheck, stabilityCheck]);
    var selectedState = useSyncExternalStoreWithSelector(subscription.addNestedSub, store.getState, getServerState || store.getState, wrappedSelector, equalityFn);
    (0,react.useDebugValue)(selectedState);
    return selectedState;
  };
}
/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {Function} selector the selector function
 * @param {Function=} equalityFn the function that will be used to determine equality
 *
 * @returns {any} the selected state
 *
 * @example
 *
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const counter = useSelector(state => state.counter)
 *   return <div>{counter}</div>
 * }
 */

var useSelector = /*#__PURE__*/createSelectorHook();
// EXTERNAL MODULE: ../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__("../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
// EXTERNAL MODULE: ../node_modules/react-is/index.js
var react_is = __webpack_require__("../node_modules/react-is/index.js");
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/batch.js
// Default to a dummy "batch" implementation that just runs the callback
function defaultNoopBatch(callback) {
  callback();
}
var batch = defaultNoopBatch; // Allow injecting another batching function later

var setBatch = function setBatch(newBatch) {
  return batch = newBatch;
}; // Supply a getter just to skip dealing with ESM bindings

var getBatch = function getBatch() {
  return batch;
};
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/Subscription.js
 // encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

function createListenerCollection() {
  var batch = getBatch();
  var first = null;
  var last = null;
  return {
    clear: function clear() {
      first = null;
      last = null;
    },
    notify: function notify() {
      batch(function () {
        var listener = first;
        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get: function get() {
      var listeners = [];
      var listener = first;
      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }
      return listeners;
    },
    subscribe: function subscribe(callback) {
      var isSubscribed = true;
      var listener = last = {
        callback: callback,
        next: null,
        prev: last
      };
      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }
      return function unsubscribe() {
        if (!isSubscribed || first === null) return;
        isSubscribed = false;
        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }
        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }
  };
}
var nullListeners = {
  notify: function notify() {},
  get: function get() {
    return [];
  }
};
function Subscription_createSubscription(store, parentSub) {
  var unsubscribe;
  var listeners = nullListeners;
  function addNestedSub(listener) {
    trySubscribe();
    return listeners.subscribe(listener);
  }
  function notifyNestedSubs() {
    listeners.notify();
  }
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }
  function isSubscribed() {
    return Boolean(unsubscribe);
  }
  function trySubscribe() {
    if (!unsubscribe) {
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = undefined;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  var subscription = {
    addNestedSub: addNestedSub,
    notifyNestedSubs: notifyNestedSubs,
    handleChangeWrapper: handleChangeWrapper,
    isSubscribed: isSubscribed,
    trySubscribe: trySubscribe,
    tryUnsubscribe: tryUnsubscribe,
    getListeners: function getListeners() {
      return listeners;
    }
  };
  return subscription;
}
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/useIsomorphicLayoutEffect.js
 // React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
// subscription callback always has the selector from the latest render commit
// available, otherwise a store update may happen between render and the effect,
// which may cause missed updates; we also must ensure the store subscription
// is created synchronously, otherwise a store update may occur before the
// subscription is created and an inconsistent state may be observed
// Matches logic in React's `shared/ExecutionEnvironment` file

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');
var useIsomorphicLayoutEffect_useIsomorphicLayoutEffect = canUseDOM ? react.useLayoutEffect : react.useEffect;
;// CONCATENATED MODULE: ./node_modules/react-redux/es/components/connect.js




var _excluded = (/* unused pure expression or super */ null && (["reactReduxForwardedRef"]));

/* eslint-disable valid-jsdoc, @typescript-eslint/no-unused-vars */













var useSyncExternalStore = (/* unused pure expression or super */ null && (notInitialized));
var initializeConnect = function initializeConnect(fn) {
  useSyncExternalStore = fn;
}; // Define some constant arrays just to avoid re-creating these

var EMPTY_ARRAY = (/* unused pure expression or super */ null && ([null, 0]));
var NO_SUBSCRIPTION_ARRAY = (/* unused pure expression or super */ null && ([null, null])); // Attempts to stringify whatever not-really-a-component value we were given
// for logging in an error message

var stringifyComponent = function stringifyComponent(Comp) {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};

// This is "just" a `useLayoutEffect`, but with two modifications:
// - we need to fall back to `useEffect` in SSR to avoid annoying warnings
// - we extract this to a separate function to avoid closing over values
//   and causing memory leaks
function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
  useIsomorphicLayoutEffect(function () {
    return effectFunc.apply(void 0, _toConsumableArray(effectArgs));
  }, dependencies);
} // Effect callback, extracted: assign the latest props values to refs for later usage

function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps,
// actualChildProps: unknown,
childPropsFromStoreUpdate, notifyNestedSubs) {
  // We want to capture the wrapper props and child props we used for later comparisons
  lastWrapperProps.current = wrapperProps;
  renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null;
    notifyNestedSubs();
  }
} // Effect callback, extracted: subscribe to the Redux store or nearest connected ancestor,
// check for updates after dispatched actions, and trigger re-renders.

function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs,
// forceComponentUpdateDispatch: React.Dispatch<any>,
additionalSubscribeListener) {
  // If we're not subscribed to the store, nothing to do here
  if (!shouldHandleStateChanges) return function () {}; // Capture values for checking if and when this component unmounts

  var didUnsubscribe = false;
  var lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component

  var checkForUpdates = function checkForUpdates() {
    if (didUnsubscribe || !isMounted.current) {
      // Don't run stale listeners.
      // Redux doesn't guarantee unsubscriptions happen until next dispatch.
      return;
    } // TODO We're currently calling getState ourselves here, rather than letting `uSES` do it

    var latestStoreState = store.getState();
    var newChildProps, error;
    try {
      // Actually run the selector with the most recent store state and wrapper props
      // to determine what the child props should be
      newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
    } catch (e) {
      error = e;
      lastThrownError = e;
    }
    if (!error) {
      lastThrownError = null;
    } // If the child props haven't changed, nothing to do here - cascade the subscription update

    if (newChildProps === lastChildProps.current) {
      if (!renderIsScheduled.current) {
        notifyNestedSubs();
      }
    } else {
      // Save references to the new child props.  Note that we track the "child props from store update"
      // as a ref instead of a useState/useReducer because we need a way to determine if that value has
      // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
      // forcing another re-render, which we don't want.
      lastChildProps.current = newChildProps;
      childPropsFromStoreUpdate.current = newChildProps;
      renderIsScheduled.current = true; // TODO This is hacky and not how `uSES` is meant to be used
      // Trigger the React `useSyncExternalStore` subscriber

      additionalSubscribeListener();
    }
  }; // Actually subscribe to the nearest connected ancestor (or store)

  subscription.onStateChange = checkForUpdates;
  subscription.trySubscribe(); // Pull data from the store after first render in case the store has
  // changed since we began.

  checkForUpdates();
  var unsubscribeWrapper = function unsubscribeWrapper() {
    didUnsubscribe = true;
    subscription.tryUnsubscribe();
    subscription.onStateChange = null;
    if (lastThrownError) {
      // It's possible that we caught an error due to a bad mapState function, but the
      // parent re-rendered without this component and we're about to unmount.
      // This shouldn't happen as long as we do top-down subscriptions correctly, but
      // if we ever do those wrong, this throw will surface the error in our tests.
      // In that case, throw the error from here so it doesn't get lost.
      throw lastThrownError;
    }
  };
  return unsubscribeWrapper;
} // Reducer initial state creation for our update reducer

var initStateUpdates = function initStateUpdates() {
  return EMPTY_ARRAY;
};
function strictEqual(a, b) {
  return a === b;
}
/**
 * Infers the type of props that a connector will inject into a component.
 */

var hasWarnedAboutDeprecatedPureOption = false;
/**
 * Connects a React component to a Redux store.
 *
 * - Without arguments, just wraps the component, without changing the behavior / props
 *
 * - If 2 params are passed (3rd param, mergeProps, is skipped), default behavior
 * is to override ownProps (as stated in the docs), so what remains is everything that's
 * not a state or dispatch prop
 *
 * - When 3rd param is passed, we don't know if ownProps propagate and whether they
 * should be valid component props, because it depends on mergeProps implementation.
 * As such, it is the user's responsibility to extend ownProps interface from state or
 * dispatch props or both when applicable
 *
 * @param mapStateToProps A function that extracts values from state
 * @param mapDispatchToProps Setup for dispatching actions
 * @param mergeProps Optional callback to merge state and dispatch props together
 * @param options Options for configuring the connection
 *
 */

function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
    pure = _ref.pure,
    _ref$areStatesEqual = _ref.areStatesEqual,
    areStatesEqual = _ref$areStatesEqual === void 0 ? strictEqual : _ref$areStatesEqual,
    _ref$areOwnPropsEqual = _ref.areOwnPropsEqual,
    areOwnPropsEqual = _ref$areOwnPropsEqual === void 0 ? shallowEqual : _ref$areOwnPropsEqual,
    _ref$areStatePropsEqu = _ref.areStatePropsEqual,
    areStatePropsEqual = _ref$areStatePropsEqu === void 0 ? shallowEqual : _ref$areStatePropsEqu,
    _ref$areMergedPropsEq = _ref.areMergedPropsEqual,
    areMergedPropsEqual = _ref$areMergedPropsEq === void 0 ? shallowEqual : _ref$areMergedPropsEq,
    _ref$forwardRef = _ref.forwardRef,
    forwardRef = _ref$forwardRef === void 0 ? false : _ref$forwardRef,
    _ref$context = _ref.context,
    context = _ref$context === void 0 ? ReactReduxContext : _ref$context;
  if (false) {}
  var Context = context;
  var initMapStateToProps = mapStateToPropsFactory(mapStateToProps);
  var initMapDispatchToProps = mapDispatchToPropsFactory(mapDispatchToProps);
  var initMergeProps = mergePropsFactory(mergeProps);
  var shouldHandleStateChanges = Boolean(mapStateToProps);
  var wrapWithConnect = function wrapWithConnect(WrappedComponent) {
    if (false) {}
    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var displayName = "Connect(".concat(wrappedComponentName, ")");
    var selectorFactoryOptions = {
      shouldHandleStateChanges: shouldHandleStateChanges,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent,
      // @ts-ignore
      initMapStateToProps: initMapStateToProps,
      // @ts-ignore
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      areStatesEqual: areStatesEqual,
      areStatePropsEqual: areStatePropsEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    };
    function ConnectFunction(props) {
      var _React$useMemo = React.useMemo(function () {
          // Distinguish between actual "data" props that were passed to the wrapper component,
          // and values needed to control behavior (forwarded refs, alternate context instances).
          // To maintain the wrapperProps object reference, memoize this destructuring.
          var reactReduxForwardedRef = props.reactReduxForwardedRef,
            wrapperProps = _objectWithoutPropertiesLoose(props, _excluded);
          return [props.context, reactReduxForwardedRef, wrapperProps];
        }, [props]),
        _React$useMemo2 = _slicedToArray(_React$useMemo, 3),
        propsContext = _React$useMemo2[0],
        reactReduxForwardedRef = _React$useMemo2[1],
        wrapperProps = _React$useMemo2[2];
      var ContextToUse = React.useMemo(function () {
        // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
        // Memoize the check that determines which context instance we should use.
        return propsContext && propsContext.Consumer &&
        // @ts-ignore
        isContextConsumer( /*#__PURE__*/React.createElement(propsContext.Consumer, null)) ? propsContext : Context;
      }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available

      var contextValue = React.useContext(ContextToUse); // The store _must_ exist as either a prop or in context.
      // We'll check to see if it _looks_ like a Redux store first.
      // This allows us to pass through a `store` prop that is just a plain value.

      var didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
      var didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
      if (false) {} // Based on the previous check, one of these must be true

      var store = didStoreComeFromProps ? props.store : contextValue.store;
      var getServerState = didStoreComeFromContext ? contextValue.getServerState : store.getState;
      var childPropsSelector = React.useMemo(function () {
        // The child props selector needs the store reference as an input.
        // Re-create this selector whenever the store changes.
        return defaultSelectorFactory(store.dispatch, selectorFactoryOptions);
      }, [store]);
      var _React$useMemo3 = React.useMemo(function () {
          if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
          // connected to the store via props shouldn't use subscription from context, or vice versa.

          // This Subscription's source should match where store came from: props vs. context. A component
          // connected to the store via props shouldn't use subscription from context, or vice versa.

          var subscription = createSubscription(store, didStoreComeFromProps ? undefined : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
          // the middle of the notification loop, where `subscription` will then be null. This can
          // probably be avoided if Subscription's listeners logic is changed to not call listeners
          // that have been unsubscribed in the  middle of the notification loop.

          // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
          // the middle of the notification loop, where `subscription` will then be null. This can
          // probably be avoided if Subscription's listeners logic is changed to not call listeners
          // that have been unsubscribed in the  middle of the notification loop.

          var notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
          return [subscription, notifyNestedSubs];
        }, [store, didStoreComeFromProps, contextValue]),
        _React$useMemo4 = _slicedToArray(_React$useMemo3, 2),
        subscription = _React$useMemo4[0],
        notifyNestedSubs = _React$useMemo4[1]; // Determine what {store, subscription} value should be put into nested context, if necessary,
      // and memoize that value to avoid unnecessary context updates.

      var overriddenContextValue = React.useMemo(function () {
        if (didStoreComeFromProps) {
          // This component is directly subscribed to a store from props.
          // We don't want descendants reading from this store - pass down whatever
          // the existing context value is from the nearest connected ancestor.
          return contextValue;
        } // Otherwise, put this component's subscription instance into context, so that
        // connected descendants won't update until after this component is done

        return _extends({}, contextValue, {
          subscription: subscription
        });
      }, [didStoreComeFromProps, contextValue, subscription]); // Set up refs to coordinate values between the subscription effect and the render logic

      var lastChildProps = React.useRef();
      var lastWrapperProps = React.useRef(wrapperProps);
      var childPropsFromStoreUpdate = React.useRef();
      var renderIsScheduled = React.useRef(false);
      var isProcessingDispatch = React.useRef(false);
      var isMounted = React.useRef(false);
      var latestSubscriptionCallbackError = React.useRef();
      useIsomorphicLayoutEffect(function () {
        isMounted.current = true;
        return function () {
          isMounted.current = false;
        };
      }, []);
      var actualChildPropsSelector = React.useMemo(function () {
        var selector = function selector() {
          // Tricky logic here:
          // - This render may have been triggered by a Redux store update that produced new child props
          // - However, we may have gotten new wrapper props after that
          // If we have new child props, and the same wrapper props, we know we should use the new child props as-is.
          // But, if we have new wrapper props, those might change the child props, so we have to recalculate things.
          // So, we'll use the child props from store update only if the wrapper props are the same as last time.
          if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
            return childPropsFromStoreUpdate.current;
          } // TODO We're reading the store directly in render() here. Bad idea?
          // This will likely cause Bad Things (TM) to happen in Concurrent Mode.
          // Note that we do this because on renders _not_ caused by store updates, we need the latest store state
          // to determine what the child props should be.

          return childPropsSelector(store.getState(), wrapperProps);
        };
        return selector;
      }, [store, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
      // about useLayoutEffect in SSR, so we try to detect environment and fall back to
      // just useEffect instead to avoid the warning, since neither will run anyway.

      var subscribeForReact = React.useMemo(function () {
        var subscribe = function subscribe(reactListener) {
          if (!subscription) {
            return function () {};
          }
          return subscribeUpdates(shouldHandleStateChanges, store, subscription,
          // @ts-ignore
          childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, reactListener);
        };
        return subscribe;
      }, [subscription]);
      useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, childPropsFromStoreUpdate, notifyNestedSubs]);
      var actualChildProps;
      try {
        actualChildProps = useSyncExternalStore(
        // TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
        subscribeForReact,
        // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
        // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
        actualChildPropsSelector, getServerState ? function () {
          return childPropsSelector(getServerState(), wrapperProps);
        } : actualChildPropsSelector);
      } catch (err) {
        if (latestSubscriptionCallbackError.current) {
          ;
          err.message += "\nThe error may be correlated with this previous error:\n".concat(latestSubscriptionCallbackError.current.stack, "\n\n");
        }
        throw err;
      }
      useIsomorphicLayoutEffect(function () {
        latestSubscriptionCallbackError.current = undefined;
        childPropsFromStoreUpdate.current = undefined;
        lastChildProps.current = actualChildProps;
      }); // Now that all that's done, we can finally try to actually render the child component.
      // We memoize the elements for the rendered child component as an optimization.

      var renderedWrappedComponent = React.useMemo(function () {
        return /*#__PURE__*/(
          // @ts-ignore
          React.createElement(WrappedComponent, _extends({}, actualChildProps, {
            ref: reactReduxForwardedRef
          }))
        );
      }, [reactReduxForwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
      // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.

      var renderedChild = React.useMemo(function () {
        if (shouldHandleStateChanges) {
          // If this component is subscribed to store updates, we need to pass its own
          // subscription instance down to our descendants. That means rendering the same
          // Context instance, and putting a different value into the context.
          return /*#__PURE__*/React.createElement(ContextToUse.Provider, {
            value: overriddenContextValue
          }, renderedWrappedComponent);
        }
        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
      return renderedChild;
    }
    var _Connect = React.memo(ConnectFunction);

    // Add a hacky cast to get the right output type
    var Connect = _Connect;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;
    if (forwardRef) {
      var _forwarded = React.forwardRef(function forwardConnectRef(props, ref) {
        // @ts-ignore
        return /*#__PURE__*/React.createElement(Connect, _extends({}, props, {
          reactReduxForwardedRef: ref
        }));
      });
      var forwarded = _forwarded;
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoistStatics(forwarded, WrappedComponent);
    }
    return hoistStatics(Connect, WrappedComponent);
  };
  return wrapWithConnect;
}
/* harmony default export */ const components_connect = ((/* unused pure expression or super */ null && (connect)));
;// CONCATENATED MODULE: ./node_modules/react-redux/es/components/Provider.js




function Provider(_ref) {
  var store = _ref.store,
    context = _ref.context,
    children = _ref.children,
    serverState = _ref.serverState,
    _ref$stabilityCheck = _ref.stabilityCheck,
    stabilityCheck = _ref$stabilityCheck === void 0 ? 'once' : _ref$stabilityCheck,
    _ref$noopCheck = _ref.noopCheck,
    noopCheck = _ref$noopCheck === void 0 ? 'once' : _ref$noopCheck;
  var contextValue = react.useMemo(function () {
    var subscription = Subscription_createSubscription(store);
    return {
      store: store,
      subscription: subscription,
      getServerState: serverState ? function () {
        return serverState;
      } : undefined,
      stabilityCheck: stabilityCheck,
      noopCheck: noopCheck
    };
  }, [store, serverState, stabilityCheck, noopCheck]);
  var previousState = react.useMemo(function () {
    return store.getState();
  }, [store]);
  useIsomorphicLayoutEffect_useIsomorphicLayoutEffect(function () {
    var subscription = contextValue.subscription;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();
    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }
    return function () {
      subscription.tryUnsubscribe();
      subscription.onStateChange = undefined;
    };
  }, [contextValue, previousState]);
  var Context = context || Context_ReactReduxContext; // @ts-ignore 'AnyAction' is assignable to the constraint of type 'A', but 'A' could be instantiated with a different subtype

  return /*#__PURE__*/react.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
/* harmony default export */ const components_Provider = (Provider);
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useStore.js


/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */

function createStoreHook() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Context_ReactReduxContext;
  var useReduxContext =
  // @ts-ignore
  context === Context_ReactReduxContext ? useReduxContext_useReduxContext :
  // @ts-ignore
  createReduxContextHook(context);
  return function useStore() {
    var _useReduxContext = useReduxContext(),
      store = _useReduxContext.store; // @ts-ignore

    return store;
  };
}
/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */

var useStore_useStore = /*#__PURE__*/createStoreHook();
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useDispatch.js


/**
 * Hook factory, which creates a `useDispatch` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useDispatch` hook bound to the specified context.
 */

function createDispatchHook() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Context_ReactReduxContext;
  var useStore =
  // @ts-ignore
  context === Context_ReactReduxContext ? useStore_useStore : createStoreHook(context);
  return function useDispatch() {
    var store = useStore(); // @ts-ignore

    return store.dispatch;
  };
}
/**
 * A hook to access the redux `dispatch` function.
 *
 * @returns {any|function} redux store's `dispatch` function
 *
 * @example
 *
 * import React, { useCallback } from 'react'
 * import { useDispatch } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const dispatch = useDispatch()
 *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
 *   return (
 *     <div>
 *       <span>{value}</span>
 *       <button onClick={increaseCounter}>Increase counter</button>
 *     </div>
 *   )
 * }
 */

var useDispatch = /*#__PURE__*/createDispatchHook();
;// CONCATENATED MODULE: ./node_modules/react-redux/es/exports.js









;// CONCATENATED MODULE: ./node_modules/react-redux/es/alternate-renderers.js
// The "alternate renderers" entry point is primarily here to fall back on a no-op
// version of `unstable_batchedUpdates`, for use with renderers other than ReactDOM/RN.
// Examples include React-Three-Fiber, Ink, etc.
// Because of that, we'll also assume the useSyncExternalStore compat shim is needed.




initializeUseSelector(with_selector.useSyncExternalStoreWithSelector);
initializeConnect(shim.useSyncExternalStore);
 // For other renderers besides ReactDOM and React Native,
// use the default noop batch function

var alternate_renderers_batch = getBatch();


;// CONCATENATED MODULE: ./node_modules/redux-persist/es/integration/react.js
function _typeof(obj) {
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
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
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
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
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
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function react_defineProperty(obj, key, value) {
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
 // eslint-disable-line import/no-unresolved

var PersistGate = /*#__PURE__*/
function (_PureComponent) {
  _inherits(PersistGate, _PureComponent);
  function PersistGate() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck(this, PersistGate);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PersistGate)).call.apply(_getPrototypeOf2, [this].concat(args)));
    react_defineProperty(_assertThisInitialized(_this), "state", {
      bootstrapped: false
    });
    react_defineProperty(_assertThisInitialized(_this), "_unsubscribe", void 0);
    react_defineProperty(_assertThisInitialized(_this), "handlePersistorState", function () {
      var persistor = _this.props.persistor;
      var _persistor$getState = persistor.getState(),
        bootstrapped = _persistor$getState.bootstrapped;
      if (bootstrapped) {
        if (_this.props.onBeforeLift) {
          Promise.resolve(_this.props.onBeforeLift())["finally"](function () {
            return _this.setState({
              bootstrapped: true
            });
          });
        } else {
          _this.setState({
            bootstrapped: true
          });
        }
        _this._unsubscribe && _this._unsubscribe();
      }
    });
    return _this;
  }
  _createClass(PersistGate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._unsubscribe = this.props.persistor.subscribe(this.handlePersistorState);
      this.handlePersistorState();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unsubscribe && this._unsubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      if (false) {}
      if (typeof this.props.children === 'function') {
        return this.props.children(this.state.bootstrapped);
      }
      return this.state.bootstrapped ? this.props.children : this.props.loading;
    }
  }]);
  return PersistGate;
}(react.PureComponent);
react_defineProperty(PersistGate, "defaultProps", {
  children: null,
  loading: null
});
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__("../node_modules/style-loader/dist/runtime/styleDomAPI.js");
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__("../node_modules/style-loader/dist/runtime/insertBySelector.js");
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__("../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__("../node_modules/style-loader/dist/runtime/insertStyleElement.js");
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__("../node_modules/style-loader/dist/runtime/styleTagTransform.js");
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/index.scss
var cjs_ruleSet_1_rules_0_oneOf_6_use_3_src = __webpack_require__("../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/index.scss");
;// CONCATENATED MODULE: ./src/index.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(cjs_ruleSet_1_rules_0_oneOf_6_use_3_src/* default */.Z, options);




       /* harmony default export */ const src = (cjs_ruleSet_1_rules_0_oneOf_6_use_3_src/* default */.Z && cjs_ruleSet_1_rules_0_oneOf_6_use_3_src/* default */.Z.locals ? cjs_ruleSet_1_rules_0_oneOf_6_use_3_src/* default */.Z.locals : undefined);

;// CONCATENATED MODULE: ./node_modules/immer/dist/immer.esm.mjs
function n(n) {
  for (var r = arguments.length, t = Array(r > 1 ? r - 1 : 0), e = 1; e < r; e++) {
    t[e - 1] = arguments[e];
  }
  if (false) { var i, o; }
  throw Error("[Immer] minified error nr: " + n + (t.length ? " " + t.map(function (n) {
    return "'" + n + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r(n) {
  return !!n && !!n[Q];
}
function t(n) {
  var r;
  return !!n && (function (n) {
    if (!n || "object" != typeof n) return !1;
    var r = Object.getPrototypeOf(n);
    if (null === r) return !0;
    var t = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
    return t === Object || "function" == typeof t && Function.toString.call(t) === Z;
  }(n) || Array.isArray(n) || !!n[L] || !!(null === (r = n.constructor) || void 0 === r ? void 0 : r[L]) || s(n) || v(n));
}
function e(t) {
  return r(t) || n(23, t), t[Q].t;
}
function i(n, r, t) {
  void 0 === t && (t = !1), 0 === o(n) ? (t ? Object.keys : nn)(n).forEach(function (e) {
    t && "symbol" == typeof e || r(e, n[e], n);
  }) : n.forEach(function (t, e) {
    return r(e, t, n);
  });
}
function o(n) {
  var r = n[Q];
  return r ? r.i > 3 ? r.i - 4 : r.i : Array.isArray(n) ? 1 : s(n) ? 2 : v(n) ? 3 : 0;
}
function u(n, r) {
  return 2 === o(n) ? n.has(r) : Object.prototype.hasOwnProperty.call(n, r);
}
function a(n, r) {
  return 2 === o(n) ? n.get(r) : n[r];
}
function f(n, r, t) {
  var e = o(n);
  2 === e ? n.set(r, t) : 3 === e ? n.add(t) : n[r] = t;
}
function c(n, r) {
  return n === r ? 0 !== n || 1 / n == 1 / r : n != n && r != r;
}
function s(n) {
  return X && n instanceof Map;
}
function v(n) {
  return q && n instanceof Set;
}
function p(n) {
  return n.o || n.t;
}
function l(n) {
  if (Array.isArray(n)) return Array.prototype.slice.call(n);
  var r = rn(n);
  delete r[Q];
  for (var t = nn(r), e = 0; e < t.length; e++) {
    var i = t[e],
      o = r[i];
    !1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (r[i] = {
      configurable: !0,
      writable: !0,
      enumerable: o.enumerable,
      value: n[i]
    });
  }
  return Object.create(Object.getPrototypeOf(n), r);
}
function d(n, e) {
  return void 0 === e && (e = !1), y(n) || r(n) || !t(n) || (o(n) > 1 && (n.set = n.add = n.clear = n["delete"] = h), Object.freeze(n), e && i(n, function (n, r) {
    return d(r, !0);
  }, !0)), n;
}
function h() {
  n(2);
}
function y(n) {
  return null == n || "object" != typeof n || Object.isFrozen(n);
}
function b(r) {
  var t = tn[r];
  return t || n(18, r), t;
}
function m(n, r) {
  tn[n] || (tn[n] = r);
}
function _() {
  return  true || 0, U;
}
function j(n, r) {
  r && (b("Patches"), n.u = [], n.s = [], n.v = r);
}
function g(n) {
  O(n), n.p.forEach(S), n.p = null;
}
function O(n) {
  n === U && (U = n.l);
}
function w(n) {
  return U = {
    p: [],
    l: U,
    h: n,
    m: !0,
    _: 0
  };
}
function S(n) {
  var r = n[Q];
  0 === r.i || 1 === r.i ? r.j() : r.g = !0;
}
function P(r, e) {
  e._ = e.p.length;
  var i = e.p[0],
    o = void 0 !== r && r !== i;
  return e.h.O || b("ES5").S(e, r, o), o ? (i[Q].P && (g(e), n(4)), t(r) && (r = M(e, r), e.l || x(e, r)), e.u && b("Patches").M(i[Q].t, r, e.u, e.s)) : r = M(e, i, []), g(e), e.u && e.v(e.u, e.s), r !== H ? r : void 0;
}
function M(n, r, t) {
  if (y(r)) return r;
  var e = r[Q];
  if (!e) return i(r, function (i, o) {
    return A(n, e, r, i, o, t);
  }, !0), r;
  if (e.A !== n) return r;
  if (!e.P) return x(n, e.t, !0), e.t;
  if (!e.I) {
    e.I = !0, e.A._--;
    var o = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o,
      u = o,
      a = !1;
    3 === e.i && (u = new Set(o), o.clear(), a = !0), i(u, function (r, i) {
      return A(n, e, o, r, i, t, a);
    }), x(n, o, !1), t && n.u && b("Patches").N(e, t, n.u, n.s);
  }
  return e.o;
}
function A(e, i, o, a, c, s, v) {
  if ( false && 0, r(c)) {
    var p = M(e, c, s && i && 3 !== i.i && !u(i.R, a) ? s.concat(a) : void 0);
    if (f(o, a, p), !r(p)) return;
    e.m = !1;
  } else v && o.add(c);
  if (t(c) && !y(c)) {
    if (!e.h.D && e._ < 1) return;
    M(e, c), i && i.A.l || x(e, c);
  }
}
function x(n, r, t) {
  void 0 === t && (t = !1), !n.l && n.h.D && n.m && d(r, t);
}
function z(n, r) {
  var t = n[Q];
  return (t ? p(t) : n)[r];
}
function I(n, r) {
  if (r in n) for (var t = Object.getPrototypeOf(n); t;) {
    var e = Object.getOwnPropertyDescriptor(t, r);
    if (e) return e;
    t = Object.getPrototypeOf(t);
  }
}
function k(n) {
  n.P || (n.P = !0, n.l && k(n.l));
}
function E(n) {
  n.o || (n.o = l(n.t));
}
function N(n, r, t) {
  var e = s(r) ? b("MapSet").F(r, t) : v(r) ? b("MapSet").T(r, t) : n.O ? function (n, r) {
    var t = Array.isArray(n),
      e = {
        i: t ? 1 : 0,
        A: r ? r.A : _(),
        P: !1,
        I: !1,
        R: {},
        l: r,
        t: n,
        k: null,
        o: null,
        j: null,
        C: !1
      },
      i = e,
      o = en;
    t && (i = [e], o = on);
    var u = Proxy.revocable(i, o),
      a = u.revoke,
      f = u.proxy;
    return e.k = f, e.j = a, f;
  }(r, t) : b("ES5").J(r, t);
  return (t ? t.A : _()).p.push(e), e;
}
function R(e) {
  return r(e) || n(22, e), function n(r) {
    if (!t(r)) return r;
    var e,
      u = r[Q],
      c = o(r);
    if (u) {
      if (!u.P && (u.i < 4 || !b("ES5").K(u))) return u.t;
      u.I = !0, e = D(r, c), u.I = !1;
    } else e = D(r, c);
    return i(e, function (r, t) {
      u && a(u.t, r) === t || f(e, r, n(t));
    }), 3 === c ? new Set(e) : e;
  }(e);
}
function D(n, r) {
  switch (r) {
    case 2:
      return new Map(n);
    case 3:
      return Array.from(n);
  }
  return l(n);
}
function F() {
  function t(n, r) {
    var t = s[n];
    return t ? t.enumerable = r : s[n] = t = {
      configurable: !0,
      enumerable: r,
      get: function get() {
        var r = this[Q];
        return  false && 0, en.get(r, n);
      },
      set: function set(r) {
        var t = this[Q];
         false && 0, en.set(t, n, r);
      }
    }, t;
  }
  function e(n) {
    for (var r = n.length - 1; r >= 0; r--) {
      var t = n[r][Q];
      if (!t.P) switch (t.i) {
        case 5:
          a(t) && k(t);
          break;
        case 4:
          o(t) && k(t);
      }
    }
  }
  function o(n) {
    for (var r = n.t, t = n.k, e = nn(t), i = e.length - 1; i >= 0; i--) {
      var o = e[i];
      if (o !== Q) {
        var a = r[o];
        if (void 0 === a && !u(r, o)) return !0;
        var f = t[o],
          s = f && f[Q];
        if (s ? s.t !== a : !c(f, a)) return !0;
      }
    }
    var v = !!r[Q];
    return e.length !== nn(r).length + (v ? 0 : 1);
  }
  function a(n) {
    var r = n.k;
    if (r.length !== n.t.length) return !0;
    var t = Object.getOwnPropertyDescriptor(r, r.length - 1);
    if (t && !t.get) return !0;
    for (var e = 0; e < r.length; e++) {
      if (!r.hasOwnProperty(e)) return !0;
    }
    return !1;
  }
  function f(r) {
    r.g && n(3, JSON.stringify(p(r)));
  }
  var s = {};
  m("ES5", {
    J: function J(n, r) {
      var e = Array.isArray(n),
        i = function (n, r) {
          if (n) {
            for (var e = Array(r.length), i = 0; i < r.length; i++) {
              Object.defineProperty(e, "" + i, t(i, !0));
            }
            return e;
          }
          var o = rn(r);
          delete o[Q];
          for (var u = nn(o), a = 0; a < u.length; a++) {
            var f = u[a];
            o[f] = t(f, n || !!o[f].enumerable);
          }
          return Object.create(Object.getPrototypeOf(r), o);
        }(e, n),
        o = {
          i: e ? 5 : 4,
          A: r ? r.A : _(),
          P: !1,
          I: !1,
          R: {},
          l: r,
          t: n,
          k: i,
          o: null,
          g: !1,
          C: !1
        };
      return Object.defineProperty(i, Q, {
        value: o,
        writable: !0
      }), i;
    },
    S: function S(n, t, o) {
      o ? r(t) && t[Q].A === n && e(n.p) : (n.u && function n(r) {
        if (r && "object" == typeof r) {
          var t = r[Q];
          if (t) {
            var e = t.t,
              o = t.k,
              f = t.R,
              c = t.i;
            if (4 === c) i(o, function (r) {
              r !== Q && (void 0 !== e[r] || u(e, r) ? f[r] || n(o[r]) : (f[r] = !0, k(t)));
            }), i(e, function (n) {
              void 0 !== o[n] || u(o, n) || (f[n] = !1, k(t));
            });else if (5 === c) {
              if (a(t) && (k(t), f.length = !0), o.length < e.length) for (var s = o.length; s < e.length; s++) {
                f[s] = !1;
              } else for (var v = e.length; v < o.length; v++) {
                f[v] = !0;
              }
              for (var p = Math.min(o.length, e.length), l = 0; l < p; l++) {
                o.hasOwnProperty(l) || (f[l] = !0), void 0 === f[l] && n(o[l]);
              }
            }
          }
        }
      }(n.p[0]), e(n.p));
    },
    K: function K(n) {
      return 4 === n.i ? o(n) : a(n);
    }
  });
}
function T() {
  function e(n) {
    if (!t(n)) return n;
    if (Array.isArray(n)) return n.map(e);
    if (s(n)) return new Map(Array.from(n.entries()).map(function (n) {
      return [n[0], e(n[1])];
    }));
    if (v(n)) return new Set(Array.from(n).map(e));
    var r = Object.create(Object.getPrototypeOf(n));
    for (var i in n) {
      r[i] = e(n[i]);
    }
    return u(n, L) && (r[L] = n[L]), r;
  }
  function f(n) {
    return r(n) ? e(n) : n;
  }
  var c = "add";
  m("Patches", {
    $: function $(r, t) {
      return t.forEach(function (t) {
        for (var i = t.path, u = t.op, f = r, s = 0; s < i.length - 1; s++) {
          var v = o(f),
            p = i[s];
          "string" != typeof p && "number" != typeof p && (p = "" + p), 0 !== v && 1 !== v || "__proto__" !== p && "constructor" !== p || n(24), "function" == typeof f && "prototype" === p && n(24), "object" != typeof (f = a(f, p)) && n(15, i.join("/"));
        }
        var l = o(f),
          d = e(t.value),
          h = i[i.length - 1];
        switch (u) {
          case "replace":
            switch (l) {
              case 2:
                return f.set(h, d);
              case 3:
                n(16);
              default:
                return f[h] = d;
            }
          case c:
            switch (l) {
              case 1:
                return "-" === h ? f.push(d) : f.splice(h, 0, d);
              case 2:
                return f.set(h, d);
              case 3:
                return f.add(d);
              default:
                return f[h] = d;
            }
          case "remove":
            switch (l) {
              case 1:
                return f.splice(h, 1);
              case 2:
                return f["delete"](h);
              case 3:
                return f["delete"](t.value);
              default:
                return delete f[h];
            }
          default:
            n(17, u);
        }
      }), r;
    },
    N: function N(n, r, t, e) {
      switch (n.i) {
        case 0:
        case 4:
        case 2:
          return function (n, r, t, e) {
            var o = n.t,
              s = n.o;
            i(n.R, function (n, i) {
              var v = a(o, n),
                p = a(s, n),
                l = i ? u(o, n) ? "replace" : c : "remove";
              if (v !== p || "replace" !== l) {
                var d = r.concat(n);
                t.push("remove" === l ? {
                  op: l,
                  path: d
                } : {
                  op: l,
                  path: d,
                  value: p
                }), e.push(l === c ? {
                  op: "remove",
                  path: d
                } : "remove" === l ? {
                  op: c,
                  path: d,
                  value: f(v)
                } : {
                  op: "replace",
                  path: d,
                  value: f(v)
                });
              }
            });
          }(n, r, t, e);
        case 5:
        case 1:
          return function (n, r, t, e) {
            var i = n.t,
              o = n.R,
              u = n.o;
            if (u.length < i.length) {
              var a = [u, i];
              i = a[0], u = a[1];
              var s = [e, t];
              t = s[0], e = s[1];
            }
            for (var v = 0; v < i.length; v++) {
              if (o[v] && u[v] !== i[v]) {
                var p = r.concat([v]);
                t.push({
                  op: "replace",
                  path: p,
                  value: f(u[v])
                }), e.push({
                  op: "replace",
                  path: p,
                  value: f(i[v])
                });
              }
            }
            for (var l = i.length; l < u.length; l++) {
              var d = r.concat([l]);
              t.push({
                op: c,
                path: d,
                value: f(u[l])
              });
            }
            i.length < u.length && e.push({
              op: "replace",
              path: r.concat(["length"]),
              value: i.length
            });
          }(n, r, t, e);
        case 3:
          return function (n, r, t, e) {
            var i = n.t,
              o = n.o,
              u = 0;
            i.forEach(function (n) {
              if (!o.has(n)) {
                var i = r.concat([u]);
                t.push({
                  op: "remove",
                  path: i,
                  value: n
                }), e.unshift({
                  op: c,
                  path: i,
                  value: n
                });
              }
              u++;
            }), u = 0, o.forEach(function (n) {
              if (!i.has(n)) {
                var o = r.concat([u]);
                t.push({
                  op: c,
                  path: o,
                  value: n
                }), e.unshift({
                  op: "remove",
                  path: o,
                  value: n
                });
              }
              u++;
            });
          }(n, r, t, e);
      }
    },
    M: function M(n, r, t, e) {
      t.push({
        op: "replace",
        path: [],
        value: r === H ? void 0 : r
      }), e.push({
        op: "replace",
        path: [],
        value: n
      });
    }
  });
}
function C() {
  function r(n, r) {
    function t() {
      this.constructor = n;
    }
    _a(n, r), n.prototype = (t.prototype = r.prototype, new t());
  }
  function e(n) {
    n.o || (n.R = new Map(), n.o = new Map(n.t));
  }
  function o(n) {
    n.o || (n.o = new Set(), n.t.forEach(function (r) {
      if (t(r)) {
        var e = N(n.A.h, r, n);
        n.p.set(r, e), n.o.add(e);
      } else n.o.add(r);
    }));
  }
  function u(r) {
    r.g && n(3, JSON.stringify(p(r)));
  }
  var _a = function a(n, r) {
      return (_a = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (n, r) {
        n.__proto__ = r;
      } || function (n, r) {
        for (var t in r) {
          r.hasOwnProperty(t) && (n[t] = r[t]);
        }
      })(n, r);
    },
    f = function () {
      function n(n, r) {
        return this[Q] = {
          i: 2,
          l: r,
          A: r ? r.A : _(),
          P: !1,
          I: !1,
          o: void 0,
          R: void 0,
          t: n,
          k: this,
          C: !1,
          g: !1
        }, this;
      }
      r(n, Map);
      var o = n.prototype;
      return Object.defineProperty(o, "size", {
        get: function get() {
          return p(this[Q]).size;
        }
      }), o.has = function (n) {
        return p(this[Q]).has(n);
      }, o.set = function (n, r) {
        var t = this[Q];
        return u(t), p(t).has(n) && p(t).get(n) === r || (e(t), k(t), t.R.set(n, !0), t.o.set(n, r), t.R.set(n, !0)), this;
      }, o["delete"] = function (n) {
        if (!this.has(n)) return !1;
        var r = this[Q];
        return u(r), e(r), k(r), r.t.has(n) ? r.R.set(n, !1) : r.R["delete"](n), r.o["delete"](n), !0;
      }, o.clear = function () {
        var n = this[Q];
        u(n), p(n).size && (e(n), k(n), n.R = new Map(), i(n.t, function (r) {
          n.R.set(r, !1);
        }), n.o.clear());
      }, o.forEach = function (n, r) {
        var t = this;
        p(this[Q]).forEach(function (e, i) {
          n.call(r, t.get(i), i, t);
        });
      }, o.get = function (n) {
        var r = this[Q];
        u(r);
        var i = p(r).get(n);
        if (r.I || !t(i)) return i;
        if (i !== r.t.get(n)) return i;
        var o = N(r.A.h, i, r);
        return e(r), r.o.set(n, o), o;
      }, o.keys = function () {
        return p(this[Q]).keys();
      }, o.values = function () {
        var n,
          r = this,
          t = this.keys();
        return (n = {})[V] = function () {
          return r.values();
        }, n.next = function () {
          var n = t.next();
          return n.done ? n : {
            done: !1,
            value: r.get(n.value)
          };
        }, n;
      }, o.entries = function () {
        var n,
          r = this,
          t = this.keys();
        return (n = {})[V] = function () {
          return r.entries();
        }, n.next = function () {
          var n = t.next();
          if (n.done) return n;
          var e = r.get(n.value);
          return {
            done: !1,
            value: [n.value, e]
          };
        }, n;
      }, o[V] = function () {
        return this.entries();
      }, n;
    }(),
    c = function () {
      function n(n, r) {
        return this[Q] = {
          i: 3,
          l: r,
          A: r ? r.A : _(),
          P: !1,
          I: !1,
          o: void 0,
          t: n,
          k: this,
          p: new Map(),
          g: !1,
          C: !1
        }, this;
      }
      r(n, Set);
      var t = n.prototype;
      return Object.defineProperty(t, "size", {
        get: function get() {
          return p(this[Q]).size;
        }
      }), t.has = function (n) {
        var r = this[Q];
        return u(r), r.o ? !!r.o.has(n) || !(!r.p.has(n) || !r.o.has(r.p.get(n))) : r.t.has(n);
      }, t.add = function (n) {
        var r = this[Q];
        return u(r), this.has(n) || (o(r), k(r), r.o.add(n)), this;
      }, t["delete"] = function (n) {
        if (!this.has(n)) return !1;
        var r = this[Q];
        return u(r), o(r), k(r), r.o["delete"](n) || !!r.p.has(n) && r.o["delete"](r.p.get(n));
      }, t.clear = function () {
        var n = this[Q];
        u(n), p(n).size && (o(n), k(n), n.o.clear());
      }, t.values = function () {
        var n = this[Q];
        return u(n), o(n), n.o.values();
      }, t.entries = function () {
        var n = this[Q];
        return u(n), o(n), n.o.entries();
      }, t.keys = function () {
        return this.values();
      }, t[V] = function () {
        return this.values();
      }, t.forEach = function (n, r) {
        for (var t = this.values(), e = t.next(); !e.done;) {
          n.call(r, e.value, e.value, this), e = t.next();
        }
      }, n;
    }();
  m("MapSet", {
    F: function F(n, r) {
      return new f(n, r);
    },
    T: function T(n, r) {
      return new c(n, r);
    }
  });
}
function J() {
  F(), C(), T();
}
function K(n) {
  return n;
}
function $(n) {
  return n;
}
var G,
  U,
  W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
  X = "undefined" != typeof Map,
  q = "undefined" != typeof Set,
  B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
  H = W ? Symbol["for"]("immer-nothing") : ((G = {})["immer-nothing"] = !0, G),
  L = W ? Symbol["for"]("immer-draftable") : "__$immer_draftable",
  Q = W ? Symbol["for"]("immer-state") : "__$immer_state",
  V = "undefined" != typeof Symbol && Symbol.iterator || "@@iterator",
  Y = {
    0: "Illegal state",
    1: "Immer drafts cannot have computed properties",
    2: "This object has been frozen and should not be mutated",
    3: function _(n) {
      return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n;
    },
    4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
    5: "Immer forbids circular references",
    6: "The first or second argument to `produce` must be a function",
    7: "The third argument to `produce` must be a function or undefined",
    8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
    9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
    10: "The given draft is already finalized",
    11: "Object.defineProperty() cannot be used on an Immer draft",
    12: "Object.setPrototypeOf() cannot be used on an Immer draft",
    13: "Immer only supports deleting array indices",
    14: "Immer only supports setting array indices and the 'length' property",
    15: function _(n) {
      return "Cannot apply patch, path doesn't resolve: " + n;
    },
    16: 'Sets cannot have "replace" patches.',
    17: function _(n) {
      return "Unsupported patch operation: " + n;
    },
    18: function _(n) {
      return "The plugin for '" + n + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n + "()` when initializing your application.";
    },
    20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",
    21: function _(n) {
      return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n + "'";
    },
    22: function _(n) {
      return "'current' expects a draft, got: " + n;
    },
    23: function _(n) {
      return "'original' expects a draft, got: " + n;
    },
    24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
  },
  Z = "" + Object.prototype.constructor,
  nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
    return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
  } : Object.getOwnPropertyNames,
  rn = Object.getOwnPropertyDescriptors || function (n) {
    var r = {};
    return nn(n).forEach(function (t) {
      r[t] = Object.getOwnPropertyDescriptor(n, t);
    }), r;
  },
  tn = {},
  en = {
    get: function get(n, r) {
      if (r === Q) return n;
      var e = p(n);
      if (!u(e, r)) return function (n, r, t) {
        var e,
          i = I(r, t);
        return i ? "value" in i ? i.value : null === (e = i.get) || void 0 === e ? void 0 : e.call(n.k) : void 0;
      }(n, e, r);
      var i = e[r];
      return n.I || !t(i) ? i : i === z(n.t, r) ? (E(n), n.o[r] = N(n.A.h, i, n)) : i;
    },
    has: function has(n, r) {
      return r in p(n);
    },
    ownKeys: function ownKeys(n) {
      return Reflect.ownKeys(p(n));
    },
    set: function set(n, r, t) {
      var e = I(p(n), r);
      if (null == e ? void 0 : e.set) return e.set.call(n.k, t), !0;
      if (!n.P) {
        var i = z(p(n), r),
          o = null == i ? void 0 : i[Q];
        if (o && o.t === t) return n.o[r] = t, n.R[r] = !1, !0;
        if (c(t, i) && (void 0 !== t || u(n.t, r))) return !0;
        E(n), k(n);
      }
      return n.o[r] === t && (void 0 !== t || r in n.o) || Number.isNaN(t) && Number.isNaN(n.o[r]) || (n.o[r] = t, n.R[r] = !0), !0;
    },
    deleteProperty: function deleteProperty(n, r) {
      return void 0 !== z(n.t, r) || r in n.t ? (n.R[r] = !1, E(n), k(n)) : delete n.R[r], n.o && delete n.o[r], !0;
    },
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(n, r) {
      var t = p(n),
        e = Reflect.getOwnPropertyDescriptor(t, r);
      return e ? {
        writable: !0,
        configurable: 1 !== n.i || "length" !== r,
        enumerable: e.enumerable,
        value: t[r]
      } : e;
    },
    defineProperty: function defineProperty() {
      n(11);
    },
    getPrototypeOf: function getPrototypeOf(n) {
      return Object.getPrototypeOf(n.t);
    },
    setPrototypeOf: function setPrototypeOf() {
      n(12);
    }
  },
  on = {};
i(en, function (n, r) {
  on[n] = function () {
    return arguments[0] = arguments[0][0], r.apply(this, arguments);
  };
}), on.deleteProperty = function (r, t) {
  return  false && 0, on.set.call(this, r, t, void 0);
}, on.set = function (r, t, e) {
  return  false && 0, en.set.call(this, r[0], t, e, r[0]);
};
var un = function () {
    function e(r) {
      var e = this;
      this.O = B, this.D = !0, this.produce = function (r, i, o) {
        if ("function" == typeof r && "function" != typeof i) {
          var u = i;
          i = r;
          var a = e;
          return function (n) {
            var r = this;
            void 0 === n && (n = u);
            for (var t = arguments.length, e = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) {
              e[o - 1] = arguments[o];
            }
            return a.produce(n, function (n) {
              var t;
              return (t = i).call.apply(t, [r, n].concat(e));
            });
          };
        }
        var f;
        if ("function" != typeof i && n(6), void 0 !== o && "function" != typeof o && n(7), t(r)) {
          var c = w(e),
            s = N(e, r, void 0),
            v = !0;
          try {
            f = i(s), v = !1;
          } finally {
            v ? g(c) : O(c);
          }
          return "undefined" != typeof Promise && f instanceof Promise ? f.then(function (n) {
            return j(c, o), P(n, c);
          }, function (n) {
            throw g(c), n;
          }) : (j(c, o), P(f, c));
        }
        if (!r || "object" != typeof r) {
          if (void 0 === (f = i(r)) && (f = r), f === H && (f = void 0), e.D && d(f, !0), o) {
            var p = [],
              l = [];
            b("Patches").M(r, f, p, l), o(p, l);
          }
          return f;
        }
        n(21, r);
      }, this.produceWithPatches = function (n, r) {
        if ("function" == typeof n) return function (r) {
          for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) {
            i[o - 1] = arguments[o];
          }
          return e.produceWithPatches(r, function (r) {
            return n.apply(void 0, [r].concat(i));
          });
        };
        var t,
          i,
          o = e.produce(n, r, function (n, r) {
            t = n, i = r;
          });
        return "undefined" != typeof Promise && o instanceof Promise ? o.then(function (n) {
          return [n, t, i];
        }) : [o, t, i];
      }, "boolean" == typeof (null == r ? void 0 : r.useProxies) && this.setUseProxies(r.useProxies), "boolean" == typeof (null == r ? void 0 : r.autoFreeze) && this.setAutoFreeze(r.autoFreeze);
    }
    var i = e.prototype;
    return i.createDraft = function (e) {
      t(e) || n(8), r(e) && (e = R(e));
      var i = w(this),
        o = N(this, e, void 0);
      return o[Q].C = !0, O(i), o;
    }, i.finishDraft = function (r, t) {
      var e = r && r[Q];
       false && (0);
      var i = e.A;
      return j(i, t), P(void 0, i);
    }, i.setAutoFreeze = function (n) {
      this.D = n;
    }, i.setUseProxies = function (r) {
      r && !B && n(20), this.O = r;
    }, i.applyPatches = function (n, t) {
      var e;
      for (e = t.length - 1; e >= 0; e--) {
        var i = t[e];
        if (0 === i.path.length && "replace" === i.op) {
          n = i.value;
          break;
        }
      }
      e > -1 && (t = t.slice(e + 1));
      var o = b("Patches").$;
      return r(n) ? o(n, t) : this.produce(n, function (n) {
        return o(n, t);
      });
    }, e;
  }(),
  an = new un(),
  fn = an.produce,
  cn = an.produceWithPatches.bind(an),
  sn = an.setAutoFreeze.bind(an),
  vn = an.setUseProxies.bind(an),
  pn = an.applyPatches.bind(an),
  ln = an.createDraft.bind(an),
  dn = an.finishDraft.bind(an);
/* harmony default export */ const immer_esm = (fn);

//# sourceMappingURL=immer.esm.js.map
;// CONCATENATED MODULE: ../node_modules/@babel/runtime/helpers/esm/defineProperty.js
function defineProperty_defineProperty(obj, key, value) {
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
;// CONCATENATED MODULE: ../node_modules/@babel/runtime/helpers/esm/objectSpread2.js


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        defineProperty_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
;// CONCATENATED MODULE: ../node_modules/redux/es/redux.js


/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;
  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }
  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);
  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other

  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}
function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}
function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}
function kindOf(val) {
  var typeOfVal = typeof val;
  if (false) {}
  return typeOfVal;
}

/**
 * @deprecated
 *
 * **We recommend using the `configureStore` method
 * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
 *
 * Redux Toolkit is our recommended approach for writing Redux logic today,
 * including store setup, reducers, data fetching, and more.
 *
 * **For more details, please read this Redux docs page:**
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * `configureStore` from Redux Toolkit is an improved version of `createStore` that
 * simplifies setup and helps avoid common bugs.
 *
 * You should not be using the `redux` core package by itself today, except for learning purposes.
 * The `createStore` method from the core `redux` package will not be removed, but we encourage
 * all users to migrate to using Redux Toolkit for all Redux code.
 *
 * If you want to use `createStore` without this visual deprecation warning, use
 * the `legacy_createStore` import instead:
 *
 * `import { legacy_createStore as createStore} from 'redux'`
 *
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error( true ? formatProdErrorMessage(0) : 0);
  }
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(1) : 0);
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  if (typeof reducer !== 'function') {
    throw new Error( true ? formatProdErrorMessage(2) : 0);
  }
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */

  function getState() {
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(3) : 0);
    }
    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error( true ? formatProdErrorMessage(4) : 0);
    }
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(5) : 0);
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(6) : 0);
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error( true ? formatProdErrorMessage(7) : 0);
    }
    if (typeof action.type === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(8) : 0);
    }
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(9) : 0);
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */

  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(10) : 0);
    }
    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */

  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error( true ? formatProdErrorMessage(11) : 0);
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.

  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
/**
 * Creates a Redux store that holds the state tree.
 *
 * **We recommend using `configureStore` from the
 * `@reduxjs/toolkit` package**, which replaces `createStore`:
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

var legacy_createStore = (/* unused pure expression or super */ null && (createStore));

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */

  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }
  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }
  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;
  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });
    if (typeof initialState === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(12) : 0);
    }
    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(13) : 0);
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (false) {}
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;
  if (false) {}
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if (false) { var warningMessage; }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error( true ? formatProdErrorMessage(14) : 0);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error( true ? formatProdErrorMessage(16) : 0);
  }
  var boundActionCreators = {};
  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);
      var _dispatch = function dispatch() {
        throw new Error( true ? formatProdErrorMessage(15) : 0);
      };
      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2(_objectSpread2({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}

;// CONCATENATED MODULE: ../node_modules/redux-thunk/es/index.js
/** A function that accepts a potential "extra argument" value to be injected later,
 * and returns an instance of the thunk middleware that uses that value
 */
function createThunkMiddleware(extraArgument) {
  // Standard Redux middleware definition pattern:
  // See: https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
  var middleware = function middleware(_ref) {
    var dispatch = _ref.dispatch,
      getState = _ref.getState;
    return function (next) {
      return function (action) {
        // The thunk middleware looks for any functions that were passed to `store.dispatch`.
        // If this "action" is really a function, call it and return the result.
        if (typeof action === 'function') {
          // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
          return action(dispatch, getState, extraArgument);
        } // Otherwise, pass the action down the middleware chain as usual

        return next(action);
      };
    };
  };
  return middleware;
}
var thunk = createThunkMiddleware(); // Attach the factory function so users can create a customized version
// with whatever "extra arg" they want to inject into their thunks

thunk.withExtraArgument = createThunkMiddleware;
/* harmony default export */ const es = (thunk);
;// CONCATENATED MODULE: ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js
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
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __spreadArray = undefined && undefined.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }
  return to;
};
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = function __defNormalProp(obj, key, value) {
  return key in obj ? __defProp(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: value
  }) : obj[key] = value;
};
var __spreadValues = function __spreadValues(a, b) {
  for (var prop in b || (b = {})) {
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  }
  if (__getOwnPropSymbols) for (var _i = 0, _c = __getOwnPropSymbols(b); _i < _c.length; _i++) {
    var prop = _c[_i];
    if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  }
  return a;
};
var __spreadProps = function __spreadProps(a, b) {
  return __defProps(a, __getOwnPropDescs(b));
};
var __async = function __async(__this, __arguments, generator) {
  return new Promise(function (resolve, reject) {
    var fulfilled = function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    };
    var step = function step(x) {
      return x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    };
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
// src/index.ts




// src/createDraftSafeSelector.ts


var createDraftSafeSelector = function createDraftSafeSelector() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var selector = createSelector.apply(void 0, args);
  var wrappedSelector = function wrappedSelector(value) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      rest[_i - 1] = arguments[_i];
    }
    return selector.apply(void 0, __spreadArray([isDraft(value) ? current(value) : value], rest));
  };
  return wrappedSelector;
};
// src/configureStore.ts

// src/devtoolsExtension.ts

var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function () {
  if (arguments.length === 0) return void 0;
  if (typeof arguments[0] === "object") return compose;
  return compose.apply(null, arguments);
};
var devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function () {
  return function (noop2) {
    return noop2;
  };
};
// src/isPlainObject.ts
function redux_toolkit_esm_isPlainObject(value) {
  if (typeof value !== "object" || value === null) return false;
  var proto = Object.getPrototypeOf(value);
  if (proto === null) return true;
  var baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  return proto === baseProto;
}
// src/getDefaultMiddleware.ts

// src/utils.ts

function getTimeMeasureUtils(maxDelay, fnName) {
  var elapsed = 0;
  return {
    measureTime: function measureTime(fn) {
      var started = Date.now();
      try {
        return fn();
      } finally {
        var finished = Date.now();
        elapsed += finished - started;
      }
    },
    warnIfExceeded: function warnIfExceeded() {
      if (elapsed > maxDelay) {
        console.warn(fnName + " took " + elapsed + "ms, which is more than the warning threshold of " + maxDelay + "ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.");
      }
    }
  };
}
var MiddlewareArray = /** @class */function (_super) {
  __extends(MiddlewareArray, _super);
  function MiddlewareArray() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var _this = _super.apply(this, args) || this;
    Object.setPrototypeOf(_this, MiddlewareArray.prototype);
    return _this;
  }
  Object.defineProperty(MiddlewareArray, Symbol.species, {
    get: function get() {
      return MiddlewareArray;
    },
    enumerable: false,
    configurable: true
  });
  MiddlewareArray.prototype.concat = function () {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      arr[_i] = arguments[_i];
    }
    return _super.prototype.concat.apply(this, arr);
  };
  MiddlewareArray.prototype.prepend = function () {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      arr[_i] = arguments[_i];
    }
    if (arr.length === 1 && Array.isArray(arr[0])) {
      return new (MiddlewareArray.bind.apply(MiddlewareArray, __spreadArray([void 0], arr[0].concat(this))))();
    }
    return new (MiddlewareArray.bind.apply(MiddlewareArray, __spreadArray([void 0], arr.concat(this))))();
  };
  return MiddlewareArray;
}(Array);
var EnhancerArray = /** @class */function (_super) {
  __extends(EnhancerArray, _super);
  function EnhancerArray() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var _this = _super.apply(this, args) || this;
    Object.setPrototypeOf(_this, EnhancerArray.prototype);
    return _this;
  }
  Object.defineProperty(EnhancerArray, Symbol.species, {
    get: function get() {
      return EnhancerArray;
    },
    enumerable: false,
    configurable: true
  });
  EnhancerArray.prototype.concat = function () {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      arr[_i] = arguments[_i];
    }
    return _super.prototype.concat.apply(this, arr);
  };
  EnhancerArray.prototype.prepend = function () {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      arr[_i] = arguments[_i];
    }
    if (arr.length === 1 && Array.isArray(arr[0])) {
      return new (EnhancerArray.bind.apply(EnhancerArray, __spreadArray([void 0], arr[0].concat(this))))();
    }
    return new (EnhancerArray.bind.apply(EnhancerArray, __spreadArray([void 0], arr.concat(this))))();
  };
  return EnhancerArray;
}(Array);
function freezeDraftable(val) {
  return t(val) ? immer_esm(val, function () {}) : val;
}
// src/immutableStateInvariantMiddleware.ts
var isProduction = (/* unused pure expression or super */ null && ("production" === "production"));
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  throw new Error(prefix + ": " + (message || ""));
}
function stringify(obj, serializer, indent, decycler) {
  return JSON.stringify(obj, getSerialize(serializer, decycler), indent);
}
function getSerialize(serializer, decycler) {
  var stack = [],
    keys = [];
  if (!decycler) decycler = function decycler(_, value) {
    if (stack[0] === value) return "[Circular ~]";
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
  };
  return function (key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this);
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
      if (~stack.indexOf(value)) value = decycler.call(this, key, value);
    } else stack.push(value);
    return serializer == null ? value : serializer.call(this, key, value);
  };
}
function isImmutableDefault(value) {
  return typeof value !== "object" || value == null || Object.isFrozen(value);
}
function trackForMutations(isImmutable, ignorePaths, obj) {
  var trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
  return {
    detectMutations: function detectMutations() {
      return _detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
    }
  };
}
function trackProperties(isImmutable, ignorePaths, obj, path) {
  if (ignorePaths === void 0) {
    ignorePaths = [];
  }
  if (path === void 0) {
    path = "";
  }
  var tracked = {
    value: obj
  };
  if (!isImmutable(obj)) {
    tracked.children = {};
    for (var key in obj) {
      var childPath = path ? path + "." + key : key;
      if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
        continue;
      }
      tracked.children[key] = trackProperties(isImmutable, ignorePaths, obj[key], childPath);
    }
  }
  return tracked;
}
function _detectMutations(isImmutable, ignoredPaths, trackedProperty, obj, sameParentRef, path) {
  if (ignoredPaths === void 0) {
    ignoredPaths = [];
  }
  if (sameParentRef === void 0) {
    sameParentRef = false;
  }
  if (path === void 0) {
    path = "";
  }
  var prevObj = trackedProperty ? trackedProperty.value : void 0;
  var sameRef = prevObj === obj;
  if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
    return {
      wasMutated: true,
      path: path
    };
  }
  if (isImmutable(prevObj) || isImmutable(obj)) {
    return {
      wasMutated: false
    };
  }
  var keysToDetect = {};
  for (var key in trackedProperty.children) {
    keysToDetect[key] = true;
  }
  for (var key in obj) {
    keysToDetect[key] = true;
  }
  var hasIgnoredPaths = ignoredPaths.length > 0;
  var _loop_1 = function _loop_1(key) {
    var nestedPath = path ? path + "." + key : key;
    if (hasIgnoredPaths) {
      var hasMatches = ignoredPaths.some(function (ignored) {
        if (ignored instanceof RegExp) {
          return ignored.test(nestedPath);
        }
        return nestedPath === ignored;
      });
      if (hasMatches) {
        return "continue";
      }
    }
    var result = _detectMutations(isImmutable, ignoredPaths, trackedProperty.children[key], obj[key], sameRef, nestedPath);
    if (result.wasMutated) {
      return {
        value: result
      };
    }
  };
  for (var key in keysToDetect) {
    var state_1 = _loop_1(key);
    if (typeof state_1 === "object") return state_1.value;
  }
  return {
    wasMutated: false
  };
}
function createImmutableStateInvariantMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  if (true) {
    return function () {
      return function (next) {
        return function (action) {
          return next(action);
        };
      };
    };
  }
  var _c = options.isImmutable,
    isImmutable = _c === void 0 ? isImmutableDefault : _c,
    ignoredPaths = options.ignoredPaths,
    _d = options.warnAfter,
    warnAfter = _d === void 0 ? 32 : _d,
    ignore = options.ignore;
  ignoredPaths = ignoredPaths || ignore;
  var track = trackForMutations.bind(null, isImmutable, ignoredPaths);
  return function (_c) {
    var getState = _c.getState;
    var state = getState();
    var tracker = track(state);
    var result;
    return function (next) {
      return function (action) {
        var measureUtils = getTimeMeasureUtils(warnAfter, "ImmutableStateInvariantMiddleware");
        measureUtils.measureTime(function () {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          invariant(!result.wasMutated, "A state mutation was detected between dispatches, in the path '" + (result.path || "") + "'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
        });
        var dispatchedAction = next(action);
        measureUtils.measureTime(function () {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          result.wasMutated && invariant(!result.wasMutated, "A state mutation was detected inside a dispatch, in the path: " + (result.path || "") + ". Take a look at the reducer(s) handling the action " + stringify(action) + ". (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
        });
        measureUtils.warnIfExceeded();
        return dispatchedAction;
      };
    };
  };
}
// src/serializableStateInvariantMiddleware.ts
function isPlain(val) {
  var type = typeof val;
  return val == null || type === "string" || type === "boolean" || type === "number" || Array.isArray(val) || redux_toolkit_esm_isPlainObject(val);
}
function findNonSerializableValue(value, path, isSerializable, getEntries, ignoredPaths, cache) {
  if (path === void 0) {
    path = "";
  }
  if (isSerializable === void 0) {
    isSerializable = isPlain;
  }
  if (ignoredPaths === void 0) {
    ignoredPaths = [];
  }
  var foundNestedSerializable;
  if (!isSerializable(value)) {
    return {
      keyPath: path || "<root>",
      value: value
    };
  }
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (cache == null ? void 0 : cache.has(value)) return false;
  var entries = getEntries != null ? getEntries(value) : Object.entries(value);
  var hasIgnoredPaths = ignoredPaths.length > 0;
  var _loop_2 = function _loop_2(key, nestedValue) {
    var nestedPath = path ? path + "." + key : key;
    if (hasIgnoredPaths) {
      var hasMatches = ignoredPaths.some(function (ignored) {
        if (ignored instanceof RegExp) {
          return ignored.test(nestedPath);
        }
        return nestedPath === ignored;
      });
      if (hasMatches) {
        return "continue";
      }
    }
    if (!isSerializable(nestedValue)) {
      return {
        value: {
          keyPath: nestedPath,
          value: nestedValue
        }
      };
    }
    if (typeof nestedValue === "object") {
      foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable, getEntries, ignoredPaths, cache);
      if (foundNestedSerializable) {
        return {
          value: foundNestedSerializable
        };
      }
    }
  };
  for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
    var _c = entries_1[_i],
      key = _c[0],
      nestedValue = _c[1];
    var state_2 = _loop_2(key, nestedValue);
    if (typeof state_2 === "object") return state_2.value;
  }
  if (cache && isNestedFrozen(value)) cache.add(value);
  return false;
}
function isNestedFrozen(value) {
  if (!Object.isFrozen(value)) return false;
  for (var _i = 0, _c = Object.values(value); _i < _c.length; _i++) {
    var nestedValue = _c[_i];
    if (typeof nestedValue !== "object" || nestedValue === null) continue;
    if (!isNestedFrozen(nestedValue)) return false;
  }
  return true;
}
function createSerializableStateInvariantMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  if (true) {
    return function () {
      return function (next) {
        return function (action) {
          return next(action);
        };
      };
    };
  }
  var _c = options.isSerializable,
    isSerializable = _c === void 0 ? isPlain : _c,
    getEntries = options.getEntries,
    _d = options.ignoredActions,
    ignoredActions = _d === void 0 ? [] : _d,
    _e = options.ignoredActionPaths,
    ignoredActionPaths = _e === void 0 ? ["meta.arg", "meta.baseQueryMeta"] : _e,
    _f = options.ignoredPaths,
    ignoredPaths = _f === void 0 ? [] : _f,
    _g = options.warnAfter,
    warnAfter = _g === void 0 ? 32 : _g,
    _h = options.ignoreState,
    ignoreState = _h === void 0 ? false : _h,
    _j = options.ignoreActions,
    ignoreActions = _j === void 0 ? false : _j,
    _k = options.disableCache,
    disableCache = _k === void 0 ? false : _k;
  var cache = !disableCache && WeakSet ? new WeakSet() : void 0;
  return function (storeAPI) {
    return function (next) {
      return function (action) {
        var result = next(action);
        var measureUtils = getTimeMeasureUtils(warnAfter, "SerializableStateInvariantMiddleware");
        if (!ignoreActions && !(ignoredActions.length && ignoredActions.indexOf(action.type) !== -1)) {
          measureUtils.measureTime(function () {
            var foundActionNonSerializableValue = findNonSerializableValue(action, "", isSerializable, getEntries, ignoredActionPaths, cache);
            if (foundActionNonSerializableValue) {
              var keyPath = foundActionNonSerializableValue.keyPath,
                value = foundActionNonSerializableValue.value;
              console.error("A non-serializable value was detected in an action, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the logic that dispatched this action: ", action, "\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)", "\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)");
            }
          });
        }
        if (!ignoreState) {
          measureUtils.measureTime(function () {
            var state = storeAPI.getState();
            var foundStateNonSerializableValue = findNonSerializableValue(state, "", isSerializable, getEntries, ignoredPaths, cache);
            if (foundStateNonSerializableValue) {
              var keyPath = foundStateNonSerializableValue.keyPath,
                value = foundStateNonSerializableValue.value;
              console.error("A non-serializable value was detected in the state, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the reducer(s) handling this action type: " + action.type + ".\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)");
            }
          });
          measureUtils.warnIfExceeded();
        }
        return result;
      };
    };
  };
}
// src/getDefaultMiddleware.ts
function isBoolean(x) {
  return typeof x === "boolean";
}
function curryGetDefaultMiddleware() {
  return function curriedGetDefaultMiddleware(options) {
    return getDefaultMiddleware(options);
  };
}
function getDefaultMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  var _c = options.thunk,
    thunk = _c === void 0 ? true : _c,
    _d = options.immutableCheck,
    immutableCheck = _d === void 0 ? true : _d,
    _e = options.serializableCheck,
    serializableCheck = _e === void 0 ? true : _e;
  var middlewareArray = new MiddlewareArray();
  if (thunk) {
    if (isBoolean(thunk)) {
      middlewareArray.push(es);
    } else {
      middlewareArray.push(es.withExtraArgument(thunk.extraArgument));
    }
  }
  if (false) { var serializableOptions, immutableOptions; }
  return middlewareArray;
}
// src/configureStore.ts
var IS_PRODUCTION = "production" === "production";
function configureStore(options) {
  var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
  var _c = options || {},
    _d = _c.reducer,
    reducer = _d === void 0 ? void 0 : _d,
    _e = _c.middleware,
    middleware = _e === void 0 ? curriedGetDefaultMiddleware() : _e,
    _f = _c.devTools,
    devTools = _f === void 0 ? true : _f,
    _g = _c.preloadedState,
    preloadedState = _g === void 0 ? void 0 : _g,
    _h = _c.enhancers,
    enhancers = _h === void 0 ? void 0 : _h;
  var rootReducer;
  if (typeof reducer === "function") {
    rootReducer = reducer;
  } else if (redux_toolkit_esm_isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer);
  } else {
    throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
  }
  var finalMiddleware = middleware;
  if (typeof finalMiddleware === "function") {
    finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
    if (!IS_PRODUCTION && !Array.isArray(finalMiddleware)) {
      throw new Error("when using a middleware builder function, an array of middleware must be returned");
    }
  }
  if (!IS_PRODUCTION && finalMiddleware.some(function (item) {
    return typeof item !== "function";
  })) {
    throw new Error("each middleware provided to configureStore must be a function");
  }
  var middlewareEnhancer = applyMiddleware.apply(void 0, finalMiddleware);
  var finalCompose = compose;
  if (devTools) {
    finalCompose = composeWithDevTools(__spreadValues({
      trace: !IS_PRODUCTION
    }, typeof devTools === "object" && devTools));
  }
  var defaultEnhancers = new EnhancerArray(middlewareEnhancer);
  var storeEnhancers = defaultEnhancers;
  if (Array.isArray(enhancers)) {
    storeEnhancers = __spreadArray([middlewareEnhancer], enhancers);
  } else if (typeof enhancers === "function") {
    storeEnhancers = enhancers(defaultEnhancers);
  }
  var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
  return createStore(rootReducer, preloadedState, composedEnhancer);
}
// src/createAction.ts
function createAction(type, prepareAction) {
  function actionCreator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (prepareAction) {
      var prepared = prepareAction.apply(void 0, args);
      if (!prepared) {
        throw new Error("prepareAction did not return an object");
      }
      return __spreadValues(__spreadValues({
        type: type,
        payload: prepared.payload
      }, "meta" in prepared && {
        meta: prepared.meta
      }), "error" in prepared && {
        error: prepared.error
      });
    }
    return {
      type: type,
      payload: args[0]
    };
  }
  actionCreator.toString = function () {
    return "" + type;
  };
  actionCreator.type = type;
  actionCreator.match = function (action) {
    return action.type === type;
  };
  return actionCreator;
}
function isAction(action) {
  return redux_toolkit_esm_isPlainObject(action) && "type" in action;
}
function isFSA(action) {
  return isAction(action) && typeof action.type === "string" && Object.keys(action).every(isValidKey);
}
function isValidKey(key) {
  return ["type", "payload", "error", "meta"].indexOf(key) > -1;
}
function getType(actionCreator) {
  return "" + actionCreator;
}
// src/createReducer.ts

// src/mapBuilders.ts
function executeReducerBuilderCallback(builderCallback) {
  var actionsMap = {};
  var actionMatchers = [];
  var defaultCaseReducer;
  var builder = {
    addCase: function addCase(typeOrActionCreator, reducer) {
      if (false) {}
      var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (type in actionsMap) {
        throw new Error("addCase cannot be called with two reducers for the same action type");
      }
      actionsMap[type] = reducer;
      return builder;
    },
    addMatcher: function addMatcher(matcher, reducer) {
      if (false) {}
      actionMatchers.push({
        matcher: matcher,
        reducer: reducer
      });
      return builder;
    },
    addDefaultCase: function addDefaultCase(reducer) {
      if (false) {}
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
// src/createReducer.ts
function isStateFunction(x) {
  return typeof x === "function";
}
var hasWarnedAboutObjectNotation = false;
function createReducer(initialState, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
  if (actionMatchers === void 0) {
    actionMatchers = [];
  }
  if (false) {}
  var _c = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer],
    actionsMap = _c[0],
    finalActionMatchers = _c[1],
    finalDefaultCaseReducer = _c[2];
  var getInitialState;
  if (isStateFunction(initialState)) {
    getInitialState = function getInitialState() {
      return freezeDraftable(initialState());
    };
  } else {
    var frozenInitialState_1 = freezeDraftable(initialState);
    getInitialState = function getInitialState() {
      return frozenInitialState_1;
    };
  }
  function reducer(state, action) {
    if (state === void 0) {
      state = getInitialState();
    }
    var caseReducers = __spreadArray([actionsMap[action.type]], finalActionMatchers.filter(function (_c) {
      var matcher = _c.matcher;
      return matcher(action);
    }).map(function (_c) {
      var reducer2 = _c.reducer;
      return reducer2;
    }));
    if (caseReducers.filter(function (cr) {
      return !!cr;
    }).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce(function (previousState, caseReducer) {
      if (caseReducer) {
        if (r(previousState)) {
          var draft = previousState;
          var result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!t(previousState)) {
          var result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return immer_esm(previousState, function (draft) {
            return caseReducer(draft, action);
          });
        }
      }
      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;
  return reducer;
}
// src/createSlice.ts
var hasWarnedAboutObjectNotation2 = false;
function getType2(slice, actionKey) {
  return slice + "/" + actionKey;
}
function createSlice(options) {
  var name = options.name;
  if (!name) {
    throw new Error("`name` is a required option for createSlice");
  }
  if (typeof process !== "undefined" && "production" === "development") {}
  var initialState = typeof options.initialState == "function" ? options.initialState : freezeDraftable(options.initialState);
  var reducers = options.reducers || {};
  var reducerNames = Object.keys(reducers);
  var sliceCaseReducersByName = {};
  var sliceCaseReducersByType = {};
  var actionCreators = {};
  reducerNames.forEach(function (reducerName) {
    var maybeReducerWithPrepare = reducers[reducerName];
    var type = getType2(name, reducerName);
    var caseReducer;
    var prepareCallback;
    if ("reducer" in maybeReducerWithPrepare) {
      caseReducer = maybeReducerWithPrepare.reducer;
      prepareCallback = maybeReducerWithPrepare.prepare;
    } else {
      caseReducer = maybeReducerWithPrepare;
    }
    sliceCaseReducersByName[reducerName] = caseReducer;
    sliceCaseReducersByType[type] = caseReducer;
    actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
  });
  function buildReducer() {
    if (false) {}
    var _c = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers],
      _d = _c[0],
      extraReducers = _d === void 0 ? {} : _d,
      _e = _c[1],
      actionMatchers = _e === void 0 ? [] : _e,
      _f = _c[2],
      defaultCaseReducer = _f === void 0 ? void 0 : _f;
    var finalCaseReducers = __spreadValues(__spreadValues({}, extraReducers), sliceCaseReducersByType);
    return createReducer(initialState, function (builder) {
      for (var key in finalCaseReducers) {
        builder.addCase(key, finalCaseReducers[key]);
      }
      for (var _i = 0, actionMatchers_1 = actionMatchers; _i < actionMatchers_1.length; _i++) {
        var m = actionMatchers_1[_i];
        builder.addMatcher(m.matcher, m.reducer);
      }
      if (defaultCaseReducer) {
        builder.addDefaultCase(defaultCaseReducer);
      }
    });
  }
  var _reducer;
  return {
    name: name,
    reducer: function reducer(state, action) {
      if (!_reducer) _reducer = buildReducer();
      return _reducer(state, action);
    },
    actions: actionCreators,
    caseReducers: sliceCaseReducersByName,
    getInitialState: function getInitialState() {
      if (!_reducer) _reducer = buildReducer();
      return _reducer.getInitialState();
    }
  };
}
// src/entities/entity_state.ts
function getInitialEntityState() {
  return {
    ids: [],
    entities: {}
  };
}
function createInitialStateFactory() {
  function getInitialState(additionalState) {
    if (additionalState === void 0) {
      additionalState = {};
    }
    return Object.assign(getInitialEntityState(), additionalState);
  }
  return {
    getInitialState: getInitialState
  };
}
// src/entities/state_selectors.ts
function createSelectorsFactory() {
  function getSelectors(selectState) {
    var selectIds = function selectIds(state) {
      return state.ids;
    };
    var selectEntities = function selectEntities(state) {
      return state.entities;
    };
    var selectAll = createDraftSafeSelector(selectIds, selectEntities, function (ids, entities) {
      return ids.map(function (id) {
        return entities[id];
      });
    });
    var selectId = function selectId(_, id) {
      return id;
    };
    var selectById = function selectById(entities, id) {
      return entities[id];
    };
    var selectTotal = createDraftSafeSelector(selectIds, function (ids) {
      return ids.length;
    });
    if (!selectState) {
      return {
        selectIds: selectIds,
        selectEntities: selectEntities,
        selectAll: selectAll,
        selectTotal: selectTotal,
        selectById: createDraftSafeSelector(selectEntities, selectId, selectById)
      };
    }
    var selectGlobalizedEntities = createDraftSafeSelector(selectState, selectEntities);
    return {
      selectIds: createDraftSafeSelector(selectState, selectIds),
      selectEntities: selectGlobalizedEntities,
      selectAll: createDraftSafeSelector(selectState, selectAll),
      selectTotal: createDraftSafeSelector(selectState, selectTotal),
      selectById: createDraftSafeSelector(selectGlobalizedEntities, selectId, selectById)
    };
  }
  return {
    getSelectors: getSelectors
  };
}
// src/entities/state_adapter.ts

function createSingleArgumentStateOperator(mutator) {
  var operator = createStateOperator(function (_, state) {
    return mutator(state);
  });
  return function operation(state) {
    return operator(state, void 0);
  };
}
function createStateOperator(mutator) {
  return function operation(state, arg) {
    function isPayloadActionArgument(arg2) {
      return isFSA(arg2);
    }
    var runMutator = function runMutator(draft) {
      if (isPayloadActionArgument(arg)) {
        mutator(arg.payload, draft);
      } else {
        mutator(arg, draft);
      }
    };
    if (isDraft3(state)) {
      runMutator(state);
      return state;
    } else {
      return createNextState3(state, runMutator);
    }
  };
}
// src/entities/utils.ts
function selectIdValue(entity, selectId) {
  var key = selectId(entity);
  if (false) {}
  return key;
}
function ensureEntitiesArray(entities) {
  if (!Array.isArray(entities)) {
    entities = Object.values(entities);
  }
  return entities;
}
function splitAddedUpdatedEntities(newEntities, selectId, state) {
  newEntities = ensureEntitiesArray(newEntities);
  var added = [];
  var updated = [];
  for (var _i = 0, newEntities_1 = newEntities; _i < newEntities_1.length; _i++) {
    var entity = newEntities_1[_i];
    var id = selectIdValue(entity, selectId);
    if (id in state.entities) {
      updated.push({
        id: id,
        changes: entity
      });
    } else {
      added.push(entity);
    }
  }
  return [added, updated];
}
// src/entities/unsorted_state_adapter.ts
function createUnsortedStateAdapter(selectId) {
  function addOneMutably(entity, state) {
    var key = selectIdValue(entity, selectId);
    if (key in state.entities) {
      return;
    }
    state.ids.push(key);
    state.entities[key] = entity;
  }
  function addManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    for (var _i = 0, newEntities_2 = newEntities; _i < newEntities_2.length; _i++) {
      var entity = newEntities_2[_i];
      addOneMutably(entity, state);
    }
  }
  function setOneMutably(entity, state) {
    var key = selectIdValue(entity, selectId);
    if (!(key in state.entities)) {
      state.ids.push(key);
    }
    state.entities[key] = entity;
  }
  function setManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    for (var _i = 0, newEntities_3 = newEntities; _i < newEntities_3.length; _i++) {
      var entity = newEntities_3[_i];
      setOneMutably(entity, state);
    }
  }
  function setAllMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    state.ids = [];
    state.entities = {};
    addManyMutably(newEntities, state);
  }
  function removeOneMutably(key, state) {
    return removeManyMutably([key], state);
  }
  function removeManyMutably(keys, state) {
    var didMutate = false;
    keys.forEach(function (key) {
      if (key in state.entities) {
        delete state.entities[key];
        didMutate = true;
      }
    });
    if (didMutate) {
      state.ids = state.ids.filter(function (id) {
        return id in state.entities;
      });
    }
  }
  function removeAllMutably(state) {
    Object.assign(state, {
      ids: [],
      entities: {}
    });
  }
  function takeNewKey(keys, update, state) {
    var original2 = state.entities[update.id];
    var updated = Object.assign({}, original2, update.changes);
    var newKey = selectIdValue(updated, selectId);
    var hasNewKey = newKey !== update.id;
    if (hasNewKey) {
      keys[update.id] = newKey;
      delete state.entities[update.id];
    }
    state.entities[newKey] = updated;
    return hasNewKey;
  }
  function updateOneMutably(update, state) {
    return updateManyMutably([update], state);
  }
  function updateManyMutably(updates, state) {
    var newKeys = {};
    var updatesPerEntity = {};
    updates.forEach(function (update) {
      if (update.id in state.entities) {
        updatesPerEntity[update.id] = {
          id: update.id,
          changes: __spreadValues(__spreadValues({}, updatesPerEntity[update.id] ? updatesPerEntity[update.id].changes : null), update.changes)
        };
      }
    });
    updates = Object.values(updatesPerEntity);
    var didMutateEntities = updates.length > 0;
    if (didMutateEntities) {
      var didMutateIds = updates.filter(function (update) {
        return takeNewKey(newKeys, update, state);
      }).length > 0;
      if (didMutateIds) {
        state.ids = Object.keys(state.entities);
      }
    }
  }
  function upsertOneMutably(entity, state) {
    return upsertManyMutably([entity], state);
  }
  function upsertManyMutably(newEntities, state) {
    var _c = splitAddedUpdatedEntities(newEntities, selectId, state),
      added = _c[0],
      updated = _c[1];
    updateManyMutably(updated, state);
    addManyMutably(added, state);
  }
  return {
    removeAll: createSingleArgumentStateOperator(removeAllMutably),
    addOne: createStateOperator(addOneMutably),
    addMany: createStateOperator(addManyMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    updateOne: createStateOperator(updateOneMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    upsertMany: createStateOperator(upsertManyMutably),
    removeOne: createStateOperator(removeOneMutably),
    removeMany: createStateOperator(removeManyMutably)
  };
}
// src/entities/sorted_state_adapter.ts
function createSortedStateAdapter(selectId, sort) {
  var _c = createUnsortedStateAdapter(selectId),
    removeOne = _c.removeOne,
    removeMany = _c.removeMany,
    removeAll = _c.removeAll;
  function addOneMutably(entity, state) {
    return addManyMutably([entity], state);
  }
  function addManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    var models = newEntities.filter(function (model) {
      return !(selectIdValue(model, selectId) in state.entities);
    });
    if (models.length !== 0) {
      merge(models, state);
    }
  }
  function setOneMutably(entity, state) {
    return setManyMutably([entity], state);
  }
  function setManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    if (newEntities.length !== 0) {
      merge(newEntities, state);
    }
  }
  function setAllMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    state.entities = {};
    state.ids = [];
    addManyMutably(newEntities, state);
  }
  function updateOneMutably(update, state) {
    return updateManyMutably([update], state);
  }
  function updateManyMutably(updates, state) {
    var appliedUpdates = false;
    for (var _i = 0, updates_1 = updates; _i < updates_1.length; _i++) {
      var update = updates_1[_i];
      var entity = state.entities[update.id];
      if (!entity) {
        continue;
      }
      appliedUpdates = true;
      Object.assign(entity, update.changes);
      var newId = selectId(entity);
      if (update.id !== newId) {
        delete state.entities[update.id];
        state.entities[newId] = entity;
      }
    }
    if (appliedUpdates) {
      resortEntities(state);
    }
  }
  function upsertOneMutably(entity, state) {
    return upsertManyMutably([entity], state);
  }
  function upsertManyMutably(newEntities, state) {
    var _c = splitAddedUpdatedEntities(newEntities, selectId, state),
      added = _c[0],
      updated = _c[1];
    updateManyMutably(updated, state);
    addManyMutably(added, state);
  }
  function areArraysEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0; i < a.length && i < b.length; i++) {
      if (a[i] === b[i]) {
        continue;
      }
      return false;
    }
    return true;
  }
  function merge(models, state) {
    models.forEach(function (model) {
      state.entities[selectId(model)] = model;
    });
    resortEntities(state);
  }
  function resortEntities(state) {
    var allEntities = Object.values(state.entities);
    allEntities.sort(sort);
    var newSortedIds = allEntities.map(selectId);
    var ids = state.ids;
    if (!areArraysEqual(ids, newSortedIds)) {
      state.ids = newSortedIds;
    }
  }
  return {
    removeOne: removeOne,
    removeMany: removeMany,
    removeAll: removeAll,
    addOne: createStateOperator(addOneMutably),
    updateOne: createStateOperator(updateOneMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    addMany: createStateOperator(addManyMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertMany: createStateOperator(upsertManyMutably)
  };
}
// src/entities/create_adapter.ts
function createEntityAdapter(options) {
  if (options === void 0) {
    options = {};
  }
  var _c = __spreadValues({
      sortComparer: false,
      selectId: function selectId(instance) {
        return instance.id;
      }
    }, options),
    selectId = _c.selectId,
    sortComparer = _c.sortComparer;
  var stateFactory = createInitialStateFactory();
  var selectorsFactory = createSelectorsFactory();
  var stateAdapter = sortComparer ? createSortedStateAdapter(selectId, sortComparer) : createUnsortedStateAdapter(selectId);
  return __spreadValues(__spreadValues(__spreadValues({
    selectId: selectId,
    sortComparer: sortComparer
  }, stateFactory), selectorsFactory), stateAdapter);
}
// src/nanoid.ts
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = function nanoid(size) {
  if (size === void 0) {
    size = 21;
  }
  var id = "";
  var i = size;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
// src/createAsyncThunk.ts
var commonProperties = ["name", "message", "stack", "code"];
var RejectWithValue = /** @class */function () {
  function RejectWithValue(payload, meta) {
    this.payload = payload;
    this.meta = meta;
  }
  return RejectWithValue;
}();
var FulfillWithMeta = /** @class */function () {
  function FulfillWithMeta(payload, meta) {
    this.payload = payload;
    this.meta = meta;
  }
  return FulfillWithMeta;
}();
var miniSerializeError = function miniSerializeError(value) {
  if (typeof value === "object" && value !== null) {
    var simpleError = {};
    for (var _i = 0, commonProperties_1 = commonProperties; _i < commonProperties_1.length; _i++) {
      var property = commonProperties_1[_i];
      if (typeof value[property] === "string") {
        simpleError[property] = value[property];
      }
    }
    return simpleError;
  }
  return {
    message: String(value)
  };
};
var createAsyncThunk = function () {
  function createAsyncThunk2(typePrefix, payloadCreator, options) {
    var fulfilled = createAction(typePrefix + "/fulfilled", function (payload, requestId, arg, meta) {
      return {
        payload: payload,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg: arg,
          requestId: requestId,
          requestStatus: "fulfilled"
        })
      };
    });
    var pending = createAction(typePrefix + "/pending", function (requestId, arg, meta) {
      return {
        payload: void 0,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg: arg,
          requestId: requestId,
          requestStatus: "pending"
        })
      };
    });
    var rejected = createAction(typePrefix + "/rejected", function (error, requestId, arg, payload, meta) {
      return {
        payload: payload,
        error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg: arg,
          requestId: requestId,
          rejectedWithValue: !!payload,
          requestStatus: "rejected",
          aborted: (error == null ? void 0 : error.name) === "AbortError",
          condition: (error == null ? void 0 : error.name) === "ConditionError"
        })
      };
    });
    var displayedWarning = false;
    var AC = typeof AbortController !== "undefined" ? AbortController : /** @class */function () {
      function class_1() {
        this.signal = {
          aborted: false,
          addEventListener: function addEventListener() {},
          dispatchEvent: function dispatchEvent() {
            return false;
          },
          onabort: function onabort() {},
          removeEventListener: function removeEventListener() {},
          reason: void 0,
          throwIfAborted: function throwIfAborted() {}
        };
      }
      class_1.prototype.abort = function () {
        if (false) {}
      };
      return class_1;
    }();
    function actionCreator(arg) {
      return function (dispatch, getState, extra) {
        var requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
        var abortController = new AC();
        var abortReason;
        var started = false;
        function abort(reason) {
          abortReason = reason;
          abortController.abort();
        }
        var promise2 = function () {
          return __async(this, null, function () {
            var _a, _b, finalAction, conditionResult, abortedPromise, err_1, skipDispatch;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  _c.trys.push([0, 4,, 5]);
                  conditionResult = (_a = options == null ? void 0 : options.condition) == null ? void 0 : _a.call(options, arg, {
                    getState: getState,
                    extra: extra
                  });
                  if (!isThenable(conditionResult)) return [3 /*break*/, 2];
                  return [4 /*yield*/, conditionResult];
                case 1:
                  conditionResult = _c.sent();
                  _c.label = 2;
                case 2:
                  if (conditionResult === false || abortController.signal.aborted) {
                    throw {
                      name: "ConditionError",
                      message: "Aborted due to condition callback returning false."
                    };
                  }
                  started = true;
                  abortedPromise = new Promise(function (_, reject) {
                    return abortController.signal.addEventListener("abort", function () {
                      return reject({
                        name: "AbortError",
                        message: abortReason || "Aborted"
                      });
                    });
                  });
                  dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, {
                    requestId: requestId,
                    arg: arg
                  }, {
                    getState: getState,
                    extra: extra
                  })));
                  return [4 /*yield*/, Promise.race([abortedPromise, Promise.resolve(payloadCreator(arg, {
                    dispatch: dispatch,
                    getState: getState,
                    extra: extra,
                    requestId: requestId,
                    signal: abortController.signal,
                    abort: abort,
                    rejectWithValue: function rejectWithValue(value, meta) {
                      return new RejectWithValue(value, meta);
                    },
                    fulfillWithValue: function fulfillWithValue(value, meta) {
                      return new FulfillWithMeta(value, meta);
                    }
                  })).then(function (result) {
                    if (result instanceof RejectWithValue) {
                      throw result;
                    }
                    if (result instanceof FulfillWithMeta) {
                      return fulfilled(result.payload, requestId, arg, result.meta);
                    }
                    return fulfilled(result, requestId, arg);
                  })])];
                case 3:
                  finalAction = _c.sent();
                  return [3 /*break*/, 5];
                case 4:
                  err_1 = _c.sent();
                  finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                  return [3 /*break*/, 5];
                case 5:
                  skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                  if (!skipDispatch) {
                    dispatch(finalAction);
                  }
                  return [2 /*return*/, finalAction];
              }
            });
          });
        }();
        return Object.assign(promise2, {
          abort: abort,
          requestId: requestId,
          arg: arg,
          unwrap: function unwrap() {
            return promise2.then(unwrapResult);
          }
        });
      };
    }
    return Object.assign(actionCreator, {
      pending: pending,
      rejected: rejected,
      fulfilled: fulfilled,
      typePrefix: typePrefix
    });
  }
  createAsyncThunk2.withTypes = function () {
    return createAsyncThunk2;
  };
  return createAsyncThunk2;
}();
function unwrapResult(action) {
  if (action.meta && action.meta.rejectedWithValue) {
    throw action.payload;
  }
  if (action.error) {
    throw action.error;
  }
  return action.payload;
}
function isThenable(value) {
  return value !== null && typeof value === "object" && typeof value.then === "function";
}
// src/tsHelpers.ts
var hasMatchFunction = function hasMatchFunction(v) {
  return v && typeof v.match === "function";
};
// src/matchers.ts
var matches = function matches(matcher, action) {
  if (hasMatchFunction(matcher)) {
    return matcher.match(action);
  } else {
    return matcher(action);
  }
};
function isAnyOf() {
  var matchers = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    matchers[_i] = arguments[_i];
  }
  return function (action) {
    return matchers.some(function (matcher) {
      return matches(matcher, action);
    });
  };
}
function isAllOf() {
  var matchers = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    matchers[_i] = arguments[_i];
  }
  return function (action) {
    return matchers.every(function (matcher) {
      return matches(matcher, action);
    });
  };
}
function hasExpectedRequestMetadata(action, validStatus) {
  if (!action || !action.meta) return false;
  var hasValidRequestId = typeof action.meta.requestId === "string";
  var hasValidRequestStatus = validStatus.indexOf(action.meta.requestStatus) > -1;
  return hasValidRequestId && hasValidRequestStatus;
}
function isAsyncThunkArray(a) {
  return typeof a[0] === "function" && "pending" in a[0] && "fulfilled" in a[0] && "rejected" in a[0];
}
function isPending() {
  var asyncThunks = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    asyncThunks[_i] = arguments[_i];
  }
  if (asyncThunks.length === 0) {
    return function (action) {
      return hasExpectedRequestMetadata(action, ["pending"]);
    };
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isPending()(asyncThunks[0]);
  }
  return function (action) {
    var matchers = asyncThunks.map(function (asyncThunk) {
      return asyncThunk.pending;
    });
    var combinedMatcher = isAnyOf.apply(void 0, matchers);
    return combinedMatcher(action);
  };
}
function isRejected() {
  var asyncThunks = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    asyncThunks[_i] = arguments[_i];
  }
  if (asyncThunks.length === 0) {
    return function (action) {
      return hasExpectedRequestMetadata(action, ["rejected"]);
    };
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isRejected()(asyncThunks[0]);
  }
  return function (action) {
    var matchers = asyncThunks.map(function (asyncThunk) {
      return asyncThunk.rejected;
    });
    var combinedMatcher = isAnyOf.apply(void 0, matchers);
    return combinedMatcher(action);
  };
}
function isRejectedWithValue() {
  var asyncThunks = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    asyncThunks[_i] = arguments[_i];
  }
  var hasFlag = function hasFlag(action) {
    return action && action.meta && action.meta.rejectedWithValue;
  };
  if (asyncThunks.length === 0) {
    return function (action) {
      var combinedMatcher = isAllOf(isRejected.apply(void 0, asyncThunks), hasFlag);
      return combinedMatcher(action);
    };
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isRejectedWithValue()(asyncThunks[0]);
  }
  return function (action) {
    var combinedMatcher = isAllOf(isRejected.apply(void 0, asyncThunks), hasFlag);
    return combinedMatcher(action);
  };
}
function isFulfilled() {
  var asyncThunks = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    asyncThunks[_i] = arguments[_i];
  }
  if (asyncThunks.length === 0) {
    return function (action) {
      return hasExpectedRequestMetadata(action, ["fulfilled"]);
    };
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isFulfilled()(asyncThunks[0]);
  }
  return function (action) {
    var matchers = asyncThunks.map(function (asyncThunk) {
      return asyncThunk.fulfilled;
    });
    var combinedMatcher = isAnyOf.apply(void 0, matchers);
    return combinedMatcher(action);
  };
}
function isAsyncThunkAction() {
  var asyncThunks = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    asyncThunks[_i] = arguments[_i];
  }
  if (asyncThunks.length === 0) {
    return function (action) {
      return hasExpectedRequestMetadata(action, ["pending", "fulfilled", "rejected"]);
    };
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isAsyncThunkAction()(asyncThunks[0]);
  }
  return function (action) {
    var matchers = [];
    for (var _i = 0, asyncThunks_1 = asyncThunks; _i < asyncThunks_1.length; _i++) {
      var asyncThunk = asyncThunks_1[_i];
      matchers.push(asyncThunk.pending, asyncThunk.rejected, asyncThunk.fulfilled);
    }
    var combinedMatcher = isAnyOf.apply(void 0, matchers);
    return combinedMatcher(action);
  };
}
// src/listenerMiddleware/utils.ts
var assertFunction = function assertFunction(func, expected) {
  if (typeof func !== "function") {
    throw new TypeError(expected + " is not a function");
  }
};
var noop = function noop() {};
var catchRejection = function catchRejection(promise2, onError) {
  if (onError === void 0) {
    onError = noop;
  }
  promise2["catch"](onError);
  return promise2;
};
var addAbortSignalListener = function addAbortSignalListener(abortSignal, callback) {
  abortSignal.addEventListener("abort", callback, {
    once: true
  });
  return function () {
    return abortSignal.removeEventListener("abort", callback);
  };
};
var abortControllerWithReason = function abortControllerWithReason(abortController, reason) {
  var signal = abortController.signal;
  if (signal.aborted) {
    return;
  }
  if (!("reason" in signal)) {
    Object.defineProperty(signal, "reason", {
      enumerable: true,
      value: reason,
      configurable: true,
      writable: true
    });
  }
  ;
  abortController.abort(reason);
};
// src/listenerMiddleware/exceptions.ts
var task = "task";
var listener = "listener";
var completed = "completed";
var cancelled = "cancelled";
var taskCancelled = "task-" + cancelled;
var taskCompleted = "task-" + completed;
var listenerCancelled = listener + "-" + cancelled;
var listenerCompleted = listener + "-" + completed;
var TaskAbortError = /** @class */function () {
  function TaskAbortError(code) {
    this.code = code;
    this.name = "TaskAbortError";
    this.message = task + " " + cancelled + " (reason: " + code + ")";
  }
  return TaskAbortError;
}();
// src/listenerMiddleware/task.ts
var validateActive = function validateActive(signal) {
  if (signal.aborted) {
    throw new TaskAbortError(signal.reason);
  }
};
function raceWithSignal(signal, promise2) {
  var cleanup = noop;
  return new Promise(function (resolve, reject) {
    var notifyRejection = function notifyRejection() {
      return reject(new TaskAbortError(signal.reason));
    };
    if (signal.aborted) {
      notifyRejection();
      return;
    }
    cleanup = addAbortSignalListener(signal, notifyRejection);
    promise2["finally"](function () {
      return cleanup();
    }).then(resolve, reject);
  })["finally"](function () {
    cleanup = noop;
  });
}
var runTask = function runTask(task2, cleanUp) {
  return __async(void 0, null, function () {
    var value, error_1;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 3, 4, 5]);
          return [4 /*yield*/, Promise.resolve()];
        case 1:
          _c.sent();
          return [4 /*yield*/, task2()];
        case 2:
          value = _c.sent();
          return [2 /*return*/, {
            status: "ok",
            value: value
          }];
        case 3:
          error_1 = _c.sent();
          return [2 /*return*/, {
            status: error_1 instanceof TaskAbortError ? "cancelled" : "rejected",
            error: error_1
          }];
        case 4:
          cleanUp == null ? void 0 : cleanUp();
          return [7 /*endfinally*/];
        case 5:
          return [2 /*return*/];
      }
    });
  });
};

var createPause = function createPause(signal) {
  return function (promise2) {
    return catchRejection(raceWithSignal(signal, promise2).then(function (output) {
      validateActive(signal);
      return output;
    }));
  };
};
var createDelay = function createDelay(signal) {
  var pause = createPause(signal);
  return function (timeoutMs) {
    return pause(new Promise(function (resolve) {
      return setTimeout(resolve, timeoutMs);
    }));
  };
};
// src/listenerMiddleware/index.ts
var redux_toolkit_esm_assign = Object.assign;
var INTERNAL_NIL_TOKEN = {};
var alm = "listenerMiddleware";
var createFork = function createFork(parentAbortSignal) {
  var linkControllers = function linkControllers(controller) {
    return addAbortSignalListener(parentAbortSignal, function () {
      return abortControllerWithReason(controller, parentAbortSignal.reason);
    });
  };
  return function (taskExecutor) {
    assertFunction(taskExecutor, "taskExecutor");
    var childAbortController = new AbortController();
    linkControllers(childAbortController);
    var result = runTask(function () {
      return __async(void 0, null, function () {
        var result2;
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              validateActive(parentAbortSignal);
              validateActive(childAbortController.signal);
              return [4 /*yield*/, taskExecutor({
                pause: createPause(childAbortController.signal),
                delay: createDelay(childAbortController.signal),
                signal: childAbortController.signal
              })];
            case 1:
              result2 = _c.sent();
              validateActive(childAbortController.signal);
              return [2 /*return*/, result2];
          }
        });
      });
    }, function () {
      return abortControllerWithReason(childAbortController, taskCompleted);
    });
    return {
      result: createPause(parentAbortSignal)(result),
      cancel: function cancel() {
        abortControllerWithReason(childAbortController, taskCancelled);
      }
    };
  };
};
var createTakePattern = function createTakePattern(startListening, signal) {
  var take = function take(predicate, timeout) {
    return __async(void 0, null, function () {
      var unsubscribe, tuplePromise, promises, output;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            validateActive(signal);
            unsubscribe = function unsubscribe() {};
            tuplePromise = new Promise(function (resolve, reject) {
              var stopListening = startListening({
                predicate: predicate,
                effect: function effect(action, listenerApi) {
                  listenerApi.unsubscribe();
                  resolve([action, listenerApi.getState(), listenerApi.getOriginalState()]);
                }
              });
              unsubscribe = function unsubscribe() {
                stopListening();
                reject();
              };
            });
            promises = [tuplePromise];
            if (timeout != null) {
              promises.push(new Promise(function (resolve) {
                return setTimeout(resolve, timeout, null);
              }));
            }
            _c.label = 1;
          case 1:
            _c.trys.push([1,, 3, 4]);
            return [4 /*yield*/, raceWithSignal(signal, Promise.race(promises))];
          case 2:
            output = _c.sent();
            validateActive(signal);
            return [2 /*return*/, output];
          case 3:
            unsubscribe();
            return [7 /*endfinally*/];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };

  return function (predicate, timeout) {
    return catchRejection(take(predicate, timeout));
  };
};
var getListenerEntryPropsFrom = function getListenerEntryPropsFrom(options) {
  var type = options.type,
    actionCreator = options.actionCreator,
    matcher = options.matcher,
    predicate = options.predicate,
    effect = options.effect;
  if (type) {
    predicate = createAction(type).match;
  } else if (actionCreator) {
    type = actionCreator.type;
    predicate = actionCreator.match;
  } else if (matcher) {
    predicate = matcher;
  } else if (predicate) {} else {
    throw new Error("Creating or removing a listener requires one of the known fields for matching an action");
  }
  assertFunction(effect, "options.listener");
  return {
    predicate: predicate,
    type: type,
    effect: effect
  };
};
var createListenerEntry = function createListenerEntry(options) {
  var _c = getListenerEntryPropsFrom(options),
    type = _c.type,
    predicate = _c.predicate,
    effect = _c.effect;
  var id = nanoid();
  var entry = {
    id: id,
    effect: effect,
    type: type,
    predicate: predicate,
    pending: new Set(),
    unsubscribe: function unsubscribe() {
      throw new Error("Unsubscribe not initialized");
    }
  };
  return entry;
};
var cancelActiveListeners = function cancelActiveListeners(entry) {
  entry.pending.forEach(function (controller) {
    abortControllerWithReason(controller, listenerCancelled);
  });
};
var createClearListenerMiddleware = function createClearListenerMiddleware(listenerMap) {
  return function () {
    listenerMap.forEach(cancelActiveListeners);
    listenerMap.clear();
  };
};
var safelyNotifyError = function safelyNotifyError(errorHandler, errorToNotify, errorInfo) {
  try {
    errorHandler(errorToNotify, errorInfo);
  } catch (errorHandlerError) {
    setTimeout(function () {
      throw errorHandlerError;
    }, 0);
  }
};
var addListener = createAction(alm + "/add");
var clearAllListeners = createAction(alm + "/removeAll");
var removeListener = createAction(alm + "/remove");
var defaultErrorHandler = function defaultErrorHandler() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  console.error.apply(console, __spreadArray([alm + "/error"], args));
};
function createListenerMiddleware(middlewareOptions) {
  var _this = this;
  if (middlewareOptions === void 0) {
    middlewareOptions = {};
  }
  var listenerMap = new Map();
  var extra = middlewareOptions.extra,
    _c = middlewareOptions.onError,
    onError = _c === void 0 ? defaultErrorHandler : _c;
  assertFunction(onError, "onError");
  var insertEntry = function insertEntry(entry) {
    entry.unsubscribe = function () {
      return listenerMap["delete"](entry.id);
    };
    listenerMap.set(entry.id, entry);
    return function (cancelOptions) {
      entry.unsubscribe();
      if (cancelOptions == null ? void 0 : cancelOptions.cancelActive) {
        cancelActiveListeners(entry);
      }
    };
  };
  var findListenerEntry = function findListenerEntry(comparator) {
    for (var _i = 0, _c = Array.from(listenerMap.values()); _i < _c.length; _i++) {
      var entry = _c[_i];
      if (comparator(entry)) {
        return entry;
      }
    }
    return void 0;
  };
  var startListening = function startListening(options) {
    var entry = findListenerEntry(function (existingEntry) {
      return existingEntry.effect === options.effect;
    });
    if (!entry) {
      entry = createListenerEntry(options);
    }
    return insertEntry(entry);
  };
  var stopListening = function stopListening(options) {
    var _c = getListenerEntryPropsFrom(options),
      type = _c.type,
      effect = _c.effect,
      predicate = _c.predicate;
    var entry = findListenerEntry(function (entry2) {
      var matchPredicateOrType = typeof type === "string" ? entry2.type === type : entry2.predicate === predicate;
      return matchPredicateOrType && entry2.effect === effect;
    });
    if (entry) {
      entry.unsubscribe();
      if (options.cancelActive) {
        cancelActiveListeners(entry);
      }
    }
    return !!entry;
  };
  var notifyListener = function notifyListener(entry, action, api, getOriginalState) {
    return __async(_this, null, function () {
      var internalTaskController, take, listenerError_1;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            internalTaskController = new AbortController();
            take = createTakePattern(startListening, internalTaskController.signal);
            _c.label = 1;
          case 1:
            _c.trys.push([1, 3, 4, 5]);
            entry.pending.add(internalTaskController);
            return [4 /*yield*/, Promise.resolve(entry.effect(action, redux_toolkit_esm_assign({}, api, {
              getOriginalState: getOriginalState,
              condition: function condition(predicate, timeout) {
                return take(predicate, timeout).then(Boolean);
              },
              take: take,
              delay: createDelay(internalTaskController.signal),
              pause: createPause(internalTaskController.signal),
              extra: extra,
              signal: internalTaskController.signal,
              fork: createFork(internalTaskController.signal),
              unsubscribe: entry.unsubscribe,
              subscribe: function subscribe() {
                listenerMap.set(entry.id, entry);
              },
              cancelActiveListeners: function cancelActiveListeners() {
                entry.pending.forEach(function (controller, _, set) {
                  if (controller !== internalTaskController) {
                    abortControllerWithReason(controller, listenerCancelled);
                    set["delete"](controller);
                  }
                });
              }
            })))];
          case 2:
            _c.sent();
            return [3 /*break*/, 5];
          case 3:
            listenerError_1 = _c.sent();
            if (!(listenerError_1 instanceof TaskAbortError)) {
              safelyNotifyError(onError, listenerError_1, {
                raisedBy: "effect"
              });
            }
            return [3 /*break*/, 5];
          case 4:
            abortControllerWithReason(internalTaskController, listenerCompleted);
            entry.pending["delete"](internalTaskController);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };

  var clearListenerMiddleware = createClearListenerMiddleware(listenerMap);
  var middleware = function middleware(api) {
    return function (next) {
      return function (action) {
        if (!isAction(action)) {
          return next(action);
        }
        if (addListener.match(action)) {
          return startListening(action.payload);
        }
        if (clearAllListeners.match(action)) {
          clearListenerMiddleware();
          return;
        }
        if (removeListener.match(action)) {
          return stopListening(action.payload);
        }
        var originalState = api.getState();
        var getOriginalState = function getOriginalState() {
          if (originalState === INTERNAL_NIL_TOKEN) {
            throw new Error(alm + ": getOriginalState can only be called synchronously");
          }
          return originalState;
        };
        var result;
        try {
          result = next(action);
          if (listenerMap.size > 0) {
            var currentState = api.getState();
            var listenerEntries = Array.from(listenerMap.values());
            for (var _i = 0, listenerEntries_1 = listenerEntries; _i < listenerEntries_1.length; _i++) {
              var entry = listenerEntries_1[_i];
              var runListener = false;
              try {
                runListener = entry.predicate(action, currentState, originalState);
              } catch (predicateError) {
                runListener = false;
                safelyNotifyError(onError, predicateError, {
                  raisedBy: "predicate"
                });
              }
              if (!runListener) {
                continue;
              }
              notifyListener(entry, action, api, getOriginalState);
            }
          }
        } finally {
          originalState = INTERNAL_NIL_TOKEN;
        }
        return result;
      };
    };
  };
  return {
    middleware: middleware,
    startListening: startListening,
    stopListening: stopListening,
    clearListeners: clearListenerMiddleware
  };
}
// src/autoBatchEnhancer.ts
var SHOULD_AUTOBATCH = "RTK_autoBatch";
var prepareAutoBatched = function prepareAutoBatched() {
  return function (payload) {
    var _c;
    return {
      payload: payload,
      meta: (_c = {}, _c[SHOULD_AUTOBATCH] = true, _c)
    };
  };
};
var promise;
var queueMicrotaskShim = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : globalThis) : function (cb) {
  return (promise || (promise = Promise.resolve())).then(cb)["catch"](function (err) {
    return setTimeout(function () {
      throw err;
    }, 0);
  });
};
var createQueueWithTimer = function createQueueWithTimer(timeout) {
  return function (notify) {
    setTimeout(notify, timeout);
  };
};
var rAF = typeof window !== "undefined" && window.requestAnimationFrame ? window.requestAnimationFrame : createQueueWithTimer(10);
var autoBatchEnhancer = function autoBatchEnhancer(options) {
  if (options === void 0) {
    options = {
      type: "raf"
    };
  }
  return function (next) {
    return function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var store = next.apply(void 0, args);
      var notifying = true;
      var shouldNotifyAtEndOfTick = false;
      var notificationQueued = false;
      var listeners = new Set();
      var queueCallback = options.type === "tick" ? queueMicrotaskShim : options.type === "raf" ? rAF : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
      var notifyListeners = function notifyListeners() {
        notificationQueued = false;
        if (shouldNotifyAtEndOfTick) {
          shouldNotifyAtEndOfTick = false;
          listeners.forEach(function (l) {
            return l();
          });
        }
      };
      return Object.assign({}, store, {
        subscribe: function subscribe(listener2) {
          var wrappedListener = function wrappedListener() {
            return notifying && listener2();
          };
          var unsubscribe = store.subscribe(wrappedListener);
          listeners.add(listener2);
          return function () {
            unsubscribe();
            listeners["delete"](listener2);
          };
        },
        dispatch: function dispatch(action) {
          var _a;
          try {
            notifying = !((_a = action == null ? void 0 : action.meta) == null ? void 0 : _a[SHOULD_AUTOBATCH]);
            shouldNotifyAtEndOfTick = !notifying;
            if (shouldNotifyAtEndOfTick) {
              if (!notificationQueued) {
                notificationQueued = true;
                queueCallback(notifyListeners);
              }
            }
            return store.dispatch(action);
          } finally {
            notifying = true;
          }
        }
      });
    };
  };
};
// src/index.ts
F();

//# sourceMappingURL=redux-toolkit.esm.js.map
;// CONCATENATED MODULE: ./node_modules/redux-persist/es/constants.js
var KEY_PREFIX = 'persist:';
var FLUSH = 'persist/FLUSH';
var REHYDRATE = 'persist/REHYDRATE';
var PAUSE = 'persist/PAUSE';
var PERSIST = 'persist/PERSIST';
var PURGE = 'persist/PURGE';
var REGISTER = 'persist/REGISTER';
var DEFAULT_VERSION = -1;
;// CONCATENATED MODULE: ./node_modules/redux-persist/es/stateReconciler/autoMergeLevel1.js
function autoMergeLevel1_typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    autoMergeLevel1_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    autoMergeLevel1_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return autoMergeLevel1_typeof(obj);
}
function autoMergeLevel1_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      autoMergeLevel1_ownKeys(source, true).forEach(function (key) {
        autoMergeLevel1_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      autoMergeLevel1_ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function autoMergeLevel1_defineProperty(obj, key, value) {
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

/*
  autoMergeLevel1: 
    - merges 1 level of substate
    - skips substate if already modified
*/
function autoMergeLevel1(inboundState, originalState, reducedState, _ref) {
  var debug = _ref.debug;
  var newState = _objectSpread({}, reducedState); // only rehydrate if inboundState exists and is an object

  if (inboundState && autoMergeLevel1_typeof(inboundState) === 'object') {
    Object.keys(inboundState).forEach(function (key) {
      // ignore _persist data
      if (key === '_persist') return; // if reducer modifies substate, skip auto rehydration

      if (originalState[key] !== reducedState[key]) {
        if (false) {}
        return;
      } // otherwise hard set the new value

      newState[key] = inboundState[key];
    });
  }
  if (false) {}
  return newState;
}
;// CONCATENATED MODULE: ./node_modules/redux-persist/es/createPersistoid.js

// @TODO remove once flow < 0.63 support is no longer required.
function createPersistoid(config) {
  // defaults
  var blacklist = config.blacklist || null;
  var whitelist = config.whitelist || null;
  var transforms = config.transforms || [];
  var throttle = config.throttle || 0;
  var storageKey = "".concat(config.keyPrefix !== undefined ? config.keyPrefix : KEY_PREFIX).concat(config.key);
  var storage = config.storage;
  var serialize;
  if (config.serialize === false) {
    serialize = function serialize(x) {
      return x;
    };
  } else if (typeof config.serialize === 'function') {
    serialize = config.serialize;
  } else {
    serialize = defaultSerialize;
  }
  var writeFailHandler = config.writeFailHandler || null; // initialize stateful values

  var lastState = {};
  var stagedState = {};
  var keysToProcess = [];
  var timeIterator = null;
  var writePromise = null;
  var update = function update(state) {
    // add any changed keys to the queue
    Object.keys(state).forEach(function (key) {
      if (!passWhitelistBlacklist(key)) return; // is keyspace ignored? noop

      if (lastState[key] === state[key]) return; // value unchanged? noop

      if (keysToProcess.indexOf(key) !== -1) return; // is key already queued? noop

      keysToProcess.push(key); // add key to queue
    }); //if any key is missing in the new state which was present in the lastState,
    //add it for processing too

    Object.keys(lastState).forEach(function (key) {
      if (state[key] === undefined && passWhitelistBlacklist(key) && keysToProcess.indexOf(key) === -1 && lastState[key] !== undefined) {
        keysToProcess.push(key);
      }
    }); // start the time iterator if not running (read: throttle)

    if (timeIterator === null) {
      timeIterator = setInterval(processNextKey, throttle);
    }
    lastState = state;
  };
  function processNextKey() {
    if (keysToProcess.length === 0) {
      if (timeIterator) clearInterval(timeIterator);
      timeIterator = null;
      return;
    }
    var key = keysToProcess.shift();
    var endState = transforms.reduce(function (subState, transformer) {
      return transformer["in"](subState, key, lastState);
    }, lastState[key]);
    if (endState !== undefined) {
      try {
        stagedState[key] = serialize(endState);
      } catch (err) {
        console.error('redux-persist/createPersistoid: error serializing state', err);
      }
    } else {
      //if the endState is undefined, no need to persist the existing serialized content
      delete stagedState[key];
    }
    if (keysToProcess.length === 0) {
      writeStagedState();
    }
  }
  function writeStagedState() {
    // cleanup any removed keys just before write.
    Object.keys(stagedState).forEach(function (key) {
      if (lastState[key] === undefined) {
        delete stagedState[key];
      }
    });
    writePromise = storage.setItem(storageKey, serialize(stagedState))["catch"](onWriteFail);
  }
  function passWhitelistBlacklist(key) {
    if (whitelist && whitelist.indexOf(key) === -1 && key !== '_persist') return false;
    if (blacklist && blacklist.indexOf(key) !== -1) return false;
    return true;
  }
  function onWriteFail(err) {
    // @TODO add fail handlers (typically storage full)
    if (writeFailHandler) writeFailHandler(err);
    if (err && "production" !== 'production') {}
  }
  var flush = function flush() {
    while (keysToProcess.length !== 0) {
      processNextKey();
    }
    return writePromise || Promise.resolve();
  }; // return `persistoid`

  return {
    update: update,
    flush: flush
  };
} // @NOTE in the future this may be exposed via config

function defaultSerialize(data) {
  return JSON.stringify(data);
}
;// CONCATENATED MODULE: ./node_modules/redux-persist/es/getStoredState.js

function getStoredState_getStoredState(config) {
  var transforms = config.transforms || [];
  var storageKey = "".concat(config.keyPrefix !== undefined ? config.keyPrefix : KEY_PREFIX).concat(config.key);
  var storage = config.storage;
  var debug = config.debug;
  var deserialize;
  if (config.deserialize === false) {
    deserialize = function deserialize(x) {
      return x;
    };
  } else if (typeof config.deserialize === 'function') {
    deserialize = config.deserialize;
  } else {
    deserialize = defaultDeserialize;
  }
  return storage.getItem(storageKey).then(function (serialized) {
    if (!serialized) return undefined;else {
      try {
        var state = {};
        var rawState = deserialize(serialized);
        Object.keys(rawState).forEach(function (key) {
          state[key] = transforms.reduceRight(function (subState, transformer) {
            return transformer.out(subState, key, rawState);
          }, deserialize(rawState[key]));
        });
        return state;
      } catch (err) {
        if (false) {}
        throw err;
      }
    }
  });
}
function defaultDeserialize(serial) {
  return JSON.parse(serial);
}
;// CONCATENATED MODULE: ./node_modules/redux-persist/es/purgeStoredState.js

function purgeStoredState(config) {
  var storage = config.storage;
  var storageKey = "".concat(config.keyPrefix !== undefined ? config.keyPrefix : KEY_PREFIX).concat(config.key);
  return storage.removeItem(storageKey, warnIfRemoveError);
}
function warnIfRemoveError(err) {
  if (err && "production" !== 'production') {}
}
;// CONCATENATED MODULE: ./node_modules/redux-persist/es/persistReducer.js
function persistReducer_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function persistReducer_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      persistReducer_ownKeys(source, true).forEach(function (key) {
        persistReducer_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      persistReducer_ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function persistReducer_defineProperty(obj, key, value) {
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
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = persistReducer_objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function persistReducer_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}





var DEFAULT_TIMEOUT = 5000;
/*
  @TODO add validation / handling for:
  - persisting a reducer which has nested _persist
  - handling actions that fire before reydrate is called
*/

function persistReducer(config, baseReducer) {
  if (false) {}
  var version = config.version !== undefined ? config.version : DEFAULT_VERSION;
  var debug = config.debug || false;
  var stateReconciler = config.stateReconciler === undefined ? autoMergeLevel1 : config.stateReconciler;
  var getStoredState = config.getStoredState || getStoredState_getStoredState;
  var timeout = config.timeout !== undefined ? config.timeout : DEFAULT_TIMEOUT;
  var _persistoid = null;
  var _purge = false;
  var _paused = true;
  var conditionalUpdate = function conditionalUpdate(state) {
    // update the persistoid only if we are rehydrated and not paused
    state._persist.rehydrated && _persistoid && !_paused && _persistoid.update(state);
    return state;
  };
  return function (state, action) {
    var _ref = state || {},
      _persist = _ref._persist,
      rest = _objectWithoutProperties(_ref, ["_persist"]); // $FlowIgnore need to update State type

    var restState = rest;
    if (action.type === PERSIST) {
      var _sealed = false;
      var _rehydrate = function _rehydrate(payload, err) {
        // dev warning if we are already sealed
        if (false) {} // only rehydrate if we are not already sealed

        if (!_sealed) {
          action.rehydrate(config.key, payload, err);
          _sealed = true;
        }
      };
      timeout && setTimeout(function () {
        !_sealed && _rehydrate(undefined, new Error("redux-persist: persist timed out for persist key \"".concat(config.key, "\"")));
      }, timeout); // @NOTE PERSIST resumes if paused.

      _paused = false; // @NOTE only ever create persistoid once, ensure we call it at least once, even if _persist has already been set

      if (!_persistoid) _persistoid = createPersistoid(config); // @NOTE PERSIST can be called multiple times, noop after the first

      if (_persist) {
        // We still need to call the base reducer because there might be nested
        // uses of persistReducer which need to be aware of the PERSIST action
        return persistReducer_objectSpread({}, baseReducer(restState, action), {
          _persist: _persist
        });
      }
      if (typeof action.rehydrate !== 'function' || typeof action.register !== 'function') throw new Error('redux-persist: either rehydrate or register is not a function on the PERSIST action. This can happen if the action is being replayed. This is an unexplored use case, please open an issue and we will figure out a resolution.');
      action.register(config.key);
      getStoredState(config).then(function (restoredState) {
        var migrate = config.migrate || function (s, v) {
          return Promise.resolve(s);
        };
        migrate(restoredState, version).then(function (migratedState) {
          _rehydrate(migratedState);
        }, function (migrateErr) {
          if (false) {}
          _rehydrate(undefined, migrateErr);
        });
      }, function (err) {
        _rehydrate(undefined, err);
      });
      return persistReducer_objectSpread({}, baseReducer(restState, action), {
        _persist: {
          version: version,
          rehydrated: false
        }
      });
    } else if (action.type === PURGE) {
      _purge = true;
      action.result(purgeStoredState(config));
      return persistReducer_objectSpread({}, baseReducer(restState, action), {
        _persist: _persist
      });
    } else if (action.type === FLUSH) {
      action.result(_persistoid && _persistoid.flush());
      return persistReducer_objectSpread({}, baseReducer(restState, action), {
        _persist: _persist
      });
    } else if (action.type === PAUSE) {
      _paused = true;
    } else if (action.type === REHYDRATE) {
      // noop on restState if purging
      if (_purge) return persistReducer_objectSpread({}, restState, {
        _persist: persistReducer_objectSpread({}, _persist, {
          rehydrated: true
        }) // @NOTE if key does not match, will continue to default else below
      });

      if (action.key === config.key) {
        var reducedState = baseReducer(restState, action);
        var inboundState = action.payload; // only reconcile state if stateReconciler and inboundState are both defined

        var reconciledRest = stateReconciler !== false && inboundState !== undefined ? stateReconciler(inboundState, state, reducedState, config) : reducedState;
        var _newState = persistReducer_objectSpread({}, reconciledRest, {
          _persist: persistReducer_objectSpread({}, _persist, {
            rehydrated: true
          })
        });
        return conditionalUpdate(_newState);
      }
    } // if we have not already handled PERSIST, straight passthrough

    if (!_persist) return baseReducer(state, action); // run base reducer:
    // is state modified ? return original : return updated

    var newState = baseReducer(restState, action);
    if (newState === restState) return state;
    return conditionalUpdate(persistReducer_objectSpread({}, newState, {
      _persist: _persist
    }));
  };
}
;// CONCATENATED MODULE: ./src/store/storage.ts
var unityStorage={getItem:function getItem(x){var item=localStorage.getItem(x);if(item){try{return Promise.resolve(JSON.parse(item));}catch(_unused){}}return Promise.resolve(null);},setItem:function setItem(x,v){localStorage.setItem(x,JSON.stringify(v));return Promise.resolve();},removeItem:function removeItem(x){localStorage.removeItem(x);return Promise.resolve();}};
;// CONCATENATED MODULE: ./src/assets/icons/skoll/glock.png
const glock_namespaceObject = __webpack_require__.p + "static/media/glock.png";
;// CONCATENATED MODULE: ./src/assets/icons/skoll/stiletto.png
const stiletto_namespaceObject = __webpack_require__.p + "static/media/stiletto.png";
;// CONCATENATED MODULE: ./src/assets/icons/skoll/ak47.png
const ak47_namespaceObject = __webpack_require__.p + "static/media/ak47.png";
;// CONCATENATED MODULE: ./src/assets/icons/skoll/bowie-knife.png
const bowie_knife_namespaceObject = __webpack_require__.p + "static/media/bowie-knife.png";
;// CONCATENATED MODULE: ./src/store/slices/inventory.ts
var defaultItems=[{image:glock_namespaceObject,slot:4},{image:stiletto_namespaceObject,slot:0},{image:ak47_namespaceObject,slot:1},{image:bowie_knife_namespaceObject,slot:2}];var inventorySlice=createSlice({name:'inventory',initialState:{items:defaultItems,size:50},reducers:{swapItems:function swapItems(st,_ref){var _ref$payload=_ref.payload,slot1=_ref$payload.slot1,slot2=_ref$payload.slot2;var item1=st.items.find(function(x){return x.slot===slot1;});var item2=st.items.find(function(x){return x.slot===slot2;});if(item1)item1.slot=slot2;if(item2)item2.slot=slot1;}}});var swapItems=inventorySlice.actions.swapItems;var persistConfig={storage:unityStorage,key:'inventory',blacklist:['items']};var inventoryReducer=persistReducer(persistConfig,inventorySlice.reducer);
// EXTERNAL MODULE: ../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./src/inventory/index.module.scss
var index_module = __webpack_require__("../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./src/inventory/index.module.scss");
;// CONCATENATED MODULE: ./src/inventory/index.module.scss

      
      
      
      
      
      
      
      
      

var index_module_options = {};

index_module_options.styleTagTransform = (styleTagTransform_default());
index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      index_module_options.insert = insertBySelector_default().bind(null, "head");
    
index_module_options.domAPI = (styleDomAPI_default());
index_module_options.insertStyleElement = (insertStyleElement_default());

var index_module_update = injectStylesIntoStyleTag_default()(index_module/* default */.Z, index_module_options);




       /* harmony default export */ const inventory_index_module = (index_module/* default */.Z && index_module/* default */.Z.locals ? index_module/* default */.Z.locals : undefined);

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ./src/inventory/index.tsx
var draggingItem;function Item(_ref){var item=_ref.item;var ref=(0,react.useRef)();var dragRef=(0,react.useRef)({startPoint:null});if(!item)return null;var beginDrag=function beginDrag(ev){dragRef.current.startPoint=ev.position;draggingItem=item;};var onDrag=function onDrag(ev){if(!dragRef.current.startPoint)return;var inline=ref.current.Style;inline.zIndex=5;inline.pointerEvents='none';inline.translate="".concat(ev.position.x-ev.pressPosition.x,"px ").concat(ev.pressPosition.y-ev.position.y);};var endDrag=function endDrag(ev){if(!dragRef.current.startPoint)return;dragRef.current.startPoint=null;draggingItem=null;var inline=ref.current.Style;inline.pointerEvents=null;inline.zIndex=null;inline.translate=null;};return/*#__PURE__*/(0,jsx_runtime.jsx)("view",{className:inventory_index_module.item,onBeginDrag:beginDrag,onDrag:onDrag,onEndDrag:endDrag,ref:ref,children:/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:item.image})});}function Inventory(){var slotCount=useSelector(function(x){return x.inventory.size;});var items=useSelector(function(x){return x.inventory.items;});var slots=(0,react.useMemo)(function(){return new Array(slotCount).fill(null);},[slotCount]);var dispatch=useDispatch();return/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:inventory_index_module.host,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("scroll",{className:inventory_index_module.frame,children:/*#__PURE__*/(0,jsx_runtime.jsx)("view",{className:inventory_index_module.items,children:slots.map(function(x,i){var _itemInSlot$image;var itemInSlot=items.find(function(x){return x.slot===i;});return/*#__PURE__*/(0,jsx_runtime.jsx)("view",{className:inventory_index_module.itemSlot,"data-index":i,onDrop:function onDrop(ev){if(draggingItem){dispatch(swapItems({slot1:draggingItem.slot,slot2:i}));draggingItem=null;}},children:/*#__PURE__*/(0,jsx_runtime.jsx)(Item,{item:itemInSlot},(_itemInSlot$image=itemInSlot===null||itemInSlot===void 0?void 0:itemInSlot.image)!==null&&_itemInSlot$image!==void 0?_itemInSlot$image:i)},i);})})}),/*#__PURE__*/(0,jsx_runtime.jsx)("view",{className:inventory_index_module.border})]});}
;// CONCATENATED MODULE: ./node_modules/redux-persist/es/persistStore.js
function persistStore_toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}
function persistStore_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function persistStore_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      persistStore_ownKeys(source, true).forEach(function (key) {
        persistStore_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      persistStore_ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function persistStore_defineProperty(obj, key, value) {
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


var initialState = {
  registry: [],
  bootstrapped: false
};
var persistorReducer = function persistorReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case REGISTER:
      return persistStore_objectSpread({}, state, {
        registry: [].concat(persistStore_toConsumableArray(state.registry), [action.key])
      });
    case REHYDRATE:
      var firstIndex = state.registry.indexOf(action.key);
      var registry = persistStore_toConsumableArray(state.registry);
      registry.splice(firstIndex, 1);
      return persistStore_objectSpread({}, state, {
        registry: registry,
        bootstrapped: registry.length === 0
      });
    default:
      return state;
  }
};
function persistStore(store, options, cb) {
  // help catch incorrect usage of passing PersistConfig in as PersistorOptions
  if (false) { var bannedKeys, optionsToTest; }
  var boostrappedCb = cb || false;
  var _pStore = createStore(persistorReducer, initialState, options && options.enhancer ? options.enhancer : undefined);
  var register = function register(key) {
    _pStore.dispatch({
      type: REGISTER,
      key: key
    });
  };
  var rehydrate = function rehydrate(key, payload, err) {
    var rehydrateAction = {
      type: REHYDRATE,
      payload: payload,
      err: err,
      key: key // dispatch to `store` to rehydrate and `persistor` to track result
    };

    store.dispatch(rehydrateAction);
    _pStore.dispatch(rehydrateAction);
    if (boostrappedCb && persistor.getState().bootstrapped) {
      boostrappedCb();
      boostrappedCb = false;
    }
  };
  var persistor = persistStore_objectSpread({}, _pStore, {
    purge: function purge() {
      var results = [];
      store.dispatch({
        type: PURGE,
        result: function result(purgeResult) {
          results.push(purgeResult);
        }
      });
      return Promise.all(results);
    },
    flush: function flush() {
      var results = [];
      store.dispatch({
        type: FLUSH,
        result: function result(flushResult) {
          results.push(flushResult);
        }
      });
      return Promise.all(results);
    },
    pause: function pause() {
      store.dispatch({
        type: PAUSE
      });
    },
    persist: function persist() {
      store.dispatch({
        type: PERSIST,
        register: register,
        rehydrate: rehydrate
      });
    }
  });
  if (!(options && options.manualPersist)) {
    persistor.persist();
  }
  return persistor;
}
;// CONCATENATED MODULE: ./src/store/index.ts
var store=configureStore({reducer:{inventory:inventoryReducer},devTools:false,middleware:function middleware(getDefaultMiddleware){return getDefaultMiddleware({serializableCheck:false,thunk:true,immutableCheck:false});}});var persistor=persistStore(store);
;// CONCATENATED MODULE: ./src/index.tsx
function Root(){return/*#__PURE__*/(0,jsx_runtime.jsx)("view",{children:/*#__PURE__*/(0,jsx_runtime.jsx)(Inventory,{})});}function Main(){return/*#__PURE__*/(0,jsx_runtime.jsx)(PersistGate,{persistor:persistor,children:/*#__PURE__*/(0,jsx_runtime.jsx)(components_Provider,{store:store,children:/*#__PURE__*/(0,jsx_runtime.jsx)(Root,{})})});}(0,dist.render)(/*#__PURE__*/(0,jsx_runtime.jsx)(Main,{}));
})();

/******/ })()
;