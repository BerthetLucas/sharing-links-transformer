'use client';
import { FormInputLink } from '@/app/components/FormInputLink';
import { SongResult } from '@/app/components/SongResult';
import { Title } from '@/app/components/Title';
import { useLinkTransformer } from '@/app/hooks/useLinkTransformer';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const { handleSubmit } = useLinkTransformer();

  return (
    <>
      <div className="flex justify-center pt-6">
        <Badge variant="outline" className="border-white text-white">Free &amp; Open Source</Badge>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 md:p-24">
        <Title />
        <FormInputLink onSubmit={handleSubmit} />
        <SongResult />
      </main>
    </>
  );
}
