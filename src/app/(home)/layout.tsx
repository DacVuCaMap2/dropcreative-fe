
import HomeHeadNavBar from '@/components/home-component/HomeHeadNavBar';
import React from 'react';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <div>
            <main className=" w-full relative">
                <HomeHeadNavBar/>
                {children}
            </main>
        </div>
    );
};

export default Layout;
