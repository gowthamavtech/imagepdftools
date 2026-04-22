import type { MetadataRoute } from 'next';

const BASE_URL = 'https://squishit.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/compress-png-online`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/convert-image-to-webp`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reduce-image-size`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/compress-jpeg-online`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/convert-png-to-jpeg`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...['png-to-jpeg','jpeg-to-png','png-to-webp','jpeg-to-webp','webp-to-jpeg','webp-to-png','svg-to-png'].map((slug) => ({
      url: `${BASE_URL}/convert/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    {
      url: `${BASE_URL}/refund`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
