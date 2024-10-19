// components/Layout.js
import HeadNavBar from '@/components/admin-component/HeadNavBar';
import SideBar from '@/components/admin-component/Sidebar/SideBar';
import { cookies } from 'next/headers';
import React from 'react';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const cookie = cookies();
    const emailCookie = cookie.get("email");
    const roleCookie = cookie.get("role");
    let email="";
    let role=""
    if (emailCookie && roleCookie) {
        email = emailCookie.value;
        role = roleCookie.value;
    }
    return (
        <div className="flex">
            <div className='h-full'>
                <SideBar />
            </div>
            <main className=" w-full flex flex-col">
                <HeadNavBar role={role} email={email}/>
                {children}
                
            </main>
        </div>
    );
};

export default Layout;
