/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  experimental: {
    serverExternalPackages: ['pdf-parse '],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
}

module.exports = nextConfig

