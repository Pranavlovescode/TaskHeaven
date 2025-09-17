package com.employeemanagement.manage_employee.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;



@Data
public class LogoutTimeEntry {
    private String email;
    private String token;
}
