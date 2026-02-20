'use client'; // Эта строчка обязательна, так как кнопка требует взаимодействия с пользователем в браузере

import { usePlayerStore } from '@/store/usePlayerStore';

export default function Home() {
  const { playTrack } = usePlayerStore();

  const handlePlayTest = () => {
    playTrack({
      id: 1,
      title: 'Тестовая мелодия (SoundHelix)',
      // Это просто бесплатная музыкальная заглушка из интернета для теста
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
    });
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Официальный сайт Надежды Колесниковой</h1>
      <p className="mt-4 text-lg text-zinc-400">Скоро здесь будет главная страница...</p>
      
      <button 
        onClick={handlePlayTest}
        className="mt-8 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition shadow-lg flex items-center gap-2"
      >
        ▶ Включить тестовый трек
      </button>
    </main>
  );
}