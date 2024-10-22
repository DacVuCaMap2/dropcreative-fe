"use client";
import React, { useRef } from "react";
import Banner from "../common-component/Banner";
import {
  ArrowLeft,
  ArrowRight,
  Plane,
  ShieldCheck,
  SquarePercent,
} from "lucide-react";
import ProductCard from "../common-component/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button, Input, Rate } from "antd";
import Review from "../common-component/Review";
import Image from "next/image";

const banners = [
  {
    id: 1,
    title: "Elevate Your Sound Experience",
    subtitle: "NEW ARRIVALS",
    buttonLabel: "SHOP NOW",
    imageUrl: "/image/banner/banner3.jpg",
  },
  {
    id: 2,
    title: "Discover New Audio Gear",
    subtitle: "BEST SELLERS",
    buttonLabel: "EXPLORE",
    imageUrl: "/image/banner/banner2.jpg",
  },
  {
    id: 3,
    title: "Discover New Audio Gear",
    subtitle: "BEST SELLERS",
    buttonLabel: "EXPLORE",
    imageUrl: "/image/banner/banner1.jpg",
  },
];
const products = [
  {
    imageSrc: "/image/product/pr1.png",
    altText: "Crystal Stone Face Roller",
    title: "Crystal Stone Gua Sha Board Face Roller Skin Care Beauty...",
    currentPrice: 3.67,
    originalPrice: 5.25,
    rating: 4,
    reviewCount: 28,
    isOnSale: true,
  },
  {
    imageSrc: "/image/product/pr2.png",
    altText: "Crystal Stone Face Roller",
    title: "Crystal Stone Gua Sha Board Face Roller Skin Care Beauty...",
    currentPrice: 3.67,
    originalPrice: 5.25,
    rating: 4,
    reviewCount: 28,
    isOnSale: true,
  },
  {
    imageSrc: "/image/product/pr3.png",
    altText: "Crystal Stone Face Roller",
    title: "Crystal Stone Gua Sha Board Face Roller Skin Care Beauty...",
    currentPrice: 3.67,
    originalPrice: 5.25,
    rating: 4,
    reviewCount: 28,
    isOnSale: true,
  },
  {
    imageSrc: "/image/product/pr4.png",
    altText: "Crystal Stone Face Roller",
    title: "Crystal Stone Gua Sha Board Face Roller Skin Care Beauty...",
    currentPrice: 3.67,
    originalPrice: 5.25,
    rating: 4,
    reviewCount: 28,
    isOnSale: true,
  },
  {
    imageSrc: "/image/product/pr4.png",
    altText: "Crystal Stone Face Roller",
    title: "Crystal Stone Gua Sha Board Face Roller Skin Care Beauty...",
    currentPrice: 3.67,
    originalPrice: 5.25,
    rating: 4,
    reviewCount: 28,
    isOnSale: true,
  },
  {
    imageSrc: "/image/product/pr4.png",
    altText: "Crystal Stone Face Roller",
    title: "Crystal Stone Gua Sha Board Face Roller Skin Care Beauty...",
    currentPrice: 3.67,
    originalPrice: 5.25,
    rating: 4,
    reviewCount: 28,
    isOnSale: true,
  },
  {
    imageSrc: "/image/product/pr4.png",
    altText: "Crystal Stone Face Roller",
    title: "Crystal Stone Gua Sha Board Face Roller Skin Care Beauty...",
    currentPrice: 3.67,
    originalPrice: 5.25,
    rating: 4,
    reviewCount: 28,
    isOnSale: true,
  },
  {
    imageSrc: "/image/product/pr4.png",
    altText: "Crystal Stone Face Roller",
    title: "Crystal Stone Gua Sha Board Face Roller Skin Care Beauty...",
    currentPrice: 3.67,
    originalPrice: 5.25,
    rating: 4,
    reviewCount: 28,
    isOnSale: true,
  },
  {
    imageSrc: "/image/product/pr4.png",
    altText: "Crystal Stone Face Roller",
    title: "Crystal Stone Gua Sha Board Face Roller Skin Care Beauty...",
    currentPrice: 3.67,
    originalPrice: 5.25,
    rating: 4,
    reviewCount: 28,
    isOnSale: true,
  },
  {
    imageSrc: "/image/product/pr4.png",
    altText: "Crystal Stone Face Roller",
    title: "Crystal Stone Gua Sha Board Face Roller Skin Care Beauty...",
    currentPrice: 3.67,
    originalPrice: 5.25,
    rating: 4,
    reviewCount: 28,
    isOnSale: true,
  },
];
const reviews = [
  {
    id: 1,
    name: "Brendon Alfred",
    date: "MAR 16, 2023",
    rating: 4,
    content:
      "Good purchase, very soft material. Only sewing shows that its cheaper version. However, I already washed it and used couple of times, everything works as it should. Greatly absorbs the water from the hair. I am happy about the purchase recommend to try it.",
  },
  {
    id: 2,
    name: "Brendon Alfred",
    date: "MAR 16, 2023",
    rating: 4,
    content:
      "Good purchase, very soft material. Only sewing shows that its cheaper version. However, I already washed it and used couple of times, everything works as it should. Greatly absorbs the water from the hair. I am happy about the purchase recommend to try it.",
  },
  {
    id: 3,
    name: "Brendon Alfred",
    date: "MAR 16, 2023",
    rating: 4,
    content:
      "Good purchase, very soft material. Only sewing shows that its cheaper version. However, I already washed it and used couple of times, everything works as it should. Greatly absorbs the water from the hair. I am happy about the purchase recommend to try it.",
  },
  {
    id: 3,
    name: "Brendon Alfred",
    date: "MAR 16, 2023",
    rating: 4,
    content:
      "Good purchase, very soft material. Only sewing shows that its cheaper version. However, I already washed it and used couple of times, everything works as it should. Greatly absorbs the water from the hair. I am happy about the purchase recommend to try it.",
  },
  {
    id: 4,
    name: "Brendon Alfred",
    date: "MAR 16, 2023",
    rating: 4,
    content:
      "Good purchase, very soft material. Only sewing shows that its cheaper version. However, I already washed it and used couple of times, everything works as it should. Greatly absorbs the water from the hair. I am happy about the purchase recommend to try it.",
  },
  {
    id: 5,
    name: "Brendon Alfred",
    date: "MAR 16, 2023",
    rating: 4,
    content:
      "Good purchase, very soft material. Only sewing shows that its cheaper version. However, I already washed it and used couple of times, everything works as it should. Greatly absorbs the water from the hair. I am happy about the purchase recommend to try it.",
  },
];
const LandingPage = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const prevRefReview = useRef(null);
  const nextRefReview = useRef(null);
  return (
    <div className="bg-backgroundLandingPage flex flex-col gap-5 ">
      <Banner banners={banners} />
      <div className="px-96 flex flex-col gap-10">
        <div className="flex justify-center gap-3 font-sans">
          <div className="h-32 rounded bg-white p-4 flex gap-5 items-center">
            <SquarePercent className="text-blue-500" width={40} height={40} />
            <div>
              <p className="text-base font-semibold">
                Buy more to get discount
              </p>
              <p className="text-sm text-gray-500">
                Free shipping on any order of $150 or more.
              </p>
            </div>
          </div>
          <div className="h-32 rounded bg-white p-4 flex gap-5 items-center">
            <Plane className="text-blue-500" width={40} height={40} />
            <div>
              <p className="text-base font-semibold">International delivery</p>
              <p className="text-sm text-gray-500">
                You can rest assured to buy from anywhere in the world.
              </p>
            </div>
          </div>
          <div className="h-32 rounded bg-white p-4 flex gap-5 items-center">
            <ShieldCheck className="text-blue-500" width={40} height={40} />
            <div>
              <p className="text-base font-semibold">
                Buy more to get discount
              </p>
              <p className="text-sm text-gray-500">
                Free shipping on any order of $150 or more.
              </p>
            </div>
          </div>
        </div>
        <div className="relative font-sans">
          <p className="font-semibold text-xl">Best Selling</p>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            modules={[Navigation]}
            onInit={(swiper) => {
              if (typeof swiper.params.navigation === "object") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={prevRef}
            className="absolute top-1/2 left-0 -translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-black hover:bg-gray-200 transition"
          >
            <ArrowLeft width={15} height={15} />
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 right-0 translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-black hover:bg-gray-200 transition"
          >
            <ArrowRight width={15} height={15} />
          </button>
        </div>
        <div className="relative font-sans">
          <p className="font-semibold text-xl">Customers Love Us</p>
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            modules={[Navigation]}
            onInit={(swiper) => {
              if (typeof swiper.params.navigation === "object") {
                swiper.params.navigation.prevEl = prevRefReview.current;
                swiper.params.navigation.nextEl = nextRefReview.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="mt-4"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <Review {...review} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={prevRefReview}
            className="absolute top-1/2 left-0 -translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-black hover:bg-gray-200 transition"
          >
            <ArrowLeft width={15} height={15} />
          </button>

          <button
            ref={nextRefReview}
            className="absolute top-1/2 right-0 translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-black hover:bg-gray-200 transition"
          >
            <ArrowRight width={15} height={15} />
          </button>
        </div>
        <div className="flex justify-center h-96 bg-white items-center font-sans mb-4">
          <div className="flex-1 flex justify-center items-center">
            <div className="px-20">
              <h2 className="text-2xl font-semibold mb-2">
                Subscribe to our newsletter
              </h2>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter for sneak peeks at new collections
                and early access to flash sales!
              </p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="w-full max-w-xs rounded"
                  style={{ height: "40px" }}
                />
                <Button type="primary" style={{ height: "40px" }}>
                  Submit
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-cover bg-center">
            <Image
              src="/image/sub/sb1.png"
              alt="aaa"
              width={605}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
