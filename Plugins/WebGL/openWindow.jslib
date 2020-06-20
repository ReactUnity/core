var OpenWindowPlugin = {
  openWindow: function (link) {
    var url = Pointer_stringify(link);

    var openUrl = function () {
      window.open(url);
      document.removeEventListener('mouseup', openUrl);
      document.removeEventListener('touchend', openUrl);
    };

    document.addEventListener('mouseup', openUrl);
    document.addEventListener('touchend', openUrl);
  }
};

mergeInto(LibraryManager.library, OpenWindowPlugin);
