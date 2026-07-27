// The preset applied to JS coming out of node_modules, replacing
// babel-preset-react-app/dependencies (see babel-preset-extended.js for why that package
// had to go). Dependencies get standard ES features lowered and nothing else -- no JSX, no
// TypeScript, no macros -- since they are already compiled.
//
// This is also what keeps published ES2015+ packages usable on Unity's older engines: it is
// the pass that lowers @reactunity/renderer's own dist on the way into an app bundle.
module.exports = (_api, opts = {}) => ({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        // Leave modules alone so webpack can tree-shake.
        modules: false,
      },
    ],
  ],
  plugins: [
    // Babel 8 removed the `helpers` option; including the plugin at all is what enables
    // helper imports.
    opts.helpers !== false && [
      require.resolve('@babel/plugin-transform-runtime'),
      { version: require('@babel/runtime/package.json').version },
    ],
  ].filter(Boolean),
});
