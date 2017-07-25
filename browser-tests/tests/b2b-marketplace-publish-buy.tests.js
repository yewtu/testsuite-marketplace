module.exports = {
	'B2B marketplace flow - publish cow, buy from marketplace': function (browser) {
		const farmId = 'two-pines-farm';
		const breedId = 'dexter';
		const liveWeight = 300;
		const pricePerKg = 8.67;

		browser
			.url('https://service-b2b-market-staging.herokuapp.com/api/delete-test-cuts')
			.url(browser.launch_url)
			.setCookie({name: 'user', value: 'test'})
			.url(browser.launch_url)
			.waitForElementVisible('body', 1000)

			.log(`Publish cow`)
			.setVal('[name="farm"]', farmId)
			.setVal('[name="breed"]', breedId)
			.setVal('[name="eidTag"]', '123')
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
			.url('https://app-b2b-marketplace-staging.herokuapp.com/marketplace')
			.setCookie({name: 'user', value: 'test'})
			.url('https://app-b2b-marketplace-staging.herokuapp.com/marketplace')
			.waitForElementVisible('body', 1000)
			.log(`The published cow is visible in the marketplace in '${farmId}'`)
			.click('.t-checkbox-provenance-organic')
			.click('.t-checkbox-provenance-grassFed')
			.click('.t-checkbox-provenance-hormoneFree')
			.click('.t-checkbox-provenance-redTractor')
			.getText(`.t-${farmId}-inventory`, function (result) {
				this.assert.equal(parseInt(result.value, 10), 1);
			})
			.getText(`.t-${farmId}-price`, function (result) {
				this.assert.equal(result.value, `£${pricePerKg}`);
			})
			.setVal(`.t-${farmId}-quantity`, '1')
			.click(`.t-submit-${farmId}`)
			.waitForElementVisible('.header__basket-count', 1000)
			.getText(`.header__basket-count`, function (result) {
				this.assert.equal(parseInt(result.value, 10), 1);
			})
			.click('.t-basket-summary-link')
			.getText(`.t-basket-total`, function (result) {
				this.assert.equal(result.value,'£689.27');
			})
			.end();
	}
};
