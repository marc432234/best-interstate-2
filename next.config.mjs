/** @type {import('next').NextConfig} */
const nextConfig = {
  htmlLimitedBots: /.*/,
  trailingSlash: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "bestinterstatemovingandstorage.com",
      },
      {
        protocol: "https",
        hostname: "www.bestinterstatemovingandstorage.com",
      },
    ],
  },
};

export default nextConfig;
