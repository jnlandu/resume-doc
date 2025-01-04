/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  experimental: {
    serverExternalPackages: ['pdf-parse '],
  },
  "typeRoots": [
      "./node_modules/@types",
      "./src/types"
    ],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
}

module.exports = nextConfig

