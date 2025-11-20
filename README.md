# ToonConvert

A modern, full-featured web application for converting between multiple data formats (JSON, XML, CSV, YAML) and TOON (Token-Oriented Object Notation) format. Built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Multiple Format Support**: Convert JSON, XML, CSV, and YAML to/from TOON
- **Bidirectional Conversion**: Convert to TOON and back to original format
- **Real-time Conversion**: Instant conversion as you type
- **Token Counter**: See exactly how many tokens you're saving
- **Customizable Options**: Choose delimiter, indentation, and formatting preferences
- **Dark/Light Mode**: Full theme support with system preference detection
- **Privacy-First**: All conversions happen locally in your browser
- **Auto-Save**: Automatically saves your work in local storage
- **Responsive Design**: Mobile-first design that works on all devices
- **Test-Driven Development**: Comprehensive test suite with Jest and React Testing Library
- **Blog Section**: Educational content about TOON format

## 📊 What is TOON?

TOON (Token-Oriented Object Notation) is a compact, human-readable data serialization format designed specifically to optimize data exchange with Large Language Models (LLMs). It can reduce token usage by 30-60% compared to JSON.

### Key Benefits:
- **Token Efficient**: 30-60% fewer tokens than JSON
- **LLM Optimized**: Designed for AI comprehension
- **Human Readable**: Clean, intuitive format
- **Fully Reversible**: Convert back to JSON without data loss

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Theme**: next-themes
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React

## 📦 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Testing

Run tests with:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

**All tests are passing! ✅** The project has **77 comprehensive tests** covering:
- JSON ↔ TOON conversion (25 tests)
- XML ↔ TOON conversion (10 tests)
- CSV ↔ TOON conversion (13 tests)
- YAML ↔ TOON conversion (12 tests)
- Token savings calculator (4 tests)
- Edge cases and error handling (10 tests)
- Round-trip conversions for all formats (3 tests)

For detailed test coverage, see [TEST_COVERAGE.md](./TEST_COVERAGE.md)

## 📁 Project Structure

```
toonconvert/
├── src/
│   ├── app/                      # Next.js app router pages
│   │   ├── json-to-toon/        # JSON to TOON converter page
│   │   ├── toon-to-json/        # TOON to JSON converter page
│   │   ├── xml-to-toon/         # XML to TOON converter page
│   │   ├── toon-to-xml/         # TOON to XML converter page
│   │   ├── csv-to-toon/         # CSV to TOON converter page
│   │   ├── toon-to-csv/         # TOON to CSV converter page
│   │   ├── yaml-to-toon/        # YAML to TOON converter page
│   │   ├── toon-to-yaml/        # TOON to YAML converter page
│   │   ├── blog/                # Blog pages
│   │   └── page.tsx             # Homepage
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx           # Site footer
│   │   ├── ThemeToggle.tsx      # Dark/light mode toggle
│   │   └── CodeEditor.tsx       # Code editor component
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAutoSave.ts       # Auto-save to localStorage
│   │   └── useCopyToClipboard.ts # Copy with feedback
│   ├── lib/                     # Utility functions
│   │   ├── toon-converter.ts    # TOON conversion logic
│   │   └── utils.ts             # Helper utilities
│   └── __tests__/               # Test files
│       └── lib/
│           └── toon-converter.test.ts
├── public/                      # Static assets
├── jest.config.js              # Jest configuration
├── jest.setup.js               # Jest setup file
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎨 Design Philosophy

This project follows modern web design principles:

- **Clean & Minimal**: Inspired by wordcounter.net, focusing on usability
- **Professional Design**: Modern look that doesn't feel like a generic AI tool
- **User-Friendly**: Intuitive interface with clear CTAs
- **Accessible**: Proper semantic HTML and ARIA labels
- **Performance**: Optimized for fast load times and smooth interactions

## 🔧 Configuration Options

### TOON Conversion Options

- **Delimiter**: Choose between comma (,), pipe (|), or tab (\t)
- **Indentation**: 2, 4, or 8 spaces
- **Length Markers**: Optional array length indicators

## 📖 Usage Examples

### Converting JSON to TOON

```typescript
import { jsonToToon } from '@/lib/toon-converter';

const json = {
  users: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' }
  ]
};

const toon = jsonToToon(json);
console.log(toon);
// Output:
// users[2]{id,name,role}:
//   1,Alice,admin
//   2,Bob,user
```

### Converting TOON to JSON

```typescript
import { toonToJson } from '@/lib/toon-converter';

const toon = `users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`;

const json = toonToJson(toon);
console.log(json);
// Output: { users: [{ id: 1, name: 'Alice', role: 'admin' }, ...] }
```

### Root-Level Arrays (NEW!)

```typescript
// JSON array to TOON
const jsonArray = [
  { id: 1, productName: 'Laptop', price: 1200 },
  { id: 2, productName: 'Mouse', price: 25.5 }
];

const toon = jsonToToon(jsonArray);
// Output:
// [2]{id,productName,price}:
//   1,Laptop,1200
//   2,Mouse,25.5

// TOON to JSON array
const toonArray = `[2]{id,productName,price}:
  1,Laptop,1200
  2,Mouse,25.5`;

const json = toonToJson(toonArray);
// Output: [{ id: 1, productName: 'Laptop', price: 1200 }, ...]
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## 🎯 Features Implemented

✅ JSON ↔ TOON bidirectional conversion with real-time preview  
✅ XML ↔ TOON bidirectional conversion  
✅ CSV ↔ TOON bidirectional conversion  
✅ YAML ↔ TOON bidirectional conversion  
✅ Token counter showing savings  
✅ Customizable conversion options  
✅ Dark/Light mode with theme persistence  
✅ Auto-save with localStorage  
✅ Copy to clipboard with visual feedback  
✅ Fully responsive mobile-first design  
✅ Loading skeletons for better UX  
✅ Blog section with sample posts  
✅ Comprehensive test suite (25 tests passing)  
✅ Clean, professional UI with shadcn/ui  
✅ Header and footer with navigation  
✅ Copy to clipboard features  
✅ Root-level array support (JSON arrays without parent objects)  

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [TOON Format Specification](https://github.com/toon-format/toon)
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS

---

Built with ❤️ using Test-Driven Development
