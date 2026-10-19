import { expect, test } from '@playwright/test'

test('merged about page keeps the team, careers photo, and working links', async ({ page }) => {
  await page.goto('/about-us/', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Great products startwith a great team'
  )
  await expect(page.locator('[data-team-member]')).toHaveCount(10)
  const careers = page.locator('[data-team-member="This could be you"]')
  await expect(careers.locator('img')).toHaveAttribute('src', /open-positions/)
  await expect(careers.getByRole('link', { name: 'Explore careers' })).toHaveAttribute(
    'href',
    '/jobs/'
  )
  await expect(page.locator('a[href^="/team"]')).toHaveCount(0)
  await expect(
    page.locator('nav[aria-label="Primary navigation"] a[href="/about-us/"]')
  ).toHaveCount(2)
  await expect(page.locator('iframe[src^="https://www.youtube.com/embed/"]')).toHaveCount(2)
  await expect(page.getByRole('link', { name: 'Get in touch', exact: true })).toHaveAttribute(
    'href',
    '/hire-us/'
  )
  await expect(page.getByRole('link', { name: /Get our company deck/ })).toHaveAttribute(
    'href',
    '/portfolio/'
  )
  await expect(page.locator('.testimonial-divider')).toHaveCSS('border-top-width', '1px')
})

test('team anchors preserve the colour effect and images fit the page', async ({
  page
}, testInfo) => {
  await page.goto('/about-us/#Patryk', { waitUntil: 'domcontentloaded' })
  const portrait = page.locator('[data-team-member="Patryk"] img')
  await expect(portrait).toHaveCSS('filter', 'grayscale(0)')
  await expect(page.locator('[data-team-member="Wojciech"] img')).toHaveCSS(
    'filter',
    'grayscale(0.6)'
  )
  if (testInfo.project.name === 'desktop') {
    await page.locator('[data-team-member="Wojciech"]').hover()
    await expect(page.locator('[data-team-member="Wojciech"] img')).toHaveCSS(
      'filter',
      'grayscale(0)'
    )
  }
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width
    )
    const images = page.locator('.about-page img')
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded()
      await expect
        .poll(() =>
          image.evaluate(
            el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0
          )
        )
        .toBe(true)
    }
  }
  if (testInfo.project.name === 'desktop') {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/about-us/', { waitUntil: 'domcontentloaded' })
    await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: '/tmp/bb-about-desktop.png', fullPage: true })
    await page.setViewportSize({ width: 390, height: 900 })
    await page.screenshot({ path: '/tmp/bb-about-mobile.png', fullPage: true })
  }
})
