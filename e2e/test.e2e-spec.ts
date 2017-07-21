import { browser, element, by, ElementFinder } from 'protractor';

describe('Example E2E Test', () => {

    beforeEach(() => {
        browser.get('');
    });

    xit('the home tab is displayed by default', () => {

        expect(element(by.css('.home-page-header .toolbar-title')) // Grab the title of the selected tab
            .getAttribute('innerHTML')) // Get the text content
            .toContain('Home'); // Check if it contains the text "Home"

    });
});