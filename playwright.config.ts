import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  timeout: 90_000,
  fullyParallel: true,
  use: {
    baseURL: process.env.CAROUSEL_BASE_URL ?? 'http://localhost:4321',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'desktop', use: { channel: 'chrome', viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { channel: 'chrome', viewport: { width: 390, height: 900 }, isMobile: true, hasTouch: true } },
    { name: 'mobile-webkit', use: { browserName: 'webkit', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'mobile-firefox', use: { browserName: 'firefox', viewport: { width: 390, height: 844 }, hasTouch: true } }
  ]
})
