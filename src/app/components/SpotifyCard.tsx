import { useGetSpotifySongInfo } from '@/app/hooks/useGetSpotifySongInfo';
import { SongCard } from './SongCard';

type SpotifyCardProps = {
  artist: string;
  title: string;
};

export const SpotifyCard = ({ artist, title }: SpotifyCardProps) => {
  const { data } = useGetSpotifySongInfo(artist, title);
  const track = data.tracks.items[0];

  return (
    <SongCard
      artist={artist}
      cover={track.album.images[1].url}
      link={track.external_urls.spotify}
      platform="spotify"
      title={title}
    />
  );
};
