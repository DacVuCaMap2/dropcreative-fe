
import AddProductComponent from '@/components/admin-component/product-component/AddProductComponent'
import { cookies } from 'next/headers'
import React from 'react'

export default function page() {
  const cookieStore = cookies()
  let accId: string = "";  // Đặt kiểu là string

  const accountIdCookie = cookieStore.get('account_id');
  if (accountIdCookie) {
    accId = accountIdCookie.value; // Sử dụng .value để lấy giá trị chuỗi
  }

  return (
    <AddProductComponent accountId={accId} />
  )
}
