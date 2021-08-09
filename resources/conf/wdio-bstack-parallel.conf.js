var defaults = require("./wdio.conf.js");
var _ = require("lodash");
var path = require("path")
var dateTime = new Date().getTime()

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  specs: [
    './src/test/suites/login/*.js',
    './src/test/suites/offers/*.js',
    './src/test/suites/product/*.js',
    './src/test/suites/e2e/*.js',
    './src/test/suites/user/*.js'
  ],
  host: 'hub.browserstack.com',
  maxInstancesPerCapability: 5,
  capabilities: [{
    'bstack:options': {
      'projectName': 'BrowserStack',
      'buildName': process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio - ' + dateTime,
      'sessionName': (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
      'os': 'Windows',
      'osVersion': '10',
    },
    browserName: 'Chrome',
    browserVersion: 'latest',
  }],
  after: async (result, capabilities, specs) => {
    if ((require('minimist')(process.argv.slice(2)))['bstack-session-name']) {
      await browser.executeScript("browserstack_executor: {\"action\": \"setSessionName\", \"arguments\": {\"name\":\"" +
        (require('minimist')(process.argv.slice(2)))['bstack-session-name'] + "\" }}");
    } else {
      await browser.executeScript("browserstack_executor: {\"action\": \"setSessionName\", \"arguments\": {\"name\":\"" + path.basename(specs[0]) + "\" }}");
    }

    if (result == 0) {
      await browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
    } else {
      await browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Script execution failed"}}');
    }
  },
};

exports.config = _.defaultsDeep(overrides, defaults.config);

// exports.config.capabilities.forEach(function (caps) {
//   for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
// });
