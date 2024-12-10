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

// const initialLeaveRequests: LeaveRequest[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     startDate: "2024-01-15",
//     endDate: "2024-01-20",
//     type: "Vacation",
//     status: "Pending",
//   },
//   {
//     id: "2",
//     employeeName: "Jane Smith",
//     startDate: "2024-02-01",
//     endDate: "2024-02-03",
//     type: "Sick Leave",
//     status: "Approved",
//   },
//   {
//     id: "3",
//     employeeName: "Bob Johnson",
//     startDate: "2024-03-10",
//     endDate: "2024-03-15",
//     type: "Vacation",
//     status: "Rejected",
//   },
// ];

export default function LeaveManagementDashboard() {
  const toast = useToast();
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

    const changeStatus = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/leave/change-status`,
      {},
      {
        params: { leave_id, status: newStatus },
        headers:{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token || " "}`,
          "Content-Type": "application/json",
        }
      }
    );
    console.log("Change Status", changeStatus.data);
    toast.toast({
      title:"Successfully Updated status",
      description: `Leave request status updated to ${newStatus} and respective employee has been notified via email.`,
    })
  };

  const fetchAllLeaveRequests = async () => {
    const leave = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/leave`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token || " "}`,
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
  };

  useEffect(() => {
    fetchAllLeaveRequests();
  }, []);

  // const handleNewRequest = () => {
  //   if (
  //     newRequest.employeeName &&
  //     newRequest.startDate &&
  //     newRequest.endDate &&
  //     newRequest.type
  //   ) {
  //     setLeaveRequests((requests) => [
  //       ...requests,
  //       {
  //         id: (requests.length + 1).toString(),
  //         ...(newRequest as LeaveRequest),
  //         status: "Pending",
  //       },
  //     ]);
  //     setNewRequest({});
  //   }
  // };

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
      {/* 
      <Card>
        <CardHeader>
          <CardTitle>Add New Leave Request</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Request</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Leave Request</DialogTitle>
                <DialogDescription>
                  Enter the details for the new leave request here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newRequest.employeeName || ""}
                    onChange={(e) => setNewRequest({ ...newRequest, employeeName: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">
                    Start Date
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newRequest.startDate || ""}
                    onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end-date" className="text-right">
                    End Date
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={newRequest.endDate || ""}
                    onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Input
                    id="type"
                    value={newRequest.type || ""}
                    onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleNewRequest}>Add Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card> */}
    </div>
  );
}
