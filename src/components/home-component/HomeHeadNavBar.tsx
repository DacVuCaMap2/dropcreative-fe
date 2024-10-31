"use client";
import { deleteAllCookies } from "@/ultils";
import { Bell, ChevronDown, Upload, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
type Props = {
  email: string;
  role: string;
  type: number;
}
export default function HomeHeadNavBar(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("first");
    deleteAllCookies();
    router.push("/login");
  };
  return (
    <header className={`w-full absolute z-30 top-30 ${props.type === 0 ? "text-white" : "text-black sticky top-0 bg-white"}`}>
      <nav className="border-gray-200 flex justify-between items-center px-4 py-2">
        <div className="flex flex-row items-center space-x-8">
          <Link href={"/"}>
            <Image
              src={props.type === 0 ? "/image/logo-wh.png" : "/image/logo-font.png"}
              alt="Logo"
              width={160}
              height={0}
              className="object-contain"
            />
          </Link>
          <div className="flex flex-row space-x-6 text-xs font-bold items-center">
            <Link href={"/admin/home"} className="">
              Manager
            </Link>
            <Link href={"/"}>Tools</Link>
            <Link href={"/"}>About us</Link>
            <Link href={"/"}>Blog</Link>
            <Link href={"/"}>Events</Link>
            <Link href={"/"}>Contact</Link>
            <Link href={"/"}>More</Link>
          </div>
        </div>

        {/* Các biểu tượng bên phải */}
        <div className="flex items-center space-x-4">
          {/* Ảnh đại diện với dropdown */}
          {(props.email && props.role) ?
            <div className="flex flex-row space-x-6 justify-center items-center">

              <button className="flex items-center border text-xs px-4 py-2 rounded flex-row space-x-3">
                <div className=" flex flex-row items-center space-x-1">
                  <Wallet />
                  <span>Your wallet</span>
                </div>
                <span className="font-bold text-sm">$0</span>
              </button>
              <Link href={"/pricing"} className="text-yellow-400  text-sm font-bold">
                Pricing
              </Link>
              {/* <button className="hover:text-blue-500 bell">
                <Bell size={18} />
                <Tooltip anchorSelect=".bell" place="bottom">
                  Notification
                </Tooltip>
              </button> */}
              <div className="relative">
                <button onClick={toggleDropdown} className="flex">
                  <div className="mr-2">
                    {" "}
                    {/* Thêm khoảng cách bên phải cho hình ảnh */}
                    <Image
                      src="/image/default/user-default.png"
                      alt="default"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="text-xs text-left w-20 ">
                    <p className=" truncate">{props.email}</p>
                    <p className="text-gray-400">{props.role.replace("_role", "")}</p>
                  </div>
                  <div>
                    <ChevronDown size={14} />
                  </div>
                </button>
                {/* Dropdown */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <ul className="py-2">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          My Attribute
                        </a>
                      </li>
                      <li>
                        <p
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            :
            <Link href={"/login"} className="flex items-center border text-sm font-bold px-4 py-2 rounded">
              Sign in
            </Link >
          }
        </div>
      </nav>
    </header>
  );
}
