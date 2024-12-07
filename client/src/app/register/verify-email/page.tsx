"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";




export default function page() {
  // const [otp, setOtp] = useState("");
  const toast = useToast();
  const [inputOtp, setInputOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useRouter();
  const handleSubmitOTP = async () => {
    if (inputOtp) {
      console.log("OTP",inputOtp,"Email",email);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify/otp/${email}/${inputOtp}`,{},        
        {
          withCredentials: true, // Required for cookies & sessions
          headers: {
            "Content-Type": "application/json",           
          },         
        }
      );
      const data = response.data;
      console.log(data);
      // localStorage.setItem("auth_data", JSON.stringify(data));
      alert("Email Verified Successfully");
      toast.toast({
        title: "Email Verified Successfully",
        description: "You can now login to your account",  
      })
      navigate.push("/");
    } else{
      alert("Invalid OTP");
      toast.toast({
        title: "Invalid OTP",
        description: "Please enter a valid OTP",
      });
    };
  };
  return (
    <>
      <div className="flex justify-center mx-auto m-48">
        {/* <Button onClick={handleSubmitOTP}>Verify OTP</Button> */}
        <Card className="w-full max-w-sm shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">OTP Verification</CardTitle>
            <CardDescription>
              Enter your email and OTP sent to your email to verify your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 mx-auto">
            <div className="grid gap-2">
              <Label htmlFor="last-name">Email</Label>
              <Input
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@gmail.com"
                required
              />
            </div>
            <div className="">
              <Label htmlFor="last-name">OTP</Label>
              {/* <Label htmlFor="otp">OTP</Label> */}
              <div className="mx-auto">
              <InputOTP
                maxLength={4}
                value={inputOtp}
                onChange={(inputOtp) => setInputOtp(inputOtp)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  {/* <InputOTPSeparator/> */}
                  <InputOTPSlot index={3} />
                  {/* <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} /> */}
                </InputOTPGroup>
              </InputOTP>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmitOTP}>
              Verify OTP
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
