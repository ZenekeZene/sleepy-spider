// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  const spider = page.locator('#spider')
  await expect(page.getByRole('heading', { name: 'Wake up, Sleepy!' })).toBeVisible();
  await expect(spider).toBeVisible();

});

test('can click on spider', async ({ page }) => {
  await page.goto('/');

  await page.waitForTimeout(2000);

  const spider = page.locator('#spider')
  await spider.click();

  const counter = page.getByText('1', { exact: true });

  await expect(counter).toBeVisible();

  await spider.click();

  const counter2 = page.getByText('2');
  await expect(counter2).toBeVisible();
});
