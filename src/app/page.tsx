import Link from 'next/link';
import { ArrowRight, Zap, Lock, Gauge, BarChart3, Minimize2, DollarSign, FileJson, FileCode, FileSpreadsheet, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: '30-60% Smaller than JSON',
      description: 'TOON format removes JSON\'s verbose syntax like repeated quotes, braces, and colons, reducing token count significantly.',
    },
    {
      icon: Minimize2,
      title: 'More Compact than XML',
      description: 'Unlike XML\'s heavy opening/closing tags, TOON uses minimal delimiters making it far more token-efficient.',
    },
    {
      icon: BarChart3,
      title: 'Better Structure than CSV',
      description: 'CSV lacks hierarchy and type information. TOON maintains data structure while being more compact.',
    },
    {
      icon: Gauge,
      title: 'Faster Processing than YAML',
      description: 'YAML\'s indentation-based syntax is harder to parse. TOON offers similar readability with simpler parsing.',
    },
    {
      icon: Lock,
      title: 'LLM-Optimized Format',
      description: 'Designed specifically for LLM contexts with clean syntax that\'s easy for both humans and AI to understand.',
    },
    {
      icon: DollarSign,
      title: 'Lower API Costs',
      description: 'Fewer tokens mean lower costs for GPT-4, Claude, and other LLM APIs. Save money on every request.',
    },
  ];

  const converters = [
    {
      icon: FileJson,
      title: 'JSON ↔ TOON',
      description: 'Convert between JSON and TOON format for optimal token efficiency.',
      toLink: '/json-to-toon',
      fromLink: '/toon-to-json',
    },
    {
      icon: FileCode,
      title: 'XML ↔ TOON',
      description: 'Transform XML data to TOON format and back with full structure preservation.',
      toLink: '/xml-to-toon',
      fromLink: '/toon-to-xml',
    },
    {
      icon: FileSpreadsheet,
      title: 'CSV ↔ TOON',
      description: 'Convert CSV files to TOON format for more efficient data representation.',
      toLink: '/csv-to-toon',
      fromLink: '/toon-to-csv',
    },
    {
      icon: FileText,
      title: 'YAML ↔ TOON',
      description: 'Transform YAML configuration to TOON format for reduced token usage.',
      toLink: '/yaml-to-toon',
      fromLink: '/toon-to-yaml',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Convert Any Format to TOON
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EA6A47] to-[#E85534]">
                Save 30-60% on Tokens
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl">
              Free online tools to convert between JSON, XML, CSV, YAML and TOON format. 
              Reduce your LLM token usage and API costs with this efficient data serialization format.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/json-to-toon">
                JSON to TOON
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/toon-to-json">
                TOON to JSON
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#EA6A47] dark:text-[#EA6A47]">30-60%</div>
              <div className="text-sm text-muted-foreground">Token Savings</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#EA6A47] dark:text-[#EA6A47]">100%</div>
              <div className="text-sm text-muted-foreground">Privacy Protected</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">Free</div>
              <div className="text-sm text-muted-foreground">Forever</div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Converters Section */}
      <section className="border-t bg-muted/50 w-full">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                All Available Converters
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
                Convert from any format to TOON and back with full bidirectional support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {converters.map((converter, index) => (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#EA6A47] to-[#E85534] flex items-center justify-center text-white mb-4">
                      <converter.icon size={24} />
                    </div>
                    <CardTitle className="text-xl">{converter.title}</CardTitle>
                    <CardDescription className="text-base">
                      {converter.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3">
                    <Button asChild variant="default" size="sm" className="flex-1">
                      <Link href={converter.toLink}>
                        To TOON
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={converter.fromLink}>
                        From TOON
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose Toon over other formats?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Discover the benefits of using TOON format for your LLM applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#EA6A47] to-[#E85534] flex items-center justify-center text-white mb-4">
                    <feature.icon size={24} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="border-t bg-muted/50 w-full">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                See the Difference
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Real-world example showing token savings
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>JSON Format</CardTitle>
                  <CardDescription>257 tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-background p-4 rounded-lg overflow-x-auto">
{`{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "role": "admin",
      "salary": 75000
    },
    {
      "id": 2,
      "name": "Bob",
      "role": "user",
      "salary": 65000
    },
    {
      "id": 3,
      "name": "Charlie",
      "role": "user",
      "salary": 70000
    }
  ]
}`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>TOON Format</CardTitle>
                  <CardDescription>166 tokens (35% reduction!)</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-background p-4 rounded-lg overflow-x-auto">
{`users[3]{id,name,role,salary}:
  1,Alice,admin,75000
  2,Bob,user,65000
  3,Charlie,user,70000`}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t w-full">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Save Tokens?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Start converting your data to TOON format now and reduce your LLM API costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/json-to-toon">
                  Try JSON Converter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/xml-to-toon">
                  Try XML Converter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
