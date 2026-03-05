import { SongCard } from '@/app/components/SongCard';
import { useGetDeezerIdFromSharingLink, useGetDeezerSongById } from '@/app/hooks/useGetDeezerSong';
import { useGetSpotifySongInfo } from '@/app/hooks/useGetSpotifySongInfo';

type SpotifyLinkProps = {
  deezerId: string;
  deezerSongUrl: string;
};

export const SpotifyLink = ({ deezerSongUrl, deezerId }: SpotifyLinkProps) => {
  const { data: deezerIdFromLink } = useGetDeezerIdFromSharingLink(deezerSongUrl);

  const info = deezerId ? deezerId : deezerIdFromLink;

  const { data: deezerInfo } = useGetDeezerSongById(info as string);
  const { artist, track, album } = deezerInfo;

  const { data: spotifyTrackInfo } = useGetSpotifySongInfo(artist, album, track);

  const link = spotifyTrackInfo.tracks.items[0].external_urls.spotify;
  const cover = spotifyTrackInfo.tracks.items[0].album.images[1].url;

  return <SongCard artist={artist} cover={cover} link={link} platform="spotify" title={track} />;
};
