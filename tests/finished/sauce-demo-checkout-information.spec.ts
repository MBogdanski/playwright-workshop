import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/finished/saucedemo-login-page';
import { SaucedemoProductsPage } from '../../pages/finished/saucedemo-products-page';
import { SaucedemoCartPage } from '../../pages/finished/saucedemo-cart-page';
import { SaucedemoCheckoutYourInformationPage } from '../../pages/finished/saucedemo-checkout-your-information-page';

test.describe('Sauce Demo - Checkout: Your Information', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SaucedemoLoginPage(page);
    const productsPage = new SaucedemoProductsPage(page);
    const cartPage = new SaucedemoCartPage(page);

    // Block backtrace analytics requests
    await page.route('**/events.backtrace.io/**', (route) => route.abort());

    // Login, add product to cart, navigate to cart, and proceed to checkout
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test.describe('Valid Information', () => {
    test('should complete checkout with valid information', async ({ page }) => {
      // Arrange
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);
      const firstName = 'John';
      const lastName = 'Doe';
      const postalCode = '12345';

      // Act
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
      await checkoutPage.proceedToCheckoutOverview();

      // Assert
      await expect(page).toHaveURL(/checkout-step-two/);
    });

    test('should fill all required fields', async ({ page }) => {
      // Arrange
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);
      const firstName = 'Jane';
      const lastName = 'Smith';
      const postalCode = '98765';

      // Act
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);

      // Assert
      await expect(checkoutPage.firstNameInput()).toHaveValue(firstName);
      await expect(checkoutPage.lastNameInput()).toHaveValue(lastName);
      await expect(checkoutPage.postalCodeInput()).toHaveValue(postalCode);
    });

    test('should accept numeric and alphanumeric postal codes', async ({ page }) => {
      // Arrange
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);
      const postalCode = '12345';

      // Act
      await checkoutPage.fillCheckoutInformation('John', 'Doe', postalCode);
      await checkoutPage.proceedToCheckoutOverview();

      // Assert
      await expect(page).toHaveURL(/checkout-step-two/);
    });
  });

  test.describe('Invalid Information', () => {
    test('should show error when first name is missing', async ({ page }) => {
      // Arrange
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);
      const firstName = '';
      const lastName = 'Doe';
      const postalCode = '12345';

      // Act
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
      await checkoutPage.proceedToCheckoutOverview();

      // Assert
      const errorMessage = await checkoutPage.getErrorMessage();
      expect(errorMessage).toContain('First Name is required');
    });

    test('should show error when last name is missing', async ({ page }) => {
      // Arrange
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);
      const firstName = 'John';
      const lastName = '';
      const postalCode = '12345';

      // Act
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
      await checkoutPage.proceedToCheckoutOverview();

      // Assert
      const errorMessage = await checkoutPage.getErrorMessage();
      expect(errorMessage).toContain('Last Name is required');
    });

    test('should show error when postal code is missing', async ({ page }) => {
      // Arrange
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);
      const firstName = 'John';
      const lastName = 'Doe';
      const postalCode = '';

      // Act
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
      await checkoutPage.proceedToCheckoutOverview();

      // Assert
      const errorMessage = await checkoutPage.getErrorMessage();
      expect(errorMessage).toContain('Postal Code is required');
    });
  });

  test.describe('Navigation', () => {
    test('should cancel checkout and return to cart', async ({ page }) => {
      // Arrange
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);

      // Act
      await checkoutPage.cancel();

      // Assert
      await expect(page).toHaveURL(/cart/);
    });

    test('should display correct page header', async ({ page }) => {
      // Arrange
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);

      // Act

      // Assert
      await expect(page.locator('.checkout_info_container')).toBeVisible();
    });
  });
});
