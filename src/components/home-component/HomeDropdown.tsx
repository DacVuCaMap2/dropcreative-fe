"use client"
import { homeDrop1, homeDropfirst, homeDropSecond, homeDropThird } from '@/data/home-data/homeListData'
import { Check, ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
type DropItem = {
    drop1: any,
    drop2: any[],
    drop3: {Free:boolean,Premium:boolean}
}
export default function HomeDropdown() {
    const [isOpen, setOpen] = useState(false);
    const listDropDown = homeDrop1;
    const dropFirst = homeDropfirst;
    const dropSecond = homeDropSecond;
    const dropThird = homeDropThird;
    const [selectItem, setSelectItem] = useState<DropItem>({
        drop1: dropFirst[0],
        drop2: [],
        drop3: {Free:false,Premium:false},
    })
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        // Kiểm tra xem nhấp chuột có nằm ngoài dropdown hay không
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        // Thêm sự kiện lắng nghe
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Xóa sự kiện lắng nghe khi component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleSelect = (key: string, item: any,flag?:boolean) => {
        if (key === "drop1") {
            const temp = { ...selectItem, [key]: item };
            setSelectItem(temp)
        }
        if (key === "drop2") {
            let temp: any[] = [...selectItem.drop2];
            temp = temp.find((drop2: any) => drop2.name === item.name) ? temp.filter((drop2: any) => drop2.name != item.name) : [...temp, item];
            const tempFinal = { ...selectItem, [key]: temp };
            console.log(tempFinal);
            setSelectItem(tempFinal);
            // console.log(tempFinal);
        }
        if (key==="drop3") {
            const temp = {...selectItem,[key]:{...selectItem.drop3,[item]:flag}};
            console.log(temp);
            setSelectItem(temp);
        }
    }
    return (
        <div className='h-full relative border-r' ref={dropdownRef}>
            <button onClick={() => setOpen(!isOpen)} className='hover:bg-gray-200 flex items-center rounded-l-sm flex-row px-4 py-4 space-x-2 bg-white h-full w-48'>
                <div className='w-6'>
                    {selectItem.drop1.icon && <selectItem.drop1.icon size={16} />}
                </div>
                <div className='text-left flex-grow truncate' >{selectItem.drop1.name} {selectItem.drop2.length > 0 && " ," + selectItem.drop2[0].name}</div>
                <ChevronDown size={16} />
            </button>


            {isOpen &&
                <div className='absolute z-30 text-sm bg-white w-full shadow-2xl top-16 rounded'>
                    <div className='border-b border-gray-300'>
                        {dropFirst &&
                            dropFirst.map((item, index) => (
                                <button onClick={() => handleSelect("drop1", item)} key={index} className={`${selectItem.drop1.name === item.name && 'text-blue-500'} flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer px-4 py-2 space-x-2 w-full text-left`}>
                                    {item.icon && <item.icon size={16} />}
                                    <span className='flex-grow '>{item.name}</span>
                                    {selectItem.drop1.name === item.name && <Check size={16} />}
                                </button>
                            ))
                        }
                    </div>
                    <div className='border-b'>
                        {dropSecond &&
                            dropSecond.map((item, index: number) => (
                                <button onClick={() => handleSelect("drop2", item)} key={index} className={`${selectItem.drop2.find((drop2: any) => drop2.name === item.name) && 'text-blue-500'} flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer px-4 py-2 space-x-2 w-full text-left`}>
                                    {item.icon && <item.icon size={16} />}
                                    <span className='w-28 h-6 truncate'>{item.name}</span>
                                    {selectItem.drop2.find((drop2: any) => drop2.name === item.name) && <Check size={16} />}
                                </button>
                            ))
                        }
                    </div>
                    <div className='border-b'>
                        {dropThird &&
                            dropThird.map((item, index: number) => (
                                <button  key={index} className={`flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer px-4 py-2 space-x-2 w-full text-left`}>
                                    <input onChange={e=>handleSelect("drop3",item,e.target.checked)} checked={item === "Free" ? selectItem.drop3.Free : selectItem.drop3.Premium } type="checkbox" id={`checkbox-${index}`} className="mr-2" />
                                    <span className='flex-grow'>{item}</span>
                                </button>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}
