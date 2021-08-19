var defaults = require("./wdio.conf.js")
var browserstack = require('browserstack-local')
var _ = require("lodash")
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
  baseUrl: 'http://localhost:3000/',
  waitforTimeout: 50000,
  maxInstances: 10,
  capabilities: [{
    'bstack:options': {
      'projectName': 'BrowserStack',
      'buildName': process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio - ' + new Date().getTime(),
      'sessionName': (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
      'debug': true,
      'networkLogs': true,
      'video': true,
      'local': true,
      'localIdentifier': timeStamp,
      'maskCommands': 'setValues, getValues, setCookies, getCookies',
      'os': 'OS X',
      'osVersion': 'Catalina'
    },
    browserName: 'Chrome',
    browserVersion: 'latest',
    acceptInsecureCerts: true
  }],
  onPrepare: () => {
    console.log("Connecting local");
    return new Promise((resolve, reject) => {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ 'key': exports.config.key, 'localIdentifier': timeStamp }, (error) => {
        if (error) return reject(error)
        console.log('Connected. Now testing...')
        resolve()
      })
    })
  },
  onComplete: () => {
    return new Promise((resolve) => {
      exports.bs_local.stop(() => {
        console.log("Binary stopped")
        resolve()
      })
    })
  },
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
