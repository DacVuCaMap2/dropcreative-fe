import {
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";

interface IProps {
  background?: string;
  textColor?: string;
}

const Footer = (props: IProps) => {
  const { background, textColor } = props;
  return (
    <div>
      <div className={`px-96 ${background} pt-10 pb-10 font-sans`}>
        <Row gutter={[48, 16]}>
          <Col span={6} className="flex flex-col gap-5">
            <p className={`${textColor} text-xl font-bold`}>
              Store information
            </p>
            <span className="text-sm text-gray-400">
              San Francisco, CA 94104 USA +1 (408) 899-8879
            </span>
            <div className={`flex gap-3 ${textColor}`}>
              <FacebookOutlined style={{ fontSize: 25, color: textColor }} />
              <InstagramOutlined style={{ fontSize: 25, color: textColor }} />
              <TwitterOutlined style={{ fontSize: 25, color: textColor }} />
              <TikTokOutlined style={{ fontSize: 25, color: textColor }} />
            </div>
          </Col>
          <Col span={6} className="flex flex-col gap-5">
            <p className={`text-xl font-bold ${textColor}`}>Quick shop</p>
            <div className="flex flex-col gap-5 text-sm text-gray-400">
              <span className="hover:text-black cursor-pointer">
                Electronics
              </span>
              <span className="hover:text-black cursor-pointer">Garden</span>
              <span className="hover:text-black cursor-pointer">Apparel</span>
              <span className="hover:text-black cursor-pointer">
                Beauty & Health
              </span>
            </div>
          </Col>
          <Col span={6} className="flex flex-col gap-5">
            <p className={`text-xl font-bold ${textColor}`}>Customer support</p>
            <div className="flex flex-col gap-5 text-sm text-gray-400">
              <span className="hover:text-black cursor-pointer">
                Contact us
              </span>
              <span className="hover:text-black cursor-pointer">About us</span>
              <span className="hover:text-black cursor-pointer">
                Order tracking
              </span>
              <span className="hover:text-black cursor-pointer">FAQs</span>
              <span className="hover:text-black cursor-pointer">Blogs</span>
            </div>
          </Col>
          <Col span={6} className="flex flex-col gap-5">
            <p className={`${textColor} text-xl font-bold`}>Policies</p>
            <div className="flex flex-col gap-5 text-sm text-gray-400">
              <span className="hover:text-black cursor-pointer">
                Privacy policy
              </span>
              <span className="hover:text-black cursor-pointer">
                Tearm of service
              </span>
              <span className="hover:text-black cursor-pointer">
                Shipping policy
              </span>
              <span className="hover:text-black cursor-pointer">
                Refund policy
              </span>
              <span className="hover:text-black cursor-pointer">
                Return policy
              </span>
            </div>
          </Col>
        </Row>
        <hr className="mt-3" />
        <div className="mt-4 text-sm text-gray-400 flex justify-between">
          <p>
            Copyright © 2023 Trendie. All rights reserved. Powered by&nbsp;
            <span className="underline cursor-pointer">DropCreative</span>
          </p>
          <div className="flex gap-3 items-start">
            <p className="underline cursor-pointer">English (EN) | USD</p>
            <p className="underline cursor-pointer">DMCA Report to ShopBase</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Image
            src="/image/payment/mastercard.png"
            alt="MasterCard"
            width={60}
            height={60}
            className="h-8 w-auto"
          />
          <Image
            src="/image/payment/visa.png"
            alt="MasterCard"
            width={60}
            height={60}
            className="h-8 w-auto"
          />
          <Image
            src="/image/payment/discover.png"
            alt="MasterCard"
            width={60}
            height={60}
            className="h-8 w-auto"
          />
          <Image
            src="/image/payment/paypal.png"
            alt="MasterCard"
            width={60}
            height={60}
            className="h-8 w-auto"
          />
          <Image
            src="/image/payment/jcb.png"
            alt="MasterCard"
            width={60}
            height={60}
            className="h-8 w-auto"
          />
          <Image
            src="/image/payment/payoneer.png"
            alt="MasterCard"
            width={60}
            height={60}
            className="h-8 w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
