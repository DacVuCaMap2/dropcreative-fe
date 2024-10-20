"use client";
import { Tabs, TabsProps } from "antd";
import { Download, Heart, User } from "lucide-react";
import React from "react";
import ProfileUser from "./ProfileUser";
import ProfileDownloads from "./ProfileDownloads";
import ProfileFavorites from "./ProfileFavorites";
import Footer from "../home-component/Footer";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <>
        <div className="flex gap-2 text-gray-500">
          <User width={20} height={20} />
          <p>User</p>
        </div>
      </>
    ),
    children: <ProfileUser />,
  },
  {
    key: "2",
    label: (
      <>
        <div className="flex gap-2 text-gray-500">
          <Download width={20} height={20} />
          <p>Downloads</p>
        </div>
      </>
    ),
    children: <ProfileDownloads />,
  },
  {
    key: "3",
    label: (
      <>
        <div className="flex gap-2 text-gray-500">
          <Heart width={20} height={20} />
          <p>Favorites</p>
        </div>
      </>
    ),
    children: <ProfileFavorites />,
  },
];
const Profile = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col gap-2">
        <div className="h-10 main-menu"></div>
        <div className="flex flex-col items-center p-5">
          <Tabs
            defaultActiveKey="1"
            items={items}
            centered
            onChange={onChange}
            className="w-full"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
