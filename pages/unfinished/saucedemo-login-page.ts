import { expect, type Locator, type Page } from "playwright/test";

export class SaucedemoLoginPage {
  readonly page: Page;
  // TODO: Add locators for username, password inputs and login button

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    // TODO: Navigate to login page
  }

  async login(username: string, password: string) {
    // TODO: Implement login flow - fill username and password, click login button
  }
}   