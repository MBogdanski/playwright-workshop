import { expect, type Locator, type Page } from "playwright/test";

export class SaucedemoProductsPage {
  readonly page: Page;
  readonly cartBadge = () => this.page.locator('.shopping_cart_badge');

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async addProductToCart(productName: string) {
    // Find the product item and click its "Add to cart" button
    const productLocator = this.page.locator('.inventory_item').filter({ hasText: productName });
    await productLocator.locator('button').click();
  }

  async removeProductFromCart(productName: string) {
    const productLocator = this.page.locator('.inventory_item').filter({ hasText: productName });
    await productLocator.locator('button').click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async sortBy(sortOption: string) {
    await this.page.locator('.product_sort_container').selectOption(sortOption);
  }

  async getCartCount() {
    const text = await this.cartBadge().textContent().catch(() => null);
    return text ? parseInt(text, 10) : 0;
  }

}
