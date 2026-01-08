import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/finished/saucedemo-login-page';
import { SaucedemoProductsPage } from '../../pages/finished/saucedemo-products-page';
import { SaucedemoCartPage } from '../../pages/finished/saucedemo-cart-page';

test.describe('Sauce Demo - Products Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SaucedemoLoginPage(page);

    // Block backtrace analytics requests
    await page.route('**/events.backtrace.io/**', (route) => route.abort());

    // Login before each test
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test.describe('Add to Cart', () => {
    test('should add product to cart and verify item in cart', async ({ page }) => {
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
    });

    test('should add multiple products to cart', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

      // Act
      for (const product of products) {
        await productsPage.addProductToCart(product);
      }

      // Assert
      const cartCount = await productsPage.getCartCount();
      expect(cartCount).toBe(products.length);
      await expect(productsPage.cartBadge()).toContainText('2');
    });

    test('should remove product from cart', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      const productName = 'Sauce Labs Backpack';
      await productsPage.addProductToCart(productName);

      // Act
      await productsPage.goToCart();
      await cartPage.removeProductFromCart(productName);

      // Assert
      const cartCount = await cartPage.getCartItemCount();
      expect(cartCount).toBe(0);
    });
  });

  test.describe('Sorting and Filtering', () => {
    test('should sort products by name ascending', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);

      // Act
      await productsPage.sortBy('az');

      // Assert
      const productNames = await page.locator('.inventory_item_name').allTextContents();
      const sorted = [...productNames].sort();
      expect(productNames).toEqual(sorted);
    });

    test('should sort products by price', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);

      // Act
      await productsPage.sortBy('lohi');

      // Assert
      const priceElements = await page.locator('.inventory_item_price').allTextContents();
      const prices = priceElements.map(p => parseFloat(p.replace('$', '')));
      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
      }
    });

    test('should display all products', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);

      // Act
      await productsPage.navigate();

      // Assert
      const productCount = await page.locator('.inventory_item').count();
      expect(productCount).toBeGreaterThan(0);
      expect(productCount).toBe(6);
    });
  });

  test.describe('Product Display', () => {
    test('should display product image and price', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);

      // Act
      await productsPage.navigate();

      // Assert
      await expect(page.locator('.inventory_item_img').first()).toBeVisible();
      await expect(page.locator('.inventory_item_price').first()).toBeVisible();
    });

    test('should have clickable product details', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);

      // Act
      await productsPage.navigate();
      const productLink = page.locator('.inventory_item_name').first();
      await productLink.click();

      // Assert
      await expect(page.locator('.inventory_details').nth(1)).toBeVisible();
    });
  });
});
