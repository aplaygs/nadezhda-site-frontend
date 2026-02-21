import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
    url: "https://nadezhda-kolesnikova.ru", 
    siteName: "Надежда Колесникова",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 min-h-screen flex flex-col`}>
        <Header />
        
        <div className="grow pb-24"> 
          {children}
        </div>
        
        <Footer />
        <AudioPlayer />
      </body>
    </html>
  );
}