"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules'

// These styles should be imported in your _app.tsx or layout.tsx
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import { Flame, Minus, Plus, Star } from 'lucide-react'
import { Rate } from 'antd'
import { stringToVariant } from '@/data/function'
import CountDownComponent from './CountDownComponent'

type Props = {
  productData: any
}

export default function BuyArea(props: Props) {
  const productData: any = props.productData;
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const productVariantTitle: string[] = productData.product.variant.split("./");
  const [selectedVariant, setSelectedVariant] = useState([0, 0, 0]);
  const [changeStatus, setChangeStatus] = useState(0);
  const [currentImg, setCurrentImg] = useState(0);
  let urlMainPhoto = "";
  let photos: any[] = [];
  let loop = false;
  if (props.productData.images) {
    photos = props.productData.images.map((item: any) => {
      if (item.isMain) {
        urlMainPhoto = item.url;
      }
      return { url: item.url, isMain: item.isMain }
    })
    loop = photos.length > 5;
  }

  /// get variant select
  const arrVariantsDetails: string[] = productData.productVariants.map((item: any) => {
    return item.value;
  })
  const variantsSelectList = stringToVariant(productData.product.variant, arrVariantsDetails);
  // console.log(variantsSelectList);
  const handleSelectedVariant = (index: number, childIndex: number) => {
    const tempSelected = [...selectedVariant];
    tempSelected[index] = childIndex;
    setSelectedVariant(tempSelected);
  }

  const goToSlide = (index: number) => {
    if (swiperRef) {
      swiperRef.slideTo(index);
    }
  };

  useEffect(() => {
    const arrSearch: string[] = [];
    for (let i = 0; i < variantsSelectList.length; i++) {
      if (variantsSelectList[i].length > 0) {
        arrSearch.push(variantsSelectList[i][selectedVariant[i]]);
      }
    }
    const keySearch = arrSearch.join(",");
    const current = productData.productVariants.map((item: any, index: number) => {
      if (keySearch === item.value) {
        setCurrentImg(index);
        goToSlide(index);
      }
      return item;
    });
  }, [selectedVariant])
  return (
    <div className='w-[1100px] flex flex-row space-x-2 py-4 justify-between'>
      <div className='flex flex-col space-y-8 '>
        <div className='w-full border-b border-neutral-300 pb-4'>
          <Swiper
            loop={loop}
            spaceBetween={10}
            onSwiper={setSwiperRef}
            navigation={false}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className='w-[550px] h-[550px] rounded-lg'
          >
            {photos.map((image: any, index: number) => (
              <SwiperSlide key={index}>
                <div className='flex h-full w-full items-center justify-center'>
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + image.url}
                    alt={"image"}
                    className='block h-full w-full object-cover'
                    width={900}
                    height={0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail */}
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={loop}
            spaceBetween={12}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className='thumbs mt-3 max-h-32 w-[550px] rounded-lg'
          >
            {photos.map((image: any, index: number) => (
              <SwiperSlide key={index}>
                <button onClick={() => setCurrentImg(index)} className={`flex h-full w-full items-center justify-center border-neutral-500 overflow-hidden ${currentImg === index ? "border-4" : ''}`}>
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + image.url}
                    alt={"image"}
                    className='block h-full w-full object-cover'
                    width={500}
                    height={0}
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='grid grid-cols-2 gap-2 px-6'>
          {photos.map((image: any, index) => {
            if (index < 6) {
              return (<div key={index} className='rounded-xl overflow-hidden hover:scale-105 cursor-pointer transition-transform transform shadow'>
                <button onClick={()=>{setCurrentImg(index);goToSlide(index)}}>
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + image.url}
                    alt={"image"}
                    className='block h-full w-full object-cover'
                    width={400}
                    height={0}
                  />
                </button>
              </div>)
            }
          })}
        </div>
      </div>
      <div className='w-full flex flex-col space-y-4'>
        <div className='max-h-10 overflow-hidden '>
          <Rate disabled defaultValue={5} />
          <span> (5.0) 102 reviews</span>
        </div>
        <div>
          <p className='font-bold text-xl'>{productData.product.title}</p>
          <div className='space-x-2  my-4 flex flex-row items-center'>
            <span className='text-2xl'>${productData.product.price}</span>
            <span className='line-through text-neutral-400 text-lg'>${productData.product.comparePrice}</span>
            <span className='bg-black text-white py-1 px-4 rounded text-xs'>{(100-(productData.product.price/productData.product.comparePrice)*100).toFixed(2)}%</span>
          </div>
          <div className='space-y-4'>
            {productVariantTitle.map((item: any, index) => (
              <div key={index}>
                <span className=''>{item}</span>
                <div className='flex flex-row flex-wrap'>
                  {variantsSelectList[index].map((childItem: string, childIndex) => (
                    <button onClick={() => handleSelectedVariant(index, childIndex)} key={childIndex} className={`border rounded-lg py-2 px-4 mr-4 ${selectedVariant[index] === childIndex ? 'bg-neutral-800 text-white shadow-lg ' : ''}`}>
                      {childItem}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=''>
          <CountDownComponent />
        </div>
        <div className='flex flex-row justify-between h-20 items-center'>
          <div className='flex flex-row w-36 border border-neutral-300 h-14 items-center'>
            <button className='w-1/4 flex justify-center items-center px-2 hover:bg-gray-200 h-full'><Minus /></button>
            <span className='w-full text-center'>1</span>

            <button className='w-1/4 flex justify-center items-center px-2 hover:bg-gray-200 h-full'><Plus /></button>
          </div>
          <button className='flex justify-center  items-center h-14 border border-black w-2/3 hover:scale-105 transition-transform transform'>
            Add to cart
          </button>
        </div>
        <div className=''>
          <button className='bg-yellow-300 w-full py-3 rounded flex flex-row justify-center items-center'>
            <span>Pay with </span><Image src={'/image/landingpage/paypal.png'} alt={'image'} width={80} height={80}></Image>
          </button>
        </div>
        <div className='flex flex-row space-x-2'>
          <Image src={'/image/landingpage/guardsafe.png'} alt='image' width={600} height={50}></Image>
        </div>
        <div className='flex flex-col space-y-2 '>
          <span className='font-bold text-xl mb-2 '>Buy More Save More!</span>
          <div className='flex flex-row items-center justify-between bg-neutral-100 px-4'>
            <div className='flex flex-col text-gray-600'>
              <div className='flex flex-col py-2'>
                <span>1 item get 10% OFF</span>
                on each product
                <div>
                  <span className='font-bold mr-2'>$29.99</span>
                  <span className='line-through text-sm text-neutral-400'>$39.99</span>
                </div>
              </div>
            </div>
            <button className='bg-white py-1 px-4 border border-black'>Add</button>
          </div>
          <div className='flex flex-row items-center justify-between bg-neutral-100 px-4'>
            <div className='flex flex-col text-gray-600'>
              <div className='flex flex-col py-2'>
                <span>1 item get 10% OFF</span>
                on each product
                <div>
                  <span className='font-bold mr-2'>$29.99</span>
                  <span className='line-through text-sm text-neutral-400'>$39.99</span>
                </div>
              </div>
            </div>
            <button className='bg-white py-1 px-4 border border-black'>Add</button>
          </div>
          <div className='flex flex-row items-center justify-between bg-neutral-100 px-4'>
            <div className='flex flex-col text-gray-600'>
              <div className='flex flex-col py-2'>
                <span>1 item get 10% OFF</span>
                on each product
                <div>
                  <span className='font-bold mr-2'>$29.99</span>
                  <span className='line-through text-sm text-neutral-400'>$39.99</span>
                </div>
              </div>
            </div>
            <button className='bg-white py-1 px-4 border border-black'>Add</button>
          </div>
        </div>

        <div className='space-y-2'>
          <span className='font-bold text-xl '>Frequently bought together</span>
          <div className='flex flex-row p-4 space-x-2 justify-center'>
            <div className='relative border'>
              <Image src={process.env.NEXT_PUBLIC_API_URL + urlMainPhoto} alt='image' width={160} height={160}></Image>
              <div className='absolute z-20 right-[-14px] top-[75px] rounded-full bg-blue-500 text-white '><Plus size={20} /></div>
            </div>
            <div className='relative border'>
              <Image src={process.env.NEXT_PUBLIC_API_URL + urlMainPhoto} alt='image' width={160} height={160}></Image>
              <div className='absolute z-20 right-[-14px] top-[75px] rounded-full bg-blue-500 text-white '><Plus size={20} /></div>
            </div>
            <div className='relative border'>
              <Image src={process.env.NEXT_PUBLIC_API_URL + urlMainPhoto} alt='image' width={160} height={160}></Image>
            </div>
          </div>
          <div className='space-y-1'>
            <div className='flex flex-row space-x-2 text-sm justify-between'>

              <div className='flex flex-row'>
                <input type="checkbox" className='rounded' name="" id="" />
                <span className='font-bold mr-2'>This Product:</span>
                <span className='truncate max-w-64'>{productData.product.title}</span>
              </div>
              <span>$29.99</span>
            </div>
            <div>
              <select name="" id="" className='border rounded w-96 h-8 text-xs text-neutral-500'>
                {productData.productVariants.map((item: any, varIndex: number) => (
                  <option key={varIndex} value="" >{item.value}</option>
                ))}
              </select>
            </div>
          </div>
          <button className='bg-blue-500 w-full py-2 hover:bg-blue-600 text-white'>Add all to Cart</button>
        </div>

      </div>
    </div>
  )
}