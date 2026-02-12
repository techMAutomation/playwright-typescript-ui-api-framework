import { test as setup} from '@playwright/test';
import { COOKIES_PATH } from '../utils/constants';

setup.describe('Cookies Storage @setup', () => {
    setup('Accept Cookies', async({ page }) => {
        await setup.step('Accept cookies once', async() => {
            
            // navigates to the url
            await page.goto('/');

            // click on "accept all cookies" button
            const acceptButton = page.getByRole('button', { name: /accept all cookies/i });
            if (await acceptButton.isVisible()) {
                await acceptButton.click();
            }
        });

        await setup.step('Store Cookies and local storage snapshot of current context', async() => {
            await page.context().storageState({ path: COOKIES_PATH });
        });
    });
});
