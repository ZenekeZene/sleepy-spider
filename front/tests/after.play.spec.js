import { test, expect } from '@playwright/test'

const MAX_SECONDS = process.env.VITE_MAX_SECONDS || 10

test.use({
  viewport: { width: 1600, height: 1000 },
})

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

const waitToFinalScreen = async (page) => {
  await page.waitForTimeout(1000 * MAX_SECONDS)
  const finalScreen = page.locator('#final-screen')
  await expect(finalScreen).toBeVisible()
}

test.describe.configure({ mode: 'parallel' })

test.describe('After playing [desktop]:', () => {
  test(`when the time is ended (${MAX_SECONDS}"), the final screen appears.
    It shows the score, ranking with invitation to sign in,
    and the button to play again and share`, async ({ page }) => {
    const spider = page.locator('#spider')
    await spider.click()
    await page.waitForTimeout(2000)
    await spider.click()

    await waitToFinalScreen(page)

    await expect(page.locator('#final-score')).toHaveText('2')

    await expect(page.locator('#leaderboard-preview')).toBeVisible()
    const ranking = page.locator('#leaderboard-preview li')
    await expect(ranking).toHaveCount(4)
    const last = ranking.last()
    await expect(last).toHaveText(/Your current rank/gi)
    await expect(last).toContainText('2')

    await expect(page.getByRole('button', { name: 'Save my best score' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Share!' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Play again!' })).toBeVisible()
  })

  test(`when the time is ended (${MAX_SECONDS}"),
    when the user clicks on "Play again!" button,
    the game starts again`, async ({ page }) => {
    const spider = page.locator('#spider')
    await spider.click()
    await waitToFinalScreen(page)

    const playAgainButton = page.getByRole('button', { name: 'Play again!' })
    await playAgainButton.click()

    await expect(page.locator('#final-screen')).not.toBeVisible()
    await expect(page.locator('#loader')).toBeVisible()
  })

  test(`when the time is ended (${MAX_SECONDS}"),
    when the user clicks on "Share" button,
    which will bring up a modal with Whatsapp, Twitter
    and Linkedin links to share. Then, the user can
    close the share modal and the final screen is visible again`,async ({ page }) => {
    const spider = page.locator('#spider')
    await spider.click()
    await waitToFinalScreen(page)

    const shareButton = page.locator('#share')

    await shareButton.click()

    const shareModal = page.locator('#share-modal')
    await expect(shareModal).toBeVisible()

    await expect(page.locator('#whatsapp-share-link')).toBeVisible()
    await expect(page.locator('#twitter-share-link')).toBeVisible()
    await expect(page.locator('#linkedin-share-link')).toBeVisible()

    await expect(page.locator('#whatsapp-share-link')).toBeVisible()
    await expect(page.locator('#twitter-share-link')).toBeVisible()
    await expect(page.locator('#linkedin-share-link')).toBeVisible()

    const closeButton = page.getByLabel('Close')
    await closeButton.click()

    await expect(shareModal).not.toBeVisible()
    await expect(page.locator('#final-screen')).toBeVisible()
  })
})
