import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOON to YAML Converter - Free Online Tool | Convert TOON Format to YAML",
  description: "Convert TOON format back to YAML instantly. Free online TOON to YAML converter with client-side processing. Perfect for config files. No signup required.",
  keywords: [
    "TOON to YAML",
    "TOON converter",
    "YAML converter",
    "TOON to YAML online",
    "free TOON converter",
    "convert TOON format",
    "YAML generator",
    "config file generator"
  ],
  openGraph: {
    title: "TOON to YAML Converter - Free Online Tool",
    description: "Convert TOON format back to YAML instantly. Fast, secure, client-side processing.",
    url: "https://toonconvert.app/toon-to-yaml",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOON to YAML Converter - Free Online Tool",
    description: "Convert TOON format back to YAML instantly with our free online tool.",
  },
  alternates: {
    canonical: "https://toonconvert.app/toon-to-yaml",
  },
};

export default function ToonToYAMLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TOON to YAML Converter",
    "url": "https://toonconvert.app/toon-to-yaml",
    "description": "Convert TOON format back to YAML with perfect accuracy",
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
