
import ToolHeadNavBar from '@/components/tool-component/ToolHeadNavBar';
import React from 'react';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <div>
            <main className="w-full relative bg-black text-white min-h-screen">
                <ToolHeadNavBar/>
                {children}
            </main>
        </div>
    );
};

export default Layout;
