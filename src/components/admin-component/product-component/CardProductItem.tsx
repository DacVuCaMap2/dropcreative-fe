"use client";

import DeleteApi from "@/api/DeleteApi";
import { Eye, Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  product: any,
  setChange: React.Dispatch<React.SetStateAction<number>>,
  isAdmin: boolean
}
export function CardProductItem(props: Props) {
  const data = props.product;

  const delProduct = async () => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (confirmation) {
      const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/" + data.id;
      const response = await DeleteApi(url);
      window.location.reload();
    }
  }
  return (
    <div className="shadow-lg transition-transform trasistion border border-neutral-300 text-neutral-600  h-[570px] flex flex-col hover:shadow-2xl duration-300 ease-in-out overflow-hidden hover:bg-gray-100">
      <div className="h-80 overflow-hidden flex items-center justify-center mb-2">
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

        <div className="flex flex-col items-center justify-center pt-2 text-xs text-neutral-500 space-y-2">
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
    </div>
  );
}