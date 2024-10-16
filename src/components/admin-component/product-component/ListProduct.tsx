"use client"
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ProductCategories from './ProductCategories'
import { CardProductItem } from './CardProductItem'
import Link from 'next/link'
import './ListProduct.css'
import { generalCategoriesSelect } from '@/data/generalData'
import { usePathname, useSearchParams } from 'next/navigation'
import GetApi from '@/api/GetApi'
import { ClipLoader } from 'react-spinners'
type Props = {
    accountId: any
}
export default function ListProduct(props: Props) {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [listData, setListData] = useState([]);
    let cat = searchParams.get("category");
    cat = cat ? cat : "";
    console.log(cat);
    let pathUrl = "";
    const listCategories = generalCategoriesSelect;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            pathUrl+= cat ? cat :"";
            const url = process.env.NEXT_PUBLIC_API_URL + `/api/product?accountId=${props.accountId}&size=1000&page=1${pathUrl}` ;
            const response = await GetApi(url);
            if (response && response.data && Array.isArray(response.data)) {
                setListData(response.data);
                setLoading(false);
            }
        }
        fetchData();
    }, [cat])
    return (
        <div className='flex flex-col w-full space-y-2'>
            <div className='space-x-4 text-sm py-2 mb-4'>
                <button className='border-b-2 border-blue-500'>All</button>
                <button>Available product</button>
                <button>Unavailable products</button>
            </div>

            <div className='relative'>
                <input
                    className='w-full h-full py-2 rounded bg-neutral-100 border-none focus:outline-neutral-300 focus:outline-none focus:ring-0 pl-8 transition duration-200 focus:bg-white focus:shadow-lg'
                    type="text"
                    placeholder='Search product'
                />
                <Search className='absolute top-0 pl-2 text-neutral-400 h-full' />
            </div>

            <div className='text-neutral-500 text-sm w-full mt-4 mb-64 border-b border-neutral-400 pb-2 pt-4 px-2'>
                <div className='w-full flex flex-col py-4 text-xs'>
                    <div className=' flex flex-row flex-wrap justify-center items-center space-x-4'>
                        <Link href={pathName} className={`py-2 px-4  hover:bg-black hover:text-white ${cat === "" ? "border-b-2 border-black" : ""}`}>
                            <span >All</span>
                        </Link>
                        {listCategories.map((item: any, index) => (
                            <Link key={index} href={pathName + "?category=" + item.value} className={`p-2  my-2 hover:bg-black hover:text-white ${cat === item.value.toString() ? "border-b-2 border-black" : ""}`}>
                                <span >{item.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {loading ?
                <div className='w-full h-96 flex felx-row justify-center items-center '>
                    <ClipLoader />
                </div>
                :
                <div className='w-full pt-8 grid grid-cols-4 gap-6 px-4 min-h-[300px] '>

                    {listData.map((item: any, index) => (
                        <div key={index}>
                            <CardProductItem product={item} />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
