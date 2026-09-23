import './globals.css';
import { Inter } from "next/font/google";
import { headers } from 'next/headers';
import { getLocaleConfig } from '@/lib/locales';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = 'https://vics-ugc-production.up.railway.app';
const TITLE = "Vic's UGC — Free AI Image & Video Studio";
const DESCRIPTION = 'Generate AI images and videos using 200+ models — Flux, Midjourney, Kling, Veo, Seedance and more.';

// Link previews (Slack, WhatsApp, X, iMessage) read these from the server
// response, so they can't rely on any client-side rebranding. The marketing
// page at `/` carries its own copy of the same tags in its static <head>.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: "Vic's UGC",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/marketing/og-vics-ugc.jpg', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/marketing/og-vics-ugc.jpg'],
  },
};

export default async function RootLayout({ children }) {
  // Locale is derived from the URL path by middleware.js and passed
  // through as a plain response header — the root layout is shared by
  // every locale's route tree, so it can't take a `locale` prop directly.
  const headerList = await headers();
  const { htmlLang } = getLocaleConfig(headerList.get('x-locale'));

  return (
    <html lang={htmlLang}>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
