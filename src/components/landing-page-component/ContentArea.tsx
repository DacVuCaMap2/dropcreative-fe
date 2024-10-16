"use client"
import React from 'react'
import CommentArea from './CommentArea';
import SuggestedArea from './SuggestedArea';
type Props = {
  productData: any
}
export default function ContentArea(props: Props) {
  const productData = props.productData;
  console.log(productData);
  const desc = productData.product.description;
  return (
    <div className='py-10 flex flex-col justify-center items-center space-y-4 w-full'>
      <div className='border-b w-full flex justify-center space-x-4 items-center flex-row border-neutral-300'>
        <span className='font-bold text-lg border-b-2 border-black'>PRODUCT DETAILS</span>
        <span className='font-bold text-lg text-neutral-500'>SHIPPING</span>
        <span className='font-bold text-lg text-neutral-500'>RETURN & WARRANTY</span>
      </div>
      <div className='w-[800px]'>
        <div dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
      <div className='bg-neutral-100 w-full flex flex-col py-4 items-center'>
        <p className='w-full text-center font-bold text-2xl'>Customer review</p>
        <div className='w-[1000px]'>
          <CommentArea/>
        </div>
        <div className='mt-20 flex flex-col items-center'>
          <span className='font-bold text-3xl'>You may also like</span>
          <div className='w-[1000px]'>
            <SuggestedArea/>
          </div>
        </div>
      </div>
    </div>
  )
}
