import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toonconvert.app'
  
  const routes = [
    '',
    '/about',
    '/privacy',
    '/terms',
    '/json-to-toon',
    '/toon-to-json',
    '/xml-to-toon',
    '/toon-to-xml',
    '/csv-to-toon',
    '/toon-to-csv',
    '/yaml-to-toon',
    '/toon-to-yaml',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : route.includes('to-') ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.includes('to-') ? 0.9 : 0.8,
  }))
}
