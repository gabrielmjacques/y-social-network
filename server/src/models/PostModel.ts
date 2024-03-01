import { pool } from "../config/db";
import { IPost } from "../interfaces/IPost";

type PostResponse = {
    success: boolean;
    posts: IPost[] | null;
};

export class PostModel {

    /**
     * 
     * @param id Id of the user
     * @param text Text of the post
     * @returns 
     */
    newPost = async (id: number, text: string): Promise<any> => {

        const query = "INSERT INTO posts (user_id, text) VALUES (?, ?)";

        try {
            const [rows]: any = await pool.promise().query(query, [id, text]);

            if (rows.affectedRows > 0) {
                const post: IPost = {
                    id: rows.insertId,
                    user_id: id,
                    text: text,
                    created_at: new Date()
                };

                return {
                    success: true,
                    posts: post
                };

            } else {
                return {
                    success: false,
                    posts: null
                };
            }
        } catch (err) {
            throw err;
        }

    };

    getPostsByUserLogin = async (id: number | string): Promise<PostResponse> => {

        const query = "SELECT posts.*, users.name, users.login, users.avatar FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.user_id = ?";

        try {
            const [rows]: any = await pool.promise().query(query, [id]);

            if (rows.length > 0) {
                return {
                    success: true,
                    posts: rows
                };

            } else {
                return {
                    success: false,
                    posts: null
                };
            }

        } catch (err) {
            throw err;
        }
    };
};