import { axiosClient, rateHawkResourceClient } from "@/lib/axios/axios-client";
import { FetchSingleArticleParams } from "@/lib/types/request-models/articles";

import { FetchSingleArticleResponse } from "@/lib/types/response-models/articles";

export class ArticleService {
    static fetchSingleArticle = async (params: FetchSingleArticleParams) => {
        return await axiosClient
            .get<any, FetchSingleArticleResponse>(`/articles/${params.slug}`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
}
