'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://127.0.0.1:1337/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 text-green-800 p-8 border border-green-200 rounded-2xl text-center">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="text-2xl font-serif mb-2">Сообщение отправлено!</h3>
        <p className="font-light">Мы свяжемся с вами в ближайшее время.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-green-700 underline text-sm tracking-widest uppercase">Написать еще</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
      
      {/* НОВАЯ КРАСИВАЯ КНОПКА ОТПРАВКИ */}
      <button 
        type="submit" 
        disabled={status === 'loading'} 
        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium tracking-widest uppercase text-sm py-5 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(180,83,9,0.2)] hover:shadow-[0_10px_40px_rgba(180,83,9,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {status === 'loading' ? 'Отправка...' : 'Отправить сообщение'}
      </button>

      {status === 'error' && <p className="text-red-500 text-sm text-center">Произошла ошибка. Попробуйте позже.</p>}
    </form>
  );
}