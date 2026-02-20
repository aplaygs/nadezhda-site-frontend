import type { Metadata } from "next";

export const metadata: Metadata = { title: "Афиша концертов | Надежда Колесникова", description: "Расписание ближайших выступлений." };

interface StrapiEvent { id: number; title: string; date: string; city: string; venue: string; description?: string; ticketLink?: string; }

async function getEvents() {
  try { const res = await fetch('http://127.0.0.1:1337/api/events?sort[0]=date:asc', { cache: 'no-store' }); return res.ok ? res.json() : null; } catch (e) { return null; }
}

export default async function EventsPage() {
  const response = await getEvents();
  const events: StrapiEvent[] = response?.data || [];
  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) >= now);
  const pastEvents = events.filter(e => new Date(e.date) < now).reverse();
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-16 my-12">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center mb-16">Афиша <span className="text-amber-700 italic font-light">концертов</span></h1>
      
      <section className="space-y-8">
        <h2 className="text-3xl font-serif text-stone-800 border-b border-stone-200 pb-4">Ближайшие выступления</h2>
        {upcomingEvents.length === 0 ? <p className="text-stone-500 italic">Нет анонсированных концертов.</p> : (
          <div className="grid gap-6">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white p-8 border border-stone-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition">
                <div>
                  <div className="text-amber-700 font-bold mb-2 tracking-widest uppercase text-sm">{formatDate(event.date)}</div>
                  <h3 className="text-2xl font-serif text-stone-900 mb-1">{event.title}</h3>
                  <div className="text-stone-500 font-light">г. {event.city}, {event.venue}</div>
                </div>
                {event.ticketLink && <a href={event.ticketLink} target="_blank" rel="noreferrer" className="shrink-0 bg-stone-900 text-stone-50 px-8 py-3 hover:bg-amber-800 transition shadow-sm">Купить билет</a>}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}