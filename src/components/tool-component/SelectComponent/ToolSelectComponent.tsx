import React from 'react'
import './ToolSelectComponent.css'
import Image from 'next/image';
import { ArrowLeftToLine, Shuffle } from 'lucide-react';
type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    listData: any[],
    handleSetValue: (key: string, val: string) => void,
    curKey: string
}
export default function ToolSelectComponent(props: Props) {
    const listData = props.listData;
    const isCol = props.curKey === "Mode" || props.curKey === "Size";
    function formatAspectRatio(inputString: string) {
        // Tách chuỗi thành các phần
        const parts = inputString.split(' ');

        // Lặp qua từng phần để tìm tỷ lệ
        for (const part of parts) {
            if (part.includes(':')) {
                // Viết hoa chữ cái đầu tiên và giữ nguyên các chữ cái khác
                const capitalizedPart = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                return `${capitalizedPart} ${parts[1]?.charAt(0).toUpperCase() + parts[1]?.slice(1).toLowerCase() || ''}`.trim();
            }
        }

        return null; // Nếu không tìm thấy tỷ lệ
    }
    function capitalizeFirstLetter(string: string) {
        if (!string) return string; // Kiểm tra chuỗi rỗng
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const handleSelect = (item: any) => {
        props.handleSetValue(props.curKey, item.value);
        props.setOpen(false);
    }
    return (
        <div className={`tool-select w-full h-full overflow-y-auto p-2 `}>
            {!isCol &&
                <div className='flex flex-row items-center py-2'>
                    <span className='flex-grow font-bold text-sm'>{props.curKey}</span>

                    <button onClick={()=>props.setOpen(false)} className='p-2 hover:bg-neutral-800 rounded'> <ArrowLeftToLine size={16} /></button>
                </div>
            }
            {isCol ?
                <div>
                    {listData.map((item: any, index) => (
                        <div onClick={() => handleSelect(item)} key={index} className='flex flex-row space-x-2 hover:cursor-pointer hover:bg-neutral-800 rounded p-2 text-xs'>
                            <div>{item.icon && <item.icon size={16} />}</div>
                            <div>
                                <span>{props.curKey === "Size" ? formatAspectRatio(item.value) : item.value}</span>
                                {item.des && <p className='text-neutral-500'>{item.des}</p>}
                            </div>

                        </div>
                    ))}
                </div>
                :
                <div className='grid grid-cols-3 gap-y-4 justify-items-center'>
                    {listData.map((item: any, index) => (
                        <div onClick={() => handleSelect(item)} key={index} className='flex flex-col hover:cursor-pointer rounded text-xs max-w-14 space-y-1'>
                            <div className='h-14 w-14 bg-neutral-800 rounded overflow-hidden'>
                                {(item.img && item.value !== "All") ?
                                    <div className="transition-transform duration-300 hover:scale-110">
                                        <Image src={item.img} alt='Image' width={100} height={100} className="object-cover" />
                                    </div>
                                    :
                                    <div className="w-full h-full flex justify-center items-center">
                                        <Shuffle />
                                    </div>
                                }
                            </div>
                            <p className='text-center'>{capitalizeFirstLetter(item.value)}</p>
                        </div>
                    ))}
                </div>
            }

        </div>
    )
}
