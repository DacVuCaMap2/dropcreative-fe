import React, { SetStateAction } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Button, Card } from 'antd';
import { Check, X } from 'lucide-react';
type Props = {
    value: string,
    pricing: any,
    setPricingItem:React.Dispatch<React.SetStateAction<any>>,
}
export default function CardPaypal(props: Props) {
    const paypalClientId: string = process.env.NEXT_PUBLIC_PAYPAL_ID || "";
    const handleApprove = async (data: any, actions: any) => {
        try {
            const details = await actions.order.capture();
            console.log('Transaction completed by ' + details.payer.name.given_name);
            
        } catch (error) {
            console.error('Error capturing order:', error);
        }
    };
    const handleClosePaypal = ()=>{
        document.body.style.overflow = 'auto';
        props.setPricingItem({value:"",item:null});
    }
    return (
        <div onClick={handleClosePaypal} className="fixed top-0 left-0 z-30 h-screen w-screen bg-blue-900 bg-opacity-90 flex flex-col justify-center items-center">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-white w-[500px] rounded-xl overflow-auto max-h-screen">
                <button onClick={handleClosePaypal} className='absolute right-2 top-2 z-40 hover:bg-gray-200 rounded-lg '>
                    <X size={30}/>
                </button>
                <Card hoverable className="shadow-none hover:shadow-none border-none hover:cursor-default">
                    <div className="flex flex-col h-full justify-center ">
                        <p className="text-black text-2xl font-medium">{props.pricing.item.name} </p>
                        <p className=" text-sm font-medium text-red-500 bg-gray-200 p-4 "> Currently in testing, payment not available yet !!!</p>
                        <div className='mt-4'>
                            <span className="text-4xl text-black font-semibold">
                                {props.value} $
                            </span>
                            <span className="text-base text-gray-600">/{props.pricing.item.days}</span>
                        </div>
                        <div className=''>
                            <PayPalScriptProvider options={{ "clientId": paypalClientId }}>
                                <div className="p-8">
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                intent: 'CAPTURE',
                                                purchase_units: [{
                                                    amount: {
                                                        currency_code: 'USD',
                                                        value: props.value
                                                    },
                                                }],
                                            });
                                        }}
                                        onApprove={handleApprove}
                                        onError={(error) => {
                                            console.error('PayPal Button Error:', error);
                                        }}
                                    />
                                </div>
                            </PayPalScriptProvider>
                        </div>
                        <div>
                            <p className="text-base font-semibold text-black">
                                AI & Tools
                            </p>
                            <div className="mt-3">
                                <p className="flex">
                                    <Check
                                        color="green"
                                        width={15}
                                        height={15}
                                        className="mt-1 mr-1"
                                    />
                                    84000 AI credits /year
                                </p>
                                <p className="flex">
                                    <Check
                                        color="green"
                                        width={15}
                                        height={15}
                                        className="mt-1 mr-1"
                                    />
                                    Easy-to-use online design tools
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-base font-semibold text-gray-400">
                                Premium stock content
                            </p>
                            <div className="mt-3">
                                <p className="flex">
                                    <Check
                                        color="gray"
                                        width={15}
                                        height={15}
                                        className="mt-1 mr-1"
                                    />
                                    All Premium stock content
                                </p>
                                <p className="flex">
                                    <Check
                                        color="gray"
                                        width={15}
                                        height={15}
                                        className="mt-1 mr-1"
                                    />
                                    Unlimited downloads
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
