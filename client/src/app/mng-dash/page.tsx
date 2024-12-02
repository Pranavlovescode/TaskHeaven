"use client";
import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// Register required Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ManagerDashboard() {
  // Sample data
  const radarData = {
    labels: [
      "Diversity",
      "Investment",
      "Campaign",
      "Sustainability",
      "Salary",
      "Workload",
    ],
    datasets: [
      {
        label: "Performance",
        data: [3, 4, 2, 5, 3, 4],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const tasks = [
    {
      title: "Creating new broadcast message for new Employee",
      deadline: "2 Days",
    },
    {
      title: "Creating campaign task for Digital Marketing",
      deadline: "6 Days",
    },
    { title: "Creating conference meet with stakeholders", deadline: "9 Days" },
    { title: "Move all finance files to new directory", deadline: "24 Days" },
  ];

  const employees = [
    { id: "EM-4492", name: "Bessie Cooper", status: "On-Time" },
    { id: "EM-4493", name: "Arthur Sjorgen", status: "On-Time" },
    { id: "EM-4494", name: "Jenny Wilson", status: "Late" },
    { id: "EM-4495", name: "Kathryn Murphy", status: "On-Time" },
  ];
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

  const teams = [
    {
      id: 1,
      name: "Marketing Team",
      members: [
        "/path/to/image1.jpg",
        "/path/to/image2.jpg",
        "/path/to/image3.jpg",
        "+10",
      ],
    },
    {
      id: 2,
      name: "Development Team",
      members: [
        "/path/to/image4.jpg",
        "/path/to/image5.jpg",
        "/path/to/image6.jpg",
        "+5",
      ],
    },
    // Add more team data as needed
  ];

  const currentDay = dayNames[new Date().getDay()];
  const currentMonth = monthNames[new Date().getMonth()];
  return (
    <div className=" space-y-6 md:p-12 md:pl-20">
      {/* Header Section */}
      <div className="flex justify-between items-center py-4">
        <div>
          <h1 className="text-2xl font-semibold">Hello, Arthur Sjorgen</h1>
          <p className="text-sm text-gray-500">
            It's {currentDay}, {new Date().getDate()} {currentMonth}{" "}
            {new Date().getUTCFullYear()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Link href={"/mng-dash/add-task"}>Create a Task</Link>
          </Button>
          <Button variant="outline">New Tracker</Button>
          <Button variant="secondary">Add Payroll</Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full table-auto">
                <TableCaption>
                  A list of teams under your guidance.
                </TableCaption>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold">Team Name</TableCell>
                    <TableCell className="font-bold">No. of Members</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams.map((team) => (
                    <Link href={"#"} className="w-full">
                      <TableRow key={team.id} className="hover:bg-gray-100">
                        <TableCell>{team.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {team.members.slice(0, 3).map((src, index) => (
                              <img
                                key={index}
                                src={src}
                                alt={`Member ${index + 1}`}
                                className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 shadow-md"
                              />
                            ))}
                            {team.members.length > 3 && (
                              <div className="w-8 h-8 rounded-full bg-gray-300 text-center text-sm font-medium flex items-center justify-center -ml-2 shadow-md">
                                {team.members[3]}
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    </Link>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {tasks.map((task, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  End in <span className="font-semibold">{task.deadline}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Attendance Table */}
      <div className="w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Employer Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="mt-4 ">
              <TableHead className="">
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
