import { Page, expect } from '@playwright/test';

const locator = require("../selectors/checkoutSelector.json")

interface PriceCalculation {
    subtotal: number;
    totalWithTax: number;
    roundedTotal: number;
}
export default class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async caculateTotalPriceNotax(): Promise<void> {
        const { subtotal, totalWithTax, roundedTotal }: PriceCalculation = await this.page.evaluate(() => {
            // Thay đổi kiểu dữ liệu ở đây
            const priceElements = document.querySelectorAll('.inventory_item_price');
            const subtotal: number = Array.from(priceElements).reduce((sum: number, el) => {
                const price = el.textContent?.replace('$', '') || '0';
                return sum + Number(price);
            }, 0);


            const taxRate: number = 0.08; // 8% tax
            const tax: number = subtotal * taxRate;
            const totalWithTax: number = subtotal + tax;
            const roundedTotal: number = Number(totalWithTax.toFixed(2));
            // cách 2
            //   const roundedTotal:Number = parseFloat(totalWithTax.toFixed(2));

            return { subtotal, totalWithTax, roundedTotal };
        });

        // Get the displayed total from the page
        const displayedTotal: number = await this.page.$eval(
            locator.totalPrice,
            (el: HTMLElement): number => {
                const priceText = el.textContent?.replace('Total: $', '') || '0';
                return Number(priceText);  // Convert to number
            }
        );
        // Assertions
        expect(displayedTotal).toBe(roundedTotal);
        expect(displayedTotal).toBeGreaterThanOrEqual(subtotal);
        expect(displayedTotal).toBeLessThanOrEqual(totalWithTax + 0.5); // Allow for rounding up
        expect(displayedTotal).toBeGreaterThanOrEqual(totalWithTax - 0.5);
        console.log(`Rounded Total: $${roundedTotal.toFixed(2)}`);
        console.log(`Displayed Total: $${displayedTotal.toFixed(2)}`);
    }


    async enterCheckoutInfo(s1: string, s2: string, s3: string) {
        await this.page.locator(locator.firstName).fill(s1);
        await this.page.locator(locator.lastName).fill(s2);
        await this.page.locator(locator.postalCode).fill(s3);
        await this.page.locator(locator.continueButton).click();
    }


}
module.exports = { CheckoutPage };