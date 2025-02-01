'use client';
import { Copy } from 'lucide-react';
import Link from 'next/link';
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
  const cover = deezerInfo.data[0].album.cover;

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-white bg-gray-900 p-10">
      <p>You can now share this link to a Deezer User</p>
      <button className="flex gap-3 rounded-lg bg-white p-6 font-bold text-black">
        <Link href={link}>{link}</Link>
        <Copy />
      </button>
      <img alt="" src={cover} />
      <p>{spotifyArtiste}</p>
      <p>{spotifyTitle}</p>
    </div>
  );
};
