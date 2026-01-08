import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/finished/saucedemo-login-page';
import { SaucedemoProductsPage } from '../../pages/finished/saucedemo-products-page';
import { SaucedemoCartPage } from '../../pages/finished/saucedemo-cart-page';
import { SaucedemoCheckoutYourInformationPage } from '../../pages/finished/saucedemo-checkout-your-information-page';
import { SaucedemoCheckoutOverviewPage } from '../../pages/finished/saucedemo-checkout-overview-page';
import { SaucedemoCheckoutCompletePage } from '../../pages/finished/saucedemo-checkout-complete-page';

test.describe('Sauce Demo - Checkout: Complete', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SaucedemoLoginPage(page);
    const productsPage = new SaucedemoProductsPage(page);
    const cartPage = new SaucedemoCartPage(page);
    const checkoutYourInformationPage = new SaucedemoCheckoutYourInformationPage(page);
    const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);

    // Block backtrace analytics requests
    await page.route('**/events.backtrace.io/**', (route) => route.abort());

    // Complete full checkout flow through button clicks
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutYourInformationPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutYourInformationPage.proceedToCheckoutOverview();
    await checkoutOverviewPage.finishCheckout();
  });

  test.describe('Order Confirmation', () => {
    test('should display thank you message after successful checkout', async ({ page }) => {
      // Arrange
      const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);
      const expectedText = 'Thank you for your order';

      // Act
      const completeHeader = await checkoutCompletePage.getCompleteHeader();

      // Assert
      expect(completeHeader).toContain('Thank you');
      await expect(page.locator('.complete-header')).toContainText('Thank you');
    });

    test('should display order completion details', async ({ page }) => {
      // Arrange
      const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);

      // Act
      const completeText = await checkoutCompletePage.getCompleteText();

      // Assert
      expect(completeText).toBeTruthy();
      expect(completeText).toContain('Your order');
    });

    test('should display pony express delivery message', async ({ page }) => {
      // Arrange
      const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);

      // Act

      // Assert
      await expect(page.locator('.pony_express')).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should have back to home button', async ({ page }) => {
      // Arrange
      const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);

      // Act
      await checkoutCompletePage.goBackHome();

      // Assert
      await expect(page).toHaveURL(/inventory/);
    });

    test('should reset cart after successful checkout', async ({ page }) => {
      // Arrange
      const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);

      // Act
      await checkoutCompletePage.goBackHome();

      // Assert
      const cartBadge = page.locator('.shopping_cart_badge');
      await expect(cartBadge).not.toBeVisible();
    });

    test('should display complete page URL correctly', async ({ page }) => {
      // Arrange
      const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);

      // Act

      // Assert
      await expect(page).toHaveURL(/checkout-complete/);
    });
  });

  test.describe('Page UI Elements', () => {
    test('should display completion page header', async ({ page }) => {
      // Arrange
      const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);

      // Act

      // Assert
      await expect(page.locator('.complete-header')).toBeVisible();
      await expect(page.locator('.complete-text')).toBeVisible();
    });

    test('should have visible back home button', async ({ page }) => {
      // Arrange
      const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);

      // Act

      // Assert
      const backButton = page.locator('button:has-text("Back Home")');
      await expect(backButton).toBeVisible();
      await expect(backButton).toBeEnabled();
    });
  });
});
