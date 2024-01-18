/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    },
    reactStrictMode: false,
    swcMinify: true,
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'cdn.ostrovok.ru',
    //             port: '',
    //             pathname: '/t/'
    //         }
    //     ]
    // }
};

module.exports = nextConfig;
