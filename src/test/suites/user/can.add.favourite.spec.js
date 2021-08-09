var HomePage = require('../../../app/pages/homePage')
var SignInPage = require('../../../app/pages/signInPage')
var FavouritesPage = require('../../../app/pages/favouritesPage')

describe('StackDemo user suite', () => {

  it('Logged in user should be able to add favourite', async () => {
    await HomePage.signInLink.click()
    await SignInPage.login(browser.config.accounts[3].username, browser.config.accounts[3].password)
    await expect(HomePage.signedInUsername).toHaveText(browser.config.accounts[3].username)
    await HomePage.clickFavourite('iPhone 12')
    await HomePage.favouritesLink.click()
    await browser.waitUntil(() => {
      return browser.getUrl().then((pageUrl) => {
        return pageUrl.indexOf('favourites') > -1
      })
    })
    await expect(FavouritesPage.allFavourites).toHaveTextContaining('iPhone 12')
  })

})
