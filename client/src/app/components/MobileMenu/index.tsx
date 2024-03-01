'use client';

import { Avatar as AntAvatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../Button";
import { fromLocalStorage } from "@/utils/localStorageUtil";
import { bufferToImageUrl } from "@/utils/bufferUtil";

export default function MobileMenu() {
    const [avatar, setAvatar] = useState<any>();
    const [leftPropMenu, setLeftPropMenu] = useState(-100);

    const [dropdowns, setDropdowns] = useState({
        configurations: false
    });

    const user = fromLocalStorage.get.user();
    const session = useSession();

    const menuHide = () => {
        setLeftPropMenu(-100);
    };

    const menuShow = () => {
        setLeftPropMenu(0);
    };

    useEffect(() => {
        if (user.avatar)
            setAvatar(bufferToImageUrl(user.avatar.data));

        document.addEventListener('click', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement) {
                if (e.target.classList.contains('backdrop-blur-sm')) {
                    menuHide();
                }
            }
        });
    }, []);

    return (
        <div className="md:hidden">
            <div className='flex justify-between px-4'>
                <Button onClick={menuShow} className="border border-white border-opacity-20" type="text" sx={{ padding: 10 }}>
                    {
                        avatar
                            ? <img className='w-8 rounded-full' src={avatar} alt="" />
                            : <AntAvatar className="opacity-50" icon={<UserOutlined />} />
                    }
                </Button>

                <Button href='/' type="text" sx={{ padding: 10 }}>
                    <img className='w-5' src="y-logo.svg" alt="" />
                </Button>

                <Button type="text" sx={{ padding: 10 }}>
                    <img className='w-5' src="icons/config.svg" alt="" />
                </Button>
            </div>

            <aside
                style={{ left: `${leftPropMenu}%` }}
                className={`duration-500 fixed top-0 w-full h-full z-50 backdrop-blur-sm transition-all opacity-0 ${leftPropMenu === 0 ? 'opacity-100' : 'opacity-0'}`}
            >

                <menu className="absolute ${} flex flex-col gap-3 pe-5 w-72 h-full bg-gray-950 border border-e border-white border-opacity-20">
                    <li className="p-3 flex flex-col items-start">
                        <Button href={`profile/${user.login}`} type="text" sx={{ padding: 5 }}>
                            {
                                avatar
                                    ? <img src={avatar} className="w-10 rounded-full" alt="" />
                                    : <AntAvatar className="opacity-50" icon={<UserOutlined />} />
                            }
                        </Button>

                        <span className="font-bold hover:underline"><Link href={`profile/${user.login}`}>{user.name}</Link></span>
                        <span className="text-sm opacity-50"><Link href={`profile/${user.login}`}>@{user.login}</Link></span>

                        <div className="flex gap-3 mt-3">
                            <span>0 <span className="text-sm opacity-50">Following</span></span>
                            <span>0 <span className="text-sm opacity-50">Followers</span></span>
                        </div>
                    </li>

                    <li>
                        <Button align="start" className="w-full ps-3" href="/" type="text" sx={{ borderRadius: 0 }}>
                            <img src="icons/home.svg" className="w-6" alt="" /> <span className="text-lg">Home</span>
                        </Button>
                    </li>

                    <li>
                        <Button align="start" className="w-full ps-3" href={`profile/${session.data?.login}`} type="text" sx={{ borderRadius: 0 }}>
                            <img src="icons/profile.svg" className="w-6" alt="" /> <span className="text-lg">Profile</span>
                        </Button>
                    </li>

                    <hr className="opacity-20" />

                    <li>
                        <Button
                            onClick={() => setDropdowns({ configurations: !dropdowns.configurations })}
                            align="between"
                            className="w-full ps-3"
                            type="text"
                            sx={{ borderRadius: 0 }}
                        >
                            Configurations <DownOutlined className={`${dropdowns.configurations ? "rotate-180 text-cyan-300" : "rotate-0"}`} />
                        </Button>

                        {
                            dropdowns.configurations &&
                            <menu className="flex flex-col gap-3 mt-3">
                                <li>
                                    <Button onClick={async () => {
                                        signOut();
                                        localStorage.clear();
                                    }}
                                        size="sm"
                                        align="start"
                                        className="w-full ps-3"
                                        type="text"
                                        sx={{ borderRadius: 0 }}>
                                        Sair de @{user.login}
                                    </Button>
                                </li>
                            </menu>
                        }
                    </li>
                </menu>

            </aside>
        </div>
    );
};