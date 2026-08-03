import { atomWithReset, useResetAtom } from 'jotai/utils';

export const inputUrlAtom = atomWithReset('');

export const useReset = () => {
  const resetInputUrl = useResetAtom(inputUrlAtom);

  return {
    resetInputUrl,
    resetAll: resetInputUrl,
  };
};
