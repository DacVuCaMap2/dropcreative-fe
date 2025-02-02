"use client"
import GetApi from '@/api/GetApi';
import PostApi from '@/api/PostParttern';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Card, message } from 'antd';
import { Check, Minus, X } from 'lucide-react';
import React, { useState } from 'react'
type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function WalletPaypal(props: Props) {
    const [currentValue, setCurrentValue] = useState(0);
    const [showPaypal, setShowPaypal] = useState(false);
    const [opacityPaypal,setOpacityPaypal] = useState(false);
    const paypalClientId: string = process.env.NEXT_PUBLIC_PAYPAL_ID || "";
    const handleApprove = async (data: any, actions: any) => {
        try {
            const details = await actions.order.capture();
            const url = process.env.NEXT_PUBLIC_API_URL + "/api/wallet/capture/" + details.id;
            const response = await GetApi(url);
            console.log(response);
            if (response?.status && response.status === 200) {
                window.location.reload();
            }
            else {
                message.error("failed!")
            }

        } catch (error) {
            console.error('Error capturing order:', error);
        }
    };
    const handleClosePaypal = () => {
        document.body.style.overflow = 'auto';
        props.setOpen(false);
    }
    const handleChangeCurrentValue = (e: any) => {
        const value = parseFloat(e.target.value);
        setShowPaypal(false);
        setOpacityPaypal(false);
        setCurrentValue(value);

    }
    const handleShowPaypal = () => {
        console.log(currentValue);
        // if (currentValue > 0) {
        //     setShowPaypal(true);
        // }
        if (currentValue > 0) {
            setShowPaypal(true);
            setTimeout(() => {
                setOpacityPaypal(true)
            }, 1000); // 1000 ms = 1 giây (có thể thay đổi tùy theo yêu cầu)
        }
    }
    // Create the PayPal order
    const handleGetPaypalButton = async () => {
        const url = process.env.NEXT_PUBLIC_API_URL + "/api/wallet/create-order";
        const postData = { value: currentValue, currency: "USD" };
        const response = await PostApi(url, postData);
        console.log("handleGetPaypalButton response:", response);
        return response.id;
    };
    return (
        <div onClick={handleClosePaypal} className="fixed top-0 left-0 z-30 h-screen w-screen bg-blue-900 bg-opacity-90 flex flex-col justify-center items-center">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-white w-[500px] rounded-xl overflow-auto max-h-screen">
                <button onClick={handleClosePaypal} className='absolute right-2 top-2 z-40 hover:bg-gray-200 rounded-lg '>
                    <X size={30} />
                </button>
                <Card hoverable className="shadow-none hover:shadow-none border-none hover:cursor-default">
                    <div className="flex flex-col h-full justify-center space-y-2">
                        <p className="text-black text-2xl font-medium text-center">Deposit wallet</p>
                        <div className='flex flex-row space-x-4'>
                            <input onChange={e => handleChangeCurrentValue(e)} type="number" placeholder='Type your money' className='bg-gray-100 border-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2' />
                            <button onClick={e => handleShowPaypal()} className='px-4 bg-blue-500 text-white'>Confirm</button>
                        </div>
                        {showPaypal &&
                            <div className='flex flex-col border-b justify-end items-end'>
                                <Minus />
                                <div className='space-x-2 mr-2'>
                                    <span className='text-gray-500'>(fee 5%)</span>
                                    <span className='text-xl'>${currentValue * 5 / 100}</span>
                                </div>
                            </div>
                        }
                        {showPaypal &&
                            <p className='font-bold text-xl text-end mr-2'>${currentValue - currentValue * 5 / 100}</p>
                        }
                        <p className=" text-sm font-medium text-red-500 bg-gray-200 p-4 "> Currently in testing, payment not available yet !!!</p>
                        <p className=" text-sm font-medium text-red-500 bg-gray-200 p-4 "> The transaction will incur a fee of approximately 5%.</p>

                        {showPaypal &&
                            <div className='opacity-100'>
                                <PayPalScriptProvider options={{ "clientId": paypalClientId }}>
                                    <div className="p-8">
                                        <PayPalButtons
                                            createOrder={async (data, actions) => {
                                                const orderId = await handleGetPaypalButton();
                                                if (orderId) {
                                                    return orderId;
                                                } else {
                                                    throw new Error("Error creating PayPal order");
                                                }
                                            }}
                                            onApprove={handleApprove}
                                            onError={(error) => {
                                                console.error("PayPal Button Error:", error);
                                            }}
                                        />
                                    </div>
                                </PayPalScriptProvider>
                            </div>
                        }
                    </div>
                </Card>
            </div>
        </div>
    )
}
