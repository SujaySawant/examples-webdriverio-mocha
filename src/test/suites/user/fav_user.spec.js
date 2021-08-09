var HomePage = require('../../../app/pages/homePage')
var SignInPage = require('../../../app/pages/signInPage')
var FavouritesPage = require('../../../app/pages/favouritesPage')

describe('StackDemo user suite', () => {

  it('User with favourites should see 5 items', async () => {
    await HomePage.signInLink.click()
    await SignInPage.login(browser.config.accounts[0].username, browser.config.accounts[0].password)
    await expect(HomePage.signedInUsername).toHaveText(browser.config.accounts[0].username)
    await HomePage.favouritesLink.click()
    await browser.waitUntil(() => {
      return browser.getUrl().then((pageUrl) => {
        return pageUrl.indexOf('favourites') > -1
      })
    })
    await expect(FavouritesPage.allFavourites).toBeElementsArrayOfSize(5)
  })

})
