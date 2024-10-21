import Banner from "@/components/common-component/Banner";
import React from "react";

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
export default function page() {
  return (
    <div>
      <Banner banners={banners} />
    </div>
  );
}
