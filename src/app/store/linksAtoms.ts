import { atomWithReset, useResetAtom } from 'jotai/utils';

export const inputUrlAtom = atomWithReset('');
export const spotifySongIdAtom = atomWithReset('');
export const deezerSongUrlAtom = atomWithReset('');
export const deezerSongIdAtom = atomWithReset('');

export const useReset = () => {
  const resetInputUrl = useResetAtom(inputUrlAtom);
  const resetDeezerSongUrl = useResetAtom(deezerSongUrlAtom);
  const resetSpotifySongId = useResetAtom(spotifySongIdAtom);
  const resetDeezerSongId = useResetAtom(deezerSongIdAtom);

  return {
    resetInputUrl,
    resetDeezerSongUrl,
    resetSpotifySongId,
    resetDeezerSongId,
  };
};
