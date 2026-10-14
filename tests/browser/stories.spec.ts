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
  await expect(page.locator('.stories-entry')).toHaveCount(10)

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

test('stories pagination opens the first older story and supports direct visits', async ({ page }) => {
  await page.goto('/stories/')
  await expect(page.locator('.stories-latest')).toBeVisible()
  await expect(page.getByRole('button', { name: '← Previous' })).toBeDisabled()
  const firstPageIds = await page.locator('.stories-entry').evaluateAll(entries =>
    entries.map(entry => entry.id)
  )

  await page.getByRole('link', { name: 'Next →' }).click()
  await expect(page).toHaveURL(/\/stories\/2\/?$/)
  await expect(page.locator('.stories-latest')).toHaveCount(0)
  await expect(page.locator('.stories-entry')).toHaveCount(7)
  await expect(page.locator('.stories-entry[open]')).toHaveCount(1)
  await expect(page.locator('.stories-entry').first()).toHaveAttribute('open', '')
  await expect(page.locator('[aria-current="page"]')).toHaveText('2')
  await expect(page.getByRole('button', { name: 'Next →' })).toBeDisabled()
  const olderIds = await page.locator('.stories-entry').evaluateAll(entries =>
    entries.map(entry => entry.id)
  )
  expect(olderIds.every(id => !firstPageIds.includes(id))).toBeTruthy()
  expect(new Set([...firstPageIds, ...olderIds]).size).toBe(17)

  await page.reload()
  await expect(page.locator('.stories-entry').first()).toHaveAttribute('open', '')
  await page.locator('.stories-entry').first().locator('summary').click()
  await expect(page.locator('.stories-entry[open]')).toHaveCount(0)

  await page.getByRole('link', { name: '← Previous' }).click()
  await expect(page).toHaveURL(/\/stories\/$/)
  await expect(page.locator('.stories-latest')).toBeVisible()
  await expect(page.locator('.stories-entry')).toHaveCount(10)
  await expect(page.locator('.stories-entry[open]')).toHaveCount(0)
  await page.getByRole('link', { name: 'Page 2', exact: true }).click()
  await expect(page.locator('.stories-entry').first()).toHaveAttribute('open', '')
})

test('story height animates in both directions and handles interrupted toggles', async ({ page }) => {
  await page.goto('/stories/')
  const entry = page.locator('.stories-entry').first()
  // Wait for the React component to hydrate before interacting.
  await page.locator('astro-island[component-export="default"]').first().evaluate(async island => {
    if (island.hasAttribute('ssr')) {
      await new Promise(resolve => island.addEventListener('astro:hydrate', resolve, { once: true }))
    }
  })
  const closedHeight = await entry.evaluate(element => element.getBoundingClientRect().height)
  await entry.locator('summary').click()
  const openingHeight = await entry.evaluate(element => {
    const animation = element.getAnimations()[0]
    if (!animation) throw new Error('Expected an expand animation')
    animation.pause()
    animation.currentTime = 150
    return element.getBoundingClientRect().height
  })
  expect(openingHeight).toBeGreaterThan(closedHeight)

  // Reverse the animation while the story is still partly expanded.
  await entry.locator('summary').click()
  const closingHeight = await entry.evaluate(element => {
    const animation = element.getAnimations()[0]
    if (!animation) throw new Error('Expected a collapse animation')
    animation.pause()
    animation.currentTime = 150
    return element.getBoundingClientRect().height
  })
  expect(closingHeight).toBeLessThan(openingHeight)
  expect(closingHeight).toBeGreaterThan(closedHeight)
  await entry.evaluate(element => element.getAnimations()[0].finish())
  await expect(entry).not.toHaveAttribute('open', '')
  expect(await entry.evaluate(element => element.getBoundingClientRect().height)).toBeCloseTo(closedHeight)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await entry.locator('summary').click()
  await expect(entry).toHaveAttribute('open', '')
  expect(await entry.evaluate(element => element.getAnimations().length)).toBe(0)
  await entry.locator('summary').click()
  await expect(entry).not.toHaveAttribute('open', '')
})
