/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 989:
/***/ ((module) => {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

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
  }; // import a list of modules into the list


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

/***/ 367:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 502:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(222);
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

/***/ 91:
/***/ ((module) => {

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

/***/ 389:
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

/***/ 222:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(389);
} else {}

/***/ }),

/***/ 192:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/** @license React v0.26.2
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

  var aa = __webpack_require__(91),
      ba = __webpack_require__(792),
      m = __webpack_require__(481);

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

/***/ }),

/***/ 630:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(192);
} else {}

/***/ }),

/***/ 954:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var b = 60103,
    c = 60106,
    d = 60107,
    e = 60108,
    f = 60114,
    g = 60109,
    h = 60110,
    k = 60112,
    l = 60113,
    m = 60120,
    n = 60115,
    p = 60116,
    q = 60121,
    r = 60122,
    u = 60117,
    v = 60129,
    w = 60131;

if ("function" === typeof Symbol && Symbol["for"]) {
  var x = Symbol["for"];
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k = x("react.forward_ref");
  l = x("react.suspense");
  m = x("react.suspense_list");
  n = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}

function y(a) {
  if ("object" === typeof a && null !== a) {
    var t = a.$$typeof;

    switch (t) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case l:
          case m:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k:
              case p:
              case n:
              case g:
                return a;

              default:
                return t;
            }

        }

      case c:
        return t;
    }
  }
}

var z = g,
    A = b,
    B = k,
    C = d,
    D = p,
    E = n,
    F = c,
    G = f,
    H = e,
    I = l;
__webpack_unused_export__ = h;
__webpack_unused_export__ = z;
__webpack_unused_export__ = A;
__webpack_unused_export__ = B;
__webpack_unused_export__ = C;
__webpack_unused_export__ = D;
__webpack_unused_export__ = E;
__webpack_unused_export__ = F;
__webpack_unused_export__ = G;
__webpack_unused_export__ = H;
__webpack_unused_export__ = I;

__webpack_unused_export__ = function () {
  return !1;
};

__webpack_unused_export__ = function () {
  return !1;
};

__webpack_unused_export__ = function (a) {
  return y(a) === h;
};

__webpack_unused_export__ = function (a) {
  return y(a) === g;
};

__webpack_unused_export__ = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};

__webpack_unused_export__ = function (a) {
  return y(a) === k;
};

__webpack_unused_export__ = function (a) {
  return y(a) === d;
};

__webpack_unused_export__ = function (a) {
  return y(a) === p;
};

__webpack_unused_export__ = function (a) {
  return y(a) === n;
};

__webpack_unused_export__ = function (a) {
  return y(a) === c;
};

__webpack_unused_export__ = function (a) {
  return y(a) === f;
};

__webpack_unused_export__ = function (a) {
  return y(a) === e;
};

__webpack_unused_export__ = function (a) {
  return y(a) === l;
};

__webpack_unused_export__ = function (a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === v || a === e || a === l || a === m || a === w || "object" === typeof a && null !== a && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? !0 : !1;
};

__webpack_unused_export__ = y;

/***/ }),

/***/ 651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  /* unused reexport */ __webpack_require__(954);
} else {}

/***/ }),

/***/ 534:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


__webpack_require__(91);

var f = __webpack_require__(792),
    g = 60103;

exports.Fragment = 60107;

if ("function" === typeof Symbol && Symbol["for"]) {
  var h = Symbol["for"];
  g = h("react.element");
  exports.Fragment = h("react.fragment");
}

var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    n = Object.prototype.hasOwnProperty,
    p = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function q(c, a, k) {
  var b,
      d = {},
      e = null,
      l = null;
  void 0 !== k && (e = "" + k);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (l = a.ref);

  for (b in a) {
    n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  }

  if (c && c.defaultProps) for (b in a = c.defaultProps, a) {
    void 0 === d[b] && (d[b] = a[b]);
  }
  return {
    $$typeof: g,
    type: c,
    key: e,
    ref: l,
    props: d,
    _owner: m.current
  };
}

exports.jsx = q;
exports.jsxs = q;

/***/ }),

/***/ 166:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var l = __webpack_require__(91),
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

exports.version = "17.0.2";

/***/ }),

/***/ 792:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(166);
} else {}

/***/ }),

/***/ 790:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(534);
} else {}

/***/ }),

/***/ 714:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v0.20.2
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

/***/ 481:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(714);
} else {}

/***/ }),

/***/ 198:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".mat-elevation-0{box-shadow:none}.mat-elevation-1{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-2{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-3{box-shadow:0px 3px 3px -2px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-4{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-5{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-6{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-7{box-shadow:0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-8{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-9{box-shadow:0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-10{box-shadow:0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-11{box-shadow:0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-12{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-13{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-14{box-shadow:0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-15{box-shadow:0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-16{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-17{box-shadow:0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-18{box-shadow:0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-19{box-shadow:0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-20{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-21{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-22{box-shadow:0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-23{box-shadow:0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}:root{font-size:16px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 359:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".app_host__y8NY6{flex-direction:row;align-items:stretch;height:100%;overflow:hidden;background-color:#fff}.app_sidepanel__G2MVU{padding:20px;width:200px;flex:0 0 auto;flex-direction:column;align-items:stretch;background-color:#dedede}.app_sidepanel__G2MVU>button{margin-bottom:12px}.app_scroll__EEKIG{flex:1 1 0;flex-direction:column}.app_content__3gBKo{padding:40px;flex-direction:column;align-items:stretch;flex-shrink:0;max-width:960px;margin:0 auto;width:100%}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "app_host__y8NY6",
	"sidepanel": "app_sidepanel__G2MVU",
	"scroll": "app_scroll__EEKIG",
	"content": "app_content__3gBKo"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 396:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".animations_host__3aSqw{align-items:center}.animations_host__3aSqw catwalk{width:399px;height:200px;margin:auto;background:transparent url(res:catwalk);animation:animations_sprite__2L32t 800ms steps(11) infinite}.animations_host__3aSqw ryu{width:435px;height:267px;margin:auto;background:url(res:ryu);animation:animations_sprite__2L32t 3.5s steps(45) infinite}.animations_host__3aSqw pulsar{cursor:pointer;width:300px;height:300px;border-radius:50%;animation:animations_pulsate__kQbfp 6s linear infinite;box-shadow:0 0 20px #fff,-20px 0 80px #f0f,20px 0 80px aqua,inset 0 0 50px #fff,inset 50px 0 80px #f0f,inset -50px 0 80px aqua,inset 50px 0 300px #f0f,inset -50px 0 300px aqua}@keyframes animations_sprite__2L32t{from{background-position:0 0%}to{background-position:0 100%}}@keyframes animations_pulsate__kQbfp{50%{box-shadow:0 0 20px #fff,20px 0 80px #f0f,-20px 0 80px aqua,inset 0 0 50px #fff,inset -50px 0 80px #f0f,inset 50px 0 80px aqua,inset -50px 0 300px #f0f,inset 50px 0 300px aqua}}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "animations_host__3aSqw",
	"sprite": "animations_sprite__2L32t",
	"pulsate": "animations_pulsate__kQbfp"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 28:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".bg-patterns_host__1ebuO{flex-direction:row;flex-wrap:wrap}.bg-patterns_host__1ebuO bg{width:200px;height:100px;align-self:center;margin:5px;width:400px;height:500px;motion:1000ms}.bg-patterns_host__1ebuO bg:nth-child(1){background:linear-gradient(45deg, #92baac 45px, transparent 45px) 64px 64px,linear-gradient(45deg, #92baac 45px, transparent 45px, transparent 91px, #e1ebbd 91px, #e1ebbd 135px, transparent 135px),linear-gradient(-45deg, #92baac 23px, transparent 23px, transparent 68px, #92baac 68px, #92baac 113px, transparent 113px, transparent 158px, #92baac 158px);background-color:#e1ebbd;background-size:128px 128px}.bg-patterns_host__1ebuO bg:nth-child(2){background-image:linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black),linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black);background-size:50px 50px;background-position:0 0,25px 25px;animation:bg-patterns_aaa__17fof 1s infinite alternate both}@keyframes bg-patterns_aaa__17fof{from{background-size:50px 50px;background-position:0 0,25px 25px}to{background-size:100px 100px;background-position:0 0,50px 50px}}.bg-patterns_host__1ebuO bg:nth-child(3){background-color:#fff;background-image:radial-gradient(midnightblue 9px, transparent 10px),repeating-radial-gradient(midnightblue 0, midnightblue 4px, transparent 5px, transparent 20px, midnightblue 21px, midnightblue 25px, transparent 26px, transparent 50px);background-size:30px 30px,90px 90px;background-position:0 0}.bg-patterns_host__1ebuO bg:nth-child(4){background-color:#ff7d9d;background-size:58px 58px;background-position:0px 2px,4px 35px,29px 31px,33px 6px,0px 36px,4px 2px,29px 6px,33px 30px;background-image:linear-gradient(335deg, #c90032 23px, transparent 23px),linear-gradient(155deg, #c90032 23px, transparent 23px),linear-gradient(335deg, #c90032 23px, transparent 23px),linear-gradient(155deg, #c90032 23px, transparent 23px),linear-gradient(335deg, #c90032 10px, transparent 10px),linear-gradient(155deg, #c90032 10px, transparent 10px),linear-gradient(335deg, #c90032 10px, transparent 10px),linear-gradient(155deg, #c90032 10px, transparent 10px)}.bg-patterns_host__1ebuO bg:nth-child(5){background:radial-gradient(#8a0000 4%, #5c0000 9%, rgba(102, 0, 0, 0) 9%) 0 0,radial-gradient(#8a0000 4%, #5c0000 8%, rgba(102, 0, 0, 0) 10%) 50px 50px,radial-gradient(rgba(153, 0, 0, 0.8) 20%, rgba(102, 0, 0, 0)) 50px 0,radial-gradient(rgba(153, 0, 0, 0.8) 20%, rgba(102, 0, 0, 0)) 0 50px,radial-gradient(#660000 35%, rgba(102, 0, 0, 0) 60%) 50px 0,radial-gradient(#660000 35%, rgba(102, 0, 0, 0) 60%) 100px 50px,radial-gradient(rgba(77, 0, 0, 0.7), rgba(102, 0, 0, 0)) 0 0,radial-gradient(rgba(77, 0, 0, 0.7), rgba(102, 0, 0, 0)) 50px 50px,linear-gradient(45deg, rgba(102, 0, 0, 0) 49%, black 50%, rgba(102, 0, 0, 0) 70%) 0 0,linear-gradient(-45deg, rgba(102, 0, 0, 0) 49%, black 50%, rgba(102, 0, 0, 0) 70%) 0 0;background-color:#300;background-size:100px 100px}.bg-patterns_host__1ebuO bg:nth-child(6){background:radial-gradient(circle at 100% 50%, transparent 20%, rgba(255, 255, 255, 0.3) 21%, rgba(255, 255, 255, 0.3) 34%, transparent 35%, transparent) 0 0,radial-gradient(circle at 0% 50%, transparent 20%, rgba(255, 255, 255, 0.3) 21%, rgba(255, 255, 255, 0.3) 34%, transparent 35%, transparent) 0 -50px;background-color:#708090;background-size:75px 100px;background-position:0 0,0 -50px}.bg-patterns_host__1ebuO bg:nth-child(7){background:linear-gradient(135deg, #eceddc 25%, transparent 25%),linear-gradient(225deg, #eceddc 25%, transparent 25%),linear-gradient(315deg, #eceddc 25%, transparent 25%),linear-gradient(45deg, #eceddc 25%, transparent 25%);background-size:100px 100px;background-color:#ec173a;background-position:-50px 0,-50px 0,0 0,0 0}.bg-patterns_host__1ebuO bg:nth-child(8){background-color:#a0302c;background-image:repeating-linear-gradient(transparent, transparent 50px, rgba(0, 0, 0, 0.4) 50px, rgba(0, 0, 0, 0.4) 53px, transparent 53px, transparent 63px, rgba(0, 0, 0, 0.4) 63px, rgba(0, 0, 0, 0.4) 66px, transparent 66px, transparent 116px, rgba(0, 0, 0, 0.5) 116px, rgba(0, 0, 0, 0.5) 166px, rgba(255, 255, 255, 0.2) 166px, rgba(255, 255, 255, 0.2) 169px, rgba(0, 0, 0, 0.5) 169px, rgba(0, 0, 0, 0.5) 179px, rgba(255, 255, 255, 0.2) 179px, rgba(255, 255, 255, 0.2) 182px, rgba(0, 0, 0, 0.5) 182px, rgba(0, 0, 0, 0.5) 232px, transparent 232px),repeating-linear-gradient(270deg, transparent, transparent 50px, rgba(0, 0, 0, 0.4) 50px, rgba(0, 0, 0, 0.4) 53px, transparent 53px, transparent 63px, rgba(0, 0, 0, 0.4) 63px, rgba(0, 0, 0, 0.4) 66px, transparent 66px, transparent 116px, rgba(0, 0, 0, 0.5) 116px, rgba(0, 0, 0, 0.5) 166px, rgba(255, 255, 255, 0.2) 166px, rgba(255, 255, 255, 0.2) 169px, rgba(0, 0, 0, 0.5) 169px, rgba(0, 0, 0, 0.5) 179px, rgba(255, 255, 255, 0.2) 179px, rgba(255, 255, 255, 0.2) 182px, rgba(0, 0, 0, 0.5) 182px, rgba(0, 0, 0, 0.5) 232px, transparent 232px),repeating-linear-gradient(125deg, transparent, transparent 2px, rgba(0, 0, 0, 0.2) 2px, rgba(0, 0, 0, 0.2) 3px, transparent 3px, transparent 5px, rgba(0, 0, 0, 0.2) 5px)}.bg-patterns_host__1ebuO bg:nth-child(9){background:radial-gradient(circle at 50% 59%, #d2caab 3%, #364e27 4%, #364e27 11%, rgba(54, 78, 39, 0) 12%, rgba(54, 78, 39, 0)) 50px 0,radial-gradient(circle at 50% 41%, #364e27 3%, #d2caab 4%, #d2caab 11%, rgba(210, 202, 171, 0) 12%, rgba(210, 202, 171, 0)) 50px 0,radial-gradient(circle at 50% 59%, #d2caab 3%, #364e27 4%, #364e27 11%, rgba(54, 78, 39, 0) 12%, rgba(54, 78, 39, 0)) 0 50px,radial-gradient(circle at 50% 41%, #364e27 3%, #d2caab 4%, #d2caab 11%, rgba(210, 202, 171, 0) 12%, rgba(210, 202, 171, 0)) 0 50px,radial-gradient(circle at 100% 50%, #d2caab 16%, rgba(210, 202, 171, 0) 17%),radial-gradient(circle at 0% 50%, #364e27 16%, rgba(54, 78, 39, 0) 17%),radial-gradient(circle at 100% 50%, #d2caab 16%, rgba(210, 202, 171, 0) 17%) 50px 50px,radial-gradient(circle at 0% 50%, #364e27 16%, rgba(54, 78, 39, 0) 17%) 50px 50px;background-color:#63773f;background-size:100px 100px}.bg-patterns_host__1ebuO bg:nth-child(10){background:linear-gradient(135deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px),linear-gradient(225deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px) 0 64px;background-color:#708090;background-size:64px 128px}.bg-patterns_host__1ebuO bg:nth-child(11){background:radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.15) 30%, rgba(255, 255, 255, 0.3) 32%, rgba(255, 255, 255, 0) 33%) 0 0,radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.1) 11%, rgba(255, 255, 255, 0.3) 13%, rgba(255, 255, 255, 0) 14%) 0 0,radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 17%, rgba(255, 255, 255, 0.43) 19%, rgba(255, 255, 255, 0) 20%) 0 110px,radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 11%, rgba(255, 255, 255, 0.4) 13%, rgba(255, 255, 255, 0) 14%) -130px -170px,radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 11%, rgba(255, 255, 255, 0.4) 13%, rgba(255, 255, 255, 0) 14%) 130px 370px,radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.1) 11%, rgba(255, 255, 255, 0.2) 13%, rgba(255, 255, 255, 0) 14%) 0 0,linear-gradient(45deg, #343702 0%, #184500 20%, #187546 30%, #006782 40%, #0b1284 50%, #760ea1 60%, #83096e 70%, #840b2a 80%, #b13e12 90%, #e27412 100%);background-size:470px 470px,970px 970px,410px 410px,610px 610px,530px 530px,730px 730px,100% 100%;background-color:#840b2a}.bg-patterns_host__1ebuO bg:nth-child(12){background-color:#000;background-image:radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 40px),radial-gradient(white, rgba(255, 255, 255, 0.15) 1px, transparent 30px),radial-gradient(white, rgba(255, 255, 255, 0.1) 2px, transparent 40px),radial-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1) 2px, transparent 30px);background-size:550px 550px,350px 350px,250px 250px,150px 150px;background-position:0 0,40px 60px,130px 270px,70px 100px}.bg-patterns_host__1ebuO bg:nth-child(13){background-image:radial-gradient(closest-side, transparent 0%, transparent 75%, #b6cc66 76%, #b6cc66 85%, #edffdb 86%, #edffdb 94%, #ffffff 95%, #ffffff 103%, #d9e6a7 104%, #d9e6a7 112%, #798b3c 113%, #798b3c 121%, #ffffff 122%, #ffffff 130%, #e0ead7 131%, #e0ead7 140%),radial-gradient(closest-side, transparent 0%, transparent 75%, #b6cc66 76%, #b6cc66 85%, #edffdb 86%, #edffdb 94%, #ffffff 95%, #ffffff 103%, #d9e6a7 104%, #d9e6a7 112%, #798b3c 113%, #798b3c 121%, #ffffff 122%, #ffffff 130%, #e0ead7 131%, #e0ead7 140%);background-size:110px 110px;background-color:#c8d3a7;background-position:0 0,55px 55px}.bg-patterns_host__1ebuO bg:nth-child(14){background-color:#6d695c;background-image:repeating-linear-gradient(120deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 60px),repeating-linear-gradient(60deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 60px),linear-gradient(60deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1)),linear-gradient(120deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1));background-size:70px 120px}.bg-patterns_host__1ebuO bg:nth-child(15){background-color:#fff;background-image:linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),linear-gradient(#eee 2px, transparent 2px);background-size:100% 24px}.bg-patterns_host__1ebuO bg:nth-child(16){background:radial-gradient(circle farthest-side at 0% 50%, #fb1 23.5%, rgba(240, 166, 17, 0) 0) 21px 30px,radial-gradient(circle farthest-side at 0% 50%, #b71 24%, rgba(240, 166, 17, 0) 0) 19px 30px,linear-gradient(#fb1 14%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 85%, #fb1 0) 0 0,linear-gradient(150deg, #fb1 24%, #b71 0, #b71 26%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 74%, #b71 0, #b71 76%, #fb1 0) 0 0,linear-gradient(30deg, #fb1 24%, #b71 0, #b71 26%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 74%, #b71 0, #b71 76%, #fb1 0) 0 0,linear-gradient(90deg, #b71 2%, #fb1 0, #fb1 98%, #b71 0%) 0 0;background-color:#fb1;background-size:40px 60px}.bg-patterns_host__1ebuO bg:nth-child(17){background:linear-gradient(45deg, #dca 12%, transparent 0, transparent 88%, #dca 0),linear-gradient(135deg, transparent 37%, #a85 0, #a85 63%, transparent 0),linear-gradient(45deg, transparent 37%, #dca 0, #dca 63%, transparent 0) #753;background-size:25px 25px}.bg-patterns_host__1ebuO bg:nth-child(18){background:radial-gradient(black 3px, transparent 4px),radial-gradient(black 3px, transparent 4px),linear-gradient(#fff 4px, transparent 0),linear-gradient(45deg, transparent 74px, transparent 75px, #a4a4a4 75px, #a4a4a4 76px, transparent 77px, transparent 109px),linear-gradient(-45deg, transparent 75px, transparent 76px, #a4a4a4 76px, #a4a4a4 77px, transparent 78px, transparent 109px),#fff;background-size:109px 109px,109px 109px,100% 6px,109px 109px,109px 109px;background-position:54px 55px,0px 0px,0px 0px,0px 0px,0px 0px}.bg-patterns_host__1ebuO bg:nth-child(19){background:radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px) 0px 10px,radial-gradient(at 100% 100%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px),#8a3;background-size:20px 20px}.bg-patterns_host__1ebuO bg:nth-child(20){background:linear-gradient(324deg, #232927 4%, transparent 4%) -70px 43px,linear-gradient(36deg, #232927 4%, transparent 4%) 30px 43px,linear-gradient(72deg, #e3d7bf 8.5%, transparent 8.5%) 30px 43px,linear-gradient(288deg, #e3d7bf 8.5%, transparent 8.5%) -70px 43px,linear-gradient(216deg, #e3d7bf 7.5%, transparent 7.5%) -70px 23px,linear-gradient(144deg, #e3d7bf 7.5%, transparent 7.5%) 30px 23px,linear-gradient(324deg, #232927 4%, transparent 4%) -20px 93px,linear-gradient(36deg, #232927 4%, transparent 4%) 80px 93px,linear-gradient(72deg, #e3d7bf 8.5%, transparent 8.5%) 80px 93px,linear-gradient(288deg, #e3d7bf 8.5%, transparent 8.5%) -20px 93px,linear-gradient(216deg, #e3d7bf 7.5%, transparent 7.5%) -20px 73px,linear-gradient(144deg, #e3d7bf 7.5%, transparent 7.5%) 80px 73px;background-color:#232927;background-size:100px 100px}.bg-patterns_host__1ebuO bg:nth-child(21){background:radial-gradient(circle closest-side at 60% 43%, #b03 26%, rgba(187, 0, 51, 0) 27%),radial-gradient(circle closest-side at 40% 43%, #b03 26%, rgba(187, 0, 51, 0) 27%),radial-gradient(circle closest-side at 40% 22%, #d35 45%, rgba(221, 51, 85, 0) 46%),radial-gradient(circle closest-side at 60% 22%, #d35 45%, rgba(221, 51, 85, 0) 46%),radial-gradient(circle closest-side at 50% 35%, #d35 30%, rgba(221, 51, 85, 0) 31%),radial-gradient(circle closest-side at 60% 43%, #b03 26%, rgba(187, 0, 51, 0) 27%) 50px 50px,radial-gradient(circle closest-side at 40% 43%, #b03 26%, rgba(187, 0, 51, 0) 27%) 50px 50px,radial-gradient(circle closest-side at 40% 22%, #d35 45%, rgba(221, 51, 85, 0) 46%) 50px 50px,radial-gradient(circle closest-side at 60% 22%, #d35 45%, rgba(221, 51, 85, 0) 46%) 50px 50px,radial-gradient(circle closest-side at 50% 35%, #d35 30%, rgba(221, 51, 85, 0) 31%) 50px 50px;background-color:#b03;background-size:100px 100px}.bg-patterns_host__1ebuO bg:nth-child(22){background:radial-gradient(circle, transparent 20%, slategray 20%, slategray 80%, transparent 80%, transparent),radial-gradient(circle, transparent 20%, slategray 20%, slategray 80%, transparent 80%, transparent) 50px 50px,linear-gradient(#a8b1bb 8px, transparent 8px) 0 -4px,linear-gradient(90deg, #a8b1bb 8px, transparent 8px) -4px 0;background-color:#708090;background-size:100px 100px,100px 100px,50px 50px,50px 50px}.bg-patterns_host__1ebuO bg:nth-child(23){background-color:#def;background-image:radial-gradient(closest-side, transparent 98%, rgba(0, 0, 0, 0.3) 99%),radial-gradient(closest-side, transparent 98%, rgba(0, 0, 0, 0.3) 99%);background-size:80px 80px;background-position:0 0,40px 40px}.bg-patterns_host__1ebuO bg:nth-child(24){background-color:silver;background-image:linear-gradient(335deg, #b00 23px, transparent 23px),linear-gradient(155deg, #d00 23px, transparent 23px),linear-gradient(335deg, #b00 23px, transparent 23px),linear-gradient(155deg, #d00 23px, transparent 23px);background-size:58px 58px;background-position:0px 2px,4px 35px,29px 31px,34px 6px}.bg-patterns_host__1ebuO bg:nth-child(25){background-color:silver;background-image:radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),radial-gradient(circle at 0 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),radial-gradient(circle at 50% 100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),radial-gradient(circle at 0 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);background-size:100px 50px}.bg-patterns_host__1ebuO bg:nth-child(26){background-color:#556;background-image:linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a),linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a);background-size:80px 140px;background-position:0 0,0 0,40px 70px,40px 70px,0 0,40px 70px}.bg-patterns_host__1ebuO bg:nth-child(27){background-color:#269;background-image:linear-gradient(white 2px, transparent 2px),linear-gradient(90deg, white 2px, transparent 2px),linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px);background-size:100px 100px,100px 100px,20px 20px,20px 20px;background-position:-2px -2px,-2px -2px,-1px -1px,-1px -1px}.bg-patterns_host__1ebuO bg:nth-child(28){background:linear-gradient(#ffffff 50%, rgba(255, 255, 255, 0) 0) 0 0,radial-gradient(circle closest-side, #ffffff 53%, rgba(255, 255, 255, 0) 0) 0 0,radial-gradient(circle closest-side, #ffffff 50%, rgba(255, 255, 255, 0) 0) 55px 0 #48b;background-size:110px 200px;background-repeat:repeat-x}.bg-patterns_host__1ebuO bg:nth-child(29){background-color:#eee;background-image:linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black),linear-gradient(-45deg, black 25%, transparent 25%, transparent 75%, black 75%, black);background-size:60px 60px}.bg-patterns_host__1ebuO bg:nth-child(30){background:linear-gradient(315deg, transparent 75%, #d45d55 0) -10px 0,linear-gradient(45deg, transparent 75%, #d45d55 0) -10px 0,linear-gradient(135deg, #a7332b 50%, transparent 0) 0 0,linear-gradient(45deg, #6a201b 50%, #561a16 0) 0 0 #561a16;background-size:20px 20px}.bg-patterns_host__1ebuO bg:nth-child(31){background-color:#026873;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0.07) 50%, transparent 50%),linear-gradient(90deg, rgba(255, 255, 255, 0.13) 50%, transparent 50%),linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.17) 50%),linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.19) 50%);background-size:13px,29px,37px,53px}.bg-patterns_host__1ebuO bg:nth-child(32){background:linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,linear-gradient(90deg, #1b1b1b 10px, transparent 10px),linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424);background-color:#131313;background-size:20px 20px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "bg-patterns_host__1ebuO",
	"aaa": "bg-patterns_aaa__17fof"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 579:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 113:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".images_host__wdWst h1{font-size:36px;font-style:smallcaps,bold;color:#582a9c;margin-bottom:12px;transition:border 1s;border-color:#ff0}.images_host__wdWst h1:hover{border:20px solid red}.images_host__wdWst h2{font-size:30px;font-style:smallcaps;color:#fb2f8e;margin-bottom:8px}.images_host__wdWst section{margin-top:10px;margin-bottom:10px}.images_host__wdWst row{flex-direction:row;align-items:center}.images_host__wdWst column{flex-direction:column;align-items:center;flex-grow:1;flex-shrink:0}.images_host__wdWst image{flex-grow:1;flex-shrink:1;flex-basis:0;object-fit:scale-down;object-position:50%;transition:object-position 2s;align-self:stretch}.images_host__wdWst object{border-width:1px;border-radius:20px;border-color:#000;margin:5px;background-color:rgba(112,189,153,.745);object-fit:none}.images_host__wdWst render,.images_host__wdWst video{object-fit:scale-down;object-position:left}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "images_host__wdWst"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 624:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".material_app__1Q-QZ>*{margin-bottom:10px}.material_app__1Q-QZ section>*{margin-bottom:12px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"app": "material_app__1Q-QZ"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 493:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".accordion_host__23m5k{appearance:none;overflow:hidden;background-color:#fff;border-radius:4px}.accordion_header__m12As{flex-direction:row;justify-content:space-between;align-items:center;padding-top:16px;padding-bottom:16px;padding-left:16px;padding-right:16px;transition:padding-top 200ms,padding-bottom 200ms;cursor:pointer;pointer-events:all}.accordion_header__m12As icon{font-size:32px;transform-origin:center;transition:rotate 200ms}.accordion_expanded__2aWb_ .accordion_header__m12As{padding-top:20px;padding-bottom:20px}.accordion_expanded__2aWb_ .accordion_header__m12As icon{rotate:-180deg}.accordion_content__1SKKy{padding:16px;padding-top:6px}.accordion_expander__PVkmn{transition:height 200ms,opacity 200ms;overflow:hidden}.accordion_contentWrapper__34CVx{top:0;left:0;position:absolute;flex-shrink:0;height:auto}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "accordion_host__23m5k",
	"header": "accordion_header__m12As",
	"expanded": "accordion_expanded__2aWb_",
	"content": "accordion_content__1SKKy",
	"expander": "accordion_expander__PVkmn",
	"contentWrapper": "accordion_contentWrapper__34CVx"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 632:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".alert_host__176LU .mat-modal-content{padding:18px;width:100%;max-width:400px}.alert_title__3tadX{font-size:1.2em;font-weight:500;margin-bottom:6px}.alert_title__3tadX+.alert_text__S8yxl{margin-top:8px}.alert_text__S8yxl{font-size:1em;margin-bottom:8px}.alert_error__19BIg{font-size:1em;margin-top:8px;color:red}.alert_buttons__3O2P0{margin-top:8px;display:flex;flex-direction:row;justify-content:flex-end}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "alert_host__176LU",
	"title": "alert_title__3tadX",
	"text": "alert_text__S8yxl",
	"error": "alert_error__19BIg",
	"buttons": "alert_buttons__3O2P0"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 757:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".button_host__2yWd-{appearance:none;overflow:hidden;background-color:#fff;color:#000;border-radius:4px;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.button_host__2yWd-.button_icon__8ZLoz{border-radius:50%;aspect-ratio:1}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "button_host__2yWd-",
	"icon": "button_icon__8ZLoz"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 705:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".card_host__1T-IR{appearance:none;overflow:hidden;background-color:#fff;border-radius:4px}.card_content__3gkRp{padding:16px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "card_host__1T-IR",
	"content": "card_content__3gkRp"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 916:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".confirm_host__2OMCm .mat-modal-content{padding:18px;width:100%;max-width:400px}.confirm_title__2aQ-E{font-size:1.2em;font-weight:500;margin-bottom:6px}.confirm_title__2aQ-E+.confirm_text__3Xiwa{margin-top:8px}.confirm_text__3Xiwa{font-size:1em;margin-bottom:8px}.confirm_error__27mwa{font-size:1em;margin-top:8px;color:red}.confirm_buttons__3PEpV{margin-top:8px;display:flex;flex-direction:row;justify-content:flex-end}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "confirm_host__2OMCm",
	"title": "confirm_title__2aQ-E",
	"text": "confirm_text__3Xiwa",
	"error": "confirm_error__27mwa",
	"buttons": "confirm_buttons__3PEpV"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 998:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".input_host__hGvyF{font-size:16px;padding:14px 12px;position:relative;border-radius:6px;min-height:56px}.input_host__hGvyF.input_filled__3nzFE{background-color:#e8e8e8;border-bottom:1px #000;border-bottom-left-radius:0;border-bottom-right-radius:0}.input_host__hGvyF.input_standard__1Bglo{border-bottom:1px #000;border-bottom-left-radius:0;border-bottom-right-radius:0}.input_host__hGvyF.input_standard__1Bglo .mat-input-field-target{padding-top:16px}.input_host__hGvyF.input_standard__1Bglo .input_placeholderContent__1vqnR{translate:0 8px}.input_host__hGvyF.input_float__dYmhg .input_placeholderContent__1vqnR,.input_host__hGvyF.input_float-always__NAsfg .input_placeholderContent__1vqnR,.input_host__hGvyF.input_float-focus__27Fia:focus-within .input_placeholderContent__1vqnR{translate:1px -12px;scale:.75}.input_host__hGvyF.input_float__dYmhg.input_filled__3nzFE.input_hasPlaceholder__j1ch- .mat-input-field-target,.input_host__hGvyF.input_float-always__NAsfg.input_filled__3nzFE.input_hasPlaceholder__j1ch- .mat-input-field-target,.input_host__hGvyF.input_float-focus__27Fia:focus-within.input_filled__3nzFE.input_hasPlaceholder__j1ch- .mat-input-field-target{padding-top:18px}.input_host__hGvyF.input_float__dYmhg.input_outlined__3E-5G .input_placeholderContent__1vqnR,.input_host__hGvyF.input_float-always__NAsfg.input_outlined__3E-5G .input_placeholderContent__1vqnR,.input_host__hGvyF.input_float-focus__27Fia:focus-within.input_outlined__3E-5G .input_placeholderContent__1vqnR{background-color:#fff;translate:1px -26px}.input_host__hGvyF.input_float__dYmhg.input_float-never__30rhI .input_placeholderContent__1vqnR{display:none}.input_content__5quvc{color:#000;caret-color:#000;border:none;background-color:none;margin:0;position:absolute;left:0;right:0;top:0;bottom:0;border-radius:inherit}.input_inputFrame__zj0RQ{position:absolute;left:0;right:0;top:0;bottom:0;border:1px solid;border-radius:6px;pointer-events:none;border-color:#000}.input_content__5quvc:focus-within~.input_inputFrame__zj0RQ{border-color:#000;border-width:2px}.input_placeholder__3e3Uz{pointer-events:none;position:relative;white-space:nowrap;flex-grow:1;flex-direction:row;align-items:center}.input_placeholderGhost__1t15u{opacity:0}.input_placeholderText__2Dnaz{color:#000;opacity:.7}.input_content__5quvc:focus-within~.input_placeholder__3e3Uz .input_placeholderText__2Dnaz{color:#000;opacity:1}.input_placeholderContent__1vqnR{position:absolute;padding:0 4px;transition:translate 200ms ease-out,scale 200ms ease-out,background-color 200ms ease-out;transform-origin:left;left:-4px;border-radius:4px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "input_host__hGvyF",
	"filled": "input_filled__3nzFE",
	"standard": "input_standard__1Bglo",
	"placeholderContent": "input_placeholderContent__1vqnR",
	"float": "input_float__dYmhg",
	"float-always": "input_float-always__NAsfg",
	"float-focus": "input_float-focus__27Fia",
	"hasPlaceholder": "input_hasPlaceholder__j1ch-",
	"outlined": "input_outlined__3E-5G",
	"float-never": "input_float-never__30rhI",
	"content": "input_content__5quvc",
	"inputFrame": "input_inputFrame__zj0RQ",
	"placeholder": "input_placeholder__3e3Uz",
	"placeholderGhost": "input_placeholderGhost__1t15u",
	"placeholderText": "input_placeholderText__2Dnaz"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 352:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal_host__U9hxM{z-index:1000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;background-color:rgba(0,0,0,.45);overflow:auto;overscroll-behavior:contain;position:absolute;left:0;right:0;top:0;bottom:0;min-width:100%;min-height:100%}.modal_host__U9hxM.modal_opened__9OXeM{animation:modal_appearAnim__3wAdG 400ms both}.modal_host__U9hxM:not(.modal_opened__9OXeM){pointer-events:none}.modal_host__U9hxM.modal_closed__1hwBG{animation:modal_closeAnim__23F25 200ms both}.modal_host__U9hxM:after{content:\"\";opacity:0;flex-grow:0;flex-shrink:1;flex-basis:30%}@keyframes modal_appearAnim__3wAdG{from{opacity:0}to{opacity:1}}@keyframes modal_closeAnim__23F25{from{opacity:1}to{opacity:0}}.modal_content__3XWUO{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0,0,0,.12);font-size:1rem;box-sizing:border-box;position:relative;z-index:1001;background-color:#fff;border-radius:4px;white-space:pre-wrap;margin:auto}.modal_close__i2s7p{border-radius:50%;background-color:#bfbcbc;color:#000;box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);position:absolute;transform:translate(50%, -50%) scale(0.8);padding:4px;right:2px;top:2px;display:flex}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "modal_host__U9hxM",
	"opened": "modal_opened__9OXeM",
	"appearAnim": "modal_appearAnim__3wAdG",
	"closed": "modal_closed__1hwBG",
	"closeAnim": "modal_closeAnim__23F25",
	"content": "modal_content__3XWUO",
	"close": "modal_close__i2s7p"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 628:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".paper_host__3OL2w{appearance:none;overflow:hidden;background-color:#fff;border-radius:4px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "paper_host__3OL2w"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 413:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".prompt_host__2fr_P .mat-modal-content{padding:18px;width:100%;max-width:400px}.prompt_title__3rppD{font-size:1.2em;font-weight:500;margin-bottom:6px}.prompt_title__3rppD+.prompt_text__CL5GR{margin-top:8px}.prompt_text__CL5GR{font-size:1em;margin-bottom:8px}.prompt_error__oYGmD{font-size:1em;margin-top:8px;color:red}.prompt_buttons__2hO28{margin-top:8px;display:flex;flex-direction:row;justify-content:flex-end}.prompt_input__2HTPS{font-size:1em;margin-top:8px;margin-bottom:8px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "prompt_host__2fr_P",
	"title": "prompt_title__3rppD",
	"text": "prompt_text__CL5GR",
	"error": "prompt_error__oYGmD",
	"buttons": "prompt_buttons__2hO28",
	"input": "prompt_input__2HTPS"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 825:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ripple_ripple__2_7MF{pointer-events:none;border-radius:50%;background-color:rgba(0,0,0,.1);position:absolute;transition:opacity 300ms ease-out,scale 450ms cubic-bezier(0, 0, 0.2, 1);translate:-50% -50%;scale:1}.ripple_ripple__2_7MF:enter{scale:0}.ripple_ripple__2_7MF:leave{opacity:0;transition:opacity 400ms ease-out,scale 450ms cubic-bezier(0, 0, 0.2, 1);state-duration:400ms}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"ripple": "ripple_ripple__2_7MF"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 627:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".select_host__qFRmI.select_chips__drTJp .select_triggerPart__2Z2MS{font-size:.8125rem;margin:4px 4px 2px 4px;height:24px;background-color:rgba(0,0,0,.12);border-radius:12px;padding:4px 8px;text-align:center}.select_host__qFRmI.select_chips__drTJp .select_triggerContent__2xkSM{margin-left:-4px}.select_triggerContent__2xkSM{flex-direction:row;align-items:center;justify-content:flex-start}.select_trigger__3UpIc{font-size:1em;flex:1 1 0;overflow:hidden;text-align:left;padding:0 12px;border:none;appearance:none;background-color:none;border-radius:0;pointer-events:all;flex-direction:row;align-items:center;justify-content:flex-start}.select_menuRoot__1Cghy{position:absolute;left:0;right:0;bottom:-1px;height:0;z-index:10000;translate:0 -20px;opacity:0;display:none;transition:translate 300ms ease-out,opacity 300ms ease-out,display 300ms step-end;pointer-events:none}.select_menuRoot__1Cghy.select_opened__MNq4G{transition:translate 300ms ease-out,opacity 300ms ease-out,display 300ms step-start;display:flex;translate:0 0;opacity:1;pointer-events:auto}.select_backdrop__3U8Va{position:absolute;top:-5000px;right:-5000px;bottom:-5000px;left:-5000px;background-color:transparent;cursor:default;pointer-events:all}.select_menu__2DPhm{position:absolute;top:100%;left:0;minwidth:100%;background-color:#fff;max-height:60vh}.select_option__3CLF2{border-radius:0;text-align:left;flex-direction:row;align-items:center;justify-content:flex-start;min-height:48px}.select_option__3CLF2.select_selected__3ozhg{background-color:rgba(0,0,0,.06)}.select_option__3CLF2 .select_toggle__VBNf8{pointer-events:none}.select_caret__28mOG{pointer-events:none;align-items:center;justify-content:center;padding:8px;position:absolute;right:12px;top:50%;translate:0 -50%;width:36px;height:36px;line-height:20px;transition:rotate 300ms}.select_host__qFRmI.select_opened__MNq4G .select_caret__28mOG{rotate:180deg}.select_defaultSeparator__1UWJn{margin-right:.4em}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "select_host__qFRmI",
	"chips": "select_chips__drTJp",
	"triggerPart": "select_triggerPart__2Z2MS",
	"triggerContent": "select_triggerContent__2xkSM",
	"trigger": "select_trigger__3UpIc",
	"menuRoot": "select_menuRoot__1Cghy",
	"opened": "select_opened__MNq4G",
	"backdrop": "select_backdrop__3U8Va",
	"menu": "select_menu__2DPhm",
	"option": "select_option__3CLF2",
	"selected": "select_selected__3ozhg",
	"toggle": "select_toggle__VBNf8",
	"caret": "select_caret__28mOG",
	"defaultSeparator": "select_defaultSeparator__1UWJn"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 13:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{--mat-slider-color: cornflowerblue}.slider_host__3MyyP{height:20px;width:200px;margin:20px;transform-origin:50% 50%;navigation:vertical;cursor:pointer}.slider_host__3MyyP[orientation=vertical]{width:20px;height:200px;navigation:horizontal}.slider_host__3MyyP .slider_track__1orvs{position:absolute;left:0;right:0;top:25%;bottom:25%;background-color:#c7c7c7;border-radius:4px;border-width:1px;flex-direction:row}.slider_host__3MyyP[orientation=vertical] .slider_track__1orvs{left:25%;right:25%;top:0;bottom:0;flex-direction:column-reverse}.slider_host__3MyyP[direction=horizontal-reverse] .slider_track__1orvs,.slider_host__3MyyP[direction=vertical-reverse] .slider_track__1orvs{justify-content:flex-end}.slider_host__3MyyP .slider_fill__KVKrI{background-color:#ebebeb;width:100%;height:100%}.slider_host__3MyyP .slider_thumbContainer__NKhLG{background-color:transparent;position:absolute;width:0;height:0}.slider_host__3MyyP[direction=horizontal] .slider_thumbContainer__NKhLG{top:50%;right:0}.slider_host__3MyyP[direction=horizontal-reverse] .slider_thumbContainer__NKhLG{top:50%;left:0}.slider_host__3MyyP[direction=vertical] .slider_thumbContainer__NKhLG{left:50%;top:0}.slider_host__3MyyP[direction=vertical-reverse] .slider_thumbContainer__NKhLG{left:50%;bottom:0}.slider_host__3MyyP .slider_thumb__1gpnP{align-items:center;border-radius:20px;height:20px;width:20px;position:absolute;transform-origin:center;translate:-50% -50%;border-width:1px;border-color:var(--mat-slider-color);background-color:#ebebeb}.slider_host__3MyyP[orientation=horizontal] .slider_thumb__1gpnP{flex-direction:column}.slider_host__3MyyP[orientation=vertical] .slider_thumb__1gpnP{flex-direction:row}.slider_host__3MyyP:hover .slider_thumb__1gpnP{background-color:#ebebeb}.slider_host__3MyyP:focus .slider_thumb__1gpnP{background-color:#fafafa}.slider_host__3MyyP:active .slider_thumb__1gpnP{background-color:#dbdbdb}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "slider_host__3MyyP",
	"track": "slider_track__1orvs",
	"fill": "slider_fill__KVKrI",
	"thumbContainer": "slider_thumbContainer__NKhLG",
	"thumb": "slider_thumb__1gpnP"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 686:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".text_host__1U4Ek .text_input__28NsK{border:none;appearance:none;background-color:none;font-size:1em;flex:1 1 0;overflow:hidden;text-align:left;padding:0 12px}.text_host__1U4Ek.text_filled__2uvcb .text_input__28NsK{border:none;margin:0}.text_passwordToggle__2o2lG{align-items:center;justify-content:center;cursor:pointer;overflow:hidden;flex:0 0 auto;padding:8px;position:absolute;right:12px;top:50%;translate:0 -50%;background-color:transparent;box-shadow:none}.text_passwordToggle__2o2lG icon{width:20px;height:20px;line-height:20px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "text_host__1U4Ek",
	"input": "text_input__28NsK",
	"filled": "text_filled__2uvcb",
	"passwordToggle": "text_passwordToggle__2o2lG"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 494:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".toggle_label__U3N9G{flex-direction:row;align-items:center}.toggle_label__U3N9G:hover .toggle_toggle__2mhaY .toggle_ring__3jK_G{scale:1}.toggle_toggle__2mhaY{appearance:none;overflow:visible;border-radius:4px;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);color:#000;border:2px #000;background-color:transparent;box-shadow:none;width:20px}.toggle_toggle__2mhaY .toggle_ring__3jK_G{position:absolute;border-radius:50%;inset:-70%;background-color:rgba(0,0,0,.08);scale:0;transition:scale .16s;overflow:hidden}.toggle_selectAllToggle__76Mh1{margin-bottom:4px}.toggle_label__U3N9G.toggle_radio__1Fa0a .toggle_toggle__2mhaY{border-radius:50%}.toggle_label__U3N9G.toggle_radio__1Fa0a .toggle_toggle__2mhaY:checked:not(:indeterminate):after{background-image:url(res:ReactUnity/sprites/radio)}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"label": "toggle_label__U3N9G",
	"toggle": "toggle_toggle__2mhaY",
	"ring": "toggle_ring__3jK_G",
	"selectAllToggle": "toggle_selectAllToggle__76Mh1",
	"radio": "toggle_radio__1Fa0a"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(989);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".tooltip_anchor__E6J_z{position:absolute;inset:0;z-index:30000;pointer-events:none;transition:opacity 400ms ease-out;flex-direction:row}.tooltip_anchor__E6J_z.tooltip_interactive__3lRqI{pointer-events:auto}.tooltip_anchor__E6J_z:enter{opacity:0}.tooltip_anchor__E6J_z:leave{opacity:0;transition:opacity 200ms ease-in;state-duration:200ms}.tooltip_tooltip__LDxIP{border-radius:6px;background-color:#4e4e4e;color:#fff;position:absolute;left:0;top:0;translate:-50% 50%;flex-direction:row;align-items:center;justify-content:flex-start;min-width:40px;min-height:24px;padding:6px 10px}.tooltip_backdrop__Y9gf7{pointer-events:all;cursor:default;position:absolute;inset:0;z-index:29999}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"anchor": "tooltip_anchor__E6J_z",
	"interactive": "tooltip_interactive__3lRqI",
	"tooltip": "tooltip_tooltip__LDxIP",
	"backdrop": "tooltip_backdrop__Y9gf7"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 62:
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

/***/ 793:
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
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

/***/ 173:
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

/***/ 892:
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

/***/ 36:
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
  } // For old IE

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

/***/ 464:
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
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ../../node_modules/react/index.js
var react = __webpack_require__(792);
// EXTERNAL MODULE: ../../node_modules/react-reconciler/index.js
var react_reconciler = __webpack_require__(630);
// EXTERNAL MODULE: ../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(790);
;// CONCATENATED MODULE: ../../renderer/dist/src/helpers/dictionary-watcher.js
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


/**
 * Creates a context that updates its value when the values in the dictionary change
 * @param dictionary The dictionary to be watched. Must implement the EventDictionary type in the C#
 * @param displayName A displayName to identify this context easier in case of problems
 */

function createDictionaryWatcher(dictionary, displayName) {
  var ctx = react.createContext(undefined);
  if (displayName) ctx.displayName = displayName;

  var Provider = function Provider(_a) {
    var children = _a.children;

    var _b = react.useState(0),
        render = _b[0],
        setRender = _b[1];

    react.useLayoutEffect(function () {
      var remove = dictionary === null || dictionary === void 0 ? void 0 : dictionary.AddListener(function (key, value, dic) {
        setRender(function (x) {
          return x + 1;
        });
      });

      if (!remove) {
        if (displayName) console.warn("".concat(displayName, " dictionary does not provide a change listener"));else console.warn('The dictionary does not provide a change listener');
      }

      return function () {
        return remove === null || remove === void 0 ? void 0 : remove();
      };
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    var value = react.useMemo(function () {
      return __assign({}, dictionary);
    }, [render]);
    return react.createElement(ctx.Provider, {
      value: value
    }, children);
  };

  function useContext() {
    var context = react.useContext(ctx);

    if (context === undefined) {
      if (displayName) throw new Error("".concat(displayName, ".useContext must be used within a ").concat(displayName, ".Provider"));else throw new Error('useContext must be used within a provider');
    }

    return context;
  }

  return {
    context: ctx,
    Provider: Provider,
    useContext: useContext
  };
}
var globalsWatcher = createDictionaryWatcher(Globals, 'globalsContext');
var useGlobals = globalsWatcher.useContext;
var GlobalsProvider = globalsWatcher.Provider;
;// CONCATENATED MODULE: ../../renderer/dist/src/views/error-boundary.js
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

var error_boundary_assign = undefined && undefined.__assign || function () {
  error_boundary_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return error_boundary_assign.apply(this, arguments);
};




var ErrorBoundary =
/** @class */
function (_super) {
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

  ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {// You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  };

  ErrorBoundary.prototype.render = function () {
    var _a, _b;

    if (this.state.hasError) {
      return (0,jsx_runtime.jsxs)("view", error_boundary_assign({
        style: {
          color: 'crimson',
          padding: 20
        }
      }, {
        children: [(0,jsx_runtime.jsx)("view", error_boundary_assign({
          style: {
            marginBottom: '12px'
          }
        }, {
          children: ((_a = this.state.error) === null || _a === void 0 ? void 0 : _a.message) || ''
        }), void 0), (0,jsx_runtime.jsx)("view", {
          children: ((_b = this.state.error) === null || _b === void 0 ? void 0 : _b.stack) || ''
        }, void 0)]
      }), void 0);
    }

    return this.props.children;
  };

  return ErrorBoundary;
}(react.Component);


;// CONCATENATED MODULE: ../../renderer/dist/src/views/default-view.js



function DefaultView(_a) {
  var children = _a.children;
  return (0,jsx_runtime.jsx)(ErrorBoundary, {
    children: (0,jsx_runtime.jsx)(GlobalsProvider, {
      children: children
    }, void 0)
  }, void 0);
}
;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/diffing.js
var styleStringSymbol = '__style_as_string__';
function diffProperties(lastProps, nextProps, deepDiffing) {
  if (deepDiffing === void 0) {
    deepDiffing = 0;
  }

  if (lastProps === nextProps) return null;
  var updatePayload = null;
  var propKey;

  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
      continue;
    }

    var prop = null;

    if (propKey === 'style' && typeof lastProps.style === 'string') {
      (updatePayload = updatePayload || {})[styleStringSymbol] = null;
    }

    var depth = deepDiffing > 0 ? deepDiffing : propKey === 'style' ? 1 : 0;

    if (depth > 0) {
      prop = diffProperties(lastProps[propKey], null, depth - 1);
      if (!prop) continue;
    } // For all other deleted properties we add it to the queue. We use
    // the whitelist in the commit phase instead.


    (updatePayload = updatePayload || {})[propKey] = prop;
  }

  for (propKey in nextProps) {
    var nextProp = nextProps[propKey];
    var lastProp = lastProps != null ? lastProps[propKey] : undefined;

    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
      continue;
    }

    var prop = nextProp;

    if (propKey === 'style' && typeof prop === 'string' !== (typeof lastProp === 'string')) {
      (updatePayload = updatePayload || {})[styleStringSymbol] = typeof prop === 'string' ? prop : null;
    }

    var depth = deepDiffing > 0 ? deepDiffing : propKey === 'style' ? 1 : 0;

    if (depth > 0) {
      prop = diffProperties(lastProp, nextProp, depth - 1);
      if (!prop) continue;
    }

    (updatePayload = updatePayload || {})[propKey] = prop;
  }

  return updatePayload;
}
;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/renderer.js
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





var hostContext = {};
var childContext = {};
var textTypes = {
  text: true,
  icon: true,
  style: true,
  script: true
};

function getAllowedProps(props, type) {
  var children = props.children,
      tag = props.tag,
      rest = __rest(props, ["children", "tag"]);

  if (textTypes[type]) {
    rest.children = !children || typeof children === 'boolean' ? null : Array.isArray(children) ? children.join('') : children + '';
  }

  if (typeof props.style === 'string') rest[styleStringSymbol] = props.style;
  return rest;
}

var hostConfig = {
  getRootHostContext: function getRootHostContext(rootContainerInstance) {
    return hostContext;
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
    var aProps = getAllowedProps(props, type);
    var children = aProps.children || null;
    delete aProps.children;
    return UnityBridge.createElement(props.tag || type, children, rootContainerInstance, aProps);
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return UnityBridge.createText(text, rootContainerInstance);
  },
  appendInitialChild: function appendInitialChild(parent, child) {
    UnityBridge.appendChild(parent, child);
  },
  finalizeInitialChildren: function finalizeInitialChildren(instance, type, props, rootContainerInstance, hostContext) {
    return false;
  },
  commitMount: function commitMount(instance, type, newProps, internalInstanceHandle) {},
  shouldSetTextContent: function shouldSetTextContent(type, props) {
    return textTypes[type];
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
    UnityBridge.applyUpdate(instance, getAllowedProps(updatePayload, type), type);
  },
  resetTextContent: function resetTextContent(instance) {
    console.log('resetTextContent');
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
  // Required for Suspense
  // TODO: implement
  preparePortalMount: function preparePortalMount() {},
  hideInstance: function hideInstance(instance) {},
  hideTextInstance: function hideTextInstance(textInstance) {},
  unhideInstance: function unhideInstance(instance, props) {},
  unhideTextInstance: function unhideTextInstance(textInstance, text) {},
  // -------------------
  //     Scheduling
  // -------------------
  scheduleDeferredCallback: function scheduleDeferredCallback(callback, options) {
    return setTimeout(callback, (options === null || options === void 0 ? void 0 : options.timeout) || 0);
  },
  cancelDeferredCallback: function cancelDeferredCallback(callBackID) {
    clearTimeout(callBackID);
  },
  noTimeout: -1,
  scheduleTimeout: function scheduleTimeout(callback, timeout) {
    return setTimeout(callback, timeout);
  },
  cancelTimeout: function cancelTimeout(handle) {
    clearTimeout(handle);
  },
  queueMicrotask: function queueMicrotask(callback) {
    return setTimeout(callback, 0);
  }
};
var ReactUnityReconciler = react_reconciler(hostConfig);
var containerMap = new Map();
var Renderer = {
  render: function render(element, hostContainer, renderWithoutHelpers) {
    if (!hostContainer) hostContainer = HostContainer;
    var hostRoot = containerMap.get(hostContainer);
    if (!hostRoot) containerMap.set(hostContainer, hostRoot = ReactUnityReconciler.createContainer(hostContainer, 0, false, {}));
    if (!renderWithoutHelpers) element = (0,react.createElement)(DefaultView, null, element);
    return ReactUnityReconciler.updateContainer(element, hostRoot, null);
  }
};
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/components/Context.js

var Context_ReactReduxContext = /*#__PURE__*/react.createContext(null);

if (false) {}

/* harmony default export */ const Context = ((/* unused pure expression or super */ null && (Context_ReactReduxContext)));
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/utils/batch.js
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
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/utils/Subscription.js
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
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/utils/useIsomorphicLayoutEffect.js
 // React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
// subscription callback always has the selector from the latest render commit
// available, otherwise a store update may happen between render and the effect,
// which may cause missed updates; we also must ensure the store subscription
// is created synchronously, otherwise a store update may occur before the
// subscription is created and an inconsistent state may be observed

var useIsomorphicLayoutEffect_useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? react.useLayoutEffect : react.useEffect;
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/components/Provider.js






function Provider(_ref) {
  var store = _ref.store,
      context = _ref.context,
      children = _ref.children;
  var contextValue = (0,react.useMemo)(function () {
    var subscription = Subscription_createSubscription(store);
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store: store,
      subscription: subscription
    };
  }, [store]);
  var previousState = (0,react.useMemo)(function () {
    return store.getState();
  }, [store]);
  useIsomorphicLayoutEffect_useIsomorphicLayoutEffect(function () {
    var subscription = contextValue.subscription;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }

    return function () {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);
  var Context = context || Context_ReactReduxContext;
  return /*#__PURE__*/react.createElement(Context.Provider, {
    value: contextValue
  }, children);
}

if (false) {}

/* harmony default export */ const components_Provider = (Provider);
// EXTERNAL MODULE: ../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(502);
// EXTERNAL MODULE: ../../node_modules/react-redux/node_modules/react-is/index.js
var react_is = __webpack_require__(651);
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/components/connectAdvanced.js


var _excluded = (/* unused pure expression or super */ null && (["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"])),
    _excluded2 = (/* unused pure expression or super */ null && (["reactReduxForwardedRef"]));





 // Define some constant arrays just to avoid re-creating these

var EMPTY_ARRAY = (/* unused pure expression or super */ null && ([]));
var NO_SUBSCRIPTION_ARRAY = (/* unused pure expression or super */ null && ([null, null]));

var stringifyComponent = function stringifyComponent(Comp) {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};

function storeStateUpdatesReducer(state, action) {
  var updateCount = state[1];
  return [action.payload, updateCount + 1];
}

function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
  useIsomorphicLayoutEffect(function () {
    return effectFunc.apply(void 0, effectArgs);
  }, dependencies);
}

function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, actualChildProps, childPropsFromStoreUpdate, notifyNestedSubs) {
  // We want to capture the wrapper props and child props we used for later comparisons
  lastWrapperProps.current = wrapperProps;
  lastChildProps.current = actualChildProps;
  renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null;
    notifyNestedSubs();
  }
}

function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, childPropsFromStoreUpdate, notifyNestedSubs, forceComponentUpdateDispatch) {
  // If we're not subscribed to the store, nothing to do here
  if (!shouldHandleStateChanges) return; // Capture values for checking if and when this component unmounts

  var didUnsubscribe = false;
  var lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component

  var checkForUpdates = function checkForUpdates() {
    if (didUnsubscribe) {
      // Don't run stale listeners.
      // Redux doesn't guarantee unsubscriptions happen until next dispatch.
      return;
    }

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
      renderIsScheduled.current = true; // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render

      forceComponentUpdateDispatch({
        type: 'STORE_UPDATED',
        payload: {
          error: error
        }
      });
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
}

var initStateUpdates = function initStateUpdates() {
  return [null, 0];
};

function connectAdvanced_connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory, // options object:
_ref) {
  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$getDisplayName = _ref2.getDisplayName,
      getDisplayName = _ref2$getDisplayName === void 0 ? function (name) {
    return "ConnectAdvanced(" + name + ")";
  } : _ref2$getDisplayName,
      _ref2$methodName = _ref2.methodName,
      methodName = _ref2$methodName === void 0 ? 'connectAdvanced' : _ref2$methodName,
      _ref2$renderCountProp = _ref2.renderCountProp,
      renderCountProp = _ref2$renderCountProp === void 0 ? undefined : _ref2$renderCountProp,
      _ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
      _ref2$storeKey = _ref2.storeKey,
      storeKey = _ref2$storeKey === void 0 ? 'store' : _ref2$storeKey,
      _ref2$withRef = _ref2.withRef,
      withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
      _ref2$forwardRef = _ref2.forwardRef,
      forwardRef = _ref2$forwardRef === void 0 ? false : _ref2$forwardRef,
      _ref2$context = _ref2.context,
      context = _ref2$context === void 0 ? ReactReduxContext : _ref2$context,
      connectOptions = _objectWithoutPropertiesLoose(_ref2, _excluded);

  if (false) { var customStoreWarningMessage; }

  var Context = context;
  return function wrapWithConnect(WrappedComponent) {
    if (false) {}

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var pure = connectOptions.pure;

    function createChildSelector(store) {
      return selectorFactory(store.dispatch, selectorFactoryOptions);
    } // If we aren't running in "pure" mode, we don't want to memoize values.
    // To avoid conditionally calling hooks, we fall back to a tiny wrapper
    // that just executes the given callback immediately.


    var usePureOnlyMemo = pure ? useMemo : function (callback) {
      return callback();
    };

    function ConnectFunction(props) {
      var _useMemo = useMemo(function () {
        // Distinguish between actual "data" props that were passed to the wrapper component,
        // and values needed to control behavior (forwarded refs, alternate context instances).
        // To maintain the wrapperProps object reference, memoize this destructuring.
        var reactReduxForwardedRef = props.reactReduxForwardedRef,
            wrapperProps = _objectWithoutPropertiesLoose(props, _excluded2);

        return [props.context, reactReduxForwardedRef, wrapperProps];
      }, [props]),
          propsContext = _useMemo[0],
          reactReduxForwardedRef = _useMemo[1],
          wrapperProps = _useMemo[2];

      var ContextToUse = useMemo(function () {
        // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
        // Memoize the check that determines which context instance we should use.
        return propsContext && propsContext.Consumer && isContextConsumer( /*#__PURE__*/React.createElement(propsContext.Consumer, null)) ? propsContext : Context;
      }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available

      var contextValue = useContext(ContextToUse); // The store _must_ exist as either a prop or in context.
      // We'll check to see if it _looks_ like a Redux store first.
      // This allows us to pass through a `store` prop that is just a plain value.

      var didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
      var didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);

      if (false) {} // Based on the previous check, one of these must be true


      var store = didStoreComeFromProps ? props.store : contextValue.store;
      var childPropsSelector = useMemo(function () {
        // The child props selector needs the store reference as an input.
        // Re-create this selector whenever the store changes.
        return createChildSelector(store);
      }, [store]);

      var _useMemo2 = useMemo(function () {
        if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        // This Subscription's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.

        var subscription = createSubscription(store, didStoreComeFromProps ? null : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
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
          subscription = _useMemo2[0],
          notifyNestedSubs = _useMemo2[1]; // Determine what {store, subscription} value should be put into nested context, if necessary,
      // and memoize that value to avoid unnecessary context updates.


      var overriddenContextValue = useMemo(function () {
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
      }, [didStoreComeFromProps, contextValue, subscription]); // We need to force this wrapper component to re-render whenever a Redux store update
      // causes a change to the calculated child component props (or we caught an error in mapState)

      var _useReducer = useReducer(storeStateUpdatesReducer, EMPTY_ARRAY, initStateUpdates),
          _useReducer$ = _useReducer[0],
          previousStateUpdateResult = _useReducer$[0],
          forceComponentUpdateDispatch = _useReducer[1]; // Propagate any mapState/mapDispatch errors upwards


      if (previousStateUpdateResult && previousStateUpdateResult.error) {
        throw previousStateUpdateResult.error;
      } // Set up refs to coordinate values between the subscription effect and the render logic


      var lastChildProps = useRef();
      var lastWrapperProps = useRef(wrapperProps);
      var childPropsFromStoreUpdate = useRef();
      var renderIsScheduled = useRef(false);
      var actualChildProps = usePureOnlyMemo(function () {
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
      }, [store, previousStateUpdateResult, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
      // about useLayoutEffect in SSR, so we try to detect environment and fall back to
      // just useEffect instead to avoid the warning, since neither will run anyway.

      useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, actualChildProps, childPropsFromStoreUpdate, notifyNestedSubs]); // Our re-subscribe logic only runs when the store/subscription setup changes

      useIsomorphicLayoutEffectWithArgs(subscribeUpdates, [shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, childPropsFromStoreUpdate, notifyNestedSubs, forceComponentUpdateDispatch], [store, subscription, childPropsSelector]); // Now that all that's done, we can finally try to actually render the child component.
      // We memoize the elements for the rendered child component as an optimization.

      var renderedWrappedComponent = useMemo(function () {
        return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, actualChildProps, {
          ref: reactReduxForwardedRef
        }));
      }, [reactReduxForwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
      // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.

      var renderedChild = useMemo(function () {
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
    } // If we're in "pure" mode, ensure our wrapper component only re-renders when incoming props have changed.


    var Connect = pure ? React.memo(ConnectFunction) : ConnectFunction;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;

    if (forwardRef) {
      var forwarded = React.forwardRef(function forwardConnectRef(props, ref) {
        return /*#__PURE__*/React.createElement(Connect, _extends({}, props, {
          reactReduxForwardedRef: ref
        }));
      });
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoistStatics(forwarded, WrappedComponent);
    }

    return hoistStatics(Connect, WrappedComponent);
  };
}
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/utils/bindActionCreators.js
function bindActionCreators(actionCreators, dispatch) {
  var boundActionCreators = {};

  var _loop = function _loop(key) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = function () {
        return dispatch(actionCreator.apply(void 0, arguments));
      };
    }
  };

  for (var key in actionCreators) {
    _loop(key);
  }

  return boundActionCreators;
}
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/connect/wrapMapToProps.js

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }

    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..

function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
//
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//

function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    }; // allow detectFactoryAndVerify to get ownProps


    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (false) {}
      return props;
    };

    return proxy;
  };
}
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/connect/mapDispatchToProps.js


function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}
function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return {
      dispatch: dispatch
    };
  }) : undefined;
}
function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}
/* harmony default export */ const mapDispatchToProps = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/connect/mapStateToProps.js

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}
function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}
/* harmony default export */ const mapStateToProps = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);
;// CONCATENATED MODULE: ../../node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  extends_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return extends_extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/connect/mergeProps.js


function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return extends_extends({}, ownProps, stateProps, dispatchProps);
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;
    var hasRunOnce = false;
    var mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (false) {}
      }

      return mergedProps;
    };
  };
}
function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}
function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}
/* harmony default export */ const mergeProps = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/connect/connect.js


var connect_excluded = (/* unused pure expression or super */ null && (["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]));






/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error("Invalid value of type " + typeof arg + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
  };
}

function strictEqual(a, b) {
  return a === b;
} // createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios


function createConnect(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === void 0 ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === void 0 ? defaultMergePropsFactories : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === void 0 ? defaultSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {
    if (_ref2 === void 0) {
      _ref2 = {};
    }

    var _ref3 = _ref2,
        _ref3$pure = _ref3.pure,
        pure = _ref3$pure === void 0 ? true : _ref3$pure,
        _ref3$areStatesEqual = _ref3.areStatesEqual,
        areStatesEqual = _ref3$areStatesEqual === void 0 ? strictEqual : _ref3$areStatesEqual,
        _ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
        areOwnPropsEqual = _ref3$areOwnPropsEqua === void 0 ? shallowEqual : _ref3$areOwnPropsEqua,
        _ref3$areStatePropsEq = _ref3.areStatePropsEqual,
        areStatePropsEqual = _ref3$areStatePropsEq === void 0 ? shallowEqual : _ref3$areStatePropsEq,
        _ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
        areMergedPropsEqual = _ref3$areMergedPropsE === void 0 ? shallowEqual : _ref3$areMergedPropsE,
        extraOptions = _objectWithoutPropertiesLoose(_ref3, connect_excluded);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',
      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return "Connect(" + name + ")";
      },
      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),
      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    }, extraOptions));
  };
}
/* harmony default export */ const connect = (/*#__PURE__*/(/* unused pure expression or super */ null && (createConnect())));
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/hooks/useReduxContext.js


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
 * export const CounterComponent = ({ value }) => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */

function useReduxContext() {
  var contextValue = useContext(ReactReduxContext);

  if (false) {}

  return contextValue;
}
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/hooks/useStore.js



/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */

function useStore_createStoreHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useReduxContext = context === ReactReduxContext ? useDefaultReduxContext : function () {
    return useContext(context);
  };
  return function useStore() {
    var _useReduxContext = useReduxContext(),
        store = _useReduxContext.store;

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

var useStore = /*#__PURE__*/(/* unused pure expression or super */ null && (useStore_createStoreHook()));
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/hooks/useDispatch.js


/**
 * Hook factory, which creates a `useDispatch` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useDispatch` hook bound to the specified context.
 */

function createDispatchHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useStore = context === ReactReduxContext ? useDefaultStore : createStoreHook(context);
  return function useDispatch() {
    var store = useStore();
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

var useDispatch = /*#__PURE__*/(/* unused pure expression or super */ null && (createDispatchHook()));
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/hooks/useSelector.js






var refEquality = function refEquality(a, b) {
  return a === b;
};

function useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub) {
  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      forceRender = _useReducer[1];

  var subscription = useMemo(function () {
    return createSubscription(store, contextSub);
  }, [store, contextSub]);
  var latestSubscriptionCallbackError = useRef();
  var latestSelector = useRef();
  var latestStoreState = useRef();
  var latestSelectedState = useRef();
  var storeState = store.getState();
  var selectedState;

  try {
    if (selector !== latestSelector.current || storeState !== latestStoreState.current || latestSubscriptionCallbackError.current) {
      var newSelectedState = selector(storeState); // ensure latest selected state is reused so that a custom equality function can result in identical references

      if (latestSelectedState.current === undefined || !equalityFn(newSelectedState, latestSelectedState.current)) {
        selectedState = newSelectedState;
      } else {
        selectedState = latestSelectedState.current;
      }
    } else {
      selectedState = latestSelectedState.current;
    }
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      err.message += "\nThe error may be correlated with this previous error:\n" + latestSubscriptionCallbackError.current.stack + "\n\n";
    }

    throw err;
  }

  useIsomorphicLayoutEffect(function () {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
    latestSubscriptionCallbackError.current = undefined;
  });
  useIsomorphicLayoutEffect(function () {
    function checkForUpdates() {
      try {
        var newStoreState = store.getState(); // Avoid calling selector multiple times if the store's state has not changed

        if (newStoreState === latestStoreState.current) {
          return;
        }

        var _newSelectedState = latestSelector.current(newStoreState);

        if (equalityFn(_newSelectedState, latestSelectedState.current)) {
          return;
        }

        latestSelectedState.current = _newSelectedState;
        latestStoreState.current = newStoreState;
      } catch (err) {
        // we ignore all errors here, since when the component
        // is re-rendered, the selectors are called again, and
        // will throw again, if neither props nor store state
        // changed
        latestSubscriptionCallbackError.current = err;
      }

      forceRender();
    }

    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    checkForUpdates();
    return function () {
      return subscription.tryUnsubscribe();
    };
  }, [store, subscription]);
  return selectedState;
}
/**
 * Hook factory, which creates a `useSelector` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useSelector` hook bound to the specified context.
 */


function createSelectorHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useReduxContext = context === ReactReduxContext ? useDefaultReduxContext : function () {
    return useContext(context);
  };
  return function useSelector(selector, equalityFn) {
    if (equalityFn === void 0) {
      equalityFn = refEquality;
    }

    if (false) {}

    var _useReduxContext = useReduxContext(),
        store = _useReduxContext.store,
        contextSub = _useReduxContext.subscription;

    var selectedState = useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub);
    useDebugValue(selectedState);
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

var useSelector = /*#__PURE__*/(/* unused pure expression or super */ null && (createSelectorHook()));
;// CONCATENATED MODULE: ../../node_modules/react-redux/es/exports.js









;// CONCATENATED MODULE: ../../node_modules/react-redux/es/alternate-renderers.js

 // For other renderers besides ReactDOM and React Native,
// use the default noop batch function

var alternate_renderers_batch = getBatch();

;// CONCATENATED MODULE: ../../node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
;// CONCATENATED MODULE: ../../node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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
;// CONCATENATED MODULE: ../../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
;// CONCATENATED MODULE: ../../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ../../node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ../../node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
;// CONCATENATED MODULE: ../../node_modules/history/index.js

var r,
    B = r || (r = {});
B.Pop = "POP";
B.Push = "PUSH";
B.Replace = "REPLACE";
var C =  false ? 0 : function (b) {
  return b;
};

function D(b, h) {
  if (!b) {
    "undefined" !== typeof console && console.warn(h);

    try {
      throw Error(h);
    } catch (e) {}
  }
}

function E(b) {
  b.preventDefault();
  b.returnValue = "";
}

function F() {
  var b = [];
  return {
    get length() {
      return b.length;
    },

    push: function push(h) {
      b.push(h);
      return function () {
        b = b.filter(function (e) {
          return e !== h;
        });
      };
    },
    call: function call(h) {
      b.forEach(function (e) {
        return e && e(h);
      });
    }
  };
}

function H() {
  return Math.random().toString(36).substr(2, 8);
}

function I(b) {
  var h = b.pathname;
  h = void 0 === h ? "/" : h;
  var e = b.search;
  e = void 0 === e ? "" : e;
  b = b.hash;
  b = void 0 === b ? "" : b;
  e && "?" !== e && (h += "?" === e.charAt(0) ? e : "?" + e);
  b && "#" !== b && (h += "#" === b.charAt(0) ? b : "#" + b);
  return h;
}

function J(b) {
  var h = {};

  if (b) {
    var e = b.indexOf("#");
    0 <= e && (h.hash = b.substr(e), b = b.substr(0, e));
    e = b.indexOf("?");
    0 <= e && (h.search = b.substr(e), b = b.substr(0, e));
    b && (h.pathname = b);
  }

  return h;
}

function createBrowserHistory(b) {
  function h() {
    var c = p.location,
        a = m.state || {};
    return [a.idx, C({
      pathname: c.pathname,
      search: c.search,
      hash: c.hash,
      state: a.usr || null,
      key: a.key || "default"
    })];
  }

  function e(c) {
    return "string" === typeof c ? c : I(c);
  }

  function x(c, a) {
    void 0 === a && (a = null);
    return C(_extends({
      pathname: q.pathname,
      hash: "",
      search: ""
    }, "string" === typeof c ? J(c) : c, {
      state: a,
      key: H()
    }));
  }

  function z(c) {
    t = c;
    c = h();
    v = c[0];
    q = c[1];
    d.call({
      action: t,
      location: q
    });
  }

  function A(c, a) {
    function f() {
      A(c, a);
    }

    var l = r.Push,
        k = x(c, a);

    if (!g.length || (g.call({
      action: l,
      location: k,
      retry: f
    }), !1)) {
      var n = [{
        usr: k.state,
        key: k.key,
        idx: v + 1
      }, e(k)];
      k = n[0];
      n = n[1];

      try {
        m.pushState(k, "", n);
      } catch (G) {
        p.location.assign(n);
      }

      z(l);
    }
  }

  function y(c, a) {
    function f() {
      y(c, a);
    }

    var l = r.Replace,
        k = x(c, a);
    g.length && (g.call({
      action: l,
      location: k,
      retry: f
    }), 1) || (k = [{
      usr: k.state,
      key: k.key,
      idx: v
    }, e(k)], m.replaceState(k[0], "", k[1]), z(l));
  }

  function w(c) {
    m.go(c);
  }

  void 0 === b && (b = {});
  b = b.window;
  var p = void 0 === b ? document.defaultView : b,
      m = p.history,
      u = null;
  p.addEventListener("popstate", function () {
    if (u) g.call(u), u = null;else {
      var c = r.Pop,
          a = h(),
          f = a[0];
      a = a[1];
      if (g.length) {
        if (null != f) {
          var l = v - f;
          l && (u = {
            action: c,
            location: a,
            retry: function retry() {
              w(-1 * l);
            }
          }, w(l));
        } else  false ? 0 : void 0;
      } else z(c);
    }
  });
  var t = r.Pop;
  b = h();
  var v = b[0],
      q = b[1],
      d = F(),
      g = F();
  null == v && (v = 0, m.replaceState(_extends({}, m.state, {
    idx: v
  }), ""));
  return {
    get action() {
      return t;
    },

    get location() {
      return q;
    },

    createHref: e,
    push: A,
    replace: y,
    go: w,
    back: function back() {
      w(-1);
    },
    forward: function forward() {
      w(1);
    },
    listen: function listen(c) {
      return d.push(c);
    },
    block: function block(c) {
      var a = g.push(c);
      1 === g.length && p.addEventListener("beforeunload", E);
      return function () {
        a();
        g.length || p.removeEventListener("beforeunload", E);
      };
    }
  };
}

;

function createHashHistory(b) {
  function h() {
    var a = J(m.location.hash.substr(1)),
        f = a.pathname,
        l = a.search;
    a = a.hash;
    var k = u.state || {};
    return [k.idx, C({
      pathname: void 0 === f ? "/" : f,
      search: void 0 === l ? "" : l,
      hash: void 0 === a ? "" : a,
      state: k.usr || null,
      key: k.key || "default"
    })];
  }

  function e() {
    if (t) c.call(t), t = null;else {
      var a = r.Pop,
          f = h(),
          l = f[0];
      f = f[1];
      if (c.length) {
        if (null != l) {
          var k = q - l;
          k && (t = {
            action: a,
            location: f,
            retry: function retry() {
              p(-1 * k);
            }
          }, p(k));
        } else  false ? 0 : void 0;
      } else A(a);
    }
  }

  function x(a) {
    var f = document.querySelector("base"),
        l = "";
    f && f.getAttribute("href") && (f = m.location.href, l = f.indexOf("#"), l = -1 === l ? f : f.slice(0, l));
    return l + "#" + ("string" === typeof a ? a : I(a));
  }

  function z(a, f) {
    void 0 === f && (f = null);
    return C(_extends({
      pathname: d.pathname,
      hash: "",
      search: ""
    }, "string" === typeof a ? J(a) : a, {
      state: f,
      key: H()
    }));
  }

  function A(a) {
    v = a;
    a = h();
    q = a[0];
    d = a[1];
    g.call({
      action: v,
      location: d
    });
  }

  function y(a, f) {
    function l() {
      y(a, f);
    }

    var k = r.Push,
        n = z(a, f);
     false ? 0 : void 0;

    if (!c.length || (c.call({
      action: k,
      location: n,
      retry: l
    }), !1)) {
      var G = [{
        usr: n.state,
        key: n.key,
        idx: q + 1
      }, x(n)];
      n = G[0];
      G = G[1];

      try {
        u.pushState(n, "", G);
      } catch (K) {
        m.location.assign(G);
      }

      A(k);
    }
  }

  function w(a, f) {
    function l() {
      w(a, f);
    }

    var k = r.Replace,
        n = z(a, f);
     false ? 0 : void 0;
    c.length && (c.call({
      action: k,
      location: n,
      retry: l
    }), 1) || (n = [{
      usr: n.state,
      key: n.key,
      idx: q
    }, x(n)], u.replaceState(n[0], "", n[1]), A(k));
  }

  function p(a) {
    u.go(a);
  }

  void 0 === b && (b = {});
  b = b.window;
  var m = void 0 === b ? document.defaultView : b,
      u = m.history,
      t = null;
  m.addEventListener("popstate", e);
  m.addEventListener("hashchange", function () {
    var a = h()[1];
    I(a) !== I(d) && e();
  });
  var v = r.Pop;
  b = h();
  var q = b[0],
      d = b[1],
      g = F(),
      c = F();
  null == q && (q = 0, u.replaceState(_extends({}, u.state, {
    idx: q
  }), ""));
  return {
    get action() {
      return v;
    },

    get location() {
      return d;
    },

    createHref: x,
    push: y,
    replace: w,
    go: p,
    back: function back() {
      p(-1);
    },
    forward: function forward() {
      p(1);
    },
    listen: function listen(a) {
      return g.push(a);
    },
    block: function block(a) {
      var f = c.push(a);
      1 === c.length && m.addEventListener("beforeunload", E);
      return function () {
        f();
        c.length || m.removeEventListener("beforeunload", E);
      };
    }
  };
}

;

function createMemoryHistory(b) {
  function h(d, g) {
    void 0 === g && (g = null);
    return C(extends_extends({
      pathname: t.pathname,
      search: "",
      hash: ""
    }, "string" === typeof d ? J(d) : d, {
      state: g,
      key: H()
    }));
  }

  function e(d, g, c) {
    return !q.length || (q.call({
      action: d,
      location: g,
      retry: c
    }), !1);
  }

  function x(d, g) {
    u = d;
    t = g;
    v.call({
      action: u,
      location: t
    });
  }

  function z(d, g) {
    var c = r.Push,
        a = h(d, g);
     false ? 0 : void 0;
    e(c, a, function () {
      z(d, g);
    }) && (m += 1, p.splice(m, p.length, a), x(c, a));
  }

  function A(d, g) {
    var c = r.Replace,
        a = h(d, g);
     false ? 0 : void 0;
    e(c, a, function () {
      A(d, g);
    }) && (p[m] = a, x(c, a));
  }

  function y(d) {
    var g = Math.min(Math.max(m + d, 0), p.length - 1),
        c = r.Pop,
        a = p[g];
    e(c, a, function () {
      y(d);
    }) && (m = g, x(c, a));
  }

  void 0 === b && (b = {});
  var w = b;
  b = w.initialEntries;
  w = w.initialIndex;
  var p = (void 0 === b ? ["/"] : b).map(function (d) {
    var g = C(extends_extends({
      pathname: "/",
      search: "",
      hash: "",
      state: null,
      key: H()
    }, "string" === typeof d ? J(d) : d));
     false ? 0 : void 0;
    return g;
  }),
      m = Math.min(Math.max(null == w ? p.length - 1 : w, 0), p.length - 1),
      u = r.Pop,
      t = p[m],
      v = F(),
      q = F();
  return {
    get index() {
      return m;
    },

    get action() {
      return u;
    },

    get location() {
      return t;
    },

    createHref: function createHref(d) {
      return "string" === typeof d ? d : I(d);
    },
    push: z,
    replace: A,
    go: y,
    back: function back() {
      y(-1);
    },
    forward: function forward() {
      y(1);
    },
    listen: function listen(d) {
      return v.push(d);
    },
    block: function block(d) {
      return q.push(d);
    }
  };
}

;

;// CONCATENATED MODULE: ../../node_modules/react-router/index.js


/**
 * React Router v6.2.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */



function invariant(cond, message) {
  if (!cond) throw new Error(message);
}

function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging React Router!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

var alreadyWarned = {};

function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
     false ? 0 : void 0;
  }
} ///////////////////////////////////////////////////////////////////////////////
// CONTEXT
///////////////////////////////////////////////////////////////////////////////

/**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level <Router> API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */


var NavigationContext = /*#__PURE__*/(0,react.createContext)(null);

if (false) {}

var LocationContext = /*#__PURE__*/(0,react.createContext)(null);

if (false) {}

var RouteContext = /*#__PURE__*/(0,react.createContext)({
  outlet: null,
  matches: []
});

if (false) {} ///////////////////////////////////////////////////////////////////////////////
// COMPONENTS
///////////////////////////////////////////////////////////////////////////////

/**
 * A <Router> that stores all entries in memory.
 *
 * @see https://reactrouter.com/docs/en/v6/api#memoryrouter
 */


function MemoryRouter(_ref) {
  var basename = _ref.basename,
      children = _ref.children,
      initialEntries = _ref.initialEntries,
      initialIndex = _ref.initialIndex;
  var historyRef = (0,react.useRef)();

  if (historyRef.current == null) {
    historyRef.current = createMemoryHistory({
      initialEntries: initialEntries,
      initialIndex: initialIndex
    });
  }

  var history = historyRef.current;

  var _useState = (0,react.useState)({
    action: history.action,
    location: history.location
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  (0,react.useLayoutEffect)(function () {
    return history.listen(setState);
  }, [history]);
  return /*#__PURE__*/(0,react.createElement)(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/docs/en/v6/api#navigate
 */


function Navigate(_ref2) {
  var to = _ref2.to,
      replace = _ref2.replace,
      state = _ref2.state;
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;
   false ? 0 : void 0;
  var navigate = useNavigate();
  useEffect(function () {
    navigate(to, {
      replace: replace,
      state: state
    });
  });
  return null;
}
/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/docs/en/v6/api#outlet
 */


function Outlet(props) {
  return useOutlet(props.context);
}
/**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/docs/en/v6/api#route
 */


function Route(_props) {
   false ? 0 : invariant(false);
}
/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a <Router> directly. Instead, you'll render a
 * router that is more specific to your environment such as a <BrowserRouter>
 * in web browsers or a <StaticRouter> for server rendering.
 *
 * @see https://reactrouter.com/docs/en/v6/api#router
 */


function Router(_ref3) {
  var _ref3$basename = _ref3.basename,
      basenameProp = _ref3$basename === void 0 ? "/" : _ref3$basename,
      _ref3$children = _ref3.children,
      children = _ref3$children === void 0 ? null : _ref3$children,
      locationProp = _ref3.location,
      _ref3$navigationType = _ref3.navigationType,
      navigationType = _ref3$navigationType === void 0 ? r.Pop : _ref3$navigationType,
      navigator = _ref3.navigator,
      _ref3$static = _ref3["static"],
      staticProp = _ref3$static === void 0 ? false : _ref3$static;
  !!useInRouterContext() ?  false ? 0 : invariant(false) : void 0;
  var basename = normalizePathname(basenameProp);
  var navigationContext = (0,react.useMemo)(function () {
    return {
      basename: basename,
      navigator: navigator,
      "static": staticProp
    };
  }, [basename, navigator, staticProp]);

  if (typeof locationProp === "string") {
    locationProp = J(locationProp);
  }

  var _locationProp = locationProp,
      _locationProp$pathnam = _locationProp.pathname,
      pathname = _locationProp$pathnam === void 0 ? "/" : _locationProp$pathnam,
      _locationProp$search = _locationProp.search,
      search = _locationProp$search === void 0 ? "" : _locationProp$search,
      _locationProp$hash = _locationProp.hash,
      hash = _locationProp$hash === void 0 ? "" : _locationProp$hash,
      _locationProp$state = _locationProp.state,
      state = _locationProp$state === void 0 ? null : _locationProp$state,
      _locationProp$key = _locationProp.key,
      key = _locationProp$key === void 0 ? "default" : _locationProp$key;
  var location = (0,react.useMemo)(function () {
    var trailingPathname = stripBasename(pathname, basename);

    if (trailingPathname == null) {
      return null;
    }

    return {
      pathname: trailingPathname,
      search: search,
      hash: hash,
      state: state,
      key: key
    };
  }, [basename, pathname, search, hash, state, key]);
   false ? 0 : void 0;

  if (location == null) {
    return null;
  }

  return /*#__PURE__*/(0,react.createElement)(NavigationContext.Provider, {
    value: navigationContext
  }, /*#__PURE__*/(0,react.createElement)(LocationContext.Provider, {
    children: children,
    value: {
      location: location,
      navigationType: navigationType
    }
  }));
}
/**
 * A container for a nested tree of <Route> elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/docs/en/v6/api#routes
 */


function Routes(_ref4) {
  var children = _ref4.children,
      location = _ref4.location;
  return useRoutes(createRoutesFromChildren(children), location);
} ///////////////////////////////////////////////////////////////////////////////
// HOOKS
///////////////////////////////////////////////////////////////////////////////

/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/docs/en/v6/api#usehref
 */


function useHref(to) {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;

  var _useContext = useContext(NavigationContext),
      basename = _useContext.basename,
      navigator = _useContext.navigator;

  var _useResolvedPath = useResolvedPath(to),
      hash = _useResolvedPath.hash,
      pathname = _useResolvedPath.pathname,
      search = _useResolvedPath.search;

  var joinedPathname = pathname;

  if (basename !== "/") {
    var toPathname = getToPathname(to);
    var endsWithSlash = toPathname != null && toPathname.endsWith("/");
    joinedPathname = pathname === "/" ? basename + (endsWithSlash ? "/" : "") : joinPaths([basename, pathname]);
  }

  return navigator.createHref({
    pathname: joinedPathname,
    search: search,
    hash: hash
  });
}
/**
 * Returns true if this component is a descendant of a <Router>.
 *
 * @see https://reactrouter.com/docs/en/v6/api#useinroutercontext
 */


function useInRouterContext() {
  return (0,react.useContext)(LocationContext) != null;
}
/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/docs/en/v6/api#uselocation
 */


function useLocation() {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;
  return (0,react.useContext)(LocationContext).location;
}
/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/docs/en/v6/api#usenavigationtype
 */


function useNavigationType() {
  return useContext(LocationContext).navigationType;
}
/**
 * Returns true if the URL for the given "to" value matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * <NavLink>.
 *
 * @see https://reactrouter.com/docs/en/v6/api#usematch
 */


function useMatch(pattern) {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;

  var _useLocation = useLocation(),
      pathname = _useLocation.pathname;

  return useMemo(function () {
    return matchPath(pattern, pathname);
  }, [pathname, pattern]);
}
/**
 * The interface for the navigate() function returned from useNavigate().
 */

/**
 * Returns an imperative method for changing the location. Used by <Link>s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/docs/en/v6/api#usenavigate
 */


function useNavigate() {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;

  var _useContext2 = (0,react.useContext)(NavigationContext),
      basename = _useContext2.basename,
      navigator = _useContext2.navigator;

  var _useContext3 = (0,react.useContext)(RouteContext),
      matches = _useContext3.matches;

  var _useLocation2 = useLocation(),
      locationPathname = _useLocation2.pathname;

  var routePathnamesJson = JSON.stringify(matches.map(function (match) {
    return match.pathnameBase;
  }));
  var activeRef = (0,react.useRef)(false);
  (0,react.useEffect)(function () {
    activeRef.current = true;
  });
  var navigate = (0,react.useCallback)(function (to, options) {
    if (options === void 0) {
      options = {};
    }

     false ? 0 : void 0;
    if (!activeRef.current) return;

    if (typeof to === "number") {
      navigator.go(to);
      return;
    }

    var path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname);

    if (basename !== "/") {
      path.pathname = joinPaths([basename, path.pathname]);
    }

    (!!options.replace ? navigator.replace : navigator.push)(path, options.state);
  }, [basename, navigator, routePathnamesJson, locationPathname]);
  return navigate;
}

var OutletContext = /*#__PURE__*/(0,react.createContext)(null);
/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/docs/en/v6/api#useoutletcontext
 */

function useOutletContext() {
  return useContext(OutletContext);
}
/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by <Outlet> to render child routes.
 *
 * @see https://reactrouter.com/docs/en/v6/api#useoutlet
 */


function useOutlet(context) {
  var outlet = (0,react.useContext)(RouteContext).outlet;

  if (outlet) {
    return /*#__PURE__*/(0,react.createElement)(OutletContext.Provider, {
      value: context
    }, outlet);
  }

  return outlet;
}
/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/docs/en/v6/api#useparams
 */


function useParams() {
  var _useContext4 = useContext(RouteContext),
      matches = _useContext4.matches;

  var routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/docs/en/v6/api#useresolvedpath
 */


function useResolvedPath(to) {
  var _useContext5 = useContext(RouteContext),
      matches = _useContext5.matches;

  var _useLocation3 = useLocation(),
      locationPathname = _useLocation3.pathname;

  var routePathnamesJson = JSON.stringify(matches.map(function (match) {
    return match.pathnameBase;
  }));
  return useMemo(function () {
    return resolveTo(to, JSON.parse(routePathnamesJson), locationPathname);
  }, [to, routePathnamesJson, locationPathname]);
}
/**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an <Outlet> to render their child route's
 * element.
 *
 * @see https://reactrouter.com/docs/en/v6/api#useroutes
 */


function useRoutes(routes, locationArg) {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;

  var _useContext6 = (0,react.useContext)(RouteContext),
      parentMatches = _useContext6.matches;

  var routeMatch = parentMatches[parentMatches.length - 1];
  var parentParams = routeMatch ? routeMatch.params : {};
  var parentPathname = routeMatch ? routeMatch.pathname : "/";
  var parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  var parentRoute = routeMatch && routeMatch.route;

  if (false) { var parentPath; }

  var locationFromContext = useLocation();
  var location;

  if (locationArg) {
    var _parsedLocationArg$pa;

    var parsedLocationArg = typeof locationArg === "string" ? J(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ?  false ? 0 : invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }

  var pathname = location.pathname || "/";
  var remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  var matches = matchRoutes(routes, {
    pathname: remainingPathname
  });

  if (false) {}

  return _renderMatches(matches && matches.map(function (match) {
    return Object.assign({}, match, {
      params: Object.assign({}, parentParams, match.params),
      pathname: joinPaths([parentPathnameBase, match.pathname]),
      pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, match.pathnameBase])
    });
  }), parentMatches);
} ///////////////////////////////////////////////////////////////////////////////
// UTILS
///////////////////////////////////////////////////////////////////////////////

/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/docs/en/v6/api#createroutesfromchildren
 */


function createRoutesFromChildren(children) {
  var routes = [];
  react.Children.forEach(children, function (element) {
    if (! /*#__PURE__*/(0,react.isValidElement)(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }

    if (element.type === react.Fragment) {
      // Transparently support React.Fragment and its children.
      routes.push.apply(routes, createRoutesFromChildren(element.props.children));
      return;
    }

    !(element.type === Route) ?  false ? 0 : invariant(false) : void 0;
    var route = {
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path
    };

    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children);
    }

    routes.push(route);
  });
  return routes;
}
/**
 * The parameters that were parsed from the URL path.
 */

/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/docs/en/v6/api#generatepath
 */


function generatePath(path, params) {
  if (params === void 0) {
    params = {};
  }

  return path.replace(/:(\w+)/g, function (_, key) {
    !(params[key] != null) ?  false ? 0 : invariant(false) : void 0;
    return params[key];
  }).replace(/\/*\*$/, function (_) {
    return params["*"] == null ? "" : params["*"].replace(/^\/*/, "/");
  });
}
/**
 * A RouteMatch contains info about how a route matched a URL.
 */

/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/docs/en/v6/api#matchroutes
 */


function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }

  var location = typeof locationArg === "string" ? J(locationArg) : locationArg;
  var pathname = stripBasename(location.pathname || "/", basename);

  if (pathname == null) {
    return null;
  }

  var branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  var matches = null;

  for (var i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], pathname);
  }

  return matches;
}

function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }

  if (parentsMeta === void 0) {
    parentsMeta = [];
  }

  if (parentPath === void 0) {
    parentPath = "";
  }

  routes.forEach(function (route, index) {
    var meta = {
      relativePath: route.path || "",
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route: route
    };

    if (meta.relativePath.startsWith("/")) {
      !meta.relativePath.startsWith(parentPath) ?  false ? 0 : invariant(false) : void 0;
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }

    var path = joinPaths([parentPath, meta.relativePath]);
    var routesMeta = parentsMeta.concat(meta); // Add the children before adding this route to the array so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.

    if (route.children && route.children.length > 0) {
      !(route.index !== true) ?  false ? 0 : invariant(false) : void 0;
      flattenRoutes(route.children, branches, routesMeta, path);
    } // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.


    if (route.path == null && !route.index) {
      return;
    }

    branches.push({
      path: path,
      score: computeScore(path, route.index),
      routesMeta: routesMeta
    });
  });
  return branches;
}

function rankRouteBranches(branches) {
  branches.sort(function (a, b) {
    return a.score !== b.score ? b.score - a.score // Higher score first
    : compareIndexes(a.routesMeta.map(function (meta) {
      return meta.childrenIndex;
    }), b.routesMeta.map(function (meta) {
      return meta.childrenIndex;
    }));
  });
}

var paramRe = /^:\w+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;

var isSplat = function isSplat(s) {
  return s === "*";
};

function computeScore(path, index) {
  var segments = path.split("/");
  var initialScore = segments.length;

  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }

  if (index) {
    initialScore += indexRouteValue;
  }

  return segments.filter(function (s) {
    return !isSplat(s);
  }).reduce(function (score, segment) {
    return score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue);
  }, initialScore);
}

function compareIndexes(a, b) {
  var siblings = a.length === b.length && a.slice(0, -1).every(function (n, i) {
    return n === b[i];
  });
  return siblings ? // If two routes are siblings, we should try to match the earlier sibling
  // first. This allows people to have fine-grained control over the matching
  // behavior by simply putting routes with identical paths in the order they
  // want them tried.
  a[a.length - 1] - b[b.length - 1] : // Otherwise, it doesn't really make sense to rank non-siblings by index,
  // so they sort equally.
  0;
}

function matchRouteBranch(branch, pathname) {
  var routesMeta = branch.routesMeta;
  var matchedParams = {};
  var matchedPathname = "/";
  var matches = [];

  for (var i = 0; i < routesMeta.length; ++i) {
    var meta = routesMeta[i];
    var end = i === routesMeta.length - 1;
    var remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    var match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end: end
    }, remainingPathname);
    if (!match) return null;
    Object.assign(matchedParams, match.params);
    var route = meta.route;
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: joinPaths([matchedPathname, match.pathnameBase]),
      route: route
    });

    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }

  return matches;
}
/**
 * Renders the result of `matchRoutes()` into a React element.
 */


function renderMatches(matches) {
  return _renderMatches(matches);
}

function _renderMatches(matches, parentMatches) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }

  if (matches == null) return null;
  return matches.reduceRight(function (outlet, match, index) {
    return /*#__PURE__*/(0,react.createElement)(RouteContext.Provider, {
      children: match.route.element !== undefined ? match.route.element : /*#__PURE__*/(0,react.createElement)(Outlet, null),
      value: {
        outlet: outlet,
        matches: parentMatches.concat(matches.slice(0, index + 1))
      }
    });
  }, null);
}
/**
 * A PathPattern is used to match on some portion of a URL pathname.
 */

/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/docs/en/v6/api#matchpath
 */


function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }

  var _compilePath = compilePath(pattern.path, pattern.caseSensitive, pattern.end),
      _compilePath2 = _slicedToArray(_compilePath, 2),
      matcher = _compilePath2[0],
      paramNames = _compilePath2[1];

  var match = pathname.match(matcher);
  if (!match) return null;
  var matchedPathname = match[0];
  var pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  var captureGroups = match.slice(1);
  var params = paramNames.reduce(function (memo, paramName, index) {
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === "*") {
      var splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }

    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
    return memo;
  }, {});
  return {
    params: params,
    pathname: matchedPathname,
    pathnameBase: pathnameBase,
    pattern: pattern
  };
}

function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }

  if (end === void 0) {
    end = true;
  }

   false ? 0 : void 0;
  var paramNames = [];
  var regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
  .replace(/^\/*/, "/") // Make sure it has a leading /
  .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
  .replace(/:(\w+)/g, function (_, paramName) {
    paramNames.push(paramName);
    return "([^\\/]+)";
  });

  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" // Already matched the initial /, just match the rest
    : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
  } else {
    regexpSource += end ? "\\/*$" // When matching to the end, ignore trailing slashes
    : // Otherwise, match a word boundary or a proceeding /. The word boundary restricts
    // parent routes to matching only their own words and nothing more, e.g. parent
    // route "/home" should not match "/home2".
    "(?:\\b|\\/|$)";
  }

  var matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
  return [matcher, paramNames];
}

function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
     false ? 0 : void 0;
    return value;
  }
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/docs/en/v6/api#resolvepath
 */


function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }

  var _ref5 = typeof to === "string" ? J(to) : to,
      toPathname = _ref5.pathname,
      _ref5$search = _ref5.search,
      search = _ref5$search === void 0 ? "" : _ref5$search,
      _ref5$hash = _ref5.hash,
      hash = _ref5$hash === void 0 ? "" : _ref5$hash;

  var pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname: pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}

function resolvePathname(relativePath, fromPathname) {
  var segments = fromPathname.replace(/\/+$/, "").split("/");
  var relativeSegments = relativePath.split("/");
  relativeSegments.forEach(function (segment) {
    if (segment === "..") {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}

function resolveTo(toArg, routePathnames, locationPathname) {
  var to = typeof toArg === "string" ? J(toArg) : toArg;
  var toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname; // If a pathname is explicitly provided in `to`, it should be relative to the
  // route context. This is explained in `Note on `<Link to>` values` in our
  // migration guide from v5 as a means of disambiguation between `to` values
  // that begin with `/` and those that do not. However, this is problematic for
  // `to` values that do not provide a pathname. `to` can simply be a search or
  // hash string, in which case we should assume that the navigation is relative
  // to the current location's pathname and *not* the route pathname.

  var from;

  if (toPathname == null) {
    from = locationPathname;
  } else {
    var routePathnameIndex = routePathnames.length - 1;

    if (toPathname.startsWith("..")) {
      var toSegments = toPathname.split("/"); // Each leading .. segment means "go up one route" instead of "go up one
      // URL segment".  This is a key difference from how <a href> works and a
      // major reason we call this a "to" value instead of a "href".

      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }

      to.pathname = toSegments.join("/");
    } // If there are more ".." segments than parent routes, resolve relative to
    // the root / URL.


    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }

  var path = resolvePath(to, from); // Ensure the pathname has a trailing slash if the original to value had one.

  if (toPathname && toPathname !== "/" && toPathname.endsWith("/") && !path.pathname.endsWith("/")) {
    path.pathname += "/";
  }

  return path;
}

function getToPathname(to) {
  // Empty strings should be treated the same as / paths
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}

function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;

  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }

  var nextChar = pathname.charAt(basename.length);

  if (nextChar && nextChar !== "/") {
    // pathname does not start with basename/
    return null;
  }

  return pathname.slice(basename.length) || "/";
}

var joinPaths = function joinPaths(paths) {
  return paths.join("/").replace(/\/\/+/g, "/");
};

var normalizePathname = function normalizePathname(pathname) {
  return pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
};

var normalizeSearch = function normalizeSearch(search) {
  return !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
};

var normalizeHash = function normalizeHash(hash) {
  return !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
}; ///////////////////////////////////////////////////////////////////////////////



;// CONCATENATED MODULE: ../../node_modules/redux-persist/es/integration/react.js
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

 // eslint-disable-line import/no-unresolved

var PersistGate = /*#__PURE__*/function (_PureComponent) {
  _inherits(PersistGate, _PureComponent);

  function PersistGate() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PersistGate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PersistGate)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      bootstrapped: false
    });

    _defineProperty(_assertThisInitialized(_this), "_unsubscribe", void 0);

    _defineProperty(_assertThisInitialized(_this), "handlePersistorState", function () {
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

_defineProperty(PersistGate, "defaultProps", {
  children: null,
  loading: null
});
;// CONCATENATED MODULE: ../../node_modules/@reduxjs/toolkit/node_modules/immer/dist/immer.esm.js
function n(n) {
  for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) {
    r[e - 1] = arguments[e];
  }

  if (false) { var i, o; }

  throw Error("[Immer] minified error nr: " + n + (r.length ? " " + r.map(function (n) {
    return "'" + n + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}

function t(n) {
  return !!n && !!n[Q];
}

function immer_esm_r(n) {
  return !!n && (function (n) {
    if (!n || "object" != typeof n) return !1;
    var t = Object.getPrototypeOf(n);
    if (null === t) return !0;
    var r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
    return r === Object || "function" == typeof r && Function.toString.call(r) === Z;
  }(n) || Array.isArray(n) || !!n[L] || !!n.constructor[L] || s(n) || v(n));
}

function e(r) {
  return t(r) || n(23, r), r[Q].t;
}

function i(n, t, r) {
  void 0 === r && (r = !1), 0 === o(n) ? (r ? Object.keys : nn)(n).forEach(function (e) {
    r && "symbol" == typeof e || t(e, n[e], n);
  }) : n.forEach(function (r, e) {
    return t(e, r, n);
  });
}

function o(n) {
  var t = n[Q];
  return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(n) ? 1 : s(n) ? 2 : v(n) ? 3 : 0;
}

function u(n, t) {
  return 2 === o(n) ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t);
}

function a(n, t) {
  return 2 === o(n) ? n.get(t) : n[t];
}

function f(n, t, r) {
  var e = o(n);
  2 === e ? n.set(t, r) : 3 === e ? (n["delete"](t), n.add(r)) : n[t] = r;
}

function c(n, t) {
  return n === t ? 0 !== n || 1 / n == 1 / t : n != n && t != t;
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
  var t = tn(n);
  delete t[Q];

  for (var r = nn(t), e = 0; e < r.length; e++) {
    var i = r[e],
        o = t[i];
    !1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (t[i] = {
      configurable: !0,
      writable: !0,
      enumerable: o.enumerable,
      value: n[i]
    });
  }

  return Object.create(Object.getPrototypeOf(n), t);
}

function d(n, e) {
  return void 0 === e && (e = !1), y(n) || t(n) || !immer_esm_r(n) ? n : (o(n) > 1 && (n.set = n.add = n.clear = n["delete"] = h), Object.freeze(n), e && i(n, function (n, t) {
    return d(t, !0);
  }, !0), n);
}

function h() {
  n(2);
}

function y(n) {
  return null == n || "object" != typeof n || Object.isFrozen(n);
}

function b(t) {
  var r = rn[t];
  return r || n(18, t), r;
}

function m(n, t) {
  rn[n] || (rn[n] = t);
}

function _() {
  return  true || 0, U;
}

function j(n, t) {
  t && (b("Patches"), n.u = [], n.s = [], n.v = t);
}

function O(n) {
  g(n), n.p.forEach(S), n.p = null;
}

function g(n) {
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
  var t = n[Q];
  0 === t.i || 1 === t.i ? t.j() : t.O = !0;
}

function P(t, e) {
  e._ = e.p.length;
  var i = e.p[0],
      o = void 0 !== t && t !== i;
  return e.h.g || b("ES5").S(e, t, o), o ? (i[Q].P && (O(e), n(4)), immer_esm_r(t) && (t = M(e, t), e.l || x(e, t)), e.u && b("Patches").M(i[Q], t, e.u, e.s)) : t = M(e, i, []), O(e), e.u && e.v(e.u, e.s), t !== immer_esm_H ? t : void 0;
}

function M(n, t, r) {
  if (y(t)) return t;
  var e = t[Q];
  if (!e) return i(t, function (i, o) {
    return A(n, e, t, i, o, r);
  }, !0), t;
  if (e.A !== n) return t;
  if (!e.P) return x(n, e.t, !0), e.t;

  if (!e.I) {
    e.I = !0, e.A._--;
    var o = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o;
    i(3 === e.i ? new Set(o) : o, function (t, i) {
      return A(n, e, o, t, i, r);
    }), x(n, o, !1), r && n.u && b("Patches").R(e, r, n.u, n.s);
  }

  return e.o;
}

function A(e, i, o, a, c, s) {
  if ( false && 0, t(c)) {
    var v = M(e, c, s && i && 3 !== i.i && !u(i.D, a) ? s.concat(a) : void 0);
    if (f(o, a, v), !t(v)) return;
    e.m = !1;
  }

  if (immer_esm_r(c) && !y(c)) {
    if (!e.h.F && e._ < 1) return;
    M(e, c), i && i.A.l || x(e, c);
  }
}

function x(n, t, r) {
  void 0 === r && (r = !1), n.h.F && n.m && d(t, r);
}

function z(n, t) {
  var r = n[Q];
  return (r ? p(r) : n)[t];
}

function immer_esm_I(n, t) {
  if (t in n) for (var r = Object.getPrototypeOf(n); r;) {
    var e = Object.getOwnPropertyDescriptor(r, t);
    if (e) return e;
    r = Object.getPrototypeOf(r);
  }
}

function k(n) {
  n.P || (n.P = !0, n.l && k(n.l));
}

function immer_esm_E(n) {
  n.o || (n.o = l(n.t));
}

function R(n, t, r) {
  var e = s(t) ? b("MapSet").N(t, r) : v(t) ? b("MapSet").T(t, r) : n.g ? function (n, t) {
    var r = Array.isArray(n),
        e = {
      i: r ? 1 : 0,
      A: t ? t.A : _(),
      P: !1,
      I: !1,
      D: {},
      l: t,
      t: n,
      k: null,
      o: null,
      j: null,
      C: !1
    },
        i = e,
        o = en;
    r && (i = [e], o = on);
    var u = Proxy.revocable(i, o),
        a = u.revoke,
        f = u.proxy;
    return e.k = f, e.j = a, f;
  }(t, r) : b("ES5").J(t, r);
  return (r ? r.A : _()).p.push(e), e;
}

function immer_esm_D(e) {
  return t(e) || n(22, e), function n(t) {
    if (!immer_esm_r(t)) return t;
    var e,
        u = t[Q],
        c = o(t);

    if (u) {
      if (!u.P && (u.i < 4 || !b("ES5").K(u))) return u.t;
      u.I = !0, e = immer_esm_F(t, c), u.I = !1;
    } else e = immer_esm_F(t, c);

    return i(e, function (t, r) {
      u && a(u.t, t) === r || f(e, t, n(r));
    }), 3 === c ? new Set(e) : e;
  }(e);
}

function immer_esm_F(n, t) {
  switch (t) {
    case 2:
      return new Map(n);

    case 3:
      return Array.from(n);
  }

  return l(n);
}

function N() {
  function r(n, t) {
    var r = s[n];
    return r ? r.enumerable = t : s[n] = r = {
      configurable: !0,
      enumerable: t,
      get: function get() {
        var t = this[Q];
        return  false && 0, en.get(t, n);
      },
      set: function set(t) {
        var r = this[Q];
         false && 0, en.set(r, n, t);
      }
    }, r;
  }

  function e(n) {
    for (var t = n.length - 1; t >= 0; t--) {
      var r = n[t][Q];
      if (!r.P) switch (r.i) {
        case 5:
          a(r) && k(r);
          break;

        case 4:
          o(r) && k(r);
      }
    }
  }

  function o(n) {
    for (var t = n.t, r = n.k, e = nn(r), i = e.length - 1; i >= 0; i--) {
      var o = e[i];

      if (o !== Q) {
        var a = t[o];
        if (void 0 === a && !u(t, o)) return !0;
        var f = r[o],
            s = f && f[Q];
        if (s ? s.t !== a : !c(f, a)) return !0;
      }
    }

    var v = !!t[Q];
    return e.length !== nn(t).length + (v ? 0 : 1);
  }

  function a(n) {
    var t = n.k;
    if (t.length !== n.t.length) return !0;
    var r = Object.getOwnPropertyDescriptor(t, t.length - 1);
    return !(!r || r.get);
  }

  function f(t) {
    t.O && n(3, JSON.stringify(p(t)));
  }

  var s = {};
  m("ES5", {
    J: function J(n, t) {
      var e = Array.isArray(n),
          i = function (n, t) {
        if (n) {
          for (var e = Array(t.length), i = 0; i < t.length; i++) {
            Object.defineProperty(e, "" + i, r(i, !0));
          }

          return e;
        }

        var o = tn(t);
        delete o[Q];

        for (var u = nn(o), a = 0; a < u.length; a++) {
          var f = u[a];
          o[f] = r(f, n || !!o[f].enumerable);
        }

        return Object.create(Object.getPrototypeOf(t), o);
      }(e, n),
          o = {
        i: e ? 5 : 4,
        A: t ? t.A : _(),
        P: !1,
        I: !1,
        D: {},
        l: t,
        t: n,
        k: i,
        o: null,
        O: !1,
        C: !1
      };

      return Object.defineProperty(i, Q, {
        value: o,
        writable: !0
      }), i;
    },
    S: function S(n, r, o) {
      o ? t(r) && r[Q].A === n && e(n.p) : (n.u && function n(t) {
        if (t && "object" == typeof t) {
          var r = t[Q];

          if (r) {
            var e = r.t,
                o = r.k,
                f = r.D,
                c = r.i;
            if (4 === c) i(o, function (t) {
              t !== Q && (void 0 !== e[t] || u(e, t) ? f[t] || n(o[t]) : (f[t] = !0, k(r)));
            }), i(e, function (n) {
              void 0 !== o[n] || u(o, n) || (f[n] = !1, k(r));
            });else if (5 === c) {
              if (a(r) && (k(r), f.length = !0), o.length < e.length) for (var s = o.length; s < e.length; s++) {
                f[s] = !1;
              } else for (var v = e.length; v < o.length; v++) {
                f[v] = !0;
              }

              for (var p = Math.min(o.length, e.length), l = 0; l < p; l++) {
                void 0 === f[l] && n(o[l]);
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
    if (!immer_esm_r(n)) return n;
    if (Array.isArray(n)) return n.map(e);
    if (s(n)) return new Map(Array.from(n.entries()).map(function (n) {
      return [n[0], e(n[1])];
    }));
    if (v(n)) return new Set(Array.from(n).map(e));
    var t = Object.create(Object.getPrototypeOf(n));

    for (var i in n) {
      t[i] = e(n[i]);
    }

    return u(n, L) && (t[L] = n[L]), t;
  }

  function f(n) {
    return t(n) ? e(n) : n;
  }

  var c = "add";
  m("Patches", {
    $: function $(t, r) {
      return r.forEach(function (r) {
        for (var i = r.path, u = r.op, f = t, s = 0; s < i.length - 1; s++) {
          var v = o(f),
              p = "" + i[s];
          0 !== v && 1 !== v || "__proto__" !== p && "constructor" !== p || n(24), "function" == typeof f && "prototype" === p && n(24), "object" != typeof (f = a(f, p)) && n(15, i.join("/"));
        }

        var l = o(f),
            d = e(r.value),
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
                return f["delete"](r.value);

              default:
                return delete f[h];
            }

          default:
            n(17, u);
        }
      }), t;
    },
    R: function R(n, t, r, e) {
      switch (n.i) {
        case 0:
        case 4:
        case 2:
          return function (n, t, r, e) {
            var o = n.t,
                s = n.o;
            i(n.D, function (n, i) {
              var v = a(o, n),
                  p = a(s, n),
                  l = i ? u(o, n) ? "replace" : c : "remove";

              if (v !== p || "replace" !== l) {
                var d = t.concat(n);
                r.push("remove" === l ? {
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
          }(n, t, r, e);

        case 5:
        case 1:
          return function (n, t, r, e) {
            var i = n.t,
                o = n.D,
                u = n.o;

            if (u.length < i.length) {
              var a = [u, i];
              i = a[0], u = a[1];
              var s = [e, r];
              r = s[0], e = s[1];
            }

            for (var v = 0; v < i.length; v++) {
              if (o[v] && u[v] !== i[v]) {
                var p = t.concat([v]);
                r.push({
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
              var d = t.concat([l]);
              r.push({
                op: c,
                path: d,
                value: f(u[l])
              });
            }

            i.length < u.length && e.push({
              op: "replace",
              path: t.concat(["length"]),
              value: i.length
            });
          }(n, t, r, e);

        case 3:
          return function (n, t, r, e) {
            var i = n.t,
                o = n.o,
                u = 0;
            i.forEach(function (n) {
              if (!o.has(n)) {
                var i = t.concat([u]);
                r.push({
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
                var o = t.concat([u]);
                r.push({
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
          }(n, t, r, e);
      }
    },
    M: function M(n, t, r, e) {
      r.push({
        op: "replace",
        path: [],
        value: t === immer_esm_H ? void 0 : t
      }), e.push({
        op: "replace",
        path: [],
        value: n.t
      });
    }
  });
}

function immer_esm_C() {
  function t(n, t) {
    function r() {
      this.constructor = n;
    }

    _a(n, t), n.prototype = (r.prototype = t.prototype, new r());
  }

  function e(n) {
    n.o || (n.D = new Map(), n.o = new Map(n.t));
  }

  function o(n) {
    n.o || (n.o = new Set(), n.t.forEach(function (t) {
      if (immer_esm_r(t)) {
        var e = R(n.A.h, t, n);
        n.p.set(t, e), n.o.add(e);
      } else n.o.add(t);
    }));
  }

  function u(t) {
    t.O && n(3, JSON.stringify(p(t)));
  }

  var _a = function a(n, t) {
    return (_a = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (n, t) {
      n.__proto__ = t;
    } || function (n, t) {
      for (var r in t) {
        t.hasOwnProperty(r) && (n[r] = t[r]);
      }
    })(n, t);
  },
      f = function () {
    function n(n, t) {
      return this[Q] = {
        i: 2,
        l: t,
        A: t ? t.A : _(),
        P: !1,
        I: !1,
        o: void 0,
        D: void 0,
        t: n,
        k: this,
        C: !1,
        O: !1
      }, this;
    }

    t(n, Map);
    var o = n.prototype;
    return Object.defineProperty(o, "size", {
      get: function get() {
        return p(this[Q]).size;
      }
    }), o.has = function (n) {
      return p(this[Q]).has(n);
    }, o.set = function (n, t) {
      var r = this[Q];
      return u(r), p(r).has(n) && p(r).get(n) === t || (e(r), k(r), r.D.set(n, !0), r.o.set(n, t), r.D.set(n, !0)), this;
    }, o["delete"] = function (n) {
      if (!this.has(n)) return !1;
      var t = this[Q];
      return u(t), e(t), k(t), t.D.set(n, !1), t.o["delete"](n), !0;
    }, o.clear = function () {
      var n = this[Q];
      u(n), p(n).size && (e(n), k(n), n.D = new Map(), i(n.t, function (t) {
        n.D.set(t, !1);
      }), n.o.clear());
    }, o.forEach = function (n, t) {
      var r = this;
      p(this[Q]).forEach(function (e, i) {
        n.call(t, r.get(i), i, r);
      });
    }, o.get = function (n) {
      var t = this[Q];
      u(t);
      var i = p(t).get(n);
      if (t.I || !immer_esm_r(i)) return i;
      if (i !== t.t.get(n)) return i;
      var o = R(t.A.h, i, t);
      return e(t), t.o.set(n, o), o;
    }, o.keys = function () {
      return p(this[Q]).keys();
    }, o.values = function () {
      var n,
          t = this,
          r = this.keys();
      return (n = {})[V] = function () {
        return t.values();
      }, n.next = function () {
        var n = r.next();
        return n.done ? n : {
          done: !1,
          value: t.get(n.value)
        };
      }, n;
    }, o.entries = function () {
      var n,
          t = this,
          r = this.keys();
      return (n = {})[V] = function () {
        return t.entries();
      }, n.next = function () {
        var n = r.next();
        if (n.done) return n;
        var e = t.get(n.value);
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
    function n(n, t) {
      return this[Q] = {
        i: 3,
        l: t,
        A: t ? t.A : _(),
        P: !1,
        I: !1,
        o: void 0,
        t: n,
        k: this,
        p: new Map(),
        O: !1,
        C: !1
      }, this;
    }

    t(n, Set);
    var r = n.prototype;
    return Object.defineProperty(r, "size", {
      get: function get() {
        return p(this[Q]).size;
      }
    }), r.has = function (n) {
      var t = this[Q];
      return u(t), t.o ? !!t.o.has(n) || !(!t.p.has(n) || !t.o.has(t.p.get(n))) : t.t.has(n);
    }, r.add = function (n) {
      var t = this[Q];
      return u(t), this.has(n) || (o(t), k(t), t.o.add(n)), this;
    }, r["delete"] = function (n) {
      if (!this.has(n)) return !1;
      var t = this[Q];
      return u(t), o(t), k(t), t.o["delete"](n) || !!t.p.has(n) && t.o["delete"](t.p.get(n));
    }, r.clear = function () {
      var n = this[Q];
      u(n), p(n).size && (o(n), k(n), n.o.clear());
    }, r.values = function () {
      var n = this[Q];
      return u(n), o(n), n.o.values();
    }, r.entries = function () {
      var n = this[Q];
      return u(n), o(n), n.o.entries();
    }, r.keys = function () {
      return this.values();
    }, r[V] = function () {
      return this.values();
    }, r.forEach = function (n, t) {
      for (var r = this.values(), e = r.next(); !e.done;) {
        n.call(t, e.value, e.value, this), e = r.next();
      }
    }, n;
  }();

  m("MapSet", {
    N: function N(n, t) {
      return new f(n, t);
    },
    T: function T(n, t) {
      return new c(n, t);
    }
  });
}

function immer_esm_J() {
  N(), immer_esm_C(), T();
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
    immer_esm_B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
    immer_esm_H = W ? Symbol["for"]("immer-nothing") : ((G = {})["immer-nothing"] = !0, G),
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
    tn = Object.getOwnPropertyDescriptors || function (n) {
  var t = {};
  return nn(n).forEach(function (r) {
    t[r] = Object.getOwnPropertyDescriptor(n, r);
  }), t;
},
    rn = {},
    en = {
  get: function get(n, t) {
    if (t === Q) return n;
    var e = p(n);
    if (!u(e, t)) return function (n, t, r) {
      var e,
          i = immer_esm_I(t, r);
      return i ? "value" in i ? i.value : null === (e = i.get) || void 0 === e ? void 0 : e.call(n.k) : void 0;
    }(n, e, t);
    var i = e[t];
    return n.I || !immer_esm_r(i) ? i : i === z(n.t, t) ? (immer_esm_E(n), n.o[t] = R(n.A.h, i, n)) : i;
  },
  has: function has(n, t) {
    return t in p(n);
  },
  ownKeys: function ownKeys(n) {
    return Reflect.ownKeys(p(n));
  },
  set: function set(n, t, r) {
    var e = immer_esm_I(p(n), t);
    if (null == e ? void 0 : e.set) return e.set.call(n.k, r), !0;

    if (!n.P) {
      var i = z(p(n), t),
          o = null == i ? void 0 : i[Q];
      if (o && o.t === r) return n.o[t] = r, n.D[t] = !1, !0;
      if (c(r, i) && (void 0 !== r || u(n.t, t))) return !0;
      immer_esm_E(n), k(n);
    }

    return n.o[t] === r && "number" != typeof r && (void 0 !== r || t in n.o) || (n.o[t] = r, n.D[t] = !0, !0);
  },
  deleteProperty: function deleteProperty(n, t) {
    return void 0 !== z(n.t, t) || t in n.t ? (n.D[t] = !1, immer_esm_E(n), k(n)) : delete n.D[t], n.o && delete n.o[t], !0;
  },
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(n, t) {
    var r = p(n),
        e = Reflect.getOwnPropertyDescriptor(r, t);
    return e ? {
      writable: !0,
      configurable: 1 !== n.i || "length" !== t,
      enumerable: e.enumerable,
      value: r[t]
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

i(en, function (n, t) {
  on[n] = function () {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
}), on.deleteProperty = function (t, r) {
  return  false && 0, en.deleteProperty.call(this, t[0], r);
}, on.set = function (t, r, e) {
  return  false && 0, en.set.call(this, t[0], r, e, t[0]);
};

var un = function () {
  function e(t) {
    var e = this;
    this.g = immer_esm_B, this.F = !0, this.produce = function (t, i, o) {
      if ("function" == typeof t && "function" != typeof i) {
        var u = i;
        i = t;
        var a = e;
        return function (n) {
          var t = this;
          void 0 === n && (n = u);

          for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) {
            e[o - 1] = arguments[o];
          }

          return a.produce(n, function (n) {
            var r;
            return (r = i).call.apply(r, [t, n].concat(e));
          });
        };
      }

      var f;

      if ("function" != typeof i && n(6), void 0 !== o && "function" != typeof o && n(7), immer_esm_r(t)) {
        var c = w(e),
            s = R(e, t, void 0),
            v = !0;

        try {
          f = i(s), v = !1;
        } finally {
          v ? O(c) : g(c);
        }

        return "undefined" != typeof Promise && f instanceof Promise ? f.then(function (n) {
          return j(c, o), P(n, c);
        }, function (n) {
          throw O(c), n;
        }) : (j(c, o), P(f, c));
      }

      if (!t || "object" != typeof t) {
        if ((f = i(t)) === immer_esm_H) return;
        return void 0 === f && (f = t), e.F && d(f, !0), f;
      }

      n(21, t);
    }, this.produceWithPatches = function (n, t) {
      return "function" == typeof n ? function (t) {
        for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) {
          i[o - 1] = arguments[o];
        }

        return e.produceWithPatches(t, function (t) {
          return n.apply(void 0, [t].concat(i));
        });
      } : [e.produce(n, t, function (n, t) {
        r = n, i = t;
      }), r, i];
      var r, i;
    }, "boolean" == typeof (null == t ? void 0 : t.useProxies) && this.setUseProxies(t.useProxies), "boolean" == typeof (null == t ? void 0 : t.autoFreeze) && this.setAutoFreeze(t.autoFreeze);
  }

  var i = e.prototype;
  return i.createDraft = function (e) {
    immer_esm_r(e) || n(8), t(e) && (e = immer_esm_D(e));
    var i = w(this),
        o = R(this, e, void 0);
    return o[Q].C = !0, g(i), o;
  }, i.finishDraft = function (t, r) {
    var e = t && t[Q];
     false && (0);
    var i = e.A;
    return j(i, r), P(void 0, i);
  }, i.setAutoFreeze = function (n) {
    this.F = n;
  }, i.setUseProxies = function (t) {
    t && !immer_esm_B && n(20), this.g = t;
  }, i.applyPatches = function (n, r) {
    var e;

    for (e = r.length - 1; e >= 0; e--) {
      var i = r[e];

      if (0 === i.path.length && "replace" === i.op) {
        n = i.value;
        break;
      }
    }

    e > -1 && (r = r.slice(e + 1));
    var o = b("Patches").$;
    return t(n) ? o(n, r) : this.produce(n, function (n) {
      return o(n, r);
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

;// CONCATENATED MODULE: ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
;// CONCATENATED MODULE: ../../node_modules/@babel/runtime/helpers/esm/objectSpread2.js


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      defineProperty_defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}
;// CONCATENATED MODULE: ../../node_modules/redux/es/redux.js

/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */

function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
} // Inlined version of the `symbol-observable` polyfill


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
} // Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of


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
 * Creates a Redux store that holds the state tree.
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
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */


function redux_warning(message) {
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


function redux_bindActionCreators(actionCreators, dispatch) {
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
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */


function isCrushed() {}

if (false) {}


;// CONCATENATED MODULE: ../../node_modules/redux-thunk/es/index.js
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
;// CONCATENATED MODULE: ../../node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js
var redux_toolkit_esm_extends = undefined && undefined.__extends || function () {
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
}; // src/index.ts





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
}; // src/configureStore.ts


 // src/devtoolsExtension.ts


var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function () {
  if (arguments.length === 0) return void 0;
  if (typeof arguments[0] === "object") return compose;
  return compose.apply(null, arguments);
};
var devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function () {
  return function (noop) {
    return noop;
  };
}; // src/isPlainObject.ts

function redux_toolkit_esm_isPlainObject(value) {
  if (typeof value !== "object" || value === null) return false;
  var proto = Object.getPrototypeOf(value);
  if (proto === null) return true;
  var baseProto = proto;

  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
} // src/getDefaultMiddleware.ts


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

var MiddlewareArray =
/** @class */
function (_super) {
  redux_toolkit_esm_extends(MiddlewareArray, _super);

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
}(Array); // src/immutableStateInvariantMiddleware.ts


var isProduction = (/* unused pure expression or super */ null && ("production" === "production"));
var prefix = "Invariant failed";

function redux_toolkit_esm_invariant(condition, message) {
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
  return typeof value !== "object" || value === null || typeof value === "undefined" || Object.isFrozen(value);
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

function _detectMutations(isImmutable, ignorePaths, trackedProperty, obj, sameParentRef, path) {
  if (ignorePaths === void 0) {
    ignorePaths = [];
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

  for (var key in keysToDetect) {
    var childPath = path ? path + "." + key : key;

    if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
      continue;
    }

    var result = _detectMutations(isImmutable, ignorePaths, trackedProperty.children[key], obj[key], sameRef, childPath);

    if (result.wasMutated) {
      return result;
    }
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
          redux_toolkit_esm_invariant(!result.wasMutated, "A state mutation was detected between dispatches, in the path '" + (result.path || "") + "'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
        });
        var dispatchedAction = next(action);
        measureUtils.measureTime(function () {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          result.wasMutated && redux_toolkit_esm_invariant(!result.wasMutated, "A state mutation was detected inside a dispatch, in the path: " + (result.path || "") + ". Take a look at the reducer(s) handling the action " + stringify(action) + ". (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
        });
        measureUtils.warnIfExceeded();
        return dispatchedAction;
      };
    };
  };
} // src/serializableStateInvariantMiddleware.ts


function isPlain(val) {
  var type = typeof val;
  return type === "undefined" || val === null || type === "string" || type === "boolean" || type === "number" || Array.isArray(val) || redux_toolkit_esm_isPlainObject(val);
}

function findNonSerializableValue(value, path, isSerializable, getEntries, ignoredPaths) {
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

  var entries = getEntries != null ? getEntries(value) : Object.entries(value);
  var hasIgnoredPaths = ignoredPaths.length > 0;

  for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
    var _c = entries_1[_i],
        key = _c[0],
        nestedValue = _c[1];
    var nestedPath = path ? path + "." + key : key;

    if (hasIgnoredPaths && ignoredPaths.indexOf(nestedPath) >= 0) {
      continue;
    }

    if (!isSerializable(nestedValue)) {
      return {
        keyPath: nestedPath,
        value: nestedValue
      };
    }

    if (typeof nestedValue === "object") {
      foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable, getEntries, ignoredPaths);

      if (foundNestedSerializable) {
        return foundNestedSerializable;
      }
    }
  }

  return false;
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
      ignoreState = _h === void 0 ? false : _h;
  return function (storeAPI) {
    return function (next) {
      return function (action) {
        if (ignoredActions.length && ignoredActions.indexOf(action.type) !== -1) {
          return next(action);
        }

        var measureUtils = getTimeMeasureUtils(warnAfter, "SerializableStateInvariantMiddleware");
        measureUtils.measureTime(function () {
          var foundActionNonSerializableValue = findNonSerializableValue(action, "", isSerializable, getEntries, ignoredActionPaths);

          if (foundActionNonSerializableValue) {
            var keyPath = foundActionNonSerializableValue.keyPath,
                value = foundActionNonSerializableValue.value;
            console.error("A non-serializable value was detected in an action, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the logic that dispatched this action: ", action, "\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)", "\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)");
          }
        });
        var result = next(action);

        if (!ignoreState) {
          measureUtils.measureTime(function () {
            var state = storeAPI.getState();
            var foundStateNonSerializableValue = findNonSerializableValue(state, "", isSerializable, getEntries, ignoredPaths);

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
} // src/getDefaultMiddleware.ts


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
} // src/configureStore.ts


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

  var storeEnhancers = [middlewareEnhancer];

  if (Array.isArray(enhancers)) {
    storeEnhancers = __spreadArray([middlewareEnhancer], enhancers);
  } else if (typeof enhancers === "function") {
    storeEnhancers = enhancers(storeEnhancers);
  }

  var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
  return createStore(rootReducer, preloadedState, composedEnhancer);
} // src/createAction.ts


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

function isFSA(action) {
  return redux_toolkit_esm_isPlainObject(action) && typeof action.type === "string" && Object.keys(action).every(isValidKey);
}

function isValidKey(key) {
  return ["type", "payload", "error", "meta"].indexOf(key) > -1;
}

function getType(actionCreator) {
  return "" + actionCreator;
} // src/createReducer.ts


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
} // src/createReducer.ts


function isStateFunction(x) {
  return typeof x === "function";
}

function createReducer(initialState, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
  if (actionMatchers === void 0) {
    actionMatchers = [];
  }

  var _c = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer],
      actionsMap = _c[0],
      finalActionMatchers = _c[1],
      finalDefaultCaseReducer = _c[2];

  var getInitialState;

  if (isStateFunction(initialState)) {
    getInitialState = function getInitialState() {
      return immer_esm(initialState(), function () {});
    };
  } else {
    var frozenInitialState_1 = immer_esm(initialState, function () {});

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
        if (t(previousState)) {
          var draft = previousState;
          var result = caseReducer(draft, action);

          if (typeof result === "undefined") {
            return previousState;
          }

          return result;
        } else if (!immer_esm_r(previousState)) {
          var result = caseReducer(previousState, action);

          if (typeof result === "undefined") {
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
} // src/createSlice.ts


function getType2(slice, actionKey) {
  return slice + "/" + actionKey;
}

function createSlice(options) {
  var name = options.name;

  if (!name) {
    throw new Error("`name` is a required option for createSlice");
  }

  var initialState = typeof options.initialState == "function" ? options.initialState : immer_esm(options.initialState, function () {});
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
    var _c = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers],
        _d = _c[0],
        extraReducers = _d === void 0 ? {} : _d,
        _e = _c[1],
        actionMatchers = _e === void 0 ? [] : _e,
        _f = _c[2],
        defaultCaseReducer = _f === void 0 ? void 0 : _f;

    var finalCaseReducers = __spreadValues(__spreadValues({}, extraReducers), sliceCaseReducersByType);

    return createReducer(initialState, finalCaseReducers, actionMatchers, defaultCaseReducer);
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
} // src/entities/entity_state.ts


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
} // src/entities/state_selectors.ts


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
} // src/entities/state_adapter.ts




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
      return createNextState2(state, runMutator);
    }
  };
} // src/entities/utils.ts


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
} // src/entities/unsorted_state_adapter.ts


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
        state.ids = state.ids.map(function (id) {
          return newKeys[id] || id;
        });
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
} // src/entities/sorted_state_adapter.ts


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

  function takeUpdatedModel(models, update, state) {
    if (!(update.id in state.entities)) {
      return false;
    }

    var original2 = state.entities[update.id];
    var updated = Object.assign({}, original2, update.changes);
    var newKey = selectIdValue(updated, selectId);
    delete state.entities[update.id];
    models.push(updated);
    return newKey !== update.id;
  }

  function updateManyMutably(updates, state) {
    var models = [];
    updates.forEach(function (update) {
      return takeUpdatedModel(models, update, state);
    });

    if (models.length !== 0) {
      merge(models, state);
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
} // src/entities/create_adapter.ts


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
} // src/nanoid.ts


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
}; // src/createAsyncThunk.ts


var commonProperties = (/* unused pure expression or super */ null && (["name", "message", "stack", "code"]));

var RejectWithValue =
/** @class */
function () {
  function RejectWithValue(payload, meta) {
    this.payload = payload;
    this.meta = meta;
  }

  return RejectWithValue;
}();

var FulfillWithMeta =
/** @class */
function () {
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

function createAsyncThunk(typePrefix, payloadCreator, options) {
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
  var AC = typeof AbortController !== "undefined" ? AbortController :
  /** @class */
  function () {
    function class_1() {
      this.signal = {
        aborted: false,
        addEventListener: function addEventListener() {},
        dispatchEvent: function dispatchEvent() {
          return false;
        },
        onabort: function onabort() {},
        removeEventListener: function removeEventListener() {}
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
      var abortedPromise = new Promise(function (_, reject) {
        return abortController.signal.addEventListener("abort", function () {
          return reject({
            name: "AbortError",
            message: abortReason || "Aborted"
          });
        });
      });
      var started = false;

      function abort(reason) {
        if (started) {
          abortReason = reason;
          abortController.abort();
        }
      }

      var promise = function () {
        return __async(this, null, function () {
          var _a, _b, finalAction, conditionResult, err_1, skipDispatch;

          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                _c.trys.push([0, 4,, 5]);

                conditionResult = (_a = options == null ? void 0 : options.condition) == null ? void 0 : _a.call(options, arg, {
                  getState: getState,
                  extra: extra
                });
                if (!isThenable(conditionResult)) return [3
                /*break*/
                , 2];
                return [4
                /*yield*/
                , conditionResult];

              case 1:
                conditionResult = _c.sent();
                _c.label = 2;

              case 2:
                if (conditionResult === false) {
                  throw {
                    name: "ConditionError",
                    message: "Aborted due to condition callback returning false."
                  };
                }

                started = true;
                dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, {
                  requestId: requestId,
                  arg: arg
                }, {
                  getState: getState,
                  extra: extra
                })));
                return [4
                /*yield*/
                , Promise.race([abortedPromise, Promise.resolve(payloadCreator(arg, {
                  dispatch: dispatch,
                  getState: getState,
                  extra: extra,
                  requestId: requestId,
                  signal: abortController.signal,
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
                return [3
                /*break*/
                , 5];

              case 4:
                err_1 = _c.sent();
                finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                return [3
                /*break*/
                , 5];

              case 5:
                skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;

                if (!skipDispatch) {
                  dispatch(finalAction);
                }

                return [2
                /*return*/
                , finalAction];
            }
          });
        });
      }();

      return Object.assign(promise, {
        abort: abort,
        requestId: requestId,
        arg: arg,
        unwrap: function unwrap() {
          return promise.then(unwrapResult);
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
} // src/tsHelpers.ts


var hasMatchFunction = function hasMatchFunction(v) {
  return v && typeof v.match === "function";
}; // src/matchers.ts


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
} // src/index.ts


N();

;// CONCATENATED MODULE: ../../node_modules/redux-persist/es/constants.js
var KEY_PREFIX = 'persist:';
var FLUSH = 'persist/FLUSH';
var REHYDRATE = 'persist/REHYDRATE';
var PAUSE = 'persist/PAUSE';
var PERSIST = 'persist/PERSIST';
var PURGE = 'persist/PURGE';
var REGISTER = 'persist/REGISTER';
var DEFAULT_VERSION = -1;
;// CONCATENATED MODULE: ../../node_modules/redux-persist/es/stateReconciler/autoMergeLevel1.js
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
;// CONCATENATED MODULE: ../../node_modules/redux-persist/es/createPersistoid.js
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
;// CONCATENATED MODULE: ../../node_modules/redux-persist/es/getStoredState.js

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
;// CONCATENATED MODULE: ../../node_modules/redux-persist/es/purgeStoredState.js

function purgeStoredState(config) {
  var storage = config.storage;
  var storageKey = "".concat(config.keyPrefix !== undefined ? config.keyPrefix : KEY_PREFIX).concat(config.key);
  return storage.removeItem(storageKey, warnIfRemoveError);
}

function warnIfRemoveError(err) {
  if (err && "production" !== 'production') {}
}
;// CONCATENATED MODULE: ../../node_modules/redux-persist/es/persistReducer.js
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
;// CONCATENATED MODULE: ../../node_modules/redux-persist/es/persistStore.js
function _toConsumableArray(arr) {
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
        registry: [].concat(_toConsumableArray(state.registry), [action.key])
      });

    case REHYDRATE:
      var firstIndex = state.registry.indexOf(action.key);

      var registry = _toConsumableArray(state.registry);

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
;// CONCATENATED MODULE: ../../node_modules/redux-persist/es/index.js









;// CONCATENATED MODULE: ./src/demo/store.ts
var persistConfig={key:'counter',storage:{getItem:function getItem(x){var item=localStorage.getItem(x);if(item){try{return Promise.resolve(JSON.parse(item));}catch(_unused){}}return Promise.resolve(null);},setItem:function setItem(x,v){localStorage.setItem(x,JSON.stringify(v));return Promise.resolve();},removeItem:function removeItem(x){localStorage.removeItem(x);return Promise.resolve();}}};var counterSlice=createSlice({name:'counter',initialState:{count:0},reducers:{increment:function increment(state){return{count:(state.count||0)+1};},decrement:function decrement(state){return{count:(state.count||0)-1};}}});var counter=persistReducer(persistConfig,counterSlice.reducer);var _counterSlice$actions=counterSlice.actions,increment=_counterSlice$actions.increment,decrement=_counterSlice$actions.decrement;var store=configureStore({reducer:{counter:counter},middleware:getDefaultMiddleware({serializableCheck:{ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]}}),devTools:false});var persistor=persistStore(store);var selectCount=function selectCount(x){return x.counter.count;};
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(62);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(36);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(793);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(892);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(173);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(464);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/app/index.module.scss
var index_module = __webpack_require__(359);
;// CONCATENATED MODULE: ./src/app/index.module.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(index_module/* default */.Z, options);




       /* harmony default export */ const app_index_module = (index_module/* default */.Z && index_module/* default.locals */.Z.locals ? index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../node_modules/clsx/dist/clsx.m.js
function toVal(mix) {
  var k,
      y,
      str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if (y = toVal(mix[k])) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }

  return str;
}

/* harmony default export */ function clsx_m() {
  var i = 0,
      tmp,
      x,
      str = '';

  while (i < arguments.length) {
    if (tmp = arguments[i++]) {
      if (x = toVal(tmp)) {
        str && (str += ' ');
        str += x;
      }
    }
  }

  return str;
}
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/pages/animations/index.module.scss
var animations_index_module = __webpack_require__(396);
;// CONCATENATED MODULE: ./src/pages/animations/index.module.scss

      
      
      
      
      
      
      
      
      

var index_module_options = {};

index_module_options.styleTagTransform = (styleTagTransform_default());
index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      index_module_options.insert = insertBySelector_default().bind(null, "head");
    
index_module_options.domAPI = (styleDomAPI_default());
index_module_options.insertStyleElement = (insertStyleElement_default());

var index_module_update = injectStylesIntoStyleTag_default()(animations_index_module/* default */.Z, index_module_options);




       /* harmony default export */ const pages_animations_index_module = (animations_index_module/* default */.Z && animations_index_module/* default.locals */.Z.locals ? animations_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/pages/animations/index.tsx
var AnimationsPage=function AnimationsPage(){return/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:clsx_m(pages_animations_index_module.host),children:[/*#__PURE__*/(0,jsx_runtime.jsx)("pulsar",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("catwalk",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("ryu",{})]});};/* harmony default export */ const animations = (AnimationsPage);
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/pages/bg-patterns/index.module.scss
var bg_patterns_index_module = __webpack_require__(28);
;// CONCATENATED MODULE: ./src/pages/bg-patterns/index.module.scss

      
      
      
      
      
      
      
      
      

var bg_patterns_index_module_options = {};

bg_patterns_index_module_options.styleTagTransform = (styleTagTransform_default());
bg_patterns_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      bg_patterns_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
bg_patterns_index_module_options.domAPI = (styleDomAPI_default());
bg_patterns_index_module_options.insertStyleElement = (insertStyleElement_default());

var bg_patterns_index_module_update = injectStylesIntoStyleTag_default()(bg_patterns_index_module/* default */.Z, bg_patterns_index_module_options);




       /* harmony default export */ const pages_bg_patterns_index_module = (bg_patterns_index_module/* default */.Z && bg_patterns_index_module/* default.locals */.Z.locals ? bg_patterns_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/pages/bg-patterns/index.tsx
var BgPatternsPage=function BgPatternsPage(){return/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:clsx_m(pages_bg_patterns_index_module.host),children:[/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("bg",{})]});};/* harmony default export */ const bg_patterns = (BgPatternsPage);
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/pages/home/index.module.scss
var home_index_module = __webpack_require__(579);
;// CONCATENATED MODULE: ./src/pages/home/index.module.scss

      
      
      
      
      
      
      
      
      

var home_index_module_options = {};

home_index_module_options.styleTagTransform = (styleTagTransform_default());
home_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      home_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
home_index_module_options.domAPI = (styleDomAPI_default());
home_index_module_options.insertStyleElement = (insertStyleElement_default());

var home_index_module_update = injectStylesIntoStyleTag_default()(home_index_module/* default */.Z, home_index_module_options);




       /* harmony default export */ const pages_home_index_module = (home_index_module/* default */.Z && home_index_module/* default.locals */.Z.locals ? home_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/pages/home/index.tsx
var HomePage=function HomePage(){return/*#__PURE__*/(0,jsx_runtime.jsx)("view",{className:pages_home_index_module.host,children:"Welcome to ReactUnity"});};/* harmony default export */ const home = (HomePage);
;// CONCATENATED MODULE: ./src/assets/base64Image.txt
/* harmony default export */ const base64Image = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAcElEQVR4AezOsREAIAjFUAs3dgAGYkj8C3g2oBTJXfo3iD419dJ2eOn5EuM6LnsFynQkb4AKQP2zlBOLpAEBAgQIECBAgAA1Au29p6aDrlPBQd3UdJA7yIcUho4KA5UBBxDHk9GwzwdiGQY6gVEwCgC3bcAZ+oXojwAAAABJRU5ErkJggg==\n");
;// CONCATENATED MODULE: ./src/assets/bg.png
/* harmony default export */ const bg = (__webpack_require__.p + "static/media/bg.png");
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/pages/images/index.module.scss
var images_index_module = __webpack_require__(113);
;// CONCATENATED MODULE: ./src/pages/images/index.module.scss

      
      
      
      
      
      
      
      
      

var images_index_module_options = {};

images_index_module_options.styleTagTransform = (styleTagTransform_default());
images_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      images_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
images_index_module_options.domAPI = (styleDomAPI_default());
images_index_module_options.insertStyleElement = (insertStyleElement_default());

var images_index_module_update = injectStylesIntoStyleTag_default()(images_index_module/* default */.Z, images_index_module_options);




       /* harmony default export */ const pages_images_index_module = (images_index_module/* default */.Z && images_index_module/* default.locals */.Z.locals ? images_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/pages/images/index.tsx
var webImage='https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';var webVideo='https://media.w3.org/2010/05/sintel/trailer.mp4';function ImagesPage(){var _useState=(0,react.useState)(),_useState2=_slicedToArray(_useState,2),videoRef=_useState2[0],setVideoRef=_useState2[1];var Globals=globalsWatcher.useContext();(0,react.useEffect)(function(){if(videoRef){videoRef.VideoPlayer.Pause();}},[videoRef]);var toggleVideo=function toggleVideo(){var vp=videoRef.VideoPlayer;if(vp.isPlaying)vp.Pause();else vp.Play();};return/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:pages_images_index_module.host,children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Image"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:bg}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:base64Image}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:webImage})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Prefab"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("prefab",{target:Globals.customPrefab})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Video"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("video",{style:{flexGrow:1},source:webVideo,ref:setVideoRef,onPointerClick:toggleVideo})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Render Texture"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("render",{width:900,height:400,style:{flexGrow:1},onDrag:function onDrag(ev){Globals.cameraRoot.transform.Rotate(new Interop.UnityEngine.Vector3(-ev.delta.y,ev.delta.x,0));},onScroll:function onScroll(ev){Globals.renderCamera.transform.Translate(0,0,Math.fround(ev.scrollDelta.y/10),Interop.UnityEngine.Space.Self);},onMount:function onMount(ev){return ev.gameObject.SetActive(true);},onUnmount:function onUnmount(ev){return ev.gameObject.SetActive(false);},camera:Globals.renderCamera})})]})]});};/* harmony default export */ const pages_images = (ImagesPage);
;// CONCATENATED MODULE: ../../material/dist/src/util/helpers.js

function getChildrenOfType(children, type) {
  return react.Children.toArray(children).filter(function (x) {
    return x['type'] === type;
  });
}
function getOnlyChildOfType(children, type) {
  return getChildrenOfType(children, type);
}
function getElevationClass(elevation) {
  if (elevation > 0) return "mat-elevation-".concat(elevation);
  return 'mat-elevation-0';
}
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/accordion/index.module.scss
var accordion_index_module = __webpack_require__(493);
;// CONCATENATED MODULE: ../../material/dist/src/accordion/index.module.scss

      
      
      
      
      
      
      
      
      

var accordion_index_module_options = {};

accordion_index_module_options.styleTagTransform = (styleTagTransform_default());
accordion_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      accordion_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
accordion_index_module_options.domAPI = (styleDomAPI_default());
accordion_index_module_options.insertStyleElement = (insertStyleElement_default());

var accordion_index_module_update = injectStylesIntoStyleTag_default()(accordion_index_module/* default */.Z, accordion_index_module_options);




       /* harmony default export */ const src_accordion_index_module = (accordion_index_module/* default */.Z && accordion_index_module/* default.locals */.Z.locals ? accordion_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/accordion/index.js
var accordion_assign = undefined && undefined.__assign || function () {
  accordion_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return accordion_assign.apply(this, arguments);
};

var accordion_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};






var expanderBaseStyle = {
  height: 0
};

function _Accordion(_a) {
  var children = _a.children,
      className = _a.className,
      _b = _a.elevation,
      elevation = _b === void 0 ? 1 : _b,
      props = accordion_rest(_a, ["children", "className", "elevation"]);

  var summary = getOnlyChildOfType(children, _Summary);
  var content = getOnlyChildOfType(children, _Content);

  var _c = (0,react.useState)(false),
      opened = _c[0],
      setOpened = _c[1];

  var expanderRef = (0,react.useRef)();
  var wrapperRef = (0,react.useRef)();

  var onResize = function onResize(ev, sender) {
    if (!expanderRef.current) return;

    if (opened) {
      expanderRef.current.Style.Set('height', sender.RectTransform.rect.height);
    }
  };

  (0,react.useEffect)(function () {
    if (!expanderRef.current || !wrapperRef.current) return;
    expanderRef.current.Style.Set('height', opened ? wrapperRef.current.RectTransform.rect.height : 0);
    expanderRef.current.Style.Set('opacity', opened ? 1 : 0);
  }, [opened]);
  return (0,jsx_runtime.jsxs)("view", accordion_assign({
    name: "<Accordion>",
    className: clsx_m(className, src_accordion_index_module.host, opened && [src_accordion_index_module.expanded, 'mat-expanded'], getElevationClass(elevation), 'mat-accordion')
  }, props, {
    children: [(0,jsx_runtime.jsxs)("view", accordion_assign({
      name: "<AccordionHeader>",
      className: clsx_m(src_accordion_index_module.header, 'mat-accordion-header'),
      onPointerClick: function onPointerClick() {
        return setOpened(function (x) {
          return !x;
        });
      }
    }, {
      children: [summary, (0,jsx_runtime.jsx)("icon", {
        children: "expand_more"
      }, void 0)]
    }), void 0), (0,jsx_runtime.jsx)("view", accordion_assign({
      className: clsx_m(src_accordion_index_module.expander, 'mat-accordion-expander'),
      ref: expanderRef,
      style: expanderBaseStyle
    }, {
      children: (0,jsx_runtime.jsx)("view", accordion_assign({
        onResize: onResize,
        ref: wrapperRef,
        className: src_accordion_index_module.contentWrapper
      }, {
        children: content
      }), void 0)
    }), void 0)]
  }), void 0);
}

function _Summary(_a) {
  var className = _a.className,
      props = accordion_rest(_a, ["className"]);

  return (0,jsx_runtime.jsx)("view", accordion_assign({
    name: "<Accordion.Summary>",
    className: clsx_m(className, src_accordion_index_module.summary, 'mat-accordion-summary')
  }, props), void 0);
}

function _Content(_a) {
  var className = _a.className,
      props = accordion_rest(_a, ["className"]);

  return (0,jsx_runtime.jsx)("view", accordion_assign({
    name: "<Accordion.Content>",
    className: clsx_m(className, src_accordion_index_module.content, 'mat-accordion-content')
  }, props), void 0);
}

var Accordion = react.memo(_Accordion);
Accordion.Summary = _Summary;
Accordion.Content = _Content;
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/ripple/index.module.scss
var ripple_index_module = __webpack_require__(825);
;// CONCATENATED MODULE: ../../material/dist/src/ripple/index.module.scss

      
      
      
      
      
      
      
      
      

var ripple_index_module_options = {};

ripple_index_module_options.styleTagTransform = (styleTagTransform_default());
ripple_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      ripple_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
ripple_index_module_options.domAPI = (styleDomAPI_default());
ripple_index_module_options.insertStyleElement = (insertStyleElement_default());

var ripple_index_module_update = injectStylesIntoStyleTag_default()(ripple_index_module/* default */.Z, ripple_index_module_options);




       /* harmony default export */ const src_ripple_index_module = (ripple_index_module/* default */.Z && ripple_index_module/* default.locals */.Z.locals ? ripple_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/ripple/index.js


function addRipple(containerElement, pressPosition) {
  if (!containerElement) return null;
  var ripple = UnityBridge.createElement('view', '', HostContainer);
  ripple.ClassName = "".concat(src_ripple_index_module.ripple, " mat-ripple");
  ripple.Name = '<Ripple>';
  var w = containerElement.RectTransform.rect.width;
  var h = containerElement.RectTransform.rect.height;
  var maxDimension = Math.max(w, h);

  if (pressPosition) {
    var pos = containerElement.GetRelativePosition(pressPosition.x, pressPosition.y);
    ripple.Style.Set('left', pos.x);
    ripple.Style.Set('top', pos.y);
    var hw = w / 2;
    var hh = h / 2;
    var rx = pos.x > hw ? 0 : w;
    var ry = pos.y > hh ? 0 : h;
    var dx = rx - pos.x;
    var dy = ry - pos.y;
    var mag = Math.sqrt(dx * dx + dy * dy) * 2.1;
    ripple.Style.Set('width', mag);
    ripple.Style.Set('height', mag);
  } else {
    ripple.Style.Set('position', 'static');
    ripple.Style.Set('left', '50%');
    ripple.Style.Set('top', '50%');
    ripple.Style.Set('width', maxDimension);
    ripple.Style.Set('height', maxDimension);
  }

  UnityBridge.appendChild(containerElement, ripple);
  return ripple;
}
function useRipple(_a) {
  var onPointerDown = _a.onPointerDown,
      onPointerUp = _a.onPointerUp,
      noRipple = _a.noRipple,
      centered = _a.centered,
      target = _a.target;
  var rippleRef = (0,react.useRef)();
  var pointerDown = (0,react.useCallback)(function (ev, sender) {
    var _a;

    onPointerDown === null || onPointerDown === void 0 ? void 0 : onPointerDown.call(null, ev, sender);

    if (!noRipple) {
      (_a = rippleRef.current) === null || _a === void 0 ? void 0 : _a.Remove();
      rippleRef.current = addRipple(target ? target.current : sender, centered ? null : ev.pressPosition);
    }
  }, [noRipple, onPointerDown, centered, target]);
  var pointerUp = (0,react.useCallback)(function () {
    var _a;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    onPointerUp === null || onPointerUp === void 0 ? void 0 : onPointerUp.apply(null, args);
    (_a = rippleRef.current) === null || _a === void 0 ? void 0 : _a.Remove();
    rippleRef.current = null;
  }, [onPointerUp]);
  return {
    onPointerDown: pointerDown,
    onPointerUp: pointerUp
  };
}
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/button/index.module.scss
var button_index_module = __webpack_require__(757);
;// CONCATENATED MODULE: ../../material/dist/src/button/index.module.scss

      
      
      
      
      
      
      
      
      

var button_index_module_options = {};

button_index_module_options.styleTagTransform = (styleTagTransform_default());
button_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      button_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
button_index_module_options.domAPI = (styleDomAPI_default());
button_index_module_options.insertStyleElement = (insertStyleElement_default());

var button_index_module_update = injectStylesIntoStyleTag_default()(button_index_module/* default */.Z, button_index_module_options);




       /* harmony default export */ const src_button_index_module = (button_index_module/* default */.Z && button_index_module/* default.locals */.Z.locals ? button_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/button/index.js
var button_assign = undefined && undefined.__assign || function () {
  button_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return button_assign.apply(this, arguments);
};

var button_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};








var _Button = (0,react.forwardRef)(function _Button(_a, ref) {
  var children = _a.children,
      className = _a.className,
      elevation = _a.elevation,
      noRipple = _a.noRipple,
      onPointerDown = _a.onPointerDown,
      onPointerUp = _a.onPointerUp,
      variant = _a.variant,
      props = button_rest(_a, ["children", "className", "elevation", "noRipple", "onPointerDown", "onPointerUp", "variant"]);

  variant = variant || 'text';
  var ripple = useRipple({
    onPointerDown: onPointerDown,
    onPointerUp: onPointerUp,
    noRipple: noRipple,
    centered: variant === 'icon'
  });
  return (0,jsx_runtime.jsx)("button", button_assign({
    name: "<Button>"
  }, props, ripple, {
    ref: ref,
    className: clsx_m(className, src_button_index_module.host, getElevationClass(elevation), 'mat-button', src_button_index_module[variant], 'mat-variant-' + variant)
  }, {
    children: children
  }), void 0);
});

var Button = react.memo(_Button);
;// CONCATENATED MODULE: ../../material/dist/src/util/hooks/use-root-class.js


function useRootClass(className) {
  var classes = clsx_m(className);
  (0,react.useEffect)(function () {
    var classArray = classes.split(' ').filter(function (x) {
      return x;
    });

    if (classArray.length) {
      for (var _i = 0, classArray_1 = classArray; _i < classArray_1.length; _i++) {
        var cls = classArray_1[_i];
        HostContainer.ClassList.Add(cls);
      }

      return function () {
        for (var _i = 0, classArray_2 = classArray; _i < classArray_2.length; _i++) {
          var cls = classArray_2[_i];
          HostContainer.ClassList.Remove(cls);
        }
      };
    }
  }, [classes]);
}
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/modal/index.module.scss
var modal_index_module = __webpack_require__(352);
;// CONCATENATED MODULE: ../../material/dist/src/modal/index.module.scss

      
      
      
      
      
      
      
      
      

var modal_index_module_options = {};

modal_index_module_options.styleTagTransform = (styleTagTransform_default());
modal_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      modal_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
modal_index_module_options.domAPI = (styleDomAPI_default());
modal_index_module_options.insertStyleElement = (insertStyleElement_default());

var modal_index_module_update = injectStylesIntoStyleTag_default()(modal_index_module/* default */.Z, modal_index_module_options);




       /* harmony default export */ const src_modal_index_module = (modal_index_module/* default */.Z && modal_index_module/* default.locals */.Z.locals ? modal_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/modal/index.js
var modal_assign = undefined && undefined.__assign || function () {
  modal_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return modal_assign.apply(this, arguments);
};






function Modal(_a) {
  var open = _a.open,
      children = _a.children,
      className = _a.className,
      onClickBackdrop = _a.onClickBackdrop,
      onEscape = _a.onEscape,
      onCloseButton = _a.onCloseButton;
  useRootClass(open && [src_modal_index_module.body, 'mat-modal-open']);
  var portalRef = (0,react.useRef)();
  var initialOpen = (0,react.useRef)(open);
  var openedOnce = (0,react.useRef)(open);

  var click = function click(ev, sender) {
    if (!ev.used) onClickBackdrop === null || onClickBackdrop === void 0 ? void 0 : onClickBackdrop();
  };

  var clickContent = function clickContent(ev, sender) {
    ev.Use();
  };

  var keyup = function keyup(ev) {
    if (ev.key === 'Escape') onEscape === null || onEscape === void 0 ? void 0 : onEscape();
  };

  var onAnimationEnd = function onAnimationEnd(ev) {
    if (ev.AnimationName === src_modal_index_module.closeAnim && portalRef.current) {
      portalRef.current.SetProperty('active', false);
    }
  };

  (0,react.useEffect)(function () {
    openedOnce.current = openedOnce.current || open;
    if (open && portalRef.current) portalRef.current.SetProperty('active', !!open);
  }, [open]);
  return (0,jsx_runtime.jsx)("portal", modal_assign({
    className: clsx_m(src_modal_index_module.host, 'mat-modal', className, open && src_modal_index_module.opened, !open && openedOnce.current && src_modal_index_module.closed),
    onPointerClick: onClickBackdrop ? click : null,
    onKeyDown: onEscape ? keyup : null,
    active: initialOpen.current,
    onAnimationEnd: onAnimationEnd,
    ref: portalRef
  }, {
    children: (0,jsx_runtime.jsxs)("view", modal_assign({
      className: clsx_m(src_modal_index_module.content, 'mat-modal-content'),
      onPointerClick: clickContent
    }, {
      children: [children, onCloseButton && (0,jsx_runtime.jsx)("button", modal_assign({
        className: src_modal_index_module.close,
        onClick: onCloseButton
      }, {
        children: (0,jsx_runtime.jsx)("icon", {
          children: "close"
        }, void 0)
      }), void 0)]
    }), void 0)
  }), void 0);
}
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/alert/index.module.scss
var alert_index_module = __webpack_require__(632);
;// CONCATENATED MODULE: ../../material/dist/src/alert/index.module.scss

      
      
      
      
      
      
      
      
      

var alert_index_module_options = {};

alert_index_module_options.styleTagTransform = (styleTagTransform_default());
alert_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      alert_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
alert_index_module_options.domAPI = (styleDomAPI_default());
alert_index_module_options.insertStyleElement = (insertStyleElement_default());

var alert_index_module_update = injectStylesIntoStyleTag_default()(alert_index_module/* default */.Z, alert_index_module_options);




       /* harmony default export */ const src_alert_index_module = (alert_index_module/* default */.Z && alert_index_module/* default.locals */.Z.locals ? alert_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/alert/index.js
var alert_assign = undefined && undefined.__assign || function () {
  alert_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return alert_assign.apply(this, arguments);
};

var alert_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};






function AlertDialog(_a) {
  var title = _a.title,
      text = _a.text,
      _b = _a.button,
      button = _b === void 0 ? 'Ok' : _b,
      onClose = _a.onClose,
      onClickBackdrop = _a.onClickBackdrop,
      backdropClose = _a.backdropClose,
      props = alert_rest(_a, ["title", "text", "button", "onClose", "onClickBackdrop", "backdropClose"]);

  var clickBackdrop = function clickBackdrop() {
    if (backdropClose) onClose();
    if (onClickBackdrop) onClickBackdrop();
  };

  return (0,jsx_runtime.jsxs)(Modal, alert_assign({}, props, {
    className: clsx_m('mat-alert-dialog', src_alert_index_module.host, props.className),
    onClickBackdrop: clickBackdrop
  }, {
    children: [title && (0,jsx_runtime.jsx)("div", alert_assign({
      className: clsx_m('mat-alert-dialog-title', src_alert_index_module.title)
    }, {
      children: title
    }), void 0), text && (0,jsx_runtime.jsx)("div", alert_assign({
      className: clsx_m('mat-alert-dialog-text', src_alert_index_module.text)
    }, {
      children: text
    }), void 0), button && (0,jsx_runtime.jsx)("div", alert_assign({
      className: clsx_m('mat-alert-dialog-buttons', src_alert_index_module.buttons)
    }, {
      children: (0,jsx_runtime.jsx)(Button, alert_assign({
        className: clsx_m(src_alert_index_module.button),
        onClick: function onClick() {
          return onClose();
        }
      }, {
        children: button
      }), void 0)
    }), void 0)]
  }), void 0);
}
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/card/index.module.scss
var card_index_module = __webpack_require__(705);
;// CONCATENATED MODULE: ../../material/dist/src/card/index.module.scss

      
      
      
      
      
      
      
      
      

var card_index_module_options = {};

card_index_module_options.styleTagTransform = (styleTagTransform_default());
card_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      card_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
card_index_module_options.domAPI = (styleDomAPI_default());
card_index_module_options.insertStyleElement = (insertStyleElement_default());

var card_index_module_update = injectStylesIntoStyleTag_default()(card_index_module/* default */.Z, card_index_module_options);




       /* harmony default export */ const src_card_index_module = (card_index_module/* default */.Z && card_index_module/* default.locals */.Z.locals ? card_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/card/index.js
var card_assign = undefined && undefined.__assign || function () {
  card_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return card_assign.apply(this, arguments);
};

var card_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};







function _Card(_a) {
  var children = _a.children,
      className = _a.className,
      _b = _a.elevation,
      elevation = _b === void 0 ? 1 : _b,
      props = card_rest(_a, ["children", "className", "elevation"]);

  return (0,jsx_runtime.jsx)("view", card_assign({
    name: "<Card>",
    className: clsx_m(className, src_card_index_module.host, getElevationClass(elevation), 'mat-card')
  }, props, {
    children: children
  }), void 0);
}

function card_Content(_a) {
  var className = _a.className,
      props = card_rest(_a, ["className"]);

  return (0,jsx_runtime.jsx)("view", card_assign({
    name: "<Card.Content>",
    className: clsx_m(className, src_card_index_module.content, 'mat-card-content')
  }, props), void 0);
}

var Card = react.memo(_Card);
Card.Content = card_Content;
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/confirm/index.module.scss
var confirm_index_module = __webpack_require__(916);
;// CONCATENATED MODULE: ../../material/dist/src/confirm/index.module.scss

      
      
      
      
      
      
      
      
      

var confirm_index_module_options = {};

confirm_index_module_options.styleTagTransform = (styleTagTransform_default());
confirm_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      confirm_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
confirm_index_module_options.domAPI = (styleDomAPI_default());
confirm_index_module_options.insertStyleElement = (insertStyleElement_default());

var confirm_index_module_update = injectStylesIntoStyleTag_default()(confirm_index_module/* default */.Z, confirm_index_module_options);




       /* harmony default export */ const src_confirm_index_module = (confirm_index_module/* default */.Z && confirm_index_module/* default.locals */.Z.locals ? confirm_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/confirm/index.js
var confirm_assign = undefined && undefined.__assign || function () {
  confirm_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return confirm_assign.apply(this, arguments);
};

var confirm_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};







function ConfirmDialog(_a) {
  var title = _a.title,
      text = _a.text,
      buttons = _a.buttons,
      error = _a.error,
      submitting = _a.submitting,
      yes = _a.yes,
      no = _a.no,
      onClose = _a.onClose,
      backdropClose = _a.backdropClose,
      onClickBackdrop = _a.onClickBackdrop,
      props = confirm_rest(_a, ["title", "text", "buttons", "error", "submitting", "yes", "no", "onClose", "backdropClose", "onClickBackdrop"]);

  buttons = (0,react.useMemo)(function () {
    return buttons !== null && buttons !== void 0 ? buttons : [no == null && {
      value: false,
      text: no || 'No'
    }, yes == null && {
      value: true,
      text: yes || 'Yes'
    }].filter(function (x) {
      return x;
    });
  }, [buttons, yes, no]);

  var clickBackdrop = function clickBackdrop() {
    if (backdropClose) onClose(null);
    if (onClickBackdrop) onClickBackdrop();
  };

  return (0,jsx_runtime.jsxs)(Modal, confirm_assign({}, props, {
    className: clsx_m('mat-confirm-dialog', src_confirm_index_module.host, props.className),
    onClickBackdrop: clickBackdrop
  }, {
    children: [title && (0,jsx_runtime.jsx)("div", confirm_assign({
      className: clsx_m('mat-confirm-dialog-title', src_confirm_index_module.title)
    }, {
      children: title
    }), void 0), text && (0,jsx_runtime.jsx)("div", confirm_assign({
      className: clsx_m('mat-confirm-dialog-text', src_confirm_index_module.text)
    }, {
      children: text
    }), void 0), error && (0,jsx_runtime.jsx)("div", confirm_assign({
      className: clsx_m('mat-modal-dialog-error', src_confirm_index_module.error)
    }, {
      children: error
    }), void 0), (buttons === null || buttons === void 0 ? void 0 : buttons.length) > 0 && (0,jsx_runtime.jsx)("div", confirm_assign({
      className: clsx_m('mat-confirm-dialog-buttons', src_confirm_index_module.buttons)
    }, {
      children: buttons.map(function (btn, ind) {
        return (0,jsx_runtime.jsx)(Button, confirm_assign({
          className: clsx_m(src_confirm_index_module.button),
          onClick: function onClick() {
            return onClose(btn.value);
          },
          "data-temp-disabled": submitting
        }, {
          children: btn.text
        }), ind);
      })
    }), void 0)]
  }), void 0);
}
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/paper/index.module.scss
var paper_index_module = __webpack_require__(628);
;// CONCATENATED MODULE: ../../material/dist/src/paper/index.module.scss

      
      
      
      
      
      
      
      
      

var paper_index_module_options = {};

paper_index_module_options.styleTagTransform = (styleTagTransform_default());
paper_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      paper_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
paper_index_module_options.domAPI = (styleDomAPI_default());
paper_index_module_options.insertStyleElement = (insertStyleElement_default());

var paper_index_module_update = injectStylesIntoStyleTag_default()(paper_index_module/* default */.Z, paper_index_module_options);




       /* harmony default export */ const src_paper_index_module = (paper_index_module/* default */.Z && paper_index_module/* default.locals */.Z.locals ? paper_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/paper/index.js
var paper_assign = undefined && undefined.__assign || function () {
  paper_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return paper_assign.apply(this, arguments);
};

var paper_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};







function _Paper(_a) {
  var children = _a.children,
      className = _a.className,
      elevation = _a.elevation,
      props = paper_rest(_a, ["children", "className", "elevation"]);

  return (0,jsx_runtime.jsx)("view", paper_assign({
    name: "<Paper>",
    className: clsx_m(className, src_paper_index_module.host, getElevationClass(elevation), 'mat-paper')
  }, props, {
    children: children
  }), void 0);
}

var Paper = react.memo(_Paper);
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/input/index.module.scss
var input_index_module = __webpack_require__(998);
;// CONCATENATED MODULE: ../../material/dist/src/input/index.module.scss

      
      
      
      
      
      
      
      
      

var input_index_module_options = {};

input_index_module_options.styleTagTransform = (styleTagTransform_default());
input_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      input_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
input_index_module_options.domAPI = (styleDomAPI_default());
input_index_module_options.insertStyleElement = (insertStyleElement_default());

var input_index_module_update = injectStylesIntoStyleTag_default()(input_index_module/* default */.Z, input_index_module_options);




       /* harmony default export */ const src_input_index_module = (input_index_module/* default */.Z && input_index_module/* default.locals */.Z.locals ? input_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/input/index.js
var input_assign = undefined && undefined.__assign || function () {
  input_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return input_assign.apply(this, arguments);
};

var input_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





var InputField = (0,react.forwardRef)(function InputField(_a, ref) {
  var children = _a.children,
      _b = _a["float"],
      _float = _b === void 0 ? 'auto' : _b,
      placeholder = _a.placeholder,
      className = _a.className,
      _c = _a.variant,
      variant = _c === void 0 ? 'filled' : _c,
      other = input_rest(_a, ["children", "float", "placeholder", "className", "variant"]);

  var hostRef = (0,react.useRef)();
  variant = variant || 'filled';
  var emptyRef = (0,react.useRef)(true);
  (0,react.useImperativeHandle)(ref, function () {
    return {
      setEmpty: function setEmpty(empty) {
        var _a, _b;

        (_a = hostRef.current) === null || _a === void 0 ? void 0 : _a.ClassList.Toggle(src_input_index_module.float, !empty);
        (_b = hostRef.current) === null || _b === void 0 ? void 0 : _b.ClassList.Toggle('float', !empty);
        emptyRef.current = empty;
      }
    };
  }, []);
  return (0,jsx_runtime.jsxs)("view", input_assign({
    name: "<InputField>"
  }, other, {
    ref: hostRef,
    className: clsx_m(src_input_index_module.host, 'mat-input-field', className, src_input_index_module[variant], 'mat-text-field-' + variant, !!placeholder && src_input_index_module.hasPlaceholder, src_input_index_module['float-' + (_float || 'auto')], "float-".concat(_float || 'auto'), !emptyRef.current && [src_input_index_module.float, 'float'])
  }, {
    children: [(0,jsx_runtime.jsx)("view", input_assign({
      className: clsx_m(src_input_index_module.content, 'mat-input-content')
    }, {
      children: children
    }), void 0), variant === 'outlined' && (0,jsx_runtime.jsx)("view", {
      className: clsx_m(src_input_index_module.inputFrame, 'mat-input-frame')
    }, void 0), !!placeholder && (0,jsx_runtime.jsxs)("view", input_assign({
      className: clsx_m(src_input_index_module.placeholder, 'mat-input-placeholder')
    }, {
      children: [(0,jsx_runtime.jsx)("view", input_assign({
        className: clsx_m(src_input_index_module.placeholderGhost, 'mat-input-placeholder-ghost')
      }, {
        children: placeholder
      }), void 0), (0,jsx_runtime.jsx)("view", input_assign({
        className: clsx_m(src_input_index_module.placeholderContent, 'mat-input-placeholder-content')
      }, {
        children: (0,jsx_runtime.jsx)("view", input_assign({
          className: clsx_m(src_input_index_module.placeholderText, 'mat-input-placeholder-text')
        }, {
          children: placeholder
        }), void 0)
      }), void 0)]
    }), void 0)]
  }), void 0);
});
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/text/index.module.scss
var text_index_module = __webpack_require__(686);
;// CONCATENATED MODULE: ../../material/dist/src/text/index.module.scss

      
      
      
      
      
      
      
      
      

var text_index_module_options = {};

text_index_module_options.styleTagTransform = (styleTagTransform_default());
text_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      text_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
text_index_module_options.domAPI = (styleDomAPI_default());
text_index_module_options.insertStyleElement = (insertStyleElement_default());

var text_index_module_update = injectStylesIntoStyleTag_default()(text_index_module/* default */.Z, text_index_module_options);




       /* harmony default export */ const src_text_index_module = (text_index_module/* default */.Z && text_index_module/* default.locals */.Z.locals ? text_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/text/index.js
var text_assign = undefined && undefined.__assign || function () {
  text_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return text_assign.apply(this, arguments);
};

var text_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};







var TextField = (0,react.forwardRef)(function TextField(_a, ref) {
  var _b = _a.placeholder,
      placeholder = _b === void 0 ? '' : _b,
      onSelect = _a.onSelect,
      onChange = _a.onChange,
      onValue = _a.onValue,
      _float = _a["float"],
      selectAllOnFocus = _a.selectAllOnFocus,
      className = _a.className,
      defaultValue = _a.defaultValue,
      contentType = _a.contentType,
      _c = _a.variant,
      variant = _c === void 0 ? 'filled' : _c,
      inputProps = text_rest(_a, ["placeholder", "onSelect", "onChange", "onValue", "float", "selectAllOnFocus", "className", "defaultValue", "contentType", "variant"]);

  var _d = (0,react.useState)(false),
      passwordShown = _d[0],
      setPasswordShown = _d[1];

  variant = variant || 'filled';
  var isPassword = contentType === 'password' || contentType === 'pin';
  var focusHandler = !selectAllOnFocus ? onSelect : function (ev, sender) {
    setTimeout(function () {
      sender.Focus();
    }, 100);
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(ev, sender);
  };
  var realType = isPassword && passwordShown ? 'standard' : contentType;
  var fieldRef = (0,react.useRef)();
  var change = (0,react.useCallback)(function (ev, sender) {
    var _a;

    var val = sender.Value;
    if (onChange && ev) onChange(ev, sender);
    (_a = fieldRef.current) === null || _a === void 0 ? void 0 : _a.setEmpty(!val);
    onValue === null || onValue === void 0 ? void 0 : onValue(val);
  }, [fieldRef, onChange, onValue]);
  return (0,jsx_runtime.jsxs)(InputField, text_assign({
    className: clsx_m(className, src_text_index_module.host, 'mat-text-field', src_text_index_module[variant]),
    variant: variant,
    placeholder: placeholder,
    "float": _float,
    ref: fieldRef,
    name: "<TextField>"
  }, {
    children: [(0,jsx_runtime.jsx)("input", text_assign({
      className: clsx_m(src_text_index_module.input, 'mat-text-input', 'mat-input-field-target'),
      contentType: realType,
      ref: ref,
      placeholder: ' ',
      onSelect: focusHandler,
      onChange: change
    }, inputProps), void 0), isPassword && (0,jsx_runtime.jsx)(Button, text_assign({
      variant: "icon",
      onClick: function onClick() {
        return setPasswordShown(function (st) {
          return !st;
        });
      },
      className: clsx_m(src_text_index_module.passwordToggle, 'mat-text-password-toggle')
    }, {
      children: (0,jsx_runtime.jsx)("icon", {
        children: passwordShown ? 'visibility' : 'visibility_off'
      }, void 0)
    }), void 0)]
  }), void 0);
});
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/prompt/index.module.scss
var prompt_index_module = __webpack_require__(413);
;// CONCATENATED MODULE: ../../material/dist/src/prompt/index.module.scss

      
      
      
      
      
      
      
      
      

var prompt_index_module_options = {};

prompt_index_module_options.styleTagTransform = (styleTagTransform_default());
prompt_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      prompt_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
prompt_index_module_options.domAPI = (styleDomAPI_default());
prompt_index_module_options.insertStyleElement = (insertStyleElement_default());

var prompt_index_module_update = injectStylesIntoStyleTag_default()(prompt_index_module/* default */.Z, prompt_index_module_options);




       /* harmony default export */ const src_prompt_index_module = (prompt_index_module/* default */.Z && prompt_index_module/* default.locals */.Z.locals ? prompt_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/prompt/index.js
var prompt_assign = undefined && undefined.__assign || function () {
  prompt_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return prompt_assign.apply(this, arguments);
};

var prompt_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};








function PromptDialog(_a) {
  var title = _a.title,
      text = _a.text,
      error = _a.error,
      placeholder = _a.placeholder,
      submit = _a.submit,
      submitting = _a.submitting,
      cancel = _a.cancel,
      onClose = _a.onClose,
      open = _a.open,
      className = _a.className,
      backdropClose = _a.backdropClose,
      onClickBackdrop = _a.onClickBackdrop,
      inputProps = prompt_rest(_a, ["title", "text", "error", "placeholder", "submit", "submitting", "cancel", "onClose", "open", "className", "backdropClose", "onClickBackdrop"]);

  var inputRef = (0,react.useRef)();

  var clickBackdrop = function clickBackdrop() {
    if (backdropClose) onClose(null, false);
    if (onClickBackdrop) onClickBackdrop();
  };

  return (0,jsx_runtime.jsxs)(Modal, prompt_assign({
    open: open,
    className: clsx_m('mat-prompt-dialog', src_prompt_index_module.host, className),
    onClickBackdrop: clickBackdrop
  }, {
    children: [title && (0,jsx_runtime.jsx)("div", prompt_assign({
      className: clsx_m('mat-prompt-dialog-title', src_prompt_index_module.title)
    }, {
      children: title
    }), void 0), text && (0,jsx_runtime.jsx)("div", prompt_assign({
      className: clsx_m('mat-prompt-dialog-text', src_prompt_index_module.text)
    }, {
      children: text
    }), void 0), (0,jsx_runtime.jsx)(TextField, prompt_assign({
      className: clsx_m('mat-prompt-dialog-input', src_prompt_index_module.input),
      placeholder: placeholder,
      ref: inputRef
    }, inputProps), void 0), error && (0,jsx_runtime.jsx)("div", prompt_assign({
      className: clsx_m('mat-prompt-dialog-error', src_prompt_index_module.error)
    }, {
      children: error
    }), void 0), (0,jsx_runtime.jsxs)("div", prompt_assign({
      className: clsx_m('mat-prompt-dialog-buttons', src_prompt_index_module.buttons)
    }, {
      children: [(0,jsx_runtime.jsx)(Button, prompt_assign({
        onClick: function onClick() {
          return onClose(inputRef.current.Value, false);
        }
      }, {
        children: cancel || 'Cancel'
      }), void 0), (0,jsx_runtime.jsx)(Button, prompt_assign({
        onClick: function onClick() {
          return onClose(inputRef.current.Value, true);
        },
        "data-temp-disabled": submitting
      }, {
        children: submit || 'Submit'
      }), void 0)]
    }), void 0)]
  }), void 0);
}
;// CONCATENATED MODULE: ../../material/dist/src/util/selection.js
;

var SelectionState =
/** @class */
function () {
  function SelectionState(allowMultiple, initialValue) {
    this.allowMultiple = allowMultiple;
    this.initialValue = initialValue;
    this.elements = [];
    this.value = initialValue || (allowMultiple ? [] : undefined);
    if (this.allowMultiple && !Array.isArray(this.value)) this.value = [this.value];
  }

  SelectionState.prototype.changed = function (sender) {
    if (this.allowMultiple) {
      var all = true;
      var any = false;
      var res = [];

      for (var index = 0; index < this.elements.length; index++) {
        var element = this.elements[index];

        if (element.el.selected) {
          res.push(element.el.value);
          any = true;
        } else all = false;
      }

      this.value = res;
      this.all = all;
      this.any = any;
      return;
    } else {
      this.all = false;
      var firstChecked = sender;

      if (!firstChecked) {
        for (var index = 0; index < this.elements.length; index++) {
          var element = this.elements[index];

          if (element.el.selected) {
            firstChecked = element.el;
            break;
          }
        }
      }

      if (!firstChecked) {
        this.value = undefined;
        this.any = false;
        return;
      }

      if (!firstChecked.selected) firstChecked.selected = true;

      for (var index = 0; index < this.elements.length; index++) {
        var element = this.elements[index];
        if (element.el !== firstChecked) element.el.selected = false;
      }

      this.value = firstChecked.value;
      this.any = true;
    }
  };

  SelectionState.prototype.triggerChange = function () {
    var _a;

    (_a = this.onChange) === null || _a === void 0 ? void 0 : _a.call(this, this.value, this.all, this.any);
  };

  SelectionState.prototype.triggerUpdate = function () {
    var _a;

    (_a = this.onUpdate) === null || _a === void 0 ? void 0 : _a.call(this, this);
  };

  SelectionState.prototype.register = function (el) {
    var _this = this;

    var listener = el.addOnChange(function () {
      _this.changed(el);

      _this.triggerChange();

      _this.triggerUpdate();
    });
    this.elements.push({
      el: el,
      listener: listener
    });
    if (this.allowMultiple && Array.isArray(this.value)) el.selected = this.value.includes(el.value);else el.selected = this.value === el.value;

    if (this.allowMultiple) {
      if (this.all && !el.selected) {
        this.all = false;
        this.triggerChange();
      }

      if (!this.any && el.selected) {
        this.any = true;
        this.triggerChange();
      }
    }

    this.triggerUpdate();
  };

  SelectionState.prototype.unregister = function (el) {
    var ind = this.elements.findIndex(function (x) {
      return x.el === el;
    });

    if (ind >= 0) {
      var item = this.elements[ind];
      this.elements.splice(ind, 1);
      if (item.listener) item.listener();
    }

    this.triggerUpdate();
  };

  SelectionState.prototype.setAll = function (checked) {
    if (!this.allowMultiple && checked) throw new Error('Multiple values cannot be selected for radio groups');
    checked = !!checked;
    this.all = checked;
    this.any = checked;
    var values = [];

    for (var index = 0; index < this.elements.length; index++) {
      var element = this.elements[index];
      element.el.selected = checked;
    }

    this.value = this.allowMultiple ? values : undefined;
    this.all = checked;
    this.any = checked;
    this.triggerChange();
    this.triggerUpdate();
  };

  SelectionState.prototype.getSelectedElements = function () {
    var res = [];

    for (var index = 0; index < this.elements.length; index++) {
      var el = this.elements[index].el;
      var isSelected = this.allowMultiple && Array.isArray(this.value) ? this.value.includes(el.value) : this.value === el.value;
      if (isSelected) res.push(el);
    }

    return res;
  };

  return SelectionState;
}();


// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/toggle/index.module.scss
var toggle_index_module = __webpack_require__(494);
;// CONCATENATED MODULE: ../../material/dist/src/toggle/index.module.scss

      
      
      
      
      
      
      
      
      

var toggle_index_module_options = {};

toggle_index_module_options.styleTagTransform = (styleTagTransform_default());
toggle_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      toggle_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
toggle_index_module_options.domAPI = (styleDomAPI_default());
toggle_index_module_options.insertStyleElement = (insertStyleElement_default());

var toggle_index_module_update = injectStylesIntoStyleTag_default()(toggle_index_module/* default */.Z, toggle_index_module_options);




       /* harmony default export */ const src_toggle_index_module = (toggle_index_module/* default */.Z && toggle_index_module/* default.locals */.Z.locals ? toggle_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/toggle/index.js
var toggle_assign = undefined && undefined.__assign || function () {
  toggle_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return toggle_assign.apply(this, arguments);
};

var toggle_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};








var _Toggle = react.forwardRef(function _Toggle(_a, ref) {
  var children = _a.children,
      className = _a.className,
      noRipple = _a.noRipple,
      onPointerDown = _a.onPointerDown,
      onPointerUp = _a.onPointerUp,
      type = _a.type,
      variant = _a.variant,
      independent = _a.independent,
      props = toggle_rest(_a, ["children", "className", "noRipple", "onPointerDown", "onPointerUp", "type", "variant", "independent"]);

  var toggleRef = (0,react.useRef)();
  var ringRef = (0,react.useRef)();
  var ripple = useRipple({
    onPointerDown: onPointerDown,
    onPointerUp: onPointerUp,
    noRipple: noRipple,
    centered: true,
    target: ringRef
  });
  var ctx = (0,react.useContext)(ToggleGroupContext);
  if (independent) ctx = null;
  type = type || (ctx && !ctx.allowMultiple ? 'radio' : 'checkbox');
  var selectionRef = (0,react.useMemo)(function () {
    return {
      get selected() {
        return toggleRef.current.Checked;
      },

      set selected(val) {
        toggleRef.current.Checked = val;
      },

      get value() {
        return toggleRef.current.Value;
      },

      addOnChange: function addOnChange(callback) {
        return UnityBridge.addEventListener(toggleRef.current, 'onChange', function () {
          callback === null || callback === void 0 ? void 0 : callback();
        });
      }
    };
  }, []);
  var innerRef = (0,react.useCallback)(function (val) {
    toggleRef.current = val;
    if (typeof ref === 'function') ref(val);else if (ref) ref.current = val;

    if (ctx) {
      if (val) ctx.register(selectionRef);else ctx.unregister(selectionRef);
    }
  }, [ctx, ref, selectionRef]);
  var NativeToggle = 'toggle';
  return (0,jsx_runtime.jsxs)("label", toggle_assign({
    className: clsx_m(className, src_toggle_index_module.label, 'mat-toggle-label', src_toggle_index_module[type], 'mat-toggle-' + type, 'mat-variant-' + variant)
  }, ripple, {
    children: [(0,jsx_runtime.jsx)(NativeToggle, toggle_assign({
      name: "<Toggle>",
      ref: innerRef
    }, ripple, {
      className: clsx_m(src_toggle_index_module.toggle, 'mat-toggle')
    }, props, {
      children: (0,jsx_runtime.jsx)("view", {
        className: clsx_m(src_toggle_index_module.ring, 'mat-toggle-ring'),
        ref: ringRef
      }, void 0)
    }), void 0), !!children && (0,jsx_runtime.jsx)("view", toggle_assign({
      className: clsx_m(src_toggle_index_module.labelContent, 'mat-toggle-label-content')
    }, {
      children: children
    }), void 0)]
  }), void 0);
});

var Toggle = react.memo(_Toggle);
var ToggleGroupContext = react.createContext(null);

var _ToggleGroup = react.forwardRef(function _ToggleGroup(_a, ref) {
  var children = _a.children,
      multiple = _a.multiple,
      showSelectAll = _a.showSelectAll,
      selectAllLabel = _a.selectAllLabel,
      onChange = _a.onChange,
      initialValue = _a.initialValue;
  var init = (0,react.useRef)(initialValue);
  var selectAllRef = (0,react.useRef)();
  var state = (0,react.useMemo)(function () {
    return new SelectionState(multiple, init.current);
  }, [multiple, init]);
  state.onChange = (0,react.useCallback)(function (val, all, any) {
    onChange === null || onChange === void 0 ? void 0 : onChange(val, all, any);

    if (selectAllRef.current) {
      selectAllRef.current.Indeterminate = !!any && !all;
      selectAllRef.current.Checked = !!all;
    }
  }, [onChange]);
  var selectAllCallback = (0,react.useCallback)(function (checked, sender) {
    state.setAll(checked);
  }, [state]);
  (0,react.useImperativeHandle)(ref, function () {
    return state;
  }, [state]);
  return (0,jsx_runtime.jsx)(ToggleGroupContext.Provider, toggle_assign({
    value: state
  }, {
    children: (0,jsx_runtime.jsxs)("view", toggle_assign({
      name: "<ToggleGroup>",
      className: clsx_m('mat-toggle-group')
    }, {
      children: [!!(multiple && showSelectAll) && (0,jsx_runtime.jsx)(Toggle, toggle_assign({
        ref: selectAllRef,
        independent: true,
        onChange: selectAllCallback,
        className: clsx_m('mat-toggle-select-all', src_toggle_index_module.selectAllToggle)
      }, {
        children: selectAllLabel || 'Select All'
      }), void 0), children]
    }), void 0)
  }), void 0);
});

var ToggleGroup = react.memo(_ToggleGroup);
;// CONCATENATED MODULE: ../../material/dist/src/util/hooks/use-auto-ref.js

function useAutoRef(val) {
  var ref = (0,react.useRef)(val);
  ref.current = val;
  return ref;
}
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/select/index.module.scss
var select_index_module = __webpack_require__(627);
;// CONCATENATED MODULE: ../../material/dist/src/select/index.module.scss

      
      
      
      
      
      
      
      
      

var select_index_module_options = {};

select_index_module_options.styleTagTransform = (styleTagTransform_default());
select_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      select_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
select_index_module_options.domAPI = (styleDomAPI_default());
select_index_module_options.insertStyleElement = (insertStyleElement_default());

var select_index_module_update = injectStylesIntoStyleTag_default()(select_index_module/* default */.Z, select_index_module_options);




       /* harmony default export */ const src_select_index_module = (select_index_module/* default */.Z && select_index_module/* default.locals */.Z.locals ? select_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/select/index.js
var select_assign = undefined && undefined.__assign || function () {
  select_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return select_assign.apply(this, arguments);
};

var select_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};












var SelectContext = react.createContext(null);

function _Select(_a) {
  var _b = _a.keepOpen,
      keepOpen = _b === void 0 ? 'auto' : _b,
      onChange = _a.onChange,
      name = _a.name,
      children = _a.children,
      initialValue = _a.initialValue,
      multiple = _a.multiple,
      separator = _a.separator,
      chips = _a.chips,
      variant = _a.variant,
      placeholder = _a.placeholder,
      _float = _a["float"],
      className = _a.className,
      hideCaret = _a.hideCaret,
      otherProps = select_rest(_a, ["keepOpen", "onChange", "name", "children", "initialValue", "multiple", "separator", "chips", "variant", "placeholder", "float", "className", "hideCaret"]);

  var init = (0,react.useRef)(initialValue);
  var selectAllRef = (0,react.useRef)();
  var fieldRef = (0,react.useRef)();
  var shouldKeepOpen = keepOpen === 'auto' ? multiple : !!keepOpen;
  var state = (0,react.useMemo)(function () {
    return new SelectionState(!!multiple, init.current);
  }, [multiple, init]);
  state.onChange = (0,react.useCallback)(function (val, all, any) {
    var _a;

    onChange === null || onChange === void 0 ? void 0 : onChange(val, all, any);

    if (selectAllRef.current) {
      selectAllRef.current.Indeterminate = !!any && !all;
      selectAllRef.current.Checked = !!all;
    }

    if (!shouldKeepOpen) {
      setOpened(false);
    }

    (_a = fieldRef.current) === null || _a === void 0 ? void 0 : _a.setEmpty(!any);
  }, [onChange, shouldKeepOpen]);

  var _c = (0,react.useState)(state.getSelectedElements()),
      selectedElements = _c[0],
      setSelectedElements = _c[1];

  state.onUpdate = (0,react.useCallback)(function (st) {
    setSelectedElements(st.getSelectedElements());
  }, []);

  var _d = (0,react.useState)(false),
      opened = _d[0],
      setOpened = _d[1];

  var toggle = (0,react.useCallback)(function () {
    return setOpened(function (st) {
      return !st;
    });
  }, [setOpened]);
  var close = (0,react.useCallback)(function () {
    return setOpened(false);
  }, [setOpened]);

  if (typeof separator === 'undefined' && !chips) {
    separator = (0,jsx_runtime.jsx)("text", select_assign({
      className: src_select_index_module.defaultSeparator
    }, {
      children: ","
    }), void 0);
  }

  var setFieldRef = (0,react.useCallback)(function (val) {
    var _a;

    fieldRef.current = val;
    (_a = fieldRef.current) === null || _a === void 0 ? void 0 : _a.setEmpty(multiple ? init.current.length === 0 : typeof init.current === 'undefined');
  }, [multiple]);
  return (0,jsx_runtime.jsxs)(InputField, select_assign({
    className: clsx_m(className, src_select_index_module.host, 'mat-select-field', src_select_index_module[variant], chips && src_select_index_module.chips, opened && [src_select_index_module.opened, 'mat-select-opened']),
    variant: variant,
    placeholder: placeholder,
    "float": _float,
    name: name || '<SelectField>',
    ref: setFieldRef
  }, {
    children: [(0,jsx_runtime.jsxs)("button", select_assign({
      name: "<Select>",
      onClick: toggle,
      className: clsx_m(src_select_index_module.trigger, 'mat-input-field-target')
    }, otherProps, {
      children: [(0,jsx_runtime.jsx)("view", select_assign({
        className: src_select_index_module.triggerContent
      }, {
        children: selectedElements.map(function (x, i) {
          return (0,jsx_runtime.jsxs)(react.Fragment, {
            children: [i > 0 && separator, (0,jsx_runtime.jsx)("view", select_assign({
              className: src_select_index_module.triggerPart
            }, {
              children: x.getTemplate()
            }), void 0)]
          }, i);
        })
      }), void 0), (0,jsx_runtime.jsxs)("view", select_assign({
        className: clsx_m(src_select_index_module.menuRoot, opened && src_select_index_module.opened)
      }, {
        children: [(0,jsx_runtime.jsx)("button", {
          name: "<SelectBackdrop>",
          onClick: close,
          className: clsx_m(src_select_index_module.backdrop)
        }, void 0), (0,jsx_runtime.jsx)(SelectContext.Provider, select_assign({
          value: state
        }, {
          children: (0,jsx_runtime.jsx)("scroll", select_assign({
            name: "<SelectMenu>",
            className: clsx_m(src_select_index_module.menu, getElevationClass(4))
          }, {
            children: children
          }), void 0)
        }), void 0)]
      }), void 0)]
    }), void 0), !hideCaret && (0,jsx_runtime.jsx)("icon", select_assign({
      className: clsx_m(src_select_index_module.caret, 'mat-select-caret')
    }, {
      children: 'keyboard_arrow_down'
    }), void 0)]
  }), void 0);
}

function _Option(_a) {
  var className = _a.className,
      children = _a.children,
      value = _a.value,
      triggerTemplate = _a.triggerTemplate,
      _b = _a.showToggle,
      showToggle = _b === void 0 ? 'auto' : _b;
  var ctx = (0,react.useContext)(SelectContext);

  var _c = (0,react.useState)(false),
      selected = _c[0],
      setSelected = _c[1];

  var selectedRef = useAutoRef(selected);
  var onChangeRef = (0,react.useRef)([]);
  var getTemplateRef = (0,react.useRef)(function () {
    return triggerTemplate !== null && triggerTemplate !== void 0 ? triggerTemplate : children;
  });
  var childRef = (0,react.useRef)(children);
  var shouldShowToggle = showToggle === 'auto' ? ctx.allowMultiple : !!showToggle;
  (0,react.useEffect)(function () {
    childRef.current = children;
  }, [children]);
  (0,react.useEffect)(function () {
    getTemplateRef.current = function () {
      return triggerTemplate !== null && triggerTemplate !== void 0 ? triggerTemplate : childRef.current;
    };

    ctx.triggerUpdate();
  }, [triggerTemplate, ctx]);
  var selectionRef = react.useMemo(function () {
    return {
      get selected() {
        return selectedRef.current;
      },

      set selected(val) {
        setSelected(val);
      },

      value: value,
      addOnChange: function addOnChange(callback) {
        if (!callback) return;
        onChangeRef.current.push(callback);
        return function () {
          var ind = onChangeRef.current.indexOf(callback);
          if (ind >= 0) onChangeRef.current.splice(ind, 1);
        };
      },
      getTemplate: function getTemplate() {
        return getTemplateRef.current();
      }
    };
  }, [value, setSelected, selectedRef]);
  (0,react.useEffect)(function () {
    if (ctx) {
      ctx.register(selectionRef);
      return function () {
        ctx.unregister(selectionRef);
      };
    }
  }, [ctx, selectionRef]);
  var onClick = (0,react.useCallback)(function () {
    setSelected(function (x) {
      return !x;
    });

    for (var index = 0; index < onChangeRef.current.length; index++) {
      var cb = onChangeRef.current[index];
      cb();
    }
  }, [setSelected]);
  return (0,jsx_runtime.jsxs)(Button, select_assign({
    onClick: onClick,
    variant: "text",
    className: clsx_m(src_select_index_module.option, 'mat-select-option', selected && ['mat-select-option-selected', src_select_index_module.selected], className)
  }, {
    children: [shouldShowToggle && (0,jsx_runtime.jsx)(Toggle, {
      className: clsx_m(src_select_index_module.toggle, 'mat-select-option-toggle'),
      type: ctx.allowMultiple ? 'checkbox' : 'radio',
      checked: selected,
      independent: true
    }, void 0), children]
  }), void 0);
}

var Select = react.memo(_Select);
Select.Option = _Option;
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/slider/index.module.scss
var slider_index_module = __webpack_require__(13);
;// CONCATENATED MODULE: ../../material/dist/src/slider/index.module.scss

      
      
      
      
      
      
      
      
      

var slider_index_module_options = {};

slider_index_module_options.styleTagTransform = (styleTagTransform_default());
slider_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      slider_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
slider_index_module_options.domAPI = (styleDomAPI_default());
slider_index_module_options.insertStyleElement = (insertStyleElement_default());

var slider_index_module_update = injectStylesIntoStyleTag_default()(slider_index_module/* default */.Z, slider_index_module_options);




       /* harmony default export */ const src_slider_index_module = (slider_index_module/* default */.Z && slider_index_module/* default.locals */.Z.locals ? slider_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/slider/index.js
var slider_assign = undefined && undefined.__assign || function () {
  slider_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return slider_assign.apply(this, arguments);
};

var slider_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





var SliderChild = (0,react.forwardRef)(function _SliderChild(_a, ref) {
  var callback = _a.callback,
      initialValue = _a.initialValue;

  var _b = (0,react.useState)(initialValue),
      st = _b[0],
      setSt = _b[1];

  (0,react.useImperativeHandle)(ref, function () {
    return setSt;
  });
  return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: callback(st)
  }, void 0);
});

function _Slider(_a) {
  var _b;

  var _c;

  var onChange = _a.onChange,
      onScroll = _a.onScroll,
      name = _a.name,
      children = _a.children,
      initialValue = _a.initialValue,
      value = _a.value,
      _d = _a.direction,
      direction = _d === void 0 ? 'horizontal' : _d,
      _e = _a.mode,
      mode = _e === void 0 ? 'normal' : _e,
      _f = _a.min,
      min = _f === void 0 ? 0 : _f,
      _g = _a.max,
      max = _g === void 0 ? 1 : _g,
      _h = _a.step,
      step = _h === void 0 ? 0 : _h,
      _j = _a.keyStep,
      keyStep = _j === void 0 ? null : _j,
      _k = _a.allowScroll,
      allowScroll = _k === void 0 ? false : _k,
      _l = _a.scrollMultiplier,
      scrollMultiplier = _l === void 0 ? 1 / 6 : _l,
      otherProps = slider_rest(_a, ["onChange", "onScroll", "name", "children", "initialValue", "value", "direction", "mode", "min", "max", "step", "keyStep", "allowScroll", "scrollMultiplier"]);

  var curValue = (0,react.useRef)((_c = initialValue !== null && initialValue !== void 0 ? initialValue : value) !== null && _c !== void 0 ? _c : min);
  var innerValue = (0,react.useRef)(curValue.current);
  var orientation = direction === 'vertical' || direction === 'vertical-reverse' ? 'vertical' : 'horizontal';
  var isReverse = direction === 'vertical-reverse' || direction === 'horizontal-reverse';
  var sizeProp = orientation === 'horizontal' ? 'width' : 'height';
  var coordProp = orientation === 'horizontal' ? 'x' : 'y';
  var crossCoordProp = orientation === 'horizontal' ? 'y' : 'x';
  var range = max - min;
  var ref = (0,react.useRef)();
  var fillRef = (0,react.useRef)();
  var childRef = (0,react.useRef)();
  var moveStep = keyStep || step || range / 10;
  var setValWithStep = (0,react.useCallback)(function (val) {
    var _a;

    val = Math.max(min, Math.min(max, val));
    innerValue.current = val;
    if (step > 0) val = Math.round(val / step) * step;
    curValue.current = val;

    if (fillRef.current) {
      var ratio = (curValue.current - min) / range;
      fillRef.current.Style.Set(sizeProp === 'width' ? 'height' : 'width', null);
      fillRef.current.Style.Set(sizeProp, ratio * 100 + '%');
    }

    (_a = childRef.current) === null || _a === void 0 ? void 0 : _a.call(childRef, val);
  }, [min, max, step, sizeProp, range]);
  var dragCallback = (0,react.useCallback)(function (ev) {
    var mul = isReverse ? -1 : 1;
    var val = innerValue.current;

    if (mode === 'diff' || mode === 'falloff') {
      var diff = ev.delta[coordProp] / 200 * range;

      if (mode === 'falloff') {
        var yDiff = Math.max(Math.abs(ev.pressPosition[crossCoordProp] - ev.position[crossCoordProp]) / 100, 1);
        val += mul * diff / (yDiff * yDiff);
      } else val += mul * diff;
    } else {
      var relPos = ref.current.GetRelativePosition(ev.position.x, ev.position.y);
      var relRatio = relPos[coordProp] / ref.current.RectTransform.rect[sizeProp];
      if (coordProp === 'x' && isReverse || coordProp === 'y' && !isReverse) relRatio = 1 - relRatio;
      val = relRatio * range + min;
    }

    setValWithStep(val);
  }, [innerValue, setValWithStep, mode, coordProp, crossCoordProp, sizeProp, isReverse, range, min]);
  var moveCallback = (0,react.useCallback)(function (ev) {
    var diff = ev.moveVector[coordProp] * moveStep;
    if (isReverse) diff = -diff;
    setValWithStep(curValue.current + diff);
  }, [coordProp, moveStep, isReverse, setValWithStep]);
  var scrollCallback = (0,react.useCallback)(function (ev, sender) {
    if (allowScroll) {
      var delta = Math.abs(ev.scrollDelta.y) > Math.abs(ev.scrollDelta.x) ? ev.scrollDelta.y : ev.scrollDelta.x;
      var diff = delta * moveStep * scrollMultiplier;
      if (isReverse) diff = -diff;
      setValWithStep(curValue.current + diff);
    }

    onScroll === null || onScroll === void 0 ? void 0 : onScroll(ev, sender);
  }, [moveStep, isReverse, setValWithStep, onScroll, allowScroll, scrollMultiplier]);
  return (0,jsx_runtime.jsx)("view", slider_assign({
    name: name || '<Slider>'
  }, otherProps, {
    ref: ref,
    "data-direction": direction,
    "data-orientation": orientation,
    onDrag: dragCallback,
    onPointerClick: dragCallback,
    onPotentialDrag: dragCallback,
    onMove: moveCallback,
    onScroll: scrollCallback,
    className: clsx_m(src_slider_index_module.host, otherProps.className, 'mat-slider')
  }, {
    children: (0,jsx_runtime.jsx)("view", slider_assign({
      name: "<Slider-Track>",
      className: clsx_m(src_slider_index_module.track, 'mat-slider-track')
    }, {
      children: (0,jsx_runtime.jsx)("view", slider_assign({
        name: "<Slider-Fill>",
        className: clsx_m(src_slider_index_module.fill, 'mat-slider-fill'),
        ref: fillRef,
        style: (_b = {}, _b[sizeProp] = (curValue.current - min) / range, _b)
      }, {
        children: (0,jsx_runtime.jsx)("view", slider_assign({
          name: "<Slider-Thumb-Container>",
          className: clsx_m(src_slider_index_module.thumbContainer, 'mat-slider-thumb-container')
        }, {
          children: (0,jsx_runtime.jsx)("view", slider_assign({
            name: "<Slider-Thumb>",
            className: clsx_m(src_slider_index_module.thumb, 'mat-slider-thumb')
          }, {
            children: typeof children === 'function' ? (0,jsx_runtime.jsx)(SliderChild, {
              initialValue: curValue.current,
              callback: children,
              ref: childRef
            }, void 0) : children
          }), void 0)
        }), void 0)
      }), void 0)
    }), void 0)
  }), void 0);
}

var Slider = react.memo(_Slider);
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[5].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[5].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[5].use[3]!../../material/dist/src/styles/globals.scss
var globals = __webpack_require__(198);
;// CONCATENATED MODULE: ../../material/dist/src/styles/globals.scss

      
      
      
      
      
      
      
      
      

var globals_options = {};

globals_options.styleTagTransform = (styleTagTransform_default());
globals_options.setAttributes = (setAttributesWithoutAttributes_default());

      globals_options.insert = insertBySelector_default().bind(null, "head");
    
globals_options.domAPI = (styleDomAPI_default());
globals_options.insertStyleElement = (insertStyleElement_default());

var globals_update = injectStylesIntoStyleTag_default()(globals/* default */.Z, globals_options);




       /* harmony default export */ const styles_globals = (globals/* default */.Z && globals/* default.locals */.Z.locals ? globals/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/styles/index.js

// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../material/dist/src/tooltip/index.module.scss
var tooltip_index_module = __webpack_require__(3);
;// CONCATENATED MODULE: ../../material/dist/src/tooltip/index.module.scss

      
      
      
      
      
      
      
      
      

var tooltip_index_module_options = {};

tooltip_index_module_options.styleTagTransform = (styleTagTransform_default());
tooltip_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      tooltip_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
tooltip_index_module_options.domAPI = (styleDomAPI_default());
tooltip_index_module_options.insertStyleElement = (insertStyleElement_default());

var tooltip_index_module_update = injectStylesIntoStyleTag_default()(tooltip_index_module/* default */.Z, tooltip_index_module_options);




       /* harmony default export */ const src_tooltip_index_module = (tooltip_index_module/* default */.Z && tooltip_index_module/* default.locals */.Z.locals ? tooltip_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../material/dist/src/tooltip/index.js





var positions = {
  left: {
    anchor: 'left',
    pivot: 'right'
  },
  right: {
    anchor: 'right',
    pivot: 'left'
  },
  top: {
    anchor: 'top',
    pivot: 'bottom'
  },
  bottom: {
    anchor: 'bottom',
    pivot: 'top'
  },
  center: {
    anchor: 'center',
    pivot: 'center'
  }
};

function addTooltip(target, props, withBackdrop, hide) {
  target = props.target ? props.target.current : target;
  if (!target) return null;
  var anchor = UnityBridge.createElement('view', '', HostContainer);
  anchor.ClassName = clsx_m(src_tooltip_index_module.anchor, 'mat-tooltip-anchor', props.interactive && src_tooltip_index_module.interactive);
  anchor.Name = '<TooltipAnchor>';
  var tooltip = UnityBridge.createElement('view', '', HostContainer);
  tooltip.ClassName = clsx_m(src_tooltip_index_module.tooltip, 'mat-tooltip', props.className);
  tooltip.Name = '<Tooltip>';
  var pos = positions[props.position];
  anchor.Style.Set('translate', props.anchor || (pos === null || pos === void 0 ? void 0 : pos.anchor) || 'bottom');
  anchor.Style.Set('inset', -(props.offset || 5));
  var pivot = Interop.ReactUnity.Converters.AllConverters.YogaValue2Converter.Convert(props.pivot || (pos === null || pos === void 0 ? void 0 : pos.pivot) || 'top');
  var realPivot = pivot.GetType().ToString() === 'ReactUnity.Types.YogaValue2' ? pivot : Interop.ReactUnity.Types.YogaValue2.Center;
  tooltip.Style.Set('translate', realPivot.Negate());
  UnityBridge.appendChild(target, anchor);

  if (withBackdrop) {
    var backdrop = UnityBridge.createElement('portal', '', HostContainer);
    backdrop.ClassName = clsx_m(src_tooltip_index_module.backdrop, 'mat-tooltip-backdrop');
    backdrop.Name = '<TooltipBackdrop>';
    UnityBridge.addEventListener(backdrop, 'onPointerClick', hide);
    UnityBridge.appendChild(anchor, backdrop);
  }

  UnityBridge.appendChild(anchor, tooltip);
  Renderer.render(props.content, tooltip, true);
  return anchor;
}

function useTooltip(props, trigger) {
  if (trigger === void 0) {
    trigger = 'hover';
  }

  var tooltipRef = (0,react.useRef)();
  var callbacksRef = (0,react.useRef)([]);
  var elementsRef = (0,react.useRef)([]);
  var propsRef = useAutoRef(props);
  var clearAll = (0,react.useCallback)(function () {
    var callbacks = callbacksRef.current;

    for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
      var cb = callbacks_1[_i];
      cb === null || cb === void 0 ? void 0 : cb();
    }
  }, []);
  var hide = (0,react.useCallback)(function () {
    var _a;

    (_a = tooltipRef.current) === null || _a === void 0 ? void 0 : _a.Remove();
    tooltipRef.current = null;
  }, []);
  var show = (0,react.useCallback)(function (target, properties, withBackdrop) {
    var _a;

    if (withBackdrop === void 0) {
      withBackdrop = false;
    }

    (_a = tooltipRef.current) === null || _a === void 0 ? void 0 : _a.Remove();
    return tooltipRef.current = addTooltip(target, properties, withBackdrop, hide);
  }, [hide]);
  var showWithCurrent = (0,react.useCallback)(function (ev, sender) {
    var calculatedProps = typeof propsRef.current === 'function' ? propsRef.current(sender) : propsRef.current;
    show(sender, calculatedProps, trigger === 'click');
  }, [show, trigger, propsRef]);
  var register = (0,react.useCallback)(function (el) {
    if (!el) return;
    elementsRef.current.push(el);
    var callbacks = callbacksRef.current;

    if (trigger === 'click') {
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerClick', showWithCurrent));
    } else if (trigger === 'press') {
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerDown', showWithCurrent));
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerUp', hide));
    } else {
      // hover
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerEnter', showWithCurrent));
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerExit', hide));
    }
  }, [trigger, showWithCurrent, hide]);
  return {
    register: register,
    show: show,
    hide: hide,
    clearAll: clearAll
  };
}
function useDataTooltip(trigger) {
  if (trigger === void 0) {
    trigger = 'hover';
  }

  var props = function props(el) {
    return propsProxy(el.Data);
  };

  return useTooltip(props, trigger);
}

function propsProxy(data) {
  return new Proxy(data, {
    get: function get(tg, prop) {
      if (typeof prop === 'symbol') return data[prop];
      return data['tooltip-' + prop];
    }
  });
}
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/pages/material/index.module.scss
var material_index_module = __webpack_require__(624);
;// CONCATENATED MODULE: ./src/pages/material/index.module.scss

      
      
      
      
      
      
      
      
      

var material_index_module_options = {};

material_index_module_options.styleTagTransform = (styleTagTransform_default());
material_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      material_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
material_index_module_options.domAPI = (styleDomAPI_default());
material_index_module_options.insertStyleElement = (insertStyleElement_default());

var material_index_module_update = injectStylesIntoStyleTag_default()(material_index_module/* default */.Z, material_index_module_options);




       /* harmony default export */ const pages_material_index_module = (material_index_module/* default */.Z && material_index_module/* default.locals */.Z.locals ? material_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../node_modules/memoize-one/dist/memoize-one.esm.js
var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === 'number' && value !== value;
};

function isEqual(first, second) {
  if (first === second) {
    return true;
  }

  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }

  return false;
}

function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }

  return true;
}

function memoizeOne(resultFn, isEqual) {
  if (isEqual === void 0) {
    isEqual = areInputsEqual;
  }

  var cache = null;

  function memoized() {
    var newArgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }

    if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
      return cache.lastResult;
    }

    var lastResult = resultFn.apply(this, newArgs);
    cache = {
      lastResult: lastResult,
      lastArgs: newArgs,
      lastThis: this
    };
    return lastResult;
  }

  memoized.clear = function clear() {
    cache = null;
  };

  return memoized;
}


;// CONCATENATED MODULE: ../../material/dist/src/virtual-scroll/domHelpers.js
function getScrollbarSize(el) {
  return {
    verticalWidth: el.VerticalScrollbar.Thumb.ClientWidth,
    horizontalHeight: el.HorizontalScrollbar.Thumb.ClientHeight
  };
}
function getRTLOffsetType() {
  return 'positive-ascending';
}
;// CONCATENATED MODULE: ../../material/dist/src/virtual-scroll/timer.js
function cancelTimeout(timeoutID) {
  clearTimeout(timeoutID.id);
}
function requestTimeout(callback, delay) {
  return {
    id: setTimeout(callback, delay)
  };
}
;// CONCATENATED MODULE: ../../material/dist/src/virtual-scroll/createGridComponent.js
var createGridComponent_extends = undefined && undefined.__extends || function () {
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

var createGridComponent_assign = undefined && undefined.__assign || function () {
  createGridComponent_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return createGridComponent_assign.apply(this, arguments);
};

var createGridComponent_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





var IS_SCROLLING_DEBOUNCE_INTERVAL = 150;

var defaultItemKey = function defaultItemKey(_a) {
  var columnIndex = _a.columnIndex,
      data = _a.data,
      rowIndex = _a.rowIndex;
  return "".concat(rowIndex, ":").concat(columnIndex);
};

function createGridComponent(_a) {
  var _b;

  var getColumnOffset = _a.getColumnOffset,
      getColumnStartIndexForOffset = _a.getColumnStartIndexForOffset,
      getColumnStopIndexForStartIndex = _a.getColumnStopIndexForStartIndex,
      getColumnWidth = _a.getColumnWidth,
      getEstimatedTotalHeight = _a.getEstimatedTotalHeight,
      getEstimatedTotalWidth = _a.getEstimatedTotalWidth,
      getOffsetForColumnAndAlignment = _a.getOffsetForColumnAndAlignment,
      getOffsetForRowAndAlignment = _a.getOffsetForRowAndAlignment,
      getRowHeight = _a.getRowHeight,
      getRowOffset = _a.getRowOffset,
      getRowStartIndexForOffset = _a.getRowStartIndexForOffset,
      getRowStopIndexForStartIndex = _a.getRowStopIndexForStartIndex,
      initInstanceProps = _a.initInstanceProps,
      shouldResetStyleCacheOnItemSizeChange = _a.shouldResetStyleCacheOnItemSizeChange,
      validateProps = _a.validateProps;
  return _b =
  /** @class */
  function (_super) {
    createGridComponent_extends(Grid, _super); // Always use explicit constructor for React components.
    // It produces less code after transpilation. (#26)
    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-useless-constructor


    function Grid(props) {
      var _this = _super.call(this, props) || this;

      _this._instanceProps = initInstanceProps(_this.props, _this);
      _this._resetIsScrollingTimeoutId = null;
      _this.state = {
        instance: _this,
        isScrolling: false,
        horizontalScrollDirection: 'forward',
        scrollLeft: typeof _this.props.initialScrollLeft === 'number' ? _this.props.initialScrollLeft : 0,
        scrollTop: typeof _this.props.initialScrollTop === 'number' ? _this.props.initialScrollTop : 0,
        scrollUpdateWasRequested: false,
        verticalScrollDirection: 'forward'
      };
      _this._callOnItemsRendered = memoizeOne(function (overscanColumnStartIndex, overscanColumnStopIndex, overscanRowStartIndex, overscanRowStopIndex, visibleColumnStartIndex, visibleColumnStopIndex, visibleRowStartIndex, visibleRowStopIndex) {
        return _this.props.onItemsRendered({
          overscanColumnStartIndex: overscanColumnStartIndex,
          overscanColumnStopIndex: overscanColumnStopIndex,
          overscanRowStartIndex: overscanRowStartIndex,
          overscanRowStopIndex: overscanRowStopIndex,
          visibleColumnStartIndex: visibleColumnStartIndex,
          visibleColumnStopIndex: visibleColumnStopIndex,
          visibleRowStartIndex: visibleRowStartIndex,
          visibleRowStopIndex: visibleRowStopIndex
        });
      });
      _this._callOnScroll = memoizeOne(function (scrollLeft, scrollTop, horizontalScrollDirection, verticalScrollDirection, scrollUpdateWasRequested) {
        return _this.props.onScroll({
          horizontalScrollDirection: horizontalScrollDirection,
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          verticalScrollDirection: verticalScrollDirection,
          scrollUpdateWasRequested: scrollUpdateWasRequested
        });
      }); // Lazily create and cache item styles while scrolling,
      // So that pure component sCU will prevent re-renders.
      // We maintain this cache, and pass a style prop rather than index,
      // So that List can clear cached styles and force item re-render if necessary.

      _this._getItemStyle = function (rowIndex, columnIndex) {
        var _a = _this.props,
            columnWidth = _a.columnWidth,
            direction = _a.direction,
            rowHeight = _a.rowHeight;

        var itemStyleCache = _this._getItemStyleCache(shouldResetStyleCacheOnItemSizeChange && columnWidth, shouldResetStyleCacheOnItemSizeChange && direction, shouldResetStyleCacheOnItemSizeChange && rowHeight);

        var key = "".concat(rowIndex, ":").concat(columnIndex);
        var style;

        if (itemStyleCache.hasOwnProperty(key)) {
          style = itemStyleCache[key];
        } else {
          var offset = getColumnOffset(_this.props, columnIndex, _this._instanceProps);
          var isRtl = direction === 'rtl';
          itemStyleCache[key] = style = {
            position: 'absolute',
            left: isRtl ? undefined : offset,
            right: isRtl ? offset : undefined,
            top: getRowOffset(_this.props, rowIndex, _this._instanceProps),
            height: getRowHeight(_this.props, rowIndex, _this._instanceProps),
            width: getColumnWidth(_this.props, columnIndex, _this._instanceProps)
          };
        }

        return style;
      };

      _this._getItemStyleCache = memoizeOne(function (_, __, ___) {
        return {};
      });

      _this._onScroll = function (event, sender) {
        var clientHeight = sender.ClientHeight;
        var clientWidth = sender.ClientWidth;
        var scrollLeft = sender.ScrollLeft;
        var scrollTop = sender.ScrollTop;
        var scrollHeight = sender.ScrollHeight;
        var scrollWidth = sender.ScrollWidth;

        _this.setState(function (prevState) {
          if (prevState.scrollLeft === scrollLeft && prevState.scrollTop === scrollTop) {
            // Scroll position may have been updated by cDM/cDU,
            // In which case we don't need to trigger another render,
            // And we don't want to update state.isScrolling.
            return null;
          }

          var direction = _this.props.direction; // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
          // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
          // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
          // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.

          var calculatedScrollLeft = scrollLeft;

          if (direction === 'rtl') {
            switch (getRTLOffsetType()) {
              case 'negative':
                calculatedScrollLeft = -scrollLeft;
                break;

              case 'positive-descending':
                calculatedScrollLeft = scrollWidth - clientWidth - scrollLeft;
                break;
            }
          } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


          calculatedScrollLeft = Math.max(0, Math.min(calculatedScrollLeft, scrollWidth - clientWidth));
          var calculatedScrollTop = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
          return {
            isScrolling: true,
            horizontalScrollDirection: prevState.scrollLeft < scrollLeft ? 'forward' : 'backward',
            scrollLeft: calculatedScrollLeft,
            scrollTop: calculatedScrollTop,
            verticalScrollDirection: prevState.scrollTop < scrollTop ? 'forward' : 'backward',
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };

      _this._outerRefSetter = function (ref) {
        var outerRef = _this.props.outerRef;
        _this._outerRef = ref;

        if (typeof outerRef === 'function') {
          outerRef(ref);
        } else if (outerRef != null && typeof outerRef === 'object' && outerRef.hasOwnProperty('current')) {
          outerRef.current = ref;
        }
      };

      _this._resetIsScrollingDebounced = function () {
        if (_this._resetIsScrollingTimeoutId !== null) {
          cancelTimeout(_this._resetIsScrollingTimeoutId);
        }

        _this._resetIsScrollingTimeoutId = requestTimeout(_this._resetIsScrolling, IS_SCROLLING_DEBOUNCE_INTERVAL);
      };

      _this._resetIsScrolling = function () {
        _this._resetIsScrollingTimeoutId = null;

        _this.setState({
          isScrolling: false
        }, function () {
          // Clear style cache after state update has been committed.
          // This way we don't break pure sCU for items that don't use isScrolling param.
          _this._getItemStyleCache(-1);
        });
      };

      return _this;
    }

    Grid.getDerivedStateFromProps = function (nextProps, prevState) {
      validateSharedProps(nextProps, prevState);
      validateProps(nextProps);
      return null;
    };

    Grid.prototype.scrollTo = function (_a) {
      var scrollLeft = _a.scrollLeft,
          scrollTop = _a.scrollTop;

      if (scrollLeft !== undefined) {
        scrollLeft = Math.max(0, scrollLeft);
      }

      if (scrollTop !== undefined) {
        scrollTop = Math.max(0, scrollTop);
      }

      this.setState(function (prevState) {
        if (scrollLeft === undefined) {
          scrollLeft = prevState.scrollLeft;
        }

        if (scrollTop === undefined) {
          scrollTop = prevState.scrollTop;
        }

        if (prevState.scrollLeft === scrollLeft && prevState.scrollTop === scrollTop) {
          return null;
        }

        return {
          horizontalScrollDirection: prevState.scrollLeft < scrollLeft ? 'forward' : 'backward',
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          scrollUpdateWasRequested: true,
          verticalScrollDirection: prevState.scrollTop < scrollTop ? 'forward' : 'backward'
        };
      }, this._resetIsScrollingDebounced);
    };

    Grid.prototype.scrollToItem = function (_a) {
      var _b = _a.align,
          align = _b === void 0 ? 'auto' : _b,
          columnIndex = _a.columnIndex,
          rowIndex = _a.rowIndex;
      var _c = this.props,
          columnCount = _c.columnCount,
          height = _c.height,
          rowCount = _c.rowCount,
          width = _c.width;
      var _d = this.state,
          scrollLeft = _d.scrollLeft,
          scrollTop = _d.scrollTop;
      var sizes = getScrollbarSize(this._outerRef);

      if (columnIndex !== undefined) {
        columnIndex = Math.max(0, Math.min(columnIndex, columnCount - 1));
      }

      if (rowIndex !== undefined) {
        rowIndex = Math.max(0, Math.min(rowIndex, rowCount - 1));
      }

      var estimatedTotalHeight = getEstimatedTotalHeight(this.props, this._instanceProps);
      var estimatedTotalWidth = getEstimatedTotalWidth(this.props, this._instanceProps); // The scrollbar size should be considered when scrolling an item into view,
      // to ensure it's fully visible.
      // But we only need to account for its size when it's actually visible.

      var horizontalScrollbarSize = estimatedTotalWidth > width ? sizes.horizontalHeight : 0;
      var verticalScrollbarSize = estimatedTotalHeight > height ? sizes.verticalWidth : 0;
      this.scrollTo({
        scrollLeft: columnIndex !== undefined ? getOffsetForColumnAndAlignment(this.props, columnIndex, align, scrollLeft, this._instanceProps, verticalScrollbarSize) : scrollLeft,
        scrollTop: rowIndex !== undefined ? getOffsetForRowAndAlignment(this.props, rowIndex, align, scrollTop, this._instanceProps, horizontalScrollbarSize) : scrollTop
      });
    };

    Grid.prototype.componentDidMount = function () {
      var _a = this.props,
          initialScrollLeft = _a.initialScrollLeft,
          initialScrollTop = _a.initialScrollTop;

      if (this._outerRef != null) {
        var outerRef = this._outerRef;

        if (typeof initialScrollLeft === 'number') {
          outerRef.ScrollLeft = initialScrollLeft;
        }

        if (typeof initialScrollTop === 'number') {
          outerRef.ScrollTop = initialScrollTop;
        }
      }

      this._callPropsCallbacks();
    };

    Grid.prototype.componentDidUpdate = function () {
      var direction = this.props.direction;
      var _a = this.state,
          scrollLeft = _a.scrollLeft,
          scrollTop = _a.scrollTop,
          scrollUpdateWasRequested = _a.scrollUpdateWasRequested;

      if (scrollUpdateWasRequested && this._outerRef != null) {
        // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
        // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
        // So we need to determine which browser behavior we're dealing with, and mimic it.
        var outerRef = this._outerRef;

        if (direction === 'rtl') {
          switch (getRTLOffsetType()) {
            case 'negative':
              outerRef.ScrollLeft = -scrollLeft;
              break;

            case 'positive-ascending':
              outerRef.ScrollLeft = scrollLeft;
              break;

            default:
              var clientWidth = outerRef.ClientWidth;
              var scrollWidth = outerRef.ScrollWidth;
              outerRef.ScrollLeft = scrollWidth - clientWidth - scrollLeft;
              break;
          }
        } else {
          outerRef.ScrollLeft = Math.max(0, scrollLeft);
        }

        outerRef.ScrollTop = Math.max(0, scrollTop);
      }

      this._callPropsCallbacks();
    };

    Grid.prototype.componentWillUnmount = function () {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId);
      }
    };

    Grid.prototype.render = function () {
      var _a = this.props,
          children = _a.children,
          className = _a.className,
          columnCount = _a.columnCount,
          direction = _a.direction,
          height = _a.height,
          innerRef = _a.innerRef,
          innerElementType = _a.innerElementType,
          itemData = _a.itemData,
          _b = _a.itemKey,
          itemKey = _b === void 0 ? defaultItemKey : _b,
          outerElementType = _a.outerElementType,
          rowCount = _a.rowCount,
          style = _a.style,
          useIsScrolling = _a.useIsScrolling,
          width = _a.width,
          // Unused
      columnWidth = _a.columnWidth,
          initialScrollLeft = _a.initialScrollLeft,
          initialScrollTop = _a.initialScrollTop,
          onItemsRendered = _a.onItemsRendered,
          onScroll = _a.onScroll,
          outerRef = _a.outerRef,
          overscanColumnCount = _a.overscanColumnCount,
          overscanRowCount = _a.overscanRowCount,
          rowHeight = _a.rowHeight,
          rest = createGridComponent_rest(_a, ["children", "className", "columnCount", "direction", "height", "innerRef", "innerElementType", "itemData", "itemKey", "outerElementType", "rowCount", "style", "useIsScrolling", "width", "columnWidth", "initialScrollLeft", "initialScrollTop", "onItemsRendered", "onScroll", "outerRef", "overscanColumnCount", "overscanRowCount", "rowHeight"]);

      var isScrolling = this.state.isScrolling;

      var _c = this._getHorizontalRangeToRender(),
          columnStartIndex = _c[0],
          columnStopIndex = _c[1];

      var _d = this._getVerticalRangeToRender(),
          rowStartIndex = _d[0],
          rowStopIndex = _d[1];

      var items = [];

      if (columnCount > 0 && rowCount) {
        for (var rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
          for (var columnIndex = columnStartIndex; columnIndex <= columnStopIndex; columnIndex++) {
            items.push((0,react.createElement)(children, {
              columnIndex: columnIndex,
              data: itemData,
              isScrolling: useIsScrolling ? isScrolling : undefined,
              key: itemKey({
                columnIndex: columnIndex,
                data: itemData,
                rowIndex: rowIndex
              }),
              rowIndex: rowIndex,
              style: this._getItemStyle(rowIndex, columnIndex)
            }));
          }
        }
      } // Read this value AFTER items have been created,
      // So their actual sizes (if variable) are taken into consideration.


      var estimatedTotalHeight = getEstimatedTotalHeight(this.props, this._instanceProps);
      var estimatedTotalWidth = getEstimatedTotalWidth(this.props, this._instanceProps);
      return (0,react.createElement)(outerElementType || 'scroll', createGridComponent_assign(createGridComponent_assign({}, rest), {
        className: className,
        onValueChanged: this._onScroll,
        ref: this._outerRefSetter,
        style: createGridComponent_assign({
          position: 'relative',
          height: height,
          width: width,
          direction: direction
        }, style)
      }), (0,react.createElement)(innerElementType || 'view', {
        children: items,
        ref: innerRef,
        style: {
          height: estimatedTotalHeight,
          pointerEvents: isScrolling ? 'none' : undefined,
          width: estimatedTotalWidth
        }
      }));
    };

    Grid.prototype._callPropsCallbacks = function () {
      var _a = this.props,
          columnCount = _a.columnCount,
          onItemsRendered = _a.onItemsRendered,
          onScroll = _a.onScroll,
          rowCount = _a.rowCount;

      if (typeof onItemsRendered === 'function') {
        if (columnCount > 0 && rowCount > 0) {
          var _b = this._getHorizontalRangeToRender(),
              overscanColumnStartIndex = _b[0],
              overscanColumnStopIndex = _b[1],
              visibleColumnStartIndex = _b[2],
              visibleColumnStopIndex = _b[3];

          var _c = this._getVerticalRangeToRender(),
              overscanRowStartIndex = _c[0],
              overscanRowStopIndex = _c[1],
              visibleRowStartIndex = _c[2],
              visibleRowStopIndex = _c[3];

          this._callOnItemsRendered(overscanColumnStartIndex, overscanColumnStopIndex, overscanRowStartIndex, overscanRowStopIndex, visibleColumnStartIndex, visibleColumnStopIndex, visibleRowStartIndex, visibleRowStopIndex);
        }
      }

      if (typeof onScroll === 'function') {
        var _d = this.state,
            horizontalScrollDirection = _d.horizontalScrollDirection,
            scrollLeft = _d.scrollLeft,
            scrollTop = _d.scrollTop,
            scrollUpdateWasRequested = _d.scrollUpdateWasRequested,
            verticalScrollDirection = _d.verticalScrollDirection;

        this._callOnScroll(scrollLeft, scrollTop, horizontalScrollDirection, verticalScrollDirection, scrollUpdateWasRequested);
      }
    };

    Grid.prototype._getHorizontalRangeToRender = function () {
      var _a = this.props,
          columnCount = _a.columnCount,
          overscanColumnCount = _a.overscanColumnCount,
          rowCount = _a.rowCount;
      var _b = this.state,
          horizontalScrollDirection = _b.horizontalScrollDirection,
          isScrolling = _b.isScrolling,
          scrollLeft = _b.scrollLeft;
      var overscanCountResolved = overscanColumnCount || 1;

      if (columnCount === 0 || rowCount === 0) {
        return [0, 0, 0, 0];
      }

      var startIndex = getColumnStartIndexForOffset(this.props, scrollLeft, this._instanceProps);
      var stopIndex = getColumnStopIndexForStartIndex(this.props, startIndex, scrollLeft, this._instanceProps); // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.

      var overscanBackward = !isScrolling || horizontalScrollDirection === 'backward' ? Math.max(1, overscanCountResolved) : 1;
      var overscanForward = !isScrolling || horizontalScrollDirection === 'forward' ? Math.max(1, overscanCountResolved) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(columnCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    };

    Grid.prototype._getVerticalRangeToRender = function () {
      var _a = this.props,
          columnCount = _a.columnCount,
          overscanRowCount = _a.overscanRowCount,
          rowCount = _a.rowCount;
      var _b = this.state,
          isScrolling = _b.isScrolling,
          verticalScrollDirection = _b.verticalScrollDirection,
          scrollTop = _b.scrollTop;
      var overscanCountResolved = overscanRowCount || 1;

      if (columnCount === 0 || rowCount === 0) {
        return [0, 0, 0, 0];
      }

      var startIndex = getRowStartIndexForOffset(this.props, scrollTop, this._instanceProps);
      var stopIndex = getRowStopIndexForStartIndex(this.props, startIndex, scrollTop, this._instanceProps); // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.

      var overscanBackward = !isScrolling || verticalScrollDirection === 'backward' ? Math.max(1, overscanCountResolved) : 1;
      var overscanForward = !isScrolling || verticalScrollDirection === 'forward' ? Math.max(1, overscanCountResolved) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(rowCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    };

    return Grid;
  }(react.PureComponent), _b.defaultProps = {
    direction: 'ltr',
    itemData: undefined,
    useIsScrolling: false
  }, _b;
}

var validateSharedProps = function validateSharedProps(_a, _b) {
  var children = _a.children,
      direction = _a.direction,
      height = _a.height,
      width = _a.width;
  var instance = _b.instance;

  if (false) {}
};
;// CONCATENATED MODULE: ../../material/dist/src/virtual-scroll/FixedSizeGrid.js

var FixedSizeGrid = createGridComponent({
  getColumnOffset: function getColumnOffset(_a, index) {
    var columnWidth = _a.columnWidth;
    return index * columnWidth;
  },
  getColumnWidth: function getColumnWidth(_a, index) {
    var columnWidth = _a.columnWidth;
    return columnWidth;
  },
  getRowOffset: function getRowOffset(_a, index) {
    var rowHeight = _a.rowHeight;
    return index * rowHeight;
  },
  getRowHeight: function getRowHeight(_a, index) {
    var rowHeight = _a.rowHeight;
    return rowHeight;
  },
  getEstimatedTotalHeight: function getEstimatedTotalHeight(_a) {
    var rowCount = _a.rowCount,
        rowHeight = _a.rowHeight;
    return rowHeight * rowCount;
  },
  getEstimatedTotalWidth: function getEstimatedTotalWidth(_a) {
    var columnCount = _a.columnCount,
        columnWidth = _a.columnWidth;
    return columnWidth * columnCount;
  },
  getOffsetForColumnAndAlignment: function getOffsetForColumnAndAlignment(_a, columnIndex, align, scrollLeft, instanceProps, scrollbarSize) {
    var columnCount = _a.columnCount,
        columnWidth = _a.columnWidth,
        width = _a.width;
    var lastColumnOffset = Math.max(0, columnCount * columnWidth - width);
    var maxOffset = Math.min(lastColumnOffset, columnIndex * columnWidth);
    var minOffset = Math.max(0, columnIndex * columnWidth - width + scrollbarSize + columnWidth);

    if (align === 'smart') {
      if (scrollLeft >= minOffset - width && scrollLeft <= maxOffset + width) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        // "Centered" offset is usually the average of the min and max.
        // But near the edges of the list, this doesn't hold true.
        var middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);

        if (middleOffset < Math.ceil(width / 2)) {
          return 0; // near the beginning
        } else if (middleOffset > lastColumnOffset + Math.floor(width / 2)) {
          return lastColumnOffset; // near the end
        } else {
          return middleOffset;
        }

      case 'auto':
      default:
        if (scrollLeft >= minOffset && scrollLeft <= maxOffset) {
          return scrollLeft;
        } else if (minOffset > maxOffset) {
          // Because we only take into account the scrollbar size when calculating minOffset
          // this value can be larger than maxOffset when at the end of the list
          return minOffset;
        } else if (scrollLeft < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getOffsetForRowAndAlignment: function getOffsetForRowAndAlignment(_a, rowIndex, align, scrollTop, instanceProps, scrollbarSize) {
    var rowHeight = _a.rowHeight,
        height = _a.height,
        rowCount = _a.rowCount;
    var lastRowOffset = Math.max(0, rowCount * rowHeight - height);
    var maxOffset = Math.min(lastRowOffset, rowIndex * rowHeight);
    var minOffset = Math.max(0, rowIndex * rowHeight - height + scrollbarSize + rowHeight);

    if (align === 'smart') {
      if (scrollTop >= minOffset - height && scrollTop <= maxOffset + height) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        // "Centered" offset is usually the average of the min and max.
        // But near the edges of the list, this doesn't hold true.
        var middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);

        if (middleOffset < Math.ceil(height / 2)) {
          return 0; // near the beginning
        } else if (middleOffset > lastRowOffset + Math.floor(height / 2)) {
          return lastRowOffset; // near the end
        } else {
          return middleOffset;
        }

      case 'auto':
      default:
        if (scrollTop >= minOffset && scrollTop <= maxOffset) {
          return scrollTop;
        } else if (minOffset > maxOffset) {
          // Because we only take into account the scrollbar size when calculating minOffset
          // this value can be larger than maxOffset when at the end of the list
          return minOffset;
        } else if (scrollTop < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getColumnStartIndexForOffset: function getColumnStartIndexForOffset(_a, scrollLeft) {
    var columnWidth = _a.columnWidth,
        columnCount = _a.columnCount;
    return Math.max(0, Math.min(columnCount - 1, Math.floor(scrollLeft / columnWidth)));
  },
  getColumnStopIndexForStartIndex: function getColumnStopIndexForStartIndex(_a, startIndex, scrollLeft) {
    var columnWidth = _a.columnWidth,
        columnCount = _a.columnCount,
        width = _a.width;
    var left = startIndex * columnWidth;
    var numVisibleColumns = Math.ceil((width + scrollLeft - left) / columnWidth);
    return Math.max(0, Math.min(columnCount - 1, startIndex + numVisibleColumns - 1 // -1 is because stop index is inclusive
    ));
  },
  getRowStartIndexForOffset: function getRowStartIndexForOffset(_a, scrollTop) {
    var rowHeight = _a.rowHeight,
        rowCount = _a.rowCount;
    return Math.max(0, Math.min(rowCount - 1, Math.floor(scrollTop / rowHeight)));
  },
  getRowStopIndexForStartIndex: function getRowStopIndexForStartIndex(_a, startIndex, scrollTop) {
    var rowHeight = _a.rowHeight,
        rowCount = _a.rowCount,
        height = _a.height;
    var top = startIndex * rowHeight;
    var numVisibleRows = Math.ceil((height + scrollTop - top) / rowHeight);
    return Math.max(0, Math.min(rowCount - 1, startIndex + numVisibleRows - 1 // -1 is because stop index is inclusive
    ));
  },
  initInstanceProps: function initInstanceProps(props) {// Noop
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: function validateProps(_a) {
    var columnWidth = _a.columnWidth,
        rowHeight = _a.rowHeight;

    if (false) {}
  }
});
;// CONCATENATED MODULE: ../../material/dist/src/virtual-scroll/createListComponent.js
var createListComponent_extends = undefined && undefined.__extends || function () {
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

var createListComponent_assign = undefined && undefined.__assign || function () {
  createListComponent_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return createListComponent_assign.apply(this, arguments);
};

var createListComponent_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





var createListComponent_IS_SCROLLING_DEBOUNCE_INTERVAL = 150;

var createListComponent_defaultItemKey = function defaultItemKey(index, data) {
  return index;
};

function createListComponent(_a) {
  var _b;

  var getItemOffset = _a.getItemOffset,
      getEstimatedTotalSize = _a.getEstimatedTotalSize,
      getItemSize = _a.getItemSize,
      getOffsetForIndexAndAlignment = _a.getOffsetForIndexAndAlignment,
      getStartIndexForOffset = _a.getStartIndexForOffset,
      getStopIndexForStartIndex = _a.getStopIndexForStartIndex,
      initInstanceProps = _a.initInstanceProps,
      shouldResetStyleCacheOnItemSizeChange = _a.shouldResetStyleCacheOnItemSizeChange,
      validateProps = _a.validateProps;
  return _b =
  /** @class */
  function (_super) {
    createListComponent_extends(List, _super); // Always use explicit constructor for React components.
    // It produces less code after transpilation. (#26)
    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-useless-constructor


    function List(props) {
      var _this = _super.call(this, props) || this;

      _this._instanceProps = initInstanceProps(_this.props, _this);
      _this._resetIsScrollingTimeoutId = null;
      _this.state = {
        instance: _this,
        isScrolling: false,
        scrollDirection: 'forward',
        scrollOffset: typeof _this.props.initialScrollOffset === 'number' ? _this.props.initialScrollOffset : 0,
        scrollUpdateWasRequested: false
      };
      _this._callOnItemsRendered = memoizeOne(function (overscanStartIndex, overscanStopIndex, visibleStartIndex, visibleStopIndex) {
        return _this.props.onItemsRendered({
          overscanStartIndex: overscanStartIndex,
          overscanStopIndex: overscanStopIndex,
          visibleStartIndex: visibleStartIndex,
          visibleStopIndex: visibleStopIndex
        });
      });
      _this._callOnScroll = memoizeOne(function (scrollDirection, scrollOffset, scrollUpdateWasRequested) {
        return _this.props.onScroll({
          scrollDirection: scrollDirection,
          scrollOffset: scrollOffset,
          scrollUpdateWasRequested: scrollUpdateWasRequested
        });
      }); // Lazily create and cache item styles while scrolling,
      // So that pure component sCU will prevent re-renders.
      // We maintain this cache, and pass a style prop rather than index,
      // So that List can clear cached styles and force item re-render if necessary.

      _this._getItemStyle = function (index) {
        var _a = _this.props,
            direction = _a.direction,
            itemSize = _a.itemSize,
            layout = _a.layout;

        var itemStyleCache = _this._getItemStyleCache(shouldResetStyleCacheOnItemSizeChange && itemSize, shouldResetStyleCacheOnItemSizeChange && layout, shouldResetStyleCacheOnItemSizeChange && direction);

        var style;

        if (itemStyleCache.hasOwnProperty(index)) {
          style = itemStyleCache[index];
        } else {
          var offset = getItemOffset(_this.props, index, _this._instanceProps);
          var size = getItemSize(_this.props, index, _this._instanceProps);
          var isHorizontal = layout === 'horizontal';
          var isRtl = direction === 'rtl';
          var offsetHorizontal = isHorizontal ? offset : 0;
          itemStyleCache[index] = style = {
            position: 'absolute',
            left: isRtl ? undefined : offsetHorizontal,
            right: isRtl ? offsetHorizontal : undefined,
            top: !isHorizontal ? offset : 0,
            height: !isHorizontal ? size : '100%',
            width: isHorizontal ? size : '100%'
          };
        }

        return style;
      };

      _this._getItemStyleCache = memoizeOne(function (_, __, ___) {
        return {};
      });

      _this._onScrollHorizontal = function (event, sender) {
        var clientWidth = sender.ClientWidth;
        var scrollWidth = sender.ScrollWidth;
        var scrollLeft = sender.ScrollLeft;

        _this.setState(function (prevState) {
          if (prevState.scrollOffset === scrollLeft) {
            // Scroll position may have been updated by cDM/cDU,
            // In which case we don't need to trigger another render,
            // And we don't want to update state.isScrolling.
            return null;
          }

          var direction = _this.props.direction;
          var scrollOffset = scrollLeft;

          if (direction === 'rtl') {
            // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
            // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
            // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
            // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.
            switch (getRTLOffsetType()) {
              case 'negative':
                scrollOffset = -scrollLeft;
                break;

              case 'positive-descending':
                scrollOffset = scrollWidth - clientWidth - scrollLeft;
                break;
            }
          } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


          scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth));
          return {
            isScrolling: true,
            scrollDirection: prevState.scrollOffset < scrollLeft ? 'forward' : 'backward',
            scrollOffset: scrollOffset,
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };

      _this._onScrollVertical = function (event, sender) {
        var clientHeight = sender.ClientHeight;
        var scrollHeight = sender.ScrollHeight;
        var scrollTop = sender.ScrollTop;

        _this.setState(function (prevState) {
          if (prevState.scrollOffset === scrollTop) {
            // Scroll position may have been updated by cDM/cDU,
            // In which case we don't need to trigger another render,
            // And we don't want to update state.isScrolling.
            return null;
          } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


          var scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
          return {
            isScrolling: true,
            scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
            scrollOffset: scrollOffset,
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };

      _this._outerRefSetter = function (ref) {
        var outerRef = _this.props.outerRef;
        _this._outerRef = ref;

        if (typeof outerRef === 'function') {
          outerRef(ref);
        } else if (outerRef != null && typeof outerRef === 'object' && outerRef.hasOwnProperty('current')) {
          outerRef.current = ref;
        }
      };

      _this._resetIsScrollingDebounced = function () {
        if (_this._resetIsScrollingTimeoutId !== null) {
          cancelTimeout(_this._resetIsScrollingTimeoutId);
        }

        _this._resetIsScrollingTimeoutId = requestTimeout(_this._resetIsScrolling, createListComponent_IS_SCROLLING_DEBOUNCE_INTERVAL);
      };

      _this._resetIsScrolling = function () {
        _this._resetIsScrollingTimeoutId = null;

        _this.setState({
          isScrolling: false
        }, function () {
          // Clear style cache after state update has been committed.
          // This way we don't break pure sCU for items that don't use isScrolling param.
          _this._getItemStyleCache(-1, null);
        });
      };

      return _this;
    }

    List.getDerivedStateFromProps = function (nextProps, prevState) {
      createListComponent_validateSharedProps(nextProps, prevState);
      validateProps(nextProps);
      return null;
    };

    List.prototype.scrollTo = function (scrollOffset) {
      scrollOffset = Math.max(0, scrollOffset);
      this.setState(function (prevState) {
        if (prevState.scrollOffset === scrollOffset) {
          return null;
        }

        return {
          scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
          scrollOffset: scrollOffset,
          scrollUpdateWasRequested: true
        };
      }, this._resetIsScrollingDebounced);
    };

    List.prototype.scrollToItem = function (index, align) {
      if (align === void 0) {
        align = 'auto';
      }

      var itemCount = this.props.itemCount;
      var scrollOffset = this.state.scrollOffset;
      index = Math.max(0, Math.min(index, itemCount - 1));
      this.scrollTo(getOffsetForIndexAndAlignment(this.props, index, align, scrollOffset, this._instanceProps));
    };

    List.prototype.componentDidMount = function () {
      var _a = this.props,
          initialScrollOffset = _a.initialScrollOffset,
          layout = _a.layout;

      if (typeof initialScrollOffset === 'number' && this._outerRef != null) {
        var outerRef = this._outerRef;

        if (layout === 'horizontal') {
          outerRef.ScrollLeft = initialScrollOffset;
        } else {
          outerRef.ScrollTop = initialScrollOffset;
        }
      }

      this._callPropsCallbacks();
    };

    List.prototype.componentDidUpdate = function () {
      var _a = this.props,
          direction = _a.direction,
          layout = _a.layout;
      var _b = this.state,
          scrollOffset = _b.scrollOffset,
          scrollUpdateWasRequested = _b.scrollUpdateWasRequested;

      if (scrollUpdateWasRequested && this._outerRef != null) {
        var outerRef = this._outerRef;

        if (layout === 'horizontal') {
          if (direction === 'rtl') {
            // TRICKY According to the spec, ScrollLeft should be negative for RTL aligned elements.
            // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
            // So we need to determine which browser behavior we're dealing with, and mimic it.
            switch (getRTLOffsetType()) {
              case 'negative':
                outerRef.ScrollLeft = -scrollOffset;
                break;

              case 'positive-ascending':
                outerRef.ScrollLeft = scrollOffset;
                break;

              default:
                var scrollWidth = outerRef.ScrollWidth;
                var clientWidth = outerRef.ClientWidth;
                outerRef.ScrollLeft = scrollWidth - clientWidth - scrollOffset;
                break;
            }
          } else {
            outerRef.ScrollLeft = scrollOffset;
          }
        } else {
          outerRef.ScrollTop = scrollOffset;
        }
      }

      this._callPropsCallbacks();
    };

    List.prototype.componentWillUnmount = function () {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId);
      }
    };

    List.prototype.render = function () {
      var _a = this.props,
          children = _a.children,
          className = _a.className,
          direction = _a.direction,
          height = _a.height,
          innerRef = _a.innerRef,
          innerElementType = _a.innerElementType,
          itemCount = _a.itemCount,
          itemData = _a.itemData,
          _b = _a.itemKey,
          itemKey = _b === void 0 ? createListComponent_defaultItemKey : _b,
          layout = _a.layout,
          outerElementType = _a.outerElementType,
          style = _a.style,
          useIsScrolling = _a.useIsScrolling,
          width = _a.width,
          // Unused
      initialScrollOffset = _a.initialScrollOffset,
          itemSize = _a.itemSize,
          onItemsRendered = _a.onItemsRendered,
          _ = _a.onScroll,
          outerRef = _a.outerRef,
          overscanCount = _a.overscanCount,
          rest = createListComponent_rest(_a, ["children", "className", "direction", "height", "innerRef", "innerElementType", "itemCount", "itemData", "itemKey", "layout", "outerElementType", "style", "useIsScrolling", "width", "initialScrollOffset", "itemSize", "onItemsRendered", "onScroll", "outerRef", "overscanCount"]);

      var isScrolling = this.state.isScrolling;
      var isHorizontal = layout === 'horizontal';
      var onScroll = isHorizontal ? this._onScrollHorizontal : this._onScrollVertical;

      var _c = this._getRangeToRender(),
          startIndex = _c[0],
          stopIndex = _c[1];

      var items = [];

      if (itemCount > 0) {
        for (var index = startIndex; index <= stopIndex; index++) {
          items.push((0,react.createElement)(children, {
            data: itemData,
            key: itemKey(index, itemData),
            index: index,
            isScrolling: useIsScrolling ? isScrolling : undefined,
            style: this._getItemStyle(index)
          }));
        }
      } // Read this value AFTER items have been created,
      // So their actual sizes (if variable) are taken into consideration.


      var estimatedTotalSize = getEstimatedTotalSize(this.props, this._instanceProps);
      return (0,react.createElement)(outerElementType || 'scroll', createListComponent_assign(createListComponent_assign({}, rest), {
        className: className,
        onValueChanged: onScroll,
        ref: this._outerRefSetter,
        style: createListComponent_assign({
          position: 'relative',
          height: height,
          width: width,
          direction: direction
        }, style)
      }), (0,react.createElement)(innerElementType || 'view', {
        children: items,
        ref: innerRef,
        style: {
          height: isHorizontal ? '100%' : estimatedTotalSize,
          pointerEvents: isScrolling ? 'none' : undefined,
          width: isHorizontal ? estimatedTotalSize : '100%'
        }
      }));
    };

    List.prototype._callPropsCallbacks = function () {
      if (typeof this.props.onItemsRendered === 'function') {
        var itemCount = this.props.itemCount;

        if (itemCount > 0) {
          var _a = this._getRangeToRender(),
              overscanStartIndex = _a[0],
              overscanStopIndex = _a[1],
              visibleStartIndex = _a[2],
              visibleStopIndex = _a[3];

          this._callOnItemsRendered(overscanStartIndex, overscanStopIndex, visibleStartIndex, visibleStopIndex);
        }
      }

      if (typeof this.props.onScroll === 'function') {
        var _b = this.state,
            scrollDirection = _b.scrollDirection,
            scrollOffset = _b.scrollOffset,
            scrollUpdateWasRequested = _b.scrollUpdateWasRequested;

        this._callOnScroll(scrollDirection, scrollOffset, scrollUpdateWasRequested);
      }
    };

    List.prototype._getRangeToRender = function () {
      var _a = this.props,
          itemCount = _a.itemCount,
          overscanCount = _a.overscanCount;
      var _b = this.state,
          isScrolling = _b.isScrolling,
          scrollDirection = _b.scrollDirection,
          scrollOffset = _b.scrollOffset;

      if (itemCount === 0) {
        return [0, 0, 0, 0];
      }

      var startIndex = getStartIndexForOffset(this.props, scrollOffset, this._instanceProps);
      var stopIndex = getStopIndexForStartIndex(this.props, startIndex, scrollOffset, this._instanceProps); // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.

      var overscanBackward = !isScrolling || scrollDirection === 'backward' ? Math.max(1, overscanCount) : 1;
      var overscanForward = !isScrolling || scrollDirection === 'forward' ? Math.max(1, overscanCount) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    };

    return List;
  }(react.PureComponent), _b.defaultProps = {
    direction: 'ltr',
    itemData: undefined,
    layout: 'vertical',
    overscanCount: 2,
    useIsScrolling: false
  }, _b;
} // NOTE: I considered further wrapping individual items with a pure ListItem component.
// This would avoid ever calling the render function for the same index more than once,
// But it would also add the overhead of a lot of components/fibers.
// I assume people already do this (render function returning a class component),
// So my doing it would just unnecessarily double the wrappers.

var createListComponent_validateSharedProps = function validateSharedProps(_a, _b) {
  var children = _a.children,
      direction = _a.direction,
      height = _a.height,
      layout = _a.layout,
      width = _a.width;
  var instance = _b.instance;

  if (false) { var isHorizontal; }
};
;// CONCATENATED MODULE: ../../material/dist/src/virtual-scroll/FixedSizeList.js

var FixedSizeList = createListComponent({
  getItemOffset: function getItemOffset(_a, index) {
    var itemSize = _a.itemSize;
    return index * itemSize;
  },
  getItemSize: function getItemSize(_a, index) {
    var itemSize = _a.itemSize;
    return itemSize;
  },
  getEstimatedTotalSize: function getEstimatedTotalSize(_a) {
    var itemCount = _a.itemCount,
        itemSize = _a.itemSize;
    return itemSize * itemCount;
  },
  getOffsetForIndexAndAlignment: function getOffsetForIndexAndAlignment(_a, index, align, scrollOffset) {
    var direction = _a.direction,
        height = _a.height,
        itemCount = _a.itemCount,
        itemSize = _a.itemSize,
        layout = _a.layout,
        width = _a.width;
    var isHorizontal = layout === 'horizontal';
    var size = isHorizontal ? width : height;
    var lastItemOffset = Math.max(0, itemCount * itemSize - size);
    var maxOffset = Math.min(lastItemOffset, index * itemSize);
    var minOffset = Math.max(0, index * itemSize - size + itemSize);

    if (align === 'smart') {
      if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        {
          // "Centered" offset is usually the average of the min and max.
          // But near the edges of the list, this doesn't hold true.
          var middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);

          if (middleOffset < Math.ceil(size / 2)) {
            return 0; // near the beginning
          } else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
            return lastItemOffset; // near the end
          } else {
            return middleOffset;
          }
        }

      case 'auto':
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getStartIndexForOffset: function getStartIndexForOffset(_a, offset) {
    var itemCount = _a.itemCount,
        itemSize = _a.itemSize;
    return Math.max(0, Math.min(itemCount - 1, Math.floor(offset / itemSize)));
  },
  getStopIndexForStartIndex: function getStopIndexForStartIndex(_a, startIndex, scrollOffset) {
    var direction = _a.direction,
        height = _a.height,
        itemCount = _a.itemCount,
        itemSize = _a.itemSize,
        layout = _a.layout,
        width = _a.width;
    var isHorizontal = layout === 'horizontal';
    var offset = startIndex * itemSize;
    var size = isHorizontal ? width : height;
    var numVisibleItems = Math.ceil((size + scrollOffset - offset) / itemSize);
    return Math.max(0, Math.min(itemCount - 1, startIndex + numVisibleItems - 1 // -1 is because stop index is inclusive
    ));
  },
  initInstanceProps: function initInstanceProps(props) {// Noop
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: function validateProps(_a) {
    var itemSize = _a.itemSize;

    if (false) {}
  }
});
;// CONCATENATED MODULE: ../../material/dist/src/virtual-scroll/VariableSizeList.js

var DEFAULT_ESTIMATED_ITEM_SIZE = 50;

var getItemMetadata = function getItemMetadata(props, index, instanceProps) {
  var itemSize = props.itemSize;
  var itemMetadataMap = instanceProps.itemMetadataMap,
      lastMeasuredIndex = instanceProps.lastMeasuredIndex;

  if (index > lastMeasuredIndex) {
    var offset = 0;

    if (lastMeasuredIndex >= 0) {
      var itemMetadata = itemMetadataMap[lastMeasuredIndex];
      offset = itemMetadata.offset + itemMetadata.size;
    }

    for (var i = lastMeasuredIndex + 1; i <= index; i++) {
      var size = itemSize(i);
      itemMetadataMap[i] = {
        offset: offset,
        size: size
      };
      offset += size;
    }

    instanceProps.lastMeasuredIndex = index;
  }

  return itemMetadataMap[index];
};

var findNearestItem = function findNearestItem(props, instanceProps, offset) {
  var itemMetadataMap = instanceProps.itemMetadataMap,
      lastMeasuredIndex = instanceProps.lastMeasuredIndex;
  var lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;

  if (lastMeasuredItemOffset >= offset) {
    // If we've already measured items within this range just use a binary search as it's faster.
    return findNearestItemBinarySearch(props, instanceProps, lastMeasuredIndex, 0, offset);
  } else {
    // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
    // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
    // The overall complexity for this approach is O(log n).
    return findNearestItemExponentialSearch(props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
  }
};

var findNearestItemBinarySearch = function findNearestItemBinarySearch(props, instanceProps, high, low, offset) {
  while (low <= high) {
    var middle = low + Math.floor((high - low) / 2);
    var currentOffset = getItemMetadata(props, middle, instanceProps).offset;

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};

var findNearestItemExponentialSearch = function findNearestItemExponentialSearch(props, instanceProps, index, offset) {
  var itemCount = props.itemCount;
  var interval = 1;

  while (index < itemCount && getItemMetadata(props, index, instanceProps).offset < offset) {
    index += interval;
    interval *= 2;
  }

  return findNearestItemBinarySearch(props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
};

var getEstimatedTotalSize = function getEstimatedTotalSize(_a, _b) {
  var itemCount = _a.itemCount;
  var itemMetadataMap = _b.itemMetadataMap,
      estimatedItemSize = _b.estimatedItemSize,
      lastMeasuredIndex = _b.lastMeasuredIndex;
  var totalSizeOfMeasuredItems = 0; // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138

  if (lastMeasuredIndex >= itemCount) {
    lastMeasuredIndex = itemCount - 1;
  }

  if (lastMeasuredIndex >= 0) {
    var itemMetadata = itemMetadataMap[lastMeasuredIndex];
    totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size;
  }

  var numUnmeasuredItems = itemCount - lastMeasuredIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize;
  return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
};

var VariableSizeList = createListComponent({
  getItemOffset: function getItemOffset(props, index, instanceProps) {
    return getItemMetadata(props, index, instanceProps).offset;
  },
  getItemSize: function getItemSize(props, index, instanceProps) {
    return instanceProps.itemMetadataMap[index].size;
  },
  getEstimatedTotalSize: getEstimatedTotalSize,
  getOffsetForIndexAndAlignment: function getOffsetForIndexAndAlignment(props, index, align, scrollOffset, instanceProps) {
    var height = props.height,
        layout = props.layout,
        width = props.width;
    var isHorizontal = layout === 'horizontal';
    var size = isHorizontal ? width : height;
    var itemMetadata = getItemMetadata(props, index, instanceProps); // Get estimated total size after ItemMetadata is computed,
    // To ensure it reflects actual measurements instead of just estimates.

    var estimatedTotalSize = getEstimatedTotalSize(props, instanceProps);
    var maxOffset = Math.max(0, Math.min(estimatedTotalSize - size, itemMetadata.offset));
    var minOffset = Math.max(0, itemMetadata.offset - size + itemMetadata.size);

    if (align === 'smart') {
      if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        return Math.round(minOffset + (maxOffset - minOffset) / 2);

      case 'auto':
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getStartIndexForOffset: function getStartIndexForOffset(props, offset, instanceProps) {
    return findNearestItem(props, instanceProps, offset);
  },
  getStopIndexForStartIndex: function getStopIndexForStartIndex(props, startIndex, scrollOffset, instanceProps) {
    var height = props.height,
        itemCount = props.itemCount,
        layout = props.layout,
        width = props.width;
    var isHorizontal = layout === 'horizontal';
    var size = isHorizontal ? width : height;
    var itemMetadata = getItemMetadata(props, startIndex, instanceProps);
    var maxOffset = scrollOffset + size;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;

    while (stopIndex < itemCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata(props, stopIndex, instanceProps).size;
    }

    return stopIndex;
  },
  initInstanceProps: function initInstanceProps(props, instance) {
    var estimatedItemSize = props.estimatedItemSize;
    var instanceProps = {
      itemMetadataMap: {},
      estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATED_ITEM_SIZE,
      lastMeasuredIndex: -1
    };

    instance.resetAfterIndex = function (index, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }

      instanceProps.lastMeasuredIndex = Math.min(instanceProps.lastMeasuredIndex, index - 1); // We could potentially optimize further by only evicting styles after this index,
      // But since styles are only cached while scrolling is in progress-
      // It seems an unnecessary optimization.
      // It's unlikely that resetAfterIndex() will be called while a user is scrolling.

      instance._getItemStyleCache(-1);

      if (shouldForceUpdate) {
        instance.forceUpdate();
      }
    };

    return instanceProps;
  },
  shouldResetStyleCacheOnItemSizeChange: false,
  validateProps: function validateProps(_a) {
    var itemSize = _a.itemSize;

    if (false) {}
  }
});
;// CONCATENATED MODULE: ./src/pages/material/virtual-scrolls.tsx
var Row=function Row(_ref){var index=_ref.index,style=_ref.style;return/*#__PURE__*/(0,jsx_runtime.jsxs)("text",{style:style,children:["Row ",index]});};var Cell=function Cell(_ref2){var columnIndex=_ref2.columnIndex,rowIndex=_ref2.rowIndex,style=_ref2.style;return/*#__PURE__*/(0,jsx_runtime.jsxs)("text",{style:style,children:["Item ",rowIndex,",",columnIndex]});};var FixedGridExample=function FixedGridExample(){return/*#__PURE__*/(0,jsx_runtime.jsx)(FixedSizeGrid,{columnCount:1000,columnWidth:100,height:450,rowCount:1000,rowHeight:35,width:450,children:Cell});};// These row heights are arbitrary.
// Yours should be based on the content of the row.
var rowHeights=new Array(1000).fill(true).map(function(){return 25+Math.round(Math.random()*50);});var getItemSize=function getItemSize(index){return rowHeights[index];};var FixedSizeExample=function FixedSizeExample(){return/*#__PURE__*/(0,jsx_runtime.jsx)(FixedSizeList,{height:450,itemCount:1000,itemSize:30,width:300,smoothness:0,children:Row});};var VariableSizeExample=function VariableSizeExample(){return/*#__PURE__*/(0,jsx_runtime.jsx)(VariableSizeList,{height:450,itemCount:1000,itemSize:getItemSize,width:300,children:Row});};function VirtualScrolls(){return/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{style:{flexDirection:'row',justifyContent:'space-around'},children:[/*#__PURE__*/(0,jsx_runtime.jsx)(FixedSizeExample,{}),/*#__PURE__*/(0,jsx_runtime.jsx)(VariableSizeExample,{}),/*#__PURE__*/(0,jsx_runtime.jsx)(FixedGridExample,{})]});}
;// CONCATENATED MODULE: ./src/pages/material/index.tsx
function MaterialPage(){var _React$useState=react.useState(0),_React$useState2=_slicedToArray(_React$useState,2),dlOpen=_React$useState2[0],setDlOpen=_React$useState2[1];var ttHover=useDataTooltip('hover');var ttPress=useDataTooltip('press');var ttClick=useDataTooltip('click');return/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:pages_material_index_module.app,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h1",{children:"Material Showcase \uD83D\uDE0E"}),/*#__PURE__*/(0,jsx_runtime.jsxs)(Paper,{elevation:2,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{onClick:function onClick(){return setDlOpen(1);},children:"Open Alert With Text Only"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{onClick:function onClick(){return setDlOpen(2);},children:"Open Alert With Title Only"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{onClick:function onClick(){return setDlOpen(3);},children:"Open Alert With Text & Title"}),/*#__PURE__*/(0,jsx_runtime.jsx)(AlertDialog,{open:dlOpen===1,onClose:function onClose(){return setDlOpen(0);},backdropClose:true,text:'Some alert text'}),/*#__PURE__*/(0,jsx_runtime.jsx)(AlertDialog,{open:dlOpen===2,onClose:function onClose(){return setDlOpen(0);},backdropClose:true,title:'Some alert title'}),/*#__PURE__*/(0,jsx_runtime.jsx)(AlertDialog,{open:dlOpen===3,onClose:function onClose(){return setDlOpen(0);},backdropClose:true,text:'Some alert text',title:'Some alert title'})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)(Paper,{elevation:2,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{onClick:function onClick(){return setDlOpen(4);},children:"Open Confirm With Text Only"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{onClick:function onClick(){return setDlOpen(5);},children:"Open Confirm With Title Only"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{onClick:function onClick(){return setDlOpen(6);},children:"Open Confirm With Text & Title"}),/*#__PURE__*/(0,jsx_runtime.jsx)(ConfirmDialog,{open:dlOpen===4,onClose:function onClose(){return setDlOpen(0);},backdropClose:true,text:'Some confirm text'}),/*#__PURE__*/(0,jsx_runtime.jsx)(ConfirmDialog,{open:dlOpen===5,onClose:function onClose(){return setDlOpen(0);},backdropClose:true,title:'Some confirm title'}),/*#__PURE__*/(0,jsx_runtime.jsx)(ConfirmDialog,{open:dlOpen===6,onClose:function onClose(){return setDlOpen(0);},backdropClose:true,text:'Some confirm text',title:'Some confirm title'})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)(Paper,{elevation:2,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{onClick:function onClick(){return setDlOpen(7);},children:"Open Prompt With Text Only"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{onClick:function onClick(){return setDlOpen(8);},children:"Open Prompt With Title Only"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{onClick:function onClick(){return setDlOpen(9);},children:"Open Prompt With Text & Title"}),/*#__PURE__*/(0,jsx_runtime.jsx)(PromptDialog,{open:dlOpen===7,onClose:function onClose(){return setDlOpen(0);},backdropClose:true,text:'Some prompt text'}),/*#__PURE__*/(0,jsx_runtime.jsx)(PromptDialog,{open:dlOpen===8,onClose:function onClose(){return setDlOpen(0);},backdropClose:true,title:'Some prompt title'}),/*#__PURE__*/(0,jsx_runtime.jsx)(PromptDialog,{placeholder:"Some placeholder",open:dlOpen===9,onClose:function onClose(){return setDlOpen(0);},backdropClose:true,text:'Some prompt text',title:'Some prompt title'})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)(Paper,{elevation:2,children:["Virtual Scrolls:",/*#__PURE__*/(0,jsx_runtime.jsx)(VirtualScrolls,{})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Tooltip"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{style:{flexDirection:'row',justifyContent:'space-around'},children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{style:{alignItems:'center'},children:["Hover",/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttHover.register,"data-tooltip-offset":20,"data-tooltip-position":"top","data-tooltip-content":"This is shown on top",children:"Top"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttHover.register,"data-tooltip-position":"bottom","data-tooltip-content":"This is shown on bottom",children:"Bottom"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttHover.register,"data-tooltip-position":"left","data-tooltip-content":"This is shown on left",children:"Left"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttHover.register,"data-tooltip-position":"right","data-tooltip-content":"This is shown on right",children:"Right"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttHover.register,"data-tooltip-position":"center","data-tooltip-content":"This is shown on center",children:"Center"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttHover.register,"data-tooltip-anchor":"bottom right","data-tooltip-pivot":"top left","data-tooltip-content":"This is shown on right bottom corner",children:"Custom"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{style:{alignItems:'center'},children:["Press",/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttPress.register,"data-tooltip-offset":20,"data-tooltip-position":"top","data-tooltip-content":"This is shown on top",children:"Top"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttPress.register,"data-tooltip-position":"bottom","data-tooltip-content":"This is shown on bottom",children:"Bottom"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttPress.register,"data-tooltip-position":"left","data-tooltip-content":"This is shown on left",children:"Left"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttPress.register,"data-tooltip-position":"right","data-tooltip-content":"This is shown on right",children:"Right"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttPress.register,"data-tooltip-position":"center","data-tooltip-content":"This is shown on center",children:"Center"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttPress.register,"data-tooltip-anchor":"bottom right","data-tooltip-pivot":"top left","data-tooltip-content":"This is shown on right bottom corner",children:"Custom"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{style:{alignItems:'center'},children:["Click",/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttClick.register,"data-tooltip-offset":20,"data-tooltip-position":"top","data-tooltip-content":"This is shown on top",children:"Top"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttClick.register,"data-tooltip-position":"bottom","data-tooltip-content":"This is shown on bottom",children:"Bottom"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttClick.register,"data-tooltip-position":"left","data-tooltip-content":"This is shown on left",children:"Left"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttClick.register,"data-tooltip-position":"right","data-tooltip-content":"This is shown on right",children:"Right"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttClick.register,"data-tooltip-position":"center","data-tooltip-content":"This is shown on center",children:"Center"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{ref:ttClick.register,"data-tooltip-anchor":"bottom right","data-tooltip-pivot":"top left","data-tooltip-content":"This is shown on right bottom corner",children:"Custom"})]})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Card"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Card,{children:/*#__PURE__*/(0,jsx_runtime.jsx)(Card.Content,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("anchor",{url:"https://www.google.com",children:"Open Google"})})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Accordion"}),/*#__PURE__*/(0,jsx_runtime.jsxs)(Accordion,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Accordion.Summary,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("view",{children:"Some stuff is happening"})}),/*#__PURE__*/(0,jsx_runtime.jsx)(Accordion.Content,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("anchor",{url:"https://www.google.com",children:"Open Google"})})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Slider"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Slider,{allowScroll:true,direction:"horizontal",mode:"normal",max:100,step:20,children:function children(val){return val*val;}}),/*#__PURE__*/(0,jsx_runtime.jsx)(Slider,{allowScroll:true,direction:"horizontal",mode:"diff",max:100,step:20,children:function children(val){return val*val;}}),/*#__PURE__*/(0,jsx_runtime.jsx)(Slider,{allowScroll:true,direction:"horizontal-reverse",mode:"normal",max:100,step:20,children:"asdf"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Slider,{allowScroll:true,direction:"horizontal-reverse",mode:"diff",max:100,step:20,children:"asdf"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("view",{children:"No Placeholder:"}),/*#__PURE__*/(0,jsx_runtime.jsx)(TextField,{variant:"standard"}),/*#__PURE__*/(0,jsx_runtime.jsx)(TextField,{variant:"filled"}),/*#__PURE__*/(0,jsx_runtime.jsx)(TextField,{variant:"outlined"}),/*#__PURE__*/(0,jsx_runtime.jsx)(TextField,{placeholder:"Standard with placeholder",variant:"standard"}),/*#__PURE__*/(0,jsx_runtime.jsx)(TextField,{placeholder:"Outlined with placeholder",variant:"outlined"}),/*#__PURE__*/(0,jsx_runtime.jsx)(TextField,{placeholder:"Filled with placeholder",variant:"filled"}),/*#__PURE__*/(0,jsx_runtime.jsx)(TextField,{placeholder:"Password Input",contentType:"password"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsxs)(Select,{placeholder:'Regular select',initialValue:"val1",children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val1",children:"Option 1"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val2",children:"Option 2"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val3",children:"Option 3"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val4",children:"Option 4"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val5",children:"Option 5"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val6",children:"Option 6"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val7",children:"Option 7"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val8",children:"Option 8"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val9",children:"Option 9"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val10",children:"Option 10"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val11",children:"Option 11"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val12",children:"Option 12"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val13",children:"Option 13"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)(Select,{multiple:true,initialValue:['val1','val2'],placeholder:'Multiple with initial value',children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val1",children:"Option 1"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val2",children:"Option 2"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val3",children:"Option 3"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)(Select,{multiple:true,chips:true,initialValue:['val1','val2'],placeholder:'Chips selection',children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val1",children:"Option 1"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val2",children:"Option 2"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val3",children:"Option 3"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val4",children:"Option 4"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Select.Option,{value:"val5",children:"Option 5"})]})]}),/*#__PURE__*/(0,jsx_runtime.jsx)(Toggle,{children:"Checkbox"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Toggle,{indeterminate:true,children:"Indeterminate"}),"Radio Group:",/*#__PURE__*/(0,jsx_runtime.jsxs)(ToggleGroup,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Toggle,{children:"Option 1"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Toggle,{children:"Option 2"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Toggle,{children:"Option 3"})]}),"Checkbox Group:",/*#__PURE__*/(0,jsx_runtime.jsxs)(ToggleGroup,{multiple:true,initialValue:['val1','val2'],showSelectAll:true,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Toggle,{value:"val1",children:"Option 1"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Toggle,{value:"val2",children:"Option 2"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Toggle,{value:"val3",children:"Option 3"})]})]});};/* harmony default export */ const material = (MaterialPage);
;// CONCATENATED MODULE: ./src/app/routes.tsx
function AppRoutes(){return/*#__PURE__*/(0,jsx_runtime.jsxs)(Routes,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Route,{path:'',element:/*#__PURE__*/(0,jsx_runtime.jsx)(home,{})}),/*#__PURE__*/(0,jsx_runtime.jsx)(Route,{path:'material',element:/*#__PURE__*/(0,jsx_runtime.jsx)(material,{})}),/*#__PURE__*/(0,jsx_runtime.jsx)(Route,{path:'animations',element:/*#__PURE__*/(0,jsx_runtime.jsx)(animations,{})}),/*#__PURE__*/(0,jsx_runtime.jsx)(Route,{path:'images',element:/*#__PURE__*/(0,jsx_runtime.jsx)(pages_images,{})}),/*#__PURE__*/(0,jsx_runtime.jsx)(Route,{path:'bg-patterns',element:/*#__PURE__*/(0,jsx_runtime.jsx)(bg_patterns,{})})]});}
;// CONCATENATED MODULE: ./src/app/index.tsx
function App(){var nav=useNavigate();return/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:app_index_module.host,children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:app_index_module.sidepanel,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("button",{onClick:function onClick(){return nav('');},children:"Home"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{onClick:function onClick(){return nav('material');},children:"Material"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{onClick:function onClick(){return nav('animations');},children:"Animations"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{onClick:function onClick(){return nav('images');},children:"Images"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{onClick:function onClick(){return nav('bg-patterns');},children:"Background Patterns"})]}),/*#__PURE__*/(0,jsx_runtime.jsx)("scroll",{className:app_index_module.scroll,children:/*#__PURE__*/(0,jsx_runtime.jsx)("view",{className:app_index_module.content,children:/*#__PURE__*/(0,jsx_runtime.jsx)(AppRoutes,{})})})]});}Renderer.render(/*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense,{fallback:/*#__PURE__*/(0,jsx_runtime.jsx)("view",{children:"Loading"}),children:/*#__PURE__*/(0,jsx_runtime.jsx)(components_Provider,{store:store,children:/*#__PURE__*/(0,jsx_runtime.jsx)(PersistGate,{persistor:persistor,children:/*#__PURE__*/(0,jsx_runtime.jsx)(MemoryRouter,{initialEntries:['/'+location.hash.replace(/^#/,'')],initialIndex:0,children:/*#__PURE__*/(0,jsx_runtime.jsx)(App,{})})})})}));
;// CONCATENATED MODULE: ./src/index.tsx

})();

/******/ })()
;