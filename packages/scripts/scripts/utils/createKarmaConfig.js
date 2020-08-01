'use strict'

const paths = require('../../config/paths')

module.exports = (extraConfig) => {
  return {
    browsers: [],
    frameworks: ['mocha'],
    files: [
      { pattern: 'src/setupTests.js' },
      { pattern: 'src/setupTests.ts' },
      { pattern: 'src/**/*.spec.js' },
      { pattern: 'src/**/*.spec.ts' },
    ],
    preprocessors: {
      'src/setupTests.js': ['webpack'],
      'src/**/*.spec.js': ['webpack'],
      'src/setupTests.ts': ['webpack'],
      'src/**/*.spec.ts': ['webpack'],
    },
    reporters: ['mocha'],
    webpack: extraConfig,
    webpackServer: {
      noInfo: true,
    },
    colors: true,
    autoWatch: false,
    singleRun: true,
    transports: ['websocket'],
    customContextFile: __dirname + '/karmaContext.js',
    ...require(paths.appPackageJson).karma,
  };

}
