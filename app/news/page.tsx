import type { Metadata } from "next";
import NewsCard from "@/components/NewsCard";

export const metadata: Metadata = { 
  title: "Новости и Блог | Надежда Колесникова", 
  description: "Последние события, анонсы релизов и статьи о творческом пути Надежды Колесниковой.",
  openGraph: {
    title: "Новости и Блог | Надежда Колесникова",
    description: "Последние события, анонсы релизов и статьи о творческом пути.",
    url: "https://nadezhda-kolesnikova.ru/news",
    type: "website",
  },
};

interface StrapiTextNode { type: string; text: string; bold?: boolean; italic?: boolean; }
interface StrapiBlockNode { type: string; children?: StrapiTextNode[]; }

interface StrapiNews {
  id: number;
  title: string;
  publishDate: string;
  content?: StrapiBlockNode[];
  mainImage?: { url: string };
}

async function getNews() {
  try { 
    const res = await fetch('http://127.0.0.1:1337/api/news-posts?populate=mainImage&sort=publishDate:desc', { cache: 'no-store' }); 
    return res.ok ? res.json() : null; 
  } catch (e) { return null; }
}

export default async function NewsPage() {
  const response = await getNews();
  const news: StrapiNews[] = response?.data || [];

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-16 my-12 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center mb-16">
        Последние <span className="text-amber-700 italic font-light">новости</span>
      </h1>
      
      {news.length === 0 ? (
        <p className="text-center text-stone-500 italic font-light">Новостей пока нет.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {news.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}