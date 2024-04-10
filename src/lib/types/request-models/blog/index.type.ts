export interface FetchBlogsRequestInput {
    status?: string;
    title?: string;
}
export interface LikeBlogRequestInput {
    ip: string;
}
export enum BlogStatus {
    PUBLISHED = "PUBLISHED",
    DRAFT = "DRAFT",
}
