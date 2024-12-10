"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

type Team = {
  team_name: string;
  team_desc: string;
  team_members: string[];
};

export default function CreateTeam() {
  const toast = useToast();
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [team, setTeam] = useState<Team>();
  const [employee, setEmployees] = useState<{ label: string; value: string }[]>([]);

  const addMember = () => {
    if (memberEmail && !members.includes(memberEmail)) {
      setMembers([...members, memberEmail]);
      setMemberEmail("");
    }
  };

  const createTeam = async () => {
    try {
      const team = {
        team_name: teamName,
        team_desc: description,
        team_members: members,
      };
      console.log("Team data", team);
      console.log(
        "token",
        JSON.parse(localStorage.getItem("user") || "{}")?.token
      );
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/team/create?mng_id=${
          JSON.parse(localStorage.getItem("user") || "{}").managerDetails
            ?.mng_id || ""
        }`,
        team,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") || "{}")?.token || ""
            }`,
          },
        }
      );
      const teamData = response.data;
      console.log("Response data", teamData);
      // alert("Team created successfully");
      toast.toast({
        title: "Team created successfully",
        description: "You can now assign tasks to your team members",
      });
      setTeamName("");
      setDescription("");
      setMembers([]);      
    } catch (error) {
      console.error("Error creating team", error);
      // alert("Error creating team");
      toast.toast({
        title: "Error creating team",
        description: "Please try again",
      });
    }
  };

  // Route for fetching the employees data
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-employee/all`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") || "{}")?.token || ""
            }`,
          },
        }
      );
      const employees = response.data;
      const employee_with_email = employees.map(
        (emp: { name: string; email: string }) => ({
          label: emp.name,
          value: emp.email,
        })
      );
      setEmployees(employee_with_email);
      console.log("Employees data", employees);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const removeMember = (email: string) => {
    setMembers(members.filter((member) => member !== email));
  };
  useEffect(() => {
    fetchEmployees();
    // console.log(employee)
  }, []);
  console.log(employee);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Your Team</CardTitle>
          <CardDescription>
            Bring your team together and start collaborating
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="teamName" className="text-sm font-medium">
              Team Name
            </label>
            <Input
              id="teamName"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe your team's purpose"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="memberEmail" className="text-sm font-medium">
              Add Team Members
            </label>
            <div className="flex space-x-2">
              <Select
                className="w-full"
                options={employee}
                value={employee.find((emp) => emp.value === memberEmail)}
                onChange={(option: { label: string; value: string } | null) => setMemberEmail(option?.value || "")}
              />
              <Button onClick={addMember} className="bg-gray-800" size="icon">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {members.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Team Members</h3>
              <div className="flex flex-wrap gap-2">
                {members.map((member, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${member}`}
                      />
                      <AvatarFallback>{member[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{member}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => removeMember(member)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gray-800" onClick={createTeam}>
            Create Team
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
