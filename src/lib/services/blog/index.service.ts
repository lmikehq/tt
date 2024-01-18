import { axiosClient } from "@/lib/axios/axios-client";
import { FetchBlogsRequestInput } from "@/lib/types/request-models/blog/index.type";

import { FetchBlogsResponse } from "@/lib/types/response-models/blog/index.type";

export class BlogService {
    static fetchBlogs = async (params: FetchBlogsRequestInput) => {
        return await axiosClient
            .get<any, FetchBlogsResponse>(`/blog`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
}
