"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import LogoutMessage from "../components/LogoutMessage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, DollarSign, Users, IndianRupee } from "lucide-react";
import { UserRegistrationTable } from "../components/userRegistrationTable";
import Link from "next/link";

type HRData = {
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
  const [open, setOpen] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [empData, setEmpData] = useState<any>([]);
  const [empDataHR, setEmpDataHR] = useState<HRData>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useRouter();

  const gotoLogin = () => {
    console.log("Logout");
    setOpen(false);
    navigate.push("/");
  };

  const fetchToken = useCallback(() => {
    if (typeof window != "undefined") {
      const storedToken = localStorage.getItem("user");
      setToken(storedToken ? JSON.parse(storedToken).token : null);
    }
  }, []);

  const getHRData = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify/get-hr`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Array.isArray(response.data)) {
        setEmpDataHR(response.data);
      } else {
        console.error("Expected an array but got:", typeof response.data);
      }
    } catch (error) {
      console.error("Error fetching HR data:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const getEmployeeData = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-employee`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmpData(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  useEffect(() => {
    if (token) {
      getEmployeeData();
      getHRData();
    }
  }, [token, getEmployeeData, getHRData]);

  const pendingEmpData = empDataHR.filter(
    (emp) => emp.admin_verified === "PENDING"
  ).length;

  return (
    <>
      {token ? (
        <main className={"md:pt-[70px] mx-auto bg-gray-200 min-h-screen"}>
          <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">HR Admin Dashboard</h1>
              <Button
                asChild
                className="bg-gray-800 hover:bg-gray-600 duration-500"
              >
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
                  <div className="text-2xl font-bold flex">
                    <IndianRupee className="h-8 w-5" />
                    65,432
                  </div>
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
      ) : (
        <LogoutMessage open={open} setOpen={setOpen} gotoLogin={gotoLogin} />
      )}
    </>
  );
}
