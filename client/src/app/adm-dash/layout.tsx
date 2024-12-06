"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import jsonwebtoken from "jsonwebtoken";

import { useRouter } from "next/navigation";
import LogoutMessage from "../components/LogoutMessage";

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

const Admin = ({ children }: any) => {
  const [data, setData] = useState<AdminData>({
    token: "",
    adminDetails: {},
    loginTimeDetails: {},
  });
  const [expired, setExpired] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const user = window.localStorage.getItem("user");
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
  const navigate = useRouter();
  const gotoLogin = () => {
    setOpen(false);
    navigate.push("/");
  };

  useEffect(() => {
    grabToken();
    const intervalId = setInterval(() => {
      const user = window.localStorage.getItem("user");
      if (user) {
        const is_expired = jsonwebtoken.decode(JSON.parse(user).token);
        if (
          typeof is_expired === "object" &&
          is_expired !== null &&
          "exp" in is_expired &&
          typeof is_expired.exp === "number"
        ) {
          if (is_expired.exp < Date.now() / 1000) {
            console.log("expired");
            setExpired(true);
            localStorage.removeItem("user");
            clearInterval(intervalId);
            stop();
          }
        }
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {expired ? (
        <>
          <LogoutMessage
            user={user}
            open={open}
            setOpen={setOpen}
            gotoLogin={gotoLogin}
          />
        </>
      ) : (
        <>
          <Header name={data.adminDetails.name} email={data.adminDetails.admemail} />
          {/* <Sidebar /> */}
         <main>{children}</main> 
        </>
      )}
    </>
  );
};

export default Admin;
