import { type Page } from "playwright/test";

export class SaucedemoCheckoutOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async finishCheckout() {
    // TODO: Click finish button to complete order
  }

  async cancelCheckout() {
    // TODO: Click cancel button
  }

  async getSubtotal() {
    // TODO: Extract subtotal price from page
    return null;
  }

  async getTax() {
    // TODO: Extract tax amount from page
    return null;
  }

  async getTotal() {
    // TODO: Extract total price from page
    return null;
  }
}
