'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isAgreed, setIsAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) return;
    setStatus('loading');
    
    // Склеиваем телефон и сообщение для отправки в Strapi
    const finalMessage = formData.phone 
      ? `Телефон: ${formData.phone}\n\nСообщение:\n${formData.message}` 
      : formData.message;

    const payload = {
      name: formData.name,
      email: formData.email,
      message: finalMessage,
    };

    try {
      const res = await fetch('http://127.0.0.1:1337/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsAgreed(false);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-stone-50 border border-stone-100 rounded-full flex items-center justify-center mb-6 text-amber-700 shadow-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-3xl font-serif text-stone-900 mb-3">Отправлено</h3>
        <p className="text-stone-500 font-light mb-10 max-w-sm">
          Благодарим за ваше обращение! Мы получили письмо и свяжемся с вами в ближайшее время.
        </p>
        <button 
          onClick={() => setStatus('idle')} 
          className="text-amber-700 hover:text-stone-900 uppercase tracking-widest text-xs font-medium transition-colors border-b border-amber-700/30 hover:border-stone-900 pb-1"
        >
          Написать новое сообщение
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
      <div className="space-y-4">
        <input 
          type="text" required placeholder="Ваше имя *"
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
          className="w-full bg-stone-50 border border-stone-200 px-6 py-4 rounded-xl focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition font-light"
        />
        <input 
          type="email" required placeholder="Email *"
          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
          className="w-full bg-stone-50 border border-stone-200 px-6 py-4 rounded-xl focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition font-light"
        />
        <input 
          type="tel" placeholder="Телефон"
          value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
          className="w-full bg-stone-50 border border-stone-200 px-6 py-4 rounded-xl focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition font-light"
        />
        <textarea 
          required placeholder="Текст сообщения *" rows={5}
          value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
          className="w-full bg-stone-50 border border-stone-200 px-6 py-4 rounded-xl focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition font-light resize-none"
        ></textarea>
      </div>
      
      <label className="flex items-start gap-3 cursor-pointer group">
        <input 
          type="checkbox" required 
          checked={isAgreed} onChange={e => setIsAgreed(e.target.checked)} 
          className="mt-1 w-4 h-4 text-amber-700 bg-stone-50 border-stone-300 rounded focus:ring-amber-700 shrink-0 cursor-pointer" 
        />
        <span className="text-sm text-stone-500 font-light group-hover:text-stone-800 transition-colors">
          Я даю согласие на обработку моих персональных данных в соответствии с <Link href="/privacy" target="_blank" className="text-amber-700 hover:underline">Политикой конфиденциальности</Link>.
        </span>
      </label>

      <button 
        type="submit" 
        disabled={status === 'loading' || !isAgreed} 
        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium tracking-widest uppercase text-sm py-5 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(180,83,9,0.2)] hover:shadow-[0_10px_40px_rgba(180,83,9,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {status === 'loading' ? 'Отправка...' : 'Отправить сообщение'}
      </button>

      {status === 'error' && <p className="text-red-500 text-sm text-center">Произошла ошибка. Попробуйте позже.</p>}
    </form>
  );
}