"use client";

import React, { Children, ReactNode, useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import jsonwebtoken from "jsonwebtoken";

import { useRouter } from "next/navigation";
import LogoutMessage from "../components/LogoutMessage";
import ManagerDashboard from "./page";
import { Toaster } from "@/components/ui/toaster";

// type tokenInfo={
//     exp:number
//     iat:number
//     sub:string
// }

type ManagerDetails = {
  name: string;
  mngemail: string;
};

type ManagerData = {
  token: string;
  managerDetails: {};
  loginTimeDetails: object | null;
};

interface AdminProps {
  children: ReactNode;
}

const Manager = ({children}:any) => {
  const [data, setData] = useState<ManagerData>({
    token: "",
    managerDetails: {},
    loginTimeDetails: {},
  });
  const [expired, setExpired] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const user = localStorage.getItem("user");
  const grabToken = () => {
    if (user) {
      const parsedUser = JSON.parse(user!);
      setData({
        token: parsedUser.token,
        managerDetails: parsedUser.managerDetails,
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
          <Header  name={data.managerDetails.name} email={data.managerDetails.mngemail} />
          {/* <Sidebar /> */}
          <main>{children}</main>
          {/* <Toaster/> */}
        </>
      )}
    </>
  );
};

export default Manager;
