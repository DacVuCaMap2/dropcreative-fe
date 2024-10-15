"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
type Props = {
  productData: any
}
export default function BuyArea(props: Props) {
  return (
    <div className='max-w-[1000px] bg-red-400 flex flex-row'>
      <div>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          ...
        </Swiper>
        ss
      </div>
      <div>

      </div>
    </div>
  )
}
