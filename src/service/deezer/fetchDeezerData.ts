import axios from 'axios';
import type { DeezerResponse } from '@/app/types/deezer';

export const fetchDeezerData = async (artist: string, title: string, album: string): Promise<DeezerResponse> => {
  const res = await axios.get('https://sharing-link-back-end-production.up.railway.app/deezer/search', {
    params: {
      artist: artist,
      track: title,
      album: album,
    },
  });

  return res.data.data;
};
