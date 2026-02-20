import React from 'react';

// 1. Обновляем интерфейс: меняем rutubeLink/vkVideoLink на единый videoLink
interface StrapiVideo {
  id: number;
  title: string;
  description?: string;
  videoLink?: string; // <-- Вот правильное название поля из базы
  publishDate?: string;
}

async function getVideos() {
  try {
    const res = await fetch('http://127.0.0.1:1337/api/videos?sort=publishDate:desc', {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error("Ошибка API. Статус:", res.status);
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error("Ошибка при запросе API:", error);
    return null;
  }
}

export default async function VideosPage() {
  const response = await getVideos();
  const videos: StrapiVideo[] = response?.data || [];

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center">Видео</h1>
      
      {videos.length === 0 ? (
        <p className="text-center text-zinc-400">Видео пока не загружены...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => {
            // 2. Теперь берем ссылку прямо из поля videoLink
            const embedUrl = video.videoLink;

            return (
              <div key={video.id} className="bg-zinc-900/40 p-5 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition flex flex-col shadow-lg">
                
                {embedUrl ? (
                  <div className="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-950 mb-5 relative">
                    <iframe 
                      src={embedUrl} 
                      frameBorder="0" 
                      allow="clipboard-write; autoplay" 
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500 mb-5">
                    Нет ссылки на видео
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-2 text-zinc-100">{video.title}</h2>
                
                {video.publishDate && (
                  <p className="text-sm text-zinc-500 mb-3 font-medium">
                    {new Date(video.publishDate).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
                
                {video.description && (
                  <p className="text-zinc-400 text-sm leading-relaxed flex-grow">
                    {video.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}