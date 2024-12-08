'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

async function getTeamTasks(teamId: string) {
  // This is a mock function. In a real application, you would fetch this data from your API or database.
  return [
    {
      id: 1,
      title: "Implement user authentication",
      status: "In Progress",
      assignee: "John Doe",
    },
    {
      id: 2,
      title: "Design new landing page",
      status: "Pending",
      assignee: "Bob Johnson",
    },
    {
      id: 3,
      title: "Optimize database queries",
      status: "Completed",
      assignee: "Jane Smith",
    },
    {
      id: 4,
      title: "Write API documentation",
      status: "In Progress",
      assignee: "Jane Smith",
    },
  ];
}

export default function TaskList({ teamId }: { teamId: string }) {
  const tasks = getTeamTasks(teamId);
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
      // const tasksData = tasks.data.task_id;
      // const tasksDataArray = [];
      // tasksDataArray.push(tasks.data)
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
        {/* <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Assigned to: {task.assignee}
                </p>
              </div>
              <Badge
                className={
                  task.status === "Completed"
                    ? "bg-green-500"
                    : task.status === "In Progress"
                      ? "bg-orange-400"
                      : "bg-red-600"
                }
              >
                {task.status}
              </Badge>
            </div>
          ))}
        </div> */}
      </CardContent>
    </Card>
  );
}
