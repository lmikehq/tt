import { BlogService } from "@/lib/services/blog/index.service";
import { FetchBlogsRequestInput } from "@/lib/types/request-models/blog/index.type";
import {
    BlogInterface,
    FetchBlogsResponse,
} from "@/lib/types/response-models/blog/index.type";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useFetchBlogs = (
    params: FetchBlogsRequestInput,
    options?: UseQueryOptions<FetchBlogsResponse>
) => {
    return useQuery({
        queryKey: ["fetch-blogs", params],
        queryFn: () => BlogService.fetchBlogs(params),
        ...options,
    });
};
export const useFetchBlogBySlug = (
    slug: string,
    options?: UseQueryOptions<BlogInterface>
) => {
    return useQuery({
        queryKey: ["fetch-blog-by-slug", slug],
        queryFn: () => BlogService.blogBySlug(slug),
        ...options,
    });
};
