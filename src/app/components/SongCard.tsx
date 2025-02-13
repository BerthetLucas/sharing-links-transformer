import { CopyLinkButton } from '@/app/components/CopyLinkButton';
import { ImageContainer } from '@/app/components/ImageContainer';

type SongCardProps = {
  artist: string;
  cover: string;
  link: string;
  platform: 'spotify' | 'deezer';
  title: string;
};

export const SongCard = ({ artist, cover, link, title, platform }: SongCardProps) => {
  const description =
    platform === 'spotify'
      ? 'You can now share this link to a Spotify User'
      : 'You can now share this link to a Deezer User';

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-white bg-gray-900 p-10">
      <p>{description}</p>
      <div className="flex gap-3 rounded-lg bg-white p-6 font-bold text-black">
        <p>{link}</p>
        <CopyLinkButton link={link} />
      </div>
      <ImageContainer image={cover} />
      <p>{artist}</p>
      <p>{title}</p>
    </div>
  );
};
