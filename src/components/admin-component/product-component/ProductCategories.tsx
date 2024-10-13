'use client';
import { adminListCategories } from '@/data/admin-data/adminListData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';

export default function ProductCategories() {
    const listCat = adminListCategories;
    const searchParams = useSearchParams();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [hiddenBtn, setHiddenBtn] = useState({ left: false, right: true });
    const [scrollLocation, setScrollLocation] = useState(-210);

    const cat = searchParams.get('cat') ? searchParams.get('cat') : "All";
    

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -210 : 210; // Điều chỉnh giá trị này nếu cần
            setScrollLocation(scrollAmount);
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            const hidLeft = scrollAmount === -210;
            const hidRight = scrollAmount === 210;
            setHiddenBtn({ left: hidLeft, right: hidRight });
        }
    };

    useEffect(() => {
        const checkOverflow = () => {
            if (scrollRef.current) {
                const { scrollWidth, clientWidth } = scrollRef.current;
                let hidLeft = scrollWidth <= clientWidth;
                hidLeft = scrollLocation === -210 ? true : hidLeft;

                setHiddenBtn({
                    left: hidLeft,
                    right: scrollWidth <= clientWidth,
                });
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, []);
    return (
        <div className='flex flex-col space-y-4 w-full'>
            <div className='flex items-center relative'>
                <button
                    onClick={() => scroll('left')}
                    className={`absolute left-0 z-20 p-2 bg-gray-300 rounded-full ${hiddenBtn.left && 'opacity-0 pointer-events-none'}`}
                >
                    <ChevronLeft />
                </button>
                <div ref={scrollRef} className='flex flex-row space-x-6 overflow-hidden text-sm '>
                    {adminListCategories.map((item, index) => (
                        <Link key={index} href={"/"} className={`border-b-4 pb-2 ${item.title === cat ? 'border-blue-500' : ''}`}>
                            <div className='relative flex flex-col h-24 w-44 rounded-xl overflow-hidden group'>
                                <div className='absolute top-1/2 left-1/2 z-10 text-white font-bold transform -translate-x-1/2 -translate-y-1/2'>{item.title}</div>
                                <Image
                                    src={item.img}
                                    alt='Image'
                                    width={300}
                                    height={300}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                                <div className='absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-40' />
                            </div>
                        </Link>
                    ))}
                </div>
                <button
                    onClick={() => scroll('right')}
                    className={`absolute right-0 z-20 p-2 bg-gray-300 rounded-full ${hiddenBtn.right && 'opacity-0 pointer-events-none'}`}
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
