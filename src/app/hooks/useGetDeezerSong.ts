import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { DeezerInformation, DeezerResponse } from '../types/deezer';
import { fetchDeezerData, fetchDeezerDataById, fetchDeezerSongIdFromSharingLink } from '@/service/deezer';


export function useGetDeezerSong(artist: string, title: string, album: string) {
  return useSuspenseQuery<DeezerResponse>({
    queryKey: ['deezer', artist, title, album],
    queryFn: () => fetchDeezerData(artist, title, album),
  });
}

export function useGetDeezerSongById(id: string) {
  return useSuspenseQuery<DeezerInformation>({
    queryKey: ['deezerById', id],
    queryFn: () => fetchDeezerDataById(id),
  });
}

export function useGetDeezerIdFromSharingLink(url: string | null) {
  return useSuspenseQuery<string | null>({
    queryKey: ['deezerByIdFromSharingLink', url],
    queryFn: () => fetchDeezerSongIdFromSharingLink(url),
  });
}
