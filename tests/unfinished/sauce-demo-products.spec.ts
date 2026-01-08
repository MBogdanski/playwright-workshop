import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/unfinished/saucedemo-login-page';
import { SaucedemoProductsPage } from '../../pages/unfinished/saucedemo-products-page';

test.describe('Sauce Demo - Products Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SaucedemoLoginPage(page);
    const productsPage = new SaucedemoProductsPage(page);

    // Login before each test
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test.describe('Add to Cart', () => {
    test('should add product to cart and display cart badge', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const productName = 'Sauce Labs Backpack';
      const initialCartCount = await productsPage.getCartCount();

      // Act
      await productsPage.addProductToCart(productName);

      // Assert
      const updatedCartCount = await productsPage.getCartCount();
      // TODO: Dodaj asercję sprawdzającą czy liczba produktów w koszyku się zwiększyła o 1
      // Hint: porównaj initialCartCount z updatedCartCount
    });

    test('should add multiple products to cart', async ({ page }) => {
      // Arrange
      const productsPage = new SaucedemoProductsPage(page);
      const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

      // Act
      // TODO: Dodaj produkty do koszyka
      // TODO: Sprawdź ilość produktów w koszyku

      // Assert
      // TODO: Zweryfikuj czy liczba produktów w koszyku wynosi 2
    });

    test('should remove product from cart', async ({ page }) => {
      // TODO: Cały test do zaimplementowania
      // Hint: dodaj produkt, następnie go usuń, sprawdź czy został usunięty
      const productsPage = new SaucedemoProductsPage(page);
    });
  });

  test.describe('Sorting and Filtering', () => {
    test('should sort products by name ascending', async ({ page }) => {
      // TODO: Arrange
      // TODO: Act - sortuj produkty alfabetycznie
      // TODO: Assert - sprawdź czy produkty są posortowane
    });

    test('should sort products by price', async ({ page }) => {
      // TODO: Implement
    });

    test('should display all products', async ({ page }) => {
      // TODO: Implement
    });
  });

  test.describe('Product Display', () => {
    test('should display product image and price', async ({ page }) => {
      // TODO: Implement
    });

    test('should have clickable product details', async ({ page }) => {
      // TODO: Implement
    });
  });
});
