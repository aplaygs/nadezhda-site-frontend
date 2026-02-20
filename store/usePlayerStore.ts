import { create } from 'zustand';

// Описываем, как выглядит трек
export interface Track {
  id: number;
  title: string;
  url: string; // Ссылка на сам mp3 файл
}

// Описываем, что умеет наш плеер
interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
}

// Создаем хранилище (store)
export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  pauseTrack: () => set({ isPlaying: false }),
  resumeTrack: () => set({ isPlaying: true }),
}));