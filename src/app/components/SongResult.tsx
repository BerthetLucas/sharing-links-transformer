'use client';
import { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { deezerSongIdAtom, deezerSongUrlAtom, spotifySongIdAtom } from '@/app/store/linksAtoms';
import { DeezerLink } from './DeezerLink';
import { Loading } from './Loading';
import { SpotifyLink } from './SpotifyLink';

export const SongResult = () => {
  const spotifySongId = useAtomValue(spotifySongIdAtom);
  const deezerSongUrl = useAtomValue(deezerSongUrlAtom);
  const deezerSongId = useAtomValue(deezerSongIdAtom);

  if (!spotifySongId && !deezerSongUrl && !deezerSongId) {
    return null;
  }

  if (spotifySongId) {
    return (
      <Suspense fallback={<Loading />}>
        <DeezerLink spotifySongId={spotifySongId} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <SpotifyLink deezerId={deezerSongId} deezerSongUrl={deezerSongUrl} />
    </Suspense>
  );
};
