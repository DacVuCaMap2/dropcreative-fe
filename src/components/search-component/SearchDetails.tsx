"use client"
import GetApi from '@/api/GetApi';
import { ArrowDownToLine, Copy, Download, Flag, Layers3, Plus, Share2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners';
import SuggestedArea from '../landing-page-component/SuggestedArea';
import SuggestedAreaSearch from './SuggestedAreaSearch';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Navigation, Thumbs } from 'swiper/modules';
type Props = {
    setOpen: React.Dispatch<React.SetStateAction<number>>,
    id: any
}
export default function SearchDetails(props: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);
    const [productData, setProductData] = useState<any>(null);
    const [mainPhotoUrl, setMainPhotoUrl] = useState({ index: -1, url: "" });
    const handleClose = () => {
        props.setOpen(-1);
    }
    const handleSelectPhoto = (url: any, index: number) => {
        setMainPhotoUrl({ index: index, url: url });
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/" + props.id;
            const response = await GetApi(url);
            console.log(response);
            if (response.product) {
                setProductData(response);
                if (response.images && Array.isArray(response.images)) {
                    const temp = response.images.find((photo: any) => photo.isMain);
                    response.images.forEach((photo: any, index: number) => {
                        if (photo.isMain) {
                            setMainPhotoUrl({ index: index, url: photo.url });
                        }
                    })
                }
            }
            setLoading(false);
        }
        fetchData();
    }, [])

    return (
        <div onClick={handleClose} className='bg-slate-900 bg-opacity-90 w-screen h-screen fixed top-0 left-0 z-30 flex flex-col items-center'>
            <div className='h-2 w-20 bg-black opacity-0'>
                ss
            </div>
            {!isLoading ?
                <div onClick={(e) => e.stopPropagation()} className='bg-white flex-grow w-[1000px] overflow-auto rounded-lg flex flex-col text-neutral-700 py-8'>
                    <div className='flex flex-row space-x-2'>
                        <div className='flex flex-col w-28 items-center px-2'>
                            <div className='border-3 rounded p-1 border-blue-500 mb-1'>

                                <Image src={mainPhotoUrl.url ? process.env.NEXT_PUBLIC_API_URL + mainPhotoUrl.url : "/image/nophotos.png"} alt="s" width={50} height={50} className='rounded'></Image>
                            </div>
                            <span className='text-xs text-blue-500 font-bold'>Original</span>
                            {/* Thumbnail */}
                            {(productData.images && Array.isArray(productData.images)) &&
                                <div className='w-full border px-2 border-neutral-400 rounded py-2'>
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={false}
                                        spaceBetween={12}
                                        slidesPerView={4}
                                        freeMode={true}
                                        direction="vertical"
                                        watchSlidesProgress={true}
                                        mousewheel={true}
                                        modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
                                        className='thumbs mt-3 w-full h-[350px] rounded-lg'

                                    >
                                        {productData.images.map((image: any, index: number) => (
                                            <SwiperSlide key={index}>
                                                <button onClick={() => handleSelectPhoto(image.url, index)} className={`flex h-full w-full items-center justify-center border-blue-500 p-1 rounded-lg overflow-hidden ${mainPhotoUrl.index === index ? "border-4" : ""} `}>
                                                    <Image
                                                        src={process.env.NEXT_PUBLIC_API_URL + image.url}
                                                        alt={"image"}
                                                        className='block h-full w-full object-cover'
                                                        width={400}
                                                        height={400}
                                                    />
                                                </button>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            }
                        </div>


                        <div className='w-[600px] h-[500px] overflow-hidden flex justify-center items-center'>
                            <Image
                                src={mainPhotoUrl.url ? process.env.NEXT_PUBLIC_API_URL + mainPhotoUrl.url : "/image/nophotos.png"}
                                alt="img"
                                className='h-[500px] w-auto object-contain'
                                width={600}
                                height={500}
                                priority
                            />
                        </div>



                        <div className='flex flex-col px-4 space-y-2'>
                            <div className='flex flex-row space-x-4'>
                                <button className='flex flex-row justify-center items-center px-16 py-2 rounded text-white bg-blue-600 space-x-2'>
                                    <Download size={20} /> <span>Download</span>
                                </button>
                                <button className='hover:bg-neutral-100 px-4 py-2 border border-neutral-300 rounded '> <Copy size={16} /> </button>
                            </div>
                            <button className='hover:bg-neutral-100 flex flex-row justify-center items-center w-full py-2 rounded border border-neutral-300 space-x-4 '><Plus size={20} /> Add Product</button>
                            <div className='bg-red-400 w-full h-64 text-xs'>

                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row items-center justify-between py-2 px-6 w-[700px] text-xs '>
                        <div className='flex flex-row space-x-2'>
                            <Image src={"/image/default/user-default.png"} alt='avatar' width={50} height={50}></Image>
                            <div className='flex flex-col '>
                                <p className='font-bold'>{productData.account.userName}</p>
                                <span className='hover:underline cursor-pointer'>Follow</span>
                            </div>
                        </div>
                        <div className='flex flex-row space-x-2'>
                            <button className='hover:bg-neutral-100 flex flex-row justify-center items-center  py-2 rounded border border-neutral-300 space-x-4 px-4'><Layers3 size={20} /> <span>Add Product</span></button>
                            <button className='hover:bg-neutral-100 flex flex-row justify-center items-center  py-2 rounded border border-neutral-300 space-x-4 px-2'><Share2 size={20} /></button>
                            <button className='hover:bg-neutral-100 flex flex-row justify-center items-center  py-2 rounded border border-neutral-300 space-x-4 px-2'><Flag size={20} /></button>
                        </div>
                    </div>
                    <div className='px-6 mb-10'>
                        <p className='font-bold text-sm'>{productData.product.title}</p>
                    </div>
                    <span className='px-6 font-bold'>You might also like</span>
                    <div className='px-6'>
                        <SuggestedAreaSearch accountId={productData.account.id} />
                    </div>
                </div>
                :
                <div className='bg-white flex-grow w-[1000px] justify-center items-center overflow-auto rounded-lg flex flex-col'>
                    <ScaleLoader height={100} width={10} color='gray' />
                </div>
            }

            <div className='h-2 w-20 bg-black opacity-0'>

            </div>
        </div>
    )
}
