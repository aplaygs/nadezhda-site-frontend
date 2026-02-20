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
      <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center font-medium text-lg">
        Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-stone-500 mb-1">Имя</label>
        <input required type="text" name="name" value={formData.name} onChange={handleChange}
          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition shadow-sm" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-500 mb-1">Email</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-500 mb-1">Телефон</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition shadow-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-500 mb-1">Сообщение</label>
        <textarea required name="message" rows={4} value={formData.message} onChange={handleChange}
          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition shadow-sm resize-none"></textarea>
      </div>

      {status === 'error' && <p className="text-red-500 text-sm">Произошла ошибка отправки.</p>}

      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-stone-900 text-stone-50 font-medium tracking-wide py-4 rounded-lg hover:bg-amber-800 transition disabled:opacity-50 mt-4 shadow-md">
        {status === 'loading' ? 'Отправка...' : 'Отправить сообщение'}
      </button>
    </form>
  );
}