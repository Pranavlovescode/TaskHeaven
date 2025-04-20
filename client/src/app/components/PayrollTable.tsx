"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { IndianRupee } from "lucide-react";

type Payroll = {
  payroll_id: string;
  emp_id: string;
  name: string;
  ctc: number;
  basic_pay: number;
  bonus: number;
  deduction: number;
  home_rental_allowance: number;
  other_allowance: number;
  gross_salary_before_deduction: number;
  net_salary_after_deduction: number;
  date_of_salary: string;
  employeeDetails: {
    name: string;
    emp_id: string;
  };
  status: "Paid" | "Pending" | "Failed";
};

// const mockPayrolls: Payroll[] = [
//   {
//     id: "1",
//     employeeName: "John Doe",
//     employeeId: "EMP001",
//     salary: 5000,
//     bonus: 500,
//     deductions: 1000,
//     netPay: 4500,
//     paymentDate: "2023-05-31",
//     status: "Paid",
//   },
//   {
//     id: "2",
//     employeeName: "Jane Smith",
//     employeeId: "EMP002",
//     salary: 6000,
//     bonus: 600,
//     deductions: 1200,
//     netPay: 5400,
//     paymentDate: "2023-05-31",
//     status: "Pending",
//   },
//   {
//     id: "3",
//     employeeName: "Bob Johnson",
//     employeeId: "EMP003",
//     salary: 5500,
//     bonus: 550,
//     deductions: 1100,
//     netPay: 4950,
//     paymentDate: "2023-05-31",
//     status: "Failed",
//   },
// ];

export function PayrollTable() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([
    {
      payroll_id: "",
      emp_id: "",
      name: "",
      ctc: 0,
      basic_pay: 0,
      bonus: 0,
      deduction: 0,
      home_rental_allowance: 0,
      other_allowance: 0,
      gross_salary_before_deduction: 0,
      net_salary_after_deduction: 0,
      date_of_salary: "",
      status: "Pending",
      employeeDetails: {
        name: "",
        emp_id: "",
      },
    },
  ]);

  const fetchPayrolls = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/payroll`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(window.localStorage.getItem("user") || "{}").token
          }`,
        },
      }
    );
    const data = await response.data;
    console.log("Payroll data:", data);
    setPayrolls(data);
    window.localStorage.setItem("payrolls", JSON.stringify(data));
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>CTC</TableHead>
            <TableHead>Basic Pay</TableHead>
            <TableHead>Bonus</TableHead>
            <TableHead>HRA</TableHead>
            <TableHead>Other Allowance</TableHead>
            <TableHead>Deductions</TableHead>
            <TableHead>Gross Salary</TableHead>
            <TableHead>Net Salary</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrolls.map((payroll) => (
            <TableRow className={""} key={payroll.payroll_id}>
              <TableCell className="font-medium">
                {payroll.employeeDetails?.name}
              </TableCell>
              <TableCell>{payroll.employeeDetails?.emp_id}</TableCell>
              <TableCell className="">
                <span className="flex items-center">
                  <IndianRupee className="mr-1 h-4 w-4" />
                  {payroll.ctc}
                </span>
              </TableCell>
              <TableCell className="">
                <span className="flex items-center">
                  <IndianRupee className="mr-1 h-4 w-4" />
                  {payroll.basic_pay}
                </span>
              </TableCell>
              <TableCell className="">
                <span className="flex items-center">
                  <IndianRupee className="mr-1 h-4 w-4" />
                  {payroll.bonus}
                </span>
              </TableCell>
              <TableCell className="">
                <span className="flex items-center">
                  <IndianRupee className="mr-1 h-4 w-4" />
                  {payroll.home_rental_allowance}
                </span>
              </TableCell>
              <TableCell className="">
                <span className="flex items-center">
                  <IndianRupee className="mr-1 h-4 w-4" />
                  {payroll.other_allowance}
                </span>
              </TableCell>
              <TableCell className="">
                <span className="flex items-center">
                  <IndianRupee className="mr-1 h-4 w-4" />
                  {payroll.deduction}
                </span>
              </TableCell>
              <TableCell className="">
                <span className="flex items-center">
                  <IndianRupee className="mr-1 h-4 w-4" />
                  {payroll.gross_salary_before_deduction}
                </span>
              </TableCell>
              <TableCell className="">
                <span className="flex items-center">
                  <IndianRupee className="mr-1 h-4 w-4" />
                  {payroll.net_salary_after_deduction}
                </span>
              </TableCell>
              <TableCell className="">
                {payroll.date_of_salary.split("T")[0]}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    payroll.status === "Paid"
                      ? "bg-green-500 hover:bg-green-600 duration-500"
                      : "bg-red-500 hover:bg-red-600 duration-500"
                  }
                >
                  {payroll.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
