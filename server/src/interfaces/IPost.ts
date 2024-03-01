export interface IPost {
    id: number;
    text: string;
    user_id: number;
    created_at?: Date;
    login?: string;
    name?: string;
    avatar?: string;
}