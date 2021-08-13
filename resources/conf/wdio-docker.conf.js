var defaults = require("./wdio.conf.js")
var _ = require("lodash")

var overrides = {
  specs: [
    './src/test/suites/e2e/e2e.spec.js'
  ]
}

exports.config = _.defaultsDeep(overrides, defaults.config)
exports.config.hostname = 'localhost'
exports.config.port= 4444
exports.config.path= '/wd/hub'
