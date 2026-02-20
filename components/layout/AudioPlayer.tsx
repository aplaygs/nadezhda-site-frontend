'use client';

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';

export default function AudioPlayer() {
  // Достаем ТВОИ правильные функции из стора
  const { currentTrack, isPlaying, pauseTrack, resumeTrack } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (isPlaying) {
        // Запускаем с защитой от AbortError
        audioRef.current.play().catch(e => console.error("Ожидание загрузки аудио...", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  if (!currentTrack) return null;

  // Правильная функция переключения
  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4">
        
        <div className="flex-1 text-center md:text-left">
          <p className="font-serif text-lg text-stone-900">{currentTrack.title}</p>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={togglePlay} 
            className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center hover:bg-amber-800 transition shadow-md"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
        
        <div className="flex-1 w-full text-stone-700">
          <audio 
            ref={audioRef} 
            // Используем .url, как ты передавал в PlayTrackButton
            src={currentTrack.url} 
            controls 
            className="w-full h-10 outline-none" 
            // По окончании трека ставим на паузу
            onEnded={() => pauseTrack()} 
          />
        </div>

      </div>
    </div>
  );
}