'use client';

import { useState } from 'react';
import Image from 'next/image';
import PlayTrackButton from '@/components/music/PlayTrackButton';

// Строгие типы данных вместо any
interface StrapiTrack {
  id: number;
  title: string;
  audioFile?: {
    url: string;
  };
}

interface StrapiRelease {
  id: number;
  title: string;
  releaseDate: string;
  cover?: {
    url: string;
  };
  tracks?: StrapiTrack[];
}

interface ReleaseCardProps {
  release: StrapiRelease;
  index: number;
}

export default function ReleaseCard({ release, index }: ReleaseCardProps) {
  const [isOpen, setIsOpen] = useState(index === 0);

  const coverUrl = release.cover?.url ? `http://127.0.0.1:1337${release.cover.url}` : null;
  const releaseYear = new Date(release.releaseDate).getFullYear();
  const trackCount = release.tracks?.length || 0;

  return (
    <div className="bg-white border border-stone-100 rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
      
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
        
        <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 relative rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-stone-50">
          {coverUrl ? (
            <Image src={coverUrl} alt={release.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400 font-serif text-sm">Без обложки</div>
          )}
        </div>

        <div className="flex-1 w-full text-center md:text-left flex flex-col justify-center mt-2 md:mt-6">
          <p className="text-amber-700 tracking-widest uppercase text-sm font-medium mb-2">
            {releaseYear} • {trackCount} {trackCount === 1 ? 'трек' : trackCount >= 2 && trackCount <= 4 ? 'трека' : 'треков'}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">{release.title}</h2>

          <button className="inline-flex items-center gap-3 self-center md:self-start bg-stone-50 group-hover:bg-stone-100 text-stone-700 px-6 py-3 rounded-full transition-colors text-sm uppercase tracking-widest font-medium">
            {isOpen ? 'Скрыть треки' : 'Показать треки'}
            <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
      </div>

      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-10' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
        <div className="overflow-hidden">
          <div className="flex flex-col border-t border-stone-100 pt-6">
            {release.tracks?.map((track: StrapiTrack, idx: number) => (
              <div key={track.id} className="py-4 border-b border-stone-50 flex items-center justify-between hover:bg-stone-50 transition duration-300 px-4 rounded-xl group/track">
                <div className="flex items-center gap-6">
                  <span className="text-stone-300 font-mono text-sm w-5">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-serif text-stone-800 truncate pr-4">{track.title}</span>
                </div>
                {/* Кнопка показывается плавно при наведении */}
                <div className="opacity-0 group-hover/track:opacity-100 transition duration-300 shrink-0">
                  <PlayTrackButton track={track} />
                </div>
              </div>
            ))}
            {(!release.tracks || release.tracks.length === 0) && (
              <p className="text-stone-400 italic font-light px-4 py-4 text-center md:text-left">Трек-лист формируется...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}