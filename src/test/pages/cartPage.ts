import { Page, expect } from '@playwright/test';
let { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 15000);
const locator = require("../selectors/cartSelector.json")
class CartPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    //remove product from cart
    async removeFirstProductFromCart() {
        await this.page.locator(locator.removeButton1).click();
    }
    //verify quality of item in cart
    async itemNumberInCart() {
        const cartItemCount = await this.page.locator(locator.cartQty).innerText();
        expect(parseInt(cartItemCount)).toBe(1);
    }
    //move to checkout page
    async moveToCheckout() {
        await this.page.locator(locator.checkoutButton).click();
    }


}
module.exports = { CartPage };