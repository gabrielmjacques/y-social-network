'use client';

import { IPost } from "@/interfaces/IPost";
import { postService } from "@/services/postService";
import { bufferToImageUrl } from "@/utils/bufferUtil";
import { fromLocalStorage } from "@/utils/localStorageUtil";
import { UserOutlined } from "@ant-design/icons";
import { Avatar as AntAvatar, ConfigProvider, Popover, message, notification, theme } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";

export default function AsideMenu() {
    // States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);
    const textArea = useRef<HTMLTextAreaElement>(null);

    // Hooks
    const user = fromLocalStorage.get.user();
    const session = useSession();
    const [showMessage, contextHolder] = message.useMessage();

    // Popover
    const profileMenu = () => {
        return (
            <div className="flex flex-col gap-3 w-72 p-0 bg-gray-950 text-white rounded-lg overflow-hidden" style={{ boxShadow: "0 0 15px #ffffff20" }}>
                <Button
                    onClick={async () => {
                        signOut();
                        localStorage.clear();
                    }}
                    align="start"
                    className="rounded-none"
                    type="text"
                >
                    Sair de @{user?.login}
                </Button>
            </div>
        );
    };

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
    const newPost = () => {
        const post: IPost = {
            user_id: session.data!.id,
            text: textArea.current!.value
        };

        postService.newPost(post)
            .then((res) => {
                if (res.success) {
                    showMessage.success("Post created successfully!");
                    textArea.current!.value = "";

                } else {
                    showMessage.error("An error occurred while creating the post.");
                }

                setIsModalOpen(false);
            });
    };

    useEffect(() => {
        if (user.avatar)
            setProfileImage(bufferToImageUrl(user.avatar.data));
    }, []);

    return (
        <>
            <ConfigProvider theme={{
                algorithm: theme.darkAlgorithm
            }}>
                {contextHolder}
            </ConfigProvider>

            {/* New post modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div>
                    <div className="flex flex-col gap-5">
                        <div className="flex  p-4">
                            {
                                user.avatar
                                    ? <img src={bufferToImageUrl(user.avatar)} className="w-12 rounded-full self-start" alt="" />
                                    : <AntAvatar className="opacity-50" icon={<UserOutlined />} />
                            }

                            <div className="flex-1 mx-4">
                                <textarea ref={textArea} onInput={onTextAreaType} className="bg-transparent text-xl w-full outline-none max-h-60 resize-none" rows={3} placeholder="What are you thinking about?" name="post_text" id="post_text_entry"></textarea>

                                <div className="flex justify-end border-t border-white border-opacity-20 mt-3 pt-3">
                                    <Button disabled={isPostButtonDisabled} className="px-10" onClick={newPost}>Post</Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>

            {/* Aside menu */}
            <aside className="fixed w-1/5 h-full flex justify-end ps-5 py-1">
                <menu id="menu-links" className="text-xl flex flex-col w-full justify-between items-end">
                    <div className="flex w-full flex-col gap-2">

                        <li className="flex gap-3">
                            <Button href="/" type="text"><img src="/y-logo.svg" className="w-6" alt="" /></Button>
                        </li>

                        <li className="flex gap-3">
                            <Button href="/" className="w-full" align="start" type="text"><img src="/icons/home.svg" className="w-6" alt="" /> <span className="text-lg">Home</span></Button>
                        </li>
                        <li className="flex gap-3">
                            <Button href={`/profile/${user?.login}`} className="w-full" align="start" type="text"><img src="/icons/profile.svg" className="w-6" alt="" /> <span className="text-lg">Profile</span></Button>
                        </li>

                        <li className="w-full">
                            <Button className="w-full" onClick={() => setIsModalOpen(true)}>New</Button>
                        </li>

                    </div>

                    <Popover overlayInnerStyle={{ padding: 0, background: "none" }} content={profileMenu} trigger={"click"}>
                        <li className="flex w-full items-center gap-3 mb-4 p-3 rounded-full transition cursor-pointer hover:bg-white hover:bg-opacity-5">
                            {
                                profileImage
                                    ? <img src={profileImage} className="w-10 rounded-full" alt="" />
                                    : <AntAvatar className="opacity-50" icon={<UserOutlined />} />
                            }

                            <div className="flex flex-col flex-1">
                                <span className="text-base font-medium">{
                                    user?.name?.length! > 15 ? user?.name?.substring(0, 15) + "..." : user?.name
                                }</span>
                                <span className="text-sm opacity-50">@{user?.login}</span>
                            </div>

                            <img src="/icons/t-points.svg" className="w-6" alt="" />
                        </li>
                    </Popover>
                </menu >
            </aside >
        </>
    );
};