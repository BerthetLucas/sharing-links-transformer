import { useSuspenseQuery } from '@tanstack/react-query';
import { getSpotifyInfo } from '@/service/spotify';
import type { SpotifyResponse } from '@/app/types/spotify';

export const useGetSpotifySongInfo = (artist: string, album: string, track: string) => {
  return useSuspenseQuery<SpotifyResponse>({
    queryKey: ['spotifySongInfo', artist, album, track],
    queryFn: () => getSpotifyInfo(artist, album, track),
  });
};
