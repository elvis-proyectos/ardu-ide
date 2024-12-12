/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: ['child_process', 'fs', 'path'],
  },
}

module.exports = nextConfig
