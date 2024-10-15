"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Form, Input, message } from "antd";
import { ChevronLeft } from "lucide-react";
import { FieldType, IPropsEnterCode } from "./types";
import { TypeResponse } from "@/types/common";
import { AxiosResponse } from "axios";
import { checkActiveCode } from "@/api/api";

const EnterCode = (props: IPropsEnterCode) => {
  const { isNavigateEnterCode, email, setIsRegister, setIsNavigateEnterCode } =
    props;
  const [form] = Form.useForm();
  const [codeActive, setActiveCode] = useState<string>();
  const handleSubmitCode = async () => {
    try {
      const res: AxiosResponse<TypeResponse> = await checkActiveCode(
        codeActive,
        email
      );
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        window.location.reload();
      }
    } catch (error: any) {
      message.error("error", error?.data?.message);
    }
  };
  return (
    <>
      {isNavigateEnterCode && (
        <>
          <div className="relative">
            <div className="flex flex-col gap-7">
              <div
                className="absolute left-[-60px] flex gap-2 text-blue-700 font-semibold text-sm cursor-pointer"
                onClick={() => {
                  setIsRegister(true);
                  setIsNavigateEnterCode(false);
                }}
              >
                <ChevronLeft width={20} height={20} />
                <span className="text-sm">Back</span>
              </div>
              <div className="flex justify-center pt-10">
                <Image
                  src="/image/logo-font.png"
                  alt="Logo"
                  width={180}
                  height={0}
                  className="object-contain"
                />
              </div>
              <p className="text-center mt-1 text-2xl text-gray-700 font-medium">
                Enter verification code
              </p>
              <span className="text-center text-sm text-zinc-500">
                We&#39;re sent a code to&ensp;
                <span className="text-black font-semibold">{email}</span>
              </span>
              <div className="flex justify-center">
                <Form
                  form={form}
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={handleSubmitCode}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                  className=""
                >
                  <div className="flex flex-col justify-center">
                    <Form.Item<FieldType>
                      name="activeCode"
                      rules={[
                        {
                          required: true,
                          message: "Please input your code!",
                        },
                      ]}
                    >
                      <div className="w-60">
                        <Input.OTP
                          formatter={(str) => str.toUpperCase()}
                          onChange={(value) => setActiveCode(value)}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="primary"
                        className="w-60 h-10 rounded text-base font-medium"
                      >
                        Submit code
                      </Button>
                    </Form.Item>
                  </div>
                  {/* <div className="text-center text-sm text-zinc-500">
                    Didn&#39;t get a code?
                    <span className="text-black font-semibold underline">
                      Click to resend.
                    </span>
                  </div> */}
                </Form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EnterCode;
