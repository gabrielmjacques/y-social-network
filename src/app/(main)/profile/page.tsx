"use client";

import Button from "@/app/components/Button";
import Post from "@/app/components/Post";

export default function Profile() {

  return (
    <main>
      {/* Back menu */}
      <section className="fixed bg-gray-950 w-full flex items-center gap-5 px-5">
        <Button type="text" size="sm" sx={{ padding: 10 }}>
          <img src="icons/left-arr.svg" className="w-4" alt="" />
        </Button>

        <div className="py-1 flex flex-col">
          <span className="text-lg font-bold">User Name</span>
          <span className="text-sm opacity-50">0 posts</span>
        </div>
      </section>

      {/* Profile images */}
      <section>
        {/* Banner */}
        <div className="bg-red-800 w-full h-64 overflow-hidden">
          <img className="object-cover w-full h-full" src="https://placehold.co/800x300" alt="" />
        </div>

        {/* Avatar */}
        <div className="relative -mt-20 ms-5 w-36 h-36 border-4 border-black rounded-full overflow-hidden">
          <img className="object-cover w-full h-full" src="https://placehold.co/300x300" alt="" />
        </div>
      </section>

      {/* Profile Data */}
      <section className="p-5 flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-bold">User Name</h1>
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
      <section className="flex border-b border-white border-opacity-30">
        <div className="">
          <Button className="w-full relative" type="text" sx={{ borderRadius: 0 }}>
            Posts
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 rounded-full bg-cyan-500"></div>
          </Button>
        </div>

        <div className="">
          <Button className="w-full relative" type="text" sx={{ borderRadius: 0 }}>
            Posts
            <div className="hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 rounded-full bg-cyan-500"></div>
          </Button>
        </div>
      </section>

      {/* Posts */}
      <section>
        <Post
          img="https://placehold.co/300x300"
          username="User Name"
          login="userlogin"
          date={new Date()}
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quae."
        />
      </section>
    </main>
  );
}
