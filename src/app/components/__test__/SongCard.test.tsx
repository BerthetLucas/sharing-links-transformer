import { screen, waitFor } from '@testing-library/dom';
import { expect } from 'vitest';
import { SongCard } from '@/app/components/SongCard';
import { render } from '@/test-utils/render-with-providers';

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

const testData = {
  artist: 'INOHA',
  link: 'https://www.deezer.com/track/3027009011',
  title: 'GESHUOU',
  platform: 'deezer' as 'deezer' | 'spotify',
  cover: 'https://cdn-images.dzcdn.net/images/cover/b6f288faccbbd2f188ac2b4892abe2c4/500x500-000000-80-0-0.jpg',
};

describe('SongCard', () => {
  describe("When song's information are given", () => {
    it('Should render the right song information for the right plateform', async () => {
      const { artist, link, title, cover, platform } = testData;

      render(<SongCard artist={artist} cover={cover} link={link} platform={platform} title={title} />);

      const section = document.querySelector('section');
      if (section) {
        section.style.opacity = '1';
      }

      await waitFor(() => {
        expect(screen.getByText('https://www.deezer.com/track/3027009011')).toBeVisible();
        expect(screen.getByText('INOHA')).toBeVisible();
        expect(screen.getByText('GESHUOU')).toBeVisible();
        expect(screen.getByText('https://www.deezer.com/track/3027009011')).toBeVisible();
        expect(screen.getByText('You can now share this link to a Deezer User')).toBeVisible();
        expect(screen.getByTestId('retry-button')).toBeVisible();
      });
    });
  });
});
