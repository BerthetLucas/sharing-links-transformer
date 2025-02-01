import { AudioLines } from 'lucide-react';
import { useTranslations } from 'next-intl';

type TitleProps = {
  deezerSongUrl: string;
  spotifySongId: string;
};

export const Title = ({ deezerSongUrl, spotifySongId }: TitleProps) => {
  const t = useTranslations('Title');

  if (deezerSongUrl || spotifySongId) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <h1 className="text-2xl font-semibold">{t('title')}</h1>
      <AudioLines />
    </div>
  );
};
