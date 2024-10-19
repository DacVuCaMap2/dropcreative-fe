"use client"
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules'
import Image from 'next/image';

export default function SlideProduct() {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const listImg = ["/homecountry/au1.png", "/homecountry/au2.png", "/homecountry/au3.png", "/homecountry/USA1.png", "/homecountry/USA2.png"
        , "/homecountry/USA3.png", "/homecountry/euro1.png", "/homecountry/euro2.png", "/homecountry/euro3.png", "/homecountry/asia1.png"]
    return (
        <div className="flex flex-col space-y-14 py-10">
            <div className='flex flex-col justify-center items-center space-y-4'>
                <h4 className="text-purple-500 text-[15px] text-center font-bold">
                    PRODUCTS
                </h4>
                <h2 className="text-3xl font-bold text-center">
                    CHOOSE TO ADD YOUR PRODUCT
                </h2>
                <p className="text-[15px] text-neutral-500 text-center">
                    Behind every stock image there is a creative mind. ¡Vamos!  Join DropCreative.io <br /> creator community and start selling your content
                </p>
                <button className='bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-700'>ADD PRODUCT</button>
            </div>
            <div className="flex flex-row space-x-2">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={12}
                    slidesPerView={8}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    speed={2000} // Tốc độ chuyển slide
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: false,
                        stopOnLastSlide: false,
                        reverseDirection: false,
                    }}
                    className='thumbs mt-3 w-full max-w-[1400px] rounded-lg'
                >
                    {/* Thêm nhiều slides để tạo hiệu ứng liên tục mượt mà hơn */}
                    {listImg.map((url:string,index) => (
                        <SwiperSlide key={index}>
                            <Image src={url} alt='img' width={500} height={500}></Image>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}