'use client';

import { useState } from 'react';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    city: string;
    venue: string;
    description?: string;
    ticketLink?: string;
  };
  isPast?: boolean;
}

export default function EventCard({ event, isPast }: EventCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className={`bg-white p-8 border border-stone-100 rounded-2xl transition-all duration-300 ${isPast ? 'opacity-70 bg-stone-50' : 'shadow-sm hover:shadow-md'}`}>
      
      <div 
        className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${event.description ? 'cursor-pointer group' : ''}`} 
        onClick={() => event.description && setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className={`${isPast ? 'text-stone-500' : 'text-amber-700'} font-bold mb-3 tracking-widest uppercase text-sm`}>
            {formatDate(event.date)}
          </div>
          <h3 className="text-2xl font-serif text-stone-900 mb-2">{event.title}</h3>
          <div className="text-stone-500 font-light">г. {event.city}, {event.venue}</div>
        </div>

        <div className="flex items-center gap-4 shrink-0 mt-4 md:mt-0">
          {/* ИЗМЕНЕНО: Дорогая кнопка "Билеты" */}
          {!isPast && event.ticketLink && (
            <a 
              href={event.ticketLink} target="_blank" rel="noreferrer" 
              onClick={(e) => e.stopPropagation()} 
              className="inline-block bg-stone-900 text-stone-50 px-8 py-3 rounded-full hover:bg-amber-700 hover:shadow-[0_5px_15px_rgba(180,83,9,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-xs uppercase tracking-widest font-medium"
            >
              Билеты
            </a>
          )}
          
          {event.description && (
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-50 group-hover:bg-stone-100 text-stone-500 transition-colors">
              <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          )}
        </div>
      </div>

      {event.description && (
         <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
           <div className="overflow-hidden">
             <div className="pt-6 border-t border-stone-100 text-stone-600 font-light leading-relaxed whitespace-pre-wrap">
               {event.description}
             </div>
           </div>
         </div>
      )}
    </div>
  );
}