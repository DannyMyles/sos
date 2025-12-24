import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  // swcMinify: true,
  compress: true,
  experimental: {
    // serverActions: true,
    optimizePackageImports: ['lucide-react'],
  },
  poweredByHeader: false,
};

export default nextConfig;