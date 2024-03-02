/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["cdn.worldota.net", "res.cloudinary.com", 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.worldota.net",
        port: "",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
