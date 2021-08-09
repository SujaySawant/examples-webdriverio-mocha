var Page = require('./basePage')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FavouritesPage extends Page {
  /**
   * define selectors using getter methods
   */
  get allFavourites() { return $$('p.shelf-item__title') }

  async open() {
    await super.open('favourites')
  }
}

module.exports = new FavouritesPage();
