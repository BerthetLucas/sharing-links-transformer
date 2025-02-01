import { RotateCcw } from 'lucide-react';

type RetryButtonProps = {
  onClick: () => void;
};

export const RetryButton = ({ onClick }: RetryButtonProps) => {
  return (
    <button
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-white transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none"
      onClick={onClick}
    >
      <RotateCcw />
    </button>
  );
};
