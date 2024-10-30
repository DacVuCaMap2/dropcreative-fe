import Image from "next/image";
import IconFooter from "./IconFooter";

export default function Footer() {
  return (
    <div className="px-64 pt-10 pb-20 bg-[rgba(18,18,18,1)] font-sans">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[rgba(255,255,255,0.9)] mb-[20px] text-sm font-bold cursor-pointer">
            TOOLS
          </span>
          <div className="text-[rgba(119,119,119,0.9)] text-sm flex flex-col gap-3">
            <p className="hover:text-white cursor-pointer">
              AI image generator
            </p>
            <p className="hover:text-white cursor-pointer">
              Facebook ads libary
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[rgba(255,255,255,0.9)] mb-[20px] text-sm font-bold cursor-pointer">
            INFORMATION
          </span>
          <div className="text-[rgba(119,119,119,0.9)] text-sm flex flex-col gap-3">
            <p className="hover:text-white cursor-pointer">Pricing</p>
            <p className="hover:text-white cursor-pointer">About us</p>
            <p className="hover:text-white cursor-pointer">API</p>
            <p className="hover:text-white cursor-pointer">Jobs</p>
            <p className="hover:text-white cursor-pointer">Sell content</p>
            <p className="hover:text-white cursor-pointer">
              DropCreative brand guidelines
            </p>
            <p className="hover:text-white cursor-pointer">Events</p>
            <p className="hover:text-white cursor-pointer">Search trends</p>
            <p className="hover:text-white cursor-pointer">Blog</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[rgba(255,255,255,0.9)] mb-[20px] text-sm font-bold cursor-pointer">
            LEGAL
          </span>
          <div className="text-[rgba(119,119,119,0.9)] text-sm flex flex-col gap-3">
            <p className="hover:text-white cursor-pointer">Terms of use</p>
            <p className="hover:text-white cursor-pointer">License agreement</p>
            <p className="hover:text-white cursor-pointer">Privacy Policy</p>
            <p className="hover:text-white cursor-pointer">
              Copyright information
            </p>
            <p className="hover:text-white cursor-pointer">Cookies policy</p>
            <p className="hover:text-white cursor-pointer">Cookies Settings</p>
          </div>
          <span className="text-[rgba(255,255,255,0.9)] mt-10 mb-[20px] text-sm font-bold cursor-pointer">
            SUPPORT
          </span>
          <div className="text-[rgba(119,119,119,0.9)] text-sm flex flex-col gap-3">
            <p className="hover:text-white cursor-pointer">FAQ</p>
            <p className="hover:text-white cursor-pointer">Search guide</p>
            <p className="hover:text-white cursor-pointer">Contact</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-[rgba(255,255,255,0.9)] text-sm font-bold">
            SOCIAL MEDIA
          </span>
          <div className="mt-3">
            <IconFooter />
          </div>
          <span className="text-[rgba(119,119,119,0.9)] text-sm">
            Get exclusive assets sent straight to your inbox
          </span>
        </div>
      </div>
      <hr className="mt-10 mb-10" />
      <div className="flex items-center">
        <Image
          src="/image/logo-wh.png"
          width={160}
          height={40}
          loading="lazy"
          alt="logo"
        />
        <p className="text-[#C8C8C8] text-sm font-sans font-semibold mt-1">
          Copyright © 2010-2024 Freepik Company S.L. All rights reserved.
        </p>
      </div>
    </div>
  );
}
