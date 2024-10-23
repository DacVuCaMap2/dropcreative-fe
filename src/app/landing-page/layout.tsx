import HeadNavBar from "@/components/admin-component/HeadNavBar";
import Footer from "@/components/home-component/Footer";
import HomeHeadNavBar from "@/components/home-component/HomeHeadNavBar";
import LandingPageHeader from "@/components/landing-page-component/LandingPageHeader";
import { AccountProvider } from "@/context/AccountContext";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <AccountProvider>
        <main className=" w-full relative">
          <LandingPageHeader />
          {children}
          {/* <Footer /> */}
        </main>
      </AccountProvider>
    </div>
  );
};

export default Layout;
