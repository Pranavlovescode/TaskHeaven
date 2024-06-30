package com.employeemanagement.manage_employee.response;

import com.employeemanagement.manage_employee.entity.ManagerDetails;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ManagerResponse {

    private String token;
    private ManagerDetails managerDetails;

    public ManagerResponse(String token, ManagerDetails managerDetails) {
        this.token = token;
        this.managerDetails = managerDetails;
    }
}
