import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
type Props = {
    value:string
}
export default function CardPaypal(props:Props) {
    const paypalClientId: string = process.env.NEXT_PUBLIC_PAYPAL_ID || "";
    const handleApprove = async (data: any, actions: any) => {
        try {
          const details = await actions.order.capture();
          console.log('Transaction completed by ' + details.payer.name.given_name);
          // Cập nhật trạng thái hoặc xử lý dữ liệu thanh toán ở đây
        } catch (error) {
          console.error('Error capturing order:', error);
        }
      };
    return (
        <div className="fixed top-0 left-0 z-30 h-screen w-screen bg-blue-900 bg-opacity-80 flex flex-col justify-center items-center">
            <div className="opacity-0">
                ss
            </div>
            <div className="bg-white h-screen w-[1000px] rounded-xl">
                <PayPalScriptProvider options={{ "clientId": paypalClientId }}>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-4">Choose Your Plan</h2>
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    intent: 'CAPTURE', // Hoặc 'AUTHORIZE' nếu bạn cần
                                    purchase_units: [{
                                        amount: {
                                            currency_code: 'USD', // Thay đổi theo tiền tệ bạn muốn
                                            value: '4.99' // Đảm bảo rằng giá trị này là một chuỗi
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
            <div className="opacity-0">
                ss
            </div>
        </div>
    )
}
