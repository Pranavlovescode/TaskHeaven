"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

function Page() {
  const [empDetail, setEmpDetail] = useState({
    name: undefined,
    accountNonExpired: false,
    accountNonLocked: false,
    address: "",
    adminDetails: null,
    age: 0,
    authorities: null,
    credentialsNonExpired: false,
    date_of_joining: "",
    email: "",
    emp_id: "",
    enabled: true,
    managerDetails: null,
    mobile_number: null,
    password: "",
    role: "",
    username: null,
    workDetails: null,
  });
  const { emp_id } = useParams();
  // Fetching the token

  const token = JSON.parse(localStorage.getItem("user")!);

  const getEmployeeDetails = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `http://localhost:8080/add-employee/${emp_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.token}`,
            },
          },
        );
        const data = response.data;
        setEmpDetail(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEmployeeDetails();
  }, []);
  return (
    <div className={"mt-[52px]"}>
      This is the user id of employee {emp_id}
      <div>{new Date(empDetail.date_of_joining).toDateString()}</div>
    </div>
  );
}

export default Page;
