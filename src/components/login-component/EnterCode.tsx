"use client";
import React from "react";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import { ChevronLeft } from "lucide-react";
import { FieldType, IPropsEnterCode } from "./types";

const EnterCode = (props: IPropsEnterCode) => {
  const { isNavigateEnterCode } = props;
  const [form] = Form.useForm();

  return (
    <>
      {isNavigateEnterCode && (
        <>
          <div className="w-3/12">
            <div className="w-80 flex flex-col gap-7">
              <div className="flex gap-2 text-blue-700 font-semibold text-sm cursor-pointer">
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
                Enter verification code
              </p>
              <span className="text-center text-sm text-zinc-500">
                We're sent a code to{" "}
                <span className="text-black font-semibold">
                  hello@gmail.com
                </span>
              </span>
              <div className="flex justify-center">
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                  className="w-9/12"
                >
                  <div className="flex flex-col justify-center">
                    <Form.Item<FieldType>
                      name="codeVerify"
                      rules={[
                        {
                          required: true,
                          message: "Please input your verify code!",
                        },
                      ]}
                    >
                      <div className="w-60">
                        <Input.OTP formatter={(str) => str.toUpperCase()} />
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
                  <div className="text-center text-sm text-zinc-500">
                    Didn't get a code?{" "}
                    <span className="text-black font-semibold underline">
                      Click to resend.
                    </span>
                  </div>
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
