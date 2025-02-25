import { getLocale, getMessages } from 'next-intl/server';
import Providers from '@/app/Providers';

export default async function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <Providers locale={locale} messages={messages}>
      {children}
    </Providers>
  );
}
