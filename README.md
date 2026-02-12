# playwright-typescript-ui-api-framework

Welcome to the Playwright Typescript automation framework for End-to-End (E2E) and API testing. 

-----

## Features

- UI tests for Web application
- API tests for Open Library API using the Playwright APIRequestContext
- Tests tagged for regression, smoke, ui and api
- Generate detailed Allure reports

----

## Project Structure

- **images/** – Contains image files used in API test scenario, such as thumbnail images comparision.
- **testReport-screeshots/** - Contains screenshots taken during local test execution for reference and verification purposes.
- **tests/features/** – Contains Cucumber feature files for UI and API tests.
- **tests/fixtures/** – Used to manage Page Objects and provide a centralized way to initialize and share them across tests.
- **tests/pages/** – Contains Page Object Model (POM) classes for UI automation.
- **tests/steps/** – Contains step definition files that implement Cucumber steps.
- **tests/utils/** – Contains helper functions for reusable logic.
- **package.json** – Contains npm scripts for running tests.
- **playwright.config.ts** – Contains global configuration for Playwright tests.
- **allure-results && allure-report/** – Stores test results for Allure reporting.

-----

## Test Tags

**UI / E2E Tests:**
- **@ui** – UI tests
- **@api** – API tests
- **@regression** – Both UI and API tests
- **@smoke** – Smoke tests

**Non-automated tests:**
It contains more additional **functional tests and non-functional tests** but they don't run in test suite.

- Feature file `additionalTests.feature` tagged with `@outOfScope`
- `additionalTests.steps.ts` file contains placeholder implementations for undefined step definitions.

-----

## Important NOTE about API Tests

The API tests are implemented within the same Playwright framework as the UI tests.
Because of this design:

- Before executing each API test, the framework automatically runs a test __UI cookies setup__: `tests/steps/cookies.setup.ts`
- This ensures that any required cookies or session data are initialized.
- It is part of the shared setup workflow between UI and API tests.
- It does not affect API test results.
- The API test executes as expected; the UI setup is only a prerequisite for proper session management.

**In Short**, the cookie setup is a **UI framework requirement**, not part of the API tests.

## Test Report images

- I have attached __test report screenshots__ in the `testreport-screenshots/` folder.
- These screenshots were **generated locally** when the tests were executed on my machine.

## VS Code - Navigating from Feature file Steps to Step Definitions

1. Open **VS Code**
2. Go to ```Settings -> Settings -> click on "workspace" tab -> Search for "Code Actions On Save" -> Click on "Edit in settings.json"```
3. Add the below code:
```bash
  "cucumber.features": ["tests/features/**.feature"],
  "cucumber.glue": ["tests/steps/**.steps.ts"],
```

## Getting Started

1. Navigate to the [GitHub](https://github.com/techMAutomation) Repository
2. Open the terminal
3. __Clone__ the repository
    ```bash
    git clone https://github.com/techMAutomation/playwright-typescript-ui-api-framework.git
    ```
4. Open the Project in **Visual Studo Code (VS Code)**
5. Open a Terminal in VS Code
6. Install dependencies:
  ```bash
  npm install 
  ```

## Run Tests

**Run All tests:**
  Use the following command to run both UI and API tests tagged with @regression:

  ```bash
  npm run all:tests 
  ```

## Allure Report

**Generate Allure Report:**
  - Allure Report requires Java. Please ensure Java is installed. 
  - Use the following command to generate the Allure Report:
  ```bash
  npm run generate:allure:report
  ```
  
**Run specific E2E tests using Custom tags:**

  Use the following command to run all UI tests in headed mode:
  ```bash
  npm run e2e:tests:headed
  ```  

  Use the following command to run all UI tests:
  ```bash
  npm run e2e:tests
  ```  
  
## Run API Tests

**Run all API tests:**
  Use the following command to run all API tests:
  ```bash
  npm run api:tests 
  ```

### Disclaimer - Use of AI

During development, I used **ChatGPT** as a supporting tool to help generate and refine parts of the **Thumbnail Image comparision API** test. 
The implementation and problem-solving approach and final code decisions reflect my own thinking and understanding.
