'use client';

import Button from "../components/Button";
import NewPost from "../components/NewPost";
import Post from "../components/Post";

export default function Home() {
    return (
        <main>
            {/* Sections */}
            <section className="h-12 flex border-b border-white border-opacity-30">
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
            </section>

            {/* New post */}
            <section className="border-b border-white border-opacity-20">
                <NewPost />
            </section>

            {/* Posts */}
            <section>
                <Post
                    username="John Due"
                    img="https://i.pravatar.cc/100"
                    date={new Date()}
                    login="johndoe"
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                />
            </section>

        </main>
    );
}