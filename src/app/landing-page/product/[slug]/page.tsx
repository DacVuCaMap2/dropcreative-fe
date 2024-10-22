import GetApi from '@/api/GetApi';
import ProductDetails from '@/components/landing-page-component/ProductDetails';
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function page({params}:{params : {slug:string}}) {
    const cookie = cookies();
    const accountId = cookie.get('account_id')?.value;
    if (!accountId) {
        window.location.href="/login";
    }
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/"+params.slug; 
    const productData = await GetApi(url);
    console.log(productData);
    if (!productData.product) {
      notFound();
    }
  return (
    <ProductDetails productData={productData}/>
  )
}
