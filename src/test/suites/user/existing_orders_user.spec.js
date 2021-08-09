var HomePage = require('../../../app/pages/homePage')
var SignInPage = require('../../../app/pages/signInPage')
var OrdersPage = require('../../../app/pages/ordersPage')

describe('StackDemo user suite', () => {

  it('Login with user having existing orders', async () => {
    await HomePage.signInLink.click()
    await SignInPage.login(browser.config.accounts[3].username, browser.config.accounts[3].password)
    await expect(HomePage.signedInUsername).toHaveText(browser.config.accounts[3].username)
    await HomePage.ordersLink.click()
    await OrdersPage.firstOrder.waitForDisplayed()
    await expect(OrdersPage.allOrders).toBeElementsArrayOfSize(5)
  })

})
