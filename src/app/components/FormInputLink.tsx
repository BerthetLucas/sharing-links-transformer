import { useTranslations } from 'next-intl';

type FormInputLinkProps = {
  deezerSongId: string;
  deezerSongUrl: string;
  onSubmit: (event: React.FormEvent) => void;
  spotifySongId: string;
};

export const FormInputLink = ({ onSubmit, deezerSongUrl, spotifySongId, deezerSongId }: FormInputLinkProps) => {
  const t = useTranslations('Form');

  if (deezerSongUrl || spotifySongId || deezerSongId) {
    return null;
  }

  return (
    <form className="flex w-3/4 flex-col items-center gap-4 text-black md:w-1/2" onSubmit={onSubmit}>
      <input
        className="mb-4 w-full rounded border p-2"
        name="url"
        placeholder={t('placeholder')}
        required
        type="text"
      />
      <input
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-white transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none"
        type="submit"
        value={t('button')}
      />
    </form>
  );
};
