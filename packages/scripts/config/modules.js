const fs = require('node:fs');
const path = require('node:path');
const paths = require('./paths');
const chalk = require('react-dev-utils/chalk');
const { parse: parseJsoncText, printParseErrorCode } = require('jsonc-parser');

/**
 * Parse a tsconfig.json. It is JSONC -- comments and trailing commas are allowed and
 * common -- so JSON.parse is not enough, which is why this used to go through
 * TypeScript's `readConfigFile`.
 *
 * @param {string} text
 * @param {string} filePath only used to point at the file when it does not parse
 */
function parseJsonc(text, filePath) {
  const errors = [];
  const value = parseJsoncText(text, errors, { allowTrailingComma: true });

  if (errors.length > 0) {
    const [{ error, offset }] = errors;
    const line = text.slice(0, offset).split('\n').length;
    throw new Error(`Failed to parse ${filePath} (line ${line}): ${printParseErrorCode(error)}.`);
  }

  return value;
}

/**
 * The `baseUrl` a compilerOptions object asks for, including the spelling TypeScript 7
 * requires.
 *
 * 7 removed `baseUrl` outright -- `tsc` fails with TS5102 -- and points you at
 * `"paths": { "*": ["./*"] }` instead. The three functions below only ever read `baseUrl`,
 * so a project that follows that advice silently loses its `src` alias and its absolute
 * imports stop resolving in webpack. A single `*` mapping to one `<prefix>/*` target is
 * exactly what `baseUrl: <prefix>` expressed, so translate it back rather than making every
 * consumer choose between type checking and resolution.
 *
 * @param {Object} options
 * @returns {string | undefined}
 */
function getBaseUrl(options = {}) {
  if (options.baseUrl) {
    return options.baseUrl;
  }

  const starTargets = options.paths?.['*'];
  if (!Array.isArray(starTargets)) {
    return undefined;
  }

  const target = starTargets.find((entry) => typeof entry === 'string' && entry.endsWith('/*'));
  // './*' -> './' (the project root), './src/*' -> './src'
  return target ? target.slice(0, -2) || './' : undefined;
}

/**
 * Get additional module paths based on the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths(options = {}) {
  const baseUrl = getBaseUrl(options);

  if (!baseUrl) {
    return '';
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  // We don't need to do anything if `baseUrl` is set to `node_modules`. This is
  // the default behavior.
  if (path.relative(paths.appNodeModules, baseUrlResolved) === '') {
    return null;
  }

  // Allow the user set the `baseUrl` to `appSrc`.
  if (path.relative(paths.appSrc, baseUrlResolved) === '') {
    return [paths.appSrc];
  }

  // If the path is equal to the root directory we ignore it here.
  // We don't want to allow importing from the root directly as source files are
  // not transpiled outside of `src`. We do allow importing them with the
  // absolute path (e.g. `src/Components/Button.js`) but we set that up with
  // an alias.
  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return null;
  }

  // Otherwise, throw an error.
  throw new Error(
    chalk.red.bold(
      "Your project's `baseUrl` can only be set to `src` or `node_modules`." +
        ' Create React App does not support other values at this time.',
    ),
  );
}

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getWebpackAliases(options = {}) {
  const baseUrl = getBaseUrl(options);

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return {
      src: paths.appSrc,
    };
  }
}

/**
 * Get jest aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getJestAliases(options = {}) {
  const baseUrl = getBaseUrl(options);

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return {
      '^src/(.*)$': '<rootDir>/src/$1',
    };
  }
}

function getModules() {
  // Check if TypeScript is setup
  const hasTsConfig = fs.existsSync(paths.appTsConfig);
  const hasJsConfig = fs.existsSync(paths.appJsConfig);

  if (hasTsConfig && hasJsConfig) {
    throw new Error(
      'You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file.',
    );
  }

  let config;

  // If there's a tsconfig.json we assume it's a
  // TypeScript project and set up the config
  // based on tsconfig.json
  if (hasTsConfig) {
    // This used to load the app's TypeScript and call `ts.readConfigFile`, which is only a
    // JSONC parse -- the result is read for `compilerOptions.baseUrl` a few lines down and
    // nothing else. Doing it without the compiler is what lets an app run TypeScript 7,
    // whose export map ships no `require`-able entry. `readConfigFile` does not follow
    // `extends` either, so parsing the file directly sees exactly what it saw.
    config = parseJsonc(fs.readFileSync(paths.appTsConfig, 'utf8'), paths.appTsConfig);
    // Otherwise we'll check if there is jsconfig.json
    // for non TS projects.
  } else if (hasJsConfig) {
    config = require(paths.appJsConfig);
  }

  config = config || {};
  const options = config.compilerOptions || {};

  const additionalModulePaths = getAdditionalModulePaths(options);

  const hasJsxRuntime = (() => {
    if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
      return false;
    }

    try {
      require.resolve('react/jsx-runtime');
      return true;
    } catch (e) {
      return false;
    }
  })();

  return {
    additionalModulePaths: additionalModulePaths,
    webpackAliases: getWebpackAliases(options),
    jestAliases: getJestAliases(options),
    hasTsConfig,
    hasJsxRuntime,
  };
}

module.exports = getModules();
