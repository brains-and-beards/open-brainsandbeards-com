import { expect, test } from '@playwright/test'

test('stories archive expands with the keyboard and fits the viewport', async ({
  page
}, testInfo) => {
  await page.goto('/stories/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Small stories. Useful thoughts.'
  )
  await expect(page.locator('.menu-links li').last()).toHaveText('Stories')
  await expect(page.locator('.stories-entry')).toHaveCount(8)

  const latest = page.locator('.stories-entry').first()
  await latest.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(latest).toHaveAttribute('open', '')
  await expect(latest.locator('.stories-entry-body')).toContainText('Good software takes work.')
  await page.keyboard.press('Enter')
  await expect(latest).not.toHaveAttribute('open', '')

  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => window.innerWidth)
  )
  const chevrons = await page.locator('.stories-read-more-links img').evaluateAll(images =>
    images.map(image => {
      const img = image as HTMLImageElement
      const rect = img.getBoundingClientRect()
      return {
        loaded: img.complete && img.naturalWidth > 0,
        width: rect.width,
        height: rect.height
      }
    })
  )
  expect(chevrons).toEqual([
    { loaded: true, width: 5, height: 10 },
    { loaded: true, width: 5, height: 10 }
  ])
  await page.screenshot({ path: `/tmp/bb-stories-${testInfo.project.name}.png`, fullPage: true })

  const feed = await page.request.get('/stories/feed.xml')
  expect(feed.ok()).toBeTruthy()
  expect(await feed.text()).toContain('The feature we decided not to build')
})
