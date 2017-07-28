module.exports = {
	'B2B marketplace flow - publish cow, buy from marketplace': function (browser) {
		const farmId = 'two-pines-farm';
		const breedId = 'dexter';
		const liveWeight = 300;
		const pricePerKg = 8.67;
		const basketTotal = '£689.27';
		const eidTag = '123';

		browser
			.url(browser.launch_url)
			.getJSON(browser.globals.url_delete_test_cuts, function(response) {
				console.log(`${response.deletedCount} documents deleted for test user`)
			})
			.url(browser.url_publish)
			.setCookie({name: 'user', value: 'test'})
			.url(browser.url_publish)
			.waitForElementVisible('body', 1000)

			.log(`Publish cow`)
			.setVal('[name="farm"]', farmId)
			.setVal('[name="breed"]', breedId)
			.setVal('[name="eidTag"]', eidTag)
			.setVal('[name="liveWeightKg"]', liveWeight)
			.setVal('[name="reservePricePoundsPerKg"]', pricePerKg)
			.setVal('[name="processingDate"]', '01-09-2017')
			.click('.t-checkbox-organic-1')
			.click('.t-checkbox-grassFed-1')
			.click('.t-checkbox-hormoneFree-1')
			.click('.t-checkbox-redTractor-1')
			.click(`.t-submit`)
			.waitForElementVisible('body', 1000)
			.click('.t-marketplace-link')
			.waitForElementVisible('body', 1000)
			.setCookie({name: 'user', value: 'test'})
			.deleteCookie('basketId')
			.url(browser.globals.url_marketplace)
			.waitForElementVisible('body', 1000)
			.log(`The published cow is visible in the marketplace in '${farmId}'`)
			.click('.t-checkbox-provenance-organic')
			.click('.t-checkbox-provenance-grassFed')
			.click('.t-checkbox-provenance-hormoneFree')
			.click('.t-checkbox-provenance-redTractor')
			.assert.elementPresent(`.t-search-result-row-${farmId}`)
			.getText(`.t-${farmId}-inventory`, function (result) {
				this.assert.equal(parseInt(result.value, 10), 1);
			})
			.getText(`.t-${farmId}-price`, function (result) {
				this.assert.equal(result.value, `£${pricePerKg}`);
			})

			.log(`Add the published cow to basket`)
			.setVal(`.t-${farmId}-quantity`, '1')
			.click(`.t-submit-${farmId}`)
			.waitForElementVisible('.header__basket-count', 1000)
			.getText(`.header__basket-count`, function (result) {
				this.assert.equal(parseInt(result.value, 10), 1);
			})
			.click('.t-basket-summary-link')
			.getText('.t-basket-total', function (result) {
				this.assert.equal(result.value, basketTotal);
			})

			.log(`Go to checkout`)
			.click('.t-btn-checkout')
			.waitForElementVisible('.t-confirm-basket', 1000)
			.getText('.t-confirm-basket .t-basket-total', function (result) {
				this.assert.equal(result.value, basketTotal);
			})

			.log(`Confirm order`)
			.click('.t-btn-confirm-order')
			.waitForElementVisible('.t-order-confirmed', 1000)
			.getText(`.t-order-total`, function (result) {
				this.assert.equal(result.value, basketTotal);
			})

			.log(`Cow is no longer available in the marketplace`)
			.url(browser.globals.url_marketplace)
			.waitForElementVisible('body', 1000)
			.assert.elementNotPresent(`.t-search-result-row-${farmId}`)
			.end();
	}
};
