import { test, expect } from '@playwright/test';

test('customer page loads', async ({ page }) => {
  await page.goto('/customer');
  await expect(page).toHaveURL(/customer/);
  await expect(page.locator('body')).toBeVisible();
});

test('customer menu page loads', async ({ page }) => {
  await page.goto('/customer/menu');
  await expect(page.locator('body')).toBeVisible();
});

test('customer login page loads', async ({ page }) => {
  await page.goto('/customer/login');
  await expect(page.locator('body')).toBeVisible();
});