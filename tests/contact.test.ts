import { test } from '@playwright/test';
import { Utils } from '../src/Utils';

test('Validate error messages on Contact page', async ({ page }) => {
    const utils = new Utils(page);

    await utils.goToSite();
    await utils.goToContactPage();
    await utils.submitContactFormAndValidateEntries("Firstname", ["Forename", "Email", "Message"]);
    await utils.fillOutContactForm("Firstname", "emailtest123@gmail.com", "Message test 123 !@#$%");
    await utils.submitContactFormAndValidateEntries("Firstname");
});

for(let i = 1; i <= 5; i++) {
    test(`Validate successful submission of message, attempt ${i}`, async ({page}) => {
        const utils = new Utils(page);

        await utils.goToSite();
        await utils.goToContactPage();
        await utils.fillOutContactForm("Firstname", "emailtest123@gmail.com", "Message test 123 !@#$%");
        await utils.submitContactFormAndValidateEntries("Firstname");
    });
}