// hooks.ts
import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
  console.log('Launching browser...'); 
  browser = await chromium.launch({ headless: false }); 
});

AfterAll(async () => {
  console.log('Closing browser...');
  await browser.close();
});

Before(async function (this: any) { // Access 'this' for scenario context
  console.log('Creating new context and page...');
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page; 

  // Store the page in the Cucumber World for access in steps
  this.page = page; 
});

After(async function (this: any, { pickle, result }) { // Access 'this'
  console.log('Closing context and page...');
  if (result?.status === Status.FAILED) {
    console.log('Taking screenshot...');
    await this.page.screenshot({ // Use 'this.page' 
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: 'png',
    });
  }
  await this.page.close(); // Use 'this.page' 
  await context.close();
});