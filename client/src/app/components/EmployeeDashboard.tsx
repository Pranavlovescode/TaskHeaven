"use client";
import React, { useEffect } from "react";
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
import { Separator } from "@radix-ui/react-select";
import Link from "next/link";

type Tasks = {
  task_id: string;
  task_name: string;
  task_description: string;
  status: string;
  alloted_time: Date;
  completed_time?: Date; // Make this optional and use the name from page.tsx
  due_date: Date;
};

export default function EmployeeDashboard({ task }: { task: Tasks[] }) {
  console.log("This is task from props", task);
  useEffect(() => {}, [task]);

  // Ensure tasks is an array and has at least one item
  const validTasks = Array.isArray(task) ? task : [];
  const total = validTasks.length;
  const completed = validTasks.filter((t) => t.status === "COMPLETED").length;
  
  // Safely log without assuming task[1] exists
  if (validTasks.length > 1) {
    const completionTime = validTasks[1].completed_time || validTasks[1].completed_time;
    if (completionTime) {
      console.log("Today's date", new Date().getDate());
      console.log("Completed task date", new Date(completionTime).getDate());
    }
  }

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
            value={total > 0 ? (completed / total) * 100 : 0}
            className="mt-2 bg-gray-200"
          />
          <p className="text-xs text-muted-foreground">
            {total > 0 ? ((completed / total) * 100).toFixed(2) : "0"}% of tasks completed
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
          {validTasks.length > 0 ? (
            <ul className="space-y-2">
              {validTasks.map((t: Tasks, index) => (
                <React.Fragment key={t.task_id || index}>
                  <Link href={`/emp-dash/task/${t.task_id}`}>
                    <li className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span>{t.task_name}</span>
                        <p className="text-gray-400 text-sm">
                          Due Date {new Date(t.due_date).toDateString()}
                        </p>
                      </div>
                      <Badge
                        className={
                          t.status === "COMPLETED"
                            ? "bg-green-500 hover:bg-green-600"
                            : t.status === "IN PROGRESS"
                            ? "bg-orange-400 hover:bg-orange-500"
                            : "bg-red-500 hover:bg-red-600"
                        }
                      >
                        {t.status}
                      </Badge>
                    </li>
                  </Link>
                  <Separator className="my-4 bg-gray-200" />
                </React.Fragment>
              ))}
            </ul>
          ) : (
            <p>No tasks assigned yet.</p>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2 bg-gray-50">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your activities from the past week</CardDescription>
        </CardHeader>
        <CardContent>
          {validTasks
            .filter((t: Tasks) => t.status === "COMPLETED")
            .map((completedTask: Tasks, index) => {
              // Safely handle the completion time property by checking both property names
              const completionTime = completedTask.completed_time || completedTask.completed_time;
              if (!completionTime) return null; // Skip if no completion time
              
              const daysSince = Math.max(
                0,
                new Date().getDate() - new Date(completionTime).getDate()
              );
              
              return (
                <ul key={index} className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />                  
                    {completedTask.task_name} - {daysSince} days ago
                  </li>                
                </ul>
              );
            })}
            {validTasks.filter(t => t.status === "COMPLETED" && (t.completed_time || t.completed_time)).length === 0 && (
              <p>No completed activities found.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
