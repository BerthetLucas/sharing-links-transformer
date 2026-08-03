import { useTranslations } from 'next-intl';
import { CopyLinkButton } from '@/app/components/CopyLinkButton';
import { ImageContainer } from '@/app/components/ImageContainer';
import { MotionSection } from './MotionComponents/MotionSection';

type SongCardProps = {
  artist: string;
  cover: string;
  link: string;
  platform: string;
  title: string;
};

const DEDICATED_MESSAGE_KEYS: Record<string, string> = {
  spotify: 'spotifyUser',
  deezer: 'deezerUser',
};

export const SongCard = ({ artist, cover, link, title, platform }: SongCardProps) => {
  const t = useTranslations('Card');

  const messageKey = DEDICATED_MESSAGE_KEYS[platform];
  const description = messageKey ? t(messageKey) : t('genericUser', { platform });

  return (
    <MotionSection className="flex w-full items-center gap-10 px-4">
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
    </MotionSection>
  );
};
