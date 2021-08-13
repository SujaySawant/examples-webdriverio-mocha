const items = require('../../../../resources/data/login_cases.json')
var HomePage = require('../../../app/pages/homePage')
var SignInPage = require('../../../app/pages/signInPage')

describe('Password input validation', () => {

  items.forEach((item) => {
    it(`Login should not be successful for account with username ''`, async () => {
      await HomePage.signInLink.click()
      await SignInPage.login(item.username, item.password)
      await expect(SignInPage.errorMessage).toHaveText(item.expected_message)
    })
  })

})
