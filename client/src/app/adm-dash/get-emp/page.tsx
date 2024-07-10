"use client";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function EmployeeDetails() {
  const token = localStorage.getItem("user");
  const parseToken = JSON.parse(token!);
  const [empData, setEmpData] = useState<any>([]);
  const getEmployeeData = async () => {
    const response = await axios.get("http://localhost:8080/add-employee", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${parseToken.token}`,
      },
    });
    const data: AxiosResponse = await response.data;
    setEmpData(data);
    console.log(data);
  };
  useEffect(() => {
    getEmployeeData();
  }, [empData]);
  return (
    <div className={"mt-[52px] ml-20"}>
      <ul role="list" className="divide-y divide-gray-100 mr-6">
        {empData.map((person: any) => (
          <li key={person.email} className="flex justify-between gap-x-5 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                alt="employee"
                src={person.imageUrl}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {person.date_of_joining ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Date of joining{" "}
                  <time dateTime={person.date_of_joining}>
                    {new Date(person.date_of_joining).toDateString()}
                  </time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
