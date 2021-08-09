var HomePage = require('../../../app/pages/homePage')

describe('StackDemo login', () => {

  it('Navigated to login on clicking favourites Nav Item', async () => {
    await HomePage.favouritesLink.click()
    await browser.waitUntil(() => {
      return browser.getUrl().then((pageUrl) => {
        return pageUrl.indexOf('signin?favourites=true') > -1
      })
    })
  })

})
