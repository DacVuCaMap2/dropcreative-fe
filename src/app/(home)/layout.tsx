
import HomeHeadNavBar from '@/components/home-component/HomeHeadNavBar';
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
    let email = "";
    let role = ""
    if (emailCookie && roleCookie) {
        email = emailCookie.value;
        role = roleCookie.value;
    }
    return (
        <div>
            <main className=" w-full relative">
                <HomeHeadNavBar email={email} role={role} />
                {children}
            </main>
        </div>
    );
};

export default Layout;
