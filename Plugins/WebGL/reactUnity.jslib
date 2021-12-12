var ReactUnityPlugin = {
  $reactUnityState: {
    stringify: function (arg) { return (typeof UTF8ToString !== 'undefined' ? UTF8ToString : Pointer_stringify)(arg); },
  },

  openWindow: function (link) {
    var url = reactUnityState.stringify(link);

    var openUrl = function () {
      window.open(url);
      document.removeEventListener('mouseup', openUrl);
      document.removeEventListener('touchend', openUrl);
    };

    document.addEventListener('mouseup', openUrl);
    document.addEventListener('touchend', openUrl);
  },

  setWebGLCursor: function (cursor) {
    var canvas = Module.canvas;
    var cursorStyle = reactUnityState.stringify(cursor);

    canvas.style.cursor = cursorStyle || null;
  }
};

autoAddDeps(ReactUnityPlugin, '$reactUnityState');
mergeInto(LibraryManager.library, ReactUnityPlugin);
