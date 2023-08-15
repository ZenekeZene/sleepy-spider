import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 1600, height: 1000 },
})

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

const doClickOnSpiderNtimes = async ({ times, page }) => {
  const spider = page.getByTestId('spider')

  for (let i = 0; i < times; i++) {
    await spider.click()
    await page.waitForTimeout(165)
  }
}

test.describe('Playing [desktop]:', () => {
  test.describe('A) Basic behaviour:', () => {
    test(`The user can click on spider and
      the counter is incremented`, async ({ page }) => {
      await page.waitForTimeout(1000)
      const spider = page.getByTestId('spider')
      await spider.click()

      const counter = page.getByText('1', { exact: true })
      await expect(counter).toBeVisible()

      await spider.click()

      const counter2 = page.getByText('2')
      await expect(counter2).toBeVisible()
    })

    test(`The user can click on the spider,
      and the info modal is not visible and
      the clock is visible`, async ({ page }) => {
      const spider = page.getByTestId('spider')
      await spider.click()

      const infoIcon = page.locator('#info-icon')
      expect(infoIcon).not.toBeVisible()

      const clock = page.locator('#clock')
      await expect(clock).toBeVisible()
    })

    test(`The user can click on the spider
      3 times, then the counter
      is incremented until 3`, async ({ page }) => {
      await page.waitForTimeout(1000)
      const spider = page.getByTestId('spider')
      await spider.click()
      await page.waitForTimeout(2000)
      await spider.click()
      await page.waitForTimeout(2000)
      await spider.click()
      await page.waitForTimeout(2000)

      const counter = page.getByTestId('user-counter')
      await expect(counter).toBeVisible()
      await expect(counter).toHaveText('3')
    })
  })

  test.describe('B) Combos: The user can click quickly on the spider', () => {

    test(`2 times, the combo message 'DOUBLE!' is shown,
      and the counter is multiplied to 4`, async ({ page }) => {
      await doClickOnSpiderNtimes({ times: 2, page })

      await expect(page.getByText('DOUBLE!')).toBeVisible()
      const counter = page.getByTestId('user-counter')
      await expect(counter).toHaveText('4')
    })

    test(`3 times, the combo message 'TRIPLE!' is shown,
      and the counter is multiplied to 6`, async ({ page }) => {
      await doClickOnSpiderNtimes({ times: 3, page })

      await expect(page.getByText('TRIPLE!')).toBeVisible()
      const counter = page.getByTestId('user-counter')
      await expect(counter).toHaveText('6')
    })

    test(`4 times, the combo message 'Combo 4!' is shown,
      and the counter is multiplied to 6`, async ({ page }) => {
      await doClickOnSpiderNtimes({ times: 4, page })

      await expect(page.getByText('COMBO X4')).toBeVisible()
      const counter = page.getByTestId('user-counter')
      await expect(counter).toHaveText('8')
    })

    test(`7 times, the combo message 'SUPER!' is shown,
      and the counter is increment by 100`, async ({ page }) => {
      await doClickOnSpiderNtimes({ times: 7, page })

      await expect(page.getByText('SUPER!')).toBeVisible()
      const counter = page.getByTestId('user-counter')
      await expect(counter).toHaveText('107')
    })
  })

  test.describe('C) Question: The user can click quickly on the spider', () => {
    test(`7 times quickly, the question title and four options are shown`, async ({ page }) => {
      await doClickOnSpiderNtimes({ times: 7, page })

      const questionTitle = page.locator('#question-title')
      await expect(questionTitle).toBeVisible()

      await expect(page.locator('#question-options')).toBeVisible()
      const options = page.locator('#question-options > li')
      await expect(options).toHaveCount(4)
    })

    test(`7 times quickly, the question is shown
      and the user can click on one option, and the question modal
      is closed`, async ({ page }) => {
      await doClickOnSpiderNtimes({ times: 8, page })

      await expect(page.locator('#question-options')).toBeVisible()
      const options = page.locator('#question-options > li')

      await page.waitForTimeout(1500)

      const optionToClick = options.first()
      await optionToClick.click()

      await expect(page.locator('#question-modal')).not.toBeVisible()
    })
  })
})
