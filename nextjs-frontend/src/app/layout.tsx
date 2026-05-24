import './styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AMKyawDev Recap App',
  description: 'Video subtitle editing application with FFmpeg WASM',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}