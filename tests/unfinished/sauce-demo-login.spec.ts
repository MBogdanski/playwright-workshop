import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/unfinished/saucedemo-login-page';

test.describe('Sauce Demo - Login Page', () => {
  test.describe('Valid Credentials', () => {
    test('should successfully login with standard user', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);
      const username = 'standard_user';
      const password = 'secret_sauce';

      // Act
      await loginPage.navigate();
      await loginPage.login(username, password);

      // Assert
      // TODO: Dodaj asercję sprawdzającą czy jesteśmy na stronie produktów
      // Hint: sprawdź czy URL zawiera '/inventory.html'
    });

    test('should display error with empty password field', async ({ page }) => {
      // TODO: Arrange - przygotuj loginPage i zmienne
      // TODO: Act - nawiguj do strony i spróbuj zalogować się bez hasła
      // TODO: Assert - sprawdź czy pojawi się komunikat błędu
    });

    test('should display error with locked out user', async ({ page }) => {
      // TODO: Cały test do zaimplementowania
      // Hint: zaloguj się jako 'locked_out_user' z hasłem 'secret_sauce'
      // Sprawdź czy pojawi się komunikat "Sorry, this user has been locked out."
    });
  });

  test.describe('Invalid Credentials', () => {
    test('should show error with wrong password', async ({ page }) => {
      // TODO: Arrange
      // TODO: Act
      // TODO: Assert
    });

    test('should show error with non-existent user', async ({ page }) => {
      // TODO: Implement
    });

    test('should show error message for empty username', async ({ page }) => {
      // TODO: Implement
    });
  });

  test.describe('UI Validation', () => {
    test('should have visible username and password inputs', async ({ page }) => {
      // TODO: Implement
    });

    test('should have clickable login button', async ({ page }) => {
      // TODO: Implement
    });
  });
});
