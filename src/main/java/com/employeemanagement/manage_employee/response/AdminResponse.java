package com.employeemanagement.manage_employee.response;

import com.employeemanagement.manage_employee.entity.AdminDetails;
import com.employeemanagement.manage_employee.entity.LoginTimeDetails;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AdminResponse {

    private final String token;
    private final AdminDetails adminDetails;
    private final LoginTimeDetails loginTimeDetails;

    public AdminResponse(String token, AdminDetails adminDetails, LoginTimeDetails loginTimeDetails) {
        this.token = token;
        this.adminDetails = adminDetails;
        this.loginTimeDetails = loginTimeDetails;
    }
}
