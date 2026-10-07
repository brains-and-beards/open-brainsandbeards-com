import { expect, test, type Page } from '@playwright/test'

const trackSelector = '.astro-carousel__track'
const dotsSelector = '.astro-carousel__dot'

async function settled(page: Page, expected: number) {
  await expect.poll(() => page.locator(trackSelector).evaluate(track => {
    const active = [...document.querySelectorAll('.astro-carousel__dot')]
      .findIndex(dot => dot.getAttribute('aria-current') === 'true')
    const position = track.scrollLeft / track.clientWidth
    return Math.abs(position - Math.round(position)) < 0.001 ? active : -1
  }), { timeout: 5000, intervals: [16, 32, 50] }).toBe(expected)
}

async function currentSlide(page: Page) {
  const index = await page.locator(trackSelector).evaluate(track =>
    Math.round(track.scrollLeft / track.clientWidth))
  return page.locator('.astro-carousel__slide').nth(index)
}

async function clickArrow(page: Page, direction: number) {
  const slide = await currentSlide(page)
  const button = slide.locator(direction === 1
    ? '.astro-carousel__chevron:not(.astro-carousel__chevron--previous)'
    : '.astro-carousel__chevron--previous')
  await button.evaluate(element => element.scrollIntoView({ block: 'center', inline: 'nearest' }))
  await button.click()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.locator('.astro-carousel').scrollIntoViewIfNeeded()
  const count = await page.locator(dotsSelector).count()
  await expect(page.locator('.astro-carousel__slide')).toHaveCount(count + 2)
  await settled(page, 0)
})

test('arrows keep cycling through multiple complete laps in both directions', async ({ page }) => {
  const count = await page.locator(dotsSelector).count()
  let index = 0
  for (const direction of [1, -1]) {
    // Start the next transition as soon as the previous one finishes, before
    // the delayed clone reset. This reproduced the original dead end.
    for (let step = 0; step < count * 3 + 1; step++) {
      await clickArrow(page, direction)
      index = (index + direction + count) % count
      await settled(page, index)
    }
  }
})

test('keyboard navigation loops and desktop pagination selects the right slide', async ({ page }, testInfo) => {
  const count = await page.locator(dotsSelector).count()
  await page.locator(trackSelector).focus()
  for (let step = 1; step <= count * 2; step++) {
    await page.keyboard.press('ArrowLeft')
    await settled(page, (count - step % count) % count)
  }
  if (testInfo.project.name === 'desktop') {
    for (const index of [count - 1, 0, 2]) {
      const dot = page.locator(dotsSelector).nth(index)
      await dot.evaluate(element => element.scrollIntoView({ block: 'center' }))
      await dot.click()
      await settled(page, index)
    }
  } else {
    await expect(page.locator('.astro-carousel__pagination')).toBeHidden()
  }
})

test('touch swipes and mouse drags continue past both loop boundaries', async ({ page }, testInfo) => {
  const count = await page.locator(dotsSelector).count()
  const touch = testInfo.project.name === 'mobile'
  const session = touch ? await page.context().newCDPSession(page) : null
  let index = 0
  for (const direction of [1, -1]) {
    for (let step = 0; step < count * 2 + 1; step++) {
      const slide = await currentSlide(page)
      const image = slide.locator('.astro-carousel__image')
      await image.evaluate(element => element.scrollIntoView({ block: 'center', inline: 'nearest' }))
      const box = (await image.boundingBox())!
      const width = await page.locator(trackSelector).evaluate(track => track.clientWidth)
      const startX = box.x + (direction === 1 ? box.width * 0.85 : box.width * 0.15)
      const y = box.y + box.height / 2
      if (session) {
        await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: startX, y }] })
      } else {
        await page.mouse.move(startX, y)
        await page.mouse.down()
      }
      for (let move = 1; move <= 8; move++) {
        const x = startX - direction * width * 0.6 * move / 8
        if (session) {
          await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] })
        } else {
          await page.mouse.move(x, y)
        }
      }
      if (session) {
        await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
      } else {
        await page.mouse.up()
      }
      index = (index + direction + count) % count
      await settled(page, index)
    }
  }
})

test('mobile touch taps keep advancing right and recover after reversing direction', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'desktop')
  const count = await page.locator(dotsSelector).count()
  const first = await currentSlide(page)
  await first.locator('.astro-carousel__photo').evaluate(element =>
    element.scrollIntoView({ block: 'center', inline: 'nearest' }))
  let index = 0
  for (const direction of [...Array(count * 2).fill(1), -1, -1, -1, ...Array(count * 2).fill(1)]) {
    await page.waitForTimeout(500)
    const slide = await currentSlide(page)
    const button = slide.locator(direction === 1
      ? '.astro-carousel__chevron:not(.astro-carousel__chevron--previous)'
      : '.astro-carousel__chevron--previous')
    const box = (await button.boundingBox())!
    // Tap at the rendered chevron; do not scroll or refocus it between taps.
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2)
    index = (index + direction + count) % count
    await settled(page, index)
    const activeSlide = page.locator('.astro-carousel__slide[id]').nth(index)
    await expect.poll(async () => {
      const height = await page.locator(trackSelector).evaluate(track => track.clientHeight)
      const slideHeight = await activeSlide.evaluate(slide => slide.getBoundingClientRect().height)
      return Math.abs(height - slideHeight)
    }).toBeLessThanOrEqual(1)
  }
})

test('quick swipes interrupting a previous animation always settle on a slide', async ({ page }, testInfo) => {
  const session = testInfo.project.name === 'mobile'
    ? await page.context().newCDPSession(page) : null
  const track = page.locator(trackSelector)
  await track.evaluate(element => element.scrollIntoView({ block: 'start' }))
  const box = (await track.boundingBox())!
  const x = box.x + box.width / 2
  const y = box.y + 260 // Quote area, away from chevron buttons.
  const swipe = async (distance: number) => {
    if (session) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
      for (let step = 1; step <= 3; step++) {
        await session.send('Input.dispatchTouchEvent', {
          type: 'touchMove', touchPoints: [{ x: x - distance * step / 3, y }]
        })
      }
      await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    } else {
      await page.mouse.move(x, y)
      await page.mouse.down()
      await page.mouse.move(x - distance, y, { steps: 3 })
      await page.mouse.up()
    }
  }
  for (let attempt = 0; attempt < 8; attempt++) {
    await swipe(box.width * (attempt % 2 === 0 ? 0.7 : -0.7))
    await page.waitForTimeout(40)
    await swipe(box.width * (attempt % 2 === 0 ? -0.25 : 0.25))
    await expect.poll(() => track.evaluate(element => {
      const position = element.scrollLeft / element.clientWidth
      return Math.abs(position - Math.round(position))
    }), { timeout: 5000 }).toBeLessThan(0.001)
    await expect(track).not.toHaveClass(/is-dragging/)
    // Leave time for delayed snap/reset callbacks, then verify it stays aligned.
    await page.waitForTimeout(500)
    const position = await track.evaluate(element => element.scrollLeft / element.clientWidth)
    expect(Math.abs(position - Math.round(position))).toBeLessThan(0.001)
  }
})

test('an interrupted pointer capture cannot leave the carousel between slides', async ({ page }) => {
  const track = page.locator(trackSelector)
  await track.evaluate(element => {
    element.scrollIntoView({ block: 'start' })
    element.addEventListener('gotpointercapture', event => {
      element.setAttribute('data-test-pointer-id', String((event as PointerEvent).pointerId))
    }, { once: true })
  })
  const box = (await track.boundingBox())!
  const x = box.x + box.width / 2
  const y = box.y + 260
  await page.mouse.move(x, y)
  await page.mouse.down()
  await expect(track).toHaveClass(/is-dragging/)
  await page.mouse.move(x - box.width * 0.35, y, { steps: 3 })
  // Browser interruptions can release capture before a pointerup/cancel reaches
  // the track. Use the browser's real capture API to reproduce that sequence.
  await track.evaluate(element => {
    element.releasePointerCapture(Number(element.getAttribute('data-test-pointer-id')))
  })
  await page.mouse.move(0, 0)
  await page.mouse.up()
  await expect(track).not.toHaveClass(/is-dragging/)
  await settled(page, 0)
})
