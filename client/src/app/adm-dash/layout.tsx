"use client";

import React from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

const Admin = ({ children }: any) => {
  return (
    <>
      <Header />
      <Sidebar />

      <main>{children}</main>
    </>
  );
};

export default Admin;
