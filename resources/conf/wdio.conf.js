const accounts = require('../data/user.json')

exports.config = {
  accounts: accounts,
  runner: 'local',
  specs: [
    ''
  ],
  logLevel: 'silent',
  coloredLogs: true,
  bail: 0,
  baseUrl: 'https://bstackdemo.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  chromeOptions: {
    prefs: {
      "profile.default_content_setting_values.geolocation": 1,
    }
  },
  framework: 'mocha',
  reporters: [['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
  }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },
  beforeTest: async () => {
    await browser.url('')
  },
  afterTest: async ({ error }) => {
    await browser.execute(() => sessionStorage.clear())
    if (error) {
      await browser.takeScreenshot()
    }
  }
}
