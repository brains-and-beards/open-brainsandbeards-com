import { defineConfig } from '@playwright/test'

const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL
const previewURL = 'http://127.0.0.1:4322'

export default defineConfig({
  testDir: './tests/browser',
  timeout: 90_000,
  fullyParallel: true,
  webServer: externalBaseURL
    ? undefined
    : {
        command:
          'npm run astro:build && npm run astro:preview -- --host 127.0.0.1 --port 4322 --ignore-lock',
        url: previewURL,
        timeout: 180_000
      },
  use: {
    baseURL: externalBaseURL ?? previewURL,
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'desktop', use: { channel: 'chrome', viewport: { width: 1440, height: 1000 } } },
    {
      name: 'mobile',
      use: {
        channel: 'chrome',
        viewport: { width: 390, height: 900 },
        isMobile: true,
        hasTouch: true
      }
    },
    {
      name: 'mobile-webkit',
      use: {
        browserName: 'webkit',
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true
      }
    },
    {
      name: 'mobile-firefox',
      use: { browserName: 'firefox', viewport: { width: 390, height: 844 }, hasTouch: true }
    }
  ]
})
