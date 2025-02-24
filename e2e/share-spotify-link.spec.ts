import { expect, test } from '@playwright/test';

test('When I share a valid Spotify link, I should get a Deezer Link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('From Spotify to Deezer and the other way around')).toBeVisible();
  const inputUrl = page.getByTestId('form-url-input');
  await inputUrl.fill('https://open.spotify.com/intl-fr/track/4CeeEOM32jQcH3eN9Q2dGj?si=44049a0115ee41d2');
  const submitButton = page.getByTestId('form-url-submit');
  await submitButton.click();

  await expect(page.getByText('https://www.deezer.com/track/13791930')).toBeVisible();
  await expect(page.getByText('You can now share this link to a Deezer User')).toBeVisible();
});
