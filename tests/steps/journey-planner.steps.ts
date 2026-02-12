import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';
import { expect } from 'playwright/test';
import fs from 'fs';
import { COOKIES_PATH } from '../utils/constants';

const { Given, When, Then } = createBdd(test); // Constructor

Given('the user is on the Plan A Journey page', async ({ page }) => {
    // Add cookies to the browser context
    const data = fs.readFileSync(COOKIES_PATH, 'utf-8');
    const cookiesData = JSON.parse(data);
    await page.context().addCookies(cookiesData.cookies);

    // Navigates to the "Plan A Journey" page
    await page.goto('/plan-a-journey/');
    const currentURL = page.url();
    expect(currentURL).toContain('/plan-a-journey/');
});

Then('user should see the Plan A Journey page title as {string}', async ({ page }, title: string) => {
    const pageTitle = await page.title();
    expect(pageTitle).toContain(title);
});

Then ('user should see {string} location field error message as {string}', async ({ page }, location: string, expectedMessage: string) => {
    if (location === 'From' || location === 'To') {
        const element = page.getByText(expectedMessage);
        await expect(element).toBeVisible();
        const actualMessage = await element.textContent();
        expect(actualMessage).toBe(expectedMessage);
    }
});

Then('user should see no matching journey error message as {string}', async ({ page }, expectedMessage: string) => {
    const element = page.getByText(expectedMessage);
    await expect(element).toBeVisible();
    const actualMessage = await element.textContent();
    expect(actualMessage).toBe(expectedMessage);
});

Then('user enters invalid From location as {string}', async ({ commonPage }, fromLocationValue: string) => {
    await commonPage.enterValueInComboBox('From location', fromLocationValue); 
});

Then('user enters the From location as {string}', async ({ commonPage }, fromLocationValue: string) => {
    await commonPage.enterValueInComboBox('From location', fromLocationValue); 
    await commonPage.chooseListboxItem(fromLocationValue);
});
      
Then('user enters invalid To location as {string}', async ({ commonPage }, toLocationValue: string) => {
    await commonPage.enterValueInComboBox('To location', toLocationValue); 
});

Then('user enters the To location as {string}', async ({ commonPage }, toLocationValue: string) => {
    await commonPage.enterValueInComboBox('To location', toLocationValue); 
    await commonPage.chooseListboxItem(toLocationValue);
});

Then('user should not see any auto suggestions dropdown for the {string} location field', async ({ page }, locationField: string) => {
    if (locationField === 'From' || locationField === 'To') {
        const listboxElement = page.getByRole('listbox');
        await expect(listboxElement).not.toBeVisible();
    }
});

When('user clicks on the {string} button', async ({ commonPage }, buttonName: string) => {
    await commonPage.clickButton(buttonName);
});

Then('user should see the Walking and Cycling time results', async ({ page }) => {
    // Veriffy page header for walking and cycliing results
    const header = page.getByRole('heading', { name: 'Walking and cycling'}).first();
    await expect(header).toBeVisible();

    const cyclingTime = page.getByRole('link', { name: "Cycling Route: Moderate" });
    const walkingTime = page.getByRole('link', { name: "Walking Walking speed" });
    
    // Verify cycling time and distance
    await expect(cyclingTime).toBeVisible();
    const cyclingTimeText = await cyclingTime.textContent();
    console.log('Cycling Time Text :: ', cyclingTimeText);
    expect(cyclingTimeText).toContain("CyclingRoute: Moderate");
    expect(cyclingTimeText).toContain("Distance: 0.4km");
    expect(cyclingTimeText).toContain("1mins");

    // Verify walking time and distance
    await expect(walkingTime).toBeVisible();
    const walkingTimeText = await walkingTime.textContent();
    console.log('Walking Time Text :: ', walkingTimeText);
    expect(walkingTimeText).toContain("Walking speed: Moderate");
    expect(walkingTimeText).toContain("Distance: 0.4km");
    expect(walkingTimeText).toContain("6mins");
});

Then('user should see the Public Transport tab under the Edit Preferences page', async ({ page }) => {
    const publicTransportTab = page.getByRole('tab', { name: 'Public transport' });
    await expect(publicTransportTab).toBeVisible();
    await publicTransportTab.click();
});

When('user selects the {string} option', async ({ page }, option: string) => {
    const radioElement = page.getByRole('radio', { name: option }).first();
    await radioElement.scrollIntoViewIfNeeded();
    await expect(radioElement).toBeVisible();
    await radioElement.click({force: true});
});

Then('user should see View Details button in the updated journey planner results page', async({ page }) => {
    await page.waitForSelector('button:has-text("View details")', { state: 'visible' });
});

Then('user should see the updated journey planner results time with the least walking routes', async ({ page, commonPage }) => {
    const journeyDetailsWidgetOption1 = await page.textContent('.journey-details');
    expect(journeyDetailsWidgetOption1).not.toBe(null);
    expect(journeyDetailsWidgetOption1).toContain("Transfer to Leicester Square");
    expect(journeyDetailsWidgetOption1).toContain("Piccadilly line to Covent Garden");
    expect(journeyDetailsWidgetOption1).toContain("Walk to Covent Garden Station");
    expect(journeyDetailsWidgetOption1).toContain("Covent Garden Station");
    await expect(page.locator('.journey-time', { hasText: '11mins' }).first()).toBeVisible();

    const journeyDetailsWidgetOption2 = await commonPage.getButtonText("Option 2");
    expect(journeyDetailsWidgetOption2).toContain("11mins");
});

Then('user clicks on the View details button in the updated journey planner results page', async ({ page }) => {
    // Wait until results are rendered
    await expect(page.locator('.journey-details').first()).toBeVisible();
    // Click on the View details button for Option 1
    const viewDetailsButton = page.getByLabel('Option 1: walking, Piccadilly').getByText('View details');
    await expect(viewDetailsButton).toBeVisible();
    await viewDetailsButton.click();
});

Then('user should see the access information for Covent Garden Underground station in the updated journey planner results page', async ({ page, commonPage }) => {
    const accessInfoElement = await page.textContent('.journey-details');
    expect(accessInfoElement).not.toBe(null);
    expect(accessInfoElement).toContain("Leicester Square Underground Station");
    expect(accessInfoElement).toContain("Covent Garden Underground Station");

    // Verify Up stairs element - link/aria-label/hover
    commonPage.verifyAccessInformation('Up stairs');

    // Verify Up Lift element - link/aria-label/hover
    commonPage.verifyAccessInformation('Up lift');

    // Verify Level walkway element - link/aria-label/hover
    commonPage.verifyAccessInformation('Level walkway');
});
