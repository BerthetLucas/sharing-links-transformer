import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { DeezerResponse } from '../types/deezer';

const fetchDeezerData = async (artist: string, title: string, album: string): Promise<DeezerResponse> => {
  const res = await axios.get('/api/deezer', {
    params: {
      artist: artist,
      title: title,
      album: album,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data;
};

const fetchDeezerDataById = async (id: string): Promise<DeezerResponse> => {
  const res = await axios.get('/api/deezerGetSong', {
    params: {
      id: id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data;
};

const fetchDeezerSongIdFromSharingLink = async (url: string | null): Promise<DeezerResponse> => {
  const res = await axios.get('/api/deezerGetId', {
    params: {
      url: url,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data;
};

export function useGetDeezerSong(artist: string, title: string, album: string) {
  return useSuspenseQuery<DeezerResponse>({
    queryKey: ['deezer', artist, title, album],
    queryFn: () => fetchDeezerData(artist, title, album),
  });
}

export function useGetDeezerSongById(id: string) {
  return useSuspenseQuery<DeezerResponse>({
    queryKey: ['deezerById', id],
    queryFn: () => fetchDeezerDataById(id),
  });
}

export function useGetDeezerIdFromSharingLink(url: string) {
  return useSuspenseQuery<DeezerResponse>({
    queryKey: ['deezerByIdFromSharingLink', url],
    queryFn: () => fetchDeezerSongIdFromSharingLink(url),
  });
}
