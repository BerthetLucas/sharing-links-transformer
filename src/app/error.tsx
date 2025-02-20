'use client';
import { AlertTriangle, InfoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { RetryButton } from '@/app/components/RetryButton';
import { useReset } from '@/app/store/linksAtoms';

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  const t = useTranslations('Error');
  const { resetInputUrl, resetDeezerSongUrl, resetSpotifySongId, resetDeezerSongId } = useReset();

  const handleResetErrorsClick = () => {
    resetInputUrl();
    resetDeezerSongUrl();
    resetSpotifySongId();
    resetDeezerSongId();
    reset();
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="flex items-center gap-2">
        <AlertTriangle className="text-red-700" size="56" />
        <p className="text-xl font-bold">{t('title')}</p>
      </div>

      <div className="flex w-1/2 flex-col items-center gap-2 md:items-start">
        <div className="flex items-center gap-1">
          <InfoIcon size="20" />
          <p className="font-bold">{t('information')}</p>
        </div>

        <div className="flex flex-col text-center md:text-justify">
          <p>{t('description')}</p>
        </div>
      </div>
      <p className="font-bold">{t('ctaCall')}</p>
      <RetryButton onClick={handleResetErrorsClick} />
    </section>
  );
}
