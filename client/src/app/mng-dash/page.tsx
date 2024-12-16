"use client";
import React, { useEffect } from "react";
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
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  PieChart,
  Users,
} from "lucide-react";
import LeaveManagementDashboard from "../components/LeaveManagement";

// Register required Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type Team = {
  team_id: string;
  team_name: string;
  mng_id: string;
  members: string[];
}[];

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

  const [getTeams, setTeams] = React.useState<Team>([]);

  const currentDay = dayNames[new Date().getDay()];
  const currentMonth = monthNames[new Date().getMonth()];

  // Code for fetching teams

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/team`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") || "{}").token || " "
            }`,
          },
        }
      );
      const data = response.data;
      localStorage.setItem("teams", JSON.stringify(data));
      setTeams(
        data.map(
          (team: {
            team_id: string;
            team_name: string;
            team_members: string[];
            managerDetails: { mng_id: string };
            mng_id: string;
          }) => ({
            team_id: team.team_id,
            team_name: team.team_name,
            members: team.team_members,
            mng_id: team.managerDetails.mng_id,
          })
        )
      );
      console.log("Teams", data);
    };
    fetchTeams();
  }, []);

  // console.log(getTeams);

  return (
    <div className="bg-gray-200 space-y-6 md:p-12 md:pl-20 mt-[52px]">
      {/* Header Section */}
      <div className="flex justify-between items-center py-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Hello,{" "}
            {JSON.parse(localStorage.getItem("user") || "{}").managerDetails
              .name || " "}
          </h1>
          <p className="text-sm text-gray-500">
            It&apos;s {currentDay}, {new Date().getDate()} {currentMonth}{" "}
            {new Date().getUTCFullYear()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gray-800">
            <Link href={"/mng-dash/add-team"}>Create a Team</Link>
          </Button>
          {/* <Button variant="outline">
            <Link href={"/mng-dash/add-team"}>Create a Team</Link>
          </Button> */}
          <Button
            variant="secondary"
            className="bg-gray-400 text-white hover:bg-gray-500 duration-300"
          >
            <Link href="/mng-dash/send-email">Send Email</Link>
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto w-full">
              <Table className="w-full">
                <TableCaption>
                  A list of teams under your guidance.
                </TableCaption>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold md:w-[250px]">
                      Team Name
                    </TableCell>
                    <TableCell className="font-bold">No. of Members</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getTeams
                    .filter(
                      (team) =>
                        team.mng_id ===
                          JSON.parse(localStorage.getItem("user") || "{}")
                            .managerDetails.mng_id || " "
                    )
                    .map((team,index) => (
                      <Link
                        key={index}
                        href={`mng-dash/team-info/${team.team_id}`}
                        className="w-full"
                      >
                        <TableRow
                          key={team.team_id}
                          className="hover:bg-gray-100 w-full"
                        >
                          <TableCell className="md:w-[250px]">
                            {team.team_name}
                          </TableCell>
                          <TableCell className="text-left">
                            <div className="flex items-center justify-start space-x-2 w-full">
                              {team.members &&
                                team.members
                                  .slice(0, 3)
                                  .map((member, index) => (
                                    <Avatar className="h-6 w-6" key={index}>
                                      <AvatarImage
                                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${member}`}
                                      />
                                      <AvatarFallback>
                                        {member[0].toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                  ))}
                              {team.members && team.members.length > 3 && (
                                <div className="w-8 h-8 rounded-full bg-gray-300 text-center text-sm font-medium flex items-center justify-center -ml-2 shadow-md">
                                  {team.members.length - 3}+
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
        {/* <div className="col-span-2 grid grid-cols-2 gap-4">
          {tasks.map((task, index) => (
            <Card key={index} className="bg-gray-50">
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
        </div> */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {/* Task Overview */}
          <Card className="bg-gray-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Task Overview
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Completed Tasks</p>
                  <Progress value={66} className="mt-2 bg-gray-200" />
                  <p className="text-xs text-muted-foreground mt-1">
                    66% (120/180 tasks)
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">In Progress</p>
                  <Progress value={25} className="mt-2 bg-gray-200" />
                  <p className="text-xs text-muted-foreground mt-1">
                    25% (45/180 tasks)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card className="bg-gray-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Team Performance
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Requirements Team Alpha
                    </p>
                    <p className="text-xs text-muted-foreground">
                      92% efficiency
                    </p>
                  </div>
                  <PieChart className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Development Team</p>
                    <p className="text-xs text-muted-foreground">
                      87% efficiency
                    </p>
                  </div>
                  <PieChart className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="bg-gray-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Deadlines
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-orange-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Project Alpha Review</p>
                    <p className="text-xs text-muted-foreground">
                      Due in 2 days
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-red-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Sprint Planning</p>
                    <p className="text-xs text-muted-foreground">
                      Due tomorrow
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Activity */}
          <Card className="bg-gray-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Activity
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <div>
                    <p className="text-sm">New team member added</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <div>
                    <p className="text-sm">Project milestone completed</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Attendance Table */}
      {/* <div className="w-full">
        <Card className="w-full bg-gray-50">
          <CardHeader>
            <CardTitle>Leave Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="mt-4 ">
              <TableHead className="w-full">
                <TableRow className="w-full">
                  <TableHead className="w-full">Employee ID</TableHead>
                  <TableHead className="w-full">Full Name</TableHead>
                  <TableHead className="w-full">Status</TableHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee, index) => (
                  <TableRow key={index} className="w-full">
                    <TableCell className="w-full">{employee.id}</TableCell>
                    <TableCell className="w-full">{employee.name}</TableCell>
                    <TableCell className="w-full">{employee.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>  */}
      <LeaveManagementDashboard />
    </div>
  );
}
