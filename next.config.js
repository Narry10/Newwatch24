/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false, 
  images: {
    unoptimized: true,
  },
  output: "standalone",
}

module.exports = nextConfig;
