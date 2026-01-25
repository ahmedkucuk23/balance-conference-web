import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { OrganizationJsonLd, EventJsonLd, WebSiteJsonLd } from '@/components/seo/json-ld';

const generalSans = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/GeneralSans-Variable.ttf",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/GeneralSans-VariableItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://findyourbalance.net';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Get Motivated 2026 | Balance Conference Sarajevo",
    template: "%s | Balance Conference"
  },
  description: "Join Get Motivated 2026 - the premier motivation and work-life balance conference in Sarajevo. Learn from world-class speakers about burnout prevention, mental health, and building sustainable success. April 16, 2026.",
  keywords: ["balance conference", "get motivated", "motivation conference", "sarajevo", "2026", "work-life balance", "burnout prevention", "mental health", "leadership", "personal development", "wellness conference"],
  authors: [{ name: "Balance Conference" }],
  creator: "Balance Conference",
  publisher: "Balance Conference",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'bs_BA',
    url: BASE_URL,
    siteName: 'Balance Conference',
    title: 'Get Motivated 2026 | Balance Conference Sarajevo',
    description: 'Join Get Motivated 2026 - the premier motivation and work-life balance conference in Sarajevo. Learn from world-class speakers about burnout prevention, mental health, and building sustainable success.',
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Get Motivated 2026 - Balance Conference Sarajevo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Motivated 2026 | Balance Conference Sarajevo',
    description: 'Join Get Motivated 2026 - the premier motivation and work-life balance conference in Sarajevo. April 16, 2026.',
    images: [`${BASE_URL}/og-image.jpg`],
    creator: '@balanceconf',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en': BASE_URL,
      'bs': `${BASE_URL}/bs`,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
  category: 'conference',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Await params in Next.js 15+
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  return (
    <html lang={locale} className={`${generalSans.variable} ${playfairDisplay.variable} overflow-x-hidden`}>
      <body className="font-sans overflow-x-hidden" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
        <OrganizationJsonLd />
        <EventJsonLd />
        <WebSiteJsonLd />
      </body>
    </html>
  );
}
