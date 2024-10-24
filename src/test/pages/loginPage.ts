// loginPage.ts
import { Page, Locator, expect } from '@playwright/test';
const locator = require ("../selectors/loginSelector.json")
import dotenv from 'dotenv'; 
dotenv.config(); 
export default class LoginPage {

    readonly page: Page;
    readonly usernameLocator: Locator;
    readonly passwordLocator: Locator;
    readonly loginButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameLocator = page.locator(locator.username);
        this.passwordLocator = page.locator(locator.password);
        this.loginButtonLocator = page.locator(locator.loginButton);
     
    }

    async visit() {
        await this.page.goto(`${process.env.WEB_URL}`); 
    }

    async login(username: string, password: string) {
        await this.usernameLocator.fill(username);
        await this.passwordLocator.fill(password);
        await this.loginButtonLocator.click();
    }

    async validateErrorMessage(message: string) { 
        await expect(this.page.getByText(message)).toBeVisible({timeout:5000});
    }
}