import { expect, type Locator, type Page } from "playwright/test";

export class SaucedemoCheckoutYourInformationPage {
  readonly page: Page;
  readonly firstNameInput = () => this.page.getByPlaceholder('First Name');
  readonly lastNameInput = () => this.page.getByPlaceholder('Last Name');
  readonly postalCodeInput = () => this.page.getByPlaceholder('Zip/Postal Code');
  readonly continueButton = () => this.page.locator('input[data-test="continue"]');
  readonly cancelButton = () => this.page.locator('button[data-test="cancel"], button:has-text("Cancel")');
  readonly errorMessage = () => this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.postalCodeInput().fill(postalCode);
  }

  async proceedToCheckoutOverview() {
    await this.continueButton().click();
  }

  async cancel() {
    await this.cancelButton().click();
  }

  async getErrorMessage() {
    return await this.errorMessage().textContent();
  }
}
