/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 549:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(487);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(631);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(52);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(10);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(469);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(329);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/styles/globals.scss
var globals = __webpack_require__(237);
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

/***/ 441:
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

/***/ 297:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 467:
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

/***/ 123:
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

  var aa = __webpack_require__(152),
      ba = __webpack_require__(526),
      ca = Object.assign;

  function n(a) {
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
    if (wa(a) !== a) throw Error(n(188));
  }

  function ya(a) {
    var b = a.alternate;

    if (!b) {
      b = wa(a);
      if (null === b) throw Error(n(188));
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

        throw Error(n(188));
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

          if (!g) throw Error(n(189));
        }
      }
      if (c.alternate !== d) throw Error(n(190));
    }

    if (3 !== c.tag) throw Error(n(188));
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
      Lb = $$$hostConfig.registerSuspenseInstanceRetry,
      Mb = $$$hostConfig.getNextHydratableSibling,
      Nb = $$$hostConfig.getFirstHydratableChild,
      Ob = $$$hostConfig.getFirstHydratableChildWithinContainer,
      Pb = $$$hostConfig.getFirstHydratableChildWithinSuspenseInstance,
      Qb = $$$hostConfig.hydrateInstance,
      Rb = $$$hostConfig.hydrateTextInstance,
      Sb = $$$hostConfig.hydrateSuspenseInstance,
      Tb = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,
      Ub = $$$hostConfig.commitHydratedContainer,
      Vb = $$$hostConfig.commitHydratedSuspenseInstance,
      Wb = $$$hostConfig.clearSuspenseBoundary,
      Xb = $$$hostConfig.clearSuspenseBoundaryFromContainer,
      Yb = $$$hostConfig.shouldDeleteUnhydratedTailInstances,
      Zb = $$$hostConfig.didNotMatchHydratedContainerTextInstance,
      $b = $$$hostConfig.didNotMatchHydratedTextInstance,
      ac;

  function bc(a) {
    if (void 0 === ac) try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      ac = b && b[1] || "";
    }
    return "\n" + ac + a;
  }

  var cc = !1;

  function dc(a, b) {
    if (!a || cc) return "";
    cc = !0;
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
      cc = !1, Error.prepareStackTrace = c;
    }

    return (a = a ? a.displayName || a.name : "") ? bc(a) : "";
  }

  var ec = Object.prototype.hasOwnProperty,
      fc = [],
      gc = -1;

  function hc(a) {
    return {
      current: a
    };
  }

  function p(a) {
    0 > gc || (a.current = fc[gc], fc[gc] = null, gc--);
  }

  function v(a, b) {
    gc++;
    fc[gc] = a.current;
    a.current = b;
  }

  var ic = {},
      x = hc(ic),
      z = hc(!1),
      jc = ic;

  function kc(a, b) {
    var c = a.type.contextTypes;
    if (!c) return ic;
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

  function lc() {
    p(z);
    p(x);
  }

  function mc(a, b, c) {
    if (x.current !== ic) throw Error(n(168));
    v(x, b);
    v(z, c);
  }

  function nc(a, b, c) {
    var d = a.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();

    for (var e in d) {
      if (!(e in b)) throw Error(n(108, va(a) || "Unknown", e));
    }

    return ca({}, c, d);
  }

  function pc(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || ic;
    jc = x.current;
    v(x, a);
    v(z, z.current);
    return !0;
  }

  function qc(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(n(169));
    c ? (a = nc(a, b, jc), d.__reactInternalMemoizedMergedChildContext = a, p(z), p(x), v(x, a)) : p(z);
    v(z, c);
  }

  var sc = Math.clz32 ? Math.clz32 : rc,
      tc = Math.log,
      uc = Math.LN2;

  function rc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (tc(a) / uc | 0) | 0;
  }

  var vc = 64,
      wc = 4194304;

  function xc(a) {
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

  function yc(a, b) {
    var c = a.pendingLanes;
    if (0 === c) return 0;
    var d = 0,
        e = a.suspendedLanes,
        f = a.pingedLanes,
        g = c & 268435455;

    if (0 !== g) {
      var h = g & ~e;
      0 !== h ? d = xc(h) : (f &= g, 0 !== f && (d = xc(f)));
    } else g = c & ~e, 0 !== g ? d = xc(g) : 0 !== f && (d = xc(f));

    if (0 === d) return 0;
    if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
    0 !== (d & 4) && (d |= c & 16);
    b = a.entangledLanes;
    if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) {
      c = 31 - sc(b), e = 1 << c, d |= a[c], b &= ~e;
    }
    return d;
  }

  function zc(a, b) {
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

  function Ac(a, b) {
    for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f;) {
      var g = 31 - sc(f),
          h = 1 << g,
          k = e[g];

      if (-1 === k) {
        if (0 === (h & c) || 0 !== (h & d)) e[g] = zc(h, b);
      } else k <= b && (a.expiredLanes |= h);

      f &= ~h;
    }
  }

  function Bc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }

  function Cc() {
    var a = vc;
    vc <<= 1;
    0 === (vc & 4194240) && (vc = 64);
    return a;
  }

  function Dc(a) {
    for (var b = [], c = 0; 31 > c; c++) {
      b.push(a);
    }

    return b;
  }

  function Ec(a, b, c) {
    a.pendingLanes |= b;
    536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
    a = a.eventTimes;
    b = 31 - sc(b);
    a[b] = c;
  }

  function Fc(a, b) {
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
      var e = 31 - sc(c),
          f = 1 << e;
      b[e] = 0;
      d[e] = -1;
      a[e] = -1;
      c &= ~f;
    }
  }

  function Gc(a, b) {
    var c = a.entangledLanes |= b;

    for (a = a.entanglements; c;) {
      var d = 31 - sc(c),
          e = 1 << d;
      e & b | a[d] & b && (a[d] |= b);
      c &= ~e;
    }
  }

  var C = 0;

  function Hc(a) {
    a &= -a;
    return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
  }

  var Ic = ba.unstable_scheduleCallback,
      Jc = ba.unstable_cancelCallback,
      Kc = ba.unstable_shouldYield,
      Lc = ba.unstable_requestPaint,
      D = ba.unstable_now,
      Mc = ba.unstable_ImmediatePriority,
      Nc = ba.unstable_UserBlockingPriority,
      Oc = ba.unstable_NormalPriority,
      Pc = ba.unstable_IdlePriority,
      Qc = null,
      Rc = null;

  function Sc(a) {
    if (Rc && "function" === typeof Rc.onCommitFiberRoot) try {
      Rc.onCommitFiberRoot(Qc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {}
  }

  function Tc(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }

  var Uc = "function" === typeof Object.is ? Object.is : Tc,
      Vc = null,
      Wc = !1,
      Xc = !1;

  function Yc(a) {
    null === Vc ? Vc = [a] : Vc.push(a);
  }

  function Zc(a) {
    Wc = !0;
    Yc(a);
  }

  function $c() {
    if (!Xc && null !== Vc) {
      Xc = !0;
      var a = 0,
          b = C;

      try {
        var c = Vc;

        for (C = 1; a < c.length; a++) {
          var d = c[a];

          do {
            d = d(!0);
          } while (null !== d);
        }

        Vc = null;
        Wc = !1;
      } catch (e) {
        throw null !== Vc && (Vc = Vc.slice(a + 1)), Ic(Mc, $c), e;
      } finally {
        C = b, Xc = !1;
      }
    }

    return null;
  }

  var ad = da.ReactCurrentBatchConfig;

  function bd(a, b) {
    if (Uc(a, b)) return !0;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
    var c = Object.keys(a),
        d = Object.keys(b);
    if (c.length !== d.length) return !1;

    for (d = 0; d < c.length; d++) {
      var e = c[d];
      if (!ec.call(b, e) || !Uc(a[e], b[e])) return !1;
    }

    return !0;
  }

  function cd(a) {
    switch (a.tag) {
      case 5:
        return bc(a.type);

      case 16:
        return bc("Lazy");

      case 13:
        return bc("Suspense");

      case 19:
        return bc("SuspenseList");

      case 0:
      case 2:
      case 15:
        return a = dc(a.type, !1), a;

      case 11:
        return a = dc(a.type.render, !1), a;

      case 1:
        return a = dc(a.type, !0), a;

      default:
        return "";
    }
  }

  function dd(a, b) {
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

  var ed = hc(null),
      fd = null,
      gd = null,
      hd = null;

  function id() {
    hd = gd = fd = null;
  }

  function jd(a, b, c) {
    Sa ? (v(ed, b._currentValue), b._currentValue = c) : (v(ed, b._currentValue2), b._currentValue2 = c);
  }

  function kd(a) {
    var b = ed.current;
    p(ed);
    Sa ? a._currentValue = b : a._currentValue2 = b;
  }

  function ld(a, b, c) {
    for (; null !== a;) {
      var d = a.alternate;
      (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
      if (a === c) break;
      a = a["return"];
    }
  }

  function md(a, b) {
    fd = a;
    hd = gd = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (F = !0), a.firstContext = null);
  }

  function nd(a) {
    var b = Sa ? a._currentValue : a._currentValue2;
    if (hd !== a) if (a = {
      context: a,
      memoizedValue: b,
      next: null
    }, null === gd) {
      if (null === fd) throw Error(n(308));
      gd = a;
      fd.dependencies = {
        lanes: 0,
        firstContext: a
      };
    } else gd = gd.next = a;
    return b;
  }

  var od = null,
      pd = !1;

  function qd(a) {
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

  function rd(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = {
      baseState: a.baseState,
      firstBaseUpdate: a.firstBaseUpdate,
      lastBaseUpdate: a.lastBaseUpdate,
      shared: a.shared,
      effects: a.effects
    });
  }

  function sd(a, b) {
    return {
      eventTime: a,
      lane: b,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }

  function td(a, b) {
    var c = a.updateQueue;
    null !== c && (c = c.shared, ud(a) ? (a = c.interleaved, null === a ? (b.next = b, null === od ? od = [c] : od.push(c)) : (b.next = a.next, a.next = b), c.interleaved = b) : (a = c.pending, null === a ? b.next = b : (b.next = a.next, a.next = b), c.pending = b));
  }

  function vd(a, b, c) {
    b = b.updateQueue;

    if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Gc(a, c);
    }
  }

  function wd(a, b) {
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

  function xd(a, b, c, d) {
    var e = a.updateQueue;
    pd = !1;
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
      var m = a.alternate;
      null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
    }

    if (null !== f) {
      var r = e.baseState;
      g = 0;
      m = l = k = null;
      h = f;

      do {
        var q = h.lane,
            B = h.eventTime;

        if ((d & q) === q) {
          null !== m && (m = m.next = {
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
            q = b;
            B = c;

            switch (Z.tag) {
              case 1:
                w = Z.payload;

                if ("function" === typeof w) {
                  r = w.call(B, r, q);
                  break a;
                }

                r = w;
                break a;

              case 3:
                w.flags = w.flags & -65537 | 128;

              case 0:
                w = Z.payload;
                q = "function" === typeof w ? w.call(B, r, q) : w;
                if (null === q || void 0 === q) break a;
                r = ca({}, r, q);
                break a;

              case 2:
                pd = !0;
            }
          }

          null !== h.callback && 0 !== h.lane && (a.flags |= 64, q = e.effects, null === q ? e.effects = [h] : q.push(h));
        } else B = {
          eventTime: B,
          lane: q,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        }, null === m ? (l = m = B, k = r) : m = m.next = B, g |= q;

        h = h.next;
        if (null === h) if (h = e.shared.pending, null === h) break;else q = h, h = q.next, q.next = null, e.lastBaseUpdate = q, e.shared.pending = null;
      } while (1);

      null === m && (k = r);
      e.baseState = k;
      e.firstBaseUpdate = l;
      e.lastBaseUpdate = m;
      b = e.shared.interleaved;

      if (null !== b) {
        e = b;

        do {
          g |= e.lane, e = e.next;
        } while (e !== b);
      } else null === f && (e.shared.lanes = 0);

      yd |= g;
      a.lanes = g;
      a.memoizedState = r;
    }
  }

  function zd(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a) for (b = 0; b < a.length; b++) {
      var d = a[b],
          e = d.callback;

      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e) throw Error(n(191, e));
        e.call(d);
      }
    }
  }

  var Ad = new aa.Component().refs;

  function Bd(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : ca({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }

  var Ed = {
    isMounted: function isMounted(a) {
      return (a = a._reactInternals) ? wa(a) === a : !1;
    },
    enqueueSetState: function enqueueSetState(a, b, c) {
      a = a._reactInternals;
      var d = G(),
          e = Cd(a),
          f = sd(d, e);
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      td(a, f);
      b = Dd(a, e, d);
      null !== b && vd(b, a, e);
    },
    enqueueReplaceState: function enqueueReplaceState(a, b, c) {
      a = a._reactInternals;
      var d = G(),
          e = Cd(a),
          f = sd(d, e);
      f.tag = 1;
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      td(a, f);
      b = Dd(a, e, d);
      null !== b && vd(b, a, e);
    },
    enqueueForceUpdate: function enqueueForceUpdate(a, b) {
      a = a._reactInternals;
      var c = G(),
          d = Cd(a),
          e = sd(c, d);
      e.tag = 2;
      void 0 !== b && null !== b && (e.callback = b);
      td(a, e);
      b = Dd(a, d, c);
      null !== b && vd(b, a, d);
    }
  };

  function Fd(a, b, c, d, e, f, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !bd(c, d) || !bd(e, f) : !0;
  }

  function Gd(a, b, c) {
    var d = !1,
        e = ic;
    var f = b.contextType;
    "object" === typeof f && null !== f ? f = nd(f) : (e = A(b) ? jc : x.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? kc(a, e) : ic);
    b = new b(c, f);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Ed;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
    return b;
  }

  function Hd(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && Ed.enqueueReplaceState(b, b.state, null);
  }

  function Id(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = Ad;
    qd(a);
    var f = b.contextType;
    "object" === typeof f && null !== f ? e.context = nd(f) : (f = A(b) ? jc : x.current, e.context = kc(a, f));
    e.state = a.memoizedState;
    f = b.getDerivedStateFromProps;
    "function" === typeof f && (Bd(a, b, f, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ed.enqueueReplaceState(e, e.state, null), xd(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4194308);
  }

  var Jd = [],
      Kd = 0,
      Ld = null,
      Md = 0,
      Nd = [],
      Od = 0,
      Pd = null,
      Qd = 1,
      Rd = "";

  function Sd(a, b) {
    Jd[Kd++] = Md;
    Jd[Kd++] = Ld;
    Ld = a;
    Md = b;
  }

  function Td(a, b, c) {
    Nd[Od++] = Qd;
    Nd[Od++] = Rd;
    Nd[Od++] = Pd;
    Pd = a;
    var d = Qd;
    a = Rd;
    var e = 32 - sc(d) - 1;
    d &= ~(1 << e);
    c += 1;
    var f = 32 - sc(b) + e;

    if (30 < f) {
      var g = e - e % 5;
      f = (d & (1 << g) - 1).toString(32);
      d >>= g;
      e -= g;
      Qd = 1 << 32 - sc(b) + e | c << e | d;
      Rd = f + a;
    } else Qd = 1 << f | c << e | d, Rd = a;
  }

  function Ud(a) {
    null !== a["return"] && (Sd(a, 1), Td(a, 1, 0));
  }

  function Vd(a) {
    for (; a === Ld;) {
      Ld = Jd[--Kd], Jd[Kd] = null, Md = Jd[--Kd], Jd[Kd] = null;
    }

    for (; a === Pd;) {
      Pd = Nd[--Od], Nd[Od] = null, Rd = Nd[--Od], Nd[Od] = null, Qd = Nd[--Od], Nd[Od] = null;
    }
  }

  var Wd = null,
      Xd = null,
      H = !1,
      Yd = !1,
      Zd = null;

  function $d(a, b) {
    var c = ae(5, null, null, 0);
    c.elementType = "DELETED";
    c.stateNode = b;
    c["return"] = a;
    b = a.deletions;
    null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
  }

  function be(a, b) {
    switch (a.tag) {
      case 5:
        return b = Gb(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, Wd = a, Xd = Nb(b), !0) : !1;

      case 6:
        return b = Hb(b, a.pendingProps), null !== b ? (a.stateNode = b, Wd = a, Xd = null, !0) : !1;

      case 13:
        b = Ib(b);

        if (null !== b) {
          var c = null !== Pd ? {
            id: Qd,
            overflow: Rd
          } : null;
          a.memoizedState = {
            dehydrated: b,
            treeContext: c,
            retryLane: 1073741824
          };
          c = ae(18, null, null, 0);
          c.stateNode = b;
          c["return"] = a;
          a.child = c;
          Wd = a;
          Xd = null;
          return !0;
        }

        return !1;

      default:
        return !1;
    }
  }

  function ce(a) {
    return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
  }

  function de(a) {
    if (H) {
      var b = Xd;

      if (b) {
        var c = b;

        if (!be(a, b)) {
          if (ce(a)) throw Error(n(418));
          b = Mb(c);
          var d = Wd;
          b && be(a, b) ? $d(d, c) : (a.flags = a.flags & -4097 | 2, H = !1, Wd = a);
        }
      } else {
        if (ce(a)) throw Error(n(418));
        a.flags = a.flags & -4097 | 2;
        H = !1;
        Wd = a;
      }
    }
  }

  function ee(a) {
    for (a = a["return"]; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) {
      a = a["return"];
    }

    Wd = a;
  }

  function fe(a) {
    if (!Va || a !== Wd) return !1;
    if (!H) return ee(a), H = !0, !1;

    if (3 !== a.tag && (5 !== a.tag || Yb(a.type) && !Na(a.type, a.memoizedProps))) {
      var b = Xd;

      if (b) {
        if (ce(a)) {
          for (a = Xd; a;) {
            a = Mb(a);
          }

          throw Error(n(418));
        }

        for (; b;) {
          $d(a, b), b = Mb(b);
        }
      }
    }

    ee(a);

    if (13 === a.tag) {
      if (!Va) throw Error(n(316));
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(n(317));
      Xd = Tb(a);
    } else Xd = Wd ? Mb(a.stateNode) : null;

    return !0;
  }

  function ge() {
    Va && (Xd = Wd = null, Yd = H = !1);
  }

  function he(a) {
    null === Zd ? Zd = [a] : Zd.push(a);
  }

  function ie(a, b, c) {
    a = c.ref;

    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;

        if (c) {
          if (1 !== c.tag) throw Error(n(309));
          var d = c.stateNode;
        }

        if (!d) throw Error(n(147, a));
        var e = d,
            f = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;

        b = function b(a) {
          var b = e.refs;
          b === Ad && (b = e.refs = {});
          null === a ? delete b[f] : b[f] = a;
        };

        b._stringRef = f;
        return b;
      }

      if ("string" !== typeof a) throw Error(n(284));
      if (!c._owner) throw Error(n(290, a));
    }

    return a;
  }

  function je(a, b) {
    a = Object.prototype.toString.call(b);
    throw Error(n(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
  }

  function ke(a) {
    var b = a._init;
    return b(a._payload);
  }

  function le(a) {
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
      a = me(a, b);
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
      if (null === b || 6 !== b.tag) return b = ne(c, a.mode, d), b["return"] = a, b;
      b = e(b, c);
      b["return"] = a;
      return b;
    }

    function k(a, b, c, d) {
      var f = c.type;
      if (f === ha) return m(a, b, c.props.children, d, c.key);
      if (null !== b && (b.elementType === f || "object" === typeof f && null !== f && f.$$typeof === qa && ke(f) === b.type)) return d = e(b, c.props), d.ref = ie(a, b, c), d["return"] = a, d;
      d = oe(c.type, c.key, c.props, null, a.mode, d);
      d.ref = ie(a, b, c);
      d["return"] = a;
      return d;
    }

    function l(a, b, c, d) {
      if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = pe(c, a.mode, d), b["return"] = a, b;
      b = e(b, c.children || []);
      b["return"] = a;
      return b;
    }

    function m(a, b, c, d, f) {
      if (null === b || 7 !== b.tag) return b = qe(c, a.mode, d, f), b["return"] = a, b;
      b = e(b, c);
      b["return"] = a;
      return b;
    }

    function r(a, b, c) {
      if ("string" === typeof b && "" !== b || "number" === typeof b) return b = ne("" + b, a.mode, c), b["return"] = a, b;

      if ("object" === typeof b && null !== b) {
        switch (b.$$typeof) {
          case ea:
            return c = oe(b.type, b.key, b.props, null, a.mode, c), c.ref = ie(a, null, b), c["return"] = a, c;

          case fa:
            return b = pe(b, a.mode, c), b["return"] = a, b;

          case qa:
            var d = b._init;
            return r(a, d(b._payload), c);
        }

        if (Da(b) || ta(b)) return b = qe(b, a.mode, c, null), b["return"] = a, b;
        je(a, b);
      }

      return null;
    }

    function q(a, b, c, d) {
      var e = null !== b ? b.key : null;
      if ("string" === typeof c && "" !== c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);

      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case ea:
            return c.key === e ? k(a, b, c, d) : null;

          case fa:
            return c.key === e ? l(a, b, c, d) : null;

          case qa:
            return e = c._init, q(a, b, e(c._payload), d);
        }

        if (Da(c) || ta(c)) return null !== e ? null : m(a, b, c, d, null);
        je(a, c);
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

        if (Da(d) || ta(d)) return a = a.get(c) || null, m(b, a, d, e, null);
        je(b, d);
      }

      return null;
    }

    function w(e, g, h, k) {
      for (var l = null, m = null, u = g, t = g = 0, E = null; null !== u && t < h.length; t++) {
        u.index > t ? (E = u, u = null) : E = u.sibling;
        var y = q(e, u, h[t], k);

        if (null === y) {
          null === u && (u = E);
          break;
        }

        a && u && null === y.alternate && b(e, u);
        g = f(y, g, t);
        null === m ? l = y : m.sibling = y;
        m = y;
        u = E;
      }

      if (t === h.length) return c(e, u), H && Sd(e, t), l;

      if (null === u) {
        for (; t < h.length; t++) {
          u = r(e, h[t], k), null !== u && (g = f(u, g, t), null === m ? l = u : m.sibling = u, m = u);
        }

        H && Sd(e, t);
        return l;
      }

      for (u = d(e, u); t < h.length; t++) {
        E = B(u, e, t, h[t], k), null !== E && (a && null !== E.alternate && u["delete"](null === E.key ? t : E.key), g = f(E, g, t), null === m ? l = E : m.sibling = E, m = E);
      }

      a && u.forEach(function (a) {
        return b(e, a);
      });
      H && Sd(e, t);
      return l;
    }

    function Z(e, g, h, k) {
      var l = ta(h);
      if ("function" !== typeof l) throw Error(n(150));
      h = l.call(h);
      if (null == h) throw Error(n(151));

      for (var u = l = null, m = g, t = g = 0, E = null, y = h.next(); null !== m && !y.done; t++, y = h.next()) {
        m.index > t ? (E = m, m = null) : E = m.sibling;
        var w = q(e, m, y.value, k);

        if (null === w) {
          null === m && (m = E);
          break;
        }

        a && m && null === w.alternate && b(e, m);
        g = f(w, g, t);
        null === u ? l = w : u.sibling = w;
        u = w;
        m = E;
      }

      if (y.done) return c(e, m), H && Sd(e, t), l;

      if (null === m) {
        for (; !y.done; t++, y = h.next()) {
          y = r(e, y.value, k), null !== y && (g = f(y, g, t), null === u ? l = y : u.sibling = y, u = y);
        }

        H && Sd(e, t);
        return l;
      }

      for (m = d(e, m); !y.done; t++, y = h.next()) {
        y = B(m, e, t, y.value, k), null !== y && (a && null !== y.alternate && m["delete"](null === y.key ? t : y.key), g = f(y, g, t), null === u ? l = y : u.sibling = y, u = y);
      }

      a && m.forEach(function (a) {
        return b(e, a);
      });
      H && Sd(e, t);
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
                  } else if (l.elementType === k || "object" === typeof k && null !== k && k.$$typeof === qa && ke(k) === l.type) {
                    c(a, l.sibling);
                    d = e(l, f.props);
                    d.ref = ie(a, l, f);
                    d["return"] = a;
                    a = d;
                    break a;
                  }

                  c(a, l);
                  break;
                } else b(a, l);

                l = l.sibling;
              }

              f.type === ha ? (d = qe(f.props.children, a.mode, h, f.key), d["return"] = a, a = d) : (h = oe(f.type, f.key, f.props, null, a.mode, h), h.ref = ie(a, d, f), h["return"] = a, a = h);
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

              d = pe(f, a.mode, h);
              d["return"] = a;
              a = d;
            }

            return g(a);

          case qa:
            return l = f._init, za(a, d, l(f._payload), h);
        }

        if (Da(f)) return w(a, d, f, h);
        if (ta(f)) return Z(a, d, f, h);
        je(a, f);
      }

      return "string" === typeof f && "" !== f || "number" === typeof f ? (f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d["return"] = a, a = d) : (c(a, d), d = ne(f, a.mode, h), d["return"] = a, a = d), g(a)) : c(a, d);
    }

    return za;
  }

  var re = le(!0),
      se = le(!1),
      te = {},
      ue = hc(te),
      ve = hc(te),
      we = hc(te);

  function xe(a) {
    if (a === te) throw Error(n(174));
    return a;
  }

  function ye(a, b) {
    v(we, b);
    v(ve, a);
    v(ue, te);
    a = Fa(b);
    p(ue);
    v(ue, a);
  }

  function ze() {
    p(ue);
    p(ve);
    p(we);
  }

  function Ae(a) {
    var b = xe(we.current),
        c = xe(ue.current);
    b = Ga(c, a.type, b);
    c !== b && (v(ve, a), v(ue, b));
  }

  function Be(a) {
    ve.current === a && (p(ue), p(ve));
  }

  var I = hc(0);

  function Ce(a) {
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

  var De = [];

  function Ee() {
    for (var a = 0; a < De.length; a++) {
      var b = De[a];
      Sa ? b._workInProgressVersionPrimary = null : b._workInProgressVersionSecondary = null;
    }

    De.length = 0;
  }

  var Fe = da.ReactCurrentDispatcher,
      Ge = da.ReactCurrentBatchConfig,
      He = 0,
      J = null,
      K = null,
      L = null,
      Ie = !1,
      Je = !1,
      Ke = 0,
      Le = 0;

  function M() {
    throw Error(n(321));
  }

  function Me(a, b) {
    if (null === b) return !1;

    for (var c = 0; c < b.length && c < a.length; c++) {
      if (!Uc(a[c], b[c])) return !1;
    }

    return !0;
  }

  function Ne(a, b, c, d, e, f) {
    He = f;
    J = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Fe.current = null === a || null === a.memoizedState ? Oe : Pe;
    a = c(d, e);

    if (Je) {
      f = 0;

      do {
        Je = !1;
        Ke = 0;
        if (25 <= f) throw Error(n(301));
        f += 1;
        L = K = null;
        b.updateQueue = null;
        Fe.current = Qe;
        a = c(d, e);
      } while (Je);
    }

    Fe.current = Re;
    b = null !== K && null !== K.next;
    He = 0;
    L = K = J = null;
    Ie = !1;
    if (b) throw Error(n(300));
    return a;
  }

  function Se() {
    var a = 0 !== Ke;
    Ke = 0;
    return a;
  }

  function Te() {
    var a = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    null === L ? J.memoizedState = L = a : L = L.next = a;
    return L;
  }

  function Ue() {
    if (null === K) {
      var a = J.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = K.next;

    var b = null === L ? J.memoizedState : L.next;
    if (null !== b) L = b, K = a;else {
      if (null === a) throw Error(n(310));
      K = a;
      a = {
        memoizedState: K.memoizedState,
        baseState: K.baseState,
        baseQueue: K.baseQueue,
        queue: K.queue,
        next: null
      };
      null === L ? J.memoizedState = L = a : L = L.next = a;
    }
    return L;
  }

  function Ve(a, b) {
    return "function" === typeof b ? b(a) : b;
  }

  function We(a) {
    var b = Ue(),
        c = b.queue;
    if (null === c) throw Error(n(311));
    c.lastRenderedReducer = a;
    var d = K,
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
        var m = l.lane;
        if ((He & m) === m) null !== k && (k = k.next = {
          lane: 0,
          action: l.action,
          hasEagerState: l.hasEagerState,
          eagerState: l.eagerState,
          next: null
        }), d = l.hasEagerState ? l.eagerState : a(d, l.action);else {
          var r = {
            lane: m,
            action: l.action,
            hasEagerState: l.hasEagerState,
            eagerState: l.eagerState,
            next: null
          };
          null === k ? (h = k = r, g = d) : k = k.next = r;
          J.lanes |= m;
          yd |= m;
        }
        l = l.next;
      } while (null !== l && l !== f);

      null === k ? g = d : k.next = h;
      Uc(d, b.memoizedState) || (F = !0);
      b.memoizedState = d;
      b.baseState = g;
      b.baseQueue = k;
      c.lastRenderedState = d;
    }

    a = c.interleaved;

    if (null !== a) {
      e = a;

      do {
        f = e.lane, J.lanes |= f, yd |= f, e = e.next;
      } while (e !== a);
    } else null === e && (c.lanes = 0);

    return [b.memoizedState, c.dispatch];
  }

  function Xe(a) {
    var b = Ue(),
        c = b.queue;
    if (null === c) throw Error(n(311));
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

      Uc(f, b.memoizedState) || (F = !0);
      b.memoizedState = f;
      null === b.baseQueue && (b.baseState = f);
      c.lastRenderedState = f;
    }

    return [f, d];
  }

  function Ye() {}

  function Ze(a, b) {
    var c = J,
        d = Ue(),
        e = b(),
        f = !Uc(d.memoizedState, e);
    f && (d.memoizedState = e, F = !0);
    d = d.queue;
    $e(af.bind(null, c, d, a), [a]);

    if (d.getSnapshot !== b || f || null !== L && L.memoizedState.tag & 1) {
      c.flags |= 2048;
      bf(9, cf.bind(null, c, d, e, b), void 0, null);
      if (null === N) throw Error(n(349));
      0 !== (He & 30) || df(c, b, e);
    }

    return e;
  }

  function df(a, b, c) {
    a.flags |= 16384;
    a = {
      getSnapshot: b,
      value: c
    };
    b = J.updateQueue;
    null === b ? (b = {
      lastEffect: null,
      stores: null
    }, J.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
  }

  function cf(a, b, c, d) {
    b.value = c;
    b.getSnapshot = d;
    ef(b) && Dd(a, 1, -1);
  }

  function af(a, b, c) {
    return c(function () {
      ef(b) && Dd(a, 1, -1);
    });
  }

  function ef(a) {
    var b = a.getSnapshot;
    a = a.value;

    try {
      var c = b();
      return !Uc(a, c);
    } catch (d) {
      return !0;
    }
  }

  function ff(a) {
    var b = Te();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ve,
      lastRenderedState: a
    };
    b.queue = a;
    a = a.dispatch = gf.bind(null, J, a);
    return [b.memoizedState, a];
  }

  function bf(a, b, c, d) {
    a = {
      tag: a,
      create: b,
      destroy: c,
      deps: d,
      next: null
    };
    b = J.updateQueue;
    null === b ? (b = {
      lastEffect: null,
      stores: null
    }, J.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }

  function hf() {
    return Ue().memoizedState;
  }

  function jf(a, b, c, d) {
    var e = Te();
    J.flags |= a;
    e.memoizedState = bf(1 | b, c, void 0, void 0 === d ? null : d);
  }

  function kf(a, b, c, d) {
    var e = Ue();
    d = void 0 === d ? null : d;
    var f = void 0;

    if (null !== K) {
      var g = K.memoizedState;
      f = g.destroy;

      if (null !== d && Me(d, g.deps)) {
        e.memoizedState = bf(b, c, f, d);
        return;
      }
    }

    J.flags |= a;
    e.memoizedState = bf(1 | b, c, f, d);
  }

  function lf(a, b) {
    return jf(8390656, 8, a, b);
  }

  function $e(a, b) {
    return kf(2048, 8, a, b);
  }

  function mf(a, b) {
    return kf(4, 2, a, b);
  }

  function nf(a, b) {
    return kf(4, 4, a, b);
  }

  function of(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function () {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
      b.current = null;
    };
  }

  function pf(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return kf(4, 4, of.bind(null, b, a), c);
  }

  function qf() {}

  function rf(a, b) {
    var c = Ue();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Me(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }

  function sf(a, b) {
    var c = Ue();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Me(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }

  function tf(a, b, c) {
    if (0 === (He & 21)) return a.baseState && (a.baseState = !1, F = !0), a.memoizedState = c;
    Uc(c, b) || (c = Cc(), J.lanes |= c, yd |= c, a.baseState = !0);
    return b;
  }

  function uf(a, b) {
    var c = C;
    C = 0 !== c && 4 > c ? c : 4;
    a(!0);
    var d = Ge.transition;
    Ge.transition = {};

    try {
      a(!1), b();
    } finally {
      C = c, Ge.transition = d;
    }
  }

  function vf() {
    return Ue().memoizedState;
  }

  function wf(a, b, c) {
    var d = Cd(a);
    c = {
      lane: d,
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    xf(a) ? yf(b, c) : (zf(a, b, c), c = G(), a = Dd(a, d, c), null !== a && Af(a, b, d));
  }

  function gf(a, b, c) {
    var d = Cd(a),
        e = {
      lane: d,
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (xf(a)) yf(b, e);else {
      zf(a, b, e);
      var f = a.alternate;
      if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
        var g = b.lastRenderedState,
            h = f(g, c);
        e.hasEagerState = !0;
        e.eagerState = h;
        if (Uc(h, g)) return;
      } catch (k) {} finally {}
      c = G();
      a = Dd(a, d, c);
      null !== a && Af(a, b, d);
    }
  }

  function xf(a) {
    var b = a.alternate;
    return a === J || null !== b && b === J;
  }

  function yf(a, b) {
    Je = Ie = !0;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }

  function zf(a, b, c) {
    ud(a) ? (a = b.interleaved, null === a ? (c.next = c, null === od ? od = [b] : od.push(b)) : (c.next = a.next, a.next = c), b.interleaved = c) : (a = b.pending, null === a ? c.next = c : (c.next = a.next, a.next = c), b.pending = c);
  }

  function Af(a, b, c) {
    if (0 !== (c & 4194240)) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Gc(a, c);
    }
  }

  var Re = {
    readContext: nd,
    useCallback: M,
    useContext: M,
    useEffect: M,
    useImperativeHandle: M,
    useInsertionEffect: M,
    useLayoutEffect: M,
    useMemo: M,
    useReducer: M,
    useRef: M,
    useState: M,
    useDebugValue: M,
    useDeferredValue: M,
    useTransition: M,
    useMutableSource: M,
    useSyncExternalStore: M,
    useId: M,
    unstable_isNewReconciler: !1
  },
      Oe = {
    readContext: nd,
    useCallback: function useCallback(a, b) {
      Te().memoizedState = [a, void 0 === b ? null : b];
      return a;
    },
    useContext: nd,
    useEffect: lf,
    useImperativeHandle: function useImperativeHandle(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return jf(4194308, 4, of.bind(null, b, a), c);
    },
    useLayoutEffect: function useLayoutEffect(a, b) {
      return jf(4194308, 4, a, b);
    },
    useInsertionEffect: function useInsertionEffect(a, b) {
      return jf(4, 2, a, b);
    },
    useMemo: function useMemo(a, b) {
      var c = Te();
      b = void 0 === b ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    },
    useReducer: function useReducer(a, b, c) {
      var d = Te();
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
      a = a.dispatch = wf.bind(null, J, a);
      return [d.memoizedState, a];
    },
    useRef: function useRef(a) {
      var b = Te();
      a = {
        current: a
      };
      return b.memoizedState = a;
    },
    useState: ff,
    useDebugValue: qf,
    useDeferredValue: function useDeferredValue(a) {
      return Te().memoizedState = a;
    },
    useTransition: function useTransition() {
      var a = ff(!1),
          b = a[0];
      a = uf.bind(null, a[1]);
      Te().memoizedState = a;
      return [b, a];
    },
    useMutableSource: function useMutableSource() {},
    useSyncExternalStore: function useSyncExternalStore(a, b, c) {
      var d = J,
          e = Te();

      if (H) {
        if (void 0 === c) throw Error(n(407));
        c = c();
      } else {
        c = b();
        if (null === N) throw Error(n(349));
        0 !== (He & 30) || df(d, b, c);
      }

      e.memoizedState = c;
      var f = {
        value: c,
        getSnapshot: b
      };
      e.queue = f;
      lf(af.bind(null, d, f, a), [a]);
      d.flags |= 2048;
      bf(9, cf.bind(null, d, f, c, b), void 0, null);
      return c;
    },
    useId: function useId() {
      var a = Te(),
          b = N.identifierPrefix;

      if (H) {
        var c = Rd;
        var d = Qd;
        c = (d & ~(1 << 32 - sc(d) - 1)).toString(32) + c;
        b = ":" + b + "R" + c;
        c = Ke++;
        0 < c && (b += "H" + c.toString(32));
        b += ":";
      } else c = Le++, b = ":" + b + "r" + c.toString(32) + ":";

      return a.memoizedState = b;
    },
    unstable_isNewReconciler: !1
  },
      Pe = {
    readContext: nd,
    useCallback: rf,
    useContext: nd,
    useEffect: $e,
    useImperativeHandle: pf,
    useInsertionEffect: mf,
    useLayoutEffect: nf,
    useMemo: sf,
    useReducer: We,
    useRef: hf,
    useState: function useState() {
      return We(Ve);
    },
    useDebugValue: qf,
    useDeferredValue: function useDeferredValue(a) {
      var b = Ue();
      return tf(b, K.memoizedState, a);
    },
    useTransition: function useTransition() {
      var a = We(Ve)[0],
          b = Ue().memoizedState;
      return [a, b];
    },
    useMutableSource: Ye,
    useSyncExternalStore: Ze,
    useId: vf,
    unstable_isNewReconciler: !1
  },
      Qe = {
    readContext: nd,
    useCallback: rf,
    useContext: nd,
    useEffect: $e,
    useImperativeHandle: pf,
    useInsertionEffect: mf,
    useLayoutEffect: nf,
    useMemo: sf,
    useReducer: Xe,
    useRef: hf,
    useState: function useState() {
      return Xe(Ve);
    },
    useDebugValue: qf,
    useDeferredValue: function useDeferredValue(a) {
      var b = Ue();
      return null === K ? b.memoizedState = a : tf(b, K.memoizedState, a);
    },
    useTransition: function useTransition() {
      var a = Xe(Ve)[0],
          b = Ue().memoizedState;
      return [a, b];
    },
    useMutableSource: Ye,
    useSyncExternalStore: Ze,
    useId: vf,
    unstable_isNewReconciler: !1
  };

  function Bf(a, b) {
    try {
      var c = "",
          d = b;

      do {
        c += cd(d), d = d["return"];
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

  function Cf(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function () {
        throw c;
      });
    }
  }

  var Df = "function" === typeof WeakMap ? WeakMap : Map;

  function Ef(a, b, c) {
    c = sd(-1, c);
    c.tag = 3;
    c.payload = {
      element: null
    };
    var d = b.value;

    c.callback = function () {
      Ff || (Ff = !0, Gf = d);
      Cf(a, b);
    };

    return c;
  }

  function Hf(a, b, c) {
    c = sd(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;

    if ("function" === typeof d) {
      var e = b.value;

      c.payload = function () {
        return d(e);
      };

      c.callback = function () {
        Cf(a, b);
      };
    }

    var f = a.stateNode;
    null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
      Cf(a, b);
      "function" !== typeof d && (null === If ? If = new Set([this]) : If.add(this));
      var c = b.stack;
      this.componentDidCatch(b.value, {
        componentStack: null !== c ? c : ""
      });
    });
    return c;
  }

  function Jf(a, b, c) {
    var d = a.pingCache;

    if (null === d) {
      d = a.pingCache = new Df();
      var e = new Set();
      d.set(b, e);
    } else e = d.get(b), void 0 === e && (e = new Set(), d.set(b, e));

    e.has(c) || (e.add(c), a = Kf.bind(null, a, b, c), b.then(a, a));
  }

  function Lf(a) {
    do {
      var b;
      if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;
      if (b) return a;
      a = a["return"];
    } while (null !== a);

    return null;
  }

  function Mf(a, b, c, d, e) {
    if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = sd(-1, 1), b.tag = 2, td(c, b))), c.lanes |= 1), a;
    a.flags |= 65536;
    a.lanes = e;
    return a;
  }

  function Nf(a) {
    a.flags |= 4;
  }

  function Of(a, b) {
    if (null !== a && a.child === b.child) return !0;
    if (0 !== (b.flags & 16)) return !1;

    for (a = b.child; null !== a;) {
      if (0 !== (a.flags & 12854) || 0 !== (a.subtreeFlags & 12854)) return !1;
      a = a.sibling;
    }

    return !0;
  }

  var _Pf, Qf, Rf, Sf;

  if (Ta) _Pf = function Pf(a, b) {
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
  }, Qf = function Qf() {}, Rf = function Rf(a, b, c, d, e) {
    a = a.memoizedProps;

    if (a !== d) {
      var f = b.stateNode,
          g = xe(ue.current);
      c = Ma(f, c, a, d, e, g);
      (b.updateQueue = c) && Nf(b);
    }
  }, Sf = function Sf(a, b, c, d) {
    c !== d && Nf(b);
  };else if (Ua) {
    _Pf = function Pf(a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = Eb(f, e.type, e.memoizedProps, e));
          Ka(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = Fb(f, e.memoizedProps, e)), Ka(a, f);else if (4 !== e.tag) if (22 === e.tag && null !== e.memoizedState) f = e.child, null !== f && (f["return"] = e), _Pf(a, e, !0, !0);else if (null !== e.child) {
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

    var Tf = function Tf(a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = Eb(f, e.type, e.memoizedProps, e));
          Ab(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = Fb(f, e.memoizedProps, e)), Ab(a, f);else if (4 !== e.tag) if (22 === e.tag && null !== e.memoizedState) f = e.child, null !== f && (f["return"] = e), Tf(a, e, !0, !0);else if (null !== e.child) {
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

    Qf = function Qf(a, b) {
      var c = b.stateNode;

      if (!Of(a, b)) {
        a = c.containerInfo;
        var d = zb(a);
        Tf(d, b, !1, !1);
        c.pendingChildren = d;
        Nf(b);
        Bb(a, d);
      }
    };

    Rf = function Rf(a, b, c, d, e) {
      var f = a.stateNode,
          g = a.memoizedProps;
      if ((a = Of(a, b)) && g === d) b.stateNode = f;else {
        var h = b.stateNode,
            k = xe(ue.current),
            l = null;
        g !== d && (l = Ma(h, c, g, d, e, k));
        a && null === l ? b.stateNode = f : (f = yb(f, l, c, g, d, b, a, h), La(f, c, d, e, k) && Nf(b), b.stateNode = f, a ? Nf(b) : _Pf(f, b, !1, !1));
      }
    };

    Sf = function Sf(a, b, c, d) {
      c !== d ? (a = xe(we.current), c = xe(ue.current), b.stateNode = Oa(d, a, c, b), Nf(b)) : b.stateNode = a.stateNode;
    };
  } else Qf = function Qf() {}, Rf = function Rf() {}, Sf = function Sf() {};

  function Uf(a, b) {
    if (!H) switch (a.tailMode) {
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

  function O(a) {
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

  function Vf(a, b, c) {
    var d = b.pendingProps;
    Vd(b);

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
        return O(b), null;

      case 1:
        return A(b.type) && lc(), O(b), null;

      case 3:
        d = b.stateNode;
        ze();
        p(z);
        p(x);
        Ee();
        d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
        if (null === a || null === a.child) fe(b) ? Nf(b) : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== Zd && (Wf(Zd), Zd = null));
        Qf(a, b);
        O(b);
        return null;

      case 5:
        Be(b);
        c = xe(we.current);
        var e = b.type;
        if (null !== a && null != b.stateNode) Rf(a, b, e, d, c), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);else {
          if (!d) {
            if (null === b.stateNode) throw Error(n(166));
            O(b);
            return null;
          }

          a = xe(ue.current);

          if (fe(b)) {
            if (!Va) throw Error(n(175));
            a = Qb(b.stateNode, b.type, b.memoizedProps, c, a, b, !Yd);
            b.updateQueue = a;
            null !== a && Nf(b);
          } else {
            var f = Ja(e, d, c, a, b);

            _Pf(f, b, !1, !1);

            b.stateNode = f;
            La(f, e, d, c, a) && Nf(b);
          }

          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        O(b);
        return null;

      case 6:
        if (a && null != b.stateNode) Sf(a, b, a.memoizedProps, d);else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(n(166));
          a = xe(we.current);
          c = xe(ue.current);

          if (fe(b)) {
            if (!Va) throw Error(n(176));
            a = b.stateNode;
            d = b.memoizedProps;
            if (c = Rb(a, d, b, !Yd)) if (e = Wd, null !== e) switch (e.tag) {
              case 3:
                Zb(e.stateNode.containerInfo, a, d, 0 !== (e.mode & 1));
                break;

              case 5:
                $b(e.type, e.memoizedProps, e.stateNode, a, d, 0 !== (e.mode & 1));
            }
            c && Nf(b);
          } else b.stateNode = Oa(d, a, c, b);
        }
        O(b);
        return null;

      case 13:
        p(I);
        d = b.memoizedState;

        if (H && null !== Xd && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) {
          for (a = Xd; a;) {
            a = Mb(a);
          }

          ge();
          b.flags |= 98560;
          return b;
        }

        if (null !== d && null !== d.dehydrated) {
          d = fe(b);

          if (null === a) {
            if (!d) throw Error(n(318));
            if (!Va) throw Error(n(344));
            a = b.memoizedState;
            a = null !== a ? a.dehydrated : null;
            if (!a) throw Error(n(317));
            Sb(a, b);
          } else ge(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;

          O(b);
          return null;
        }

        null !== Zd && (Wf(Zd), Zd = null);
        if (0 !== (b.flags & 128)) return b.lanes = c, b;
        d = null !== d;
        c = !1;
        null === a ? fe(b) : c = null !== a.memoizedState;
        d !== c && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (I.current & 1) ? 0 === P && (P = 3) : Xf()));
        null !== b.updateQueue && (b.flags |= 4);
        O(b);
        return null;

      case 4:
        return ze(), Qf(a, b), null === a && Xa(b.stateNode.containerInfo), O(b), null;

      case 10:
        return kd(b.type._context), O(b), null;

      case 17:
        return A(b.type) && lc(), O(b), null;

      case 19:
        p(I);
        e = b.memoizedState;
        if (null === e) return O(b), null;
        d = 0 !== (b.flags & 128);
        f = e.rendering;
        if (null === f) {
          if (d) Uf(e, !1);else {
            if (0 !== P || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a;) {
              f = Ce(a);

              if (null !== f) {
                b.flags |= 128;
                Uf(e, !1);
                a = f.updateQueue;
                null !== a && (b.updateQueue = a, b.flags |= 4);
                b.subtreeFlags = 0;
                a = c;

                for (d = b.child; null !== d;) {
                  c = d, e = a, c.flags &= 14680066, f = c.alternate, null === f ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = f.childLanes, c.lanes = f.lanes, c.child = f.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = f.memoizedProps, c.memoizedState = f.memoizedState, c.updateQueue = f.updateQueue, c.type = f.type, e = f.dependencies, c.dependencies = null === e ? null : {
                    lanes: e.lanes,
                    firstContext: e.firstContext
                  }), d = d.sibling;
                }

                v(I, I.current & 1 | 2);
                return b.child;
              }

              a = a.sibling;
            }
            null !== e.tail && D() > Yf && (b.flags |= 128, d = !0, Uf(e, !1), b.lanes = 4194304);
          }
        } else {
          if (!d) if (a = Ce(f), null !== a) {
            if (b.flags |= 128, d = !0, a = a.updateQueue, null !== a && (b.updateQueue = a, b.flags |= 4), Uf(e, !0), null === e.tail && "hidden" === e.tailMode && !f.alternate && !H) return O(b), null;
          } else 2 * D() - e.renderingStartTime > Yf && 1073741824 !== c && (b.flags |= 128, d = !0, Uf(e, !1), b.lanes = 4194304);
          e.isBackwards ? (f.sibling = b.child, b.child = f) : (a = e.last, null !== a ? a.sibling = f : b.child = f, e.last = f);
        }
        if (null !== e.tail) return b = e.tail, e.rendering = b, e.tail = b.sibling, e.renderingStartTime = D(), b.sibling = null, a = I.current, v(I, d ? a & 1 | 2 : a & 1), b;
        O(b);
        return null;

      case 22:
      case 23:
        return Zf(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== ($f & 1073741824) && (O(b), Ta && b.subtreeFlags & 6 && (b.flags |= 8192)) : O(b), null;

      case 24:
        return null;

      case 25:
        return null;
    }

    throw Error(n(156, b.tag));
  }

  var ag = da.ReactCurrentOwner,
      F = !1;

  function Q(a, b, c, d) {
    b.child = null === a ? se(b, null, c, d) : re(b, a.child, c, d);
  }

  function bg(a, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    md(b, e);
    d = Ne(a, b, c, d, f, e);
    c = Se();
    if (null !== a && !F) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, cg(a, b, e);
    H && c && Ud(b);
    b.flags |= 1;
    Q(a, b, d, e);
    return b.child;
  }

  function dg(a, b, c, d, e) {
    if (null === a) {
      var f = c.type;
      if ("function" === typeof f && !eg(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, fg(a, b, f, d, e);
      a = oe(c.type, null, d, b, b.mode, e);
      a.ref = b.ref;
      a["return"] = b;
      return b.child = a;
    }

    f = a.child;

    if (0 === (a.lanes & e)) {
      var g = f.memoizedProps;
      c = c.compare;
      c = null !== c ? c : bd;
      if (c(g, d) && a.ref === b.ref) return cg(a, b, e);
    }

    b.flags |= 1;
    a = me(f, d);
    a.ref = b.ref;
    a["return"] = b;
    return b.child = a;
  }

  function fg(a, b, c, d, e) {
    if (null !== a) {
      var f = a.memoizedProps;
      if (bd(f, d) && a.ref === b.ref) if (F = !1, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (F = !0);else return b.lanes = a.lanes, cg(a, b, e);
    }

    return gg(a, b, c, d, e);
  }

  function hg(a, b, c) {
    var d = b.pendingProps,
        e = d.children,
        f = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode) {
      if (0 === (b.mode & 1)) b.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, v(ig, $f), $f |= c;else if (0 !== (c & 1073741824)) b.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, d = null !== f ? f.baseLanes : c, v(ig, $f), $f |= d;else return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
        baseLanes: a,
        cachePool: null,
        transitions: null
      }, b.updateQueue = null, v(ig, $f), $f |= a, null;
    } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, v(ig, $f), $f |= d;
    Q(a, b, e, c);
    return b.child;
  }

  function jg(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
  }

  function gg(a, b, c, d, e) {
    var f = A(c) ? jc : x.current;
    f = kc(b, f);
    md(b, e);
    c = Ne(a, b, c, d, f, e);
    d = Se();
    if (null !== a && !F) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, cg(a, b, e);
    H && d && Ud(b);
    b.flags |= 1;
    Q(a, b, c, e);
    return b.child;
  }

  function kg(a, b, c, d, e) {
    if (A(c)) {
      var f = !0;
      pc(b);
    } else f = !1;

    md(b, e);
    if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), Gd(b, c, d), Id(b, c, d, e), d = !0;else if (null === a) {
      var g = b.stateNode,
          h = b.memoizedProps;
      g.props = h;
      var k = g.context,
          l = c.contextType;
      "object" === typeof l && null !== l ? l = nd(l) : (l = A(c) ? jc : x.current, l = kc(b, l));
      var m = c.getDerivedStateFromProps,
          r = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
      r || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hd(b, g, d, l);
      pd = !1;
      var q = b.memoizedState;
      g.state = q;
      xd(b, d, g, e);
      k = b.memoizedState;
      h !== d || q !== k || z.current || pd ? ("function" === typeof m && (Bd(b, c, m, d), k = b.memoizedState), (h = pd || Fd(b, c, h, d, q, k, l)) ? (r || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = !1);
    } else {
      g = b.stateNode;
      rd(a, b);
      h = b.memoizedProps;
      l = b.type === b.elementType ? h : dd(b.type, h);
      g.props = l;
      r = b.pendingProps;
      q = g.context;
      k = c.contextType;
      "object" === typeof k && null !== k ? k = nd(k) : (k = A(c) ? jc : x.current, k = kc(b, k));
      var B = c.getDerivedStateFromProps;
      (m = "function" === typeof B || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== r || q !== k) && Hd(b, g, d, k);
      pd = !1;
      q = b.memoizedState;
      g.state = q;
      xd(b, d, g, e);
      var w = b.memoizedState;
      h !== r || q !== w || z.current || pd ? ("function" === typeof B && (Bd(b, c, B, d), w = b.memoizedState), (l = pd || Fd(b, c, l, d, q, w, k) || !1) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, w, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, w, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && q === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && q === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = w), g.props = d, g.state = w, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && q === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && q === a.memoizedState || (b.flags |= 1024), d = !1);
    }
    return lg(a, b, c, d, f, e);
  }

  function lg(a, b, c, d, e, f) {
    jg(a, b);
    var g = 0 !== (b.flags & 128);
    if (!d && !g) return e && qc(b, c, !1), cg(a, b, f);
    d = b.stateNode;
    ag.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = re(b, a.child, null, f), b.child = re(b, null, h, f)) : Q(a, b, h, f);
    b.memoizedState = d.state;
    e && qc(b, c, !0);
    return b.child;
  }

  function mg(a) {
    var b = a.stateNode;
    b.pendingContext ? mc(a, b.pendingContext, b.pendingContext !== b.context) : b.context && mc(a, b.context, !1);
    ye(a, b.containerInfo);
  }

  function ng(a, b, c, d, e) {
    ge();
    he(e);
    b.flags |= 256;
    Q(a, b, c, d);
    return b.child;
  }

  var og = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
  };

  function pg(a) {
    return {
      baseLanes: a,
      cachePool: null,
      transitions: null
    };
  }

  function qg(a, b) {
    return {
      baseLanes: a.baseLanes | b,
      cachePool: null,
      transitions: a.transitions
    };
  }

  function rg(a, b, c) {
    var d = b.pendingProps,
        e = I.current,
        f = !1,
        g = 0 !== (b.flags & 128),
        h;
    (h = g) || (h = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
    if (h) f = !0, b.flags &= -129;else if (null === a || null !== a.memoizedState) e |= 1;
    v(I, e & 1);

    if (null === a) {
      de(b);
      a = b.memoizedState;
      if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : Kb(a) ? b.lanes = 8 : b.lanes = 1073741824, null;
      e = d.children;
      a = d.fallback;
      return f ? (d = b.mode, f = b.child, e = {
        mode: "hidden",
        children: e
      }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = e) : f = sg(e, d, 0, null), a = qe(a, d, c, null), f["return"] = b, a["return"] = b, f.sibling = a, b.child = f, b.child.memoizedState = pg(c), b.memoizedState = og, a) : tg(b, e);
    }

    e = a.memoizedState;

    if (null !== e) {
      h = e.dehydrated;

      if (null !== h) {
        if (g) {
          if (b.flags & 256) return b.flags &= -257, ug(a, b, c, Error(n(422)));
          if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
          f = d.fallback;
          e = b.mode;
          d = sg({
            mode: "visible",
            children: d.children
          }, e, 0, null);
          f = qe(f, e, c, null);
          f.flags |= 2;
          d["return"] = b;
          f["return"] = b;
          d.sibling = f;
          b.child = d;
          0 !== (b.mode & 1) && re(b, a.child, null, c);
          b.child.memoizedState = pg(c);
          b.memoizedState = og;
          return f;
        }

        if (0 === (b.mode & 1)) b = ug(a, b, c, null);else if (Kb(h)) b = ug(a, b, c, Error(n(419)));else if (d = 0 !== (c & a.childLanes), F || d) {
          d = N;

          if (null !== d) {
            switch (c & -c) {
              case 4:
                f = 2;
                break;

              case 16:
                f = 8;
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
                f = 32;
                break;

              case 536870912:
                f = 268435456;
                break;

              default:
                f = 0;
            }

            d = 0 !== (f & (d.suspendedLanes | c)) ? 0 : f;
            0 !== d && d !== e.retryLane && (e.retryLane = d, Dd(a, d, -1));
          }

          Xf();
          b = ug(a, b, c, Error(n(421)));
        } else Jb(h) ? (b.flags |= 128, b.child = a.child, b = vg.bind(null, a), Lb(h, b), b = null) : (c = e.treeContext, Va && (Xd = Pb(h), Wd = b, H = !0, Zd = null, Yd = !1, null !== c && (Nd[Od++] = Qd, Nd[Od++] = Rd, Nd[Od++] = Pd, Qd = c.id, Rd = c.overflow, Pd = b)), b = tg(b, b.pendingProps.children), b.flags |= 4096);
        return b;
      }

      if (f) return d = wg(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? pg(c) : qg(e, c), f.childLanes = a.childLanes & ~c, b.memoizedState = og, d;
      c = xg(a, b, d.children, c);
      b.memoizedState = null;
      return c;
    }

    if (f) return d = wg(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? pg(c) : qg(e, c), f.childLanes = a.childLanes & ~c, b.memoizedState = og, d;
    c = xg(a, b, d.children, c);
    b.memoizedState = null;
    return c;
  }

  function tg(a, b) {
    b = sg({
      mode: "visible",
      children: b
    }, a.mode, 0, null);
    b["return"] = a;
    return a.child = b;
  }

  function xg(a, b, c, d) {
    var e = a.child;
    a = e.sibling;
    c = me(e, {
      mode: "visible",
      children: c
    });
    0 === (b.mode & 1) && (c.lanes = d);
    c["return"] = b;
    c.sibling = null;
    null !== a && (d = b.deletions, null === d ? (b.deletions = [a], b.flags |= 16) : d.push(a));
    return b.child = c;
  }

  function wg(a, b, c, d, e) {
    var f = b.mode;
    a = a.child;
    var g = a.sibling,
        h = {
      mode: "hidden",
      children: c
    };
    0 === (f & 1) && b.child !== a ? (c = b.child, c.childLanes = 0, c.pendingProps = h, b.deletions = null) : (c = me(a, h), c.subtreeFlags = a.subtreeFlags & 14680064);
    null !== g ? d = me(g, d) : (d = qe(d, f, e, null), d.flags |= 2);
    d["return"] = b;
    c["return"] = b;
    c.sibling = d;
    b.child = c;
    return d;
  }

  function ug(a, b, c, d) {
    null !== d && he(d);
    re(b, a.child, null, c);
    a = tg(b, b.pendingProps.children);
    a.flags |= 2;
    b.memoizedState = null;
    return a;
  }

  function yg(a, b, c) {
    a.lanes |= b;
    var d = a.alternate;
    null !== d && (d.lanes |= b);
    ld(a["return"], b, c);
  }

  function zg(a, b, c, d, e) {
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

  function Ag(a, b, c) {
    var d = b.pendingProps,
        e = d.revealOrder,
        f = d.tail;
    Q(a, b, d.children, c);
    d = I.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;else {
      if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a;) {
        if (13 === a.tag) null !== a.memoizedState && yg(a, c, b);else if (19 === a.tag) yg(a, c, b);else if (null !== a.child) {
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
    v(I, d);
    if (0 === (b.mode & 1)) b.memoizedState = null;else switch (e) {
      case "forwards":
        c = b.child;

        for (e = null; null !== c;) {
          a = c.alternate, null !== a && null === Ce(a) && (e = c), c = c.sibling;
        }

        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        zg(b, !1, e, c, f);
        break;

      case "backwards":
        c = null;
        e = b.child;

        for (b.child = null; null !== e;) {
          a = e.alternate;

          if (null !== a && null === Ce(a)) {
            b.child = e;
            break;
          }

          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }

        zg(b, !0, c, null, f);
        break;

      case "together":
        zg(b, !1, null, null, void 0);
        break;

      default:
        b.memoizedState = null;
    }
    return b.child;
  }

  function cg(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    yd |= b.lanes;
    if (0 === (c & b.childLanes)) return null;
    if (null !== a && b.child !== a.child) throw Error(n(153));

    if (null !== b.child) {
      a = b.child;
      c = me(a, a.pendingProps);
      b.child = c;

      for (c["return"] = b; null !== a.sibling;) {
        a = a.sibling, c = c.sibling = me(a, a.pendingProps), c["return"] = b;
      }

      c.sibling = null;
    }

    return b.child;
  }

  function Bg(a, b, c) {
    switch (b.tag) {
      case 3:
        mg(b);
        ge();
        break;

      case 5:
        Ae(b);
        break;

      case 1:
        A(b.type) && pc(b);
        break;

      case 4:
        ye(b, b.stateNode.containerInfo);
        break;

      case 10:
        jd(b, b.type._context, b.memoizedProps.value);
        break;

      case 13:
        var d = b.memoizedState;

        if (null !== d) {
          if (null !== d.dehydrated) return v(I, I.current & 1), b.flags |= 128, null;
          if (0 !== (c & b.child.childLanes)) return rg(a, b, c);
          v(I, I.current & 1);
          a = cg(a, b, c);
          return null !== a ? a.sibling : null;
        }

        v(I, I.current & 1);
        break;

      case 19:
        d = 0 !== (c & b.childLanes);

        if (0 !== (a.flags & 128)) {
          if (d) return Ag(a, b, c);
          b.flags |= 128;
        }

        var e = b.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        v(I, I.current);
        if (d) break;else return null;

      case 22:
      case 23:
        return b.lanes = 0, hg(a, b, c);
    }

    return cg(a, b, c);
  }

  function Cg(a, b) {
    Vd(b);

    switch (b.tag) {
      case 1:
        return A(b.type) && lc(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;

      case 3:
        return ze(), p(z), p(x), Ee(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;

      case 5:
        return Be(b), null;

      case 13:
        p(I);
        a = b.memoizedState;

        if (null !== a && null !== a.dehydrated) {
          if (null === b.alternate) throw Error(n(340));
          ge();
        }

        a = b.flags;
        return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;

      case 19:
        return p(I), null;

      case 4:
        return ze(), null;

      case 10:
        return kd(b.type._context), null;

      case 22:
      case 23:
        return Zf(), null;

      case 24:
        return null;

      default:
        return null;
    }
  }

  var Dg = !1,
      R = !1,
      Eg = "function" === typeof WeakSet ? WeakSet : Set,
      S = null;

  function Fg(a, b) {
    var c = a.ref;
    if (null !== c) if ("function" === typeof c) try {
      c(null);
    } catch (d) {
      T(a, b, d);
    } else c.current = null;
  }

  function Gg(a, b, c) {
    try {
      c();
    } catch (d) {
      T(a, b, d);
    }
  }

  var Hg = !1;

  function Ig(a, b) {
    Ha(a.containerInfo);

    for (S = b; null !== S;) {
      if (a = S, b = a.child, 0 !== (a.subtreeFlags & 1028) && null !== b) b["return"] = a, S = b;else for (; null !== S;) {
        a = S;

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
                    g = f.getSnapshotBeforeUpdate(a.elementType === a.type ? d : dd(a.type, d), e);
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
              throw Error(n(163));
          }
        } catch (h) {
          T(a, a["return"], h);
        }

        b = a.sibling;

        if (null !== b) {
          b["return"] = a["return"];
          S = b;
          break;
        }

        S = a["return"];
      }
    }

    c = Hg;
    Hg = !1;
    return c;
  }

  function Jg(a, b, c) {
    var d = b.updateQueue;
    d = null !== d ? d.lastEffect : null;

    if (null !== d) {
      var e = d = d.next;

      do {
        if ((e.tag & a) === a) {
          var f = e.destroy;
          e.destroy = void 0;
          void 0 !== f && Gg(b, c, f);
        }

        e = e.next;
      } while (e !== d);
    }
  }

  function Kg(a, b) {
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

  function Lg(a) {
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

  function Mg(a) {
    var b = a.alternate;
    null !== b && (a.alternate = null, Mg(b));
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

  function Ng(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }

  function Og(a) {
    a: for (;;) {
      for (; null === a.sibling;) {
        if (null === a["return"] || Ng(a["return"])) return null;
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

  function Pg(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? pb(c, a, b) : kb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Pg(a, b, c), a = a.sibling; null !== a;) {
      Pg(a, b, c), a = a.sibling;
    }
  }

  function Qg(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? ob(c, a, b) : jb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Qg(a, b, c), a = a.sibling; null !== a;) {
      Qg(a, b, c), a = a.sibling;
    }
  }

  var U = null,
      Rg = !1;

  function Sg(a, b, c) {
    for (c = c.child; null !== c;) {
      Tg(a, b, c), c = c.sibling;
    }
  }

  function Tg(a, b, c) {
    if (Rc && "function" === typeof Rc.onCommitFiberUnmount) try {
      Rc.onCommitFiberUnmount(Qc, c);
    } catch (h) {}

    switch (c.tag) {
      case 5:
        R || Fg(c, b);

      case 6:
        if (Ta) {
          var d = U,
              e = Rg;
          U = null;
          Sg(a, b, c);
          U = d;
          Rg = e;
          null !== U && (Rg ? rb(U, c.stateNode) : qb(U, c.stateNode));
        } else Sg(a, b, c);

        break;

      case 18:
        Ta && null !== U && (Rg ? Xb(U, c.stateNode) : Wb(U, c.stateNode));
        break;

      case 4:
        Ta ? (d = U, e = Rg, U = c.stateNode.containerInfo, Rg = !0, Sg(a, b, c), U = d, Rg = e) : (Ua && (d = c.stateNode.containerInfo, e = zb(d), Cb(d, e)), Sg(a, b, c));
        break;

      case 0:
      case 11:
      case 14:
      case 15:
        if (!R && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
          e = d = d.next;

          do {
            var f = e,
                g = f.destroy;
            f = f.tag;
            void 0 !== g && (0 !== (f & 2) ? Gg(c, b, g) : 0 !== (f & 4) && Gg(c, b, g));
            e = e.next;
          } while (e !== d);
        }

        Sg(a, b, c);
        break;

      case 1:
        if (!R && (Fg(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          T(c, b, h);
        }
        Sg(a, b, c);
        break;

      case 21:
        Sg(a, b, c);
        break;

      case 22:
        c.mode & 1 ? (R = (d = R) || null !== c.memoizedState, Sg(a, b, c), R = d) : Sg(a, b, c);
        break;

      default:
        Sg(a, b, c);
    }
  }

  function Ug(a) {
    var b = a.updateQueue;

    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Eg());
      b.forEach(function (b) {
        var d = Vg.bind(null, a, b);
        c.has(b) || (c.add(b), b.then(d, d));
      });
    }
  }

  function Wg(a, b) {
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
                U = h.stateNode;
                Rg = !1;
                break a;

              case 3:
                U = h.stateNode.containerInfo;
                Rg = !0;
                break a;

              case 4:
                U = h.stateNode.containerInfo;
                Rg = !0;
                break a;
            }

            h = h["return"];
          }

          if (null === U) throw Error(n(160));
          Tg(f, g, e);
          U = null;
          Rg = !1;
        } else Tg(f, g, e);

        var k = e.alternate;
        null !== k && (k["return"] = null);
        e["return"] = null;
      } catch (l) {
        T(e, b, l);
      }
    }
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b;) {
      Xg(b, a), b = b.sibling;
    }
  }

  function Xg(a, b) {
    var c = a.alternate,
        d = a.flags;

    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Wg(b, a);
        Yg(a);

        if (d & 4) {
          try {
            Jg(3, a, a["return"]), Kg(3, a);
          } catch (k) {
            T(a, a["return"], k);
          }

          try {
            Jg(5, a, a["return"]);
          } catch (k) {
            T(a, a["return"], k);
          }
        }

        break;

      case 1:
        Wg(b, a);
        Yg(a);
        d & 512 && null !== c && Fg(c, c["return"]);
        break;

      case 5:
        Wg(b, a);
        Yg(a);
        d & 512 && null !== c && Fg(c, c["return"]);

        if (Ta) {
          if (a.flags & 32) {
            var e = a.stateNode;

            try {
              sb(e);
            } catch (k) {
              T(a, a["return"], k);
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
            } catch (k) {
              T(a, a["return"], k);
            }
          }
        }

        break;

      case 6:
        Wg(b, a);
        Yg(a);

        if (d & 4 && Ta) {
          if (null === a.stateNode) throw Error(n(162));
          e = a.stateNode;
          f = a.memoizedProps;
          c = null !== c ? c.memoizedProps : f;

          try {
            lb(e, c, f);
          } catch (k) {
            T(a, a["return"], k);
          }
        }

        break;

      case 3:
        Wg(b, a);
        Yg(a);

        if (d & 4) {
          if (Ta && Va && null !== c && c.memoizedState.isDehydrated) try {
            Ub(b.containerInfo);
          } catch (k) {
            T(a, a["return"], k);
          }

          if (Ua) {
            c = b.containerInfo;
            e = b.pendingChildren;

            try {
              Cb(c, e);
            } catch (k) {
              T(a, a["return"], k);
            }
          }
        }

        break;

      case 4:
        Wg(b, a);
        Yg(a);

        if (d & 4 && Ua) {
          e = a.stateNode;
          c = e.containerInfo;
          e = e.pendingChildren;

          try {
            Cb(c, e);
          } catch (k) {
            T(a, a["return"], k);
          }
        }

        break;

      case 13:
        Wg(b, a);
        Yg(a);
        c = a.child;
        c.flags & 8192 && null !== c.memoizedState && (null === c.alternate || null === c.alternate.memoizedState) && (Zg = D());
        d & 4 && Ug(a);
        break;

      case 22:
        c = null !== c && null !== c.memoizedState;

        if (a.mode & 1) {
          var g = R;
          R = g || c;
          Wg(b, a);
          R = g;
        } else Wg(b, a);

        Yg(a);

        if (d & 8192) {
          d = null !== a.memoizedState;
          if (Ta) a: if (b = null, Ta) for (g = a;;) {
            if (5 === g.tag) {
              if (null === b) {
                b = g;

                try {
                  e = g.stateNode, d ? tb(e) : vb(g.stateNode, g.memoizedProps);
                } catch (k) {
                  T(a, a["return"], k);
                }
              }
            } else if (6 === g.tag) {
              if (null === b) try {
                f = g.stateNode, d ? ub(f) : wb(f, g.memoizedProps);
              } catch (k) {
                T(a, a["return"], k);
              }
            } else if ((22 !== g.tag && 23 !== g.tag || null === g.memoizedState || g === a) && null !== g.child) {
              g.child["return"] = g;
              g = g.child;
              continue;
            }

            if (g === a) break a;

            for (; null === g.sibling;) {
              if (null === g["return"] || g["return"] === a) break a;
              b === g && (b = null);
              g = g["return"];
            }

            b === g && (b = null);
            g.sibling["return"] = g["return"];
            g = g.sibling;
          }
          if (d && !c && 0 !== (a.mode & 1)) for (S = a, a = a.child; null !== a;) {
            for (c = S = a; null !== S;) {
              e = S;
              f = e.child;

              switch (e.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Jg(4, e, e["return"]);
                  break;

                case 1:
                  Fg(e, e["return"]);
                  var h = e.stateNode;

                  if ("function" === typeof h.componentWillUnmount) {
                    d = e;
                    b = e["return"];

                    try {
                      g = d, h.props = g.memoizedProps, h.state = g.memoizedState, h.componentWillUnmount();
                    } catch (k) {
                      T(d, b, k);
                    }
                  }

                  break;

                case 5:
                  Fg(e, e["return"]);
                  break;

                case 22:
                  if (null !== e.memoizedState) {
                    $g(c);
                    continue;
                  }

              }

              null !== f ? (f["return"] = e, S = f) : $g(c);
            }

            a = a.sibling;
          }
        }

        break;

      case 19:
        Wg(b, a);
        Yg(a);
        d & 4 && Ug(a);
        break;

      case 21:
        break;

      default:
        Wg(b, a), Yg(a);
    }
  }

  function Yg(a) {
    var b = a.flags;

    if (b & 2) {
      try {
        if (Ta) {
          b: {
            for (var c = a["return"]; null !== c;) {
              if (Ng(c)) {
                var d = c;
                break b;
              }

              c = c["return"];
            }

            throw Error(n(160));
          }

          switch (d.tag) {
            case 5:
              var e = d.stateNode;
              d.flags & 32 && (sb(e), d.flags &= -33);
              var f = Og(a);
              Qg(a, f, e);
              break;

            case 3:
            case 4:
              var g = d.stateNode.containerInfo,
                  h = Og(a);
              Pg(a, h, g);
              break;

            default:
              throw Error(n(161));
          }
        }
      } catch (k) {
        T(a, a["return"], k);
      }

      a.flags &= -3;
    }

    b & 4096 && (a.flags &= -4097);
  }

  function ah(a, b, c) {
    S = a;
    bh(a, b, c);
  }

  function bh(a, b, c) {
    for (var d = 0 !== (a.mode & 1); null !== S;) {
      var e = S,
          f = e.child;

      if (22 === e.tag && d) {
        var g = null !== e.memoizedState || Dg;

        if (!g) {
          var h = e.alternate,
              k = null !== h && null !== h.memoizedState || R;
          h = Dg;
          var l = R;
          Dg = g;
          if ((R = k) && !l) for (S = e; null !== S;) {
            g = S, k = g.child, 22 === g.tag && null !== g.memoizedState ? ch(e) : null !== k ? (k["return"] = g, S = k) : ch(e);
          }

          for (; null !== f;) {
            S = f, bh(f, b, c), f = f.sibling;
          }

          S = e;
          Dg = h;
          R = l;
        }

        dh(a, b, c);
      } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f["return"] = e, S = f) : dh(a, b, c);
    }
  }

  function dh(a) {
    for (; null !== S;) {
      var b = S;

      if (0 !== (b.flags & 8772)) {
        var c = b.alternate;

        try {
          if (0 !== (b.flags & 8772)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              R || Kg(5, b);
              break;

            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !R) if (null === c) d.componentDidMount();else {
                var e = b.elementType === b.type ? c.memoizedProps : dd(b.type, c.memoizedProps);
                d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var f = b.updateQueue;
              null !== f && zd(b, f, d);
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
                zd(b, g, c);
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
                    var m = l.dehydrated;
                    null !== m && Vb(m);
                  }
                }
              }

              break;

            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
              break;

            default:
              throw Error(n(163));
          }
          R || b.flags & 512 && Lg(b);
        } catch (r) {
          T(b, b["return"], r);
        }
      }

      if (b === a) {
        S = null;
        break;
      }

      c = b.sibling;

      if (null !== c) {
        c["return"] = b["return"];
        S = c;
        break;
      }

      S = b["return"];
    }
  }

  function $g(a) {
    for (; null !== S;) {
      var b = S;

      if (b === a) {
        S = null;
        break;
      }

      var c = b.sibling;

      if (null !== c) {
        c["return"] = b["return"];
        S = c;
        break;
      }

      S = b["return"];
    }
  }

  function ch(a) {
    for (; null !== S;) {
      var b = S;

      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c = b["return"];

            try {
              Kg(4, b);
            } catch (k) {
              T(b, c, k);
            }

            break;

          case 1:
            var d = b.stateNode;

            if ("function" === typeof d.componentDidMount) {
              var e = b["return"];

              try {
                d.componentDidMount();
              } catch (k) {
                T(b, e, k);
              }
            }

            var f = b["return"];

            try {
              Lg(b);
            } catch (k) {
              T(b, f, k);
            }

            break;

          case 5:
            var g = b["return"];

            try {
              Lg(b);
            } catch (k) {
              T(b, g, k);
            }

        }
      } catch (k) {
        T(b, b["return"], k);
      }

      if (b === a) {
        S = null;
        break;
      }

      var h = b.sibling;

      if (null !== h) {
        h["return"] = b["return"];
        S = h;
        break;
      }

      S = b["return"];
    }
  }

  var eh = 0,
      fh = 1,
      gh = 2,
      hh = 3,
      ih = 4;

  if ("function" === typeof Symbol && Symbol["for"]) {
    var jh = Symbol["for"];
    eh = jh("selector.component");
    fh = jh("selector.has_pseudo_class");
    gh = jh("selector.role");
    hh = jh("selector.test_id");
    ih = jh("selector.text");
  }

  function kh(a) {
    var b = Wa(a);

    if (null != b) {
      if ("string" !== typeof b.memoizedProps["data-testname"]) throw Error(n(364));
      return b;
    }

    a = cb(a);
    if (null === a) throw Error(n(362));
    return a.stateNode.current;
  }

  function lh(a, b) {
    switch (b.$$typeof) {
      case eh:
        if (a.type === b.value) return !0;
        break;

      case fh:
        a: {
          b = b.value;
          a = [a, 0];

          for (var c = 0; c < a.length;) {
            var d = a[c++],
                e = a[c++],
                f = b[e];

            if (5 !== d.tag || !fb(d)) {
              for (; null != f && lh(d, f);) {
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

      case gh:
        if (5 === a.tag && gb(a.stateNode, b.value)) return !0;
        break;

      case ih:
        if (5 === a.tag || 6 === a.tag) if (a = eb(a), null !== a && 0 <= a.indexOf(b.value)) return !0;
        break;

      case hh:
        if (5 === a.tag && (a = a.memoizedProps["data-testname"], "string" === typeof a && a.toLowerCase() === b.value.toLowerCase())) return !0;
        break;

      default:
        throw Error(n(365));
    }

    return !1;
  }

  function mh(a) {
    switch (a.$$typeof) {
      case eh:
        return "<" + (ua(a.value) || "Unknown") + ">";

      case fh:
        return ":has(" + (mh(a) || "") + ")";

      case gh:
        return '[role="' + a.value + '"]';

      case ih:
        return '"' + a.value + '"';

      case hh:
        return '[data-testname="' + a.value + '"]';

      default:
        throw Error(n(365));
    }
  }

  function nh(a, b) {
    var c = [];
    a = [a, 0];

    for (var d = 0; d < a.length;) {
      var e = a[d++],
          f = a[d++],
          g = b[f];

      if (5 !== e.tag || !fb(e)) {
        for (; null != g && lh(e, g);) {
          f++, g = b[f];
        }

        if (f === b.length) c.push(e);else for (e = e.child; null !== e;) {
          a.push(e, f), e = e.sibling;
        }
      }
    }

    return c;
  }

  function oh(a, b) {
    if (!bb) throw Error(n(363));
    a = kh(a);
    a = nh(a, b);
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

  var ph = Math.ceil,
      qh = da.ReactCurrentDispatcher,
      rh = da.ReactCurrentOwner,
      V = da.ReactCurrentBatchConfig,
      W = 0,
      N = null,
      X = null,
      Y = 0,
      $f = 0,
      ig = hc(0),
      P = 0,
      sh = null,
      yd = 0,
      th = 0,
      uh = 0,
      vh = null,
      wh = null,
      Zg = 0,
      Yf = Infinity,
      xh = null;

  function yh() {
    Yf = D() + 500;
  }

  var Ff = !1,
      Gf = null,
      If = null,
      zh = !1,
      Ah = null,
      Bh = 0,
      Ch = 0,
      Dh = null,
      Eh = -1,
      Fh = 0;

  function G() {
    return 0 !== (W & 6) ? D() : -1 !== Eh ? Eh : Eh = D();
  }

  function Cd(a) {
    if (0 === (a.mode & 1)) return 1;
    if (0 !== (W & 2) && 0 !== Y) return Y & -Y;
    if (null !== ad.transition) return 0 === Fh && (Fh = Cc()), Fh;
    a = C;
    return 0 !== a ? a : Ya();
  }

  function Dd(a, b, c) {
    if (50 < Ch) throw Ch = 0, Dh = null, Error(n(185));
    var d = Gh(a, b);
    if (null === d) return null;
    Ec(d, b, c);
    if (0 === (W & 2) || d !== N) d === N && (0 === (W & 2) && (th |= b), 4 === P && Hh(d, Y)), Ih(d, c), 1 === b && 0 === W && 0 === (a.mode & 1) && (yh(), Wc && $c());
    return d;
  }

  function Gh(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;

    for (a = a["return"]; null !== a;) {
      a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a["return"];
    }

    return 3 === c.tag ? c.stateNode : null;
  }

  function ud(a) {
    return (null !== N || null !== od) && 0 !== (a.mode & 1) && 0 === (W & 2);
  }

  function Ih(a, b) {
    var c = a.callbackNode;
    Ac(a, b);
    var d = yc(a, a === N ? Y : 0);
    if (0 === d) null !== c && Jc(c), a.callbackNode = null, a.callbackPriority = 0;else if (b = d & -d, a.callbackPriority !== b) {
      null != c && Jc(c);
      if (1 === b) 0 === a.tag ? Zc(Jh.bind(null, a)) : Yc(Jh.bind(null, a)), $a ? ab(function () {
        0 === W && $c();
      }) : Ic(Mc, $c), c = null;else {
        switch (Hc(d)) {
          case 1:
            c = Mc;
            break;

          case 4:
            c = Nc;
            break;

          case 16:
            c = Oc;
            break;

          case 536870912:
            c = Pc;
            break;

          default:
            c = Oc;
        }

        c = Kh(c, Lh.bind(null, a));
      }
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }

  function Lh(a, b) {
    Eh = -1;
    Fh = 0;
    if (0 !== (W & 6)) throw Error(n(327));
    var c = a.callbackNode;
    if (Mh() && a.callbackNode !== c) return null;
    var d = yc(a, a === N ? Y : 0);
    if (0 === d) return null;
    if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Nh(a, d);else {
      b = d;
      var e = W;
      W |= 2;
      var f = Oh();
      if (N !== a || Y !== b) xh = null, yh(), Ph(a, b);

      do {
        try {
          Qh();
          break;
        } catch (h) {
          Rh(a, h);
        }
      } while (1);

      id();
      qh.current = f;
      W = e;
      null !== X ? b = 0 : (N = null, Y = 0, b = P);
    }

    if (0 !== b) {
      2 === b && (e = Bc(a), 0 !== e && (d = e, b = Sh(a, e)));
      if (1 === b) throw c = sh, Ph(a, 0), Hh(a, d), Ih(a, D()), c;
      if (6 === b) Hh(a, d);else {
        e = a.current.alternate;
        if (0 === (d & 30) && !Th(e) && (b = Nh(a, d), 2 === b && (f = Bc(a), 0 !== f && (d = f, b = Sh(a, f))), 1 === b)) throw c = sh, Ph(a, 0), Hh(a, d), Ih(a, D()), c;
        a.finishedWork = e;
        a.finishedLanes = d;

        switch (b) {
          case 0:
          case 1:
            throw Error(n(345));

          case 2:
            Uh(a, wh, xh);
            break;

          case 3:
            Hh(a, d);

            if ((d & 130023424) === d && (b = Zg + 500 - D(), 10 < b)) {
              if (0 !== yc(a, 0)) break;
              e = a.suspendedLanes;

              if ((e & d) !== d) {
                G();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }

              a.timeoutHandle = Pa(Uh.bind(null, a, wh, xh), b);
              break;
            }

            Uh(a, wh, xh);
            break;

          case 4:
            Hh(a, d);
            if ((d & 4194240) === d) break;
            b = a.eventTimes;

            for (e = -1; 0 < d;) {
              var g = 31 - sc(d);
              f = 1 << g;
              g = b[g];
              g > e && (e = g);
              d &= ~f;
            }

            d = e;
            d = D() - d;
            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * ph(d / 1960)) - d;

            if (10 < d) {
              a.timeoutHandle = Pa(Uh.bind(null, a, wh, xh), d);
              break;
            }

            Uh(a, wh, xh);
            break;

          case 5:
            Uh(a, wh, xh);
            break;

          default:
            throw Error(n(329));
        }
      }
    }

    Ih(a, D());
    return a.callbackNode === c ? Lh.bind(null, a) : null;
  }

  function Sh(a, b) {
    var c = vh;
    a.current.memoizedState.isDehydrated && (Ph(a, b).flags |= 256);
    a = Nh(a, b);
    2 !== a && (b = wh, wh = c, null !== b && Wf(b));
    return a;
  }

  function Wf(a) {
    null === wh ? wh = a : wh.push.apply(wh, a);
  }

  function Th(a) {
    for (var b = a;;) {
      if (b.flags & 16384) {
        var c = b.updateQueue;
        if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
          var e = c[d],
              f = e.getSnapshot;
          e = e.value;

          try {
            if (!Uc(f(), e)) return !1;
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

  function Hh(a, b) {
    b &= ~uh;
    b &= ~th;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;

    for (a = a.expirationTimes; 0 < b;) {
      var c = 31 - sc(b),
          d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }

  function Jh(a) {
    if (0 !== (W & 6)) throw Error(n(327));
    Mh();
    var b = yc(a, 0);
    if (0 === (b & 1)) return Ih(a, D()), null;
    var c = Nh(a, b);

    if (0 !== a.tag && 2 === c) {
      var d = Bc(a);
      0 !== d && (b = d, c = Sh(a, d));
    }

    if (1 === c) throw c = sh, Ph(a, 0), Hh(a, b), Ih(a, D()), c;
    if (6 === c) throw Error(n(345));
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Uh(a, wh, xh);
    Ih(a, D());
    return null;
  }

  function Vh(a) {
    null !== Ah && 0 === Ah.tag && 0 === (W & 6) && Mh();
    var b = W;
    W |= 1;
    var c = V.transition,
        d = C;

    try {
      if (V.transition = null, C = 1, a) return a();
    } finally {
      C = d, V.transition = c, W = b, 0 === (W & 6) && $c();
    }
  }

  function Zf() {
    $f = ig.current;
    p(ig);
  }

  function Ph(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    c !== Ra && (a.timeoutHandle = Ra, Qa(c));
    if (null !== X) for (c = X["return"]; null !== c;) {
      var d = c;
      Vd(d);

      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && lc();
          break;

        case 3:
          ze();
          p(z);
          p(x);
          Ee();
          break;

        case 5:
          Be(d);
          break;

        case 4:
          ze();
          break;

        case 13:
          p(I);
          break;

        case 19:
          p(I);
          break;

        case 10:
          kd(d.type._context);
          break;

        case 22:
        case 23:
          Zf();
      }

      c = c["return"];
    }
    N = a;
    X = a = me(a.current, null);
    Y = $f = b;
    P = 0;
    sh = null;
    uh = th = yd = 0;
    wh = vh = null;

    if (null !== od) {
      for (b = 0; b < od.length; b++) {
        if (c = od[b], d = c.interleaved, null !== d) {
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

      od = null;
    }

    return a;
  }

  function Rh(a, b) {
    do {
      var c = X;

      try {
        id();
        Fe.current = Re;

        if (Ie) {
          for (var d = J.memoizedState; null !== d;) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }

          Ie = !1;
        }

        He = 0;
        L = K = J = null;
        Je = !1;
        Ke = 0;
        rh.current = null;

        if (null === c || null === c["return"]) {
          P = 1;
          sh = b;
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
                m = h,
                r = m.tag;

            if (0 === (m.mode & 1) && (0 === r || 11 === r || 15 === r)) {
              var q = m.alternate;
              q ? (m.updateQueue = q.updateQueue, m.memoizedState = q.memoizedState, m.lanes = q.lanes) : (m.updateQueue = null, m.memoizedState = null);
            }

            var B = Lf(g);

            if (null !== B) {
              B.flags &= -257;
              Mf(B, g, h, f, b);
              B.mode & 1 && Jf(f, l, b);
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
                Jf(f, l, b);
                Xf();
                break a;
              }

              k = Error(n(426));
            }
          } else if (H && h.mode & 1) {
            var za = Lf(g);

            if (null !== za) {
              0 === (za.flags & 65536) && (za.flags |= 256);
              Mf(za, g, h, f, b);
              he(k);
              break a;
            }
          }

          f = k;
          4 !== P && (P = 2);
          null === vh ? vh = [f] : vh.push(f);
          k = Bf(k, h);
          h = g;

          do {
            switch (h.tag) {
              case 3:
                h.flags |= 65536;
                b &= -b;
                h.lanes |= b;
                var E = Ef(h, k, b);
                wd(h, E);
                break a;

              case 1:
                f = k;
                var u = h.type,
                    t = h.stateNode;

                if (0 === (h.flags & 128) && ("function" === typeof u.getDerivedStateFromError || null !== t && "function" === typeof t.componentDidCatch && (null === If || !If.has(t)))) {
                  h.flags |= 65536;
                  b &= -b;
                  h.lanes |= b;
                  var Db = Hf(h, f, b);
                  wd(h, Db);
                  break a;
                }

            }

            h = h["return"];
          } while (null !== h);
        }

        Wh(c);
      } catch (oc) {
        b = oc;
        X === c && null !== c && (X = c = c["return"]);
        continue;
      }

      break;
    } while (1);
  }

  function Oh() {
    var a = qh.current;
    qh.current = Re;
    return null === a ? Re : a;
  }

  function Xf() {
    if (0 === P || 3 === P || 2 === P) P = 4;
    null === N || 0 === (yd & 268435455) && 0 === (th & 268435455) || Hh(N, Y);
  }

  function Nh(a, b) {
    var c = W;
    W |= 2;
    var d = Oh();
    if (N !== a || Y !== b) xh = null, Ph(a, b);

    do {
      try {
        Xh();
        break;
      } catch (e) {
        Rh(a, e);
      }
    } while (1);

    id();
    W = c;
    qh.current = d;
    if (null !== X) throw Error(n(261));
    N = null;
    Y = 0;
    return P;
  }

  function Xh() {
    for (; null !== X;) {
      Yh(X);
    }
  }

  function Qh() {
    for (; null !== X && !Kc();) {
      Yh(X);
    }
  }

  function Yh(a) {
    var b = Zh(a.alternate, a, $f);
    a.memoizedProps = a.pendingProps;
    null === b ? Wh(a) : X = b;
    rh.current = null;
  }

  function Wh(a) {
    var b = a;

    do {
      var c = b.alternate;
      a = b["return"];

      if (0 === (b.flags & 32768)) {
        if (c = Vf(c, b, $f), null !== c) {
          X = c;
          return;
        }
      } else {
        c = Cg(c, b);

        if (null !== c) {
          c.flags &= 32767;
          X = c;
          return;
        }

        if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;else {
          P = 6;
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

    0 === P && (P = 5);
  }

  function Uh(a, b, c) {
    var d = C,
        e = V.transition;

    try {
      V.transition = null, C = 1, $h(a, b, c, d);
    } finally {
      V.transition = e, C = d;
    }

    return null;
  }

  function $h(a, b, c, d) {
    do {
      Mh();
    } while (null !== Ah);

    if (0 !== (W & 6)) throw Error(n(327));
    c = a.finishedWork;
    var e = a.finishedLanes;
    if (null === c) return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current) throw Error(n(177));
    a.callbackNode = null;
    a.callbackPriority = 0;
    var f = c.lanes | c.childLanes;
    Fc(a, f);
    a === N && (X = N = null, Y = 0);
    0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || zh || (zh = !0, Kh(Oc, function () {
      Mh();
      return null;
    }));
    f = 0 !== (c.flags & 15990);

    if (0 !== (c.subtreeFlags & 15990) || f) {
      f = V.transition;
      V.transition = null;
      var g = C;
      C = 1;
      var h = W;
      W |= 4;
      rh.current = null;
      Ig(a, c);
      Xg(c, a);
      Ia(a.containerInfo);
      a.current = c;
      ah(c, a, e);
      Lc();
      W = h;
      C = g;
      V.transition = f;
    } else a.current = c;

    zh && (zh = !1, Ah = a, Bh = e);
    f = a.pendingLanes;
    0 === f && (If = null);
    Sc(c.stateNode, d);
    Ih(a, D());
    if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) {
      d(b[c]);
    }
    if (Ff) throw Ff = !1, a = Gf, Gf = null, a;
    0 !== (Bh & 1) && 0 !== a.tag && Mh();
    f = a.pendingLanes;
    0 !== (f & 1) ? a === Dh ? Ch++ : (Ch = 0, Dh = a) : Ch = 0;
    $c();
    return null;
  }

  function Mh() {
    if (null !== Ah) {
      var a = Hc(Bh),
          b = V.transition,
          c = C;

      try {
        V.transition = null;
        C = 16 > a ? 16 : a;
        if (null === Ah) var d = !1;else {
          a = Ah;
          Ah = null;
          Bh = 0;
          if (0 !== (W & 6)) throw Error(n(331));
          var e = W;
          W |= 4;

          for (S = a.current; null !== S;) {
            var f = S,
                g = f.child;

            if (0 !== (S.flags & 16)) {
              var h = f.deletions;

              if (null !== h) {
                for (var k = 0; k < h.length; k++) {
                  var l = h[k];

                  for (S = l; null !== S;) {
                    var m = S;

                    switch (m.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Jg(8, m, f);
                    }

                    var r = m.child;
                    if (null !== r) r["return"] = m, S = r;else for (; null !== S;) {
                      m = S;
                      var q = m.sibling,
                          B = m["return"];
                      Mg(m);

                      if (m === l) {
                        S = null;
                        break;
                      }

                      if (null !== q) {
                        q["return"] = B;
                        S = q;
                        break;
                      }

                      S = B;
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

                S = f;
              }
            }

            if (0 !== (f.subtreeFlags & 2064) && null !== g) g["return"] = f, S = g;else b: for (; null !== S;) {
              f = S;
              if (0 !== (f.flags & 2048)) switch (f.tag) {
                case 0:
                case 11:
                case 15:
                  Jg(9, f, f["return"]);
              }
              var E = f.sibling;

              if (null !== E) {
                E["return"] = f["return"];
                S = E;
                break b;
              }

              S = f["return"];
            }
          }

          var u = a.current;

          for (S = u; null !== S;) {
            g = S;
            var t = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== t) t["return"] = g, S = t;else b: for (g = u; null !== S;) {
              h = S;
              if (0 !== (h.flags & 2048)) try {
                switch (h.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Kg(9, h);
                }
              } catch (oc) {
                T(h, h["return"], oc);
              }

              if (h === g) {
                S = null;
                break b;
              }

              var Db = h.sibling;

              if (null !== Db) {
                Db["return"] = h["return"];
                S = Db;
                break b;
              }

              S = h["return"];
            }
          }

          W = e;
          $c();
          if (Rc && "function" === typeof Rc.onPostCommitFiberRoot) try {
            Rc.onPostCommitFiberRoot(Qc, a);
          } catch (oc) {}
          d = !0;
        }
        return d;
      } finally {
        C = c, V.transition = b;
      }
    }

    return !1;
  }

  function ai(a, b, c) {
    b = Bf(c, b);
    b = Ef(a, b, 1);
    td(a, b);
    b = G();
    a = Gh(a, 1);
    null !== a && (Ec(a, 1, b), Ih(a, b));
  }

  function T(a, b, c) {
    if (3 === a.tag) ai(a, a, c);else for (; null !== b;) {
      if (3 === b.tag) {
        ai(b, a, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;

        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === If || !If.has(d))) {
          a = Bf(c, a);
          a = Hf(b, a, 1);
          td(b, a);
          a = G();
          b = Gh(b, 1);
          null !== b && (Ec(b, 1, a), Ih(b, a));
          break;
        }
      }

      b = b["return"];
    }
  }

  function Kf(a, b, c) {
    var d = a.pingCache;
    null !== d && d["delete"](b);
    b = G();
    a.pingedLanes |= a.suspendedLanes & c;
    N === a && (Y & c) === c && (4 === P || 3 === P && (Y & 130023424) === Y && 500 > D() - Zg ? Ph(a, 0) : uh |= c);
    Ih(a, b);
  }

  function bi(a, b) {
    0 === b && (0 === (a.mode & 1) ? b = 1 : (b = wc, wc <<= 1, 0 === (wc & 130023424) && (wc = 4194304)));
    var c = G();
    a = Gh(a, b);
    null !== a && (Ec(a, b, c), Ih(a, c));
  }

  function vg(a) {
    var b = a.memoizedState,
        c = 0;
    null !== b && (c = b.retryLane);
    bi(a, c);
  }

  function Vg(a, b) {
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
        throw Error(n(314));
    }

    null !== d && d["delete"](b);
    bi(a, c);
  }

  var Zh;

  Zh = function Zh(a, b, c) {
    if (null !== a) {
      if (a.memoizedProps !== b.pendingProps || z.current) F = !0;else {
        if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return F = !1, Bg(a, b, c);
        F = 0 !== (a.flags & 131072) ? !0 : !1;
      }
    } else F = !1, H && 0 !== (b.flags & 1048576) && Td(b, Md, b.index);
    b.lanes = 0;

    switch (b.tag) {
      case 2:
        var d = b.type;
        null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
        a = b.pendingProps;
        var e = kc(b, x.current);
        md(b, c);
        e = Ne(null, b, d, a, e, c);
        var f = Se();
        b.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, A(d) ? (f = !0, pc(b)) : f = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, qd(b), e.updater = Ed, b.stateNode = e, e._reactInternals = b, Id(b, d, a, c), b = lg(null, b, d, !0, f, c)) : (b.tag = 0, H && f && Ud(b), Q(null, b, e, c), b = b.child);
        return b;

      case 16:
        d = b.elementType;

        a: {
          null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
          a = b.pendingProps;
          e = d._init;
          d = e(d._payload);
          b.type = d;
          e = b.tag = ci(d);
          a = dd(d, a);

          switch (e) {
            case 0:
              b = gg(null, b, d, a, c);
              break a;

            case 1:
              b = kg(null, b, d, a, c);
              break a;

            case 11:
              b = bg(null, b, d, a, c);
              break a;

            case 14:
              b = dg(null, b, d, dd(d.type, a), c);
              break a;
          }

          throw Error(n(306, d, ""));
        }

        return b;

      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : dd(d, e), gg(a, b, d, e, c);

      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : dd(d, e), kg(a, b, d, e, c);

      case 3:
        a: {
          mg(b);
          if (null === a) throw Error(n(387));
          d = b.pendingProps;
          f = b.memoizedState;
          e = f.element;
          rd(a, b);
          xd(b, d, null, c);
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
              e = Error(n(423));
              b = ng(a, b, d, c, e);
              break a;
            } else if (d !== e) {
              e = Error(n(424));
              b = ng(a, b, d, c, e);
              break a;
            } else for (Va && (Xd = Ob(b.stateNode.containerInfo), Wd = b, H = !0, Zd = null, Yd = !1), c = se(b, null, d, c), b.child = c; c;) {
              c.flags = c.flags & -3 | 4096, c = c.sibling;
            }
          } else {
            ge();

            if (d === e) {
              b = cg(a, b, c);
              break a;
            }

            Q(a, b, d, c);
          }
          b = b.child;
        }

        return b;

      case 5:
        return Ae(b), null === a && de(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Na(d, e) ? g = null : null !== f && Na(d, f) && (b.flags |= 32), jg(a, b), Q(a, b, g, c), b.child;

      case 6:
        return null === a && de(b), null;

      case 13:
        return rg(a, b, c);

      case 4:
        return ye(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = re(b, null, d, c) : Q(a, b, d, c), b.child;

      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : dd(d, e), bg(a, b, d, e, c);

      case 7:
        return Q(a, b, b.pendingProps, c), b.child;

      case 8:
        return Q(a, b, b.pendingProps.children, c), b.child;

      case 12:
        return Q(a, b, b.pendingProps.children, c), b.child;

      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          f = b.memoizedProps;
          g = e.value;
          jd(b, d, g);
          if (null !== f) if (Uc(f.value, g)) {
            if (f.children === e.children && !z.current) {
              b = cg(a, b, c);
              break a;
            }
          } else for (f = b.child, null !== f && (f["return"] = b); null !== f;) {
            var h = f.dependencies;

            if (null !== h) {
              g = f.child;

              for (var k = h.firstContext; null !== k;) {
                if (k.context === d) {
                  if (1 === f.tag) {
                    k = sd(-1, c & -c);
                    k.tag = 2;
                    var l = f.updateQueue;

                    if (null !== l) {
                      l = l.shared;
                      var m = l.pending;
                      null === m ? k.next = k : (k.next = m.next, m.next = k);
                      l.pending = k;
                    }
                  }

                  f.lanes |= c;
                  k = f.alternate;
                  null !== k && (k.lanes |= c);
                  ld(f["return"], c, b);
                  h.lanes |= c;
                  break;
                }

                k = k.next;
              }
            } else if (10 === f.tag) g = f.type === b.type ? null : f.child;else if (18 === f.tag) {
              g = f["return"];
              if (null === g) throw Error(n(341));
              g.lanes |= c;
              h = g.alternate;
              null !== h && (h.lanes |= c);
              ld(g, c, b);
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
          Q(a, b, e.children, c);
          b = b.child;
        }

        return b;

      case 9:
        return e = b.type, d = b.pendingProps.children, md(b, c), e = nd(e), d = d(e), b.flags |= 1, Q(a, b, d, c), b.child;

      case 14:
        return d = b.type, e = dd(d, b.pendingProps), e = dd(d.type, e), dg(a, b, d, e, c);

      case 15:
        return fg(a, b, b.type, b.pendingProps, c);

      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : dd(d, e), null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, A(d) ? (a = !0, pc(b)) : a = !1, md(b, c), Gd(b, d, e), Id(b, d, e, c), lg(null, b, d, !0, a, c);

      case 19:
        return Ag(a, b, c);

      case 22:
        return hg(a, b, c);
    }

    throw Error(n(156, b.tag));
  };

  function Kh(a, b) {
    return Ic(a, b);
  }

  function di(a, b, c, d) {
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

  function ae(a, b, c, d) {
    return new di(a, b, c, d);
  }

  function eg(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }

  function ci(a) {
    if ("function" === typeof a) return eg(a) ? 1 : 0;

    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === ma) return 11;
      if (a === pa) return 14;
    }

    return 2;
  }

  function me(a, b) {
    var c = a.alternate;
    null === c ? (c = ae(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
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

  function oe(a, b, c, d, e, f) {
    var g = 2;
    d = a;
    if ("function" === typeof a) eg(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
      case ha:
        return qe(c.children, e, f, b);

      case ia:
        g = 8;
        e |= 8;
        break;

      case ja:
        return a = ae(12, c, b, e | 2), a.elementType = ja, a.lanes = f, a;

      case na:
        return a = ae(13, c, b, e), a.elementType = na, a.lanes = f, a;

      case oa:
        return a = ae(19, c, b, e), a.elementType = oa, a.lanes = f, a;

      case ra:
        return sg(c, e, f, b);

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
        throw Error(n(130, null == a ? a : typeof a, ""));
    }
    b = ae(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f;
    return b;
  }

  function qe(a, b, c, d) {
    a = ae(7, a, d, b);
    a.lanes = c;
    return a;
  }

  function sg(a, b, c, d) {
    a = ae(22, a, d, b);
    a.elementType = ra;
    a.lanes = c;
    a.stateNode = {};
    return a;
  }

  function ne(a, b, c) {
    a = ae(6, a, null, b);
    a.lanes = c;
    return a;
  }

  function pe(a, b, c) {
    b = ae(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = {
      containerInfo: a.containerInfo,
      pendingChildren: null,
      implementation: a.implementation
    };
    return b;
  }

  function ei(a, b, c, d, e) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = Ra;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = Dc(0);
    this.expirationTimes = Dc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = Dc(0);
    this.identifierPrefix = d;
    this.onRecoverableError = e;
    Va && (this.mutableSourceEagerHydrationData = null);
  }

  function fi(a, b, c, d, e, f, g, h, k) {
    a = new ei(a, b, c, h, k);
    1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;
    f = ae(3, null, null, b);
    a.current = f;
    f.stateNode = a;
    f.memoizedState = {
      element: d,
      isDehydrated: c,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null
    };
    qd(f);
    return a;
  }

  function gi(a) {
    if (!a) return ic;
    a = a._reactInternals;

    a: {
      if (wa(a) !== a || 1 !== a.tag) throw Error(n(170));
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

      throw Error(n(171));
    }

    if (1 === a.tag) {
      var c = a.type;
      if (A(c)) return nc(a, c, b);
    }

    return b;
  }

  function hi(a) {
    var b = a._reactInternals;

    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(n(188));
      a = Object.keys(a).join(",");
      throw Error(n(268, a));
    }

    a = Aa(b);
    return null === a ? null : a.stateNode;
  }

  function ii(a, b) {
    a = a.memoizedState;

    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }

  function ji(a, b) {
    ii(a, b);
    (a = a.alternate) && ii(a, b);
  }

  function ki(a) {
    a = Aa(a);
    return null === a ? null : a.stateNode;
  }

  function li() {
    return null;
  }

  exports.attemptContinuousHydration = function (a) {
    if (13 === a.tag) {
      var b = G();
      Dd(a, 134217728, b);
      ji(a, 134217728);
    }
  };

  exports.attemptDiscreteHydration = function (a) {
    if (13 === a.tag) {
      var b = G();
      Dd(a, 1, b);
      ji(a, 1);
    }
  };

  exports.attemptHydrationAtCurrentPriority = function (a) {
    if (13 === a.tag) {
      var b = G(),
          c = Cd(a);
      Dd(a, c, b);
      ji(a, c);
    }
  };

  exports.attemptSynchronousHydration = function (a) {
    switch (a.tag) {
      case 3:
        var b = a.stateNode;

        if (b.current.memoizedState.isDehydrated) {
          var c = xc(b.pendingLanes);
          0 !== c && (Gc(b, c | 1), Ih(b, D()), 0 === (W & 6) && (yh(), $c()));
        }

        break;

      case 13:
        var d = G();
        Vh(function () {
          return Dd(a, 1, d);
        });
        ji(a, 1);
    }
  };

  exports.batchedUpdates = function (a, b) {
    var c = W;
    W |= 1;

    try {
      return a(b);
    } finally {
      W = c, 0 === W && (yh(), Wc && $c());
    }
  };

  exports.createComponentSelector = function (a) {
    return {
      $$typeof: eh,
      value: a
    };
  };

  exports.createContainer = function (a, b, c, d, e, f, g) {
    return fi(a, b, !1, null, c, d, e, f, g);
  };

  exports.createHasPseudoClassSelector = function (a) {
    return {
      $$typeof: fh,
      value: a
    };
  };

  exports.createHydrationContainer = function (a, b, c, d, e, f, g, h, k) {
    a = fi(c, d, !0, a, e, f, g, h, k);
    a.context = gi(null);
    c = a.current;
    d = G();
    e = Cd(c);
    f = sd(d, e);
    f.callback = void 0 !== b && null !== b ? b : null;
    td(c, f);
    a.current.lanes = e;
    Ec(a, e, d);
    Ih(a, d);
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
      $$typeof: gh,
      value: a
    };
  };

  exports.createTestNameSelector = function (a) {
    return {
      $$typeof: hh,
      value: a
    };
  };

  exports.createTextSelector = function (a) {
    return {
      $$typeof: ih,
      value: a
    };
  };

  exports.deferredUpdates = function (a) {
    var b = C,
        c = V.transition;

    try {
      return V.transition = null, C = 16, a();
    } finally {
      C = b, V.transition = c;
    }
  };

  exports.discreteUpdates = function (a, b, c, d, e) {
    var f = C,
        g = V.transition;

    try {
      return V.transition = null, C = 1, a(b, c, d, e);
    } finally {
      C = f, V.transition = g, 0 === W && yh();
    }
  };

  exports.findAllNodes = oh;

  exports.findBoundingRects = function (a, b) {
    if (!bb) throw Error(n(363));
    b = oh(a, b);
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
              m = l + k.width,
              r = k.y,
              q = r + k.height;

          if (d >= l && f >= r && e <= m && g <= q) {
            a.splice(b, 1);
            break;
          } else if (!(d !== l || c.width !== k.width || q < f || r > g)) {
            r > f && (k.height += r - f, k.y = f);
            q < g && (k.height = g - r);
            a.splice(b, 1);
            break;
          } else if (!(f !== r || c.height !== k.height || m < d || l > e)) {
            l > d && (k.width += l - d, k.x = d);
            m < e && (k.width = e - l);
            a.splice(b, 1);
            break;
          }
        }
      }
    }

    return a;
  };

  exports.findHostInstance = hi;

  exports.findHostInstanceWithNoPortals = function (a) {
    a = ya(a);
    a = null !== a ? Ca(a) : null;
    return null === a ? null : a.stateNode;
  };

  exports.findHostInstanceWithWarning = function (a) {
    return hi(a);
  };

  exports.flushControlled = function (a) {
    var b = W;
    W |= 1;
    var c = V.transition,
        d = C;

    try {
      V.transition = null, C = 1, a();
    } finally {
      C = d, V.transition = c, W = b, 0 === W && (yh(), $c());
    }
  };

  exports.flushPassiveEffects = Mh;
  exports.flushSync = Vh;

  exports.focusWithin = function (a, b) {
    if (!bb) throw Error(n(363));
    a = kh(a);
    b = nh(a, b);
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
    if (!bb) throw Error(n(363));
    var c = 0,
        d = [];
    a = [kh(a), 0];

    for (var e = 0; e < a.length;) {
      var f = a[e++],
          g = a[e++],
          h = b[g];
      if (5 !== f.tag || !fb(f)) if (lh(f, h) && (d.push(mh(h)), g++, g > c && (c = g)), g < b.length) for (f = f.child; null !== f;) {
        a.push(f, g), f = f.sibling;
      }
    }

    if (c < b.length) {
      for (a = []; c < b.length; c++) {
        a.push(mh(b[c]));
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
      findHostInstanceByFiber: ki,
      findFiberByHostInstance: a.findFiberByHostInstance || li,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.1.0"
    };
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) a = !1;else {
      var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (b.isDisabled || !b.supportsFiber) a = !0;else {
        try {
          Qc = b.inject(a), Rc = b;
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
    if (!bb) throw Error(n(363));
    a = oh(a, b);
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
        f = G(),
        g = Cd(e);
    c = gi(c);
    null === b.context ? b.context = c : b.pendingContext = c;
    b = sd(f, g);
    b.payload = {
      element: a
    };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    td(e, b);
    a = Dd(e, g, f);
    null !== a && vd(a, e, g);
    return g;
  };

  return exports;
};

/***/ }),

/***/ 832:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(467);
} else {}

/***/ }),

/***/ 573:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(123);
} else {}

/***/ }),

/***/ 454:
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


var f = __webpack_require__(152),
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

/***/ 848:
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

exports.version = "18.1.0";

/***/ }),

/***/ 152:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(848);
} else {}

/***/ }),

/***/ 797:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(454);
} else {}

/***/ }),

/***/ 523:
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

/***/ 526:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(523);
} else {}

/***/ }),

/***/ 773:
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


var e = __webpack_require__(152);

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

/***/ 783:
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


var g = __webpack_require__(152);

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

/***/ 550:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(773);
} else {}

/***/ }),

/***/ 764:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(783);
} else {}

/***/ }),

/***/ 237:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".mat-elevation-0{box-shadow:none}.mat-elevation-1{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-2{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-3{box-shadow:0px 3px 3px -2px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-4{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-5{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-6{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-7{box-shadow:0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-8{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-9{box-shadow:0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-10{box-shadow:0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-11{box-shadow:0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-12{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-13{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-14{box-shadow:0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-15{box-shadow:0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-16{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-17{box-shadow:0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-18{box-shadow:0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-19{box-shadow:0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-20{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-21{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-22{box-shadow:0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-23{box-shadow:0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}:root{font-size:16px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 786:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 822:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 177:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 179:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 339:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 492:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 621:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 352:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 440:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 382:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ripple_ripple__q\\+owa{pointer-events:none;border-radius:50%;background-color:rgba(0,0,0,.1);position:absolute;transition:opacity 300ms ease-out,scale 450ms cubic-bezier(0, 0, 0.2, 1);translate:-50% -50%;scale:1}.ripple_ripple__q\\+owa:enter{scale:0}.ripple_ripple__q\\+owa:leave{opacity:0;transition:opacity 400ms ease-out,scale 450ms cubic-bezier(0, 0, 0.2, 1);state-duration:400ms}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"ripple": "ripple_ripple__q+owa"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 711:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 770:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{--mat-slider-color: cornflowerblue}.slider_host__QngDt{height:20px;width:200px;margin:20px;transform-origin:50% 50%;navigation:vertical;cursor:pointer}.slider_host__QngDt[orientation=vertical]{width:20px;height:200px;navigation:horizontal}.slider_host__QngDt .slider_track__LWAGS{position:absolute;left:0;right:0;top:25%;bottom:25%;background-color:#c7c7c7;border-radius:4px;border-width:1px;flex-direction:row}.slider_host__QngDt[orientation=vertical] .slider_track__LWAGS{left:25%;right:25%;top:0;bottom:0;flex-direction:column-reverse}.slider_host__QngDt[direction=horizontal-reverse] .slider_track__LWAGS,.slider_host__QngDt[direction=vertical-reverse] .slider_track__LWAGS{justify-content:flex-end}.slider_host__QngDt .slider_fill__2De\\+O{background-color:#ebebeb;width:100%;height:100%}.slider_host__QngDt .slider_thumbContainer__28Lbu{background-color:rgba(0,0,0,0);position:absolute;width:0;height:0}.slider_host__QngDt[direction=horizontal] .slider_thumbContainer__28Lbu{top:50%;right:0}.slider_host__QngDt[direction=horizontal-reverse] .slider_thumbContainer__28Lbu{top:50%;left:0}.slider_host__QngDt[direction=vertical] .slider_thumbContainer__28Lbu{left:50%;top:0}.slider_host__QngDt[direction=vertical-reverse] .slider_thumbContainer__28Lbu{left:50%;bottom:0}.slider_host__QngDt .slider_thumb__HCBio{align-items:center;border-radius:20px;height:20px;width:20px;position:absolute;transform-origin:center;translate:-50% -50%;border-width:1px;border-color:var(--mat-slider-color);background-color:#ebebeb}.slider_host__QngDt[orientation=horizontal] .slider_thumb__HCBio{flex-direction:column}.slider_host__QngDt[orientation=vertical] .slider_thumb__HCBio{flex-direction:row}.slider_host__QngDt:hover .slider_thumb__HCBio{background-color:#ebebeb}.slider_host__QngDt:focus .slider_thumb__HCBio{background-color:#fafafa}.slider_host__QngDt:active .slider_thumb__HCBio{background-color:#dbdbdb}.slider_host__QngDt[readonly]{cursor:default}.slider_host__QngDt[readonly] .slider_thumb__HCBio{background-color:#ebebeb}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "slider_host__QngDt",
	"track": "slider_track__LWAGS",
	"fill": "slider_fill__2De+O",
	"thumbContainer": "slider_thumbContainer__28Lbu",
	"thumb": "slider_thumb__HCBio"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 739:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 513:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 213:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(441);
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

/***/ 487:
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

/***/ 52:
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

/***/ 469:
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

/***/ 10:
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

/***/ 631:
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

/***/ 329:
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
  "globalsWatcher": () => (globalsWatcher),
  "insertStyledComponentsSheet": () => (insertStyledComponentsSheet),
  "unstable_batchedUpdates": () => (batchedUpdates),
  "useGlobals": () => (useGlobals),
  "useWatchable": () => (useWatchable)
});

// EXTERNAL MODULE: ../../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(797);
;// CONCATENATED MODULE: ../../../node_modules/clsx/dist/clsx.m.js
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
// EXTERNAL MODULE: ../../../node_modules/react/index.js
var react = __webpack_require__(152);
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
} //# sourceMappingURL=helpers.js.map
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(487);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(631);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(52);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(10);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(469);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../../../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(329);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/accordion/index.module.scss
var index_module = __webpack_require__(786);
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
Accordion.Content = _Content; //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/ripple/index.module.scss
var ripple_index_module = __webpack_require__(382);
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
} //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/button/index.module.scss
var button_index_module = __webpack_require__(177);
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
  }));
});

var Button = react.memo(_Button); //# sourceMappingURL=index.js.map
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
} //# sourceMappingURL=use-root-class.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/modal/index.module.scss
var modal_index_module = __webpack_require__(621);
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
        })
      }))]
    }))
  }));
} //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/alert/index.module.scss
var alert_index_module = __webpack_require__(822);
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
} //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/card/index.module.scss
var card_index_module = __webpack_require__(179);
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
Card.Content = card_Content; //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/confirm/index.module.scss
var confirm_index_module = __webpack_require__(339);
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
} //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/input/index.module.scss
var input_index_module = __webpack_require__(492);
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
}); //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/paper/index.module.scss
var paper_index_module = __webpack_require__(352);
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
  }));
}

var Paper = react.memo(_Paper); //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/text/index.module.scss
var text_index_module = __webpack_require__(739);
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
}); //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/prompt/index.module.scss
var prompt_index_module = __webpack_require__(440);
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
} //# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/util/hooks/use-auto-ref.js

function useAutoRef(value) {
  var ref = (0,react.useRef)(value);
  (0,react.useLayoutEffect)(function () {
    ref.current = value;
  });
  return ref;
} //# sourceMappingURL=use-auto-ref.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/util/selection.js
;

var SelectionState =
/** @class */
function () {
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
var toggle_index_module = __webpack_require__(513);
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

var ToggleGroup = react.memo(_ToggleGroup); //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/select/index.module.scss
var select_index_module = __webpack_require__(711);
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
Select.Option = _Option; //# sourceMappingURL=index.js.map
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
} //# sourceMappingURL=use-control-check.js.map
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/slider/index.module.scss
var slider_index_module = __webpack_require__(770);
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
      readOnly = _a.readOnly,
      otherProps = slider_rest(_a, ["onChange", "onScroll", "name", "children", "defaultValue", "value", "direction", "mode", "min", "max", "step", "keyStep", "allowScroll", "scrollMultiplier", "readOnly"]);

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
            children: typeof children === 'function' ? (0,jsx_runtime.jsx)(SliderChild, {
              defaultValue: curValue.current,
              callback: children,
              ref: childRef
            }) : children
          }))
        }))
      }))
    }))
  }));
});

var Slider = react.memo(_Slider); //# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../../node_modules/react-reconciler/constants.js
var constants = __webpack_require__(832);
;// CONCATENATED MODULE: ../../../renderer/dist/src/version.js
var version = '0.11.0';
// EXTERNAL MODULE: ../../../node_modules/use-sync-external-store/shim/index.js
var shim = __webpack_require__(550);
// EXTERNAL MODULE: ../../../node_modules/use-sync-external-store/with-selector.js
var with_selector = __webpack_require__(764);
;// CONCATENATED MODULE: ../../../renderer/dist/src/helpers/dictionary-watcher.js
var dictionary_watcher_assign = undefined && undefined.__assign || function () {
  dictionary_watcher_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
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

  var snapshot = dictionary_watcher_assign({}, dictionary);

  var subscribe = function subscribe(onStoreChange) {
    snapshot = dictionary_watcher_assign({}, dictionary);
    var remove = dictionary === null || dictionary === void 0 ? void 0 : dictionary.AddListener(function (key, value, dic) {
      snapshot = dictionary_watcher_assign({}, dictionary);
      onStoreChange();
    });

    if (!remove) {
      if (displayName) console.warn("".concat(displayName, " dictionary does not provide a change listener"));else console.warn('The dictionary does not provide a change listener');
    }

    return function () {
      return remove === null || remove === void 0 ? void 0 : remove();
    };
  };

  var getSnapshot = function getSnapshot() {
    return snapshot;
  };

  var Provider = function GlobalsProvider(_a) {
    var children = _a.children;
    var value = (0,shim.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
    return (0,react.createElement)(ctx.Provider, {
      value: value
    }, children);
  };

  function useSelector(selector) {
    return (0,with_selector.useSyncExternalStoreWithSelector)(subscribe, getSnapshot, getSnapshot, selector);
  }

  function useDictionaryContext() {
    var context = (0,react.useContext)(ctx);

    if (context === undefined) {
      if (displayName) throw new Error("".concat(displayName, ".useContext must be used within a ").concat(displayName, ".Provider"));else throw new Error('useContext must be used within a provider');
    }

    return context;
  }

  return {
    context: ctx,
    Provider: Provider,
    useContext: useDictionaryContext,
    useSelector: useSelector
  };
}
var globalsWatcher = createDictionaryWatcher(Globals, 'globalsContext');
var useGlobals = globalsWatcher.useContext;
var GlobalsProvider = globalsWatcher.Provider;
;// CONCATENATED MODULE: ../../../renderer/dist/src/views/error-boundary.js
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
      withHelpers = _a.withHelpers;
  return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: !withHelpers ? children : (0,jsx_runtime.jsx)(ErrorBoundary, {
      children: (0,jsx_runtime.jsx)(GlobalsProvider, {
        children: children
      })
    })
  });
}
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/async/objects.js
var ObjectsRepo =
/** @class */
function () {
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
var react_reconciler = __webpack_require__(573);
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/diffing.js
var styleStringSymbol = '__style_as_string__';
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

    var prop = null; // If style existed in the previous properties as string, set it to null

    if (propKey === 'style' && typeof lastProps.style === 'string') {
      (updatePayload = updatePayload || {})[styleStringSymbol] = null;
    } else {
      var depth = deepDiffing > 0 ? deepDiffing : propKey === 'style' ? 1 : 0;

      if (depth > 0) {
        prop = diffProperties(lastProps[propKey], {}, depth - 1);
        if (!prop) continue;
      } // For all other deleted properties we add it to the queue. We use
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
    }

    if (deepDiffing > 0) {
      prop = diffProperties(lastProp, nextProp, deepDiffing - 1);
      if (!prop) continue;
    }

    (updatePayload = updatePayload || {})[propKey] = prop;
  }

  return updatePayload;
}
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/constants.js
var constants_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

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
function getAllowedProps(props, type) {
  var children = props.children,
      tag = props.tag,
      rest = constants_rest(props, ["children", "tag"]);

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
  }
};
var isDevelopment = "production" === 'development';
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/subcontexts/richtext.js
function stringifyRichText(node) {
  var _a, _b;

  if (node.hidden) return '';
  if ('text' in node) return node.text;
  var acc = [];
  var tag = node.tag;

  if (tag) {
    acc.push('<');
    acc.push(tag);

    if (((_a = node.attributes) === null || _a === void 0 ? void 0 : _a.value) != null) {
      acc.push('="');
      acc.push(node.attributes.value);
      acc.push('"');
    }

    for (var key in node.attributes) {
      if (key === 'value') continue;

      if (Object.prototype.hasOwnProperty.call(node.attributes, key)) {
        var value = node.attributes[key];

        if (value != null) {
          acc.push(' ');
          acc.push(key);

          if (typeof value === 'number') {
            acc.push('=');
            acc.push(value + '');
          } else {
            acc.push('="');
            acc.push(value);
            acc.push('"');
          }
        }
      }
    }

    acc.push('>');
  }

  if (((_b = node.children) === null || _b === void 0 ? void 0 : _b.length) > 0) {
    for (var _i = 0, _c = node.children; _i < _c.length; _i++) {
      var child = _c[_i];
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



var CallbacksRepo =
/** @class */
function (_super) {
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
}(ObjectsRepo);


;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/async/serializer.js


var callbacksRepo = new CallbacksRepo();
var objectsRepo = new ObjectsRepo(); // Separates properties in 3 categories: regular props, callbacks and non-serializable objects

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

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
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
        r: refId
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

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
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
    return UnityBridge.createElement(props.tag || type, children, rootContainerInstance, aProps);
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
var Renderer = {
  render: function render(element, options) {
    if (options === void 0) {
      options = {};
    }

    var hostContainer = (options === null || options === void 0 ? void 0 : options.hostContainer) || HostContainer;
    var isAsync = !(options === null || options === void 0 ? void 0 : options.disableBatchRendering);

    var _a = containerMap.get(hostContainer) || {},
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

        var hostContainerInstance = {
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
          hostContainer.Context.FlushCommands(serialized);
        };

        hostRoot = asyncReconciler.createContainer(hostContainerInstance, mode, false, null);
      } else {
        hostRoot = syncReconciler.createContainer(hostContainer, mode, false, null);
      }

      containerMap.set(hostContainer, {
        hostRoot: hostRoot,
        asyncJobCallback: asyncJobCallback
      });
    }

    var shouldWrapWithHelpers = !(options === null || options === void 0 ? void 0 : options.disableHelpers);

    if (shouldWrapWithHelpers) {
      var viewWrapperProps = {
        withHelpers: !(options === null || options === void 0 ? void 0 : options.disableHelpers)
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
};
var batchedUpdates = asyncReconciler.batchedUpdates;
var flushSync = asyncReconciler.flushSync;
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!../../../material/dist/src/tooltip/index.module.scss
var tooltip_index_module = __webpack_require__(213);
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
  UnityBridge.appendChild(target, anchor);

  if (withBackdrop) {
    var backdrop = UnityBridge.createElement('portal', '', HostContainer);
    backdrop.ClassName = clsx_m(src_tooltip_index_module.backdrop, 'mat-tooltip-backdrop');
    backdrop.Name = '<TooltipBackdrop>';
    UnityBridge.addEventListener(backdrop, 'onPointerClick', hide);
    UnityBridge.appendChild(anchor, backdrop);
  }

  UnityBridge.appendChild(anchor, tooltip);
  Renderer.render(props.content, {
    disableHelpers: true,
    hostContainer: tooltip
  });
  return anchor;
}

function useTooltip(props, trigger) {
  if (trigger === void 0) {
    trigger = 'auto';
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

    callbacks.length = 0;
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
} //# sourceMappingURL=index.js.map
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
} //# sourceMappingURL=domHelpers.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/timer.js
function cancelTimeout(timeoutID) {
  clearTimeout(timeoutID.id);
}
function requestTimeout(callback, delay) {
  return {
    id: setTimeout(callback, delay)
  };
} //# sourceMappingURL=timer.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/createGridComponent.js
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
}; //# sourceMappingURL=createGridComponent.js.map
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
  initInstanceProps: function initInstanceProps(props) {// Noop
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: function validateProps(_a) {
    var columnWidth = _a.columnWidth,
        rowHeight = _a.rowHeight;

    if (false) {}
  }
}); //# sourceMappingURL=FixedSizeGrid.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/createListComponent.js
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
}; //# sourceMappingURL=createListComponent.js.map
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
  initInstanceProps: function initInstanceProps(props) {// Noop
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: function validateProps(_a) {
    var itemSize = _a.itemSize;

    if (false) {}
  }
}); //# sourceMappingURL=FixedSizeList.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/VariableSizeGrid.js

var DEFAULT_ESTIMATED_ITEM_SIZE = 50;

var getEstimatedTotalHeight = function getEstimatedTotalHeight(_a, _b) {
  var rowCount = _a.rowCount;
  var rowMetadataMap = _b.rowMetadataMap,
      estimatedRowHeight = _b.estimatedRowHeight,
      lastMeasuredRowIndex = _b.lastMeasuredRowIndex;
  var totalSizeOfMeasuredRows = 0; // Edge case check for when the number of items decreases while a scroll is in progress.
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
  var totalSizeOfMeasuredRows = 0; // Edge case check for when the number of items decreases while a scroll is in progress.
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
  var itemMetadata = getItemMetadata(itemType, props, index, instanceProps); // Get estimated total size after ItemMetadata is computed,
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
      } // We could potentially optimize further by only evicting styles after this index,
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
}); //# sourceMappingURL=VariableSizeGrid.js.map
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
    var itemMetadata = VariableSizeList_getItemMetadata(props, index, instanceProps); // Get estimated total size after ItemMetadata is computed,
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
}); //# sourceMappingURL=VariableSizeList.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/index.js



 //# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ../../../material/dist/src/index.js















 //# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ../../../material/dist/index.js
 //# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ../../../renderer/dist/src/helpers/styled-components-helper.js
function insertStyledComponentsSheet(sheet) {
  try {
    var styleElements = sheet.getStyleElement();

    for (var _i = 0, styleElements_1 = styleElements; _i < styleElements_1.length; _i++) {
      var element = styleElements_1[_i];
      var styleContent = element.props.dangerouslySetInnerHTML.__html;
      Context.InsertStyle(styleContent);
    }
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
}
;// CONCATENATED MODULE: ../../../renderer/dist/src/helpers/watcher.js


function useWatchable(obj) {
  var isWatchable = (0,react.useMemo)(function () {
    return obj && typeof obj === 'object' && 'Value' in obj;
  }, [obj]);
  var subscribe = (0,react.useCallback)(function (onStoreChange) {
    if (isWatchable && 'AddListener' in obj) {
      var unsub_1 = obj.AddListener(function () {
        return onStoreChange();
      });
      return function () {
        return unsub_1 === null || unsub_1 === void 0 ? void 0 : unsub_1();
      };
    }

    return function () {};
  }, [obj, isWatchable]);
  var getSnapshot = (0,react.useCallback)(function () {
    return isWatchable ? obj.Value : undefined;
  }, [obj, isWatchable]);
  return (0,shim.useSyncExternalStore)(subscribe, getSnapshot);
}
;// CONCATENATED MODULE: ../../../renderer/dist/index.js








;// CONCATENATED MODULE: ./src/app.tsx
var ReactUnity=renderer_dist_namespaceObject;var Material=dist_namespaceObject;var MaterialStyles=function MaterialStyles(){return __webpack_require__(549);};/*INJECTABLE_START*/
(function (react, ReactUnity, Material, MaterialStyles) {
  var __originalRender = ReactUnity.Renderer.render;

  var renderCalled = false;
  function render(element, options) {
    renderCalled = true;
    __originalRender.apply(ReactUnity.Renderer, [element, Object.assign({ mode: 'legacy' }, options || {})]);
  }

  ReactUnity = Object.assign({}, ReactUnity, { Renderer: Object.assign({}, ReactUnity.Renderer, { render: render }) });
  var ReactUnityRenderer = ReactUnity.Renderer;
  var Renderer = ReactUnity.Renderer;
  var React = react;

  var exports = {};
  var module = { exports: exports };

  var require = function (module) {
    if (module === 'react') return react;
    if (module === '@reactunity/renderer') return ReactUnity;
    if (module === '@reactunity/material/styles') return MaterialStyles();
    if (module === '@reactunity/material') return Material;
    if (module.startsWith('@reactunity/material/')) return Material;
  };

  var defaultComponent;

  let result = (function (module, exports, render, require) {

    /*INJECT_CODE*/

    if(typeof App === 'function') defaultComponent = App;
    else if(typeof Example === 'function') defaultComponent = Example;
  })(module, exports, render, require);


  if (renderCalled) {
    // No need to do anything
  } else if (exports.default) {
    render(react.createElement(exports.default));
  } else if (result) {
    render(react.createElement(result));
  } else if (exports.App) {
    render(react.createElement(exports.App));
  } else if (exports.Example) {
    render(react.createElement(exports.Example));
  } else if (defaultComponent) {
    render(react.createElement(defaultComponent));
  } else {
    console.error('Nothing was rendered');
  }
})(react, ReactUnity, Material, MaterialStyles);

/*INJECTABLE_END*/
;// CONCATENATED MODULE: ./src/index.ts

})();

/******/ })()
;