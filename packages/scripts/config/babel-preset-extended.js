const babelPresetReact = require('@babel/preset-react').default;
const babelPresetReactApp = require('babel-preset-react-app');

// Extend babel-preset-react-app to accept custom jsxImportSource. This is required for things like @emotion/react

module.exports = (api, opts) => {
  const original = babelPresetReactApp(api, opts);
  const jsxImportSource = process.env.JSX_IMPORT_SOURCE;

  if (jsxImportSource) {
    const preset = original.presets.find((x) => x[0] === babelPresetReact);

    if (preset?.[1]) {
      preset[1].importSource = jsxImportSource;
    }
  }

  return original;
};
