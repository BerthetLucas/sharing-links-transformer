import { expect, test } from '@playwright/test';

test('When I share a valid Deezer link, I should get a Spotify Link', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByText('From Spotify to Deezer and the other way around')).toBeVisible();
  const inputUrl = page.getByTestId('form-url-input');
  await inputUrl.fill('https://dzr.page.link/qd2gmZcqvxkTjn5f8');
  const submitButton = page.getByTestId('form-url-submit');
  await submitButton.click();
  await expect(page.getByText('You can now share this link to a Spotify User')).toBeVisible();
  await expect(page.getByText('Nirvana')).toBeVisible();
  await expect(page.getByText('Smells Like Teen Spirit')).toBeVisible();
  const retryButton = page.getByTestId('retry-button');
  await retryButton.click();
  await expect(page.getByText('From Spotify to Deezer and the other way around')).toBeVisible();
});
