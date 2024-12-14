"use client";
import { Metadata } from "next";
import EmployeeDashboard from "../components/EmployeeDashboard";
import { useEffect, useState } from "react";
import axios from "axios";

const metadata: Metadata = {
  title: "Employee Dashboard",
  description: "View your tasks, leave balance, and recent activities.",
};

type Tasks = {
  task_id: string;
  task_name: string;
  task_description: string;
  status: string;
  alloted_time: Date;
  completed_time: Date;
  due_date: Date;
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
  const [task, setTask] = useState<Tasks[]>([
    {
      task_id: "",
      task_name: "",
      task_description: "",
      status: "",
      alloted_time: new Date(),
      completed_time: new Date(),
      due_date: new Date(),
    },
  ]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/team/employee`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") || "{}").token
            }`,
          },
          params: {
            email: JSON.parse(localStorage.getItem("user") || "{}")
              .employeeDetails.email,
          },
        }
      );
      console.log("The response is ", response.data);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    // fetchTasks();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const tasks = user.employeeDetails?.tasks || []; // Safely handle undefined `employeeDetails`

    setTask(() =>
      tasks.map((task:Tasks) => ({
        task_id: task.task_id,
        task_name: task.task_name,
        task_description: task.task_description,
        status: task.status,
        alloted_time: task.alloted_time,
        completed_time: task.completed_time,
        due_date: task.due_date,
      }))
    );
  }, []);

  console.log("The tasks are ", task);
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
          <EmployeeDashboard task={task} />
        </div>
      </main>
    </>
  );
}
