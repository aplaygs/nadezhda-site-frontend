import Image from 'next/image';
import type { Metadata } from "next";

// Расширяем интерфейсы для SEO
interface StrapiTextNode { type: string; text: string; bold?: boolean; italic?: boolean; }
interface StrapiBlockNode { type: string; children?: StrapiTextNode[]; }
interface StrapiSEO { metaTitle?: string; metaDescription?: string; shareImage?: { url: string }; }
interface StrapiArtistInfo { fullBio?: StrapiBlockNode[]; shortBio?: string; mainPhoto?: { url: string; }; seo?: StrapiSEO; }

// Общая функция получения данных (Next.js автоматически кеширует и не делает двойной запрос к базе)
async function getArtistInfo() {
  try { 
    // В Strapi v5 используем точечную нотацию для глубокого получения SEO-картинки
    const res = await fetch('http://127.0.0.1:1337/api/artist-info?populate[0]=mainPhoto&populate[1]=seo.shareImage', { cache: 'no-store' }); 
    return res.ok ? res.json() : null; 
  } catch (e) { return null; }
}

// НОВОЕ: Динамическая генерация метатегов из Strapi
export async function generateMetadata(): Promise<Metadata> {
  const response = await getArtistInfo();
  const seo = response?.data?.seo;

  // Если в Strapi не заполнили SEO, отдаем базовые значения
  if (!seo) {
    return {
      title: "О певице | Надежда Колесникова",
      description: "Биография, награды и творческий путь Надежды Колесниковой.",
    };
  }

  // Если заполнили — берем из админки
  return {
    title: seo.metaTitle || "О певице | Надежда Колесникова",
    description: seo.metaDescription,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: seo.shareImage?.url ? [`http://127.0.0.1:1337${seo.shareImage.url}`] : [],
    },
  };
}

export default async function AboutPage() {
  const response = await getArtistInfo();
  const artistInfo: StrapiArtistInfo = response?.data || {};
  const photoUrl = artistInfo.mainPhoto?.url ? `http://127.0.0.1:1337${artistInfo.mainPhoto.url}` : null;

  return (
    <main className="p-8 max-w-6xl mx-auto my-12 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center mb-16">
        О <span className="text-amber-700 italic font-light">певице</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-8 bg-white p-10 lg:p-12 border border-stone-100 rounded-xl text-lg text-stone-700 leading-relaxed font-light">
          {artistInfo.fullBio && Array.isArray(artistInfo.fullBio) ? (
            <div className="space-y-6">
              {artistInfo.fullBio.map((block: StrapiBlockNode, index: number) => (
                <p key={index}>
                  {block.children?.map((child: StrapiTextNode, cIndex: number) => (
                    <span key={cIndex} className={`${child.bold ? 'font-bold' : ''} ${child.italic ? 'italic' : ''}`}>
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

        {photoUrl && (
          <div className="lg:col-span-4 sticky top-32">
             <Image 
               src={photoUrl} alt="Надежда Колесникова" 
               width={600} height={900} 
               className="w-full h-auto object-cover rounded-xl shadow-sm border border-stone-100" 
               priority 
             />
          </div>
        )}
      </div>
    </main>
  );
}