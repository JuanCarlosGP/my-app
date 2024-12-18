/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cataas.com', 
      'images.pexels.com', 
      'pexels.com', 
      'vwlrkhtpqvdgevwommkl.supabase.co'
    ],
  },
}

module.exports = nextConfig
  