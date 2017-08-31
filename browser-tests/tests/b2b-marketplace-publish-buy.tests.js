module.exports = {
	'B2B marketplace flow - publish cow, buy from marketplace': function (browser) {
		const farmId = 'test-farm';
		const breedId = 'dexter';
		const liveWeightKg = 300;
		const pricePerKg = 8.67;
		const carcassPrice = '£689.27';
		const eidTag = '123';
		const testUser = 'test';
		let orderId = '';

		let inventory;
		let price;
		const quantityToBuy = 2;
		const product = 'blade';
		const weightG = 300;
		const selectorSuffix = `${product}-${farmId}-${breedId}-${weightG}`;
		const selectors = {
			inventory: `.t-sku-${selectorSuffix} .t-product-inventory`,
			price: `.t-sku-${selectorSuffix} .t-product-price`
		};

		browser

			.getJSON(browser.globals.url_delete_test_cuts, function (response) {
				console.log(`${response.deletedCount} documents deleted for test user`)
			})
			.url(browser.globals.url_publish)
			.waitForElementVisible('.js-app', 1000)
			.assert.elementNotPresent('[name="farm"]')
			.login(testUser)
			.waitForElementVisible('[name="farm"]', 1000)

			.log(`Publish cow`)
			.setVal('[name="farm"]', farmId)
			.setVal('[name="breed"]', breedId)
			.setVal('[name="eidTag"]', eidTag)
			.setVal('[name="liveWeightKg"]', liveWeightKg)
			.setVal('[name="reservePricePoundsPerKg"]', pricePerKg)
			.setVal('[name="processingDate"]', '01-09-2017')
			.click('.t-checkbox-organic-1')
			.click('.t-checkbox-grassFed-1')
			.click('.t-checkbox-hormoneFree-1')
			.click('.t-checkbox-redTractor-1')
			.click(`.t-submit`)
			.waitForElementVisible('.js-app', 1000)

			.log('Go to Marketplace')
			.click('.t-marketplace-link')
			.waitForElementVisible('.js-app', 1000)
			.deleteCookie('user')
			.click('.t-marketplace-home')
			.waitForElementVisible('body', 1000)
			.assert.elementNotPresent(`.t-search-result-row-${farmId}`)
			.login(testUser)
			.waitForElementVisible(`.t-search-result-row-${farmId}`, 1000)

			.log(`The published cow is visible in the marketplace in '${farmId}'`)
			.click('.t-checkbox-provenance-organic')
			.click('.t-checkbox-provenance-grassFed')
			.click('.t-checkbox-provenance-hormoneFree')
			.click('.t-checkbox-provenance-redTractor')
			.assert.elementPresent(`.t-search-result-row-${farmId}`)
			.getText(`.t-${farmId}-inventory`, function (result) {
				this.assert.equal(parseInt(result.value, 10), 2);
			})
			.getText(`.t-${farmId}-price`, function (result) {
				this.assert.equal(result.value, carcassPrice);
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
				this.assert.equal(result.value, carcassPrice);
			})

			.log(`Go to checkout`)
			.click('.t-btn-checkout')
			.waitForElementVisible('.t-confirm-basket', 1000)
			.getText('.t-confirm-basket .t-basket-total', function (result) {
				this.assert.equal(result.value, carcassPrice);
			})

			.log(`Confirm order`)
			.click('.t-btn-confirm-order')
			.waitForElementVisible('.t-order-purchase-resell', 1000)
			.click('.t-radio-keepWholeCut-carcass-yes')
			.click('.t-btn-confirm-order')

			.waitForElementVisible('.t-order-confirmed', 1000)
			.getText(`.t-order-total`, function (result) {
				this.assert.equal(result.value, carcassPrice);
			})
			.getText(`.t-order-id`, function (result) {
				orderId = result.value;
			})

			.log(`Cow is no longer available in the marketplace`)
			.click('.t-marketplace-home')
			.waitForElementVisible('body', 1000)
			.assert.elementPresent(`.t-search-result-row-${farmId}`)
			.getText(`.t-${farmId}-inventory`, function (result) {
				this.assert.equal(parseInt(result.value, 10), 1);
			})

			.log('Go to B2C admin')
			.back()
			.click('.t-marketplace-admin-link')
			.waitForElementVisible('.js-app', 1000)
			.deleteCookie('user')
			.refresh()
			.login(testUser)

			.perform(function (client, done) {
				client.waitForElementVisible(`.t-order-${orderId}`, 1000);
				done();
			})
			.perform(function (client, done) {
				client.click(`.t-order-${orderId}`);
				done();
			})
			.waitForElementVisible('.t-order-line-items', 1000)
			.perform(function (client, done) {
				client.click(`.t-order-${orderId}-item-0`);
				done();
			})
			.perform(function (client, done) {
				client.waitForElementVisible(`.t-order-${orderId}-total`, 1000);
				done();
			})
			.click('.t-publish-cuts')
			.waitForElementVisible('.t-link-shop', 10000)

			.log('Go to B2C shop')
			.click('.t-link-shop')

			.log(`Navigate to ${product} product page`)
			.click(`.t-product-${product}`)
			.waitForElementVisible(`.t-product-page-${product}`, 1000)

			.getText(selectors.inventory, function (result) {
				inventory = parseInt(result.value, 10);
				this.log(`Inventory for ${product} (${weightG}g) is ${inventory}`)
			})

			.getText(selectors.price, function (result) {
				price = parseFloat(result.value.substr(1));
				this.log(`Price for ${product} (${weightG}g) is ${price}`)
			})

			.log(`Add ${quantityToBuy} ${product} items to basket`)
			.setVal(`#${selectorSuffix}`, quantityToBuy)
			.click(`.t-submit-${selectorSuffix}`)

			.log(`The basket count for ${product} (${weightG}g) increases to ${quantityToBuy}`)
			.waitForElementVisible('.header__basket__count', 5000)
			.getText('.header__basket__count', function (result) {
				this.assert.equal(parseInt(result.value, 10), quantityToBuy);
			})

			.getText(selectors.inventory, function (result) {
				this.log(`The inventory level for ${product} (${weightG}g) decreases to ${inventory - quantityToBuy}`);
				this.assert.equal(parseInt(result.value, 10), inventory - quantityToBuy);
			})

			.log('Navigate to basket summary')
			.click('.t-basket-summary-link')
			.waitForElementVisible('.t-basket-summary', 1000)

			.log(`The basket count for ${product} (${weightG}g) shows ${quantityToBuy} items`)
			.getValue(`#${selectorSuffix}`, function (result) {
				this.assert.equal(parseInt(result.value, 10), quantityToBuy);
			})

			.getText('.t-basket-total', function (result) {
				this.log(`The total basket value shows £${price} x ${quantityToBuy} = £${price * quantityToBuy}`)
				this.assert.equal(parseFloat(result.value.substr(1)), price * quantityToBuy);
			})
			.end();
	}
};
