"use client";
import Navbar from "@/components/seller/Navbar";
import Sidebar from "@/components/seller/Sidebar";
import { useAppContext } from "@/context/AppContext";
import { redirect } from "next/navigation";
import React from "react";

const Layout = ({ children }) => {
  const { isSeller, router } = useAppContext();
  if (!isSeller) {
    redirect("/");
  }
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
