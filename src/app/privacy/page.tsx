import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Privacy Policy - ToonConvert',
  description: 'Privacy policy for ToonConvert - Learn how we protect your data and ensure 100% privacy with client-side processing.',
};

export default function PrivacyPolicyPage() {
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
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: November 21, 2025
            </p>
          </div>

          <Separator />

          {/* Content */}
          <Card>
            <CardContent className="pt-6 prose prose-neutral dark:prose-invert max-w-none">
              <h2>Our Commitment to Privacy</h2>
              <p>
                At ToonConvert, we take your privacy seriously. This Privacy Policy explains how we handle your data when you use our conversion tools.
              </p>

              <h2>Data Processing</h2>
              <h3>Client-Side Processing Only</h3>
              <p>
                <strong>All data conversions happen entirely in your browser.</strong> When you use any of our converters (JSON, XML, CSV, YAML ↔ TOON), your data:
              </p>
              <ul>
                <li>Never leaves your device</li>
                <li>Is not transmitted to our servers</li>
                <li>Is not stored on our servers</li>
                <li>Is not shared with any third parties</li>
                <li>Is processed 100% locally using JavaScript in your browser</li>
              </ul>

              <h3>Local Storage</h3>
              <p>
                ToonConvert uses your browser's localStorage to save your work automatically. This data:
              </p>
              <ul>
                <li>Remains on your device only</li>
                <li>Is not accessible to us or any third parties</li>
                <li>Can be cleared at any time using your browser settings</li>
                <li>Persists across browser sessions for your convenience</li>
              </ul>

              <h2>Information We Do Not Collect</h2>
              <p>
                We do <strong>NOT</strong> collect:
              </p>
              <ul>
                <li>Your converted data or files</li>
                <li>Personal information (name, email, address)</li>
                <li>IP addresses or location data</li>
                <li>Device information</li>
                <li>Usage patterns or conversion history</li>
                <li>Any cookies or tracking data</li>
              </ul>

              <h2>Third-Party Services</h2>
              <h3>Hosting</h3>
              <p>
                ToonConvert is hosted on Vercel. While Vercel may collect anonymous analytics about page loads and performance, they do not have access to any data you convert using our tools. Please refer to <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel's Privacy Policy</a> for more information.
              </p>

              <h3>No Analytics or Tracking</h3>
              <p>
                We do not use Google Analytics, Facebook Pixel, or any other tracking or analytics services that would monitor your usage or collect your data.
              </p>

              <h2>Data Security</h2>
              <p>
                Since all processing happens in your browser and we never receive your data, there is no server-side security risk. Your data security depends on:
              </p>
              <ul>
                <li>Your browser's security</li>
                <li>Your device's security</li>
                <li>Your local network security</li>
              </ul>
              <p>
                We recommend keeping your browser and operating system up to date for optimal security.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                ToonConvert does not collect any personal information from anyone, including children under the age of 13. The service can be used by anyone without providing any personal data.
              </p>

              <h2>Open Source</h2>
              <p>
                ToonConvert is committed to transparency. Our source code is available for review, allowing you to verify our privacy claims and see exactly how your data is processed.
              </p>

              <h2>Your Rights</h2>
              <p>
                Since we do not collect or store any of your data, there is no personal information for us to manage, delete, or transfer. You have complete control over your data through your browser's storage settings.
              </p>

              <h3>Clearing Your Data</h3>
              <p>
                To clear data stored in your browser's localStorage:
              </p>
              <ul>
                <li><strong>Chrome/Edge:</strong> Settings → Privacy and security → Clear browsing data → Cookies and site data</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data → Clear Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data → Remove All</li>
              </ul>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:privacy@toonconvert.app">privacy@toonconvert.app</a></li>
                <li>GitHub: <a href="https://github.com/AhanafTahmid/ToonConvert" target="_blank" rel="noopener noreferrer">github.com/AhanafTahmid/ToonConvert</a></li>
              </ul>

              <Separator className="my-8" />

              <h2>Summary</h2>
              <div className="bg-muted p-6 rounded-lg">
                <p className="font-semibold mb-2">In Simple Terms:</p>
                <ul className="space-y-2">
                  <li>✅ Your data stays on your device</li>
                  <li>✅ We never see your conversions</li>
                  <li>✅ No tracking or analytics</li>
                  <li>✅ No personal information collected</li>
                  <li>✅ 100% privacy guaranteed</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
