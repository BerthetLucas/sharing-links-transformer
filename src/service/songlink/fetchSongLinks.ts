import axios from 'axios';
import { BACKEND_BASE_URL } from '@/config/backend';
import type { SongLinkData } from '@/app/types/songlink';

export const fetchSongLinks = async (url: string): Promise<SongLinkData> => {
  const res = await axios.get(`${BACKEND_BASE_URL}/songlink`, {
    params: { url },
  });

  return res.data.data;
};
