var defaults = require("./wdio.conf.js")
var _ = require("lodash")

var overrides = {
  specs: [
    './src/test/suites/**'
  ],
  services: ['docker'],
  dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    startDelay: 2000,
    options: {
      p: ['4444:4444'],
      shmSize: '2g'
    }
  },
  maxInstances: 5,
  capabilities: [{
    browserName: 'chrome',
    acceptInsecureCerts: true
  }]
}

exports.config = _.defaultsDeep(overrides, defaults.config)
exports.config.hostname = 'localhost'
exports.config.port= 4444
exports.config.path= '/wd/hub'
