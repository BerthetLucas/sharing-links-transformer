'use client';
import { SongCard } from '@/app/components/SongCard';
import { useGetDeezerIdFromSharingLink, useGetDeezerSongById } from '@/app/hooks/useGetDeezerSong';
import { useGetSpotifySongInfo } from '@/app/hooks/useGetSpotifySongInfo';

type SpotifySongFromDeezerSharingLinkProps = {
  deezerSongUrl: string;
};

export const SpotifySongFromDeezerSharingLink = ({ deezerSongUrl }: SpotifySongFromDeezerSharingLinkProps) => {
  const { data: deezerId } = useGetDeezerIdFromSharingLink(deezerSongUrl);

  const { data: deezerInfo } = useGetDeezerSongById(deezerId.id);
  const deezerArtist = deezerInfo.artist.name;
  const deezerAlbum = deezerInfo.album.title;
  const deezerTitle = deezerInfo.title;

  const { data: spotifyTrackInfo } = useGetSpotifySongInfo(deezerArtist, deezerAlbum, deezerTitle);

  const link = spotifyTrackInfo.tracks.items[0].external_urls.spotify;
  const cover = spotifyTrackInfo.tracks.items[0].album.images[1].url;

  return <SongCard artist={deezerArtist} cover={cover} link={link} platform="spotify" title={deezerTitle} />;
};
