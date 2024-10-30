"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules'


import Image from 'next/image'
import { Flame, Minus, Plus, Star } from 'lucide-react'
import { Rate } from 'antd'
import { stringToVariant, tranObjectFromStrTwoKey } from '@/data/function'
import CountDownComponent from './CountDownComponent'
import GetApi from '@/api/GetApi'
import Cart, { getNewCart } from '@/model/Cart'
import CartItem, { getNewCartItem } from '@/model/CartItem'
import CartBar from './CartBar'

type Props = {
  productData: any
}
// types.ts
type FbqParameter = string | Record<string, any> | null;

interface FacebookPixelFunction {
  (
    eventName: string,
    ...args: FbqParameter[]
  ): void;
  push: (args: any[]) => void;
  loaded?: boolean;
  version?: string;
  queue: any[];
  callMethod?: (...args: any[]) => void;
}

declare global {
  interface Window {
    fbq: FacebookPixelFunction;
    _fbq: FacebookPixelFunction;
  }
}




export const useFacebookPixel = (str: any) => {
  const PIXEL_ID = str;
  useEffect(() => {
    const initPixel = () => {
      if (typeof window === 'undefined') return;

      if (window.fbq?.loaded) return;

      const fbq: any = function (this: FacebookPixelFunction | void, ...args: any[]) {
        if (this?.callMethod) {
          this.callMethod.apply(this, args);
        } else {
          fbq.queue.push(args);
        }
      } as FacebookPixelFunction;
      fbq.queue = [];
      fbq.loaded = false;
      fbq.version = '2.0';
      fbq.push = fbq;

      window.fbq = fbq;
      window._fbq = fbq;

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';

      script.onerror = () => {
        console.error('Failed to load Facebook Pixel script');
      };

      // Add onload handler
      script.onload = () => {
        if (window.fbq) {
          // Initialize the pixel after script loads
          window.fbq('init', PIXEL_ID);
          window.fbq('track', 'PageView');

          if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
            console.log('Facebook Pixel initialized successfully');
          }
        }
      };

      // Insert the script
      document.head.appendChild(script);

      // Add the noscript pixel
      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.style.display = 'none';
      img.src = `https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.head.appendChild(noscript);
    };

    try {
      initPixel();
    } catch (error) {
      console.error('Error initializing Facebook Pixel:', error);
    }
  }, []);

  // Helper function to safely call fbq with proper typing
  const trackEvent = (event: string, data?: any) => {
    if (window.fbq) {
      window.fbq('track', event, data);
    }
  };

  return { trackEvent };
};

export default function BuyArea(props: Props) {
  ///Cart
  const [currentListCart, setCurrentListCart] = useState<Cart[]>([]);


  const { trackEvent } = useFacebookPixel(props.productData.productDetail.facebookPixel);
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
  const [listCart, setListCart] = useState<any[]>([]);
  const [isOpenCart, setOpenCart] = useState(false);
  const [tickAddSale, setTickAddSale] = useState({ 1: 0, 2: 0, 3: 0 });
  const [isVisibleAdd, setIsVisibleAdd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1400) { // Điều chỉnh số 200 theo ý muốn của bạn
        setIsVisibleAdd(true);
      } else {
        setIsVisibleAdd(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
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



  const handleAddToCart = (quan?: any) => {
    // // Gọi hàm fbq để gửi sự kiện đến Facebook Pixel
    // if (window.fbq) {
    //   window.fbq('track', 'AddToCart', {
    //     content_name: "test",
    //     content_ids: [1],
    //     value: "20$",
    //     currency: 'USD',
    //   });
    //   console.log(`Added to cart: test`);
    // }

    /// add to cart 
    console.log("quan", currentQuan);
    const thisQuan: number = (quan && !isNaN(quan)) ? parseFloat(quan) + currentQuan : currentQuan;
    let tempCart: Cart[] = [...currentListCart];
    let cart: Cart | undefined = tempCart.find(cart => cart.productId === currentVariant.productId);
    console.log(cart);
    if (!cart) {
      cart = getNewCart(currentVariant.productId, comboSaleList, productData.product.shippingFee);
      tempCart.push(cart);
    }
    let productVariants: CartItem | undefined = cart.cartItems.find(item => item.id === currentVariant.id);
    const selectPhoto = photos.find(item => item.id === currentVariant.imageId).url;
    if (productVariants) {
      productVariants = { ...productVariants, quantity: productVariants.quantity + thisQuan, imageUrl: selectPhoto };
      const tempCartItems = cart.cartItems.map(item => {
        if (productVariants && item.id === productVariants.id) {
          return productVariants;
        }
        return item;
      })
      cart = { ...cart, cartItems: tempCartItems };
    }
    else {
      cart.cartItems.push(getNewCartItem(currentVariant.id, thisQuan, productData.product.title, currentVariant.productId, currentVariant.price, currentVariant.value, selectPhoto, currentVariant.comparePrice));
    }
    console.log("cart", cart);
    tempCart = tempCart.map(item => {
      if (item.productId === currentVariant.productId) {
        return cart;
      }
      return item;
    })
    setCurrentListCart(tempCart);
    handleOpenOrCloseCart(true);
    console.log(currentVariant);
    console.log(currentQuan);
    console.log(comboSaleList);
  };
  const handleOpenOrCloseCart = (isOpen: boolean) => {

    setOpenCart(isOpen);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

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
    <div className='lg:w-[1100px] lg:flex-row w-full flex flex-col  space-x-2 py-4 justify-between'>
      <CartBar isOpen={isOpenCart} setCurrentListCart={setCurrentListCart} setOpenCart={handleOpenOrCloseCart} currentListCart={currentListCart} />
      {isOpenCart &&
        <div onClick={() => handleOpenOrCloseCart(false)} className='fixed top-0 left-[-100px] z-20 h-screen w-screen bg-black bg-opacity-45'>

        </div>
      }
      <div className={`fixed w-screen bg-white border-t bottom-0 left-[-8px] z-20 px-4 lg:hidden block py-4 transition-opacity duration-300 ${isVisibleAdd ? "lg:opacity-0 opacity-100" : "opacity-0"}`}>
        <div className='space-y-1 text-xs'>
          {productVariantTitle.map((item: any, index) => (
            <div key={index}>
              <span className=''>{item}</span>
              <div className='flex flex-row overflow-auto'>
                {variantsSelectList[index].map((childItem: string, childIndex) => (
                  <button onClick={() => handleSelectedVariant(index, childIndex)} key={childIndex} className={`border rounded-lg py-2 px-4 mr-4 mb-2 ${selectedVariant[index] === childIndex ? 'bg-neutral-800 text-white shadow-lg ' : ''}`}>
                    {childItem}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>


        <div className='flex flex-row justify-center space-x-4 items-center text-xs'>
          <div className='flex flex-row lg:w-36 w-[120px] border border-neutral-300 h-10 items-center  '>
            <button onClick={() => setCurrentQuan(currentQuan > 1 ? currentQuan - 1 : currentQuan)} className='w-1/4 flex justify-center items-center px-2 hover:bg-gray-200 h-full'><Minus /></button>
            <span className='w-full text-center'>{currentQuan}</span>

            <button onClick={() => setCurrentQuan(currentQuan + 1)} className='w-1/4 flex justify-center items-center px-2 hover:bg-gray-200 h-full'><Plus /></button>
          </div>
          <button onClick={handleAddToCart} className='w-2/3 flex justify-center  items-center h-10 border border-black bg-black text-white  hover:scale-105 transition-transform transform'>
            Add to cart
          </button>
        </div>
      </div>


      <div className='flex flex-col space-y-8 px-4 lg:px-0'>
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
            className='lg:w-[550px] lg:h-[550px] w-full h-full '
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
        <div className=' grid-cols-2 gap-2 px-6 hidden lg:grid'>
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
          <div className='flex flex-row lg:w-36 w-[120px] border border-neutral-300 h-14 items-center'>
            <button onClick={() => setCurrentQuan(currentQuan > 1 ? currentQuan - 1 : currentQuan)} className='w-1/4 flex justify-center items-center px-2 hover:bg-gray-200 h-full'><Minus /></button>
            <span className='w-full text-center'>{currentQuan}</span>

            <button onClick={() => setCurrentQuan(currentQuan + 1)} className='w-1/4 flex justify-center items-center px-2 hover:bg-gray-200 h-full'><Plus /></button>
          </div>
          <button onClick={handleAddToCart} className='w-2/3 flex justify-center  items-center h-14 border border-black  hover:scale-105 transition-transform transform'>
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
              <button onClick={() => { handleAddToCart(item.key1) }} className={`bg-white py-1 px-4 border border-black`}>Add</button>
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
                <div className='absolute z-10 left-[-14px] top-[75px] rounded-full bg-blue-500 text-white '><Plus size={20} /></div>
              </div>
            ))}
          </div>
          <div className='flex flex-col space-y-4'>
            <div className='space-y-1'>
              <div className='flex flex-row space-x-2 text-sm justify-between px-2'>
                <div className='flex flex-row'>
                  <input type="checkbox" className='rounded mr-2' name="" id="" />
                  <span className='truncate max-w-56'>{productData.product.title}</span>
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
                  <div className='flex flex-row space-x-2 text-sm justify-between px-2'>
                    <div className='flex flex-row'>
                      <input type="checkbox" className='rounded mr-2' name="" id="" />
                      <span className='truncate max-w-56'>{item.product.title}</span>
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