'use client'; // Важно! Плеер работает только в браузере (на клиенте)

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';

export default function AudioPlayer() {
  // Достаем данные из нашего "мозга"
  const { currentTrack, isPlaying, pauseTrack, resumeTrack } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Следим за нажатием кнопок и управляем настоящим тегом <audio>
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Если трек не выбран — плеер просто невидим
  if (!currentTrack) return null; 

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 text-white p-4 flex items-center justify-between z-50">
      <div className="flex flex-col">
        <span className="font-bold text-lg">{currentTrack.title}</span>
        <span className="text-sm text-zinc-400">Надежда Колесникова</span>
      </div>
      
      <button 
        onClick={isPlaying ? pauseTrack : resumeTrack}
        className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center font-bold hover:bg-gray-200 transition"
      >
        {isPlaying ? 'II' : '▶'}
      </button>
      
      {/* Невидимый технический тег плеера */}
      <audio ref={audioRef} src={currentTrack.url} />
    </div>
  );
}