"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import jsonwebtoken from "jsonwebtoken";

// type tokenInfo={
//     exp:number
//     iat:number
//     sub:string
// }

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
  const user = localStorage.getItem("user");
  const grabToken = () => {
    if (user) {
      const parsedUser = JSON.parse(user!);
      setData({
        token: parsedUser.token,
        adminDetails: parsedUser.adminDetails,
        loginTimeDetails: parsedUser.loginTimeDetails,
      });
    }
  };

  useEffect(() => {
    grabToken();
    setInterval(() => {
      const is_expired = jsonwebtoken.decode(JSON.parse(user!).token);
      if (
        typeof is_expired === "object" &&
        is_expired !== null &&
        "exp" in is_expired &&
        typeof is_expired.exp === "number"
      ) {
        console.log(is_expired);
      }
    }, 1000);
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default Admin;
