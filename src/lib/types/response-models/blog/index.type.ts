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
    createdAt: Date;
    updatedAt: Date;
    author: Author;
}

export interface Author {
    name: string;
    picture: string;
}

export interface SingleBlogInterface {
    blog: BlogInterface;
}

export type FetchBlogsResponse = SingleBlogInterface[];
