import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/unfinished/saucedemo-login-page';
import { SaucedemoProductsPage } from '../../pages/unfinished/saucedemo-products-page';
import { SaucedemoCartPage } from '../../pages/unfinished/saucedemo-cart-page';

test.describe('Sauce Demo - Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SaucedemoLoginPage(page);
    const productsPage = new SaucedemoProductsPage(page);
    const cartPage = new SaucedemoCartPage(page);

    // Login and add products to cart
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test.describe('View Cart Items', () => {
    test('should display added products in cart', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      const productName = 'Sauce Labs Backpack';
      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
      await productsPage.addProductToCart(productName);

      // Act
      await productsPage.goToCart();

      // Assert
      const cartItemCount = await cartPage.getCartItemCount();
      // TODO: Dodaj asercję sprawdzającą czy produkt jest widoczny w koszyku
      // Hint: sprawdź czy cartItemCount wynosi 1
    });

    test('should display correct product price in cart', async ({ page }) => {
      // Arrange
      const loginPage = new SaucedemoLoginPage(page);
      const productsPage = new SaucedemoProductsPage(page);
      const cartPage = new SaucedemoCartPage(page);
      const productName = 'Sauce Labs Bike Light';
      const expectedPrice = '$9.99';
      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
      await productsPage.addProductToCart(productName);

      // Act
      await productsPage.goToCart();

      // Assert
      // TODO: Pozyskaj cenę produktu i zweryfikuj czy wynosi $9.99
      // TODO: Dodaj asercję porównującą cenę
    });

    test('should display multiple items with correct quantities', async ({ page }) => {
      // TODO: Cały test do zaimplementowania
      // Hint: dodaj 2 różne produkty, przejdź do koszyka, sprawdź czy oba są vidoczne
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
      // TODO: Dodaj asercję sprawdzającą czy koszyk jest pusty
      // Hint: porównaj updatedCount z 0
    });

    test('should update cart after removing product', async ({ page }) => {
      // TODO: Arrange
      // TODO: Act
      // TODO: Assert
    });

    test('should maintain other items when removing one', async ({ page }) => {
      // TODO: Implement
    });
  });

  test.describe('Checkout Flow', () => {
    test('should navigate to checkout from cart', async ({ page }) => {
      // TODO: Implement
    });

    test('should continue shopping button return to products', async ({ page }) => {
      // TODO: Implement
    });
  });
});
