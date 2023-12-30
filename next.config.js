/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV !== 'development',
  workboxOptions: {
    disableDevLogs: true
  }
})

const allowedImageDomains = []

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: allowedImageDomains
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = withPWA(nextConfig)
