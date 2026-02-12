import { Page, Locator, expect } from "playwright/test";
import jpeg  from "jpeg-js";
import fs from 'fs';

export class CommonPage {
    page: Page;
    request: any;

    /**
     * Constructor
     * @param page
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Enters a value in the combo box field based on the label provided.
     * @param label 
     * @param value 
     */
    async enterValueInComboBox(label: string, value: string) {
        let comboboxElement: Locator;
        if (label !== "") {
            comboboxElement = this.page.getByRole('combobox', { name: label }).first();
        } else {
            comboboxElement = this.page.getByRole('combobox');
        }
        await expect(comboboxElement).toBeVisible();
        await comboboxElement.fill(value);
    }

    /**
     * Selects an item from the listbox dropdown based on the value provided.
     * @param value 
     */
    async chooseListboxItem(value: string) {
        let listboxElement: Locator;
        listboxElement = this.page.getByRole('listbox');
        if (value !== "") {
            await expect(listboxElement).toBeVisible();
            // Choose 'Option' from the dropdown list
            const listboxOption = this.page.locator('span[role="option"]:visible', {  hasText: new RegExp(value, 'i')}).first();
            await expect(listboxOption).toBeVisible();
            await listboxOption.scrollIntoViewIfNeeded();
            // Click on the option to select
            await listboxOption.click(); 
            // Verify the selected option matches the expected value
            await expect(this.page.getByText(value)).toContainText(value);
        } else {
            throw new Error('Value for listbox item is empty');
        }
    }
    
    /**
     * Clicks on a button based on the button name provided.
     * @param buttonName
     */
    async clickButton(buttonName: string) {
        let buttonElement: Locator;
        if (buttonName !== "") {
            buttonElement = this.page.getByRole('button', { name: buttonName }).first();
            await buttonElement.scrollIntoViewIfNeeded();
            await expect(buttonElement).toBeVisible();
            await buttonElement.click();
        } else {
            throw new Error('Button name is empty');
        }
    }

    /**
     * Clicks on a button based on the button name provided.
     * @param buttonName
     * @return button text
     */
    async getButtonText(buttonName: string) {
        let element: Locator;
        if (buttonName !== "") {
            element = this.page.getByRole('button').filter({ hasText: buttonName }).first();
            await expect(element).toBeVisible();
            const buttonText = await element.textContent();
            return buttonText;
        } else {
            throw new Error('Button name is empty');
        }
    }

    /**
     * Verify access information
     * @param linkName 
     */
    async verifyAccessInformation(linkName: string) {
        // Verify access elements - link/aria-label/hover
        const linkElement = this.page.getByRole('link', { name: linkName});
        await expect(linkElement).toBeVisible();
        await expect(linkElement).toHaveAttribute('aria-label', linkName);
        await linkElement.hover();
        await expect(linkElement).toHaveCSS('cursor', 'pointer');
    }

    /**
     * Downloads the images from the URL 
     * @param imageUrl 
     * @returns 
     */
    async downloadImage(imageUrl: string): Promise<Buffer> {
        const response = await fetch(imageUrl);
        return Buffer.from(await response.arrayBuffer());
    }

    /**
     * To read an image file and return its JPG data
     * @param imagePath 
     * @returns 
     */
    async readImage(imagePath: string): Promise<jpeg.BufferRet>  {
        const imageBuffer = fs.readFileSync(imagePath);
        return jpeg.decode(imageBuffer);
    }
}
