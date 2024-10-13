import GetApi from '@/api/GetApi'
import AllProductComponent from '@/components/admin-component/product-component/AllProductComponent'
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {
  const cookie = cookies();
  let accountId = cookie.get('account_id')?.value;
  let url = process.env.NEXT_PUBLIC_API_URL+`/api/product?accountId=${accountId}&size=10&page=1`;
  const dataList = await GetApi(url);

  return (
    <AllProductComponent listProduct={dataList}/>
  )
}
