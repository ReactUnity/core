// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

const path = require('path');
const baseEslintConfig = require('eslint-config-react-app');
const restrictedGlobals = require('confusing-browser-globals');
const paths = require('./paths');
const modules = require('./modules');

const baseEslintConfigRules = {};
for (const key in baseEslintConfig.rules) {
  if (Object.hasOwnProperty.call(baseEslintConfig.rules, key) && !key.startsWith('flowtype') && !key.startsWith('jsx-a11y')) {
    baseEslintConfigRules[key] = baseEslintConfig.rules[key];
  }
}

const baseConfig = {
  ...baseEslintConfig,
  plugins: ['import', 'react-hooks'],
  rules: {
    ...baseEslintConfigRules,
    ...(!modules.hasJsxRuntime && {
      'react/react-in-jsx-scope': 'error',
    }),
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
  },
};

module.exports = {
  extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
  cache: true,
  cacheLocation: path.resolve(paths.appNodeModules, '.cache/.eslintcache'),
  cwd: paths.appPath,
  resolvePluginsRelativeTo: __dirname,
  baseConfig,
};
