// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 40*1000,
  expect:{
    timeout: 40*1000,
  },
  
  reporter: 'html',
  use: {

    //browserName: 'webkit',
    browserName: 'chromium',
    headless: false 
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

});

module.exports = config