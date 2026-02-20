'use client';

import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 border border-stone-100 shadow-sm rounded-3xl">
      <h3 className="text-2xl font-serif text-stone-900 mb-2">Подписка на новости</h3>
      <p className="text-stone-500 font-light mb-8 text-sm md:text-base">Узнавайте первыми о новых релизах и концертах.</p>

      {status === 'success' ? (
        <div className="bg-green-50 text-green-700 p-4 border border-green-200 rounded-xl">
          Спасибо за подписку! Мы на связи.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" required placeholder="Ваш Email"
            value={email} onChange={e => setEmail(e.target.value)}
            className="flex-1 border border-stone-200 px-6 py-4 rounded-full bg-stone-50 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition font-light"
          />
          {/* НОВАЯ КРАСИВАЯ КНОПКА ПОДПИСКИ */}
          <button 
            type="submit" 
            disabled={status === 'loading'} 
            className="bg-stone-900 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium tracking-widest uppercase text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 shrink-0"
          >
            {status === 'loading' ? '...' : 'Подписаться'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="text-red-500 text-sm mt-3">Произошла ошибка. Попробуйте позже.</p>}
    </div>
  );
}