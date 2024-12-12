"use client";
import { Metadata } from "next";
import EmployeeDashboard from "../components/EmployeeDashboard";

const metadata: Metadata = {
  title: "Employee Dashboard",
  description: "View your tasks, leave balance, and recent activities.",
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentDay = dayNames[new Date().getDay()];
const currentMonth = monthNames[new Date().getMonth()];
export default function EmployeeDashboardPage() {
  return (
    <>
      <main className="bg-gray-200 pt-[56px]">
        <div className="container">
          <h1 className="text-2xl font-semibold">
            Hello,{" "}
            {JSON.parse(localStorage.getItem("user") || "{}").employeeDetails
              .name || " "}
          </h1>
          <p className="text-sm text-gray-500">
            It's {currentDay}, {new Date().getDate()} {currentMonth}{" "}
            {new Date().getUTCFullYear()}
          </p>
        </div>
        <div className="mx-auto min-h-screen container py-10">
          <EmployeeDashboard />
        </div>
      </main>
    </>
  );
}
