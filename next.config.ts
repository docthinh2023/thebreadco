const EventEmitter = require('node:events');
EventEmitter.defaultMaxListeners = 20;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Tell webpack to ignore 'child_process' on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false, // Often needed alongside child_process
        path: false,
      };
    }
    return config;
    
  },
};

module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.1.12'],
}

export default nextConfig;
