"use client";

import DeleteApi from "@/api/DeleteApi";
import PostApi from "@/api/PostParttern";
import { message } from "antd";
import { Eye, Facebook, FolderDown, Pen, Trash, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  product: any,
  setChange: React.Dispatch<React.SetStateAction<number>>,
  isAdmin: boolean
}
export function CardProductItem(props: Props) {

  const data = props.product;
  const [isOpen, setOpen] = useState(0);
  const [currentInp, setCurrentInp] = useState("");
  const delProduct = async () => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (confirmation) {
      const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/" + data.id;
      const response = await DeleteApi(url);
      window.location.reload();
    }
  }
  const handleShareFacebookPixel = async(e: any) => {
    e.preventDefault();
    console.log("db");
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/facebook/sharePixel";
    const postData = {
      value: currentInp,
      productId: 4
    }
    const response = await PostApi(url,postData);
    console.log(response);
    if (response?.status===200) {
      message.success("success");
      setOpen(0);
      return;
    }
    else if (response?.status===400 && response.message) {
      message.error(response.message);
      return;
    }
    else if (response?.error && response.error.message ) {
      message.error(response.error.message);
      return;
    }
    else{
      message.error("failed!");
      return;
    }

  }
  return (
    <div className="relative shadow-lg transition-transform trasistion border border-neutral-300 text-neutral-600  h-[590px] flex flex-col hover:shadow-2xl duration-300 ease-in-out overflow-hidden hover:bg-gray-100">
      <div className="relative h-80 overflow-hidden flex items-center justify-center mb-2">
        {data.isDuplicated &&
          <div className="absolute flex flex-row items-center justify-center space-x-1 top-4 left-0 bg-yellow-300 font-bold rounded-r shadow opacity-90 py-2 px-1 z-30 text-xs">
            <FolderDown size={20} /> <span>Dup</span>
          </div>
        }

        <div className="relative h-full w-full group flex justify-center items-center">
          <Link href={`/landing-page/product/${data.id}`} target="_blank">
            <Image
              width={1000}
              height={1000}
              src={data.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}` : '/image/nophotos.png'}
              alt="image 1"
            />
          </Link>

          <div className="absolute flex flex-row justify-center items-center bottom-0 bg-gray-950 w-full h-16 text-neutral-200 space-x-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <Link
              target="_blank"
              href={`/landing-page/product/${data.id}`}
              className="hover:bg-neutral-600 h-full w-full flex flex-row items-center px-2 space-x-2 font-bold"
            >
              <Eye /> <span>View product</span>
            </Link>
            <Link
              target="_blank"
              href={"/admin/all-product/edit/" + data.id}
              className="hover:bg-neutral-600 h-full w-1/5 flex justify-center items-center"
            >
              <Pen />
            </Link>
            <button onClick={() => delProduct()} className="hover:bg-red-600 h-full w-1/5 flex justify-center items-center">
              <Trash />
            </button>
          </div>
        </div>
      </div>
      <div className="px-2 ">
        <div className="h-8 overflow-hidden truncate">
          <Link href={"/admin/all-product/edit/" + data.id} className="text-lg font-bold ">
            {data.title}
          </Link>
        </div>

        <div className="relative flex flex-col items-center justify-center pt-2 text-xs text-neutral-500 space-y-2 ">
          {props.isAdmin &&
            <div className="flex flex-row justify-between items-center px-4 w-full">
              <p className="w-full font-bold">Creator:</p>
              <p className="w-2/3 text-left truncate">{data.productCreator.email}</p>
            </div>
          }
          <div className="flex flex-row justify-between items-center px-4 w-full">
            <p className="w-full font-bold">License:</p>
            <p className="w-2/3 text-left">{data.serviceType}</p>
          </div>
          <div className="flex flex-row justify-between items-center px-4 w-full">
            <p className="w-full font-bold">CR:</p>
            <p className="w-2/3 text-left">{data.cr}%</p>
          </div>
          <div className="flex flex-row justify-between items-center px-4 w-full">
            <p className="w-full font-bold">AOV:</p>
            <p className="w-2/3 text-left">{data.aov}</p>
          </div>
          <div className="flex flex-row justify-between items-center px-4 w-full">
            <p className="w-full font-bold">Price:</p>
            <p className="w-2/3 text-left">${data.price}</p>
          </div>
          <div className="flex flex-row justify-between items-center px-4 w-full">
            <p className="w-full font-bold">Compare Price:</p>
            <p className="w-2/3 text-left">${data.comparePrice}</p>
          </div>
          <div className="flex flex-row justify-between items-center px-4 w-full">
            <p className="w-full font-bold">Cost per Price:</p>
            <p className="w-2/3 text-left">${data.costPerPrice}</p>
          </div>
          <div className="flex flex-row justify-between items-center px-4 w-full">
            <p className="w-full font-bold">Shipping Fee:</p>
            <p className="w-2/3 text-left">${data.shippingFee}</p>
          </div>


        </div>
      </div>
      {(data.isDuplicated && !props.isAdmin) &&
        <div className="absolute w-full flex flex-col items-center justify-center bottom-0 left-0 bg-yellow-300 font-bold rounded-r shadow z-30 text-xs">
          <div>
            Pixel
          </div>
          <div className="flex flex-row justify-center items-center w-full">
            <button onClick={() => setOpen(1)} className="hover:bg-yellow-400 flex w-full py-1 flex-row justify-center items-center border-r border-black"><Image src={"/icon/facebookicon.svg"} alt="google" width={25} height={25} /></button>
            <button className="hover:bg-yellow-400 flex w-full py-1 flex-row justify-center items-center border-r border-black"><Image src={"/icon/googleicon.svg"} alt="google" width={25} height={25} /></button>
            <button className="hover:bg-yellow-400 flex w-full py-1 flex-row justify-center items-center"><Image src={"/icon/tiktokicon.svg"} alt="google" width={25} height={25} /></button>
          </div>
        </div>
      }

      {isOpen == 1 &&
        <div className="fixed top-0 left-0 z-50 h-screen w-screen bg-gray-800 bg-opacity-90 flex flex-col justify-center items-center">
          <form action="" onSubmit={handleShareFacebookPixel}>

            <div className="relative flex flex-col justify-center items-center bg-white h-96 w-[500px]">
              <button type="button" onClick={() => setOpen(0)} className="absolute top-2 right-2 hover:bg-gray-200 p-2 rounded-lg"><X /></button>
              <Image src={"/icon/facebookicon.svg"} alt="google" width={80} height={80} />
              <p className="font-bold">Facebook pixel</p>
              <p className="text-xs text-gray-400">Copy and paste your account ads id in here then submit to get share</p>
              <div className=" flex flex-col px-10 mt-8">
                <label className="text-xs font-bold " htmlFor="">Account ads id</label>
                <input required type="text" className="bg-gray-100 w-[300px] border-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 px-4" />
              </div>
              <button className="flex justify-center items-center w-20 mt-4 rounded-xl space-x-2 py-2 border bg-gray-100 hover:bg-gray-200">Submit</button>
            </div>
          </form>
        </div>
      }
    </div>
  );
}