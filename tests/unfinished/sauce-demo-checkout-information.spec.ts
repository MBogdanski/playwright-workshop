import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/unfinished/saucedemo-login-page';
import { SaucedemoProductsPage } from '../../pages/unfinished/saucedemo-products-page';
import { SaucedemoCheckoutYourInformationPage } from '../../pages/unfinished/saucedemo-checkout-your-information-page';

test.describe('Sauce Demo - Checkout: Your Information', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SaucedemoLoginPage(page);
    const productsPage = new SaucedemoProductsPage(page);
    const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);

    // Login, add product to cart, and navigate to checkout
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
  });

  test.describe('Valid Information', () => {
    test('should complete checkout with valid information', async ({ page }) => {
      // Arrange
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);
      const firstName = 'John';
      const lastName = 'Doe';
      const postalCode = '12345';

      // Act
      await checkoutPage.navigate();
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
      await checkoutPage.proceedToCheckoutOverview();

      // Assert
      // TODO: Dodaj asercję sprawdzającą czy jesteśmy na stronie Overview
      // Hint: sprawdź czy URL zawiera '/checkout-step-two.html'
    });

    test('should fill all required fields', async ({ page }) => {
      // Arrange
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);
      const firstName = 'Jane';
      const lastName = 'Smith';
      const postalCode = '98765';

      // Act
      await checkoutPage.navigate();
      // TODO: Uzupełnij formularz
      // TODO: Sprawdź czy przyciski są dostępne

      // Assert
      // TODO: Zweryfikuj czy dane zostały wpisane poprawnie
    });

    test('should accept numeric and alphanumeric postal codes', async ({ page }) => {
      // TODO: Cały test do zaimplementowania
      // Hint: spróbuj różne formaty kodów pocztowych
      const checkoutPage = new SaucedemoCheckoutYourInformationPage(page);
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
      await checkoutPage.navigate();
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
      await checkoutPage.proceedToCheckoutOverview();

      // Assert
      const errorMessage = await checkoutPage.getErrorMessage();
      // TODO: Zweryfikuj czy błąd zawiera informację o brakującym imieniu
      // Hint: sprawdź czy errorMessage nie jest undefined/empty
    });

    test('should show error when last name is missing', async ({ page }) => {
      // TODO: Arrange
      // TODO: Act
      // TODO: Assert
    });

    test('should show error when postal code is missing', async ({ page }) => {
      // TODO: Implement
    });
  });

  test.describe('Navigation', () => {
    test('should cancel checkout and return to cart', async ({ page }) => {
      // TODO: Implement
    });

    test('should display correct page header', async ({ page }) => {
      // TODO: Implement
    });
  });
});
