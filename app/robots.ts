import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Разрешаем доступ всем поисковикам (Яндекс, Google и т.д.)
      allow: '/',
      disallow: ['/api/'], // Запрещаем роботам индексировать технические запросы
    },
    // Указываем роботам, где лежит наша карта сайта
    sitemap: 'https://nadezhda-kolesnikova.ru/sitemap.xml',
  };
}