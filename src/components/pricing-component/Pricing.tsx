import { Card } from "antd";
import Image from "next/image";
import React from "react";

const Pricing = () => {
  return (
    <div className="w-full h-screen">
      <div className="p-4 flex justify-between">
        <Image
          src="/image/logo-font.png"
          alt="Logo"
          width={160}
          height={0}
          className="object-contain"
        />
        <button className="flex items-center border text-xs font-bold text-gray-500 px-4 py-2 rounded">
          Sign in
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col py-16 space-y-20 lg:w-[1340px] w-screen px-4">
          <div className="flex flex-col space-y-4">
            <p className="text-6xl text-center font-medium">Pricing</p>
            <p className="text-base text-gray-600 text-center font-medium">
              Access cutting-edge AI tools, easy-to-use design tools and Premium
              stock content.
              <br />
              All with one subscription.
            </p>
            <div className="mt-4 flex gap-10">
              {/* <Card hoverable style={{ width: 240 }}>
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card> */}

              <Card hoverable className="flex-1">
                aaa
              </Card>
              <Card hoverable className="flex-1">
                aaa
              </Card>
              <Card hoverable className="flex-1">
                aaa
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
