"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

type Employee = {
  name: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  address: string;
  adminDetails: object;
  age: number;
  authorities: boolean;
  credentialsNonExpired: boolean;
  date_of_joining: string;
  email: string;
  emp_id: string;
  enabled: boolean;
  managerDetails: Manager;
  mobile_number: string;
  password: string;
  role: string;
  username: string;
  workDetails: object;
};

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

function Page() {
  const [empDetail, setEmpDetail] = useState<Employee>({
    name: "",
    accountNonExpired: false,
    accountNonLocked: false,
    address: "",
    adminDetails: {},
    age: 0,
    authorities: false,
    credentialsNonExpired: false,
    date_of_joining: "",
    email: "",
    emp_id: "",
    enabled: true,
    managerDetails: {
      address: "",
      adminDetails: {},
      age: 0,
      date_of_joining: "",
      mng_id: "",
      mngemail: "",
      mobile_number: "",
      name: "",
      password: "",
    },
    mobile_number: "",
    password: "",
    role: "",
    username: "",
    workDetails: {},
  });
  const { emp_id } = useParams();
  // Fetching the token

  const token = JSON.parse(localStorage.getItem("user")!);

  const getEmployeeDetails = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-employee/${emp_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.token}`,
            },
          },
        );
        const data = response.data;
        setEmpDetail(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEmployeeDetails();
  }, []);

  const [open, setOpen] = React.useState<boolean>(true);
  const navigate = useRouter();
  const gotoLogin = () => {
    setOpen(false);
    navigate.push("/");
  };
  return (
    <>
      {token ? (
        <>
          <div className={"mt-[52px] lg:px-52 ml-20 pt-14"}>
            <Card className="w-[750px] mx-auto ">
              <CardHeader>
                <CardTitle>Employee Information</CardTitle>
                <CardDescription>
                  Personal details and information regarding an Employee.
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
                        {empDetail.name}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Role
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {empDetail.role}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {empDetail.email}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Date of Joining
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {new Date(empDetail.date_of_joining).toDateString()}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Mobile Number
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {empDetail.mobile_number}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {empDetail.address}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Age
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {empDetail.age}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Manager Details
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {empDetail.managerDetails ? (
                          <a
                            href={`/adm-dash/get-emp/${emp_id}/${empDetail.managerDetails.mng_id}/view-manager/`}
                            className={
                              "hover:underline text-blue-500 hover:text-blue-700 duration-300"
                            }
                          >
                            View Manager
                          </a>
                        ) : (
                          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 justify-between items-center">
                            No Manager assigned yet
                            <a
                              href={`/adm-dash/get-emp/${emp_id}/assign-manager/`}
                              className={
                                "hover:underline text-blue-500 hover:text-blue-700 duration-300"
                              }
                            >
                              Assign Manager
                            </a>
                          </dd>
                        )}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Work Details
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {empDetail.workDetails ? (
                          <a
                            href={`/adm-dash/get-emp/${emp_id}/assign-work/`}
                            className={
                              "hover:underline text-blue-500 hover:text-blue-700 duration-300"
                            }
                          >
                            View Work
                          </a>
                        ) : (
                          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 justify-between items-center">
                            No Work assigned yet
                            <a
                              href={`/adm-dash/get-emp/${emp_id}/assign-work/`}
                              className={
                                "hover:underline text-blue-500 hover:text-blue-700 duration-300"
                              }
                            >
                              Assign Work
                            </a>
                          </dd>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <a href="/adm-dash/get-emp">
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
      )}
    </>
  );
}

export default Page;
