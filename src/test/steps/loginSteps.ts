// loginSteps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import LoginPage from "../pages/loginPage";
import { pageFixture } from "../../hooks/pageFixture"; // Import pageFixture


Given("User navigates to Login page", async () => { 
    const loginPage = new LoginPage(pageFixture.page); // Use pageFixture.page
    await loginPage.visit();
  });

When("User inputs data with {string} and {string}", async (name, pass) => {
    const loginPage = new LoginPage(pageFixture.page);
    await loginPage.login(name, pass);
});

Then("{string} message will be displayed", async (errorMessage) => {
    const loginPage = new LoginPage(pageFixture.page);
    await loginPage.validateErrorMessage(errorMessage); 
});