import { expect, test } from '@playwright/test';

test('When I share non valid link, I should get an error', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByText('From Spotify to Deezer and the other way around')).toBeVisible();
  const inputUrl = page.getByTestId('form-url-input');
  await inputUrl.fill('https://www.deezer.com/track/137');
  const submitButton = page.getByTestId('form-url-submit');
  await submitButton.click();
  await expect(page.getByText('Oooops something went wrong')).toBeVisible();
  const retryButton = page.getByTestId('retry-button');
  await retryButton.click();
  await expect(page.getByText('From Spotify to Deezer and the other way around')).toBeVisible();
});
