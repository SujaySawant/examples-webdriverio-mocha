var defaults = require("./wdio.conf.js")
var _ = require("lodash")

var overrides = {
  testData: [],
  specs: [
    './src/test/suites/e2e/e2e.spec.js'
  ],
  capabilities: [{
    browserName: 'chrome',
    acceptInsecureCerts: true
  }]
}

exports.config = _.defaultsDeep(overrides, defaults.config)
