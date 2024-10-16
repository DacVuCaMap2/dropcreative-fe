"use client"
import React from 'react'
import CommentArea from './CommentArea';
import SuggestedArea from './SuggestedArea';
type Props = {
  productData: any
}
export default function ContentArea(props: Props) {
  const productData = props.productData;
  const desc = productData.product.description;
  const accountId = productData.product.accountId;
  return (
    <div className='py-10 flex flex-col justify-center items-center space-y-4 w-full'>
      <div className='border-b w-full flex justify-center space-x-8 items-center flex-row border-neutral-300'>
        <button className='font-bold text-lg border-b-2 border-black'>DESCRIPSION</button>
        <button className='font-bold text-lg text-neutral-500'>SHIPPING</button>
        <button className='font-bold text-lg text-neutral-500'>RETURN & WARRANTY</button>
      </div>
      <div className='w-[800px]'>
        <div dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
      <div className='bg-neutral-100 w-full flex flex-col py-4 items-center pb-20'>
        <p className='w-full text-center font-bold text-2xl'>Customer review</p>
        <div className='w-[1000px]'>
          <CommentArea/>
        </div>
        <div className='mt-20 flex flex-col items-center'>
          <span className='font-bold text-3xl mb-8'>You may also like</span>
          <div className='w-[1000px]'>
            <SuggestedArea accountId={accountId}/>
          </div>
        </div>
      </div>
    </div>
  )
}
