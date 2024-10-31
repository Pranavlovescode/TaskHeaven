"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import LogoutMessage from "@/app/components/LogoutMessage";

export default function EmployeeDetails() {
  const token = localStorage.getItem("user");
  const parseToken = JSON.parse(token!);
  const [empData, setEmpData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 5;

  const getEmployeeData = async (page: number) => {
    try {
      if (parseToken) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-employee?page=${page}&size=${itemsPerPage}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${parseToken.token}`,
            },
          },
        );
        const data = await response.data;
        setEmpData(data.content);
        setTotalPages(data.totalPages);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getEmployeeData(currentPage);
  }, [currentPage]);

  // console.log(empData[0].emp_id);
  const [open, setOpen] = React.useState<boolean>(true);
  const navigate = useRouter();
  const gotoLogin = () => {
    setOpen(false);
    navigate.push("/");
  };
  return (
    <>
      {parseToken ? (
        <div className={"mt-[52px] my-3 ml-20 lg:px-52 pt-10"}>
          <div className={"flex flex-row justify-between pt-4"}>
            <h2 className={"font-extrabold text-xl"}>Employee List</h2>
          </div>
          <div
            className={"flex md:flex-row justify-between items-center flex-col"}
          >
            <h2 className={"font-semibold"}>
              These are the Employees which are currently working in your branch
            </h2>
            <a href="get-emp/employee-registration">
              <button
                type="submit"
                className={
                  "flex mr-6 bg-blue-500 p-2 rounded-lg text-white py-3 text-sm font-semibold items-center justify-center hover:bg-blue-700 duration-300 focus:ring-4 focus:ring-blue-300"
                }
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Employee
              </button>
            </a>
          </div>
          <ul role="list" className="divide-y divide-gray-100 mr-6">
            {empData.map((person: any, id: number) => (
              <a href={`/adm-dash/get-emp/${empData[id].emp_id}`} key={id}>
                <li className="flex justify-between gap-x-5 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      alt="employee"
                      src={"/profilephoto.svg"}
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
                    <p className="text-sm leading-6 text-gray-900">
                      {person.role}
                    </p>
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
                        <p className="text-xs leading-5 text-gray-500">
                          Online
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              </a>
            ))}
            <Pagination className={"mt-3"}>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`${currentPage === 0 ? "cursor-not-allowed" : ""}`}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={index === currentPage}
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`${currentPage === totalPages - 1 ? "cursor-not-allowed" : ""}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ul>
        </div>
      ) : (
        <>
          <LogoutMessage
            open={open}
            setOpen={setOpen}
            gotoLogin={gotoLogin}
          />
        </>
      )}
    </>
  );
}
