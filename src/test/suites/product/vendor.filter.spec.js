const _ = require('lodash');
const expectChai = require('chai').expect;
var HomePage = require('../../../app/pages/homePage')

describe('StackDemo filters', () => {

  it('Apply vendor filter', async () => {
    await HomePage.clickVendor('Apple')
    await HomePage.waitToLoad()
    all_phones = await HomePage.getAllPhones()
    expectChai(_.every(all_phones, (value) => _.includes(value, 'iPhone'))).to.equal(true, "Vendor filter is not applied");
  })
})
