"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  // role: string;
}

interface Team {
  team_id: string;
  team_name: string;
  team_desc: string;
  team_members: string[];
}

interface TeamDetails {
  name: string;
  description: string;
  members: TeamMember[];
}

function getTeamDetails(
  teamId: string,
  localStorageTeams: Team[]
): TeamDetails | null {
  console.log("Local storage teams are ", localStorageTeams);
  const team = Array.isArray(localStorageTeams)
    ? localStorageTeams.find((team) => team.team_id === teamId)
    : null;
  console.log("team found is ", team);
  if (!team) return null;

  return {
    name: team.team_name,
    description: team.team_desc,
    members: team.team_members.map((member) => ({
      id: member,
      name: member,
      // role: "Developer"
    })),
  };
}

export default function TeamDetails({ teamId }: { teamId: string }) {
  const [team, setTeam] = useState<TeamDetails | null>(null);
  console.log(teamId);             // For debugging purposes
  useEffect(() => {
    const localStorageTeams = JSON.parse(window.localStorage.getItem("teams") || "[]");
    const teamDetails = getTeamDetails(teamId, localStorageTeams);
    console.log("Team details",teamDetails);      // For debugging purposes
    setTeam(teamDetails);
    window.localStorage.setItem("selected-team", JSON.stringify(teamDetails));
  }, [teamId]);

  if (!team) {
    return (
      <Card>
        <CardContent>Loading team details...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{team.description}</p>
        <h3 className="text-lg font-semibold mb-2">Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-24">
          {team.members.map((member) => (
            <div key={member.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.name}`}
                />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{member.name}</p>
                {/* <p className="text-sm text-muted-foreground">{member.role}</p> */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
