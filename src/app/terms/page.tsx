import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Terms of Service - ToonConvert',
  description: 'Terms of Service for ToonConvert - Understand the terms and conditions for using our free conversion tools.',
};

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: November 21, 2025
            </p>
          </div>

          <Separator />

          {/* Content */}
          <Card>
            <CardContent className="pt-6 prose prose-neutral dark:prose-invert max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using ToonConvert ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                ToonConvert provides free online tools to convert between various data formats (JSON, XML, CSV, YAML) and TOON (Token-Oriented Object Notation) format. All conversions are performed client-side in your browser.
              </p>

              <h3>2.1 Service Features</h3>
              <ul>
                <li>Bidirectional conversion between multiple formats and TOON</li>
                <li>Real-time conversion as you type</li>
                <li>Token usage calculation</li>
                <li>Auto-save functionality using browser localStorage</li>
                <li>Copy to clipboard and file download features</li>
              </ul>

              <h2>3. Use of Service</h2>
              <h3>3.1 Acceptable Use</h3>
              <p>
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul>
                <li>Use the Service in any way that violates any applicable law or regulation</li>
                <li>Attempt to interfere with the proper functioning of the Service</li>
                <li>Attempt to access any part of the Service that you are not authorized to access</li>
                <li>Use automated scripts or bots to abuse the Service</li>
                <li>Reverse engineer or attempt to extract the source code</li>
              </ul>

              <h3>3.2 Client-Side Processing</h3>
              <p>
                All data processing occurs in your browser. You acknowledge that:
              </p>
              <ul>
                <li>Your data is not transmitted to our servers</li>
                <li>We do not store, monitor, or have access to your converted data</li>
                <li>You are responsible for the security of your local device and browser</li>
              </ul>

              <h2>4. User Content</h2>
              <h3>4.1 Your Data</h3>
              <p>
                You retain all rights to any data or content you input into the Service. Since processing is client-side, we never possess, store, or claim any rights to your data.
              </p>

              <h3>4.2 Responsibility for Content</h3>
              <p>
                You are solely responsible for the content you convert using the Service. You must ensure that:
              </p>
              <ul>
                <li>You have the right to process the data</li>
                <li>The data does not infringe on any third-party rights</li>
                <li>The data complies with applicable laws and regulations</li>
              </ul>

              <h2>5. Intellectual Property</h2>
              <h3>5.1 Service Ownership</h3>
              <p>
                The Service, including its original content, features, and functionality, is owned by ToonConvert and is protected by international copyright, trademark, and other intellectual property laws.
              </p>

              <h3>5.2 Open Source</h3>
              <p>
                ToonConvert may be released under an open-source license. Please refer to the project repository for specific licensing terms.
              </p>

              <h2>6. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul>
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the Service will be uninterrupted or error-free</li>
                <li>Warranties regarding the accuracy or reliability of conversion results</li>
              </ul>

              <h2>7. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, TOONCONVERT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
              </p>
              <ul>
                <li>Your use or inability to use the Service</li>
                <li>Any errors or inaccuracies in conversion results</li>
                <li>Any loss of data stored in your browser's localStorage</li>
                <li>Any unauthorized access to your device or browser</li>
              </ul>

              <h2>8. Accuracy of Conversions</h2>
              <h3>8.1 Best Effort</h3>
              <p>
                While we strive to provide accurate conversions, we cannot guarantee 100% accuracy in all cases. You should:
              </p>
              <ul>
                <li>Verify conversion results before using them in production</li>
                <li>Test conversions with your specific use cases</li>
                <li>Not rely solely on the Service for critical applications without verification</li>
              </ul>

              <h3>8.2 Format Limitations</h3>
              <p>
                Some complex data structures may not convert perfectly due to differences between formats. The Service handles common use cases but may not support all edge cases.
              </p>

              <h2>9. Service Availability</h2>
              <p>
                We do not guarantee that the Service will be available at all times. The Service may be temporarily unavailable due to:
              </p>
              <ul>
                <li>Maintenance or updates</li>
                <li>Technical issues</li>
                <li>Circumstances beyond our control</li>
              </ul>

              <h2>10. Privacy</h2>
              <p>
                Your use of the Service is also governed by our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. Please review our Privacy Policy to understand how we handle your data (or rather, how we don't, since everything is client-side).
              </p>

              <h2>11. Third-Party Services</h2>
              <p>
                The Service may be hosted on third-party platforms (such as Vercel). These platforms have their own terms of service and privacy policies. We are not responsible for the practices of these third parties.
              </p>

              <h2>12. Modifications to Service</h2>
              <p>
                We reserve the right to:
              </p>
              <ul>
                <li>Modify or discontinue the Service at any time</li>
                <li>Add or remove features</li>
                <li>Change supported formats</li>
                <li>Update the user interface</li>
              </ul>
              <p>
                We will make reasonable efforts to notify users of significant changes.
              </p>

              <h2>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>

              <h2>14. Termination</h2>
              <p>
                We may terminate or suspend your access to the Service immediately, without prior notice, if you breach these Terms. Upon termination, your right to use the Service will cease immediately.
              </p>

              <h2>15. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>

              <h2>16. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless ToonConvert and its contributors from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
              </p>
              <ul>
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
              </ul>

              <h2>17. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
              </p>

              <h2>18. Entire Agreement</h2>
              <p>
                These Terms constitute the entire agreement between you and ToonConvert regarding the Service and supersede all prior agreements and understandings.
              </p>

              <h2>19. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:legal@toonconvert.app">legal@toonconvert.app</a></li>
                <li>GitHub: <a href="https://github.com/AhanafTahmid/ToonConvert" target="_blank" rel="noopener noreferrer">github.com/AhanafTahmid/ToonConvert</a></li>
              </ul>

              <Separator className="my-8" />

              <h2>Acknowledgment</h2>
              <div className="bg-muted p-6 rounded-lg">
                <p>
                  By using ToonConvert, you acknowledge that you have read these Terms of Service and agree to be bound by them.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
