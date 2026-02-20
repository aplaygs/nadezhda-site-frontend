'use client';

import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // В Strapi POST-запросы должны быть обернуты в объект "data"
      const res = await fetch('http://localhost:1337/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { email } }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 text-center">
      <h3 className="text-2xl font-bold text-white mb-2">Оставайтесь на связи</h3>
      <p className="text-zinc-400 mb-6">Подпишитесь на рассылку, чтобы первыми узнавать о новых песнях и концертах.</p>
      
      {status === 'success' ? (
        <div className="bg-green-900/30 text-green-400 p-4 rounded-xl border border-green-900/50 font-medium">
          Спасибо за подписку! Ваш email успешно добавлен.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-6 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition"
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Отправка...' : 'Подписаться'}
          </button>
        </form>
      )}
      
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-4">Произошла ошибка. Попробуйте еще раз.</p>
      )}
    </div>
  );
}