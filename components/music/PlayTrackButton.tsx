'use client'; 

import { usePlayerStore } from '@/store/usePlayerStore';

interface StrapiTrack {
  id: number;
  title: string;
  audioFile?: {
    url: string;
  };
}

export default function PlayTrackButton({ track }: { track: StrapiTrack }) {
  const { currentTrack, isPlaying, playTrack, pauseTrack, resumeTrack } = usePlayerStore();
  
  const isThisTrack = currentTrack?.id === track.id;

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Защита от случайных кликов
    if (isThisTrack) {
      isPlaying ? pauseTrack() : resumeTrack();
    } else {
      const audioUrl = track.audioFile?.url 
        ? `http://127.0.0.1:1337${track.audioFile.url}` 
        : ''; // Если файла нет, лучше оставить пустым, чтобы не играла тестовая музыка

      playTrack({
        id: track.id,
        title: track.title,
        url: audioUrl,
      });
    }
  };

  return (
    <button 
      onClick={handlePlay}
      className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 text-xs font-medium tracking-widest uppercase ${
        isThisTrack && isPlaying 
          ? 'bg-amber-700 text-white shadow-md hover:bg-amber-800' // Состояние: Играет
          : 'bg-stone-100 text-stone-700 hover:bg-stone-900 hover:text-white' // Состояние: Пауза / Не играет
      }`}
      title={isThisTrack && isPlaying ? 'Пауза' : 'Слушать'}
    >
      {isThisTrack && isPlaying ? (
        <>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
          <span>Пауза</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          <span>Слушать</span>
        </>
      )}
    </button>
  );
}