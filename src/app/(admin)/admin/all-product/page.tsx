import GetApi from '@/api/GetApi'
import AllProductComponent from '@/components/admin-component/product-component/AllProductComponent'
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {
  const cookie = cookies();
  const accountId = cookie.get('account_id')?.value;
  const roleStr = cookie.get('role')?.value;
  const url = process.env.NEXT_PUBLIC_API_URL+`/api/product?accountId=${accountId}&size=100&page=1`;
  const dataList = await GetApi(url);

  return (
    <AllProductComponent listProduct={dataList} roleStr={roleStr}/>
  )
}
