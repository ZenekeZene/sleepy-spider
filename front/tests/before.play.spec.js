// @ts-check
import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 1600, height: 1000 },
})

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Before to play [desktop]:', () => {
  test(`The page has title and a info icon`, async ({ page }) => {
    const spider = page.locator('#spider')

    await expect(page.getByRole('heading', { name: 'Wake up, Sleepy!' })).toBeVisible()
    await expect(spider).toBeVisible()
    await expect(page.locator('#info-icon')).toBeVisible()
  })

  test(`We can tap on the info button,
    which will bring up a modal.
    The Share and Buy me a coffee buttons
    will appear, along with some instructions.`, async ({ page }) => {
    const infoIcon = page.locator('#info-icon')
    await infoIcon.click()

    await expect(page.locator('#info-modal')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Share!' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Buy me a coffee! Buy me a coffee!' })).toBeVisible()
    await expect(page.locator('ul[aria-label="Instructions"] > li')).toHaveCount(3)
  })

  test(`The user can click on the Share button,
    which will bring up a modal with Whatsapp, Twitter
    and Linkedin links to share. Then, the user can
    close the share modal and the info modal is visible`, async ({ page }) => {
    const infoIcon = page.locator('#info-icon')

    await infoIcon.click()

    const shareButton = page.locator('#share-info-modal')
    expect(shareButton).toBeVisible()

    await shareButton.click()

    const shareModal = page.locator('#share-modal')
    await expect(shareModal).toBeVisible()

    await expect(page.locator('#whatsapp-share-link')).toBeVisible()
    await expect(page.locator('#twitter-share-link')).toBeVisible()
    await expect(page.locator('#linkedin-share-link')).toBeVisible()

    const closeButton = page.getByLabel('Close')
    await closeButton.click()

    await expect(shareModal).not.toBeVisible()
    await expect(page.locator('#info-modal')).toBeVisible()
  })
})
