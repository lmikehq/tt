import { create } from "zustand";
import { Mode } from "../types";
import { BlogService } from "../services/blog/index.service";
import {
    FetchBlogsResponse,
    BlogInterface,
} from "../types/response-models/blog/index.type";
import { FetchBlogsRequestInput } from "../types/request-models/blog/index.type";

interface State {
    mode: Mode;
    blog: BlogInterface | null;
    blogs: FetchBlogsResponse;
    likeModal: boolean;
    dislikeModal: boolean;
    feedbackModal: boolean;
    feedbackSuccessModal: boolean;
    shareModal: boolean;
}

interface Actions {
    getAllBlogs: (params: { query: FetchBlogsRequestInput }) => Promise<any>;
    getBlog: (slug: string) => Promise<any>;
    setBlogs: (e: any) => void;
    setBlog: (e: any) => void;
    setLikeModal: (x: boolean) => void;
    setDislikeModal: (x: boolean) => void;
    setFeedbackModal: (x: boolean) => void;
    setFeedbackSuccessModal: (x: boolean) => void;
    setShareModal: (x: boolean) => void;
}

export const useBlogStore = create<State & Actions>((set): State & Actions => ({
    blog: null,
    blogs: [],
    mode: Mode.loaded,
    likeModal: false,
    dislikeModal: false,
    feedbackModal: false,
    feedbackSuccessModal: false,
    shareModal: false,
    setBlogs: (x: FetchBlogsResponse) => set({ blogs: x }),
    setBlog: (x: BlogInterface) => set({ blog: x }),
    setLikeModal: (x: boolean) => set({ likeModal: x }),
    setDislikeModal: (x: boolean) => set({ dislikeModal: x }),
    setFeedbackModal: (x: boolean) => set({ feedbackModal: x }),
    setFeedbackSuccessModal: (x: boolean) => set({ feedbackSuccessModal: x }),
    setShareModal: (x: boolean) => set({ shareModal: x }),
    getAllBlogs: async ({ query }) => {
        set({ mode: Mode.loading });
        await BlogService.fetchBlogs({ query })
            .then((response) => {
                set({ blogs: response });
                return response;
            })
            .catch((error) => {
                set({
                    mode: Mode.error,
                });
                throw error;
            });
        return set({ mode: Mode.loaded });
    },

    getBlog: async (slug) => {
        set({ mode: Mode.loading });
        await BlogService.blogBySlug(slug)
            .then((response) => {
                set({ blog: response });
                return response;
            })
            .catch((error) => {
                set({
                    mode: Mode.error,
                });
                throw error;
            });
        return set({ mode: Mode.loaded });
    },
}));
