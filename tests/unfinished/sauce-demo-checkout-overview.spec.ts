import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/unfinished/saucedemo-login-page';
import { SaucedemoProductsPage } from '../../pages/unfinished/saucedemo-products-page';
import { SaucedemoCheckoutYourInformationPage } from '../../pages/unfinished/saucedemo-checkout-your-information-page';
import { SaucedemoCheckoutOverviewPage } from '../../pages/unfinished/saucedemo-checkout-overview-page';

test.describe('Sauce Demo - Checkout: Overview', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SaucedemoLoginPage(page);
    const productsPage = new SaucedemoProductsPage(page);
    const checkoutYourInformationPage = new SaucedemoCheckoutYourInformationPage(page);
    const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);

    // Complete checkout flow up to overview page
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await checkoutYourInformationPage.navigate();
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
      // TODO: Zweryfikuj czy produkt "Sauce Labs Backpack" jest widoczny na overview
      // Hint: sprawdź czy strona zawiera tekst z nazwą produktu
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
      // TODO: Zweryfikuj czy total = subtotal + tax
      // TODO: Dodaj asercje dla wszystkich wartości
    });

    test('should display shipping information', async ({ page }) => {
      // TODO: Cały test do zaimplementowania
      // Hint: sprawdź czy widoczne jest Free Shipping
    });
  });

  test.describe('Finish Order', () => {
    test('should complete order and navigate to completion page', async ({ page }) => {
      // Arrange
      await checkoutOverviewPage.navigate();

      // Act
      await checkoutOverviewPage.finishCheckout();

      // Assert
      // TODO: Sprawdź czy URL zawiera '/checkout-complete.html'
      // TODO: Zweryfikuj czy pojawił się komunikat potwierdzenia zamówienia
    });

    test('should disable finish button until page loads completely', async ({ page }) => {
      // TODO: Arrange
      // TODO: Act
      // TODO: Assert
    });

    test('should cancel order and return to inventory', async ({ page }) => {
      // TODO: Implement
    });
  });

  test.describe('Price Validation', () => {
    test('should include tax in total calculation', async ({ page }) => {
      // TODO: Implement
    });

    test('should round prices correctly', async ({ page }) => {
      // TODO: Implement
    });
  });
});
