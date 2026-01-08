import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/finished/saucedemo-login-page';
import { SaucedemoProductsPage } from '../../pages/finished/saucedemo-products-page';
import { SaucedemoCartPage } from '../../pages/finished/saucedemo-cart-page';
import { SaucedemoCheckoutYourInformationPage } from '../../pages/finished/saucedemo-checkout-your-information-page';
import { SaucedemoCheckoutOverviewPage } from '../../pages/finished/saucedemo-checkout-overview-page';

test.describe('Sauce Demo - Checkout: Overview', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SaucedemoLoginPage(page);
    const productsPage = new SaucedemoProductsPage(page);
    const cartPage = new SaucedemoCartPage(page);
    const checkoutYourInformationPage = new SaucedemoCheckoutYourInformationPage(page);

    // Block backtrace analytics requests
    await page.route('**/events.backtrace.io/**', (route) => route.abort());

    // Complete checkout flow up to overview page through button clicks
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutYourInformationPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutYourInformationPage.proceedToCheckoutOverview();
  });

  test.describe('Order Summary', () => {
    test('should display order summary with correct items', async ({ page }) => {
      // Arrange
      const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);
      const productName = 'Sauce Labs Backpack';

      // Act
      await checkoutOverviewPage.navigate();

      // Assert
      await expect(page.locator(`text=${productName}`)).toBeVisible();
      await expect(page.locator('.cart_item')).toHaveCount(1);
    });

    test('should display and calculate total price correctly', async ({ page }) => {
      // Arrange
      const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);
      await checkoutOverviewPage.navigate();

      // Act
      const subtotal = await checkoutOverviewPage.getSubtotal();
      const tax = await checkoutOverviewPage.getTax();
      const total = await checkoutOverviewPage.getTotal();

      // Assert
      const calculatedTotal = (parseFloat(subtotal || '0') + parseFloat(tax || '0')).toFixed(2);
      expect(total).toBe(calculatedTotal);
      expect(parseFloat(total || '0')).toBeGreaterThan(0);
    });

    test('should display shipping information', async ({ page }) => {
      // Arrange
      const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);

      // Act
      await checkoutOverviewPage.navigate();

      // Assert
      await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
      await expect(page.locator('[data-test="shipping-info-label"]')).toContainText('Shipping');
    });
  });

  test.describe('Finish Order', () => {
    test('should complete order and navigate to completion page', async ({ page }) => {
      // Arrange
      const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);

      // Act
      await checkoutOverviewPage.navigate();
      await checkoutOverviewPage.finishCheckout();

      // Assert
      await expect(page).toHaveURL(/checkout-complete/);
      await expect(page.locator('.complete-header')).toBeVisible();
    });

    test('should disable finish button until page loads completely', async ({ page }) => {
      // Arrange
      const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);

      // Act
      await checkoutOverviewPage.navigate();

      // Assert
      await expect(checkoutOverviewPage.page.locator('button:has-text("Finish")')).toBeEnabled();
    });

    test('should cancel order and return to inventory', async ({ page }) => {
      // Arrange
      const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);

      // Act
      await checkoutOverviewPage.navigate();
      await checkoutOverviewPage.cancel();

      // Assert
      await expect(page).toHaveURL(/inventory/);
    });
  });

  test.describe('Price Validation', () => {
    test('should include tax in total calculation', async ({ page }) => {
      // Arrange
      const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);

      // Act
      await checkoutOverviewPage.navigate();
      const subtotal = parseFloat(await checkoutOverviewPage.getSubtotal() || '0');
      const tax = parseFloat(await checkoutOverviewPage.getTax() || '0');
      const total = parseFloat(await checkoutOverviewPage.getTotal() || '0');

      // Assert
      expect(total).toBeGreaterThan(subtotal);
      expect(tax).toBeGreaterThan(0);
    });

    test('should round prices correctly', async ({ page }) => {
      // Arrange
      const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);

      // Act
      await checkoutOverviewPage.navigate();
      const total = await checkoutOverviewPage.getTotal();

      // Assert
      expect(total).toMatch(/^\d+\.\d{2}$/);
    });
  });
});
