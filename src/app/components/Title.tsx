'use client';
import { AudioLines } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { deezerSongIdAtom, deezerSongUrlAtom, spotifySongIdAtom } from '@/app/store/linksAtoms';

export const Title = () => {
  const t = useTranslations('Title');
  const deezerSongUrl = useAtomValue(deezerSongUrlAtom);
  const spotifySongId = useAtomValue(spotifySongIdAtom);
  const deezerSongId = useAtomValue(deezerSongIdAtom);

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
