import { SongCard } from '@/app/components/SongCard';
import { useGetDeezerIdFromSharingLink, useGetDeezerSongById } from '@/app/hooks/useGetDeezerSong';
import { useGetSpotifySongInfo } from '@/app/hooks/useGetSpotifySongInfo';
import { useMemo } from 'react';

type SpotifyLinkProps = {
  deezerId: string;
  deezerSongUrl: string;
};

export const SpotifyLink = ({ deezerSongUrl, deezerId }: SpotifyLinkProps) => {
  const { data: deezerIdFromLink } = useGetDeezerIdFromSharingLink(deezerSongUrl);

  const info = useMemo(() => (deezerId ? deezerId : (deezerIdFromLink?.id ?? '')), [deezerId, deezerIdFromLink]);

  const { data: deezerInfo } = useGetDeezerSongById(info);

  const deezerArtist = useMemo(() => deezerInfo?.artist?.name ?? '', [deezerInfo]);
  const deezerAlbum = useMemo(() => deezerInfo?.album?.title ?? '', [deezerInfo]);
  const deezerTitle = useMemo(() => deezerInfo?.title ?? '', [deezerInfo]);

  const { data: spotifyTrackInfo } = useGetSpotifySongInfo(deezerArtist, deezerAlbum, deezerTitle);

  const link = useMemo(() => spotifyTrackInfo?.tracks?.items?.[0]?.external_urls?.spotify ?? '', [spotifyTrackInfo]);
  const cover = useMemo(() => spotifyTrackInfo?.tracks?.items?.[0]?.album?.images?.[1]?.url ?? '', [spotifyTrackInfo]);

  return <SongCard artist={deezerArtist} cover={cover} link={link} platform="spotify" title={deezerTitle} />;
};
