"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Form = {
  email: string;
  password: string;
};

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  const [formInput, setFormInput] = useState<Form>({
    email: "",
    password: "",
  });
  const navigate = useRouter();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        formInput,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const user = response.data;
      console.log(user);
      localStorage.setItem("user", JSON.stringify(response.data));
      // Debugging purpose
      // console.log("User data is as follows",JSON.parse(localStorage.getItem('user')!));
      if (user.hasOwnProperty("adminDetails")) {
        navigate.push("/adm-dash");
      } else if (user.hasOwnProperty("employeeDetails")) {
        navigate.push("/emp-dash");
      } else {
        navigate.push("/mng-dash");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <main className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              onChange={(e) =>
                setFormInput({ ...formInput, email: e.target.value })
              }
              placeholder="me@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/forget-password" className="ml-auto inline-block text-sm underline text-blue-600">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" name="password" onChange={(e)=>{setFormInput({...formInput,password:e.target.value})}} required />
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline text-blue-600">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
    </main>
    </form>
  );
}
