"use client";
import { Carousel } from "antd";
import React, { useState } from "react";

interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  buttonLabel: string;
  imageUrl: string;
}

interface BannerProps {
  banners: BannerItem[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      <Carousel arrows afterChange={handleSlideChange} autoplay>
        {banners.map((banner, index) => (
          <div key={banner.id}>
            <div
              className="h-[500px] relative flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>

              <div className="relative text-center text-white p-8">
                <h3
                  className={`text-sm uppercase transition-opacity duration-1000 ${
                    currentSlide === index
                      ? "opacity-100 animate-fadeIn"
                      : "opacity-0"
                  } delay-150`}
                >
                  {banner.subtitle}
                </h3>

                <h1
                  className={`text-4xl font-bold mt-2 transition-opacity duration-1000 ${
                    currentSlide === index
                      ? "opacity-100 animate-fadeIn"
                      : "opacity-0"
                  } delay-200`}
                >
                  {banner.title}
                </h1>
                <button
                  className={`mt-4 bg-blue-500 text-white px-6 py-2 rounded transition-opacity duration-1000 ${
                    currentSlide === index
                      ? "opacity-100 animate-fadeIn"
                      : "opacity-0"
                  } delay-300`}
                >
                  {banner.buttonLabel}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
