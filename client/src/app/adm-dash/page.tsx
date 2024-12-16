"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import LogoutMessage from "../components/LogoutMessage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, DollarSign, Users } from "lucide-react";
import { UserRegistrationTable } from "../components/userRegistrationTable";
import Link from "next/link";
import { IndianRupee } from "lucide-react";

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
  const [open, setOpen] = React.useState(true);
  const [token, setToken] = React.useState<any>();
  
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

  const pendingEmpData = empDataHR.filter((emp) => emp.admin_verified === "PENDING").length;

  useEffect(() => {
    const token = localStorage.getItem("user");
    setToken(token);
    getEmployeeData();
    if (!isHRDataFetched) {
      getHRData();
    }
    console.log(empData);
  }, [isHRDataFetched, empDataHR]);
  return (
    <>
      {dataToken ? (
        <>
          <main className={"md:pt-[70px] mx-auto bg-gray-200 min-h-screen"}>
            <div className="container mx-auto p-6 space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">HR Admin Dashboard</h1>
                <Button asChild className="bg-gray-800 hover:bg-gray-600 duration-500" >
                  <Link href="/adm-dash/payroll">
                    <DollarSign className="mr-2 h-4 w-4" /> Manage Payroll
                  </Link>
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Employees
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">
                      +2% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Payroll
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,234,567</div>
                    <p className="text-xs text-muted-foreground">
                      +5% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Salary
                    </CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex"><IndianRupee className="h-8 w-5" />65,432</div>
                    <p className="text-xs text-muted-foreground">
                      +1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Approvals
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{pendingEmpData}</div>
                    <p className="text-xs text-muted-foreground">
                      -3 from last week
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>New User Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserRegistrationTable employeeData={empDataHR} />
                </CardContent>
              </Card>
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
