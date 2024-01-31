/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["cdn.worldota.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**cdn.worldota.net",
        port: "",
        pathname: "*",
      }
    ]
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
