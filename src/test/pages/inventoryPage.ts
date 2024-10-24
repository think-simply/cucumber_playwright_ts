import { Page, Locator, expect } from '@playwright/test';
let { setDefaultTimeout } = require("@cucumber/cucumber");
const locator = require("../selectors/inventorySelector.json")
export default class InventoryPage {
    readonly page: Page;
    readonly hambugerButton: Locator;
    readonly productBox: Locator;
    readonly addToCartButton1: Locator;
    readonly addToCartButton2: Locator;
    readonly afterAddToCart: Locator;
    readonly productName: Locator;
    readonly cartIcon: Locator;
    readonly cartQty: Locator;
    readonly sortIcon: Locator;
    readonly filterDropdownProduct: Locator;
    readonly lohiOption: Locator;
    readonly priceTag: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hambugerButton = page.locator(locator.hambugerButton);
        this.productBox = page.locator(locator.productBox);
        this.addToCartButton1 = page.locator(locator.addToCartButton1);
        this.addToCartButton2 = page.locator(locator.addToCartButton2);
        this.afterAddToCart = page.locator(locator.afterAddToCart);
        this.productName = page.locator(locator.productName);
        this.cartIcon = page.locator(locator.cartIcon);
        this.cartQty = page.locator(locator.cartQty);
        this.sortIcon = page.locator(locator.sortIcon);
        this.filterDropdownProduct = page.locator(locator.filterDropdownProduct);
        this.lohiOption = page.locator(locator.lohiOption);
        this.priceTag = page.locator(locator.priceTag)

    }
    // verify hambugar item exist in Inventory page
    async validateInventoryPageExist() {
        await expect(this.hambugerButton).toBeVisible();
    }

    //check there are 6 items in page
    async checkItemQuality() {

        await this.page.waitForSelector(locator.productBox);

        // Đếm số lượng sản phẩm
        const productCount = await this.productBox.count();

        // Kiểm tra xem có đúng 6 sản phẩm không
        expect(productCount).toBe(6);

    }

    //Check Add product to cart
    async addFirstProductToCart() {
        await this.addToCartButton1.click();

    }
    async addSecondProductToCart() {
        await this.addToCartButton2.click();

    }
    //verify add to cart successfully
    async verifyAddProductToCart() {
        await expect(this.afterAddToCart).toBeVisible();

    }
    // go to cartPage
    async goToCartPage() {
        await this.cartIcon.click();

    }
    //verify quality of item in cart
    async itemNumberInCart() {
        const cartItemCount = await this.cartQty.innerText();
        expect(parseInt(cartItemCount)).toBe(2);
    }


    // Filter products from low price to high price
    async filterPriceLowToHigh() {
        // Get all product prices
        const getprices = async () => await this.page.$$eval(locator.priceTag, elements =>
            elements.map(el => parseFloat(el.innerText.replace('$', '')))
        );
        // Get initial product prices
        const initialPrices = await getprices();

        // Click on the sort dropdown (adjust the selector as needed)
        await this.page.click(locator.sortIcon);

        // Select the "low to high" option
        await this.page.selectOption(locator.filterDropdownProduct, locator.lohiOption);

        // Get the sorted product prices
        const sortedPrices = await getprices();

        // Check if the prices are in ascending order
        for (let i = 1; i < sortedPrices.length; i++) {
            expect(sortedPrices[i]).toBeGreaterThanOrEqual(sortedPrices[i - 1]);
        }
        // Additional assertion to ensure sorting actually changed something
        expect(sortedPrices[0]).toBeLessThanOrEqual(sortedPrices[sortedPrices.length - 1]);
    }

}
module.exports = { InventoryPage };