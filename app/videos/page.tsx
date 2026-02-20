import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "Видео | Надежда Колесникова", 
  description: "Клипы и концертные записи." 
};

// ИСПРАВЛЕНО НА videoLink
interface StrapiVideo { id: number; title: string; videoLink?: string; description?: string; }

async function getVideos() {
  try { 
    const res = await fetch('http://127.0.0.1:1337/api/videos?sort[0]=createdAt:desc', { cache: 'no-store' }); 
    return res.ok ? res.json() : null; 
  } catch (e) { return null; }
}

function getVideoEmbedUrl(url?: string) {
  if (!url) return null;
  if (url.includes('video_ext.php') || url.includes('rutube.ru/play/embed') || url.includes('youtube.com/embed')) return url;
  const ytMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  if (ytMatch && ytMatch[2].length === 11) return `https://www.youtube.com/embed/${ytMatch[2]}`;
  const rutubeMatch = url.match(/rutube\.ru\/video\/([a-zA-Z0-9]+)/);
  if (rutubeMatch && rutubeMatch[1]) return `https://rutube.ru/play/embed/${rutubeMatch[1]}`;
  return url; 
}

export default async function VideosPage() {
  const response = await getVideos();
  const videos: StrapiVideo[] = response?.data || [];

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-16 my-12 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center mb-16">
        Видео <span className="text-amber-700 italic font-light">и клипы</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {videos.map((video) => {
          // ИСПРАВЛЕНО НА videoLink
          const embedUrl = getVideoEmbedUrl(video.videoLink);
          return (
            <div key={video.id} className="bg-white border border-stone-100 shadow-sm overflow-hidden p-4">
              {embedUrl ? (
                <div className="aspect-video w-full bg-stone-100 mb-6">
                  <iframe src={embedUrl} allowFullScreen className="w-full h-full border-0"></iframe>
                </div>
              ) : (
                <div className="aspect-video w-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 mb-6 italic font-light">
                  Видео скоро появится
                </div>
              )}
              <h3 className="text-2xl font-serif text-stone-900 mb-2 px-2">{video.title}</h3>
              {video.description && <p className="text-stone-500 px-2 pb-2 font-light">{video.description}</p>}
            </div>
          );
        })}
      </div>
    </main>
  );
}