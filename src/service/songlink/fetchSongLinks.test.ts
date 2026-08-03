import axios from 'axios';
import { describe, expect, it, vi } from 'vitest';
import { fetchSongLinks } from './fetchSongLinks';
import type { SongLinkData } from '@/app/types/songlink';

vi.mock('axios');

describe('fetchSongLinks', () => {
  it('calls the backend songlink endpoint with the url param and returns the data payload', async () => {
    const data: SongLinkData = {
      pageUrl: 'https://song.link/s/123',
      platforms: [{ platform: 'spotify', url: 'https://open.spotify.com/track/123' }],
    };
    vi.mocked(axios.get).mockResolvedValue({ data: { message: 'found', data } });

    const result = await fetchSongLinks('https://www.deezer.com/track/456');

    expect(axios.get).toHaveBeenCalledWith(
      'https://sharing-link-back-end-production.up.railway.app/songlink',
      { params: { url: 'https://www.deezer.com/track/456' } },
    );
    expect(result).toEqual(data);
  });
});
