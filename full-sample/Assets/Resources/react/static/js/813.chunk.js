"use strict";
(self["webpackChunkreactunity_sample"] = self["webpackChunkreactunity_sample"] || []).push([[813],{

/***/ 4862:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ut": () => (/* binding */ GlobalsProvider),
/* harmony export */   "kO": () => (/* binding */ useGlobals)
/* harmony export */ });
/* unused harmony exports createDictionaryWatcher, globalsWatcher */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3792);
/* harmony import */ var use_sync_external_store_shim__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6198);
/* harmony import */ var use_sync_external_store_with_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9113);
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
  var ctx = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
  if (displayName) ctx.displayName = displayName;

  var snapshot = __assign({}, dictionary);

  var subscribe = function subscribe(onStoreChange) {
    snapshot = __assign({}, dictionary);
    var remove = dictionary === null || dictionary === void 0 ? void 0 : dictionary.AddListener(function (key, value, dic) {
      snapshot = __assign({}, dictionary);
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
    var value = (0,use_sync_external_store_shim__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ctx.Provider, {
      value: value
    }, children);
  };

  function useSelector(selector) {
    return (0,use_sync_external_store_with_selector__WEBPACK_IMPORTED_MODULE_2__.useSyncExternalStoreWithSelector)(subscribe, getSnapshot, getSnapshot, selector);
  }

  function useDictionaryContext() {
    var context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ctx);

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

/***/ }),

/***/ 3002:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Th": () => (/* binding */ Renderer)
});

// UNUSED EXPORTS: batchedUpdates, flushSync

// EXTERNAL MODULE: ../../node_modules/react/index.js
var react = __webpack_require__(3792);
// EXTERNAL MODULE: ../../node_modules/react-reconciler/constants.js
var constants = __webpack_require__(2014);
;// CONCATENATED MODULE: ../../renderer/dist/src/version.js
var version = '0.10.0';
// EXTERNAL MODULE: ../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4790);
// EXTERNAL MODULE: ../../renderer/dist/src/helpers/dictionary-watcher.js
var dictionary_watcher = __webpack_require__(4862);
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
        })), (0,jsx_runtime.jsx)("view", {
          children: ((_b = this.state.error) === null || _b === void 0 ? void 0 : _b.stack) || ''
        })]
      }));
    }

    return this.props.children;
  };

  return ErrorBoundary;
}(react.Component);


;// CONCATENATED MODULE: ../../renderer/dist/src/views/default-view.js



function DefaultView(_a) {
  var children = _a.children,
      withHelpers = _a.withHelpers;
  return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: !withHelpers ? children : (0,jsx_runtime.jsx)(ErrorBoundary, {
      children: (0,jsx_runtime.jsx)(dictionary_watcher/* GlobalsProvider */.Ut, {
        children: children
      })
    })
  });
}
;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/async/objects.js
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


// EXTERNAL MODULE: ../../node_modules/react-reconciler/index.js
var react_reconciler = __webpack_require__(3630);
;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/diffing.js
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
        prop = diffProperties(lastProps[propKey], null, depth - 1);
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
;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/constants.js
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
      rest = __rest(props, ["children", "tag"]);

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
;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/async/callbacks.js
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

      if ('Length' in args) {
        var newArgs = [];
        var length = args['Length'];

        for (var index = 0; index < length; index++) {
          var element = args[index];
          newArgs.push(element);
        }

        args = newArgs;
      }

      return cb.apply(null, args);
    };

    return _this;
  }

  return CallbacksRepo;
}(ObjectsRepo);


;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/async/reconciler.js
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
var callbacks = new CallbacksRepo();
var objects = new ObjectsRepo(); // Separates properties in 3 categories: regular props, callbacks and non-serializable objects

function partitionProps(props) {
  var res = {};

  for (var key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      var value = props[key];

      if (value == null) {
        (res.p || (res.p = {}))[key] = null;
      } else if (key === 'style') {
        (res.p || (res.p = {}))[key] = partitionProps(value);
      } else if (typeof value === 'function') {
        var ind = callbacks.addObject(value);
        (res.e || (res.e = {}))[key] = ind;
      } else if (typeof value === 'object') {
        var ind = objects.addObject(value);
        (res.o || (res.o = {}))[key] = ind;
      } else {
        (res.p || (res.p = {}))[key] = value;
      }
    }
  }

  return res;
}

var ctxMap = new Map();

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
      return callbacks.call(ind, args);
    };

    var getObjectRef = function getObjectRef(ind) {
      return objects.getObject(ind);
    };

    var getEventAsObjectRef = function getEventAsObjectRef(ind) {
      return callbacks.getObject(ind);
    };

    context.BindCommands(flushCommands, fireEventByRef, getObjectRef, getEventAsObjectRef);
    var ctx = {
      context: context,
      commands: commands
    };
    ctxMap.set(context, ctx);
    return ctx;
  },
  getChildHostContext: function getChildHostContext(parentCtx) {
    return parentCtx;
  },
  getPublicInstance: function getPublicInstance(instance) {
    return instance.context.GetRef(instance.refId, instance.commands.length > 0);
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
    refId++;
    var aProps = getAllowedProps(props, type);
    ctx.commands.push(['c', reconciler_assign({
      t: type,
      r: refId
    }, partitionProps(aProps))]);
    if (rootContainer.fiberCache) rootContainer.fiberCache.setObject(refId, internalHandle);
    return reconciler_assign(reconciler_assign({}, ctx), {
      refId: refId
    });
  },
  createTextInstance: function createTextInstance(text, rootContainer, ctx, internalHandle) {
    refId++;
    ctx.commands.push(['t', {
      r: refId,
      c: text
    }]);
    if (rootContainer.fiberCache) rootContainer.fiberCache.setObject(refId, internalHandle);
    return reconciler_assign(reconciler_assign({}, ctx), {
      refId: refId
    });
  },
  appendInitialChild: function appendInitialChild(parent, child) {
    parent.commands.push(['a', {
      p: parent.refId,
      c: child.refId
    }]);
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
    instance.commands.push(['u', reconciler_assign({
      r: instance.refId,
      t: type
    }, partitionProps(props))]);
  },
  commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
    textInstance.commands.push(['x', {
      r: textInstance.refId,
      c: newText
    }]);
  },
  appendChild: function appendChild(parent, child) {
    child.commands.push(['a', {
      p: parent.refId,
      c: child.refId
    }]);
  },
  appendChildToContainer: function appendChildToContainer(parent, child) {
    child.commands.push(['a', {
      p: parent.refId,
      c: child.refId
    }]);
  },
  insertBefore: function insertBefore(parent, child, beforeChild) {
    child.commands.push(['i', {
      p: parent.refId,
      c: child.refId,
      i: beforeChild.refId
    }]);
  },
  insertInContainerBefore: function insertInContainerBefore(parent, child, beforeChild) {
    child.commands.push(['i', {
      p: parent.refId,
      c: child.refId,
      i: beforeChild.refId
    }]);
  },
  removeChild: function removeChild(parent, child) {
    child.commands.push(['r', {
      p: parent.refId,
      c: child.refId
    }]);
  },
  removeChildFromContainer: function removeChildFromContainer(parent, child) {
    child.commands.push(['r', {
      p: parent.refId,
      c: child.refId
    }]);
  },
  resetTextContent: function resetTextContent() {},
  preparePortalMount: function preparePortalMount() {},
  detachDeletedInstance: function detachDeletedInstance() {},
  // Required for Suspense
  hideInstance: function hideInstance(instance) {
    instance.commands.push(['h', {
      r: instance.refId,
      h: true
    }]);
  },
  hideTextInstance: function hideTextInstance(instance) {
    instance.commands.push(['h', {
      r: instance.refId,
      h: true
    }]);
  },
  unhideInstance: function unhideInstance(instance) {
    instance.commands.push(['h', {
      r: instance.refId,
      h: false
    }]);
  },
  unhideTextInstance: function unhideTextInstance(instance) {
    instance.commands.push(['h', {
      r: instance.refId,
      h: false
    }]);
  }
});

var asyncReconciler = react_reconciler(hostConfig);
;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/sync/reconciler.js
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
;// CONCATENATED MODULE: ../../renderer/dist/src/renderer/renderer.js








var containerMap = new Map();
var Renderer = {
  render: function render(element, options) {
    if (options === void 0) {
      options = {};
    }

    var hostContainer = (options === null || options === void 0 ? void 0 : options.hostContainer) || HostContainer; // For Jint engine, sync is default
    // For other engines (ClearScript), async is default

    var isAsync = hostContainer.Context.Script.Engine.Key === 'jint' ? (options === null || options === void 0 ? void 0 : options.sync) === false : !(options === null || options === void 0 ? void 0 : options.sync);

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
            Promise.resolve().then(function () {
              asyncJobCallback();
              scheduled_1 = false;
            });
          }

          return Array.prototype.push.apply(commands_1, args);
        };

        var hostContainerInstance = {
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
var isSyncByDefault = HostContainer.Context.Script.Engine.Key === 'jint';
var defaultReconciler = isSyncByDefault ? syncReconciler : asyncReconciler;
var batchedUpdates = defaultReconciler.batchedUpdates;
var flushSync = defaultReconciler.flushSync;

/***/ }),

/***/ 7312:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAcElEQVR4AezOsREAIAjFUAs3dgAGYkj8C3g2oBTJXfo3iD419dJ2eOn5EuM6LnsFynQkb4AKQP2zlBOLpAEBAgQIECBAgAA1Au29p6aDrlPBQd3UdJA7yIcUho4KA5UBBxDHk9GwzwdiGQY6gVEwCgC3bcAZ+oXojwAAAABJRU5ErkJggg==\n");

/***/ }),

/***/ 5878:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/media/bg.png";

/***/ })

}]);