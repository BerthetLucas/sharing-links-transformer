'use client';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { Suspense, useEffect } from 'react';
import { DeezerLink } from '@/app/components/DeezerLink';
import { FormInputLink } from '@/app/components/FormInputLink';
import { Loading } from '@/app/components/Loading';
import { RetryButton } from '@/app/components/RetryButton';
import { SpotifyLink } from '@/app/components/SpotifyLink/SpotifyLink';
import { Title } from '@/app/components/Title';
import { deezerSongIdAtom, deezerSongUrlAtom, inputUrlAtom, spotifySongIdAtom } from '@/app/store/linksAtoms';
import type { FormEvent } from 'react';

export default function HomePage() {
  const [inputUrl, setInputUrl] = useAtom(inputUrlAtom);
  const [spotifySongId, setSpotifySongId] = useAtom(spotifySongIdAtom);
  const [deezerSongUrl, setDeezerSongUrl] = useAtom(deezerSongUrlAtom);
  const [deezerSongId, setDeezerSongId] = useAtom(deezerSongIdAtom);

  function handleSubmit(event: FormEvent) {
    setDeezerSongUrl(RESET);
    setSpotifySongId(RESET);
    setDeezerSongId(RESET);
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const url = formData.get('url') as string;
    setInputUrl(url);
  }

  function handleReset() {
    setInputUrl(RESET);
    setDeezerSongUrl(RESET);
    setSpotifySongId(RESET);
    setDeezerSongId(RESET);
  }

  const isUrlSet = spotifySongId || deezerSongUrl || deezerSongId;

  useEffect(() => {
    if (!inputUrl) {
      return;
    }
    const splitedURL = inputUrl.split('/');
    const songId = splitedURL.at(-1);

    if (songId && splitedURL[2] === 'open.spotify.com') {
      setSpotifySongId(songId);
    }
    if (songId && splitedURL[2] === 'deezer.page.link') {
      setDeezerSongUrl(inputUrl);
    }

    if (songId && splitedURL[2] === 'www.deezer.com') {
      setDeezerSongId(songId);
    }
  }, [inputUrl, setDeezerSongId, setDeezerSongUrl, setSpotifySongId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 md:p-24">
      {isUrlSet && (
        <div className="flex w-full items-end justify-center md:justify-end">
          <RetryButton onClick={handleReset} />
        </div>
      )}
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
      {deezerSongUrl ||
        (deezerSongId && (
          <Suspense fallback={<Loading />}>
            <SpotifyLink deezerId={deezerSongId} deezerSongUrl={deezerSongUrl} />
          </Suspense>
        ))}
    </main>
  );
}
