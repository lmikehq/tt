import { BlogService } from "@/lib/services/blog/index.service";
import { FetchBlogsRequestInput } from "@/lib/types/request-models/blog/index.type";
import {
    BlogInterface,
    FetchBlogsResponse,
} from "@/lib/types/response-models/blog/index.type";
import {
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
} from "@tanstack/react-query";

export const useFetchBlogs = (
    params: FetchBlogsRequestInput,
    options?: UseQueryOptions<FetchBlogsResponse>
) => {
    return useQuery({
        queryKey: ["fetch-blogs", params],
        queryFn: () => BlogService.fetchBlogs(),
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

// export const useLikeBlog = (
//     options?: Omit<
//       UseMutationOptions<
//         LikeBlogResponse,
//         unknown,
//         LikeBlogRequestInput,
//         unknown
//       >,
//       "mutationFn"
//     >
//   ) => {
//     return useMutation({
//       mutationFn: (params: LikeBlogRequestInput): Promise<LikeBlogResponse> =>
//         BlogService.likeBlog(params),
//       ...options,
//     });
//   };
