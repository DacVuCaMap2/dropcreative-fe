"use client"
import apiHandlePixel from '@/api/apiHandlePixel';
import axios from 'axios';
import { Button } from 'flowbite-react'
import React from 'react'

export default function page() {
    const accessTk = "EAAz5ZBXaNxE4BOZBDyY3CxRmZByCb8uFpcQqFoV9bxjser8VZCniWyUaWfBrmpZBZAs6qRkupauDJWIUoiXkkx8t8UdZBsFIKPnxuKmtWC9060w4ZABr2okiyQYv0qUEkHnzLU4Mq2mZCF2RXmDuigpkjocQC2NqKgMJvZA4k4roQ1awy5lF4U8wu62Ytd";
    // const handleSumbit=(pixelId:any,accessToken:any,accountId:any,businessId:any)=>{
    //     var options = {
    //         method:"GET",
    //         url:'https://graph.facebook.com/v14.0/' + pixelId + '/shared_accounts',
    //         qs:{
    //             accessToken:accessToken,
    //             accountId:accountId,
    //             businessId:businessId,
    //             method:"POST"
    //         }
    //     }
    // }

    const handleSubmit = async() =>{
    }
  return (
    <div>

        <button onClick={()=>handleSubmit()} className='p-4 bg-gray-400 hover:bg-slate-200'>submit</button>
    </div>
  )
}
