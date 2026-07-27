// The preset that compiles application code.
//
// It used to wrap babel-preset-react-app, extending it only to honour JSX_IMPORT_SOURCE.
// That package is unmaintained and hard-asserts Babel 7 (`Requires Babel "^7.0.0-0", but was
// loaded with "8.0.1"`), which pinned @babel/core at 7 for the whole workspace. What follows
// is the same composition written against Babel 8.
//
// Two things it listed are absent rather than ported: the class-properties /
// private-methods / private-property-in-object transforms are part of preset-env in Babel 8,
// and transform-runtime's `regenerator` option was removed there. preset-env's
// `useBuiltIns`/`corejs` pair is gone too (Babel 8 points at babel-plugin-polyfill-corejs3),
// so no polyfills are injected automatically -- apps that need them import react-app-polyfill,
// which is what the scaffold does.
module.exports = (api, opts = {}) => {
  const env = api.env();
  const isEnvDevelopment = env === 'development';
  const isEnvTest = env === 'test';

  const isTypeScriptEnabled = opts.typescript !== false;
  const areHelpersEnabled = opts.helpers !== false;
  // Set per app (see packages/scripts/README.md) so projects using @emotion/react and
  // friends can redirect the automatic JSX runtime.
  const jsxImportSource = process.env.JSX_IMPORT_SOURCE;

  return {
    presets: [
      isEnvTest
        ? [require.resolve('@babel/preset-env'), { targets: { node: 'current' } }]
        : [
            require.resolve('@babel/preset-env'),
            {
              // Leave modules alone so webpack can tree-shake.
              modules: false,
            },
          ],
      [
        require.resolve('@babel/preset-react'),
        {
          development: isEnvDevelopment || isEnvTest,
          runtime: opts.runtime === 'classic' ? 'classic' : 'automatic',
          ...(jsxImportSource ? { importSource: jsxImportSource } : {}),
        },
      ],
      // Babel strips the types; tsc only checks them (`pnpm typecheck`).
      isTypeScriptEnabled && [require.resolve('@babel/preset-typescript')],
    ].filter(Boolean),
    plugins: [
      require.resolve('babel-plugin-macros'),
      // In Babel 8 the plugin's presence *is* the switch: `helpers` (and `version`) were
      // removed, so opting out means leaving it out.
      areHelpersEnabled && [
        require.resolve('@babel/plugin-transform-runtime'),
        { version: require('@babel/runtime/package.json').version },
      ],
    ].filter(Boolean),
  };
};
