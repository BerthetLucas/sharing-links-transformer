import { Inter } from 'next/font/google';
import { getLocale, getMessages } from 'next-intl/server';
import Providers from '@/app/Providers';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
        <footer>Made with ❤️ by ©BerthetLucas</footer>
      </body>
    </html>
  );
}
