import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800 relative z-10">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Блок 1: Брендинг */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-serif font-bold tracking-widest uppercase text-stone-50 inline-block">
              Надежда <br/><span className="text-amber-700 font-normal italic">Колесникова</span>
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-xs">
              Официальный сайт исполнительницы народных песен и романсов. Организация концертов и сотрудничество.
            </p>
          </div>

          {/* Блок 2: Навигация */}
          <div>
            <h4 className="text-stone-50 font-medium tracking-widest uppercase text-xs mb-6">Навигация</h4>
            <nav className="flex flex-col space-y-3 text-sm font-light">
              <Link href="/about" className="hover:text-amber-600 transition-colors">О певице</Link>
              <Link href="/music" className="hover:text-amber-600 transition-colors">Музыка</Link>
              <Link href="/videos" className="hover:text-amber-600 transition-colors">Видео</Link>
              <Link href="/events" className="hover:text-amber-600 transition-colors">Афиша</Link>
              <Link href="/news" className="hover:text-amber-600 transition-colors">Новости</Link>
            </nav>
          </div>

          {/* Блок 3: Контакты и Соцсети */}
          <div>
            <h4 className="text-stone-50 font-medium tracking-widest uppercase text-xs mb-6">Связь</h4>
            <div className="flex flex-col space-y-3 text-sm font-light mb-6">
              <a href="mailto:info@nadezhda-kolesnikova.ru" className="hover:text-amber-600 transition-colors">info@nadezhda-kolesnikova.ru</a>
              <Link href="/contacts" className="hover:text-amber-600 transition-colors">Форма обратной связи</Link>
            </div>
            
            {/* Иконки соцсетей (VK, Telegram, YouTube) */}
            <div className="flex gap-4">
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 hover:text-white transition-colors" title="ВКонтакте">
                <span className="font-bold text-xs uppercase tracking-tighter">VK</span>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 hover:text-white transition-colors" title="Telegram">
                <span className="font-bold text-xs uppercase tracking-tighter">TG</span>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 hover:text-white transition-colors" title="YouTube">
                <span className="font-bold text-xs uppercase tracking-tighter">YT</span>
              </a>
            </div>
          </div>
        </div>

        {/* Копирайт и Политика */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-light tracking-wide">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <p>&copy; {currentYear} Надежда Колесникова. Все права защищены.</p>
            <Link href="/privacy" className="hover:text-amber-600 transition-colors underline underline-offset-4 decoration-stone-700">
              Политика конфиденциальности
            </Link>
          </div>
          <p>
            Разработка сайта — <a href="#" className="hover:text-amber-600 transition-colors">Aplaygs</a>
          </p>
        </div>
      </div>
    </footer>
  );
}