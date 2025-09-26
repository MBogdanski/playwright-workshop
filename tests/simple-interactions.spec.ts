import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('simple name input interaction', async ({ page }) => {
    await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
    await expect(page).toHaveTitle(/Simple HTML Elements For Automation - Ultimate QA/);

    const nameInput = page.locator('#et_pb_contact_name_0');
    await nameInput.fill('My name');
    await expect(nameInput).toHaveValue('My name');
});

test('simple email input interaction', async ({ page }) => {
    await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
    await expect(page).toHaveTitle(/Simple HTML Elements For Automation - Ultimate QA/);

    const emailInput = page.locator('#et_pb_contact_email_0');
    await emailInput.fill('My email');
    await expect(emailInput).toHaveValue('My email');
});

test('checkbox check interaction', async ({ page }) => {
    await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
    const bikeCheckbox = page.locator('input[type="checkbox"][value="Bike"]');
    await bikeCheckbox.click();
    // Sprawdzamy, czy jest widoczny i enabled
    await expect(bikeCheckbox).toBeVisible();
    await expect(bikeCheckbox).toBeEnabled();
});

test('checkbox uncheck interaction', async ({ page }) => {
    await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
    const bikeCheckbox = page.locator('input[type="checkbox"][value="Bike"]');
    await bikeCheckbox.uncheck();
    await expect(bikeCheckbox).not.toBeChecked();
});

// locator.click()
test('button click interaction', async ({ page }) => {
    await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
    const button = page.locator('button.et_pb_contact_submit');
    await button.first().click();
    await expect(button.first()).toBeVisible();
});

// locator.hover()
test('hover interaction on link', async ({ page }) => {
    await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
    const link = page.locator('a[href="https://ultimateqa.com/"]').first();
    await link.hover();
    await expect(link).toBeVisible();
});

// locator.focus()
test('focus interaction on input', async ({ page }) => {
    await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
    const nameInput = page.locator('#et_pb_contact_name_0');
    await nameInput.focus();
    await expect(nameInput).toBeFocused();
});

// locator.press()
test('press Enter in input', async ({ page }) => {
    await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
    const nameInput = page.locator('#et_pb_contact_name_0');
    await nameInput.fill('Test');
    await nameInput.press('Enter');
    await expect(nameInput).toHaveValue('Test');
});

// locator.selectOption()
test('select option interaction', async ({ page }) => {
    await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/');
    const select = page.locator('select').first();
    await select.scrollIntoViewIfNeeded();
    await select.selectOption('audi');
    await expect(select).toHaveValue('audi');
});