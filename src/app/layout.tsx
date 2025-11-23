import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toonconvert.app'),
  title: {
    default: "ToonConvert - Convert JSON, XML, CSV, YAML to TOON Format | Save 30-60% LLM Tokens",
    template: "%s | ToonConvert"
  },
  description: "Free online converter tools for JSON, XML, CSV, and YAML to TOON format. Reduce LLM token costs by 30-60%. Fast, secure, client-side processing. No data collection.",
  keywords: [
    "JSON to TOON converter",
    "XML to TOON converter", 
    "CSV to TOON converter",
    "YAML to TOON converter",
    "TOON format",
    "LLM token optimization",
    "reduce AI costs",
    "JSON converter",
    "XML converter",
    "CSV converter",
    "YAML converter",
    "data format converter",
    "token savings",
    "AI data optimization",
    "ChatGPT token reducer",
    "GPT token optimizer",
    "free converter tool",
    "online data converter"
  ],
  authors: [{ name: "Ahanaf Tahmid", url: "https://twitter.com/AhanafTahmid" }],
  creator: "Ahanaf Tahmid",
  publisher: "ToonConvert",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toonconvert.app",
    title: "ToonConvert - Convert JSON, XML, CSV, YAML to TOON Format",
    description: "Free online converter tools to reduce LLM token usage by 30-60%. Convert JSON, XML, CSV, YAML to TOON format instantly.",
    siteName: "ToonConvert",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ToonConvert - Format Converter for LLM Token Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToonConvert - Convert JSON, XML, CSV, YAML to TOON Format",
    description: "Free online converter tools to reduce LLM token usage by 30-60%. Fast, secure, client-side processing.",
    creator: "@AhanafTahmid",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://toonconvert.app",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ToonConvert",
    "url": "https://toonconvert.app",
    "description": "Free online converter tools for JSON, XML, CSV, and YAML to TOON format. Reduce LLM token costs by 30-60%.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Ahanaf Tahmid",
      "url": "https://twitter.com/AhanafTahmid"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ToonConvert",
      "url": "https://toonconvert.app"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M4V17D4WB0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M4V17D4WB0');
          `}
        </Script>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
