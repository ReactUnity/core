/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
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
  };

  // import a list of modules into the list
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

/***/ "../node_modules/css-loader/dist/runtime/noSourceMaps.js":
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "../node_modules/regenerator-runtime/runtime.js":
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };
  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }
        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }
    var previousPromise;
    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }
  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };
  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }
      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }
      context.method = method;
      context.arg = arg;
      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }
          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }
        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
          if (record.arg === ContinueSentinel) {
            continue;
          }
          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;
      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);
          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }
        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }
    var info = record.arg;
    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }
    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function () {
    return this;
  });
  define(Gp, "toString", function () {
    return "[object Generator]";
  });
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    if (1 in locs) {
      entry.catchLoc = locs[1];
    }
    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }
    this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }
  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }
  exports.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }
      if (typeof iterable.next === "function") {
        return iterable;
      }
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
            next.value = undefined;
            next.done = true;
            return next;
          };
        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return {
      next: doneResult
    };
  }
  exports.values = values;
  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }
  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);
      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }
      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }
        return !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;
        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }
      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;
      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }
      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }
      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };
      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }
      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;
}(
// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : 0);
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "../node_modules/scheduler/cjs/scheduler.production.min.js":
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

/***/ "../node_modules/scheduler/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("../node_modules/scheduler/cjs/scheduler.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/react-reconciler/cjs/react-reconciler-constants.production.min.js":
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

/***/ "./node_modules/react-reconciler/cjs/react-reconciler.production.min.js":
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
  var aa = __webpack_require__("./node_modules/react/index.js"),
    ba = __webpack_require__("../node_modules/scheduler/index.js"),
    ca = Object.assign;
  function m(a) {
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
    if (wa(a) !== a) throw Error(m(188));
  }
  function ya(a) {
    var b = a.alternate;
    if (!b) {
      b = wa(a);
      if (null === b) throw Error(m(188));
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
        throw Error(m(188));
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
          if (!g) throw Error(m(189));
        }
      }
      if (c.alternate !== d) throw Error(m(190));
    }
    if (3 !== c.tag) throw Error(m(188));
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
    Lb = $$$hostConfig.getSuspenseInstanceFallbackErrorDetails,
    Mb = $$$hostConfig.registerSuspenseInstanceRetry,
    Nb = $$$hostConfig.getNextHydratableSibling,
    Ob = $$$hostConfig.getFirstHydratableChild,
    Pb = $$$hostConfig.getFirstHydratableChildWithinContainer,
    Qb = $$$hostConfig.getFirstHydratableChildWithinSuspenseInstance,
    Rb = $$$hostConfig.hydrateInstance,
    Sb = $$$hostConfig.hydrateTextInstance,
    Tb = $$$hostConfig.hydrateSuspenseInstance,
    Ub = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,
    Vb = $$$hostConfig.commitHydratedContainer,
    Wb = $$$hostConfig.commitHydratedSuspenseInstance,
    Xb = $$$hostConfig.clearSuspenseBoundary,
    Yb = $$$hostConfig.clearSuspenseBoundaryFromContainer,
    Zb = $$$hostConfig.shouldDeleteUnhydratedTailInstances,
    $b = $$$hostConfig.didNotMatchHydratedContainerTextInstance,
    ac = $$$hostConfig.didNotMatchHydratedTextInstance,
    bc;
  function cc(a) {
    if (void 0 === bc) try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      bc = b && b[1] || "";
    }
    return "\n" + bc + a;
  }
  var dc = !1;
  function ec(a, b) {
    if (!a || dc) return "";
    dc = !0;
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
      dc = !1, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? cc(a) : "";
  }
  var fc = Object.prototype.hasOwnProperty,
    gc = [],
    hc = -1;
  function ic(a) {
    return {
      current: a
    };
  }
  function q(a) {
    0 > hc || (a.current = gc[hc], gc[hc] = null, hc--);
  }
  function v(a, b) {
    hc++;
    gc[hc] = a.current;
    a.current = b;
  }
  var jc = {},
    x = ic(jc),
    z = ic(!1),
    kc = jc;
  function lc(a, b) {
    var c = a.type.contextTypes;
    if (!c) return jc;
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
  function mc() {
    q(z);
    q(x);
  }
  function nc(a, b, c) {
    if (x.current !== jc) throw Error(m(168));
    v(x, b);
    v(z, c);
  }
  function oc(a, b, c) {
    var d = a.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();
    for (var e in d) {
      if (!(e in b)) throw Error(m(108, va(a) || "Unknown", e));
    }
    return ca({}, c, d);
  }
  function pc(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || jc;
    kc = x.current;
    v(x, a);
    v(z, z.current);
    return !0;
  }
  function rc(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(m(169));
    c ? (a = oc(a, b, kc), d.__reactInternalMemoizedMergedChildContext = a, q(z), q(x), v(x, a)) : q(z);
    v(z, c);
  }
  var tc = Math.clz32 ? Math.clz32 : sc,
    uc = Math.log,
    vc = Math.LN2;
  function sc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (uc(a) / vc | 0) | 0;
  }
  var wc = 64,
    xc = 4194304;
  function yc(a) {
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
  function zc(a, b) {
    var c = a.pendingLanes;
    if (0 === c) return 0;
    var d = 0,
      e = a.suspendedLanes,
      f = a.pingedLanes,
      g = c & 268435455;
    if (0 !== g) {
      var h = g & ~e;
      0 !== h ? d = yc(h) : (f &= g, 0 !== f && (d = yc(f)));
    } else g = c & ~e, 0 !== g ? d = yc(g) : 0 !== f && (d = yc(f));
    if (0 === d) return 0;
    if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
    0 !== (d & 4) && (d |= c & 16);
    b = a.entangledLanes;
    if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) {
      c = 31 - tc(b), e = 1 << c, d |= a[c], b &= ~e;
    }
    return d;
  }
  function Ac(a, b) {
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
  function Bc(a, b) {
    for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f;) {
      var g = 31 - tc(f),
        h = 1 << g,
        k = e[g];
      if (-1 === k) {
        if (0 === (h & c) || 0 !== (h & d)) e[g] = Ac(h, b);
      } else k <= b && (a.expiredLanes |= h);
      f &= ~h;
    }
  }
  function Cc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function Dc() {
    var a = wc;
    wc <<= 1;
    0 === (wc & 4194240) && (wc = 64);
    return a;
  }
  function Ec(a) {
    for (var b = [], c = 0; 31 > c; c++) {
      b.push(a);
    }
    return b;
  }
  function Fc(a, b, c) {
    a.pendingLanes |= b;
    536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
    a = a.eventTimes;
    b = 31 - tc(b);
    a[b] = c;
  }
  function Gc(a, b) {
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
      var e = 31 - tc(c),
        f = 1 << e;
      b[e] = 0;
      d[e] = -1;
      a[e] = -1;
      c &= ~f;
    }
  }
  function Hc(a, b) {
    var c = a.entangledLanes |= b;
    for (a = a.entanglements; c;) {
      var d = 31 - tc(c),
        e = 1 << d;
      e & b | a[d] & b && (a[d] |= b);
      c &= ~e;
    }
  }
  var C = 0;
  function Ic(a) {
    a &= -a;
    return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Jc = ba.unstable_scheduleCallback,
    Kc = ba.unstable_cancelCallback,
    Lc = ba.unstable_shouldYield,
    Mc = ba.unstable_requestPaint,
    D = ba.unstable_now,
    Nc = ba.unstable_ImmediatePriority,
    Oc = ba.unstable_UserBlockingPriority,
    Pc = ba.unstable_NormalPriority,
    Qc = ba.unstable_IdlePriority,
    Rc = null,
    Sc = null;
  function Tc(a) {
    if (Sc && "function" === typeof Sc.onCommitFiberRoot) try {
      Sc.onCommitFiberRoot(Rc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {}
  }
  function Uc(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var Vc = "function" === typeof Object.is ? Object.is : Uc,
    Wc = null,
    Xc = !1,
    Yc = !1;
  function Zc(a) {
    null === Wc ? Wc = [a] : Wc.push(a);
  }
  function $c(a) {
    Xc = !0;
    Zc(a);
  }
  function ad() {
    if (!Yc && null !== Wc) {
      Yc = !0;
      var a = 0,
        b = C;
      try {
        var c = Wc;
        for (C = 1; a < c.length; a++) {
          var d = c[a];
          do {
            d = d(!0);
          } while (null !== d);
        }
        Wc = null;
        Xc = !1;
      } catch (e) {
        throw null !== Wc && (Wc = Wc.slice(a + 1)), Jc(Nc, ad), e;
      } finally {
        C = b, Yc = !1;
      }
    }
    return null;
  }
  var bd = [],
    cd = 0,
    dd = null,
    ed = 0,
    fd = [],
    gd = 0,
    hd = null,
    id = 1,
    jd = "";
  function kd(a, b) {
    bd[cd++] = ed;
    bd[cd++] = dd;
    dd = a;
    ed = b;
  }
  function ld(a, b, c) {
    fd[gd++] = id;
    fd[gd++] = jd;
    fd[gd++] = hd;
    hd = a;
    var d = id;
    a = jd;
    var e = 32 - tc(d) - 1;
    d &= ~(1 << e);
    c += 1;
    var f = 32 - tc(b) + e;
    if (30 < f) {
      var g = e - e % 5;
      f = (d & (1 << g) - 1).toString(32);
      d >>= g;
      e -= g;
      id = 1 << 32 - tc(b) + e | c << e | d;
      jd = f + a;
    } else id = 1 << f | c << e | d, jd = a;
  }
  function md(a) {
    null !== a["return"] && (kd(a, 1), ld(a, 1, 0));
  }
  function nd(a) {
    for (; a === dd;) {
      dd = bd[--cd], bd[cd] = null, ed = bd[--cd], bd[cd] = null;
    }
    for (; a === hd;) {
      hd = fd[--gd], fd[gd] = null, jd = fd[--gd], fd[gd] = null, id = fd[--gd], fd[gd] = null;
    }
  }
  var od = null,
    pd = null,
    F = !1,
    qd = !1,
    rd = null;
  function sd(a, b) {
    var c = td(5, null, null, 0);
    c.elementType = "DELETED";
    c.stateNode = b;
    c["return"] = a;
    b = a.deletions;
    null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
  }
  function ud(a, b) {
    switch (a.tag) {
      case 5:
        return b = Gb(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, od = a, pd = Ob(b), !0) : !1;
      case 6:
        return b = Hb(b, a.pendingProps), null !== b ? (a.stateNode = b, od = a, pd = null, !0) : !1;
      case 13:
        b = Ib(b);
        if (null !== b) {
          var c = null !== hd ? {
            id: id,
            overflow: jd
          } : null;
          a.memoizedState = {
            dehydrated: b,
            treeContext: c,
            retryLane: 1073741824
          };
          c = td(18, null, null, 0);
          c.stateNode = b;
          c["return"] = a;
          a.child = c;
          od = a;
          pd = null;
          return !0;
        }
        return !1;
      default:
        return !1;
    }
  }
  function vd(a) {
    return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
  }
  function wd(a) {
    if (F) {
      var b = pd;
      if (b) {
        var c = b;
        if (!ud(a, b)) {
          if (vd(a)) throw Error(m(418));
          b = Nb(c);
          var d = od;
          b && ud(a, b) ? sd(d, c) : (a.flags = a.flags & -4097 | 2, F = !1, od = a);
        }
      } else {
        if (vd(a)) throw Error(m(418));
        a.flags = a.flags & -4097 | 2;
        F = !1;
        od = a;
      }
    }
  }
  function xd(a) {
    for (a = a["return"]; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) {
      a = a["return"];
    }
    od = a;
  }
  function yd(a) {
    if (!Va || a !== od) return !1;
    if (!F) return xd(a), F = !0, !1;
    if (3 !== a.tag && (5 !== a.tag || Zb(a.type) && !Na(a.type, a.memoizedProps))) {
      var b = pd;
      if (b) {
        if (vd(a)) throw zd(), Error(m(418));
        for (; b;) {
          sd(a, b), b = Nb(b);
        }
      }
    }
    xd(a);
    if (13 === a.tag) {
      if (!Va) throw Error(m(316));
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(m(317));
      pd = Ub(a);
    } else pd = od ? Nb(a.stateNode) : null;
    return !0;
  }
  function zd() {
    for (var a = pd; a;) {
      a = Nb(a);
    }
  }
  function Ad() {
    Va && (pd = od = null, qd = F = !1);
  }
  function Bd(a) {
    null === rd ? rd = [a] : rd.push(a);
  }
  var Cd = da.ReactCurrentBatchConfig;
  function Dd(a, b) {
    if (Vc(a, b)) return !0;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
    var c = Object.keys(a),
      d = Object.keys(b);
    if (c.length !== d.length) return !1;
    for (d = 0; d < c.length; d++) {
      var e = c[d];
      if (!fc.call(b, e) || !Vc(a[e], b[e])) return !1;
    }
    return !0;
  }
  function Ed(a) {
    switch (a.tag) {
      case 5:
        return cc(a.type);
      case 16:
        return cc("Lazy");
      case 13:
        return cc("Suspense");
      case 19:
        return cc("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = ec(a.type, !1), a;
      case 11:
        return a = ec(a.type.render, !1), a;
      case 1:
        return a = ec(a.type, !0), a;
      default:
        return "";
    }
  }
  function Fd(a, b) {
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
  var Gd = ic(null),
    Hd = null,
    Id = null,
    Jd = null;
  function Kd() {
    Jd = Id = Hd = null;
  }
  function Ld(a, b, c) {
    Sa ? (v(Gd, b._currentValue), b._currentValue = c) : (v(Gd, b._currentValue2), b._currentValue2 = c);
  }
  function Md(a) {
    var b = Gd.current;
    q(Gd);
    Sa ? a._currentValue = b : a._currentValue2 = b;
  }
  function Nd(a, b, c) {
    for (; null !== a;) {
      var d = a.alternate;
      (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
      if (a === c) break;
      a = a["return"];
    }
  }
  function Od(a, b) {
    Hd = a;
    Jd = Id = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (G = !0), a.firstContext = null);
  }
  function Pd(a) {
    var b = Sa ? a._currentValue : a._currentValue2;
    if (Jd !== a) if (a = {
      context: a,
      memoizedValue: b,
      next: null
    }, null === Id) {
      if (null === Hd) throw Error(m(308));
      Id = a;
      Hd.dependencies = {
        lanes: 0,
        firstContext: a
      };
    } else Id = Id.next = a;
    return b;
  }
  var Qd = null;
  function Rd(a) {
    null === Qd ? Qd = [a] : Qd.push(a);
  }
  function Sd(a, b, c, d) {
    var e = b.interleaved;
    null === e ? (c.next = c, Rd(b)) : (c.next = e.next, e.next = c);
    b.interleaved = c;
    return Td(a, d);
  }
  function Td(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;
    for (a = a["return"]; null !== a;) {
      a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a["return"];
    }
    return 3 === c.tag ? c.stateNode : null;
  }
  var Ud = !1;
  function Vd(a) {
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
  function Wd(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = {
      baseState: a.baseState,
      firstBaseUpdate: a.firstBaseUpdate,
      lastBaseUpdate: a.lastBaseUpdate,
      shared: a.shared,
      effects: a.effects
    });
  }
  function Xd(a, b) {
    return {
      eventTime: a,
      lane: b,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function Yd(a, b, c) {
    var d = a.updateQueue;
    if (null === d) return null;
    d = d.shared;
    if (0 !== (H & 2)) {
      var e = d.pending;
      null === e ? b.next = b : (b.next = e.next, e.next = b);
      d.pending = b;
      return Td(a, c);
    }
    e = d.interleaved;
    null === e ? (b.next = b, Rd(d)) : (b.next = e.next, e.next = b);
    d.interleaved = b;
    return Td(a, c);
  }
  function Zd(a, b, c) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Hc(a, c);
    }
  }
  function $d(a, b) {
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
  function ae(a, b, c, d) {
    var e = a.updateQueue;
    Ud = !1;
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
      null !== n && (n = n.updateQueue, h = n.lastBaseUpdate, h !== g && (null === h ? n.firstBaseUpdate = l : h.next = l, n.lastBaseUpdate = k));
    }
    if (null !== f) {
      var t = e.baseState;
      g = 0;
      n = l = k = null;
      h = f;
      do {
        var p = h.lane,
          B = h.eventTime;
        if ((d & p) === p) {
          null !== n && (n = n.next = {
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
            p = b;
            B = c;
            switch (Z.tag) {
              case 1:
                w = Z.payload;
                if ("function" === typeof w) {
                  t = w.call(B, t, p);
                  break a;
                }
                t = w;
                break a;
              case 3:
                w.flags = w.flags & -65537 | 128;
              case 0:
                w = Z.payload;
                p = "function" === typeof w ? w.call(B, t, p) : w;
                if (null === p || void 0 === p) break a;
                t = ca({}, t, p);
                break a;
              case 2:
                Ud = !0;
            }
          }
          null !== h.callback && 0 !== h.lane && (a.flags |= 64, p = e.effects, null === p ? e.effects = [h] : p.push(h));
        } else B = {
          eventTime: B,
          lane: p,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        }, null === n ? (l = n = B, k = t) : n = n.next = B, g |= p;
        h = h.next;
        if (null === h) if (h = e.shared.pending, null === h) break;else p = h, h = p.next, p.next = null, e.lastBaseUpdate = p, e.shared.pending = null;
      } while (1);
      null === n && (k = t);
      e.baseState = k;
      e.firstBaseUpdate = l;
      e.lastBaseUpdate = n;
      b = e.shared.interleaved;
      if (null !== b) {
        e = b;
        do {
          g |= e.lane, e = e.next;
        } while (e !== b);
      } else null === f && (e.shared.lanes = 0);
      be |= g;
      a.lanes = g;
      a.memoizedState = t;
    }
  }
  function ce(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a) for (b = 0; b < a.length; b++) {
      var d = a[b],
        e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e) throw Error(m(191, e));
        e.call(d);
      }
    }
  }
  var de = new aa.Component().refs;
  function ee(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : ca({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }
  var he = {
    isMounted: function isMounted(a) {
      return (a = a._reactInternals) ? wa(a) === a : !1;
    },
    enqueueSetState: function enqueueSetState(a, b, c) {
      a = a._reactInternals;
      var d = I(),
        e = fe(a),
        f = Xd(d, e);
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      b = Yd(a, f, e);
      null !== b && (ge(b, a, e, d), Zd(b, a, e));
    },
    enqueueReplaceState: function enqueueReplaceState(a, b, c) {
      a = a._reactInternals;
      var d = I(),
        e = fe(a),
        f = Xd(d, e);
      f.tag = 1;
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      b = Yd(a, f, e);
      null !== b && (ge(b, a, e, d), Zd(b, a, e));
    },
    enqueueForceUpdate: function enqueueForceUpdate(a, b) {
      a = a._reactInternals;
      var c = I(),
        d = fe(a),
        e = Xd(c, d);
      e.tag = 2;
      void 0 !== b && null !== b && (e.callback = b);
      b = Yd(a, e, d);
      null !== b && (ge(b, a, d, c), Zd(b, a, d));
    }
  };
  function ie(a, b, c, d, e, f, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Dd(c, d) || !Dd(e, f) : !0;
  }
  function je(a, b, c) {
    var d = !1,
      e = jc;
    var f = b.contextType;
    "object" === typeof f && null !== f ? f = Pd(f) : (e = A(b) ? kc : x.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? lc(a, e) : jc);
    b = new b(c, f);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = he;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
    return b;
  }
  function ke(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && he.enqueueReplaceState(b, b.state, null);
  }
  function le(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = de;
    Vd(a);
    var f = b.contextType;
    "object" === typeof f && null !== f ? e.context = Pd(f) : (f = A(b) ? kc : x.current, e.context = lc(a, f));
    e.state = a.memoizedState;
    f = b.getDerivedStateFromProps;
    "function" === typeof f && (ee(a, b, f, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && he.enqueueReplaceState(e, e.state, null), ae(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4194308);
  }
  function me(a, b, c) {
    a = c.ref;
    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;
        if (c) {
          if (1 !== c.tag) throw Error(m(309));
          var d = c.stateNode;
        }
        if (!d) throw Error(m(147, a));
        var e = d,
          f = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
        b = function b(a) {
          var b = e.refs;
          b === de && (b = e.refs = {});
          null === a ? delete b[f] : b[f] = a;
        };
        b._stringRef = f;
        return b;
      }
      if ("string" !== typeof a) throw Error(m(284));
      if (!c._owner) throw Error(m(290, a));
    }
    return a;
  }
  function ne(a, b) {
    a = Object.prototype.toString.call(b);
    throw Error(m(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
  }
  function oe(a) {
    var b = a._init;
    return b(a._payload);
  }
  function pe(a) {
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
      a = qe(a, b);
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
      if (null === b || 6 !== b.tag) return b = re(c, a.mode, d), b["return"] = a, b;
      b = e(b, c);
      b["return"] = a;
      return b;
    }
    function k(a, b, c, d) {
      var f = c.type;
      if (f === ha) return n(a, b, c.props.children, d, c.key);
      if (null !== b && (b.elementType === f || "object" === typeof f && null !== f && f.$$typeof === qa && oe(f) === b.type)) return d = e(b, c.props), d.ref = me(a, b, c), d["return"] = a, d;
      d = se(c.type, c.key, c.props, null, a.mode, d);
      d.ref = me(a, b, c);
      d["return"] = a;
      return d;
    }
    function l(a, b, c, d) {
      if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = te(c, a.mode, d), b["return"] = a, b;
      b = e(b, c.children || []);
      b["return"] = a;
      return b;
    }
    function n(a, b, c, d, f) {
      if (null === b || 7 !== b.tag) return b = ue(c, a.mode, d, f), b["return"] = a, b;
      b = e(b, c);
      b["return"] = a;
      return b;
    }
    function t(a, b, c) {
      if ("string" === typeof b && "" !== b || "number" === typeof b) return b = re("" + b, a.mode, c), b["return"] = a, b;
      if ("object" === typeof b && null !== b) {
        switch (b.$$typeof) {
          case ea:
            return c = se(b.type, b.key, b.props, null, a.mode, c), c.ref = me(a, null, b), c["return"] = a, c;
          case fa:
            return b = te(b, a.mode, c), b["return"] = a, b;
          case qa:
            var d = b._init;
            return t(a, d(b._payload), c);
        }
        if (Da(b) || ta(b)) return b = ue(b, a.mode, c, null), b["return"] = a, b;
        ne(a, b);
      }
      return null;
    }
    function p(a, b, c, d) {
      var e = null !== b ? b.key : null;
      if ("string" === typeof c && "" !== c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);
      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case ea:
            return c.key === e ? k(a, b, c, d) : null;
          case fa:
            return c.key === e ? l(a, b, c, d) : null;
          case qa:
            return e = c._init, p(a, b, e(c._payload), d);
        }
        if (Da(c) || ta(c)) return null !== e ? null : n(a, b, c, d, null);
        ne(a, c);
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
        if (Da(d) || ta(d)) return a = a.get(c) || null, n(b, a, d, e, null);
        ne(b, d);
      }
      return null;
    }
    function w(e, g, h, k) {
      for (var l = null, n = null, r = g, u = g = 0, E = null; null !== r && u < h.length; u++) {
        r.index > u ? (E = r, r = null) : E = r.sibling;
        var y = p(e, r, h[u], k);
        if (null === y) {
          null === r && (r = E);
          break;
        }
        a && r && null === y.alternate && b(e, r);
        g = f(y, g, u);
        null === n ? l = y : n.sibling = y;
        n = y;
        r = E;
      }
      if (u === h.length) return c(e, r), F && kd(e, u), l;
      if (null === r) {
        for (; u < h.length; u++) {
          r = t(e, h[u], k), null !== r && (g = f(r, g, u), null === n ? l = r : n.sibling = r, n = r);
        }
        F && kd(e, u);
        return l;
      }
      for (r = d(e, r); u < h.length; u++) {
        E = B(r, e, u, h[u], k), null !== E && (a && null !== E.alternate && r["delete"](null === E.key ? u : E.key), g = f(E, g, u), null === n ? l = E : n.sibling = E, n = E);
      }
      a && r.forEach(function (a) {
        return b(e, a);
      });
      F && kd(e, u);
      return l;
    }
    function Z(e, g, h, k) {
      var l = ta(h);
      if ("function" !== typeof l) throw Error(m(150));
      h = l.call(h);
      if (null == h) throw Error(m(151));
      for (var n = l = null, r = g, u = g = 0, E = null, y = h.next(); null !== r && !y.done; u++, y = h.next()) {
        r.index > u ? (E = r, r = null) : E = r.sibling;
        var w = p(e, r, y.value, k);
        if (null === w) {
          null === r && (r = E);
          break;
        }
        a && r && null === w.alternate && b(e, r);
        g = f(w, g, u);
        null === n ? l = w : n.sibling = w;
        n = w;
        r = E;
      }
      if (y.done) return c(e, r), F && kd(e, u), l;
      if (null === r) {
        for (; !y.done; u++, y = h.next()) {
          y = t(e, y.value, k), null !== y && (g = f(y, g, u), null === n ? l = y : n.sibling = y, n = y);
        }
        F && kd(e, u);
        return l;
      }
      for (r = d(e, r); !y.done; u++, y = h.next()) {
        y = B(r, e, u, y.value, k), null !== y && (a && null !== y.alternate && r["delete"](null === y.key ? u : y.key), g = f(y, g, u), null === n ? l = y : n.sibling = y, n = y);
      }
      a && r.forEach(function (a) {
        return b(e, a);
      });
      F && kd(e, u);
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
                  } else if (l.elementType === k || "object" === typeof k && null !== k && k.$$typeof === qa && oe(k) === l.type) {
                    c(a, l.sibling);
                    d = e(l, f.props);
                    d.ref = me(a, l, f);
                    d["return"] = a;
                    a = d;
                    break a;
                  }
                  c(a, l);
                  break;
                } else b(a, l);
                l = l.sibling;
              }
              f.type === ha ? (d = ue(f.props.children, a.mode, h, f.key), d["return"] = a, a = d) : (h = se(f.type, f.key, f.props, null, a.mode, h), h.ref = me(a, d, f), h["return"] = a, a = h);
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
              d = te(f, a.mode, h);
              d["return"] = a;
              a = d;
            }
            return g(a);
          case qa:
            return l = f._init, za(a, d, l(f._payload), h);
        }
        if (Da(f)) return w(a, d, f, h);
        if (ta(f)) return Z(a, d, f, h);
        ne(a, f);
      }
      return "string" === typeof f && "" !== f || "number" === typeof f ? (f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d["return"] = a, a = d) : (c(a, d), d = re(f, a.mode, h), d["return"] = a, a = d), g(a)) : c(a, d);
    }
    return za;
  }
  var ve = pe(!0),
    we = pe(!1),
    xe = {},
    ye = ic(xe),
    ze = ic(xe),
    Ae = ic(xe);
  function Be(a) {
    if (a === xe) throw Error(m(174));
    return a;
  }
  function Ce(a, b) {
    v(Ae, b);
    v(ze, a);
    v(ye, xe);
    a = Fa(b);
    q(ye);
    v(ye, a);
  }
  function De() {
    q(ye);
    q(ze);
    q(Ae);
  }
  function Ee(a) {
    var b = Be(Ae.current),
      c = Be(ye.current);
    b = Ga(c, a.type, b);
    c !== b && (v(ze, a), v(ye, b));
  }
  function Fe(a) {
    ze.current === a && (q(ye), q(ze));
  }
  var J = ic(0);
  function Ge(a) {
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
  var He = [];
  function Ie() {
    for (var a = 0; a < He.length; a++) {
      var b = He[a];
      Sa ? b._workInProgressVersionPrimary = null : b._workInProgressVersionSecondary = null;
    }
    He.length = 0;
  }
  var Je = da.ReactCurrentDispatcher,
    Ke = da.ReactCurrentBatchConfig,
    Le = 0,
    K = null,
    L = null,
    M = null,
    Me = !1,
    Ne = !1,
    Oe = 0,
    Pe = 0;
  function N() {
    throw Error(m(321));
  }
  function Qe(a, b) {
    if (null === b) return !1;
    for (var c = 0; c < b.length && c < a.length; c++) {
      if (!Vc(a[c], b[c])) return !1;
    }
    return !0;
  }
  function Re(a, b, c, d, e, f) {
    Le = f;
    K = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Je.current = null === a || null === a.memoizedState ? Se : Te;
    a = c(d, e);
    if (Ne) {
      f = 0;
      do {
        Ne = !1;
        Oe = 0;
        if (25 <= f) throw Error(m(301));
        f += 1;
        M = L = null;
        b.updateQueue = null;
        Je.current = Ue;
        a = c(d, e);
      } while (Ne);
    }
    Je.current = Ve;
    b = null !== L && null !== L.next;
    Le = 0;
    M = L = K = null;
    Me = !1;
    if (b) throw Error(m(300));
    return a;
  }
  function We() {
    var a = 0 !== Oe;
    Oe = 0;
    return a;
  }
  function Xe() {
    var a = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    null === M ? K.memoizedState = M = a : M = M.next = a;
    return M;
  }
  function Ye() {
    if (null === L) {
      var a = K.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = L.next;
    var b = null === M ? K.memoizedState : M.next;
    if (null !== b) M = b, L = a;else {
      if (null === a) throw Error(m(310));
      L = a;
      a = {
        memoizedState: L.memoizedState,
        baseState: L.baseState,
        baseQueue: L.baseQueue,
        queue: L.queue,
        next: null
      };
      null === M ? K.memoizedState = M = a : M = M.next = a;
    }
    return M;
  }
  function Ze(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function $e(a) {
    var b = Ye(),
      c = b.queue;
    if (null === c) throw Error(m(311));
    c.lastRenderedReducer = a;
    var d = L,
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
        var n = l.lane;
        if ((Le & n) === n) null !== k && (k = k.next = {
          lane: 0,
          action: l.action,
          hasEagerState: l.hasEagerState,
          eagerState: l.eagerState,
          next: null
        }), d = l.hasEagerState ? l.eagerState : a(d, l.action);else {
          var t = {
            lane: n,
            action: l.action,
            hasEagerState: l.hasEagerState,
            eagerState: l.eagerState,
            next: null
          };
          null === k ? (h = k = t, g = d) : k = k.next = t;
          K.lanes |= n;
          be |= n;
        }
        l = l.next;
      } while (null !== l && l !== f);
      null === k ? g = d : k.next = h;
      Vc(d, b.memoizedState) || (G = !0);
      b.memoizedState = d;
      b.baseState = g;
      b.baseQueue = k;
      c.lastRenderedState = d;
    }
    a = c.interleaved;
    if (null !== a) {
      e = a;
      do {
        f = e.lane, K.lanes |= f, be |= f, e = e.next;
      } while (e !== a);
    } else null === e && (c.lanes = 0);
    return [b.memoizedState, c.dispatch];
  }
  function af(a) {
    var b = Ye(),
      c = b.queue;
    if (null === c) throw Error(m(311));
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
      Vc(f, b.memoizedState) || (G = !0);
      b.memoizedState = f;
      null === b.baseQueue && (b.baseState = f);
      c.lastRenderedState = f;
    }
    return [f, d];
  }
  function bf() {}
  function cf(a, b) {
    var c = K,
      d = Ye(),
      e = b(),
      f = !Vc(d.memoizedState, e);
    f && (d.memoizedState = e, G = !0);
    d = d.queue;
    df(ef.bind(null, c, d, a), [a]);
    if (d.getSnapshot !== b || f || null !== M && M.memoizedState.tag & 1) {
      c.flags |= 2048;
      ff(9, gf.bind(null, c, d, e, b), void 0, null);
      if (null === O) throw Error(m(349));
      0 !== (Le & 30) || hf(c, b, e);
    }
    return e;
  }
  function hf(a, b, c) {
    a.flags |= 16384;
    a = {
      getSnapshot: b,
      value: c
    };
    b = K.updateQueue;
    null === b ? (b = {
      lastEffect: null,
      stores: null
    }, K.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
  }
  function gf(a, b, c, d) {
    b.value = c;
    b.getSnapshot = d;
    jf(b) && kf(a);
  }
  function ef(a, b, c) {
    return c(function () {
      jf(b) && kf(a);
    });
  }
  function jf(a) {
    var b = a.getSnapshot;
    a = a.value;
    try {
      var c = b();
      return !Vc(a, c);
    } catch (d) {
      return !0;
    }
  }
  function kf(a) {
    var b = Td(a, 1);
    null !== b && ge(b, a, 1, -1);
  }
  function lf(a) {
    var b = Xe();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ze,
      lastRenderedState: a
    };
    b.queue = a;
    a = a.dispatch = mf.bind(null, K, a);
    return [b.memoizedState, a];
  }
  function ff(a, b, c, d) {
    a = {
      tag: a,
      create: b,
      destroy: c,
      deps: d,
      next: null
    };
    b = K.updateQueue;
    null === b ? (b = {
      lastEffect: null,
      stores: null
    }, K.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }
  function nf() {
    return Ye().memoizedState;
  }
  function of(a, b, c, d) {
    var e = Xe();
    K.flags |= a;
    e.memoizedState = ff(1 | b, c, void 0, void 0 === d ? null : d);
  }
  function pf(a, b, c, d) {
    var e = Ye();
    d = void 0 === d ? null : d;
    var f = void 0;
    if (null !== L) {
      var g = L.memoizedState;
      f = g.destroy;
      if (null !== d && Qe(d, g.deps)) {
        e.memoizedState = ff(b, c, f, d);
        return;
      }
    }
    K.flags |= a;
    e.memoizedState = ff(1 | b, c, f, d);
  }
  function qf(a, b) {
    return of(8390656, 8, a, b);
  }
  function df(a, b) {
    return pf(2048, 8, a, b);
  }
  function rf(a, b) {
    return pf(4, 2, a, b);
  }
  function sf(a, b) {
    return pf(4, 4, a, b);
  }
  function tf(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function () {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
      b.current = null;
    };
  }
  function uf(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return pf(4, 4, tf.bind(null, b, a), c);
  }
  function vf() {}
  function wf(a, b) {
    var c = Ye();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Qe(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }
  function xf(a, b) {
    var c = Ye();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Qe(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }
  function yf(a, b, c) {
    if (0 === (Le & 21)) return a.baseState && (a.baseState = !1, G = !0), a.memoizedState = c;
    Vc(c, b) || (c = Dc(), K.lanes |= c, be |= c, a.baseState = !0);
    return b;
  }
  function zf(a, b) {
    var c = C;
    C = 0 !== c && 4 > c ? c : 4;
    a(!0);
    var d = Ke.transition;
    Ke.transition = {};
    try {
      a(!1), b();
    } finally {
      C = c, Ke.transition = d;
    }
  }
  function Af() {
    return Ye().memoizedState;
  }
  function Bf(a, b, c) {
    var d = fe(a);
    c = {
      lane: d,
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Cf(a)) Df(b, c);else if (c = Sd(a, b, c, d), null !== c) {
      var e = I();
      ge(c, a, d, e);
      Ef(c, b, d);
    }
  }
  function mf(a, b, c) {
    var d = fe(a),
      e = {
        lane: d,
        action: c,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
    if (Cf(a)) Df(b, e);else {
      var f = a.alternate;
      if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
        var g = b.lastRenderedState,
          h = f(g, c);
        e.hasEagerState = !0;
        e.eagerState = h;
        if (Vc(h, g)) {
          var k = b.interleaved;
          null === k ? (e.next = e, Rd(b)) : (e.next = k.next, k.next = e);
          b.interleaved = e;
          return;
        }
      } catch (l) {} finally {}
      c = Sd(a, b, e, d);
      null !== c && (e = I(), ge(c, a, d, e), Ef(c, b, d));
    }
  }
  function Cf(a) {
    var b = a.alternate;
    return a === K || null !== b && b === K;
  }
  function Df(a, b) {
    Ne = Me = !0;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
  function Ef(a, b, c) {
    if (0 !== (c & 4194240)) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Hc(a, c);
    }
  }
  var Ve = {
      readContext: Pd,
      useCallback: N,
      useContext: N,
      useEffect: N,
      useImperativeHandle: N,
      useInsertionEffect: N,
      useLayoutEffect: N,
      useMemo: N,
      useReducer: N,
      useRef: N,
      useState: N,
      useDebugValue: N,
      useDeferredValue: N,
      useTransition: N,
      useMutableSource: N,
      useSyncExternalStore: N,
      useId: N,
      unstable_isNewReconciler: !1
    },
    Se = {
      readContext: Pd,
      useCallback: function useCallback(a, b) {
        Xe().memoizedState = [a, void 0 === b ? null : b];
        return a;
      },
      useContext: Pd,
      useEffect: qf,
      useImperativeHandle: function useImperativeHandle(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return of(4194308, 4, tf.bind(null, b, a), c);
      },
      useLayoutEffect: function useLayoutEffect(a, b) {
        return of(4194308, 4, a, b);
      },
      useInsertionEffect: function useInsertionEffect(a, b) {
        return of(4, 2, a, b);
      },
      useMemo: function useMemo(a, b) {
        var c = Xe();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      },
      useReducer: function useReducer(a, b, c) {
        var d = Xe();
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
        a = a.dispatch = Bf.bind(null, K, a);
        return [d.memoizedState, a];
      },
      useRef: function useRef(a) {
        var b = Xe();
        a = {
          current: a
        };
        return b.memoizedState = a;
      },
      useState: lf,
      useDebugValue: vf,
      useDeferredValue: function useDeferredValue(a) {
        return Xe().memoizedState = a;
      },
      useTransition: function useTransition() {
        var a = lf(!1),
          b = a[0];
        a = zf.bind(null, a[1]);
        Xe().memoizedState = a;
        return [b, a];
      },
      useMutableSource: function useMutableSource() {},
      useSyncExternalStore: function useSyncExternalStore(a, b, c) {
        var d = K,
          e = Xe();
        if (F) {
          if (void 0 === c) throw Error(m(407));
          c = c();
        } else {
          c = b();
          if (null === O) throw Error(m(349));
          0 !== (Le & 30) || hf(d, b, c);
        }
        e.memoizedState = c;
        var f = {
          value: c,
          getSnapshot: b
        };
        e.queue = f;
        qf(ef.bind(null, d, f, a), [a]);
        d.flags |= 2048;
        ff(9, gf.bind(null, d, f, c, b), void 0, null);
        return c;
      },
      useId: function useId() {
        var a = Xe(),
          b = O.identifierPrefix;
        if (F) {
          var c = jd;
          var d = id;
          c = (d & ~(1 << 32 - tc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Oe++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else c = Pe++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      },
      unstable_isNewReconciler: !1
    },
    Te = {
      readContext: Pd,
      useCallback: wf,
      useContext: Pd,
      useEffect: df,
      useImperativeHandle: uf,
      useInsertionEffect: rf,
      useLayoutEffect: sf,
      useMemo: xf,
      useReducer: $e,
      useRef: nf,
      useState: function useState() {
        return $e(Ze);
      },
      useDebugValue: vf,
      useDeferredValue: function useDeferredValue(a) {
        var b = Ye();
        return yf(b, L.memoizedState, a);
      },
      useTransition: function useTransition() {
        var a = $e(Ze)[0],
          b = Ye().memoizedState;
        return [a, b];
      },
      useMutableSource: bf,
      useSyncExternalStore: cf,
      useId: Af,
      unstable_isNewReconciler: !1
    },
    Ue = {
      readContext: Pd,
      useCallback: wf,
      useContext: Pd,
      useEffect: df,
      useImperativeHandle: uf,
      useInsertionEffect: rf,
      useLayoutEffect: sf,
      useMemo: xf,
      useReducer: af,
      useRef: nf,
      useState: function useState() {
        return af(Ze);
      },
      useDebugValue: vf,
      useDeferredValue: function useDeferredValue(a) {
        var b = Ye();
        return null === L ? b.memoizedState = a : yf(b, L.memoizedState, a);
      },
      useTransition: function useTransition() {
        var a = af(Ze)[0],
          b = Ye().memoizedState;
        return [a, b];
      },
      useMutableSource: bf,
      useSyncExternalStore: cf,
      useId: Af,
      unstable_isNewReconciler: !1
    };
  function Ff(a, b) {
    try {
      var c = "",
        d = b;
      do {
        c += Ed(d), d = d["return"];
      } while (d);
      var e = c;
    } catch (f) {
      e = "\nError generating stack: " + f.message + "\n" + f.stack;
    }
    return {
      value: a,
      source: b,
      stack: e,
      digest: null
    };
  }
  function Gf(a, b, c) {
    return {
      value: a,
      source: null,
      stack: null != c ? c : null,
      digest: null != b ? b : null
    };
  }
  function Hf(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function () {
        throw c;
      });
    }
  }
  var If = "function" === typeof WeakMap ? WeakMap : Map;
  function Jf(a, b, c) {
    c = Xd(-1, c);
    c.tag = 3;
    c.payload = {
      element: null
    };
    var d = b.value;
    c.callback = function () {
      Kf || (Kf = !0, Lf = d);
      Hf(a, b);
    };
    return c;
  }
  function Mf(a, b, c) {
    c = Xd(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;
    if ("function" === typeof d) {
      var e = b.value;
      c.payload = function () {
        return d(e);
      };
      c.callback = function () {
        Hf(a, b);
      };
    }
    var f = a.stateNode;
    null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
      Hf(a, b);
      "function" !== typeof d && (null === Nf ? Nf = new Set([this]) : Nf.add(this));
      var c = b.stack;
      this.componentDidCatch(b.value, {
        componentStack: null !== c ? c : ""
      });
    });
    return c;
  }
  function Of(a, b, c) {
    var d = a.pingCache;
    if (null === d) {
      d = a.pingCache = new If();
      var e = new Set();
      d.set(b, e);
    } else e = d.get(b), void 0 === e && (e = new Set(), d.set(b, e));
    e.has(c) || (e.add(c), a = Pf.bind(null, a, b, c), b.then(a, a));
  }
  function Qf(a) {
    do {
      var b;
      if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;
      if (b) return a;
      a = a["return"];
    } while (null !== a);
    return null;
  }
  function Rf(a, b, c, d, e) {
    if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = Xd(-1, 1), b.tag = 2, Yd(c, b, 1))), c.lanes |= 1), a;
    a.flags |= 65536;
    a.lanes = e;
    return a;
  }
  var Sf = da.ReactCurrentOwner,
    G = !1;
  function P(a, b, c, d) {
    b.child = null === a ? we(b, null, c, d) : ve(b, a.child, c, d);
  }
  function Tf(a, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    Od(b, e);
    d = Re(a, b, c, d, f, e);
    c = We();
    if (null !== a && !G) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Uf(a, b, e);
    F && c && md(b);
    b.flags |= 1;
    P(a, b, d, e);
    return b.child;
  }
  function Vf(a, b, c, d, e) {
    if (null === a) {
      var f = c.type;
      if ("function" === typeof f && !Wf(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, Xf(a, b, f, d, e);
      a = se(c.type, null, d, b, b.mode, e);
      a.ref = b.ref;
      a["return"] = b;
      return b.child = a;
    }
    f = a.child;
    if (0 === (a.lanes & e)) {
      var g = f.memoizedProps;
      c = c.compare;
      c = null !== c ? c : Dd;
      if (c(g, d) && a.ref === b.ref) return Uf(a, b, e);
    }
    b.flags |= 1;
    a = qe(f, d);
    a.ref = b.ref;
    a["return"] = b;
    return b.child = a;
  }
  function Xf(a, b, c, d, e) {
    if (null !== a) {
      var f = a.memoizedProps;
      if (Dd(f, d) && a.ref === b.ref) if (G = !1, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (G = !0);else return b.lanes = a.lanes, Uf(a, b, e);
    }
    return Yf(a, b, c, d, e);
  }
  function Zf(a, b, c) {
    var d = b.pendingProps,
      e = d.children,
      f = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode) {
      if (0 === (b.mode & 1)) b.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, v($f, ag), ag |= c;else {
        if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
          baseLanes: a,
          cachePool: null,
          transitions: null
        }, b.updateQueue = null, v($f, ag), ag |= a, null;
        b.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        };
        d = null !== f ? f.baseLanes : c;
        v($f, ag);
        ag |= d;
      }
    } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, v($f, ag), ag |= d;
    P(a, b, e, c);
    return b.child;
  }
  function bg(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
  }
  function Yf(a, b, c, d, e) {
    var f = A(c) ? kc : x.current;
    f = lc(b, f);
    Od(b, e);
    c = Re(a, b, c, d, f, e);
    d = We();
    if (null !== a && !G) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Uf(a, b, e);
    F && d && md(b);
    b.flags |= 1;
    P(a, b, c, e);
    return b.child;
  }
  function cg(a, b, c, d, e) {
    if (A(c)) {
      var f = !0;
      pc(b);
    } else f = !1;
    Od(b, e);
    if (null === b.stateNode) dg(a, b), je(b, c, d), le(b, c, d, e), d = !0;else if (null === a) {
      var g = b.stateNode,
        h = b.memoizedProps;
      g.props = h;
      var k = g.context,
        l = c.contextType;
      "object" === typeof l && null !== l ? l = Pd(l) : (l = A(c) ? kc : x.current, l = lc(b, l));
      var n = c.getDerivedStateFromProps,
        t = "function" === typeof n || "function" === typeof g.getSnapshotBeforeUpdate;
      t || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && ke(b, g, d, l);
      Ud = !1;
      var p = b.memoizedState;
      g.state = p;
      ae(b, d, g, e);
      k = b.memoizedState;
      h !== d || p !== k || z.current || Ud ? ("function" === typeof n && (ee(b, c, n, d), k = b.memoizedState), (h = Ud || ie(b, c, h, d, p, k, l)) ? (t || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = !1);
    } else {
      g = b.stateNode;
      Wd(a, b);
      h = b.memoizedProps;
      l = b.type === b.elementType ? h : Fd(b.type, h);
      g.props = l;
      t = b.pendingProps;
      p = g.context;
      k = c.contextType;
      "object" === typeof k && null !== k ? k = Pd(k) : (k = A(c) ? kc : x.current, k = lc(b, k));
      var B = c.getDerivedStateFromProps;
      (n = "function" === typeof B || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== t || p !== k) && ke(b, g, d, k);
      Ud = !1;
      p = b.memoizedState;
      g.state = p;
      ae(b, d, g, e);
      var w = b.memoizedState;
      h !== t || p !== w || z.current || Ud ? ("function" === typeof B && (ee(b, c, B, d), w = b.memoizedState), (l = Ud || ie(b, c, l, d, p, w, k) || !1) ? (n || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, w, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, w, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = w), g.props = d, g.state = w, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 1024), d = !1);
    }
    return eg(a, b, c, d, f, e);
  }
  function eg(a, b, c, d, e, f) {
    bg(a, b);
    var g = 0 !== (b.flags & 128);
    if (!d && !g) return e && rc(b, c, !1), Uf(a, b, f);
    d = b.stateNode;
    Sf.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = ve(b, a.child, null, f), b.child = ve(b, null, h, f)) : P(a, b, h, f);
    b.memoizedState = d.state;
    e && rc(b, c, !0);
    return b.child;
  }
  function fg(a) {
    var b = a.stateNode;
    b.pendingContext ? nc(a, b.pendingContext, b.pendingContext !== b.context) : b.context && nc(a, b.context, !1);
    Ce(a, b.containerInfo);
  }
  function gg(a, b, c, d, e) {
    Ad();
    Bd(e);
    b.flags |= 256;
    P(a, b, c, d);
    return b.child;
  }
  var hg = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
  };
  function ig(a) {
    return {
      baseLanes: a,
      cachePool: null,
      transitions: null
    };
  }
  function jg(a, b, c) {
    var d = b.pendingProps,
      e = J.current,
      f = !1,
      g = 0 !== (b.flags & 128),
      h;
    (h = g) || (h = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
    if (h) f = !0, b.flags &= -129;else if (null === a || null !== a.memoizedState) e |= 1;
    v(J, e & 1);
    if (null === a) {
      wd(b);
      a = b.memoizedState;
      if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : Kb(a) ? b.lanes = 8 : b.lanes = 1073741824, null;
      g = d.children;
      a = d.fallback;
      return f ? (d = b.mode, f = b.child, g = {
        mode: "hidden",
        children: g
      }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = kg(g, d, 0, null), a = ue(a, d, c, null), f["return"] = b, a["return"] = b, f.sibling = a, b.child = f, b.child.memoizedState = ig(c), b.memoizedState = hg, a) : lg(b, g);
    }
    e = a.memoizedState;
    if (null !== e && (h = e.dehydrated, null !== h)) return mg(a, b, g, d, h, e, c);
    if (f) {
      f = d.fallback;
      g = b.mode;
      e = a.child;
      h = e.sibling;
      var k = {
        mode: "hidden",
        children: d.children
      };
      0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = qe(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
      null !== h ? f = qe(h, f) : (f = ue(f, g, c, null), f.flags |= 2);
      f["return"] = b;
      d["return"] = b;
      d.sibling = f;
      b.child = d;
      d = f;
      f = b.child;
      g = a.child.memoizedState;
      g = null === g ? ig(c) : {
        baseLanes: g.baseLanes | c,
        cachePool: null,
        transitions: g.transitions
      };
      f.memoizedState = g;
      f.childLanes = a.childLanes & ~c;
      b.memoizedState = hg;
      return d;
    }
    f = a.child;
    a = f.sibling;
    d = qe(f, {
      mode: "visible",
      children: d.children
    });
    0 === (b.mode & 1) && (d.lanes = c);
    d["return"] = b;
    d.sibling = null;
    null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
    b.child = d;
    b.memoizedState = null;
    return d;
  }
  function lg(a, b) {
    b = kg({
      mode: "visible",
      children: b
    }, a.mode, 0, null);
    b["return"] = a;
    return a.child = b;
  }
  function ng(a, b, c, d) {
    null !== d && Bd(d);
    ve(b, a.child, null, c);
    a = lg(b, b.pendingProps.children);
    a.flags |= 2;
    b.memoizedState = null;
    return a;
  }
  function mg(a, b, c, d, e, f, g) {
    if (c) {
      if (b.flags & 256) return b.flags &= -257, d = Gf(Error(m(422))), ng(a, b, g, d);
      if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
      f = d.fallback;
      e = b.mode;
      d = kg({
        mode: "visible",
        children: d.children
      }, e, 0, null);
      f = ue(f, e, g, null);
      f.flags |= 2;
      d["return"] = b;
      f["return"] = b;
      d.sibling = f;
      b.child = d;
      0 !== (b.mode & 1) && ve(b, a.child, null, g);
      b.child.memoizedState = ig(g);
      b.memoizedState = hg;
      return f;
    }
    if (0 === (b.mode & 1)) return ng(a, b, g, null);
    if (Kb(e)) return d = Lb(e).digest, f = Error(m(419)), d = Gf(f, d, void 0), ng(a, b, g, d);
    c = 0 !== (g & a.childLanes);
    if (G || c) {
      d = O;
      if (null !== d) {
        switch (g & -g) {
          case 4:
            e = 2;
            break;
          case 16:
            e = 8;
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
            e = 32;
            break;
          case 536870912:
            e = 268435456;
            break;
          default:
            e = 0;
        }
        e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
        0 !== e && e !== f.retryLane && (f.retryLane = e, Td(a, e), ge(d, a, e, -1));
      }
      og();
      d = Gf(Error(m(421)));
      return ng(a, b, g, d);
    }
    if (Jb(e)) return b.flags |= 128, b.child = a.child, b = pg.bind(null, a), Mb(e, b), null;
    a = f.treeContext;
    Va && (pd = Qb(e), od = b, F = !0, rd = null, qd = !1, null !== a && (fd[gd++] = id, fd[gd++] = jd, fd[gd++] = hd, id = a.id, jd = a.overflow, hd = b));
    b = lg(b, d.children);
    b.flags |= 4096;
    return b;
  }
  function qg(a, b, c) {
    a.lanes |= b;
    var d = a.alternate;
    null !== d && (d.lanes |= b);
    Nd(a["return"], b, c);
  }
  function rg(a, b, c, d, e) {
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
  function sg(a, b, c) {
    var d = b.pendingProps,
      e = d.revealOrder,
      f = d.tail;
    P(a, b, d.children, c);
    d = J.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;else {
      if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a;) {
        if (13 === a.tag) null !== a.memoizedState && qg(a, c, b);else if (19 === a.tag) qg(a, c, b);else if (null !== a.child) {
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
    v(J, d);
    if (0 === (b.mode & 1)) b.memoizedState = null;else switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c;) {
          a = c.alternate, null !== a && null === Ge(a) && (e = c), c = c.sibling;
        }
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        rg(b, !1, e, c, f);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e;) {
          a = e.alternate;
          if (null !== a && null === Ge(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        rg(b, !0, c, null, f);
        break;
      case "together":
        rg(b, !1, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
    return b.child;
  }
  function dg(a, b) {
    0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Uf(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    be |= b.lanes;
    if (0 === (c & b.childLanes)) return null;
    if (null !== a && b.child !== a.child) throw Error(m(153));
    if (null !== b.child) {
      a = b.child;
      c = qe(a, a.pendingProps);
      b.child = c;
      for (c["return"] = b; null !== a.sibling;) {
        a = a.sibling, c = c.sibling = qe(a, a.pendingProps), c["return"] = b;
      }
      c.sibling = null;
    }
    return b.child;
  }
  function tg(a, b, c) {
    switch (b.tag) {
      case 3:
        fg(b);
        Ad();
        break;
      case 5:
        Ee(b);
        break;
      case 1:
        A(b.type) && pc(b);
        break;
      case 4:
        Ce(b, b.stateNode.containerInfo);
        break;
      case 10:
        Ld(b, b.type._context, b.memoizedProps.value);
        break;
      case 13:
        var d = b.memoizedState;
        if (null !== d) {
          if (null !== d.dehydrated) return v(J, J.current & 1), b.flags |= 128, null;
          if (0 !== (c & b.child.childLanes)) return jg(a, b, c);
          v(J, J.current & 1);
          a = Uf(a, b, c);
          return null !== a ? a.sibling : null;
        }
        v(J, J.current & 1);
        break;
      case 19:
        d = 0 !== (c & b.childLanes);
        if (0 !== (a.flags & 128)) {
          if (d) return sg(a, b, c);
          b.flags |= 128;
        }
        var e = b.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        v(J, J.current);
        if (d) break;else return null;
      case 22:
      case 23:
        return b.lanes = 0, Zf(a, b, c);
    }
    return Uf(a, b, c);
  }
  function ug(a) {
    a.flags |= 4;
  }
  function vg(a, b) {
    if (null !== a && a.child === b.child) return !0;
    if (0 !== (b.flags & 16)) return !1;
    for (a = b.child; null !== a;) {
      if (0 !== (a.flags & 12854) || 0 !== (a.subtreeFlags & 12854)) return !1;
      a = a.sibling;
    }
    return !0;
  }
  var _wg, xg, yg, zg;
  if (Ta) _wg = function wg(a, b) {
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
  }, xg = function xg() {}, yg = function yg(a, b, c, d, e) {
    a = a.memoizedProps;
    if (a !== d) {
      var f = b.stateNode,
        g = Be(ye.current);
      c = Ma(f, c, a, d, e, g);
      (b.updateQueue = c) && ug(b);
    }
  }, zg = function zg(a, b, c, d) {
    c !== d && ug(b);
  };else if (Ua) {
    _wg = function wg(a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = Eb(f, e.type, e.memoizedProps, e));
          Ka(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = Fb(f, e.memoizedProps, e)), Ka(a, f);else if (4 !== e.tag) if (22 === e.tag && null !== e.memoizedState) f = e.child, null !== f && (f["return"] = e), _wg(a, e, !0, !0);else if (null !== e.child) {
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
    var Ag = function Ag(a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = Eb(f, e.type, e.memoizedProps, e));
          Ab(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = Fb(f, e.memoizedProps, e)), Ab(a, f);else if (4 !== e.tag) if (22 === e.tag && null !== e.memoizedState) f = e.child, null !== f && (f["return"] = e), Ag(a, e, !0, !0);else if (null !== e.child) {
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
    xg = function xg(a, b) {
      var c = b.stateNode;
      if (!vg(a, b)) {
        a = c.containerInfo;
        var d = zb(a);
        Ag(d, b, !1, !1);
        c.pendingChildren = d;
        ug(b);
        Bb(a, d);
      }
    };
    yg = function yg(a, b, c, d, e) {
      var f = a.stateNode,
        g = a.memoizedProps;
      if ((a = vg(a, b)) && g === d) b.stateNode = f;else {
        var h = b.stateNode,
          k = Be(ye.current),
          l = null;
        g !== d && (l = Ma(h, c, g, d, e, k));
        a && null === l ? b.stateNode = f : (f = yb(f, l, c, g, d, b, a, h), La(f, c, d, e, k) && ug(b), b.stateNode = f, a ? ug(b) : _wg(f, b, !1, !1));
      }
    };
    zg = function zg(a, b, c, d) {
      c !== d ? (a = Be(Ae.current), c = Be(ye.current), b.stateNode = Oa(d, a, c, b), ug(b)) : b.stateNode = a.stateNode;
    };
  } else xg = function xg() {}, yg = function yg() {}, zg = function zg() {};
  function Bg(a, b) {
    if (!F) switch (a.tailMode) {
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
  function Q(a) {
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
  function Cg(a, b, c) {
    var d = b.pendingProps;
    nd(b);
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
        return Q(b), null;
      case 1:
        return A(b.type) && mc(), Q(b), null;
      case 3:
        c = b.stateNode;
        De();
        q(z);
        q(x);
        Ie();
        c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null);
        if (null === a || null === a.child) yd(b) ? ug(b) : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== rd && (Dg(rd), rd = null));
        xg(a, b);
        Q(b);
        return null;
      case 5:
        Fe(b);
        c = Be(Ae.current);
        var e = b.type;
        if (null !== a && null != b.stateNode) yg(a, b, e, d, c), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);else {
          if (!d) {
            if (null === b.stateNode) throw Error(m(166));
            Q(b);
            return null;
          }
          a = Be(ye.current);
          if (yd(b)) {
            if (!Va) throw Error(m(175));
            a = Rb(b.stateNode, b.type, b.memoizedProps, c, a, b, !qd);
            b.updateQueue = a;
            null !== a && ug(b);
          } else {
            var f = Ja(e, d, c, a, b);
            _wg(f, b, !1, !1);
            b.stateNode = f;
            La(f, e, d, c, a) && ug(b);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        Q(b);
        return null;
      case 6:
        if (a && null != b.stateNode) zg(a, b, a.memoizedProps, d);else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(m(166));
          a = Be(Ae.current);
          c = Be(ye.current);
          if (yd(b)) {
            if (!Va) throw Error(m(176));
            a = b.stateNode;
            c = b.memoizedProps;
            if (d = Sb(a, c, b, !qd)) if (e = od, null !== e) switch (e.tag) {
              case 3:
                $b(e.stateNode.containerInfo, a, c, 0 !== (e.mode & 1));
                break;
              case 5:
                ac(e.type, e.memoizedProps, e.stateNode, a, c, 0 !== (e.mode & 1));
            }
            d && ug(b);
          } else b.stateNode = Oa(d, a, c, b);
        }
        Q(b);
        return null;
      case 13:
        q(J);
        d = b.memoizedState;
        if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
          if (F && null !== pd && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) zd(), Ad(), b.flags |= 98560, e = !1;else if (e = yd(b), null !== d && null !== d.dehydrated) {
            if (null === a) {
              if (!e) throw Error(m(318));
              if (!Va) throw Error(m(344));
              e = b.memoizedState;
              e = null !== e ? e.dehydrated : null;
              if (!e) throw Error(m(317));
              Tb(e, b);
            } else Ad(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            Q(b);
            e = !1;
          } else null !== rd && (Dg(rd), rd = null), e = !0;
          if (!e) return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128)) return b.lanes = c, b;
        c = null !== d;
        c !== (null !== a && null !== a.memoizedState) && c && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (J.current & 1) ? 0 === R && (R = 3) : og()));
        null !== b.updateQueue && (b.flags |= 4);
        Q(b);
        return null;
      case 4:
        return De(), xg(a, b), null === a && Xa(b.stateNode.containerInfo), Q(b), null;
      case 10:
        return Md(b.type._context), Q(b), null;
      case 17:
        return A(b.type) && mc(), Q(b), null;
      case 19:
        q(J);
        e = b.memoizedState;
        if (null === e) return Q(b), null;
        d = 0 !== (b.flags & 128);
        f = e.rendering;
        if (null === f) {
          if (d) Bg(e, !1);else {
            if (0 !== R || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a;) {
              f = Ge(a);
              if (null !== f) {
                b.flags |= 128;
                Bg(e, !1);
                a = f.updateQueue;
                null !== a && (b.updateQueue = a, b.flags |= 4);
                b.subtreeFlags = 0;
                a = c;
                for (c = b.child; null !== c;) {
                  d = c, e = a, d.flags &= 14680066, f = d.alternate, null === f ? (d.childLanes = 0, d.lanes = e, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = f.childLanes, d.lanes = f.lanes, d.child = f.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = f.memoizedProps, d.memoizedState = f.memoizedState, d.updateQueue = f.updateQueue, d.type = f.type, e = f.dependencies, d.dependencies = null === e ? null : {
                    lanes: e.lanes,
                    firstContext: e.firstContext
                  }), c = c.sibling;
                }
                v(J, J.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
            null !== e.tail && D() > Eg && (b.flags |= 128, d = !0, Bg(e, !1), b.lanes = 4194304);
          }
        } else {
          if (!d) if (a = Ge(f), null !== a) {
            if (b.flags |= 128, d = !0, a = a.updateQueue, null !== a && (b.updateQueue = a, b.flags |= 4), Bg(e, !0), null === e.tail && "hidden" === e.tailMode && !f.alternate && !F) return Q(b), null;
          } else 2 * D() - e.renderingStartTime > Eg && 1073741824 !== c && (b.flags |= 128, d = !0, Bg(e, !1), b.lanes = 4194304);
          e.isBackwards ? (f.sibling = b.child, b.child = f) : (a = e.last, null !== a ? a.sibling = f : b.child = f, e.last = f);
        }
        if (null !== e.tail) return b = e.tail, e.rendering = b, e.tail = b.sibling, e.renderingStartTime = D(), b.sibling = null, a = J.current, v(J, d ? a & 1 | 2 : a & 1), b;
        Q(b);
        return null;
      case 22:
      case 23:
        return Fg(), c = null !== b.memoizedState, null !== a && null !== a.memoizedState !== c && (b.flags |= 8192), c && 0 !== (b.mode & 1) ? 0 !== (ag & 1073741824) && (Q(b), Ta && b.subtreeFlags & 6 && (b.flags |= 8192)) : Q(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(m(156, b.tag));
  }
  function Gg(a, b) {
    nd(b);
    switch (b.tag) {
      case 1:
        return A(b.type) && mc(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 3:
        return De(), q(z), q(x), Ie(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
      case 5:
        return Fe(b), null;
      case 13:
        q(J);
        a = b.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          if (null === b.alternate) throw Error(m(340));
          Ad();
        }
        a = b.flags;
        return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 19:
        return q(J), null;
      case 4:
        return De(), null;
      case 10:
        return Md(b.type._context), null;
      case 22:
      case 23:
        return Fg(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Hg = !1,
    S = !1,
    Ig = "function" === typeof WeakSet ? WeakSet : Set,
    T = null;
  function Jg(a, b) {
    var c = a.ref;
    if (null !== c) if ("function" === typeof c) try {
      c(null);
    } catch (d) {
      U(a, b, d);
    } else c.current = null;
  }
  function Kg(a, b, c) {
    try {
      c();
    } catch (d) {
      U(a, b, d);
    }
  }
  var Lg = !1;
  function Mg(a, b) {
    Ha(a.containerInfo);
    for (T = b; null !== T;) {
      if (a = T, b = a.child, 0 !== (a.subtreeFlags & 1028) && null !== b) b["return"] = a, T = b;else for (; null !== T;) {
        a = T;
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
                  g = f.getSnapshotBeforeUpdate(a.elementType === a.type ? d : Fd(a.type, d), e);
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
              throw Error(m(163));
          }
        } catch (h) {
          U(a, a["return"], h);
        }
        b = a.sibling;
        if (null !== b) {
          b["return"] = a["return"];
          T = b;
          break;
        }
        T = a["return"];
      }
    }
    c = Lg;
    Lg = !1;
    return c;
  }
  function Ng(a, b, c) {
    var d = b.updateQueue;
    d = null !== d ? d.lastEffect : null;
    if (null !== d) {
      var e = d = d.next;
      do {
        if ((e.tag & a) === a) {
          var f = e.destroy;
          e.destroy = void 0;
          void 0 !== f && Kg(b, c, f);
        }
        e = e.next;
      } while (e !== d);
    }
  }
  function Og(a, b) {
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
  function Pg(a) {
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
  function Qg(a) {
    var b = a.alternate;
    null !== b && (a.alternate = null, Qg(b));
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
  function Rg(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }
  function Sg(a) {
    a: for (;;) {
      for (; null === a.sibling;) {
        if (null === a["return"] || Rg(a["return"])) return null;
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
  function Tg(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? pb(c, a, b) : kb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Tg(a, b, c), a = a.sibling; null !== a;) {
      Tg(a, b, c), a = a.sibling;
    }
  }
  function Ug(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? ob(c, a, b) : jb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Ug(a, b, c), a = a.sibling; null !== a;) {
      Ug(a, b, c), a = a.sibling;
    }
  }
  var V = null,
    Vg = !1;
  function Wg(a, b, c) {
    for (c = c.child; null !== c;) {
      Xg(a, b, c), c = c.sibling;
    }
  }
  function Xg(a, b, c) {
    if (Sc && "function" === typeof Sc.onCommitFiberUnmount) try {
      Sc.onCommitFiberUnmount(Rc, c);
    } catch (h) {}
    switch (c.tag) {
      case 5:
        S || Jg(c, b);
      case 6:
        if (Ta) {
          var d = V,
            e = Vg;
          V = null;
          Wg(a, b, c);
          V = d;
          Vg = e;
          null !== V && (Vg ? rb(V, c.stateNode) : qb(V, c.stateNode));
        } else Wg(a, b, c);
        break;
      case 18:
        Ta && null !== V && (Vg ? Yb(V, c.stateNode) : Xb(V, c.stateNode));
        break;
      case 4:
        Ta ? (d = V, e = Vg, V = c.stateNode.containerInfo, Vg = !0, Wg(a, b, c), V = d, Vg = e) : (Ua && (d = c.stateNode.containerInfo, e = zb(d), Cb(d, e)), Wg(a, b, c));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!S && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
          e = d = d.next;
          do {
            var f = e,
              g = f.destroy;
            f = f.tag;
            void 0 !== g && (0 !== (f & 2) ? Kg(c, b, g) : 0 !== (f & 4) && Kg(c, b, g));
            e = e.next;
          } while (e !== d);
        }
        Wg(a, b, c);
        break;
      case 1:
        if (!S && (Jg(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          U(c, b, h);
        }
        Wg(a, b, c);
        break;
      case 21:
        Wg(a, b, c);
        break;
      case 22:
        c.mode & 1 ? (S = (d = S) || null !== c.memoizedState, Wg(a, b, c), S = d) : Wg(a, b, c);
        break;
      default:
        Wg(a, b, c);
    }
  }
  function Yg(a) {
    var b = a.updateQueue;
    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Ig());
      b.forEach(function (b) {
        var d = Zg.bind(null, a, b);
        c.has(b) || (c.add(b), b.then(d, d));
      });
    }
  }
  function $g(a, b) {
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
                V = h.stateNode;
                Vg = !1;
                break a;
              case 3:
                V = h.stateNode.containerInfo;
                Vg = !0;
                break a;
              case 4:
                V = h.stateNode.containerInfo;
                Vg = !0;
                break a;
            }
            h = h["return"];
          }
          if (null === V) throw Error(m(160));
          Xg(f, g, e);
          V = null;
          Vg = !1;
        } else Xg(f, g, e);
        var k = e.alternate;
        null !== k && (k["return"] = null);
        e["return"] = null;
      } catch (l) {
        U(e, b, l);
      }
    }
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b;) {
      ah(b, a), b = b.sibling;
    }
  }
  function ah(a, b) {
    var c = a.alternate,
      d = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        $g(b, a);
        bh(a);
        if (d & 4) {
          try {
            Ng(3, a, a["return"]), Og(3, a);
          } catch (p) {
            U(a, a["return"], p);
          }
          try {
            Ng(5, a, a["return"]);
          } catch (p) {
            U(a, a["return"], p);
          }
        }
        break;
      case 1:
        $g(b, a);
        bh(a);
        d & 512 && null !== c && Jg(c, c["return"]);
        break;
      case 5:
        $g(b, a);
        bh(a);
        d & 512 && null !== c && Jg(c, c["return"]);
        if (Ta) {
          if (a.flags & 32) {
            var e = a.stateNode;
            try {
              sb(e);
            } catch (p) {
              U(a, a["return"], p);
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
            } catch (p) {
              U(a, a["return"], p);
            }
          }
        }
        break;
      case 6:
        $g(b, a);
        bh(a);
        if (d & 4 && Ta) {
          if (null === a.stateNode) throw Error(m(162));
          e = a.stateNode;
          f = a.memoizedProps;
          c = null !== c ? c.memoizedProps : f;
          try {
            lb(e, c, f);
          } catch (p) {
            U(a, a["return"], p);
          }
        }
        break;
      case 3:
        $g(b, a);
        bh(a);
        if (d & 4) {
          if (Ta && Va && null !== c && c.memoizedState.isDehydrated) try {
            Vb(b.containerInfo);
          } catch (p) {
            U(a, a["return"], p);
          }
          if (Ua) {
            e = b.containerInfo;
            f = b.pendingChildren;
            try {
              Cb(e, f);
            } catch (p) {
              U(a, a["return"], p);
            }
          }
        }
        break;
      case 4:
        $g(b, a);
        bh(a);
        if (d & 4 && Ua) {
          f = a.stateNode;
          e = f.containerInfo;
          f = f.pendingChildren;
          try {
            Cb(e, f);
          } catch (p) {
            U(a, a["return"], p);
          }
        }
        break;
      case 13:
        $g(b, a);
        bh(a);
        e = a.child;
        e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (ch = D()));
        d & 4 && Yg(a);
        break;
      case 22:
        var g = null !== c && null !== c.memoizedState;
        a.mode & 1 ? (S = (c = S) || g, $g(b, a), S = c) : $g(b, a);
        bh(a);
        if (d & 8192) {
          c = null !== a.memoizedState;
          if ((a.stateNode.isHidden = c) && !g && 0 !== (a.mode & 1)) for (T = a, d = a.child; null !== d;) {
            for (b = T = d; null !== T;) {
              g = T;
              var h = g.child;
              switch (g.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ng(4, g, g["return"]);
                  break;
                case 1:
                  Jg(g, g["return"]);
                  var k = g.stateNode;
                  if ("function" === typeof k.componentWillUnmount) {
                    var l = g,
                      n = g["return"];
                    try {
                      var t = l;
                      k.props = t.memoizedProps;
                      k.state = t.memoizedState;
                      k.componentWillUnmount();
                    } catch (p) {
                      U(l, n, p);
                    }
                  }
                  break;
                case 5:
                  Jg(g, g["return"]);
                  break;
                case 22:
                  if (null !== g.memoizedState) {
                    dh(b);
                    continue;
                  }
              }
              null !== h ? (h["return"] = g, T = h) : dh(b);
            }
            d = d.sibling;
          }
          if (Ta) a: if (d = null, Ta) for (b = a;;) {
            if (5 === b.tag) {
              if (null === d) {
                d = b;
                try {
                  e = b.stateNode, c ? tb(e) : vb(b.stateNode, b.memoizedProps);
                } catch (p) {
                  U(a, a["return"], p);
                }
              }
            } else if (6 === b.tag) {
              if (null === d) try {
                f = b.stateNode, c ? ub(f) : wb(f, b.memoizedProps);
              } catch (p) {
                U(a, a["return"], p);
              }
            } else if ((22 !== b.tag && 23 !== b.tag || null === b.memoizedState || b === a) && null !== b.child) {
              b.child["return"] = b;
              b = b.child;
              continue;
            }
            if (b === a) break a;
            for (; null === b.sibling;) {
              if (null === b["return"] || b["return"] === a) break a;
              d === b && (d = null);
              b = b["return"];
            }
            d === b && (d = null);
            b.sibling["return"] = b["return"];
            b = b.sibling;
          }
        }
        break;
      case 19:
        $g(b, a);
        bh(a);
        d & 4 && Yg(a);
        break;
      case 21:
        break;
      default:
        $g(b, a), bh(a);
    }
  }
  function bh(a) {
    var b = a.flags;
    if (b & 2) {
      try {
        if (Ta) {
          b: {
            for (var c = a["return"]; null !== c;) {
              if (Rg(c)) {
                var d = c;
                break b;
              }
              c = c["return"];
            }
            throw Error(m(160));
          }
          switch (d.tag) {
            case 5:
              var e = d.stateNode;
              d.flags & 32 && (sb(e), d.flags &= -33);
              var f = Sg(a);
              Ug(a, f, e);
              break;
            case 3:
            case 4:
              var g = d.stateNode.containerInfo,
                h = Sg(a);
              Tg(a, h, g);
              break;
            default:
              throw Error(m(161));
          }
        }
      } catch (k) {
        U(a, a["return"], k);
      }
      a.flags &= -3;
    }
    b & 4096 && (a.flags &= -4097);
  }
  function eh(a, b, c) {
    T = a;
    fh(a, b, c);
  }
  function fh(a, b, c) {
    for (var d = 0 !== (a.mode & 1); null !== T;) {
      var e = T,
        f = e.child;
      if (22 === e.tag && d) {
        var g = null !== e.memoizedState || Hg;
        if (!g) {
          var h = e.alternate,
            k = null !== h && null !== h.memoizedState || S;
          h = Hg;
          var l = S;
          Hg = g;
          if ((S = k) && !l) for (T = e; null !== T;) {
            g = T, k = g.child, 22 === g.tag && null !== g.memoizedState ? gh(e) : null !== k ? (k["return"] = g, T = k) : gh(e);
          }
          for (; null !== f;) {
            T = f, fh(f, b, c), f = f.sibling;
          }
          T = e;
          Hg = h;
          S = l;
        }
        hh(a, b, c);
      } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f["return"] = e, T = f) : hh(a, b, c);
    }
  }
  function hh(a) {
    for (; null !== T;) {
      var b = T;
      if (0 !== (b.flags & 8772)) {
        var c = b.alternate;
        try {
          if (0 !== (b.flags & 8772)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              S || Og(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !S) if (null === c) d.componentDidMount();else {
                var e = b.elementType === b.type ? c.memoizedProps : Fd(b.type, c.memoizedProps);
                d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var f = b.updateQueue;
              null !== f && ce(b, f, d);
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
                ce(b, g, c);
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
                    var n = l.dehydrated;
                    null !== n && Wb(n);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(m(163));
          }
          S || b.flags & 512 && Pg(b);
        } catch (t) {
          U(b, b["return"], t);
        }
      }
      if (b === a) {
        T = null;
        break;
      }
      c = b.sibling;
      if (null !== c) {
        c["return"] = b["return"];
        T = c;
        break;
      }
      T = b["return"];
    }
  }
  function dh(a) {
    for (; null !== T;) {
      var b = T;
      if (b === a) {
        T = null;
        break;
      }
      var c = b.sibling;
      if (null !== c) {
        c["return"] = b["return"];
        T = c;
        break;
      }
      T = b["return"];
    }
  }
  function gh(a) {
    for (; null !== T;) {
      var b = T;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c = b["return"];
            try {
              Og(4, b);
            } catch (k) {
              U(b, c, k);
            }
            break;
          case 1:
            var d = b.stateNode;
            if ("function" === typeof d.componentDidMount) {
              var e = b["return"];
              try {
                d.componentDidMount();
              } catch (k) {
                U(b, e, k);
              }
            }
            var f = b["return"];
            try {
              Pg(b);
            } catch (k) {
              U(b, f, k);
            }
            break;
          case 5:
            var g = b["return"];
            try {
              Pg(b);
            } catch (k) {
              U(b, g, k);
            }
        }
      } catch (k) {
        U(b, b["return"], k);
      }
      if (b === a) {
        T = null;
        break;
      }
      var h = b.sibling;
      if (null !== h) {
        h["return"] = b["return"];
        T = h;
        break;
      }
      T = b["return"];
    }
  }
  var ih = 0,
    jh = 1,
    kh = 2,
    lh = 3,
    mh = 4;
  if ("function" === typeof Symbol && Symbol["for"]) {
    var nh = Symbol["for"];
    ih = nh("selector.component");
    jh = nh("selector.has_pseudo_class");
    kh = nh("selector.role");
    lh = nh("selector.test_id");
    mh = nh("selector.text");
  }
  function oh(a) {
    var b = Wa(a);
    if (null != b) {
      if ("string" !== typeof b.memoizedProps["data-testname"]) throw Error(m(364));
      return b;
    }
    a = cb(a);
    if (null === a) throw Error(m(362));
    return a.stateNode.current;
  }
  function ph(a, b) {
    switch (b.$$typeof) {
      case ih:
        if (a.type === b.value) return !0;
        break;
      case jh:
        a: {
          b = b.value;
          a = [a, 0];
          for (var c = 0; c < a.length;) {
            var d = a[c++],
              e = a[c++],
              f = b[e];
            if (5 !== d.tag || !fb(d)) {
              for (; null != f && ph(d, f);) {
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
      case kh:
        if (5 === a.tag && gb(a.stateNode, b.value)) return !0;
        break;
      case mh:
        if (5 === a.tag || 6 === a.tag) if (a = eb(a), null !== a && 0 <= a.indexOf(b.value)) return !0;
        break;
      case lh:
        if (5 === a.tag && (a = a.memoizedProps["data-testname"], "string" === typeof a && a.toLowerCase() === b.value.toLowerCase())) return !0;
        break;
      default:
        throw Error(m(365));
    }
    return !1;
  }
  function qh(a) {
    switch (a.$$typeof) {
      case ih:
        return "<" + (ua(a.value) || "Unknown") + ">";
      case jh:
        return ":has(" + (qh(a) || "") + ")";
      case kh:
        return '[role="' + a.value + '"]';
      case mh:
        return '"' + a.value + '"';
      case lh:
        return '[data-testname="' + a.value + '"]';
      default:
        throw Error(m(365));
    }
  }
  function rh(a, b) {
    var c = [];
    a = [a, 0];
    for (var d = 0; d < a.length;) {
      var e = a[d++],
        f = a[d++],
        g = b[f];
      if (5 !== e.tag || !fb(e)) {
        for (; null != g && ph(e, g);) {
          f++, g = b[f];
        }
        if (f === b.length) c.push(e);else for (e = e.child; null !== e;) {
          a.push(e, f), e = e.sibling;
        }
      }
    }
    return c;
  }
  function sh(a, b) {
    if (!bb) throw Error(m(363));
    a = oh(a);
    a = rh(a, b);
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
  var th = Math.ceil,
    uh = da.ReactCurrentDispatcher,
    vh = da.ReactCurrentOwner,
    W = da.ReactCurrentBatchConfig,
    H = 0,
    O = null,
    X = null,
    Y = 0,
    ag = 0,
    $f = ic(0),
    R = 0,
    wh = null,
    be = 0,
    xh = 0,
    yh = 0,
    zh = null,
    Ah = null,
    ch = 0,
    Eg = Infinity,
    Bh = null;
  function Ch() {
    Eg = D() + 500;
  }
  var Kf = !1,
    Lf = null,
    Nf = null,
    Dh = !1,
    Eh = null,
    Fh = 0,
    Gh = 0,
    Hh = null,
    Ih = -1,
    Jh = 0;
  function I() {
    return 0 !== (H & 6) ? D() : -1 !== Ih ? Ih : Ih = D();
  }
  function fe(a) {
    if (0 === (a.mode & 1)) return 1;
    if (0 !== (H & 2) && 0 !== Y) return Y & -Y;
    if (null !== Cd.transition) return 0 === Jh && (Jh = Dc()), Jh;
    a = C;
    return 0 !== a ? a : Ya();
  }
  function ge(a, b, c, d) {
    if (50 < Gh) throw Gh = 0, Hh = null, Error(m(185));
    Fc(a, c, d);
    if (0 === (H & 2) || a !== O) a === O && (0 === (H & 2) && (xh |= c), 4 === R && Kh(a, Y)), Lh(a, d), 1 === c && 0 === H && 0 === (b.mode & 1) && (Ch(), Xc && ad());
  }
  function Lh(a, b) {
    var c = a.callbackNode;
    Bc(a, b);
    var d = zc(a, a === O ? Y : 0);
    if (0 === d) null !== c && Kc(c), a.callbackNode = null, a.callbackPriority = 0;else if (b = d & -d, a.callbackPriority !== b) {
      null != c && Kc(c);
      if (1 === b) 0 === a.tag ? $c(Mh.bind(null, a)) : Zc(Mh.bind(null, a)), $a ? ab(function () {
        0 === (H & 6) && ad();
      }) : Jc(Nc, ad), c = null;else {
        switch (Ic(d)) {
          case 1:
            c = Nc;
            break;
          case 4:
            c = Oc;
            break;
          case 16:
            c = Pc;
            break;
          case 536870912:
            c = Qc;
            break;
          default:
            c = Pc;
        }
        c = Nh(c, Oh.bind(null, a));
      }
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }
  function Oh(a, b) {
    Ih = -1;
    Jh = 0;
    if (0 !== (H & 6)) throw Error(m(327));
    var c = a.callbackNode;
    if (Ph() && a.callbackNode !== c) return null;
    var d = zc(a, a === O ? Y : 0);
    if (0 === d) return null;
    if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Qh(a, d);else {
      b = d;
      var e = H;
      H |= 2;
      var f = Rh();
      if (O !== a || Y !== b) Bh = null, Ch(), Sh(a, b);
      do {
        try {
          Th();
          break;
        } catch (h) {
          Uh(a, h);
        }
      } while (1);
      Kd();
      uh.current = f;
      H = e;
      null !== X ? b = 0 : (O = null, Y = 0, b = R);
    }
    if (0 !== b) {
      2 === b && (e = Cc(a), 0 !== e && (d = e, b = Vh(a, e)));
      if (1 === b) throw c = wh, Sh(a, 0), Kh(a, d), Lh(a, D()), c;
      if (6 === b) Kh(a, d);else {
        e = a.current.alternate;
        if (0 === (d & 30) && !Wh(e) && (b = Qh(a, d), 2 === b && (f = Cc(a), 0 !== f && (d = f, b = Vh(a, f))), 1 === b)) throw c = wh, Sh(a, 0), Kh(a, d), Lh(a, D()), c;
        a.finishedWork = e;
        a.finishedLanes = d;
        switch (b) {
          case 0:
          case 1:
            throw Error(m(345));
          case 2:
            Xh(a, Ah, Bh);
            break;
          case 3:
            Kh(a, d);
            if ((d & 130023424) === d && (b = ch + 500 - D(), 10 < b)) {
              if (0 !== zc(a, 0)) break;
              e = a.suspendedLanes;
              if ((e & d) !== d) {
                I();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }
              a.timeoutHandle = Pa(Xh.bind(null, a, Ah, Bh), b);
              break;
            }
            Xh(a, Ah, Bh);
            break;
          case 4:
            Kh(a, d);
            if ((d & 4194240) === d) break;
            b = a.eventTimes;
            for (e = -1; 0 < d;) {
              var g = 31 - tc(d);
              f = 1 << g;
              g = b[g];
              g > e && (e = g);
              d &= ~f;
            }
            d = e;
            d = D() - d;
            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * th(d / 1960)) - d;
            if (10 < d) {
              a.timeoutHandle = Pa(Xh.bind(null, a, Ah, Bh), d);
              break;
            }
            Xh(a, Ah, Bh);
            break;
          case 5:
            Xh(a, Ah, Bh);
            break;
          default:
            throw Error(m(329));
        }
      }
    }
    Lh(a, D());
    return a.callbackNode === c ? Oh.bind(null, a) : null;
  }
  function Vh(a, b) {
    var c = zh;
    a.current.memoizedState.isDehydrated && (Sh(a, b).flags |= 256);
    a = Qh(a, b);
    2 !== a && (b = Ah, Ah = c, null !== b && Dg(b));
    return a;
  }
  function Dg(a) {
    null === Ah ? Ah = a : Ah.push.apply(Ah, a);
  }
  function Wh(a) {
    for (var b = a;;) {
      if (b.flags & 16384) {
        var c = b.updateQueue;
        if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
          var e = c[d],
            f = e.getSnapshot;
          e = e.value;
          try {
            if (!Vc(f(), e)) return !1;
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
  function Kh(a, b) {
    b &= ~yh;
    b &= ~xh;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;
    for (a = a.expirationTimes; 0 < b;) {
      var c = 31 - tc(b),
        d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }
  function Mh(a) {
    if (0 !== (H & 6)) throw Error(m(327));
    Ph();
    var b = zc(a, 0);
    if (0 === (b & 1)) return Lh(a, D()), null;
    var c = Qh(a, b);
    if (0 !== a.tag && 2 === c) {
      var d = Cc(a);
      0 !== d && (b = d, c = Vh(a, d));
    }
    if (1 === c) throw c = wh, Sh(a, 0), Kh(a, b), Lh(a, D()), c;
    if (6 === c) throw Error(m(345));
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Xh(a, Ah, Bh);
    Lh(a, D());
    return null;
  }
  function Yh(a) {
    null !== Eh && 0 === Eh.tag && 0 === (H & 6) && Ph();
    var b = H;
    H |= 1;
    var c = W.transition,
      d = C;
    try {
      if (W.transition = null, C = 1, a) return a();
    } finally {
      C = d, W.transition = c, H = b, 0 === (H & 6) && ad();
    }
  }
  function Fg() {
    ag = $f.current;
    q($f);
  }
  function Sh(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    c !== Ra && (a.timeoutHandle = Ra, Qa(c));
    if (null !== X) for (c = X["return"]; null !== c;) {
      var d = c;
      nd(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && mc();
          break;
        case 3:
          De();
          q(z);
          q(x);
          Ie();
          break;
        case 5:
          Fe(d);
          break;
        case 4:
          De();
          break;
        case 13:
          q(J);
          break;
        case 19:
          q(J);
          break;
        case 10:
          Md(d.type._context);
          break;
        case 22:
        case 23:
          Fg();
      }
      c = c["return"];
    }
    O = a;
    X = a = qe(a.current, null);
    Y = ag = b;
    R = 0;
    wh = null;
    yh = xh = be = 0;
    Ah = zh = null;
    if (null !== Qd) {
      for (b = 0; b < Qd.length; b++) {
        if (c = Qd[b], d = c.interleaved, null !== d) {
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
      Qd = null;
    }
    return a;
  }
  function Uh(a, b) {
    do {
      var c = X;
      try {
        Kd();
        Je.current = Ve;
        if (Me) {
          for (var d = K.memoizedState; null !== d;) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }
          Me = !1;
        }
        Le = 0;
        M = L = K = null;
        Ne = !1;
        Oe = 0;
        vh.current = null;
        if (null === c || null === c["return"]) {
          R = 1;
          wh = b;
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
              n = h,
              t = n.tag;
            if (0 === (n.mode & 1) && (0 === t || 11 === t || 15 === t)) {
              var p = n.alternate;
              p ? (n.updateQueue = p.updateQueue, n.memoizedState = p.memoizedState, n.lanes = p.lanes) : (n.updateQueue = null, n.memoizedState = null);
            }
            var B = Qf(g);
            if (null !== B) {
              B.flags &= -257;
              Rf(B, g, h, f, b);
              B.mode & 1 && Of(f, l, b);
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
                Of(f, l, b);
                og();
                break a;
              }
              k = Error(m(426));
            }
          } else if (F && h.mode & 1) {
            var za = Qf(g);
            if (null !== za) {
              0 === (za.flags & 65536) && (za.flags |= 256);
              Rf(za, g, h, f, b);
              Bd(Ff(k, h));
              break a;
            }
          }
          f = k = Ff(k, h);
          4 !== R && (R = 2);
          null === zh ? zh = [f] : zh.push(f);
          f = g;
          do {
            switch (f.tag) {
              case 3:
                f.flags |= 65536;
                b &= -b;
                f.lanes |= b;
                var E = Jf(f, k, b);
                $d(f, E);
                break a;
              case 1:
                h = k;
                var r = f.type,
                  u = f.stateNode;
                if (0 === (f.flags & 128) && ("function" === typeof r.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Nf || !Nf.has(u)))) {
                  f.flags |= 65536;
                  b &= -b;
                  f.lanes |= b;
                  var Db = Mf(f, h, b);
                  $d(f, Db);
                  break a;
                }
            }
            f = f["return"];
          } while (null !== f);
        }
        Zh(c);
      } catch (qc) {
        b = qc;
        X === c && null !== c && (X = c = c["return"]);
        continue;
      }
      break;
    } while (1);
  }
  function Rh() {
    var a = uh.current;
    uh.current = Ve;
    return null === a ? Ve : a;
  }
  function og() {
    if (0 === R || 3 === R || 2 === R) R = 4;
    null === O || 0 === (be & 268435455) && 0 === (xh & 268435455) || Kh(O, Y);
  }
  function Qh(a, b) {
    var c = H;
    H |= 2;
    var d = Rh();
    if (O !== a || Y !== b) Bh = null, Sh(a, b);
    do {
      try {
        $h();
        break;
      } catch (e) {
        Uh(a, e);
      }
    } while (1);
    Kd();
    H = c;
    uh.current = d;
    if (null !== X) throw Error(m(261));
    O = null;
    Y = 0;
    return R;
  }
  function $h() {
    for (; null !== X;) {
      ai(X);
    }
  }
  function Th() {
    for (; null !== X && !Lc();) {
      ai(X);
    }
  }
  function ai(a) {
    var b = bi(a.alternate, a, ag);
    a.memoizedProps = a.pendingProps;
    null === b ? Zh(a) : X = b;
    vh.current = null;
  }
  function Zh(a) {
    var b = a;
    do {
      var c = b.alternate;
      a = b["return"];
      if (0 === (b.flags & 32768)) {
        if (c = Cg(c, b, ag), null !== c) {
          X = c;
          return;
        }
      } else {
        c = Gg(c, b);
        if (null !== c) {
          c.flags &= 32767;
          X = c;
          return;
        }
        if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;else {
          R = 6;
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
    0 === R && (R = 5);
  }
  function Xh(a, b, c) {
    var d = C,
      e = W.transition;
    try {
      W.transition = null, C = 1, ci(a, b, c, d);
    } finally {
      W.transition = e, C = d;
    }
    return null;
  }
  function ci(a, b, c, d) {
    do {
      Ph();
    } while (null !== Eh);
    if (0 !== (H & 6)) throw Error(m(327));
    c = a.finishedWork;
    var e = a.finishedLanes;
    if (null === c) return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current) throw Error(m(177));
    a.callbackNode = null;
    a.callbackPriority = 0;
    var f = c.lanes | c.childLanes;
    Gc(a, f);
    a === O && (X = O = null, Y = 0);
    0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || Dh || (Dh = !0, Nh(Pc, function () {
      Ph();
      return null;
    }));
    f = 0 !== (c.flags & 15990);
    if (0 !== (c.subtreeFlags & 15990) || f) {
      f = W.transition;
      W.transition = null;
      var g = C;
      C = 1;
      var h = H;
      H |= 4;
      vh.current = null;
      Mg(a, c);
      ah(c, a);
      Ia(a.containerInfo);
      a.current = c;
      eh(c, a, e);
      Mc();
      H = h;
      C = g;
      W.transition = f;
    } else a.current = c;
    Dh && (Dh = !1, Eh = a, Fh = e);
    f = a.pendingLanes;
    0 === f && (Nf = null);
    Tc(c.stateNode, d);
    Lh(a, D());
    if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) {
      e = b[c], d(e.value, {
        componentStack: e.stack,
        digest: e.digest
      });
    }
    if (Kf) throw Kf = !1, a = Lf, Lf = null, a;
    0 !== (Fh & 1) && 0 !== a.tag && Ph();
    f = a.pendingLanes;
    0 !== (f & 1) ? a === Hh ? Gh++ : (Gh = 0, Hh = a) : Gh = 0;
    ad();
    return null;
  }
  function Ph() {
    if (null !== Eh) {
      var a = Ic(Fh),
        b = W.transition,
        c = C;
      try {
        W.transition = null;
        C = 16 > a ? 16 : a;
        if (null === Eh) var d = !1;else {
          a = Eh;
          Eh = null;
          Fh = 0;
          if (0 !== (H & 6)) throw Error(m(331));
          var e = H;
          H |= 4;
          for (T = a.current; null !== T;) {
            var f = T,
              g = f.child;
            if (0 !== (T.flags & 16)) {
              var h = f.deletions;
              if (null !== h) {
                for (var k = 0; k < h.length; k++) {
                  var l = h[k];
                  for (T = l; null !== T;) {
                    var n = T;
                    switch (n.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ng(8, n, f);
                    }
                    var t = n.child;
                    if (null !== t) t["return"] = n, T = t;else for (; null !== T;) {
                      n = T;
                      var p = n.sibling,
                        B = n["return"];
                      Qg(n);
                      if (n === l) {
                        T = null;
                        break;
                      }
                      if (null !== p) {
                        p["return"] = B;
                        T = p;
                        break;
                      }
                      T = B;
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
                T = f;
              }
            }
            if (0 !== (f.subtreeFlags & 2064) && null !== g) g["return"] = f, T = g;else b: for (; null !== T;) {
              f = T;
              if (0 !== (f.flags & 2048)) switch (f.tag) {
                case 0:
                case 11:
                case 15:
                  Ng(9, f, f["return"]);
              }
              var E = f.sibling;
              if (null !== E) {
                E["return"] = f["return"];
                T = E;
                break b;
              }
              T = f["return"];
            }
          }
          var r = a.current;
          for (T = r; null !== T;) {
            g = T;
            var u = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== u) u["return"] = g, T = u;else b: for (g = r; null !== T;) {
              h = T;
              if (0 !== (h.flags & 2048)) try {
                switch (h.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Og(9, h);
                }
              } catch (qc) {
                U(h, h["return"], qc);
              }
              if (h === g) {
                T = null;
                break b;
              }
              var Db = h.sibling;
              if (null !== Db) {
                Db["return"] = h["return"];
                T = Db;
                break b;
              }
              T = h["return"];
            }
          }
          H = e;
          ad();
          if (Sc && "function" === typeof Sc.onPostCommitFiberRoot) try {
            Sc.onPostCommitFiberRoot(Rc, a);
          } catch (qc) {}
          d = !0;
        }
        return d;
      } finally {
        C = c, W.transition = b;
      }
    }
    return !1;
  }
  function di(a, b, c) {
    b = Ff(c, b);
    b = Jf(a, b, 1);
    a = Yd(a, b, 1);
    b = I();
    null !== a && (Fc(a, 1, b), Lh(a, b));
  }
  function U(a, b, c) {
    if (3 === a.tag) di(a, a, c);else for (; null !== b;) {
      if (3 === b.tag) {
        di(b, a, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Nf || !Nf.has(d))) {
          a = Ff(c, a);
          a = Mf(b, a, 1);
          b = Yd(b, a, 1);
          a = I();
          null !== b && (Fc(b, 1, a), Lh(b, a));
          break;
        }
      }
      b = b["return"];
    }
  }
  function Pf(a, b, c) {
    var d = a.pingCache;
    null !== d && d["delete"](b);
    b = I();
    a.pingedLanes |= a.suspendedLanes & c;
    O === a && (Y & c) === c && (4 === R || 3 === R && (Y & 130023424) === Y && 500 > D() - ch ? Sh(a, 0) : yh |= c);
    Lh(a, b);
  }
  function ei(a, b) {
    0 === b && (0 === (a.mode & 1) ? b = 1 : (b = xc, xc <<= 1, 0 === (xc & 130023424) && (xc = 4194304)));
    var c = I();
    a = Td(a, b);
    null !== a && (Fc(a, b, c), Lh(a, c));
  }
  function pg(a) {
    var b = a.memoizedState,
      c = 0;
    null !== b && (c = b.retryLane);
    ei(a, c);
  }
  function Zg(a, b) {
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
        throw Error(m(314));
    }
    null !== d && d["delete"](b);
    ei(a, c);
  }
  var bi;
  bi = function bi(a, b, c) {
    if (null !== a) {
      if (a.memoizedProps !== b.pendingProps || z.current) G = !0;else {
        if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return G = !1, tg(a, b, c);
        G = 0 !== (a.flags & 131072) ? !0 : !1;
      }
    } else G = !1, F && 0 !== (b.flags & 1048576) && ld(b, ed, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d = b.type;
        dg(a, b);
        a = b.pendingProps;
        var e = lc(b, x.current);
        Od(b, c);
        e = Re(null, b, d, a, e, c);
        var f = We();
        b.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, A(d) ? (f = !0, pc(b)) : f = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, Vd(b), e.updater = he, b.stateNode = e, e._reactInternals = b, le(b, d, a, c), b = eg(null, b, d, !0, f, c)) : (b.tag = 0, F && f && md(b), P(null, b, e, c), b = b.child);
        return b;
      case 16:
        d = b.elementType;
        a: {
          dg(a, b);
          a = b.pendingProps;
          e = d._init;
          d = e(d._payload);
          b.type = d;
          e = b.tag = fi(d);
          a = Fd(d, a);
          switch (e) {
            case 0:
              b = Yf(null, b, d, a, c);
              break a;
            case 1:
              b = cg(null, b, d, a, c);
              break a;
            case 11:
              b = Tf(null, b, d, a, c);
              break a;
            case 14:
              b = Vf(null, b, d, Fd(d.type, a), c);
              break a;
          }
          throw Error(m(306, d, ""));
        }
        return b;
      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), Yf(a, b, d, e, c);
      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), cg(a, b, d, e, c);
      case 3:
        a: {
          fg(b);
          if (null === a) throw Error(m(387));
          d = b.pendingProps;
          f = b.memoizedState;
          e = f.element;
          Wd(a, b);
          ae(b, d, null, c);
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
              e = Ff(Error(m(423)), b);
              b = gg(a, b, d, c, e);
              break a;
            } else if (d !== e) {
              e = Ff(Error(m(424)), b);
              b = gg(a, b, d, c, e);
              break a;
            } else for (Va && (pd = Pb(b.stateNode.containerInfo), od = b, F = !0, rd = null, qd = !1), c = we(b, null, d, c), b.child = c; c;) {
              c.flags = c.flags & -3 | 4096, c = c.sibling;
            }
          } else {
            Ad();
            if (d === e) {
              b = Uf(a, b, c);
              break a;
            }
            P(a, b, d, c);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ee(b), null === a && wd(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Na(d, e) ? g = null : null !== f && Na(d, f) && (b.flags |= 32), bg(a, b), P(a, b, g, c), b.child;
      case 6:
        return null === a && wd(b), null;
      case 13:
        return jg(a, b, c);
      case 4:
        return Ce(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = ve(b, null, d, c) : P(a, b, d, c), b.child;
      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), Tf(a, b, d, e, c);
      case 7:
        return P(a, b, b.pendingProps, c), b.child;
      case 8:
        return P(a, b, b.pendingProps.children, c), b.child;
      case 12:
        return P(a, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          f = b.memoizedProps;
          g = e.value;
          Ld(b, d, g);
          if (null !== f) if (Vc(f.value, g)) {
            if (f.children === e.children && !z.current) {
              b = Uf(a, b, c);
              break a;
            }
          } else for (f = b.child, null !== f && (f["return"] = b); null !== f;) {
            var h = f.dependencies;
            if (null !== h) {
              g = f.child;
              for (var k = h.firstContext; null !== k;) {
                if (k.context === d) {
                  if (1 === f.tag) {
                    k = Xd(-1, c & -c);
                    k.tag = 2;
                    var l = f.updateQueue;
                    if (null !== l) {
                      l = l.shared;
                      var n = l.pending;
                      null === n ? k.next = k : (k.next = n.next, n.next = k);
                      l.pending = k;
                    }
                  }
                  f.lanes |= c;
                  k = f.alternate;
                  null !== k && (k.lanes |= c);
                  Nd(f["return"], c, b);
                  h.lanes |= c;
                  break;
                }
                k = k.next;
              }
            } else if (10 === f.tag) g = f.type === b.type ? null : f.child;else if (18 === f.tag) {
              g = f["return"];
              if (null === g) throw Error(m(341));
              g.lanes |= c;
              h = g.alternate;
              null !== h && (h.lanes |= c);
              Nd(g, c, b);
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
          P(a, b, e.children, c);
          b = b.child;
        }
        return b;
      case 9:
        return e = b.type, d = b.pendingProps.children, Od(b, c), e = Pd(e), d = d(e), b.flags |= 1, P(a, b, d, c), b.child;
      case 14:
        return d = b.type, e = Fd(d, b.pendingProps), e = Fd(d.type, e), Vf(a, b, d, e, c);
      case 15:
        return Xf(a, b, b.type, b.pendingProps, c);
      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), dg(a, b), b.tag = 1, A(d) ? (a = !0, pc(b)) : a = !1, Od(b, c), je(b, d, e), le(b, d, e, c), eg(null, b, d, !0, a, c);
      case 19:
        return sg(a, b, c);
      case 22:
        return Zf(a, b, c);
    }
    throw Error(m(156, b.tag));
  };
  function Nh(a, b) {
    return Jc(a, b);
  }
  function gi(a, b, c, d) {
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
  function td(a, b, c, d) {
    return new gi(a, b, c, d);
  }
  function Wf(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }
  function fi(a) {
    if ("function" === typeof a) return Wf(a) ? 1 : 0;
    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === ma) return 11;
      if (a === pa) return 14;
    }
    return 2;
  }
  function qe(a, b) {
    var c = a.alternate;
    null === c ? (c = td(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
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
  function se(a, b, c, d, e, f) {
    var g = 2;
    d = a;
    if ("function" === typeof a) Wf(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
      case ha:
        return ue(c.children, e, f, b);
      case ia:
        g = 8;
        e |= 8;
        break;
      case ja:
        return a = td(12, c, b, e | 2), a.elementType = ja, a.lanes = f, a;
      case na:
        return a = td(13, c, b, e), a.elementType = na, a.lanes = f, a;
      case oa:
        return a = td(19, c, b, e), a.elementType = oa, a.lanes = f, a;
      case ra:
        return kg(c, e, f, b);
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
        throw Error(m(130, null == a ? a : typeof a, ""));
    }
    b = td(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f;
    return b;
  }
  function ue(a, b, c, d) {
    a = td(7, a, d, b);
    a.lanes = c;
    return a;
  }
  function kg(a, b, c, d) {
    a = td(22, a, d, b);
    a.elementType = ra;
    a.lanes = c;
    a.stateNode = {
      isHidden: !1
    };
    return a;
  }
  function re(a, b, c) {
    a = td(6, a, null, b);
    a.lanes = c;
    return a;
  }
  function te(a, b, c) {
    b = td(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = {
      containerInfo: a.containerInfo,
      pendingChildren: null,
      implementation: a.implementation
    };
    return b;
  }
  function hi(a, b, c, d, e) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = Ra;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = Ec(0);
    this.expirationTimes = Ec(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = Ec(0);
    this.identifierPrefix = d;
    this.onRecoverableError = e;
    Va && (this.mutableSourceEagerHydrationData = null);
  }
  function ii(a, b, c, d, e, f, g, h, k) {
    a = new hi(a, b, c, h, k);
    1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;
    f = td(3, null, null, b);
    a.current = f;
    f.stateNode = a;
    f.memoizedState = {
      element: d,
      isDehydrated: c,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null
    };
    Vd(f);
    return a;
  }
  function ji(a) {
    if (!a) return jc;
    a = a._reactInternals;
    a: {
      if (wa(a) !== a || 1 !== a.tag) throw Error(m(170));
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
      throw Error(m(171));
    }
    if (1 === a.tag) {
      var c = a.type;
      if (A(c)) return oc(a, c, b);
    }
    return b;
  }
  function ki(a) {
    var b = a._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(m(188));
      a = Object.keys(a).join(",");
      throw Error(m(268, a));
    }
    a = Aa(b);
    return null === a ? null : a.stateNode;
  }
  function li(a, b) {
    a = a.memoizedState;
    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }
  function mi(a, b) {
    li(a, b);
    (a = a.alternate) && li(a, b);
  }
  function ni(a) {
    a = Aa(a);
    return null === a ? null : a.stateNode;
  }
  function oi() {
    return null;
  }
  exports.attemptContinuousHydration = function (a) {
    if (13 === a.tag) {
      var b = Td(a, 134217728);
      if (null !== b) {
        var c = I();
        ge(b, a, 134217728, c);
      }
      mi(a, 134217728);
    }
  };
  exports.attemptDiscreteHydration = function (a) {
    if (13 === a.tag) {
      var b = Td(a, 1);
      if (null !== b) {
        var c = I();
        ge(b, a, 1, c);
      }
      mi(a, 1);
    }
  };
  exports.attemptHydrationAtCurrentPriority = function (a) {
    if (13 === a.tag) {
      var b = fe(a),
        c = Td(a, b);
      if (null !== c) {
        var d = I();
        ge(c, a, b, d);
      }
      mi(a, b);
    }
  };
  exports.attemptSynchronousHydration = function (a) {
    switch (a.tag) {
      case 3:
        var b = a.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c = yc(b.pendingLanes);
          0 !== c && (Hc(b, c | 1), Lh(b, D()), 0 === (H & 6) && (Ch(), ad()));
        }
        break;
      case 13:
        Yh(function () {
          var b = Td(a, 1);
          if (null !== b) {
            var c = I();
            ge(b, a, 1, c);
          }
        }), mi(a, 1);
    }
  };
  exports.batchedUpdates = function (a, b) {
    var c = H;
    H |= 1;
    try {
      return a(b);
    } finally {
      H = c, 0 === H && (Ch(), Xc && ad());
    }
  };
  exports.createComponentSelector = function (a) {
    return {
      $$typeof: ih,
      value: a
    };
  };
  exports.createContainer = function (a, b, c, d, e, f, g) {
    return ii(a, b, !1, null, c, d, e, f, g);
  };
  exports.createHasPseudoClassSelector = function (a) {
    return {
      $$typeof: jh,
      value: a
    };
  };
  exports.createHydrationContainer = function (a, b, c, d, e, f, g, h, k) {
    a = ii(c, d, !0, a, e, f, g, h, k);
    a.context = ji(null);
    c = a.current;
    d = I();
    e = fe(c);
    f = Xd(d, e);
    f.callback = void 0 !== b && null !== b ? b : null;
    Yd(c, f, e);
    a.current.lanes = e;
    Fc(a, e, d);
    Lh(a, d);
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
      $$typeof: kh,
      value: a
    };
  };
  exports.createTestNameSelector = function (a) {
    return {
      $$typeof: lh,
      value: a
    };
  };
  exports.createTextSelector = function (a) {
    return {
      $$typeof: mh,
      value: a
    };
  };
  exports.deferredUpdates = function (a) {
    var b = C,
      c = W.transition;
    try {
      return W.transition = null, C = 16, a();
    } finally {
      C = b, W.transition = c;
    }
  };
  exports.discreteUpdates = function (a, b, c, d, e) {
    var f = C,
      g = W.transition;
    try {
      return W.transition = null, C = 1, a(b, c, d, e);
    } finally {
      C = f, W.transition = g, 0 === H && Ch();
    }
  };
  exports.findAllNodes = sh;
  exports.findBoundingRects = function (a, b) {
    if (!bb) throw Error(m(363));
    b = sh(a, b);
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
  exports.findHostInstance = ki;
  exports.findHostInstanceWithNoPortals = function (a) {
    a = ya(a);
    a = null !== a ? Ca(a) : null;
    return null === a ? null : a.stateNode;
  };
  exports.findHostInstanceWithWarning = function (a) {
    return ki(a);
  };
  exports.flushControlled = function (a) {
    var b = H;
    H |= 1;
    var c = W.transition,
      d = C;
    try {
      W.transition = null, C = 1, a();
    } finally {
      C = d, W.transition = c, H = b, 0 === H && (Ch(), ad());
    }
  };
  exports.flushPassiveEffects = Ph;
  exports.flushSync = Yh;
  exports.focusWithin = function (a, b) {
    if (!bb) throw Error(m(363));
    a = oh(a);
    b = rh(a, b);
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
    if (!bb) throw Error(m(363));
    var c = 0,
      d = [];
    a = [oh(a), 0];
    for (var e = 0; e < a.length;) {
      var f = a[e++],
        g = a[e++],
        h = b[g];
      if (5 !== f.tag || !fb(f)) if (ph(f, h) && (d.push(qh(h)), g++, g > c && (c = g)), g < b.length) for (f = f.child; null !== f;) {
        a.push(f, g), f = f.sibling;
      }
    }
    if (c < b.length) {
      for (a = []; c < b.length; c++) {
        a.push(qh(b[c]));
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
      findHostInstanceByFiber: ni,
      findFiberByHostInstance: a.findFiberByHostInstance || oi,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.2.0"
    };
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) a = !1;else {
      var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (b.isDisabled || !b.supportsFiber) a = !0;else {
        try {
          Rc = b.inject(a), Sc = b;
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
    if (!bb) throw Error(m(363));
    a = sh(a, b);
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
      f = I(),
      g = fe(e);
    c = ji(c);
    null === b.context ? b.context = c : b.pendingContext = c;
    b = Xd(f, g);
    b.payload = {
      element: a
    };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    a = Yd(e, b, g);
    null !== a && (ge(a, e, g, f), Zd(a, e, g));
    return g;
  };
  return exports;
};

/***/ }),

/***/ "./node_modules/react-reconciler/constants.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/react-reconciler/cjs/react-reconciler-constants.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/react-reconciler/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/react-reconciler/cjs/react-reconciler.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/react/cjs/react-jsx-runtime.production.min.js":
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


var f = __webpack_require__("./node_modules/react/index.js"),
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

/***/ "./node_modules/react/cjs/react.production.min.js":
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
exports.version = "18.2.0";

/***/ }),

/***/ "./node_modules/react/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/react/cjs/react.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js");
} else {}

/***/ }),

/***/ "../node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__("../node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./node_modules/@reactunity/material/dist/src/styles/globals.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".mat-elevation-0{box-shadow:none}.mat-elevation-1{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-2{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-3{box-shadow:0px 3px 3px -2px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-4{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-5{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-6{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-7{box-shadow:0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-8{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-9{box-shadow:0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-10{box-shadow:0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-11{box-shadow:0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-12{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-13{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-14{box-shadow:0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-15{box-shadow:0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-16{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-17{box-shadow:0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-18{box-shadow:0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-19{box-shadow:0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-20{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-21{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-22{box-shadow:0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}.mat-elevation-23{box-shadow:0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0,0,0,.12);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms}:root{font-size:16px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/index.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{background-color:#344769;color:#fff}.mat-button{background-color:rgba(0,0,0,0) !important;color:#fff !important;border-radius:6px;border-width:2px;border-color:#fff;margin:6px}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./node_modules/@reactunity/material/dist/src/button/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".button_host__Ykalb{appearance:none;overflow:hidden;background-color:#fff;color:#000;border-radius:4px;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.button_host__Ykalb.button_icon__CjVFL{border-radius:50%;aspect-ratio:1}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "button_host__Ykalb",
	"icon": "button_icon__CjVFL"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./node_modules/@reactunity/material/dist/src/ripple/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ripple_rippleParent__LEnsP{overflow:hidden}.ripple_ripple__-uN29{pointer-events:none;border-radius:50%;background-color:rgba(0,0,0,.1);position:absolute;transition:opacity 300ms ease-out,scale 450ms cubic-bezier(0, 0, 0.2, 1);translate:-50% -50%;scale:1}.ripple_ripple__-uN29:enter{scale:0}.ripple_ripple__-uN29:leave{opacity:0;transition:opacity 400ms ease-out,scale 450ms cubic-bezier(0, 0, 0.2, 1);state-duration:400ms}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"rippleParent": "ripple_rippleParent__LEnsP",
	"ripple": "ripple_ripple__-uN29"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./src/settings/index.module.scss":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".settings_host__EMprn{flex-direction:row}.settings_sidepanel__TeXpZ{flex-direction:column;align-items:stretch;padding:8px;padding-top:24px;padding-bottom:24px}.settings_main__J0wvX{flex-direction:column}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"host": "settings_host__EMprn",
	"sidepanel": "settings_sidepanel__TeXpZ",
	"main": "settings_main__J0wvX"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
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

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
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

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
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

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
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

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
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

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__("../node_modules/style-loader/dist/runtime/styleDomAPI.js");
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__("../node_modules/style-loader/dist/runtime/insertBySelector.js");
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__("../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__("../node_modules/style-loader/dist/runtime/insertStyleElement.js");
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__("../node_modules/style-loader/dist/runtime/styleTagTransform.js");
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./node_modules/@reactunity/material/dist/src/styles/globals.scss
var globals = __webpack_require__("../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./node_modules/@reactunity/material/dist/src/styles/globals.scss");
;// CONCATENATED MODULE: ./node_modules/@reactunity/material/dist/src/styles/globals.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(globals/* default */.Z, options);




       /* harmony default export */ const styles_globals = (globals/* default */.Z && globals/* default.locals */.Z.locals ? globals/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./node_modules/@reactunity/material/dist/src/styles/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
var react_namespaceObject = /*#__PURE__*/__webpack_require__.t(react, 2);
// EXTERNAL MODULE: ./node_modules/react-reconciler/constants.js
var constants = __webpack_require__("./node_modules/react-reconciler/constants.js");
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/version.js
var version = '0.15.2';
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/views/error-boundary.js
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


var ErrorBoundary = /** @class */function (_super) {
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
  ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  };
  ErrorBoundary.prototype.render = function () {
    var _a, _b;
    if (this.state.hasError) {
      return (0,jsx_runtime.jsxs)("view", __assign({
        id: '__react-unity-error-boundary',
        style: {
          color: 'crimson',
          padding: 20,
          fontSize: 16
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

;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/views/default-view.js


function DefaultView(_a) {
  var children = _a.children,
    withHelpers = _a.withHelpers,
    renderCount = _a.renderCount;
  return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: !withHelpers ? children : (0,jsx_runtime.jsx)(ErrorBoundary, {
      children: children
    }, renderCount)
  });
}
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/async/objects.js
var ObjectsRepo = /** @class */function () {
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

// EXTERNAL MODULE: ./node_modules/react-reconciler/index.js
var react_reconciler = __webpack_require__("./node_modules/react-reconciler/index.js");
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/diffing.js
var styleStringSymbol = '__style_as_string__';
var propDepths = {
  style: 1,
  data: 1,
  custom: 1
};
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
    var prop = null;
    // If style existed in the previous properties as string, set it to null
    if (propKey === 'style' && typeof lastProps.style === 'string') {
      (updatePayload = updatePayload || {})[styleStringSymbol] = null;
    } else {
      var depth = deepDiffing > 0 ? deepDiffing : propDepths[propKey] || 0;
      if (depth > 0) {
        prop = diffProperties(lastProps[propKey], {}, depth - 1);
        if (!prop) continue;
      }
      // For all other deleted properties we add it to the queue. We use
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
    } else {
      var depth = deepDiffing > 0 ? deepDiffing : propDepths[propKey] || 0;
      if (depth > 0) {
        prop = diffProperties(lastProp, nextProp, depth - 1);
        if (!prop) continue;
      }
    }
    (updatePayload = updatePayload || {})[propKey] = prop;
  }
  return updatePayload;
}
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/constants.js
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
function stringizePoolKey(key) {
  switch (typeof key) {
    case 'string':
      return key;
    case 'boolean':
      return key ? 'default' : '';
    case 'number':
      return key.toString();
    case 'undefined':
      return null;
    default:
      return '';
  }
}
function getAllowedProps(props, type) {
  var children = props.children,
    tag = props.tag,
    pool = props.pool,
    rest = __rest(props, ["children", "tag", "pool"]);
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
  },
  beforeActiveInstanceBlur: function beforeActiveInstanceBlur() {},
  afterActiveInstanceBlur: function afterActiveInstanceBlur() {},
  getInstanceFromNode: function getInstanceFromNode(node) {
    return undefined;
  },
  getInstanceFromScope: function getInstanceFromScope(scopeInstance) {
    return undefined;
  },
  prepareScopeUpdate: function prepareScopeUpdate(scopeInstance, instance) {}
};
var isDevelopment = "production" === 'development';
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/subcontexts/richtext.js
function parametrizeValue(value) {
  if (typeof value === 'number') return value + '';
  value = value + '';
  if (value.includes(' ') || value.includes('-')) return '"' + value + '"';
  return value;
}
function stringifyRichText(node) {
  var _a, _b, _c;
  if (node.hidden) return '';
  if ('text' in node) return node.text;
  var acc = [];
  var tag = node.tag;
  if (tag) {
    acc.push('<');
    acc.push(tag);
    if (((_a = node.attributes) === null || _a === void 0 ? void 0 : _a.value) != null) {
      var value = (_b = node.attributes) === null || _b === void 0 ? void 0 : _b.value;
      acc.push('=');
      acc.push(parametrizeValue(value));
    }
    for (var key in node.attributes) {
      if (key === 'value') continue;
      if (Object.prototype.hasOwnProperty.call(node.attributes, key)) {
        var value = node.attributes[key];
        if (value != null) {
          acc.push(' ');
          acc.push(key);
          acc.push('=');
          acc.push(parametrizeValue(value));
        }
      }
    }
    acc.push('>');
  }
  if (((_c = node.children) === null || _c === void 0 ? void 0 : _c.length) > 0) {
    for (var _i = 0, _d = node.children; _i < _d.length; _i++) {
      var child = _d[_i];
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
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/subcontexts/svg.js
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
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/subcontexts/index.js


var subContextRenderers = {
  'richtext': stringifyRichText,
  'svg': stringifySVG
};
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/async/callbacks.js
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

var CallbacksRepo = /** @class */function (_super) {
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

;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/async/serializer.js


var callbacksRepo = new CallbacksRepo();
var objectsRepo = new ObjectsRepo();
// Separates properties in 3 categories: regular props, callbacks and non-serializable objects
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
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/async/reconciler.js
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
        r: refId,
        k: stringizePoolKey(props.pool)
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
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/sync/reconciler.js
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
    return UnityBridge.createElement(props.tag || type, children, rootContainerInstance, aProps, stringizePoolKey(props.pool));
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
;// CONCATENATED MODULE: ./node_modules/@reactunity/renderer/dist/src/renderer/renderer.js








var containerMap = new Map();
var renderCount = 0;
function _render(element, options) {
  if (options === void 0) {
    options = {};
  }
  renderCount++;
  var hostContainer = (options === null || options === void 0 ? void 0 : options.hostContainer) || HostContainer;
  var cacheKey = hostContainer.InstanceId >= 0 ? hostContainer.InstanceId : hostContainer;
  var isAsync = !(options === null || options === void 0 ? void 0 : options.disableBatchRendering);
  var _a = containerMap.get(cacheKey) || {},
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
      var hostContainerInstance_1 = {
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
        hostContainerInstance_1.context.FlushCommands(serialized);
      };
      hostRoot = asyncReconciler.createContainer(hostContainerInstance_1, mode, null, false, undefined, '', function (error) {
        return console.error(error);
      }, null);
    } else {
      hostRoot = syncReconciler.createContainer(hostContainer, mode, null, false, undefined, '', function (error) {
        return console.error(error);
      }, null);
    }
    containerMap.set(cacheKey, {
      hostRoot: hostRoot,
      asyncJobCallback: asyncJobCallback
    });
  }
  var shouldWrapWithHelpers = !(options === null || options === void 0 ? void 0 : options.disableHelpers);
  if (shouldWrapWithHelpers) {
    var viewWrapperProps = {
      withHelpers: !(options === null || options === void 0 ? void 0 : options.disableHelpers),
      renderCount: renderCount
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
/**
 * @deprecated Instead, import `render` directly from `@reactunity/renderer`
 */

var Renderer = {
  render: function render(element, options) {
    if (options === void 0) {
      options = {};
    }
    return _render(element, options);
  }
};
var batchedUpdates = asyncReconciler.batchedUpdates;
var flushSync = asyncReconciler.flushSync;
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function toConsumableArray_toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function classCallCheck_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function createClass_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper.js



function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function slicedToArray_slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/construct.js


function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js




function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toArray.js




function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
;// CONCATENATED MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js

function createForOfIteratorHelper_createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
// EXTERNAL MODULE: ../node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("../node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js");
;// CONCATENATED MODULE: ../node_modules/@remix-run/router/dist/router.js












/**
 * @remix-run/router v1.4.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////
//#region Types and Constants
////////////////////////////////////////////////////////////////////////////////

/**
 * Actions represent the type of change to a location value.
 */
var Action;
(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */

  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */

  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));
var PopStateEventType = "popstate";
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 */

function router_createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    _options$initialEntri = _options.initialEntries,
    initialEntries = _options$initialEntri === void 0 ? ["/"] : _options$initialEntri,
    initialIndex = _options.initialIndex,
    _options$v5Compat = _options.v5Compat,
    v5Compat = _options$v5Compat === void 0 ? false : _options$v5Compat;
  var entries; // Declare so we can access from createMemoryLocation

  entries = initialEntries.map(function (entry, index) {
    return createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index === 0 ? "default" : undefined);
  });
  var index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  var action = Action.Pop;
  var listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }
    var location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }
  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  var history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref: createHref,
    createURL: function createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation: function encodeLocation(to) {
      var path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push: function push(to, state) {
      action = Action.Push;
      var nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({
          action: action,
          location: nextLocation,
          delta: 1
        });
      }
    },
    replace: function replace(to, state) {
      action = Action.Replace;
      var nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({
          action: action,
          location: nextLocation,
          delta: 0
        });
      }
    },
    go: function go(delta) {
      action = Action.Pop;
      var nextIndex = clampIndex(index + delta);
      var nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({
          action: action,
          location: nextLocation,
          delta: delta
        });
      }
    },
    listen: function listen(fn) {
      listener = fn;
      return function () {
        listener = null;
      };
    }
  };
  return history;
}
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */

function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window, globalHistory) {
    var _window$location = window.location,
      pathname = _window$location.pathname,
      search = _window$location.search,
      hash = _window$location.hash;
    return createLocation("", {
      pathname: pathname,
      search: search,
      hash: hash
    },
    // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createBrowserHref(window, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */

function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createHashLocation(window, globalHistory) {
    var _parsePath = parsePath(window.location.hash.substr(1)),
      _parsePath$pathname = _parsePath.pathname,
      pathname = _parsePath$pathname === void 0 ? "/" : _parsePath$pathname,
      _parsePath$search = _parsePath.search,
      search = _parsePath$search === void 0 ? "" : _parsePath$search,
      _parsePath$hash = _parsePath.hash,
      hash = _parsePath$hash === void 0 ? "" : _parsePath$hash;
    return createLocation("", {
      pathname: pathname,
      search: search,
      hash: hash
    },
    // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createHashHref(window, to) {
    var base = window.document.querySelector("base");
    var href = "";
    if (base && base.getAttribute("href")) {
      var url = window.location.href;
      var hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);
    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
/**
 * For browser-based histories, we combine the state and key into an object
 */

function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
/**
 * Creates a Location object with a unique key from the given Path
 */

function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  var location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state: state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */

function createPath(_ref) {
  var _ref$pathname = _ref.pathname,
    pathname = _ref$pathname === void 0 ? "/" : _ref$pathname,
    _ref$search = _ref.search,
    search = _ref$search === void 0 ? "" : _ref$search,
    _ref$hash = _ref.hash,
    hash = _ref$hash === void 0 ? "" : _ref$hash;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */

function parsePath(path) {
  var parsedPath = {};
  if (path) {
    var hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    var searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, _createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  var _options2 = options,
    _options2$window = _options2.window,
    window = _options2$window === void 0 ? document.defaultView : _options2$window,
    _options2$v5Compat = _options2.v5Compat,
    v5Compat = _options2$v5Compat === void 0 ? false : _options2$v5Compat;
  var globalHistory = window.history;
  var action = Action.Pop;
  var listener = null;
  var index = getIndex(); // Index should only be null when we initialize. If not, it's because the
  // user called history.pushState or history.replaceState directly, in which
  // case we should log a warning as it will result in bugs.

  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    var state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    var nextIndex = getIndex();
    var delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action: action,
        location: history.location,
        delta: delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    var location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    var historyState = getHistoryState(location, index);
    var url = history.createHref(location); // try...catch because iOS limits us to 100 pushState calls :/

    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      // They are going to lose state here, but there is no real
      // way to warn them about it since the page will refresh...
      window.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action: action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    var location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    var historyState = getHistoryState(location, index);
    var url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action: action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    // window.location.origin is "null" (the literal string value) in Firefox
    // under certain conditions, notably when serving from a local HTML file
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
    var base = window.location.origin !== "null" ? window.location.origin : window.location.href;
    var href = typeof to === "string" ? to : createPath(to);
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  var history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window, globalHistory);
    },
    listen: function listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return function () {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref: function createHref(to) {
      return _createHref(window, to);
    },
    createURL: createURL,
    encodeLocation: function encodeLocation(to) {
      // Encode a Location the same way window.location would
      var url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push: push,
    replace: replace,
    go: function go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
} //#endregion

var ResultType;
(function (ResultType) {
  ResultType["data"] = "data";
  ResultType["deferred"] = "deferred";
  ResultType["redirect"] = "redirect";
  ResultType["error"] = "error";
})(ResultType || (ResultType = {}));
var immutableRouteKeys = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function isIndexRoute(route) {
  return route.index === true;
} // Walk the route tree generating unique IDs where necessary so we are working
// solely with AgnosticDataRouteObject's within the Router

function convertRoutesToDataRoutes(routes, detectErrorBoundary, parentPath, manifest) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  if (manifest === void 0) {
    manifest = {};
  }
  return routes.map(function (route, index) {
    var treePath = [].concat(_toConsumableArray(parentPath), [index]);
    var id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!manifest[id], "Found a route id collision on id \"" + id + "\".  Route " + "id's must be globally unique within Data Router usages");
    if (isIndexRoute(route)) {
      var indexRoute = _extends({}, route, {
        hasErrorBoundary: detectErrorBoundary(route),
        id: id
      });
      manifest[id] = indexRoute;
      return indexRoute;
    } else {
      var pathOrLayoutRoute = _extends({}, route, {
        id: id,
        hasErrorBoundary: detectErrorBoundary(route),
        children: undefined
      });
      manifest[id] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, detectErrorBoundary, treePath, manifest);
      }
      return pathOrLayoutRoute;
    }
  });
}
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/utils/match-routes
 */

function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  var location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  var pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  var branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  var matches = null;
  for (var i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i],
    // Incoming pathnames are generally encoded from either window.location
    // or from router.navigate, but we want to match against the unencoded
    // paths in the route definitions.  Memory router locations won't be
    // encoded here but there also shouldn't be anything to decode so this
    // should be a safe operation.  This avoids needing matchRoutes to be
    // history-aware.
    safelyDecodeURI(pathname));
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  var flattenRoute = function flattenRoute(route, index, relativePath) {
    var meta = {
      relativePath: relativePath === undefined ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route: route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    var path = router_joinPaths([parentPath, meta.relativePath]);
    var routesMeta = parentsMeta.concat(meta); // Add the children before adding this route to the array so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.

    if (route.children && route.children.length > 0) {
      invariant(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
      flattenRoutes(route.children, branches, routesMeta, path);
    } // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.

    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path: path,
      score: computeScore(path, route.index),
      routesMeta: routesMeta
    });
  };
  routes.forEach(function (route, index) {
    var _route$path;

    // coarse-grain check for optional params
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      var _iterator = createForOfIteratorHelper_createForOfIteratorHelper(explodeOptionalSegments(route.path)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var exploded = _step.value;
          flattenRoute(route, index, exploded);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  });
  return branches;
}
/**
 * Computes all combinations of optional path segments for a given path,
 * excluding combinations that are ambiguous and of lower priority.
 *
 * For example, `/one/:two?/three/:four?/:five?` explodes to:
 * - `/one/three`
 * - `/one/:two/three`
 * - `/one/three/:four`
 * - `/one/three/:five`
 * - `/one/:two/three/:four`
 * - `/one/:two/three/:five`
 * - `/one/three/:four/:five`
 * - `/one/:two/three/:four/:five`
 */

function explodeOptionalSegments(path) {
  var segments = path.split("/");
  if (segments.length === 0) return [];
  var _segments = _toArray(segments),
    first = _segments[0],
    rest = _segments.slice(1); // Optional path segments are denoted by a trailing `?`

  var isOptional = first.endsWith("?"); // Compute the corresponding required segment: `foo?` -> `foo`

  var required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    // Intepret empty string as omitting an optional segment
    // `["one", "", "three"]` corresponds to omitting `:two` from `/one/:two?/three` -> `/one/three`
    return isOptional ? [required, ""] : [required];
  }
  var restExploded = explodeOptionalSegments(rest.join("/"));
  var result = []; // All child paths with the prefix.  Do this for all children before the
  // optional version for all children so we get consistent ordering where the
  // parent optional aspect is preferred as required.  Otherwise, we can get
  // child sections interspersed where deeper optional segments are higher than
  // parent optional segments, where for example, /:two would explodes _earlier_
  // then /:one.  By always including the parent as required _for all children_
  // first, we avoid this issue

  result.push.apply(result, toConsumableArray_toConsumableArray(restExploded.map(function (subpath) {
    return subpath === "" ? required : [required, subpath].join("/");
  }))); // Then if this is an optional value, add all child versions without

  if (isOptional) {
    result.push.apply(result, toConsumableArray_toConsumableArray(restExploded));
  } // for absolute paths, ensure `/` instead of empty segment

  return result.map(function (exploded) {
    return path.startsWith("/") && exploded === "" ? "/" : exploded;
  });
}
function rankRouteBranches(branches) {
  branches.sort(function (a, b) {
    return a.score !== b.score ? b.score - a.score // Higher score first
    : compareIndexes(a.routesMeta.map(function (meta) {
      return meta.childrenIndex;
    }), b.routesMeta.map(function (meta) {
      return meta.childrenIndex;
    }));
  });
}
var paramRe = /^:\w+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = function isSplat(s) {
  return s === "*";
};
function computeScore(path, index) {
  var segments = path.split("/");
  var initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter(function (s) {
    return !isSplat(s);
  }).reduce(function (score, segment) {
    return score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue);
  }, initialScore);
}
function compareIndexes(a, b) {
  var siblings = a.length === b.length && a.slice(0, -1).every(function (n, i) {
    return n === b[i];
  });
  return siblings ?
  // If two routes are siblings, we should try to match the earlier sibling
  // first. This allows people to have fine-grained control over the matching
  // behavior by simply putting routes with identical paths in the order they
  // want them tried.
  a[a.length - 1] - b[b.length - 1] :
  // Otherwise, it doesn't really make sense to rank non-siblings by index,
  // so they sort equally.
  0;
}
function matchRouteBranch(branch, pathname) {
  var routesMeta = branch.routesMeta;
  var matchedParams = {};
  var matchedPathname = "/";
  var matches = [];
  for (var i = 0; i < routesMeta.length; ++i) {
    var meta = routesMeta[i];
    var end = i === routesMeta.length - 1;
    var remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    var match = router_matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end: end
    }, remainingPathname);
    if (!match) return null;
    Object.assign(matchedParams, match.params);
    var route = meta.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: router_joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(router_joinPaths([matchedPathname, match.pathnameBase])),
      route: route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = router_joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/utils/generate-path
 */

function generatePath(originalPath, params) {
  if (params === void 0) {
    params = {};
  }
  var path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(false, "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
    path = path.replace(/\*$/, "/*");
  } // ensure `/` is added at the beginning if the path is absolute

  var prefix = path.startsWith("/") ? "/" : "";
  var segments = path.split(/\/+/).map(function (segment, index, array) {
    var isLastSegment = index === array.length - 1; // only apply the splat if it's the last segment

    if (isLastSegment && segment === "*") {
      var star = "*";
      var starParam = params[star]; // Apply the splat

      return starParam;
    }
    var keyMatch = segment.match(/^:(\w+)(\??)$/);
    if (keyMatch) {
      var _keyMatch = _slicedToArray(keyMatch, 3),
        key = _keyMatch[1],
        optional = _keyMatch[2];
      var param = params[key];
      if (optional === "?") {
        return param == null ? "" : param;
      }
      if (param == null) {
        invariant(false, "Missing \":" + key + "\" param");
      }
      return param;
    } // Remove any optional markers from optional static segments

    return segment.replace(/\?$/g, "");
  }) // Remove empty segments
  .filter(function (segment) {
    return !!segment;
  });
  return prefix + segments.join("/");
}
/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/utils/match-path
 */

function router_matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  var _compilePath = compilePath(pattern.path, pattern.caseSensitive, pattern.end),
    _compilePath2 = slicedToArray_slicedToArray(_compilePath, 2),
    matcher = _compilePath2[0],
    paramNames = _compilePath2[1];
  var match = pathname.match(matcher);
  if (!match) return null;
  var matchedPathname = match[0];
  var pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  var captureGroups = match.slice(1);
  var params = paramNames.reduce(function (memo, paramName, index) {
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === "*") {
      var splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
    return memo;
  }, {});
  return {
    params: params,
    pathname: matchedPathname,
    pathnameBase: pathnameBase,
    pattern: pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
  var paramNames = [];
  var regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
  .replace(/^\/*/, "/") // Make sure it has a leading /
  .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
  .replace(/\/:(\w+)/g, function (_, paramName) {
    paramNames.push(paramName);
    return "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" // Already matched the initial /, just match the rest
    : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  var matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
  return [matcher, paramNames];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a " + "malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
    return value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    warning(false, "The value for the URL param \"" + paramName + "\" will not be decoded because" + (" the string \"" + value + "\" is a malformed URL segment. This is probably") + (" due to a bad percent encoding (" + error + ")."));
    return value;
  }
}
/**
 * @private
 */

function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  } // We want to leave trailing slash behavior in the user's control, so if they
  // specify a basename with a trailing slash, we should support it

  var startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  var nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    // pathname does not start with basename/
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/utils/resolve-path
 */

function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  var _ref3 = typeof to === "string" ? parsePath(to) : to,
    toPathname = _ref3.pathname,
    _ref3$search = _ref3.search,
    search = _ref3$search === void 0 ? "" : _ref3$search,
    _ref3$hash = _ref3.hash,
    hash = _ref3$hash === void 0 ? "" : _ref3$hash;
  var pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname: pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  var segments = fromPathname.replace(/\/+$/, "").split("/");
  var relativeSegments = relativePath.split("/");
  relativeSegments.forEach(function (segment) {
    if (segment === "..") {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(_char, field, dest, path) {
  return "Cannot include a '" + _char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
/**
 * @private
 *
 * When processing relative navigation we want to ignore ancestor routes that
 * do not contribute to the path, such that index/pathless layout routes don't
 * interfere.
 *
 * For example, when moving a route element into an index route and/or a
 * pathless layout route, relative link behavior contained within should stay
 * the same.  Both of the following examples should link back to the root:
 *
 *   <Route path="/">
 *     <Route path="accounts" element={<Link to=".."}>
 *   </Route>
 *
 *   <Route path="/">
 *     <Route path="accounts">
 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
 *       </Route
 *     </Route>
 *   </Route>
 */

function getPathContributingMatches(matches) {
  return matches.filter(function (match, index) {
    return index === 0 || match.route.path && match.route.path.length > 0;
  });
}
/**
 * @private
 */

function router_resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  var to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  var isEmptyPath = toArg === "" || to.pathname === "";
  var toPathname = isEmptyPath ? "/" : to.pathname;
  var from; // Routing is relative to the current pathname if explicitly requested.
  //
  // If a pathname is explicitly provided in `to`, it should be relative to the
  // route context. This is explained in `Note on `<Link to>` values` in our
  // migration guide from v5 as a means of disambiguation between `to` values
  // that begin with `/` and those that do not. However, this is problematic for
  // `to` values that do not provide a pathname. `to` can simply be a search or
  // hash string, in which case we should assume that the navigation is relative
  // to the current location's pathname and *not* the route pathname.

  if (isPathRelative || toPathname == null) {
    from = locationPathname;
  } else {
    var routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      var toSegments = toPathname.split("/"); // Each leading .. segment means "go up one route" instead of "go up one
      // URL segment".  This is a key difference from how <a href> works and a
      // major reason we call this a "to" value instead of a "href".

      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    } // If there are more ".." segments than parent routes, resolve relative to
    // the root / URL.

    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  var path = resolvePath(to, from); // Ensure the pathname has a trailing slash if the original "to" had one

  var hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"); // Or if this was a link to the current path which has a trailing slash

  var hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
/**
 * @private
 */

function getToPathname(to) {
  // Empty strings should be treated the same as / paths
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
/**
 * @private
 */

var router_joinPaths = function joinPaths(paths) {
  return paths.join("/").replace(/\/\/+/g, "/");
};
/**
 * @private
 */

var normalizePathname = function normalizePathname(pathname) {
  return pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
};
/**
 * @private
 */

var normalizeSearch = function normalizeSearch(search) {
  return !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
};
/**
 * @private
 */

var normalizeHash = function normalizeHash(hash) {
  return !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
};
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 */

var json = function json(data, init) {
  if (init === void 0) {
    init = {};
  }
  var responseInit = typeof init === "number" ? {
    status: init
  } : init;
  var headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers: headers
  }));
};
var AbortedDeferredError = /*#__PURE__*/function (_Error) {
  _inherits(AbortedDeferredError, _Error);
  var _super = _createSuper(AbortedDeferredError);
  function AbortedDeferredError() {
    classCallCheck_classCallCheck(this, AbortedDeferredError);
    return _super.apply(this, arguments);
  }
  return createClass_createClass(AbortedDeferredError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var DeferredData = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function DeferredData(data, responseInit) {
    var _this = this;
    _classCallCheck(this, DeferredData);
    this.pendingKeysSet = new Set();
    this.subscribers = new Set();
    this.deferredKeys = [];
    invariant(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects"); // Set up an AbortController + Promise we can race against to exit early
    // cancellation

    var reject;
    this.abortPromise = new Promise(function (_, r) {
      return reject = r;
    });
    this.controller = new AbortController();
    var onAbort = function onAbort() {
      return reject(new AbortedDeferredError("Deferred data aborted"));
    };
    this.unlistenAbortSignal = function () {
      return _this.controller.signal.removeEventListener("abort", onAbort);
    };
    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data).reduce(function (acc, _ref) {
      var _ref4 = _slicedToArray(_ref, 2),
        key = _ref4[0],
        value = _ref4[1];
      return Object.assign(acc, _defineProperty({}, key, _this.trackPromise(key, value)));
    }, {});
    if (this.done) {
      // All incoming values were resolved
      this.unlistenAbortSignal();
    }
    this.init = responseInit;
  }
  _createClass(DeferredData, [{
    key: "trackPromise",
    value: function trackPromise(key, value) {
      var _this2 = this;
      if (!(value instanceof Promise)) {
        return value;
      }
      this.deferredKeys.push(key);
      this.pendingKeysSet.add(key); // We store a little wrapper promise that will be extended with
      // _data/_error props upon resolve/reject

      var promise = Promise.race([value, this.abortPromise]).then(function (data) {
        return _this2.onSettle(promise, key, null, data);
      }, function (error) {
        return _this2.onSettle(promise, key, error);
      }); // Register rejection listeners to avoid uncaught promise rejections on
      // errors or aborted deferred values

      promise["catch"](function () {});
      Object.defineProperty(promise, "_tracked", {
        get: function get() {
          return true;
        }
      });
      return promise;
    }
  }, {
    key: "onSettle",
    value: function onSettle(promise, key, error, data) {
      if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
        this.unlistenAbortSignal();
        Object.defineProperty(promise, "_error", {
          get: function get() {
            return error;
          }
        });
        return Promise.reject(error);
      }
      this.pendingKeysSet["delete"](key);
      if (this.done) {
        // Nothing left to abort!
        this.unlistenAbortSignal();
      }
      if (error) {
        Object.defineProperty(promise, "_error", {
          get: function get() {
            return error;
          }
        });
        this.emit(false, key);
        return Promise.reject(error);
      }
      Object.defineProperty(promise, "_data", {
        get: function get() {
          return data;
        }
      });
      this.emit(false, key);
      return data;
    }
  }, {
    key: "emit",
    value: function emit(aborted, settledKey) {
      this.subscribers.forEach(function (subscriber) {
        return subscriber(aborted, settledKey);
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(fn) {
      var _this3 = this;
      this.subscribers.add(fn);
      return function () {
        return _this3.subscribers["delete"](fn);
      };
    }
  }, {
    key: "cancel",
    value: function cancel() {
      var _this4 = this;
      this.controller.abort();
      this.pendingKeysSet.forEach(function (v, k) {
        return _this4.pendingKeysSet["delete"](k);
      });
      this.emit(true);
    }
  }, {
    key: "resolveData",
    value: function () {
      var _resolveData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(signal) {
        var _this5 = this;
        var aborted, onAbort;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                aborted = false;
                if (this.done) {
                  _context.next = 7;
                  break;
                }
                onAbort = function onAbort() {
                  return _this5.cancel();
                };
                signal.addEventListener("abort", onAbort);
                _context.next = 6;
                return new Promise(function (resolve) {
                  _this5.subscribe(function (aborted) {
                    signal.removeEventListener("abort", onAbort);
                    if (aborted || _this5.done) {
                      resolve(aborted);
                    }
                  });
                });
              case 6:
                aborted = _context.sent;
              case 7:
                return _context.abrupt("return", aborted);
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function resolveData(_x) {
        return _resolveData.apply(this, arguments);
      }
      return resolveData;
    }()
  }, {
    key: "done",
    get: function get() {
      return this.pendingKeysSet.size === 0;
    }
  }, {
    key: "unwrappedData",
    get: function get() {
      invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
      return Object.entries(this.data).reduce(function (acc, _ref2) {
        var _ref5 = _slicedToArray(_ref2, 2),
          key = _ref5[0],
          value = _ref5[1];
        return Object.assign(acc, _defineProperty({}, key, unwrapTrackedPromise(value)));
      }, {});
    }
  }, {
    key: "pendingKeys",
    get: function get() {
      return Array.from(this.pendingKeysSet);
    }
  }]);
  return DeferredData;
}()));
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value;
  }
  if (value._error) {
    throw value._error;
  }
  return value._data;
}
var defer = function defer(data, init) {
  if (init === void 0) {
    init = {};
  }
  var responseInit = typeof init === "number" ? {
    status: init
  } : init;
  return new DeferredData(data, responseInit);
};
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */

var redirect = function redirect(url, init) {
  if (init === void 0) {
    init = 302;
  }
  var responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  var headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers: headers
  }));
};
/**
 * @private
 * Utility class we use to hold auto-unwrapped 4xx/5xx Response bodies
 */
var ErrorResponse = /*#__PURE__*/(/* unused pure expression or super */ null && (_createClass(function ErrorResponse(status, statusText, data, internal) {
  _classCallCheck(this, ErrorResponse);
  if (internal === void 0) {
    internal = false;
  }
  this.status = status;
  this.statusText = statusText || "";
  this.internal = internal;
  if (data instanceof Error) {
    this.data = data.toString();
    this.error = data;
  } else {
    this.data = data;
  }
})));
/**
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response thrown from an action/loader
 */
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
var validMutationMethodsArr = ["post", "put", "patch", "delete"];
var validMutationMethods = new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["get"].concat(validMutationMethodsArr);
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
var redirectPreserveMethodStatusCodes = new Set([307, 308]);
var IDLE_NAVIGATION = {
  state: "idle",
  location: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
var IDLE_FETCHER = {
  state: "idle",
  data: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
var IDLE_BLOCKER = {
  state: "unblocked",
  proceed: undefined,
  reset: undefined,
  location: undefined
};
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var isServer = !isBrowser;
var defaultDetectErrorBoundary = function defaultDetectErrorBoundary(route) {
  return Boolean(route.hasErrorBoundary);
}; //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createRouter
////////////////////////////////////////////////////////////////////////////////

/**
 * Create a router and listen to history POP navigations
 */

function router_createRouter(init) {
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  var detectErrorBoundary = init.detectErrorBoundary || defaultDetectErrorBoundary; // Routes keyed by ID

  var manifest = {}; // Routes in tree format for matching

  var dataRoutes = convertRoutesToDataRoutes(init.routes, detectErrorBoundary, undefined, manifest);
  var inFlightDataRoutes; // Cleanup function for history

  var unlistenHistory = null; // Externally-provided functions to call on all state changes

  var subscribers = new Set(); // Externally-provided object to hold scroll restoration locations during routing

  var savedScrollPositions = null; // Externally-provided function to get scroll restoration keys

  var getScrollRestorationKey = null; // Externally-provided function to get current scroll position

  var getScrollPosition = null; // One-time flag to control the initial hydration scroll restoration.  Because
  // we don't get the saved positions from <ScrollRestoration /> until _after_
  // the initial render, we need to manually trigger a separate updateState to
  // send along the restoreScrollPosition
  // Set to true if we have `hydrationData` since we assume we were SSR'd and that
  // SSR did the initial scroll restoration.

  var initialScrollRestored = init.hydrationData != null;
  var initialMatches = matchRoutes(dataRoutes, init.history.location, init.basename);
  var initialErrors = null;
  if (initialMatches == null) {
    // If we do not match a user-provided-route, fall back to the root
    // to allow the error boundary to take over
    var error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    var _getShortCircuitMatch = getShortCircuitMatches(dataRoutes),
      matches = _getShortCircuitMatch.matches,
      route = _getShortCircuitMatch.route;
    initialMatches = matches;
    initialErrors = _defineProperty({}, route.id, error);
  }
  var initialized =
  // All initialMatches need to be loaded before we're ready.  If we have lazy
  // functions around still then we'll need to run them in initialize()
  !initialMatches.some(function (m) {
    return m.route.lazy;
  }) && (
  // And we have to either have no loaders or have been provided hydrationData
  !initialMatches.some(function (m) {
    return m.route.loader;
  }) || init.hydrationData != null);
  var router;
  var state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized: initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: new Map(),
    blockers: new Map()
  }; // -- Stateful internal variables to manage navigations --
  // Current navigation in progress (to be committed in completeNavigation)

  var pendingAction = Action.Pop; // Should the current navigation prevent the scroll reset if scroll cannot
  // be restored?

  var pendingPreventScrollReset = false; // AbortController for the active navigation

  var pendingNavigationController; // We use this to avoid touching history in completeNavigation if a
  // revalidation is entirely uninterrupted

  var isUninterruptedRevalidation = false; // Use this internal flag to force revalidation of all loaders:
  //  - submissions (completed or interrupted)
  //  - useRevalidate()
  //  - X-Remix-Revalidate (from redirect)

  var isRevalidationRequired = false; // Use this internal array to capture routes that require revalidation due
  // to a cancelled deferred on action submission

  var cancelledDeferredRoutes = []; // Use this internal array to capture fetcher loads that were cancelled by an
  // action navigation and require revalidation

  var cancelledFetcherLoads = []; // AbortControllers for any in-flight fetchers

  var fetchControllers = new Map(); // Track loads based on the order in which they started

  var incrementingLoadId = 0; // Track the outstanding pending navigation data load to be compared against
  // the globally incrementing load when a fetcher load lands after a completed
  // navigation

  var pendingNavigationLoadId = -1; // Fetchers that triggered data reloads as a result of their actions

  var fetchReloadIds = new Map(); // Fetchers that triggered redirect navigations from their actions

  var fetchRedirectIds = new Set(); // Most recent href/match for fetcher.load calls for fetchers

  var fetchLoadMatches = new Map(); // Store DeferredData instances for active route matches.  When a
  // route loader returns defer() we stick one in here.  Then, when a nested
  // promise resolves we update loaderData.  If a new navigation starts we
  // cancel active deferreds for eliminated routes.

  var activeDeferreds = new Map(); // Store blocker functions in a separate Map outside of router state since
  // we don't need to update UI state if they change

  var blockerFunctions = new Map(); // Flag to ignore the next history update, so we can revert the URL change on
  // a POP navigation that was blocked by the user without touching router state

  var ignoreNextHistoryUpdate = false; // Initialize the router, all side effects should be kicked off from here.
  // Implemented as a Fluent API for ease of:
  //   let router = createRouter(init).initialize();

  function initialize() {
    // If history informs us of a POP navigation, start the navigation but do not update
    // state.  We'll update our own state once the navigation completes
    unlistenHistory = init.history.listen(function (_ref) {
      var historyAction = _ref.action,
        location = _ref.location,
        delta = _ref.delta;

      // Ignore this event if it was just us resetting the URL from a
      // blocked POP navigation
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = false;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location " + "that was not created by @remix-run/router. This will fail silently in " + "production. This can happen if you are navigating outside the router " + "via `window.history.pushState`/`window.location.hash` instead of using " + "router navigation APIs.  This can also happen if you are using " + "createHashRouter and the user manually changes the URL.");
      var blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction: historyAction
      });
      if (blockerKey && delta != null) {
        // Restore the URL to match the current UI, but don't update router state
        ignoreNextHistoryUpdate = true;
        init.history.go(delta * -1); // Put the blocker into a blocked state

        updateBlocker(blockerKey, {
          state: "blocked",
          location: location,
          proceed: function proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: undefined,
              reset: undefined,
              location: location
            }); // Re-do the same POP navigation we just blocked

            init.history.go(delta);
          },
          reset: function reset() {
            deleteBlocker(blockerKey);
            updateState({
              blockers: new Map(router.state.blockers)
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    });
    if (state.initialized) {
      return router;
    }
    var lazyMatches = state.matches.filter(function (m) {
      return m.route.lazy;
    });
    if (lazyMatches.length === 0) {
      // Kick off initial data load if needed.  Use Pop to avoid modifying history
      startNavigation(Action.Pop, state.location);
      return router;
    } // Load lazy modules, then kick off initial data load if needed

    var lazyPromises = lazyMatches.map(function (m) {
      return loadLazyRouteModule(m.route, detectErrorBoundary, manifest);
    });
    Promise.all(lazyPromises).then(function () {
      var initialized = !state.matches.some(function (m) {
        return m.route.loader;
      }) || init.hydrationData != null;
      if (initialized) {
        // We already have required loaderData so we can just set initialized
        updateState({
          initialized: true
        });
      } else {
        // We still need to kick off initial data loads
        startNavigation(Action.Pop, state.location);
      }
    });
    return router;
  } // Clean up a router and it's side effects

  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach(function (_, key) {
      return deleteFetcher(key);
    });
    state.blockers.forEach(function (_, key) {
      return deleteBlocker(key);
    });
  } // Subscribe to state updates for the router

  function subscribe(fn) {
    subscribers.add(fn);
    return function () {
      return subscribers["delete"](fn);
    };
  } // Update our state and notify the calling context of the change

  function updateState(newState) {
    state = _extends({}, state, newState);
    subscribers.forEach(function (subscriber) {
      return subscriber(state);
    });
  } // Complete a navigation returning the state.navigation back to the IDLE_NAVIGATION
  // and setting state.[historyAction/location/matches] to the new route.
  // - Location is a required param
  // - Navigation will always be set to IDLE_NAVIGATION
  // - Can pass any other state in newState

  function completeNavigation(location, newState) {
    var _location$state, _location$state2;

    // Deduce if we're in a loading/actionReload state:
    // - We have committed actionData in the store
    // - The current navigation was a mutation submission
    // - We're past the submitting state and into the loading state
    // - The location being loaded is not the result of a redirect
    var isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
    var actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        // Empty actionData -> clear prior actionData due to an action error
        actionData = null;
      }
    } else if (isActionReload) {
      // Keep the current data if we're wrapping up the action reload
      actionData = state.actionData;
    } else {
      // Clear actionData on any other completed navigations
      actionData = null;
    } // Always preserve any existing loaderData from re-used routes

    var loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData; // On a successful navigation we can assume we got through all blockers
    // so we can start fresh
    var _iterator2 = _createForOfIteratorHelper(blockerFunctions),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = _slicedToArray(_step2.value, 1),
          key = _step2$value[0];
        deleteBlocker(key);
      } // Always respect the user flag.  Otherwise don't reset on mutation
      // submission navigations unless they redirect
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = undefined;
    }
    updateState(_extends({}, newState, {
      actionData: actionData,
      loaderData: loaderData,
      historyAction: pendingAction,
      location: location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset: preventScrollReset,
      blockers: new Map(state.blockers)
    }));
    if (isUninterruptedRevalidation) ;else if (pendingAction === Action.Pop) ;else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    } // Reset stateful navigation vars

    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
    cancelledFetcherLoads = [];
  } // Trigger a navigation event, which can either be a numerical POP or a PUSH
  // replace with an optional submission
  function navigate(_x2, _x3) {
    return _navigate.apply(this, arguments);
  } // Revalidate all current loaders.  If a navigation is in progress or if this
  // is interrupted by a navigation, allow this to "succeed" by calling all
  // loaders during the next loader round
  function _navigate() {
    _navigate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(to, opts) {
      var _normalizeNavigateOpt2, path, submission, error, currentLocation, nextLocation, userReplace, historyAction, preventScrollReset, blockerKey;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(typeof to === "number")) {
                _context2.next = 3;
                break;
              }
              init.history.go(to);
              return _context2.abrupt("return");
            case 3:
              _normalizeNavigateOpt2 = normalizeNavigateOptions(to, opts), path = _normalizeNavigateOpt2.path, submission = _normalizeNavigateOpt2.submission, error = _normalizeNavigateOpt2.error;
              currentLocation = state.location;
              nextLocation = createLocation(state.location, path, opts && opts.state); // When using navigate as a PUSH/REPLACE we aren't reading an already-encoded
              // URL from window.location, so we need to encode it here so the behavior
              // remains the same as POP and non-data-router usages.  new URL() does all
              // the same encoding we'd get from a history.pushState/window.location read
              // without having to touch history
              nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
              userReplace = opts && opts.replace != null ? opts.replace : undefined;
              historyAction = Action.Push;
              if (userReplace === true) {
                historyAction = Action.Replace;
              } else if (userReplace === false) ;else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
                // By default on submissions to the current location we REPLACE so that
                // users don't have to double-click the back button to get to the prior
                // location.  If the user redirects to a different location from the
                // action/loader this will be ignored and the redirect will be a PUSH
                historyAction = Action.Replace;
              }
              preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : undefined;
              blockerKey = shouldBlockNavigation({
                currentLocation: currentLocation,
                nextLocation: nextLocation,
                historyAction: historyAction
              });
              if (!blockerKey) {
                _context2.next = 15;
                break;
              }
              // Put the blocker into a blocked state
              updateBlocker(blockerKey, {
                state: "blocked",
                location: nextLocation,
                proceed: function proceed() {
                  updateBlocker(blockerKey, {
                    state: "proceeding",
                    proceed: undefined,
                    reset: undefined,
                    location: nextLocation
                  }); // Send the same navigation through

                  navigate(to, opts);
                },
                reset: function reset() {
                  deleteBlocker(blockerKey);
                  updateState({
                    blockers: new Map(state.blockers)
                  });
                }
              });
              return _context2.abrupt("return");
            case 15:
              _context2.next = 17;
              return startNavigation(historyAction, nextLocation, {
                submission: submission,
                // Send through the formData serialization error if we have one so we can
                // render at the right error boundary after we match routes
                pendingError: error,
                preventScrollReset: preventScrollReset,
                replace: opts && opts.replace
              });
            case 17:
              return _context2.abrupt("return", _context2.sent);
            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _navigate.apply(this, arguments);
  }
  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    }); // If we're currently submitting an action, we don't need to start a new
    // navigation, we'll just let the follow up loader execution call all loaders

    if (state.navigation.state === "submitting") {
      return;
    } // If we're currently in an idle state, start a new navigation for the current
    // action/location and mark it as uninterrupted, which will skip the history
    // update in completeNavigation

    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    } // Otherwise, if we're currently in a loading state, just start a new
    // navigation to the navigation.location but do not trigger an uninterrupted
    // revalidation so that history correctly updates once the navigation completes

    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation
    });
  } // Start a navigation to the given action/location.  Can optionally provide a
  // overrideNavigation which will override the normalLoad in the case of a redirect
  // navigation
  function startNavigation(_x4, _x5, _x6) {
    return _startNavigation.apply(this, arguments);
  } // Call the action matched by the leaf route for this navigation and handle
  // redirects/errors
  function _startNavigation() {
    _startNavigation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(historyAction, location, opts) {
      var routesToUse, loadingNavigation, matches, _error, _getShortCircuitMatch2, notFoundMatches, _route, request, pendingActionData, pendingError, actionOutput, navigation, _yield$handleLoaders, shortCircuited, loaderData, errors;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Abort any in-progress navigations and start a new one. Unset any ongoing
              // uninterrupted revalidations unless told otherwise, since we want this
              // new navigation to update history normally
              pendingNavigationController && pendingNavigationController.abort();
              pendingNavigationController = null;
              pendingAction = historyAction;
              isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true; // Save the current scroll position every time we start a new navigation,
              // and track whether we should reset scroll on completion

              saveScrollPosition(state.location, state.matches);
              pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
              routesToUse = inFlightDataRoutes || dataRoutes;
              loadingNavigation = opts && opts.overrideNavigation;
              matches = matchRoutes(routesToUse, location, init.basename); // Short circuit with a 404 on the root error boundary if we match nothing
              if (matches) {
                _context3.next = 15;
                break;
              }
              _error = getInternalRouterError(404, {
                pathname: location.pathname
              });
              _getShortCircuitMatch2 = getShortCircuitMatches(routesToUse), notFoundMatches = _getShortCircuitMatch2.matches, _route = _getShortCircuitMatch2.route; // Cancel all pending deferred on 404s since we don't keep any routes
              cancelActiveDeferreds();
              completeNavigation(location, {
                matches: notFoundMatches,
                loaderData: {},
                errors: _defineProperty({}, _route.id, _error)
              });
              return _context3.abrupt("return");
            case 15:
              if (!(isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod)))) {
                _context3.next = 18;
                break;
              }
              completeNavigation(location, {
                matches: matches
              });
              return _context3.abrupt("return");
            case 18:
              // Create a controller/Request for this navigation

              pendingNavigationController = new AbortController();
              request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
              if (!(opts && opts.pendingError)) {
                _context3.next = 24;
                break;
              }
              // If we have a pendingError, it means the user attempted a GET submission
              // with binary FormData so assign here and skip to handleLoaders.  That
              // way we handle calling loaders above the boundary etc.  It's not really
              // different from an actionError in that sense.
              pendingError = _defineProperty({}, findNearestBoundary(matches).route.id, opts.pendingError);
              _context3.next = 35;
              break;
            case 24:
              if (!(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
                _context3.next = 35;
                break;
              }
              _context3.next = 27;
              return handleAction(request, location, opts.submission, matches, {
                replace: opts.replace
              });
            case 27:
              actionOutput = _context3.sent;
              if (!actionOutput.shortCircuited) {
                _context3.next = 30;
                break;
              }
              return _context3.abrupt("return");
            case 30:
              pendingActionData = actionOutput.pendingActionData;
              pendingError = actionOutput.pendingActionError;
              navigation = _extends({
                state: "loading",
                location: location
              }, opts.submission);
              loadingNavigation = navigation; // Create a GET request for the loaders

              request = new Request(request.url, {
                signal: request.signal
              });
            case 35:
              _context3.next = 37;
              return handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.replace, pendingActionData, pendingError);
            case 37:
              _yield$handleLoaders = _context3.sent;
              shortCircuited = _yield$handleLoaders.shortCircuited;
              loaderData = _yield$handleLoaders.loaderData;
              errors = _yield$handleLoaders.errors;
              if (!shortCircuited) {
                _context3.next = 43;
                break;
              }
              return _context3.abrupt("return");
            case 43:
              // Clean up now that the action/loaders have completed.  Don't clean up if
              // we short circuited because pendingNavigationController will have already
              // been assigned to a new controller for the next navigation

              pendingNavigationController = null;
              completeNavigation(location, _extends({
                matches: matches
              }, pendingActionData ? {
                actionData: pendingActionData
              } : {}, {
                loaderData: loaderData,
                errors: errors
              }));
            case 45:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _startNavigation.apply(this, arguments);
  }
  function handleAction(_x7, _x8, _x9, _x10, _x11) {
    return _handleAction.apply(this, arguments);
  } // Call all applicable loaders for the given matches, handling redirects,
  // errors, etc.
  function _handleAction() {
    _handleAction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(request, location, submission, matches, opts) {
      var navigation, result, actionMatch, replace, boundaryMatch;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              interruptActiveLoads(); // Put us in a submitting state
              navigation = _extends({
                state: "submitting",
                location: location
              }, submission);
              updateState({
                navigation: navigation
              }); // Call our action and get the result
              actionMatch = getTargetMatch(matches, location);
              if (!(!actionMatch.route.action && !actionMatch.route.lazy)) {
                _context4.next = 8;
                break;
              }
              result = {
                type: ResultType.error,
                error: getInternalRouterError(405, {
                  method: request.method,
                  pathname: location.pathname,
                  routeId: actionMatch.route.id
                })
              };
              _context4.next = 13;
              break;
            case 8:
              _context4.next = 10;
              return callLoaderOrAction("action", request, actionMatch, matches, manifest, detectErrorBoundary, router.basename);
            case 10:
              result = _context4.sent;
              if (!request.signal.aborted) {
                _context4.next = 13;
                break;
              }
              return _context4.abrupt("return", {
                shortCircuited: true
              });
            case 13:
              if (!isRedirectResult(result)) {
                _context4.next = 18;
                break;
              }
              if (opts && opts.replace != null) {
                replace = opts.replace;
              } else {
                // If the user didn't explicity indicate replace behavior, replace if
                // we redirected to the exact same location we're currently at to avoid
                // double back-buttons
                replace = result.location === state.location.pathname + state.location.search;
              }
              _context4.next = 17;
              return startRedirectNavigation(state, result, {
                submission: submission,
                replace: replace
              });
            case 17:
              return _context4.abrupt("return", {
                shortCircuited: true
              });
            case 18:
              if (!isErrorResult(result)) {
                _context4.next = 22;
                break;
              }
              // Store off the pending error - we use it to determine which loaders
              // to call and will commit it when we complete the navigation
              boundaryMatch = findNearestBoundary(matches, actionMatch.route.id); // By default, all submissions are REPLACE navigations, but if the
              // action threw an error that'll be rendered in an errorElement, we fall
              // back to PUSH so that the user can use the back button to get back to
              // the pre-submission form location to try again
              if ((opts && opts.replace) !== true) {
                pendingAction = Action.Push;
              }
              return _context4.abrupt("return", {
                // Send back an empty object we can use to clear out any prior actionData
                pendingActionData: {},
                pendingActionError: _defineProperty({}, boundaryMatch.route.id, result.error)
              });
            case 22:
              if (!isDeferredResult(result)) {
                _context4.next = 24;
                break;
              }
              throw getInternalRouterError(400, {
                type: "defer-action"
              });
            case 24:
              return _context4.abrupt("return", {
                pendingActionData: _defineProperty({}, actionMatch.route.id, result.data)
              });
            case 25:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _handleAction.apply(this, arguments);
  }
  function handleLoaders(_x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19) {
    return _handleLoaders.apply(this, arguments);
  }
  function _handleLoaders() {
    _handleLoaders = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(request, location, matches, overrideNavigation, submission, replace, pendingActionData, pendingError) {
      var loadingNavigation, navigation, activeSubmission, routesToUse, _getMatchesToLoad, _getMatchesToLoad2, matchesToLoad, revalidatingFetchers, actionData, _yield$callLoadersAnd, results, loaderResults, fetcherResults, redirect, _processLoaderData, loaderData, errors, didAbortFetchLoads;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              // Figure out the right navigation we want to use for data loading
              loadingNavigation = overrideNavigation;
              if (!loadingNavigation) {
                navigation = _extends({
                  state: "loading",
                  location: location,
                  formMethod: undefined,
                  formAction: undefined,
                  formEncType: undefined,
                  formData: undefined
                }, submission);
                loadingNavigation = navigation;
              } // If this was a redirect from an action we don't have a "submission" but
              // we have it on the loading navigation so use that if available
              activeSubmission = submission ? submission : loadingNavigation.formMethod && loadingNavigation.formAction && loadingNavigation.formData && loadingNavigation.formEncType ? {
                formMethod: loadingNavigation.formMethod,
                formAction: loadingNavigation.formAction,
                formData: loadingNavigation.formData,
                formEncType: loadingNavigation.formEncType
              } : undefined;
              routesToUse = inFlightDataRoutes || dataRoutes;
              _getMatchesToLoad = getMatchesToLoad(init.history, state, matches, activeSubmission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, init.basename, pendingActionData, pendingError), _getMatchesToLoad2 = _slicedToArray(_getMatchesToLoad, 2), matchesToLoad = _getMatchesToLoad2[0], revalidatingFetchers = _getMatchesToLoad2[1]; // Cancel pending deferreds for no-longer-matched routes or routes we're
              // about to reload.  Note that if this is an action reload we would have
              // already cancelled all pending deferreds so this would be a no-op
              cancelActiveDeferreds(function (routeId) {
                return !(matches && matches.some(function (m) {
                  return m.route.id === routeId;
                })) || matchesToLoad && matchesToLoad.some(function (m) {
                  return m.route.id === routeId;
                });
              }); // Short circuit if we have no loaders to run
              if (!(matchesToLoad.length === 0 && revalidatingFetchers.length === 0)) {
                _context5.next = 9;
                break;
              }
              completeNavigation(location, _extends({
                matches: matches,
                loaderData: {},
                // Commit pending error if we're short circuiting
                errors: pendingError || null
              }, pendingActionData ? {
                actionData: pendingActionData
              } : {}));
              return _context5.abrupt("return", {
                shortCircuited: true
              });
            case 9:
              // If this is an uninterrupted revalidation, we remain in our current idle
              // state.  If not, we need to switch to our loading state and load data,
              // preserving any new action data or existing action data (in the case of
              // a revalidation interrupting an actionReload)

              if (!isUninterruptedRevalidation) {
                revalidatingFetchers.forEach(function (rf) {
                  var fetcher = state.fetchers.get(rf.key);
                  var revalidatingFetcher = {
                    state: "loading",
                    data: fetcher && fetcher.data,
                    formMethod: undefined,
                    formAction: undefined,
                    formEncType: undefined,
                    formData: undefined,
                    " _hasFetcherDoneAnything ": true
                  };
                  state.fetchers.set(rf.key, revalidatingFetcher);
                });
                actionData = pendingActionData || state.actionData;
                updateState(_extends({
                  navigation: loadingNavigation
                }, actionData ? Object.keys(actionData).length === 0 ? {
                  actionData: null
                } : {
                  actionData: actionData
                } : {}, revalidatingFetchers.length > 0 ? {
                  fetchers: new Map(state.fetchers)
                } : {}));
              }
              pendingNavigationLoadId = ++incrementingLoadId;
              revalidatingFetchers.forEach(function (rf) {
                return fetchControllers.set(rf.key, pendingNavigationController);
              });
              _context5.next = 14;
              return callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
            case 14:
              _yield$callLoadersAnd = _context5.sent;
              results = _yield$callLoadersAnd.results;
              loaderResults = _yield$callLoadersAnd.loaderResults;
              fetcherResults = _yield$callLoadersAnd.fetcherResults;
              if (!request.signal.aborted) {
                _context5.next = 20;
                break;
              }
              return _context5.abrupt("return", {
                shortCircuited: true
              });
            case 20:
              // Clean up _after_ loaders have completed.  Don't clean up if we short
              // circuited because fetchControllers would have been aborted and
              // reassigned to new controllers for the next navigation

              revalidatingFetchers.forEach(function (rf) {
                return fetchControllers["delete"](rf.key);
              }); // If any loaders returned a redirect Response, start a new REPLACE navigation
              redirect = findRedirect(results);
              if (!redirect) {
                _context5.next = 26;
                break;
              }
              _context5.next = 25;
              return startRedirectNavigation(state, redirect, {
                replace: replace
              });
            case 25:
              return _context5.abrupt("return", {
                shortCircuited: true
              });
            case 26:
              // Process and commit output from loaders
              _processLoaderData = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds), loaderData = _processLoaderData.loaderData, errors = _processLoaderData.errors; // Wire up subscribers to update loaderData as promises settle
              activeDeferreds.forEach(function (deferredData, routeId) {
                deferredData.subscribe(function (aborted) {
                  // Note: No need to updateState here since the TrackedPromise on
                  // loaderData is stable across resolve/reject
                  // Remove this instance if we were aborted or if promises have settled
                  if (aborted || deferredData.done) {
                    activeDeferreds["delete"](routeId);
                  }
                });
              });
              markFetchRedirectsDone();
              didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
              return _context5.abrupt("return", _extends({
                loaderData: loaderData,
                errors: errors
              }, didAbortFetchLoads || revalidatingFetchers.length > 0 ? {
                fetchers: new Map(state.fetchers)
              } : {}));
            case 31:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _handleLoaders.apply(this, arguments);
  }
  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER;
  } // Trigger a fetcher load/submit for the given fetcher key

  function fetch(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. " + "You are likely calling a useFetcher() method in the body of your component. " + "Try moving it to a useEffect or a callback.");
    }
    if (fetchControllers.has(key)) abortFetcher(key);
    var routesToUse = inFlightDataRoutes || dataRoutes;
    var matches = matchRoutes(routesToUse, href, init.basename);
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: href
      }));
      return;
    }
    var _normalizeNavigateOpt = normalizeNavigateOptions(href, opts, true),
      path = _normalizeNavigateOpt.path,
      submission = _normalizeNavigateOpt.submission;
    var match = getTargetMatch(matches, path);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, submission);
      return;
    } // Store off the match so we can call it's shouldRevalidate on subsequent
    // revalidations

    fetchLoadMatches.set(key, {
      routeId: routeId,
      path: path
    });
    handleFetcherLoader(key, routeId, path, match, matches, submission);
  } // Call the action for the matched fetcher.submit(), and then handle redirects,
  // errors, and revalidation
  function handleFetcherAction(_x20, _x21, _x22, _x23, _x24, _x25) {
    return _handleFetcherAction.apply(this, arguments);
  } // Call the matched loader for fetcher.load(), handling redirects, errors, etc.
  function _handleFetcherAction() {
    _handleFetcherAction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(key, routeId, path, match, requestMatches, submission) {
      var _error2, existingFetcher, fetcher, abortController, fetchRequest, actionResult, loadingFetcher, nextLocation, revalidationRequest, routesToUse, matches, loadId, loadFetcher, _getMatchesToLoad3, _getMatchesToLoad4, matchesToLoad, revalidatingFetchers, _yield$callLoadersAnd2, results, loaderResults, fetcherResults, redirect, _processLoaderData2, loaderData, errors, doneFetcher, didAbortFetchLoads;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              interruptActiveLoads();
              fetchLoadMatches["delete"](key);
              if (!(!match.route.action && !match.route.lazy)) {
                _context6.next = 6;
                break;
              }
              _error2 = getInternalRouterError(405, {
                method: submission.formMethod,
                pathname: path,
                routeId: routeId
              });
              setFetcherError(key, routeId, _error2);
              return _context6.abrupt("return");
            case 6:
              // Put this fetcher into it's submitting state
              existingFetcher = state.fetchers.get(key);
              fetcher = _extends({
                state: "submitting"
              }, submission, {
                data: existingFetcher && existingFetcher.data,
                " _hasFetcherDoneAnything ": true
              });
              state.fetchers.set(key, fetcher);
              updateState({
                fetchers: new Map(state.fetchers)
              }); // Call the action for the fetcher
              abortController = new AbortController();
              fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
              fetchControllers.set(key, abortController);
              _context6.next = 15;
              return callLoaderOrAction("action", fetchRequest, match, requestMatches, manifest, detectErrorBoundary, router.basename);
            case 15:
              actionResult = _context6.sent;
              if (!fetchRequest.signal.aborted) {
                _context6.next = 19;
                break;
              }
              // We can delete this so long as we weren't aborted by ou our own fetcher
              // re-submit which would have put _new_ controller is in fetchControllers
              if (fetchControllers.get(key) === abortController) {
                fetchControllers["delete"](key);
              }
              return _context6.abrupt("return");
            case 19:
              if (!isRedirectResult(actionResult)) {
                _context6.next = 26;
                break;
              }
              fetchControllers["delete"](key);
              fetchRedirectIds.add(key);
              loadingFetcher = _extends({
                state: "loading"
              }, submission, {
                data: undefined,
                " _hasFetcherDoneAnything ": true
              });
              state.fetchers.set(key, loadingFetcher);
              updateState({
                fetchers: new Map(state.fetchers)
              });
              return _context6.abrupt("return", startRedirectNavigation(state, actionResult, {
                isFetchActionRedirect: true
              }));
            case 26:
              if (!isErrorResult(actionResult)) {
                _context6.next = 29;
                break;
              }
              setFetcherError(key, routeId, actionResult.error);
              return _context6.abrupt("return");
            case 29:
              if (!isDeferredResult(actionResult)) {
                _context6.next = 31;
                break;
              }
              throw getInternalRouterError(400, {
                type: "defer-action"
              });
            case 31:
              // Start the data load for current matches, or the next location if we're
              // in the middle of a navigation
              nextLocation = state.navigation.location || state.location;
              revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
              routesToUse = inFlightDataRoutes || dataRoutes;
              matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, init.basename) : state.matches;
              invariant(matches, "Didn't find any matches after fetcher action");
              loadId = ++incrementingLoadId;
              fetchReloadIds.set(key, loadId);
              loadFetcher = _extends({
                state: "loading",
                data: actionResult.data
              }, submission, {
                " _hasFetcherDoneAnything ": true
              });
              state.fetchers.set(key, loadFetcher);
              _getMatchesToLoad3 = getMatchesToLoad(init.history, state, matches, submission, nextLocation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, init.basename, _defineProperty({}, match.route.id, actionResult.data), undefined // No need to send through errors since we short circuit above
              ), _getMatchesToLoad4 = _slicedToArray(_getMatchesToLoad3, 2), matchesToLoad = _getMatchesToLoad4[0], revalidatingFetchers = _getMatchesToLoad4[1]; // Put all revalidating fetchers into the loading state, except for the
              // current fetcher which we want to keep in it's current loading state which
              // contains it's action submission info + action data
              revalidatingFetchers.filter(function (rf) {
                return rf.key !== key;
              }).forEach(function (rf) {
                var staleKey = rf.key;
                var existingFetcher = state.fetchers.get(staleKey);
                var revalidatingFetcher = {
                  state: "loading",
                  data: existingFetcher && existingFetcher.data,
                  formMethod: undefined,
                  formAction: undefined,
                  formEncType: undefined,
                  formData: undefined,
                  " _hasFetcherDoneAnything ": true
                };
                state.fetchers.set(staleKey, revalidatingFetcher);
                fetchControllers.set(staleKey, abortController);
              });
              updateState({
                fetchers: new Map(state.fetchers)
              });
              _context6.next = 45;
              return callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
            case 45:
              _yield$callLoadersAnd2 = _context6.sent;
              results = _yield$callLoadersAnd2.results;
              loaderResults = _yield$callLoadersAnd2.loaderResults;
              fetcherResults = _yield$callLoadersAnd2.fetcherResults;
              if (!abortController.signal.aborted) {
                _context6.next = 51;
                break;
              }
              return _context6.abrupt("return");
            case 51:
              fetchReloadIds["delete"](key);
              fetchControllers["delete"](key);
              revalidatingFetchers.forEach(function (r) {
                return fetchControllers["delete"](r.key);
              });
              redirect = findRedirect(results);
              if (!redirect) {
                _context6.next = 57;
                break;
              }
              return _context6.abrupt("return", startRedirectNavigation(state, redirect));
            case 57:
              // Process and commit output from loaders
              _processLoaderData2 = processLoaderData(state, state.matches, matchesToLoad, loaderResults, undefined, revalidatingFetchers, fetcherResults, activeDeferreds), loaderData = _processLoaderData2.loaderData, errors = _processLoaderData2.errors;
              doneFetcher = {
                state: "idle",
                data: actionResult.data,
                formMethod: undefined,
                formAction: undefined,
                formEncType: undefined,
                formData: undefined,
                " _hasFetcherDoneAnything ": true
              };
              state.fetchers.set(key, doneFetcher);
              didAbortFetchLoads = abortStaleFetchLoads(loadId); // If we are currently in a navigation loading state and this fetcher is
              // more recent than the navigation, we want the newer data so abort the
              // navigation and complete it with the fetcher data
              if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
                invariant(pendingAction, "Expected pending action");
                pendingNavigationController && pendingNavigationController.abort();
                completeNavigation(state.navigation.location, {
                  matches: matches,
                  loaderData: loaderData,
                  errors: errors,
                  fetchers: new Map(state.fetchers)
                });
              } else {
                // otherwise just update with the fetcher data, preserving any existing
                // loaderData for loaders that did not need to reload.  We have to
                // manually merge here since we aren't going through completeNavigation
                updateState(_extends({
                  errors: errors,
                  loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors)
                }, didAbortFetchLoads ? {
                  fetchers: new Map(state.fetchers)
                } : {}));
                isRevalidationRequired = false;
              }
            case 62:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _handleFetcherAction.apply(this, arguments);
  }
  function handleFetcherLoader(_x26, _x27, _x28, _x29, _x30, _x31) {
    return _handleFetcherLoader.apply(this, arguments);
  }
  /**
   * Utility function to handle redirects returned from an action or loader.
   * Normally, a redirect "replaces" the navigation that triggered it.  So, for
   * example:
   *
   *  - user is on /a
   *  - user clicks a link to /b
   *  - loader for /b redirects to /c
   *
   * In a non-JS app the browser would track the in-flight navigation to /b and
   * then replace it with /c when it encountered the redirect response.  In
   * the end it would only ever update the URL bar with /c.
   *
   * In client-side routing using pushState/replaceState, we aim to emulate
   * this behavior and we also do not update history until the end of the
   * navigation (including processed redirects).  This means that we never
   * actually touch history until we've processed redirects, so we just use
   * the history action from the original navigation (PUSH or REPLACE).
   */
  function _handleFetcherLoader() {
    _handleFetcherLoader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(key, routeId, path, match, matches, submission) {
      var existingFetcher, loadingFetcher, abortController, fetchRequest, result, boundaryMatch, doneFetcher;
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              existingFetcher = state.fetchers.get(key); // Put this fetcher into it's loading state
              loadingFetcher = _extends({
                state: "loading",
                formMethod: undefined,
                formAction: undefined,
                formEncType: undefined,
                formData: undefined
              }, submission, {
                data: existingFetcher && existingFetcher.data,
                " _hasFetcherDoneAnything ": true
              });
              state.fetchers.set(key, loadingFetcher);
              updateState({
                fetchers: new Map(state.fetchers)
              }); // Call the loader for this fetcher route match
              abortController = new AbortController();
              fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
              fetchControllers.set(key, abortController);
              _context7.next = 9;
              return callLoaderOrAction("loader", fetchRequest, match, matches, manifest, detectErrorBoundary, router.basename);
            case 9:
              result = _context7.sent;
              if (!isDeferredResult(result)) {
                _context7.next = 17;
                break;
              }
              _context7.next = 13;
              return resolveDeferredData(result, fetchRequest.signal, true);
            case 13:
              _context7.t0 = _context7.sent;
              if (_context7.t0) {
                _context7.next = 16;
                break;
              }
              _context7.t0 = result;
            case 16:
              result = _context7.t0;
            case 17:
              // We can delete this so long as we weren't aborted by ou our own fetcher
              // re-load which would have put _new_ controller is in fetchControllers

              if (fetchControllers.get(key) === abortController) {
                fetchControllers["delete"](key);
              }
              if (!fetchRequest.signal.aborted) {
                _context7.next = 20;
                break;
              }
              return _context7.abrupt("return");
            case 20:
              if (!isRedirectResult(result)) {
                _context7.next = 24;
                break;
              }
              _context7.next = 23;
              return startRedirectNavigation(state, result);
            case 23:
              return _context7.abrupt("return");
            case 24:
              if (!isErrorResult(result)) {
                _context7.next = 29;
                break;
              }
              boundaryMatch = findNearestBoundary(state.matches, routeId);
              state.fetchers["delete"](key); // TODO: In remix, this would reset to IDLE_NAVIGATION if it was a catch -
              // do we need to behave any differently with our non-redirect errors?
              // What if it was a non-redirect Response?

              updateState({
                fetchers: new Map(state.fetchers),
                errors: _defineProperty({}, boundaryMatch.route.id, result.error)
              });
              return _context7.abrupt("return");
            case 29:
              invariant(!isDeferredResult(result), "Unhandled fetcher deferred data"); // Put the fetcher back into an idle state
              doneFetcher = {
                state: "idle",
                data: result.data,
                formMethod: undefined,
                formAction: undefined,
                formEncType: undefined,
                formData: undefined,
                " _hasFetcherDoneAnything ": true
              };
              state.fetchers.set(key, doneFetcher);
              updateState({
                fetchers: new Map(state.fetchers)
              });
            case 33:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    return _handleFetcherLoader.apply(this, arguments);
  }
  function startRedirectNavigation(_x32, _x33, _x34) {
    return _startRedirectNavigation.apply(this, arguments);
  }
  function _startRedirectNavigation() {
    _startRedirectNavigation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(state, redirect, _temp) {
      var _window, _ref6, submission, replace, isFetchActionRedirect, redirectLocation, url, isDifferentBasename, redirectHistoryAction, _state$navigation, formMethod, formAction, formEncType, formData;
      return _regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _ref6 = _temp === void 0 ? {} : _temp, submission = _ref6.submission, replace = _ref6.replace, isFetchActionRedirect = _ref6.isFetchActionRedirect;
              if (redirect.revalidate) {
                isRevalidationRequired = true;
              }
              redirectLocation = createLocation(state.location, redirect.location,
              // TODO: This can be removed once we get rid of useTransition in Remix v2
              _extends({
                _isRedirect: true
              }, isFetchActionRedirect ? {
                _isFetchActionRedirect: true
              } : {}));
              invariant(redirectLocation, "Expected a location on the redirect navigation"); // Check if this an absolute external redirect that goes to a new origin
              if (!(ABSOLUTE_URL_REGEX.test(redirect.location) && isBrowser && typeof ((_window = window) == null ? void 0 : _window.location) !== "undefined")) {
                _context8.next = 10;
                break;
              }
              url = init.history.createURL(redirect.location);
              isDifferentBasename = stripBasename(url.pathname, init.basename || "/") == null;
              if (!(window.location.origin !== url.origin || isDifferentBasename)) {
                _context8.next = 10;
                break;
              }
              if (replace) {
                window.location.replace(redirect.location);
              } else {
                window.location.assign(redirect.location);
              }
              return _context8.abrupt("return");
            case 10:
              // There's no need to abort on redirects, since we don't detect the
              // redirect until the action/loaders have settled

              pendingNavigationController = null;
              redirectHistoryAction = replace === true ? Action.Replace : Action.Push; // Use the incoming submission if provided, fallback on the active one in
              // state.navigation
              _state$navigation = state.navigation, formMethod = _state$navigation.formMethod, formAction = _state$navigation.formAction, formEncType = _state$navigation.formEncType, formData = _state$navigation.formData;
              if (!submission && formMethod && formAction && formData && formEncType) {
                submission = {
                  formMethod: formMethod,
                  formAction: formAction,
                  formEncType: formEncType,
                  formData: formData
                };
              } // If this was a 307/308 submission we want to preserve the HTTP method and
              // re-submit the GET/POST/PUT/PATCH/DELETE as a submission navigation to the
              // redirected location
              if (!(redirectPreserveMethodStatusCodes.has(redirect.status) && submission && isMutationMethod(submission.formMethod))) {
                _context8.next = 19;
                break;
              }
              _context8.next = 17;
              return startNavigation(redirectHistoryAction, redirectLocation, {
                submission: _extends({}, submission, {
                  formAction: redirect.location
                }),
                // Preserve this flag across redirects
                preventScrollReset: pendingPreventScrollReset
              });
            case 17:
              _context8.next = 21;
              break;
            case 19:
              _context8.next = 21;
              return startNavigation(redirectHistoryAction, redirectLocation, {
                overrideNavigation: {
                  state: "loading",
                  location: redirectLocation,
                  formMethod: submission ? submission.formMethod : undefined,
                  formAction: submission ? submission.formAction : undefined,
                  formEncType: submission ? submission.formEncType : undefined,
                  formData: submission ? submission.formData : undefined
                },
                // Preserve this flag across redirects
                preventScrollReset: pendingPreventScrollReset
              });
            case 21:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));
    return _startRedirectNavigation.apply(this, arguments);
  }
  function callLoadersAndMaybeResolveData(_x35, _x36, _x37, _x38, _x39) {
    return _callLoadersAndMaybeResolveData.apply(this, arguments);
  }
  function _callLoadersAndMaybeResolveData() {
    _callLoadersAndMaybeResolveData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
      var results, loaderResults, fetcherResults;
      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return Promise.all([].concat(_toConsumableArray(matchesToLoad.map(function (match) {
                return callLoaderOrAction("loader", request, match, matches, manifest, detectErrorBoundary, router.basename);
              })), _toConsumableArray(fetchersToLoad.map(function (f) {
                if (f.matches && f.match) {
                  return callLoaderOrAction("loader", createClientSideRequest(init.history, f.path, request.signal), f.match, f.matches, manifest, detectErrorBoundary, router.basename);
                } else {
                  var _error3 = {
                    type: ResultType.error,
                    error: getInternalRouterError(404, {
                      pathname: f.path
                    })
                  };
                  return _error3;
                }
              }))));
            case 2:
              results = _context9.sent;
              loaderResults = results.slice(0, matchesToLoad.length);
              fetcherResults = results.slice(matchesToLoad.length);
              _context9.next = 7;
              return Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, request.signal, false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map(function (f) {
                return f.match;
              }), fetcherResults, request.signal, true)]);
            case 7:
              return _context9.abrupt("return", {
                results: results,
                loaderResults: loaderResults,
                fetcherResults: fetcherResults
              });
            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));
    return _callLoadersAndMaybeResolveData.apply(this, arguments);
  }
  function interruptActiveLoads() {
    var _cancelledDeferredRou;
    // Every interruption triggers a revalidation
    isRevalidationRequired = true; // Cancel pending route-level deferreds and mark cancelled routes for
    // revalidation

    (_cancelledDeferredRou = cancelledDeferredRoutes).push.apply(_cancelledDeferredRou, _toConsumableArray(cancelActiveDeferreds())); // Abort in-flight fetcher loads

    fetchLoadMatches.forEach(function (_, key) {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.push(key);
        abortFetcher(key);
      }
    });
  }
  function setFetcherError(key, routeId, error) {
    var boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: _defineProperty({}, boundaryMatch.route.id, error),
      fetchers: new Map(state.fetchers)
    });
  }
  function deleteFetcher(key) {
    if (fetchControllers.has(key)) abortFetcher(key);
    fetchLoadMatches["delete"](key);
    fetchReloadIds["delete"](key);
    fetchRedirectIds["delete"](key);
    state.fetchers["delete"](key);
  }
  function abortFetcher(key) {
    var controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key);
    controller.abort();
    fetchControllers["delete"](key);
  }
  function markFetchersDone(keys) {
    var _iterator3 = _createForOfIteratorHelper(keys),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var key = _step3.value;
        var fetcher = getFetcher(key);
        var doneFetcher = {
          state: "idle",
          data: fetcher.data,
          formMethod: undefined,
          formAction: undefined,
          formEncType: undefined,
          formData: undefined,
          " _hasFetcherDoneAnything ": true
        };
        state.fetchers.set(key, doneFetcher);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  function markFetchRedirectsDone() {
    var doneKeys = [];
    var _iterator4 = _createForOfIteratorHelper(fetchRedirectIds),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var key = _step4.value;
        var fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);
        if (fetcher.state === "loading") {
          fetchRedirectIds["delete"](key);
          doneKeys.push(key);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    markFetchersDone(doneKeys);
  }
  function abortStaleFetchLoads(landedId) {
    var yeetedKeys = [];
    var _iterator5 = _createForOfIteratorHelper(fetchReloadIds),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _step5$value = _slicedToArray(_step5.value, 2),
          key = _step5$value[0],
          id = _step5$value[1];
        if (id < landedId) {
          var fetcher = state.fetchers.get(key);
          invariant(fetcher, "Expected fetcher: " + key);
          if (fetcher.state === "loading") {
            abortFetcher(key);
            fetchReloadIds["delete"](key);
            yeetedKeys.push(key);
          }
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    var blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers["delete"](key);
    blockerFunctions["delete"](key);
  } // Utility function to update blockers, ensuring valid state transitions

  function updateBlocker(key, newBlocker) {
    var blocker = state.blockers.get(key) || IDLE_BLOCKER; // Poor mans state machine :)
    // https://mermaid.live/edit#pako:eNqVkc9OwzAMxl8l8nnjAYrEtDIOHEBIgwvKJTReGy3_lDpIqO27k6awMG0XcrLlnz87nwdonESogKXXBuE79rq75XZO3-yHds0RJVuv70YrPlUrCEe2HfrORS3rubqZfuhtpg5C9wk5tZ4VKcRUq88q9Z8RS0-48cE1iHJkL0ugbHuFLus9L6spZy8nX9MP2CNdomVaposqu3fGayT8T8-jJQwhepo_UtpgBQaDEUom04dZhAN1aJBDlUKJBxE1ceB2Smj0Mln-IBW5AFU2dwUiktt_2Qaq2dBfaKdEup85UV7Yd-dKjlnkabl2Pvr0DTkTreM

    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    state.blockers.set(key, newBlocker);
    updateState({
      blockers: new Map(state.blockers)
    });
  }
  function shouldBlockNavigation(_ref2) {
    var currentLocation = _ref2.currentLocation,
      nextLocation = _ref2.nextLocation,
      historyAction = _ref2.historyAction;
    if (blockerFunctions.size === 0) {
      return;
    } // We ony support a single active blocker at the moment since we don't have
    // any compelling use cases for multi-blocker yet

    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    var entries = Array.from(blockerFunctions.entries());
    var _entries = _slicedToArray(entries[entries.length - 1], 2),
      blockerKey = _entries[0],
      blockerFunction = _entries[1];
    var blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      // If the blocker is currently proceeding, we don't need to re-check
      // it and can let this navigation continue
      return;
    } // At this point, we know we're unblocked/blocked so we need to check the
    // user-provided blocker function

    if (blockerFunction({
      currentLocation: currentLocation,
      nextLocation: nextLocation,
      historyAction: historyAction
    })) {
      return blockerKey;
    }
  }
  function cancelActiveDeferreds(predicate) {
    var cancelledRouteIds = [];
    activeDeferreds.forEach(function (dfd, routeId) {
      if (!predicate || predicate(routeId)) {
        // Cancel the deferred - but do not remove from activeDeferreds here -
        // we rely on the subscribers to do that so our tests can assert proper
        // cleanup via _internalActiveDeferreds
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds["delete"](routeId);
      }
    });
    return cancelledRouteIds;
  } // Opt in to capturing and reporting scroll positions during navigations,
  // used by the <ScrollRestoration> component

  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey = getKey || function (location) {
      return location.key;
    }; // Perform initial hydration scroll restoration, since we miss the boat on
    // the initial updateState() because we've not yet rendered <ScrollRestoration/>
    // and therefore have no savedScrollPositions available

    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      var y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({
          restoreScrollPosition: y
        });
      }
    }
    return function () {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      var userMatches = matches.map(function (m) {
        return createUseMatchesMatch(m, state.loaderData);
      });
      var key = getScrollRestorationKey(location, userMatches) || location.key;
      savedScrollPositions[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      var userMatches = matches.map(function (m) {
        return createUseMatchesMatch(m, state.loaderData);
      });
      var key = getScrollRestorationKey(location, userMatches) || location.key;
      var y = savedScrollPositions[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function _internalSetRoutes(newRoutes) {
    inFlightDataRoutes = newRoutes;
  }
  router = {
    get basename() {
      return init.basename;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    initialize: initialize,
    subscribe: subscribe,
    enableScrollRestoration: enableScrollRestoration,
    navigate: navigate,
    fetch: fetch,
    revalidate: revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: function createHref(to) {
      return init.history.createHref(to);
    },
    encodeLocation: function encodeLocation(to) {
      return init.history.encodeLocation(to);
    },
    getFetcher: getFetcher,
    deleteFetcher: deleteFetcher,
    dispose: dispose,
    getBlocker: getBlocker,
    deleteBlocker: deleteBlocker,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: _internalSetRoutes
  };
  return router;
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createStaticHandler
////////////////////////////////////////////////////////////////////////////////

var UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
function createStaticHandler(routes, opts) {
  invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  var manifest = {};
  var detectErrorBoundary = (opts == null ? void 0 : opts.detectErrorBoundary) || defaultDetectErrorBoundary;
  var dataRoutes = convertRoutesToDataRoutes(routes, detectErrorBoundary, undefined, manifest);
  var basename = (opts ? opts.basename : null) || "/";
  /**
   * The query() method is intended for document requests, in which we want to
   * call an optional action and potentially multiple loaders for all nested
   * routes.  It returns a StaticHandlerContext object, which is very similar
   * to the router state (location, loaderData, actionData, errors, etc.) and
   * also adds SSR-specific information such as the statusCode and headers
   * from action/loaders Responses.
   *
   * It _should_ never throw and should report all errors through the
   * returned context.errors object, properly associating errors to their error
   * boundary.  Additionally, it tracks _deepestRenderedBoundaryId which can be
   * used to emulate React error boundaries during SSr by performing a second
   * pass only down to the boundaryId.
   *
   * The one exception where we do not return a StaticHandlerContext is when a
   * redirect response is returned or thrown from any action/loader.  We
   * propagate that out and return the raw Response so the HTTP server can
   * return it directly.
   */
  function query(_x40, _x41) {
    return _query.apply(this, arguments);
  }
  /**
   * The queryRoute() method is intended for targeted route requests, either
   * for fetch ?_data requests or resource route requests.  In this case, we
   * are only ever calling a single action or loader, and we are returning the
   * returned value directly.  In most cases, this will be a Response returned
   * from the action/loader, but it may be a primitive or other value as well -
   * and in such cases the calling context should handle that accordingly.
   *
   * We do respect the throw/return differentiation, so if an action/loader
   * throws, then this method will throw the value.  This is important so we
   * can do proper boundary identification in Remix where a thrown Response
   * must go to the Catch Boundary but a returned Response is happy-path.
   *
   * One thing to note is that any Router-initiated Errors that make sense
   * to associate with a status code will be thrown as an ErrorResponse
   * instance which include the raw Error, such that the calling context can
   * serialize the error as they see fit while including the proper response
   * code.  Examples here are 404 and 405 errors that occur prior to reaching
   * any user-defined loaders.
   */
  function _query() {
    _query = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(request, _temp2) {
      var _ref7, requestContext, url, method, location, matches, error, _getShortCircuitMatch3, methodNotAllowedMatches, route, _error4, _getShortCircuitMatch4, notFoundMatches, _route2, result;
      return _regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _ref7 = _temp2 === void 0 ? {} : _temp2, requestContext = _ref7.requestContext;
              url = new URL(request.url);
              method = request.method.toLowerCase();
              location = createLocation("", createPath(url), null, "default");
              matches = matchRoutes(dataRoutes, location, basename); // SSR supports HEAD requests while SPA doesn't
              if (!(!isValidMethod(method) && method !== "head")) {
                _context10.next = 11;
                break;
              }
              error = getInternalRouterError(405, {
                method: method
              });
              _getShortCircuitMatch3 = getShortCircuitMatches(dataRoutes), methodNotAllowedMatches = _getShortCircuitMatch3.matches, route = _getShortCircuitMatch3.route;
              return _context10.abrupt("return", {
                basename: basename,
                location: location,
                matches: methodNotAllowedMatches,
                loaderData: {},
                actionData: null,
                errors: _defineProperty({}, route.id, error),
                statusCode: error.status,
                loaderHeaders: {},
                actionHeaders: {},
                activeDeferreds: null
              });
            case 11:
              if (matches) {
                _context10.next = 15;
                break;
              }
              _error4 = getInternalRouterError(404, {
                pathname: location.pathname
              });
              _getShortCircuitMatch4 = getShortCircuitMatches(dataRoutes), notFoundMatches = _getShortCircuitMatch4.matches, _route2 = _getShortCircuitMatch4.route;
              return _context10.abrupt("return", {
                basename: basename,
                location: location,
                matches: notFoundMatches,
                loaderData: {},
                actionData: null,
                errors: _defineProperty({}, _route2.id, _error4),
                statusCode: _error4.status,
                loaderHeaders: {},
                actionHeaders: {},
                activeDeferreds: null
              });
            case 15:
              _context10.next = 17;
              return queryImpl(request, location, matches, requestContext);
            case 17:
              result = _context10.sent;
              if (!isResponse(result)) {
                _context10.next = 20;
                break;
              }
              return _context10.abrupt("return", result);
            case 20:
              return _context10.abrupt("return", _extends({
                location: location,
                basename: basename
              }, result));
            case 21:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));
    return _query.apply(this, arguments);
  }
  function queryRoute(_x42, _x43) {
    return _queryRoute.apply(this, arguments);
  }
  function _queryRoute() {
    _queryRoute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(request, _temp3) {
      var _ref8, routeId, requestContext, url, method, location, matches, match, result, error, _result$activeDeferre, data;
      return _regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _ref8 = _temp3 === void 0 ? {} : _temp3, routeId = _ref8.routeId, requestContext = _ref8.requestContext;
              url = new URL(request.url);
              method = request.method.toLowerCase();
              location = createLocation("", createPath(url), null, "default");
              matches = matchRoutes(dataRoutes, location, basename); // SSR supports HEAD requests while SPA doesn't
              if (!(!isValidMethod(method) && method !== "head" && method !== "options")) {
                _context11.next = 9;
                break;
              }
              throw getInternalRouterError(405, {
                method: method
              });
            case 9:
              if (matches) {
                _context11.next = 11;
                break;
              }
              throw getInternalRouterError(404, {
                pathname: location.pathname
              });
            case 11:
              match = routeId ? matches.find(function (m) {
                return m.route.id === routeId;
              }) : getTargetMatch(matches, location);
              if (!(routeId && !match)) {
                _context11.next = 16;
                break;
              }
              throw getInternalRouterError(403, {
                pathname: location.pathname,
                routeId: routeId
              });
            case 16:
              if (match) {
                _context11.next = 18;
                break;
              }
              throw getInternalRouterError(404, {
                pathname: location.pathname
              });
            case 18:
              _context11.next = 20;
              return queryImpl(request, location, matches, requestContext, match);
            case 20:
              result = _context11.sent;
              if (!isResponse(result)) {
                _context11.next = 23;
                break;
              }
              return _context11.abrupt("return", result);
            case 23:
              error = result.errors ? Object.values(result.errors)[0] : undefined;
              if (!(error !== undefined)) {
                _context11.next = 26;
                break;
              }
              throw error;
            case 26:
              if (!result.actionData) {
                _context11.next = 28;
                break;
              }
              return _context11.abrupt("return", Object.values(result.actionData)[0]);
            case 28:
              if (!result.loaderData) {
                _context11.next = 32;
                break;
              }
              data = Object.values(result.loaderData)[0];
              if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
                data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
              }
              return _context11.abrupt("return", data);
            case 32:
              return _context11.abrupt("return", undefined);
            case 33:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));
    return _queryRoute.apply(this, arguments);
  }
  function queryImpl(_x44, _x45, _x46, _x47, _x48) {
    return _queryImpl.apply(this, arguments);
  }
  function _queryImpl() {
    _queryImpl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(request, location, matches, requestContext, routeMatch) {
      var _result, result;
      return _regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
              _context12.prev = 1;
              if (!isMutationMethod(request.method.toLowerCase())) {
                _context12.next = 7;
                break;
              }
              _context12.next = 5;
              return submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, routeMatch != null);
            case 5:
              _result = _context12.sent;
              return _context12.abrupt("return", _result);
            case 7:
              _context12.next = 9;
              return loadRouteData(request, matches, requestContext, routeMatch);
            case 9:
              result = _context12.sent;
              return _context12.abrupt("return", isResponse(result) ? result : _extends({}, result, {
                actionData: null,
                actionHeaders: {}
              }));
            case 13:
              _context12.prev = 13;
              _context12.t0 = _context12["catch"](1);
              if (!isQueryRouteResponse(_context12.t0)) {
                _context12.next = 19;
                break;
              }
              if (!(_context12.t0.type === ResultType.error && !isRedirectResponse(_context12.t0.response))) {
                _context12.next = 18;
                break;
              }
              throw _context12.t0.response;
            case 18:
              return _context12.abrupt("return", _context12.t0.response);
            case 19:
              if (!isRedirectResponse(_context12.t0)) {
                _context12.next = 21;
                break;
              }
              return _context12.abrupt("return", _context12.t0);
            case 21:
              throw _context12.t0;
            case 22:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[1, 13]]);
    }));
    return _queryImpl.apply(this, arguments);
  }
  function submit(_x49, _x50, _x51, _x52, _x53) {
    return _submit.apply(this, arguments);
  }
  function _submit() {
    _submit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(request, matches, actionMatch, requestContext, isRouteRequest) {
      var result, error, method, _error5, boundaryMatch, _context13, loaderRequest, context;
      return _regeneratorRuntime.wrap(function _callee13$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (!(!actionMatch.route.action && !actionMatch.route.lazy)) {
                _context14.next = 7;
                break;
              }
              error = getInternalRouterError(405, {
                method: request.method,
                pathname: new URL(request.url).pathname,
                routeId: actionMatch.route.id
              });
              if (!isRouteRequest) {
                _context14.next = 4;
                break;
              }
              throw error;
            case 4:
              result = {
                type: ResultType.error,
                error: error
              };
              _context14.next = 13;
              break;
            case 7:
              _context14.next = 9;
              return callLoaderOrAction("action", request, actionMatch, matches, manifest, detectErrorBoundary, basename, true, isRouteRequest, requestContext);
            case 9:
              result = _context14.sent;
              if (!request.signal.aborted) {
                _context14.next = 13;
                break;
              }
              method = isRouteRequest ? "queryRoute" : "query";
              throw new Error(method + "() call aborted");
            case 13:
              if (!isRedirectResult(result)) {
                _context14.next = 15;
                break;
              }
              throw new Response(null, {
                status: result.status,
                headers: {
                  Location: result.location
                }
              });
            case 15:
              if (!isDeferredResult(result)) {
                _context14.next = 20;
                break;
              }
              _error5 = getInternalRouterError(400, {
                type: "defer-action"
              });
              if (!isRouteRequest) {
                _context14.next = 19;
                break;
              }
              throw _error5;
            case 19:
              result = {
                type: ResultType.error,
                error: _error5
              };
            case 20:
              if (!isRouteRequest) {
                _context14.next = 24;
                break;
              }
              if (!isErrorResult(result)) {
                _context14.next = 23;
                break;
              }
              throw result.error;
            case 23:
              return _context14.abrupt("return", {
                matches: [actionMatch],
                loaderData: {},
                actionData: _defineProperty({}, actionMatch.route.id, result.data),
                errors: null,
                // Note: statusCode + headers are unused here since queryRoute will
                // return the raw Response or value
                statusCode: 200,
                loaderHeaders: {},
                actionHeaders: {},
                activeDeferreds: null
              });
            case 24:
              if (!isErrorResult(result)) {
                _context14.next = 30;
                break;
              }
              // Store off the pending error - we use it to determine which loaders
              // to call and will commit it when we complete the navigation
              boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
              _context14.next = 28;
              return loadRouteData(request, matches, requestContext, undefined, _defineProperty({}, boundaryMatch.route.id, result.error));
            case 28:
              _context13 = _context14.sent;
              return _context14.abrupt("return", _extends({}, _context13, {
                statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
                actionData: null,
                actionHeaders: _extends({}, result.headers ? _defineProperty({}, actionMatch.route.id, result.headers) : {})
              }));
            case 30:
              // Create a GET request for the loaders
              loaderRequest = new Request(request.url, {
                headers: request.headers,
                redirect: request.redirect,
                signal: request.signal
              });
              _context14.next = 33;
              return loadRouteData(loaderRequest, matches, requestContext);
            case 33:
              context = _context14.sent;
              return _context14.abrupt("return", _extends({}, context, result.statusCode ? {
                statusCode: result.statusCode
              } : {}, {
                actionData: _defineProperty({}, actionMatch.route.id, result.data),
                actionHeaders: _extends({}, result.headers ? _defineProperty({}, actionMatch.route.id, result.headers) : {})
              }));
            case 35:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee13);
    }));
    return _submit.apply(this, arguments);
  }
  function loadRouteData(_x54, _x55, _x56, _x57, _x58) {
    return _loadRouteData.apply(this, arguments);
  }
  function _loadRouteData() {
    _loadRouteData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(request, matches, requestContext, routeMatch, pendingActionError) {
      var isRouteRequest, requestMatches, matchesToLoad, results, method, activeDeferreds, context, executedLoaders;
      return _regeneratorRuntime.wrap(function _callee14$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              isRouteRequest = routeMatch != null; // Short circuit if we have no loaders to run (queryRoute())
              if (!(isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy))) {
                _context15.next = 3;
                break;
              }
              throw getInternalRouterError(400, {
                method: request.method,
                pathname: new URL(request.url).pathname,
                routeId: routeMatch == null ? void 0 : routeMatch.route.id
              });
            case 3:
              requestMatches = routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0]);
              matchesToLoad = requestMatches.filter(function (m) {
                return m.route.loader || m.route.lazy;
              }); // Short circuit if we have no loaders to run (query())
              if (!(matchesToLoad.length === 0)) {
                _context15.next = 7;
                break;
              }
              return _context15.abrupt("return", {
                matches: matches,
                // Add a null for all matched routes for proper revalidation on the client
                loaderData: matches.reduce(function (acc, m) {
                  return Object.assign(acc, _defineProperty({}, m.route.id, null));
                }, {}),
                errors: pendingActionError || null,
                statusCode: 200,
                loaderHeaders: {},
                activeDeferreds: null
              });
            case 7:
              _context15.next = 9;
              return Promise.all(_toConsumableArray(matchesToLoad.map(function (match) {
                return callLoaderOrAction("loader", request, match, matches, manifest, detectErrorBoundary, basename, true, isRouteRequest, requestContext);
              })));
            case 9:
              results = _context15.sent;
              if (!request.signal.aborted) {
                _context15.next = 13;
                break;
              }
              method = isRouteRequest ? "queryRoute" : "query";
              throw new Error(method + "() call aborted");
            case 13:
              // Process and commit output from loaders
              activeDeferreds = new Map();
              context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError, activeDeferreds); // Add a null for any non-loader matches for proper revalidation on the client
              executedLoaders = new Set(matchesToLoad.map(function (match) {
                return match.route.id;
              }));
              matches.forEach(function (match) {
                if (!executedLoaders.has(match.route.id)) {
                  context.loaderData[match.route.id] = null;
                }
              });
              return _context15.abrupt("return", _extends({}, context, {
                matches: matches,
                activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
              }));
            case 18:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee14);
    }));
    return _loadRouteData.apply(this, arguments);
  }
  return {
    dataRoutes: dataRoutes,
    query: query,
    queryRoute: queryRoute
  };
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Helpers
////////////////////////////////////////////////////////////////////////////////

/**
 * Given an existing StaticHandlerContext and an error thrown at render time,
 * provide an updated StaticHandlerContext suitable for a second SSR render
 */

function getStaticContextFromError(routes, context, error) {
  var newContext = _extends({}, context, {
    statusCode: 500,
    errors: _defineProperty({}, context._deepestRenderedBoundaryId || routes[0].id, error)
  });
  return newContext;
}
function isSubmissionNavigation(opts) {
  return opts != null && "formData" in opts;
} // Normalize navigation options by converting formMethod=GET formData objects to
// URLSearchParams so they behave identically to links with query params

function normalizeNavigateOptions(to, opts, isFetcher) {
  if (isFetcher === void 0) {
    isFetcher = false;
  }
  var path = typeof to === "string" ? to : createPath(to); // Return location verbatim on non-submission navigations

  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path: path
    };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path: path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  } // Create a Submission on non-GET navigations

  var submission;
  if (opts.formData) {
    submission = {
      formMethod: opts.formMethod || "get",
      formAction: stripHashFromPath(path),
      formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
      formData: opts.formData
    };
    if (isMutationMethod(submission.formMethod)) {
      return {
        path: path,
        submission: submission
      };
    }
  } // Flatten submission onto URLSearchParams for GET submissions

  var parsedPath = parsePath(path);
  var searchParams = convertFormDataToSearchParams(opts.formData); // Since fetcher GET submissions only run a single loader (as opposed to
  // navigation GET submissions which run all loaders), we need to preserve
  // any incoming ?index params

  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = "?" + searchParams;
  return {
    path: createPath(parsedPath),
    submission: submission
  };
} // Filter out all routes below any caught error as they aren't going to
// render so we don't need to load them

function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  var boundaryMatches = matches;
  if (boundaryId) {
    var index = matches.findIndex(function (m) {
      return m.route.id === boundaryId;
    });
    if (index >= 0) {
      boundaryMatches = matches.slice(0, index);
    }
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, basename, pendingActionData, pendingError) {
  var actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : undefined;
  var currentUrl = history.createURL(state.location);
  var nextUrl = history.createURL(location);
  var defaultShouldRevalidate =
  // Forced revalidation due to submission, useRevalidate, or X-Remix-Revalidate
  isRevalidationRequired ||
  // Clicked the same link, resubmitted a GET form
  currentUrl.toString() === nextUrl.toString() ||
  // Search params affect all loaders
  currentUrl.search !== nextUrl.search; // Pick navigation matches that are net-new or qualify for revalidation

  var boundaryId = pendingError ? Object.keys(pendingError)[0] : undefined;
  var boundaryMatches = getLoaderMatchesUntilBoundary(matches, boundaryId);
  var navigationMatches = boundaryMatches.filter(function (match, index) {
    if (match.route.lazy) {
      // We haven't loaded this route yet so we don't know if it's got a loader!
      return true;
    }
    if (match.route.loader == null) {
      return false;
    } // Always call the loader on new route instances and pending defer cancellations

    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some(function (id) {
      return id === match.route.id;
    })) {
      return true;
    } // This is the default implementation for when we revalidate.  If the route
    // provides it's own implementation, then we give them full control but
    // provide this value so they can leverage it if needed after they check
    // their own specific use cases

    var currentRouteMatch = state.matches[index];
    var nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl: currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl: nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult: actionResult,
      defaultShouldRevalidate: defaultShouldRevalidate || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
    }));
  }); // Pick fetcher.loads that need to be revalidated

  var revalidatingFetchers = [];
  fetchLoadMatches.forEach(function (f, key) {
    // Don't revalidate if fetcher won't be present in the subsequent render
    if (!matches.some(function (m) {
      return m.route.id === f.routeId;
    })) {
      return;
    }
    var fetcherMatches = matchRoutes(routesToUse, f.path, basename); // If the fetcher path no longer matches, push it in with null matches so
    // we can trigger a 404 in callLoadersAndMaybeResolveData

    if (!fetcherMatches) {
      revalidatingFetchers.push(_extends({
        key: key
      }, f, {
        matches: null,
        match: null
      }));
      return;
    }
    var fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    if (cancelledFetcherLoads.includes(key)) {
      revalidatingFetchers.push(_extends({
        key: key,
        matches: fetcherMatches,
        match: fetcherMatch
      }, f));
      return;
    } // Revalidating fetchers are decoupled from the route matches since they
    // hit a static href, so they _always_ check shouldRevalidate and the
    // default is strictly if a revalidation is explicitly required (action
    // submissions, useRevalidator, X-Remix-Revalidate).

    var shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
      currentUrl: currentUrl,
      currentParams: state.matches[state.matches.length - 1].params,
      nextUrl: nextUrl,
      nextParams: matches[matches.length - 1].params
    }, submission, {
      actionResult: actionResult,
      defaultShouldRevalidate: defaultShouldRevalidate
    }));
    if (shouldRevalidate) {
      revalidatingFetchers.push(_extends({
        key: key,
        matches: fetcherMatches,
        match: fetcherMatch
      }, f));
    }
  });
  return [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  var isNew =
  // [a] -> [a, b]
  !currentMatch ||
  // [a, b] -> [a, c]
  match.route.id !== currentMatch.route.id; // Handle the case that we don't have data for a re-used route, potentially
  // from a prior error or from a cancelled pending deferred

  var isMissingData = currentLoaderData[match.route.id] === undefined; // Always load if this is a net-new route or we don't yet have data

  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  var currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname ||
    // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    var routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
/**
 * Execute route.lazy() methods to lazily load route modules (loader, action,
 * shouldRevalidate) and update the routeManifest in place which shares objects
 * with dataRoutes so those get updated as well.
 */
function loadLazyRouteModule(_x59, _x60, _x61) {
  return _loadLazyRouteModule.apply(this, arguments);
}
function _loadLazyRouteModule() {
  _loadLazyRouteModule = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(route, detectErrorBoundary, manifest) {
    var lazyRoute, routeToUpdate, routeUpdates, lazyRouteProperty, staticRouteValue, isPropertyStaticallyDefined;
    return _regeneratorRuntime.wrap(function _callee15$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            if (route.lazy) {
              _context16.next = 2;
              break;
            }
            return _context16.abrupt("return");
          case 2:
            _context16.next = 4;
            return route.lazy();
          case 4:
            lazyRoute = _context16.sent;
            if (route.lazy) {
              _context16.next = 7;
              break;
            }
            return _context16.abrupt("return");
          case 7:
            routeToUpdate = manifest[route.id];
            invariant(routeToUpdate, "No route found in manifest"); // Update the route in place.  This should be safe because there's no way
            // we could yet be sitting on this route as we can't get there without
            // resolving lazy() first.
            //
            // This is different than the HMR "update" use-case where we may actively be
            // on the route being updated.  The main concern boils down to "does this
            // mutation affect any ongoing navigations or any current state.matches
            // values?".  If not, it should be safe to update in place.
            routeUpdates = {};
            for (lazyRouteProperty in lazyRoute) {
              staticRouteValue = routeToUpdate[lazyRouteProperty];
              isPropertyStaticallyDefined = staticRouteValue !== undefined &&
              // This property isn't static since it should always be updated based
              // on the route updates
              lazyRouteProperty !== "hasErrorBoundary";
              warning(!isPropertyStaticallyDefined, "Route \"" + routeToUpdate.id + "\" has a static property \"" + lazyRouteProperty + "\" " + "defined but its lazy function is also returning a value for this property. " + ("The lazy route property \"" + lazyRouteProperty + "\" will be ignored."));
              if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
                routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
              }
            } // Mutate the route with the provided updates.  Do this first so we pass
            // the updated version to detectErrorBoundary

            Object.assign(routeToUpdate, routeUpdates); // Mutate the `hasErrorBoundary` property on the route based on the route
            // updates and remove the `lazy` function so we don't resolve the lazy
            // route again.

            Object.assign(routeToUpdate, {
              // To keep things framework agnostic, we use the provided
              // `detectErrorBoundary` function to set the `hasErrorBoundary` route
              // property since the logic will differ between frameworks.
              hasErrorBoundary: detectErrorBoundary(_extends({}, routeToUpdate)),
              lazy: undefined
            });
          case 13:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee15);
  }));
  return _loadLazyRouteModule.apply(this, arguments);
}
function callLoaderOrAction(_x62, _x63, _x64, _x65, _x66, _x67, _x68, _x69, _x70, _x71) {
  return _callLoaderOrAction.apply(this, arguments);
} // Utility method for creating the Request instances for loaders/actions during
// client-side navigations and fetches.  During SSR we will always have a
// Request instance from the static handler (query/queryRoute)
function _callLoaderOrAction() {
  _callLoaderOrAction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16(type, request, match, matches, manifest, detectErrorBoundary, basename, isStaticRequest, isRouteRequest, requestContext) {
    var resultType, result, onReject, runHandler, handler, values, status, location, activeMatches, routePathnames, resolvedLocation, path, currentUrl, url, isSameBasename, data, contentType, _result$init, _result$init2;
    return _regeneratorRuntime.wrap(function _callee16$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            if (basename === void 0) {
              basename = "/";
            }
            if (isStaticRequest === void 0) {
              isStaticRequest = false;
            }
            if (isRouteRequest === void 0) {
              isRouteRequest = false;
            }
            runHandler = function runHandler(handler) {
              // Setup a promise we can race against so that abort signals short circuit
              var reject;
              var abortPromise = new Promise(function (_, r) {
                return reject = r;
              });
              onReject = function onReject() {
                return reject();
              };
              request.signal.addEventListener("abort", onReject);
              return Promise.race([handler({
                request: request,
                params: match.params,
                context: requestContext
              }), abortPromise]);
            };
            _context17.prev = 4;
            handler = match.route[type];
            if (!match.route.lazy) {
              _context17.next = 30;
              break;
            }
            if (!handler) {
              _context17.next = 14;
              break;
            }
            _context17.next = 10;
            return Promise.all([runHandler(handler), loadLazyRouteModule(match.route, detectErrorBoundary, manifest)]);
          case 10:
            values = _context17.sent;
            result = values[0];
            _context17.next = 28;
            break;
          case 14:
            _context17.next = 16;
            return loadLazyRouteModule(match.route, detectErrorBoundary, manifest);
          case 16:
            handler = match.route[type];
            if (!handler) {
              _context17.next = 23;
              break;
            }
            _context17.next = 20;
            return runHandler(handler);
          case 20:
            result = _context17.sent;
            _context17.next = 28;
            break;
          case 23:
            if (!(type === "action")) {
              _context17.next = 27;
              break;
            }
            throw getInternalRouterError(405, {
              method: request.method,
              pathname: new URL(request.url).pathname,
              routeId: match.route.id
            });
          case 27:
            return _context17.abrupt("return", {
              type: ResultType.data,
              data: undefined
            });
          case 28:
            _context17.next = 34;
            break;
          case 30:
            invariant(handler, "Could not find the " + type + " to run on the \"" + match.route.id + "\" route");
            _context17.next = 33;
            return runHandler(handler);
          case 33:
            result = _context17.sent;
          case 34:
            invariant(result !== undefined, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ("\"" + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
            _context17.next = 41;
            break;
          case 37:
            _context17.prev = 37;
            _context17.t0 = _context17["catch"](4);
            resultType = ResultType.error;
            result = _context17.t0;
          case 41:
            _context17.prev = 41;
            if (onReject) {
              request.signal.removeEventListener("abort", onReject);
            }
            return _context17.finish(41);
          case 44:
            if (!isResponse(result)) {
              _context17.next = 69;
              break;
            }
            status = result.status; // Process redirects
            if (!redirectStatusCodes.has(status)) {
              _context17.next = 54;
              break;
            }
            location = result.headers.get("Location");
            invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header"); // Support relative routing in internal redirects

            if (!ABSOLUTE_URL_REGEX.test(location)) {
              activeMatches = matches.slice(0, matches.indexOf(match) + 1);
              routePathnames = getPathContributingMatches(activeMatches).map(function (match) {
                return match.pathnameBase;
              });
              resolvedLocation = router_resolveTo(location, routePathnames, new URL(request.url).pathname);
              invariant(createPath(resolvedLocation), "Unable to resolve redirect location: " + location); // Prepend the basename to the redirect location if we have one

              if (basename) {
                path = resolvedLocation.pathname;
                resolvedLocation.pathname = path === "/" ? basename : router_joinPaths([basename, path]);
              }
              location = createPath(resolvedLocation);
            } else if (!isStaticRequest) {
              // Strip off the protocol+origin for same-origin + same-basename absolute
              // redirects. If this is a static request, we can let it go back to the
              // browser as-is
              currentUrl = new URL(request.url);
              url = location.startsWith("//") ? new URL(currentUrl.protocol + location) : new URL(location);
              isSameBasename = stripBasename(url.pathname, basename) != null;
              if (url.origin === currentUrl.origin && isSameBasename) {
                location = url.pathname + url.search + url.hash;
              }
            } // Don't process redirects in the router during static requests requests.
            // Instead, throw the Response and let the server handle it with an HTTP
            // redirect.  We also update the Location header in place in this flow so
            // basename and relative routing is taken into account
            if (!isStaticRequest) {
              _context17.next = 53;
              break;
            }
            result.headers.set("Location", location);
            throw result;
          case 53:
            return _context17.abrupt("return", {
              type: ResultType.redirect,
              status: status,
              location: location,
              revalidate: result.headers.get("X-Remix-Revalidate") !== null
            });
          case 54:
            if (!isRouteRequest) {
              _context17.next = 56;
              break;
            }
            throw {
              type: resultType || ResultType.data,
              response: result
            };
          case 56:
            contentType = result.headers.get("Content-Type"); // Check between word boundaries instead of startsWith() due to the last
            // paragraph of https://httpwg.org/specs/rfc9110.html#field.content-type
            if (!(contentType && /\bapplication\/json\b/.test(contentType))) {
              _context17.next = 63;
              break;
            }
            _context17.next = 60;
            return result.json();
          case 60:
            data = _context17.sent;
            _context17.next = 66;
            break;
          case 63:
            _context17.next = 65;
            return result.text();
          case 65:
            data = _context17.sent;
          case 66:
            if (!(resultType === ResultType.error)) {
              _context17.next = 68;
              break;
            }
            return _context17.abrupt("return", {
              type: resultType,
              error: new ErrorResponse(status, result.statusText, data),
              headers: result.headers
            });
          case 68:
            return _context17.abrupt("return", {
              type: ResultType.data,
              data: data,
              statusCode: result.status,
              headers: result.headers
            });
          case 69:
            if (!(resultType === ResultType.error)) {
              _context17.next = 71;
              break;
            }
            return _context17.abrupt("return", {
              type: resultType,
              error: result
            });
          case 71:
            if (!(result instanceof DeferredData)) {
              _context17.next = 73;
              break;
            }
            return _context17.abrupt("return", {
              type: ResultType.deferred,
              deferredData: result,
              statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
              headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
            });
          case 73:
            return _context17.abrupt("return", {
              type: ResultType.data,
              data: result
            });
          case 74:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee16, null, [[4, 37, 41, 44]]);
  }));
  return _callLoaderOrAction.apply(this, arguments);
}
function createClientSideRequest(history, location, signal, submission) {
  var url = history.createURL(stripHashFromPath(location)).toString();
  var init = {
    signal: signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    var formMethod = submission.formMethod,
      formEncType = submission.formEncType,
      formData = submission.formData;
    init.method = formMethod.toUpperCase();
    init.body = formEncType === "application/x-www-form-urlencoded" ? convertFormDataToSearchParams(formData) : formData;
  } // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)

  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  var searchParams = new URLSearchParams();
  var _iterator6 = _createForOfIteratorHelper(formData.entries()),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var _step6$value = _slicedToArray(_step6.value, 2),
        key = _step6$value[0],
        value = _step6$value[1];
      // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#converting-an-entry-list-to-a-list-of-name-value-pairs
      searchParams.append(key, value instanceof File ? value.name : value);
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  return searchParams;
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  // Fill in loaderData/errors from our loaders
  var loaderData = {};
  var errors = null;
  var statusCode;
  var foundError = false;
  var loaderHeaders = {}; // Process loader results into state.loaderData/state.errors

  results.forEach(function (result, index) {
    var id = matchesToLoad[index].route.id;
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
    if (isErrorResult(result)) {
      // Look upwards from the matched route for the closest ancestor
      // error boundary, defaulting to the root match
      var boundaryMatch = findNearestBoundary(matches, id);
      var error = result.error; // If we have a pending action error, we report it at the highest-route
      // that throws a loader error, and then clear it out to indicate that
      // it was consumed

      if (pendingError) {
        error = Object.values(pendingError)[0];
        pendingError = undefined;
      }
      errors = errors || {}; // Prefer higher error values if lower errors bubble to the same boundary

      if (errors[boundaryMatch.route.id] == null) {
        errors[boundaryMatch.route.id] = error;
      } // Clear our any prior loaderData for the throwing route

      loaderData[id] = undefined; // Once we find our first (highest) error, we set the status code and
      // prevent deeper status codes from overriding

      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      if (isDeferredResult(result)) {
        activeDeferreds.set(id, result.deferredData);
        loaderData[id] = result.deferredData.data;
      } else {
        loaderData[id] = result.data;
      } // Error status codes always override success status codes, but if all
      // loaders are successful we take the deepest status code.

      if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  }); // If we didn't consume the pending action error (i.e., all loaders
  // resolved), then consume it here.  Also clear out any loaderData for the
  // throwing route

  if (pendingError) {
    errors = pendingError;
    loaderData[Object.keys(pendingError)[0]] = undefined;
  }
  return {
    loaderData: loaderData,
    errors: errors,
    statusCode: statusCode || 200,
    loaderHeaders: loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
  var _processRouteLoaderDa = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds),
    loaderData = _processRouteLoaderDa.loaderData,
    errors = _processRouteLoaderDa.errors; // Process results from our revalidating fetchers

  for (var index = 0; index < revalidatingFetchers.length; index++) {
    var _revalidatingFetchers = revalidatingFetchers[index],
      key = _revalidatingFetchers.key,
      match = _revalidatingFetchers.match;
    invariant(fetcherResults !== undefined && fetcherResults[index] !== undefined, "Did not find corresponding fetcher result");
    var result = fetcherResults[index]; // Process fetcher non-redirect errors

    if (isErrorResult(result)) {
      var boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends({}, errors, _defineProperty({}, boundaryMatch.route.id, result.error));
      }
      state.fetchers["delete"](key);
    } else if (isRedirectResult(result)) {
      // Should never get here, redirects should get processed above, but we
      // keep this to type narrow to a success result in the else
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      // Should never get here, deferred data should be awaited for fetchers
      // in resolveDeferredResults
      invariant(false, "Unhandled fetcher deferred data");
    } else {
      var doneFetcher = {
        state: "idle",
        data: result.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(key, doneFetcher);
    }
  }
  return {
    loaderData: loaderData,
    errors: errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  var mergedLoaderData = _extends({}, newLoaderData);
  var _iterator7 = _createForOfIteratorHelper(matches),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var match = _step7.value;
      var id = match.route.id;
      if (newLoaderData.hasOwnProperty(id)) {
        if (newLoaderData[id] !== undefined) {
          mergedLoaderData[id] = newLoaderData[id];
        }
      } else if (loaderData[id] !== undefined && match.route.loader) {
        // Preserve existing keys not included in newLoaderData and where a loader
        // wasn't removed by HMR
        mergedLoaderData[id] = loaderData[id];
      }
      if (errors && errors.hasOwnProperty(id)) {
        // Don't keep any loader data below the boundary
        break;
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  return mergedLoaderData;
} // Find the nearest error boundary, looking upwards from the leaf route (or the
// route specified by routeId) for the closest ancestor error boundary,
// defaulting to the root match

function findNearestBoundary(matches, routeId) {
  var eligibleMatches = routeId ? matches.slice(0, matches.findIndex(function (m) {
    return m.route.id === routeId;
  }) + 1) : _toConsumableArray(matches);
  return eligibleMatches.reverse().find(function (m) {
    return m.route.hasErrorBoundary === true;
  }) || matches[0];
}
function getShortCircuitMatches(routes) {
  // Prefer a root layout route if present, otherwise shim in a route object
  var route = routes.find(function (r) {
    return r.index || !r.path || r.path === "/";
  }) || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route: route
    }],
    route: route
  };
}
function getInternalRouterError(status, _temp4) {
  var _ref11 = _temp4 === void 0 ? {} : _temp4,
    pathname = _ref11.pathname,
    routeId = _ref11.routeId,
    method = _ref11.method,
    type = _ref11.type;
  var statusText = "Unknown Server Error";
  var errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method + " request to \"" + pathname + "\" but " + ("did not provide a `loader` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (type === "defer-action") {
      errorMessage = "defer() is not supported in actions";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = "Route \"" + routeId + "\" does not match URL \"" + pathname + "\"";
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = "No route matches URL \"" + pathname + "\"";
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + " request to \"" + pathname + "\" but " + ("did not provide an `action` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = "Invalid request method \"" + method.toUpperCase() + "\"";
    }
  }
  return new ErrorResponse(status || 500, statusText, new Error(errorMessage), true);
} // Find any returned redirect errors, starting from the lowest match

function findRedirect(results) {
  for (var i = results.length - 1; i >= 0; i--) {
    var result = results[i];
    if (isRedirectResult(result)) {
      return result;
    }
  }
}
function stripHashFromPath(path) {
  var parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash !== b.hash;
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectResponse(result) {
  if (!isResponse(result)) {
    return false;
  }
  var status = result.status;
  var location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isQueryRouteResponse(obj) {
  return obj && isResponse(obj.response) && (obj.type === ResultType.data || ResultType.error);
}
function isValidMethod(method) {
  return validRequestMethods.has(method);
}
function isMutationMethod(method) {
  return validMutationMethods.has(method);
}
function resolveDeferredResults(_x72, _x73, _x74, _x75, _x76, _x77) {
  return _resolveDeferredResults.apply(this, arguments);
}
function _resolveDeferredResults() {
  _resolveDeferredResults = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17(currentMatches, matchesToLoad, results, signal, isFetcher, currentLoaderData) {
    var _loop, index, _ret;
    return _regeneratorRuntime.wrap(function _callee17$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop(index) {
              var result, match, currentMatch, isRevalidatingLoader;
              return _regeneratorRuntime.wrap(function _loop$(_context18) {
                while (1) {
                  switch (_context18.prev = _context18.next) {
                    case 0:
                      result = results[index];
                      match = matchesToLoad[index]; // If we don't have a match, then we can have a deferred result to do
                      // anything with.  This is for revalidating fetchers where the route was
                      // removed during HMR
                      if (match) {
                        _context18.next = 4;
                        break;
                      }
                      return _context18.abrupt("return", "continue");
                    case 4:
                      currentMatch = currentMatches.find(function (m) {
                        return m.route.id === match.route.id;
                      });
                      isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== undefined;
                      if (!(isDeferredResult(result) && (isFetcher || isRevalidatingLoader))) {
                        _context18.next = 9;
                        break;
                      }
                      _context18.next = 9;
                      return resolveDeferredData(result, signal, isFetcher).then(function (result) {
                        if (result) {
                          results[index] = result || results[index];
                        }
                      });
                    case 9:
                    case "end":
                      return _context18.stop();
                  }
                }
              }, _loop);
            });
            index = 0;
          case 2:
            if (!(index < results.length)) {
              _context19.next = 10;
              break;
            }
            return _context19.delegateYield(_loop(index), "t0", 4);
          case 4:
            _ret = _context19.t0;
            if (!(_ret === "continue")) {
              _context19.next = 7;
              break;
            }
            return _context19.abrupt("continue", 7);
          case 7:
            index++;
            _context19.next = 2;
            break;
          case 10:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee17);
  }));
  return _resolveDeferredResults.apply(this, arguments);
}
function resolveDeferredData(_x78, _x79, _x80) {
  return _resolveDeferredData.apply(this, arguments);
}
function _resolveDeferredData() {
  _resolveDeferredData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee18(result, signal, unwrap) {
    var aborted;
    return _regeneratorRuntime.wrap(function _callee18$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            if (unwrap === void 0) {
              unwrap = false;
            }
            _context20.next = 3;
            return result.deferredData.resolveData(signal);
          case 3:
            aborted = _context20.sent;
            if (!aborted) {
              _context20.next = 6;
              break;
            }
            return _context20.abrupt("return");
          case 6:
            if (!unwrap) {
              _context20.next = 14;
              break;
            }
            _context20.prev = 7;
            return _context20.abrupt("return", {
              type: ResultType.data,
              data: result.deferredData.unwrappedData
            });
          case 11:
            _context20.prev = 11;
            _context20.t0 = _context20["catch"](7);
            return _context20.abrupt("return", {
              type: ResultType.error,
              error: _context20.t0
            });
          case 14:
            return _context20.abrupt("return", {
              type: ResultType.data,
              data: result.deferredData.data
            });
          case 15:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee18, null, [[7, 11]]);
  }));
  return _resolveDeferredData.apply(this, arguments);
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some(function (v) {
    return v === "";
  });
} // Note: This should match the format exported by useMatches, so if you change
// this please also change that :)  Eventually we'll DRY this up

function createUseMatchesMatch(match, loaderData) {
  var route = match.route,
    pathname = match.pathname,
    params = match.params;
  return {
    id: route.id,
    pathname: pathname,
    params: params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function getTargetMatch(matches, location) {
  var search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    // Return the leaf index route when index is present
    return matches[matches.length - 1];
  } // Otherwise grab the deepest "path contributing" match (ignoring index and
  // pathless layout routes)

  var pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
} //#endregion


//# sourceMappingURL=router.js.map
;// CONCATENATED MODULE: ./node_modules/react-router/dist/index.js






/**
 * React Router v6.9.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */




/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */

function isPolyfill(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var is = typeof Object.is === "function" ? Object.is : isPolyfill; // Intentionally not using named imports because Rollup uses dynamic
// dispatch for CommonJS interop named imports.

var useState = react.useState,
  useEffect = react.useEffect,
  useLayoutEffect = react.useLayoutEffect,
  useDebugValue = react.useDebugValue;
var didWarnOld18Alpha = false;
var didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore$2(subscribe, getSnapshot,
// Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  if (false) {} // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.

  var value = getSnapshot();
  if (false) { var cachedValue; } // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.

  var _useState = useState({
      inst: {
        value: value,
        getSnapshot: getSnapshot
      }
    }),
    _useState2 = slicedToArray_slicedToArray(_useState, 2),
    inst = _useState2[0].inst,
    forceUpdate = _useState2[1]; // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.

  useLayoutEffect(function () {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe, value, getSnapshot]);
  useEffect(function () {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }
    var handleStoreChange = function handleStoreChange() {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst: inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.

    return subscribe(handleStoreChange); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe]);
  useDebugValue(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  var prevValue = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !is(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

/**
 * Inlined into the react-router repo since use-sync-external-store does not
 * provide a UMD-compatible package, so we need this to be able to distribute
 * UMD react-router bundles
 */
var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var isServerEnvironment = !canUseDOM;
var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore$2;
var useSyncExternalStore =  true ? function (module) {
  return module.useSyncExternalStore;
}(react_namespaceObject) : shim;
var DataRouterContext = /*#__PURE__*/react.createContext(null);
if (false) {}
var DataRouterStateContext = /*#__PURE__*/react.createContext(null);
if (false) {}
var AwaitContext = /*#__PURE__*/react.createContext(null);
if (false) {}
var NavigationContext = /*#__PURE__*/react.createContext(null);
if (false) {}
var LocationContext = /*#__PURE__*/react.createContext(null);
if (false) {}
var RouteContext = /*#__PURE__*/react.createContext({
  outlet: null,
  matches: []
});
if (false) {}
var RouteErrorContext = /*#__PURE__*/react.createContext(null);
if (false) {}
function dist_extends() {
  dist_extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return dist_extends.apply(this, arguments);
}

/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/hooks/use-href
 */

function useHref(to, _temp) {
  var _ref8 = _temp === void 0 ? {} : _temp,
    relative = _ref8.relative;
  !useInRouterContext() ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  var _React$useContext = React.useContext(NavigationContext),
    basename = _React$useContext.basename,
    navigator = _React$useContext.navigator;
  var _useResolvedPath = useResolvedPath(to, {
      relative: relative
    }),
    hash = _useResolvedPath.hash,
    pathname = _useResolvedPath.pathname,
    search = _useResolvedPath.search;
  var joinedPathname = pathname; // If we're operating within a basename, prepend it to the pathname prior
  // to creating the href.  If this is a root navigation, then just use the raw
  // basename which allows the basename to have full control over the presence
  // of a trailing slash on root links

  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search: search,
    hash: hash
  });
}
/**
 * Returns true if this component is a descendant of a <Router>.
 *
 * @see https://reactrouter.com/hooks/use-in-router-context
 */

function useInRouterContext() {
  return react.useContext(LocationContext) != null;
}
/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/hooks/use-location
 */

function useLocation() {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;
  return react.useContext(LocationContext).location;
}
/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/hooks/use-navigation-type
 */

function useNavigationType() {
  return React.useContext(LocationContext).navigationType;
}
/**
 * Returns a PathMatch object if the given pattern matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * <NavLink>.
 *
 * @see https://reactrouter.com/hooks/use-match
 */

function useMatch(pattern) {
  !useInRouterContext() ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  var _useLocation = useLocation(),
    pathname = _useLocation.pathname;
  return React.useMemo(function () {
    return matchPath(pattern, pathname);
  }, [pathname, pattern]);
}
/**
 * The interface for the navigate() function returned from useNavigate().
 */

/**
 * Returns an imperative method for changing the location. Used by <Link>s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/hooks/use-navigate
 */
function useNavigate() {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;
  var _React$useContext2 = react.useContext(NavigationContext),
    basename = _React$useContext2.basename,
    navigator = _React$useContext2.navigator;
  var _React$useContext3 = react.useContext(RouteContext),
    matches = _React$useContext3.matches;
  var _useLocation2 = useLocation(),
    locationPathname = _useLocation2.pathname;
  var routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map(function (match) {
    return match.pathnameBase;
  }));
  var activeRef = react.useRef(false);
  react.useEffect(function () {
    activeRef.current = true;
  });
  var navigate = react.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }
     false ? 0 : void 0;
    if (!activeRef.current) return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    var path = router_resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path"); // If we're operating within a basename, prepend it to the pathname prior
    // to handing off to history.  If this is a root navigation, then we
    // navigate to the raw basename which allows the basename to have full
    // control over the presence of a trailing slash on root links

    if (basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : router_joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname]);
  return navigate;
}
var OutletContext = /*#__PURE__*/(/* unused pure expression or super */ null && (React.createContext(null)));
/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/hooks/use-outlet-context
 */

function useOutletContext() {
  return React.useContext(OutletContext);
}
/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by <Outlet> to render child routes.
 *
 * @see https://reactrouter.com/hooks/use-outlet
 */

function useOutlet(context) {
  var outlet = React.useContext(RouteContext).outlet;
  if (outlet) {
    return /*#__PURE__*/React.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }
  return outlet;
}
/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/hooks/use-params
 */

function useParams() {
  var _React$useContext4 = React.useContext(RouteContext),
    matches = _React$useContext4.matches;
  var routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/hooks/use-resolved-path
 */

function useResolvedPath(to, _temp2) {
  var _ref9 = _temp2 === void 0 ? {} : _temp2,
    relative = _ref9.relative;
  var _React$useContext5 = React.useContext(RouteContext),
    matches = _React$useContext5.matches;
  var _useLocation3 = useLocation(),
    locationPathname = _useLocation3.pathname;
  var routePathnamesJson = JSON.stringify(UNSAFE_getPathContributingMatches(matches).map(function (match) {
    return match.pathnameBase;
  }));
  return React.useMemo(function () {
    return resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path");
  }, [to, routePathnamesJson, locationPathname, relative]);
}
/**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an <Outlet> to render their child route's
 * element.
 *
 * @see https://reactrouter.com/hooks/use-routes
 */

function useRoutes(routes, locationArg) {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;
  var _React$useContext6 = react.useContext(NavigationContext),
    navigator = _React$useContext6.navigator;
  var dataRouterStateContext = react.useContext(DataRouterStateContext);
  var _React$useContext7 = react.useContext(RouteContext),
    parentMatches = _React$useContext7.matches;
  var routeMatch = parentMatches[parentMatches.length - 1];
  var parentParams = routeMatch ? routeMatch.params : {};
  var parentPathname = routeMatch ? routeMatch.pathname : "/";
  var parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  var parentRoute = routeMatch && routeMatch.route;
  if (false) { var parentPath; }
  var locationFromContext = useLocation();
  var location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    var parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ?  false ? 0 : invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  var pathname = location.pathname || "/";
  var remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  var matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  if (false) {}
  var renderedMatches = _renderMatches(matches && matches.map(function (match) {
    return Object.assign({}, match, {
      params: Object.assign({}, parentParams, match.params),
      pathname: router_joinPaths([parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
      pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : router_joinPaths([parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
    });
  }), parentMatches, dataRouterStateContext || undefined); // When a user passes in a `locationArg`, the associated routes need to
  // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
  // to use the scoped location instead of the global location.

  if (locationArg && renderedMatches) {
    return /*#__PURE__*/react.createElement(LocationContext.Provider, {
      value: {
        location: dist_extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  var error = useRouteError();
  var message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  var stack = error instanceof Error ? error.stack : null;
  var lightgrey = "rgba(200,200,200, 0.5)";
  var preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  var codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  var devInfo = null;
  if (false) {}
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("h2", null, "Unexpected Application Error!"), /*#__PURE__*/react.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /*#__PURE__*/react.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
var RenderErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(RenderErrorBoundary, _React$Component);
  var _super = _createSuper(RenderErrorBoundary);
  function RenderErrorBoundary(props) {
    var _this;
    classCallCheck_classCallCheck(this, RenderErrorBoundary);
    _this = _super.call(this, props);
    _this.state = {
      location: props.location,
      error: props.error
    };
    return _this;
  }
  createClass_createClass(RenderErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      console.error("React Router caught the following error during render", error, errorInfo);
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.error ? /*#__PURE__*/react.createElement(RouteContext.Provider, {
        value: this.props.routeContext
      }, /*#__PURE__*/react.createElement(RouteErrorContext.Provider, {
        value: this.state.error,
        children: this.props.component
      })) : this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        error: error
      };
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      // When we get into an error state, the user will likely click "back" to the
      // previous page that didn't have an error. Because this wraps the entire
      // application, that will have no effect--the error page continues to display.
      // This gives us a mechanism to recover from the error when the location changes.
      //
      // Whether we're in an error state or not, we update the location in state
      // so that when we are in an error state, it gets reset when a new location
      // comes in and the user recovers from the error.
      if (state.location !== props.location) {
        return {
          error: props.error,
          location: props.location
        };
      } // If we're not changing locations, preserve the location but still surface
      // any new errors that may come through. We retain the existing error, we do
      // this because the error provided from the app state may be cleared without
      // the location changing.

      return {
        error: props.error || state.error,
        location: state.location
      };
    }
  }]);
  return RenderErrorBoundary;
}(react.Component);
function RenderedRoute(_ref) {
  var routeContext = _ref.routeContext,
    match = _ref.match,
    children = _ref.children;
  var dataRouterContext = react.useContext(DataRouterContext); // Track how deep we got in our render pass to emulate SSR componentDidCatch
  // in a DataStaticRouter

  if (dataRouterContext && dataRouterContext["static"] && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /*#__PURE__*/react.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (matches == null) {
    if (dataRouterState != null && dataRouterState.errors) {
      // Don't bail if we have data router errors so we can render them in the
      // boundary.  Use the pre-matched (or shimmed) matches
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  var renderedMatches = matches; // If we have data errors, trim matches to the highest error boundary

  var errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    var errorIndex = renderedMatches.findIndex(function (m) {
      return m.route.id && (errors == null ? void 0 : errors[m.route.id]);
    });
    !(errorIndex >= 0) ?  false ? 0 : invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  return renderedMatches.reduceRight(function (outlet, match, index) {
    var error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null; // Only data routers handle errors

    var errorElement = null;
    if (dataRouterState) {
      if (match.route.ErrorBoundary) {
        errorElement = /*#__PURE__*/react.createElement(match.route.ErrorBoundary, null);
      } else if (match.route.errorElement) {
        errorElement = match.route.errorElement;
      } else {
        errorElement = /*#__PURE__*/react.createElement(DefaultErrorComponent, null);
      }
    }
    var matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
    var getChildren = function getChildren() {
      var children = outlet;
      if (error) {
        children = errorElement;
      } else if (match.route.Component) {
        children = /*#__PURE__*/react.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      }
      return /*#__PURE__*/react.createElement(RenderedRoute, {
        match: match,
        routeContext: {
          outlet: outlet,
          matches: matches
        },
        children: children
      });
    }; // Only wrap in an error boundary within data router usages when we have an
    // ErrorBoundary/errorElement on this route.  Otherwise let it bubble up to
    // an ancestor ErrorBoundary/errorElement

    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /*#__PURE__*/react.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      component: errorElement,
      error: error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook;
(function (DataRouterHook) {
  DataRouterHook["UseBlocker"] = "useBlocker";
  DataRouterHook["UseRevalidator"] = "useRevalidator";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function (DataRouterStateHook) {
  DataRouterStateHook["UseBlocker"] = "useBlocker";
  DataRouterStateHook["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook["UseActionData"] = "useActionData";
  DataRouterStateHook["UseRouteError"] = "useRouteError";
  DataRouterStateHook["UseNavigation"] = "useNavigation";
  DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook["UseMatches"] = "useMatches";
  DataRouterStateHook["UseRevalidator"] = "useRevalidator";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  var ctx = React.useContext(DataRouterContext);
  !ctx ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  var state = react.useContext(DataRouterStateContext);
  !state ?  false ? 0 : invariant(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  var route = react.useContext(RouteContext);
  !route ?  false ? 0 : invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  var route = useRouteContext(hookName);
  var thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ?  false ? 0 : invariant(false) : void 0;
  return thisRoute.route.id;
}
/**
 * Returns the current navigation, defaulting to an "idle" navigation when
 * no navigation is in progress
 */

function useNavigation() {
  var state = useDataRouterState(DataRouterStateHook.UseNavigation);
  return state.navigation;
}
/**
 * Returns a revalidate function for manually triggering revalidation, as well
 * as the current state of any manual revalidations
 */

function useRevalidator() {
  var dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator);
  var state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return {
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  };
}
/**
 * Returns the active route matches, useful for accessing loaderData for
 * parent/child routes or the route "handle" property
 */

function useMatches() {
  var _useDataRouterState = useDataRouterState(DataRouterStateHook.UseMatches),
    matches = _useDataRouterState.matches,
    loaderData = _useDataRouterState.loaderData;
  return React.useMemo(function () {
    return matches.map(function (match) {
      var pathname = match.pathname,
        params = match.params; // Note: This structure matches that created by createUseMatchesMatch
      // in the @remix-run/router , so if you change this please also change
      // that :)  Eventually we'll DRY this up

      return {
        id: match.route.id,
        pathname: pathname,
        params: params,
        data: loaderData[match.route.id],
        handle: match.route.handle
      };
    });
  }, [matches, loaderData]);
}
/**
 * Returns the loader data for the nearest ancestor Route loader
 */

function useLoaderData() {
  var state = useDataRouterState(DataRouterStateHook.UseLoaderData);
  var routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return undefined;
  }
  return state.loaderData[routeId];
}
/**
 * Returns the loaderData for the given routeId
 */

function useRouteLoaderData(routeId) {
  var state = useDataRouterState(DataRouterStateHook.UseRouteLoaderData);
  return state.loaderData[routeId];
}
/**
 * Returns the action data for the nearest ancestor Route action
 */

function useActionData() {
  var state = useDataRouterState(DataRouterStateHook.UseActionData);
  var route = React.useContext(RouteContext);
  !route ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  return Object.values((state == null ? void 0 : state.actionData) || {})[0];
}
/**
 * Returns the nearest ancestor Route error, which could be a loader/action
 * error or a render error.  This is intended to be called from your
 * ErrorBoundary/errorElement to display a proper error message.
 */

function useRouteError() {
  var _state$errors;
  var error = react.useContext(RouteErrorContext);
  var state = useDataRouterState(DataRouterStateHook.UseRouteError);
  var routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError); // If this was a render error, we put it in a RouteError context inside
  // of RenderErrorBoundary

  if (error) {
    return error;
  } // Otherwise look for errors from our data router state

  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
/**
 * Returns the happy-path data from the nearest ancestor <Await /> value
 */

function useAsyncValue() {
  var value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
/**
 * Returns the error from the nearest ancestor <Await /> value
 */

function useAsyncError() {
  var value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
var blockerId = 0;
/**
 * Allow the application to block navigations within the SPA and present the
 * user a confirmation dialog to confirm the navigation.  Mostly used to avoid
 * using half-filled form data.  This does not handle hard-reloads or
 * cross-origin navigations.
 */

function useBlocker(shouldBlock) {
  var _useDataRouterContext = useDataRouterContext(DataRouterHook.UseBlocker),
    router = _useDataRouterContext.router;
  var state = useDataRouterState(DataRouterStateHook.UseBlocker);
  var _React$useState = React.useState(function () {
      return String(++blockerId);
    }),
    _React$useState2 = _slicedToArray(_React$useState, 1),
    blockerKey = _React$useState2[0];
  var blockerFunction = React.useCallback(function (args) {
    return typeof shouldBlock === "function" ? !!shouldBlock(args) : !!shouldBlock;
  }, [shouldBlock]);
  var blocker = router.getBlocker(blockerKey, blockerFunction); // Cleanup on unmount

  React.useEffect(function () {
    return function () {
      return router.deleteBlocker(blockerKey);
    };
  }, [router, blockerKey]); // Prefer the blocker from state since DataRouterContext is memoized so this
  // ensures we update on blocker state updates

  return state.blockers.get(blockerKey) || blocker;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
     false ? 0 : void 0;
  }
}

/**
 * Given a Remix Router instance, render the appropriate UI
 */
function RouterProvider(_ref) {
  var fallbackElement = _ref.fallbackElement,
    router = _ref.router;
  var getState = React.useCallback(function () {
    return router.state;
  }, [router]); // Sync router state to our component state to force re-renders

  var state = useSyncExternalStore(router.subscribe, getState,
  // We have to provide this so React@18 doesn't complain during hydration,
  // but we pass our serialized hydration data into the router so state here
  // is already synced with what the server saw
  getState);
  var navigator = React.useMemo(function () {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: function go(n) {
        return router.navigate(n);
      },
      push: function push(to, state, opts) {
        return router.navigate(to, {
          state: state,
          preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
        });
      },
      replace: function replace(to, state, opts) {
        return router.navigate(to, {
          replace: true,
          state: state,
          preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
        });
      }
    };
  }, [router]);
  var basename = router.basename || "/";
  var dataRouterContext = React.useMemo(function () {
    return {
      router: router,
      navigator: navigator,
      "static": false,
      basename: basename
    };
  }, [router, navigator, basename]); // The fragment and {null} here are important!  We need them to keep React 18's
  // useId happy when we are server-rendering since we may have a <script> here
  // containing the hydrated server-side staticContext (from StaticRouterProvider).
  // useId relies on the component tree structure to generate deterministic id's
  // so we need to ensure it remains the same on the client even though
  // we don't need the <script> tag

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /*#__PURE__*/React.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(Router, {
    basename: router.basename,
    location: router.state.location,
    navigationType: router.state.historyAction,
    navigator: navigator
  }, router.state.initialized ? /*#__PURE__*/React.createElement(Routes, null) : fallbackElement))), null);
}

/**
 * A <Router> that stores all entries in memory.
 *
 * @see https://reactrouter.com/router-components/memory-router
 */
function MemoryRouter(_ref2) {
  var basename = _ref2.basename,
    children = _ref2.children,
    initialEntries = _ref2.initialEntries,
    initialIndex = _ref2.initialIndex;
  var historyRef = react.useRef();
  if (historyRef.current == null) {
    historyRef.current = router_createMemoryHistory({
      initialEntries: initialEntries,
      initialIndex: initialIndex,
      v5Compat: true
    });
  }
  var history = historyRef.current;
  var _React$useState3 = react.useState({
      action: history.action,
      location: history.location
    }),
    _React$useState4 = slicedToArray_slicedToArray(_React$useState3, 2),
    state = _React$useState4[0],
    setState = _React$useState4[1];
  react.useLayoutEffect(function () {
    return history.listen(setState);
  }, [history]);
  return /*#__PURE__*/react.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}

/**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/components/navigate
 */
function Navigate(_ref3) {
  var to = _ref3.to,
    replace = _ref3.replace,
    state = _ref3.state,
    relative = _ref3.relative;
  !useInRouterContext() ?  false ? 0 : UNSAFE_invariant(false) : void 0;
   false ? 0 : void 0;
  var dataRouterState = React.useContext(DataRouterStateContext);
  var navigate = useNavigate();
  React.useEffect(function () {
    // Avoid kicking off multiple navigations if we're in the middle of a
    // data-router navigation, since components get re-rendered when we enter
    // a submitting/loading state
    if (dataRouterState && dataRouterState.navigation.state !== "idle") {
      return;
    }
    navigate(to, {
      replace: replace,
      state: state,
      relative: relative
    });
  });
  return null;
}

/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/components/outlet
 */
function Outlet(props) {
  return useOutlet(props.context);
}

/**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/components/route
 */
function Route(_props) {
   false ? 0 : invariant(false);
}

/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a <Router> directly. Instead, you'll render a
 * router that is more specific to your environment such as a <BrowserRouter>
 * in web browsers or a <StaticRouter> for server rendering.
 *
 * @see https://reactrouter.com/router-components/router
 */
function Router(_ref4) {
  var _ref4$basename = _ref4.basename,
    basenameProp = _ref4$basename === void 0 ? "/" : _ref4$basename,
    _ref4$children = _ref4.children,
    children = _ref4$children === void 0 ? null : _ref4$children,
    locationProp = _ref4.location,
    _ref4$navigationType = _ref4.navigationType,
    navigationType = _ref4$navigationType === void 0 ? Action.Pop : _ref4$navigationType,
    navigator = _ref4.navigator,
    _ref4$static = _ref4["static"],
    staticProp = _ref4$static === void 0 ? false : _ref4$static;
  !!useInRouterContext() ?  false ? 0 : invariant(false) : void 0; // Preserve trailing slashes on basename, so we can let the user control
  // the enforcement of trailing slashes throughout the app

  var basename = basenameProp.replace(/^\/*/, "/");
  var navigationContext = react.useMemo(function () {
    return {
      basename: basename,
      navigator: navigator,
      "static": staticProp
    };
  }, [basename, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  var _locationProp = locationProp,
    _locationProp$pathnam = _locationProp.pathname,
    pathname = _locationProp$pathnam === void 0 ? "/" : _locationProp$pathnam,
    _locationProp$search = _locationProp.search,
    search = _locationProp$search === void 0 ? "" : _locationProp$search,
    _locationProp$hash = _locationProp.hash,
    hash = _locationProp$hash === void 0 ? "" : _locationProp$hash,
    _locationProp$state = _locationProp.state,
    state = _locationProp$state === void 0 ? null : _locationProp$state,
    _locationProp$key = _locationProp.key,
    key = _locationProp$key === void 0 ? "default" : _locationProp$key;
  var locationContext = react.useMemo(function () {
    var trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search: search,
        hash: hash,
        state: state,
        key: key
      },
      navigationType: navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
   false ? 0 : void 0;
  if (locationContext == null) {
    return null;
  }
  return /*#__PURE__*/react.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /*#__PURE__*/react.createElement(LocationContext.Provider, {
    children: children,
    value: locationContext
  }));
}

/**
 * A container for a nested tree of <Route> elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/components/routes
 */
function Routes(_ref5) {
  var children = _ref5.children,
    location = _ref5.location;
  var dataRouterContext = react.useContext(DataRouterContext); // When in a DataRouterContext _without_ children, we use the router routes
  // directly.  If we have children, then we're in a descendant tree and we
  // need to use child routes.

  var routes = dataRouterContext && !children ? dataRouterContext.router.routes : createRoutesFromChildren(children);
  return useRoutes(routes, location);
}

/**
 * Component to use for rendering lazily loaded data from returning defer()
 * in a loader function
 */
function Await(_ref6) {
  var children = _ref6.children,
    errorElement = _ref6.errorElement,
    resolve = _ref6.resolve;
  return /*#__PURE__*/React.createElement(AwaitErrorBoundary, {
    resolve: resolve,
    errorElement: errorElement
  }, /*#__PURE__*/React.createElement(ResolveAwait, null, children));
}
var AwaitRenderStatus;
(function (AwaitRenderStatus) {
  AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
  AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
  AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
})(AwaitRenderStatus || (AwaitRenderStatus = {}));
var neverSettledPromise = new Promise(function () {});
var AwaitErrorBoundary = /*#__PURE__*/function (_React$Component2) {
  _inherits(AwaitErrorBoundary, _React$Component2);
  var _super2 = _createSuper(AwaitErrorBoundary);
  function AwaitErrorBoundary(props) {
    var _this2;
    classCallCheck_classCallCheck(this, AwaitErrorBoundary);
    _this2 = _super2.call(this, props);
    _this2.state = {
      error: null
    };
    return _this2;
  }
  createClass_createClass(AwaitErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      console.error("<Await> caught the following error during render", error, errorInfo);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        children = _this$props.children,
        errorElement = _this$props.errorElement,
        resolve = _this$props.resolve;
      var promise = null;
      var status = AwaitRenderStatus.pending;
      if (!(resolve instanceof Promise)) {
        // Didn't get a promise - provide as a resolved promise
        status = AwaitRenderStatus.success;
        promise = Promise.resolve();
        Object.defineProperty(promise, "_tracked", {
          get: function get() {
            return true;
          }
        });
        Object.defineProperty(promise, "_data", {
          get: function get() {
            return resolve;
          }
        });
      } else if (this.state.error) {
        // Caught a render error, provide it as a rejected promise
        status = AwaitRenderStatus.error;
        var renderError = this.state.error;
        promise = Promise.reject()["catch"](function () {}); // Avoid unhandled rejection warnings

        Object.defineProperty(promise, "_tracked", {
          get: function get() {
            return true;
          }
        });
        Object.defineProperty(promise, "_error", {
          get: function get() {
            return renderError;
          }
        });
      } else if (resolve._tracked) {
        // Already tracked promise - check contents
        promise = resolve;
        status = promise._error !== undefined ? AwaitRenderStatus.error : promise._data !== undefined ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
      } else {
        // Raw (untracked) promise - track it
        status = AwaitRenderStatus.pending;
        Object.defineProperty(resolve, "_tracked", {
          get: function get() {
            return true;
          }
        });
        promise = resolve.then(function (data) {
          return Object.defineProperty(resolve, "_data", {
            get: function get() {
              return data;
            }
          });
        }, function (error) {
          return Object.defineProperty(resolve, "_error", {
            get: function get() {
              return error;
            }
          });
        });
      }
      if (status === AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError) {
        // Freeze the UI by throwing a never resolved promise
        throw neverSettledPromise;
      }
      if (status === AwaitRenderStatus.error && !errorElement) {
        // No errorElement, throw to the nearest route-level error boundary
        throw promise._error;
      }
      if (status === AwaitRenderStatus.error) {
        // Render via our errorElement
        return /*#__PURE__*/react.createElement(AwaitContext.Provider, {
          value: promise,
          children: errorElement
        });
      }
      if (status === AwaitRenderStatus.success) {
        // Render children with resolved value
        return /*#__PURE__*/react.createElement(AwaitContext.Provider, {
          value: promise,
          children: children
        });
      } // Throw to the suspense boundary

      throw promise;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        error: error
      };
    }
  }]);
  return AwaitErrorBoundary;
}(react.Component);
/**
 * @private
 * Indirection to leverage useAsyncValue for a render-prop API on <Await>
 */
function ResolveAwait(_ref7) {
  var children = _ref7.children;
  var data = useAsyncValue();
  var toRender = typeof children === "function" ? children(data) : children;
  return /*#__PURE__*/React.createElement(React.Fragment, null, toRender);
} ///////////////////////////////////////////////////////////////////////////////
// UTILS
///////////////////////////////////////////////////////////////////////////////

/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/utils/create-routes-from-children
 */

function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  var routes = [];
  react.Children.forEach(children, function (element, index) {
    if (! /*#__PURE__*/react.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }
    if (element.type === react.Fragment) {
      // Transparently support React.Fragment and its children.
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, parentPath));
      return;
    }
    !(element.type === Route) ?  false ? 0 : invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ?  false ? 0 : invariant(false) : void 0;
    var treePath = [].concat(toConsumableArray_toConsumableArray(parentPath), [index]);
    var route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
/**
 * Renders the result of `matchRoutes()` into a React element.
 */

function renderMatches(matches) {
  return _renderMatches(matches);
}
function detectErrorBoundary(route) {
  if (false) {} // Note: this check also occurs in createRoutesFromChildren so update
  // there if you change this

  return Boolean(route.ErrorBoundary) || Boolean(route.errorElement);
}
function createMemoryRouter(routes, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    history: createMemoryHistory({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes: routes,
    detectErrorBoundary: detectErrorBoundary
  }).initialize();
} ///////////////////////////////////////////////////////////////////////////////


//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/index.scss
var cjs_ruleSet_1_rules_0_oneOf_6_use_3_src = __webpack_require__("../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[6].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[6].use[3]!./src/index.scss");
;// CONCATENATED MODULE: ./src/index.scss

      
      
      
      
      
      
      
      
      

var src_options = {};

src_options.styleTagTransform = (styleTagTransform_default());
src_options.setAttributes = (setAttributesWithoutAttributes_default());

      src_options.insert = insertBySelector_default().bind(null, "head");
    
src_options.domAPI = (styleDomAPI_default());
src_options.insertStyleElement = (insertStyleElement_default());

var src_update = injectStylesIntoStyleTag_default()(cjs_ruleSet_1_rules_0_oneOf_6_use_3_src/* default */.Z, src_options);




       /* harmony default export */ const src = (cjs_ruleSet_1_rules_0_oneOf_6_use_3_src/* default */.Z && cjs_ruleSet_1_rules_0_oneOf_6_use_3_src/* default.locals */.Z.locals ? cjs_ruleSet_1_rules_0_oneOf_6_use_3_src/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/menu/index.tsx
function MainMenu(){var nav=useNavigate();return/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("button",{children:"Play"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{onClick:function onClick(){return nav('/settings');},children:"Settings"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{onClick:function onClick(){return Interop.UnityEngine.Application.Quit();},children:"Quit"})]});}
;// CONCATENATED MODULE: ../node_modules/clsx/dist/clsx.m.js
function r(e) {
  var t,
    f,
    n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;else if ("object" == typeof e) if (Array.isArray(e)) for (t = 0; t < e.length; t++) {
    e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (t in e) {
    e[t] && (n && (n += " "), n += t);
  }
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length;) {
    (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  }
  return n;
}
/* harmony default export */ const clsx_m = (clsx);
// EXTERNAL MODULE: ../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./node_modules/@reactunity/material/dist/src/ripple/index.module.scss
var index_module = __webpack_require__("../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./node_modules/@reactunity/material/dist/src/ripple/index.module.scss");
;// CONCATENATED MODULE: ./node_modules/@reactunity/material/dist/src/ripple/index.module.scss

      
      
      
      
      
      
      
      
      

var index_module_options = {};

index_module_options.styleTagTransform = (styleTagTransform_default());
index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      index_module_options.insert = insertBySelector_default().bind(null, "head");
    
index_module_options.domAPI = (styleDomAPI_default());
index_module_options.insertStyleElement = (insertStyleElement_default());

var index_module_update = injectStylesIntoStyleTag_default()(index_module/* default */.Z, index_module_options);




       /* harmony default export */ const ripple_index_module = (index_module/* default */.Z && index_module/* default.locals */.Z.locals ? index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./node_modules/@reactunity/material/dist/src/ripple/index.js


function addRipple(containerElement, pressPosition) {
  if (!containerElement) return null;
  var ripple = UnityBridge.createElement('view', '', HostContainer);
  ripple.ClassName = "".concat(ripple_index_module.ripple, " mat-ripple");
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
    ripple.Style.Set('position', 'inset');
    ripple.Style.Set('left', '50%');
    ripple.Style.Set('top', '50%');
    ripple.Style.Set('width', maxDimension);
    ripple.Style.Set('height', maxDimension);
  }
  containerElement.ClassList.Add(ripple_index_module.rippleParent);
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
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reactunity/material/dist/src/util/helpers.js

function getChildrenOfType(children, type) {
  return React.Children.toArray(children).filter(function (x) {
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
//# sourceMappingURL=helpers.js.map
// EXTERNAL MODULE: ../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./node_modules/@reactunity/material/dist/src/button/index.module.scss
var button_index_module = __webpack_require__("../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./node_modules/@reactunity/material/dist/src/button/index.module.scss");
;// CONCATENATED MODULE: ./node_modules/@reactunity/material/dist/src/button/index.module.scss

      
      
      
      
      
      
      
      
      

var button_index_module_options = {};

button_index_module_options.styleTagTransform = (styleTagTransform_default());
button_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      button_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
button_index_module_options.domAPI = (styleDomAPI_default());
button_index_module_options.insertStyleElement = (insertStyleElement_default());

var button_index_module_update = injectStylesIntoStyleTag_default()(button_index_module/* default */.Z, button_index_module_options);




       /* harmony default export */ const src_button_index_module = (button_index_module/* default */.Z && button_index_module/* default.locals */.Z.locals ? button_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./node_modules/@reactunity/material/dist/src/button/index.js
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
var Button = react.memo(_Button);
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./src/settings/gameplay/index.tsx
function GameplaySettings(){return/*#__PURE__*/(0,jsx_runtime.jsx)("view",{children:"Gameplay settings"});}
// EXTERNAL MODULE: ../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./src/settings/index.module.scss
var settings_index_module = __webpack_require__("../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[1]!../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[0].oneOf[7].use[2]!../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[7].use[3]!./src/settings/index.module.scss");
;// CONCATENATED MODULE: ./src/settings/index.module.scss

      
      
      
      
      
      
      
      
      

var settings_index_module_options = {};

settings_index_module_options.styleTagTransform = (styleTagTransform_default());
settings_index_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      settings_index_module_options.insert = insertBySelector_default().bind(null, "head");
    
settings_index_module_options.domAPI = (styleDomAPI_default());
settings_index_module_options.insertStyleElement = (insertStyleElement_default());

var settings_index_module_update = injectStylesIntoStyleTag_default()(settings_index_module/* default */.Z, settings_index_module_options);




       /* harmony default export */ const src_settings_index_module = (settings_index_module/* default */.Z && settings_index_module/* default.locals */.Z.locals ? settings_index_module/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/settings/index.tsx
function Settings(){var nav=useNavigate();return/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:src_settings_index_module.host,children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("view",{className:src_settings_index_module.sidepanel,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{variant:"text",onClick:function onClick(){return nav('gameplay');},children:"Gameplay"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{variant:"text",onClick:function onClick(){return nav('video');},children:"Video"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{variant:"text",onClick:function onClick(){return nav('audio');},children:"Audio"}),/*#__PURE__*/(0,jsx_runtime.jsx)(Button,{variant:"text",onClick:function onClick(){return nav('..');},children:"Back"})]}),/*#__PURE__*/(0,jsx_runtime.jsx)(Routes,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("view",{className:src_settings_index_module.main,children:/*#__PURE__*/(0,jsx_runtime.jsx)(Route,{path:"gameplay",element:/*#__PURE__*/(0,jsx_runtime.jsx)(GameplaySettings,{})})})})]});}
;// CONCATENATED MODULE: ./src/index.tsx
function App(){return/*#__PURE__*/(0,jsx_runtime.jsxs)(MemoryRouter,{children:["This sample is a work-in-progress. View other samples instead.",/*#__PURE__*/(0,jsx_runtime.jsxs)(Routes,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Route,{path:"/",element:/*#__PURE__*/(0,jsx_runtime.jsx)(MainMenu,{})}),/*#__PURE__*/(0,jsx_runtime.jsx)(Route,{path:"/settings/*",element:/*#__PURE__*/(0,jsx_runtime.jsx)(Settings,{})})]})]});}_render(/*#__PURE__*/(0,jsx_runtime.jsx)(App,{}));
})();

/******/ })()
;