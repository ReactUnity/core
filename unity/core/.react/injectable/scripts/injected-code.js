((react, ReactUnity, Material, MaterialStyles, ReactUnityWebGLCompat) => {
  const __originalRender = ReactUnity.__originalRender || ReactUnity.render;

  let renderCalled = false;
  function render(element, options) {
    renderCalled = true;
    __originalRender.apply(null, [element, Object.assign({ mode: 'legacy' }, options || {})]);
  }

  ReactUnity = Object.assign({}, ReactUnity, {
    render: render,
    __originalRender: __originalRender,
  });

  const React = react;

  const exports = {};
  const module = { exports: exports };

  // The automatic JSX runtime, expressed in terms of createElement. Children are moved back
  // out of props into trailing arguments: React only treats a children array as
  // key-validated when it built the array itself, so leaving one in props makes it warn
  // about a missing key on every statically written child.
  function jsx(type, props, key) {
    const config = {};
    let children;
    let hasChildren = false;

    for (const prop in props) {
      if (prop === 'children') {
        children = props[prop];
        hasChildren = true;
      } else config[prop] = props[prop];
    }

    if (key != null) config.key = key;

    if (Array.isArray(children)) return react.createElement.apply(null, [type, config].concat(children));
    if (hasChildren) return react.createElement(type, config, children);
    return react.createElement(type, config);
  }

  const jsxRuntime = { Fragment: react.Fragment, jsx: jsx, jsxs: jsx, jsxDEV: jsx };

  const require = (module) => {
    if (module === 'react') return react;
    // Code compiled with the automatic JSX runtime asks for this; returning undefined threw
    // "Cannot read properties of undefined (reading 'jsx')" before anything rendered.
    if (module === 'react/jsx-runtime' || module === 'react/jsx-dev-runtime') return jsxRuntime;
    if (module === '@reactunity/renderer') return ReactUnity;
    if (module === 'react-unity-webgl') return ReactUnityWebGLCompat;
    if (module === '@reactunity/renderer/webgl-compat') return ReactUnityWebGLCompat;
    if (module === '@reactunity/material/styles') return MaterialStyles();
    if (module === '@reactunity/material') return Material;
    if (module.startsWith('@reactunity/material/')) return Material;
  };

  globalThis.react = globalThis.React = react;
  globalThis.render = render;
  globalThis.ReactUnity = ReactUnity;
  globalThis.Material = Material;
  globalThis.MaterialStyles = MaterialStyles;
  globalThis.useGlobals = ReactUnity.useGlobals;

  let defaultComponent;

  const result = ((module, exports, render, require) => {
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
})(react, ReactUnity, Material, MaterialStyles, ReactUnityWebGLCompat);
