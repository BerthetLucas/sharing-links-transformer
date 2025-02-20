import { getLocale, getMessages } from 'next-intl/server';
import { monda } from '@/app/fonts';
import Providers from '@/app/Providers';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'next-template',
  description: 'A simple Next.js starter template',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={monda.className}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
        <footer>Made with ❤️ by ©BerthetLucas</footer>
      </body>
    </html>
  );
}
