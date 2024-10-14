"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Checkbox, Form, Input, message } from "antd";
import Register from "./Register";
import { FieldType } from "./types";
import { authLogin } from "@/api/api";
import { AxiosResponse } from "axios";
import { TypeLogin, TypeResponse } from "@/types/common";
import { redirect, useRouter } from "next/navigation";
import { setCookie } from "@/ultils";

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
      const { status, message: resMessage, jwt, id, expired } = res.data;
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
      // router.push("/");
      window.location.href="/";
    } catch (error: any) {
      message.error("error", error?.data?.message);
    }
  };
  return (
    <div className="flex h-screen relative">
      <div className="w-full h-screen">
        {backgroundImage && (
          <Image
            src={`/login/${backgroundImage}`}
            width={1440}
            height={900}
            alt="Image"
            objectFit="cover"
            priority
            quality={75}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="absolute right-0 bg-white px-10 py-10 h-screen overflow-auto">
        {isLogin && (
          <div className="w-3/12">
            <div className="w-80 pt-16 flex flex-col gap-7 ">
              <div className="flex justify-center">
                <Image
                  src="/image/logo-font.png"
                  alt="Logo"
                  width={250}
                  height={0}
                  className="object-contain"
                />
              </div>
              <p className="text-center mt-3 text-2xl text-gray-700 font-semibold">
                Login
              </p>
              <div className="flex justify-center">
                <Form
                  form={form}
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                  onFinish={(values) => handleLogin(values)}
                  className="w-9/12"
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
                  >
                    <Input className="w-60 rounded-md h-9 border-slate-300" />
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
                    <Input.Password className="w-60 h-9" />
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
                      className="w-60 h-10 rounded text-base font-medium"
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className="font-semibold flex gap-1 justify-center text-sm text-gray-600">
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
