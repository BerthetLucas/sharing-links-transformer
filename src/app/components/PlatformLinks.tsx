import { useGetSongLinks } from '@/app/hooks/useGetSongLinks';
import { RetryButton } from '@/app/components/RetryButton';
import { SongCard } from './SongCard';
import { SpotifyCard } from './SpotifyCard';

type PlatformLinksProps = {
  url: string;
};

const PLATFORM_HOSTNAMES: Record<string, string> = {
  'open.spotify.com': 'spotify',
  'www.deezer.com': 'deezer',
  'deezer.com': 'deezer',
  'dzr.page.link': 'deezer',
  'link.deezer.com': 'deezer',
};

const getSourcePlatform = (url: string): string | null => {
  try {
    return PLATFORM_HOSTNAMES[new URL(url).hostname] ?? null;
  } catch {
    return null;
  }
};

export const PlatformLinks = ({ url }: PlatformLinksProps) => {
  const { data } = useGetSongLinks(url);
  const sourcePlatform = getSourcePlatform(url);

  return (
    <>
      {sourcePlatform !== 'spotify' && <SpotifyCard artist={data.artist ?? ''} title={data.title ?? ''} />}
      {data.platforms
        .filter(({ platform }) => platform !== sourcePlatform && platform !== 'spotify')
        .map(({ platform, url: platformUrl }) => (
          <SongCard
            key={platform}
            artist={data.artist ?? ''}
            cover={data.thumbnail ?? ''}
            link={platformUrl}
            platform={platform}
            title={data.title ?? ''}
          />
        ))}
      <RetryButton />
    </>
  );
};
