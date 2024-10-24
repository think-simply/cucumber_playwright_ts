const { When, Then } = require("@cucumber/cucumber");
const { CheckoutPage } = require("../pages/checkoutPage");
import { pageFixture } from "../../hooks/pageFixture";

When("User fill infor to checkout {string} {string} {string}", async (s1: string, s2: string, s3: string) => {
    const checkoutPage = new CheckoutPage(pageFixture.page);
    await checkoutPage.enterCheckoutInfo(s1, s2, s3);
})
Then("Should display the correct total price of added item", async () => {
    const checkoutPage = new CheckoutPage(pageFixture.page);
    await checkoutPage.caculateTotalPriceNotax();

});

