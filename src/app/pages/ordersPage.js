var Page = require('./basePage')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OrdersPage extends Page {
  /**
   * define selectors using getter methods
   */
  get allOrders() { return $$('.order') }
  get firstOrder() { return $('.order') }

  async open() {
    await super.open('orders')
  }
}

module.exports = new OrdersPage()
