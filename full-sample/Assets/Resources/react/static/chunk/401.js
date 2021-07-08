(this["webpackChunkreactunity_sample"] = this["webpackChunkreactunity_sample"] || []).push([[401],{

/***/ 401:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "App": () => (/* binding */ App)
});

// EXTERNAL MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/renderer.js + 1 modules
var renderer = __webpack_require__(612);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(359);
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
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[1]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[6].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[3]!./src/uitoolkit/index.module.scss
var index_module = __webpack_require__(4);
;// CONCATENATED MODULE: ./src/uitoolkit/index.module.scss

      
      
      
      
      
      
      

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




       /* harmony default export */ const uitoolkit_index_module = (index_module/* default */.Z && index_module/* default.locals */.Z.locals ? index_module/* default.locals */.Z.locals : undefined);

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(114);
;// CONCATENATED MODULE: ./src/uitoolkit/index.tsx
var webImage='https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';function App(){return/*#__PURE__*/(0,jsx_runtime.jsx)("scroll",{children:/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:uitoolkit_index_module.app,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h1",{children:"React Unity Showcase"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Button"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{className:uitoolkit_index_module.clickButton,children:"Click"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Anchor"}),/*#__PURE__*/(0,jsx_runtime.jsx)("anchor",{url:"https://www.google.com",children:"Open Google"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Input"}),/*#__PURE__*/(0,jsx_runtime.jsx)("input",{})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Toggle"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("toggle",{}),"Toggle"]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Image"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:bg/* default */.Z}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:base64Image/* default */.Z}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:webImage})]})]})]})});};renderer/* Renderer.render */.T.render(/*#__PURE__*/(0,jsx_runtime.jsx)(App,{}));

/***/ }),

/***/ 4:
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
___CSS_LOADER_EXPORT___.push([module.id, ":root>*{background-color:#fafafa}.uitoolkit_app__3eBd0{padding:20px;max-width:960px;width:100%;align-self:center;align-items:stretch}.uitoolkit_app__3eBd0 h1{font-size:36px;font-style:smallcaps,bold;color:#582a9c;margin-bottom:12px}.uitoolkit_app__3eBd0 h2{font-size:30px;font-style:smallcaps;color:#fb2f8e;margin-bottom:8px}.uitoolkit_app__3eBd0 section{margin-top:10px;margin-bottom:10px}.uitoolkit_app__3eBd0 row{flex-direction:row;align-items:center}.uitoolkit_app__3eBd0 column{flex-direction:column;align-items:center;flex-grow:1;flex-shrink:0}.uitoolkit_app__3eBd0 image{flex-grow:1;flex-shrink:1;flex-basis:0;object-fit:scale-down;object-position:50%;transition:object-position 2s;align-self:stretch}.uitoolkit_app__3eBd0 input{border-width:1px;border-color:#000}.uitoolkit_app__3eBd0 button:hover{audio:url(res:click)}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"app": "uitoolkit_app__3eBd0"
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