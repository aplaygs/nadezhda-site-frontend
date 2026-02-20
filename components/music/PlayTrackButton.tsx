'use client'; 

import { usePlayerStore } from '@/store/usePlayerStore';

// Твой правильный интерфейс для Strapi
interface StrapiTrack {
  id: number;
  title: string;
  audioFile?: {
    url: string;
  };
}

export default function PlayTrackButton({ track }: { track: StrapiTrack }) {
  // Твои правильные методы из стора
  const { currentTrack, isPlaying, playTrack, pauseTrack, resumeTrack } = usePlayerStore();
  
  const isThisTrack = currentTrack?.id === track.id;

  const handlePlay = () => {
    if (isThisTrack) {
      isPlaying ? pauseTrack() : resumeTrack();
    } else {
      // Твоя правильная склейка ссылки
      const audioUrl = track.audioFile?.url 
        ? `http://localhost:1337${track.audioFile.url}` 
        : 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

      playTrack({
        id: track.id,
        title: track.title,
        url: audioUrl,
      });
    }
  };

  return (
    // Мой новый светлый дизайн кнопки
    <button 
      onClick={handlePlay}
      className="bg-stone-100 hover:bg-amber-700 hover:text-white text-stone-800 px-6 py-3 rounded-full transition shadow-sm font-medium tracking-wide flex items-center gap-2"
      title={isThisTrack && isPlaying ? 'Пауза' : 'Слушать'}
    >
      {isThisTrack && isPlaying ? '⏸ Пауза' : '▶ Слушать'}
    </button>
  );
}