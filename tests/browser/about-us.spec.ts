import { expect, test } from '@playwright/test'
import { readdirSync } from 'node:fs'

test('careers portrait flips around its vertical axis and respects reduced motion', async ({
  page
}) => {
  await page.goto('/about-us/', { waitUntil: 'domcontentloaded' })
  const careers = page.locator('[data-team-member]').last()
  await expect(careers.locator('astro-island:not([ssr])')).toHaveCount(1)
  const button = careers.getByRole('button', { name: 'Show another random portrait' })
  const portrait = button.locator('img')
  const previous = await portrait.getAttribute('src')
  await button.click()
  await expect(button).toHaveAttribute('aria-busy', 'true')
  await expect(portrait).toHaveAttribute('data-flip', 'out')
  await expect(portrait).toHaveAttribute('src', previous!)
  await expect(portrait).not.toHaveAttribute('src', previous!)
  await expect(button).toHaveAttribute('aria-busy', 'false')
  await expect(portrait).toHaveCSS('transform', 'none')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  const beforeReducedMotion = await portrait.getAttribute('src')
  await button.click()
  await expect(portrait).not.toHaveAttribute('src', beforeReducedMotion!)
  await expect(portrait).toHaveAttribute('data-flip', 'idle')
  await expect(button).toHaveAttribute('aria-busy', 'false')
})

test('careers portrait restores grayscale after clicking and moving the pointer away', async ({
  page
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Hover filtering applies to desktop pointers')
  await page.goto('/about-us/', { waitUntil: 'domcontentloaded' })
  const careers = page.locator('[data-team-member]').last()
  await expect(careers.locator('astro-island:not([ssr])')).toHaveCount(1)
  const button = careers.getByRole('button', { name: 'Show another random portrait' })
  const portrait = button.locator('img')

  await button.scrollIntoViewIfNeeded()
  await page.mouse.move(0, 0)
  await expect(portrait).toHaveCSS('filter', 'grayscale(0.6)')
  await button.hover()
  await expect(portrait).toHaveCSS('filter', 'grayscale(0)')
  await button.click()
  await page.mouse.move(0, 0)
  await expect(portrait).toHaveCSS('filter', 'grayscale(0.6)')

  await button.press('Tab')
  await page.keyboard.press('Shift+Tab')
  await expect(button).toBeFocused()
  await expect(portrait).toHaveCSS('filter', 'grayscale(0)')
})

test('careers portrait changes to a different image on click and keyboard activation', async ({
  page
}) => {
  await page.goto('/about-us/', { waitUntil: 'domcontentloaded' })
  const careers = page.locator('[data-team-member="This could be you"]')
  await expect(careers.locator('astro-island:not([ssr])')).toHaveCount(1)
  const button = careers.getByRole('button', { name: 'Show another random portrait' })
  const portrait = button.locator('img')

  for (let click = 0; click < 10; click++) {
    const previous = await portrait.getAttribute('src')
    await button.click()
    await expect(portrait).not.toHaveAttribute('src', previous!)
    await expect(button).toHaveAttribute('aria-busy', 'false')
  }

  for (const key of ['Enter', 'Space']) {
    const previous = await portrait.getAttribute('src')
    await button.focus()
    await button.press(key)
    await expect(portrait).not.toHaveAttribute('src', previous!)
    await expect(button).toHaveAttribute('aria-busy', 'false')
  }
})

test('careers portrait is selected in the browser on each page load', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => Number(sessionStorage.getItem('portrait-random') ?? '0')
  })
  await page.goto('/about-us/', { waitUntil: 'domcontentloaded' })
  const careers = page.locator('[data-team-member="This could be you"]')
  const portrait = careers.locator('img.person-portrait')
  const sources = new Set<string>()

  const imageCount = readdirSync('astro/assets/team/you').filter(name =>
    /\.(jpg|jpeg|png|webp|avif)$/.test(name)
  ).length

  for (let index = 0; index < imageCount; index++) {
    const random = (index + 0.5) / imageCount
    await page.evaluate(value => sessionStorage.setItem('portrait-random', String(value)), random)
    await page.reload({ waitUntil: 'domcontentloaded' })
    await expect(careers.locator('astro-island:not([ssr])')).toHaveCount(1)
    await portrait.scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        portrait.evaluate(
          image =>
            (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0
        )
      )
      .toBe(true)
    sources.add((await portrait.getAttribute('src'))!)
  }

  expect(sources.size).toBe(imageCount)
})

test('merged about page keeps the team, careers photo, and working links', async ({ page }) => {
  await page.goto('/about-us/', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Great products startwith a great team'
  )
  await expect(page.locator('[data-team-member]')).toHaveCount(10)
  const careers = page.locator('[data-team-member]').last()
  await expect(careers).toHaveAttribute('data-team-member', 'This could be you')
  await expect(careers.locator('img.person-portrait')).toHaveAttribute('alt', 'This could be you')
  await expect(careers.locator('p').first()).toHaveText(
    'Ready to take the next step in your career? Drop us a message to see if you could join our team.'
  )
  await expect(page.locator('[data-team-member="Dávid"] .careers')).toHaveCount(0)
  await expect(careers.locator('.read-more-image')).toHaveCSS('width', '5px')
  await expect(careers.locator('.read-more-image')).toHaveCSS('height', '10px')
  await expect(page.locator('.menu-links a[aria-current="page"]')).toHaveCSS(
    'text-decoration-line',
    'none'
  )
  await expect(careers.getByRole('link', { name: /Explore careers/i })).toHaveAttribute(
    'href',
    'https://brainsandbeards.com/jobs'
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
  await expect(page.getByRole('link', { name: /Get our company deck/i })).toHaveAttribute(
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
    testInfo.project.name === 'desktop' ? 'grayscale(0.6)' : 'none'
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
