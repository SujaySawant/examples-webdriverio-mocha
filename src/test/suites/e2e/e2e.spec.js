var HomePage = require('../../../app/pages/homePage')
var SignInPage = require('../../../app/pages/signInPage')
var CheckoutPage = require('../../../app/pages/checkoutPage')
var ConfirmationPage = require('../../../app/pages/confirmationPage')
var OrdersPage = require('../../../app/pages/ordersPage')

describe('Order a product', () => {

  it('Login and order a product', async () => {
    await HomePage.signInLink.click()
    await SignInPage.login(browser.config.accounts[0].username, browser.config.accounts[0].password)
    await expect(HomePage.signedInUsername).toHaveText(browser.config.accounts[0].username)

    await HomePage.selectPhone('iPhone XS')
    await HomePage.cartCloseButton.click()
    await HomePage.selectPhone('Galaxy S20')
    await HomePage.clickBuyButton()

    await CheckoutPage.firstNameInput.setValue('firstname')
    await CheckoutPage.lastNameInput.setValue('lastname')
    await CheckoutPage.addressLine1Input.setValue('address')
    await CheckoutPage.provinceInput.setValue('state')
    await CheckoutPage.postCodeInput.setValue('12345')
    await CheckoutPage.checkoutShippingContinue.click()

    await ConfirmationPage.confirmationMessage.waitForDisplayed()
    await expect(ConfirmationPage.confirmationMessage).toHaveText('Your Order has been successfully placed.')
    await ConfirmationPage.continueShoppingButton.click()

    await HomePage.ordersLink.click()
    await OrdersPage.firstOrder.waitForDisplayed()
    await expect(OrdersPage.allOrders).toBeElementsArrayOfSize(1)
  })

})
