import { RotateCcw } from 'lucide-react';
import { useReset } from '@/app/store/linksAtoms';

type RetryButtonProps = {
  onClick?: () => void;
};

export const RetryButton = ({ onClick }: RetryButtonProps) => {
  const { resetInputUrl, resetDeezerSongUrl, resetSpotifySongId, resetDeezerSongId } = useReset();

  function handleReset() {
    resetInputUrl();
    resetDeezerSongUrl();
    resetSpotifySongId();
    resetDeezerSongId();
  }

  return (
    <button
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none"
      data-testid="retry-button"
      onClick={onClick ? onClick : handleReset}
    >
      <RotateCcw />
    </button>
  );
};
