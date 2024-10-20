import { Button, Card } from "antd";
import { Check, TriangleAlertIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import Footer from "../home-component/Footer";

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
              <Card hoverable className="flex-1">
                <div className="flex gap-5 flex-col gap-10">
                  <p className="text-black text-2xl font-medium">Essential</p>
                  <div>
                    <span className="text-4xl text-black font-semibold">
                      3,75 EUR&nbsp;
                    </span>
                    <span className="text-base text-gray-600">/month</span>
                    <p className="text-sm text-gray-500">
                      45 EUR. Billed annually
                    </p>
                  </div>
                  <p className="text-base text-black font-semibold flex">
                    <TriangleAlertIcon
                      width={15}
                      height={15}
                      className="mt-1"
                    />
                    This plan doesn’t cover Premium content
                  </p>
                  <div>
                    <p className="text-base font-semibold text-black">
                      AI & Tools
                    </p>
                    <div className="mt-3">
                      <p className="flex">
                        <Check
                          color="green"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        84000 AI credits /year
                      </p>
                      <p className="flex">
                        <Check
                          color="green"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        Easy-to-use online design tools
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-400">
                      No Premium stock contents
                    </p>
                    <div className="mt-3">
                      <p className="flex">
                        <X
                          color="gray"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        84000 AI credits /year
                      </p>
                      <p className="flex">
                        <X
                          color="gray"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        Easy-to-use online design tools
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card hoverable className="flex-1">
                <div className="flex gap-5 flex-col gap-10">
                  <p className="text-black text-2xl font-medium">Premium</p>
                  <div>
                    <span className="text-4xl text-black font-semibold">
                      9 EUR&nbsp;
                    </span>
                    <span className="text-base text-gray-600">/month</span>
                    <p className="text-sm text-gray-500">
                      108 EUR. Billed annually
                    </p>
                  </div>
                  <div>
                    <Button
                      className="w-full h-10 text-base font-semibold"
                      type="primary"
                    >
                      Get premium
                    </Button>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-black">
                      AI & Tools
                    </p>
                    <div className="mt-3">
                      <p className="flex">
                        <Check
                          color="green"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        216000 AI credits /year
                      </p>
                      <p className="flex">
                        <Check
                          color="green"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        Easy-to-use online design tools
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-400">
                      Premium stock content
                    </p>
                    <div className="mt-3">
                      <p className="flex">
                        <Check
                          color="gray"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        All Premium stock content
                      </p>
                      <p className="flex">
                        <Check
                          color="gray"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        Unlimited downloads
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card hoverable className="flex-1">
                <div className="flex gap-5 flex-col gap-10">
                  <p className="text-black text-2xl font-medium">Premium+</p>
                  <div>
                    <span className="text-4xl text-black font-semibold">
                      21 EUR&nbsp;
                    </span>
                    <span className="text-base text-gray-600">/month</span>
                    <p className="text-sm text-gray-500">
                      252 EUR. Billed annually
                    </p>
                  </div>
                  <div>
                    <Button
                      className="w-full h-10 text-base font-semibold"
                      type="primary"
                    >
                      Get premium+
                    </Button>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-black">
                      AI & Tools
                    </p>
                    <div className="mt-3">
                      <p className="flex">
                        <Check
                          color="green"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        540000 AI credits /year
                      </p>
                      <p className="flex">
                        <Check
                          color="green"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        Easy-to-use online design tools
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-400">
                      Premium stock content
                    </p>
                    <div className="mt-3">
                      <p className="flex">
                        <X
                          color="gray"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        All Premium stock content
                      </p>
                      <p className="flex">
                        <X
                          color="gray"
                          width={15}
                          height={15}
                          className="mt-1 mr-1"
                        />
                        Unlimited downloads
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
