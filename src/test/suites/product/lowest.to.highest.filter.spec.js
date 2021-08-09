const _ = require('lodash');
const expectChai = require('chai').expect;
var HomePage = require('../../../app/pages/homePage')

describe('StackDemo filters', () => {

  it('Lowest to Highest filter is applied', async () => {
    await HomePage.orderBy.selectByAttribute('value', 'lowestprice')
    await HomePage.waitToLoad()
    let all_prices = await HomePage.getAllPrices()
    expectChai(_.isEqual(all_prices, _.orderBy(all_prices, [], ['asc']))).to.equal(true, "Lowest to Highest filter is not applied")
  })
})
