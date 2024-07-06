"use client";

import React, { useState } from "react";

function Sidebar({ toggleSidebar }: { toggleSidebar: boolean }) {
  const [sidebarPageDropdown, setSidebarPageDropdown] =
    useState<boolean>(false);

  return (
    <div className={"mt-14 absolute bg-gray-200 hidden md:flex"}>
      <div
        className={`${toggleSidebar ? "w-64 h-full overflow-y-auto list-none p-2 py-2" : "w-16 list-none"} duration-500`}
      >
        <li className={"px-2"}>
          <a
            href="#"
            className={
              "flex items-center my-3 text-gray-700 bg-gray-200 p-2 px-2 justify-evenly group hover:bg-gray-100 hover:text-gray-900 hover:rounded-lg"
            }
          >
            <svg
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={"w-6 h-6 group-hover:fill-gray-700 fill-gray-500"}
            >
              <g id="SVGRepo_bgCarrier" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z"
                  stroke="gray"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z"
                  stroke="gray"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z"
                  stroke="gray"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z"
                  stroke="gray"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            {toggleSidebar ? (
              <span className="mx-4 font-medium">Dashboard</span>
            ) : null}
          </a>
        </li>
        <li className={"px-2"}>
          <a
            href="#"
            className="flex items-center my-3 text-gray-700 bg-gray-200 p-2 justify-evenly hover:bg-gray-100 hover:text-gray-900 hover:rounded-lg group"
          >
            <svg
              className="mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400 group-hover:fill-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              viewBox="0 0 20 19"
            >
              <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
              <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
            </svg>
            {toggleSidebar ? (
              <span className="px-4 font-medium">Employees</span>
            ) : null}
          </a>
        </li>
        <li className={"px-2"}>
          <a
            href="#"
            className="flex items-center my-3 text-gray-700 bg-gray-200 p-2 justify-evenly hover:bg-gray-100 hover:text-gray-900 hover:rounded-lg group"
          >
            <svg
              className="mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400 group-hover:fill-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              viewBox="0 0 20 20"
            >
              <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
            </svg>
            {toggleSidebar ? (
              <span className="px-7 font-medium">Settings</span>
            ) : null}
          </a>
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
