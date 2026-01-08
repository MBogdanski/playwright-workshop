import { expect, type Locator, type Page } from "playwright/test";

export class SaucedemoCheckoutOverviewPage {
  readonly page: Page;
  readonly cartItem = (productName: string) => this.page.locator(`text=${productName}`).locator('xpath=ancestor::div[@class="cart_item"]');
  readonly itemPrice = (productName: string) => this.cartItem(productName).locator('.inventory_item_price');
  readonly finishButton = () => this.page.locator('button[data-test="finish"], button:has-text("Finish")');
  readonly cancelButton = () => this.page.locator('button[data-test="cancel"], button:has-text("Cancel")');
  readonly subtotal = () => this.page.locator('.summary_subtotal_label');
  readonly tax = () => this.page.locator('.summary_tax_label');
  readonly total = () => this.page.locator('.summary_total_label');

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/checkout-step-two.html');
  }

  async finishCheckout() {
    await this.finishButton().click();
  }

  async cancel() {
    await this.cancelButton().click();
  }

  async getSubtotal() {
    const text = await this.subtotal().textContent();
    return text?.match(/[\d.]+/)?.[0];
  }

  async getTax() {
    const text = await this.tax().textContent();
    return text?.match(/[\d.]+/)?.[0];
  }

  async getTotal() {
    const text = await this.total().textContent();
    return text?.match(/[\d.]+/)?.[0];
  }
}
