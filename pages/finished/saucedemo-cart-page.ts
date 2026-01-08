import { expect, type Locator, type Page } from "playwright/test";

export class SaucedemoCartPage {
  readonly page: Page;
  readonly cartItem = (productName: string) => this.page.locator(`text=${productName}`).locator('xpath=ancestor::div[@class="cart_item"]');
  readonly removeButton = (productName: string) => this.cartItem(productName).locator('button:has-text("Remove")');
  readonly continueShoppingButton = () => this.page.locator('button:has-text("Continue Shopping")');
  readonly checkoutButton = () => this.page.locator('button:has-text("Checkout")');
  readonly cartItemCount = () => this.page.locator('.cart_item').count();
  readonly itemPrice = (productName: string) => this.cartItem(productName).locator('.inventory_item_price');
  readonly itemQuantity = (productName: string) => this.cartItem(productName).locator('.cart_quantity');

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async removeProductFromCart(productName: string) {
    await this.removeButton(productName).click();
  }

  async continueShopping() {
    await this.continueShoppingButton().click();
  }

  async proceedToCheckout() {
    await this.checkoutButton().click();
  }

  async getCartItemCount() {
    return await this.cartItemCount();
  }
}
