"use client";

import Button from "@/app/components/Button";
import Post from "@/app/components/Post";
import { useState } from "react";

export default function Profile() {
  const [profileImg, setProfileImg] = useState("https://i.pravatar.cc/300");

  return (
    <main>
      {/* Back menu */}
      <section className="fixed bg-gray-950 w-full flex items-center gap-5 px-5">
        <Button onClick={() => window.history.back()} type="text" size="sm" sx={{ padding: 10 }}>
          <img src="icons/left-arr.svg" className="w-4" alt="" />
        </Button>

        <div className="py-1 flex flex-col">
          <span className="text-lg font-bold">{"asd"}</span>
          <span className="text-sm opacity-50">0 posts</span>
        </div>
      </section>

      {/* Profile images */}
      <section>
        {/* Banner */}
        <div className="w-full h-64 overflow-hidden">
          <img className="object-cover w-full h-full" src="https://loremflickr.com/800/300" alt="" />
        </div>

        {/* Avatar */}
        <div className="relative -mt-12 md:-mt-20 ms-5 w-24 md:w-36 h-24 md:h-36 border-4 border-black rounded-full overflow-hidden">
          <img className="object-cover w-full h-full" src={profileImg} alt="" />
        </div>
      </section>

      {/* Profile Data */}
      <section className="px-5 py-3 flex flex-col gap-2">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">User Name</h1>
          <small className="text-base opacity-50">@userlogin</small>
        </div>

        <div className="flex flex-col gap-2">
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quae.</span>
        </div>

        <div className="flex gap-2 opacity-50">
          <img src="icons/calendar.svg" className="w-4" alt="" />
          <span>Joined Mounth of 0000
          </span>
        </div>

        <div className="flex gap-5">
          <div>
            <span>0 </span>
            <span className="opacity-50">Following</span>
          </div>

          <div>
            <span>0 </span>
            <span className="opacity-50">Followers</span>
          </div>
        </div>
      </section>

      {/* Profile sections */}
      <section className="h-12 flex border-b border-white border-opacity-30">
        <div className="w-full">
          <Button className="w-full h-full" type="text" sx={{ borderRadius: 0, padding: 0 }}>
            <div className="h-full flex flex-col items-center justify-between">
              <div className=""></div>
              Posts
              <div className="w-full h-1 rounded-full bg-cyan-500"></div>
            </div>
          </Button>
        </div>

        <div className="w-full">
          <Button className="w-full h-full" type="text" sx={{ borderRadius: 0, padding: 0 }}>
            <div className="h-full flex flex-col items-center justify-between">
              <div className=""></div>
              Likes
              <div className="opacity-0 w-full h-1 rounded-full bg-cyan-500"></div>
            </div>
          </Button>
        </div>
      </section>

      {/* Posts */}
      <section>
        <Post
          img={profileImg}
          username="User Name"
          login="userlogin"
          date={new Date()}
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quae."
        />
      </section>
    </main>
  );
}
