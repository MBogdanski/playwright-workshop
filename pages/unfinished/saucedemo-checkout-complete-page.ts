import { type Page } from "playwright/test";

export class SaucedemoCheckoutCompletePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getCompleteHeader() {
    // TODO: Get the complete header text from page
    return null;
  }

  async getCompleteText() {
    // TODO: Get the complete message text from page
    return null;
  }

  async goBackHome() {
    // TODO: Click back home button
  }
}
