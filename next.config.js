/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ['@google-cloud/firestore'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' }
        ],
      },
    ]
  },
};

module.exports = nextConfig;
