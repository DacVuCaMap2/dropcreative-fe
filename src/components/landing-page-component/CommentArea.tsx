import { Rate } from 'antd'
import React from 'react'

export default function CommentArea() {
    return (
        <div className='flex flex-col space-y-4'>
            <div className='border flex flex-row py-8 px-4 items-center space-x-2 border-neutral-400'>
                <div className='font-bold text-4xl'>
                    5
                </div>
                <div className='flex flex-col flex-grow'>
                    <span><Rate disabled defaultValue={5} /></span>
                    <span className='text-xs text-neutral-600'>102 customer ratings</span>
                </div>
                <div className='flex flex-col'>
                    <button className='py-2 bg-blue-500 hover:bg-blue-600 text-white'>Write a review</button>
                    <span className='text-xs text-neutral-600'>Write a review to get 10% off any order</span>
                </div>
            </div>

            <div className='border flex flex-row py-8 px-4 space-x-2 border-neutral-400 text-sm'>
                <div className='flex flex-col flex-grow'>
                    <span className='font-bold'>Felicita Simek</span>
                    <span className='text-neutral-400 text-xs'>AUG 25, 2023</span>
                </div>
                <div className='w-[80%] flex flex-col text-xs space-y-2'>
                    <span><Rate disabled defaultValue={5} /></span>
                    <p>
                        As soon as I got it, I was amazed. The texture of the drone is high.
                        This is the first drone in my life. I just got it and played with it for a long time.
                        I have to say that the drone is really very stable.
                    </p>
                    <span className='underline text-neutral-400'>This product is awesome</span>
                </div>
                
            </div>
            <div className='border flex flex-row py-8 px-4 space-x-2 border-neutral-400 text-sm'>
                <div className='flex flex-col flex-grow'>
                    <span className='font-bold'>Felicita Simek</span>
                    <span className='text-neutral-400 text-xs'>AUG 25, 2023</span>
                </div>
                <div className='w-[80%] flex flex-col text-xs space-y-2'>
                    <span><Rate disabled defaultValue={5} /></span>
                    <p>
                        As soon as I got it, I was amazed. The texture of the drone is high.
                        This is the first drone in my life. I just got it and played with it for a long time.
                        I have to say that the drone is really very stable.
                    </p>
                    <span className='underline text-neutral-400'>This product is awesome</span>
                </div>
                
            </div>
        </div>
    )
}
