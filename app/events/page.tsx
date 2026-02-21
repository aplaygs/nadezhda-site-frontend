import type { Metadata } from "next";
import EventCard from "@/components/EventCard";

export const metadata: Metadata = { 
  title: "Афиша концертов | Надежда Колесникова", 
  description: "Расписание предстоящих выступлений, концертов и творческих вечеров Надежды Колесниковой. Билеты онлайн.",
  openGraph: {
    title: "Афиша концертов | Надежда Колесникова",
    description: "Расписание предстоящих выступлений, концертов и творческих вечеров. Билеты онлайн.",
    url: "https://nadezhda-kolesnikova.ru/events",
    type: "website",
  },
};

interface StrapiEvent { id: number; title: string; date: string; city: string; venue: string; description?: string; ticketLink?: string; }

async function getEvents() {
  try { const res = await fetch('http://127.0.0.1:1337/api/events?sort=date:asc', { next: { revalidate: 600 } }); return res.ok ? res.json() : null; } catch (e) { return null; }
}

export default async function EventsPage() {
  const response = await getEvents();
  const events: StrapiEvent[] = response?.data || [];
  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) >= now);
  const pastEvents = events.filter(e => new Date(e.date) < now).reverse();

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-16 my-12 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center mb-16">
        Афиша <span className="text-amber-700 italic font-light">концертов</span>
      </h1>
      
      <section className="space-y-8">
        <h2 className="text-3xl font-serif text-stone-800 border-b border-stone-200 pb-4">Ближайшие выступления</h2>
        {upcomingEvents.length === 0 ? <p className="text-stone-500 italic font-light">Нет анонсированных концертов.</p> : (
          <div className="grid gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {pastEvents.length > 0 && (
        <section className="space-y-8 mt-16">
          <h2 className="text-3xl font-serif text-stone-800 border-b border-stone-200 pb-4">Прошедшие концерты</h2>
          <div className="grid gap-6">
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} isPast={true} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}