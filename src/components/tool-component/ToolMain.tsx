"use client"
import PostApi from '@/api/PostApi';
import { aiColor, aiFraming, aiLightning, aiStyle } from '@/data/tool-data/toolListData';
import React, { useState } from 'react';

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
    const [imgBase64, setImgBase64] = useState("");
    const handleCreate = async () => {
        const url = "https://api.freepik.com/v1/ai/text-to-image";
        const data = {
            prompt: prompt,
            num_inference_steps: 8,
            guidance_scale: 1,
            num_images: 1,
            image: { size: selectedSize.split(' ').slice(1).join(' ') },
            styling: {
                style: selectedStyle,
                color: selectedColor,
                lightning: selectedLightning,
                framing: selectedFraming
            }
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-freepik-api-key': 'FPSXa66c58ab5a6c4635a8af2f04aa36a57f'
            }
        };
        const response = await PostApi(url, data, config);
        console.log(response);
        setImgBase64(response);
    }
    return (
        <div className='flex flex-row py-4 px-2'>
            <div className='flex flex-col py-2 px-4 bg-neutral-950 w-80'>
                <div className='py-2'>Prompt</div>
                <div>
                    <textarea
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='Describe your image'
                        className='w-full h-20 resize-none bg-neutral-900 rounded outline-none focus:bg-neutral-900 focus:ring-0'>
                    </textarea>
                </div>
                {/* Giao diện chưa chỉnh sửa */}
                <div className='flex flex-col text-black py-2'>
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
            <div className="aiImg">
                {imgBase64 && (
                    <img
                        src={`data:image/png;base64,${imgBase64}`}
                        alt="Generated"
                        style={{ height: '300px', width: 'auto' }}
                    />

                )}
            </div>
            <div></div>
        </div>
    );
}
