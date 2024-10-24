import GetApi from '@/api/GetApi';
import HomePage from '@/components/home-component/HomePage'
import { cookies } from 'next/headers'
import React from 'react'

export default async function page() {
  const cookie = cookies();
  const accountId = cookie.get('account_id')?.value;
  let listHistory : any[]= [];
  if (accountId) {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/history";
    const response = await GetApi(url);
    if (response && Array.isArray(response)) {
      listHistory = response;
    }
  }
  return (
    <HomePage listHistory={listHistory} accountId={accountId}/>
  )
}
