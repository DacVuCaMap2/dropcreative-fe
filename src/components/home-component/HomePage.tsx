"use client";
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import HomeDropdown from "./HomeDropdown";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import {
  homeCategories,
  homeCountry,
  homeTheme,
} from "@/data/home-data/homeListData";
import HomeCategories from "./HomeCategories";
import SlideProduct from "./SlideProduct";
import InputSearchComponent from "../general-component/InputSearchComponent";
export default function HomePage() {
  const listCategories = homeCategories;
  const listTheme = homeTheme;
  const listCountry = homeCountry;
  const listSuggestSearch = ["Shirt", "Duck Night Light", "Mask"]
  const [keySearch, setKeySearch] = useState("");
  return (
    <div className="">
      <div className="flex flex-col relative ">
        <div className="h-[400px] main-menu"></div>
        <div className="absolute top-44 w-full h-20 flex flex-col justify-center items-center space-y-2">
          <span className="text-3xl font-bold text-white pb-2">
            Ready to start looking product?
          </span>
          <span className="text-white text-sm pb-4">Find all products for any market, images, videos, and landing pages with just one click.</span>
          <InputSearchComponent keySearch={keySearch} setKeySearch={setKeySearch} type={0}/>
          <div className="text-white w-1/2 pt-8 flex flex-row space-x-4 items-start justify-center">
            {listSuggestSearch.map((str: string, index) => (
              <div key={index} className="relative">
                <div className="absolute inset-0 bg-neutral-400 backdrop-blur-md opacity-40 rounded-lg "></div>
                <button onClick={() => setKeySearch(str)} className="hover:bg-neutral-500 relative z-10 w-full py-2 px-4 flex flex-row space-x-2 items-center text-sm rounded-lg">
                  <span className="text-white">{str}</span>
                  <Search className="text-white" size={20} />
                </button>
              </div>
            ))}


          </div>
        </div>
        <div></div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col py-16 space-y-20 lg:w-[1340px] w-screen px-4">
            <div className="flex flex-col space-y-4">
              <span className="font-bold text-xl">
                AI helps create product images and increase creativity
              </span>
              <div className="flex flex-row w-full space-x-6 ">
                <Link href={"/tools-page"}>
                  <div className="relative flex flex-col h-56 w-56 bg-red-400 rounded-xl overflow-hidden group">
                    <div className="absolute top-3 left-2 z-10 text-white font-bold">
                      AI Product Builder
                    </div>
                    <span className="absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                      Generate product images from the world in real time
                    </span>
                    <Image
                      src="/image/default/AIgen.jpg"
                      alt="Image"
                      width={300}
                      height={300}
                      className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50" />
                  </div>
                </Link>
                <Link href={"/tools-page"}>
                  <div className="relative flex flex-col h-56 w-56 bg-red-400 rounded-xl overflow-hidden group">
                    <div className="absolute top-3 left-2 z-10 text-white font-bold">
                      Design
                    </div>
                    <span className="absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                      Developing....
                    </span>
                    <Image
                      src="/image/default/designerImg.jpg"
                      alt="Image"
                      width={300}
                      height={300}
                      className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50" />
                  </div>
                </Link>
              </div>
            </div>

            <HomeCategories />

            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <p className="text-center font-bold text-3xl">Product Holiday</p>
                <p className="text-center text-lg text-neutral-600">
                  Check to see which product theme is right for you
                </p>
              </div>
              <div className="flex flex-row flex-wrap justify-center">
                {listTheme.map((item: any, index) => (
                  <Link key={index} href={"/"}>
                    <div className="relative flex flex-col h-[260px] mb-4 ml-2  rounded-xl overflow-hidden group">
                      <div className="absolute bottom-3 left-2 z-10 text-white font-bold">
                        {item.title}
                      </div>
                      <img
                        src={item.img}
                        alt="img"
                        className="h-full w-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-row space-x-4 items-center justify-center">
                <div className="flex-grow space-y-4">
                  <p className="font-bold text-lg text-green-500">
                    COLLECTIONS
                  </p>
                  <p className="font-bold text-5xl">Products by country</p>
                  <p className="text-lg text-neutral-600">
                    Choose products according to your favorite country
                  </p>
                </div>
                <div className="">
                  <button className="text-gray-200 bg-neutral-950 px-4 py-2 rounded font-bold">
                    Explore collections
                  </button>
                </div>
              </div>

              <div className="flex flex-row flex-wrap justify-center space-x-8">
                {listCountry.map((item: any, index) => (
                  <Link key={index} href={"/"}>
                    <div className="relative">
                      <div className="absolute hover:opacity-15 opacity-0 top-0 left-0 h-full w-full bg-white"></div>
                      <div className="flex flex-col h-72 w-72 mb-2 rounded overflow-hidden">
                        <div className="h-1/2 overflow-hidden mb-[2px]">
                          <img
                            src={item.img1}
                            alt="img"
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="flex flex-row">
                          <div className="w-1/2 overflow-hidden mr-[2px]">
                            <img
                              src={item.img2}
                              alt="img"
                              className="w-full h-auto"
                            />
                          </div>
                          <div className="w-1/2 overflow-hidden">
                            <img
                              src={item.img3}
                              alt="img"
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="font-bold text-lg">{item.title}</p>
                      <p className="text-neutral-500 text-sm">
                        {item.count} resources
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-14">
              <div>
                <h4 className="text-[rgb(51,106,234)] text-[15px] text-center">
                  BENFITS
                </h4>
                <h2 className="text-[56px] text-center">
                  Let’s make your ideas break through
                </h2>
                <p className="text-[15px] font-semibold text-center">
                  Just a few simple steps and you can bring your products to the dropshipping market !
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <div className="space-y-4 w-1/4">
                  <video
                    src="https://fps.cdnpk.net/home/benefits/benefit-quality.mp4"
                    width="70"
                    height="70"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disableRemotePlayback
                    className="rounded _1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196"
                  ></video>
                  <h3 className="text-2xl font-bold">
                    Create an Account
                  </h3>
                  <p>
                    Register for an account on the DropCreative website to upload your products.
                  </p>
                </div>
                <div className="space-y-4 w-1/4">
                  <video
                    src="https://fps.cdnpk.net/home/benefits/benefit-content.mp4"
                    width="70"
                    height="70"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disableRemotePlayback
                    className="rounded _1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196"
                  ></video>
                  <h3 className="text-2xl font-bold">
                    Upload Products
                  </h3>
                  <p>
                    Upload your products or add available sample products from DropCreative, adjust the selling price and landing page.
                  </p>
                </div>
                <div className="space-y-4 w-1/4">

                  <video
                    src="https://fps.cdnpk.net/home/benefits/benefit-ready.mp4"
                    width="70"
                    height="70"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disableRemotePlayback
                    className="rounded _1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196"
                  ></video>
                  <h3 className="text-2xl font-bold">
                    Set the Selling Price:
                  </h3>
                  <p>
                    Decide on the selling price for your products based on costs and desired profit. Also, add payment methods!
                  </p>
                </div>
                <div className="space-y-4 w-1/4">
                  <video
                    src="https://fps.cdnpk.net/home/benefits/benefit-think.mp4"
                    width="70"
                    height="70"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disableRemotePlayback
                    className="rounded _1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196"
                  ></video>
                  <h3 className="text-2xl font-bold">Promote the Products</h3>
                  <p>
                    Use social media channels, email marketing, or other advertising campaigns to introduce your products to potential customers. Receive performance feedback data.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row bg-purple-600 items-center justify-center">
              <div className="flex flex-col space-y-4 pl-40 text-white flex-grow h-full">
                <p className="font-bold text-2xl">Freepik Designer</p>
                <p className="font-bold text-lg">
                  Pick a template, customize it online, and make it yours
                </p>
                <div className="space-x-4">
                  <button className="bg-white text-black font-bold text-xs px-4 py-2 rounded">
                    Start editing
                  </button>
                  <button className="text-white border border-white font-bold text-xs px-4 py-2 rounded">
                    Start editing
                  </button>
                </div>
              </div>
              <div>
                <Image
                  src={"/home/bannerdesigner.png"}
                  alt={"image"}
                  width={600}
                  height={0}
                ></Image>
              </div>
            </div>
          </div>
          <SlideProduct />
        </div>

        <Footer />
      </div>
    </div>
  );
}
