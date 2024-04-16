import { BlogService } from "./../../lib/services/blog/index.service";
import { getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
    const urls = await BlogService.fetchBlogUrls();

    return getServerSideSitemap(
        urls.map((url) => ({
            loc: url,
            lastmod: new Date().toISOString(),
        }))
    );
}
