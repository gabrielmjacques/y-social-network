'use client';

import Link from "next/link";
import Button from "../Button";
import { useEffect, useState } from "react";

export default function MobileMenu() {
    const [leftPropMenu, setLeftPropMenu] = useState(-100);

    const menuHide = () => {
        setLeftPropMenu(-100);
    };

    const menuShow = () => {
        setLeftPropMenu(0);
    };

    return (
        <div className="md:hidden">
            <div className='flex justify-between px-4'>
                <Button onClick={menuShow} className="border border-white border-opacity-20" type="text" sx={{ padding: 10 }}>
                    <img className='w-8 rounded-full' src="y-logo.svg" alt="" />
                </Button>

                <Button href='/' type="text" sx={{ padding: 10 }}>
                    <img className='w-5' src="y-logo.svg" alt="" />
                </Button>

                <Button type="text" sx={{ padding: 10 }}>
                    <img className='w-5' src="icons/config.svg" alt="" />
                </Button>
            </div>

            <aside onClick={menuHide} style={{ left: `${leftPropMenu}%` }} className="transition-all fixed top-0 w-full h-full z-10 backdrop-brightness-50 backdrop-blur-sm">
                <menu className="absolute ${} flex flex-col gap-3 w-72 h-full bg-gray-950 border border-e border-white border-opacity-20">
                    <li className="p-3 flex flex-col items-start">
                        <Button href="profile" type="text" sx={{ padding: 5 }}>
                            <img src="y-logo.svg" className="w-10 rounded-full" alt="" />
                        </Button>

                        <span className="font-bold hover:underline"><Link href={"profile"}>User Name</Link></span>
                        <span className="text-sm opacity-50"><Link href={"profile"}>userlogin</Link></span>

                        <div className="flex gap-3 mt-3">
                            <span>0 <span className="text-sm opacity-50">Following</span></span>
                            <span>0 <span className="text-sm opacity-50">Followers</span></span>
                        </div>
                    </li>

                    <li>
                        <Button className="w-full ps-3" href="/" type="text" sx={{ borderRadius: 0, justifyContent: "start" }}>
                            <img src="icons/home.svg" className="w-6" alt="" /> <span className="text-lg">Home</span>
                        </Button>
                    </li>

                    <li>
                        <Button className="w-full ps-3" href="profile" type="text" sx={{ borderRadius: 0, justifyContent: "start" }}>
                            <img src="icons/profile.svg" className="w-6" alt="" /> <span className="text-lg">Profile</span>
                        </Button>
                    </li>
                </menu>
            </aside>
        </div>
    );
};