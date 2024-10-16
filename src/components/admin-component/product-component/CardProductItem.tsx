"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  product: any
}
export function CardProductItem(props: Props) {
  const data = props.product;
  return (
    <div className="border text-neutral-600 border-neutral-400 rounded-lg h-96 flex flex-col p-2 hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden hover:bg-gray-100">
      <div className="h-40 overflow-hidden flex items-center justify-center py-2 mb-2">
        <div className="h-[200px] w-[200px] bg-red-500">
          <Image width={200} height={200} src={data.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}` : '/image/nophotos.png'} alt="image 1" />
        </div>
      </div>
      <p className="text-lg font-bold tracking-tight h-20 overflow-hidden">
        {data.title}
      </p>
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
  );
}