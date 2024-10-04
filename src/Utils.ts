import { expect, Page } from '@playwright/test';
import { Locators } from './Locators';

interface Product {
    name: string;
    price: number;
    amount: number;
}

export class Utils {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToSite() {
        await this.page.goto("http://jupiter.cloud.planittesting.com");
        await expect(this.page.locator(Locators.startShoppingButton)).toBeVisible();
    }

    async goToContactPage() {
        await this.page.locator(Locators.contactPageLink).click();
        await expect(this.page.locator(Locators.forenameInput)).toBeVisible();
    }

    async fillOutContactForm(forename: string, email: string, message: string, surname?: string, telephone?: string) {
        await expect(this.page.locator(Locators.forenameInput)).toBeVisible();
        await this.page.locator(Locators.forenameInput).click();
        await this.page.locator(Locators.forenameInput).fill(forename);
        await this.page.locator(Locators.emailInput).click();
        await this.page.locator(Locators.emailInput).fill(email);
        await this.page.locator(Locators.messageInput).click();
        await this.page.locator(Locators.messageInput).fill(message);
        if(surname){
            await this.page.locator(Locators.surnameInput).click();
            await this.page.locator(Locators.surnameInput).fill(surname);
        }
        if(telephone){
            await this.page.locator(Locators.telephoneInput).click();
            await this.page.locator(Locators.telephoneInput).fill(telephone);
        }
        await expect(this.page.locator(Locators.entryRequiredPopUp("Forename"))).not.toBeVisible();
        await expect(this.page.locator(Locators.entryRequiredPopUp("Email"))).not.toBeVisible();
        await expect(this.page.locator(Locators.entryRequiredPopUp("Message"))).not.toBeVisible();
    }

    async submitContactFormAndValidateEntries(forename: string, blankEntries?: string[], invalidEntries?: string[]) {
        await this.page.locator(Locators.submitContactButton).click();
        if(blankEntries){
            for(const entry of blankEntries){
                await expect(this.page.locator(Locators.entryRequiredPopUp(entry.replace(/^\w/, (c) => c.toUpperCase())))).toBeVisible();
            }
        }
        if(invalidEntries){
            for(const entry of invalidEntries){
                await expect(this.page.locator(Locators.invalidEntryPopUp(entry))).toBeVisible();
            }
        }
        if(!invalidEntries && !blankEntries){
            await expect(this.page.locator(Locators.sendingFeedbackPopUp)).toBeVisible();
            await expect(this.page.locator(Locators.sendingFeedbackPopUp)).not.toBeVisible({timeout: 30000});
            await expect(this.page.locator(Locators.messageSentText(forename))).toBeVisible();
        }
    }

    async startShopping() {
        await this.page.locator(Locators.startShoppingButton).click();
    }

    async addProductToCart(productName: string, amount: number) {
        for(let i = 0; i < amount; i++){
            await this.page.locator(Locators.selectToyToBuy(productName)).click();
        }
    }

    async goToCart() {
        await this.page.locator(Locators.cartLink).click();
        await expect(this.page.locator(Locators.checkOutButton)).toBeVisible();
    }

    async validateProductTotals(products: Product[]) {
        let totalPrice = 0
        for (const product of products) {
            const priceText = await this.page.locator(Locators.pricePerUnitOfToy(product.name)).textContent();
            const singleItemPrice = parseFloat(priceText?.substring(1) || "0");
            const priceText2 = await this.page.locator(Locators.totalOfToys(product.name)).textContent();
            const totalItemCost = parseFloat(priceText2?.substring(1) || "0");
            console.log("1: " + priceText);
            console.log("2: " + priceText2);
            totalPrice = totalPrice + totalItemCost;
            expect(singleItemPrice).toEqual(product.price);
            expect(totalItemCost).toEqual(parseFloat((product.price*product.amount).toFixed(2)));
        }
        console.log("Total: " + totalPrice);
        await expect(this.page.locator(Locators.totalOfAllToys(totalPrice.toString()))).toBeVisible();
    }
}