import { screen } from '@testing-library/dom';
import { expect } from 'vitest';
import { render } from '@/test-utils/render-with-providers';
import HomePage from '../page';

describe('HomePage', () => {
  describe('When I land into the home page', () => {
    it('should render a title', () => {
      render(<HomePage />);
      expect(screen.getByText('From Spotify to Deezer and the other way around')).toBeVisible();
    });

    it('should render an input form with a placeholder text', () => {
      render(<HomePage />);
      expect(screen.getByPlaceholderText('Paste your sharing link here')).toBeVisible();
    });

    it('should render a button to send the form', () => {
      render(<HomePage />);
      expect(screen.getByText('Share')).toBeVisible();
    });
  });
});
