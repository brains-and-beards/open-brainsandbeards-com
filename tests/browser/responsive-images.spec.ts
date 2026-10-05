import { expect, test } from '@playwright/test'
import { responsiveImageProps } from '../../astro/lib/responsive-images'

test('image candidates stay sorted, unique, and within source resolution', () => {
  for (const width of [40, 300, 1240, 3000]) {
    const result = responsiveImageProps({ width }, 'home-project')
    expect(result.widths).toEqual([...new Set(result.widths)].sort((a, b) => a - b))
    expect(result.widths[0]).toBeGreaterThan(0)
    expect(result.widths.at(-1)).toBe(Math.min(width, 642 * 3))
  }
  const custom = responsiveImageProps({ width: 2000 }, 'speaker', {
    maxWidth: 333,
    sizes: '333px'
  })
  expect(custom.widths.at(-1)).toBe(999)
  expect(custom.sizes).toBe('333px')
})

const routes = [
  '/',
  '/team/',
  '/hire-us/',
  '/projects/',
  '/projects/manomano/',
  '/projects/lokalportal/',
  '/services/cross-platform/',
  '/blog/',
  '/blog/to-persist-or-not-to-persist/'
]

for (const route of routes) {
  test(`responsive sources fit their rendered containers on ${route}`, async ({ page }) => {
    await page.goto(route)
    const images = page.locator('img[data-responsive-preset]:visible')
    expect(await images.count()).toBeGreaterThan(0)
    const presets = await images.evaluateAll(elements => [
      ...new Set(elements.map(image => (image as HTMLElement).dataset.responsivePreset!))
    ])

    for (const preset of presets) {
      const image = page.locator(`img[data-responsive-preset="${preset}"]:visible`).first()
      await image.scrollIntoViewIfNeeded()
      await expect
        .poll(() =>
          image.evaluate(element => {
            const img = element as HTMLImageElement
            return img.complete && img.naturalWidth > 0
          })
        )
        .toBe(true)

      const info = await image.evaluate(element => {
        const img = element as HTMLImageElement
        const style = getComputedStyle(img)
        const box = img.getBoundingClientRect()
        const width = box.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
        // Cropped images need enough pixels for the larger of their two axes.
        const height = box.height - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
        const renderedWidth = style.objectFit === 'cover'
          ? Math.max(width, height * img.naturalWidth / img.naturalHeight)
          : width
        const candidates = img.srcset.split(',').map(candidate => {
          const [src, descriptor] = candidate.trim().split(/\s+/)
          return { src: new URL(src, document.baseURI).href, width: parseInt(descriptor) }
        })
        return {
          sizes: img.sizes,
          chosen: candidates.find(candidate => candidate.src === img.currentSrc)?.width,
          largest: Math.max(...candidates.map(candidate => candidate.width)),
          needed: renderedWidth * devicePixelRatio,
          loading: img.loading,
          priority: img.fetchPriority
        }
      })
      expect(info.sizes, preset).not.toBe('')
      expect(info.chosen, preset).toBeDefined()
      // Allow rounding and the gaps between candidates, while catching an
      // incorrect sizes hint that downloads a desktop image on a phone.
      expect(info.chosen!, preset).toBeLessThanOrEqual(info.needed * 1.35)
      expect(info.chosen!, preset).toBeGreaterThanOrEqual(Math.min(info.needed, info.largest) * 0.9)
      if (preset === 'home-hero-mobile' || preset === 'home-hero' || preset === 'blog-hero') {
        expect(info.loading, preset).toBe('eager')
        expect(info.priority, preset).toBe('high')
      }
    }
  })
}

test('blog content receives responsive images and keeps image alignment', async ({ page }) => {
  await page.goto('/blog/to-persist-or-not-to-persist/')
  const image = page.locator('img[data-responsive-preset="article"]').first()
  await image.scrollIntoViewIfNeeded()
  const offset = await image.evaluate(element => {
    const image = element.getBoundingClientRect()
    const parent = element.parentElement!.getBoundingClientRect()
    return Math.abs((image.left + image.right) / 2 - (parent.left + parent.right) / 2)
  })
  expect(offset).toBeLessThan(1)
  await expect(image).toHaveAttribute('decoding', 'async')
})
