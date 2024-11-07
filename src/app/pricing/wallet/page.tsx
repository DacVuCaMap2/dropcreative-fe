import GetApi from '@/api/GetApi';
import WalletMain from '@/components/wallet-component/WalletMain'
import React from 'react'

export default async function page() {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/wallet";
    const response = await GetApi(url);
    let balance = "0";
    if (response && response.balance) {
        balance = response.balance;
    }
    return (
        <WalletMain balance={balance}/>
    )
}
