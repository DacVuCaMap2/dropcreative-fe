"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Form, Input, message } from "antd";
import { ChevronLeft } from "lucide-react";
import { FieldType, IProps } from "./types";
import EnterCode from "./EnterCode";
import { TypeRegister, TypeResponse } from "@/types/common";
import { AxiosResponse } from "axios";
import { authRegister } from "@/api/api";

const Register = (props: IProps) => {
  const { setIsLogin, setIsRegister } = props;
  const [form] = Form.useForm();
  const [isNavigateEnterCode, setIsNavigateEnterCode] = useState(false);

  const handleRegister = async (data: TypeRegister) => {
    try {
      const res: AxiosResponse<TypeResponse> = await authRegister(data);
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        setIsNavigateEnterCode(true);
      }
    } catch (error: any) {
      message.error("error", error?.data?.message);
    }
  };
  return (
    <>
      {isNavigateEnterCode ? (
        <EnterCode
          isNavigateEnterCode={isNavigateEnterCode}
          email={form.getFieldValue("email")}
          setIsRegister={setIsRegister}
          setIsNavigateEnterCode={setIsNavigateEnterCode}
        />
      ) : (
        <div className="w-3/12">
          <div className="w-80 flex flex-col gap-7">
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
            <p className="text-center mt-1 text-2xl text-gray-700 font-medium">
              Create an account
            </p>
            <div className="flex justify-center">
              <Form
                form={form}
                name="basic"
                onFinish={(values) => handleRegister(values)}
                initialValues={{ remember: true }}
                autoComplete="off"
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
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password className="w-60 h-9" />
                </Form.Item>
                <label className="text-sm font-medium	">
                  Username<span className="text-red-500">*</span>
                </label>
                <Form.Item<FieldType>
                  name="userName"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input className="w-60 rounded-md h-9 border-slate-300" />
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
                  <Input className="w-60 rounded-md h-9 border-slate-300" />
                </Form.Item>
                {/* <Form.Item<FieldType> name="remember" valuePropName="checked">
                  <div className="w-60">
                    <Checkbox className="mt-1" />
                    <span className="ml-2">
                      I do not wish to receive news and promotions from Freepik
                      Company by email.
                    </span>
                  </div>
                </Form.Item> */}
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="w-60 h-10 rounded text-base font-medium"
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
      )}
    </>
  );
};

export default Register;
