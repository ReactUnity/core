/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 793:
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
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[5].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[5].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[5].use[3]!../../../material/dist/src/styles/globals.scss
var globals = __webpack_require__(782);
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


/***/ }),

/***/ 840:
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

/***/ 501:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 280:
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

/***/ 482:
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

  var aa = __webpack_require__(280),
      ba = __webpack_require__(68),
      m = __webpack_require__(473);

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

/***/ 633:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(482);
} else {}

/***/ }),

/***/ 14:
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


__webpack_require__(280);

var f = __webpack_require__(68),
    g = 60103;

exports.Fragment = 60107;

if ("function" === typeof Symbol && Symbol["for"]) {
  var h = Symbol["for"];
  g = h("react.element");
  exports.Fragment = h("react.fragment");
}

var m = Object.prototype.hasOwnProperty,
    n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
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
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
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
    _owner: n.current
  };
}

exports.jsx = q;
exports.jsxs = q;

/***/ }),

/***/ 715:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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


var l = __webpack_require__(280),
    m = 60103,
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
  m = w("react.element");
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

var z = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
},
    A = {};

function B(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = A;
  this.updater = e || z;
}

B.prototype.isReactComponent = {};

B.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};

B.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function C() {}

C.prototype = B.prototype;

function D(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = A;
  this.updater = e || z;
}

var E = D.prototype = new C();
E.constructor = D;
l(E, B.prototype);
E.isPureReactComponent = !0;
var F = Array.isArray,
    G = Object.prototype.hasOwnProperty,
    H = {
  current: null
},
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, e) {
  var d,
      c = {},
      k = null,
      h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) {
    G.call(b, d) && !I.hasOwnProperty(d) && (c[d] = b[d]);
  }
  var g = arguments.length - 2;
  if (1 === g) c.children = e;else if (1 < g) {
    for (var f = Array(g), n = 0; n < g; n++) {
      f[n] = arguments[n + 2];
    }

    c.children = f;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) {
    void 0 === c[d] && (c[d] = g[d]);
  }
  return {
    $$typeof: m,
    type: a,
    key: k,
    ref: h,
    props: c,
    _owner: H.current
  };
}

function K(a, b) {
  return {
    $$typeof: m,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function L(a) {
  return "object" === typeof a && null !== a && a.$$typeof === m;
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

function O(a, b, e, d, c) {
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
        case m:
        case p:
          h = !0;
      }

  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + N(h, 0) : d, F(c) ? (e = "", null != a && (e = a.replace(M, "$&/") + "/"), O(c, b, e, "", function (a) {
    return a;
  })) : null != c && (L(c) && (c = K(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(M, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (F(a)) for (var g = 0; g < a.length; g++) {
    k = a[g];
    var f = d + N(k, g);
    h += O(k, b, e, f, c);
  } else if (f = y(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) {
    k = k.value, f = d + N(k, g++), h += O(k, b, e, f, c);
  } else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}

function P(a, b, e) {
  if (null == a) return a;
  var d = [],
      c = 0;
  O(a, d, "", "", function (a) {
    return b.call(e, a, c++);
  });
  return d;
}

function Q(a) {
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

var R = {
  current: null
},
    S = {
  transition: 0
},
    T = {
  ReactCurrentDispatcher: R,
  ReactCurrentBatchConfig: S,
  ReactCurrentOwner: H,
  assign: l
};
exports.Children = {
  map: P,
  forEach: function forEach(a, b, e) {
    P(a, function () {
      b.apply(this, arguments);
    }, e);
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
    if (!L(a)) throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  }
};
exports.Component = B;
exports.PureComponent = D;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;

exports.cloneElement = function (a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = l({}, a.props),
      c = a.key,
      k = a.ref,
      h = a._owner;

  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = H.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;

    for (f in b) {
      G.call(b, f) && !I.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
  }

  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    g = Array(f);

    for (var n = 0; n < f; n++) {
      g[n] = arguments[n + 2];
    }

    d.children = g;
  }
  return {
    $$typeof: m,
    type: a.type,
    key: c,
    ref: k,
    props: d,
    _owner: h
  };
};

exports.createContext = function (a) {
  a = {
    $$typeof: r,
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

exports.startTransition = function (a) {
  var b = S.transition;
  S.transition = 1;

  try {
    a();
  } finally {
    S.transition = b;
  }
};

exports.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};

exports.unstable_createMutableSource = function (a, b) {
  return {
    _getVersion: b,
    _source: a,
    _workInProgressVersionPrimary: null,
    _workInProgressVersionSecondary: null
  };
};

exports.useCallback = function (a, b) {
  return R.current.useCallback(a, b);
};

exports.useContext = function (a) {
  return R.current.useContext(a);
};

exports.useDebugValue = function () {};

exports.useDeferredValue = function (a) {
  return R.current.useDeferredValue(a);
};

exports.useEffect = function (a, b) {
  return R.current.useEffect(a, b);
};

exports.useId = function () {
  return R.current.useId();
};

exports.useImperativeHandle = function (a, b, e) {
  return R.current.useImperativeHandle(a, b, e);
};

exports.useInsertionEffect = function (a, b) {
  return R.current.useInsertionEffect(a, b);
};

exports.useLayoutEffect = function (a, b) {
  return R.current.useLayoutEffect(a, b);
};

exports.useMemo = function (a, b) {
  return R.current.useMemo(a, b);
};

exports.useReducer = function (a, b, e) {
  return R.current.useReducer(a, b, e);
};

exports.useRef = function (a) {
  return R.current.useRef(a);
};

exports.useState = function (a) {
  return R.current.useState(a);
};

exports.useSyncExternalStore = function (a, b, e) {
  return R.current.useSyncExternalStore(a, b, e);
};

exports.useTransition = function () {
  return R.current.useTransition();
};

exports.version = "18.0.0-rc.0-fe905f152-20220107";

/***/ }),

/***/ 68:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(715);
} else {}

/***/ }),

/***/ 377:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(14);
} else {}

/***/ }),

/***/ 365:
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

/***/ 473:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(365);
} else {}

/***/ }),

/***/ 782:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".mat-elevation-0{box-shadow:none}.mat-elevation-1{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-2{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-3{box-shadow:0px 3px 3px -2px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-4{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-5{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-6{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-7{box-shadow:0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-8{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-9{box-shadow:0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-10{box-shadow:0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-11{box-shadow:0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-12{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-13{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-14{box-shadow:0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-15{box-shadow:0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-16{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-17{box-shadow:0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-18{box-shadow:0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-19{box-shadow:0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-20{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-21{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-22{box-shadow:0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-23{box-shadow:0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}:root{font-size:16px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 245:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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

/***/ 924:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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

/***/ 288:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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

/***/ 876:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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

/***/ 512:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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

/***/ 69:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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

/***/ 471:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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

/***/ 765:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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

/***/ 554:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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

/***/ 953:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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

/***/ 131:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".select_host__I4Iat.select_chips__ETidb .select_triggerPart__Mhm7Z{font-size:.8125rem;margin:4px 4px 2px 4px;height:24px;background-color:rgba(0,0,0,.12);border-radius:12px;padding:4px 8px;text-align:center}.select_host__I4Iat.select_chips__ETidb .select_triggerContent__Fobc3{margin-left:-4px}.select_triggerContent__Fobc3{flex-direction:row;align-items:center;justify-content:flex-start}.select_trigger__1ni6-{font-size:1em;flex:1 1 0;overflow:hidden;text-align:left;padding:0 12px;border:none;appearance:none;background-color:none;border-radius:0;pointer-events:all;flex-direction:row;align-items:center;justify-content:flex-start}.select_menuRoot__sx32T{position:absolute;left:0;right:0;bottom:-1px;height:0;z-index:10000;translate:0 -20px;opacity:0;display:none;transition:translate 300ms ease-out,opacity 300ms ease-out,display 300ms step-end;pointer-events:none}.select_menuRoot__sx32T.select_opened__3n-3-{transition:translate 300ms ease-out,opacity 300ms ease-out,display 300ms step-start;display:flex;translate:0 0;opacity:1;pointer-events:auto}.select_backdrop__8IwS1{position:absolute;top:-5000px;right:-5000px;bottom:-5000px;left:-5000px;background-color:transparent;cursor:default;pointer-events:all}.select_menu__7u0ws{position:absolute;top:100%;left:0;minwidth:100%;background-color:#fff;max-height:60vh}.select_option__WJfAF{border-radius:0;text-align:left;flex-direction:row;align-items:center;justify-content:flex-start;min-height:48px}.select_option__WJfAF.select_selected__8VEDK{background-color:rgba(0,0,0,.06)}.select_option__WJfAF .select_toggle__UScLL{pointer-events:none}.select_caret__zd8yA{pointer-events:none;align-items:center;justify-content:center;padding:8px;position:absolute;right:12px;top:50%;translate:0 -50%;width:36px;height:36px;line-height:20px;transition:rotate 300ms}.select_host__I4Iat.select_opened__3n-3- .select_caret__zd8yA{rotate:180deg}.select_defaultSeparator__3VaZB{margin-right:.4em}", ""]);
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

/***/ 868:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{--mat-slider-color: cornflowerblue}.slider_host__QngDt{height:20px;width:200px;margin:20px;transform-origin:50% 50%;navigation:vertical;cursor:pointer}.slider_host__QngDt[orientation=vertical]{width:20px;height:200px;navigation:horizontal}.slider_host__QngDt .slider_track__LWAGS{position:absolute;left:0;right:0;top:25%;bottom:25%;background-color:#c7c7c7;border-radius:4px;border-width:1px;flex-direction:row}.slider_host__QngDt[orientation=vertical] .slider_track__LWAGS{left:25%;right:25%;top:0;bottom:0;flex-direction:column-reverse}.slider_host__QngDt[direction=horizontal-reverse] .slider_track__LWAGS,.slider_host__QngDt[direction=vertical-reverse] .slider_track__LWAGS{justify-content:flex-end}.slider_host__QngDt .slider_fill__2De\\+O{background-color:#ebebeb;width:100%;height:100%}.slider_host__QngDt .slider_thumbContainer__28Lbu{background-color:transparent;position:absolute;width:0;height:0}.slider_host__QngDt[direction=horizontal] .slider_thumbContainer__28Lbu{top:50%;right:0}.slider_host__QngDt[direction=horizontal-reverse] .slider_thumbContainer__28Lbu{top:50%;left:0}.slider_host__QngDt[direction=vertical] .slider_thumbContainer__28Lbu{left:50%;top:0}.slider_host__QngDt[direction=vertical-reverse] .slider_thumbContainer__28Lbu{left:50%;bottom:0}.slider_host__QngDt .slider_thumb__HCBio{align-items:center;border-radius:20px;height:20px;width:20px;position:absolute;transform-origin:center;translate:-50% -50%;border-width:1px;border-color:var(--mat-slider-color);background-color:#ebebeb}.slider_host__QngDt[orientation=horizontal] .slider_thumb__HCBio{flex-direction:column}.slider_host__QngDt[orientation=vertical] .slider_thumb__HCBio{flex-direction:row}.slider_host__QngDt:hover .slider_thumb__HCBio{background-color:#ebebeb}.slider_host__QngDt:focus .slider_thumb__HCBio{background-color:#fafafa}.slider_host__QngDt:active .slider_thumb__HCBio{background-color:#dbdbdb}", ""]);
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

/***/ 26:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".text_host__2bD3M .text_input__kdaVY{border:none;appearance:none;background-color:none;font-size:1em;flex:1 1 0;overflow:hidden;text-align:left;padding:0 12px}.text_host__2bD3M.text_filled__gaJ8r .text_input__kdaVY{border:none;margin:0}.text_passwordToggle__10unI{align-items:center;justify-content:center;cursor:pointer;overflow:hidden;flex:0 0 auto;padding:8px;position:absolute;right:12px;top:50%;translate:0 -50%;background-color:transparent;box-shadow:none}.text_passwordToggle__10unI icon{width:20px;height:20px;line-height:20px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "text_host__2bD3M",
	"input": "text_input__kdaVY",
	"filled": "text_filled__gaJ8r",
	"passwordToggle": "text_passwordToggle__10unI"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 780:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".toggle_label__L4aQK{flex-direction:row;align-items:center}.toggle_label__L4aQK:hover .toggle_toggle__1OFgA .toggle_ring__T7w-Z{scale:1}.toggle_toggle__1OFgA{appearance:none;overflow:visible;border-radius:4px;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);color:#000;border:2px #000;background-color:transparent;box-shadow:none;width:20px}.toggle_toggle__1OFgA .toggle_ring__T7w-Z{position:absolute;border-radius:50%;inset:-70%;background-color:rgba(0,0,0,.08);scale:0;transition:scale .16s;overflow:hidden}.toggle_selectAllToggle__Y0Yxx{margin-bottom:4px}.toggle_label__L4aQK.toggle_radio__5UgPC .toggle_toggle__1OFgA{border-radius:50%}.toggle_label__L4aQK.toggle_radio__5UgPC .toggle_toggle__1OFgA:checked:not(:indeterminate):after{background-image:url(res:ReactUnity/sprites/radio)}", ""]);
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

/***/ 138:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
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
var jsx_runtime = __webpack_require__(377);
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
var react = __webpack_require__(68);
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
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/accordion/index.module.scss
var index_module = __webpack_require__(245);
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
      }, void 0)]
    }), void 0), (0,jsx_runtime.jsx)("view", __assign({
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
      }), void 0)
    }), void 0)]
  }), void 0);
}

function _Summary(_a) {
  var className = _a.className,
      props = __rest(_a, ["className"]);

  return (0,jsx_runtime.jsx)("view", __assign({
    name: "<Accordion.Summary>",
    className: clsx_m(className, accordion_index_module.summary, 'mat-accordion-summary')
  }, props), void 0);
}

function _Content(_a) {
  var className = _a.className,
      props = __rest(_a, ["className"]);

  return (0,jsx_runtime.jsx)("view", __assign({
    name: "<Accordion.Content>",
    className: clsx_m(className, accordion_index_module.content, 'mat-accordion-content')
  }, props), void 0);
}

var Accordion = react.memo(_Accordion);
Accordion.Summary = _Summary;
Accordion.Content = _Content;
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/ripple/index.module.scss
var ripple_index_module = __webpack_require__(953);
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
}
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/button/index.module.scss
var button_index_module = __webpack_require__(288);
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
  }), void 0);
});

var Button = react.memo(_Button);
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
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/modal/index.module.scss
var modal_index_module = __webpack_require__(471);
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
        }, void 0)
      }), void 0)]
    }), void 0)
  }), void 0);
}
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/alert/index.module.scss
var alert_index_module = __webpack_require__(924);
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
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/card/index.module.scss
var card_index_module = __webpack_require__(876);
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
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/confirm/index.module.scss
var confirm_index_module = __webpack_require__(512);
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
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/input/index.module.scss
var input_index_module = __webpack_require__(69);
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
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/paper/index.module.scss
var paper_index_module = __webpack_require__(765);
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
  }), void 0);
}

var Paper = react.memo(_Paper);
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/text/index.module.scss
var text_index_module = __webpack_require__(26);
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
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/prompt/index.module.scss
var prompt_index_module = __webpack_require__(554);
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


// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/toggle/index.module.scss
var toggle_index_module = __webpack_require__(780);
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
;// CONCATENATED MODULE: ../../../material/dist/src/util/hooks/use-auto-ref.js

function useAutoRef(val) {
  var ref = (0,react.useRef)(val);
  ref.current = val;
  return ref;
}
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/select/index.module.scss
var select_index_module = __webpack_require__(131);
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
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/slider/index.module.scss
var slider_index_module = __webpack_require__(868);
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
// EXTERNAL MODULE: ../../../node_modules/react-reconciler/index.js
var react_reconciler = __webpack_require__(633);
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
  var ctx = react.createContext(undefined);
  if (displayName) ctx.displayName = displayName;

  var Provider = function GlobalsProvider(_a) {
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
      return dictionary_watcher_assign({}, dictionary);
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
        }), void 0), (0,jsx_runtime.jsx)("view", {
          children: ((_b = this.state.error) === null || _b === void 0 ? void 0 : _b.stack) || ''
        }, void 0)]
      }), void 0);
    }

    return this.props.children;
  };

  return ErrorBoundary;
}(react.Component);


;// CONCATENATED MODULE: ../../../renderer/dist/src/views/default-view.js



function DefaultView(_a) {
  var children = _a.children;
  return (0,jsx_runtime.jsx)(ErrorBoundary, {
    children: (0,jsx_runtime.jsx)(GlobalsProvider, {
      children: children
    }, void 0)
  }, void 0);
}
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
;// CONCATENATED MODULE: ../../../renderer/dist/src/renderer/renderer.js
var renderer_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





var LegacyRoot = 0;
var ConcurrentRoot = 1;
var hostContext = {};
var childContext = {};
var DiscreteEventPriority = 1;
var ContinuousEventPriority = 4;
var DefaultEventPriority = 16;
var eventPriorities = {
  discrete: DiscreteEventPriority,
  continuous: ContinuousEventPriority,
  "default": DefaultEventPriority
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
      rest = renderer_rest(props, ["children", "tag"]);

  if (textTypes[type]) {
    rest.children = !children || typeof children === 'boolean' ? null : Array.isArray(children) ? children.join('') : children + '';
  }

  if (typeof props.style === 'string') rest[styleStringSymbol] = props.style;
  return rest;
}

var hostConfig = {
  getRootHostContext: function getRootHostContext() {
    return hostContext;
  },
  getChildHostContext: function getChildHostContext() {
    return childContext;
  },
  getPublicInstance: function getPublicInstance(instance) {
    return instance;
  },
  now: Date.now,
  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  supportsMicrotasks: false,
  supportsTestSelectors: false,
  isPrimaryRenderer: true,
  warnsIfNotActing: true,
  prepareForCommit: function prepareForCommit() {
    return null;
  },
  resetAfterCommit: function resetAfterCommit() {},
  clearContainer: function clearContainer() {},
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
  resetTextContent: function resetTextContent() {
    return console.log('resetTextContent');
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
  hideInstance: function hideInstance() {},
  hideTextInstance: function hideTextInstance() {},
  unhideInstance: function unhideInstance() {},
  unhideTextInstance: function unhideTextInstance() {},
  detachDeletedInstance: function detachDeletedInstance() {},
  // -------------------
  //     Scheduling
  // -------------------
  getCurrentEventPriority: function getCurrentEventPriority() {
    return eventPriorities["default"];
  },
  noTimeout: -1,
  scheduleTimeout: function scheduleTimeout(callback, timeout) {
    return setTimeout(callback, timeout);
  },
  cancelTimeout: function cancelTimeout(handle) {
    return clearTimeout(handle);
  }
};
var reconciler = react_reconciler(hostConfig);
var containerMap = new Map();
var Renderer = {
  render: function render(element, options) {
    if (options === void 0) {
      options = {};
    }

    var hostContainer = (options === null || options === void 0 ? void 0 : options.hostContainer) || HostContainer;
    var hostRoot = containerMap.get(hostContainer);

    if (!hostRoot) {
      hostRoot = reconciler.createContainer(hostContainer, (options === null || options === void 0 ? void 0 : options.mode) === 'legacy' ? LegacyRoot : ConcurrentRoot, false, null);
      containerMap.set(hostContainer, hostRoot);
    }

    if (!(options === null || options === void 0 ? void 0 : options.disableHelpers)) element = (0,react.createElement)(DefaultView, null, element);
    reconciler.updateContainer(element, hostRoot, null);
  }
};
var batchedUpdates = reconciler.batchedUpdates;
var flushSync = reconciler.flushSync;
// EXTERNAL MODULE: ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!../../../material/dist/src/tooltip/index.module.scss
var tooltip_index_module = __webpack_require__(138);
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
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/timer.js
function cancelTimeout(timeoutID) {
  clearTimeout(timeoutID.id);
}
function requestTimeout(callback, delay) {
  return {
    id: setTimeout(callback, delay)
  };
}
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
};
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
});
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
};
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
});
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
});
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
});
;// CONCATENATED MODULE: ../../../material/dist/src/virtual-scroll/index.js




;// CONCATENATED MODULE: ../../../material/dist/src/index.js
















;// CONCATENATED MODULE: ../../../material/dist/index.js

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
  var isWatchable = obj && typeof obj === 'object' && 'Value' in obj;

  var _a = (0,react.useState)(isWatchable ? obj.Value : undefined),
      state = _a[0],
      setState = _a[1];

  (0,react.useEffect)(function () {
    if (!isWatchable) {
      setState(undefined);
      return;
    }

    setState(obj.Value);
    if ('AddListener' in obj) return obj.AddListener(function (val) {
      return setState(val);
    });
  }, [obj, isWatchable]);
  return state;
}
;// CONCATENATED MODULE: ../../../renderer/dist/index.js








;// CONCATENATED MODULE: ./src/app.tsx
var ReactUnity=renderer_dist_namespaceObject;var Material=dist_namespaceObject;var MaterialStyles=function MaterialStyles(){return __webpack_require__(793);};/*INJECTABLE_START*/
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