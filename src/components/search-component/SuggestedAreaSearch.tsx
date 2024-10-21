'use client'
import GetApi from '@/api/GetApi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./SuggestedArea.css"
import Link from 'next/link';
type Props = {
    accountId: any
}
export default function SuggestedAreaSearch(props: Props) {
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
        <div className='relative h-full w-full'>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={false}
                spaceBetween={15}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                className='thumbs mt-3 w-full h-full rounded-lg'
            >
                {sugProduct.map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                        <Link href={`/landing-page/product/${item.id}`} className='bg-white space-y-2 pb-4 h-[150px]'>
                            <div className='h-[150px] overflow-hidden flex  justify-center items-center rounded-lg'>
                                <img src={item.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}` : '/image/nophotos.png'} alt="img"
                                    className='w-full object-cover'
                                />
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="swiper-button-prev absolute left-0 top-1/2">
            </button>
            <button className="swiper-button-next absolute right-0 top-1/2">
            </button>
        </div>
    );
}
