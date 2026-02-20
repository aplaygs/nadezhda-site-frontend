import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, 
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '1337', pathname: '/**' }
    ],
  },
  // Отключаем раздражающие значки Next.js в нижнем углу
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
};

export default nextConfig;