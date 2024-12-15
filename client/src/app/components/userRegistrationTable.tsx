"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import axios, { AxiosResponse } from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  department: string;
  registrationDate: string;
};

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    department: "Marketing",
    registrationDate: "2023-06-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    department: "Engineering",
    registrationDate: "2023-06-02",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    department: "Sales",
    registrationDate: "2023-06-03",
  },
];

export function UserRegistrationTable({ employeeData }: any) {
  console.log(employeeData);
  const token = localStorage.getItem("user");
  const dataToken = token ? JSON.parse(token) : null;
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [verifiedData, setVerifiedData] = useState<any>();
  const [isHRDataFetched, setIsHRDataFetched] = useState<boolean>(false);
  const handleApprove = (userId: string) => {
    // In a real application, you would call an API to approve the user
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleReject = (userId: string) => {
    // In a real application, you would call an API to reject the user
    setUsers(users.filter((user) => user.id !== userId));
  };

  const verifyUser = async (data: any) => {
    console.log(dataToken.adminDetails.adm_id);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify/${data.hr_role}/${data.hrId}/${dataToken.adminDetails.adm_id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dataToken.token}`,
          },
          withCredentials: true, // Required for cookies && sessions
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

  const rejectUser = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reject/user/${data.hrId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dataToken.token}`,
          },
        }
      );
      const responseData: AxiosResponse = response.data;
      console.log("User Rejected", responseData);
      alert("User Rejected Successfully");
      setIsHRDataFetched(true);
    } catch (error) {
      console.error("Error rejecting user", error);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
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
        {Array.isArray(employeeData) &&
          employeeData
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
                    {new Date(data.hr_doj).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{data.hr_address}</TableCell>
                  <TableCell>{data.hr_age}</TableCell>
                  <TableCell className="text-right flex flex-col md:flex-row items-center">
                    <Button
                      className="bg-gray-800 hover:bg-gray-600 duration-500 md:mr-3 mb-2 md:mb-0"
                      onClick={() => {
                        verifyUser(employeeData[index]);
                        console.log(index);
                      }}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        rejectUser(employeeData[index]);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
      </TableBody>
    </Table>
  );
}
