"use client";

import { Eye, Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: any
}
export function CardProductItem(props: Props) {
  const data = props.product;
  return (
    <div className="shadow-lg transition-transform trasistion border border-neutral-300 text-neutral-600 h-[500px] flex flex-col hover:shadow-2xl duration-300 ease-in-out overflow-hidden hover:bg-gray-100">
      <div className="h-80 overflow-hidden flex items-center justify-center mb-2">
        <div className="relative h-full w-full group">
          <Link href={`/landing-page/product/${data.id}`} target="_blank">
            <Image
              width={1200}
              height={1200}
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
            <button className="hover:bg-red-600 h-full w-1/5 flex justify-center items-center">
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

        <div className="flex flex-row text-sm">
          <div className="flex flex-col w-full">
            {/* <span>Categories</span> */}
            <span>Ship fee</span>
            <span>Date</span>
            <span>Demo:</span>
          </div>
          <div className="flex flex-col w-full">
            <span>{data.category}</span>
            <span>12$</span>
            <span>11/11/2024</span>
            <Link className="underline cursor-pointer text-blue-500" href={`/landing-page/product/${data.id}`}>{process.env.NEXT_PUBLIC_THIS_URL}+/landing-page/product/{data.id}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}