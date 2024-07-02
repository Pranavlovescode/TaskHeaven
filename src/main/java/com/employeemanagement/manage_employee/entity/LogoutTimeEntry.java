package com.employeemanagement.manage_employee.entity;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;


@Getter
@Setter
public class LogoutTimeEntry {
    private String email;
    private String token;
}
