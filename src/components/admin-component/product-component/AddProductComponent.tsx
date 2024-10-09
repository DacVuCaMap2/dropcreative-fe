'use client'
import React, { useState, useEffect } from 'react'
import './AddProductComponent.css'
import { CircleAlert, Crown, Trash, Type } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import TinyMCEEditor from '@/components/TinyMCE/TinyMCEEditor'
import Product, { getNewProduct } from '@/model/Product'
import Image from 'next/image'

type productVariant = {
  optionName: string,
  optionValue: string[]
}
type variantDetails = {
  name: string,
  price: number,
  comparePrice: number,
  quantity:number,
  image: string,
  sku: string,
  barcode: string
}


export default function AddProductComponent() {

  const [productData, setProductData] = useState<Product>(getNewProduct());
  const [listVariant, setListVariant] = useState<productVariant[]>([]);
  const [content, setContent] = useState('<p>Initial content</p>');
  const [listVariantDetails, setListVariantDetails] = useState<variantDetails[]>([]);
  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  const handleChange = (e: any, key: string) => {
    let value = e.target.value;
    /// cac gia tri price
    if (key === "price" || key === "comparePrice" || key === "costPerPrice" || key === "shippingFee") {
      value = value ? parseFloat(value) : 0;

    }
    const productTemp = { ...productData, [key]: value };
    console.log(productTemp);
    setProductData(productTemp);
  }


  const handleAddVariant = () => {
    if (listVariant.length < 3) {
      const newVariant: productVariant = { optionName: "", optionValue: [] };
      setListVariant([...listVariant, newVariant]);
    }
  };
  const handleDeleteVariant = (ind: number) => {
    const newList = listVariant.filter((item: productVariant, childIndex) => childIndex != ind);
    setListVariant(newList);
  }
  const handleChangeVariantName = (ind: number, e: any) => {
    const value = e.target.value;
    const tempListVariant = [...listVariant];
    const newListVariant = tempListVariant.map((item: productVariant, index) => {
      if (index === ind) {
        return { ...item, optionName: value };
      }
      return item;
    })
    setListVariant(newListVariant);
  }
  const handleChangeVariantValue = (ind: number, e: any) => {
    const value = e.target.value;
    const valuesArray: string[] = value.split(',');
    const tempListVariant = [...listVariant];
    const newListVariant = tempListVariant.map((item: productVariant, index) => {
      if (index === ind) {
        return { ...item, optionValue: valuesArray };
      }
      return item;
    })
    setListVariant(newListVariant);
  }
  const handleChangeVariantDetails = (ind: number, e: any, key: string) => {
    const value = e.target.value;
    const newDetails = [...listVariantDetails].map((item: variantDetails, index) => {
      if (index === ind) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setListVariantDetails(newDetails);
  }
  useEffect(() => {
    if (listVariant.length > 0) {
      const combineOptionValues = (options: productVariant[]): string[] => {
        const values: string[][] = options.map(option => option.optionValue);

        const result: string[][] = [];

        const combine = (prefix: string[], remainingArrays: string[][]): void => {
          if (remainingArrays.length === 0) {
            result.push(prefix);
            return;
          }

          const [firstArray, ...restArrays] = remainingArrays;

          firstArray.forEach(item => {
            combine([...prefix, item], restArrays);
          });
        };

        combine([], values);
        return result.map(items => items.join(', '));
      };

      const result = combineOptionValues(listVariant);

      // Kiểm tra độ dài trước khi tạo tempVariantDetails
      const limitedResult = result.slice(0, 50); // Giới hạn độ dài mảng là 50

      const tempVariantDetails = limitedResult.map((str: string) => {
        return {
          name: str,
          price: productData.price,
          comparePrice: productData.comparePrice,
          quantity:1,
          image: "",
          sku: "",
          barcode: ""
        }
      });

      setListVariantDetails(tempVariantDetails);
    }
  }, [listVariant]);

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
            <label className="block mb-2 text-xs">{productData.title.length}/225</label>
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
                  <input value={productData.price === 0 ? '' : productData.price} onChange={e => handleChange(e, "price")} type="number" id="location-search" className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0" required />
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
                  <input value={productData.comparePrice === 0 ? '' : productData.comparePrice} onChange={e => handleChange(e, "comparePrice")} type="number" id="location-search" className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0" required />
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
                  <input value={productData.costPerPrice === 0 ? "" : productData.costPerPrice} onChange={e => handleChange(e, "costPerPrice")} type="number" id="location-search" className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0" required />
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
                  <input value={productData.shippingFee === 0 ? "" : productData.shippingFee} onChange={e => handleChange(e, "shippingFee")} type="number" id="location-search" className="block border-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg focus:ring-0" required />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='border px-4 py-4 text-neutral-600 space-y-4 shadow-lg'>
          <div className='border-b pb-4'>
            <div className='flex flex-row justify-between items-center'>
              <span className='font-bold'>Variant ({listVariantDetails.length}/50)</span>
              <div className='flex flex-col'>
                <button onClick={e => handleAddVariant()} className='text-blue-500 hover:underline'>Add Variant</button>
              </div>
            </div>
            <span className='text-sm'>Add variants if this product comes in multiple versions, like different sizes or colors.</span>
          </div>
          <div>
            {listVariant.map((item: productVariant, index) => (
              <div key={index} className='flex flex-row space-x-4 items-center justify-center mb-4'>
                <div className='flex flex-col'>
                  <label htmlFor="" className='font-bold text-sm'>Option name</label>
                  <input
                    type="text"
                    value={item.optionName}
                    onChange={(e) => handleChangeVariantName(index, e)}
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
                    value={item.optionValue.join(',')}
                    onChange={(e) => handleChangeVariantValue(index, e)}
                    className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    placeholder="Separate options with comma "
                    required
                  />
                </div>
                <button onClick={() => handleDeleteVariant(index)} className='p-2 hover:bg-gray-200 rounded'>
                  <Trash />
                </button>
              </div>
            ))}
          </div>
          <div className=''>
            {listVariantDetails.length > 0
              &&
              <table className='table-auto max-w-full'>
                <thead className=' border-b'>
                  <tr  >
                    <th className='py-4'>Variant</th>
                    <th className='py-4'>Image</th>
                    <th className='py-4'>Price</th>
                    <th className='py-4'>Compare Price</th>
                    <th className='py-4'>Quantity</th>
                    <th className='py-4'>Sku</th>
                    <th className='py-4'>Barcode</th>
                  </tr>
                </thead>
                <tbody>
                  {listVariantDetails.map((variantItem: variantDetails, childInd) => (
                    <tr key={childInd} className='text-center'>
                      <td className='px-2 py-2 text-sm truncate'>{variantItem.name}</td>
                      <td className='px-2 py-2'><Image src={'/image/default/AIgen.jpg'} alt={'image'} width={200} height={50} className='rounded cursor-pointer'></Image></td>
                      <td className='px-2 py-2'><input onChange={e => handleChangeVariantDetails(childInd, e, "price")} value={variantItem.price} type="number" className='w-full rounded bg-gray-100 outline-none border-gray-200' /></td>
                      <td className='px-2 py-2'><input onChange={e => handleChangeVariantDetails(childInd, e, "comparePrice")} value={variantItem.comparePrice} type="number" className='w-full rounded bg-gray-100 outline-none border-gray-200' /></td>
                      <td className='px-2 py-2'><input onChange={e => handleChangeVariantDetails(childInd, e, "quantity")} value={variantItem.quantity} type="number" className='w-full rounded bg-gray-100 outline-none border-gray-200' /></td>
                      <td className='px-2 py-2'><input onChange={e => handleChangeVariantDetails(childInd, e, "sku")} value={variantItem.sku} type="text" className='w-full rounded bg-gray-100 outline-none border-gray-200' /></td>
                      <td className='px-2 py-2'><input onChange={e => handleChangeVariantDetails(childInd, e, "barcode")} value={variantItem.barcode} type="text" className='w-full rounded bg-gray-100 outline-none border-gray-200' /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
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
              className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Type unit"
              required
            />
          </div>

          {/* <div className='space-y-2'>
            <label className="block text-xs font-bold">Country target</label>
            <input
              type="text"
              className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Type unit"
              required
            />
          </div> */}
          <div className='space-y-2'>
            <label className="block text-xs font-bold">Country target</label>
            <select
              className="bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              required
            >
              <option value="" disabled>Select a region</option>
              <option value="US">US</option>
              <option value="EU">EU</option>
              <option value="ASIAN">ASIAN</option>
              <option value="AFRICA">AFRICA</option>
            </select>
          </div>

        </div>

        <div className='border px-4 py-4 text-neutral-600 space-y-4 shadow-lg'>
          <p className='font-bold'>Product availability</p>
          <p className='text-sm'>Manage the availability of the product in these channels</p>

          <div className='flex items-center'>
            <input type="checkbox" className='rounded cursor-pointer' />
            <span className='ml-2 text-sm'>Available listing product</span>
          </div>
          <div className='flex items-center'>
            <input type="checkbox" className='rounded cursor-pointer' />
            <span className='ml-2 text-sm mr-1'>Only Premium </span>
            <Crown size={16} color='black' />
          </div>
        </div>
      </div>
    </div>
  )
}
