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
    <main className="p-8 max-w-7xl mx-auto my-12 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center mb-20 relative">
        <span className="relative z-10">О <span className="text-amber-700 italic font-light">певице</span></span>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-stone-100 rounded-full -z-10 blur-xl"></div>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Текст (Широкая левая колонка) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white p-10 md:p-16 border border-stone-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] rounded-3xl text-lg text-stone-700 leading-relaxed font-light">
          {artistInfo.fullBio && Array.isArray(artistInfo.fullBio) ? (
            <div className="space-y-6">
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
            <p className="italic text-stone-400">Биография находится в стадии заполнения...</p>
          )}
        </div>

        {/* ИЗМЕНЕНО: Эстетика журнального "Паспарту" (Правая колонка) */}
        {photoUrl && (
          <div className="lg:col-span-5 xl:col-span-4 sticky top-32 perspective-1000">
            <div className="relative group">
               {/* Фоновая плашка (Слегка повернута) */}
               <div className="absolute -inset-2 bg-stone-200 rounded-2xl transform rotate-3 transition-transform duration-500 group-hover:rotate-6 -z-10"></div>
               
               {/* Основное фото с толстой белой рамкой */}
               <div className="relative rounded-xl overflow-hidden shadow-2xl border-[12px] border-white bg-white">
                 <Image 
                   src={photoUrl} alt="Надежда Колесникова" 
                   width={600} height={900} 
                   className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105" 
                   priority 
                 />
                 {/* Легкий градиент поверх фото при наведении */}
                 <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               </div>
            </div>
          </div>
        )}
        
      </div>
    </main>
  );
}