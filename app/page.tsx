import Image from 'next/image';
import Link from 'next/link';

interface StrapiArtistInfo { fullBio?: string; shortBio?: string; mainPhoto?: { url: string; }; }
interface StrapiEvent { id: number; title: string; date: string; city: string; venue: string; ticketLink?: string; }
interface StrapiNews { id: number; title: string; publishDate: string; mainImage?: { url: string; }; }

async function getArtistInfo() {
  try { const res = await fetch('http://127.0.0.1:1337/api/artist-info?populate=*', { cache: 'no-store' }); return res.ok ? res.json() : null; } catch (e) { return null; }
}
async function getUpcomingEvents() {
  try {
    const res = await fetch('http://127.0.0.1:1337/api/events?sort=date:asc', { cache: 'no-store' });
    if (!res.ok) return null; const json = await res.json(); const now = new Date();
    return (json.data || []).filter((e: StrapiEvent) => new Date(e.date) >= now).slice(0, 2);
  } catch (e) { return null; }
}
async function getLatestNews() {
  try { const res = await fetch('http://127.0.0.1:1337/api/news-posts?sort=publishDate:desc&pagination[limit]=2&populate=mainImage', { cache: 'no-store' }); return res.ok ? res.json() : null; } catch (e) { return null; }
}

export default async function Home() {
  const [artistRes, upcomingEventsData, newsRes] = await Promise.all([getArtistInfo(), getUpcomingEvents(), getLatestNews()]);
  const artistInfo: StrapiArtistInfo = artistRes?.data || {};
  const upcomingEvents: StrapiEvent[] = upcomingEventsData || [];
  
  const photoUrl = artistInfo.mainPhoto?.url ? `http://127.0.0.1:1337${artistInfo.mainPhoto.url}` : null;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-32 my-12 animate-fade-in-up">
      
      <section className="flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8">
          <h1 className="text-6xl md:text-8xl font-serif text-stone-900 leading-tight">
            Надежда <br/><span className="text-amber-800 italic text-5xl md:text-7xl font-light">Колесникова</span>
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed font-light">
            {artistInfo.shortBio || "Добро пожаловать на официальный сайт. Здесь вы найдете расписание концертов, дискографию и последние новости."}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/music" className="bg-stone-900 text-stone-50 px-8 py-3.5 rounded-full font-medium tracking-widest uppercase text-xs hover:bg-amber-700 hover:-translate-y-0.5 transition-all duration-300">
              Слушать музыку
            </Link>
            <Link href="/about" className="bg-transparent border border-stone-300 text-stone-700 px-8 py-3.5 rounded-full font-medium tracking-widest uppercase text-xs hover:border-stone-900 hover:text-stone-900 transition-colors duration-300">
              Подробнее
            </Link>
          </div>
        </div>
        
        {photoUrl && (
          <div className="w-full md:w-5/12">
            <Image 
              src={photoUrl} alt="Надежда Колесникова" 
              width={600} height={800} 
              className="w-full h-auto object-cover rounded-2xl shadow-md" 
              priority 
            />
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-end mb-12 border-b border-stone-200 pb-4">
          <h2 className="text-4xl font-serif text-stone-900">Ближайшие концерты</h2>
          <Link href="/events" className="text-stone-500 hover:text-amber-700 transition uppercase text-sm tracking-widest">Вся афиша &rarr;</Link>
        </div>
        
        {upcomingEvents.length === 0 ? (
          <p className="text-stone-500 font-light italic">В данный момент нет анонсированных концертов.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-stone-50 p-8 border border-stone-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-amber-700 font-bold mb-3 tracking-widest uppercase text-sm">{formatDate(event.date)}</div>
                <h3 className="text-2xl font-serif text-stone-900 mb-2">{event.title}</h3>
                <div className="text-stone-500 mb-6 font-light">г. {event.city}, {event.venue}</div>
                {/* ИЗМЕНЕНО: Дорогая кнопка "Билеты" */}
                {event.ticketLink && (
                  <a href={event.ticketLink} target="_blank" rel="noreferrer" className="inline-block bg-stone-900 text-stone-50 px-8 py-3 rounded-full hover:bg-amber-700 hover:shadow-[0_5px_15px_rgba(180,83,9,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-xs uppercase tracking-widest font-medium">
                    Билеты
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}