'use client';

import { useEffect, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import NewPost from "../PostCreator";

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

            <aside className="fixed left-10 w-1/5 h-full flex justify-end ps-5 py-1">
                <menu id="menu-links" className="text-xl flex flex-col w-full justify-between items-end">
                    <div className="flex w-full flex-col gap-2">

                        <li className="flex gap-3">
                            <Button href="/" type="text"><img src="y-logo.svg" className="w-6" alt="" /></Button>
                        </li>
                        <li className="flex gap-3">
                            <Button href="/" type="text"><img src="icons/home.svg" className="w-6" alt="" /> <span className="text-lg">Home</span></Button>
                        </li>
                        <li className="flex gap-3">
                            <Button href="profile" type="text"><img src="icons/profile.svg" className="w-6" alt="" /> <span className="text-lg">Profile</span></Button>
                        </li>
                        <li className="w-full">
                            <Button className="w-full" onClick={() => setIsModalOpen(true)}>Post</Button>
                        </li>

                    </div>

                    <li className="flex w-full items-center gap-3 mb-4">
                        <img src="https://placehold.co/300x300" className="w-10 rounded-full" alt="" />

                        <div className="flex flex-col flex-1">
                            <span className="text-base font-medium">User Name</span>
                            <span className="text-sm opacity-50">@userlogin</span>
                        </div>

                        <img src="icons/t-points.svg" className="w-4" alt="" />
                    </li>
                </menu >
            </aside >
        </>
    );
};