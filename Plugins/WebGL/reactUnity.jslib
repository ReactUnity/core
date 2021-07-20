var ReactUnityPlugin = {
  openWindow: function (link) {
    var url = Pointer_stringify(link);

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
    var cursorStyle = Pointer_stringify(cursor);

    canvas.style.cursor = cursorStyle || null;
  }
};

mergeInto(LibraryManager.library, ReactUnityPlugin);
