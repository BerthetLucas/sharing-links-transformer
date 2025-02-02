import { Copy } from 'lucide-react';
import Link from 'next/link';
import { useGetDeezerIdFromSharingLink, useGetDeezerSongById } from '@/app/hooks/useGetDeezerSong';
import { useGetSpotifySongInfo } from '@/app/hooks/useGetSpotifySongInfo';

type SpotifyLinkProps = {
  deezerSongId: string;
  deezerSongUrl: string;
};

export const SpotifyLink = ({ deezerSongUrl, deezerSongId }: SpotifyLinkProps) => {
  const { data: deezerApiId } = useGetDeezerIdFromSharingLink(deezerSongUrl);

  const deezerId = deezerSongId ? deezerSongId : deezerApiId.id;

  const { data: deezerInfo } = useGetDeezerSongById(deezerId);
  const deezerArtist = deezerInfo.artist.name;
  const deezerAlbum = deezerInfo.album.title;
  const deezerTitle = deezerInfo.title;

  const { data: spotifyTrackInfo } = useGetSpotifySongInfo(deezerArtist, deezerAlbum, deezerTitle);

  const link = spotifyTrackInfo.tracks.items[0].external_urls.spotify;
  const cover = spotifyTrackInfo.tracks.items[0].album.images[1].url;

  return (
    <div className="flex flex-col items-center gap-4">
      <p>You can now share this link to a Spotify User</p>
      <button className="rounded-sm bg-white p-6 text-black">
        <button className="flex gap-3 rounded-lg bg-white p-6 font-bold text-black">
          <Link href={link}>{link}</Link>
          <Copy />
        </button>
      </button>
      <img alt="Album cover" src={cover} />
      <p>{deezerArtist}</p>
      <p>{deezerTitle}</p>
    </div>
  );
};
