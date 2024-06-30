package com.employeemanagement.manage_employee.entity;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;


@Getter
@Setter
public class LogoutTimeEntry {
    private Timestamp logout_time;
    private String email;
}
