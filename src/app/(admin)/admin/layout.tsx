// components/Layout.js
import HeadNavBar from '@/components/admin-component/HeadNavBar';
import SideBar from '@/components/admin-component/Sidebar/SideBar';
import React from 'react';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <div className="flex">
            <div className='h-full'>
                <SideBar />
            </div>
            <main className=" w-full flex flex-col">
                <HeadNavBar />
                {children}
                
            </main>
        </div>
    );
};

export default Layout;
