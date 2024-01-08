import { ArticleService } from "@/lib/services/articles";
import { FetchSingleArticleParams } from "@/lib/types/request-models/articles";
import { FetchSingleArticleResponse } from "@/lib/types/response-models/articles";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useFetchSingleArticle = (
    params: FetchSingleArticleParams,
    options?: UseQueryOptions<FetchSingleArticleResponse>
) => {
    return useQuery({
        queryKey: ["view-single-article", params.slug],
        queryFn: () => ArticleService.fetchSingleArticle(params),
        ...options,
    });
};
