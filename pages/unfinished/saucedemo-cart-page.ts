import { type Page } from "playwright/test";

export class SaucedemoCartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeProductFromCart(productName: string) {
    // TODO: Find product in cart and click remove button
  }

  async continueShopping() {
    // TODO: Click continue shopping button
  }

  async proceedToCheckout() {
    // TODO: Click checkout button
  }

  async getCartItemCount() {
    // TODO: Return number of items in cart
    return 0;
  }
}
