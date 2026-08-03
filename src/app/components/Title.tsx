'use client';
import { AudioLines } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { inputUrlAtom } from '@/app/store/linksAtoms';
export const Title = () => {
  const t = useTranslations('Title');
  const inputUrl = useAtomValue(inputUrlAtom);

  if (inputUrl) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex flex-col items-center gap-3">
        <AudioLines size={48} />
        <h1 className="text-3xl font-bold md:text-5xl">{t('title')}</h1>
      </div>
      <p className="max-w-md text-base text-neutral-400">{t('subtitle')}</p>
    </div>
  );
};
