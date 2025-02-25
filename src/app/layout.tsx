import { monda } from '@/app/fonts';
import ProvidersWrapper from '@/app/ProviderWrapper';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'next-template',
  description: 'A simple Next.js starter template',
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
