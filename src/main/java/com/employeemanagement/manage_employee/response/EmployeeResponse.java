package com.employeemanagement.manage_employee.response;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EmployeeResponse {

    public EmployeeResponse(String token, EmployeeDetails employeeDetails) {
        this.token = token;
        this.employeeDetails = employeeDetails;
    }

    private String token;
    private EmployeeDetails employeeDetails;
}
