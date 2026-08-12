import { useAtom } from 'jotai';
import { inputUrlAtom, useReset } from '@/app/store/linksAtoms';
import type { FormEvent } from 'react';

export const useLinkTransformer = () => {
  const { resetInputUrl } = useReset();
  const [inputUrl, setInputUrl] = useAtom(inputUrlAtom);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    resetInputUrl();
    const formData = new FormData(event.target as HTMLFormElement);
    const url = formData.get('url') as string;
    setInputUrl(url);
  };

  return {
    inputUrl,
    handleSubmit,
  };
};
