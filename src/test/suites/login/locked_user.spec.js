var HomePage = require('../../../app/pages/homePage')
var SignInPage = require('../../../app/pages/signInPage')

describe('StackDemo login', () => {

  it(`Login should not be successful for account with username 'locked_user'`, async () => {
    await HomePage.signInLink.click()
    await SignInPage.login(browser.config.accounts[1].username, browser.config.accounts[1].password)
    await expect(SignInPage.errorMessage).toHaveText('Your account has been locked.')
  });

})
