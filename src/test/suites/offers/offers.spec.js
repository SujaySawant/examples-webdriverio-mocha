var HomePage = require('../../../app/pages/homePage')
var SignInPage = require('../../../app/pages/signInPage')
var OffersPage = require('../../../app/pages/offersPage')

describe('StackDemo Offers', () => {

  it('Check offers for India', async () => {
    await HomePage.signInLink.click()
    await SignInPage.login(browser.config.accounts[0].username, browser.config.accounts[0].password)
    await expect(HomePage.signedInUsername).toHaveText(browser.config.accounts[0].username)
    await browser.execute(() => {
      window.navigator.geolocation.getCurrentPosition = (success) => {
        var position = { coords: { latitude: "1", longitude: "103" } }
        success(position)
      }
    })
    await HomePage.offersLink.click()
    await OffersPage.firstOffer.click()
    await expect(OffersPage.allOffers).toBeElementsArrayOfSize(3)
  })

})
