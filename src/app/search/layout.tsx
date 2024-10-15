import SearchNavBar from "@/components/search-component/SearchNavBar";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <main className=" w-full relative">
        <SearchNavBar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
