/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config
  // Add images configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oqnwecbjgvcomvhtxgdb.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig