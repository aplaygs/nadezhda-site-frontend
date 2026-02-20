import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // ВАЖНО: Это отключит параноидальную блокировку локальных IP адресов
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '1337', pathname: '/**' }
    ],
  },
};

export default nextConfig;