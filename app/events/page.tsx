import React from 'react';

// 1. Описываем структуру Концерта из базы данных
interface StrapiEvent {
  id: number;
  title: string;
  date: string; // Дата в формате ISO
  city: string;
  venue: string;
  description?: string;
  ticketLink?: string;
}

// 2. Функция получения всех концертов (сортируем по дате от ближайших к дальним)
async function getEvents() {
  try {
    const res = await fetch('http://127.0.0.1:1337/api/events?sort[0]=date:asc', {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error("Ошибка API. Статус:", res.status);
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error("Ошибка при запросе API:", error);
    return null;
  }
}

export default async function EventsPage() {
  const response = await getEvents();
  const allEvents: StrapiEvent[] = response?.data || [];

  // 3. Умная сортировка: разбиваем на будущие и прошедшие
  const now = new Date();
  
  const upcomingEvents = allEvents.filter(event => new Date(event.date) >= now);
  // Прошедшие переворачиваем, чтобы самый недавний прошлый концерт был сверху
  const pastEvents = allEvents.filter(event => new Date(event.date) < now).reverse();

  // Функция для красивого форматирования даты (Например: "15 ноября 2026")
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center">Афиша</h1>

      {/* БЛОК 1: ПРЕДСТОЯЩИЕ КОНЦЕРТЫ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-zinc-100 border-b border-zinc-800 pb-2">
          Предстоящие выступления
        </h2>
        
        {upcomingEvents.length === 0 ? (
          <p className="text-zinc-400 bg-zinc-900/30 p-6 rounded-xl border border-zinc-800/50">
            В данный момент нет анонсированных концертов. Следите за обновлениями!
          </p>
        ) : (
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-700 hover:border-zinc-500 transition shadow-lg flex flex-col md:flex-row gap-6 md:items-center justify-between">
                
                <div className="flex-1">
                  <div className="text-amber-500 font-bold text-xl mb-1">{formatDate(event.date)}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                  <div className="text-zinc-300 font-medium text-lg mb-2">
                    📍 г. {event.city}, {event.venue}
                  </div>
                  {event.description && (
                    <p className="text-zinc-400 text-sm mt-3">{event.description}</p>
                  )}
                </div>

                {event.ticketLink && (
                  <div className="shrink-0 mt-4 md:mt-0">
                    <a 
                      href={event.ticketLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition text-center w-full md:w-auto"
                    >
                      Купить билет
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* БЛОК 2: АРХИВ (ПРОШЕДШИЕ) */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-zinc-500 border-b border-zinc-800 pb-2">
          Прошедшие события
        </h2>
        
        {pastEvents.length === 0 ? (
          <p className="text-zinc-600">Архив пуст.</p>
        ) : (
          <div className="space-y-4 opacity-75">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-zinc-950 p-5 rounded-xl border border-zinc-800/50 flex flex-col md:flex-row gap-4 md:items-center justify-between grayscale hover:grayscale-0 transition duration-500">
                <div>
                  <div className="text-zinc-500 font-medium mb-1">{formatDate(event.date)}</div>
                  <h3 className="text-lg font-bold text-zinc-300">{event.title}</h3>
                  <div className="text-zinc-500 text-sm mt-1">г. {event.city}, {event.venue}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}