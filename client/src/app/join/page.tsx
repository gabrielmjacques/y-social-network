'use client';

import { FormEvent, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { Form, notification } from "antd";

interface SignupForm {
  name: string;
  login: string;
  password: string;
  confirm_password: string;
}

export default function Join() {
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  const [showNotification, contextHolder] = notification.useNotification();

  const onFinish = async (e: SignupForm) => {
    const response = await fetch("http://localhost:3001/api/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e)
    });
    const data = await response.json();
    console.log(data);

    if (data.success) {
      setSignupModalShow(false);
      showNotification.success({
        message: "Success!",
        description: "Your account has been created successfully! You can now login"
      });

    } else {
      showNotification.error({
        message: "Error!",
        description: data.message
      });
    }
  };

  return (
    <main className="bg-gray-950 h-screen flex flex-col justify-between">
      {contextHolder}

      {/* Sign up modal */}
      <Modal isOpen={signupModalShow} onClose={() => setSignupModalShow(false)}>
        <Form
          onFinish={onFinish}
          autoComplete="off"
          className="flex flex-col justify-between h-full">

          <div className="flex flex-col justify-between h-full">
            <div className="text-white flex flex-col gap-3 text-2xl text-center font-bold">
              <h1>Join our community!</h1>
              <hr className="border border-white border-opacity-20" />
            </div>

            <div className="flex flex-col gap-3 py-5">
              <Input name="name" size="md" placeholder="Name"
                rules={[
                  { required: true, message: "Please enter your name" },
                  { min: 7, max: 60, message: "Login must be between 7 and 15 characters" },
                  { pattern: /^(?!.*\s$)(?!^\s)[A-Za-zÀ-ÿ\s]{7,60}$/, message: "Name must contain only letters" }
                ]}
              />

              <Input name="login" size="md" placeholder="Login"
                rules={[
                  { required: true, message: "Please enter your login" },
                  { max: 15, message: "Login must be maximum 15 characters" },
                ]}
              />

              <Input name="password" type="password" size="md" placeholder="Password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { pattern: /\d+/, message: "Must contain at least one number" },
                  { pattern: /[A-Z]+/, message: "Must contain at least one uppercase letter" },
                  { pattern: /[a-z]+/, message: "Must contain at least one lowercase letter" },
                  { pattern: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, message: "Password must contain at least one special character" }
                ]}
              />

              <Input name="confirm_password" type="password" size="md" placeholder="Confirm password"
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue("password") != value) {
                        return Promise.reject("Passwords don't match");
                      }
                      return Promise.resolve();
                    }
                  })
                ]}
              />
            </div>

            <div className="flex flex-col">
              <hr className="mb-5 opacity-20" />
              <Form.Item>
                <Button className="w-full" type="outlined">Sign up</Button>
              </Form.Item>
            </div>
          </div>

        </Form>
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
