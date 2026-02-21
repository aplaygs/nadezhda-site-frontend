'use client';

import { useState } from 'react';
import Image from 'next/image';

interface StrapiTextNode { type: string; text: string; bold?: boolean; italic?: boolean; }
interface StrapiBlockNode { type: string; children?: StrapiTextNode[]; }

interface NewsCardProps {
  post: {
    id: number;
    title: string;
    publishDate: string;
    content?: StrapiBlockNode[];
    mainImage?: { url: string };
  };
}

export default function NewsCard({ post }: NewsCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const imageUrl = post.mainImage?.url ? `http://127.0.0.1:1337${post.mainImage.url}` : null;
  const date = new Date(post.publishDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* Картинка */}
      {imageUrl && (
        <div 
          className="w-full h-56 sm:h-64 relative bg-stone-50 cursor-pointer overflow-hidden group" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src={imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
      )}
      
      {/* Контентная часть */}
      <div className="p-6 sm:p-8">
        <div className="text-amber-700 font-bold mb-3 tracking-widest uppercase text-xs">{date}</div>
        
        <h3 
          className="text-xl sm:text-2xl font-serif text-stone-900 mb-4 cursor-pointer hover:text-amber-700 transition-colors leading-snug"
          onClick={() => setIsOpen(!isOpen)}
        >
          {post.title}
        </h3>

        {/* Скрытый текст (Аккордеон) */}
        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="pb-6 text-stone-600 font-light leading-relaxed space-y-4">
              {post.content && Array.isArray(post.content) ? (
                post.content.map((block, index) => (
                  <p key={index}>
                    {block.children?.map((child, cIndex) => (
                      <span key={cIndex} className={`${child.bold ? 'font-bold' : ''} ${child.italic ? 'italic' : ''}`}>
                        {child.text}
                      </span>
                    ))}
                  </p>
                ))
              ) : (
                <p className="text-stone-400 italic">Текст отсутствует...</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Кнопка "Читать далее" */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-stone-400 hover:text-stone-900 text-xs font-medium uppercase tracking-widest flex items-center gap-2 transition-colors"
        >
          {isOpen ? 'Свернуть' : 'Читать далее'}
          <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>

      </div>
    </div>
  );
}