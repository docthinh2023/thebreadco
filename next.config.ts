const EventEmitter = require('node:events');
EventEmitter.defaultMaxListeners = 20;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};

module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.1.12'],
}

export default nextConfig;
