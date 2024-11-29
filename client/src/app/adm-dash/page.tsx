"use client";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import LogoutMessage from "../components/LogoutMessage";
import { Card } from "@/components/ui/card";

type Data = {
  hrId: string;
  hr_name: string;
  hremail: string;
  hr_contact: string;
  hr_role: string;
  hr_designation: string;
  hr_doj: Date;
  hr_address: string;
  hr_age: number;
  admin_verified: string;
}[];

export default function Page() {
  const token = localStorage.getItem("user");
  const [open, setOpen] = React.useState(true);
  const dataToken = token ? JSON.parse(token) : null;
  const navigate = useRouter();
  const gotoLogin = () => {
    console.log("Logout");
    setOpen(false);
    navigate.push("/");
  };
  const [empData, setEmpData] = useState<any>([]);
  const [isHRDataFetched, setIsHRDataFetched] = useState<boolean>(false);
  const [empDataHR, setEmpDataHR] = useState<Data>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [verifiedData, setVerifiedData] = useState<any>();

  const getHRData = async () => {
    if (dataToken) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify/get-hr`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${dataToken.token}`,
            },
          }
        );
        console.log("API Response:", response.data); // Check the structure here
        if (Array.isArray(response.data)) {
          setEmpDataHR(response.data);
          setIsHRDataFetched(true); // Set data only if it's an array
        } else {
          console.error("Expected an array but got:", typeof response.data);
        }
      } catch (error) {
        console.error("Error fetching HR data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getEmployeeData = async () => {
    if (dataToken) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-employee`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${dataToken.token}`,
          },
        }
      );
      const data: AxiosResponse = await response.data;
      setEmpData(data);
      console.log(data);
    }
  };

  const verifyUser = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify/${data.hr_role}/${data.hrId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dataToken.token}`,
          },
        }
      );
      const responseData: AxiosResponse = response.data;
      console.log("User Verified", responseData);
      setVerifiedData(responseData);
      alert("User Verified Successfully");
      // navigate.push("/adm-dash");
      setIsHRDataFetched(true);
    } catch (error) {
      console.error("Error verifying user", error);
    }
  };

  useEffect(() => {
   
    getEmployeeData();
    if (!isHRDataFetched) {
      getHRData();
    }
    const intervalId = setInterval(()=>{
      getHRData();
    },10000)
    // setEmpDataHR((prevData) => {
    //   return [...prevData, ...empDataHR]; // Append new data to the previous state
    // });
    return () => {
      clearInterval(intervalId);
    }
  }, [isHRDataFetched, empDataHR]);
  return (
    <>
      {dataToken ? (
        <>
          <main className={"md:mt-[60px] ml-20 mx-auto"}>
            <div className={"text-3xl font-extrabold p-4"}>
              List of new Users
            </div>
            <div className={"px-4 text-gray-500"}>
              Verify the below new registrations.
            </div>
            <div className={"w-full mt-4 md:p-12 mx-auto"}>
              <div className={""}>
                <div>
                  {loading ? (
                    <div>Loading....</div>
                  ) : empDataHR.some(
                      (data) => data.admin_verified === "PENDING"
                    ) ? (
                    <Card>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead className="text-center">
                              Full Name
                            </TableHead>
                            <TableHead className="text-center">
                              Email Address
                            </TableHead>
                            <TableHead className="text-center">
                              Mobile Number
                            </TableHead>
                            <TableHead className="text-center">Role</TableHead>
                            <TableHead className="text-center">
                              Designation
                            </TableHead>
                            <TableHead className="text-center">
                              Date of Joining
                            </TableHead>
                            <TableHead className="text-center">
                              Address
                            </TableHead>
                            <TableHead className="text-center">Age</TableHead>
                            <TableHead className="text-center">
                              Action
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Array.isArray(empDataHR) &&
                            empDataHR
                              .filter((data) => {
                                // console.log("Inspecting data:", data);
                                return data?.admin_verified === "PENDING"; // Safely access properties
                              })
                              .map((data, index) => (
                                <>
                                  <TableRow key={index}>
                                    <TableCell>{data.hrId}</TableCell>
                                    <TableCell>{data.hr_name}</TableCell>
                                    <TableCell>{data.hremail}</TableCell>
                                    <TableCell>{data.hr_contact}</TableCell>
                                    <TableCell>{data.hr_role}</TableCell>
                                    <TableCell>{data.hr_designation}</TableCell>
                                    <TableCell>
                                      {new Date(
                                        data.hr_doj
                                      ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{data.hr_address}</TableCell>
                                    <TableCell>{data.hr_age}</TableCell>
                                    <TableCell className="text-right flex flex-col md:flex-row justify-center items-center">
                                      <Button
                                        onClick={() => {
                                          verifyUser(empDataHR[index]);
                                          console.log(index);
                                        }}
                                        className="md:mr-3 mb-2 md:mb-0"
                                      >
                                        Verify
                                      </Button>
                                      <Button>Reject</Button>
                                    </TableCell>
                                  </TableRow>
                                </>
                              ))}
                        </TableBody>
                      </Table>
                    </Card>
                  ) : (
                    <p>No new registration</p>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          <LogoutMessage open={open} setOpen={setOpen} gotoLogin={gotoLogin} />
        </>
      )}
    </>
  );
}
