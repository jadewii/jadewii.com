/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['f4.bcbits.com', 'bandcamp.com', 'localhost'],
  },
  // Skip API route checks during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Experimental: disable static page generation for API routes
  experimental: {
    outputFileTracingIncludes: {
      '/api/*': [],
    },
  },
}

module.exports = nextConfig