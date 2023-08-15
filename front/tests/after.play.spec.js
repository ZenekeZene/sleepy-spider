import { test, expect } from '@playwright/test'

const MAX_SECONDS = 10

test.use({
  viewport: { width: 1600, height: 1000 },
})

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe.configure({ mode: 'parallel' })

test.describe('After playing [desktop]:', () => {
  test(`when the time is end, the final screen appears.
    It shows the score, ranking with invitation to sign in,
    and the button to play again and share`, async ({ page }) => {
    const spider = page.locator('#spider')
    await spider.click()
    await page.waitForTimeout(100)
    await spider.click()

    await page.waitForTimeout(1000 * MAX_SECONDS)

    const finalScreen = page.locator('#final-screen')
    await expect(finalScreen).toBeVisible()
    await expect(page.locator('#final-score')).toHaveText('4')

    await expect(page.locator('#leaderboard-preview')).toBeVisible()
    const ranking = page.locator('#leaderboard-preview li')
    await expect(ranking).toHaveCount(4)
    const last = ranking.last()
    await expect(last).toHaveText(/Your current rank/gi)
    await expect(last).toContainText('4')

    await expect(page.getByRole('button', { name: 'Save my best score' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Share!' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Play again!' })).toBeVisible()
  })

  test(`when the user clicks on "Play again!" button,
    the game starts again`, async ({ page }) => {
    const spider = page.locator('#spider')
    await spider.click()

    await page.waitForTimeout(1000 * MAX_SECONDS)

    const finalScreen = page.locator('#final-screen')
    await expect(finalScreen).toBeVisible()

    const playAgainButton = page.getByRole('button', { name: 'Play again!' })
    await playAgainButton.click()

    await expect(finalScreen).not.toBeVisible()
    await expect(page.locator('#loader')).toBeVisible()
  })
})
