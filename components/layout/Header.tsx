'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Получаем текущий путь

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Массив наших ссылок для удобства
  const navLinks = [
    { href: '/about', label: 'О певице' },
    { href: '/music', label: 'Музыка' },
    { href: '/videos', label: 'Видео' },
    { href: '/events', label: 'Афиша' },
    { href: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className="border-b border-stone-200 bg-stone-50/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between relative">
        
        <Link href="/" className="text-2xl font-serif font-bold tracking-widest uppercase text-stone-900" onClick={closeMenu}>
          Надежда <span className="text-amber-700 font-normal italic">Колесникова</span>
        </Link>

        {/* Десктопное меню */}
        <nav className="hidden md:flex gap-8 items-center text-sm tracking-wide uppercase">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`transition duration-300 ${
                  isActive 
                    ? 'text-amber-700 font-bold border-b-2 border-amber-700 pb-1' 
                    : 'text-stone-600 font-medium hover:text-amber-700'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Кнопка мобильного меню */}
        <button 
          className="md:hidden text-stone-600 hover:text-amber-700 p-2 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <span className="text-2xl">✕</span> : <span className="text-3xl">☰</span>}
        </button>
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-stone-50 border-b border-stone-200 absolute top-24 left-0 w-full flex flex-col items-center py-8 gap-6 text-lg font-serif z-40 shadow-xl animate-fade-in-up">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={closeMenu}
                className={`transition ${isActive ? 'text-amber-700 font-bold' : 'text-stone-700 hover:text-amber-700'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}