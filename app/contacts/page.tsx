import type { Metadata } from "next";
import SubscribeForm from '@/components/forms/SubscribeForm';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: "Контакты | Надежда Колесникова",
  description: "Организация концертов, сотрудничество и форма обратной связи.",
};

export default function ContactsPage() {
  return (
    <main className="p-8 max-w-5xl mx-auto space-y-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center">Контакты</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Левая колонка с текстом */}
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

        {/* Правая колонка, куда мы вставили нашу новую форму */}
        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800">
          <h3 className="text-2xl font-bold text-white mb-6">Написать сообщение</h3>
          <ContactForm />
        </div>
      </div>

      <SubscribeForm />

    </main>
  );
}