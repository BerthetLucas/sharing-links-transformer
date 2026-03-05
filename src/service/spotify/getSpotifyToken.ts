'use server';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '@/config/env';

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
