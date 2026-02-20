import Image from 'next/image';

// Функция для похода в базу данных
async function getArtistInfo() {
  try {
    // ?populate=* нужен, чтобы Strapi отдал не только текст, но и прикрепленные картинки
    const res = await fetch('http://localhost:1337/api/artist-info?populate=*', {
      cache: 'no-store' // Отключаем кэш, чтобы сразу видеть изменения из админки
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return null;
  }
}

export default async function AboutPage() {
  // Вызываем функцию и ждем данные
  const response = await getArtistInfo();
  
  // В Strapi v5 нужные нам поля лежат внутри объекта data
  const info = response?.data;

  // Если мама еще не заполнила страницу в админке или сервер выключен
  if (!info) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-3xl font-bold">О певице</h1>
        <p className="mt-4 text-zinc-400">Информация загружается или еще не добавлена...</p>
      </main>
    );
  }

  // Достаем ссылку на фото (если оно есть)
  const photoUrl = info.mainPhoto?.url 
    ? `http://localhost:1337${info.mainPhoto.url}` 
    : null;

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">О певице</h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Блок с фото */}
        {photoUrl && (
          <div className="w-full md:w-1/3 shrink-0">
            <Image 
              src={photoUrl} 
              alt="Надежда Колесникова" 
              width={400} 
              height={500} 
              className="rounded-xl shadow-lg object-cover w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Блок с текстом */}
        <div className="w-full md:w-2/3">
          {/* Выводим короткую биографию */}
          <p className="text-xl text-zinc-300 italic border-l-4 border-zinc-500 pl-4 mb-6">
            {info.shortBio}
          </p>
          
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <p className="text-sm text-zinc-500 mb-2">Полная биография (сырые данные из базы):</p>
            {/* Полная биография в Strapi v5 приходит в виде сложного JSON (блоков). 
                Пока мы просто выведем кусок текста, чтобы убедиться, что связь работает. 
                Позже мы поставим специальный рендерер для красивых абзацев. */}
            <p className="text-zinc-300 leading-relaxed">
              {info.fullBio?.[0]?.children?.[0]?.text || "Тут будет большая биография с абзацами..."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}