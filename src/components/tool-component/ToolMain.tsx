"use client"
import PostApi from '@/api/PostApi';
import { aiColor, aiFraming, aiLightning, aiMode, aiSize, aiStyle } from '@/data/tool-data/toolListData';
import { ArrowDownToLine, ChevronRight, Cpu, Grip, PackageOpen, RectangleVertical, Star } from 'lucide-react';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import './ToolMain.css';
import { Tooltip } from 'react-tooltip';
import ToolSelectComponent from './SelectComponent/ToolSelectComponent';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
export default function ToolMain() {
    const listStyle: any[] = aiStyle;
    const listColor: any[] = aiColor;
    const listLightning: any[] = aiLightning;
    const listFraming: any[] = aiFraming;
    const listSize: any[] = aiSize;
    const listMode: any[] = aiMode;
    // Khai báo state cho từng select
    const [selectedMode, setSelectedMode] = useState("Flux Fast");
    const [selectedSize, setSelectedSize] = useState(listSize[0].value);
    const [selectedStyle, setSelectedStyle] = useState(listStyle[0].value);
    const [selectedColor, setSelectedColor] = useState(listColor[0].value);
    const [selectedFraming, setSelectedFraming] = useState(listFraming[0].value);
    const [selectedLightning, setSelectedLightning] = useState(listLightning[0].value);
    const [prompt, setPrompt] = useState("");
    const [listImgBase64, setListImgBase64] = useState<string[]>([]);
    const [loadingImg, setLoading] = useState(0);
    const [openSelect, setOpenSelect] = useState(false);
    const [curSelect, setCurSelect] = useState<any>(null);
    const [curKey, setCurKey] = useState("");
    const handleCreate = async () => {
        const newArr: string[] = [];
        postAndGetImg(newArr);
    }
    const handleLoadMore = async () => {
        const newArr: string[] = [...listImgBase64];
        postAndGetImg(newArr);
    }
    const postAndGetImg = async (newArr: string[]) => {
        if (prompt.trim().length === 0 || loadingImg != 0) {
            return;
        }
        setLoading(1);
        const url = "https://api.freepik.com/v1/ai/text-to-image";
        const styling = {
            style: selectedStyle === "All" ? getRandomElement(listStyle) : selectedStyle,
            color: selectedColor === "All" ? getRandomElement(listColor) : selectedColor,
            lightning: selectedLightning === "All" ? getRandomElement(listLightning) : selectedLightning,
            framing: selectedFraming === "All" ? getRandomElement(listFraming) : selectedFraming
        };
        const data = {
            prompt: prompt,
            num_inference_steps: 1000,
            guidance_scale: 0.1,
            num_images: 4,
            image: { size: selectedSize.split(' ').slice(1).join(' ') },
            styling: styling
        };
        console.log(data)
        const config = {
        };
        const response = await PostApi(url, data, config);

        // setImgBase64(response);
        //add to list
        if (response && Array.isArray(response)) {
            response.forEach((item: any) => {
                newArr.push(item.base64);
            });
            setListImgBase64(newArr);

        }
        setLoading(0);
    }
    const handleSetValue = (key: string, val: string) => {
        switch (key) {
            case "Mode":
                setSelectedMode(val);
                break;
            case "Size":
                setSelectedSize(val);
                break;
            case "Style":
                setSelectedStyle(val);
                break;
            case "Color":
                setSelectedColor(val);
                break;
            case "Camera":
                setSelectedFraming(val);
                break;
            case "Lighting":
                setSelectedLightning(val);
                break;
            default:
                break;
        }
    }
    const handleOpenSelect = (key: string) => {

        setCurKey(key);
        console.log(key);
        switch (key) {
            case "Mode":
                setCurSelect(listMode);
                break;
            case "Size":
                setCurSelect(listSize);
                break;
            case "Style":
                setCurSelect(listStyle);
                break;
            case "Color":
                setCurSelect(listColor);
                break;
            case "Camera":
                setCurSelect(listFraming);
                break;
            case "Lighting":
                setCurSelect(listLightning);
                break;
            default:
                break;
        }
        setOpenSelect(!openSelect);
    }
    function getRandomElement(arr: any[]) {
        let num = Math.floor(Math.random() * arr.length);
        num = num===0 ? 1 : num;
        return arr[num].value;
    }
    return (
        <div className='flex flex-row py-4 px-2 space-x-4 tool-main'>
            <div className='flex flex-col max-h-[600px] text-sm pb-4 px-4 background-gray min-w-64 space-y-2 rounded-lg relative'>
                <CSSTransition
                    in={openSelect}
                    timeout={100}
                    classNames="slide"
                    unmountOnExit
                >
                    <div className={`absolute z-30 ${(curKey === "Mode" || curKey === "Size") ? `top-1/3 h-1/2` : 'top-0 h-full'} background-gray rounded-lg`} style={{ right: '-81%', width: '80%' }}>
                        <ToolSelectComponent
                            setOpen={setOpenSelect}
                            listData={curSelect}
                            handleSetValue={handleSetValue}
                            curKey={curKey}
                        />
                    </div>
                </CSSTransition>
                <div className='py-2 font-bold' style={{ marginTop: "8px" }}>Prompt</div>
                <div>
                    <textarea
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='Product description'
                        className='w-full min-h-32 resize-none bg-neutral-900 rounded outline-none focus:bg-neutral-900 focus:ring-0'>
                    </textarea>
                </div>


                {/* Giao diện chưa chỉnh sửa */}
                <div className='flex flex-col text-black py-2 text-xs space-y-1'>
                    <button onClick={() => handleOpenSelect("Mode")} className='h-10 flex flex-row items-center text-white px-2 bg-neutral-900 hover:bg-neutral-800 space-x-2'>
                        <Cpu size={16} />
                        <span className=''>Mode</span>

                        <div className='flex-grow text-right text-stone-400'>
                            {selectedMode}
                        </div>
                        <ChevronRight size={16} />
                    </button>
                    <button onClick={() => handleOpenSelect("Size")} className='h-10 flex flex-row items-center text-white px-2 bg-neutral-900 hover:bg-neutral-800 space-x-2'>
                        <RectangleVertical size={16} />
                        <span className=''>Size</span>

                        <div className='flex-grow text-right text-stone-400'>
                            {selectedSize}
                        </div>
                        <ChevronRight size={16} />
                    </button>
                    <button onClick={() => handleOpenSelect("Style")} className='h-10 flex flex-row items-center text-white px-2 bg-neutral-900 hover:bg-neutral-800 space-x-2'>
                        <Star size={16} />
                        <span className=''>Style</span>
                        <div className='flex-grow text-right text-stone-400'>
                            {selectedStyle}
                        </div>
                        <ChevronRight size={16} />
                    </button>

                    <button onClick={() => handleOpenSelect("Color")} className='h-10 flex flex-row items-center text-white px-2 bg-neutral-900 hover:bg-neutral-800 space-x-2'>
                        <Star size={16} />
                        <span className=''>Color</span>
                        <div className='flex-grow text-right text-stone-400'>
                            {selectedColor}
                        </div>
                        <ChevronRight size={16} />
                    </button>
                    <button onClick={() => handleOpenSelect("Camera")} className='h-10 flex flex-row items-center text-white px-2 bg-neutral-900 hover:bg-neutral-800 space-x-2'>
                        <Star size={16} />
                        <span className=''>Camera</span>
                        <div className='flex-grow text-right text-stone-400'>
                            {selectedFraming}
                        </div>
                        <ChevronRight size={16} />
                    </button>
                    <button onClick={() => handleOpenSelect("Lighting")} className='h-10 flex flex-row items-center text-white px-2 bg-neutral-900 hover:bg-neutral-800 space-x-2'>
                        <Star size={16} />
                        <span className=''>Lighting</span>
                        <div className='flex-grow text-right text-stone-400'>
                            {selectedLightning}
                        </div>
                        <ChevronRight size={16} />
                    </button>
                </div>
                <div>
                    <button onClick={() => handleCreate()} className='w-full bg-neutral-800 py-2'>Create</button>
                </div>
            </div>

            {/* <div className='w-80 h-10 text-white'>

            </div> */}
            <div className="aiImg flex-grow flex flex-col min-h-[500px]">

                <div className='flex flex-row justify-center border-b border-gray-600 font-bold text-sm'>
                    <button className='flex flex-row items-center space-x-1 border-b border-white h-full py-2'><Grip /> <span>Creations</span></button>
                </div>
                <div className='flex-grow py-2 flex flex-row flex-wrap justify-center'>
                    {listImgBase64.map((item: string, index) => (
                        <div key={index} className='flex-shrink-0 ml-2 mt-2 relative group rounded-lg'>
                            <Image
                                src={`data:image/png;base64,${item}`}
                                alt="Generated"
                                width={300}
                                height={0}
                                className='rounded-lg'
                            />
                            <a
                                href={`data:image/png;base64,${item}`} // Liên kết tới hình ảnh base64
                                download={`image-${index}.png`} // Tên tệp tải xuống
                                className='absolute downImg flex items-center justify-center right-2 top-2 bg-white w-8 h-8 text-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                            >
                                <ArrowDownToLine />
                                <Tooltip anchorSelect=".downImg" place="left">
                                    Download image
                                </Tooltip>
                            </a>
                        </div>
                    ))}


                    {loadingImg === 1 &&
                        <div className='h-20 flex items-center justify-center w-full'>
                            <ClipLoader color='#ffffff' />
                        </div>
                    }
                    {(listImgBase64.length === 0 && loadingImg === 0) ?
                        <div className='flex space-y-4 flex-col justify-center items-center font-bold text-sm text-gray-600'>
                            <span>Enter the command prompt and create your AI product</span>
                            <PackageOpen size={50} />

                        </div>
                        : ''
                    }
                </div>

                <div className='flex justify-center'>
                    {listImgBase64.length > 0 &&
                        <button onClick={() => handleLoadMore()} className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'>
                            Load more
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}
