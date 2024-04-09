import { axiosClient } from "@/lib/axios/axios-client";
import { FetchBlogsRequestInput } from "@/lib/types/request-models/blog/index.type";

import { BlogInterface, FetchBlogsResponse } from "@/lib/types/response-models/blog/index.type";

export class BlogService {
    static fetchBlogs = async () => {
        return await axiosClient
            .get<any, FetchBlogsResponse>(`/blog`)
            .then((response) => {
                                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
    static blogBySlug = async (slug: string) => {
        return await axiosClient
            .get<any, BlogInterface>(`/blog/slug/${slug}`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
}
