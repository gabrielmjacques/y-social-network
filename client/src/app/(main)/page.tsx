'use client';

import { fromLocalStorage } from "@/utils/localStorageUtil";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import MobileMenu from "../components/MobileMenu";
import { bufferToImageUrl } from "@/utils/bufferUtil";
import { Avatar as AntAvatar, ConfigProvider, message, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { postService } from "@/services/postService";
import { useSession } from "next-auth/react";
import { IPost } from "@/interfaces/IPost";
import Post from "../components/Post";
import User from "@/interfaces/IUser";

export default function Home() {
    // States
    const [avatar, setAvatar] = useState<any>();
    const textArea = useRef<HTMLTextAreaElement>(null);
    const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);
    const [posts, setPosts] = useState<any>([]);
    const [user, setUser] = useState<User>({});

    // Hooks
    const session = useSession();
    const [showMessage, contextHolder] = message.useMessage();

    /**
     * @description Automatically resizes the textarea when the user types.
     */
    const onTextAreaType = () => {
        if (textArea!.current!.value.trim().length > 0) {
            setIsPostButtonDisabled(false);
        } else {
            setIsPostButtonDisabled(true);
        }

        if (textArea.current!) {
            textArea!.current!.style.height = "auto";
            textArea!.current!.style.height = (textArea!.current!.scrollHeight) + "px";
        }
    };

    /**
     * @description Creates a new post.
     */
    // const newPost = () => {
    //     const post: IPost = {
    //         user_id: session.data!.id,
    //         text: textArea.current!.value
    //     };

    //     postService.newPost(post)
    //         .then((res) => {
    //             if (res.success) {
    //                 showMessage.success("Post created successfully!");
    //                 textArea.current!.value = "";

    //             } else {
    //                 showMessage.error("An error occurred while creating the post.");
    //             }
    //         });
    // };

    useEffect(() => {
        if (!session.data) return;
        setUser(fromLocalStorage.get.user());

        if (user) {
            if (user.avatar)
                setAvatar(bufferToImageUrl(user.avatar!.data));

        }
    }, [session.data]);

    return (
        <main>
            <ConfigProvider theme={{
                algorithm: theme.darkAlgorithm
            }}>
                {contextHolder}
            </ConfigProvider>

            <header>
                <MobileMenu />

                {/* Sections selection */}
                <div className="h-12 flex border-b border-white border-opacity-20">
                    <div className="w-full">
                        <Button className="w-full h-full" type="text" sx={{ borderRadius: 0, padding: 0 }}>
                            <div className="h-full flex flex-col items-center justify-between">
                                <div className=""></div>
                                For you
                                <div className="w-full h-1 rounded-full bg-cyan-500"></div>
                            </div>
                        </Button>
                    </div>

                    <div className="w-full">
                        <Button className="w-full h-full" type="text" sx={{ borderRadius: 0, padding: 0 }}>
                            <div className="h-full flex flex-col items-center justify-between">
                                <div className=""></div>
                                Following
                                <div className="opacity-0 w-full h-1 rounded-full bg-cyan-500"></div>
                            </div>
                        </Button>
                    </div>
                </div>
            </header>

            {/* New post */}
            <section>
                <div className="flex flex-col gap-5">
                    <div className="flex  p-4">
                        {
                            avatar
                                ? <img src={avatar} className="w-12 rounded-full self-start" alt="" />
                                : <AntAvatar className="opacity-50" icon={<UserOutlined />} />
                        }

                        <div className="flex-1 mx-4">
                            <textarea ref={textArea} onInput={onTextAreaType} className="bg-transparent text-xl w-full outline-none max-h-60 resize-none" rows={3} placeholder="What are you thinking about?" name="post_text" id="post_text_entry"></textarea>

                            <div className="flex justify-end border-t border-white border-opacity-20 mt-3 pt-3">
                                <Button disabled={isPostButtonDisabled} className="px-10" onClick={() => { return; }}>Post</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Posts */}
            <section>
                {
                    posts
                }
            </section>

        </main>
    );
}