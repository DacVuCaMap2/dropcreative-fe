"use client"
import React from 'react'
import BuyArea from './BuyArea';
import ContentArea from './ContentArea';
type Props = {
    productData: any
}
export default function ProductDetails(props: Props) {
    console.log(props.productData);
    return (
        <div className='flex flex-col justify-center items-center'>
            <BuyArea productData={props.productData}/>
            <ContentArea productData={props.productData}/>
        </div>
    )
}
