import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { FormPage } from '../main/form-page';

test('fill and submit the whole practice form using POM', async ({ page }) => {
    const form = new FormPage(page);
    await form.goto();
    await form.hideAds();

    // Fill text inputs
    await form.setFirstName('Jan');
    await form.setLastName('Kowalski');
    await form.setEmail('jan.kowalski@example.com');
    await expect(page.locator('#firstName')).toHaveValue('Jan');
    await expect(page.locator('#lastName')).toHaveValue('Kowalski');
    await expect(page.locator('#userEmail')).toHaveValue('jan.kowalski@example.com');

    // Select gender radio
    await form.selectGender('Male');
    await expect(page.locator('#gender-radio-1')).toBeChecked();

    // Fill mobile number
    await form.setMobile('9999999991');
    await expect(page.locator('#userNumber')).toHaveValue('9999999991');

    // Set date of birth
    await form.setDateOfBirth('1990', 'March', '19th, 1990');
    await expect(page.locator('#dateOfBirthInput')).toHaveValue(/19 Mar 1990/);

    // Fill subjects (autocomplete)
    await form.setSubjects('Math');
    await expect(page.locator('.subjects-auto-complete__multi-value__label')).toHaveText('Maths');

    // Check hobbies
    await form.checkHobby('Sports');
    await form.checkHobby('Reading');
    await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
    await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();

    // Set input file
    const tempFilePath = path.join(__dirname, 'avatar.png');
    fs.writeFileSync(tempFilePath, '');
    await form.setInputFile(tempFilePath);
    await expect(page.locator('#uploadPicture')).toBeVisible();
    fs.unlinkSync(tempFilePath);

    // Fill current address
    await form.setAddress('ul. Przykładowa 1, Warszawa');
    await expect(page.locator('#currentAddress')).toHaveValue('ul. Przykładowa 1, Warszawa');

    // Select state and city
    await form.selectState('NCR');
    await form.selectCity('Delhi');
    await expect(page.locator('#state .css-1uccc91-singleValue')).toHaveText('NCR');
    await expect(page.locator('#city .css-1uccc91-singleValue')).toHaveText('Delhi');

    // Submit form
    await form.submit();
    await expect(form.getSummaryModal()).toBeVisible();

    // Verify modal result
    const modal = form.getSummaryModal();
    await expect(modal).toContainText('Jan Kowalski');
    await expect(modal).toContainText('jan.kowalski@example.com');
    await expect(modal).toContainText('Male');
    await expect(modal).toContainText('9999999991');
    await expect(modal).toContainText('Maths');
    await expect(modal).toContainText('Sports, Reading');
    await expect(modal).toContainText('ul. Przykładowa 1, Warszawa');
});
