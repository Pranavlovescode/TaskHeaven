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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout/${token.loginTimeDetails.time_id}/${token.token}`,
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
          <>
            <div className="h-[20rem] w-[40rem] bg-gray-200 mx-auto text-center m-4 rounded-xl py-12">
              <h2 className={"flex items-center justify-center text-2xl p-3 font-bold text-red-600"}>
                <svg
                    className={"mx-2"}
                    fill="#e31616" height="30px" width="30px" version="1.1" id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512" stroke="#e31616">
                  <g id="SVGRepo_bgCarrier" strokeWidth={0}></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap={"round"} strokeLinejoin={"round"}></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path
                            d="M505.403,406.394L295.389,58.102c-8.274-13.721-23.367-22.245-39.39-22.245c-16.023,0-31.116,8.524-39.391,22.246 L6.595,406.394c-8.551,14.182-8.804,31.95-0.661,46.37c8.145,14.42,23.491,23.378,40.051,23.378h420.028 c16.56,0,31.907-8.958,40.052-23.379C514.208,438.342,513.955,420.574,505.403,406.394z M477.039,436.372 c-2.242,3.969-6.467,6.436-11.026,6.436H45.985c-4.559,0-8.784-2.466-11.025-6.435c-2.242-3.97-2.172-8.862,0.181-12.765 L245.156,75.316c2.278-3.777,6.433-6.124,10.844-6.124c4.41,0,8.565,2.347,10.843,6.124l210.013,348.292 C479.211,427.512,479.281,432.403,477.039,436.372z"></path>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                            d="M256.154,173.005c-12.68,0-22.576,6.804-22.576,18.866c0,36.802,4.329,89.686,4.329,126.489 c0.001,9.587,8.352,13.607,18.248,13.607c7.422,0,17.937-4.02,17.937-13.607c0-36.802,4.329-89.686,4.329-126.489 C278.421,179.81,268.216,173.005,256.154,173.005z"></path>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                            d="M256.465,353.306c-13.607,0-23.814,10.824-23.814,23.814c0,12.68,10.206,23.814,23.814,23.814 c12.68,0,23.505-11.134,23.505-23.814C279.97,364.13,269.144,353.306,256.465,353.306z"></path>
                      </g>
                    </g>
                  </g>
                </svg>
                You are not Authorized
              </h2>
              <div>Click this below button to login or else contact your administrator</div>
              <div className={"m-5"}>
                <a href="/">
                  <button type="submit"
                          className={"bg-blue-500 m-5 p-3 rounded-lg text-white font-semibold focus:ring-blue-300 focus:ring-4 hover:bg-blue-700 duration-300"}>Go
                    to Login
                  </button>
                </a>
              </div>
            </div>
          </>
      )}
    </div>
  );
};

export default Employee;
