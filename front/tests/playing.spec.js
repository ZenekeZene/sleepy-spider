import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 1600, height: 1000 },
})

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

const doClickOnSpider = async (page, delay = 1000) => {
  const spider = page.locator('#spider')
  await page.waitForTimeout(delay)
  await spider.click()
}

const doClickOnSpiderNtimes = async ({ times, page }) => {
  for (let i = 0; i < times; i++) {
    await doClickOnSpider(page, 150)
  }
}

const doClickUntilShowQuestion = async (page) => {
  await page.waitForTimeout(1000)
  await doClickOnSpiderNtimes({ times: 10, page })

  await expect(page.locator('#question-modal')).toBeVisible()
}

const doClickUntilCombo = async ({ times, message, page }) => {
  await doClickOnSpiderNtimes({ times, page })
  await page.waitForTimeout(500)
  await expect(page.getByText(message)).toBeVisible()
}

test.describe.configure({ mode: 'parallel' })

test.describe('Playing [desktop]:', () => {
  test.describe('A) Basic behaviour:', () => {
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

      const clock = page.locator('#clock')
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

  test.describe('B) Combos: The user can click quickly on the spider', () => {

    test(`2 times, the combo message 'DOUBLE!' is shown,
      and the counter is multiplied to 4`, async ({ page }) => {
      await doClickUntilCombo({
        times: 2,
        message: 'DOUBLE!',
        page
      })

      const counter = page.getByTestId('user-counter')
      await expect(counter).toHaveText('4')
    })

    test(`3 times, the combo message 'TRIPLE!' is shown,
      and the counter is multiplied to 6`, async ({ page }) => {
      await doClickUntilCombo({
        times: 3,
        message: 'TRIPLE!',
        page
      })

      const counter = page.getByTestId('user-counter')
      await expect(counter).toHaveText('6')
    })

    test(`4 times, the combo message 'Combo 4!' is shown,
      and the counter is multiplied to 6`, async ({ page }) => {
      await doClickUntilCombo({
        times: 4,
        message: 'COMBO X4',
        page
      })

      const counter = page.getByTestId('user-counter')
      await expect(counter).toHaveText('8')
    })

    test(`7 times, the combo message 'SUPER!' is shown,
      and the counter is increment by 100`, async ({ page }) => {
      await doClickUntilCombo({
        times: 7,
        message: 'SUPER!',
        page
      })

      const counter = page.getByTestId('user-counter')
      await expect(counter).toHaveText('107')
    })
  })

  test.describe('C) Question: The user can click quickly on the spider', () => {
    test(`7 times quickly, the question title and four options are shown`, async ({ page }) => {
      await doClickUntilCombo({
        times: 7,
        message: 'SUPER!',
        page
      })

      const questionTitle = page.locator('#question-title')
      await expect(questionTitle).toBeVisible()

      await expect(page.locator('#question-options')).toBeVisible()
      const options = page.locator('#question-options > li')
      await expect(options).toHaveCount(4)
    })

    test(`7 times quickly, the question is shown
      and the user can click on one option, and the question modal
      is closed`, async ({ page }) => {
      await doClickUntilCombo({
        times: 7,
        message: 'SUPER!',
        page
      })

      await expect(page.locator('#question-options')).toBeVisible()
      const options = page.locator('#question-options > li')

      await page.waitForTimeout(1500)

      const optionToClick = options.first()
      await optionToClick.click()

      await expect(page.locator('#question-modal')).not.toBeVisible()
    })
  })
})
