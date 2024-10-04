export class Locators {
    //contact page
    static contactPageLink = '//a[@href="#/contact"]';
    static submitContactButton = '//a[contains(text(), "Submit")]';
    static entryRequiredPopUp = (entryType: string) => `//span[contains(text(), "${entryType} is required")]`;
    static forenameInput = '//input[@id="forename"]';
    static surnameInput = '//input[@id="surname"]';
    static emailInput = '//input[@id="email"]';
    static telephoneInput = '//input[@id="telephone"]';
    static messageInput = '//textarea[@name="message"]';
    static messageSentText= (forename: string) => `//div//strong[contains(text(), "Thanks ${forename}")]`;
    static sendingFeedbackPopUp = '//h1[contains(text(), "Sending Feedback")]';
    static invalidEntryPopUp = (entry: string) =>  `${entry}`;

    //shop page
    static startShoppingButton = '//a[contains(text(), "Start Shopping")]';
    static selectToyToBuy = (toyName: string) => `//div[h4[contains(text(), "${toyName}")]]//a[contains(text(), "Buy")]`;
    static cartLink = '//a[@href="#/cart"]';
    static pricePerUnitOfToy = (toyName: string) => `//tr[td[contains(text(), " ${toyName}")]]/td[2]`;
    static totalOfToys = (toyName: string) => `//tr[td[contains(text(), " ${toyName}")]]/td[4]`;
    static totalOfAllToys = (totalAmount: string) =>  `//strong[contains(text(), "Total: ${totalAmount}")]`;
    static checkOutButton = '//a[contains(text(), "Check Out")]';
}