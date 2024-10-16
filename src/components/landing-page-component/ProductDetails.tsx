"use client"
import React, { useEffect, useState } from 'react'
import BuyArea from './BuyArea';
import ContentArea from './ContentArea';
import { ArrowDown, ArrowUp } from 'lucide-react';
type Props = {
    productData: any
}
export default function ProductDetails(props: Props) {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    console.log(props.productData);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className='flex flex-col justify-center items-center'>
            <BuyArea productData={props.productData} />
            <ContentArea productData={props.productData} />
            <div className='fixed bottom-5 right-5 flex flex-col space-y-2'>
                {showScrollToTop && (
                    <button
                        onClick={scrollToTop}
                        className='bg-black border border-white text-white py-2 px-4 rounded shadow transition'
                    >
                        <ArrowUp />
                    </button>
                )}
                {/* <button
                    onClick={scrollToBottom}
                    className='bg-black text-white py-2 px-4 rounded shadow transition'
                >
                    <ArrowDown />
                </button> */}
            </div>
        </div>
    )
}
