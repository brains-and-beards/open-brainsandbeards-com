import { expect, test } from '@playwright/test'

test('homepage combines the projects index with services and client references', async ({
  page
}) => {
  await page.goto('/')
  const projects = page.locator('#projects')
  await expect(projects.getByRole('heading', { name: 'Our work speaks for us' })).toBeVisible()
  for (const slug of ['manomano', 'femtasy', 'lokalportal', 'sharoo', 'clincase', 'rakuten']) {
    await expect(page.locator(`main a[href="/projects/${slug}/"]`)).toHaveCount(1)
  }
  await expect(page.locator('.homepage-client-logos img')).toHaveCount(16)
  await expect(page.locator('.homepage-trusted-by img')).toHaveCount(4)
  await expect(page.locator('.homepage-services .serviceContainer')).toHaveCount(4)
  await expect(page.locator('.homepage-ai-stand')).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)'
  )

  const order = await page.locator('main').evaluate(main => {
    const projects = main.querySelector('#projects')!
    const services = main.querySelector('.homepage-services')!
    return Boolean(projects.compareDocumentPosition(services) & Node.DOCUMENT_POSITION_FOLLOWING)
  })
  expect(order).toBe(true)
  await expect(
    page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link', { name: 'Projects', exact: true })
  ).toHaveCount(0)

  for (const image of await page.locator('.project-card img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        image.evaluate(element => {
          const img = element as HTMLImageElement
          return img.complete && img.naturalWidth > 0
        })
      )
      .toBe(true)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('old projects index leads to the homepage project section', async ({ page }) => {
  await page.goto('/projects/')
  await expect(page).toHaveURL(/\/#projects$/)
  await expect(page.getByRole('heading', { name: 'Our work speaks for us' })).toBeVisible()
  await page.goto('/projects/manomano/')
  await expect(page.getByRole('link', { name: 'Case studies', exact: true })).toHaveAttribute(
    'href',
    '/#projects'
  )
})
