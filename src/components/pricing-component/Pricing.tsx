"use client"
import { Button, Card } from "antd";
import { Check, TriangleAlertIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import CardPaypal from "./CardPaypal";
import { pricingData } from "@/data/pricing-data/pricingData";
import { title } from "process";
import SlideProduct from "../home-component/SlideProduct";

const Pricing = () => {
  const listPricing = pricingData;
  const [pricingItem, setPricingItem] = useState<{ value: string, item: any }>({ value: "", item: null });

  const handleOpenPaypal = (item: any) => {
    document.body.style.overflow = 'hidden';
    setPricingItem({ value: item.value, item: item });
  }
  return (
    <div className="relative w-full ">
      {pricingItem.value && <CardPaypal setPricingItem={setPricingItem} value={pricingItem.value} pricing={pricingItem} />}
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col py-16 space-y-20 w-full px-10">
          <div className="flex flex-col space-y-4">
            <p className="text-6xl text-center font-medium">Pricing </p>
            <p className="text-base text-gray-600 text-center font-medium">
              Access cutting-edge AI tools, easy-to-use design tools and Premium
              product content.
              <br />
              All with one subscription.
            </p>
            <div className="mt-4 flex gap-10">
              {listPricing.map((pricing: any, index) => (

                <Card key={index} hoverable className="flex-1">
                  <div className="flex gap-5 flex-col ">
                    <p className="text-black text-2xl font-medium">{pricing.name}</p>
                    <div>
                      <span className="text-4xl text-black font-semibold">
                        {pricing.value} $
                      </span>
                      <span className="text-base text-gray-600">/{pricing.days}</span>
                    </div>
                    <p className="text-base text-black font-semibold flex">
                      <Button
                        onClick={() => handleOpenPaypal(pricing)}
                        className="w-full h-10 text-base font-semibold"
                        type="primary"
                      >
                        Get {pricing.name}
                      </Button>
                    </p>
                    <div>
                      <p className="text-base font-semibold text-black">
                        AI & Tools : {pricing.title}
                      </p>
                      <p className="mt-4 text-base font-semibold text-gray-400">
                        Premium product content
                      </p>
                      <div className="mt-3">
                        {pricing.features.map((feature: any, featureIndex: number) => (
                          <p key={featureIndex} className="flex">
                            <Check
                              color="green"
                              width={15}
                              height={15}
                              className="mt-1 mr-1"
                            />
                            {feature.value === -1 ? "Unlimited" : feature.value} {feature.desc}
                          </p>
                        ))}
                      </div>
                      {/* <div>
                        <p className="mt-4 text-base font-semibold text-gray-400">
                          Benefits
                        </p>
                        <p>{pricing.benefits}</p>
                      </div> */}
                    </div>
                  </div>
                </Card>
              ))}

            </div>
            <SlideProduct />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
