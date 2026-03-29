import { expect, test } from '@playwright/test';

test('When I share a non-music URL, the form should remain visible', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByText('From Spotify to Deezer and the other way around')).toBeVisible();

  const inputUrl = page.getByTestId('form-url-input');
  await inputUrl.fill('https://www.google.com');

  const submitButton = page.getByTestId('form-url-submit');
  await submitButton.click();

  await expect(page.getByTestId('form-url-input')).toBeVisible();
  await expect(page.getByTestId('form-url-submit')).toBeVisible();
});
