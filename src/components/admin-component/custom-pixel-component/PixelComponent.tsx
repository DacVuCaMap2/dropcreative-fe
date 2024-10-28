"use client"
import DeleteApi from '@/api/DeleteApi';
import GetApi from '@/api/GetApi';
import PostApi from '@/api/PostParttern';
import ShowLoadTable from '@/components/general-component/ShowLoadTable';
import { generalCategoriesSelect } from '@/data/generalData';
import CategoryPixel, { FacebookPixel, FacebookPixelAccounts } from '@/model/CategoryPixel';
import { message } from 'antd';
import { AlignJustify, Plus, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
type Props = {
    isAdmin:boolean
}
export default function PixelComponent(props:Props) {
    const listCategories = generalCategoriesSelect;
    const [isLoading, setLoading] = useState(0);
    const [categoryPixel, setCategoryPixel] = useState<CategoryPixel | null>(null);
    const [selectCat, setSelectcat] = useState(1);
    const [showAccessToken, setShowAccessToken] = useState(-1);
    const [currentFacebookPixel, setCurrentFacebookPixel] = useState<FacebookPixel>({ id: 0, name: "", value: "", status: 1, accessToken: "", businessId: "", facebookPixelAccounts: [] });
    const [refreshTable, setRefresthTable] = useState(1);
    const [currentSearch, setCurrentSearch] = useState("");
    const [oldCategoryPixel, setOldCategoryPixel] = useState<CategoryPixel | null>(null);
    const countRowSpan = (index: number): number => {
        if (categoryPixel && categoryPixel.facebookPixels[index] && categoryPixel.facebookPixels[index].facebookPixelAccounts.length > 0) {
            return categoryPixel.facebookPixels[index].facebookPixelAccounts.length;
        }
        return 1;
    }
    const handleSubmitAdd = async (e: any) => {
        e.preventDefault();
        //valid
        if (categoryPixel && categoryPixel.facebookPixels.find(item => item.name === currentFacebookPixel.name)) {
            message.error("name already exists")
            return;
        }

        const url = process.env.NEXT_PUBLIC_API_URL + "/api/facebook/add";
        const postData = { ...currentFacebookPixel, id: selectCat };
        const response = await PostApi(url, postData);
        if (response.status === 200) {
            message.success("add success");
            setCurrentFacebookPixel({ id: 0, name: "", value: "", status: 1, accessToken: "", businessId: "", facebookPixelAccounts: [] });
        }
        setRefresthTable(prev => prev + 1);
    }
    const handleChangeCurrentPixel = (e: any, key: string) => {
        const value = e.target.value;
        setCurrentFacebookPixel({ ...currentFacebookPixel, [key]: value });
    }

    const formatDateUS = (dateString: any): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
    const handleSearch = (e: any) => {
        const value = e.target.value;
        const tempCategory = { ...oldCategoryPixel };
        if (value === "" && oldCategoryPixel) {

            setCategoryPixel({ ...oldCategoryPixel });
            return;
        }
        if (tempCategory?.facebookPixels && oldCategoryPixel) {
            let tempFacebookPixels: FacebookPixel[] = tempCategory.facebookPixels.map((item: FacebookPixel, index) => {
                const tempAccount = item.facebookPixelAccounts.filter(childItem => childItem.accountResponse.email.includes(value));
                return { ...item, facebookPixelAccounts: tempAccount };
            })
            tempFacebookPixels = tempFacebookPixels.filter(item => item.facebookPixelAccounts.length > 0);
            setCategoryPixel({ ...oldCategoryPixel, facebookPixels: tempFacebookPixels });
        }
    }
    const handleDelSharePixel = async (id: any) => {
        const confirmation = window.confirm("Do you want to delete this account ads id?");
        if (confirmation) {
            const url = process.env.NEXT_PUBLIC_API_URL + "/api/facebook/" + id;
            const response = await DeleteApi(url);
            setRefresthTable(prev => prev + 1);
        }

    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(1);
            const url = process.env.NEXT_PUBLIC_API_URL + "/api/facebook/getByCategory/" + selectCat;
            const response = await GetApi(url);
            console.log(response);
            if (response?.name && response?.id) {
                setCurrentSearch("");
                setCategoryPixel(response);
                setOldCategoryPixel(response);
            }
            else if (response?.error?.message === "Authentication Error Or Login session expired|revoked") {
                window.location.href = "/login";
            }
            else {
                message.error("cannot connect to server")
            }
            setLoading(0);
        }
        fetchData();
    }, [selectCat, refreshTable])

    return (
        <div className='px-10 py-4 flex flex-col text-gray-700'>
            <div className='text-xl font-bold mb-4'>
                Pixel Custom
            </div>
            <div className='flex flex-col justify-center items-center space-y-4'>
                <div className='flex flex-row space-x-4 text-sm'>
                    {listCategories.map((cat: any, index) => (
                        <button key={index} onClick={() => setSelectcat(cat.value)} className={` hover:border-gray-700 border-b-2 ${selectCat === cat.value ? "border-gray-700" : "border-white"}`}>{cat.title}</button>
                    ))}
                </div>

                <div className='flex flex-col w-full border-gray-400'>

                    <div className='flex flex-col py-4 space-y-4'>
                        <p className='font-bold text-lg ' >Facebook Pixel</p>
                        <form action="" onSubmit={handleSubmitAdd}>

                            <div className='flex flex-col border p-4 text-xs space-y-4 items-end'>
                                <div className='flex flex-row space-x-4 w-full'>
                                    <div>
                                        <label htmlFor="" className='font-bold'>Name</label>
                                        <input required type="text" value={currentFacebookPixel.name} onChange={e => handleChangeCurrentPixel(e, "name")} className='bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2'/>
                                    </div>
                                    <div className='flex-grow'>
                                        <label htmlFor="" className='font-bold'>Access token</label>
                                        <input required type="text" value={currentFacebookPixel.accessToken} onChange={e => handleChangeCurrentPixel(e, "accessToken")} className='bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4' />
                                    </div>
                                    <div className='flex-grow'>
                                        <label htmlFor="" className='font-bold'>Business ID</label>
                                        <input required type="text" value={currentFacebookPixel.businessId} onChange={e => handleChangeCurrentPixel(e, "businessId")} className='bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4' />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="" className='font-bold'>Pixel facebook</label>
                                    <input required type="text" value={currentFacebookPixel.value} onChange={e => handleChangeCurrentPixel(e, "value")} className='bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4'/>
                                </div>
                                <button className='w-1/6 flex justify-center items-center space-x-2 py-2 border bg-gray-100 hover:bg-gray-200'>
                                    <Plus />
                                    <span>Add facebook pixel</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='relative w-full'>
                        <input
                            value={currentSearch}
                            onChange={e => handleSearch(e)}
                            className='w-full h-full py-2 rounded bg-neutral-100 border-none focus:outline-neutral-300 focus:outline-none focus:ring-0 pl-8 transition duration-200 focus:bg-white focus:shadow-lg'
                            type="text"
                            placeholder='Search product'
                        />
                        <Search className='absolute top-0 pl-2 text-neutral-400 h-full' />
                    </div>
                    <div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className=" sticky top-0 text-xs text-gray-700 uppercase bg-gray-100 ">
                                <tr>
                                    <th scope="col" className="px-2 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Facebook pixel
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Business ID
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        AccessToken
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        User
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Id ADS
                                    </th>
                                    <th scope="col" className="px-2 py-3 text-center">
                                        Date
                                    </th>
                                    <th scope="col" className="px-2 py-3 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {(!categoryPixel || isLoading === 1) ?
                                <ShowLoadTable />
                                :
                                <tbody>
                                    {categoryPixel?.facebookPixels.map((item: FacebookPixel, index) => (
                                        <>
                                            <tr className='bg-white border-b w-full'>
                                                <td rowSpan={countRowSpan(index)}>
                                                    <div className='px-2 flex  items-center'>
                                                        {item.name}
                                                    </div>
                                                </td>
                                                <td rowSpan={countRowSpan(index)}>
                                                    <div className='px-2 flex  items-center'>
                                                        {item.value}
                                                    </div>
                                                </td>
                                                <td rowSpan={countRowSpan(index)}>
                                                    <div className='px-2 flex  items-center'>
                                                        {item.businessId}
                                                    </div>
                                                </td>
                                                <td rowSpan={countRowSpan(index)} className=''>
                                                    <div className='px-2 py-2 overflow-auto'>
                                                        {showAccessToken === index ?
                                                            <div>
                                                                <textarea defaultValue={item.accessToken} name="" id="" className="w-full p-2 border rounded" readOnly></textarea>
                                                                <button onClick={() => setShowAccessToken(-1)} className='flex flex-row bg-gray-200 hover:bg-gray-300 p-2 items-center justify-center text-xs space-x-1'><span>Hide</span></button>
                                                            </div>
                                                            :
                                                            <button onClick={() => setShowAccessToken(index)} className='flex flex-row bg-gray-200 hover:bg-gray-300 p-2 items-center justify-center text-xs space-x-1'><AlignJustify /> <span>Show</span></button>
                                                        }

                                                    </div>
                                                </td>
                                                {item.facebookPixelAccounts.length > 0 ?
                                                    <>
                                                        <td >
                                                            <div className='h-10 w-full px-2 flex  items-center'>
                                                                {item.facebookPixelAccounts[0].accountResponse.email}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='h-10 w-full px-2 flex  items-center'>
                                                                {item.facebookPixelAccounts[0].product.title}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='h-10 w-full px-2 flex justify-center items-center'>
                                                                {item.facebookPixelAccounts[0].value}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='h-10 w-full px-2 flex  items-center'>
                                                                {formatDateUS(item.facebookPixelAccounts[0].createdAt)}
                                                            </div>
                                                        </td>
                                                        <td className='py-2'>
                                                            <div className='h-10  w-full px-2 flex justify-center items-center'>
                                                                <button onClick={() => handleDelSharePixel(item.facebookPixelAccounts[0].id)} className='flex justify-center items-center space-x-2 p-2 border bg-gray-100 hover:bg-gray-200'>Delete</button>
                                                            </div>
                                                        </td>
                                                    </>

                                                    :
                                                    <>
                                                        <td >
                                                            <div className='h-10 w-full px-2 flex  items-center'>
                                                                <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='h-10 w-full px-2 flex  items-center'>
                                                                <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='h-10 w-full px-2 flex  items-center'>
                                                                <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='h-10 w-full px-2 flex  items-center'>
                                                                <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='h-10 w-full px-2 flex  items-center'>
                                                                <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                                            </div>
                                                        </td>
                                                    </>
                                                }
                                            </tr>
                                            {
                                                item.facebookPixelAccounts.map((childItem: FacebookPixelAccounts, childIndex) => {
                                                    if (childIndex > 0) {
                                                        return (
                                                            <tr key={childIndex} className='bg-white border-b w-full'>
                                                                <td key={childIndex}>
                                                                    <div className='h-10 w-full px-2 flex  items-center'>
                                                                        {childItem.accountResponse.email}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='h-10 w-full px-2 flex  items-center'>
                                                                        {childItem.product.title}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='h-10 w-full px-2 flex justify-center items-center'>
                                                                        {childItem.value}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='h-10 w-full px-2 flex  items-center'>
                                                                        {formatDateUS(childItem.createdAt)}
                                                                    </div>
                                                                </td>
                                                                <td className='py-2'>
                                                                    <div className='h-10 w-full px-2 flex justify-center items-center'>
                                                                        <button onClick={()=>handleDelSharePixel(childItem.id)} className='flex justify-center items-center space-x-2 p-2 border bg-gray-100 hover:bg-gray-200'>Delete</button>
                                                                    </div>
                                                                </td>
                                                            </tr>)
                                                    }
                                                    return;
                                                })
                                            }
                                        </>
                                    ))}


                                </tbody>
                            }

                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}
