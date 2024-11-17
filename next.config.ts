import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'vakacoffee.com',
        pathname: '/**',
        protocol: 'https',
        port: ''
      },
      {
        hostname: 'vakacoffee.storage.c2.liara.space',
        pathname: '/**',
        protocol: 'https',
        port: ''
      },
    ]
  }
};

export default nextConfig;
