import { IPost } from "@/interfaces/IPost";
import { bufferToImageUrl } from "@/utils/bufferUtil";

type PostResponse = {
    success: boolean;
    posts: IPost[] | null;
};

export const postService = {
    /**
     * 
     * @param post Post object
     * @returns Response object
     * @description Create a new post
     * @example
     * // Returns
     * {
     * success: boolean;
     * message: string;
     * post: IPost | null;
     * }
     */
    newPost: async (post: IPost): Promise<PostResponse> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        });

        const data: PostResponse = await response.json();
        return data;
    },

    /**
     * 
     * @param id Id of the user
     * @returns Response object
     * @description Get posts by user
     * @example
     * // Returns
     * {
     * success: boolean;
     * message: string;
     * post: IPost | null;
     * }
     */
    getPostsByLogin: async (login: string): Promise<any> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/gbu/${login}`);

        const data: PostResponse = await response.json();

        if (data.success && data.posts) {
            const posts = data.posts.map((post: any) => {
                if (post.avatar) {
                    post.avatar = bufferToImageUrl(post.avatar);
                }

                return {
                    id: post.id,
                    user_id: post.user_id,
                    text: post.text,
                    created_at: post.created_at,
                    name: post.name,
                    login: post.login,
                    avatar: post.avatar
                };
            });

            return posts;
        } else {
            return null;
        }

    }
};