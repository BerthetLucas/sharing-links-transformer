'use client';
import { FormInputLink } from '@/app/components/FormInputLink';
import { SongResult } from '@/app/components/SongResult';
import { Title } from '@/app/components/Title';
import { useLinkTransformer } from '@/app/hooks/useLinkTransformer';

export default function HomePage() {
  const { handleSubmit } = useLinkTransformer();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 md:p-24">
      <Title />
      <FormInputLink onSubmit={handleSubmit} />
      <SongResult />
    </main>
  );
}
