"use client";
import Link from 'next/link'
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
import { Button } from "@/components/ui/button";
import LogoutMessage from "@/app/components/LogoutMessage";

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
                          <Link
                            href={`/adm-dash/get-emp/${emp_id}/${empDetail.managerDetails.mng_id}/view-manager/`}
                            className={
                              "hover:underline text-blue-500 hover:text-blue-700 duration-300"
                            }
                          >
                            View Manager
                          </Link>
                        ) : (
                          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 justify-between items-center">
                            No Manager assigned yet
                            <Link
                              href={`/adm-dash/get-emp/${emp_id}/assign-manager/`}
                              className={
                                "hover:underline text-blue-500 hover:text-blue-700 duration-300"
                              }
                            >
                              Assign Manager
                            </Link>
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
                          <Link
                            href={`/adm-dash/get-emp/${emp_id}/assign-work/`}
                            className={
                              "hover:underline text-blue-500 hover:text-blue-700 duration-300"
                            }
                          >
                            View Work
                          </Link>
                        ) : (
                          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 justify-between items-center">
                            No Work assigned yet
                            <Link
                              href={`/adm-dash/get-emp/${emp_id}/assign-work/`}
                              className={
                                "hover:underline text-blue-500 hover:text-blue-700 duration-300"
                              }
                            >
                              Assign Work
                            </Link>
                          </dd>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href="/adm-dash/get-emp">
                  <Button
                    className={
                      "bg-blue-500 hover:bg-blue-700 duration-300 focus:ring-4 focus:ring-blue-300"
                    }
                  >
                    Back
                  </Button>
                </Link>
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

export default Page;
