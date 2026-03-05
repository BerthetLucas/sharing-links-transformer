'use server';
import axios from 'axios';
import type { SpotifyResponse } from '@/app/types/spotify';
import type { AxiosResponse } from 'axios';
import { getSpotifyToken } from './getSpotifyToken';

export const getSpotifyInfo = async (artist: string, album: string, track: string) => {
  const token = await getSpotifyToken();

  const query = encodeURIComponent(`artist:"${artist}" album:"${album}" track:"${track}"`);

  const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;

  const response: AxiosResponse<SpotifyResponse> = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
