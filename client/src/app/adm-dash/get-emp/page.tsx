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
          `http://localhost:8080/add-employee?page=${page}&size=${itemsPerPage}`,
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
              <li key={id} className="flex justify-between gap-x-5 py-5">
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
                      <p className="text-xs leading-5 text-gray-500">Online</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
            <Pagination>
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
          <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          aria-hidden="true"
                          className="h-6 w-6 text-red-600"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Logged Out
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            You are Logged out & you need to Login again. This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={gotoLogin}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      data-autofocus="true"
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
}
