import { useGetSongLinks } from '@/app/hooks/useGetSongLinks';
import { SongCard } from './SongCard';

type PlatformLinksProps = {
  url: string;
};

export const PlatformLinks = ({ url }: PlatformLinksProps) => {
  const { data } = useGetSongLinks(url);

  return (
    <>
      {data.platforms.map(({ platform, url: platformUrl }) => (
        <SongCard
          key={platform}
          artist={data.artist ?? ''}
          cover={data.thumbnail ?? ''}
          link={platformUrl}
          platform={platform}
          title={data.title ?? ''}
        />
      ))}
    </>
  );
};
