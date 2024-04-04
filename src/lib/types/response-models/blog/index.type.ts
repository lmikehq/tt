export interface BlogInterface {
    _id: string;
    blogImage: string;
    readingTimeInMins: number;
    topic: string;
    tags: string[];
    likes: string[];
    dislikes: any[];
    comments: any[];
    feedbacks: any[];
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: Author;
    slug: string;

    metaDataTitle: string;
    metaDataDesc: string;
    redirect301: {
        from: string;
        to: string;
    };
    redirect302: {
        from: string;
        to: string;
    };
    metaKeywords: string[];
    canonicalTag: string;
    schemaType: string;
    customJSONLDCode: string;
    metaRobotsAdvanced: {
        noindex: boolean;
        nofollow: boolean;
    };
}

export interface Author {
    name: string;
    picture: string;
}
export type LikeBlogResponse = {
    msg: string;
    success: boolean;
};

export type FetchBlogsResponse = BlogInterface[];
