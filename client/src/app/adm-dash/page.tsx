"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import LogoutMessage from "../components/LogoutMessage";

export default function Page() {
  const token = localStorage.getItem("user");
  const [open, setOpen] = React.useState(true);
  const dataToken = token ? JSON.parse(token) : null;
  const navigate = useRouter();
  const gotoLogin = () => {
    setOpen(false);
    navigate.push("/");
  };
  const [empData, setEmpData] = useState<any>([]);
  const getEmployeeData = async () => {
    if (dataToken) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-employee`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${dataToken.token}`,
        },
      });
      const data: AxiosResponse = await response.data;
      setEmpData(data);
      console.log(data);
    }
  };
  useEffect(() => {
    getEmployeeData();
  }, []);
  return (
    <>
      {dataToken ? (
        <>
          <main className={"mt-[52px] ml-20 mx-auto"}>
            <div className={"text-4xl font-extrabold p-4"}>Dashboard</div>
            <div className={"flex flex-row justify-center items-center mt-4"}>
              <div className={"mx-auto flex justify-center"}>
                <div></div>
              </div>
              <div className={"mx-auto flex justify-center"}>
                This is Manager
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          <LogoutMessage
            open={open}
            setOpen={setOpen}
            gotoLogin={gotoLogin}
          />
        </>
      )}
    </>
  );
}
