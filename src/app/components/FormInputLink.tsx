'use client';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { FormEvent } from 'react';
import { deezerSongIdAtom, deezerSongUrlAtom, spotifySongIdAtom } from '@/app/store/linksAtoms';

type FormInputLinkProps = {
  onSubmit: (event: FormEvent) => void;
};

export const FormInputLink = ({ onSubmit }: FormInputLinkProps) => {
  const t = useTranslations('Form');
  const deezerSongUrl = useAtomValue(deezerSongUrlAtom);
  const spotifySongId = useAtomValue(spotifySongIdAtom);
  const deezerSongId = useAtomValue(deezerSongIdAtom);

  if (deezerSongUrl || spotifySongId || deezerSongId) {
    return null;
  }

  return (
    <form className="flex w-3/4 flex-col items-center gap-4 md:w-1/2" onSubmit={onSubmit}>
      <input
        className="mb-4 w-full rounded border bg-white p-2 text-black"
        data-testid="form-url-input"
        name="url"
        placeholder={t('placeholder')}
        required
        type="text"
      />
      <input
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium [box-shadow:0px_4px_1px_#a3a3a3] transition-all active:translate-y-0.5 active:shadow-none"
        data-testid="form-url-submit"
        type="submit"
        value={t('button')}
      />
    </form>
  );
};
