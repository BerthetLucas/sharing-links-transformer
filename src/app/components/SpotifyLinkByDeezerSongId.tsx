import { CopyLinkButton } from '@/app/components/CopyLinkButton';
import { ImageContainer } from '@/app/components/ImageContainer';
import { useGetDeezerSongById } from '@/app/hooks/useGetDeezerSong';
import { useGetSpotifySongInfo } from '@/app/hooks/useGetSpotifySongInfo';

type SpotifyLinkByDeezerSongIdProps = {
  deezerId: string;
};

export const SpotifyLinkByDeezerSongId = ({ deezerId }: SpotifyLinkByDeezerSongIdProps) => {
  const { data: deezerInfo } = useGetDeezerSongById(deezerId);
  const deezerArtist = deezerInfo.artist.name;
  const deezerAlbum = deezerInfo.album.title;
  const deezerTitle = deezerInfo.title;

  const { data: spotifyTrackInfo } = useGetSpotifySongInfo(deezerArtist, deezerAlbum, deezerTitle);

  const link = spotifyTrackInfo.tracks.items[0].external_urls.spotify;
  const cover = spotifyTrackInfo.tracks.items[0].album.images[1].url;

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-white bg-gray-900 p-10">
      <p>You can now share this link to a Spotify User</p>
      <div className="flex gap-3 rounded-lg bg-white p-6 font-bold text-black">
        <p>{link}</p>
        <CopyLinkButton link={link} />
      </div>
      <ImageContainer image={cover} />
      <p>{deezerArtist}</p>
      <p>{deezerTitle}</p>
    </div>
  );
};
