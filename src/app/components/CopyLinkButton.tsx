'use client';
import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CopyLinkButtonProps = {
  link: string;
};

export const CopyLinkButton = ({ link }: CopyLinkButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setIsCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button onClick={() => void handleCopy()}>{isCopied ? <Check className="text-green-600" /> : <Copy />}</button>
  );
};
