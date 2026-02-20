import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-zinc-900 text-white py-4 px-8 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold tracking-wider uppercase hover:text-gray-300 transition-colors">
        Надежда Колесникова
      </Link>
      <nav className="flex gap-6 font-medium">
        <Link href="/about" className="hover:text-gray-300 transition-colors">О певице</Link>
        <Link href="/music" className="hover:text-gray-300 transition-colors">Музыка</Link>
        <Link href="/videos" className="hover:text-gray-300 transition-colors">Видео</Link>
        <Link href="/events" className="hover:text-gray-300 transition-colors">Афиша</Link>
        <Link href="/contacts" className="hover:text-white transition">Контакты</Link>
      </nav>
    </header>
  );
}