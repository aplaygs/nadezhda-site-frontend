import Image from 'next/image';
import Link from 'next/link';

// 1. Создаем строгие чертежи (интерфейсы) для всех данных
interface StrapiArtistInfo {
  shortBio?: string;
  mainPhoto?: {
    url: string;
  };
}

interface StrapiEvent {
  id: number;
  title: string;
  date: string;
  city: string;
  venue: string;
  ticketLink?: string;
}

interface StrapiNews {
  id: number;
  title: string;
  publishDate: string;
  mainImage?: {
    url: string;
  };
}

// 2. Функции получения данных
async function getArtistInfo() {
  try {
    const res = await fetch('http://127.0.0.1:1337/api/artist-info?populate=*', { cache: 'no-store' });
    return res.ok ? res.json() : null;
  } catch (e) { return null; }
}

async function getUpcomingEvents() {
  try {
    const res = await fetch('http://127.0.0.1:1337/api/events?sort[0]=date:asc', { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    const now = new Date();
    // Указываем тип (e: StrapiEvent) вместо any
    const upcoming = (json.data || []).filter((e: StrapiEvent) => new Date(e.date) >= now).slice(0, 2);
    return upcoming;
  } catch (e) { return null; }
}

async function getLatestNews() {
  try {
    const res = await fetch('http://127.0.0.1:1337/api/news-posts?sort[0]=publishDate:desc&pagination[limit]=2&populate=mainImage', { cache: 'no-store' });
    return res.ok ? res.json() : null;
  } catch (e) { return null; }
}

export default async function Home() {
  const [artistRes, upcomingEventsData, newsRes] = await Promise.all([
    getArtistInfo(),
    getUpcomingEvents(),
    getLatestNews()
  ]);

  // 3. Жестко привязываем полученные данные к нашим чертежам
  const artistInfo: StrapiArtistInfo = artistRes?.data || {};
  const upcomingEvents: StrapiEvent[] = upcomingEventsData || [];
  const news: StrapiNews[] = newsRes?.data || [];
  
  const photoUrl = artistInfo.mainPhoto?.url ? `http://localhost:1337${artistInfo.mainPhoto.url}` : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  };

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-24">
      
      {/* БЛОК 1: ПРИВЕТСТВИЕ И ФОТО */}
      <section className="flex flex-col md:flex-row gap-12 items-center mt-8">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Надежда <br/><span className="text-zinc-500">Колесникова</span>
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed border-l-4 border-zinc-700 pl-6">
            {artistInfo.shortBio || "Добро пожаловать на официальный сайт. Здесь вы найдете расписание концертов, дискографию и последние новости."}
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/music" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
              Слушать музыку
            </Link>
            <Link href="/about" className="border border-zinc-600 px-8 py-3 rounded-full font-bold hover:border-white transition">
              Подробнее
            </Link>
          </div>
        </div>
        
        {photoUrl && (
          <div className="w-full md:w-1/2 lg:w-1/3">
            <Image 
              src={photoUrl} 
              alt="Надежда Колесникова" 
              width={600} height={800} 
              className="rounded-3xl shadow-2xl object-cover"
              priority
            />
          </div>
        )}
      </section>

      {/* БЛОК 2: АФИША */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-4">
          <h2 className="text-3xl font-bold">Ближайшие концерты</h2>
          <Link href="/events" className="text-zinc-400 hover:text-white transition">Вся афиша &rarr;</Link>
        </div>
        
        {upcomingEvents.length === 0 ? (
          <p className="text-zinc-500">Пока нет анонсированных концертов.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Слово any удалено, TS сам понимает, что event — это StrapiEvent */}
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
                <div className="text-amber-500 font-bold mb-2">{formatDate(event.date)}</div>
                <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                <div className="text-zinc-400 text-sm mb-4">г. {event.city}, {event.venue}</div>
                {event.ticketLink && (
                  <a href={event.ticketLink} target="_blank" rel="noreferrer" className="text-sm border border-zinc-700 px-4 py-2 rounded-full hover:bg-white hover:text-black transition inline-block">
                    Билеты
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* БЛОК 3: НОВОСТИ */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-4">
          <h2 className="text-3xl font-bold">Новости</h2>
        </div>
        
        {news.length === 0 ? (
          <p className="text-zinc-500">Новостей пока нет.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Слово any удалено, TS сам понимает, что item — это StrapiNews */}
            {news.map((item) => {
              const imgUrl = item.mainImage?.url ? `http://localhost:1337${item.mainImage.url}` : null;
              return (
                <div key={item.id} className="group cursor-pointer">
                  {imgUrl && (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 mb-4">
                      <Image src={imgUrl} alt={item.title} width={600} height={400} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                  )}
                  <div className="text-sm text-zinc-500 mb-2">{formatDate(item.publishDate)}</div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-500 transition">{item.title}</h3>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </main>
  );
}