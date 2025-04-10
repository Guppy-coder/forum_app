import { PostComment } from "../comment/comment";

export interface Question {
    id: number;
    title: string;
    description: string;
    productCode: string;
    status: boolean;
    likes: number;
    userEmail: string;
    tags: string[];
    date: string;
    comments: PostComment[];
}