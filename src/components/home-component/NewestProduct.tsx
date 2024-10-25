import { ArrowDownToLine, Eye, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {
    listProductNew: any[],
    handleAddProduct: (item: any) => void,
    handleDownLoad: (item: any) => void,
}
export default function NewestProduct(props: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    return (
        <div className="flex flex-col space-y-10 w-full">
            <span className="font-bold text-3xl">
                Newest Product
            </span>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={50}
                slidesPerView={5}
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
                className='thumbs mt-3 w-full rounded-lg'
            >
                {/* Thêm nhiều slides để tạo hiệu ứng liên tục mượt mà hơn */}
                {props.listProductNew.map((item: any, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex flex-col w-64 h-64 space-y-2'>
                            <div className='relative w-auto h-[300px] overflow-hidden flex justify-center items-center bg-gray-200 rounded group'>
                                <Image
                                    src={item.url ? process.env.NEXT_PUBLIC_API_URL + item.url : "/image/nophotos.png"}
                                    alt="img"
                                    className='h-[300px] w-auto object-contain '
                                    width={600}
                                    height={600}
                                    priority
                                />
                                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-20" />
                                <div className="absolute flex flex-row justify-center items-center bottom-0 bg-gray-950 w-full h-12 text-neutral-200 space-x-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                                    <Link
                                        target="_blank"
                                        href={`/landing-page/product/${item.id}`}
                                        className="hover:bg-neutral-600 h-full w-full flex flex-row items-center px-2 space-x-2 text-xs font-bold"
                                    >
                                        <Eye size={20} /> <span>View product</span>
                                    </Link>
                                    <button
                                        onClick={() => props.handleAddProduct(item.id)}
                                        className="hover:bg-neutral-600 h-full w-1/5 flex justify-center items-center"
                                    >
                                        <Plus />
                                    </button>
                                    <button
                                        onClick={() => props.handleDownLoad(item.id)}
                                        className="hover:bg-neutral-600 h-full w-1/5 flex justify-center items-center">
                                        <ArrowDownToLine />
                                    </button>
                                </div>
                            </div>
                            <p className="w-full truncate font-bold text">{item.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
