"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, Clock, FileText } from "lucide-react";
import { useEffect } from "react";
import { Separator } from "@radix-ui/react-select";
import Link from "next/link";

type Tasks = {
  task_id: string;
  task_name: string;
  task_description: string;
  status: string;
  alloted_time: Date;
  completion_time: Date;
  due_date: Date;
};

export default function EmployeeDashboard({ task }: { task: Tasks[] }) {
  console.log("This is task from props", task);
  useEffect(() => {}, [task]);

  const total = task.length;
  const completed = task.filter((task) => task.status === "COMPLETED").length;
  console.log("Today's date", new Date().getDate());
  console.log("Completed task date", new Date(task[1].completion_time).getDate());

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks Overview</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {completed} / {total}
          </div>
          <p className="text-xs text-muted-foreground">Tasks completed</p>
          <Progress
            value={(completed / total) * 100}
            className="mt-2 bg-gray-200"
          />
          <p className="text-xs text-muted-foreground">
            {((completed / total) * 100).toFixed(2)}% of tasks completed
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12 days</div>
          <p className="text-xs text-muted-foreground">
            Remaining vacation days
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Upcoming Meetings
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">Scheduled for today</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Recent Notifications
          </CardTitle>
          <Badge variant="secondary">4 New</Badge>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center text-sm">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              Task completed
            </li>
            <li className="flex items-center text-sm">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              Leave request approved
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 bg-gray-50">
        <CardHeader>
          <CardTitle>Current Tasks</CardTitle>
          <CardDescription>Your assigned tasks for this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {task.map((task: Tasks) => (
              <>
                <Link href={`/emp-dash/task/${task.task_id}`}>
                  <li className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span>{task.task_name}</span>
                      <p className="text-gray-400 text-sm">
                        Due Date {new Date(task.due_date).toDateString()}
                      </p>
                    </div>
                    <Badge
                      className={
                        task.status == "COMPLETED"
                          ? "bg-green-500 hover:bg-green-600"
                          : task.status == "IN PROGRESS"
                          ? "bg-orange-400 hover:bg-orange-500"
                          : "bg-red-500 hover:bg-red-600"
                      }
                    >
                      {task.status}
                    </Badge>
                  </li>
                </Link>
                <Separator className="my-4 bg-gray-200" />
              </>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 bg-gray-50">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your activities from the past week</CardDescription>
        </CardHeader>
        <CardContent>
          {task
            .filter((t: Tasks) => t.status === "COMPLETED")
            .map((completedTask: Tasks) => (
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />                  
                  {completedTask.task_name} - {new Date().getDate() - new Date(completedTask.completion_time).getDate()} days ago
                </li>                
              </ul>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
