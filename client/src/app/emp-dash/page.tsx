"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Logout = {
  email: string;
};

const Employee = () => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const navigate = useRouter();
  const [togglePersonalInfo, setTogglePersonalInfo] = useState<boolean>(false);
  const [email, setEmail] = useState<Logout>({
    email: "",
  });
  const handleTogglePersonalInfo = () => {
    setTogglePersonalInfo(!togglePersonalInfo);
  };
  const logoutUser = async () => {
    setEmail(token.employeeDetails.email);
    const response = await axios.put(
      `http://localhost:8080/api/auth/logout/${token.loginTimeDetails.time_id}/${token.token}`,
      { email },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    console.log(response.data, response.headers);
    localStorage.removeItem("user");
    navigate.push("/");
  };
  return (
    <div>
      {token ? (
        <>
          <header className="antialiased">
            <nav className="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex justify-start items-center">
                  <button
                    id="toggleSidebar"
                    aria-expanded="true"
                    aria-controls="sidebar"
                    className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                        strokeWidth={2}
                        d="M1 1h14M1 6h14M1 11h7"
                      />
                    </svg>
                  </button>
                  <p className="flex mr-4">
                    <img
                      src="https://flowbite.s3.amazonaws.com/logo.svg"
                      className="mr-3 h-8"
                      alt="FlowBite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                      Company X
                    </span>
                  </p>
                </div>
                <div className="flex items-center lg:order-2">
                  <button
                    id="toggleSidebarMobileSearch"
                    type="button"
                    className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Search</span>

                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleTogglePersonalInfo}
                    className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
              </div>
            </nav>
          </header>
          <div className="z-50 absolute right-0">
            {togglePersonalInfo && (
              <div
                className="z-50 my-2 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-xl dark:bg-gray-700 dark:divide-gray-600"
                id="dropdown"
              >
                <div className="py-3 px-4">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                    {token.employeeDetails.name}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {token.employeeDetails.email}
                  </span>
                </div>
                <ul
                  className="py-1 text-gray-500 dark:text-gray-400"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      My profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      Account settings
                    </a>
                  </li>
                </ul>
                <ul
                  className="py-1 text-gray-500 dark:text-gray-400"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      onClick={logoutUser}
                      className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="text-center">This is the div for testing purpose</div>
        </>
      ) : (
        <p>Not authorized</p>
      )}
    </div>
  );
};

export default Employee;
