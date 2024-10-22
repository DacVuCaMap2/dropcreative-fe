"use client";
import React, { useEffect, useRef, useState } from "react";
import Banner from "../common-component/Banner";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Bluetooth,
  Clock,
  Lightbulb,
  Plane,
  ShieldCheck,
  SquarePercent,
} from "lucide-react";
import ProductCard from "../common-component/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button, Input, InputNumber, Rate } from "antd";
import Review from "../common-component/Review";
import Image from "next/image";
import CountDownComponent from "./CountDownComponent";

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
const images = [
  "/image/productSale/prs1.png",
  "/image/productSale/prs2.png",
  "/image/productSale/prs3.png",
  "/image/productSale/prs4.png",
];
const LandingPage = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const prevRefReview = useRef(null);
  const nextRefReview = useRef(null);
  const prevRefView = useRef(null);
  const nextRefView = useRef(null);
  const prevRefSale = useRef(null);
  const nextRefSale = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState(3);
  const countdownTime = 10 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(countdownTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000; // Giảm mỗi giây
      });
    }, 1000);

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);
  const handleViewAllClick = () => {
    console.log("View All clicked");
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };
  const handleDecrement = () => {
    if (value > 1) setValue(value - 1);
  };
  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60000);
    const seconds: number = parseFloat(((time % 60000) / 1000).toFixed(0));
    return `${minutes}m : ${seconds < 10 ? "0" : ""}${seconds}s`;
  };
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
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <div
              className={`relative h-[41.6rem] w-1/2 group font-sans overflow-hidden`}
            >
              <div className="h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-110">
                <Image
                  src="/image/view/view2.png"
                  alt="Electronics"
                  width={600}
                  height={500}
                  className="object-cover h-full w-full cursor-pointer"
                />
              </div>

              <div
                className={`absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black via-transparent to-transparent text-white`}
              >
                <h2 className="text-2xl font-bold">Electronics</h2>
                <p className="text-base">
                  Embrace the Power of Innovation, where technology meets
                  convenience and style
                </p>
                <Button
                  type="primary"
                  className="mt-2 p-5 bg-blue-600 rounded-none font-semibold"
                  onClick={handleViewAllClick}
                >
                  VIEW ALL
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <ProductCard
                  imageSrc="/image/product/pr1.png"
                  altText="Crystal Stone Face Roller"
                  title="Crystal Stone Gua Sha Board Face Roller Skin Care Beauty..."
                  currentPrice={3.67}
                  originalPrice={5.25}
                  rating={4}
                  reviewCount={28}
                  isOnSale={true}
                />
                <ProductCard
                  imageSrc="/image/product/pr1.png"
                  altText="Crystal Stone Face Roller"
                  title="Crystal Stone Gua Sha Board Face Roller Skin Care Beauty..."
                  currentPrice={3.67}
                  originalPrice={5.25}
                  rating={4}
                  reviewCount={28}
                  isOnSale={true}
                />
              </div>
              <div className="flex gap-1">
                <ProductCard
                  imageSrc="/image/product/pr1.png"
                  altText="Crystal Stone Face Roller"
                  title="Crystal Stone Gua Sha Board Face Roller Skin Care Beauty..."
                  currentPrice={3.67}
                  originalPrice={5.25}
                  rating={4}
                  reviewCount={28}
                  isOnSale={true}
                />
                <ProductCard
                  imageSrc="/image/product/pr1.png"
                  altText="Crystal Stone Face Roller"
                  title="Crystal Stone Gua Sha Board Face Roller Skin Care Beauty..."
                  currentPrice={3.67}
                  originalPrice={5.25}
                  rating={4}
                  reviewCount={28}
                  isOnSale={true}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <ProductCard
              imageSrc="/image/product/pr1.png"
              altText="Crystal Stone Face Roller"
              title="Crystal Stone Gua Sha Board Face Roller Skin Care Beauty..."
              currentPrice={3.67}
              originalPrice={5.25}
              rating={4}
              reviewCount={28}
              isOnSale={true}
            />
            <ProductCard
              imageSrc="/image/product/pr1.png"
              altText="Crystal Stone Face Roller"
              title="Crystal Stone Gua Sha Board Face Roller Skin Care Beauty..."
              currentPrice={3.67}
              originalPrice={5.25}
              rating={4}
              reviewCount={28}
              isOnSale={true}
            />
            <ProductCard
              imageSrc="/image/product/pr1.png"
              altText="Crystal Stone Face Roller"
              title="Crystal Stone Gua Sha Board Face Roller Skin Care Beauty..."
              currentPrice={3.67}
              originalPrice={5.25}
              rating={4}
              reviewCount={28}
              isOnSale={true}
            />
            <ProductCard
              imageSrc="/image/product/pr1.png"
              altText="Crystal Stone Face Roller"
              title="Crystal Stone Gua Sha Board Face Roller Skin Care Beauty..."
              currentPrice={3.67}
              originalPrice={5.25}
              rating={4}
              reviewCount={28}
              isOnSale={true}
            />
          </div>
        </div>
        <div>
          <div className="relative h-full w-full font-sans overflow-hidden flex justify-center">
            <div className="h-full w-full transition-transform duration-300 ease-in-out group">
              <Image
                src="/image/view/view1.png"
                alt="Electronics"
                width={600}
                height={500}
                className="object-cover h-full w-full cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>

            <div className="absolute bottom-0 top-1/3 left-0 p-6 w-1/2 text-white px-10">
              <h2 className="text-4xl font-bold">Electronics</h2>
              <p className="text-xl mt-3">
                Embrace the Power of Innovation, where technology meets
                convenience and style
              </p>
              <Button
                type="primary"
                className="mt-2 p-5 bg-blue-600 rounded-none font-semibold"
                onClick={handleViewAllClick}
              >
                VIEW ALL
              </Button>
            </div>

            <div className="w-1/2 absolute top-20 right-5">
              <Swiper
                slidesPerView={2}
                spaceBetween={0}
                modules={[Navigation]}
                onInit={(swiper) => {
                  if (typeof swiper.params.navigation === "object") {
                    swiper.params.navigation.prevEl = prevRefView.current;
                    swiper.params.navigation.nextEl = nextRefView.current;
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
                ref={prevRefView}
                className="absolute top-1/2 left-0 -translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-black hover:bg-gray-200 transition"
              >
                <ArrowLeft width={15} height={15} />
              </button>

              <button
                ref={nextRefView}
                className="absolute top-1/2 right-0 translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-black hover:bg-gray-200 transition"
              >
                <ArrowRight width={15} height={15} />
              </button>
            </div>
          </div>
        </div>
        <div className="h-full bg-white border-3 border-blue-700">
          <div className="p-2 flex justify-between bg-blue-700 text-lg font-bold text-white">
            <p>Deal Of The Week</p>
            <span>{formatTime(timeLeft)}</span>
          </div>
          <div className="p-10 flex gap-0">
            <div
              className="w-1/2 pt-7 relative flex items-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                modules={[Navigation]}
                onInit={(swiper) => {
                  if (typeof swiper.params.navigation === "object") {
                    swiper.params.navigation.prevEl = prevRefSale.current;
                    swiper.params.navigation.nextEl = nextRefSale.current;
                  }
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image}
                      alt="image"
                      width={450}
                      height={528}
                      className="m-0 m-auto"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                ref={prevRefSale}
                className={`absolute top-1/2 left-20 -translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-black transition ${
                  isHovered ? "opacity-100" : "opacity-0"
                } hover:bg-gray-200`}
              >
                <ArrowLeft width={15} height={15} />
              </button>

              <button
                ref={nextRefSale}
                className={`absolute top-1/2 right-14 -translate-x-1 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-black transition ${
                  isHovered ? "opacity-100" : "opacity-0"
                } hover:bg-gray-200`}
              >
                <ArrowRight width={15} height={15} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center mt-2">
                <Rate disabled defaultValue={4} className="text-sm" />
                <span className="text-sm text-gray-600 ml-2">
                  (30) 6 reviews
                </span>
              </div>
              <h3 className="text-xl font-bold">
                Wireless Charger Bluetooth Speaker LED Lamp Wooden Phone Holder
              </h3>
              <div className="flex gap-2 items-center">
                <span className="text-3xl font-bol text-pricing">$33.99</span>
                <span className="text-lg line-through text-gray-500">
                  $37.99
                </span>
                <div className="text-sm text-white font-bold bg-backgroundSale px-1 rounded-full">
                  11% OFF
                </div>
              </div>
              <hr />
              <div className="flex flex-col gap-2 font-sans">
                <div className="flex gap-4 items-center">
                  <Bluetooth width={30} height={30} className="text-blue-950" />
                  <span className="text-base font-semibold">
                    Bluetooth speaker
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <Lightbulb width={30} height={30} className="text-blue-950" />
                  <span className="text-base font-semibold">
                    Bright LED lamp
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <BatteryCharging
                    width={30}
                    height={30}
                    className="text-blue-950"
                  />
                  <span className="text-base font-semibold">
                    Smart wireless charger
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 font-sans">
                <span className="text-sm">Color: Burly Wood</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-gray-300  border border-gray-400"></div>
                  <div className="w-8 h-8 bg-burlywood  border border-gray-400"></div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm">Quantity</span>
                <div className="flex items-center justify-between border w-32 p-2">
                  <button
                    onClick={handleDecrement}
                    className="text-xl px-2 hover:text-gray-600 focus:outline-none"
                  >
                    -
                  </button>
                  <span className="text-lg">{value}</span>
                  <button
                    onClick={handleIncrement}
                    className="text-xl px-2 hover:text-gray-600 focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-3 w-full mt-4">
                <button className="px-6 w-1/2 py-3 border border-black text-black font-medium hover:scale-105 transition-transform">
                  ADD TO CART
                </button>

                <button className="px-6 w-1/2 py-3 bg-blue-500 text-white font-medium hover:scale-105 transition-transform">
                  BUY NOW
                </button>
              </div>
              <div className="text-sm flex gap-2 items-center font-sans">
                <Clock width={15} height={15} />
                <span>
                  Arrive on <strong>Oct 28 - Nov 25</strong>
                  <span className="text-gray-400">(Delivery to Vietnam)</span>
                </span>
              </div>
              <hr />
              <div className="flex gap-4">
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
        <div className="flex justify-center h-96 bg-white items-center font-sans mb-10">
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
