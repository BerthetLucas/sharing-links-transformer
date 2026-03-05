'use client';
import { Suspense } from 'react';
import { DeezerLink } from '@/app/components/DeezerLink';
import { FormInputLink } from '@/app/components/FormInputLink';
import { Loading } from '@/app/components/Loading';
import { SpotifyLink } from '@/app/components/SpotifyLink';
import { Title } from '@/app/components/Title';
import { useLinkTransformer } from '@/app/hooks/useLinkTransformer';

export default function HomePage() {
  const { deezerSongId, spotifySongId, deezerSongUrl, handleSubmit } = useLinkTransformer();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 md:p-24">
      <Title deezerSongId={deezerSongId} deezerSongUrl={deezerSongUrl} spotifySongId={spotifySongId} />
      <FormInputLink
        deezerSongId={deezerSongId}
        deezerSongUrl={deezerSongUrl}
        onSubmit={handleSubmit}
        spotifySongId={spotifySongId}
      />
      {spotifySongId && (
        <Suspense fallback={<Loading />}>
          <DeezerLink spotifySongId={spotifySongId} />
        </Suspense>
      )}
      {(deezerSongUrl || deezerSongId) && (
        <Suspense fallback={<Loading />}>
          <SpotifyLink deezerId={deezerSongId} deezerSongUrl={deezerSongUrl} />
        </Suspense>
      )}
    </main>
  );
}
