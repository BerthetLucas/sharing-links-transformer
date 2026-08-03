import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchSongLinks } from '@/service/songlink/fetchSongLinks';
import type { SongLinkData } from '@/app/types/songlink';

export const useGetSongLinks = (url: string) => {
  return useSuspenseQuery<SongLinkData>({
    queryKey: ['songlink', url],
    queryFn: () => fetchSongLinks(url),
  });
};
