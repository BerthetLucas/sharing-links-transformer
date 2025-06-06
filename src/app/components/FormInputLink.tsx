import { useTranslations } from 'next-intl';
import type { FormEvent } from 'react';

type FormInputLinkProps = {
  deezerSongId: string;
  deezerSongUrl: string;
  onSubmit: (event: FormEvent) => void;
  spotifySongId: string;
};

export const FormInputLink = ({ onSubmit, deezerSongUrl, spotifySongId, deezerSongId }: FormInputLinkProps) => {
  const t = useTranslations('Form');

  if (deezerSongUrl || spotifySongId || deezerSongId) {
    return null;
  }

  return (
    <form className="flex w-3/4 flex-col items-center gap-4 md:w-1/2" onSubmit={onSubmit}>
      <input
        className="mb-4 w-full rounded border p-2 text-black"
        data-testid="form-url-input"
        name="url"
        placeholder={t('placeholder')}
        required
        type="text"
      />
      <input
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none"
        data-testid="form-url-submit"
        type="submit"
        value={t('button')}
      />
    </form>
  );
};
