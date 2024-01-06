/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: false,
    images: {
        domains: [process.env.NEXT_PUBLIC_IMAGE_STORE_HOST],
        path: "/",
    },
    swcMinify: true,
};

module.exports = nextConfig;
