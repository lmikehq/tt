export interface BlogInterface {
    _id: string;
    blogImage: string;
    readingTimeInMins: number;
    topic: string;
    tags: string[];
    likes: string[];
    dislikes: any[];
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: Author;
    slug: string;
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
