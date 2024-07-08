"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Page from "@/app/adm-dash/page";
import jsonwebtoken from "jsonwebtoken";

type AdminData = {
  token: string;
  adminDetails: object;
  loginTimeDetails: object | null;
};

interface AdminProps {
  children: ReactNode;
}

const Admin: React.FC<AdminProps> = ({ children }) => {
  const [data, setData] = useState<AdminData>({
    token: "",
    adminDetails: {},
    loginTimeDetails: {},
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    const is_expired = jsonwebtoken.decode(JSON.parse(user!).token);
    console.log(is_expired);
    if (jsonwebtoken.decode(JSON.parse(user!).token)!.exp < Date.now() / 1000) {
      const parsedUser = JSON.parse(user);
      setData({
        token: parsedUser.token,
        adminDetails: parsedUser.adminDetails,
        loginTimeDetails: parsedUser.loginTimeDetails,
      });
    }
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <Page data={data} />
      <main>{children}</main>
    </>
  );
};

export default Admin;
