/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    generateRobotsTxt: true, // (optional)
    exclude: ["/server-sitemap.xml"], // <= exclude here
    generateIndexSitemap: false,
    robotsTxtOptions: {
        additionalSitemaps: [
            process.env.NEXT_PUBLIC_SITE_URL + "/server-sitemap.xml", // <==== Add here
        ],
    },
    // ...other options
};
