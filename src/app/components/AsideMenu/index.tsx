'use client';

import { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import NewPost from "../NewPost";

export default function AsideMenu() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);

    const onTextAreaType = () => {
        const textarea = document.querySelector("textarea");

        if (textarea!.value.trim().length > 0) {
            setIsPostButtonDisabled(false);
        } else {
            setIsPostButtonDisabled(true);
        }

        if (textarea) {
            textarea!.style.height = "auto";
            textarea!.style.height = (textarea!.scrollHeight) + "px";
        }
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div>
                    <NewPost />
                </div>
            </Modal>


            <aside className="fixed left-0 w-1/4 h-full flex justify-end px-4 py-1 border-e border-white border-opacity-30">
                <menu className="text-xl flex flex-col w-56 gap-2">
                    <li className="flex gap-3">
                        <Button href="/" className="font-semibold" type="text" onClick={() => { return; }}><img src="y-logo.svg" className="w-6" alt="" /></Button>
                    </li>

                    <li className="flex gap-3">
                        <Button href="/" className="font-semibold" type="text" onClick={() => { return; }}><img src="icons/home.svg" className="w-6" alt="" /> <span className="text-lg">Home</span></Button>
                    </li>

                    <li className="flex gap-3">
                        <Button href="profile" className="font-semibold" type="text" onClick={() => { return; }}><img src="icons/profile.svg" className="w-6" alt="" /> <span className="text-lg">Profile</span></Button>
                    </li>

                    <li className="w-full">
                        <Button className="w-full" onClick={() => setIsModalOpen(true)}>Post</Button>
                    </li>
                </menu >
            </aside >
        </>
    );
}