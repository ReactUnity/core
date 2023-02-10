(function (react, ReactUnity, Material, MaterialStyles) {
  var __originalRender = ReactUnity.Renderer.__originalRender || ReactUnity.Renderer.render;

  var renderCalled = false;
  function render(element, options) {
    renderCalled = true;
    __originalRender.apply(ReactUnity.Renderer, [element, Object.assign({ mode: 'legacy' }, options || {})]);
  }

  ReactUnity = Object.assign({}, ReactUnity, {
    Renderer: Object.assign({}, ReactUnity.Renderer, {
      render: render,
      __originalRender: __originalRender
    })
  });

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


  if (!renderCalled) {
    const renderElement = exports.default || result || exports.App || exports.Example || defaultComponent;

    if (renderElement) {
      render(react.createElement(renderElement));
    } else {
      console.error('Nothing was rendered');
    }
  }
})(react, ReactUnity, Material, MaterialStyles);
