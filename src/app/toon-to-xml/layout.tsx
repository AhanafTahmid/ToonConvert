import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOON to XML Converter - Free Online Tool | Convert TOON Format to XML",
  description: "Convert TOON format back to XML instantly. Free online TOON to XML converter with client-side processing. Perfect for restoring XML data. No signup required.",
  keywords: [
    "TOON to XML",
    "TOON converter",
    "XML converter",
    "TOON to XML online",
    "free TOON converter",
    "convert TOON format",
    "XML generator",
    "TOON parser"
  ],
  openGraph: {
    title: "TOON to XML Converter - Free Online Tool",
    description: "Convert TOON format back to XML instantly. Fast, secure, client-side processing.",
    url: "https://toonconvert.app/toon-to-xml",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOON to XML Converter - Free Online Tool",
    description: "Convert TOON format back to XML instantly with our free online tool.",
  },
  alternates: {
    canonical: "https://toonconvert.app/toon-to-xml",
  },
};

export default function ToonToXMLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TOON to XML Converter",
    "url": "https://toonconvert.app/toon-to-xml",
    "description": "Convert TOON format back to XML with perfect accuracy",
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
