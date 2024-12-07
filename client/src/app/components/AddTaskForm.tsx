"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

type Team = {
  name: string;
  description: string;
  members: [
    {
      id: string;
      name: string;
    },
  ];
};

export default function AddTaskForm({ teamId }: { teamId: string }) {
  const toast = useToast(); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [assignee, setAssignee] = useState("");
  const [task, setTask] = useState([]);
  const [team, setTeam] = useState<Team>({
    name: "",
    description: "",
    members: [
      {
        id: "",
        name: "",
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log("New task:", { title, description, status });
  
    try {
      // Add task to the database
      const taskAddingToDatabaseResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-task`,
        {
          task_name: title,
          task_description: description,
          status: status,
        },
        {
          params: {
            mng_id: JSON.parse(localStorage.getItem("user") || "{}")
              .managerDetails?.mng_id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}")?.token}`,
          },
        }
      );
  
      console.log("Task added to database:", taskAddingToDatabaseResponse.data);
  
      const taskId = taskAddingToDatabaseResponse.data.taskDetails?.task_id;
  
      if (taskId) {
        // Assign the task to the employee
        try {
          const taskAssigningToEmployee = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-employee/assign-task`,
            [taskId], // Pass the task ID array
            {
              params: {
                email: assignee,
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}")?.token}`,
              },
            }
          );
  
          console.log("Task assigned to employee:", taskAssigningToEmployee.data);
        } catch (error) {
          console.error("Error occurred while assigning task to employee:", error);
        }
      }
  
      // Show success notification
      toast.toast({
        title: "Task added",
        description: `New task "${title}" has been assigned to ${assignee}.`,
      });
  
      // Reset form fields
      setTitle("");
      setDescription("");
      setAssignee("");
    } catch (error) {
      console.error("Error adding task to database:", error);
      // Show error notification
      toast.toast({
        title: "Error adding task",
        description:"An error occurred while adding the task.",
      });
    }
  };
  
  useEffect(() => {
    const localStorageTeams = JSON.parse(
      localStorage.getItem("selected-team") || "[]"
    );
    console.log("Team details from local storage", localStorageTeams);
    setTeam(localStorageTeams);
    // console.log("team",team)
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Task Title
            </label>
            <Input
              id="task_name"
              name="task_name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="task_description"
              name="task_description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="assignee" className="text-sm font-medium">
              Assignee
            </label>
            <Select value={assignee} onValueChange={setAssignee} required>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {/* Mapping the members in a team */}
                {team.members &&
                  team.members.map((member) => (
                    <SelectItem value={member.id}>{member.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
