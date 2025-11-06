import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {},
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*', // Nest.js backend
      },
    ];
  },
};

export default nextConfig;
