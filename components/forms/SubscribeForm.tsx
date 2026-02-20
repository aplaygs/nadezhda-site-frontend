'use client';

import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
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
    <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center shadow-sm">
      <h3 className="text-2xl font-serif text-stone-900 mb-2">Оставайтесь на связи</h3>
      <p className="text-stone-500 mb-6 font-light">Подпишитесь на рассылку, чтобы первыми узнавать о новых песнях и концертах.</p>
      
      {status === 'success' ? (
        <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 font-medium">
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
            className="flex-1 bg-stone-50 border border-stone-300 rounded-full px-6 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-700 transition shadow-sm"
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="bg-stone-900 text-stone-50 font-medium tracking-wide px-8 py-3 rounded-full hover:bg-amber-800 transition disabled:opacity-50 shadow-sm"
          >
            {status === 'loading' ? 'Отправка...' : 'Подписаться'}
          </button>
        </form>
      )}
      
      {status === 'error' && (
        <p className="text-red-500 text-sm mt-4">Произошла ошибка. Попробуйте еще раз.</p>
      )}
    </div>
  );
}