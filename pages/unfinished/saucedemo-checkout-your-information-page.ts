import { type Page } from "playwright/test";

export class SaucedemoCheckoutYourInformationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    // TODO: Fill in first name, last name, and postal code inputs
  }

  async proceedToCheckoutOverview() {
    // TODO: Click continue button to proceed to checkout overview
  }

  async cancel() {
    // TODO: Click cancel button to go back
  }

  async getErrorMessage() {
    // TODO: Get error message text from page
    return null;
  }
}
