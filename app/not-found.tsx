import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Страница не найдена | Надежда Колесникова",
};

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-5 py-20 text-center animate-fade-in-up relative overflow-hidden">
      
      {/* Огромные фоновые цифры 404 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-serif font-bold text-stone-100/50 -z-10 select-none">
        404
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-6 relative z-10">
        Страница <span className="text-amber-700 italic font-light">не найдена</span>
      </h1>
      
      <p className="text-stone-500 font-light text-lg max-w-md mx-auto mb-12 relative z-10 leading-relaxed">
        Возможно, она была удалена, переименована, или вы просто опечатались в адресе.
      </p>
      
      <Link 
        href="/" 
        className="relative z-10 inline-block bg-stone-900 text-stone-50 px-10 py-4 rounded-full font-medium tracking-widest uppercase text-xs sm:text-sm hover:bg-amber-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        Вернуться на главную
      </Link>
      
    </main>
  );
}