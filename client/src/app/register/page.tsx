"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { statesAndDistricts } from "@/Data/list";
import { useEffect, useState } from "react";
import { SelectGroup, SelectLabel, Value } from "@radix-ui/react-select";
import axios from "axios";
import { useRouter } from "next/navigation";
import LogoutMessage from "@/app/components/LogoutMessage";


type Form = {
    hr_name: string;
    hr_email: string;
    hr_address: string;
    hr_password: string;
    confirm_password: string;
    hr_contact: string;
    hr_doj: Date;
    hr_age: number;
    hr_designation: string;
    hr_role:string;
}

function EmpRegistration() {
    const token = localStorage.getItem("user");
    const tokenParse = token ? JSON.parse(token) : null;
    const [open, setOpen] = React.useState<boolean>(true);
    const navigate = useRouter();
    const gotoLogin = () => {
        setOpen(false);
        navigate.push("/");
    };
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    console.log(date)


    const [formData, setFormData] = useState<Form>({
        hr_name: "",
        hr_email: "",
        hr_address: "",
        hr_password: "",
        confirm_password: "",
        hr_contact: "",
        hr_doj: new Date(),
        hr_age: 0,
        hr_designation: "",
        hr_role: ""
    });

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.hr_password === formData.confirm_password) {
            console.log("Initial form data from client side", formData)
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify/save/human-resource`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                console.log(response);
                if (response.status === 201) {
                    alert("User Created Successfully")
                    navigate.push("/register/verify-email");
                }
                alert("User Created Successfully")
                navigate.push("/register/verify-email");
            } catch (e) {
                console.log(e);
            }
        }
        else {
            alert("Password and Confirm Password does not match")
        }

    }

    return (
        <>
            <form onSubmit={submitForm} className="flex h-screen w-full items-center justify-center px-4">
                <Card className="mx-auto md:w-[1090px] w-[380px]">
                    <CardHeader>
                        <CardTitle className="text-xl">Create a new Account</CardTitle>
                        <CardDescription>
                            Enter your personal details to create a new account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="first-name">Name</Label>
                                    <Input
                                        onChange={(e) => setFormData({ ...formData, hr_name: e.target.value })}
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last-name">Email</Label>
                                    <Input
                                        onChange={(e) => setFormData({ ...formData, hr_email: e.target.value })}
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john.doe@gmail.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    onChange={(e) => setFormData({ ...formData, hr_address: e.target.value })}
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="123, Main Street, City"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        onChange={(e) => setFormData({ ...formData, hr_password: e.target.value })}
                                        id="password"
                                        name="password"
                                        type="password"
                                        // placeholder="1234567890"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm_password">Confirm Password</Label>
                                    <Input
                                        onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="password"
                                        // placeholder="123456"
                                        max={6}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="telephone">Mobile Number</Label>
                                    <Input
                                        onChange={(e) => setFormData({ ...formData, hr_contact: e.target.value })}
                                        id="mobile_number"
                                        name="mobile_number"
                                        type="tel"
                                        placeholder="1234567890"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="date_of_joining">Date of Joining</Label>
                                    <Input
                                        onChange={(e) => setFormData({ ...formData, hr_doj: new Date(e.target.value) })}
                                        id="date_of_joining"
                                        name="date_of_joining"
                                        type="date"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">

                                <div className="grid gap-2">
                                    <Label htmlFor="telephone">Age</Label>
                                    <Input
                                        onChange={(e) => setFormData({ ...formData, hr_age: Number(e.target.value) })}
                                        id="age"
                                        name="age"
                                        type="number"
                                        placeholder="30"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="role">Select Designation</Label>
                                    <Select onValueChange={(value) => { setFormData({ ...formData, hr_designation: value }) }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Designation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Junior Developer">Junior Developer</SelectItem>
                                            <SelectItem value="Junior Tester">Junior Tester</SelectItem>
                                            <SelectItem value="Senior Developer">Senior Developer</SelectItem>
                                            <SelectItem value="Senior Tester">Senior Tester</SelectItem>
                                            <SelectItem value="Junior Analyst">Junior Analyst</SelectItem>
                                            <SelectItem value="Senior Analyst">Senior Analyst</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                            <Label htmlFor="role">Select Role</Label>
                                    <Select onValueChange={(value) => { setFormData({ ...formData, hr_role: value }) }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>                                            
                                            <SelectItem value="employee">Employee</SelectItem>
                                            <SelectItem value="manager">Manager</SelectItem>
                                        </SelectContent>
                                    </Select>
                            </div>
                            <Button type="submit" className="mx-auto mt-4">
                                Create an account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>

        </>
    );
}

export default EmpRegistration;
