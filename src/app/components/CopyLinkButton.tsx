'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

type CopyLinkButtonProps = {
  link: string;
};

export const CopyLinkButton = ({ link }: CopyLinkButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button onClick={() => void handleCopy()}>{isCopied ? <Check className="text-green-600" /> : <Copy />}</button>
  );
};
