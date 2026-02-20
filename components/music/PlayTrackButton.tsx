'use client'; 

import { usePlayerStore } from '@/store/usePlayerStore';

// 1. Исправляем интерфейс
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

  const handlePlay = () => {
    if (isThisTrack) {
      isPlaying ? pauseTrack() : resumeTrack();
    } else {
      // 2. Достаем ссылку из audioFile, а не из audio
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
    <button 
      onClick={handlePlay}
      className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      title="Слушать"
    >
      {isThisTrack && isPlaying ? 'II' : '▶'}
    </button>
  );
}