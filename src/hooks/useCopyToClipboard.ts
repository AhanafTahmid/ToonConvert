import { useState } from 'react';

export function useCopyToClipboard(resetDelay: number = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      
      setTimeout(() => {
        setIsCopied(false);
      }, resetDelay);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return { isCopied, copyToClipboard };
}
