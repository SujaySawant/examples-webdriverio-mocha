var defaults = require("./wdio.conf.js")
var _ = require("lodash");
var path = require("path")
var mini = require('minimist')

var timeStamp = new Date().getTime()

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  specs: [
    './src/test/suites/**'
  ],
  host: 'hub.browserstack.com',
  maxInstances: 10,
  capabilities: [{
    'bstack:options': {
      'projectName': 'BrowserStack',
      'buildName': process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio - ' + timeStamp,
      'sessionName': (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
      'debug': 'true',
      'networkLogs': 'true',
      'video': 'true',
      'maskCommands': 'setValues, getValues, setCookies, getCookies',
      'os': 'Windows',
      'osVersion': '10',
    },
    browserName: 'Chrome',
    browserVersion: 'latest',
    acceptInsecureCerts: true
  }],
  after: async (result, capabilities, specs) => {
    if ((mini(process.argv.slice(2)))['bstack-session-name']) {
      await browser.executeScript("browserstack_executor: {\"action\": \"setSessionName\", \"arguments\": {\"name\":\"" + (mini(process.argv.slice(2)))['bstack-session-name'] + "\" }}")
    } else {
      await browser.executeScript("browserstack_executor: {\"action\": \"setSessionName\", \"arguments\": {\"name\":\"" + path.basename(specs[0]) + "\" }}")
    }
    if (result === 0) {
      await browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}')
    } else {
      await browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Script execution failed"}}')
    }
  }
}

exports.config = _.defaultsDeep(overrides, defaults.config)
