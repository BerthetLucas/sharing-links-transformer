'use client';
import { useResetAtom } from 'jotai/utils';
import { AlertTriangle, InfoIcon } from 'lucide-react';
import { RetryButton } from '@/app/components/RetryButton';
import { deezerSongIdAtom, deezerSongUrlAtom, inputUrlAtom, spotifySongIdAtom } from '@/app/store/linksAtoms';

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  const resetInputUrl = useResetAtom(inputUrlAtom);
  const resetDeezerSongUrl = useResetAtom(deezerSongUrlAtom);
  const resetSpotifySongId = useResetAtom(spotifySongIdAtom);
  const resetSetDeezerSongId = useResetAtom(deezerSongIdAtom);

  const handleResetErrorsClick = () => {
    resetInputUrl();
    resetDeezerSongUrl();
    resetSpotifySongId();
    resetSetDeezerSongId();
    reset();
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="flex items-center gap-2">
        <AlertTriangle className="text-red-700" size="56" />
        <p className="text-xl font-bold">Oooops something went wrong</p>
      </div>

      <div className="flex w-1/2 flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <InfoIcon size="20" />
          <p className="font-bold">Information</p>
        </div>

        <div className="flex flex-col text-justify">
          <p>
            It can happen that the libraries between streaming services are not the same, so either the song you are
            looking for is not available, or your link is broken. Another possibility is that I did a poor job, in which
            case I apologize for the inconvenience!
          </p>
        </div>
      </div>
      <p className="font-bold">No panic, you can try again.</p>
      <RetryButton onClick={handleResetErrorsClick} />
    </section>
  );
}
