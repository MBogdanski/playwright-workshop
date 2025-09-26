import { test, expect } from '@playwright/test';

test('Znajdź pole tekstowe Name za pomocą CSS', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  const locator = page.locator('#et_pb_contact_name_0');
  await expect(locator).toBeVisible();
});

test('Znajdź pole tekstowe Email za pomocą XPath', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  const locator = page.locator('//input[@id="et_pb_contact_email_0"]');
  await expect(locator).toBeVisible();
});


test('Znajdź checkbox Car za pomocą CSS', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  const locator = page.locator('input[type="checkbox"][value="Car"]');
  await expect(locator).toBeVisible();
});

test('Znajdź przycisk submit getByRole', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  const locator = page.getByRole('button', { name: "Click Me!" });
  await locator.scrollIntoViewIfNeeded();
  await expect(locator.first()).toBeVisible();
});

test('Znajdź pierwszy link do strony głównej CSS', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  const locator = page.locator('a[href="https://ultimateqa.com/"]').first();
  await expect(locator).toBeVisible();
});

test('Znajdź pole Name getByLabelText', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  const locator = page.getByLabel('Name');
  await expect(locator).toBeVisible();
});

test('Znajdź pole Email getByPlaceholderText', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  const locator = page.getByPlaceholder('Email');
  await expect(locator).toBeVisible();
});

test('Znajdź select z markami samochodów CSS', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  const locator = page.locator('select').first();
  await expect(locator).toBeVisible();
});


test('Znajdź pole Name getByTestId', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  // getByTestId wymaga data-testid, więc poniżej alternatywa:
  const locator = page.locator('#et_pb_contact_name_0');
  await expect(locator).toBeVisible();
});

test('Znajdź checkbox Bike XPath', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  const locator = page.locator('//input[@type="checkbox" and @value="Bike"]');
  await expect(locator).toBeVisible();
});

test('Znajdź link do UltimateQA getByRole', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  // Szukamy linku po widocznym tekście 'Click this link'
  const locator = page.getByRole('link', { name: /click this link/i });
  await expect(locator.first()).toBeVisible();
});

test('Znajdź pole Email getByRole textbox', async ({ page }) => {
  await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
  const locator = page.getByRole('textbox', { name: 'Email' });
  await expect(locator).toBeVisible();
});
