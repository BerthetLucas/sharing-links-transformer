import { AudioLines } from 'lucide-react';
import { useTranslations } from 'next-intl';

type TitleProps = {
  deezerSongId: string;
  deezerSongUrl: string;
  spotifySongId: string;
};

export const Title = ({ deezerSongUrl, spotifySongId, deezerSongId }: TitleProps) => {
  const t = useTranslations('Title');

  if (deezerSongUrl || spotifySongId || deezerSongId) {
    return null;
  }

  return (
    <div className="flex flex-col-reverse items-center gap-5 md:flex-row md:gap-1">
      <h1 className="mx-4 text-center text-xl font-semibold md:text-2xl">{t('title')}</h1>
      <AudioLines size={40} />
    </div>
  );
};
