'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Блокировка прокрутки фона при открытом мобильном меню
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { href: '/about', label: 'О певице' },
    { href: '/music', label: 'Музыка' },
    { href: '/videos', label: 'Видео' },
    { href: '/events', label: 'Афиша' },
    { href: '/news', label: 'Новости' },
    { href: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-xl border-b border-stone-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
        
        {/* Логотип (z-[110] чтобы всегда быть поверх открытого меню) */}
        <Link 
          href="/" 
          className="relative z-[110] text-xl md:text-2xl font-serif font-bold tracking-widest uppercase text-stone-900 group"
          onClick={() => setIsOpen(false)}
        >
          Надежда <span className="text-amber-700 font-normal italic group-hover:text-amber-600 transition-colors">Колесникова</span>
        </Link>

        {/* Навигация (ПК) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                pathname === link.href ? 'text-amber-700' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Гамбургер (z-[110] чтобы можно было нажать крестик) */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden relative z-[110] p-2 w-10 h-10 flex items-center justify-center focus:outline-none"
          aria-label="Меню"
        >
          <div className="w-6 flex flex-col gap-1.5 items-end justify-center">
            <span className={`block h-0.5 bg-stone-900 transition-all duration-300 ease-in-out origin-right ${isOpen ? 'w-6 -rotate-45 -translate-y-0.5' : 'w-6'}`}></span>
            <span className={`block h-0.5 bg-stone-900 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 w-0' : 'w-4'}`}></span>
            <span className={`block h-0.5 bg-stone-900 transition-all duration-300 ease-in-out origin-right ${isOpen ? 'w-6 rotate-45 translate-y-0.5' : 'w-5'}`}></span>
          </div>
        </button>

        {/* Мобильное Меню (Оверлей) */}
        {/* ИСПРАВЛЕНИЯ: bg-stone-50 (100% непрозрачность), h-[100dvh], pt-28 (сдвиг вниз) */}
        <div className={`fixed inset-0 w-full h-[100dvh] bg-stone-50 z-[100] flex flex-col justify-start px-8 pt-28 pb-10 overflow-y-auto transition-all duration-300 ease-in-out lg:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
           <nav className="flex flex-col gap-6">
             {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-serif tracking-widest uppercase transition-colors ${pathname === link.href ? 'text-amber-700' : 'text-stone-900 active:text-amber-700'}`}
                >
                  {link.label}
                </Link>
             ))}
           </nav>
           
           <div className="mt-auto pt-12 border-t border-stone-200">
             <p className="text-stone-400 text-xs tracking-widest uppercase mb-4">Сотрудничество</p>
             <a href="tel:+79990000000" className="block text-xl font-serif text-stone-900 mb-2">+7 (999) 000-00-00</a>
             <a href="mailto:info@nadezhda-kolesnikova.ru" className="text-amber-700 text-sm font-light">info@nadezhda-kolesnikova.ru</a>
           </div>
        </div>
      </div>
    </header>
  );
}