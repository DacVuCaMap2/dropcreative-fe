"use client"
import PostApi from '@/api/PostApi';
import { aiColor, aiFraming, aiLightning, aiStyle } from '@/data/tool-data/toolListData';
import { ArrowDownToLine, Grip, PackageOpen } from 'lucide-react';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import './ToolMain.css';
import { Tooltip } from 'react-tooltip';
export default function ToolMain() {
    const listStyle: string[] = aiStyle;
    const listColor: string[] = aiColor;
    const listLightning: string[] = aiLightning;
    const listFraming: string[] = aiFraming;

    // Khai báo state cho từng select
    const [selectedMode, setSelectedMode] = useState("Flux Fast");
    const [selectedSize, setSelectedSize] = useState("1:1 Square");
    const [selectedStyle, setSelectedStyle] = useState(listStyle[0]); // Mặc định là phần tử đầu tiên
    const [selectedColor, setSelectedColor] = useState(listColor[0]); // Mặc định là phần tử đầu tiên
    const [selectedFraming, setSelectedFraming] = useState(listFraming[0]); // Mặc định là phần tử đầu tiên
    const [selectedLightning, setSelectedLightning] = useState(listLightning[0]); // Mặc định là phần tử đầu tiên
    const [prompt, setPrompt] = useState("");
    const [listImgBase64, setListImgBase64] = useState<string[]>([]);
    const [loadingImg, setLoading] = useState(0);
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
        const updatedStyling = cleanStyling(styling);
        const data = {
            prompt: prompt,
            num_inference_steps: 8,
            guidance_scale: 1,
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
    const cleanStyling = (obj: any) => {
        for (const key in obj) {
            if (obj[key] === "All") {
                delete obj[key];
            }
        }
        return obj;
    };
    function getRandomElement(arr: string[]) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    return (
        <div className='flex flex-row py-4 px-2 space-x-2 tool-main'>
            <div className='flex flex-col text-sm py-2 px-4 bg-neutral-950 w-80 space-y-2 '>
                <div className='py-2 font-bold'>Prompt</div>
                <div>
                    <textarea
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='Describe your image'
                        className='w-full min-h-32 resize-none bg-neutral-900 rounded outline-none focus:bg-neutral-900 focus:ring-0'>
                    </textarea>
                </div>
                {/* Giao diện chưa chỉnh sửa */}
                <div className='flex flex-col text-black py-2 space-y-2'>
                    <div className='flex flex-row'>
                        <label htmlFor="" className='text-white w-20'>Mode</label>
                        <select
                            value={selectedMode}
                            onChange={(e) => setSelectedMode(e.target.value)}>
                            <option value="Flux Fast">Flux Fast</option>
                        </select>
                    </div>
                    <div className='flex flex-row'>
                        <label htmlFor="" className='text-white w-20'>Size</label>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}>
                            <option value="1:1 Square">1:1 Square</option>
                            <option value="1:2 Vertical">1:2 Vertical</option>
                            <option value="2:1 Horizontal">2:1 Horizontal</option>
                            <option value="2:3 Portrait">2:3 Portrait</option>
                            <option value="3:4 Traditional">3:4 Traditional</option>
                            <option value="4:5 Social Post">4:5 Social Post</option>
                            <option value="9:16 Social Story">9:16 Social Story</option>
                            <option value="3:2 Standard">3:2 Standard</option>
                            <option value="4:3 Classic">4:3 Classic</option>
                            <option value="16:9 Wide">16:9 Wide</option>
                        </select>
                    </div>
                    <div className='flex flex-row'>
                        <label htmlFor="" className='text-white w-20'>Style</label>
                        <select
                            value={selectedStyle}
                            onChange={(e) => setSelectedStyle(e.target.value)}>
                            {listStyle.map((item: string, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-row'>
                        <label htmlFor="" className='text-white w-20'>Color</label>
                        <select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}>
                            {listColor.map((item: string, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-row'>
                        <label htmlFor="" className='text-white w-20'>Camera</label>
                        <select
                            value={selectedFraming}
                            onChange={(e) => setSelectedFraming(e.target.value)}>
                            {listFraming.map((item: string, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-row'>
                        <label htmlFor="" className='text-white w-20'>Lightning</label>
                        <select
                            value={selectedLightning}
                            onChange={(e) => setSelectedLightning(e.target.value)}>
                            {listLightning.map((item: string, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <button onClick={() => handleCreate()} className='w-full bg-neutral-800 py-2'>Create</button>
                </div>
            </div>

            {/* <div className='w-80 h-10 text-white'>

            </div> */}
            <div className="aiImg flex-grow flex flex-col min-h-[500px]">

                <div className='flex flex-row justify-center border-b border-gray-600 font-bold text-sm'>
                    <div className='flex flex-row items-center space-x-1 border-b border-white h-full'><Grip /> <span>Creations</span></div>
                </div>
                <div className='flex-grow py-2 flex flex-row flex-wrap justify-center'>
                    {listImgBase64.map((item: string, index) => (
                        <div key={index} className='flex-shrink-0 ml-2 mt-2 relative group rounded'>
                            <img
                                src={`data:image/png;base64,${item}`}
                                alt="Generated"
                                style={{ height: '500px', width: 'auto' }}
                            />
                            <button className='absolute downImg flex items-center justify-center right-2 top-2 bg-white w-8 h-8 text-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                <ArrowDownToLine />
                                <Tooltip anchorSelect=".downImg" place="left">
                                    Download image
                                </Tooltip>
                            </button>
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
