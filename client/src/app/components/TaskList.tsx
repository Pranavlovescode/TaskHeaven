'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

type Task={
  taskId: string;
  taskName: string;
  taskDescription: string;
  status: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  allotedTime:Date;
  completionTime:Date;
}[]


export default function TaskList({ teamId }: { teamId: string }) {
  const [tasks, setTasks] = useState<Task>([{
    taskId: "",
    taskName: "",
    taskDescription: "",
    status: "",
    employeeId: "",
    employeeName: "",
    employeeEmail: "",
    allotedTime:new Date(),
    completionTime:new Date()
  }]);

  const toast = useToast();
  const getTasksForATeam = async () => {
    try {
      const tasks = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/team/tasks`,
        {
          params: {
            team_id: teamId,
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}")?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks(tasks.data);
      console.log("Tasks for team",tasks.data);
    } catch (error) {
      console.error("Error fetching tasks for team", error);
      toast.toast({
        title: "Error fetching tasks for team",
        description: "Try refreshing the page or try again later",
      })
    }
  };

  useEffect(()=>{
    getTasksForATeam();
  },[])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.taskId}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{task.taskName}</h3>
                <p className="text-sm text-muted-foreground">
                  Assigned to: {task.employeeName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Alloted Time: {new Date(task.allotedTime).toDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Completion Time: {task.completionTime ? new Date(task.completionTime).toDateString() : "Not completed"}
                </p>
              </div>
              <Badge
                className={
                  task.status === "Completed"
                    ? "bg-green-500 hover:bg-green-600"
                    : task.status === "In Progress"
                      ? "bg-orange-400 hover:"
                      : "bg-red-600 hover:bg-red-700"
                }
              >
                {task.status.toLowerCase()}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
