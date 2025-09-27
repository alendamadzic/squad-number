import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'squad number.',
  description:
    'Discover the squad numbers of your favorite football players. Search by name to find current club colors and jersey numbers.',
  keywords: ['football', 'soccer', 'squad number', 'jersey number'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="flex flex-col overflow-auto max-w-xl mx-auto mt-36 mb-24 px-6 gap-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
