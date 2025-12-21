import { monda } from '@/app/fonts';
import ProvidersWrapper from '@/app/ProviderWrapper';
import type { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';

export const metadata: Metadata = {
  title: 'Convert Streaming Music Link Platform',
  description: 'A website to change Spotify sharing links into Deezer ones',
  keywords: ['Spotify', 'Deezer', 'Music', 'Link Converter', 'Sharing'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sharing-links-transformer.vercel.app/',
    title: 'Convert Streaming Music Link Platform',
    description: 'A website to change Spotify sharing links into Deezer ones',
    images: [
      {
        url: '/website.png',
        width: 1200,
        height: 630,
        alt: 'Sharing Link Platform',
      },
    ],
  },
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
      <body className={`${monda.className} bg-black text-white`}>
        <ProvidersWrapper locale={locale} messages={messages}>
          {children}
        </ProvidersWrapper>
        <footer>Made with ❤️ by ©BerthetLucas</footer>
      </body>
    </html>
  );
}
