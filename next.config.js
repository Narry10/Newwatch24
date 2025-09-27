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
    return [,
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }
        ],
      },
    ]
  },
};

module.exports = nextConfig;



