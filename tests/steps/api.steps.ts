import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import path from 'path';
import pixelmatch from 'pixelmatch';
import jpeg from 'jpeg-js';

const { When, Then } = createBdd(test); // Constructor

let response: any;
let responseBody: any;
let responseTime: number;

const expectedBibKeys = [
    'ISBN:0201558025',
    'LCCN:93005405',
    'ISBN:1583762027',
];

    When('the user sends a GET request for the ISBN details with bibkeys {string}', async({ request }, bibkeys: string) => {
        const startTime = Date.now();
        response = await request.get(`${process.env.API_ENDPOINT}`+ `/books?bibkeys=${bibkeys}&format=json`);
        if (response != null) {
            responseTime = Date.now() - startTime;
            responseBody = await response.json();
            console.log('Response :: ', responseBody);
            expect(responseBody).not.toBeNull(); 
        }
    });

    Then('the response time should be less than {int} milliseconds', async({}, maxTime: number) => {
        console.log('Response Time in milliseconds :: ', responseTime);
        expect(responseTime).toBeLessThan(maxTime);
    });

    Then('the response code should be 200', async({}) => {
        expect(await response.status()).toBe(200);    
    });

    Then('the response should contain {int} results', async({}, expectedCount: number) => {
        const actualCount = Object.keys(responseBody).length;
        expect(actualCount).toBe(expectedCount);
    });

    Then('the response should contain bibkeys', async({}) => {
        expectedBibKeys.forEach((key) => {
            expect(responseBody).toHaveProperty(key);
        });
    });

    Then('each result should contain correct book details based on each bibkey', async({}) => {
        const actualBibKeys = Object.keys(responseBody);
        console.log('Actual BibKeys :: ', actualBibKeys);
        expect(actualBibKeys.sort()).toEqual(expectedBibKeys.sort());

        for (const key of expectedBibKeys) {
            expect(responseBody[key]).toMatchObject({
                bib_key: key,
                info_url: expect.any(String),
                preview: expect.any(String),
                preview_url: expect.any(String),
                thumbnail_url: expect.any(String),
            });
        }   
    });

    Then('the thumbnail image for {string} {string} should match the stored image', async({ commonPage }, keyType: string, bibkey: string) => {
        const thumbnailUrl = responseBody[`${bibkey}`].thumbnail_url;

        // Download the image from the API
        const downloadImageBuffer = await commonPage.downloadImage(thumbnailUrl);

        // Read the stored image from the repo
        const expectedImagePath = path.join(
            process.cwd(),
            'images',
            `${keyType}_${bibkey}.jpg`
        );
        const expectedImage = commonPage.readImage(expectedImagePath);

        // Read the downloaded image
        const downloadedImage = jpeg.decode(downloadImageBuffer);

        // Ensure the images have the same dimensions
        expect(downloadedImage.width).toBe((await expectedImage).width);
        expect(downloadedImage.height).toBe((await expectedImage).height);

        // Compare the images
        const diff = Buffer.alloc(downloadedImage.width * downloadedImage.height * 4);
        const mismatchedPixels = pixelmatch(
            downloadedImage.data,
            (await expectedImage).data,
            diff,
            downloadedImage.width,
            downloadedImage.height,
            { threshold: 0.1 }
        );

        // Assert that there are no mismatched pixels
        expect(mismatchedPixels).toBe(0);
    });

    /********* ADDITIONAL SCENARIOS *********/

    When('the user sends a GET request for Book details with duplicate ISBNs {string}', async ({ request }, duplicateIsbns: string ) => {
        response = await request.get(`${process.env.API_ENDPOINT}`+ `/books?bibkeys=${duplicateIsbns}&format=json`);
        if (response != null) {
            responseBody = await response.json();
            console.log('Response for duplicate ISBNs :: ', responseBody);
        }
    });

    Then('the response should contain the bibkey {string}', async({}, bibkey: string) => {
        expect(responseBody).toHaveProperty(bibkey);
    });

    When('the user sends a GET request for Book details with an invalid bibkey {string}', async ({ request }, bibkey: string ) => {
        response = await request.get(`${process.env.API_ENDPOINT}`+ `/books?bibkeys=${bibkey}&format=json`);
        if (response != null) {
            responseBody = await response.json();
            console.log('Response for Invalid bibkey :: ', responseBody);
        }
    });

    Then('the response should be empty', async({}) => {
        expect(await response.json()).toEqual({});
    });
