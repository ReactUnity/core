// ES2022 library APIs the engines are missing. The floor is QuickJS 2021-03-27, which has all of
// ES2021 and none of ES2022; Jint and ClearScript draw the line elsewhere, so each API is guarded
// on its own and an engine upgrade turns the shim off by itself.
//
// Error.cause and RegExp's `d` flag are not here -- neither can be shimmed honestly, so they stay
// type errors via @reactunity/scripts' polyfills.d.ts. Keep the two files in sync.
//
// defineProperty, not assignment: an enumerable Array.prototype.at breaks every for...in.
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

  // %TypedArray%.prototype is shared but not a global, so reach it through a concrete view.
  if (typeof Int8Array === 'function') define(Object.getPrototypeOf(Int8Array.prototype), 'at', at);
})();
