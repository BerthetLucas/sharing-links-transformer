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
    <div className="flex flex-col items-center gap-3 md:flex-row">
      <h1 className="text-center text-xl font-semibold md:text-2xl">{t('title')}</h1>
      <AudioLines />
    </div>
  );
};
