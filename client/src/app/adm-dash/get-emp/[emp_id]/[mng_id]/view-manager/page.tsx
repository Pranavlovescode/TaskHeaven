"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import LogoutMessage from "@/app/components/LogoutMessage";

type Manager = {
  address: string;
  adminDetails: object;
  age: number;
  date_of_joining: string;
  mng_id: string;
  mngemail: string;
  mobile_number: string;
  name: string;
  password: string;
};

function ViewManager() {
  const token = JSON.parse(localStorage.getItem("user")!);

  const { emp_id, mng_id } = useParams();

  // Code for the login Dialog
  const [open, setOpen] = React.useState<boolean>(true);
  const navigate = useRouter();
  const gotoLogin = () => {
    setOpen(false);
    navigate.push("/");
  };
  console.log(token.token);

  const [mngDetails, setMngDetails] = useState<Manager>({
    address: "",
    adminDetails: {},
    age: 0,
    date_of_joining: "",
    mng_id: "",
    mngemail: "",
    mobile_number: "",
    name: "",
    password: "",
  });

  const getManager = async () => {
    try {
      if (token.token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-manager/` + mng_id,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              "Content-Type": "application/json",
            },
          },
        );
        setMngDetails(response.data);
        const data = response.data;
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getManager();
  }, []);

  return (
    <>
      {token ? (
        <>
          <div className={"mt-[52px] lg:px-52 ml-20 pt-14"}>
            <Card className="w-[750px] mx-auto ">
              <CardHeader>
                <CardTitle>Manager Information</CardTitle>
                <CardDescription>
                  Personal details and information regarding an Manager.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {mngDetails.name}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {mngDetails.mngemail}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Date of Joining
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {new Date(mngDetails.date_of_joining).toDateString()}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Mobile Number
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {mngDetails.mobile_number}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {mngDetails.address}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Age
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {mngDetails.age}
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <a href={`/adm-dash/get-emp/${emp_id}`}>
                  <Button
                    className={
                      "bg-blue-500 hover:bg-blue-700 duration-300 focus:ring-4 focus:ring-blue-300"
                    }
                  >
                    Back
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </div>
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

export default ViewManager;
