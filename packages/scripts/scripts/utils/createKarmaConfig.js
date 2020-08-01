'use strict'

const paths = require('../../config/paths')

module.exports = (extraConfig) => {
  return {
    browsers: [],
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'src/test.ts' },
    ],
    preprocessors: {
      'src/test.ts': ['webpack'],
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
