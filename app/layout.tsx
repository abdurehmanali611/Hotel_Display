import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import OfflineFallback from "@/components/OfflineFallback";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "B.I.H Hotel Display",
    template: "%s | Hotel Display",
  },
  description: "A hotel display application for B.I.H",
  applicationName: "B.I.H Hotel Display",
  themeColor: "#000000",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "B.I.H Hotel Display"
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "B.I.H Hotel Display",
    url: "https://hotel-display-swart.vercel.app/",
    title: {
      default: "B.I.H Hotel Display",
      template: "%s | B.I.H Hotel Display",
    },
    description: "A hotel display application for B.I.H",
  },
  twitter: {
    card: "summary",
    title: {
      default: "B.I.H Hotel Display",
      template: "%s | B.I.H Hotel Display",
    },
    description: "A hotel display application for B.I.H",
  },
  icons: {
    icon: [
      { url: "/icons/icon-32x32.png", sizes: "32x32" },
      { url: "/icons/icon-16x16.png", sizes: "16x16" },
    ],
    shortcut: "/icons/icon-32x32.png",
    apple: [
      { url: "/icons/apple-icon-180x180.png", sizes: "180x180" },
      { url: "/icons/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/icons/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/icons/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/icons/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/icons/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/icons/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/icons/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/icons/apple-icon-57x57.png", sizes: "57x57" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icons/apple-icon-57x57.png",
        sizes: "57x57",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <meta name="application-name" content="B.I.H Hotel Display" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="B.I.H Hotel Display" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" />
      </head>
      <body className={`${inter.className} h-full`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <ServiceWorkerRegistration />
          <OfflineFallback />
        </ThemeProvider>
      </body>
    </html>
  );
}
