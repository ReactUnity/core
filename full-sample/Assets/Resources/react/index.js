/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 452:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

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
// EXTERNAL MODULE: ./node_modules/react-reconciler/index.js
var react_reconciler = __webpack_require__(377);
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/diffing.js
var deepDiffProps = {
  style: 1,
  layout: 1
};
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
    var depth = deepDiffing > 0 ? deepDiffing : deepDiffProps[propKey] || 0;

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
    var depth = deepDiffing > 0 ? deepDiffing : deepDiffProps[propKey] || 0;

    if (depth > 0) {
      prop = diffProperties(lastProp, nextProp, depth - 1);
      if (!prop) continue;
    }

    (updatePayload = updatePayload || []).push(propKey, prop);
  }

  return updatePayload;
}
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/renderer.js


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
      if (depth > 0) applyDiffedUpdate(writeTo[attr], value, depth - 1);else writeTo[attr] = value;
    }

    return updatePayload.length > 0;
  } else {
    for (var attr in updatePayload) {
      if (Object.prototype.hasOwnProperty.call(updatePayload, attr)) {
        var value = updatePayload[attr];
        writeTo[attr] = value;
      }
    }

    return true;
  }
}

function applyUpdate(instance, updatePayload, isAfterMount) {
  var updateAfterMount = false;

  for (var index = 0; index < updatePayload.length; index += 2) {
    var attr = updatePayload[index];
    var value = updatePayload[index + 1];
    if (attr === 'children') continue;
    if (attr === 'key') continue;
    if (attr === 'ref') continue;
    if (attr === 'tag') continue;

    if (!isAfterMount && attr === 'style') {
      updateAfterMount = true;
      continue;
    }

    if (attr === 'style') {
      if (applyDiffedUpdate(instance.Inline, value)) {
        // TODO: find better way to determine if this element needs layout/style recalculation
        instance.ResolveStyle();
        instance.ScheduleLayout();
        instance.ApplyLayoutStyles();
      }

      continue;
    }

    if (typeof attr !== 'string') {
      throw new Error('Component attributes must be string.');
    }

    if (attr.substring(0, 5) === 'data-') {
      Unity.setData(instance, attr.substring(5), value);
    } else if (attr.substring(0, 2) === 'on') {
      Unity.setEventListener(instance, attr, value);
    } else {
      Unity.setProperty(instance, attr, value);
    }
  }

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

    if (type === 'text') {
      var text = props.children === true ? '' : Array.isArray(props.children) ? props.children.join('') : ((_a = props.children) === null || _a === void 0 ? void 0 : _a.toString()) || '';
      return Unity.createElement(type, text, rootContainerInstance);
    }

    return Unity.createElement(props.tag || type, null, rootContainerInstance);
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return Unity.createText(text, rootContainerInstance);
  },
  appendInitialChild: function appendInitialChild(parent, child) {
    Unity.appendChild(parent, child);
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
    return type === 'text';
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
    applyUpdate(instance, updatePayload, true);
  },
  resetTextContent: function resetTextContent(instance) {
    console.log('resetTextContent');
  },
  commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
    Unity.setText(textInstance, newText);
  },
  appendChild: function appendChild(parent, child) {
    return Unity.appendChild(parent, child);
  },
  appendChildToContainer: function appendChildToContainer(parent, child) {
    return Unity.appendChildToContainer(parent, child);
  },
  insertBefore: function insertBefore(parent, child, beforeChild) {
    return Unity.insertBefore(parent, child, beforeChild);
  },
  insertInContainerBefore: function insertInContainerBefore(parent, child, beforeChild) {
    return Unity.insertBefore(parent, child, beforeChild);
  },
  removeChild: function removeChild(parent, child) {
    return Unity.removeChild(parent, child);
  },
  removeChildFromContainer: function removeChildFromContainer(parent, child) {
    return Unity.removeChild(parent, child);
  },
  // Required for Suspense
  // TODO: implement
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
  setTimeout: function setTimeout(callback, timeout) {
    return UnityScheduler.setTimeout(callback, timeout);
  },
  clearTimeout: function clearTimeout(handle) {
    UnityScheduler.clearTimeout(handle);
  }
};
var ReactUnityReconciler = react_reconciler(hostConfig);
var hostRoot;
var renderer_Renderer = {
  render: function render(element, hostContainer, callback) {
    if (!hostContainer) hostContainer = RootContainer;

    if (!hostRoot) {
      hostRoot = ReactUnityReconciler.createContainer(hostContainer, false, false);
    }

    return ReactUnityReconciler.updateContainer(element, hostRoot, null, callback);
  }
};
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/animation/easing.js
// https://gist.github.com/gre/1650294
var easing = {
  // no easing, no acceleration
  linear: function linear(t) {
    return t;
  },
  // accelerating from zero velocity
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },
  // decelerating to zero velocity
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function easeInOutQuad(t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },
  // decelerating to zero velocity
  easeOutCubic: function easeOutCubic(t) {
    return --t * t * t + 1;
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function easeInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function easeInOutQuart(t) {
    return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  // accelerating from zero velocity
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function easeInOutQuint(t) {
    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(461);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(201);
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/components/dropdown/dropdown-item.js
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
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();



var DropdownItem =
/** @class */
function (_super) {
  __extends(DropdownItem, _super);

  function DropdownItem(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    return _this;
  }

  DropdownItem.prototype.render = function () {
    return this.props.children;
  };

  return DropdownItem;
}(react.Component);


;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/components/components.js
var ImageFitMode;

(function (ImageFitMode) {
  ImageFitMode[ImageFitMode["Center"] = 0] = "Center";
  ImageFitMode[ImageFitMode["CenterCrop"] = 1] = "CenterCrop";
  ImageFitMode[ImageFitMode["CenterInside"] = 2] = "CenterInside";
  ImageFitMode[ImageFitMode["FitCenter"] = 3] = "FitCenter";
  ImageFitMode[ImageFitMode["FitStart"] = 4] = "FitStart";
  ImageFitMode[ImageFitMode["FitEnd"] = 5] = "FitEnd";
  ImageFitMode[ImageFitMode["Fill"] = 6] = "Fill";
})(ImageFitMode || (ImageFitMode = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/components/events.js
var InputButton;

(function (InputButton) {
  InputButton[InputButton["Left"] = 0] = "Left";
  InputButton[InputButton["Right"] = 1] = "Right";
  InputButton[InputButton["Middle"] = 2] = "Middle";
})(InputButton || (InputButton = {}));

var FramePressState;

(function (FramePressState) {
  FramePressState[FramePressState["Pressed"] = 0] = "Pressed";
  FramePressState[FramePressState["Released"] = 1] = "Released";
  FramePressState[FramePressState["PressedAndReleased"] = 2] = "PressedAndReleased";
  FramePressState[FramePressState["NotChanged"] = 3] = "NotChanged";
})(FramePressState || (FramePressState = {}));

var MoveDirection;

(function (MoveDirection) {
  MoveDirection[MoveDirection["Left"] = 0] = "Left";
  MoveDirection[MoveDirection["Up"] = 1] = "Up";
  MoveDirection[MoveDirection["Right"] = 2] = "Right";
  MoveDirection[MoveDirection["Down"] = 3] = "Down";
  MoveDirection[MoveDirection["None"] = 4] = "None";
})(MoveDirection || (MoveDirection = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/components/input.js
var TouchScreenKeyboardType;

(function (TouchScreenKeyboardType) {
  TouchScreenKeyboardType[TouchScreenKeyboardType["Default"] = 0] = "Default";
  TouchScreenKeyboardType[TouchScreenKeyboardType["ASCIICapable"] = 1] = "ASCIICapable";
  TouchScreenKeyboardType[TouchScreenKeyboardType["NumbersAndPunctuation"] = 2] = "NumbersAndPunctuation";
  TouchScreenKeyboardType[TouchScreenKeyboardType["URL"] = 3] = "URL";
  TouchScreenKeyboardType[TouchScreenKeyboardType["NumberPad"] = 4] = "NumberPad";
  TouchScreenKeyboardType[TouchScreenKeyboardType["PhonePad"] = 5] = "PhonePad";
  TouchScreenKeyboardType[TouchScreenKeyboardType["NamePhonePad"] = 6] = "NamePhonePad";
  TouchScreenKeyboardType[TouchScreenKeyboardType["EmailAddress"] = 7] = "EmailAddress";
  TouchScreenKeyboardType[TouchScreenKeyboardType["NintendoNetworkAccount"] = 8] = "NintendoNetworkAccount";
  TouchScreenKeyboardType[TouchScreenKeyboardType["Social"] = 9] = "Social";
  TouchScreenKeyboardType[TouchScreenKeyboardType["Search"] = 10] = "Search";
  TouchScreenKeyboardType[TouchScreenKeyboardType["DecimalPad"] = 11] = "DecimalPad";
})(TouchScreenKeyboardType || (TouchScreenKeyboardType = {}));

var ContentType;

(function (ContentType) {
  ContentType[ContentType["Standard"] = 0] = "Standard";
  ContentType[ContentType["Autocorrected"] = 1] = "Autocorrected";
  ContentType[ContentType["IntegerNumber"] = 2] = "IntegerNumber";
  ContentType[ContentType["DecimalNumber"] = 3] = "DecimalNumber";
  ContentType[ContentType["Alphanumeric"] = 4] = "Alphanumeric";
  ContentType[ContentType["Name"] = 5] = "Name";
  ContentType[ContentType["EmailAddress"] = 6] = "EmailAddress";
  ContentType[ContentType["Password"] = 7] = "Password";
  ContentType[ContentType["Pin"] = 8] = "Pin";
  ContentType[ContentType["Custom"] = 9] = "Custom";
})(ContentType || (ContentType = {}));

var CharacterValidation;

(function (CharacterValidation) {
  CharacterValidation[CharacterValidation["None"] = 0] = "None";
  CharacterValidation[CharacterValidation["Digit"] = 1] = "Digit";
  CharacterValidation[CharacterValidation["Integer"] = 2] = "Integer";
  CharacterValidation[CharacterValidation["Decimal"] = 3] = "Decimal";
  CharacterValidation[CharacterValidation["Alphanumeric"] = 4] = "Alphanumeric";
  CharacterValidation[CharacterValidation["Name"] = 5] = "Name";
  CharacterValidation[CharacterValidation["Regex"] = 6] = "Regex";
  CharacterValidation[CharacterValidation["EmailAddress"] = 7] = "EmailAddress";
  CharacterValidation[CharacterValidation["CustomValidator"] = 8] = "CustomValidator";
})(CharacterValidation || (CharacterValidation = {}));

var LineType;

(function (LineType) {
  LineType[LineType["SingleLine"] = 0] = "SingleLine";
  LineType[LineType["MultiLineSubmit"] = 1] = "MultiLineSubmit";
  LineType[LineType["MultiLineNewline"] = 2] = "MultiLineNewline";
})(LineType || (LineType = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/components/styles-enums.js
var FontWeight;

(function (FontWeight) {
  FontWeight[FontWeight["Thin"] = 100] = "Thin";
  FontWeight[FontWeight["ExtraLight"] = 200] = "ExtraLight";
  FontWeight[FontWeight["Light"] = 300] = "Light";
  FontWeight[FontWeight["Regular"] = 400] = "Regular";
  FontWeight[FontWeight["Medium"] = 500] = "Medium";
  FontWeight[FontWeight["SemiBold"] = 600] = "SemiBold";
  FontWeight[FontWeight["Bold"] = 700] = "Bold";
  FontWeight[FontWeight["Heavy"] = 800] = "Heavy";
  FontWeight[FontWeight["Black"] = 900] = "Black";
})(FontWeight || (FontWeight = {}));

var FontStyles;

(function (FontStyles) {
  FontStyles[FontStyles["Normal"] = 0] = "Normal";
  FontStyles[FontStyles["Bold"] = 1] = "Bold";
  FontStyles[FontStyles["Italic"] = 2] = "Italic";
  FontStyles[FontStyles["Underline"] = 4] = "Underline";
  FontStyles[FontStyles["LowerCase"] = 8] = "LowerCase";
  FontStyles[FontStyles["UpperCase"] = 16] = "UpperCase";
  FontStyles[FontStyles["SmallCaps"] = 32] = "SmallCaps";
  FontStyles[FontStyles["Strikethrough"] = 64] = "Strikethrough";
  FontStyles[FontStyles["Superscript"] = 128] = "Superscript";
  FontStyles[FontStyles["Subscript"] = 256] = "Subscript";
  FontStyles[FontStyles["Highlight"] = 512] = "Highlight";
})(FontStyles || (FontStyles = {}));

var TextOverflowModes;

(function (TextOverflowModes) {
  TextOverflowModes["Overflow"] = "overflow";
  TextOverflowModes["Ellipsis"] = "ellipsis";
  TextOverflowModes["Masking"] = "masking";
  TextOverflowModes["Truncate"] = "truncate";
  TextOverflowModes["ScrollRect"] = "scroll-rect";
  TextOverflowModes["Page"] = "page";
  TextOverflowModes["Linked"] = "linked";
})(TextOverflowModes || (TextOverflowModes = {}));

var PointerEvents;

(function (PointerEvents) {
  PointerEvents["Auto"] = "auto";
  PointerEvents["Visible"] = "visible";
  PointerEvents["All"] = "all";
  PointerEvents["None"] = "none";
})(PointerEvents || (PointerEvents = {}));

var Visibility;

(function (Visibility) {
  Visibility["Visible"] = "visible";
  Visibility["Hidden"] = "hidden";
})(Visibility || (Visibility = {}));

var Appearance;

(function (Appearance) {
  Appearance["None"] = "none";
  Appearance["Button"] = "button";
  Appearance["Input"] = "input";
  Appearance["Toggle"] = "toggle";
})(Appearance || (Appearance = {}));

var NavigationMode;

(function (NavigationMode) {
  NavigationMode["None"] = "none";
  NavigationMode["Horizontal"] = "horizontal";
  NavigationMode["Vertical"] = "vertical";
  NavigationMode["Automatic"] = "automatic";
  NavigationMode["Explicit"] = "explicit";
})(NavigationMode || (NavigationMode = {}));

var WhiteSpace;

(function (WhiteSpace) {
  WhiteSpace["Normal"] = "normal";
  WhiteSpace["NoWrap"] = "nowrap";
})(WhiteSpace || (WhiteSpace = {}));

var CursorType;

(function (CursorType) {
  CursorType["Auto"] = "auto";
  CursorType["Default"] = "default";
  CursorType["None"] = "none";
  CursorType["ContextMenu"] = "context-menu";
  CursorType["Help"] = "help";
  CursorType["Pointer"] = "pointer";
  CursorType["Progress"] = "progress";
  CursorType["Wait"] = "wait";
  CursorType["Cell"] = "cell";
  CursorType["Crosshair"] = "crosshair";
  CursorType["Text"] = "text";
  CursorType["VerticalText"] = "vertical-text";
  CursorType["Alias"] = "alias";
  CursorType["Copy"] = "copy";
  CursorType["Move"] = "move";
  CursorType["NoDrop"] = "no-drop";
  CursorType["NotAllowed"] = "not-allowed";
  CursorType["EResize"] = "e-resize";
  CursorType["NResize"] = "n-resize";
  CursorType["NeResize"] = "ne-resize";
  CursorType["NwResize"] = "nw-resize";
  CursorType["SResize"] = "s-resize";
  CursorType["SeResize"] = "se-resize";
  CursorType["SwResize"] = "sw-resize";
  CursorType["WResize"] = "w-resize";
  CursorType["EwResize"] = "ew-resize";
  CursorType["NsResize"] = "ns-resize";
  CursorType["NeswResize"] = "nesw-resize";
  CursorType["NwseResize"] = "nwse-resize";
  CursorType["ColResize"] = "col-resize";
  CursorType["RowResize"] = "row-resize";
  CursorType["AllScroll"] = "all-scroll";
  CursorType["ZoomIn"] = "zoom-in";
  CursorType["ZoomOut"] = "zoom-out";
  CursorType["Grab"] = "grab";
  CursorType["Grabbing"] = "grabbing";
})(CursorType || (CursorType = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/components/yoga-enums.js
var FlexDirection;

(function (FlexDirection) {
  FlexDirection[FlexDirection["Column"] = 0] = "Column";
  FlexDirection[FlexDirection["ColumnReverse"] = 1] = "ColumnReverse";
  FlexDirection[FlexDirection["Row"] = 2] = "Row";
  FlexDirection[FlexDirection["RowReverse"] = 3] = "RowReverse";
})(FlexDirection || (FlexDirection = {}));

var YogaAlign;

(function (YogaAlign) {
  YogaAlign[YogaAlign["Auto"] = 0] = "Auto";
  YogaAlign[YogaAlign["FlexStart"] = 1] = "FlexStart";
  YogaAlign[YogaAlign["Center"] = 2] = "Center";
  YogaAlign[YogaAlign["FlexEnd"] = 3] = "FlexEnd";
  YogaAlign[YogaAlign["Stretch"] = 4] = "Stretch";
  YogaAlign[YogaAlign["Baseline"] = 5] = "Baseline";
  YogaAlign[YogaAlign["SpaceBetween"] = 6] = "SpaceBetween";
  YogaAlign[YogaAlign["SpaceAround"] = 7] = "SpaceAround";
})(YogaAlign || (YogaAlign = {}));

var YogaJustify;

(function (YogaJustify) {
  YogaJustify["FlexStart"] = "flex-start";
  YogaJustify["Center"] = "center";
  YogaJustify["FlexEnd"] = "flex-end";
  YogaJustify["SpaceBetween"] = "space-between";
  YogaJustify["SpaceAround"] = "space-around";
})(YogaJustify || (YogaJustify = {}));

var Display;

(function (Display) {
  Display["Flex"] = "flex";
  Display["None"] = "none";
})(Display || (Display = {}));

var Wrap;

(function (Wrap) {
  Wrap["NoWrap"] = "no-wrap";
  Wrap["Wrap"] = "wrap";
  Wrap["WrapReverse"] = "wrap-reverse";
})(Wrap || (Wrap = {}));

var Position;

(function (Position) {
  Position["Relative"] = "relative";
  Position["Absolute"] = "absolute";
})(Position || (Position = {}));

var Overflow;

(function (Overflow) {
  Overflow["Visible"] = "visible";
  Overflow["Hidden"] = "hidden";
  Overflow["Scroll"] = "scroll";
})(Overflow || (Overflow = {}));

var Direction;

(function (Direction) {
  Direction["Inherit"] = "inherit";
  Direction["LTR"] = "ltr";
  Direction["RTL"] = "rtl";
})(Direction || (Direction = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/components/index.js







;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/helpers/common-layouts.js

var transparentColor = 'clear';
var fullScreen = {
  position: Position.Absolute,
  top: -5000,
  right: -5000,
  bottom: -5000,
  left: -5000
};
var fullCover = {
  position: Position.Absolute,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var dropdownBottom = {
  position: Position.Absolute,
  top: '100%',
  left: 0,
  minWidth: '100%'
};
var dropdownTop = {
  position: Position.Absolute,
  bottom: '100%',
  left: 0,
  minWidth: '100%'
};
var bottomEdge = {
  position: Position.Absolute,
  left: 0,
  right: 0,
  bottom: 0,
  height: 0
};
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/components/dropdown/dropdown.js
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






var dropdownMenuStyle = {
  boxShadow: '0 3 7 6 black 5'
};
var dropdownButtonStyle = {
  backgroundColor: 'white',
  borderRadius: 0
};
var dropdownBackdropStyle = {
  backgroundColor: transparentColor,
  cursor: CursorType.Default
};
function Dropdown(_a) {
  var _b;

  var _c = _a.autoClose,
      autoClose = _c === void 0 ? true : _c,
      onChange = _a.onChange,
      name = _a.name,
      style = _a.style,
      children = _a.children,
      otherProps = __rest(_a, ["autoClose", "onChange", "name", "style", "children"]);

  var childrenArray = react.Children.toArray(children);
  var nonItems = childrenArray.filter(function (x) {
    return (x === null || x === void 0 ? void 0 : x.type) !== DropdownItem;
  });
  var items = childrenArray.filter(function (x) {
    return (x === null || x === void 0 ? void 0 : x.type) === DropdownItem;
  });

  var _d = react.useState(false),
      opened = _d[0],
      setOpened = _d[1];

  var _e = react.useState(-1),
      selectedIndex = _e[0],
      setSelectedIndex = _e[1];

  var selectedItem = items[selectedIndex];

  var toggle = function toggle() {
    return setOpened(function (st) {
      return !st;
    });
  };

  var close = function close() {
    return setOpened(false);
  };

  var handleChildClick = function handleChildClick(ind, value) {
    onChange === null || onChange === void 0 ? void 0 : onChange(value, ind);
    if (autoClose) close();
    setSelectedIndex(ind);
  };

  return (0,jsx_runtime.jsx)("view", __assign({
    name: name || '<Dropdown>'
  }, {
    children: (0,jsx_runtime.jsxs)("button", __assign({
      name: "<Dropdown Trigger>",
      onClick: toggle,
      style: __assign({
        flexDirection: 'Column',
        alignItems: 'Stretch'
      }, style)
    }, otherProps, {
      children: [selectedIndex < 0 ? nonItems : ((_b = selectedItem.props) === null || _b === void 0 ? void 0 : _b.triggerTemplate) || selectedItem, opened && (0,jsx_runtime.jsxs)("view", __assign({
        style: __assign({
          zIndex: 1000
        }, bottomEdge)
      }, {
        children: [(0,jsx_runtime.jsx)("button", {
          name: "<Dropdown Backdrop>",
          onClick: close,
          style: __assign(__assign({}, dropdownBackdropStyle), fullScreen)
        }, void 0), (0,jsx_runtime.jsx)("view", __assign({
          name: "<Dropdown Menu>",
          style: __assign(__assign({}, dropdownMenuStyle), dropdownBottom)
        }, {
          children: items.map(function (x, i) {
            return (0,jsx_runtime.jsx)("button", __assign({
              style: dropdownButtonStyle,
              onClick: function onClick() {
                return handleChildClick(i, x.props.value);
              }
            }, {
              children: x
            }), i);
          })
        }), void 0)]
      }), void 0)]
    }), void 0)
  }), void 0);
}
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/components/dropdown/index.js


;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/components/slider/index.js
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



function Slider(_a) {
  var _b;

  var _c;

  var onChange = _a.onChange,
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
      otherProps = slider_rest(_a, ["onChange", "name", "children", "initialValue", "value", "direction", "mode", "min", "max", "step", "keyStep"]);

  var _k = (0,react.useState)((_c = initialValue !== null && initialValue !== void 0 ? initialValue : value) !== null && _c !== void 0 ? _c : min),
      curValue = _k[0],
      setCurValue = _k[1];

  var _l = (0,react.useState)(curValue),
      innerValue = _l[0],
      setInnerValue = _l[1];

  var orientation = direction === 'vertical' || direction === 'vertical-reverse' ? 'vertical' : 'horizontal';
  var isReverse = direction === 'vertical-reverse' || direction === 'horizontal-reverse';
  var sizeProp = orientation === 'horizontal' ? 'width' : 'height';
  var coordProp = orientation === 'horizontal' ? 'x' : 'y';
  var crossCoordProp = orientation === 'horizontal' ? 'y' : 'x';
  var range = max - min;
  var ref = (0,react.useRef)();
  var moveStep = keyStep || step || range / 10;
  var setValWithStep = (0,react.useCallback)(function (val) {
    val = Math.max(min, Math.min(max, val));
    setInnerValue(val);
    if (step > 0) val = Math.round(val / step) * step;
    setCurValue(val);
  }, [min, max, step, setCurValue, setInnerValue]);
  var dragCallback = (0,react.useCallback)(function (ev) {
    var mul = isReverse ? -1 : 1;
    var val = innerValue;

    if (mode === 'diff' || mode === 'falloff') {
      var diff = ev.delta[coordProp] / 200 * range;

      if (mode === 'falloff') {
        var yDiff = Math.max(Math.abs(ev.pressPosition[crossCoordProp] - ev.position[crossCoordProp]) / 100, 1);
        val += mul * diff / (yDiff * yDiff);
      } else val += mul * diff;
    } else {
      var relPos = ref.current.GetRelativePosition(ev.position.x, ev.position.y);
      var relRatio = relPos[coordProp] / ref.current.GameObject.transform.rect[sizeProp];
      if (isReverse) relRatio = -relRatio;
      val = (relRatio + 0.5) * range + min;
    }

    setValWithStep(val);
  }, [innerValue, setValWithStep, mode, coordProp, crossCoordProp, sizeProp, isReverse, range, min]);
  var moveCallback = (0,react.useCallback)(function (ev) {
    var diff = ev.moveVector[coordProp] * moveStep;
    if (isReverse) diff = -diff;
    setValWithStep(curValue + diff);
  }, [coordProp, moveStep, isReverse, curValue, setValWithStep]);
  (0,react.useEffect)(function () {
    if (typeof value == 'number') setCurValue(value);
  }, [setCurValue, value]);
  (0,react.useEffect)(function () {
    if (onChange) onChange(curValue);
  }, [onChange, curValue]);
  var ratio = (curValue - min) / range;
  return (0,jsx_runtime.jsx)("view", slider_assign({
    tag: "slider",
    name: name || '<Slider>'
  }, otherProps, {
    ref: ref,
    "data-direction": direction,
    "data-orientation": orientation,
    onDrag: dragCallback,
    onPointerClick: dragCallback,
    onPotentialDrag: dragCallback,
    onMove: moveCallback
  }, {
    children: (0,jsx_runtime.jsx)("view", slider_assign({
      name: "_track"
    }, {
      children: (0,jsx_runtime.jsx)("view", slider_assign({
        name: "_fill",
        style: (_b = {}, _b[sizeProp] = ratio * 100 + '%', _b)
      }, {
        children: (0,jsx_runtime.jsx)("view", slider_assign({
          name: "_thumbContainer"
        }, {
          children: (0,jsx_runtime.jsx)("view", slider_assign({
            name: "_thumb"
          }, {
            children: typeof children === 'function' ? children(curValue) : children
          }), void 0)
        }), void 0)
      }), void 0)
    }), void 0)
  }), void 0);
}
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/components/radio/radio.js
var radio_extends = undefined && undefined.__extends || function () {
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
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var radio_assign = undefined && undefined.__assign || function () {
  radio_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return radio_assign.apply(this, arguments);
};

var radio_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};




var Radio =
/** @class */
function (_super) {
  radio_extends(Radio, _super);

  function Radio() {
    return _super !== null && _super.apply(this, arguments) || this;
  } // static contextType: React.ContextType<RadioContext>;


  Radio.prototype.render = function () {
    var _this = this;

    var _a = this.context.radioGroup,
        selectedValue = _a.selectedValue,
        onChange = _a.onChange;
    var optional = {};

    if (selectedValue !== undefined) {
      optional.checked = this.props.value === selectedValue;
    }

    if (typeof onChange === 'function') {
      optional.onChange = onChange.bind(null, this.props.value);
    }

    return (0,jsx_runtime.jsx)("button", {
      name: "[Radio]",
      onClick: function onClick() {
        return optional.onChange(_this.props.value);
      }
    }, void 0);
  };

  return Radio;
}(react.Component);



var RadioGroup =
/** @class */
function (_super) {
  radio_extends(RadioGroup, _super);

  function RadioGroup() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  RadioGroup.prototype.getChildContext = function () {
    var _a = this.props,
        selectedValue = _a.selectedValue,
        onChange = _a.onChange;
    return {
      radioGroup: {
        selectedValue: selectedValue,
        onChange: onChange
      }
    };
  };

  RadioGroup.prototype.render = function () {
    var _a = this.props,
        name = _a.name,
        selectedValue = _a.selectedValue,
        onChange = _a.onChange,
        children = _a.children,
        rest = radio_rest(_a, ["name", "selectedValue", "onChange", "children"]);

    return (0,jsx_runtime.jsx)("view", radio_assign({
      name: name || '<RadioGroup>'
    }, rest, {
      children: children
    }), void 0);
  };

  return RadioGroup;
}(react.Component);


;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/components/tooltip/tooltip.js
var tooltip_extends = undefined && undefined.__extends || function () {
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
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var tooltip_assign = undefined && undefined.__assign || function () {
  tooltip_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return tooltip_assign.apply(this, arguments);
};

var tooltip_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





var Tooltip =
/** @class */
function (_super) {
  tooltip_extends(Tooltip, _super);

  function Tooltip(props) {
    var _this = _super.call(this, props) || this;

    _this.toggle = function () {
      return _this.setState(function (st) {
        return {
          opened: !st.opened
        };
      });
    };

    _this.open = function () {
      return _this.setState({
        opened: true
      });
    };

    _this.close = function () {
      return _this.setState({
        opened: false
      });
    };

    _this.state = {
      opened: false
    };
    return _this;
  }

  Tooltip.prototype.render = function () {
    var _a, _b;

    var _c = this.props,
        tooltipContent = _c.tooltipContent,
        position = _c.position,
        offset = _c.offset,
        otherProps = tooltip_rest(_c, ["tooltipContent", "position", "offset"]);

    var containerProp = Tooltip.containerPositionProp[position];
    var childProp = Tooltip.childPositionProp[position];
    return (0,jsx_runtime.jsxs)("view", tooltip_assign({}, otherProps, {
      onPointerEnter: this.open,
      onPointerExit: this.close
    }, {
      children: [this.props.children, this.state.opened && tooltipContent && (0,jsx_runtime.jsx)("view", tooltip_assign({
        style: (_a = {
          position: Position.Absolute
        }, _a[containerProp] = Tooltip.yogaZeroPercent, _a)
      }, {
        children: (0,jsx_runtime.jsx)("view", tooltip_assign({
          name: "<Tooltip>",
          style: (_b = {
            position: Position.Absolute,
            zIndex: 1003
          }, _b[childProp] = offset, _b)
        }, {
          children: tooltipContent
        }), void 0)
      }), void 0)]
    }), void 0);
  };

  Tooltip.defaultProps = {
    position: 'bottom',
    offset: 10
  };
  Tooltip.containerPositionProp = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right'
  };
  Tooltip.childPositionProp = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };
  Tooltip.yogaZeroPercent = 0;
  return Tooltip;
}(react.Component);


;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/tester/test-view.js
var test_view_assign = undefined && undefined.__assign || function () {
  test_view_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return test_view_assign.apply(this, arguments);
};



var test_view_TestView = react.forwardRef(function (props, ref) {
  return (0,jsx_runtime.jsx)("view", test_view_assign({
    ref: ref
  }, {
    children: props.children
  }), void 0);
});
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/tester/tester.js
var tester_assign = undefined && undefined.__assign || function () {
  tester_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return tester_assign.apply(this, arguments);
};





function testRender(element) {
  return new Promise(function (resolve) {
    var ref = React.createRef();
    Renderer.render(_jsx(TestView, tester_assign({
      ref: ref
    }, {
      children: element
    }), void 0), null, function () {
      resolve(ref.current);
    });
  });
}
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/generated/unity.js
//
// Types in assemblies: UnityEngine.CoreModule, UnityEngine.VideoModule, UnityEngine.AudioModule, UnityEngine.UIModule, UnityEngine.UI, UnityEngine.TextRenderingModule, UnityEngine.InputLegacyModule, UnityEngine.AnimationModule, UnityEngine.IMGUIModule
// Generated 7.02.2021 17:05:39
//
var unity_Unity;

(function (Unity) {
  var Collections;

  (function (Collections) {
    var Allocator;

    (function (Allocator) {
      Allocator[Allocator["Invalid"] = 0] = "Invalid";
      Allocator[Allocator["None"] = 1] = "None";
      Allocator[Allocator["Temp"] = 2] = "Temp";
      Allocator[Allocator["TempJob"] = 3] = "TempJob";
      Allocator[Allocator["Persistent"] = 4] = "Persistent";
      Allocator[Allocator["AudioKernel"] = 5] = "AudioKernel";
    })(Allocator = Collections.Allocator || (Collections.Allocator = {}));

    var NativeLeakDetectionMode;

    (function (NativeLeakDetectionMode) {
      NativeLeakDetectionMode[NativeLeakDetectionMode["EnabledWithStackTrace"] = 3] = "EnabledWithStackTrace";
      NativeLeakDetectionMode[NativeLeakDetectionMode["Enabled"] = 2] = "Enabled";
      NativeLeakDetectionMode[NativeLeakDetectionMode["Disabled"] = 1] = "Disabled";
    })(NativeLeakDetectionMode = Collections.NativeLeakDetectionMode || (Collections.NativeLeakDetectionMode = {}));

    var NativeArrayOptions;

    (function (NativeArrayOptions) {
      NativeArrayOptions[NativeArrayOptions["UninitializedMemory"] = 0] = "UninitializedMemory";
      NativeArrayOptions[NativeArrayOptions["ClearMemory"] = 1] = "ClearMemory";
    })(NativeArrayOptions = Collections.NativeArrayOptions || (Collections.NativeArrayOptions = {}));

    var LowLevel;

    (function (LowLevel) {
      var Unsafe;

      (function (Unsafe) {
        var EnforceJobResult;

        (function (EnforceJobResult) {
          EnforceJobResult[EnforceJobResult["AllJobsAlreadySynced"] = 0] = "AllJobsAlreadySynced";
          EnforceJobResult[EnforceJobResult["DidSyncRunningJobs"] = 1] = "DidSyncRunningJobs";
          EnforceJobResult[EnforceJobResult["HandleWasAlreadyDeallocated"] = 2] = "HandleWasAlreadyDeallocated";
        })(EnforceJobResult = Unsafe.EnforceJobResult || (Unsafe.EnforceJobResult = {}));

        var AtomicSafetyErrorType;

        (function (AtomicSafetyErrorType) {
          AtomicSafetyErrorType[AtomicSafetyErrorType["Deallocated"] = 0] = "Deallocated";
          AtomicSafetyErrorType[AtomicSafetyErrorType["DeallocatedFromJob"] = 1] = "DeallocatedFromJob";
          AtomicSafetyErrorType[AtomicSafetyErrorType["NotAllocatedFromJob"] = 2] = "NotAllocatedFromJob";
        })(AtomicSafetyErrorType = Unsafe.AtomicSafetyErrorType || (Unsafe.AtomicSafetyErrorType = {}));
      })(Unsafe = LowLevel.Unsafe || (LowLevel.Unsafe = {}));
    })(LowLevel = Collections.LowLevel || (Collections.LowLevel = {}));
  })(Collections = Unity.Collections || (Unity.Collections = {}));

  var IO;

  (function (IO) {
    var LowLevel;

    (function (LowLevel) {
      var Unsafe;

      (function (Unsafe) {
        var AssetLoadingSubsystem;

        (function (AssetLoadingSubsystem) {
          AssetLoadingSubsystem[AssetLoadingSubsystem["Other"] = 0] = "Other";
          AssetLoadingSubsystem[AssetLoadingSubsystem["Texture"] = 1] = "Texture";
          AssetLoadingSubsystem[AssetLoadingSubsystem["VirtualTexture"] = 2] = "VirtualTexture";
          AssetLoadingSubsystem[AssetLoadingSubsystem["Mesh"] = 3] = "Mesh";
          AssetLoadingSubsystem[AssetLoadingSubsystem["Audio"] = 4] = "Audio";
          AssetLoadingSubsystem[AssetLoadingSubsystem["Scripts"] = 5] = "Scripts";
          AssetLoadingSubsystem[AssetLoadingSubsystem["EntitiesScene"] = 6] = "EntitiesScene";
          AssetLoadingSubsystem[AssetLoadingSubsystem["EntitiesStreamBinaryReader"] = 7] = "EntitiesStreamBinaryReader";
        })(AssetLoadingSubsystem = Unsafe.AssetLoadingSubsystem || (Unsafe.AssetLoadingSubsystem = {}));

        var ReadStatus;

        (function (ReadStatus) {
          ReadStatus[ReadStatus["Complete"] = 0] = "Complete";
          ReadStatus[ReadStatus["InProgress"] = 1] = "InProgress";
          ReadStatus[ReadStatus["Failed"] = 2] = "Failed";
        })(ReadStatus = Unsafe.ReadStatus || (Unsafe.ReadStatus = {}));

        var Priority;

        (function (Priority) {
          Priority[Priority["PriorityLow"] = 0] = "PriorityLow";
          Priority[Priority["PriorityHigh"] = 1] = "PriorityHigh";
        })(Priority = Unsafe.Priority || (Unsafe.Priority = {}));

        var ProcessingState;

        (function (ProcessingState) {
          ProcessingState[ProcessingState["Unknown"] = 0] = "Unknown";
          ProcessingState[ProcessingState["InQueue"] = 1] = "InQueue";
          ProcessingState[ProcessingState["Reading"] = 2] = "Reading";
          ProcessingState[ProcessingState["Completed"] = 3] = "Completed";
          ProcessingState[ProcessingState["Failed"] = 4] = "Failed";
          ProcessingState[ProcessingState["Canceled"] = 5] = "Canceled";
        })(ProcessingState = Unsafe.ProcessingState || (Unsafe.ProcessingState = {}));

        var FileReadType;

        (function (FileReadType) {
          FileReadType[FileReadType["Sync"] = 0] = "Sync";
          FileReadType[FileReadType["Async"] = 1] = "Async";
        })(FileReadType = Unsafe.FileReadType || (Unsafe.FileReadType = {}));

        var AsyncReadManagerMetrics_Flags;

        (function (AsyncReadManagerMetrics_Flags) {
          AsyncReadManagerMetrics_Flags[AsyncReadManagerMetrics_Flags["None"] = 0] = "None";
          AsyncReadManagerMetrics_Flags[AsyncReadManagerMetrics_Flags["ClearOnRead"] = 1] = "ClearOnRead";
        })(AsyncReadManagerMetrics_Flags = Unsafe.AsyncReadManagerMetrics_Flags || (Unsafe.AsyncReadManagerMetrics_Flags = {}));
      })(Unsafe = LowLevel.Unsafe || (LowLevel.Unsafe = {}));
    })(LowLevel = IO.LowLevel || (IO.LowLevel = {}));
  })(IO = Unity.IO || (Unity.IO = {}));

  var Jobs;

  (function (Jobs) {
    var LowLevel;

    (function (LowLevel) {
      var Unsafe;

      (function (Unsafe) {
        var ScheduleMode;

        (function (ScheduleMode) {
          ScheduleMode[ScheduleMode["Run"] = 0] = "Run";
          ScheduleMode[ScheduleMode["Batched"] = 1] = "Batched";
          ScheduleMode[ScheduleMode["Parallel"] = 1] = "Parallel";
          ScheduleMode[ScheduleMode["Single"] = 2] = "Single";
        })(ScheduleMode = Unsafe.ScheduleMode || (Unsafe.ScheduleMode = {}));

        var JobType;

        (function (JobType) {
          JobType[JobType["Single"] = 0] = "Single";
          JobType[JobType["ParallelFor"] = 1] = "ParallelFor";
        })(JobType = Unsafe.JobType || (Unsafe.JobType = {}));
      })(Unsafe = LowLevel.Unsafe || (LowLevel.Unsafe = {}));
    })(LowLevel = Jobs.LowLevel || (Jobs.LowLevel = {}));
  })(Jobs = Unity.Jobs || (Unity.Jobs = {}));

  var Profiling;

  (function (Profiling) {
    var ProfilerCategoryFlags;

    (function (ProfilerCategoryFlags) {
      ProfilerCategoryFlags[ProfilerCategoryFlags["None"] = 0] = "None";
      ProfilerCategoryFlags[ProfilerCategoryFlags["Builtin"] = 1] = "Builtin";
    })(ProfilerCategoryFlags = Profiling.ProfilerCategoryFlags || (Profiling.ProfilerCategoryFlags = {}));

    var ProfilerFlowEventType;

    (function (ProfilerFlowEventType) {
      ProfilerFlowEventType[ProfilerFlowEventType["Begin"] = 0] = "Begin";
      ProfilerFlowEventType[ProfilerFlowEventType["ParallelNext"] = 1] = "ParallelNext";
      ProfilerFlowEventType[ProfilerFlowEventType["End"] = 2] = "End";
      ProfilerFlowEventType[ProfilerFlowEventType["Next"] = 3] = "Next";
    })(ProfilerFlowEventType = Profiling.ProfilerFlowEventType || (Profiling.ProfilerFlowEventType = {}));

    var ProfilerMarkerDataUnit;

    (function (ProfilerMarkerDataUnit) {
      ProfilerMarkerDataUnit[ProfilerMarkerDataUnit["Undefined"] = 0] = "Undefined";
      ProfilerMarkerDataUnit[ProfilerMarkerDataUnit["TimeNanoseconds"] = 1] = "TimeNanoseconds";
      ProfilerMarkerDataUnit[ProfilerMarkerDataUnit["Bytes"] = 2] = "Bytes";
      ProfilerMarkerDataUnit[ProfilerMarkerDataUnit["Count"] = 3] = "Count";
      ProfilerMarkerDataUnit[ProfilerMarkerDataUnit["Percent"] = 4] = "Percent";
      ProfilerMarkerDataUnit[ProfilerMarkerDataUnit["FrequencyHz"] = 5] = "FrequencyHz";
    })(ProfilerMarkerDataUnit = Profiling.ProfilerMarkerDataUnit || (Profiling.ProfilerMarkerDataUnit = {}));

    var ProfilerCounterOptions;

    (function (ProfilerCounterOptions) {
      ProfilerCounterOptions[ProfilerCounterOptions["None"] = 0] = "None";
      ProfilerCounterOptions[ProfilerCounterOptions["FlushOnEndOfFrame"] = 2] = "FlushOnEndOfFrame";
      ProfilerCounterOptions[ProfilerCounterOptions["ResetToZeroOnFlush"] = 4] = "ResetToZeroOnFlush";
    })(ProfilerCounterOptions = Profiling.ProfilerCounterOptions || (Profiling.ProfilerCounterOptions = {}));

    var ProfilerRecorderOptions;

    (function (ProfilerRecorderOptions) {
      ProfilerRecorderOptions[ProfilerRecorderOptions["None"] = 0] = "None";
      ProfilerRecorderOptions[ProfilerRecorderOptions["StartImmediately"] = 1] = "StartImmediately";
      ProfilerRecorderOptions[ProfilerRecorderOptions["KeepAliveDuringDomainReload"] = 2] = "KeepAliveDuringDomainReload";
      ProfilerRecorderOptions[ProfilerRecorderOptions["CollectOnlyOnCurrentThread"] = 4] = "CollectOnlyOnCurrentThread";
      ProfilerRecorderOptions[ProfilerRecorderOptions["WrapAroundWhenCapacityReached"] = 8] = "WrapAroundWhenCapacityReached";
      ProfilerRecorderOptions[ProfilerRecorderOptions["SumAllSamplesInFrame"] = 16] = "SumAllSamplesInFrame";
      ProfilerRecorderOptions[ProfilerRecorderOptions["Default"] = 24] = "Default";
    })(ProfilerRecorderOptions = Profiling.ProfilerRecorderOptions || (Profiling.ProfilerRecorderOptions = {}));

    var LowLevel;

    (function (LowLevel) {
      var MarkerFlags;

      (function (MarkerFlags) {
        MarkerFlags[MarkerFlags["Default"] = 0] = "Default";
        MarkerFlags[MarkerFlags["Script"] = 2] = "Script";
        MarkerFlags[MarkerFlags["ScriptInvoke"] = 32] = "ScriptInvoke";
        MarkerFlags[MarkerFlags["ScriptDeepProfiler"] = 64] = "ScriptDeepProfiler";
        MarkerFlags[MarkerFlags["AvailabilityEditor"] = 4] = "AvailabilityEditor";
        MarkerFlags[MarkerFlags["Warning"] = 16] = "Warning";
        MarkerFlags[MarkerFlags["Counter"] = 128] = "Counter";
      })(MarkerFlags = LowLevel.MarkerFlags || (LowLevel.MarkerFlags = {}));

      var ProfilerMarkerDataType;

      (function (ProfilerMarkerDataType) {
        ProfilerMarkerDataType[ProfilerMarkerDataType["Int32"] = 2] = "Int32";
        ProfilerMarkerDataType[ProfilerMarkerDataType["UInt32"] = 3] = "UInt32";
        ProfilerMarkerDataType[ProfilerMarkerDataType["Int64"] = 4] = "Int64";
        ProfilerMarkerDataType[ProfilerMarkerDataType["UInt64"] = 5] = "UInt64";
        ProfilerMarkerDataType[ProfilerMarkerDataType["Float"] = 6] = "Float";
        ProfilerMarkerDataType[ProfilerMarkerDataType["Double"] = 7] = "Double";
        ProfilerMarkerDataType[ProfilerMarkerDataType["String16"] = 9] = "String16";
        ProfilerMarkerDataType[ProfilerMarkerDataType["Blob8"] = 11] = "Blob8";
      })(ProfilerMarkerDataType = LowLevel.ProfilerMarkerDataType || (LowLevel.ProfilerMarkerDataType = {}));
    })(LowLevel = Profiling.LowLevel || (Profiling.LowLevel = {}));
  })(Profiling = Unity.Profiling || (Unity.Profiling = {}));

  var Rendering;

  (function (Rendering) {
    var HybridV2;

    (function (HybridV2) {
      var DOTSInstancingPropertyType;

      (function (DOTSInstancingPropertyType) {
        DOTSInstancingPropertyType[DOTSInstancingPropertyType["Unknown"] = 0] = "Unknown";
        DOTSInstancingPropertyType[DOTSInstancingPropertyType["Float"] = 1] = "Float";
        DOTSInstancingPropertyType[DOTSInstancingPropertyType["Half"] = 2] = "Half";
        DOTSInstancingPropertyType[DOTSInstancingPropertyType["Int"] = 3] = "Int";
        DOTSInstancingPropertyType[DOTSInstancingPropertyType["Short"] = 4] = "Short";
        DOTSInstancingPropertyType[DOTSInstancingPropertyType["Uint"] = 5] = "Uint";
        DOTSInstancingPropertyType[DOTSInstancingPropertyType["Bool"] = 6] = "Bool";
        DOTSInstancingPropertyType[DOTSInstancingPropertyType["Struct"] = 7] = "Struct";
      })(DOTSInstancingPropertyType = HybridV2.DOTSInstancingPropertyType || (HybridV2.DOTSInstancingPropertyType = {}));
    })(HybridV2 = Rendering.HybridV2 || (Rendering.HybridV2 = {}));
  })(Rendering = Unity.Rendering || (Unity.Rendering = {}));
})(unity_Unity || (unity_Unity = {}));

var UnityEngine;

(function (UnityEngine) {
  var SendMessageOptions;

  (function (SendMessageOptions) {
    SendMessageOptions[SendMessageOptions["RequireReceiver"] = 0] = "RequireReceiver";
    SendMessageOptions[SendMessageOptions["DontRequireReceiver"] = 1] = "DontRequireReceiver";
  })(SendMessageOptions = UnityEngine.SendMessageOptions || (UnityEngine.SendMessageOptions = {}));

  var PrimitiveType;

  (function (PrimitiveType) {
    PrimitiveType[PrimitiveType["Sphere"] = 0] = "Sphere";
    PrimitiveType[PrimitiveType["Capsule"] = 1] = "Capsule";
    PrimitiveType[PrimitiveType["Cylinder"] = 2] = "Cylinder";
    PrimitiveType[PrimitiveType["Cube"] = 3] = "Cube";
    PrimitiveType[PrimitiveType["Plane"] = 4] = "Plane";
    PrimitiveType[PrimitiveType["Quad"] = 5] = "Quad";
  })(PrimitiveType = UnityEngine.PrimitiveType || (UnityEngine.PrimitiveType = {}));

  var Space;

  (function (Space) {
    Space[Space["World"] = 0] = "World";
    Space[Space["Self"] = 1] = "Self";
  })(Space = UnityEngine.Space || (UnityEngine.Space = {}));

  var RuntimePlatform;

  (function (RuntimePlatform) {
    RuntimePlatform[RuntimePlatform["OSXEditor"] = 0] = "OSXEditor";
    RuntimePlatform[RuntimePlatform["OSXPlayer"] = 1] = "OSXPlayer";
    RuntimePlatform[RuntimePlatform["WindowsPlayer"] = 2] = "WindowsPlayer";
    RuntimePlatform[RuntimePlatform["OSXWebPlayer"] = 3] = "OSXWebPlayer";
    RuntimePlatform[RuntimePlatform["OSXDashboardPlayer"] = 4] = "OSXDashboardPlayer";
    RuntimePlatform[RuntimePlatform["WindowsWebPlayer"] = 5] = "WindowsWebPlayer";
    RuntimePlatform[RuntimePlatform["WindowsEditor"] = 7] = "WindowsEditor";
    RuntimePlatform[RuntimePlatform["IPhonePlayer"] = 8] = "IPhonePlayer";
    RuntimePlatform[RuntimePlatform["XBOX360"] = 10] = "XBOX360";
    RuntimePlatform[RuntimePlatform["PS3"] = 9] = "PS3";
    RuntimePlatform[RuntimePlatform["Android"] = 11] = "Android";
    RuntimePlatform[RuntimePlatform["NaCl"] = 12] = "NaCl";
    RuntimePlatform[RuntimePlatform["FlashPlayer"] = 15] = "FlashPlayer";
    RuntimePlatform[RuntimePlatform["LinuxPlayer"] = 13] = "LinuxPlayer";
    RuntimePlatform[RuntimePlatform["LinuxEditor"] = 16] = "LinuxEditor";
    RuntimePlatform[RuntimePlatform["WebGLPlayer"] = 17] = "WebGLPlayer";
    RuntimePlatform[RuntimePlatform["MetroPlayerX86"] = 18] = "MetroPlayerX86";
    RuntimePlatform[RuntimePlatform["WSAPlayerX86"] = 18] = "WSAPlayerX86";
    RuntimePlatform[RuntimePlatform["MetroPlayerX64"] = 19] = "MetroPlayerX64";
    RuntimePlatform[RuntimePlatform["WSAPlayerX64"] = 19] = "WSAPlayerX64";
    RuntimePlatform[RuntimePlatform["MetroPlayerARM"] = 20] = "MetroPlayerARM";
    RuntimePlatform[RuntimePlatform["WSAPlayerARM"] = 20] = "WSAPlayerARM";
    RuntimePlatform[RuntimePlatform["WP8Player"] = 21] = "WP8Player";
    RuntimePlatform[RuntimePlatform["BB10Player"] = 22] = "BB10Player";
    RuntimePlatform[RuntimePlatform["BlackBerryPlayer"] = 22] = "BlackBerryPlayer";
    RuntimePlatform[RuntimePlatform["TizenPlayer"] = 23] = "TizenPlayer";
    RuntimePlatform[RuntimePlatform["PSP2"] = 24] = "PSP2";
    RuntimePlatform[RuntimePlatform["PS4"] = 25] = "PS4";
    RuntimePlatform[RuntimePlatform["PSM"] = 26] = "PSM";
    RuntimePlatform[RuntimePlatform["XboxOne"] = 27] = "XboxOne";
    RuntimePlatform[RuntimePlatform["SamsungTVPlayer"] = 28] = "SamsungTVPlayer";
    RuntimePlatform[RuntimePlatform["WiiU"] = 30] = "WiiU";
    RuntimePlatform[RuntimePlatform["tvOS"] = 31] = "tvOS";
    RuntimePlatform[RuntimePlatform["Switch"] = 32] = "Switch";
    RuntimePlatform[RuntimePlatform["Lumin"] = 33] = "Lumin";
    RuntimePlatform[RuntimePlatform["Stadia"] = 34] = "Stadia";
    RuntimePlatform[RuntimePlatform["CloudRendering"] = 35] = "CloudRendering";
  })(RuntimePlatform = UnityEngine.RuntimePlatform || (UnityEngine.RuntimePlatform = {}));

  var SystemLanguage;

  (function (SystemLanguage) {
    SystemLanguage[SystemLanguage["Afrikaans"] = 0] = "Afrikaans";
    SystemLanguage[SystemLanguage["Arabic"] = 1] = "Arabic";
    SystemLanguage[SystemLanguage["Basque"] = 2] = "Basque";
    SystemLanguage[SystemLanguage["Belarusian"] = 3] = "Belarusian";
    SystemLanguage[SystemLanguage["Bulgarian"] = 4] = "Bulgarian";
    SystemLanguage[SystemLanguage["Catalan"] = 5] = "Catalan";
    SystemLanguage[SystemLanguage["Chinese"] = 6] = "Chinese";
    SystemLanguage[SystemLanguage["Czech"] = 7] = "Czech";
    SystemLanguage[SystemLanguage["Danish"] = 8] = "Danish";
    SystemLanguage[SystemLanguage["Dutch"] = 9] = "Dutch";
    SystemLanguage[SystemLanguage["English"] = 10] = "English";
    SystemLanguage[SystemLanguage["Estonian"] = 11] = "Estonian";
    SystemLanguage[SystemLanguage["Faroese"] = 12] = "Faroese";
    SystemLanguage[SystemLanguage["Finnish"] = 13] = "Finnish";
    SystemLanguage[SystemLanguage["French"] = 14] = "French";
    SystemLanguage[SystemLanguage["German"] = 15] = "German";
    SystemLanguage[SystemLanguage["Greek"] = 16] = "Greek";
    SystemLanguage[SystemLanguage["Hebrew"] = 17] = "Hebrew";
    SystemLanguage[SystemLanguage["Hugarian"] = 18] = "Hugarian";
    SystemLanguage[SystemLanguage["Icelandic"] = 19] = "Icelandic";
    SystemLanguage[SystemLanguage["Indonesian"] = 20] = "Indonesian";
    SystemLanguage[SystemLanguage["Italian"] = 21] = "Italian";
    SystemLanguage[SystemLanguage["Japanese"] = 22] = "Japanese";
    SystemLanguage[SystemLanguage["Korean"] = 23] = "Korean";
    SystemLanguage[SystemLanguage["Latvian"] = 24] = "Latvian";
    SystemLanguage[SystemLanguage["Lithuanian"] = 25] = "Lithuanian";
    SystemLanguage[SystemLanguage["Norwegian"] = 26] = "Norwegian";
    SystemLanguage[SystemLanguage["Polish"] = 27] = "Polish";
    SystemLanguage[SystemLanguage["Portuguese"] = 28] = "Portuguese";
    SystemLanguage[SystemLanguage["Romanian"] = 29] = "Romanian";
    SystemLanguage[SystemLanguage["Russian"] = 30] = "Russian";
    SystemLanguage[SystemLanguage["SerboCroatian"] = 31] = "SerboCroatian";
    SystemLanguage[SystemLanguage["Slovak"] = 32] = "Slovak";
    SystemLanguage[SystemLanguage["Slovenian"] = 33] = "Slovenian";
    SystemLanguage[SystemLanguage["Spanish"] = 34] = "Spanish";
    SystemLanguage[SystemLanguage["Swedish"] = 35] = "Swedish";
    SystemLanguage[SystemLanguage["Thai"] = 36] = "Thai";
    SystemLanguage[SystemLanguage["Turkish"] = 37] = "Turkish";
    SystemLanguage[SystemLanguage["Ukrainian"] = 38] = "Ukrainian";
    SystemLanguage[SystemLanguage["Vietnamese"] = 39] = "Vietnamese";
    SystemLanguage[SystemLanguage["ChineseSimplified"] = 40] = "ChineseSimplified";
    SystemLanguage[SystemLanguage["ChineseTraditional"] = 41] = "ChineseTraditional";
    SystemLanguage[SystemLanguage["Unknown"] = 42] = "Unknown";
    SystemLanguage[SystemLanguage["Hungarian"] = 18] = "Hungarian";
  })(SystemLanguage = UnityEngine.SystemLanguage || (UnityEngine.SystemLanguage = {}));

  var LogType;

  (function (LogType) {
    LogType[LogType["Error"] = 0] = "Error";
    LogType[LogType["Assert"] = 1] = "Assert";
    LogType[LogType["Warning"] = 2] = "Warning";
    LogType[LogType["Log"] = 3] = "Log";
    LogType[LogType["Exception"] = 4] = "Exception";
  })(LogType = UnityEngine.LogType || (UnityEngine.LogType = {}));

  var LogOption;

  (function (LogOption) {
    LogOption[LogOption["None"] = 0] = "None";
    LogOption[LogOption["NoStacktrace"] = 1] = "NoStacktrace";
  })(LogOption = UnityEngine.LogOption || (UnityEngine.LogOption = {}));

  var ThreadPriority;

  (function (ThreadPriority) {
    ThreadPriority[ThreadPriority["Low"] = 0] = "Low";
    ThreadPriority[ThreadPriority["BelowNormal"] = 1] = "BelowNormal";
    ThreadPriority[ThreadPriority["Normal"] = 2] = "Normal";
    ThreadPriority[ThreadPriority["High"] = 4] = "High";
  })(ThreadPriority = UnityEngine.ThreadPriority || (UnityEngine.ThreadPriority = {}));

  var WeightedMode;

  (function (WeightedMode) {
    WeightedMode[WeightedMode["None"] = 0] = "None";
    WeightedMode[WeightedMode["In"] = 1] = "In";
    WeightedMode[WeightedMode["Out"] = 2] = "Out";
    WeightedMode[WeightedMode["Both"] = 3] = "Both";
  })(WeightedMode = UnityEngine.WeightedMode || (UnityEngine.WeightedMode = {}));

  var WrapMode;

  (function (WrapMode) {
    WrapMode[WrapMode["Once"] = 1] = "Once";
    WrapMode[WrapMode["Loop"] = 2] = "Loop";
    WrapMode[WrapMode["PingPong"] = 4] = "PingPong";
    WrapMode[WrapMode["Default"] = 0] = "Default";
    WrapMode[WrapMode["ClampForever"] = 8] = "ClampForever";
    WrapMode[WrapMode["Clamp"] = 1] = "Clamp";
  })(WrapMode = UnityEngine.WrapMode || (UnityEngine.WrapMode = {}));

  var StackTraceLogType;

  (function (StackTraceLogType) {
    StackTraceLogType[StackTraceLogType["None"] = 0] = "None";
    StackTraceLogType[StackTraceLogType["ScriptOnly"] = 1] = "ScriptOnly";
    StackTraceLogType[StackTraceLogType["Full"] = 2] = "Full";
  })(StackTraceLogType = UnityEngine.StackTraceLogType || (UnityEngine.StackTraceLogType = {}));

  var NetworkReachability;

  (function (NetworkReachability) {
    NetworkReachability[NetworkReachability["NotReachable"] = 0] = "NotReachable";
    NetworkReachability[NetworkReachability["ReachableViaCarrierDataNetwork"] = 1] = "ReachableViaCarrierDataNetwork";
    NetworkReachability[NetworkReachability["ReachableViaLocalAreaNetwork"] = 2] = "ReachableViaLocalAreaNetwork";
  })(NetworkReachability = UnityEngine.NetworkReachability || (UnityEngine.NetworkReachability = {}));

  var UserAuthorization;

  (function (UserAuthorization) {
    UserAuthorization[UserAuthorization["WebCam"] = 1] = "WebCam";
    UserAuthorization[UserAuthorization["Microphone"] = 2] = "Microphone";
  })(UserAuthorization = UnityEngine.UserAuthorization || (UnityEngine.UserAuthorization = {}));

  var ApplicationInstallMode;

  (function (ApplicationInstallMode) {
    ApplicationInstallMode[ApplicationInstallMode["Unknown"] = 0] = "Unknown";
    ApplicationInstallMode[ApplicationInstallMode["Store"] = 1] = "Store";
    ApplicationInstallMode[ApplicationInstallMode["DeveloperBuild"] = 2] = "DeveloperBuild";
    ApplicationInstallMode[ApplicationInstallMode["Adhoc"] = 3] = "Adhoc";
    ApplicationInstallMode[ApplicationInstallMode["Enterprise"] = 4] = "Enterprise";
    ApplicationInstallMode[ApplicationInstallMode["Editor"] = 5] = "Editor";
  })(ApplicationInstallMode = UnityEngine.ApplicationInstallMode || (UnityEngine.ApplicationInstallMode = {}));

  var ApplicationSandboxType;

  (function (ApplicationSandboxType) {
    ApplicationSandboxType[ApplicationSandboxType["Unknown"] = 0] = "Unknown";
    ApplicationSandboxType[ApplicationSandboxType["NotSandboxed"] = 1] = "NotSandboxed";
    ApplicationSandboxType[ApplicationSandboxType["Sandboxed"] = 2] = "Sandboxed";
    ApplicationSandboxType[ApplicationSandboxType["SandboxBroken"] = 3] = "SandboxBroken";
  })(ApplicationSandboxType = UnityEngine.ApplicationSandboxType || (UnityEngine.ApplicationSandboxType = {}));

  var AudioType;

  (function (AudioType) {
    AudioType[AudioType["UNKNOWN"] = 0] = "UNKNOWN";
    AudioType[AudioType["ACC"] = 1] = "ACC";
    AudioType[AudioType["AIFF"] = 2] = "AIFF";
    AudioType[AudioType["IT"] = 10] = "IT";
    AudioType[AudioType["MOD"] = 12] = "MOD";
    AudioType[AudioType["MPEG"] = 13] = "MPEG";
    AudioType[AudioType["OGGVORBIS"] = 14] = "OGGVORBIS";
    AudioType[AudioType["S3M"] = 17] = "S3M";
    AudioType[AudioType["WAV"] = 20] = "WAV";
    AudioType[AudioType["XM"] = 21] = "XM";
    AudioType[AudioType["XMA"] = 22] = "XMA";
    AudioType[AudioType["VAG"] = 23] = "VAG";
    AudioType[AudioType["AUDIOQUEUE"] = 24] = "AUDIOQUEUE";
  })(AudioType = UnityEngine.AudioType || (UnityEngine.AudioType = {}));

  var Camera_GateFitMode;

  (function (Camera_GateFitMode) {
    Camera_GateFitMode[Camera_GateFitMode["Vertical"] = 1] = "Vertical";
    Camera_GateFitMode[Camera_GateFitMode["Horizontal"] = 2] = "Horizontal";
    Camera_GateFitMode[Camera_GateFitMode["Fill"] = 3] = "Fill";
    Camera_GateFitMode[Camera_GateFitMode["Overscan"] = 4] = "Overscan";
    Camera_GateFitMode[Camera_GateFitMode["None"] = 0] = "None";
  })(Camera_GateFitMode = UnityEngine.Camera_GateFitMode || (UnityEngine.Camera_GateFitMode = {}));

  var Camera_FieldOfViewAxis;

  (function (Camera_FieldOfViewAxis) {
    Camera_FieldOfViewAxis[Camera_FieldOfViewAxis["Vertical"] = 0] = "Vertical";
    Camera_FieldOfViewAxis[Camera_FieldOfViewAxis["Horizontal"] = 1] = "Horizontal";
  })(Camera_FieldOfViewAxis = UnityEngine.Camera_FieldOfViewAxis || (UnityEngine.Camera_FieldOfViewAxis = {}));

  var Camera_StereoscopicEye;

  (function (Camera_StereoscopicEye) {
    Camera_StereoscopicEye[Camera_StereoscopicEye["Left"] = 0] = "Left";
    Camera_StereoscopicEye[Camera_StereoscopicEye["Right"] = 1] = "Right";
  })(Camera_StereoscopicEye = UnityEngine.Camera_StereoscopicEye || (UnityEngine.Camera_StereoscopicEye = {}));

  var Camera_MonoOrStereoscopicEye;

  (function (Camera_MonoOrStereoscopicEye) {
    Camera_MonoOrStereoscopicEye[Camera_MonoOrStereoscopicEye["Left"] = 0] = "Left";
    Camera_MonoOrStereoscopicEye[Camera_MonoOrStereoscopicEye["Right"] = 1] = "Right";
    Camera_MonoOrStereoscopicEye[Camera_MonoOrStereoscopicEye["Mono"] = 2] = "Mono";
  })(Camera_MonoOrStereoscopicEye = UnityEngine.Camera_MonoOrStereoscopicEye || (UnityEngine.Camera_MonoOrStereoscopicEye = {}));

  var Camera_RenderRequestMode;

  (function (Camera_RenderRequestMode) {
    Camera_RenderRequestMode[Camera_RenderRequestMode["None"] = 0] = "None";
    Camera_RenderRequestMode[Camera_RenderRequestMode["ObjectId"] = 1] = "ObjectId";
    Camera_RenderRequestMode[Camera_RenderRequestMode["Depth"] = 2] = "Depth";
    Camera_RenderRequestMode[Camera_RenderRequestMode["VertexNormal"] = 3] = "VertexNormal";
    Camera_RenderRequestMode[Camera_RenderRequestMode["WorldPosition"] = 4] = "WorldPosition";
    Camera_RenderRequestMode[Camera_RenderRequestMode["EntityId"] = 5] = "EntityId";
    Camera_RenderRequestMode[Camera_RenderRequestMode["BaseColor"] = 6] = "BaseColor";
    Camera_RenderRequestMode[Camera_RenderRequestMode["SpecularColor"] = 7] = "SpecularColor";
    Camera_RenderRequestMode[Camera_RenderRequestMode["Metallic"] = 8] = "Metallic";
    Camera_RenderRequestMode[Camera_RenderRequestMode["Emission"] = 9] = "Emission";
    Camera_RenderRequestMode[Camera_RenderRequestMode["Normal"] = 10] = "Normal";
    Camera_RenderRequestMode[Camera_RenderRequestMode["Smoothness"] = 11] = "Smoothness";
    Camera_RenderRequestMode[Camera_RenderRequestMode["Occlusion"] = 12] = "Occlusion";
    Camera_RenderRequestMode[Camera_RenderRequestMode["DiffuseColor"] = 13] = "DiffuseColor";
  })(Camera_RenderRequestMode = UnityEngine.Camera_RenderRequestMode || (UnityEngine.Camera_RenderRequestMode = {}));

  var Camera_RenderRequestOutputSpace;

  (function (Camera_RenderRequestOutputSpace) {
    Camera_RenderRequestOutputSpace[Camera_RenderRequestOutputSpace["ScreenSpace"] = -1] = "ScreenSpace";
    Camera_RenderRequestOutputSpace[Camera_RenderRequestOutputSpace["UV0"] = 0] = "UV0";
    Camera_RenderRequestOutputSpace[Camera_RenderRequestOutputSpace["UV1"] = 1] = "UV1";
    Camera_RenderRequestOutputSpace[Camera_RenderRequestOutputSpace["UV2"] = 2] = "UV2";
    Camera_RenderRequestOutputSpace[Camera_RenderRequestOutputSpace["UV3"] = 3] = "UV3";
    Camera_RenderRequestOutputSpace[Camera_RenderRequestOutputSpace["UV4"] = 4] = "UV4";
    Camera_RenderRequestOutputSpace[Camera_RenderRequestOutputSpace["UV5"] = 5] = "UV5";
    Camera_RenderRequestOutputSpace[Camera_RenderRequestOutputSpace["UV6"] = 6] = "UV6";
    Camera_RenderRequestOutputSpace[Camera_RenderRequestOutputSpace["UV7"] = 7] = "UV7";
    Camera_RenderRequestOutputSpace[Camera_RenderRequestOutputSpace["UV8"] = 8] = "UV8";
  })(Camera_RenderRequestOutputSpace = UnityEngine.Camera_RenderRequestOutputSpace || (UnityEngine.Camera_RenderRequestOutputSpace = {}));

  var ReflectionProbe_ReflectionProbeEvent;

  (function (ReflectionProbe_ReflectionProbeEvent) {
    ReflectionProbe_ReflectionProbeEvent[ReflectionProbe_ReflectionProbeEvent["ReflectionProbeAdded"] = 0] = "ReflectionProbeAdded";
    ReflectionProbe_ReflectionProbeEvent[ReflectionProbe_ReflectionProbeEvent["ReflectionProbeRemoved"] = 1] = "ReflectionProbeRemoved";
  })(ReflectionProbe_ReflectionProbeEvent = UnityEngine.ReflectionProbe_ReflectionProbeEvent || (UnityEngine.ReflectionProbe_ReflectionProbeEvent = {}));

  var LightingSettings_Lightmapper;

  (function (LightingSettings_Lightmapper) {
    LightingSettings_Lightmapper[LightingSettings_Lightmapper["Enlighten"] = 0] = "Enlighten";
    LightingSettings_Lightmapper[LightingSettings_Lightmapper["ProgressiveCPU"] = 1] = "ProgressiveCPU";
    LightingSettings_Lightmapper[LightingSettings_Lightmapper["ProgressiveGPU"] = 2] = "ProgressiveGPU";
  })(LightingSettings_Lightmapper = UnityEngine.LightingSettings_Lightmapper || (UnityEngine.LightingSettings_Lightmapper = {}));

  var LightingSettings_Sampling;

  (function (LightingSettings_Sampling) {
    LightingSettings_Sampling[LightingSettings_Sampling["Auto"] = 0] = "Auto";
    LightingSettings_Sampling[LightingSettings_Sampling["Fixed"] = 1] = "Fixed";
  })(LightingSettings_Sampling = UnityEngine.LightingSettings_Sampling || (UnityEngine.LightingSettings_Sampling = {}));

  var LightingSettings_FilterMode;

  (function (LightingSettings_FilterMode) {
    LightingSettings_FilterMode[LightingSettings_FilterMode["None"] = 0] = "None";
    LightingSettings_FilterMode[LightingSettings_FilterMode["Auto"] = 1] = "Auto";
    LightingSettings_FilterMode[LightingSettings_FilterMode["Advanced"] = 2] = "Advanced";
  })(LightingSettings_FilterMode = UnityEngine.LightingSettings_FilterMode || (UnityEngine.LightingSettings_FilterMode = {}));

  var LightingSettings_DenoiserType;

  (function (LightingSettings_DenoiserType) {
    LightingSettings_DenoiserType[LightingSettings_DenoiserType["None"] = 0] = "None";
    LightingSettings_DenoiserType[LightingSettings_DenoiserType["Optix"] = 1] = "Optix";
    LightingSettings_DenoiserType[LightingSettings_DenoiserType["OpenImage"] = 2] = "OpenImage";
    LightingSettings_DenoiserType[LightingSettings_DenoiserType["RadeonPro"] = 3] = "RadeonPro";
  })(LightingSettings_DenoiserType = UnityEngine.LightingSettings_DenoiserType || (UnityEngine.LightingSettings_DenoiserType = {}));

  var LightingSettings_FilterType;

  (function (LightingSettings_FilterType) {
    LightingSettings_FilterType[LightingSettings_FilterType["Gaussian"] = 0] = "Gaussian";
    LightingSettings_FilterType[LightingSettings_FilterType["ATrous"] = 1] = "ATrous";
    LightingSettings_FilterType[LightingSettings_FilterType["None"] = 2] = "None";
  })(LightingSettings_FilterType = UnityEngine.LightingSettings_FilterType || (UnityEngine.LightingSettings_FilterType = {}));

  var FullScreenMode;

  (function (FullScreenMode) {
    FullScreenMode[FullScreenMode["ExclusiveFullScreen"] = 0] = "ExclusiveFullScreen";
    FullScreenMode[FullScreenMode["FullScreenWindow"] = 1] = "FullScreenWindow";
    FullScreenMode[FullScreenMode["MaximizedWindow"] = 2] = "MaximizedWindow";
    FullScreenMode[FullScreenMode["Windowed"] = 3] = "Windowed";
  })(FullScreenMode = UnityEngine.FullScreenMode || (UnityEngine.FullScreenMode = {}));

  var ComputeBufferMode;

  (function (ComputeBufferMode) {
    ComputeBufferMode[ComputeBufferMode["Immutable"] = 0] = "Immutable";
    ComputeBufferMode[ComputeBufferMode["Dynamic"] = 1] = "Dynamic";
    ComputeBufferMode[ComputeBufferMode["Circular"] = 2] = "Circular";
    ComputeBufferMode[ComputeBufferMode["StreamOut"] = 3] = "StreamOut";
    ComputeBufferMode[ComputeBufferMode["SubUpdates"] = 4] = "SubUpdates";
  })(ComputeBufferMode = UnityEngine.ComputeBufferMode || (UnityEngine.ComputeBufferMode = {}));

  var D3DHDRDisplayBitDepth;

  (function (D3DHDRDisplayBitDepth) {
    D3DHDRDisplayBitDepth[D3DHDRDisplayBitDepth["D3DHDRDisplayBitDepth10"] = 0] = "D3DHDRDisplayBitDepth10";
    D3DHDRDisplayBitDepth[D3DHDRDisplayBitDepth["D3DHDRDisplayBitDepth16"] = 1] = "D3DHDRDisplayBitDepth16";
  })(D3DHDRDisplayBitDepth = UnityEngine.D3DHDRDisplayBitDepth || (UnityEngine.D3DHDRDisplayBitDepth = {}));

  var LightmapsModeLegacy;

  (function (LightmapsModeLegacy) {
    LightmapsModeLegacy[LightmapsModeLegacy["Single"] = 0] = "Single";
    LightmapsModeLegacy[LightmapsModeLegacy["Dual"] = 1] = "Dual";
    LightmapsModeLegacy[LightmapsModeLegacy["Directional"] = 2] = "Directional";
  })(LightmapsModeLegacy = UnityEngine.LightmapsModeLegacy || (UnityEngine.LightmapsModeLegacy = {}));

  var GraphicsBuffer_Target;

  (function (GraphicsBuffer_Target) {
    GraphicsBuffer_Target[GraphicsBuffer_Target["Vertex"] = 1] = "Vertex";
    GraphicsBuffer_Target[GraphicsBuffer_Target["Index"] = 2] = "Index";
    GraphicsBuffer_Target[GraphicsBuffer_Target["Structured"] = 16] = "Structured";
    GraphicsBuffer_Target[GraphicsBuffer_Target["Raw"] = 32] = "Raw";
    GraphicsBuffer_Target[GraphicsBuffer_Target["Append"] = 64] = "Append";
    GraphicsBuffer_Target[GraphicsBuffer_Target["Counter"] = 128] = "Counter";
    GraphicsBuffer_Target[GraphicsBuffer_Target["IndirectArguments"] = 256] = "IndirectArguments";
    GraphicsBuffer_Target[GraphicsBuffer_Target["Constant"] = 512] = "Constant";
  })(GraphicsBuffer_Target = UnityEngine.GraphicsBuffer_Target || (UnityEngine.GraphicsBuffer_Target = {}));

  var LightShadowCasterMode;

  (function (LightShadowCasterMode) {
    LightShadowCasterMode[LightShadowCasterMode["Default"] = 0] = "Default";
    LightShadowCasterMode[LightShadowCasterMode["NonLightmappedOnly"] = 1] = "NonLightmappedOnly";
    LightShadowCasterMode[LightShadowCasterMode["Everything"] = 2] = "Everything";
  })(LightShadowCasterMode = UnityEngine.LightShadowCasterMode || (UnityEngine.LightShadowCasterMode = {}));

  var RenderingPath;

  (function (RenderingPath) {
    RenderingPath[RenderingPath["UsePlayerSettings"] = -1] = "UsePlayerSettings";
    RenderingPath[RenderingPath["VertexLit"] = 0] = "VertexLit";
    RenderingPath[RenderingPath["Forward"] = 1] = "Forward";
    RenderingPath[RenderingPath["DeferredLighting"] = 2] = "DeferredLighting";
    RenderingPath[RenderingPath["DeferredShading"] = 3] = "DeferredShading";
  })(RenderingPath = UnityEngine.RenderingPath || (UnityEngine.RenderingPath = {}));

  var TransparencySortMode;

  (function (TransparencySortMode) {
    TransparencySortMode[TransparencySortMode["Default"] = 0] = "Default";
    TransparencySortMode[TransparencySortMode["Perspective"] = 1] = "Perspective";
    TransparencySortMode[TransparencySortMode["Orthographic"] = 2] = "Orthographic";
    TransparencySortMode[TransparencySortMode["CustomAxis"] = 3] = "CustomAxis";
  })(TransparencySortMode = UnityEngine.TransparencySortMode || (UnityEngine.TransparencySortMode = {}));

  var StereoTargetEyeMask;

  (function (StereoTargetEyeMask) {
    StereoTargetEyeMask[StereoTargetEyeMask["None"] = 0] = "None";
    StereoTargetEyeMask[StereoTargetEyeMask["Left"] = 1] = "Left";
    StereoTargetEyeMask[StereoTargetEyeMask["Right"] = 2] = "Right";
    StereoTargetEyeMask[StereoTargetEyeMask["Both"] = 3] = "Both";
  })(StereoTargetEyeMask = UnityEngine.StereoTargetEyeMask || (UnityEngine.StereoTargetEyeMask = {}));

  var CameraType;

  (function (CameraType) {
    CameraType[CameraType["Game"] = 1] = "Game";
    CameraType[CameraType["SceneView"] = 2] = "SceneView";
    CameraType[CameraType["Preview"] = 4] = "Preview";
    CameraType[CameraType["VR"] = 8] = "VR";
    CameraType[CameraType["Reflection"] = 16] = "Reflection";
  })(CameraType = UnityEngine.CameraType || (UnityEngine.CameraType = {}));

  var ComputeBufferType;

  (function (ComputeBufferType) {
    ComputeBufferType[ComputeBufferType["Default"] = 0] = "Default";
    ComputeBufferType[ComputeBufferType["Raw"] = 1] = "Raw";
    ComputeBufferType[ComputeBufferType["Append"] = 2] = "Append";
    ComputeBufferType[ComputeBufferType["Counter"] = 4] = "Counter";
    ComputeBufferType[ComputeBufferType["Constant"] = 8] = "Constant";
    ComputeBufferType[ComputeBufferType["Structured"] = 16] = "Structured";
    ComputeBufferType[ComputeBufferType["DrawIndirect"] = 256] = "DrawIndirect";
    ComputeBufferType[ComputeBufferType["IndirectArguments"] = 256] = "IndirectArguments";
    ComputeBufferType[ComputeBufferType["GPUMemory"] = 512] = "GPUMemory";
  })(ComputeBufferType = UnityEngine.ComputeBufferType || (UnityEngine.ComputeBufferType = {}));

  var LightType;

  (function (LightType) {
    LightType[LightType["Spot"] = 0] = "Spot";
    LightType[LightType["Directional"] = 1] = "Directional";
    LightType[LightType["Point"] = 2] = "Point";
    LightType[LightType["Area"] = 3] = "Area";
    LightType[LightType["Rectangle"] = 3] = "Rectangle";
    LightType[LightType["Disc"] = 4] = "Disc";
  })(LightType = UnityEngine.LightType || (UnityEngine.LightType = {}));

  var LightShape;

  (function (LightShape) {
    LightShape[LightShape["Cone"] = 0] = "Cone";
    LightShape[LightShape["Pyramid"] = 1] = "Pyramid";
    LightShape[LightShape["Box"] = 2] = "Box";
  })(LightShape = UnityEngine.LightShape || (UnityEngine.LightShape = {}));

  var LightRenderMode;

  (function (LightRenderMode) {
    LightRenderMode[LightRenderMode["Auto"] = 0] = "Auto";
    LightRenderMode[LightRenderMode["ForcePixel"] = 1] = "ForcePixel";
    LightRenderMode[LightRenderMode["ForceVertex"] = 2] = "ForceVertex";
  })(LightRenderMode = UnityEngine.LightRenderMode || (UnityEngine.LightRenderMode = {}));

  var LightShadows;

  (function (LightShadows) {
    LightShadows[LightShadows["None"] = 0] = "None";
    LightShadows[LightShadows["Hard"] = 1] = "Hard";
    LightShadows[LightShadows["Soft"] = 2] = "Soft";
  })(LightShadows = UnityEngine.LightShadows || (UnityEngine.LightShadows = {}));

  var FogMode;

  (function (FogMode) {
    FogMode[FogMode["Linear"] = 1] = "Linear";
    FogMode[FogMode["Exponential"] = 2] = "Exponential";
    FogMode[FogMode["ExponentialSquared"] = 3] = "ExponentialSquared";
  })(FogMode = UnityEngine.FogMode || (UnityEngine.FogMode = {}));

  var LightmapBakeType;

  (function (LightmapBakeType) {
    LightmapBakeType[LightmapBakeType["Realtime"] = 4] = "Realtime";
    LightmapBakeType[LightmapBakeType["Baked"] = 2] = "Baked";
    LightmapBakeType[LightmapBakeType["Mixed"] = 1] = "Mixed";
  })(LightmapBakeType = UnityEngine.LightmapBakeType || (UnityEngine.LightmapBakeType = {}));

  var MixedLightingMode;

  (function (MixedLightingMode) {
    MixedLightingMode[MixedLightingMode["IndirectOnly"] = 0] = "IndirectOnly";
    MixedLightingMode[MixedLightingMode["Shadowmask"] = 2] = "Shadowmask";
    MixedLightingMode[MixedLightingMode["Subtractive"] = 1] = "Subtractive";
  })(MixedLightingMode = UnityEngine.MixedLightingMode || (UnityEngine.MixedLightingMode = {}));

  var ReceiveGI;

  (function (ReceiveGI) {
    ReceiveGI[ReceiveGI["Lightmaps"] = 1] = "Lightmaps";
    ReceiveGI[ReceiveGI["LightProbes"] = 2] = "LightProbes";
  })(ReceiveGI = UnityEngine.ReceiveGI || (UnityEngine.ReceiveGI = {}));

  var QualityLevel;

  (function (QualityLevel) {
    QualityLevel[QualityLevel["Fastest"] = 0] = "Fastest";
    QualityLevel[QualityLevel["Fast"] = 1] = "Fast";
    QualityLevel[QualityLevel["Simple"] = 2] = "Simple";
    QualityLevel[QualityLevel["Good"] = 3] = "Good";
    QualityLevel[QualityLevel["Beautiful"] = 4] = "Beautiful";
    QualityLevel[QualityLevel["Fantastic"] = 5] = "Fantastic";
  })(QualityLevel = UnityEngine.QualityLevel || (UnityEngine.QualityLevel = {}));

  var ShadowProjection;

  (function (ShadowProjection) {
    ShadowProjection[ShadowProjection["CloseFit"] = 0] = "CloseFit";
    ShadowProjection[ShadowProjection["StableFit"] = 1] = "StableFit";
  })(ShadowProjection = UnityEngine.ShadowProjection || (UnityEngine.ShadowProjection = {}));

  var ShadowQuality;

  (function (ShadowQuality) {
    ShadowQuality[ShadowQuality["Disable"] = 0] = "Disable";
    ShadowQuality[ShadowQuality["HardOnly"] = 1] = "HardOnly";
    ShadowQuality[ShadowQuality["All"] = 2] = "All";
  })(ShadowQuality = UnityEngine.ShadowQuality || (UnityEngine.ShadowQuality = {}));

  var ShadowResolution;

  (function (ShadowResolution) {
    ShadowResolution[ShadowResolution["Low"] = 0] = "Low";
    ShadowResolution[ShadowResolution["Medium"] = 1] = "Medium";
    ShadowResolution[ShadowResolution["High"] = 2] = "High";
    ShadowResolution[ShadowResolution["VeryHigh"] = 3] = "VeryHigh";
  })(ShadowResolution = UnityEngine.ShadowResolution || (UnityEngine.ShadowResolution = {}));

  var ShadowmaskMode;

  (function (ShadowmaskMode) {
    ShadowmaskMode[ShadowmaskMode["Shadowmask"] = 0] = "Shadowmask";
    ShadowmaskMode[ShadowmaskMode["DistanceShadowmask"] = 1] = "DistanceShadowmask";
  })(ShadowmaskMode = UnityEngine.ShadowmaskMode || (UnityEngine.ShadowmaskMode = {}));

  var CameraClearFlags;

  (function (CameraClearFlags) {
    CameraClearFlags[CameraClearFlags["Skybox"] = 1] = "Skybox";
    CameraClearFlags[CameraClearFlags["Color"] = 2] = "Color";
    CameraClearFlags[CameraClearFlags["SolidColor"] = 2] = "SolidColor";
    CameraClearFlags[CameraClearFlags["Depth"] = 3] = "Depth";
    CameraClearFlags[CameraClearFlags["Nothing"] = 4] = "Nothing";
  })(CameraClearFlags = UnityEngine.CameraClearFlags || (UnityEngine.CameraClearFlags = {}));

  var DepthTextureMode;

  (function (DepthTextureMode) {
    DepthTextureMode[DepthTextureMode["None"] = 0] = "None";
    DepthTextureMode[DepthTextureMode["Depth"] = 1] = "Depth";
    DepthTextureMode[DepthTextureMode["DepthNormals"] = 2] = "DepthNormals";
    DepthTextureMode[DepthTextureMode["MotionVectors"] = 4] = "MotionVectors";
  })(DepthTextureMode = UnityEngine.DepthTextureMode || (UnityEngine.DepthTextureMode = {}));

  var TexGenMode;

  (function (TexGenMode) {
    TexGenMode[TexGenMode["None"] = 0] = "None";
    TexGenMode[TexGenMode["SphereMap"] = 1] = "SphereMap";
    TexGenMode[TexGenMode["Object"] = 2] = "Object";
    TexGenMode[TexGenMode["EyeLinear"] = 3] = "EyeLinear";
    TexGenMode[TexGenMode["CubeReflect"] = 4] = "CubeReflect";
    TexGenMode[TexGenMode["CubeNormal"] = 5] = "CubeNormal";
  })(TexGenMode = UnityEngine.TexGenMode || (UnityEngine.TexGenMode = {}));

  var AnisotropicFiltering;

  (function (AnisotropicFiltering) {
    AnisotropicFiltering[AnisotropicFiltering["Disable"] = 0] = "Disable";
    AnisotropicFiltering[AnisotropicFiltering["Enable"] = 1] = "Enable";
    AnisotropicFiltering[AnisotropicFiltering["ForceEnable"] = 2] = "ForceEnable";
  })(AnisotropicFiltering = UnityEngine.AnisotropicFiltering || (UnityEngine.AnisotropicFiltering = {}));

  var BlendWeights;

  (function (BlendWeights) {
    BlendWeights[BlendWeights["OneBone"] = 1] = "OneBone";
    BlendWeights[BlendWeights["TwoBones"] = 2] = "TwoBones";
    BlendWeights[BlendWeights["FourBones"] = 4] = "FourBones";
  })(BlendWeights = UnityEngine.BlendWeights || (UnityEngine.BlendWeights = {}));

  var SkinWeights;

  (function (SkinWeights) {
    SkinWeights[SkinWeights["OneBone"] = 1] = "OneBone";
    SkinWeights[SkinWeights["TwoBones"] = 2] = "TwoBones";
    SkinWeights[SkinWeights["FourBones"] = 4] = "FourBones";
    SkinWeights[SkinWeights["Unlimited"] = 255] = "Unlimited";
  })(SkinWeights = UnityEngine.SkinWeights || (UnityEngine.SkinWeights = {}));

  var MeshTopology;

  (function (MeshTopology) {
    MeshTopology[MeshTopology["Triangles"] = 0] = "Triangles";
    MeshTopology[MeshTopology["Quads"] = 2] = "Quads";
    MeshTopology[MeshTopology["Lines"] = 3] = "Lines";
    MeshTopology[MeshTopology["LineStrip"] = 4] = "LineStrip";
    MeshTopology[MeshTopology["Points"] = 5] = "Points";
  })(MeshTopology = UnityEngine.MeshTopology || (UnityEngine.MeshTopology = {}));

  var SkinQuality;

  (function (SkinQuality) {
    SkinQuality[SkinQuality["Auto"] = 0] = "Auto";
    SkinQuality[SkinQuality["Bone1"] = 1] = "Bone1";
    SkinQuality[SkinQuality["Bone2"] = 2] = "Bone2";
    SkinQuality[SkinQuality["Bone4"] = 4] = "Bone4";
  })(SkinQuality = UnityEngine.SkinQuality || (UnityEngine.SkinQuality = {}));

  var ColorSpace;

  (function (ColorSpace) {
    ColorSpace[ColorSpace["Uninitialized"] = -1] = "Uninitialized";
    ColorSpace[ColorSpace["Gamma"] = 0] = "Gamma";
    ColorSpace[ColorSpace["Linear"] = 1] = "Linear";
  })(ColorSpace = UnityEngine.ColorSpace || (UnityEngine.ColorSpace = {}));

  var ColorGamut;

  (function (ColorGamut) {
    ColorGamut[ColorGamut["sRGB"] = 0] = "sRGB";
    ColorGamut[ColorGamut["Rec709"] = 1] = "Rec709";
    ColorGamut[ColorGamut["Rec2020"] = 2] = "Rec2020";
    ColorGamut[ColorGamut["DisplayP3"] = 3] = "DisplayP3";
    ColorGamut[ColorGamut["HDR10"] = 4] = "HDR10";
    ColorGamut[ColorGamut["DolbyHDR"] = 5] = "DolbyHDR";
  })(ColorGamut = UnityEngine.ColorGamut || (UnityEngine.ColorGamut = {}));

  var ScreenOrientation;

  (function (ScreenOrientation) {
    ScreenOrientation[ScreenOrientation["Unknown"] = 0] = "Unknown";
    ScreenOrientation[ScreenOrientation["Portrait"] = 1] = "Portrait";
    ScreenOrientation[ScreenOrientation["PortraitUpsideDown"] = 2] = "PortraitUpsideDown";
    ScreenOrientation[ScreenOrientation["LandscapeLeft"] = 3] = "LandscapeLeft";
    ScreenOrientation[ScreenOrientation["LandscapeRight"] = 4] = "LandscapeRight";
    ScreenOrientation[ScreenOrientation["AutoRotation"] = 5] = "AutoRotation";
    ScreenOrientation[ScreenOrientation["Landscape"] = 3] = "Landscape";
  })(ScreenOrientation = UnityEngine.ScreenOrientation || (UnityEngine.ScreenOrientation = {}));

  var FilterMode;

  (function (FilterMode) {
    FilterMode[FilterMode["Point"] = 0] = "Point";
    FilterMode[FilterMode["Bilinear"] = 1] = "Bilinear";
    FilterMode[FilterMode["Trilinear"] = 2] = "Trilinear";
  })(FilterMode = UnityEngine.FilterMode || (UnityEngine.FilterMode = {}));

  var TextureWrapMode;

  (function (TextureWrapMode) {
    TextureWrapMode[TextureWrapMode["Repeat"] = 0] = "Repeat";
    TextureWrapMode[TextureWrapMode["Clamp"] = 1] = "Clamp";
    TextureWrapMode[TextureWrapMode["Mirror"] = 2] = "Mirror";
    TextureWrapMode[TextureWrapMode["MirrorOnce"] = 3] = "MirrorOnce";
  })(TextureWrapMode = UnityEngine.TextureWrapMode || (UnityEngine.TextureWrapMode = {}));

  var NPOTSupport;

  (function (NPOTSupport) {
    NPOTSupport[NPOTSupport["None"] = 0] = "None";
    NPOTSupport[NPOTSupport["Restricted"] = 1] = "Restricted";
    NPOTSupport[NPOTSupport["Full"] = 2] = "Full";
  })(NPOTSupport = UnityEngine.NPOTSupport || (UnityEngine.NPOTSupport = {}));

  var TextureFormat;

  (function (TextureFormat) {
    TextureFormat[TextureFormat["Alpha8"] = 1] = "Alpha8";
    TextureFormat[TextureFormat["ARGB4444"] = 2] = "ARGB4444";
    TextureFormat[TextureFormat["RGB24"] = 3] = "RGB24";
    TextureFormat[TextureFormat["RGBA32"] = 4] = "RGBA32";
    TextureFormat[TextureFormat["ARGB32"] = 5] = "ARGB32";
    TextureFormat[TextureFormat["RGB565"] = 7] = "RGB565";
    TextureFormat[TextureFormat["R16"] = 9] = "R16";
    TextureFormat[TextureFormat["DXT1"] = 10] = "DXT1";
    TextureFormat[TextureFormat["DXT5"] = 12] = "DXT5";
    TextureFormat[TextureFormat["RGBA4444"] = 13] = "RGBA4444";
    TextureFormat[TextureFormat["BGRA32"] = 14] = "BGRA32";
    TextureFormat[TextureFormat["RHalf"] = 15] = "RHalf";
    TextureFormat[TextureFormat["RGHalf"] = 16] = "RGHalf";
    TextureFormat[TextureFormat["RGBAHalf"] = 17] = "RGBAHalf";
    TextureFormat[TextureFormat["RFloat"] = 18] = "RFloat";
    TextureFormat[TextureFormat["RGFloat"] = 19] = "RGFloat";
    TextureFormat[TextureFormat["RGBAFloat"] = 20] = "RGBAFloat";
    TextureFormat[TextureFormat["YUY2"] = 21] = "YUY2";
    TextureFormat[TextureFormat["RGB9e5Float"] = 22] = "RGB9e5Float";
    TextureFormat[TextureFormat["BC4"] = 26] = "BC4";
    TextureFormat[TextureFormat["BC5"] = 27] = "BC5";
    TextureFormat[TextureFormat["BC6H"] = 24] = "BC6H";
    TextureFormat[TextureFormat["BC7"] = 25] = "BC7";
    TextureFormat[TextureFormat["DXT1Crunched"] = 28] = "DXT1Crunched";
    TextureFormat[TextureFormat["DXT5Crunched"] = 29] = "DXT5Crunched";
    TextureFormat[TextureFormat["PVRTC_RGB2"] = 30] = "PVRTC_RGB2";
    TextureFormat[TextureFormat["PVRTC_RGBA2"] = 31] = "PVRTC_RGBA2";
    TextureFormat[TextureFormat["PVRTC_RGB4"] = 32] = "PVRTC_RGB4";
    TextureFormat[TextureFormat["PVRTC_RGBA4"] = 33] = "PVRTC_RGBA4";
    TextureFormat[TextureFormat["ETC_RGB4"] = 34] = "ETC_RGB4";
    TextureFormat[TextureFormat["ATC_RGB4"] = -127] = "ATC_RGB4";
    TextureFormat[TextureFormat["ATC_RGBA8"] = -127] = "ATC_RGBA8";
    TextureFormat[TextureFormat["EAC_R"] = 41] = "EAC_R";
    TextureFormat[TextureFormat["EAC_R_SIGNED"] = 42] = "EAC_R_SIGNED";
    TextureFormat[TextureFormat["EAC_RG"] = 43] = "EAC_RG";
    TextureFormat[TextureFormat["EAC_RG_SIGNED"] = 44] = "EAC_RG_SIGNED";
    TextureFormat[TextureFormat["ETC2_RGB"] = 45] = "ETC2_RGB";
    TextureFormat[TextureFormat["ETC2_RGBA1"] = 46] = "ETC2_RGBA1";
    TextureFormat[TextureFormat["ETC2_RGBA8"] = 47] = "ETC2_RGBA8";
    TextureFormat[TextureFormat["ASTC_4x4"] = 48] = "ASTC_4x4";
    TextureFormat[TextureFormat["ASTC_5x5"] = 49] = "ASTC_5x5";
    TextureFormat[TextureFormat["ASTC_6x6"] = 50] = "ASTC_6x6";
    TextureFormat[TextureFormat["ASTC_8x8"] = 51] = "ASTC_8x8";
    TextureFormat[TextureFormat["ASTC_10x10"] = 52] = "ASTC_10x10";
    TextureFormat[TextureFormat["ASTC_12x12"] = 53] = "ASTC_12x12";
    TextureFormat[TextureFormat["ETC_RGB4_3DS"] = 60] = "ETC_RGB4_3DS";
    TextureFormat[TextureFormat["ETC_RGBA8_3DS"] = 61] = "ETC_RGBA8_3DS";
    TextureFormat[TextureFormat["RG16"] = 62] = "RG16";
    TextureFormat[TextureFormat["R8"] = 63] = "R8";
    TextureFormat[TextureFormat["ETC_RGB4Crunched"] = 64] = "ETC_RGB4Crunched";
    TextureFormat[TextureFormat["ETC2_RGBA8Crunched"] = 65] = "ETC2_RGBA8Crunched";
    TextureFormat[TextureFormat["ASTC_HDR_4x4"] = 66] = "ASTC_HDR_4x4";
    TextureFormat[TextureFormat["ASTC_HDR_5x5"] = 67] = "ASTC_HDR_5x5";
    TextureFormat[TextureFormat["ASTC_HDR_6x6"] = 68] = "ASTC_HDR_6x6";
    TextureFormat[TextureFormat["ASTC_HDR_8x8"] = 69] = "ASTC_HDR_8x8";
    TextureFormat[TextureFormat["ASTC_HDR_10x10"] = 70] = "ASTC_HDR_10x10";
    TextureFormat[TextureFormat["ASTC_HDR_12x12"] = 71] = "ASTC_HDR_12x12";
    TextureFormat[TextureFormat["RG32"] = 72] = "RG32";
    TextureFormat[TextureFormat["RGB48"] = 73] = "RGB48";
    TextureFormat[TextureFormat["RGBA64"] = 74] = "RGBA64";
    TextureFormat[TextureFormat["ASTC_RGB_4x4"] = 48] = "ASTC_RGB_4x4";
    TextureFormat[TextureFormat["ASTC_RGB_5x5"] = 49] = "ASTC_RGB_5x5";
    TextureFormat[TextureFormat["ASTC_RGB_6x6"] = 50] = "ASTC_RGB_6x6";
    TextureFormat[TextureFormat["ASTC_RGB_8x8"] = 51] = "ASTC_RGB_8x8";
    TextureFormat[TextureFormat["ASTC_RGB_10x10"] = 52] = "ASTC_RGB_10x10";
    TextureFormat[TextureFormat["ASTC_RGB_12x12"] = 53] = "ASTC_RGB_12x12";
    TextureFormat[TextureFormat["ASTC_RGBA_4x4"] = 54] = "ASTC_RGBA_4x4";
    TextureFormat[TextureFormat["ASTC_RGBA_5x5"] = 55] = "ASTC_RGBA_5x5";
    TextureFormat[TextureFormat["ASTC_RGBA_6x6"] = 56] = "ASTC_RGBA_6x6";
    TextureFormat[TextureFormat["ASTC_RGBA_8x8"] = 57] = "ASTC_RGBA_8x8";
    TextureFormat[TextureFormat["ASTC_RGBA_10x10"] = 58] = "ASTC_RGBA_10x10";
    TextureFormat[TextureFormat["ASTC_RGBA_12x12"] = 59] = "ASTC_RGBA_12x12";
    TextureFormat[TextureFormat["PVRTC_2BPP_RGB"] = -127] = "PVRTC_2BPP_RGB";
    TextureFormat[TextureFormat["PVRTC_2BPP_RGBA"] = -127] = "PVRTC_2BPP_RGBA";
    TextureFormat[TextureFormat["PVRTC_4BPP_RGB"] = -127] = "PVRTC_4BPP_RGB";
    TextureFormat[TextureFormat["PVRTC_4BPP_RGBA"] = -127] = "PVRTC_4BPP_RGBA";
  })(TextureFormat = UnityEngine.TextureFormat || (UnityEngine.TextureFormat = {}));

  var CubemapFace;

  (function (CubemapFace) {
    CubemapFace[CubemapFace["Unknown"] = -1] = "Unknown";
    CubemapFace[CubemapFace["PositiveX"] = 0] = "PositiveX";
    CubemapFace[CubemapFace["NegativeX"] = 1] = "NegativeX";
    CubemapFace[CubemapFace["PositiveY"] = 2] = "PositiveY";
    CubemapFace[CubemapFace["NegativeY"] = 3] = "NegativeY";
    CubemapFace[CubemapFace["PositiveZ"] = 4] = "PositiveZ";
    CubemapFace[CubemapFace["NegativeZ"] = 5] = "NegativeZ";
  })(CubemapFace = UnityEngine.CubemapFace || (UnityEngine.CubemapFace = {}));

  var RenderTextureFormat;

  (function (RenderTextureFormat) {
    RenderTextureFormat[RenderTextureFormat["ARGB32"] = 0] = "ARGB32";
    RenderTextureFormat[RenderTextureFormat["Depth"] = 1] = "Depth";
    RenderTextureFormat[RenderTextureFormat["ARGBHalf"] = 2] = "ARGBHalf";
    RenderTextureFormat[RenderTextureFormat["Shadowmap"] = 3] = "Shadowmap";
    RenderTextureFormat[RenderTextureFormat["RGB565"] = 4] = "RGB565";
    RenderTextureFormat[RenderTextureFormat["ARGB4444"] = 5] = "ARGB4444";
    RenderTextureFormat[RenderTextureFormat["ARGB1555"] = 6] = "ARGB1555";
    RenderTextureFormat[RenderTextureFormat["Default"] = 7] = "Default";
    RenderTextureFormat[RenderTextureFormat["ARGB2101010"] = 8] = "ARGB2101010";
    RenderTextureFormat[RenderTextureFormat["DefaultHDR"] = 9] = "DefaultHDR";
    RenderTextureFormat[RenderTextureFormat["ARGB64"] = 10] = "ARGB64";
    RenderTextureFormat[RenderTextureFormat["ARGBFloat"] = 11] = "ARGBFloat";
    RenderTextureFormat[RenderTextureFormat["RGFloat"] = 12] = "RGFloat";
    RenderTextureFormat[RenderTextureFormat["RGHalf"] = 13] = "RGHalf";
    RenderTextureFormat[RenderTextureFormat["RFloat"] = 14] = "RFloat";
    RenderTextureFormat[RenderTextureFormat["RHalf"] = 15] = "RHalf";
    RenderTextureFormat[RenderTextureFormat["R8"] = 16] = "R8";
    RenderTextureFormat[RenderTextureFormat["ARGBInt"] = 17] = "ARGBInt";
    RenderTextureFormat[RenderTextureFormat["RGInt"] = 18] = "RGInt";
    RenderTextureFormat[RenderTextureFormat["RInt"] = 19] = "RInt";
    RenderTextureFormat[RenderTextureFormat["BGRA32"] = 20] = "BGRA32";
    RenderTextureFormat[RenderTextureFormat["RGB111110Float"] = 22] = "RGB111110Float";
    RenderTextureFormat[RenderTextureFormat["RG32"] = 23] = "RG32";
    RenderTextureFormat[RenderTextureFormat["RGBAUShort"] = 24] = "RGBAUShort";
    RenderTextureFormat[RenderTextureFormat["RG16"] = 25] = "RG16";
    RenderTextureFormat[RenderTextureFormat["BGRA10101010_XR"] = 26] = "BGRA10101010_XR";
    RenderTextureFormat[RenderTextureFormat["BGR101010_XR"] = 27] = "BGR101010_XR";
    RenderTextureFormat[RenderTextureFormat["R16"] = 28] = "R16";
  })(RenderTextureFormat = UnityEngine.RenderTextureFormat || (UnityEngine.RenderTextureFormat = {}));

  var VRTextureUsage;

  (function (VRTextureUsage) {
    VRTextureUsage[VRTextureUsage["None"] = 0] = "None";
    VRTextureUsage[VRTextureUsage["OneEye"] = 1] = "OneEye";
    VRTextureUsage[VRTextureUsage["TwoEyes"] = 2] = "TwoEyes";
    VRTextureUsage[VRTextureUsage["DeviceSpecific"] = 3] = "DeviceSpecific";
  })(VRTextureUsage = UnityEngine.VRTextureUsage || (UnityEngine.VRTextureUsage = {}));

  var RenderTextureCreationFlags;

  (function (RenderTextureCreationFlags) {
    RenderTextureCreationFlags[RenderTextureCreationFlags["MipMap"] = 1] = "MipMap";
    RenderTextureCreationFlags[RenderTextureCreationFlags["AutoGenerateMips"] = 2] = "AutoGenerateMips";
    RenderTextureCreationFlags[RenderTextureCreationFlags["SRGB"] = 4] = "SRGB";
    RenderTextureCreationFlags[RenderTextureCreationFlags["EyeTexture"] = 8] = "EyeTexture";
    RenderTextureCreationFlags[RenderTextureCreationFlags["EnableRandomWrite"] = 16] = "EnableRandomWrite";
    RenderTextureCreationFlags[RenderTextureCreationFlags["CreatedFromScript"] = 32] = "CreatedFromScript";
    RenderTextureCreationFlags[RenderTextureCreationFlags["AllowVerticalFlip"] = 128] = "AllowVerticalFlip";
    RenderTextureCreationFlags[RenderTextureCreationFlags["NoResolvedColorSurface"] = 256] = "NoResolvedColorSurface";
    RenderTextureCreationFlags[RenderTextureCreationFlags["DynamicallyScalable"] = 1024] = "DynamicallyScalable";
    RenderTextureCreationFlags[RenderTextureCreationFlags["BindMS"] = 2048] = "BindMS";
  })(RenderTextureCreationFlags = UnityEngine.RenderTextureCreationFlags || (UnityEngine.RenderTextureCreationFlags = {}));

  var RenderTextureReadWrite;

  (function (RenderTextureReadWrite) {
    RenderTextureReadWrite[RenderTextureReadWrite["Default"] = 0] = "Default";
    RenderTextureReadWrite[RenderTextureReadWrite["Linear"] = 1] = "Linear";
    RenderTextureReadWrite[RenderTextureReadWrite["sRGB"] = 2] = "sRGB";
  })(RenderTextureReadWrite = UnityEngine.RenderTextureReadWrite || (UnityEngine.RenderTextureReadWrite = {}));

  var RenderTextureMemoryless;

  (function (RenderTextureMemoryless) {
    RenderTextureMemoryless[RenderTextureMemoryless["None"] = 0] = "None";
    RenderTextureMemoryless[RenderTextureMemoryless["Color"] = 1] = "Color";
    RenderTextureMemoryless[RenderTextureMemoryless["Depth"] = 2] = "Depth";
    RenderTextureMemoryless[RenderTextureMemoryless["MSAA"] = 4] = "MSAA";
  })(RenderTextureMemoryless = UnityEngine.RenderTextureMemoryless || (UnityEngine.RenderTextureMemoryless = {}));

  var HDRDisplaySupportFlags;

  (function (HDRDisplaySupportFlags) {
    HDRDisplaySupportFlags[HDRDisplaySupportFlags["None"] = 0] = "None";
    HDRDisplaySupportFlags[HDRDisplaySupportFlags["Supported"] = 1] = "Supported";
    HDRDisplaySupportFlags[HDRDisplaySupportFlags["RuntimeSwitchable"] = 2] = "RuntimeSwitchable";
    HDRDisplaySupportFlags[HDRDisplaySupportFlags["AutomaticTonemapping"] = 4] = "AutomaticTonemapping";
  })(HDRDisplaySupportFlags = UnityEngine.HDRDisplaySupportFlags || (UnityEngine.HDRDisplaySupportFlags = {}));

  var LightmapsMode;

  (function (LightmapsMode) {
    LightmapsMode[LightmapsMode["NonDirectional"] = 0] = "NonDirectional";
    LightmapsMode[LightmapsMode["CombinedDirectional"] = 1] = "CombinedDirectional";
    LightmapsMode[LightmapsMode["SeparateDirectional"] = 2] = "SeparateDirectional";
    LightmapsMode[LightmapsMode["Single"] = 0] = "Single";
    LightmapsMode[LightmapsMode["Dual"] = 1] = "Dual";
    LightmapsMode[LightmapsMode["Directional"] = 2] = "Directional";
  })(LightmapsMode = UnityEngine.LightmapsMode || (UnityEngine.LightmapsMode = {}));

  var MaterialGlobalIlluminationFlags;

  (function (MaterialGlobalIlluminationFlags) {
    MaterialGlobalIlluminationFlags[MaterialGlobalIlluminationFlags["None"] = 0] = "None";
    MaterialGlobalIlluminationFlags[MaterialGlobalIlluminationFlags["RealtimeEmissive"] = 1] = "RealtimeEmissive";
    MaterialGlobalIlluminationFlags[MaterialGlobalIlluminationFlags["BakedEmissive"] = 2] = "BakedEmissive";
    MaterialGlobalIlluminationFlags[MaterialGlobalIlluminationFlags["EmissiveIsBlack"] = 4] = "EmissiveIsBlack";
    MaterialGlobalIlluminationFlags[MaterialGlobalIlluminationFlags["AnyEmissive"] = 3] = "AnyEmissive";
  })(MaterialGlobalIlluminationFlags = UnityEngine.MaterialGlobalIlluminationFlags || (UnityEngine.MaterialGlobalIlluminationFlags = {}));

  var LightProbeProxyVolume_ResolutionMode;

  (function (LightProbeProxyVolume_ResolutionMode) {
    LightProbeProxyVolume_ResolutionMode[LightProbeProxyVolume_ResolutionMode["Automatic"] = 0] = "Automatic";
    LightProbeProxyVolume_ResolutionMode[LightProbeProxyVolume_ResolutionMode["Custom"] = 1] = "Custom";
  })(LightProbeProxyVolume_ResolutionMode = UnityEngine.LightProbeProxyVolume_ResolutionMode || (UnityEngine.LightProbeProxyVolume_ResolutionMode = {}));

  var LightProbeProxyVolume_BoundingBoxMode;

  (function (LightProbeProxyVolume_BoundingBoxMode) {
    LightProbeProxyVolume_BoundingBoxMode[LightProbeProxyVolume_BoundingBoxMode["AutomaticLocal"] = 0] = "AutomaticLocal";
    LightProbeProxyVolume_BoundingBoxMode[LightProbeProxyVolume_BoundingBoxMode["AutomaticWorld"] = 1] = "AutomaticWorld";
    LightProbeProxyVolume_BoundingBoxMode[LightProbeProxyVolume_BoundingBoxMode["Custom"] = 2] = "Custom";
  })(LightProbeProxyVolume_BoundingBoxMode = UnityEngine.LightProbeProxyVolume_BoundingBoxMode || (UnityEngine.LightProbeProxyVolume_BoundingBoxMode = {}));

  var LightProbeProxyVolume_ProbePositionMode;

  (function (LightProbeProxyVolume_ProbePositionMode) {
    LightProbeProxyVolume_ProbePositionMode[LightProbeProxyVolume_ProbePositionMode["CellCorner"] = 0] = "CellCorner";
    LightProbeProxyVolume_ProbePositionMode[LightProbeProxyVolume_ProbePositionMode["CellCenter"] = 1] = "CellCenter";
  })(LightProbeProxyVolume_ProbePositionMode = UnityEngine.LightProbeProxyVolume_ProbePositionMode || (UnityEngine.LightProbeProxyVolume_ProbePositionMode = {}));

  var LightProbeProxyVolume_RefreshMode;

  (function (LightProbeProxyVolume_RefreshMode) {
    LightProbeProxyVolume_RefreshMode[LightProbeProxyVolume_RefreshMode["Automatic"] = 0] = "Automatic";
    LightProbeProxyVolume_RefreshMode[LightProbeProxyVolume_RefreshMode["EveryFrame"] = 1] = "EveryFrame";
    LightProbeProxyVolume_RefreshMode[LightProbeProxyVolume_RefreshMode["ViaScripting"] = 2] = "ViaScripting";
  })(LightProbeProxyVolume_RefreshMode = UnityEngine.LightProbeProxyVolume_RefreshMode || (UnityEngine.LightProbeProxyVolume_RefreshMode = {}));

  var LightProbeProxyVolume_QualityMode;

  (function (LightProbeProxyVolume_QualityMode) {
    LightProbeProxyVolume_QualityMode[LightProbeProxyVolume_QualityMode["Low"] = 0] = "Low";
    LightProbeProxyVolume_QualityMode[LightProbeProxyVolume_QualityMode["Normal"] = 1] = "Normal";
  })(LightProbeProxyVolume_QualityMode = UnityEngine.LightProbeProxyVolume_QualityMode || (UnityEngine.LightProbeProxyVolume_QualityMode = {}));

  var LightProbeProxyVolume_DataFormat;

  (function (LightProbeProxyVolume_DataFormat) {
    LightProbeProxyVolume_DataFormat[LightProbeProxyVolume_DataFormat["HalfFloat"] = 0] = "HalfFloat";
    LightProbeProxyVolume_DataFormat[LightProbeProxyVolume_DataFormat["Float"] = 1] = "Float";
  })(LightProbeProxyVolume_DataFormat = UnityEngine.LightProbeProxyVolume_DataFormat || (UnityEngine.LightProbeProxyVolume_DataFormat = {}));

  var CustomRenderTextureInitializationSource;

  (function (CustomRenderTextureInitializationSource) {
    CustomRenderTextureInitializationSource[CustomRenderTextureInitializationSource["TextureAndColor"] = 0] = "TextureAndColor";
    CustomRenderTextureInitializationSource[CustomRenderTextureInitializationSource["Material"] = 1] = "Material";
  })(CustomRenderTextureInitializationSource = UnityEngine.CustomRenderTextureInitializationSource || (UnityEngine.CustomRenderTextureInitializationSource = {}));

  var CustomRenderTextureUpdateMode;

  (function (CustomRenderTextureUpdateMode) {
    CustomRenderTextureUpdateMode[CustomRenderTextureUpdateMode["OnLoad"] = 0] = "OnLoad";
    CustomRenderTextureUpdateMode[CustomRenderTextureUpdateMode["Realtime"] = 1] = "Realtime";
    CustomRenderTextureUpdateMode[CustomRenderTextureUpdateMode["OnDemand"] = 2] = "OnDemand";
  })(CustomRenderTextureUpdateMode = UnityEngine.CustomRenderTextureUpdateMode || (UnityEngine.CustomRenderTextureUpdateMode = {}));

  var CustomRenderTextureUpdateZoneSpace;

  (function (CustomRenderTextureUpdateZoneSpace) {
    CustomRenderTextureUpdateZoneSpace[CustomRenderTextureUpdateZoneSpace["Normalized"] = 0] = "Normalized";
    CustomRenderTextureUpdateZoneSpace[CustomRenderTextureUpdateZoneSpace["Pixel"] = 1] = "Pixel";
  })(CustomRenderTextureUpdateZoneSpace = UnityEngine.CustomRenderTextureUpdateZoneSpace || (UnityEngine.CustomRenderTextureUpdateZoneSpace = {}));

  var MotionVectorGenerationMode;

  (function (MotionVectorGenerationMode) {
    MotionVectorGenerationMode[MotionVectorGenerationMode["Camera"] = 0] = "Camera";
    MotionVectorGenerationMode[MotionVectorGenerationMode["Object"] = 1] = "Object";
    MotionVectorGenerationMode[MotionVectorGenerationMode["ForceNoMotion"] = 2] = "ForceNoMotion";
  })(MotionVectorGenerationMode = UnityEngine.MotionVectorGenerationMode || (UnityEngine.MotionVectorGenerationMode = {}));

  var LineTextureMode;

  (function (LineTextureMode) {
    LineTextureMode[LineTextureMode["Stretch"] = 0] = "Stretch";
    LineTextureMode[LineTextureMode["Tile"] = 1] = "Tile";
    LineTextureMode[LineTextureMode["DistributePerSegment"] = 2] = "DistributePerSegment";
    LineTextureMode[LineTextureMode["RepeatPerSegment"] = 3] = "RepeatPerSegment";
  })(LineTextureMode = UnityEngine.LineTextureMode || (UnityEngine.LineTextureMode = {}));

  var LineAlignment;

  (function (LineAlignment) {
    LineAlignment[LineAlignment["View"] = 0] = "View";
    LineAlignment[LineAlignment["Local"] = 1] = "Local";
    LineAlignment[LineAlignment["TransformZ"] = 1] = "TransformZ";
  })(LineAlignment = UnityEngine.LineAlignment || (UnityEngine.LineAlignment = {}));

  var LightmappingMode;

  (function (LightmappingMode) {
    LightmappingMode[LightmappingMode["Realtime"] = 4] = "Realtime";
    LightmappingMode[LightmappingMode["Baked"] = 2] = "Baked";
    LightmappingMode[LightmappingMode["Mixed"] = 1] = "Mixed";
  })(LightmappingMode = UnityEngine.LightmappingMode || (UnityEngine.LightmappingMode = {}));

  var LODFadeMode;

  (function (LODFadeMode) {
    LODFadeMode[LODFadeMode["None"] = 0] = "None";
    LODFadeMode[LODFadeMode["CrossFade"] = 1] = "CrossFade";
    LODFadeMode[LODFadeMode["SpeedTree"] = 2] = "SpeedTree";
  })(LODFadeMode = UnityEngine.LODFadeMode || (UnityEngine.LODFadeMode = {}));

  var Texture2D_EXRFlags;

  (function (Texture2D_EXRFlags) {
    Texture2D_EXRFlags[Texture2D_EXRFlags["None"] = 0] = "None";
    Texture2D_EXRFlags[Texture2D_EXRFlags["OutputAsFloat"] = 1] = "OutputAsFloat";
    Texture2D_EXRFlags[Texture2D_EXRFlags["CompressZIP"] = 2] = "CompressZIP";
    Texture2D_EXRFlags[Texture2D_EXRFlags["CompressRLE"] = 4] = "CompressRLE";
    Texture2D_EXRFlags[Texture2D_EXRFlags["CompressPIZ"] = 8] = "CompressPIZ";
  })(Texture2D_EXRFlags = UnityEngine.Texture2D_EXRFlags || (UnityEngine.Texture2D_EXRFlags = {}));

  var FullScreenMovieControlMode;

  (function (FullScreenMovieControlMode) {
    FullScreenMovieControlMode[FullScreenMovieControlMode["Full"] = 0] = "Full";
    FullScreenMovieControlMode[FullScreenMovieControlMode["Minimal"] = 1] = "Minimal";
    FullScreenMovieControlMode[FullScreenMovieControlMode["CancelOnInput"] = 2] = "CancelOnInput";
    FullScreenMovieControlMode[FullScreenMovieControlMode["Hidden"] = 3] = "Hidden";
  })(FullScreenMovieControlMode = UnityEngine.FullScreenMovieControlMode || (UnityEngine.FullScreenMovieControlMode = {}));

  var FullScreenMovieScalingMode;

  (function (FullScreenMovieScalingMode) {
    FullScreenMovieScalingMode[FullScreenMovieScalingMode["None"] = 0] = "None";
    FullScreenMovieScalingMode[FullScreenMovieScalingMode["AspectFit"] = 1] = "AspectFit";
    FullScreenMovieScalingMode[FullScreenMovieScalingMode["AspectFill"] = 2] = "AspectFill";
    FullScreenMovieScalingMode[FullScreenMovieScalingMode["Fill"] = 3] = "Fill";
  })(FullScreenMovieScalingMode = UnityEngine.FullScreenMovieScalingMode || (UnityEngine.FullScreenMovieScalingMode = {}));

  var AndroidActivityIndicatorStyle;

  (function (AndroidActivityIndicatorStyle) {
    AndroidActivityIndicatorStyle[AndroidActivityIndicatorStyle["DontShow"] = -1] = "DontShow";
    AndroidActivityIndicatorStyle[AndroidActivityIndicatorStyle["Large"] = 0] = "Large";
    AndroidActivityIndicatorStyle[AndroidActivityIndicatorStyle["InversedLarge"] = 1] = "InversedLarge";
    AndroidActivityIndicatorStyle[AndroidActivityIndicatorStyle["Small"] = 2] = "Small";
    AndroidActivityIndicatorStyle[AndroidActivityIndicatorStyle["InversedSmall"] = 3] = "InversedSmall";
  })(AndroidActivityIndicatorStyle = UnityEngine.AndroidActivityIndicatorStyle || (UnityEngine.AndroidActivityIndicatorStyle = {}));

  var CursorMode;

  (function (CursorMode) {
    CursorMode[CursorMode["Auto"] = 0] = "Auto";
    CursorMode[CursorMode["ForceSoftware"] = 1] = "ForceSoftware";
  })(CursorMode = UnityEngine.CursorMode || (UnityEngine.CursorMode = {}));

  var CursorLockMode;

  (function (CursorLockMode) {
    CursorLockMode[CursorLockMode["None"] = 0] = "None";
    CursorLockMode[CursorLockMode["Locked"] = 1] = "Locked";
    CursorLockMode[CursorLockMode["Confined"] = 2] = "Confined";
  })(CursorLockMode = UnityEngine.CursorLockMode || (UnityEngine.CursorLockMode = {}));

  var KeyCode;

  (function (KeyCode) {
    KeyCode[KeyCode["None"] = 0] = "None";
    KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
    KeyCode[KeyCode["Delete"] = 127] = "Delete";
    KeyCode[KeyCode["Tab"] = 9] = "Tab";
    KeyCode[KeyCode["Clear"] = 12] = "Clear";
    KeyCode[KeyCode["Return"] = 13] = "Return";
    KeyCode[KeyCode["Pause"] = 19] = "Pause";
    KeyCode[KeyCode["Escape"] = 27] = "Escape";
    KeyCode[KeyCode["Space"] = 32] = "Space";
    KeyCode[KeyCode["Keypad0"] = 256] = "Keypad0";
    KeyCode[KeyCode["Keypad1"] = 257] = "Keypad1";
    KeyCode[KeyCode["Keypad2"] = 258] = "Keypad2";
    KeyCode[KeyCode["Keypad3"] = 259] = "Keypad3";
    KeyCode[KeyCode["Keypad4"] = 260] = "Keypad4";
    KeyCode[KeyCode["Keypad5"] = 261] = "Keypad5";
    KeyCode[KeyCode["Keypad6"] = 262] = "Keypad6";
    KeyCode[KeyCode["Keypad7"] = 263] = "Keypad7";
    KeyCode[KeyCode["Keypad8"] = 264] = "Keypad8";
    KeyCode[KeyCode["Keypad9"] = 265] = "Keypad9";
    KeyCode[KeyCode["KeypadPeriod"] = 266] = "KeypadPeriod";
    KeyCode[KeyCode["KeypadDivide"] = 267] = "KeypadDivide";
    KeyCode[KeyCode["KeypadMultiply"] = 268] = "KeypadMultiply";
    KeyCode[KeyCode["KeypadMinus"] = 269] = "KeypadMinus";
    KeyCode[KeyCode["KeypadPlus"] = 270] = "KeypadPlus";
    KeyCode[KeyCode["KeypadEnter"] = 271] = "KeypadEnter";
    KeyCode[KeyCode["KeypadEquals"] = 272] = "KeypadEquals";
    KeyCode[KeyCode["UpArrow"] = 273] = "UpArrow";
    KeyCode[KeyCode["DownArrow"] = 274] = "DownArrow";
    KeyCode[KeyCode["RightArrow"] = 275] = "RightArrow";
    KeyCode[KeyCode["LeftArrow"] = 276] = "LeftArrow";
    KeyCode[KeyCode["Insert"] = 277] = "Insert";
    KeyCode[KeyCode["Home"] = 278] = "Home";
    KeyCode[KeyCode["End"] = 279] = "End";
    KeyCode[KeyCode["PageUp"] = 280] = "PageUp";
    KeyCode[KeyCode["PageDown"] = 281] = "PageDown";
    KeyCode[KeyCode["F1"] = 282] = "F1";
    KeyCode[KeyCode["F2"] = 283] = "F2";
    KeyCode[KeyCode["F3"] = 284] = "F3";
    KeyCode[KeyCode["F4"] = 285] = "F4";
    KeyCode[KeyCode["F5"] = 286] = "F5";
    KeyCode[KeyCode["F6"] = 287] = "F6";
    KeyCode[KeyCode["F7"] = 288] = "F7";
    KeyCode[KeyCode["F8"] = 289] = "F8";
    KeyCode[KeyCode["F9"] = 290] = "F9";
    KeyCode[KeyCode["F10"] = 291] = "F10";
    KeyCode[KeyCode["F11"] = 292] = "F11";
    KeyCode[KeyCode["F12"] = 293] = "F12";
    KeyCode[KeyCode["F13"] = 294] = "F13";
    KeyCode[KeyCode["F14"] = 295] = "F14";
    KeyCode[KeyCode["F15"] = 296] = "F15";
    KeyCode[KeyCode["Alpha0"] = 48] = "Alpha0";
    KeyCode[KeyCode["Alpha1"] = 49] = "Alpha1";
    KeyCode[KeyCode["Alpha2"] = 50] = "Alpha2";
    KeyCode[KeyCode["Alpha3"] = 51] = "Alpha3";
    KeyCode[KeyCode["Alpha4"] = 52] = "Alpha4";
    KeyCode[KeyCode["Alpha5"] = 53] = "Alpha5";
    KeyCode[KeyCode["Alpha6"] = 54] = "Alpha6";
    KeyCode[KeyCode["Alpha7"] = 55] = "Alpha7";
    KeyCode[KeyCode["Alpha8"] = 56] = "Alpha8";
    KeyCode[KeyCode["Alpha9"] = 57] = "Alpha9";
    KeyCode[KeyCode["Exclaim"] = 33] = "Exclaim";
    KeyCode[KeyCode["DoubleQuote"] = 34] = "DoubleQuote";
    KeyCode[KeyCode["Hash"] = 35] = "Hash";
    KeyCode[KeyCode["Dollar"] = 36] = "Dollar";
    KeyCode[KeyCode["Percent"] = 37] = "Percent";
    KeyCode[KeyCode["Ampersand"] = 38] = "Ampersand";
    KeyCode[KeyCode["Quote"] = 39] = "Quote";
    KeyCode[KeyCode["LeftParen"] = 40] = "LeftParen";
    KeyCode[KeyCode["RightParen"] = 41] = "RightParen";
    KeyCode[KeyCode["Asterisk"] = 42] = "Asterisk";
    KeyCode[KeyCode["Plus"] = 43] = "Plus";
    KeyCode[KeyCode["Comma"] = 44] = "Comma";
    KeyCode[KeyCode["Minus"] = 45] = "Minus";
    KeyCode[KeyCode["Period"] = 46] = "Period";
    KeyCode[KeyCode["Slash"] = 47] = "Slash";
    KeyCode[KeyCode["Colon"] = 58] = "Colon";
    KeyCode[KeyCode["Semicolon"] = 59] = "Semicolon";
    KeyCode[KeyCode["Less"] = 60] = "Less";
    KeyCode[KeyCode["Equals"] = 61] = "Equals";
    KeyCode[KeyCode["Greater"] = 62] = "Greater";
    KeyCode[KeyCode["Question"] = 63] = "Question";
    KeyCode[KeyCode["At"] = 64] = "At";
    KeyCode[KeyCode["LeftBracket"] = 91] = "LeftBracket";
    KeyCode[KeyCode["Backslash"] = 92] = "Backslash";
    KeyCode[KeyCode["RightBracket"] = 93] = "RightBracket";
    KeyCode[KeyCode["Caret"] = 94] = "Caret";
    KeyCode[KeyCode["Underscore"] = 95] = "Underscore";
    KeyCode[KeyCode["BackQuote"] = 96] = "BackQuote";
    KeyCode[KeyCode["A"] = 97] = "A";
    KeyCode[KeyCode["B"] = 98] = "B";
    KeyCode[KeyCode["C"] = 99] = "C";
    KeyCode[KeyCode["D"] = 100] = "D";
    KeyCode[KeyCode["E"] = 101] = "E";
    KeyCode[KeyCode["F"] = 102] = "F";
    KeyCode[KeyCode["G"] = 103] = "G";
    KeyCode[KeyCode["H"] = 104] = "H";
    KeyCode[KeyCode["I"] = 105] = "I";
    KeyCode[KeyCode["J"] = 106] = "J";
    KeyCode[KeyCode["K"] = 107] = "K";
    KeyCode[KeyCode["L"] = 108] = "L";
    KeyCode[KeyCode["M"] = 109] = "M";
    KeyCode[KeyCode["N"] = 110] = "N";
    KeyCode[KeyCode["O"] = 111] = "O";
    KeyCode[KeyCode["P"] = 112] = "P";
    KeyCode[KeyCode["Q"] = 113] = "Q";
    KeyCode[KeyCode["R"] = 114] = "R";
    KeyCode[KeyCode["S"] = 115] = "S";
    KeyCode[KeyCode["T"] = 116] = "T";
    KeyCode[KeyCode["U"] = 117] = "U";
    KeyCode[KeyCode["V"] = 118] = "V";
    KeyCode[KeyCode["W"] = 119] = "W";
    KeyCode[KeyCode["X"] = 120] = "X";
    KeyCode[KeyCode["Y"] = 121] = "Y";
    KeyCode[KeyCode["Z"] = 122] = "Z";
    KeyCode[KeyCode["LeftCurlyBracket"] = 123] = "LeftCurlyBracket";
    KeyCode[KeyCode["Pipe"] = 124] = "Pipe";
    KeyCode[KeyCode["RightCurlyBracket"] = 125] = "RightCurlyBracket";
    KeyCode[KeyCode["Tilde"] = 126] = "Tilde";
    KeyCode[KeyCode["Numlock"] = 300] = "Numlock";
    KeyCode[KeyCode["CapsLock"] = 301] = "CapsLock";
    KeyCode[KeyCode["ScrollLock"] = 302] = "ScrollLock";
    KeyCode[KeyCode["RightShift"] = 303] = "RightShift";
    KeyCode[KeyCode["LeftShift"] = 304] = "LeftShift";
    KeyCode[KeyCode["RightControl"] = 305] = "RightControl";
    KeyCode[KeyCode["LeftControl"] = 306] = "LeftControl";
    KeyCode[KeyCode["RightAlt"] = 307] = "RightAlt";
    KeyCode[KeyCode["LeftAlt"] = 308] = "LeftAlt";
    KeyCode[KeyCode["LeftCommand"] = 310] = "LeftCommand";
    KeyCode[KeyCode["LeftApple"] = 310] = "LeftApple";
    KeyCode[KeyCode["LeftWindows"] = 311] = "LeftWindows";
    KeyCode[KeyCode["RightCommand"] = 309] = "RightCommand";
    KeyCode[KeyCode["RightApple"] = 309] = "RightApple";
    KeyCode[KeyCode["RightWindows"] = 312] = "RightWindows";
    KeyCode[KeyCode["AltGr"] = 313] = "AltGr";
    KeyCode[KeyCode["Help"] = 315] = "Help";
    KeyCode[KeyCode["Print"] = 316] = "Print";
    KeyCode[KeyCode["SysReq"] = 317] = "SysReq";
    KeyCode[KeyCode["Break"] = 318] = "Break";
    KeyCode[KeyCode["Menu"] = 319] = "Menu";
    KeyCode[KeyCode["Mouse0"] = 323] = "Mouse0";
    KeyCode[KeyCode["Mouse1"] = 324] = "Mouse1";
    KeyCode[KeyCode["Mouse2"] = 325] = "Mouse2";
    KeyCode[KeyCode["Mouse3"] = 326] = "Mouse3";
    KeyCode[KeyCode["Mouse4"] = 327] = "Mouse4";
    KeyCode[KeyCode["Mouse5"] = 328] = "Mouse5";
    KeyCode[KeyCode["Mouse6"] = 329] = "Mouse6";
    KeyCode[KeyCode["JoystickButton0"] = 330] = "JoystickButton0";
    KeyCode[KeyCode["JoystickButton1"] = 331] = "JoystickButton1";
    KeyCode[KeyCode["JoystickButton2"] = 332] = "JoystickButton2";
    KeyCode[KeyCode["JoystickButton3"] = 333] = "JoystickButton3";
    KeyCode[KeyCode["JoystickButton4"] = 334] = "JoystickButton4";
    KeyCode[KeyCode["JoystickButton5"] = 335] = "JoystickButton5";
    KeyCode[KeyCode["JoystickButton6"] = 336] = "JoystickButton6";
    KeyCode[KeyCode["JoystickButton7"] = 337] = "JoystickButton7";
    KeyCode[KeyCode["JoystickButton8"] = 338] = "JoystickButton8";
    KeyCode[KeyCode["JoystickButton9"] = 339] = "JoystickButton9";
    KeyCode[KeyCode["JoystickButton10"] = 340] = "JoystickButton10";
    KeyCode[KeyCode["JoystickButton11"] = 341] = "JoystickButton11";
    KeyCode[KeyCode["JoystickButton12"] = 342] = "JoystickButton12";
    KeyCode[KeyCode["JoystickButton13"] = 343] = "JoystickButton13";
    KeyCode[KeyCode["JoystickButton14"] = 344] = "JoystickButton14";
    KeyCode[KeyCode["JoystickButton15"] = 345] = "JoystickButton15";
    KeyCode[KeyCode["JoystickButton16"] = 346] = "JoystickButton16";
    KeyCode[KeyCode["JoystickButton17"] = 347] = "JoystickButton17";
    KeyCode[KeyCode["JoystickButton18"] = 348] = "JoystickButton18";
    KeyCode[KeyCode["JoystickButton19"] = 349] = "JoystickButton19";
    KeyCode[KeyCode["Joystick1Button0"] = 350] = "Joystick1Button0";
    KeyCode[KeyCode["Joystick1Button1"] = 351] = "Joystick1Button1";
    KeyCode[KeyCode["Joystick1Button2"] = 352] = "Joystick1Button2";
    KeyCode[KeyCode["Joystick1Button3"] = 353] = "Joystick1Button3";
    KeyCode[KeyCode["Joystick1Button4"] = 354] = "Joystick1Button4";
    KeyCode[KeyCode["Joystick1Button5"] = 355] = "Joystick1Button5";
    KeyCode[KeyCode["Joystick1Button6"] = 356] = "Joystick1Button6";
    KeyCode[KeyCode["Joystick1Button7"] = 357] = "Joystick1Button7";
    KeyCode[KeyCode["Joystick1Button8"] = 358] = "Joystick1Button8";
    KeyCode[KeyCode["Joystick1Button9"] = 359] = "Joystick1Button9";
    KeyCode[KeyCode["Joystick1Button10"] = 360] = "Joystick1Button10";
    KeyCode[KeyCode["Joystick1Button11"] = 361] = "Joystick1Button11";
    KeyCode[KeyCode["Joystick1Button12"] = 362] = "Joystick1Button12";
    KeyCode[KeyCode["Joystick1Button13"] = 363] = "Joystick1Button13";
    KeyCode[KeyCode["Joystick1Button14"] = 364] = "Joystick1Button14";
    KeyCode[KeyCode["Joystick1Button15"] = 365] = "Joystick1Button15";
    KeyCode[KeyCode["Joystick1Button16"] = 366] = "Joystick1Button16";
    KeyCode[KeyCode["Joystick1Button17"] = 367] = "Joystick1Button17";
    KeyCode[KeyCode["Joystick1Button18"] = 368] = "Joystick1Button18";
    KeyCode[KeyCode["Joystick1Button19"] = 369] = "Joystick1Button19";
    KeyCode[KeyCode["Joystick2Button0"] = 370] = "Joystick2Button0";
    KeyCode[KeyCode["Joystick2Button1"] = 371] = "Joystick2Button1";
    KeyCode[KeyCode["Joystick2Button2"] = 372] = "Joystick2Button2";
    KeyCode[KeyCode["Joystick2Button3"] = 373] = "Joystick2Button3";
    KeyCode[KeyCode["Joystick2Button4"] = 374] = "Joystick2Button4";
    KeyCode[KeyCode["Joystick2Button5"] = 375] = "Joystick2Button5";
    KeyCode[KeyCode["Joystick2Button6"] = 376] = "Joystick2Button6";
    KeyCode[KeyCode["Joystick2Button7"] = 377] = "Joystick2Button7";
    KeyCode[KeyCode["Joystick2Button8"] = 378] = "Joystick2Button8";
    KeyCode[KeyCode["Joystick2Button9"] = 379] = "Joystick2Button9";
    KeyCode[KeyCode["Joystick2Button10"] = 380] = "Joystick2Button10";
    KeyCode[KeyCode["Joystick2Button11"] = 381] = "Joystick2Button11";
    KeyCode[KeyCode["Joystick2Button12"] = 382] = "Joystick2Button12";
    KeyCode[KeyCode["Joystick2Button13"] = 383] = "Joystick2Button13";
    KeyCode[KeyCode["Joystick2Button14"] = 384] = "Joystick2Button14";
    KeyCode[KeyCode["Joystick2Button15"] = 385] = "Joystick2Button15";
    KeyCode[KeyCode["Joystick2Button16"] = 386] = "Joystick2Button16";
    KeyCode[KeyCode["Joystick2Button17"] = 387] = "Joystick2Button17";
    KeyCode[KeyCode["Joystick2Button18"] = 388] = "Joystick2Button18";
    KeyCode[KeyCode["Joystick2Button19"] = 389] = "Joystick2Button19";
    KeyCode[KeyCode["Joystick3Button0"] = 390] = "Joystick3Button0";
    KeyCode[KeyCode["Joystick3Button1"] = 391] = "Joystick3Button1";
    KeyCode[KeyCode["Joystick3Button2"] = 392] = "Joystick3Button2";
    KeyCode[KeyCode["Joystick3Button3"] = 393] = "Joystick3Button3";
    KeyCode[KeyCode["Joystick3Button4"] = 394] = "Joystick3Button4";
    KeyCode[KeyCode["Joystick3Button5"] = 395] = "Joystick3Button5";
    KeyCode[KeyCode["Joystick3Button6"] = 396] = "Joystick3Button6";
    KeyCode[KeyCode["Joystick3Button7"] = 397] = "Joystick3Button7";
    KeyCode[KeyCode["Joystick3Button8"] = 398] = "Joystick3Button8";
    KeyCode[KeyCode["Joystick3Button9"] = 399] = "Joystick3Button9";
    KeyCode[KeyCode["Joystick3Button10"] = 400] = "Joystick3Button10";
    KeyCode[KeyCode["Joystick3Button11"] = 401] = "Joystick3Button11";
    KeyCode[KeyCode["Joystick3Button12"] = 402] = "Joystick3Button12";
    KeyCode[KeyCode["Joystick3Button13"] = 403] = "Joystick3Button13";
    KeyCode[KeyCode["Joystick3Button14"] = 404] = "Joystick3Button14";
    KeyCode[KeyCode["Joystick3Button15"] = 405] = "Joystick3Button15";
    KeyCode[KeyCode["Joystick3Button16"] = 406] = "Joystick3Button16";
    KeyCode[KeyCode["Joystick3Button17"] = 407] = "Joystick3Button17";
    KeyCode[KeyCode["Joystick3Button18"] = 408] = "Joystick3Button18";
    KeyCode[KeyCode["Joystick3Button19"] = 409] = "Joystick3Button19";
    KeyCode[KeyCode["Joystick4Button0"] = 410] = "Joystick4Button0";
    KeyCode[KeyCode["Joystick4Button1"] = 411] = "Joystick4Button1";
    KeyCode[KeyCode["Joystick4Button2"] = 412] = "Joystick4Button2";
    KeyCode[KeyCode["Joystick4Button3"] = 413] = "Joystick4Button3";
    KeyCode[KeyCode["Joystick4Button4"] = 414] = "Joystick4Button4";
    KeyCode[KeyCode["Joystick4Button5"] = 415] = "Joystick4Button5";
    KeyCode[KeyCode["Joystick4Button6"] = 416] = "Joystick4Button6";
    KeyCode[KeyCode["Joystick4Button7"] = 417] = "Joystick4Button7";
    KeyCode[KeyCode["Joystick4Button8"] = 418] = "Joystick4Button8";
    KeyCode[KeyCode["Joystick4Button9"] = 419] = "Joystick4Button9";
    KeyCode[KeyCode["Joystick4Button10"] = 420] = "Joystick4Button10";
    KeyCode[KeyCode["Joystick4Button11"] = 421] = "Joystick4Button11";
    KeyCode[KeyCode["Joystick4Button12"] = 422] = "Joystick4Button12";
    KeyCode[KeyCode["Joystick4Button13"] = 423] = "Joystick4Button13";
    KeyCode[KeyCode["Joystick4Button14"] = 424] = "Joystick4Button14";
    KeyCode[KeyCode["Joystick4Button15"] = 425] = "Joystick4Button15";
    KeyCode[KeyCode["Joystick4Button16"] = 426] = "Joystick4Button16";
    KeyCode[KeyCode["Joystick4Button17"] = 427] = "Joystick4Button17";
    KeyCode[KeyCode["Joystick4Button18"] = 428] = "Joystick4Button18";
    KeyCode[KeyCode["Joystick4Button19"] = 429] = "Joystick4Button19";
    KeyCode[KeyCode["Joystick5Button0"] = 430] = "Joystick5Button0";
    KeyCode[KeyCode["Joystick5Button1"] = 431] = "Joystick5Button1";
    KeyCode[KeyCode["Joystick5Button2"] = 432] = "Joystick5Button2";
    KeyCode[KeyCode["Joystick5Button3"] = 433] = "Joystick5Button3";
    KeyCode[KeyCode["Joystick5Button4"] = 434] = "Joystick5Button4";
    KeyCode[KeyCode["Joystick5Button5"] = 435] = "Joystick5Button5";
    KeyCode[KeyCode["Joystick5Button6"] = 436] = "Joystick5Button6";
    KeyCode[KeyCode["Joystick5Button7"] = 437] = "Joystick5Button7";
    KeyCode[KeyCode["Joystick5Button8"] = 438] = "Joystick5Button8";
    KeyCode[KeyCode["Joystick5Button9"] = 439] = "Joystick5Button9";
    KeyCode[KeyCode["Joystick5Button10"] = 440] = "Joystick5Button10";
    KeyCode[KeyCode["Joystick5Button11"] = 441] = "Joystick5Button11";
    KeyCode[KeyCode["Joystick5Button12"] = 442] = "Joystick5Button12";
    KeyCode[KeyCode["Joystick5Button13"] = 443] = "Joystick5Button13";
    KeyCode[KeyCode["Joystick5Button14"] = 444] = "Joystick5Button14";
    KeyCode[KeyCode["Joystick5Button15"] = 445] = "Joystick5Button15";
    KeyCode[KeyCode["Joystick5Button16"] = 446] = "Joystick5Button16";
    KeyCode[KeyCode["Joystick5Button17"] = 447] = "Joystick5Button17";
    KeyCode[KeyCode["Joystick5Button18"] = 448] = "Joystick5Button18";
    KeyCode[KeyCode["Joystick5Button19"] = 449] = "Joystick5Button19";
    KeyCode[KeyCode["Joystick6Button0"] = 450] = "Joystick6Button0";
    KeyCode[KeyCode["Joystick6Button1"] = 451] = "Joystick6Button1";
    KeyCode[KeyCode["Joystick6Button2"] = 452] = "Joystick6Button2";
    KeyCode[KeyCode["Joystick6Button3"] = 453] = "Joystick6Button3";
    KeyCode[KeyCode["Joystick6Button4"] = 454] = "Joystick6Button4";
    KeyCode[KeyCode["Joystick6Button5"] = 455] = "Joystick6Button5";
    KeyCode[KeyCode["Joystick6Button6"] = 456] = "Joystick6Button6";
    KeyCode[KeyCode["Joystick6Button7"] = 457] = "Joystick6Button7";
    KeyCode[KeyCode["Joystick6Button8"] = 458] = "Joystick6Button8";
    KeyCode[KeyCode["Joystick6Button9"] = 459] = "Joystick6Button9";
    KeyCode[KeyCode["Joystick6Button10"] = 460] = "Joystick6Button10";
    KeyCode[KeyCode["Joystick6Button11"] = 461] = "Joystick6Button11";
    KeyCode[KeyCode["Joystick6Button12"] = 462] = "Joystick6Button12";
    KeyCode[KeyCode["Joystick6Button13"] = 463] = "Joystick6Button13";
    KeyCode[KeyCode["Joystick6Button14"] = 464] = "Joystick6Button14";
    KeyCode[KeyCode["Joystick6Button15"] = 465] = "Joystick6Button15";
    KeyCode[KeyCode["Joystick6Button16"] = 466] = "Joystick6Button16";
    KeyCode[KeyCode["Joystick6Button17"] = 467] = "Joystick6Button17";
    KeyCode[KeyCode["Joystick6Button18"] = 468] = "Joystick6Button18";
    KeyCode[KeyCode["Joystick6Button19"] = 469] = "Joystick6Button19";
    KeyCode[KeyCode["Joystick7Button0"] = 470] = "Joystick7Button0";
    KeyCode[KeyCode["Joystick7Button1"] = 471] = "Joystick7Button1";
    KeyCode[KeyCode["Joystick7Button2"] = 472] = "Joystick7Button2";
    KeyCode[KeyCode["Joystick7Button3"] = 473] = "Joystick7Button3";
    KeyCode[KeyCode["Joystick7Button4"] = 474] = "Joystick7Button4";
    KeyCode[KeyCode["Joystick7Button5"] = 475] = "Joystick7Button5";
    KeyCode[KeyCode["Joystick7Button6"] = 476] = "Joystick7Button6";
    KeyCode[KeyCode["Joystick7Button7"] = 477] = "Joystick7Button7";
    KeyCode[KeyCode["Joystick7Button8"] = 478] = "Joystick7Button8";
    KeyCode[KeyCode["Joystick7Button9"] = 479] = "Joystick7Button9";
    KeyCode[KeyCode["Joystick7Button10"] = 480] = "Joystick7Button10";
    KeyCode[KeyCode["Joystick7Button11"] = 481] = "Joystick7Button11";
    KeyCode[KeyCode["Joystick7Button12"] = 482] = "Joystick7Button12";
    KeyCode[KeyCode["Joystick7Button13"] = 483] = "Joystick7Button13";
    KeyCode[KeyCode["Joystick7Button14"] = 484] = "Joystick7Button14";
    KeyCode[KeyCode["Joystick7Button15"] = 485] = "Joystick7Button15";
    KeyCode[KeyCode["Joystick7Button16"] = 486] = "Joystick7Button16";
    KeyCode[KeyCode["Joystick7Button17"] = 487] = "Joystick7Button17";
    KeyCode[KeyCode["Joystick7Button18"] = 488] = "Joystick7Button18";
    KeyCode[KeyCode["Joystick7Button19"] = 489] = "Joystick7Button19";
    KeyCode[KeyCode["Joystick8Button0"] = 490] = "Joystick8Button0";
    KeyCode[KeyCode["Joystick8Button1"] = 491] = "Joystick8Button1";
    KeyCode[KeyCode["Joystick8Button2"] = 492] = "Joystick8Button2";
    KeyCode[KeyCode["Joystick8Button3"] = 493] = "Joystick8Button3";
    KeyCode[KeyCode["Joystick8Button4"] = 494] = "Joystick8Button4";
    KeyCode[KeyCode["Joystick8Button5"] = 495] = "Joystick8Button5";
    KeyCode[KeyCode["Joystick8Button6"] = 496] = "Joystick8Button6";
    KeyCode[KeyCode["Joystick8Button7"] = 497] = "Joystick8Button7";
    KeyCode[KeyCode["Joystick8Button8"] = 498] = "Joystick8Button8";
    KeyCode[KeyCode["Joystick8Button9"] = 499] = "Joystick8Button9";
    KeyCode[KeyCode["Joystick8Button10"] = 500] = "Joystick8Button10";
    KeyCode[KeyCode["Joystick8Button11"] = 501] = "Joystick8Button11";
    KeyCode[KeyCode["Joystick8Button12"] = 502] = "Joystick8Button12";
    KeyCode[KeyCode["Joystick8Button13"] = 503] = "Joystick8Button13";
    KeyCode[KeyCode["Joystick8Button14"] = 504] = "Joystick8Button14";
    KeyCode[KeyCode["Joystick8Button15"] = 505] = "Joystick8Button15";
    KeyCode[KeyCode["Joystick8Button16"] = 506] = "Joystick8Button16";
    KeyCode[KeyCode["Joystick8Button17"] = 507] = "Joystick8Button17";
    KeyCode[KeyCode["Joystick8Button18"] = 508] = "Joystick8Button18";
    KeyCode[KeyCode["Joystick8Button19"] = 509] = "Joystick8Button19";
  })(KeyCode = UnityEngine.KeyCode || (UnityEngine.KeyCode = {}));

  var iPhoneScreenOrientation;

  (function (iPhoneScreenOrientation) {
    iPhoneScreenOrientation[iPhoneScreenOrientation["Unknown"] = 0] = "Unknown";
    iPhoneScreenOrientation[iPhoneScreenOrientation["Portrait"] = 1] = "Portrait";
    iPhoneScreenOrientation[iPhoneScreenOrientation["PortraitUpsideDown"] = 2] = "PortraitUpsideDown";
    iPhoneScreenOrientation[iPhoneScreenOrientation["LandscapeLeft"] = 3] = "LandscapeLeft";
    iPhoneScreenOrientation[iPhoneScreenOrientation["LandscapeRight"] = 4] = "LandscapeRight";
    iPhoneScreenOrientation[iPhoneScreenOrientation["AutoRotation"] = 5] = "AutoRotation";
    iPhoneScreenOrientation[iPhoneScreenOrientation["Landscape"] = 6] = "Landscape";
  })(iPhoneScreenOrientation = UnityEngine.iPhoneScreenOrientation || (UnityEngine.iPhoneScreenOrientation = {}));

  var iPhoneNetworkReachability;

  (function (iPhoneNetworkReachability) {
    iPhoneNetworkReachability[iPhoneNetworkReachability["NotReachable"] = 0] = "NotReachable";
    iPhoneNetworkReachability[iPhoneNetworkReachability["ReachableViaCarrierDataNetwork"] = 1] = "ReachableViaCarrierDataNetwork";
    iPhoneNetworkReachability[iPhoneNetworkReachability["ReachableViaWiFiNetwork"] = 2] = "ReachableViaWiFiNetwork";
  })(iPhoneNetworkReachability = UnityEngine.iPhoneNetworkReachability || (UnityEngine.iPhoneNetworkReachability = {}));

  var iPhoneGeneration;

  (function (iPhoneGeneration) {
    iPhoneGeneration[iPhoneGeneration["Unknown"] = 0] = "Unknown";
    iPhoneGeneration[iPhoneGeneration["iPhone"] = 1] = "iPhone";
    iPhoneGeneration[iPhoneGeneration["iPhone3G"] = 2] = "iPhone3G";
    iPhoneGeneration[iPhoneGeneration["iPhone3GS"] = 3] = "iPhone3GS";
    iPhoneGeneration[iPhoneGeneration["iPodTouch1Gen"] = 4] = "iPodTouch1Gen";
    iPhoneGeneration[iPhoneGeneration["iPodTouch2Gen"] = 5] = "iPodTouch2Gen";
    iPhoneGeneration[iPhoneGeneration["iPodTouch3Gen"] = 6] = "iPodTouch3Gen";
    iPhoneGeneration[iPhoneGeneration["iPad1Gen"] = 7] = "iPad1Gen";
    iPhoneGeneration[iPhoneGeneration["iPhone4"] = 8] = "iPhone4";
    iPhoneGeneration[iPhoneGeneration["iPodTouch4Gen"] = 9] = "iPodTouch4Gen";
    iPhoneGeneration[iPhoneGeneration["iPad2Gen"] = 10] = "iPad2Gen";
    iPhoneGeneration[iPhoneGeneration["iPhone4S"] = 11] = "iPhone4S";
    iPhoneGeneration[iPhoneGeneration["iPad3Gen"] = 12] = "iPad3Gen";
    iPhoneGeneration[iPhoneGeneration["iPhone5"] = 13] = "iPhone5";
    iPhoneGeneration[iPhoneGeneration["iPodTouch5Gen"] = 14] = "iPodTouch5Gen";
    iPhoneGeneration[iPhoneGeneration["iPadMini1Gen"] = 15] = "iPadMini1Gen";
    iPhoneGeneration[iPhoneGeneration["iPad4Gen"] = 16] = "iPad4Gen";
    iPhoneGeneration[iPhoneGeneration["iPhone5C"] = 17] = "iPhone5C";
    iPhoneGeneration[iPhoneGeneration["iPhone5S"] = 18] = "iPhone5S";
    iPhoneGeneration[iPhoneGeneration["iPhoneUnknown"] = 19] = "iPhoneUnknown";
    iPhoneGeneration[iPhoneGeneration["iPadUnknown"] = 20] = "iPadUnknown";
    iPhoneGeneration[iPhoneGeneration["iPodTouchUnknown"] = 21] = "iPodTouchUnknown";
  })(iPhoneGeneration = UnityEngine.iPhoneGeneration || (UnityEngine.iPhoneGeneration = {}));

  var iPhoneTouchPhase;

  (function (iPhoneTouchPhase) {
    iPhoneTouchPhase[iPhoneTouchPhase["Began"] = 0] = "Began";
    iPhoneTouchPhase[iPhoneTouchPhase["Moved"] = 1] = "Moved";
    iPhoneTouchPhase[iPhoneTouchPhase["Stationary"] = 2] = "Stationary";
    iPhoneTouchPhase[iPhoneTouchPhase["Ended"] = 3] = "Ended";
    iPhoneTouchPhase[iPhoneTouchPhase["Canceled"] = 4] = "Canceled";
  })(iPhoneTouchPhase = UnityEngine.iPhoneTouchPhase || (UnityEngine.iPhoneTouchPhase = {}));

  var iPhoneMovieControlMode;

  (function (iPhoneMovieControlMode) {
    iPhoneMovieControlMode[iPhoneMovieControlMode["Full"] = 0] = "Full";
    iPhoneMovieControlMode[iPhoneMovieControlMode["Minimal"] = 1] = "Minimal";
    iPhoneMovieControlMode[iPhoneMovieControlMode["CancelOnTouch"] = 2] = "CancelOnTouch";
    iPhoneMovieControlMode[iPhoneMovieControlMode["Hidden"] = 3] = "Hidden";
    iPhoneMovieControlMode[iPhoneMovieControlMode["VolumeOnly"] = 4] = "VolumeOnly";
  })(iPhoneMovieControlMode = UnityEngine.iPhoneMovieControlMode || (UnityEngine.iPhoneMovieControlMode = {}));

  var iPhoneMovieScalingMode;

  (function (iPhoneMovieScalingMode) {
    iPhoneMovieScalingMode[iPhoneMovieScalingMode["None"] = 0] = "None";
    iPhoneMovieScalingMode[iPhoneMovieScalingMode["AspectFit"] = 1] = "AspectFit";
    iPhoneMovieScalingMode[iPhoneMovieScalingMode["AspectFill"] = 2] = "AspectFill";
    iPhoneMovieScalingMode[iPhoneMovieScalingMode["Fill"] = 3] = "Fill";
  })(iPhoneMovieScalingMode = UnityEngine.iPhoneMovieScalingMode || (UnityEngine.iPhoneMovieScalingMode = {}));

  var iPhoneKeyboardType;

  (function (iPhoneKeyboardType) {
    iPhoneKeyboardType[iPhoneKeyboardType["Default"] = 0] = "Default";
    iPhoneKeyboardType[iPhoneKeyboardType["ASCIICapable"] = 1] = "ASCIICapable";
    iPhoneKeyboardType[iPhoneKeyboardType["NumbersAndPunctuation"] = 2] = "NumbersAndPunctuation";
    iPhoneKeyboardType[iPhoneKeyboardType["URL"] = 3] = "URL";
    iPhoneKeyboardType[iPhoneKeyboardType["NumberPad"] = 4] = "NumberPad";
    iPhoneKeyboardType[iPhoneKeyboardType["PhonePad"] = 5] = "PhonePad";
    iPhoneKeyboardType[iPhoneKeyboardType["NamePhonePad"] = 6] = "NamePhonePad";
    iPhoneKeyboardType[iPhoneKeyboardType["EmailAddress"] = 7] = "EmailAddress";
  })(iPhoneKeyboardType = UnityEngine.iPhoneKeyboardType || (UnityEngine.iPhoneKeyboardType = {}));

  var iPhoneOrientation;

  (function (iPhoneOrientation) {
    iPhoneOrientation[iPhoneOrientation["Unknown"] = 0] = "Unknown";
    iPhoneOrientation[iPhoneOrientation["Portrait"] = 1] = "Portrait";
    iPhoneOrientation[iPhoneOrientation["PortraitUpsideDown"] = 2] = "PortraitUpsideDown";
    iPhoneOrientation[iPhoneOrientation["LandscapeLeft"] = 3] = "LandscapeLeft";
    iPhoneOrientation[iPhoneOrientation["LandscapeRight"] = 4] = "LandscapeRight";
    iPhoneOrientation[iPhoneOrientation["FaceUp"] = 5] = "FaceUp";
    iPhoneOrientation[iPhoneOrientation["FaceDown"] = 6] = "FaceDown";
  })(iPhoneOrientation = UnityEngine.iPhoneOrientation || (UnityEngine.iPhoneOrientation = {}));

  var iOSActivityIndicatorStyle;

  (function (iOSActivityIndicatorStyle) {
    iOSActivityIndicatorStyle[iOSActivityIndicatorStyle["DontShow"] = 0] = "DontShow";
    iOSActivityIndicatorStyle[iOSActivityIndicatorStyle["WhiteLarge"] = 1] = "WhiteLarge";
    iOSActivityIndicatorStyle[iOSActivityIndicatorStyle["White"] = 2] = "White";
    iOSActivityIndicatorStyle[iOSActivityIndicatorStyle["Gray"] = 3] = "Gray";
  })(iOSActivityIndicatorStyle = UnityEngine.iOSActivityIndicatorStyle || (UnityEngine.iOSActivityIndicatorStyle = {}));

  var CalendarIdentifier;

  (function (CalendarIdentifier) {
    CalendarIdentifier[CalendarIdentifier["GregorianCalendar"] = 0] = "GregorianCalendar";
    CalendarIdentifier[CalendarIdentifier["BuddhistCalendar"] = 1] = "BuddhistCalendar";
    CalendarIdentifier[CalendarIdentifier["ChineseCalendar"] = 2] = "ChineseCalendar";
    CalendarIdentifier[CalendarIdentifier["HebrewCalendar"] = 3] = "HebrewCalendar";
    CalendarIdentifier[CalendarIdentifier["IslamicCalendar"] = 4] = "IslamicCalendar";
    CalendarIdentifier[CalendarIdentifier["IslamicCivilCalendar"] = 5] = "IslamicCivilCalendar";
    CalendarIdentifier[CalendarIdentifier["JapaneseCalendar"] = 6] = "JapaneseCalendar";
    CalendarIdentifier[CalendarIdentifier["RepublicOfChinaCalendar"] = 7] = "RepublicOfChinaCalendar";
    CalendarIdentifier[CalendarIdentifier["PersianCalendar"] = 8] = "PersianCalendar";
    CalendarIdentifier[CalendarIdentifier["IndianCalendar"] = 9] = "IndianCalendar";
    CalendarIdentifier[CalendarIdentifier["ISO8601Calendar"] = 10] = "ISO8601Calendar";
  })(CalendarIdentifier = UnityEngine.CalendarIdentifier || (UnityEngine.CalendarIdentifier = {}));

  var CalendarUnit;

  (function (CalendarUnit) {
    CalendarUnit[CalendarUnit["Era"] = 0] = "Era";
    CalendarUnit[CalendarUnit["Year"] = 1] = "Year";
    CalendarUnit[CalendarUnit["Month"] = 2] = "Month";
    CalendarUnit[CalendarUnit["Day"] = 3] = "Day";
    CalendarUnit[CalendarUnit["Hour"] = 4] = "Hour";
    CalendarUnit[CalendarUnit["Minute"] = 5] = "Minute";
    CalendarUnit[CalendarUnit["Second"] = 6] = "Second";
    CalendarUnit[CalendarUnit["Week"] = 7] = "Week";
    CalendarUnit[CalendarUnit["Weekday"] = 8] = "Weekday";
    CalendarUnit[CalendarUnit["WeekdayOrdinal"] = 9] = "WeekdayOrdinal";
    CalendarUnit[CalendarUnit["Quarter"] = 10] = "Quarter";
  })(CalendarUnit = UnityEngine.CalendarUnit || (UnityEngine.CalendarUnit = {}));

  var RemoteNotificationType;

  (function (RemoteNotificationType) {
    RemoteNotificationType[RemoteNotificationType["None"] = 0] = "None";
    RemoteNotificationType[RemoteNotificationType["Badge"] = 1] = "Badge";
    RemoteNotificationType[RemoteNotificationType["Sound"] = 2] = "Sound";
    RemoteNotificationType[RemoteNotificationType["Alert"] = 3] = "Alert";
  })(RemoteNotificationType = UnityEngine.RemoteNotificationType || (UnityEngine.RemoteNotificationType = {}));

  var ADBannerView_Layout;

  (function (ADBannerView_Layout) {
    ADBannerView_Layout[ADBannerView_Layout["Top"] = 0] = "Top";
    ADBannerView_Layout[ADBannerView_Layout["Bottom"] = 1] = "Bottom";
    ADBannerView_Layout[ADBannerView_Layout["TopLeft"] = 0] = "TopLeft";
    ADBannerView_Layout[ADBannerView_Layout["TopRight"] = 4] = "TopRight";
    ADBannerView_Layout[ADBannerView_Layout["TopCenter"] = 8] = "TopCenter";
    ADBannerView_Layout[ADBannerView_Layout["BottomLeft"] = 1] = "BottomLeft";
    ADBannerView_Layout[ADBannerView_Layout["BottomRight"] = 5] = "BottomRight";
    ADBannerView_Layout[ADBannerView_Layout["BottomCenter"] = 9] = "BottomCenter";
    ADBannerView_Layout[ADBannerView_Layout["CenterLeft"] = 2] = "CenterLeft";
    ADBannerView_Layout[ADBannerView_Layout["CenterRight"] = 6] = "CenterRight";
    ADBannerView_Layout[ADBannerView_Layout["Center"] = 10] = "Center";
    ADBannerView_Layout[ADBannerView_Layout["Manual"] = -1] = "Manual";
  })(ADBannerView_Layout = UnityEngine.ADBannerView_Layout || (UnityEngine.ADBannerView_Layout = {}));

  var ADBannerView_Type;

  (function (ADBannerView_Type) {
    ADBannerView_Type[ADBannerView_Type["Banner"] = 0] = "Banner";
    ADBannerView_Type[ADBannerView_Type["MediumRect"] = 1] = "MediumRect";
  })(ADBannerView_Type = UnityEngine.ADBannerView_Type || (UnityEngine.ADBannerView_Type = {}));

  var GradientMode;

  (function (GradientMode) {
    GradientMode[GradientMode["Blend"] = 0] = "Blend";
    GradientMode[GradientMode["Fixed"] = 1] = "Fixed";
  })(GradientMode = UnityEngine.GradientMode || (UnityEngine.GradientMode = {}));

  var RPCMode;

  (function (RPCMode) {})(RPCMode = UnityEngine.RPCMode || (UnityEngine.RPCMode = {}));

  var ConnectionTesterStatus;

  (function (ConnectionTesterStatus) {})(ConnectionTesterStatus = UnityEngine.ConnectionTesterStatus || (UnityEngine.ConnectionTesterStatus = {}));

  var NetworkConnectionError;

  (function (NetworkConnectionError) {})(NetworkConnectionError = UnityEngine.NetworkConnectionError || (UnityEngine.NetworkConnectionError = {}));

  var NetworkDisconnection;

  (function (NetworkDisconnection) {})(NetworkDisconnection = UnityEngine.NetworkDisconnection || (UnityEngine.NetworkDisconnection = {}));

  var MasterServerEvent;

  (function (MasterServerEvent) {})(MasterServerEvent = UnityEngine.MasterServerEvent || (UnityEngine.MasterServerEvent = {}));

  var NetworkStateSynchronization;

  (function (NetworkStateSynchronization) {})(NetworkStateSynchronization = UnityEngine.NetworkStateSynchronization || (UnityEngine.NetworkStateSynchronization = {}));

  var NetworkPeerType;

  (function (NetworkPeerType) {})(NetworkPeerType = UnityEngine.NetworkPeerType || (UnityEngine.NetworkPeerType = {}));

  var NetworkLogLevel;

  (function (NetworkLogLevel) {})(NetworkLogLevel = UnityEngine.NetworkLogLevel || (UnityEngine.NetworkLogLevel = {}));

  var RuntimeInitializeLoadType;

  (function (RuntimeInitializeLoadType) {
    RuntimeInitializeLoadType[RuntimeInitializeLoadType["AfterSceneLoad"] = 0] = "AfterSceneLoad";
    RuntimeInitializeLoadType[RuntimeInitializeLoadType["BeforeSceneLoad"] = 1] = "BeforeSceneLoad";
    RuntimeInitializeLoadType[RuntimeInitializeLoadType["AfterAssembliesLoaded"] = 2] = "AfterAssembliesLoaded";
    RuntimeInitializeLoadType[RuntimeInitializeLoadType["BeforeSplashScreen"] = 3] = "BeforeSplashScreen";
    RuntimeInitializeLoadType[RuntimeInitializeLoadType["SubsystemRegistration"] = 4] = "SubsystemRegistration";
  })(RuntimeInitializeLoadType = UnityEngine.RuntimeInitializeLoadType || (UnityEngine.RuntimeInitializeLoadType = {}));

  var HideFlags;

  (function (HideFlags) {
    HideFlags[HideFlags["None"] = 0] = "None";
    HideFlags[HideFlags["HideInHierarchy"] = 1] = "HideInHierarchy";
    HideFlags[HideFlags["HideInInspector"] = 2] = "HideInInspector";
    HideFlags[HideFlags["DontSaveInEditor"] = 4] = "DontSaveInEditor";
    HideFlags[HideFlags["NotEditable"] = 8] = "NotEditable";
    HideFlags[HideFlags["DontSaveInBuild"] = 16] = "DontSaveInBuild";
    HideFlags[HideFlags["DontUnloadUnusedAsset"] = 32] = "DontUnloadUnusedAsset";
    HideFlags[HideFlags["DontSave"] = 52] = "DontSave";
    HideFlags[HideFlags["HideAndDontSave"] = 61] = "HideAndDontSave";
  })(HideFlags = UnityEngine.HideFlags || (UnityEngine.HideFlags = {}));

  var SnapAxis;

  (function (SnapAxis) {
    SnapAxis[SnapAxis["None"] = 0] = "None";
    SnapAxis[SnapAxis["X"] = 1] = "X";
    SnapAxis[SnapAxis["Y"] = 2] = "Y";
    SnapAxis[SnapAxis["Z"] = 4] = "Z";
    SnapAxis[SnapAxis["All"] = 7] = "All";
  })(SnapAxis = UnityEngine.SnapAxis || (UnityEngine.SnapAxis = {}));

  var BatteryStatus;

  (function (BatteryStatus) {
    BatteryStatus[BatteryStatus["Unknown"] = 0] = "Unknown";
    BatteryStatus[BatteryStatus["Charging"] = 1] = "Charging";
    BatteryStatus[BatteryStatus["Discharging"] = 2] = "Discharging";
    BatteryStatus[BatteryStatus["NotCharging"] = 3] = "NotCharging";
    BatteryStatus[BatteryStatus["Full"] = 4] = "Full";
  })(BatteryStatus = UnityEngine.BatteryStatus || (UnityEngine.BatteryStatus = {}));

  var OperatingSystemFamily;

  (function (OperatingSystemFamily) {
    OperatingSystemFamily[OperatingSystemFamily["Other"] = 0] = "Other";
    OperatingSystemFamily[OperatingSystemFamily["MacOSX"] = 1] = "MacOSX";
    OperatingSystemFamily[OperatingSystemFamily["Windows"] = 2] = "Windows";
    OperatingSystemFamily[OperatingSystemFamily["Linux"] = 3] = "Linux";
  })(OperatingSystemFamily = UnityEngine.OperatingSystemFamily || (UnityEngine.OperatingSystemFamily = {}));

  var DeviceType;

  (function (DeviceType) {
    DeviceType[DeviceType["Unknown"] = 0] = "Unknown";
    DeviceType[DeviceType["Handheld"] = 1] = "Handheld";
    DeviceType[DeviceType["Console"] = 2] = "Console";
    DeviceType[DeviceType["Desktop"] = 3] = "Desktop";
  })(DeviceType = UnityEngine.DeviceType || (UnityEngine.DeviceType = {}));

  var TouchScreenKeyboard_Status;

  (function (TouchScreenKeyboard_Status) {
    TouchScreenKeyboard_Status[TouchScreenKeyboard_Status["Visible"] = 0] = "Visible";
    TouchScreenKeyboard_Status[TouchScreenKeyboard_Status["Done"] = 1] = "Done";
    TouchScreenKeyboard_Status[TouchScreenKeyboard_Status["Canceled"] = 2] = "Canceled";
    TouchScreenKeyboard_Status[TouchScreenKeyboard_Status["LostFocus"] = 3] = "LostFocus";
  })(TouchScreenKeyboard_Status = UnityEngine.TouchScreenKeyboard_Status || (UnityEngine.TouchScreenKeyboard_Status = {}));

  var TouchScreenKeyboardType;

  (function (TouchScreenKeyboardType) {
    TouchScreenKeyboardType[TouchScreenKeyboardType["Default"] = 0] = "Default";
    TouchScreenKeyboardType[TouchScreenKeyboardType["ASCIICapable"] = 1] = "ASCIICapable";
    TouchScreenKeyboardType[TouchScreenKeyboardType["NumbersAndPunctuation"] = 2] = "NumbersAndPunctuation";
    TouchScreenKeyboardType[TouchScreenKeyboardType["URL"] = 3] = "URL";
    TouchScreenKeyboardType[TouchScreenKeyboardType["NumberPad"] = 4] = "NumberPad";
    TouchScreenKeyboardType[TouchScreenKeyboardType["PhonePad"] = 5] = "PhonePad";
    TouchScreenKeyboardType[TouchScreenKeyboardType["NamePhonePad"] = 6] = "NamePhonePad";
    TouchScreenKeyboardType[TouchScreenKeyboardType["EmailAddress"] = 7] = "EmailAddress";
    TouchScreenKeyboardType[TouchScreenKeyboardType["NintendoNetworkAccount"] = 8] = "NintendoNetworkAccount";
    TouchScreenKeyboardType[TouchScreenKeyboardType["Social"] = 9] = "Social";
    TouchScreenKeyboardType[TouchScreenKeyboardType["Search"] = 10] = "Search";
    TouchScreenKeyboardType[TouchScreenKeyboardType["DecimalPad"] = 11] = "DecimalPad";
    TouchScreenKeyboardType[TouchScreenKeyboardType["OneTimeCode"] = 12] = "OneTimeCode";
  })(TouchScreenKeyboardType = UnityEngine.TouchScreenKeyboardType || (UnityEngine.TouchScreenKeyboardType = {}));

  var DrivenTransformProperties;

  (function (DrivenTransformProperties) {
    DrivenTransformProperties[DrivenTransformProperties["None"] = 0] = "None";
    DrivenTransformProperties[DrivenTransformProperties["All"] = -1] = "All";
    DrivenTransformProperties[DrivenTransformProperties["AnchoredPositionX"] = 2] = "AnchoredPositionX";
    DrivenTransformProperties[DrivenTransformProperties["AnchoredPositionY"] = 4] = "AnchoredPositionY";
    DrivenTransformProperties[DrivenTransformProperties["AnchoredPositionZ"] = 8] = "AnchoredPositionZ";
    DrivenTransformProperties[DrivenTransformProperties["Rotation"] = 16] = "Rotation";
    DrivenTransformProperties[DrivenTransformProperties["ScaleX"] = 32] = "ScaleX";
    DrivenTransformProperties[DrivenTransformProperties["ScaleY"] = 64] = "ScaleY";
    DrivenTransformProperties[DrivenTransformProperties["ScaleZ"] = 128] = "ScaleZ";
    DrivenTransformProperties[DrivenTransformProperties["AnchorMinX"] = 256] = "AnchorMinX";
    DrivenTransformProperties[DrivenTransformProperties["AnchorMinY"] = 512] = "AnchorMinY";
    DrivenTransformProperties[DrivenTransformProperties["AnchorMaxX"] = 1024] = "AnchorMaxX";
    DrivenTransformProperties[DrivenTransformProperties["AnchorMaxY"] = 2048] = "AnchorMaxY";
    DrivenTransformProperties[DrivenTransformProperties["SizeDeltaX"] = 4096] = "SizeDeltaX";
    DrivenTransformProperties[DrivenTransformProperties["SizeDeltaY"] = 8192] = "SizeDeltaY";
    DrivenTransformProperties[DrivenTransformProperties["PivotX"] = 16384] = "PivotX";
    DrivenTransformProperties[DrivenTransformProperties["PivotY"] = 32768] = "PivotY";
    DrivenTransformProperties[DrivenTransformProperties["AnchoredPosition"] = 6] = "AnchoredPosition";
    DrivenTransformProperties[DrivenTransformProperties["AnchoredPosition3D"] = 14] = "AnchoredPosition3D";
    DrivenTransformProperties[DrivenTransformProperties["Scale"] = 224] = "Scale";
    DrivenTransformProperties[DrivenTransformProperties["AnchorMin"] = 768] = "AnchorMin";
    DrivenTransformProperties[DrivenTransformProperties["AnchorMax"] = 3072] = "AnchorMax";
    DrivenTransformProperties[DrivenTransformProperties["Anchors"] = 3840] = "Anchors";
    DrivenTransformProperties[DrivenTransformProperties["SizeDelta"] = 12288] = "SizeDelta";
    DrivenTransformProperties[DrivenTransformProperties["Pivot"] = 49152] = "Pivot";
  })(DrivenTransformProperties = UnityEngine.DrivenTransformProperties || (UnityEngine.DrivenTransformProperties = {}));

  var RectTransform_Edge;

  (function (RectTransform_Edge) {
    RectTransform_Edge[RectTransform_Edge["Left"] = 0] = "Left";
    RectTransform_Edge[RectTransform_Edge["Right"] = 1] = "Right";
    RectTransform_Edge[RectTransform_Edge["Top"] = 2] = "Top";
    RectTransform_Edge[RectTransform_Edge["Bottom"] = 3] = "Bottom";
  })(RectTransform_Edge = UnityEngine.RectTransform_Edge || (UnityEngine.RectTransform_Edge = {}));

  var RectTransform_Axis;

  (function (RectTransform_Axis) {
    RectTransform_Axis[RectTransform_Axis["Horizontal"] = 0] = "Horizontal";
    RectTransform_Axis[RectTransform_Axis["Vertical"] = 1] = "Vertical";
  })(RectTransform_Axis = UnityEngine.RectTransform_Axis || (UnityEngine.RectTransform_Axis = {}));

  var SpriteDrawMode;

  (function (SpriteDrawMode) {
    SpriteDrawMode[SpriteDrawMode["Simple"] = 0] = "Simple";
    SpriteDrawMode[SpriteDrawMode["Sliced"] = 1] = "Sliced";
    SpriteDrawMode[SpriteDrawMode["Tiled"] = 2] = "Tiled";
  })(SpriteDrawMode = UnityEngine.SpriteDrawMode || (UnityEngine.SpriteDrawMode = {}));

  var SpriteTileMode;

  (function (SpriteTileMode) {
    SpriteTileMode[SpriteTileMode["Continuous"] = 0] = "Continuous";
    SpriteTileMode[SpriteTileMode["Adaptive"] = 1] = "Adaptive";
  })(SpriteTileMode = UnityEngine.SpriteTileMode || (UnityEngine.SpriteTileMode = {}));

  var SpriteMaskInteraction;

  (function (SpriteMaskInteraction) {
    SpriteMaskInteraction[SpriteMaskInteraction["None"] = 0] = "None";
    SpriteMaskInteraction[SpriteMaskInteraction["VisibleInsideMask"] = 1] = "VisibleInsideMask";
    SpriteMaskInteraction[SpriteMaskInteraction["VisibleOutsideMask"] = 2] = "VisibleOutsideMask";
  })(SpriteMaskInteraction = UnityEngine.SpriteMaskInteraction || (UnityEngine.SpriteMaskInteraction = {}));

  var SpriteMeshType;

  (function (SpriteMeshType) {
    SpriteMeshType[SpriteMeshType["FullRect"] = 0] = "FullRect";
    SpriteMeshType[SpriteMeshType["Tight"] = 1] = "Tight";
  })(SpriteMeshType = UnityEngine.SpriteMeshType || (UnityEngine.SpriteMeshType = {}));

  var SpriteAlignment;

  (function (SpriteAlignment) {
    SpriteAlignment[SpriteAlignment["Center"] = 0] = "Center";
    SpriteAlignment[SpriteAlignment["TopLeft"] = 1] = "TopLeft";
    SpriteAlignment[SpriteAlignment["TopCenter"] = 2] = "TopCenter";
    SpriteAlignment[SpriteAlignment["TopRight"] = 3] = "TopRight";
    SpriteAlignment[SpriteAlignment["LeftCenter"] = 4] = "LeftCenter";
    SpriteAlignment[SpriteAlignment["RightCenter"] = 5] = "RightCenter";
    SpriteAlignment[SpriteAlignment["BottomLeft"] = 6] = "BottomLeft";
    SpriteAlignment[SpriteAlignment["BottomCenter"] = 7] = "BottomCenter";
    SpriteAlignment[SpriteAlignment["BottomRight"] = 8] = "BottomRight";
    SpriteAlignment[SpriteAlignment["Custom"] = 9] = "Custom";
  })(SpriteAlignment = UnityEngine.SpriteAlignment || (UnityEngine.SpriteAlignment = {}));

  var SpritePackingMode;

  (function (SpritePackingMode) {
    SpritePackingMode[SpritePackingMode["Tight"] = 0] = "Tight";
    SpritePackingMode[SpritePackingMode["Rectangle"] = 1] = "Rectangle";
  })(SpritePackingMode = UnityEngine.SpritePackingMode || (UnityEngine.SpritePackingMode = {}));

  var SpritePackingRotation;

  (function (SpritePackingRotation) {
    SpritePackingRotation[SpritePackingRotation["None"] = 0] = "None";
    SpritePackingRotation[SpritePackingRotation["FlipHorizontal"] = 1] = "FlipHorizontal";
    SpritePackingRotation[SpritePackingRotation["FlipVertical"] = 2] = "FlipVertical";
    SpritePackingRotation[SpritePackingRotation["Rotate180"] = 3] = "Rotate180";
    SpritePackingRotation[SpritePackingRotation["Any"] = 15] = "Any";
  })(SpritePackingRotation = UnityEngine.SpritePackingRotation || (UnityEngine.SpritePackingRotation = {}));

  var SpriteSortPoint;

  (function (SpriteSortPoint) {
    SpriteSortPoint[SpriteSortPoint["Center"] = 0] = "Center";
    SpriteSortPoint[SpriteSortPoint["Pivot"] = 1] = "Pivot";
  })(SpriteSortPoint = UnityEngine.SpriteSortPoint || (UnityEngine.SpriteSortPoint = {}));

  var AudioSpeakerMode;

  (function (AudioSpeakerMode) {
    AudioSpeakerMode[AudioSpeakerMode["Raw"] = 0] = "Raw";
    AudioSpeakerMode[AudioSpeakerMode["Mono"] = 1] = "Mono";
    AudioSpeakerMode[AudioSpeakerMode["Stereo"] = 2] = "Stereo";
    AudioSpeakerMode[AudioSpeakerMode["Quad"] = 3] = "Quad";
    AudioSpeakerMode[AudioSpeakerMode["Surround"] = 4] = "Surround";
    AudioSpeakerMode[AudioSpeakerMode["Mode5point1"] = 5] = "Mode5point1";
    AudioSpeakerMode[AudioSpeakerMode["Mode7point1"] = 6] = "Mode7point1";
    AudioSpeakerMode[AudioSpeakerMode["Prologic"] = 7] = "Prologic";
  })(AudioSpeakerMode = UnityEngine.AudioSpeakerMode || (UnityEngine.AudioSpeakerMode = {}));

  var AudioDataLoadState;

  (function (AudioDataLoadState) {
    AudioDataLoadState[AudioDataLoadState["Unloaded"] = 0] = "Unloaded";
    AudioDataLoadState[AudioDataLoadState["Loading"] = 1] = "Loading";
    AudioDataLoadState[AudioDataLoadState["Loaded"] = 2] = "Loaded";
    AudioDataLoadState[AudioDataLoadState["Failed"] = 3] = "Failed";
  })(AudioDataLoadState = UnityEngine.AudioDataLoadState || (UnityEngine.AudioDataLoadState = {}));

  var AudioCompressionFormat;

  (function (AudioCompressionFormat) {
    AudioCompressionFormat[AudioCompressionFormat["PCM"] = 0] = "PCM";
    AudioCompressionFormat[AudioCompressionFormat["Vorbis"] = 1] = "Vorbis";
    AudioCompressionFormat[AudioCompressionFormat["ADPCM"] = 2] = "ADPCM";
    AudioCompressionFormat[AudioCompressionFormat["MP3"] = 3] = "MP3";
    AudioCompressionFormat[AudioCompressionFormat["VAG"] = 4] = "VAG";
    AudioCompressionFormat[AudioCompressionFormat["HEVAG"] = 5] = "HEVAG";
    AudioCompressionFormat[AudioCompressionFormat["XMA"] = 6] = "XMA";
    AudioCompressionFormat[AudioCompressionFormat["AAC"] = 7] = "AAC";
    AudioCompressionFormat[AudioCompressionFormat["GCADPCM"] = 8] = "GCADPCM";
    AudioCompressionFormat[AudioCompressionFormat["ATRAC9"] = 9] = "ATRAC9";
  })(AudioCompressionFormat = UnityEngine.AudioCompressionFormat || (UnityEngine.AudioCompressionFormat = {}));

  var AudioClipLoadType;

  (function (AudioClipLoadType) {
    AudioClipLoadType[AudioClipLoadType["DecompressOnLoad"] = 0] = "DecompressOnLoad";
    AudioClipLoadType[AudioClipLoadType["CompressedInMemory"] = 1] = "CompressedInMemory";
    AudioClipLoadType[AudioClipLoadType["Streaming"] = 2] = "Streaming";
  })(AudioClipLoadType = UnityEngine.AudioClipLoadType || (UnityEngine.AudioClipLoadType = {}));

  var AudioVelocityUpdateMode;

  (function (AudioVelocityUpdateMode) {
    AudioVelocityUpdateMode[AudioVelocityUpdateMode["Auto"] = 0] = "Auto";
    AudioVelocityUpdateMode[AudioVelocityUpdateMode["Fixed"] = 1] = "Fixed";
    AudioVelocityUpdateMode[AudioVelocityUpdateMode["Dynamic"] = 2] = "Dynamic";
  })(AudioVelocityUpdateMode = UnityEngine.AudioVelocityUpdateMode || (UnityEngine.AudioVelocityUpdateMode = {}));

  var FFTWindow;

  (function (FFTWindow) {
    FFTWindow[FFTWindow["Rectangular"] = 0] = "Rectangular";
    FFTWindow[FFTWindow["Triangle"] = 1] = "Triangle";
    FFTWindow[FFTWindow["Hamming"] = 2] = "Hamming";
    FFTWindow[FFTWindow["Hanning"] = 3] = "Hanning";
    FFTWindow[FFTWindow["Blackman"] = 4] = "Blackman";
    FFTWindow[FFTWindow["BlackmanHarris"] = 5] = "BlackmanHarris";
  })(FFTWindow = UnityEngine.FFTWindow || (UnityEngine.FFTWindow = {}));

  var AudioRolloffMode;

  (function (AudioRolloffMode) {
    AudioRolloffMode[AudioRolloffMode["Logarithmic"] = 0] = "Logarithmic";
    AudioRolloffMode[AudioRolloffMode["Linear"] = 1] = "Linear";
    AudioRolloffMode[AudioRolloffMode["Custom"] = 2] = "Custom";
  })(AudioRolloffMode = UnityEngine.AudioRolloffMode || (UnityEngine.AudioRolloffMode = {}));

  var AudioSourceCurveType;

  (function (AudioSourceCurveType) {
    AudioSourceCurveType[AudioSourceCurveType["CustomRolloff"] = 0] = "CustomRolloff";
    AudioSourceCurveType[AudioSourceCurveType["SpatialBlend"] = 1] = "SpatialBlend";
    AudioSourceCurveType[AudioSourceCurveType["ReverbZoneMix"] = 2] = "ReverbZoneMix";
    AudioSourceCurveType[AudioSourceCurveType["Spread"] = 3] = "Spread";
  })(AudioSourceCurveType = UnityEngine.AudioSourceCurveType || (UnityEngine.AudioSourceCurveType = {}));

  var AudioReverbPreset;

  (function (AudioReverbPreset) {
    AudioReverbPreset[AudioReverbPreset["Off"] = 0] = "Off";
    AudioReverbPreset[AudioReverbPreset["Generic"] = 1] = "Generic";
    AudioReverbPreset[AudioReverbPreset["PaddedCell"] = 2] = "PaddedCell";
    AudioReverbPreset[AudioReverbPreset["Room"] = 3] = "Room";
    AudioReverbPreset[AudioReverbPreset["Bathroom"] = 4] = "Bathroom";
    AudioReverbPreset[AudioReverbPreset["Livingroom"] = 5] = "Livingroom";
    AudioReverbPreset[AudioReverbPreset["Stoneroom"] = 6] = "Stoneroom";
    AudioReverbPreset[AudioReverbPreset["Auditorium"] = 7] = "Auditorium";
    AudioReverbPreset[AudioReverbPreset["Concerthall"] = 8] = "Concerthall";
    AudioReverbPreset[AudioReverbPreset["Cave"] = 9] = "Cave";
    AudioReverbPreset[AudioReverbPreset["Arena"] = 10] = "Arena";
    AudioReverbPreset[AudioReverbPreset["Hangar"] = 11] = "Hangar";
    AudioReverbPreset[AudioReverbPreset["CarpetedHallway"] = 12] = "CarpetedHallway";
    AudioReverbPreset[AudioReverbPreset["Hallway"] = 13] = "Hallway";
    AudioReverbPreset[AudioReverbPreset["StoneCorridor"] = 14] = "StoneCorridor";
    AudioReverbPreset[AudioReverbPreset["Alley"] = 15] = "Alley";
    AudioReverbPreset[AudioReverbPreset["Forest"] = 16] = "Forest";
    AudioReverbPreset[AudioReverbPreset["City"] = 17] = "City";
    AudioReverbPreset[AudioReverbPreset["Mountains"] = 18] = "Mountains";
    AudioReverbPreset[AudioReverbPreset["Quarry"] = 19] = "Quarry";
    AudioReverbPreset[AudioReverbPreset["Plain"] = 20] = "Plain";
    AudioReverbPreset[AudioReverbPreset["ParkingLot"] = 21] = "ParkingLot";
    AudioReverbPreset[AudioReverbPreset["SewerPipe"] = 22] = "SewerPipe";
    AudioReverbPreset[AudioReverbPreset["Underwater"] = 23] = "Underwater";
    AudioReverbPreset[AudioReverbPreset["Drugged"] = 24] = "Drugged";
    AudioReverbPreset[AudioReverbPreset["Dizzy"] = 25] = "Dizzy";
    AudioReverbPreset[AudioReverbPreset["Psychotic"] = 26] = "Psychotic";
    AudioReverbPreset[AudioReverbPreset["User"] = 27] = "User";
  })(AudioReverbPreset = UnityEngine.AudioReverbPreset || (UnityEngine.AudioReverbPreset = {}));

  var WebCamFlags;

  (function (WebCamFlags) {
    WebCamFlags[WebCamFlags["FrontFacing"] = 1] = "FrontFacing";
    WebCamFlags[WebCamFlags["AutoFocusPointSupported"] = 2] = "AutoFocusPointSupported";
  })(WebCamFlags = UnityEngine.WebCamFlags || (UnityEngine.WebCamFlags = {}));

  var WebCamKind;

  (function (WebCamKind) {
    WebCamKind[WebCamKind["WideAngle"] = 1] = "WideAngle";
    WebCamKind[WebCamKind["Telephoto"] = 2] = "Telephoto";
    WebCamKind[WebCamKind["ColorAndDepth"] = 3] = "ColorAndDepth";
    WebCamKind[WebCamKind["UltraWideAngle"] = 4] = "UltraWideAngle";
  })(WebCamKind = UnityEngine.WebCamKind || (UnityEngine.WebCamKind = {}));

  var RenderMode;

  (function (RenderMode) {
    RenderMode[RenderMode["ScreenSpaceOverlay"] = 0] = "ScreenSpaceOverlay";
    RenderMode[RenderMode["ScreenSpaceCamera"] = 1] = "ScreenSpaceCamera";
    RenderMode[RenderMode["WorldSpace"] = 2] = "WorldSpace";
  })(RenderMode = UnityEngine.RenderMode || (UnityEngine.RenderMode = {}));

  var AdditionalCanvasShaderChannels;

  (function (AdditionalCanvasShaderChannels) {
    AdditionalCanvasShaderChannels[AdditionalCanvasShaderChannels["None"] = 0] = "None";
    AdditionalCanvasShaderChannels[AdditionalCanvasShaderChannels["TexCoord1"] = 1] = "TexCoord1";
    AdditionalCanvasShaderChannels[AdditionalCanvasShaderChannels["TexCoord2"] = 2] = "TexCoord2";
    AdditionalCanvasShaderChannels[AdditionalCanvasShaderChannels["TexCoord3"] = 4] = "TexCoord3";
    AdditionalCanvasShaderChannels[AdditionalCanvasShaderChannels["Normal"] = 8] = "Normal";
    AdditionalCanvasShaderChannels[AdditionalCanvasShaderChannels["Tangent"] = 16] = "Tangent";
  })(AdditionalCanvasShaderChannels = UnityEngine.AdditionalCanvasShaderChannels || (UnityEngine.AdditionalCanvasShaderChannels = {}));

  var UISystemProfilerApi_SampleType;

  (function (UISystemProfilerApi_SampleType) {
    UISystemProfilerApi_SampleType[UISystemProfilerApi_SampleType["Layout"] = 0] = "Layout";
    UISystemProfilerApi_SampleType[UISystemProfilerApi_SampleType["Render"] = 1] = "Render";
  })(UISystemProfilerApi_SampleType = UnityEngine.UISystemProfilerApi_SampleType || (UnityEngine.UISystemProfilerApi_SampleType = {}));

  var FontStyle;

  (function (FontStyle) {
    FontStyle[FontStyle["Normal"] = 0] = "Normal";
    FontStyle[FontStyle["Bold"] = 1] = "Bold";
    FontStyle[FontStyle["Italic"] = 2] = "Italic";
    FontStyle[FontStyle["BoldAndItalic"] = 3] = "BoldAndItalic";
  })(FontStyle = UnityEngine.FontStyle || (UnityEngine.FontStyle = {}));

  var TextAlignment;

  (function (TextAlignment) {
    TextAlignment[TextAlignment["Left"] = 0] = "Left";
    TextAlignment[TextAlignment["Center"] = 1] = "Center";
    TextAlignment[TextAlignment["Right"] = 2] = "Right";
  })(TextAlignment = UnityEngine.TextAlignment || (UnityEngine.TextAlignment = {}));

  var TextAnchor;

  (function (TextAnchor) {
    TextAnchor[TextAnchor["UpperLeft"] = 0] = "UpperLeft";
    TextAnchor[TextAnchor["UpperCenter"] = 1] = "UpperCenter";
    TextAnchor[TextAnchor["UpperRight"] = 2] = "UpperRight";
    TextAnchor[TextAnchor["MiddleLeft"] = 3] = "MiddleLeft";
    TextAnchor[TextAnchor["MiddleCenter"] = 4] = "MiddleCenter";
    TextAnchor[TextAnchor["MiddleRight"] = 5] = "MiddleRight";
    TextAnchor[TextAnchor["LowerLeft"] = 6] = "LowerLeft";
    TextAnchor[TextAnchor["LowerCenter"] = 7] = "LowerCenter";
    TextAnchor[TextAnchor["LowerRight"] = 8] = "LowerRight";
  })(TextAnchor = UnityEngine.TextAnchor || (UnityEngine.TextAnchor = {}));

  var HorizontalWrapMode;

  (function (HorizontalWrapMode) {
    HorizontalWrapMode[HorizontalWrapMode["Wrap"] = 0] = "Wrap";
    HorizontalWrapMode[HorizontalWrapMode["Overflow"] = 1] = "Overflow";
  })(HorizontalWrapMode = UnityEngine.HorizontalWrapMode || (UnityEngine.HorizontalWrapMode = {}));

  var VerticalWrapMode;

  (function (VerticalWrapMode) {
    VerticalWrapMode[VerticalWrapMode["Truncate"] = 0] = "Truncate";
    VerticalWrapMode[VerticalWrapMode["Overflow"] = 1] = "Overflow";
  })(VerticalWrapMode = UnityEngine.VerticalWrapMode || (UnityEngine.VerticalWrapMode = {}));

  var TouchPhase;

  (function (TouchPhase) {
    TouchPhase[TouchPhase["Began"] = 0] = "Began";
    TouchPhase[TouchPhase["Moved"] = 1] = "Moved";
    TouchPhase[TouchPhase["Stationary"] = 2] = "Stationary";
    TouchPhase[TouchPhase["Ended"] = 3] = "Ended";
    TouchPhase[TouchPhase["Canceled"] = 4] = "Canceled";
  })(TouchPhase = UnityEngine.TouchPhase || (UnityEngine.TouchPhase = {}));

  var IMECompositionMode;

  (function (IMECompositionMode) {
    IMECompositionMode[IMECompositionMode["Auto"] = 0] = "Auto";
    IMECompositionMode[IMECompositionMode["On"] = 1] = "On";
    IMECompositionMode[IMECompositionMode["Off"] = 2] = "Off";
  })(IMECompositionMode = UnityEngine.IMECompositionMode || (UnityEngine.IMECompositionMode = {}));

  var TouchType;

  (function (TouchType) {
    TouchType[TouchType["Direct"] = 0] = "Direct";
    TouchType[TouchType["Indirect"] = 1] = "Indirect";
    TouchType[TouchType["Stylus"] = 2] = "Stylus";
  })(TouchType = UnityEngine.TouchType || (UnityEngine.TouchType = {}));

  var DeviceOrientation;

  (function (DeviceOrientation) {
    DeviceOrientation[DeviceOrientation["Unknown"] = 0] = "Unknown";
    DeviceOrientation[DeviceOrientation["Portrait"] = 1] = "Portrait";
    DeviceOrientation[DeviceOrientation["PortraitUpsideDown"] = 2] = "PortraitUpsideDown";
    DeviceOrientation[DeviceOrientation["LandscapeLeft"] = 3] = "LandscapeLeft";
    DeviceOrientation[DeviceOrientation["LandscapeRight"] = 4] = "LandscapeRight";
    DeviceOrientation[DeviceOrientation["FaceUp"] = 5] = "FaceUp";
    DeviceOrientation[DeviceOrientation["FaceDown"] = 6] = "FaceDown";
  })(DeviceOrientation = UnityEngine.DeviceOrientation || (UnityEngine.DeviceOrientation = {}));

  var LocationServiceStatus;

  (function (LocationServiceStatus) {
    LocationServiceStatus[LocationServiceStatus["Stopped"] = 0] = "Stopped";
    LocationServiceStatus[LocationServiceStatus["Initializing"] = 1] = "Initializing";
    LocationServiceStatus[LocationServiceStatus["Running"] = 2] = "Running";
    LocationServiceStatus[LocationServiceStatus["Failed"] = 3] = "Failed";
  })(LocationServiceStatus = UnityEngine.LocationServiceStatus || (UnityEngine.LocationServiceStatus = {}));

  var PlayMode;

  (function (PlayMode) {
    PlayMode[PlayMode["StopSameLayer"] = 0] = "StopSameLayer";
    PlayMode[PlayMode["StopAll"] = 4] = "StopAll";
  })(PlayMode = UnityEngine.PlayMode || (UnityEngine.PlayMode = {}));

  var QueueMode;

  (function (QueueMode) {
    QueueMode[QueueMode["CompleteOthers"] = 0] = "CompleteOthers";
    QueueMode[QueueMode["PlayNow"] = 2] = "PlayNow";
  })(QueueMode = UnityEngine.QueueMode || (UnityEngine.QueueMode = {}));

  var AnimationBlendMode;

  (function (AnimationBlendMode) {
    AnimationBlendMode[AnimationBlendMode["Blend"] = 0] = "Blend";
    AnimationBlendMode[AnimationBlendMode["Additive"] = 1] = "Additive";
  })(AnimationBlendMode = UnityEngine.AnimationBlendMode || (UnityEngine.AnimationBlendMode = {}));

  var AnimationPlayMode;

  (function (AnimationPlayMode) {
    AnimationPlayMode[AnimationPlayMode["Stop"] = 0] = "Stop";
    AnimationPlayMode[AnimationPlayMode["Queue"] = 1] = "Queue";
    AnimationPlayMode[AnimationPlayMode["Mix"] = 2] = "Mix";
  })(AnimationPlayMode = UnityEngine.AnimationPlayMode || (UnityEngine.AnimationPlayMode = {}));

  var AnimationCullingType;

  (function (AnimationCullingType) {
    AnimationCullingType[AnimationCullingType["AlwaysAnimate"] = 0] = "AlwaysAnimate";
    AnimationCullingType[AnimationCullingType["BasedOnRenderers"] = 1] = "BasedOnRenderers";
    AnimationCullingType[AnimationCullingType["BasedOnClipBounds"] = 2] = "BasedOnClipBounds";
    AnimationCullingType[AnimationCullingType["BasedOnUserBounds"] = 3] = "BasedOnUserBounds";
  })(AnimationCullingType = UnityEngine.AnimationCullingType || (UnityEngine.AnimationCullingType = {}));

  var AvatarTarget;

  (function (AvatarTarget) {
    AvatarTarget[AvatarTarget["Root"] = 0] = "Root";
    AvatarTarget[AvatarTarget["Body"] = 1] = "Body";
    AvatarTarget[AvatarTarget["LeftFoot"] = 2] = "LeftFoot";
    AvatarTarget[AvatarTarget["RightFoot"] = 3] = "RightFoot";
    AvatarTarget[AvatarTarget["LeftHand"] = 4] = "LeftHand";
    AvatarTarget[AvatarTarget["RightHand"] = 5] = "RightHand";
  })(AvatarTarget = UnityEngine.AvatarTarget || (UnityEngine.AvatarTarget = {}));

  var AvatarIKGoal;

  (function (AvatarIKGoal) {
    AvatarIKGoal[AvatarIKGoal["LeftFoot"] = 0] = "LeftFoot";
    AvatarIKGoal[AvatarIKGoal["RightFoot"] = 1] = "RightFoot";
    AvatarIKGoal[AvatarIKGoal["LeftHand"] = 2] = "LeftHand";
    AvatarIKGoal[AvatarIKGoal["RightHand"] = 3] = "RightHand";
  })(AvatarIKGoal = UnityEngine.AvatarIKGoal || (UnityEngine.AvatarIKGoal = {}));

  var AvatarIKHint;

  (function (AvatarIKHint) {
    AvatarIKHint[AvatarIKHint["LeftKnee"] = 0] = "LeftKnee";
    AvatarIKHint[AvatarIKHint["RightKnee"] = 1] = "RightKnee";
    AvatarIKHint[AvatarIKHint["LeftElbow"] = 2] = "LeftElbow";
    AvatarIKHint[AvatarIKHint["RightElbow"] = 3] = "RightElbow";
  })(AvatarIKHint = UnityEngine.AvatarIKHint || (UnityEngine.AvatarIKHint = {}));

  var AnimatorControllerParameterType;

  (function (AnimatorControllerParameterType) {
    AnimatorControllerParameterType[AnimatorControllerParameterType["Float"] = 1] = "Float";
    AnimatorControllerParameterType[AnimatorControllerParameterType["Int"] = 3] = "Int";
    AnimatorControllerParameterType[AnimatorControllerParameterType["Bool"] = 4] = "Bool";
    AnimatorControllerParameterType[AnimatorControllerParameterType["Trigger"] = 9] = "Trigger";
  })(AnimatorControllerParameterType = UnityEngine.AnimatorControllerParameterType || (UnityEngine.AnimatorControllerParameterType = {}));

  var AnimatorRecorderMode;

  (function (AnimatorRecorderMode) {
    AnimatorRecorderMode[AnimatorRecorderMode["Offline"] = 0] = "Offline";
    AnimatorRecorderMode[AnimatorRecorderMode["Playback"] = 1] = "Playback";
    AnimatorRecorderMode[AnimatorRecorderMode["Record"] = 2] = "Record";
  })(AnimatorRecorderMode = UnityEngine.AnimatorRecorderMode || (UnityEngine.AnimatorRecorderMode = {}));

  var DurationUnit;

  (function (DurationUnit) {
    DurationUnit[DurationUnit["Fixed"] = 0] = "Fixed";
    DurationUnit[DurationUnit["Normalized"] = 1] = "Normalized";
  })(DurationUnit = UnityEngine.DurationUnit || (UnityEngine.DurationUnit = {}));

  var AnimatorCullingMode;

  (function (AnimatorCullingMode) {
    AnimatorCullingMode[AnimatorCullingMode["AlwaysAnimate"] = 0] = "AlwaysAnimate";
    AnimatorCullingMode[AnimatorCullingMode["CullUpdateTransforms"] = 1] = "CullUpdateTransforms";
    AnimatorCullingMode[AnimatorCullingMode["CullCompletely"] = 2] = "CullCompletely";
    AnimatorCullingMode[AnimatorCullingMode["BasedOnRenderers"] = 1] = "BasedOnRenderers";
  })(AnimatorCullingMode = UnityEngine.AnimatorCullingMode || (UnityEngine.AnimatorCullingMode = {}));

  var AnimatorUpdateMode;

  (function (AnimatorUpdateMode) {
    AnimatorUpdateMode[AnimatorUpdateMode["Normal"] = 0] = "Normal";
    AnimatorUpdateMode[AnimatorUpdateMode["AnimatePhysics"] = 1] = "AnimatePhysics";
    AnimatorUpdateMode[AnimatorUpdateMode["UnscaledTime"] = 2] = "UnscaledTime";
  })(AnimatorUpdateMode = UnityEngine.AnimatorUpdateMode || (UnityEngine.AnimatorUpdateMode = {}));

  var BodyDof;

  (function (BodyDof) {
    BodyDof[BodyDof["SpineFrontBack"] = 0] = "SpineFrontBack";
    BodyDof[BodyDof["SpineLeftRight"] = 1] = "SpineLeftRight";
    BodyDof[BodyDof["SpineRollLeftRight"] = 2] = "SpineRollLeftRight";
    BodyDof[BodyDof["ChestFrontBack"] = 3] = "ChestFrontBack";
    BodyDof[BodyDof["ChestLeftRight"] = 4] = "ChestLeftRight";
    BodyDof[BodyDof["ChestRollLeftRight"] = 5] = "ChestRollLeftRight";
    BodyDof[BodyDof["UpperChestFrontBack"] = 6] = "UpperChestFrontBack";
    BodyDof[BodyDof["UpperChestLeftRight"] = 7] = "UpperChestLeftRight";
    BodyDof[BodyDof["UpperChestRollLeftRight"] = 8] = "UpperChestRollLeftRight";
    BodyDof[BodyDof["LastBodyDof"] = 9] = "LastBodyDof";
  })(BodyDof = UnityEngine.BodyDof || (UnityEngine.BodyDof = {}));

  var HeadDof;

  (function (HeadDof) {
    HeadDof[HeadDof["NeckFrontBack"] = 0] = "NeckFrontBack";
    HeadDof[HeadDof["NeckLeftRight"] = 1] = "NeckLeftRight";
    HeadDof[HeadDof["NeckRollLeftRight"] = 2] = "NeckRollLeftRight";
    HeadDof[HeadDof["HeadFrontBack"] = 3] = "HeadFrontBack";
    HeadDof[HeadDof["HeadLeftRight"] = 4] = "HeadLeftRight";
    HeadDof[HeadDof["HeadRollLeftRight"] = 5] = "HeadRollLeftRight";
    HeadDof[HeadDof["LeftEyeDownUp"] = 6] = "LeftEyeDownUp";
    HeadDof[HeadDof["LeftEyeInOut"] = 7] = "LeftEyeInOut";
    HeadDof[HeadDof["RightEyeDownUp"] = 8] = "RightEyeDownUp";
    HeadDof[HeadDof["RightEyeInOut"] = 9] = "RightEyeInOut";
    HeadDof[HeadDof["JawDownUp"] = 10] = "JawDownUp";
    HeadDof[HeadDof["JawLeftRight"] = 11] = "JawLeftRight";
    HeadDof[HeadDof["LastHeadDof"] = 12] = "LastHeadDof";
  })(HeadDof = UnityEngine.HeadDof || (UnityEngine.HeadDof = {}));

  var LegDof;

  (function (LegDof) {
    LegDof[LegDof["UpperLegFrontBack"] = 0] = "UpperLegFrontBack";
    LegDof[LegDof["UpperLegInOut"] = 1] = "UpperLegInOut";
    LegDof[LegDof["UpperLegRollInOut"] = 2] = "UpperLegRollInOut";
    LegDof[LegDof["LegCloseOpen"] = 3] = "LegCloseOpen";
    LegDof[LegDof["LegRollInOut"] = 4] = "LegRollInOut";
    LegDof[LegDof["FootCloseOpen"] = 5] = "FootCloseOpen";
    LegDof[LegDof["FootInOut"] = 6] = "FootInOut";
    LegDof[LegDof["ToesUpDown"] = 7] = "ToesUpDown";
    LegDof[LegDof["LastLegDof"] = 8] = "LastLegDof";
  })(LegDof = UnityEngine.LegDof || (UnityEngine.LegDof = {}));

  var ArmDof;

  (function (ArmDof) {
    ArmDof[ArmDof["ShoulderDownUp"] = 0] = "ShoulderDownUp";
    ArmDof[ArmDof["ShoulderFrontBack"] = 1] = "ShoulderFrontBack";
    ArmDof[ArmDof["ArmDownUp"] = 2] = "ArmDownUp";
    ArmDof[ArmDof["ArmFrontBack"] = 3] = "ArmFrontBack";
    ArmDof[ArmDof["ArmRollInOut"] = 4] = "ArmRollInOut";
    ArmDof[ArmDof["ForeArmCloseOpen"] = 5] = "ForeArmCloseOpen";
    ArmDof[ArmDof["ForeArmRollInOut"] = 6] = "ForeArmRollInOut";
    ArmDof[ArmDof["HandDownUp"] = 7] = "HandDownUp";
    ArmDof[ArmDof["HandInOut"] = 8] = "HandInOut";
    ArmDof[ArmDof["LastArmDof"] = 9] = "LastArmDof";
  })(ArmDof = UnityEngine.ArmDof || (UnityEngine.ArmDof = {}));

  var FingerDof;

  (function (FingerDof) {
    FingerDof[FingerDof["ProximalDownUp"] = 0] = "ProximalDownUp";
    FingerDof[FingerDof["ProximalInOut"] = 1] = "ProximalInOut";
    FingerDof[FingerDof["IntermediateCloseOpen"] = 2] = "IntermediateCloseOpen";
    FingerDof[FingerDof["DistalCloseOpen"] = 3] = "DistalCloseOpen";
    FingerDof[FingerDof["LastFingerDof"] = 4] = "LastFingerDof";
  })(FingerDof = UnityEngine.FingerDof || (UnityEngine.FingerDof = {}));

  var HumanPartDof;

  (function (HumanPartDof) {
    HumanPartDof[HumanPartDof["Body"] = 0] = "Body";
    HumanPartDof[HumanPartDof["Head"] = 1] = "Head";
    HumanPartDof[HumanPartDof["LeftLeg"] = 2] = "LeftLeg";
    HumanPartDof[HumanPartDof["RightLeg"] = 3] = "RightLeg";
    HumanPartDof[HumanPartDof["LeftArm"] = 4] = "LeftArm";
    HumanPartDof[HumanPartDof["RightArm"] = 5] = "RightArm";
    HumanPartDof[HumanPartDof["LeftThumb"] = 6] = "LeftThumb";
    HumanPartDof[HumanPartDof["LeftIndex"] = 7] = "LeftIndex";
    HumanPartDof[HumanPartDof["LeftMiddle"] = 8] = "LeftMiddle";
    HumanPartDof[HumanPartDof["LeftRing"] = 9] = "LeftRing";
    HumanPartDof[HumanPartDof["LeftLittle"] = 10] = "LeftLittle";
    HumanPartDof[HumanPartDof["RightThumb"] = 11] = "RightThumb";
    HumanPartDof[HumanPartDof["RightIndex"] = 12] = "RightIndex";
    HumanPartDof[HumanPartDof["RightMiddle"] = 13] = "RightMiddle";
    HumanPartDof[HumanPartDof["RightRing"] = 14] = "RightRing";
    HumanPartDof[HumanPartDof["RightLittle"] = 15] = "RightLittle";
    HumanPartDof[HumanPartDof["LastHumanPartDof"] = 16] = "LastHumanPartDof";
  })(HumanPartDof = UnityEngine.HumanPartDof || (UnityEngine.HumanPartDof = {}));

  var HumanBodyBones;

  (function (HumanBodyBones) {
    HumanBodyBones[HumanBodyBones["Hips"] = 0] = "Hips";
    HumanBodyBones[HumanBodyBones["LeftUpperLeg"] = 1] = "LeftUpperLeg";
    HumanBodyBones[HumanBodyBones["RightUpperLeg"] = 2] = "RightUpperLeg";
    HumanBodyBones[HumanBodyBones["LeftLowerLeg"] = 3] = "LeftLowerLeg";
    HumanBodyBones[HumanBodyBones["RightLowerLeg"] = 4] = "RightLowerLeg";
    HumanBodyBones[HumanBodyBones["LeftFoot"] = 5] = "LeftFoot";
    HumanBodyBones[HumanBodyBones["RightFoot"] = 6] = "RightFoot";
    HumanBodyBones[HumanBodyBones["Spine"] = 7] = "Spine";
    HumanBodyBones[HumanBodyBones["Chest"] = 8] = "Chest";
    HumanBodyBones[HumanBodyBones["UpperChest"] = 54] = "UpperChest";
    HumanBodyBones[HumanBodyBones["Neck"] = 9] = "Neck";
    HumanBodyBones[HumanBodyBones["Head"] = 10] = "Head";
    HumanBodyBones[HumanBodyBones["LeftShoulder"] = 11] = "LeftShoulder";
    HumanBodyBones[HumanBodyBones["RightShoulder"] = 12] = "RightShoulder";
    HumanBodyBones[HumanBodyBones["LeftUpperArm"] = 13] = "LeftUpperArm";
    HumanBodyBones[HumanBodyBones["RightUpperArm"] = 14] = "RightUpperArm";
    HumanBodyBones[HumanBodyBones["LeftLowerArm"] = 15] = "LeftLowerArm";
    HumanBodyBones[HumanBodyBones["RightLowerArm"] = 16] = "RightLowerArm";
    HumanBodyBones[HumanBodyBones["LeftHand"] = 17] = "LeftHand";
    HumanBodyBones[HumanBodyBones["RightHand"] = 18] = "RightHand";
    HumanBodyBones[HumanBodyBones["LeftToes"] = 19] = "LeftToes";
    HumanBodyBones[HumanBodyBones["RightToes"] = 20] = "RightToes";
    HumanBodyBones[HumanBodyBones["LeftEye"] = 21] = "LeftEye";
    HumanBodyBones[HumanBodyBones["RightEye"] = 22] = "RightEye";
    HumanBodyBones[HumanBodyBones["Jaw"] = 23] = "Jaw";
    HumanBodyBones[HumanBodyBones["LeftThumbProximal"] = 24] = "LeftThumbProximal";
    HumanBodyBones[HumanBodyBones["LeftThumbIntermediate"] = 25] = "LeftThumbIntermediate";
    HumanBodyBones[HumanBodyBones["LeftThumbDistal"] = 26] = "LeftThumbDistal";
    HumanBodyBones[HumanBodyBones["LeftIndexProximal"] = 27] = "LeftIndexProximal";
    HumanBodyBones[HumanBodyBones["LeftIndexIntermediate"] = 28] = "LeftIndexIntermediate";
    HumanBodyBones[HumanBodyBones["LeftIndexDistal"] = 29] = "LeftIndexDistal";
    HumanBodyBones[HumanBodyBones["LeftMiddleProximal"] = 30] = "LeftMiddleProximal";
    HumanBodyBones[HumanBodyBones["LeftMiddleIntermediate"] = 31] = "LeftMiddleIntermediate";
    HumanBodyBones[HumanBodyBones["LeftMiddleDistal"] = 32] = "LeftMiddleDistal";
    HumanBodyBones[HumanBodyBones["LeftRingProximal"] = 33] = "LeftRingProximal";
    HumanBodyBones[HumanBodyBones["LeftRingIntermediate"] = 34] = "LeftRingIntermediate";
    HumanBodyBones[HumanBodyBones["LeftRingDistal"] = 35] = "LeftRingDistal";
    HumanBodyBones[HumanBodyBones["LeftLittleProximal"] = 36] = "LeftLittleProximal";
    HumanBodyBones[HumanBodyBones["LeftLittleIntermediate"] = 37] = "LeftLittleIntermediate";
    HumanBodyBones[HumanBodyBones["LeftLittleDistal"] = 38] = "LeftLittleDistal";
    HumanBodyBones[HumanBodyBones["RightThumbProximal"] = 39] = "RightThumbProximal";
    HumanBodyBones[HumanBodyBones["RightThumbIntermediate"] = 40] = "RightThumbIntermediate";
    HumanBodyBones[HumanBodyBones["RightThumbDistal"] = 41] = "RightThumbDistal";
    HumanBodyBones[HumanBodyBones["RightIndexProximal"] = 42] = "RightIndexProximal";
    HumanBodyBones[HumanBodyBones["RightIndexIntermediate"] = 43] = "RightIndexIntermediate";
    HumanBodyBones[HumanBodyBones["RightIndexDistal"] = 44] = "RightIndexDistal";
    HumanBodyBones[HumanBodyBones["RightMiddleProximal"] = 45] = "RightMiddleProximal";
    HumanBodyBones[HumanBodyBones["RightMiddleIntermediate"] = 46] = "RightMiddleIntermediate";
    HumanBodyBones[HumanBodyBones["RightMiddleDistal"] = 47] = "RightMiddleDistal";
    HumanBodyBones[HumanBodyBones["RightRingProximal"] = 48] = "RightRingProximal";
    HumanBodyBones[HumanBodyBones["RightRingIntermediate"] = 49] = "RightRingIntermediate";
    HumanBodyBones[HumanBodyBones["RightRingDistal"] = 50] = "RightRingDistal";
    HumanBodyBones[HumanBodyBones["RightLittleProximal"] = 51] = "RightLittleProximal";
    HumanBodyBones[HumanBodyBones["RightLittleIntermediate"] = 52] = "RightLittleIntermediate";
    HumanBodyBones[HumanBodyBones["RightLittleDistal"] = 53] = "RightLittleDistal";
    HumanBodyBones[HumanBodyBones["LastBone"] = 55] = "LastBone";
  })(HumanBodyBones = UnityEngine.HumanBodyBones || (UnityEngine.HumanBodyBones = {}));

  var AvatarMaskBodyPart;

  (function (AvatarMaskBodyPart) {
    AvatarMaskBodyPart[AvatarMaskBodyPart["Root"] = 0] = "Root";
    AvatarMaskBodyPart[AvatarMaskBodyPart["Body"] = 1] = "Body";
    AvatarMaskBodyPart[AvatarMaskBodyPart["Head"] = 2] = "Head";
    AvatarMaskBodyPart[AvatarMaskBodyPart["LeftLeg"] = 3] = "LeftLeg";
    AvatarMaskBodyPart[AvatarMaskBodyPart["RightLeg"] = 4] = "RightLeg";
    AvatarMaskBodyPart[AvatarMaskBodyPart["LeftArm"] = 5] = "LeftArm";
    AvatarMaskBodyPart[AvatarMaskBodyPart["RightArm"] = 6] = "RightArm";
    AvatarMaskBodyPart[AvatarMaskBodyPart["LeftFingers"] = 7] = "LeftFingers";
    AvatarMaskBodyPart[AvatarMaskBodyPart["RightFingers"] = 8] = "RightFingers";
    AvatarMaskBodyPart[AvatarMaskBodyPart["LeftFootIK"] = 9] = "LeftFootIK";
    AvatarMaskBodyPart[AvatarMaskBodyPart["RightFootIK"] = 10] = "RightFootIK";
    AvatarMaskBodyPart[AvatarMaskBodyPart["LeftHandIK"] = 11] = "LeftHandIK";
    AvatarMaskBodyPart[AvatarMaskBodyPart["RightHandIK"] = 12] = "RightHandIK";
    AvatarMaskBodyPart[AvatarMaskBodyPart["LastBodyPart"] = 13] = "LastBodyPart";
  })(AvatarMaskBodyPart = UnityEngine.AvatarMaskBodyPart || (UnityEngine.AvatarMaskBodyPart = {}));

  var EventType;

  (function (EventType) {
    EventType[EventType["MouseDown"] = 0] = "MouseDown";
    EventType[EventType["MouseUp"] = 1] = "MouseUp";
    EventType[EventType["MouseMove"] = 2] = "MouseMove";
    EventType[EventType["MouseDrag"] = 3] = "MouseDrag";
    EventType[EventType["KeyDown"] = 4] = "KeyDown";
    EventType[EventType["KeyUp"] = 5] = "KeyUp";
    EventType[EventType["ScrollWheel"] = 6] = "ScrollWheel";
    EventType[EventType["Repaint"] = 7] = "Repaint";
    EventType[EventType["Layout"] = 8] = "Layout";
    EventType[EventType["DragUpdated"] = 9] = "DragUpdated";
    EventType[EventType["DragPerform"] = 10] = "DragPerform";
    EventType[EventType["DragExited"] = 15] = "DragExited";
    EventType[EventType["Ignore"] = 11] = "Ignore";
    EventType[EventType["Used"] = 12] = "Used";
    EventType[EventType["ValidateCommand"] = 13] = "ValidateCommand";
    EventType[EventType["ExecuteCommand"] = 14] = "ExecuteCommand";
    EventType[EventType["ContextClick"] = 16] = "ContextClick";
    EventType[EventType["MouseEnterWindow"] = 20] = "MouseEnterWindow";
    EventType[EventType["MouseLeaveWindow"] = 21] = "MouseLeaveWindow";
    EventType[EventType["TouchDown"] = 30] = "TouchDown";
    EventType[EventType["TouchUp"] = 31] = "TouchUp";
    EventType[EventType["TouchMove"] = 32] = "TouchMove";
    EventType[EventType["TouchEnter"] = 33] = "TouchEnter";
    EventType[EventType["TouchLeave"] = 34] = "TouchLeave";
    EventType[EventType["TouchStationary"] = 35] = "TouchStationary";
    EventType[EventType["mouseDown"] = 0] = "mouseDown";
    EventType[EventType["mouseUp"] = 1] = "mouseUp";
    EventType[EventType["mouseMove"] = 2] = "mouseMove";
    EventType[EventType["mouseDrag"] = 3] = "mouseDrag";
    EventType[EventType["keyDown"] = 4] = "keyDown";
    EventType[EventType["keyUp"] = 5] = "keyUp";
    EventType[EventType["scrollWheel"] = 6] = "scrollWheel";
    EventType[EventType["repaint"] = 7] = "repaint";
    EventType[EventType["layout"] = 8] = "layout";
    EventType[EventType["dragUpdated"] = 9] = "dragUpdated";
    EventType[EventType["dragPerform"] = 10] = "dragPerform";
    EventType[EventType["ignore"] = 11] = "ignore";
    EventType[EventType["used"] = 12] = "used";
  })(EventType = UnityEngine.EventType || (UnityEngine.EventType = {}));

  var EventModifiers;

  (function (EventModifiers) {
    EventModifiers[EventModifiers["None"] = 0] = "None";
    EventModifiers[EventModifiers["Shift"] = 1] = "Shift";
    EventModifiers[EventModifiers["Control"] = 2] = "Control";
    EventModifiers[EventModifiers["Alt"] = 4] = "Alt";
    EventModifiers[EventModifiers["Command"] = 8] = "Command";
    EventModifiers[EventModifiers["Numeric"] = 16] = "Numeric";
    EventModifiers[EventModifiers["CapsLock"] = 32] = "CapsLock";
    EventModifiers[EventModifiers["FunctionKey"] = 64] = "FunctionKey";
  })(EventModifiers = UnityEngine.EventModifiers || (UnityEngine.EventModifiers = {}));

  var PointerType;

  (function (PointerType) {
    PointerType[PointerType["Mouse"] = 0] = "Mouse";
    PointerType[PointerType["Touch"] = 1] = "Touch";
    PointerType[PointerType["Pen"] = 2] = "Pen";
  })(PointerType = UnityEngine.PointerType || (UnityEngine.PointerType = {}));

  var GUI_ToolbarButtonSize;

  (function (GUI_ToolbarButtonSize) {
    GUI_ToolbarButtonSize[GUI_ToolbarButtonSize["Fixed"] = 0] = "Fixed";
    GUI_ToolbarButtonSize[GUI_ToolbarButtonSize["FitToContents"] = 1] = "FitToContents";
  })(GUI_ToolbarButtonSize = UnityEngine.GUI_ToolbarButtonSize || (UnityEngine.GUI_ToolbarButtonSize = {}));

  var ScaleMode;

  (function (ScaleMode) {
    ScaleMode[ScaleMode["StretchToFill"] = 0] = "StretchToFill";
    ScaleMode[ScaleMode["ScaleAndCrop"] = 1] = "ScaleAndCrop";
    ScaleMode[ScaleMode["ScaleToFit"] = 2] = "ScaleToFit";
  })(ScaleMode = UnityEngine.ScaleMode || (UnityEngine.ScaleMode = {}));

  var FocusType;

  (function (FocusType) {
    FocusType[FocusType["Native"] = 0] = "Native";
    FocusType[FocusType["Keyboard"] = 1] = "Keyboard";
    FocusType[FocusType["Passive"] = 2] = "Passive";
  })(FocusType = UnityEngine.FocusType || (UnityEngine.FocusType = {}));

  var ImagePosition;

  (function (ImagePosition) {
    ImagePosition[ImagePosition["ImageLeft"] = 0] = "ImageLeft";
    ImagePosition[ImagePosition["ImageAbove"] = 1] = "ImageAbove";
    ImagePosition[ImagePosition["ImageOnly"] = 2] = "ImageOnly";
    ImagePosition[ImagePosition["TextOnly"] = 3] = "TextOnly";
  })(ImagePosition = UnityEngine.ImagePosition || (UnityEngine.ImagePosition = {}));

  var TextClipping;

  (function (TextClipping) {
    TextClipping[TextClipping["Overflow"] = 0] = "Overflow";
    TextClipping[TextClipping["Clip"] = 1] = "Clip";
  })(TextClipping = UnityEngine.TextClipping || (UnityEngine.TextClipping = {}));

  var TextEditor_DblClickSnapping;

  (function (TextEditor_DblClickSnapping) {
    TextEditor_DblClickSnapping[TextEditor_DblClickSnapping["WORDS"] = 0] = "WORDS";
    TextEditor_DblClickSnapping[TextEditor_DblClickSnapping["PARAGRAPHS"] = 1] = "PARAGRAPHS";
  })(TextEditor_DblClickSnapping = UnityEngine.TextEditor_DblClickSnapping || (UnityEngine.TextEditor_DblClickSnapping = {}));

  var Animations;

  (function (Animations) {
    var AimConstraint_WorldUpType;

    (function (AimConstraint_WorldUpType) {
      AimConstraint_WorldUpType[AimConstraint_WorldUpType["SceneUp"] = 0] = "SceneUp";
      AimConstraint_WorldUpType[AimConstraint_WorldUpType["ObjectUp"] = 1] = "ObjectUp";
      AimConstraint_WorldUpType[AimConstraint_WorldUpType["ObjectRotationUp"] = 2] = "ObjectRotationUp";
      AimConstraint_WorldUpType[AimConstraint_WorldUpType["Vector"] = 3] = "Vector";
      AimConstraint_WorldUpType[AimConstraint_WorldUpType["None"] = 4] = "None";
    })(AimConstraint_WorldUpType = Animations.AimConstraint_WorldUpType || (Animations.AimConstraint_WorldUpType = {}));

    var CustomStreamPropertyType;

    (function (CustomStreamPropertyType) {
      CustomStreamPropertyType[CustomStreamPropertyType["Float"] = 5] = "Float";
      CustomStreamPropertyType[CustomStreamPropertyType["Bool"] = 6] = "Bool";
      CustomStreamPropertyType[CustomStreamPropertyType["Int"] = 10] = "Int";
    })(CustomStreamPropertyType = Animations.CustomStreamPropertyType || (Animations.CustomStreamPropertyType = {}));

    var Axis;

    (function (Axis) {
      Axis[Axis["None"] = 0] = "None";
      Axis[Axis["X"] = 1] = "X";
      Axis[Axis["Y"] = 2] = "Y";
      Axis[Axis["Z"] = 4] = "Z";
    })(Axis = Animations.Axis || (Animations.Axis = {}));
  })(Animations = UnityEngine.Animations || (UnityEngine.Animations = {}));

  var Apple;

  (function (Apple) {
    var FrameCaptureDestination;

    (function (FrameCaptureDestination) {
      FrameCaptureDestination[FrameCaptureDestination["DevTools"] = 1] = "DevTools";
      FrameCaptureDestination[FrameCaptureDestination["GPUTraceDocument"] = 2] = "GPUTraceDocument";
    })(FrameCaptureDestination = Apple.FrameCaptureDestination || (Apple.FrameCaptureDestination = {}));
  })(Apple = UnityEngine.Apple || (UnityEngine.Apple = {}));

  var Audio;

  (function (Audio) {
    var AudioMixerUpdateMode;

    (function (AudioMixerUpdateMode) {
      AudioMixerUpdateMode[AudioMixerUpdateMode["Normal"] = 0] = "Normal";
      AudioMixerUpdateMode[AudioMixerUpdateMode["UnscaledTime"] = 1] = "UnscaledTime";
    })(AudioMixerUpdateMode = Audio.AudioMixerUpdateMode || (Audio.AudioMixerUpdateMode = {}));
  })(Audio = UnityEngine.Audio || (UnityEngine.Audio = {}));

  var Diagnostics;

  (function (Diagnostics) {
    var ForcedCrashCategory;

    (function (ForcedCrashCategory) {
      ForcedCrashCategory[ForcedCrashCategory["AccessViolation"] = 0] = "AccessViolation";
      ForcedCrashCategory[ForcedCrashCategory["FatalError"] = 1] = "FatalError";
      ForcedCrashCategory[ForcedCrashCategory["Abort"] = 2] = "Abort";
      ForcedCrashCategory[ForcedCrashCategory["PureVirtualFunction"] = 3] = "PureVirtualFunction";
      ForcedCrashCategory[ForcedCrashCategory["MonoAbort"] = 4] = "MonoAbort";
    })(ForcedCrashCategory = Diagnostics.ForcedCrashCategory || (Diagnostics.ForcedCrashCategory = {}));
  })(Diagnostics = UnityEngine.Diagnostics || (UnityEngine.Diagnostics = {}));

  var Events;

  (function (Events) {
    var PersistentListenerMode;

    (function (PersistentListenerMode) {
      PersistentListenerMode[PersistentListenerMode["EventDefined"] = 0] = "EventDefined";
      PersistentListenerMode[PersistentListenerMode["Void"] = 1] = "Void";
      PersistentListenerMode[PersistentListenerMode["Object"] = 2] = "Object";
      PersistentListenerMode[PersistentListenerMode["Int"] = 3] = "Int";
      PersistentListenerMode[PersistentListenerMode["Float"] = 4] = "Float";
      PersistentListenerMode[PersistentListenerMode["String"] = 5] = "String";
      PersistentListenerMode[PersistentListenerMode["Bool"] = 6] = "Bool";
    })(PersistentListenerMode = Events.PersistentListenerMode || (Events.PersistentListenerMode = {}));

    var UnityEventCallState;

    (function (UnityEventCallState) {
      UnityEventCallState[UnityEventCallState["Off"] = 0] = "Off";
      UnityEventCallState[UnityEventCallState["EditorAndRuntime"] = 1] = "EditorAndRuntime";
      UnityEventCallState[UnityEventCallState["RuntimeOnly"] = 2] = "RuntimeOnly";
    })(UnityEventCallState = Events.UnityEventCallState || (Events.UnityEventCallState = {}));
  })(Events = UnityEngine.Events || (UnityEngine.Events = {}));

  var EventSystems;

  (function (EventSystems) {
    var EventHandle;

    (function (EventHandle) {
      EventHandle[EventHandle["Unused"] = 0] = "Unused";
      EventHandle[EventHandle["Used"] = 1] = "Used";
    })(EventHandle = EventSystems.EventHandle || (EventSystems.EventHandle = {}));

    var EventTriggerType;

    (function (EventTriggerType) {
      EventTriggerType[EventTriggerType["PointerEnter"] = 0] = "PointerEnter";
      EventTriggerType[EventTriggerType["PointerExit"] = 1] = "PointerExit";
      EventTriggerType[EventTriggerType["PointerDown"] = 2] = "PointerDown";
      EventTriggerType[EventTriggerType["PointerUp"] = 3] = "PointerUp";
      EventTriggerType[EventTriggerType["PointerClick"] = 4] = "PointerClick";
      EventTriggerType[EventTriggerType["Drag"] = 5] = "Drag";
      EventTriggerType[EventTriggerType["Drop"] = 6] = "Drop";
      EventTriggerType[EventTriggerType["Scroll"] = 7] = "Scroll";
      EventTriggerType[EventTriggerType["UpdateSelected"] = 8] = "UpdateSelected";
      EventTriggerType[EventTriggerType["Select"] = 9] = "Select";
      EventTriggerType[EventTriggerType["Deselect"] = 10] = "Deselect";
      EventTriggerType[EventTriggerType["Move"] = 11] = "Move";
      EventTriggerType[EventTriggerType["InitializePotentialDrag"] = 12] = "InitializePotentialDrag";
      EventTriggerType[EventTriggerType["BeginDrag"] = 13] = "BeginDrag";
      EventTriggerType[EventTriggerType["EndDrag"] = 14] = "EndDrag";
      EventTriggerType[EventTriggerType["Submit"] = 15] = "Submit";
      EventTriggerType[EventTriggerType["Cancel"] = 16] = "Cancel";
    })(EventTriggerType = EventSystems.EventTriggerType || (EventSystems.EventTriggerType = {}));

    var MoveDirection;

    (function (MoveDirection) {
      MoveDirection[MoveDirection["Left"] = 0] = "Left";
      MoveDirection[MoveDirection["Up"] = 1] = "Up";
      MoveDirection[MoveDirection["Right"] = 2] = "Right";
      MoveDirection[MoveDirection["Down"] = 3] = "Down";
      MoveDirection[MoveDirection["None"] = 4] = "None";
    })(MoveDirection = EventSystems.MoveDirection || (EventSystems.MoveDirection = {}));

    var PointerEventData_InputButton;

    (function (PointerEventData_InputButton) {
      PointerEventData_InputButton[PointerEventData_InputButton["Left"] = 0] = "Left";
      PointerEventData_InputButton[PointerEventData_InputButton["Right"] = 1] = "Right";
      PointerEventData_InputButton[PointerEventData_InputButton["Middle"] = 2] = "Middle";
    })(PointerEventData_InputButton = EventSystems.PointerEventData_InputButton || (EventSystems.PointerEventData_InputButton = {}));

    var PointerEventData_FramePressState;

    (function (PointerEventData_FramePressState) {
      PointerEventData_FramePressState[PointerEventData_FramePressState["Pressed"] = 0] = "Pressed";
      PointerEventData_FramePressState[PointerEventData_FramePressState["Released"] = 1] = "Released";
      PointerEventData_FramePressState[PointerEventData_FramePressState["PressedAndReleased"] = 2] = "PressedAndReleased";
      PointerEventData_FramePressState[PointerEventData_FramePressState["NotChanged"] = 3] = "NotChanged";
    })(PointerEventData_FramePressState = EventSystems.PointerEventData_FramePressState || (EventSystems.PointerEventData_FramePressState = {}));

    var StandaloneInputModule_InputMode;

    (function (StandaloneInputModule_InputMode) {
      StandaloneInputModule_InputMode[StandaloneInputModule_InputMode["Mouse"] = 0] = "Mouse";
      StandaloneInputModule_InputMode[StandaloneInputModule_InputMode["Buttons"] = 1] = "Buttons";
    })(StandaloneInputModule_InputMode = EventSystems.StandaloneInputModule_InputMode || (EventSystems.StandaloneInputModule_InputMode = {}));
  })(EventSystems = UnityEngine.EventSystems || (UnityEngine.EventSystems = {}));

  var Experimental;

  (function (Experimental) {
    var Animations;

    (function (Animations) {
      var AnimationStreamSource;

      (function (AnimationStreamSource) {
        AnimationStreamSource[AnimationStreamSource["DefaultValues"] = 0] = "DefaultValues";
        AnimationStreamSource[AnimationStreamSource["PreviousInputs"] = 1] = "PreviousInputs";
      })(AnimationStreamSource = Animations.AnimationStreamSource || (Animations.AnimationStreamSource = {}));
    })(Animations = Experimental.Animations || (Experimental.Animations = {}));

    var GlobalIllumination;

    (function (GlobalIllumination) {
      var LightType;

      (function (LightType) {
        LightType[LightType["Directional"] = 0] = "Directional";
        LightType[LightType["Point"] = 1] = "Point";
        LightType[LightType["Spot"] = 2] = "Spot";
        LightType[LightType["Rectangle"] = 3] = "Rectangle";
        LightType[LightType["Disc"] = 4] = "Disc";
        LightType[LightType["SpotPyramidShape"] = 5] = "SpotPyramidShape";
        LightType[LightType["SpotBoxShape"] = 6] = "SpotBoxShape";
      })(LightType = GlobalIllumination.LightType || (GlobalIllumination.LightType = {}));

      var LightMode;

      (function (LightMode) {
        LightMode[LightMode["Realtime"] = 0] = "Realtime";
        LightMode[LightMode["Mixed"] = 1] = "Mixed";
        LightMode[LightMode["Baked"] = 2] = "Baked";
        LightMode[LightMode["Unknown"] = 3] = "Unknown";
      })(LightMode = GlobalIllumination.LightMode || (GlobalIllumination.LightMode = {}));

      var FalloffType;

      (function (FalloffType) {
        FalloffType[FalloffType["InverseSquared"] = 0] = "InverseSquared";
        FalloffType[FalloffType["InverseSquaredNoRangeAttenuation"] = 1] = "InverseSquaredNoRangeAttenuation";
        FalloffType[FalloffType["Linear"] = 2] = "Linear";
        FalloffType[FalloffType["Legacy"] = 3] = "Legacy";
        FalloffType[FalloffType["Undefined"] = 4] = "Undefined";
      })(FalloffType = GlobalIllumination.FalloffType || (GlobalIllumination.FalloffType = {}));

      var AngularFalloffType;

      (function (AngularFalloffType) {
        AngularFalloffType[AngularFalloffType["LUT"] = 0] = "LUT";
        AngularFalloffType[AngularFalloffType["AnalyticAndInnerAngle"] = 1] = "AnalyticAndInnerAngle";
      })(AngularFalloffType = GlobalIllumination.AngularFalloffType || (GlobalIllumination.AngularFalloffType = {}));
    })(GlobalIllumination = Experimental.GlobalIllumination || (Experimental.GlobalIllumination = {}));

    var Rendering;

    (function (Rendering) {
      var WaitForPresentSyncPoint;

      (function (WaitForPresentSyncPoint) {
        WaitForPresentSyncPoint[WaitForPresentSyncPoint["BeginFrame"] = 0] = "BeginFrame";
        WaitForPresentSyncPoint[WaitForPresentSyncPoint["EndFrame"] = 1] = "EndFrame";
      })(WaitForPresentSyncPoint = Rendering.WaitForPresentSyncPoint || (Rendering.WaitForPresentSyncPoint = {}));

      var GraphicsJobsSyncPoint;

      (function (GraphicsJobsSyncPoint) {
        GraphicsJobsSyncPoint[GraphicsJobsSyncPoint["EndOfFrame"] = 0] = "EndOfFrame";
        GraphicsJobsSyncPoint[GraphicsJobsSyncPoint["AfterScriptUpdate"] = 1] = "AfterScriptUpdate";
        GraphicsJobsSyncPoint[GraphicsJobsSyncPoint["AfterScriptLateUpdate"] = 2] = "AfterScriptLateUpdate";
        GraphicsJobsSyncPoint[GraphicsJobsSyncPoint["WaitForPresent"] = 3] = "WaitForPresent";
      })(GraphicsJobsSyncPoint = Rendering.GraphicsJobsSyncPoint || (Rendering.GraphicsJobsSyncPoint = {}));

      var TextureCreationFlags;

      (function (TextureCreationFlags) {
        TextureCreationFlags[TextureCreationFlags["None"] = 0] = "None";
        TextureCreationFlags[TextureCreationFlags["MipChain"] = 1] = "MipChain";
        TextureCreationFlags[TextureCreationFlags["Crunch"] = 64] = "Crunch";
      })(TextureCreationFlags = Rendering.TextureCreationFlags || (Rendering.TextureCreationFlags = {}));

      var FormatUsage;

      (function (FormatUsage) {
        FormatUsage[FormatUsage["Sample"] = 0] = "Sample";
        FormatUsage[FormatUsage["Linear"] = 1] = "Linear";
        FormatUsage[FormatUsage["Sparse"] = 2] = "Sparse";
        FormatUsage[FormatUsage["Render"] = 4] = "Render";
        FormatUsage[FormatUsage["Blend"] = 5] = "Blend";
        FormatUsage[FormatUsage["GetPixels"] = 6] = "GetPixels";
        FormatUsage[FormatUsage["SetPixels"] = 7] = "SetPixels";
        FormatUsage[FormatUsage["SetPixels32"] = 8] = "SetPixels32";
        FormatUsage[FormatUsage["ReadPixels"] = 9] = "ReadPixels";
        FormatUsage[FormatUsage["LoadStore"] = 10] = "LoadStore";
        FormatUsage[FormatUsage["MSAA2x"] = 11] = "MSAA2x";
        FormatUsage[FormatUsage["MSAA4x"] = 12] = "MSAA4x";
        FormatUsage[FormatUsage["MSAA8x"] = 13] = "MSAA8x";
        FormatUsage[FormatUsage["StencilSampling"] = 15] = "StencilSampling";
      })(FormatUsage = Rendering.FormatUsage || (Rendering.FormatUsage = {}));

      var DefaultFormat;

      (function (DefaultFormat) {
        DefaultFormat[DefaultFormat["LDR"] = 0] = "LDR";
        DefaultFormat[DefaultFormat["HDR"] = 1] = "HDR";
      })(DefaultFormat = Rendering.DefaultFormat || (Rendering.DefaultFormat = {}));

      var GraphicsFormat;

      (function (GraphicsFormat) {
        GraphicsFormat[GraphicsFormat["None"] = 0] = "None";
        GraphicsFormat[GraphicsFormat["R8_SRGB"] = 1] = "R8_SRGB";
        GraphicsFormat[GraphicsFormat["R8G8_SRGB"] = 2] = "R8G8_SRGB";
        GraphicsFormat[GraphicsFormat["R8G8B8_SRGB"] = 3] = "R8G8B8_SRGB";
        GraphicsFormat[GraphicsFormat["R8G8B8A8_SRGB"] = 4] = "R8G8B8A8_SRGB";
        GraphicsFormat[GraphicsFormat["R8_UNorm"] = 5] = "R8_UNorm";
        GraphicsFormat[GraphicsFormat["R8G8_UNorm"] = 6] = "R8G8_UNorm";
        GraphicsFormat[GraphicsFormat["R8G8B8_UNorm"] = 7] = "R8G8B8_UNorm";
        GraphicsFormat[GraphicsFormat["R8G8B8A8_UNorm"] = 8] = "R8G8B8A8_UNorm";
        GraphicsFormat[GraphicsFormat["R8_SNorm"] = 9] = "R8_SNorm";
        GraphicsFormat[GraphicsFormat["R8G8_SNorm"] = 10] = "R8G8_SNorm";
        GraphicsFormat[GraphicsFormat["R8G8B8_SNorm"] = 11] = "R8G8B8_SNorm";
        GraphicsFormat[GraphicsFormat["R8G8B8A8_SNorm"] = 12] = "R8G8B8A8_SNorm";
        GraphicsFormat[GraphicsFormat["R8_UInt"] = 13] = "R8_UInt";
        GraphicsFormat[GraphicsFormat["R8G8_UInt"] = 14] = "R8G8_UInt";
        GraphicsFormat[GraphicsFormat["R8G8B8_UInt"] = 15] = "R8G8B8_UInt";
        GraphicsFormat[GraphicsFormat["R8G8B8A8_UInt"] = 16] = "R8G8B8A8_UInt";
        GraphicsFormat[GraphicsFormat["R8_SInt"] = 17] = "R8_SInt";
        GraphicsFormat[GraphicsFormat["R8G8_SInt"] = 18] = "R8G8_SInt";
        GraphicsFormat[GraphicsFormat["R8G8B8_SInt"] = 19] = "R8G8B8_SInt";
        GraphicsFormat[GraphicsFormat["R8G8B8A8_SInt"] = 20] = "R8G8B8A8_SInt";
        GraphicsFormat[GraphicsFormat["R16_UNorm"] = 21] = "R16_UNorm";
        GraphicsFormat[GraphicsFormat["R16G16_UNorm"] = 22] = "R16G16_UNorm";
        GraphicsFormat[GraphicsFormat["R16G16B16_UNorm"] = 23] = "R16G16B16_UNorm";
        GraphicsFormat[GraphicsFormat["R16G16B16A16_UNorm"] = 24] = "R16G16B16A16_UNorm";
        GraphicsFormat[GraphicsFormat["R16_SNorm"] = 25] = "R16_SNorm";
        GraphicsFormat[GraphicsFormat["R16G16_SNorm"] = 26] = "R16G16_SNorm";
        GraphicsFormat[GraphicsFormat["R16G16B16_SNorm"] = 27] = "R16G16B16_SNorm";
        GraphicsFormat[GraphicsFormat["R16G16B16A16_SNorm"] = 28] = "R16G16B16A16_SNorm";
        GraphicsFormat[GraphicsFormat["R16_UInt"] = 29] = "R16_UInt";
        GraphicsFormat[GraphicsFormat["R16G16_UInt"] = 30] = "R16G16_UInt";
        GraphicsFormat[GraphicsFormat["R16G16B16_UInt"] = 31] = "R16G16B16_UInt";
        GraphicsFormat[GraphicsFormat["R16G16B16A16_UInt"] = 32] = "R16G16B16A16_UInt";
        GraphicsFormat[GraphicsFormat["R16_SInt"] = 33] = "R16_SInt";
        GraphicsFormat[GraphicsFormat["R16G16_SInt"] = 34] = "R16G16_SInt";
        GraphicsFormat[GraphicsFormat["R16G16B16_SInt"] = 35] = "R16G16B16_SInt";
        GraphicsFormat[GraphicsFormat["R16G16B16A16_SInt"] = 36] = "R16G16B16A16_SInt";
        GraphicsFormat[GraphicsFormat["R32_UInt"] = 37] = "R32_UInt";
        GraphicsFormat[GraphicsFormat["R32G32_UInt"] = 38] = "R32G32_UInt";
        GraphicsFormat[GraphicsFormat["R32G32B32_UInt"] = 39] = "R32G32B32_UInt";
        GraphicsFormat[GraphicsFormat["R32G32B32A32_UInt"] = 40] = "R32G32B32A32_UInt";
        GraphicsFormat[GraphicsFormat["R32_SInt"] = 41] = "R32_SInt";
        GraphicsFormat[GraphicsFormat["R32G32_SInt"] = 42] = "R32G32_SInt";
        GraphicsFormat[GraphicsFormat["R32G32B32_SInt"] = 43] = "R32G32B32_SInt";
        GraphicsFormat[GraphicsFormat["R32G32B32A32_SInt"] = 44] = "R32G32B32A32_SInt";
        GraphicsFormat[GraphicsFormat["R16_SFloat"] = 45] = "R16_SFloat";
        GraphicsFormat[GraphicsFormat["R16G16_SFloat"] = 46] = "R16G16_SFloat";
        GraphicsFormat[GraphicsFormat["R16G16B16_SFloat"] = 47] = "R16G16B16_SFloat";
        GraphicsFormat[GraphicsFormat["R16G16B16A16_SFloat"] = 48] = "R16G16B16A16_SFloat";
        GraphicsFormat[GraphicsFormat["R32_SFloat"] = 49] = "R32_SFloat";
        GraphicsFormat[GraphicsFormat["R32G32_SFloat"] = 50] = "R32G32_SFloat";
        GraphicsFormat[GraphicsFormat["R32G32B32_SFloat"] = 51] = "R32G32B32_SFloat";
        GraphicsFormat[GraphicsFormat["R32G32B32A32_SFloat"] = 52] = "R32G32B32A32_SFloat";
        GraphicsFormat[GraphicsFormat["B8G8R8_SRGB"] = 56] = "B8G8R8_SRGB";
        GraphicsFormat[GraphicsFormat["B8G8R8A8_SRGB"] = 57] = "B8G8R8A8_SRGB";
        GraphicsFormat[GraphicsFormat["B8G8R8_UNorm"] = 58] = "B8G8R8_UNorm";
        GraphicsFormat[GraphicsFormat["B8G8R8A8_UNorm"] = 59] = "B8G8R8A8_UNorm";
        GraphicsFormat[GraphicsFormat["B8G8R8_SNorm"] = 60] = "B8G8R8_SNorm";
        GraphicsFormat[GraphicsFormat["B8G8R8A8_SNorm"] = 61] = "B8G8R8A8_SNorm";
        GraphicsFormat[GraphicsFormat["B8G8R8_UInt"] = 62] = "B8G8R8_UInt";
        GraphicsFormat[GraphicsFormat["B8G8R8A8_UInt"] = 63] = "B8G8R8A8_UInt";
        GraphicsFormat[GraphicsFormat["B8G8R8_SInt"] = 64] = "B8G8R8_SInt";
        GraphicsFormat[GraphicsFormat["B8G8R8A8_SInt"] = 65] = "B8G8R8A8_SInt";
        GraphicsFormat[GraphicsFormat["R4G4B4A4_UNormPack16"] = 66] = "R4G4B4A4_UNormPack16";
        GraphicsFormat[GraphicsFormat["B4G4R4A4_UNormPack16"] = 67] = "B4G4R4A4_UNormPack16";
        GraphicsFormat[GraphicsFormat["R5G6B5_UNormPack16"] = 68] = "R5G6B5_UNormPack16";
        GraphicsFormat[GraphicsFormat["B5G6R5_UNormPack16"] = 69] = "B5G6R5_UNormPack16";
        GraphicsFormat[GraphicsFormat["R5G5B5A1_UNormPack16"] = 70] = "R5G5B5A1_UNormPack16";
        GraphicsFormat[GraphicsFormat["B5G5R5A1_UNormPack16"] = 71] = "B5G5R5A1_UNormPack16";
        GraphicsFormat[GraphicsFormat["A1R5G5B5_UNormPack16"] = 72] = "A1R5G5B5_UNormPack16";
        GraphicsFormat[GraphicsFormat["E5B9G9R9_UFloatPack32"] = 73] = "E5B9G9R9_UFloatPack32";
        GraphicsFormat[GraphicsFormat["B10G11R11_UFloatPack32"] = 74] = "B10G11R11_UFloatPack32";
        GraphicsFormat[GraphicsFormat["A2B10G10R10_UNormPack32"] = 75] = "A2B10G10R10_UNormPack32";
        GraphicsFormat[GraphicsFormat["A2B10G10R10_UIntPack32"] = 76] = "A2B10G10R10_UIntPack32";
        GraphicsFormat[GraphicsFormat["A2B10G10R10_SIntPack32"] = 77] = "A2B10G10R10_SIntPack32";
        GraphicsFormat[GraphicsFormat["A2R10G10B10_UNormPack32"] = 78] = "A2R10G10B10_UNormPack32";
        GraphicsFormat[GraphicsFormat["A2R10G10B10_UIntPack32"] = 79] = "A2R10G10B10_UIntPack32";
        GraphicsFormat[GraphicsFormat["A2R10G10B10_SIntPack32"] = 80] = "A2R10G10B10_SIntPack32";
        GraphicsFormat[GraphicsFormat["A2R10G10B10_XRSRGBPack32"] = 81] = "A2R10G10B10_XRSRGBPack32";
        GraphicsFormat[GraphicsFormat["A2R10G10B10_XRUNormPack32"] = 82] = "A2R10G10B10_XRUNormPack32";
        GraphicsFormat[GraphicsFormat["R10G10B10_XRSRGBPack32"] = 83] = "R10G10B10_XRSRGBPack32";
        GraphicsFormat[GraphicsFormat["R10G10B10_XRUNormPack32"] = 84] = "R10G10B10_XRUNormPack32";
        GraphicsFormat[GraphicsFormat["A10R10G10B10_XRSRGBPack32"] = 85] = "A10R10G10B10_XRSRGBPack32";
        GraphicsFormat[GraphicsFormat["A10R10G10B10_XRUNormPack32"] = 86] = "A10R10G10B10_XRUNormPack32";
        GraphicsFormat[GraphicsFormat["RGB_DXT1_SRGB"] = 96] = "RGB_DXT1_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_DXT1_SRGB"] = 96] = "RGBA_DXT1_SRGB";
        GraphicsFormat[GraphicsFormat["RGB_DXT1_UNorm"] = 97] = "RGB_DXT1_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_DXT1_UNorm"] = 97] = "RGBA_DXT1_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_DXT3_SRGB"] = 98] = "RGBA_DXT3_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_DXT3_UNorm"] = 99] = "RGBA_DXT3_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_DXT5_SRGB"] = 100] = "RGBA_DXT5_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_DXT5_UNorm"] = 101] = "RGBA_DXT5_UNorm";
        GraphicsFormat[GraphicsFormat["R_BC4_UNorm"] = 102] = "R_BC4_UNorm";
        GraphicsFormat[GraphicsFormat["R_BC4_SNorm"] = 103] = "R_BC4_SNorm";
        GraphicsFormat[GraphicsFormat["RG_BC5_UNorm"] = 104] = "RG_BC5_UNorm";
        GraphicsFormat[GraphicsFormat["RG_BC5_SNorm"] = 105] = "RG_BC5_SNorm";
        GraphicsFormat[GraphicsFormat["RGB_BC6H_UFloat"] = 106] = "RGB_BC6H_UFloat";
        GraphicsFormat[GraphicsFormat["RGB_BC6H_SFloat"] = 107] = "RGB_BC6H_SFloat";
        GraphicsFormat[GraphicsFormat["RGBA_BC7_SRGB"] = 108] = "RGBA_BC7_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_BC7_UNorm"] = 109] = "RGBA_BC7_UNorm";
        GraphicsFormat[GraphicsFormat["RGB_PVRTC_2Bpp_SRGB"] = 110] = "RGB_PVRTC_2Bpp_SRGB";
        GraphicsFormat[GraphicsFormat["RGB_PVRTC_2Bpp_UNorm"] = 111] = "RGB_PVRTC_2Bpp_UNorm";
        GraphicsFormat[GraphicsFormat["RGB_PVRTC_4Bpp_SRGB"] = 112] = "RGB_PVRTC_4Bpp_SRGB";
        GraphicsFormat[GraphicsFormat["RGB_PVRTC_4Bpp_UNorm"] = 113] = "RGB_PVRTC_4Bpp_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_PVRTC_2Bpp_SRGB"] = 114] = "RGBA_PVRTC_2Bpp_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_PVRTC_2Bpp_UNorm"] = 115] = "RGBA_PVRTC_2Bpp_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_PVRTC_4Bpp_SRGB"] = 116] = "RGBA_PVRTC_4Bpp_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_PVRTC_4Bpp_UNorm"] = 117] = "RGBA_PVRTC_4Bpp_UNorm";
        GraphicsFormat[GraphicsFormat["RGB_ETC_UNorm"] = 118] = "RGB_ETC_UNorm";
        GraphicsFormat[GraphicsFormat["RGB_ETC2_SRGB"] = 119] = "RGB_ETC2_SRGB";
        GraphicsFormat[GraphicsFormat["RGB_ETC2_UNorm"] = 120] = "RGB_ETC2_UNorm";
        GraphicsFormat[GraphicsFormat["RGB_A1_ETC2_SRGB"] = 121] = "RGB_A1_ETC2_SRGB";
        GraphicsFormat[GraphicsFormat["RGB_A1_ETC2_UNorm"] = 122] = "RGB_A1_ETC2_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_ETC2_SRGB"] = 123] = "RGBA_ETC2_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_ETC2_UNorm"] = 124] = "RGBA_ETC2_UNorm";
        GraphicsFormat[GraphicsFormat["R_EAC_UNorm"] = 125] = "R_EAC_UNorm";
        GraphicsFormat[GraphicsFormat["R_EAC_SNorm"] = 126] = "R_EAC_SNorm";
        GraphicsFormat[GraphicsFormat["RG_EAC_UNorm"] = 127] = "RG_EAC_UNorm";
        GraphicsFormat[GraphicsFormat["RG_EAC_SNorm"] = 128] = "RG_EAC_SNorm";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC4X4_SRGB"] = 129] = "RGBA_ASTC4X4_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC4X4_UNorm"] = 130] = "RGBA_ASTC4X4_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC5X5_SRGB"] = 131] = "RGBA_ASTC5X5_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC5X5_UNorm"] = 132] = "RGBA_ASTC5X5_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC6X6_SRGB"] = 133] = "RGBA_ASTC6X6_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC6X6_UNorm"] = 134] = "RGBA_ASTC6X6_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC8X8_SRGB"] = 135] = "RGBA_ASTC8X8_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC8X8_UNorm"] = 136] = "RGBA_ASTC8X8_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC10X10_SRGB"] = 137] = "RGBA_ASTC10X10_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC10X10_UNorm"] = 138] = "RGBA_ASTC10X10_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC12X12_SRGB"] = 139] = "RGBA_ASTC12X12_SRGB";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC12X12_UNorm"] = 140] = "RGBA_ASTC12X12_UNorm";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC4X4_UFloat"] = 145] = "RGBA_ASTC4X4_UFloat";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC5X5_UFloat"] = 146] = "RGBA_ASTC5X5_UFloat";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC6X6_UFloat"] = 147] = "RGBA_ASTC6X6_UFloat";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC8X8_UFloat"] = 148] = "RGBA_ASTC8X8_UFloat";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC10X10_UFloat"] = 149] = "RGBA_ASTC10X10_UFloat";
        GraphicsFormat[GraphicsFormat["RGBA_ASTC12X12_UFloat"] = 150] = "RGBA_ASTC12X12_UFloat";
      })(GraphicsFormat = Rendering.GraphicsFormat || (Rendering.GraphicsFormat = {}));

      var RayTracingMode;

      (function (RayTracingMode) {
        RayTracingMode[RayTracingMode["Off"] = 0] = "Off";
        RayTracingMode[RayTracingMode["Static"] = 1] = "Static";
        RayTracingMode[RayTracingMode["DynamicTransform"] = 2] = "DynamicTransform";
        RayTracingMode[RayTracingMode["DynamicGeometry"] = 3] = "DynamicGeometry";
      })(RayTracingMode = Rendering.RayTracingMode || (Rendering.RayTracingMode = {}));

      var RayTracingAccelerationStructure_RayTracingModeMask;

      (function (RayTracingAccelerationStructure_RayTracingModeMask) {
        RayTracingAccelerationStructure_RayTracingModeMask[RayTracingAccelerationStructure_RayTracingModeMask["Nothing"] = 0] = "Nothing";
        RayTracingAccelerationStructure_RayTracingModeMask[RayTracingAccelerationStructure_RayTracingModeMask["Static"] = 2] = "Static";
        RayTracingAccelerationStructure_RayTracingModeMask[RayTracingAccelerationStructure_RayTracingModeMask["DynamicTransform"] = 4] = "DynamicTransform";
        RayTracingAccelerationStructure_RayTracingModeMask[RayTracingAccelerationStructure_RayTracingModeMask["DynamicGeometry"] = 8] = "DynamicGeometry";
        RayTracingAccelerationStructure_RayTracingModeMask[RayTracingAccelerationStructure_RayTracingModeMask["Everything"] = 14] = "Everything";
      })(RayTracingAccelerationStructure_RayTracingModeMask = Rendering.RayTracingAccelerationStructure_RayTracingModeMask || (Rendering.RayTracingAccelerationStructure_RayTracingModeMask = {}));

      var RayTracingAccelerationStructure_ManagementMode;

      (function (RayTracingAccelerationStructure_ManagementMode) {
        RayTracingAccelerationStructure_ManagementMode[RayTracingAccelerationStructure_ManagementMode["Manual"] = 0] = "Manual";
        RayTracingAccelerationStructure_ManagementMode[RayTracingAccelerationStructure_ManagementMode["Automatic"] = 1] = "Automatic";
      })(RayTracingAccelerationStructure_ManagementMode = Rendering.RayTracingAccelerationStructure_ManagementMode || (Rendering.RayTracingAccelerationStructure_ManagementMode = {}));
    })(Rendering = Experimental.Rendering || (Experimental.Rendering = {}));
  })(Experimental = UnityEngine.Experimental || (UnityEngine.Experimental = {}));

  var iOS;

  (function (iOS) {
    var ADBannerView_Layout;

    (function (ADBannerView_Layout) {
      ADBannerView_Layout[ADBannerView_Layout["Top"] = 0] = "Top";
      ADBannerView_Layout[ADBannerView_Layout["Bottom"] = 1] = "Bottom";
      ADBannerView_Layout[ADBannerView_Layout["TopLeft"] = 0] = "TopLeft";
      ADBannerView_Layout[ADBannerView_Layout["TopRight"] = 4] = "TopRight";
      ADBannerView_Layout[ADBannerView_Layout["TopCenter"] = 8] = "TopCenter";
      ADBannerView_Layout[ADBannerView_Layout["BottomLeft"] = 1] = "BottomLeft";
      ADBannerView_Layout[ADBannerView_Layout["BottomRight"] = 5] = "BottomRight";
      ADBannerView_Layout[ADBannerView_Layout["BottomCenter"] = 9] = "BottomCenter";
      ADBannerView_Layout[ADBannerView_Layout["CenterLeft"] = 2] = "CenterLeft";
      ADBannerView_Layout[ADBannerView_Layout["CenterRight"] = 6] = "CenterRight";
      ADBannerView_Layout[ADBannerView_Layout["Center"] = 10] = "Center";
      ADBannerView_Layout[ADBannerView_Layout["Manual"] = -1] = "Manual";
    })(ADBannerView_Layout = iOS.ADBannerView_Layout || (iOS.ADBannerView_Layout = {}));

    var ADBannerView_Type;

    (function (ADBannerView_Type) {
      ADBannerView_Type[ADBannerView_Type["Banner"] = 0] = "Banner";
      ADBannerView_Type[ADBannerView_Type["MediumRect"] = 1] = "MediumRect";
    })(ADBannerView_Type = iOS.ADBannerView_Type || (iOS.ADBannerView_Type = {}));

    var DeviceGeneration;

    (function (DeviceGeneration) {
      DeviceGeneration[DeviceGeneration["Unknown"] = 0] = "Unknown";
      DeviceGeneration[DeviceGeneration["iPhone"] = 1] = "iPhone";
      DeviceGeneration[DeviceGeneration["iPhone3G"] = 2] = "iPhone3G";
      DeviceGeneration[DeviceGeneration["iPhone3GS"] = 3] = "iPhone3GS";
      DeviceGeneration[DeviceGeneration["iPodTouch1Gen"] = 4] = "iPodTouch1Gen";
      DeviceGeneration[DeviceGeneration["iPodTouch2Gen"] = 5] = "iPodTouch2Gen";
      DeviceGeneration[DeviceGeneration["iPodTouch3Gen"] = 6] = "iPodTouch3Gen";
      DeviceGeneration[DeviceGeneration["iPad1Gen"] = 7] = "iPad1Gen";
      DeviceGeneration[DeviceGeneration["iPhone4"] = 8] = "iPhone4";
      DeviceGeneration[DeviceGeneration["iPodTouch4Gen"] = 9] = "iPodTouch4Gen";
      DeviceGeneration[DeviceGeneration["iPad2Gen"] = 10] = "iPad2Gen";
      DeviceGeneration[DeviceGeneration["iPhone4S"] = 11] = "iPhone4S";
      DeviceGeneration[DeviceGeneration["iPad3Gen"] = 12] = "iPad3Gen";
      DeviceGeneration[DeviceGeneration["iPhone5"] = 13] = "iPhone5";
      DeviceGeneration[DeviceGeneration["iPodTouch5Gen"] = 14] = "iPodTouch5Gen";
      DeviceGeneration[DeviceGeneration["iPadMini1Gen"] = 15] = "iPadMini1Gen";
      DeviceGeneration[DeviceGeneration["iPad4Gen"] = 16] = "iPad4Gen";
      DeviceGeneration[DeviceGeneration["iPhone5C"] = 17] = "iPhone5C";
      DeviceGeneration[DeviceGeneration["iPhone5S"] = 18] = "iPhone5S";
      DeviceGeneration[DeviceGeneration["iPadAir1"] = 19] = "iPadAir1";
      DeviceGeneration[DeviceGeneration["iPadMini2Gen"] = 20] = "iPadMini2Gen";
      DeviceGeneration[DeviceGeneration["iPhone6"] = 21] = "iPhone6";
      DeviceGeneration[DeviceGeneration["iPhone6Plus"] = 22] = "iPhone6Plus";
      DeviceGeneration[DeviceGeneration["iPadMini3Gen"] = 23] = "iPadMini3Gen";
      DeviceGeneration[DeviceGeneration["iPadAir2"] = 24] = "iPadAir2";
      DeviceGeneration[DeviceGeneration["iPhone6S"] = 25] = "iPhone6S";
      DeviceGeneration[DeviceGeneration["iPhone6SPlus"] = 26] = "iPhone6SPlus";
      DeviceGeneration[DeviceGeneration["iPadPro1Gen"] = 27] = "iPadPro1Gen";
      DeviceGeneration[DeviceGeneration["iPadMini4Gen"] = 28] = "iPadMini4Gen";
      DeviceGeneration[DeviceGeneration["iPhoneSE1Gen"] = 29] = "iPhoneSE1Gen";
      DeviceGeneration[DeviceGeneration["iPadPro10Inch1Gen"] = 30] = "iPadPro10Inch1Gen";
      DeviceGeneration[DeviceGeneration["iPhone7"] = 31] = "iPhone7";
      DeviceGeneration[DeviceGeneration["iPhone7Plus"] = 32] = "iPhone7Plus";
      DeviceGeneration[DeviceGeneration["iPodTouch6Gen"] = 33] = "iPodTouch6Gen";
      DeviceGeneration[DeviceGeneration["iPad5Gen"] = 34] = "iPad5Gen";
      DeviceGeneration[DeviceGeneration["iPadPro2Gen"] = 35] = "iPadPro2Gen";
      DeviceGeneration[DeviceGeneration["iPadPro10Inch2Gen"] = 36] = "iPadPro10Inch2Gen";
      DeviceGeneration[DeviceGeneration["iPhone8"] = 37] = "iPhone8";
      DeviceGeneration[DeviceGeneration["iPhone8Plus"] = 38] = "iPhone8Plus";
      DeviceGeneration[DeviceGeneration["iPhoneX"] = 39] = "iPhoneX";
      DeviceGeneration[DeviceGeneration["iPhoneXS"] = 40] = "iPhoneXS";
      DeviceGeneration[DeviceGeneration["iPhoneXSMax"] = 41] = "iPhoneXSMax";
      DeviceGeneration[DeviceGeneration["iPhoneXR"] = 42] = "iPhoneXR";
      DeviceGeneration[DeviceGeneration["iPadPro11Inch"] = 43] = "iPadPro11Inch";
      DeviceGeneration[DeviceGeneration["iPadPro3Gen"] = 44] = "iPadPro3Gen";
      DeviceGeneration[DeviceGeneration["iPad6Gen"] = 45] = "iPad6Gen";
      DeviceGeneration[DeviceGeneration["iPadAir3Gen"] = 46] = "iPadAir3Gen";
      DeviceGeneration[DeviceGeneration["iPadMini5Gen"] = 47] = "iPadMini5Gen";
      DeviceGeneration[DeviceGeneration["iPhone11"] = 48] = "iPhone11";
      DeviceGeneration[DeviceGeneration["iPhone11Pro"] = 49] = "iPhone11Pro";
      DeviceGeneration[DeviceGeneration["iPhone11ProMax"] = 50] = "iPhone11ProMax";
      DeviceGeneration[DeviceGeneration["iPodTouch7Gen"] = 51] = "iPodTouch7Gen";
      DeviceGeneration[DeviceGeneration["iPad7Gen"] = 52] = "iPad7Gen";
      DeviceGeneration[DeviceGeneration["iPhoneSE2Gen"] = 53] = "iPhoneSE2Gen";
      DeviceGeneration[DeviceGeneration["iPadPro11Inch2Gen"] = 54] = "iPadPro11Inch2Gen";
      DeviceGeneration[DeviceGeneration["iPadPro4Gen"] = 55] = "iPadPro4Gen";
      DeviceGeneration[DeviceGeneration["iPhoneUnknown"] = 10001] = "iPhoneUnknown";
      DeviceGeneration[DeviceGeneration["iPadUnknown"] = 10002] = "iPadUnknown";
      DeviceGeneration[DeviceGeneration["iPodTouchUnknown"] = 10003] = "iPodTouchUnknown";
    })(DeviceGeneration = iOS.DeviceGeneration || (iOS.DeviceGeneration = {}));

    var ActivityIndicatorStyle;

    (function (ActivityIndicatorStyle) {
      ActivityIndicatorStyle[ActivityIndicatorStyle["DontShow"] = -1] = "DontShow";
      ActivityIndicatorStyle[ActivityIndicatorStyle["WhiteLarge"] = 0] = "WhiteLarge";
      ActivityIndicatorStyle[ActivityIndicatorStyle["White"] = 1] = "White";
      ActivityIndicatorStyle[ActivityIndicatorStyle["Gray"] = 2] = "Gray";
    })(ActivityIndicatorStyle = iOS.ActivityIndicatorStyle || (iOS.ActivityIndicatorStyle = {}));

    var CalendarIdentifier;

    (function (CalendarIdentifier) {
      CalendarIdentifier[CalendarIdentifier["GregorianCalendar"] = 0] = "GregorianCalendar";
      CalendarIdentifier[CalendarIdentifier["BuddhistCalendar"] = 1] = "BuddhistCalendar";
      CalendarIdentifier[CalendarIdentifier["ChineseCalendar"] = 2] = "ChineseCalendar";
      CalendarIdentifier[CalendarIdentifier["HebrewCalendar"] = 3] = "HebrewCalendar";
      CalendarIdentifier[CalendarIdentifier["IslamicCalendar"] = 4] = "IslamicCalendar";
      CalendarIdentifier[CalendarIdentifier["IslamicCivilCalendar"] = 5] = "IslamicCivilCalendar";
      CalendarIdentifier[CalendarIdentifier["JapaneseCalendar"] = 6] = "JapaneseCalendar";
      CalendarIdentifier[CalendarIdentifier["RepublicOfChinaCalendar"] = 7] = "RepublicOfChinaCalendar";
      CalendarIdentifier[CalendarIdentifier["PersianCalendar"] = 8] = "PersianCalendar";
      CalendarIdentifier[CalendarIdentifier["IndianCalendar"] = 9] = "IndianCalendar";
      CalendarIdentifier[CalendarIdentifier["ISO8601Calendar"] = 10] = "ISO8601Calendar";
    })(CalendarIdentifier = iOS.CalendarIdentifier || (iOS.CalendarIdentifier = {}));

    var CalendarUnit;

    (function (CalendarUnit) {
      CalendarUnit[CalendarUnit["Era"] = 2] = "Era";
      CalendarUnit[CalendarUnit["Year"] = 4] = "Year";
      CalendarUnit[CalendarUnit["Month"] = 8] = "Month";
      CalendarUnit[CalendarUnit["Day"] = 16] = "Day";
      CalendarUnit[CalendarUnit["Hour"] = 32] = "Hour";
      CalendarUnit[CalendarUnit["Minute"] = 64] = "Minute";
      CalendarUnit[CalendarUnit["Second"] = 128] = "Second";
      CalendarUnit[CalendarUnit["Week"] = 256] = "Week";
      CalendarUnit[CalendarUnit["Weekday"] = 512] = "Weekday";
      CalendarUnit[CalendarUnit["WeekdayOrdinal"] = 1024] = "WeekdayOrdinal";
      CalendarUnit[CalendarUnit["Quarter"] = 2048] = "Quarter";
    })(CalendarUnit = iOS.CalendarUnit || (iOS.CalendarUnit = {}));

    var NotificationType;

    (function (NotificationType) {
      NotificationType[NotificationType["None"] = 0] = "None";
      NotificationType[NotificationType["Badge"] = 1] = "Badge";
      NotificationType[NotificationType["Sound"] = 2] = "Sound";
      NotificationType[NotificationType["Alert"] = 4] = "Alert";
    })(NotificationType = iOS.NotificationType || (iOS.NotificationType = {}));

    var SystemGestureDeferMode;

    (function (SystemGestureDeferMode) {
      SystemGestureDeferMode[SystemGestureDeferMode["None"] = 0] = "None";
      SystemGestureDeferMode[SystemGestureDeferMode["TopEdge"] = 1] = "TopEdge";
      SystemGestureDeferMode[SystemGestureDeferMode["LeftEdge"] = 2] = "LeftEdge";
      SystemGestureDeferMode[SystemGestureDeferMode["BottomEdge"] = 4] = "BottomEdge";
      SystemGestureDeferMode[SystemGestureDeferMode["RightEdge"] = 8] = "RightEdge";
      SystemGestureDeferMode[SystemGestureDeferMode["All"] = 15] = "All";
    })(SystemGestureDeferMode = iOS.SystemGestureDeferMode || (iOS.SystemGestureDeferMode = {}));
  })(iOS = UnityEngine.iOS || (UnityEngine.iOS = {}));

  var Networking;

  (function (Networking) {
    var PlayerConnection;

    (function (PlayerConnection) {
      var ConnectionTarget;

      (function (ConnectionTarget) {
        ConnectionTarget[ConnectionTarget["None"] = 0] = "None";
        ConnectionTarget[ConnectionTarget["Player"] = 1] = "Player";
        ConnectionTarget[ConnectionTarget["Editor"] = 2] = "Editor";
      })(ConnectionTarget = PlayerConnection.ConnectionTarget || (PlayerConnection.ConnectionTarget = {}));
    })(PlayerConnection = Networking.PlayerConnection || (Networking.PlayerConnection = {}));
  })(Networking = UnityEngine.Networking || (UnityEngine.Networking = {}));

  var Playables;

  (function (Playables) {
    var FrameData_EvaluationType;

    (function (FrameData_EvaluationType) {
      FrameData_EvaluationType[FrameData_EvaluationType["Evaluate"] = 0] = "Evaluate";
      FrameData_EvaluationType[FrameData_EvaluationType["Playback"] = 1] = "Playback";
    })(FrameData_EvaluationType = Playables.FrameData_EvaluationType || (Playables.FrameData_EvaluationType = {}));

    var DirectorWrapMode;

    (function (DirectorWrapMode) {
      DirectorWrapMode[DirectorWrapMode["Hold"] = 0] = "Hold";
      DirectorWrapMode[DirectorWrapMode["Loop"] = 1] = "Loop";
      DirectorWrapMode[DirectorWrapMode["None"] = 2] = "None";
    })(DirectorWrapMode = Playables.DirectorWrapMode || (Playables.DirectorWrapMode = {}));

    var DataStreamType;

    (function (DataStreamType) {
      DataStreamType[DataStreamType["Animation"] = 0] = "Animation";
      DataStreamType[DataStreamType["Audio"] = 1] = "Audio";
      DataStreamType[DataStreamType["Texture"] = 2] = "Texture";
      DataStreamType[DataStreamType["None"] = 3] = "None";
    })(DataStreamType = Playables.DataStreamType || (Playables.DataStreamType = {}));

    var PlayableTraversalMode;

    (function (PlayableTraversalMode) {
      PlayableTraversalMode[PlayableTraversalMode["Mix"] = 0] = "Mix";
      PlayableTraversalMode[PlayableTraversalMode["Passthrough"] = 1] = "Passthrough";
    })(PlayableTraversalMode = Playables.PlayableTraversalMode || (Playables.PlayableTraversalMode = {}));

    var DirectorUpdateMode;

    (function (DirectorUpdateMode) {
      DirectorUpdateMode[DirectorUpdateMode["DSPClock"] = 0] = "DSPClock";
      DirectorUpdateMode[DirectorUpdateMode["GameTime"] = 1] = "GameTime";
      DirectorUpdateMode[DirectorUpdateMode["UnscaledGameTime"] = 2] = "UnscaledGameTime";
      DirectorUpdateMode[DirectorUpdateMode["Manual"] = 3] = "Manual";
    })(DirectorUpdateMode = Playables.DirectorUpdateMode || (Playables.DirectorUpdateMode = {}));

    var PlayState;

    (function (PlayState) {
      PlayState[PlayState["Paused"] = 0] = "Paused";
      PlayState[PlayState["Playing"] = 1] = "Playing";
      PlayState[PlayState["Delayed"] = 2] = "Delayed";
    })(PlayState = Playables.PlayState || (Playables.PlayState = {}));
  })(Playables = UnityEngine.Playables || (UnityEngine.Playables = {}));

  var Profiling;

  (function (Profiling) {
    var ProfilerArea;

    (function (ProfilerArea) {
      ProfilerArea[ProfilerArea["CPU"] = 0] = "CPU";
      ProfilerArea[ProfilerArea["GPU"] = 1] = "GPU";
      ProfilerArea[ProfilerArea["Rendering"] = 2] = "Rendering";
      ProfilerArea[ProfilerArea["Memory"] = 3] = "Memory";
      ProfilerArea[ProfilerArea["Audio"] = 4] = "Audio";
      ProfilerArea[ProfilerArea["Video"] = 5] = "Video";
      ProfilerArea[ProfilerArea["Physics"] = 6] = "Physics";
      ProfilerArea[ProfilerArea["Physics2D"] = 7] = "Physics2D";
      ProfilerArea[ProfilerArea["NetworkMessages"] = 8] = "NetworkMessages";
      ProfilerArea[ProfilerArea["NetworkOperations"] = 9] = "NetworkOperations";
      ProfilerArea[ProfilerArea["UI"] = 10] = "UI";
      ProfilerArea[ProfilerArea["UIDetails"] = 11] = "UIDetails";
      ProfilerArea[ProfilerArea["GlobalIllumination"] = 12] = "GlobalIllumination";
      ProfilerArea[ProfilerArea["VirtualTexturing"] = 13] = "VirtualTexturing";
    })(ProfilerArea = Profiling.ProfilerArea || (Profiling.ProfilerArea = {}));

    var Memory;

    (function (Memory) {
      var Experimental;

      (function (Experimental) {
        var CaptureFlags;

        (function (CaptureFlags) {
          CaptureFlags[CaptureFlags["ManagedObjects"] = 1] = "ManagedObjects";
          CaptureFlags[CaptureFlags["NativeObjects"] = 2] = "NativeObjects";
          CaptureFlags[CaptureFlags["NativeAllocations"] = 4] = "NativeAllocations";
          CaptureFlags[CaptureFlags["NativeAllocationSites"] = 8] = "NativeAllocationSites";
          CaptureFlags[CaptureFlags["NativeStackTraces"] = 16] = "NativeStackTraces";
        })(CaptureFlags = Experimental.CaptureFlags || (Experimental.CaptureFlags = {}));
      })(Experimental = Memory.Experimental || (Memory.Experimental = {}));
    })(Memory = Profiling.Memory || (Profiling.Memory = {}));
  })(Profiling = UnityEngine.Profiling || (UnityEngine.Profiling = {}));

  var Rendering;

  (function (Rendering) {
    var SynchronisationStage;

    (function (SynchronisationStage) {
      SynchronisationStage[SynchronisationStage["VertexProcessing"] = 0] = "VertexProcessing";
      SynchronisationStage[SynchronisationStage["PixelProcessing"] = 1] = "PixelProcessing";
    })(SynchronisationStage = Rendering.SynchronisationStage || (Rendering.SynchronisationStage = {}));

    var ShaderHardwareTier;

    (function (ShaderHardwareTier) {
      ShaderHardwareTier[ShaderHardwareTier["Tier1"] = 0] = "Tier1";
      ShaderHardwareTier[ShaderHardwareTier["Tier2"] = 1] = "Tier2";
      ShaderHardwareTier[ShaderHardwareTier["Tier3"] = 2] = "Tier3";
    })(ShaderHardwareTier = Rendering.ShaderHardwareTier || (Rendering.ShaderHardwareTier = {}));

    var IndexFormat;

    (function (IndexFormat) {
      IndexFormat[IndexFormat["UInt16"] = 0] = "UInt16";
      IndexFormat[IndexFormat["UInt32"] = 1] = "UInt32";
    })(IndexFormat = Rendering.IndexFormat || (Rendering.IndexFormat = {}));

    var MeshUpdateFlags;

    (function (MeshUpdateFlags) {
      MeshUpdateFlags[MeshUpdateFlags["Default"] = 0] = "Default";
      MeshUpdateFlags[MeshUpdateFlags["DontValidateIndices"] = 1] = "DontValidateIndices";
      MeshUpdateFlags[MeshUpdateFlags["DontResetBoneBounds"] = 2] = "DontResetBoneBounds";
      MeshUpdateFlags[MeshUpdateFlags["DontNotifyMeshUsers"] = 4] = "DontNotifyMeshUsers";
      MeshUpdateFlags[MeshUpdateFlags["DontRecalculateBounds"] = 8] = "DontRecalculateBounds";
    })(MeshUpdateFlags = Rendering.MeshUpdateFlags || (Rendering.MeshUpdateFlags = {}));

    var VertexAttributeFormat;

    (function (VertexAttributeFormat) {
      VertexAttributeFormat[VertexAttributeFormat["Float32"] = 0] = "Float32";
      VertexAttributeFormat[VertexAttributeFormat["Float16"] = 1] = "Float16";
      VertexAttributeFormat[VertexAttributeFormat["UNorm8"] = 2] = "UNorm8";
      VertexAttributeFormat[VertexAttributeFormat["SNorm8"] = 3] = "SNorm8";
      VertexAttributeFormat[VertexAttributeFormat["UNorm16"] = 4] = "UNorm16";
      VertexAttributeFormat[VertexAttributeFormat["SNorm16"] = 5] = "SNorm16";
      VertexAttributeFormat[VertexAttributeFormat["UInt8"] = 6] = "UInt8";
      VertexAttributeFormat[VertexAttributeFormat["SInt8"] = 7] = "SInt8";
      VertexAttributeFormat[VertexAttributeFormat["UInt16"] = 8] = "UInt16";
      VertexAttributeFormat[VertexAttributeFormat["SInt16"] = 9] = "SInt16";
      VertexAttributeFormat[VertexAttributeFormat["UInt32"] = 10] = "UInt32";
      VertexAttributeFormat[VertexAttributeFormat["SInt32"] = 11] = "SInt32";
    })(VertexAttributeFormat = Rendering.VertexAttributeFormat || (Rendering.VertexAttributeFormat = {}));

    var VertexAttribute;

    (function (VertexAttribute) {
      VertexAttribute[VertexAttribute["Position"] = 0] = "Position";
      VertexAttribute[VertexAttribute["Normal"] = 1] = "Normal";
      VertexAttribute[VertexAttribute["Tangent"] = 2] = "Tangent";
      VertexAttribute[VertexAttribute["Color"] = 3] = "Color";
      VertexAttribute[VertexAttribute["TexCoord0"] = 4] = "TexCoord0";
      VertexAttribute[VertexAttribute["TexCoord1"] = 5] = "TexCoord1";
      VertexAttribute[VertexAttribute["TexCoord2"] = 6] = "TexCoord2";
      VertexAttribute[VertexAttribute["TexCoord3"] = 7] = "TexCoord3";
      VertexAttribute[VertexAttribute["TexCoord4"] = 8] = "TexCoord4";
      VertexAttribute[VertexAttribute["TexCoord5"] = 9] = "TexCoord5";
      VertexAttribute[VertexAttribute["TexCoord6"] = 10] = "TexCoord6";
      VertexAttribute[VertexAttribute["TexCoord7"] = 11] = "TexCoord7";
      VertexAttribute[VertexAttribute["BlendWeight"] = 12] = "BlendWeight";
      VertexAttribute[VertexAttribute["BlendIndices"] = 13] = "BlendIndices";
    })(VertexAttribute = Rendering.VertexAttribute || (Rendering.VertexAttribute = {}));

    var OpaqueSortMode;

    (function (OpaqueSortMode) {
      OpaqueSortMode[OpaqueSortMode["Default"] = 0] = "Default";
      OpaqueSortMode[OpaqueSortMode["FrontToBack"] = 1] = "FrontToBack";
      OpaqueSortMode[OpaqueSortMode["NoDistanceSort"] = 2] = "NoDistanceSort";
    })(OpaqueSortMode = Rendering.OpaqueSortMode || (Rendering.OpaqueSortMode = {}));

    var RenderQueue;

    (function (RenderQueue) {
      RenderQueue[RenderQueue["Background"] = 1000] = "Background";
      RenderQueue[RenderQueue["Geometry"] = 2000] = "Geometry";
      RenderQueue[RenderQueue["AlphaTest"] = 2450] = "AlphaTest";
      RenderQueue[RenderQueue["GeometryLast"] = 2500] = "GeometryLast";
      RenderQueue[RenderQueue["Transparent"] = 3000] = "Transparent";
      RenderQueue[RenderQueue["Overlay"] = 4000] = "Overlay";
    })(RenderQueue = Rendering.RenderQueue || (Rendering.RenderQueue = {}));

    var RenderBufferLoadAction;

    (function (RenderBufferLoadAction) {
      RenderBufferLoadAction[RenderBufferLoadAction["Load"] = 0] = "Load";
      RenderBufferLoadAction[RenderBufferLoadAction["Clear"] = 1] = "Clear";
      RenderBufferLoadAction[RenderBufferLoadAction["DontCare"] = 2] = "DontCare";
    })(RenderBufferLoadAction = Rendering.RenderBufferLoadAction || (Rendering.RenderBufferLoadAction = {}));

    var RenderBufferStoreAction;

    (function (RenderBufferStoreAction) {
      RenderBufferStoreAction[RenderBufferStoreAction["Store"] = 0] = "Store";
      RenderBufferStoreAction[RenderBufferStoreAction["Resolve"] = 1] = "Resolve";
      RenderBufferStoreAction[RenderBufferStoreAction["StoreAndResolve"] = 2] = "StoreAndResolve";
      RenderBufferStoreAction[RenderBufferStoreAction["DontCare"] = 3] = "DontCare";
    })(RenderBufferStoreAction = Rendering.RenderBufferStoreAction || (Rendering.RenderBufferStoreAction = {}));

    var FastMemoryFlags;

    (function (FastMemoryFlags) {
      FastMemoryFlags[FastMemoryFlags["None"] = 0] = "None";
      FastMemoryFlags[FastMemoryFlags["SpillTop"] = 1] = "SpillTop";
      FastMemoryFlags[FastMemoryFlags["SpillBottom"] = 2] = "SpillBottom";
    })(FastMemoryFlags = Rendering.FastMemoryFlags || (Rendering.FastMemoryFlags = {}));

    var BlendMode;

    (function (BlendMode) {
      BlendMode[BlendMode["Zero"] = 0] = "Zero";
      BlendMode[BlendMode["One"] = 1] = "One";
      BlendMode[BlendMode["DstColor"] = 2] = "DstColor";
      BlendMode[BlendMode["SrcColor"] = 3] = "SrcColor";
      BlendMode[BlendMode["OneMinusDstColor"] = 4] = "OneMinusDstColor";
      BlendMode[BlendMode["SrcAlpha"] = 5] = "SrcAlpha";
      BlendMode[BlendMode["OneMinusSrcColor"] = 6] = "OneMinusSrcColor";
      BlendMode[BlendMode["DstAlpha"] = 7] = "DstAlpha";
      BlendMode[BlendMode["OneMinusDstAlpha"] = 8] = "OneMinusDstAlpha";
      BlendMode[BlendMode["SrcAlphaSaturate"] = 9] = "SrcAlphaSaturate";
      BlendMode[BlendMode["OneMinusSrcAlpha"] = 10] = "OneMinusSrcAlpha";
    })(BlendMode = Rendering.BlendMode || (Rendering.BlendMode = {}));

    var BlendOp;

    (function (BlendOp) {
      BlendOp[BlendOp["Add"] = 0] = "Add";
      BlendOp[BlendOp["Subtract"] = 1] = "Subtract";
      BlendOp[BlendOp["ReverseSubtract"] = 2] = "ReverseSubtract";
      BlendOp[BlendOp["Min"] = 3] = "Min";
      BlendOp[BlendOp["Max"] = 4] = "Max";
      BlendOp[BlendOp["LogicalClear"] = 5] = "LogicalClear";
      BlendOp[BlendOp["LogicalSet"] = 6] = "LogicalSet";
      BlendOp[BlendOp["LogicalCopy"] = 7] = "LogicalCopy";
      BlendOp[BlendOp["LogicalCopyInverted"] = 8] = "LogicalCopyInverted";
      BlendOp[BlendOp["LogicalNoop"] = 9] = "LogicalNoop";
      BlendOp[BlendOp["LogicalInvert"] = 10] = "LogicalInvert";
      BlendOp[BlendOp["LogicalAnd"] = 11] = "LogicalAnd";
      BlendOp[BlendOp["LogicalNand"] = 12] = "LogicalNand";
      BlendOp[BlendOp["LogicalOr"] = 13] = "LogicalOr";
      BlendOp[BlendOp["LogicalNor"] = 14] = "LogicalNor";
      BlendOp[BlendOp["LogicalXor"] = 15] = "LogicalXor";
      BlendOp[BlendOp["LogicalEquivalence"] = 16] = "LogicalEquivalence";
      BlendOp[BlendOp["LogicalAndReverse"] = 17] = "LogicalAndReverse";
      BlendOp[BlendOp["LogicalAndInverted"] = 18] = "LogicalAndInverted";
      BlendOp[BlendOp["LogicalOrReverse"] = 19] = "LogicalOrReverse";
      BlendOp[BlendOp["LogicalOrInverted"] = 20] = "LogicalOrInverted";
      BlendOp[BlendOp["Multiply"] = 21] = "Multiply";
      BlendOp[BlendOp["Screen"] = 22] = "Screen";
      BlendOp[BlendOp["Overlay"] = 23] = "Overlay";
      BlendOp[BlendOp["Darken"] = 24] = "Darken";
      BlendOp[BlendOp["Lighten"] = 25] = "Lighten";
      BlendOp[BlendOp["ColorDodge"] = 26] = "ColorDodge";
      BlendOp[BlendOp["ColorBurn"] = 27] = "ColorBurn";
      BlendOp[BlendOp["HardLight"] = 28] = "HardLight";
      BlendOp[BlendOp["SoftLight"] = 29] = "SoftLight";
      BlendOp[BlendOp["Difference"] = 30] = "Difference";
      BlendOp[BlendOp["Exclusion"] = 31] = "Exclusion";
      BlendOp[BlendOp["HSLHue"] = 32] = "HSLHue";
      BlendOp[BlendOp["HSLSaturation"] = 33] = "HSLSaturation";
      BlendOp[BlendOp["HSLColor"] = 34] = "HSLColor";
      BlendOp[BlendOp["HSLLuminosity"] = 35] = "HSLLuminosity";
    })(BlendOp = Rendering.BlendOp || (Rendering.BlendOp = {}));

    var CompareFunction;

    (function (CompareFunction) {
      CompareFunction[CompareFunction["Disabled"] = 0] = "Disabled";
      CompareFunction[CompareFunction["Never"] = 1] = "Never";
      CompareFunction[CompareFunction["Less"] = 2] = "Less";
      CompareFunction[CompareFunction["Equal"] = 3] = "Equal";
      CompareFunction[CompareFunction["LessEqual"] = 4] = "LessEqual";
      CompareFunction[CompareFunction["Greater"] = 5] = "Greater";
      CompareFunction[CompareFunction["NotEqual"] = 6] = "NotEqual";
      CompareFunction[CompareFunction["GreaterEqual"] = 7] = "GreaterEqual";
      CompareFunction[CompareFunction["Always"] = 8] = "Always";
    })(CompareFunction = Rendering.CompareFunction || (Rendering.CompareFunction = {}));

    var CullMode;

    (function (CullMode) {
      CullMode[CullMode["Off"] = 0] = "Off";
      CullMode[CullMode["Front"] = 1] = "Front";
      CullMode[CullMode["Back"] = 2] = "Back";
    })(CullMode = Rendering.CullMode || (Rendering.CullMode = {}));

    var ColorWriteMask;

    (function (ColorWriteMask) {
      ColorWriteMask[ColorWriteMask["Alpha"] = 1] = "Alpha";
      ColorWriteMask[ColorWriteMask["Blue"] = 2] = "Blue";
      ColorWriteMask[ColorWriteMask["Green"] = 4] = "Green";
      ColorWriteMask[ColorWriteMask["Red"] = 8] = "Red";
      ColorWriteMask[ColorWriteMask["All"] = 15] = "All";
    })(ColorWriteMask = Rendering.ColorWriteMask || (Rendering.ColorWriteMask = {}));

    var StencilOp;

    (function (StencilOp) {
      StencilOp[StencilOp["Keep"] = 0] = "Keep";
      StencilOp[StencilOp["Zero"] = 1] = "Zero";
      StencilOp[StencilOp["Replace"] = 2] = "Replace";
      StencilOp[StencilOp["IncrementSaturate"] = 3] = "IncrementSaturate";
      StencilOp[StencilOp["DecrementSaturate"] = 4] = "DecrementSaturate";
      StencilOp[StencilOp["Invert"] = 5] = "Invert";
      StencilOp[StencilOp["IncrementWrap"] = 6] = "IncrementWrap";
      StencilOp[StencilOp["DecrementWrap"] = 7] = "DecrementWrap";
    })(StencilOp = Rendering.StencilOp || (Rendering.StencilOp = {}));

    var AmbientMode;

    (function (AmbientMode) {
      AmbientMode[AmbientMode["Skybox"] = 0] = "Skybox";
      AmbientMode[AmbientMode["Trilight"] = 1] = "Trilight";
      AmbientMode[AmbientMode["Flat"] = 3] = "Flat";
      AmbientMode[AmbientMode["Custom"] = 4] = "Custom";
    })(AmbientMode = Rendering.AmbientMode || (Rendering.AmbientMode = {}));

    var DefaultReflectionMode;

    (function (DefaultReflectionMode) {
      DefaultReflectionMode[DefaultReflectionMode["Skybox"] = 0] = "Skybox";
      DefaultReflectionMode[DefaultReflectionMode["Custom"] = 1] = "Custom";
    })(DefaultReflectionMode = Rendering.DefaultReflectionMode || (Rendering.DefaultReflectionMode = {}));

    var ReflectionCubemapCompression;

    (function (ReflectionCubemapCompression) {
      ReflectionCubemapCompression[ReflectionCubemapCompression["Uncompressed"] = 0] = "Uncompressed";
      ReflectionCubemapCompression[ReflectionCubemapCompression["Compressed"] = 1] = "Compressed";
      ReflectionCubemapCompression[ReflectionCubemapCompression["Auto"] = 2] = "Auto";
    })(ReflectionCubemapCompression = Rendering.ReflectionCubemapCompression || (Rendering.ReflectionCubemapCompression = {}));

    var CameraEvent;

    (function (CameraEvent) {
      CameraEvent[CameraEvent["BeforeDepthTexture"] = 0] = "BeforeDepthTexture";
      CameraEvent[CameraEvent["AfterDepthTexture"] = 1] = "AfterDepthTexture";
      CameraEvent[CameraEvent["BeforeDepthNormalsTexture"] = 2] = "BeforeDepthNormalsTexture";
      CameraEvent[CameraEvent["AfterDepthNormalsTexture"] = 3] = "AfterDepthNormalsTexture";
      CameraEvent[CameraEvent["BeforeGBuffer"] = 4] = "BeforeGBuffer";
      CameraEvent[CameraEvent["AfterGBuffer"] = 5] = "AfterGBuffer";
      CameraEvent[CameraEvent["BeforeLighting"] = 6] = "BeforeLighting";
      CameraEvent[CameraEvent["AfterLighting"] = 7] = "AfterLighting";
      CameraEvent[CameraEvent["BeforeFinalPass"] = 8] = "BeforeFinalPass";
      CameraEvent[CameraEvent["AfterFinalPass"] = 9] = "AfterFinalPass";
      CameraEvent[CameraEvent["BeforeForwardOpaque"] = 10] = "BeforeForwardOpaque";
      CameraEvent[CameraEvent["AfterForwardOpaque"] = 11] = "AfterForwardOpaque";
      CameraEvent[CameraEvent["BeforeImageEffectsOpaque"] = 12] = "BeforeImageEffectsOpaque";
      CameraEvent[CameraEvent["AfterImageEffectsOpaque"] = 13] = "AfterImageEffectsOpaque";
      CameraEvent[CameraEvent["BeforeSkybox"] = 14] = "BeforeSkybox";
      CameraEvent[CameraEvent["AfterSkybox"] = 15] = "AfterSkybox";
      CameraEvent[CameraEvent["BeforeForwardAlpha"] = 16] = "BeforeForwardAlpha";
      CameraEvent[CameraEvent["AfterForwardAlpha"] = 17] = "AfterForwardAlpha";
      CameraEvent[CameraEvent["BeforeImageEffects"] = 18] = "BeforeImageEffects";
      CameraEvent[CameraEvent["AfterImageEffects"] = 19] = "AfterImageEffects";
      CameraEvent[CameraEvent["AfterEverything"] = 20] = "AfterEverything";
      CameraEvent[CameraEvent["BeforeReflections"] = 21] = "BeforeReflections";
      CameraEvent[CameraEvent["AfterReflections"] = 22] = "AfterReflections";
      CameraEvent[CameraEvent["BeforeHaloAndLensFlares"] = 23] = "BeforeHaloAndLensFlares";
      CameraEvent[CameraEvent["AfterHaloAndLensFlares"] = 24] = "AfterHaloAndLensFlares";
    })(CameraEvent = Rendering.CameraEvent || (Rendering.CameraEvent = {}));

    var LightEvent;

    (function (LightEvent) {
      LightEvent[LightEvent["BeforeShadowMap"] = 0] = "BeforeShadowMap";
      LightEvent[LightEvent["AfterShadowMap"] = 1] = "AfterShadowMap";
      LightEvent[LightEvent["BeforeScreenspaceMask"] = 2] = "BeforeScreenspaceMask";
      LightEvent[LightEvent["AfterScreenspaceMask"] = 3] = "AfterScreenspaceMask";
      LightEvent[LightEvent["BeforeShadowMapPass"] = 4] = "BeforeShadowMapPass";
      LightEvent[LightEvent["AfterShadowMapPass"] = 5] = "AfterShadowMapPass";
    })(LightEvent = Rendering.LightEvent || (Rendering.LightEvent = {}));

    var ShadowMapPass;

    (function (ShadowMapPass) {
      ShadowMapPass[ShadowMapPass["PointlightPositiveX"] = 1] = "PointlightPositiveX";
      ShadowMapPass[ShadowMapPass["PointlightNegativeX"] = 2] = "PointlightNegativeX";
      ShadowMapPass[ShadowMapPass["PointlightPositiveY"] = 4] = "PointlightPositiveY";
      ShadowMapPass[ShadowMapPass["PointlightNegativeY"] = 8] = "PointlightNegativeY";
      ShadowMapPass[ShadowMapPass["PointlightPositiveZ"] = 16] = "PointlightPositiveZ";
      ShadowMapPass[ShadowMapPass["PointlightNegativeZ"] = 32] = "PointlightNegativeZ";
      ShadowMapPass[ShadowMapPass["DirectionalCascade0"] = 64] = "DirectionalCascade0";
      ShadowMapPass[ShadowMapPass["DirectionalCascade1"] = 128] = "DirectionalCascade1";
      ShadowMapPass[ShadowMapPass["DirectionalCascade2"] = 256] = "DirectionalCascade2";
      ShadowMapPass[ShadowMapPass["DirectionalCascade3"] = 512] = "DirectionalCascade3";
      ShadowMapPass[ShadowMapPass["Spotlight"] = 1024] = "Spotlight";
      ShadowMapPass[ShadowMapPass["Pointlight"] = 63] = "Pointlight";
      ShadowMapPass[ShadowMapPass["Directional"] = 960] = "Directional";
      ShadowMapPass[ShadowMapPass["All"] = 2047] = "All";
    })(ShadowMapPass = Rendering.ShadowMapPass || (Rendering.ShadowMapPass = {}));

    var BuiltinRenderTextureType;

    (function (BuiltinRenderTextureType) {
      BuiltinRenderTextureType[BuiltinRenderTextureType["PropertyName"] = -4] = "PropertyName";
      BuiltinRenderTextureType[BuiltinRenderTextureType["BufferPtr"] = -3] = "BufferPtr";
      BuiltinRenderTextureType[BuiltinRenderTextureType["RenderTexture"] = -2] = "RenderTexture";
      BuiltinRenderTextureType[BuiltinRenderTextureType["BindableTexture"] = -1] = "BindableTexture";
      BuiltinRenderTextureType[BuiltinRenderTextureType["None"] = 0] = "None";
      BuiltinRenderTextureType[BuiltinRenderTextureType["CurrentActive"] = 1] = "CurrentActive";
      BuiltinRenderTextureType[BuiltinRenderTextureType["CameraTarget"] = 2] = "CameraTarget";
      BuiltinRenderTextureType[BuiltinRenderTextureType["Depth"] = 3] = "Depth";
      BuiltinRenderTextureType[BuiltinRenderTextureType["DepthNormals"] = 4] = "DepthNormals";
      BuiltinRenderTextureType[BuiltinRenderTextureType["ResolvedDepth"] = 5] = "ResolvedDepth";
      BuiltinRenderTextureType[BuiltinRenderTextureType["PrepassNormalsSpec"] = 7] = "PrepassNormalsSpec";
      BuiltinRenderTextureType[BuiltinRenderTextureType["PrepassLight"] = 8] = "PrepassLight";
      BuiltinRenderTextureType[BuiltinRenderTextureType["PrepassLightSpec"] = 9] = "PrepassLightSpec";
      BuiltinRenderTextureType[BuiltinRenderTextureType["GBuffer0"] = 10] = "GBuffer0";
      BuiltinRenderTextureType[BuiltinRenderTextureType["GBuffer1"] = 11] = "GBuffer1";
      BuiltinRenderTextureType[BuiltinRenderTextureType["GBuffer2"] = 12] = "GBuffer2";
      BuiltinRenderTextureType[BuiltinRenderTextureType["GBuffer3"] = 13] = "GBuffer3";
      BuiltinRenderTextureType[BuiltinRenderTextureType["Reflections"] = 14] = "Reflections";
      BuiltinRenderTextureType[BuiltinRenderTextureType["MotionVectors"] = 15] = "MotionVectors";
      BuiltinRenderTextureType[BuiltinRenderTextureType["GBuffer4"] = 16] = "GBuffer4";
      BuiltinRenderTextureType[BuiltinRenderTextureType["GBuffer5"] = 17] = "GBuffer5";
      BuiltinRenderTextureType[BuiltinRenderTextureType["GBuffer6"] = 18] = "GBuffer6";
      BuiltinRenderTextureType[BuiltinRenderTextureType["GBuffer7"] = 19] = "GBuffer7";
    })(BuiltinRenderTextureType = Rendering.BuiltinRenderTextureType || (Rendering.BuiltinRenderTextureType = {}));

    var PassType;

    (function (PassType) {
      PassType[PassType["Normal"] = 0] = "Normal";
      PassType[PassType["Vertex"] = 1] = "Vertex";
      PassType[PassType["VertexLM"] = 2] = "VertexLM";
      PassType[PassType["VertexLMRGBM"] = 3] = "VertexLMRGBM";
      PassType[PassType["ForwardBase"] = 4] = "ForwardBase";
      PassType[PassType["ForwardAdd"] = 5] = "ForwardAdd";
      PassType[PassType["LightPrePassBase"] = 6] = "LightPrePassBase";
      PassType[PassType["LightPrePassFinal"] = 7] = "LightPrePassFinal";
      PassType[PassType["ShadowCaster"] = 8] = "ShadowCaster";
      PassType[PassType["Deferred"] = 10] = "Deferred";
      PassType[PassType["Meta"] = 11] = "Meta";
      PassType[PassType["MotionVectors"] = 12] = "MotionVectors";
      PassType[PassType["ScriptableRenderPipeline"] = 13] = "ScriptableRenderPipeline";
      PassType[PassType["ScriptableRenderPipelineDefaultUnlit"] = 14] = "ScriptableRenderPipelineDefaultUnlit";
    })(PassType = Rendering.PassType || (Rendering.PassType = {}));

    var ShadowCastingMode;

    (function (ShadowCastingMode) {
      ShadowCastingMode[ShadowCastingMode["Off"] = 0] = "Off";
      ShadowCastingMode[ShadowCastingMode["On"] = 1] = "On";
      ShadowCastingMode[ShadowCastingMode["TwoSided"] = 2] = "TwoSided";
      ShadowCastingMode[ShadowCastingMode["ShadowsOnly"] = 3] = "ShadowsOnly";
    })(ShadowCastingMode = Rendering.ShadowCastingMode || (Rendering.ShadowCastingMode = {}));

    var LightShadowResolution;

    (function (LightShadowResolution) {
      LightShadowResolution[LightShadowResolution["FromQualitySettings"] = -1] = "FromQualitySettings";
      LightShadowResolution[LightShadowResolution["Low"] = 0] = "Low";
      LightShadowResolution[LightShadowResolution["Medium"] = 1] = "Medium";
      LightShadowResolution[LightShadowResolution["High"] = 2] = "High";
      LightShadowResolution[LightShadowResolution["VeryHigh"] = 3] = "VeryHigh";
    })(LightShadowResolution = Rendering.LightShadowResolution || (Rendering.LightShadowResolution = {}));

    var GraphicsDeviceType;

    (function (GraphicsDeviceType) {
      GraphicsDeviceType[GraphicsDeviceType["OpenGL2"] = 0] = "OpenGL2";
      GraphicsDeviceType[GraphicsDeviceType["Direct3D9"] = 1] = "Direct3D9";
      GraphicsDeviceType[GraphicsDeviceType["Direct3D11"] = 2] = "Direct3D11";
      GraphicsDeviceType[GraphicsDeviceType["PlayStation3"] = 3] = "PlayStation3";
      GraphicsDeviceType[GraphicsDeviceType["Null"] = 4] = "Null";
      GraphicsDeviceType[GraphicsDeviceType["Xbox360"] = 6] = "Xbox360";
      GraphicsDeviceType[GraphicsDeviceType["OpenGLES2"] = 8] = "OpenGLES2";
      GraphicsDeviceType[GraphicsDeviceType["OpenGLES3"] = 11] = "OpenGLES3";
      GraphicsDeviceType[GraphicsDeviceType["PlayStationVita"] = 12] = "PlayStationVita";
      GraphicsDeviceType[GraphicsDeviceType["PlayStation4"] = 13] = "PlayStation4";
      GraphicsDeviceType[GraphicsDeviceType["XboxOne"] = 14] = "XboxOne";
      GraphicsDeviceType[GraphicsDeviceType["PlayStationMobile"] = 15] = "PlayStationMobile";
      GraphicsDeviceType[GraphicsDeviceType["Metal"] = 16] = "Metal";
      GraphicsDeviceType[GraphicsDeviceType["OpenGLCore"] = 17] = "OpenGLCore";
      GraphicsDeviceType[GraphicsDeviceType["Direct3D12"] = 18] = "Direct3D12";
      GraphicsDeviceType[GraphicsDeviceType["N3DS"] = 19] = "N3DS";
      GraphicsDeviceType[GraphicsDeviceType["Vulkan"] = 21] = "Vulkan";
      GraphicsDeviceType[GraphicsDeviceType["Switch"] = 22] = "Switch";
      GraphicsDeviceType[GraphicsDeviceType["XboxOneD3D12"] = 23] = "XboxOneD3D12";
    })(GraphicsDeviceType = Rendering.GraphicsDeviceType || (Rendering.GraphicsDeviceType = {}));

    var GraphicsTier;

    (function (GraphicsTier) {
      GraphicsTier[GraphicsTier["Tier1"] = 0] = "Tier1";
      GraphicsTier[GraphicsTier["Tier2"] = 1] = "Tier2";
      GraphicsTier[GraphicsTier["Tier3"] = 2] = "Tier3";
    })(GraphicsTier = Rendering.GraphicsTier || (Rendering.GraphicsTier = {}));

    var FormatSwizzle;

    (function (FormatSwizzle) {
      FormatSwizzle[FormatSwizzle["FormatSwizzleR"] = 0] = "FormatSwizzleR";
      FormatSwizzle[FormatSwizzle["FormatSwizzleG"] = 1] = "FormatSwizzleG";
      FormatSwizzle[FormatSwizzle["FormatSwizzleB"] = 2] = "FormatSwizzleB";
      FormatSwizzle[FormatSwizzle["FormatSwizzleA"] = 3] = "FormatSwizzleA";
      FormatSwizzle[FormatSwizzle["FormatSwizzle0"] = 4] = "FormatSwizzle0";
      FormatSwizzle[FormatSwizzle["FormatSwizzle1"] = 5] = "FormatSwizzle1";
    })(FormatSwizzle = Rendering.FormatSwizzle || (Rendering.FormatSwizzle = {}));

    var RenderTargetFlags;

    (function (RenderTargetFlags) {
      RenderTargetFlags[RenderTargetFlags["None"] = 0] = "None";
      RenderTargetFlags[RenderTargetFlags["ReadOnlyDepth"] = 1] = "ReadOnlyDepth";
      RenderTargetFlags[RenderTargetFlags["ReadOnlyStencil"] = 2] = "ReadOnlyStencil";
      RenderTargetFlags[RenderTargetFlags["ReadOnlyDepthStencil"] = 3] = "ReadOnlyDepthStencil";
    })(RenderTargetFlags = Rendering.RenderTargetFlags || (Rendering.RenderTargetFlags = {}));

    var ReflectionProbeUsage;

    (function (ReflectionProbeUsage) {
      ReflectionProbeUsage[ReflectionProbeUsage["Off"] = 0] = "Off";
      ReflectionProbeUsage[ReflectionProbeUsage["BlendProbes"] = 1] = "BlendProbes";
      ReflectionProbeUsage[ReflectionProbeUsage["BlendProbesAndSkybox"] = 2] = "BlendProbesAndSkybox";
      ReflectionProbeUsage[ReflectionProbeUsage["Simple"] = 3] = "Simple";
    })(ReflectionProbeUsage = Rendering.ReflectionProbeUsage || (Rendering.ReflectionProbeUsage = {}));

    var ReflectionProbeType;

    (function (ReflectionProbeType) {
      ReflectionProbeType[ReflectionProbeType["Cube"] = 0] = "Cube";
      ReflectionProbeType[ReflectionProbeType["Card"] = 1] = "Card";
    })(ReflectionProbeType = Rendering.ReflectionProbeType || (Rendering.ReflectionProbeType = {}));

    var ReflectionProbeClearFlags;

    (function (ReflectionProbeClearFlags) {
      ReflectionProbeClearFlags[ReflectionProbeClearFlags["Skybox"] = 1] = "Skybox";
      ReflectionProbeClearFlags[ReflectionProbeClearFlags["SolidColor"] = 2] = "SolidColor";
    })(ReflectionProbeClearFlags = Rendering.ReflectionProbeClearFlags || (Rendering.ReflectionProbeClearFlags = {}));

    var ReflectionProbeMode;

    (function (ReflectionProbeMode) {
      ReflectionProbeMode[ReflectionProbeMode["Baked"] = 0] = "Baked";
      ReflectionProbeMode[ReflectionProbeMode["Realtime"] = 1] = "Realtime";
      ReflectionProbeMode[ReflectionProbeMode["Custom"] = 2] = "Custom";
    })(ReflectionProbeMode = Rendering.ReflectionProbeMode || (Rendering.ReflectionProbeMode = {}));

    var ReflectionProbeRefreshMode;

    (function (ReflectionProbeRefreshMode) {
      ReflectionProbeRefreshMode[ReflectionProbeRefreshMode["OnAwake"] = 0] = "OnAwake";
      ReflectionProbeRefreshMode[ReflectionProbeRefreshMode["EveryFrame"] = 1] = "EveryFrame";
      ReflectionProbeRefreshMode[ReflectionProbeRefreshMode["ViaScripting"] = 2] = "ViaScripting";
    })(ReflectionProbeRefreshMode = Rendering.ReflectionProbeRefreshMode || (Rendering.ReflectionProbeRefreshMode = {}));

    var ReflectionProbeTimeSlicingMode;

    (function (ReflectionProbeTimeSlicingMode) {
      ReflectionProbeTimeSlicingMode[ReflectionProbeTimeSlicingMode["AllFacesAtOnce"] = 0] = "AllFacesAtOnce";
      ReflectionProbeTimeSlicingMode[ReflectionProbeTimeSlicingMode["IndividualFaces"] = 1] = "IndividualFaces";
      ReflectionProbeTimeSlicingMode[ReflectionProbeTimeSlicingMode["NoTimeSlicing"] = 2] = "NoTimeSlicing";
    })(ReflectionProbeTimeSlicingMode = Rendering.ReflectionProbeTimeSlicingMode || (Rendering.ReflectionProbeTimeSlicingMode = {}));

    var ShadowSamplingMode;

    (function (ShadowSamplingMode) {
      ShadowSamplingMode[ShadowSamplingMode["CompareDepths"] = 0] = "CompareDepths";
      ShadowSamplingMode[ShadowSamplingMode["RawDepth"] = 1] = "RawDepth";
      ShadowSamplingMode[ShadowSamplingMode["None"] = 2] = "None";
    })(ShadowSamplingMode = Rendering.ShadowSamplingMode || (Rendering.ShadowSamplingMode = {}));

    var LightProbeUsage;

    (function (LightProbeUsage) {
      LightProbeUsage[LightProbeUsage["Off"] = 0] = "Off";
      LightProbeUsage[LightProbeUsage["BlendProbes"] = 1] = "BlendProbes";
      LightProbeUsage[LightProbeUsage["UseProxyVolume"] = 2] = "UseProxyVolume";
      LightProbeUsage[LightProbeUsage["CustomProvided"] = 4] = "CustomProvided";
    })(LightProbeUsage = Rendering.LightProbeUsage || (Rendering.LightProbeUsage = {}));

    var BuiltinShaderType;

    (function (BuiltinShaderType) {
      BuiltinShaderType[BuiltinShaderType["DeferredShading"] = 0] = "DeferredShading";
      BuiltinShaderType[BuiltinShaderType["DeferredReflections"] = 1] = "DeferredReflections";
      BuiltinShaderType[BuiltinShaderType["LegacyDeferredLighting"] = 2] = "LegacyDeferredLighting";
      BuiltinShaderType[BuiltinShaderType["ScreenSpaceShadows"] = 3] = "ScreenSpaceShadows";
      BuiltinShaderType[BuiltinShaderType["DepthNormals"] = 4] = "DepthNormals";
      BuiltinShaderType[BuiltinShaderType["MotionVectors"] = 5] = "MotionVectors";
      BuiltinShaderType[BuiltinShaderType["LightHalo"] = 6] = "LightHalo";
      BuiltinShaderType[BuiltinShaderType["LensFlare"] = 7] = "LensFlare";
    })(BuiltinShaderType = Rendering.BuiltinShaderType || (Rendering.BuiltinShaderType = {}));

    var BuiltinShaderMode;

    (function (BuiltinShaderMode) {
      BuiltinShaderMode[BuiltinShaderMode["Disabled"] = 0] = "Disabled";
      BuiltinShaderMode[BuiltinShaderMode["UseBuiltin"] = 1] = "UseBuiltin";
      BuiltinShaderMode[BuiltinShaderMode["UseCustom"] = 2] = "UseCustom";
    })(BuiltinShaderMode = Rendering.BuiltinShaderMode || (Rendering.BuiltinShaderMode = {}));

    var BuiltinShaderDefine;

    (function (BuiltinShaderDefine) {
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_NO_DXT5nm"] = 0] = "UNITY_NO_DXT5nm";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_NO_RGBM"] = 1] = "UNITY_NO_RGBM";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_USE_NATIVE_HDR"] = 2] = "UNITY_USE_NATIVE_HDR";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_ENABLE_REFLECTION_BUFFERS"] = 3] = "UNITY_ENABLE_REFLECTION_BUFFERS";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_FRAMEBUFFER_FETCH_AVAILABLE"] = 4] = "UNITY_FRAMEBUFFER_FETCH_AVAILABLE";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_ENABLE_NATIVE_SHADOW_LOOKUPS"] = 5] = "UNITY_ENABLE_NATIVE_SHADOW_LOOKUPS";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_METAL_SHADOWS_USE_POINT_FILTERING"] = 6] = "UNITY_METAL_SHADOWS_USE_POINT_FILTERING";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_NO_CUBEMAP_ARRAY"] = 7] = "UNITY_NO_CUBEMAP_ARRAY";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_NO_SCREENSPACE_SHADOWS"] = 8] = "UNITY_NO_SCREENSPACE_SHADOWS";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_USE_DITHER_MASK_FOR_ALPHABLENDED_SHADOWS"] = 9] = "UNITY_USE_DITHER_MASK_FOR_ALPHABLENDED_SHADOWS";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_PBS_USE_BRDF1"] = 10] = "UNITY_PBS_USE_BRDF1";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_PBS_USE_BRDF2"] = 11] = "UNITY_PBS_USE_BRDF2";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_PBS_USE_BRDF3"] = 12] = "UNITY_PBS_USE_BRDF3";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_NO_FULL_STANDARD_SHADER"] = 13] = "UNITY_NO_FULL_STANDARD_SHADER";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_SPECCUBE_BOX_PROJECTION"] = 14] = "UNITY_SPECCUBE_BOX_PROJECTION";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_SPECCUBE_BLENDING"] = 15] = "UNITY_SPECCUBE_BLENDING";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_ENABLE_DETAIL_NORMALMAP"] = 16] = "UNITY_ENABLE_DETAIL_NORMALMAP";
      BuiltinShaderDefine[BuiltinShaderDefine["SHADER_API_MOBILE"] = 17] = "SHADER_API_MOBILE";
      BuiltinShaderDefine[BuiltinShaderDefine["SHADER_API_DESKTOP"] = 18] = "SHADER_API_DESKTOP";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_HARDWARE_TIER1"] = 19] = "UNITY_HARDWARE_TIER1";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_HARDWARE_TIER2"] = 20] = "UNITY_HARDWARE_TIER2";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_HARDWARE_TIER3"] = 21] = "UNITY_HARDWARE_TIER3";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_COLORSPACE_GAMMA"] = 22] = "UNITY_COLORSPACE_GAMMA";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_LIGHT_PROBE_PROXY_VOLUME"] = 23] = "UNITY_LIGHT_PROBE_PROXY_VOLUME";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_HALF_PRECISION_FRAGMENT_SHADER_REGISTERS"] = 24] = "UNITY_HALF_PRECISION_FRAGMENT_SHADER_REGISTERS";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_LIGHTMAP_DLDR_ENCODING"] = 25] = "UNITY_LIGHTMAP_DLDR_ENCODING";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_LIGHTMAP_RGBM_ENCODING"] = 26] = "UNITY_LIGHTMAP_RGBM_ENCODING";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_LIGHTMAP_FULL_HDR"] = 27] = "UNITY_LIGHTMAP_FULL_HDR";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_VIRTUAL_TEXTURING"] = 28] = "UNITY_VIRTUAL_TEXTURING";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_PRETRANSFORM_TO_DISPLAY_ORIENTATION"] = 29] = "UNITY_PRETRANSFORM_TO_DISPLAY_ORIENTATION";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_ASTC_NORMALMAP_ENCODING"] = 30] = "UNITY_ASTC_NORMALMAP_ENCODING";
      BuiltinShaderDefine[BuiltinShaderDefine["SHADER_API_GLES30"] = 31] = "SHADER_API_GLES30";
      BuiltinShaderDefine[BuiltinShaderDefine["UNITY_UNIFIED_SHADER_PRECISION_MODEL"] = 32] = "UNITY_UNIFIED_SHADER_PRECISION_MODEL";
    })(BuiltinShaderDefine = Rendering.BuiltinShaderDefine || (Rendering.BuiltinShaderDefine = {}));

    var VideoShadersIncludeMode;

    (function (VideoShadersIncludeMode) {
      VideoShadersIncludeMode[VideoShadersIncludeMode["Never"] = 0] = "Never";
      VideoShadersIncludeMode[VideoShadersIncludeMode["Referenced"] = 1] = "Referenced";
      VideoShadersIncludeMode[VideoShadersIncludeMode["Always"] = 2] = "Always";
    })(VideoShadersIncludeMode = Rendering.VideoShadersIncludeMode || (Rendering.VideoShadersIncludeMode = {}));

    var TextureDimension;

    (function (TextureDimension) {
      TextureDimension[TextureDimension["Unknown"] = -1] = "Unknown";
      TextureDimension[TextureDimension["None"] = 0] = "None";
      TextureDimension[TextureDimension["Any"] = 1] = "Any";
      TextureDimension[TextureDimension["Tex2D"] = 2] = "Tex2D";
      TextureDimension[TextureDimension["Tex3D"] = 3] = "Tex3D";
      TextureDimension[TextureDimension["Cube"] = 4] = "Cube";
      TextureDimension[TextureDimension["Tex2DArray"] = 5] = "Tex2DArray";
      TextureDimension[TextureDimension["CubeArray"] = 6] = "CubeArray";
    })(TextureDimension = Rendering.TextureDimension || (Rendering.TextureDimension = {}));

    var CopyTextureSupport;

    (function (CopyTextureSupport) {
      CopyTextureSupport[CopyTextureSupport["None"] = 0] = "None";
      CopyTextureSupport[CopyTextureSupport["Basic"] = 1] = "Basic";
      CopyTextureSupport[CopyTextureSupport["Copy3D"] = 2] = "Copy3D";
      CopyTextureSupport[CopyTextureSupport["DifferentTypes"] = 4] = "DifferentTypes";
      CopyTextureSupport[CopyTextureSupport["TextureToRT"] = 8] = "TextureToRT";
      CopyTextureSupport[CopyTextureSupport["RTToTexture"] = 16] = "RTToTexture";
    })(CopyTextureSupport = Rendering.CopyTextureSupport || (Rendering.CopyTextureSupport = {}));

    var CameraHDRMode;

    (function (CameraHDRMode) {
      CameraHDRMode[CameraHDRMode["FP16"] = 1] = "FP16";
      CameraHDRMode[CameraHDRMode["R11G11B10"] = 2] = "R11G11B10";
    })(CameraHDRMode = Rendering.CameraHDRMode || (Rendering.CameraHDRMode = {}));

    var RealtimeGICPUUsage;

    (function (RealtimeGICPUUsage) {
      RealtimeGICPUUsage[RealtimeGICPUUsage["Low"] = 25] = "Low";
      RealtimeGICPUUsage[RealtimeGICPUUsage["Medium"] = 50] = "Medium";
      RealtimeGICPUUsage[RealtimeGICPUUsage["High"] = 75] = "High";
      RealtimeGICPUUsage[RealtimeGICPUUsage["Unlimited"] = 100] = "Unlimited";
    })(RealtimeGICPUUsage = Rendering.RealtimeGICPUUsage || (Rendering.RealtimeGICPUUsage = {}));

    var ComputeQueueType;

    (function (ComputeQueueType) {
      ComputeQueueType[ComputeQueueType["Default"] = 0] = "Default";
      ComputeQueueType[ComputeQueueType["Background"] = 1] = "Background";
      ComputeQueueType[ComputeQueueType["Urgent"] = 2] = "Urgent";
    })(ComputeQueueType = Rendering.ComputeQueueType || (Rendering.ComputeQueueType = {}));

    var SinglePassStereoMode;

    (function (SinglePassStereoMode) {
      SinglePassStereoMode[SinglePassStereoMode["None"] = 0] = "None";
      SinglePassStereoMode[SinglePassStereoMode["SideBySide"] = 1] = "SideBySide";
      SinglePassStereoMode[SinglePassStereoMode["Instancing"] = 2] = "Instancing";
      SinglePassStereoMode[SinglePassStereoMode["Multiview"] = 3] = "Multiview";
    })(SinglePassStereoMode = Rendering.SinglePassStereoMode || (Rendering.SinglePassStereoMode = {}));

    var CommandBufferExecutionFlags;

    (function (CommandBufferExecutionFlags) {
      CommandBufferExecutionFlags[CommandBufferExecutionFlags["None"] = 0] = "None";
      CommandBufferExecutionFlags[CommandBufferExecutionFlags["AsyncCompute"] = 2] = "AsyncCompute";
    })(CommandBufferExecutionFlags = Rendering.CommandBufferExecutionFlags || (Rendering.CommandBufferExecutionFlags = {}));

    var RenderTextureSubElement;

    (function (RenderTextureSubElement) {
      RenderTextureSubElement[RenderTextureSubElement["Color"] = 0] = "Color";
      RenderTextureSubElement[RenderTextureSubElement["Depth"] = 1] = "Depth";
      RenderTextureSubElement[RenderTextureSubElement["Stencil"] = 2] = "Stencil";
      RenderTextureSubElement[RenderTextureSubElement["Default"] = 3] = "Default";
    })(RenderTextureSubElement = Rendering.RenderTextureSubElement || (Rendering.RenderTextureSubElement = {}));

    var RenderingThreadingMode;

    (function (RenderingThreadingMode) {
      RenderingThreadingMode[RenderingThreadingMode["Direct"] = 0] = "Direct";
      RenderingThreadingMode[RenderingThreadingMode["SingleThreaded"] = 1] = "SingleThreaded";
      RenderingThreadingMode[RenderingThreadingMode["MultiThreaded"] = 2] = "MultiThreaded";
      RenderingThreadingMode[RenderingThreadingMode["LegacyJobified"] = 3] = "LegacyJobified";
      RenderingThreadingMode[RenderingThreadingMode["NativeGraphicsJobs"] = 4] = "NativeGraphicsJobs";
      RenderingThreadingMode[RenderingThreadingMode["NativeGraphicsJobsWithoutRenderThread"] = 5] = "NativeGraphicsJobsWithoutRenderThread";
    })(RenderingThreadingMode = Rendering.RenderingThreadingMode || (Rendering.RenderingThreadingMode = {}));

    var OpenGLESVersion;

    (function (OpenGLESVersion) {
      OpenGLESVersion[OpenGLESVersion["None"] = 0] = "None";
      OpenGLESVersion[OpenGLESVersion["OpenGLES20"] = 1] = "OpenGLES20";
      OpenGLESVersion[OpenGLESVersion["OpenGLES30"] = 2] = "OpenGLES30";
      OpenGLESVersion[OpenGLESVersion["OpenGLES31"] = 3] = "OpenGLES31";
      OpenGLESVersion[OpenGLESVersion["OpenGLES31AEP"] = 4] = "OpenGLES31AEP";
      OpenGLESVersion[OpenGLESVersion["OpenGLES32"] = 5] = "OpenGLES32";
    })(OpenGLESVersion = Rendering.OpenGLESVersion || (Rendering.OpenGLESVersion = {}));

    var SynchronisationStageFlags;

    (function (SynchronisationStageFlags) {
      SynchronisationStageFlags[SynchronisationStageFlags["VertexProcessing"] = 1] = "VertexProcessing";
      SynchronisationStageFlags[SynchronisationStageFlags["PixelProcessing"] = 2] = "PixelProcessing";
      SynchronisationStageFlags[SynchronisationStageFlags["ComputeProcessing"] = 4] = "ComputeProcessing";
      SynchronisationStageFlags[SynchronisationStageFlags["AllGPUOperations"] = 7] = "AllGPUOperations";
    })(SynchronisationStageFlags = Rendering.SynchronisationStageFlags || (Rendering.SynchronisationStageFlags = {}));

    var GraphicsFenceType;

    (function (GraphicsFenceType) {
      GraphicsFenceType[GraphicsFenceType["AsyncQueueSynchronisation"] = 0] = "AsyncQueueSynchronisation";
      GraphicsFenceType[GraphicsFenceType["CPUSynchronisation"] = 1] = "CPUSynchronisation";
    })(GraphicsFenceType = Rendering.GraphicsFenceType || (Rendering.GraphicsFenceType = {}));

    var SplashScreen_StopBehavior;

    (function (SplashScreen_StopBehavior) {
      SplashScreen_StopBehavior[SplashScreen_StopBehavior["StopImmediate"] = 0] = "StopImmediate";
      SplashScreen_StopBehavior[SplashScreen_StopBehavior["FadeOut"] = 1] = "FadeOut";
    })(SplashScreen_StopBehavior = Rendering.SplashScreen_StopBehavior || (Rendering.SplashScreen_StopBehavior = {}));

    var CullingOptions;

    (function (CullingOptions) {
      CullingOptions[CullingOptions["None"] = 0] = "None";
      CullingOptions[CullingOptions["ForceEvenIfCameraIsNotActive"] = 1] = "ForceEvenIfCameraIsNotActive";
      CullingOptions[CullingOptions["OcclusionCull"] = 2] = "OcclusionCull";
      CullingOptions[CullingOptions["NeedsLighting"] = 4] = "NeedsLighting";
      CullingOptions[CullingOptions["NeedsReflectionProbes"] = 8] = "NeedsReflectionProbes";
      CullingOptions[CullingOptions["Stereo"] = 16] = "Stereo";
      CullingOptions[CullingOptions["DisablePerObjectCulling"] = 32] = "DisablePerObjectCulling";
      CullingOptions[CullingOptions["ShadowCasters"] = 64] = "ShadowCasters";
    })(CullingOptions = Rendering.CullingOptions || (Rendering.CullingOptions = {}));

    var GizmoSubset;

    (function (GizmoSubset) {
      GizmoSubset[GizmoSubset["PreImageEffects"] = 0] = "PreImageEffects";
      GizmoSubset[GizmoSubset["PostImageEffects"] = 1] = "PostImageEffects";
    })(GizmoSubset = Rendering.GizmoSubset || (Rendering.GizmoSubset = {}));

    var PerObjectData;

    (function (PerObjectData) {
      PerObjectData[PerObjectData["None"] = 0] = "None";
      PerObjectData[PerObjectData["LightProbe"] = 1] = "LightProbe";
      PerObjectData[PerObjectData["ReflectionProbes"] = 2] = "ReflectionProbes";
      PerObjectData[PerObjectData["LightProbeProxyVolume"] = 4] = "LightProbeProxyVolume";
      PerObjectData[PerObjectData["Lightmaps"] = 8] = "Lightmaps";
      PerObjectData[PerObjectData["LightData"] = 16] = "LightData";
      PerObjectData[PerObjectData["MotionVectors"] = 32] = "MotionVectors";
      PerObjectData[PerObjectData["LightIndices"] = 64] = "LightIndices";
      PerObjectData[PerObjectData["ReflectionProbeData"] = 128] = "ReflectionProbeData";
      PerObjectData[PerObjectData["OcclusionProbe"] = 256] = "OcclusionProbe";
      PerObjectData[PerObjectData["OcclusionProbeProxyVolume"] = 512] = "OcclusionProbeProxyVolume";
      PerObjectData[PerObjectData["ShadowMask"] = 1024] = "ShadowMask";
    })(PerObjectData = Rendering.PerObjectData || (Rendering.PerObjectData = {}));

    var ReflectionProbeSortingCriteria;

    (function (ReflectionProbeSortingCriteria) {
      ReflectionProbeSortingCriteria[ReflectionProbeSortingCriteria["None"] = 0] = "None";
      ReflectionProbeSortingCriteria[ReflectionProbeSortingCriteria["Importance"] = 1] = "Importance";
      ReflectionProbeSortingCriteria[ReflectionProbeSortingCriteria["Size"] = 2] = "Size";
      ReflectionProbeSortingCriteria[ReflectionProbeSortingCriteria["ImportanceThenSize"] = 3] = "ImportanceThenSize";
    })(ReflectionProbeSortingCriteria = Rendering.ReflectionProbeSortingCriteria || (Rendering.ReflectionProbeSortingCriteria = {}));

    var RenderStateMask;

    (function (RenderStateMask) {
      RenderStateMask[RenderStateMask["Nothing"] = 0] = "Nothing";
      RenderStateMask[RenderStateMask["Blend"] = 1] = "Blend";
      RenderStateMask[RenderStateMask["Raster"] = 2] = "Raster";
      RenderStateMask[RenderStateMask["Depth"] = 4] = "Depth";
      RenderStateMask[RenderStateMask["Stencil"] = 8] = "Stencil";
      RenderStateMask[RenderStateMask["Everything"] = 15] = "Everything";
    })(RenderStateMask = Rendering.RenderStateMask || (Rendering.RenderStateMask = {}));

    var SortingCriteria;

    (function (SortingCriteria) {
      SortingCriteria[SortingCriteria["None"] = 0] = "None";
      SortingCriteria[SortingCriteria["SortingLayer"] = 1] = "SortingLayer";
      SortingCriteria[SortingCriteria["RenderQueue"] = 2] = "RenderQueue";
      SortingCriteria[SortingCriteria["BackToFront"] = 4] = "BackToFront";
      SortingCriteria[SortingCriteria["QuantizedFrontToBack"] = 8] = "QuantizedFrontToBack";
      SortingCriteria[SortingCriteria["OptimizeStateChanges"] = 16] = "OptimizeStateChanges";
      SortingCriteria[SortingCriteria["CanvasOrder"] = 32] = "CanvasOrder";
      SortingCriteria[SortingCriteria["RendererPriority"] = 64] = "RendererPriority";
      SortingCriteria[SortingCriteria["CommonOpaque"] = 59] = "CommonOpaque";
      SortingCriteria[SortingCriteria["CommonTransparent"] = 23] = "CommonTransparent";
    })(SortingCriteria = Rendering.SortingCriteria || (Rendering.SortingCriteria = {}));

    var DistanceMetric;

    (function (DistanceMetric) {
      DistanceMetric[DistanceMetric["Perspective"] = 0] = "Perspective";
      DistanceMetric[DistanceMetric["Orthographic"] = 1] = "Orthographic";
      DistanceMetric[DistanceMetric["CustomAxis"] = 2] = "CustomAxis";
    })(DistanceMetric = Rendering.DistanceMetric || (Rendering.DistanceMetric = {}));

    var SupportedRenderingFeatures_ReflectionProbeModes;

    (function (SupportedRenderingFeatures_ReflectionProbeModes) {
      SupportedRenderingFeatures_ReflectionProbeModes[SupportedRenderingFeatures_ReflectionProbeModes["None"] = 0] = "None";
      SupportedRenderingFeatures_ReflectionProbeModes[SupportedRenderingFeatures_ReflectionProbeModes["Rotation"] = 1] = "Rotation";
    })(SupportedRenderingFeatures_ReflectionProbeModes = Rendering.SupportedRenderingFeatures_ReflectionProbeModes || (Rendering.SupportedRenderingFeatures_ReflectionProbeModes = {}));

    var SupportedRenderingFeatures_LightmapMixedBakeModes;

    (function (SupportedRenderingFeatures_LightmapMixedBakeModes) {
      SupportedRenderingFeatures_LightmapMixedBakeModes[SupportedRenderingFeatures_LightmapMixedBakeModes["None"] = 0] = "None";
      SupportedRenderingFeatures_LightmapMixedBakeModes[SupportedRenderingFeatures_LightmapMixedBakeModes["IndirectOnly"] = 1] = "IndirectOnly";
      SupportedRenderingFeatures_LightmapMixedBakeModes[SupportedRenderingFeatures_LightmapMixedBakeModes["Subtractive"] = 2] = "Subtractive";
      SupportedRenderingFeatures_LightmapMixedBakeModes[SupportedRenderingFeatures_LightmapMixedBakeModes["Shadowmask"] = 4] = "Shadowmask";
    })(SupportedRenderingFeatures_LightmapMixedBakeModes = Rendering.SupportedRenderingFeatures_LightmapMixedBakeModes || (Rendering.SupportedRenderingFeatures_LightmapMixedBakeModes = {}));

    var ShaderKeywordType;

    (function (ShaderKeywordType) {
      ShaderKeywordType[ShaderKeywordType["None"] = 0] = "None";
      ShaderKeywordType[ShaderKeywordType["BuiltinDefault"] = 2] = "BuiltinDefault";
      ShaderKeywordType[ShaderKeywordType["BuiltinExtra"] = 6] = "BuiltinExtra";
      ShaderKeywordType[ShaderKeywordType["BuiltinAutoStripped"] = 10] = "BuiltinAutoStripped";
      ShaderKeywordType[ShaderKeywordType["UserDefined"] = 16] = "UserDefined";
    })(ShaderKeywordType = Rendering.ShaderKeywordType || (Rendering.ShaderKeywordType = {}));

    var ShaderPropertyType;

    (function (ShaderPropertyType) {
      ShaderPropertyType[ShaderPropertyType["Color"] = 0] = "Color";
      ShaderPropertyType[ShaderPropertyType["Vector"] = 1] = "Vector";
      ShaderPropertyType[ShaderPropertyType["Float"] = 2] = "Float";
      ShaderPropertyType[ShaderPropertyType["Range"] = 3] = "Range";
      ShaderPropertyType[ShaderPropertyType["Texture"] = 4] = "Texture";
    })(ShaderPropertyType = Rendering.ShaderPropertyType || (Rendering.ShaderPropertyType = {}));

    var ShaderPropertyFlags;

    (function (ShaderPropertyFlags) {
      ShaderPropertyFlags[ShaderPropertyFlags["None"] = 0] = "None";
      ShaderPropertyFlags[ShaderPropertyFlags["HideInInspector"] = 1] = "HideInInspector";
      ShaderPropertyFlags[ShaderPropertyFlags["PerRendererData"] = 2] = "PerRendererData";
      ShaderPropertyFlags[ShaderPropertyFlags["NoScaleOffset"] = 4] = "NoScaleOffset";
      ShaderPropertyFlags[ShaderPropertyFlags["Normal"] = 8] = "Normal";
      ShaderPropertyFlags[ShaderPropertyFlags["HDR"] = 16] = "HDR";
      ShaderPropertyFlags[ShaderPropertyFlags["Gamma"] = 32] = "Gamma";
      ShaderPropertyFlags[ShaderPropertyFlags["NonModifiableTextureData"] = 64] = "NonModifiableTextureData";
      ShaderPropertyFlags[ShaderPropertyFlags["MainTexture"] = 128] = "MainTexture";
      ShaderPropertyFlags[ShaderPropertyFlags["MainColor"] = 256] = "MainColor";
    })(ShaderPropertyFlags = Rendering.ShaderPropertyFlags || (Rendering.ShaderPropertyFlags = {}));
  })(Rendering = UnityEngine.Rendering || (UnityEngine.Rendering = {}));

  var SceneManagement;

  (function (SceneManagement) {
    var LoadSceneMode;

    (function (LoadSceneMode) {
      LoadSceneMode[LoadSceneMode["Single"] = 0] = "Single";
      LoadSceneMode[LoadSceneMode["Additive"] = 1] = "Additive";
    })(LoadSceneMode = SceneManagement.LoadSceneMode || (SceneManagement.LoadSceneMode = {}));

    var LocalPhysicsMode;

    (function (LocalPhysicsMode) {
      LocalPhysicsMode[LocalPhysicsMode["None"] = 0] = "None";
      LocalPhysicsMode[LocalPhysicsMode["Physics2D"] = 1] = "Physics2D";
      LocalPhysicsMode[LocalPhysicsMode["Physics3D"] = 2] = "Physics3D";
    })(LocalPhysicsMode = SceneManagement.LocalPhysicsMode || (SceneManagement.LocalPhysicsMode = {}));

    var UnloadSceneOptions;

    (function (UnloadSceneOptions) {
      UnloadSceneOptions[UnloadSceneOptions["None"] = 0] = "None";
      UnloadSceneOptions[UnloadSceneOptions["UnloadAllEmbeddedSceneObjects"] = 1] = "UnloadAllEmbeddedSceneObjects";
    })(UnloadSceneOptions = SceneManagement.UnloadSceneOptions || (SceneManagement.UnloadSceneOptions = {}));
  })(SceneManagement = UnityEngine.SceneManagement || (UnityEngine.SceneManagement = {}));

  var Scripting;

  (function (Scripting) {
    var GarbageCollector_Mode;

    (function (GarbageCollector_Mode) {
      GarbageCollector_Mode[GarbageCollector_Mode["Disabled"] = 0] = "Disabled";
      GarbageCollector_Mode[GarbageCollector_Mode["Enabled"] = 1] = "Enabled";
      GarbageCollector_Mode[GarbageCollector_Mode["Manual"] = 2] = "Manual";
    })(GarbageCollector_Mode = Scripting.GarbageCollector_Mode || (Scripting.GarbageCollector_Mode = {}));
  })(Scripting = UnityEngine.Scripting || (UnityEngine.Scripting = {}));

  var tvOS;

  (function (tvOS) {
    var DeviceGeneration;

    (function (DeviceGeneration) {
      DeviceGeneration[DeviceGeneration["Unknown"] = 0] = "Unknown";
      DeviceGeneration[DeviceGeneration["AppleTV1Gen"] = 1001] = "AppleTV1Gen";
      DeviceGeneration[DeviceGeneration["AppleTV2Gen"] = 1002] = "AppleTV2Gen";
    })(DeviceGeneration = tvOS.DeviceGeneration || (tvOS.DeviceGeneration = {}));
  })(tvOS = UnityEngine.tvOS || (UnityEngine.tvOS = {}));

  var UI;

  (function (UI) {
    var CanvasUpdate;

    (function (CanvasUpdate) {
      CanvasUpdate[CanvasUpdate["Prelayout"] = 0] = "Prelayout";
      CanvasUpdate[CanvasUpdate["Layout"] = 1] = "Layout";
      CanvasUpdate[CanvasUpdate["PostLayout"] = 2] = "PostLayout";
      CanvasUpdate[CanvasUpdate["PreRender"] = 3] = "PreRender";
      CanvasUpdate[CanvasUpdate["LatePreRender"] = 4] = "LatePreRender";
      CanvasUpdate[CanvasUpdate["MaxUpdateValue"] = 5] = "MaxUpdateValue";
    })(CanvasUpdate = UI.CanvasUpdate || (UI.CanvasUpdate = {}));

    var GraphicRaycaster_BlockingObjects;

    (function (GraphicRaycaster_BlockingObjects) {
      GraphicRaycaster_BlockingObjects[GraphicRaycaster_BlockingObjects["None"] = 0] = "None";
      GraphicRaycaster_BlockingObjects[GraphicRaycaster_BlockingObjects["TwoD"] = 1] = "TwoD";
      GraphicRaycaster_BlockingObjects[GraphicRaycaster_BlockingObjects["ThreeD"] = 2] = "ThreeD";
      GraphicRaycaster_BlockingObjects[GraphicRaycaster_BlockingObjects["All"] = 3] = "All";
    })(GraphicRaycaster_BlockingObjects = UI.GraphicRaycaster_BlockingObjects || (UI.GraphicRaycaster_BlockingObjects = {}));

    var Image_Type;

    (function (Image_Type) {
      Image_Type[Image_Type["Simple"] = 0] = "Simple";
      Image_Type[Image_Type["Sliced"] = 1] = "Sliced";
      Image_Type[Image_Type["Tiled"] = 2] = "Tiled";
      Image_Type[Image_Type["Filled"] = 3] = "Filled";
    })(Image_Type = UI.Image_Type || (UI.Image_Type = {}));

    var Image_FillMethod;

    (function (Image_FillMethod) {
      Image_FillMethod[Image_FillMethod["Horizontal"] = 0] = "Horizontal";
      Image_FillMethod[Image_FillMethod["Vertical"] = 1] = "Vertical";
      Image_FillMethod[Image_FillMethod["Radial90"] = 2] = "Radial90";
      Image_FillMethod[Image_FillMethod["Radial180"] = 3] = "Radial180";
      Image_FillMethod[Image_FillMethod["Radial360"] = 4] = "Radial360";
    })(Image_FillMethod = UI.Image_FillMethod || (UI.Image_FillMethod = {}));

    var Image_OriginHorizontal;

    (function (Image_OriginHorizontal) {
      Image_OriginHorizontal[Image_OriginHorizontal["Left"] = 0] = "Left";
      Image_OriginHorizontal[Image_OriginHorizontal["Right"] = 1] = "Right";
    })(Image_OriginHorizontal = UI.Image_OriginHorizontal || (UI.Image_OriginHorizontal = {}));

    var Image_OriginVertical;

    (function (Image_OriginVertical) {
      Image_OriginVertical[Image_OriginVertical["Bottom"] = 0] = "Bottom";
      Image_OriginVertical[Image_OriginVertical["Top"] = 1] = "Top";
    })(Image_OriginVertical = UI.Image_OriginVertical || (UI.Image_OriginVertical = {}));

    var Image_Origin90;

    (function (Image_Origin90) {
      Image_Origin90[Image_Origin90["BottomLeft"] = 0] = "BottomLeft";
      Image_Origin90[Image_Origin90["TopLeft"] = 1] = "TopLeft";
      Image_Origin90[Image_Origin90["TopRight"] = 2] = "TopRight";
      Image_Origin90[Image_Origin90["BottomRight"] = 3] = "BottomRight";
    })(Image_Origin90 = UI.Image_Origin90 || (UI.Image_Origin90 = {}));

    var Image_Origin180;

    (function (Image_Origin180) {
      Image_Origin180[Image_Origin180["Bottom"] = 0] = "Bottom";
      Image_Origin180[Image_Origin180["Left"] = 1] = "Left";
      Image_Origin180[Image_Origin180["Top"] = 2] = "Top";
      Image_Origin180[Image_Origin180["Right"] = 3] = "Right";
    })(Image_Origin180 = UI.Image_Origin180 || (UI.Image_Origin180 = {}));

    var Image_Origin360;

    (function (Image_Origin360) {
      Image_Origin360[Image_Origin360["Bottom"] = 0] = "Bottom";
      Image_Origin360[Image_Origin360["Right"] = 1] = "Right";
      Image_Origin360[Image_Origin360["Top"] = 2] = "Top";
      Image_Origin360[Image_Origin360["Left"] = 3] = "Left";
    })(Image_Origin360 = UI.Image_Origin360 || (UI.Image_Origin360 = {}));

    var InputField_ContentType;

    (function (InputField_ContentType) {
      InputField_ContentType[InputField_ContentType["Standard"] = 0] = "Standard";
      InputField_ContentType[InputField_ContentType["Autocorrected"] = 1] = "Autocorrected";
      InputField_ContentType[InputField_ContentType["IntegerNumber"] = 2] = "IntegerNumber";
      InputField_ContentType[InputField_ContentType["DecimalNumber"] = 3] = "DecimalNumber";
      InputField_ContentType[InputField_ContentType["Alphanumeric"] = 4] = "Alphanumeric";
      InputField_ContentType[InputField_ContentType["Name"] = 5] = "Name";
      InputField_ContentType[InputField_ContentType["EmailAddress"] = 6] = "EmailAddress";
      InputField_ContentType[InputField_ContentType["Password"] = 7] = "Password";
      InputField_ContentType[InputField_ContentType["Pin"] = 8] = "Pin";
      InputField_ContentType[InputField_ContentType["Custom"] = 9] = "Custom";
    })(InputField_ContentType = UI.InputField_ContentType || (UI.InputField_ContentType = {}));

    var InputField_InputType;

    (function (InputField_InputType) {
      InputField_InputType[InputField_InputType["Standard"] = 0] = "Standard";
      InputField_InputType[InputField_InputType["AutoCorrect"] = 1] = "AutoCorrect";
      InputField_InputType[InputField_InputType["Password"] = 2] = "Password";
    })(InputField_InputType = UI.InputField_InputType || (UI.InputField_InputType = {}));

    var InputField_CharacterValidation;

    (function (InputField_CharacterValidation) {
      InputField_CharacterValidation[InputField_CharacterValidation["None"] = 0] = "None";
      InputField_CharacterValidation[InputField_CharacterValidation["Integer"] = 1] = "Integer";
      InputField_CharacterValidation[InputField_CharacterValidation["Decimal"] = 2] = "Decimal";
      InputField_CharacterValidation[InputField_CharacterValidation["Alphanumeric"] = 3] = "Alphanumeric";
      InputField_CharacterValidation[InputField_CharacterValidation["Name"] = 4] = "Name";
      InputField_CharacterValidation[InputField_CharacterValidation["EmailAddress"] = 5] = "EmailAddress";
    })(InputField_CharacterValidation = UI.InputField_CharacterValidation || (UI.InputField_CharacterValidation = {}));

    var InputField_LineType;

    (function (InputField_LineType) {
      InputField_LineType[InputField_LineType["SingleLine"] = 0] = "SingleLine";
      InputField_LineType[InputField_LineType["MultiLineSubmit"] = 1] = "MultiLineSubmit";
      InputField_LineType[InputField_LineType["MultiLineNewline"] = 2] = "MultiLineNewline";
    })(InputField_LineType = UI.InputField_LineType || (UI.InputField_LineType = {}));

    var AspectRatioFitter_AspectMode;

    (function (AspectRatioFitter_AspectMode) {
      AspectRatioFitter_AspectMode[AspectRatioFitter_AspectMode["None"] = 0] = "None";
      AspectRatioFitter_AspectMode[AspectRatioFitter_AspectMode["WidthControlsHeight"] = 1] = "WidthControlsHeight";
      AspectRatioFitter_AspectMode[AspectRatioFitter_AspectMode["HeightControlsWidth"] = 2] = "HeightControlsWidth";
      AspectRatioFitter_AspectMode[AspectRatioFitter_AspectMode["FitInParent"] = 3] = "FitInParent";
      AspectRatioFitter_AspectMode[AspectRatioFitter_AspectMode["EnvelopeParent"] = 4] = "EnvelopeParent";
    })(AspectRatioFitter_AspectMode = UI.AspectRatioFitter_AspectMode || (UI.AspectRatioFitter_AspectMode = {}));

    var CanvasScaler_ScaleMode;

    (function (CanvasScaler_ScaleMode) {
      CanvasScaler_ScaleMode[CanvasScaler_ScaleMode["ConstantPixelSize"] = 0] = "ConstantPixelSize";
      CanvasScaler_ScaleMode[CanvasScaler_ScaleMode["ScaleWithScreenSize"] = 1] = "ScaleWithScreenSize";
      CanvasScaler_ScaleMode[CanvasScaler_ScaleMode["ConstantPhysicalSize"] = 2] = "ConstantPhysicalSize";
    })(CanvasScaler_ScaleMode = UI.CanvasScaler_ScaleMode || (UI.CanvasScaler_ScaleMode = {}));

    var CanvasScaler_ScreenMatchMode;

    (function (CanvasScaler_ScreenMatchMode) {
      CanvasScaler_ScreenMatchMode[CanvasScaler_ScreenMatchMode["MatchWidthOrHeight"] = 0] = "MatchWidthOrHeight";
      CanvasScaler_ScreenMatchMode[CanvasScaler_ScreenMatchMode["Expand"] = 1] = "Expand";
      CanvasScaler_ScreenMatchMode[CanvasScaler_ScreenMatchMode["Shrink"] = 2] = "Shrink";
    })(CanvasScaler_ScreenMatchMode = UI.CanvasScaler_ScreenMatchMode || (UI.CanvasScaler_ScreenMatchMode = {}));

    var CanvasScaler_Unit;

    (function (CanvasScaler_Unit) {
      CanvasScaler_Unit[CanvasScaler_Unit["Centimeters"] = 0] = "Centimeters";
      CanvasScaler_Unit[CanvasScaler_Unit["Millimeters"] = 1] = "Millimeters";
      CanvasScaler_Unit[CanvasScaler_Unit["Inches"] = 2] = "Inches";
      CanvasScaler_Unit[CanvasScaler_Unit["Points"] = 3] = "Points";
      CanvasScaler_Unit[CanvasScaler_Unit["Picas"] = 4] = "Picas";
    })(CanvasScaler_Unit = UI.CanvasScaler_Unit || (UI.CanvasScaler_Unit = {}));

    var ContentSizeFitter_FitMode;

    (function (ContentSizeFitter_FitMode) {
      ContentSizeFitter_FitMode[ContentSizeFitter_FitMode["Unconstrained"] = 0] = "Unconstrained";
      ContentSizeFitter_FitMode[ContentSizeFitter_FitMode["MinSize"] = 1] = "MinSize";
      ContentSizeFitter_FitMode[ContentSizeFitter_FitMode["PreferredSize"] = 2] = "PreferredSize";
    })(ContentSizeFitter_FitMode = UI.ContentSizeFitter_FitMode || (UI.ContentSizeFitter_FitMode = {}));

    var GridLayoutGroup_Corner;

    (function (GridLayoutGroup_Corner) {
      GridLayoutGroup_Corner[GridLayoutGroup_Corner["UpperLeft"] = 0] = "UpperLeft";
      GridLayoutGroup_Corner[GridLayoutGroup_Corner["UpperRight"] = 1] = "UpperRight";
      GridLayoutGroup_Corner[GridLayoutGroup_Corner["LowerLeft"] = 2] = "LowerLeft";
      GridLayoutGroup_Corner[GridLayoutGroup_Corner["LowerRight"] = 3] = "LowerRight";
    })(GridLayoutGroup_Corner = UI.GridLayoutGroup_Corner || (UI.GridLayoutGroup_Corner = {}));

    var GridLayoutGroup_Axis;

    (function (GridLayoutGroup_Axis) {
      GridLayoutGroup_Axis[GridLayoutGroup_Axis["Horizontal"] = 0] = "Horizontal";
      GridLayoutGroup_Axis[GridLayoutGroup_Axis["Vertical"] = 1] = "Vertical";
    })(GridLayoutGroup_Axis = UI.GridLayoutGroup_Axis || (UI.GridLayoutGroup_Axis = {}));

    var GridLayoutGroup_Constraint;

    (function (GridLayoutGroup_Constraint) {
      GridLayoutGroup_Constraint[GridLayoutGroup_Constraint["Flexible"] = 0] = "Flexible";
      GridLayoutGroup_Constraint[GridLayoutGroup_Constraint["FixedColumnCount"] = 1] = "FixedColumnCount";
      GridLayoutGroup_Constraint[GridLayoutGroup_Constraint["FixedRowCount"] = 2] = "FixedRowCount";
    })(GridLayoutGroup_Constraint = UI.GridLayoutGroup_Constraint || (UI.GridLayoutGroup_Constraint = {}));

    var Navigation_Mode;

    (function (Navigation_Mode) {
      Navigation_Mode[Navigation_Mode["None"] = 0] = "None";
      Navigation_Mode[Navigation_Mode["Horizontal"] = 1] = "Horizontal";
      Navigation_Mode[Navigation_Mode["Vertical"] = 2] = "Vertical";
      Navigation_Mode[Navigation_Mode["Automatic"] = 3] = "Automatic";
      Navigation_Mode[Navigation_Mode["Explicit"] = 4] = "Explicit";
    })(Navigation_Mode = UI.Navigation_Mode || (UI.Navigation_Mode = {}));

    var ScrollRect_MovementType;

    (function (ScrollRect_MovementType) {
      ScrollRect_MovementType[ScrollRect_MovementType["Unrestricted"] = 0] = "Unrestricted";
      ScrollRect_MovementType[ScrollRect_MovementType["Elastic"] = 1] = "Elastic";
      ScrollRect_MovementType[ScrollRect_MovementType["Clamped"] = 2] = "Clamped";
    })(ScrollRect_MovementType = UI.ScrollRect_MovementType || (UI.ScrollRect_MovementType = {}));

    var ScrollRect_ScrollbarVisibility;

    (function (ScrollRect_ScrollbarVisibility) {
      ScrollRect_ScrollbarVisibility[ScrollRect_ScrollbarVisibility["Permanent"] = 0] = "Permanent";
      ScrollRect_ScrollbarVisibility[ScrollRect_ScrollbarVisibility["AutoHide"] = 1] = "AutoHide";
      ScrollRect_ScrollbarVisibility[ScrollRect_ScrollbarVisibility["AutoHideAndExpandViewport"] = 2] = "AutoHideAndExpandViewport";
    })(ScrollRect_ScrollbarVisibility = UI.ScrollRect_ScrollbarVisibility || (UI.ScrollRect_ScrollbarVisibility = {}));

    var Scrollbar_Direction;

    (function (Scrollbar_Direction) {
      Scrollbar_Direction[Scrollbar_Direction["LeftToRight"] = 0] = "LeftToRight";
      Scrollbar_Direction[Scrollbar_Direction["RightToLeft"] = 1] = "RightToLeft";
      Scrollbar_Direction[Scrollbar_Direction["BottomToTop"] = 2] = "BottomToTop";
      Scrollbar_Direction[Scrollbar_Direction["TopToBottom"] = 3] = "TopToBottom";
    })(Scrollbar_Direction = UI.Scrollbar_Direction || (UI.Scrollbar_Direction = {}));

    var Selectable_Transition;

    (function (Selectable_Transition) {
      Selectable_Transition[Selectable_Transition["None"] = 0] = "None";
      Selectable_Transition[Selectable_Transition["ColorTint"] = 1] = "ColorTint";
      Selectable_Transition[Selectable_Transition["SpriteSwap"] = 2] = "SpriteSwap";
      Selectable_Transition[Selectable_Transition["Animation"] = 3] = "Animation";
    })(Selectable_Transition = UI.Selectable_Transition || (UI.Selectable_Transition = {}));

    var Slider_Direction;

    (function (Slider_Direction) {
      Slider_Direction[Slider_Direction["LeftToRight"] = 0] = "LeftToRight";
      Slider_Direction[Slider_Direction["RightToLeft"] = 1] = "RightToLeft";
      Slider_Direction[Slider_Direction["BottomToTop"] = 2] = "BottomToTop";
      Slider_Direction[Slider_Direction["TopToBottom"] = 3] = "TopToBottom";
    })(Slider_Direction = UI.Slider_Direction || (UI.Slider_Direction = {}));

    var Toggle_ToggleTransition;

    (function (Toggle_ToggleTransition) {
      Toggle_ToggleTransition[Toggle_ToggleTransition["None"] = 0] = "None";
      Toggle_ToggleTransition[Toggle_ToggleTransition["Fade"] = 1] = "Fade";
    })(Toggle_ToggleTransition = UI.Toggle_ToggleTransition || (UI.Toggle_ToggleTransition = {}));
  })(UI = UnityEngine.UI || (UnityEngine.UI = {}));

  var Video;

  (function (Video) {
    var VideoRenderMode;

    (function (VideoRenderMode) {
      VideoRenderMode[VideoRenderMode["CameraFarPlane"] = 0] = "CameraFarPlane";
      VideoRenderMode[VideoRenderMode["CameraNearPlane"] = 1] = "CameraNearPlane";
      VideoRenderMode[VideoRenderMode["RenderTexture"] = 2] = "RenderTexture";
      VideoRenderMode[VideoRenderMode["MaterialOverride"] = 3] = "MaterialOverride";
      VideoRenderMode[VideoRenderMode["APIOnly"] = 4] = "APIOnly";
    })(VideoRenderMode = Video.VideoRenderMode || (Video.VideoRenderMode = {}));

    var Video3DLayout;

    (function (Video3DLayout) {
      Video3DLayout[Video3DLayout["No3D"] = 0] = "No3D";
      Video3DLayout[Video3DLayout["SideBySide3D"] = 1] = "SideBySide3D";
      Video3DLayout[Video3DLayout["OverUnder3D"] = 2] = "OverUnder3D";
    })(Video3DLayout = Video.Video3DLayout || (Video.Video3DLayout = {}));

    var VideoAspectRatio;

    (function (VideoAspectRatio) {
      VideoAspectRatio[VideoAspectRatio["NoScaling"] = 0] = "NoScaling";
      VideoAspectRatio[VideoAspectRatio["FitVertically"] = 1] = "FitVertically";
      VideoAspectRatio[VideoAspectRatio["FitHorizontally"] = 2] = "FitHorizontally";
      VideoAspectRatio[VideoAspectRatio["FitInside"] = 3] = "FitInside";
      VideoAspectRatio[VideoAspectRatio["FitOutside"] = 4] = "FitOutside";
      VideoAspectRatio[VideoAspectRatio["Stretch"] = 5] = "Stretch";
    })(VideoAspectRatio = Video.VideoAspectRatio || (Video.VideoAspectRatio = {}));

    var VideoTimeSource;

    (function (VideoTimeSource) {
      VideoTimeSource[VideoTimeSource["AudioDSPTimeSource"] = 0] = "AudioDSPTimeSource";
      VideoTimeSource[VideoTimeSource["GameTimeSource"] = 1] = "GameTimeSource";
    })(VideoTimeSource = Video.VideoTimeSource || (Video.VideoTimeSource = {}));

    var VideoTimeReference;

    (function (VideoTimeReference) {
      VideoTimeReference[VideoTimeReference["Freerun"] = 0] = "Freerun";
      VideoTimeReference[VideoTimeReference["InternalTime"] = 1] = "InternalTime";
      VideoTimeReference[VideoTimeReference["ExternalTime"] = 2] = "ExternalTime";
    })(VideoTimeReference = Video.VideoTimeReference || (Video.VideoTimeReference = {}));

    var VideoSource;

    (function (VideoSource) {
      VideoSource[VideoSource["VideoClip"] = 0] = "VideoClip";
      VideoSource[VideoSource["Url"] = 1] = "Url";
    })(VideoSource = Video.VideoSource || (Video.VideoSource = {}));

    var VideoAudioOutputMode;

    (function (VideoAudioOutputMode) {
      VideoAudioOutputMode[VideoAudioOutputMode["None"] = 0] = "None";
      VideoAudioOutputMode[VideoAudioOutputMode["AudioSource"] = 1] = "AudioSource";
      VideoAudioOutputMode[VideoAudioOutputMode["Direct"] = 2] = "Direct";
      VideoAudioOutputMode[VideoAudioOutputMode["APIOnly"] = 3] = "APIOnly";
    })(VideoAudioOutputMode = Video.VideoAudioOutputMode || (Video.VideoAudioOutputMode = {}));
  })(Video = UnityEngine.Video || (UnityEngine.Video = {}));

  var Windows;

  (function (Windows) {
    var Speech;

    (function (Speech) {
      var ConfidenceLevel;

      (function (ConfidenceLevel) {
        ConfidenceLevel[ConfidenceLevel["High"] = 0] = "High";
        ConfidenceLevel[ConfidenceLevel["Medium"] = 1] = "Medium";
        ConfidenceLevel[ConfidenceLevel["Low"] = 2] = "Low";
        ConfidenceLevel[ConfidenceLevel["Rejected"] = 3] = "Rejected";
      })(ConfidenceLevel = Speech.ConfidenceLevel || (Speech.ConfidenceLevel = {}));

      var SpeechSystemStatus;

      (function (SpeechSystemStatus) {
        SpeechSystemStatus[SpeechSystemStatus["Stopped"] = 0] = "Stopped";
        SpeechSystemStatus[SpeechSystemStatus["Running"] = 1] = "Running";
        SpeechSystemStatus[SpeechSystemStatus["Failed"] = 2] = "Failed";
      })(SpeechSystemStatus = Speech.SpeechSystemStatus || (Speech.SpeechSystemStatus = {}));

      var SpeechError;

      (function (SpeechError) {
        SpeechError[SpeechError["NoError"] = 0] = "NoError";
        SpeechError[SpeechError["TopicLanguageNotSupported"] = 1] = "TopicLanguageNotSupported";
        SpeechError[SpeechError["GrammarLanguageMismatch"] = 2] = "GrammarLanguageMismatch";
        SpeechError[SpeechError["GrammarCompilationFailure"] = 3] = "GrammarCompilationFailure";
        SpeechError[SpeechError["AudioQualityFailure"] = 4] = "AudioQualityFailure";
        SpeechError[SpeechError["PauseLimitExceeded"] = 5] = "PauseLimitExceeded";
        SpeechError[SpeechError["TimeoutExceeded"] = 6] = "TimeoutExceeded";
        SpeechError[SpeechError["NetworkFailure"] = 7] = "NetworkFailure";
        SpeechError[SpeechError["MicrophoneUnavailable"] = 8] = "MicrophoneUnavailable";
        SpeechError[SpeechError["UnknownError"] = 9] = "UnknownError";
      })(SpeechError = Speech.SpeechError || (Speech.SpeechError = {}));

      var DictationTopicConstraint;

      (function (DictationTopicConstraint) {
        DictationTopicConstraint[DictationTopicConstraint["WebSearch"] = 0] = "WebSearch";
        DictationTopicConstraint[DictationTopicConstraint["Form"] = 1] = "Form";
        DictationTopicConstraint[DictationTopicConstraint["Dictation"] = 2] = "Dictation";
      })(DictationTopicConstraint = Speech.DictationTopicConstraint || (Speech.DictationTopicConstraint = {}));

      var DictationCompletionCause;

      (function (DictationCompletionCause) {
        DictationCompletionCause[DictationCompletionCause["Complete"] = 0] = "Complete";
        DictationCompletionCause[DictationCompletionCause["AudioQualityFailure"] = 1] = "AudioQualityFailure";
        DictationCompletionCause[DictationCompletionCause["Canceled"] = 2] = "Canceled";
        DictationCompletionCause[DictationCompletionCause["TimeoutExceeded"] = 3] = "TimeoutExceeded";
        DictationCompletionCause[DictationCompletionCause["PauseLimitExceeded"] = 4] = "PauseLimitExceeded";
        DictationCompletionCause[DictationCompletionCause["NetworkFailure"] = 5] = "NetworkFailure";
        DictationCompletionCause[DictationCompletionCause["MicrophoneUnavailable"] = 6] = "MicrophoneUnavailable";
        DictationCompletionCause[DictationCompletionCause["UnknownError"] = 7] = "UnknownError";
      })(DictationCompletionCause = Speech.DictationCompletionCause || (Speech.DictationCompletionCause = {}));
    })(Speech = Windows.Speech || (Windows.Speech = {}));

    var WebCam;

    (function (WebCam) {
      var PhotoCaptureFileOutputFormat;

      (function (PhotoCaptureFileOutputFormat) {
        PhotoCaptureFileOutputFormat[PhotoCaptureFileOutputFormat["PNG"] = 0] = "PNG";
        PhotoCaptureFileOutputFormat[PhotoCaptureFileOutputFormat["JPG"] = 1] = "JPG";
      })(PhotoCaptureFileOutputFormat = WebCam.PhotoCaptureFileOutputFormat || (WebCam.PhotoCaptureFileOutputFormat = {}));

      var PhotoCapture_CaptureResultType;

      (function (PhotoCapture_CaptureResultType) {
        PhotoCapture_CaptureResultType[PhotoCapture_CaptureResultType["Success"] = 0] = "Success";
        PhotoCapture_CaptureResultType[PhotoCapture_CaptureResultType["UnknownError"] = 1] = "UnknownError";
      })(PhotoCapture_CaptureResultType = WebCam.PhotoCapture_CaptureResultType || (WebCam.PhotoCapture_CaptureResultType = {}));

      var VideoCapture_CaptureResultType;

      (function (VideoCapture_CaptureResultType) {
        VideoCapture_CaptureResultType[VideoCapture_CaptureResultType["Success"] = 0] = "Success";
        VideoCapture_CaptureResultType[VideoCapture_CaptureResultType["UnknownError"] = 1] = "UnknownError";
      })(VideoCapture_CaptureResultType = WebCam.VideoCapture_CaptureResultType || (WebCam.VideoCapture_CaptureResultType = {}));

      var VideoCapture_AudioState;

      (function (VideoCapture_AudioState) {
        VideoCapture_AudioState[VideoCapture_AudioState["MicAudio"] = 0] = "MicAudio";
        VideoCapture_AudioState[VideoCapture_AudioState["ApplicationAudio"] = 1] = "ApplicationAudio";
        VideoCapture_AudioState[VideoCapture_AudioState["ApplicationAndMicAudio"] = 2] = "ApplicationAndMicAudio";
        VideoCapture_AudioState[VideoCapture_AudioState["None"] = 3] = "None";
      })(VideoCapture_AudioState = WebCam.VideoCapture_AudioState || (WebCam.VideoCapture_AudioState = {}));

      var CapturePixelFormat;

      (function (CapturePixelFormat) {
        CapturePixelFormat[CapturePixelFormat["BGRA32"] = 0] = "BGRA32";
        CapturePixelFormat[CapturePixelFormat["NV12"] = 1] = "NV12";
        CapturePixelFormat[CapturePixelFormat["JPEG"] = 2] = "JPEG";
        CapturePixelFormat[CapturePixelFormat["PNG"] = 3] = "PNG";
      })(CapturePixelFormat = WebCam.CapturePixelFormat || (WebCam.CapturePixelFormat = {}));

      var WebCamMode;

      (function (WebCamMode) {
        WebCamMode[WebCamMode["None"] = 0] = "None";
        WebCamMode[WebCamMode["PhotoMode"] = 1] = "PhotoMode";
        WebCamMode[WebCamMode["VideoMode"] = 2] = "VideoMode";
      })(WebCamMode = WebCam.WebCamMode || (WebCam.WebCamMode = {}));
    })(WebCam = Windows.WebCam || (Windows.WebCam = {}));
  })(Windows = UnityEngine.Windows || (UnityEngine.Windows = {}));

  var WSA;

  (function (WSA) {
    var WindowActivationState;

    (function (WindowActivationState) {
      WindowActivationState[WindowActivationState["CodeActivated"] = 0] = "CodeActivated";
      WindowActivationState[WindowActivationState["Deactivated"] = 1] = "Deactivated";
      WindowActivationState[WindowActivationState["PointerActivated"] = 2] = "PointerActivated";
    })(WindowActivationState = WSA.WindowActivationState || (WSA.WindowActivationState = {}));

    var Folder;

    (function (Folder) {
      Folder[Folder["Installation"] = 0] = "Installation";
      Folder[Folder["Temporary"] = 1] = "Temporary";
      Folder[Folder["Local"] = 2] = "Local";
      Folder[Folder["Roaming"] = 3] = "Roaming";
      Folder[Folder["CameraRoll"] = 4] = "CameraRoll";
      Folder[Folder["DocumentsLibrary"] = 5] = "DocumentsLibrary";
      Folder[Folder["HomeGroup"] = 6] = "HomeGroup";
      Folder[Folder["MediaServerDevices"] = 7] = "MediaServerDevices";
      Folder[Folder["MusicLibrary"] = 8] = "MusicLibrary";
      Folder[Folder["PicturesLibrary"] = 9] = "PicturesLibrary";
      Folder[Folder["Playlists"] = 10] = "Playlists";
      Folder[Folder["RemovableDevices"] = 11] = "RemovableDevices";
      Folder[Folder["SavedPictures"] = 12] = "SavedPictures";
      Folder[Folder["VideosLibrary"] = 13] = "VideosLibrary";
    })(Folder = WSA.Folder || (WSA.Folder = {}));

    var TileTemplate;

    (function (TileTemplate) {
      TileTemplate[TileTemplate["TileSquare150x150Image"] = 0] = "TileSquare150x150Image";
      TileTemplate[TileTemplate["TileSquare150x150Block"] = 1] = "TileSquare150x150Block";
      TileTemplate[TileTemplate["TileSquare150x150Text01"] = 2] = "TileSquare150x150Text01";
      TileTemplate[TileTemplate["TileSquare150x150Text02"] = 3] = "TileSquare150x150Text02";
      TileTemplate[TileTemplate["TileSquare150x150Text03"] = 4] = "TileSquare150x150Text03";
      TileTemplate[TileTemplate["TileSquare150x150Text04"] = 5] = "TileSquare150x150Text04";
      TileTemplate[TileTemplate["TileSquare150x150PeekImageAndText01"] = 6] = "TileSquare150x150PeekImageAndText01";
      TileTemplate[TileTemplate["TileSquare150x150PeekImageAndText02"] = 7] = "TileSquare150x150PeekImageAndText02";
      TileTemplate[TileTemplate["TileSquare150x150PeekImageAndText03"] = 8] = "TileSquare150x150PeekImageAndText03";
      TileTemplate[TileTemplate["TileSquare150x150PeekImageAndText04"] = 9] = "TileSquare150x150PeekImageAndText04";
      TileTemplate[TileTemplate["TileWide310x150Image"] = 10] = "TileWide310x150Image";
      TileTemplate[TileTemplate["TileWide310x150ImageCollection"] = 11] = "TileWide310x150ImageCollection";
      TileTemplate[TileTemplate["TileWide310x150ImageAndText01"] = 12] = "TileWide310x150ImageAndText01";
      TileTemplate[TileTemplate["TileWide310x150ImageAndText02"] = 13] = "TileWide310x150ImageAndText02";
      TileTemplate[TileTemplate["TileWide310x150BlockAndText01"] = 14] = "TileWide310x150BlockAndText01";
      TileTemplate[TileTemplate["TileWide310x150BlockAndText02"] = 15] = "TileWide310x150BlockAndText02";
      TileTemplate[TileTemplate["TileWide310x150PeekImageCollection01"] = 16] = "TileWide310x150PeekImageCollection01";
      TileTemplate[TileTemplate["TileWide310x150PeekImageCollection02"] = 17] = "TileWide310x150PeekImageCollection02";
      TileTemplate[TileTemplate["TileWide310x150PeekImageCollection03"] = 18] = "TileWide310x150PeekImageCollection03";
      TileTemplate[TileTemplate["TileWide310x150PeekImageCollection04"] = 19] = "TileWide310x150PeekImageCollection04";
      TileTemplate[TileTemplate["TileWide310x150PeekImageCollection05"] = 20] = "TileWide310x150PeekImageCollection05";
      TileTemplate[TileTemplate["TileWide310x150PeekImageCollection06"] = 21] = "TileWide310x150PeekImageCollection06";
      TileTemplate[TileTemplate["TileWide310x150PeekImageAndText01"] = 22] = "TileWide310x150PeekImageAndText01";
      TileTemplate[TileTemplate["TileWide310x150PeekImageAndText02"] = 23] = "TileWide310x150PeekImageAndText02";
      TileTemplate[TileTemplate["TileWide310x150PeekImage01"] = 24] = "TileWide310x150PeekImage01";
      TileTemplate[TileTemplate["TileWide310x150PeekImage02"] = 25] = "TileWide310x150PeekImage02";
      TileTemplate[TileTemplate["TileWide310x150PeekImage03"] = 26] = "TileWide310x150PeekImage03";
      TileTemplate[TileTemplate["TileWide310x150PeekImage04"] = 27] = "TileWide310x150PeekImage04";
      TileTemplate[TileTemplate["TileWide310x150PeekImage05"] = 28] = "TileWide310x150PeekImage05";
      TileTemplate[TileTemplate["TileWide310x150PeekImage06"] = 29] = "TileWide310x150PeekImage06";
      TileTemplate[TileTemplate["TileWide310x150SmallImageAndText01"] = 30] = "TileWide310x150SmallImageAndText01";
      TileTemplate[TileTemplate["TileWide310x150SmallImageAndText02"] = 31] = "TileWide310x150SmallImageAndText02";
      TileTemplate[TileTemplate["TileWide310x150SmallImageAndText03"] = 32] = "TileWide310x150SmallImageAndText03";
      TileTemplate[TileTemplate["TileWide310x150SmallImageAndText04"] = 33] = "TileWide310x150SmallImageAndText04";
      TileTemplate[TileTemplate["TileWide310x150SmallImageAndText05"] = 34] = "TileWide310x150SmallImageAndText05";
      TileTemplate[TileTemplate["TileWide310x150Text01"] = 35] = "TileWide310x150Text01";
      TileTemplate[TileTemplate["TileWide310x150Text02"] = 36] = "TileWide310x150Text02";
      TileTemplate[TileTemplate["TileWide310x150Text03"] = 37] = "TileWide310x150Text03";
      TileTemplate[TileTemplate["TileWide310x150Text04"] = 38] = "TileWide310x150Text04";
      TileTemplate[TileTemplate["TileWide310x150Text05"] = 39] = "TileWide310x150Text05";
      TileTemplate[TileTemplate["TileWide310x150Text06"] = 40] = "TileWide310x150Text06";
      TileTemplate[TileTemplate["TileWide310x150Text07"] = 41] = "TileWide310x150Text07";
      TileTemplate[TileTemplate["TileWide310x150Text08"] = 42] = "TileWide310x150Text08";
      TileTemplate[TileTemplate["TileWide310x150Text09"] = 43] = "TileWide310x150Text09";
      TileTemplate[TileTemplate["TileWide310x150Text10"] = 44] = "TileWide310x150Text10";
      TileTemplate[TileTemplate["TileWide310x150Text11"] = 45] = "TileWide310x150Text11";
      TileTemplate[TileTemplate["TileSquare310x310BlockAndText01"] = 46] = "TileSquare310x310BlockAndText01";
      TileTemplate[TileTemplate["TileSquare310x310BlockAndText02"] = 47] = "TileSquare310x310BlockAndText02";
      TileTemplate[TileTemplate["TileSquare310x310Image"] = 48] = "TileSquare310x310Image";
      TileTemplate[TileTemplate["TileSquare310x310ImageAndText01"] = 49] = "TileSquare310x310ImageAndText01";
      TileTemplate[TileTemplate["TileSquare310x310ImageAndText02"] = 50] = "TileSquare310x310ImageAndText02";
      TileTemplate[TileTemplate["TileSquare310x310ImageAndTextOverlay01"] = 51] = "TileSquare310x310ImageAndTextOverlay01";
      TileTemplate[TileTemplate["TileSquare310x310ImageAndTextOverlay02"] = 52] = "TileSquare310x310ImageAndTextOverlay02";
      TileTemplate[TileTemplate["TileSquare310x310ImageAndTextOverlay03"] = 53] = "TileSquare310x310ImageAndTextOverlay03";
      TileTemplate[TileTemplate["TileSquare310x310ImageCollectionAndText01"] = 54] = "TileSquare310x310ImageCollectionAndText01";
      TileTemplate[TileTemplate["TileSquare310x310ImageCollectionAndText02"] = 55] = "TileSquare310x310ImageCollectionAndText02";
      TileTemplate[TileTemplate["TileSquare310x310ImageCollection"] = 56] = "TileSquare310x310ImageCollection";
      TileTemplate[TileTemplate["TileSquare310x310SmallImagesAndTextList01"] = 57] = "TileSquare310x310SmallImagesAndTextList01";
      TileTemplate[TileTemplate["TileSquare310x310SmallImagesAndTextList02"] = 58] = "TileSquare310x310SmallImagesAndTextList02";
      TileTemplate[TileTemplate["TileSquare310x310SmallImagesAndTextList03"] = 59] = "TileSquare310x310SmallImagesAndTextList03";
      TileTemplate[TileTemplate["TileSquare310x310SmallImagesAndTextList04"] = 60] = "TileSquare310x310SmallImagesAndTextList04";
      TileTemplate[TileTemplate["TileSquare310x310Text01"] = 61] = "TileSquare310x310Text01";
      TileTemplate[TileTemplate["TileSquare310x310Text02"] = 62] = "TileSquare310x310Text02";
      TileTemplate[TileTemplate["TileSquare310x310Text03"] = 63] = "TileSquare310x310Text03";
      TileTemplate[TileTemplate["TileSquare310x310Text04"] = 64] = "TileSquare310x310Text04";
      TileTemplate[TileTemplate["TileSquare310x310Text05"] = 65] = "TileSquare310x310Text05";
      TileTemplate[TileTemplate["TileSquare310x310Text06"] = 66] = "TileSquare310x310Text06";
      TileTemplate[TileTemplate["TileSquare310x310Text07"] = 67] = "TileSquare310x310Text07";
      TileTemplate[TileTemplate["TileSquare310x310Text08"] = 68] = "TileSquare310x310Text08";
      TileTemplate[TileTemplate["TileSquare310x310TextList01"] = 69] = "TileSquare310x310TextList01";
      TileTemplate[TileTemplate["TileSquare310x310TextList02"] = 70] = "TileSquare310x310TextList02";
      TileTemplate[TileTemplate["TileSquare310x310TextList03"] = 71] = "TileSquare310x310TextList03";
      TileTemplate[TileTemplate["TileSquare310x310SmallImageAndText01"] = 72] = "TileSquare310x310SmallImageAndText01";
      TileTemplate[TileTemplate["TileSquare310x310SmallImagesAndTextList05"] = 73] = "TileSquare310x310SmallImagesAndTextList05";
      TileTemplate[TileTemplate["TileSquare310x310Text09"] = 74] = "TileSquare310x310Text09";
      TileTemplate[TileTemplate["TileSquare71x71IconWithBadge"] = 75] = "TileSquare71x71IconWithBadge";
      TileTemplate[TileTemplate["TileSquare150x150IconWithBadge"] = 76] = "TileSquare150x150IconWithBadge";
      TileTemplate[TileTemplate["TileWide310x150IconWithBadgeAndText"] = 77] = "TileWide310x150IconWithBadgeAndText";
      TileTemplate[TileTemplate["TileSquare71x71Image"] = 78] = "TileSquare71x71Image";
      TileTemplate[TileTemplate["TileTall150x310Image"] = 79] = "TileTall150x310Image";
      TileTemplate[TileTemplate["TileSquare99x99IconWithBadge"] = 1000] = "TileSquare99x99IconWithBadge";
      TileTemplate[TileTemplate["TileSquare210x210IconWithBadge"] = 1001] = "TileSquare210x210IconWithBadge";
      TileTemplate[TileTemplate["TileWide432x210IconWithBadgeAndText"] = 1002] = "TileWide432x210IconWithBadgeAndText";
    })(TileTemplate = WSA.TileTemplate || (WSA.TileTemplate = {}));

    var ToastTemplate;

    (function (ToastTemplate) {
      ToastTemplate[ToastTemplate["ToastImageAndText01"] = 0] = "ToastImageAndText01";
      ToastTemplate[ToastTemplate["ToastImageAndText02"] = 1] = "ToastImageAndText02";
      ToastTemplate[ToastTemplate["ToastImageAndText03"] = 2] = "ToastImageAndText03";
      ToastTemplate[ToastTemplate["ToastImageAndText04"] = 3] = "ToastImageAndText04";
      ToastTemplate[ToastTemplate["ToastText01"] = 4] = "ToastText01";
      ToastTemplate[ToastTemplate["ToastText02"] = 5] = "ToastText02";
      ToastTemplate[ToastTemplate["ToastText03"] = 6] = "ToastText03";
      ToastTemplate[ToastTemplate["ToastText04"] = 7] = "ToastText04";
    })(ToastTemplate = WSA.ToastTemplate || (WSA.ToastTemplate = {}));

    var TileForegroundText;

    (function (TileForegroundText) {
      TileForegroundText[TileForegroundText["Default"] = -1] = "Default";
      TileForegroundText[TileForegroundText["Dark"] = 0] = "Dark";
      TileForegroundText[TileForegroundText["Light"] = 1] = "Light";
    })(TileForegroundText = WSA.TileForegroundText || (WSA.TileForegroundText = {}));
  })(WSA = UnityEngine.WSA || (UnityEngine.WSA = {}));
})(UnityEngine || (UnityEngine = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/generated/react.js
var ReactUnity;

(function (ReactUnity) {
  var ScriptSource;

  (function (ScriptSource) {
    ScriptSource[ScriptSource["TextAsset"] = 0] = "TextAsset";
    ScriptSource[ScriptSource["File"] = 1] = "File";
    ScriptSource[ScriptSource["Url"] = 2] = "Url";
    ScriptSource[ScriptSource["Resource"] = 3] = "Resource";
    ScriptSource[ScriptSource["Text"] = 4] = "Text";
  })(ScriptSource = ReactUnity.ScriptSource || (ReactUnity.ScriptSource = {}));

  var StyleEngine;

  (function (StyleEngine) {
    var RuleRelationType;

    (function (RuleRelationType) {
      RuleRelationType[RuleRelationType["Self"] = 0] = "Self";
      RuleRelationType[RuleRelationType["Parent"] = 1] = "Parent";
      RuleRelationType[RuleRelationType["DirectParent"] = 2] = "DirectParent";
      RuleRelationType[RuleRelationType["Sibling"] = 3] = "Sibling";
      RuleRelationType[RuleRelationType["DirectSibling"] = 4] = "DirectSibling";
    })(RuleRelationType = StyleEngine.RuleRelationType || (StyleEngine.RuleRelationType = {}));

    var RuleSelectorPartType;

    (function (RuleSelectorPartType) {
      RuleSelectorPartType[RuleSelectorPartType["None"] = 0] = "None";
      RuleSelectorPartType[RuleSelectorPartType["All"] = 1] = "All";
      RuleSelectorPartType[RuleSelectorPartType["Tag"] = 2] = "Tag";
      RuleSelectorPartType[RuleSelectorPartType["Id"] = 3] = "Id";
      RuleSelectorPartType[RuleSelectorPartType["ClassName"] = 4] = "ClassName";
      RuleSelectorPartType[RuleSelectorPartType["Attribute"] = 5] = "Attribute";
      RuleSelectorPartType[RuleSelectorPartType["DirectDescendant"] = 10] = "DirectDescendant";
      RuleSelectorPartType[RuleSelectorPartType["AdjacentSibling"] = 11] = "AdjacentSibling";
      RuleSelectorPartType[RuleSelectorPartType["Sibling"] = 12] = "Sibling";
      RuleSelectorPartType[RuleSelectorPartType["Self"] = 13] = "Self";
      RuleSelectorPartType[RuleSelectorPartType["Not"] = 20] = "Not";
      RuleSelectorPartType[RuleSelectorPartType["FirstChild"] = 21] = "FirstChild";
      RuleSelectorPartType[RuleSelectorPartType["LastChild"] = 22] = "LastChild";
      RuleSelectorPartType[RuleSelectorPartType["NthChild"] = 23] = "NthChild";
      RuleSelectorPartType[RuleSelectorPartType["NthLastChild"] = 24] = "NthLastChild";
      RuleSelectorPartType[RuleSelectorPartType["OnlyChild"] = 25] = "OnlyChild";
      RuleSelectorPartType[RuleSelectorPartType["Empty"] = 26] = "Empty";
      RuleSelectorPartType[RuleSelectorPartType["Root"] = 27] = "Root";
      RuleSelectorPartType[RuleSelectorPartType["Scope"] = 28] = "Scope";
      RuleSelectorPartType[RuleSelectorPartType["Hover"] = 100] = "Hover";
      RuleSelectorPartType[RuleSelectorPartType["Focus"] = 101] = "Focus";
      RuleSelectorPartType[RuleSelectorPartType["FocusVisible"] = 102] = "FocusVisible";
      RuleSelectorPartType[RuleSelectorPartType["FocusWithin"] = 103] = "FocusWithin";
      RuleSelectorPartType[RuleSelectorPartType["Active"] = 104] = "Active";
      RuleSelectorPartType[RuleSelectorPartType["Before"] = 500] = "Before";
      RuleSelectorPartType[RuleSelectorPartType["After"] = 501] = "After";
      RuleSelectorPartType[RuleSelectorPartType["Important"] = 1000] = "Important";
      RuleSelectorPartType[RuleSelectorPartType["Special"] = 1001] = "Special";
      RuleSelectorPartType[RuleSelectorPartType["State"] = 2000] = "State";
    })(RuleSelectorPartType = StyleEngine.RuleSelectorPartType || (StyleEngine.RuleSelectorPartType = {}));
  })(StyleEngine = ReactUnity.StyleEngine || (ReactUnity.StyleEngine = {}));

  var Styling;

  (function (Styling) {
    var Types;

    (function (Types) {
      var Appearance;

      (function (Appearance) {
        Appearance[Appearance["None"] = 0] = "None";
        Appearance[Appearance["Button"] = 1] = "Button";
        Appearance[Appearance["Input"] = 2] = "Input";
        Appearance[Appearance["Toggle"] = 3] = "Toggle";
      })(Appearance = Types.Appearance || (Types.Appearance = {}));

      var PointerEvents;

      (function (PointerEvents) {
        PointerEvents[PointerEvents["Auto"] = 0] = "Auto";
        PointerEvents[PointerEvents["Visible"] = 0] = "Visible";
        PointerEvents[PointerEvents["All"] = 1] = "All";
        PointerEvents[PointerEvents["None"] = 2] = "None";
      })(PointerEvents = Types.PointerEvents || (Types.PointerEvents = {}));

      var SpecialNames;

      (function (SpecialNames) {
        SpecialNames[SpecialNames["NoSpecialName"] = 0] = "NoSpecialName";
        SpecialNames[SpecialNames["Initial"] = 1] = "Initial";
        SpecialNames[SpecialNames["Default"] = 1] = "Default";
        SpecialNames[SpecialNames["Inherit"] = 2] = "Inherit";
        SpecialNames[SpecialNames["CantParse"] = 3] = "CantParse";
        SpecialNames[SpecialNames["Auto"] = 4] = "Auto";
        SpecialNames[SpecialNames["None"] = 5] = "None";
        SpecialNames[SpecialNames["Unset"] = 6] = "Unset";
      })(SpecialNames = Types.SpecialNames || (Types.SpecialNames = {}));
    })(Types = Styling.Types || (Styling.Types = {}));
  })(Styling = ReactUnity.Styling || (ReactUnity.Styling = {}));

  var Types;

  (function (Types) {
    var AssetReferenceType;

    (function (AssetReferenceType) {
      AssetReferenceType[AssetReferenceType["None"] = 0] = "None";
      AssetReferenceType[AssetReferenceType["Auto"] = 1] = "Auto";
      AssetReferenceType[AssetReferenceType["Object"] = 2] = "Object";
      AssetReferenceType[AssetReferenceType["Resource"] = 3] = "Resource";
      AssetReferenceType[AssetReferenceType["File"] = 4] = "File";
      AssetReferenceType[AssetReferenceType["Url"] = 5] = "Url";
      AssetReferenceType[AssetReferenceType["Global"] = 6] = "Global";
      AssetReferenceType[AssetReferenceType["Procedural"] = 7] = "Procedural";
      AssetReferenceType[AssetReferenceType["Data"] = 8] = "Data";
    })(AssetReferenceType = Types.AssetReferenceType || (Types.AssetReferenceType = {}));

    var ImageFitMode;

    (function (ImageFitMode) {
      ImageFitMode[ImageFitMode["Center"] = 0] = "Center";
      ImageFitMode[ImageFitMode["CenterCrop"] = 1] = "CenterCrop";
      ImageFitMode[ImageFitMode["CenterInside"] = 2] = "CenterInside";
      ImageFitMode[ImageFitMode["FitCenter"] = 3] = "FitCenter";
      ImageFitMode[ImageFitMode["FitStart"] = 4] = "FitStart";
      ImageFitMode[ImageFitMode["FitEnd"] = 5] = "FitEnd";
      ImageFitMode[ImageFitMode["Fill"] = 6] = "Fill";
    })(ImageFitMode = Types.ImageFitMode || (Types.ImageFitMode = {}));
  })(Types = ReactUnity.Types || (ReactUnity.Types = {}));

  var WebSupport;

  (function (WebSupport) {
    var ContentType;

    (function (ContentType) {
      ContentType[ContentType["Standard"] = 0] = "Standard";
      ContentType[ContentType["Autocorrected"] = 1] = "Autocorrected";
      ContentType[ContentType["IntegerNumber"] = 2] = "IntegerNumber";
      ContentType[ContentType["DecimalNumber"] = 3] = "DecimalNumber";
      ContentType[ContentType["Alphanumeric"] = 4] = "Alphanumeric";
      ContentType[ContentType["Name"] = 5] = "Name";
      ContentType[ContentType["EmailAddress"] = 6] = "EmailAddress";
      ContentType[ContentType["Password"] = 7] = "Password";
      ContentType[ContentType["Pin"] = 8] = "Pin";
      ContentType[ContentType["Custom"] = 9] = "Custom";
    })(ContentType = WebSupport.ContentType || (WebSupport.ContentType = {}));

    var LineType;

    (function (LineType) {
      LineType[LineType["SingleLine"] = 0] = "SingleLine";
      LineType[LineType["MultiLineSubmit"] = 1] = "MultiLineSubmit";
      LineType[LineType["MultiLineNewline"] = 2] = "MultiLineNewline";
    })(LineType = WebSupport.LineType || (WebSupport.LineType = {}));
  })(WebSupport = ReactUnity.WebSupport || (ReactUnity.WebSupport = {}));
})(ReactUnity || (ReactUnity = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/generated/index.js


;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/index.js















// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[1]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[6].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[3]!./src/showcase/index.module.scss
var index_module = __webpack_require__(810);
;// CONCATENATED MODULE: ./src/showcase/index.module.scss

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(index_module/* default */.Z, options);



/* harmony default export */ const showcase_index_module = (index_module/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/assets/bg.png
/* harmony default export */ const bg = (__webpack_require__.p + "static/media/bg.png");
;// CONCATENATED MODULE: ./src/assets/base64Image.txt
/* harmony default export */ const base64Image = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAcElEQVR4AezOsREAIAjFUAs3dgAGYkj8C3g2oBTJXfo3iD419dJ2eOn5EuM6LnsFynQkb4AKQP2zlBOLpAEBAgQIECBAgAA1Au29p6aDrlPBQd3UdJA7yIcUho4KA5UBBxDHk9GwzwdiGQY6gVEwCgC3bcAZ+oXojwAAAABJRU5ErkJggg==\n");
// EXTERNAL MODULE: ./src/assets/check.svg
var check = __webpack_require__(719);
var check_default = /*#__PURE__*/__webpack_require__.n(check);
;// CONCATENATED MODULE: ./src/showcase/index.tsx
var webImage='https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';var webVideo='https://media.w3.org/2010/05/sintel/trailer.mp4';function App(){var _useState=(0,react.useState)(),_useState2=_slicedToArray(_useState,2),videoRef=_useState2[0],setVideoRef=_useState2[1];(0,react.useEffect)(function(){if(videoRef){videoRef.VideoPlayer.Pause();}},[videoRef]);var toggleVideo=function toggleVideo(){var vp=videoRef.VideoPlayer;if(vp.isPlaying)vp.Pause();else vp.Play();};var tooltipContent=/*#__PURE__*/(0,jsx_runtime.jsx)("view",{style:{padding:10,backgroundColor:0.4,color:'white'},children:"Cool tooltip"});return/*#__PURE__*/(0,jsx_runtime.jsx)("scroll",{children:/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:showcase_index_module.app,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h1",{children:"React Unity Showcase"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Button"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{children:"Click"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Anchor"}),/*#__PURE__*/(0,jsx_runtime.jsx)("anchor",{url:"https://www.google.com",children:"Open Google"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Input"}),/*#__PURE__*/(0,jsx_runtime.jsx)("input",{})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Toggle"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("toggle",{}),"Toggle"]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Tooltip"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Tooltip,{tooltipContent:tooltipContent,position:"bottom",offset:20,children:"Hover to see cool tooltip."})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Dropdown"}),/*#__PURE__*/(0,jsx_runtime.jsxs)(Dropdown,{children:["Select an option",/*#__PURE__*/(0,jsx_runtime.jsx)(DropdownItem,{children:"Normal Option"}),/*#__PURE__*/(0,jsx_runtime.jsx)(DropdownItem,{triggerTemplate:/*#__PURE__*/(0,jsx_runtime.jsx)("view",{style:{color:'green'},children:"Green Option"}),children:"Green Option \uD83D\uDC9A"}),/*#__PURE__*/(0,jsx_runtime.jsx)(DropdownItem,{triggerTemplate:/*#__PURE__*/(0,jsx_runtime.jsx)("view",{style:{color:'red'},children:"Red Option"}),children:"Red Option \uD83E\uDDE1"})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Image"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("image",{fit:ImageFitMode.CenterInside,source:bg}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{fit:ImageFitMode.CenterInside,source:base64Image}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{fit:ImageFitMode.CenterInside,source:webImage}),/*#__PURE__*/(0,jsx_runtime.jsx)("image",{fit:ImageFitMode.CenterInside,source:(check_default())["0x0"]})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Video"}),/*#__PURE__*/(0,jsx_runtime.jsx)("row",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("video",{fit:ImageFitMode.CenterInside,source:webVideo,ref:setVideoRef,onPointerClick:toggleVideo})})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{children:"Slider"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("column",{children:["Horizontal",/*#__PURE__*/(0,jsx_runtime.jsx)(Slider,{direction:"horizontal-reverse"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Slider,{children:function children(value){return/*#__PURE__*/(0,jsx_runtime.jsx)("view",{style:{position:'absolute',top:24,color:value>0.5?'red':'black'},children:value.toFixed(3)});}})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("column",{children:["Vertical",/*#__PURE__*/(0,jsx_runtime.jsxs)("row",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Slider,{direction:"vertical-reverse"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Slider,{direction:"vertical",children:function children(value){return/*#__PURE__*/(0,jsx_runtime.jsx)("view",{style:{position:'absolute',left:24},children:value.toFixed(3)});}})]})]})]})]})]})});};renderer_Renderer.render(/*#__PURE__*/(0,jsx_runtime.jsx)(App,{}));
;// CONCATENATED MODULE: ./src/index.tsx
/* module decorator */ module = __webpack_require__.hmd(module);
var _module,_module$hot;(_module=module)===null||_module===void 0?void 0:(_module$hot=_module.hot)===null||_module$hot===void 0?void 0:_module$hot.accept();

/***/ }),

/***/ 667:
/***/ ((module) => {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 916:
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

/***/ 422:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/** @license React v0.26.1
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

  var aa = __webpack_require__(916),
      ba = __webpack_require__(201),
      m = __webpack_require__(735);

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

/***/ 377:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(422);
} else {}

/***/ }),

/***/ 764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/** @license React v17.0.1
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


__webpack_require__(916);

var f = __webpack_require__(201),
    g = 60103;

__webpack_unused_export__ = 60107;

if ("function" === typeof Symbol && Symbol["for"]) {
  var h = Symbol["for"];
  g = h("react.element");
  __webpack_unused_export__ = h("react.fragment");
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

/***/ 51:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v17.0.1
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var l = __webpack_require__(916),
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

exports.version = "17.0.1";

/***/ }),

/***/ 201:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(51);
} else {}

/***/ }),

/***/ 461:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(764);
} else {}

/***/ }),

/***/ 557:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v0.20.1
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

/***/ 735:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(557);
} else {}

/***/ }),

/***/ 810:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".showcase_app__3MXep{padding:20px;max-width:960px;width:100%;align-self:center;align-items:stretch}.showcase_app__3MXep h1{font-size:36px;font-style:smallcaps, bold;color:#582a9c;margin-bottom:12px}.showcase_app__3MXep h2{font-size:30px;font-style:smallcaps;color:#fb2f8e;margin-bottom:8px}.showcase_app__3MXep section{margin-top:10px;margin-bottom:10px}.showcase_app__3MXep row{flex-direction:row;align-items:center}.showcase_app__3MXep column{flex-direction:column;align-items:center;flex-grow:1;flex-shrink:0}.showcase_app__3MXep slider{margin:10px}.showcase_app__3MXep image{flex-grow:1;flex-shrink:1;flex-basis:0}\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"app": "showcase_app__3MXep"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
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
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
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
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 719:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {"0x0": __webpack_require__.p + "static/svg/check-0x0.png"};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(452);
/******/ })()
;