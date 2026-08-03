import { useSuspenseQuery } from '@tanstack/react-query';
import { getSpotifyInfo } from '@/service/spotify/getSpotifyInfo';
import type { SpotifyResponse } from '@/app/types/spotify';

export const useGetSpotifySongInfo = (artist: string, track: string) => {
  return useSuspenseQuery<SpotifyResponse>({
    queryKey: ['spotifySongInfo', artist, track],
    queryFn: () => getSpotifyInfo(artist, track),
  });
};
