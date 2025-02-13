'use client';
import { SongCard } from '@/app/components/SongCard';
import { useGetDeezerSong } from '@/app/hooks/useGetDeezerSong';
import { useGetSpotifySong } from '@/app/hooks/useGetSpotifySong';

type DeezerLinkProps = {
  spotifySongId: string;
};

export const DeezerLink = ({ spotifySongId }: DeezerLinkProps) => {
  const { data: spotifyInfo } = useGetSpotifySong(spotifySongId);

  const spotifyArtiste = spotifyInfo.artists[0].name;
  const spotifyTitle = spotifyInfo.name;
  const spotifyAlbum = spotifyInfo.album.name;

  const { data: deezerInfo } = useGetDeezerSong(spotifyArtiste, spotifyTitle, spotifyAlbum);

  const link = deezerInfo.data[0].link;
  const cover = deezerInfo.data[0].album.cover_big;

  return <SongCard artist={spotifyArtiste} cover={cover} link={link} plateform="deezer" title={spotifyTitle} />;
};
