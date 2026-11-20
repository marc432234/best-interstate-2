/** @type {import('next').NextConfig} */
const nextConfig = {
  htmlLimitedBots: /.*/,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
