import Link from 'next/link';
import { ArrowLeft, Github, Heart, Zap, Shield, Code, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About ToonConvert - Free Format Converter for LLM Token Optimization',
  description: 'ToonConvert is a free, open-source tool that converts JSON, XML, CSV, and YAML to TOON format, reducing LLM token usage by 30-60%. Privacy-focused with client-side processing.',
  keywords: [
    'about ToonConvert',
    'TOON format',
    'LLM optimization',
    'token reduction',
    'free converter tool',
    'open source converter',
    'data format optimization',
    'AI cost reduction'
  ],
  openGraph: {
    title: 'About ToonConvert - Free Format Converter',
    description: 'Learn how ToonConvert helps reduce LLM token costs by 30-60% with smart data format conversion.',
    url: 'https://toonconvert.app/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://toonconvert.app/about',
  },
};

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: '30-60% Token Savings',
      description: 'TOON format is specifically designed to reduce token usage in LLM applications while maintaining data integrity.',
    },
    {
      icon: Shield,
      title: '100% Privacy',
      description: 'All conversions happen in your browser. Your data never leaves your device, ensuring complete privacy.',
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Built with modern web technologies and available for the community to review, contribute, and learn from.',
    },
    {
      icon: Users,
      title: 'Developer Friendly',
      description: 'Easy-to-use interface with real-time conversion, copy-to-clipboard features.',
    },
  ];

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              About ToonConvert
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A free, open-source tool for converting data formats to TOON for optimal LLM token efficiency
            </p>
          </div>

          <Separator />

          {/* Mission Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>Our Mission</h2>
                <p>
                  ToonConvert was created to solve a critical challenge in working with Large Language Models (LLMs): 
                  the high cost of tokens. Every character sent to an LLM API costs money, and traditional data formats 
                  like JSON are incredibly verbose and inefficient.
                </p>
                <p>
                  By providing free, easy-to-use tools for converting data to TOON (Token-Oriented Object Notation) 
                  format, we help developers and organizations reduce their LLM API costs by 30-60% while maintaining 
                  full data integrity and readability.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What is TOON Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>What is TOON?</h2>
                <p>
                  TOON (Token-Oriented Object Notation) is a compact, human-readable data serialization format 
                  specifically designed for efficient token usage with Large Language Models. Unlike JSON, which 
                  repeats keys for every object in an array, TOON declares keys once and streams data in rows, 
                  similar to how databases store tabular data.
                </p>
                
                <h3>Key Benefits:</h3>
                <ul>
                  <li><strong>Token Efficient:</strong> 30-60% fewer tokens than JSON</li>
                  <li><strong>Human Readable:</strong> Clean, intuitive format that's easy to understand</li>
                  <li><strong>LLM Optimized:</strong> Designed specifically for AI comprehension</li>
                  <li><strong>Fully Reversible:</strong> Convert back to JSON, XML, CSV, or YAML without data loss</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Why Choose ToonConvert?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#EA6A47] to-[#E85534] flex items-center justify-center text-white mb-4">
                      <feature.icon size={24} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Supported Formats */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>Supported Formats</h2>
                <p>
                  ToonConvert supports bidirectional conversion between TOON and multiple popular data formats:
                </p>
                <div className="grid md:grid-cols-2 gap-4 not-prose">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">JSON ↔ TOON</h3>
                    <p className="text-sm text-muted-foreground">
                      The most common data format for APIs and web applications
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">XML ↔ TOON</h3>
                    <p className="text-sm text-muted-foreground">
                      Legacy data format with full structure preservation
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">CSV ↔ TOON</h3>
                    <p className="text-sm text-muted-foreground">
                      Tabular data format perfect for spreadsheets and databases
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">YAML ↔ TOON</h3>
                    <p className="text-sm text-muted-foreground">
                      Configuration format popular in DevOps and cloud services
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>Technology Stack</h2>
                <p>
                  ToonConvert is built with modern, cutting-edge web technologies to ensure the best performance 
                  and user experience:
                </p>
                <ul>
                  <li><strong>Next.js 16:</strong> React framework for production-grade applications</li>
                  <li><strong>TypeScript:</strong> Type-safe JavaScript for reliable code</li>
                  <li><strong>Tailwind CSS v4:</strong> Utility-first CSS framework</li>
                  <li><strong>shadcn/ui:</strong> Beautiful, accessible UI components</li>
                  <li><strong>Radix UI:</strong> Unstyled, accessible component primitives</li>
                  <li><strong>Jest:</strong> Comprehensive testing with 77 passing tests</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>Privacy & Security</h2>
                <p>
                  We take your privacy seriously. All data conversions happen entirely in your browser using 
                  client-side JavaScript. This means:
                </p>
                <ul>
                  <li>Your data <strong>never</strong> leaves your device</li>
                  <li>We <strong>never</strong> see, store, or have access to your conversions</li>
                  <li>No tracking, analytics, or cookies</li>
                  <li>Works offline once loaded</li>
                  <li>Auto-save uses only your browser's localStorage</li>
                </ul>
                <p>
                  For more details, please read our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Open Source */}
          <Card className="bg-gradient-to-br from-[#EA6A47]/10 to-[#E85534]/10">
            <CardContent className="pt-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <div className="flex items-center gap-2 mb-4">
                  <Github size={32} />
                  <h2 className="m-0">Open Source</h2>
                </div>
                <p>
                  ToonConvert is committed to transparency and community collaboration. Our code is open source 
                  and available on GitHub for anyone to review, contribute to, or learn from.
                </p>
                <div className="flex gap-4 mt-6">
                  <Button asChild>
                    <a href="https://github.com/AhanafTahmid/ToonConvert" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://github.com/AhanafTahmid/ToonConvert/issues" target="_blank" rel="noopener noreferrer">
                      Report an Issue
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creator Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none text-center">
                <h2>Created By</h2>
                <p>
                  ToonConvert is created and maintained by <strong>Ahanaf Tahmid</strong>, a developer passionate 
                  about making AI tools more accessible and cost-effective.
                </p>
                <div className="flex justify-center gap-4 mt-6 not-prose">
                  <Button variant="outline" asChild>
                    <a href="https://github.com/AhanafTahmid" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub Profile
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <Card className="bg-gradient-to-r from-[#EA6A47]/10 to-[#E85534]/10">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <Heart className="h-12 w-12 text-[#EA6A47]" fill="currentColor" />
                </div>
                <h2 className="text-2xl font-bold">Support ToonConvert</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  ToonConvert is free and open source. If you find it useful, consider starring the project on 
                  GitHub, sharing it with others, or contributing to the codebase.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button asChild>
                    <a href="https://github.com/AhanafTahmid/ToonConvert" target="_blank" rel="noopener noreferrer">
                      ⭐ Star on GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="https://blog.toonconvert.app">
                      Read the Blog
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>Get in Touch</h2>
                <p>
                  Have questions, suggestions, or found a bug? We'd love to hear from you!
                </p>
                <ul>
                  <li>Email: <a href="mailto:contact@toonconvert.app">contact@toonconvert.app</a></li>
                  <li>GitHub Issues: <a href="https://github.com/AhanafTahmid/ToonConvert/issues" target="_blank" rel="noopener noreferrer">Report an Issue</a></li>
                  <li>GitHub Discussions: <a href="https://github.com/AhanafTahmid/ToonConvert/discussions" target="_blank" rel="noopener noreferrer">Join the Discussion</a></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
