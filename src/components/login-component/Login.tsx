"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Checkbox, Form, Input } from "antd";
import Register from "./Register";
import { FieldType } from "./types";
const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="w-9/12">
        <Image
          src="/login/background.jpg"
          width={1440}
          height={900}
          alt="Image"
          className="h-screen"
        />
      </div>
      {isLogin && (
        <div className="w-3/12">
          <div className="w-80 m-0 m-auto h-screen pt-16 flex flex-col gap-7">
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
            <div>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
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
                  <Input className="w-80 rounded-md h-9 border-slate-300" />
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
                  <Input.Password className="w-80 h-9" />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked">
                  <Checkbox>Stay logged in</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="w-80 h-10 rounded text-base font-medium"
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
  );
};

export default Login;
