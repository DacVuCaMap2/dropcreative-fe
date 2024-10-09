import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <main className=" w-full relative">{children}</main>
    </div>
  );
};

export default Layout;
