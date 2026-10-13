import { expect, test } from '@playwright/test'

test('numbers count upward vertically on visibility for 1500 ms and settle once', async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const number = page.locator('[data-animated-number]').first()
  const track = number.locator('.animated-number__track')
  const value = await number.getAttribute('data-animated-number')
  const heading = number.locator('xpath=ancestor::h2')
  const label = await heading.getAttribute('aria-label')

  await expect(track).toHaveText(value!)
  expect(await track.evaluate(element => element.getAnimations().length)).toBe(0)
  await number.scrollIntoViewIfNeeded()
  await expect.poll(() => track.evaluate(element => element.getAnimations().length)).toBe(1)

  const spinning = await track.evaluate(element => {
    const animation = element.getAnimations()[0]
    animation.pause()
    animation.currentTime = 750
    const viewport = element.parentElement!.getBoundingClientRect()
    const rows = [...element.children].map(row => row.getBoundingClientRect())
    return {
      duration: animation.effect!.getTiming().duration,
      transform: getComputedStyle(element).transform,
      overflow: getComputedStyle(element.parentElement!).overflow,
      rowHeight: rows[0].height,
      viewportHeight: viewport.height,
      values: [...element.children].map(row => Number(row.textContent)),
      fullyVisible: rows.filter(row => row.top >= viewport.top && row.bottom <= viewport.bottom)
        .length
    }
  })
  expect(spinning.duration).toBe(1500)
  expect(spinning.values[0]).toBe(0)
  expect(spinning.values.at(-1)).toBe(Number(value))
  expect(
    spinning.values.every((value, index, values) => index === 0 || value > values[index - 1])
  ).toBe(true)
  expect(spinning.transform).not.toBe('none')
  expect(spinning.overflow).toBe('hidden')
  expect(spinning.rowHeight).toBe(spinning.viewportHeight)
  expect(spinning.fullyVisible).toBeLessThanOrEqual(1)
  await expect(heading).toHaveAccessibleName(label!)

  await track.evaluate(element => element.getAnimations()[0].play())
  await expect(track).toHaveText(value!)
  expect(await track.evaluate(element => element.getAnimations().length)).toBe(0)
  await page.evaluate(() => window.scrollTo(0, 0))
  await expect(number).not.toBeInViewport()
  await number.scrollIntoViewIfNeeded()
  await page.waitForTimeout(100)
  await expect(track).toHaveText(value!)
  expect(await track.evaluate(element => element.getAnimations().length)).toBe(0)
})

test('reduced motion keeps the correct values without spinning', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const path of ['/', '/projects/rakuten/']) {
    await page.goto(path)
    for (const number of await page.locator('[data-animated-number]').all()) {
      await number.scrollIntoViewIfNeeded()
      const track = number.locator('.animated-number__track')
      await expect(track).toHaveText((await number.getAttribute('data-animated-number'))!)
      expect(await track.evaluate(element => element.getAnimations().length)).toBe(0)
    }
  }
})

test('enabling reduced motion during a spin immediately restores the final value', async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const number = page.locator('[data-animated-number]').first()
  const track = number.locator('.animated-number__track')
  await number.scrollIntoViewIfNeeded()
  await expect.poll(() => track.evaluate(element => element.getAnimations().length)).toBe(1)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(track).toHaveText((await number.getAttribute('data-animated-number'))!)
  expect(await track.evaluate(element => element.getAnimations().length)).toBe(0)
})
