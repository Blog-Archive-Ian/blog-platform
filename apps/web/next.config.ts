import withPWA from 'next-pwa'

const nextConfig = {
  transpilePackages: ['@blog/ui'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'firebasestorage.googleapis.com' }],
  },
} satisfies import('next').NextConfig

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig)
