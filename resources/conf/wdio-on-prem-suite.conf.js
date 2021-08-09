var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  testData: [],
  specs: [
    './src/test/suites/login/*.js',
    './src/test/suites/offers/*.js',
    './src/test/suites/product/*.js',
    './src/test/suites/e2e/*.js',
    './src/test/suites/user/*.js'
  ],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    acceptInsecureCerts: true
  }]
};

exports.config = _.defaultsDeep(overrides, defaults.config);
