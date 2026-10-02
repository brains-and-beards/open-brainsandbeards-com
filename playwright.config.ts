import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  timeout: 90_000,
  fullyParallel: true,
  use: {
    baseURL: process.env.CAROUSEL_BASE_URL ?? 'http://localhost:4321',
    channel: 'chrome',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 900 }, isMobile: true, hasTouch: true } }
  ]
})
