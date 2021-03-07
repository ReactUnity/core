/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 310:
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
var react_reconciler = __webpack_require__(84);
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
      if (updatePayload.hasOwnProperty(attr)) {
        var value = updatePayload[attr];
        writeTo[attr] = value;
      }
    }

    return true;
  }
}

function applyUpdate(instance, updatePayload, isAfterMount, type) {
  var updateAfterMount = false;

  for (var index = 0; index < updatePayload.length; index += 2) {
    var attr = updatePayload[index];
    var value = updatePayload[index + 1];

    if (attr === 'children') {
      if (type === 'text') {
        Unity.setText(instance, value ? value.join('') : '');
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
    applyUpdate(instance, updatePayload, true, type);
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
var Renderer = {
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
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/properties/styles-enums.js
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
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/properties/yoga-enums.js
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
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/properties/index.js





;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/generated/unity.js
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

      var Unsafe;

      (function (Unsafe) {})(Unsafe = LowLevel.Unsafe || (LowLevel.Unsafe = {}));
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

var unity_UnityEngine;

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

  var AssetBundleLoadResult;

  (function (AssetBundleLoadResult) {
    AssetBundleLoadResult[AssetBundleLoadResult["Success"] = 0] = "Success";
    AssetBundleLoadResult[AssetBundleLoadResult["Cancelled"] = 1] = "Cancelled";
    AssetBundleLoadResult[AssetBundleLoadResult["NotMatchingCrc"] = 2] = "NotMatchingCrc";
    AssetBundleLoadResult[AssetBundleLoadResult["FailedCache"] = 3] = "FailedCache";
    AssetBundleLoadResult[AssetBundleLoadResult["NotValidAssetBundle"] = 4] = "NotValidAssetBundle";
    AssetBundleLoadResult[AssetBundleLoadResult["NoSerializedData"] = 5] = "NoSerializedData";
    AssetBundleLoadResult[AssetBundleLoadResult["NotCompatible"] = 6] = "NotCompatible";
    AssetBundleLoadResult[AssetBundleLoadResult["AlreadyLoaded"] = 7] = "AlreadyLoaded";
    AssetBundleLoadResult[AssetBundleLoadResult["FailedRead"] = 8] = "FailedRead";
    AssetBundleLoadResult[AssetBundleLoadResult["FailedDecompression"] = 9] = "FailedDecompression";
    AssetBundleLoadResult[AssetBundleLoadResult["FailedWrite"] = 10] = "FailedWrite";
    AssetBundleLoadResult[AssetBundleLoadResult["FailedDeleteRecompressionTarget"] = 11] = "FailedDeleteRecompressionTarget";
    AssetBundleLoadResult[AssetBundleLoadResult["RecompressionTargetIsLoaded"] = 12] = "RecompressionTargetIsLoaded";
    AssetBundleLoadResult[AssetBundleLoadResult["RecompressionTargetExistsButNotArchive"] = 13] = "RecompressionTargetExistsButNotArchive";
  })(AssetBundleLoadResult = UnityEngine.AssetBundleLoadResult || (UnityEngine.AssetBundleLoadResult = {}));

  var CompressionType;

  (function (CompressionType) {
    CompressionType[CompressionType["None"] = 0] = "None";
    CompressionType[CompressionType["Lzma"] = 1] = "Lzma";
    CompressionType[CompressionType["Lz4"] = 2] = "Lz4";
    CompressionType[CompressionType["Lz4HC"] = 3] = "Lz4HC";
  })(CompressionType = UnityEngine.CompressionType || (UnityEngine.CompressionType = {}));

  var CompressionLevel;

  (function (CompressionLevel) {
    CompressionLevel[CompressionLevel["None"] = 0] = "None";
    CompressionLevel[CompressionLevel["Fastest"] = 1] = "Fastest";
    CompressionLevel[CompressionLevel["Fast"] = 2] = "Fast";
    CompressionLevel[CompressionLevel["Normal"] = 3] = "Normal";
    CompressionLevel[CompressionLevel["High"] = 4] = "High";
    CompressionLevel[CompressionLevel["Maximum"] = 5] = "Maximum";
  })(CompressionLevel = UnityEngine.CompressionLevel || (UnityEngine.CompressionLevel = {}));

  var AI;

  (function (AI) {
    var NavMeshPathStatus;

    (function (NavMeshPathStatus) {
      NavMeshPathStatus[NavMeshPathStatus["PathComplete"] = 0] = "PathComplete";
      NavMeshPathStatus[NavMeshPathStatus["PathPartial"] = 1] = "PathPartial";
      NavMeshPathStatus[NavMeshPathStatus["PathInvalid"] = 2] = "PathInvalid";
    })(NavMeshPathStatus = AI.NavMeshPathStatus || (AI.NavMeshPathStatus = {}));

    var ObstacleAvoidanceType;

    (function (ObstacleAvoidanceType) {
      ObstacleAvoidanceType[ObstacleAvoidanceType["NoObstacleAvoidance"] = 0] = "NoObstacleAvoidance";
      ObstacleAvoidanceType[ObstacleAvoidanceType["LowQualityObstacleAvoidance"] = 1] = "LowQualityObstacleAvoidance";
      ObstacleAvoidanceType[ObstacleAvoidanceType["MedQualityObstacleAvoidance"] = 2] = "MedQualityObstacleAvoidance";
      ObstacleAvoidanceType[ObstacleAvoidanceType["GoodQualityObstacleAvoidance"] = 3] = "GoodQualityObstacleAvoidance";
      ObstacleAvoidanceType[ObstacleAvoidanceType["HighQualityObstacleAvoidance"] = 4] = "HighQualityObstacleAvoidance";
    })(ObstacleAvoidanceType = AI.ObstacleAvoidanceType || (AI.ObstacleAvoidanceType = {}));

    var NavMeshObstacleShape;

    (function (NavMeshObstacleShape) {
      NavMeshObstacleShape[NavMeshObstacleShape["Capsule"] = 0] = "Capsule";
      NavMeshObstacleShape[NavMeshObstacleShape["Box"] = 1] = "Box";
    })(NavMeshObstacleShape = AI.NavMeshObstacleShape || (AI.NavMeshObstacleShape = {}));

    var OffMeshLinkType;

    (function (OffMeshLinkType) {
      OffMeshLinkType[OffMeshLinkType["LinkTypeManual"] = 0] = "LinkTypeManual";
      OffMeshLinkType[OffMeshLinkType["LinkTypeDropDown"] = 1] = "LinkTypeDropDown";
      OffMeshLinkType[OffMeshLinkType["LinkTypeJumpAcross"] = 2] = "LinkTypeJumpAcross";
    })(OffMeshLinkType = AI.OffMeshLinkType || (AI.OffMeshLinkType = {}));

    var NavMeshBuildDebugFlags;

    (function (NavMeshBuildDebugFlags) {
      NavMeshBuildDebugFlags[NavMeshBuildDebugFlags["None"] = 0] = "None";
      NavMeshBuildDebugFlags[NavMeshBuildDebugFlags["InputGeometry"] = 1] = "InputGeometry";
      NavMeshBuildDebugFlags[NavMeshBuildDebugFlags["Voxels"] = 2] = "Voxels";
      NavMeshBuildDebugFlags[NavMeshBuildDebugFlags["Regions"] = 4] = "Regions";
      NavMeshBuildDebugFlags[NavMeshBuildDebugFlags["RawContours"] = 8] = "RawContours";
      NavMeshBuildDebugFlags[NavMeshBuildDebugFlags["SimplifiedContours"] = 16] = "SimplifiedContours";
      NavMeshBuildDebugFlags[NavMeshBuildDebugFlags["PolygonMeshes"] = 32] = "PolygonMeshes";
      NavMeshBuildDebugFlags[NavMeshBuildDebugFlags["PolygonMeshesDetail"] = 64] = "PolygonMeshesDetail";
      NavMeshBuildDebugFlags[NavMeshBuildDebugFlags["All"] = 127] = "All";
    })(NavMeshBuildDebugFlags = AI.NavMeshBuildDebugFlags || (AI.NavMeshBuildDebugFlags = {}));

    var NavMeshBuildSourceShape;

    (function (NavMeshBuildSourceShape) {
      NavMeshBuildSourceShape[NavMeshBuildSourceShape["Mesh"] = 0] = "Mesh";
      NavMeshBuildSourceShape[NavMeshBuildSourceShape["Terrain"] = 1] = "Terrain";
      NavMeshBuildSourceShape[NavMeshBuildSourceShape["Box"] = 2] = "Box";
      NavMeshBuildSourceShape[NavMeshBuildSourceShape["Sphere"] = 3] = "Sphere";
      NavMeshBuildSourceShape[NavMeshBuildSourceShape["Capsule"] = 4] = "Capsule";
      NavMeshBuildSourceShape[NavMeshBuildSourceShape["ModifierBox"] = 5] = "ModifierBox";
    })(NavMeshBuildSourceShape = AI.NavMeshBuildSourceShape || (AI.NavMeshBuildSourceShape = {}));

    var NavMeshCollectGeometry;

    (function (NavMeshCollectGeometry) {
      NavMeshCollectGeometry[NavMeshCollectGeometry["RenderMeshes"] = 0] = "RenderMeshes";
      NavMeshCollectGeometry[NavMeshCollectGeometry["PhysicsColliders"] = 1] = "PhysicsColliders";
    })(NavMeshCollectGeometry = AI.NavMeshCollectGeometry || (AI.NavMeshCollectGeometry = {}));
  })(AI = UnityEngine.AI || (UnityEngine.AI = {}));

  var Analytics;

  (function (Analytics_1) {
    var AnalyticsSessionState;

    (function (AnalyticsSessionState) {
      AnalyticsSessionState[AnalyticsSessionState["kSessionStopped"] = 0] = "kSessionStopped";
      AnalyticsSessionState[AnalyticsSessionState["kSessionStarted"] = 1] = "kSessionStarted";
      AnalyticsSessionState[AnalyticsSessionState["kSessionPaused"] = 2] = "kSessionPaused";
      AnalyticsSessionState[AnalyticsSessionState["kSessionResumed"] = 3] = "kSessionResumed";
    })(AnalyticsSessionState = Analytics_1.AnalyticsSessionState || (Analytics_1.AnalyticsSessionState = {}));

    var Gender;

    (function (Gender) {
      Gender[Gender["Male"] = 0] = "Male";
      Gender[Gender["Female"] = 1] = "Female";
      Gender[Gender["Unknown"] = 2] = "Unknown";
    })(Gender = Analytics_1.Gender || (Analytics_1.Gender = {}));

    var AnalyticsResult;

    (function (AnalyticsResult) {
      AnalyticsResult[AnalyticsResult["Ok"] = 0] = "Ok";
      AnalyticsResult[AnalyticsResult["NotInitialized"] = 1] = "NotInitialized";
      AnalyticsResult[AnalyticsResult["AnalyticsDisabled"] = 2] = "AnalyticsDisabled";
      AnalyticsResult[AnalyticsResult["TooManyItems"] = 3] = "TooManyItems";
      AnalyticsResult[AnalyticsResult["SizeLimitReached"] = 4] = "SizeLimitReached";
      AnalyticsResult[AnalyticsResult["TooManyRequests"] = 5] = "TooManyRequests";
      AnalyticsResult[AnalyticsResult["InvalidData"] = 6] = "InvalidData";
      AnalyticsResult[AnalyticsResult["UnsupportedPlatform"] = 7] = "UnsupportedPlatform";
    })(AnalyticsResult = Analytics_1.AnalyticsResult || (Analytics_1.AnalyticsResult = {}));

    var AnalyticsEventPriority;

    (function (AnalyticsEventPriority) {
      AnalyticsEventPriority[AnalyticsEventPriority["FlushQueueFlag"] = 1] = "FlushQueueFlag";
      AnalyticsEventPriority[AnalyticsEventPriority["CacheImmediatelyFlag"] = 2] = "CacheImmediatelyFlag";
      AnalyticsEventPriority[AnalyticsEventPriority["AllowInStopModeFlag"] = 4] = "AllowInStopModeFlag";
      AnalyticsEventPriority[AnalyticsEventPriority["SendImmediateFlag"] = 8] = "SendImmediateFlag";
      AnalyticsEventPriority[AnalyticsEventPriority["NoCachingFlag"] = 16] = "NoCachingFlag";
      AnalyticsEventPriority[AnalyticsEventPriority["NoRetryFlag"] = 32] = "NoRetryFlag";
      AnalyticsEventPriority[AnalyticsEventPriority["NormalPriorityEvent"] = 0] = "NormalPriorityEvent";
      AnalyticsEventPriority[AnalyticsEventPriority["NormalPriorityEvent_WithCaching"] = 2] = "NormalPriorityEvent_WithCaching";
      AnalyticsEventPriority[AnalyticsEventPriority["NormalPriorityEvent_NoRetryNoCaching"] = 48] = "NormalPriorityEvent_NoRetryNoCaching";
      AnalyticsEventPriority[AnalyticsEventPriority["HighPriorityEvent"] = 1] = "HighPriorityEvent";
      AnalyticsEventPriority[AnalyticsEventPriority["HighPriorityEvent_InStopMode"] = 5] = "HighPriorityEvent_InStopMode";
      AnalyticsEventPriority[AnalyticsEventPriority["HighestPriorityEvent"] = 9] = "HighestPriorityEvent";
      AnalyticsEventPriority[AnalyticsEventPriority["HighestPriorityEvent_NoRetryNoCaching"] = 49] = "HighestPriorityEvent_NoRetryNoCaching";
    })(AnalyticsEventPriority = Analytics_1.AnalyticsEventPriority || (Analytics_1.AnalyticsEventPriority = {}));
  })(Analytics = UnityEngine.Analytics || (UnityEngine.Analytics = {}));

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

    var ReplayKit;

    (function (ReplayKit_1) {})(ReplayKit = Apple.ReplayKit || (Apple.ReplayKit = {}));

    var TV;

    (function (TV) {})(TV = Apple.TV || (Apple.TV = {}));
  })(Apple = UnityEngine.Apple || (UnityEngine.Apple = {}));

  var Assertions;

  (function (Assertions) {
    var Comparers;

    (function (Comparers) {})(Comparers = Assertions.Comparers || (Assertions.Comparers = {}));

    var Must;

    (function (Must) {})(Must = Assertions.Must || (Assertions.Must = {}));
  })(Assertions = UnityEngine.Assertions || (UnityEngine.Assertions = {}));

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
    var AI;

    (function (AI) {
      var PathQueryStatus;

      (function (PathQueryStatus) {
        PathQueryStatus[PathQueryStatus["Failure"] = -2147483648] = "Failure";
        PathQueryStatus[PathQueryStatus["Success"] = 1073741824] = "Success";
        PathQueryStatus[PathQueryStatus["InProgress"] = 536870912] = "InProgress";
        PathQueryStatus[PathQueryStatus["StatusDetailMask"] = 16777215] = "StatusDetailMask";
        PathQueryStatus[PathQueryStatus["WrongMagic"] = 1] = "WrongMagic";
        PathQueryStatus[PathQueryStatus["WrongVersion"] = 2] = "WrongVersion";
        PathQueryStatus[PathQueryStatus["OutOfMemory"] = 4] = "OutOfMemory";
        PathQueryStatus[PathQueryStatus["InvalidParam"] = 8] = "InvalidParam";
        PathQueryStatus[PathQueryStatus["BufferTooSmall"] = 16] = "BufferTooSmall";
        PathQueryStatus[PathQueryStatus["OutOfNodes"] = 32] = "OutOfNodes";
        PathQueryStatus[PathQueryStatus["PartialResult"] = 64] = "PartialResult";
      })(PathQueryStatus = AI.PathQueryStatus || (AI.PathQueryStatus = {}));

      var NavMeshPolyTypes;

      (function (NavMeshPolyTypes) {
        NavMeshPolyTypes[NavMeshPolyTypes["Ground"] = 0] = "Ground";
        NavMeshPolyTypes[NavMeshPolyTypes["OffMeshConnection"] = 1] = "OffMeshConnection";
      })(NavMeshPolyTypes = AI.NavMeshPolyTypes || (AI.NavMeshPolyTypes = {}));
    })(AI = Experimental.AI || (Experimental.AI = {}));

    var Animations;

    (function (Animations) {
      var AnimationStreamSource;

      (function (AnimationStreamSource) {
        AnimationStreamSource[AnimationStreamSource["DefaultValues"] = 0] = "DefaultValues";
        AnimationStreamSource[AnimationStreamSource["PreviousInputs"] = 1] = "PreviousInputs";
      })(AnimationStreamSource = Animations.AnimationStreamSource || (Animations.AnimationStreamSource = {}));
    })(Animations = Experimental.Animations || (Experimental.Animations = {}));

    var AssetBundlePatching;

    (function (AssetBundlePatching) {})(AssetBundlePatching = Experimental.AssetBundlePatching || (Experimental.AssetBundlePatching = {}));

    var Audio;

    (function (Audio) {})(Audio = Experimental.Audio || (Experimental.Audio = {}));

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

    var Playables;

    (function (Playables) {})(Playables = Experimental.Playables || (Experimental.Playables = {}));

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

    var Video;

    (function (Video) {})(Video = Experimental.Video || (Experimental.Video = {}));
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

  var Jobs;

  (function (Jobs) {})(Jobs = UnityEngine.Jobs || (UnityEngine.Jobs = {}));

  var LowLevel;

  (function (LowLevel) {})(LowLevel = UnityEngine.LowLevel || (UnityEngine.LowLevel = {}));

  var Networking;

  (function (Networking) {
    var PlayerConnection;

    (function (PlayerConnection_1) {
      var ConnectionTarget;

      (function (ConnectionTarget) {
        ConnectionTarget[ConnectionTarget["None"] = 0] = "None";
        ConnectionTarget[ConnectionTarget["Player"] = 1] = "Player";
        ConnectionTarget[ConnectionTarget["Editor"] = 2] = "Editor";
      })(ConnectionTarget = PlayerConnection_1.ConnectionTarget || (PlayerConnection_1.ConnectionTarget = {}));
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

  var PlayerLoop;

  (function (PlayerLoop) {})(PlayerLoop = UnityEngine.PlayerLoop || (UnityEngine.PlayerLoop = {}));

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

    var Experimental;

    (function (Experimental) {})(Experimental = Profiling.Experimental || (Profiling.Experimental = {}));

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

  var Serialization;

  (function (Serialization) {})(Serialization = UnityEngine.Serialization || (UnityEngine.Serialization = {}));

  var Sprites;

  (function (Sprites) {})(Sprites = UnityEngine.Sprites || (UnityEngine.Sprites = {}));

  var TestTools;

  (function (TestTools) {})(TestTools = UnityEngine.TestTools || (UnityEngine.TestTools = {}));

  var tvOS;

  (function (tvOS) {
    var DeviceGeneration;

    (function (DeviceGeneration) {
      DeviceGeneration[DeviceGeneration["Unknown"] = 0] = "Unknown";
      DeviceGeneration[DeviceGeneration["AppleTV1Gen"] = 1001] = "AppleTV1Gen";
      DeviceGeneration[DeviceGeneration["AppleTV2Gen"] = 1002] = "AppleTV2Gen";
    })(DeviceGeneration = tvOS.DeviceGeneration || (tvOS.DeviceGeneration = {}));
  })(tvOS = UnityEngine.tvOS || (UnityEngine.tvOS = {}));

  var U2D;

  (function (U2D) {})(U2D = UnityEngine.U2D || (UnityEngine.U2D = {}));

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

  var UIElements;

  (function (UIElements) {
    var DropdownMenuAction_Status;

    (function (DropdownMenuAction_Status) {
      DropdownMenuAction_Status[DropdownMenuAction_Status["None"] = 0] = "None";
      DropdownMenuAction_Status[DropdownMenuAction_Status["Normal"] = 1] = "Normal";
      DropdownMenuAction_Status[DropdownMenuAction_Status["Disabled"] = 2] = "Disabled";
      DropdownMenuAction_Status[DropdownMenuAction_Status["Checked"] = 4] = "Checked";
      DropdownMenuAction_Status[DropdownMenuAction_Status["Hidden"] = 8] = "Hidden";
    })(DropdownMenuAction_Status = UIElements.DropdownMenuAction_Status || (UIElements.DropdownMenuAction_Status = {}));

    var SelectionType;

    (function (SelectionType) {
      SelectionType[SelectionType["None"] = 0] = "None";
      SelectionType[SelectionType["Single"] = 1] = "Single";
      SelectionType[SelectionType["Multiple"] = 2] = "Multiple";
    })(SelectionType = UIElements.SelectionType || (UIElements.SelectionType = {}));

    var MouseButton;

    (function (MouseButton) {
      MouseButton[MouseButton["LeftMouse"] = 0] = "LeftMouse";
      MouseButton[MouseButton["RightMouse"] = 1] = "RightMouse";
      MouseButton[MouseButton["MiddleMouse"] = 2] = "MiddleMouse";
    })(MouseButton = UIElements.MouseButton || (UIElements.MouseButton = {}));

    var ContextType;

    (function (ContextType) {
      ContextType[ContextType["Player"] = 0] = "Player";
      ContextType[ContextType["Editor"] = 1] = "Editor";
    })(ContextType = UIElements.ContextType || (UIElements.ContextType = {}));

    var UsageHints;

    (function (UsageHints) {
      UsageHints[UsageHints["None"] = 0] = "None";
      UsageHints[UsageHints["DynamicTransform"] = 1] = "DynamicTransform";
      UsageHints[UsageHints["GroupTransform"] = 2] = "GroupTransform";
    })(UsageHints = UIElements.UsageHints || (UIElements.UsageHints = {}));

    var Position;

    (function (Position) {
      Position[Position["Relative"] = 0] = "Relative";
      Position[Position["Absolute"] = 1] = "Absolute";
    })(Position = UIElements.Position || (UIElements.Position = {}));

    var Overflow;

    (function (Overflow) {
      Overflow[Overflow["Visible"] = 0] = "Visible";
      Overflow[Overflow["Hidden"] = 1] = "Hidden";
    })(Overflow = UIElements.Overflow || (UIElements.Overflow = {}));

    var OverflowClipBox;

    (function (OverflowClipBox) {
      OverflowClipBox[OverflowClipBox["PaddingBox"] = 0] = "PaddingBox";
      OverflowClipBox[OverflowClipBox["ContentBox"] = 1] = "ContentBox";
    })(OverflowClipBox = UIElements.OverflowClipBox || (UIElements.OverflowClipBox = {}));

    var FlexDirection;

    (function (FlexDirection) {
      FlexDirection[FlexDirection["Column"] = 0] = "Column";
      FlexDirection[FlexDirection["ColumnReverse"] = 1] = "ColumnReverse";
      FlexDirection[FlexDirection["Row"] = 2] = "Row";
      FlexDirection[FlexDirection["RowReverse"] = 3] = "RowReverse";
    })(FlexDirection = UIElements.FlexDirection || (UIElements.FlexDirection = {}));

    var Wrap;

    (function (Wrap) {
      Wrap[Wrap["NoWrap"] = 0] = "NoWrap";
      Wrap[Wrap["Wrap"] = 1] = "Wrap";
      Wrap[Wrap["WrapReverse"] = 2] = "WrapReverse";
    })(Wrap = UIElements.Wrap || (UIElements.Wrap = {}));

    var Align;

    (function (Align) {
      Align[Align["Auto"] = 0] = "Auto";
      Align[Align["FlexStart"] = 1] = "FlexStart";
      Align[Align["Center"] = 2] = "Center";
      Align[Align["FlexEnd"] = 3] = "FlexEnd";
      Align[Align["Stretch"] = 4] = "Stretch";
    })(Align = UIElements.Align || (UIElements.Align = {}));

    var Justify;

    (function (Justify) {
      Justify[Justify["FlexStart"] = 0] = "FlexStart";
      Justify[Justify["Center"] = 1] = "Center";
      Justify[Justify["FlexEnd"] = 2] = "FlexEnd";
      Justify[Justify["SpaceBetween"] = 3] = "SpaceBetween";
      Justify[Justify["SpaceAround"] = 4] = "SpaceAround";
    })(Justify = UIElements.Justify || (UIElements.Justify = {}));

    var TextOverflowPosition;

    (function (TextOverflowPosition) {
      TextOverflowPosition[TextOverflowPosition["End"] = 0] = "End";
      TextOverflowPosition[TextOverflowPosition["Start"] = 1] = "Start";
      TextOverflowPosition[TextOverflowPosition["Middle"] = 2] = "Middle";
    })(TextOverflowPosition = UIElements.TextOverflowPosition || (UIElements.TextOverflowPosition = {}));

    var TextOverflow;

    (function (TextOverflow) {
      TextOverflow[TextOverflow["Clip"] = 0] = "Clip";
      TextOverflow[TextOverflow["Ellipsis"] = 1] = "Ellipsis";
    })(TextOverflow = UIElements.TextOverflow || (UIElements.TextOverflow = {}));

    var Visibility;

    (function (Visibility) {
      Visibility[Visibility["Visible"] = 0] = "Visible";
      Visibility[Visibility["Hidden"] = 1] = "Hidden";
    })(Visibility = UIElements.Visibility || (UIElements.Visibility = {}));

    var WhiteSpace;

    (function (WhiteSpace) {
      WhiteSpace[WhiteSpace["Normal"] = 0] = "Normal";
      WhiteSpace[WhiteSpace["NoWrap"] = 1] = "NoWrap";
    })(WhiteSpace = UIElements.WhiteSpace || (UIElements.WhiteSpace = {}));

    var DisplayStyle;

    (function (DisplayStyle) {
      DisplayStyle[DisplayStyle["Flex"] = 0] = "Flex";
      DisplayStyle[DisplayStyle["None"] = 1] = "None";
    })(DisplayStyle = UIElements.DisplayStyle || (UIElements.DisplayStyle = {}));

    var PickingMode;

    (function (PickingMode) {
      PickingMode[PickingMode["Position"] = 0] = "Position";
      PickingMode[PickingMode["Ignore"] = 1] = "Ignore";
    })(PickingMode = UIElements.PickingMode || (UIElements.PickingMode = {}));

    var VisualElement_MeasureMode;

    (function (VisualElement_MeasureMode) {
      VisualElement_MeasureMode[VisualElement_MeasureMode["Undefined"] = 0] = "Undefined";
      VisualElement_MeasureMode[VisualElement_MeasureMode["Exactly"] = 1] = "Exactly";
      VisualElement_MeasureMode[VisualElement_MeasureMode["AtMost"] = 2] = "AtMost";
    })(VisualElement_MeasureMode = UIElements.VisualElement_MeasureMode || (UIElements.VisualElement_MeasureMode = {}));

    var VisualElementFocusRing_DefaultFocusOrder;

    (function (VisualElementFocusRing_DefaultFocusOrder) {
      VisualElementFocusRing_DefaultFocusOrder[VisualElementFocusRing_DefaultFocusOrder["ChildOrder"] = 0] = "ChildOrder";
      VisualElementFocusRing_DefaultFocusOrder[VisualElementFocusRing_DefaultFocusOrder["PositionXY"] = 1] = "PositionXY";
      VisualElementFocusRing_DefaultFocusOrder[VisualElementFocusRing_DefaultFocusOrder["PositionYX"] = 2] = "PositionYX";
    })(VisualElementFocusRing_DefaultFocusOrder = UIElements.VisualElementFocusRing_DefaultFocusOrder || (UIElements.VisualElementFocusRing_DefaultFocusOrder = {}));

    var SliderDirection;

    (function (SliderDirection) {
      SliderDirection[SliderDirection["Horizontal"] = 0] = "Horizontal";
      SliderDirection[SliderDirection["Vertical"] = 1] = "Vertical";
    })(SliderDirection = UIElements.SliderDirection || (UIElements.SliderDirection = {}));

    var HelpBoxMessageType;

    (function (HelpBoxMessageType) {
      HelpBoxMessageType[HelpBoxMessageType["None"] = 0] = "None";
      HelpBoxMessageType[HelpBoxMessageType["Info"] = 1] = "Info";
      HelpBoxMessageType[HelpBoxMessageType["Warning"] = 2] = "Warning";
      HelpBoxMessageType[HelpBoxMessageType["Error"] = 3] = "Error";
    })(HelpBoxMessageType = UIElements.HelpBoxMessageType || (UIElements.HelpBoxMessageType = {}));

    var AlternatingRowBackground;

    (function (AlternatingRowBackground) {
      AlternatingRowBackground[AlternatingRowBackground["None"] = 0] = "None";
      AlternatingRowBackground[AlternatingRowBackground["ContentOnly"] = 1] = "ContentOnly";
      AlternatingRowBackground[AlternatingRowBackground["All"] = 2] = "All";
    })(AlternatingRowBackground = UIElements.AlternatingRowBackground || (UIElements.AlternatingRowBackground = {}));

    var ScrollViewMode;

    (function (ScrollViewMode) {
      ScrollViewMode[ScrollViewMode["Vertical"] = 0] = "Vertical";
      ScrollViewMode[ScrollViewMode["Horizontal"] = 1] = "Horizontal";
      ScrollViewMode[ScrollViewMode["VerticalAndHorizontal"] = 2] = "VerticalAndHorizontal";
    })(ScrollViewMode = UIElements.ScrollViewMode || (UIElements.ScrollViewMode = {}));

    var ScrollView_TouchScrollBehavior;

    (function (ScrollView_TouchScrollBehavior) {
      ScrollView_TouchScrollBehavior[ScrollView_TouchScrollBehavior["Unrestricted"] = 0] = "Unrestricted";
      ScrollView_TouchScrollBehavior[ScrollView_TouchScrollBehavior["Elastic"] = 1] = "Elastic";
      ScrollView_TouchScrollBehavior[ScrollView_TouchScrollBehavior["Clamped"] = 2] = "Clamped";
    })(ScrollView_TouchScrollBehavior = UIElements.ScrollView_TouchScrollBehavior || (UIElements.ScrollView_TouchScrollBehavior = {}));

    var TwoPaneSplitViewOrientation;

    (function (TwoPaneSplitViewOrientation) {
      TwoPaneSplitViewOrientation[TwoPaneSplitViewOrientation["Horizontal"] = 0] = "Horizontal";
      TwoPaneSplitViewOrientation[TwoPaneSplitViewOrientation["Vertical"] = 1] = "Vertical";
    })(TwoPaneSplitViewOrientation = UIElements.TwoPaneSplitViewOrientation || (UIElements.TwoPaneSplitViewOrientation = {}));

    var TrickleDown;

    (function (TrickleDown) {
      TrickleDown[TrickleDown["NoTrickleDown"] = 0] = "NoTrickleDown";
      TrickleDown[TrickleDown["TrickleDown"] = 1] = "TrickleDown";
    })(TrickleDown = UIElements.TrickleDown || (UIElements.TrickleDown = {}));

    var PropagationPhase;

    (function (PropagationPhase) {
      PropagationPhase[PropagationPhase["None"] = 0] = "None";
      PropagationPhase[PropagationPhase["TrickleDown"] = 1] = "TrickleDown";
      PropagationPhase[PropagationPhase["AtTarget"] = 2] = "AtTarget";
      PropagationPhase[PropagationPhase["DefaultActionAtTarget"] = 5] = "DefaultActionAtTarget";
      PropagationPhase[PropagationPhase["BubbleUp"] = 3] = "BubbleUp";
      PropagationPhase[PropagationPhase["DefaultAction"] = 4] = "DefaultAction";
    })(PropagationPhase = UIElements.PropagationPhase || (UIElements.PropagationPhase = {}));

    var LengthUnit;

    (function (LengthUnit) {
      LengthUnit[LengthUnit["Pixel"] = 0] = "Pixel";
      LengthUnit[LengthUnit["Percent"] = 1] = "Percent";
    })(LengthUnit = UIElements.LengthUnit || (UIElements.LengthUnit = {}));

    var StyleKeyword;

    (function (StyleKeyword) {
      StyleKeyword[StyleKeyword["Undefined"] = 0] = "Undefined";
      StyleKeyword[StyleKeyword["Null"] = 1] = "Null";
      StyleKeyword[StyleKeyword["Auto"] = 2] = "Auto";
      StyleKeyword[StyleKeyword["None"] = 3] = "None";
      StyleKeyword[StyleKeyword["Initial"] = 4] = "Initial";
    })(StyleKeyword = UIElements.StyleKeyword || (UIElements.StyleKeyword = {}));

    var UxmlAttributeDescription_Use;

    (function (UxmlAttributeDescription_Use) {
      UxmlAttributeDescription_Use[UxmlAttributeDescription_Use["None"] = 0] = "None";
      UxmlAttributeDescription_Use[UxmlAttributeDescription_Use["Optional"] = 1] = "Optional";
      UxmlAttributeDescription_Use[UxmlAttributeDescription_Use["Prohibited"] = 2] = "Prohibited";
      UxmlAttributeDescription_Use[UxmlAttributeDescription_Use["Required"] = 3] = "Required";
    })(UxmlAttributeDescription_Use = UIElements.UxmlAttributeDescription_Use || (UIElements.UxmlAttributeDescription_Use = {}));

    var Experimental;

    (function (Experimental) {})(Experimental = UIElements.Experimental || (UIElements.Experimental = {}));
  })(UIElements = UnityEngine.UIElements || (UnityEngine.UIElements = {}));

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

    (function (WebCam_1) {
      var PhotoCaptureFileOutputFormat;

      (function (PhotoCaptureFileOutputFormat) {
        PhotoCaptureFileOutputFormat[PhotoCaptureFileOutputFormat["PNG"] = 0] = "PNG";
        PhotoCaptureFileOutputFormat[PhotoCaptureFileOutputFormat["JPG"] = 1] = "JPG";
      })(PhotoCaptureFileOutputFormat = WebCam_1.PhotoCaptureFileOutputFormat || (WebCam_1.PhotoCaptureFileOutputFormat = {}));

      var PhotoCapture_CaptureResultType;

      (function (PhotoCapture_CaptureResultType) {
        PhotoCapture_CaptureResultType[PhotoCapture_CaptureResultType["Success"] = 0] = "Success";
        PhotoCapture_CaptureResultType[PhotoCapture_CaptureResultType["UnknownError"] = 1] = "UnknownError";
      })(PhotoCapture_CaptureResultType = WebCam_1.PhotoCapture_CaptureResultType || (WebCam_1.PhotoCapture_CaptureResultType = {}));

      var VideoCapture_CaptureResultType;

      (function (VideoCapture_CaptureResultType) {
        VideoCapture_CaptureResultType[VideoCapture_CaptureResultType["Success"] = 0] = "Success";
        VideoCapture_CaptureResultType[VideoCapture_CaptureResultType["UnknownError"] = 1] = "UnknownError";
      })(VideoCapture_CaptureResultType = WebCam_1.VideoCapture_CaptureResultType || (WebCam_1.VideoCapture_CaptureResultType = {}));

      var VideoCapture_AudioState;

      (function (VideoCapture_AudioState) {
        VideoCapture_AudioState[VideoCapture_AudioState["MicAudio"] = 0] = "MicAudio";
        VideoCapture_AudioState[VideoCapture_AudioState["ApplicationAudio"] = 1] = "ApplicationAudio";
        VideoCapture_AudioState[VideoCapture_AudioState["ApplicationAndMicAudio"] = 2] = "ApplicationAndMicAudio";
        VideoCapture_AudioState[VideoCapture_AudioState["None"] = 3] = "None";
      })(VideoCapture_AudioState = WebCam_1.VideoCapture_AudioState || (WebCam_1.VideoCapture_AudioState = {}));

      var CapturePixelFormat;

      (function (CapturePixelFormat) {
        CapturePixelFormat[CapturePixelFormat["BGRA32"] = 0] = "BGRA32";
        CapturePixelFormat[CapturePixelFormat["NV12"] = 1] = "NV12";
        CapturePixelFormat[CapturePixelFormat["JPEG"] = 2] = "JPEG";
        CapturePixelFormat[CapturePixelFormat["PNG"] = 3] = "PNG";
      })(CapturePixelFormat = WebCam_1.CapturePixelFormat || (WebCam_1.CapturePixelFormat = {}));

      var WebCamMode;

      (function (WebCamMode) {
        WebCamMode[WebCamMode["None"] = 0] = "None";
        WebCamMode[WebCamMode["PhotoMode"] = 1] = "PhotoMode";
        WebCamMode[WebCamMode["VideoMode"] = 2] = "VideoMode";
      })(WebCamMode = WebCam_1.WebCamMode || (WebCam_1.WebCamMode = {}));
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
})(unity_UnityEngine || (unity_UnityEngine = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/generated/editor.js
var editor_UnityEditor;

(function (UnityEditor) {
  var AssetDeleteResult;

  (function (AssetDeleteResult) {
    AssetDeleteResult[AssetDeleteResult["DidNotDelete"] = 0] = "DidNotDelete";
    AssetDeleteResult[AssetDeleteResult["FailedDelete"] = 1] = "FailedDelete";
    AssetDeleteResult[AssetDeleteResult["DidDelete"] = 2] = "DidDelete";
  })(AssetDeleteResult = UnityEditor.AssetDeleteResult || (UnityEditor.AssetDeleteResult = {}));

  var AssetMoveResult;

  (function (AssetMoveResult) {
    AssetMoveResult[AssetMoveResult["DidNotMove"] = 0] = "DidNotMove";
    AssetMoveResult[AssetMoveResult["FailedMove"] = 1] = "FailedMove";
    AssetMoveResult[AssetMoveResult["DidMove"] = 2] = "DidMove";
  })(AssetMoveResult = UnityEditor.AssetMoveResult || (UnityEditor.AssetMoveResult = {}));

  var BuildOptions;

  (function (BuildOptions) {
    BuildOptions[BuildOptions["None"] = 0] = "None";
    BuildOptions[BuildOptions["Development"] = 1] = "Development";
    BuildOptions[BuildOptions["AutoRunPlayer"] = 4] = "AutoRunPlayer";
    BuildOptions[BuildOptions["ShowBuiltPlayer"] = 8] = "ShowBuiltPlayer";
    BuildOptions[BuildOptions["BuildAdditionalStreamedScenes"] = 16] = "BuildAdditionalStreamedScenes";
    BuildOptions[BuildOptions["AcceptExternalModificationsToPlayer"] = 32] = "AcceptExternalModificationsToPlayer";
    BuildOptions[BuildOptions["InstallInBuildFolder"] = 64] = "InstallInBuildFolder";
    BuildOptions[BuildOptions["WebPlayerOfflineDeployment"] = 128] = "WebPlayerOfflineDeployment";
    BuildOptions[BuildOptions["ConnectWithProfiler"] = 256] = "ConnectWithProfiler";
    BuildOptions[BuildOptions["AllowDebugging"] = 512] = "AllowDebugging";
    BuildOptions[BuildOptions["SymlinkLibraries"] = 1024] = "SymlinkLibraries";
    BuildOptions[BuildOptions["UncompressedAssetBundle"] = 2048] = "UncompressedAssetBundle";
    BuildOptions[BuildOptions["StripDebugSymbols"] = 0] = "StripDebugSymbols";
    BuildOptions[BuildOptions["CompressTextures"] = 0] = "CompressTextures";
    BuildOptions[BuildOptions["ConnectToHost"] = 4096] = "ConnectToHost";
    BuildOptions[BuildOptions["EnableHeadlessMode"] = 16384] = "EnableHeadlessMode";
    BuildOptions[BuildOptions["BuildScriptsOnly"] = 32768] = "BuildScriptsOnly";
    BuildOptions[BuildOptions["PatchPackage"] = 65536] = "PatchPackage";
    BuildOptions[BuildOptions["Il2CPP"] = 0] = "Il2CPP";
    BuildOptions[BuildOptions["ForceEnableAssertions"] = 131072] = "ForceEnableAssertions";
    BuildOptions[BuildOptions["CompressWithLz4"] = 262144] = "CompressWithLz4";
    BuildOptions[BuildOptions["CompressWithLz4HC"] = 524288] = "CompressWithLz4HC";
    BuildOptions[BuildOptions["ForceOptimizeScriptCompilation"] = 0] = "ForceOptimizeScriptCompilation";
    BuildOptions[BuildOptions["ComputeCRC"] = 1048576] = "ComputeCRC";
    BuildOptions[BuildOptions["StrictMode"] = 2097152] = "StrictMode";
    BuildOptions[BuildOptions["IncludeTestAssemblies"] = 4194304] = "IncludeTestAssemblies";
    BuildOptions[BuildOptions["NoUniqueIdentifier"] = 8388608] = "NoUniqueIdentifier";
    BuildOptions[BuildOptions["WaitForPlayerConnection"] = 33554432] = "WaitForPlayerConnection";
    BuildOptions[BuildOptions["EnableCodeCoverage"] = 67108864] = "EnableCodeCoverage";
    BuildOptions[BuildOptions["EnableDeepProfilingSupport"] = 268435456] = "EnableDeepProfilingSupport";
    BuildOptions[BuildOptions["DetailedBuildReport"] = 536870912] = "DetailedBuildReport";
    BuildOptions[BuildOptions["ShaderLivelinkSupport"] = 1073741824] = "ShaderLivelinkSupport";
  })(BuildOptions = UnityEditor.BuildOptions || (UnityEditor.BuildOptions = {}));

  var BuildAssetBundleOptions;

  (function (BuildAssetBundleOptions) {
    BuildAssetBundleOptions[BuildAssetBundleOptions["None"] = 0] = "None";
    BuildAssetBundleOptions[BuildAssetBundleOptions["UncompressedAssetBundle"] = 1] = "UncompressedAssetBundle";
    BuildAssetBundleOptions[BuildAssetBundleOptions["CollectDependencies"] = 2] = "CollectDependencies";
    BuildAssetBundleOptions[BuildAssetBundleOptions["CompleteAssets"] = 4] = "CompleteAssets";
    BuildAssetBundleOptions[BuildAssetBundleOptions["DisableWriteTypeTree"] = 8] = "DisableWriteTypeTree";
    BuildAssetBundleOptions[BuildAssetBundleOptions["DeterministicAssetBundle"] = 16] = "DeterministicAssetBundle";
    BuildAssetBundleOptions[BuildAssetBundleOptions["ForceRebuildAssetBundle"] = 32] = "ForceRebuildAssetBundle";
    BuildAssetBundleOptions[BuildAssetBundleOptions["IgnoreTypeTreeChanges"] = 64] = "IgnoreTypeTreeChanges";
    BuildAssetBundleOptions[BuildAssetBundleOptions["AppendHashToAssetBundleName"] = 128] = "AppendHashToAssetBundleName";
    BuildAssetBundleOptions[BuildAssetBundleOptions["ChunkBasedCompression"] = 256] = "ChunkBasedCompression";
    BuildAssetBundleOptions[BuildAssetBundleOptions["StrictMode"] = 512] = "StrictMode";
    BuildAssetBundleOptions[BuildAssetBundleOptions["DryRunBuild"] = 1024] = "DryRunBuild";
    BuildAssetBundleOptions[BuildAssetBundleOptions["DisableLoadAssetByFileName"] = 4096] = "DisableLoadAssetByFileName";
    BuildAssetBundleOptions[BuildAssetBundleOptions["DisableLoadAssetByFileNameWithExtension"] = 8192] = "DisableLoadAssetByFileNameWithExtension";
    BuildAssetBundleOptions[BuildAssetBundleOptions["AssetBundleStripUnityVersion"] = 32768] = "AssetBundleStripUnityVersion";
  })(BuildAssetBundleOptions = UnityEditor.BuildAssetBundleOptions || (UnityEditor.BuildAssetBundleOptions = {}));

  var PlayerConnectionInitiateMode;

  (function (PlayerConnectionInitiateMode) {
    PlayerConnectionInitiateMode[PlayerConnectionInitiateMode["None"] = 0] = "None";
    PlayerConnectionInitiateMode[PlayerConnectionInitiateMode["PlayerConnectsToHost"] = 1] = "PlayerConnectsToHost";
    PlayerConnectionInitiateMode[PlayerConnectionInitiateMode["PlayerListens"] = 2] = "PlayerListens";
  })(PlayerConnectionInitiateMode = UnityEditor.PlayerConnectionInitiateMode || (UnityEditor.PlayerConnectionInitiateMode = {}));

  var BuildTarget;

  (function (BuildTarget) {
    BuildTarget[BuildTarget["StandaloneOSX"] = 2] = "StandaloneOSX";
    BuildTarget[BuildTarget["StandaloneOSXUniversal"] = 3] = "StandaloneOSXUniversal";
    BuildTarget[BuildTarget["StandaloneOSXIntel"] = 4] = "StandaloneOSXIntel";
    BuildTarget[BuildTarget["StandaloneWindows"] = 5] = "StandaloneWindows";
    BuildTarget[BuildTarget["WebPlayer"] = 6] = "WebPlayer";
    BuildTarget[BuildTarget["WebPlayerStreamed"] = 7] = "WebPlayerStreamed";
    BuildTarget[BuildTarget["iOS"] = 9] = "iOS";
    BuildTarget[BuildTarget["PS3"] = 10] = "PS3";
    BuildTarget[BuildTarget["XBOX360"] = 11] = "XBOX360";
    BuildTarget[BuildTarget["Android"] = 13] = "Android";
    BuildTarget[BuildTarget["StandaloneLinux"] = 17] = "StandaloneLinux";
    BuildTarget[BuildTarget["StandaloneWindows64"] = 19] = "StandaloneWindows64";
    BuildTarget[BuildTarget["WebGL"] = 20] = "WebGL";
    BuildTarget[BuildTarget["WSAPlayer"] = 21] = "WSAPlayer";
    BuildTarget[BuildTarget["StandaloneLinux64"] = 24] = "StandaloneLinux64";
    BuildTarget[BuildTarget["StandaloneLinuxUniversal"] = 25] = "StandaloneLinuxUniversal";
    BuildTarget[BuildTarget["WP8Player"] = 26] = "WP8Player";
    BuildTarget[BuildTarget["StandaloneOSXIntel64"] = 27] = "StandaloneOSXIntel64";
    BuildTarget[BuildTarget["BlackBerry"] = 28] = "BlackBerry";
    BuildTarget[BuildTarget["Tizen"] = 29] = "Tizen";
    BuildTarget[BuildTarget["PSP2"] = 30] = "PSP2";
    BuildTarget[BuildTarget["PS4"] = 31] = "PS4";
    BuildTarget[BuildTarget["PSM"] = 32] = "PSM";
    BuildTarget[BuildTarget["XboxOne"] = 33] = "XboxOne";
    BuildTarget[BuildTarget["SamsungTV"] = 34] = "SamsungTV";
    BuildTarget[BuildTarget["N3DS"] = 35] = "N3DS";
    BuildTarget[BuildTarget["WiiU"] = 36] = "WiiU";
    BuildTarget[BuildTarget["tvOS"] = 37] = "tvOS";
    BuildTarget[BuildTarget["Switch"] = 38] = "Switch";
    BuildTarget[BuildTarget["Lumin"] = 39] = "Lumin";
    BuildTarget[BuildTarget["Stadia"] = 40] = "Stadia";
    BuildTarget[BuildTarget["CloudRendering"] = 41] = "CloudRendering";
    BuildTarget[BuildTarget["iPhone"] = -1] = "iPhone";
    BuildTarget[BuildTarget["BB10"] = -1] = "BB10";
    BuildTarget[BuildTarget["MetroPlayer"] = -1] = "MetroPlayer";
    BuildTarget[BuildTarget["NoTarget"] = -2] = "NoTarget";
  })(BuildTarget = UnityEditor.BuildTarget || (UnityEditor.BuildTarget = {}));

  var BuildTargetGroup;

  (function (BuildTargetGroup) {
    BuildTargetGroup[BuildTargetGroup["Unknown"] = 0] = "Unknown";
    BuildTargetGroup[BuildTargetGroup["Standalone"] = 1] = "Standalone";
    BuildTargetGroup[BuildTargetGroup["WebPlayer"] = 2] = "WebPlayer";
    BuildTargetGroup[BuildTargetGroup["iPhone"] = 4] = "iPhone";
    BuildTargetGroup[BuildTargetGroup["iOS"] = 4] = "iOS";
    BuildTargetGroup[BuildTargetGroup["PS3"] = 5] = "PS3";
    BuildTargetGroup[BuildTargetGroup["XBOX360"] = 6] = "XBOX360";
    BuildTargetGroup[BuildTargetGroup["Android"] = 7] = "Android";
    BuildTargetGroup[BuildTargetGroup["WebGL"] = 13] = "WebGL";
    BuildTargetGroup[BuildTargetGroup["WSA"] = 14] = "WSA";
    BuildTargetGroup[BuildTargetGroup["Metro"] = 14] = "Metro";
    BuildTargetGroup[BuildTargetGroup["WP8"] = 15] = "WP8";
    BuildTargetGroup[BuildTargetGroup["BlackBerry"] = 16] = "BlackBerry";
    BuildTargetGroup[BuildTargetGroup["Tizen"] = 17] = "Tizen";
    BuildTargetGroup[BuildTargetGroup["PSP2"] = 18] = "PSP2";
    BuildTargetGroup[BuildTargetGroup["PS4"] = 19] = "PS4";
    BuildTargetGroup[BuildTargetGroup["PSM"] = 20] = "PSM";
    BuildTargetGroup[BuildTargetGroup["XboxOne"] = 21] = "XboxOne";
    BuildTargetGroup[BuildTargetGroup["SamsungTV"] = 22] = "SamsungTV";
    BuildTargetGroup[BuildTargetGroup["N3DS"] = 23] = "N3DS";
    BuildTargetGroup[BuildTargetGroup["WiiU"] = 24] = "WiiU";
    BuildTargetGroup[BuildTargetGroup["tvOS"] = 25] = "tvOS";
    BuildTargetGroup[BuildTargetGroup["Facebook"] = 26] = "Facebook";
    BuildTargetGroup[BuildTargetGroup["Switch"] = 27] = "Switch";
    BuildTargetGroup[BuildTargetGroup["Lumin"] = 28] = "Lumin";
    BuildTargetGroup[BuildTargetGroup["Stadia"] = 29] = "Stadia";
    BuildTargetGroup[BuildTargetGroup["CloudRendering"] = 30] = "CloudRendering";
  })(BuildTargetGroup = UnityEditor.BuildTargetGroup || (UnityEditor.BuildTargetGroup = {}));

  var DragAndDropVisualMode;

  (function (DragAndDropVisualMode) {
    DragAndDropVisualMode[DragAndDropVisualMode["None"] = 0] = "None";
    DragAndDropVisualMode[DragAndDropVisualMode["Copy"] = 1] = "Copy";
    DragAndDropVisualMode[DragAndDropVisualMode["Link"] = 2] = "Link";
    DragAndDropVisualMode[DragAndDropVisualMode["Move"] = 16] = "Move";
    DragAndDropVisualMode[DragAndDropVisualMode["Generic"] = 4] = "Generic";
    DragAndDropVisualMode[DragAndDropVisualMode["Rejected"] = 32] = "Rejected";
  })(DragAndDropVisualMode = UnityEditor.DragAndDropVisualMode || (UnityEditor.DragAndDropVisualMode = {}));

  var GizmoType;

  (function (GizmoType) {
    GizmoType[GizmoType["Pickable"] = 1] = "Pickable";
    GizmoType[GizmoType["NotInSelectionHierarchy"] = 2] = "NotInSelectionHierarchy";
    GizmoType[GizmoType["NonSelected"] = 32] = "NonSelected";
    GizmoType[GizmoType["Selected"] = 4] = "Selected";
    GizmoType[GizmoType["Active"] = 8] = "Active";
    GizmoType[GizmoType["InSelectionHierarchy"] = 16] = "InSelectionHierarchy";
    GizmoType[GizmoType["NotSelected"] = -127] = "NotSelected";
    GizmoType[GizmoType["SelectedOrChild"] = -127] = "SelectedOrChild";
  })(GizmoType = UnityEditor.GizmoType || (UnityEditor.GizmoType = {}));

  var PlayModeStateChange;

  (function (PlayModeStateChange) {
    PlayModeStateChange[PlayModeStateChange["EnteredEditMode"] = 0] = "EnteredEditMode";
    PlayModeStateChange[PlayModeStateChange["ExitingEditMode"] = 1] = "ExitingEditMode";
    PlayModeStateChange[PlayModeStateChange["EnteredPlayMode"] = 2] = "EnteredPlayMode";
    PlayModeStateChange[PlayModeStateChange["ExitingPlayMode"] = 3] = "ExitingPlayMode";
  })(PlayModeStateChange = UnityEditor.PlayModeStateChange || (UnityEditor.PlayModeStateChange = {}));

  var PauseState;

  (function (PauseState) {
    PauseState[PauseState["Paused"] = 0] = "Paused";
    PauseState[PauseState["Unpaused"] = 1] = "Unpaused";
  })(PauseState = UnityEditor.PauseState || (UnityEditor.PauseState = {}));

  var MouseCursor;

  (function (MouseCursor) {
    MouseCursor[MouseCursor["Arrow"] = 0] = "Arrow";
    MouseCursor[MouseCursor["Text"] = 1] = "Text";
    MouseCursor[MouseCursor["ResizeVertical"] = 2] = "ResizeVertical";
    MouseCursor[MouseCursor["ResizeHorizontal"] = 3] = "ResizeHorizontal";
    MouseCursor[MouseCursor["Link"] = 4] = "Link";
    MouseCursor[MouseCursor["SlideArrow"] = 5] = "SlideArrow";
    MouseCursor[MouseCursor["ResizeUpRight"] = 6] = "ResizeUpRight";
    MouseCursor[MouseCursor["ResizeUpLeft"] = 7] = "ResizeUpLeft";
    MouseCursor[MouseCursor["MoveArrow"] = 8] = "MoveArrow";
    MouseCursor[MouseCursor["RotateArrow"] = 9] = "RotateArrow";
    MouseCursor[MouseCursor["ScaleArrow"] = 10] = "ScaleArrow";
    MouseCursor[MouseCursor["ArrowPlus"] = 11] = "ArrowPlus";
    MouseCursor[MouseCursor["ArrowMinus"] = 12] = "ArrowMinus";
    MouseCursor[MouseCursor["Pan"] = 13] = "Pan";
    MouseCursor[MouseCursor["Orbit"] = 14] = "Orbit";
    MouseCursor[MouseCursor["Zoom"] = 15] = "Zoom";
    MouseCursor[MouseCursor["FPS"] = 16] = "FPS";
    MouseCursor[MouseCursor["CustomCursor"] = 17] = "CustomCursor";
    MouseCursor[MouseCursor["SplitResizeUpDown"] = 18] = "SplitResizeUpDown";
    MouseCursor[MouseCursor["SplitResizeLeftRight"] = 19] = "SplitResizeLeftRight";
  })(MouseCursor = UnityEditor.MouseCursor || (UnityEditor.MouseCursor = {}));

  var MessageType;

  (function (MessageType) {
    MessageType[MessageType["None"] = 0] = "None";
    MessageType[MessageType["Info"] = 1] = "Info";
    MessageType[MessageType["Warning"] = 2] = "Warning";
    MessageType[MessageType["Error"] = 3] = "Error";
  })(MessageType = UnityEditor.MessageType || (UnityEditor.MessageType = {}));

  var EditorSkin;

  (function (EditorSkin) {
    EditorSkin[EditorSkin["Game"] = 0] = "Game";
    EditorSkin[EditorSkin["Inspector"] = 1] = "Inspector";
    EditorSkin[EditorSkin["Scene"] = 2] = "Scene";
  })(EditorSkin = UnityEditor.EditorSkin || (UnityEditor.EditorSkin = {}));

  var SerializationMode;

  (function (SerializationMode) {
    SerializationMode[SerializationMode["Mixed"] = 0] = "Mixed";
    SerializationMode[SerializationMode["ForceBinary"] = 1] = "ForceBinary";
    SerializationMode[SerializationMode["ForceText"] = 2] = "ForceText";
  })(SerializationMode = UnityEditor.SerializationMode || (UnityEditor.SerializationMode = {}));

  var EditorBehaviorMode;

  (function (EditorBehaviorMode) {
    EditorBehaviorMode[EditorBehaviorMode["Mode3D"] = 0] = "Mode3D";
    EditorBehaviorMode[EditorBehaviorMode["Mode2D"] = 1] = "Mode2D";
  })(EditorBehaviorMode = UnityEditor.EditorBehaviorMode || (UnityEditor.EditorBehaviorMode = {}));

  var SpritePackerMode;

  (function (SpritePackerMode) {
    SpritePackerMode[SpritePackerMode["Disabled"] = 0] = "Disabled";
    SpritePackerMode[SpritePackerMode["BuildTimeOnly"] = 1] = "BuildTimeOnly";
    SpritePackerMode[SpritePackerMode["AlwaysOn"] = 2] = "AlwaysOn";
    SpritePackerMode[SpritePackerMode["BuildTimeOnlyAtlas"] = 3] = "BuildTimeOnlyAtlas";
    SpritePackerMode[SpritePackerMode["AlwaysOnAtlas"] = 4] = "AlwaysOnAtlas";
    SpritePackerMode[SpritePackerMode["SpriteAtlasV2"] = 5] = "SpriteAtlasV2";
  })(SpritePackerMode = UnityEditor.SpritePackerMode || (UnityEditor.SpritePackerMode = {}));

  var LineEndingsMode;

  (function (LineEndingsMode) {
    LineEndingsMode[LineEndingsMode["OSNative"] = 0] = "OSNative";
    LineEndingsMode[LineEndingsMode["Unix"] = 1] = "Unix";
    LineEndingsMode[LineEndingsMode["Windows"] = 2] = "Windows";
  })(LineEndingsMode = UnityEditor.LineEndingsMode || (UnityEditor.LineEndingsMode = {}));

  var AssetPipelineMode;

  (function (AssetPipelineMode) {
    AssetPipelineMode[AssetPipelineMode["Version1"] = 0] = "Version1";
    AssetPipelineMode[AssetPipelineMode["Version2"] = 1] = "Version2";
  })(AssetPipelineMode = UnityEditor.AssetPipelineMode || (UnityEditor.AssetPipelineMode = {}));

  var CacheServerMode;

  (function (CacheServerMode) {
    CacheServerMode[CacheServerMode["AsPreferences"] = 0] = "AsPreferences";
    CacheServerMode[CacheServerMode["Enabled"] = 1] = "Enabled";
    CacheServerMode[CacheServerMode["Disabled"] = 2] = "Disabled";
  })(CacheServerMode = UnityEditor.CacheServerMode || (UnityEditor.CacheServerMode = {}));

  var EnterPlayModeOptions;

  (function (EnterPlayModeOptions) {
    EnterPlayModeOptions[EnterPlayModeOptions["None"] = 0] = "None";
    EnterPlayModeOptions[EnterPlayModeOptions["DisableDomainReload"] = 1] = "DisableDomainReload";
    EnterPlayModeOptions[EnterPlayModeOptions["DisableSceneReload"] = 2] = "DisableSceneReload";
  })(EnterPlayModeOptions = UnityEditor.EnterPlayModeOptions || (UnityEditor.EnterPlayModeOptions = {}));

  var EditorSettings_NamingScheme;

  (function (EditorSettings_NamingScheme) {
    EditorSettings_NamingScheme[EditorSettings_NamingScheme["SpaceParenthesis"] = 0] = "SpaceParenthesis";
    EditorSettings_NamingScheme[EditorSettings_NamingScheme["Dot"] = 1] = "Dot";
    EditorSettings_NamingScheme[EditorSettings_NamingScheme["Underscore"] = 2] = "Underscore";
  })(EditorSettings_NamingScheme = UnityEditor.EditorSettings_NamingScheme || (UnityEditor.EditorSettings_NamingScheme = {}));

  var PS4BuildSubtarget;

  (function (PS4BuildSubtarget) {
    PS4BuildSubtarget[PS4BuildSubtarget["PCHosted"] = 0] = "PCHosted";
    PS4BuildSubtarget[PS4BuildSubtarget["Package"] = 1] = "Package";
    PS4BuildSubtarget[PS4BuildSubtarget["Iso"] = 2] = "Iso";
  })(PS4BuildSubtarget = UnityEditor.PS4BuildSubtarget || (UnityEditor.PS4BuildSubtarget = {}));

  var PS4HardwareTarget;

  (function (PS4HardwareTarget) {
    PS4HardwareTarget[PS4HardwareTarget["BaseOnly"] = 0] = "BaseOnly";
    PS4HardwareTarget[PS4HardwareTarget["NeoAndBase"] = 1] = "NeoAndBase";
    PS4HardwareTarget[PS4HardwareTarget["ProAndBase"] = 1] = "ProAndBase";
  })(PS4HardwareTarget = UnityEditor.PS4HardwareTarget || (UnityEditor.PS4HardwareTarget = {}));

  var XboxBuildSubtarget;

  (function (XboxBuildSubtarget) {
    XboxBuildSubtarget[XboxBuildSubtarget["Development"] = 0] = "Development";
    XboxBuildSubtarget[XboxBuildSubtarget["Master"] = 1] = "Master";
    XboxBuildSubtarget[XboxBuildSubtarget["Debug"] = 2] = "Debug";
  })(XboxBuildSubtarget = UnityEditor.XboxBuildSubtarget || (UnityEditor.XboxBuildSubtarget = {}));

  var XboxOneDeployMethod;

  (function (XboxOneDeployMethod) {
    XboxOneDeployMethod[XboxOneDeployMethod["Push"] = 0] = "Push";
    XboxOneDeployMethod[XboxOneDeployMethod["RunFromPC"] = 2] = "RunFromPC";
    XboxOneDeployMethod[XboxOneDeployMethod["Package"] = 3] = "Package";
    XboxOneDeployMethod[XboxOneDeployMethod["PackageStreaming"] = 4] = "PackageStreaming";
  })(XboxOneDeployMethod = UnityEditor.XboxOneDeployMethod || (UnityEditor.XboxOneDeployMethod = {}));

  var XboxOneDeployDrive;

  (function (XboxOneDeployDrive) {
    XboxOneDeployDrive[XboxOneDeployDrive["Default"] = 0] = "Default";
    XboxOneDeployDrive[XboxOneDeployDrive["Retail"] = 1] = "Retail";
    XboxOneDeployDrive[XboxOneDeployDrive["Development"] = 2] = "Development";
    XboxOneDeployDrive[XboxOneDeployDrive["Ext1"] = 3] = "Ext1";
    XboxOneDeployDrive[XboxOneDeployDrive["Ext2"] = 4] = "Ext2";
    XboxOneDeployDrive[XboxOneDeployDrive["Ext3"] = 5] = "Ext3";
    XboxOneDeployDrive[XboxOneDeployDrive["Ext4"] = 6] = "Ext4";
    XboxOneDeployDrive[XboxOneDeployDrive["Ext5"] = 7] = "Ext5";
    XboxOneDeployDrive[XboxOneDeployDrive["Ext6"] = 8] = "Ext6";
    XboxOneDeployDrive[XboxOneDeployDrive["Ext7"] = 9] = "Ext7";
  })(XboxOneDeployDrive = UnityEditor.XboxOneDeployDrive || (UnityEditor.XboxOneDeployDrive = {}));

  var AndroidBuildSubtarget;

  (function (AndroidBuildSubtarget) {
    AndroidBuildSubtarget[AndroidBuildSubtarget["Generic"] = -1] = "Generic";
    AndroidBuildSubtarget[AndroidBuildSubtarget["DXT"] = -1] = "DXT";
    AndroidBuildSubtarget[AndroidBuildSubtarget["PVRTC"] = -1] = "PVRTC";
    AndroidBuildSubtarget[AndroidBuildSubtarget["ATC"] = -1] = "ATC";
    AndroidBuildSubtarget[AndroidBuildSubtarget["ETC"] = -1] = "ETC";
    AndroidBuildSubtarget[AndroidBuildSubtarget["ETC2"] = -1] = "ETC2";
    AndroidBuildSubtarget[AndroidBuildSubtarget["ASTC"] = -1] = "ASTC";
  })(AndroidBuildSubtarget = UnityEditor.AndroidBuildSubtarget || (UnityEditor.AndroidBuildSubtarget = {}));

  var MobileTextureSubtarget;

  (function (MobileTextureSubtarget) {
    MobileTextureSubtarget[MobileTextureSubtarget["Generic"] = 0] = "Generic";
    MobileTextureSubtarget[MobileTextureSubtarget["DXT"] = 1] = "DXT";
    MobileTextureSubtarget[MobileTextureSubtarget["PVRTC"] = 2] = "PVRTC";
    MobileTextureSubtarget[MobileTextureSubtarget["ATC"] = 3] = "ATC";
    MobileTextureSubtarget[MobileTextureSubtarget["ETC"] = 4] = "ETC";
    MobileTextureSubtarget[MobileTextureSubtarget["ETC2"] = 5] = "ETC2";
    MobileTextureSubtarget[MobileTextureSubtarget["ASTC"] = 6] = "ASTC";
  })(MobileTextureSubtarget = UnityEditor.MobileTextureSubtarget || (UnityEditor.MobileTextureSubtarget = {}));

  var AndroidETC2Fallback;

  (function (AndroidETC2Fallback) {
    AndroidETC2Fallback[AndroidETC2Fallback["Quality32Bit"] = 0] = "Quality32Bit";
    AndroidETC2Fallback[AndroidETC2Fallback["Quality16Bit"] = 1] = "Quality16Bit";
    AndroidETC2Fallback[AndroidETC2Fallback["Quality32BitDownscaled"] = 2] = "Quality32BitDownscaled";
  })(AndroidETC2Fallback = UnityEditor.AndroidETC2Fallback || (UnityEditor.AndroidETC2Fallback = {}));

  var WSASubtarget;

  (function (WSASubtarget) {
    WSASubtarget[WSASubtarget["AnyDevice"] = 0] = "AnyDevice";
    WSASubtarget[WSASubtarget["PC"] = 1] = "PC";
    WSASubtarget[WSASubtarget["Mobile"] = 2] = "Mobile";
    WSASubtarget[WSASubtarget["HoloLens"] = 3] = "HoloLens";
  })(WSASubtarget = UnityEditor.WSASubtarget || (UnityEditor.WSASubtarget = {}));

  var WSASDK;

  (function (WSASDK) {
    WSASDK[WSASDK["SDK80"] = 0] = "SDK80";
    WSASDK[WSASDK["SDK81"] = 1] = "SDK81";
    WSASDK[WSASDK["PhoneSDK81"] = 2] = "PhoneSDK81";
    WSASDK[WSASDK["UniversalSDK81"] = 3] = "UniversalSDK81";
    WSASDK[WSASDK["UWP"] = 4] = "UWP";
  })(WSASDK = UnityEditor.WSASDK || (UnityEditor.WSASDK = {}));

  var WSAUWPBuildType;

  (function (WSAUWPBuildType) {
    WSAUWPBuildType[WSAUWPBuildType["XAML"] = 0] = "XAML";
    WSAUWPBuildType[WSAUWPBuildType["D3D"] = 1] = "D3D";
    WSAUWPBuildType[WSAUWPBuildType["ExecutableOnly"] = 2] = "ExecutableOnly";
  })(WSAUWPBuildType = UnityEditor.WSAUWPBuildType || (UnityEditor.WSAUWPBuildType = {}));

  var WSABuildAndRunDeployTarget;

  (function (WSABuildAndRunDeployTarget) {
    WSABuildAndRunDeployTarget[WSABuildAndRunDeployTarget["LocalMachine"] = 0] = "LocalMachine";
    WSABuildAndRunDeployTarget[WSABuildAndRunDeployTarget["WindowsPhone"] = 1] = "WindowsPhone";
    WSABuildAndRunDeployTarget[WSABuildAndRunDeployTarget["DevicePortal"] = 2] = "DevicePortal";
  })(WSABuildAndRunDeployTarget = UnityEditor.WSABuildAndRunDeployTarget || (UnityEditor.WSABuildAndRunDeployTarget = {}));

  var WSABuildType;

  (function (WSABuildType) {
    WSABuildType[WSABuildType["Debug"] = 0] = "Debug";
    WSABuildType[WSABuildType["Release"] = 1] = "Release";
    WSABuildType[WSABuildType["Master"] = 2] = "Master";
  })(WSABuildType = UnityEditor.WSABuildType || (UnityEditor.WSABuildType = {}));

  var iOSBuildType;

  (function (iOSBuildType) {
    iOSBuildType[iOSBuildType["Debug"] = 0] = "Debug";
    iOSBuildType[iOSBuildType["Release"] = 1] = "Release";
  })(iOSBuildType = UnityEditor.iOSBuildType || (UnityEditor.iOSBuildType = {}));

  var AndroidBuildSystem;

  (function (AndroidBuildSystem) {
    AndroidBuildSystem[AndroidBuildSystem["Internal"] = 0] = "Internal";
    AndroidBuildSystem[AndroidBuildSystem["Gradle"] = 1] = "Gradle";
    AndroidBuildSystem[AndroidBuildSystem["ADT"] = 2] = "ADT";
    AndroidBuildSystem[AndroidBuildSystem["VisualStudio"] = 3] = "VisualStudio";
  })(AndroidBuildSystem = UnityEditor.AndroidBuildSystem || (UnityEditor.AndroidBuildSystem = {}));

  var AndroidBuildType;

  (function (AndroidBuildType) {
    AndroidBuildType[AndroidBuildType["Debug"] = 0] = "Debug";
    AndroidBuildType[AndroidBuildType["Development"] = 1] = "Development";
    AndroidBuildType[AndroidBuildType["Release"] = 2] = "Release";
  })(AndroidBuildType = UnityEditor.AndroidBuildType || (UnityEditor.AndroidBuildType = {}));

  var AndroidMinification;

  (function (AndroidMinification) {
    AndroidMinification[AndroidMinification["None"] = 0] = "None";
    AndroidMinification[AndroidMinification["Proguard"] = 1] = "Proguard";
    AndroidMinification[AndroidMinification["Gradle"] = 2] = "Gradle";
  })(AndroidMinification = UnityEditor.AndroidMinification || (UnityEditor.AndroidMinification = {}));

  var SemanticMergeMode;

  (function (SemanticMergeMode) {
    SemanticMergeMode[SemanticMergeMode["Off"] = 0] = "Off";
    SemanticMergeMode[SemanticMergeMode["Premerge"] = 1] = "Premerge";
    SemanticMergeMode[SemanticMergeMode["Ask"] = 2] = "Ask";
  })(SemanticMergeMode = UnityEditor.SemanticMergeMode || (UnityEditor.SemanticMergeMode = {}));

  var EditorSelectedRenderState;

  (function (EditorSelectedRenderState) {
    EditorSelectedRenderState[EditorSelectedRenderState["Hidden"] = 0] = "Hidden";
    EditorSelectedRenderState[EditorSelectedRenderState["Wireframe"] = 1] = "Wireframe";
    EditorSelectedRenderState[EditorSelectedRenderState["Highlight"] = 2] = "Highlight";
  })(EditorSelectedRenderState = UnityEditor.EditorSelectedRenderState || (UnityEditor.EditorSelectedRenderState = {}));

  var InteractionMode;

  (function (InteractionMode) {
    InteractionMode[InteractionMode["AutomatedAction"] = 0] = "AutomatedAction";
    InteractionMode[InteractionMode["UserAction"] = 1] = "UserAction";
  })(InteractionMode = UnityEditor.InteractionMode || (UnityEditor.InteractionMode = {}));

  var TextureCompressionQuality;

  (function (TextureCompressionQuality) {
    TextureCompressionQuality[TextureCompressionQuality["Fast"] = 0] = "Fast";
    TextureCompressionQuality[TextureCompressionQuality["Normal"] = 50] = "Normal";
    TextureCompressionQuality[TextureCompressionQuality["Best"] = 100] = "Best";
  })(TextureCompressionQuality = UnityEditor.TextureCompressionQuality || (UnityEditor.TextureCompressionQuality = {}));

  var DialogOptOutDecisionType;

  (function (DialogOptOutDecisionType) {
    DialogOptOutDecisionType[DialogOptOutDecisionType["ForThisMachine"] = 0] = "ForThisMachine";
    DialogOptOutDecisionType[DialogOptOutDecisionType["ForThisSession"] = 1] = "ForThisSession";
  })(DialogOptOutDecisionType = UnityEditor.DialogOptOutDecisionType || (UnityEditor.DialogOptOutDecisionType = {}));

  var ExportPackageOptions;

  (function (ExportPackageOptions) {
    ExportPackageOptions[ExportPackageOptions["Default"] = 0] = "Default";
    ExportPackageOptions[ExportPackageOptions["Interactive"] = 1] = "Interactive";
    ExportPackageOptions[ExportPackageOptions["Recurse"] = 2] = "Recurse";
    ExportPackageOptions[ExportPackageOptions["IncludeDependencies"] = 4] = "IncludeDependencies";
    ExportPackageOptions[ExportPackageOptions["IncludeLibraryAssets"] = 8] = "IncludeLibraryAssets";
  })(ExportPackageOptions = UnityEditor.ExportPackageOptions || (UnityEditor.ExportPackageOptions = {}));

  var InspectorMode;

  (function (InspectorMode) {
    InspectorMode[InspectorMode["Normal"] = 0] = "Normal";
    InspectorMode[InspectorMode["Debug"] = 1] = "Debug";
    InspectorMode[InspectorMode["DebugInternal"] = 2] = "DebugInternal";
  })(InspectorMode = UnityEditor.InspectorMode || (UnityEditor.InspectorMode = {}));

  var HierarchyType;

  (function (HierarchyType) {
    HierarchyType[HierarchyType["Assets"] = 1] = "Assets";
    HierarchyType[HierarchyType["GameObjects"] = 2] = "GameObjects";
  })(HierarchyType = UnityEditor.HierarchyType || (UnityEditor.HierarchyType = {}));

  var IconDrawStyle;

  (function (IconDrawStyle) {
    IconDrawStyle[IconDrawStyle["NonTexture"] = 0] = "NonTexture";
    IconDrawStyle[IconDrawStyle["Texture"] = 1] = "Texture";
  })(IconDrawStyle = UnityEditor.IconDrawStyle || (UnityEditor.IconDrawStyle = {}));

  var MaterialProperty_PropType;

  (function (MaterialProperty_PropType) {
    MaterialProperty_PropType[MaterialProperty_PropType["Color"] = 0] = "Color";
    MaterialProperty_PropType[MaterialProperty_PropType["Vector"] = 1] = "Vector";
    MaterialProperty_PropType[MaterialProperty_PropType["Float"] = 2] = "Float";
    MaterialProperty_PropType[MaterialProperty_PropType["Range"] = 3] = "Range";
    MaterialProperty_PropType[MaterialProperty_PropType["Texture"] = 4] = "Texture";
  })(MaterialProperty_PropType = UnityEditor.MaterialProperty_PropType || (UnityEditor.MaterialProperty_PropType = {}));

  var MaterialProperty_PropFlags;

  (function (MaterialProperty_PropFlags) {
    MaterialProperty_PropFlags[MaterialProperty_PropFlags["None"] = 0] = "None";
    MaterialProperty_PropFlags[MaterialProperty_PropFlags["HideInInspector"] = 1] = "HideInInspector";
    MaterialProperty_PropFlags[MaterialProperty_PropFlags["PerRendererData"] = 2] = "PerRendererData";
    MaterialProperty_PropFlags[MaterialProperty_PropFlags["NoScaleOffset"] = 4] = "NoScaleOffset";
    MaterialProperty_PropFlags[MaterialProperty_PropFlags["Normal"] = 8] = "Normal";
    MaterialProperty_PropFlags[MaterialProperty_PropFlags["HDR"] = 16] = "HDR";
    MaterialProperty_PropFlags[MaterialProperty_PropFlags["Gamma"] = 32] = "Gamma";
    MaterialProperty_PropFlags[MaterialProperty_PropFlags["NonModifiableTextureData"] = 64] = "NonModifiableTextureData";
  })(MaterialProperty_PropFlags = UnityEditor.MaterialProperty_PropFlags || (UnityEditor.MaterialProperty_PropFlags = {}));

  var MaterialProperty_TexDim;

  (function (MaterialProperty_TexDim) {
    MaterialProperty_TexDim[MaterialProperty_TexDim["Unknown"] = -1] = "Unknown";
    MaterialProperty_TexDim[MaterialProperty_TexDim["None"] = 0] = "None";
    MaterialProperty_TexDim[MaterialProperty_TexDim["Tex2D"] = 2] = "Tex2D";
    MaterialProperty_TexDim[MaterialProperty_TexDim["Tex3D"] = 3] = "Tex3D";
    MaterialProperty_TexDim[MaterialProperty_TexDim["Cube"] = 4] = "Cube";
    MaterialProperty_TexDim[MaterialProperty_TexDim["Any"] = 6] = "Any";
  })(MaterialProperty_TexDim = UnityEditor.MaterialProperty_TexDim || (UnityEditor.MaterialProperty_TexDim = {}));

  var ResolutionDialogSetting;

  (function (ResolutionDialogSetting) {
    ResolutionDialogSetting[ResolutionDialogSetting["Disabled"] = 0] = "Disabled";
    ResolutionDialogSetting[ResolutionDialogSetting["Enabled"] = 1] = "Enabled";
    ResolutionDialogSetting[ResolutionDialogSetting["HiddenByDefault"] = 2] = "HiddenByDefault";
  })(ResolutionDialogSetting = UnityEditor.ResolutionDialogSetting || (UnityEditor.ResolutionDialogSetting = {}));

  var ScriptingImplementation;

  (function (ScriptingImplementation) {
    ScriptingImplementation[ScriptingImplementation["Mono2x"] = 0] = "Mono2x";
    ScriptingImplementation[ScriptingImplementation["IL2CPP"] = 1] = "IL2CPP";
    ScriptingImplementation[ScriptingImplementation["WinRTDotNET"] = 2] = "WinRTDotNET";
  })(ScriptingImplementation = UnityEditor.ScriptingImplementation || (UnityEditor.ScriptingImplementation = {}));

  var Il2CppCompilerConfiguration;

  (function (Il2CppCompilerConfiguration) {
    Il2CppCompilerConfiguration[Il2CppCompilerConfiguration["Debug"] = 0] = "Debug";
    Il2CppCompilerConfiguration[Il2CppCompilerConfiguration["Release"] = 1] = "Release";
    Il2CppCompilerConfiguration[Il2CppCompilerConfiguration["Master"] = 2] = "Master";
  })(Il2CppCompilerConfiguration = UnityEditor.Il2CppCompilerConfiguration || (UnityEditor.Il2CppCompilerConfiguration = {}));

  var AspectRatio;

  (function (AspectRatio) {
    AspectRatio[AspectRatio["AspectOthers"] = 0] = "AspectOthers";
    AspectRatio[AspectRatio["Aspect4by3"] = 1] = "Aspect4by3";
    AspectRatio[AspectRatio["Aspect5by4"] = 2] = "Aspect5by4";
    AspectRatio[AspectRatio["Aspect16by10"] = 3] = "Aspect16by10";
    AspectRatio[AspectRatio["Aspect16by9"] = 4] = "Aspect16by9";
  })(AspectRatio = UnityEditor.AspectRatio || (UnityEditor.AspectRatio = {}));

  var MacFullscreenMode;

  (function (MacFullscreenMode) {
    MacFullscreenMode[MacFullscreenMode["CaptureDisplay"] = 0] = "CaptureDisplay";
    MacFullscreenMode[MacFullscreenMode["FullscreenWindow"] = 1] = "FullscreenWindow";
    MacFullscreenMode[MacFullscreenMode["FullscreenWindowWithDockAndMenuBar"] = 2] = "FullscreenWindowWithDockAndMenuBar";
  })(MacFullscreenMode = UnityEditor.MacFullscreenMode || (UnityEditor.MacFullscreenMode = {}));

  var D3D9FullscreenMode;

  (function (D3D9FullscreenMode) {
    D3D9FullscreenMode[D3D9FullscreenMode["ExclusiveMode"] = 0] = "ExclusiveMode";
    D3D9FullscreenMode[D3D9FullscreenMode["FullscreenWindow"] = 1] = "FullscreenWindow";
  })(D3D9FullscreenMode = UnityEditor.D3D9FullscreenMode || (UnityEditor.D3D9FullscreenMode = {}));

  var D3D11FullscreenMode;

  (function (D3D11FullscreenMode) {
    D3D11FullscreenMode[D3D11FullscreenMode["ExclusiveMode"] = 0] = "ExclusiveMode";
    D3D11FullscreenMode[D3D11FullscreenMode["FullscreenWindow"] = 1] = "FullscreenWindow";
  })(D3D11FullscreenMode = UnityEditor.D3D11FullscreenMode || (UnityEditor.D3D11FullscreenMode = {}));

  var StereoRenderingPath;

  (function (StereoRenderingPath) {
    StereoRenderingPath[StereoRenderingPath["MultiPass"] = 0] = "MultiPass";
    StereoRenderingPath[StereoRenderingPath["SinglePass"] = 1] = "SinglePass";
    StereoRenderingPath[StereoRenderingPath["Instancing"] = 2] = "Instancing";
  })(StereoRenderingPath = UnityEditor.StereoRenderingPath || (UnityEditor.StereoRenderingPath = {}));

  var StrippingLevel;

  (function (StrippingLevel) {
    StrippingLevel[StrippingLevel["Disabled"] = 0] = "Disabled";
    StrippingLevel[StrippingLevel["StripAssemblies"] = 1] = "StripAssemblies";
    StrippingLevel[StrippingLevel["StripByteCode"] = 2] = "StripByteCode";
    StrippingLevel[StrippingLevel["UseMicroMSCorlib"] = 3] = "UseMicroMSCorlib";
  })(StrippingLevel = UnityEditor.StrippingLevel || (UnityEditor.StrippingLevel = {}));

  var ScriptCallOptimizationLevel;

  (function (ScriptCallOptimizationLevel) {
    ScriptCallOptimizationLevel[ScriptCallOptimizationLevel["SlowAndSafe"] = 0] = "SlowAndSafe";
    ScriptCallOptimizationLevel[ScriptCallOptimizationLevel["FastButNoExceptions"] = 1] = "FastButNoExceptions";
  })(ScriptCallOptimizationLevel = UnityEditor.ScriptCallOptimizationLevel || (UnityEditor.ScriptCallOptimizationLevel = {}));

  var UIOrientation;

  (function (UIOrientation) {
    UIOrientation[UIOrientation["Portrait"] = 0] = "Portrait";
    UIOrientation[UIOrientation["PortraitUpsideDown"] = 1] = "PortraitUpsideDown";
    UIOrientation[UIOrientation["LandscapeRight"] = 2] = "LandscapeRight";
    UIOrientation[UIOrientation["LandscapeLeft"] = 3] = "LandscapeLeft";
    UIOrientation[UIOrientation["AutoRotation"] = 4] = "AutoRotation";
  })(UIOrientation = UnityEditor.UIOrientation || (UnityEditor.UIOrientation = {}));

  var ScriptingRuntimeVersion;

  (function (ScriptingRuntimeVersion) {
    ScriptingRuntimeVersion[ScriptingRuntimeVersion["Legacy"] = 0] = "Legacy";
    ScriptingRuntimeVersion[ScriptingRuntimeVersion["Latest"] = 1] = "Latest";
  })(ScriptingRuntimeVersion = UnityEditor.ScriptingRuntimeVersion || (UnityEditor.ScriptingRuntimeVersion = {}));

  var ApiCompatibilityLevel;

  (function (ApiCompatibilityLevel) {
    ApiCompatibilityLevel[ApiCompatibilityLevel["NET_2_0"] = 1] = "NET_2_0";
    ApiCompatibilityLevel[ApiCompatibilityLevel["NET_2_0_Subset"] = 2] = "NET_2_0_Subset";
    ApiCompatibilityLevel[ApiCompatibilityLevel["NET_4_6"] = 3] = "NET_4_6";
    ApiCompatibilityLevel[ApiCompatibilityLevel["NET_Web"] = 4] = "NET_Web";
    ApiCompatibilityLevel[ApiCompatibilityLevel["NET_Micro"] = 5] = "NET_Micro";
    ApiCompatibilityLevel[ApiCompatibilityLevel["NET_Standard_2_0"] = 6] = "NET_Standard_2_0";
  })(ApiCompatibilityLevel = UnityEditor.ApiCompatibilityLevel || (UnityEditor.ApiCompatibilityLevel = {}));

  var ManagedStrippingLevel;

  (function (ManagedStrippingLevel) {
    ManagedStrippingLevel[ManagedStrippingLevel["Disabled"] = 0] = "Disabled";
    ManagedStrippingLevel[ManagedStrippingLevel["Low"] = 1] = "Low";
    ManagedStrippingLevel[ManagedStrippingLevel["Medium"] = 2] = "Medium";
    ManagedStrippingLevel[ManagedStrippingLevel["High"] = 3] = "High";
  })(ManagedStrippingLevel = UnityEditor.ManagedStrippingLevel || (UnityEditor.ManagedStrippingLevel = {}));

  var ActionOnDotNetUnhandledException;

  (function (ActionOnDotNetUnhandledException) {
    ActionOnDotNetUnhandledException[ActionOnDotNetUnhandledException["SilentExit"] = 0] = "SilentExit";
    ActionOnDotNetUnhandledException[ActionOnDotNetUnhandledException["Crash"] = 1] = "Crash";
  })(ActionOnDotNetUnhandledException = UnityEditor.ActionOnDotNetUnhandledException || (UnityEditor.ActionOnDotNetUnhandledException = {}));

  var SplashScreenStyle;

  (function (SplashScreenStyle) {
    SplashScreenStyle[SplashScreenStyle["Light"] = 0] = "Light";
    SplashScreenStyle[SplashScreenStyle["Dark"] = 1] = "Dark";
  })(SplashScreenStyle = UnityEditor.SplashScreenStyle || (UnityEditor.SplashScreenStyle = {}));

  var GraphicsJobMode;

  (function (GraphicsJobMode) {
    GraphicsJobMode[GraphicsJobMode["Native"] = 0] = "Native";
    GraphicsJobMode[GraphicsJobMode["Legacy"] = 1] = "Legacy";
  })(GraphicsJobMode = UnityEditor.GraphicsJobMode || (UnityEditor.GraphicsJobMode = {}));

  var IconKind;

  (function (IconKind) {
    IconKind[IconKind["Any"] = -1] = "Any";
    IconKind[IconKind["Application"] = 0] = "Application";
    IconKind[IconKind["Settings"] = 1] = "Settings";
    IconKind[IconKind["Notification"] = 2] = "Notification";
    IconKind[IconKind["Spotlight"] = 3] = "Spotlight";
    IconKind[IconKind["Store"] = 4] = "Store";
  })(IconKind = UnityEditor.IconKind || (UnityEditor.IconKind = {}));

  var ShaderPrecisionModel;

  (function (ShaderPrecisionModel) {
    ShaderPrecisionModel[ShaderPrecisionModel["PlatformDefault"] = 0] = "PlatformDefault";
    ShaderPrecisionModel[ShaderPrecisionModel["Unified"] = 1] = "Unified";
  })(ShaderPrecisionModel = UnityEditor.ShaderPrecisionModel || (UnityEditor.ShaderPrecisionModel = {}));

  var NormalMapEncoding;

  (function (NormalMapEncoding) {
    NormalMapEncoding[NormalMapEncoding["XYZ"] = 0] = "XYZ";
    NormalMapEncoding[NormalMapEncoding["DXT5nm"] = 1] = "DXT5nm";
  })(NormalMapEncoding = UnityEditor.NormalMapEncoding || (UnityEditor.NormalMapEncoding = {}));

  var PlayerSettings_PS4_PS4AppCategory;

  (function (PlayerSettings_PS4_PS4AppCategory) {
    PlayerSettings_PS4_PS4AppCategory[PlayerSettings_PS4_PS4AppCategory["Application"] = 0] = "Application";
    PlayerSettings_PS4_PS4AppCategory[PlayerSettings_PS4_PS4AppCategory["Patch"] = 1] = "Patch";
    PlayerSettings_PS4_PS4AppCategory[PlayerSettings_PS4_PS4AppCategory["Remaster"] = 2] = "Remaster";
  })(PlayerSettings_PS4_PS4AppCategory = UnityEditor.PlayerSettings_PS4_PS4AppCategory || (UnityEditor.PlayerSettings_PS4_PS4AppCategory = {}));

  var PlayerSettings_PS4_PS4RemotePlayKeyAssignment;

  (function (PlayerSettings_PS4_PS4RemotePlayKeyAssignment) {
    PlayerSettings_PS4_PS4RemotePlayKeyAssignment[PlayerSettings_PS4_PS4RemotePlayKeyAssignment["None"] = -1] = "None";
    PlayerSettings_PS4_PS4RemotePlayKeyAssignment[PlayerSettings_PS4_PS4RemotePlayKeyAssignment["PatternA"] = 0] = "PatternA";
    PlayerSettings_PS4_PS4RemotePlayKeyAssignment[PlayerSettings_PS4_PS4RemotePlayKeyAssignment["PatternB"] = 1] = "PatternB";
    PlayerSettings_PS4_PS4RemotePlayKeyAssignment[PlayerSettings_PS4_PS4RemotePlayKeyAssignment["PatternC"] = 2] = "PatternC";
    PlayerSettings_PS4_PS4RemotePlayKeyAssignment[PlayerSettings_PS4_PS4RemotePlayKeyAssignment["PatternD"] = 3] = "PatternD";
    PlayerSettings_PS4_PS4RemotePlayKeyAssignment[PlayerSettings_PS4_PS4RemotePlayKeyAssignment["PatternE"] = 4] = "PatternE";
    PlayerSettings_PS4_PS4RemotePlayKeyAssignment[PlayerSettings_PS4_PS4RemotePlayKeyAssignment["PatternF"] = 5] = "PatternF";
    PlayerSettings_PS4_PS4RemotePlayKeyAssignment[PlayerSettings_PS4_PS4RemotePlayKeyAssignment["PatternG"] = 6] = "PatternG";
    PlayerSettings_PS4_PS4RemotePlayKeyAssignment[PlayerSettings_PS4_PS4RemotePlayKeyAssignment["PatternH"] = 7] = "PatternH";
  })(PlayerSettings_PS4_PS4RemotePlayKeyAssignment = UnityEditor.PlayerSettings_PS4_PS4RemotePlayKeyAssignment || (UnityEditor.PlayerSettings_PS4_PS4RemotePlayKeyAssignment = {}));

  var PlayerSettings_PS4_PS4EnterButtonAssignment;

  (function (PlayerSettings_PS4_PS4EnterButtonAssignment) {
    PlayerSettings_PS4_PS4EnterButtonAssignment[PlayerSettings_PS4_PS4EnterButtonAssignment["CircleButton"] = 0] = "CircleButton";
    PlayerSettings_PS4_PS4EnterButtonAssignment[PlayerSettings_PS4_PS4EnterButtonAssignment["CrossButton"] = 1] = "CrossButton";
    PlayerSettings_PS4_PS4EnterButtonAssignment[PlayerSettings_PS4_PS4EnterButtonAssignment["SystemDefined"] = 2] = "SystemDefined";
  })(PlayerSettings_PS4_PS4EnterButtonAssignment = UnityEditor.PlayerSettings_PS4_PS4EnterButtonAssignment || (UnityEditor.PlayerSettings_PS4_PS4EnterButtonAssignment = {}));

  var PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings;

  (function (PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings) {
    PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings[PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings["PerUser"] = 0] = "PerUser";
    PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings[PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings["ForceDefault"] = 1] = "ForceDefault";
    PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings[PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings["DynamicModeAtRuntime"] = 2] = "DynamicModeAtRuntime";
  })(PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings = UnityEditor.PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings || (UnityEditor.PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings = {}));

  var PlayerSettings_SplashScreen_AnimationMode;

  (function (PlayerSettings_SplashScreen_AnimationMode) {
    PlayerSettings_SplashScreen_AnimationMode[PlayerSettings_SplashScreen_AnimationMode["Static"] = 0] = "Static";
    PlayerSettings_SplashScreen_AnimationMode[PlayerSettings_SplashScreen_AnimationMode["Dolly"] = 1] = "Dolly";
    PlayerSettings_SplashScreen_AnimationMode[PlayerSettings_SplashScreen_AnimationMode["Custom"] = 2] = "Custom";
  })(PlayerSettings_SplashScreen_AnimationMode = UnityEditor.PlayerSettings_SplashScreen_AnimationMode || (UnityEditor.PlayerSettings_SplashScreen_AnimationMode = {}));

  var PlayerSettings_SplashScreen_DrawMode;

  (function (PlayerSettings_SplashScreen_DrawMode) {
    PlayerSettings_SplashScreen_DrawMode[PlayerSettings_SplashScreen_DrawMode["UnityLogoBelow"] = 0] = "UnityLogoBelow";
    PlayerSettings_SplashScreen_DrawMode[PlayerSettings_SplashScreen_DrawMode["AllSequential"] = 1] = "AllSequential";
  })(PlayerSettings_SplashScreen_DrawMode = UnityEditor.PlayerSettings_SplashScreen_DrawMode || (UnityEditor.PlayerSettings_SplashScreen_DrawMode = {}));

  var PlayerSettings_SplashScreen_UnityLogoStyle;

  (function (PlayerSettings_SplashScreen_UnityLogoStyle) {
    PlayerSettings_SplashScreen_UnityLogoStyle[PlayerSettings_SplashScreen_UnityLogoStyle["DarkOnLight"] = 0] = "DarkOnLight";
    PlayerSettings_SplashScreen_UnityLogoStyle[PlayerSettings_SplashScreen_UnityLogoStyle["LightOnDark"] = 1] = "LightOnDark";
  })(PlayerSettings_SplashScreen_UnityLogoStyle = UnityEditor.PlayerSettings_SplashScreen_UnityLogoStyle || (UnityEditor.PlayerSettings_SplashScreen_UnityLogoStyle = {}));

  var PlayerSettings_Switch_ScreenResolutionBehavior;

  (function (PlayerSettings_Switch_ScreenResolutionBehavior) {
    PlayerSettings_Switch_ScreenResolutionBehavior[PlayerSettings_Switch_ScreenResolutionBehavior["Manual"] = 0] = "Manual";
    PlayerSettings_Switch_ScreenResolutionBehavior[PlayerSettings_Switch_ScreenResolutionBehavior["OperationMode"] = 1] = "OperationMode";
    PlayerSettings_Switch_ScreenResolutionBehavior[PlayerSettings_Switch_ScreenResolutionBehavior["PerformanceMode"] = 2] = "PerformanceMode";
    PlayerSettings_Switch_ScreenResolutionBehavior[PlayerSettings_Switch_ScreenResolutionBehavior["Both"] = 3] = "Both";
  })(PlayerSettings_Switch_ScreenResolutionBehavior = UnityEditor.PlayerSettings_Switch_ScreenResolutionBehavior || (UnityEditor.PlayerSettings_Switch_ScreenResolutionBehavior = {}));

  var PlayerSettings_Switch_Languages;

  (function (PlayerSettings_Switch_Languages) {
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["AmericanEnglish"] = 0] = "AmericanEnglish";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["BritishEnglish"] = 1] = "BritishEnglish";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["Japanese"] = 2] = "Japanese";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["French"] = 3] = "French";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["German"] = 4] = "German";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["LatinAmericanSpanish"] = 5] = "LatinAmericanSpanish";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["Spanish"] = 6] = "Spanish";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["Italian"] = 7] = "Italian";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["Dutch"] = 8] = "Dutch";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["CanadianFrench"] = 9] = "CanadianFrench";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["Portuguese"] = 10] = "Portuguese";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["Russian"] = 11] = "Russian";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["SimplifiedChinese"] = 12] = "SimplifiedChinese";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["TraditionalChinese"] = 13] = "TraditionalChinese";
    PlayerSettings_Switch_Languages[PlayerSettings_Switch_Languages["Korean"] = 14] = "Korean";
  })(PlayerSettings_Switch_Languages = UnityEditor.PlayerSettings_Switch_Languages || (UnityEditor.PlayerSettings_Switch_Languages = {}));

  var PlayerSettings_Switch_StartupUserAccount;

  (function (PlayerSettings_Switch_StartupUserAccount) {
    PlayerSettings_Switch_StartupUserAccount[PlayerSettings_Switch_StartupUserAccount["None"] = 0] = "None";
    PlayerSettings_Switch_StartupUserAccount[PlayerSettings_Switch_StartupUserAccount["Required"] = 1] = "Required";
    PlayerSettings_Switch_StartupUserAccount[PlayerSettings_Switch_StartupUserAccount["RequiredWithNetworkServiceAccountAvailable"] = 2] = "RequiredWithNetworkServiceAccountAvailable";
  })(PlayerSettings_Switch_StartupUserAccount = UnityEditor.PlayerSettings_Switch_StartupUserAccount || (UnityEditor.PlayerSettings_Switch_StartupUserAccount = {}));

  var PlayerSettings_Switch_TouchScreenUsage;

  (function (PlayerSettings_Switch_TouchScreenUsage) {
    PlayerSettings_Switch_TouchScreenUsage[PlayerSettings_Switch_TouchScreenUsage["Supported"] = 0] = "Supported";
    PlayerSettings_Switch_TouchScreenUsage[PlayerSettings_Switch_TouchScreenUsage["Required"] = 1] = "Required";
    PlayerSettings_Switch_TouchScreenUsage[PlayerSettings_Switch_TouchScreenUsage["None"] = 2] = "None";
  })(PlayerSettings_Switch_TouchScreenUsage = UnityEditor.PlayerSettings_Switch_TouchScreenUsage || (UnityEditor.PlayerSettings_Switch_TouchScreenUsage = {}));

  var PlayerSettings_Switch_LogoHandling;

  (function (PlayerSettings_Switch_LogoHandling) {
    PlayerSettings_Switch_LogoHandling[PlayerSettings_Switch_LogoHandling["Auto"] = 0] = "Auto";
    PlayerSettings_Switch_LogoHandling[PlayerSettings_Switch_LogoHandling["Manual"] = 1] = "Manual";
  })(PlayerSettings_Switch_LogoHandling = UnityEditor.PlayerSettings_Switch_LogoHandling || (UnityEditor.PlayerSettings_Switch_LogoHandling = {}));

  var PlayerSettings_Switch_LogoType;

  (function (PlayerSettings_Switch_LogoType) {
    PlayerSettings_Switch_LogoType[PlayerSettings_Switch_LogoType["LicensedByNintendo"] = 0] = "LicensedByNintendo";
    PlayerSettings_Switch_LogoType[PlayerSettings_Switch_LogoType["DistributedByNintendo"] = 1] = "DistributedByNintendo";
    PlayerSettings_Switch_LogoType[PlayerSettings_Switch_LogoType["Nintendo"] = 2] = "Nintendo";
  })(PlayerSettings_Switch_LogoType = UnityEditor.PlayerSettings_Switch_LogoType || (UnityEditor.PlayerSettings_Switch_LogoType = {}));

  var PlayerSettings_Switch_ApplicationAttribute;

  (function (PlayerSettings_Switch_ApplicationAttribute) {
    PlayerSettings_Switch_ApplicationAttribute[PlayerSettings_Switch_ApplicationAttribute["None"] = 0] = "None";
    PlayerSettings_Switch_ApplicationAttribute[PlayerSettings_Switch_ApplicationAttribute["Demo"] = 1] = "Demo";
  })(PlayerSettings_Switch_ApplicationAttribute = UnityEditor.PlayerSettings_Switch_ApplicationAttribute || (UnityEditor.PlayerSettings_Switch_ApplicationAttribute = {}));

  var PlayerSettings_Switch_RatingCategories;

  (function (PlayerSettings_Switch_RatingCategories) {
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["CERO"] = 0] = "CERO";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["GRACGCRB"] = 1] = "GRACGCRB";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["GSRMR"] = 2] = "GSRMR";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["ESRB"] = 3] = "ESRB";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["ClassInd"] = 4] = "ClassInd";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["USK"] = 5] = "USK";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["PEGI"] = 6] = "PEGI";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["PEGIPortugal"] = 7] = "PEGIPortugal";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["PEGIBBFC"] = 8] = "PEGIBBFC";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["Russian"] = 9] = "Russian";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["ACB"] = 10] = "ACB";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["OFLC"] = 11] = "OFLC";
    PlayerSettings_Switch_RatingCategories[PlayerSettings_Switch_RatingCategories["IARCGeneric"] = 12] = "IARCGeneric";
  })(PlayerSettings_Switch_RatingCategories = UnityEditor.PlayerSettings_Switch_RatingCategories || (UnityEditor.PlayerSettings_Switch_RatingCategories = {}));

  var PlayerSettings_Switch_SupportedNpadStyle;

  (function (PlayerSettings_Switch_SupportedNpadStyle) {
    PlayerSettings_Switch_SupportedNpadStyle[PlayerSettings_Switch_SupportedNpadStyle["FullKey"] = 2] = "FullKey";
    PlayerSettings_Switch_SupportedNpadStyle[PlayerSettings_Switch_SupportedNpadStyle["Handheld"] = 4] = "Handheld";
    PlayerSettings_Switch_SupportedNpadStyle[PlayerSettings_Switch_SupportedNpadStyle["JoyDual"] = 16] = "JoyDual";
    PlayerSettings_Switch_SupportedNpadStyle[PlayerSettings_Switch_SupportedNpadStyle["JoyLeft"] = 256] = "JoyLeft";
    PlayerSettings_Switch_SupportedNpadStyle[PlayerSettings_Switch_SupportedNpadStyle["JoyRight"] = 65536] = "JoyRight";
  })(PlayerSettings_Switch_SupportedNpadStyle = UnityEditor.PlayerSettings_Switch_SupportedNpadStyle || (UnityEditor.PlayerSettings_Switch_SupportedNpadStyle = {}));

  var PlayerSettings_WSAApplicationShowName;

  (function (PlayerSettings_WSAApplicationShowName) {
    PlayerSettings_WSAApplicationShowName[PlayerSettings_WSAApplicationShowName["NotSet"] = 0] = "NotSet";
    PlayerSettings_WSAApplicationShowName[PlayerSettings_WSAApplicationShowName["AllLogos"] = 1] = "AllLogos";
    PlayerSettings_WSAApplicationShowName[PlayerSettings_WSAApplicationShowName["NoLogos"] = 2] = "NoLogos";
    PlayerSettings_WSAApplicationShowName[PlayerSettings_WSAApplicationShowName["StandardLogoOnly"] = 3] = "StandardLogoOnly";
    PlayerSettings_WSAApplicationShowName[PlayerSettings_WSAApplicationShowName["WideLogoOnly"] = 4] = "WideLogoOnly";
  })(PlayerSettings_WSAApplicationShowName = UnityEditor.PlayerSettings_WSAApplicationShowName || (UnityEditor.PlayerSettings_WSAApplicationShowName = {}));

  var PlayerSettings_WSADefaultTileSize;

  (function (PlayerSettings_WSADefaultTileSize) {
    PlayerSettings_WSADefaultTileSize[PlayerSettings_WSADefaultTileSize["NotSet"] = 0] = "NotSet";
    PlayerSettings_WSADefaultTileSize[PlayerSettings_WSADefaultTileSize["Medium"] = 1] = "Medium";
    PlayerSettings_WSADefaultTileSize[PlayerSettings_WSADefaultTileSize["Wide"] = 2] = "Wide";
  })(PlayerSettings_WSADefaultTileSize = UnityEditor.PlayerSettings_WSADefaultTileSize || (UnityEditor.PlayerSettings_WSADefaultTileSize = {}));

  var PlayerSettings_WSAApplicationForegroundText;

  (function (PlayerSettings_WSAApplicationForegroundText) {
    PlayerSettings_WSAApplicationForegroundText[PlayerSettings_WSAApplicationForegroundText["Light"] = 1] = "Light";
    PlayerSettings_WSAApplicationForegroundText[PlayerSettings_WSAApplicationForegroundText["Dark"] = 2] = "Dark";
  })(PlayerSettings_WSAApplicationForegroundText = UnityEditor.PlayerSettings_WSAApplicationForegroundText || (UnityEditor.PlayerSettings_WSAApplicationForegroundText = {}));

  var PlayerSettings_WSACapability;

  (function (PlayerSettings_WSACapability) {
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["EnterpriseAuthentication"] = 0] = "EnterpriseAuthentication";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["InternetClient"] = 1] = "InternetClient";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["InternetClientServer"] = 2] = "InternetClientServer";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["MusicLibrary"] = 3] = "MusicLibrary";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["PicturesLibrary"] = 4] = "PicturesLibrary";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["PrivateNetworkClientServer"] = 5] = "PrivateNetworkClientServer";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["RemovableStorage"] = 6] = "RemovableStorage";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["SharedUserCertificates"] = 7] = "SharedUserCertificates";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["VideosLibrary"] = 8] = "VideosLibrary";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["WebCam"] = 9] = "WebCam";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["Proximity"] = 10] = "Proximity";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["Microphone"] = 11] = "Microphone";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["Location"] = 12] = "Location";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["HumanInterfaceDevice"] = 13] = "HumanInterfaceDevice";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["AllJoyn"] = 14] = "AllJoyn";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["BlockedChatMessages"] = 15] = "BlockedChatMessages";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["Chat"] = 16] = "Chat";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["CodeGeneration"] = 17] = "CodeGeneration";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["Objects3D"] = 18] = "Objects3D";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["PhoneCall"] = 19] = "PhoneCall";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["UserAccountInformation"] = 20] = "UserAccountInformation";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["VoipCall"] = 21] = "VoipCall";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["Bluetooth"] = 22] = "Bluetooth";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["SpatialPerception"] = 23] = "SpatialPerception";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["InputInjectionBrokered"] = 24] = "InputInjectionBrokered";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["Appointments"] = 25] = "Appointments";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["BackgroundMediaPlayback"] = 26] = "BackgroundMediaPlayback";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["Contacts"] = 27] = "Contacts";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["LowLevelDevices"] = 28] = "LowLevelDevices";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["OfflineMapsManagement"] = 29] = "OfflineMapsManagement";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["PhoneCallHistoryPublic"] = 30] = "PhoneCallHistoryPublic";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["PointOfService"] = 31] = "PointOfService";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["RecordedCallsFolder"] = 32] = "RecordedCallsFolder";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["RemoteSystem"] = 33] = "RemoteSystem";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["SystemManagement"] = 34] = "SystemManagement";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["UserDataTasks"] = 35] = "UserDataTasks";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["UserNotificationListener"] = 36] = "UserNotificationListener";
    PlayerSettings_WSACapability[PlayerSettings_WSACapability["GazeInput"] = 37] = "GazeInput";
  })(PlayerSettings_WSACapability = UnityEditor.PlayerSettings_WSACapability || (UnityEditor.PlayerSettings_WSACapability = {}));

  var PlayerSettings_WSATargetFamily;

  (function (PlayerSettings_WSATargetFamily) {
    PlayerSettings_WSATargetFamily[PlayerSettings_WSATargetFamily["Desktop"] = 0] = "Desktop";
    PlayerSettings_WSATargetFamily[PlayerSettings_WSATargetFamily["Mobile"] = 1] = "Mobile";
    PlayerSettings_WSATargetFamily[PlayerSettings_WSATargetFamily["Xbox"] = 2] = "Xbox";
    PlayerSettings_WSATargetFamily[PlayerSettings_WSATargetFamily["Holographic"] = 3] = "Holographic";
    PlayerSettings_WSATargetFamily[PlayerSettings_WSATargetFamily["Team"] = 4] = "Team";
    PlayerSettings_WSATargetFamily[PlayerSettings_WSATargetFamily["IoT"] = 5] = "IoT";
    PlayerSettings_WSATargetFamily[PlayerSettings_WSATargetFamily["IoTHeadless"] = 6] = "IoTHeadless";
  })(PlayerSettings_WSATargetFamily = UnityEditor.PlayerSettings_WSATargetFamily || (UnityEditor.PlayerSettings_WSATargetFamily = {}));

  var PlayerSettings_WSAImageScale;

  (function (PlayerSettings_WSAImageScale) {
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["_100"] = 100] = "_100";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["_125"] = 125] = "_125";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["_150"] = 150] = "_150";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["_200"] = 200] = "_200";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["_400"] = 400] = "_400";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["Target16"] = 16] = "Target16";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["Target24"] = 24] = "Target24";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["Target32"] = 32] = "Target32";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["Target48"] = 48] = "Target48";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["Target256"] = 256] = "Target256";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["_80"] = 80] = "_80";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["_140"] = 140] = "_140";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["_180"] = 180] = "_180";
    PlayerSettings_WSAImageScale[PlayerSettings_WSAImageScale["_240"] = 240] = "_240";
  })(PlayerSettings_WSAImageScale = UnityEditor.PlayerSettings_WSAImageScale || (UnityEditor.PlayerSettings_WSAImageScale = {}));

  var PlayerSettings_WSAImageType;

  (function (PlayerSettings_WSAImageType) {
    PlayerSettings_WSAImageType[PlayerSettings_WSAImageType["PackageLogo"] = 1] = "PackageLogo";
    PlayerSettings_WSAImageType[PlayerSettings_WSAImageType["SplashScreenImage"] = 2] = "SplashScreenImage";
    PlayerSettings_WSAImageType[PlayerSettings_WSAImageType["UWPSquare44x44Logo"] = 31] = "UWPSquare44x44Logo";
    PlayerSettings_WSAImageType[PlayerSettings_WSAImageType["UWPSquare71x71Logo"] = 32] = "UWPSquare71x71Logo";
    PlayerSettings_WSAImageType[PlayerSettings_WSAImageType["UWPSquare150x150Logo"] = 33] = "UWPSquare150x150Logo";
    PlayerSettings_WSAImageType[PlayerSettings_WSAImageType["UWPSquare310x310Logo"] = 34] = "UWPSquare310x310Logo";
    PlayerSettings_WSAImageType[PlayerSettings_WSAImageType["UWPWide310x150Logo"] = 35] = "UWPWide310x150Logo";
  })(PlayerSettings_WSAImageType = UnityEditor.PlayerSettings_WSAImageType || (UnityEditor.PlayerSettings_WSAImageType = {}));

  var PlayerSettings_WSAInputSource;

  (function (PlayerSettings_WSAInputSource) {
    PlayerSettings_WSAInputSource[PlayerSettings_WSAInputSource["CoreWindow"] = 0] = "CoreWindow";
    PlayerSettings_WSAInputSource[PlayerSettings_WSAInputSource["IndependentInputSource"] = 1] = "IndependentInputSource";
    PlayerSettings_WSAInputSource[PlayerSettings_WSAInputSource["SwapChainPanel"] = 2] = "SwapChainPanel";
  })(PlayerSettings_WSAInputSource = UnityEditor.PlayerSettings_WSAInputSource || (UnityEditor.PlayerSettings_WSAInputSource = {}));

  var PlayerSettings_VRWindowsMixedReality_DepthBufferFormat;

  (function (PlayerSettings_VRWindowsMixedReality_DepthBufferFormat) {
    PlayerSettings_VRWindowsMixedReality_DepthBufferFormat[PlayerSettings_VRWindowsMixedReality_DepthBufferFormat["DepthBufferFormat16Bit"] = 0] = "DepthBufferFormat16Bit";
    PlayerSettings_VRWindowsMixedReality_DepthBufferFormat[PlayerSettings_VRWindowsMixedReality_DepthBufferFormat["DepthBufferFormat24Bit"] = 1] = "DepthBufferFormat24Bit";
  })(PlayerSettings_VRWindowsMixedReality_DepthBufferFormat = UnityEditor.PlayerSettings_VRWindowsMixedReality_DepthBufferFormat || (UnityEditor.PlayerSettings_VRWindowsMixedReality_DepthBufferFormat = {}));

  var AndroidTargetDevice;

  (function (AndroidTargetDevice) {
    AndroidTargetDevice[AndroidTargetDevice["FAT"] = 0] = "FAT";
    AndroidTargetDevice[AndroidTargetDevice["ARMv7"] = 3] = "ARMv7";
  })(AndroidTargetDevice = UnityEditor.AndroidTargetDevice || (UnityEditor.AndroidTargetDevice = {}));

  var TargetGlesGraphics;

  (function (TargetGlesGraphics) {
    TargetGlesGraphics[TargetGlesGraphics["OpenGLES_1_x"] = 0] = "OpenGLES_1_x";
    TargetGlesGraphics[TargetGlesGraphics["OpenGLES_2_0"] = 1] = "OpenGLES_2_0";
    TargetGlesGraphics[TargetGlesGraphics["OpenGLES_3_0"] = 2] = "OpenGLES_3_0";
    TargetGlesGraphics[TargetGlesGraphics["Automatic"] = -1] = "Automatic";
  })(TargetGlesGraphics = UnityEditor.TargetGlesGraphics || (UnityEditor.TargetGlesGraphics = {}));

  var TargetIOSGraphics;

  (function (TargetIOSGraphics) {
    TargetIOSGraphics[TargetIOSGraphics["OpenGLES_2_0"] = 2] = "OpenGLES_2_0";
    TargetIOSGraphics[TargetIOSGraphics["OpenGLES_3_0"] = 3] = "OpenGLES_3_0";
    TargetIOSGraphics[TargetIOSGraphics["Metal"] = 4] = "Metal";
    TargetIOSGraphics[TargetIOSGraphics["Automatic"] = -1] = "Automatic";
  })(TargetIOSGraphics = UnityEditor.TargetIOSGraphics || (UnityEditor.TargetIOSGraphics = {}));

  var iOSTargetResolution;

  (function (iOSTargetResolution) {
    iOSTargetResolution[iOSTargetResolution["Native"] = 0] = "Native";
    iOSTargetResolution[iOSTargetResolution["ResolutionAutoPerformance"] = 3] = "ResolutionAutoPerformance";
    iOSTargetResolution[iOSTargetResolution["ResolutionAutoQuality"] = 4] = "ResolutionAutoQuality";
    iOSTargetResolution[iOSTargetResolution["Resolution320p"] = 5] = "Resolution320p";
    iOSTargetResolution[iOSTargetResolution["Resolution640p"] = 6] = "Resolution640p";
    iOSTargetResolution[iOSTargetResolution["Resolution768p"] = 7] = "Resolution768p";
  })(iOSTargetResolution = UnityEditor.iOSTargetResolution || (UnityEditor.iOSTargetResolution = {}));

  var iOSTargetOSVersion;

  (function (iOSTargetOSVersion) {
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_4_0"] = 10] = "iOS_4_0";
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_4_1"] = 12] = "iOS_4_1";
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_4_2"] = 14] = "iOS_4_2";
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_4_3"] = 16] = "iOS_4_3";
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_5_0"] = 18] = "iOS_5_0";
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_5_1"] = 20] = "iOS_5_1";
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_6_0"] = 22] = "iOS_6_0";
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_7_0"] = 24] = "iOS_7_0";
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_7_1"] = 26] = "iOS_7_1";
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_8_0"] = 28] = "iOS_8_0";
    iOSTargetOSVersion[iOSTargetOSVersion["iOS_8_1"] = 30] = "iOS_8_1";
    iOSTargetOSVersion[iOSTargetOSVersion["Unknown"] = 999] = "Unknown";
  })(iOSTargetOSVersion = UnityEditor.iOSTargetOSVersion || (UnityEditor.iOSTargetOSVersion = {}));

  var iOSSystemGestureDeferMode;

  (function (iOSSystemGestureDeferMode) {
    iOSSystemGestureDeferMode[iOSSystemGestureDeferMode["None"] = 0] = "None";
    iOSSystemGestureDeferMode[iOSSystemGestureDeferMode["TopEdge"] = 1] = "TopEdge";
    iOSSystemGestureDeferMode[iOSSystemGestureDeferMode["LeftEdge"] = 2] = "LeftEdge";
    iOSSystemGestureDeferMode[iOSSystemGestureDeferMode["BottomEdge"] = 4] = "BottomEdge";
    iOSSystemGestureDeferMode[iOSSystemGestureDeferMode["RightEdge"] = 8] = "RightEdge";
    iOSSystemGestureDeferMode[iOSSystemGestureDeferMode["All"] = 15] = "All";
  })(iOSSystemGestureDeferMode = UnityEditor.iOSSystemGestureDeferMode || (UnityEditor.iOSSystemGestureDeferMode = {}));

  var AndroidArchitecture;

  (function (AndroidArchitecture) {
    AndroidArchitecture[AndroidArchitecture["None"] = 0] = "None";
    AndroidArchitecture[AndroidArchitecture["ARMv7"] = 1] = "ARMv7";
    AndroidArchitecture[AndroidArchitecture["ARM64"] = 2] = "ARM64";
    AndroidArchitecture[AndroidArchitecture["All"] = 4294967295] = "All";
  })(AndroidArchitecture = UnityEditor.AndroidArchitecture || (UnityEditor.AndroidArchitecture = {}));

  var AndroidSdkVersions;

  (function (AndroidSdkVersions) {
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevelAuto"] = 0] = "AndroidApiLevelAuto";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel16"] = 16] = "AndroidApiLevel16";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel17"] = 17] = "AndroidApiLevel17";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel18"] = 18] = "AndroidApiLevel18";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel19"] = 19] = "AndroidApiLevel19";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel21"] = 21] = "AndroidApiLevel21";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel22"] = 22] = "AndroidApiLevel22";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel23"] = 23] = "AndroidApiLevel23";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel24"] = 24] = "AndroidApiLevel24";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel25"] = 25] = "AndroidApiLevel25";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel26"] = 26] = "AndroidApiLevel26";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel27"] = 27] = "AndroidApiLevel27";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel28"] = 28] = "AndroidApiLevel28";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel29"] = 29] = "AndroidApiLevel29";
    AndroidSdkVersions[AndroidSdkVersions["AndroidApiLevel30"] = 30] = "AndroidApiLevel30";
  })(AndroidSdkVersions = UnityEditor.AndroidSdkVersions || (UnityEditor.AndroidSdkVersions = {}));

  var AndroidPreferredInstallLocation;

  (function (AndroidPreferredInstallLocation) {
    AndroidPreferredInstallLocation[AndroidPreferredInstallLocation["Auto"] = 0] = "Auto";
    AndroidPreferredInstallLocation[AndroidPreferredInstallLocation["PreferExternal"] = 1] = "PreferExternal";
    AndroidPreferredInstallLocation[AndroidPreferredInstallLocation["ForceInternal"] = 2] = "ForceInternal";
  })(AndroidPreferredInstallLocation = UnityEditor.AndroidPreferredInstallLocation || (UnityEditor.AndroidPreferredInstallLocation = {}));

  var AndroidShowActivityIndicatorOnLoading;

  (function (AndroidShowActivityIndicatorOnLoading) {
    AndroidShowActivityIndicatorOnLoading[AndroidShowActivityIndicatorOnLoading["Large"] = 0] = "Large";
    AndroidShowActivityIndicatorOnLoading[AndroidShowActivityIndicatorOnLoading["InversedLarge"] = 1] = "InversedLarge";
    AndroidShowActivityIndicatorOnLoading[AndroidShowActivityIndicatorOnLoading["Small"] = 2] = "Small";
    AndroidShowActivityIndicatorOnLoading[AndroidShowActivityIndicatorOnLoading["InversedSmall"] = 3] = "InversedSmall";
    AndroidShowActivityIndicatorOnLoading[AndroidShowActivityIndicatorOnLoading["DontShow"] = -1] = "DontShow";
  })(AndroidShowActivityIndicatorOnLoading = UnityEditor.AndroidShowActivityIndicatorOnLoading || (UnityEditor.AndroidShowActivityIndicatorOnLoading = {}));

  var AndroidGamepadSupportLevel;

  (function (AndroidGamepadSupportLevel) {
    AndroidGamepadSupportLevel[AndroidGamepadSupportLevel["SupportsDPad"] = 0] = "SupportsDPad";
    AndroidGamepadSupportLevel[AndroidGamepadSupportLevel["SupportsGamepad"] = 1] = "SupportsGamepad";
    AndroidGamepadSupportLevel[AndroidGamepadSupportLevel["RequiresGamepad"] = 2] = "RequiresGamepad";
  })(AndroidGamepadSupportLevel = UnityEditor.AndroidGamepadSupportLevel || (UnityEditor.AndroidGamepadSupportLevel = {}));

  var AndroidSplashScreenScale;

  (function (AndroidSplashScreenScale) {
    AndroidSplashScreenScale[AndroidSplashScreenScale["Center"] = 0] = "Center";
    AndroidSplashScreenScale[AndroidSplashScreenScale["ScaleToFit"] = 1] = "ScaleToFit";
    AndroidSplashScreenScale[AndroidSplashScreenScale["ScaleToFill"] = 2] = "ScaleToFill";
  })(AndroidSplashScreenScale = UnityEditor.AndroidSplashScreenScale || (UnityEditor.AndroidSplashScreenScale = {}));

  var AndroidBlitType;

  (function (AndroidBlitType) {
    AndroidBlitType[AndroidBlitType["Always"] = 0] = "Always";
    AndroidBlitType[AndroidBlitType["Never"] = 1] = "Never";
    AndroidBlitType[AndroidBlitType["Auto"] = 2] = "Auto";
  })(AndroidBlitType = UnityEditor.AndroidBlitType || (UnityEditor.AndroidBlitType = {}));

  var AppleMobileArchitecture;

  (function (AppleMobileArchitecture) {
    AppleMobileArchitecture[AppleMobileArchitecture["ARMv7"] = 0] = "ARMv7";
    AppleMobileArchitecture[AppleMobileArchitecture["ARM64"] = 1] = "ARM64";
    AppleMobileArchitecture[AppleMobileArchitecture["Universal"] = 2] = "Universal";
  })(AppleMobileArchitecture = UnityEditor.AppleMobileArchitecture || (UnityEditor.AppleMobileArchitecture = {}));

  var iOSSdkVersion;

  (function (iOSSdkVersion) {
    iOSSdkVersion[iOSSdkVersion["DeviceSDK"] = 988] = "DeviceSDK";
    iOSSdkVersion[iOSSdkVersion["SimulatorSDK"] = 989] = "SimulatorSDK";
  })(iOSSdkVersion = UnityEditor.iOSSdkVersion || (UnityEditor.iOSSdkVersion = {}));

  var iOSTargetDevice;

  (function (iOSTargetDevice) {
    iOSTargetDevice[iOSTargetDevice["iPhoneOnly"] = 0] = "iPhoneOnly";
    iOSTargetDevice[iOSTargetDevice["iPadOnly"] = 1] = "iPadOnly";
    iOSTargetDevice[iOSTargetDevice["iPhoneAndiPad"] = 2] = "iPhoneAndiPad";
  })(iOSTargetDevice = UnityEditor.iOSTargetDevice || (UnityEditor.iOSTargetDevice = {}));

  var iOSShowActivityIndicatorOnLoading;

  (function (iOSShowActivityIndicatorOnLoading) {
    iOSShowActivityIndicatorOnLoading[iOSShowActivityIndicatorOnLoading["WhiteLarge"] = 0] = "WhiteLarge";
    iOSShowActivityIndicatorOnLoading[iOSShowActivityIndicatorOnLoading["White"] = 1] = "White";
    iOSShowActivityIndicatorOnLoading[iOSShowActivityIndicatorOnLoading["Gray"] = 2] = "Gray";
    iOSShowActivityIndicatorOnLoading[iOSShowActivityIndicatorOnLoading["DontShow"] = -1] = "DontShow";
  })(iOSShowActivityIndicatorOnLoading = UnityEditor.iOSShowActivityIndicatorOnLoading || (UnityEditor.iOSShowActivityIndicatorOnLoading = {}));

  var iOSStatusBarStyle;

  (function (iOSStatusBarStyle) {
    iOSStatusBarStyle[iOSStatusBarStyle["Default"] = 0] = "Default";
    iOSStatusBarStyle[iOSStatusBarStyle["LightContent"] = 1] = "LightContent";
    iOSStatusBarStyle[iOSStatusBarStyle["BlackTranslucent"] = -1] = "BlackTranslucent";
    iOSStatusBarStyle[iOSStatusBarStyle["BlackOpaque"] = -1] = "BlackOpaque";
  })(iOSStatusBarStyle = UnityEditor.iOSStatusBarStyle || (UnityEditor.iOSStatusBarStyle = {}));

  var iOSAppInBackgroundBehavior;

  (function (iOSAppInBackgroundBehavior) {
    iOSAppInBackgroundBehavior[iOSAppInBackgroundBehavior["Custom"] = -1] = "Custom";
    iOSAppInBackgroundBehavior[iOSAppInBackgroundBehavior["Suspend"] = 0] = "Suspend";
    iOSAppInBackgroundBehavior[iOSAppInBackgroundBehavior["Exit"] = 1] = "Exit";
  })(iOSAppInBackgroundBehavior = UnityEditor.iOSAppInBackgroundBehavior || (UnityEditor.iOSAppInBackgroundBehavior = {}));

  var iOSBackgroundMode;

  (function (iOSBackgroundMode) {
    iOSBackgroundMode[iOSBackgroundMode["None"] = 0] = "None";
    iOSBackgroundMode[iOSBackgroundMode["Audio"] = 1] = "Audio";
    iOSBackgroundMode[iOSBackgroundMode["Location"] = 2] = "Location";
    iOSBackgroundMode[iOSBackgroundMode["VOIP"] = 4] = "VOIP";
    iOSBackgroundMode[iOSBackgroundMode["NewsstandContent"] = 8] = "NewsstandContent";
    iOSBackgroundMode[iOSBackgroundMode["ExternalAccessory"] = 16] = "ExternalAccessory";
    iOSBackgroundMode[iOSBackgroundMode["BluetoothCentral"] = 32] = "BluetoothCentral";
    iOSBackgroundMode[iOSBackgroundMode["BluetoothPeripheral"] = 64] = "BluetoothPeripheral";
    iOSBackgroundMode[iOSBackgroundMode["Fetch"] = 128] = "Fetch";
    iOSBackgroundMode[iOSBackgroundMode["RemoteNotification"] = 256] = "RemoteNotification";
  })(iOSBackgroundMode = UnityEditor.iOSBackgroundMode || (UnityEditor.iOSBackgroundMode = {}));

  var iOSLaunchScreenImageType;

  (function (iOSLaunchScreenImageType) {
    iOSLaunchScreenImageType[iOSLaunchScreenImageType["iPhonePortraitImage"] = 0] = "iPhonePortraitImage";
    iOSLaunchScreenImageType[iOSLaunchScreenImageType["iPhoneLandscapeImage"] = 1] = "iPhoneLandscapeImage";
    iOSLaunchScreenImageType[iOSLaunchScreenImageType["iPadImage"] = 2] = "iPadImage";
  })(iOSLaunchScreenImageType = UnityEditor.iOSLaunchScreenImageType || (UnityEditor.iOSLaunchScreenImageType = {}));

  var iOSLaunchScreenType;

  (function (iOSLaunchScreenType) {
    iOSLaunchScreenType[iOSLaunchScreenType["Default"] = 0] = "Default";
    iOSLaunchScreenType[iOSLaunchScreenType["ImageAndBackgroundRelative"] = 1] = "ImageAndBackgroundRelative";
    iOSLaunchScreenType[iOSLaunchScreenType["ImageAndBackgroundConstant"] = 4] = "ImageAndBackgroundConstant";
    iOSLaunchScreenType[iOSLaunchScreenType["CustomXib"] = 2] = "CustomXib";
    iOSLaunchScreenType[iOSLaunchScreenType["CustomStoryboard"] = 5] = "CustomStoryboard";
    iOSLaunchScreenType[iOSLaunchScreenType["None"] = 3] = "None";
  })(iOSLaunchScreenType = UnityEditor.iOSLaunchScreenType || (UnityEditor.iOSLaunchScreenType = {}));

  var ProvisioningProfileType;

  (function (ProvisioningProfileType) {
    ProvisioningProfileType[ProvisioningProfileType["Automatic"] = 0] = "Automatic";
    ProvisioningProfileType[ProvisioningProfileType["Development"] = 1] = "Development";
    ProvisioningProfileType[ProvisioningProfileType["Distribution"] = 2] = "Distribution";
  })(ProvisioningProfileType = UnityEditor.ProvisioningProfileType || (UnityEditor.ProvisioningProfileType = {}));

  var tvOSSdkVersion;

  (function (tvOSSdkVersion) {
    tvOSSdkVersion[tvOSSdkVersion["Device"] = 0] = "Device";
    tvOSSdkVersion[tvOSSdkVersion["Simulator"] = 1] = "Simulator";
  })(tvOSSdkVersion = UnityEditor.tvOSSdkVersion || (UnityEditor.tvOSSdkVersion = {}));

  var tvOSTargetOSVersion;

  (function (tvOSTargetOSVersion) {
    tvOSTargetOSVersion[tvOSTargetOSVersion["Unknown"] = 0] = "Unknown";
    tvOSTargetOSVersion[tvOSTargetOSVersion["tvOS_9_0"] = 900] = "tvOS_9_0";
    tvOSTargetOSVersion[tvOSTargetOSVersion["tvOS_9_1"] = 901] = "tvOS_9_1";
  })(tvOSTargetOSVersion = UnityEditor.tvOSTargetOSVersion || (UnityEditor.tvOSTargetOSVersion = {}));

  var WebGLExceptionSupport;

  (function (WebGLExceptionSupport) {
    WebGLExceptionSupport[WebGLExceptionSupport["None"] = 0] = "None";
    WebGLExceptionSupport[WebGLExceptionSupport["ExplicitlyThrownExceptionsOnly"] = 1] = "ExplicitlyThrownExceptionsOnly";
    WebGLExceptionSupport[WebGLExceptionSupport["FullWithoutStacktrace"] = 2] = "FullWithoutStacktrace";
    WebGLExceptionSupport[WebGLExceptionSupport["FullWithStacktrace"] = 3] = "FullWithStacktrace";
  })(WebGLExceptionSupport = UnityEditor.WebGLExceptionSupport || (UnityEditor.WebGLExceptionSupport = {}));

  var WebGLCompressionFormat;

  (function (WebGLCompressionFormat) {
    WebGLCompressionFormat[WebGLCompressionFormat["Brotli"] = 0] = "Brotli";
    WebGLCompressionFormat[WebGLCompressionFormat["Gzip"] = 1] = "Gzip";
    WebGLCompressionFormat[WebGLCompressionFormat["Disabled"] = 2] = "Disabled";
  })(WebGLCompressionFormat = UnityEditor.WebGLCompressionFormat || (UnityEditor.WebGLCompressionFormat = {}));

  var WebGLLinkerTarget;

  (function (WebGLLinkerTarget) {
    WebGLLinkerTarget[WebGLLinkerTarget["Asm"] = 0] = "Asm";
    WebGLLinkerTarget[WebGLLinkerTarget["Wasm"] = 1] = "Wasm";
    WebGLLinkerTarget[WebGLLinkerTarget["Both"] = 2] = "Both";
  })(WebGLLinkerTarget = UnityEditor.WebGLLinkerTarget || (UnityEditor.WebGLLinkerTarget = {}));

  var WebGLWasmArithmeticExceptions;

  (function (WebGLWasmArithmeticExceptions) {
    WebGLWasmArithmeticExceptions[WebGLWasmArithmeticExceptions["Throw"] = 0] = "Throw";
    WebGLWasmArithmeticExceptions[WebGLWasmArithmeticExceptions["Ignore"] = 1] = "Ignore";
  })(WebGLWasmArithmeticExceptions = UnityEditor.WebGLWasmArithmeticExceptions || (UnityEditor.WebGLWasmArithmeticExceptions = {}));

  var XboxOneEncryptionLevel;

  (function (XboxOneEncryptionLevel) {
    XboxOneEncryptionLevel[XboxOneEncryptionLevel["None"] = 0] = "None";
    XboxOneEncryptionLevel[XboxOneEncryptionLevel["DevkitCompatible"] = 1] = "DevkitCompatible";
    XboxOneEncryptionLevel[XboxOneEncryptionLevel["FullEncryption"] = 2] = "FullEncryption";
  })(XboxOneEncryptionLevel = UnityEditor.XboxOneEncryptionLevel || (UnityEditor.XboxOneEncryptionLevel = {}));

  var XboxOnePackageUpdateGranularity;

  (function (XboxOnePackageUpdateGranularity) {
    XboxOnePackageUpdateGranularity[XboxOnePackageUpdateGranularity["Chunk"] = 1] = "Chunk";
    XboxOnePackageUpdateGranularity[XboxOnePackageUpdateGranularity["File"] = 2] = "File";
  })(XboxOnePackageUpdateGranularity = UnityEditor.XboxOnePackageUpdateGranularity || (UnityEditor.XboxOnePackageUpdateGranularity = {}));

  var XboxOneLoggingLevel;

  (function (XboxOneLoggingLevel) {
    XboxOneLoggingLevel[XboxOneLoggingLevel["AllLogging"] = 4] = "AllLogging";
    XboxOneLoggingLevel[XboxOneLoggingLevel["WarningsAndErrors"] = 2] = "WarningsAndErrors";
    XboxOneLoggingLevel[XboxOneLoggingLevel["ErrorsOnly"] = 1] = "ErrorsOnly";
  })(XboxOneLoggingLevel = UnityEditor.XboxOneLoggingLevel || (UnityEditor.XboxOneLoggingLevel = {}));

  var ScriptCompiler;

  (function (ScriptCompiler) {
    ScriptCompiler[ScriptCompiler["Mono"] = 0] = "Mono";
    ScriptCompiler[ScriptCompiler["Roslyn"] = 1] = "Roslyn";
  })(ScriptCompiler = UnityEditor.ScriptCompiler || (UnityEditor.ScriptCompiler = {}));

  var SelectionMode;

  (function (SelectionMode) {
    SelectionMode[SelectionMode["Unfiltered"] = 0] = "Unfiltered";
    SelectionMode[SelectionMode["TopLevel"] = 1] = "TopLevel";
    SelectionMode[SelectionMode["Deep"] = 2] = "Deep";
    SelectionMode[SelectionMode["ExcludePrefab"] = 4] = "ExcludePrefab";
    SelectionMode[SelectionMode["Editable"] = 8] = "Editable";
    SelectionMode[SelectionMode["Assets"] = 16] = "Assets";
    SelectionMode[SelectionMode["DeepAssets"] = 32] = "DeepAssets";
    SelectionMode[SelectionMode["OnlyUserModifiable"] = 8] = "OnlyUserModifiable";
  })(SelectionMode = UnityEditor.SelectionMode || (UnityEditor.SelectionMode = {}));

  var SerializedPropertyType;

  (function (SerializedPropertyType) {
    SerializedPropertyType[SerializedPropertyType["Generic"] = -1] = "Generic";
    SerializedPropertyType[SerializedPropertyType["Integer"] = 0] = "Integer";
    SerializedPropertyType[SerializedPropertyType["Boolean"] = 1] = "Boolean";
    SerializedPropertyType[SerializedPropertyType["Float"] = 2] = "Float";
    SerializedPropertyType[SerializedPropertyType["String"] = 3] = "String";
    SerializedPropertyType[SerializedPropertyType["Color"] = 4] = "Color";
    SerializedPropertyType[SerializedPropertyType["ObjectReference"] = 5] = "ObjectReference";
    SerializedPropertyType[SerializedPropertyType["LayerMask"] = 6] = "LayerMask";
    SerializedPropertyType[SerializedPropertyType["Enum"] = 7] = "Enum";
    SerializedPropertyType[SerializedPropertyType["Vector2"] = 8] = "Vector2";
    SerializedPropertyType[SerializedPropertyType["Vector3"] = 9] = "Vector3";
    SerializedPropertyType[SerializedPropertyType["Vector4"] = 10] = "Vector4";
    SerializedPropertyType[SerializedPropertyType["Rect"] = 11] = "Rect";
    SerializedPropertyType[SerializedPropertyType["ArraySize"] = 12] = "ArraySize";
    SerializedPropertyType[SerializedPropertyType["Character"] = 13] = "Character";
    SerializedPropertyType[SerializedPropertyType["AnimationCurve"] = 14] = "AnimationCurve";
    SerializedPropertyType[SerializedPropertyType["Bounds"] = 15] = "Bounds";
    SerializedPropertyType[SerializedPropertyType["Gradient"] = 16] = "Gradient";
    SerializedPropertyType[SerializedPropertyType["Quaternion"] = 17] = "Quaternion";
    SerializedPropertyType[SerializedPropertyType["ExposedReference"] = 18] = "ExposedReference";
    SerializedPropertyType[SerializedPropertyType["FixedBufferSize"] = 19] = "FixedBufferSize";
    SerializedPropertyType[SerializedPropertyType["Vector2Int"] = 20] = "Vector2Int";
    SerializedPropertyType[SerializedPropertyType["Vector3Int"] = 21] = "Vector3Int";
    SerializedPropertyType[SerializedPropertyType["RectInt"] = 22] = "RectInt";
    SerializedPropertyType[SerializedPropertyType["BoundsInt"] = 23] = "BoundsInt";
    SerializedPropertyType[SerializedPropertyType["ManagedReference"] = 24] = "ManagedReference";
  })(SerializedPropertyType = UnityEditor.SerializedPropertyType || (UnityEditor.SerializedPropertyType = {}));

  var PreprocessorOverride;

  (function (PreprocessorOverride) {
    PreprocessorOverride[PreprocessorOverride["UseProjectSettings"] = 0] = "UseProjectSettings";
    PreprocessorOverride[PreprocessorOverride["ForcePlatformPreprocessor"] = 1] = "ForcePlatformPreprocessor";
    PreprocessorOverride[PreprocessorOverride["ForceCachingPreprocessor"] = 2] = "ForceCachingPreprocessor";
  })(PreprocessorOverride = UnityEditor.PreprocessorOverride || (UnityEditor.PreprocessorOverride = {}));

  var ShaderUtil_ShaderPropertyTexDim;

  (function (ShaderUtil_ShaderPropertyTexDim) {
    ShaderUtil_ShaderPropertyTexDim[ShaderUtil_ShaderPropertyTexDim["TexDimNone"] = 0] = "TexDimNone";
    ShaderUtil_ShaderPropertyTexDim[ShaderUtil_ShaderPropertyTexDim["TexDim2D"] = 2] = "TexDim2D";
    ShaderUtil_ShaderPropertyTexDim[ShaderUtil_ShaderPropertyTexDim["TexDim3D"] = 3] = "TexDim3D";
    ShaderUtil_ShaderPropertyTexDim[ShaderUtil_ShaderPropertyTexDim["TexDimCUBE"] = 4] = "TexDimCUBE";
    ShaderUtil_ShaderPropertyTexDim[ShaderUtil_ShaderPropertyTexDim["TexDimAny"] = 6] = "TexDimAny";
  })(ShaderUtil_ShaderPropertyTexDim = UnityEditor.ShaderUtil_ShaderPropertyTexDim || (UnityEditor.ShaderUtil_ShaderPropertyTexDim = {}));

  var ShaderUtil_ShaderPropertyType;

  (function (ShaderUtil_ShaderPropertyType) {
    ShaderUtil_ShaderPropertyType[ShaderUtil_ShaderPropertyType["Color"] = 0] = "Color";
    ShaderUtil_ShaderPropertyType[ShaderUtil_ShaderPropertyType["Vector"] = 1] = "Vector";
    ShaderUtil_ShaderPropertyType[ShaderUtil_ShaderPropertyType["Float"] = 2] = "Float";
    ShaderUtil_ShaderPropertyType[ShaderUtil_ShaderPropertyType["Range"] = 3] = "Range";
    ShaderUtil_ShaderPropertyType[ShaderUtil_ShaderPropertyType["TexEnv"] = 4] = "TexEnv";
  })(ShaderUtil_ShaderPropertyType = UnityEditor.ShaderUtil_ShaderPropertyType || (UnityEditor.ShaderUtil_ShaderPropertyType = {}));

  var StaticEditorFlags;

  (function (StaticEditorFlags) {
    StaticEditorFlags[StaticEditorFlags["ContributeGI"] = 1] = "ContributeGI";
    StaticEditorFlags[StaticEditorFlags["OccluderStatic"] = 2] = "OccluderStatic";
    StaticEditorFlags[StaticEditorFlags["OccludeeStatic"] = 16] = "OccludeeStatic";
    StaticEditorFlags[StaticEditorFlags["BatchingStatic"] = 4] = "BatchingStatic";
    StaticEditorFlags[StaticEditorFlags["NavigationStatic"] = 8] = "NavigationStatic";
    StaticEditorFlags[StaticEditorFlags["OffMeshLinkGeneration"] = 32] = "OffMeshLinkGeneration";
    StaticEditorFlags[StaticEditorFlags["ReflectionProbeStatic"] = 64] = "ReflectionProbeStatic";
    StaticEditorFlags[StaticEditorFlags["LightmapStatic"] = 1] = "LightmapStatic";
  })(StaticEditorFlags = UnityEditor.StaticEditorFlags || (UnityEditor.StaticEditorFlags = {}));

  var VertexChannelCompressionFlags;

  (function (VertexChannelCompressionFlags) {
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["None"] = 0] = "None";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["Position"] = 1] = "Position";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["Normal"] = 2] = "Normal";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["Tangent"] = 4] = "Tangent";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["Color"] = 8] = "Color";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["TexCoord0"] = 16] = "TexCoord0";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["TexCoord1"] = 32] = "TexCoord1";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["TexCoord2"] = 64] = "TexCoord2";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["TexCoord3"] = 128] = "TexCoord3";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["kPosition"] = 1] = "kPosition";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["kNormal"] = 2] = "kNormal";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["kColor"] = 4] = "kColor";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["kUV0"] = 8] = "kUV0";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["kUV1"] = 16] = "kUV1";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["kUV2"] = 32] = "kUV2";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["kUV3"] = 64] = "kUV3";
    VertexChannelCompressionFlags[VertexChannelCompressionFlags["kTangent"] = 128] = "kTangent";
  })(VertexChannelCompressionFlags = UnityEditor.VertexChannelCompressionFlags || (UnityEditor.VertexChannelCompressionFlags = {}));

  var AnimationUtility_CurveModifiedType;

  (function (AnimationUtility_CurveModifiedType) {
    AnimationUtility_CurveModifiedType[AnimationUtility_CurveModifiedType["CurveDeleted"] = 0] = "CurveDeleted";
    AnimationUtility_CurveModifiedType[AnimationUtility_CurveModifiedType["CurveModified"] = 1] = "CurveModified";
    AnimationUtility_CurveModifiedType[AnimationUtility_CurveModifiedType["ClipModified"] = 2] = "ClipModified";
  })(AnimationUtility_CurveModifiedType = UnityEditor.AnimationUtility_CurveModifiedType || (UnityEditor.AnimationUtility_CurveModifiedType = {}));

  var AnimationUtility_TangentMode;

  (function (AnimationUtility_TangentMode) {
    AnimationUtility_TangentMode[AnimationUtility_TangentMode["Free"] = 0] = "Free";
    AnimationUtility_TangentMode[AnimationUtility_TangentMode["Auto"] = 1] = "Auto";
    AnimationUtility_TangentMode[AnimationUtility_TangentMode["Linear"] = 2] = "Linear";
    AnimationUtility_TangentMode[AnimationUtility_TangentMode["Constant"] = 3] = "Constant";
    AnimationUtility_TangentMode[AnimationUtility_TangentMode["ClampedAuto"] = 4] = "ClampedAuto";
  })(AnimationUtility_TangentMode = UnityEditor.AnimationUtility_TangentMode || (UnityEditor.AnimationUtility_TangentMode = {}));

  var DrawCameraMode;

  (function (DrawCameraMode) {
    DrawCameraMode[DrawCameraMode["UserDefined"] = -2147483648] = "UserDefined";
    DrawCameraMode[DrawCameraMode["Normal"] = -1] = "Normal";
    DrawCameraMode[DrawCameraMode["Textured"] = 0] = "Textured";
    DrawCameraMode[DrawCameraMode["Wireframe"] = 1] = "Wireframe";
    DrawCameraMode[DrawCameraMode["TexturedWire"] = 2] = "TexturedWire";
    DrawCameraMode[DrawCameraMode["ShadowCascades"] = 3] = "ShadowCascades";
    DrawCameraMode[DrawCameraMode["RenderPaths"] = 4] = "RenderPaths";
    DrawCameraMode[DrawCameraMode["AlphaChannel"] = 5] = "AlphaChannel";
    DrawCameraMode[DrawCameraMode["Overdraw"] = 6] = "Overdraw";
    DrawCameraMode[DrawCameraMode["Mipmaps"] = 7] = "Mipmaps";
    DrawCameraMode[DrawCameraMode["DeferredDiffuse"] = 8] = "DeferredDiffuse";
    DrawCameraMode[DrawCameraMode["DeferredSpecular"] = 9] = "DeferredSpecular";
    DrawCameraMode[DrawCameraMode["DeferredSmoothness"] = 10] = "DeferredSmoothness";
    DrawCameraMode[DrawCameraMode["DeferredNormal"] = 11] = "DeferredNormal";
    DrawCameraMode[DrawCameraMode["Charting"] = -12] = "Charting";
    DrawCameraMode[DrawCameraMode["RealtimeCharting"] = 12] = "RealtimeCharting";
    DrawCameraMode[DrawCameraMode["Systems"] = 13] = "Systems";
    DrawCameraMode[DrawCameraMode["Albedo"] = -14] = "Albedo";
    DrawCameraMode[DrawCameraMode["RealtimeAlbedo"] = 14] = "RealtimeAlbedo";
    DrawCameraMode[DrawCameraMode["Emissive"] = -15] = "Emissive";
    DrawCameraMode[DrawCameraMode["RealtimeEmissive"] = 15] = "RealtimeEmissive";
    DrawCameraMode[DrawCameraMode["Irradiance"] = -16] = "Irradiance";
    DrawCameraMode[DrawCameraMode["RealtimeIndirect"] = 16] = "RealtimeIndirect";
    DrawCameraMode[DrawCameraMode["Directionality"] = -17] = "Directionality";
    DrawCameraMode[DrawCameraMode["RealtimeDirectionality"] = 17] = "RealtimeDirectionality";
    DrawCameraMode[DrawCameraMode["Baked"] = -18] = "Baked";
    DrawCameraMode[DrawCameraMode["BakedLightmap"] = 18] = "BakedLightmap";
    DrawCameraMode[DrawCameraMode["Clustering"] = 19] = "Clustering";
    DrawCameraMode[DrawCameraMode["LitClustering"] = 20] = "LitClustering";
    DrawCameraMode[DrawCameraMode["ValidateAlbedo"] = 21] = "ValidateAlbedo";
    DrawCameraMode[DrawCameraMode["ValidateMetalSpecular"] = 22] = "ValidateMetalSpecular";
    DrawCameraMode[DrawCameraMode["ShadowMasks"] = 23] = "ShadowMasks";
    DrawCameraMode[DrawCameraMode["LightOverlap"] = 24] = "LightOverlap";
    DrawCameraMode[DrawCameraMode["BakedAlbedo"] = 25] = "BakedAlbedo";
    DrawCameraMode[DrawCameraMode["BakedEmissive"] = 26] = "BakedEmissive";
    DrawCameraMode[DrawCameraMode["BakedDirectionality"] = 27] = "BakedDirectionality";
    DrawCameraMode[DrawCameraMode["BakedTexelValidity"] = 28] = "BakedTexelValidity";
    DrawCameraMode[DrawCameraMode["BakedIndices"] = 29] = "BakedIndices";
    DrawCameraMode[DrawCameraMode["BakedCharting"] = 30] = "BakedCharting";
    DrawCameraMode[DrawCameraMode["SpriteMask"] = 31] = "SpriteMask";
    DrawCameraMode[DrawCameraMode["BakedUVOverlap"] = 32] = "BakedUVOverlap";
    DrawCameraMode[DrawCameraMode["TextureStreaming"] = 33] = "TextureStreaming";
    DrawCameraMode[DrawCameraMode["BakedLightmapCulling"] = 34] = "BakedLightmapCulling";
    DrawCameraMode[DrawCameraMode["GIContributorsReceivers"] = 35] = "GIContributorsReceivers";
  })(DrawCameraMode = UnityEditor.DrawCameraMode || (UnityEditor.DrawCameraMode = {}));

  var AssetStatus;

  (function (AssetStatus) {
    AssetStatus[AssetStatus["Calculating"] = -1] = "Calculating";
    AssetStatus[AssetStatus["ClientOnly"] = 0] = "ClientOnly";
    AssetStatus[AssetStatus["ServerOnly"] = 1] = "ServerOnly";
    AssetStatus[AssetStatus["Unchanged"] = 2] = "Unchanged";
    AssetStatus[AssetStatus["Conflict"] = 3] = "Conflict";
    AssetStatus[AssetStatus["Same"] = 4] = "Same";
    AssetStatus[AssetStatus["NewVersionAvailable"] = 5] = "NewVersionAvailable";
    AssetStatus[AssetStatus["NewLocalVersion"] = 6] = "NewLocalVersion";
    AssetStatus[AssetStatus["RestoredFromTrash"] = 7] = "RestoredFromTrash";
    AssetStatus[AssetStatus["Ignored"] = 8] = "Ignored";
    AssetStatus[AssetStatus["BadState"] = 9] = "BadState";
  })(AssetStatus = UnityEditor.AssetStatus || (UnityEditor.AssetStatus = {}));

  var SpeedTreeImporter_MaterialLocation;

  (function (SpeedTreeImporter_MaterialLocation) {
    SpeedTreeImporter_MaterialLocation[SpeedTreeImporter_MaterialLocation["External"] = 0] = "External";
    SpeedTreeImporter_MaterialLocation[SpeedTreeImporter_MaterialLocation["InPrefab"] = 1] = "InPrefab";
  })(SpeedTreeImporter_MaterialLocation = UnityEditor.SpeedTreeImporter_MaterialLocation || (UnityEditor.SpeedTreeImporter_MaterialLocation = {}));

  var TextureImporterFormat;

  (function (TextureImporterFormat) {
    TextureImporterFormat[TextureImporterFormat["Automatic"] = -1] = "Automatic";
    TextureImporterFormat[TextureImporterFormat["AutomaticCompressed"] = -1] = "AutomaticCompressed";
    TextureImporterFormat[TextureImporterFormat["Automatic16bit"] = -2] = "Automatic16bit";
    TextureImporterFormat[TextureImporterFormat["AutomaticTruecolor"] = -3] = "AutomaticTruecolor";
    TextureImporterFormat[TextureImporterFormat["AutomaticCrunched"] = -5] = "AutomaticCrunched";
    TextureImporterFormat[TextureImporterFormat["AutomaticHDR"] = -6] = "AutomaticHDR";
    TextureImporterFormat[TextureImporterFormat["AutomaticCompressedHDR"] = -7] = "AutomaticCompressedHDR";
    TextureImporterFormat[TextureImporterFormat["DXT1"] = 10] = "DXT1";
    TextureImporterFormat[TextureImporterFormat["DXT5"] = 12] = "DXT5";
    TextureImporterFormat[TextureImporterFormat["RGB16"] = 7] = "RGB16";
    TextureImporterFormat[TextureImporterFormat["RGB24"] = 3] = "RGB24";
    TextureImporterFormat[TextureImporterFormat["Alpha8"] = 1] = "Alpha8";
    TextureImporterFormat[TextureImporterFormat["R16"] = 9] = "R16";
    TextureImporterFormat[TextureImporterFormat["R8"] = 63] = "R8";
    TextureImporterFormat[TextureImporterFormat["RG16"] = 62] = "RG16";
    TextureImporterFormat[TextureImporterFormat["ARGB16"] = 2] = "ARGB16";
    TextureImporterFormat[TextureImporterFormat["RGBA32"] = 4] = "RGBA32";
    TextureImporterFormat[TextureImporterFormat["ARGB32"] = 5] = "ARGB32";
    TextureImporterFormat[TextureImporterFormat["RGBA16"] = 13] = "RGBA16";
    TextureImporterFormat[TextureImporterFormat["RHalf"] = 15] = "RHalf";
    TextureImporterFormat[TextureImporterFormat["RGHalf"] = 16] = "RGHalf";
    TextureImporterFormat[TextureImporterFormat["RGBAHalf"] = 17] = "RGBAHalf";
    TextureImporterFormat[TextureImporterFormat["RFloat"] = 18] = "RFloat";
    TextureImporterFormat[TextureImporterFormat["RGFloat"] = 19] = "RGFloat";
    TextureImporterFormat[TextureImporterFormat["RGBAFloat"] = 20] = "RGBAFloat";
    TextureImporterFormat[TextureImporterFormat["RGB9E5"] = 22] = "RGB9E5";
    TextureImporterFormat[TextureImporterFormat["BC4"] = 26] = "BC4";
    TextureImporterFormat[TextureImporterFormat["BC5"] = 27] = "BC5";
    TextureImporterFormat[TextureImporterFormat["BC6H"] = 24] = "BC6H";
    TextureImporterFormat[TextureImporterFormat["BC7"] = 25] = "BC7";
    TextureImporterFormat[TextureImporterFormat["DXT1Crunched"] = 28] = "DXT1Crunched";
    TextureImporterFormat[TextureImporterFormat["DXT5Crunched"] = 29] = "DXT5Crunched";
    TextureImporterFormat[TextureImporterFormat["PVRTC_RGB2"] = 30] = "PVRTC_RGB2";
    TextureImporterFormat[TextureImporterFormat["PVRTC_RGBA2"] = 31] = "PVRTC_RGBA2";
    TextureImporterFormat[TextureImporterFormat["PVRTC_RGB4"] = 32] = "PVRTC_RGB4";
    TextureImporterFormat[TextureImporterFormat["PVRTC_RGBA4"] = 33] = "PVRTC_RGBA4";
    TextureImporterFormat[TextureImporterFormat["ETC_RGB4"] = 34] = "ETC_RGB4";
    TextureImporterFormat[TextureImporterFormat["ATC_RGB4"] = 35] = "ATC_RGB4";
    TextureImporterFormat[TextureImporterFormat["ATC_RGBA8"] = 36] = "ATC_RGBA8";
    TextureImporterFormat[TextureImporterFormat["EAC_R"] = 41] = "EAC_R";
    TextureImporterFormat[TextureImporterFormat["EAC_R_SIGNED"] = 42] = "EAC_R_SIGNED";
    TextureImporterFormat[TextureImporterFormat["EAC_RG"] = 43] = "EAC_RG";
    TextureImporterFormat[TextureImporterFormat["EAC_RG_SIGNED"] = 44] = "EAC_RG_SIGNED";
    TextureImporterFormat[TextureImporterFormat["ETC2_RGB4"] = 45] = "ETC2_RGB4";
    TextureImporterFormat[TextureImporterFormat["ETC2_RGB4_PUNCHTHROUGH_ALPHA"] = 46] = "ETC2_RGB4_PUNCHTHROUGH_ALPHA";
    TextureImporterFormat[TextureImporterFormat["ETC2_RGBA8"] = 47] = "ETC2_RGBA8";
    TextureImporterFormat[TextureImporterFormat["ASTC_4x4"] = 48] = "ASTC_4x4";
    TextureImporterFormat[TextureImporterFormat["ASTC_5x5"] = 49] = "ASTC_5x5";
    TextureImporterFormat[TextureImporterFormat["ASTC_6x6"] = 50] = "ASTC_6x6";
    TextureImporterFormat[TextureImporterFormat["ASTC_8x8"] = 51] = "ASTC_8x8";
    TextureImporterFormat[TextureImporterFormat["ASTC_10x10"] = 52] = "ASTC_10x10";
    TextureImporterFormat[TextureImporterFormat["ASTC_12x12"] = 53] = "ASTC_12x12";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGB_4x4"] = 48] = "ASTC_RGB_4x4";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGB_5x5"] = 49] = "ASTC_RGB_5x5";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGB_6x6"] = 50] = "ASTC_RGB_6x6";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGB_8x8"] = 51] = "ASTC_RGB_8x8";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGB_10x10"] = 52] = "ASTC_RGB_10x10";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGB_12x12"] = 53] = "ASTC_RGB_12x12";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGBA_4x4"] = 54] = "ASTC_RGBA_4x4";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGBA_5x5"] = 55] = "ASTC_RGBA_5x5";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGBA_6x6"] = 56] = "ASTC_RGBA_6x6";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGBA_8x8"] = 57] = "ASTC_RGBA_8x8";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGBA_10x10"] = 58] = "ASTC_RGBA_10x10";
    TextureImporterFormat[TextureImporterFormat["ASTC_RGBA_12x12"] = 59] = "ASTC_RGBA_12x12";
    TextureImporterFormat[TextureImporterFormat["ETC_RGB4_3DS"] = 60] = "ETC_RGB4_3DS";
    TextureImporterFormat[TextureImporterFormat["ETC_RGBA8_3DS"] = 61] = "ETC_RGBA8_3DS";
    TextureImporterFormat[TextureImporterFormat["ETC_RGB4Crunched"] = 64] = "ETC_RGB4Crunched";
    TextureImporterFormat[TextureImporterFormat["ETC2_RGBA8Crunched"] = 65] = "ETC2_RGBA8Crunched";
    TextureImporterFormat[TextureImporterFormat["ASTC_HDR_4x4"] = 66] = "ASTC_HDR_4x4";
    TextureImporterFormat[TextureImporterFormat["ASTC_HDR_5x5"] = 67] = "ASTC_HDR_5x5";
    TextureImporterFormat[TextureImporterFormat["ASTC_HDR_6x6"] = 68] = "ASTC_HDR_6x6";
    TextureImporterFormat[TextureImporterFormat["ASTC_HDR_8x8"] = 69] = "ASTC_HDR_8x8";
    TextureImporterFormat[TextureImporterFormat["ASTC_HDR_10x10"] = 70] = "ASTC_HDR_10x10";
    TextureImporterFormat[TextureImporterFormat["ASTC_HDR_12x12"] = 71] = "ASTC_HDR_12x12";
    TextureImporterFormat[TextureImporterFormat["RG32"] = 72] = "RG32";
    TextureImporterFormat[TextureImporterFormat["RGB48"] = 73] = "RGB48";
    TextureImporterFormat[TextureImporterFormat["RGBA64"] = 74] = "RGBA64";
  })(TextureImporterFormat = UnityEditor.TextureImporterFormat || (UnityEditor.TextureImporterFormat = {}));

  var TextureImporterMipFilter;

  (function (TextureImporterMipFilter) {
    TextureImporterMipFilter[TextureImporterMipFilter["BoxFilter"] = 0] = "BoxFilter";
    TextureImporterMipFilter[TextureImporterMipFilter["KaiserFilter"] = 1] = "KaiserFilter";
  })(TextureImporterMipFilter = UnityEditor.TextureImporterMipFilter || (UnityEditor.TextureImporterMipFilter = {}));

  var TextureImporterGenerateCubemap;

  (function (TextureImporterGenerateCubemap) {
    TextureImporterGenerateCubemap[TextureImporterGenerateCubemap["None"] = 0] = "None";
    TextureImporterGenerateCubemap[TextureImporterGenerateCubemap["Spheremap"] = 1] = "Spheremap";
    TextureImporterGenerateCubemap[TextureImporterGenerateCubemap["Cylindrical"] = 2] = "Cylindrical";
    TextureImporterGenerateCubemap[TextureImporterGenerateCubemap["SimpleSpheremap"] = 3] = "SimpleSpheremap";
    TextureImporterGenerateCubemap[TextureImporterGenerateCubemap["NiceSpheremap"] = 4] = "NiceSpheremap";
    TextureImporterGenerateCubemap[TextureImporterGenerateCubemap["FullCubemap"] = 5] = "FullCubemap";
    TextureImporterGenerateCubemap[TextureImporterGenerateCubemap["AutoCubemap"] = 6] = "AutoCubemap";
  })(TextureImporterGenerateCubemap = UnityEditor.TextureImporterGenerateCubemap || (UnityEditor.TextureImporterGenerateCubemap = {}));

  var TextureImporterNPOTScale;

  (function (TextureImporterNPOTScale) {
    TextureImporterNPOTScale[TextureImporterNPOTScale["None"] = 0] = "None";
    TextureImporterNPOTScale[TextureImporterNPOTScale["ToNearest"] = 1] = "ToNearest";
    TextureImporterNPOTScale[TextureImporterNPOTScale["ToLarger"] = 2] = "ToLarger";
    TextureImporterNPOTScale[TextureImporterNPOTScale["ToSmaller"] = 3] = "ToSmaller";
  })(TextureImporterNPOTScale = UnityEditor.TextureImporterNPOTScale || (UnityEditor.TextureImporterNPOTScale = {}));

  var TextureImporterNormalFilter;

  (function (TextureImporterNormalFilter) {
    TextureImporterNormalFilter[TextureImporterNormalFilter["Standard"] = 0] = "Standard";
    TextureImporterNormalFilter[TextureImporterNormalFilter["Sobel"] = 1] = "Sobel";
  })(TextureImporterNormalFilter = UnityEditor.TextureImporterNormalFilter || (UnityEditor.TextureImporterNormalFilter = {}));

  var TextureImporterAlphaSource;

  (function (TextureImporterAlphaSource) {
    TextureImporterAlphaSource[TextureImporterAlphaSource["None"] = 0] = "None";
    TextureImporterAlphaSource[TextureImporterAlphaSource["FromInput"] = 1] = "FromInput";
    TextureImporterAlphaSource[TextureImporterAlphaSource["FromGrayScale"] = 2] = "FromGrayScale";
  })(TextureImporterAlphaSource = UnityEditor.TextureImporterAlphaSource || (UnityEditor.TextureImporterAlphaSource = {}));

  var TextureImporterSingleChannelComponent;

  (function (TextureImporterSingleChannelComponent) {
    TextureImporterSingleChannelComponent[TextureImporterSingleChannelComponent["Alpha"] = 0] = "Alpha";
    TextureImporterSingleChannelComponent[TextureImporterSingleChannelComponent["Red"] = 1] = "Red";
  })(TextureImporterSingleChannelComponent = UnityEditor.TextureImporterSingleChannelComponent || (UnityEditor.TextureImporterSingleChannelComponent = {}));

  var TextureImporterType;

  (function (TextureImporterType) {
    TextureImporterType[TextureImporterType["Default"] = 0] = "Default";
    TextureImporterType[TextureImporterType["Image"] = 0] = "Image";
    TextureImporterType[TextureImporterType["Bump"] = 1] = "Bump";
    TextureImporterType[TextureImporterType["NormalMap"] = 1] = "NormalMap";
    TextureImporterType[TextureImporterType["GUI"] = 2] = "GUI";
    TextureImporterType[TextureImporterType["Sprite"] = 8] = "Sprite";
    TextureImporterType[TextureImporterType["Cursor"] = 7] = "Cursor";
    TextureImporterType[TextureImporterType["Cubemap"] = 3] = "Cubemap";
    TextureImporterType[TextureImporterType["Reflection"] = 3] = "Reflection";
    TextureImporterType[TextureImporterType["Cookie"] = 4] = "Cookie";
    TextureImporterType[TextureImporterType["Lightmap"] = 6] = "Lightmap";
    TextureImporterType[TextureImporterType["HDRI"] = 9] = "HDRI";
    TextureImporterType[TextureImporterType["Advanced"] = 5] = "Advanced";
    TextureImporterType[TextureImporterType["SingleChannel"] = 10] = "SingleChannel";
    TextureImporterType[TextureImporterType["Shadowmask"] = 11] = "Shadowmask";
    TextureImporterType[TextureImporterType["DirectionalLightmap"] = 12] = "DirectionalLightmap";
  })(TextureImporterType = UnityEditor.TextureImporterType || (UnityEditor.TextureImporterType = {}));

  var TextureImporterCompression;

  (function (TextureImporterCompression) {
    TextureImporterCompression[TextureImporterCompression["Uncompressed"] = 0] = "Uncompressed";
    TextureImporterCompression[TextureImporterCompression["Compressed"] = 1] = "Compressed";
    TextureImporterCompression[TextureImporterCompression["CompressedHQ"] = 2] = "CompressedHQ";
    TextureImporterCompression[TextureImporterCompression["CompressedLQ"] = 3] = "CompressedLQ";
  })(TextureImporterCompression = UnityEditor.TextureImporterCompression || (UnityEditor.TextureImporterCompression = {}));

  var TextureResizeAlgorithm;

  (function (TextureResizeAlgorithm) {
    TextureResizeAlgorithm[TextureResizeAlgorithm["Mitchell"] = 0] = "Mitchell";
    TextureResizeAlgorithm[TextureResizeAlgorithm["Bilinear"] = 1] = "Bilinear";
  })(TextureResizeAlgorithm = UnityEditor.TextureResizeAlgorithm || (UnityEditor.TextureResizeAlgorithm = {}));

  var TextureImporterShape;

  (function (TextureImporterShape) {
    TextureImporterShape[TextureImporterShape["Texture2D"] = 1] = "Texture2D";
    TextureImporterShape[TextureImporterShape["TextureCube"] = 2] = "TextureCube";
    TextureImporterShape[TextureImporterShape["Texture2DArray"] = 4] = "Texture2DArray";
    TextureImporterShape[TextureImporterShape["Texture3D"] = 8] = "Texture3D";
  })(TextureImporterShape = UnityEditor.TextureImporterShape || (UnityEditor.TextureImporterShape = {}));

  var SpriteImportMode;

  (function (SpriteImportMode) {
    SpriteImportMode[SpriteImportMode["None"] = 0] = "None";
    SpriteImportMode[SpriteImportMode["Single"] = 1] = "Single";
    SpriteImportMode[SpriteImportMode["Multiple"] = 2] = "Multiple";
    SpriteImportMode[SpriteImportMode["Polygon"] = 3] = "Polygon";
  })(SpriteImportMode = UnityEditor.SpriteImportMode || (UnityEditor.SpriteImportMode = {}));

  var AndroidETC2FallbackOverride;

  (function (AndroidETC2FallbackOverride) {
    AndroidETC2FallbackOverride[AndroidETC2FallbackOverride["UseBuildSettings"] = 0] = "UseBuildSettings";
    AndroidETC2FallbackOverride[AndroidETC2FallbackOverride["Quality32Bit"] = 1] = "Quality32Bit";
    AndroidETC2FallbackOverride[AndroidETC2FallbackOverride["Quality16Bit"] = 2] = "Quality16Bit";
    AndroidETC2FallbackOverride[AndroidETC2FallbackOverride["Quality32BitDownscaled"] = 3] = "Quality32BitDownscaled";
  })(AndroidETC2FallbackOverride = UnityEditor.AndroidETC2FallbackOverride || (UnityEditor.AndroidETC2FallbackOverride = {}));

  var CommandHint;

  (function (CommandHint) {
    CommandHint[CommandHint["Undefined"] = -1] = "Undefined";
    CommandHint[CommandHint["None"] = 0] = "None";
    CommandHint[CommandHint["Event"] = 1] = "Event";
    CommandHint[CommandHint["Menu"] = 2] = "Menu";
    CommandHint[CommandHint["Shortcut"] = 4] = "Shortcut";
    CommandHint[CommandHint["Shelf"] = 8] = "Shelf";
    CommandHint[CommandHint["UI"] = 1048576] = "UI";
    CommandHint[CommandHint["OnGUI"] = 3145728] = "OnGUI";
    CommandHint[CommandHint["UIElements"] = 5242880] = "UIElements";
    CommandHint[CommandHint["Validate"] = 1073741824] = "Validate";
    CommandHint[CommandHint["UserDefined"] = -2147483648] = "UserDefined";
    CommandHint[CommandHint["Any"] = -1] = "Any";
  })(CommandHint = UnityEditor.CommandHint || (UnityEditor.CommandHint = {}));

  var GameViewSizeGroupType;

  (function (GameViewSizeGroupType) {
    GameViewSizeGroupType[GameViewSizeGroupType["Standalone"] = 0] = "Standalone";
    GameViewSizeGroupType[GameViewSizeGroupType["WebPlayer"] = 1] = "WebPlayer";
    GameViewSizeGroupType[GameViewSizeGroupType["iOS"] = 2] = "iOS";
    GameViewSizeGroupType[GameViewSizeGroupType["Android"] = 3] = "Android";
    GameViewSizeGroupType[GameViewSizeGroupType["PS3"] = 4] = "PS3";
    GameViewSizeGroupType[GameViewSizeGroupType["WiiU"] = 5] = "WiiU";
    GameViewSizeGroupType[GameViewSizeGroupType["Tizen"] = 6] = "Tizen";
    GameViewSizeGroupType[GameViewSizeGroupType["WP8"] = 7] = "WP8";
    GameViewSizeGroupType[GameViewSizeGroupType["N3DS"] = 8] = "N3DS";
    GameViewSizeGroupType[GameViewSizeGroupType["HMD"] = 9] = "HMD";
  })(GameViewSizeGroupType = UnityEditor.GameViewSizeGroupType || (UnityEditor.GameViewSizeGroupType = {}));

  var LightmapEditorSettings_Lightmapper;

  (function (LightmapEditorSettings_Lightmapper) {
    LightmapEditorSettings_Lightmapper[LightmapEditorSettings_Lightmapper["Radiosity"] = 0] = "Radiosity";
    LightmapEditorSettings_Lightmapper[LightmapEditorSettings_Lightmapper["Enlighten"] = 0] = "Enlighten";
    LightmapEditorSettings_Lightmapper[LightmapEditorSettings_Lightmapper["PathTracer"] = 1] = "PathTracer";
    LightmapEditorSettings_Lightmapper[LightmapEditorSettings_Lightmapper["ProgressiveCPU"] = 1] = "ProgressiveCPU";
    LightmapEditorSettings_Lightmapper[LightmapEditorSettings_Lightmapper["ProgressiveGPU"] = 2] = "ProgressiveGPU";
  })(LightmapEditorSettings_Lightmapper = UnityEditor.LightmapEditorSettings_Lightmapper || (UnityEditor.LightmapEditorSettings_Lightmapper = {}));

  var LightmapEditorSettings_Sampling;

  (function (LightmapEditorSettings_Sampling) {
    LightmapEditorSettings_Sampling[LightmapEditorSettings_Sampling["Auto"] = 0] = "Auto";
    LightmapEditorSettings_Sampling[LightmapEditorSettings_Sampling["Fixed"] = 1] = "Fixed";
  })(LightmapEditorSettings_Sampling = UnityEditor.LightmapEditorSettings_Sampling || (UnityEditor.LightmapEditorSettings_Sampling = {}));

  var LightmapEditorSettings_FilterMode;

  (function (LightmapEditorSettings_FilterMode) {
    LightmapEditorSettings_FilterMode[LightmapEditorSettings_FilterMode["None"] = 0] = "None";
    LightmapEditorSettings_FilterMode[LightmapEditorSettings_FilterMode["Auto"] = 1] = "Auto";
    LightmapEditorSettings_FilterMode[LightmapEditorSettings_FilterMode["Advanced"] = 2] = "Advanced";
  })(LightmapEditorSettings_FilterMode = UnityEditor.LightmapEditorSettings_FilterMode || (UnityEditor.LightmapEditorSettings_FilterMode = {}));

  var LightmapEditorSettings_DenoiserType;

  (function (LightmapEditorSettings_DenoiserType) {
    LightmapEditorSettings_DenoiserType[LightmapEditorSettings_DenoiserType["None"] = 0] = "None";
    LightmapEditorSettings_DenoiserType[LightmapEditorSettings_DenoiserType["Optix"] = 1] = "Optix";
    LightmapEditorSettings_DenoiserType[LightmapEditorSettings_DenoiserType["OpenImage"] = 2] = "OpenImage";
    LightmapEditorSettings_DenoiserType[LightmapEditorSettings_DenoiserType["RadeonPro"] = 3] = "RadeonPro";
  })(LightmapEditorSettings_DenoiserType = UnityEditor.LightmapEditorSettings_DenoiserType || (UnityEditor.LightmapEditorSettings_DenoiserType = {}));

  var LightmapEditorSettings_FilterType;

  (function (LightmapEditorSettings_FilterType) {
    LightmapEditorSettings_FilterType[LightmapEditorSettings_FilterType["Gaussian"] = 0] = "Gaussian";
    LightmapEditorSettings_FilterType[LightmapEditorSettings_FilterType["ATrous"] = 1] = "ATrous";
    LightmapEditorSettings_FilterType[LightmapEditorSettings_FilterType["None"] = 2] = "None";
  })(LightmapEditorSettings_FilterType = UnityEditor.LightmapEditorSettings_FilterType || (UnityEditor.LightmapEditorSettings_FilterType = {}));

  var LightmapEditorSettings_GIBakeBackend;

  (function (LightmapEditorSettings_GIBakeBackend) {
    LightmapEditorSettings_GIBakeBackend[LightmapEditorSettings_GIBakeBackend["Radiosity"] = 0] = "Radiosity";
    LightmapEditorSettings_GIBakeBackend[LightmapEditorSettings_GIBakeBackend["PathTracer"] = 1] = "PathTracer";
  })(LightmapEditorSettings_GIBakeBackend = UnityEditor.LightmapEditorSettings_GIBakeBackend || (UnityEditor.LightmapEditorSettings_GIBakeBackend = {}));

  var LightmapEditorSettings_PathTracerSampling;

  (function (LightmapEditorSettings_PathTracerSampling) {
    LightmapEditorSettings_PathTracerSampling[LightmapEditorSettings_PathTracerSampling["Auto"] = 0] = "Auto";
    LightmapEditorSettings_PathTracerSampling[LightmapEditorSettings_PathTracerSampling["Fixed"] = 1] = "Fixed";
  })(LightmapEditorSettings_PathTracerSampling = UnityEditor.LightmapEditorSettings_PathTracerSampling || (UnityEditor.LightmapEditorSettings_PathTracerSampling = {}));

  var LightmapEditorSettings_PathTracerFilter;

  (function (LightmapEditorSettings_PathTracerFilter) {
    LightmapEditorSettings_PathTracerFilter[LightmapEditorSettings_PathTracerFilter["Gaussian"] = 0] = "Gaussian";
    LightmapEditorSettings_PathTracerFilter[LightmapEditorSettings_PathTracerFilter["ATrous"] = 1] = "ATrous";
  })(LightmapEditorSettings_PathTracerFilter = UnityEditor.LightmapEditorSettings_PathTracerFilter || (UnityEditor.LightmapEditorSettings_PathTracerFilter = {}));

  var LightmapBakeQuality;

  (function (LightmapBakeQuality) {
    LightmapBakeQuality[LightmapBakeQuality["High"] = 0] = "High";
    LightmapBakeQuality[LightmapBakeQuality["Low"] = 1] = "Low";
  })(LightmapBakeQuality = UnityEditor.LightmapBakeQuality || (UnityEditor.LightmapBakeQuality = {}));

  var Lightmapping_GIWorkflowMode;

  (function (Lightmapping_GIWorkflowMode) {
    Lightmapping_GIWorkflowMode[Lightmapping_GIWorkflowMode["Iterative"] = 0] = "Iterative";
    Lightmapping_GIWorkflowMode[Lightmapping_GIWorkflowMode["OnDemand"] = 1] = "OnDemand";
    Lightmapping_GIWorkflowMode[Lightmapping_GIWorkflowMode["Legacy"] = 2] = "Legacy";
  })(Lightmapping_GIWorkflowMode = UnityEditor.Lightmapping_GIWorkflowMode || (UnityEditor.Lightmapping_GIWorkflowMode = {}));

  var ViewTool;

  (function (ViewTool) {
    ViewTool[ViewTool["None"] = -1] = "None";
    ViewTool[ViewTool["Orbit"] = 0] = "Orbit";
    ViewTool[ViewTool["Pan"] = 1] = "Pan";
    ViewTool[ViewTool["Zoom"] = 2] = "Zoom";
    ViewTool[ViewTool["FPS"] = 3] = "FPS";
  })(ViewTool = UnityEditor.ViewTool || (UnityEditor.ViewTool = {}));

  var PivotMode;

  (function (PivotMode) {
    PivotMode[PivotMode["Center"] = 0] = "Center";
    PivotMode[PivotMode["Pivot"] = 1] = "Pivot";
  })(PivotMode = UnityEditor.PivotMode || (UnityEditor.PivotMode = {}));

  var PivotRotation;

  (function (PivotRotation) {
    PivotRotation[PivotRotation["Local"] = 0] = "Local";
    PivotRotation[PivotRotation["Global"] = 1] = "Global";
  })(PivotRotation = UnityEditor.PivotRotation || (UnityEditor.PivotRotation = {}));

  var Tool;

  (function (Tool) {
    Tool[Tool["View"] = 0] = "View";
    Tool[Tool["Move"] = 1] = "Move";
    Tool[Tool["Rotate"] = 2] = "Rotate";
    Tool[Tool["Scale"] = 3] = "Scale";
    Tool[Tool["Rect"] = 4] = "Rect";
    Tool[Tool["Transform"] = 5] = "Transform";
    Tool[Tool["Custom"] = 6] = "Custom";
    Tool[Tool["None"] = -1] = "None";
  })(Tool = UnityEditor.Tool || (UnityEditor.Tool = {}));

  var TextureImporterCubemapConvolution;

  (function (TextureImporterCubemapConvolution) {
    TextureImporterCubemapConvolution[TextureImporterCubemapConvolution["None"] = 0] = "None";
    TextureImporterCubemapConvolution[TextureImporterCubemapConvolution["Specular"] = 1] = "Specular";
    TextureImporterCubemapConvolution[TextureImporterCubemapConvolution["Diffuse"] = 2] = "Diffuse";
  })(TextureImporterCubemapConvolution = UnityEditor.TextureImporterCubemapConvolution || (UnityEditor.TextureImporterCubemapConvolution = {}));

  var TextureImporterRGBMMode;

  (function (TextureImporterRGBMMode) {
    TextureImporterRGBMMode[TextureImporterRGBMMode["Auto"] = 0] = "Auto";
    TextureImporterRGBMMode[TextureImporterRGBMMode["On"] = 1] = "On";
    TextureImporterRGBMMode[TextureImporterRGBMMode["Off"] = 2] = "Off";
    TextureImporterRGBMMode[TextureImporterRGBMMode["Encoded"] = 3] = "Encoded";
  })(TextureImporterRGBMMode = UnityEditor.TextureImporterRGBMMode || (UnityEditor.TextureImporterRGBMMode = {}));

  var BodyPart;

  (function (BodyPart) {
    BodyPart[BodyPart["None"] = -1] = "None";
    BodyPart[BodyPart["Avatar"] = 0] = "Avatar";
    BodyPart[BodyPart["Body"] = 1] = "Body";
    BodyPart[BodyPart["Head"] = 2] = "Head";
    BodyPart[BodyPart["LeftArm"] = 3] = "LeftArm";
    BodyPart[BodyPart["LeftFingers"] = 4] = "LeftFingers";
    BodyPart[BodyPart["RightArm"] = 5] = "RightArm";
    BodyPart[BodyPart["RightFingers"] = 6] = "RightFingers";
    BodyPart[BodyPart["LeftLeg"] = 7] = "LeftLeg";
    BodyPart[BodyPart["RightLeg"] = 8] = "RightLeg";
    BodyPart[BodyPart["Last"] = 9] = "Last";
  })(BodyPart = UnityEditor.BodyPart || (UnityEditor.BodyPart = {}));

  var BoneState;

  (function (BoneState) {
    BoneState[BoneState["None"] = 0] = "None";
    BoneState[BoneState["NotFound"] = 1] = "NotFound";
    BoneState[BoneState["Duplicate"] = 2] = "Duplicate";
    BoneState[BoneState["InvalidHierarchy"] = 3] = "InvalidHierarchy";
    BoneState[BoneState["BoneLenghtIsZero"] = 4] = "BoneLenghtIsZero";
    BoneState[BoneState["Valid"] = 5] = "Valid";
  })(BoneState = UnityEditor.BoneState || (UnityEditor.BoneState = {}));

  var PrefabAssetType;

  (function (PrefabAssetType) {
    PrefabAssetType[PrefabAssetType["NotAPrefab"] = 0] = "NotAPrefab";
    PrefabAssetType[PrefabAssetType["Regular"] = 1] = "Regular";
    PrefabAssetType[PrefabAssetType["Model"] = 2] = "Model";
    PrefabAssetType[PrefabAssetType["Variant"] = 3] = "Variant";
    PrefabAssetType[PrefabAssetType["MissingAsset"] = 4] = "MissingAsset";
  })(PrefabAssetType = UnityEditor.PrefabAssetType || (UnityEditor.PrefabAssetType = {}));

  var PrefabInstanceStatus;

  (function (PrefabInstanceStatus) {
    PrefabInstanceStatus[PrefabInstanceStatus["NotAPrefab"] = 0] = "NotAPrefab";
    PrefabInstanceStatus[PrefabInstanceStatus["Connected"] = 1] = "Connected";
    PrefabInstanceStatus[PrefabInstanceStatus["Disconnected"] = 2] = "Disconnected";
    PrefabInstanceStatus[PrefabInstanceStatus["MissingAsset"] = 3] = "MissingAsset";
  })(PrefabInstanceStatus = UnityEditor.PrefabInstanceStatus || (UnityEditor.PrefabInstanceStatus = {}));

  var PrefabUnpackMode;

  (function (PrefabUnpackMode) {
    PrefabUnpackMode[PrefabUnpackMode["OutermostRoot"] = 0] = "OutermostRoot";
    PrefabUnpackMode[PrefabUnpackMode["Completely"] = 1] = "Completely";
  })(PrefabUnpackMode = UnityEditor.PrefabUnpackMode || (UnityEditor.PrefabUnpackMode = {}));

  var PrefabType;

  (function (PrefabType) {
    PrefabType[PrefabType["None"] = 0] = "None";
    PrefabType[PrefabType["Prefab"] = 1] = "Prefab";
    PrefabType[PrefabType["ModelPrefab"] = 2] = "ModelPrefab";
    PrefabType[PrefabType["PrefabInstance"] = 3] = "PrefabInstance";
    PrefabType[PrefabType["ModelPrefabInstance"] = 4] = "ModelPrefabInstance";
    PrefabType[PrefabType["MissingPrefabInstance"] = 5] = "MissingPrefabInstance";
    PrefabType[PrefabType["DisconnectedPrefabInstance"] = 6] = "DisconnectedPrefabInstance";
    PrefabType[PrefabType["DisconnectedModelPrefabInstance"] = 7] = "DisconnectedModelPrefabInstance";
  })(PrefabType = UnityEditor.PrefabType || (UnityEditor.PrefabType = {}));

  var ReplacePrefabOptions;

  (function (ReplacePrefabOptions) {
    ReplacePrefabOptions[ReplacePrefabOptions["Default"] = 0] = "Default";
    ReplacePrefabOptions[ReplacePrefabOptions["ConnectToPrefab"] = 1] = "ConnectToPrefab";
    ReplacePrefabOptions[ReplacePrefabOptions["ReplaceNameBased"] = 2] = "ReplaceNameBased";
  })(ReplacePrefabOptions = UnityEditor.ReplacePrefabOptions || (UnityEditor.ReplacePrefabOptions = {}));

  var SaveType;

  (function (SaveType) {
    SaveType[SaveType["Binary"] = 0] = "Binary";
    SaveType[SaveType["Text"] = 1] = "Text";
  })(SaveType = UnityEditor.SaveType || (UnityEditor.SaveType = {}));

  var Progress_Status;

  (function (Progress_Status) {
    Progress_Status[Progress_Status["Running"] = 0] = "Running";
    Progress_Status[Progress_Status["Succeeded"] = 1] = "Succeeded";
    Progress_Status[Progress_Status["Failed"] = 2] = "Failed";
    Progress_Status[Progress_Status["Canceled"] = 3] = "Canceled";
    Progress_Status[Progress_Status["Paused"] = 4] = "Paused";
  })(Progress_Status = UnityEditor.Progress_Status || (UnityEditor.Progress_Status = {}));

  var Progress_Options;

  (function (Progress_Options) {
    Progress_Options[Progress_Options["None"] = 0] = "None";
    Progress_Options[Progress_Options["Sticky"] = 1] = "Sticky";
    Progress_Options[Progress_Options["Indefinite"] = 2] = "Indefinite";
    Progress_Options[Progress_Options["Synchronous"] = 4] = "Synchronous";
    Progress_Options[Progress_Options["Managed"] = 8] = "Managed";
    Progress_Options[Progress_Options["Unmanaged"] = 16] = "Unmanaged";
  })(Progress_Options = UnityEditor.Progress_Options || (UnityEditor.Progress_Options = {}));

  var Progress_TimeDisplayMode;

  (function (Progress_TimeDisplayMode) {
    Progress_TimeDisplayMode[Progress_TimeDisplayMode["NoTimeShown"] = 0] = "NoTimeShown";
    Progress_TimeDisplayMode[Progress_TimeDisplayMode["ShowRunningTime"] = 1] = "ShowRunningTime";
    Progress_TimeDisplayMode[Progress_TimeDisplayMode["ShowRemainingTime"] = 2] = "ShowRemainingTime";
  })(Progress_TimeDisplayMode = UnityEditor.Progress_TimeDisplayMode || (UnityEditor.Progress_TimeDisplayMode = {}));

  var Progress_Priority;

  (function (Progress_Priority) {
    Progress_Priority[Progress_Priority["Unresponsive"] = 0] = "Unresponsive";
    Progress_Priority[Progress_Priority["Idle"] = 1] = "Idle";
    Progress_Priority[Progress_Priority["Low"] = 2] = "Low";
    Progress_Priority[Progress_Priority["Normal"] = 6] = "Normal";
    Progress_Priority[Progress_Priority["High"] = 10] = "High";
  })(Progress_Priority = UnityEditor.Progress_Priority || (UnityEditor.Progress_Priority = {}));

  var SearchableEditorWindow_SearchMode;

  (function (SearchableEditorWindow_SearchMode) {
    SearchableEditorWindow_SearchMode[SearchableEditorWindow_SearchMode["All"] = 0] = "All";
    SearchableEditorWindow_SearchMode[SearchableEditorWindow_SearchMode["Name"] = 1] = "Name";
    SearchableEditorWindow_SearchMode[SearchableEditorWindow_SearchMode["Type"] = 2] = "Type";
    SearchableEditorWindow_SearchMode[SearchableEditorWindow_SearchMode["Label"] = 3] = "Label";
    SearchableEditorWindow_SearchMode[SearchableEditorWindow_SearchMode["AssetBundleName"] = 4] = "AssetBundleName";
  })(SearchableEditorWindow_SearchMode = UnityEditor.SearchableEditorWindow_SearchMode || (UnityEditor.SearchableEditorWindow_SearchMode = {}));

  var SearchableEditorWindow_SearchModeHierarchyWindow;

  (function (SearchableEditorWindow_SearchModeHierarchyWindow) {
    SearchableEditorWindow_SearchModeHierarchyWindow[SearchableEditorWindow_SearchModeHierarchyWindow["All"] = 0] = "All";
    SearchableEditorWindow_SearchModeHierarchyWindow[SearchableEditorWindow_SearchModeHierarchyWindow["Name"] = 1] = "Name";
    SearchableEditorWindow_SearchModeHierarchyWindow[SearchableEditorWindow_SearchModeHierarchyWindow["Type"] = 2] = "Type";
  })(SearchableEditorWindow_SearchModeHierarchyWindow = UnityEditor.SearchableEditorWindow_SearchModeHierarchyWindow || (UnityEditor.SearchableEditorWindow_SearchModeHierarchyWindow = {}));

  var LightingExplorerTableColumn_DataType;

  (function (LightingExplorerTableColumn_DataType) {
    LightingExplorerTableColumn_DataType[LightingExplorerTableColumn_DataType["Name"] = 0] = "Name";
    LightingExplorerTableColumn_DataType[LightingExplorerTableColumn_DataType["Checkbox"] = 1] = "Checkbox";
    LightingExplorerTableColumn_DataType[LightingExplorerTableColumn_DataType["Enum"] = 2] = "Enum";
    LightingExplorerTableColumn_DataType[LightingExplorerTableColumn_DataType["Int"] = 3] = "Int";
    LightingExplorerTableColumn_DataType[LightingExplorerTableColumn_DataType["Float"] = 4] = "Float";
    LightingExplorerTableColumn_DataType[LightingExplorerTableColumn_DataType["Color"] = 5] = "Color";
    LightingExplorerTableColumn_DataType[LightingExplorerTableColumn_DataType["Custom"] = 20] = "Custom";
  })(LightingExplorerTableColumn_DataType = UnityEditor.LightingExplorerTableColumn_DataType || (UnityEditor.LightingExplorerTableColumn_DataType = {}));

  var SettingsScope;

  (function (SettingsScope) {
    SettingsScope[SettingsScope["User"] = 0] = "User";
    SettingsScope[SettingsScope["Project"] = 1] = "Project";
  })(SettingsScope = UnityEditor.SettingsScope || (UnityEditor.SettingsScope = {}));

  var HighlightSearchMode;

  (function (HighlightSearchMode) {
    HighlightSearchMode[HighlightSearchMode["None"] = 0] = "None";
    HighlightSearchMode[HighlightSearchMode["Auto"] = 1] = "Auto";
    HighlightSearchMode[HighlightSearchMode["Identifier"] = 2] = "Identifier";
    HighlightSearchMode[HighlightSearchMode["PrefixLabel"] = 3] = "PrefixLabel";
    HighlightSearchMode[HighlightSearchMode["Content"] = 4] = "Content";
  })(HighlightSearchMode = UnityEditor.HighlightSearchMode || (UnityEditor.HighlightSearchMode = {}));

  var ObjectChangeKind;

  (function (ObjectChangeKind) {
    ObjectChangeKind[ObjectChangeKind["None"] = 0] = "None";
    ObjectChangeKind[ObjectChangeKind["ChangeScene"] = 1] = "ChangeScene";
    ObjectChangeKind[ObjectChangeKind["CreateGameObjectHierarchy"] = 2] = "CreateGameObjectHierarchy";
    ObjectChangeKind[ObjectChangeKind["ChangeGameObjectStructureHierarchy"] = 3] = "ChangeGameObjectStructureHierarchy";
    ObjectChangeKind[ObjectChangeKind["ChangeGameObjectStructure"] = 4] = "ChangeGameObjectStructure";
    ObjectChangeKind[ObjectChangeKind["ChangeGameObjectParent"] = 5] = "ChangeGameObjectParent";
    ObjectChangeKind[ObjectChangeKind["ChangeGameObjectOrComponentProperties"] = 6] = "ChangeGameObjectOrComponentProperties";
    ObjectChangeKind[ObjectChangeKind["DestroyGameObjectHierarchy"] = 7] = "DestroyGameObjectHierarchy";
    ObjectChangeKind[ObjectChangeKind["CreateAssetObject"] = 8] = "CreateAssetObject";
    ObjectChangeKind[ObjectChangeKind["DestroyAssetObject"] = 9] = "DestroyAssetObject";
    ObjectChangeKind[ObjectChangeKind["ChangeAssetObjectProperties"] = 10] = "ChangeAssetObjectProperties";
    ObjectChangeKind[ObjectChangeKind["UpdatePrefabInstances"] = 11] = "UpdatePrefabInstances";
  })(ObjectChangeKind = UnityEditor.ObjectChangeKind || (UnityEditor.ObjectChangeKind = {}));

  var RemoveAssetOptions;

  (function (RemoveAssetOptions) {
    RemoveAssetOptions[RemoveAssetOptions["MoveAssetToTrash"] = 0] = "MoveAssetToTrash";
    RemoveAssetOptions[RemoveAssetOptions["DeleteAssets"] = 2] = "DeleteAssets";
  })(RemoveAssetOptions = UnityEditor.RemoveAssetOptions || (UnityEditor.RemoveAssetOptions = {}));

  var ImportAssetOptions;

  (function (ImportAssetOptions) {
    ImportAssetOptions[ImportAssetOptions["Default"] = 0] = "Default";
    ImportAssetOptions[ImportAssetOptions["ForceUpdate"] = 1] = "ForceUpdate";
    ImportAssetOptions[ImportAssetOptions["ForceSynchronousImport"] = 8] = "ForceSynchronousImport";
    ImportAssetOptions[ImportAssetOptions["ImportRecursive"] = 256] = "ImportRecursive";
    ImportAssetOptions[ImportAssetOptions["DontDownloadFromCacheServer"] = 8192] = "DontDownloadFromCacheServer";
    ImportAssetOptions[ImportAssetOptions["ForceUncompressedImport"] = 16384] = "ForceUncompressedImport";
  })(ImportAssetOptions = UnityEditor.ImportAssetOptions || (UnityEditor.ImportAssetOptions = {}));

  var StatusQueryOptions;

  (function (StatusQueryOptions) {
    StatusQueryOptions[StatusQueryOptions["ForceUpdate"] = 0] = "ForceUpdate";
    StatusQueryOptions[StatusQueryOptions["UseCachedIfPossible"] = 1] = "UseCachedIfPossible";
    StatusQueryOptions[StatusQueryOptions["UseCachedAsync"] = 2] = "UseCachedAsync";
  })(StatusQueryOptions = UnityEditor.StatusQueryOptions || (UnityEditor.StatusQueryOptions = {}));

  var ForceReserializeAssetsOptions;

  (function (ForceReserializeAssetsOptions) {
    ForceReserializeAssetsOptions[ForceReserializeAssetsOptions["ReserializeAssets"] = 1] = "ReserializeAssets";
    ForceReserializeAssetsOptions[ForceReserializeAssetsOptions["ReserializeMetadata"] = 2] = "ReserializeMetadata";
    ForceReserializeAssetsOptions[ForceReserializeAssetsOptions["ReserializeAssetsAndMetadata"] = 3] = "ReserializeAssetsAndMetadata";
  })(ForceReserializeAssetsOptions = UnityEditor.ForceReserializeAssetsOptions || (UnityEditor.ForceReserializeAssetsOptions = {}));

  var AudioImporterFormat;

  (function (AudioImporterFormat) {
    AudioImporterFormat[AudioImporterFormat["Native"] = -1] = "Native";
    AudioImporterFormat[AudioImporterFormat["Compressed"] = 0] = "Compressed";
  })(AudioImporterFormat = UnityEditor.AudioImporterFormat || (UnityEditor.AudioImporterFormat = {}));

  var AudioImporterLoadType;

  (function (AudioImporterLoadType) {
    AudioImporterLoadType[AudioImporterLoadType["DecompressOnLoad"] = -1] = "DecompressOnLoad";
    AudioImporterLoadType[AudioImporterLoadType["CompressedInMemory"] = -1] = "CompressedInMemory";
    AudioImporterLoadType[AudioImporterLoadType["StreamFromDisc"] = -1] = "StreamFromDisc";
  })(AudioImporterLoadType = UnityEditor.AudioImporterLoadType || (UnityEditor.AudioImporterLoadType = {}));

  var AudioImporterChannels;

  (function (AudioImporterChannels) {
    AudioImporterChannels[AudioImporterChannels["Automatic"] = 0] = "Automatic";
    AudioImporterChannels[AudioImporterChannels["Mono"] = 1] = "Mono";
    AudioImporterChannels[AudioImporterChannels["Stereo"] = 2] = "Stereo";
  })(AudioImporterChannels = UnityEditor.AudioImporterChannels || (UnityEditor.AudioImporterChannels = {}));

  var AudioSampleRateSetting;

  (function (AudioSampleRateSetting) {
    AudioSampleRateSetting[AudioSampleRateSetting["PreserveSampleRate"] = 0] = "PreserveSampleRate";
    AudioSampleRateSetting[AudioSampleRateSetting["OptimizeSampleRate"] = 1] = "OptimizeSampleRate";
    AudioSampleRateSetting[AudioSampleRateSetting["OverrideSampleRate"] = 2] = "OverrideSampleRate";
  })(AudioSampleRateSetting = UnityEditor.AudioSampleRateSetting || (UnityEditor.AudioSampleRateSetting = {}));

  var VideoCodec;

  (function (VideoCodec) {
    VideoCodec[VideoCodec["Auto"] = 0] = "Auto";
    VideoCodec[VideoCodec["H264"] = 1] = "H264";
    VideoCodec[VideoCodec["H265"] = 3] = "H265";
    VideoCodec[VideoCodec["VP8"] = 2] = "VP8";
  })(VideoCodec = UnityEditor.VideoCodec || (UnityEditor.VideoCodec = {}));

  var VideoBitrateMode;

  (function (VideoBitrateMode) {
    VideoBitrateMode[VideoBitrateMode["Low"] = 0] = "Low";
    VideoBitrateMode[VideoBitrateMode["Medium"] = 1] = "Medium";
    VideoBitrateMode[VideoBitrateMode["High"] = 2] = "High";
  })(VideoBitrateMode = UnityEditor.VideoBitrateMode || (UnityEditor.VideoBitrateMode = {}));

  var VideoDeinterlaceMode;

  (function (VideoDeinterlaceMode) {
    VideoDeinterlaceMode[VideoDeinterlaceMode["Off"] = 0] = "Off";
    VideoDeinterlaceMode[VideoDeinterlaceMode["Even"] = 1] = "Even";
    VideoDeinterlaceMode[VideoDeinterlaceMode["Odd"] = 2] = "Odd";
  })(VideoDeinterlaceMode = UnityEditor.VideoDeinterlaceMode || (UnityEditor.VideoDeinterlaceMode = {}));

  var VideoResizeMode;

  (function (VideoResizeMode) {
    VideoResizeMode[VideoResizeMode["OriginalSize"] = 0] = "OriginalSize";
    VideoResizeMode[VideoResizeMode["ThreeQuarterRes"] = 1] = "ThreeQuarterRes";
    VideoResizeMode[VideoResizeMode["HalfRes"] = 2] = "HalfRes";
    VideoResizeMode[VideoResizeMode["QuarterRes"] = 3] = "QuarterRes";
    VideoResizeMode[VideoResizeMode["Square1024"] = 4] = "Square1024";
    VideoResizeMode[VideoResizeMode["Square512"] = 5] = "Square512";
    VideoResizeMode[VideoResizeMode["Square256"] = 6] = "Square256";
    VideoResizeMode[VideoResizeMode["CustomSize"] = 7] = "CustomSize";
  })(VideoResizeMode = UnityEditor.VideoResizeMode || (UnityEditor.VideoResizeMode = {}));

  var VideoSpatialQuality;

  (function (VideoSpatialQuality) {
    VideoSpatialQuality[VideoSpatialQuality["LowSpatialQuality"] = 0] = "LowSpatialQuality";
    VideoSpatialQuality[VideoSpatialQuality["MediumSpatialQuality"] = 1] = "MediumSpatialQuality";
    VideoSpatialQuality[VideoSpatialQuality["HighSpatialQuality"] = 2] = "HighSpatialQuality";
  })(VideoSpatialQuality = UnityEditor.VideoSpatialQuality || (UnityEditor.VideoSpatialQuality = {}));

  var VideoEncodeAspectRatio;

  (function (VideoEncodeAspectRatio) {
    VideoEncodeAspectRatio[VideoEncodeAspectRatio["NoScaling"] = 0] = "NoScaling";
    VideoEncodeAspectRatio[VideoEncodeAspectRatio["Stretch"] = 5] = "Stretch";
  })(VideoEncodeAspectRatio = UnityEditor.VideoEncodeAspectRatio || (UnityEditor.VideoEncodeAspectRatio = {}));

  var MeshOptimizationFlags;

  (function (MeshOptimizationFlags) {
    MeshOptimizationFlags[MeshOptimizationFlags["PolygonOrder"] = 1] = "PolygonOrder";
    MeshOptimizationFlags[MeshOptimizationFlags["VertexOrder"] = 2] = "VertexOrder";
    MeshOptimizationFlags[MeshOptimizationFlags["Everything"] = -1] = "Everything";
  })(MeshOptimizationFlags = UnityEditor.MeshOptimizationFlags || (UnityEditor.MeshOptimizationFlags = {}));

  var ClipAnimationMaskType;

  (function (ClipAnimationMaskType) {
    ClipAnimationMaskType[ClipAnimationMaskType["CreateFromThisModel"] = 0] = "CreateFromThisModel";
    ClipAnimationMaskType[ClipAnimationMaskType["CopyFromOther"] = 1] = "CopyFromOther";
    ClipAnimationMaskType[ClipAnimationMaskType["None"] = 3] = "None";
  })(ClipAnimationMaskType = UnityEditor.ClipAnimationMaskType || (UnityEditor.ClipAnimationMaskType = {}));

  var ModelImporterGenerateMaterials;

  (function (ModelImporterGenerateMaterials) {
    ModelImporterGenerateMaterials[ModelImporterGenerateMaterials["None"] = 0] = "None";
    ModelImporterGenerateMaterials[ModelImporterGenerateMaterials["PerTexture"] = 1] = "PerTexture";
    ModelImporterGenerateMaterials[ModelImporterGenerateMaterials["PerSourceMaterial"] = 2] = "PerSourceMaterial";
  })(ModelImporterGenerateMaterials = UnityEditor.ModelImporterGenerateMaterials || (UnityEditor.ModelImporterGenerateMaterials = {}));

  var ModelImporterMaterialName;

  (function (ModelImporterMaterialName) {
    ModelImporterMaterialName[ModelImporterMaterialName["BasedOnTextureName"] = 0] = "BasedOnTextureName";
    ModelImporterMaterialName[ModelImporterMaterialName["BasedOnMaterialName"] = 1] = "BasedOnMaterialName";
    ModelImporterMaterialName[ModelImporterMaterialName["BasedOnModelNameAndMaterialName"] = 2] = "BasedOnModelNameAndMaterialName";
    ModelImporterMaterialName[ModelImporterMaterialName["BasedOnTextureName_Or_ModelNameAndMaterialName"] = 3] = "BasedOnTextureName_Or_ModelNameAndMaterialName";
  })(ModelImporterMaterialName = UnityEditor.ModelImporterMaterialName || (UnityEditor.ModelImporterMaterialName = {}));

  var ModelImporterMaterialSearch;

  (function (ModelImporterMaterialSearch) {
    ModelImporterMaterialSearch[ModelImporterMaterialSearch["Local"] = 0] = "Local";
    ModelImporterMaterialSearch[ModelImporterMaterialSearch["RecursiveUp"] = 1] = "RecursiveUp";
    ModelImporterMaterialSearch[ModelImporterMaterialSearch["Everywhere"] = 2] = "Everywhere";
  })(ModelImporterMaterialSearch = UnityEditor.ModelImporterMaterialSearch || (UnityEditor.ModelImporterMaterialSearch = {}));

  var ModelImporterMaterialLocation;

  (function (ModelImporterMaterialLocation) {
    ModelImporterMaterialLocation[ModelImporterMaterialLocation["External"] = 0] = "External";
    ModelImporterMaterialLocation[ModelImporterMaterialLocation["InPrefab"] = 1] = "InPrefab";
  })(ModelImporterMaterialLocation = UnityEditor.ModelImporterMaterialLocation || (UnityEditor.ModelImporterMaterialLocation = {}));

  var ModelImporterMaterialImportMode;

  (function (ModelImporterMaterialImportMode) {
    ModelImporterMaterialImportMode[ModelImporterMaterialImportMode["None"] = 0] = "None";
    ModelImporterMaterialImportMode[ModelImporterMaterialImportMode["ImportStandard"] = 1] = "ImportStandard";
    ModelImporterMaterialImportMode[ModelImporterMaterialImportMode["ImportViaMaterialDescription"] = 2] = "ImportViaMaterialDescription";
    ModelImporterMaterialImportMode[ModelImporterMaterialImportMode["LegacyImport"] = 1] = "LegacyImport";
    ModelImporterMaterialImportMode[ModelImporterMaterialImportMode["Import"] = 2] = "Import";
  })(ModelImporterMaterialImportMode = UnityEditor.ModelImporterMaterialImportMode || (UnityEditor.ModelImporterMaterialImportMode = {}));

  var ModelImporterTangentSpaceMode;

  (function (ModelImporterTangentSpaceMode) {
    ModelImporterTangentSpaceMode[ModelImporterTangentSpaceMode["Import"] = 0] = "Import";
    ModelImporterTangentSpaceMode[ModelImporterTangentSpaceMode["Calculate"] = 1] = "Calculate";
    ModelImporterTangentSpaceMode[ModelImporterTangentSpaceMode["None"] = 2] = "None";
  })(ModelImporterTangentSpaceMode = UnityEditor.ModelImporterTangentSpaceMode || (UnityEditor.ModelImporterTangentSpaceMode = {}));

  var ModelImporterNormals;

  (function (ModelImporterNormals) {
    ModelImporterNormals[ModelImporterNormals["Import"] = 0] = "Import";
    ModelImporterNormals[ModelImporterNormals["Calculate"] = 1] = "Calculate";
    ModelImporterNormals[ModelImporterNormals["None"] = 2] = "None";
  })(ModelImporterNormals = UnityEditor.ModelImporterNormals || (UnityEditor.ModelImporterNormals = {}));

  var ModelImporterNormalCalculationMode;

  (function (ModelImporterNormalCalculationMode) {
    ModelImporterNormalCalculationMode[ModelImporterNormalCalculationMode["Unweighted_Legacy"] = 0] = "Unweighted_Legacy";
    ModelImporterNormalCalculationMode[ModelImporterNormalCalculationMode["Unweighted"] = 1] = "Unweighted";
    ModelImporterNormalCalculationMode[ModelImporterNormalCalculationMode["AreaWeighted"] = 2] = "AreaWeighted";
    ModelImporterNormalCalculationMode[ModelImporterNormalCalculationMode["AngleWeighted"] = 3] = "AngleWeighted";
    ModelImporterNormalCalculationMode[ModelImporterNormalCalculationMode["AreaAndAngleWeighted"] = 4] = "AreaAndAngleWeighted";
  })(ModelImporterNormalCalculationMode = UnityEditor.ModelImporterNormalCalculationMode || (UnityEditor.ModelImporterNormalCalculationMode = {}));

  var ModelImporterNormalSmoothingSource;

  (function (ModelImporterNormalSmoothingSource) {
    ModelImporterNormalSmoothingSource[ModelImporterNormalSmoothingSource["PreferSmoothingGroups"] = 0] = "PreferSmoothingGroups";
    ModelImporterNormalSmoothingSource[ModelImporterNormalSmoothingSource["FromSmoothingGroups"] = 1] = "FromSmoothingGroups";
    ModelImporterNormalSmoothingSource[ModelImporterNormalSmoothingSource["FromAngle"] = 2] = "FromAngle";
    ModelImporterNormalSmoothingSource[ModelImporterNormalSmoothingSource["None"] = 3] = "None";
  })(ModelImporterNormalSmoothingSource = UnityEditor.ModelImporterNormalSmoothingSource || (UnityEditor.ModelImporterNormalSmoothingSource = {}));

  var ModelImporterTangents;

  (function (ModelImporterTangents) {
    ModelImporterTangents[ModelImporterTangents["Import"] = 0] = "Import";
    ModelImporterTangents[ModelImporterTangents["CalculateLegacy"] = 1] = "CalculateLegacy";
    ModelImporterTangents[ModelImporterTangents["CalculateLegacyWithSplitTangents"] = 4] = "CalculateLegacyWithSplitTangents";
    ModelImporterTangents[ModelImporterTangents["CalculateMikk"] = 3] = "CalculateMikk";
    ModelImporterTangents[ModelImporterTangents["None"] = 2] = "None";
  })(ModelImporterTangents = UnityEditor.ModelImporterTangents || (UnityEditor.ModelImporterTangents = {}));

  var ModelImporterMeshCompression;

  (function (ModelImporterMeshCompression) {
    ModelImporterMeshCompression[ModelImporterMeshCompression["Off"] = 0] = "Off";
    ModelImporterMeshCompression[ModelImporterMeshCompression["Low"] = 1] = "Low";
    ModelImporterMeshCompression[ModelImporterMeshCompression["Medium"] = 2] = "Medium";
    ModelImporterMeshCompression[ModelImporterMeshCompression["High"] = 3] = "High";
  })(ModelImporterMeshCompression = UnityEditor.ModelImporterMeshCompression || (UnityEditor.ModelImporterMeshCompression = {}));

  var ModelImporterIndexFormat;

  (function (ModelImporterIndexFormat) {
    ModelImporterIndexFormat[ModelImporterIndexFormat["Auto"] = 0] = "Auto";
    ModelImporterIndexFormat[ModelImporterIndexFormat["UInt16"] = 1] = "UInt16";
    ModelImporterIndexFormat[ModelImporterIndexFormat["UInt32"] = 2] = "UInt32";
  })(ModelImporterIndexFormat = UnityEditor.ModelImporterIndexFormat || (UnityEditor.ModelImporterIndexFormat = {}));

  var ModelImporterAnimationCompression;

  (function (ModelImporterAnimationCompression) {
    ModelImporterAnimationCompression[ModelImporterAnimationCompression["Off"] = 0] = "Off";
    ModelImporterAnimationCompression[ModelImporterAnimationCompression["KeyframeReduction"] = 1] = "KeyframeReduction";
    ModelImporterAnimationCompression[ModelImporterAnimationCompression["KeyframeReductionAndCompression"] = 2] = "KeyframeReductionAndCompression";
    ModelImporterAnimationCompression[ModelImporterAnimationCompression["Optimal"] = 3] = "Optimal";
  })(ModelImporterAnimationCompression = UnityEditor.ModelImporterAnimationCompression || (UnityEditor.ModelImporterAnimationCompression = {}));

  var ModelImporterGenerateAnimations;

  (function (ModelImporterGenerateAnimations) {
    ModelImporterGenerateAnimations[ModelImporterGenerateAnimations["None"] = 0] = "None";
    ModelImporterGenerateAnimations[ModelImporterGenerateAnimations["GenerateAnimations"] = 4] = "GenerateAnimations";
    ModelImporterGenerateAnimations[ModelImporterGenerateAnimations["InRoot"] = 3] = "InRoot";
    ModelImporterGenerateAnimations[ModelImporterGenerateAnimations["InOriginalRoots"] = 1] = "InOriginalRoots";
    ModelImporterGenerateAnimations[ModelImporterGenerateAnimations["InNodes"] = 2] = "InNodes";
  })(ModelImporterGenerateAnimations = UnityEditor.ModelImporterGenerateAnimations || (UnityEditor.ModelImporterGenerateAnimations = {}));

  var ModelImporterAnimationType;

  (function (ModelImporterAnimationType) {
    ModelImporterAnimationType[ModelImporterAnimationType["None"] = 0] = "None";
    ModelImporterAnimationType[ModelImporterAnimationType["Legacy"] = 1] = "Legacy";
    ModelImporterAnimationType[ModelImporterAnimationType["Generic"] = 2] = "Generic";
    ModelImporterAnimationType[ModelImporterAnimationType["Human"] = 3] = "Human";
  })(ModelImporterAnimationType = UnityEditor.ModelImporterAnimationType || (UnityEditor.ModelImporterAnimationType = {}));

  var ModelImporterHumanoidOversampling;

  (function (ModelImporterHumanoidOversampling) {
    ModelImporterHumanoidOversampling[ModelImporterHumanoidOversampling["X1"] = 1] = "X1";
    ModelImporterHumanoidOversampling[ModelImporterHumanoidOversampling["X2"] = 2] = "X2";
    ModelImporterHumanoidOversampling[ModelImporterHumanoidOversampling["X4"] = 4] = "X4";
    ModelImporterHumanoidOversampling[ModelImporterHumanoidOversampling["X8"] = 8] = "X8";
  })(ModelImporterHumanoidOversampling = UnityEditor.ModelImporterHumanoidOversampling || (UnityEditor.ModelImporterHumanoidOversampling = {}));

  var ModelImporterSecondaryUVMarginMethod;

  (function (ModelImporterSecondaryUVMarginMethod) {
    ModelImporterSecondaryUVMarginMethod[ModelImporterSecondaryUVMarginMethod["Manual"] = 0] = "Manual";
    ModelImporterSecondaryUVMarginMethod[ModelImporterSecondaryUVMarginMethod["Calculate"] = 1] = "Calculate";
  })(ModelImporterSecondaryUVMarginMethod = UnityEditor.ModelImporterSecondaryUVMarginMethod || (UnityEditor.ModelImporterSecondaryUVMarginMethod = {}));

  var ModelImporterAvatarSetup;

  (function (ModelImporterAvatarSetup) {
    ModelImporterAvatarSetup[ModelImporterAvatarSetup["NoAvatar"] = 0] = "NoAvatar";
    ModelImporterAvatarSetup[ModelImporterAvatarSetup["CreateFromThisModel"] = 1] = "CreateFromThisModel";
    ModelImporterAvatarSetup[ModelImporterAvatarSetup["CopyFromOther"] = 2] = "CopyFromOther";
  })(ModelImporterAvatarSetup = UnityEditor.ModelImporterAvatarSetup || (UnityEditor.ModelImporterAvatarSetup = {}));

  var ModelImporterSkinWeights;

  (function (ModelImporterSkinWeights) {
    ModelImporterSkinWeights[ModelImporterSkinWeights["Standard"] = 0] = "Standard";
    ModelImporterSkinWeights[ModelImporterSkinWeights["Custom"] = 1] = "Custom";
  })(ModelImporterSkinWeights = UnityEditor.ModelImporterSkinWeights || (UnityEditor.ModelImporterSkinWeights = {}));

  var PhysicsVisualizationSettings_FilterWorkflow;

  (function (PhysicsVisualizationSettings_FilterWorkflow) {
    PhysicsVisualizationSettings_FilterWorkflow[PhysicsVisualizationSettings_FilterWorkflow["HideSelectedItems"] = 0] = "HideSelectedItems";
    PhysicsVisualizationSettings_FilterWorkflow[PhysicsVisualizationSettings_FilterWorkflow["ShowSelectedItems"] = 1] = "ShowSelectedItems";
  })(PhysicsVisualizationSettings_FilterWorkflow = UnityEditor.PhysicsVisualizationSettings_FilterWorkflow || (UnityEditor.PhysicsVisualizationSettings_FilterWorkflow = {}));

  var PhysicsVisualizationSettings_MeshColliderType;

  (function (PhysicsVisualizationSettings_MeshColliderType) {
    PhysicsVisualizationSettings_MeshColliderType[PhysicsVisualizationSettings_MeshColliderType["Convex"] = 0] = "Convex";
    PhysicsVisualizationSettings_MeshColliderType[PhysicsVisualizationSettings_MeshColliderType["NonConvex"] = 1] = "NonConvex";
  })(PhysicsVisualizationSettings_MeshColliderType = UnityEditor.PhysicsVisualizationSettings_MeshColliderType || (UnityEditor.PhysicsVisualizationSettings_MeshColliderType = {}));

  var NetworkDetailStats_NetworkDirection;

  (function (NetworkDetailStats_NetworkDirection) {
    NetworkDetailStats_NetworkDirection[NetworkDetailStats_NetworkDirection["Incoming"] = 0] = "Incoming";
    NetworkDetailStats_NetworkDirection[NetworkDetailStats_NetworkDirection["Outgoing"] = 1] = "Outgoing";
  })(NetworkDetailStats_NetworkDirection = UnityEditor.NetworkDetailStats_NetworkDirection || (UnityEditor.NetworkDetailStats_NetworkDirection = {}));

  var FontTextureCase;

  (function (FontTextureCase) {
    FontTextureCase[FontTextureCase["Dynamic"] = -2] = "Dynamic";
    FontTextureCase[FontTextureCase["Unicode"] = -1] = "Unicode";
    FontTextureCase[FontTextureCase["ASCII"] = 0] = "ASCII";
    FontTextureCase[FontTextureCase["ASCIIUpperCase"] = 1] = "ASCIIUpperCase";
    FontTextureCase[FontTextureCase["ASCIILowerCase"] = 2] = "ASCIILowerCase";
    FontTextureCase[FontTextureCase["CustomSet"] = 3] = "CustomSet";
  })(FontTextureCase = UnityEditor.FontTextureCase || (UnityEditor.FontTextureCase = {}));

  var FontRenderingMode;

  (function (FontRenderingMode) {
    FontRenderingMode[FontRenderingMode["Smooth"] = 0] = "Smooth";
    FontRenderingMode[FontRenderingMode["HintedSmooth"] = 1] = "HintedSmooth";
    FontRenderingMode[FontRenderingMode["HintedRaster"] = 2] = "HintedRaster";
    FontRenderingMode[FontRenderingMode["OSDefault"] = 3] = "OSDefault";
  })(FontRenderingMode = UnityEditor.FontRenderingMode || (UnityEditor.FontRenderingMode = {}));

  var AscentCalculationMode;

  (function (AscentCalculationMode) {
    AscentCalculationMode[AscentCalculationMode["Legacy2x"] = 0] = "Legacy2x";
    AscentCalculationMode[AscentCalculationMode["FaceAscender"] = 1] = "FaceAscender";
    AscentCalculationMode[AscentCalculationMode["FaceBoundingBox"] = 2] = "FaceBoundingBox";
  })(AscentCalculationMode = UnityEditor.AscentCalculationMode || (UnityEditor.AscentCalculationMode = {}));

  var GridPalette_CellSizing;

  (function (GridPalette_CellSizing) {
    GridPalette_CellSizing[GridPalette_CellSizing["Automatic"] = 0] = "Automatic";
    GridPalette_CellSizing[GridPalette_CellSizing["Manual"] = 100] = "Manual";
  })(GridPalette_CellSizing = UnityEditor.GridPalette_CellSizing || (UnityEditor.GridPalette_CellSizing = {}));

  var Advertisements;

  (function (Advertisements) {})(Advertisements = UnityEditor.Advertisements || (UnityEditor.Advertisements = {}));

  var AI;

  (function (AI) {})(AI = UnityEditor.AI || (UnityEditor.AI = {}));

  var Analytics;

  (function (Analytics) {})(Analytics = UnityEditor.Analytics || (UnityEditor.Analytics = {}));

  var AnimatedValues;

  (function (AnimatedValues) {})(AnimatedValues = UnityEditor.AnimatedValues || (UnityEditor.AnimatedValues = {}));

  var Animations;

  (function (Animations) {
    var AnimatorLayerBlendingMode;

    (function (AnimatorLayerBlendingMode) {
      AnimatorLayerBlendingMode[AnimatorLayerBlendingMode["Override"] = 0] = "Override";
      AnimatorLayerBlendingMode[AnimatorLayerBlendingMode["Additive"] = 1] = "Additive";
    })(AnimatorLayerBlendingMode = Animations.AnimatorLayerBlendingMode || (Animations.AnimatorLayerBlendingMode = {}));

    var BlendTreeType;

    (function (BlendTreeType) {
      BlendTreeType[BlendTreeType["Simple1D"] = 0] = "Simple1D";
      BlendTreeType[BlendTreeType["SimpleDirectional2D"] = 1] = "SimpleDirectional2D";
      BlendTreeType[BlendTreeType["FreeformDirectional2D"] = 2] = "FreeformDirectional2D";
      BlendTreeType[BlendTreeType["FreeformCartesian2D"] = 3] = "FreeformCartesian2D";
      BlendTreeType[BlendTreeType["Direct"] = 4] = "Direct";
    })(BlendTreeType = Animations.BlendTreeType || (Animations.BlendTreeType = {}));

    var AnimatorConditionMode;

    (function (AnimatorConditionMode) {
      AnimatorConditionMode[AnimatorConditionMode["If"] = 1] = "If";
      AnimatorConditionMode[AnimatorConditionMode["IfNot"] = 2] = "IfNot";
      AnimatorConditionMode[AnimatorConditionMode["Greater"] = 3] = "Greater";
      AnimatorConditionMode[AnimatorConditionMode["Less"] = 4] = "Less";
      AnimatorConditionMode[AnimatorConditionMode["Equals"] = 6] = "Equals";
      AnimatorConditionMode[AnimatorConditionMode["NotEqual"] = 7] = "NotEqual";
    })(AnimatorConditionMode = Animations.AnimatorConditionMode || (Animations.AnimatorConditionMode = {}));

    var TransitionInterruptionSource;

    (function (TransitionInterruptionSource) {
      TransitionInterruptionSource[TransitionInterruptionSource["None"] = 0] = "None";
      TransitionInterruptionSource[TransitionInterruptionSource["Source"] = 1] = "Source";
      TransitionInterruptionSource[TransitionInterruptionSource["Destination"] = 2] = "Destination";
      TransitionInterruptionSource[TransitionInterruptionSource["SourceThenDestination"] = 3] = "SourceThenDestination";
      TransitionInterruptionSource[TransitionInterruptionSource["DestinationThenSource"] = 4] = "DestinationThenSource";
    })(TransitionInterruptionSource = Animations.TransitionInterruptionSource || (Animations.TransitionInterruptionSource = {}));
  })(Animations = UnityEditor.Animations || (UnityEditor.Animations = {}));

  var AssetImporters;

  (function (AssetImporters) {})(AssetImporters = UnityEditor.AssetImporters || (UnityEditor.AssetImporters = {}));

  var Audio;

  (function (Audio) {})(Audio = UnityEditor.Audio || (UnityEditor.Audio = {}));

  var Build;

  (function (Build) {
    var Content;

    (function (Content) {
      var ContentBuildFlags;

      (function (ContentBuildFlags) {
        ContentBuildFlags[ContentBuildFlags["None"] = 0] = "None";
        ContentBuildFlags[ContentBuildFlags["DisableWriteTypeTree"] = 1] = "DisableWriteTypeTree";
        ContentBuildFlags[ContentBuildFlags["StripUnityVersion"] = 2] = "StripUnityVersion";
        ContentBuildFlags[ContentBuildFlags["DevelopmentBuild"] = 4] = "DevelopmentBuild";
      })(ContentBuildFlags = Content.ContentBuildFlags || (Content.ContentBuildFlags = {}));

      var DependencyType;

      (function (DependencyType) {
        DependencyType[DependencyType["RecursiveOperation"] = 1] = "RecursiveOperation";
        DependencyType[DependencyType["MissingReferences"] = 2] = "MissingReferences";
        DependencyType[DependencyType["ValidReferences"] = 4] = "ValidReferences";
        DependencyType[DependencyType["DefaultDependencies"] = 5] = "DefaultDependencies";
      })(DependencyType = Content.DependencyType || (Content.DependencyType = {}));

      var CompressionType;

      (function (CompressionType) {
        CompressionType[CompressionType["None"] = 0] = "None";
        CompressionType[CompressionType["Lzma"] = 1] = "Lzma";
        CompressionType[CompressionType["Lz4"] = 2] = "Lz4";
        CompressionType[CompressionType["Lz4HC"] = 3] = "Lz4HC";
      })(CompressionType = Content.CompressionType || (Content.CompressionType = {}));

      var CompressionLevel;

      (function (CompressionLevel) {
        CompressionLevel[CompressionLevel["None"] = 0] = "None";
        CompressionLevel[CompressionLevel["Fastest"] = 1] = "Fastest";
        CompressionLevel[CompressionLevel["Fast"] = 2] = "Fast";
        CompressionLevel[CompressionLevel["Normal"] = 3] = "Normal";
        CompressionLevel[CompressionLevel["High"] = 4] = "High";
        CompressionLevel[CompressionLevel["Maximum"] = 5] = "Maximum";
      })(CompressionLevel = Content.CompressionLevel || (Content.CompressionLevel = {}));

      var ProfileEventType;

      (function (ProfileEventType) {
        ProfileEventType[ProfileEventType["Begin"] = 0] = "Begin";
        ProfileEventType[ProfileEventType["End"] = 1] = "End";
        ProfileEventType[ProfileEventType["Info"] = 2] = "Info";
      })(ProfileEventType = Content.ProfileEventType || (Content.ProfileEventType = {}));

      var ProfileCaptureOptions;

      (function (ProfileCaptureOptions) {
        ProfileCaptureOptions[ProfileCaptureOptions["None"] = 0] = "None";
        ProfileCaptureOptions[ProfileCaptureOptions["IgnoreShortEvents"] = 1] = "IgnoreShortEvents";
      })(ProfileCaptureOptions = Content.ProfileCaptureOptions || (Content.ProfileCaptureOptions = {}));

      var FileType;

      (function (FileType) {
        FileType[FileType["NonAssetType"] = 0] = "NonAssetType";
        FileType[FileType["DeprecatedCachedAssetType"] = 1] = "DeprecatedCachedAssetType";
        FileType[FileType["SerializedAssetType"] = 2] = "SerializedAssetType";
        FileType[FileType["MetaAssetType"] = 3] = "MetaAssetType";
      })(FileType = Content.FileType || (Content.FileType = {}));
    })(Content = Build.Content || (Build.Content = {}));

    var Player;

    (function (Player) {
      var ScriptCompilationOptions;

      (function (ScriptCompilationOptions) {
        ScriptCompilationOptions[ScriptCompilationOptions["None"] = 0] = "None";
        ScriptCompilationOptions[ScriptCompilationOptions["DevelopmentBuild"] = 1] = "DevelopmentBuild";
        ScriptCompilationOptions[ScriptCompilationOptions["Assertions"] = 2] = "Assertions";
      })(ScriptCompilationOptions = Player.ScriptCompilationOptions || (Player.ScriptCompilationOptions = {}));
    })(Player = Build.Player || (Build.Player = {}));

    var Reporting;

    (function (Reporting) {
      var BuildResult;

      (function (BuildResult) {
        BuildResult[BuildResult["Unknown"] = 0] = "Unknown";
        BuildResult[BuildResult["Succeeded"] = 1] = "Succeeded";
        BuildResult[BuildResult["Failed"] = 2] = "Failed";
        BuildResult[BuildResult["Cancelled"] = 3] = "Cancelled";
      })(BuildResult = Reporting.BuildResult || (Reporting.BuildResult = {}));
    })(Reporting = Build.Reporting || (Build.Reporting = {}));
  })(Build = UnityEditor.Build || (UnityEditor.Build = {}));

  var Compilation;

  (function (Compilation) {
    var CompilationPipeline_PrecompiledAssemblySources;

    (function (CompilationPipeline_PrecompiledAssemblySources) {
      CompilationPipeline_PrecompiledAssemblySources[CompilationPipeline_PrecompiledAssemblySources["UserAssembly"] = 1] = "UserAssembly";
      CompilationPipeline_PrecompiledAssemblySources[CompilationPipeline_PrecompiledAssemblySources["UnityEngine"] = 2] = "UnityEngine";
      CompilationPipeline_PrecompiledAssemblySources[CompilationPipeline_PrecompiledAssemblySources["UnityEditor"] = 4] = "UnityEditor";
      CompilationPipeline_PrecompiledAssemblySources[CompilationPipeline_PrecompiledAssemblySources["SystemAssembly"] = 8] = "SystemAssembly";
      CompilationPipeline_PrecompiledAssemblySources[CompilationPipeline_PrecompiledAssemblySources["UnityAssembly"] = 16] = "UnityAssembly";
      CompilationPipeline_PrecompiledAssemblySources[CompilationPipeline_PrecompiledAssemblySources["All"] = -1] = "All";
    })(CompilationPipeline_PrecompiledAssemblySources = Compilation.CompilationPipeline_PrecompiledAssemblySources || (Compilation.CompilationPipeline_PrecompiledAssemblySources = {}));

    var AssemblyBuilderStatus;

    (function (AssemblyBuilderStatus) {
      AssemblyBuilderStatus[AssemblyBuilderStatus["NotStarted"] = 0] = "NotStarted";
      AssemblyBuilderStatus[AssemblyBuilderStatus["IsCompiling"] = 1] = "IsCompiling";
      AssemblyBuilderStatus[AssemblyBuilderStatus["Finished"] = 2] = "Finished";
    })(AssemblyBuilderStatus = Compilation.AssemblyBuilderStatus || (Compilation.AssemblyBuilderStatus = {}));

    var AssemblyBuilderFlags;

    (function (AssemblyBuilderFlags) {
      AssemblyBuilderFlags[AssemblyBuilderFlags["None"] = 0] = "None";
      AssemblyBuilderFlags[AssemblyBuilderFlags["EditorAssembly"] = 1] = "EditorAssembly";
      AssemblyBuilderFlags[AssemblyBuilderFlags["DevelopmentBuild"] = 2] = "DevelopmentBuild";
    })(AssemblyBuilderFlags = Compilation.AssemblyBuilderFlags || (Compilation.AssemblyBuilderFlags = {}));

    var ReferencesOptions;

    (function (ReferencesOptions) {
      ReferencesOptions[ReferencesOptions["None"] = 0] = "None";
      ReferencesOptions[ReferencesOptions["UseEngineModules"] = 1] = "UseEngineModules";
    })(ReferencesOptions = Compilation.ReferencesOptions || (Compilation.ReferencesOptions = {}));

    var AssemblyFlags;

    (function (AssemblyFlags) {
      AssemblyFlags[AssemblyFlags["None"] = 0] = "None";
      AssemblyFlags[AssemblyFlags["EditorAssembly"] = 1] = "EditorAssembly";
    })(AssemblyFlags = Compilation.AssemblyFlags || (Compilation.AssemblyFlags = {}));

    var AssembliesType;

    (function (AssembliesType) {
      AssembliesType[AssembliesType["Editor"] = 0] = "Editor";
      AssembliesType[AssembliesType["Player"] = 1] = "Player";
      AssembliesType[AssembliesType["PlayerWithoutTestAssemblies"] = 2] = "PlayerWithoutTestAssemblies";
    })(AssembliesType = Compilation.AssembliesType || (Compilation.AssembliesType = {}));

    var AssemblyDefinitionReferenceType;

    (function (AssemblyDefinitionReferenceType) {
      AssemblyDefinitionReferenceType[AssemblyDefinitionReferenceType["Name"] = 0] = "Name";
      AssemblyDefinitionReferenceType[AssemblyDefinitionReferenceType["Guid"] = 1] = "Guid";
    })(AssemblyDefinitionReferenceType = Compilation.AssemblyDefinitionReferenceType || (Compilation.AssemblyDefinitionReferenceType = {}));

    var CodeOptimization;

    (function (CodeOptimization) {
      CodeOptimization[CodeOptimization["None"] = 0] = "None";
      CodeOptimization[CodeOptimization["Debug"] = 1] = "Debug";
      CodeOptimization[CodeOptimization["Release"] = 2] = "Release";
    })(CodeOptimization = Compilation.CodeOptimization || (Compilation.CodeOptimization = {}));

    var CompilerMessageType;

    (function (CompilerMessageType) {
      CompilerMessageType[CompilerMessageType["Error"] = 0] = "Error";
      CompilerMessageType[CompilerMessageType["Warning"] = 1] = "Warning";
    })(CompilerMessageType = Compilation.CompilerMessageType || (Compilation.CompilerMessageType = {}));
  })(Compilation = UnityEditor.Compilation || (UnityEditor.Compilation = {}));

  var Connect;

  (function (Connect) {})(Connect = UnityEditor.Connect || (UnityEditor.Connect = {}));

  var CrashReporting;

  (function (CrashReporting) {})(CrashReporting = UnityEditor.CrashReporting || (UnityEditor.CrashReporting = {}));

  var EditorTools;

  (function (EditorTools_1) {})(EditorTools = UnityEditor.EditorTools || (UnityEditor.EditorTools = {}));

  var Events;

  (function (Events) {})(Events = UnityEditor.Events || (UnityEditor.Events = {}));

  var Experimental;

  (function (Experimental) {
    var AssetDatabaseExperimental_OnDemandMode;

    (function (AssetDatabaseExperimental_OnDemandMode) {
      AssetDatabaseExperimental_OnDemandMode[AssetDatabaseExperimental_OnDemandMode["Off"] = 0] = "Off";
      AssetDatabaseExperimental_OnDemandMode[AssetDatabaseExperimental_OnDemandMode["Lazy"] = 1] = "Lazy";
      AssetDatabaseExperimental_OnDemandMode[AssetDatabaseExperimental_OnDemandMode["Background"] = 2] = "Background";
    })(AssetDatabaseExperimental_OnDemandMode = Experimental.AssetDatabaseExperimental_OnDemandMode || (Experimental.AssetDatabaseExperimental_OnDemandMode = {}));

    var AssetDatabaseExperimental_ImportSyncMode;

    (function (AssetDatabaseExperimental_ImportSyncMode) {
      AssetDatabaseExperimental_ImportSyncMode[AssetDatabaseExperimental_ImportSyncMode["Block"] = 0] = "Block";
      AssetDatabaseExperimental_ImportSyncMode[AssetDatabaseExperimental_ImportSyncMode["Queue"] = 1] = "Queue";
      AssetDatabaseExperimental_ImportSyncMode[AssetDatabaseExperimental_ImportSyncMode["Poll"] = 2] = "Poll";
    })(AssetDatabaseExperimental_ImportSyncMode = Experimental.AssetDatabaseExperimental_ImportSyncMode || (Experimental.AssetDatabaseExperimental_ImportSyncMode = {}));

    var OnDemandState;

    (function (OnDemandState) {
      OnDemandState[OnDemandState["Unavailable"] = 0] = "Unavailable";
      OnDemandState[OnDemandState["Processing"] = 1] = "Processing";
      OnDemandState[OnDemandState["Downloading"] = 2] = "Downloading";
      OnDemandState[OnDemandState["Available"] = 3] = "Available";
      OnDemandState[OnDemandState["Failed"] = 4] = "Failed";
    })(OnDemandState = Experimental.OnDemandState || (Experimental.OnDemandState = {}));

    var Build;

    (function (Build) {
      var AssetBundle;

      (function (AssetBundle) {
        var CompressionType;

        (function (CompressionType) {
          CompressionType[CompressionType["None"] = 0] = "None";
          CompressionType[CompressionType["Lzma"] = 1] = "Lzma";
          CompressionType[CompressionType["Lz4"] = 2] = "Lz4";
          CompressionType[CompressionType["Lz4HC"] = 3] = "Lz4HC";
        })(CompressionType = AssetBundle.CompressionType || (AssetBundle.CompressionType = {}));

        var CompressionLevel;

        (function (CompressionLevel) {
          CompressionLevel[CompressionLevel["None"] = 0] = "None";
          CompressionLevel[CompressionLevel["Fastest"] = 1] = "Fastest";
          CompressionLevel[CompressionLevel["Fast"] = 2] = "Fast";
          CompressionLevel[CompressionLevel["Normal"] = 3] = "Normal";
          CompressionLevel[CompressionLevel["High"] = 4] = "High";
          CompressionLevel[CompressionLevel["Maximum"] = 5] = "Maximum";
        })(CompressionLevel = AssetBundle.CompressionLevel || (AssetBundle.CompressionLevel = {}));
      })(AssetBundle = Build.AssetBundle || (Build.AssetBundle = {}));
    })(Build = Experimental.Build || (Experimental.Build = {}));

    var Licensing;

    (function (Licensing) {})(Licensing = Experimental.Licensing || (Experimental.Licensing = {}));

    var Rendering;

    (function (Rendering) {})(Rendering = Experimental.Rendering || (Experimental.Rendering = {}));

    var RestService;

    (function (RestService) {})(RestService = Experimental.RestService || (Experimental.RestService = {}));

    var SceneManagement;

    (function (SceneManagement) {
      var PrefabStage_Mode;

      (function (PrefabStage_Mode) {
        PrefabStage_Mode[PrefabStage_Mode["InIsolation"] = 0] = "InIsolation";
        PrefabStage_Mode[PrefabStage_Mode["InContext"] = 1] = "InContext";
      })(PrefabStage_Mode = SceneManagement.PrefabStage_Mode || (SceneManagement.PrefabStage_Mode = {}));
    })(SceneManagement = Experimental.SceneManagement || (Experimental.SceneManagement = {}));

    var TerrainAPI;

    (function (TerrainAPI) {
      var BrushGUIEditFlags;

      (function (BrushGUIEditFlags) {
        BrushGUIEditFlags[BrushGUIEditFlags["Select"] = 1] = "Select";
        BrushGUIEditFlags[BrushGUIEditFlags["Inspect"] = 2] = "Inspect";
        BrushGUIEditFlags[BrushGUIEditFlags["Size"] = 4] = "Size";
        BrushGUIEditFlags[BrushGUIEditFlags["Opacity"] = 8] = "Opacity";
        BrushGUIEditFlags[BrushGUIEditFlags["SelectAndInspect"] = 3] = "SelectAndInspect";
        BrushGUIEditFlags[BrushGUIEditFlags["All"] = 15] = "All";
      })(BrushGUIEditFlags = TerrainAPI.BrushGUIEditFlags || (TerrainAPI.BrushGUIEditFlags = {}));

      var RepaintFlags;

      (function (RepaintFlags) {
        RepaintFlags[RepaintFlags["UI"] = 1] = "UI";
        RepaintFlags[RepaintFlags["Scene"] = 2] = "Scene";
      })(RepaintFlags = TerrainAPI.RepaintFlags || (TerrainAPI.RepaintFlags = {}));

      var TerrainPaintUtilityEditor_BrushPreview;

      (function (TerrainPaintUtilityEditor_BrushPreview) {
        TerrainPaintUtilityEditor_BrushPreview[TerrainPaintUtilityEditor_BrushPreview["SourceRenderTexture"] = 0] = "SourceRenderTexture";
        TerrainPaintUtilityEditor_BrushPreview[TerrainPaintUtilityEditor_BrushPreview["DestinationRenderTexture"] = 1] = "DestinationRenderTexture";
      })(TerrainPaintUtilityEditor_BrushPreview = TerrainAPI.TerrainPaintUtilityEditor_BrushPreview || (TerrainAPI.TerrainPaintUtilityEditor_BrushPreview = {}));
    })(TerrainAPI = Experimental.TerrainAPI || (Experimental.TerrainAPI = {}));
  })(Experimental = UnityEditor.Experimental || (UnityEditor.Experimental = {}));

  var Hardware;

  (function (Hardware) {
    var DevDeviceState;

    (function (DevDeviceState) {
      DevDeviceState[DevDeviceState["Disconnected"] = 0] = "Disconnected";
      DevDeviceState[DevDeviceState["Connected"] = 1] = "Connected";
    })(DevDeviceState = Hardware.DevDeviceState || (Hardware.DevDeviceState = {}));

    var DevDeviceFeatures;

    (function (DevDeviceFeatures) {
      DevDeviceFeatures[DevDeviceFeatures["None"] = 0] = "None";
      DevDeviceFeatures[DevDeviceFeatures["PlayerConnection"] = 1] = "PlayerConnection";
      DevDeviceFeatures[DevDeviceFeatures["RemoteConnection"] = 2] = "RemoteConnection";
    })(DevDeviceFeatures = Hardware.DevDeviceFeatures || (Hardware.DevDeviceFeatures = {}));
  })(Hardware = UnityEditor.Hardware || (UnityEditor.Hardware = {}));

  var Il2Cpp;

  (function (Il2Cpp) {})(Il2Cpp = UnityEditor.Il2Cpp || (UnityEditor.Il2Cpp = {}));

  var IMGUI;

  (function (IMGUI) {
    var Controls;

    (function (Controls) {
      var CapsuleBoundsHandle_HeightAxis;

      (function (CapsuleBoundsHandle_HeightAxis) {
        CapsuleBoundsHandle_HeightAxis[CapsuleBoundsHandle_HeightAxis["X"] = 0] = "X";
        CapsuleBoundsHandle_HeightAxis[CapsuleBoundsHandle_HeightAxis["Y"] = 1] = "Y";
        CapsuleBoundsHandle_HeightAxis[CapsuleBoundsHandle_HeightAxis["Z"] = 2] = "Z";
      })(CapsuleBoundsHandle_HeightAxis = Controls.CapsuleBoundsHandle_HeightAxis || (Controls.CapsuleBoundsHandle_HeightAxis = {}));

      var PrimitiveBoundsHandle_Axes;

      (function (PrimitiveBoundsHandle_Axes) {
        PrimitiveBoundsHandle_Axes[PrimitiveBoundsHandle_Axes["None"] = 0] = "None";
        PrimitiveBoundsHandle_Axes[PrimitiveBoundsHandle_Axes["X"] = 1] = "X";
        PrimitiveBoundsHandle_Axes[PrimitiveBoundsHandle_Axes["Y"] = 2] = "Y";
        PrimitiveBoundsHandle_Axes[PrimitiveBoundsHandle_Axes["Z"] = 4] = "Z";
        PrimitiveBoundsHandle_Axes[PrimitiveBoundsHandle_Axes["All"] = 7] = "All";
      })(PrimitiveBoundsHandle_Axes = Controls.PrimitiveBoundsHandle_Axes || (Controls.PrimitiveBoundsHandle_Axes = {}));

      var TreeViewSelectionOptions;

      (function (TreeViewSelectionOptions) {
        TreeViewSelectionOptions[TreeViewSelectionOptions["None"] = 0] = "None";
        TreeViewSelectionOptions[TreeViewSelectionOptions["FireSelectionChanged"] = 1] = "FireSelectionChanged";
        TreeViewSelectionOptions[TreeViewSelectionOptions["RevealAndFrame"] = 2] = "RevealAndFrame";
      })(TreeViewSelectionOptions = Controls.TreeViewSelectionOptions || (Controls.TreeViewSelectionOptions = {}));
    })(Controls = IMGUI.Controls || (IMGUI.Controls = {}));
  })(IMGUI = UnityEditor.IMGUI || (UnityEditor.IMGUI = {}));

  var Localization;

  (function (Localization_1) {
    var Editor;

    (function (Editor) {})(Editor = Localization_1.Editor || (Localization_1.Editor = {}));
  })(Localization = UnityEditor.Localization || (UnityEditor.Localization = {}));

  var Macros;

  (function (Macros) {})(Macros = UnityEditor.Macros || (UnityEditor.Macros = {}));

  var Media;

  (function (Media) {})(Media = UnityEditor.Media || (UnityEditor.Media = {}));

  var MemoryProfiler;

  (function (MemoryProfiler) {
    var PackedNativeUnityEngineObject_ObjectFlags;

    (function (PackedNativeUnityEngineObject_ObjectFlags) {
      PackedNativeUnityEngineObject_ObjectFlags[PackedNativeUnityEngineObject_ObjectFlags["IsDontDestroyOnLoad"] = 1] = "IsDontDestroyOnLoad";
      PackedNativeUnityEngineObject_ObjectFlags[PackedNativeUnityEngineObject_ObjectFlags["IsPersistent"] = 2] = "IsPersistent";
      PackedNativeUnityEngineObject_ObjectFlags[PackedNativeUnityEngineObject_ObjectFlags["IsManager"] = 4] = "IsManager";
    })(PackedNativeUnityEngineObject_ObjectFlags = MemoryProfiler.PackedNativeUnityEngineObject_ObjectFlags || (MemoryProfiler.PackedNativeUnityEngineObject_ObjectFlags = {}));

    var TypeDescription_TypeFlags;

    (function (TypeDescription_TypeFlags) {
      TypeDescription_TypeFlags[TypeDescription_TypeFlags["kNone"] = 0] = "kNone";
      TypeDescription_TypeFlags[TypeDescription_TypeFlags["kValueType"] = 1] = "kValueType";
      TypeDescription_TypeFlags[TypeDescription_TypeFlags["kArray"] = 2] = "kArray";
      TypeDescription_TypeFlags[TypeDescription_TypeFlags["kArrayRankMask"] = -65536] = "kArrayRankMask";
    })(TypeDescription_TypeFlags = MemoryProfiler.TypeDescription_TypeFlags || (MemoryProfiler.TypeDescription_TypeFlags = {}));
  })(MemoryProfiler = UnityEditor.MemoryProfiler || (UnityEditor.MemoryProfiler = {}));

  var MPE;

  (function (MPE) {
    var EventDataSerialization;

    (function (EventDataSerialization) {
      EventDataSerialization[EventDataSerialization["StandardJson"] = 0] = "StandardJson";
      EventDataSerialization[EventDataSerialization["JsonUtility"] = 1] = "JsonUtility";
    })(EventDataSerialization = MPE.EventDataSerialization || (MPE.EventDataSerialization = {}));

    var ProcessEvent;

    (function (ProcessEvent) {
      ProcessEvent[ProcessEvent["UMP_EVENT_UNDEFINED"] = 0] = "UMP_EVENT_UNDEFINED";
      ProcessEvent[ProcessEvent["Undefined"] = 0] = "Undefined";
      ProcessEvent[ProcessEvent["UMP_EVENT_CREATE"] = 1] = "UMP_EVENT_CREATE";
      ProcessEvent[ProcessEvent["Create"] = 1] = "Create";
      ProcessEvent[ProcessEvent["UMP_EVENT_INITIALIZE"] = 2] = "UMP_EVENT_INITIALIZE";
      ProcessEvent[ProcessEvent["Initialize"] = 2] = "Initialize";
      ProcessEvent[ProcessEvent["UMP_EVENT_AFTER_DOMAIN_RELOAD"] = 3] = "UMP_EVENT_AFTER_DOMAIN_RELOAD";
      ProcessEvent[ProcessEvent["AfterDomainReload"] = 3] = "AfterDomainReload";
      ProcessEvent[ProcessEvent["UMP_EVENT_SHUTDOWN"] = 4] = "UMP_EVENT_SHUTDOWN";
      ProcessEvent[ProcessEvent["Shutdown"] = 4] = "Shutdown";
    })(ProcessEvent = MPE.ProcessEvent || (MPE.ProcessEvent = {}));

    var ProcessLevel;

    (function (ProcessLevel) {
      ProcessLevel[ProcessLevel["UMP_UNDEFINED"] = 0] = "UMP_UNDEFINED";
      ProcessLevel[ProcessLevel["Undefined"] = 0] = "Undefined";
      ProcessLevel[ProcessLevel["UMP_MASTER"] = 1] = "UMP_MASTER";
      ProcessLevel[ProcessLevel["Master"] = 1] = "Master";
      ProcessLevel[ProcessLevel["UMP_SLAVE"] = 2] = "UMP_SLAVE";
      ProcessLevel[ProcessLevel["Slave"] = 2] = "Slave";
    })(ProcessLevel = MPE.ProcessLevel || (MPE.ProcessLevel = {}));

    var ProcessState;

    (function (ProcessState) {
      ProcessState[ProcessState["UMP_UNKNOWN_PROCESS"] = 0] = "UMP_UNKNOWN_PROCESS";
      ProcessState[ProcessState["UnknownProcess"] = 0] = "UnknownProcess";
      ProcessState[ProcessState["UMP_FINISHED_SUCCESSFULLY"] = 1] = "UMP_FINISHED_SUCCESSFULLY";
      ProcessState[ProcessState["FinishedSuccessfully"] = 1] = "FinishedSuccessfully";
      ProcessState[ProcessState["UMP_FINISHED_WITH_ERROR"] = 2] = "UMP_FINISHED_WITH_ERROR";
      ProcessState[ProcessState["FinishedWithError"] = 2] = "FinishedWithError";
      ProcessState[ProcessState["UMP_RUNNING"] = 3] = "UMP_RUNNING";
      ProcessState[ProcessState["Running"] = 3] = "Running";
    })(ProcessState = MPE.ProcessState || (MPE.ProcessState = {}));
  })(MPE = UnityEditor.MPE || (UnityEditor.MPE = {}));

  var Networking;

  (function (Networking) {
    var PlayerConnection;

    (function (PlayerConnection) {})(PlayerConnection = Networking.PlayerConnection || (Networking.PlayerConnection = {}));
  })(Networking = UnityEditor.Networking || (UnityEditor.Networking = {}));

  var PackageManager;

  (function (PackageManager) {
    var ErrorCode;

    (function (ErrorCode) {
      ErrorCode[ErrorCode["Unknown"] = 0] = "Unknown";
      ErrorCode[ErrorCode["NotFound"] = 1] = "NotFound";
      ErrorCode[ErrorCode["Forbidden"] = 2] = "Forbidden";
      ErrorCode[ErrorCode["InvalidParameter"] = 3] = "InvalidParameter";
      ErrorCode[ErrorCode["Conflict"] = 4] = "Conflict";
    })(ErrorCode = PackageManager.ErrorCode || (PackageManager.ErrorCode = {}));

    var LogLevel;

    (function (LogLevel) {
      LogLevel[LogLevel["Error"] = 0] = "Error";
      LogLevel[LogLevel["Warn"] = 1] = "Warn";
      LogLevel[LogLevel["Info"] = 2] = "Info";
      LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
      LogLevel[LogLevel["Debug"] = 4] = "Debug";
      LogLevel[LogLevel["Silly"] = 5] = "Silly";
    })(LogLevel = PackageManager.LogLevel || (PackageManager.LogLevel = {}));

    var PackageSource;

    (function (PackageSource) {
      PackageSource[PackageSource["Unknown"] = 0] = "Unknown";
      PackageSource[PackageSource["Registry"] = 1] = "Registry";
      PackageSource[PackageSource["BuiltIn"] = 2] = "BuiltIn";
      PackageSource[PackageSource["Embedded"] = 3] = "Embedded";
      PackageSource[PackageSource["Local"] = 4] = "Local";
      PackageSource[PackageSource["Git"] = 5] = "Git";
      PackageSource[PackageSource["LocalTarball"] = 6] = "LocalTarball";
    })(PackageSource = PackageManager.PackageSource || (PackageManager.PackageSource = {}));

    var PackageStatus;

    (function (PackageStatus) {
      PackageStatus[PackageStatus["Unknown"] = 0] = "Unknown";
      PackageStatus[PackageStatus["Unavailable"] = 1] = "Unavailable";
      PackageStatus[PackageStatus["InProgress"] = 2] = "InProgress";
      PackageStatus[PackageStatus["Error"] = 3] = "Error";
      PackageStatus[PackageStatus["Available"] = 4] = "Available";
    })(PackageStatus = PackageManager.PackageStatus || (PackageManager.PackageStatus = {}));

    var StatusCode;

    (function (StatusCode) {
      StatusCode[StatusCode["InProgress"] = 0] = "InProgress";
      StatusCode[StatusCode["Success"] = 1] = "Success";
      StatusCode[StatusCode["Failure"] = 2] = "Failure";
    })(StatusCode = PackageManager.StatusCode || (PackageManager.StatusCode = {}));

    var Requests;

    (function (Requests) {})(Requests = PackageManager.Requests || (PackageManager.Requests = {}));
  })(PackageManager = UnityEditor.PackageManager || (UnityEditor.PackageManager = {}));

  var Playables;

  (function (Playables) {})(Playables = UnityEditor.Playables || (UnityEditor.Playables = {}));

  var Presets;

  (function (Presets) {})(Presets = UnityEditor.Presets || (UnityEditor.Presets = {}));

  var Profiling;

  (function (Profiling) {
    var HierarchyFrameDataView_ViewModes;

    (function (HierarchyFrameDataView_ViewModes) {
      HierarchyFrameDataView_ViewModes[HierarchyFrameDataView_ViewModes["Default"] = 0] = "Default";
      HierarchyFrameDataView_ViewModes[HierarchyFrameDataView_ViewModes["MergeSamplesWithTheSameName"] = 1] = "MergeSamplesWithTheSameName";
      HierarchyFrameDataView_ViewModes[HierarchyFrameDataView_ViewModes["HideEditorOnlySamples"] = 2] = "HideEditorOnlySamples";
    })(HierarchyFrameDataView_ViewModes = Profiling.HierarchyFrameDataView_ViewModes || (Profiling.HierarchyFrameDataView_ViewModes = {}));

    var Memory;

    (function (Memory) {
      var Experimental;

      (function (Experimental) {
        var ObjectFlags;

        (function (ObjectFlags) {
          ObjectFlags[ObjectFlags["IsDontDestroyOnLoad"] = 1] = "IsDontDestroyOnLoad";
          ObjectFlags[ObjectFlags["IsPersistent"] = 2] = "IsPersistent";
          ObjectFlags[ObjectFlags["IsManager"] = 4] = "IsManager";
        })(ObjectFlags = Experimental.ObjectFlags || (Experimental.ObjectFlags = {}));

        var TypeFlags;

        (function (TypeFlags) {
          TypeFlags[TypeFlags["kNone"] = 0] = "kNone";
          TypeFlags[TypeFlags["kValueType"] = 1] = "kValueType";
          TypeFlags[TypeFlags["kArray"] = 2] = "kArray";
          TypeFlags[TypeFlags["kArrayRankMask"] = -65536] = "kArrayRankMask";
        })(TypeFlags = Experimental.TypeFlags || (Experimental.TypeFlags = {}));
      })(Experimental = Memory.Experimental || (Memory.Experimental = {}));
    })(Memory = Profiling.Memory || (Profiling.Memory = {}));
  })(Profiling = UnityEditor.Profiling || (UnityEditor.Profiling = {}));

  var ProjectWindowCallback;

  (function (ProjectWindowCallback) {})(ProjectWindowCallback = UnityEditor.ProjectWindowCallback || (UnityEditor.ProjectWindowCallback = {}));

  var Purchasing;

  (function (Purchasing) {})(Purchasing = UnityEditor.Purchasing || (UnityEditor.Purchasing = {}));

  var Rendering;

  (function (Rendering) {
    var ShaderQuality;

    (function (ShaderQuality) {
      ShaderQuality[ShaderQuality["Low"] = 0] = "Low";
      ShaderQuality[ShaderQuality["Medium"] = 1] = "Medium";
      ShaderQuality[ShaderQuality["High"] = 2] = "High";
    })(ShaderQuality = Rendering.ShaderQuality || (Rendering.ShaderQuality = {}));

    var ShaderCompilerPlatform;

    (function (ShaderCompilerPlatform) {
      ShaderCompilerPlatform[ShaderCompilerPlatform["None"] = 0] = "None";
      ShaderCompilerPlatform[ShaderCompilerPlatform["D3D"] = 4] = "D3D";
      ShaderCompilerPlatform[ShaderCompilerPlatform["GLES20"] = 5] = "GLES20";
      ShaderCompilerPlatform[ShaderCompilerPlatform["GLES3x"] = 9] = "GLES3x";
      ShaderCompilerPlatform[ShaderCompilerPlatform["PS4"] = 11] = "PS4";
      ShaderCompilerPlatform[ShaderCompilerPlatform["XboxOneD3D11"] = 12] = "XboxOneD3D11";
      ShaderCompilerPlatform[ShaderCompilerPlatform["Metal"] = 14] = "Metal";
      ShaderCompilerPlatform[ShaderCompilerPlatform["OpenGLCore"] = 15] = "OpenGLCore";
      ShaderCompilerPlatform[ShaderCompilerPlatform["Vulkan"] = 18] = "Vulkan";
      ShaderCompilerPlatform[ShaderCompilerPlatform["Switch"] = 19] = "Switch";
      ShaderCompilerPlatform[ShaderCompilerPlatform["XboxOneD3D12"] = 20] = "XboxOneD3D12";
    })(ShaderCompilerPlatform = Rendering.ShaderCompilerPlatform || (Rendering.ShaderCompilerPlatform = {}));

    var ShaderCompilerMessageSeverity;

    (function (ShaderCompilerMessageSeverity) {
      ShaderCompilerMessageSeverity[ShaderCompilerMessageSeverity["Error"] = 0] = "Error";
      ShaderCompilerMessageSeverity[ShaderCompilerMessageSeverity["Warning"] = 1] = "Warning";
    })(ShaderCompilerMessageSeverity = Rendering.ShaderCompilerMessageSeverity || (Rendering.ShaderCompilerMessageSeverity = {}));

    var ShaderRequirements;

    (function (ShaderRequirements) {
      ShaderRequirements[ShaderRequirements["None"] = 0] = "None";
      ShaderRequirements[ShaderRequirements["BaseShaders"] = 1] = "BaseShaders";
      ShaderRequirements[ShaderRequirements["Interpolators10"] = 2] = "Interpolators10";
      ShaderRequirements[ShaderRequirements["Interpolators32"] = 4] = "Interpolators32";
      ShaderRequirements[ShaderRequirements["MRT4"] = 8] = "MRT4";
      ShaderRequirements[ShaderRequirements["MRT8"] = 16] = "MRT8";
      ShaderRequirements[ShaderRequirements["Derivatives"] = 32] = "Derivatives";
      ShaderRequirements[ShaderRequirements["SampleLOD"] = 64] = "SampleLOD";
      ShaderRequirements[ShaderRequirements["FragCoord"] = 128] = "FragCoord";
      ShaderRequirements[ShaderRequirements["Interpolators15Integers"] = 512] = "Interpolators15Integers";
      ShaderRequirements[ShaderRequirements["Texture2DArray"] = 1024] = "Texture2DArray";
      ShaderRequirements[ShaderRequirements["Instancing"] = 2048] = "Instancing";
      ShaderRequirements[ShaderRequirements["Geometry"] = 4096] = "Geometry";
      ShaderRequirements[ShaderRequirements["CubeArray"] = 8192] = "CubeArray";
      ShaderRequirements[ShaderRequirements["Compute"] = 16384] = "Compute";
      ShaderRequirements[ShaderRequirements["RandomWrite"] = 32768] = "RandomWrite";
      ShaderRequirements[ShaderRequirements["TessellationCompute"] = 65536] = "TessellationCompute";
      ShaderRequirements[ShaderRequirements["TessellationShaders"] = 131072] = "TessellationShaders";
      ShaderRequirements[ShaderRequirements["SparseTexelResident"] = 262144] = "SparseTexelResident";
      ShaderRequirements[ShaderRequirements["FramebufferFetch"] = 524288] = "FramebufferFetch";
      ShaderRequirements[ShaderRequirements["MSAATextureSamples"] = 1048576] = "MSAATextureSamples";
    })(ShaderRequirements = Rendering.ShaderRequirements || (Rendering.ShaderRequirements = {}));

    var ShaderType;

    (function (ShaderType) {
      ShaderType[ShaderType["Vertex"] = 1] = "Vertex";
      ShaderType[ShaderType["Fragment"] = 2] = "Fragment";
      ShaderType[ShaderType["Geometry"] = 3] = "Geometry";
      ShaderType[ShaderType["Hull"] = 4] = "Hull";
      ShaderType[ShaderType["Domain"] = 5] = "Domain";
      ShaderType[ShaderType["Surface"] = 6] = "Surface";
      ShaderType[ShaderType["RayTracing"] = 7] = "RayTracing";
      ShaderType[ShaderType["Count"] = 7] = "Count";
    })(ShaderType = Rendering.ShaderType || (Rendering.ShaderType = {}));
  })(Rendering = UnityEditor.Rendering || (UnityEditor.Rendering = {}));

  var SceneManagement;

  (function (SceneManagement) {
    var OpenSceneMode;

    (function (OpenSceneMode) {
      OpenSceneMode[OpenSceneMode["Single"] = 0] = "Single";
      OpenSceneMode[OpenSceneMode["Additive"] = 1] = "Additive";
      OpenSceneMode[OpenSceneMode["AdditiveWithoutLoading"] = 2] = "AdditiveWithoutLoading";
    })(OpenSceneMode = SceneManagement.OpenSceneMode || (SceneManagement.OpenSceneMode = {}));

    var NewSceneMode;

    (function (NewSceneMode) {
      NewSceneMode[NewSceneMode["Single"] = 0] = "Single";
      NewSceneMode[NewSceneMode["Additive"] = 1] = "Additive";
    })(NewSceneMode = SceneManagement.NewSceneMode || (SceneManagement.NewSceneMode = {}));

    var NewSceneSetup;

    (function (NewSceneSetup) {
      NewSceneSetup[NewSceneSetup["EmptyScene"] = 0] = "EmptyScene";
      NewSceneSetup[NewSceneSetup["DefaultGameObjects"] = 1] = "DefaultGameObjects";
    })(NewSceneSetup = SceneManagement.NewSceneSetup || (SceneManagement.NewSceneSetup = {}));
  })(SceneManagement = UnityEditor.SceneManagement || (UnityEditor.SceneManagement = {}));

  var Scripting;

  (function (Scripting) {})(Scripting = UnityEditor.Scripting || (UnityEditor.Scripting = {}));

  var SearchService;

  (function (SearchService) {
    var VisibleObjects;

    (function (VisibleObjects) {
      VisibleObjects[VisibleObjects["None"] = 0] = "None";
      VisibleObjects[VisibleObjects["Assets"] = 1] = "Assets";
      VisibleObjects[VisibleObjects["Scene"] = 2] = "Scene";
      VisibleObjects[VisibleObjects["All"] = 3] = "All";
    })(VisibleObjects = SearchService.VisibleObjects || (SearchService.VisibleObjects = {}));

    var SearchEngineScope;

    (function (SearchEngineScope) {
      SearchEngineScope[SearchEngineScope["Scene"] = 0] = "Scene";
      SearchEngineScope[SearchEngineScope["Project"] = 1] = "Project";
      SearchEngineScope[SearchEngineScope["ObjectSelector"] = 2] = "ObjectSelector";
    })(SearchEngineScope = SearchService.SearchEngineScope || (SearchService.SearchEngineScope = {}));
  })(SearchService = UnityEditor.SearchService || (UnityEditor.SearchService = {}));

  var ShortcutManagement;

  (function (ShortcutManagement) {
    var ShortcutStage;

    (function (ShortcutStage) {
      ShortcutStage[ShortcutStage["Begin"] = 0] = "Begin";
      ShortcutStage[ShortcutStage["End"] = 1] = "End";
    })(ShortcutStage = ShortcutManagement.ShortcutStage || (ShortcutManagement.ShortcutStage = {}));

    var ShortcutModifiers;

    (function (ShortcutModifiers) {
      ShortcutModifiers[ShortcutModifiers["None"] = 0] = "None";
      ShortcutModifiers[ShortcutModifiers["Alt"] = 1] = "Alt";
      ShortcutModifiers[ShortcutModifiers["Action"] = 2] = "Action";
      ShortcutModifiers[ShortcutModifiers["Shift"] = 4] = "Shift";
    })(ShortcutModifiers = ShortcutManagement.ShortcutModifiers || (ShortcutManagement.ShortcutModifiers = {}));
  })(ShortcutManagement = UnityEditor.ShortcutManagement || (UnityEditor.ShortcutManagement = {}));

  var Sprites;

  (function (Sprites) {
    var Packer_Execution;

    (function (Packer_Execution) {
      Packer_Execution[Packer_Execution["Normal"] = 0] = "Normal";
      Packer_Execution[Packer_Execution["ForceRegroup"] = 1] = "ForceRegroup";
    })(Packer_Execution = Sprites.Packer_Execution || (Sprites.Packer_Execution = {}));
  })(Sprites = UnityEditor.Sprites || (UnityEditor.Sprites = {}));

  var U2D;

  (function (U2D) {})(U2D = UnityEditor.U2D || (UnityEditor.U2D = {}));

  var UIElements;

  (function (UIElements) {})(UIElements = UnityEditor.UIElements || (UnityEditor.UIElements = {}));

  var UnityLinker;

  (function (UnityLinker) {})(UnityLinker = UnityEditor.UnityLinker || (UnityEditor.UnityLinker = {}));

  var VersionControl;

  (function (VersionControl) {
    var Asset_States;

    (function (Asset_States) {
      Asset_States[Asset_States["None"] = 0] = "None";
      Asset_States[Asset_States["Local"] = 1] = "Local";
      Asset_States[Asset_States["Synced"] = 2] = "Synced";
      Asset_States[Asset_States["OutOfSync"] = 4] = "OutOfSync";
      Asset_States[Asset_States["Missing"] = 8] = "Missing";
      Asset_States[Asset_States["CheckedOutLocal"] = 16] = "CheckedOutLocal";
      Asset_States[Asset_States["CheckedOutRemote"] = 32] = "CheckedOutRemote";
      Asset_States[Asset_States["DeletedLocal"] = 64] = "DeletedLocal";
      Asset_States[Asset_States["DeletedRemote"] = 128] = "DeletedRemote";
      Asset_States[Asset_States["AddedLocal"] = 256] = "AddedLocal";
      Asset_States[Asset_States["AddedRemote"] = 512] = "AddedRemote";
      Asset_States[Asset_States["Conflicted"] = 1024] = "Conflicted";
      Asset_States[Asset_States["LockedLocal"] = 2048] = "LockedLocal";
      Asset_States[Asset_States["LockedRemote"] = 4096] = "LockedRemote";
      Asset_States[Asset_States["Updating"] = 8192] = "Updating";
      Asset_States[Asset_States["ReadOnly"] = 16384] = "ReadOnly";
      Asset_States[Asset_States["MetaFile"] = 32768] = "MetaFile";
      Asset_States[Asset_States["MovedLocal"] = 65536] = "MovedLocal";
      Asset_States[Asset_States["MovedRemote"] = 131072] = "MovedRemote";
      Asset_States[Asset_States["Unversioned"] = 262144] = "Unversioned";
      Asset_States[Asset_States["Exclusive"] = 524288] = "Exclusive";
    })(Asset_States = VersionControl.Asset_States || (VersionControl.Asset_States = {}));

    var Message_Severity;

    (function (Message_Severity) {
      Message_Severity[Message_Severity["Data"] = 0] = "Data";
      Message_Severity[Message_Severity["Verbose"] = 1] = "Verbose";
      Message_Severity[Message_Severity["Info"] = 2] = "Info";
      Message_Severity[Message_Severity["Warning"] = 3] = "Warning";
      Message_Severity[Message_Severity["Error"] = 4] = "Error";
    })(Message_Severity = VersionControl.Message_Severity || (VersionControl.Message_Severity = {}));

    var CompletionAction;

    (function (CompletionAction) {
      CompletionAction[CompletionAction["UpdatePendingWindow"] = 1] = "UpdatePendingWindow";
      CompletionAction[CompletionAction["OnChangeContentsPendingWindow"] = 2] = "OnChangeContentsPendingWindow";
      CompletionAction[CompletionAction["OnIncomingPendingWindow"] = 3] = "OnIncomingPendingWindow";
      CompletionAction[CompletionAction["OnChangeSetsPendingWindow"] = 4] = "OnChangeSetsPendingWindow";
      CompletionAction[CompletionAction["OnGotLatestPendingWindow"] = 5] = "OnGotLatestPendingWindow";
      CompletionAction[CompletionAction["OnSubmittedChangeWindow"] = 6] = "OnSubmittedChangeWindow";
      CompletionAction[CompletionAction["OnAddedChangeWindow"] = 7] = "OnAddedChangeWindow";
      CompletionAction[CompletionAction["OnCheckoutCompleted"] = 8] = "OnCheckoutCompleted";
    })(CompletionAction = VersionControl.CompletionAction || (VersionControl.CompletionAction = {}));

    var SubmitResult;

    (function (SubmitResult) {
      SubmitResult[SubmitResult["OK"] = 1] = "OK";
      SubmitResult[SubmitResult["Error"] = 2] = "Error";
      SubmitResult[SubmitResult["ConflictingFiles"] = 4] = "ConflictingFiles";
      SubmitResult[SubmitResult["UnaddedFiles"] = 8] = "UnaddedFiles";
    })(SubmitResult = VersionControl.SubmitResult || (VersionControl.SubmitResult = {}));

    var CheckoutMode;

    (function (CheckoutMode) {
      CheckoutMode[CheckoutMode["Asset"] = 1] = "Asset";
      CheckoutMode[CheckoutMode["Meta"] = 2] = "Meta";
      CheckoutMode[CheckoutMode["Both"] = 3] = "Both";
      CheckoutMode[CheckoutMode["Exact"] = 4] = "Exact";
    })(CheckoutMode = VersionControl.CheckoutMode || (VersionControl.CheckoutMode = {}));

    var ResolveMethod;

    (function (ResolveMethod) {
      ResolveMethod[ResolveMethod["UseMine"] = 1] = "UseMine";
      ResolveMethod[ResolveMethod["UseTheirs"] = 2] = "UseTheirs";
      ResolveMethod[ResolveMethod["UseMerged"] = 3] = "UseMerged";
    })(ResolveMethod = VersionControl.ResolveMethod || (VersionControl.ResolveMethod = {}));

    var MergeMethod;

    (function (MergeMethod) {
      MergeMethod[MergeMethod["MergeNone"] = 0] = "MergeNone";
      MergeMethod[MergeMethod["MergeAll"] = 1] = "MergeAll";
      MergeMethod[MergeMethod["MergeNonConflicting"] = 2] = "MergeNonConflicting";
    })(MergeMethod = VersionControl.MergeMethod || (VersionControl.MergeMethod = {}));

    var OnlineState;

    (function (OnlineState) {
      OnlineState[OnlineState["Updating"] = 0] = "Updating";
      OnlineState[OnlineState["Online"] = 1] = "Online";
      OnlineState[OnlineState["Offline"] = 2] = "Offline";
    })(OnlineState = VersionControl.OnlineState || (VersionControl.OnlineState = {}));

    var RevertMode;

    (function (RevertMode) {
      RevertMode[RevertMode["Normal"] = 0] = "Normal";
      RevertMode[RevertMode["Unchanged"] = 1] = "Unchanged";
      RevertMode[RevertMode["KeepModifications"] = 2] = "KeepModifications";
    })(RevertMode = VersionControl.RevertMode || (VersionControl.RevertMode = {}));

    var FileMode;

    (function (FileMode) {
      FileMode[FileMode["None"] = 0] = "None";
      FileMode[FileMode["Binary"] = 1] = "Binary";
      FileMode[FileMode["Text"] = 2] = "Text";
    })(FileMode = VersionControl.FileMode || (VersionControl.FileMode = {}));
  })(VersionControl = UnityEditor.VersionControl || (UnityEditor.VersionControl = {}));

  var VisualStudioIntegration;

  (function (VisualStudioIntegration) {})(VisualStudioIntegration = UnityEditor.VisualStudioIntegration || (UnityEditor.VisualStudioIntegration = {}));

  var XR;

  (function (XR) {})(XR = UnityEditor.XR || (UnityEditor.XR = {}));
})(editor_UnityEditor || (editor_UnityEditor = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/generated/react.js
var ReactUnity;

(function (ReactUnity_1) {
  var ScriptSource;

  (function (ScriptSource) {
    ScriptSource[ScriptSource["TextAsset"] = 0] = "TextAsset";
    ScriptSource[ScriptSource["File"] = 1] = "File";
    ScriptSource[ScriptSource["Url"] = 2] = "Url";
    ScriptSource[ScriptSource["Resource"] = 3] = "Resource";
    ScriptSource[ScriptSource["Text"] = 4] = "Text";
  })(ScriptSource = ReactUnity_1.ScriptSource || (ReactUnity_1.ScriptSource = {}));

  var Components;

  (function (Components) {})(Components = ReactUnity_1.Components || (ReactUnity_1.Components = {}));

  var DomProxies;

  (function (DomProxies) {})(DomProxies = ReactUnity_1.DomProxies || (ReactUnity_1.DomProxies = {}));

  var Editor;

  (function (Editor) {
    var Developer;

    (function (Developer) {})(Developer = Editor.Developer || (Editor.Developer = {}));

    var Renderer;

    (function (Renderer) {
      var Components;

      (function (Components) {})(Components = Renderer.Components || (Renderer.Components = {}));

      var Events;

      (function (Events) {})(Events = Renderer.Events || (Renderer.Events = {}));

      var Styling;

      (function (Styling) {})(Styling = Renderer.Styling || (Renderer.Styling = {}));
    })(Renderer = Editor.Renderer || (Editor.Renderer = {}));
  })(Editor = ReactUnity_1.Editor || (ReactUnity_1.Editor = {}));

  var EventHandlers;

  (function (EventHandlers) {})(EventHandlers = ReactUnity_1.EventHandlers || (ReactUnity_1.EventHandlers = {}));

  var Helpers;

  (function (Helpers) {})(Helpers = ReactUnity_1.Helpers || (ReactUnity_1.Helpers = {}));

  var Interop;

  (function (Interop) {})(Interop = ReactUnity_1.Interop || (ReactUnity_1.Interop = {}));

  var Layout;

  (function (Layout) {})(Layout = ReactUnity_1.Layout || (ReactUnity_1.Layout = {}));

  var Schedulers;

  (function (Schedulers) {})(Schedulers = ReactUnity_1.Schedulers || (ReactUnity_1.Schedulers = {}));

  var StateHandlers;

  (function (StateHandlers) {})(StateHandlers = ReactUnity_1.StateHandlers || (ReactUnity_1.StateHandlers = {}));

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
  })(StyleEngine = ReactUnity_1.StyleEngine || (ReactUnity_1.StyleEngine = {}));

  var Styling;

  (function (Styling) {
    var Parsers;

    (function (Parsers) {})(Parsers = Styling.Parsers || (Styling.Parsers = {}));

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
  })(Styling = ReactUnity_1.Styling || (ReactUnity_1.Styling = {}));

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
  })(Types = ReactUnity_1.Types || (ReactUnity_1.Types = {}));

  var Visitors;

  (function (Visitors) {})(Visitors = ReactUnity_1.Visitors || (ReactUnity_1.Visitors = {}));

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
  })(WebSupport = ReactUnity_1.WebSupport || (ReactUnity_1.WebSupport = {}));
})(ReactUnity || (ReactUnity = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/generated/system.js
//
// Types in assemblies: mscorlib, mscorlib, System.Core, System, mscorlib, System, mscorlib
// Generated 7.03.2021 23:19:28
//
var System;

(function (System) {
  var LoaderOptimization;

  (function (LoaderOptimization) {
    LoaderOptimization[LoaderOptimization["NotSpecified"] = 0] = "NotSpecified";
    LoaderOptimization[LoaderOptimization["SingleDomain"] = 1] = "SingleDomain";
    LoaderOptimization[LoaderOptimization["MultiDomain"] = 2] = "MultiDomain";
    LoaderOptimization[LoaderOptimization["MultiDomainHost"] = 3] = "MultiDomainHost";
    LoaderOptimization[LoaderOptimization["DomainMask"] = 3] = "DomainMask";
    LoaderOptimization[LoaderOptimization["DisallowBindings"] = 4] = "DisallowBindings";
  })(LoaderOptimization = System.LoaderOptimization || (System.LoaderOptimization = {}));

  var AttributeTargets;

  (function (AttributeTargets) {
    AttributeTargets[AttributeTargets["Assembly"] = 1] = "Assembly";
    AttributeTargets[AttributeTargets["Module"] = 2] = "Module";
    AttributeTargets[AttributeTargets["Class"] = 4] = "Class";
    AttributeTargets[AttributeTargets["Struct"] = 8] = "Struct";
    AttributeTargets[AttributeTargets["Enum"] = 16] = "Enum";
    AttributeTargets[AttributeTargets["Constructor"] = 32] = "Constructor";
    AttributeTargets[AttributeTargets["Method"] = 64] = "Method";
    AttributeTargets[AttributeTargets["Property"] = 128] = "Property";
    AttributeTargets[AttributeTargets["Field"] = 256] = "Field";
    AttributeTargets[AttributeTargets["Event"] = 512] = "Event";
    AttributeTargets[AttributeTargets["Interface"] = 1024] = "Interface";
    AttributeTargets[AttributeTargets["Parameter"] = 2048] = "Parameter";
    AttributeTargets[AttributeTargets["Delegate"] = 4096] = "Delegate";
    AttributeTargets[AttributeTargets["ReturnValue"] = 8192] = "ReturnValue";
    AttributeTargets[AttributeTargets["GenericParameter"] = 16384] = "GenericParameter";
    AttributeTargets[AttributeTargets["All"] = 32767] = "All";
  })(AttributeTargets = System.AttributeTargets || (System.AttributeTargets = {}));

  var ConsoleColor;

  (function (ConsoleColor) {
    ConsoleColor[ConsoleColor["Black"] = 0] = "Black";
    ConsoleColor[ConsoleColor["DarkBlue"] = 1] = "DarkBlue";
    ConsoleColor[ConsoleColor["DarkGreen"] = 2] = "DarkGreen";
    ConsoleColor[ConsoleColor["DarkCyan"] = 3] = "DarkCyan";
    ConsoleColor[ConsoleColor["DarkRed"] = 4] = "DarkRed";
    ConsoleColor[ConsoleColor["DarkMagenta"] = 5] = "DarkMagenta";
    ConsoleColor[ConsoleColor["DarkYellow"] = 6] = "DarkYellow";
    ConsoleColor[ConsoleColor["Gray"] = 7] = "Gray";
    ConsoleColor[ConsoleColor["DarkGray"] = 8] = "DarkGray";
    ConsoleColor[ConsoleColor["Blue"] = 9] = "Blue";
    ConsoleColor[ConsoleColor["Green"] = 10] = "Green";
    ConsoleColor[ConsoleColor["Cyan"] = 11] = "Cyan";
    ConsoleColor[ConsoleColor["Red"] = 12] = "Red";
    ConsoleColor[ConsoleColor["Magenta"] = 13] = "Magenta";
    ConsoleColor[ConsoleColor["Yellow"] = 14] = "Yellow";
    ConsoleColor[ConsoleColor["White"] = 15] = "White";
  })(ConsoleColor = System.ConsoleColor || (System.ConsoleColor = {}));

  var ConsoleKey;

  (function (ConsoleKey) {
    ConsoleKey[ConsoleKey["Backspace"] = 8] = "Backspace";
    ConsoleKey[ConsoleKey["Tab"] = 9] = "Tab";
    ConsoleKey[ConsoleKey["Clear"] = 12] = "Clear";
    ConsoleKey[ConsoleKey["Enter"] = 13] = "Enter";
    ConsoleKey[ConsoleKey["Pause"] = 19] = "Pause";
    ConsoleKey[ConsoleKey["Escape"] = 27] = "Escape";
    ConsoleKey[ConsoleKey["Spacebar"] = 32] = "Spacebar";
    ConsoleKey[ConsoleKey["PageUp"] = 33] = "PageUp";
    ConsoleKey[ConsoleKey["PageDown"] = 34] = "PageDown";
    ConsoleKey[ConsoleKey["End"] = 35] = "End";
    ConsoleKey[ConsoleKey["Home"] = 36] = "Home";
    ConsoleKey[ConsoleKey["LeftArrow"] = 37] = "LeftArrow";
    ConsoleKey[ConsoleKey["UpArrow"] = 38] = "UpArrow";
    ConsoleKey[ConsoleKey["RightArrow"] = 39] = "RightArrow";
    ConsoleKey[ConsoleKey["DownArrow"] = 40] = "DownArrow";
    ConsoleKey[ConsoleKey["Select"] = 41] = "Select";
    ConsoleKey[ConsoleKey["Print"] = 42] = "Print";
    ConsoleKey[ConsoleKey["Execute"] = 43] = "Execute";
    ConsoleKey[ConsoleKey["PrintScreen"] = 44] = "PrintScreen";
    ConsoleKey[ConsoleKey["Insert"] = 45] = "Insert";
    ConsoleKey[ConsoleKey["Delete"] = 46] = "Delete";
    ConsoleKey[ConsoleKey["Help"] = 47] = "Help";
    ConsoleKey[ConsoleKey["D0"] = 48] = "D0";
    ConsoleKey[ConsoleKey["D1"] = 49] = "D1";
    ConsoleKey[ConsoleKey["D2"] = 50] = "D2";
    ConsoleKey[ConsoleKey["D3"] = 51] = "D3";
    ConsoleKey[ConsoleKey["D4"] = 52] = "D4";
    ConsoleKey[ConsoleKey["D5"] = 53] = "D5";
    ConsoleKey[ConsoleKey["D6"] = 54] = "D6";
    ConsoleKey[ConsoleKey["D7"] = 55] = "D7";
    ConsoleKey[ConsoleKey["D8"] = 56] = "D8";
    ConsoleKey[ConsoleKey["D9"] = 57] = "D9";
    ConsoleKey[ConsoleKey["A"] = 65] = "A";
    ConsoleKey[ConsoleKey["B"] = 66] = "B";
    ConsoleKey[ConsoleKey["C"] = 67] = "C";
    ConsoleKey[ConsoleKey["D"] = 68] = "D";
    ConsoleKey[ConsoleKey["E"] = 69] = "E";
    ConsoleKey[ConsoleKey["F"] = 70] = "F";
    ConsoleKey[ConsoleKey["G"] = 71] = "G";
    ConsoleKey[ConsoleKey["H"] = 72] = "H";
    ConsoleKey[ConsoleKey["I"] = 73] = "I";
    ConsoleKey[ConsoleKey["J"] = 74] = "J";
    ConsoleKey[ConsoleKey["K"] = 75] = "K";
    ConsoleKey[ConsoleKey["L"] = 76] = "L";
    ConsoleKey[ConsoleKey["M"] = 77] = "M";
    ConsoleKey[ConsoleKey["N"] = 78] = "N";
    ConsoleKey[ConsoleKey["O"] = 79] = "O";
    ConsoleKey[ConsoleKey["P"] = 80] = "P";
    ConsoleKey[ConsoleKey["Q"] = 81] = "Q";
    ConsoleKey[ConsoleKey["R"] = 82] = "R";
    ConsoleKey[ConsoleKey["S"] = 83] = "S";
    ConsoleKey[ConsoleKey["T"] = 84] = "T";
    ConsoleKey[ConsoleKey["U"] = 85] = "U";
    ConsoleKey[ConsoleKey["V"] = 86] = "V";
    ConsoleKey[ConsoleKey["W"] = 87] = "W";
    ConsoleKey[ConsoleKey["X"] = 88] = "X";
    ConsoleKey[ConsoleKey["Y"] = 89] = "Y";
    ConsoleKey[ConsoleKey["Z"] = 90] = "Z";
    ConsoleKey[ConsoleKey["LeftWindows"] = 91] = "LeftWindows";
    ConsoleKey[ConsoleKey["RightWindows"] = 92] = "RightWindows";
    ConsoleKey[ConsoleKey["Applications"] = 93] = "Applications";
    ConsoleKey[ConsoleKey["Sleep"] = 95] = "Sleep";
    ConsoleKey[ConsoleKey["NumPad0"] = 96] = "NumPad0";
    ConsoleKey[ConsoleKey["NumPad1"] = 97] = "NumPad1";
    ConsoleKey[ConsoleKey["NumPad2"] = 98] = "NumPad2";
    ConsoleKey[ConsoleKey["NumPad3"] = 99] = "NumPad3";
    ConsoleKey[ConsoleKey["NumPad4"] = 100] = "NumPad4";
    ConsoleKey[ConsoleKey["NumPad5"] = 101] = "NumPad5";
    ConsoleKey[ConsoleKey["NumPad6"] = 102] = "NumPad6";
    ConsoleKey[ConsoleKey["NumPad7"] = 103] = "NumPad7";
    ConsoleKey[ConsoleKey["NumPad8"] = 104] = "NumPad8";
    ConsoleKey[ConsoleKey["NumPad9"] = 105] = "NumPad9";
    ConsoleKey[ConsoleKey["Multiply"] = 106] = "Multiply";
    ConsoleKey[ConsoleKey["Add"] = 107] = "Add";
    ConsoleKey[ConsoleKey["Separator"] = 108] = "Separator";
    ConsoleKey[ConsoleKey["Subtract"] = 109] = "Subtract";
    ConsoleKey[ConsoleKey["Decimal"] = 110] = "Decimal";
    ConsoleKey[ConsoleKey["Divide"] = 111] = "Divide";
    ConsoleKey[ConsoleKey["F1"] = 112] = "F1";
    ConsoleKey[ConsoleKey["F2"] = 113] = "F2";
    ConsoleKey[ConsoleKey["F3"] = 114] = "F3";
    ConsoleKey[ConsoleKey["F4"] = 115] = "F4";
    ConsoleKey[ConsoleKey["F5"] = 116] = "F5";
    ConsoleKey[ConsoleKey["F6"] = 117] = "F6";
    ConsoleKey[ConsoleKey["F7"] = 118] = "F7";
    ConsoleKey[ConsoleKey["F8"] = 119] = "F8";
    ConsoleKey[ConsoleKey["F9"] = 120] = "F9";
    ConsoleKey[ConsoleKey["F10"] = 121] = "F10";
    ConsoleKey[ConsoleKey["F11"] = 122] = "F11";
    ConsoleKey[ConsoleKey["F12"] = 123] = "F12";
    ConsoleKey[ConsoleKey["F13"] = 124] = "F13";
    ConsoleKey[ConsoleKey["F14"] = 125] = "F14";
    ConsoleKey[ConsoleKey["F15"] = 126] = "F15";
    ConsoleKey[ConsoleKey["F16"] = 127] = "F16";
    ConsoleKey[ConsoleKey["F17"] = 128] = "F17";
    ConsoleKey[ConsoleKey["F18"] = 129] = "F18";
    ConsoleKey[ConsoleKey["F19"] = 130] = "F19";
    ConsoleKey[ConsoleKey["F20"] = 131] = "F20";
    ConsoleKey[ConsoleKey["F21"] = 132] = "F21";
    ConsoleKey[ConsoleKey["F22"] = 133] = "F22";
    ConsoleKey[ConsoleKey["F23"] = 134] = "F23";
    ConsoleKey[ConsoleKey["F24"] = 135] = "F24";
    ConsoleKey[ConsoleKey["BrowserBack"] = 166] = "BrowserBack";
    ConsoleKey[ConsoleKey["BrowserForward"] = 167] = "BrowserForward";
    ConsoleKey[ConsoleKey["BrowserRefresh"] = 168] = "BrowserRefresh";
    ConsoleKey[ConsoleKey["BrowserStop"] = 169] = "BrowserStop";
    ConsoleKey[ConsoleKey["BrowserSearch"] = 170] = "BrowserSearch";
    ConsoleKey[ConsoleKey["BrowserFavorites"] = 171] = "BrowserFavorites";
    ConsoleKey[ConsoleKey["BrowserHome"] = 172] = "BrowserHome";
    ConsoleKey[ConsoleKey["VolumeMute"] = 173] = "VolumeMute";
    ConsoleKey[ConsoleKey["VolumeDown"] = 174] = "VolumeDown";
    ConsoleKey[ConsoleKey["VolumeUp"] = 175] = "VolumeUp";
    ConsoleKey[ConsoleKey["MediaNext"] = 176] = "MediaNext";
    ConsoleKey[ConsoleKey["MediaPrevious"] = 177] = "MediaPrevious";
    ConsoleKey[ConsoleKey["MediaStop"] = 178] = "MediaStop";
    ConsoleKey[ConsoleKey["MediaPlay"] = 179] = "MediaPlay";
    ConsoleKey[ConsoleKey["LaunchMail"] = 180] = "LaunchMail";
    ConsoleKey[ConsoleKey["LaunchMediaSelect"] = 181] = "LaunchMediaSelect";
    ConsoleKey[ConsoleKey["LaunchApp1"] = 182] = "LaunchApp1";
    ConsoleKey[ConsoleKey["LaunchApp2"] = 183] = "LaunchApp2";
    ConsoleKey[ConsoleKey["Oem1"] = 186] = "Oem1";
    ConsoleKey[ConsoleKey["OemPlus"] = 187] = "OemPlus";
    ConsoleKey[ConsoleKey["OemComma"] = 188] = "OemComma";
    ConsoleKey[ConsoleKey["OemMinus"] = 189] = "OemMinus";
    ConsoleKey[ConsoleKey["OemPeriod"] = 190] = "OemPeriod";
    ConsoleKey[ConsoleKey["Oem2"] = 191] = "Oem2";
    ConsoleKey[ConsoleKey["Oem3"] = 192] = "Oem3";
    ConsoleKey[ConsoleKey["Oem4"] = 219] = "Oem4";
    ConsoleKey[ConsoleKey["Oem5"] = 220] = "Oem5";
    ConsoleKey[ConsoleKey["Oem6"] = 221] = "Oem6";
    ConsoleKey[ConsoleKey["Oem7"] = 222] = "Oem7";
    ConsoleKey[ConsoleKey["Oem8"] = 223] = "Oem8";
    ConsoleKey[ConsoleKey["Oem102"] = 226] = "Oem102";
    ConsoleKey[ConsoleKey["Process"] = 229] = "Process";
    ConsoleKey[ConsoleKey["Packet"] = 231] = "Packet";
    ConsoleKey[ConsoleKey["Attention"] = 246] = "Attention";
    ConsoleKey[ConsoleKey["CrSel"] = 247] = "CrSel";
    ConsoleKey[ConsoleKey["ExSel"] = 248] = "ExSel";
    ConsoleKey[ConsoleKey["EraseEndOfFile"] = 249] = "EraseEndOfFile";
    ConsoleKey[ConsoleKey["Play"] = 250] = "Play";
    ConsoleKey[ConsoleKey["Zoom"] = 251] = "Zoom";
    ConsoleKey[ConsoleKey["NoName"] = 252] = "NoName";
    ConsoleKey[ConsoleKey["Pa1"] = 253] = "Pa1";
    ConsoleKey[ConsoleKey["OemClear"] = 254] = "OemClear";
  })(ConsoleKey = System.ConsoleKey || (System.ConsoleKey = {}));

  var ConsoleModifiers;

  (function (ConsoleModifiers) {
    ConsoleModifiers[ConsoleModifiers["Alt"] = 1] = "Alt";
    ConsoleModifiers[ConsoleModifiers["Shift"] = 2] = "Shift";
    ConsoleModifiers[ConsoleModifiers["Control"] = 4] = "Control";
  })(ConsoleModifiers = System.ConsoleModifiers || (System.ConsoleModifiers = {}));

  var ConsoleSpecialKey;

  (function (ConsoleSpecialKey) {
    ConsoleSpecialKey[ConsoleSpecialKey["ControlC"] = 0] = "ControlC";
    ConsoleSpecialKey[ConsoleSpecialKey["ControlBreak"] = 1] = "ControlBreak";
  })(ConsoleSpecialKey = System.ConsoleSpecialKey || (System.ConsoleSpecialKey = {}));

  var Base64FormattingOptions;

  (function (Base64FormattingOptions) {
    Base64FormattingOptions[Base64FormattingOptions["None"] = 0] = "None";
    Base64FormattingOptions[Base64FormattingOptions["InsertLineBreaks"] = 1] = "InsertLineBreaks";
  })(Base64FormattingOptions = System.Base64FormattingOptions || (System.Base64FormattingOptions = {}));

  var DateTimeKind;

  (function (DateTimeKind) {
    DateTimeKind[DateTimeKind["Unspecified"] = 0] = "Unspecified";
    DateTimeKind[DateTimeKind["Utc"] = 1] = "Utc";
    DateTimeKind[DateTimeKind["Local"] = 2] = "Local";
  })(DateTimeKind = System.DateTimeKind || (System.DateTimeKind = {}));

  var DayOfWeek;

  (function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
  })(DayOfWeek = System.DayOfWeek || (System.DayOfWeek = {}));

  var GCCollectionMode;

  (function (GCCollectionMode) {
    GCCollectionMode[GCCollectionMode["Default"] = 0] = "Default";
    GCCollectionMode[GCCollectionMode["Forced"] = 1] = "Forced";
    GCCollectionMode[GCCollectionMode["Optimized"] = 2] = "Optimized";
  })(GCCollectionMode = System.GCCollectionMode || (System.GCCollectionMode = {}));

  var GCNotificationStatus;

  (function (GCNotificationStatus) {
    GCNotificationStatus[GCNotificationStatus["Succeeded"] = 0] = "Succeeded";
    GCNotificationStatus[GCNotificationStatus["Failed"] = 1] = "Failed";
    GCNotificationStatus[GCNotificationStatus["Canceled"] = 2] = "Canceled";
    GCNotificationStatus[GCNotificationStatus["Timeout"] = 3] = "Timeout";
    GCNotificationStatus[GCNotificationStatus["NotApplicable"] = 4] = "NotApplicable";
  })(GCNotificationStatus = System.GCNotificationStatus || (System.GCNotificationStatus = {}));

  var MidpointRounding;

  (function (MidpointRounding) {
    MidpointRounding[MidpointRounding["ToEven"] = 0] = "ToEven";
    MidpointRounding[MidpointRounding["AwayFromZero"] = 1] = "AwayFromZero";
  })(MidpointRounding = System.MidpointRounding || (System.MidpointRounding = {}));

  var StringSplitOptions;

  (function (StringSplitOptions) {
    StringSplitOptions[StringSplitOptions["None"] = 0] = "None";
    StringSplitOptions[StringSplitOptions["RemoveEmptyEntries"] = 1] = "RemoveEmptyEntries";
  })(StringSplitOptions = System.StringSplitOptions || (System.StringSplitOptions = {}));

  var Environment_SpecialFolder;

  (function (Environment_SpecialFolder) {
    Environment_SpecialFolder[Environment_SpecialFolder["MyDocuments"] = 5] = "MyDocuments";
    Environment_SpecialFolder[Environment_SpecialFolder["Desktop"] = 0] = "Desktop";
    Environment_SpecialFolder[Environment_SpecialFolder["MyComputer"] = 17] = "MyComputer";
    Environment_SpecialFolder[Environment_SpecialFolder["Programs"] = 2] = "Programs";
    Environment_SpecialFolder[Environment_SpecialFolder["Personal"] = 5] = "Personal";
    Environment_SpecialFolder[Environment_SpecialFolder["Favorites"] = 6] = "Favorites";
    Environment_SpecialFolder[Environment_SpecialFolder["Startup"] = 7] = "Startup";
    Environment_SpecialFolder[Environment_SpecialFolder["Recent"] = 8] = "Recent";
    Environment_SpecialFolder[Environment_SpecialFolder["SendTo"] = 9] = "SendTo";
    Environment_SpecialFolder[Environment_SpecialFolder["StartMenu"] = 11] = "StartMenu";
    Environment_SpecialFolder[Environment_SpecialFolder["MyMusic"] = 13] = "MyMusic";
    Environment_SpecialFolder[Environment_SpecialFolder["DesktopDirectory"] = 16] = "DesktopDirectory";
    Environment_SpecialFolder[Environment_SpecialFolder["Templates"] = 21] = "Templates";
    Environment_SpecialFolder[Environment_SpecialFolder["ApplicationData"] = 26] = "ApplicationData";
    Environment_SpecialFolder[Environment_SpecialFolder["LocalApplicationData"] = 28] = "LocalApplicationData";
    Environment_SpecialFolder[Environment_SpecialFolder["InternetCache"] = 32] = "InternetCache";
    Environment_SpecialFolder[Environment_SpecialFolder["Cookies"] = 33] = "Cookies";
    Environment_SpecialFolder[Environment_SpecialFolder["History"] = 34] = "History";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonApplicationData"] = 35] = "CommonApplicationData";
    Environment_SpecialFolder[Environment_SpecialFolder["System"] = 37] = "System";
    Environment_SpecialFolder[Environment_SpecialFolder["ProgramFiles"] = 38] = "ProgramFiles";
    Environment_SpecialFolder[Environment_SpecialFolder["MyPictures"] = 39] = "MyPictures";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonProgramFiles"] = 43] = "CommonProgramFiles";
    Environment_SpecialFolder[Environment_SpecialFolder["MyVideos"] = 14] = "MyVideos";
    Environment_SpecialFolder[Environment_SpecialFolder["NetworkShortcuts"] = 19] = "NetworkShortcuts";
    Environment_SpecialFolder[Environment_SpecialFolder["Fonts"] = 20] = "Fonts";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonStartMenu"] = 22] = "CommonStartMenu";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonPrograms"] = 23] = "CommonPrograms";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonStartup"] = 24] = "CommonStartup";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonDesktopDirectory"] = 25] = "CommonDesktopDirectory";
    Environment_SpecialFolder[Environment_SpecialFolder["PrinterShortcuts"] = 27] = "PrinterShortcuts";
    Environment_SpecialFolder[Environment_SpecialFolder["Windows"] = 36] = "Windows";
    Environment_SpecialFolder[Environment_SpecialFolder["UserProfile"] = 40] = "UserProfile";
    Environment_SpecialFolder[Environment_SpecialFolder["SystemX86"] = 41] = "SystemX86";
    Environment_SpecialFolder[Environment_SpecialFolder["ProgramFilesX86"] = 42] = "ProgramFilesX86";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonProgramFilesX86"] = 44] = "CommonProgramFilesX86";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonTemplates"] = 45] = "CommonTemplates";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonDocuments"] = 46] = "CommonDocuments";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonAdminTools"] = 47] = "CommonAdminTools";
    Environment_SpecialFolder[Environment_SpecialFolder["AdminTools"] = 48] = "AdminTools";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonMusic"] = 53] = "CommonMusic";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonPictures"] = 54] = "CommonPictures";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonVideos"] = 55] = "CommonVideos";
    Environment_SpecialFolder[Environment_SpecialFolder["Resources"] = 56] = "Resources";
    Environment_SpecialFolder[Environment_SpecialFolder["LocalizedResources"] = 57] = "LocalizedResources";
    Environment_SpecialFolder[Environment_SpecialFolder["CommonOemLinks"] = 58] = "CommonOemLinks";
    Environment_SpecialFolder[Environment_SpecialFolder["CDBurning"] = 59] = "CDBurning";
  })(Environment_SpecialFolder = System.Environment_SpecialFolder || (System.Environment_SpecialFolder = {}));

  var Environment_SpecialFolderOption;

  (function (Environment_SpecialFolderOption) {
    Environment_SpecialFolderOption[Environment_SpecialFolderOption["None"] = 0] = "None";
    Environment_SpecialFolderOption[Environment_SpecialFolderOption["DoNotVerify"] = 16384] = "DoNotVerify";
    Environment_SpecialFolderOption[Environment_SpecialFolderOption["Create"] = 32768] = "Create";
  })(Environment_SpecialFolderOption = System.Environment_SpecialFolderOption || (System.Environment_SpecialFolderOption = {}));

  var ActivationContext_ContextForm;

  (function (ActivationContext_ContextForm) {
    ActivationContext_ContextForm[ActivationContext_ContextForm["Loose"] = 0] = "Loose";
    ActivationContext_ContextForm[ActivationContext_ContextForm["StoreBounded"] = 1] = "StoreBounded";
  })(ActivationContext_ContextForm = System.ActivationContext_ContextForm || (System.ActivationContext_ContextForm = {}));

  var AppDomainManagerInitializationOptions;

  (function (AppDomainManagerInitializationOptions) {
    AppDomainManagerInitializationOptions[AppDomainManagerInitializationOptions["None"] = 0] = "None";
    AppDomainManagerInitializationOptions[AppDomainManagerInitializationOptions["RegisterWithHost"] = 1] = "RegisterWithHost";
  })(AppDomainManagerInitializationOptions = System.AppDomainManagerInitializationOptions || (System.AppDomainManagerInitializationOptions = {}));

  var EnvironmentVariableTarget;

  (function (EnvironmentVariableTarget) {
    EnvironmentVariableTarget[EnvironmentVariableTarget["Process"] = 0] = "Process";
    EnvironmentVariableTarget[EnvironmentVariableTarget["User"] = 1] = "User";
    EnvironmentVariableTarget[EnvironmentVariableTarget["Machine"] = 2] = "Machine";
  })(EnvironmentVariableTarget = System.EnvironmentVariableTarget || (System.EnvironmentVariableTarget = {}));

  var PlatformID;

  (function (PlatformID) {
    PlatformID[PlatformID["Win32S"] = 0] = "Win32S";
    PlatformID[PlatformID["Win32Windows"] = 1] = "Win32Windows";
    PlatformID[PlatformID["Win32NT"] = 2] = "Win32NT";
    PlatformID[PlatformID["WinCE"] = 3] = "WinCE";
    PlatformID[PlatformID["Unix"] = 4] = "Unix";
    PlatformID[PlatformID["Xbox"] = 5] = "Xbox";
    PlatformID[PlatformID["MacOSX"] = 6] = "MacOSX";
  })(PlatformID = System.PlatformID || (System.PlatformID = {}));

  var StringComparison;

  (function (StringComparison) {
    StringComparison[StringComparison["CurrentCulture"] = 0] = "CurrentCulture";
    StringComparison[StringComparison["CurrentCultureIgnoreCase"] = 1] = "CurrentCultureIgnoreCase";
    StringComparison[StringComparison["InvariantCulture"] = 2] = "InvariantCulture";
    StringComparison[StringComparison["InvariantCultureIgnoreCase"] = 3] = "InvariantCultureIgnoreCase";
    StringComparison[StringComparison["Ordinal"] = 4] = "Ordinal";
    StringComparison[StringComparison["OrdinalIgnoreCase"] = 5] = "OrdinalIgnoreCase";
  })(StringComparison = System.StringComparison || (System.StringComparison = {}));

  var TypeCode;

  (function (TypeCode) {
    TypeCode[TypeCode["Empty"] = 0] = "Empty";
    TypeCode[TypeCode["Object"] = 1] = "Object";
    TypeCode[TypeCode["DBNull"] = 2] = "DBNull";
    TypeCode[TypeCode["Boolean"] = 3] = "Boolean";
    TypeCode[TypeCode["Char"] = 4] = "Char";
    TypeCode[TypeCode["SByte"] = 5] = "SByte";
    TypeCode[TypeCode["Byte"] = 6] = "Byte";
    TypeCode[TypeCode["Int16"] = 7] = "Int16";
    TypeCode[TypeCode["UInt16"] = 8] = "UInt16";
    TypeCode[TypeCode["Int32"] = 9] = "Int32";
    TypeCode[TypeCode["UInt32"] = 10] = "UInt32";
    TypeCode[TypeCode["Int64"] = 11] = "Int64";
    TypeCode[TypeCode["UInt64"] = 12] = "UInt64";
    TypeCode[TypeCode["Single"] = 13] = "Single";
    TypeCode[TypeCode["Double"] = 14] = "Double";
    TypeCode[TypeCode["Decimal"] = 15] = "Decimal";
    TypeCode[TypeCode["DateTime"] = 16] = "DateTime";
    TypeCode[TypeCode["String"] = 18] = "String";
  })(TypeCode = System.TypeCode || (System.TypeCode = {}));

  var GenericUriParserOptions;

  (function (GenericUriParserOptions) {
    GenericUriParserOptions[GenericUriParserOptions["Default"] = 0] = "Default";
    GenericUriParserOptions[GenericUriParserOptions["GenericAuthority"] = 1] = "GenericAuthority";
    GenericUriParserOptions[GenericUriParserOptions["AllowEmptyAuthority"] = 2] = "AllowEmptyAuthority";
    GenericUriParserOptions[GenericUriParserOptions["NoUserInfo"] = 4] = "NoUserInfo";
    GenericUriParserOptions[GenericUriParserOptions["NoPort"] = 8] = "NoPort";
    GenericUriParserOptions[GenericUriParserOptions["NoQuery"] = 16] = "NoQuery";
    GenericUriParserOptions[GenericUriParserOptions["NoFragment"] = 32] = "NoFragment";
    GenericUriParserOptions[GenericUriParserOptions["DontConvertPathBackslashes"] = 64] = "DontConvertPathBackslashes";
    GenericUriParserOptions[GenericUriParserOptions["DontCompressPath"] = 128] = "DontCompressPath";
    GenericUriParserOptions[GenericUriParserOptions["DontUnescapePathDotsAndSlashes"] = 256] = "DontUnescapePathDotsAndSlashes";
    GenericUriParserOptions[GenericUriParserOptions["Idn"] = 512] = "Idn";
    GenericUriParserOptions[GenericUriParserOptions["IriParsing"] = 1024] = "IriParsing";
  })(GenericUriParserOptions = System.GenericUriParserOptions || (System.GenericUriParserOptions = {}));

  var UriPartial;

  (function (UriPartial) {
    UriPartial[UriPartial["Scheme"] = 0] = "Scheme";
    UriPartial[UriPartial["Authority"] = 1] = "Authority";
    UriPartial[UriPartial["Path"] = 2] = "Path";
    UriPartial[UriPartial["Query"] = 3] = "Query";
  })(UriPartial = System.UriPartial || (System.UriPartial = {}));

  var UriKind;

  (function (UriKind) {
    UriKind[UriKind["RelativeOrAbsolute"] = 0] = "RelativeOrAbsolute";
    UriKind[UriKind["Absolute"] = 1] = "Absolute";
    UriKind[UriKind["Relative"] = 2] = "Relative";
  })(UriKind = System.UriKind || (System.UriKind = {}));

  var UriComponents;

  (function (UriComponents) {
    UriComponents[UriComponents["Scheme"] = 1] = "Scheme";
    UriComponents[UriComponents["UserInfo"] = 2] = "UserInfo";
    UriComponents[UriComponents["Host"] = 4] = "Host";
    UriComponents[UriComponents["Port"] = 8] = "Port";
    UriComponents[UriComponents["Path"] = 16] = "Path";
    UriComponents[UriComponents["Query"] = 32] = "Query";
    UriComponents[UriComponents["Fragment"] = 64] = "Fragment";
    UriComponents[UriComponents["StrongPort"] = 128] = "StrongPort";
    UriComponents[UriComponents["NormalizedHost"] = 256] = "NormalizedHost";
    UriComponents[UriComponents["KeepDelimiter"] = 1073741824] = "KeepDelimiter";
    UriComponents[UriComponents["SerializationInfoString"] = -2147483648] = "SerializationInfoString";
    UriComponents[UriComponents["AbsoluteUri"] = 127] = "AbsoluteUri";
    UriComponents[UriComponents["HostAndPort"] = 132] = "HostAndPort";
    UriComponents[UriComponents["StrongAuthority"] = 134] = "StrongAuthority";
    UriComponents[UriComponents["SchemeAndServer"] = 13] = "SchemeAndServer";
    UriComponents[UriComponents["HttpRequestUrl"] = 61] = "HttpRequestUrl";
    UriComponents[UriComponents["PathAndQuery"] = 48] = "PathAndQuery";
  })(UriComponents = System.UriComponents || (System.UriComponents = {}));

  var UriFormat;

  (function (UriFormat) {
    UriFormat[UriFormat["UriEscaped"] = 1] = "UriEscaped";
    UriFormat[UriFormat["Unescaped"] = 2] = "Unescaped";
    UriFormat[UriFormat["SafeUnescaped"] = 3] = "SafeUnescaped";
  })(UriFormat = System.UriFormat || (System.UriFormat = {}));

  var UriIdnScope;

  (function (UriIdnScope) {
    UriIdnScope[UriIdnScope["None"] = 0] = "None";
    UriIdnScope[UriIdnScope["AllExceptIntranet"] = 1] = "AllExceptIntranet";
    UriIdnScope[UriIdnScope["All"] = 2] = "All";
  })(UriIdnScope = System.UriIdnScope || (System.UriIdnScope = {}));

  var UriHostNameType;

  (function (UriHostNameType) {
    UriHostNameType[UriHostNameType["Unknown"] = 0] = "Unknown";
    UriHostNameType[UriHostNameType["Basic"] = 1] = "Basic";
    UriHostNameType[UriHostNameType["Dns"] = 2] = "Dns";
    UriHostNameType[UriHostNameType["IPv4"] = 3] = "IPv4";
    UriHostNameType[UriHostNameType["IPv6"] = 4] = "IPv6";
  })(UriHostNameType = System.UriHostNameType || (System.UriHostNameType = {}));

  var Buffers;

  (function (Buffers) {
    var Binary;

    (function (Binary) {})(Binary = Buffers.Binary || (Buffers.Binary = {}));
  })(Buffers = System.Buffers || (System.Buffers = {}));

  var CodeDom;

  (function (CodeDom) {
    var CodeTypeReferenceOptions;

    (function (CodeTypeReferenceOptions) {
      CodeTypeReferenceOptions[CodeTypeReferenceOptions["GlobalReference"] = 1] = "GlobalReference";
      CodeTypeReferenceOptions[CodeTypeReferenceOptions["GenericTypeParameter"] = 2] = "GenericTypeParameter";
    })(CodeTypeReferenceOptions = CodeDom.CodeTypeReferenceOptions || (CodeDom.CodeTypeReferenceOptions = {}));

    var CodeBinaryOperatorType;

    (function (CodeBinaryOperatorType) {
      CodeBinaryOperatorType[CodeBinaryOperatorType["Add"] = 0] = "Add";
      CodeBinaryOperatorType[CodeBinaryOperatorType["Subtract"] = 1] = "Subtract";
      CodeBinaryOperatorType[CodeBinaryOperatorType["Multiply"] = 2] = "Multiply";
      CodeBinaryOperatorType[CodeBinaryOperatorType["Divide"] = 3] = "Divide";
      CodeBinaryOperatorType[CodeBinaryOperatorType["Modulus"] = 4] = "Modulus";
      CodeBinaryOperatorType[CodeBinaryOperatorType["Assign"] = 5] = "Assign";
      CodeBinaryOperatorType[CodeBinaryOperatorType["IdentityInequality"] = 6] = "IdentityInequality";
      CodeBinaryOperatorType[CodeBinaryOperatorType["IdentityEquality"] = 7] = "IdentityEquality";
      CodeBinaryOperatorType[CodeBinaryOperatorType["ValueEquality"] = 8] = "ValueEquality";
      CodeBinaryOperatorType[CodeBinaryOperatorType["BitwiseOr"] = 9] = "BitwiseOr";
      CodeBinaryOperatorType[CodeBinaryOperatorType["BitwiseAnd"] = 10] = "BitwiseAnd";
      CodeBinaryOperatorType[CodeBinaryOperatorType["BooleanOr"] = 11] = "BooleanOr";
      CodeBinaryOperatorType[CodeBinaryOperatorType["BooleanAnd"] = 12] = "BooleanAnd";
      CodeBinaryOperatorType[CodeBinaryOperatorType["LessThan"] = 13] = "LessThan";
      CodeBinaryOperatorType[CodeBinaryOperatorType["LessThanOrEqual"] = 14] = "LessThanOrEqual";
      CodeBinaryOperatorType[CodeBinaryOperatorType["GreaterThan"] = 15] = "GreaterThan";
      CodeBinaryOperatorType[CodeBinaryOperatorType["GreaterThanOrEqual"] = 16] = "GreaterThanOrEqual";
    })(CodeBinaryOperatorType = CodeDom.CodeBinaryOperatorType || (CodeDom.CodeBinaryOperatorType = {}));

    var CodeRegionMode;

    (function (CodeRegionMode) {
      CodeRegionMode[CodeRegionMode["None"] = 0] = "None";
      CodeRegionMode[CodeRegionMode["Start"] = 1] = "Start";
      CodeRegionMode[CodeRegionMode["End"] = 2] = "End";
    })(CodeRegionMode = CodeDom.CodeRegionMode || (CodeDom.CodeRegionMode = {}));

    var FieldDirection;

    (function (FieldDirection) {
      FieldDirection[FieldDirection["In"] = 0] = "In";
      FieldDirection[FieldDirection["Out"] = 1] = "Out";
      FieldDirection[FieldDirection["Ref"] = 2] = "Ref";
    })(FieldDirection = CodeDom.FieldDirection || (CodeDom.FieldDirection = {}));

    var MemberAttributes;

    (function (MemberAttributes) {
      MemberAttributes[MemberAttributes["Abstract"] = 1] = "Abstract";
      MemberAttributes[MemberAttributes["Final"] = 2] = "Final";
      MemberAttributes[MemberAttributes["Static"] = 3] = "Static";
      MemberAttributes[MemberAttributes["Override"] = 4] = "Override";
      MemberAttributes[MemberAttributes["Const"] = 5] = "Const";
      MemberAttributes[MemberAttributes["New"] = 16] = "New";
      MemberAttributes[MemberAttributes["Overloaded"] = 256] = "Overloaded";
      MemberAttributes[MemberAttributes["Assembly"] = 4096] = "Assembly";
      MemberAttributes[MemberAttributes["FamilyAndAssembly"] = 8192] = "FamilyAndAssembly";
      MemberAttributes[MemberAttributes["Family"] = 12288] = "Family";
      MemberAttributes[MemberAttributes["FamilyOrAssembly"] = 16384] = "FamilyOrAssembly";
      MemberAttributes[MemberAttributes["Private"] = 20480] = "Private";
      MemberAttributes[MemberAttributes["Public"] = 24576] = "Public";
      MemberAttributes[MemberAttributes["AccessMask"] = 61440] = "AccessMask";
      MemberAttributes[MemberAttributes["ScopeMask"] = 15] = "ScopeMask";
      MemberAttributes[MemberAttributes["VTableMask"] = 240] = "VTableMask";
    })(MemberAttributes = CodeDom.MemberAttributes || (CodeDom.MemberAttributes = {}));

    var Compiler;

    (function (Compiler) {
      var GeneratorSupport;

      (function (GeneratorSupport) {
        GeneratorSupport[GeneratorSupport["ArraysOfArrays"] = 1] = "ArraysOfArrays";
        GeneratorSupport[GeneratorSupport["EntryPointMethod"] = 2] = "EntryPointMethod";
        GeneratorSupport[GeneratorSupport["GotoStatements"] = 4] = "GotoStatements";
        GeneratorSupport[GeneratorSupport["MultidimensionalArrays"] = 8] = "MultidimensionalArrays";
        GeneratorSupport[GeneratorSupport["StaticConstructors"] = 16] = "StaticConstructors";
        GeneratorSupport[GeneratorSupport["TryCatchStatements"] = 32] = "TryCatchStatements";
        GeneratorSupport[GeneratorSupport["ReturnTypeAttributes"] = 64] = "ReturnTypeAttributes";
        GeneratorSupport[GeneratorSupport["DeclareValueTypes"] = 128] = "DeclareValueTypes";
        GeneratorSupport[GeneratorSupport["DeclareEnums"] = 256] = "DeclareEnums";
        GeneratorSupport[GeneratorSupport["DeclareDelegates"] = 512] = "DeclareDelegates";
        GeneratorSupport[GeneratorSupport["DeclareInterfaces"] = 1024] = "DeclareInterfaces";
        GeneratorSupport[GeneratorSupport["DeclareEvents"] = 2048] = "DeclareEvents";
        GeneratorSupport[GeneratorSupport["AssemblyAttributes"] = 4096] = "AssemblyAttributes";
        GeneratorSupport[GeneratorSupport["ParameterAttributes"] = 8192] = "ParameterAttributes";
        GeneratorSupport[GeneratorSupport["ReferenceParameters"] = 16384] = "ReferenceParameters";
        GeneratorSupport[GeneratorSupport["ChainedConstructorArguments"] = 32768] = "ChainedConstructorArguments";
        GeneratorSupport[GeneratorSupport["NestedTypes"] = 65536] = "NestedTypes";
        GeneratorSupport[GeneratorSupport["MultipleInterfaceMembers"] = 131072] = "MultipleInterfaceMembers";
        GeneratorSupport[GeneratorSupport["PublicStaticMembers"] = 262144] = "PublicStaticMembers";
        GeneratorSupport[GeneratorSupport["ComplexExpressions"] = 524288] = "ComplexExpressions";
        GeneratorSupport[GeneratorSupport["Win32Resources"] = 1048576] = "Win32Resources";
        GeneratorSupport[GeneratorSupport["Resources"] = 2097152] = "Resources";
        GeneratorSupport[GeneratorSupport["PartialTypes"] = 4194304] = "PartialTypes";
        GeneratorSupport[GeneratorSupport["GenericTypeReference"] = 8388608] = "GenericTypeReference";
        GeneratorSupport[GeneratorSupport["GenericTypeDeclaration"] = 16777216] = "GenericTypeDeclaration";
        GeneratorSupport[GeneratorSupport["DeclareIndexerProperties"] = 33554432] = "DeclareIndexerProperties";
      })(GeneratorSupport = Compiler.GeneratorSupport || (Compiler.GeneratorSupport = {}));

      var LanguageOptions;

      (function (LanguageOptions) {
        LanguageOptions[LanguageOptions["None"] = 0] = "None";
        LanguageOptions[LanguageOptions["CaseInsensitive"] = 1] = "CaseInsensitive";
      })(LanguageOptions = Compiler.LanguageOptions || (Compiler.LanguageOptions = {}));
    })(Compiler = CodeDom.Compiler || (CodeDom.Compiler = {}));
  })(CodeDom = System.CodeDom || (System.CodeDom = {}));

  var Collections;

  (function (Collections) {
    var Concurrent;

    (function (Concurrent) {
      var EnumerablePartitionerOptions;

      (function (EnumerablePartitionerOptions) {
        EnumerablePartitionerOptions[EnumerablePartitionerOptions["None"] = 0] = "None";
        EnumerablePartitionerOptions[EnumerablePartitionerOptions["NoBuffering"] = 1] = "NoBuffering";
      })(EnumerablePartitionerOptions = Concurrent.EnumerablePartitionerOptions || (Concurrent.EnumerablePartitionerOptions = {}));
    })(Concurrent = Collections.Concurrent || (Collections.Concurrent = {}));

    var Generic;

    (function (Generic) {})(Generic = Collections.Generic || (Collections.Generic = {}));

    var ObjectModel;

    (function (ObjectModel) {})(ObjectModel = Collections.ObjectModel || (Collections.ObjectModel = {}));

    var Specialized;

    (function (Specialized) {
      var NotifyCollectionChangedAction;

      (function (NotifyCollectionChangedAction) {
        NotifyCollectionChangedAction[NotifyCollectionChangedAction["Add"] = 0] = "Add";
        NotifyCollectionChangedAction[NotifyCollectionChangedAction["Remove"] = 1] = "Remove";
        NotifyCollectionChangedAction[NotifyCollectionChangedAction["Replace"] = 2] = "Replace";
        NotifyCollectionChangedAction[NotifyCollectionChangedAction["Move"] = 3] = "Move";
        NotifyCollectionChangedAction[NotifyCollectionChangedAction["Reset"] = 4] = "Reset";
      })(NotifyCollectionChangedAction = Specialized.NotifyCollectionChangedAction || (Specialized.NotifyCollectionChangedAction = {}));
    })(Specialized = Collections.Specialized || (Collections.Specialized = {}));
  })(Collections = System.Collections || (System.Collections = {}));

  var ComponentModel;

  (function (ComponentModel) {
    var BindableSupport;

    (function (BindableSupport) {
      BindableSupport[BindableSupport["No"] = 0] = "No";
      BindableSupport[BindableSupport["Yes"] = 1] = "Yes";
      BindableSupport[BindableSupport["Default"] = 2] = "Default";
    })(BindableSupport = ComponentModel.BindableSupport || (ComponentModel.BindableSupport = {}));

    var BindingDirection;

    (function (BindingDirection) {
      BindingDirection[BindingDirection["OneWay"] = 0] = "OneWay";
      BindingDirection[BindingDirection["TwoWay"] = 1] = "TwoWay";
    })(BindingDirection = ComponentModel.BindingDirection || (ComponentModel.BindingDirection = {}));

    var CollectionChangeAction;

    (function (CollectionChangeAction) {
      CollectionChangeAction[CollectionChangeAction["Add"] = 1] = "Add";
      CollectionChangeAction[CollectionChangeAction["Remove"] = 2] = "Remove";
      CollectionChangeAction[CollectionChangeAction["Refresh"] = 3] = "Refresh";
    })(CollectionChangeAction = ComponentModel.CollectionChangeAction || (ComponentModel.CollectionChangeAction = {}));

    var DataObjectMethodType;

    (function (DataObjectMethodType) {
      DataObjectMethodType[DataObjectMethodType["Fill"] = 0] = "Fill";
      DataObjectMethodType[DataObjectMethodType["Select"] = 1] = "Select";
      DataObjectMethodType[DataObjectMethodType["Update"] = 2] = "Update";
      DataObjectMethodType[DataObjectMethodType["Insert"] = 3] = "Insert";
      DataObjectMethodType[DataObjectMethodType["Delete"] = 4] = "Delete";
    })(DataObjectMethodType = ComponentModel.DataObjectMethodType || (ComponentModel.DataObjectMethodType = {}));

    var DesignerSerializationVisibility;

    (function (DesignerSerializationVisibility) {
      DesignerSerializationVisibility[DesignerSerializationVisibility["Hidden"] = 0] = "Hidden";
      DesignerSerializationVisibility[DesignerSerializationVisibility["Visible"] = 1] = "Visible";
      DesignerSerializationVisibility[DesignerSerializationVisibility["Content"] = 2] = "Content";
    })(DesignerSerializationVisibility = ComponentModel.DesignerSerializationVisibility || (ComponentModel.DesignerSerializationVisibility = {}));

    var EditorBrowsableState;

    (function (EditorBrowsableState) {
      EditorBrowsableState[EditorBrowsableState["Always"] = 0] = "Always";
      EditorBrowsableState[EditorBrowsableState["Never"] = 1] = "Never";
      EditorBrowsableState[EditorBrowsableState["Advanced"] = 2] = "Advanced";
    })(EditorBrowsableState = ComponentModel.EditorBrowsableState || (ComponentModel.EditorBrowsableState = {}));

    var LicenseUsageMode;

    (function (LicenseUsageMode) {
      LicenseUsageMode[LicenseUsageMode["Runtime"] = 0] = "Runtime";
      LicenseUsageMode[LicenseUsageMode["Designtime"] = 1] = "Designtime";
    })(LicenseUsageMode = ComponentModel.LicenseUsageMode || (ComponentModel.LicenseUsageMode = {}));

    var ListChangedType;

    (function (ListChangedType) {
      ListChangedType[ListChangedType["Reset"] = 0] = "Reset";
      ListChangedType[ListChangedType["ItemAdded"] = 1] = "ItemAdded";
      ListChangedType[ListChangedType["ItemDeleted"] = 2] = "ItemDeleted";
      ListChangedType[ListChangedType["ItemMoved"] = 3] = "ItemMoved";
      ListChangedType[ListChangedType["ItemChanged"] = 4] = "ItemChanged";
      ListChangedType[ListChangedType["PropertyDescriptorAdded"] = 5] = "PropertyDescriptorAdded";
      ListChangedType[ListChangedType["PropertyDescriptorDeleted"] = 6] = "PropertyDescriptorDeleted";
      ListChangedType[ListChangedType["PropertyDescriptorChanged"] = 7] = "PropertyDescriptorChanged";
    })(ListChangedType = ComponentModel.ListChangedType || (ComponentModel.ListChangedType = {}));

    var ListSortDirection;

    (function (ListSortDirection) {
      ListSortDirection[ListSortDirection["Ascending"] = 0] = "Ascending";
      ListSortDirection[ListSortDirection["Descending"] = 1] = "Descending";
    })(ListSortDirection = ComponentModel.ListSortDirection || (ComponentModel.ListSortDirection = {}));

    var MaskedTextResultHint;

    (function (MaskedTextResultHint) {
      MaskedTextResultHint[MaskedTextResultHint["Unknown"] = 0] = "Unknown";
      MaskedTextResultHint[MaskedTextResultHint["CharacterEscaped"] = 1] = "CharacterEscaped";
      MaskedTextResultHint[MaskedTextResultHint["NoEffect"] = 2] = "NoEffect";
      MaskedTextResultHint[MaskedTextResultHint["SideEffect"] = 3] = "SideEffect";
      MaskedTextResultHint[MaskedTextResultHint["Success"] = 4] = "Success";
      MaskedTextResultHint[MaskedTextResultHint["AsciiCharacterExpected"] = -1] = "AsciiCharacterExpected";
      MaskedTextResultHint[MaskedTextResultHint["AlphanumericCharacterExpected"] = -2] = "AlphanumericCharacterExpected";
      MaskedTextResultHint[MaskedTextResultHint["DigitExpected"] = -3] = "DigitExpected";
      MaskedTextResultHint[MaskedTextResultHint["LetterExpected"] = -4] = "LetterExpected";
      MaskedTextResultHint[MaskedTextResultHint["SignedDigitExpected"] = -5] = "SignedDigitExpected";
      MaskedTextResultHint[MaskedTextResultHint["InvalidInput"] = -51] = "InvalidInput";
      MaskedTextResultHint[MaskedTextResultHint["PromptCharNotAllowed"] = -52] = "PromptCharNotAllowed";
      MaskedTextResultHint[MaskedTextResultHint["UnavailableEditPosition"] = -53] = "UnavailableEditPosition";
      MaskedTextResultHint[MaskedTextResultHint["NonEditPosition"] = -54] = "NonEditPosition";
      MaskedTextResultHint[MaskedTextResultHint["PositionOutOfRange"] = -55] = "PositionOutOfRange";
    })(MaskedTextResultHint = ComponentModel.MaskedTextResultHint || (ComponentModel.MaskedTextResultHint = {}));

    var ToolboxItemFilterType;

    (function (ToolboxItemFilterType) {
      ToolboxItemFilterType[ToolboxItemFilterType["Allow"] = 0] = "Allow";
      ToolboxItemFilterType[ToolboxItemFilterType["Custom"] = 1] = "Custom";
      ToolboxItemFilterType[ToolboxItemFilterType["Prevent"] = 2] = "Prevent";
      ToolboxItemFilterType[ToolboxItemFilterType["Require"] = 3] = "Require";
    })(ToolboxItemFilterType = ComponentModel.ToolboxItemFilterType || (ComponentModel.ToolboxItemFilterType = {}));

    var InheritanceLevel;

    (function (InheritanceLevel) {
      InheritanceLevel[InheritanceLevel["Inherited"] = 1] = "Inherited";
      InheritanceLevel[InheritanceLevel["InheritedReadOnly"] = 2] = "InheritedReadOnly";
      InheritanceLevel[InheritanceLevel["NotInherited"] = 3] = "NotInherited";
    })(InheritanceLevel = ComponentModel.InheritanceLevel || (ComponentModel.InheritanceLevel = {}));

    var PropertyTabScope;

    (function (PropertyTabScope) {
      PropertyTabScope[PropertyTabScope["Static"] = 0] = "Static";
      PropertyTabScope[PropertyTabScope["Global"] = 1] = "Global";
      PropertyTabScope[PropertyTabScope["Document"] = 2] = "Document";
      PropertyTabScope[PropertyTabScope["Component"] = 3] = "Component";
    })(PropertyTabScope = ComponentModel.PropertyTabScope || (ComponentModel.PropertyTabScope = {}));

    var RefreshProperties;

    (function (RefreshProperties) {
      RefreshProperties[RefreshProperties["None"] = 0] = "None";
      RefreshProperties[RefreshProperties["All"] = 1] = "All";
      RefreshProperties[RefreshProperties["Repaint"] = 2] = "Repaint";
    })(RefreshProperties = ComponentModel.RefreshProperties || (ComponentModel.RefreshProperties = {}));

    var Design;

    (function (Design) {
      var HelpContextType;

      (function (HelpContextType) {
        HelpContextType[HelpContextType["Ambient"] = 0] = "Ambient";
        HelpContextType[HelpContextType["Window"] = 1] = "Window";
        HelpContextType[HelpContextType["Selection"] = 2] = "Selection";
        HelpContextType[HelpContextType["ToolWindowSelection"] = 3] = "ToolWindowSelection";
      })(HelpContextType = Design.HelpContextType || (Design.HelpContextType = {}));

      var HelpKeywordType;

      (function (HelpKeywordType) {
        HelpKeywordType[HelpKeywordType["F1Keyword"] = 0] = "F1Keyword";
        HelpKeywordType[HelpKeywordType["GeneralKeyword"] = 1] = "GeneralKeyword";
        HelpKeywordType[HelpKeywordType["FilterKeyword"] = 2] = "FilterKeyword";
      })(HelpKeywordType = Design.HelpKeywordType || (Design.HelpKeywordType = {}));

      var SelectionTypes;

      (function (SelectionTypes) {
        SelectionTypes[SelectionTypes["Auto"] = 1] = "Auto";
        SelectionTypes[SelectionTypes["Normal"] = 1] = "Normal";
        SelectionTypes[SelectionTypes["Replace"] = 2] = "Replace";
        SelectionTypes[SelectionTypes["MouseDown"] = 4] = "MouseDown";
        SelectionTypes[SelectionTypes["MouseUp"] = 8] = "MouseUp";
        SelectionTypes[SelectionTypes["Click"] = 16] = "Click";
        SelectionTypes[SelectionTypes["Primary"] = 16] = "Primary";
        SelectionTypes[SelectionTypes["Toggle"] = 32] = "Toggle";
        SelectionTypes[SelectionTypes["Add"] = 64] = "Add";
        SelectionTypes[SelectionTypes["Remove"] = 128] = "Remove";
        SelectionTypes[SelectionTypes["Valid"] = 31] = "Valid";
      })(SelectionTypes = Design.SelectionTypes || (Design.SelectionTypes = {}));

      var ViewTechnology;

      (function (ViewTechnology) {
        ViewTechnology[ViewTechnology["Passthrough"] = 0] = "Passthrough";
        ViewTechnology[ViewTechnology["WindowsForms"] = 1] = "WindowsForms";
        ViewTechnology[ViewTechnology["Default"] = 2] = "Default";
      })(ViewTechnology = Design.ViewTechnology || (Design.ViewTechnology = {}));

      var Serialization;

      (function (Serialization) {})(Serialization = Design.Serialization || (Design.Serialization = {}));
    })(Design = ComponentModel.Design || (ComponentModel.Design = {}));
  })(ComponentModel = System.ComponentModel || (System.ComponentModel = {}));

  var Deployment;

  (function (Deployment) {
    var Internal;

    (function (Internal) {})(Internal = Deployment.Internal || (Deployment.Internal = {}));
  })(Deployment = System.Deployment || (System.Deployment = {}));

  var Diagnostics;

  (function (Diagnostics) {
    var DebuggerBrowsableState;

    (function (DebuggerBrowsableState) {
      DebuggerBrowsableState[DebuggerBrowsableState["Never"] = 0] = "Never";
      DebuggerBrowsableState[DebuggerBrowsableState["Collapsed"] = 2] = "Collapsed";
      DebuggerBrowsableState[DebuggerBrowsableState["RootHidden"] = 3] = "RootHidden";
    })(DebuggerBrowsableState = Diagnostics.DebuggerBrowsableState || (Diagnostics.DebuggerBrowsableState = {}));

    var TraceLogRetentionOption;

    (function (TraceLogRetentionOption) {
      TraceLogRetentionOption[TraceLogRetentionOption["LimitedCircularFiles"] = 1] = "LimitedCircularFiles";
      TraceLogRetentionOption[TraceLogRetentionOption["LimitedSequentialFiles"] = 3] = "LimitedSequentialFiles";
      TraceLogRetentionOption[TraceLogRetentionOption["SingleFileBoundedSize"] = 4] = "SingleFileBoundedSize";
      TraceLogRetentionOption[TraceLogRetentionOption["SingleFileUnboundedSize"] = 2] = "SingleFileUnboundedSize";
      TraceLogRetentionOption[TraceLogRetentionOption["UnlimitedSequentialFiles"] = 0] = "UnlimitedSequentialFiles";
    })(TraceLogRetentionOption = Diagnostics.TraceLogRetentionOption || (Diagnostics.TraceLogRetentionOption = {}));

    var SourceLevels;

    (function (SourceLevels) {
      SourceLevels[SourceLevels["Off"] = 0] = "Off";
      SourceLevels[SourceLevels["Critical"] = 1] = "Critical";
      SourceLevels[SourceLevels["Error"] = 3] = "Error";
      SourceLevels[SourceLevels["Warning"] = 7] = "Warning";
      SourceLevels[SourceLevels["Information"] = 15] = "Information";
      SourceLevels[SourceLevels["Verbose"] = 31] = "Verbose";
      SourceLevels[SourceLevels["ActivityTracing"] = 65280] = "ActivityTracing";
      SourceLevels[SourceLevels["All"] = -1] = "All";
    })(SourceLevels = Diagnostics.SourceLevels || (Diagnostics.SourceLevels = {}));

    var TraceEventType;

    (function (TraceEventType) {
      TraceEventType[TraceEventType["Critical"] = 1] = "Critical";
      TraceEventType[TraceEventType["Error"] = 2] = "Error";
      TraceEventType[TraceEventType["Warning"] = 4] = "Warning";
      TraceEventType[TraceEventType["Information"] = 8] = "Information";
      TraceEventType[TraceEventType["Verbose"] = 16] = "Verbose";
      TraceEventType[TraceEventType["Start"] = 256] = "Start";
      TraceEventType[TraceEventType["Stop"] = 512] = "Stop";
      TraceEventType[TraceEventType["Suspend"] = 1024] = "Suspend";
      TraceEventType[TraceEventType["Resume"] = 2048] = "Resume";
      TraceEventType[TraceEventType["Transfer"] = 4096] = "Transfer";
    })(TraceEventType = Diagnostics.TraceEventType || (Diagnostics.TraceEventType = {}));

    var TraceLevel;

    (function (TraceLevel) {
      TraceLevel[TraceLevel["Off"] = 0] = "Off";
      TraceLevel[TraceLevel["Error"] = 1] = "Error";
      TraceLevel[TraceLevel["Warning"] = 2] = "Warning";
      TraceLevel[TraceLevel["Info"] = 3] = "Info";
      TraceLevel[TraceLevel["Verbose"] = 4] = "Verbose";
    })(TraceLevel = Diagnostics.TraceLevel || (Diagnostics.TraceLevel = {}));

    var TraceOptions;

    (function (TraceOptions) {
      TraceOptions[TraceOptions["None"] = 0] = "None";
      TraceOptions[TraceOptions["LogicalOperationStack"] = 1] = "LogicalOperationStack";
      TraceOptions[TraceOptions["DateTime"] = 2] = "DateTime";
      TraceOptions[TraceOptions["Timestamp"] = 4] = "Timestamp";
      TraceOptions[TraceOptions["ProcessId"] = 8] = "ProcessId";
      TraceOptions[TraceOptions["ThreadId"] = 16] = "ThreadId";
      TraceOptions[TraceOptions["Callstack"] = 32] = "Callstack";
    })(TraceOptions = Diagnostics.TraceOptions || (Diagnostics.TraceOptions = {}));

    var EventLogEntryType;

    (function (EventLogEntryType) {
      EventLogEntryType[EventLogEntryType["Error"] = 1] = "Error";
      EventLogEntryType[EventLogEntryType["Warning"] = 2] = "Warning";
      EventLogEntryType[EventLogEntryType["Information"] = 4] = "Information";
      EventLogEntryType[EventLogEntryType["SuccessAudit"] = 8] = "SuccessAudit";
      EventLogEntryType[EventLogEntryType["FailureAudit"] = 16] = "FailureAudit";
    })(EventLogEntryType = Diagnostics.EventLogEntryType || (Diagnostics.EventLogEntryType = {}));

    var EventLogPermissionAccess;

    (function (EventLogPermissionAccess) {
      EventLogPermissionAccess[EventLogPermissionAccess["None"] = 0] = "None";
      EventLogPermissionAccess[EventLogPermissionAccess["Browse"] = 2] = "Browse";
      EventLogPermissionAccess[EventLogPermissionAccess["Instrument"] = 6] = "Instrument";
      EventLogPermissionAccess[EventLogPermissionAccess["Audit"] = 10] = "Audit";
      EventLogPermissionAccess[EventLogPermissionAccess["Write"] = 16] = "Write";
      EventLogPermissionAccess[EventLogPermissionAccess["Administer"] = 48] = "Administer";
    })(EventLogPermissionAccess = Diagnostics.EventLogPermissionAccess || (Diagnostics.EventLogPermissionAccess = {}));

    var OverflowAction;

    (function (OverflowAction) {
      OverflowAction[OverflowAction["DoNotOverwrite"] = -1] = "DoNotOverwrite";
      OverflowAction[OverflowAction["OverwriteAsNeeded"] = 0] = "OverwriteAsNeeded";
      OverflowAction[OverflowAction["OverwriteOlder"] = 1] = "OverwriteOlder";
    })(OverflowAction = Diagnostics.OverflowAction || (Diagnostics.OverflowAction = {}));

    var PerformanceCounterCategoryType;

    (function (PerformanceCounterCategoryType) {
      PerformanceCounterCategoryType[PerformanceCounterCategoryType["SingleInstance"] = 0] = "SingleInstance";
      PerformanceCounterCategoryType[PerformanceCounterCategoryType["MultiInstance"] = 1] = "MultiInstance";
      PerformanceCounterCategoryType[PerformanceCounterCategoryType["Unknown"] = -1] = "Unknown";
    })(PerformanceCounterCategoryType = Diagnostics.PerformanceCounterCategoryType || (Diagnostics.PerformanceCounterCategoryType = {}));

    var PerformanceCounterInstanceLifetime;

    (function (PerformanceCounterInstanceLifetime) {
      PerformanceCounterInstanceLifetime[PerformanceCounterInstanceLifetime["Global"] = 0] = "Global";
      PerformanceCounterInstanceLifetime[PerformanceCounterInstanceLifetime["Process"] = 1] = "Process";
    })(PerformanceCounterInstanceLifetime = Diagnostics.PerformanceCounterInstanceLifetime || (Diagnostics.PerformanceCounterInstanceLifetime = {}));

    var PerformanceCounterPermissionAccess;

    (function (PerformanceCounterPermissionAccess) {
      PerformanceCounterPermissionAccess[PerformanceCounterPermissionAccess["None"] = 0] = "None";
      PerformanceCounterPermissionAccess[PerformanceCounterPermissionAccess["Browse"] = 1] = "Browse";
      PerformanceCounterPermissionAccess[PerformanceCounterPermissionAccess["Read"] = 1] = "Read";
      PerformanceCounterPermissionAccess[PerformanceCounterPermissionAccess["Write"] = 2] = "Write";
      PerformanceCounterPermissionAccess[PerformanceCounterPermissionAccess["Instrument"] = 3] = "Instrument";
      PerformanceCounterPermissionAccess[PerformanceCounterPermissionAccess["Administer"] = 7] = "Administer";
    })(PerformanceCounterPermissionAccess = Diagnostics.PerformanceCounterPermissionAccess || (Diagnostics.PerformanceCounterPermissionAccess = {}));

    var PerformanceCounterType;

    (function (PerformanceCounterType) {
      PerformanceCounterType[PerformanceCounterType["NumberOfItemsHEX32"] = 0] = "NumberOfItemsHEX32";
      PerformanceCounterType[PerformanceCounterType["NumberOfItemsHEX64"] = 256] = "NumberOfItemsHEX64";
      PerformanceCounterType[PerformanceCounterType["NumberOfItems32"] = 65536] = "NumberOfItems32";
      PerformanceCounterType[PerformanceCounterType["NumberOfItems64"] = 65792] = "NumberOfItems64";
      PerformanceCounterType[PerformanceCounterType["CounterDelta32"] = 4195328] = "CounterDelta32";
      PerformanceCounterType[PerformanceCounterType["CounterDelta64"] = 4195584] = "CounterDelta64";
      PerformanceCounterType[PerformanceCounterType["SampleCounter"] = 4260864] = "SampleCounter";
      PerformanceCounterType[PerformanceCounterType["CountPerTimeInterval32"] = 4523008] = "CountPerTimeInterval32";
      PerformanceCounterType[PerformanceCounterType["CountPerTimeInterval64"] = 4523264] = "CountPerTimeInterval64";
      PerformanceCounterType[PerformanceCounterType["RateOfCountsPerSecond32"] = 272696320] = "RateOfCountsPerSecond32";
      PerformanceCounterType[PerformanceCounterType["RateOfCountsPerSecond64"] = 272696576] = "RateOfCountsPerSecond64";
      PerformanceCounterType[PerformanceCounterType["RawFraction"] = 537003008] = "RawFraction";
      PerformanceCounterType[PerformanceCounterType["CounterTimer"] = 541132032] = "CounterTimer";
      PerformanceCounterType[PerformanceCounterType["Timer100Ns"] = 542180608] = "Timer100Ns";
      PerformanceCounterType[PerformanceCounterType["SampleFraction"] = 549585920] = "SampleFraction";
      PerformanceCounterType[PerformanceCounterType["CounterTimerInverse"] = 557909248] = "CounterTimerInverse";
      PerformanceCounterType[PerformanceCounterType["Timer100NsInverse"] = 558957824] = "Timer100NsInverse";
      PerformanceCounterType[PerformanceCounterType["CounterMultiTimer"] = 574686464] = "CounterMultiTimer";
      PerformanceCounterType[PerformanceCounterType["CounterMultiTimer100Ns"] = 575735040] = "CounterMultiTimer100Ns";
      PerformanceCounterType[PerformanceCounterType["CounterMultiTimerInverse"] = 591463680] = "CounterMultiTimerInverse";
      PerformanceCounterType[PerformanceCounterType["CounterMultiTimer100NsInverse"] = 592512256] = "CounterMultiTimer100NsInverse";
      PerformanceCounterType[PerformanceCounterType["AverageTimer32"] = 805438464] = "AverageTimer32";
      PerformanceCounterType[PerformanceCounterType["ElapsedTime"] = 807666944] = "ElapsedTime";
      PerformanceCounterType[PerformanceCounterType["AverageCount64"] = 1073874176] = "AverageCount64";
      PerformanceCounterType[PerformanceCounterType["SampleBase"] = 1073939457] = "SampleBase";
      PerformanceCounterType[PerformanceCounterType["AverageBase"] = 1073939458] = "AverageBase";
      PerformanceCounterType[PerformanceCounterType["RawBase"] = 1073939459] = "RawBase";
      PerformanceCounterType[PerformanceCounterType["CounterMultiBase"] = 1107494144] = "CounterMultiBase";
    })(PerformanceCounterType = Diagnostics.PerformanceCounterType || (Diagnostics.PerformanceCounterType = {}));

    var ProcessPriorityClass;

    (function (ProcessPriorityClass) {
      ProcessPriorityClass[ProcessPriorityClass["AboveNormal"] = 32768] = "AboveNormal";
      ProcessPriorityClass[ProcessPriorityClass["BelowNormal"] = 16384] = "BelowNormal";
      ProcessPriorityClass[ProcessPriorityClass["High"] = 128] = "High";
      ProcessPriorityClass[ProcessPriorityClass["Idle"] = 64] = "Idle";
      ProcessPriorityClass[ProcessPriorityClass["Normal"] = 32] = "Normal";
      ProcessPriorityClass[ProcessPriorityClass["RealTime"] = 256] = "RealTime";
    })(ProcessPriorityClass = Diagnostics.ProcessPriorityClass || (Diagnostics.ProcessPriorityClass = {}));

    var ProcessWindowStyle;

    (function (ProcessWindowStyle) {
      ProcessWindowStyle[ProcessWindowStyle["Hidden"] = 1] = "Hidden";
      ProcessWindowStyle[ProcessWindowStyle["Maximized"] = 3] = "Maximized";
      ProcessWindowStyle[ProcessWindowStyle["Minimized"] = 2] = "Minimized";
      ProcessWindowStyle[ProcessWindowStyle["Normal"] = 0] = "Normal";
    })(ProcessWindowStyle = Diagnostics.ProcessWindowStyle || (Diagnostics.ProcessWindowStyle = {}));

    var ThreadPriorityLevel;

    (function (ThreadPriorityLevel) {
      ThreadPriorityLevel[ThreadPriorityLevel["AboveNormal"] = 1] = "AboveNormal";
      ThreadPriorityLevel[ThreadPriorityLevel["BelowNormal"] = -1] = "BelowNormal";
      ThreadPriorityLevel[ThreadPriorityLevel["Highest"] = 2] = "Highest";
      ThreadPriorityLevel[ThreadPriorityLevel["Idle"] = -15] = "Idle";
      ThreadPriorityLevel[ThreadPriorityLevel["Lowest"] = -2] = "Lowest";
      ThreadPriorityLevel[ThreadPriorityLevel["Normal"] = 0] = "Normal";
      ThreadPriorityLevel[ThreadPriorityLevel["TimeCritical"] = 15] = "TimeCritical";
    })(ThreadPriorityLevel = Diagnostics.ThreadPriorityLevel || (Diagnostics.ThreadPriorityLevel = {}));

    var ThreadState;

    (function (ThreadState) {
      ThreadState[ThreadState["Initialized"] = 0] = "Initialized";
      ThreadState[ThreadState["Ready"] = 1] = "Ready";
      ThreadState[ThreadState["Running"] = 2] = "Running";
      ThreadState[ThreadState["Standby"] = 3] = "Standby";
      ThreadState[ThreadState["Terminated"] = 4] = "Terminated";
      ThreadState[ThreadState["Transition"] = 6] = "Transition";
      ThreadState[ThreadState["Unknown"] = 7] = "Unknown";
      ThreadState[ThreadState["Wait"] = 5] = "Wait";
    })(ThreadState = Diagnostics.ThreadState || (Diagnostics.ThreadState = {}));

    var ThreadWaitReason;

    (function (ThreadWaitReason) {
      ThreadWaitReason[ThreadWaitReason["EventPairHigh"] = 7] = "EventPairHigh";
      ThreadWaitReason[ThreadWaitReason["EventPairLow"] = 8] = "EventPairLow";
      ThreadWaitReason[ThreadWaitReason["ExecutionDelay"] = 4] = "ExecutionDelay";
      ThreadWaitReason[ThreadWaitReason["Executive"] = 0] = "Executive";
      ThreadWaitReason[ThreadWaitReason["FreePage"] = 1] = "FreePage";
      ThreadWaitReason[ThreadWaitReason["LpcReceive"] = 9] = "LpcReceive";
      ThreadWaitReason[ThreadWaitReason["LpcReply"] = 10] = "LpcReply";
      ThreadWaitReason[ThreadWaitReason["PageIn"] = 2] = "PageIn";
      ThreadWaitReason[ThreadWaitReason["PageOut"] = 12] = "PageOut";
      ThreadWaitReason[ThreadWaitReason["Suspended"] = 5] = "Suspended";
      ThreadWaitReason[ThreadWaitReason["SystemAllocation"] = 3] = "SystemAllocation";
      ThreadWaitReason[ThreadWaitReason["Unknown"] = 13] = "Unknown";
      ThreadWaitReason[ThreadWaitReason["UserRequest"] = 6] = "UserRequest";
      ThreadWaitReason[ThreadWaitReason["VirtualMemory"] = 11] = "VirtualMemory";
    })(ThreadWaitReason = Diagnostics.ThreadWaitReason || (Diagnostics.ThreadWaitReason = {}));

    var Contracts;

    (function (Contracts) {
      var ContractFailureKind;

      (function (ContractFailureKind) {
        ContractFailureKind[ContractFailureKind["Precondition"] = 0] = "Precondition";
        ContractFailureKind[ContractFailureKind["Postcondition"] = 1] = "Postcondition";
        ContractFailureKind[ContractFailureKind["PostconditionOnException"] = 2] = "PostconditionOnException";
        ContractFailureKind[ContractFailureKind["Invariant"] = 3] = "Invariant";
        ContractFailureKind[ContractFailureKind["Assert"] = 4] = "Assert";
        ContractFailureKind[ContractFailureKind["Assume"] = 5] = "Assume";
      })(ContractFailureKind = Contracts.ContractFailureKind || (Contracts.ContractFailureKind = {}));

      var Internal;

      (function (Internal) {})(Internal = Contracts.Internal || (Contracts.Internal = {}));
    })(Contracts = Diagnostics.Contracts || (Diagnostics.Contracts = {}));

    var Eventing;

    (function (Eventing) {
      var EventProvider_WriteEventErrorCode;

      (function (EventProvider_WriteEventErrorCode) {
        EventProvider_WriteEventErrorCode[EventProvider_WriteEventErrorCode["EventTooBig"] = 2] = "EventTooBig";
        EventProvider_WriteEventErrorCode[EventProvider_WriteEventErrorCode["NoError"] = 0] = "NoError";
        EventProvider_WriteEventErrorCode[EventProvider_WriteEventErrorCode["NoFreeBuffers"] = 1] = "NoFreeBuffers";
      })(EventProvider_WriteEventErrorCode = Eventing.EventProvider_WriteEventErrorCode || (Eventing.EventProvider_WriteEventErrorCode = {}));

      var Reader;

      (function (Reader) {
        var SessionAuthentication;

        (function (SessionAuthentication) {
          SessionAuthentication[SessionAuthentication["Default"] = 0] = "Default";
          SessionAuthentication[SessionAuthentication["Kerberos"] = 2] = "Kerberos";
          SessionAuthentication[SessionAuthentication["Negotiate"] = 1] = "Negotiate";
          SessionAuthentication[SessionAuthentication["Ntlm"] = 3] = "Ntlm";
        })(SessionAuthentication = Reader.SessionAuthentication || (Reader.SessionAuthentication = {}));

        var PathType;

        (function (PathType) {
          PathType[PathType["FilePath"] = 2] = "FilePath";
          PathType[PathType["LogName"] = 1] = "LogName";
        })(PathType = Reader.PathType || (Reader.PathType = {}));

        var EventLogIsolation;

        (function (EventLogIsolation) {
          EventLogIsolation[EventLogIsolation["Application"] = 0] = "Application";
          EventLogIsolation[EventLogIsolation["Custom"] = 2] = "Custom";
          EventLogIsolation[EventLogIsolation["System"] = 1] = "System";
        })(EventLogIsolation = Reader.EventLogIsolation || (Reader.EventLogIsolation = {}));

        var EventLogMode;

        (function (EventLogMode) {
          EventLogMode[EventLogMode["AutoBackup"] = 1] = "AutoBackup";
          EventLogMode[EventLogMode["Circular"] = 0] = "Circular";
          EventLogMode[EventLogMode["Retain"] = 2] = "Retain";
        })(EventLogMode = Reader.EventLogMode || (Reader.EventLogMode = {}));

        var EventLogType;

        (function (EventLogType) {
          EventLogType[EventLogType["Administrative"] = 0] = "Administrative";
          EventLogType[EventLogType["Analytical"] = 2] = "Analytical";
          EventLogType[EventLogType["Debug"] = 3] = "Debug";
          EventLogType[EventLogType["Operational"] = 1] = "Operational";
        })(EventLogType = Reader.EventLogType || (Reader.EventLogType = {}));

        var StandardEventKeywords;

        (function (StandardEventKeywords) {
          StandardEventKeywords[StandardEventKeywords["AuditFailure"] = 4503599627370496] = "AuditFailure";
          StandardEventKeywords[StandardEventKeywords["AuditSuccess"] = 9007199254740992] = "AuditSuccess";
          StandardEventKeywords[StandardEventKeywords["CorrelationHint"] = 4503599627370496] = "CorrelationHint";
          StandardEventKeywords[StandardEventKeywords["CorrelationHint2"] = 18014398509481984] = "CorrelationHint2";
          StandardEventKeywords[StandardEventKeywords["EventLogClassic"] = 36028797018963970] = "EventLogClassic";
          StandardEventKeywords[StandardEventKeywords["None"] = 0] = "None";
          StandardEventKeywords[StandardEventKeywords["ResponseTime"] = 281474976710656] = "ResponseTime";
          StandardEventKeywords[StandardEventKeywords["Sqm"] = 2251799813685248] = "Sqm";
          StandardEventKeywords[StandardEventKeywords["WdiContext"] = 562949953421312] = "WdiContext";
          StandardEventKeywords[StandardEventKeywords["WdiDiagnostic"] = 1125899906842624] = "WdiDiagnostic";
        })(StandardEventKeywords = Reader.StandardEventKeywords || (Reader.StandardEventKeywords = {}));

        var StandardEventLevel;

        (function (StandardEventLevel) {
          StandardEventLevel[StandardEventLevel["Critical"] = 1] = "Critical";
          StandardEventLevel[StandardEventLevel["Error"] = 2] = "Error";
          StandardEventLevel[StandardEventLevel["Informational"] = 4] = "Informational";
          StandardEventLevel[StandardEventLevel["LogAlways"] = 0] = "LogAlways";
          StandardEventLevel[StandardEventLevel["Verbose"] = 5] = "Verbose";
          StandardEventLevel[StandardEventLevel["Warning"] = 3] = "Warning";
        })(StandardEventLevel = Reader.StandardEventLevel || (Reader.StandardEventLevel = {}));

        var StandardEventOpcode;

        (function (StandardEventOpcode) {
          StandardEventOpcode[StandardEventOpcode["DataCollectionStart"] = 3] = "DataCollectionStart";
          StandardEventOpcode[StandardEventOpcode["DataCollectionStop"] = 4] = "DataCollectionStop";
          StandardEventOpcode[StandardEventOpcode["Extension"] = 5] = "Extension";
          StandardEventOpcode[StandardEventOpcode["Info"] = 0] = "Info";
          StandardEventOpcode[StandardEventOpcode["Receive"] = 240] = "Receive";
          StandardEventOpcode[StandardEventOpcode["Reply"] = 6] = "Reply";
          StandardEventOpcode[StandardEventOpcode["Resume"] = 7] = "Resume";
          StandardEventOpcode[StandardEventOpcode["Send"] = 9] = "Send";
          StandardEventOpcode[StandardEventOpcode["Start"] = 1] = "Start";
          StandardEventOpcode[StandardEventOpcode["Stop"] = 2] = "Stop";
          StandardEventOpcode[StandardEventOpcode["Suspend"] = 8] = "Suspend";
        })(StandardEventOpcode = Reader.StandardEventOpcode || (Reader.StandardEventOpcode = {}));

        var StandardEventTask;

        (function (StandardEventTask) {
          StandardEventTask[StandardEventTask["None"] = 0] = "None";
        })(StandardEventTask = Reader.StandardEventTask || (Reader.StandardEventTask = {}));
      })(Reader = Eventing.Reader || (Eventing.Reader = {}));
    })(Eventing = Diagnostics.Eventing || (Diagnostics.Eventing = {}));

    var PerformanceData;

    (function (PerformanceData) {
      var CounterSetInstanceType;

      (function (CounterSetInstanceType) {
        CounterSetInstanceType[CounterSetInstanceType["GlobalAggregate"] = 4] = "GlobalAggregate";
        CounterSetInstanceType[CounterSetInstanceType["GlobalAggregateWithHistory"] = 11] = "GlobalAggregateWithHistory";
        CounterSetInstanceType[CounterSetInstanceType["InstanceAggregate"] = 22] = "InstanceAggregate";
        CounterSetInstanceType[CounterSetInstanceType["Multiple"] = 2] = "Multiple";
        CounterSetInstanceType[CounterSetInstanceType["MultipleAggregate"] = 6] = "MultipleAggregate";
        CounterSetInstanceType[CounterSetInstanceType["Single"] = 0] = "Single";
      })(CounterSetInstanceType = PerformanceData.CounterSetInstanceType || (PerformanceData.CounterSetInstanceType = {}));

      var CounterType;

      (function (CounterType) {
        CounterType[CounterType["AverageBase"] = 1073939458] = "AverageBase";
        CounterType[CounterType["AverageCount64"] = 1073874176] = "AverageCount64";
        CounterType[CounterType["AverageTimer32"] = 805438464] = "AverageTimer32";
        CounterType[CounterType["Delta32"] = 4195328] = "Delta32";
        CounterType[CounterType["Delta64"] = 4195584] = "Delta64";
        CounterType[CounterType["ElapsedTime"] = 807666944] = "ElapsedTime";
        CounterType[CounterType["LargeQueueLength"] = 4523264] = "LargeQueueLength";
        CounterType[CounterType["MultiTimerBase"] = 1107494144] = "MultiTimerBase";
        CounterType[CounterType["MultiTimerPercentageActive"] = 574686464] = "MultiTimerPercentageActive";
        CounterType[CounterType["MultiTimerPercentageActive100Ns"] = 575735040] = "MultiTimerPercentageActive100Ns";
        CounterType[CounterType["MultiTimerPercentageNotActive"] = 591463680] = "MultiTimerPercentageNotActive";
        CounterType[CounterType["MultiTimerPercentageNotActive100Ns"] = 592512256] = "MultiTimerPercentageNotActive100Ns";
        CounterType[CounterType["ObjectSpecificTimer"] = 543229184] = "ObjectSpecificTimer";
        CounterType[CounterType["PercentageActive"] = 541132032] = "PercentageActive";
        CounterType[CounterType["PercentageActive100Ns"] = 542180608] = "PercentageActive100Ns";
        CounterType[CounterType["PercentageNotActive"] = 557909248] = "PercentageNotActive";
        CounterType[CounterType["PercentageNotActive100Ns"] = 558957824] = "PercentageNotActive100Ns";
        CounterType[CounterType["PrecisionObjectSpecificTimer"] = 543622400] = "PrecisionObjectSpecificTimer";
        CounterType[CounterType["PrecisionSystemTimer"] = 541525248] = "PrecisionSystemTimer";
        CounterType[CounterType["PrecisionTimer100Ns"] = 542573824] = "PrecisionTimer100Ns";
        CounterType[CounterType["QueueLength"] = 4523008] = "QueueLength";
        CounterType[CounterType["QueueLength100Ns"] = 5571840] = "QueueLength100Ns";
        CounterType[CounterType["QueueLengthObjectTime"] = 6620416] = "QueueLengthObjectTime";
        CounterType[CounterType["RateOfCountPerSecond32"] = 272696320] = "RateOfCountPerSecond32";
        CounterType[CounterType["RateOfCountPerSecond64"] = 272696576] = "RateOfCountPerSecond64";
        CounterType[CounterType["RawBase32"] = 1073939459] = "RawBase32";
        CounterType[CounterType["RawBase64"] = 1073939712] = "RawBase64";
        CounterType[CounterType["RawData32"] = 65536] = "RawData32";
        CounterType[CounterType["RawData64"] = 65792] = "RawData64";
        CounterType[CounterType["RawDataHex32"] = 0] = "RawDataHex32";
        CounterType[CounterType["RawDataHex64"] = 256] = "RawDataHex64";
        CounterType[CounterType["RawFraction32"] = 537003008] = "RawFraction32";
        CounterType[CounterType["RawFraction64"] = 537003264] = "RawFraction64";
        CounterType[CounterType["SampleBase"] = 1073939457] = "SampleBase";
        CounterType[CounterType["SampleCounter"] = 4260864] = "SampleCounter";
        CounterType[CounterType["SampleFraction"] = 549585920] = "SampleFraction";
      })(CounterType = PerformanceData.CounterType || (PerformanceData.CounterType = {}));
    })(PerformanceData = Diagnostics.PerformanceData || (Diagnostics.PerformanceData = {}));

    var SymbolStore;

    (function (SymbolStore) {
      var SymAddressKind;

      (function (SymAddressKind) {
        SymAddressKind[SymAddressKind["ILOffset"] = 1] = "ILOffset";
        SymAddressKind[SymAddressKind["NativeRVA"] = 2] = "NativeRVA";
        SymAddressKind[SymAddressKind["NativeRegister"] = 3] = "NativeRegister";
        SymAddressKind[SymAddressKind["NativeRegisterRelative"] = 4] = "NativeRegisterRelative";
        SymAddressKind[SymAddressKind["NativeOffset"] = 5] = "NativeOffset";
        SymAddressKind[SymAddressKind["NativeRegisterRegister"] = 6] = "NativeRegisterRegister";
        SymAddressKind[SymAddressKind["NativeRegisterStack"] = 7] = "NativeRegisterStack";
        SymAddressKind[SymAddressKind["NativeStackRegister"] = 8] = "NativeStackRegister";
        SymAddressKind[SymAddressKind["BitField"] = 9] = "BitField";
        SymAddressKind[SymAddressKind["NativeSectionOffset"] = 10] = "NativeSectionOffset";
      })(SymAddressKind = SymbolStore.SymAddressKind || (SymbolStore.SymAddressKind = {}));
    })(SymbolStore = Diagnostics.SymbolStore || (Diagnostics.SymbolStore = {}));

    var Tracing;

    (function (Tracing) {
      var EventFieldTags;

      (function (EventFieldTags) {
        EventFieldTags[EventFieldTags["None"] = 0] = "None";
      })(EventFieldTags = Tracing.EventFieldTags || (Tracing.EventFieldTags = {}));

      var EventFieldFormat;

      (function (EventFieldFormat) {
        EventFieldFormat[EventFieldFormat["Default"] = 0] = "Default";
        EventFieldFormat[EventFieldFormat["String"] = 2] = "String";
        EventFieldFormat[EventFieldFormat["Boolean"] = 3] = "Boolean";
        EventFieldFormat[EventFieldFormat["Hexadecimal"] = 4] = "Hexadecimal";
        EventFieldFormat[EventFieldFormat["Xml"] = 11] = "Xml";
        EventFieldFormat[EventFieldFormat["Json"] = 12] = "Json";
        EventFieldFormat[EventFieldFormat["HResult"] = 15] = "HResult";
      })(EventFieldFormat = Tracing.EventFieldFormat || (Tracing.EventFieldFormat = {}));

      var EventTags;

      (function (EventTags) {
        EventTags[EventTags["None"] = 0] = "None";
      })(EventTags = Tracing.EventTags || (Tracing.EventTags = {}));

      var EventActivityOptions;

      (function (EventActivityOptions) {
        EventActivityOptions[EventActivityOptions["None"] = 0] = "None";
        EventActivityOptions[EventActivityOptions["Disable"] = 2] = "Disable";
        EventActivityOptions[EventActivityOptions["Recursive"] = 4] = "Recursive";
        EventActivityOptions[EventActivityOptions["Detachable"] = 8] = "Detachable";
      })(EventActivityOptions = Tracing.EventActivityOptions || (Tracing.EventActivityOptions = {}));

      var EventSourceSettings;

      (function (EventSourceSettings) {
        EventSourceSettings[EventSourceSettings["Default"] = 0] = "Default";
        EventSourceSettings[EventSourceSettings["ThrowOnEventWriteErrors"] = 1] = "ThrowOnEventWriteErrors";
        EventSourceSettings[EventSourceSettings["EtwManifestEventFormat"] = 4] = "EtwManifestEventFormat";
        EventSourceSettings[EventSourceSettings["EtwSelfDescribingEventFormat"] = 8] = "EtwSelfDescribingEventFormat";
      })(EventSourceSettings = Tracing.EventSourceSettings || (Tracing.EventSourceSettings = {}));

      var EventCommand;

      (function (EventCommand) {
        EventCommand[EventCommand["Update"] = 0] = "Update";
        EventCommand[EventCommand["SendManifest"] = -1] = "SendManifest";
        EventCommand[EventCommand["Enable"] = -2] = "Enable";
        EventCommand[EventCommand["Disable"] = -3] = "Disable";
      })(EventCommand = Tracing.EventCommand || (Tracing.EventCommand = {}));

      var EventManifestOptions;

      (function (EventManifestOptions) {
        EventManifestOptions[EventManifestOptions["None"] = 0] = "None";
        EventManifestOptions[EventManifestOptions["Strict"] = 1] = "Strict";
        EventManifestOptions[EventManifestOptions["AllCultures"] = 2] = "AllCultures";
        EventManifestOptions[EventManifestOptions["OnlyIfNeededForRegistration"] = 4] = "OnlyIfNeededForRegistration";
        EventManifestOptions[EventManifestOptions["AllowEventSourceOverride"] = 8] = "AllowEventSourceOverride";
      })(EventManifestOptions = Tracing.EventManifestOptions || (Tracing.EventManifestOptions = {}));

      var EventLevel;

      (function (EventLevel) {
        EventLevel[EventLevel["LogAlways"] = 0] = "LogAlways";
        EventLevel[EventLevel["Critical"] = 1] = "Critical";
        EventLevel[EventLevel["Error"] = 2] = "Error";
        EventLevel[EventLevel["Warning"] = 3] = "Warning";
        EventLevel[EventLevel["Informational"] = 4] = "Informational";
        EventLevel[EventLevel["Verbose"] = 5] = "Verbose";
      })(EventLevel = Tracing.EventLevel || (Tracing.EventLevel = {}));

      var EventTask;

      (function (EventTask) {
        EventTask[EventTask["None"] = 0] = "None";
      })(EventTask = Tracing.EventTask || (Tracing.EventTask = {}));

      var EventOpcode;

      (function (EventOpcode) {
        EventOpcode[EventOpcode["Info"] = 0] = "Info";
        EventOpcode[EventOpcode["Start"] = 1] = "Start";
        EventOpcode[EventOpcode["Stop"] = 2] = "Stop";
        EventOpcode[EventOpcode["DataCollectionStart"] = 3] = "DataCollectionStart";
        EventOpcode[EventOpcode["DataCollectionStop"] = 4] = "DataCollectionStop";
        EventOpcode[EventOpcode["Extension"] = 5] = "Extension";
        EventOpcode[EventOpcode["Reply"] = 6] = "Reply";
        EventOpcode[EventOpcode["Resume"] = 7] = "Resume";
        EventOpcode[EventOpcode["Suspend"] = 8] = "Suspend";
        EventOpcode[EventOpcode["Send"] = 9] = "Send";
        EventOpcode[EventOpcode["Receive"] = 240] = "Receive";
      })(EventOpcode = Tracing.EventOpcode || (Tracing.EventOpcode = {}));

      var EventChannel;

      (function (EventChannel) {
        EventChannel[EventChannel["None"] = 0] = "None";
        EventChannel[EventChannel["Admin"] = 16] = "Admin";
        EventChannel[EventChannel["Operational"] = 17] = "Operational";
        EventChannel[EventChannel["Analytic"] = 18] = "Analytic";
        EventChannel[EventChannel["Debug"] = 19] = "Debug";
      })(EventChannel = Tracing.EventChannel || (Tracing.EventChannel = {}));

      var EventKeywords;

      (function (EventKeywords) {
        EventKeywords[EventKeywords["None"] = 0] = "None";
        EventKeywords[EventKeywords["All"] = -1] = "All";
        EventKeywords[EventKeywords["MicrosoftTelemetry"] = 562949953421312] = "MicrosoftTelemetry";
        EventKeywords[EventKeywords["WdiContext"] = 562949953421312] = "WdiContext";
        EventKeywords[EventKeywords["WdiDiagnostic"] = 1125899906842624] = "WdiDiagnostic";
        EventKeywords[EventKeywords["Sqm"] = 2251799813685248] = "Sqm";
        EventKeywords[EventKeywords["AuditFailure"] = 4503599627370496] = "AuditFailure";
        EventKeywords[EventKeywords["AuditSuccess"] = 9007199254740992] = "AuditSuccess";
        EventKeywords[EventKeywords["CorrelationHint"] = 4503599627370496] = "CorrelationHint";
        EventKeywords[EventKeywords["EventLogClassic"] = 36028797018963970] = "EventLogClassic";
      })(EventKeywords = Tracing.EventKeywords || (Tracing.EventKeywords = {}));
    })(Tracing = Diagnostics.Tracing || (Diagnostics.Tracing = {}));
  })(Diagnostics = System.Diagnostics || (System.Diagnostics = {}));

  var Dynamic;

  (function (Dynamic) {})(Dynamic = System.Dynamic || (System.Dynamic = {}));

  var Globalization;

  (function (Globalization) {
    var CalendarAlgorithmType;

    (function (CalendarAlgorithmType) {
      CalendarAlgorithmType[CalendarAlgorithmType["Unknown"] = 0] = "Unknown";
      CalendarAlgorithmType[CalendarAlgorithmType["SolarCalendar"] = 1] = "SolarCalendar";
      CalendarAlgorithmType[CalendarAlgorithmType["LunarCalendar"] = 2] = "LunarCalendar";
      CalendarAlgorithmType[CalendarAlgorithmType["LunisolarCalendar"] = 3] = "LunisolarCalendar";
    })(CalendarAlgorithmType = Globalization.CalendarAlgorithmType || (Globalization.CalendarAlgorithmType = {}));

    var CalendarWeekRule;

    (function (CalendarWeekRule) {
      CalendarWeekRule[CalendarWeekRule["FirstDay"] = 0] = "FirstDay";
      CalendarWeekRule[CalendarWeekRule["FirstFullWeek"] = 1] = "FirstFullWeek";
      CalendarWeekRule[CalendarWeekRule["FirstFourDayWeek"] = 2] = "FirstFourDayWeek";
    })(CalendarWeekRule = Globalization.CalendarWeekRule || (Globalization.CalendarWeekRule = {}));

    var CompareOptions;

    (function (CompareOptions) {
      CompareOptions[CompareOptions["None"] = 0] = "None";
      CompareOptions[CompareOptions["IgnoreCase"] = 1] = "IgnoreCase";
      CompareOptions[CompareOptions["IgnoreNonSpace"] = 2] = "IgnoreNonSpace";
      CompareOptions[CompareOptions["IgnoreSymbols"] = 4] = "IgnoreSymbols";
      CompareOptions[CompareOptions["IgnoreKanaType"] = 8] = "IgnoreKanaType";
      CompareOptions[CompareOptions["IgnoreWidth"] = 16] = "IgnoreWidth";
      CompareOptions[CompareOptions["OrdinalIgnoreCase"] = 268435456] = "OrdinalIgnoreCase";
      CompareOptions[CompareOptions["StringSort"] = 536870912] = "StringSort";
      CompareOptions[CompareOptions["Ordinal"] = 1073741824] = "Ordinal";
    })(CompareOptions = Globalization.CompareOptions || (Globalization.CompareOptions = {}));

    var CultureTypes;

    (function (CultureTypes) {
      CultureTypes[CultureTypes["NeutralCultures"] = 1] = "NeutralCultures";
      CultureTypes[CultureTypes["SpecificCultures"] = 2] = "SpecificCultures";
      CultureTypes[CultureTypes["InstalledWin32Cultures"] = 4] = "InstalledWin32Cultures";
      CultureTypes[CultureTypes["AllCultures"] = 7] = "AllCultures";
      CultureTypes[CultureTypes["UserCustomCulture"] = 8] = "UserCustomCulture";
      CultureTypes[CultureTypes["ReplacementCultures"] = 16] = "ReplacementCultures";
      CultureTypes[CultureTypes["WindowsOnlyCultures"] = 32] = "WindowsOnlyCultures";
      CultureTypes[CultureTypes["FrameworkCultures"] = 64] = "FrameworkCultures";
    })(CultureTypes = Globalization.CultureTypes || (Globalization.CultureTypes = {}));

    var DateTimeStyles;

    (function (DateTimeStyles) {
      DateTimeStyles[DateTimeStyles["None"] = 0] = "None";
      DateTimeStyles[DateTimeStyles["AllowLeadingWhite"] = 1] = "AllowLeadingWhite";
      DateTimeStyles[DateTimeStyles["AllowTrailingWhite"] = 2] = "AllowTrailingWhite";
      DateTimeStyles[DateTimeStyles["AllowInnerWhite"] = 4] = "AllowInnerWhite";
      DateTimeStyles[DateTimeStyles["AllowWhiteSpaces"] = 7] = "AllowWhiteSpaces";
      DateTimeStyles[DateTimeStyles["NoCurrentDateDefault"] = 8] = "NoCurrentDateDefault";
      DateTimeStyles[DateTimeStyles["AdjustToUniversal"] = 16] = "AdjustToUniversal";
      DateTimeStyles[DateTimeStyles["AssumeLocal"] = 32] = "AssumeLocal";
      DateTimeStyles[DateTimeStyles["AssumeUniversal"] = 64] = "AssumeUniversal";
      DateTimeStyles[DateTimeStyles["RoundtripKind"] = 128] = "RoundtripKind";
    })(DateTimeStyles = Globalization.DateTimeStyles || (Globalization.DateTimeStyles = {}));

    var DigitShapes;

    (function (DigitShapes) {
      DigitShapes[DigitShapes["Context"] = 0] = "Context";
      DigitShapes[DigitShapes["None"] = 1] = "None";
      DigitShapes[DigitShapes["NativeNational"] = 2] = "NativeNational";
    })(DigitShapes = Globalization.DigitShapes || (Globalization.DigitShapes = {}));

    var GregorianCalendarTypes;

    (function (GregorianCalendarTypes) {
      GregorianCalendarTypes[GregorianCalendarTypes["Localized"] = 1] = "Localized";
      GregorianCalendarTypes[GregorianCalendarTypes["USEnglish"] = 2] = "USEnglish";
      GregorianCalendarTypes[GregorianCalendarTypes["MiddleEastFrench"] = 9] = "MiddleEastFrench";
      GregorianCalendarTypes[GregorianCalendarTypes["Arabic"] = 10] = "Arabic";
      GregorianCalendarTypes[GregorianCalendarTypes["TransliteratedEnglish"] = 11] = "TransliteratedEnglish";
      GregorianCalendarTypes[GregorianCalendarTypes["TransliteratedFrench"] = 12] = "TransliteratedFrench";
    })(GregorianCalendarTypes = Globalization.GregorianCalendarTypes || (Globalization.GregorianCalendarTypes = {}));

    var NumberStyles;

    (function (NumberStyles) {
      NumberStyles[NumberStyles["None"] = 0] = "None";
      NumberStyles[NumberStyles["AllowLeadingWhite"] = 1] = "AllowLeadingWhite";
      NumberStyles[NumberStyles["AllowTrailingWhite"] = 2] = "AllowTrailingWhite";
      NumberStyles[NumberStyles["AllowLeadingSign"] = 4] = "AllowLeadingSign";
      NumberStyles[NumberStyles["AllowTrailingSign"] = 8] = "AllowTrailingSign";
      NumberStyles[NumberStyles["AllowParentheses"] = 16] = "AllowParentheses";
      NumberStyles[NumberStyles["AllowDecimalPoint"] = 32] = "AllowDecimalPoint";
      NumberStyles[NumberStyles["AllowThousands"] = 64] = "AllowThousands";
      NumberStyles[NumberStyles["AllowExponent"] = 128] = "AllowExponent";
      NumberStyles[NumberStyles["AllowCurrencySymbol"] = 256] = "AllowCurrencySymbol";
      NumberStyles[NumberStyles["AllowHexSpecifier"] = 512] = "AllowHexSpecifier";
      NumberStyles[NumberStyles["Integer"] = 7] = "Integer";
      NumberStyles[NumberStyles["HexNumber"] = 515] = "HexNumber";
      NumberStyles[NumberStyles["Number"] = 111] = "Number";
      NumberStyles[NumberStyles["Float"] = 167] = "Float";
      NumberStyles[NumberStyles["Currency"] = 383] = "Currency";
      NumberStyles[NumberStyles["Any"] = 511] = "Any";
    })(NumberStyles = Globalization.NumberStyles || (Globalization.NumberStyles = {}));

    var TimeSpanStyles;

    (function (TimeSpanStyles) {
      TimeSpanStyles[TimeSpanStyles["None"] = 0] = "None";
      TimeSpanStyles[TimeSpanStyles["AssumeNegative"] = 1] = "AssumeNegative";
    })(TimeSpanStyles = Globalization.TimeSpanStyles || (Globalization.TimeSpanStyles = {}));

    var UnicodeCategory;

    (function (UnicodeCategory) {
      UnicodeCategory[UnicodeCategory["UppercaseLetter"] = 0] = "UppercaseLetter";
      UnicodeCategory[UnicodeCategory["LowercaseLetter"] = 1] = "LowercaseLetter";
      UnicodeCategory[UnicodeCategory["TitlecaseLetter"] = 2] = "TitlecaseLetter";
      UnicodeCategory[UnicodeCategory["ModifierLetter"] = 3] = "ModifierLetter";
      UnicodeCategory[UnicodeCategory["OtherLetter"] = 4] = "OtherLetter";
      UnicodeCategory[UnicodeCategory["NonSpacingMark"] = 5] = "NonSpacingMark";
      UnicodeCategory[UnicodeCategory["SpacingCombiningMark"] = 6] = "SpacingCombiningMark";
      UnicodeCategory[UnicodeCategory["EnclosingMark"] = 7] = "EnclosingMark";
      UnicodeCategory[UnicodeCategory["DecimalDigitNumber"] = 8] = "DecimalDigitNumber";
      UnicodeCategory[UnicodeCategory["LetterNumber"] = 9] = "LetterNumber";
      UnicodeCategory[UnicodeCategory["OtherNumber"] = 10] = "OtherNumber";
      UnicodeCategory[UnicodeCategory["SpaceSeparator"] = 11] = "SpaceSeparator";
      UnicodeCategory[UnicodeCategory["LineSeparator"] = 12] = "LineSeparator";
      UnicodeCategory[UnicodeCategory["ParagraphSeparator"] = 13] = "ParagraphSeparator";
      UnicodeCategory[UnicodeCategory["Control"] = 14] = "Control";
      UnicodeCategory[UnicodeCategory["Format"] = 15] = "Format";
      UnicodeCategory[UnicodeCategory["Surrogate"] = 16] = "Surrogate";
      UnicodeCategory[UnicodeCategory["PrivateUse"] = 17] = "PrivateUse";
      UnicodeCategory[UnicodeCategory["ConnectorPunctuation"] = 18] = "ConnectorPunctuation";
      UnicodeCategory[UnicodeCategory["DashPunctuation"] = 19] = "DashPunctuation";
      UnicodeCategory[UnicodeCategory["OpenPunctuation"] = 20] = "OpenPunctuation";
      UnicodeCategory[UnicodeCategory["ClosePunctuation"] = 21] = "ClosePunctuation";
      UnicodeCategory[UnicodeCategory["InitialQuotePunctuation"] = 22] = "InitialQuotePunctuation";
      UnicodeCategory[UnicodeCategory["FinalQuotePunctuation"] = 23] = "FinalQuotePunctuation";
      UnicodeCategory[UnicodeCategory["OtherPunctuation"] = 24] = "OtherPunctuation";
      UnicodeCategory[UnicodeCategory["MathSymbol"] = 25] = "MathSymbol";
      UnicodeCategory[UnicodeCategory["CurrencySymbol"] = 26] = "CurrencySymbol";
      UnicodeCategory[UnicodeCategory["ModifierSymbol"] = 27] = "ModifierSymbol";
      UnicodeCategory[UnicodeCategory["OtherSymbol"] = 28] = "OtherSymbol";
      UnicodeCategory[UnicodeCategory["OtherNotAssigned"] = 29] = "OtherNotAssigned";
    })(UnicodeCategory = Globalization.UnicodeCategory || (Globalization.UnicodeCategory = {}));
  })(Globalization = System.Globalization || (System.Globalization = {}));

  var IO;

  (function (IO) {
    var DriveType;

    (function (DriveType) {
      DriveType[DriveType["CDRom"] = 5] = "CDRom";
      DriveType[DriveType["Fixed"] = 3] = "Fixed";
      DriveType[DriveType["Network"] = 4] = "Network";
      DriveType[DriveType["NoRootDirectory"] = 1] = "NoRootDirectory";
      DriveType[DriveType["Ram"] = 6] = "Ram";
      DriveType[DriveType["Removable"] = 2] = "Removable";
      DriveType[DriveType["Unknown"] = 0] = "Unknown";
    })(DriveType = IO.DriveType || (IO.DriveType = {}));

    var FileAccess;

    (function (FileAccess) {
      FileAccess[FileAccess["Read"] = 1] = "Read";
      FileAccess[FileAccess["Write"] = 2] = "Write";
      FileAccess[FileAccess["ReadWrite"] = 3] = "ReadWrite";
    })(FileAccess = IO.FileAccess || (IO.FileAccess = {}));

    var FileAttributes;

    (function (FileAttributes) {
      FileAttributes[FileAttributes["Archive"] = 32] = "Archive";
      FileAttributes[FileAttributes["Compressed"] = 2048] = "Compressed";
      FileAttributes[FileAttributes["Device"] = 64] = "Device";
      FileAttributes[FileAttributes["Directory"] = 16] = "Directory";
      FileAttributes[FileAttributes["Encrypted"] = 16384] = "Encrypted";
      FileAttributes[FileAttributes["Hidden"] = 2] = "Hidden";
      FileAttributes[FileAttributes["Normal"] = 128] = "Normal";
      FileAttributes[FileAttributes["NotContentIndexed"] = 8192] = "NotContentIndexed";
      FileAttributes[FileAttributes["Offline"] = 4096] = "Offline";
      FileAttributes[FileAttributes["ReadOnly"] = 1] = "ReadOnly";
      FileAttributes[FileAttributes["ReparsePoint"] = 1024] = "ReparsePoint";
      FileAttributes[FileAttributes["SparseFile"] = 512] = "SparseFile";
      FileAttributes[FileAttributes["System"] = 4] = "System";
      FileAttributes[FileAttributes["Temporary"] = 256] = "Temporary";
      FileAttributes[FileAttributes["IntegrityStream"] = 32768] = "IntegrityStream";
      FileAttributes[FileAttributes["NoScrubData"] = 131072] = "NoScrubData";
    })(FileAttributes = IO.FileAttributes || (IO.FileAttributes = {}));

    var FileMode;

    (function (FileMode) {
      FileMode[FileMode["CreateNew"] = 1] = "CreateNew";
      FileMode[FileMode["Create"] = 2] = "Create";
      FileMode[FileMode["Open"] = 3] = "Open";
      FileMode[FileMode["OpenOrCreate"] = 4] = "OpenOrCreate";
      FileMode[FileMode["Truncate"] = 5] = "Truncate";
      FileMode[FileMode["Append"] = 6] = "Append";
    })(FileMode = IO.FileMode || (IO.FileMode = {}));

    var FileOptions;

    (function (FileOptions) {
      FileOptions[FileOptions["None"] = 0] = "None";
      FileOptions[FileOptions["Encrypted"] = 16384] = "Encrypted";
      FileOptions[FileOptions["DeleteOnClose"] = 67108864] = "DeleteOnClose";
      FileOptions[FileOptions["SequentialScan"] = 134217728] = "SequentialScan";
      FileOptions[FileOptions["RandomAccess"] = 268435456] = "RandomAccess";
      FileOptions[FileOptions["Asynchronous"] = 1073741824] = "Asynchronous";
      FileOptions[FileOptions["WriteThrough"] = -2147483648] = "WriteThrough";
    })(FileOptions = IO.FileOptions || (IO.FileOptions = {}));

    var FileShare;

    (function (FileShare) {
      FileShare[FileShare["None"] = 0] = "None";
      FileShare[FileShare["Read"] = 1] = "Read";
      FileShare[FileShare["Write"] = 2] = "Write";
      FileShare[FileShare["ReadWrite"] = 3] = "ReadWrite";
      FileShare[FileShare["Delete"] = 4] = "Delete";
      FileShare[FileShare["Inheritable"] = 16] = "Inheritable";
    })(FileShare = IO.FileShare || (IO.FileShare = {}));

    var SearchOption;

    (function (SearchOption) {
      SearchOption[SearchOption["TopDirectoryOnly"] = 0] = "TopDirectoryOnly";
      SearchOption[SearchOption["AllDirectories"] = 1] = "AllDirectories";
    })(SearchOption = IO.SearchOption || (IO.SearchOption = {}));

    var SeekOrigin;

    (function (SeekOrigin) {
      SeekOrigin[SeekOrigin["Begin"] = 0] = "Begin";
      SeekOrigin[SeekOrigin["Current"] = 1] = "Current";
      SeekOrigin[SeekOrigin["End"] = 2] = "End";
    })(SeekOrigin = IO.SeekOrigin || (IO.SeekOrigin = {}));

    var HandleInheritability;

    (function (HandleInheritability) {
      HandleInheritability[HandleInheritability["None"] = 0] = "None";
      HandleInheritability[HandleInheritability["Inheritable"] = 1] = "Inheritable";
    })(HandleInheritability = IO.HandleInheritability || (IO.HandleInheritability = {}));

    var NotifyFilters;

    (function (NotifyFilters) {
      NotifyFilters[NotifyFilters["Attributes"] = 4] = "Attributes";
      NotifyFilters[NotifyFilters["CreationTime"] = 64] = "CreationTime";
      NotifyFilters[NotifyFilters["DirectoryName"] = 2] = "DirectoryName";
      NotifyFilters[NotifyFilters["FileName"] = 1] = "FileName";
      NotifyFilters[NotifyFilters["LastAccess"] = 32] = "LastAccess";
      NotifyFilters[NotifyFilters["LastWrite"] = 16] = "LastWrite";
      NotifyFilters[NotifyFilters["Security"] = 256] = "Security";
      NotifyFilters[NotifyFilters["Size"] = 8] = "Size";
    })(NotifyFilters = IO.NotifyFilters || (IO.NotifyFilters = {}));

    var WatcherChangeTypes;

    (function (WatcherChangeTypes) {
      WatcherChangeTypes[WatcherChangeTypes["All"] = 15] = "All";
      WatcherChangeTypes[WatcherChangeTypes["Changed"] = 4] = "Changed";
      WatcherChangeTypes[WatcherChangeTypes["Created"] = 1] = "Created";
      WatcherChangeTypes[WatcherChangeTypes["Deleted"] = 2] = "Deleted";
      WatcherChangeTypes[WatcherChangeTypes["Renamed"] = 8] = "Renamed";
    })(WatcherChangeTypes = IO.WatcherChangeTypes || (IO.WatcherChangeTypes = {}));

    var Compression;

    (function (Compression) {
      var CompressionLevel;

      (function (CompressionLevel) {
        CompressionLevel[CompressionLevel["Optimal"] = 0] = "Optimal";
        CompressionLevel[CompressionLevel["Fastest"] = 1] = "Fastest";
        CompressionLevel[CompressionLevel["NoCompression"] = 2] = "NoCompression";
      })(CompressionLevel = Compression.CompressionLevel || (Compression.CompressionLevel = {}));

      var CompressionMode;

      (function (CompressionMode) {
        CompressionMode[CompressionMode["Decompress"] = 0] = "Decompress";
        CompressionMode[CompressionMode["Compress"] = 1] = "Compress";
      })(CompressionMode = Compression.CompressionMode || (Compression.CompressionMode = {}));
    })(Compression = IO.Compression || (IO.Compression = {}));

    var IsolatedStorage;

    (function (IsolatedStorage_1) {
      var IsolatedStorageScope;

      (function (IsolatedStorageScope) {
        IsolatedStorageScope[IsolatedStorageScope["None"] = 0] = "None";
        IsolatedStorageScope[IsolatedStorageScope["User"] = 1] = "User";
        IsolatedStorageScope[IsolatedStorageScope["Domain"] = 2] = "Domain";
        IsolatedStorageScope[IsolatedStorageScope["Assembly"] = 4] = "Assembly";
        IsolatedStorageScope[IsolatedStorageScope["Roaming"] = 8] = "Roaming";
        IsolatedStorageScope[IsolatedStorageScope["Machine"] = 16] = "Machine";
        IsolatedStorageScope[IsolatedStorageScope["Application"] = 32] = "Application";
      })(IsolatedStorageScope = IsolatedStorage_1.IsolatedStorageScope || (IsolatedStorage_1.IsolatedStorageScope = {}));

      var IsolatedStorageSecurityOptions;

      (function (IsolatedStorageSecurityOptions) {
        IsolatedStorageSecurityOptions[IsolatedStorageSecurityOptions["IncreaseQuotaForApplication"] = 4] = "IncreaseQuotaForApplication";
      })(IsolatedStorageSecurityOptions = IsolatedStorage_1.IsolatedStorageSecurityOptions || (IsolatedStorage_1.IsolatedStorageSecurityOptions = {}));
    })(IsolatedStorage = IO.IsolatedStorage || (IO.IsolatedStorage = {}));

    var MemoryMappedFiles;

    (function (MemoryMappedFiles) {
      var MemoryMappedFileAccess;

      (function (MemoryMappedFileAccess) {
        MemoryMappedFileAccess[MemoryMappedFileAccess["ReadWrite"] = 0] = "ReadWrite";
        MemoryMappedFileAccess[MemoryMappedFileAccess["Read"] = 1] = "Read";
        MemoryMappedFileAccess[MemoryMappedFileAccess["Write"] = 2] = "Write";
        MemoryMappedFileAccess[MemoryMappedFileAccess["CopyOnWrite"] = 3] = "CopyOnWrite";
        MemoryMappedFileAccess[MemoryMappedFileAccess["ReadExecute"] = 4] = "ReadExecute";
        MemoryMappedFileAccess[MemoryMappedFileAccess["ReadWriteExecute"] = 5] = "ReadWriteExecute";
      })(MemoryMappedFileAccess = MemoryMappedFiles.MemoryMappedFileAccess || (MemoryMappedFiles.MemoryMappedFileAccess = {}));

      var MemoryMappedFileOptions;

      (function (MemoryMappedFileOptions) {
        MemoryMappedFileOptions[MemoryMappedFileOptions["None"] = 0] = "None";
        MemoryMappedFileOptions[MemoryMappedFileOptions["DelayAllocatePages"] = 67108864] = "DelayAllocatePages";
      })(MemoryMappedFileOptions = MemoryMappedFiles.MemoryMappedFileOptions || (MemoryMappedFiles.MemoryMappedFileOptions = {}));

      var MemoryMappedFileRights;

      (function (MemoryMappedFileRights) {
        MemoryMappedFileRights[MemoryMappedFileRights["CopyOnWrite"] = 1] = "CopyOnWrite";
        MemoryMappedFileRights[MemoryMappedFileRights["Write"] = 2] = "Write";
        MemoryMappedFileRights[MemoryMappedFileRights["Read"] = 4] = "Read";
        MemoryMappedFileRights[MemoryMappedFileRights["Execute"] = 8] = "Execute";
        MemoryMappedFileRights[MemoryMappedFileRights["Delete"] = 65536] = "Delete";
        MemoryMappedFileRights[MemoryMappedFileRights["ReadPermissions"] = 131072] = "ReadPermissions";
        MemoryMappedFileRights[MemoryMappedFileRights["ChangePermissions"] = 262144] = "ChangePermissions";
        MemoryMappedFileRights[MemoryMappedFileRights["TakeOwnership"] = 524288] = "TakeOwnership";
        MemoryMappedFileRights[MemoryMappedFileRights["ReadWrite"] = 6] = "ReadWrite";
        MemoryMappedFileRights[MemoryMappedFileRights["ReadExecute"] = 12] = "ReadExecute";
        MemoryMappedFileRights[MemoryMappedFileRights["ReadWriteExecute"] = 14] = "ReadWriteExecute";
        MemoryMappedFileRights[MemoryMappedFileRights["FullControl"] = 983055] = "FullControl";
        MemoryMappedFileRights[MemoryMappedFileRights["AccessSystemSecurity"] = 16777216] = "AccessSystemSecurity";
      })(MemoryMappedFileRights = MemoryMappedFiles.MemoryMappedFileRights || (MemoryMappedFiles.MemoryMappedFileRights = {}));
    })(MemoryMappedFiles = IO.MemoryMappedFiles || (IO.MemoryMappedFiles = {}));

    var Pipes;

    (function (Pipes) {
      var PipeAccessRights;

      (function (PipeAccessRights) {
        PipeAccessRights[PipeAccessRights["ReadData"] = 1] = "ReadData";
        PipeAccessRights[PipeAccessRights["WriteData"] = 2] = "WriteData";
        PipeAccessRights[PipeAccessRights["CreateNewInstance"] = 4] = "CreateNewInstance";
        PipeAccessRights[PipeAccessRights["ReadExtendedAttributes"] = 8] = "ReadExtendedAttributes";
        PipeAccessRights[PipeAccessRights["WriteExtendedAttributes"] = 16] = "WriteExtendedAttributes";
        PipeAccessRights[PipeAccessRights["ReadAttributes"] = 128] = "ReadAttributes";
        PipeAccessRights[PipeAccessRights["WriteAttributes"] = 256] = "WriteAttributes";
        PipeAccessRights[PipeAccessRights["Delete"] = 65536] = "Delete";
        PipeAccessRights[PipeAccessRights["ReadPermissions"] = 131072] = "ReadPermissions";
        PipeAccessRights[PipeAccessRights["ChangePermissions"] = 262144] = "ChangePermissions";
        PipeAccessRights[PipeAccessRights["TakeOwnership"] = 524288] = "TakeOwnership";
        PipeAccessRights[PipeAccessRights["Synchronize"] = 1048576] = "Synchronize";
        PipeAccessRights[PipeAccessRights["AccessSystemSecurity"] = 16777216] = "AccessSystemSecurity";
        PipeAccessRights[PipeAccessRights["Read"] = 131209] = "Read";
        PipeAccessRights[PipeAccessRights["Write"] = 274] = "Write";
        PipeAccessRights[PipeAccessRights["ReadWrite"] = 131483] = "ReadWrite";
        PipeAccessRights[PipeAccessRights["FullControl"] = 2032031] = "FullControl";
      })(PipeAccessRights = Pipes.PipeAccessRights || (Pipes.PipeAccessRights = {}));

      var PipeDirection;

      (function (PipeDirection) {
        PipeDirection[PipeDirection["In"] = 1] = "In";
        PipeDirection[PipeDirection["Out"] = 2] = "Out";
        PipeDirection[PipeDirection["InOut"] = 3] = "InOut";
      })(PipeDirection = Pipes.PipeDirection || (Pipes.PipeDirection = {}));

      var PipeOptions;

      (function (PipeOptions) {
        PipeOptions[PipeOptions["None"] = 0] = "None";
        PipeOptions[PipeOptions["WriteThrough"] = -2147483648] = "WriteThrough";
        PipeOptions[PipeOptions["Asynchronous"] = 1073741824] = "Asynchronous";
      })(PipeOptions = Pipes.PipeOptions || (Pipes.PipeOptions = {}));

      var PipeTransmissionMode;

      (function (PipeTransmissionMode) {
        PipeTransmissionMode[PipeTransmissionMode["Byte"] = 0] = "Byte";
        PipeTransmissionMode[PipeTransmissionMode["Message"] = 1] = "Message";
      })(PipeTransmissionMode = Pipes.PipeTransmissionMode || (Pipes.PipeTransmissionMode = {}));
    })(Pipes = IO.Pipes || (IO.Pipes = {}));

    var Ports;

    (function (Ports) {
      var Handshake;

      (function (Handshake) {
        Handshake[Handshake["None"] = 0] = "None";
        Handshake[Handshake["XOnXOff"] = 1] = "XOnXOff";
        Handshake[Handshake["RequestToSend"] = 2] = "RequestToSend";
        Handshake[Handshake["RequestToSendXOnXOff"] = 3] = "RequestToSendXOnXOff";
      })(Handshake = Ports.Handshake || (Ports.Handshake = {}));

      var Parity;

      (function (Parity) {
        Parity[Parity["None"] = 0] = "None";
        Parity[Parity["Odd"] = 1] = "Odd";
        Parity[Parity["Even"] = 2] = "Even";
        Parity[Parity["Mark"] = 3] = "Mark";
        Parity[Parity["Space"] = 4] = "Space";
      })(Parity = Ports.Parity || (Ports.Parity = {}));

      var SerialData;

      (function (SerialData) {
        SerialData[SerialData["Chars"] = 1] = "Chars";
        SerialData[SerialData["Eof"] = 2] = "Eof";
      })(SerialData = Ports.SerialData || (Ports.SerialData = {}));

      var SerialError;

      (function (SerialError) {
        SerialError[SerialError["RXOver"] = 1] = "RXOver";
        SerialError[SerialError["Overrun"] = 2] = "Overrun";
        SerialError[SerialError["RXParity"] = 4] = "RXParity";
        SerialError[SerialError["Frame"] = 8] = "Frame";
        SerialError[SerialError["TXFull"] = 256] = "TXFull";
      })(SerialError = Ports.SerialError || (Ports.SerialError = {}));

      var SerialPinChange;

      (function (SerialPinChange) {
        SerialPinChange[SerialPinChange["CtsChanged"] = 8] = "CtsChanged";
        SerialPinChange[SerialPinChange["DsrChanged"] = 16] = "DsrChanged";
        SerialPinChange[SerialPinChange["CDChanged"] = 32] = "CDChanged";
        SerialPinChange[SerialPinChange["Break"] = 64] = "Break";
        SerialPinChange[SerialPinChange["Ring"] = 256] = "Ring";
      })(SerialPinChange = Ports.SerialPinChange || (Ports.SerialPinChange = {}));

      var StopBits;

      (function (StopBits) {
        StopBits[StopBits["None"] = 0] = "None";
        StopBits[StopBits["One"] = 1] = "One";
        StopBits[StopBits["Two"] = 2] = "Two";
        StopBits[StopBits["OnePointFive"] = 3] = "OnePointFive";
      })(StopBits = Ports.StopBits || (Ports.StopBits = {}));
    })(Ports = IO.Ports || (IO.Ports = {}));
  })(IO = System.IO || (System.IO = {}));

  var Linq;

  (function (Linq) {
    var ParallelExecutionMode;

    (function (ParallelExecutionMode) {
      ParallelExecutionMode[ParallelExecutionMode["Default"] = 0] = "Default";
      ParallelExecutionMode[ParallelExecutionMode["ForceParallelism"] = 1] = "ForceParallelism";
    })(ParallelExecutionMode = Linq.ParallelExecutionMode || (Linq.ParallelExecutionMode = {}));

    var ParallelMergeOptions;

    (function (ParallelMergeOptions) {
      ParallelMergeOptions[ParallelMergeOptions["Default"] = 0] = "Default";
      ParallelMergeOptions[ParallelMergeOptions["NotBuffered"] = 1] = "NotBuffered";
      ParallelMergeOptions[ParallelMergeOptions["AutoBuffered"] = 2] = "AutoBuffered";
      ParallelMergeOptions[ParallelMergeOptions["FullyBuffered"] = 3] = "FullyBuffered";
    })(ParallelMergeOptions = Linq.ParallelMergeOptions || (Linq.ParallelMergeOptions = {}));

    var Expressions;

    (function (Expressions) {
      var ExpressionType;

      (function (ExpressionType) {
        ExpressionType[ExpressionType["Add"] = 0] = "Add";
        ExpressionType[ExpressionType["AddChecked"] = 1] = "AddChecked";
        ExpressionType[ExpressionType["And"] = 2] = "And";
        ExpressionType[ExpressionType["AndAlso"] = 3] = "AndAlso";
        ExpressionType[ExpressionType["ArrayLength"] = 4] = "ArrayLength";
        ExpressionType[ExpressionType["ArrayIndex"] = 5] = "ArrayIndex";
        ExpressionType[ExpressionType["Call"] = 6] = "Call";
        ExpressionType[ExpressionType["Coalesce"] = 7] = "Coalesce";
        ExpressionType[ExpressionType["Conditional"] = 8] = "Conditional";
        ExpressionType[ExpressionType["Constant"] = 9] = "Constant";
        ExpressionType[ExpressionType["Convert"] = 10] = "Convert";
        ExpressionType[ExpressionType["ConvertChecked"] = 11] = "ConvertChecked";
        ExpressionType[ExpressionType["Divide"] = 12] = "Divide";
        ExpressionType[ExpressionType["Equal"] = 13] = "Equal";
        ExpressionType[ExpressionType["ExclusiveOr"] = 14] = "ExclusiveOr";
        ExpressionType[ExpressionType["GreaterThan"] = 15] = "GreaterThan";
        ExpressionType[ExpressionType["GreaterThanOrEqual"] = 16] = "GreaterThanOrEqual";
        ExpressionType[ExpressionType["Invoke"] = 17] = "Invoke";
        ExpressionType[ExpressionType["Lambda"] = 18] = "Lambda";
        ExpressionType[ExpressionType["LeftShift"] = 19] = "LeftShift";
        ExpressionType[ExpressionType["LessThan"] = 20] = "LessThan";
        ExpressionType[ExpressionType["LessThanOrEqual"] = 21] = "LessThanOrEqual";
        ExpressionType[ExpressionType["ListInit"] = 22] = "ListInit";
        ExpressionType[ExpressionType["MemberAccess"] = 23] = "MemberAccess";
        ExpressionType[ExpressionType["MemberInit"] = 24] = "MemberInit";
        ExpressionType[ExpressionType["Modulo"] = 25] = "Modulo";
        ExpressionType[ExpressionType["Multiply"] = 26] = "Multiply";
        ExpressionType[ExpressionType["MultiplyChecked"] = 27] = "MultiplyChecked";
        ExpressionType[ExpressionType["Negate"] = 28] = "Negate";
        ExpressionType[ExpressionType["UnaryPlus"] = 29] = "UnaryPlus";
        ExpressionType[ExpressionType["NegateChecked"] = 30] = "NegateChecked";
        ExpressionType[ExpressionType["New"] = 31] = "New";
        ExpressionType[ExpressionType["NewArrayInit"] = 32] = "NewArrayInit";
        ExpressionType[ExpressionType["NewArrayBounds"] = 33] = "NewArrayBounds";
        ExpressionType[ExpressionType["Not"] = 34] = "Not";
        ExpressionType[ExpressionType["NotEqual"] = 35] = "NotEqual";
        ExpressionType[ExpressionType["Or"] = 36] = "Or";
        ExpressionType[ExpressionType["OrElse"] = 37] = "OrElse";
        ExpressionType[ExpressionType["Parameter"] = 38] = "Parameter";
        ExpressionType[ExpressionType["Power"] = 39] = "Power";
        ExpressionType[ExpressionType["Quote"] = 40] = "Quote";
        ExpressionType[ExpressionType["RightShift"] = 41] = "RightShift";
        ExpressionType[ExpressionType["Subtract"] = 42] = "Subtract";
        ExpressionType[ExpressionType["SubtractChecked"] = 43] = "SubtractChecked";
        ExpressionType[ExpressionType["TypeAs"] = 44] = "TypeAs";
        ExpressionType[ExpressionType["TypeIs"] = 45] = "TypeIs";
        ExpressionType[ExpressionType["Assign"] = 46] = "Assign";
        ExpressionType[ExpressionType["Block"] = 47] = "Block";
        ExpressionType[ExpressionType["DebugInfo"] = 48] = "DebugInfo";
        ExpressionType[ExpressionType["Decrement"] = 49] = "Decrement";
        ExpressionType[ExpressionType["Dynamic"] = 50] = "Dynamic";
        ExpressionType[ExpressionType["Default"] = 51] = "Default";
        ExpressionType[ExpressionType["Extension"] = 52] = "Extension";
        ExpressionType[ExpressionType["Goto"] = 53] = "Goto";
        ExpressionType[ExpressionType["Increment"] = 54] = "Increment";
        ExpressionType[ExpressionType["Index"] = 55] = "Index";
        ExpressionType[ExpressionType["Label"] = 56] = "Label";
        ExpressionType[ExpressionType["RuntimeVariables"] = 57] = "RuntimeVariables";
        ExpressionType[ExpressionType["Loop"] = 58] = "Loop";
        ExpressionType[ExpressionType["Switch"] = 59] = "Switch";
        ExpressionType[ExpressionType["Throw"] = 60] = "Throw";
        ExpressionType[ExpressionType["Try"] = 61] = "Try";
        ExpressionType[ExpressionType["Unbox"] = 62] = "Unbox";
        ExpressionType[ExpressionType["AddAssign"] = 63] = "AddAssign";
        ExpressionType[ExpressionType["AndAssign"] = 64] = "AndAssign";
        ExpressionType[ExpressionType["DivideAssign"] = 65] = "DivideAssign";
        ExpressionType[ExpressionType["ExclusiveOrAssign"] = 66] = "ExclusiveOrAssign";
        ExpressionType[ExpressionType["LeftShiftAssign"] = 67] = "LeftShiftAssign";
        ExpressionType[ExpressionType["ModuloAssign"] = 68] = "ModuloAssign";
        ExpressionType[ExpressionType["MultiplyAssign"] = 69] = "MultiplyAssign";
        ExpressionType[ExpressionType["OrAssign"] = 70] = "OrAssign";
        ExpressionType[ExpressionType["PowerAssign"] = 71] = "PowerAssign";
        ExpressionType[ExpressionType["RightShiftAssign"] = 72] = "RightShiftAssign";
        ExpressionType[ExpressionType["SubtractAssign"] = 73] = "SubtractAssign";
        ExpressionType[ExpressionType["AddAssignChecked"] = 74] = "AddAssignChecked";
        ExpressionType[ExpressionType["MultiplyAssignChecked"] = 75] = "MultiplyAssignChecked";
        ExpressionType[ExpressionType["SubtractAssignChecked"] = 76] = "SubtractAssignChecked";
        ExpressionType[ExpressionType["PreIncrementAssign"] = 77] = "PreIncrementAssign";
        ExpressionType[ExpressionType["PreDecrementAssign"] = 78] = "PreDecrementAssign";
        ExpressionType[ExpressionType["PostIncrementAssign"] = 79] = "PostIncrementAssign";
        ExpressionType[ExpressionType["PostDecrementAssign"] = 80] = "PostDecrementAssign";
        ExpressionType[ExpressionType["TypeEqual"] = 81] = "TypeEqual";
        ExpressionType[ExpressionType["OnesComplement"] = 82] = "OnesComplement";
        ExpressionType[ExpressionType["IsTrue"] = 83] = "IsTrue";
        ExpressionType[ExpressionType["IsFalse"] = 84] = "IsFalse";
      })(ExpressionType = Expressions.ExpressionType || (Expressions.ExpressionType = {}));

      var GotoExpressionKind;

      (function (GotoExpressionKind) {
        GotoExpressionKind[GotoExpressionKind["Goto"] = 0] = "Goto";
        GotoExpressionKind[GotoExpressionKind["Return"] = 1] = "Return";
        GotoExpressionKind[GotoExpressionKind["Break"] = 2] = "Break";
        GotoExpressionKind[GotoExpressionKind["Continue"] = 3] = "Continue";
      })(GotoExpressionKind = Expressions.GotoExpressionKind || (Expressions.GotoExpressionKind = {}));

      var MemberBindingType;

      (function (MemberBindingType) {
        MemberBindingType[MemberBindingType["Assignment"] = 0] = "Assignment";
        MemberBindingType[MemberBindingType["MemberBinding"] = 1] = "MemberBinding";
        MemberBindingType[MemberBindingType["ListBinding"] = 2] = "ListBinding";
      })(MemberBindingType = Expressions.MemberBindingType || (Expressions.MemberBindingType = {}));
    })(Expressions = Linq.Expressions || (Linq.Expressions = {}));
  })(Linq = System.Linq || (System.Linq = {}));

  var Management;

  (function (Management) {
    var Instrumentation;

    (function (Instrumentation) {
      var ManagementConfigurationType;

      (function (ManagementConfigurationType) {
        ManagementConfigurationType[ManagementConfigurationType["Apply"] = 0] = "Apply";
        ManagementConfigurationType[ManagementConfigurationType["OnCommit"] = 1] = "OnCommit";
      })(ManagementConfigurationType = Instrumentation.ManagementConfigurationType || (Instrumentation.ManagementConfigurationType = {}));

      var ManagementHostingModel;

      (function (ManagementHostingModel) {
        ManagementHostingModel[ManagementHostingModel["Decoupled"] = 0] = "Decoupled";
        ManagementHostingModel[ManagementHostingModel["LocalService"] = 2] = "LocalService";
        ManagementHostingModel[ManagementHostingModel["LocalSystem"] = 3] = "LocalSystem";
        ManagementHostingModel[ManagementHostingModel["NetworkService"] = 1] = "NetworkService";
      })(ManagementHostingModel = Instrumentation.ManagementHostingModel || (Instrumentation.ManagementHostingModel = {}));
    })(Instrumentation = Management.Instrumentation || (Management.Instrumentation = {}));
  })(Management = System.Management || (System.Management = {}));

  var Media;

  (function (Media) {})(Media = System.Media || (System.Media = {}));

  var Reflection;

  (function (Reflection) {
    var AssemblyNameFlags;

    (function (AssemblyNameFlags) {
      AssemblyNameFlags[AssemblyNameFlags["None"] = 0] = "None";
      AssemblyNameFlags[AssemblyNameFlags["PublicKey"] = 1] = "PublicKey";
      AssemblyNameFlags[AssemblyNameFlags["EnableJITcompileOptimizer"] = 16384] = "EnableJITcompileOptimizer";
      AssemblyNameFlags[AssemblyNameFlags["EnableJITcompileTracking"] = 32768] = "EnableJITcompileTracking";
      AssemblyNameFlags[AssemblyNameFlags["Retargetable"] = 256] = "Retargetable";
    })(AssemblyNameFlags = Reflection.AssemblyNameFlags || (Reflection.AssemblyNameFlags = {}));

    var AssemblyContentType;

    (function (AssemblyContentType) {
      AssemblyContentType[AssemblyContentType["Default"] = 0] = "Default";
      AssemblyContentType[AssemblyContentType["WindowsRuntime"] = 1] = "WindowsRuntime";
    })(AssemblyContentType = Reflection.AssemblyContentType || (Reflection.AssemblyContentType = {}));

    var ProcessorArchitecture;

    (function (ProcessorArchitecture) {
      ProcessorArchitecture[ProcessorArchitecture["None"] = 0] = "None";
      ProcessorArchitecture[ProcessorArchitecture["MSIL"] = 1] = "MSIL";
      ProcessorArchitecture[ProcessorArchitecture["X86"] = 2] = "X86";
      ProcessorArchitecture[ProcessorArchitecture["IA64"] = 3] = "IA64";
      ProcessorArchitecture[ProcessorArchitecture["Amd64"] = 4] = "Amd64";
      ProcessorArchitecture[ProcessorArchitecture["Arm"] = 5] = "Arm";
    })(ProcessorArchitecture = Reflection.ProcessorArchitecture || (Reflection.ProcessorArchitecture = {}));

    var BindingFlags;

    (function (BindingFlags) {
      BindingFlags[BindingFlags["Default"] = 0] = "Default";
      BindingFlags[BindingFlags["IgnoreCase"] = 1] = "IgnoreCase";
      BindingFlags[BindingFlags["DeclaredOnly"] = 2] = "DeclaredOnly";
      BindingFlags[BindingFlags["Instance"] = 4] = "Instance";
      BindingFlags[BindingFlags["Static"] = 8] = "Static";
      BindingFlags[BindingFlags["Public"] = 16] = "Public";
      BindingFlags[BindingFlags["NonPublic"] = 32] = "NonPublic";
      BindingFlags[BindingFlags["FlattenHierarchy"] = 64] = "FlattenHierarchy";
      BindingFlags[BindingFlags["InvokeMethod"] = 256] = "InvokeMethod";
      BindingFlags[BindingFlags["CreateInstance"] = 512] = "CreateInstance";
      BindingFlags[BindingFlags["GetField"] = 1024] = "GetField";
      BindingFlags[BindingFlags["SetField"] = 2048] = "SetField";
      BindingFlags[BindingFlags["GetProperty"] = 4096] = "GetProperty";
      BindingFlags[BindingFlags["SetProperty"] = 8192] = "SetProperty";
      BindingFlags[BindingFlags["PutDispProperty"] = 16384] = "PutDispProperty";
      BindingFlags[BindingFlags["PutRefDispProperty"] = 32768] = "PutRefDispProperty";
      BindingFlags[BindingFlags["ExactBinding"] = 65536] = "ExactBinding";
      BindingFlags[BindingFlags["SuppressChangeType"] = 131072] = "SuppressChangeType";
      BindingFlags[BindingFlags["OptionalParamBinding"] = 262144] = "OptionalParamBinding";
      BindingFlags[BindingFlags["IgnoreReturn"] = 16777216] = "IgnoreReturn";
    })(BindingFlags = Reflection.BindingFlags || (Reflection.BindingFlags = {}));

    var CallingConventions;

    (function (CallingConventions) {
      CallingConventions[CallingConventions["Standard"] = 1] = "Standard";
      CallingConventions[CallingConventions["VarArgs"] = 2] = "VarArgs";
      CallingConventions[CallingConventions["Any"] = 3] = "Any";
      CallingConventions[CallingConventions["HasThis"] = 32] = "HasThis";
      CallingConventions[CallingConventions["ExplicitThis"] = 64] = "ExplicitThis";
    })(CallingConventions = Reflection.CallingConventions || (Reflection.CallingConventions = {}));

    var EventAttributes;

    (function (EventAttributes) {
      EventAttributes[EventAttributes["None"] = 0] = "None";
      EventAttributes[EventAttributes["SpecialName"] = 512] = "SpecialName";
      EventAttributes[EventAttributes["ReservedMask"] = 1024] = "ReservedMask";
      EventAttributes[EventAttributes["RTSpecialName"] = 1024] = "RTSpecialName";
    })(EventAttributes = Reflection.EventAttributes || (Reflection.EventAttributes = {}));

    var FieldAttributes;

    (function (FieldAttributes) {
      FieldAttributes[FieldAttributes["FieldAccessMask"] = 7] = "FieldAccessMask";
      FieldAttributes[FieldAttributes["PrivateScope"] = 0] = "PrivateScope";
      FieldAttributes[FieldAttributes["Private"] = 1] = "Private";
      FieldAttributes[FieldAttributes["FamANDAssem"] = 2] = "FamANDAssem";
      FieldAttributes[FieldAttributes["Assembly"] = 3] = "Assembly";
      FieldAttributes[FieldAttributes["Family"] = 4] = "Family";
      FieldAttributes[FieldAttributes["FamORAssem"] = 5] = "FamORAssem";
      FieldAttributes[FieldAttributes["Public"] = 6] = "Public";
      FieldAttributes[FieldAttributes["Static"] = 16] = "Static";
      FieldAttributes[FieldAttributes["InitOnly"] = 32] = "InitOnly";
      FieldAttributes[FieldAttributes["Literal"] = 64] = "Literal";
      FieldAttributes[FieldAttributes["NotSerialized"] = 128] = "NotSerialized";
      FieldAttributes[FieldAttributes["SpecialName"] = 512] = "SpecialName";
      FieldAttributes[FieldAttributes["PinvokeImpl"] = 8192] = "PinvokeImpl";
      FieldAttributes[FieldAttributes["ReservedMask"] = 38144] = "ReservedMask";
      FieldAttributes[FieldAttributes["RTSpecialName"] = 1024] = "RTSpecialName";
      FieldAttributes[FieldAttributes["HasFieldMarshal"] = 4096] = "HasFieldMarshal";
      FieldAttributes[FieldAttributes["HasDefault"] = 32768] = "HasDefault";
      FieldAttributes[FieldAttributes["HasFieldRVA"] = 256] = "HasFieldRVA";
    })(FieldAttributes = Reflection.FieldAttributes || (Reflection.FieldAttributes = {}));

    var GenericParameterAttributes;

    (function (GenericParameterAttributes) {
      GenericParameterAttributes[GenericParameterAttributes["None"] = 0] = "None";
      GenericParameterAttributes[GenericParameterAttributes["VarianceMask"] = 3] = "VarianceMask";
      GenericParameterAttributes[GenericParameterAttributes["Covariant"] = 1] = "Covariant";
      GenericParameterAttributes[GenericParameterAttributes["Contravariant"] = 2] = "Contravariant";
      GenericParameterAttributes[GenericParameterAttributes["SpecialConstraintMask"] = 28] = "SpecialConstraintMask";
      GenericParameterAttributes[GenericParameterAttributes["ReferenceTypeConstraint"] = 4] = "ReferenceTypeConstraint";
      GenericParameterAttributes[GenericParameterAttributes["NotNullableValueTypeConstraint"] = 8] = "NotNullableValueTypeConstraint";
      GenericParameterAttributes[GenericParameterAttributes["DefaultConstructorConstraint"] = 16] = "DefaultConstructorConstraint";
    })(GenericParameterAttributes = Reflection.GenericParameterAttributes || (Reflection.GenericParameterAttributes = {}));

    var ResourceLocation;

    (function (ResourceLocation) {
      ResourceLocation[ResourceLocation["Embedded"] = 1] = "Embedded";
      ResourceLocation[ResourceLocation["ContainedInAnotherAssembly"] = 2] = "ContainedInAnotherAssembly";
      ResourceLocation[ResourceLocation["ContainedInManifestFile"] = 4] = "ContainedInManifestFile";
    })(ResourceLocation = Reflection.ResourceLocation || (Reflection.ResourceLocation = {}));

    var MemberTypes;

    (function (MemberTypes) {
      MemberTypes[MemberTypes["Constructor"] = 1] = "Constructor";
      MemberTypes[MemberTypes["Event"] = 2] = "Event";
      MemberTypes[MemberTypes["Field"] = 4] = "Field";
      MemberTypes[MemberTypes["Method"] = 8] = "Method";
      MemberTypes[MemberTypes["Property"] = 16] = "Property";
      MemberTypes[MemberTypes["TypeInfo"] = 32] = "TypeInfo";
      MemberTypes[MemberTypes["Custom"] = 64] = "Custom";
      MemberTypes[MemberTypes["NestedType"] = 128] = "NestedType";
      MemberTypes[MemberTypes["All"] = 191] = "All";
    })(MemberTypes = Reflection.MemberTypes || (Reflection.MemberTypes = {}));

    var MethodAttributes;

    (function (MethodAttributes) {
      MethodAttributes[MethodAttributes["MemberAccessMask"] = 7] = "MemberAccessMask";
      MethodAttributes[MethodAttributes["PrivateScope"] = 0] = "PrivateScope";
      MethodAttributes[MethodAttributes["Private"] = 1] = "Private";
      MethodAttributes[MethodAttributes["FamANDAssem"] = 2] = "FamANDAssem";
      MethodAttributes[MethodAttributes["Assembly"] = 3] = "Assembly";
      MethodAttributes[MethodAttributes["Family"] = 4] = "Family";
      MethodAttributes[MethodAttributes["FamORAssem"] = 5] = "FamORAssem";
      MethodAttributes[MethodAttributes["Public"] = 6] = "Public";
      MethodAttributes[MethodAttributes["Static"] = 16] = "Static";
      MethodAttributes[MethodAttributes["Final"] = 32] = "Final";
      MethodAttributes[MethodAttributes["Virtual"] = 64] = "Virtual";
      MethodAttributes[MethodAttributes["HideBySig"] = 128] = "HideBySig";
      MethodAttributes[MethodAttributes["CheckAccessOnOverride"] = 512] = "CheckAccessOnOverride";
      MethodAttributes[MethodAttributes["VtableLayoutMask"] = 256] = "VtableLayoutMask";
      MethodAttributes[MethodAttributes["ReuseSlot"] = 0] = "ReuseSlot";
      MethodAttributes[MethodAttributes["NewSlot"] = 256] = "NewSlot";
      MethodAttributes[MethodAttributes["Abstract"] = 1024] = "Abstract";
      MethodAttributes[MethodAttributes["SpecialName"] = 2048] = "SpecialName";
      MethodAttributes[MethodAttributes["PinvokeImpl"] = 8192] = "PinvokeImpl";
      MethodAttributes[MethodAttributes["UnmanagedExport"] = 8] = "UnmanagedExport";
      MethodAttributes[MethodAttributes["RTSpecialName"] = 4096] = "RTSpecialName";
      MethodAttributes[MethodAttributes["ReservedMask"] = 53248] = "ReservedMask";
      MethodAttributes[MethodAttributes["HasSecurity"] = 16384] = "HasSecurity";
      MethodAttributes[MethodAttributes["RequireSecObject"] = 32768] = "RequireSecObject";
    })(MethodAttributes = Reflection.MethodAttributes || (Reflection.MethodAttributes = {}));

    var ExceptionHandlingClauseOptions;

    (function (ExceptionHandlingClauseOptions) {
      ExceptionHandlingClauseOptions[ExceptionHandlingClauseOptions["Clause"] = 0] = "Clause";
      ExceptionHandlingClauseOptions[ExceptionHandlingClauseOptions["Filter"] = 1] = "Filter";
      ExceptionHandlingClauseOptions[ExceptionHandlingClauseOptions["Finally"] = 2] = "Finally";
      ExceptionHandlingClauseOptions[ExceptionHandlingClauseOptions["Fault"] = 4] = "Fault";
    })(ExceptionHandlingClauseOptions = Reflection.ExceptionHandlingClauseOptions || (Reflection.ExceptionHandlingClauseOptions = {}));

    var MethodImplAttributes;

    (function (MethodImplAttributes) {
      MethodImplAttributes[MethodImplAttributes["CodeTypeMask"] = 3] = "CodeTypeMask";
      MethodImplAttributes[MethodImplAttributes["IL"] = 0] = "IL";
      MethodImplAttributes[MethodImplAttributes["Native"] = 1] = "Native";
      MethodImplAttributes[MethodImplAttributes["OPTIL"] = 2] = "OPTIL";
      MethodImplAttributes[MethodImplAttributes["Runtime"] = 3] = "Runtime";
      MethodImplAttributes[MethodImplAttributes["ManagedMask"] = 4] = "ManagedMask";
      MethodImplAttributes[MethodImplAttributes["Unmanaged"] = 4] = "Unmanaged";
      MethodImplAttributes[MethodImplAttributes["Managed"] = 0] = "Managed";
      MethodImplAttributes[MethodImplAttributes["ForwardRef"] = 16] = "ForwardRef";
      MethodImplAttributes[MethodImplAttributes["PreserveSig"] = 128] = "PreserveSig";
      MethodImplAttributes[MethodImplAttributes["InternalCall"] = 4096] = "InternalCall";
      MethodImplAttributes[MethodImplAttributes["Synchronized"] = 32] = "Synchronized";
      MethodImplAttributes[MethodImplAttributes["NoInlining"] = 8] = "NoInlining";
      MethodImplAttributes[MethodImplAttributes["AggressiveInlining"] = 256] = "AggressiveInlining";
      MethodImplAttributes[MethodImplAttributes["NoOptimization"] = 64] = "NoOptimization";
      MethodImplAttributes[MethodImplAttributes["MaxMethodImplVal"] = 65535] = "MaxMethodImplVal";
    })(MethodImplAttributes = Reflection.MethodImplAttributes || (Reflection.MethodImplAttributes = {}));

    var ParameterAttributes;

    (function (ParameterAttributes) {
      ParameterAttributes[ParameterAttributes["None"] = 0] = "None";
      ParameterAttributes[ParameterAttributes["In"] = 1] = "In";
      ParameterAttributes[ParameterAttributes["Out"] = 2] = "Out";
      ParameterAttributes[ParameterAttributes["Lcid"] = 4] = "Lcid";
      ParameterAttributes[ParameterAttributes["Retval"] = 8] = "Retval";
      ParameterAttributes[ParameterAttributes["Optional"] = 16] = "Optional";
      ParameterAttributes[ParameterAttributes["ReservedMask"] = 61440] = "ReservedMask";
      ParameterAttributes[ParameterAttributes["HasDefault"] = 4096] = "HasDefault";
      ParameterAttributes[ParameterAttributes["HasFieldMarshal"] = 8192] = "HasFieldMarshal";
      ParameterAttributes[ParameterAttributes["Reserved3"] = 16384] = "Reserved3";
      ParameterAttributes[ParameterAttributes["Reserved4"] = 32768] = "Reserved4";
    })(ParameterAttributes = Reflection.ParameterAttributes || (Reflection.ParameterAttributes = {}));

    var PropertyAttributes;

    (function (PropertyAttributes) {
      PropertyAttributes[PropertyAttributes["None"] = 0] = "None";
      PropertyAttributes[PropertyAttributes["SpecialName"] = 512] = "SpecialName";
      PropertyAttributes[PropertyAttributes["ReservedMask"] = 62464] = "ReservedMask";
      PropertyAttributes[PropertyAttributes["RTSpecialName"] = 1024] = "RTSpecialName";
      PropertyAttributes[PropertyAttributes["HasDefault"] = 4096] = "HasDefault";
      PropertyAttributes[PropertyAttributes["Reserved2"] = 8192] = "Reserved2";
      PropertyAttributes[PropertyAttributes["Reserved3"] = 16384] = "Reserved3";
      PropertyAttributes[PropertyAttributes["Reserved4"] = 32768] = "Reserved4";
    })(PropertyAttributes = Reflection.PropertyAttributes || (Reflection.PropertyAttributes = {}));

    var ResourceAttributes;

    (function (ResourceAttributes) {
      ResourceAttributes[ResourceAttributes["Public"] = 1] = "Public";
      ResourceAttributes[ResourceAttributes["Private"] = 2] = "Private";
    })(ResourceAttributes = Reflection.ResourceAttributes || (Reflection.ResourceAttributes = {}));

    var TypeAttributes;

    (function (TypeAttributes) {
      TypeAttributes[TypeAttributes["VisibilityMask"] = 7] = "VisibilityMask";
      TypeAttributes[TypeAttributes["NotPublic"] = 0] = "NotPublic";
      TypeAttributes[TypeAttributes["Public"] = 1] = "Public";
      TypeAttributes[TypeAttributes["NestedPublic"] = 2] = "NestedPublic";
      TypeAttributes[TypeAttributes["NestedPrivate"] = 3] = "NestedPrivate";
      TypeAttributes[TypeAttributes["NestedFamily"] = 4] = "NestedFamily";
      TypeAttributes[TypeAttributes["NestedAssembly"] = 5] = "NestedAssembly";
      TypeAttributes[TypeAttributes["NestedFamANDAssem"] = 6] = "NestedFamANDAssem";
      TypeAttributes[TypeAttributes["NestedFamORAssem"] = 7] = "NestedFamORAssem";
      TypeAttributes[TypeAttributes["LayoutMask"] = 24] = "LayoutMask";
      TypeAttributes[TypeAttributes["AutoLayout"] = 0] = "AutoLayout";
      TypeAttributes[TypeAttributes["SequentialLayout"] = 8] = "SequentialLayout";
      TypeAttributes[TypeAttributes["ExplicitLayout"] = 16] = "ExplicitLayout";
      TypeAttributes[TypeAttributes["ClassSemanticsMask"] = 32] = "ClassSemanticsMask";
      TypeAttributes[TypeAttributes["Class"] = 0] = "Class";
      TypeAttributes[TypeAttributes["Interface"] = 32] = "Interface";
      TypeAttributes[TypeAttributes["Abstract"] = 128] = "Abstract";
      TypeAttributes[TypeAttributes["Sealed"] = 256] = "Sealed";
      TypeAttributes[TypeAttributes["SpecialName"] = 1024] = "SpecialName";
      TypeAttributes[TypeAttributes["Import"] = 4096] = "Import";
      TypeAttributes[TypeAttributes["Serializable"] = 8192] = "Serializable";
      TypeAttributes[TypeAttributes["WindowsRuntime"] = 16384] = "WindowsRuntime";
      TypeAttributes[TypeAttributes["StringFormatMask"] = 196608] = "StringFormatMask";
      TypeAttributes[TypeAttributes["AnsiClass"] = 0] = "AnsiClass";
      TypeAttributes[TypeAttributes["UnicodeClass"] = 65536] = "UnicodeClass";
      TypeAttributes[TypeAttributes["AutoClass"] = 131072] = "AutoClass";
      TypeAttributes[TypeAttributes["CustomFormatClass"] = 196608] = "CustomFormatClass";
      TypeAttributes[TypeAttributes["CustomFormatMask"] = 12582912] = "CustomFormatMask";
      TypeAttributes[TypeAttributes["BeforeFieldInit"] = 1048576] = "BeforeFieldInit";
      TypeAttributes[TypeAttributes["ReservedMask"] = 264192] = "ReservedMask";
      TypeAttributes[TypeAttributes["RTSpecialName"] = 2048] = "RTSpecialName";
      TypeAttributes[TypeAttributes["HasSecurity"] = 262144] = "HasSecurity";
    })(TypeAttributes = Reflection.TypeAttributes || (Reflection.TypeAttributes = {}));

    var ImageFileMachine;

    (function (ImageFileMachine) {
      ImageFileMachine[ImageFileMachine["I386"] = 332] = "I386";
      ImageFileMachine[ImageFileMachine["IA64"] = 512] = "IA64";
      ImageFileMachine[ImageFileMachine["AMD64"] = 34404] = "AMD64";
      ImageFileMachine[ImageFileMachine["ARM"] = 452] = "ARM";
    })(ImageFileMachine = Reflection.ImageFileMachine || (Reflection.ImageFileMachine = {}));

    var PortableExecutableKinds;

    (function (PortableExecutableKinds) {
      PortableExecutableKinds[PortableExecutableKinds["NotAPortableExecutableImage"] = 0] = "NotAPortableExecutableImage";
      PortableExecutableKinds[PortableExecutableKinds["ILOnly"] = 1] = "ILOnly";
      PortableExecutableKinds[PortableExecutableKinds["Required32Bit"] = 2] = "Required32Bit";
      PortableExecutableKinds[PortableExecutableKinds["PE32Plus"] = 4] = "PE32Plus";
      PortableExecutableKinds[PortableExecutableKinds["Unmanaged32Bit"] = 8] = "Unmanaged32Bit";
      PortableExecutableKinds[PortableExecutableKinds["Preferred32Bit"] = 16] = "Preferred32Bit";
    })(PortableExecutableKinds = Reflection.PortableExecutableKinds || (Reflection.PortableExecutableKinds = {}));

    var Emit;

    (function (Emit) {
      var AssemblyBuilderAccess;

      (function (AssemblyBuilderAccess) {
        AssemblyBuilderAccess[AssemblyBuilderAccess["Run"] = 1] = "Run";
        AssemblyBuilderAccess[AssemblyBuilderAccess["Save"] = 2] = "Save";
        AssemblyBuilderAccess[AssemblyBuilderAccess["RunAndSave"] = 3] = "RunAndSave";
        AssemblyBuilderAccess[AssemblyBuilderAccess["ReflectionOnly"] = 6] = "ReflectionOnly";
        AssemblyBuilderAccess[AssemblyBuilderAccess["RunAndCollect"] = 9] = "RunAndCollect";
      })(AssemblyBuilderAccess = Emit.AssemblyBuilderAccess || (Emit.AssemblyBuilderAccess = {}));

      var FlowControl;

      (function (FlowControl) {
        FlowControl[FlowControl["Branch"] = 0] = "Branch";
        FlowControl[FlowControl["Break"] = 1] = "Break";
        FlowControl[FlowControl["Call"] = 2] = "Call";
        FlowControl[FlowControl["Cond_Branch"] = 3] = "Cond_Branch";
        FlowControl[FlowControl["Meta"] = 4] = "Meta";
        FlowControl[FlowControl["Next"] = 5] = "Next";
        FlowControl[FlowControl["Phi"] = 6] = "Phi";
        FlowControl[FlowControl["Return"] = 7] = "Return";
        FlowControl[FlowControl["Throw"] = 8] = "Throw";
      })(FlowControl = Emit.FlowControl || (Emit.FlowControl = {}));

      var OpCodeType;

      (function (OpCodeType) {
        OpCodeType[OpCodeType["Annotation"] = 0] = "Annotation";
        OpCodeType[OpCodeType["Macro"] = 1] = "Macro";
        OpCodeType[OpCodeType["Nternal"] = 2] = "Nternal";
        OpCodeType[OpCodeType["Objmodel"] = 3] = "Objmodel";
        OpCodeType[OpCodeType["Prefix"] = 4] = "Prefix";
        OpCodeType[OpCodeType["Primitive"] = 5] = "Primitive";
      })(OpCodeType = Emit.OpCodeType || (Emit.OpCodeType = {}));

      var OperandType;

      (function (OperandType) {
        OperandType[OperandType["InlineBrTarget"] = 0] = "InlineBrTarget";
        OperandType[OperandType["InlineField"] = 1] = "InlineField";
        OperandType[OperandType["InlineI"] = 2] = "InlineI";
        OperandType[OperandType["InlineI8"] = 3] = "InlineI8";
        OperandType[OperandType["InlineMethod"] = 4] = "InlineMethod";
        OperandType[OperandType["InlineNone"] = 5] = "InlineNone";
        OperandType[OperandType["InlinePhi"] = 6] = "InlinePhi";
        OperandType[OperandType["InlineR"] = 7] = "InlineR";
        OperandType[OperandType["InlineSig"] = 9] = "InlineSig";
        OperandType[OperandType["InlineString"] = 10] = "InlineString";
        OperandType[OperandType["InlineSwitch"] = 11] = "InlineSwitch";
        OperandType[OperandType["InlineTok"] = 12] = "InlineTok";
        OperandType[OperandType["InlineType"] = 13] = "InlineType";
        OperandType[OperandType["InlineVar"] = 14] = "InlineVar";
        OperandType[OperandType["ShortInlineBrTarget"] = 15] = "ShortInlineBrTarget";
        OperandType[OperandType["ShortInlineI"] = 16] = "ShortInlineI";
        OperandType[OperandType["ShortInlineR"] = 17] = "ShortInlineR";
        OperandType[OperandType["ShortInlineVar"] = 18] = "ShortInlineVar";
      })(OperandType = Emit.OperandType || (Emit.OperandType = {}));

      var PEFileKinds;

      (function (PEFileKinds) {
        PEFileKinds[PEFileKinds["Dll"] = 1] = "Dll";
        PEFileKinds[PEFileKinds["ConsoleApplication"] = 2] = "ConsoleApplication";
        PEFileKinds[PEFileKinds["WindowApplication"] = 3] = "WindowApplication";
      })(PEFileKinds = Emit.PEFileKinds || (Emit.PEFileKinds = {}));

      var PackingSize;

      (function (PackingSize) {
        PackingSize[PackingSize["Unspecified"] = 0] = "Unspecified";
        PackingSize[PackingSize["Size1"] = 1] = "Size1";
        PackingSize[PackingSize["Size2"] = 2] = "Size2";
        PackingSize[PackingSize["Size4"] = 4] = "Size4";
        PackingSize[PackingSize["Size8"] = 8] = "Size8";
        PackingSize[PackingSize["Size16"] = 16] = "Size16";
        PackingSize[PackingSize["Size32"] = 32] = "Size32";
        PackingSize[PackingSize["Size64"] = 64] = "Size64";
        PackingSize[PackingSize["Size128"] = 128] = "Size128";
      })(PackingSize = Emit.PackingSize || (Emit.PackingSize = {}));

      var StackBehaviour;

      (function (StackBehaviour) {
        StackBehaviour[StackBehaviour["Pop0"] = 0] = "Pop0";
        StackBehaviour[StackBehaviour["Pop1"] = 1] = "Pop1";
        StackBehaviour[StackBehaviour["Pop1_pop1"] = 2] = "Pop1_pop1";
        StackBehaviour[StackBehaviour["Popi"] = 3] = "Popi";
        StackBehaviour[StackBehaviour["Popi_pop1"] = 4] = "Popi_pop1";
        StackBehaviour[StackBehaviour["Popi_popi"] = 5] = "Popi_popi";
        StackBehaviour[StackBehaviour["Popi_popi8"] = 6] = "Popi_popi8";
        StackBehaviour[StackBehaviour["Popi_popi_popi"] = 7] = "Popi_popi_popi";
        StackBehaviour[StackBehaviour["Popi_popr4"] = 8] = "Popi_popr4";
        StackBehaviour[StackBehaviour["Popi_popr8"] = 9] = "Popi_popr8";
        StackBehaviour[StackBehaviour["Popref"] = 10] = "Popref";
        StackBehaviour[StackBehaviour["Popref_pop1"] = 11] = "Popref_pop1";
        StackBehaviour[StackBehaviour["Popref_popi"] = 12] = "Popref_popi";
        StackBehaviour[StackBehaviour["Popref_popi_popi"] = 13] = "Popref_popi_popi";
        StackBehaviour[StackBehaviour["Popref_popi_popi8"] = 14] = "Popref_popi_popi8";
        StackBehaviour[StackBehaviour["Popref_popi_popr4"] = 15] = "Popref_popi_popr4";
        StackBehaviour[StackBehaviour["Popref_popi_popr8"] = 16] = "Popref_popi_popr8";
        StackBehaviour[StackBehaviour["Popref_popi_popref"] = 17] = "Popref_popi_popref";
        StackBehaviour[StackBehaviour["Push0"] = 18] = "Push0";
        StackBehaviour[StackBehaviour["Push1"] = 19] = "Push1";
        StackBehaviour[StackBehaviour["Push1_push1"] = 20] = "Push1_push1";
        StackBehaviour[StackBehaviour["Pushi"] = 21] = "Pushi";
        StackBehaviour[StackBehaviour["Pushi8"] = 22] = "Pushi8";
        StackBehaviour[StackBehaviour["Pushr4"] = 23] = "Pushr4";
        StackBehaviour[StackBehaviour["Pushr8"] = 24] = "Pushr8";
        StackBehaviour[StackBehaviour["Pushref"] = 25] = "Pushref";
        StackBehaviour[StackBehaviour["Varpop"] = 26] = "Varpop";
        StackBehaviour[StackBehaviour["Varpush"] = 27] = "Varpush";
        StackBehaviour[StackBehaviour["Popref_popi_pop1"] = 28] = "Popref_popi_pop1";
      })(StackBehaviour = Emit.StackBehaviour || (Emit.StackBehaviour = {}));
    })(Emit = Reflection.Emit || (Reflection.Emit = {}));

    var Metadata;

    (function (Metadata) {})(Metadata = Reflection.Metadata || (Reflection.Metadata = {}));
  })(Reflection = System.Reflection || (System.Reflection = {}));

  var Resources;

  (function (Resources) {
    var UltimateResourceFallbackLocation;

    (function (UltimateResourceFallbackLocation) {
      UltimateResourceFallbackLocation[UltimateResourceFallbackLocation["MainAssembly"] = 0] = "MainAssembly";
      UltimateResourceFallbackLocation[UltimateResourceFallbackLocation["Satellite"] = 1] = "Satellite";
    })(UltimateResourceFallbackLocation = Resources.UltimateResourceFallbackLocation || (Resources.UltimateResourceFallbackLocation = {}));
  })(Resources = System.Resources || (System.Resources = {}));

  var Runtime;

  (function (Runtime) {
    var GCLargeObjectHeapCompactionMode;

    (function (GCLargeObjectHeapCompactionMode) {
      GCLargeObjectHeapCompactionMode[GCLargeObjectHeapCompactionMode["Default"] = 1] = "Default";
      GCLargeObjectHeapCompactionMode[GCLargeObjectHeapCompactionMode["CompactOnce"] = 2] = "CompactOnce";
    })(GCLargeObjectHeapCompactionMode = Runtime.GCLargeObjectHeapCompactionMode || (Runtime.GCLargeObjectHeapCompactionMode = {}));

    var GCLatencyMode;

    (function (GCLatencyMode) {
      GCLatencyMode[GCLatencyMode["Batch"] = 0] = "Batch";
      GCLatencyMode[GCLatencyMode["Interactive"] = 1] = "Interactive";
      GCLatencyMode[GCLatencyMode["LowLatency"] = 2] = "LowLatency";
      GCLatencyMode[GCLatencyMode["SustainedLowLatency"] = 3] = "SustainedLowLatency";
      GCLatencyMode[GCLatencyMode["NoGCRegion"] = 4] = "NoGCRegion";
    })(GCLatencyMode = Runtime.GCLatencyMode || (Runtime.GCLatencyMode = {}));

    var CompilerServices;

    (function (CompilerServices) {
      var LoadHint;

      (function (LoadHint) {
        LoadHint[LoadHint["Default"] = 0] = "Default";
        LoadHint[LoadHint["Always"] = 1] = "Always";
        LoadHint[LoadHint["Sometimes"] = 2] = "Sometimes";
      })(LoadHint = CompilerServices.LoadHint || (CompilerServices.LoadHint = {}));

      var CompilationRelaxations;

      (function (CompilationRelaxations) {
        CompilationRelaxations[CompilationRelaxations["NoStringInterning"] = 8] = "NoStringInterning";
      })(CompilationRelaxations = CompilerServices.CompilationRelaxations || (CompilerServices.CompilationRelaxations = {}));

      var MethodImplOptions;

      (function (MethodImplOptions) {
        MethodImplOptions[MethodImplOptions["Unmanaged"] = 4] = "Unmanaged";
        MethodImplOptions[MethodImplOptions["ForwardRef"] = 16] = "ForwardRef";
        MethodImplOptions[MethodImplOptions["PreserveSig"] = 128] = "PreserveSig";
        MethodImplOptions[MethodImplOptions["InternalCall"] = 4096] = "InternalCall";
        MethodImplOptions[MethodImplOptions["Synchronized"] = 32] = "Synchronized";
        MethodImplOptions[MethodImplOptions["NoInlining"] = 8] = "NoInlining";
        MethodImplOptions[MethodImplOptions["AggressiveInlining"] = 256] = "AggressiveInlining";
        MethodImplOptions[MethodImplOptions["NoOptimization"] = 64] = "NoOptimization";
      })(MethodImplOptions = CompilerServices.MethodImplOptions || (CompilerServices.MethodImplOptions = {}));

      var MethodCodeType;

      (function (MethodCodeType) {
        MethodCodeType[MethodCodeType["IL"] = 0] = "IL";
        MethodCodeType[MethodCodeType["Native"] = 1] = "Native";
        MethodCodeType[MethodCodeType["OPTIL"] = 2] = "OPTIL";
        MethodCodeType[MethodCodeType["Runtime"] = 3] = "Runtime";
      })(MethodCodeType = CompilerServices.MethodCodeType || (CompilerServices.MethodCodeType = {}));
    })(CompilerServices = Runtime.CompilerServices || (Runtime.CompilerServices = {}));

    var ConstrainedExecution;

    (function (ConstrainedExecution) {
      var Consistency;

      (function (Consistency) {
        Consistency[Consistency["MayCorruptProcess"] = 0] = "MayCorruptProcess";
        Consistency[Consistency["MayCorruptAppDomain"] = 1] = "MayCorruptAppDomain";
        Consistency[Consistency["MayCorruptInstance"] = 2] = "MayCorruptInstance";
        Consistency[Consistency["WillNotCorruptState"] = 3] = "WillNotCorruptState";
      })(Consistency = ConstrainedExecution.Consistency || (ConstrainedExecution.Consistency = {}));

      var Cer;

      (function (Cer) {
        Cer[Cer["None"] = 0] = "None";
        Cer[Cer["MayFail"] = 1] = "MayFail";
        Cer[Cer["Success"] = 2] = "Success";
      })(Cer = ConstrainedExecution.Cer || (ConstrainedExecution.Cer = {}));
    })(ConstrainedExecution = Runtime.ConstrainedExecution || (Runtime.ConstrainedExecution = {}));

    var DesignerServices;

    (function (DesignerServices) {})(DesignerServices = Runtime.DesignerServices || (Runtime.DesignerServices = {}));

    var ExceptionServices;

    (function (ExceptionServices) {})(ExceptionServices = Runtime.ExceptionServices || (Runtime.ExceptionServices = {}));

    var Hosting;

    (function (Hosting) {})(Hosting = Runtime.Hosting || (Runtime.Hosting = {}));

    var InteropServices;

    (function (InteropServices) {
      var Architecture;

      (function (Architecture) {
        Architecture[Architecture["X86"] = 0] = "X86";
        Architecture[Architecture["X64"] = 1] = "X64";
        Architecture[Architecture["Arm"] = 2] = "Arm";
        Architecture[Architecture["Arm64"] = 3] = "Arm64";
      })(Architecture = InteropServices.Architecture || (InteropServices.Architecture = {}));

      var ComInterfaceType;

      (function (ComInterfaceType) {
        ComInterfaceType[ComInterfaceType["InterfaceIsDual"] = 0] = "InterfaceIsDual";
        ComInterfaceType[ComInterfaceType["InterfaceIsIUnknown"] = 1] = "InterfaceIsIUnknown";
        ComInterfaceType[ComInterfaceType["InterfaceIsIDispatch"] = 2] = "InterfaceIsIDispatch";
        ComInterfaceType[ComInterfaceType["InterfaceIsIInspectable"] = 3] = "InterfaceIsIInspectable";
      })(ComInterfaceType = InteropServices.ComInterfaceType || (InteropServices.ComInterfaceType = {}));

      var ClassInterfaceType;

      (function (ClassInterfaceType) {
        ClassInterfaceType[ClassInterfaceType["None"] = 0] = "None";
        ClassInterfaceType[ClassInterfaceType["AutoDispatch"] = 1] = "AutoDispatch";
        ClassInterfaceType[ClassInterfaceType["AutoDual"] = 2] = "AutoDual";
      })(ClassInterfaceType = InteropServices.ClassInterfaceType || (InteropServices.ClassInterfaceType = {}));

      var IDispatchImplType;

      (function (IDispatchImplType) {
        IDispatchImplType[IDispatchImplType["SystemDefinedImpl"] = 0] = "SystemDefinedImpl";
        IDispatchImplType[IDispatchImplType["InternalImpl"] = 1] = "InternalImpl";
        IDispatchImplType[IDispatchImplType["CompatibleImpl"] = 2] = "CompatibleImpl";
      })(IDispatchImplType = InteropServices.IDispatchImplType || (InteropServices.IDispatchImplType = {}));

      var TypeLibTypeFlags;

      (function (TypeLibTypeFlags) {
        TypeLibTypeFlags[TypeLibTypeFlags["FAppObject"] = 1] = "FAppObject";
        TypeLibTypeFlags[TypeLibTypeFlags["FCanCreate"] = 2] = "FCanCreate";
        TypeLibTypeFlags[TypeLibTypeFlags["FLicensed"] = 4] = "FLicensed";
        TypeLibTypeFlags[TypeLibTypeFlags["FPreDeclId"] = 8] = "FPreDeclId";
        TypeLibTypeFlags[TypeLibTypeFlags["FHidden"] = 16] = "FHidden";
        TypeLibTypeFlags[TypeLibTypeFlags["FControl"] = 32] = "FControl";
        TypeLibTypeFlags[TypeLibTypeFlags["FDual"] = 64] = "FDual";
        TypeLibTypeFlags[TypeLibTypeFlags["FNonExtensible"] = 128] = "FNonExtensible";
        TypeLibTypeFlags[TypeLibTypeFlags["FOleAutomation"] = 256] = "FOleAutomation";
        TypeLibTypeFlags[TypeLibTypeFlags["FRestricted"] = 512] = "FRestricted";
        TypeLibTypeFlags[TypeLibTypeFlags["FAggregatable"] = 1024] = "FAggregatable";
        TypeLibTypeFlags[TypeLibTypeFlags["FReplaceable"] = 2048] = "FReplaceable";
        TypeLibTypeFlags[TypeLibTypeFlags["FDispatchable"] = 4096] = "FDispatchable";
        TypeLibTypeFlags[TypeLibTypeFlags["FReverseBind"] = 8192] = "FReverseBind";
      })(TypeLibTypeFlags = InteropServices.TypeLibTypeFlags || (InteropServices.TypeLibTypeFlags = {}));

      var TypeLibFuncFlags;

      (function (TypeLibFuncFlags) {
        TypeLibFuncFlags[TypeLibFuncFlags["FRestricted"] = 1] = "FRestricted";
        TypeLibFuncFlags[TypeLibFuncFlags["FSource"] = 2] = "FSource";
        TypeLibFuncFlags[TypeLibFuncFlags["FBindable"] = 4] = "FBindable";
        TypeLibFuncFlags[TypeLibFuncFlags["FRequestEdit"] = 8] = "FRequestEdit";
        TypeLibFuncFlags[TypeLibFuncFlags["FDisplayBind"] = 16] = "FDisplayBind";
        TypeLibFuncFlags[TypeLibFuncFlags["FDefaultBind"] = 32] = "FDefaultBind";
        TypeLibFuncFlags[TypeLibFuncFlags["FHidden"] = 64] = "FHidden";
        TypeLibFuncFlags[TypeLibFuncFlags["FUsesGetLastError"] = 128] = "FUsesGetLastError";
        TypeLibFuncFlags[TypeLibFuncFlags["FDefaultCollelem"] = 256] = "FDefaultCollelem";
        TypeLibFuncFlags[TypeLibFuncFlags["FUiDefault"] = 512] = "FUiDefault";
        TypeLibFuncFlags[TypeLibFuncFlags["FNonBrowsable"] = 1024] = "FNonBrowsable";
        TypeLibFuncFlags[TypeLibFuncFlags["FReplaceable"] = 2048] = "FReplaceable";
        TypeLibFuncFlags[TypeLibFuncFlags["FImmediateBind"] = 4096] = "FImmediateBind";
      })(TypeLibFuncFlags = InteropServices.TypeLibFuncFlags || (InteropServices.TypeLibFuncFlags = {}));

      var TypeLibVarFlags;

      (function (TypeLibVarFlags) {
        TypeLibVarFlags[TypeLibVarFlags["FReadOnly"] = 1] = "FReadOnly";
        TypeLibVarFlags[TypeLibVarFlags["FSource"] = 2] = "FSource";
        TypeLibVarFlags[TypeLibVarFlags["FBindable"] = 4] = "FBindable";
        TypeLibVarFlags[TypeLibVarFlags["FRequestEdit"] = 8] = "FRequestEdit";
        TypeLibVarFlags[TypeLibVarFlags["FDisplayBind"] = 16] = "FDisplayBind";
        TypeLibVarFlags[TypeLibVarFlags["FDefaultBind"] = 32] = "FDefaultBind";
        TypeLibVarFlags[TypeLibVarFlags["FHidden"] = 64] = "FHidden";
        TypeLibVarFlags[TypeLibVarFlags["FRestricted"] = 128] = "FRestricted";
        TypeLibVarFlags[TypeLibVarFlags["FDefaultCollelem"] = 256] = "FDefaultCollelem";
        TypeLibVarFlags[TypeLibVarFlags["FUiDefault"] = 512] = "FUiDefault";
        TypeLibVarFlags[TypeLibVarFlags["FNonBrowsable"] = 1024] = "FNonBrowsable";
        TypeLibVarFlags[TypeLibVarFlags["FReplaceable"] = 2048] = "FReplaceable";
        TypeLibVarFlags[TypeLibVarFlags["FImmediateBind"] = 4096] = "FImmediateBind";
      })(TypeLibVarFlags = InteropServices.TypeLibVarFlags || (InteropServices.TypeLibVarFlags = {}));

      var VarEnum;

      (function (VarEnum) {
        VarEnum[VarEnum["VT_EMPTY"] = 0] = "VT_EMPTY";
        VarEnum[VarEnum["VT_NULL"] = 1] = "VT_NULL";
        VarEnum[VarEnum["VT_I2"] = 2] = "VT_I2";
        VarEnum[VarEnum["VT_I4"] = 3] = "VT_I4";
        VarEnum[VarEnum["VT_R4"] = 4] = "VT_R4";
        VarEnum[VarEnum["VT_R8"] = 5] = "VT_R8";
        VarEnum[VarEnum["VT_CY"] = 6] = "VT_CY";
        VarEnum[VarEnum["VT_DATE"] = 7] = "VT_DATE";
        VarEnum[VarEnum["VT_BSTR"] = 8] = "VT_BSTR";
        VarEnum[VarEnum["VT_DISPATCH"] = 9] = "VT_DISPATCH";
        VarEnum[VarEnum["VT_ERROR"] = 10] = "VT_ERROR";
        VarEnum[VarEnum["VT_BOOL"] = 11] = "VT_BOOL";
        VarEnum[VarEnum["VT_VARIANT"] = 12] = "VT_VARIANT";
        VarEnum[VarEnum["VT_UNKNOWN"] = 13] = "VT_UNKNOWN";
        VarEnum[VarEnum["VT_DECIMAL"] = 14] = "VT_DECIMAL";
        VarEnum[VarEnum["VT_I1"] = 16] = "VT_I1";
        VarEnum[VarEnum["VT_UI1"] = 17] = "VT_UI1";
        VarEnum[VarEnum["VT_UI2"] = 18] = "VT_UI2";
        VarEnum[VarEnum["VT_UI4"] = 19] = "VT_UI4";
        VarEnum[VarEnum["VT_I8"] = 20] = "VT_I8";
        VarEnum[VarEnum["VT_UI8"] = 21] = "VT_UI8";
        VarEnum[VarEnum["VT_INT"] = 22] = "VT_INT";
        VarEnum[VarEnum["VT_UINT"] = 23] = "VT_UINT";
        VarEnum[VarEnum["VT_VOID"] = 24] = "VT_VOID";
        VarEnum[VarEnum["VT_HRESULT"] = 25] = "VT_HRESULT";
        VarEnum[VarEnum["VT_PTR"] = 26] = "VT_PTR";
        VarEnum[VarEnum["VT_SAFEARRAY"] = 27] = "VT_SAFEARRAY";
        VarEnum[VarEnum["VT_CARRAY"] = 28] = "VT_CARRAY";
        VarEnum[VarEnum["VT_USERDEFINED"] = 29] = "VT_USERDEFINED";
        VarEnum[VarEnum["VT_LPSTR"] = 30] = "VT_LPSTR";
        VarEnum[VarEnum["VT_LPWSTR"] = 31] = "VT_LPWSTR";
        VarEnum[VarEnum["VT_RECORD"] = 36] = "VT_RECORD";
        VarEnum[VarEnum["VT_FILETIME"] = 64] = "VT_FILETIME";
        VarEnum[VarEnum["VT_BLOB"] = 65] = "VT_BLOB";
        VarEnum[VarEnum["VT_STREAM"] = 66] = "VT_STREAM";
        VarEnum[VarEnum["VT_STORAGE"] = 67] = "VT_STORAGE";
        VarEnum[VarEnum["VT_STREAMED_OBJECT"] = 68] = "VT_STREAMED_OBJECT";
        VarEnum[VarEnum["VT_STORED_OBJECT"] = 69] = "VT_STORED_OBJECT";
        VarEnum[VarEnum["VT_BLOB_OBJECT"] = 70] = "VT_BLOB_OBJECT";
        VarEnum[VarEnum["VT_CF"] = 71] = "VT_CF";
        VarEnum[VarEnum["VT_CLSID"] = 72] = "VT_CLSID";
        VarEnum[VarEnum["VT_VECTOR"] = 4096] = "VT_VECTOR";
        VarEnum[VarEnum["VT_ARRAY"] = 8192] = "VT_ARRAY";
        VarEnum[VarEnum["VT_BYREF"] = 16384] = "VT_BYREF";
      })(VarEnum = InteropServices.VarEnum || (InteropServices.VarEnum = {}));

      var UnmanagedType;

      (function (UnmanagedType) {
        UnmanagedType[UnmanagedType["Bool"] = 2] = "Bool";
        UnmanagedType[UnmanagedType["I1"] = 3] = "I1";
        UnmanagedType[UnmanagedType["U1"] = 4] = "U1";
        UnmanagedType[UnmanagedType["I2"] = 5] = "I2";
        UnmanagedType[UnmanagedType["U2"] = 6] = "U2";
        UnmanagedType[UnmanagedType["I4"] = 7] = "I4";
        UnmanagedType[UnmanagedType["U4"] = 8] = "U4";
        UnmanagedType[UnmanagedType["I8"] = 9] = "I8";
        UnmanagedType[UnmanagedType["U8"] = 10] = "U8";
        UnmanagedType[UnmanagedType["R4"] = 11] = "R4";
        UnmanagedType[UnmanagedType["R8"] = 12] = "R8";
        UnmanagedType[UnmanagedType["Currency"] = 15] = "Currency";
        UnmanagedType[UnmanagedType["BStr"] = 19] = "BStr";
        UnmanagedType[UnmanagedType["LPStr"] = 20] = "LPStr";
        UnmanagedType[UnmanagedType["LPWStr"] = 21] = "LPWStr";
        UnmanagedType[UnmanagedType["LPTStr"] = 22] = "LPTStr";
        UnmanagedType[UnmanagedType["ByValTStr"] = 23] = "ByValTStr";
        UnmanagedType[UnmanagedType["IUnknown"] = 25] = "IUnknown";
        UnmanagedType[UnmanagedType["IDispatch"] = 26] = "IDispatch";
        UnmanagedType[UnmanagedType["Struct"] = 27] = "Struct";
        UnmanagedType[UnmanagedType["Interface"] = 28] = "Interface";
        UnmanagedType[UnmanagedType["SafeArray"] = 29] = "SafeArray";
        UnmanagedType[UnmanagedType["ByValArray"] = 30] = "ByValArray";
        UnmanagedType[UnmanagedType["SysInt"] = 31] = "SysInt";
        UnmanagedType[UnmanagedType["SysUInt"] = 32] = "SysUInt";
        UnmanagedType[UnmanagedType["VBByRefStr"] = 34] = "VBByRefStr";
        UnmanagedType[UnmanagedType["AnsiBStr"] = 35] = "AnsiBStr";
        UnmanagedType[UnmanagedType["TBStr"] = 36] = "TBStr";
        UnmanagedType[UnmanagedType["VariantBool"] = 37] = "VariantBool";
        UnmanagedType[UnmanagedType["FunctionPtr"] = 38] = "FunctionPtr";
        UnmanagedType[UnmanagedType["AsAny"] = 40] = "AsAny";
        UnmanagedType[UnmanagedType["LPArray"] = 42] = "LPArray";
        UnmanagedType[UnmanagedType["LPStruct"] = 43] = "LPStruct";
        UnmanagedType[UnmanagedType["CustomMarshaler"] = 44] = "CustomMarshaler";
        UnmanagedType[UnmanagedType["Error"] = 45] = "Error";
        UnmanagedType[UnmanagedType["IInspectable"] = 46] = "IInspectable";
        UnmanagedType[UnmanagedType["HString"] = 47] = "HString";
        UnmanagedType[UnmanagedType["LPUTF8Str"] = 48] = "LPUTF8Str";
      })(UnmanagedType = InteropServices.UnmanagedType || (InteropServices.UnmanagedType = {}));

      var DllImportSearchPath;

      (function (DllImportSearchPath) {
        DllImportSearchPath[DllImportSearchPath["UseDllDirectoryForDependencies"] = 256] = "UseDllDirectoryForDependencies";
        DllImportSearchPath[DllImportSearchPath["ApplicationDirectory"] = 512] = "ApplicationDirectory";
        DllImportSearchPath[DllImportSearchPath["UserDirectories"] = 1024] = "UserDirectories";
        DllImportSearchPath[DllImportSearchPath["System32"] = 2048] = "System32";
        DllImportSearchPath[DllImportSearchPath["SafeDirectories"] = 4096] = "SafeDirectories";
        DllImportSearchPath[DllImportSearchPath["AssemblyDirectory"] = 2] = "AssemblyDirectory";
        DllImportSearchPath[DllImportSearchPath["LegacyBehavior"] = 0] = "LegacyBehavior";
      })(DllImportSearchPath = InteropServices.DllImportSearchPath || (InteropServices.DllImportSearchPath = {}));

      var CallingConvention;

      (function (CallingConvention) {
        CallingConvention[CallingConvention["Winapi"] = 1] = "Winapi";
        CallingConvention[CallingConvention["Cdecl"] = 2] = "Cdecl";
        CallingConvention[CallingConvention["StdCall"] = 3] = "StdCall";
        CallingConvention[CallingConvention["ThisCall"] = 4] = "ThisCall";
        CallingConvention[CallingConvention["FastCall"] = 5] = "FastCall";
      })(CallingConvention = InteropServices.CallingConvention || (InteropServices.CallingConvention = {}));

      var CharSet;

      (function (CharSet) {
        CharSet[CharSet["None"] = 1] = "None";
        CharSet[CharSet["Ansi"] = 2] = "Ansi";
        CharSet[CharSet["Unicode"] = 3] = "Unicode";
        CharSet[CharSet["Auto"] = 4] = "Auto";
      })(CharSet = InteropServices.CharSet || (InteropServices.CharSet = {}));

      var ComMemberType;

      (function (ComMemberType) {
        ComMemberType[ComMemberType["Method"] = 0] = "Method";
        ComMemberType[ComMemberType["PropGet"] = 1] = "PropGet";
        ComMemberType[ComMemberType["PropSet"] = 2] = "PropSet";
      })(ComMemberType = InteropServices.ComMemberType || (InteropServices.ComMemberType = {}));

      var CustomQueryInterfaceResult;

      (function (CustomQueryInterfaceResult) {
        CustomQueryInterfaceResult[CustomQueryInterfaceResult["Handled"] = 0] = "Handled";
        CustomQueryInterfaceResult[CustomQueryInterfaceResult["NotHandled"] = 1] = "NotHandled";
        CustomQueryInterfaceResult[CustomQueryInterfaceResult["Failed"] = 2] = "Failed";
      })(CustomQueryInterfaceResult = InteropServices.CustomQueryInterfaceResult || (InteropServices.CustomQueryInterfaceResult = {}));

      var AssemblyRegistrationFlags;

      (function (AssemblyRegistrationFlags) {
        AssemblyRegistrationFlags[AssemblyRegistrationFlags["None"] = 0] = "None";
        AssemblyRegistrationFlags[AssemblyRegistrationFlags["SetCodeBase"] = 1] = "SetCodeBase";
      })(AssemblyRegistrationFlags = InteropServices.AssemblyRegistrationFlags || (InteropServices.AssemblyRegistrationFlags = {}));

      var LayoutKind;

      (function (LayoutKind) {
        LayoutKind[LayoutKind["Sequential"] = 0] = "Sequential";
        LayoutKind[LayoutKind["Explicit"] = 2] = "Explicit";
        LayoutKind[LayoutKind["Auto"] = 3] = "Auto";
      })(LayoutKind = InteropServices.LayoutKind || (InteropServices.LayoutKind = {}));

      var TYPEKIND;

      (function (TYPEKIND) {
        TYPEKIND[TYPEKIND["TKIND_ENUM"] = 0] = "TKIND_ENUM";
        TYPEKIND[TYPEKIND["TKIND_RECORD"] = 1] = "TKIND_RECORD";
        TYPEKIND[TYPEKIND["TKIND_MODULE"] = 2] = "TKIND_MODULE";
        TYPEKIND[TYPEKIND["TKIND_INTERFACE"] = 3] = "TKIND_INTERFACE";
        TYPEKIND[TYPEKIND["TKIND_DISPATCH"] = 4] = "TKIND_DISPATCH";
        TYPEKIND[TYPEKIND["TKIND_COCLASS"] = 5] = "TKIND_COCLASS";
        TYPEKIND[TYPEKIND["TKIND_ALIAS"] = 6] = "TKIND_ALIAS";
        TYPEKIND[TYPEKIND["TKIND_UNION"] = 7] = "TKIND_UNION";
        TYPEKIND[TYPEKIND["TKIND_MAX"] = 8] = "TKIND_MAX";
      })(TYPEKIND = InteropServices.TYPEKIND || (InteropServices.TYPEKIND = {}));

      var TYPEFLAGS;

      (function (TYPEFLAGS) {
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FAPPOBJECT"] = 1] = "TYPEFLAG_FAPPOBJECT";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FCANCREATE"] = 2] = "TYPEFLAG_FCANCREATE";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FLICENSED"] = 4] = "TYPEFLAG_FLICENSED";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FPREDECLID"] = 8] = "TYPEFLAG_FPREDECLID";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FHIDDEN"] = 16] = "TYPEFLAG_FHIDDEN";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FCONTROL"] = 32] = "TYPEFLAG_FCONTROL";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FDUAL"] = 64] = "TYPEFLAG_FDUAL";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FNONEXTENSIBLE"] = 128] = "TYPEFLAG_FNONEXTENSIBLE";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FOLEAUTOMATION"] = 256] = "TYPEFLAG_FOLEAUTOMATION";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FRESTRICTED"] = 512] = "TYPEFLAG_FRESTRICTED";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FAGGREGATABLE"] = 1024] = "TYPEFLAG_FAGGREGATABLE";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FREPLACEABLE"] = 2048] = "TYPEFLAG_FREPLACEABLE";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FDISPATCHABLE"] = 4096] = "TYPEFLAG_FDISPATCHABLE";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FREVERSEBIND"] = 8192] = "TYPEFLAG_FREVERSEBIND";
        TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FPROXY"] = 16384] = "TYPEFLAG_FPROXY";
      })(TYPEFLAGS = InteropServices.TYPEFLAGS || (InteropServices.TYPEFLAGS = {}));

      var IMPLTYPEFLAGS;

      (function (IMPLTYPEFLAGS) {
        IMPLTYPEFLAGS[IMPLTYPEFLAGS["IMPLTYPEFLAG_FDEFAULT"] = 1] = "IMPLTYPEFLAG_FDEFAULT";
        IMPLTYPEFLAGS[IMPLTYPEFLAGS["IMPLTYPEFLAG_FSOURCE"] = 2] = "IMPLTYPEFLAG_FSOURCE";
        IMPLTYPEFLAGS[IMPLTYPEFLAGS["IMPLTYPEFLAG_FRESTRICTED"] = 4] = "IMPLTYPEFLAG_FRESTRICTED";
        IMPLTYPEFLAGS[IMPLTYPEFLAGS["IMPLTYPEFLAG_FDEFAULTVTABLE"] = 8] = "IMPLTYPEFLAG_FDEFAULTVTABLE";
      })(IMPLTYPEFLAGS = InteropServices.IMPLTYPEFLAGS || (InteropServices.IMPLTYPEFLAGS = {}));

      var IDLFLAG;

      (function (IDLFLAG) {
        IDLFLAG[IDLFLAG["IDLFLAG_NONE"] = 0] = "IDLFLAG_NONE";
        IDLFLAG[IDLFLAG["IDLFLAG_FIN"] = 1] = "IDLFLAG_FIN";
        IDLFLAG[IDLFLAG["IDLFLAG_FOUT"] = 2] = "IDLFLAG_FOUT";
        IDLFLAG[IDLFLAG["IDLFLAG_FLCID"] = 4] = "IDLFLAG_FLCID";
        IDLFLAG[IDLFLAG["IDLFLAG_FRETVAL"] = 8] = "IDLFLAG_FRETVAL";
      })(IDLFLAG = InteropServices.IDLFLAG || (InteropServices.IDLFLAG = {}));

      var PARAMFLAG;

      (function (PARAMFLAG) {
        PARAMFLAG[PARAMFLAG["PARAMFLAG_NONE"] = 0] = "PARAMFLAG_NONE";
        PARAMFLAG[PARAMFLAG["PARAMFLAG_FIN"] = 1] = "PARAMFLAG_FIN";
        PARAMFLAG[PARAMFLAG["PARAMFLAG_FOUT"] = 2] = "PARAMFLAG_FOUT";
        PARAMFLAG[PARAMFLAG["PARAMFLAG_FLCID"] = 4] = "PARAMFLAG_FLCID";
        PARAMFLAG[PARAMFLAG["PARAMFLAG_FRETVAL"] = 8] = "PARAMFLAG_FRETVAL";
        PARAMFLAG[PARAMFLAG["PARAMFLAG_FOPT"] = 16] = "PARAMFLAG_FOPT";
        PARAMFLAG[PARAMFLAG["PARAMFLAG_FHASDEFAULT"] = 32] = "PARAMFLAG_FHASDEFAULT";
        PARAMFLAG[PARAMFLAG["PARAMFLAG_FHASCUSTDATA"] = 64] = "PARAMFLAG_FHASCUSTDATA";
      })(PARAMFLAG = InteropServices.PARAMFLAG || (InteropServices.PARAMFLAG = {}));

      var FUNCKIND;

      (function (FUNCKIND) {
        FUNCKIND[FUNCKIND["FUNC_VIRTUAL"] = 0] = "FUNC_VIRTUAL";
        FUNCKIND[FUNCKIND["FUNC_PUREVIRTUAL"] = 1] = "FUNC_PUREVIRTUAL";
        FUNCKIND[FUNCKIND["FUNC_NONVIRTUAL"] = 2] = "FUNC_NONVIRTUAL";
        FUNCKIND[FUNCKIND["FUNC_STATIC"] = 3] = "FUNC_STATIC";
        FUNCKIND[FUNCKIND["FUNC_DISPATCH"] = 4] = "FUNC_DISPATCH";
      })(FUNCKIND = InteropServices.FUNCKIND || (InteropServices.FUNCKIND = {}));

      var INVOKEKIND;

      (function (INVOKEKIND) {
        INVOKEKIND[INVOKEKIND["INVOKE_FUNC"] = 1] = "INVOKE_FUNC";
        INVOKEKIND[INVOKEKIND["INVOKE_PROPERTYGET"] = 2] = "INVOKE_PROPERTYGET";
        INVOKEKIND[INVOKEKIND["INVOKE_PROPERTYPUT"] = 4] = "INVOKE_PROPERTYPUT";
        INVOKEKIND[INVOKEKIND["INVOKE_PROPERTYPUTREF"] = 8] = "INVOKE_PROPERTYPUTREF";
      })(INVOKEKIND = InteropServices.INVOKEKIND || (InteropServices.INVOKEKIND = {}));

      var CALLCONV;

      (function (CALLCONV) {
        CALLCONV[CALLCONV["CC_CDECL"] = 1] = "CC_CDECL";
        CALLCONV[CALLCONV["CC_MSCPASCAL"] = 2] = "CC_MSCPASCAL";
        CALLCONV[CALLCONV["CC_PASCAL"] = 2] = "CC_PASCAL";
        CALLCONV[CALLCONV["CC_MACPASCAL"] = 3] = "CC_MACPASCAL";
        CALLCONV[CALLCONV["CC_STDCALL"] = 4] = "CC_STDCALL";
        CALLCONV[CALLCONV["CC_RESERVED"] = 5] = "CC_RESERVED";
        CALLCONV[CALLCONV["CC_SYSCALL"] = 6] = "CC_SYSCALL";
        CALLCONV[CALLCONV["CC_MPWCDECL"] = 7] = "CC_MPWCDECL";
        CALLCONV[CALLCONV["CC_MPWPASCAL"] = 8] = "CC_MPWPASCAL";
        CALLCONV[CALLCONV["CC_MAX"] = 9] = "CC_MAX";
      })(CALLCONV = InteropServices.CALLCONV || (InteropServices.CALLCONV = {}));

      var FUNCFLAGS;

      (function (FUNCFLAGS) {
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FRESTRICTED"] = 1] = "FUNCFLAG_FRESTRICTED";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FSOURCE"] = 2] = "FUNCFLAG_FSOURCE";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FBINDABLE"] = 4] = "FUNCFLAG_FBINDABLE";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FREQUESTEDIT"] = 8] = "FUNCFLAG_FREQUESTEDIT";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FDISPLAYBIND"] = 16] = "FUNCFLAG_FDISPLAYBIND";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FDEFAULTBIND"] = 32] = "FUNCFLAG_FDEFAULTBIND";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FHIDDEN"] = 64] = "FUNCFLAG_FHIDDEN";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FUSESGETLASTERROR"] = 128] = "FUNCFLAG_FUSESGETLASTERROR";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FDEFAULTCOLLELEM"] = 256] = "FUNCFLAG_FDEFAULTCOLLELEM";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FUIDEFAULT"] = 512] = "FUNCFLAG_FUIDEFAULT";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FNONBROWSABLE"] = 1024] = "FUNCFLAG_FNONBROWSABLE";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FREPLACEABLE"] = 2048] = "FUNCFLAG_FREPLACEABLE";
        FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FIMMEDIATEBIND"] = 4096] = "FUNCFLAG_FIMMEDIATEBIND";
      })(FUNCFLAGS = InteropServices.FUNCFLAGS || (InteropServices.FUNCFLAGS = {}));

      var VARFLAGS;

      (function (VARFLAGS) {
        VARFLAGS[VARFLAGS["VARFLAG_FREADONLY"] = 1] = "VARFLAG_FREADONLY";
        VARFLAGS[VARFLAGS["VARFLAG_FSOURCE"] = 2] = "VARFLAG_FSOURCE";
        VARFLAGS[VARFLAGS["VARFLAG_FBINDABLE"] = 4] = "VARFLAG_FBINDABLE";
        VARFLAGS[VARFLAGS["VARFLAG_FREQUESTEDIT"] = 8] = "VARFLAG_FREQUESTEDIT";
        VARFLAGS[VARFLAGS["VARFLAG_FDISPLAYBIND"] = 16] = "VARFLAG_FDISPLAYBIND";
        VARFLAGS[VARFLAGS["VARFLAG_FDEFAULTBIND"] = 32] = "VARFLAG_FDEFAULTBIND";
        VARFLAGS[VARFLAGS["VARFLAG_FHIDDEN"] = 64] = "VARFLAG_FHIDDEN";
        VARFLAGS[VARFLAGS["VARFLAG_FRESTRICTED"] = 128] = "VARFLAG_FRESTRICTED";
        VARFLAGS[VARFLAGS["VARFLAG_FDEFAULTCOLLELEM"] = 256] = "VARFLAG_FDEFAULTCOLLELEM";
        VARFLAGS[VARFLAGS["VARFLAG_FUIDEFAULT"] = 512] = "VARFLAG_FUIDEFAULT";
        VARFLAGS[VARFLAGS["VARFLAG_FNONBROWSABLE"] = 1024] = "VARFLAG_FNONBROWSABLE";
        VARFLAGS[VARFLAGS["VARFLAG_FREPLACEABLE"] = 2048] = "VARFLAG_FREPLACEABLE";
        VARFLAGS[VARFLAGS["VARFLAG_FIMMEDIATEBIND"] = 4096] = "VARFLAG_FIMMEDIATEBIND";
      })(VARFLAGS = InteropServices.VARFLAGS || (InteropServices.VARFLAGS = {}));

      var CustomQueryInterfaceMode;

      (function (CustomQueryInterfaceMode) {
        CustomQueryInterfaceMode[CustomQueryInterfaceMode["Allow"] = 1] = "Allow";
        CustomQueryInterfaceMode[CustomQueryInterfaceMode["Ignore"] = 0] = "Ignore";
      })(CustomQueryInterfaceMode = InteropServices.CustomQueryInterfaceMode || (InteropServices.CustomQueryInterfaceMode = {}));

      var DESCKIND;

      (function (DESCKIND) {
        DESCKIND[DESCKIND["DESCKIND_NONE"] = 0] = "DESCKIND_NONE";
        DESCKIND[DESCKIND["DESCKIND_FUNCDESC"] = 1] = "DESCKIND_FUNCDESC";
        DESCKIND[DESCKIND["DESCKIND_VARDESC"] = 2] = "DESCKIND_VARDESC";
        DESCKIND[DESCKIND["DESCKIND_TYPECOMP"] = 3] = "DESCKIND_TYPECOMP";
        DESCKIND[DESCKIND["DESCKIND_IMPLICITAPPOBJ"] = 4] = "DESCKIND_IMPLICITAPPOBJ";
        DESCKIND[DESCKIND["DESCKIND_MAX"] = 5] = "DESCKIND_MAX";
      })(DESCKIND = InteropServices.DESCKIND || (InteropServices.DESCKIND = {}));

      var ExporterEventKind;

      (function (ExporterEventKind) {
        ExporterEventKind[ExporterEventKind["NOTIF_TYPECONVERTED"] = 0] = "NOTIF_TYPECONVERTED";
        ExporterEventKind[ExporterEventKind["NOTIF_CONVERTWARNING"] = 1] = "NOTIF_CONVERTWARNING";
        ExporterEventKind[ExporterEventKind["ERROR_REFTOINVALIDASSEMBLY"] = 2] = "ERROR_REFTOINVALIDASSEMBLY";
      })(ExporterEventKind = InteropServices.ExporterEventKind || (InteropServices.ExporterEventKind = {}));

      var GCHandleType;

      (function (GCHandleType) {
        GCHandleType[GCHandleType["Weak"] = 0] = "Weak";
        GCHandleType[GCHandleType["WeakTrackResurrection"] = 1] = "WeakTrackResurrection";
        GCHandleType[GCHandleType["Normal"] = 2] = "Normal";
        GCHandleType[GCHandleType["Pinned"] = 3] = "Pinned";
      })(GCHandleType = InteropServices.GCHandleType || (InteropServices.GCHandleType = {}));

      var ImporterEventKind;

      (function (ImporterEventKind) {
        ImporterEventKind[ImporterEventKind["NOTIF_TYPECONVERTED"] = 0] = "NOTIF_TYPECONVERTED";
        ImporterEventKind[ImporterEventKind["NOTIF_CONVERTWARNING"] = 1] = "NOTIF_CONVERTWARNING";
        ImporterEventKind[ImporterEventKind["ERROR_REFTOINVALIDTYPELIB"] = 2] = "ERROR_REFTOINVALIDTYPELIB";
      })(ImporterEventKind = InteropServices.ImporterEventKind || (InteropServices.ImporterEventKind = {}));

      var LIBFLAGS;

      (function (LIBFLAGS) {
        LIBFLAGS[LIBFLAGS["LIBFLAG_FRESTRICTED"] = 1] = "LIBFLAG_FRESTRICTED";
        LIBFLAGS[LIBFLAGS["LIBFLAG_FCONTROL"] = 2] = "LIBFLAG_FCONTROL";
        LIBFLAGS[LIBFLAGS["LIBFLAG_FHIDDEN"] = 4] = "LIBFLAG_FHIDDEN";
        LIBFLAGS[LIBFLAGS["LIBFLAG_FHASDISKIMAGE"] = 8] = "LIBFLAG_FHASDISKIMAGE";
      })(LIBFLAGS = InteropServices.LIBFLAGS || (InteropServices.LIBFLAGS = {}));

      var RegistrationClassContext;

      (function (RegistrationClassContext) {
        RegistrationClassContext[RegistrationClassContext["DisableActivateAsActivator"] = 32768] = "DisableActivateAsActivator";
        RegistrationClassContext[RegistrationClassContext["EnableActivateAsActivator"] = 65536] = "EnableActivateAsActivator";
        RegistrationClassContext[RegistrationClassContext["EnableCodeDownload"] = 8192] = "EnableCodeDownload";
        RegistrationClassContext[RegistrationClassContext["FromDefaultContext"] = 131072] = "FromDefaultContext";
        RegistrationClassContext[RegistrationClassContext["InProcessHandler"] = 2] = "InProcessHandler";
        RegistrationClassContext[RegistrationClassContext["InProcessHandler16"] = 32] = "InProcessHandler16";
        RegistrationClassContext[RegistrationClassContext["InProcessServer"] = 1] = "InProcessServer";
        RegistrationClassContext[RegistrationClassContext["InProcessServer16"] = 8] = "InProcessServer16";
        RegistrationClassContext[RegistrationClassContext["LocalServer"] = 4] = "LocalServer";
        RegistrationClassContext[RegistrationClassContext["NoCodeDownload"] = 1024] = "NoCodeDownload";
        RegistrationClassContext[RegistrationClassContext["NoCustomMarshal"] = 4096] = "NoCustomMarshal";
        RegistrationClassContext[RegistrationClassContext["NoFailureLog"] = 16384] = "NoFailureLog";
        RegistrationClassContext[RegistrationClassContext["RemoteServer"] = 16] = "RemoteServer";
        RegistrationClassContext[RegistrationClassContext["Reserved1"] = 64] = "Reserved1";
        RegistrationClassContext[RegistrationClassContext["Reserved2"] = 128] = "Reserved2";
        RegistrationClassContext[RegistrationClassContext["Reserved3"] = 256] = "Reserved3";
        RegistrationClassContext[RegistrationClassContext["Reserved4"] = 512] = "Reserved4";
        RegistrationClassContext[RegistrationClassContext["Reserved5"] = 2048] = "Reserved5";
      })(RegistrationClassContext = InteropServices.RegistrationClassContext || (InteropServices.RegistrationClassContext = {}));

      var RegistrationConnectionType;

      (function (RegistrationConnectionType) {
        RegistrationConnectionType[RegistrationConnectionType["MultipleUse"] = 1] = "MultipleUse";
        RegistrationConnectionType[RegistrationConnectionType["MultiSeparate"] = 2] = "MultiSeparate";
        RegistrationConnectionType[RegistrationConnectionType["SingleUse"] = 0] = "SingleUse";
        RegistrationConnectionType[RegistrationConnectionType["Suspended"] = 4] = "Suspended";
        RegistrationConnectionType[RegistrationConnectionType["Surrogate"] = 8] = "Surrogate";
      })(RegistrationConnectionType = InteropServices.RegistrationConnectionType || (InteropServices.RegistrationConnectionType = {}));

      var SYSKIND;

      (function (SYSKIND) {
        SYSKIND[SYSKIND["SYS_WIN16"] = 0] = "SYS_WIN16";
        SYSKIND[SYSKIND["SYS_WIN32"] = 1] = "SYS_WIN32";
        SYSKIND[SYSKIND["SYS_MAC"] = 2] = "SYS_MAC";
      })(SYSKIND = InteropServices.SYSKIND || (InteropServices.SYSKIND = {}));

      var TypeLibExporterFlags;

      (function (TypeLibExporterFlags) {
        TypeLibExporterFlags[TypeLibExporterFlags["OnlyReferenceRegistered"] = 1] = "OnlyReferenceRegistered";
        TypeLibExporterFlags[TypeLibExporterFlags["None"] = 0] = "None";
        TypeLibExporterFlags[TypeLibExporterFlags["CallerResolvedReferences"] = 2] = "CallerResolvedReferences";
        TypeLibExporterFlags[TypeLibExporterFlags["OldNames"] = 4] = "OldNames";
        TypeLibExporterFlags[TypeLibExporterFlags["ExportAs32Bit"] = 16] = "ExportAs32Bit";
        TypeLibExporterFlags[TypeLibExporterFlags["ExportAs64Bit"] = 32] = "ExportAs64Bit";
      })(TypeLibExporterFlags = InteropServices.TypeLibExporterFlags || (InteropServices.TypeLibExporterFlags = {}));

      var TypeLibImporterFlags;

      (function (TypeLibImporterFlags) {
        TypeLibImporterFlags[TypeLibImporterFlags["PrimaryInteropAssembly"] = 1] = "PrimaryInteropAssembly";
        TypeLibImporterFlags[TypeLibImporterFlags["UnsafeInterfaces"] = 2] = "UnsafeInterfaces";
        TypeLibImporterFlags[TypeLibImporterFlags["SafeArrayAsSystemArray"] = 4] = "SafeArrayAsSystemArray";
        TypeLibImporterFlags[TypeLibImporterFlags["TransformDispRetVals"] = 8] = "TransformDispRetVals";
        TypeLibImporterFlags[TypeLibImporterFlags["None"] = 0] = "None";
        TypeLibImporterFlags[TypeLibImporterFlags["PreventClassMembers"] = 16] = "PreventClassMembers";
        TypeLibImporterFlags[TypeLibImporterFlags["ImportAsAgnostic"] = 2048] = "ImportAsAgnostic";
        TypeLibImporterFlags[TypeLibImporterFlags["ImportAsItanium"] = 1024] = "ImportAsItanium";
        TypeLibImporterFlags[TypeLibImporterFlags["ImportAsX64"] = 512] = "ImportAsX64";
        TypeLibImporterFlags[TypeLibImporterFlags["ImportAsX86"] = 256] = "ImportAsX86";
        TypeLibImporterFlags[TypeLibImporterFlags["ReflectionOnlyLoading"] = 4096] = "ReflectionOnlyLoading";
        TypeLibImporterFlags[TypeLibImporterFlags["SerializableValueClasses"] = 32] = "SerializableValueClasses";
        TypeLibImporterFlags[TypeLibImporterFlags["NoDefineVersionResource"] = 8192] = "NoDefineVersionResource";
        TypeLibImporterFlags[TypeLibImporterFlags["ImportAsArm"] = 16384] = "ImportAsArm";
      })(TypeLibImporterFlags = InteropServices.TypeLibImporterFlags || (InteropServices.TypeLibImporterFlags = {}));

      var ComTypes;

      (function (ComTypes) {
        var DESCKIND;

        (function (DESCKIND) {
          DESCKIND[DESCKIND["DESCKIND_NONE"] = 0] = "DESCKIND_NONE";
          DESCKIND[DESCKIND["DESCKIND_FUNCDESC"] = 1] = "DESCKIND_FUNCDESC";
          DESCKIND[DESCKIND["DESCKIND_VARDESC"] = 2] = "DESCKIND_VARDESC";
          DESCKIND[DESCKIND["DESCKIND_TYPECOMP"] = 3] = "DESCKIND_TYPECOMP";
          DESCKIND[DESCKIND["DESCKIND_IMPLICITAPPOBJ"] = 4] = "DESCKIND_IMPLICITAPPOBJ";
          DESCKIND[DESCKIND["DESCKIND_MAX"] = 5] = "DESCKIND_MAX";
        })(DESCKIND = ComTypes.DESCKIND || (ComTypes.DESCKIND = {}));

        var TYPEKIND;

        (function (TYPEKIND) {
          TYPEKIND[TYPEKIND["TKIND_ENUM"] = 0] = "TKIND_ENUM";
          TYPEKIND[TYPEKIND["TKIND_RECORD"] = 1] = "TKIND_RECORD";
          TYPEKIND[TYPEKIND["TKIND_MODULE"] = 2] = "TKIND_MODULE";
          TYPEKIND[TYPEKIND["TKIND_INTERFACE"] = 3] = "TKIND_INTERFACE";
          TYPEKIND[TYPEKIND["TKIND_DISPATCH"] = 4] = "TKIND_DISPATCH";
          TYPEKIND[TYPEKIND["TKIND_COCLASS"] = 5] = "TKIND_COCLASS";
          TYPEKIND[TYPEKIND["TKIND_ALIAS"] = 6] = "TKIND_ALIAS";
          TYPEKIND[TYPEKIND["TKIND_UNION"] = 7] = "TKIND_UNION";
          TYPEKIND[TYPEKIND["TKIND_MAX"] = 8] = "TKIND_MAX";
        })(TYPEKIND = ComTypes.TYPEKIND || (ComTypes.TYPEKIND = {}));

        var TYPEFLAGS;

        (function (TYPEFLAGS) {
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FAPPOBJECT"] = 1] = "TYPEFLAG_FAPPOBJECT";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FCANCREATE"] = 2] = "TYPEFLAG_FCANCREATE";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FLICENSED"] = 4] = "TYPEFLAG_FLICENSED";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FPREDECLID"] = 8] = "TYPEFLAG_FPREDECLID";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FHIDDEN"] = 16] = "TYPEFLAG_FHIDDEN";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FCONTROL"] = 32] = "TYPEFLAG_FCONTROL";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FDUAL"] = 64] = "TYPEFLAG_FDUAL";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FNONEXTENSIBLE"] = 128] = "TYPEFLAG_FNONEXTENSIBLE";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FOLEAUTOMATION"] = 256] = "TYPEFLAG_FOLEAUTOMATION";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FRESTRICTED"] = 512] = "TYPEFLAG_FRESTRICTED";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FAGGREGATABLE"] = 1024] = "TYPEFLAG_FAGGREGATABLE";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FREPLACEABLE"] = 2048] = "TYPEFLAG_FREPLACEABLE";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FDISPATCHABLE"] = 4096] = "TYPEFLAG_FDISPATCHABLE";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FREVERSEBIND"] = 8192] = "TYPEFLAG_FREVERSEBIND";
          TYPEFLAGS[TYPEFLAGS["TYPEFLAG_FPROXY"] = 16384] = "TYPEFLAG_FPROXY";
        })(TYPEFLAGS = ComTypes.TYPEFLAGS || (ComTypes.TYPEFLAGS = {}));

        var IMPLTYPEFLAGS;

        (function (IMPLTYPEFLAGS) {
          IMPLTYPEFLAGS[IMPLTYPEFLAGS["IMPLTYPEFLAG_FDEFAULT"] = 1] = "IMPLTYPEFLAG_FDEFAULT";
          IMPLTYPEFLAGS[IMPLTYPEFLAGS["IMPLTYPEFLAG_FSOURCE"] = 2] = "IMPLTYPEFLAG_FSOURCE";
          IMPLTYPEFLAGS[IMPLTYPEFLAGS["IMPLTYPEFLAG_FRESTRICTED"] = 4] = "IMPLTYPEFLAG_FRESTRICTED";
          IMPLTYPEFLAGS[IMPLTYPEFLAGS["IMPLTYPEFLAG_FDEFAULTVTABLE"] = 8] = "IMPLTYPEFLAG_FDEFAULTVTABLE";
        })(IMPLTYPEFLAGS = ComTypes.IMPLTYPEFLAGS || (ComTypes.IMPLTYPEFLAGS = {}));

        var IDLFLAG;

        (function (IDLFLAG) {
          IDLFLAG[IDLFLAG["IDLFLAG_NONE"] = 0] = "IDLFLAG_NONE";
          IDLFLAG[IDLFLAG["IDLFLAG_FIN"] = 1] = "IDLFLAG_FIN";
          IDLFLAG[IDLFLAG["IDLFLAG_FOUT"] = 2] = "IDLFLAG_FOUT";
          IDLFLAG[IDLFLAG["IDLFLAG_FLCID"] = 4] = "IDLFLAG_FLCID";
          IDLFLAG[IDLFLAG["IDLFLAG_FRETVAL"] = 8] = "IDLFLAG_FRETVAL";
        })(IDLFLAG = ComTypes.IDLFLAG || (ComTypes.IDLFLAG = {}));

        var PARAMFLAG;

        (function (PARAMFLAG) {
          PARAMFLAG[PARAMFLAG["PARAMFLAG_NONE"] = 0] = "PARAMFLAG_NONE";
          PARAMFLAG[PARAMFLAG["PARAMFLAG_FIN"] = 1] = "PARAMFLAG_FIN";
          PARAMFLAG[PARAMFLAG["PARAMFLAG_FOUT"] = 2] = "PARAMFLAG_FOUT";
          PARAMFLAG[PARAMFLAG["PARAMFLAG_FLCID"] = 4] = "PARAMFLAG_FLCID";
          PARAMFLAG[PARAMFLAG["PARAMFLAG_FRETVAL"] = 8] = "PARAMFLAG_FRETVAL";
          PARAMFLAG[PARAMFLAG["PARAMFLAG_FOPT"] = 16] = "PARAMFLAG_FOPT";
          PARAMFLAG[PARAMFLAG["PARAMFLAG_FHASDEFAULT"] = 32] = "PARAMFLAG_FHASDEFAULT";
          PARAMFLAG[PARAMFLAG["PARAMFLAG_FHASCUSTDATA"] = 64] = "PARAMFLAG_FHASCUSTDATA";
        })(PARAMFLAG = ComTypes.PARAMFLAG || (ComTypes.PARAMFLAG = {}));

        var VARKIND;

        (function (VARKIND) {
          VARKIND[VARKIND["VAR_PERINSTANCE"] = 0] = "VAR_PERINSTANCE";
          VARKIND[VARKIND["VAR_STATIC"] = 1] = "VAR_STATIC";
          VARKIND[VARKIND["VAR_CONST"] = 2] = "VAR_CONST";
          VARKIND[VARKIND["VAR_DISPATCH"] = 3] = "VAR_DISPATCH";
        })(VARKIND = ComTypes.VARKIND || (ComTypes.VARKIND = {}));

        var FUNCKIND;

        (function (FUNCKIND) {
          FUNCKIND[FUNCKIND["FUNC_VIRTUAL"] = 0] = "FUNC_VIRTUAL";
          FUNCKIND[FUNCKIND["FUNC_PUREVIRTUAL"] = 1] = "FUNC_PUREVIRTUAL";
          FUNCKIND[FUNCKIND["FUNC_NONVIRTUAL"] = 2] = "FUNC_NONVIRTUAL";
          FUNCKIND[FUNCKIND["FUNC_STATIC"] = 3] = "FUNC_STATIC";
          FUNCKIND[FUNCKIND["FUNC_DISPATCH"] = 4] = "FUNC_DISPATCH";
        })(FUNCKIND = ComTypes.FUNCKIND || (ComTypes.FUNCKIND = {}));

        var INVOKEKIND;

        (function (INVOKEKIND) {
          INVOKEKIND[INVOKEKIND["INVOKE_FUNC"] = 1] = "INVOKE_FUNC";
          INVOKEKIND[INVOKEKIND["INVOKE_PROPERTYGET"] = 2] = "INVOKE_PROPERTYGET";
          INVOKEKIND[INVOKEKIND["INVOKE_PROPERTYPUT"] = 4] = "INVOKE_PROPERTYPUT";
          INVOKEKIND[INVOKEKIND["INVOKE_PROPERTYPUTREF"] = 8] = "INVOKE_PROPERTYPUTREF";
        })(INVOKEKIND = ComTypes.INVOKEKIND || (ComTypes.INVOKEKIND = {}));

        var CALLCONV;

        (function (CALLCONV) {
          CALLCONV[CALLCONV["CC_CDECL"] = 1] = "CC_CDECL";
          CALLCONV[CALLCONV["CC_MSCPASCAL"] = 2] = "CC_MSCPASCAL";
          CALLCONV[CALLCONV["CC_PASCAL"] = 2] = "CC_PASCAL";
          CALLCONV[CALLCONV["CC_MACPASCAL"] = 3] = "CC_MACPASCAL";
          CALLCONV[CALLCONV["CC_STDCALL"] = 4] = "CC_STDCALL";
          CALLCONV[CALLCONV["CC_RESERVED"] = 5] = "CC_RESERVED";
          CALLCONV[CALLCONV["CC_SYSCALL"] = 6] = "CC_SYSCALL";
          CALLCONV[CALLCONV["CC_MPWCDECL"] = 7] = "CC_MPWCDECL";
          CALLCONV[CALLCONV["CC_MPWPASCAL"] = 8] = "CC_MPWPASCAL";
          CALLCONV[CALLCONV["CC_MAX"] = 9] = "CC_MAX";
        })(CALLCONV = ComTypes.CALLCONV || (ComTypes.CALLCONV = {}));

        var FUNCFLAGS;

        (function (FUNCFLAGS) {
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FRESTRICTED"] = 1] = "FUNCFLAG_FRESTRICTED";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FSOURCE"] = 2] = "FUNCFLAG_FSOURCE";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FBINDABLE"] = 4] = "FUNCFLAG_FBINDABLE";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FREQUESTEDIT"] = 8] = "FUNCFLAG_FREQUESTEDIT";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FDISPLAYBIND"] = 16] = "FUNCFLAG_FDISPLAYBIND";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FDEFAULTBIND"] = 32] = "FUNCFLAG_FDEFAULTBIND";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FHIDDEN"] = 64] = "FUNCFLAG_FHIDDEN";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FUSESGETLASTERROR"] = 128] = "FUNCFLAG_FUSESGETLASTERROR";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FDEFAULTCOLLELEM"] = 256] = "FUNCFLAG_FDEFAULTCOLLELEM";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FUIDEFAULT"] = 512] = "FUNCFLAG_FUIDEFAULT";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FNONBROWSABLE"] = 1024] = "FUNCFLAG_FNONBROWSABLE";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FREPLACEABLE"] = 2048] = "FUNCFLAG_FREPLACEABLE";
          FUNCFLAGS[FUNCFLAGS["FUNCFLAG_FIMMEDIATEBIND"] = 4096] = "FUNCFLAG_FIMMEDIATEBIND";
        })(FUNCFLAGS = ComTypes.FUNCFLAGS || (ComTypes.FUNCFLAGS = {}));

        var VARFLAGS;

        (function (VARFLAGS) {
          VARFLAGS[VARFLAGS["VARFLAG_FREADONLY"] = 1] = "VARFLAG_FREADONLY";
          VARFLAGS[VARFLAGS["VARFLAG_FSOURCE"] = 2] = "VARFLAG_FSOURCE";
          VARFLAGS[VARFLAGS["VARFLAG_FBINDABLE"] = 4] = "VARFLAG_FBINDABLE";
          VARFLAGS[VARFLAGS["VARFLAG_FREQUESTEDIT"] = 8] = "VARFLAG_FREQUESTEDIT";
          VARFLAGS[VARFLAGS["VARFLAG_FDISPLAYBIND"] = 16] = "VARFLAG_FDISPLAYBIND";
          VARFLAGS[VARFLAGS["VARFLAG_FDEFAULTBIND"] = 32] = "VARFLAG_FDEFAULTBIND";
          VARFLAGS[VARFLAGS["VARFLAG_FHIDDEN"] = 64] = "VARFLAG_FHIDDEN";
          VARFLAGS[VARFLAGS["VARFLAG_FRESTRICTED"] = 128] = "VARFLAG_FRESTRICTED";
          VARFLAGS[VARFLAGS["VARFLAG_FDEFAULTCOLLELEM"] = 256] = "VARFLAG_FDEFAULTCOLLELEM";
          VARFLAGS[VARFLAGS["VARFLAG_FUIDEFAULT"] = 512] = "VARFLAG_FUIDEFAULT";
          VARFLAGS[VARFLAGS["VARFLAG_FNONBROWSABLE"] = 1024] = "VARFLAG_FNONBROWSABLE";
          VARFLAGS[VARFLAGS["VARFLAG_FREPLACEABLE"] = 2048] = "VARFLAG_FREPLACEABLE";
          VARFLAGS[VARFLAGS["VARFLAG_FIMMEDIATEBIND"] = 4096] = "VARFLAG_FIMMEDIATEBIND";
        })(VARFLAGS = ComTypes.VARFLAGS || (ComTypes.VARFLAGS = {}));

        var SYSKIND;

        (function (SYSKIND) {
          SYSKIND[SYSKIND["SYS_WIN16"] = 0] = "SYS_WIN16";
          SYSKIND[SYSKIND["SYS_WIN32"] = 1] = "SYS_WIN32";
          SYSKIND[SYSKIND["SYS_MAC"] = 2] = "SYS_MAC";
          SYSKIND[SYSKIND["SYS_WIN64"] = 3] = "SYS_WIN64";
        })(SYSKIND = ComTypes.SYSKIND || (ComTypes.SYSKIND = {}));

        var LIBFLAGS;

        (function (LIBFLAGS) {
          LIBFLAGS[LIBFLAGS["LIBFLAG_FRESTRICTED"] = 1] = "LIBFLAG_FRESTRICTED";
          LIBFLAGS[LIBFLAGS["LIBFLAG_FCONTROL"] = 2] = "LIBFLAG_FCONTROL";
          LIBFLAGS[LIBFLAGS["LIBFLAG_FHIDDEN"] = 4] = "LIBFLAG_FHIDDEN";
          LIBFLAGS[LIBFLAGS["LIBFLAG_FHASDISKIMAGE"] = 8] = "LIBFLAG_FHASDISKIMAGE";
        })(LIBFLAGS = ComTypes.LIBFLAGS || (ComTypes.LIBFLAGS = {}));

        var ADVF;

        (function (ADVF) {
          ADVF[ADVF["ADVF_NODATA"] = 1] = "ADVF_NODATA";
          ADVF[ADVF["ADVF_PRIMEFIRST"] = 2] = "ADVF_PRIMEFIRST";
          ADVF[ADVF["ADVF_ONLYONCE"] = 4] = "ADVF_ONLYONCE";
          ADVF[ADVF["ADVFCACHE_NOHANDLER"] = 8] = "ADVFCACHE_NOHANDLER";
          ADVF[ADVF["ADVFCACHE_FORCEBUILTIN"] = 16] = "ADVFCACHE_FORCEBUILTIN";
          ADVF[ADVF["ADVFCACHE_ONSAVE"] = 32] = "ADVFCACHE_ONSAVE";
          ADVF[ADVF["ADVF_DATAONSTOP"] = 64] = "ADVF_DATAONSTOP";
        })(ADVF = ComTypes.ADVF || (ComTypes.ADVF = {}));

        var DATADIR;

        (function (DATADIR) {
          DATADIR[DATADIR["DATADIR_GET"] = 1] = "DATADIR_GET";
          DATADIR[DATADIR["DATADIR_SET"] = 2] = "DATADIR_SET";
        })(DATADIR = ComTypes.DATADIR || (ComTypes.DATADIR = {}));

        var DVASPECT;

        (function (DVASPECT) {
          DVASPECT[DVASPECT["DVASPECT_CONTENT"] = 1] = "DVASPECT_CONTENT";
          DVASPECT[DVASPECT["DVASPECT_THUMBNAIL"] = 2] = "DVASPECT_THUMBNAIL";
          DVASPECT[DVASPECT["DVASPECT_ICON"] = 4] = "DVASPECT_ICON";
          DVASPECT[DVASPECT["DVASPECT_DOCPRINT"] = 8] = "DVASPECT_DOCPRINT";
        })(DVASPECT = ComTypes.DVASPECT || (ComTypes.DVASPECT = {}));

        var TYMED;

        (function (TYMED) {
          TYMED[TYMED["TYMED_HGLOBAL"] = 1] = "TYMED_HGLOBAL";
          TYMED[TYMED["TYMED_FILE"] = 2] = "TYMED_FILE";
          TYMED[TYMED["TYMED_ISTREAM"] = 4] = "TYMED_ISTREAM";
          TYMED[TYMED["TYMED_ISTORAGE"] = 8] = "TYMED_ISTORAGE";
          TYMED[TYMED["TYMED_GDI"] = 16] = "TYMED_GDI";
          TYMED[TYMED["TYMED_MFPICT"] = 32] = "TYMED_MFPICT";
          TYMED[TYMED["TYMED_ENHMF"] = 64] = "TYMED_ENHMF";
          TYMED[TYMED["TYMED_NULL"] = 0] = "TYMED_NULL";
        })(TYMED = ComTypes.TYMED || (ComTypes.TYMED = {}));
      })(ComTypes = InteropServices.ComTypes || (InteropServices.ComTypes = {}));

      var WindowsRuntime;

      (function (WindowsRuntime) {})(WindowsRuntime = InteropServices.WindowsRuntime || (InteropServices.WindowsRuntime = {}));
    })(InteropServices = Runtime.InteropServices || (Runtime.InteropServices = {}));

    var Remoting;

    (function (Remoting) {
      var CustomErrorsModes;

      (function (CustomErrorsModes) {
        CustomErrorsModes[CustomErrorsModes["On"] = 0] = "On";
        CustomErrorsModes[CustomErrorsModes["Off"] = 1] = "Off";
        CustomErrorsModes[CustomErrorsModes["RemoteOnly"] = 2] = "RemoteOnly";
      })(CustomErrorsModes = Remoting.CustomErrorsModes || (Remoting.CustomErrorsModes = {}));

      var WellKnownObjectMode;

      (function (WellKnownObjectMode) {
        WellKnownObjectMode[WellKnownObjectMode["Singleton"] = 1] = "Singleton";
        WellKnownObjectMode[WellKnownObjectMode["SingleCall"] = 2] = "SingleCall";
      })(WellKnownObjectMode = Remoting.WellKnownObjectMode || (Remoting.WellKnownObjectMode = {}));

      var Activation;

      (function (Activation) {
        var ActivatorLevel;

        (function (ActivatorLevel) {
          ActivatorLevel[ActivatorLevel["Construction"] = 4] = "Construction";
          ActivatorLevel[ActivatorLevel["Context"] = 8] = "Context";
          ActivatorLevel[ActivatorLevel["AppDomain"] = 12] = "AppDomain";
          ActivatorLevel[ActivatorLevel["Process"] = 16] = "Process";
          ActivatorLevel[ActivatorLevel["Machine"] = 20] = "Machine";
        })(ActivatorLevel = Activation.ActivatorLevel || (Activation.ActivatorLevel = {}));
      })(Activation = Remoting.Activation || (Remoting.Activation = {}));

      var Channels;

      (function (Channels) {
        var ServerProcessing;

        (function (ServerProcessing) {
          ServerProcessing[ServerProcessing["Complete"] = 0] = "Complete";
          ServerProcessing[ServerProcessing["OneWay"] = 1] = "OneWay";
          ServerProcessing[ServerProcessing["Async"] = 2] = "Async";
        })(ServerProcessing = Channels.ServerProcessing || (Channels.ServerProcessing = {}));
      })(Channels = Remoting.Channels || (Remoting.Channels = {}));

      var Contexts;

      (function (Contexts) {})(Contexts = Remoting.Contexts || (Remoting.Contexts = {}));

      var Lifetime;

      (function (Lifetime) {
        var LeaseState;

        (function (LeaseState) {
          LeaseState[LeaseState["Null"] = 0] = "Null";
          LeaseState[LeaseState["Initial"] = 1] = "Initial";
          LeaseState[LeaseState["Active"] = 2] = "Active";
          LeaseState[LeaseState["Renewing"] = 3] = "Renewing";
          LeaseState[LeaseState["Expired"] = 4] = "Expired";
        })(LeaseState = Lifetime.LeaseState || (Lifetime.LeaseState = {}));
      })(Lifetime = Remoting.Lifetime || (Remoting.Lifetime = {}));

      var Messaging;

      (function (Messaging) {})(Messaging = Remoting.Messaging || (Remoting.Messaging = {}));

      var Metadata;

      (function (Metadata) {
        var SoapOption;

        (function (SoapOption) {
          SoapOption[SoapOption["None"] = 0] = "None";
          SoapOption[SoapOption["AlwaysIncludeTypes"] = 1] = "AlwaysIncludeTypes";
          SoapOption[SoapOption["XsdString"] = 2] = "XsdString";
          SoapOption[SoapOption["EmbedAll"] = 4] = "EmbedAll";
          SoapOption[SoapOption["Option1"] = 8] = "Option1";
          SoapOption[SoapOption["Option2"] = 16] = "Option2";
        })(SoapOption = Metadata.SoapOption || (Metadata.SoapOption = {}));

        var XmlFieldOrderOption;

        (function (XmlFieldOrderOption) {
          XmlFieldOrderOption[XmlFieldOrderOption["All"] = 0] = "All";
          XmlFieldOrderOption[XmlFieldOrderOption["Sequence"] = 1] = "Sequence";
          XmlFieldOrderOption[XmlFieldOrderOption["Choice"] = 2] = "Choice";
        })(XmlFieldOrderOption = Metadata.XmlFieldOrderOption || (Metadata.XmlFieldOrderOption = {}));

        var W3cXsd2001;

        (function (W3cXsd2001) {})(W3cXsd2001 = Metadata.W3cXsd2001 || (Metadata.W3cXsd2001 = {}));
      })(Metadata = Remoting.Metadata || (Remoting.Metadata = {}));

      var Proxies;

      (function (Proxies) {})(Proxies = Remoting.Proxies || (Remoting.Proxies = {}));

      var Services;

      (function (Services) {})(Services = Remoting.Services || (Remoting.Services = {}));
    })(Remoting = Runtime.Remoting || (Runtime.Remoting = {}));

    var Serialization;

    (function (Serialization) {
      var StreamingContextStates;

      (function (StreamingContextStates) {
        StreamingContextStates[StreamingContextStates["CrossProcess"] = 1] = "CrossProcess";
        StreamingContextStates[StreamingContextStates["CrossMachine"] = 2] = "CrossMachine";
        StreamingContextStates[StreamingContextStates["File"] = 4] = "File";
        StreamingContextStates[StreamingContextStates["Persistence"] = 8] = "Persistence";
        StreamingContextStates[StreamingContextStates["Remoting"] = 16] = "Remoting";
        StreamingContextStates[StreamingContextStates["Other"] = 32] = "Other";
        StreamingContextStates[StreamingContextStates["Clone"] = 64] = "Clone";
        StreamingContextStates[StreamingContextStates["CrossAppDomain"] = 128] = "CrossAppDomain";
        StreamingContextStates[StreamingContextStates["All"] = 255] = "All";
      })(StreamingContextStates = Serialization.StreamingContextStates || (Serialization.StreamingContextStates = {}));

      var Formatters;

      (function (Formatters) {
        var FormatterTypeStyle;

        (function (FormatterTypeStyle) {
          FormatterTypeStyle[FormatterTypeStyle["TypesWhenNeeded"] = 0] = "TypesWhenNeeded";
          FormatterTypeStyle[FormatterTypeStyle["TypesAlways"] = 1] = "TypesAlways";
          FormatterTypeStyle[FormatterTypeStyle["XsdString"] = 2] = "XsdString";
        })(FormatterTypeStyle = Formatters.FormatterTypeStyle || (Formatters.FormatterTypeStyle = {}));

        var FormatterAssemblyStyle;

        (function (FormatterAssemblyStyle) {
          FormatterAssemblyStyle[FormatterAssemblyStyle["Simple"] = 0] = "Simple";
          FormatterAssemblyStyle[FormatterAssemblyStyle["Full"] = 1] = "Full";
        })(FormatterAssemblyStyle = Formatters.FormatterAssemblyStyle || (Formatters.FormatterAssemblyStyle = {}));

        var TypeFilterLevel;

        (function (TypeFilterLevel) {
          TypeFilterLevel[TypeFilterLevel["Low"] = 2] = "Low";
          TypeFilterLevel[TypeFilterLevel["Full"] = 3] = "Full";
        })(TypeFilterLevel = Formatters.TypeFilterLevel || (Formatters.TypeFilterLevel = {}));

        var Binary;

        (function (Binary) {})(Binary = Formatters.Binary || (Formatters.Binary = {}));
      })(Formatters = Serialization.Formatters || (Serialization.Formatters = {}));
    })(Serialization = Runtime.Serialization || (Runtime.Serialization = {}));

    var Versioning;

    (function (Versioning) {
      var ComponentGuaranteesOptions;

      (function (ComponentGuaranteesOptions) {
        ComponentGuaranteesOptions[ComponentGuaranteesOptions["None"] = 0] = "None";
        ComponentGuaranteesOptions[ComponentGuaranteesOptions["Exchange"] = 1] = "Exchange";
        ComponentGuaranteesOptions[ComponentGuaranteesOptions["Stable"] = 2] = "Stable";
        ComponentGuaranteesOptions[ComponentGuaranteesOptions["SideBySide"] = 4] = "SideBySide";
      })(ComponentGuaranteesOptions = Versioning.ComponentGuaranteesOptions || (Versioning.ComponentGuaranteesOptions = {}));

      var ResourceScope;

      (function (ResourceScope) {
        ResourceScope[ResourceScope["None"] = 0] = "None";
        ResourceScope[ResourceScope["Machine"] = 1] = "Machine";
        ResourceScope[ResourceScope["Process"] = 2] = "Process";
        ResourceScope[ResourceScope["AppDomain"] = 4] = "AppDomain";
        ResourceScope[ResourceScope["Library"] = 8] = "Library";
        ResourceScope[ResourceScope["Private"] = 16] = "Private";
        ResourceScope[ResourceScope["Assembly"] = 32] = "Assembly";
      })(ResourceScope = Versioning.ResourceScope || (Versioning.ResourceScope = {}));
    })(Versioning = Runtime.Versioning || (Runtime.Versioning = {}));
  })(Runtime = System.Runtime || (System.Runtime = {}));

  var Security;

  (function (Security) {
    var PartialTrustVisibilityLevel;

    (function (PartialTrustVisibilityLevel) {
      PartialTrustVisibilityLevel[PartialTrustVisibilityLevel["VisibleToAllHosts"] = 0] = "VisibleToAllHosts";
      PartialTrustVisibilityLevel[PartialTrustVisibilityLevel["NotVisibleByDefault"] = 1] = "NotVisibleByDefault";
    })(PartialTrustVisibilityLevel = Security.PartialTrustVisibilityLevel || (Security.PartialTrustVisibilityLevel = {}));

    var SecurityCriticalScope;

    (function (SecurityCriticalScope) {
      SecurityCriticalScope[SecurityCriticalScope["Explicit"] = 0] = "Explicit";
      SecurityCriticalScope[SecurityCriticalScope["Everything"] = 1] = "Everything";
    })(SecurityCriticalScope = Security.SecurityCriticalScope || (Security.SecurityCriticalScope = {}));

    var SecurityRuleSet;

    (function (SecurityRuleSet) {
      SecurityRuleSet[SecurityRuleSet["None"] = 0] = "None";
      SecurityRuleSet[SecurityRuleSet["Level1"] = 1] = "Level1";
      SecurityRuleSet[SecurityRuleSet["Level2"] = 2] = "Level2";
    })(SecurityRuleSet = Security.SecurityRuleSet || (Security.SecurityRuleSet = {}));

    var SecurityContextSource;

    (function (SecurityContextSource) {
      SecurityContextSource[SecurityContextSource["CurrentAppDomain"] = 0] = "CurrentAppDomain";
      SecurityContextSource[SecurityContextSource["CurrentAssembly"] = 1] = "CurrentAssembly";
    })(SecurityContextSource = Security.SecurityContextSource || (Security.SecurityContextSource = {}));

    var HostSecurityManagerOptions;

    (function (HostSecurityManagerOptions) {
      HostSecurityManagerOptions[HostSecurityManagerOptions["None"] = 0] = "None";
      HostSecurityManagerOptions[HostSecurityManagerOptions["HostAppDomainEvidence"] = 1] = "HostAppDomainEvidence";
      HostSecurityManagerOptions[HostSecurityManagerOptions["HostPolicyLevel"] = 2] = "HostPolicyLevel";
      HostSecurityManagerOptions[HostSecurityManagerOptions["HostAssemblyEvidence"] = 4] = "HostAssemblyEvidence";
      HostSecurityManagerOptions[HostSecurityManagerOptions["HostDetermineApplicationTrust"] = 8] = "HostDetermineApplicationTrust";
      HostSecurityManagerOptions[HostSecurityManagerOptions["HostResolvePolicy"] = 16] = "HostResolvePolicy";
      HostSecurityManagerOptions[HostSecurityManagerOptions["AllFlags"] = 31] = "AllFlags";
    })(HostSecurityManagerOptions = Security.HostSecurityManagerOptions || (Security.HostSecurityManagerOptions = {}));

    var PolicyLevelType;

    (function (PolicyLevelType) {
      PolicyLevelType[PolicyLevelType["User"] = 0] = "User";
      PolicyLevelType[PolicyLevelType["Machine"] = 1] = "Machine";
      PolicyLevelType[PolicyLevelType["Enterprise"] = 2] = "Enterprise";
      PolicyLevelType[PolicyLevelType["AppDomain"] = 3] = "AppDomain";
    })(PolicyLevelType = Security.PolicyLevelType || (Security.PolicyLevelType = {}));

    var SecurityZone;

    (function (SecurityZone) {
      SecurityZone[SecurityZone["MyComputer"] = 0] = "MyComputer";
      SecurityZone[SecurityZone["Intranet"] = 1] = "Intranet";
      SecurityZone[SecurityZone["Trusted"] = 2] = "Trusted";
      SecurityZone[SecurityZone["Internet"] = 3] = "Internet";
      SecurityZone[SecurityZone["Untrusted"] = 4] = "Untrusted";
      SecurityZone[SecurityZone["NoZone"] = -1] = "NoZone";
    })(SecurityZone = Security.SecurityZone || (Security.SecurityZone = {}));

    var ManifestKinds;

    (function (ManifestKinds) {
      ManifestKinds[ManifestKinds["Application"] = 2] = "Application";
      ManifestKinds[ManifestKinds["ApplicationAndDeployment"] = 3] = "ApplicationAndDeployment";
      ManifestKinds[ManifestKinds["Deployment"] = 1] = "Deployment";
      ManifestKinds[ManifestKinds["None"] = 0] = "None";
    })(ManifestKinds = Security.ManifestKinds || (Security.ManifestKinds = {}));

    var AccessControl;

    (function (AccessControl) {
      var AccessControlActions;

      (function (AccessControlActions) {
        AccessControlActions[AccessControlActions["None"] = 0] = "None";
        AccessControlActions[AccessControlActions["View"] = 1] = "View";
        AccessControlActions[AccessControlActions["Change"] = 2] = "Change";
      })(AccessControlActions = AccessControl.AccessControlActions || (AccessControl.AccessControlActions = {}));

      var AccessControlModification;

      (function (AccessControlModification) {
        AccessControlModification[AccessControlModification["Add"] = 0] = "Add";
        AccessControlModification[AccessControlModification["Set"] = 1] = "Set";
        AccessControlModification[AccessControlModification["Reset"] = 2] = "Reset";
        AccessControlModification[AccessControlModification["Remove"] = 3] = "Remove";
        AccessControlModification[AccessControlModification["RemoveAll"] = 4] = "RemoveAll";
        AccessControlModification[AccessControlModification["RemoveSpecific"] = 5] = "RemoveSpecific";
      })(AccessControlModification = AccessControl.AccessControlModification || (AccessControl.AccessControlModification = {}));

      var AccessControlSections;

      (function (AccessControlSections) {
        AccessControlSections[AccessControlSections["None"] = 0] = "None";
        AccessControlSections[AccessControlSections["Audit"] = 1] = "Audit";
        AccessControlSections[AccessControlSections["Access"] = 2] = "Access";
        AccessControlSections[AccessControlSections["Owner"] = 4] = "Owner";
        AccessControlSections[AccessControlSections["Group"] = 8] = "Group";
        AccessControlSections[AccessControlSections["All"] = 15] = "All";
      })(AccessControlSections = AccessControl.AccessControlSections || (AccessControl.AccessControlSections = {}));

      var AccessControlType;

      (function (AccessControlType) {
        AccessControlType[AccessControlType["Allow"] = 0] = "Allow";
        AccessControlType[AccessControlType["Deny"] = 1] = "Deny";
      })(AccessControlType = AccessControl.AccessControlType || (AccessControl.AccessControlType = {}));

      var AceFlags;

      (function (AceFlags) {
        AceFlags[AceFlags["None"] = 0] = "None";
        AceFlags[AceFlags["ObjectInherit"] = 1] = "ObjectInherit";
        AceFlags[AceFlags["ContainerInherit"] = 2] = "ContainerInherit";
        AceFlags[AceFlags["NoPropagateInherit"] = 4] = "NoPropagateInherit";
        AceFlags[AceFlags["InheritOnly"] = 8] = "InheritOnly";
        AceFlags[AceFlags["InheritanceFlags"] = 15] = "InheritanceFlags";
        AceFlags[AceFlags["Inherited"] = 16] = "Inherited";
        AceFlags[AceFlags["SuccessfulAccess"] = 64] = "SuccessfulAccess";
        AceFlags[AceFlags["FailedAccess"] = 128] = "FailedAccess";
        AceFlags[AceFlags["AuditFlags"] = 192] = "AuditFlags";
      })(AceFlags = AccessControl.AceFlags || (AccessControl.AceFlags = {}));

      var AceQualifier;

      (function (AceQualifier) {
        AceQualifier[AceQualifier["AccessAllowed"] = 0] = "AccessAllowed";
        AceQualifier[AceQualifier["AccessDenied"] = 1] = "AccessDenied";
        AceQualifier[AceQualifier["SystemAudit"] = 2] = "SystemAudit";
        AceQualifier[AceQualifier["SystemAlarm"] = 3] = "SystemAlarm";
      })(AceQualifier = AccessControl.AceQualifier || (AccessControl.AceQualifier = {}));

      var AceType;

      (function (AceType) {
        AceType[AceType["AccessAllowed"] = 0] = "AccessAllowed";
        AceType[AceType["AccessDenied"] = 1] = "AccessDenied";
        AceType[AceType["SystemAudit"] = 2] = "SystemAudit";
        AceType[AceType["SystemAlarm"] = 3] = "SystemAlarm";
        AceType[AceType["AccessAllowedCompound"] = 4] = "AccessAllowedCompound";
        AceType[AceType["AccessAllowedObject"] = 5] = "AccessAllowedObject";
        AceType[AceType["AccessDeniedObject"] = 6] = "AccessDeniedObject";
        AceType[AceType["SystemAuditObject"] = 7] = "SystemAuditObject";
        AceType[AceType["SystemAlarmObject"] = 8] = "SystemAlarmObject";
        AceType[AceType["AccessAllowedCallback"] = 9] = "AccessAllowedCallback";
        AceType[AceType["AccessDeniedCallback"] = 10] = "AccessDeniedCallback";
        AceType[AceType["AccessAllowedCallbackObject"] = 11] = "AccessAllowedCallbackObject";
        AceType[AceType["AccessDeniedCallbackObject"] = 12] = "AccessDeniedCallbackObject";
        AceType[AceType["SystemAuditCallback"] = 13] = "SystemAuditCallback";
        AceType[AceType["SystemAlarmCallback"] = 14] = "SystemAlarmCallback";
        AceType[AceType["SystemAuditCallbackObject"] = 15] = "SystemAuditCallbackObject";
        AceType[AceType["SystemAlarmCallbackObject"] = 16] = "SystemAlarmCallbackObject";
        AceType[AceType["MaxDefinedAceType"] = 16] = "MaxDefinedAceType";
      })(AceType = AccessControl.AceType || (AccessControl.AceType = {}));

      var AuditFlags;

      (function (AuditFlags) {
        AuditFlags[AuditFlags["None"] = 0] = "None";
        AuditFlags[AuditFlags["Success"] = 1] = "Success";
        AuditFlags[AuditFlags["Failure"] = 2] = "Failure";
      })(AuditFlags = AccessControl.AuditFlags || (AccessControl.AuditFlags = {}));

      var CompoundAceType;

      (function (CompoundAceType) {
        CompoundAceType[CompoundAceType["Impersonation"] = 1] = "Impersonation";
      })(CompoundAceType = AccessControl.CompoundAceType || (AccessControl.CompoundAceType = {}));

      var ControlFlags;

      (function (ControlFlags) {
        ControlFlags[ControlFlags["None"] = 0] = "None";
        ControlFlags[ControlFlags["OwnerDefaulted"] = 1] = "OwnerDefaulted";
        ControlFlags[ControlFlags["GroupDefaulted"] = 2] = "GroupDefaulted";
        ControlFlags[ControlFlags["DiscretionaryAclPresent"] = 4] = "DiscretionaryAclPresent";
        ControlFlags[ControlFlags["DiscretionaryAclDefaulted"] = 8] = "DiscretionaryAclDefaulted";
        ControlFlags[ControlFlags["SystemAclPresent"] = 16] = "SystemAclPresent";
        ControlFlags[ControlFlags["SystemAclDefaulted"] = 32] = "SystemAclDefaulted";
        ControlFlags[ControlFlags["DiscretionaryAclUntrusted"] = 64] = "DiscretionaryAclUntrusted";
        ControlFlags[ControlFlags["ServerSecurity"] = 128] = "ServerSecurity";
        ControlFlags[ControlFlags["DiscretionaryAclAutoInheritRequired"] = 256] = "DiscretionaryAclAutoInheritRequired";
        ControlFlags[ControlFlags["SystemAclAutoInheritRequired"] = 512] = "SystemAclAutoInheritRequired";
        ControlFlags[ControlFlags["DiscretionaryAclAutoInherited"] = 1024] = "DiscretionaryAclAutoInherited";
        ControlFlags[ControlFlags["SystemAclAutoInherited"] = 2048] = "SystemAclAutoInherited";
        ControlFlags[ControlFlags["DiscretionaryAclProtected"] = 4096] = "DiscretionaryAclProtected";
        ControlFlags[ControlFlags["SystemAclProtected"] = 8192] = "SystemAclProtected";
        ControlFlags[ControlFlags["RMControlValid"] = 16384] = "RMControlValid";
        ControlFlags[ControlFlags["SelfRelative"] = 32768] = "SelfRelative";
      })(ControlFlags = AccessControl.ControlFlags || (AccessControl.ControlFlags = {}));

      var CryptoKeyRights;

      (function (CryptoKeyRights) {
        CryptoKeyRights[CryptoKeyRights["ReadData"] = 1] = "ReadData";
        CryptoKeyRights[CryptoKeyRights["WriteData"] = 2] = "WriteData";
        CryptoKeyRights[CryptoKeyRights["ReadExtendedAttributes"] = 8] = "ReadExtendedAttributes";
        CryptoKeyRights[CryptoKeyRights["WriteExtendedAttributes"] = 16] = "WriteExtendedAttributes";
        CryptoKeyRights[CryptoKeyRights["ReadAttributes"] = 128] = "ReadAttributes";
        CryptoKeyRights[CryptoKeyRights["WriteAttributes"] = 256] = "WriteAttributes";
        CryptoKeyRights[CryptoKeyRights["Delete"] = 65536] = "Delete";
        CryptoKeyRights[CryptoKeyRights["ReadPermissions"] = 131072] = "ReadPermissions";
        CryptoKeyRights[CryptoKeyRights["ChangePermissions"] = 262144] = "ChangePermissions";
        CryptoKeyRights[CryptoKeyRights["TakeOwnership"] = 524288] = "TakeOwnership";
        CryptoKeyRights[CryptoKeyRights["Synchronize"] = 1048576] = "Synchronize";
        CryptoKeyRights[CryptoKeyRights["FullControl"] = 2032027] = "FullControl";
        CryptoKeyRights[CryptoKeyRights["GenericAll"] = 268435456] = "GenericAll";
        CryptoKeyRights[CryptoKeyRights["GenericExecute"] = 536870912] = "GenericExecute";
        CryptoKeyRights[CryptoKeyRights["GenericWrite"] = 1073741824] = "GenericWrite";
        CryptoKeyRights[CryptoKeyRights["GenericRead"] = -2147483648] = "GenericRead";
      })(CryptoKeyRights = AccessControl.CryptoKeyRights || (AccessControl.CryptoKeyRights = {}));

      var EventWaitHandleRights;

      (function (EventWaitHandleRights) {
        EventWaitHandleRights[EventWaitHandleRights["Modify"] = 2] = "Modify";
        EventWaitHandleRights[EventWaitHandleRights["Delete"] = 65536] = "Delete";
        EventWaitHandleRights[EventWaitHandleRights["ReadPermissions"] = 131072] = "ReadPermissions";
        EventWaitHandleRights[EventWaitHandleRights["ChangePermissions"] = 262144] = "ChangePermissions";
        EventWaitHandleRights[EventWaitHandleRights["TakeOwnership"] = 524288] = "TakeOwnership";
        EventWaitHandleRights[EventWaitHandleRights["Synchronize"] = 1048576] = "Synchronize";
        EventWaitHandleRights[EventWaitHandleRights["FullControl"] = 2031619] = "FullControl";
      })(EventWaitHandleRights = AccessControl.EventWaitHandleRights || (AccessControl.EventWaitHandleRights = {}));

      var FileSystemRights;

      (function (FileSystemRights) {
        FileSystemRights[FileSystemRights["ListDirectory"] = 1] = "ListDirectory";
        FileSystemRights[FileSystemRights["ReadData"] = 1] = "ReadData";
        FileSystemRights[FileSystemRights["CreateFiles"] = 2] = "CreateFiles";
        FileSystemRights[FileSystemRights["WriteData"] = 2] = "WriteData";
        FileSystemRights[FileSystemRights["AppendData"] = 4] = "AppendData";
        FileSystemRights[FileSystemRights["CreateDirectories"] = 4] = "CreateDirectories";
        FileSystemRights[FileSystemRights["ReadExtendedAttributes"] = 8] = "ReadExtendedAttributes";
        FileSystemRights[FileSystemRights["WriteExtendedAttributes"] = 16] = "WriteExtendedAttributes";
        FileSystemRights[FileSystemRights["ExecuteFile"] = 32] = "ExecuteFile";
        FileSystemRights[FileSystemRights["Traverse"] = 32] = "Traverse";
        FileSystemRights[FileSystemRights["DeleteSubdirectoriesAndFiles"] = 64] = "DeleteSubdirectoriesAndFiles";
        FileSystemRights[FileSystemRights["ReadAttributes"] = 128] = "ReadAttributes";
        FileSystemRights[FileSystemRights["WriteAttributes"] = 256] = "WriteAttributes";
        FileSystemRights[FileSystemRights["Write"] = 278] = "Write";
        FileSystemRights[FileSystemRights["Delete"] = 65536] = "Delete";
        FileSystemRights[FileSystemRights["ReadPermissions"] = 131072] = "ReadPermissions";
        FileSystemRights[FileSystemRights["Read"] = 131209] = "Read";
        FileSystemRights[FileSystemRights["ReadAndExecute"] = 131241] = "ReadAndExecute";
        FileSystemRights[FileSystemRights["Modify"] = 197055] = "Modify";
        FileSystemRights[FileSystemRights["ChangePermissions"] = 262144] = "ChangePermissions";
        FileSystemRights[FileSystemRights["TakeOwnership"] = 524288] = "TakeOwnership";
        FileSystemRights[FileSystemRights["Synchronize"] = 1048576] = "Synchronize";
        FileSystemRights[FileSystemRights["FullControl"] = 2032127] = "FullControl";
      })(FileSystemRights = AccessControl.FileSystemRights || (AccessControl.FileSystemRights = {}));

      var InheritanceFlags;

      (function (InheritanceFlags) {
        InheritanceFlags[InheritanceFlags["None"] = 0] = "None";
        InheritanceFlags[InheritanceFlags["ContainerInherit"] = 1] = "ContainerInherit";
        InheritanceFlags[InheritanceFlags["ObjectInherit"] = 2] = "ObjectInherit";
      })(InheritanceFlags = AccessControl.InheritanceFlags || (AccessControl.InheritanceFlags = {}));

      var MutexRights;

      (function (MutexRights) {
        MutexRights[MutexRights["Modify"] = 1] = "Modify";
        MutexRights[MutexRights["Delete"] = 65536] = "Delete";
        MutexRights[MutexRights["ReadPermissions"] = 131072] = "ReadPermissions";
        MutexRights[MutexRights["ChangePermissions"] = 262144] = "ChangePermissions";
        MutexRights[MutexRights["TakeOwnership"] = 524288] = "TakeOwnership";
        MutexRights[MutexRights["Synchronize"] = 1048576] = "Synchronize";
        MutexRights[MutexRights["FullControl"] = 2031617] = "FullControl";
      })(MutexRights = AccessControl.MutexRights || (AccessControl.MutexRights = {}));

      var ObjectAceFlags;

      (function (ObjectAceFlags) {
        ObjectAceFlags[ObjectAceFlags["None"] = 0] = "None";
        ObjectAceFlags[ObjectAceFlags["ObjectAceTypePresent"] = 1] = "ObjectAceTypePresent";
        ObjectAceFlags[ObjectAceFlags["InheritedObjectAceTypePresent"] = 2] = "InheritedObjectAceTypePresent";
      })(ObjectAceFlags = AccessControl.ObjectAceFlags || (AccessControl.ObjectAceFlags = {}));

      var PropagationFlags;

      (function (PropagationFlags) {
        PropagationFlags[PropagationFlags["None"] = 0] = "None";
        PropagationFlags[PropagationFlags["NoPropagateInherit"] = 1] = "NoPropagateInherit";
        PropagationFlags[PropagationFlags["InheritOnly"] = 2] = "InheritOnly";
      })(PropagationFlags = AccessControl.PropagationFlags || (AccessControl.PropagationFlags = {}));

      var RegistryRights;

      (function (RegistryRights) {
        RegistryRights[RegistryRights["QueryValues"] = 1] = "QueryValues";
        RegistryRights[RegistryRights["SetValue"] = 2] = "SetValue";
        RegistryRights[RegistryRights["CreateSubKey"] = 4] = "CreateSubKey";
        RegistryRights[RegistryRights["EnumerateSubKeys"] = 8] = "EnumerateSubKeys";
        RegistryRights[RegistryRights["Notify"] = 16] = "Notify";
        RegistryRights[RegistryRights["CreateLink"] = 32] = "CreateLink";
        RegistryRights[RegistryRights["Delete"] = 65536] = "Delete";
        RegistryRights[RegistryRights["ReadPermissions"] = 131072] = "ReadPermissions";
        RegistryRights[RegistryRights["WriteKey"] = 131078] = "WriteKey";
        RegistryRights[RegistryRights["ReadKey"] = 131097] = "ReadKey";
        RegistryRights[RegistryRights["ExecuteKey"] = 131097] = "ExecuteKey";
        RegistryRights[RegistryRights["ChangePermissions"] = 262144] = "ChangePermissions";
        RegistryRights[RegistryRights["TakeOwnership"] = 524288] = "TakeOwnership";
        RegistryRights[RegistryRights["FullControl"] = 983103] = "FullControl";
      })(RegistryRights = AccessControl.RegistryRights || (AccessControl.RegistryRights = {}));

      var ResourceType;

      (function (ResourceType) {
        ResourceType[ResourceType["Unknown"] = 0] = "Unknown";
        ResourceType[ResourceType["FileObject"] = 1] = "FileObject";
        ResourceType[ResourceType["Service"] = 2] = "Service";
        ResourceType[ResourceType["Printer"] = 3] = "Printer";
        ResourceType[ResourceType["RegistryKey"] = 4] = "RegistryKey";
        ResourceType[ResourceType["LMShare"] = 5] = "LMShare";
        ResourceType[ResourceType["KernelObject"] = 6] = "KernelObject";
        ResourceType[ResourceType["WindowObject"] = 7] = "WindowObject";
        ResourceType[ResourceType["DSObject"] = 8] = "DSObject";
        ResourceType[ResourceType["DSObjectAll"] = 9] = "DSObjectAll";
        ResourceType[ResourceType["ProviderDefined"] = 10] = "ProviderDefined";
        ResourceType[ResourceType["WmiGuidObject"] = 11] = "WmiGuidObject";
        ResourceType[ResourceType["RegistryWow6432Key"] = 12] = "RegistryWow6432Key";
      })(ResourceType = AccessControl.ResourceType || (AccessControl.ResourceType = {}));

      var SecurityInfos;

      (function (SecurityInfos) {
        SecurityInfos[SecurityInfos["Owner"] = 1] = "Owner";
        SecurityInfos[SecurityInfos["Group"] = 2] = "Group";
        SecurityInfos[SecurityInfos["DiscretionaryAcl"] = 4] = "DiscretionaryAcl";
        SecurityInfos[SecurityInfos["SystemAcl"] = 8] = "SystemAcl";
      })(SecurityInfos = AccessControl.SecurityInfos || (AccessControl.SecurityInfos = {}));

      var SemaphoreRights;

      (function (SemaphoreRights) {
        SemaphoreRights[SemaphoreRights["Modify"] = 2] = "Modify";
        SemaphoreRights[SemaphoreRights["Delete"] = 65536] = "Delete";
        SemaphoreRights[SemaphoreRights["ReadPermissions"] = 131072] = "ReadPermissions";
        SemaphoreRights[SemaphoreRights["ChangePermissions"] = 262144] = "ChangePermissions";
        SemaphoreRights[SemaphoreRights["TakeOwnership"] = 524288] = "TakeOwnership";
        SemaphoreRights[SemaphoreRights["Synchronize"] = 1048576] = "Synchronize";
        SemaphoreRights[SemaphoreRights["FullControl"] = 2031619] = "FullControl";
      })(SemaphoreRights = AccessControl.SemaphoreRights || (AccessControl.SemaphoreRights = {}));
    })(AccessControl = Security.AccessControl || (Security.AccessControl = {}));

    var Authentication;

    (function (Authentication) {
      var CipherAlgorithmType;

      (function (CipherAlgorithmType) {
        CipherAlgorithmType[CipherAlgorithmType["None"] = 0] = "None";
        CipherAlgorithmType[CipherAlgorithmType["Null"] = 24576] = "Null";
        CipherAlgorithmType[CipherAlgorithmType["Aes"] = 26129] = "Aes";
        CipherAlgorithmType[CipherAlgorithmType["Aes128"] = 26126] = "Aes128";
        CipherAlgorithmType[CipherAlgorithmType["Aes192"] = 26127] = "Aes192";
        CipherAlgorithmType[CipherAlgorithmType["Aes256"] = 26128] = "Aes256";
        CipherAlgorithmType[CipherAlgorithmType["Des"] = 26113] = "Des";
        CipherAlgorithmType[CipherAlgorithmType["Rc2"] = 26114] = "Rc2";
        CipherAlgorithmType[CipherAlgorithmType["Rc4"] = 26625] = "Rc4";
        CipherAlgorithmType[CipherAlgorithmType["TripleDes"] = 26115] = "TripleDes";
      })(CipherAlgorithmType = Authentication.CipherAlgorithmType || (Authentication.CipherAlgorithmType = {}));

      var ExchangeAlgorithmType;

      (function (ExchangeAlgorithmType) {
        ExchangeAlgorithmType[ExchangeAlgorithmType["None"] = 0] = "None";
        ExchangeAlgorithmType[ExchangeAlgorithmType["DiffieHellman"] = 43522] = "DiffieHellman";
        ExchangeAlgorithmType[ExchangeAlgorithmType["RsaKeyX"] = 41984] = "RsaKeyX";
        ExchangeAlgorithmType[ExchangeAlgorithmType["RsaSign"] = 9216] = "RsaSign";
      })(ExchangeAlgorithmType = Authentication.ExchangeAlgorithmType || (Authentication.ExchangeAlgorithmType = {}));

      var HashAlgorithmType;

      (function (HashAlgorithmType) {
        HashAlgorithmType[HashAlgorithmType["None"] = 0] = "None";
        HashAlgorithmType[HashAlgorithmType["Md5"] = 32771] = "Md5";
        HashAlgorithmType[HashAlgorithmType["Sha1"] = 32772] = "Sha1";
        HashAlgorithmType[HashAlgorithmType["Sha256"] = 32780] = "Sha256";
        HashAlgorithmType[HashAlgorithmType["Sha384"] = 32781] = "Sha384";
        HashAlgorithmType[HashAlgorithmType["Sha512"] = 32782] = "Sha512";
      })(HashAlgorithmType = Authentication.HashAlgorithmType || (Authentication.HashAlgorithmType = {}));

      var SslProtocols;

      (function (SslProtocols) {
        SslProtocols[SslProtocols["None"] = 0] = "None";
        SslProtocols[SslProtocols["Ssl2"] = 12] = "Ssl2";
        SslProtocols[SslProtocols["Ssl3"] = 48] = "Ssl3";
        SslProtocols[SslProtocols["Tls"] = 192] = "Tls";
        SslProtocols[SslProtocols["Tls11"] = 768] = "Tls11";
        SslProtocols[SslProtocols["Tls12"] = 3072] = "Tls12";
        SslProtocols[SslProtocols["Default"] = 240] = "Default";
      })(SslProtocols = Authentication.SslProtocols || (Authentication.SslProtocols = {}));

      var ExtendedProtection;

      (function (ExtendedProtection) {
        var TokenBindingType;

        (function (TokenBindingType) {
          TokenBindingType[TokenBindingType["Provided"] = 0] = "Provided";
          TokenBindingType[TokenBindingType["Referred"] = 1] = "Referred";
        })(TokenBindingType = ExtendedProtection.TokenBindingType || (ExtendedProtection.TokenBindingType = {}));

        var ChannelBindingKind;

        (function (ChannelBindingKind) {
          ChannelBindingKind[ChannelBindingKind["Unknown"] = 0] = "Unknown";
          ChannelBindingKind[ChannelBindingKind["Unique"] = 25] = "Unique";
          ChannelBindingKind[ChannelBindingKind["Endpoint"] = 26] = "Endpoint";
        })(ChannelBindingKind = ExtendedProtection.ChannelBindingKind || (ExtendedProtection.ChannelBindingKind = {}));

        var PolicyEnforcement;

        (function (PolicyEnforcement) {
          PolicyEnforcement[PolicyEnforcement["Never"] = 0] = "Never";
          PolicyEnforcement[PolicyEnforcement["WhenSupported"] = 1] = "WhenSupported";
          PolicyEnforcement[PolicyEnforcement["Always"] = 2] = "Always";
        })(PolicyEnforcement = ExtendedProtection.PolicyEnforcement || (ExtendedProtection.PolicyEnforcement = {}));

        var ProtectionScenario;

        (function (ProtectionScenario) {
          ProtectionScenario[ProtectionScenario["TransportSelected"] = 0] = "TransportSelected";
          ProtectionScenario[ProtectionScenario["TrustedProxy"] = 1] = "TrustedProxy";
        })(ProtectionScenario = ExtendedProtection.ProtectionScenario || (ExtendedProtection.ProtectionScenario = {}));

        var Configuration;

        (function (Configuration) {})(Configuration = ExtendedProtection.Configuration || (ExtendedProtection.Configuration = {}));
      })(ExtendedProtection = Authentication.ExtendedProtection || (Authentication.ExtendedProtection = {}));
    })(Authentication = Security.Authentication || (Security.Authentication = {}));

    var Claims;

    (function (Claims) {})(Claims = Security.Claims || (Security.Claims = {}));

    var Cryptography;

    (function (Cryptography) {
      var RSAEncryptionPaddingMode;

      (function (RSAEncryptionPaddingMode) {
        RSAEncryptionPaddingMode[RSAEncryptionPaddingMode["Pkcs1"] = 0] = "Pkcs1";
        RSAEncryptionPaddingMode[RSAEncryptionPaddingMode["Oaep"] = 1] = "Oaep";
      })(RSAEncryptionPaddingMode = Cryptography.RSAEncryptionPaddingMode || (Cryptography.RSAEncryptionPaddingMode = {}));

      var RSASignaturePaddingMode;

      (function (RSASignaturePaddingMode) {
        RSASignaturePaddingMode[RSASignaturePaddingMode["Pkcs1"] = 0] = "Pkcs1";
        RSASignaturePaddingMode[RSASignaturePaddingMode["Pss"] = 1] = "Pss";
      })(RSASignaturePaddingMode = Cryptography.RSASignaturePaddingMode || (Cryptography.RSASignaturePaddingMode = {}));

      var FromBase64TransformMode;

      (function (FromBase64TransformMode) {
        FromBase64TransformMode[FromBase64TransformMode["IgnoreWhiteSpaces"] = 0] = "IgnoreWhiteSpaces";
        FromBase64TransformMode[FromBase64TransformMode["DoNotIgnoreWhiteSpaces"] = 1] = "DoNotIgnoreWhiteSpaces";
      })(FromBase64TransformMode = Cryptography.FromBase64TransformMode || (Cryptography.FromBase64TransformMode = {}));

      var CipherMode;

      (function (CipherMode) {
        CipherMode[CipherMode["CBC"] = 1] = "CBC";
        CipherMode[CipherMode["ECB"] = 2] = "ECB";
        CipherMode[CipherMode["OFB"] = 3] = "OFB";
        CipherMode[CipherMode["CFB"] = 4] = "CFB";
        CipherMode[CipherMode["CTS"] = 5] = "CTS";
      })(CipherMode = Cryptography.CipherMode || (Cryptography.CipherMode = {}));

      var PaddingMode;

      (function (PaddingMode) {
        PaddingMode[PaddingMode["None"] = 1] = "None";
        PaddingMode[PaddingMode["PKCS7"] = 2] = "PKCS7";
        PaddingMode[PaddingMode["Zeros"] = 3] = "Zeros";
        PaddingMode[PaddingMode["ANSIX923"] = 4] = "ANSIX923";
        PaddingMode[PaddingMode["ISO10126"] = 5] = "ISO10126";
      })(PaddingMode = Cryptography.PaddingMode || (Cryptography.PaddingMode = {}));

      var CspProviderFlags;

      (function (CspProviderFlags) {
        CspProviderFlags[CspProviderFlags["NoFlags"] = 0] = "NoFlags";
        CspProviderFlags[CspProviderFlags["UseMachineKeyStore"] = 1] = "UseMachineKeyStore";
        CspProviderFlags[CspProviderFlags["UseDefaultKeyContainer"] = 2] = "UseDefaultKeyContainer";
        CspProviderFlags[CspProviderFlags["UseNonExportableKey"] = 4] = "UseNonExportableKey";
        CspProviderFlags[CspProviderFlags["UseExistingKey"] = 8] = "UseExistingKey";
        CspProviderFlags[CspProviderFlags["UseArchivableKey"] = 16] = "UseArchivableKey";
        CspProviderFlags[CspProviderFlags["UseUserProtectedKey"] = 32] = "UseUserProtectedKey";
        CspProviderFlags[CspProviderFlags["NoPrompt"] = 64] = "NoPrompt";
        CspProviderFlags[CspProviderFlags["CreateEphemeralKey"] = 128] = "CreateEphemeralKey";
      })(CspProviderFlags = Cryptography.CspProviderFlags || (Cryptography.CspProviderFlags = {}));

      var CryptoStreamMode;

      (function (CryptoStreamMode) {
        CryptoStreamMode[CryptoStreamMode["Read"] = 0] = "Read";
        CryptoStreamMode[CryptoStreamMode["Write"] = 1] = "Write";
      })(CryptoStreamMode = Cryptography.CryptoStreamMode || (Cryptography.CryptoStreamMode = {}));

      var KeyNumber;

      (function (KeyNumber) {
        KeyNumber[KeyNumber["Exchange"] = 1] = "Exchange";
        KeyNumber[KeyNumber["Signature"] = 2] = "Signature";
      })(KeyNumber = Cryptography.KeyNumber || (Cryptography.KeyNumber = {}));

      var CngKeyHandleOpenOptions;

      (function (CngKeyHandleOpenOptions) {
        CngKeyHandleOpenOptions[CngKeyHandleOpenOptions["None"] = 0] = "None";
        CngKeyHandleOpenOptions[CngKeyHandleOpenOptions["EphemeralKey"] = 1] = "EphemeralKey";
      })(CngKeyHandleOpenOptions = Cryptography.CngKeyHandleOpenOptions || (Cryptography.CngKeyHandleOpenOptions = {}));

      var ECKeyXmlFormat;

      (function (ECKeyXmlFormat) {
        ECKeyXmlFormat[ECKeyXmlFormat["Rfc4050"] = 0] = "Rfc4050";
      })(ECKeyXmlFormat = Cryptography.ECKeyXmlFormat || (Cryptography.ECKeyXmlFormat = {}));

      var CngExportPolicies;

      (function (CngExportPolicies) {
        CngExportPolicies[CngExportPolicies["None"] = 0] = "None";
        CngExportPolicies[CngExportPolicies["AllowExport"] = 1] = "AllowExport";
        CngExportPolicies[CngExportPolicies["AllowPlaintextExport"] = 2] = "AllowPlaintextExport";
        CngExportPolicies[CngExportPolicies["AllowArchiving"] = 4] = "AllowArchiving";
        CngExportPolicies[CngExportPolicies["AllowPlaintextArchiving"] = 8] = "AllowPlaintextArchiving";
      })(CngExportPolicies = Cryptography.CngExportPolicies || (Cryptography.CngExportPolicies = {}));

      var CngKeyCreationOptions;

      (function (CngKeyCreationOptions) {
        CngKeyCreationOptions[CngKeyCreationOptions["None"] = 0] = "None";
        CngKeyCreationOptions[CngKeyCreationOptions["MachineKey"] = 32] = "MachineKey";
        CngKeyCreationOptions[CngKeyCreationOptions["OverwriteExistingKey"] = 128] = "OverwriteExistingKey";
      })(CngKeyCreationOptions = Cryptography.CngKeyCreationOptions || (Cryptography.CngKeyCreationOptions = {}));

      var CngKeyOpenOptions;

      (function (CngKeyOpenOptions) {
        CngKeyOpenOptions[CngKeyOpenOptions["None"] = 0] = "None";
        CngKeyOpenOptions[CngKeyOpenOptions["UserKey"] = 0] = "UserKey";
        CngKeyOpenOptions[CngKeyOpenOptions["MachineKey"] = 32] = "MachineKey";
        CngKeyOpenOptions[CngKeyOpenOptions["Silent"] = 64] = "Silent";
      })(CngKeyOpenOptions = Cryptography.CngKeyOpenOptions || (Cryptography.CngKeyOpenOptions = {}));

      var CngKeyUsages;

      (function (CngKeyUsages) {
        CngKeyUsages[CngKeyUsages["None"] = 0] = "None";
        CngKeyUsages[CngKeyUsages["Decryption"] = 1] = "Decryption";
        CngKeyUsages[CngKeyUsages["Signing"] = 2] = "Signing";
        CngKeyUsages[CngKeyUsages["KeyAgreement"] = 4] = "KeyAgreement";
        CngKeyUsages[CngKeyUsages["AllUsages"] = 16777215] = "AllUsages";
      })(CngKeyUsages = Cryptography.CngKeyUsages || (Cryptography.CngKeyUsages = {}));

      var CngPropertyOptions;

      (function (CngPropertyOptions) {
        CngPropertyOptions[CngPropertyOptions["None"] = 0] = "None";
        CngPropertyOptions[CngPropertyOptions["CustomProperty"] = 1073741824] = "CustomProperty";
        CngPropertyOptions[CngPropertyOptions["Persist"] = -2147483648] = "Persist";
      })(CngPropertyOptions = Cryptography.CngPropertyOptions || (Cryptography.CngPropertyOptions = {}));

      var CngUIProtectionLevels;

      (function (CngUIProtectionLevels) {
        CngUIProtectionLevels[CngUIProtectionLevels["None"] = 0] = "None";
        CngUIProtectionLevels[CngUIProtectionLevels["ProtectKey"] = 1] = "ProtectKey";
        CngUIProtectionLevels[CngUIProtectionLevels["ForceHighProtection"] = 2] = "ForceHighProtection";
      })(CngUIProtectionLevels = Cryptography.CngUIProtectionLevels || (Cryptography.CngUIProtectionLevels = {}));

      var ECCurve_ECCurveType;

      (function (ECCurve_ECCurveType) {
        ECCurve_ECCurveType[ECCurve_ECCurveType["Implicit"] = 0] = "Implicit";
        ECCurve_ECCurveType[ECCurve_ECCurveType["PrimeShortWeierstrass"] = 1] = "PrimeShortWeierstrass";
        ECCurve_ECCurveType[ECCurve_ECCurveType["PrimeTwistedEdwards"] = 2] = "PrimeTwistedEdwards";
        ECCurve_ECCurveType[ECCurve_ECCurveType["PrimeMontgomery"] = 3] = "PrimeMontgomery";
        ECCurve_ECCurveType[ECCurve_ECCurveType["Characteristic2"] = 4] = "Characteristic2";
        ECCurve_ECCurveType[ECCurve_ECCurveType["Named"] = 5] = "Named";
      })(ECCurve_ECCurveType = Cryptography.ECCurve_ECCurveType || (Cryptography.ECCurve_ECCurveType = {}));

      var ECDiffieHellmanKeyDerivationFunction;

      (function (ECDiffieHellmanKeyDerivationFunction) {
        ECDiffieHellmanKeyDerivationFunction[ECDiffieHellmanKeyDerivationFunction["Hash"] = 0] = "Hash";
        ECDiffieHellmanKeyDerivationFunction[ECDiffieHellmanKeyDerivationFunction["Hmac"] = 1] = "Hmac";
        ECDiffieHellmanKeyDerivationFunction[ECDiffieHellmanKeyDerivationFunction["Tls"] = 2] = "Tls";
      })(ECDiffieHellmanKeyDerivationFunction = Cryptography.ECDiffieHellmanKeyDerivationFunction || (Cryptography.ECDiffieHellmanKeyDerivationFunction = {}));

      var SignatureVerificationResult;

      (function (SignatureVerificationResult) {
        SignatureVerificationResult[SignatureVerificationResult["AssemblyIdentityMismatch"] = 1] = "AssemblyIdentityMismatch";
        SignatureVerificationResult[SignatureVerificationResult["BadDigest"] = -2146869232] = "BadDigest";
        SignatureVerificationResult[SignatureVerificationResult["BadSignatureFormat"] = -2146762749] = "BadSignatureFormat";
        SignatureVerificationResult[SignatureVerificationResult["BasicConstraintsNotObserved"] = -2146869223] = "BasicConstraintsNotObserved";
        SignatureVerificationResult[SignatureVerificationResult["CertificateExpired"] = -2146762495] = "CertificateExpired";
        SignatureVerificationResult[SignatureVerificationResult["CertificateExplicitlyDistrusted"] = -2146762479] = "CertificateExplicitlyDistrusted";
        SignatureVerificationResult[SignatureVerificationResult["CertificateMalformed"] = -2146762488] = "CertificateMalformed";
        SignatureVerificationResult[SignatureVerificationResult["CertificateNotExplicitlyTrusted"] = -2146762748] = "CertificateNotExplicitlyTrusted";
        SignatureVerificationResult[SignatureVerificationResult["CertificateRevoked"] = -2146762484] = "CertificateRevoked";
        SignatureVerificationResult[SignatureVerificationResult["CertificateUsageNotAllowed"] = -2146762490] = "CertificateUsageNotAllowed";
        SignatureVerificationResult[SignatureVerificationResult["ContainingSignatureInvalid"] = 2] = "ContainingSignatureInvalid";
        SignatureVerificationResult[SignatureVerificationResult["CouldNotBuildChain"] = -2146762486] = "CouldNotBuildChain";
        SignatureVerificationResult[SignatureVerificationResult["GenericTrustFailure"] = -2146762485] = "GenericTrustFailure";
        SignatureVerificationResult[SignatureVerificationResult["InvalidCertificateName"] = -2146762476] = "InvalidCertificateName";
        SignatureVerificationResult[SignatureVerificationResult["InvalidCertificatePolicy"] = -2146762477] = "InvalidCertificatePolicy";
        SignatureVerificationResult[SignatureVerificationResult["InvalidCertificateRole"] = -2146762493] = "InvalidCertificateRole";
        SignatureVerificationResult[SignatureVerificationResult["InvalidCertificateSignature"] = -2146869244] = "InvalidCertificateSignature";
        SignatureVerificationResult[SignatureVerificationResult["InvalidCertificateUsage"] = -2146762480] = "InvalidCertificateUsage";
        SignatureVerificationResult[SignatureVerificationResult["InvalidCountersignature"] = -2146869245] = "InvalidCountersignature";
        SignatureVerificationResult[SignatureVerificationResult["InvalidSignerCertificate"] = -2146869246] = "InvalidSignerCertificate";
        SignatureVerificationResult[SignatureVerificationResult["InvalidTimePeriodNesting"] = -2146762494] = "InvalidTimePeriodNesting";
        SignatureVerificationResult[SignatureVerificationResult["InvalidTimestamp"] = -2146869243] = "InvalidTimestamp";
        SignatureVerificationResult[SignatureVerificationResult["IssuerChainingError"] = -2146762489] = "IssuerChainingError";
        SignatureVerificationResult[SignatureVerificationResult["MissingSignature"] = -2146762496] = "MissingSignature";
        SignatureVerificationResult[SignatureVerificationResult["PathLengthConstraintViolated"] = -2146762492] = "PathLengthConstraintViolated";
        SignatureVerificationResult[SignatureVerificationResult["PublicKeyTokenMismatch"] = 3] = "PublicKeyTokenMismatch";
        SignatureVerificationResult[SignatureVerificationResult["PublisherMismatch"] = 4] = "PublisherMismatch";
        SignatureVerificationResult[SignatureVerificationResult["RevocationCheckFailure"] = -2146762482] = "RevocationCheckFailure";
        SignatureVerificationResult[SignatureVerificationResult["SystemError"] = -2146869247] = "SystemError";
        SignatureVerificationResult[SignatureVerificationResult["UnknownCriticalExtension"] = -2146762491] = "UnknownCriticalExtension";
        SignatureVerificationResult[SignatureVerificationResult["UnknownTrustProvider"] = -2146762751] = "UnknownTrustProvider";
        SignatureVerificationResult[SignatureVerificationResult["UnknownVerificationAction"] = -2146762750] = "UnknownVerificationAction";
        SignatureVerificationResult[SignatureVerificationResult["UntrustedCertificationAuthority"] = -2146762478] = "UntrustedCertificationAuthority";
        SignatureVerificationResult[SignatureVerificationResult["UntrustedRootCertificate"] = -2146762487] = "UntrustedRootCertificate";
        SignatureVerificationResult[SignatureVerificationResult["UntrustedTestRootCertificate"] = -2146762483] = "UntrustedTestRootCertificate";
        SignatureVerificationResult[SignatureVerificationResult["Valid"] = 0] = "Valid";
      })(SignatureVerificationResult = Cryptography.SignatureVerificationResult || (Cryptography.SignatureVerificationResult = {}));

      var OidGroup;

      (function (OidGroup) {
        OidGroup[OidGroup["All"] = 0] = "All";
        OidGroup[OidGroup["HashAlgorithm"] = 1] = "HashAlgorithm";
        OidGroup[OidGroup["EncryptionAlgorithm"] = 2] = "EncryptionAlgorithm";
        OidGroup[OidGroup["PublicKeyAlgorithm"] = 3] = "PublicKeyAlgorithm";
        OidGroup[OidGroup["SignatureAlgorithm"] = 4] = "SignatureAlgorithm";
        OidGroup[OidGroup["Attribute"] = 5] = "Attribute";
        OidGroup[OidGroup["ExtensionOrAttribute"] = 6] = "ExtensionOrAttribute";
        OidGroup[OidGroup["EnhancedKeyUsage"] = 7] = "EnhancedKeyUsage";
        OidGroup[OidGroup["Policy"] = 8] = "Policy";
        OidGroup[OidGroup["Template"] = 9] = "Template";
        OidGroup[OidGroup["KeyDerivationFunction"] = 10] = "KeyDerivationFunction";
      })(OidGroup = Cryptography.OidGroup || (Cryptography.OidGroup = {}));

      var X509Certificates;

      (function (X509Certificates) {
        var X509ContentType;

        (function (X509ContentType) {
          X509ContentType[X509ContentType["Unknown"] = 0] = "Unknown";
          X509ContentType[X509ContentType["Cert"] = 1] = "Cert";
          X509ContentType[X509ContentType["SerializedCert"] = 2] = "SerializedCert";
          X509ContentType[X509ContentType["Pfx"] = 3] = "Pfx";
          X509ContentType[X509ContentType["Pkcs12"] = 3] = "Pkcs12";
          X509ContentType[X509ContentType["SerializedStore"] = 4] = "SerializedStore";
          X509ContentType[X509ContentType["Pkcs7"] = 5] = "Pkcs7";
          X509ContentType[X509ContentType["Authenticode"] = 6] = "Authenticode";
        })(X509ContentType = X509Certificates.X509ContentType || (X509Certificates.X509ContentType = {}));

        var X509KeyStorageFlags;

        (function (X509KeyStorageFlags) {
          X509KeyStorageFlags[X509KeyStorageFlags["DefaultKeySet"] = 0] = "DefaultKeySet";
          X509KeyStorageFlags[X509KeyStorageFlags["UserKeySet"] = 1] = "UserKeySet";
          X509KeyStorageFlags[X509KeyStorageFlags["MachineKeySet"] = 2] = "MachineKeySet";
          X509KeyStorageFlags[X509KeyStorageFlags["Exportable"] = 4] = "Exportable";
          X509KeyStorageFlags[X509KeyStorageFlags["UserProtected"] = 8] = "UserProtected";
          X509KeyStorageFlags[X509KeyStorageFlags["PersistKeySet"] = 16] = "PersistKeySet";
          X509KeyStorageFlags[X509KeyStorageFlags["EphemeralKeySet"] = 32] = "EphemeralKeySet";
        })(X509KeyStorageFlags = X509Certificates.X509KeyStorageFlags || (X509Certificates.X509KeyStorageFlags = {}));

        var TrustStatus;

        (function (TrustStatus) {
          TrustStatus[TrustStatus["Untrusted"] = 0] = "Untrusted";
          TrustStatus[TrustStatus["UnknownIdentity"] = 1] = "UnknownIdentity";
          TrustStatus[TrustStatus["KnownIdentity"] = 2] = "KnownIdentity";
          TrustStatus[TrustStatus["Trusted"] = 3] = "Trusted";
        })(TrustStatus = X509Certificates.TrustStatus || (X509Certificates.TrustStatus = {}));

        var OpenFlags;

        (function (OpenFlags) {
          OpenFlags[OpenFlags["ReadOnly"] = 0] = "ReadOnly";
          OpenFlags[OpenFlags["ReadWrite"] = 1] = "ReadWrite";
          OpenFlags[OpenFlags["MaxAllowed"] = 2] = "MaxAllowed";
          OpenFlags[OpenFlags["OpenExistingOnly"] = 4] = "OpenExistingOnly";
          OpenFlags[OpenFlags["IncludeArchived"] = 8] = "IncludeArchived";
        })(OpenFlags = X509Certificates.OpenFlags || (X509Certificates.OpenFlags = {}));

        var StoreLocation;

        (function (StoreLocation) {
          StoreLocation[StoreLocation["CurrentUser"] = 1] = "CurrentUser";
          StoreLocation[StoreLocation["LocalMachine"] = 2] = "LocalMachine";
        })(StoreLocation = X509Certificates.StoreLocation || (X509Certificates.StoreLocation = {}));

        var StoreName;

        (function (StoreName) {
          StoreName[StoreName["AddressBook"] = 1] = "AddressBook";
          StoreName[StoreName["AuthRoot"] = 2] = "AuthRoot";
          StoreName[StoreName["CertificateAuthority"] = 3] = "CertificateAuthority";
          StoreName[StoreName["Disallowed"] = 4] = "Disallowed";
          StoreName[StoreName["My"] = 5] = "My";
          StoreName[StoreName["Root"] = 6] = "Root";
          StoreName[StoreName["TrustedPeople"] = 7] = "TrustedPeople";
          StoreName[StoreName["TrustedPublisher"] = 8] = "TrustedPublisher";
        })(StoreName = X509Certificates.StoreName || (X509Certificates.StoreName = {}));

        var X500DistinguishedNameFlags;

        (function (X500DistinguishedNameFlags) {
          X500DistinguishedNameFlags[X500DistinguishedNameFlags["None"] = 0] = "None";
          X500DistinguishedNameFlags[X500DistinguishedNameFlags["Reversed"] = 1] = "Reversed";
          X500DistinguishedNameFlags[X500DistinguishedNameFlags["UseSemicolons"] = 16] = "UseSemicolons";
          X500DistinguishedNameFlags[X500DistinguishedNameFlags["DoNotUsePlusSign"] = 32] = "DoNotUsePlusSign";
          X500DistinguishedNameFlags[X500DistinguishedNameFlags["DoNotUseQuotes"] = 64] = "DoNotUseQuotes";
          X500DistinguishedNameFlags[X500DistinguishedNameFlags["UseCommas"] = 128] = "UseCommas";
          X500DistinguishedNameFlags[X500DistinguishedNameFlags["UseNewLines"] = 256] = "UseNewLines";
          X500DistinguishedNameFlags[X500DistinguishedNameFlags["UseUTF8Encoding"] = 4096] = "UseUTF8Encoding";
          X500DistinguishedNameFlags[X500DistinguishedNameFlags["UseT61Encoding"] = 8192] = "UseT61Encoding";
          X500DistinguishedNameFlags[X500DistinguishedNameFlags["ForceUTF8Encoding"] = 16384] = "ForceUTF8Encoding";
        })(X500DistinguishedNameFlags = X509Certificates.X500DistinguishedNameFlags || (X509Certificates.X500DistinguishedNameFlags = {}));

        var X509ChainStatusFlags;

        (function (X509ChainStatusFlags) {
          X509ChainStatusFlags[X509ChainStatusFlags["NoError"] = 0] = "NoError";
          X509ChainStatusFlags[X509ChainStatusFlags["NotTimeValid"] = 1] = "NotTimeValid";
          X509ChainStatusFlags[X509ChainStatusFlags["NotTimeNested"] = 2] = "NotTimeNested";
          X509ChainStatusFlags[X509ChainStatusFlags["Revoked"] = 4] = "Revoked";
          X509ChainStatusFlags[X509ChainStatusFlags["NotSignatureValid"] = 8] = "NotSignatureValid";
          X509ChainStatusFlags[X509ChainStatusFlags["NotValidForUsage"] = 16] = "NotValidForUsage";
          X509ChainStatusFlags[X509ChainStatusFlags["UntrustedRoot"] = 32] = "UntrustedRoot";
          X509ChainStatusFlags[X509ChainStatusFlags["RevocationStatusUnknown"] = 64] = "RevocationStatusUnknown";
          X509ChainStatusFlags[X509ChainStatusFlags["Cyclic"] = 128] = "Cyclic";
          X509ChainStatusFlags[X509ChainStatusFlags["InvalidExtension"] = 256] = "InvalidExtension";
          X509ChainStatusFlags[X509ChainStatusFlags["InvalidPolicyConstraints"] = 512] = "InvalidPolicyConstraints";
          X509ChainStatusFlags[X509ChainStatusFlags["InvalidBasicConstraints"] = 1024] = "InvalidBasicConstraints";
          X509ChainStatusFlags[X509ChainStatusFlags["InvalidNameConstraints"] = 2048] = "InvalidNameConstraints";
          X509ChainStatusFlags[X509ChainStatusFlags["HasNotSupportedNameConstraint"] = 4096] = "HasNotSupportedNameConstraint";
          X509ChainStatusFlags[X509ChainStatusFlags["HasNotDefinedNameConstraint"] = 8192] = "HasNotDefinedNameConstraint";
          X509ChainStatusFlags[X509ChainStatusFlags["HasNotPermittedNameConstraint"] = 16384] = "HasNotPermittedNameConstraint";
          X509ChainStatusFlags[X509ChainStatusFlags["HasExcludedNameConstraint"] = 32768] = "HasExcludedNameConstraint";
          X509ChainStatusFlags[X509ChainStatusFlags["PartialChain"] = 65536] = "PartialChain";
          X509ChainStatusFlags[X509ChainStatusFlags["CtlNotTimeValid"] = 131072] = "CtlNotTimeValid";
          X509ChainStatusFlags[X509ChainStatusFlags["CtlNotSignatureValid"] = 262144] = "CtlNotSignatureValid";
          X509ChainStatusFlags[X509ChainStatusFlags["CtlNotValidForUsage"] = 524288] = "CtlNotValidForUsage";
          X509ChainStatusFlags[X509ChainStatusFlags["OfflineRevocation"] = 16777216] = "OfflineRevocation";
          X509ChainStatusFlags[X509ChainStatusFlags["NoIssuanceChainPolicy"] = 33554432] = "NoIssuanceChainPolicy";
          X509ChainStatusFlags[X509ChainStatusFlags["ExplicitDistrust"] = 67108864] = "ExplicitDistrust";
          X509ChainStatusFlags[X509ChainStatusFlags["HasNotSupportedCriticalExtension"] = 134217728] = "HasNotSupportedCriticalExtension";
          X509ChainStatusFlags[X509ChainStatusFlags["HasWeakSignature"] = 1048576] = "HasWeakSignature";
        })(X509ChainStatusFlags = X509Certificates.X509ChainStatusFlags || (X509Certificates.X509ChainStatusFlags = {}));

        var X509FindType;

        (function (X509FindType) {
          X509FindType[X509FindType["FindByThumbprint"] = 0] = "FindByThumbprint";
          X509FindType[X509FindType["FindBySubjectName"] = 1] = "FindBySubjectName";
          X509FindType[X509FindType["FindBySubjectDistinguishedName"] = 2] = "FindBySubjectDistinguishedName";
          X509FindType[X509FindType["FindByIssuerName"] = 3] = "FindByIssuerName";
          X509FindType[X509FindType["FindByIssuerDistinguishedName"] = 4] = "FindByIssuerDistinguishedName";
          X509FindType[X509FindType["FindBySerialNumber"] = 5] = "FindBySerialNumber";
          X509FindType[X509FindType["FindByTimeValid"] = 6] = "FindByTimeValid";
          X509FindType[X509FindType["FindByTimeNotYetValid"] = 7] = "FindByTimeNotYetValid";
          X509FindType[X509FindType["FindByTimeExpired"] = 8] = "FindByTimeExpired";
          X509FindType[X509FindType["FindByTemplateName"] = 9] = "FindByTemplateName";
          X509FindType[X509FindType["FindByApplicationPolicy"] = 10] = "FindByApplicationPolicy";
          X509FindType[X509FindType["FindByCertificatePolicy"] = 11] = "FindByCertificatePolicy";
          X509FindType[X509FindType["FindByExtension"] = 12] = "FindByExtension";
          X509FindType[X509FindType["FindByKeyUsage"] = 13] = "FindByKeyUsage";
          X509FindType[X509FindType["FindBySubjectKeyIdentifier"] = 14] = "FindBySubjectKeyIdentifier";
        })(X509FindType = X509Certificates.X509FindType || (X509Certificates.X509FindType = {}));

        var X509IncludeOption;

        (function (X509IncludeOption) {
          X509IncludeOption[X509IncludeOption["None"] = 0] = "None";
          X509IncludeOption[X509IncludeOption["ExcludeRoot"] = 1] = "ExcludeRoot";
          X509IncludeOption[X509IncludeOption["EndCertOnly"] = 2] = "EndCertOnly";
          X509IncludeOption[X509IncludeOption["WholeChain"] = 3] = "WholeChain";
        })(X509IncludeOption = X509Certificates.X509IncludeOption || (X509Certificates.X509IncludeOption = {}));

        var X509KeyUsageFlags;

        (function (X509KeyUsageFlags) {
          X509KeyUsageFlags[X509KeyUsageFlags["None"] = 0] = "None";
          X509KeyUsageFlags[X509KeyUsageFlags["EncipherOnly"] = 1] = "EncipherOnly";
          X509KeyUsageFlags[X509KeyUsageFlags["CrlSign"] = 2] = "CrlSign";
          X509KeyUsageFlags[X509KeyUsageFlags["KeyCertSign"] = 4] = "KeyCertSign";
          X509KeyUsageFlags[X509KeyUsageFlags["KeyAgreement"] = 8] = "KeyAgreement";
          X509KeyUsageFlags[X509KeyUsageFlags["DataEncipherment"] = 16] = "DataEncipherment";
          X509KeyUsageFlags[X509KeyUsageFlags["KeyEncipherment"] = 32] = "KeyEncipherment";
          X509KeyUsageFlags[X509KeyUsageFlags["NonRepudiation"] = 64] = "NonRepudiation";
          X509KeyUsageFlags[X509KeyUsageFlags["DigitalSignature"] = 128] = "DigitalSignature";
          X509KeyUsageFlags[X509KeyUsageFlags["DecipherOnly"] = 32768] = "DecipherOnly";
        })(X509KeyUsageFlags = X509Certificates.X509KeyUsageFlags || (X509Certificates.X509KeyUsageFlags = {}));

        var X509NameType;

        (function (X509NameType) {
          X509NameType[X509NameType["SimpleName"] = 0] = "SimpleName";
          X509NameType[X509NameType["EmailName"] = 1] = "EmailName";
          X509NameType[X509NameType["UpnName"] = 2] = "UpnName";
          X509NameType[X509NameType["DnsName"] = 3] = "DnsName";
          X509NameType[X509NameType["DnsFromAlternativeName"] = 4] = "DnsFromAlternativeName";
          X509NameType[X509NameType["UrlName"] = 5] = "UrlName";
        })(X509NameType = X509Certificates.X509NameType || (X509Certificates.X509NameType = {}));

        var X509RevocationFlag;

        (function (X509RevocationFlag) {
          X509RevocationFlag[X509RevocationFlag["EndCertificateOnly"] = 0] = "EndCertificateOnly";
          X509RevocationFlag[X509RevocationFlag["EntireChain"] = 1] = "EntireChain";
          X509RevocationFlag[X509RevocationFlag["ExcludeRoot"] = 2] = "ExcludeRoot";
        })(X509RevocationFlag = X509Certificates.X509RevocationFlag || (X509Certificates.X509RevocationFlag = {}));

        var X509RevocationMode;

        (function (X509RevocationMode) {
          X509RevocationMode[X509RevocationMode["NoCheck"] = 0] = "NoCheck";
          X509RevocationMode[X509RevocationMode["Online"] = 1] = "Online";
          X509RevocationMode[X509RevocationMode["Offline"] = 2] = "Offline";
        })(X509RevocationMode = X509Certificates.X509RevocationMode || (X509Certificates.X509RevocationMode = {}));

        var X509SubjectKeyIdentifierHashAlgorithm;

        (function (X509SubjectKeyIdentifierHashAlgorithm) {
          X509SubjectKeyIdentifierHashAlgorithm[X509SubjectKeyIdentifierHashAlgorithm["Sha1"] = 0] = "Sha1";
          X509SubjectKeyIdentifierHashAlgorithm[X509SubjectKeyIdentifierHashAlgorithm["ShortSha1"] = 1] = "ShortSha1";
          X509SubjectKeyIdentifierHashAlgorithm[X509SubjectKeyIdentifierHashAlgorithm["CapiSha1"] = 2] = "CapiSha1";
        })(X509SubjectKeyIdentifierHashAlgorithm = X509Certificates.X509SubjectKeyIdentifierHashAlgorithm || (X509Certificates.X509SubjectKeyIdentifierHashAlgorithm = {}));

        var X509VerificationFlags;

        (function (X509VerificationFlags) {
          X509VerificationFlags[X509VerificationFlags["NoFlag"] = 0] = "NoFlag";
          X509VerificationFlags[X509VerificationFlags["IgnoreNotTimeValid"] = 1] = "IgnoreNotTimeValid";
          X509VerificationFlags[X509VerificationFlags["IgnoreCtlNotTimeValid"] = 2] = "IgnoreCtlNotTimeValid";
          X509VerificationFlags[X509VerificationFlags["IgnoreNotTimeNested"] = 4] = "IgnoreNotTimeNested";
          X509VerificationFlags[X509VerificationFlags["IgnoreInvalidBasicConstraints"] = 8] = "IgnoreInvalidBasicConstraints";
          X509VerificationFlags[X509VerificationFlags["AllowUnknownCertificateAuthority"] = 16] = "AllowUnknownCertificateAuthority";
          X509VerificationFlags[X509VerificationFlags["IgnoreWrongUsage"] = 32] = "IgnoreWrongUsage";
          X509VerificationFlags[X509VerificationFlags["IgnoreInvalidName"] = 64] = "IgnoreInvalidName";
          X509VerificationFlags[X509VerificationFlags["IgnoreInvalidPolicy"] = 128] = "IgnoreInvalidPolicy";
          X509VerificationFlags[X509VerificationFlags["IgnoreEndRevocationUnknown"] = 256] = "IgnoreEndRevocationUnknown";
          X509VerificationFlags[X509VerificationFlags["IgnoreCtlSignerRevocationUnknown"] = 512] = "IgnoreCtlSignerRevocationUnknown";
          X509VerificationFlags[X509VerificationFlags["IgnoreCertificateAuthorityRevocationUnknown"] = 1024] = "IgnoreCertificateAuthorityRevocationUnknown";
          X509VerificationFlags[X509VerificationFlags["IgnoreRootRevocationUnknown"] = 2048] = "IgnoreRootRevocationUnknown";
          X509VerificationFlags[X509VerificationFlags["AllFlags"] = 4095] = "AllFlags";
        })(X509VerificationFlags = X509Certificates.X509VerificationFlags || (X509Certificates.X509VerificationFlags = {}));
      })(X509Certificates = Cryptography.X509Certificates || (Cryptography.X509Certificates = {}));
    })(Cryptography = Security.Cryptography || (Security.Cryptography = {}));

    var Permissions;

    (function (Permissions) {
      var EnvironmentPermissionAccess;

      (function (EnvironmentPermissionAccess) {
        EnvironmentPermissionAccess[EnvironmentPermissionAccess["NoAccess"] = 0] = "NoAccess";
        EnvironmentPermissionAccess[EnvironmentPermissionAccess["Read"] = 1] = "Read";
        EnvironmentPermissionAccess[EnvironmentPermissionAccess["Write"] = 2] = "Write";
        EnvironmentPermissionAccess[EnvironmentPermissionAccess["AllAccess"] = 3] = "AllAccess";
      })(EnvironmentPermissionAccess = Permissions.EnvironmentPermissionAccess || (Permissions.EnvironmentPermissionAccess = {}));

      var FileDialogPermissionAccess;

      (function (FileDialogPermissionAccess) {
        FileDialogPermissionAccess[FileDialogPermissionAccess["None"] = 0] = "None";
        FileDialogPermissionAccess[FileDialogPermissionAccess["Open"] = 1] = "Open";
        FileDialogPermissionAccess[FileDialogPermissionAccess["Save"] = 2] = "Save";
        FileDialogPermissionAccess[FileDialogPermissionAccess["OpenSave"] = 3] = "OpenSave";
      })(FileDialogPermissionAccess = Permissions.FileDialogPermissionAccess || (Permissions.FileDialogPermissionAccess = {}));

      var FileIOPermissionAccess;

      (function (FileIOPermissionAccess) {
        FileIOPermissionAccess[FileIOPermissionAccess["NoAccess"] = 0] = "NoAccess";
        FileIOPermissionAccess[FileIOPermissionAccess["Read"] = 1] = "Read";
        FileIOPermissionAccess[FileIOPermissionAccess["Write"] = 2] = "Write";
        FileIOPermissionAccess[FileIOPermissionAccess["Append"] = 4] = "Append";
        FileIOPermissionAccess[FileIOPermissionAccess["PathDiscovery"] = 8] = "PathDiscovery";
        FileIOPermissionAccess[FileIOPermissionAccess["AllAccess"] = 15] = "AllAccess";
      })(FileIOPermissionAccess = Permissions.FileIOPermissionAccess || (Permissions.FileIOPermissionAccess = {}));

      var HostProtectionResource;

      (function (HostProtectionResource) {
        HostProtectionResource[HostProtectionResource["None"] = 0] = "None";
        HostProtectionResource[HostProtectionResource["Synchronization"] = 1] = "Synchronization";
        HostProtectionResource[HostProtectionResource["SharedState"] = 2] = "SharedState";
        HostProtectionResource[HostProtectionResource["ExternalProcessMgmt"] = 4] = "ExternalProcessMgmt";
        HostProtectionResource[HostProtectionResource["SelfAffectingProcessMgmt"] = 8] = "SelfAffectingProcessMgmt";
        HostProtectionResource[HostProtectionResource["ExternalThreading"] = 16] = "ExternalThreading";
        HostProtectionResource[HostProtectionResource["SelfAffectingThreading"] = 32] = "SelfAffectingThreading";
        HostProtectionResource[HostProtectionResource["SecurityInfrastructure"] = 64] = "SecurityInfrastructure";
        HostProtectionResource[HostProtectionResource["UI"] = 128] = "UI";
        HostProtectionResource[HostProtectionResource["MayLeakOnAbort"] = 256] = "MayLeakOnAbort";
        HostProtectionResource[HostProtectionResource["All"] = 511] = "All";
      })(HostProtectionResource = Permissions.HostProtectionResource || (Permissions.HostProtectionResource = {}));

      var IsolatedStorageContainment;

      (function (IsolatedStorageContainment) {
        IsolatedStorageContainment[IsolatedStorageContainment["None"] = 0] = "None";
        IsolatedStorageContainment[IsolatedStorageContainment["DomainIsolationByUser"] = 16] = "DomainIsolationByUser";
        IsolatedStorageContainment[IsolatedStorageContainment["AssemblyIsolationByUser"] = 32] = "AssemblyIsolationByUser";
        IsolatedStorageContainment[IsolatedStorageContainment["DomainIsolationByRoamingUser"] = 80] = "DomainIsolationByRoamingUser";
        IsolatedStorageContainment[IsolatedStorageContainment["AssemblyIsolationByRoamingUser"] = 96] = "AssemblyIsolationByRoamingUser";
        IsolatedStorageContainment[IsolatedStorageContainment["AdministerIsolatedStorageByUser"] = 112] = "AdministerIsolatedStorageByUser";
        IsolatedStorageContainment[IsolatedStorageContainment["UnrestrictedIsolatedStorage"] = 240] = "UnrestrictedIsolatedStorage";
        IsolatedStorageContainment[IsolatedStorageContainment["ApplicationIsolationByUser"] = 21] = "ApplicationIsolationByUser";
        IsolatedStorageContainment[IsolatedStorageContainment["DomainIsolationByMachine"] = 48] = "DomainIsolationByMachine";
        IsolatedStorageContainment[IsolatedStorageContainment["AssemblyIsolationByMachine"] = 64] = "AssemblyIsolationByMachine";
        IsolatedStorageContainment[IsolatedStorageContainment["ApplicationIsolationByMachine"] = 69] = "ApplicationIsolationByMachine";
        IsolatedStorageContainment[IsolatedStorageContainment["ApplicationIsolationByRoamingUser"] = 101] = "ApplicationIsolationByRoamingUser";
      })(IsolatedStorageContainment = Permissions.IsolatedStorageContainment || (Permissions.IsolatedStorageContainment = {}));

      var KeyContainerPermissionFlags;

      (function (KeyContainerPermissionFlags) {
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["NoFlags"] = 0] = "NoFlags";
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["Create"] = 1] = "Create";
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["Open"] = 2] = "Open";
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["Delete"] = 4] = "Delete";
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["Import"] = 16] = "Import";
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["Export"] = 32] = "Export";
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["Sign"] = 256] = "Sign";
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["Decrypt"] = 512] = "Decrypt";
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["ViewAcl"] = 4096] = "ViewAcl";
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["ChangeAcl"] = 8192] = "ChangeAcl";
        KeyContainerPermissionFlags[KeyContainerPermissionFlags["AllFlags"] = 13111] = "AllFlags";
      })(KeyContainerPermissionFlags = Permissions.KeyContainerPermissionFlags || (Permissions.KeyContainerPermissionFlags = {}));

      var PermissionState;

      (function (PermissionState) {
        PermissionState[PermissionState["Unrestricted"] = 1] = "Unrestricted";
        PermissionState[PermissionState["None"] = 0] = "None";
      })(PermissionState = Permissions.PermissionState || (Permissions.PermissionState = {}));

      var ReflectionPermissionFlag;

      (function (ReflectionPermissionFlag) {
        ReflectionPermissionFlag[ReflectionPermissionFlag["NoFlags"] = 0] = "NoFlags";
        ReflectionPermissionFlag[ReflectionPermissionFlag["TypeInformation"] = 1] = "TypeInformation";
        ReflectionPermissionFlag[ReflectionPermissionFlag["MemberAccess"] = 2] = "MemberAccess";
        ReflectionPermissionFlag[ReflectionPermissionFlag["ReflectionEmit"] = 4] = "ReflectionEmit";
        ReflectionPermissionFlag[ReflectionPermissionFlag["AllFlags"] = 7] = "AllFlags";
        ReflectionPermissionFlag[ReflectionPermissionFlag["RestrictedMemberAccess"] = 8] = "RestrictedMemberAccess";
      })(ReflectionPermissionFlag = Permissions.ReflectionPermissionFlag || (Permissions.ReflectionPermissionFlag = {}));

      var RegistryPermissionAccess;

      (function (RegistryPermissionAccess) {
        RegistryPermissionAccess[RegistryPermissionAccess["NoAccess"] = 0] = "NoAccess";
        RegistryPermissionAccess[RegistryPermissionAccess["Read"] = 1] = "Read";
        RegistryPermissionAccess[RegistryPermissionAccess["Write"] = 2] = "Write";
        RegistryPermissionAccess[RegistryPermissionAccess["Create"] = 4] = "Create";
        RegistryPermissionAccess[RegistryPermissionAccess["AllAccess"] = 7] = "AllAccess";
      })(RegistryPermissionAccess = Permissions.RegistryPermissionAccess || (Permissions.RegistryPermissionAccess = {}));

      var SecurityAction;

      (function (SecurityAction) {
        SecurityAction[SecurityAction["Demand"] = 2] = "Demand";
        SecurityAction[SecurityAction["Assert"] = 3] = "Assert";
        SecurityAction[SecurityAction["Deny"] = 4] = "Deny";
        SecurityAction[SecurityAction["PermitOnly"] = 5] = "PermitOnly";
        SecurityAction[SecurityAction["LinkDemand"] = 6] = "LinkDemand";
        SecurityAction[SecurityAction["InheritanceDemand"] = 7] = "InheritanceDemand";
        SecurityAction[SecurityAction["RequestMinimum"] = 8] = "RequestMinimum";
        SecurityAction[SecurityAction["RequestOptional"] = 9] = "RequestOptional";
        SecurityAction[SecurityAction["RequestRefuse"] = 10] = "RequestRefuse";
      })(SecurityAction = Permissions.SecurityAction || (Permissions.SecurityAction = {}));

      var SecurityPermissionFlag;

      (function (SecurityPermissionFlag) {
        SecurityPermissionFlag[SecurityPermissionFlag["NoFlags"] = 0] = "NoFlags";
        SecurityPermissionFlag[SecurityPermissionFlag["Assertion"] = 1] = "Assertion";
        SecurityPermissionFlag[SecurityPermissionFlag["UnmanagedCode"] = 2] = "UnmanagedCode";
        SecurityPermissionFlag[SecurityPermissionFlag["SkipVerification"] = 4] = "SkipVerification";
        SecurityPermissionFlag[SecurityPermissionFlag["Execution"] = 8] = "Execution";
        SecurityPermissionFlag[SecurityPermissionFlag["ControlThread"] = 16] = "ControlThread";
        SecurityPermissionFlag[SecurityPermissionFlag["ControlEvidence"] = 32] = "ControlEvidence";
        SecurityPermissionFlag[SecurityPermissionFlag["ControlPolicy"] = 64] = "ControlPolicy";
        SecurityPermissionFlag[SecurityPermissionFlag["SerializationFormatter"] = 128] = "SerializationFormatter";
        SecurityPermissionFlag[SecurityPermissionFlag["ControlDomainPolicy"] = 256] = "ControlDomainPolicy";
        SecurityPermissionFlag[SecurityPermissionFlag["ControlPrincipal"] = 512] = "ControlPrincipal";
        SecurityPermissionFlag[SecurityPermissionFlag["ControlAppDomain"] = 1024] = "ControlAppDomain";
        SecurityPermissionFlag[SecurityPermissionFlag["RemotingConfiguration"] = 2048] = "RemotingConfiguration";
        SecurityPermissionFlag[SecurityPermissionFlag["Infrastructure"] = 4096] = "Infrastructure";
        SecurityPermissionFlag[SecurityPermissionFlag["BindingRedirects"] = 8192] = "BindingRedirects";
        SecurityPermissionFlag[SecurityPermissionFlag["AllFlags"] = 16383] = "AllFlags";
      })(SecurityPermissionFlag = Permissions.SecurityPermissionFlag || (Permissions.SecurityPermissionFlag = {}));

      var UIPermissionClipboard;

      (function (UIPermissionClipboard) {
        UIPermissionClipboard[UIPermissionClipboard["NoClipboard"] = 0] = "NoClipboard";
        UIPermissionClipboard[UIPermissionClipboard["OwnClipboard"] = 1] = "OwnClipboard";
        UIPermissionClipboard[UIPermissionClipboard["AllClipboard"] = 2] = "AllClipboard";
      })(UIPermissionClipboard = Permissions.UIPermissionClipboard || (Permissions.UIPermissionClipboard = {}));

      var UIPermissionWindow;

      (function (UIPermissionWindow) {
        UIPermissionWindow[UIPermissionWindow["NoWindows"] = 0] = "NoWindows";
        UIPermissionWindow[UIPermissionWindow["SafeSubWindows"] = 1] = "SafeSubWindows";
        UIPermissionWindow[UIPermissionWindow["SafeTopLevelWindows"] = 2] = "SafeTopLevelWindows";
        UIPermissionWindow[UIPermissionWindow["AllWindows"] = 3] = "AllWindows";
      })(UIPermissionWindow = Permissions.UIPermissionWindow || (Permissions.UIPermissionWindow = {}));

      var TypeDescriptorPermissionFlags;

      (function (TypeDescriptorPermissionFlags) {
        TypeDescriptorPermissionFlags[TypeDescriptorPermissionFlags["NoFlags"] = 0] = "NoFlags";
        TypeDescriptorPermissionFlags[TypeDescriptorPermissionFlags["RestrictedRegistrationAccess"] = 1] = "RestrictedRegistrationAccess";
      })(TypeDescriptorPermissionFlags = Permissions.TypeDescriptorPermissionFlags || (Permissions.TypeDescriptorPermissionFlags = {}));

      var StorePermissionFlags;

      (function (StorePermissionFlags) {
        StorePermissionFlags[StorePermissionFlags["NoFlags"] = 0] = "NoFlags";
        StorePermissionFlags[StorePermissionFlags["CreateStore"] = 1] = "CreateStore";
        StorePermissionFlags[StorePermissionFlags["DeleteStore"] = 2] = "DeleteStore";
        StorePermissionFlags[StorePermissionFlags["EnumerateStores"] = 4] = "EnumerateStores";
        StorePermissionFlags[StorePermissionFlags["OpenStore"] = 16] = "OpenStore";
        StorePermissionFlags[StorePermissionFlags["AddToStore"] = 32] = "AddToStore";
        StorePermissionFlags[StorePermissionFlags["RemoveFromStore"] = 64] = "RemoveFromStore";
        StorePermissionFlags[StorePermissionFlags["EnumerateCertificates"] = 128] = "EnumerateCertificates";
        StorePermissionFlags[StorePermissionFlags["AllFlags"] = 247] = "AllFlags";
      })(StorePermissionFlags = Permissions.StorePermissionFlags || (Permissions.StorePermissionFlags = {}));
    })(Permissions = Security.Permissions || (Security.Permissions = {}));

    var Policy;

    (function (Policy) {
      var ApplicationVersionMatch;

      (function (ApplicationVersionMatch) {
        ApplicationVersionMatch[ApplicationVersionMatch["MatchExactVersion"] = 0] = "MatchExactVersion";
        ApplicationVersionMatch[ApplicationVersionMatch["MatchAllVersions"] = 1] = "MatchAllVersions";
      })(ApplicationVersionMatch = Policy.ApplicationVersionMatch || (Policy.ApplicationVersionMatch = {}));

      var PolicyStatementAttribute;

      (function (PolicyStatementAttribute) {
        PolicyStatementAttribute[PolicyStatementAttribute["Nothing"] = 0] = "Nothing";
        PolicyStatementAttribute[PolicyStatementAttribute["Exclusive"] = 1] = "Exclusive";
        PolicyStatementAttribute[PolicyStatementAttribute["LevelFinal"] = 2] = "LevelFinal";
        PolicyStatementAttribute[PolicyStatementAttribute["All"] = 3] = "All";
      })(PolicyStatementAttribute = Policy.PolicyStatementAttribute || (Policy.PolicyStatementAttribute = {}));

      var TrustManagerUIContext;

      (function (TrustManagerUIContext) {
        TrustManagerUIContext[TrustManagerUIContext["Install"] = 0] = "Install";
        TrustManagerUIContext[TrustManagerUIContext["Upgrade"] = 1] = "Upgrade";
        TrustManagerUIContext[TrustManagerUIContext["Run"] = 2] = "Run";
      })(TrustManagerUIContext = Policy.TrustManagerUIContext || (Policy.TrustManagerUIContext = {}));
    })(Policy = Security.Policy || (Security.Policy = {}));

    var Principal;

    (function (Principal) {
      var PrincipalPolicy;

      (function (PrincipalPolicy) {
        PrincipalPolicy[PrincipalPolicy["UnauthenticatedPrincipal"] = 0] = "UnauthenticatedPrincipal";
        PrincipalPolicy[PrincipalPolicy["NoPrincipal"] = 1] = "NoPrincipal";
        PrincipalPolicy[PrincipalPolicy["WindowsPrincipal"] = 2] = "WindowsPrincipal";
      })(PrincipalPolicy = Principal.PrincipalPolicy || (Principal.PrincipalPolicy = {}));

      var TokenAccessLevels;

      (function (TokenAccessLevels) {
        TokenAccessLevels[TokenAccessLevels["AssignPrimary"] = 1] = "AssignPrimary";
        TokenAccessLevels[TokenAccessLevels["Duplicate"] = 2] = "Duplicate";
        TokenAccessLevels[TokenAccessLevels["Impersonate"] = 4] = "Impersonate";
        TokenAccessLevels[TokenAccessLevels["Query"] = 8] = "Query";
        TokenAccessLevels[TokenAccessLevels["QuerySource"] = 16] = "QuerySource";
        TokenAccessLevels[TokenAccessLevels["AdjustPrivileges"] = 32] = "AdjustPrivileges";
        TokenAccessLevels[TokenAccessLevels["AdjustGroups"] = 64] = "AdjustGroups";
        TokenAccessLevels[TokenAccessLevels["AdjustDefault"] = 128] = "AdjustDefault";
        TokenAccessLevels[TokenAccessLevels["AdjustSessionId"] = 256] = "AdjustSessionId";
        TokenAccessLevels[TokenAccessLevels["Read"] = 131080] = "Read";
        TokenAccessLevels[TokenAccessLevels["Write"] = 131296] = "Write";
        TokenAccessLevels[TokenAccessLevels["AllAccess"] = 983551] = "AllAccess";
        TokenAccessLevels[TokenAccessLevels["MaximumAllowed"] = 33554432] = "MaximumAllowed";
      })(TokenAccessLevels = Principal.TokenAccessLevels || (Principal.TokenAccessLevels = {}));

      var TokenImpersonationLevel;

      (function (TokenImpersonationLevel) {
        TokenImpersonationLevel[TokenImpersonationLevel["Anonymous"] = 1] = "Anonymous";
        TokenImpersonationLevel[TokenImpersonationLevel["Delegation"] = 4] = "Delegation";
        TokenImpersonationLevel[TokenImpersonationLevel["Identification"] = 2] = "Identification";
        TokenImpersonationLevel[TokenImpersonationLevel["Impersonation"] = 3] = "Impersonation";
        TokenImpersonationLevel[TokenImpersonationLevel["None"] = 0] = "None";
      })(TokenImpersonationLevel = Principal.TokenImpersonationLevel || (Principal.TokenImpersonationLevel = {}));

      var WellKnownSidType;

      (function (WellKnownSidType) {
        WellKnownSidType[WellKnownSidType["NullSid"] = 0] = "NullSid";
        WellKnownSidType[WellKnownSidType["WorldSid"] = 1] = "WorldSid";
        WellKnownSidType[WellKnownSidType["LocalSid"] = 2] = "LocalSid";
        WellKnownSidType[WellKnownSidType["CreatorOwnerSid"] = 3] = "CreatorOwnerSid";
        WellKnownSidType[WellKnownSidType["CreatorGroupSid"] = 4] = "CreatorGroupSid";
        WellKnownSidType[WellKnownSidType["CreatorOwnerServerSid"] = 5] = "CreatorOwnerServerSid";
        WellKnownSidType[WellKnownSidType["CreatorGroupServerSid"] = 6] = "CreatorGroupServerSid";
        WellKnownSidType[WellKnownSidType["NTAuthoritySid"] = 7] = "NTAuthoritySid";
        WellKnownSidType[WellKnownSidType["DialupSid"] = 8] = "DialupSid";
        WellKnownSidType[WellKnownSidType["NetworkSid"] = 9] = "NetworkSid";
        WellKnownSidType[WellKnownSidType["BatchSid"] = 10] = "BatchSid";
        WellKnownSidType[WellKnownSidType["InteractiveSid"] = 11] = "InteractiveSid";
        WellKnownSidType[WellKnownSidType["ServiceSid"] = 12] = "ServiceSid";
        WellKnownSidType[WellKnownSidType["AnonymousSid"] = 13] = "AnonymousSid";
        WellKnownSidType[WellKnownSidType["ProxySid"] = 14] = "ProxySid";
        WellKnownSidType[WellKnownSidType["EnterpriseControllersSid"] = 15] = "EnterpriseControllersSid";
        WellKnownSidType[WellKnownSidType["SelfSid"] = 16] = "SelfSid";
        WellKnownSidType[WellKnownSidType["AuthenticatedUserSid"] = 17] = "AuthenticatedUserSid";
        WellKnownSidType[WellKnownSidType["RestrictedCodeSid"] = 18] = "RestrictedCodeSid";
        WellKnownSidType[WellKnownSidType["TerminalServerSid"] = 19] = "TerminalServerSid";
        WellKnownSidType[WellKnownSidType["RemoteLogonIdSid"] = 20] = "RemoteLogonIdSid";
        WellKnownSidType[WellKnownSidType["LogonIdsSid"] = 21] = "LogonIdsSid";
        WellKnownSidType[WellKnownSidType["LocalSystemSid"] = 22] = "LocalSystemSid";
        WellKnownSidType[WellKnownSidType["LocalServiceSid"] = 23] = "LocalServiceSid";
        WellKnownSidType[WellKnownSidType["NetworkServiceSid"] = 24] = "NetworkServiceSid";
        WellKnownSidType[WellKnownSidType["BuiltinDomainSid"] = 25] = "BuiltinDomainSid";
        WellKnownSidType[WellKnownSidType["BuiltinAdministratorsSid"] = 26] = "BuiltinAdministratorsSid";
        WellKnownSidType[WellKnownSidType["BuiltinUsersSid"] = 27] = "BuiltinUsersSid";
        WellKnownSidType[WellKnownSidType["BuiltinGuestsSid"] = 28] = "BuiltinGuestsSid";
        WellKnownSidType[WellKnownSidType["BuiltinPowerUsersSid"] = 29] = "BuiltinPowerUsersSid";
        WellKnownSidType[WellKnownSidType["BuiltinAccountOperatorsSid"] = 30] = "BuiltinAccountOperatorsSid";
        WellKnownSidType[WellKnownSidType["BuiltinSystemOperatorsSid"] = 31] = "BuiltinSystemOperatorsSid";
        WellKnownSidType[WellKnownSidType["BuiltinPrintOperatorsSid"] = 32] = "BuiltinPrintOperatorsSid";
        WellKnownSidType[WellKnownSidType["BuiltinBackupOperatorsSid"] = 33] = "BuiltinBackupOperatorsSid";
        WellKnownSidType[WellKnownSidType["BuiltinReplicatorSid"] = 34] = "BuiltinReplicatorSid";
        WellKnownSidType[WellKnownSidType["BuiltinPreWindows2000CompatibleAccessSid"] = 35] = "BuiltinPreWindows2000CompatibleAccessSid";
        WellKnownSidType[WellKnownSidType["BuiltinRemoteDesktopUsersSid"] = 36] = "BuiltinRemoteDesktopUsersSid";
        WellKnownSidType[WellKnownSidType["BuiltinNetworkConfigurationOperatorsSid"] = 37] = "BuiltinNetworkConfigurationOperatorsSid";
        WellKnownSidType[WellKnownSidType["AccountAdministratorSid"] = 38] = "AccountAdministratorSid";
        WellKnownSidType[WellKnownSidType["AccountGuestSid"] = 39] = "AccountGuestSid";
        WellKnownSidType[WellKnownSidType["AccountKrbtgtSid"] = 40] = "AccountKrbtgtSid";
        WellKnownSidType[WellKnownSidType["AccountDomainAdminsSid"] = 41] = "AccountDomainAdminsSid";
        WellKnownSidType[WellKnownSidType["AccountDomainUsersSid"] = 42] = "AccountDomainUsersSid";
        WellKnownSidType[WellKnownSidType["AccountDomainGuestsSid"] = 43] = "AccountDomainGuestsSid";
        WellKnownSidType[WellKnownSidType["AccountComputersSid"] = 44] = "AccountComputersSid";
        WellKnownSidType[WellKnownSidType["AccountControllersSid"] = 45] = "AccountControllersSid";
        WellKnownSidType[WellKnownSidType["AccountCertAdminsSid"] = 46] = "AccountCertAdminsSid";
        WellKnownSidType[WellKnownSidType["AccountSchemaAdminsSid"] = 47] = "AccountSchemaAdminsSid";
        WellKnownSidType[WellKnownSidType["AccountEnterpriseAdminsSid"] = 48] = "AccountEnterpriseAdminsSid";
        WellKnownSidType[WellKnownSidType["AccountPolicyAdminsSid"] = 49] = "AccountPolicyAdminsSid";
        WellKnownSidType[WellKnownSidType["AccountRasAndIasServersSid"] = 50] = "AccountRasAndIasServersSid";
        WellKnownSidType[WellKnownSidType["NtlmAuthenticationSid"] = 51] = "NtlmAuthenticationSid";
        WellKnownSidType[WellKnownSidType["DigestAuthenticationSid"] = 52] = "DigestAuthenticationSid";
        WellKnownSidType[WellKnownSidType["SChannelAuthenticationSid"] = 53] = "SChannelAuthenticationSid";
        WellKnownSidType[WellKnownSidType["ThisOrganizationSid"] = 54] = "ThisOrganizationSid";
        WellKnownSidType[WellKnownSidType["OtherOrganizationSid"] = 55] = "OtherOrganizationSid";
        WellKnownSidType[WellKnownSidType["BuiltinIncomingForestTrustBuildersSid"] = 56] = "BuiltinIncomingForestTrustBuildersSid";
        WellKnownSidType[WellKnownSidType["BuiltinPerformanceMonitoringUsersSid"] = 57] = "BuiltinPerformanceMonitoringUsersSid";
        WellKnownSidType[WellKnownSidType["BuiltinPerformanceLoggingUsersSid"] = 58] = "BuiltinPerformanceLoggingUsersSid";
        WellKnownSidType[WellKnownSidType["BuiltinAuthorizationAccessSid"] = 59] = "BuiltinAuthorizationAccessSid";
        WellKnownSidType[WellKnownSidType["WinBuiltinTerminalServerLicenseServersSid"] = 60] = "WinBuiltinTerminalServerLicenseServersSid";
        WellKnownSidType[WellKnownSidType["MaxDefined"] = 60] = "MaxDefined";
        WellKnownSidType[WellKnownSidType["WinBuiltinDCOMUsersSid"] = 61] = "WinBuiltinDCOMUsersSid";
        WellKnownSidType[WellKnownSidType["WinBuiltinIUsersSid"] = 62] = "WinBuiltinIUsersSid";
        WellKnownSidType[WellKnownSidType["WinIUserSid"] = 63] = "WinIUserSid";
        WellKnownSidType[WellKnownSidType["WinBuiltinCryptoOperatorsSid"] = 64] = "WinBuiltinCryptoOperatorsSid";
        WellKnownSidType[WellKnownSidType["WinUntrustedLabelSid"] = 65] = "WinUntrustedLabelSid";
        WellKnownSidType[WellKnownSidType["WinLowLabelSid"] = 66] = "WinLowLabelSid";
        WellKnownSidType[WellKnownSidType["WinMediumLabelSid"] = 67] = "WinMediumLabelSid";
        WellKnownSidType[WellKnownSidType["WinHighLabelSid"] = 68] = "WinHighLabelSid";
        WellKnownSidType[WellKnownSidType["WinSystemLabelSid"] = 69] = "WinSystemLabelSid";
        WellKnownSidType[WellKnownSidType["WinWriteRestrictedCodeSid"] = 70] = "WinWriteRestrictedCodeSid";
        WellKnownSidType[WellKnownSidType["WinCreatorOwnerRightsSid"] = 71] = "WinCreatorOwnerRightsSid";
        WellKnownSidType[WellKnownSidType["WinCacheablePrincipalsGroupSid"] = 72] = "WinCacheablePrincipalsGroupSid";
        WellKnownSidType[WellKnownSidType["WinNonCacheablePrincipalsGroupSid"] = 73] = "WinNonCacheablePrincipalsGroupSid";
        WellKnownSidType[WellKnownSidType["WinEnterpriseReadonlyControllersSid"] = 74] = "WinEnterpriseReadonlyControllersSid";
        WellKnownSidType[WellKnownSidType["WinAccountReadonlyControllersSid"] = 75] = "WinAccountReadonlyControllersSid";
        WellKnownSidType[WellKnownSidType["WinBuiltinEventLogReadersGroup"] = 76] = "WinBuiltinEventLogReadersGroup";
        WellKnownSidType[WellKnownSidType["WinNewEnterpriseReadonlyControllersSid"] = 77] = "WinNewEnterpriseReadonlyControllersSid";
        WellKnownSidType[WellKnownSidType["WinBuiltinCertSvcDComAccessGroup"] = 78] = "WinBuiltinCertSvcDComAccessGroup";
        WellKnownSidType[WellKnownSidType["WinMediumPlusLabelSid"] = 79] = "WinMediumPlusLabelSid";
        WellKnownSidType[WellKnownSidType["WinLocalLogonSid"] = 80] = "WinLocalLogonSid";
        WellKnownSidType[WellKnownSidType["WinConsoleLogonSid"] = 81] = "WinConsoleLogonSid";
        WellKnownSidType[WellKnownSidType["WinThisOrganizationCertificateSid"] = 82] = "WinThisOrganizationCertificateSid";
        WellKnownSidType[WellKnownSidType["WinApplicationPackageAuthoritySid"] = 83] = "WinApplicationPackageAuthoritySid";
        WellKnownSidType[WellKnownSidType["WinBuiltinAnyPackageSid"] = 84] = "WinBuiltinAnyPackageSid";
        WellKnownSidType[WellKnownSidType["WinCapabilityInternetClientSid"] = 85] = "WinCapabilityInternetClientSid";
        WellKnownSidType[WellKnownSidType["WinCapabilityInternetClientServerSid"] = 86] = "WinCapabilityInternetClientServerSid";
        WellKnownSidType[WellKnownSidType["WinCapabilityPrivateNetworkClientServerSid"] = 87] = "WinCapabilityPrivateNetworkClientServerSid";
        WellKnownSidType[WellKnownSidType["WinCapabilityPicturesLibrarySid"] = 88] = "WinCapabilityPicturesLibrarySid";
        WellKnownSidType[WellKnownSidType["WinCapabilityVideosLibrarySid"] = 89] = "WinCapabilityVideosLibrarySid";
        WellKnownSidType[WellKnownSidType["WinCapabilityMusicLibrarySid"] = 90] = "WinCapabilityMusicLibrarySid";
        WellKnownSidType[WellKnownSidType["WinCapabilityDocumentsLibrarySid"] = 91] = "WinCapabilityDocumentsLibrarySid";
        WellKnownSidType[WellKnownSidType["WinCapabilitySharedUserCertificatesSid"] = 92] = "WinCapabilitySharedUserCertificatesSid";
        WellKnownSidType[WellKnownSidType["WinCapabilityEnterpriseAuthenticationSid"] = 93] = "WinCapabilityEnterpriseAuthenticationSid";
        WellKnownSidType[WellKnownSidType["WinCapabilityRemovableStorageSid"] = 94] = "WinCapabilityRemovableStorageSid";
      })(WellKnownSidType = Principal.WellKnownSidType || (Principal.WellKnownSidType = {}));

      var WindowsAccountType;

      (function (WindowsAccountType) {
        WindowsAccountType[WindowsAccountType["Normal"] = 0] = "Normal";
        WindowsAccountType[WindowsAccountType["Guest"] = 1] = "Guest";
        WindowsAccountType[WindowsAccountType["System"] = 2] = "System";
        WindowsAccountType[WindowsAccountType["Anonymous"] = 3] = "Anonymous";
      })(WindowsAccountType = Principal.WindowsAccountType || (Principal.WindowsAccountType = {}));

      var WindowsBuiltInRole;

      (function (WindowsBuiltInRole) {
        WindowsBuiltInRole[WindowsBuiltInRole["Administrator"] = 544] = "Administrator";
        WindowsBuiltInRole[WindowsBuiltInRole["User"] = 545] = "User";
        WindowsBuiltInRole[WindowsBuiltInRole["Guest"] = 546] = "Guest";
        WindowsBuiltInRole[WindowsBuiltInRole["PowerUser"] = 547] = "PowerUser";
        WindowsBuiltInRole[WindowsBuiltInRole["AccountOperator"] = 548] = "AccountOperator";
        WindowsBuiltInRole[WindowsBuiltInRole["SystemOperator"] = 549] = "SystemOperator";
        WindowsBuiltInRole[WindowsBuiltInRole["PrintOperator"] = 550] = "PrintOperator";
        WindowsBuiltInRole[WindowsBuiltInRole["BackupOperator"] = 551] = "BackupOperator";
        WindowsBuiltInRole[WindowsBuiltInRole["Replicator"] = 552] = "Replicator";
      })(WindowsBuiltInRole = Principal.WindowsBuiltInRole || (Principal.WindowsBuiltInRole = {}));
    })(Principal = Security.Principal || (Security.Principal = {}));
  })(Security = System.Security || (System.Security = {}));

  var Text;

  (function (Text) {
    var NormalizationForm;

    (function (NormalizationForm) {
      NormalizationForm[NormalizationForm["FormC"] = 1] = "FormC";
      NormalizationForm[NormalizationForm["FormD"] = 2] = "FormD";
      NormalizationForm[NormalizationForm["FormKC"] = 5] = "FormKC";
      NormalizationForm[NormalizationForm["FormKD"] = 6] = "FormKD";
    })(NormalizationForm = Text.NormalizationForm || (Text.NormalizationForm = {}));

    var RegularExpressions;

    (function (RegularExpressions) {
      var RegexOptions;

      (function (RegexOptions) {
        RegexOptions[RegexOptions["None"] = 0] = "None";
        RegexOptions[RegexOptions["IgnoreCase"] = 1] = "IgnoreCase";
        RegexOptions[RegexOptions["Multiline"] = 2] = "Multiline";
        RegexOptions[RegexOptions["ExplicitCapture"] = 4] = "ExplicitCapture";
        RegexOptions[RegexOptions["Compiled"] = 8] = "Compiled";
        RegexOptions[RegexOptions["Singleline"] = 16] = "Singleline";
        RegexOptions[RegexOptions["IgnorePatternWhitespace"] = 32] = "IgnorePatternWhitespace";
        RegexOptions[RegexOptions["RightToLeft"] = 64] = "RightToLeft";
        RegexOptions[RegexOptions["ECMAScript"] = 256] = "ECMAScript";
        RegexOptions[RegexOptions["CultureInvariant"] = 512] = "CultureInvariant";
      })(RegexOptions = RegularExpressions.RegexOptions || (RegularExpressions.RegexOptions = {}));
    })(RegularExpressions = Text.RegularExpressions || (Text.RegularExpressions = {}));
  })(Text = System.Text || (System.Text = {}));

  var Threading;

  (function (Threading) {
    var LazyThreadSafetyMode;

    (function (LazyThreadSafetyMode) {
      LazyThreadSafetyMode[LazyThreadSafetyMode["None"] = 0] = "None";
      LazyThreadSafetyMode[LazyThreadSafetyMode["PublicationOnly"] = 1] = "PublicationOnly";
      LazyThreadSafetyMode[LazyThreadSafetyMode["ExecutionAndPublication"] = 2] = "ExecutionAndPublication";
    })(LazyThreadSafetyMode = Threading.LazyThreadSafetyMode || (Threading.LazyThreadSafetyMode = {}));

    var ApartmentState;

    (function (ApartmentState) {
      ApartmentState[ApartmentState["STA"] = 0] = "STA";
      ApartmentState[ApartmentState["MTA"] = 1] = "MTA";
      ApartmentState[ApartmentState["Unknown"] = 2] = "Unknown";
    })(ApartmentState = Threading.ApartmentState || (Threading.ApartmentState = {}));

    var EventResetMode;

    (function (EventResetMode) {
      EventResetMode[EventResetMode["AutoReset"] = 0] = "AutoReset";
      EventResetMode[EventResetMode["ManualReset"] = 1] = "ManualReset";
    })(EventResetMode = Threading.EventResetMode || (Threading.EventResetMode = {}));

    var ThreadPriority;

    (function (ThreadPriority) {
      ThreadPriority[ThreadPriority["Lowest"] = 0] = "Lowest";
      ThreadPriority[ThreadPriority["BelowNormal"] = 1] = "BelowNormal";
      ThreadPriority[ThreadPriority["Normal"] = 2] = "Normal";
      ThreadPriority[ThreadPriority["AboveNormal"] = 3] = "AboveNormal";
      ThreadPriority[ThreadPriority["Highest"] = 4] = "Highest";
    })(ThreadPriority = Threading.ThreadPriority || (Threading.ThreadPriority = {}));

    var ThreadState;

    (function (ThreadState) {
      ThreadState[ThreadState["Running"] = 0] = "Running";
      ThreadState[ThreadState["StopRequested"] = 1] = "StopRequested";
      ThreadState[ThreadState["SuspendRequested"] = 2] = "SuspendRequested";
      ThreadState[ThreadState["Background"] = 4] = "Background";
      ThreadState[ThreadState["Unstarted"] = 8] = "Unstarted";
      ThreadState[ThreadState["Stopped"] = 16] = "Stopped";
      ThreadState[ThreadState["WaitSleepJoin"] = 32] = "WaitSleepJoin";
      ThreadState[ThreadState["Suspended"] = 64] = "Suspended";
      ThreadState[ThreadState["AbortRequested"] = 128] = "AbortRequested";
      ThreadState[ThreadState["Aborted"] = 256] = "Aborted";
    })(ThreadState = Threading.ThreadState || (Threading.ThreadState = {}));

    var LockRecursionPolicy;

    (function (LockRecursionPolicy) {
      LockRecursionPolicy[LockRecursionPolicy["NoRecursion"] = 0] = "NoRecursion";
      LockRecursionPolicy[LockRecursionPolicy["SupportsRecursion"] = 1] = "SupportsRecursion";
    })(LockRecursionPolicy = Threading.LockRecursionPolicy || (Threading.LockRecursionPolicy = {}));

    var Tasks;

    (function (Tasks) {
      var TaskStatus;

      (function (TaskStatus) {
        TaskStatus[TaskStatus["Created"] = 0] = "Created";
        TaskStatus[TaskStatus["WaitingForActivation"] = 1] = "WaitingForActivation";
        TaskStatus[TaskStatus["WaitingToRun"] = 2] = "WaitingToRun";
        TaskStatus[TaskStatus["Running"] = 3] = "Running";
        TaskStatus[TaskStatus["WaitingForChildrenToComplete"] = 4] = "WaitingForChildrenToComplete";
        TaskStatus[TaskStatus["RanToCompletion"] = 5] = "RanToCompletion";
        TaskStatus[TaskStatus["Canceled"] = 6] = "Canceled";
        TaskStatus[TaskStatus["Faulted"] = 7] = "Faulted";
      })(TaskStatus = Tasks.TaskStatus || (Tasks.TaskStatus = {}));

      var TaskCreationOptions;

      (function (TaskCreationOptions) {
        TaskCreationOptions[TaskCreationOptions["None"] = 0] = "None";
        TaskCreationOptions[TaskCreationOptions["PreferFairness"] = 1] = "PreferFairness";
        TaskCreationOptions[TaskCreationOptions["LongRunning"] = 2] = "LongRunning";
        TaskCreationOptions[TaskCreationOptions["AttachedToParent"] = 4] = "AttachedToParent";
        TaskCreationOptions[TaskCreationOptions["DenyChildAttach"] = 8] = "DenyChildAttach";
        TaskCreationOptions[TaskCreationOptions["HideScheduler"] = 16] = "HideScheduler";
        TaskCreationOptions[TaskCreationOptions["RunContinuationsAsynchronously"] = 64] = "RunContinuationsAsynchronously";
      })(TaskCreationOptions = Tasks.TaskCreationOptions || (Tasks.TaskCreationOptions = {}));

      var TaskContinuationOptions;

      (function (TaskContinuationOptions) {
        TaskContinuationOptions[TaskContinuationOptions["None"] = 0] = "None";
        TaskContinuationOptions[TaskContinuationOptions["PreferFairness"] = 1] = "PreferFairness";
        TaskContinuationOptions[TaskContinuationOptions["LongRunning"] = 2] = "LongRunning";
        TaskContinuationOptions[TaskContinuationOptions["AttachedToParent"] = 4] = "AttachedToParent";
        TaskContinuationOptions[TaskContinuationOptions["DenyChildAttach"] = 8] = "DenyChildAttach";
        TaskContinuationOptions[TaskContinuationOptions["HideScheduler"] = 16] = "HideScheduler";
        TaskContinuationOptions[TaskContinuationOptions["LazyCancellation"] = 32] = "LazyCancellation";
        TaskContinuationOptions[TaskContinuationOptions["RunContinuationsAsynchronously"] = 64] = "RunContinuationsAsynchronously";
        TaskContinuationOptions[TaskContinuationOptions["NotOnRanToCompletion"] = 65536] = "NotOnRanToCompletion";
        TaskContinuationOptions[TaskContinuationOptions["NotOnFaulted"] = 131072] = "NotOnFaulted";
        TaskContinuationOptions[TaskContinuationOptions["NotOnCanceled"] = 262144] = "NotOnCanceled";
        TaskContinuationOptions[TaskContinuationOptions["OnlyOnRanToCompletion"] = 393216] = "OnlyOnRanToCompletion";
        TaskContinuationOptions[TaskContinuationOptions["OnlyOnFaulted"] = 327680] = "OnlyOnFaulted";
        TaskContinuationOptions[TaskContinuationOptions["OnlyOnCanceled"] = 196608] = "OnlyOnCanceled";
        TaskContinuationOptions[TaskContinuationOptions["ExecuteSynchronously"] = 524288] = "ExecuteSynchronously";
      })(TaskContinuationOptions = Tasks.TaskContinuationOptions || (Tasks.TaskContinuationOptions = {}));
    })(Tasks = Threading.Tasks || (Threading.Tasks = {}));
  })(Threading = System.Threading || (System.Threading = {}));

  var Timers;

  (function (Timers) {})(Timers = System.Timers || (System.Timers = {}));

  var Web;

  (function (Web) {
    var AspNetHostingPermissionLevel;

    (function (AspNetHostingPermissionLevel) {
      AspNetHostingPermissionLevel[AspNetHostingPermissionLevel["None"] = 100] = "None";
      AspNetHostingPermissionLevel[AspNetHostingPermissionLevel["Minimal"] = 200] = "Minimal";
      AspNetHostingPermissionLevel[AspNetHostingPermissionLevel["Low"] = 300] = "Low";
      AspNetHostingPermissionLevel[AspNetHostingPermissionLevel["Medium"] = 400] = "Medium";
      AspNetHostingPermissionLevel[AspNetHostingPermissionLevel["High"] = 500] = "High";
      AspNetHostingPermissionLevel[AspNetHostingPermissionLevel["Unrestricted"] = 600] = "Unrestricted";
    })(AspNetHostingPermissionLevel = Web.AspNetHostingPermissionLevel || (Web.AspNetHostingPermissionLevel = {}));
  })(Web = System.Web || (System.Web = {}));
})(System || (System = {}));
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/generated/index.js




;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/editor/components.js
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
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/models/editor/index.js



;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/editor.js









// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(359);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[1]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[6].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[6].use[3]!./src/index.module.scss
var index_module = __webpack_require__(637);
;// CONCATENATED MODULE: ./src/index.module.scss

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(index_module/* default */.Z, options);



/* harmony default export */ const src_index_module = (index_module/* default.locals */.Z.locals || {});
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(114);
;// CONCATENATED MODULE: ./src/app.tsx
function App(){var _useState=(0,react.useState)(0),_useState2=_slicedToArray(_useState,2),ct=_useState2[0],setCt=_useState2[1];var a=5;(0,react.useEffect)(function(){setInterval(function(){return setCt(function(x){return x+1;});},1000);},[setCt]);var ongui=function ongui(){if(UnityEngine.GUILayout.Button("I am a button",UnityEngine.GUILayout.Width(150))){console.log("You clicked the button!");}var startPoint=new UnityEngine.Vector3(-0.0,0.0,0.0);var endPoint=new UnityEngine.Vector3(50.0,50.0,0.0);UnityEditor.Handles.color=UnityEngine.Color.black;UnityEditor.Handles.DrawLine(startPoint,endPoint,5);};return/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{style:{flexGrow:1},children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("toolbar",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("tb-button",{children:"Button"}),/*#__PURE__*/(0,jsx_runtime.jsx)("tb-popupsearch",{}),/*#__PURE__*/(0,jsx_runtime.jsx)("tb-toggle",{children:"Toggle"}),/*#__PURE__*/(0,jsx_runtime.jsx)("tb-breadcrumbs",{children:"My bread crumbs"})]}),"Hello world",/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{onClick:function onClick(){return console.log('Clickff');},onContextClick:function onContextClick(){return console.log('Context click');},onFocus:function onFocus(){return console.log('Selected');},onBlur:function onBlur(){return console.log('Deselected');},focusable:true,children:["My name is ",ct,"A good framework"]}),/*#__PURE__*/(0,jsx_runtime.jsx)("imgui",{onGUI:ongui})]});};Renderer.render(/*#__PURE__*/(0,jsx_runtime.jsx)(App,{}));
;// CONCATENATED MODULE: ./src/index.ts
/* module decorator */ module = __webpack_require__.hmd(module);
var _module,_module$hot;(_module=module)===null||_module===void 0?void 0:(_module$hot=_module.hot)===null||_module$hot===void 0?void 0:_module$hot.accept();

/***/ }),

/***/ 489:
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

/***/ 625:
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

/***/ 314:
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

  var aa = __webpack_require__(625),
      ba = __webpack_require__(359),
      m = __webpack_require__(22);

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

/***/ 84:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(314);
} else {}

/***/ }),

/***/ 93:
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


__webpack_require__(625);

var f = __webpack_require__(359),
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

/***/ 357:
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


var l = __webpack_require__(625),
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

/***/ 359:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(357);
} else {}

/***/ }),

/***/ 114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(93);
} else {}

/***/ }),

/***/ 822:
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

/***/ 22:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(822);
} else {}

/***/ }),

/***/ 637:
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
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(310);
/******/ 	
/******/ })()
;