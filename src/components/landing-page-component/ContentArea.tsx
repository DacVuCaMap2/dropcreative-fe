"use client"
import React, { useState } from 'react'
import CommentArea from './CommentArea';
import SuggestedArea from './SuggestedArea';
type Props = {
  productData: any
}
export default function ContentArea(props: Props) {
  const productData = props.productData;
  const desc = productData.productDetail.description;
  // console.log(productData);
  const shippingDesc = productData.productDetail.shippingDescription;
  const warrantyDesc = productData.productDetail.warrantyDescription;
  const accountId = productData.product.accountId;
  const [select,setSelect] = useState(0);
  return (
    <div className='py-10 flex flex-col justify-center items-center space-y-4 w-full'>
      <div className='border-b w-full flex justify-center space-x-8 items-center flex-row border-neutral-300'>
        <button onClick={()=>setSelect(0)} className={`font-bold text-lg  ${select===0 ? "border-b-2 border-black" : "text-neutral-500"}`}>DESCRIPSION</button>
        <button onClick={()=>setSelect(1)} className={`font-bold text-lg  ${select===1 ? "border-b-2 border-black" : "text-neutral-500"}`}>SHIPPING</button>
        <button onClick={()=>setSelect(2)} className={`font-bold text-lg  ${select===2 ? "border-b-2 border-black" : "text-neutral-500"}`}>RETURN & WARRANTY</button>
      </div>
      <div className='lg:w-[800px] w-full px-2'>
        {select === 0 && <div dangerouslySetInnerHTML={{ __html: desc }} />}
        {select === 1 && <div dangerouslySetInnerHTML={{ __html: shippingDesc }} />}
        {select === 2 && <div dangerouslySetInnerHTML={{ __html: warrantyDesc }} />}
      </div>
      <div className='bg-neutral-100 w-full flex flex-col py-4 items-center pb-20'>
        <p className='w-full text-center font-bold text-2xl'>Customer review</p>
        <div className='lg:w-[1000px] w-full'>
          <CommentArea/>
        </div>
        <div className='mt-20 flex flex-col items-center px-4 '>
          <span className='font-bold text-3xl mb-8'>You may also like</span>
          <div className='lg:w-[1000px] w-[500px]'>
            <SuggestedArea accountId={accountId}/>
          </div>
        </div>
      </div>
    </div>
  )
}
