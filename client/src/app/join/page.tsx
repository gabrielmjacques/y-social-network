'use client';

import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";

export default function Join() {
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  return (
    <main className="bg-gray-950 h-screen flex flex-col justify-between">

      {/* Sign up modal */}
      <Modal isOpen={signupModalShow} onClose={() => setSignupModalShow(false)}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-3 text-2xl text-center font-bold">
            <h1>Create your account</h1>
            <hr className="border border-white border-opacity-20" />
          </div>

          <div className="flex flex-col gap-3 py-5">
            <Input size="md" placeholder="Name" />
            <Input size="md" placeholder="Login" />
            <Input type="password" size="md" placeholder="Password" />
            <Input type="password" size="md" placeholder="Confirm password" />
          </div>

          <div className="flex flex-col">
            <hr className="mb-5 opacity-20" />
            <Button type="outlined">Create account</Button>
          </div>
        </div>
      </Modal>

      {/* Login modal */}
      <Modal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-3 text-2xl text-center font-bold">
            <h1>Welcome back!</h1>
            <hr className="border border-white border-opacity-20" />
          </div>

          <div className="flex flex-col gap-3 py-5">
            <Input size="md" placeholder="Login" />
            <Input type="password" size="md" placeholder="Password" />
          </div>

          <div className="flex flex-col">
            <hr className="mb-5 opacity-20" />
            <Button href="profile" className="w-full" type="outlined">Login</Button>
          </div>
        </div>
      </Modal>

      <div className="h-auto md:h-full flex flex-col md:flex-row justify-between items-center">

        {/* Left side */}
        <div className="md:w-1/2 sm:w-full md:h-full mb-20 md:mb-0 p-5 relative flex justify-center items-center text-white">
          <img src="y-logo.svg" className="relative z-10 w-8 md:w-56" alt="" />
          <div className="w-16 h-16 md:w-64 md:h-64 rounded-full md:opacity-40 bg-cyan-300 blur-3xl absolute animate-pulse"></div>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 sm:w-full p-6 text-white flex justify-center items-center">
          <div>
            <h1 className="text-3xl text-center font-extrabold mb-10">Explore a universe of possibilities</h1>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-center">Join our community!</h2>

              <Button size="md" onClick={() => setSignupModalShow(true)}>Sign up</Button>
            </div>

            <div className="flex items-center opacity-30 my-5">
              <hr className="border w-full" />
              <p className="px-5 font-bold">or</p>
              <hr className="border w-full" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-center">Already have an account?</h2>

              <Button size="sm" type="outlined" onClick={() => setLoginModalShow(true)}>Login</Button>
            </div>

          </div>
        </div>

      </div>

      <div className="w-full text-white font-bold opacity-30 p-2">
        <p>Developed by <a className="underline text-cyan-100 hover:text-cyan-200 transition" href="https://github.com/gabrielmjacques">Edson Gabriel</a></p>
      </div>

    </main >
  );
}
