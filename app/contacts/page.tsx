'use client';

import { useState } from 'react';
import SubscribeForm from '@/components/forms/SubscribeForm';

export default function ContactsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // ХИТРОСТЬ: Формируем правильные данные для Strapi
    // Телефон приклеиваем в начало самого сообщения, а subject ставим по умолчанию
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
        body: JSON.stringify({ data: payload }), // Отправляем наш payload, а не formData
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

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center">Контакты</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Организация концертов</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              По вопросам организации выступлений, интервью и сотрудничества, пожалуйста, воспользуйтесь формой обратной связи или свяжитесь с нами напрямую.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-zinc-300">
                <span className="text-2xl">✉</span>
                <a href="mailto:info@nadezhda.ru" className="hover:text-white transition">info@nadezhda.ru</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800">
          <h3 className="text-2xl font-bold text-white mb-6">Написать сообщение</h3>
          
          {status === 'success' ? (
            <div className="bg-green-900/30 text-green-400 p-6 rounded-2xl border border-green-900/50 text-center font-medium text-lg">
              Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.
            </div>
          ) : (
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
          )}
        </div>
      </div>

      <SubscribeForm />

    </main>
  );
}