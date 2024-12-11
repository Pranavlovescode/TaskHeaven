"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type EmailData = {
  to: string;
  subject: string;
  body: string;
};

export default function MailingInterface() {
  const toast = useToast();
  const [emailData, setEmailData] = useState<EmailData>({
    to: "",
    subject: "",
    body: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(emailData.to)) {
        toast.toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
        });
      } else {
        // Here you would typically send the email data to your backend
        console.log("Sending email:", emailData);
        const emailResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/email/send`,
          emailData,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user") || "{}")?.token
              }`,
            },
          }
        );
        const reponse = await emailResponse.data;
        console.log("Email Response", reponse);

        toast.toast({
          title: "Email Sent",
          description: `Email sent to ${emailData.to}`,
        });
        // Reset form after sending
        setEmailData({ to: "", subject: "", body: "" });
      }
    } catch (error) {
      toast.toast({
        title: "Some error occurred",
        description: "Failed to send email",
      });
    }
  };

  return (
    <div  className="mt-[52px]">
       <Link href="/mng-dash">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teams
            </Button>
          </Link> 
      <Card  className="bg-gray-50">
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
          <CardDescription>
            Compose and send emails to employees or teams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  name="to"
                  placeholder="To"
                  value={emailData.to}
                  onChange={(e) => {
                    setEmailData((prev) => ({ ...prev, to: e.target.value }));
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Enter email subject"
                  value={emailData.subject}
                  onChange={(e) => {
                    setEmailData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here"
                  value={emailData.body}
                  onChange={(e) => {
                    setEmailData((prev) => ({ ...prev, body: e.target.value }));
                  }}
                  rows={5}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button
            className="bg-gray-800 hover:bg-gray-600 duration-500"
            onClick={handleSubmit}
          >
            Send Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
