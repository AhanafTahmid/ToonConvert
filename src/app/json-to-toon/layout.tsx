import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to TOON Converter - Free Online Tool",
  description: "Convert JSON to TOON format instantly. Free online JSON to TOON converter that reduces LLM token costs by up to 60%. Fast, secure, client-side processing. No signup required.",
  keywords: [
    "JSON to TOON",
    "JSON converter",
    "TOON format converter",
    "JSON to TOON online",
    "free JSON converter",
    "LLM token optimizer",
    "reduce AI costs",
    "JSON data converter",
    "ChatGPT JSON optimizer",
    "GPT token reducer",
    "AI data format",
    "JSON transformation tool"
  ],
  openGraph: {
    title: "JSON to TOON Converter - Reduce LLM Token Usage by 60%",
    description: "Free online tool to convert JSON to TOON format. Save up to 60% on LLM token costs with instant conversion.",
    url: "https://toonconvert.app/json-to-toon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to TOON Converter - Reduce LLM Token Usage",
    description: "Free online tool to convert JSON to TOON format. Save up to 60% on LLM token costs.",
  },
  alternates: {
    canonical: "https://toonconvert.app/json-to-toon",
  },
};

export default function JSONToToonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON to TOON Converter",
    "url": "https://toonconvert.app/json-to-toon",
    "description": "Convert JSON to TOON format to reduce LLM token usage by up to 60%",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "JSON to TOON conversion",
      "Real-time token savings calculation",
      "Client-side processing",
      "No data collection",
      "Custom delimiter options"
      ]
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
