// @ts-check
import { defineConfig, devices } from '@playwright/test';
/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 3,
  workers: 3,
  /* Run tests in files in parallel */
  timeout: 15*1000,
  expect:{
    timeout: 15*1000,
  },
  
  reporter: 'html',

  projects : [

    {
      name: 'safari',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'off',
        trace: 'on',
        //viewport: {width: 720, height: 720},
        ...devices['iphone 11'],
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'], 
      }
    },
    {
      name: 'chrome',
        use: {
          colorScheme: 'dark',
          browserName: 'chromium',
          video: 'retain-on-failure',
          trace: 'retain-on-failure',
          headless: false,
          screenshot: 'on',
           ...devices['Galaxy Tab S4 landscape'],
          /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        },
    }
  ]


});

module.exports = config
