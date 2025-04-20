"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

type LeaveRequest = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  status: "Pending" | "Approved" | "Rejected";
};

export default function LeaveManagementDashboard() {
  const toast = useToast();
  const [user, setUser] = useState<any>(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: "",
      name: "",
      startDate: "",
      endDate: "",
      type: "",
      status: "Pending",
    },
  ]);
  const [newRequest, setNewRequest] = useState<Partial<LeaveRequest>>({});

  // Get user data safely after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(userData);
    }
  }, []);

  const handleStatusChange = async (
    leave_id: string,
    newStatus: "Approved" | "Rejected"
  ) => {
    setLeaveRequests((requests) =>
      requests.map((request) =>
        request.id === leave_id ? { ...request, status: newStatus } : request
      )
    );
    console.log(leave_id, newStatus);

    try {
      const changeStatus = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leave/change-status`,
        {},
        {
          params: { leave_id, status: newStatus },
          headers: {
            Authorization: `Bearer ${user?.token || ""}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Change Status", changeStatus.data);
      toast.toast({
        title: "Successfully Updated status",
        description: `Leave request status updated to ${newStatus} and respective employee has been notified via email.`,
      });
    } catch (error) {
      console.error("Error updating leave status:", error);
      toast.toast({
        title: "Error",
        description: "Failed to update leave status",
        variant: "destructive",
      });
    }
  };

  const fetchAllLeaveRequests = async () => {
    if (!user?.token) return;

    try {
      const leave = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leave`,
        {
          headers: {
            Authorization: `Bearer ${user.token || ""}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Leave Requests", leave.data);
      setLeaveRequests(
        leave.data.map((request: any) => ({
          id: request.leave_id,
          name: request.employeeDetails.name,
          startDate: request.start_date,
          endDate: request.end_date,
          type: request.leave_type,
          status: request.status,
        }))
      );
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllLeaveRequests();
    }
  }, [user]);

  return (
    <div className="space-y-4">
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>Manage employee leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        request.status === "Approved"
                          ? "bg-green-500"
                          : request.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-orange-400"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.status === "Pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2 bg-gray-800 text-gray-200 hover:bg-gray-900 hover:text-gray-100"
                          onClick={() =>
                            handleStatusChange(request.id, "Approved")
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-gray-400 hover:bg-gray-300 hover:text-gray-800 text-gray-900"
                          onClick={() =>
                            handleStatusChange(request.id, "Rejected")
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
