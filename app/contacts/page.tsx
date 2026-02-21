import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SubscribeForm from "@/components/forms/SubscribeForm";

export const metadata: Metadata = {
  title: "Контакты | Надежда Колесникова",
  description: "Связь с официальным представителем, организация концертов и сотрудничество.",
  openGraph: {
    title: "Контакты | Надежда Колесникова",
    description: "Организация концертов, сотрудничество и связь с представителем.",
    url: "https://nadezhda-kolesnikova.ru/contacts",
    type: "website",
  },
};

export default function ContactsPage() {
  return (
    <main className="p-8 max-w-6xl mx-auto space-y-24 my-12 animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-serif text-stone-900 text-center">
        Связаться <span className="text-amber-700 italic font-light">с нами</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Левая колонка: Информация и Подписка */}
        <div className="space-y-16">
          <div>
            <h2 className="text-3xl font-serif text-stone-900 mb-6">Организация концертов</h2>
            <p className="text-stone-600 font-light leading-relaxed mb-8 text-lg">
              По вопросам организации сольных концертов, участия в фестивалях, корпоративных и частных мероприятиях, а также для предложений о сотрудничестве.
            </p>
            
            <div className="space-y-6 text-lg font-light text-stone-700">
              <div className="flex items-center gap-4 border-b border-stone-200 pb-4">
                <span className="text-amber-700 font-medium uppercase tracking-widest text-sm w-24">Email</span>
                <a href="mailto:info@nadezhda-kolesnikova.ru" className="hover:text-amber-700 transition">info@nadezhda-kolesnikova.ru</a>
              </div>
              <div className="flex items-center gap-4 border-b border-stone-200 pb-4">
                <span className="text-amber-700 font-medium uppercase tracking-widest text-sm w-24">Телефон</span>
                <a href="tel:+79990000000" className="hover:text-amber-700 transition">+7 (999) 000-00-00</a>
              </div>
              <div className="flex items-center gap-4 border-b border-stone-200 pb-4">
                <span className="text-amber-700 font-medium uppercase tracking-widest text-sm w-24">Соцсети</span>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-amber-700 transition">ВКонтакте</a>
                  <a href="#" className="hover:text-amber-700 transition">Telegram</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Блок подписки */}
          <div className="pt-4">
            <SubscribeForm />
          </div>
        </div>

        {/* Правая колонка: Форма обратной связи */}
        <div className="bg-white p-10 md:p-14 border border-stone-100 shadow-[0_8px_40px_rgba(0,0,0,0.04)] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-700 to-amber-500"></div>          <h3 className="text-3xl font-serif text-stone-900 mb-2">Написать сообщение</h3>
          <p className="text-stone-500 font-light mb-8">Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время.</p>
          <ContactForm />
        </div>
        
      </div>
    </main>
  );
}