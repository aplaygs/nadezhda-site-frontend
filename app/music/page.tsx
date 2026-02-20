import Image from 'next/image';
import PlayTrackButton from '@/components/music/PlayTrackButton';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Дискография | Надежда Колесникова",
  description: "Слушать песни и романсы в исполнении Надежды Колесниковой. Официальная дискография.",
};
// 1. Исправляем audio на audioFile
interface StrapiTrack {
  id: number;
  title: string;
  duration?: string;
  audioFile?: {
    url: string;
  };
}

interface StrapiRelease {
  id: number;
  title: string;
  type: string;
  cover?: {
    url: string;
  };
  tracks?: StrapiTrack[];
}

async function getMusicReleases() {
  try {
    // Железобетонный синтаксис массивов для Strapi v5
    const res = await fetch(
      'http://127.0.0.1:1337/api/music-releases?populate[0]=cover&populate[1]=tracks.audioFile', 
      { cache: 'no-store' }
    );
    
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

export default async function MusicPage() {
  const response = await getMusicReleases();
  const releases: StrapiRelease[] = response?.data || [];

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center">Дискография</h1>
      
      {releases.length === 0 ? (
        <p className="text-center text-zinc-400">Музыка пока не загружена...</p>
      ) : (
        <div className="space-y-16">
          {releases.map((release) => {
            const coverUrl = release.cover?.url ? `http://localhost:1337${release.cover.url}` : null;
            const tracks = release.tracks || [];

            return (
              <div key={release.id} className="flex flex-col md:flex-row gap-8 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition">
                
                <div className="w-full md:w-64 shrink-0">
                  {coverUrl ? (
                    <Image 
                      src={coverUrl} 
                      alt={release.title} 
                      width={300} 
                      height={300} 
                      className="rounded-xl shadow-2xl w-full object-cover aspect-square" 
                    />
                  ) : (
                    <div className="w-full aspect-square bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500">
                      Нет обложки
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{release.title}</h2>
                  <p className="text-zinc-400 mb-6 uppercase text-sm tracking-wider">
                    {release.type}
                  </p>
                  
                  <div className="space-y-1">
                    {tracks.length === 0 ? (
                      <p className="text-sm text-zinc-500">В этом релизе пока нет треков.</p>
                    ) : (
                      tracks.map((track, index) => (
                        <div 
                          key={track.id} 
                          className="flex items-center justify-between p-3 hover:bg-zinc-800/60 rounded-lg transition group"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-zinc-600 w-4 text-sm">{index + 1}</span>
                            <PlayTrackButton track={track} />
                            <span className="font-medium text-zinc-200">{track.title}</span>
                          </div>
                          <span className="text-zinc-500 text-sm">{track.duration || '--:--'}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}