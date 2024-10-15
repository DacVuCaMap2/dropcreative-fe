'use client'
import { Flame } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown';

export default function CountDownComponent() {
    const countdownTime = 10 * 60 * 1000;
    const [timeLeft, setTimeLeft] = useState(countdownTime);

    const handleComplete = () => {
        
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1000) {
                    clearInterval(interval);
                    handleComplete();
                    return 0;
                }
                return prev - 1000; // Giảm mỗi giây
            });
        }, 1000);

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, []);

    const progressWidth = (timeLeft / countdownTime) * 100;

    // Hàm để định dạng thời gian
    const formatTime = (time: any) => {
        const minutes = Math.floor(time / 60000);
        const seconds: number = parseFloat(((time % 60000) / 1000).toFixed(0));
        return `${minutes}m : ${seconds < 10 ? '0' : ''}${seconds}s`;
    }

    return (
        <div>
            <div className='flex flex-row text-blue-400'>
                <Flame className='mr-2'/>
                Only <strong className='mx-1'>15 items</strong> left in stock
            </div>
            <div className='relative h-1 w-full'>
                <div className='absolute top-0 left-0 h-full bg-blue-500' style={{ width: `${progressWidth}%`, transition: 'width 1s linear' }} />
            </div>
            <div className='bg-blue-50 w-full py-4 px-10 relative text-neutral-500'>
                <div className=' text-sm'>
                    Limited-time offer! Sale ends in <span className='text-blue-400 font-bold'>{formatTime(timeLeft)}</span>
                </div>
            </div>
        </div>
    )
}