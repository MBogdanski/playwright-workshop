import { expect, type Locator, type Page } from "playwright/test";

export class SaucedemoLoginPage {
  readonly page: Page;
  readonly usernameInput = () => this.page.getByPlaceholder('Username');
  readonly passwordInput = () => this.page.getByPlaceholder('Password');
  readonly loginButton = () => this.page.locator('#login-button');

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.usernameInput().fill(username);
        await this.passwordInput().fill(password);
        await this.loginButton().click();
    }
}   