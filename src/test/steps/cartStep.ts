const { When, Then } = require("@cucumber/cucumber");
const { CartPage } = require("../pages/cartPage");
import { pageFixture } from "../../hooks/pageFixture";

When("User go to checkout page", async () => {
    const cartPage = new CartPage(pageFixture.page);
    await cartPage.moveToCheckout();
});

Then("should display the correct number of item when remove item from cart", async () => {
    const cartPage = new CartPage(pageFixture.page);
    await cartPage.removeFirstProductFromCart();
    await cartPage.itemNumberInCart();


});

