import { aiColor, aiFraming, aiLightning, aiStyle } from '@/data/tool-data/toolListData'
import { Type } from 'lucide-react';
import React, { useState } from 'react'

export default function ToolMain() {
    const listStyle : string[] = aiStyle;
    const listColor : string[] = aiColor;
    const listLightning : string[] = aiLightning;
    const listFraming : string[] = aiFraming;
    return (
        <div className='flex flex-row py-4 px-2'>
            <div className='flex flex-col py-2 px-4 bg-neutral-950 w-80'>
                <div className='py-2'>
                    Prompt
                </div>
                <div className=''>
                    <textarea placeholder='Describe your image' name="" id=""
                        className='w-full h-20 resize-none bg-neutral-900 rounded outline-none focus:bg-neutral-900 focus:ring-0'>
                    </textarea>
                </div>
                (chua chinh sua giao dien)
                <div className='flex flex-col text-black py-2'>
                    <div className='flex flex-row'>
                        <label htmlFor="" className='text-white w-20'>Mode</label>
                        <select name="" id="">
                            <option value="">Flux Fast</option>
                        </select>
                    </div>
                    <div className='flex flex-row'>
                        <label htmlFor="" className='text-white w-20'>Size</label>
                        <select name="" id="">
                            <option value="">1:1 Square</option>
                            <option value="">1:2 Vertical</option>
                            <option value="">2:1 Horizontal</option>
                            <option value="">2:3 Portrait</option>
                            <option value="">3:4 Traditional</option>
                            <option value="">4:5 Social Post</option>
                            <option value="">9:16 Social Story</option>
                            <option value="">3:2 Standard</option>
                            <option value="">4:3 Classic</option>
                            <option value="">16:9 Wide</option>
                        </select>
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <label htmlFor="" className='text-white w-20'>Style</label>
                        <select name="" id="">
                            {listStyle.map((item:string,index)=>(
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <label htmlFor="" className='text-white w-20'>Color</label>
                        <select name="" id="">
                            {listColor.map((item:string,index)=>(
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <label htmlFor="" className='text-white w-20'>Camera</label>
                        <select name="" id="">
                            {listFraming.map((item:string,index)=>(
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <label htmlFor="" className='text-white w-20'>Lightning</label>
                        <select name="" id="">
                            {listLightning.map((item:string,index)=>(
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <button className='w-full bg-neutral-800 py-2'>Create</button>
                </div>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}
