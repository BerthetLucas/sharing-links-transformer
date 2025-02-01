type FormInputLinkProps = {
  deezerSongUrl: string;
  onSubmit: (event: React.FormEvent) => void;
  spotifySongId: string;
};

export const FormInputLink = ({ onSubmit, deezerSongUrl, spotifySongId }: FormInputLinkProps) => {
  if (deezerSongUrl || spotifySongId) {
    return null;
  }

  return (
    <form className="flex w-1/2 flex-col items-center text-black" onSubmit={onSubmit}>
      <input
        className="mb-4 w-full rounded border p-2"
        name="url"
        placeholder="Paste your Spotify or Deezer link here"
        required
        type="text"
      />

      <input
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-white transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none"
        type="submit"
        value="Share !"
      />
    </form>
  );
};
