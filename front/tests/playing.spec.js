import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 1600, height: 1000 },
})

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

const getClock = async (page) => await page.locator('#clock')

const doClickOnSpider = async (page, delay = 250) => {
  const spider = page.locator('#spider')
  await page.waitForTimeout(delay);
  await spider.click()
}

test.describe('Playing [desktop]:', () => {
  test(`The user can click on spider and
    the counter is incremented`, async ({ page }) => {
    await doClickOnSpider(page)

    const counter = page.getByText('1', { exact: true })
    await expect(counter).toBeVisible()

    await doClickOnSpider(page)

    const counter2 = page.getByText('2')
    await expect(counter2).toBeVisible()
  })

  test(`The user can click on the spider,
    and the info modal is not visible and
    the clock is visible`, async ({ page }) => {
    await doClickOnSpider(page)

    const infoIcon = page.locator('#info-icon')
    expect(infoIcon).not.toBeVisible()

    const clock = await getClock(page)
    await expect(clock).toBeVisible()
  })

  test(`The user can click on the spider
    five times in one second, then the counter
    is incremented until 5`, async ({ page }) => {
    for (let i = 0; i < 6; i++) {
      await doClickOnSpider(page)
    }

    const counter = page.getByTestId('user-counter')
    await expect(counter).toHaveText('5')
  })
})
