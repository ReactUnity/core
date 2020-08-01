
'use strict'

process.env.BABEL_ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const Server = require('karma').Server
const createKarmaConfig = require('./utils/createKarmaConfig')
const configFactory = require('../config/webpack.config');

const karmaConfig = createKarmaConfig(configFactory('test'))

const server = new Server(karmaConfig, exitCode => {
  process.exit(exitCode)
})

server.start()
