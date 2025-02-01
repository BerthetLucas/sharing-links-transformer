'use client';
import { Suspense, useEffect, useState } from 'react';
import { DeezerLink } from '@/app/components/DeezerLink';
import { FormInputLink } from '@/app/components/FormInputLink';
import { Loading } from '@/app/components/Loading';
import { RetryButton } from '@/app/components/RetryButton';
import { SpotifyLink } from '@/app/components/SpotifyLink';
import { Title } from '@/app/components/Title';

export default function HomePage() {
  const [inputUrl, setInputUrl] = useState('');
  const [spotifySongId, setSpotifySongId] = useState('');
  const [deezerSongUrl, setDeezerSongUrl] = useState('');

  function handleSubmit(event: React.FormEvent) {
    setDeezerSongUrl('');
    setSpotifySongId('');
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const url = formData.get('url') as string;
    setInputUrl(url);
  }

  function handleReset() {
    setInputUrl('');
    setDeezerSongUrl('');
    setSpotifySongId('');
  }

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
  }, [inputUrl]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <div className="flex w-full items-end justify-end">
        <RetryButton onClick={handleReset} />
      </div>
      <Title deezerSongUrl={deezerSongUrl} spotifySongId={spotifySongId} />
      <FormInputLink deezerSongUrl={deezerSongUrl} onSubmit={handleSubmit} spotifySongId={spotifySongId} />
      {spotifySongId && (
        <Suspense fallback={<Loading />}>
          <DeezerLink spotifySongId={spotifySongId} />
        </Suspense>
      )}
      {deezerSongUrl && (
        <Suspense fallback={<Loading />}>
          <SpotifyLink deezerSongUrl={deezerSongUrl} />{' '}
        </Suspense>
      )}
    </main>
  );
}
