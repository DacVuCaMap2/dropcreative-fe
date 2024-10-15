"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Checkbox, Form, Input, message } from "antd";
import Register from "./Register";
import { FieldType } from "./types";
import { authLogin } from "@/api/api";
import { AxiosResponse } from "axios";
import { TypeLogin, TypeResponse } from "@/types/common";
import { useRouter } from "next/navigation";
import { setCookie } from "@/ultils";
import Link from "next/link";

const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("");
  useEffect(() => {
    const backgrounds = [
      "bg1.png",
      "bg2.png",
      "bg3.png",
      "bg4.png",
      "bg5.png",
      "bg6.png",
      "bg7.png",
      "bg8.png",
    ];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackgroundImage(backgrounds[randomIndex]);
  }, []);
  const handleLogin = async (data: TypeLogin) => {
    try {
      const res: AxiosResponse<TypeResponse> = await authLogin(data);
      const { status, message: resMessage, jwt, id, expired, role } = res.data;
      if (status === 0) {
        message.error(resMessage);
        return;
      }

      if (jwt) {
        setCookie("auth_token", jwt, {
          path: "/",
          secure: true,
          "max-age": `${expired}`, // Cookie expires after 1 hour
          sameSite: "Strict", // Cookie sent only with same-site requests
        });
      }

      if (id) {
        setCookie("account_id", id, {
          path: "/",
          secure: true,
          "max-age": `${expired}`, // Cookie expires after 1 hour
          sameSite: "Strict", // Cookie sent only with same-site requests
        });
      }
      if (role) {
        setCookie("role", role, {
          path: "/",
          secure: true,
          "max-age": `${expired}`, // Cookie expires after 1 hour
          sameSite: "Strict", // Cookie sent only with same-site requests
        });
      }
      // router.push("/");
      window.location.href = "/";
    } catch (error: any) {
      message.error("error", error?.data?.message);
    }
  };
  return (
    <div className="flex flex-row h-screen relative">
      <div className="w-full h-screen">
        {backgroundImage && (
          <Image
            src={`/login/${backgroundImage}`}
            width={1000}
            height={0}
            alt="Image"
            objectFit="cover"
            priority
            quality={100}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="bg-white px-16 w-[450px] py-10 h-screen overflow-auto">
        {isLogin && (
          <div className="pt-16 flex flex-col gap-7 ">
            <div className="flex flex-col justify-center items-center">
              <Link href={'/'}>
                <Image
                  src="/image/logo-font.png"
                  alt="Logo"
                  width={180}
                  height={0}
                  className=" object-contain"
                />
              </Link>
            </div>
            <p className="text-center mt-3 text-lg text-gray-700 font-semibold">
              Login
            </p>
            <div className="flex justify-center">
              <Form
                form={form}
                name="basic"

                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={(values) => handleLogin(values)}
                className="flex flex-col w-full"
              >
                <label className="text-sm font-medium	">
                  Email<span className="text-red-500">*</span>
                </label>
                <Form.Item<FieldType>
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "Invalid email format!",
                    },
                  ]}
                  className="w-full"
                >
                  <Input className="w-full rounded-md h-9 border-slate-300" />
                </Form.Item>
                <label className="text-sm font-medium">
                  Password<span className="text-red-500">*</span>
                </label>
                <Form.Item<FieldType>
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password className="w-full h-9" />
                </Form.Item>

                <Form.Item<FieldType>
                  name="isRemember"
                  valuePropName="checked"
                >
                  <Checkbox>Stay logged in</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="w-full h-10 rounded text-base font-medium"
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className=" flex flex-row w-full text-sm justify-center space-x-2">
              <span className="">Don’t you have an account?</span>
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => {
                  setIsRegister(true);
                  setIsLogin(false);
                }}
              >
                Sign up
              </span>
            </div>
          </div>
        )}
        {isRegister && (
          <Register setIsLogin={setIsLogin} setIsRegister={setIsRegister} />
        )}
      </div>
    </div>
  );
};

export default Login;
