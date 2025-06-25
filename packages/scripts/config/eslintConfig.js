const path = require('node:path');
const paths = require('./paths');
const modules = require('./modules');

const baseConfig = {
  extends: [require.resolve('./eslint/config')],
  rules: {
    ...(!modules.hasJsxRuntime && {
      'react/react-in-jsx-scope': 'error',
    }),
  },
};

module.exports = {
  extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
  cache: true,
  cacheLocation: path.resolve(paths.appNodeModules, '.cache/.eslintcache'),
  cwd: paths.appPath,
  baseConfig,
};
