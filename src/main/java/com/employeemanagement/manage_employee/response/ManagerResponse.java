package com.employeemanagement.manage_employee.response;

import com.employeemanagement.manage_employee.entity.LoginTimeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ManagerResponse {

    private final String token;
    private final ManagerDetails managerDetails;
    private final LoginTimeDetails loginTimeDetails;

    public ManagerResponse(String token, ManagerDetails managerDetails, LoginTimeDetails loginTimeDetails) {
        this.token = token;
        this.managerDetails = managerDetails;
        this.loginTimeDetails = loginTimeDetails;
    }
}
