'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';

// Помощник для форматирования времени (например: 01:23)
const formatTime = (time: number) => {
  if (isNaN(time) || time < 0) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function AudioPlayer() {
  const { currentTrack, isPlaying, pauseTrack, resumeTrack, closePlayer } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  // Правильная функция шаринга прямой ссылки на аудиофайл
  const handleShare = async () => {
    if (!currentTrack) return;
    try {
      await navigator.clipboard.writeText(currentTrack.url);
      alert('Прямая ссылка на аудиофайл скопирована в буфер обмена!');
    } catch (e) {
      console.error('Ошибка копирования', e);
    }
  };

  // Правильная функция принудительного скачивания файла
  const handleDownload = async () => {
    if (!currentTrack || isDownloading) return;
    setIsDownloading(true);
    try {
      const response = await fetch(currentTrack.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${currentTrack.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert("Не удалось скачать файл. Попробуйте позже.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!currentTrack) return null;

  const togglePlay = () => isPlaying ? pauseTrack() : resumeTrack();
  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-6 md:gap-10">
        
        {/* Кнопка Play/Pause (Идеально по центру) */}
        <button 
          onClick={togglePlay} 
          className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-stone-900 text-white hover:bg-amber-700 transition-colors focus:outline-none"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        {/* Информация о треке */}
        <div className="hidden sm:block w-48 flex-shrink-0 overflow-hidden">
          <p className="font-serif text-stone-900 truncate">{currentTrack.title}</p>
          <p className="text-xs text-stone-500 uppercase tracking-widest mt-0.5">Надежда Колесникова</p>
        </div>

        {/* Центральная часть: Шкала прогресса с таймерами */}
        <div className="flex-1 flex items-center gap-4 text-xs font-mono text-stone-400">
           <span>{formatTime(progress)}</span>
           
           <div className="relative flex-1 h-1.5 bg-stone-100 rounded-full cursor-pointer group">
              <div className="absolute top-0 left-0 h-full bg-amber-700 rounded-full" style={{ width: `${progressPercent}%` }}>
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-1/2"></div>
              </div>
              <input 
                type="range" min={0} max={duration || 100} value={progress} 
                onChange={handleSeek} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
           </div>

           <span>{formatTime(duration)}</span>
        </div>

        {/* Кнопки управления */}
        <div className="flex items-center gap-5 flex-shrink-0">
           
           {/* Поделиться */}
           <button onClick={handleShare} className="text-stone-400 hover:text-stone-900 transition-colors" title="Копировать ссылку">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
           </button>
           
           {/* Скачать */}
           <button onClick={handleDownload} disabled={isDownloading} className="text-stone-400 hover:text-stone-900 transition-colors disabled:opacity-50" title="Скачать трек">
             {isDownloading ? (
               <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
             ) : (
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
             )}
           </button>

           <div className="w-px h-5 bg-stone-200 mx-1"></div>

           {/* Закрыть */}
           <button onClick={closePlayer} className="text-stone-400 hover:text-red-700 transition-colors p-1" title="Закрыть">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
           </button>
        </div>

        <audio ref={audioRef} src={currentTrack.url} className="hidden" onTimeUpdate={handleTimeUpdate} onEnded={closePlayer} />
      </div>
    </div>
  );
}