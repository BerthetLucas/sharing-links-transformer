'use server';
import axios from 'axios';
import type { SpotifyResponse } from '@/app/types/spotify';
import { getSpotifyToken } from './getSpotifyToken';

export const getSpotifySong = async (songId: string): Promise<SpotifyResponse> => {
  const token = await getSpotifyToken();
  const url = `https://api.spotify.com/v1/tracks/${songId}`;

  const response = await axios.get<SpotifyResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
