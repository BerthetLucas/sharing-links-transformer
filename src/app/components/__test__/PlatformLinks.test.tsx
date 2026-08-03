import { screen, waitFor } from '@testing-library/dom';
import { describe, expect, it, vi } from 'vitest';
import { PlatformLinks } from '@/app/components/PlatformLinks';
import { useGetSongLinks } from '@/app/hooks/useGetSongLinks';
import { render } from '@/test-utils/render-with-providers';
import type { SongLinkData } from '@/app/types/songlink';

const IntersectionObserverMock = vi.fn(function () {
  return {
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
  };
});

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

vi.mock('@/app/hooks/useGetSongLinks');

const songLinkData: SongLinkData = {
  pageUrl: 'https://song.link/s/123',
  artist: 'Nirvana',
  title: 'Smells Like Teen Spirit',
  thumbnail: 'https://example.com/cover.jpg',
  platforms: [
    { platform: 'deezer', url: 'https://www.deezer.com/track/13791930' },
    { platform: 'spotify', url: 'https://open.spotify.com/track/abc123' },
  ],
};

describe('PlatformLinks', () => {
  it('filters out the source platform card when the input url is a Deezer link', async () => {
    vi.mocked(useGetSongLinks).mockReturnValue({
      data: songLinkData,
    } as unknown as ReturnType<typeof useGetSongLinks>);

    render(<PlatformLinks url="https://www.deezer.com/track/13791930" />);

    document.querySelectorAll('section').forEach(section => {
      (section as HTMLElement).style.opacity = '1';
    });

    await waitFor(() => {
      expect(screen.getByText('https://open.spotify.com/track/abc123')).toBeVisible();
    });

    expect(screen.queryByText('https://www.deezer.com/track/13791930')).not.toBeInTheDocument();
  });
});
