/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.entity;

import java.sql.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author pranav titambe
 */

@Getter
@Setter
@Entity(name = "leave_info")
public class LeaveDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String leave_id;

    private Date start_date;
    private Date end_date;
    private String leave_type;
    private String reason;
    private String status;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "emp_id")
    private EmployeeDetails employeeDetails;
}
