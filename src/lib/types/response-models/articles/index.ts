export interface FetchSingleArticleResponse {
    success: boolean;
    data: ArticleInterface[];
}

export interface ArticleInterface {
    _id: string;
    author: string;
    likes: string[];
    dislikes: string[];
    title: string;
    content: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}
