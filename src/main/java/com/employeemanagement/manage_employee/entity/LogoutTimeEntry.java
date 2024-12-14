package com.employeemanagement.manage_employee.entity;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class LogoutTimeEntry {
    private String email;
    private String token;
}
