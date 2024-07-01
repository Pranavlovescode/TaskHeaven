package com.employeemanagement.manage_employee.response;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.LoginTimeDetails;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EmployeeResponse {

    public EmployeeResponse(String token, EmployeeDetails employeeDetails, LoginTimeDetails loginTimeDetails) {
        this.token = token;
        this.employeeDetails = employeeDetails;
        this.loginTimeDetails = loginTimeDetails;
    }

    private final String token;
    private final EmployeeDetails employeeDetails;
    private final LoginTimeDetails loginTimeDetails;
}
