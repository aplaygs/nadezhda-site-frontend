'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) return;
    setStatus('loading');
    try {
      const res = await fetch('http://127.0.0.1:1337/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { email } })
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setIsAgreed(false);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 border border-stone-100 shadow-sm rounded-3xl relative overflow-hidden">
      <h3 className="text-2xl font-serif text-stone-900 mb-2">Подписка на новости</h3>
      <p className="text-stone-500 font-light mb-8 text-sm md:text-base">Узнавайте первыми о новых релизах и концертах.</p>

      {status === 'success' ? (
        <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center animate-fade-in-up">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-amber-700 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h4 className="text-lg md:text-xl font-serif text-stone-900 mb-2">Спасибо за подписку!</h4>
          <p className="text-stone-500 font-light text-sm">Ваш email успешно добавлен в базу. Мы на связи.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" required placeholder="Ваш Email"
              value={email} onChange={e => setEmail(e.target.value)}
              className="flex-1 border border-stone-200 px-6 py-4 rounded-full bg-stone-50 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition font-light"
            />
            <button 
              type="submit" 
              disabled={status === 'loading' || !isAgreed} 
              className="bg-stone-900 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium tracking-widest uppercase text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none shrink-0"
            >
              {status === 'loading' ? '...' : 'Подписаться'}
            </button>
          </div>
          
          <label className="flex items-start gap-3 cursor-pointer group mt-2 pl-2">
            <input 
              type="checkbox" required 
              checked={isAgreed} onChange={e => setIsAgreed(e.target.checked)} 
              className="mt-0.5 w-3.5 h-3.5 text-amber-700 bg-stone-50 border-stone-300 rounded focus:ring-amber-700 shrink-0 cursor-pointer" 
            />
            <span className="text-xs text-stone-400 font-light group-hover:text-stone-600 transition-colors">
              Согласен(на) на обработку данных согласно <Link href="/privacy" target="_blank" className="text-amber-700 hover:underline">Политике конфиденциальности</Link>.
            </span>
          </label>
        </form>
      )}
      {status === 'error' && <p className="text-red-500 text-sm mt-3 text-center">Произошла ошибка. Попробуйте позже.</p>}
    </div>
  );
}