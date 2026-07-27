// The ES2022 library APIs that ReactUnity's engines are missing.
//
// The floor is the QuickJS binary in com.reactunity.quickjs -- Bellard's 2021-03-27 build. It
// has the whole ES2021 surface (replaceAll, flatMap, allSettled) and none of ES2022's;
// Object.hasOwn only reached QuickJS in the 2023-12-09 release. Jint and ClearScript each draw
// the line somewhere else again, so every API is guarded on its own rather than behind an
// engine or capability check: whichever engine already has one keeps its native implementation,
// and upgrading an engine turns the corresponding shim off without anyone editing this file.
//
// Only what can be shimmed honestly is here. `Error.cause` is constructor plumbing that would
// have to be threaded through every Error subclass, and RegExp's `d` flag (hasIndices) is match
// engine behaviour with no script-level equivalent. Neither is polyfilled, and neither is
// declared in @reactunity/scripts' polyfills.d.ts -- reaching for them stays a type error rather
// than becoming a runtime one.
//
// Every definition goes through defineProperty for the non-enumerable descriptor. A plain
// assignment to Array.prototype.at would make it enumerable, and every `for...in` over an array
// anywhere in the app would start yielding "at".
(function () {
  function define(target, name, value) {
    if (!target || name in target) return;
    Object.defineProperty(target, name, { value: value, writable: true, configurable: true, enumerable: false });
  }

  define(Object, 'hasOwn', function hasOwn(target, key) {
    if (target === null || target === undefined) throw new TypeError('Cannot convert undefined or null to object');
    return Object.prototype.hasOwnProperty.call(Object(target), key);
  });

  function at(index) {
    var self = Object(this);
    var len = self.length >>> 0;
    var i = Math.trunc(+index) || 0;
    if (i < 0) i += len;
    return i < 0 || i >= len ? undefined : self[i];
  }

  define(Array.prototype, 'at', at);
  define(String.prototype, 'at', at);

  // The typed arrays share one intrinsic prototype (%TypedArray%.prototype) that is not exposed
  // as a global, so it has to be reached through a concrete view.
  if (typeof Int8Array === 'function') define(Object.getPrototypeOf(Int8Array.prototype), 'at', at);
})();
