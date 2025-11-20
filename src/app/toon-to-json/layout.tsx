import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOON to JSON Converter - Free Online Tool | Convert TOON Format to JSON",
  description: "Convert TOON format back to JSON instantly. Free online TOON to JSON converter with client-side processing. Fast, secure, and privacy-focused. No signup required.",
  keywords: [
    "TOON to JSON",
    "TOON converter",
    "JSON converter",
    "TOON to JSON online",
    "free TOON converter",
    "convert TOON format",
    "TOON parser",
    "JSON decoder",
    "data format converter",
    "reverse TOON conversion"
  ],
  openGraph: {
    title: "TOON to JSON Converter - Free Online Tool",
    description: "Convert TOON format back to JSON instantly. Fast, secure, client-side processing.",
    url: "https://toonconvert.app/toon-to-json",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOON to JSON Converter - Free Online Tool",
    description: "Convert TOON format back to JSON instantly with our free online tool.",
  },
  alternates: {
    canonical: "https://toonconvert.app/toon-to-json",
  },
};

export default function ToonToJSONLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TOON to JSON Converter",
    "url": "https://toonconvert.app/toon-to-json",
    "description": "Convert TOON format back to JSON with perfect accuracy",
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
