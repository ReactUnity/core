// babel-loader's `customize` hook, vendored from babel-preset-react-app/webpack-overrides
// when that package was dropped (see babel-preset-extended.js). Unchanged in behaviour: it
// only exists to defeat caching for files that use Babel macros.
const crypto = require('node:crypto');

const macroCheck = /[./]macro/;

module.exports = () => ({
  // Transforms the Babel configuration per file.
  config(config, { source }) {
    // Macros are effectively uncacheable (babel/babel#8497). Detect them by package suffix
    // and add a random token to `caller` -- a valid Babel option -- so the file gets a
    // one-time cache identifier. Loader options cannot be varied per file.
    if (macroCheck.test(source)) {
      return {
        ...config.options,
        caller: {
          ...config.options.caller,
          craInvalidationToken: crypto.randomBytes(32).toString('hex'),
        },
      };
    }
    return config.options;
  },
});
