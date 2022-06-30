"use strict";
(self["webpackChunkreactunity_sample"] = self["webpackChunkreactunity_sample"] || []).push([["src_pages_style-frameworks_tailwind_index_tsx"],{

/***/ "./src/pages/style-frameworks/tailwind/index.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "TailwindPage": () => (/* binding */ TailwindPage),
  "default": () => (/* binding */ pages_style_frameworks_tailwind)
});

// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__("../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__("../../node_modules/style-loader/dist/runtime/insertBySelector.js");
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__("../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__("../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__("../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[4].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[4].use[2]!./src/pages/style-frameworks/tailwind/index.css
var tailwind = __webpack_require__("../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[4].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[4].use[2]!./src/pages/style-frameworks/tailwind/index.css");
;// CONCATENATED MODULE: ./src/pages/style-frameworks/tailwind/index.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(tailwind/* default */.Z, options);




       /* harmony default export */ const style_frameworks_tailwind = (tailwind/* default */.Z && tailwind/* default.locals */.Z.locals ? tailwind/* default.locals */.Z.locals : undefined);

// EXTERNAL MODULE: ../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("../../node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ./src/pages/style-frameworks/tailwind/index.tsx
function TailwindPage(){return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:'tailwind-root flex-row',children:[/*#__PURE__*/(0,jsx_runtime.jsx)("button",{className:'bg-blue-400 text-primary-dark hover:bg-red-400 p-3 m-3 transition-colors hover:translate-y-1',children:"Tailwind Button"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{className:'bg-yellow-500 text-primary hover:bg-green-400 shadow-md p-3 m-3 transition-colors',children:"Second Button"})]});}/* harmony default export */ const pages_style_frameworks_tailwind = (TailwindPage);

/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[4].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[4].use[2]!./src/pages/style-frameworks/tailwind/index.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* @tailwind base; */\n.m-3 {\n    margin: 0.75rem\n}\n.transform {\n    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}\n.flex-row {\n    flex-direction: row\n}\n.border {\n    border-width: 1px\n}\n.bg-blue-400 {\n    --tw-bg-opacity: 1;\n    background-color: rgb(96 165 250 / var(--tw-bg-opacity))\n}\n.bg-yellow-500 {\n    --tw-bg-opacity: 1;\n    background-color: rgb(234 179 8 / var(--tw-bg-opacity))\n}\n.p-3 {\n    padding: 0.75rem\n}\n.uppercase {\n    text-transform: uppercase\n}\n.italic {\n    font-style: italic\n}\n.shadow-md {\n    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}\n.transition-colors {\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transition-duration: 150ms\n}\n.hover\\:translate-y-1:hover {\n    --tw-translate-y: 0.25rem;\n    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}\n.hover\\:bg-red-400:hover {\n    --tw-bg-opacity: 1;\n    background-color: rgb(248 113 113 / var(--tw-bg-opacity))\n}\n.hover\\:bg-green-400:hover {\n    --tw-bg-opacity: 1;\n    background-color: rgb(74 222 128 / var(--tw-bg-opacity))\n}\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })

}]);