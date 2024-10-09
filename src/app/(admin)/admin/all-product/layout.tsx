'use client'

import { routeData } from '@/data/admin-data/routedata';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const routeListData = routeData;
    const pathname = usePathname();
    const thisRoute = routeData.find((item: any) => item.path === pathname);
    const title = thisRoute?.title;
    return (
        <div className="flex flex-col px-10 py-4">
            <header className='h-full'>
                {thisRoute?.backHref &&
                    <Link
                        href={thisRoute?.backHref}
                        className='text-neutral-400 flex flex-row items-center mb-2 text-sm hover:underline hover:underline-offset-2'
                    >
                        <ChevronLeft size={16} />
                        <span> {thisRoute?.backTitle}</span>
                    </Link>

                }
                <p className='font-bold text-2xl text-neutral-700'>{title}</p>
            </header>
            <main className=" w-full">
                {children}
            </main>

        </div>
    );
};

export default Layout;