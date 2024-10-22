
import AddProductComponent from '@/components/admin-component/product-component/AddProductComponent'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation';
import React from 'react'

export default function page() {
  const cookieStore = cookies()
  let accId: string = "";  // Đặt kiểu là string
  const roleCookie = cookieStore.get("role");
  const accountIdCookie = cookieStore.get('account_id');
  if (accountIdCookie) {
    accId = accountIdCookie.value; // Sử dụng .value để lấy giá trị chuỗi
  }
  if (roleCookie && roleCookie.value==="admin_role") {
    notFound();
  }
  return (
    <AddProductComponent accountId={accId} />
  )
}
