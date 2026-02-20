import { create } from 'zustand';

interface Track {
  id: number;
  title: string;
  url: string;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  closePlayer: () => void; // НОВАЯ ФУНКЦИЯ ЗАКРЫТИЯ
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  pauseTrack: () => set({ isPlaying: false }),
  resumeTrack: () => set({ isPlaying: true }),
  closePlayer: () => set({ currentTrack: null, isPlaying: false }), // Полностью обнуляем плеер
}));