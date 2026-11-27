import { expect, test } from '@playwright/test'

test('autoplay comparisons play in view and pause outside the viewport', async ({ page }) => {
  // Keep the newsletter's timed popup from covering the video controls.
  await page.route('https://brains-beards.kit.com/**/index.js', route => route.abort())
  await page.goto('/blog/2026-ink-animation')

  const comparison = page.locator('.video-comparison:not(.single-video)').first()
  const videos = comparison.locator('video')
  await expect(comparison.locator('astro-island').first()).not.toHaveAttribute('ssr')
  await expect(videos).toHaveCount(2)
  expect(await videos.evaluateAll(elements => elements.every(video => video.paused))).toBe(true)
  expect(
    await videos.evaluateAll(elements => elements.every(video => video.currentTime === 0))
  ).toBe(true)
  expect(await videos.evaluateAll(elements => elements.every(video => !video.autoplay))).toBe(true)

  await comparison.scrollIntoViewIfNeeded()
  await expect
    .poll(() =>
      videos.evaluateAll(elements =>
        elements.every(video => !video.paused && video.currentTime > 0)
      )
    )
    .toBe(true)

  await page.evaluate(() => window.scrollTo(0, 0))
  await expect
    .poll(() => videos.evaluateAll(elements => elements.every(video => video.paused)))
    .toBe(true)

  await comparison.scrollIntoViewIfNeeded()
  await expect
    .poll(() => videos.evaluateAll(elements => elements.every(video => !video.paused)))
    .toBe(true)

  // A manual pause remains in effect while the video stays visible.
  await videos.first().evaluate(video => video.pause())
  expect(await videos.first().evaluate(video => video.paused)).toBe(true)
  await expect(videos.first()).toHaveAttribute('controls', '')
  await expect(page.locator('.video-comparison').last().locator('video')).not.toHaveAttribute(
    'loop'
  )
})
