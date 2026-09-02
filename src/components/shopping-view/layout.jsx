import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-background dark:bg-[#0B0F19] relative overflow-hidden">
      {/* COOMON HEADER */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      {/* COOMON FOOTER */}
    </div>
  );
};

export default ShoppingLayout;
