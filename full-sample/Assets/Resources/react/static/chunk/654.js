(this["webpackChunkreactunity_sample"] = this["webpackChunkreactunity_sample"] || []).push([[654],{

/***/ 654:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "App": () => (/* binding */ App),
  "RenderObject": () => (/* binding */ RenderObject)
});

;// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
;// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
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
;// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
;// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(359);
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/helpers/event-dictionary.js
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


function createEventDictionaryContext(dictionary, name) {
  var ctx = react.createContext(undefined);

  function Provider(_a) {
    var children = _a.children;

    var _b = react.useState(0),
        render = _b[0],
        setRender = _b[1];

    react.useEffect(function () {
      var remove = dictionary === null || dictionary === void 0 ? void 0 : dictionary.AddListener(function (key, value, dic) {
        setRender(function (x) {
          return x + 1;
        });
      });

      if (!remove) {
        if (name) console.warn(name + " dictionary does not provide a change listener");else console.warn('The dictionary does not provide a change listener');
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
  }

  function useContext() {
    var context = react.useContext(ctx);

    if (context === undefined) {
      if (name) throw new Error(name + ".useContext must be used within a " + name + ".Provider");else throw new Error('useContext must be used within a provider');
    }

    return context;
  }

  return __assign(__assign({}, ctx), {
    Provider: Provider,
    useContext: useContext
  });
}
var globalsContext = createEventDictionaryContext(Globals, 'globalsContext');
var useGlobals = globalsContext.useContext;
var GlobalsProvider = globalsContext.Provider;
// EXTERNAL MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/renderer.js + 1 modules
var renderer = __webpack_require__(612);
// EXTERNAL MODULE: ./src/assets/base64Image.txt
var base64Image = __webpack_require__(113);
// EXTERNAL MODULE: ./src/assets/bg.png
var bg = __webpack_require__(888);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/getTarget.js
var getTarget = __webpack_require__(695);
var getTarget_default = /*#__PURE__*/__webpack_require__.n(getTarget);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[1]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[6].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[3]!./src/showcase/index.module.scss
var index_module = __webpack_require__(810);
;// CONCATENATED MODULE: ./src/showcase/index.module.scss

      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = function(css, style){
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
      while (style.firstChild) {
        style.removeChild(style.firstChild);
      }

      style.appendChild(document.createTextNode(css));
    }
  };
options.setAttributes = function(style) {
        var nonce =
           true ? __webpack_require__.nc : 0;

        if (nonce) {
          style.setAttribute("nonce", nonce);
        }
      };
options.insert = function(style){
    var target = getTarget_default()("head");

    if (!target) {
      throw new Error(
        "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
      );
    }

    target.appendChild(style);
  };
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(index_module/* default */.Z, options);




       /* harmony default export */ const showcase_index_module = (index_module/* default */.Z && index_module/* default.locals */.Z.locals ? index_module/* default.locals */.Z.locals : undefined);

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(114);
;// CONCATENATED MODULE: ./src/showcase/index.tsx
var webImage='https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';var webVideo='https://media.w3.org/2010/05/sintel/trailer.mp4';function RenderObject(_ref){var object=_ref.object;return/*#__PURE__*/(0,jsx_runtime.jsx)("object",{width:300,height:400,style:{flexGrow:0},onDrag:function onDrag(ev){Globals.camera2root.transform.Rotate(new UnityEngine.Vector3(-ev.delta.y,ev.delta.x,0));},onScroll:function onScroll(ev){Globals.camera2.transform.Translate(0,0,Math.fround(ev.scrollDelta.y/10),UnityEngine.Space.Self);},onMount:function onMount(ev){return ev.gameObject.SetActive(true);},onUnmount:function onUnmount(ev){return ev.gameObject.SetActive(false);},camera:Globals.camera2,target:object});}function App(_ref2){var className=_ref2.className;var _useState=(0,react.useState)(),_useState2=_slicedToArray(_useState,2),videoRef=_useState2[0],setVideoRef=_useState2[1];var Globals=useGlobals();(0,react.useEffect)(function(){if(videoRef){videoRef.VideoPlayer.Pause();}},[videoRef]);var toggleVideo=function toggleVideo(){var vp=videoRef.VideoPlayer;if(vp.isPlaying)vp.Pause();else vp.Play();};return/*#__PURE__*/(0,jsx_runtime.jsx)("scroll",{children:/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:showcase_index_module.app,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h1",{children:"React Unity Showcase"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Button"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{className:showcase_index_module.clickButton,children:"Click"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Anchor"}),/*#__PURE__*/(0,jsx_runtime.jsx)("anchor",{url:"https://www.google.com",children:"Open Google"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Input"}),/*#__PURE__*/(0,jsx_runtime.jsx)("input",{})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Toggle"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("toggle",{}),"Toggle"]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Image"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:bg/* default */.Z}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:base64Image/* default */.Z}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:webImage})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Video"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("video",{style:{flexGrow:1},source:webVideo,ref:setVideoRef,onPointerClick:toggleVideo})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Render Texture"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("render",{width:900,height:400,style:{flexGrow:1},onDrag:function onDrag(ev){Globals.cameraRoot.transform.Rotate(new UnityEngine.Vector3(-ev.delta.y,ev.delta.x,0));},onScroll:function onScroll(ev){Globals.renderCamera.transform.Translate(0,0,Math.fround(ev.scrollDelta.y/10),UnityEngine.Space.Self);},onMount:function onMount(ev){return ev.gameObject.SetActive(true);},onUnmount:function onUnmount(ev){return ev.gameObject.SetActive(false);},camera:Globals.renderCamera})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Object"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(RenderObject,{object:Globals.cylinder}),/*#__PURE__*/(0,jsx_runtime.jsx)(RenderObject,{object:Globals.cube}),/*#__PURE__*/(0,jsx_runtime.jsx)(RenderObject,{object:Globals.capsule})]})]})]})});};renderer/* Renderer.render */.T.render(/*#__PURE__*/(0,jsx_runtime.jsx)(GlobalsProvider,{children:/*#__PURE__*/(0,jsx_runtime.jsx)(App,{})}));

/***/ }),

/***/ 810:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(489);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root>*{background-color:#fafafa}.showcase_app__1sIuX{padding:20px;max-width:960px;width:100%;align-self:center;align-items:stretch}.showcase_app__1sIuX h1{font-size:36px;font-style:smallcaps,bold;color:#582a9c;margin-bottom:12px}.showcase_app__1sIuX h2{font-size:30px;font-style:smallcaps;color:#fb2f8e;margin-bottom:8px}.showcase_app__1sIuX section{margin-top:10px;margin-bottom:10px}.showcase_app__1sIuX row{flex-direction:row;align-items:center}.showcase_app__1sIuX column{flex-direction:column;align-items:center;flex-grow:1;flex-shrink:0}.showcase_app__1sIuX slider{margin:10px}.showcase_app__1sIuX image{flex-grow:1;flex-shrink:1;flex-basis:0;object-fit:scale-down;object-position:50%;transition:object-position 2s;align-self:stretch}.showcase_app__1sIuX input{border-width:1px;border-color:#000}.showcase_app__1sIuX object{border-width:1px;border-radius:20px;border-color:#000;margin:5px;background-color:rgba(112,189,153,.745);object-fit:none}.showcase_app__1sIuX render,.showcase_app__1sIuX video{object-fit:scale-down;object-position:left}.showcase_app__1sIuX button:hover{audio:url(res:click)}.showcase_clickButton__3o8sE{appearance:none;background-color:#fff;box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);border-radius:4px;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.showcase_clickButton__3o8sE:hover{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12)}.showcase_clickButton__3o8sE:active{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12)}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"app": "showcase_app__1sIuX",
	"clickButton": "showcase_clickButton__3o8sE"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 113:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAcElEQVR4AezOsREAIAjFUAs3dgAGYkj8C3g2oBTJXfo3iD419dJ2eOn5EuM6LnsFynQkb4AKQP2zlBOLpAEBAgQIECBAgAA1Au29p6aDrlPBQd3UdJA7yIcUho4KA5UBBxDHk9GwzwdiGQY6gVEwCgC3bcAZ+oXojwAAAABJRU5ErkJggg==\n");

/***/ }),

/***/ 888:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/media/bg.png");

/***/ })

}]);