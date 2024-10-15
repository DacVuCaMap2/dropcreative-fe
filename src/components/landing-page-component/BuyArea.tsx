"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// These styles should be imported in your _app.tsx or layout.tsx
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Props = {
  productData: any
}

export default function BuyArea(props: Props) {
  return (
    <div className='max-w-[1000px] bg-red-400 flex flex-row'>
      <div className='w-1/2 relative'>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
      <div className='w-1/2'>
        {/* Content for the right side */}
      </div>
    </div>
  )
}