import { expect, type Locator, type Page } from "playwright/test";

export class SaucedemoProductsPage {
  readonly page: Page;
  // TODO: Add cartBadge locator

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    // TODO: Navigate to products page
  }

  async addProductToCart(productName: string) {
    // TODO: Find product by name and click add to cart button
  }

  async removeProductFromCart(productName: string) {
    // TODO: Find product by name and click remove button
  }

  async goToCart() {
    // TODO: Click shopping cart link to navigate to cart
  }

  async sortBy(sortOption: string) {
    // TODO: Select sort option from dropdown
  }

  async getCartCount() {
    // TODO: Get count from cart badge
    return 0;
  }
}
