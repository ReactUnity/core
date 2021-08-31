"use strict";
(this["webpackChunkreactunity_sample"] = this["webpackChunkreactunity_sample"] || []).push([[903],{

/***/ 215:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(411);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(531);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{font-size:24px;background-color:#fafafa}.showcase_app__17mEE{padding:20px;max-width:960px;width:100%;align-self:center;align-items:stretch}.showcase_app__17mEE anchor{align-self:flex-start}.showcase_app__17mEE h1{font-size:36px;font-style:smallcaps,bold;color:#582a9c;margin-bottom:12px;transition:border 1s;border-color:#ff0}.showcase_app__17mEE h1:hover{border:20px solid red}.showcase_app__17mEE h2{font-size:30px;font-style:smallcaps;color:#fb2f8e;margin-bottom:8px}.showcase_app__17mEE section{margin-top:10px;margin-bottom:10px}.showcase_app__17mEE row{flex-direction:row;align-items:center}.showcase_app__17mEE column{flex-direction:column;align-items:center;flex-grow:1;flex-shrink:0}.showcase_app__17mEE slider{margin:10px}.showcase_app__17mEE image{flex-grow:1;flex-shrink:1;flex-basis:0;object-fit:scale-down;object-position:50%;transition:object-position 2s;align-self:stretch}.showcase_app__17mEE object{border-width:1px;border-radius:20px;border-color:#000;margin:5px;background-color:rgba(112,189,153,.745);object-fit:none}.showcase_app__17mEE render,.showcase_app__17mEE video{object-fit:scale-down;object-position:left}pulsar{cursor:pointer;width:300px;height:300px;border-radius:50%;animation:showcase_pulsate__2Dk7X 6s linear infinite;box-shadow:0 0 20px #fff,-20px 0 80px #f0f,20px 0 80px aqua,inset 0 0 50px #fff,inset 50px 0 80px #f0f,inset -50px 0 80px aqua,inset 50px 0 300px #f0f,inset -50px 0 300px aqua}@keyframes showcase_pulsate__2Dk7X{50%{box-shadow:0 0 20px #fff,20px 0 80px #f0f,-20px 0 80px aqua,inset 0 0 50px #fff,inset -50px 0 80px #f0f,inset 50px 0 80px aqua,inset -50px 0 300px #f0f,inset 50px 0 300px aqua}}lorem{color:red;font:20px/40px}#showcase_my-button__2kHmu{box-shadow:0 0 4px 15px 3px -5px #000}", "",{"version":3,"sources":["webpack://./src/showcase/index.module.scss"],"names":[],"mappings":"AAEA,MACE,cAAA,CACA,wBAAA,CAGF,qBACE,YAAA,CACA,eAAA,CACA,UAAA,CACA,iBAAA,CACA,mBAAA,CAEA,4BACE,qBAAA,CAGF,wBACE,cAAA,CACA,yBAAA,CACA,aAAA,CACA,kBAAA,CACA,oBAAA,CACA,iBAAA,CAEA,8BACE,qBAAA,CAIJ,wBACE,cAAA,CACA,oBAAA,CACA,aAAA,CACA,iBAAA,CAGF,6BACE,eAAA,CACA,kBAAA,CAGF,yBACE,kBAAA,CACA,kBAAA,CAGF,4BACE,qBAAA,CACA,kBAAA,CACA,WAAA,CACA,aAAA,CAGF,4BACE,WAAA,CAGF,2BACE,WAAA,CACA,aAAA,CACA,YAAA,CACA,qBAAA,CACA,mBAAA,CACA,6BAAA,CACA,kBAAA,CAGF,4BACE,gBAAA,CACA,kBAAA,CACA,iBAAA,CACA,UAAA,CACA,uCAAA,CACA,eAAA,CAGF,uDAEE,qBAAA,CACA,oBAAA,CAIJ,OACE,cAAA,CACA,WAAA,CACA,YAAA,CACA,iBAAA,CACA,oDAAA,CACA,+KAAA,CAIF,mCACE,IACE,+KAAA,CAAA,CAKJ,MACE,SAAA,CACA,cAAA,CAGF,2BACE,qCAAA","sourcesContent":["@import \"~@reactunity/material/styles\";\n\n:root {\n  font-size: 24px;\n  background-color: #fafafa;\n}\n\n.app {\n  padding: 20px;\n  max-width: 960px;\n  width: 100%;\n  align-self: center;\n  align-items: stretch;\n\n  anchor {\n    align-self: flex-start;\n  }\n\n  h1 {\n    font-size: 36px;\n    font-style: smallcaps, bold;\n    color: #582a9c;\n    margin-bottom: 12px;\n    transition: border 1s;\n    border-color: yellow;\n\n    &:hover {\n      border: 20px solid red;\n    }\n  }\n\n  h2 {\n    font-size: 30px;\n    font-style: smallcaps;\n    color: #fb2f8e;\n    margin-bottom: 8px;\n  }\n\n  section {\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  row {\n    flex-direction: row;\n    align-items: center;\n  }\n\n  column {\n    flex-direction: column;\n    align-items: center;\n    flex-grow: 1;\n    flex-shrink: 0;\n  }\n\n  slider {\n    margin: 10px;\n  }\n\n  image {\n    flex-grow: 1;\n    flex-shrink: 1;\n    flex-basis: 0;\n    object-fit: scale-down;\n    object-position: 50%;\n    transition: object-position 2s;\n    align-self: stretch;\n  }\n\n  object {\n    border-width: 1px;\n    border-radius: 20px;\n    border-color: black;\n    margin: 5px;\n    background-color: hsla(152deg, 37%, 59%, 0.745);\n    object-fit: none;\n  }\n\n  render,\n  video {\n    object-fit: scale-down;\n    object-position: left;\n  }\n}\n\npulsar {\n  cursor: pointer;\n  width: 300px;\n  height: 300px;\n  border-radius: 50%;\n  animation: pulsate 6s linear infinite;\n  box-shadow: 0 0 20px #fff, -20px 0 80px #f0f, 20px 0 80px #0ff, inset 0 0 50px #fff, inset 50px 0 80px #f0f,\n    inset -50px 0 80px #0ff, inset 50px 0 300px #f0f, inset -50px 0 300px #0ff;\n}\n\n@keyframes pulsate {\n  50% {\n    box-shadow: 0 0 20px #fff, 20px 0 80px #f0f, -20px 0 80px #0ff, inset 0 0 50px #fff, inset -50px 0 80px #f0f,\n      inset 50px 0 80px #0ff, inset -50px 0 300px #f0f, inset 50px 0 300px #0ff;\n  }\n}\n\nlorem {\n  color: red;\n  font: 20px /40px;\n}\n\n#my-button {\n  box-shadow: 0 0 4px 15px 3px -5px black;\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"app": "showcase_app__17mEE",
	"pulsate": "showcase_pulsate__2Dk7X",
	"my-button": "showcase_my-button__2kHmu"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 312:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAcElEQVR4AezOsREAIAjFUAs3dgAGYkj8C3g2oBTJXfo3iD419dJ2eOn5EuM6LnsFynQkb4AKQP2zlBOLpAEBAgQIECBAgAA1Au29p6aDrlPBQd3UdJA7yIcUho4KA5UBBxDHk9GwzwdiGQY6gVEwCgC3bcAZ+oXojwAAAABJRU5ErkJggg==\n");

/***/ }),

/***/ 712:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/media/bg.png");

/***/ }),

/***/ 903:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "App": () => (/* binding */ App),
  "RenderObject": () => (/* binding */ RenderObject)
});

// EXTERNAL MODULE: ../../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 5 modules
var slicedToArray = __webpack_require__(149);
// EXTERNAL MODULE: ../../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js
var taggedTemplateLiteral = __webpack_require__(500);
;// CONCATENATED MODULE: ../../renderer/dist/src/helpers/styled-components-helper.js
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
// EXTERNAL MODULE: ../../renderer/dist/src/helpers/dictionary-watcher.js
var dictionary_watcher = __webpack_require__(913);
// EXTERNAL MODULE: ../../renderer/dist/src/renderer/renderer.js + 3 modules
var renderer = __webpack_require__(550);
// EXTERNAL MODULE: ../../node_modules/react/index.js
var react = __webpack_require__(842);
// EXTERNAL MODULE: ./src/assets/base64Image.txt
var base64Image = __webpack_require__(312);
// EXTERNAL MODULE: ./src/assets/bg.png
var bg = __webpack_require__(712);
// EXTERNAL MODULE: ../../node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(455);
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
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[3]!./src/showcase/index.module.scss
var index_module = __webpack_require__(215);
;// CONCATENATED MODULE: ./src/showcase/index.module.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(index_module/* default */.Z, options);




       /* harmony default export */ const showcase_index_module = (index_module/* default */.Z && index_module/* default.locals */.Z.locals ? index_module/* default.locals */.Z.locals : undefined);

// EXTERNAL MODULE: ../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(139);
;// CONCATENATED MODULE: ./src/showcase/index.tsx
var _templateObject;var webImage='https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';var webVideo='https://media.w3.org/2010/05/sintel/trailer.mp4';var SuperInput=styled_components_browser_esm/* default.input */.ZP.input(_templateObject||(_templateObject=(0,taggedTemplateLiteral/* default */.Z)(["\n  appearance: none;\n  background-color: white;\n  box-shadow: 1px 1px 6px -2px black;\n  border-width: 0;\n  border-radius: 4px;\n  transition: background-color 280ms ease-in-out;\n\n  &:hover {\n    background-color: limegreen;\n  }\n"])));var RenderObject=/*#__PURE__*/react.memo(function RenderObject(_ref){var object=_ref.object;return/*#__PURE__*/(0,jsx_runtime.jsx)("object",{width:300,height:400,style:{flexGrow:0},onDrag:function onDrag(ev){Globals.camera2root.transform.Rotate(new Interop.UnityEngine.Vector3(-ev.delta.y,ev.delta.x,0));},onScroll:function onScroll(ev){Globals.camera2.transform.Translate(0,0,Math.fround(ev.scrollDelta.y/10),Interop.UnityEngine.Space.Self);},onMount:function onMount(ev){return ev.gameObject.SetActive(true);},onUnmount:function onUnmount(ev){return ev.gameObject.SetActive(false);},camera:Globals.camera2,target:object});});function App(){var _useState=(0,react.useState)(),_useState2=(0,slicedToArray/* default */.Z)(_useState,2),videoRef=_useState2[0],setVideoRef=_useState2[1];var Globals=dictionary_watcher/* globalsWatcher.useContext */.Qc.useContext();(0,react.useEffect)(function(){if(videoRef){videoRef.VideoPlayer.Pause();}},[videoRef]);var toggleVideo=function toggleVideo(){var vp=videoRef.VideoPlayer;if(vp.isPlaying)vp.Pause();else vp.Play();};return/*#__PURE__*/(0,jsx_runtime.jsx)("scroll",{children:/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:showcase_index_module.app,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h1",{children:"React Unity Showcase"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Input"}),/*#__PURE__*/(0,jsx_runtime.jsx)(SuperInput,{})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Toggle"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("toggle",{}),"Toggle"]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Image"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:bg/* default */.Z}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:base64Image/* default */.Z}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:webImage})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Prefab"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("prefab",{target:Globals.customPrefab})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Video"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("video",{style:{flexGrow:1},source:webVideo,ref:setVideoRef,onPointerClick:toggleVideo})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Render Texture"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("render",{width:900,height:400,style:{flexGrow:1},onDrag:function onDrag(ev){Globals.cameraRoot.transform.Rotate(new Interop.UnityEngine.Vector3(-ev.delta.y,ev.delta.x,0));},onScroll:function onScroll(ev){Globals.renderCamera.transform.Translate(0,0,Math.fround(ev.scrollDelta.y/10),Interop.UnityEngine.Space.Self);},onMount:function onMount(ev){return ev.gameObject.SetActive(true);},onUnmount:function onUnmount(ev){return ev.gameObject.SetActive(false);},camera:Globals.renderCamera})})]})]})});};var sheet=new styled_components_browser_esm/* ServerStyleSheet */.qH();renderer/* Renderer.render */.T.render(/*#__PURE__*/(0,jsx_runtime.jsx)(styled_components_browser_esm/* StyleSheetManager */.LC,{disableVendorPrefixes:true,sheet:sheet.instance,children:/*#__PURE__*/(0,jsx_runtime.jsx)(App,{})}));insertStyledComponentsSheet(sheet);

/***/ }),

/***/ 913:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Qc": () => (/* binding */ globalsWatcher),
/* harmony export */   "Ut": () => (/* binding */ GlobalsProvider)
/* harmony export */ });
/* unused harmony exports createDictionaryWatcher, useGlobals */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(842);
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
  var ctx = react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
  if (displayName) ctx.displayName = displayName;

  var Provider = function Provider(_a) {
    var children = _a.children;

    var _b = react__WEBPACK_IMPORTED_MODULE_0__.useState(0),
        render = _b[0],
        setRender = _b[1];

    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
      var remove = dictionary === null || dictionary === void 0 ? void 0 : dictionary.AddListener(function (key, value, dic) {
        setRender(function (x) {
          return x + 1;
        });
      });

      if (!remove) {
        if (displayName) console.warn(displayName + " dictionary does not provide a change listener");else console.warn('The dictionary does not provide a change listener');
      }

      return function () {
        return remove === null || remove === void 0 ? void 0 : remove();
      };
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    var value = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
      return __assign({}, dictionary);
    }, [render]);
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ctx.Provider, {
      value: value
    }, children);
  };

  function useContext() {
    var context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ctx);

    if (context === undefined) {
      if (displayName) throw new Error(displayName + ".useContext must be used within a " + displayName + ".Provider");else throw new Error('useContext must be used within a provider');
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

/***/ }),

/***/ 550:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "T": () => (/* binding */ Renderer)
});

// EXTERNAL MODULE: ../../node_modules/react/index.js
var react = __webpack_require__(842);
// EXTERNAL MODULE: ../../node_modules/react-reconciler/index.js
var react_reconciler = __webpack_require__(182);
// EXTERNAL MODULE: ../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(139);
// EXTERNAL MODULE: ../../renderer/dist/src/helpers/dictionary-watcher.js
var dictionary_watcher = __webpack_require__(913);
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




var ErrorBoundary = function (_super) {
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
      return (0,jsx_runtime.jsxs)("view", __assign({
        style: {
          color: 'crimson',
          padding: 20
        }
      }, {
        children: [(0,jsx_runtime.jsx)("view", __assign({
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
    children: (0,jsx_runtime.jsx)(dictionary_watcher/* GlobalsProvider */.Ut, {
      children: children
    }, void 0)
  }, void 0);
}
;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/diffing.js
function diffProperties(lastRawProps, nextRawProps, deepDiffing) {
  if (deepDiffing === void 0) {
    deepDiffing = 0;
  }

  if (lastRawProps === nextRawProps) return null;
  var updatePayload = null;
  var lastProps = lastRawProps;
  var nextProps = nextRawProps;
  var propKey;

  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
      continue;
    }

    var prop = null;
    var depth = deepDiffing > 0 ? deepDiffing : propKey === 'style' ? 1 : 0;

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
    var depth = deepDiffing > 0 ? deepDiffing : propKey === 'style' ? 1 : 0;

    if (depth > 0) {
      prop = diffProperties(lastProp, nextProp, depth - 1);
      if (!prop) continue;
    }

    (updatePayload = updatePayload || []).push(propKey, prop);
  }

  return updatePayload;
}
;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/renderer.js




var hostContext = {};
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
      if (depth > 0) applyDiffedUpdate(writeTo[attr], value, depth - 1);else writeTo.SetWithoutNotify(attr, value);
    }

    return updatePayload.length > 0;
  } else {
    for (var attr in updatePayload) {
      if (updatePayload.hasOwnProperty(attr)) {
        var value = updatePayload[attr];
        writeTo.SetWithoutNotify(attr, value);
      }
    }

    return true;
  }
}

function applyUpdate(instance, updatePayload, isAfterMount, type, pre) {
  if (pre === void 0) {
    pre = true;
  }

  var updateAfterMount = false;

  for (var index = 0; index < updatePayload.length; index += 2) {
    var attr = updatePayload[index];
    var value = updatePayload[index + 1];
    var isEvent = attr.substring(0, 2) === 'on'; // Register events before other properties

    if (pre !== isEvent) continue;

    if (isEvent) {
      UnityBridge.setEventListener(instance, attr, value);
      continue;
    }

    if (attr === 'children') {
      if (type === 'text' || type === 'icon' || type === 'style') {
        UnityBridge.setText(instance, value ? Array.isArray(value) && value.join ? value.join('') : value + '' : '');
      }

      continue;
    }

    if (attr === 'key') continue;
    if (attr === 'ref') continue;
    if (attr === 'tag') continue;

    if (!isAfterMount && attr === 'style') {
      updateAfterMount = true;
      continue;
    }

    if (attr === 'style') {
      if (applyDiffedUpdate(instance.Style, value)) {
        instance.ResolveStyle();
      }

      continue;
    }

    if (attr.substring(0, 5) === 'data-') {
      UnityBridge.setData(instance, attr.substring(5), value);
    } else {
      UnityBridge.setProperty(instance, attr, value);
    }
  }

  if (pre) return applyUpdate(instance, updatePayload, isAfterMount, type, false) || updateAfterMount;
  return updateAfterMount;
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
    var _a;

    if (type === 'text' || type === 'icon' || type === 'style') {
      var text = props.children === true ? '' : Array.isArray(props.children) ? props.children.join('') : ((_a = props.children) === null || _a === void 0 ? void 0 : _a.toString()) || '';
      return UnityBridge.createElement(type, text, rootContainerInstance);
    }

    return UnityBridge.createElement(props.tag || type, null, rootContainerInstance);
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return UnityBridge.createText(text, rootContainerInstance);
  },
  appendInitialChild: function appendInitialChild(parent, child) {
    UnityBridge.appendChild(parent, child);
  },
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
    applyUpdate(instance, props, true);
  },
  shouldSetTextContent: function shouldSetTextContent(type, props) {
    return type === 'text' || type === 'icon' || type === 'style';
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
    applyUpdate(instance, updatePayload, true, type);
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
    return UnityScheduler.setTimeout(callback, (options === null || options === void 0 ? void 0 : options.timeout) || 0);
  },
  cancelDeferredCallback: function cancelDeferredCallback(callBackID) {
    UnityScheduler.clearTimeout(callBackID);
  },
  noTimeout: -1,
  scheduleTimeout: function scheduleTimeout(callback, timeout) {
    return UnityScheduler.setTimeout(callback, timeout);
  },
  cancelTimeout: function cancelTimeout(handle) {
    UnityScheduler.clearTimeout(handle);
  },
  queueMicrotask: function queueMicrotask(callback) {
    return UnityScheduler.setTimeout(callback, 0);
  }
};
var ReactUnityReconciler = react_reconciler(hostConfig);
var Renderer = {
  render: function render(element, hostContainer, renderWithoutHelpers) {
    if (!hostContainer) hostContainer = HostContainer;
    var hostRoot = ReactUnityReconciler.createContainer(hostContainer, 0, false, {});
    if (!renderWithoutHelpers) element = (0,react.createElement)(DefaultView, null, element);
    return ReactUnityReconciler.updateContainer(element, hostRoot, null);
  }
};

/***/ })

}]);
//# sourceMappingURL=903.js.map