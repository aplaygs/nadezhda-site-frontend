import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "Афиша концертов | Надежда Колесникова", 
  description: "Расписание ближайших выступлений." 
};

interface StrapiEvent { id: number; title: string; date: string; city: string; venue: string; description?: string; ticketLink?: string; }

async function getEvents() {
  try { const res = await fetch('http://127.0.0.1:1337/api/events?sort=date:asc', { cache: 'no-store' }); return res.ok ? res.json() : null; } catch (e) { return null; }
}

export default async function EventsPage() {
  const response = await getEvents();
  const events: StrapiEvent[] = response?.data || [];
  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) >= now);
  const pastEvents = events.filter(e => new Date(e.date) < now).reverse();
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-16 my-12 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center mb-16">
        Афиша <span className="text-amber-700 italic font-light">концертов</span>
      </h1>
      
      <section className="space-y-8">
        <h2 className="text-3xl font-serif text-stone-800 border-b border-stone-200 pb-4">Ближайшие выступления</h2>
        {upcomingEvents.length === 0 ? <p className="text-stone-500 italic">Нет анонсированных концертов.</p> : (
          <div className="grid gap-6">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white p-8 border border-stone-100 shadow-sm rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition duration-300">
                <div>
                  <div className="text-amber-700 font-bold mb-2 tracking-widest uppercase text-sm">{formatDate(event.date)}</div>
                  <h3 className="text-2xl font-serif text-stone-900 mb-1">{event.title}</h3>
                  <div className="text-stone-500 font-light">г. {event.city}, {event.venue}</div>
                </div>
                {/* НОВАЯ КРАСИВАЯ КНОПКА */}
                {event.ticketLink && (
                  <a href={event.ticketLink} target="_blank" rel="noreferrer" className="shrink-0 bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 text-sm uppercase tracking-widest font-medium">
                    Купить билет
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {pastEvents.length > 0 && (
        <section className="space-y-8 mt-16 opacity-70">
          <h2 className="text-3xl font-serif text-stone-800 border-b border-stone-200 pb-4">Прошедшие концерты</h2>
          <div className="grid gap-6">
            {pastEvents.map(event => (
              <div key={event.id} className="bg-stone-100/50 p-6 border border-stone-200 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="text-stone-500 font-bold mb-2 tracking-widest uppercase text-sm">{formatDate(event.date)}</div>
                  <h3 className="text-xl font-serif text-stone-600 mb-1">{event.title}</h3>
                  <div className="text-stone-500 font-light">г. {event.city}, {event.venue}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}