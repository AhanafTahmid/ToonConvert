import Link from 'next/link';
import Image from 'next/image';
import logo from '@/../public/logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <Image src={logo} alt="ToonConvert Logo" width={150} height={40} className="h-10 w-auto" />
              {/* <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#EA6A47] to-[#E85534] flex items-center justify-center text-white font-bold">
                TC
              </div> */}
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#EA6A47] to-[#E85534]">
                Toon <b className='-ml-1'>Convert</b>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Convert Any Format to TOON.
            </p>
          </div>

          {/* Pages & Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Pages</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="https://blog.toonconvert.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools/Converters */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Converters</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/json-to-toon" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  JSON to TOON
                </Link>
              </li>
              <li>
                <Link href="/toon-to-json" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  TOON to JSON
                </Link>
              </li>
              <li>
                <Link href="/xml-to-toon" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  XML to TOON
                </Link>
              </li>
              <li>
                <Link href="/toon-to-xml" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  TOON to XML
                </Link>
              </li>
              <li>
                <Link href="/csv-to-toon" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  CSV to TOON
                </Link>
              </li>
              <li>
                <Link href="/toon-to-csv" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  TOON to CSV
                </Link>
              </li>
              <li>
                <Link href="/yaml-to-toon" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  YAML to TOON
                </Link>
              </li>
              <li>
                <Link href="/toon-to-yaml" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  TOON to YAML
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="https://x.com/ahanaf101_" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                Made by Ahanaf
              </Link>
              <Link href="mailto:contact@toonconvert.app" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
