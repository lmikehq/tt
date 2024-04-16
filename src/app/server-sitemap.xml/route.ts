import { BlogService } from "./../../lib/services/blog/index.service";
import { getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')
    const urls = await BlogService.fetchBlogUrls();

    return getServerSideSitemap(
        urls.map((url) => ({
            loc: url,
            lastmod: new Date().toISOString(),
        }))
    );

    //     [
    //     {
    //       loc: 'https://example.com',
    //       lastmod: new Date().toISOString(),
    //       // changefreq
    //       // priority
    //     },
    //     {
    //       loc: 'https://example.com/dynamic-path-2',
    //       lastmod: new Date().toISOString(),
    //       // changefreq
    //       // priority
    //     },
    //   ]
}
