import Image from 'next/image';
import Link from 'next/link';
import NewsCard from '@/components/NewsCard';
import type { Metadata } from "next";

interface StrapiTextNode { type: string; text: string; bold?: boolean; italic?: boolean; }
interface StrapiBlockNode { type: string; children?: StrapiTextNode[]; }
interface StrapiSEO { metaTitle?: string; metaDescription?: string; shareImage?: { url: string }; }

interface StrapiArtistInfo { fullBio?: string; shortBio?: string; mainPhoto?: { url: string; }; seo?: StrapiSEO; }
interface StrapiEvent { id: number; title: string; date: string; city: string; venue: string; ticketLink?: string; }
interface StrapiNews { id: number; title: string; publishDate: string; content?: StrapiBlockNode[]; mainImage?: { url: string; }; }

async function getArtistInfo() {
  try { const res = await fetch('http://127.0.0.1:1337/api/artist-info?populate[0]=mainPhoto&populate[1]=seo.shareImage', { next: { revalidate: 3600 } }); return res.ok ? res.json() : null; } catch (e) { return null; }
}
async function getUpcomingEvents() {
  try {
    const res = await fetch('http://127.0.0.1:1337/api/events?sort=date:asc', { next: { revalidate: 600 } });
    if (!res.ok) return null; const json = await res.json(); const now = new Date();
    return (json.data || []).filter((e: StrapiEvent) => new Date(e.date) >= now).slice(0, 2);
  } catch (e) { return null; }
}
async function getLatestNews() {
  try { const res = await fetch('http://127.0.0.1:1337/api/news-posts?sort=publishDate:desc&pagination[limit]=2&populate=mainImage', { next: { revalidate: 3600 } }); return res.ok ? res.json() : null; } catch (e) { return null; }
}

export async function generateMetadata(): Promise<Metadata> {
  const response = await getArtistInfo();
  const seo = response?.data?.seo;

  return {
    title: seo?.metaTitle || "Надежда Колесникова | Официальный сайт",
    description: seo?.metaDescription || "Официальный сайт исполнительницы народных песен и романсов Надежды Колесниковой.",
    openGraph: {
      title: seo?.metaTitle || "Надежда Колесникова",
      description: seo?.metaDescription || "Официальный сайт певицы.",
      images: seo?.shareImage?.url ? [`http://127.0.0.1:1337${seo.shareImage.url}`] : [],
      url: "https://nadezhda-kolesnikova.ru",
      type: "website",
    },
  };
}

export default async function Home() {
  const [artistRes, upcomingEventsData, newsRes] = await Promise.all([getArtistInfo(), getUpcomingEvents(), getLatestNews()]);
  const artistInfo: StrapiArtistInfo = artistRes?.data || {};
  const upcomingEvents: StrapiEvent[] = upcomingEventsData || [];
  const latestNews: StrapiNews[] = newsRes?.data || [];
  
  const photoUrl = artistInfo.mainPhoto?.url ? `http://127.0.0.1:1337${artistInfo.mainPhoto.url}` : null;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

  return (
    <main className="px-5 py-12 md:px-8 md:py-20 max-w-7xl mx-auto space-y-24 md:space-y-32 animate-fade-in-up">
      
      {/* Секция: Герой */}
      <section className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        <div className="flex-1 space-y-8 text-center lg:text-left z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-stone-900 leading-[1.1] tracking-tight">
            Надежда <br className="hidden lg:block"/><span className="text-amber-800 italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light">Колесникова</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
            {artistInfo.shortBio || "Добро пожаловать на официальный сайт. Здесь вы найдете расписание концертов, дискографию и последние новости."}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <Link href="/music" className="bg-stone-900 text-stone-50 px-10 py-4 rounded-full font-medium tracking-widest uppercase text-xs sm:text-sm hover:bg-amber-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center">
              Слушать музыку
            </Link>
            <Link href="/about" className="bg-transparent border border-stone-300 text-stone-700 px-10 py-4 rounded-full font-medium tracking-widest uppercase text-xs sm:text-sm hover:border-stone-900 hover:text-stone-900 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center">
              Подробнее
            </Link>
          </div>
        </div>
        
        {photoUrl && (
          <div className="w-full sm:w-3/4 lg:w-5/12 mx-auto lg:mx-0 relative">
            <div className="absolute -inset-4 bg-stone-200/50 rounded-[2.5rem] -z-10 transform rotate-3 scale-105 hidden lg:block"></div>
            <Image src={photoUrl} alt="Надежда Колесникова" width={600} height={800} className="w-full h-auto object-cover rounded-3xl shadow-2xl" priority />
          </div>
        )}
      </section>

      {/* Секция: Афиша */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 md:mb-12 border-b border-stone-200 pb-4">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Ближайшие концерты</h2>
          <Link href="/events" className="text-stone-500 hover:text-amber-700 transition-colors uppercase text-xs font-medium tracking-widest">Вся афиша &rarr;</Link>
        </div>
        
        {upcomingEvents.length === 0 ? (
          <p className="text-stone-500 font-light italic text-center sm:text-left">В данный момент нет анонсированных концертов.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white p-6 md:p-8 border border-stone-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full justify-between gap-6 group">
                <div>
                  <div className="text-amber-700 font-bold mb-3 tracking-widest uppercase text-xs">{formatDate(event.date)}</div>
                  <h3 className="text-xl md:text-2xl font-serif text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">{event.title}</h3>
                  <div className="text-stone-500 font-light text-sm md:text-base">г. {event.city}, {event.venue}</div>
                </div>
                {event.ticketLink && (
                  <div className="mt-auto pt-4">
                    <a href={event.ticketLink} target="_blank" rel="noreferrer" className="block text-center bg-stone-50 border border-stone-200 text-stone-700 px-8 py-3.5 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-300 text-xs uppercase tracking-widest font-medium">
                      Билеты
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Секция: Новости */}
      {latestNews.length > 0 && (
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 md:mb-12 border-b border-stone-200 pb-4">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Блог и новости</h2>
            <Link href="/news" className="text-stone-500 hover:text-amber-700 transition-colors uppercase text-xs font-medium tracking-widest">Все новости &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            {latestNews.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

    </main>
  );
}