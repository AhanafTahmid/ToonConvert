import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XML to TOON Converter - Free Online Tool",
  description: "Convert XML to TOON format instantly. Free online XML to TOON converter that reduces LLM token usage. Perfect for API responses, config files, and data feeds. No signup required.",
  keywords: [
    "XML to TOON",
    "XML converter",
    "TOON format converter",
    "XML to TOON online",
    "free XML converter",
    "XML parser",
    "LLM XML optimizer",
    "reduce AI XML costs",
    "XML transformation",
    "XML data converter",
    "API response optimizer"
  ],
  openGraph: {
    title: "XML to TOON Converter - Optimize XML for LLMs",
    description: "Free online tool to convert XML to TOON format. Reduce LLM token costs for XML data.",
    url: "https://toonconvert.app/xml-to-toon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XML to TOON Converter - Optimize XML for LLMs",
    description: "Free online tool to convert XML to TOON format and reduce token usage.",
  },
  alternates: {
    canonical: "https://toonconvert.app/xml-to-toon",
  },
};

export default function XMLToToonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "XML to TOON Converter",
    "url": "https://toonconvert.app/xml-to-toon",
    "description": "Convert XML to TOON format to reduce LLM token usage",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
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
