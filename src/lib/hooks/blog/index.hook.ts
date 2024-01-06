import { ArticleService } from "@/lib/services/articles";
import { BlogService } from "@/lib/services/blog/index.service";
import { FetchSingleArticleParams } from "@/lib/types/request-models/articles";
import { FetchBlogsRequestInput } from "@/lib/types/request-models/blog/index.type";
import { FetchSingleArticleResponse } from "@/lib/types/response-models/articles";
import { FetchBlogsResponse } from "@/lib/types/response-models/blog/index.type";
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
