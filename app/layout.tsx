import Header from "@/components/layout/Header";
import AudioPlayer from "@/components/layout/AudioPlayer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Надежда Колесникова | Официальный сайт певицы",
  description: "Официальный сайт исполнительницы романсов и народных песен Надежды Колесниковой. Расписание концертов, дискография, клипы и последние новости.",
  keywords: ["Надежда Колесникова", "певица", "романсы", "народные песни", "концерты", "афиша", "официальный сайт"],
  openGraph: {
    title: "Надежда Колесникова | Официальный сайт",
    description: "Расписание концертов, дискография, новости и организация выступлений.",
    url: "https://nadezhda-kolesnikova.ru", // Пока ставим заглушку для будущего домена
    siteName: "Надежда Колесникова",
    locale: "ru_RU",
    type: "website",
    // Сюда позже можно будет добавить ссылку на красивую картинку-превью
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pb-24`}>
        <Header />
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
