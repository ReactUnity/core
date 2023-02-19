/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../material/dist/src/styles/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__("../../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__("../../../node_modules/style-loader/dist/runtime/insertBySelector.js");
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__("../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__("../../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__("../../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/styles/globals.scss
var globals = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/styles/globals.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/styles/globals.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(globals/* default */.Z, options);




       /* harmony default export */ const styles_globals = (globals/* default */.Z && globals/* default.locals */.Z.locals ? globals/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/styles/index.js

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../node_modules/css-loader/dist/runtime/api.js":
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

/***/ "../../../node_modules/css-loader/dist/runtime/noSourceMaps.js":
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "../../../node_modules/react-reconciler/cjs/react-reconciler-constants.production.min.js":
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

/***/ "../../../node_modules/react-reconciler/cjs/react-reconciler.production.min.js":
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
  var aa = __webpack_require__("../../../node_modules/react/index.js"),
    ba = __webpack_require__("../../../node_modules/scheduler/index.js"),
    ca = Object.assign;
  function m(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
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
    if (a.alternate) for (; b["return"];) b = b["return"];else {
      a = b;
      do b = a, 0 !== (b.flags & 4098) && (c = b["return"]), a = b["return"]; while (a);
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
        for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) h--;
        for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
          if (1 !== g || 1 !== h) {
            do if (g--, h--, 0 > h || e[g] !== f[h]) {
              var k = "\n" + e[g].replace(" at new ", " at ");
              a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
              return k;
            } while (1 <= g && 0 <= h);
          }
          break;
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
    for (f in c) e[f] = b[f];
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
    for (var e in d) if (!(e in b)) throw Error(m(108, va(a) || "Unknown", e));
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
    if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) c = 31 - tc(b), e = 1 << c, d |= a[c], b &= ~e;
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
    for (var b = [], c = 0; 31 > c; c++) b.push(a);
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
          do d = d(!0); while (null !== d);
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
    for (; a === dd;) dd = bd[--cd], bd[cd] = null, ed = bd[--cd], bd[cd] = null;
    for (; a === hd;) hd = fd[--gd], fd[gd] = null, jd = fd[--gd], fd[gd] = null, id = fd[--gd], fd[gd] = null;
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
    for (a = a["return"]; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) a = a["return"];
    od = a;
  }
  function yd(a) {
    if (!Va || a !== od) return !1;
    if (!F) return xd(a), F = !0, !1;
    if (3 !== a.tag && (5 !== a.tag || Zb(a.type) && !Na(a.type, a.memoizedProps))) {
      var b = pd;
      if (b) {
        if (vd(a)) throw zd(), Error(m(418));
        for (; b;) sd(a, b), b = Nb(b);
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
    for (var a = pd; a;) a = Nb(a);
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
      for (var c in a) void 0 === b[c] && (b[c] = a[c]);
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
    for (a = a["return"]; null !== a;) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a["return"];
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
        do g |= e.lane, e = e.next; while (e !== b);
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
      for (; null !== d;) b(c, d), d = d.sibling;
      return null;
    }
    function d(a, b) {
      for (a = new Map(); null !== b;) null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
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
        for (; u < h.length; u++) r = t(e, h[u], k), null !== r && (g = f(r, g, u), null === n ? l = r : n.sibling = r, n = r);
        F && kd(e, u);
        return l;
      }
      for (r = d(e, r); u < h.length; u++) E = B(r, e, u, h[u], k), null !== E && (a && null !== E.alternate && r["delete"](null === E.key ? u : E.key), g = f(E, g, u), null === n ? l = E : n.sibling = E, n = E);
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
        for (; !y.done; u++, y = h.next()) y = t(e, y.value, k), null !== y && (g = f(y, g, u), null === n ? l = y : n.sibling = y, n = y);
        F && kd(e, u);
        return l;
      }
      for (r = d(e, r); !y.done; u++, y = h.next()) y = B(r, e, u, y.value, k), null !== y && (a && null !== y.alternate && r["delete"](null === y.key ? u : y.key), g = f(y, g, u), null === n ? l = y : n.sibling = y, n = y);
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
    for (var c = 0; c < b.length && c < a.length; c++) if (!Vc(a[c], b[c])) return !1;
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
      do f = e.lane, K.lanes |= f, be |= f, e = e.next; while (e !== a);
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
      do f = a(f, g.action), g = g.next; while (g !== e);
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
      do c += Ed(d), d = d["return"]; while (d);
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
        for (e = null; null !== c;) a = c.alternate, null !== a && null === Ge(a) && (e = c), c = c.sibling;
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
      for (c["return"] = b; null !== a.sibling;) a = a.sibling, c = c.sibling = qe(a, a.pendingProps), c["return"] = b;
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
        for (var c = null; null !== b;) null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; null !== c;) null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
  }
  function Q(a) {
    var b = null !== a.alternate && a.alternate.child === a.child,
      c = 0,
      d = 0;
    if (b) for (var e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e["return"] = a, e = e.sibling;else for (e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e["return"] = a, e = e.sibling;
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
                for (c = b.child; null !== c;) d = c, e = a, d.flags &= 14680066, f = d.alternate, null === f ? (d.childLanes = 0, d.lanes = e, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = f.childLanes, d.lanes = f.lanes, d.child = f.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = f.memoizedProps, d.memoizedState = f.memoizedState, d.updateQueue = f.updateQueue, d.type = f.type, e = f.dependencies, d.dependencies = null === e ? null : {
                  lanes: e.lanes,
                  firstContext: e.firstContext
                }), c = c.sibling;
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
    for (T = b; null !== T;) if (a = T, b = a.child, 0 !== (a.subtreeFlags & 1028) && null !== b) b["return"] = a, T = b;else for (; null !== T;) {
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
    if (5 === d || 6 === d) a = a.stateNode, b ? pb(c, a, b) : kb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Tg(a, b, c), a = a.sibling; null !== a;) Tg(a, b, c), a = a.sibling;
  }
  function Ug(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? ob(c, a, b) : jb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Ug(a, b, c), a = a.sibling; null !== a;) Ug(a, b, c), a = a.sibling;
  }
  var V = null,
    Vg = !1;
  function Wg(a, b, c) {
    for (c = c.child; null !== c;) Xg(a, b, c), c = c.sibling;
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
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b;) ah(b, a), b = b.sibling;
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
          if ((S = k) && !l) for (T = e; null !== T;) g = T, k = g.child, 22 === g.tag && null !== g.memoizedState ? gh(e) : null !== k ? (k["return"] = g, T = k) : gh(e);
          for (; null !== f;) T = f, fh(f, b, c), f = f.sibling;
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
              for (; null != f && ph(d, f);) e++, f = b[e];
              if (e === b.length) {
                b = !0;
                break a;
              } else for (d = d.child; null !== d;) a.push(d, e), d = d.sibling;
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
        for (; null != g && ph(e, g);) f++, g = b[f];
        if (f === b.length) c.push(e);else for (e = e.child; null !== e;) a.push(e, f), e = e.sibling;
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
      if (5 === d.tag) fb(d) || b.push(d.stateNode);else for (d = d.child; null !== d;) a.push(d), d = d.sibling;
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
      do try {
        Th();
        break;
      } catch (h) {
        Uh(a, h);
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
      for (b = 0; b < Qd.length; b++) if (c = Qd[b], d = c.interleaved, null !== d) {
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
    do try {
      $h();
      break;
    } catch (e) {
      Uh(a, e);
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
    for (; null !== X;) ai(X);
  }
  function Th() {
    for (; null !== X && !Lc();) ai(X);
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
    do Ph(); while (null !== Eh);
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
    if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, {
      componentStack: e.stack,
      digest: e.digest
    });
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
            } else for (Va && (pd = Pb(b.stateNode.containerInfo), od = b, F = !0, rd = null, qd = !1), c = we(b, null, d, c), b.child = c; c;) c.flags = c.flags & -3 | 4096, c = c.sibling;
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
    for (var c = 0; c < b.length; c++) a.push(db(b[c]));
    for (b = a.length - 1; 0 < b; b--) {
      c = a[b];
      for (var d = c.x, e = d + c.width, f = c.y, g = f + c.height, h = b - 1; 0 <= h; h--) if (b !== h) {
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
        for (c = c.child; null !== c;) b.push(c), c = c.sibling;
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
      if (5 !== f.tag || !fb(f)) if (ph(f, h) && (d.push(qh(h)), g++, g > c && (c = g)), g < b.length) for (f = f.child; null !== f;) a.push(f, g), f = f.sibling;
    }
    if (c < b.length) {
      for (a = []; c < b.length; c++) a.push(qh(b[c]));
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

/***/ "../../../node_modules/react-reconciler/constants.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("../../../node_modules/react-reconciler/cjs/react-reconciler-constants.production.min.js");
} else {}

/***/ }),

/***/ "../../../node_modules/react-reconciler/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("../../../node_modules/react-reconciler/cjs/react-reconciler.production.min.js");
} else {}

/***/ }),

/***/ "../../../node_modules/react/cjs/react-jsx-runtime.production.min.js":
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


var f = __webpack_require__("../../../node_modules/react/index.js"),
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
  for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
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

/***/ "../../../node_modules/react/cjs/react.production.min.js":
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
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
    c.children = f;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
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
  } else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
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
    for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    g = Array(f);
    for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
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

/***/ "../../../node_modules/react/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("../../../node_modules/react/cjs/react.production.min.js");
} else {}

/***/ }),

/***/ "../../../node_modules/react/jsx-runtime.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("../../../node_modules/react/cjs/react-jsx-runtime.production.min.js");
} else {}

/***/ }),

/***/ "../../../node_modules/scheduler/cjs/scheduler.production.min.js":
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

/***/ "../../../node_modules/scheduler/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("../../../node_modules/scheduler/cjs/scheduler.production.min.js");
} else {}

/***/ }),

/***/ "../../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js":
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


var e = __webpack_require__("../../../node_modules/react/index.js");
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

/***/ "../../../node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.production.min.js":
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


var g = __webpack_require__("../../../node_modules/react/index.js");
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

/***/ "../../../node_modules/use-sync-external-store/shim/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("../../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js");
} else {}

/***/ }),

/***/ "../../../node_modules/use-sync-external-store/with-selector.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("../../../node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.production.min.js");
} else {}

/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/styles/globals.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".mat-elevation-0{box-shadow:none}.mat-elevation-1{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-2{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-3{box-shadow:0px 3px 3px -2px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-4{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-5{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-6{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-7{box-shadow:0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-8{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-9{box-shadow:0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-10{box-shadow:0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-11{box-shadow:0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-12{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-13{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-14{box-shadow:0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-15{box-shadow:0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-16{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-17{box-shadow:0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-18{box-shadow:0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-19{box-shadow:0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-20{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-21{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-22{box-shadow:0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-23{box-shadow:0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}:root{font-size:16px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/accordion/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".accordion_host__AAvIx{appearance:none;overflow:hidden;background-color:#fff;border-radius:4px}.accordion_header__O0HBa{flex-direction:row;justify-content:space-between;align-items:center;padding-top:16px;padding-bottom:16px;padding-left:16px;padding-right:16px;transition:padding-top 200ms,padding-bottom 200ms;cursor:pointer;pointer-events:all}.accordion_header__O0HBa icon{font-size:32px;transform-origin:center;transition:rotate 200ms}.accordion_expanded__c0Xzv .accordion_header__O0HBa{padding-top:20px;padding-bottom:20px}.accordion_expanded__c0Xzv .accordion_header__O0HBa icon{rotate:-180deg}.accordion_content__s010r{padding:16px;padding-top:6px}.accordion_expander__j-H4o{transition:height 200ms,opacity 200ms;overflow:hidden}.accordion_contentWrapper__A3B9i{top:0;left:0;position:absolute;flex-shrink:0;height:auto}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "accordion_host__AAvIx",
	"header": "accordion_header__O0HBa",
	"expanded": "accordion_expanded__c0Xzv",
	"content": "accordion_content__s010r",
	"expander": "accordion_expander__j-H4o",
	"contentWrapper": "accordion_contentWrapper__A3B9i"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/alert/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".alert_host__SQAIg .mat-modal-content{padding:18px;width:100%;max-width:400px}.alert_title__IALU-{font-size:1.2em;font-weight:500;margin-bottom:6px}.alert_title__IALU-+.alert_text__d6v\\+i{margin-top:8px}.alert_text__d6v\\+i{font-size:1em;margin-bottom:8px}.alert_error__cY2Km{font-size:1em;margin-top:8px;color:red}.alert_buttons__2J36g{margin-top:8px;display:flex;flex-direction:row;justify-content:flex-end}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "alert_host__SQAIg",
	"title": "alert_title__IALU-",
	"text": "alert_text__d6v+i",
	"error": "alert_error__cY2Km",
	"buttons": "alert_buttons__2J36g"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/button/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".button_host__43rxo{appearance:none;overflow:hidden;background-color:#fff;color:#000;border-radius:4px;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.button_host__43rxo.button_icon__re2ty{border-radius:50%;aspect-ratio:1}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "button_host__43rxo",
	"icon": "button_icon__re2ty"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/card/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".card_host__I\\+Qjd{appearance:none;overflow:hidden;background-color:#fff;border-radius:4px}.card_content__K3fVn{padding:16px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "card_host__I+Qjd",
	"content": "card_content__K3fVn"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/confirm/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".confirm_host__BPTgh .mat-modal-content{padding:18px;width:100%;max-width:400px}.confirm_title__ixCWc{font-size:1.2em;font-weight:500;margin-bottom:6px}.confirm_title__ixCWc+.confirm_text__zWuoa{margin-top:8px}.confirm_text__zWuoa{font-size:1em;margin-bottom:8px}.confirm_error__Lfh\\+W{font-size:1em;margin-top:8px;color:red}.confirm_buttons__9cBRu{margin-top:8px;display:flex;flex-direction:row;justify-content:flex-end}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "confirm_host__BPTgh",
	"title": "confirm_title__ixCWc",
	"text": "confirm_text__zWuoa",
	"error": "confirm_error__Lfh+W",
	"buttons": "confirm_buttons__9cBRu"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/input/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".input_host__IL9XF{font-size:16px;padding:14px 12px;position:relative;border-radius:6px;min-height:56px}.input_host__IL9XF.input_filled__VOudh{background-color:#e8e8e8;border-bottom:1px #000;border-bottom-left-radius:0;border-bottom-right-radius:0}.input_host__IL9XF.input_standard__BSHfe{border-bottom:1px #000;border-bottom-left-radius:0;border-bottom-right-radius:0}.input_host__IL9XF.input_standard__BSHfe .mat-input-field-target{padding-top:16px}.input_host__IL9XF.input_standard__BSHfe .input_placeholderContent__pWtXq{translate:0 8px}.input_host__IL9XF.input_float__60XjP .input_placeholderContent__pWtXq,.input_host__IL9XF.input_float-always__EE0zo .input_placeholderContent__pWtXq,.input_host__IL9XF.input_float-focus__V72QK:focus-within .input_placeholderContent__pWtXq{translate:1px -12px;scale:.75}.input_host__IL9XF.input_float__60XjP.input_filled__VOudh.input_hasPlaceholder__0RRJs .mat-input-field-target,.input_host__IL9XF.input_float-always__EE0zo.input_filled__VOudh.input_hasPlaceholder__0RRJs .mat-input-field-target,.input_host__IL9XF.input_float-focus__V72QK:focus-within.input_filled__VOudh.input_hasPlaceholder__0RRJs .mat-input-field-target{padding-top:18px}.input_host__IL9XF.input_float__60XjP.input_outlined__rQGER .input_placeholderContent__pWtXq,.input_host__IL9XF.input_float-always__EE0zo.input_outlined__rQGER .input_placeholderContent__pWtXq,.input_host__IL9XF.input_float-focus__V72QK:focus-within.input_outlined__rQGER .input_placeholderContent__pWtXq{background-color:#fff;translate:1px -26px}.input_host__IL9XF.input_float__60XjP.input_float-never__EFTl\\+ .input_placeholderContent__pWtXq{display:none}.input_content__hJDde{color:#000;caret-color:#000;border:none;background-color:none;margin:0;position:absolute;left:0;right:0;top:0;bottom:0;border-radius:inherit}.input_inputFrame__aodhf{position:absolute;left:0;right:0;top:0;bottom:0;border:1px solid;border-radius:6px;pointer-events:none;border-color:#000}.input_content__hJDde:focus-within~.input_inputFrame__aodhf{border-color:#000;border-width:2px}.input_placeholder__XI-aS{pointer-events:none;position:relative;white-space:nowrap;flex-grow:1;flex-direction:row;align-items:center}.input_placeholderGhost__MUj3y{opacity:0}.input_placeholderText__5qwnY{color:#000;opacity:.7}.input_content__hJDde:focus-within~.input_placeholder__XI-aS .input_placeholderText__5qwnY{color:#000;opacity:1}.input_placeholderContent__pWtXq{position:absolute;padding:0 4px;transition:translate 200ms ease-out,scale 200ms ease-out,background-color 200ms ease-out;transform-origin:left;left:-4px;border-radius:4px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "input_host__IL9XF",
	"filled": "input_filled__VOudh",
	"standard": "input_standard__BSHfe",
	"placeholderContent": "input_placeholderContent__pWtXq",
	"float": "input_float__60XjP",
	"float-always": "input_float-always__EE0zo",
	"float-focus": "input_float-focus__V72QK",
	"hasPlaceholder": "input_hasPlaceholder__0RRJs",
	"outlined": "input_outlined__rQGER",
	"float-never": "input_float-never__EFTl+",
	"content": "input_content__hJDde",
	"inputFrame": "input_inputFrame__aodhf",
	"placeholder": "input_placeholder__XI-aS",
	"placeholderGhost": "input_placeholderGhost__MUj3y",
	"placeholderText": "input_placeholderText__5qwnY"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/modal/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal_host__KDlgn{z-index:1000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;background-color:rgba(0,0,0,.45);overflow:auto;overscroll-behavior:contain;position:absolute;left:0;right:0;top:0;bottom:0;min-width:100%;min-height:100%}.modal_host__KDlgn.modal_opened__2BGlE{animation:modal_appearAnim__yFYQt 400ms both}.modal_host__KDlgn:not(.modal_opened__2BGlE){pointer-events:none}.modal_host__KDlgn.modal_closed__IYWxS{animation:modal_closeAnim__fxrV\\+ 200ms both}.modal_host__KDlgn:after{content:\"\";opacity:0;flex-grow:0;flex-shrink:1;flex-basis:30%}@keyframes modal_appearAnim__yFYQt{from{opacity:0}to{opacity:1}}@keyframes modal_closeAnim__fxrV\\+{from{opacity:1}to{opacity:0}}.modal_content__TYdOO{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0,0,0,.12);font-size:1rem;box-sizing:border-box;position:relative;z-index:1001;background-color:#fff;border-radius:4px;white-space:pre-wrap;margin:auto}.modal_close__Y3uXt{border-radius:50%;background-color:#bfbcbc;color:#000;box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);position:absolute;transform:translate(50%, -50%) scale(0.8);padding:4px;right:2px;top:2px;display:flex}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "modal_host__KDlgn",
	"opened": "modal_opened__2BGlE",
	"appearAnim": "modal_appearAnim__yFYQt",
	"closed": "modal_closed__IYWxS",
	"closeAnim": "modal_closeAnim__fxrV+",
	"content": "modal_content__TYdOO",
	"close": "modal_close__Y3uXt"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/paper/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".paper_host__GWkzZ{appearance:none;overflow:hidden;background-color:#fff;border-radius:4px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "paper_host__GWkzZ"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/prompt/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".prompt_host__eJa7J .mat-modal-content{padding:18px;width:100%;max-width:400px}.prompt_title__San5y{font-size:1.2em;font-weight:500;margin-bottom:6px}.prompt_title__San5y+.prompt_text__LMOUf{margin-top:8px}.prompt_text__LMOUf{font-size:1em;margin-bottom:8px}.prompt_error__ookfS{font-size:1em;margin-top:8px;color:red}.prompt_buttons__YGilI{margin-top:8px;display:flex;flex-direction:row;justify-content:flex-end}.prompt_input__dL2ld{font-size:1em;margin-top:8px;margin-bottom:8px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "prompt_host__eJa7J",
	"title": "prompt_title__San5y",
	"text": "prompt_text__LMOUf",
	"error": "prompt_error__ookfS",
	"buttons": "prompt_buttons__YGilI",
	"input": "prompt_input__dL2ld"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/ripple/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ripple_rippleParent__KQG5f{overflow:hidden}.ripple_ripple__q\\+owa{pointer-events:none;border-radius:50%;background-color:rgba(0,0,0,.1);position:absolute;transition:opacity 300ms ease-out,scale 450ms cubic-bezier(0, 0, 0.2, 1);translate:-50% -50%;scale:1}.ripple_ripple__q\\+owa:enter{scale:0}.ripple_ripple__q\\+owa:leave{opacity:0;transition:opacity 400ms ease-out,scale 450ms cubic-bezier(0, 0, 0.2, 1);state-duration:400ms}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"rippleParent": "ripple_rippleParent__KQG5f",
	"ripple": "ripple_ripple__q+owa"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/select/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".select_host__I4Iat.select_chips__ETidb .select_triggerPart__Mhm7Z{font-size:.8125rem;margin:4px 4px 2px 4px;height:24px;background-color:rgba(0,0,0,.12);border-radius:12px;padding:4px 8px;text-align:center}.select_host__I4Iat.select_chips__ETidb .select_triggerContent__Fobc3{margin-left:-4px}.select_triggerContent__Fobc3{flex-direction:row;align-items:center;justify-content:flex-start}.select_trigger__1ni6-{font-size:1em;flex:1 1 0;overflow:hidden;text-align:left;padding:0 12px;border:none;appearance:none;background-color:none;border-radius:0;pointer-events:all;flex-direction:row;align-items:center;justify-content:flex-start}.select_menuRoot__sx32T{position:absolute;left:0;right:0;bottom:-1px;height:0;z-index:10000;translate:0 -20px;opacity:0;display:none;transition:translate 300ms ease-out,opacity 300ms ease-out,display 300ms step-end;pointer-events:none}.select_menuRoot__sx32T.select_opened__3n-3-{transition:translate 300ms ease-out,opacity 300ms ease-out,display 300ms step-start;display:flex;translate:0 0;opacity:1;pointer-events:auto}.select_backdrop__8IwS1{position:absolute;top:-5000px;right:-5000px;bottom:-5000px;left:-5000px;background-color:rgba(0,0,0,0);cursor:default;pointer-events:all}.select_menu__7u0ws{position:absolute;top:100%;left:0;minwidth:100%;background-color:#fff;max-height:60vh}.select_option__WJfAF{border-radius:0;text-align:left;flex-direction:row;align-items:center;justify-content:flex-start;min-height:48px}.select_option__WJfAF.select_selected__8VEDK{background-color:rgba(0,0,0,.06)}.select_option__WJfAF .select_toggle__UScLL{pointer-events:none}.select_caret__zd8yA{pointer-events:none;align-items:center;justify-content:center;padding:8px;position:absolute;right:12px;top:50%;translate:0 -50%;width:36px;height:36px;line-height:20px;transition:rotate 300ms}.select_host__I4Iat.select_opened__3n-3- .select_caret__zd8yA{rotate:180deg}.select_defaultSeparator__3VaZB{margin-right:.4em}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "select_host__I4Iat",
	"chips": "select_chips__ETidb",
	"triggerPart": "select_triggerPart__Mhm7Z",
	"triggerContent": "select_triggerContent__Fobc3",
	"trigger": "select_trigger__1ni6-",
	"menuRoot": "select_menuRoot__sx32T",
	"opened": "select_opened__3n-3-",
	"backdrop": "select_backdrop__8IwS1",
	"menu": "select_menu__7u0ws",
	"option": "select_option__WJfAF",
	"selected": "select_selected__8VEDK",
	"toggle": "select_toggle__UScLL",
	"caret": "select_caret__zd8yA",
	"defaultSeparator": "select_defaultSeparator__3VaZB"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/slider/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{--mat-slider-color: cornflowerblue}.slider_host__QngDt{height:20px;width:200px;margin:20px;transform-origin:50% 50%;navigation:vertical;cursor:pointer}.slider_host__QngDt[orientation=vertical]{width:20px;height:200px;navigation:horizontal}.slider_host__QngDt .slider_track__LWAGS{position:absolute;left:0;right:0;top:25%;bottom:25%;background-color:#c7c7c7;border-radius:4px;border-width:1px;flex-direction:row}.slider_host__QngDt[orientation=vertical] .slider_track__LWAGS{left:25%;right:25%;top:0;bottom:0;flex-direction:column-reverse}.slider_host__QngDt[direction=horizontal-reverse] .slider_track__LWAGS,.slider_host__QngDt[direction=vertical-reverse] .slider_track__LWAGS{justify-content:flex-end}.slider_host__QngDt .slider_fill__2De\\+O{background-color:#ebebeb;width:100%;height:100%}.slider_host__QngDt .slider_thumbContainer__28Lbu{background-color:rgba(0,0,0,0);position:absolute;width:0;height:0}.slider_host__QngDt[direction=horizontal] .slider_thumbContainer__28Lbu{top:50%;right:0}.slider_host__QngDt[direction=horizontal-reverse] .slider_thumbContainer__28Lbu{top:50%;left:0}.slider_host__QngDt[direction=vertical] .slider_thumbContainer__28Lbu{left:50%;top:0}.slider_host__QngDt[direction=vertical-reverse] .slider_thumbContainer__28Lbu{left:50%;bottom:0}.slider_host__QngDt .slider_thumb__HCBio{align-items:center;border-radius:20px;height:20px;width:20px;position:absolute;transform-origin:center;translate:-50% -50%;border-width:1px;border-color:var(--mat-slider-color);background-color:#ebebeb}.slider_host__QngDt[orientation=horizontal] .slider_thumb__HCBio{flex-direction:column}.slider_host__QngDt[orientation=vertical] .slider_thumb__HCBio{flex-direction:row}.slider_host__QngDt:hover .slider_thumb__HCBio{background-color:#ebebeb}.slider_host__QngDt:focus .slider_thumb__HCBio{background-color:#fafafa}.slider_host__QngDt:active .slider_thumb__HCBio{background-color:#dbdbdb}.slider_host__QngDt[readonly]{cursor:default}.slider_host__QngDt[readonly] .slider_thumb__HCBio{background-color:#ebebeb}.slider_host__QngDt .slider_value__1h-iz{position:absolute;margin:5px}.slider_host__QngDt[cursor=center] .slider_value__1h-iz{inset:0}.slider_host__QngDt[cursor=above] .slider_value__1h-iz,.slider_host__QngDt[cursor=auto][orientation=horizontal] .slider_value__1h-iz{bottom:100%;text-align:bottom}.slider_host__QngDt[cursor=below] .slider_value__1h-iz{top:100%;text-align:top}.slider_host__QngDt[cursor=left] .slider_value__1h-iz{right:100%;text-align:left}.slider_host__QngDt[cursor=right] .slider_value__1h-iz,.slider_host__QngDt[cursor=auto][orientation=vertical] .slider_value__1h-iz{left:100%;text-align:right}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "slider_host__QngDt",
	"track": "slider_track__LWAGS",
	"fill": "slider_fill__2De+O",
	"thumbContainer": "slider_thumbContainer__28Lbu",
	"thumb": "slider_thumb__HCBio",
	"value": "slider_value__1h-iz"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/text/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".text_host__2bD3M .text_input__kdaVY{border:none;appearance:none;background-color:none;font-size:1em;flex:1 1 0;overflow:hidden;text-align:left;padding:0 12px}.text_host__2bD3M.text_filled__gaJ8r .text_input__kdaVY{border:none;margin:0}.text_passwordToggle__10unI{align-items:center;justify-content:center;cursor:pointer;overflow:hidden;flex:0 0 auto;padding:8px;position:absolute;right:12px;top:50%;translate:0 -50%;background-color:rgba(0,0,0,0);box-shadow:none}.text_passwordToggle__10unI icon{width:20px;height:20px;line-height:20px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "text_host__2bD3M",
	"input": "text_input__kdaVY",
	"filled": "text_filled__gaJ8r",
	"passwordToggle": "text_passwordToggle__10unI"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/toggle/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".toggle_label__L4aQK{flex-direction:row;align-items:center}.toggle_label__L4aQK:hover .toggle_toggle__1OFgA .toggle_ring__T7w-Z{scale:1}.toggle_toggle__1OFgA{appearance:none;overflow:visible;border-radius:4px;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);color:#000;border:2px #000;background-color:rgba(0,0,0,0);box-shadow:none;width:20px}.toggle_toggle__1OFgA .toggle_ring__T7w-Z{position:absolute;border-radius:50%;inset:-70%;background-color:rgba(0,0,0,.08);scale:0;transition:scale .16s;overflow:hidden}.toggle_selectAllToggle__Y0Yxx{margin-bottom:4px}.toggle_label__L4aQK.toggle_radio__5UgPC .toggle_toggle__1OFgA{border-radius:50%}.toggle_label__L4aQK.toggle_radio__5UgPC .toggle_toggle__1OFgA:checked:not(:indeterminate):after{background-image:url(res:ReactUnity/sprites/radio)}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"label": "toggle_label__L4aQK",
	"toggle": "toggle_toggle__1OFgA",
	"ring": "toggle_ring__T7w-Z",
	"selectAllToggle": "toggle_selectAllToggle__Y0Yxx",
	"radio": "toggle_radio__5UgPC"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/tooltip/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".tooltip_anchor__75ToP{position:absolute;inset:0;z-index:30000;pointer-events:none;transition:opacity 400ms ease-out;flex-direction:row}.tooltip_anchor__75ToP.tooltip_interactive__tfdps{pointer-events:auto}.tooltip_anchor__75ToP:enter{opacity:0}.tooltip_anchor__75ToP:leave{opacity:0;transition:opacity 200ms ease-in;state-duration:200ms}.tooltip_tooltip__TpWPV{border-radius:6px;background-color:#4e4e4e;color:#fff;position:absolute;left:0;top:0;translate:-50% 50%;flex-direction:row;align-items:center;justify-content:flex-start;min-width:40px;min-height:24px;padding:6px 10px}.tooltip_backdrop__r9iH5{pointer-events:all;cursor:default;position:absolute;inset:0;z-index:29999}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"anchor": "tooltip_anchor__75ToP",
	"interactive": "tooltip_interactive__tfdps",
	"tooltip": "tooltip_tooltip__TpWPV",
	"backdrop": "tooltip_backdrop__r9iH5"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
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

/***/ "../../../node_modules/style-loader/dist/runtime/insertBySelector.js":
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

/***/ "../../../node_modules/style-loader/dist/runtime/insertStyleElement.js":
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

/***/ "../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
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

/***/ "../../../node_modules/style-loader/dist/runtime/styleDomAPI.js":
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

/***/ "../../../node_modules/style-loader/dist/runtime/styleTagTransform.js":
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
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

// NAMESPACE OBJECT: ../../../material/dist/index.js
var dist_namespaceObject = {};
__webpack_require__.r(dist_namespaceObject);
__webpack_require__.d(dist_namespaceObject, {
  "Accordion": () => (Accordion),
  "AlertDialog": () => (AlertDialog),
  "Button": () => (Button),
  "Card": () => (Card),
  "ConfirmDialog": () => (ConfirmDialog),
  "FixedSizeGrid": () => (FixedSizeGrid),
  "FixedSizeList": () => (FixedSizeList),
  "InputField": () => (InputField),
  "Modal": () => (Modal),
  "Paper": () => (Paper),
  "PromptDialog": () => (PromptDialog),
  "Select": () => (Select),
  "Slider": () => (Slider),
  "TextField": () => (TextField),
  "Toggle": () => (Toggle),
  "ToggleGroup": () => (ToggleGroup),
  "VariableSizeGrid": () => (VariableSizeGrid),
  "VariableSizeList": () => (VariableSizeList),
  "addRipple": () => (addRipple),
  "useDataTooltip": () => (useDataTooltip),
  "useRipple": () => (useRipple),
  "useTooltip": () => (useTooltip)
});

// NAMESPACE OBJECT: ../../../renderer/dist/index.js
var renderer_dist_namespaceObject = {};
__webpack_require__.r(renderer_dist_namespaceObject);
__webpack_require__.d(renderer_dist_namespaceObject, {
  "GlobalsProvider": () => (GlobalsProvider),
  "Renderer": () => (Renderer),
  "batchedUpdates": () => (batchedUpdates),
  "createDictionaryWatcher": () => (createDictionaryWatcher),
  "flushSync": () => (flushSync),
  "icon": () => (icon),
  "render": () => (_render),
  "unstable_batchedUpdates": () => (batchedUpdates),
  "useGlobals": () => (useGlobals),
  "useGlobalsContext": () => (useGlobalsContext),
  "useGlobalsSelector": () => (useGlobalsSelector),
  "useReactiveValue": () => (useReactiveValue)
});

// NAMESPACE OBJECT: ../../../renderer/dist/webgl-compat.js
var dist_webgl_compat_namespaceObject = {};
__webpack_require__.r(dist_webgl_compat_namespaceObject);
__webpack_require__.d(dist_webgl_compat_namespaceObject, {
  "Unity": () => (Unity),
  "useUnityContext": () => (useUnityContext)
});

// EXTERNAL MODULE: ../../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("../../../node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ../../../node_modules/clsx/dist/clsx.m.js
function r(e) {
  var t,
    f,
    n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;else if ("object" == typeof e) if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);else for (t in e) e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length;) (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
/* harmony default export */ const clsx_m = (clsx);
// EXTERNAL MODULE: ../../../node_modules/react/index.js
var react = __webpack_require__("../../../node_modules/react/index.js");
;// CONCATENATED MODULE: ../../../material/dist/src/util/helpers.js

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
//# sourceMappingURL=helpers.js.map
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__("../../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__("../../../node_modules/style-loader/dist/runtime/insertBySelector.js");
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__("../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__("../../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__("../../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/accordion/index.module.scss
var index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/accordion/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/accordion/index.module.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(index_module/* default */.Z, options);




       /* harmony default export */ const accordion_index_module = (index_module/* default */.Z && index_module/* default.locals */.Z.locals ? index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/accordion/index.js
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
    props = __rest(_a, ["children", "className", "elevation"]);
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
  return (0,jsx_runtime.jsxs)("view", __assign({
    name: "<Accordion>",
    className: clsx_m(className, accordion_index_module.host, opened && [accordion_index_module.expanded, 'mat-expanded'], getElevationClass(elevation), 'mat-accordion')
  }, props, {
    children: [(0,jsx_runtime.jsxs)("view", __assign({
      name: "<AccordionHeader>",
      className: clsx_m(accordion_index_module.header, 'mat-accordion-header'),
      onPointerClick: function onPointerClick() {
        return setOpened(function (x) {
          return !x;
        });
      }
    }, {
      children: [summary, (0,jsx_runtime.jsx)("icon", {
        children: "expand_more"
      })]
    })), (0,jsx_runtime.jsx)("view", __assign({
      className: clsx_m(accordion_index_module.expander, 'mat-accordion-expander'),
      ref: expanderRef,
      style: expanderBaseStyle
    }, {
      children: (0,jsx_runtime.jsx)("view", __assign({
        onResize: onResize,
        ref: wrapperRef,
        className: accordion_index_module.contentWrapper
      }, {
        children: content
      }))
    }))]
  }));
}
function _Summary(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0,jsx_runtime.jsx)("view", __assign({
    name: "<Accordion.Summary>",
    className: clsx_m(className, accordion_index_module.summary, 'mat-accordion-summary')
  }, props));
}
function _Content(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0,jsx_runtime.jsx)("view", __assign({
    name: "<Accordion.Content>",
    className: clsx_m(className, accordion_index_module.content, 'mat-accordion-content')
  }, props));
}
var Accordion = react.memo(_Accordion);
Accordion.Summary = _Summary;
Accordion.Content = _Content;
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/ripple/index.module.scss
var ripple_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/ripple/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/ripple/index.module.scss

      
      
      
      
      
      
      
      
      

var index_module_options = {};

index_module_options.styleTagTransform = (styleTagTransform_default());
index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      index_module_options.insert = insertBySelector_default().bind(null, "head");
    
index_module_options.domAPI = (styleDomAPI_default());
index_module_options.insertStyleElement = (insertStyleElement_default());

var index_module_update = injectStylesIntoStyleTag_default()(ripple_index_module/* default */.Z, index_module_options);




       /* harmony default export */ const src_ripple_index_module = (ripple_index_module/* default */.Z && ripple_index_module/* default.locals */.Z.locals ? ripple_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/ripple/index.js


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
    ripple.Style.Set('position', 'inset');
    ripple.Style.Set('left', '50%');
    ripple.Style.Set('top', '50%');
    ripple.Style.Set('width', maxDimension);
    ripple.Style.Set('height', maxDimension);
  }
  containerElement.ClassList.Add(src_ripple_index_module.rippleParent);
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
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/button/index.module.scss
var button_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/button/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/button/index.module.scss

      
      
      
      
      
      
      
      
      

var button_index_module_options = {};

button_index_module_options.styleTagTransform = (styleTagTransform_default());
button_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      button_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
button_index_module_options.domAPI = (styleDomAPI_default());
button_index_module_options.insertStyleElement = (insertStyleElement_default());

var button_index_module_update = injectStylesIntoStyleTag_default()(button_index_module/* default */.Z, button_index_module_options);




       /* harmony default export */ const src_button_index_module = (button_index_module/* default */.Z && button_index_module/* default.locals */.Z.locals ? button_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/button/index.js
var button_assign = undefined && undefined.__assign || function () {
  button_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return button_assign.apply(this, arguments);
};
var button_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
  }));
});
var Button = react.memo(_Button);
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/util/hooks/use-root-class.js


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
//# sourceMappingURL=use-root-class.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/modal/index.module.scss
var modal_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/modal/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/modal/index.module.scss

      
      
      
      
      
      
      
      
      

var modal_index_module_options = {};

modal_index_module_options.styleTagTransform = (styleTagTransform_default());
modal_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      modal_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
modal_index_module_options.domAPI = (styleDomAPI_default());
modal_index_module_options.insertStyleElement = (insertStyleElement_default());

var modal_index_module_update = injectStylesIntoStyleTag_default()(modal_index_module/* default */.Z, modal_index_module_options);




       /* harmony default export */ const src_modal_index_module = (modal_index_module/* default */.Z && modal_index_module/* default.locals */.Z.locals ? modal_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/modal/index.js
var modal_assign = undefined && undefined.__assign || function () {
  modal_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
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
        })
      }))]
    }))
  }));
}
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/alert/index.module.scss
var alert_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/alert/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/alert/index.module.scss

      
      
      
      
      
      
      
      
      

var alert_index_module_options = {};

alert_index_module_options.styleTagTransform = (styleTagTransform_default());
alert_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      alert_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
alert_index_module_options.domAPI = (styleDomAPI_default());
alert_index_module_options.insertStyleElement = (insertStyleElement_default());

var alert_index_module_update = injectStylesIntoStyleTag_default()(alert_index_module/* default */.Z, alert_index_module_options);




       /* harmony default export */ const src_alert_index_module = (alert_index_module/* default */.Z && alert_index_module/* default.locals */.Z.locals ? alert_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/alert/index.js
var alert_assign = undefined && undefined.__assign || function () {
  alert_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return alert_assign.apply(this, arguments);
};
var alert_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
    })), text && (0,jsx_runtime.jsx)("div", alert_assign({
      className: clsx_m('mat-alert-dialog-text', src_alert_index_module.text)
    }, {
      children: text
    })), button && (0,jsx_runtime.jsx)("div", alert_assign({
      className: clsx_m('mat-alert-dialog-buttons', src_alert_index_module.buttons)
    }, {
      children: (0,jsx_runtime.jsx)(Button, alert_assign({
        className: clsx_m(src_alert_index_module.button),
        onClick: function onClick() {
          return onClose();
        }
      }, {
        children: button
      }))
    }))]
  }));
}
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/card/index.module.scss
var card_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/card/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/card/index.module.scss

      
      
      
      
      
      
      
      
      

var card_index_module_options = {};

card_index_module_options.styleTagTransform = (styleTagTransform_default());
card_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      card_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
card_index_module_options.domAPI = (styleDomAPI_default());
card_index_module_options.insertStyleElement = (insertStyleElement_default());

var card_index_module_update = injectStylesIntoStyleTag_default()(card_index_module/* default */.Z, card_index_module_options);




       /* harmony default export */ const src_card_index_module = (card_index_module/* default */.Z && card_index_module/* default.locals */.Z.locals ? card_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/card/index.js
var card_assign = undefined && undefined.__assign || function () {
  card_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return card_assign.apply(this, arguments);
};
var card_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
  }));
}
function card_Content(_a) {
  var className = _a.className,
    props = card_rest(_a, ["className"]);
  return (0,jsx_runtime.jsx)("view", card_assign({
    name: "<Card.Content>",
    className: clsx_m(className, src_card_index_module.content, 'mat-card-content')
  }, props));
}
var Card = react.memo(_Card);
Card.Content = card_Content;
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/confirm/index.module.scss
var confirm_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/confirm/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/confirm/index.module.scss

      
      
      
      
      
      
      
      
      

var confirm_index_module_options = {};

confirm_index_module_options.styleTagTransform = (styleTagTransform_default());
confirm_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      confirm_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
confirm_index_module_options.domAPI = (styleDomAPI_default());
confirm_index_module_options.insertStyleElement = (insertStyleElement_default());

var confirm_index_module_update = injectStylesIntoStyleTag_default()(confirm_index_module/* default */.Z, confirm_index_module_options);




       /* harmony default export */ const src_confirm_index_module = (confirm_index_module/* default */.Z && confirm_index_module/* default.locals */.Z.locals ? confirm_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/confirm/index.js
var confirm_assign = undefined && undefined.__assign || function () {
  confirm_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return confirm_assign.apply(this, arguments);
};
var confirm_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
    })), text && (0,jsx_runtime.jsx)("div", confirm_assign({
      className: clsx_m('mat-confirm-dialog-text', src_confirm_index_module.text)
    }, {
      children: text
    })), error && (0,jsx_runtime.jsx)("div", confirm_assign({
      className: clsx_m('mat-modal-dialog-error', src_confirm_index_module.error)
    }, {
      children: error
    })), (buttons === null || buttons === void 0 ? void 0 : buttons.length) > 0 && (0,jsx_runtime.jsx)("div", confirm_assign({
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
    }))]
  }));
}
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/input/index.module.scss
var input_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/input/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/input/index.module.scss

      
      
      
      
      
      
      
      
      

var input_index_module_options = {};

input_index_module_options.styleTagTransform = (styleTagTransform_default());
input_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      input_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
input_index_module_options.domAPI = (styleDomAPI_default());
input_index_module_options.insertStyleElement = (insertStyleElement_default());

var input_index_module_update = injectStylesIntoStyleTag_default()(input_index_module/* default */.Z, input_index_module_options);




       /* harmony default export */ const src_input_index_module = (input_index_module/* default */.Z && input_index_module/* default.locals */.Z.locals ? input_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/input/index.js
var input_assign = undefined && undefined.__assign || function () {
  input_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return input_assign.apply(this, arguments);
};
var input_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
    })), variant === 'outlined' && (0,jsx_runtime.jsx)("view", {
      className: clsx_m(src_input_index_module.inputFrame, 'mat-input-frame')
    }), !!placeholder && (0,jsx_runtime.jsxs)("view", input_assign({
      className: clsx_m(src_input_index_module.placeholder, 'mat-input-placeholder')
    }, {
      children: [(0,jsx_runtime.jsx)("view", input_assign({
        className: clsx_m(src_input_index_module.placeholderGhost, 'mat-input-placeholder-ghost')
      }, {
        children: placeholder
      })), (0,jsx_runtime.jsx)("view", input_assign({
        className: clsx_m(src_input_index_module.placeholderContent, 'mat-input-placeholder-content')
      }, {
        children: (0,jsx_runtime.jsx)("view", input_assign({
          className: clsx_m(src_input_index_module.placeholderText, 'mat-input-placeholder-text')
        }, {
          children: placeholder
        }))
      }))]
    }))]
  }));
});
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/paper/index.module.scss
var paper_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/paper/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/paper/index.module.scss

      
      
      
      
      
      
      
      
      

var paper_index_module_options = {};

paper_index_module_options.styleTagTransform = (styleTagTransform_default());
paper_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      paper_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
paper_index_module_options.domAPI = (styleDomAPI_default());
paper_index_module_options.insertStyleElement = (insertStyleElement_default());

var paper_index_module_update = injectStylesIntoStyleTag_default()(paper_index_module/* default */.Z, paper_index_module_options);




       /* harmony default export */ const src_paper_index_module = (paper_index_module/* default */.Z && paper_index_module/* default.locals */.Z.locals ? paper_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/paper/index.js
var paper_assign = undefined && undefined.__assign || function () {
  paper_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return paper_assign.apply(this, arguments);
};
var paper_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
  }));
}
var Paper = react.memo(_Paper);
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/text/index.module.scss
var text_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/text/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/text/index.module.scss

      
      
      
      
      
      
      
      
      

var text_index_module_options = {};

text_index_module_options.styleTagTransform = (styleTagTransform_default());
text_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      text_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
text_index_module_options.domAPI = (styleDomAPI_default());
text_index_module_options.insertStyleElement = (insertStyleElement_default());

var text_index_module_update = injectStylesIntoStyleTag_default()(text_index_module/* default */.Z, text_index_module_options);




       /* harmony default export */ const src_text_index_module = (text_index_module/* default */.Z && text_index_module/* default.locals */.Z.locals ? text_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/text/index.js
var text_assign = undefined && undefined.__assign || function () {
  text_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return text_assign.apply(this, arguments);
};
var text_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
    }, inputProps)), isPassword && (0,jsx_runtime.jsx)(Button, text_assign({
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
      })
    }))]
  }));
});
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/prompt/index.module.scss
var prompt_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/prompt/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/prompt/index.module.scss

      
      
      
      
      
      
      
      
      

var prompt_index_module_options = {};

prompt_index_module_options.styleTagTransform = (styleTagTransform_default());
prompt_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      prompt_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
prompt_index_module_options.domAPI = (styleDomAPI_default());
prompt_index_module_options.insertStyleElement = (insertStyleElement_default());

var prompt_index_module_update = injectStylesIntoStyleTag_default()(prompt_index_module/* default */.Z, prompt_index_module_options);




       /* harmony default export */ const src_prompt_index_module = (prompt_index_module/* default */.Z && prompt_index_module/* default.locals */.Z.locals ? prompt_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/prompt/index.js
var prompt_assign = undefined && undefined.__assign || function () {
  prompt_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return prompt_assign.apply(this, arguments);
};
var prompt_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
    })), text && (0,jsx_runtime.jsx)("div", prompt_assign({
      className: clsx_m('mat-prompt-dialog-text', src_prompt_index_module.text)
    }, {
      children: text
    })), (0,jsx_runtime.jsx)(TextField, prompt_assign({
      className: clsx_m('mat-prompt-dialog-input', src_prompt_index_module.input),
      placeholder: placeholder,
      ref: inputRef
    }, inputProps)), error && (0,jsx_runtime.jsx)("div", prompt_assign({
      className: clsx_m('mat-prompt-dialog-error', src_prompt_index_module.error)
    }, {
      children: error
    })), (0,jsx_runtime.jsxs)("div", prompt_assign({
      className: clsx_m('mat-prompt-dialog-buttons', src_prompt_index_module.buttons)
    }, {
      children: [(0,jsx_runtime.jsx)(Button, prompt_assign({
        onClick: function onClick() {
          return onClose(inputRef.current.Value, false);
        }
      }, {
        children: cancel || 'Cancel'
      })), (0,jsx_runtime.jsx)(Button, prompt_assign({
        onClick: function onClick() {
          return onClose(inputRef.current.Value, true);
        },
        "data-temp-disabled": submitting
      }, {
        children: submit || 'Submit'
      }))]
    }))]
  }));
}
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/util/hooks/use-auto-ref.js

function useAutoRef(value) {
  var ref = (0,react.useRef)(value);
  (0,react.useLayoutEffect)(function () {
    ref.current = value;
  });
  return ref;
}
//# sourceMappingURL=use-auto-ref.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/util/selection.js
;
var SelectionState = /** @class */function () {
  function SelectionState(allowMultiple, initialValue) {
    this.allowMultiple = allowMultiple;
    this.initialValue = initialValue;
    this.elements = [];
    this.value = initialValue || (allowMultiple ? [] : undefined);
    if (this.allowMultiple) {
      if (!Array.isArray(this.value)) this.value = [this.value];
      this.any = this.all = this.value.length > 0;
    } else {
      this.any = this.all = !!this.value;
    }
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
    if (typeof el.value !== 'undefined') {
      if (this.allowMultiple && Array.isArray(this.value)) el.selected = this.value.includes(el.value);else el.selected = this.value === el.value;
    }
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
    return function () {
      _this.unregister(el);
    };
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
    if (!this.allowMultiple && checked) throw new Error('Multiple values cannot be selected for this selection state');
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
      var isSelected = typeof el.value !== 'undefined' && (this.allowMultiple && Array.isArray(this.value) ? this.value.includes(el.value) : this.value === el.value);
      if (isSelected) res.push(el);
    }
    return res;
  };
  return SelectionState;
}();

//# sourceMappingURL=selection.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/toggle/index.module.scss
var toggle_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/toggle/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/toggle/index.module.scss

      
      
      
      
      
      
      
      
      

var toggle_index_module_options = {};

toggle_index_module_options.styleTagTransform = (styleTagTransform_default());
toggle_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      toggle_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
toggle_index_module_options.domAPI = (styleDomAPI_default());
toggle_index_module_options.insertStyleElement = (insertStyleElement_default());

var toggle_index_module_update = injectStylesIntoStyleTag_default()(toggle_index_module/* default */.Z, toggle_index_module_options);




       /* harmony default export */ const src_toggle_index_module = (toggle_index_module/* default */.Z && toggle_index_module/* default.locals */.Z.locals ? toggle_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/toggle/index.js
var toggle_assign = undefined && undefined.__assign || function () {
  toggle_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return toggle_assign.apply(this, arguments);
};
var toggle_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};







var ToggleGroupContext = react.createContext(null);
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
        var _a;
        return (_a = toggleRef.current) === null || _a === void 0 ? void 0 : _a.Checked;
      },
      set selected(val) {
        if (toggleRef.current) toggleRef.current.Checked = val;
      },
      get value() {
        var _a;
        return (_a = toggleRef.current) === null || _a === void 0 ? void 0 : _a.Value;
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
  }, [ctx, ref]);
  (0,react.useLayoutEffect)(function () {
    return ctx === null || ctx === void 0 ? void 0 : ctx.register(selectionRef);
  }, [ctx, selectionRef]);
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
      })
    })), !!children && (0,jsx_runtime.jsx)("view", toggle_assign({
      className: clsx_m(src_toggle_index_module.labelContent, 'mat-toggle-label-content')
    }, {
      children: children
    }))]
  }));
});
var Toggle = react.memo(_Toggle);
var _ToggleGroup = react.forwardRef(function _ToggleGroupOrig(_a, ref) {
  var children = _a.children,
    multiple = _a.multiple,
    showSelectAll = _a.showSelectAll,
    selectAllLabel = _a.selectAllLabel,
    onChange = _a.onChange,
    initialValue = _a.initialValue;
  var init = (0,react.useRef)(initialValue);
  var selectAllRef = (0,react.useRef)();
  var onChangeRef = useAutoRef(onChange);
  var state = (0,react.useMemo)(function () {
    return new SelectionState(multiple, init.current);
  }, [multiple, init]);
  (0,react.useLayoutEffect)(function () {
    state.onChange = function (val, all, any) {
      var _a;
      (_a = onChangeRef.current) === null || _a === void 0 ? void 0 : _a.call(onChangeRef, val, all, any);
      if (selectAllRef.current) {
        selectAllRef.current.Indeterminate = !!any && !all;
        selectAllRef.current.Checked = !!all;
      }
    };
    if (selectAllRef.current) {
      selectAllRef.current.Indeterminate = !!state.any && !state.all;
      selectAllRef.current.Checked = !!state.all;
    }
  }, [onChangeRef]);
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
      })), children]
    }))
  }));
});
var ToggleGroup = react.memo(_ToggleGroup);
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/select/index.module.scss
var select_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/select/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/select/index.module.scss

      
      
      
      
      
      
      
      
      

var select_index_module_options = {};

select_index_module_options.styleTagTransform = (styleTagTransform_default());
select_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      select_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
select_index_module_options.domAPI = (styleDomAPI_default());
select_index_module_options.insertStyleElement = (insertStyleElement_default());

var select_index_module_update = injectStylesIntoStyleTag_default()(select_index_module/* default */.Z, select_index_module_options);




       /* harmony default export */ const src_select_index_module = (select_index_module/* default */.Z && select_index_module/* default.locals */.Z.locals ? select_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/select/index.js
var select_assign = undefined && undefined.__assign || function () {
  select_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return select_assign.apply(this, arguments);
};
var select_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};










var SelectContext = (0,react.createContext)(null);
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
  var onChangeRef = useAutoRef(onChange);
  var shouldKeepOpenRef = useAutoRef(shouldKeepOpen);
  var state = (0,react.useMemo)(function () {
    return new SelectionState(!!multiple, init.current);
  }, [multiple, init]);
  var _c = (0,react.useState)(state.getSelectedElements()),
    selectedElements = _c[0],
    setSelectedElements = _c[1];
  (0,react.useLayoutEffect)(function () {
    state.onChange = function (val, all, any) {
      var _a, _b;
      (_a = onChangeRef.current) === null || _a === void 0 ? void 0 : _a.call(onChangeRef, val, all, any);
      if (selectAllRef.current) {
        selectAllRef.current.Indeterminate = !!any && !all;
        selectAllRef.current.Checked = !!all;
      }
      if (!shouldKeepOpenRef.current) {
        setOpened(false);
      }
      (_b = fieldRef.current) === null || _b === void 0 ? void 0 : _b.setEmpty(!any);
    };
    state.onUpdate = function (st) {
      var sel = st.getSelectedElements();
      setSelectedElements(sel);
    };
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
    }));
  }
  var setFieldRef = (0,react.useCallback)(function (val) {
    var _a, _b;
    fieldRef.current = val;
    (_a = fieldRef.current) === null || _a === void 0 ? void 0 : _a.setEmpty(multiple ? ((_b = init.current) === null || _b === void 0 ? void 0 : _b.length) === 0 : typeof init.current === 'undefined');
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
            }))]
          }, i);
        })
      })), (0,jsx_runtime.jsxs)("view", select_assign({
        className: clsx_m(src_select_index_module.menuRoot, opened && src_select_index_module.opened)
      }, {
        children: [(0,jsx_runtime.jsx)("button", {
          name: "<SelectBackdrop>",
          onClick: close,
          className: clsx_m(src_select_index_module.backdrop)
        }), (0,jsx_runtime.jsx)(SelectContext.Provider, select_assign({
          value: state
        }, {
          children: (0,jsx_runtime.jsx)("scroll", select_assign({
            name: "<SelectMenu>",
            className: clsx_m(src_select_index_module.menu, getElevationClass(4))
          }, {
            children: children
          }))
        }))]
      }))]
    })), !hideCaret && (0,jsx_runtime.jsx)("icon", select_assign({
      className: clsx_m(src_select_index_module.caret, 'mat-select-caret')
    }, {
      children: 'keyboard_arrow_down'
    }))]
  }));
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
  var childRef = useAutoRef(children);
  var getTemplateRef = (0,react.useRef)(function () {
    var _a;
    return (_a = triggerTemplate !== null && triggerTemplate !== void 0 ? triggerTemplate : childRef.current) !== null && _a !== void 0 ? _a : children;
  });
  var shouldShowToggle = showToggle === 'auto' ? !!(ctx === null || ctx === void 0 ? void 0 : ctx.allowMultiple) : !!showToggle;
  (0,react.useEffect)(function () {
    getTemplateRef.current = function () {
      return triggerTemplate !== null && triggerTemplate !== void 0 ? triggerTemplate : childRef.current;
    };
    ctx === null || ctx === void 0 ? void 0 : ctx.triggerUpdate();
  }, [triggerTemplate, ctx]);
  var selectionRef = (0,react.useMemo)(function () {
    return {
      get selected() {
        return selectedRef.current;
      },
      set selected(val) {
        selectedRef.current = val;
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
  (0,react.useLayoutEffect)(function () {
    return ctx === null || ctx === void 0 ? void 0 : ctx.register(selectionRef);
  }, [ctx, selectionRef]);
  var onClick = (0,react.useCallback)(function () {
    var newValue = !selectedRef.current;
    selectedRef.current = newValue;
    setSelected(newValue);
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
    }), children]
  }));
}
var Select = (0,react.memo)(_Select);
Select.Option = _Option;
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/util/hooks/use-control-check.js

var error1 = 'A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components';
var error2 = 'You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.';
var error3 = 'App contains an input element with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components';
var error4 = 'A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components';
function useControlCheck(_a) {
  var value = _a.value,
    defaultValue = _a.defaultValue,
    onChange = _a.onChange,
    readOnly = _a.readOnly;
  var valueInit = (0,react.useRef)(value);
  var warned = (0,react.useRef)(0);
  (0,react.useEffect)(function () {
    if (typeof value !== 'undefined') {
      if ((warned.current & 1) === 0 && typeof valueInit.current === 'undefined') {
        warned.current |= 1;
        console.error(error1);
      }
      if ((warned.current & 2) === 0 && typeof onChange === 'undefined' && typeof readOnly === 'undefined') {
        warned.current |= 2;
        console.warn(error2);
      }
      if ((warned.current & 4) === 0 && typeof defaultValue !== 'undefined') {
        warned.current |= 4;
        console.error(error3);
      }
    } else {
      if ((warned.current & 8) === 0 && typeof valueInit.current !== 'undefined') {
        warned.current |= 8;
        console.error(error4);
      }
    }
  }, [value, defaultValue, onChange, readOnly]);
  return typeof valueInit.current !== 'undefined';
}
//# sourceMappingURL=use-control-check.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/slider/index.module.scss
var slider_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/slider/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/slider/index.module.scss

      
      
      
      
      
      
      
      
      

var slider_index_module_options = {};

slider_index_module_options.styleTagTransform = (styleTagTransform_default());
slider_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      slider_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
slider_index_module_options.domAPI = (styleDomAPI_default());
slider_index_module_options.insertStyleElement = (insertStyleElement_default());

var slider_index_module_update = injectStylesIntoStyleTag_default()(slider_index_module/* default */.Z, slider_index_module_options);




       /* harmony default export */ const src_slider_index_module = (slider_index_module/* default */.Z && slider_index_module/* default.locals */.Z.locals ? slider_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/slider/index.js
var slider_assign = undefined && undefined.__assign || function () {
  slider_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return slider_assign.apply(this, arguments);
};
var slider_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};






var SliderChild = (0,react.forwardRef)(function _SliderChild(_a, ref) {
  var callback = _a.callback,
    defaultValue = _a.defaultValue;
  var _b = (0,react.useState)(defaultValue),
    st = _b[0],
    setSt = _b[1];
  (0,react.useImperativeHandle)(ref, function () {
    return setSt;
  });
  return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: callback(st)
  });
});
var _Slider = (0,react.forwardRef)(function _Slider(_a, ref) {
  var _b;
  var _c;
  var onChange = _a.onChange,
    onScroll = _a.onScroll,
    name = _a.name,
    children = _a.children,
    defaultValue = _a.defaultValue,
    value = _a.value,
    _d = _a.direction,
    direction = _d === void 0 ? 'horizontal' : _d,
    _e = _a.mode,
    mode = _e === void 0 ? 'normal' : _e,
    _f = _a.valuePosition,
    valuePosition = _f === void 0 ? 'auto' : _f,
    _g = _a.min,
    min = _g === void 0 ? 0 : _g,
    _h = _a.max,
    max = _h === void 0 ? 1 : _h,
    _j = _a.step,
    step = _j === void 0 ? 0 : _j,
    _k = _a.keyStep,
    keyStep = _k === void 0 ? null : _k,
    _l = _a.allowScroll,
    allowScroll = _l === void 0 ? false : _l,
    _m = _a.scrollMultiplier,
    scrollMultiplier = _m === void 0 ? 1 / 6 : _m,
    readOnly = _a.readOnly,
    otherProps = slider_rest(_a, ["onChange", "onScroll", "name", "children", "defaultValue", "value", "direction", "mode", "valuePosition", "min", "max", "step", "keyStep", "allowScroll", "scrollMultiplier", "readOnly"]);
  var isControlled = useControlCheck({
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    readOnly: readOnly
  });
  var init = (_c = defaultValue !== null && defaultValue !== void 0 ? defaultValue : value) !== null && _c !== void 0 ? _c : min;
  var curValue = (0,react.useRef)(init);
  var innerValue = (0,react.useRef)(init);
  var onChangeRef = useAutoRef(onChange);
  var orientation = direction === 'vertical' || direction === 'vertical-reverse' ? 'vertical' : 'horizontal';
  var isReverse = direction === 'vertical-reverse' || direction === 'horizontal-reverse';
  var sizeProp = orientation === 'horizontal' ? 'width' : 'height';
  var coordProp = orientation === 'horizontal' ? 'x' : 'y';
  var crossCoordProp = orientation === 'horizontal' ? 'y' : 'x';
  var range = max - min;
  var elementRef = (0,react.useRef)();
  var fillRef = (0,react.useRef)();
  var childRef = (0,react.useRef)();
  var moveStep = keyStep || step || range / 10;
  var setValWithStep = (0,react.useCallback)(function (val, skipNotify, skipControl) {
    var _a, _b;
    var clampedVal = Math.max(min, Math.min(max, val));
    var steppedVal = step > 0 ? Math.round(clampedVal / step) * step : clampedVal;
    var oldValue = curValue.current;
    if (!isControlled && !readOnly || skipControl) {
      innerValue.current = clampedVal;
      curValue.current = steppedVal;
      if (fillRef.current) {
        var ratio = (curValue.current - min) / range;
        fillRef.current.Style.Set(sizeProp === 'width' ? 'height' : 'width', null);
        fillRef.current.Style.Set(sizeProp, ratio * 100 + '%');
      }
      (_a = childRef.current) === null || _a === void 0 ? void 0 : _a.call(childRef, steppedVal);
    }
    if (!skipNotify && !readOnly && oldValue !== steppedVal) (_b = onChangeRef.current) === null || _b === void 0 ? void 0 : _b.call(onChangeRef, steppedVal);
  }, [min, max, step, sizeProp, range, isControlled, readOnly]);
  (0,react.useLayoutEffect)(function () {
    if (isControlled) setValWithStep(value, true, true);
  }, [value, isControlled]);
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
      var relPos = elementRef.current.GetRelativePosition(ev.position.x, ev.position.y);
      var relRatio = relPos[coordProp] / elementRef.current.RectTransform.rect[sizeProp];
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
  (0,react.useImperativeHandle)(ref, function () {
    return {
      getValue: function getValue() {
        return curValue.current;
      },
      setValue: setValWithStep,
      get root() {
        return elementRef.current;
      }
    };
  }, [elementRef, curValue, setValWithStep]);
  return (0,jsx_runtime.jsx)("view", slider_assign({
    name: name || '<Slider>'
  }, otherProps, {
    ref: elementRef,
    "data-direction": direction,
    "data-orientation": orientation,
    "data-readonly": readOnly ? true : undefined,
    "data-cursor": valuePosition,
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
        style: (_b = {}, _b[sizeProp] = 100 * (curValue.current - min) / range + '%', _b)
      }, {
        children: (0,jsx_runtime.jsx)("view", slider_assign({
          name: "<Slider-Thumb-Container>",
          className: clsx_m(src_slider_index_module.thumbContainer, 'mat-slider-thumb-container')
        }, {
          children: (0,jsx_runtime.jsx)("view", slider_assign({
            name: "<Slider-Thumb>",
            className: clsx_m(src_slider_index_module.thumb, 'mat-slider-thumb')
          }, {
            children: (0,jsx_runtime.jsx)("view", slider_assign({
              name: "<Slider-Value>",
              className: clsx_m(src_slider_index_module.value, 'mat-slider-value')
            }, {
              children: typeof children === 'function' ? (0,jsx_runtime.jsx)(SliderChild, {
                defaultValue: curValue.current,
                callback: children,
                ref: childRef
              }) : children
            }))
          }))
        }))
      }))
    }))
  }));
});
var Slider = react.memo(_Slider);
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/react-reconciler/constants.js
var constants = __webpack_require__("../../../node_modules/react-reconciler/constants.js");
;// CONCATENATED MODULE: ../../../renderer/dist/src/version.js
var version = '0.15.0';
;// CONCATENATED MODULE: ../../../renderer/dist/src/views/error-boundary.js
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
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
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return error_boundary_assign.apply(this, arguments);
};


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
      return (0,jsx_runtime.jsxs)("view", error_boundary_assign({
        id: '__react-unity-error-boundary',
        style: {
          color: 'crimson',
          padding: 20,
          fontSize: 16
        }
      }, {
        children: [(0,jsx_runtime.jsx)("view", error_boundary_assign({
          style: {
            marginBottom: '12px'
          }
        }, {
          children: ((_a = this.state.error) === null || _a === void 0 ? void 0 : _a.message) || ''
        })), (0,jsx_runtime.jsx)("view", {
          children: ((_b = this.state.error) === null || _b === void 0 ? void 0 : _b.stack) || ''
        })]
      }));
    }
    return this.props.children;
  };
  return ErrorBoundary;
}(react.Component);

;// CONCATENATED MODULE: ../../../renderer/dist/src/views/default-view.js


function DefaultView(_a) {
  var children = _a.children,
    withHelpers = _a.withHelpers,
    renderCount = _a.renderCount;
  return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: !withHelpers ? children : (0,jsx_runtime.jsx)(ErrorBoundary, {
      children: children
    }, renderCount)
  });
}
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/async/objects.js
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

// EXTERNAL MODULE: ../../../node_modules/react-reconciler/index.js
var react_reconciler = __webpack_require__("../../../node_modules/react-reconciler/index.js");
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/diffing.js
var styleStringSymbol = '__style_as_string__';
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
      (updatePayload = updatePayload || {})[styleStringSymbol] = null;
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
        (updatePayload = updatePayload || {})[styleStringSymbol] = typeof prop === 'string' ? prop : null;
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
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/constants.js
var constants_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


var hideClass = 'react-unity__renderer__hidden';
var eventPriorities = {
  discrete: constants.DiscreteEventPriority,
  continuous: constants.ContinuousEventPriority,
  "default": constants.DefaultEventPriority,
  idle: constants.IdleEventPriority
};
var textTypes = {
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
function getAllowedProps(props, type) {
  var children = props.children,
    tag = props.tag,
    pool = props.pool,
    rest = constants_rest(props, ["children", "tag", "pool"]);
  if (textTypes[type] && 'children' in props) {
    rest.children = !children || typeof children === 'boolean' ? null : Array.isArray(children) ? children.join('') : children + '';
  }
  if (typeof props.style === 'string') rest[styleStringSymbol] = props.style;
  return rest;
}
var commonReconciler = {
  // -------------------
  //     Scheduling
  // -------------------
  now: Date.now,
  getCurrentEventPriority: function getCurrentEventPriority() {
    return UnityBridge.CurrentEventPriority || eventPriorities["default"];
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
var isDevelopment = "production" === 'development';
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/subcontexts/richtext.js
function parametrizeValue(value) {
  if (typeof value === 'number') return value + '';
  value = value + '';
  if (value.includes(' ') || value.includes('-')) return '"' + value + '"';
  return value;
}
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
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/subcontexts/svg.js
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
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/subcontexts/index.js


var subContextRenderers = {
  'richtext': stringifyRichText,
  'svg': stringifySVG
};
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/async/callbacks.js
var callbacks_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
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

var CallbacksRepo = /** @class */function (_super) {
  callbacks_extends(CallbacksRepo, _super);
  function CallbacksRepo() {
    var _this = _super.call(this) || this;
    _this.call = function (ind, args) {
      var cb = _this.getObject(ind);
      var argsAsList = args;
      var argsAsArray = args;
      if (typeof argsAsArray.Length === 'number') {
        // C# Array
        args = [];
        var length = argsAsArray.Length;
        for (var index = 0; index < length; index++) args.push(argsAsArray.GetValue(index));
      } else if (typeof argsAsList.Count === 'number') {
        // C# List
        args = [];
        var length = argsAsList.Count;
        for (var index = 0; index < length; index++) args.push(argsAsList[index]);
      } else if (typeof argsAsList.Count === 'function') {
        // C# IList
        args = [];
        var length = argsAsList.Count();
        for (var index = 0; index < length; index++) args.push(argsAsArray.GetValue(index));
      }
      return cb.apply(null, args);
    };
    return _this;
  }
  return CallbacksRepo;
}(ObjectsRepo);

;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/async/serializer.js


var callbacksRepo = new CallbacksRepo();
var objectsRepo = new ObjectsRepo();
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
        var ind = callbacksRepo.addObject(value);
        (res.e || (res.e = {}))[key] = ind;
      } else if (typeof value === 'object' || typeof value === 'function') {
        var ind = objectsRepo.addObject(value);
        (res.o || (res.o = {}))[key] = ind;
      } else {
        (res.p || (res.p = {}))[key] = value;
      }
    }
  }
  return res;
}
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/async/reconciler.js
var reconciler_assign = undefined && undefined.__assign || function () {
  reconciler_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return reconciler_assign.apply(this, arguments);
};





var refId = 0;
var ctxMap = new Map();
var updateSubContext = function updateSubContext(instance) {
  var rend = subContextRenderers[instance.type];
  var root = instance === null || instance === void 0 ? void 0 : instance.root;
  var cur = instance;
  while (cur && !root) {
    root = cur.root;
    cur = cur.parent;
  }
  if (!root) return;
  var content = rend(root.subContext.node);
  if (instance.type === 'richtext') {
    instance.hostContext.commands.push(['x', {
      r: root.refId,
      c: content
    }]);
  } else if (instance.type === 'svg') {
    instance.hostContext.commands.push(['u', reconciler_assign({
      r: root.refId,
      t: 'svg'
    }, convertPropsToSerializable({
      innerContent: content
    }))]);
  }
};
var hostConfig = reconciler_assign(reconciler_assign({}, commonReconciler), {
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
      return callbacksRepo.call(ind, args);
    };
    var getObjectRef = function getObjectRef(ind) {
      return objectsRepo.getObject(ind);
    };
    var getEventAsObjectRef = function getEventAsObjectRef(ind) {
      return callbacksRepo.getObject(ind);
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
    var aProps = getAllowedProps(props, type);
    if (ctx.type === 'native') {
      refId++;
      ctx.commands.push(['c', reconciler_assign({
        t: type,
        r: refId,
        k: stringizePoolKey(props.pool)
      }, convertPropsToSerializable(aProps))]);
      if (rootContainer.fiberCache) rootContainer.fiberCache.setObject(refId, internalHandle);
      var res = reconciler_assign(reconciler_assign({}, ctx), {
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
      return reconciler_assign(reconciler_assign({}, ctx), {
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
      ctx.commands.push(['t', {
        r: refId,
        c: text
      }]);
      if (rootContainer.fiberCache) rootContainer.fiberCache.setObject(refId, internalHandle);
      return reconciler_assign(reconciler_assign({}, ctx), {
        refId: refId
      });
    } else if (ctx.type === 'richtext' || ctx.type === 'svg') {
      return reconciler_assign(reconciler_assign({}, ctx), {
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
      parent.commands.push(['a', {
        p: parent.refId,
        c: child.refId
      }]);
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
    return textTypes[type];
  },
  // -------------------
  //     Mutation
  // -------------------
  prepareUpdate: function prepareUpdate(instance, type, oldProps, newProps) {
    return diffProperties(oldProps, newProps);
  },
  commitUpdate: function commitUpdate(instance, updatePayload, type) {
    var props = getAllowedProps(updatePayload, type);
    if (instance.type === 'native') {
      instance.commands.push(['u', reconciler_assign({
        r: instance.refId,
        t: type
      }, convertPropsToSerializable(props))]);
    } else if (instance.type === 'richtext' || instance.type === 'svg') {
      if ('attributes' in instance.node) instance.node.attributes = reconciler_assign(reconciler_assign({}, instance.node.attributes), props);
      updateSubContext(instance);
    }
  },
  commitTextUpdate: function commitTextUpdate(instance, oldText, newText) {
    if (instance.type === 'native') {
      instance.commands.push(['x', {
        r: instance.refId,
        c: newText
      }]);
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
      child.commands.push(['a', {
        p: parent.refId,
        c: child.refId
      }]);
    } else if (parent.type === 'richtext' && child.type === 'richtext' || parent.type === 'svg' && child.type === 'svg') {
      if ('children' in parent.node) parent.node.children.push(child.node);
      child.root = parent.root;
      child.parent = parent;
      updateSubContext(child);
    }
  },
  appendChildToContainer: function appendChildToContainer(parent, child) {
    if (child.type === 'native') child.commands.push(['a', {
      p: parent.refId,
      c: child.refId
    }]);
  },
  insertBefore: function insertBefore(parent, child, beforeChild) {
    if (!child) return;
    if (parent.type === 'native' && parent.subContext) parent = parent.subContext;
    if (parent.type === 'native' && child.type === 'native' && beforeChild.type === 'native') {
      child.commands.push(['i', {
        p: parent.refId,
        c: child.refId,
        i: beforeChild.refId
      }]);
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
    if (child.type === 'native' && beforeChild.type === 'native') child.commands.push(['i', {
      p: parent.refId,
      c: child.refId,
      i: beforeChild.refId
    }]);
  },
  removeChild: function removeChild(parent, child) {
    if (!child) return;
    if (parent.type === 'native' && parent.subContext) parent = parent.subContext;
    if (parent.type === 'native' && child.type === 'native') {
      child.commands.push(['r', {
        p: parent.refId,
        c: child.refId
      }]);
    } else if (parent.type === 'richtext' && child.type === 'richtext' || parent.type === 'svg' && child.type === 'svg') {
      if ('children' in parent.node) {
        var index = parent.node.children.indexOf(child.node);
        if (index >= 0) parent.node.children.splice(index, 1);
      }
      updateSubContext(parent);
    }
  },
  removeChildFromContainer: function removeChildFromContainer(parent, child) {
    if (child.type === 'native') child.commands.push(['r', {
      p: parent.refId,
      c: child.refId
    }]);
  },
  resetTextContent: function resetTextContent() {},
  preparePortalMount: function preparePortalMount() {},
  detachDeletedInstance: function detachDeletedInstance() {},
  // Required for Suspense
  hideInstance: function hideInstance(instance) {
    if (instance.type === 'native') instance.commands.push(['h', {
      r: instance.refId,
      h: true
    }]);else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = true;
      updateSubContext(instance);
    }
  },
  hideTextInstance: function hideTextInstance(instance) {
    if (instance.type === 'native') instance.commands.push(['h', {
      r: instance.refId,
      h: true
    }]);else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = true;
      updateSubContext(instance);
    }
  },
  unhideInstance: function unhideInstance(instance) {
    if (instance.type === 'native') instance.commands.push(['h', {
      r: instance.refId,
      h: false
    }]);else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = false;
      updateSubContext(instance);
    }
  },
  unhideTextInstance: function unhideTextInstance(instance) {
    if (instance.type === 'native') instance.commands.push(['h', {
      r: instance.refId,
      h: false
    }]);else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = false;
      updateSubContext(instance);
    }
  }
});
var asyncReconciler = react_reconciler(hostConfig);
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/sync/reconciler.js
var sync_reconciler_assign = undefined && undefined.__assign || function () {
  sync_reconciler_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return sync_reconciler_assign.apply(this, arguments);
};



var hostContext = {};
var childContext = {};
var reconciler_hostConfig = sync_reconciler_assign(sync_reconciler_assign({}, commonReconciler), {
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
    var aProps = getAllowedProps(props, type);
    var children = aProps.children || null;
    delete aProps.children;
    return UnityBridge.createElement(props.tag || type, children, rootContainerInstance, aProps, stringizePoolKey(props.pool));
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
    return textTypes[type];
  },
  // -------------------
  //     Mutation
  // -------------------
  prepareUpdate: function prepareUpdate(instance, type, oldProps, newProps) {
    return diffProperties(oldProps, newProps);
  },
  commitUpdate: function commitUpdate(instance, updatePayload, type) {
    UnityBridge.applyUpdate(instance, getAllowedProps(updatePayload, type), type);
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
    instance.ClassList.Add(hideClass);
  },
  hideTextInstance: function hideTextInstance(instance) {
    instance.ClassList.Add(hideClass);
  },
  unhideInstance: function unhideInstance(instance) {
    instance.ClassList.Remove(hideClass);
  },
  unhideTextInstance: function unhideTextInstance(instance) {
    instance.ClassList.Remove(hideClass);
  }
});
var syncReconciler = react_reconciler(reconciler_hostConfig);
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/renderer.js








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
    var mode = (options === null || options === void 0 ? void 0 : options.mode) === 'legacy' ? constants.LegacyRoot : constants.ConcurrentRoot;
    if (isAsync) {
      var fiberCache_1 = isDevelopment ? new ObjectsRepo() : null;
      if (isDevelopment) {
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
      hostRoot = asyncReconciler.createContainer(hostContainerInstance_1, mode, null, false, undefined, '', function (error) {
        return console.error(error);
      }, null);
    } else {
      hostRoot = syncReconciler.createContainer(hostContainer, mode, null, false, undefined, '', function (error) {
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
    element = (0,react.createElement)(DefaultView, viewWrapperProps, element);
  }
  var rc = isAsync ? asyncReconciler : syncReconciler;
  rc.updateContainer(element, hostRoot, null);
  rc.injectIntoDevTools({
    bundleType: isDevelopment ? 1 : 0,
    version: version,
    rendererPackageName: '@reactunity/renderer',
    rendererConfig: {
      isAsync: isAsync
    },
    findFiberByHostInstance: findFiberByHostInstance
  });
  return rc;
}
/**
 * @deprecated Instead, import `render` directly from `@reactunity/renderer`
 */

var Renderer = {
  render: function render(element, options) {
    if (options === void 0) {
      options = {};
    }
    return _render(element, options);
  }
};
var batchedUpdates = asyncReconciler.batchedUpdates;
var flushSync = asyncReconciler.flushSync;
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/tooltip/index.module.scss
var tooltip_index_module = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/tooltip/index.module.scss");
;// CONCATENATED MODULE: ../../../material/dist/src/tooltip/index.module.scss

      
      
      
      
      
      
      
      
      

var tooltip_index_module_options = {};

tooltip_index_module_options.styleTagTransform = (styleTagTransform_default());
tooltip_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      tooltip_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
tooltip_index_module_options.domAPI = (styleDomAPI_default());
tooltip_index_module_options.insertStyleElement = (insertStyleElement_default());

var tooltip_index_module_update = injectStylesIntoStyleTag_default()(tooltip_index_module/* default */.Z, tooltip_index_module_options);




       /* harmony default export */ const src_tooltip_index_module = (tooltip_index_module/* default */.Z && tooltip_index_module/* default.locals */.Z.locals ? tooltip_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ../../../material/dist/src/tooltip/index.js





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
function parseFromPositioningLiteral(str) {
  var x;
  var y;
  var values = str.split(' ');
  if (values.length > 2) return;
  var hasDouble = values.length === 2;
  if (values.includes('top')) {
    x = 0.5;
    y = 0;
    if (hasDouble) {
      if (values.includes('left')) x = 0;else if (values.includes('right')) x = 1;else if (values.includes('center')) x = 0.5;else return;
    }
  } else if (values.includes('bottom')) {
    x = 0.5;
    y = 1;
    if (hasDouble) {
      if (values.includes('left')) x = 0;else if (values.includes('right')) x = 1;else if (values.includes('center')) x = 0.5;else return;
    }
  } else if (values.includes('left')) {
    if (hasDouble && !values.includes('center')) return;
    x = 0;
    y = 0.5;
  } else if (values.includes('right')) {
    if (hasDouble && !values.includes('center')) return;
    x = 1;
    y = 0.5;
  } else if (values.includes('center')) {
    if (hasDouble && values[0] !== values[1]) return;
    x = 0.5;
    y = 0.5;
  } else {
    return;
  }
  return [x * 100 + '%', y * 100 + '%'];
}
function convert2DValue(val) {
  if (!val) return;
  if (typeof val === 'string') {
    val = val.trim();
    if (!val) return;
    var sp = parseFromPositioningLiteral(val);
    if (sp) return sp;
    var values = val.split(' ');
    if (values.length === 2) {
      return values;
    }
    return;
  }
  if (Array.isArray(val)) {
    if (!val.length) return;
    var v0 = val[0];
    var v1 = val[1];
    var v0f = typeof v0 === 'number' ? v0 + 'px' : v0;
    var v1f = typeof v1 === 'number' ? v1 + 'px' : v1;
    return [v0f, v1f];
  }
  return;
}
function convertToTransform(val, negate) {
  if (negate === void 0) {
    negate = false;
  }
  var converted = convert2DValue(val);
  if (!converted) return '';
  var cx = negate ? converted[0].startsWith('-') ? converted[0].substring(1) : '-' + converted[0] : converted[0];
  var cy = negate ? converted[1].startsWith('-') ? converted[1].substring(1) : '-' + converted[1] : converted[1];
  return "".concat(cx, " ").concat(cy);
}
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
  var pivotOriginal = props.pivot || (pos === null || pos === void 0 ? void 0 : pos.pivot) || 'top';
  tooltip.Style.Set('translate', convertToTransform(pivotOriginal, true));
  if (withBackdrop) {
    var backdrop = UnityBridge.createElement('portal', '', HostContainer);
    backdrop.ClassName = clsx_m(src_tooltip_index_module.backdrop, 'mat-tooltip-backdrop');
    backdrop.Name = '<TooltipBackdrop>';
    UnityBridge.addEventListener(backdrop, 'onPointerClick', hide);
    UnityBridge.appendChild(anchor, backdrop);
  }
  UnityBridge.appendChild(anchor, tooltip);
  _render(props.content, {
    disableHelpers: true,
    hostContainer: tooltip
  });
  UnityBridge.appendChild(target, anchor);
  return anchor;
}
function useTooltip(props, trigger) {
  if (trigger === void 0) {
    trigger = 'auto';
  }
  var tooltipRef = (0,react.useRef)();
  var timeoutRef = (0,react.useRef)();
  var callbacksRef = (0,react.useRef)([]);
  var elementsRef = (0,react.useRef)([]);
  var propsRef = useAutoRef(props);
  var clearAll = (0,react.useCallback)(function () {
    var callbacks = callbacksRef.current;
    for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
      var cb = callbacks_1[_i];
      cb === null || cb === void 0 ? void 0 : cb();
    }
    callbacks.length = 0;
  }, []);
  var hide = (0,react.useCallback)(function () {
    var _a;
    if (timeoutRef.current >= 0) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    (_a = tooltipRef.current) === null || _a === void 0 ? void 0 : _a.Remove();
    tooltipRef.current = null;
  }, []);
  var show = (0,react.useCallback)(function (target, properties, withBackdrop) {
    if (withBackdrop === void 0) {
      withBackdrop = false;
    }
    hide();
    return tooltipRef.current = addTooltip(target, properties, withBackdrop, hide);
  }, [hide]);
  var showWithCurrent = (0,react.useCallback)(function (ev, sender) {
    var calculatedProps = typeof propsRef.current === 'function' ? propsRef.current(sender) : propsRef.current;
    var withBackdrop = trigger === 'click';
    var delay = calculatedProps.delay;
    if (delay > 0) {
      timeoutRef.current = setTimeout(function () {
        setImmediate(function () {
          show(sender, calculatedProps, withBackdrop);
        });
      }, delay);
    } else {
      show(sender, calculatedProps, withBackdrop);
    }
  }, [show, trigger, propsRef]);
  (0,react.useLayoutEffect)(function () {
    return clearAll;
  }, [trigger, clearAll]);
  var register = (0,react.useCallback)(function (el) {
    if (!el) return;
    elementsRef.current.push(el);
    var callbacks = callbacksRef.current;
    if (trigger === 'click') {
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerClick', showWithCurrent));
    } else if (trigger === 'press' || trigger === 'active') {
      // TODO: improve active to handle key presses
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerDown', showWithCurrent));
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerUp', hide));
    } else if (trigger === 'focus') {
      callbacks.push(UnityBridge.addEventListener(el, 'onSelect', showWithCurrent));
      callbacks.push(UnityBridge.addEventListener(el, 'onDeselect', hide));
    } else if (trigger === 'hover') {
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerEnter', showWithCurrent));
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerExit', hide));
    } else {
      // auto
      // TODO: improve auto to handle mobile/gamepad differently (active and focus)
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
      return data.GetValueOrDefault('tooltip-' + prop);
    }
  });
}
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ../../../node_modules/memoize-one/dist/memoize-one.esm.js
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

;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/domHelpers.js
function getScrollbarSize(el) {
  return {
    verticalWidth: el.VerticalScrollbar.Thumb.ClientWidth,
    horizontalHeight: el.HorizontalScrollbar.Thumb.ClientHeight
  };
}
function getRTLOffsetType() {
  return 'positive-ascending';
}
//# sourceMappingURL=domHelpers.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/timer.js
function cancelTimeout(timeoutID) {
  clearTimeout(timeoutID.id);
}
function requestTimeout(callback, delay) {
  return {
    id: setTimeout(callback, delay)
  };
}
//# sourceMappingURL=timer.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/createGridComponent.js
var createGridComponent_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
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
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return createGridComponent_assign.apply(this, arguments);
};
var createGridComponent_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
  return _b = /** @class */function (_super) {
    createGridComponent_extends(Grid, _super);
    // Always use explicit constructor for React components.
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
      });
      // Lazily create and cache item styles while scrolling,
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
          var direction = _this.props.direction;
          // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
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
          }
          // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.
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
      var estimatedTotalWidth = getEstimatedTotalWidth(this.props, this._instanceProps);
      // The scrollbar size should be considered when scrolling an item into view,
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
      }
      // Read this value AFTER items have been created,
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
      var stopIndex = getColumnStopIndexForStartIndex(this.props, startIndex, scrollLeft, this._instanceProps);
      // Overscan by one item in each direction so that tab/focus works.
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
      var stopIndex = getRowStopIndexForStartIndex(this.props, startIndex, scrollTop, this._instanceProps);
      // Overscan by one item in each direction so that tab/focus works.
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
//# sourceMappingURL=createGridComponent.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/FixedSizeGrid.js

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

  initInstanceProps: function initInstanceProps(props) {
    // Noop
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: function validateProps(_a) {
    var columnWidth = _a.columnWidth,
      rowHeight = _a.rowHeight;
    if (false) {}
  }
});
//# sourceMappingURL=FixedSizeGrid.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/createListComponent.js
var createListComponent_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
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
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return createListComponent_assign.apply(this, arguments);
};
var createListComponent_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
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
  return _b = /** @class */function (_super) {
    createListComponent_extends(List, _super);
    // Always use explicit constructor for React components.
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
      });
      // Lazily create and cache item styles while scrolling,
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
          }
          // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.
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
          }
          // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.
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
      }
      // Read this value AFTER items have been created,
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
      var stopIndex = getStopIndexForStartIndex(this.props, startIndex, scrollOffset, this._instanceProps);
      // Overscan by one item in each direction so that tab/focus works.
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
}
// NOTE: I considered further wrapping individual items with a pure ListItem component.
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
//# sourceMappingURL=createListComponent.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/FixedSizeList.js

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

  initInstanceProps: function initInstanceProps(props) {
    // Noop
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: function validateProps(_a) {
    var itemSize = _a.itemSize;
    if (false) {}
  }
});
//# sourceMappingURL=FixedSizeList.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/VariableSizeGrid.js

var DEFAULT_ESTIMATED_ITEM_SIZE = 50;
var getEstimatedTotalHeight = function getEstimatedTotalHeight(_a, _b) {
  var rowCount = _a.rowCount;
  var rowMetadataMap = _b.rowMetadataMap,
    estimatedRowHeight = _b.estimatedRowHeight,
    lastMeasuredRowIndex = _b.lastMeasuredRowIndex;
  var totalSizeOfMeasuredRows = 0;
  // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138
  if (lastMeasuredRowIndex >= rowCount) {
    lastMeasuredRowIndex = rowCount - 1;
  }
  if (lastMeasuredRowIndex >= 0) {
    var itemMetadata = rowMetadataMap[lastMeasuredRowIndex];
    totalSizeOfMeasuredRows = itemMetadata.offset + itemMetadata.size;
  }
  var numUnmeasuredItems = rowCount - lastMeasuredRowIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedRowHeight;
  return totalSizeOfMeasuredRows + totalSizeOfUnmeasuredItems;
};
var getEstimatedTotalWidth = function getEstimatedTotalWidth(_a, _b) {
  var columnCount = _a.columnCount;
  var columnMetadataMap = _b.columnMetadataMap,
    estimatedColumnWidth = _b.estimatedColumnWidth,
    lastMeasuredColumnIndex = _b.lastMeasuredColumnIndex;
  var totalSizeOfMeasuredRows = 0;
  // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138
  if (lastMeasuredColumnIndex >= columnCount) {
    lastMeasuredColumnIndex = columnCount - 1;
  }
  if (lastMeasuredColumnIndex >= 0) {
    var itemMetadata = columnMetadataMap[lastMeasuredColumnIndex];
    totalSizeOfMeasuredRows = itemMetadata.offset + itemMetadata.size;
  }
  var numUnmeasuredItems = columnCount - lastMeasuredColumnIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedColumnWidth;
  return totalSizeOfMeasuredRows + totalSizeOfUnmeasuredItems;
};
var getItemMetadata = function getItemMetadata(itemType, props, index, instanceProps) {
  var itemMetadataMap, itemSize, lastMeasuredIndex;
  if (itemType === 'column') {
    itemMetadataMap = instanceProps.columnMetadataMap;
    itemSize = props.columnWidth;
    lastMeasuredIndex = instanceProps.lastMeasuredColumnIndex;
  } else {
    itemMetadataMap = instanceProps.rowMetadataMap;
    itemSize = props.rowHeight;
    lastMeasuredIndex = instanceProps.lastMeasuredRowIndex;
  }
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
    if (itemType === 'column') {
      instanceProps.lastMeasuredColumnIndex = index;
    } else {
      instanceProps.lastMeasuredRowIndex = index;
    }
  }
  return itemMetadataMap[index];
};
var findNearestItem = function findNearestItem(itemType, props, instanceProps, offset) {
  var itemMetadataMap, lastMeasuredIndex;
  if (itemType === 'column') {
    itemMetadataMap = instanceProps.columnMetadataMap;
    lastMeasuredIndex = instanceProps.lastMeasuredColumnIndex;
  } else {
    itemMetadataMap = instanceProps.rowMetadataMap;
    lastMeasuredIndex = instanceProps.lastMeasuredRowIndex;
  }
  var lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;
  if (lastMeasuredItemOffset >= offset) {
    // If we've already measured items within this range just use a binary search as it's faster.
    return findNearestItemBinarySearch(itemType, props, instanceProps, lastMeasuredIndex, 0, offset);
  } else {
    // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
    // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
    // The overall complexity for this approach is O(log n).
    return findNearestItemExponentialSearch(itemType, props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
  }
};
var findNearestItemBinarySearch = function findNearestItemBinarySearch(itemType, props, instanceProps, high, low, offset) {
  while (low <= high) {
    var middle = low + Math.floor((high - low) / 2);
    var currentOffset = getItemMetadata(itemType, props, middle, instanceProps).offset;
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
var findNearestItemExponentialSearch = function findNearestItemExponentialSearch(itemType, props, instanceProps, index, offset) {
  var itemCount = itemType === 'column' ? props.columnCount : props.rowCount;
  var interval = 1;
  while (index < itemCount && getItemMetadata(itemType, props, index, instanceProps).offset < offset) {
    index += interval;
    interval *= 2;
  }
  return findNearestItemBinarySearch(itemType, props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
};
var getOffsetForIndexAndAlignment = function getOffsetForIndexAndAlignment(itemType, props, index, align, scrollOffset, instanceProps, scrollbarSize) {
  var size = itemType === 'column' ? props.width : props.height;
  var itemMetadata = getItemMetadata(itemType, props, index, instanceProps);
  // Get estimated total size after ItemMetadata is computed,
  // To ensure it reflects actual measurements instead of just estimates.
  var estimatedTotalSize = itemType === 'column' ? getEstimatedTotalWidth(props, instanceProps) : getEstimatedTotalHeight(props, instanceProps);
  var maxOffset = Math.max(0, Math.min(estimatedTotalSize - size, itemMetadata.offset));
  var minOffset = Math.max(0, itemMetadata.offset - size + scrollbarSize + itemMetadata.size);
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
      } else if (minOffset > maxOffset) {
        // Because we only take into account the scrollbar size when calculating minOffset
        // this value can be larger than maxOffset when at the end of the list
        return minOffset;
      } else if (scrollOffset < minOffset) {
        return minOffset;
      } else {
        return maxOffset;
      }
  }
};
var VariableSizeGrid = createGridComponent({
  getColumnOffset: function getColumnOffset(props, index, instanceProps) {
    return getItemMetadata('column', props, index, instanceProps).offset;
  },
  getColumnStartIndexForOffset: function getColumnStartIndexForOffset(props, scrollLeft, instanceProps) {
    return findNearestItem('column', props, instanceProps, scrollLeft);
  },
  getColumnStopIndexForStartIndex: function getColumnStopIndexForStartIndex(props, startIndex, scrollLeft, instanceProps) {
    var columnCount = props.columnCount,
      width = props.width;
    var itemMetadata = getItemMetadata('column', props, startIndex, instanceProps);
    var maxOffset = scrollLeft + width;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;
    while (stopIndex < columnCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata('column', props, stopIndex, instanceProps).size;
    }
    return stopIndex;
  },
  getColumnWidth: function getColumnWidth(props, index, instanceProps) {
    return instanceProps.columnMetadataMap[index].size;
  },
  getEstimatedTotalHeight: getEstimatedTotalHeight,
  getEstimatedTotalWidth: getEstimatedTotalWidth,
  getOffsetForColumnAndAlignment: function getOffsetForColumnAndAlignment(props, index, align, scrollOffset, instanceProps, scrollbarSize) {
    return getOffsetForIndexAndAlignment('column', props, index, align, scrollOffset, instanceProps, scrollbarSize);
  },
  getOffsetForRowAndAlignment: function getOffsetForRowAndAlignment(props, index, align, scrollOffset, instanceProps, scrollbarSize) {
    return getOffsetForIndexAndAlignment('row', props, index, align, scrollOffset, instanceProps, scrollbarSize);
  },
  getRowOffset: function getRowOffset(props, index, instanceProps) {
    return getItemMetadata('row', props, index, instanceProps).offset;
  },
  getRowHeight: function getRowHeight(props, index, instanceProps) {
    return instanceProps.rowMetadataMap[index].size;
  },
  getRowStartIndexForOffset: function getRowStartIndexForOffset(props, scrollTop, instanceProps) {
    return findNearestItem('row', props, instanceProps, scrollTop);
  },
  getRowStopIndexForStartIndex: function getRowStopIndexForStartIndex(props, startIndex, scrollTop, instanceProps) {
    var rowCount = props.rowCount,
      height = props.height;
    var itemMetadata = getItemMetadata('row', props, startIndex, instanceProps);
    var maxOffset = scrollTop + height;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;
    while (stopIndex < rowCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata('row', props, stopIndex, instanceProps).size;
    }
    return stopIndex;
  },
  initInstanceProps: function initInstanceProps(props, instance) {
    var _a = props,
      estimatedColumnWidth = _a.estimatedColumnWidth,
      estimatedRowHeight = _a.estimatedRowHeight;
    var instanceProps = {
      columnMetadataMap: {},
      estimatedColumnWidth: estimatedColumnWidth || DEFAULT_ESTIMATED_ITEM_SIZE,
      estimatedRowHeight: estimatedRowHeight || DEFAULT_ESTIMATED_ITEM_SIZE,
      lastMeasuredColumnIndex: -1,
      lastMeasuredRowIndex: -1,
      rowMetadataMap: {}
    };
    instance.resetAfterColumnIndex = function (columnIndex, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }
      instance.resetAfterIndices({
        columnIndex: columnIndex,
        shouldForceUpdate: shouldForceUpdate
      });
    };
    instance.resetAfterRowIndex = function (rowIndex, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }
      instance.resetAfterIndices({
        rowIndex: rowIndex,
        shouldForceUpdate: shouldForceUpdate
      });
    };
    instance.resetAfterIndices = function (_a) {
      var columnIndex = _a.columnIndex,
        rowIndex = _a.rowIndex,
        _b = _a.shouldForceUpdate,
        shouldForceUpdate = _b === void 0 ? true : _b;
      if (typeof columnIndex === 'number') {
        instanceProps.lastMeasuredColumnIndex = Math.min(instanceProps.lastMeasuredColumnIndex, columnIndex - 1);
      }
      if (typeof rowIndex === 'number') {
        instanceProps.lastMeasuredRowIndex = Math.min(instanceProps.lastMeasuredRowIndex, rowIndex - 1);
      }
      // We could potentially optimize further by only evicting styles after this index,
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
    var columnWidth = _a.columnWidth,
      rowHeight = _a.rowHeight;
    if (false) {}
  }
});
//# sourceMappingURL=VariableSizeGrid.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/VariableSizeList.js

var VariableSizeList_DEFAULT_ESTIMATED_ITEM_SIZE = 50;
var VariableSizeList_getItemMetadata = function getItemMetadata(props, index, instanceProps) {
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
var VariableSizeList_findNearestItem = function findNearestItem(props, instanceProps, offset) {
  var itemMetadataMap = instanceProps.itemMetadataMap,
    lastMeasuredIndex = instanceProps.lastMeasuredIndex;
  var lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;
  if (lastMeasuredItemOffset >= offset) {
    // If we've already measured items within this range just use a binary search as it's faster.
    return VariableSizeList_findNearestItemBinarySearch(props, instanceProps, lastMeasuredIndex, 0, offset);
  } else {
    // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
    // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
    // The overall complexity for this approach is O(log n).
    return VariableSizeList_findNearestItemExponentialSearch(props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
  }
};
var VariableSizeList_findNearestItemBinarySearch = function findNearestItemBinarySearch(props, instanceProps, high, low, offset) {
  while (low <= high) {
    var middle = low + Math.floor((high - low) / 2);
    var currentOffset = VariableSizeList_getItemMetadata(props, middle, instanceProps).offset;
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
var VariableSizeList_findNearestItemExponentialSearch = function findNearestItemExponentialSearch(props, instanceProps, index, offset) {
  var itemCount = props.itemCount;
  var interval = 1;
  while (index < itemCount && VariableSizeList_getItemMetadata(props, index, instanceProps).offset < offset) {
    index += interval;
    interval *= 2;
  }
  return VariableSizeList_findNearestItemBinarySearch(props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
};
var getEstimatedTotalSize = function getEstimatedTotalSize(_a, _b) {
  var itemCount = _a.itemCount;
  var itemMetadataMap = _b.itemMetadataMap,
    estimatedItemSize = _b.estimatedItemSize,
    lastMeasuredIndex = _b.lastMeasuredIndex;
  var totalSizeOfMeasuredItems = 0;
  // Edge case check for when the number of items decreases while a scroll is in progress.
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
    return VariableSizeList_getItemMetadata(props, index, instanceProps).offset;
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
    var itemMetadata = VariableSizeList_getItemMetadata(props, index, instanceProps);
    // Get estimated total size after ItemMetadata is computed,
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
    return VariableSizeList_findNearestItem(props, instanceProps, offset);
  },
  getStopIndexForStartIndex: function getStopIndexForStartIndex(props, startIndex, scrollOffset, instanceProps) {
    var height = props.height,
      itemCount = props.itemCount,
      layout = props.layout,
      width = props.width;
    var isHorizontal = layout === 'horizontal';
    var size = isHorizontal ? width : height;
    var itemMetadata = VariableSizeList_getItemMetadata(props, startIndex, instanceProps);
    var maxOffset = scrollOffset + size;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;
    while (stopIndex < itemCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += VariableSizeList_getItemMetadata(props, stopIndex, instanceProps).size;
    }
    return stopIndex;
  },
  initInstanceProps: function initInstanceProps(props, instance) {
    var estimatedItemSize = props.estimatedItemSize;
    var instanceProps = {
      itemMetadataMap: {},
      estimatedItemSize: estimatedItemSize || VariableSizeList_DEFAULT_ESTIMATED_ITEM_SIZE,
      lastMeasuredIndex: -1
    };
    instance.resetAfterIndex = function (index, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }
      instanceProps.lastMeasuredIndex = Math.min(instanceProps.lastMeasuredIndex, index - 1);
      // We could potentially optimize further by only evicting styles after this index,
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
//# sourceMappingURL=VariableSizeList.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/index.js




//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/index.js
















//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ../../../material/dist/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/use-sync-external-store/shim/index.js
var shim = __webpack_require__("../../../node_modules/use-sync-external-store/shim/index.js");
// EXTERNAL MODULE: ../../../node_modules/use-sync-external-store/with-selector.js
var with_selector = __webpack_require__("../../../node_modules/use-sync-external-store/with-selector.js");
;// CONCATENATED MODULE: ../../../renderer/dist/src/helpers/dictionary-watcher.js
var dictionary_watcher_assign = undefined && undefined.__assign || function () {
  dictionary_watcher_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return dictionary_watcher_assign.apply(this, arguments);
};



/**
 * Creates a context that updates its value when the values in the dictionary change
 * @param dictionary The dictionary to be watched. Must implement the EventDictionary type in the C#
 * @param displayName A displayName to identify this context easier in case of problems
 */
function createDictionaryWatcher(dictionary, displayName) {
  var ctx = (0,react.createContext)(undefined);
  if (displayName) ctx.displayName = displayName;
  var createSubscriber = function createSubscriber(fields, isEqual) {
    var snapshot = dictionary_watcher_assign({}, dictionary);
    return {
      subscribe: function subscribe(onStoreChange) {
        snapshot = dictionary_watcher_assign({}, dictionary);
        var remove = dictionary === null || dictionary === void 0 ? void 0 : dictionary.AddListener(function () {
          var prev = snapshot;
          snapshot = dictionary_watcher_assign({}, dictionary);
          if (!fields) onStoreChange();else {
            for (var it = fields.values(), field = null; field = it.next().value;) {
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
    var value = (0,shim.useSyncExternalStore)(defaultSubscriber.subscribe, defaultSubscriber.getSnapshot, defaultSubscriber.getSnapshot);
    return (0,react.createElement)(ctx.Provider, {
      value: value
    }, children);
  };
  function useDictionaryContext() {
    var context = (0,react.useContext)(ctx);
    if (context === undefined) {
      if (displayName) throw new Error("".concat(displayName, ".useContext must be used within a ").concat(displayName, ".Provider"));else throw new Error('useContext must be used within a provider');
    }
    return context;
  }
  function useValue(subscribeToAllFields, fieldEqual) {
    if (subscribeToAllFields === void 0) {
      subscribeToAllFields = false;
    }
    var fields = (0,react.useMemo)(function () {
      return new Set();
    }, []);
    var _a = (0,react.useState)(false),
      allFieldsSubscribed = _a[0],
      setAllFieldsSubscribed = _a[1];
    subscribeToAllFields || (subscribeToAllFields = allFieldsSubscribed);
    var subscriber = (0,react.useMemo)(function () {
      return subscribeToAllFields ? defaultSubscriber : createSubscriber(fields, fieldEqual);
    }, [subscribeToAllFields, fieldEqual]);
    var value = (0,shim.useSyncExternalStore)(subscriber.subscribe, subscriber.getSnapshot, subscriber.getSnapshot);
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
        return dictionary_watcher_assign(dictionary_watcher_assign({}, Reflect.getOwnPropertyDescriptor(target, p)), {
          value: value[p]
        });
      }
    });
    return proxy;
  }
  function useSelector(selector, isEqual) {
    return (0,with_selector.useSyncExternalStoreWithSelector)(defaultSubscriber.subscribe, defaultSubscriber.getSnapshot, defaultSubscriber.getSnapshot, selector, isEqual);
  }
  return {
    context: ctx,
    Provider: Provider,
    useValue: useValue,
    useContext: useDictionaryContext,
    useSelector: useSelector
  };
}
;// CONCATENATED MODULE: ../../../renderer/dist/src/helpers/hooks/use-globals.js

var globalsWatcher = createDictionaryWatcher(Globals, 'globalsContext');
var useGlobals = globalsWatcher.useValue;
var useGlobalsContext = globalsWatcher.useContext;
var useGlobalsSelector = globalsWatcher.useSelector;
var GlobalsProvider = globalsWatcher.Provider;
;// CONCATENATED MODULE: ../../../renderer/dist/src/helpers/hooks/use-reactive-value.js


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
      if (isReactive && typeof remove !== 'function') console.warn("The reactive value does not provide a change listener");
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
  var sb = (0,react.useMemo)(function () {
    return createSubscriber(obj, isEqual);
  }, [obj, isEqual]);
  return (0,shim.useSyncExternalStore)(sb.subscribe, sb.getSnapshot, sb.getSnapshot);
}
;// CONCATENATED MODULE: ../../../renderer/dist/src/helpers/icons.js
var icons_assign = undefined && undefined.__assign || function () {
  icons_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return icons_assign.apply(this, arguments);
};

var componentCache = {};
var icon = new Proxy({}, {
  get: function get(target, key) {
    if (typeof key === 'symbol') return target[key];
    var icon = key.replace(/^_/, '');
    var cmp = componentCache[icon];
    if (cmp) return cmp;
    cmp = function NamedIcon(props, ref) {
      return react.createElement('icon', icons_assign(icons_assign({
        name: "<icon ".concat(icon, ">")
      }, props), {
        ref: ref
      }), icon);
    };
    cmp = react.forwardRef(cmp);
    componentCache[icon] = cmp;
    return cmp;
  }
});
;// CONCATENATED MODULE: ../../../renderer/dist/index.js









;// CONCATENATED MODULE: ../../../renderer/dist/src/webgl-compat/error-messages.js
// Original file: https://github.com/jeffreylanters/react-unity-webgl/blob/main/module/source/constants/error-messages.ts
var errorMessages = {
  genericNoUnityInstance: "No Unity Instance found.",
  requestFullscreenNoUnityInstance: "Unable to Set Fullscreen while Unity is not Instantiated.",
  requestPointerLockNoUnityInstanceOrCanvas: "Unable to Request Pointer Lock while Unity is not Instantiated or the Canvas is not found.",
  sendMessageNoUnityInstance: "Unable to Send Message while Unity is not Instantiated.",
  quitNoUnityInstance: "Unable to Quit Unity while Unity is not Instantiated.",
  screenshotNoUnityInstanceOrCanvas: "Unable to Take Screenshot while Unity is not Instantiated or Canvas is not available.",
  noEventListener: "Unable to find Event Listener in Event System for Event"
};
;// CONCATENATED MODULE: ../../../renderer/dist/src/webgl-compat/use-event-system.js
// Original file: https://github.com/jeffreylanters/react-unity-webgl/blob/main/module/source/hooks/use-event-system.ts
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};


var mountedEventDispatchers = [];
var dispatchReactUnityEvent = function dispatchReactUnityEvent(eventName) {
  var parameters = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    parameters[_i - 1] = arguments[_i];
  }
  var returnValue = undefined;
  mountedEventDispatchers.forEach(function (dispatchEvent) {
    returnValue = dispatchEvent.apply(void 0, __spreadArray([eventName], parameters, false));
  });
  return returnValue;
};
if (typeof globalThis !== "undefined" || typeof window !== "undefined") {
  (globalThis || window).dispatchReactUnityEvent = dispatchReactUnityEvent;
}
var useEventSystem = function useEventSystem() {
  var eventListeners = (0,react.useRef)([]);
  var addEventListener = (0,react.useCallback)(function (eventName, callback) {
    eventListeners.current = __spreadArray(__spreadArray([], eventListeners.current, true), [{
      eventName: eventName,
      callback: callback
    }], false);
  }, [eventListeners]);
  var removeEventListener = (0,react.useCallback)(function (eventName, callback) {
    eventListeners.current = eventListeners.current.filter(function (eventListener) {
      return eventListener.eventName !== eventName && eventListener.callback !== callback;
    });
  }, [eventListeners]);
  var dispatchEvent = (0,react.useCallback)(function (eventName) {
    var parameters = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      parameters[_i - 1] = arguments[_i];
    }
    var eventListener = eventListeners.current.find(function (eventListener) {
      return eventListener.eventName === eventName;
    });
    if (typeof eventListener === "undefined") {
      console.warn(errorMessages.noEventListener, {
        eventName: eventName
      });
      return;
    }
    return eventListener.callback.apply(eventListener, parameters);
  }, [eventListeners]);
  (0,react.useEffect)(function () {
    mountedEventDispatchers.push(dispatchEvent);
    return function () {
      mountedEventDispatchers.splice(mountedEventDispatchers.indexOf(dispatchEvent), 1);
    };
  }, [dispatchEvent]);
  return {
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
  };
};

;// CONCATENATED MODULE: ../../../renderer/dist/src/webgl-compat/use-unity-context.js
// Original file: https://github.com/jeffreylanters/react-unity-webgl/blob/main/module/source/hooks/use-unity-context.ts



var useUnityContext = function useUnityContext(unityConfig) {
  var _a = (0,react.useState)(typeof ReactUnityWebGLCompat !== 'undefined' ? ReactUnityWebGLCompat : null),
    unityInstance = _a[0],
    setUnityInstance = _a[1];
  var _b = (0,react.useState)(1),
    loadingProgression = _b[0],
    setLoadingProgression = _b[1];
  var _c = (0,react.useState)(true),
    isLoaded = _c[0],
    setIsLoaded = _c[1];
  var _d = (0,react.useState)(null),
    initialisationError = _d[0],
    setInitialisationError = _d[1];
  var eventSystem = useEventSystem();
  var unityProvider = (0,react.useRef)({
    setLoadingProgression: setLoadingProgression,
    setInitialisationError: setInitialisationError,
    setUnityInstance: setUnityInstance,
    setIsLoaded: setIsLoaded,
    unityConfig: unityConfig
  });
  var requestFullscreen = (0,react.useCallback)(function (enabled) {
    if (unityInstance === null) {
      console.warn(errorMessages.requestFullscreenNoUnityInstance);
      return;
    }
    unityInstance.SetFullscreen(enabled === true ? 1 : 0);
  }, [unityInstance]);
  var requestPointerLock = (0,react.useCallback)(function () {
    if (unityInstance === null || typeof unityInstance.Module.canvas === "undefined") {
      console.warn(errorMessages.requestPointerLockNoUnityInstanceOrCanvas);
      return;
    }
    return unityInstance.Module.canvas.requestPointerLock();
  }, [unityInstance]);
  var sendMessage = (0,react.useCallback)(function (gameObjectName, methodName, parameter) {
    if (unityInstance === null) {
      console.warn(errorMessages.sendMessageNoUnityInstance);
      return;
    }
    unityInstance.SendMessage(gameObjectName, methodName, parameter);
  }, [unityInstance]);
  var takeScreenshot = (0,react.useCallback)(function (dataType, quality) {
    if (unityInstance === null || typeof unityInstance.Module.canvas === "undefined") {
      console.warn(errorMessages.screenshotNoUnityInstanceOrCanvas);
      return;
    }
    return unityInstance.Module.canvas.toDataURL(dataType, quality);
  }, [unityInstance]);
  var unload = (0,react.useCallback)(function () {
    if (unityInstance === null) {
      console.warn(errorMessages.quitNoUnityInstance);
      return Promise.reject();
    }
    return unityInstance.Quit();
  }, [unityInstance]);
  (0,react.useEffect)(function () {
    setIsLoaded(loadingProgression === 1);
  }, [loadingProgression]);
  return {
    unityProvider: unityProvider.current,
    loadingProgression: loadingProgression,
    initialisationError: initialisationError,
    isLoaded: isLoaded,
    UNSAFE__detachAndUnloadImmediate: function UNSAFE__detachAndUnloadImmediate() {
      return Promise.resolve();
    },
    UNSAFE__unityInstance: unityInstance,
    requestFullscreen: requestFullscreen,
    requestPointerLock: requestPointerLock,
    sendMessage: sendMessage,
    unload: unload,
    takeScreenshot: takeScreenshot,
    addEventListener: eventSystem.addEventListener,
    removeEventListener: eventSystem.removeEventListener
  };
};

;// CONCATENATED MODULE: ../../../renderer/dist/src/webgl-compat/index.js

// <reference types="react-unity-webgl" />


var Unity = (0,react.forwardRef)(function Unity(props, ref) {
  (0,react.useImperativeHandle)(ref, function () {
    return {};
  });
  return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {});
});
;// CONCATENATED MODULE: ../../../renderer/dist/webgl-compat.js

;// CONCATENATED MODULE: ./src/app.tsx
var ReactUnity=renderer_dist_namespaceObject;var Material=dist_namespaceObject;var MaterialStyles=function MaterialStyles(){return __webpack_require__("../../../material/dist/src/styles/index.js");};/*INJECTABLE_START*/
(function (react, ReactUnity, Material, MaterialStyles, ReactUnityWebGLCompat) {
  var __originalRender = ReactUnity.__originalRender || ReactUnity.render;

  var renderCalled = false;
  function render(element, options) {
    renderCalled = true;
    __originalRender.apply(null, [element, Object.assign({ mode: 'legacy' }, options || {})]);
  }

  ReactUnity = Object.assign({}, ReactUnity, {
    render: render,
    __originalRender: __originalRender,
  });

  var React = react;

  var exports = {};
  var module = { exports: exports };

  var require = function (module) {
    if (module === 'react') return react;
    if (module === '@reactunity/renderer') return ReactUnity;
    if (module === 'react-unity-webgl') return ReactUnityWebGLCompat;
    if (module === '@reactunity/renderer/webgl-compat') return ReactUnityWebGLCompat;
    if (module === '@reactunity/material/styles') return MaterialStyles();
    if (module === '@reactunity/material') return Material;
    if (module.startsWith('@reactunity/material/')) return Material;
  };


  globalThis.react = globalThis.React = react;
  globalThis.render = render;
  globalThis.ReactUnity = ReactUnity;
  globalThis.Material = Material;
  globalThis.MaterialStyles = MaterialStyles;
  globalThis.useGlobals = ReactUnity.useGlobals;

  var defaultComponent;

  let result = (function (module, exports, render, require) {

    /*INJECT_CODE*/

    if (typeof App === 'function') defaultComponent = App;
    else if (typeof Example === 'function') defaultComponent = Example;
  })(module, exports, render, require);


  if (!renderCalled) {
    const renderElement = exports.default || result || exports.App || exports.Example || defaultComponent;

    if (renderElement) {
      render(react.createElement(renderElement));
    } else {
      console.error('Nothing was rendered');
    }
  }
})(react, ReactUnity, Material, MaterialStyles, ReactUnityWebGLCompat);

/*INJECTABLE_END*/
;// CONCATENATED MODULE: ./src/index.ts

})();

/******/ })()
;