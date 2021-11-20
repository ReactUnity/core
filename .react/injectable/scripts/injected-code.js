(function (react, ReactUnity, Material) {
  var __originalRender = ReactUnity.Renderer.render;

  var renderCalled = false;
  function render() {
    renderCalled = true;
    __originalRender.apply(ReactUnity.Renderer, arguments);
  }

  ReactUnity = Object.assign({}, ReactUnity, { Renderer: Object.assign({}, ReactUnity.Renderer, { render: render }) });
  var ReactUnityRenderer = ReactUnity.Renderer;
  var Renderer = ReactUnity.Renderer;
  var React = react;

  var exports = {};
  var module = { exports: exports };

  var require = function (module) {
    if (module === 'react') return react;
    if (module === '@reactunity/renderer') return ReactUnity;
    if (module === '@reactunity/material') return Material;
  };

  let result = (function (module, exports, render, require) {

    /*INJECT_CODE*/
  })(module, exports, render, require);


  if (renderCalled) {
    // No need to do anything
  } else if (exports.default) {
    render(react.createElement(exports.default));
  } else if (result) {
    render(react.createElement(result));
  } else if (exports.App) {
    render(react.createElement(exports.App));
  } else if (exports.Example) {
    render(react.createElement(exports.Example));
  } else {
    console.error('Nothing was rendered');
  }
})(react, ReactUnity, Material);
