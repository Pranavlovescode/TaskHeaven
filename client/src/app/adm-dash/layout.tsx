"use client";

import React from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

const Admin = ({ children }: any) => {
  const [toggleSidebar, setToggleSidebar] = React.useState<boolean>(true);
  return (
    <>
      <Header
        onToggle={() => {
          setToggleSidebar(!toggleSidebar);
        }}
      />
      <Sidebar toggleSidebar={toggleSidebar} />

      <main>{children}</main>
    </>
  );
};

export default Admin;
