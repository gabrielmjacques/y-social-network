'use client';

import { useEffect, useState } from "react";
import Button from "../components/Button";
import MobileMenu from "../components/MobileMenu";
import PostCreator from "../components/PostCreator";
import Post from "../components/Post";

export default function Home() {
    return (
        <main>
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
                <PostCreator />
            </section>

            {/* Posts */}
            <section>

            </section>

        </main>
    );
}