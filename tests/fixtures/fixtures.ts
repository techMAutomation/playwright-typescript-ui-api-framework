// Fixtures are used to manage the PageObjects
import { test as base } from 'playwright-bdd';
import { CommonPage } from '../pages/common.page';

type Fixtures = {
  commonPage: CommonPage;
};

export const test = base.extend<Fixtures>({
    commonPage: async ({ page }, use) => {
        await use(new CommonPage(page));
    },
});
