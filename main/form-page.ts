import { Page } from '@playwright/test';

export class FormPage {
    url = 'https://demoqa.com/automation-practice-form';
    constructor(public page: Page) {}

    async goto(parameters = ''): Promise<void> {
        await this.page.goto(`${this.url}${parameters}`);
    }

    async hideAds(): Promise<void> {
        await this.page.evaluate(() => {
            const ad1 = document.getElementById('RightSide_Advertisement');
            if (ad1) ad1.style.display = 'none';
            const ad2 = document.getElementById('adplus-anchor');
            if (ad2) ad2.style.display = 'none';
        });
    }


    async setFirstName(value: string) {
        await this.page.locator('#firstName').fill(value);
    }

    async setLastName(value: string) {
        await this.page.locator('#lastName').fill(value);
    }

    async setEmail(value: string) {
        await this.page.locator('#userEmail').fill(value);
    }

    async selectGender(gender: 'Male' | 'Female' | 'Other') {
        const map = { Male: 'gender-radio-1', Female: 'gender-radio-2', Other: 'gender-radio-3' };
        await this.page.locator(`label[for="${map[gender]}"]`).click();
        await this.page.locator(`#${map[gender]}`).isChecked();
    }

    async setMobile(value: string) {
        await this.page.locator('#userNumber').fill(value);
    }

    async setDateOfBirth(year: string, monthLabel: string, dayLabel: string) {
        await this.page.locator('#dateOfBirthInput').click();
        await this.page.locator('.react-datepicker__year-select').selectOption(year);
        await this.page.locator('.react-datepicker__month-select').selectOption({ label: monthLabel });
        await this.page.locator(`div[aria-label*="${monthLabel} ${dayLabel}"]`).click();
    }

    async setSubjects(subject: string) {
        await this.page.locator('#subjectsInput').fill(subject);
        await this.page.locator('.subjects-auto-complete__menu').locator('div').first().click();
    }

    async checkHobby(hobby: 'Sports' | 'Reading' | 'Music') {
        const map = { Sports: 'hobbies-checkbox-1', Reading: 'hobbies-checkbox-2', Music: 'hobbies-checkbox-3' };
        await this.page.locator(`label[for="${map[hobby]}"]`).click();
    }

    async setInputFile(filePath: string) {
        const fileInput = this.page.locator('#uploadPicture');
        await fileInput.setInputFiles(filePath);
    }

    async setAddress(address: string) {
        await this.page.locator('#currentAddress').fill(address);
    }

    async selectState(state: string) {
        await this.page.locator('#state').click();
        await this.page.locator(`div[id^="react-select-3-option-"]:text-is("${state}")`).click();
    }

    async selectCity(city: string) {
        await this.page.locator('#city').click();
        await this.page.locator(`div[id^="react-select-4-option-"]:text-is("${city}")`).click();
    }

    async submit() {
        await this.page.locator('#submit').scrollIntoViewIfNeeded();
        await this.page.locator('#submit').click();
    }

    getSummaryModal() {
        return this.page.locator('.modal-content');
    }
}
