import { RotateCcw } from 'lucide-react';
import { useReset } from '@/app/store/linksAtoms';

type RetryButtonProps = {
  onClick?: () => void;
};

export const RetryButton = ({ onClick }: RetryButtonProps) => {
  const { resetAll } = useReset();

  function handleReset() {
    resetAll();
  }

  return (
    <button
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium [box-shadow:0px_4px_1px_#a3a3a3] transition-all active:translate-y-0.5 active:shadow-none"
      data-testid="retry-button"
      onClick={onClick ?? handleReset}
    >
      <RotateCcw />
    </button>
  );
};
