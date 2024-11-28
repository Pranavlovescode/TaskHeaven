"use client";

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
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import LogoutMessage from "../components/LogoutMessage";
import { Card } from "@/components/ui/card";

type Data = [{
  hr_id: string;
  hr_name: string;
  hr_email: string;
  hr_contact: string;
  hr_role: string;
  hr_designation: string;
  hr_doj: Date
  hr_address: string
  hr_age: number
}]



export default function Page() {
  const token = localStorage.getItem("user");
  const [open, setOpen] = React.useState(true);
  const dataToken = token ? JSON.parse(token) : null;
  const navigate = useRouter();
  const gotoLogin = () => {
    console.log("Logout");
    setOpen(false);
    navigate.push('/');
  };
  const [empData, setEmpData] = useState<any>([]);
  const [empDataHR, setEmpDataHR] = useState<Data>([
    {
      hr_id: "",
      hr_name: "",
      hr_email: "",
      hr_address:"",
      hr_contact: "",
      hr_role: "",
      hr_designation: "",
      hr_doj: new Date(),
      hr_age:0
    }
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  const getHRData = async () => {
    if (dataToken) {
      setLoading(false);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify/get-hr`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${dataToken.token}`,
          },
        });
        const data: Data = await response.data;
        setEmpDataHR(data);
        console.log(data);
      } catch (error) {
        console.log("Some error occured while fetching HR data", error);
      }
    }
  }
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
    getHRData();
  }, []);
  return (
    <>
      {dataToken ? (
        <>
          <main className={"md:mt-[60px] ml-20 mx-auto"}>
            <div className={"text-3xl font-extrabold p-4"}>List of new Users</div>
            <div className={"px-4 text-gray-500"}>Verify the below new registrations.</div>
            <div className={"w-full mt-4 md:p-12"}>
              <div className={"mx-auto"}>
                <div>
                  {loading ? (<div>Loading....</div>) : (
                    <Card>
                      <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                          <TableRow>
                            {/* {empDataHR.map((data:any)=>(
                              <TableHead>{data}</TableHead>
                            ))} */}
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead className="text-center">Full Name</TableHead>
                            <TableHead className="text-center">Email Address</TableHead>
                            <TableHead className="text-center">Mobile Number</TableHead>
                            <TableHead className="text-center">Role</TableHead>
                            <TableHead className="text-center">Designation</TableHead>
                            <TableHead className="text-center">Date of Joining</TableHead>
                            <TableHead className="text-center">Address</TableHead>
                            <TableHead className="text-center">Age</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {empDataHR.map((data) => (
                            <TableRow key={data.hr_id}>
                              <TableCell>{data.hr_id}</TableCell>
                              <TableCell>{data.hr_name}</TableCell>
                              <TableCell>{data.hr_email}</TableCell>
                              <TableCell>{data.hr_contact}</TableCell>
                              <TableCell>{data.hr_role}</TableCell>
                              <TableCell>{data.hr_designation}</TableCell>
                              <TableCell>{new Date(data.hr_doj).toLocaleDateString()}</TableCell>
                              <TableCell>{data.hr_address}</TableCell>
                              <TableCell>{data.hr_age}</TableCell>
                              <TableCell className="text-right flex flex-col md:flex-row justify-center items-center">
                                <Button className="md:mr-3">
                                  Verify
                                </Button>
                                <Button>
                                  Reject
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  )}
                </div>
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
