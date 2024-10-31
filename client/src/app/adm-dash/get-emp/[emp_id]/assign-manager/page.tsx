"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Checkbox } from "flowbite-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import LogoutMessage from "@/app/components/LogoutMessage";

function Page() {
  const token = JSON.parse(window.localStorage.getItem("user")!);

  const { emp_id } = useParams();

  // Code for paginating the managers
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage: number = 10;

  // Code for the login Dialog
  const [open, setOpen] = React.useState<boolean>(true);
  const navigate = useRouter();
  const gotoLogin = () => {
    setOpen(false);
    navigate.push("/");
  };

  // Code for getting all the managers
  const [getManagers, setGetManagers] = useState<[]>([]);
  const [manager_id, setManager_Id] = useState<string>("");

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const getManager = async () => {
    try {
      if (token) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-manager`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        });
        const mng_data = response.data;
        setGetManagers(mng_data);
        setTotalPages(Math.ceil(mng_data.length / itemsPerPage));
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error occured during fetching managers", error);
    }
  };

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const assignManager = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-manager/${manager_id}/${emp_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.token}`,
            },
          },
        );
        const data = response.data;
        console.log(data);
        setOpenDialog(true);
      }
    } catch (error) {
      console.log("Error occured during assigning manager", error);
    }
  };

  // Logic for slicing the data array of the managers
  const displayedData = getManagers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );
  // console.log(displayedData);

  useEffect(() => {
    getManager();
  }, []);

  const [checkIndex, setCheckIndex] = useState<number>(-1);
  const handleCheck = (index: number) => {
    if (checkIndex === index) {
      setCheckIndex(-1); // will uncheck the checkbox
    } else {
      setCheckIndex(index); // will check the checkbox
    }
  };
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  return (
    <>
      {token ? (
        <div className={"mt-[52px] mx-auto md:px-52"}>
          <>
            <ul role="list" className="divide-y divide-gray-100">
              {displayedData.map((person: any, index: number) => (
                <>
                  <li key={index} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4 md:items-center">
                      <Checkbox
                        checked={index === checkIndex}
                        onChange={() => {
                          handleCheck(index);
                          setManager_Id(person.mng_id);
                        }}
                      />
                      <img
                        alt=""
                        src="/profilephoto.svg"
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {person.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {person.mngemail}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {person.role}
                      </p>
                      {person.date_of_joining ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Last seen{" "}
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
                </>
              ))}
              <div className={"flex flex-row justify-between items-center"}>
                <div>
                  <Pagination className={"mt-3"}>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={`${currentPage === 0 ? "cursor-not-allowed disable" : ""}`}
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
                          className={`${currentPage === totalPages - 1 ? "cursor-not-allowed disabled:cursor-not-allowed" : ""}`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>

                  <Dialog
                    onClose={setOpenDialog}
                    open={openDialog}
                    className="relative z-10"
                  >
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
                                  Manager Added Successfully
                                </DialogTitle>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Manager {manager_id} is added to Employee{" "}
                                    {emp_id} Successfully
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              data-autofocus
                              onClick={() => {
                                setOpen(false);
                                navigate.push("/adm-dash/get-emp");
                              }}
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                              Go to Employee Dashboard
                            </button>
                          </div>
                        </DialogPanel>
                      </div>
                    </div>
                  </Dialog>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      console.log(manager_id);
                      assignManager();
                    }}
                    className={
                      "bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 duration-300"
                    }
                  >
                    Assign as Manager
                  </Button>
                </div>
              </div>
            </ul>
          </>
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

export default Page;
