package com.employeemanagement.manage_employee.response;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRegisterResponse {
    private final EmployeeDetails employeeDetails;
    private final String mainMessage;

    public EmployeeRegisterResponse(EmployeeDetails employeeDetails, String mainMessage) {
        this.employeeDetails = employeeDetails;
        this.mainMessage = mainMessage;
    }


}
