import { useSuspenseQuery } from '@tanstack/react-query';
import { getSpotifySong } from '@/service/spotify';
import type { SpotifyResponse } from '@/app/types/spotify';

export const useGetSpotifySong = (songId: string) => {
  return useSuspenseQuery<SpotifyResponse>({
    queryKey: ['spotifySong', songId],
    queryFn: () => getSpotifySong(songId),
  });
};
