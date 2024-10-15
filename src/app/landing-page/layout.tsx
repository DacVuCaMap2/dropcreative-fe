import HeadNavBar from '@/components/admin-component/HeadNavBar';
import Footer from '@/components/home-component/Footer';
import HomeHeadNavBar from '@/components/home-component/HomeHeadNavBar';
import LandingPageHeader from '@/components/landing-page-component/LandingPageHeader';
import React from 'react';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <div>
            <main className=" w-full relative">
                <LandingPageHeader/>
                {children}
                <Footer/>
            </main>
        </div>
    );
};

export default Layout;
