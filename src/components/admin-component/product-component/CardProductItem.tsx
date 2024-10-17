"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  product: any
}
export function CardProductItem(props: Props) {
  const data = props.product;
  return (
    <div className="shadow-lg hover:scale-105 transition-transform trasistion border border-neutral-300 text-neutral-600 rounded-3xl h-[500px] flex flex-col hover:shadow-2xl duration-300 ease-in-out overflow-hidden hover:bg-gray-100">
      <div className="h-56 overflow-hidden flex items-center justify-center mb-2">
        <div className="h-full w-full ">
        <Link href={"/admin/all-product/edit/" + data.id}>
        <Image width={1000} height={500} src={data.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}` : '/image/nophotos.png'} alt="image 1" />
        </Link>
          
        </div>
      </div>
      <div className="px-2">
        <Link href={"/admin/all-product/edit/" + data.id} className="text-lg font-bold tracking-tight h-10 overflow-hidden">
          {data.title}
        </Link>
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