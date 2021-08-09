var HomePage = require('../../../app/pages/homePage')
var SignInPage = require('../../../app/pages/signInPage')

describe('StackDemo login', () => {

  it(`Login should be successful for account with username 'image_not_loading_user'`, async () => {
    await HomePage.signInLink.click()
    await SignInPage.login(browser.config.accounts[2].username, browser.config.accounts[2].password)
    await expect(HomePage.signedInUsername).toHaveText(browser.config.accounts[2].username)
  })

})
