/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/jadewii.com',
  assetPrefix: '/jadewii.com',
  images: {
    unoptimized: true,
  },
  // Skip API route checks during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig