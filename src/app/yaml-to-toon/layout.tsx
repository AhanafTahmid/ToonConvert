import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YAML to TOON Converter - Free Online Tool | Optimize YAML for LLMs",
  description: "Convert YAML to TOON format instantly. Free online YAML to TOON converter that reduces LLM token usage. Perfect for config files, CI/CD, and Kubernetes. No signup required.",
  keywords: [
    "YAML to TOON",
    "YAML converter",
    "TOON format converter",
    "YAML to TOON online",
    "free YAML converter",
    "YAML parser",
    "LLM YAML optimizer",
    "config file converter",
    "YAML data converter",
    "Kubernetes config optimizer"
  ],
  openGraph: {
    title: "YAML to TOON Converter - Optimize YAML for LLMs",
    description: "Free online tool to convert YAML to TOON format. Reduce LLM token costs for YAML data.",
    url: "https://toonconvert.app/yaml-to-toon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YAML to TOON Converter - Optimize YAML for LLMs",
    description: "Free online tool to convert YAML to TOON format and reduce token usage.",
  },
  alternates: {
    canonical: "https://toonconvert.app/yaml-to-toon",
  },
};

export default function YAMLToToonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YAML to TOON Converter",
    "url": "https://toonconvert.app/yaml-to-toon",
    "description": "Convert YAML to TOON format to reduce LLM token usage",
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
