'use client';

import Button from "../Button";

export default function AsideMenu() {
    return (
        <aside className="fixed left-0 w-1/4 h-full flex justify-end px-4 py-1 border-e border-white border-opacity-30">
            <menu className="text-xl flex flex-col w-56 gap-2">
                <li className="flex gap-3">
                    <Button className="font-semibold" type="text" onClick={() => { return; }}><img src="y-logo.svg" className="w-6" alt="" /></Button>
                </li>

                <li className="flex gap-3">
                    <Button className="font-semibold" type="text" onClick={() => { return; }}><img src="icons/home.svg" className="w-6" alt="" /> <span className="text-lg">Home</span></Button>
                </li>

                <li className="flex gap-3">
                    <Button className="font-semibold" type="text" onClick={() => { return; }}><img src="icons/messages.svg" className="w-6" alt="" /> <span className="text-lg">Messages</span></Button>
                </li>

                <li className="flex gap-3">
                    <Button className="font-semibold" type="text" onClick={() => { return; }}><img src="icons/profile.svg" className="w-6" alt="" /> <span className="text-lg">Profile</span></Button>
                </li>

                <li className="w-full">
                    <Button className="w-full" onClick={() => { return; }}>Post</Button>
                </li>
            </menu >
        </aside >
    );
}