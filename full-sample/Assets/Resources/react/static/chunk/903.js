"use strict";
(this["webpackChunkreactunity_sample"] = this["webpackChunkreactunity_sample"] || []).push([[903],{

/***/ 4215:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5411);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2531);
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

/***/ 7312:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAcElEQVR4AezOsREAIAjFUAs3dgAGYkj8C3g2oBTJXfo3iD419dJ2eOn5EuM6LnsFynQkb4AKQP2zlBOLpAEBAgQIECBAgAA1Au29p6aDrlPBQd3UdJA7yIcUho4KA5UBBxDHk9GwzwdiGQY6gVEwCgC3bcAZ+oXojwAAAABJRU5ErkJggg==\n");

/***/ }),

/***/ 6712:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/media/bg.png");

/***/ }),

/***/ 1903:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "App": () => (/* binding */ App),
  "RenderObject": () => (/* binding */ RenderObject)
});

// EXTERNAL MODULE: ../../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 5 modules
var slicedToArray = __webpack_require__(9149);
// EXTERNAL MODULE: ../../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js
var taggedTemplateLiteral = __webpack_require__(9500);
// EXTERNAL MODULE: ../../material/dist/src/accordion/index.js + 1 modules
var accordion = __webpack_require__(8587);
// EXTERNAL MODULE: ../../material/dist/src/alert/index.js + 1 modules
var src_alert = __webpack_require__(4453);
// EXTERNAL MODULE: ../../material/dist/src/button/index.js + 1 modules
var src_button = __webpack_require__(1520);
// EXTERNAL MODULE: ../../material/dist/src/card/index.js + 1 modules
var card = __webpack_require__(7268);
// EXTERNAL MODULE: ../../material/dist/src/paper/index.js + 1 modules
var paper = __webpack_require__(8728);
// EXTERNAL MODULE: ../../material/dist/src/slider/index.js + 1 modules
var slider = __webpack_require__(1758);
// EXTERNAL MODULE: ../../material/dist/src/styles/index.js + 1 modules
var styles = __webpack_require__(7122);
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
var dictionary_watcher = __webpack_require__(7913);
// EXTERNAL MODULE: ../../renderer/dist/src/renderer/renderer.js + 3 modules
var renderer = __webpack_require__(2550);
// EXTERNAL MODULE: ../../node_modules/react/index.js
var react = __webpack_require__(8842);
// EXTERNAL MODULE: ./src/assets/base64Image.txt
var base64Image = __webpack_require__(7312);
// EXTERNAL MODULE: ./src/assets/bg.png
var bg = __webpack_require__(6712);
// EXTERNAL MODULE: ../../node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(2455);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(6062);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(4036);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(6793);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(7892);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(1173);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(2464);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[1]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[6].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[3]!./src/showcase/index.module.scss
var index_module = __webpack_require__(4215);
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
var jsx_runtime = __webpack_require__(5139);
;// CONCATENATED MODULE: ./src/showcase/index.tsx
var _templateObject;var webImage='https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';var webVideo='https://media.w3.org/2010/05/sintel/trailer.mp4';var SuperInput=styled_components_browser_esm/* default.input */.ZP.input(_templateObject||(_templateObject=(0,taggedTemplateLiteral/* default */.Z)(["\n  appearance: none;\n  background-color: white;\n  box-shadow: 1px 1px 6px -2px black;\n  border-width: 0;\n  border-radius: 4px;\n  transition: background-color 280ms ease-in-out;\n\n  &:hover {\n    background-color: limegreen;\n  }\n"])));var RenderObject=/*#__PURE__*/react.memo(function RenderObject(_ref){var object=_ref.object;return/*#__PURE__*/(0,jsx_runtime.jsx)("object",{width:300,height:400,style:{flexGrow:0},onDrag:function onDrag(ev){Globals.camera2root.transform.Rotate(new Interop.UnityEngine.Vector3(-ev.delta.y,ev.delta.x,0));},onScroll:function onScroll(ev){Globals.camera2.transform.Translate(0,0,Math.fround(ev.scrollDelta.y/10),Interop.UnityEngine.Space.Self);},onMount:function onMount(ev){return ev.gameObject.SetActive(true);},onUnmount:function onUnmount(ev){return ev.gameObject.SetActive(false);},camera:Globals.camera2,target:object});});function App(){var _useState=(0,react.useState)(),_useState2=(0,slicedToArray/* default */.Z)(_useState,2),videoRef=_useState2[0],setVideoRef=_useState2[1];var Globals=dictionary_watcher/* globalsWatcher.useContext */.Qc.useContext();var _useState3=(0,react.useState)(false),_useState4=(0,slicedToArray/* default */.Z)(_useState3,2),dlOpen=_useState4[0],setDlOpen=_useState4[1];(0,react.useEffect)(function(){if(videoRef){videoRef.VideoPlayer.Pause();}},[videoRef]);var toggleVideo=function toggleVideo(){var vp=videoRef.VideoPlayer;if(vp.isPlaying)vp.Pause();else vp.Play();};return/*#__PURE__*/(0,jsx_runtime.jsx)("scroll",{children:/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:showcase_index_module.app,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h1",{children:"React Unity Showcase"}),/*#__PURE__*/(0,jsx_runtime.jsxs)(paper/* Paper */.X,{elevation:2,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Button"}),/*#__PURE__*/(0,jsx_runtime.jsx)("lorem",{children:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque autem vero illum repudiandae praesentium ad mollitia fugiat molestiae consectetur ratione? Soluta dolorem nobis numquam! Aut quas dicta error expedita et?"})]}),/*#__PURE__*/(0,jsx_runtime.jsx)(src_button/* Button */.z,{elevation:5,onClick:function onClick(){return setDlOpen(true);},id:"my-button",children:/*#__PURE__*/(0,jsx_runtime.jsx)("text",{id:"my-text",children:"Open Dialog"})}),/*#__PURE__*/(0,jsx_runtime.jsx)(src_alert/* AlertDialog */.a,{open:dlOpen,onClose:function onClose(){return setDlOpen(false);},backdropClose:true,text:'Some alert'}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Anchor"}),/*#__PURE__*/(0,jsx_runtime.jsx)(card/* Card */.Z,{children:/*#__PURE__*/(0,jsx_runtime.jsx)(card/* Card.Content */.Z.Content,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("anchor",{url:"https://www.google.com",children:"Open Google"})})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Accordion"}),/*#__PURE__*/(0,jsx_runtime.jsxs)(accordion/* Accordion */.U,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(accordion/* Accordion.Summary */.U.Summary,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("view",{children:"Some stuff is happening"})}),/*#__PURE__*/(0,jsx_runtime.jsx)(accordion/* Accordion.Content */.U.Content,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("anchor",{url:"https://www.google.com",children:"Open Google"})})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Input"}),/*#__PURE__*/(0,jsx_runtime.jsx)(SuperInput,{})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Toggle"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("toggle",{}),"Toggle"]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Image"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:bg/* default */.Z}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:base64Image/* default */.Z}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{source:webImage})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Prefab"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("prefab",{target:Globals.customPrefab})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Video"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("video",{style:{flexGrow:1},source:webVideo,ref:setVideoRef,onPointerClick:toggleVideo})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Render Texture"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("render",{width:900,height:400,style:{flexGrow:1},onDrag:function onDrag(ev){Globals.cameraRoot.transform.Rotate(new Interop.UnityEngine.Vector3(-ev.delta.y,ev.delta.x,0));},onScroll:function onScroll(ev){Globals.renderCamera.transform.Translate(0,0,Math.fround(ev.scrollDelta.y/10),Interop.UnityEngine.Space.Self);},onMount:function onMount(ev){return ev.gameObject.SetActive(true);},onUnmount:function onUnmount(ev){return ev.gameObject.SetActive(false);},camera:Globals.renderCamera})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Slider"}),/*#__PURE__*/(0,jsx_runtime.jsx)(slider/* Slider */.i,{direction:"horizontal",mode:"normal",max:100,step:20,children:function children(val){return val*val;}}),/*#__PURE__*/(0,jsx_runtime.jsx)(slider/* Slider */.i,{direction:"horizontal",mode:"diff",max:100,step:20,children:function children(val){return val*val;}}),/*#__PURE__*/(0,jsx_runtime.jsx)(slider/* Slider */.i,{direction:"horizontal-reverse",mode:"normal",max:100,step:20,children:"asdf"}),/*#__PURE__*/(0,jsx_runtime.jsx)(slider/* Slider */.i,{direction:"horizontal-reverse",mode:"diff",max:100,step:20,children:"asdf"})]})]})});};var sheet=new styled_components_browser_esm/* ServerStyleSheet */.qH();renderer/* Renderer.render */.T.render(/*#__PURE__*/(0,jsx_runtime.jsx)(styled_components_browser_esm/* StyleSheetManager */.LC,{disableVendorPrefixes:true,sheet:sheet.instance,children:/*#__PURE__*/(0,jsx_runtime.jsx)(dictionary_watcher/* GlobalsProvider */.Ut,{children:/*#__PURE__*/(0,jsx_runtime.jsx)(App,{})})}));insertStyledComponentsSheet(sheet);

/***/ })

}]);
//# sourceMappingURL=903.js.map