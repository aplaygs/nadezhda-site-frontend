'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      name: formData.name,
      email: formData.email,
      subject: 'Новое обращение с сайта',
      message: `Телефон: ${formData.phone || 'не указан'}\n\nТекст сообщения:\n${formData.message}`
    };

    try {
      const res = await fetch('http://localhost:1337/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-900/30 text-green-400 p-6 rounded-2xl border border-green-900/50 text-center font-medium text-lg">
        Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Имя</label>
        <input required type="text" name="name" value={formData.name} onChange={handleChange}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Телефон</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Сообщение</label>
        <textarea required name="message" rows={4} value={formData.message} onChange={handleChange}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition resize-none"></textarea>
      </div>

      {status === 'error' && <p className="text-red-400 text-sm">Произошла ошибка отправки.</p>}

      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition disabled:opacity-50 mt-4">
        {status === 'loading' ? 'Отправка...' : 'Отправить сообщение'}
      </button>
    </form>
  );
}