import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Надежда Колесникова",
  description: "Политика обработки персональных данных.",
};

export default function PrivacyPage() {
  return (
    <main className="px-5 py-12 md:px-8 md:py-20 max-w-4xl mx-auto animate-fade-in-up">
      <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-12">
        Политика <span className="text-amber-700 italic font-light">конфиденциальности</span>
      </h1>

      <div className="space-y-10 text-stone-700 font-light leading-relaxed text-base md:text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-stone-900">1. Общие положения</h2>
          <p>
            Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных на официальном сайте Надежды Колесниковой (далее — Оператор).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-stone-900">2. Какие данные мы собираем</h2>
          <p>Оператор может обрабатывать следующие персональные данные Пользователя:</p>
          <ul className="list-disc pl-6 space-y-2 border-l-2 border-amber-700/30 ml-2">
            <li>Фамилия, Имя, Отчество;</li>
            <li>Электронный адрес (email);</li>
            <li>Номера телефонов;</li>
            <li>Обезличенные данные о посетителях (в т.ч. файлы «cookie») с помощью сервисов интернет-статистики.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-stone-900">3. Цели обработки данных</h2>
          <p>Цель обработки персональных данных Пользователя — информирование Пользователя посредством отправки электронных писем; предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте; обработка входящих запросов на организацию концертов и сотрудничество.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-stone-900">4. Порядок сбора, хранения и передачи данных</h2>
          <p>Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.</p>
          <p>Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-stone-900">5. Заключительные положения</h2>
          <p>Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты <a href="mailto:info@nadezhda-kolesnikova.ru" className="text-amber-700 hover:underline">info@nadezhda-kolesnikova.ru</a>.</p>
          <p>В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.</p>
        </section>

        <div className="pt-8 border-t border-stone-200">
          <Link href="/" className="text-stone-500 hover:text-amber-700 uppercase tracking-widest text-sm font-medium transition-colors">
            &larr; Вернуться на главную
          </Link>
        </div>
      </div>
    </main>
  );
}