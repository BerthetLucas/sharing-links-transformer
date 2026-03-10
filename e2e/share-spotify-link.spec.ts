import { expect, test } from '@playwright/test';

test('When I share a valid Spotify link, I should get a Deezer Link', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByText('From Spotify to Deezer and the other way around')).toBeVisible();
  const inputUrl = page.getByTestId('form-url-input');
  await inputUrl.fill('https://open.spotify.com/intl-fr/track/2RsAajgo0g7bMCHxwH3Sk0?si=fc766682c0094098');
  const submitButton = page.getByTestId('form-url-submit');
  await submitButton.click();
  await expect(page.getByText('You can now share this link to a Deezer User')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('Nirvana')).toBeVisible();
  await expect(page.getByText('Come As You Are')).toBeVisible();
  const retryButton = page.getByTestId('retry-button');
  await retryButton.click();
  await expect(page.getByText('From Spotify to Deezer and the other way around')).toBeVisible();
});
