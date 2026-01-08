import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/finished/saucedemo-login-page';
import { SaucedemoProductsPage } from '../../pages/finished/saucedemo-products-page';
import { SaucedemoCartPage } from '../../pages/finished/saucedemo-cart-page';

test.describe('Sauce Demo - Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SaucedemoLoginPage(page);

    // Block backtrace analytics requests
    await page.route('**/events.backtrace.io/**', (route) => route.abort());

    // Login before each test
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test.describe('View Cart Items', () => {
    test('should display added products in cart', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      const productName = 'Sauce Labs Backpack';

      // Act
      await productsPage.addProductToCart(productName);
      await productsPage.goToCart();

      // Assert
      const cartItemCount = await cartPage.getCartItemCount();
      expect(cartItemCount).toBe(1);
      await expect(page.locator(`text=${productName}`)).toBeVisible();
    });

    test('should display correct product price in cart', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      const productName = 'Sauce Labs Bike Light';
      const expectedPrice = '$9.99';

      // Act
      await productsPage.addProductToCart(productName);
      await productsPage.goToCart();

      // Assert
      const priceText = await cartPage.itemPrice(productName).textContent();
      expect(priceText).toContain(expectedPrice);
    });

    test('should display multiple items with correct quantities', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

      // Act
      for (const product of products) {
        await productsPage.addProductToCart(product);
      }
      await productsPage.goToCart();

      // Assert
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(products.length);
      for (const product of products) {
        await expect(page.locator(`text=${product}`)).toBeVisible();
      }
    });
  });

  test.describe('Remove from Cart', () => {
    test('should remove product from cart', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      const productName = 'Sauce Labs Backpack';
      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
      await productsPage.addProductToCart(productName);
      await productsPage.goToCart();
      const initialCount = await cartPage.getCartItemCount();

      // Act
      await cartPage.removeProductFromCart(productName);

      // Assert
      const updatedCount = await cartPage.getCartItemCount();
      expect(updatedCount).toBe(0);
      await expect(page.locator(`text=${productName}`)).not.toBeVisible();
    });

    test('should update cart after removing product', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
      for (const product of products) {
        await productsPage.addProductToCart(product);
      }
      await productsPage.goToCart();

      // Act
      await cartPage.removeProductFromCart(products[0]);

      // Assert
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(1);
      await expect(page.locator(`text=${products[0]}`)).not.toBeVisible();
      await expect(page.locator(`text=${products[1]}`)).toBeVisible();
    });

    test('should maintain other items when removing one', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
      for (const product of products) {
        await productsPage.addProductToCart(product);
      }
      await productsPage.goToCart();
      const initialCount = await cartPage.getCartItemCount();

      // Act
      await cartPage.removeProductFromCart(products[1]);

      // Assert
      const finalCount = await cartPage.getCartItemCount();
      expect(finalCount).toBe(initialCount - 1);
      expect(finalCount).toBe(2);
    });
  });

  test.describe('Checkout Flow', () => {
    test('should navigate to checkout from cart', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      await productsPage.addProductToCart('Sauce Labs Backpack');
      await productsPage.goToCart();

      // Act
      await cartPage.proceedToCheckout();

      // Assert
      await expect(page).toHaveURL(/checkout-step-one/);
    });

    test('should continue shopping button return to products', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      await productsPage.addProductToCart('Sauce Labs Backpack');
      await productsPage.goToCart();

      // Act
      await cartPage.continueShopping();

      // Assert
      await expect(page).toHaveURL(/inventory/);
    });
  });
});
