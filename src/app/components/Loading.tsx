import { AudioLines } from 'lucide-react';
import { PuffLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <AudioLines size={70} />
      <PuffLoader color="#ffffff" size={60} />
    </div>
  );
};
