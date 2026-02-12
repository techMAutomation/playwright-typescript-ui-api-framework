import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { COOKIES_PATH } from './tests/utils/constants';
import dotenv from 'dotenv';

const baseURL = process.env.BASE_URL;
dotenv.config();

const testDir = defineBddConfig({
  importTestFrom: './tests/fixtures/fixtures.ts',
  disableWarnings: {
    importTestFrom: true,
  },
  features: './tests/features/*.feature',
  steps: './tests/steps/*.steps.ts',
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  expect: {
    timeout: 30 * 1000,
  },

  use: {
    baseURL,
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
    trace: 'on',
  },

  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'dist/reports' }],
    ['allure-playwright'],
  ],

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: './',
      testMatch: 'tests/steps/cookies.setup.ts',
      retries: 1,
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: { 
        ...devices['Desktop Chrome'],
        storageState: COOKIES_PATH,
      },
    },
  ],
});
