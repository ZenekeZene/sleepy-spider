import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 1600, height: 1000 },
})

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

const getClock = async (page) => await page.locator('#clock')

const doClickOnSpider = async (page, delay = 1000) => {
  const spider = page.locator('#spider')
  await page.waitForTimeout(delay)
  await spider.click()
}

const doComboOnSpider = async ({ times, value, message, page }) => {
  for (let i = 0; i < times; i++) {
    await doClickOnSpider(page, 100)
  }

  const counter = page.getByTestId('user-counter')
  await expect(counter).toHaveText(value.toString())

  expect(page.getByText(message)).toBeVisible()
}

test.describe.configure({ mode: 'parallel' })

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

  test.describe('Combos: The user can click quicly on the spider', () => {

    test(`2 times, the combo message 'DOUBLE!' is shown,
      and the counter is multiplied to 4`, async ({ page }) => {
      await doComboOnSpider({
        times: 2,
        value: 4,
        message: 'DOUBLE!',
        page
      })
    })

    test(`3 times, the combo message 'TRIPLE!' is shown,
      and the counter is multiplied to 6`, async ({ page }) => {
      await doComboOnSpider({
        times: 3,
        value: 6,
        message: 'TRIPLE!',
        page
      })
    })

    test(`4 times, the combo message 'Combo 4!' is shown,
      and the counter is multiplied to 6`, async ({ page }) => {
      await doComboOnSpider({
        times: 4,
        value: 8,
        message: 'COMBO X4',
        page
      })
    })

    test(`7 times, the combo message 'SUPER!' is shown,
      and the counter is increment by 100`, async ({ page }) => {
      await doComboOnSpider({
        times: 7,
        value: 107,
        message: 'SUPER!',
        page
      })
    })
  })
})
