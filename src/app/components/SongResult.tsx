'use client';
import { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { inputUrlAtom } from '@/app/store/linksAtoms';
import { Loading } from './Loading';
import { PlatformLinks } from './PlatformLinks';

export const SongResult = () => {
  const inputUrl = useAtomValue(inputUrlAtom);

  if (!inputUrl) {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <PlatformLinks url={inputUrl} />
    </Suspense>
  );
};
