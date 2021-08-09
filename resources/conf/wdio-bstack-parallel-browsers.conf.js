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
  maxInstancesPerCapability: 2,
  capabilities: [{
    'bstack:options': {
      'projectName': 'BrowserStack',
      'buildName': process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio - ' + dateTime,
      'sessionName': (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
      'os': 'Windows',
      'osVersion': '10'
    },
    browserName: 'Chrome',
    browserVersion: 'latest'
  }, {
    'bstack:options': {
      'projectName': 'BrowserStack',
      'buildName': process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio - ' + dateTime,
      'sessionName': (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
      'os': 'Windows',
      'osVersion': '10'
    },
    browserName: 'Edge',
    browserVersion: 'latest'
  }, {
    'bstack:options': {
      'projectName': 'BrowserStack',
      'buildName': process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio - ' + dateTime,
      'sessionName': (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
      'os': 'OS X',
      'osVersion': 'Big Sur'
    },
    browserName: 'Safari',
    browserVersion: 'latest'
  }, {
    'bstack:options': {
      'projectName': 'BrowserStack',
      'buildName': process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio - ' + dateTime,
      'sessionName': (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
      'osVersion': '10.0',
      'deviceName': 'Samsung Galaxy S20',
      'realMobile': 'true'
    },
    browserName: 'Android'
  }, {
    'bstack:options': {
      'projectName': 'BrowserStack',
      'buildName': process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio - ' + dateTime,
      'sessionName': (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
      'osVersion': '13',
      'deviceName': 'iPhone 11',
      'realMobile': 'true'
    },
    browserName: 'iPhone'
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
      await browser.takeScreenshot();
      await browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Script execution failed"}}');
    }
  },
};

exports.config = _.defaultsDeep(overrides, defaults.config);
