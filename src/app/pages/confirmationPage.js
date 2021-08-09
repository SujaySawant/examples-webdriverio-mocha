var Page = require('./basePage')
/**
 * sub page containing specific selectors and methods for a specific page
 */
class ConfirmationPage extends Page {
  /**
   * define selectors using getter methods
   */
  get confirmationMessage() { return $('#confirmation-message') }
  get continueShoppingButton() { return $('div.continueButtonContainer button') }
  
  async open() {
    await super.open('confirmation')
  }
}

module.exports = new ConfirmationPage();
