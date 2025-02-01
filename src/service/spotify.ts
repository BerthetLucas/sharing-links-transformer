'use server';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '@/config/env';
import type { SpotifyResponse } from '@/app/types/spotify';
import type { AxiosResponse } from 'axios';

type SpotifyTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export const getSpotifyToken = async (): Promise<string> => {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Missing CLIENT_ID or CLIENT_SECRET');
  }

  const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
  const base64Credentials = Buffer.from(credentials).toString('base64');
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');

  const response = await axios.post<SpotifyTokenResponse>('https://accounts.spotify.com/api/token', data, {
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
};

export const getSpotifySong = async (songId: string) => {
  const token = await getSpotifyToken();
  const url = `https://api.spotify.com/v1/tracks/${songId}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};

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
