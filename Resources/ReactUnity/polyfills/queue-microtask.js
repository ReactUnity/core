(function () {
  if (global.queueMicrotask) return;
  var promise;
  global.queueMicrotask = function queueMicrotask(cb) {
    return (promise || (promise = Promise.resolve()))
      .then(cb)
      .catch(err => setTimeout(() => { throw err }, 0));
  }
})();
