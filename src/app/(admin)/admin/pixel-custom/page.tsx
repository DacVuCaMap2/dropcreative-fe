import GetApi from '@/api/GetApi';
import PixelComponent from '@/components/admin-component/custom-pixel-component/PixelComponent'
import CategoryPixel from '@/model/CategoryPixel';
import React from 'react'

export default async function page() {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/facebook/get";
    const response = await GetApi(url);
    console.log(response);
    let listPixel : CategoryPixel[] = [];
    if (Array.isArray(response) && response.length>0) {
        
        listPixel = response.map((item:any,index)=>{
            return item;
        })
    }
  return (
    <PixelComponent listPixel={listPixel}/>
  )
}
