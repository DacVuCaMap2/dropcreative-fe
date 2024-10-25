"use client";
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import HomeDropdown from "./HomeDropdown";
import { ArrowDownToLine, Eye, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import {
  homeCategories,
  homeCountry,
  homeTheme,
} from "@/data/home-data/homeListData";
import HomeCategories from "./HomeCategories";
import SlideProduct from "./SlideProduct";
import InputSearchComponent from "../general-component/InputSearchComponent";
import SearchForm, { getNewSearchForm } from "@/model/SearchForm";
import GetApi from "@/api/GetApi";
import { message } from "antd";
import { ScaleLoader } from "react-spinners";
import { handleDownloadToTxtPublic } from "@/data/downloadFunction";
import { deleteAllCookies } from "@/ultils";
import NewestProduct from "./NewestProduct";
import ListProduct from "../admin-component/product-component/ListProduct";
import CardTotalManager from "./CardTotalManager";

type Props = {
  listHistory: any[];
  accountId: any
}

export default function HomePage(props: Props) {
  const listCategories = homeCategories;
  const listTheme = homeTheme;
  const listCountry = homeCountry;
  const listSuggestSearch: string[] = [];
  const [keySearch, setKeySearch] = useState("");
  const [dataSearch, setDataSearch] = useState<SearchForm>(getNewSearchForm());
  const [isLoadingDownLoad, setLoadingDownload] = useState(false);
  const [listNewProduct, setListNewProduct] = useState<any[]>([]);
  const [listTotal, setListTotal] = useState<any>(null);
  if (!props.accountId) {
    console.log("vao day")
    deleteAllCookies();
  }
  const handleClickSearch = () => {
    let category = "&category=";
    dataSearch.category.forEach(cat => {
      category += cat.value + "-"
    })
    let holiday = "&holiday=";
    dataSearch.holiday.forEach(hol => {
      holiday += hol.value + "-"
    })
    let season = "&season=";
    dataSearch.season.forEach(sea => {
      season += sea.value + "-"
    })
    const type = "&type=" + dataSearch.type.value;
    const params = category + holiday + season + type + "&search=" + keySearch;
    window.location.href = "/search?" + params
  }

  const handleAddProduct = async (id: any) => {
    setLoadingDownload(true)
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/duplicate/" + id;
    const response = await GetApi(url);
    console.log(response);
    if (response && response.status && response.status === 200 && response.value) {
      message.success("add success");
      window.location.href = "/admin/all-product";
      // router.push("/admin/all-product");
    }
    if (response && response.status && response.status === 400 && response.message) {
      message.error(response.message)
    }
    setLoadingDownload(false);
  }

  const handleDownLoad = async (id: any) => {
    setLoadingDownload(true);
    let productData: any = null;
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/" + id;
    const response = await GetApi(url);
    if (response.product) {
      productData = response;
      if (productData) {
        await handleDownloadToTxtPublic(productData, setLoadingDownload);
      }
    }
    setLoadingDownload(false);
    //add 1 download
    const urlCount = process.env.NEXT_PUBLIC_API_URL + "/api/product/" + productData.product.id + "/download"
    await GetApi(urlCount);
  }
  //first loading
  useEffect(() => {
    const fetchNewProduct = async () => {
      const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/getProducts?page=1&size=10&sort=desc&search="
      const response = await GetApi(url);
      if (response.response?.data && Array.isArray(response.response.data)) {
        console.log(response.data)
        setListNewProduct(response.response.data);
      }
    }
    const fetchTotal = async () => {
      const url = process.env.NEXT_PUBLIC_API_URL + "/api/manager/count-all"
      const response = await GetApi(url);
      if (response.users) {
        setListTotal(response);
      }
    }
    fetchNewProduct();
    fetchTotal();
  }, [])

  return (
    <div className="">
      {isLoadingDownLoad && <div className="fixed top-0 left-0 z-40 w-screen h-screen bg-white opacity-70 flex justify-center items-center">
        <ScaleLoader height={100} width={10} />
      </div>}
      <div className="flex flex-col relative">
        <div className="h-[400px] main-menu"></div>
        <div className="absolute top-52 w-full h-20 flex flex-col justify-center items-center space-y-2">
          <span className="text-3xl font-bold text-white pb-2">
            Ready to start looking product?
          </span>
          <span className="text-white text-sm pb-4">Find all products for any market, images, videos, and landing pages with just one click.</span>
          <InputSearchComponent setDataSearch={setDataSearch} dataSearch={dataSearch} handleClickSearch={handleClickSearch} keySearch={keySearch} setKeySearch={setKeySearch} type={0} />
          {listSuggestSearch.length > 0 &&
            <div className="text-white w-1/2 pt-2 flex flex-row space-x-4 items-start justify-center">
              {listSuggestSearch.map((str: string, index) => (
                <div key={index} className="relative">
                  <div className="absolute inset-0 bg-neutral-300 backdrop-blur-md opacity-40  "></div>
                  <button onClick={() => setKeySearch(str)} className="hover:bg-neutral-400 relative z-10 w-full py-2 px-4 flex flex-row space-x-2 items-center text-sm ">
                    <span className="text-white">{str}</span>
                    <Search className="text-white" size={20} />
                  </button>
                </div>
              ))}

            </div>
          }
          <div>
            {listTotal ?
              <div className="mt-2">
                <CardTotalManager totalManager={listTotal} />
              </div>
              :
              <div className="mt-2 py-10">
                <ScaleLoader color="white" height={60} width={10} />
              </div>
            }
          </div>

        </div>

        <div className="flex flex-col justify-center items-center">
          {!props.accountId ?
            <div className="flex justify-center items-center w-full overflow-hidden relative">
              <div className="h-20 w-20 bg-green-400 absolute top-[-25px] left-8 rounded-full">
              </div>
              <div className="h-20 w-20 bg-red-300 absolute top-[-10px] right-8 rounded-full">
              </div>
              <div className="mx-auto h-0 w-0 border-r-[25px] border-b-[55px] 
              border-l-[25px] border-solid border-r-transparent
              border-l-transparent border-b-purple-400 absolute bottom-3 right-32">
              </div>
              <div className="h-20 w-20 bg-red-500 absolute bottom-[-30px] left-32">
              </div>
              <div className="bg-amber-100 w-full py-8 flex justify-center items-center space-x-4">
                <span className="font-bold">Sign up now to search for free sale season products </span>
                <Link href={"/login?register=1"} className="bg-black text-white p-2">Sign Up Now</Link>
              </div>
            </div>
            :
            <div className="flex justify-center items-center w-full overflow-hidden relative">
              <div className="h-20 w-20 bg-green-400 absolute top-[-25px] left-8 rounded-full">
              </div>
              <div className="h-20 w-20 bg-red-300 absolute top-[-10px] right-8 rounded-full">
              </div>
              <div className="mx-auto h-0 w-0 border-r-[25px] border-b-[55px] 
              border-l-[25px] border-solid border-r-transparent
              border-l-transparent border-b-purple-400 absolute bottom-3 right-32">
              </div>
              <div className="h-20 w-20 bg-red-500 absolute bottom-[-30px] left-32">
              </div>
              <div className="bg-amber-100 w-full py-8 flex justify-center items-center space-x-4">
                <span className="font-bold">Discover Your Exclusive PREMIUM PLANS: </span>
                <div className="bg-black text-white px-4 py-2"><span className="font-bold text-lg">7</span> days left</div>
              </div>
            </div>
          }

          <div className="flex flex-col py-16 space-y-20 lg:w-[1340px] w-screen px-4">


            {listNewProduct.length > 0 &&
              <NewestProduct listProductNew={listNewProduct} handleAddProduct={handleAddProduct} handleDownLoad={handleDownLoad} />
            }



            {props.listHistory.length > 0 &&
              <div className="flex flex-col space-y-8 w-full overflow-hidden">
                <span className="font-bold text-3xl">
                  Recently viewed products
                </span>
                <div className="flex flex-row w-full space-x-10 ">
                  {props.listHistory.map((item: any, ind) => (
                    <div key={ind} className=" flex flex-col w-72 h-72 space-y-2 ">
                      <div className='relative w-[300px] h-[200px] overflow-hidden flex justify-center items-center bg-gray-200 rounded group'>
                        <Image
                          src={item.url ? process.env.NEXT_PUBLIC_API_URL + item.url : "/image/nophotos.png"}
                          alt="img"
                          className='h-[200px] w-auto object-contain '
                          width={600}
                          height={600}
                          priority
                        />
                        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-20" />
                        <div className="absolute flex flex-row justify-center items-center bottom-0 bg-gray-950 w-full h-12 text-neutral-200 space-x-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                          <Link
                            target="_blank"
                            href={`/landing-page/product/${item.productId}`}
                            className="hover:bg-neutral-600 h-full w-full flex flex-row items-center px-2 space-x-2 text-xs font-bold"
                          >
                            <Eye size={20} /> <span>View product</span>
                          </Link>
                          <button
                            onClick={() => handleAddProduct(item.productId)}
                            className="hover:bg-neutral-600 h-full w-1/5 flex justify-center items-center"
                          >
                            <Plus />
                          </button>
                          <button
                            onClick={() => handleDownLoad(item.productId)}
                            className="hover:bg-neutral-600 h-full w-1/5 flex justify-center items-center">
                            <ArrowDownToLine />
                          </button>
                        </div>
                      </div>
                      <p className="w-full truncate font-bold text">{item.name}</p>
                      <p className="text-gray-400 text-sm">3 week ago</p>

                    </div>
                  ))}
                </div>
              </div>
            }




            <div className="flex flex-col space-y-4">
              <span className="font-bold text-xl">
                AI helps create product images and increase creativity
              </span>
              <div className="flex flex-row w-full space-x-6 ">
                <Link href={"/tools-page"}>
                  <div className="relative flex flex-col h-56 w-56 bg-red-400 rounded-xl overflow-hidden group">
                    <div className="absolute top-3 left-2 z-10 text-white font-bold">
                      AI Product Builder
                    </div>
                    <span className="absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                      Generate product images from the world in real time
                    </span>
                    <Image
                      src="/image/default/AIgen.jpg"
                      alt="Image"
                      width={300}
                      height={300}
                      className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50" />
                  </div>
                </Link>
                <Link href={"/tools-page"}>
                  <div className="relative flex flex-col h-56 w-56 bg-red-400 rounded-xl overflow-hidden group">
                    <div className="absolute top-3 left-2 z-10 text-white font-bold">
                      Facebook Ads Library
                    </div>
                    <span className="absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                      Developing....
                    </span>
                    <Image
                      src="/image/default/fbAdsLib.png"
                      alt="Image"
                      width={300}
                      height={300}
                      className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50" />
                  </div>
                </Link>
              </div>
            </div>

            <HomeCategories />



            <div className="flex flex-col space-y-4">
              <div className="flex flex-row space-x-4 items-center justify-center">
                <div className="flex-grow space-y-4">
                  <p className="font-bold text-lg text-green-500">
                    COLLECTIONS
                  </p>
                  <p className="font-bold text-5xl">Products by country</p>
                  <p className="text-lg text-neutral-600">
                    Choose products according to your favorite country
                  </p>
                </div>
                <div className="">
                  <button className="text-gray-200 bg-neutral-950 px-4 py-2 rounded font-bold">
                    Explore collections
                  </button>
                </div>
              </div>

              <div className="flex flex-row flex-wrap justify-center space-x-8">
                {listCountry.map((item: any, index) => (
                  <a key={index} href={item.url}>
                    <div className="relative">
                      <div className="absolute hover:opacity-15 opacity-0 top-0 left-0 h-full w-full bg-white"></div>
                      <div className="flex flex-col h-72 w-72 mb-2 rounded overflow-hidden">
                        <div className="h-1/2 overflow-hidden mb-[2px]">
                          <img
                            src={item.img1}
                            alt="img"
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="flex flex-row">
                          <div className="w-1/2 overflow-hidden mr-[2px]">
                            <img
                              src={item.img2}
                              alt="img"
                              className="w-full h-auto"
                            />
                          </div>
                          <div className="w-1/2 overflow-hidden">
                            <img
                              src={item.img3}
                              alt="img"
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="font-bold text-lg">{item.title}</p>
                      <p className="text-neutral-500 text-sm">
                        All product in {item.title}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <p className="text-center font-bold text-3xl">Product Holiday</p>
                <p className="text-center text-lg text-neutral-600">
                  Check to see which product theme is right for you
                </p>
              </div>
              <div className="flex flex-row flex-wrap justify-center">
                {listTheme.map((item: any, index) => (
                  <a key={index} href={item.url}>
                    <div className="relative flex flex-col h-[260px] mb-4 ml-2  rounded-xl overflow-hidden group">
                      <div className="absolute bottom-3 left-2 z-10 text-white font-bold">
                        {item.title}
                      </div>
                      <img
                        src={item.img}
                        alt="img"
                        className="h-full w-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50" />
                    </div>
                  </a>
                ))}
              </div>
            </div>


            <div className="flex flex-col space-y-14">
              <div>
                <h4 className="text-[rgb(51,106,234)] text-[15px] text-center">
                  BENFITS
                </h4>
                <h2 className="text-[56px] text-center">
                  Let’s make your ideas break through
                </h2>
                <p className="text-[15px] font-semibold text-center">
                  Just a few simple steps and you can bring your products to the dropshipping market !
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <div className="space-y-4 w-1/4">
                  <video
                    src="https://fps.cdnpk.net/home/benefits/benefit-quality.mp4"
                    width="70"
                    height="70"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disableRemotePlayback
                    className="rounded _1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196"
                  ></video>
                  <h3 className="text-2xl font-bold">
                    Create an Account
                  </h3>
                  <p>
                    Register for an account on the DropCreative website to upload your products.
                  </p>
                </div>
                <div className="space-y-4 w-1/4">
                  <video
                    src="https://fps.cdnpk.net/home/benefits/benefit-content.mp4"
                    width="70"
                    height="70"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disableRemotePlayback
                    className="rounded _1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196"
                  ></video>
                  <h3 className="text-2xl font-bold">
                    Upload Products
                  </h3>
                  <p>
                    Upload your products or add available sample products from DropCreative, adjust the selling price and landing page.
                  </p>
                </div>
                <div className="space-y-4 w-1/4">

                  <video
                    src="https://fps.cdnpk.net/home/benefits/benefit-ready.mp4"
                    width="70"
                    height="70"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disableRemotePlayback
                    className="rounded _1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196"
                  ></video>
                  <h3 className="text-2xl font-bold">
                    Set the Selling Price:
                  </h3>
                  <p>
                    Decide on the selling price for your products based on costs and desired profit. Also, add payment methods!
                  </p>
                </div>
                <div className="space-y-4 w-1/4">
                  <video
                    src="https://fps.cdnpk.net/home/benefits/benefit-think.mp4"
                    width="70"
                    height="70"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disableRemotePlayback
                    className="rounded _1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196"
                  ></video>
                  <h3 className="text-2xl font-bold">Promote the Products</h3>
                  <p>
                    Use social media channels, email marketing, or other advertising campaigns to introduce your products to potential customers. Receive performance feedback data.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row bg-blue-600 items-center justify-center">
              <div className="flex flex-col space-y-4 pl-40 text-white flex-grow h-full">
                <p className="font-bold text-2xl">FaceBook ads libary</p>
                <p className="font-bold text-lg">
                  Facebook&apos;s advertising library with thousands of trending top products
                </p>
                <div className="space-x-4">
                  {/* <button className="bg-white text-black font-bold text-xs px-4 py-2 rounded">
                    Start editing
                  </button> */}
                  <button className="text-white border border-white font-bold text-xs px-4 py-2 rounded">
                    Explore now
                  </button>
                </div>
              </div>
              <div>
                <Image
                  src={"/home/bannerFace.png"}
                  alt={"image"}
                  width={600}
                  height={0}
                ></Image>
              </div>
            </div>
          </div>
          <SlideProduct />
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  );
}
