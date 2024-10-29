"use client"
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules'


import Image from 'next/image'
import { Flame, Minus, Plus, Star } from 'lucide-react'
import { Rate } from 'antd'
import { stringToVariant, tranObjectFromStrTwoKey } from '@/data/function'
import CountDownComponent from './CountDownComponent'
import GetApi from '@/api/GetApi'

type Props = {
  productData: any
}


// Facebook Pixel implementation
const useInitializeFacebookPixel = () => {
  useEffect(() => {
    const loadFacebookPixel = () => {
      if (typeof window !== 'undefined') {
        // Create the script element
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        
        // Initialize fbq
        window.fbq = function() {
          window.fbq.callMethod ? 
            window.fbq.callMethod.apply(window.fbq, arguments) : 
            window.fbq.queue.push(arguments);
        };
        
        // Initialize Facebook Pixel queue
        if (!window._fbq) {
          window._fbq = window.fbq;
        }
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = '2.0';
        window.fbq.queue = [];
        
        // Insert the script into the DOM
        const firstScript = document.getElementsByTagName('script')[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript);
        }
        
        // Initialize and track PageView
        window.fbq('init', '1874932473002128');
        window.fbq('track', 'PageView');
      }
    };

    loadFacebookPixel();
    
    // Cleanup function
    return () => {
      // Clean up if needed
    };
  }, []);
};

export default function BuyArea(props: Props) {
  const productData: any = props.productData;
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const productVariantTitle: string[] = productData.product.variant.split("./");
  const [selectedVariant, setSelectedVariant] = useState([0, 0, 0]);
  const [changeStatus, setChangeStatus] = useState(0);
  const [currentImg, setCurrentImg] = useState(0);
  const [currentQuan, setCurrentQuan] = useState<number>(1);
  const [currentVariant, setCurrentVariant] = useState<any>(productData.productVariants[0]);
  const comboSaleList = tranObjectFromStrTwoKey(productData.productDetail.comboSale);
  const boughtTogetherList = tranObjectFromStrTwoKey(productData.productDetail.boughtTogether);
  const [boughtTogetherShow, setBoughttTogetherShow] = useState<any[]>([]);

  // facebookpixel
  useInitializeFacebookPixel();


  let urlMainPhoto = "";
  let photos: any[] = [];
  let loop = false;
  if (props.productData.images) {
    photos = props.productData.images.map((item: any) => {

      if (item.isMain) {
        urlMainPhoto = item.url;
      }
      return { id: item.id, url: item.url, isMain: item.isMain }
    })
    // Find the main photo
    const mainPhoto = photos.find(photo => photo.isMain);

    // Filter out the main photo from the array
    const otherPhotos = photos.filter(photo => !photo.isMain);

    photos = [mainPhoto, ...otherPhotos];

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
  console.log(photos)
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
        const ind = photos.findIndex(photo => photo.id === item.imageId);
        setCurrentImg(ind);
        goToSlide(ind);
        setCurrentVariant(item);
      }
      return item;
    });
  }, [selectedVariant])
  //get productdetails

  useEffect(() => {
    if (boughtTogetherList.length > 1) {
      const fetchData = async () => {
        if (boughtTogetherShow.length < 3) {
          let temp: any[] = [...boughtTogetherShow];
          const id1 = boughtTogetherList[1] ? boughtTogetherList[1].key1 : ""
          const id2 = boughtTogetherList[2] ? "-" + boughtTogetherList[2].key1 : ""
          const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/bought-together?ids=" + id1 + id2;
          const response = await GetApi(url);
          if (Array.isArray(response) && response.length > 0 && response[0].productResponse) {
            temp = response.map(item => {
              return { product: item.productResponse, images: item.images, productVariants: item.productVariantResponses }
            });

          }
          setBoughttTogetherShow(temp);
        }
      }
      fetchData();
    }
  }, [])
  return (
    <div className='w-[1100px] flex flex-row space-x-2 py-4 justify-between'>
      <div className='flex flex-col space-y-8 '>
        <div className='overflow-hidden border-b border-neutral-300 pb-4'>
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
                    src={image ? process.env.NEXT_PUBLIC_API_URL + image.url : "/images/nophotos.png"}
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
                    src={image ? process.env.NEXT_PUBLIC_API_URL + image.url : "/image/nophotos.png"}
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
                <button onClick={() => { setCurrentImg(index); goToSlide(index) }}>
                  <Image
                    src={image ? process.env.NEXT_PUBLIC_API_URL + image.url : "/images/nophotos.png"}
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
            <span className='text-2xl'>${currentVariant ? currentVariant.price : 0}</span>
            <span className='line-through text-neutral-400 text-lg'>${currentVariant ? currentVariant.comparePrice : 0}</span>
            <span className='bg-black text-white py-1 px-4 rounded text-xs'>{currentVariant ? (100 - (currentVariant.price / currentVariant.comparePrice) * 100).toFixed(2) : 0}%</span>
          </div>
          <div className='mb-4'>
            <CountDownComponent />
          </div>
          <div className='space-y-4'>
            {productVariantTitle.map((item: any, index) => (
              <div key={index}>
                <span className=''>{item}</span>
                <div className='flex flex-row flex-wrap'>
                  {variantsSelectList[index].map((childItem: string, childIndex) => (
                    <button onClick={() => handleSelectedVariant(index, childIndex)} key={childIndex} className={`border rounded-lg py-2 px-4 mr-4 mb-2 ${selectedVariant[index] === childIndex ? 'bg-neutral-800 text-white shadow-lg ' : ''}`}>
                      {childItem}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-row justify-between h-20 items-center'>
          <div className='flex flex-row w-36 border border-neutral-300 h-14 items-center'>
            <button onClick={() => setCurrentQuan(currentQuan > 1 ? currentQuan - 1 : currentQuan)} className='w-1/4 flex justify-center items-center px-2 hover:bg-gray-200 h-full'><Minus /></button>
            <span className='w-full text-center'>{currentQuan}</span>

            <button onClick={() => setCurrentQuan(currentQuan + 1)} className='w-1/4 flex justify-center items-center px-2 hover:bg-gray-200 h-full'><Plus /></button>
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
          {comboSaleList.map((item: any, index) => (
            <div key={index} className='flex flex-row items-center justify-between bg-neutral-100 px-4'>
              <div className='flex flex-col text-gray-600'>
                <div className='flex flex-col py-2'>
                  <span>{item.key1} item get {item.key2}% OFF</span>
                  on each product
                  <div>
                    <span className='font-bold mr-2'>${currentVariant?.price ? (currentVariant.price * (100 - item.key2) / 100).toFixed(2) : 0}</span>
                    <span className='line-through text-sm text-neutral-400'>${currentVariant ? currentVariant.price : 0}</span>
                  </div>
                </div>
              </div>
              <button className='bg-white py-1 px-4 border border-black'>Add</button>
            </div>
          ))}
        </div>

        <div className='space-y-2'>
          <span className='font-bold text-xl '>Frequently bought together</span>
          <div className='flex flex-row p-4 space-x-2 justify-center'>
            <div className='relative border'>
              <Image src={process.env.NEXT_PUBLIC_API_URL + urlMainPhoto} alt='image' width={160} height={160}></Image>

            </div>
            {boughtTogetherShow.map((item: any, index) => (
              <div key={index} className='relative border'>
                <Image src={`${(Array.isArray(item.images) && item.images.length > 0) ? process.env.NEXT_PUBLIC_API_URL + item.images[0].url : "/image/nophotos.png"}`} alt='image' width={160} height={160}></Image>
                <div className='absolute z-20 left-[-14px] top-[75px] rounded-full bg-blue-500 text-white '><Plus size={20} /></div>
              </div>
            ))}
          </div>
          <div className='flex flex-col space-y-4'>
            <div className='space-y-1'>
              <div className='flex flex-row space-x-2 text-sm justify-between'>
                <div className='flex flex-row'>
                  <input type="checkbox" className='rounded mr-2' name="" id="" />
                  <span className='truncate max-w-64'>{productData.product.title}</span>
                </div>
                {currentVariant?.price ? <span>${(boughtTogetherList.length > 0 && parseFloat(boughtTogetherList[0].key2) != 0) ? (((100 - parseFloat(boughtTogetherList[0].key2)) / 100) * currentVariant.price).toFixed(2) : currentVariant.price}</span>
                  : 0
                }
              </div>
              <div>
                <select name="" id="" className='border rounded w-96 h-8 text-xs text-neutral-500'>
                  {productData.productVariants.map((item: any, varIndex: number) => (
                    <option key={varIndex} value="" >{item.value}</option>
                  ))}
                </select>
              </div>
            </div>
            {boughtTogetherShow.map((item: any, index) => (
              <div key={index} className='space-y-1'>
                {item.product &&
                  <div className='flex flex-row space-x-2 text-sm justify-between'>
                    <div className='flex flex-row'>
                      <input type="checkbox" className='rounded mr-2' name="" id="" />
                      <span className='truncate max-w-96'>{item.product.title}</span>
                    </div>
                    <span>${parseFloat(boughtTogetherList[index + 1].key2) != 0 ? (((100 - parseFloat(boughtTogetherList[index + 1].key2)) / 100) * item.product.price).toFixed(2) : item.product.price}</span>
                  </div>
                }
                <div>
                  <select name="" id="" className='border rounded w-96 h-8 text-xs text-neutral-500'>
                    {item.productVariants.map((item: any, varIndex: number) => (
                      <option key={varIndex} value="" >{item.value}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
          <button className='bg-blue-500 w-full py-2 hover:bg-blue-600 text-white'>Add all to Cart</button>
        </div>

      </div>
    </div>
  )
}