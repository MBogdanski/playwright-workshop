
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('fill and submit the whole practice form', async ({ page }) => {
	await page.goto('https://demoqa.com/automation-practice-form');

	// Ukryj reklamy, które mogą przeszkadzać
	await page.evaluate(() => {
		const ad1 = document.getElementById('RightSide_Advertisement');
		if (ad1) ad1.style.display = 'none';
		const ad2 = document.getElementById('adplus-anchor');
		if (ad2) ad2.style.display = 'none';
	});

	// Fill text inputs
	await page.locator('#firstName').fill('Jan');
	await page.locator('#firstName').blur();
	await page.locator('#lastName').fill('Kowalski');
	await page.locator('#lastName').blur();
	await page.locator('#userEmail').fill('jan.kowalski@example.com');
	await page.locator('#userEmail').blur();
	await expect(page.locator('#firstName')).toHaveValue('Jan');
	await expect(page.locator('#lastName')).toHaveValue('Kowalski');
	await expect(page.locator('#userEmail')).toHaveValue('jan.kowalski@example.com');

	// Select gender radio
	await page.locator('label[for="gender-radio-1"]').click(); // Male
	await expect(page.locator('#gender-radio-1')).toBeChecked();

	// Fill mobile number
	await page.locator('#userNumber').fill('9999999991');
	await page.locator('#userNumber').blur();
	await expect(page.locator('#userNumber')).toHaveValue('9999999991');

	// Set date of birth
	await page.locator('#dateOfBirthInput').click();
	await page.locator('.react-datepicker__year-select').selectOption('1990');
	await page.locator('.react-datepicker__month-select').selectOption({ label: 'March' });
	await page.locator('div[aria-label*="March 19th, 1990"]').click();
	await expect(page.locator('#dateOfBirthInput')).toHaveValue(/19 Mar 1990/);

	// Fill subjects (autocomplete)
	await page.locator('#subjectsInput').fill('Math');
	await page.locator('.subjects-auto-complete__menu').locator('div').first().click();
	await expect(page.locator('.subjects-auto-complete__multi-value__label')).toHaveText('Maths');

	// Check hobbies
	await page.locator('label[for="hobbies-checkbox-1"]').click(); // Sports
	await page.locator('label[for="hobbies-checkbox-2"]').click(); // Reading
	await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
	await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();

	// Set input file
	const fileInput = page.locator('#uploadPicture');
	const tempFilePath = path.join(__dirname, 'avatar.png');
	fs.writeFileSync(tempFilePath, '');
	await fileInput.setInputFiles(tempFilePath);
	await expect(fileInput).toBeVisible();
	fs.unlinkSync(tempFilePath);

	// Fill current address
	await page.locator('#currentAddress').fill('ul. Przykładowa 1, Warszawa');
	await page.locator('#currentAddress').blur();
	await expect(page.locator('#currentAddress')).toHaveValue('ul. Przykładowa 1, Warszawa');

	// Select state and city
	await page.locator('#state').click();
	await page.locator('div[id^="react-select-3-option-"]').first().click();
	await page.locator('#city').click();
	await page.locator('div[id^="react-select-4-option-"]').first().click();
	await expect(page.locator('#state .css-1uccc91-singleValue')).not.toBeEmpty();
	await expect(page.locator('#city .css-1uccc91-singleValue')).not.toBeEmpty();

	// Submit form
	await page.locator('#submit').scrollIntoViewIfNeeded();
	await page.locator('#submit').click();
	await expect(page.locator('.modal-content')).toBeVisible();

	// Verify modal result
	const modal = page.locator('.modal-content');
	await expect(modal).toContainText('Jan Kowalski');
	await expect(modal).toContainText('jan.kowalski@example.com');
	await expect(modal).toContainText('Male');
	await expect(modal).toContainText('9999999991');
	await expect(modal).toContainText('Maths');
	await expect(modal).toContainText('Sports, Reading');
	await expect(modal).toContainText('ul. Przykładowa 1, Warszawa');
});
