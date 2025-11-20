'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import logo from '@/../public/logo.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [convertersOpen, setConvertersOpen] = useState(false);

  const converters = [
    { label: 'JSON ↔ TOON', items: [
      { label: 'JSON to TOON', href: '/json-to-toon' },
      { label: 'TOON to JSON', href: '/toon-to-json' },
    ]},
    { label: 'XML ↔ TOON', items: [
      { label: 'XML to TOON', href: '/xml-to-toon' },
      { label: 'TOON to XML', href: '/toon-to-xml' },
    ]},
    { label: 'CSV ↔ TOON', items: [
      { label: 'CSV to TOON', href: '/csv-to-toon' },
      { label: 'TOON to CSV', href: '/toon-to-csv' },
    ]},
    { label: 'YAML ↔ TOON', items: [
      { label: 'YAML to TOON', href: '/yaml-to-toon' },
      { label: 'TOON to YAML', href: '/toon-to-yaml' },
    ]},
  ];

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: 'https://blog.toonconvert.app' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-1">
            <Image src={logo} alt="ToonConvert Logo" width={150} height={40} className="h-10 w-auto" />
            {/* <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#EA6A47] to-[#E85534] flex items-center justify-center text-white font-bold">
              TC
            </div> */}
            <span className="hidden font-bold text-xl sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#EA6A47] to-[#E85534]">
              Toon <b className='-ml-1'>Convert</b>
            </span>
    

          </div>
        </Link>        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          
          {/* Converters Dropdown */}
          <div className="relative">
            <button
              onClick={() => setConvertersOpen(!convertersOpen)}
              onMouseEnter={() => setConvertersOpen(true)}
              className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
            >
              Converters
              <ChevronDown size={16} className={`transition-transform ${convertersOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {convertersOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-56 bg-background border rounded-lg shadow-lg py-2"
                onMouseLeave={() => setConvertersOpen(false)}
              >
                {converters.map((group, idx) => (
                  <div key={idx} className="px-2 py-1">
                    <div className="text-xs font-semibold text-muted-foreground px-3 py-1">
                      {group.label}
                    </div>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 text-sm rounded hover:bg-accent transition-colors"
                        onClick={() => setConvertersOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Converters Section */}
            <div className="pt-2 border-t">
              <div className="text-xs font-semibold text-muted-foreground py-2">
                Converters
              </div>
              {converters.map((group, idx) => (
                <div key={idx} className="ml-2 space-y-1">
                  <div className="text-xs font-medium text-muted-foreground py-1">
                    {group.label}
                  </div>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-sm transition-colors hover:text-primary ml-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
