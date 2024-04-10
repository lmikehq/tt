export interface FetchBlogsRequestInput {
    status?: string;
    search?: string;
}
export interface LikeBlogRequestInput {
    ip: string;
}
export enum BlogStatus {
    PUBLISHED = "PUBLISHED",
    DRAFT = "DRAFT",
}
