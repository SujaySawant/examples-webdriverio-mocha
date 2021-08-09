var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  testData: [],
  specs: [
    './src/test/suites/**'
  ],
  maxInstances: 5,
  capabilities: [{
    browserName: 'chrome',
    acceptInsecureCerts: true
  }]
}

exports.config = _.defaultsDeep(overrides, defaults.config)
