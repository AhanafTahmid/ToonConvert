import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  const quickLinks = [
    { href: '/json-to-toon', label: 'JSON to TOON' },
    { href: '/xml-to-toon', label: 'XML to TOON' },
    { href: '/csv-to-toon', label: 'CSV to TOON' },
    { href: '/yaml-to-toon', label: 'YAML to TOON' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] w-full px-4 py-16">
      <div className="mx-auto max-w-2xl text-center space-y-8">
        {/* 404 Number */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EA6A47] to-[#E85534]">
            404
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[#EA6A47] to-[#E85534] rounded-full"></div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg">
            Oops! The page you're looking for seems to have been converted to TOON format and vanished into thin air.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <Card className="mt-12">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Search className="h-4 w-4" />
                <span className="text-sm font-medium">Popular Converters</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="ghost"
                    className="h-auto py-3"
                  >
                    <Link href={link.href}>
                      {link.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <p className="text-sm text-muted-foreground pt-4">
          Need help?{' '}
          <Link href="/about" className="text-[#EA6A47] hover:underline font-medium">
            Learn more about ToonConvert
          </Link>
          {' '}or{' '}
          <a 
            href="mailto:contact@toonconvert.app" 
            className="text-[#EA6A47] hover:underline font-medium"
          >
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
}
