import Footer from "@/components/common-component/Footer";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <main className=" w-full relative">
        {children}
        <Footer background="bg-black" textColor="text-white" />
      </main>
    </div>
  );
};

export default Layout;
