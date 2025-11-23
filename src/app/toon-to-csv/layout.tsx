import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOON to CSV Converter - Free Online Tool | Convert TOON Format to CSV",
  description: "Convert TOON format back to CSV instantly. Free online TOON to CSV converter with client-side processing. Perfect for spreadsheet imports. No signup required.",
  keywords: [
    "TOON to CSV",
    "TOON converter",
    "CSV converter",
    "TOON to CSV online",
    "free TOON converter",
    "convert TOON format",
    "CSV generator",
    "spreadsheet converter"
  ],
  openGraph: {
    title: "TOON to CSV Converter - Free Online Tool",
    description: "Convert TOON format back to CSV instantly. Fast, secure, client-side processing.",
    url: "https://toonconvert.app/toon-to-csv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOON to CSV Converter - Free Online Tool",
    description: "Convert TOON format back to CSV instantly with our free online tool.",
  },
  alternates: {
    canonical: "https://toonconvert.app/toon-to-csv",
  },
};

export default function ToonToCSVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TOON to CSV Converter",
    "url": "https://toonconvert.app/toon-to-csv",
    "description": "Convert TOON format back to CSV with perfect accuracy",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "882"
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
