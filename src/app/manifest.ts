import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ToonConvert - Format Converter for LLM Token Optimization',
    short_name: 'ToonConvert',
    description: 'Free online converter tools for JSON, XML, CSV, and YAML to TOON format. Reduce LLM token usage by 30-60%.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['productivity', 'utilities', 'developer tools'],
  }
}
