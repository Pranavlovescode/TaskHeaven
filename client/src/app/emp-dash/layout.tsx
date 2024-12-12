"use client";

import React, { Children, ReactNode, useEffect, useState } from "react";
import Header from "@/app/components/Header";
import jsonwebtoken from "jsonwebtoken";
import { useRouter } from "next/navigation";
import LogoutMessage from "../components/LogoutMessage";

type EmployeeData = {
  token: string;
  employeeDetails: {
    name: string;
    email: string;
  };
  loginTimeDetails: object | null;
};

interface AdminProps {
  children: ReactNode;
}

const Employee = ({ children }: any) => {
  const [data, setData] = useState<EmployeeData>({
    token: "",
    employeeDetails: {
      name: "",
      email: "",
    },
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
        employeeDetails: parsedUser.employeeDetails,
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
          <Header
            name={data.employeeDetails.name}
            email={data.employeeDetails.email}
          />
          {/* <Sidebar /> */}
          <main className="mt-[52px]">{children}</main>
          {/* <Toaster/> */}
        </>
      )}
    </>
  );
};

export default Employee;
