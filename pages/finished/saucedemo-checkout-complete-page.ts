import { expect, type Locator, type Page } from "playwright/test";

export class SaucedemoCheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader = () => this.page.locator('.complete-header');
  readonly completeText = () => this.page.locator('.complete-text');
  readonly backHomeButton = () => this.page.locator('button:has-text("Back Home")');
  readonly poniesToRides = () => this.page.locator('.pony_express');

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/checkout-complete.html');
  }

  async getCompleteHeader() {
    return await this.completeHeader().textContent();
  }

  async getCompleteText() {
    return await this.completeText().textContent();
  }

  async goBackHome() {
    await this.backHomeButton().click();
  }
}
