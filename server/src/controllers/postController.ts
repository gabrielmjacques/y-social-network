import { Request } from "express";
import { PostModel } from "../models/PostModel";
import fs from "fs";

const postModel: PostModel = new PostModel();

export = {
    newPost: async (req: Request, res: any) => {
        const user_id: number = req.body.user_id;
        const text: string = req.body.text;

        try {
            const response = await postModel.newPost(user_id, text);

            if (response.success) {
                return res.status(200).json({
                    success: true,
                    posts: response.posts
                });
            }

            return res.status(400).json({
                success: false,
                posts: null
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                posts: null
            });
        }
    },

    getPostsByUserLogin: async (req: Request, res: any) => {
        const user_login: string = req.params.user_id;

        try {
            const response = await postModel.getPostsByUserLogin(user_login);

            if (response.success && response.posts) {
                const posts = response.posts.map((post: any) => {
                    if (post.avatar) {
                        post.avatar = fs.readFileSync(post.avatar);
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

                return res.status(200).json({
                    success: true,
                    posts: response.posts
                });
            }

            return res.status(400).json({
                success: false,
                posts: null
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                posts: null
            });
        }
    }
};
