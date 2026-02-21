import type { Metadata } from "next";
import ReleaseCard from "@/components/music/ReleaseCard";

export const metadata: Metadata = {
  title: "Музыка и Дискография | Надежда Колесникова",
  description: "Слушайте официальные альбомы, синглы и романсы в исполнении Надежды Колесниковой. Полная музыкальная коллекция.",
  openGraph: {
    title: "Музыка и Дискография | Надежда Колесникова",
    description: "Официальные альбомы, синглы и романсы. Слушать онлайн.",
    url: "https://nadezhda-kolesnikova.ru/music",
    type: "website",
  },
};

interface StrapiTrack { id: number; title: string; audioFile?: { url: string; }; }
interface StrapiRelease { id: number; title: string; releaseDate: string; cover?: { url: string; }; tracks?: StrapiTrack[]; }

async function getReleases() {
  try {
    const res = await fetch('http://127.0.0.1:1337/api/music-releases?populate[0]=cover&populate[1]=tracks.audioFile&sort=releaseDate:desc', { cache: 'no-store' });
    return res.ok ? res.json() : null;
  } catch (e) { return null; }
}

export default async function MusicPage() {
  const response = await getReleases();
  const releases: StrapiRelease[] = response?.data || [];

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-16 my-12 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center mb-8">
        Музыкальная <span className="text-amber-700 italic font-light">коллекция</span>
      </h1>

      {releases.length === 0 ? (
        <p className="text-center text-stone-500 font-light italic text-xl">Релизы скоро появятся...</p>
      ) : (
        <div className="space-y-10">
          {releases.map((release, index) => (
            <ReleaseCard key={release.id} release={release} index={index} />
          ))}
        </div>
      )}
    </main>
  );
}