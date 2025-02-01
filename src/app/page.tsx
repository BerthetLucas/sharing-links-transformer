'use client';
import { useTranslations } from 'next-intl';
import { Suspense, useEffect, useState } from 'react';
import { DeezerLink } from '@/app/components/DeezerLink';
import { FormInputLink } from '@/app/components/FormInputLink';
import { SpotifyLink } from '@/app/components/SpotifyLink';

export default function HomePage() {
  const t = useTranslations('HomePage');
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
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <h1 className="text-2xl font-semibold">{t('title')}</h1>
      <FormInputLink deezerSongUrl={deezerSongUrl} onSubmit={handleSubmit} spotifySongId={spotifySongId} />
      {spotifySongId && (
        <Suspense fallback={<div>Loading...</div>}>
          <DeezerLink spotifySongId={spotifySongId} />
        </Suspense>
      )}
      {deezerSongUrl && (
        <Suspense fallback={<div>Loading...</div>}>
          <SpotifyLink deezerSongUrl={deezerSongUrl} />{' '}
        </Suspense>
      )}
    </main>
  );
}
