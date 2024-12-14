"use client";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";

const metadata: Metadata = {
  title: "Task Details",
  description: "View and update task details",
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

export default function TaskDetailsPage({
  params,
}: {
  params: { task_id: string };
}) {
  const toast = useToast();
  const router = useRouter();
  const [task, setTask] = useState<Tasks[]>([
    {
      task_id: "",
      task_name: "",
      task_description: "",
      status: "",
      alloted_time: new Date(),
      completed_time: new Date(),
      due_date : new Date(),
    },
  ]);
  const handleStatusChange = async(newStatus: string) => {
    if (task) {
      setTask((prevTasks) =>
        prevTasks.map((t) =>
          t.task_id === params.task_id ? { ...t, status: newStatus } : t
        )
      );
      try {
        const statusUpdate = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-task/update`, {},{
          params:{
            task_id: params.task_id,
            status: newStatus,
          },
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}")?.token}`,
            "Content-Type": "application/json",
          }
        })
        console.log("The status update is", statusUpdate.data);
        toast.toast({
          title: "Task Updated",
          description: `Task status changed to ${newStatus}`,
        });

      } catch (error) {
        console.error("Error updating task status", error);
        toast.toast({
          title: "Error updating task status",
          description: "Try refreshing the page or try again later",
        });         
      }
      
    }
  };
  const getStatusColor = (status: Tasks["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-red-500 hover:bg-red-600";
      case "IN PROGRESS":
        return "bg-orange-500 hover:bg-orange-600";
      case "COMPLETED":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "{}");
    // const tasks = user.employeeDetails?.tasks || []; // Safely handle undefined `employeeDetails`

    setTask(() =>
      tasks.map((task: Tasks) => ({
        task_id: task.task_id,
        task_name: task.task_name,
        task_description: task.task_description,
        status: task.status,
        alloted_time: task.alloted_time,
        completed_time: task.completed_time,
        due_date: task.due_date,
      }))
    );
    console.log("The params are", params);
  }, []);

  // console.log(foundTask)
  // console.log(params.taskId)
  return (
    <main className="bg-gray-200 min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Task Details</h1>
        {task
          .filter((t) => t.task_id === params.task_id)
          .map((foundTask) => (
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>{foundTask.task_name}</CardTitle>
                <CardDescription>Task ID: {foundTask.task_id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Description</h3>
                    <p>{foundTask.task_description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Status</h3>
                    <Select
                      value={foundTask.status}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue>
                          <Badge
                            className={`${getStatusColor(
                              foundTask.status
                            )} text-white`}
                          >
                            {foundTask.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Not Started</SelectItem>
                        <SelectItem value="IN PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h3 className="font-semibold">Due Date</h3>
                    <p>{new Date(foundTask.due_date).toDateString()}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-gray-800 hover:bg-gray-700 duration-500" onClick={() => router.push("/emp-dash")}>
                  Back to All Tasks
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </main>
  );
}
