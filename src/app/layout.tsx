import { monda } from '@/app/fonts';
import ProvidersWrapper from '@/app/ProviderWrapper';
import type { Metadata } from 'next';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monda.className} bg-black text-white`}>
        <ProvidersWrapper>{children}</ProvidersWrapper>
        <footer>Made with ❤️ by ©BerthetLucas</footer>
      </body>
    </html>
  );
}
