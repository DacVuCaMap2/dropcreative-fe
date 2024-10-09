"use client";
import React from "react";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import { ChevronLeft } from "lucide-react";
import { FieldType, IProps } from "./types";

const Register = (props: IProps) => {
  const { setIsLogin, setIsRegister } = props;
  const [form] = Form.useForm();

  return (
    <div className="w-3/12">
      <div className="w-full h-screen m-0 m-auto">
        <div className="w-96 m-0 m-auto h-screen pt-14 flex flex-col gap-7">
          <div
            className="flex gap-2 text-blue-700 font-semibold text-sm cursor-pointer"
            onClick={() => {
              setIsRegister(false);
              setIsLogin(true);
            }}
          >
            <ChevronLeft width={20} height={20} />
            <span className="text-sm">Back</span>
          </div>
          <div className="flex justify-center">
            <Image
              src="/image/logo-font.png"
              alt="Logo"
              width={250}
              height={0}
              className="object-contain"
            />
          </div>
          <p className="text-center mt-3 text-2xl text-gray-700 font-medium">
            Create an account
          </p>
          <div className="w-full flex jutify-center">
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              className="m-0 m-auto"
            >
              <div>
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
              </div>
              <label className="text-sm font-medium">
                Password<span className="text-red-500">*</span>
              </label>
              <Form.Item<FieldType>
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="input password"
                  className="w-80 h-9"
                />
              </Form.Item>
              <label className="text-sm font-medium	">
                Username<span className="text-red-500">*</span>
              </label>
              <Form.Item<FieldType>
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input className="w-80 rounded-md h-9 border-slate-300" />
              </Form.Item>
              <label className="text-sm font-medium	">
                Phone number<span className="text-red-500">*</span>
              </label>
              <Form.Item<FieldType>
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^0\d{9,10}$/,
                    message: "Invalid phone number!",
                  },
                ]}
              >
                <Input className="w-80 rounded-md h-9 border-slate-300" />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="w-80 h-10 rounded text-base font-medium"
                >
                  Sign up
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="font-semibold flex gap-1 justify-center text-sm text-gray-600">
            <span>Already have an account?</span>
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => {
                setIsRegister(false);
                setIsLogin(true);
              }}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
