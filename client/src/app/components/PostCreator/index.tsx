'use client';

import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { bufferToImageUrl } from "@/utils/bufferUtil";
import { fromLocalStorage } from "@/utils/localStorageUtil";
import { Avatar as AntAvatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface PostCreatorProps {
    rows?: number;
}

export default function PostCreator(props: PostCreatorProps) {
    const [avatar, setAvatar] = useState<any>();
    const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);
    const textArea = useRef<HTMLTextAreaElement>(null);

    const user = fromLocalStorage.get.user();

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

    useEffect(() => {
        if (user.avatar)
            setAvatar(bufferToImageUrl(user.avatar.data));
    });

    return (
        <div className="flex flex-col gap-5">
            <div className="flex  p-4">
                {
                    avatar
                        ? <img src={avatar} className="w-12 rounded-full self-start" alt="" />
                        : <AntAvatar className="opacity-50" icon={<UserOutlined />} />
                }

                <div className="flex-1 mx-4">
                    <textarea ref={textArea} onInput={onTextAreaType} className="bg-transparent text-xl w-full outline-none max-h-60 resize-none" rows={props.rows ? props.rows : 3} placeholder="What are you thinking about?" name="post_text" id="post_text_entry"></textarea>

                    <div className="flex justify-end border-t border-white border-opacity-20 mt-3 pt-3">
                        <Button disabled={isPostButtonDisabled} className="px-10" onClick={() => { return; }}>Post</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}