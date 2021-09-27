const _ = require('lodash');
const expectChai = require('chai').expect;
var HomePage = require('../../../app/pages/homePage')
var SignInPage = require('../../../app/pages/signInPage')

describe('StackDemo user suite', () => {

  it('All product images should load for user', async () => {
    await HomePage.signInLink.click()
    await SignInPage.login(browser.config.accounts[2].username, browser.config.accounts[2].password)
    await expect(HomePage.signedInUsername).toHaveText(browser.config.accounts[2].username)
    const all_images = await HomePage.getAllImagesSrcAttribute()
    expectChai(_.every(all_images, (value) => (!_.isEqual(value, '')))).to.equal(true, "All images are not loaded")
  })

})
