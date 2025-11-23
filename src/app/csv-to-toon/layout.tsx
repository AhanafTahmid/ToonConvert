import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to TOON Converter - Free Online Tool",
  description: "Convert CSV to TOON format instantly. Free online CSV to TOON converter that reduces LLM token usage. Perfect for spreadsheet data, reports, and data exports. No signup required.",
  keywords: [
    "CSV to TOON",
    "CSV converter",
    "TOON format converter",
    "CSV to TOON online",
    "free CSV converter",
    "CSV parser",
    "LLM CSV optimizer",
    "spreadsheet converter",
    "CSV data converter",
    "tabular data optimizer"
  ],
  openGraph: {
    title: "CSV to TOON Converter - Optimize CSV Data for LLMs",
    description: "Free online tool to convert CSV to TOON format. Reduce LLM token costs for CSV data.",
    url: "https://toonconvert.app/csv-to-toon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to TOON Converter - Optimize CSV Data for LLMs",
    description: "Free online tool to convert CSV to TOON format and reduce token usage.",
  },
  alternates: {
    canonical: "https://toonconvert.app/csv-to-toon",
  },
};

export default function CSVToToonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CSV to TOON Converter",
    "url": "https://toonconvert.app/csv-to-toon",
    "description": "Convert CSV to TOON format to reduce LLM token usage",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "1465"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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
