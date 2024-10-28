import GetApi from '@/api/GetApi';
import PixelComponent from '@/components/admin-component/custom-pixel-component/PixelComponent'
import CategoryPixel from '@/model/CategoryPixel';
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {
  const cookie = cookies();
  const roleStr = cookie.get('role')?.value;
  return (
    <PixelComponent isAdmin={false}/>
  )
}
