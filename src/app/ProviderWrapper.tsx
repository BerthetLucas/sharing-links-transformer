import Providers from '@/app/Providers';
import type { AbstractIntlMessages } from 'next-intl';

export default function ProvidersWrapper({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  return (
    <Providers locale={locale} messages={messages}>
      {children}
    </Providers>
  );
}
