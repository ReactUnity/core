var WebGLInput = {
  $instances: [],

  WebGLInputCreate: function (fontSize, text, placeholder, isMultiLine, isPassword, isHidden) {
    var canvas = Module.canvas;
    var container = canvas.parentElement;
    var input = document.createElement(isMultiLine ? "textarea" : "input");
    input.className = 'unity-webgl-support-input';
    input.style.position = "absolute";
    input.style.overflow = 'hidden';

    input.style.outlineWidth = 1 + 'px';
    input.style.opacity = isHidden ? 0 : 1;
    input.style.resize = 'none'; // for textarea
    input.style.padding = '0px';
    input.style.pointerEvents = 'all';

    input.spellcheck = false;
    input.value = Pointer_stringify(text);
    input.placeholder = Pointer_stringify(placeholder);
    input.style.fontSize = fontSize + "px";
    input.style.lineHeight = fontSize + 'px';

    if (isPassword) {
      input.type = 'password';
    }

    container.appendChild(input);
    return instances.push(input) - 1;
  },
  WebGLInputSetRect: function (id, x, y, width, height, lineHeight) {
    var canvas = Module.canvas;
    var container = canvas.parentElement;
    var input = instances[id];

    if (canvas) {
      var scaleX = container.offsetWidth / canvas.width;
      var scaleY = container.offsetHeight / canvas.height;

      if (scaleX && scaleY) {
        x *= scaleX;
        width *= scaleX;
        y *= scaleY;
        height *= scaleY;
      }
    }

    var scale = lineHeight >= 0 ? lineHeight : 1;
    height = height / scale;

    input.style.top = y + "px";
    input.style.left = x + "px";
    input.style.width = width + "px";
    input.style.height = height + "px";
    input.style.maxWidth = width + "px";
    input.style.maxHeight = height + "px";

    if (lineHeight >= 0) {
      input.style.transformOrigin = 'top';
      input.style.transform = 'scaleY(' + lineHeight + ')';
    }
  },
  WebGLInputEnterSubmit: function (id, falg) {
    var input = instances[id];
    // for enter key
    input.addEventListener('keydown', function (e) {
      if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
        if (falg) {
          e.preventDefault();
          input.blur();
        }
      }
    });
  },
  WebGLInputTab: function (id, cb) {
    var input = instances[id];
    // for tab key
    input.addEventListener('keydown', function (e) {
      if ((e.which && e.which === 9) || (e.keyCode && e.keyCode === 9)) {
        e.preventDefault();

        // if enable tab text
        if (input.enableTabText) {
          var val = input.value;
          var start = input.selectionStart;
          var end = input.selectionEnd;
          input.value = val.substr(0, start) + '\t' + val.substr(end, val.length);
          input.setSelectionRange(start + 1, start + 1);
          input.oninput();	// call oninput to exe ValueChange function!!
        } else {
          Runtime.dynCall("vii", cb, [id, e.shiftKey ? -1 : 1]);
        }
      }
    });
  },
  WebGLInputFocus: function (id) {
    var input = instances[id];
    input.focus({ preventScroll: true });
  },
  WebGLInputOnFocus: function (id, cb) {
    var input = instances[id];
    input.onfocus = function () {
      Runtime.dynCall("vi", cb, [id]);
    };
  },
  WebGLInputOnBlur: function (id, cb) {
    var input = instances[id];
    input.onblur = function () {
      Runtime.dynCall("vi", cb, [id]);
    };
  },
  WebGLInputIsFocus: function (id) {
    return instances[id] === document.activeElement;
  },
  WebGLInputOnValueChange: function (id, cb) {
    var input = instances[id];
    input.oninput = function () {
      var value = allocate(intArrayFromString(input.value), 'i8', ALLOC_NORMAL);
      Runtime.dynCall("vii", cb, [id, value]);
    };
  },
  WebGLInputOnEditEnd: function (id, cb) {
    var input = instances[id];
    input.onchange = function () {
      var value = allocate(intArrayFromString(input.value), 'i8', ALLOC_NORMAL);
      Runtime.dynCall("vii", cb, [id, value]);
    };
  },
  WebGLInputSelectionStart: function (id) {
    var input = instances[id];
    return input.selectionStart;
  },
  WebGLInputSelectionEnd: function (id) {
    var input = instances[id];
    return input.selectionEnd;
  },
  WebGLInputSelectionDirection: function (id) {
    var input = instances[id];
    return (input.selectionDirection == "backward") ? -1 : 1;
  },
  WebGLInputSetSelectionRange: function (id, start, end) {
    var input = instances[id];
    input.setSelectionRange(start, end);
  },
  WebGLInputMaxLength: function (id, maxlength) {
    var input = instances[id];
    input.maxLength = maxlength;
  },
  WebGLInputText: function (id, text) {
    var input = instances[id];
    input.value = Pointer_stringify(text);
  },
  WebGLInputDelete: function (id) {
    var input = instances[id];
    input.parentNode.removeChild(input);
    instances[id] = null;
  },
  WebGLInputEnableTabText: function (id, enable) {
    var input = instances[id];
    input.enableTabText = enable;
  },
}

autoAddDeps(WebGLInput, '$instances');
mergeInto(LibraryManager.library, WebGLInput);
