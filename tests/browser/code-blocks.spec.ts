import { expect, test } from '@playwright/test'

test('blog code blocks show syntax colors and opt-in line numbers without overflowing', async ({
  page
}) => {
  await page.goto('/blog/component-testing-with-graphql/')
  const block = page.locator('.expressive-code pre').first()
  await expect(block.locator('.ln').first()).toHaveText('1')
  await expect(block.locator('.code span[style]').first()).toBeVisible()

  const dimensions = await block.evaluate(element => {
    const column = element.closest('.narrow-column')!
    return {
      width: element.getBoundingClientRect().width,
      columnWidth: column.getBoundingClientRect().width,
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
      background: getComputedStyle(element).backgroundColor
    }
  })
  expect(dimensions.width).toBeLessThanOrEqual(dimensions.columnWidth + 1)
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1)
  expect(dimensions.background).toBe('rgb(253, 246, 227)')
})

test('blog code blocks preserve highlighted line ranges without adding line numbers', async ({
  page
}) => {
  await page.goto('/blog/2024-token-renewal-mutex/')
  const block = page
    .locator('.expressive-code pre[data-language="tsx"]')
    .filter({ has: page.locator('.highlight') })
    .first()
  const highlighted = await block
    .locator('.ec-line')
    .evaluateAll(lines =>
      lines.flatMap((line, index) => (line.classList.contains('highlight') ? [index + 1] : []))
    )
  expect(highlighted).toEqual([1, 3, 4, 5, 8, 9, 10, 13, 16])
  await expect(block.locator('.ln')).toHaveCount(0)
})
