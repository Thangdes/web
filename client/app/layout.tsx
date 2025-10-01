import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO METADATA NÂNG CẤP theo docs2
export const metadata: Metadata = {
  title: {
    template: '%s | Tempra - AI Calendar Assistant',
    default: 'Tempra - AI Calendar Assistant',
  },
  description: 'Get your time back with AI. The #1 AI calendar app for individuals, teams, and organizations.',
  keywords: ['AI calendar', 'scheduling', 'productivity', 'time management', 'Google Calendar', 'Outlook'],
  authors: [{ name: 'Tempra Team' }],
  creator: 'Tempra',
  publisher: 'Tempra',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Tempra',
    title: 'Tempra - AI Calendar Assistant',
    description: 'Get your time back with AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tempra - AI Calendar Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tempra - AI Calendar Assistant',
    description: 'Get your time back with AI',
    images: ['/og-image.png'],
    creator: '@tempra',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// VIEWPORT CONFIG theo docs2
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}