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
  managerDetails: {
    name: string;
    mngemail: string;
  };
  loginTimeDetails: object | null;
};

interface AdminProps {
  children: ReactNode;
}

const Manager = ({children}:any) => {
  const [data, setData] = useState<ManagerData>({
    token: "",
    managerDetails: {
      name: "",
      mngemail: "",
    },
    loginTimeDetails: {},
  });
  const [expired, setExpired] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [userString, setUserString] = useState<string | null>(null);
  
  const navigate = useRouter();
  const gotoLogin = () => {
    setOpen(false);
    navigate.push("/");
  };

  // Safely get user data from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      setUserString(user);
      
      if (user) {
        const parsedUser = JSON.parse(user);
        setData({
          token: parsedUser.token,
          managerDetails: parsedUser.managerDetails,
          loginTimeDetails: parsedUser.loginTimeDetails,
        });
      }
    }
  }, []);

  // Check token expiration
  useEffect(() => {
    if (!userString) return;
    
    const intervalId = setInterval(() => {
      // Use the state variable instead of directly accessing localStorage
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
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
            }
          }
        }
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [userString]);

  return (
    <>
      {expired ? (
        <>
          <LogoutMessage
            user={userString}
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
