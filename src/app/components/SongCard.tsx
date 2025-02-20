import { CopyLinkButton } from '@/app/components/CopyLinkButton';
import { ImageContainer } from '@/app/components/ImageContainer';
import { RetryButton } from '@/app/components/RetryButton';
import { useReset } from '@/app/store/linksAtoms';

type SongCardProps = {
  artist: string;
  cover: string;
  link: string;
  platform: 'spotify' | 'deezer';
  title: string;
};

export const SongCard = ({ artist, cover, link, title, platform }: SongCardProps) => {
  const { resetInputUrl, resetDeezerSongUrl, resetSpotifySongId, resetDeezerSongId } = useReset();

  function handleReset() {
    resetInputUrl();
    resetDeezerSongUrl();
    resetSpotifySongId();
    resetDeezerSongId();
  }

  const description =
    platform === 'spotify'
      ? 'You can now share this link to a Spotify User'
      : 'You can now share this link to a Deezer User';

  return (
    <section className="flex w-full flex-col-reverse items-center gap-10 px-4 md:w-3/4 md:flex-row">
      <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-white bg-gray-900 p-6 text-center md:w-auto">
        <p>{description}</p>
        <div className="flex max-w-full gap-3 rounded-lg bg-white p-6 font-bold text-black">
          <p className="truncate">{link}</p>
          <CopyLinkButton link={link} />
        </div>
        <ImageContainer image={cover} />
        <p>{artist}</p>
        <p>{title}</p>
      </div>
      <RetryButton onClick={handleReset} />
    </section>
  );
};
