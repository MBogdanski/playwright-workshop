import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/unfinished/saucedemo-login-page';
import { SaucedemoProductsPage } from '../../pages/unfinished/saucedemo-products-page';
import { SaucedemoCheckoutYourInformationPage } from '../../pages/unfinished/saucedemo-checkout-your-information-page';
import { SaucedemoCheckoutOverviewPage } from '../../pages/unfinished/saucedemo-checkout-overview-page';
import { SaucedemoCheckoutCompletePage } from '../../pages/unfinished/saucedemo-checkout-complete-page';

test.describe('Sauce Demo - Checkout: Complete', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SaucedemoLoginPage(page);
    const productsPage = new SaucedemoProductsPage(page);
    const checkoutYourInformationPage = new SaucedemoCheckoutYourInformationPage(page);
    const checkoutOverviewPage = new SaucedemoCheckoutOverviewPage(page);
    const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);

    // Complete full checkout flow
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await checkoutYourInformationPage.navigate();
    await checkoutYourInformationPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutYourInformationPage.proceedToCheckoutOverview();
    await checkoutOverviewPage.navigate();
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
      // TODO: Dodaj dodatkową asercję sprawdzającą czy kompletnna wiadomość się wyświetla
      // Hint: sprawdź completeText
    });

    test('should display order completion details', async ({ page }) => {
      // Arrange
      const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);
      await checkoutCompletePage.navigate();

      // Act
      const completeText = await checkoutCompletePage.getCompleteText();

      // Assert
      // TODO: Sprawdź czy completeText zawiera wiadomość o dostawie
      // TODO: Zweryfikuj czy jest to niepuste
    });

    test('should display pony express delivery message', async ({ page }) => {
      // TODO: Cały test do zaimplementowania
      // Hint: sprawdź czy pojawia się ikonka lub informacja o Pony Express
    });
  });

  test.describe('Navigation', () => {
    test('should have back to home button', async ({ page }) => {
      // Arrange
      const checkoutCompletePage = new SaucedemoCheckoutCompletePage(page);
      await checkoutCompletePage.navigate();

      // Act
      await checkoutCompletePage.goBackHome();

      // Assert
      // TODO: Sprawdź czy jesteśmy na stronie produktów
      // TODO: Zweryfikuj czy URL zawiera '/inventory.html'
    });

    test('should reset cart after successful checkout', async ({ page }) => {
      // TODO: Arrange
      // TODO: Act
      // TODO: Assert
    });

    test('should display complete page URL correctly', async ({ page }) => {
      // TODO: Implement
    });
  });

  test.describe('Page UI Elements', () => {
    test('should display completion page header', async ({ page }) => {
      // TODO: Implement
    });

    test('should have visible back home button', async ({ page }) => {
      // TODO: Implement
    });
  });
});
