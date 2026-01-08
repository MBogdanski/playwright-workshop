import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/finished/saucedemo-login-page';

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
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page.locator('.inventory_container')).toBeVisible();
    });

    test('should display error with empty password field', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);
      const username = 'standard_user';
      const password = '';

      // Act
      await loginPage.navigate();
      await loginPage.login(username, password);

      // Assert
      const errorMessage = await page.locator('[data-test="error"]').textContent();
      expect(errorMessage).toContain('Password is required');
    });

    test('should display error with locked out user', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);
      const username = 'locked_out_user';
      const password = 'secret_sauce';

      // Act
      await loginPage.navigate();
      await loginPage.login(username, password);

      // Assert
      const errorMessage = await page.locator('[data-test="error"]').textContent();
      expect(errorMessage).toContain('Sorry, this user has been locked out');
    });
  });

  test.describe('Invalid Credentials', () => {
    test('should show error with wrong password', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);
      const username = 'standard_user';
      const password = 'wrong_password';

      // Act
      await loginPage.navigate();
      await loginPage.login(username, password);

      // Assert
      const errorMessage = await page.locator('[data-test="error"]').textContent();
      expect(errorMessage).toContain('Username and password do not match');
    });

    test('should show error with non-existent user', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);
      const username = 'nonexistent_user';
      const password = 'secret_sauce';

      // Act
      await loginPage.navigate();
      await loginPage.login(username, password);

      // Assert
      const errorMessage = await page.locator('[data-test="error"]').textContent();
      expect(errorMessage).toContain('Username and password do not match');
    });

    test('should show error message for empty username', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);
      const username = '';
      const password = 'secret_sauce';

      // Act
      await loginPage.navigate();
      await loginPage.login(username, password);

      // Assert
      const errorMessage = await page.locator('[data-test="error"]').textContent();
      expect(errorMessage).toContain('Username is required');
    });
  });

  test.describe('UI Validation', () => {
    test('should have visible username and password inputs', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);

      // Act
      await loginPage.navigate();

      // Assert
      await expect(loginPage.usernameInput()).toBeVisible();
      await expect(loginPage.passwordInput()).toBeVisible();
    });

    test('should have clickable login button', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);

      // Act
      await loginPage.navigate();

      // Assert
      await expect(loginPage.loginButton()).toBeVisible();
      await expect(loginPage.loginButton()).toBeEnabled();
    });
  });
});
