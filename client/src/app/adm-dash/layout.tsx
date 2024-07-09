"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import jsonwebtoken from "jsonwebtoken";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

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
  const navigate = useRouter();
  const gotoLogin = () => {
    setOpen(false);
    navigate.push("/");
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
        // console.log(is_expired);
        if (is_expired.exp < Date.now() / 1000) {
          console.log("expired");
          setExpired(true);
          localStorage.removeItem("user");
        }
      }
    }, 1000);
  }, []);

  return (
    <>
      {expired ? (
        <>
          <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          aria-hidden="true"
                          className="h-6 w-6 text-red-600"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Logged Out
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            You are Logged out & you need to Login again. This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={gotoLogin}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      data-autofocus="true"
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </>
      ) : (
        <>
          <Header />
          <Sidebar />
          <main>{children}</main>
        </>
      )}
    </>
  );
};

export default Admin;
