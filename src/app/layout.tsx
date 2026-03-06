import { monda } from '@/app/fonts';
import ProvidersWrapper from '@/app/ProviderWrapper';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';

const BASE_URL = 'https://sharing-links-transformer.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'StreamLink — Convert Spotify & Deezer Links Instantly',
    template: '%s | StreamLink',
  },
  description:
    'Instantly convert Spotify sharing links to Deezer and vice versa. Free music link converter for any track, album or playlist.',
  keywords: ['Spotify', 'Deezer', 'Music', 'Link Converter', 'Sharing', 'Playlist', 'Track', 'Album'],
  alternates: {
    canonical: BASE_URL + '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL + '/',
    title: 'StreamLink — Convert Spotify & Deezer Links Instantly',
    description:
      'Instantly convert Spotify sharing links to Deezer and vice versa. Free music link converter for any track, album or playlist.',
    images: [
      {
        url: '/website.png',
        width: 1200,
        height: 630,
        alt: 'StreamLink — Music Link Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreamLink — Convert Spotify & Deezer Links Instantly',
    description:
      'Instantly convert Spotify sharing links to Deezer and vice versa. Free music link converter for any track, album or playlist.',
    images: ['/website.png'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'StreamLink',
              url: BASE_URL + '/',
              description:
                'Instantly convert Spotify sharing links to Deezer and vice versa. Free music link converter for any track, album or playlist.',
              applicationCategory: 'MusicApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'EUR',
              },
            }),
          }}
        />
        <ProvidersWrapper locale={locale} messages={messages}>
          {children}
        </ProvidersWrapper>
        <footer>Made with ❤️ by ©BerthetLucas</footer>
        <Analytics />
      </body>
    </html>
  );
}
