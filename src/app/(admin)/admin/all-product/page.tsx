import GetApi from '@/api/GetApi'
import AllProductComponent from '@/components/admin-component/product-component/AllProductComponent'
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {
  const cookie = cookies();
  const accountId = cookie.get('account_id')?.value;
  const roleStr = cookie.get('role')?.value;

  return (
    <AllProductComponent roleStr={roleStr} accountId={accountId}/>
  )
}
