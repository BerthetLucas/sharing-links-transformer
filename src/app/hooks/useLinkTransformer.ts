import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { deezerSongIdAtom, deezerSongUrlAtom, inputUrlAtom, spotifySongIdAtom, useReset } from '@/app/store/linksAtoms';
import type { FormEvent } from 'react';

export const useLinkTransformer = () => {
  const { resetDeezerSongUrl, resetSpotifySongId, resetDeezerSongId } = useReset();
  const [inputUrl, setInputUrl] = useAtom(inputUrlAtom);
  const [spotifySongId, setSpotifySongId] = useAtom(spotifySongIdAtom);
  const [deezerSongUrl, setDeezerSongUrl] = useAtom(deezerSongUrlAtom);
  const [deezerSongId, setDeezerSongId] = useAtom(deezerSongIdAtom);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    resetDeezerSongUrl();
    resetSpotifySongId();
    resetDeezerSongId();
    const formData = new FormData(event.target as HTMLFormElement);
    const url = formData.get('url') as string;
    setInputUrl(url);
  };

  useEffect(() => {
    const splitedURL = inputUrl.split('/');
    const songId = splitedURL.at(-1);

    if (songId && splitedURL[2] === 'open.spotify.com') {
      setSpotifySongId(songId);
    } else if (songId && (splitedURL[2] === 'dzr.page.link' || splitedURL[2] === 'link.deezer.com')) {
      setDeezerSongUrl(inputUrl);
    } else if (songId && splitedURL[2] === 'www.deezer.com') {
      setDeezerSongId(songId);
    }
  }, [inputUrl, setSpotifySongId, setDeezerSongUrl, setDeezerSongId]);

  return {
    spotifySongId,
    deezerSongId,
    deezerSongUrl,
    handleSubmit,
  };
};
