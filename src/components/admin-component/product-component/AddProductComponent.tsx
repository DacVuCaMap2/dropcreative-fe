'use client'
import React, { useState, useEffect } from 'react'
import './AddProductComponent.css'
import { CircleAlert, Trash } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import TinyMCEEditor from '@/components/TinyMCE/TinyMCEEditor'
import Product, { getNewProduct } from '@/model/Product'


export default function AddProductComponent() {

  const [productData, setProductData] = useState<Product>(getNewProduct());
  const [listVariant, setListVariant] = useState<string[]>([]);
  console.log(productData);
  const [content, setContent] = useState('<p>Initial content</p>');

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  const handleChange = (e: any, key: string) => {
    let value = e.target.value;
    if (key === "price" || key === "comparePrice" || key === "costPerPrice" || key === "shippingFee") {
      value = parseFloat(value);
      if (isNaN(value)) {
        value = 0;
      }
    }
    let productTemp = { ...productData, [key]: value };
    setProductData(productTemp);
  }
  const handleAddVariant = () => {
    if (listVariant.length < 3) {
      setListVariant([...listVariant, ""]);
    }
  };
  const handleDeleteVariant = (ind:number)=>{

    const newList = listVariant.filter((item:string,childIndex)=>childIndex!=ind);
    console.log(newList);
    setListVariant(newList);
  }
  return (
    <div className='flex flex-row w-full add-component py-4 space-x-2'>
      <div className='flex flex-col w-2/3 px-2 space-y-6'>
        <div className='border px-4 py-4 text-neutral-600 space-y-4 shadow-lg'>
          <div className='space-y-2'>
            <label className="block text-sm font-bold">Title *</label>
            <input
              type="text"
              id="first_name"
              value={productData.title}
              onChange={e => handleChange(e, "title")}
              className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Type title"
              required
            />
            <label className="block mb-2 text-xs">0/225</label>
          </div>

          <div className='space-y-2'>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-bold">Description *</label>
              <div className='circle-alert cursor-pointer'>
                <CircleAlert size={20} />
                <Tooltip anchorSelect=".circle-alert" place="right" className='text-xs'>
                  Certain special text styles from other sources will be automatically removed to maintain consistency with your website style
                </Tooltip>
              </div>
            </div>

            <div className='text-right'>
              <TinyMCEEditor
                initialValue={content}
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
        </div>

        <div className='border px-4 py-4 text-neutral-600 space-y-4 shadow-lg'>
          <div className='flex flex-row items-center space-x-2'>
            <span className='font-bold'>Set as Home page</span>
            <div className='home-alert cursor-pointer'>
              <CircleAlert size={20} />
              <Tooltip anchorSelect=".home-alert" place="top">
                Set domain
              </Tooltip>
            </div>
          </div>
          <div className='text-sm'>
            <span>Select a domain to assign this page as the Home page for the specified domain.</span>
          </div>
          <button className='border p-2 rounded font-bold hover:bg-neutral-300'>Select domain</button> (dang phat trien....)
        </div>
        <div className='border px-4 text-neutral-600 space-y-4 shadow-lg py-8'>
          <div className='flex flex-row justify-between items-center'>
            <span className='font-bold'>Video (0/10) (dang phat trien ...)</span>
            <div className='flex flex-col'>
              <button className='text-blue-500 hover:underline'>Add Video</button>
            </div>
          </div>
        </div>
        <div className='border px-4 text-neutral-600 space-y-4 shadow-lg py-8'>
          <div className='flex flex-row justify-between items-center'>
            <span className='font-bold'>Media (0/50) (dang phat trien ...)</span>
            <div className='flex flex-col'>
              <button className='text-blue-500 hover:underline'>Add media</button>
            </div>
          </div>
        </div>
        <div className='border px-4 text-neutral-600 space-y-4 shadow-lg py-4'>
          <span className='font-bold'>Pricing</span>

          <div className='flex flex-row flex-wrap'>
            <div className='flex flex-col space-y-1 w-1/3 mr-6 mb-4'>
              <span className='font-bold text-neutral-500 text-sm'>Price</span>
              <div className="flex">
                <div className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-300 border-none rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100">
                  USD
                </div>
                <div className="relative w-full">
                  <input value={productData.price} onChange={e => handleChange(e, "price")} type="text" id="location-search" className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0" required />
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-1 w-1/3 mr-6'>
              <span className='font-bold text-neutral-500 text-sm'>Compare at price</span>
              <div className="flex">
                <div className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-300 border-none rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100">
                  USD
                </div>
                <div className="relative w-full">
                  <input value={productData.comparePrice} onChange={e => handleChange(e, "comparePrice")} type="text" id="location-search" className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0" required />
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-1 w-1/3 mr-6'>
              <span className='font-bold text-neutral-500 text-sm'>Cost per price</span>
              <div className="flex">
                <div className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-300 border-none rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100">
                  USD
                </div>
                <div className="relative w-full">
                  <input value={productData.costPerPrice} onChange={e => handleChange(e, "costPerPrice")} type="text" id="location-search" className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0" required />
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-1 w-1/3 mr-6'>
              <span className='font-bold text-neutral-500 text-sm'>Shipping fee</span>
              <div className="flex">
                <div className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-300 border-none rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100">
                  USD
                </div>
                <div className="relative w-full">
                  <input value={productData.shippingFee} onChange={e => handleChange(e, "shippingFee")} type="text" id="location-search" className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0" required />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='border px-4 py-4 text-neutral-600 space-y-4 shadow-lg'>
          <div className='border-b pb-4'>
            <div className='flex flex-row justify-between items-center'>
              <span className='font-bold'>Variant</span>
              <div className='flex flex-col'>
                <button onClick={e => handleAddVariant()} className='text-blue-500 hover:underline'>Add Variant</button>
              </div>
            </div>
            <span className='text-sm'>Add variants if this product comes in multiple versions, like different sizes or colors.</span>
          </div>
          <div>
            {listVariant.map((item: string, index) => (
              <div key={index} className='flex flex-row space-x-4 items-center justify-center space-y-2'>
                <div className='flex flex-col'>
                  <label htmlFor="" className='font-bold text-sm'>Option name</label>
                  <input
                    type="text"
                    className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    placeholder="Type name"
                    required
                  />
                </div>
                <div className='flex flex-col flex-grow'>
                  <label htmlFor="" className='font-bold text-sm'>Option value (press , to separate values. Example | size :xs,s,xl,...) </label>
                  <input
                    type="text"
                    className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    placeholder="Separate options with comma "
                    required
                  />
                </div>
                <button onClick={()=>handleDeleteVariant(index)} className='p-2 hover:bg-gray-200 rounded'>
                  <Trash />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className='flex flex-col w-1/3 h-20 space-y-6'>

        <div className='border px-4 py-4 text-neutral-600 space-y-4 shadow-lg'>
          <p className='font-bold'>Product attribute</p>

          <div className='space-y-2'>
            <label className="block text-xs font-bold">CR (%)</label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Type CR %"
              required
            />
          </div>

          <div className='space-y-2'>
            <label className="block text-xs font-bold">AOV</label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Type AOV"
              required
            />
          </div>

          <div className='space-y-2'>
            <label className="block text-xs font-bold">Payment gateway unit</label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Type unit"
              required
            />
          </div>

          <div className='space-y-2'>
            <label className="block text-xs font-bold">Country target</label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Type unit"
              required
            />
          </div>

        </div>

        <div className='border px-4 py-4 text-neutral-600 space-y-4 shadow-lg'>
          <p className='font-bold'>Product availability</p>
          <p className='text-sm'>Manage the availability of the product in these channels</p>

          <div className='flex items-center'>
            <input type="checkbox" className='rounded cursor-pointer' />
            <span className='ml-2 text-sm'>Available listing product</span>
          </div>
        </div>
      </div>
    </div>
  )
}
