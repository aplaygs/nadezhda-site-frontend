import Image from 'next/image';
import type { Metadata } from "next";
import PlayTrackButton from '@/components/music/PlayTrackButton';

export const metadata: Metadata = {
  title: "Музыка | Надежда Колесникова",
  description: "Официальная дискография, альбомы и синглы.",
};

interface StrapiTrack { id: number; title: string; audioFile?: { url: string; }; }
interface StrapiRelease { id: number; title: string; releaseDate: string; cover?: { url: string; }; tracks?: StrapiTrack[]; }

async function getReleases() {
  try {
    // ВАЖНО: Специальный запрос для Strapi v5 (глубокий парсинг)
    const res = await fetch('http://localhost:1337/api/music-releases?populate[cover]=*&populate[tracks][populate]=audioFile&sort[0]=releaseDate:desc', { cache: 'no-store' });
    return res.ok ? res.json() : null;
  } catch (e) { return null; }
}

export default async function MusicPage() {
  const response = await getReleases();
  const releases: StrapiRelease[] = response?.data || [];

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-32 my-12 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center mb-24">
        Музыкальная <span className="text-amber-700 italic font-light">коллекция</span>
      </h1>

      {releases.length === 0 ? (
        <p className="text-center text-stone-500 font-light italic text-xl">Релизы скоро появятся...</p>
      ) : (
        <div className="space-y-32">
          {releases.map((release) => {
            const coverUrl = release.cover?.url ? `http://localhost:1337${release.cover.url}` : null;
            const releaseYear = new Date(release.releaseDate).getFullYear();

            return (
              <section key={release.id} className="flex flex-col md:flex-row gap-16 items-start group">
                <div className="w-full md:w-1/3 shrink-0 relative">
                  <div className="absolute inset-0 bg-stone-200/50 translate-x-4 translate-y-4 -z-10 transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                  {coverUrl ? (
                    <Image src={coverUrl} alt={release.title} width={500} height={500} className="w-full h-auto shadow-[0_10px_40px_rgba(0,0,0,0.1)]" />
                  ) : (
                    <div className="w-full aspect-square bg-white flex items-center justify-center text-stone-400 font-serif text-xl border border-stone-200 shadow-sm">{release.title}</div>
                  )}
                </div>

                <div className="w-full md:w-2/3 space-y-10 mt-4 md:mt-0">
                  <div className="border-b border-stone-200 pb-6">
                    <h2 className="text-4xl font-serif text-stone-900 mb-2">{release.title}</h2>
                    <p className="text-amber-700 tracking-widest uppercase text-sm font-medium">{releaseYear}</p>
                  </div>
                  <div className="flex flex-col">
                    {release.tracks?.map((track, index) => (
                      <div key={track.id} className="py-5 border-b border-stone-100 flex items-center justify-between hover:bg-white transition duration-300 px-4 -mx-4 rounded-lg group/track">
                        <div className="flex items-center gap-6">
                          <span className="text-stone-300 font-mono text-sm w-4">{String(index + 1).padStart(2, '0')}</span>
                          <span className="text-xl font-serif text-stone-800">{track.title}</span>
                        </div>
                        <div className="opacity-0 group-hover/track:opacity-100 transition duration-300">
                          <PlayTrackButton track={track} />
                        </div>
                      </div>
                    ))}
                    {(!release.tracks || release.tracks.length === 0) && <p className="text-stone-400 italic font-light">Трек-лист формируется...</p>}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}