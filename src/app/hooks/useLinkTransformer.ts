import { useAtom } from 'jotai';
import { deezerSongIdAtom, deezerSongUrlAtom, inputUrlAtom, spotifySongIdAtom, useReset } from '@/app/store/linksAtoms';
import type { FormEvent } from 'react';

export const useLinkTransformer = () => {
  const { resetDeezerSongUrl, resetSpotifySongId, resetDeezerSongId } = useReset();
  const [inputUrl, setInputUrl] = useAtom(inputUrlAtom);
  const [spotifySongId, setSpotifySongId] = useAtom(spotifySongIdAtom);
  const [deezerSongUrl, setDeezerSongUrl] = useAtom(deezerSongUrlAtom);
  const [deezerSongId, setDeezerSongId] = useAtom(deezerSongIdAtom);

  const handleSubmit = (event: FormEvent) => {
    resetDeezerSongUrl();
    resetSpotifySongId();
    resetDeezerSongId();
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const url = formData.get('url') as string;
    setInputUrl(url);
  };

  const splitedURL = inputUrl.split('/');
  const songId = splitedURL.at(-1);

  if (songId && splitedURL[2] === 'open.spotify.com') {
    setSpotifySongId(songId);
  }
  if (songId && splitedURL[2] === 'dzr.page.link') {
    setDeezerSongUrl(inputUrl);
  }

  if (songId && splitedURL[2] === 'www.deezer.com') {
    setDeezerSongId(songId);
  }

  return {
    spotifySongId,
    deezerSongId,
    deezerSongUrl,
    handleSubmit,
  };
};
