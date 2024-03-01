'use client';

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import { IPost } from "@/interfaces/IPost";
import IUser from "@/interfaces/IUser";
import { postService } from "@/services/postService";
import { bufferToImageUrl } from "@/utils/bufferUtil";
import { fromLocalStorage } from "@/utils/localStorageUtil";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { Input as AntInput, Avatar as AntAvatar, ConfigProvider, DatePicker, Form, Spin, Upload, UploadProps, notification, theme } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EditProfileForm {
  name: string;
  birthdate: any;
  local: string;
  bio: string;
}

export default function Profile({ params }: { params: { slug: string; }; }) {
  const [user, setUser] = useState<IUser>();
  const [userAvatar, setUserAvatar] = useState<any>();
  const [userBanner, setUserBanner] = useState<any>();
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  const [editProfileLoading, setEditProfileLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>();

  const [showNotification, contextHolder] = notification.useNotification();

  const router = useRouter();
  const session = useSession();

  const updateLocalUser = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/gl/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fromLocalStorage.set.user(data.user);
        }
      });
  };

  // Function to fetch user data
  const fetchUser = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/gl/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const avatar = data.user.avatar ? bufferToImageUrl(data.user.avatar.data) : null;
          const banner = data.user.banner ? bufferToImageUrl(data.user.banner.data) : null;

          setUserAvatar(avatar);
          setUserBanner(banner);

          setUser(data.user);
          setProfileLoading(false);

        } else {
          setProfileLoading(false);
        }

      });
  };

  // Function to handle edit profile form submit
  const onEditProfileFinish = (e: EditProfileForm) => {
    setEditProfileLoading(true);

    let formattedDate: string | undefined = e.birthdate;

    if (e.birthdate)
      formattedDate = dayjs(e.birthdate).format("YYYY-MM-DD");

    const userData: IUser = {
      name: e.name,
      login: user!.login,
      birthdate: formattedDate,
      bio: e.bio,
      local: e.local
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/edit/${session.data?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })

      .then(res => res.json())
      .then(data => {
        if (data.success) {
          showNotification.success({
            message: "Profile Updated!",
            description: "Some changes may take a moment to take effect"
          });

          fetchUser();
          updateLocalUser();
          setEditProfileModal(false);

        } else {
          showNotification.error({
            message: "Error!",
            description: data.message
          });
        }

        setEditProfileLoading(false);
      });
  };

  // Function to disable specific dates on date picker
  const disableDate = (current: any) => {
    return current && current > dayjs().endOf('day').subtract(18, 'year');
  };

  // Function to open edit profile modal
  const openModal = () => {
    setEditProfileModal(true);
  };

  // Function to handle avatar upload
  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      showNotification.error({
        message: "Error!",
        description: "You can only upload JPG/PNG file!"
      });
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      showNotification.error({
        message: "Error!",
        description: "Image must smaller than 2MB!"
      });
    }

    return isJpgOrPng && isLt2M;
  };

  // Function to handle avatar upload change
  const onAvatarUploadChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "done") {
      showNotification.success({
        message: "Success!",
        description: "Avatar successfully changed! It may take a moment for the update to take effect"

      });

      fetchUser();
      updateLocalUser();

    } else if (info.file.status === "error") {
      showNotification.error({
        message: "Error!",
        description: info.file.response.message
      });
    }
  };

  const onBannerUploadChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "done") {
      showNotification.success({
        message: "Success!",
        description: "Banner successfully changed! It may take a moment for the update to take effect"
      });

      fetchUser();
      updateLocalUser();

    } else if (info.file.status === "error") {
      showNotification.error({
        message: "Error!",
        description: info.file.response.message
      });
    }
  };

  useEffect(() => {
    fetchUser();

    const posts = postService.getPostsById();
  }, []);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <main>

        {/* Loading */}
        <Spin spinning={profileLoading} fullscreen className="scale-150 backdrop-blur-sm" indicator={<LoadingOutlined />} />

        {/* Profile */}
        {user &&
          <>
            {contextHolder}

            {/* Edit profile modal */}
            <Modal
              isOpen={editProfileModal}
              onClose={() => setEditProfileModal(false)}
            >
              <Form
                onFinish={onEditProfileFinish}
                autoComplete="off"
                className="flex flex-col justify-between h-full"
              >

                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-3 py-5">

                    <div className="relative flex justify-center flex-col mb-10">
                      {/* Banner */}
                      <Upload
                        accept="image/png, image/jpeg"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={onBannerUploadChange}
                        action={`${process.env.NEXT_PUBLIC_API_URL}/user/banner/${user.id}`}
                        className="transition-all duration-300 hover:brightness-90"
                      >
                        {
                          userBanner
                            ? <img src={userBanner} alt="Banner" className="transition-all duration-300 hover:brightness-75 active:brightness-50" />
                            : <div className="w-full h-64 flex justify-center items-center bg-gradient-to-bl from-gray-900 to-gray-950">
                              <span className="text-center font-black text-xl md:text-3xl opacity-30">Place your banner here</span>
                            </div>
                        }
                      </Upload>

                      {/* Avatar */}
                      <Upload
                        accept="image/png, image/jpeg"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={onAvatarUploadChange}
                        action={`${process.env.NEXT_PUBLIC_API_URL}/user/avatar/${user.id}`}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full overflow-hidden w-32 h-32 transition-all duration-300 hover:brightness-75"
                      >
                        {
                          userAvatar
                            ? <img src={userAvatar} alt="Avatar" className="object-cover w-32 h-32" />
                            : <div className="w-32 h-32 flex justify-center items-center bg-gradient-to-bl from-gray-900 to-gray-950">
                              <AntAvatar size={100} className="bg-transparent opacity-50" icon={<UserOutlined />} />
                            </div>
                        }
                      </Upload>
                    </div>

                    {/* Name */}
                    <Form.Item
                      name="name"
                      initialValue={user.name}
                      rules={[
                        { required: true, message: "Please enter your name" },
                        { max: 30, message: "Login must be maximum 30 characters" },
                        {
                          pattern: /^(?!.*\s$)(?!^\s)[A-Za-zÀ-ÿ0-9.\s]{1,60}$/, message: "Name must contain only letters and numbers"
                        }
                      ]}
                    >
                      <AntInput size="large" placeholder="Name" className="bg-transparent" />
                    </Form.Item>

                    {/* Date picker */}
                    <Form.Item
                      name={"birthdate"}
                      initialValue={
                        user.birthdate ? dayjs(user.birthdate) : dayjs().endOf('day').subtract(18, 'year')
                      }
                    >
                      <DatePicker
                        size="large"
                        disabledDate={disableDate}
                        format={"MM/DD/YYYY"}
                        placeholder="Date of birth"
                        className="w-full bg-transparent" />
                    </Form.Item>

                    {/* Local */}
                    <Form.Item
                      name={"local"}
                      rules={[
                        { min: 3, max: 60, message: "Local must be between 3 and 60 characters" }
                      ]}
                    >
                      <AntInput size="large" placeholder="Local" className="bg-transparent" />
                    </Form.Item>

                    {/* Bio */}
                    <Form.Item
                      name={"bio"}
                      rules={[
                        { max: 130, message: "Bio must be less than 130 characters" }
                      ]}
                    >
                      <AntInput size="large" placeholder="Bio" className="bg-transparent" />
                    </Form.Item>

                    <Form.Item>
                      <Button disabled={editProfileLoading} htmlType="submit" type="outlined" className="w-full">Confirm</Button>
                    </Form.Item>
                  </div>
                </div>

              </Form>
            </Modal>

            {/* Back menu */}
            <section className="fixed bg-gray-950 w-full flex items-center gap-5 px-5">
              <Button onClick={() => router.replace("/")} type="text" size="sm" sx={{ padding: 10 }}>
                <img src="/icons/left-arr.svg" className="w-4" alt="" />
              </Button>

              <div className="py-1 flex flex-col">
                <span className="text-lg font-bold">{user?.name}</span>
                <span className="text-sm opacity-50">0 posts</span>
              </div>
            </section>

            {/* Profile images */}
            <section>
              {/* Banner */}
              <div className="w-full h-64 overflow-hidden">
                {
                  userBanner
                    ? <img className="object-cover w-full h-full" src={userBanner} alt="" />
                    : <div className="w-full h-full bg-gradient-to-bl from-gray-900 to-gray-950"></div>
                }
              </div>

              {/* Avatar */}
              <div className="relative -mt-12 md:-mt-20 ms-5 w-24 md:w-36 h-24 md:h-36 border-4 bg-gradient-to-bl from-gray-900 to-gray-950 border-black rounded-full overflow-hidden">
                {
                  userAvatar
                    ? <img className="object-cover w-full h-full" src={userAvatar} alt="" />
                    : <div className="w-full h-full flex items-center justify-center">
                      <AntAvatar size={100} className="bg-transparent opacity-50" icon={<UserOutlined />} />
                    </div>
                }
              </div>
            </section>

            {/* Profile Data */}
            <section className="px-5 py-3 flex flex-col gap-2">
              <div>
                <div className="flex justify-between">
                  {/* Profile name */}
                  <h1 className="text-lg md:text-2xl font-bold">{user.name}</h1>
                  {
                    session.data?.id === user.id ?
                      <Button onClick={openModal} type="outlined" size="sm" className="px-5 text-white">
                        Edit profile
                      </Button>

                      : <Button size="sm" className="px-5 text-white">
                        Follow
                      </Button>
                  }
                </div>

                {/* Profile login */}
                <small className="text-sm opacity-50">@{user.login}</small>
              </div>

              {/* Profile bio */}
              <div className="text-sm flex flex-col gap-2">
                <span>{user.bio ? user.bio : ""}</span>
              </div>

              {/* Profile local and birthdate */}
              <div className="text-sm flex gap-4 opacity-50">
                {user.local &&
                  <div className="flex gap-2">
                    <img className="w-4" src="/icons/local.svg" alt="" />
                    <span>{user.local}</span>
                  </div>
                }

                <div className="text-sm flex gap-2">
                  <img className="w-4" src="/icons/calendar.svg" alt="" />
                  <span>
                    {`Joined ${dayjs(user.createdAt).format("MMMM YYYY")}`}
                  </span>
                </div>
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
            <section className="h-12 flex border-b border-white border-opacity-20">
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



            </section>
          </>
        }

        {!user && !profileLoading &&
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">User not found</h1>
        }
      </main>
    </ConfigProvider>
  );
};
