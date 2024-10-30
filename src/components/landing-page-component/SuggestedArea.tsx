'use client'
import GetApi from '@/api/GetApi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./SuggestedArea.css"
type Props = {
    accountId: any
}
export default function SuggestedArea(props: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [sugProduct, setSugProduct] = useState<any[]>([]);
    const accountId = props.accountId;
    useEffect(() => {
        const fetchData = async () => {
            const url = process.env.NEXT_PUBLIC_API_URL + `/api/product?accountId=${accountId}&size=8&page=1`;
            const response = await GetApi(url);
            if (response.data && Array.isArray(response.data)) {
                setSugProduct(response.data);
            }
        }
        if (accountId) {
            fetchData();
        }

    }, [accountId])
    return (
        <div>

            <div className='relative lg:block hidden'>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={false}
                    spaceBetween={12}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    className='thumbs mt-3 w-full rounded-lg'
                >
                    {sugProduct.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                            <div className='bg-white space-y-2 pb-4 h-[350px]'>
                                <div className='h-[250px] overflow-hidden'>
                                    <Image width={500} height={500} src={item.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}` : '/image/nophotos.png'} alt="image 1" />
                                </div>
                                <div className='px-2'>
                                    <div className='max-h-12 overflow-hidden mb-2'>
                                        <span className=''>{item.title}</span>
                                    </div>
                                    <div className='space-x-2'>
                                        <span className='font-bold'>${item.price}</span>
                                        <span className='line-through text-neutral-400 text-xs'>${item.comparePrice}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="swiper-button-prev absolute left-0 top-1/2">
                </button>
                <button className="swiper-button-next absolute right-0 top-1/2">
                </button>
            </div>
            <div className='relative lg:hidden block'>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={false}
                    spaceBetween={12}
                    slidesPerView={2}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    className='thumbs mt-3 w-full rounded-lg'
                >
                    {sugProduct.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                            <div className='bg-white space-y-2 pb-4 h-[350px]'>
                                <div className='h-[250px] overflow-hidden'>
                                    <Image width={500} height={500} src={item.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}` : '/image/nophotos.png'} alt="image 1" />
                                </div>
                                <div className='px-2'>
                                    <div className='max-h-12 overflow-hidden mb-2'>
                                        <span className=''>{item.title}</span>
                                    </div>
                                    <div className='space-x-2'>
                                        <span className='font-bold'>${item.price}</span>
                                        <span className='line-through text-neutral-400 text-xs'>${item.comparePrice}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="swiper-button-prev absolute left-0 top-1/2">
                </button>
                <button className="swiper-button-next absolute right-0 top-1/2">
                </button>
            </div>
        </div>
    );
}
