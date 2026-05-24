import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'AMKyawDev Recap App',
    template: '%s | AMKyawDev Recap App',
  },
  description: 'Video subtitle editing application with FFmpeg WASM',
  keywords: ['video', 'subtitle', 'ffmpeg', 'srt', 'editor', 'video editing'],
  authors: [{ name: 'AMKyawDev', url: 'https://github.com/amkyawdev' }],
  creator: 'AMKyawDev',
  publisher: 'AMKyawDev',
  
  // Favicons
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  
  // PWA Manifest
  manifest: '/manifest.json',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'AMKyawDev Recap App',
    title: 'AMKyawDev Recap App',
    description: 'Video subtitle editing application with FFmpeg WASM',
    images: [
      {
        url: '/favicon.svg',
        width: 100,
        height: 100,
        alt: 'AMKyawDev Recap App',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary',
    title: 'AMKyawDev Recap App',
    description: 'Video subtitle editing application with FFmpeg WASM',
    creator: '@amkyawdev',
    images: ['/favicon.svg'],
  },
  
  // Theme color
  themeColor: '#667eea',
  appleServiceWorker: '/service-worker.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Recap App" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileImage" content="/favicon.svg" />
        <meta name="msapplication-TileColor" content="#667eea" />
      </head>
      <body>{children}</body>
    </html>
  );
}