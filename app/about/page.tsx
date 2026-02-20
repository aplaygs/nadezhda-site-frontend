import Image from 'next/image';
import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "О певице | Надежда Колесникова", 
  description: "Биография, награды и творческий путь Надежды Колесниковой." 
};

interface StrapiTextNode { type: string; text: string; bold?: boolean; italic?: boolean; }
interface StrapiBlockNode { type: string; children?: StrapiTextNode[]; }
interface StrapiArtistInfo { fullBio?: StrapiBlockNode[]; shortBio?: string; mainPhoto?: { url: string; }; }

async function getArtistInfo() {
  try { 
    const res = await fetch('http://127.0.0.1:1337/api/artist-info?populate=*', { cache: 'no-store' }); 
    return res.ok ? res.json() : null; 
  } catch (e) { return null; }
}

export default async function AboutPage() {
  const response = await getArtistInfo();
  const artistInfo: StrapiArtistInfo = response?.data || {};
  
  const photoUrl = artistInfo.mainPhoto?.url ? `http://127.0.0.1:1337${artistInfo.mainPhoto.url}` : null;

  return (
    <main className="p-8 max-w-4xl mx-auto my-12 space-y-16 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center mb-12">
        О <span className="text-amber-700 italic font-light">певице</span>
      </h1>
      
      {photoUrl && (
        <div className="w-full relative rounded-t-full overflow-hidden border-8 border-white shadow-xl mb-16 max-w-md mx-auto">
           <Image src={photoUrl} alt="Надежда Колесникова" width={600} height={800} className="w-full h-auto object-cover" priority />
        </div>
      )}

      <div className="bg-white p-10 md:p-16 border border-stone-100 shadow-sm text-lg text-stone-700 leading-relaxed font-light">
        {artistInfo.fullBio && Array.isArray(artistInfo.fullBio) ? (
          <div className="space-y-4">
            {artistInfo.fullBio.map((block: StrapiBlockNode, index: number) => (
              <p key={index}>
                {block.children?.map((child: StrapiTextNode, cIndex: number) => (
                  <span key={cIndex} className={child.bold ? 'font-bold' : child.italic ? 'italic' : ''}>
                    {child.text}
                  </span>
                ))}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-center italic text-stone-400">Биография находится в стадии заполнения...</p>
        )}
      </div>
    </main>
  );
}