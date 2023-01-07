(function (react, ReactUnity, Material, MaterialStyles) {
  var __originalRender = ReactUnity.Renderer.render;

  var renderCalled = false;
  function render(element, options) {
    renderCalled = true;
    __originalRender.apply(ReactUnity.Renderer, [element, Object.assign({ mode: 'legacy' }, options || {})]);
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
    if (module === '@reactunity/material/styles') return MaterialStyles();
    if (module === '@reactunity/material') return Material;
    if (module.startsWith('@reactunity/material/')) return Material;
  };


  globalThis.react = globalThis.React = react;
  globalThis.render = render;
  globalThis.Renderer = globalThis.ReactUnityRenderer = Renderer;
  globalThis.ReactUnity = ReactUnity;
  globalThis.Material = Material;
  globalThis.MaterialStyles = MaterialStyles;
  globalThis.useGlobals = ReactUnity.useGlobals;

  var defaultComponent;

  let result = (function (module, exports, render, require) {

    /*INJECT_CODE*/

    if (typeof App === 'function') defaultComponent = App;
    else if (typeof Example === 'function') defaultComponent = Example;
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
  } else if (defaultComponent) {
    render(react.createElement(defaultComponent));
  } else {
    console.error('Nothing was rendered');
  }
})(react, ReactUnity, Material, MaterialStyles);
