'use client';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

type CopyLinkButtonProps = {
  link: string;
};

export const CopyLinkButton = ({ link }: CopyLinkButtonProps) => {
  const [isCopied, setIsCopied] = useState('');

  useEffect(() => {
    if (!isCopied) return;
    const copyLink = async () => {
      await navigator.clipboard.writeText(link);
      setTimeout(() => {
        setIsCopied('');
      }, 30000);
    };
    void copyLink();
  }, [isCopied, link]);

  return (
    <button
      onClick={() => {
        setIsCopied(link);
      }}
    >
      {!isCopied && <Copy />}
      {isCopied && <Check className="text-green-600" />}
    </button>
  );
};
