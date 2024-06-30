package com.employeemanagement.manage_employee.response;

import com.employeemanagement.manage_employee.entity.AdminDetails;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AdminResponse {

    private String token;
    private AdminDetails adminDetails;

    public AdminResponse(String token, AdminDetails adminDetails) {
        this.token = token;
        this.adminDetails = adminDetails;
    }
}
