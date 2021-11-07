(function (react, ReactUnity) {
  var React = react;
  var __originalRender = ReactUnity.Renderer.render;
  ReactUnity = Object.assign({}, ReactUnity, { Renderer: { render: render } });
  var ReactUnityRenderer = ReactUnity.Renderer;
  var Renderer = ReactUnity.Renderer;

  var exports = {};
  var module = { exports: exports };

  var renderCalled = false;
  function render() {
    renderCalled = true;
    __originalRender.apply(ReactUnity.Renderer, arguments);
  }

  let result = (function (module, exports, render) {

    /*INJECT_CODE*/
  })(module, exports, render);


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
})(react, ReactUnity);
