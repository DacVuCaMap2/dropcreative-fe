'use client'
import GetApi from '@/api/GetApi';
import { useAccount } from '@/context/AccountContext';
import { homeCategories } from '@/data/home-data/homeListData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

export default function SuggestedArea() {
    const [sugProduct, setSugProduct] = useState<any[]>([]);
    const { accountId } = useAccount();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [hiddenBtn, setHiddenBtn] = useState({ left: false, right: true });
    const [scrollLocation, setScrollLocation] = useState(-210);
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
    useEffect(() => {
        const fetchData = async () => {
            const url = process.env.NEXT_PUBLIC_API_URL + `/api/product?accountId=${accountId}&size=8&page=1`;
            const response = await GetApi(url);
            console.log(response, url);
            if (response.data && Array.isArray(response.data)) {
                setSugProduct(response.data);
            }
        }
        if (accountId) {
            fetchData();
        }

    }, [accountId])
    return (
        <div className='flex flex-col space-y-4'>
            <span className='font-bold text-xl'>Categories</span>
            <div className='flex items-center relative'>
                <button
                    onClick={() => scroll('left')}
                    className={`absolute left-0 z-20 p-2 bg-gray-300 rounded-full ${hiddenBtn.left && 'opacity-0 pointer-events-none'}`}
                >
                    <ChevronLeft />
                </button>
                <div ref={scrollRef} className='flex flex-row w-full space-x-6 overflow-hidden text-sm'>
                    {sugProduct.map((item, index) => (
                        <Link key={index} href={"/"}>
                            <div>
                                <Image
                                    src={item.img}
                                    alt='Image'
                                    width={300}
                                    height={300}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
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
