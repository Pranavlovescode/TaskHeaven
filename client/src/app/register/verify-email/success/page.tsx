"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

import React from "react";


const RegistrationSuccess: React.FC = () => {
  const navigate = useRouter();
  const handleGoToDashboard = () => {
    // Redirect user to the dashboard or home page
    navigate.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-green-600">
            🎉 Registration Successful!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-700">
            Thank you for registration. Your registration will soon be verified by our HR team.
          </p>
          <div className="mt-6 flex justify-center">
            <Button onClick={handleGoToDashboard} variant="default">
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationSuccess;
